import {randomCore} from "./randomCore";
import {Random, randomGeometryPointConfig} from "./random";
import {Point} from "../geometry/point";
import {Fraction} from "../coefficients/fraction";

/**
 * Create a random monom based on a based configuration
 */
export class rndGeometryPoint extends randomCore {
    declare protected _config: randomGeometryPointConfig
    declare protected _defaultConfig: randomGeometryPointConfig

    constructor(userConfig?: randomGeometryPointConfig) {
        super();

        this._defaultConfig = {
            axis: true,
            fraction: false,
            max: 10
        }

        this._config = this.mergeConfig(userConfig, this._defaultConfig)
    }

    generate = (): Point => {
        let x: Fraction, y: Fraction,
            zeroX = this._config.axis === true || this._config.axis === 'x',
            zeroY = this._config.axis === true || this._config.axis === 'y'

        x = this._config.fraction ?
            Random.fraction({max: this._config.max, zero: zeroX}) :
            new Fraction(Random.numberSym(this._config.max, zeroX))

        y = this._config.fraction ?
            Random.fraction({max: this._config.max, zero: zeroY}) :
            new Fraction(Random.numberSym(this._config.max, zeroY))

        if (+this._config.quadrant === 1) {
            x.abs()
            y.abs()
        }
        if (+this._config.quadrant === 2) {
            if (x.isPositive()) {
                x.opposite()
            }
            if (y.isNegative()) {
                y.opposite()
            }
        }
        if (+this._config.quadrant === 3) {
            if (x.isPositive()) {
                x.opposite()
            }
            if (y.isPositive()) {
                y.opposite()
            }
        }
        if (+this._config.quadrant === 4) {
            if (x.isNegative()) {
                x.opposite()
            }
            if (y.isPositive()) {
                y.opposite()
            }
        }

        return new Point(x, y)
    }
}
