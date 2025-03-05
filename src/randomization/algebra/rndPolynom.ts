import type { randomPolynomConfig } from "../rndTypes"
import { rndMonom } from "./rndMonom"
import { Polynom, Monom } from "../../algebra"
import { randomInt } from "../rndHelpers"

const factorableConfig = {
    letters: 'x',
    degree: 2,
    fraction: false,
    zero: false,
    unit: false,
    factorable: false,
    allowNullMonom: true,
    numberOfMonoms: 0,
    positive: true
}

export function rndPolynom(userConfig?: randomPolynomConfig): Polynom {
    const config = Object.assign(
        factorableConfig,
        userConfig
    )

    // TODO: Create a factorable polynom does not work !!!!!

    // Create the polynom
    const P = new Polynom().empty()

    let M: Monom

    for (let i = config.degree; i >= 0; i--) {
        // Create monom of corresponding degree.
        M = rndMonom({
            letters: config.letters,
            degree: i,
            fraction: config.fraction,
            zero: (i === config.degree) ? false : config.allowNullMonom
        })

        // If degree is the greatest and unit is true, set the monom value to one.
        if (config.unit && config.degree === i) {
            M.coefficient.one()
        }

        // Add to the polynom
        P.add(M)
    }

    // Make sure the first monom is positive.
    if (config.positive && P.monomByDegree().coefficient.isNegative()) {
        P.monomByDegree().coefficient.opposite()
    }

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

    const P = new Polynom().one()

    const _factorableConfig = { ...config }
    _factorableConfig.degree = 1
    _factorableConfig.factorable = false

    for (let i = 0; i < config.degree; i++) {
        P.multiply(rndPolynom(_factorableConfig))
    }

    return P.reduce()
}