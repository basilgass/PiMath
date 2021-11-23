import { randomCore } from "./randomCore";
import { rndMonom } from "./rndMonom";
import { Random } from "./index";
import { Polynom } from "../algebra";
export class rndPolynom extends randomCore {
    constructor(userConfig) {
        super();
        this._defaultConfig = {
            letters: 'x',
            degree: 2,
            fraction: false,
            zero: false,
            unit: false,
            factorable: false,
            allowNullMonom: true,
            numberOfMonoms: 0
        };
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
    generate = () => {
        if (this._config.factorable && this._config.degree > 1) {
            return this.factorable();
        }
        let P = new Polynom().empty(), M;
        for (let i = this._config.degree; i >= 0; i--) {
            M = new rndMonom({
                letters: this._config.letters,
                degree: i,
                fraction: this._config.fraction,
                zero: (i === this._config.degree) ? false : this._config.allowNullMonom
            }).generate();
            if (this._config.unit && this._config.degree === i) {
                M.coefficient.one();
            }
            P.add(M);
        }
        if (this._config.numberOfMonoms > 0 && this._config.numberOfMonoms < P.length) {
            console.log(P.monoms.length);
            P.monoms = Random.array(P.monoms, this._config.numberOfMonoms);
        }
        return P;
    };
    factorable = () => {
        let P = new Polynom().one();
        let _factorableConfig = { ...this._config };
        _factorableConfig.degree = 1;
        _factorableConfig.factorable = false;
        for (let i = 0; i < this._config.degree; i++) {
            P.multiply(Random.polynom(_factorableConfig));
        }
        return P;
    };
}
//# sourceMappingURL=rndPolynom.js.map