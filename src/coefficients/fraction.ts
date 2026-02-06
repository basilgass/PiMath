import type {compareSign, IExpression, InputValue, IPiMathObject} from "../pimath.interface"
import {Numeric} from "../numeric"

export enum FRAC_TYPE {
    frac = 'frac',
    dfrac = 'dfrac',
    tfrac = 'tfrac'
}

/**
 * The fraction class make possible to handle
 * \\(\frac{a}{b}\\) or \\[\frac{a}{b}\\]  values.
 */

export class Fraction implements IPiMathObject<Fraction>, IExpression<Fraction> {
    #denominator = 1
    #digits = 3
    #exact = true
    #numerator = 1
    #type: FRAC_TYPE = FRAC_TYPE.frac
    #withSign = false

    constructor()
    constructor(value: InputValue<Fraction>)
    constructor(numerator: number, denominator: number)
    constructor(value?: InputValue<Fraction>, denominator?: number) {

        if (value !== undefined) {
            this.parse(value, denominator)
        }

        return this
    }

    // ------------------------------------------
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     */
    public parse = (value: InputValue<Fraction>, denominator?: number): this => {

        // A null value means a zero fraction.
        if (value === "") {
            this.#numerator = 0
            this.#denominator = 1
            return this
        }

        if (typeof value === "string") {
            return this.fromString(value)
        }

        if (typeof value === "number" && denominator===undefined) {
            return this.fromNumber(value)
        }

        if (typeof value === "number" && typeof denominator==="number") {
            return this.fromNumbers(value, denominator)
        }

        if (value instanceof Fraction) {
            return this.copy(value)
        }

        return this
    }

    public clone = (): Fraction => {
        const F = new Fraction()
        F.numerator = this.#numerator
        F.denominator = this.#denominator
        F.exact = this.exact
        return F
    }

    public copy(value: Fraction): this {
        this.#numerator = value.numerator
        this.#denominator = value.denominator
        this.#exact = value.exact

        return this
    }

