import { Numeric } from "../numeric";
export class Fraction {
    #denominator;
    #numerator;
    #approximative;
    constructor(value, denominatorOrPeriodic) {
        this.#numerator = 1;
        this.#denominator = 1;
        this.#approximative = false;
        if (value !== undefined) {
            this.parse(value, denominatorOrPeriodic);
        }
        return this;
    }
    parse = (value, denominatorOrPeriodic) => {
        let S;
        if (value === "") {
            this.#numerator = 0;
            this.#denominator = 1;
            return this;
        }
        switch (typeof value) {
            case "string":
                S = value.split('/');
                if (S.length > 2) {
                    throw new Error(`The given value is not a valid fraction (${value})`);
                }
                if (S.map(x => x === '' || isNaN(Number(x))).includes(true)) {
                    throw new Error(`The given value is not a valid fraction (${value})`);
                }
                if (S.length === 1) {
                    return this.parse(+S[0]);
                }
                else if (S.length === 2) {
                    if (S[1] === '0') {
                        this.#numerator = NaN;
                        this.#denominator = 1;
                    }
                    else {
                        this.#numerator = +S[0];
                        this.#denominator = +S[1];
                    }
                }
                else {
                    this.#numerator = NaN;
                    this.#denominator = 1;
                }
                break;
            case "number":
                if (Number.isSafeInteger(value)) {
                    this.#numerator = +value;
                    if (denominatorOrPeriodic === undefined || !Number.isSafeInteger(denominatorOrPeriodic)) {
                        this.#denominator = 1;
                    }
                    else {
                        this.#denominator = +denominatorOrPeriodic;
                    }
                }
                else {
                    const [, decimal] = (value.toString()).split('.');
                    const p = decimal ? decimal.length : 0;
                    if (denominatorOrPeriodic === undefined) {
                        this.#numerator = value * Math.pow(10, p);
                        this.#denominator = Math.pow(10, p);
                    }
                    else if (Number.isSafeInteger(denominatorOrPeriodic)) {
                        this.#numerator = value * Math.pow(10, p) - Math.floor(value * Math.pow(10, p - denominatorOrPeriodic));
                        this.denominator = Math.pow(10, p) - Math.pow(10, p - denominatorOrPeriodic);
                    }
                    this.reduce();
                }
                break;
            case "object":
                if (value instanceof Fraction) {
                    this.#numerator = +value.numerator;
                    this.#denominator = +value.denominator;
                }
                break;
        }
        return this;
    };
    clone = () => {
        const F = new Fraction();
        F.numerator = +this.#numerator;
        F.denominator = +this.#denominator;
        return F;
    };
    abs = () => {
        this.#numerator = Math.abs(this.#numerator);
        this.#denominator = Math.abs(this.#denominator);
        return this;
    };
    add = (F) => {
        if (F instanceof Fraction) {
            const N = this.#numerator, D = this.#denominator;
            this.#numerator = N * F.denominator + F.numerator * D;
            this.#denominator = D * F.denominator;
        }
        else {
            return this.add(new Fraction(F));
        }
        return this.reduce();
    };
    amplify = (k) => {
        if (Number.isSafeInteger(k)) {
            this.#numerator *= k;
            this.#denominator *= k;
        }
        return this;
    };
    areEquals = (...F) => {
        return F.every(f => f.isEqual(F[0]));
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
            case ">=":
            case "=>":
            case "geq":
                return this.value >= compareFraction.value;
            case "<":
                return this.value < compareFraction.value;
            case "<=":
            case "=<":
            case "leq":
                return this.value <= compareFraction.value;
            case "=":
                return this.value === compareFraction.value;
            case "<>":
                return this.value !== compareFraction.value;
            default:
                return false;
        }
    };
    divide = (F) => {
        const Q = new Fraction(F);
        if (Q.numerator === 0) {
            return new Fraction().infinite();
        }
        const N = +this.#numerator, D = +this.#denominator;
        this.#numerator = N * Q.denominator;
        this.#denominator = D * Q.numerator;
        return this.reduce();
    };
    infinite = () => {
        this.#numerator = Infinity;
        this.#denominator = 1;
        return this;
    };
    invalid = () => {
        this.#numerator = NaN;
        this.#denominator = 1;
        return this;
    };
    inverse = () => {
        const n = +this.#numerator, d = +this.#denominator;
        this.#numerator = d;
        this.#denominator = n;
        return this;
    };
    isApproximative = () => {
        return this.#approximative ||
            this.#numerator.toString().length >= 15 && this.#denominator.toString().length >= 15;
    };
    isEqual = (than) => {
        return this.compare(than, '=');
    };
    isEven = () => {
        return this.isRelative() && this.value % 2 === 0;
    };
    isExact = () => {
        return !this.isApproximative();
    };
    isFinite = () => {
        return !this.isInfinity() && !this.isNaN();
    };
    isGeq = (than) => {
        return this.compare(than, '>=');
    };
    isGreater = (than) => {
        return this.compare(than, '>');
    };
    isInfinity = () => {
        return Math.abs(this.#numerator) === Infinity;
    };
    isInverted = (p) => {
        return this.isEqual(new Fraction().one().divide(p.clone()));
    };
    isLeq = (than) => {
        return this.compare(than, '<=');
    };
    isLesser = (than) => {
        return this.compare(than, '<');
    };
    isNaN = () => {
        return isNaN(this.#numerator);
    };
    isNatural = () => {
        return this.isRelative() && this.isPositive();
    };
    isNegative = () => {
        return this.sign() === -1;
    };
    isNegativeOne = () => {
        return this.#numerator === -1 && this.#denominator === 1;
    };
    isNotEqual = (than) => {
        return this.compare(than, '<>');
    };
    isNotZero = () => {
        return this.#numerator !== 0;
    };
    isOdd = () => {
        return this.isRelative() && this.value % 2 === 1;
    };
    isOne = () => {
        return this.#numerator === 1 && this.#denominator === 1;
    };
    isOpposite = (p) => {
        return this.isEqual(p.clone().opposite());
    };
    isPositive = () => {
        return this.sign() === 1;
    };
    isRational = () => {
        return !this.isRelative();
    };
    isReduced = () => {
        return Math.abs(Numeric.gcd(this.#numerator, this.#denominator)) === 1;
    };
    isRelative = () => {
        return this.clone().reduce().denominator === 1;
    };
    isSquare = () => {
        return Math.sqrt(this.#numerator) % 1 === 0 && Math.sqrt(this.#denominator) % 1 === 0;
    };
    isStrictlyNegative = () => {
        return this.value < 0;
    };
    isStrictlyPositive = () => {
        return this.value > 0;
    };
    isZero = () => {
        return this.#numerator === 0;
    };
    multiply = (F) => {
        const Q = new Fraction(F);
        this.#numerator = this.#numerator * Q.numerator;
        this.#denominator = this.#denominator * Q.denominator;
        return this.reduce();
    };
    one = () => {
        this.#numerator = 1;
        this.#denominator = 1;
        return this;
    };
    opposite = () => {
        this.#numerator = -this.#numerator;
        return this;
    };
    pow = (p) => {
        if (p instanceof Fraction) {
            return this.pow(p.value);
        }
        this.reduce();
        if (p < 0) {
            this.inverse();
        }
        const controlNumerator = Math.floor(Math.pow(this.#numerator, Math.abs(p))), controlDenominator = Math.floor(Math.pow(this.#denominator, Math.abs(p)));
        if (controlNumerator ** Math.abs(p) === this.#numerator
            &&
                controlDenominator ** Math.abs(p) === this.#denominator) {
            this.#numerator = this.#numerator ** Math.abs(p);
            this.#denominator = this.#denominator ** Math.abs(p);
        }
        else {
            this.#numerator = this.#numerator ** Math.abs(p);
            this.#denominator = this.#denominator ** Math.abs(p);
        }
        return this;
    };
    reduce = () => {
        const g = Numeric.gcd(this.#numerator, this.#denominator);
        this.#numerator = this.#numerator / g;
        this.#denominator = this.#denominator / g;
        if (this.#denominator < 0) {
            this.#denominator = -this.#denominator;
            this.#numerator = -this.#numerator;
        }
        return this;
    };
    root = (p) => {
        if (p === 0) {
            return this;
        }
        if (p < 0) {
            this.inverse();
        }
        if (!Number.isSafeInteger(p)) {
            throw new Error("The root must be an integer.");
        }
        if (this.isNegative() && p % 2 === 0) {
            throw new Error("The root of a negative number must be odd.");
        }
        const sign = this.sign();
        this.abs();
        const controlNumerator = Math.floor(Math.pow(this.#numerator, Math.abs(1 / p))), controlDenominator = Math.floor(Math.pow(this.#denominator, Math.abs(1 / p)));
        this.#numerator = Math.pow(this.#numerator, Math.abs(1 / p));
        this.#denominator = Math.pow(this.#denominator, Math.abs(1 / p));
        if (controlNumerator ** p !== this.#numerator
            ||
                controlDenominator ** p !== this.#denominator) {
            this.#numerator = this.#numerator / this.#denominator;
            this.#denominator = 1;
        }
        this.multiply(sign);
        return this;
    };
    sign = () => {
        return (this.#numerator * this.#denominator >= 0) ? 1 : -1;
    };
    sqrt = () => {
        return this.root(2);
    };
    subtract = (F) => {
        if (F instanceof Fraction) {
            return this.add(F.clone().opposite());
        }
        else {
            return this.add(-F);
        }
    };
    zero = () => {
        this.#numerator = 0;
        this.#denominator = 1;
        return this;
    };
    static average = (...fractions) => {
        const M = new Fraction().zero();
        for (const f of fractions) {
            M.add(f);
        }
        M.divide(fractions.length);
        return M;
    };
    static max = (...fractions) => {
        let M = new Fraction(fractions[0]);
        for (const m of fractions) {
            const compare = new Fraction(m);
            if (compare.isGreater(M)) {
                M = compare.clone();
            }
        }
        return M;
    };
    static min = (...fractions) => {
        let M = new Fraction(fractions[0]);
        for (const m of fractions) {
            const compare = new Fraction(m);
            if (compare.isLesser(M)) {
                M = compare.clone();
            }
        }
        return M;
    };
    static sort = (fractions, reverse) => {
        const fractionsObject = fractions.map(f => f instanceof Fraction ? f : new Fraction(f));
        const sorted = fractionsObject.sort((a, b) => a.value - b.value);
        if (reverse) {
            sorted.reverse();
        }
        return sorted;
    };
    static unique = (fractions) => {
        const unique = {}, distinct = [];
        fractions.forEach(x => {
            if (!(x instanceof Fraction)) {
                x = new Fraction(x);
            }
            if (!unique[x.clone().reduce().tex]) {
                distinct.push(x.clone());
                unique[x.tex] = true;
            }
        });
        return distinct;
    };
    static xMultiply = (...values) => {
        const R = new Fraction();
        for (const value of values) {
            const F = new Fraction(value);
            R.numerator = R.numerator * F.numerator;
            R.denominator = R.denominator * F.denominator;
        }
        return R;
    };
    get denominator() {
        return this.#denominator;
    }
    set denominator(value) {
        this.#denominator = value;
    }
    get dfrac() {
        return this.tex.replace('\\frac', '\\dfrac');
    }
    get display() {
        if (this.isExact()) {
            if (this.#denominator === 1) {
                return `${this.#numerator}`;
            }
            else {
                return `${this.#numerator}/${this.#denominator}`;
            }
        }
        else {
            return this.value.toFixed(3);
        }
    }
    get frac() {
        return this.tex;
    }
    get numerator() {
        return this.#numerator;
    }
    set numerator(value) {
        this.#numerator = value;
    }
    get tex() {
        if (this.isInfinity()) {
            return `${this.sign() === 1 ? '+' : '-'}\\infty`;
        }
        if (this.isExact()) {
            if (this.#denominator === 1) {
                return `${this.#numerator}`;
            }
            else if (this.#numerator < 0) {
                return `-\\frac{ ${-this.#numerator} }{ ${this.#denominator} }`;
            }
            else {
                return `\\frac{ ${this.#numerator} }{ ${this.#denominator} }`;
            }
        }
        else {
            return this.value.toFixed(3);
        }
    }
    get texWithSign() {
        return this.isPositive() ? `+${this.tex}` : this.tex;
    }
    get tfrac() {
        return this.tex.replace('\\frac', '\\tfrac');
    }
    get value() {
        return this.#numerator / this.#denominator;
    }
}
//# sourceMappingURL=fraction.js.map