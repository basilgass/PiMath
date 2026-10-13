import type {CompareSign, IDisplayDigits, IExpression, InputValue, IPiMathObject} from "../pimath.interface"
import {assertDigits} from "../helpers"
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

/** Digits shown for an approximate (non exact) value when no `withDigits` is set. */
const APPROXIMATE_DIGITS = 3

/**
 * An exact rational number such as `a/b`. A `Fraction` is exact: it stores an integer numerator and an integer denominator, and
 * flags a value that had to be approximated (`exact` is then `false`). It is permissive like a JavaScript
 * number: an impossible value is `NaN` or infinite (`isNaN()`, `isFinite()`) and does not throw.
 * Operations modify the fraction and return it; `clone()` keeps the original.
 * @example
 * new Fraction("1/2").add("1/3").display // "5/6"
 */

export class Fraction implements IPiMathObject<Fraction>, IExpression<Fraction>, IDisplayDigits {
    #denominator = 1
    #digits: number | null = null
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

        if (this.#digits !== null) {
            return plus + this.value.toFixed(this.#digits)
        }

        if (this.exact) {
            if (this.#denominator === 1) {
                return `${plus}${this.#numerator}`
            } else if (this.#numerator < 0) {
                return `-\\${this.#type}{ ${-this.#numerator} }{ ${this.#denominator} }`
            } else {
                return `${plus}\\${this.#type}{ ${this.#numerator} }{ ${this.#denominator} }`
            }
        } else {
            return plus + this.value.toFixed(APPROXIMATE_DIGITS)
        }
    }

