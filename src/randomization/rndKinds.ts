/**
 * Random choice among kinds of objects (kinds of line…) described by an `allow` record, shared by `rndLine`
 * and `rndLine3`. Internal module, not part of the public API.
 *
 * Each kind is `false` (never), a number in `[0, 1]` (probability of that kind) or `true`. A `true` on a
 * *special* kind means the fixed probability given for it; a `true` on any other (*flexible*) kind shares
 * equally what the others leave. An explicit number takes precedence over `true`, and weights that do not
 * add up to 1 are normalized.
 */
import {InvalidArgumentError} from "../errors"

export type KindsAllow<K extends string> = Record<K, boolean | number>

/**
 * `path` names the object that holds the entries in the error message (`allow` by default, `solution` for the
 * probabilities of an equation).
 *
 * @throws {InvalidArgumentError} if an entry is neither a boolean nor a probability.
 */
export function validateKinds<K extends string>(kinds: readonly K[], allow: KindsAllow<K>, path = 'allow'): void {
    for (const kind of kinds) {
        const value = allow[kind]
        const valid = typeof value === 'boolean' || (typeof value === 'number' && value >= 0 && value <= 1)
        if (!valid) {
            throw new InvalidArgumentError(`${path}.${kind} must be a boolean or a probability between 0 and 1`)
        }
    }
}

/**
 * Relative weight of each kind. `special` maps each *special* kind to the probability that a `true` stands
 * for; a kind absent from `special` is *flexible*. The entries of `allow` are not checked: call
 * {@link validateKinds} first. The caller normalizes the result (see {@link pickKind}).
 */
export function kindWeights<K extends string>(
    kinds: readonly K[],
    allow: KindsAllow<K>,
    special: Partial<Record<K, number>>
): Record<K, number> {
    const weights = Object.fromEntries(kinds.map(kind => [kind, 0])) as Record<K, number>
    const specials: K[] = []
    const flexible: K[] = []
    let explicit = 0

    for (const kind of kinds) {
        const value = allow[kind]
        if (typeof value === 'number') {
            weights[kind] = value
            explicit += value
        } else if (value === true) {
            (special[kind] !== undefined ? specials : flexible).push(kind)
        }
    }

    if (explicit >= 1) return weights

    const remaining = 1 - explicit
    const specialTotal = specials.reduce((sum, kind) => sum + (special[kind] ?? 0), 0)

    if (flexible.length > 0) {
        // The special kinds take their probability, shrunk if they would leave nothing to the flexible ones.
        const scale = specialTotal > remaining ? remaining / specialTotal : 1
        specials.forEach(kind => { weights[kind] = (special[kind] ?? 0) * scale })
        flexible.forEach(kind => { weights[kind] = (remaining - specialTotal * scale) / flexible.length })
    } else {
        specials.forEach(kind => { weights[kind] = special[kind] ?? 0 })
    }

    return weights
}

/**
 * Draws a kind with the given weights.
 *
 * @throws {InvalidArgumentError} if every weight is zero.
 */
export function pickKind<K extends string>(kinds: readonly K[], weights: Record<K, number>): K {
    const total = kinds.reduce((sum, kind) => sum + weights[kind], 0)
    if (total <= 0) {
        throw new InvalidArgumentError('allow excludes every kind of line')
    }

    let r = Math.random() * total
    for (const kind of kinds) {
        if (r < weights[kind]) return kind
        r -= weights[kind]
    }
    // Floating-point drift: fall back to the last kind that can be drawn.
    return [...kinds].reverse().find(kind => weights[kind] > 0) ?? kinds[kinds.length - 1]
}

/**
 * Draws a kind from an `allow` record: the weights of {@link kindWeights}, then {@link pickKind}. The entries of
 * `allow` must have been checked by {@link validateKinds}.
 *
 * @throws {InvalidArgumentError} if `allow` excludes every kind.
 */
export function drawKind<K extends string>(
    kinds: readonly K[],
    allow: KindsAllow<K>,
    special: Partial<Record<K, number>>
): K {
    return pickKind(kinds, kindWeights(kinds, allow, special))
}
