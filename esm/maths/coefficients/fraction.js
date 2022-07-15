"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fraction = void 0;
const numeric_1 = require("../numeric");
/**
 * The fraction class make possible to handle
 * TODO: Write the documentation correctly.
 * \\(\frac{a}{b}\\) or \\[\frac{a}{b}\\]  values.
 */
class Fraction {
    constructor(value, denominatorOrPeriodic) {
        this.isApproximative = () => {
            return this._numerator.toString().length >= 15 && this._denominator.toString().length >= 15;
        };
        this.isExact = () => {
            return !this.isApproximative();
        };
        // ------------------------------------------
        /**
         * Parse the value to get the numerator and denominator
         * @param value : number or string to parse to get the fraction
         * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
         */
        this.parse = (value, denominatorOrPeriodic) => {
            let S;
            // A null value means a zero fraction.
            if (value === null || value === "") {
                this._numerator = 0;
                this._denominator = 1;
                return this;
            }
            switch (typeof value) {
                case "string":
                    // Split the string value in two parts: Numerator/Denominator
                    S = value.split('/');
                    // Security checks
                    if (S.length > 2)
                        throw value + " has too many divide signs";
                    if (S.map(x => x === '' || isNaN(Number(x))).includes(true))
                        throw value + " is not a valid number";
                    if (S.length === 1) {
                        // No divide sign - it's a number
                        return this.parse(+S[0]);
                    }
                    else if (S.length === 2) {
                        // One divide signe
                        // We check if the denominator is zero
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
                        // More than one divide sign ?
                        // This is impossible
                        this._numerator = NaN;
                        this._denominator = 1;
                    }
                    break;
                case "number":
                    if (Number.isSafeInteger(value)) {
                        // The given value is an integer
                        this._numerator = +value;
                        if (denominatorOrPeriodic === undefined || !Number.isSafeInteger(denominatorOrPeriodic)) {
                            this._denominator = 1;
                        }
                        else {
                            this._denominator = +denominatorOrPeriodic;
                        }
                    }
                    else {
                        // The given value is a float number
                        // Get the number of decimals after the float sign
                        let [unit, decimal] = (value.toString()).split('.');
                        let p = decimal.length;
                        // Detect if the decimal part is periodic or not...
                        // Transform the float number in two integer
                        if (denominatorOrPeriodic === undefined) {
                            this._numerator = value * Math.pow(10, p);
                            this._denominator = Math.pow(10, p);
                        }
                        else if (Number.isSafeInteger(denominatorOrPeriodic)) {
                            this._numerator = value * Math.pow(10, p) - Math.floor(value * Math.pow(10, p - denominatorOrPeriodic));
                            this.denominator = Math.pow(10, p) - Math.pow(10, p - denominatorOrPeriodic);
                        }
                        this.reduce();
                    }
                    break;
                case "object":
                    if (value instanceof Fraction) {
                        this._numerator = +value.numerator;
                        this._denominator = +value.denominator;
                    }
                    break;
            }
            return this;
        };
        // ------------------------------------------
        // Mathematical operations
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
        // ------------------------------------------
        this.opposed = () => {
            this._numerator = -this._numerator;
            return this;
        };
        this.add = (F) => {
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
        this.subtract = (F) => {
            if (F instanceof Fraction) {
                return this.add(F.clone().opposed());
            }
            else {
                return this.add(-F);
            }
        };
        this.multiply = (F) => {
            // Parse the value.
            // If it's a fraction, return a clone of it
            // If it's an integer, return the fraction F/1
            let Q = new Fraction(F);
            this._numerator = this._numerator * Q.numerator;
            this._denominator = this._denominator * Q.denominator;
            return this.reduce();
        };
        this.xMultiply = (...values) => {
            // Parse the value.
            // If it's a fraction, return a clone of it
            // If it's an integer, return the fraction F/1
            for (let value of values) {
                let F = new Fraction(value);
                this._numerator = this._numerator * F.numerator;
                this._denominator = this._denominator * F.denominator;
            }
            return this;
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
            // TODO: Fraction.pow with a value different than a safe integer !
            if (p instanceof Fraction) {
                return this.pow(p.value);
            }
            this.reduce();
            if (p < 0) {
                this.invert();
            }
            // Check if numerator and denominator are roots of...
            // othervise, convert to numeric.
            let controlNumerator = Math.floor(Math.pow(this._numerator, Math.abs(p))), controlDenominator = Math.floor(Math.pow(this._denominator, Math.abs(p)));
            if (controlNumerator ** Math.abs(p) === this._numerator
                &&
                    controlDenominator ** Math.abs(p) === this._denominator) {
                this._numerator = this._numerator ** Math.abs(p);
                this._denominator = this._denominator ** Math.abs(p);
            }
            else {
                this._numerator = this._numerator ** Math.abs(p);
                this._denominator = this._denominator ** Math.abs(p);
            }
            return this;
        };
        this.root = (p) => {
            // TODO: nth - root of a fraction => this will return another type of coefficient.
            // Check if they are perfect roots..
            if (p === 0) {
                return this;
            }
            // If negative, invert the fraction
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
        // ------------------------------------------
        // Mathematical operations specific to fractions
        // ------------------------------------------
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
        // ------------------------------------------
        // Compare functions
        // ------------------------------------------
        /**
         * Compare the current coefficient with another coefficient
         * @param F (Coefficient) The coefficient to compare
         * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
         */
        this.compare = (F, sign) => {
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
                    // let F2: Fraction = compareFraction.clone().reduce(),
                    //     F1: Fraction = this.clone().reduce();
                    // return (F1.numerator === F2.numerator && F1.denominator === F2.denominator);
                    return this.value === compareFraction.value;
                case "<>":
                    return this.value !== compareFraction.value;
                default:
                    return false;
            }
        };
        /* Compare shortcuts */
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
        this.isNotEqual = (than) => {
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
        this.isNotZero = () => {
            return this._numerator !== 0;
        };
        this.isOne = () => {
            return this._numerator === 1 && this._denominator === 1;
        };
        this.isNegativeOne = () => {
            return this._numerator === -1 && this._denominator === 1;
        };
        this.isPositive = () => {
            return this.sign() === 1;
        };
        this.isNegative = () => {
            return this.sign() === -1;
        };
        this.isStrictlyPositive = () => {
            return this.value > 0;
        };
        this.isStrictlyNegative = () => {
            return this.value < 0;
        };
        this.isNaN = () => {
            return isNaN(this._numerator);
        };
        this.isInfinity = () => {
            return Math.abs(this._numerator) === Infinity;
        };
        this.isFinite = () => {
            return !this.isInfinity() && !this.isNaN();
        };
        this.isSquare = () => {
            return Math.sqrt(this._numerator) % 1 === 0 && Math.sqrt(this._denominator) % 1 === 0;
        };
        this.isReduced = () => {
            return Math.abs(numeric_1.Numeric.gcd(this._numerator, this._denominator)) === 1;
        };
        this.isNatural = () => {
            return this.isRelative() && this.isPositive();
        };
        this.isRelative = () => {
            return this.clone().reduce().denominator === 1;
        };
        this.isRational = () => {
            return !this.isRelative();
        };
        this.isEven = () => {
            return this.isRelative() && this.value % 2 === 0;
        };
        this.isOdd = () => {
            return this.isRelative() && this.value % 2 === 1;
        };
        this.sign = () => {
            return (this._numerator * this._denominator >= 0) ? 1 : -1;
        };
        // TODO: The rest of the functions are not used or unnecessary ?
        /**
         * Simple function to determine if it's a fraction
         */
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
    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
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
    // Display getter
    get tex() {
        if (this.isInfinity()) {
            return `${this.sign() === 1 ? '+' : '-'}\\infty`;
        }
        if (this.isExact()) {
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
        else {
            return this.value.toFixed(3);
        }
    }
    get texWithSign() {
        return this.isPositive() ? `+${this.tex}` : this.tex;
    }
    get display() {
        if (this.isExact()) {
            if (this._denominator === 1) {
                return `${this._numerator}`;
            }
            else {
                return `${this._numerator}/${this._denominator}`;
            }
        }
        else {
            return this.value.toFixed(3);
        }
    }
    // Helper function to display fractions
    get frac() {
        return this.tex;
    }
    get dfrac() {
        return this.tex.replace('\\frac', '\\dfrac');
    }
    get tfrac() {
        return this.tex.replace('\\frac', '\\tfrac');
    }
}
exports.Fraction = Fraction;
Fraction.max = (...fractions) => {
    let M = new Fraction(fractions[0]);
    for (let m of fractions) {
        let compare = new Fraction(m);
        if (compare.greater(M)) {
            M = compare.clone();
        }
    }
    return M;
};
Fraction.min = (...fractions) => {
    let M = new Fraction(fractions[0]);
    for (let m of fractions) {
        let compare = new Fraction(m);
        if (compare.lesser(M)) {
            M = compare.clone();
        }
    }
    return M;
};
// ------------------------------------------
// Creation / parsing functions
Fraction.average = (...fractions) => {
    let M = new Fraction().zero();
    for (let f of fractions) {
        M.add(f);
    }
    M.divide(fractions.length);
    return M;
};
Fraction.unique = (fractions, sorted) => {
    // TODO: make sure it's wokring -> test !
    let unique = {}, distinct = [];
    fractions.forEach(x => {
        if (!unique[x.clone().reduce().tex]) {
            distinct.push(x.clone());
            unique[x.tex] = true;
        }
    });
    if (sorted) {
        return Fraction.sort(distinct);
    }
    else {
        return distinct;
    }
};
Fraction.sort = (fractions, reverse) => {
    // Todo make sure it's the correct order, not reverse -> make a test
    let sorted = fractions.sort((a, b) => a.value - b.value);
    if (reverse) {
        sorted.reverse();
    }
    return sorted;
};
//# sourceMappingURL=fraction.js.map