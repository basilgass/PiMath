import type { randomMonomConfig } from "../rndTypes"
import { Monom } from "../../algebra/monom"
import { rndFraction } from "../coefficient/rndFraction"
import { randomItem } from "../rndHelpers"

export function rndMonom(userConfig?: randomMonomConfig): Monom {
    const config = Object.assign(
        {
            letters: 'x',
            degree: 2,
            fraction: true,
            zero: false
        }, userConfig)

    // Create a monom instance
    const M = new Monom()

    // Generate the coefficient
    M.coefficient = rndFraction({
        zero: config.zero,
        reduced: true,
        natural: !config.fraction
    })

    if (config.letters.length > 1) {
        // Initialise each items...
        for (const L of config.letters.split('')) {
            M.setLetter(L, 0)
        }
        for (let i = 0; i < config.degree; i++) {
            const L = randomItem(config.letters.split(""))
            M.setLetter(L, M.degree(L).clone().add(1))
        }
    } else {
        M.setLetter(config.letters, config.degree)
    }

    return M
}