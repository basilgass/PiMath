import {Fraction} from "../../coefficients"
import {Point} from "../../geometry"
import {InvalidArgumentError} from "../../errors"
import type {Octant, RandomGeometryPoint3Config} from "../rndTypes"
import {mergeConfig} from "../rndConfig"
import {randomItem} from "../rndHelpers"
import {restrict, rndCoordinate, rulesProblem, type ZeroRule} from "../rndCoordinates"
import {type Bounds, DEFAULT_RANGE, MAX_ATTEMPTS, toInterval} from "../rndInterval"

const defaults = {
    axis: null as RandomGeometryPoint3Config['axis'],
    plane: null as RandomGeometryPoint3Config['plane'],
    fraction: false as RandomGeometryPoint3Config['fraction'],
    range: DEFAULT_RANGE as RandomGeometryPoint3Config['range'],
    octant: null as RandomGeometryPoint3Config['octant'],
    allow: { origin: true },
}

type Sign = 1 | -1
type Triple<T> = [T, T, T]

/** Zero rules of the three coordinates `(x, y, z)`. */
export type ZeroRules3 = Triple<ZeroRule>

const AXES = ['x', 'y', 'z'] as const
const PLANES = ['xy', 'xz', 'yz'] as const

/** Signs of each octant: 1 to 4 are the quadrants 1 to 4 above the xy plane, 5 to 8 the same below it. */
const OCTANT_SIGNS: Record<Octant, Triple<Sign>> = {
    1: [1, 1, 1],
    2: [-1, 1, 1],
    3: [-1, -1, 1],
    4: [1, -1, 1],
    5: [1, 1, -1],
    6: [-1, 1, -1],
    7: [-1, -1, -1],
    8: [1, -1, -1],
}

/**
 * Generates a random 3D `Point`.
 *
 * Each coordinate is drawn in the interval `range ∩ octant`, subject to a zero rule given by `axis` or `plane`.
 * The constraints are independent: `axis` and `plane` act on *zero*, `octant` acts on *sign*.
 *
 * **`axis`** (default `null`):
 * - `'x'` / `'y'` / `'z'` — the point is on that axis (the two other coordinates are zero);
 * - `true` — on one of the three axes, chosen at random;
 * - `false` — no coordinate is zero;
 * - `null` — unconstrained: a coordinate may be zero.
 *
 * **`plane`** (default `null`) — `'xy'` (`z = 0`), `'xz'` (`y = 0`), `'yz'` (`x = 0`), or `true` for one of
 * them chosen at random. The two other coordinates are free, so they may be zero. Exclusive with `axis`.
 *
 * **`octant`** — an octant `1..8`, or an array of octants (union). **Axes and planes are included**: octant 1
 * means `x >= 0`, `y >= 0` and `z >= 0`. Octants 1 to 4 are the quadrants 1 to 4 with `z >= 0`; octants 5 to 8 are
 * the same quadrants with `z <= 0`. With an array, one octant is chosen uniformly, then the point is drawn in it.
 * Combine with `axis: false` for points strictly inside the octant.
 *
 * **`range`** — a number `d` means `[-|d|, |d|]` (so `10` and `-10` are equivalent); `{min, max}` gives
 * explicit bounds.
 *
 * **`fraction`** — `false` (default) draws integers; `true` draws fractions; a `RandomCoefficientConfig` gives
 * full control (its `allow` is ignored, as for `rndPoint`; its `max`, when given, bounds the numerator and the
 * denominator instead of the range).
 *
 * **`allow.origin`** (default `true`) — `false` excludes the point `(0, 0, 0)`.
 *
 * @throws {InvalidArgumentError} if `axis`, `plane`, `octant` or `range` is invalid, or if `axis` and `plane` are combined.
 * @throws {InvalidArgumentError} if the constraints are incompatible (e.g. `axis: 'x'` with a range that
 *   excludes 0, or an octant disjoint from the range) — checked for every alternative before drawing, so the
 *   error does not depend on the random choice of an axis, a plane or an octant.
 * @throws {InvalidArgumentError} if the constraints cannot be satisfied in {@link MAX_ATTEMPTS} draws.
 */
export function rndPoint3(userConfig?: RandomGeometryPoint3Config): Point {
    const config = mergeConfig(defaults, userConfig)

    return drawPoint3(config, zeroRules(config.axis, config.plane, config.allow.origin))
}

/**
 * Internal variant of {@link rndPoint3} where the zero rules are given instead of derived from `axis` and
 * `plane` (which are ignored): one rule triple per alternative, one of them being drawn at random. Lets
 * `rndLine3` ask for "exactly one coordinate is zero", which no `axis` / `plane` value expresses.
 * The other options (`octant`, `range`, `fraction`, `allow`) apply as for `rndPoint3`.
 *
 * @throws {InvalidArgumentError} as {@link rndPoint3}, except for `axis` and `plane`, which are not read.
 */
