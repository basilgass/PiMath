"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rndMonom = void 0;
const randomCore_1 = require("./randomCore");
const random_1 = require("./random");
const algebra_1 = require("../algebra");
/**
 * Create a random monom based on a based configuration
 */
class rndMonom extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this.generate = () => {
            // Create a monom instance
            let M = new algebra_1.Monom();
            // Generate the coefficient
            if (typeof this._config.fraction === "boolean") {
                M.coefficient = random_1.Random.fraction({
                    zero: this._config.zero,
                    reduced: true,
                    natural: !this._config.fraction
                });
            }
            else {
                M.coefficient = random_1.Random.fraction(this._config.fraction);
            }
            // Calculate the degree of the monom
            if (this._config.letters.length > 1) {
                // Initialise each items...
                for (let L of this._config.letters.split('')) {
                    M.setLetter(L, 0);
                }
                for (let i = 0; i < this._config.degree; i++) {
                    const L = random_1.Random.item(this._config.letters.split(""));
                    M.setLetter(L, M.degree(L).clone().add(1));
                }
            }
            else {
                M.setLetter(this._config.letters, this._config.degree);
            }
            return M;
        };
        this._defaultConfig = {
            letters: 'x',
            degree: 2,
            fraction: true,
            zero: false
        };
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
}
exports.rndMonom = rndMonom;
//# sourceMappingURL=rndMonom.js.map