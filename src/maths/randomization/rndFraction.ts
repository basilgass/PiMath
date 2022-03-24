import {randomCore} from "./randomCore";
import {randomCoefficientConfig, randomMonomConfig, randomPolynomConfig} from "./rndTypes";
import {Fraction} from "../coefficients";
import {Random} from "./random";

/**
 * Create a random monom based on a based configuration
 */
export class rndFraction extends randomCore {
    declare protected _config: randomCoefficientConfig
    declare protected _defaultConfig: randomCoefficientConfig

    constructor(userConfig?: randomCoefficientConfig) {
        super();

        this._defaultConfig = {
            negative: true,
            max: 10,
            reduced: true,
            zero: true,
            natural: false
        }

        this._config = this.mergeConfig(userConfig, this._defaultConfig)
    }

    generate = (): Fraction => {
        let Q = new Fraction()

        if(this._config.negative){
            Q.numerator = Random.numberSym(this._config.max, this._config.zero)
        }else {
            Q.numerator = Random.number(this._config.zero ? 0 : 1, this._config.max)
        }
        if(this._config.natural){
            Q.denominator = 1
        }else {
            Q.denominator = Random.number(1, this._config.max)
        }

        return this._config.reduced?Q.reduce():Q
    }
}
