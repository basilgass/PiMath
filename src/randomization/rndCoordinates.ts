/**
 * Drawing core shared by the point and vector generators: one coordinate drawn in an interval,
 * under a zero rule. Internal module, not part of the public API.
 */
import {Fraction} from "../coefficients"
import {InvalidArgumentError} from "../errors"
import type {RandomCoefficientConfig} from "./rndTypes"
import {rndFraction} from "./coefficient/rndFraction"
import {randomInt} from "./rndHelpers"
import {type Bounds, normalizeZero} from "./rndInterval"

export type ZeroRule = 'zero' | 'nonzero' | 'free'

/** Keeps the non-negative (sign 1) or non-positive (sign -1) part of the interval. */
export function restrict(interval: Bounds, sign: 1 | -1 | undefined): Bounds {
    if (sign === 1) return { min: Math.max(interval.min, 0), max: interval.max }
    if (sign === -1) return { min: interval.min, max: Math.min(interval.max, 0) }
    return interval
}

/**
 * Why `rule` cannot hold on `interval` (empty interval, a zero required but excluded, a non-zero required
 * but only 0 allowed), or `null` when it can. The messages are generic: the interval is the result of the
 * `range`, `quadrant` / `octant` and `axis` / `plane` options, which the generators know by other names.
 */
export function ruleProblem(interval: Bounds, rule: ZeroRule): string | null {
    const {min, max} = interval
    const where = `the interval [${min}, ${max}]`
    const hint = '(check axis, plane, quadrant, octant and range)'

    if (min > max) {
        return `the range and the sign constraint have no value in common ${hint}`
    }
    if (rule === 'zero' && (min > 0 || max < 0)) {
        return `the zero rule needs a coordinate equal to 0, but ${where} excludes 0 ${hint}`
    }
    if (rule === 'nonzero' && min === 0 && max === 0) {
        return `a non-zero coordinate is required, but ${where} only allows 0 ${hint}`
    }
    return null
}

/**
 * The first problem found when each coordinate's interval is confronted with its rule (`intervals[i]` with
 * `rules[i]`), or `null` when every rule can hold. Works for any number of coordinates.
 */
export function rulesProblem(intervals: readonly Bounds[], rules: readonly ZeroRule[]): string | null {
    for (let i = 0; i < intervals.length; i++) {
        const problem = ruleProblem(intervals[i], rules[i])
        if (problem !== null) return problem
    }
    return null
}

/** @throws {InvalidArgumentError} if the rule cannot hold on the interval, see {@link ruleProblem}. */
export function assertRule(interval: Bounds, rule: ZeroRule): void {
    const problem = ruleProblem(interval, rule)
    if (problem !== null) throw new InvalidArgumentError(problem)
}

/**
 * Draws one coordinate in `interval` under a zero rule.
 *
 * `fraction` selects the kind of value: falsy for an integer, `true` or a `RandomCoefficientConfig` for a
 * fraction drawn by rejection. The `allow` of that configuration is ignored (the interval and the rule drive
 * the signs), and its `max`, when given, bounds the numerator and the denominator instead of the interval.
 *
 * @throws {InvalidArgumentError} if the rule cannot hold on the interval (see {@link ruleProblem}), if the
 *   interval holds no integer, or if no fraction falls in the interval within `MAX_ATTEMPTS` draws.
 */
export function rndCoordinate(
    interval: Bounds,
    rule: ZeroRule,
    fraction: boolean | RandomCoefficientConfig | undefined
): Fraction {
    assertRule(interval, rule)

    if (rule === 'zero') {
        return new Fraction(0)
    }

    const nonZero = rule === 'nonzero'
    if (fraction) {
        return rndFractionIn(interval, nonZero, fraction === true ? {} : fraction)
    }
    return new Fraction(rndIntegerIn(interval, nonZero))
}

function rndIntegerIn(interval: Bounds, nonZero: boolean): number {
    const low = normalizeZero(Math.ceil(interval.min))
    const high = normalizeZero(Math.floor(interval.max))

    if (low > high || (nonZero && low === 0 && high === 0)) {
        throw new InvalidArgumentError(`no integer in [${interval.min}, ${interval.max}]`)
    }

    return nonZero && low <= 0 && high >= 0 ? randomInt(low, high, [0]) : randomInt(low, high)
}

/**
 * A fraction in the interval, drawn by `rndFraction` with its `range`. The signs follow the interval and the rule,
 * so that a half-line does not reject half of the draws; the `allow` of the configuration is ignored.
 */
function rndFractionIn(interval: Bounds, nonZero: boolean, config: RandomCoefficientConfig): Fraction {
    return rndFraction({
        ...config,
        range: interval,
        allow: { negative: true, positive: true, zero: !nonZero },
    })
}
