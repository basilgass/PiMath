import { randomCore } from "./randomCore";
import { Random } from "./random";
import { Monom } from "../algebra/monom";
export class rndMonom extends randomCore {
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
        let M = new Monom();
        M.coefficient.parse(Random.numberSym(10, this._config.zero), (this._config.fraction) ? Random.number(1, 10) : 1).reduce();
        if (this._config.letters.length > 1) {
            for (let L of this._config.letters.split('')) {
                M.setLetter(L, 0);
            }
            for (let i = 0; i < this._config.degree; i++) {
                const L = Random.item(this._config.letters.split(""));
                M.setLetter(L, M.degree(L) + 1);
            }
        }
        else {
            M.setLetter(this._config.letters, this._config.degree);
        }
        return M;
    };
}
//# sourceMappingURL=rndMonom.js.map