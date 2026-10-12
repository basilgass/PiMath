import type {RandomCoefficientConfig, RandomMonomConfig} from "../rndTypes"
import {Monom} from "../../algebra/monom"
import {rndFraction} from "../coefficient/rndFraction"
import {randomItem} from "../rndHelpers"
import {mergeConfig} from "../rndConfig"
import {assertDegree, assertVariables} from "../rndValidation"

const defaults = {
    variables: 'x',
    degree: 2,
    fraction: false as boolean | RandomCoefficientConfig,
    allow: { zero: false }
}

/**
 * Generates a random `Monom` (a single term such as `3x²` or `-½xy`).
 *
 * **`fraction`** controls the coefficient generation strategy:
 * - `false` (default) — integer coefficient (`relative: true` passed to `rndFraction`).
 * - `true` — fractional coefficient allowed.
 * - `RandomCoefficientConfig` object — full control over the coefficient (max, reduced,
 *   allow.negative, allow.zero…). Values are deep-merged over the internal defaults.
 *
 * **Multi-variable degree distribution**: when `variables` contains more than one variable,
 * the `degree` units are distributed by drawing a random variable at each step and
 * incrementing its exponent. This produces a multinomial distribution — for `degree: 2`
 * and `variables: 'xy'`, `xy` is twice as probable as `x²` or `y²`. Duplicate variables
 * in `variables` are silently deduplicated before distribution.
 *
 * @throws {InvalidArgumentError} if `variables` is not a non-empty string of lowercase letters.
 * @throws {InvalidArgumentError} if `degree` is negative or not an integer.
 */
export function rndMonom(userConfig?: RandomMonomConfig): Monom {
    const config = mergeConfig(defaults, userConfig)

    assertDegree(config.degree)
    assertVariables(config.variables)

    const M = new Monom()

    const fractionDefaults = {
        reduced: true,
        relative: config.fraction === false,
        allow: { zero: config.allow.zero, negative: true }
    }
    const fractionUser = typeof config.fraction === 'object' ? config.fraction : undefined
    M.coefficient = rndFraction(mergeConfig(fractionDefaults, fractionUser))

    const variables = [...new Set(config.variables.split(''))]

    if (variables.length > 1) {
        for (const variable of variables) {
            M.setExponent(variable, 0)
        }
        for (let i = 0; i < config.degree; i++) {
            const variable = randomItem(variables)
            M.setExponent(variable, M.degree(variable).add(1))
        }
    } else {
        M.setExponent(variables[0], config.degree)
    }

    return M
}
