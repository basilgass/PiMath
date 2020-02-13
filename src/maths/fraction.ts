import {Numeric} from "./numeric";

export class Fraction {
    private _numerator: number;
    private _denominator: number;

    constructor() {
        this._numerator = 1;
        this._denominator = 1;
        return this;
    }

    /**
     * Simple function to determine if it's a fraction
     */
    isFraction() {
        return true;
    }

    /**
     * Set the fraction to zero
     */
    zero = (): Fraction => {
        this._numerator = 0;
        this._denominator = 1;
        return this;
    };

    /**
     * Make a clone of the current fraction
     */
    clone = (): Fraction => {
        let F = new Fraction();
        F.numerator = +this._numerator;
        F.denominator = +this._denominator;
        return F;
    };

    /**
     * Parse the value to get the numerator and denominator
     * @param value : number to parse to get the fraction
     * @param periodic (optional|number) : length of the periodic part: 2.333333 => 1
     */
    parse = (value: any, periodic?: number): Fraction => {
        let S: string[];

        switch (typeof value) {
            case "string":
                // Split the sting value in two parts: Numerator/Denomniator
                S = value.split('/');

                if (S.length === 1) {
                    // No divide sign
                    return this.parse(+S[0]);
                } else if (S.length === 2) {
                    // One divide signe
                    // We check if the denominator is zero
                    if (S[1] === '0') {
                        this._numerator = NaN;
                        this._denominator = 1;
                    } else {
                        this._numerator = +S[0];
                        this._denominator = +S[1];
                    }
                } else {
                    // More than one divide sign ?
                    this._numerator = NaN;
                    this._denominator = 1;
                }
                break;
            case "number":
                if (Number.isSafeInteger(value)) {
                    // The given value is an integer
                    this._numerator = value;
                    this._denominator = 1;
                } else {
                    // The given value is a float number

                    // Get the number of decimals after the float sign
                    let p: number = (value.toString()).split('.')[1].length;

                    // Transform the float number in two integer
                    if (periodic === undefined) {
                        this._numerator = value * Math.pow(10, p);
                        this._denominator = Math.pow(10, p);
                    } else if (Number.isSafeInteger(periodic)) {
                        this._numerator = value * Math.pow(10, p) - Math.floor(value * Math.pow(10, p - periodic));
                        this.denominator = Math.pow(10, p) - Math.pow(10, p - periodic)
                    }
                }
        }
        return this;
    };

    parseByInteger = (num: number, den?: number): Fraction => {
        if (Number.isSafeInteger(num)) {
            this._numerator = num;
        }
        if (den !== undefined && Number.isSafeInteger(den)) {
            this._denominator = den;
        } else {
            this._denominator = 1;
        }
        return this;
    };

    /**
     * Reduce the fraction and make the denominator positve
     */
    reduce = (): Fraction => {
        let g = Numeric.gcd(this._numerator, this._denominator);
        this._numerator = this._numerator / g;
        this._denominator = this._denominator / g;

        if (this._denominator < 0) {
            this._denominator = -this._denominator;
            this._numerator = -this._numerator;
        }
        return this;
    };

    // Helper function
    invalid = (): Fraction => {
        let F = new Fraction();
        F._numerator = NaN;
        F._denominator = 1;
        return F;
    };

    infinite = (): Fraction => {
        let F = new Fraction();
        F._numerator = Infinity;
        F._denominator = 1;
        return F;
    };

    // Mathematical operations on fraction.
    opposed = (): Fraction => {
        this._numerator = -this._numerator;
        return this;
    };

    multiply = (F: Fraction): Fraction => {
        this._numerator = this._numerator * F.numerator;
        this._denominator = this._denominator * F.denominator;

        return this.reduce();
    };

    amplify = (k: number): Fraction => {
        if (Number.isSafeInteger(k)) {
            this._numerator *= k;
            this._denominator *= k;
        }
        return this;
    };

