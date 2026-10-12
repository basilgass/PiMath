import {Point} from "../../geometry"
import {InvalidArgumentError} from "../../errors"
import type {Quadrant, RandomGeometryPointConfig} from "../rndTypes"
import {mergeConfig} from "../rndConfig"
import {randomItem} from "../rndHelpers"
import {restrict, rndCoordinate, rulesProblem, type ZeroRule} from "../rndCoordinates"
import {DEFAULT_RANGE, MAX_ATTEMPTS, toInterval} from "../rndInterval"

const defaults = {
    axis: null as RandomGeometryPointConfig['axis'],
    fraction: false as RandomGeometryPointConfig['fraction'],
    range: DEFAULT_RANGE as RandomGeometryPointConfig['range'],
    quadrant: null as RandomGeometryPointConfig['quadrant'],
    allow: { origin: true },
}

const QUADRANT_SIGNS: Record<Quadrant, { x: 1 | -1, y: 1 | -1 }> = {
    1: { x: 1, y: 1 },
    2: { x: -1, y: 1 },
    3: { x: -1, y: -1 },
    4: { x: 1, y: -1 },
}

/**
 * Generates a random 2D `Point`.
 *
 * Each coordinate is drawn in the interval `range ∩ quadrant`, subject to a zero rule given by `axis`.
 * The two constraints are independent: `axis` acts on *zero*, `quadrant` acts on *sign*.
 *
 * **`axis`** (default `null`):
 * - `'x'` / `'y'` — the point is on that axis (`y = 0` / `x = 0`); the other coordinate is free,
 *   so the origin is possible unless `allow.origin` is `false`.
 * - `true` — on one of the two axes, chosen at random.
 * - `false` — on no axis: no coordinate is zero.
 * - `null` — unconstrained: a coordinate may be zero.
 *
 * **`quadrant`** — a quadrant `1..4`, or an array of quadrants (union). **Axes are included**:
 * quadrant 1 means `x >= 0` and `y >= 0`. With an array, one quadrant is chosen uniformly, then the
 * point is drawn in it (uniform over the quadrants, not over the surface when `range` is asymmetric).
 * Combine with `axis: false` for points strictly inside the quadrant.
 *
 * **`range`** — a number `d` means `[-|d|, |d|]` (so `10` and `-10` are equivalent); `{min, max}` gives
 * explicit bounds.
 *
 * **`fraction`** — `false` (default) draws integers; `true` draws fractions; a
 * `RandomCoefficientConfig` gives full control. Its `allow` (zero, negative, positive) is
 * ignored (it is driven by `axis`, `quadrant` and `range`); its `max`, when given, bounds the
 * numerator and denominator instead of the range. Fractions are drawn by rejection until they fall
 * in the interval.
 *
 * @throws {InvalidArgumentError} if `axis`, `quadrant` or `range` is invalid.
 * @throws {InvalidArgumentError} if the constraints are incompatible (e.g. `axis: 'x'` with a range that
 *   excludes 0, or a quadrant disjoint from the range) — checked for every alternative (each quadrant, each axis
 *   of `axis: true`) before drawing, so the error does not depend on the random choice — or if they cannot be
 *   satisfied in {@link MAX_ATTEMPTS} draws.
 */
export function rndPoint(userConfig?: RandomGeometryPointConfig): Point {
    const config = mergeConfig(defaults, userConfig)

    const range = toInterval(config.range)
    const quadrants = quadrantList(config.quadrant)
    const rules = zeroRules(config.axis, config.allow.origin)

    const intervals = quadrants.map(quadrant => ({
        x: restrict(range, quadrant === null ? undefined : QUADRANT_SIGNS[quadrant].x),
        y: restrict(range, quadrant === null ? undefined : QUADRANT_SIGNS[quadrant].y),
    }))

    // Every alternative is validated before any random choice: a bad configuration must always throw.
    for (const interval of intervals) {
        for (const rule of rules) {
            const problem = rulesProblem([interval.x, interval.y], [rule.x, rule.y])
            if (problem !== null) throw new InvalidArgumentError(problem)
        }
    }

    const interval = randomItem(intervals)
    const rule = randomItem(rules)

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const x = rndCoordinate(interval.x, rule.x, config.fraction)
        const y = rndCoordinate(interval.y, rule.y, config.fraction)

        if (config.allow.origin || !(x.isZero() && y.isZero())) {
            return new Point(x, y)
        }
    }

    throw new InvalidArgumentError('could not draw a point other than the origin')
}

/** The quadrants to draw from; `null` when the constraint is absent or covers the whole plane. */
function quadrantList(quadrant: RandomGeometryPointConfig['quadrant']): (Quadrant | null)[] {
    if (quadrant === null) return [null]

    const list = Array.isArray(quadrant) ? quadrant : [quadrant]
    if (list.length === 0 || list.some(q => ![1, 2, 3, 4].includes(q as number))) {
        throw new InvalidArgumentError('quadrant must be 1, 2, 3, 4, an array of them, or null')
    }

    const unique = [...new Set(list)] as Quadrant[]
    return unique.length === 4 ? [null] : unique
}

interface ZeroRules2 {
    x: ZeroRule,
    y: ZeroRule,
}

/**
 * The zero rules the point may follow, one per alternative (`axis: true` gives one per axis). The origin
 * exclusion is folded into the rules for an axis (the free coordinate must then be non-zero), and left to
 * rejection in the caller otherwise.
 */
function zeroRules(axis: RandomGeometryPointConfig['axis'], allowOrigin: boolean): ZeroRules2[] {
    const free: ZeroRule = allowOrigin ? 'free' : 'nonzero'
    const onX: ZeroRules2 = { x: free, y: 'zero' }
    const onY: ZeroRules2 = { x: 'zero', y: free }

    if (axis === true) return [onX, onY]
    if (axis === 'x') return [onX]
    if (axis === 'y') return [onY]
    if (axis === false) return [{ x: 'nonzero', y: 'nonzero' }]
    if (axis === null) return [{ x: 'free', y: 'free' }]

    throw new InvalidArgumentError("axis must be 'x', 'y', true, false or null")
}
