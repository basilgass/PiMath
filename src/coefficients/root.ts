import {Fraction} from "./fraction"
import type {IExpression, InputValue, IPiMathObject} from "../pimath.interface"
import {Numeric} from "../numeric"
import {InvalidArgumentError, MathError, ParseError} from "../errors"

export class Root implements IPiMathObject<Root>, IExpression<Root> {
    #factor: Fraction
    #index: number
    #radical: Fraction
    #withSign = false

    constructor(value?: InputValue<Root | Fraction>) {
        this.#index = 2
        this.#factor = new Fraction().zero()
        this.#radical = new Fraction().zero()

        // Test `!== undefined`, not truthiness: 0 and "" are legitimate inputs,
        // and a NaN must be rejected by parse (boundary strictness), not silently
        // swallowed into a zero root.
        if (value !== undefined) {
            this.parse(value)
        }


        return this
    }

    /**
     * Router: inspect the input type and delegate to the matching builder.
     * A same-type (Root) input goes through copy(); every other form has its
     * own from*** / #fromScalar. Construction logic is never inlined here.
     * @throws {ParseError} if a string/number input is malformed.
     */
    parse(value: InputValue<Root | Fraction>): this {
        // should be able to parse "display" roots.
        // sqrt12 or sqrt(12) or sqrt(12/5) => [2, 12 or 12/5, 1]
        // root(n)10 or root(n)(10) or root(n)(10/3) => [n, 10 or 10/3, 1]
        // 7sqrt12 or 7sqrt(12) or 7sqrt(12/5) => [2, 12 or 12/5, 7]
        // 7root(n)10 or 7root(n)(10) or 7root(n)(10/3) => [n, 10 or 10/3, 7]

        if (value instanceof Root) {
            return this.copy(value)
        }

        if (value instanceof Fraction) {
            return this.copy(Root.fromFraction(value))
        }

        if (typeof value === "string") {
            return this.copy(Root.fromString(value))
        }

        // Remaining scalar (number): build the factor at Root's boundary.
        const r = new Root()
        r.#fromScalar(value)
        return this.copy(r)
    }

    // Copy the mathematical state of another Root (index + radical + factor).
    // Like Fraction.copy, it deliberately does NOT transfer the display state
    // (#withSign): parse() routes a Root input here, so the receiver keeps its
    // own formatting. Use clone() for a full duplicate.
    copy(value: Root): this {
        this.index = value.index
        this.radical = value.radical.clone()
        this.factor = value.factor.clone()

        return this
    }

    static fromFraction(value: Fraction): Root {
        const r = new Root()
        r.index = 2
        r.factor = value.clone()
        r.#radical.one()
        return r
    }

    /**
     * Build a new Root by delegating a string to the sqrt / root parser, or to
     * the scalar builder for a plain fraction string.
     * @throws {ParseError} if the string is a malformed radical or fraction.
     */
    static fromString(value: string): Root {
        const r = new Root()
        if (value.includes('sqrt')) return r.#parse_sqrt(value)
        if (value.includes('root')) return r.#parse_root(value)
        return r.#fromScalar(value)
    }

    // Shared scalar builder (number or plain fraction string) → factor·√[2]{1}.
    // Strictness is enforced at Root's boundary: Fraction keeps a permissive
    // NaN state (its invalid()), but a Root refuses to build on an invalid
    // factor, so a malformed input throws instead of yielding a NaN root.
    #fromScalar(value: string | number): this {
        const factor = new Fraction(value)
        if (factor.isNaN()) {
            throw new ParseError(`Cannot parse "${value}" as a root or fraction`)
        }

        this.index = 2
        this.factor = factor
        this.radical.one()

