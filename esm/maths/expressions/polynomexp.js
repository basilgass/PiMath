"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolynomExpProduct = exports.PolynomExpFactor = void 0;
const algebra_1 = require("../algebra");
const coefficients_1 = require("../coefficients");
class PolynomExpFactor {
    constructor(polynom, degree, mathFunction) {
        this._polynom = new algebra_1.Polynom(polynom);
        this._degree = new coefficients_1.Fraction(degree === undefined ? 1 : degree);
        this._fn = mathFunction;
        this._powerAsInteger = true;
        this._forceParenthesis = true;
    }
    _forceParenthesis;
    get forceParenthesis() {
        return this._forceParenthesis;
    }
    set forceParenthesis(value) {
        this._forceParenthesis = value;
    }
    _fn;
    get fn() {
        return this._fn;
    }
    set fn(value) {
        this._fn = value;
    }
    _powerAsInteger;
    get powerAsInteger() {
        return this._powerAsInteger;
    }
    set powerAsInteger(value) {
        this._powerAsInteger = value;
    }
    _polynom;
    get polynom() {
        return this._polynom;
    }
    set polynom(value) {
        this._polynom = value;
    }
    _degree;
    get degree() {
        return this._degree;
    }
    set degree(value) {
        this._degree = value;
    }
    get tex() {
        let tex;
        if (this._degree.isOne() && (this._fn !== undefined || !this._forceParenthesis)) {
            tex = this._polynom.tex;
        }
        else {
            if (this._powerAsInteger && !this._degree.isRelative()) {
                tex = `\\sqrt${this._degree.denominator !== 2 ? `[ ${this._degree.denominator} ]` : ''}{ ${this._polynom.tex} }^{ ${this._degree.numerator} }`;
            }
            else if (this.isCoefficient && this.firstCoefficient.isNatural()) {
                tex = this._polynom.tex + this._texDegree;
            }
            else {
                tex = `\\left( ${this._polynom.tex} \\right)${this._texDegree}`;
            }
        }
        if (this._fn !== undefined && this._fn.tex !== undefined) {
            tex = `${this._fn.tex}\\left( ${tex} \\right)`;
        }
        return tex;
    }
    get isCoefficient() {
        return this._polynom.degree().isZero();
    }
    get firstCoefficient() {
        return this._polynom.monomByDegree().coefficient;
    }
    get _texDegree() {
        if (this._degree.isOne()) {
            return '';
        }
        else {
            return `^{ ${this._degree.tfrac} }`;
        }
    }
    setForceParenthesis(value) {
        this._forceParenthesis = value === undefined || value;
        return this;
    }
    derivative(letter) {
        if (this._degree.isOne()) {
            return new PolynomExpProduct(new PolynomExpFactor(this._polynom.clone().derivative(letter)));
        }
        else {
            return new PolynomExpProduct(new PolynomExpFactor(this._degree.clone()), new PolynomExpFactor(this._polynom.clone().derivative(letter)), new PolynomExpFactor(this._polynom.clone(), this._degree.clone().subtract(1)));
        }
    }
}
exports.PolynomExpFactor = PolynomExpFactor;
class PolynomExpProduct {
    constructor(...values) {
        this._factors = values || [];
        this._positive = true;
        this._asPositiveDegree = true;
    }
    _fn;
    get fn() {
        return this._fn;
    }
    set fn(value) {
        this._fn = value;
    }
    _factors;
    get factors() {
        return this._factors;
    }
    set factors(value) {
        this._factors = value;
    }
    _positive;
    get positive() {
        return this._positive;
    }
    set positive(value) {
        this._positive = value;
    }
    _asPositiveDegree;
    get asPositiveDegree() {
        return this._asPositiveDegree;
    }
    set asPositiveDegree(value) {
        this._asPositiveDegree = value;
    }
    get tex() {
        let parenthesis = this._factors.length > 1;
        let tex = this._factors.map(factor => factor.setForceParenthesis(parenthesis).tex).join(' \\cdot ');
        if (this._asPositiveDegree) {
            const numerators = this._factors.filter(x => x.degree.isPositive()), denominators = this._factors.filter(x => x.degree.isNegative());
            let numeratorsAsTex, denominatorsAsTex;
            if (denominators.length > 0) {
                if (numerators.length === 0) {
                    numeratorsAsTex = [1];
                }
                else if (numerators.length === 1) {
                    numeratorsAsTex = [numerators[0].setForceParenthesis(false).tex];
                }
                else {
                    parenthesis = numerators.length > 1;
                    numeratorsAsTex = numerators.map(factor => factor.setForceParenthesis(parenthesis).tex);
                }
                denominators.map(x => x.degree.opposed());
                if (denominators.length === 1) {
                    denominatorsAsTex = [denominators[0].setForceParenthesis(false).tex];
                }
                else {
                    parenthesis = denominators.length > 1;
                    denominatorsAsTex = denominators.map(factor => factor.setForceParenthesis(parenthesis).tex);
                }
                denominators.map(x => x.degree.opposed());
                tex = `\\dfrac{ ${numeratorsAsTex.join(' \\cdot ')} }{ ${denominatorsAsTex.join(' \\cdot ')} }`;
            }
        }
        if (this._fn !== undefined && this._fn.name !== undefined && this._fn.name !== '') {
            tex = `${this._fn.tex}\\left( ${tex} \\right)`;
        }
        return tex;
    }
    reduce() {
        let coefficients = this._factors.filter(factor => factor.isCoefficient), polynoms = this._factors.filter(factor => !factor.isCoefficient);
        let result = new coefficients_1.Fraction().one();
        if (coefficients.length > 1) {
            for (const factor of coefficients) {
                if (factor.degree.isPositive()) {
                    result.multiply(factor.polynom.monoms[0].coefficient.pow(factor.degree));
                }
                else {
                    result.divide(factor.polynom.monoms[0].coefficient.pow(factor.degree.clone().abs()));
                }
            }
        }
        else if (coefficients.length === 1) {
            result = coefficients[0].polynom.monoms[0].coefficient;
        }
        if (result.isOne()) {
            this._factors = [...polynoms];
        }
        else if (!result.isRelative()) {
            this._factors = [
                new PolynomExpFactor(result.numerator),
                new PolynomExpFactor(result.denominator, -1),
                ...polynoms
            ];
        }
        else {
            this._factors = [
                new PolynomExpFactor(result),
                ...polynoms
            ];
        }
        return this;
    }
    integrate(letter) {
        if (this._factors.length === 2) {
            let d1 = this._factors[0].polynom.degree(letter).value, d2 = this._factors[1].polynom.degree(letter).value;
            if (d1 === d2 + 1) {
                return this._integrateWithInternalDerivative(this._factors[0], this._factors[1], letter);
            }
            else if (d1 + 1 === d2) {
                return this._integrateWithInternalDerivative(this._factors[1], this._factors[0], letter);
            }
        }
        return;
    }
    applyMathFunction(mathFn) {
        this._fn = mathFn;
        return this;
    }
    _integrateWithInternalDerivative(P, Pinternal, letter) {
        let internalDerivative = P.polynom.clone().derivative(letter);
        let { quotient, reminder } = Pinternal.polynom.clone().euclidian(internalDerivative);
        if (reminder.isZero() && quotient.degree(letter).isZero()) {
            if (P.degree.isEqual(-1)) {
                return (new PolynomExpProduct(new PolynomExpFactor(quotient, 1), new PolynomExpFactor(P.polynom.clone(), 1, {
                    name: 'ln', tex: '\\ln', fn: (x) => Math.log(x)
                })));
            }
            else {
                return new PolynomExpProduct(new PolynomExpFactor(P.degree.clone().add(1).invert(), 1), new PolynomExpFactor(quotient, 1), new PolynomExpFactor(P.polynom.clone(), P.degree.clone().add(1)));
            }
        }
        return;
    }
}
exports.PolynomExpProduct = PolynomExpProduct;
//# sourceMappingURL=polynomexp.js.map