    public get tex(): string {
        if (this.isInfinity()) {
            return `${this.sign() === 1 ? '+' : '-'}\\infty`
        }

        const plus = this.#withSign && this.isPositive() ? '+' : ''

        if (this.exact) {
            if (this.#denominator === 1) {
                return `${plus}${this.#numerator}`
            } else if (this.#numerator < 0) {
                return `-\\${this.#type}{ ${-this.#numerator} }{ ${this.#denominator} }`
            } else {
                return `${plus}\\${this.#type}{ ${this.#numerator} }{ ${this.#denominator} }`
            }
        } else {
            return plus + this.value.toFixed(this.#digits)
        }
    }

    public get display(): string {
        if (this.isInfinity()) {
            return `${this.sign() === 1 ? '+' : '-'}oo`
        }

        const plus = this.#withSign && this.isPositive() ? '+' : ''

        if (this.exact) {
            if (this.#denominator === 1) {
                return `${plus}${this.#numerator}`
            } else {
                return `${plus}${this.#numerator}/${this.#denominator}`
            }
        } else {
            return plus + this.value.toFixed(this.#digits)
        }
    }

    public static average = (...fractions: (InputValue<Fraction>)[]): Fraction => {
        const M = new Fraction().zero()

        for (const f of fractions) {
            M.add(f)
        }

        M.divide(fractions.length)

        return M
    }

    public static isFraction(value: InputValue<Fraction>) {
        if (value instanceof Fraction ||
            (typeof value === "number" && !isNaN(value))
        ) {
            return true
        }

        if (typeof value === "string") {
            const [num, den] = value.split('/')

            return !isNaN(+num) && !isNaN(+den)
        }

        return false

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

        if (reverse) {
            sorted.reverse()
        }

        return sorted
    }

    public static toSameDenominateur(...fractions: InputValue<Fraction>[]): Fraction[] {
        const F = fractions.map(x => new Fraction(x))
        const lcm = Numeric.lcm(...F.map(x => x.denominator))

        F.forEach(x => x.amplify(lcm / x.denominator))

        return F
    }

    public static unique = (fractions: (InputValue<Fraction>)[]): Fraction[] => {
        const unique: Record<string, boolean> = {},
            distinct: Fraction[] = []

        fractions.forEach(x => {
            if (!(x instanceof Fraction)) {
                x = new Fraction(x)
            }

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
            this.exact = this.exact && F.exact
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

    public areEquals = (...F: Fraction[]): boolean => {
        return F.every(f => f.isEqual(F[0]))
    }

    /**
     * Compare the current coefficient with another coefficient
     * @param F (Coefficient) The coefficient to _compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    public compare = (F: InputValue<Fraction>, sign?: compareSign): boolean => {
        sign ??= '='

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
                return this.value === compareFraction.value
            case "<>":
                return this.value !== compareFraction.value
            default:
                return false
        }
    }

    public get denominator(): number {
        return this.#denominator
    }

    public set denominator(value: number) {
        this.#denominator = value
    }

    public get dfrac(): this {
        this.#type = FRAC_TYPE.dfrac
        return this
    }

    digits(value: number): this {
        this.#digits = value
        return this
    }

    public divide = (F: Fraction | number): Fraction => {
        const Q = new Fraction(F)

        if (Q.numerator === 0) {
            return new Fraction().infinite()
        }

        const N: number = this.#numerator,
            D: number = this.#denominator

        this.#numerator = N * Q.denominator
        this.#denominator = D * Q.numerator

        this.exact = this.exact && Q.exact
        return this.reduce()
    }

    get exact(): boolean {
        return this.#exact
    }

    set exact(value: boolean) {
        this.#exact = value
    }

    public get frac(): this {
        this.#type = FRAC_TYPE.frac
        return this
    }

    public fromNumber(value: number): this {
        if (Number.isSafeInteger(value)) {
            // The given value is an integer
            this.#numerator = value
            this.#denominator = 1
            this.#exact = true
            return this
        }

        // The given value is a float number
        // Get the number of decimals after the float sign
        const [, decimal] = (value.toString()).split('.')
        const p: number = decimal ? decimal.length : 0
        const power = Math.pow(10, p)

        this.#numerator = value * power
        this.#denominator = power

        this.#numerator = Numeric.numberCorrection(this.#numerator)
        this.#denominator = Numeric.numberCorrection(this.#denominator)

        this.reduce()

        // assume it's not exact if the decimal part is more than 10 decimals
        this.#exact = p < 10

        return this
    }

    public fromNumbers(numerator: number, denominator: number): this {
        if (Number.isSafeInteger(numerator) && Number.isSafeInteger(denominator)) {
            // The given value is an integer
            this.#numerator = numerator
            this.#denominator = denominator
            this.#exact = true
            return this
        }

        return this.fromNumber(numerator / denominator)
    }
    public fromPeriodic(value: string | number, length?: number): this {
        if (length === undefined) {
            // TODO: get the length automatically, finding the repeating length...}
            return this.fromPeriodic(value, 2)
        }

        const [, decimal] = (value.toString()).split(/[.,]/)
        const p: number = decimal ? decimal.length : 0
        const power = Math.pow(10, p)

        this.#numerator = (+value) * power - Math.floor((+value) * Math.pow(10, p - length))
        this.#denominator = power - Math.pow(10, p - length)
        this.#exact = true

        return this
    }

    public fromString(value: string): this {
        // Split the string value in two parts: Numerator/Denominator
        const S = value.split('/').map(Number)

        this.#exact = true

        // Only one divide sign allowed
        if (S.length > 2) {
            this.#numerator = NaN
            return this
        }

        // Each parts must be a number
        if (S.some(x => isNaN(x))) {
            this.#numerator = NaN
            return this
        }

        if (S.length === 1) {
            // No divide sign - it's a number
            return this.fromNumber(+value)
        }

        // One divide signe
        // We check if the denominator is zero
        if (S[1] === 0) {
            this.#numerator = NaN
            this.#denominator = 1
            return this
        }

        this.#numerator = S[0]
        this.#denominator = S[1]

        return this
    }

    public infinite = (): this => {
        this.#numerator = Infinity
        this.#denominator = 1
        this.exact = true
        return this
    }

    public invalid = (): this => {
        this.#numerator = NaN
        this.#denominator = 1
        this.exact = true
        return this
    }

    public inverse = (): this => {
        const sign = this.sign()
        const n = Math.abs(this.#numerator)
        this.#numerator = Math.abs(this.#denominator) * sign
        this.#denominator = n

        return this
    }

    public isEqual = (than: Fraction | number): boolean => {
        return this.compare(than, '=')
    }

    public isEven = (): boolean => {
        return this.isRelative() && this.value % 2 === 0
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

    public isLeq = (than: Fraction | number): boolean => {
        return this.compare(than, '<=')
    }

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

    public isPositive = (): boolean => {
        return this.sign() === 1
    }

    public isRational = (): boolean => {
        return this.exact && !this.isRelative()
    }

    public isReduced = (): boolean => {
        return Math.abs(Numeric.gcd(this.#numerator, this.#denominator)) === 1
    }

    public isRelative = (): boolean => {
        return this.exact && this.clone().reduce().denominator === 1
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

    public isUnit(): boolean {
        return Math.abs(this.#numerator) === 1 && this.#denominator === 1
    }

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

        this.exact = this.exact && Q.exact

        return this.reduce()
    }

    // ------------------------------------------
    public get numerator(): number {
        return this.#numerator
    }

    public set numerator(value: number) {
        this.#numerator = value
    }

    public one = (): this => {
        return this.fromNumber(1)
    }

    public opposite = (): this => {
        this.#numerator = -this.#numerator
        return this
    }

    public pow = (p: number | Fraction): Fraction => {
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

        // Check if they are perfect roots..
        if (p === 0) {
            return this
        }

        // If negative, inverse the fraction
        if (p < 0) {
            this.inverse()
        }

        // if p is not a safe integer, throw error
        if (!Number.isSafeInteger(p)) {
            throw new Error("The root must be an integer.")
        }

        // if the fraction is negative and the root is even, throw error
        if (this.isNegative() && p % 2 === 0) {
            throw new Error("The root of a negative number must be odd.")
        }

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
            this.exact = false
        }

        // Restore the sign
        this.multiply(sign)

        return this
    }

    public sign = (): 1 | -1 => {
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

    public get texWithSign(): string {
        return this.isPositive() ? `+${this.tex}` : this.tex
    }

    public get tfrac(): this {
        this.#type = FRAC_TYPE.tfrac
        return this
    }

    public get value(): number {
        const result = this.#numerator / this.#denominator
        return result === 0 ? 0 : result
    }

    get withSign(): this {
        this.#withSign = true
        return this
    }

    get withoutSign(): this {
        this.#withSign = false
        return this
    }

    public zero = (): this => {
        return this.fromNumber(0)
    }
}