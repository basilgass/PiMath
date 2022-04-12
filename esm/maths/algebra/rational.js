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
            if (zeroes.length === 0 || zeroes[0].tex === equation_1.PARTICULAR_SOLUTION.real) {
                return equation_1.PARTICULAR_SOLUTION.real;
            }
            else if (zeroes[0].tex === equation_1.PARTICULAR_SOLUTION.varnothing) {
                return equation_1.PARTICULAR_SOLUTION.varnothing;
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
        this.makeTableOfSigns = () => {
            // Factorize the numerator and the denominator
            this._numerator.factorize();
            this._denominator.factorize();
            let zeroes = equation_1.Equation.makeSolutionsUnique([...this._numerator.getZeroes(), ...this._denominator.getZeroes()], true).filter(x => !isNaN(x.value)), NFactors = this._numerator.factors, DFactors = this._denominator.factors;
            let tableOfSigns = [], result = [];
            NFactors.forEach(factor => {
                tableOfSigns.push(this._makeOneLineOfTableOfSigns(factor, zeroes, 'z'));
            });
            DFactors.forEach(factor => {
                tableOfSigns.push(this._makeOneLineOfTableOfSigns(factor, zeroes, 'd'));
            });
            // Empty line
            tableOfSigns.push([]);
            // Add the final row as cumulative
            let resultLine = tableOfSigns[0].map((x, index) => {
                if (index === 0) {
                    return '';
                }
                if (index === tableOfSigns[0].length - 1) {
                    return '';
                }
                if (index % 2 === 0) {
                    return 't';
                }
                return '+';
            });
            for (let current of tableOfSigns) {
                for (let i = 0; i < current.length; i++) {
                    if (i % 2 === 0) {
                        // t, z or d
                        if (resultLine[i] === 'd') {
                            continue;
                        }
                        if (current[i] !== 't') {
                            resultLine[i] = current[i];
                        }
                    }
                    else {
                        // + or -
                        if (current[i] === '-') {
                            resultLine[i] = resultLine[i] === '+' ? '-' : '+';
                        }
                    }
                }
            }
            // Add the variation line.
            // TODO: add the variation line.
            tableOfSigns.push(resultLine);
            let tos = {
                factors: [...NFactors, ...DFactors],
                zeroes: zeroes,
                signs: tableOfSigns,
                tex: ''
            };
            this._makeTexFromTableOfSigns(tos);
            return tos;
        };
        this._makeTexFromTableOfSigns = (tos) => {
            let tex = `\\begin{tikzpicture}
\\tkzTabInit[lgt=3,espcl=2,deltacl=0]{/1.2,\\(${tos.factors.map(x => x.tex).join('\\)/1,\\(')}\\)/1,/.1,\\(f(x)\\)/1.2}{{\\scriptsize \\hspace{1cm} \\(-\\infty\\)},\\(${tos.zeroes.map(x => x.tex).join('\\),\\(')}\\),{\\scriptsize \\hspace{-1cm} \\(+\\infty\\)}}`;
            tos.signs.forEach(list => {
                tex += (`\n\\tkzTabLine{${list.join(',')}}`);
            });
            tex += `\n\\end{tikzpicture}`;
            tos.tex = tex;
            return tex;
        };
        this._makeOneLineOfTableOfSigns = (factor, zeroes, zeroSign) => {
            let oneLine = [], currentZero = factor.getZeroes().map(x => x.tex);
            // First +/- sign, before the first zero
            oneLine.push('');
            if (factor.degree().isZero()) {
                oneLine.push(factor.monoms[0].coefficient.sign() === 1 ? '+' : '-');
            }
            else {
                oneLine.push(factor.evaluate(zeroes[0].value - 1).sign() === 1 ? '+' : '-');
            }
            for (let i = 0; i < zeroes.length; i++) {
                // Add the zero if it's the current one
                oneLine.push(currentZero.includes(zeroes[i].tex) ? zeroSign : 't');
                // + / - sign after the current zero
                if (i < zeroes.length - 1) {
                    oneLine.push(factor.evaluate((zeroes[i].value + zeroes[i + 1].value) / 2).sign() === 1 ? '+' : '-');
                }
                else if (i === zeroes.length - 1) {
                    oneLine.push(factor.evaluate(zeroes[i].value + 1).sign() === 1 ? '+' : '-');
                }
            }
            oneLine.push('');
            return oneLine;
        };
        this.evaluate = (values) => {
            const r = new fraction_1.Fraction().zero();
            let N = this._numerator.evaluate(values), D = this._numerator.evaluate(values);
            return N.divide(D);
        };
        if (numerator instanceof polynom_1.Polynom) {
            this._numerator = numerator.clone();
        }
        else if (typeof numerator === 'string') {
            this._numerator = new polynom_1.Polynom(numerator);
        }
        else {
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