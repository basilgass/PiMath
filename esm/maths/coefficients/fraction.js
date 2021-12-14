"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fraction = void 0;
const numeric_1 = require("../numeric");
class Fraction {
    _numerator;
    _denominator;
    constructor(value, denominatorOrPeriodic) {
        this._numerator = 1;
        this._denominator = 1;
        if (value !== undefined) {
            this.parse(value, denominatorOrPeriodic);
        }
        return this;
    }
    get isFraction() {
        return true;
    }
    get numerator() {
        return this._numerator;
    }
    set numerator(value) {
        this._numerator = value;
    }
    get denominator() {
        return this._denominator;
    }
    set denominator(value) {
        this._denominator = value;
    }
    get value() {
        return this._numerator / this._denominator;
    }
    get tex() {
        if (this._denominator === 1) {
            return `${this._numerator}`;
        }
        else if (this._numerator < 0) {
            return `-\\frac{ ${-this._numerator} }{ ${this._denominator} }`;
        }
        else {
            return `\\frac{ ${this._numerator} }{ ${this._denominator} }`;
        }
    }
    get display() {
        if (this._denominator === 1) {
            return `${this._numerator}`;
        }
        else {
            return `${this._numerator}/${this._denominator}`;
        }
    }
    get frac() {
        return this.tex;
    }
    get dfrac() {
        return this.tex.replace('\\frac', '\\dfrac');
    }
    parse = (value, denominatorOrPeriodic) => {
        let S;
        if (value === null || value === "") {
            this._numerator = 0;
            this._denominator = 1;
            return this;
        }
        switch (typeof value) {
            case "string":
                S = value.split('/');
                if (S.length > 2)
                    throw "Two many divide signs";
                if (S.map(x => x === '' || isNaN(Number(x))).includes(true))
                    throw "Not a number";
                if (S.length === 1) {
                    return this.parse(+S[0]);
                }
                else if (S.length === 2) {
                    if (S[1] === '0') {
                        this._numerator = NaN;
                        this._denominator = 1;
                    }
                    else {
                        this._numerator = +S[0];
                        this._denominator = +S[1];
                    }
                }
                else {
                    this._numerator = NaN;
                    this._denominator = 1;
                }
                break;
            case "number":
                if (Number.isSafeInteger(value)) {
                    this._numerator = +value;
                    if (denominatorOrPeriodic === undefined || !Number.isSafeInteger(denominatorOrPeriodic)) {
                        this._denominator = 1;
                    }
                    else {
                        this._denominator = +denominatorOrPeriodic;
                    }
                }
                else {
                    let p = (value.toString()).split('.')[1].length;
                    if (denominatorOrPeriodic === undefined) {
                        this._numerator = value * Math.pow(10, p);
                        this._denominator = Math.pow(10, p);
                    }
                    else if (Number.isSafeInteger(denominatorOrPeriodic)) {
                        this._numerator = value * Math.pow(10, p) - Math.floor(value * Math.pow(10, p - denominatorOrPeriodic));
                        this.denominator = Math.pow(10, p) - Math.pow(10, p - denominatorOrPeriodic);
                    }
                }
                break;
            case "object":
                if (value.isFraction) {
                    this._numerator = +value.numerator;
                    this._denominator = +value.denominator;
                }
                break;
        }
        return this;
    };
    clone = () => {
        let F = new Fraction();
        F.numerator = +this._numerator;
        F.denominator = +this._denominator;
        return F;
    };
    zero = () => {
        this._numerator = 0;
        this._denominator = 1;
        return this;
    };
    one = () => {
        this._numerator = 1;
        this._denominator = 1;
        return this;
    };
    infinite = () => {
        this._numerator = Infinity;
        this._denominator = 1;
        return this;
    };
    invalid = () => {
        this._numerator = NaN;
        this._denominator = 1;
        return this;
    };
    opposed = () => {
        this._numerator = -this._numerator;
        return this;
    };
    add = (F) => {
        if (F instanceof Fraction) {
            let N = this._numerator, D = this._denominator;
            this._numerator = N * F.denominator + F.numerator * D;
            this._denominator = D * F.denominator;
        }
        else {
            return this.add(new Fraction(F));
        }
        return this.reduce();
    };
    subtract = (F) => {
        if (F instanceof Fraction) {
            return this.add(F.clone().opposed());
        }
        else {
            return this.add(-F);
        }
    };
    multiply = (F) => {
        let Q = new Fraction(F);
        this._numerator = this._numerator * Q.numerator;
        this._denominator = this._denominator * Q.denominator;
        return this.reduce();
    };
    divide = (F) => {
        let Q = new Fraction(F);
        if (Q.numerator === 0) {
            return new Fraction().infinite();
        }
        let N = +this._numerator, D = +this._denominator;
        this._numerator = N * Q.denominator;
        this._denominator = D * Q.numerator;
        return this.reduce();
    };
    invert = () => {
        let n = +this._numerator, d = +this._denominator;
        this._numerator = d;
        this._denominator = n;
        return this;
    };
    pow = (p) => {
        if (p instanceof Fraction) {
            return this.pow(p.value);
        }
        if (!Number.isSafeInteger(p)) {
            return this.invalid();
        }
        this.reduce();
        if (p < 0) {
            this.invert();
        }
        this._numerator = this._numerator ** Math.abs(p);
        this._denominator = this._denominator ** Math.abs(p);
        return this;
    };
    root = (p) => {
        if (p === 0) {
            return this;
        }
        if (p < 0) {
            this.invert();
        }
        let n = Math.pow(this._numerator, Math.abs(1 / p)), d = Math.pow(this._denominator, Math.abs(1 / p));
        this._numerator = Math.pow(this._numerator, Math.abs(1 / p));
        this._denominator = Math.pow(this._denominator, Math.abs(1 / p));
        return this;
    };
    sqrt = () => {
        return this.root(2);
    };
    abs = () => {
        this._numerator = Math.abs(this._numerator);
        this._denominator = Math.abs(this._denominator);
        return this;
    };
    static max = (...fractions) => {
        let M = new Fraction(fractions[0]);
        for (let m of fractions) {
            let compare = new Fraction(m);
            if (compare.greater(M)) {
                M = compare.clone();
            }
        }
        return M;
    };
    static min = (...fractions) => {
        let M = new Fraction(fractions[0]);
        for (let m of fractions) {
            let compare = new Fraction(m);
            if (compare.lesser(M)) {
                M = compare.clone();
            }
        }
        return M;
    };
    reduce = () => {
        let g = numeric_1.Numeric.gcd(this._numerator, this._denominator);
        this._numerator = this._numerator / g;
        this._denominator = this._denominator / g;
        if (this._denominator < 0) {
            this._denominator = -this._denominator;
            this._numerator = -this._numerator;
        }
        return this;
    };
    amplify = (k) => {
        if (Number.isSafeInteger(k)) {
            this._numerator *= k;
            this._denominator *= k;
        }
        return this;
    };
    compare = (F, sign) => {
        if (sign === undefined) {
            sign = '=';
        }
        let compareFraction;
        if (F instanceof Fraction) {
            compareFraction = F.clone();
        }
        else {
            compareFraction = new Fraction(F);
        }
        switch (sign) {
            case '>':
                return this.value > compareFraction.value;
            case ">=" || "=>" || "geq":
                return this.value >= compareFraction.value;
            case "<":
                return this.value < compareFraction.value;
            case "<=" || "=>" || "leq":
                return this.value <= compareFraction.value;
            case "=":
                return this.value === compareFraction.value;
            case "<>":
                return this.value !== compareFraction.value;
            default:
                return false;
        }
    };
    lesser = (than) => {
        return this.compare(than, '<');
    };
    leq = (than) => {
        return this.compare(than, '<=');
    };
    greater = (than) => {
        return this.compare(than, '>');
    };
    geq = (than) => {
        return this.compare(than, '>=');
    };
    isEqual = (than) => {
        return this.compare(than, '=');
    };
    isNotEqual = (than) => {
        return this.compare(than, '<>');
    };
    isOpposed = (p) => {
        return this.isEqual(p.clone().opposed());
    };
    isInverted = (p) => {
        return this.isEqual(new Fraction().one().divide(p.clone()));
    };
    isZero = () => {
        return this._numerator === 0;
    };
    isNotZero = () => {
        return this._numerator !== 0;
    };
    isOne = () => {
        return this._numerator === 1 && this._denominator === 1;
    };
    isNegativeOne = () => {
        return this._numerator === -1 && this._denominator === 1;
    };
    isPositive = () => {
        return this.sign() === 1;
    };
    isNegative = () => {
        return this.sign() === -1;
    };
    isStrictlyPositive = () => {
        return this.value > 0;
    };
    isStrictlyNegative = () => {
        return this.value < 0;
    };
    isNaN = () => {
        return isNaN(this._numerator);
    };
    isInfinity = () => {
        return this._numerator === Infinity;
    };
    isFinite = () => {
        return !this.isInfinity();
    };
    isSquare = () => {
        return Math.sqrt(this._numerator) % 1 === 0 && Math.sqrt(this._denominator) % 1 === 0;
    };
    isReduced = () => {
        return Math.abs(numeric_1.Numeric.gcd(this._numerator, this._denominator)) === 1;
    };
    isNatural = () => {
        return this.clone().reduce().denominator === 1;
    };
    isRational = () => {
        return !this.isNatural();
    };
    isEven = () => {
        return this.isNatural() && this.value % 2 === 0;
    };
    isOdd = () => {
        return this.isNatural() && this.value % 2 === 1;
    };
    sign = () => {
        return (this._numerator * this._denominator >= 0) ? 1 : -1;
    };
    areEquals = (...F) => {
        for (let i = 0; i < F.length; i++) {
            if (!this.isEqual(F[i])) {
                return false;
            }
        }
        return true;
    };
}
exports.Fraction = Fraction;
//# sourceMappingURL=fraction.js.map