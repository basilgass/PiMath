"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolynomExp = exports.PolynomExpFactor = exports.isFactor = void 0;
const polynom_1 = require("../algebra/polynom");
const fraction_1 = require("../coefficients/fraction");
function isFactor(value) {
    return value && 'polynom' in value && 'degree' in value;
}
exports.isFactor = isFactor;
class PolynomExpFactor {
    constructor(...values) {
        this.addFactor = (value) => {
            this._factors.push({
                polynom: new polynom_1.Polynom(value.polynom),
                degree: new fraction_1.Fraction(value.degree)
            });
            return this;
        };
        this.multiply = (value) => {
            for (const k of value.factors) {
                this.addFactor(k);
            }
            return this;
        };
        this.divide = (value) => {
            for (const k of value.factors) {
                this.addFactor({
                    polynom: k.polynom,
                    degree: k.degree.clone().opposed()
                });
            }
            return this;
        };
        this.derivative = (letter) => {
            // A*B*C*D =
            // Basic version
            // TODO: create derivative with more than only two factors.
            if (this._factors.length === 2) {
                const A = this._factors[0], B = this._factors[1], P = new PolynomExp();
                let Ad = this._factorDerivative(A), Bd = this._factorDerivative(B);
                P.add(new PolynomExpFactor({
                    polynom: A.polynom.derivative(letter),
                }));
            }
            return;
        };
        this._factorDerivative = (factor, letter) => {
            let derivativeExpression = new PolynomExpFactor();
            derivativeExpression.addFactor({ polynom: new polynom_1.Polynom(factor.degree), degree: new fraction_1.Fraction().one() });
            derivativeExpression.addFactor({ polynom: factor.polynom, degree: factor.degree.subtract(1) });
            derivativeExpression.addFactor({
                polynom: factor.polynom.clone().derivative(letter),
                degree: new fraction_1.Fraction().one()
            });
            return derivativeExpression;
        };
        this._factorAsTex = (factor, withParenthesis) => {
            let tex = '';
            if (factor.degree.isOne()) {
                if (withParenthesis === undefined || withParenthesis) {
                    tex = `\\left(${factor.polynom.tex}\\right)`;
                }
                else {
                    tex = factor.polynom.tex;
                }
            }
            else if (factor.degree.isNatural()) {
                tex = `\\left(${factor.polynom.tex}\\right)^{ ${factor.degree.tex} }`;
            }
            else {
                if (this._powerAsInteger) {
                    if (factor.degree.denominator === 2) {
                        tex = `\\sqrt{${factor.polynom.tex}}`;
                    }
                    else {
                        tex = `\\sqrt[${factor.degree.denominator}]{${factor.polynom.tex}}`;
                    }
                    if (factor.degree.numerator !== 1) {
                        tex += `^{ ${factor.degree.numerator} }`;
                    }
                }
                else {
                    tex = `\\left(${factor.polynom.tex}\\right)^{ ${factor.degree.tex} }`;
                }
            }
            return tex;
        };
        this._powerAsInteger = true;
        this._factors = [];
        for (let factor of values) {
            if (isFactor(factor)) {
                this.addFactor({
                    polynom: factor.polynom,
                    degree: factor.degree
                });
            }
        }
    }
    get factors() {
        return this._factors;
    }
    get powerAsInteger() {
        return this._powerAsInteger;
    }
    set powerAsInteger(value) {
        this._powerAsInteger = value;
    }
    get tex() {
        // group positive and negative degrees.
        const numerators = [], denominators = [];
        for (const k of this._factors) {
            if (k.degree.isPositive()) {
                numerators.push(this._factorAsTex(k));
            }
            else {
                denominators.push(this._factorAsTex({
                    polynom: k.polynom,
                    degree: k.degree.clone().opposed()
                }));
            }
        }
        if (denominators.length > 0) {
            return `\\frac{ ${numerators.length > 0 ? numerators.join('') : 1} }{ ${denominators.join('')} }`;
        }
        else {
            return numerators.join('');
        }
    }
}
exports.PolynomExpFactor = PolynomExpFactor;
class PolynomExp {
    constructor(...values) {
        this.add = (value) => {
            value.powerAsInteger = this._powerAsInteger;
            this._factors.push({
                factors: value,
                positive: true
            });
            return this;
        };
        this.subtract = (value) => {
            value.powerAsInteger = this._powerAsInteger;
            this._factors.push({
                factors: value,
                positive: false
            });
            return this;
        };
        this._factors = [];
        if (values !== undefined) {
            for (const factor of values) {
                console.log('ADDING', factor.tex);
                this._factors.push({
                    factors: factor,
                    positive: true
                });
            }
        }
        this._powerAsInteger = true;
    }
    get powerAsInteger() {
        return this._powerAsInteger;
    }
    set powerAsInteger(value) {
        for (const factor of this._factors) {
            factor.factors.powerAsInteger = value;
        }
        this._powerAsInteger = value;
    }
    get tex() {
        let tex = '';
        for (const factor of this._factors) {
            if (factor.factors.tex === '') {
                continue;
            }
            if (tex !== '' || !factor.positive) {
                tex += factor.positive ? '+' : '-';
            }
            tex += factor.factors.tex;
        }
        return tex;
    }
}
exports.PolynomExp = PolynomExp;
//# sourceMappingURL=polynomexp.bkp.js.map