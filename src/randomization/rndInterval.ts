/**
 * Intervals of values, shared by every generator that draws within a `range`. A leaf module: it imports no
 * generator, so that `rndFraction` and `rndCoordinates` can both rely on it. Internal, not part of the public API.
 */
import {InvalidArgumentError} from "../errors"
import type {RandomRange} from "./rndTypes"

/** Maximum number of draws before giving up on a constraint that is too tight. */
export const MAX_ATTEMPTS = 1000

/** Default `range` of every generator of coordinates: `[-10, 10]`. */
export const DEFAULT_RANGE = 10

/** Closed interval of the values a draw may take. */
export interface Bounds {
    min: number,
    max: number,
}

/**
 * `-0` and `0` are different values for `Object.is` (and `1 / -0` is `-Infinity`): `Math.ceil(-0.5)` and a
 * range of `0` both produce `-0`, which must never reach a drawn value.
 */
export function normalizeZero(value: number): number {
    return value === 0 ? 0 : value
}

/**
 * Bounds of a `range` option: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds.
 * A zero bound is always `+0`.
 *
 * @throws {InvalidArgumentError} if `range` is neither a finite number nor `{min, max}` with `min <= max`.
 */
export function toInterval(range: RandomRange | undefined): Bounds {
    if (typeof range === 'number' && Number.isFinite(range)) {
        const bound = Math.abs(range)
        return { min: normalizeZero(-bound), max: bound }
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- the generators are called from untyped JavaScript, which the types cannot rule out
    if (typeof range === 'object' && range !== null
        && Number.isFinite(range.min) && Number.isFinite(range.max) && range.min <= range.max) {
        return { min: normalizeZero(range.min), max: normalizeZero(range.max) }
    }

    throw new InvalidArgumentError('range must be a finite number or {min, max} with min <= max')
}
