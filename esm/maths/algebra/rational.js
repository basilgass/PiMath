"use strict";
/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
const polynom_1 = require("./polynom");
const fraction_1 = require("../coefficients/fraction");
/**
 * Rational class can handle rational polynoms
 */
class Rational {
    /**
     *
     * @param numerator
     * @param denominator
     */
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
            // 1. Make sure both rational are at the same denominator
            // 2. Add the numerators.
            // 3. Simplify
            // Store the adding denominator
            let denominator = this._denominator.clone();
            // Amplif the main rational polynom by the adding denominator
            this.amplify(R._denominator);
            // Add to the numerator the adding value...
            this._numerator.add(R._numerator.clone().multiply(denominator));
            return this;
        };
        this.subtract = (R) => {
            return this.add(R.clone().opposed());
        };
        this.limits = (value, offset, letter) => {
            if (value === Infinity || value === -Infinity) {
                let { quotient, reminder } = this._numerator.clone().euclidian(this._denominator);
                // quotient is positive => it will be infinite.
                if (quotient.degree(letter).isStrictlyPositive()) {
                    return value === Infinity ? quotient.limitToInfinity(letter) : quotient.limitToNegativeInfinity(letter);
                    // return quotient.monomByDegree(undefined, letter).coefficient.sign()===1?(new Fraction()).infinite():(new Fraction()).infinite().opposed()
                }
                else {
                    return quotient.monomByDegree(undefined, letter).coefficient;
                }
            }
            else {
                let evalValues = {}, evalValuesOffset = {}, theLimit, theSign, FR = this.clone().reduce();
                evalValues[letter === undefined ? 'x' : letter] = new fraction_1.Fraction(value);
                if (offset !== 'above' && offset !== 'below') {
                    theLimit = FR._numerator.evaluate(evalValues)
                        .divide(FR._denominator.evaluate(evalValues));
                    return theLimit.isInfinity() ? theLimit.abs() : theLimit;
                }
                else {
                    if (offset === 'above') {
                        evalValuesOffset[letter === undefined ? 'x' : letter] = (new fraction_1.Fraction(value)).add(0.000001);
                    }
                    else if (offset === 'below') {
                        evalValuesOffset[letter === undefined ? 'x' : letter] = (new fraction_1.Fraction(value)).subtract(0.000001);
                    }
                    theLimit = FR._numerator.evaluate(evalValues)
                        .divide(FR._denominator.evaluate(evalValues));
                    theSign = FR._numerator.evaluate(evalValuesOffset)
                        .divide(FR._denominator.evaluate(evalValuesOffset)).sign();
                    if (theLimit.isInfinity()) {
                        return theSign === 1 ? theLimit.abs() : theLimit.abs().opposed();
                    }
                    else {
                        return theLimit;
                    }
                }
            }
        };
        this._numerator = numerator ? numerator.clone() : new polynom_1.Polynom();
        this._denominator = denominator ? denominator.clone() : new polynom_1.Polynom();
    }
    get numerator() {
        return this._numerator;
    }
    get denominator() {
        return this._denominator;
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