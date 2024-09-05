import type { compareSign, IExpression, InputValue, IPiMathObject } from "./../pimath.interface"
import { Numeric } from "../numeric"

// #region Type aliases (1)

export type FractionParsingType = number | string | Fraction

// #endregion Type aliases (1)

// #region Classes (1)

/**
 * The fraction class make possible to handle
 * \\(\frac{a}{b}\\) or \\[\frac{a}{b}\\]  values.
 */
export class Fraction implements IPiMathObject<Fraction>, IExpression<Fraction> {
    // #region Class fields (2)

    #denominator: number
    #numerator: number
    #approximative: boolean

    // #endregion Class fields (2)

    // #region Constructors (5)

    constructor()
    constructor(value: InputValue<Fraction>)
    constructor(numerator: number, denominator: number)
    constructor(decimal: number, periodLength: number)
    constructor(value?: InputValue<Fraction>, denominatorOrPeriodic?: number) {
        this.#numerator = 1
        this.#denominator = 1
        this.#approximative = false

        if (value !== undefined) {
            this.parse(value, denominatorOrPeriodic)
        }

        return this
    }

    // #endregion Constructors (5)

    // #region Properties and methods (55)

    // ------------------------------------------
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    public parse = (value: InputValue<Fraction>, denominatorOrPeriodic?: number): Fraction => {
        let S: string[]

        // A null value means a zero fraction.
        if (value === "") {
            this.#numerator = 0
            this.#denominator = 1
            return this
        }

        switch (typeof value) {
            case "string":
                // Split the string value in two parts: Numerator/Denominator
                S = value.split('/')

                // Security checks
                if (S.length > 2) { throw new Error(`The given value is not a valid fraction (${value})`) }
                if (S.map(x => x === '' || isNaN(Number(x))).includes(true)) { throw new Error(`The given value is not a valid fraction (${value})`) }

                if (S.length === 1) {
                    // No divide sign - it's a number
                    return this.parse(+S[0])
                } else if (S.length === 2) {
                    // One divide signe
                    // We check if the denominator is zero
                    if (S[1] === '0') {
                        this.#numerator = NaN
                        this.#denominator = 1
                    } else {
                        this.#numerator = +S[0]
                        this.#denominator = +S[1]
                    }
                } else {
                    // More than one divide sign ?
                    // This is impossible
                    this.#numerator = NaN
                    this.#denominator = 1
                }
                break
            case "number":
                if (Number.isSafeInteger(value)) {
                    // The given value is an integer
                    this.#numerator = +value

                    if (denominatorOrPeriodic === undefined || !Number.isSafeInteger(denominatorOrPeriodic)) {
                        this.#denominator = 1
                    } else {
                        this.#denominator = +denominatorOrPeriodic
                    }
                } else {
                    // The given value is a float number
                    // Get the number of decimals after the float sign
                    const [, decimal] = (value.toString()).split('.')
                    const p: number = decimal ? decimal.length : 0

                    // Detect if the decimal part is periodic or not...

                    // Transform the float number in two integer
                    if (denominatorOrPeriodic === undefined) {
                        this.#numerator = value * Math.pow(10, p)
                        this.#denominator = Math.pow(10, p)
                    } else if (Number.isSafeInteger(denominatorOrPeriodic)) {
                        this.#numerator = value * Math.pow(10, p) - Math.floor(value * Math.pow(10, p - denominatorOrPeriodic))
                        this.denominator = Math.pow(10, p) - Math.pow(10, p - denominatorOrPeriodic)
                    }

                    this.reduce()
                }
                break
            case "object":
                if (value instanceof Fraction) {
                    this.#numerator = +value.numerator
                    this.#denominator = +value.denominator
                }
                break
        }
        return this
    }

    public clone = (): Fraction => {
        const F = new Fraction()
        F.numerator = +this.#numerator
        F.denominator = +this.#denominator
        return F
    }

    public abs = (): this => {
        this.#numerator = Math.abs(this.#numerator)
        this.#denominator = Math.abs(this.#denominator)
        return this
    }

    public add = (F: InputValue<Fraction>): Fraction => {
        if (F instanceof Fraction) {
            const N: number = this.#numerator,
                D: number = this.#denominator

            this.#numerator = N * F.denominator + F.numerator * D
            this.#denominator = D * F.denominator
        } else {
            return this.add(new Fraction(F))
        }

        return this.reduce()
    }

