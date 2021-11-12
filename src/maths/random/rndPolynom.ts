import randomCore from "./randomCore";
import {randomPolynomConfig} from "./rndTypes";
import {Polynom} from "../algebra/polynom";
import {Monom} from "../algebra/monom";
import rndMonom from "./rndMonom";
import {Random} from "./random";

export default class rndPolynom extends randomCore {
    declare protected _config: randomPolynomConfig
    declare protected _defaultConfig: randomPolynomConfig

    constructor(userConfig?: randomPolynomConfig) {
        super();

        // Default config for a random polynom
        this._defaultConfig = {
            letters: 'x',
            degree: 2,
            fraction: false,
            zero: false,
            unit: false,
            factorable: false,
            allowNullMonom: true,
            numberOfMonoms: 0
        }

        // Merge config with initialiser
        this._config = this.mergeConfig(userConfig, this._defaultConfig)
    }

    generate = (): Polynom => {
        // Create the polynom
        let P = new Polynom().empty(),
            M: Monom

        for (let i = this._config.degree; i >= 0; i--) {
            // Create monom of corresponding degree.
            M = new rndMonom({
                letters: this._config.letters,
                degree: i,
                fraction: this._config.fraction,
                zero: (i === this._config.degree) ? false : this._config.allowNullMonom
            }).generate()

            // If degree is the greatest and unit is true, set the monom value to one.
            if (this._config.unit && this._config.degree === i) {
                M.coefficient.one()
            }

            // Add to the polynom
            P.add(M)
        }

        // If the number of monoms is greater than the allowed value, remove some of them...
        if (this._config.numberOfMonoms > 0 && this._config.numberOfMonoms < P.length) {
            console.log(P.monoms.length)
            P.monoms = Random.array(P.monoms, this._config.numberOfMonoms)
        }
        return P
    }

    factorable = (): Polynom => {
        let P = new Polynom()

        return P
    }
}