export function rndPoint3WithRules(userConfig: RandomGeometryPoint3Config | undefined, rules: ZeroRules3[]): Point {
    return drawPoint3(mergeConfig(defaults, userConfig), rules)
}

/**
 * Internal: tells whether every alternative of the configuration (each octant) can satisfy every rule of
 * `rules`, without drawing. Lets `rndLine3` skip a kind of line that the direction configuration makes impossible.
 *
 * @throws {InvalidArgumentError} if `range` or `octant` is invalid (not merely incompatible with the rules).
 */
export function isPoint3Feasible(userConfig: RandomGeometryPoint3Config | undefined, rules: ZeroRules3[]): boolean {
    const intervals = octantIntervals3(mergeConfig(defaults, userConfig))
    return intervals.every(alternative => rules.every(rule => rulesProblem(alternative, rule) === null))
}

function octantIntervals3(config: typeof defaults): Triple<Bounds>[] {
    const range = toInterval(config.range)
    return octantList(config.octant).map(octant => octantIntervals(range, octant))
}

function drawPoint3(config: typeof defaults, rules: ZeroRules3[]): Point {
    // Every alternative is validated before any random choice: a bad configuration must always throw.
    const intervals = octantIntervals3(config)
    for (const alternative of intervals) {
        for (const rule of rules) {
            const problem = rulesProblem(alternative, rule)
            if (problem !== null) throw new InvalidArgumentError(problem)
        }
    }

    const interval = randomItem(intervals)
    const rule = randomItem(rules)

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const [x, y, z] = interval.map((it, i) => rndCoordinate(it, rule[i], config.fraction)) as Triple<Fraction>

        if (config.allow.origin || !(x.isZero() && y.isZero() && z.isZero())) {
            return new Point(x, y, z)
        }
    }

    throw new InvalidArgumentError('could not draw a point other than the origin')
}

/** The octants to draw from; `null` when the constraint is absent or covers all of space. */
function octantList(octant: RandomGeometryPoint3Config['octant']): (Octant | null)[] {
    if (octant === null) return [null]

    const list = Array.isArray(octant) ? octant : [octant]
    if (list.length === 0 || list.some(o => !Number.isInteger(o) || (o as number) < 1 || (o as number) > 8)) {
        throw new InvalidArgumentError('octant must be an integer from 1 to 8, an array of them, or null')
    }

    const unique = [...new Set(list)] as Octant[]
    return unique.length === 8 ? [null] : unique
}

function octantIntervals(range: Bounds, octant: Octant | null): Triple<Bounds> {
    const signs = octant === null ? [undefined, undefined, undefined] : OCTANT_SIGNS[octant]
    return signs.map(sign => restrict(range, sign)) as Triple<Bounds>
}

/**
 * The zero rules the point may follow, one triple per alternative (an axis or a plane drawn at random gives
 * several). Origin exclusion is folded into the rules for an axis (the free coordinate must then be non-zero),
 * and left to rejection in the caller for a plane or an unconstrained point.
 */
function zeroRules(
    axis: RandomGeometryPoint3Config['axis'],
    plane: RandomGeometryPoint3Config['plane'],
    allowOrigin: boolean
): ZeroRules3[] {
    const axes = axisChoices(axis)
    const planes = planeChoices(plane)

    if (planes !== null) {
        if (axis !== null) {
            throw new InvalidArgumentError('axis and plane cannot be combined')
        }
        return planes.map(p => AXES.map(name => p.includes(name) ? 'free' : 'zero') as Triple<ZeroRule>)
    }

    if (axes === 'none') return [['nonzero', 'nonzero', 'nonzero']]
    if (axes === null) return [['free', 'free', 'free']]

    // The coordinate that is free on an axis may be zero (the origin) unless the origin is excluded.
    // That exclusion is folded into the rules for every choice of axis; a plane leaves it to rejection.
    const free: ZeroRule = allowOrigin ? 'free' : 'nonzero'
    return axes.map(a => AXES.map(name => name === a ? free : 'zero') as Triple<ZeroRule>)
}

/** `null`: unconstrained; `'none'`: no coordinate zero; otherwise the possible axes. */
function axisChoices(axis: RandomGeometryPoint3Config['axis']): readonly string[] | 'none' | null {
    if (axis === null) return null
    if (axis === false) return 'none'
    if (axis === true) return AXES
    if (typeof axis === 'string' && (AXES as readonly string[]).includes(axis)) return [axis]

    throw new InvalidArgumentError("axis must be 'x', 'y', 'z', true, false or null")
}

/** `null`: no plane constraint; otherwise the possible planes. */
function planeChoices(plane: RandomGeometryPoint3Config['plane']): readonly string[] | null {
    if (plane === null || plane === false) return null
    if (plane === true) return PLANES
    if (typeof plane === 'string' && (PLANES as readonly string[]).includes(plane)) return [plane]

    throw new InvalidArgumentError("plane must be 'xy', 'xz', 'yz', true, false or null")
}
