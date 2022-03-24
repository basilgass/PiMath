"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rndPolynom = void 0;
const randomCore_1 = require("./randomCore");
const rndMonom_1 = require("./rndMonom");
const index_1 = require("./index");
const algebra_1 = require("../algebra");
/**
 * Random polynoms
 */
class rndPolynom extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this.generate = () => {
            if (this._config.factorable && this._config.degree > 1) {
                return this.factorable();
            }
            // Create the polynom
            let P = new algebra_1.Polynom().empty(), M;
            for (let i = this._config.degree; i >= 0; i--) {
                // Create monom of corresponding degree.
                M = new rndMonom_1.rndMonom({
                    letters: this._config.letters,
                    degree: i,
                    fraction: this._config.fraction,
                    zero: (i === this._config.degree) ? false : this._config.allowNullMonom
                }).generate();
                // If degree is the greatest and unit is true, set the monom value to one.
                if (this._config.unit && this._config.degree === i) {
                    M.coefficient.one();
                }
                // Add to the polynom
                P.add(M);
            }
            // Make sure the first monom is positive.
            if (this._config.positive && P.monomByDegree().coefficient.isNegative()) {
                P.monomByDegree().coefficient.opposed();
            }
            // If the number of monoms is greater than the allowed value, remove some of them... except the first one !
            if (this._config.numberOfMonoms > 0 && this._config.numberOfMonoms < P.length) {
                // Get the greatest degree monom
                let M = P.monomByDegree().clone();
                P.monoms = index_1.Random.array(P.monoms.slice(1), this._config.numberOfMonoms - 1);
                P.add(M).reorder().reduce();
            }
            return P;
        };
        this.factorable = () => {
            let P = new algebra_1.Polynom().one();
            let _factorableConfig = { ...this._config };
            _factorableConfig.degree = 1;
            _factorableConfig.factorable = false;
            for (let i = 0; i < this._config.degree; i++) {
                P.multiply(index_1.Random.polynom(_factorableConfig));
            }
            return P;
        };
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
        };
        // Merge config with initialiser
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
}
exports.rndPolynom = rndPolynom;
//# sourceMappingURL=rndPolynom.js.map