import {Fraction} from "../../coefficients"
import {InvalidArgumentError, NotImplementedError} from "../../errors"
import {Circle} from "../../geometry/circle"
import {Point} from "../../geometry/point"
import type {RandomCoefficientConfig, RandomFraction, RandomGeometryCircleConfig} from "../rndTypes"
import {rndFraction} from "../coefficient/rndFraction"
import {isRandomFraction, mergeConfig} from "../rndConfig"
import {randomItem} from "../rndHelpers"
import {rndPoint} from "./rndPoint"

type Kind = 'radius' | 'squaredRadius'

const defaults = {
    pointsOnCircle: { min: 8, fraction: false as boolean },
}

/** Largest random integer radius, and squared radius, when none is requested. */
const DEFAULT_MAX = { radius: 5, squaredRadius: 25 }

/**
 * Generates a random `Circle`, from a center and a squared radius.
 *
 * **`center`** — configuration of `rndPoint` (default: its own defaults).
 *
 * **`radius`** / **`squaredRadius`** (exclusive; default: a random `squaredRadius`) — an exact value
 * (`5`, `'5/2'`) or `{ fraction }` to draw it at random. `squaredRadius` allows irrational radii
 * (`5` gives x² + y² = 5, radius √5). A random integer goes from 1 to 5 (`radius`) or 1 to 25
 * (`squaredRadius`), unless `fraction` is an object giving `max` and `relative: true`. An object `fraction`
 * without `relative: true` gives fractions.
 *
 * **`pointsOnCircle`** — the circle has **at least** `min` points whose offsets from the center are integers,
 * so their coordinates are exact (`Circle.getPointsOnCircle` returns them). A number `n` means `{ min: n }`.
 * The default is `{ min: 8 }`, applied only when neither radius is given; otherwise it applies only if set
 * explicitly. The candidates are enumerated and one is picked uniformly: the default gives the squared
 * radii 5, 10, 13, 17, 20 and 25. `fraction: true` (fractional offsets) is not implemented yet.
 *
 * @throws {InvalidArgumentError} if `radius` and `squaredRadius` are both given, or if a radius, `max` or
 *   `pointsOnCircle` is invalid.
 * @throws {InvalidArgumentError} if no candidate has `min` points, if an exact radius that was requested with
 *   `pointsOnCircle` has fewer, or if a random fractional radius is requested with `min > 0` (it has no
 *   integer points).
 * @throws {NotImplementedError} if `pointsOnCircle.fraction` is `true`.
 */
export function rndCircle(userConfig?: RandomGeometryCircleConfig): Circle {
    const {radius, squaredRadius} = userConfig ?? {}
    if (radius !== undefined && squaredRadius !== undefined) {
        throw new InvalidArgumentError('radius and squaredRadius cannot be combined')
    }

    // The default minimum only applies to the default radius: whether `pointsOnCircle` was given is read before the merge.
    const explicit = userConfig?.pointsOnCircle !== undefined
    const points = resolvePoints(mergeConfig(defaults, { pointsOnCircle: pointsOption(userConfig?.pointsOnCircle) }).pointsOnCircle)
    const kind: Kind = radius !== undefined ? 'radius' : 'squaredRadius'
    const source = radius ?? squaredRadius

    // The default constraint only applies to the default radius.
    const minPoints = source === undefined || explicit ? points.min : 0

    const squared = source !== undefined && !isRandomFraction(source)
        ? exactSquaredRadius(kind, source, minPoints)
        : randomSquaredRadius(kind, source, minPoints)

    return new Circle(rndPoint(userConfig?.center), squared, true)
}

/** `pointsOnCircle` as an object: a number `n` is shorthand for `{ min: n }`. */
function pointsOption(option: RandomGeometryCircleConfig['pointsOnCircle']): { min?: number, fraction?: boolean } | undefined {
    if (option === undefined) return undefined
    if (typeof option === 'number') return {min: option}
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- the generators are called from untyped JavaScript, which the types cannot rule out
    if (typeof option !== 'object' || option === null) {
        throw new InvalidArgumentError('pointsOnCircle must be a number or { min, fraction }')
    }
    return option
}

function resolvePoints(option: { min: number, fraction: boolean }): { min: number } {
    const {min, fraction} = option
    if (!Number.isInteger(min) || min < 0) {
        throw new InvalidArgumentError('pointsOnCircle.min must be a non-negative integer')
    }
    if (typeof fraction !== 'boolean') {
        throw new InvalidArgumentError('pointsOnCircle.fraction must be a boolean')
    }
    if (fraction) {
        throw new NotImplementedError('pointsOnCircle.fraction: true is not implemented yet')
    }

    return {min}
}

/** Counts already computed: they only depend on the squared radius, and building a Circle is comparatively slow. */
const pointCounts = new Map<number, number>()

/** Number of points of the circle with integer offsets from its center (`Circle.getPointsOnCircle`). */
function countPoints(squaredRadius: Fraction): number {
    const key = squaredRadius.value
    const cacheable = Number.isInteger(key)

    const cached = cacheable ? pointCounts.get(key) : undefined
    if (cached !== undefined) return cached

    const count = new Circle(new Point(0, 0), squaredRadius, true).getPointsOnCircle().length
    if (cacheable) pointCounts.set(key, count)
    return count
}

function exactSquaredRadius(kind: Kind, value: string | number | Fraction, minPoints: number): Fraction {
    const given = new Fraction(value)
    if (given.isNaN() || !given.isFinite() || !(given.value > 0)) {
        throw new InvalidArgumentError(`${kind} must be a finite number greater than 0, got ${value instanceof Fraction ? value.display : String(value)}`)
    }

    const squared = kind === 'radius' ? given.clone().pow(2) : given
    if (minPoints > 0) {
        const count = countPoints(squared)
        if (count < minPoints) {
            throw new InvalidArgumentError(
                `the circle has ${count} points with integer offsets, fewer than the ${minPoints} requested`
            )
        }
    }
    return squared
}

function randomSquaredRadius(kind: Kind, source: RandomFraction | undefined, minPoints: number): Fraction {
    const option = source?.fraction ?? false
    if (typeof option !== 'boolean' && typeof option !== 'object') {
        throw new InvalidArgumentError(`${kind}.fraction must be a boolean or a coefficient configuration`)
    }
    const coefficient: RandomCoefficientConfig = option === true ? {} : option === false ? {relative: true} : option

    if (!coefficient.relative) {
        if (minPoints > 0) {
            throw new InvalidArgumentError(
                'a fractional radius has no point with integer offsets: use an integer (fraction: false) or pointsOnCircle: 0'
            )
        }
        const drawn = rndFraction({...coefficient, allow: {zero: false, negative: false, positive: true}})
        return kind === 'radius' ? drawn.clone().pow(2) : drawn
    }

    // Integer radius: every candidate is listed, then filtered by the number of points.
    const max = coefficient.max ?? DEFAULT_MAX[kind]
    if (!Number.isInteger(max) || max < 1) {
        throw new InvalidArgumentError(`${kind}.fraction.max must be an integer greater than 0`)
    }

    const candidates = Array.from({length: max}, (_, i) => new Fraction(kind === 'radius' ? (i + 1) ** 2 : i + 1))
        .filter(squared => minPoints === 0 || countPoints(squared) >= minPoints)
    if (candidates.length === 0) {
        throw new InvalidArgumentError(`no ${kind} up to ${max} gives at least ${minPoints} points with integer offsets`)
    }

    return randomItem(candidates)
}
