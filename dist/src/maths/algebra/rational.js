"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
const polynom_1 = require("./polynom");
class Rational {
    constructor(numerator, denominator) {
        this.clone = () => {
            this._numerator = this._numerator.clone();
            this._denominator = this._denominator.clone();
            return this;
        };
        this.domain = () => {
            let zeroes = this._denominator.getZeroes();
            if (zeroes.length === 0 || zeroes[0] === false) {
                return '\\mathbb{R}';
            }
            else if (zeroes[0] === true) {
                return '\\varnothing';
            }
            else {
                return '\\mathbb{R}\\setminus\\left{' +
                    zeroes.map(x => {
                        return (typeof x === 'boolean') ? '' : x.frac;
                    })
                        .join(';') + '\\right}';
            }
        };
        this.amplify = (P) => {
            this._numerator.multiply(P);
            this._denominator.multiply(P);
            return this;
        };
        this.simplify = (P) => {
            let NumeratorEuclidien = this._numerator.euclidian(P);
            if (!NumeratorEuclidien.reminder.isZero()) {
                return this;
            }
            let DenominatorEuclidien = this._denominator.euclidian(P);
            if (!DenominatorEuclidien.reminder.isZero()) {
                return this;
            }
            this._numerator = NumeratorEuclidien.quotient;
            this._denominator = DenominatorEuclidien.quotient;
            return this;
        };
        this.reduce = () => {
            this._numerator.factorize();
            for (let f of this._numerator.factors) {
                this.simplify(f);
            }
            return this;
        };
        this.opposed = () => {
            this._numerator.opposed();
            return this;
        };
        this.add = (R) => {
            let denominator = this._denominator.clone();
            this.amplify(R._denominator);
            this._numerator.add(R._numerator.clone().multiply(denominator));
            return this;
        };
        this.subtract = (R) => {
            return this.add(R.clone().opposed());
        };
        this._numerator = numerator ? numerator.clone() : new polynom_1.Polynom();
        this._denominator = denominator ? denominator.clone() : new polynom_1.Polynom();
    }
    get tex() {
        return `\\dfrac{ ${this._numerator.tex} }{ ${this._denominator.tex} }`;
    }
    get texFactors() {
        this._numerator.factorize();
        this._denominator.factorize();
        return `\\dfrac{ ${this._numerator.texFactors} }{ ${this._denominator.texFactors} }`;
    }
}
exports.Rational = Rational;
//# sourceMappingURL=rational.js.map