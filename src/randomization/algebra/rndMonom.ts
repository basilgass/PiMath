import type {randomMonomConfig} from "../rndTypes"
import {Monom} from "../../algebra/monom"
import {rndFraction} from "../coefficient/rndFraction"
import {randomItem} from "../rndHelpers"

export function rndMonom(userConfig?: randomMonomConfig): Monom {
    const config = Object.assign(
        {
            variables: 'x',
            degree: 2,
            fraction: true,
            zero: false,
        }, userConfig)

    // Create a monom instance
    const M = new Monom()

    // Generate the coefficient
    M.coefficient = rndFraction(
        Object.assign(
            {},
            {
                zero: config.zero,
                reduced: true,
                natural: config.fraction===false,
            },
            typeof config.fraction === "boolean" ? {} : config.fraction
        )
    )

    if (config.variables.length > 1) {
        // Initialise each items...
        for (const L of config.variables.split('')) {
            M.setExponent(L, 0)
        }
        for (let i = 0; i < config.degree; i++) {
            const L = randomItem(config.variables.split(""))
            M.setExponent(L, M.degree(L).clone().add(1))
        }
    } else {
        M.setExponent(config.variables, config.degree)
    }

    return M
}