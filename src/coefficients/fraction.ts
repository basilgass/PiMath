import type {compareSign, IExpression, InputValue, IPiMathObject} from "../pimath.interface"
import {Numeric} from "../numeric"
import {InvalidArgumentError, MathError} from "../errors"

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
    public parse(value: InputValue<Fraction>, denominator?: number): this {

        // A null value means a zero fraction.
        if (value === "") {
            this.#numerator = 0
            this.#denominator = 1
            return this
        }

        if (typeof value === "number" && isNaN(value)) {
            return this.invalid()
        }

        if (typeof value === "number" && !isFinite(value)) {
            this.infinite()
            if (value < 0) {
                this.opposite()
            }
            return this
        }

        if (typeof value === "string") {
            return this.fromString(value)
        }

        if (typeof value === "number" && denominator === undefined) {
            return this.fromNumber(value)
        }

        if (typeof value === "number" && typeof denominator === "number") {
            return this.fromNumbers(value, denominator)
        }

        if (value instanceof Fraction) {
            return this.copy(value)
        }

        return this
    }

    public clone(): Fraction {
        const F = new Fraction()
        F.numerator = this.#numerator
        F.denominator = this.#denominator
        F.exact = this.exact
        F.#type = this.#type
        F.#digits = this.#digits
        F.#withSign = this.#withSign
        return F
    }

    /**
     * Copy the mathematical value of another fraction into this one.
     *
     * NOTE: unlike {@link clone}, `copy` intentionally transfers only the
     * mathematical state (`#numerator`, `#denominator`, `#exact`) and NOT the
     * display state (`#type`, `#digits`, `#withSign`). This divergence is by
     * design: `parse()` routes a `Fraction` input to `copy()`, so the receiving
     * fraction keeps its own formatting configuration.
     */
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

    public static areEquals(...F: Fraction[]): boolean {
        return F.every(f => f.isEqual(F[0]))
    }

    public static average(...fractions: (InputValue<Fraction>)[]): Fraction {
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
            const parts = value.split('/')

            return parts.length <= 2 && parts.every(p => !isNaN(+p))
        }

        return false

    }

    public static max(...fractions: InputValue<Fraction>[]): Fraction {
        let M = new Fraction(fractions[0])

        for (const m of fractions) {
            const compare = new Fraction(m)
            if (compare.isGreater(M)) {
                M = compare.clone()
            }
        }

        return M
    }

    public static min(...fractions: (InputValue<Fraction>)[]): Fraction {
        let M = new Fraction(fractions[0])

        for (const m of fractions) {
            const compare = new Fraction(m)
            if (compare.isLesser(M)) {
                M = compare.clone()
            }
        }

        return M
    }

    public static sort(fractions: (InputValue<Fraction>)[], reverse?: boolean): Fraction[] {
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

    public static unique(fractions: (InputValue<Fraction>)[]): Fraction[] {
        const unique: Record<string, boolean> = {}
        const distinct: Fraction[] = []

        fractions.forEach(x => {
            if (!(x instanceof Fraction)) {
                x = new Fraction(x)
            }

            if (!unique[x.clone().reduce().tex]) {
                distinct.push(x.clone())
                unique[x.clone().reduce().tex] = true
            }
        })

        return distinct
    }

    public static xMultiply(...values: (InputValue<Fraction>)[]): Fraction {
        const R = new Fraction()

        values.forEach(f => R.multiply(f, false))

        return R
    }

    public abs(): this {
        this.#numerator = Math.abs(this.#numerator)
        this.#denominator = Math.abs(this.#denominator)
        return this
    }

    public add(F: InputValue<Fraction>): this {
        if (F instanceof Fraction) {
            const N: number = this.#numerator
            const D: number = this.#denominator

            this.#numerator = N * F.denominator + F.numerator * D
            this.#denominator = D * F.denominator
            this.exact = this.exact && F.exact
        } else {
            return this.add(new Fraction(F))
        }

        return this.reduce()
    }

    public amplify(k: number): this {
        if (!Number.isSafeInteger(k)) {
            throw new InvalidArgumentError("The amplification factor must be a safe integer.")
        }

        if (k === 0) {
            throw new InvalidArgumentError("The amplification factor cannot be zero.")
        }

        this.#numerator *= k
        this.#denominator *= k

        return this
    }

    /**
     * Compare the current coefficient with another coefficient
     * @param F (Coefficient) The coefficient to _compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    public compare(F: InputValue<Fraction>, sign?: compareSign): boolean {
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
                return this.#numerator * compareFraction.denominator ===
                    compareFraction.numerator * this.#denominator
            case "<>":
                return this.#numerator * compareFraction.denominator !==
                    compareFraction.numerator * this.#denominator
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

    public get asDfrac(): this {
        this.#type = FRAC_TYPE.dfrac
        return this
    }

    digits(value: number): this {
        this.#digits = value
        return this
    }

    public divide(F: Fraction | number): this {
        const Q = new Fraction(F)

        if (Q.numerator === 0) {
            // Division by zero yields infinity; preserve the dividend's sign
            // so that e.g. (-3) / 0 evaluates to -Infinity, not +Infinity.
            const s = this.sign()
            this.infinite()
            return s === -1 ? this.opposite() : this
        }

        const N: number = this.#numerator
        const D: number = this.#denominator

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

    public get asFrac(): this {
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

        // Exponential notation (e.g. 1e-7, 1e21) is not supported: toString()
        // would break the "integer numerator / integer denominator" invariant.
        // Fail explicitly rather than silently producing a corrupted fraction.
        if (value.toString().includes('e') || value.toString().includes('E')) {
            throw new InvalidArgumentError(`Exponential notation is not supported: ${value}`)
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
        if (denominator === 0) {
            // Single, centralized handling of a zero denominator:
            // x/0 → signed infinity, and 0/0 → invalid (NaN).
            if (numerator === 0) {
                return this.invalid()
            }
            return numerator < 0 ? this.infinite().opposite() : this.infinite()
        }

        if (Number.isSafeInteger(numerator) && Number.isSafeInteger(denominator)) {
            // The given value is an integer
            this.#numerator = numerator
            this.#denominator = denominator
            this.#exact = true
            return this
        }

        return this.fromNumber(numerator / denominator)
    }

    public fromPeriodic(value: string | number, length: number): this {
        const [, decimal] = (value.toString()).split(/[.,]/)
        const p: number = decimal ? decimal.length : 0

        if (!Number.isSafeInteger(length) || length <= 0) {
            throw new InvalidArgumentError("The periodic length must be a positive integer.")
        }

        if (length > p) {
            throw new InvalidArgumentError(`The periodic length (${length}) cannot exceed the number of decimal digits (${p}).`)
        }

        const power = Math.pow(10, p)
        const shift = Math.pow(10, p - length)

        // Handle the sign separately: Math.floor rounds toward -Infinity,
        // which would corrupt the truncation for negative values.
        const numericValue = +value
        const sign = numericValue < 0 ? -1 : 1
        const absValue = Math.abs(numericValue)

        this.#numerator = sign * Math.round(absValue * power - Math.floor(absValue * shift))
        this.#denominator = power - shift
        this.#exact = true

        return this.reduce()
    }

    public fromString(value: string): this {
        // Periodic decimal notation, e.g. "2.31(25)" = 2.31252525...
        const periodicMatch = /^([+-]?)(\d*)\.(\d*)\((\d+)\)$/.exec(value)
        if (periodicMatch) {
            const [, sign, intPart, nonPeriodic, period] = periodicMatch
            const absDecimal = `${intPart || '0'}.${nonPeriodic}${period}`

            this.fromPeriodic(absDecimal, period.length)
            if (sign === '-') {
                this.opposite()
            }
            return this.reduce()
        }

        // A string using parentheses that did not match the notation is malformed.
        if (value.includes('(') || value.includes(')')) {
            return this.invalid()
        }

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

        // One divide sign: delegate to fromNumbers so the zero-denominator case
        // is handled at a single place (see fromNumbers).
        return this.fromNumbers(S[0], S[1])
    }

    public infinite(): this {
        this.#numerator = Infinity
        this.#denominator = 1
        this.exact = true
        return this
    }

    public invalid(): this {
        this.#numerator = NaN
        this.#denominator = 1
        this.exact = true
        return this
    }

    public inverse(): this {
        const sign = this.sign()
        const n = Math.abs(this.#numerator)
        this.#numerator = Math.abs(this.#denominator) * sign
        this.#denominator = n

        return this
    }

    public isEqual(than: Fraction | number): boolean {
        return this.compare(than, '=')
    }

    public isEven(): boolean {
        return this.isRelative() && this.value % 2 === 0
    }

    public isFinite(): boolean {
        return !this.isInfinity() && !this.isNaN()
    }

    public isGeq(than: Fraction | number): boolean {
        return this.compare(than, '>=')
    }

    public isGreater(than: Fraction | number): boolean {
        return this.compare(than, '>')
    }

    public isInfinity(): boolean {
        return Math.abs(this.#numerator) === Infinity
    }

    public isLeq(than: Fraction | number): boolean {
        return this.compare(than, '<=')
    }

    public isLesser(than: Fraction | number): boolean {
        return this.compare(than, '<')
    }

    public isNaN(): boolean {
        return isNaN(this.#numerator)
    }

    public isNatural(): boolean {
        return this.isRelative() && this.isPositive()
    }

    public isNegative(): boolean {
        return this.sign() === -1
    }

    public isNotEqual(than: Fraction | number): boolean {
        return this.compare(than, '<>')
    }

    public isNotZero(): boolean {
        return this.#numerator !== 0
    }

    public isOdd(): boolean {
        return this.isRelative() && Math.abs(this.value % 2) === 1
    }

    public isOne(): boolean {
        return this.#numerator === 1 && this.#denominator === 1
    }

    public isPeriodic(): boolean {
        if (!this.exact || !this.isFinite()) {
            return false
        }

        let d = Math.abs(this.clone().reduce().denominator)
        while (d % 2 === 0) {
            d /= 2
        }
        while (d % 5 === 0) {
            d /= 5
        }

        return d !== 1
    }

    public isPositive(): boolean {
        return this.sign() === 1
    }

    /**
     * True when the fraction is exact and NOT an integer.
     *
     * Terminology note (internal, assumed): here an integer is deliberately
     * excluded — use {@link isRelative} to test for an integer value.
     */
    public isRational(): boolean {
        return this.exact && !this.isRelative()
    }

    public isReduced(): boolean {
        return Math.abs(Numeric.gcd(this.#numerator, this.#denominator)) === 1
    }

    /**
     * True when the fraction represents a relative integer, i.e. its reduced
     * denominator equals 1 (e.g. 6/3 = 2). See {@link isRational} for the
     * exact non-integer case.
     */
    public isRelative(): boolean {
        return this.exact && this.clone().reduce().denominator === 1
    }

    public isSquare(): boolean {
        const f = this.clone().reduce()

        // A negative value can never be a perfect square.
        if (f.isNegative()) {
            return false
        }

        const n = Math.abs(f.numerator)
        const d = Math.abs(f.denominator)
        const rootN = Math.round(Math.sqrt(n))
        const rootD = Math.round(Math.sqrt(d))

        return rootN * rootN === n && rootD * rootD === d
    }

    public isStrictlyNegative(): boolean {
        return this.value < 0
    }

    public isStrictlyPositive(): boolean {
        return this.value > 0
    }

    public isUnit(): boolean {
        return Math.abs(this.#numerator) === 1 && this.#denominator === 1
    }

    // Mathematical operations specific to fractions
    public isZero(): boolean {
        return this.#numerator === 0
    }

    public multiply(F: InputValue<Fraction>, reduce = true): this {
        // Parse the value.
        // If it's a fraction, return a clone of it
        // If it's an integer, return the fraction F/1
        const Q = new Fraction(F)

        this.#numerator = this.#numerator * Q.numerator
        this.#denominator = this.#denominator * Q.denominator

        this.exact = this.exact && Q.exact

        return reduce ? this.reduce() : this
    }

    // ------------------------------------------
    public get numerator(): number {
        return this.#numerator
    }

    public set numerator(value: number) {
        this.#numerator = value
    }

    public one(): this {
        return this.fromNumber(1)
    }

    public opposite(): this {
        this.#numerator = -this.#numerator
        return this
    }

    public pow(p: number | Fraction): this {
        if (p instanceof Fraction) {
            return this.pow(p.value)
        }

        this.reduce()
        if (p < 0) {
            this.inverse()
        }

        const absP = Math.abs(p)

        if (Number.isInteger(absP)) {
            // Integer exponent: the result is always an exact rational.
            // Round to absorb floating-point noise on large powers.
            this.#numerator = Math.round(Math.pow(this.#numerator, absP))
            this.#denominator = Math.round(Math.pow(this.#denominator, absP))
            return this
        }

        // Fractional exponent (e.g. 0.5): exact only when both parts are
        // perfect powers. Round the candidate, then verify by raising it back
        // through the inverse exponent — no arbitrary epsilon involved.
        const powNum = Math.round(Math.pow(this.#numerator, absP))
        const powDen = Math.round(Math.pow(this.#denominator, absP))

        if (Math.round(Math.pow(powNum, 1 / absP)) === this.#numerator &&
            Math.round(Math.pow(powDen, 1 / absP)) === this.#denominator) {
            // Exact result — e.g. (9/4)^0.5 = 3/2
            this.#numerator = powNum
            this.#denominator = powDen
        } else {
            // Non-exact result — e.g. (2/1)^0.5 = 1.414...
            this.#numerator = Math.pow(this.#numerator, absP) / Math.pow(this.#denominator, absP)
            this.#denominator = 1
            this.exact = false
        }

        return this
    }

    public reduce(): this {
        const g = Numeric.gcd(this.#numerator, this.#denominator)
        this.#numerator = this.#numerator / g
        this.#denominator = this.#denominator / g

        if (this.#denominator < 0) {
            this.#denominator = -this.#denominator
            this.#numerator = -this.#numerator
        }
        return this
    }

    public root(p: number): this {

        // Check if they are perfect roots..
        if (p === 0) {
            return this
        }

        // if p is not a safe integer, throw error
        if (!Number.isSafeInteger(p)) {
            throw new InvalidArgumentError("The root must be an integer.")
        }

        // If negative, inverse the fraction
        if (p < 0) {
            this.inverse()
        }


        // if the fraction is negative and the root is even, throw error
        if (this.isNegative() && p % 2 === 0) {
            throw new MathError("The root of a negative number must be odd.")
        }

        // get the sign of the fraction and make it positive
        const sign = this.sign()
        this.abs()

        // Reduce the fraction
        this.reduce()

        // The root degree magnitude (the sign of p was already handled above).
        const q = Math.abs(p)

        // Round the candidate root, then verify by raising it back to the
        // integer power q. Since q is an integer, that check is exact — this
        // catches perfect roots (e.g. ∛27 = 3) that a plain floor would miss.
        const rootNum = Math.round(Math.pow(this.#numerator, 1 / q))
        const rootDen = Math.round(Math.pow(this.#denominator, 1 / q))

        if (Math.pow(rootNum, q) === this.#numerator && Math.pow(rootDen, q) === this.#denominator) {
            // Perfect root
            this.#numerator = rootNum
            this.#denominator = rootDen
        } else {
            // The fraction is not a perfect root - make it approximative
            this.#numerator = Math.pow(this.#numerator, 1 / q) / Math.pow(this.#denominator, 1 / q)
            this.#denominator = 1
            this.exact = false
        }

        // Restore the sign
        this.multiply(sign)

        return this
    }

    /**
     * Sign of the fraction, as +1 or -1.
     *
     * NOTE (assumed): zero is classified as positive (`sign()` returns 1).
     * Consequently `isPositive()` and `isNatural()` are true for zero, while
     * `isNegative()` is false.
     */
    public sign(): 1 | -1 {
        return (this.#numerator * this.#denominator >= 0) ? 1 : -1
    }

    public sqrt(): this {
        return this.root(2)
    }

    public subtract(F: Fraction | number): this {
        if (F instanceof Fraction) {
            return this.add(F.clone().opposite())
        } else {
            return this.add(-F)
        }
    }

    public get asTfrac(): this {
        this.#type = FRAC_TYPE.tfrac
        return this
    }

    public toRepeatingDecimal(): {
        sign: 1 | -1
        integerPart: string
        nonPeriodic: string
        periodic: string
        periodLength: number
    } {
        if (!this.exact || !this.isFinite()) {
            throw new InvalidArgumentError("Cannot decompose a non-exact or infinite fraction.")
        }

        const f = this.clone().reduce()
        const sign = f.sign()
        const n = Math.abs(f.numerator)
        const d = Math.abs(f.denominator)

        const integerPart = Math.floor(n / d).toString()
        let remainder = n % d

        const digits: number[] = []
        const seen = new Map<number, number>()   // remainder -> index in digits
        let periodStart = -1

        while (remainder !== 0) {
            const seenIndex = seen.get(remainder)
            if (seenIndex !== undefined) {
                periodStart = seenIndex
                break
            }
            seen.set(remainder, digits.length)
            remainder *= 10
            digits.push(Math.floor(remainder / d))
            remainder %= d
        }

        const nonPeriodic = (periodStart === -1 ? digits : digits.slice(0, periodStart)).join('')
        const periodic = periodStart === -1 ? '' : digits.slice(periodStart).join('')

        return {sign, integerPart, nonPeriodic, periodic, periodLength: periodic.length}
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

    public zero(): this {
        return this.fromNumber(0)
    }
}
