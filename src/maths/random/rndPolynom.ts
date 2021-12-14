import {randomCore} from "./randomCore";
import {randomPolynomConfig} from "./rndTypes";
import {rndMonom} from "./rndMonom";
import {Random} from "./index";
import {Polynom} from "../algebra";
import {Monom} from "../algebra";

/**
 * Random polynoms
 */
export class rndPolynom extends randomCore {
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
        if(this._config.factorable && this._config.degree>1){
            return this.factorable()
        }

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
            P.monoms = Random.array(P.monoms, this._config.numberOfMonoms)
        }
        return P
    }

    factorable = (): Polynom => {
        let P = new Polynom().one()

        let _factorableConfig = {...this._config}
        _factorableConfig.degree = 1
        _factorableConfig.factorable = false

        for(let i=0; i<this._config.degree;i++){
            P.multiply(Random.polynom(_factorableConfig))
        }

        return P
    }
}