"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rndMonom = void 0;
const randomCore_1 = require("./randomCore");
const index_1 = require("./index");
const monom_1 = require("../algebra/monom");
class rndMonom extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this._defaultConfig = {
            letters: 'x',
            degree: 2,
            fraction: true,
            zero: false
        };
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
    generate = () => {
        let M = new monom_1.Monom();
        M.coefficient = index_1.Random.fraction({
            zero: this._config.zero,
            reduced: true
        });
        if (this._config.letters.length > 1) {
            for (let L of this._config.letters.split('')) {
                M.setLetter(L, 0);
            }
            for (let i = 0; i < this._config.degree; i++) {
                const L = index_1.Random.item(this._config.letters.split(""));
                M.setLetter(L, M.degree(L).clone().add(1));
            }
        }
        else {
            M.setLetter(this._config.letters, this._config.degree);
        }
        return M;
    };
}
exports.rndMonom = rndMonom;
//# sourceMappingURL=rndMonom.js.map