        return this
    }

    clone(): Root {
        const R = new Root().from(this.index, this.radical, this.factor)
        R.#withSign = this.#withSign
        return R
    }

    get tex(): string {
        // b \sqrt{}
        // b
        // \sqrt{}
        // -\sqrt{}

        // Force the plus sign.
        const plus = this.#withSign && this.factor.isPositive() ? '+' : ''
        const space = (plus && this.#factor.numerator===1) ? ' ' : ''

        if (this.isZero()) return `${plus}0`

        const den = this.#makeTeXLine(this.#factor.denominator, this.#radical.denominator)
        const num = this.#makeTeXLine(this.#factor.numerator, this.#radical.numerator) ?? '1'

        if (den === null) return `${plus}${space}${num}`

        return `${plus}${space}\\frac{ ${num} }{ ${den} }`
    }

    get display(): string {
        // force the '+' sign if asked
        const plus = this.#withSign && this.factor.isPositive() ? '+' : ''

        if (this.isZero()) return `${plus}0`

        const den = this.#makeDisplayLine(this.#factor.denominator, this.#radical.denominator, true)
        const num = this.#makeDisplayLine(this.#factor.numerator, this.#radical.numerator, den !== null) ?? '1'

        if (den === null) return `${plus}${num}`

        return `${plus}${num}/${den}`
    }

    /**
     * Add another root. Both operands are reduced to a common radical first.
     * @throws {MathError} if the roots do not share the same index and radical.
     */
    add(value: InputValue<Root>): this {
        return this.#addSub(value, false)
    }

    /**
     * Divide by another root (multiply by its inverse).
     * @throws {MathError} if the divisor is zero, or the roots are incompatible
     *   for multiplication.
     */
    divide(value: InputValue<Root>): this {
        return this.multiply(new Root(value).inverse())
    }

    get factor(): Fraction {
        return this.#factor
    }

    /** @throws {InvalidArgumentError} if value is an invalid (NaN) fraction. */
    set factor(value: Fraction) {
        if (value.isNaN()) {
            throw new InvalidArgumentError("The factor cannot be an invalid (NaN) fraction.")
        }
        this.#factor = value
    }

    /**
     * Explicit builder: index, radical and optional factor (defaults to 1).
     * @throws {InvalidArgumentError} if index is not a strictly positive integer.
     * @throws {ParseError} if radical or factor is an invalid (NaN) primitive.
     */
    from(index: number, radical: InputValue<Fraction>, factor?: InputValue<Fraction>): this {
        // set the index (validates: strictly positive integer)
        this.index = index

        // set the radical; reject an invalid (NaN) primitive at Root's boundary (A6).
        const rad = new Fraction(radical)
        if (rad.isNaN()) {
            throw new ParseError(`Cannot build a root from an invalid radical: "${radical}"`)
        }
        this.radical = rad

        // set the factor if provided; 0 is a valid factor, only `undefined` means omitted.
        if (factor === undefined) {
            this.factor = new Fraction().one()
        } else {
            const f = new Fraction(factor)
            if (f.isNaN()) {
                throw new ParseError(`Cannot build a root from an invalid factor: "${factor}"`)
            }
            this.factor = f
        }

        return this
    }

    /**
     * convert to root(index)(radical), without factor
     */
    group(): this {
        this.radical.multiply(this.factor.pow(this.index))
        this.factor.one()

        return this
    }

    get index(): number {
        return this.#index
    }

    /** @throws {InvalidArgumentError} if value is not a strictly positive integer. */
    set index(value: number) {
        if (!Number.isSafeInteger(value) || value <= 0) {
            throw new InvalidArgumentError("Index must be a strictly positive integer.")
        }
        this.#index = value
    }

    /** The index as a fractional exponent: 1 / index (e.g. index 3 → 1/3). */
    get indexAsPow(): Fraction {
        return new Fraction(this.index).inverse()
    }

    /**
     * Multiplicative inverse (1 / this): inverse both factor and radical.
     * @throws {MathError} if the root is zero (0 has no inverse).
     */
    inverse(): this {
        if (this.isZero()) {
            throw new MathError("Cannot invert a zero root.")
        }
        this.factor.inverse()
        this.radical.inverse()
        return this
    }

    isEqual(root: Root): boolean {
        if (this.isZero() && root.isZero()) {
            return true
        }

        // Even roots of a negative radical are not real; they compare to nothing.
        if (!this.#isReal() || !root.#isReal()) {
            return false
        }

        if (this.#valueSign() !== root.#valueSign()) {
            return false
        }

        // Compare |value| exactly by raising to a common multiple L of both
        // indices: (|f| * |radical|^(1/i))^L = |f|^L * |radical|^(L/i), an exact
        // Fraction (no floating point). The radical sign is handled above.
        const L = Numeric.lcm(this.index, root.index)

        const a = this.factor.clone().abs().pow(L)
            .multiply(this.radical.clone().abs().pow(L / this.index))
        const b = root.factor.clone().abs().pow(L)
            .multiply(root.radical.clone().abs().pow(L / root.index))

        return a.isEqual(b)
    }

    #isReal(): boolean {
        return !(this.radical.isNegative() && this.index % 2 === 0)
    }

    #valueSign(): 1 | -1 {
        const radicalSign = this.index % 2 === 1 ? this.radical.sign() : 1
        return (this.factor.sign() * radicalSign) as 1 | -1
    }

    isOne(): boolean {
        return this.factor.isOne() && this.radical.isOne()
    }

    isRational(): boolean {
        const reduced = this.clone().reduce()

        if (reduced.radical.isOne()) return reduced.factor.exact

        if (reduced.index === 1) return reduced.factor.exact && reduced.radical.exact

        return false
    }

    isZero(): boolean {
        return this.factor.isZero() || this.radical.isZero()
    }

    /**
     * Multiply by another root. Computed on a clone and committed on success
     * (atomicity).
     * @throws {MathError} unless the two roots share their radical or their index.
     */
    multiply(value: InputValue<Root>): this {
        // Compute on a clone and commit only on success, so a failed multiply
        // leaves the receiver untouched (same atomic discipline as add).
        const a = this.clone()
        const rt = new Root(value)

        if (a.index !== rt.index && !a.radical.isEqual(rt.radical)) {
            throw new MathError('Multiply can only be done if radical or index as equals.')
        }

        a.factor.multiply(rt.factor)

        if (a.index === rt.index) {
            a.radical.multiply(rt.radical)
        } else {
            // same radical, different index: combine the fractional exponents.
            const F = a.indexAsPow.add(rt.indexAsPow).reduce()
            a.index = F.denominator
            a.radical = a.radical.pow(F.numerator)
        }

        return this.parse(a)
    }

    one(): this {
        this.radical.one()
        this.factor.one()

        return this
    }

    opposite(): this {
        this.factor.opposite()
        return this
    }

    /**
     * Raise the root to a power. Computed on a clone and committed only on
     * success, so a rejected pow leaves the receiver intact (atomicity).
     * @throws {MathError} (via Fraction.pow) for a fractional power of a negative
     *   factor or radical.
     */
    pow(value: number): this {
        const a = this.clone()

        a.factor.pow(value)

        const g = Numeric.gcd(a.index, value)
        a.index = a.index / g
        a.radical.pow(value / g)

        return this.parse(a)
    }

    get radical(): Fraction {
        return this.#radical
    }

    /** @throws {InvalidArgumentError} if value is an invalid (NaN) fraction. */
    set radical(value: Fraction) {
        if (value.isNaN()) {
            throw new InvalidArgumentError("The radical cannot be an invalid (NaN) fraction.")
        }
        this.#radical = value
    }

    reduce(): this {
        // 1. extract roots
        // 2. avoid roots at denominator.

        // Remove the root from the denominator:
        // √[n]{num/den} = √[n]{num · den^(n-1)} / den
        if (this.radical.hasFractionalPart()) {
            const num = this.radical.numerator
            const den = this.radical.denominator

            this.radical = new Fraction(num * den ** (this.index - 1))
            this.factor.divide(den)
        }

        // Extract the greatest root from.
        const greatest = Numeric.greatestPower(this.radical.value, this.index)

        this.factor.multiply(Numeric.nthRoot(greatest, this.index))
        this.radical.divide(greatest)

        return this
    }

    /**
     * Take the value-th root of this root (e.g. sqrt of sqrt). Computed on a
     * clone and committed only on success (atomicity).
     * @throws {InvalidArgumentError} if value is not a strictly positive integer.
     */
    root(value: number): this {
        if (!Number.isSafeInteger(value) || value <= 0) {
            throw new InvalidArgumentError("The root degree must be a strictly positive integer.")
        }

        const a = this.clone()
        a.group()
        a.index = a.index * value

        return this.parse(a)
    }

    sqrt(): this {
        return this.root(2)
    }

    /**
     * Subtract another root (see {@link add} for the shared-radical requirement).
     * @throws {MathError} if the roots do not share the same index and radical.
     */
    subtract(value: InputValue<Root>): this {
        return this.#addSub(value, true)
    }

    // Shared, atomic add/subtract: reduce both operands to a common radical,
    // then combine the factors. subtract no longer routes through
    // add(opposite()), so the error message names both operations instead of
    // leaking "Add". A failed op leaves the receiver untouched (clones + parse).
    #addSub(value: InputValue<Root>, isSubtract: boolean): this {
        const a = this.clone().reduce()
        const b = new Root(value).reduce()

        if (a.index !== b.index || !a.radical.isEqual(b.radical)) {
            throw new MathError("Roots must share the same index and radical to be added or subtracted")
        }

        if (isSubtract) {
            a.factor.subtract(b.factor)
        } else {
            a.factor.add(b.factor)
        }

        return this.parse(a)
    }

    /**
     * Numeric value of the root. Returns NaN for an even root of a negative
     * radical (not real); an odd root of a negative is real and negative.
     */
    get value(): number {
        const radical = this.radical.value

        if (radical < 0) {
            // Even root of a negative is not real.
            if (this.index % 2 === 0) {
                return NaN
            }
            // Odd root of a negative is real and negative.
            return Numeric.numberCorrection(this.factor.value * -Math.pow(-radical, 1 / this.index))
        }

        return Numeric.numberCorrection(this.factor.value * Math.pow(radical, 1 / this.index))
    }

    /** Display option (chainable, returns this): force a leading '+' on a positive factor. */
    get withSign(): this {
        this.#withSign = true
        return this
    }

    /** Display option (chainable, returns this): remove the forced leading '+'. */
    get withoutSign(): this {
        this.#withSign = false
        return this
    }

    zero(): this {
        this.radical.zero()
        this.factor.zero()
        return this
    }

    #makeDisplayLine(a: number, b: number, wrap: boolean): string | null {
        const rad = this.#index === 2 ? `sqrt` : `root(${this.#index})`
        return this.#makeLine(a, b, {radical: v => `${rad}(${v})`, separator: '', wrap})
    }

    #makeTeXLine(a: number, b: number): string | null {
        const rad = this.#index === 2 ? `\\sqrt` : `\\sqrt[ ${this.#index} ]`
        return this.#makeLine(a, b, {radical: v => `${rad}{ ${v} }`, separator: ' '})
    }

    // Shared skeleton for both display and TeX lines: applies the factor rule,
    // drops empty parts, optionally wraps a two-part result and joins. The
    // caller supplies the radical formatting and separator, so this core stays
    // agnostic of the output format.
    #makeLine(a: number, b: number, options: {
        radical: (radicand: number) => string
        separator: string
        wrap?: boolean
    }): string | null {
        const factorPart = (a === 1 || a === 0) ? null : a === -1 ? '-' : a.toString()
        const radicalPart = (b !== 1 && b !== 0) ? options.radical(b) : null

        const formatted: string[] = [factorPart, radicalPart].filter(x => x !== null)

        if (formatted.length === 0) return null

        if (options.wrap && formatted.length === 2) return `(${formatted.join(options.separator)})`

        return formatted.join(options.separator)
    }

    #parse_root(value: string): this {
        // Mirrors #parse_sqrt for root(n): root(n) binds the immediately following
        // integer; a fractional radical must be parenthesised. Leading N or N/D and
        // a trailing /D are ordinary factor arithmetic (operator precedence).

        // Round-trip of display's fractional output: (N root(n)(R))/D
        const wrapped = /^\((.+)\)\/(\d+)$/.exec(value)
        if (wrapped) {
            this.#parse_root(wrapped[1])
            this.factor.divide(+wrapped[2])
            return this
        }

        const re = /^([+-]?\d*(?:\/\d+)?)root\((\d+)\)(?:\((-?\d+(?:\/\d+)?)\)|(\d+))(?:\/(\d+))?$/
        const match = re.exec(value)
        if (!match) throw new ParseError(`Invalid root format: "${value}"`)

        const rawFactor = match[1]
        const index = match[2]
        const radicalParen = match.at(3)
        const radicalBare = match.at(4)
        const denominator = match.at(5)

        this.index = +index
        this.radical = new Fraction(radicalParen ?? radicalBare ?? '')

        let factor: Fraction
        if (rawFactor === '' || rawFactor === '+' || rawFactor === '-') {
            factor = new Fraction(rawFactor === '-' ? -1 : 1)
        } else if (/^[+-]?\d+(?:\/\d+)?$/.test(rawFactor)) {
            factor = new Fraction(rawFactor)
        } else {
            throw new ParseError(`Invalid root format: "${value}"`)
        }

        if (denominator !== undefined) {
            factor.divide(+denominator)
        }

        this.factor = factor

        return this
    }

    #parse_sqrt(value: string): this {
        // sqrt binds the immediately following integer; a fractional radical must
        // be parenthesised. Leading N or N/D and a trailing /D are ordinary factor
        // arithmetic (operator precedence): 12sqrt2/7 == 12/7sqrt(2) == (12/7)√2.

        // Round-trip of display's fractional output: (Nsqrt(R))/D
        const wrapped = /^\((.+)\)\/(\d+)$/.exec(value)
        if (wrapped) {
            this.#parse_sqrt(wrapped[1])
            this.factor.divide(+wrapped[2])
            return this
        }

        const re = /^([+-]?\d*(?:\/\d+)?)sqrt(?:\((-?\d+(?:\/\d+)?)\)|(\d+))(?:\/(\d+))?$/
        const match = re.exec(value)
        if (!match) throw new ParseError(`Invalid sqrt format: "${value}"`)

        // Alternation / optional groups are undefined at runtime; `.at()` is typed
        // `string | undefined`, unlike indexed access which TS types as `string`.
        const rawFactor = match[1]
        const radicalParen = match.at(2)
        const radicalBare = match.at(3)
        const denominator = match.at(4)

        this.index = 2
        this.radical = new Fraction(radicalParen ?? radicalBare ?? '')

        let factor: Fraction
        if (rawFactor === '' || rawFactor === '+' || rawFactor === '-') {
            factor = new Fraction(rawFactor === '-' ? -1 : 1)
        } else if (/^[+-]?\d+(?:\/\d+)?$/.test(rawFactor)) {
            factor = new Fraction(rawFactor)
        } else {
            throw new ParseError(`Invalid sqrt format: "${value}"`)
        }

        if (denominator !== undefined) {
            factor.divide(+denominator)
        }

        this.factor = factor

        return this
    }
}