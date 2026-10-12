import type {RandomCoefficientConfig} from "../rndTypes"
import {Fraction} from "../../coefficients"
import {randomInt, randomItem} from "../rndHelpers"
import {mergeConfig} from "../rndConfig"
import {type Bounds, MAX_ATTEMPTS, toInterval} from "../rndInterval"
import {InvalidArgumentError} from "../../errors"

const defaults = {
    max: 10,
    reduced: true,
    relative: false,
    allow: { negative: true, positive: true, zero: false }
}

/**
 * Generates a random fraction whose numerator and denominator are in `[-max, max]`.
 *
 * **`allow`** selects the signs the value may take: `negative` and `positive` (`true` by default) and `zero`
 * (`false` by default, so 0 is never drawn unless `allow: { zero: true }`). The numerator is drawn uniformly
 * among the allowed integers of `[-max, max]`, so `allow: { negative: false }` gives a strictly positive value and
 * `allow: { positive: false }` a strictly negative one.
 *
 * **`relative: true`** forces an integer of either sign (denominator 1). The name follows
 * `Fraction.isRelative()`; the former `natural` option, which was misleading (it allowed negatives), is rejected.
 *
 * **`range`** keeps the value in an interval (a number `d` for `[-|d|, |d|]`, or `{min, max}`). The signs of `allow` then
 * only apply where the interval holds values of that sign, `max` defaults to the largest bound of the interval (at
 * least 2; doubled when the interval stays at least 1 away from 0, which a smaller `max` could not reach with a
 * non-integer fraction), and the value is drawn by rejection until it falls in the interval.
 *
 * When `relative: false` (default), the denominator is chosen uniformly among values in
 * `[2, max]` that do not divide the numerator (ensuring a non-integer result). If no
 * such value exists within `[2, max]`, the denominator falls back to 1.
 *
 * @throws {InvalidArgumentError} if `allow` excludes every value (e.g. `negative` and `positive` set to `false`
 *   while `zero` is left to `false`).
 * @throws {InvalidArgumentError} if the configuration contains the former `natural` option (renamed `relative`).
 * @throws {InvalidArgumentError} if `range` is invalid, leaves no value allowed by `allow` (or no integer with
 *   `relative`), or if no value falls in it within {@link MAX_ATTEMPTS} draws (widen `range` or raise `max`).
 */
export function rndFraction(userConfig?: RandomCoefficientConfig): Fraction {
    if (userConfig !== undefined && 'natural' in userConfig) {
        throw new InvalidArgumentError('natural was renamed relative: use { relative: true } for an integer')
    }

    const config = mergeConfig(defaults, userConfig)

    if (userConfig?.range !== undefined) {
        return rndFractionInRange(config, toInterval(userConfig.range), userConfig.max)
    }
    return drawFraction(config)
}

type Config = typeof defaults

/** Draws one fraction, whatever its value. */
function drawFraction(config: Config): Fraction {
    const max = Math.max(1, config.max)
    const {negative, positive, zero} = config.allow

    const low = negative ? -max : (zero ? 0 : 1)
    const high = positive ? max : (zero ? 0 : -1)
    if (low > high) {
        throw new InvalidArgumentError('allow excludes every value: enable negative, positive or zero')
    }

    const Q = new Fraction()
    Q.numerator = randomInt(low, high, !zero && low <= 0 && high >= 0 ? [0] : undefined)

    if (config.relative || Q.numerator === 0) {
        Q.denominator = 1
    } else {
        const candidates = Array.from({ length: max - 1 }, (_, i) => i + 2)
            .filter(d => Q.numerator % d !== 0)
        Q.denominator = candidates.length > 0 ? randomItem(candidates) : 1
    }

    return config.reduced ? Q.reduce() : Q
}

/** Draws until the fraction falls in the interval; the signs the interval cannot hold are left out of `allow`. */
function rndFractionInRange(config: Config, interval: Bounds, userMax: number | undefined): Fraction {
    const allow = {
        negative: config.allow.negative && interval.min < 0,
        positive: config.allow.positive && interval.max > 0,
        zero: config.allow.zero && interval.min <= 0 && interval.max >= 0,
    }
    if (!allow.negative && !allow.positive && !allow.zero) {
        throw new InvalidArgumentError(`allow leaves no value in the interval [${interval.min}, ${interval.max}]`)
    }
    if (config.relative && !hasInteger(interval, allow.zero)) {
        throw new InvalidArgumentError(`no integer in [${interval.min}, ${interval.max}]`)
    }

    const bound = Math.max(Math.abs(interval.min), Math.abs(interval.max))
    // A non-integer fraction n/d (d >= 2) is at most max / 2: an interval that stays at least 1 away from 0 needs
    // twice the bound to hold one. At least 2, so that a small interval still gets halves and not only integers.
    const awayFromZero = interval.min >= 1 || interval.max <= -1
    const max = userMax ?? Math.max(2, Math.ceil(awayFromZero ? 2 * bound : bound))

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const q = drawFraction({ ...config, max, allow })
        if (q.value >= interval.min && q.value <= interval.max) return q
    }

    throw new InvalidArgumentError(
        `could not draw a fraction in [${interval.min}, ${interval.max}] (widen range or raise max)`
    )
}

/** Whether the interval holds an integer; 0 counts only when it is allowed. */
function hasInteger(interval: Bounds, zeroAllowed: boolean): boolean {
    const low = Math.ceil(interval.min)
    const high = Math.floor(interval.max)
    if (low > high) return false
    return low !== 0 || high !== 0 || zeroAllowed
}
