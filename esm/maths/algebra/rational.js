"use strict";
/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
const polynom_1 = require("./polynom");
const fraction_1 = require("../coefficients/fraction");
const equation_1 = require("./equation");
const rationalStudy_1 = require("./study/rationalStudy");
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
            return new Rational(this._numerator.clone(), this._denominator.clone());
        };
        this.domain = () => {
            let zeroes = this._denominator.getZeroes();
            if (zeroes.length === 0 || zeroes[0].tex === equation_1.PARTICULAR_SOLUTION.real) {
                return equation_1.PARTICULAR_SOLUTION.varnothing;
            }
            else if (zeroes[0].tex === equation_1.PARTICULAR_SOLUTION.varnothing) {
                return equation_1.PARTICULAR_SOLUTION.real;
            }
            else {
                return '\\mathbb{R}\\setminus\\left\\{' +
                    zeroes.map(x => x.tex).join(';') + '\\right\\}';
            }
        };
        this.amplify = (P) => {
            this._numerator.multiply(P);
            this._denominator.multiply(P);
            return this;
        };
        this.derivative = (letter) => {
            let N = this._numerator.clone(), D = this._denominator.clone(), dN = N.clone().derivative(letter), dD = D.clone().derivative(letter);
            this._numerator = dN.clone().multiply(D).subtract(N.clone().multiply(dD));
            this._denominator = D.clone().pow(2);
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
        this.euclidian = () => {
            return this._numerator.euclidian(this._denominator);
        };
        // TODO : where and how is used limits ?
        this.limits = (value, offset, letter) => {
            if (value === Infinity || value === -Infinity) {
                let {quotient, reminder} = this._numerator.clone().euclidian(this._denominator);
                // quotient is positive => it will be infinite.
                if (quotient.degree(letter).isStrictlyPositive()) {
                    return value === Infinity ? quotient.limitToInfinity(letter) : quotient.limitToNegativeInfinity(letter);
                    // return quotient.monomByDegree(undefined, letter).coefficient.sign()===1?(new Fraction()).infinite():(new Fraction()).infinite().opposed()
                } else {
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
        this.evaluate = (values) => {
            const r = new fraction_1.Fraction().zero();
            let N = this._numerator.evaluate(values), D = this._denominator.evaluate(values);
            return N.divide(D);
        };
        this.study = () => {
            return new rationalStudy_1.RationalStudy(this);
        };
        if (numerator instanceof polynom_1.Polynom) {
            this._numerator = numerator.clone();
        } else if (typeof numerator === 'string') {
            this._numerator = new polynom_1.Polynom(numerator);
        } else {
            this._numerator = new polynom_1.Polynom();
        }
        if (denominator instanceof polynom_1.Polynom) {
            this._denominator = denominator.clone();
        }
        else if (typeof denominator === 'string') {
            this._denominator = new polynom_1.Polynom(denominator);
        }
        else {
            this._denominator = new polynom_1.Polynom();
        }
    }
    get numerator() {
        return this._numerator;
    }
    get denominator() {
        return this._denominator;
    }
    get tex() {
        return `\\frac{ ${this._numerator.tex} }{ ${this._denominator.tex} }`;
    }
    get texFactors() {
        return `\\frac{ ${this._numerator.texFactors} }{ ${this._denominator.texFactors} }`;
    }
    get plotFunction() {
        return `(${this._numerator.plotFunction})/(${this._denominator.plotFunction})`;
    }
}
exports.Rational = Rational;
//# sourceMappingURL=rational.js.map