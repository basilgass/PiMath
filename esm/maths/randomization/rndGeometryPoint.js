"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rndGeometryPoint = void 0;
const randomCore_1 = require("./randomCore");
const random_1 = require("./random");
const point_1 = require("../geometry/point");
const fraction_1 = require("../coefficients/fraction");
/**
 * Create a random monom based on a based configuration
 */
class rndGeometryPoint extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this.generate = () => {
            let x, y, zeroX = this._config.axis === true || this._config.axis === 'x', zeroY = this._config.axis === true || this._config.axis === 'y';
            x = this._config.fraction ?
                random_1.Random.fraction({ max: this._config.max, zero: zeroX }) :
                new fraction_1.Fraction(random_1.Random.numberSym(this._config.max, zeroX));
            y = this._config.fraction ?
                random_1.Random.fraction({ max: this._config.max, zero: zeroY }) :
                new fraction_1.Fraction(random_1.Random.numberSym(this._config.max, zeroY));
            if (+this._config.quadrant === 1) {
                x.abs();
                y.abs();
            }
            if (+this._config.quadrant === 2) {
                if (x.isPositive()) {
                    x.opposed();
                }
                if (y.isNegative()) {
                    y.opposed();
                }
            }
            if (+this._config.quadrant === 3) {
                if (x.isPositive()) {
                    x.opposed();
                }
                if (y.isPositive()) {
                    y.opposed();
                }
            }
            if (+this._config.quadrant === 4) {
                if (x.isNegative()) {
                    x.opposed();
                }
                if (y.isPositive()) {
                    y.opposed();
                }
            }
            return new point_1.Point(x, y);
        };
        this._defaultConfig = {
            axis: true,
            fraction: false,
            max: 10
        };
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
}
exports.rndGeometryPoint = rndGeometryPoint;
//# sourceMappingURL=rndGeometryPoint.js.map