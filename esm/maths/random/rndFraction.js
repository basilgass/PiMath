"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rndFraction = void 0;
const randomCore_1 = require("./randomCore");
const coefficients_1 = require("../coefficients");
const index_1 = require("./index");
class rndFraction extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this._defaultConfig = {
            negative: true,
            reduced: true,
            zero: true
        };
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
    generate = () => {
        let Q = new coefficients_1.Fraction();
        if (this._config.negative) {
            Q.numerator = index_1.Random.numberSym(10, this._config.zero);
        }
        else {
            Q.numerator = index_1.Random.number(this._config.zero ? 0 : 1, 10);
        }
        Q.denominator = index_1.Random.number(1, 10);
        return this._config.reduced ? Q.reduce() : Q;
    };
}
exports.rndFraction = rndFraction;
//# sourceMappingURL=rndFraction.js.map