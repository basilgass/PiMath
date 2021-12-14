"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
const polynom_1 = require("./polynom");
const fraction_1 = require("../coefficients/fraction");
class Rational {
    _rawString;
    _numerator;
    _denominator;
    constructor(numerator, denominator) {
        this._numerator = numerator ? numerator.clone() : new polynom_1.Polynom();
        this._denominator = denominator ? denominator.clone() : new polynom_1.Polynom();
    }
    clone = () => {
        this._numerator = this._numerator.clone();
        this._denominator = this._denominator.clone();
        return this;
    };
    get tex() {
        return `\\dfrac{ ${this._numerator.tex} }{ ${this._denominator.tex} }`;
    }
    get texFactors() {
        this._numerator.factorize();
        this._denominator.factorize();
        return `\\dfrac{ ${this._numerator.texFactors} }{ ${this._denominator.texFactors} }`;
    }
    get numerator() {
        return this._numerator;
    }
    get denominator() {
        return this._denominator;
    }
    domain = () => {
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
    amplify = (P) => {
        this._numerator.multiply(P);
        this._denominator.multiply(P);
        return this;
    };
    simplify = (P) => {
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
    reduce = () => {
        console.log(this._numerator.tex);
        this._numerator.factorize();
        console.log(this._numerator.factors.map(x => x.tex));
        for (let f of this._numerator.factors) {
            this.simplify(f);
        }
        return this;
    };
    opposed = () => {
        this._numerator.opposed();
        return this;
    };
    add = (R) => {
        let denominator = this._denominator.clone();
        this.amplify(R._denominator);
        this._numerator.add(R._numerator.clone().multiply(denominator));
        return this;
    };
    subtract = (R) => {
        return this.add(R.clone().opposed());
    };
    limits = (value, letter) => {
        if (value === Infinity || value === -Infinity) {
            let N = this._numerator.monomByDegree(this._numerator.degree(letter), letter), D = this._denominator.monomByDegree(this._denominator.degree(letter), letter);
            N.divide(D);
            if (N.degree(letter).isStrictlyPositive()) {
                return N.coefficient.sign() * (Math.pow((value > 0 ? 1 : -1), N.degree(letter).value % 2)) === 1 ? Infinity : -Infinity;
            }
            if (N.degree(letter).isZero()) {
                return N.coefficient;
            }
            if (N.degree(letter).isStrictlyPositive()) {
                return N.coefficient.sign() * (Math.pow(-1, N.degree(letter).value % 2)) === 1 ? 0 : -0;
            }
        }
        else {
            return this._numerator.evaluate({ letter: new fraction_1.Fraction(value) }).divide(this._denominator.evaluate({ letter: new fraction_1.Fraction(value) }));
        }
    };
}
exports.Rational = Rational;
//# sourceMappingURL=rational.js.map