    public amplify = (k: number): this => {
        if (Number.isSafeInteger(k)) {
            this.#numerator *= k
            this.#denominator *= k
        }
        return this
    }

    // TODO: The rest of the functions are not used or unnecessary ?
    /**
     * Simple function to determine if it's a fraction
     */
    public areEquals = (...F: Fraction[]): boolean => {
        return F.every(f => f.isEqual(F[0]))
    }

    // ------------------------------------------
    // Compare functions

    // ------------------------------------------
    /**
     * Compare the current coefficient with another coefficient
     * @param F (Coefficient) The coefficient to _compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    public compare = (F: InputValue<Fraction>, sign?: compareSign): boolean => {
        if (sign === undefined) {
            sign = '='
        }

        let compareFraction: Fraction
        if (F instanceof Fraction) {
            compareFraction = F.clone()
        } else {
            compareFraction = new Fraction(F)
        }

        switch (sign) {
            case '>':
                return this.value > compareFraction.value
            case ">=":
            case "=>":
            case "geq":
                return this.value >= compareFraction.value
            case "<":
                return this.value < compareFraction.value
            case "<=":
            case "=<":
            case "leq":
                return this.value <= compareFraction.value
            case "=":
                // let F2: Fraction = compareFraction.clone().reduce(),
                //     F1: Fraction = this.clone().reduce();
                // return (F1.numerator === F2.numerator && F1.denominator === F2.denominator);
                return this.value === compareFraction.value
            case "<>":
                return this.value !== compareFraction.value
            default:
                return false
        }
    }

    public divide = (F: Fraction | number): Fraction => {
        const Q = new Fraction(F)

        if (Q.numerator === 0) {
            return new Fraction().infinite()
        }

        const N: number = +this.#numerator,
            D: number = +this.#denominator

        this.#numerator = N * Q.denominator
        this.#denominator = D * Q.numerator
        return this.reduce()
    }

    public infinite = (): this => {
        this.#numerator = Infinity
        this.#denominator = 1
        return this
    }

    public invalid = (): this => {
        this.#numerator = NaN
        this.#denominator = 1
        return this
    }

    public inverse = (): this => {
        const n = +this.#numerator, d = +this.#denominator
        this.#numerator = d
        this.#denominator = n

        return this
    }

    public isApproximative = (): boolean => {
        return this.#approximative ||
            this.#numerator.toString().length >= 15 && this.#denominator.toString().length >= 15
    }

    public isEqual = (than: Fraction | number): boolean => {
        return this.compare(than, '=')
    }

    public isEven = (): boolean => {
        return this.isRelative() && this.value % 2 === 0
    }

    public isExact = (): boolean => {
        return !this.isApproximative()
    }

    public isFinite = (): boolean => {
        return !this.isInfinity() && !this.isNaN()
    }

    public isGeq = (than: Fraction | number): boolean => {
        return this.compare(than, '>=')
    }

    public isGreater = (than: Fraction | number): boolean => {
        return this.compare(than, '>')
    }

    public isInfinity = (): boolean => {
        return Math.abs(this.#numerator) === Infinity
    }

    public isInverted = (p: Fraction): boolean => {
        return this.isEqual(new Fraction().one().divide(p.clone()))
    }

    public isLeq = (than: Fraction | number): boolean => {
        return this.compare(than, '<=')
    }

    /* Compare shortcuts */
    public isLesser = (than: Fraction | number): boolean => {
        return this.compare(than, '<')
    }

