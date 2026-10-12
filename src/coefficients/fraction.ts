import type {CompareSign, IExpression, InputValue, IPiMathObject} from "../pimath.interface"
import {Numeric} from "../numeric"
import {InvalidArgumentError, MathError} from "../errors"

/**
 * LaTeX command used to render the fraction: `\frac`, `\dfrac` or `\tfrac`.
 * Selected through the {@link Fraction.asFrac} / {@link Fraction.asDfrac} /
 * {@link Fraction.asTfrac} getters rather than set directly.
 */
export enum FracType {
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
    #numerator = 0
    #type: FracType = FracType.frac
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
     * Router: inspect the input type/format and delegate to the matching
     * from*** builder (fromString / fromNumber / fromNumbers), or to copy() for
     * a Fraction input. Does not build the fraction inline.
     */
    parse(value: InputValue<Fraction>, denominator?: number): this {

        // An empty string means a zero fraction.
        if (value === "") {
            return this.zero()
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
            return this.copy(Fraction.fromString(value))
        }

        if (typeof value === "number" && denominator === undefined) {
            return this.copy(Fraction.fromNumber(value))
        }

        if (typeof value === "number" && typeof denominator === "number") {
            return this.copy(Fraction.fromNumbers(value, denominator))
        }

        if (value instanceof Fraction) {
            return this.copy(value)
        }

        return this
    }

