import {CoefficientCore, FRACTION_FRAC} from "./coefficientCore";

/**
 * The fraction class
 */

export class Fraction extends CoefficientCore<Fraction> {
    constructor(value?: number | string | Fraction, denominator?: number | string) {
        super()
        // Default values.
        this.numerator = 1;
        this.denominator = 1;

        this.fracType = FRACTION_FRAC.frac

        if (value !== undefined) {
            if (value instanceof Fraction) return this.parse(value)
            return this.parse(value, denominator)
        }

        return this;
    }

    get tex(): string {
        const frac = this.fracTeX
        // restore the frac type to default
        this.fracType = FRACTION_FRAC.frac

        if (this.isInfinity()) {
            return `${this.signTeX}\\infty`
        }

        if (this.isExact()) {
            if (this.denominator === 1) {
                return `${this.numerator}`;
            } else if (this.numerator < 0) {
                return `-${frac}{ ${-this.numerator} }{ ${this.denominator} }`;
            } else {
                return `${frac}{ ${this.numerator} }{ ${this.denominator} }`;
            }
        } else {
            return this.value.toFixed(3)
        }
    }

    get display(): string {
        if (this.isInfinity()) {
            return `${this.signTeX}\\infty`
        }

        if (this.isExact()) {
            if (this.denominator === 1) {
                return `${this.numerator}`;
            } else if (this.numerator < 0) {
                return `-${-this.numerator}/${this.denominator}`;
            } else {
                return `${this.numerator}/${this.denominator}`;
            }
        } else {
            return this.value.toFixed(3)
        }
    }

    createInstance(value?: string | number | Fraction): Fraction {
        return new Fraction(value)
    }

    clone = (): Fraction => {
        return new Fraction(this.numerator, this.denominator)
    };

    reduce = (): Fraction => {
        const {N, D} = this.getReducedCoefficient()
        this.numerator = N
        this.denominator = D
        return this;
    };

    add = (...values: (Fraction | number | string)[]): Fraction => {
        for (let F of values) {
            if (!(F instanceof Fraction)) F = new Fraction(F)

            let N: number = this.numerator,
                D: number = this.denominator;

            this.numerator = N * F.denominator + F.numerator * D;
            this.denominator = D * F.denominator;
        }

        return this.reduce();
    };

    multiply = (...values: (Fraction | number)[]): Fraction => {
        // Parse the value.
        // If it's a fraction, return a clone of it
        // If it's an integer, return the fraction F/1
        for (let F of values) {
            if (!(F instanceof Fraction)) {
                F = new Fraction(F)
            }

            this.numerator = this.numerator * F.numerator;
            this.denominator = this.denominator * F.denominator;
        }

        return this
    };

    invert = (): Fraction => {
        let n = +this.numerator, d = +this.denominator;
        this.numerator = d;
        this.denominator = n;

        return this;
    }

    root = (p: number): Fraction => {
        // TODO: index - root of a fraction => this will return another type of coefficient.

        // Check if they are perfect roots..
        if (p === 0) {
            return this;
        }

        // If negative, invert the fraction
        if (p < 0) {
            this.invert()
        }

        let n = Math.pow(this.numerator, Math.abs(1 / p)),
            d = Math.pow(this.denominator, Math.abs(1 / p));

        this.numerator = Math.pow(this.numerator, Math.abs(1 / p));
        this.denominator = Math.pow(this.denominator, Math.abs(1 / p));
        return this;
    }

    static decimalToFraction = (value: string | number | Fraction): [number, number] => {
        // Return the neutral element
        if (value === undefined) return [1, 1]

        // Return the numerator and denominator if it's already a fraction
        if (value instanceof Fraction) return [value.numerator, value.denominator]

        // Split the value into unit and decimal part
        let [unit, decimal] = (+value).toString().split('.')

        // Return the unit if there is no decimal part
        if (decimal === undefined) return [+unit, 1]

        let decimalLength = decimal.length

        return [+(unit + decimal), 10 ** decimalLength]
    }

    static average = (...fractions: (Fraction | number)[]): Fraction => {
        let M = new Fraction().zero()

        for (let f of fractions) {
            M.add(f)
        }

        M.divide(fractions.length)

        return M
    }

    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    parse(value: Fraction): Fraction

    parse(value: string | number): Fraction


    // pow = (p: number | Fraction): Fraction => {
    //     // TODO: Fraction.pow with a value different than a safe integer !
    //     if (p instanceof Fraction) {
    //         return this.pow(p.value)
    //     }
    //
    //     this.reduce();
    //     if (p < 0) {
    //         this.invert()
    //     }
    //
    //     // Check if numerator and denominator are roots of...
    //     // othervise, convert to numeric.
    //     let controlNumerator = Math.floor(Math.pow(this.numerator, Math.abs(p))),
    //         controlDenominator = Math.floor(Math.pow(this.denominator, Math.abs(p)))
    //
    //     if (controlNumerator ** Math.abs(p) === this.numerator
    //         &&
    //         controlDenominator ** Math.abs(p) === this.denominator) {
    //
    //         this.numerator = this.numerator ** Math.abs(p);
    //         this.denominator = this.denominator ** Math.abs(p);
    //     } else {
    //         this.numerator = this.numerator ** Math.abs(p);
    //         this.denominator = this.denominator ** Math.abs(p);
    //     }
    //
    //     return this;
    // };

    parse(value: string | number, denominator: string | number): Fraction

    parse(value: string | number | Fraction, denominator ?: string | number): Fraction {
        // Default values
        this.numerator = 0;
        this.denominator = 1;

        // A null value means a zero fraction.
        if (value === null || value === "") return this;

        // No denominator given
        if (denominator === undefined) {
            if (value instanceof Fraction) return value.clone()

            if (typeof value === "number") {
                return new Fraction(value, 1)
            }

            // a value of type string can be:
            // - an integer number  4
            // - a decimal number   4.12
            // - a fraction         4/5
            // - a decimal fraction 4.12/5.12
            if (typeof value === "string") {
                const [N, D] = value.split('/')
                return new Fraction(N, D === undefined ? 1 : D)
            }
        }

        // Denominator given
        if (+denominator === 0) {
            this.numerator = Infinity
            return this
        }

        const [N1, D1] = Fraction.decimalToFraction(value)
        const [N2, D2] = Fraction.decimalToFraction(denominator)

        this.numerator = N1 * D2
        this.denominator = D1 * N2

        if (D1 > 1 || D2 > 1) this.reduce()
        return this
    }

    amplify = (k: number): Fraction => {
        if (Number.isSafeInteger(k)) {
            this.numerator *= k;
            this.denominator *= k;
        }
        return this;
    };

}