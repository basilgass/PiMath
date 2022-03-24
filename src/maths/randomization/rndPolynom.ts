import {randomCore} from "./randomCore";
import {randomPolynomConfig} from "./rndTypes";
import {rndMonom} from "./rndMonom";
import {Random} from "./random";
import {Polynom} from "../algebra/polynom";
import {Monom} from "../algebra/monom";

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
            numberOfMonoms: 0,
            positive: true
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

        // Make sure the first monom is positive.
        if(this._config.positive && P.monomByDegree().coefficient.isNegative()){
            P.monomByDegree().coefficient.opposed()
        }

        // If the number of monoms is greater than the allowed value, remove some of them... except the first one !
        if (this._config.numberOfMonoms > 0 && this._config.numberOfMonoms < P.length) {
            // Get the greatest degree monom
            let M = P.monomByDegree().clone()
            P.monoms = Random.array(P.monoms.slice(1), this._config.numberOfMonoms-1)
            P.add(M).reorder().reduce()
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