    clone(): Fraction {
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
    copy(value: Fraction): this {
        this.#numerator = value.numerator
        this.#denominator = value.denominator
        this.#exact = value.exact

        return this
    }

    get tex(): string {
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

    get display(): string {
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

    static areEquals(...F: Fraction[]): boolean {
        return F.every(f => f.isEqual(F[0]))
    }

    static average(...fractions: (InputValue<Fraction>)[]): Fraction {
        const M = new Fraction(0)

        for (const f of fractions) {
            M.add(f)
        }

        M.divide(fractions.length)

        return M
    }

    static isFraction(value: InputValue<Fraction>) {
        if (value instanceof Fraction ||
            (typeof value === "number" && !isNaN(value))
        ) {
            return true
        }

        if (typeof value === "string") {
            // parse() treats the empty string as zero.
            if (value === "") {
                return true
            }

            // Periodic decimal notation, e.g. "2.31(25)" — accepted by parse.
            if (/^([+-]?)(\d*)\.(\d*)\((\d+)\)$/.test(value)) {
                return true
            }

            const parts = value.split('/')

            // At most one '/', and each part must be a non-empty number
            // (rejects "2/", "/3", "1/2/3").
            return parts.length <= 2 &&
                parts.every(p => p.trim() !== '' && !isNaN(+p))
        }

        return false

    }

    static max(...fractions: InputValue<Fraction>[]): Fraction {
        let M = new Fraction(fractions[0])

        for (const m of fractions) {
            const compare = new Fraction(m)
            if (compare.isGreater(M)) {
                M = compare.clone()
            }
        }

        return M
    }

    static min(...fractions: (InputValue<Fraction>)[]): Fraction {
        let M = new Fraction(fractions[0])

        for (const m of fractions) {
            const compare = new Fraction(m)
            if (compare.isLesser(M)) {
                M = compare.clone()
            }
        }

        return M
    }

    static sort(fractions: (InputValue<Fraction>)[], reverse?: boolean): Fraction[] {
        const fractionsObject: Fraction[] = fractions.map(f => f instanceof Fraction ? f : new Fraction(f))

        const sorted = fractionsObject.sort((a, b) => a.value - b.value)

        if (reverse) {
            sorted.reverse()
        }

        return sorted
    }

    static toSameDenominateur(...fractions: InputValue<Fraction>[]): Fraction[] {
        const F = fractions.map(x => new Fraction(x))
        const lcm = Numeric.lcm(...F.map(x => x.denominator))

        F.forEach(x => x.amplify(lcm / x.denominator))

        return F
    }

    static unique(fractions: (InputValue<Fraction>)[]): Fraction[] {
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

    static xMultiply(...values: (InputValue<Fraction>)[]): Fraction {
        const R = new Fraction(1)

        values.forEach(f => R.multiply(f, false))

        return R
    }

    abs(): this {
        this.#numerator = Math.abs(this.#numerator)
        this.#denominator = Math.abs(this.#denominator)
        return this
    }

    add(F: InputValue<Fraction>): this {
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

    /**
     * Scale numerator and denominator by the same non-zero integer factor.
     * @throws {InvalidArgumentError} if k is not a safe integer, or is zero.
     */
    amplify(k: number): this {
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
     * Compare this fraction with another value using the given relational sign.
     * @param F - the value to compare against.
     * @param sign - relation to test (default '='); accepts =, <, <=, >, >= and
     *   their aliases (leq, geq, neq, same, =<, =>, <>).
     */
    compare(F: InputValue<Fraction>, sign?: CompareSign): boolean {
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
            case "same":
                return this.#numerator * compareFraction.denominator ===
                    compareFraction.numerator * this.#denominator
            case "<>":
            case "neq":
                return this.#numerator * compareFraction.denominator !==
                    compareFraction.numerator * this.#denominator
            default:
                return false
        }
    }

    get denominator(): number {
        return this.#denominator
    }

    set denominator(value: number) {
        if (value === 0) {
            // Mirror divide()/fromNumbers(): n/0 → signed ∞, 0/0 → NaN. This
            // normalizes the only genuinely corrupting state (a zero denominator
            // would make value ±∞ while isInfinity() stayed false).
            if (this.#numerator === 0) {
                this.invalid()
                return
            }
            const s = this.sign()
            this.infinite()
            if (s === -1) {
                this.opposite()
            }
            return
        }
        this.#denominator = value
    }

    get asDfrac(): this {
        this.#type = FracType.dfrac
        return this
    }

    digits(value: number): this {
        this.#digits = value
        return this
    }

    /**
     * Divide by another value. Total operation (see the "IExpression totality"
     * convention): dividing by zero does not throw but yields a signed infinity,
     * preserving the dividend's sign (e.g. (-3) / 0 → -∞).
     */
    divide(F: InputValue<Fraction>): this {
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

    get asFrac(): this {
        this.#type = FracType.frac
        return this
    }

    /**
     * Build a new fraction from a single number (integer or decimal).
     * @throws {InvalidArgumentError} for exponential notation (e.g. 1e-7), which
     *   would break the integer numerator/denominator invariant.
     */
    static fromNumber(value: number): Fraction {
        const f = new Fraction()
        if (Number.isSafeInteger(value)) {
            f.#numerator = value
            f.#denominator = 1
            f.#exact = true
            return f
        }

        // Exponential notation (e.g. 1e-7, 1e21) is not supported: toString()
        // would break the "integer numerator / integer denominator" invariant.
        // Fail explicitly rather than silently producing a corrupted fraction.
        if (value.toString().includes('e') || value.toString().includes('E')) {
            throw new InvalidArgumentError(`Exponential notation is not supported: ${value}`)
        }

        const [, decimal] = (value.toString()).split('.')
        const p: number = decimal ? decimal.length : 0
        const power = Math.pow(10, p)

        f.#numerator = value * power
        f.#denominator = power

        f.#numerator = Numeric.numberCorrection(f.#numerator)
        f.#denominator = Numeric.numberCorrection(f.#denominator)

        f.reduce()

        // assume it's not exact if the decimal part is more than 10 decimals
        f.#exact = p < 10

        return f
    }

    static fromNumbers(numerator: number, denominator: number): Fraction {
        if (denominator === 0) {
            // Single, centralized handling of a zero denominator:
            // x/0 → signed infinity, and 0/0 → invalid (NaN).
            if (numerator === 0) {
                return new Fraction().invalid()
            }
            const f = new Fraction().infinite()
            if (numerator < 0) f.opposite()
            return f
        }

        if (Number.isSafeInteger(numerator) && Number.isSafeInteger(denominator)) {
            const f = new Fraction()
            f.#numerator = numerator
            f.#denominator = denominator
            f.#exact = true
            return f
        }

        return Fraction.fromNumber(numerator / denominator)
    }

    /**
     * Build a new fraction from a decimal whose last `length` digits repeat
     * (e.g. fromPeriodic(2.3125, 2) → 11447/4950).
     * @throws {InvalidArgumentError} if length is not a positive integer, or
     *   exceeds the number of decimal digits.
     */
    static fromPeriodic(value: string | number, length: number): Fraction {
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

        const f = new Fraction()
        f.#numerator = sign * Math.round(absValue * power - Math.floor(absValue * shift))
        f.#denominator = power - shift
        f.#exact = true

        return f.reduce()
    }

    static fromString(value: string): Fraction {
        // Periodic decimal notation, e.g. "2.31(25)" = 2.31252525...
        const periodicMatch = /^([+-]?)(\d*)\.(\d*)\((\d+)\)$/.exec(value)
        if (periodicMatch) {
            const [, sign, intPart, nonPeriodic, period] = periodicMatch
            const absDecimal = `${intPart || '0'}.${nonPeriodic}${period}`

            const f = Fraction.fromPeriodic(absDecimal, period.length)
            if (sign === '-') f.opposite()
            return f.reduce()
        }

        // A string using parentheses that did not match the notation is malformed.
        if (value.includes('(') || value.includes(')')) {
            return new Fraction().invalid()
        }

        // Split the string value in two parts: Numerator/Denominator
        const S = value.split('/').map(Number)

        // Only one divide sign allowed
        if (S.length > 2) {
            return new Fraction().invalid()
        }

        // Each part must be a number
        if (S.some(x => isNaN(x))) {
            return new Fraction().invalid()
        }

        if (S.length === 1) {
            return Fraction.fromNumber(+value)
        }

        // One divide sign: delegate to fromNumbers so the zero-denominator case
        // is handled at a single place (see fromNumbers).
        return Fraction.fromNumbers(S[0], S[1])
    }

    infinite(): this {
        this.#numerator = Infinity
        this.#denominator = 1
        this.exact = true
        return this
    }

    invalid(): this {
        this.#numerator = NaN
        this.#denominator = 1
        this.exact = true
        return this
    }

    inverse(): this {
        const sign = this.sign()
        const n = Math.abs(this.#numerator)
        this.#numerator = Math.abs(this.#denominator) * sign
        this.#denominator = n

        return this
    }

    isEqual(than: Fraction | number): boolean {
        return this.compare(than, '=')
    }

    isEven(): boolean {
        return this.isRelative() && this.value % 2 === 0
    }

    isFinite(): boolean {
        return !this.isInfinity() && !this.isNaN()
    }

    isGeq(than: Fraction | number): boolean {
        return this.compare(than, '>=')
    }

    isGreater(than: Fraction | number): boolean {
        return this.compare(than, '>')
    }

    isInfinity(): boolean {
        return Math.abs(this.#numerator) === Infinity
    }

    isLeq(than: Fraction | number): boolean {
        return this.compare(than, '<=')
    }

    isLesser(than: Fraction | number): boolean {
        return this.compare(than, '<')
    }

    isNaN(): boolean {
        return isNaN(this.#numerator)
    }

    isNatural(): boolean {
        return this.isRelative() && this.isPositive()
    }

    isNegative(): boolean {
        return this.sign() === -1
    }

    isNotEqual(than: Fraction | number): boolean {
        return this.compare(than, '<>')
    }

    isNotZero(): boolean {
        return this.#numerator !== 0
    }

    isOdd(): boolean {
        return this.isRelative() && Math.abs(this.value % 2) === 1
    }

    isOne(): boolean {
        return this.#numerator === 1 && this.#denominator === 1
    }

    isPeriodic(): boolean {
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

    isPositive(): boolean {
        return this.sign() === 1
    }

    /**
     * True when the fraction is an exact rational number: a finite, exact
     * numerator/denominator. Integers are included (4 = 4/1 is rational).
     * Approximate (non-exact) fractions and ±Infinity / NaN are not rational.
     */
    isRational(): boolean {
        return this.exact && this.isFinite()
    }

    /**
     * True when the fraction is exact and NOT an integer, i.e. it has a non-zero
     * fractional part (e.g. 3/2). Use {@link isRelative} to test for an integer.
     * (This was the former behaviour of {@link isRational}.)
     */
    hasFractionalPart(): boolean {
        return this.exact && !this.isRelative()
    }

    isReduced(): boolean {
        return Math.abs(Numeric.gcd(this.#numerator, this.#denominator)) === 1
    }

    /**
     * True when the fraction represents a relative integer, i.e. its reduced
     * denominator equals 1 (e.g. 6/3 = 2). See {@link hasFractionalPart} for the
     * exact non-integer case.
     */
    isRelative(): boolean {
        return this.exact && this.clone().reduce().denominator === 1
    }

    isSquare(): boolean {
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

    isStrictlyNegative(): boolean {
        return this.value < 0
    }

    isStrictlyPositive(): boolean {
        return this.value > 0
    }

    isUnit(): boolean {
        return Math.abs(this.#numerator) === 1 && this.#denominator === 1
    }

    // Mathematical operations specific to fractions
    isZero(): boolean {
        return this.#numerator === 0
    }

    multiply(F: InputValue<Fraction>, reduce = true): this {
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
    get numerator(): number {
        return this.#numerator
    }

    set numerator(value: number) {
        this.#numerator = value
    }

    one(): this {
        return this.copy(Fraction.fromNumber(1))
    }

    opposite(): this {
        this.#numerator = -this.#numerator
        return this
    }

    pow(p: number | Fraction): this {
        if (p instanceof Fraction) {
            return this.pow(p.value)
        }

        // A non-integer exponent on a negative base is not real (e.g. (-4)^0.5).
        // Reject it up front like root() does, before any mutation, so a
        // rejected pow leaves the receiver intact (atomicity). A float exponent
        // cannot reliably encode an odd root degree, so no negative base is
        // accepted for a fractional exponent.
        if (this.isNegative() && !Number.isInteger(p)) {
            throw new MathError("A negative base cannot be raised to a non-integer exponent.")
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

    reduce(): this {
        const g = Numeric.gcd(this.#numerator, this.#denominator)
        this.#numerator = this.#numerator / g
        this.#denominator = this.#denominator / g

        if (this.#denominator < 0) {
            this.#denominator = -this.#denominator
            this.#numerator = -this.#numerator
        }
        return this
    }

    /**
     * p-th root of the fraction, exact when it is a perfect power, otherwise an
     * approximation (`exact` becomes false). A rejected root leaves the receiver
     * intact (atomicity).
     * @throws {InvalidArgumentError} if p is not a safe integer.
     * @throws {MathError} if the radicand is negative and p is even (not real).
     */
    root(p: number): this {

        // Check if they are perfect roots..
        if (p === 0) {
            return this
        }

        // if p is not a safe integer, throw error
        if (!Number.isSafeInteger(p)) {
            throw new InvalidArgumentError("The root must be an integer.")
        }

        // Validate before any mutation so a rejected root leaves the receiver
        // intact (atomicity). inverse() preserves the sign, so testing
        // isNegative() here is equivalent to testing it after the inversion below.
        if (this.isNegative() && p % 2 === 0) {
            throw new MathError("The root of a negative number must be odd.")
        }

        // If negative exponent, inverse the fraction
        if (p < 0) {
            this.inverse()
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
     * NOTE (assumed): zero AND NaN are classified as positive (`sign()` returns
     * 1). Consequently `isPositive()` and `isNatural()` are true for zero, while
     * `isNegative()` is false. A NaN has no real sign; +1 is returned so an
     * invalid fraction is not misclassified as negative.
     */
    sign(): 1 | -1 {
        if (this.isNaN()) {
            return 1
        }
        return (this.#numerator * this.#denominator >= 0) ? 1 : -1
    }

    sqrt(): this {
        return this.root(2)
    }

    subtract(F: InputValue<Fraction>): this {
        if (F instanceof Fraction) {
            return this.add(F.clone().opposite())
        }
        // Route string/number through Fraction so subtract mirrors add's full
        // InputValue support (a bare `-F` would break on a string).
        return this.add(new Fraction(F).opposite())
    }

    get asTfrac(): this {
        this.#type = FracType.tfrac
        return this
    }

    /**
     * Decompose the fraction into its repeating-decimal parts (sign, integer
     * part, non-periodic digits, periodic digits and period length).
     * @throws {InvalidArgumentError} if the fraction is non-exact or infinite.
     */
    toRepeatingDecimal(): {
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

    get value(): number {
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

    zero(): this {
        return this.copy(Fraction.fromNumber(0))
    }
}
