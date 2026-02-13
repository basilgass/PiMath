import type {randomPolynomConfig} from "../rndTypes"
import {rndMonom} from "./rndMonom"
import {Monom, Polynom} from "../../algebra"
import {randomInt, randomIntSym} from "../rndHelpers"

const factorableConfig: randomPolynomConfig = {
    letters: 'x',
    degree: 2,
    fraction: false,
    zero: false,
    unit: false,
    factorable: false,
    allowNullMonom: true,
    numberOfMonoms: 0,
    commonConstant: false,
    positive: true
}

export function rndPolynom(userConfig?: randomPolynomConfig): Polynom {
    const config = Object.assign(
        factorableConfig,
        userConfig
    )

    if (config.factorable) return rndFactorablePolynom(factorableConfig)

    // Create the polynom
    const P = new Polynom().empty()

    let M: Monom
    const targetDegree = config.degree ?? 2

    for (let i = targetDegree; i >= 0; i--) {
        // Create monom of corresponding degree.
        M = rndMonom({
            letters: config.letters,
            degree: i,
            fraction: config.fraction,
            zero: (i === targetDegree) ? false : config.allowNullMonom
        })

        // If degree is the greatest and unit is true, set the monom value to one.
        if (config.unit && targetDegree === i) {
            M.coefficient.one()
        }

        // Add to the polynom
        P.add(M)
    }

    // Make sure the first monom is positive.
    if (config.positive && P.monomByDegree().coefficient.isNegative()) P.opposite()

    // If the number of monoms is greater than the allowed value, remove some of them... except the first one !
    if (config.numberOfMonoms
        && config.numberOfMonoms > 0
        && config.numberOfMonoms < P.length) {
        while (P.length > config.numberOfMonoms) {
            // Remove a random monom, except the first one
            const index = randomInt(1, P.length - 1)

            P.monoms.splice(index, 1)
        }
    }

    return P.reduce()
}

export function rndFactorablePolynom(userConfig?: randomPolynomConfig): Polynom {
    const config = Object.assign(
        factorableConfig,
        userConfig
    )

    const _factorableConfig = {...config}
    _factorableConfig.degree = 1
    _factorableConfig.factorable = false

    const factors: Polynom[] = []
    const targetDegree = config.degree ?? 2

    while (factors.length < targetDegree) {
        factors.push(rndPolynom(_factorableConfig))
    }

    // Add a common constant if necessary.
    if (userConfig?.commonConstant !== false) {
        let k = randomIntSym(10, false)

        if (userConfig?.commonConstant === true && (k === 1 || k === -1)) {
            k *= randomInt(2, 5)
        }

        if (k !== 1 && k !== -1) factors.unshift(new Polynom(k))
    }

    return Polynom.xMultiply(...factors)
}