    get display(): string {
        if (this.isInfinity()) {
            return `${this.sign() === 1 ? '+' : '-'}oo`
        }

        const plus = this.#withSign && this.isPositive() ? '+' : ''

        if (this.#digits !== null) {
            return plus + this.value.toFixed(this.#digits)
        }

        if (this.exact) {
            if (this.#denominator === 1) {
                return `${plus}${this.#numerator}`
            } else {
                return `${plus}${this.#numerator}/${this.#denominator}`
            }
        } else {
            return plus + this.value.toFixed(APPROXIMATE_DIGITS)
        }
    }

    /**
     * True when every given fraction has the same value as the first one (`2/4` equals `1/2`).
     */
    static areEquals(...F: Fraction[]): boolean {
        return F.every(f => f.isEqual(F[0]))
    }

    /**
     * Arithmetic mean of the values, as a new fraction. Without any value the result is `+∞`.
     */
    static average(...fractions: (InputValue<Fraction>)[]): Fraction {
        const M = new Fraction(0)

        for (const f of fractions) {
            M.add(f)
        }

        M.divide(fractions.length)

        return M
    }

    /**
     * True when `new Fraction(value)` understands the value: a `Fraction`, a number, `"a/b"`, a decimal string,
     * a periodic notation such as `"2.31(25)"`, or an empty string (zero).
     */
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

    /**
     * Largest of the values, as a new fraction.
     */
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

    /**
     * Smallest of the values, as a new fraction.
     */
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

    /**
     * Sort by value, ascending (descending when `reverse` is true). Returns a new array; the `Fraction`
     * instances of the input are reused, not cloned.
     */
    static sort(fractions: (InputValue<Fraction>)[], reverse?: boolean): Fraction[] {
        const fractionsObject: Fraction[] = fractions.map(f => f instanceof Fraction ? f : new Fraction(f))

        const sorted = fractionsObject.sort((a, b) => a.value - b.value)

        if (reverse) {
            sorted.reverse()
        }

        return sorted
    }

    /**
     * New fractions sharing the least common denominator, without reducing them.
     * @example
     * Fraction.toSameDenominateur("1/2", "1/3").map(f => f.display) // [ "3/6", "2/6" ]
     */
    static toSameDenominateur(...fractions: InputValue<Fraction>[]): Fraction[] {
        const F = fractions.map(x => new Fraction(x))
        const lcm = Numeric.lcm(...F.map(x => x.denominator))

        F.forEach(x => x.amplify(lcm / x.denominator))

        return F
    }

    /**
     * Remove the duplicates by value (`2/4` and `1/2` are the same). Keeps the first occurrence, as a clone.
     */
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

    /**
     * Product of the values, as a new fraction that is not reduced (call {@link reduce} to simplify it).
     */
    static xMultiply(...values: (InputValue<Fraction>)[]): Fraction {
        const R = new Fraction(1)

        values.forEach(f => R.multiply(f, false))

        return R
    }

    /**
     * Replace the fraction by its absolute value.
     */
    abs(): this {
        this.#numerator = Math.abs(this.#numerator)
        this.#denominator = Math.abs(this.#denominator)
        return this
    }

    /**
     * Add a value (fraction, number or string) and reduce the result. Modifies and returns the receiver.
     * The result is flagged approximate (`exact` is false) when an operand is approximate or an integer part exceeds 2^53.
     * @example
     * new Fraction("1/2").add("1/3").display // "5/6"
     */
    add(F: InputValue<Fraction>): this {
        if (F instanceof Fraction) {
            const N: number = this.#numerator
            const D: number = this.#denominator

            this.#numerator = N * F.denominator + F.numerator * D
            this.#denominator = D * F.denominator
            this.exact = this.exact && F.exact
            this.#flagOverflow()
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

    /**
     * Denominator, as stored (it is not reduced automatically).
     * Setting it to zero gives a signed infinity, or an invalid fraction when the numerator is zero too.
     */
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

    /**
     * Display option: `.tex` uses `\dfrac` instead of `\frac`. Chainable, persistent, kept by {@link clone}.
     */
    get asDfrac(): this {
        this.#type = FracType.dfrac
        return this
    }

    /**
     * Show the value as a decimal with `digits` digits (exact fractions included), or `null` for the
     * default display: an exact fraction as `a/b`, an approximate value with 3 digits.
     * @throws {InvalidArgumentError} if `digits` is neither `null` nor an integer from 0 to 100.
     */
    withDigits(digits: number | null): this {
        this.#digits = assertDigits(digits)
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
        this.#flagOverflow()
        return this.reduce()
    }

    /**
     * False when the value is an approximation (inexact root, very long decimal, integer part above 2^53).
     * An approximate fraction is displayed as a decimal with 3 digits.
     */
    get exact(): boolean {
        return this.#exact
    }

    set exact(value: boolean) {
        this.#exact = value
    }

    /**
     * Display option: `.tex` uses `\frac` (default). Chainable, persistent, kept by {@link clone}.
     */
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

    /**
     * Build a new fraction from a numerator and a denominator, without reducing it.
     * A zero denominator gives a signed infinity (`3/0`), or an invalid fraction for `0/0`.
     * Values that are not safe integers are converted through {@link fromNumber} and become approximate.
     */
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

    /**
     * Build a new fraction from a string: an integer, a decimal, `"a/b"` or a periodic decimal `"2.31(25)"`.
     * A malformed string does not throw: the result is an invalid fraction (see {@link isNaN}).
     */
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

    /**
     * Turn the receiver into `+∞`. Use {@link opposite} afterwards for `-∞`.
     */
    infinite(): this {
        this.#numerator = Infinity
        this.#denominator = 1
        this.exact = true
        return this
    }

    /**
     * Turn the receiver into an invalid fraction (`NaN`). Test it with {@link isNaN}.
     */
    invalid(): this {
        this.#numerator = NaN
        this.#denominator = 1
        this.exact = true
        return this
    }

    /**
     * Swap numerator and denominator, keeping the sign. Total operation, like
     * {@link divide}: the inverse of zero is +∞ (1 / 0), not an error.
     */
    inverse(): this {
        if (this.#numerator === 0) {
            return this.infinite()
        }

        const sign = this.sign()
        const n = Math.abs(this.#numerator)
        this.#numerator = Math.abs(this.#denominator) * sign
        this.#denominator = n

        return this
    }

    /**
     * Past 2^53 the integer parts are no longer exact, so the result is no longer
     * an exact rational: flag it (permissive primitive, no error).
     */
    #flagOverflow(): void {
        const unsafe = (v: number) => Number.isFinite(v) && Math.abs(v) > Number.MAX_SAFE_INTEGER
        if (unsafe(this.#numerator) || unsafe(this.#denominator)) {
            this.exact = false
        }
    }

    /**
     * True when both values are equal. Fractions are compared by cross product: `2/4` equals `1/2`.
     * A `NaN` is equal to nothing.
     */
    isEqual(than: Fraction | number): boolean {
        return this.compare(than, '=')
    }

    /**
     * True for an even integer. A fraction that is not an integer is neither even nor odd.
     */
    isEven(): boolean {
        return this.isRelative() && this.value % 2 === 0
    }

    /**
     * True unless the fraction is infinite or invalid.
     */
    isFinite(): boolean {
        return !this.isInfinity() && !this.isNaN()
    }

    /**
     * True when the receiver is greater than or equal to `than`.
     */
    isGeq(than: Fraction | number): boolean {
        return this.compare(than, '>=')
    }

    /**
     * True when the receiver is strictly greater than `than`.
     */
    isGreater(than: Fraction | number): boolean {
        return this.compare(than, '>')
    }

    /**
     * True for `+∞` and `-∞`.
     */
    isInfinity(): boolean {
        return Math.abs(this.#numerator) === Infinity
    }

    /**
     * True when the receiver is less than or equal to `than`.
     */
    isLeq(than: Fraction | number): boolean {
        return this.compare(than, '<=')
    }

    /**
     * True when the receiver is strictly less than `than`.
     */
    isLesser(than: Fraction | number): boolean {
        return this.compare(than, '<')
    }

    /**
     * True for an invalid fraction (`0/0`, a malformed string, a failed parse).
     */
    isNaN(): boolean {
        return isNaN(this.#numerator)
    }

    /**
     * True for a non-negative integer (zero included).
     */
    isNatural(): boolean {
        return this.isRelative() && this.isPositive()
    }

    /**
     * True when the value is strictly negative. Zero and `NaN` are not negative (see {@link sign}).
     */
    isNegative(): boolean {
        return this.sign() === -1
    }

    /**
     * True when the values differ. Unlike a negated {@link isEqual}, an invalid fraction is also considered different.
     */
    isNotEqual(than: Fraction | number): boolean {
        return this.compare(than, '<>')
    }

    /**
     * True when the numerator is not zero.
     */
    isNotZero(): boolean {
        return this.#numerator !== 0
    }

    /**
     * True for an odd integer, negative ones included.
     */
    isOdd(): boolean {
        return this.isRelative() && Math.abs(this.value % 2) === 1
    }

    /**
     * True for the literal `1/1`. A non-reduced `2/2` is not "one": call {@link reduce} first.
     */
    isOne(): boolean {
        return this.#numerator === 1 && this.#denominator === 1
    }

    /**
     * True when the decimal expansion of the exact fraction never stops (`1/3`, `1/7`), that is when the
     * reduced denominator has a prime factor other than 2 and 5. False for an approximate or non finite value.
     */
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

    /**
     * True when the value is positive or zero (see {@link sign}).
     */
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

    /**
     * True when numerator and denominator have no common divisor other than 1.
     */
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

    /**
     * True when the reduced fraction is the square of a rational (`4/9`). A negative value is never a square.
     */
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

    /**
     * True when the value is below zero.
     */
    isStrictlyNegative(): boolean {
        return this.value < 0
    }

    /**
     * True when the value is above zero.
     */
    isStrictlyPositive(): boolean {
        return this.value > 0
    }

    /**
     * True for `1` and `-1`, as integers.
     */
    isUnit(): boolean {
        return Math.abs(this.#numerator) === 1 && this.#denominator === 1
    }

    /**
     * True when the numerator is zero.
     */
    isZero(): boolean {
        return this.#numerator === 0
    }

    /**
     * Multiply by a value (fraction, number or string). Modifies and returns the receiver.
     * @param F - the factor.
     * @param reduce - reduce the result (default), or keep the product as it is when false.
     * @example
     * new Fraction("2/3").multiply("3/4").display // "1/2"
     */
    multiply(F: InputValue<Fraction>, reduce = true): this {
        // Parse the value.
        // If it's a fraction, return a clone of it
        // If it's an integer, return the fraction F/1
        const Q = new Fraction(F)

        this.#numerator = this.#numerator * Q.numerator
        this.#denominator = this.#denominator * Q.denominator

        this.exact = this.exact && Q.exact
        this.#flagOverflow()

        return reduce ? this.reduce() : this
    }

    // ------------------------------------------
    /**
     * Numerator, as stored (it carries the sign unless the denominator is negative).
     */
    get numerator(): number {
        return this.#numerator
    }

    set numerator(value: number) {
        this.#numerator = value
    }

    /**
     * Set the value to `1`. The display options are kept.
     */
    one(): this {
        return this.copy(Fraction.fromNumber(1))
    }

    /**
     * Change the sign of the fraction (`-` times the numerator).
     */
    opposite(): this {
        this.#numerator = -this.#numerator
        return this
    }

    /**
     * Raise to the power `p`. The fraction is reduced first; a negative `p` inverts it.
     * An integer exponent gives an exact result. A fractional exponent is exact only when numerator and
     * denominator are perfect powers (`(9/4)^0.5 = 3/2`); otherwise the result is approximate.
     * A rejected call leaves the receiver intact.
     * @throws {MathError} if the base is negative and the exponent is not an integer.
     */
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
            this.#flagOverflow()
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

    /**
     * Divide numerator and denominator by their greatest common divisor, and keep the sign on the numerator.
     * @example
     * new Fraction(6, -4).reduce().display // "-3/2"
     */
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

    /**
     * Square root, same as `root(2)`. Exact for a perfect square, approximate otherwise.
     * @throws {MathError} if the fraction is negative.
     */
    sqrt(): this {
        return this.root(2)
    }

    /**
     * Subtract a value (fraction, number or string) and reduce the result. Modifies and returns the receiver.
     */
    subtract(F: InputValue<Fraction>): this {
        if (F instanceof Fraction) {
            return this.add(F.clone().opposite())
        }
        // Route string/number through Fraction so subtract mirrors add's full
        // InputValue support (a bare `-F` would break on a string).
        return this.add(new Fraction(F).opposite())
    }

    /**
     * Display option: `.tex` uses `\tfrac` instead of `\frac`. Chainable, persistent, kept by {@link clone}.
     */
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

    /**
     * Decimal value (`numerator / denominator`). Negative zero is returned as `0`.
     */
    get value(): number {
        const result = this.#numerator / this.#denominator
        return result === 0 ? 0 : result
    }

    /**
     * Display option: show a `+` before a positive value (zero included). Chainable, persistent, kept by {@link clone}.
     * Cancel it with {@link withoutSign}.
     */
    get withSign(): this {
        this.#withSign = true
        return this
    }

    /**
     * Display option: cancel {@link withSign}. Chainable.
     */
    get withoutSign(): this {
        this.#withSign = false
        return this
    }

    /**
     * Set the value to `0`. The display options are kept.
     */
    zero(): this {
        return this.copy(Fraction.fromNumber(0))
    }
}