    divide = (F: Fraction): Fraction => {
        if (F.numerator === 0) {
            return new Fraction().infinite();
        }

        let N: number = +this._numerator,
            D: number = +this._denominator;

        this._numerator = N * F.denominator;
        this._denominator = D * F.numerator;
        return this.reduce();
    };

    add = (F: Fraction): Fraction => {
        let N: number = this._numerator,
            D: number = this._denominator;

        this._numerator = N * F.denominator + F.numerator * D;
        this._denominator = D * F.denominator;

        return this.reduce();
    };

    substract = (F: Fraction): Fraction => {
        return this.add(F.clone().opposed());
    };

    /**
     * Get the power of a fraction.
     * @param p (integer) The integer power value (positive or negative)
     */
    pow = (p: number): Fraction => {
        if (!Number.isSafeInteger(p)) {
            return this.invalid();
        }
        this.reduce();

        if (p > 0) {
            this._numerator = this._numerator ** p;
            this._denominator = this._denominator ** p;
        } else {
            this._numerator = this._denominator ** p;
            this._denominator = this._numerator ** p;
        }
        return this;
    };

    /**
     * Returns the exact square root fraction as numerator \sqrt{s} / denominator
     */
    sqrt = (): Fraction => {
        return this;
    };
    // TODO: Fraction nthroot

    /**
     * Returns the absolute value of the fraction
     */
    abs = (): Fraction => {
        this._numerator = Math.abs(this._numerator);
        this._denominator = Math.abs(this._denominator);
        return this;
    };

    /**
     * Get the sign of the fraction: 1 if positive, -1 if negative
     */
    sign = (): number => {
        return (this._numerator * this._denominator > 0) ? 1 : -1;
    };

    /**
     * Determine if two fractions are equals
     * @param F
     */
    isEqual = (F: Fraction): boolean => {
        let F2: Fraction = F.clone().reduce(),
            F1: Fraction = this.clone().reduce();

        return (F1.numerator === F2.numerator && F1.denominator === F2.denominator);
    };
    /**
     * Determine if the fractions are equals.
     * @param F
     */
    areEquals = (...F: Fraction[]): boolean => {
        for (let i = 0; i < F.length; i++) {
            if (!this.isEqual(F[i])) {
                return false;
            }
        }
        return true;
    };

    /**
     * Compare the current fraction with another fraction
     * @param F (Fraction) The fraction to compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    compare = (F: Fraction, sign?: string) => {
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
                return this.isEqual(F);
            case "<>":
                return !this.isEqual(F);
            default:
                return false;
        }
    };
    // Compare shortcuts
    lesser = (than: Fraction): Boolean => {
        return this.compare(than, '<');
    };
    leq = (than: Fraction): Boolean => {
        return this.compare(than, '<=');
    };
    greater = (than: Fraction): Boolean => {
        return this.compare(than, '>');
    };
    geq = (than: Fraction): Boolean => {
        return this.compare(than, '>=');
    };

    isInfinity = () => {
        return this._numerator === Infinity;
    };
    isFinite = () => {
        return !this.isInfinity();
    };

    // Setter
    set numerator(value: number) {
        this._numerator = value;
    }

    set denominator(value: number) {
        this._denominator = value;
    }

    // Getter
    get numerator(): number {
        return this._numerator;
    }

    get denominator(): number {
        return this._denominator;
    }

    get value(): number {
        return this._numerator / this._denominator;
    }

    // Display getter
    get display(): string {
        if (this._denominator === 1) {
            return `${this._numerator}`;
        } else {
            return `${this._numerator}/${this._denominator}`;
        }
    }

    get frac(): string {
        if (this._denominator === 1) {
            return `${this._numerator}`;
        } else {
            return `\\frac{ ${this._numerator} }{ ${this._denominator} }`;
        }
    }

    get dfrac(): string {
        if (this._denominator === 1) {
            return `${this._numerator}`;
        } else if (this._numerator > 0) {
            return `\\dfrac{ ${this._numerator} }{ ${this._denominator} }`;
        } else {
            return `-\\dfrac{ ${Math.abs(this._numerator)} }{ ${this._denominator} }`;
        }
    }
}