"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fraction = void 0;
const numeric_1 = require("../numeric");
class Fraction {
    constructor(value, denominatorOrPeriodic) {
        this.parse = (value, denominatorOrPeriodic) => {
            let S;
            if (value === null) {
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
        this.clone = () => {
            let F = new Fraction();
            F.numerator = +this._numerator;
            F.denominator = +this._denominator;
            return F;
        };
        this.zero = () => {
            this._numerator = 0;
            this._denominator = 1;
            return this;
        };
        this.one = () => {
            this._numerator = 1;
            this._denominator = 1;
            return this;
        };
        this.infinite = () => {
            this._numerator = Infinity;
            this._denominator = 1;
            return this;
        };
        this.invalid = () => {
            this._numerator = NaN;
            this._denominator = 1;
            return this;
        };
        this.opposed = () => {
            this._numerator = -this._numerator;
            return this;
        };
        this.add = (F) => {
            let N = this._numerator, D = this._denominator;
            this._numerator = N * F.denominator + F.numerator * D;
            this._denominator = D * F.denominator;
            return this.reduce();
        };
        this.subtract = (F) => {
            return this.add(F.clone().opposed());
        };
        this.multiply = (F) => {
            let Q = new Fraction(F);
            this._numerator = this._numerator * Q.numerator;
            this._denominator = this._denominator * Q.denominator;
            return this.reduce();
        };
        this.divide = (F) => {
            let Q = new Fraction(F);
            if (Q.numerator === 0) {
                return new Fraction().infinite();
            }
            let N = +this._numerator, D = +this._denominator;
            this._numerator = N * Q.denominator;
            this._denominator = D * Q.numerator;
            return this.reduce();
        };
        this.invert = () => {
            let n = +this._numerator, d = +this._denominator;
            this._numerator = d;
            this._denominator = n;
            return this;
        };
        this.pow = (p) => {
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
        this.root = (p) => {
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
        this.sqrt = () => {
            return this.root(2);
        };
        this.abs = () => {
            this._numerator = Math.abs(this._numerator);
            this._denominator = Math.abs(this._denominator);
            return this;
        };
        this.reduce = () => {
            let g = numeric_1.Numeric.gcd(this._numerator, this._denominator);
            this._numerator = this._numerator / g;
            this._denominator = this._denominator / g;
            if (this._denominator < 0) {
                this._denominator = -this._denominator;
                this._numerator = -this._numerator;
            }
            return this;
        };
        this.amplify = (k) => {
            if (Number.isSafeInteger(k)) {
                this._numerator *= k;
                this._denominator *= k;
            }
            return this;
        };
        this.compare = (F, sign) => {
            if (sign === undefined) {
                sign = '=';
            }
            switch (sign) {
                case '>':
                    return this.value > F.value;
                case ">=" || "=>" || "geq":
                    return this.value >= F.value;
                case "<":
                    return this.value < F.value;
                case "<=" || "=>" || "leq":
                    return this.value <= F.value;
                case "=":
                    return this.value === F.value;
                case "<>":
                    return this.value !== F.value;
                default:
                    return false;
            }
        };
        this.lesser = (than) => {
            return this.compare(than, '<');
        };
        this.leq = (than) => {
            return this.compare(than, '<=');
        };
        this.greater = (than) => {
            return this.compare(than, '>');
        };
        this.geq = (than) => {
            return this.compare(than, '>=');
        };
        this.isEqual = (than) => {
            return this.compare(than, '=');
        };
        this.isDifferent = (than) => {
            return this.compare(than, '<>');
        };
        this.isOpposed = (p) => {
            return this.isEqual(p.clone().opposed());
        };
        this.isInverted = (p) => {
            return this.isEqual(new Fraction().one().divide(p.clone()));
        };
        this.isZero = () => {
            return this._numerator === 0;
        };
        this.isOne = () => {
            return this._numerator === 1 && this._denominator === 1;
        };
        this.isPositive = () => {
            return this.sign() === 1;
        };
        this.isNegative = () => {
            return this.sign() === -1;
        };
        this.isNaN = () => {
            return isNaN(this._numerator);
        };
        this.isInfinity = () => {
            return this._numerator === Infinity;
        };
        this.isFinite = () => {
            return !this.isInfinity();
        };
        this.isSquare = () => {
            return Math.sqrt(this._numerator) % 1 === 0 && Math.sqrt(this._denominator) % 1 === 0;
        };
        this.sign = () => {
            return (this._numerator * this._denominator >= 0) ? 1 : -1;
        };
        this.areEquals = (...F) => {
            for (let i = 0; i < F.length; i++) {
                if (!this.isEqual(F[i])) {
                    return false;
                }
            }
            return true;
        };
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
}
exports.Fraction = Fraction;
//# sourceMappingURL=fraction.js.map