    public isNaN = (): boolean => {
        return isNaN(this.#numerator)
    }

    public isNatural = (): boolean => {
        return this.isRelative() && this.isPositive()
    }

    public isNegative = (): boolean => {
        return this.sign() === -1
    }

    public isNegativeOne = (): boolean => {
        return this.#numerator === -1 && this.#denominator === 1
    }

    public isNotEqual = (than: Fraction | number): boolean => {
        return this.compare(than, '<>')
    }

    public isNotZero = (): boolean => {
        return this.#numerator !== 0
    }

    public isOdd = (): boolean => {
        return this.isRelative() && this.value % 2 === 1
    }

    public isOne = (): boolean => {
        return this.#numerator === 1 && this.#denominator === 1
    }

    public isOpposite = (p: Fraction): boolean => {
        return this.isEqual(p.clone().opposite())
    }

    public isPositive = (): boolean => {
        return this.sign() === 1
    }

    public isRational = (): boolean => {
        return !this.isRelative()
    }

    public isReduced = (): boolean => {
        return Math.abs(Numeric.gcd(this.#numerator, this.#denominator)) === 1
    }

    public isRelative = (): boolean => {
        return this.clone().reduce().denominator === 1
    }

    public isSquare = (): boolean => {
        return Math.sqrt(this.#numerator) % 1 === 0 && Math.sqrt(this.#denominator) % 1 === 0
    }

    public isStrictlyNegative = (): boolean => {
        return this.value < 0
    }

    public isStrictlyPositive = (): boolean => {
        return this.value > 0
    }

    // ------------------------------------------
    // Mathematical operations specific to fractions
    public isZero = (): boolean => {
        return this.#numerator === 0
    }

    public multiply = (F: Fraction | number): this => {
        // Parse the value.
        // If it's a fraction, return a clone of it
        // If it's an integer, return the fraction F/1
        const Q = new Fraction(F)

        this.#numerator = this.#numerator * Q.numerator
        this.#denominator = this.#denominator * Q.denominator

        return this.reduce()
    }

    public one = (): this => {
        this.#numerator = 1
        this.#denominator = 1
        return this
    }

    public opposite = (): this => {
        this.#numerator = -this.#numerator
        return this
    }

    public pow = (p: number | Fraction): Fraction => {
        // TODO: Fraction.pow with a value different than a safe integer !
        if (p instanceof Fraction) {
            return this.pow(p.value)
        }

        this.reduce()
        if (p < 0) {
            this.inverse()
        }

        // Check if numerator and denominator are roots of...
        // otherwise, convert to numeric.
        const controlNumerator = Math.floor(Math.pow(this.#numerator, Math.abs(p))),
            controlDenominator = Math.floor(Math.pow(this.#denominator, Math.abs(p)))

        if (controlNumerator ** Math.abs(p) === this.#numerator
            &&
            controlDenominator ** Math.abs(p) === this.#denominator) {
            this.#numerator = this.#numerator ** Math.abs(p)
            this.#denominator = this.#denominator ** Math.abs(p)
        } else {
            this.#numerator = this.#numerator ** Math.abs(p)
            this.#denominator = this.#denominator ** Math.abs(p)
        }

        return this
    }

    // ------------------------------------------
    public reduce = (): this => {
        const g = Numeric.gcd(this.#numerator, this.#denominator)
        this.#numerator = this.#numerator / g
        this.#denominator = this.#denominator / g

        if (this.#denominator < 0) {
            this.#denominator = -this.#denominator
            this.#numerator = -this.#numerator
        }
        return this
    }

    public root = (p: number): this => {
        // TODO: nth - root of a fraction => this will return another type of coefficient.

        // Check if they are perfect roots..
        if (p === 0) { return this }

        // If negative, inverse the fraction
        if (p < 0) { this.inverse() }

        // if p is not a safe integer, throw error
        if (!Number.isSafeInteger(p)) { throw new Error("The root must be an integer.") }

        // if the fraction is negative and the root is even, throw error
        if (this.isNegative() && p % 2 === 0) { throw new Error("The root of a negative number must be odd.") }

        // get the sign of the fraction and make it positive
        const sign = this.sign()
        this.abs()

        // Reduce the fraction
        this.reduce()

        // Check if numerator and denominator are roots of...
        // otherwise, convert to numeric.
        const controlNumerator = Math.floor(Math.pow(this.#numerator, Math.abs(1 / p))),
            controlDenominator = Math.floor(Math.pow(this.#denominator, Math.abs(1 / p)))

        this.#numerator = Math.pow(this.#numerator, Math.abs(1 / p))
        this.#denominator = Math.pow(this.#denominator, Math.abs(1 / p))

        if (controlNumerator !== this.#numerator
            ||
            controlDenominator !== this.#denominator) {
            // The fraction is not a perfect root - make it approximative
            this.#numerator = this.#numerator / this.#denominator
            this.#denominator = 1
            this.#approximative = true
        }

        // Restore the sign
        this.multiply(sign)

        return this
    }

    public sign = (): number => {
        return (this.#numerator * this.#denominator >= 0) ? 1 : -1
    }

    public sqrt = (): this => {
        return this.root(2)
    }

    public subtract = (F: Fraction | number): Fraction => {
        if (F instanceof Fraction) {
            return this.add(F.clone().opposite())
        } else {
            return this.add(-F)
        }
    }

    public zero = (): this => {
        this.#numerator = 0
        this.#denominator = 1
        return this
    }

    public static average = (...fractions: (InputValue<Fraction>)[]): Fraction => {
        const M = new Fraction().zero()

        for (const f of fractions) {
            M.add(f)
        }

        M.divide(fractions.length)

        return M
    }

    public static max = (...fractions: InputValue<Fraction>[]): Fraction => {
        let M = new Fraction(fractions[0])

        for (const m of fractions) {
            const compare = new Fraction(m)
            if (compare.isGreater(M)) {
                M = compare.clone()
            }
        }

        return M
    }

    public static min = (...fractions: (InputValue<Fraction>)[]): Fraction => {
        let M = new Fraction(fractions[0])

        for (const m of fractions) {
            const compare = new Fraction(m)
            if (compare.isLesser(M)) {
                M = compare.clone()
            }
        }

        return M
    }

    public static sort = (fractions: (InputValue<Fraction>)[], reverse?: boolean): Fraction[] => {
        const fractionsObject: Fraction[] = fractions.map(f => f instanceof Fraction ? f : new Fraction(f))

        const sorted = fractionsObject.sort((a, b) => a.value - b.value)

        if (reverse) { sorted.reverse() }

        return sorted
    }

    public static unique = (fractions: (InputValue<Fraction>)[]): Fraction[] => {
        const unique: Record<string, boolean> = {},
            distinct: Fraction[] = []

        fractions.forEach(x => {
            if (!(x instanceof Fraction)) { x = new Fraction(x) }

            if (!unique[x.clone().reduce().tex]) {
                distinct.push(x.clone())
                unique[x.tex] = true
            }
        })

        return distinct
    }

    public static xMultiply = (...values: (InputValue<Fraction>)[]): Fraction => {
        const R = new Fraction()
        // Parse the value.
        // If it's a fraction, return a clone of it
        // If it's an integer, return the fraction F/1
        for (const value of values) {

            const F = new Fraction(value)
            R.numerator = R.numerator * F.numerator
            R.denominator = R.denominator * F.denominator
        }

        return R
    }

    // #endregion Properties and methods (55)

    // #region Getters And Setters (11)

    public get denominator(): number {
        return this.#denominator
    }

    public set denominator(value: number) {
        this.#denominator = value
    }

    // ------------------------------------------
    // Creation / parsing functions
    public get dfrac(): string {
        return this.tex.replace('\\frac', '\\dfrac')
    }

    public get display(): string {
        if (this.isExact()) {
            if (this.#denominator === 1) {
                return `${this.#numerator}`
            } else {
                return `${this.#numerator}/${this.#denominator}`
            }
        } else {
            return this.value.toFixed(3)
        }
    }

    // Helper function to display fractions
    public get frac(): string {
        return this.tex
    }

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    public get numerator(): number {
        return this.#numerator
    }

    public set numerator(value: number) {
        this.#numerator = value
    }

    // Display getter
    public get tex(): string {
        if (this.isInfinity()) {
            return `${this.sign() === 1 ? '+' : '-'}\\infty`
        }

        if (this.isExact()) {
            if (this.#denominator === 1) {
                return `${this.#numerator}`
            } else if (this.#numerator < 0) {
                return `-\\frac{ ${-this.#numerator} }{ ${this.#denominator} }`
            } else {
                return `\\frac{ ${this.#numerator} }{ ${this.#denominator} }`
            }
        } else {
            return this.value.toFixed(3)
        }
    }

    public get texWithSign(): string {
        return this.isPositive() ? `+${this.tex}` : this.tex
    }

    public get tfrac(): string {
        return this.tex.replace('\\frac', '\\tfrac')
    }

    public get value(): number {
        return this.#numerator / this.#denominator
    }

    // #endregion Getters And Setters (11)
}

// #endregion Classes (1)
