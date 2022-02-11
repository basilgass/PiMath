"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolynomExp = exports.PolynomExpFactor = void 0;
class PolynomExpFactor {
    _factors;
    _powerAsInteger;
    constructor(...values) {
        this._powerAsInteger = false;
        this._factors = [];
    }
    addFactor = (value) => {
        this._factors.push({
            polynom: value.polynom.clone(),
            degree: value.degree.clone()
        });
        return this;
    };
    multiply = (value) => {
        for (let k of this._factors) {
            this.addFactor(k);
        }
        return this;
    };
    divide = (value) => {
        for (let k of this._factors) {
            this.addFactor({
                polynom: k.polynom,
                degree: k.degree.clone().opposed()
            });
        }
        return this;
    };
    get factors() {
        return this._factors;
    }
    get tex() {
        let numerators = [], denominators = [];
        for (let k of this._factors) {
            if (k.degree.isPositive()) {
                numerators.push(this.factorAsTex(k));
            }
            else {
                denominators.push(this.factorAsTex({
                    polynom: k.polynom,
                    degree: k.degree.clone().opposed()
                }));
            }
        }
        if (denominators.length > 0) {
            return `\\dfrac{ ${numerators.join('')} }{ ${denominators.join('')} }`;
        }
        else {
            return '';
        }
    }
    get powerAsInteger() {
        return this._powerAsInteger;
    }
    set powerAsInteger(value) {
        this._powerAsInteger = value;
    }
    factorAsTex = (factor, withParenthesis) => {
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
}
exports.PolynomExpFactor = PolynomExpFactor;
class PolynomExp {
    _factors;
    _powerAsInteger;
    constructor(...values) {
        this._factors = [];
        this._factors.push(new PolynomExpFactor());
    }
    addFactors = (value) => {
        value.powerAsInteger = this._powerAsInteger;
        this._factors.push(value);
        return this;
    };
    get tex() {
        return this._factors.map(x => x.tex).join('');
    }
    get powerAsInteger() {
        return this._powerAsInteger;
    }
    set powerAsInteger(value) {
        for (let factor of this._factors) {
            factor.powerAsInteger = value;
        }
        this._powerAsInteger = value;
    }
}
exports.PolynomExp = PolynomExp;
//# sourceMappingURL=polynomexp.js.map