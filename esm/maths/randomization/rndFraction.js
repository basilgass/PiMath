"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rndFraction = void 0;
const randomCore_1 = require("./randomCore");
const random_1 = require("./random");
const fraction_1 = require("../coefficients/fraction");
/**
 * Create a random monom based on a based configuration
 */
class rndFraction extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this.generate = () => {
            let Q = new fraction_1.Fraction();
            if (this._config.negative) {
                Q.numerator = random_1.Random.numberSym(this._config.max, this._config.zero);
            }
            else {
                Q.numerator = random_1.Random.number(this._config.zero ? 0 : 1, this._config.max);
            }
            if (this._config.natural) {
                Q.denominator = 1;
            }
            else {
                Q.denominator = random_1.Random.number(1, this._config.max);
            }
            return this._config.reduced ? Q.reduce() : Q;
        };
        this._defaultConfig = {
            negative: true,
            max: 10,
            reduced: true,
            zero: true,
            natural: false
        };
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
}
exports.rndFraction = rndFraction;
//# sourceMappingURL=rndFraction.js.map