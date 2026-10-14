import type {RandomPolynomConfig} from "../rndTypes"
import {rndMonom} from "./rndMonom"
import {Monom, Polynom} from "../../algebra"
import {randomInt, randomIntSym} from "../rndHelpers"
import {mergeConfig} from "../rndConfig"
import {assertDegree, assertVariables} from "../rndValidation"
import {InvalidArgumentError} from "../../errors"

/** Bound of the common constant factor added by `factorable`: it goes from -10 to 10, without 0. */
const COMMON_CONSTANT_BOUND = 10

const defaults = {
    variables: 'x',
    degree: 2,
    fraction: false as RandomPolynomConfig['fraction'],
    unit: false,
    factorable: false,
    numberOfMonoms: 0,
    allow: { nullMonom: true, negativeLeading: false, commonFactor: true }
}

/**
 * Generates a random polynomial of the given degree.
 *
 * **`allow.nullMonom`** — when `true` (default), non-leading monomials may have a zero
 * coefficient (removed by `reduce()`); when `false`, every term from degree 0 to `degree`
 * is guaranteed non-zero.
 *
 * **`allow.negativeLeading`** — when `false` (default), the leading coefficient is always
 * positive; the whole polynomial is negated if necessary.
 *
 * **`allow.commonFactor`** — when `false`, the polynomial is retried until the GCD of all
 * integer coefficients equals 1 (primitive polynomial). Ignored when `fraction` is not
 * `false` (fractional coefficients).
 *
 * **`numberOfMonoms`** — limits the number of terms by randomly removing non-leading
 * monomials after generation. Silently ignored when the generated polynomial already
 * has fewer terms than requested.
 *
 * **`factorable: true`** — delegates to the internal `rndFactorablePolynom`: produces a
 * product of `degree` linear factors with an optional common integer constant
 * (see `commonConstant`).
 *
 * **`commonConstant`** — controls the common constant factor for factorable polynomials:
 * - `undefined` (default): a random non-unit integer constant is sometimes added.
 * - `false`: no constant factor is ever added.
 * - `true`: a constant factor with `|k| ≥ 2` is always added.
 *
 * **`allow.commonFactor: false`** also applies to `factorable`: no constant factor is added, and the integer
 * coefficients of the product have no common divisor (the content is divided out). It contradicts
 * `commonConstant: true`, which throws.
 *
 * @throws {InvalidArgumentError} if `degree` is not a non-negative integer.
 * @throws {InvalidArgumentError} if `variables` is not a non-empty string of lowercase letters.
 * @throws {InvalidArgumentError} if `commonConstant` is `true` while `allow.commonFactor` is `false` (with `factorable`).
 */
export function rndPolynom(userConfig?: RandomPolynomConfig): Polynom {
    const config = mergeConfig(defaults, userConfig)

    assertDegree(config.degree)
    assertVariables(config.variables)

    if (config.factorable) return rndFactorablePolynom(config)

    const checkPrimitive = !config.allow.commonFactor && config.fraction === false

    const P = new Polynom().empty()
    let M: Monom
    const targetDegree = config.degree

    for (let i = targetDegree; i >= 0; i--) {
        M = rndMonom({
            variables: config.variables,
            degree: i,
            fraction: config.fraction,
            allow: { zero: i === targetDegree ? false : config.allow.nullMonom }
        })

        if (config.unit && targetDegree === i) {
            M.coefficient.one()
        }

        P.add(M)
    }

    if (!config.allow.negativeLeading && P.monomByDegree().coefficient.isNegative()) P.opposite()

    if (config.numberOfMonoms > 0 && config.numberOfMonoms < P.length) {
        while (P.length > config.numberOfMonoms) {
            const index = randomInt(1, P.length - 1)
            P.monoms = P.monoms.filter((_, i) => i !== index)
        }
    }

    const result = P.reduce()

    if (checkPrimitive) {
        const g = result.gcdNumerator()
        if (g > 1) {
            result.monoms = result.monoms.map(m => {
                m.coefficient.divide(g)
                return m
            })
        }
    }

    return result
}

function rndFactorablePolynom(config: RandomPolynomConfig): Polynom {
    // `allow.commonFactor: false` asks for a primitive product: no constant factor, and the content is divided out.
    const primitive = config.allow?.commonFactor === false
    if (primitive && config.commonConstant === true) {
        throw new InvalidArgumentError('commonConstant: true contradicts allow.commonFactor: false')
    }

    const factorConfig = { ...config, allow: { ...config.allow }, degree: 1, factorable: false }
    const degree = config.degree ?? defaults.degree

    const factors: Polynom[] = []

    while (factors.length < degree) {
        factors.push(rndPolynom(factorConfig))
    }

    if (config.commonConstant !== false && !primitive) {
        let k = randomIntSym(COMMON_CONSTANT_BOUND, false)

        // the linear factors already have a positive leading coefficient: only k can flip the sign
        if (config.allow?.negativeLeading !== true) k = Math.abs(k)

        if (config.commonConstant === true && (k === 1 || k === -1)) {
            k *= randomInt(2, 5)
        }

        if (k !== 1 && k !== -1) factors.unshift(new Polynom(k))
    }

    const product = Polynom.xMultiply(...factors)

    if (primitive && config.fraction === false) {
        const g = product.gcdNumerator()
        if (g > 1) {
            product.monoms = product.monoms.map(m => {
                m.coefficient.divide(g)
                return m
            })
        }
    }

    return product
}
