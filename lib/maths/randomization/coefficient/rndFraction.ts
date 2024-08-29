import type { randomCoefficientConfig } from "../rndTypes"
import { Fraction } from "../../coefficients/fraction"
import { randomInt, randomIntSym } from "../rndHelpers"

export function rndFraction(userConfig?: randomCoefficientConfig): Fraction {
    const config = Object.assign(
        {
            negative: true,
            max: 10,
            reduced: true,
            zero: true,
            natural: false
        }, userConfig)

    // Create a null fraction
    const Q = new Fraction()


    if (config.negative) {
        // Allow negative numbers
        Q.numerator = randomIntSym(config.max, config.zero)
    } else {
        // Only positive numbers
        Q.numerator = randomInt(config.zero ? 0 : 1, config.max)
    }

    if (config.natural) {
        Q.denominator = 1
    } else {
        let securityCount = 0
        while (Q.isRelative() && securityCount < 10) {
            Q.denominator = randomInt(1, config.max)
            securityCount++
        }
    }

    return config.reduced ? Q.reduce() : Q
}
