import randomCore from "./randomCore";
import {randomMonomConfig, randomPolynomConfig} from "./rndTypes";
import {Random} from "./random";
import Monom from "../algebra/monom";

/**
 * Create a random monom based on a based configuration
 */
    export default class rndMonom extends randomCore {
        declare protected _config: randomMonomConfig
        declare protected _defaultConfig: randomPolynomConfig

        constructor(userConfig?: randomMonomConfig) {
            super();

            this._defaultConfig = {
                letters: 'x',
                degree: 2,
                fraction: true,
                zero: false
            }

            this._config = this.mergeConfig(userConfig, this._defaultConfig)
        }

        generate = (): Monom => {
            // Create a monom instance
            let M = new Monom()

            // Generate the coefficient
            M.coefficient.parse(Random.numberSym(10, this._config.zero), (this._config.fraction) ? Random.number(1, 10) : 1).reduce();

            // Calculate the degree of the monom
            if (this._config.letters.length > 1) {
                // Initialise each items...
                for (let L of this._config.letters.split('')) {
                    M.setLetter(L, 0);
                }
                for (let i = 0; i < this._config.degree; i++) {
                    const L = Random.item(this._config.letters.split(""))
                    M.setLetter(L, M.degree(L) + 1)
                }
            } else {
                M.setLetter(this._config.letters, this._config.degree)
            }

            return M
        }
    }
