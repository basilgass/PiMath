import type {
    IDisplayDigits,
    IAlgebra,
    IEvaluable,
    IExpression,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    LiteralType,
} from "../pimath.interface"
import {Fraction} from "../coefficients/fraction"
import {Polynom} from "./polynom"
import {splitIfOutsideParentheses, wrapParenthesis} from "../helpers"
import {MathError, UnsupportedOperationError} from "../errors"

/**
 * Represents a single factor `P(x)^n` in a factored polynomial expression.
 *
 * `Factor` is designed to be used as a building block inside {@link PolyFactor},
 * not as a standalone expression type. Several `IExpression` operations
 * (`add`, `subtract`, `opposite`, `reduce`, `primitive`, `derivative`) are
 * structurally unsupported at this level and will throw
 * {@link UnsupportedOperationError}.
 */
export class Factor implements IPiMathObject<Factor>, IDisplayDigits,
    IExpression<Factor>,
    IAlgebra, IEvaluable {
    #displayMode: FACTOR_DISPLAY
    #polynom: Polynom
    #power: Fraction
    #singleMode = false

    constructor(value?: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>) {
        this.#polynom = new Polynom()
        this.#power = new Fraction(1)
        this.#displayMode = FACTOR_DISPLAY.POWER
        if (value !== undefined) this.parse(value, power)
    }

    /**
     * Replace the factor by a factor, a polynom or a string. When `power` is given, the power of the result is
     * multiplied by it.
     */
    parse(value: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>): this {
        if (value instanceof Factor) {
            this.copy(value)
        } else if (typeof value === 'string') {
            this.copy(Factor.fromString(value))
        } else {
            this.copy(Factor.fromPolynom(value))
        }
        if (power !== undefined) this.#power.multiply(new Fraction(power))
        return this
    }

    /**
     * Build a factor from a string such as `"(x+1)^2"`. Only the first factor of a product is kept: use
     * {@link factorsFromString} to get all of them.
     */
    static fromString(value: string): Factor {
        return Factor.factorsFromString(value)[0]
    }

    copy(value: Factor): this {
        this.#polynom = value.#polynom.clone()
        this.#power = value.#power.clone()
        return this
    }

    clone(): Factor {
        const result = new Factor(this)
        result.#displayMode = this.#displayMode
        result.#singleMode = this.#singleMode
        return result
    }

    /** @see IDisplayDigits.withDigits */
    withDigits(digits: number | null): this {
        this.#polynom.withDigits(digits)
        return this
    }

    get tex(): string {
        // A negative power is written as a fraction of the factor with the opposite (positive) power.
        if (this.#displayMode === FACTOR_DISPLAY.ROOT && this.#power.isNegative()) {
            return `\\frac{ 1 }{ ${this.#positiveCounterpart().tex} }`
        }

        const num = this.power.numerator
        const den = this.power.denominator

        let base: string
        let power: string

        if (this.#displayMode === FACTOR_DISPLAY.ROOT && den > 1) {
            base = `\\sqrt${den === 2 ? '' : `[ ${den} ]`}{ ${this.polynom.tex} }`
            power = num === 1 ? '' : `^{ ${num} }`
        } else {
            base = this.#singleMode && this.power.isOne() ? this.polynom.tex : wrapParenthesis(this.polynom.tex)
            power = (den === 1 && num === 1) ? '' : `^{ ${this.power.tex} }`
        }

        // Add the power if it's not 1 or -1
        base = `${base}${power}`


        return base
    }

    get display(): string {
        if (this.#displayMode === FACTOR_DISPLAY.ROOT && this.#power.isNegative()) {
            return `1/(${this.#positiveCounterpart().display})`
        }

        const num = this.power.numerator
        const den = this.power.denominator

        let base: string
        let power: string

        if (this.#displayMode === FACTOR_DISPLAY.ROOT && den > 1) {
            base = `${den === 2 ? 'sqrt' : `root(${den})`}(${this.polynom.display})`
            power = num === 1 ? '' : `^(${num})`
        } else {
            base = this.#singleMode && this.power.isOne() ? this.polynom.display : wrapParenthesis(this.polynom.display, false)
            power = (den === 1 && num === 1) ? '' : `^(${this.power.display})`
        }

        // Add the power if it's not 1 or -1
        base = `${base}${power}`


        return base
    }

    /** The same factor with the opposite power; a power of 1 needs no parentheses under the fraction bar. */
    #positiveCounterpart(): Factor {
        const positive = this.clone().inverse()
        return positive.power.isOne() ? positive.asSingle : positive
    }

    /**
     * Adding two factors is not defined.
     * @throws {MathError} always.
     */
    add(): this {
        throw new MathError("Adding two factors is not possible")
    }

    /**
     * Display option: do not wrap the polynom in parentheses when the power is 1. {@link PolyFactor} sets it
     * on a lone factor. Chainable, kept by {@link clone}.
     */
    get asSingle(): this {
        this.#singleMode = true
        return this
    }

    /**
     * Degree of the polynom multiplied by the power.
     */
    degree(variable?: string): Fraction {
        return this.polynom.degree(variable).multiply(this.power)
    }

    /**
     * Not available on a single factor: use {@link getDerivativeFactors} and compose through {@link PolyFactor}.
     * @throws {UnsupportedOperationError} always.
     */
    derivative(): this {
        throw new UnsupportedOperationError("Factor.derivative() is not supported — use getDerivativeFactors() and compose via PolyFactor")
    }

    /**
     * Chain-rule decomposition of `P(x)^n`: returns the factors whose product
     * equals `d/dx[P^n]`.
     *
     * - n = 0 → `[0]` (constant)
     * - n = 1 → `[P'(x)]`
     * - otherwise → `[n, P'(x), P(x)^(n−1)]`
     *
     * Intended for use by {@link PolyFactor.derivative}, not for standalone consumption.
     */
    getDerivativeFactors(): Factor[] {
        if (this.power.isZero()) {
            return [new Factor('0')]
        }

        if (this.power.isOne()) {
            return [new Factor(this.polynom.clone().derivative())]
        }

        return [
            new Factor(this.power.clone()),
            new Factor(this.polynom.clone().derivative()),
            new Factor(this.polynom.clone(), this.power.clone().subtract(1))
        ]
    }

    /**
     * Expand the factor into a polynom (`P^n` with `n` a natural number).
     * @throws {MathError} if the power is not a natural number.
     */
    develop(): Polynom {
        if (this.power.isNatural()) {
            return this.polynom.clone().pow(this.power.value)
        }

        throw new MathError("The power must be a natural number")
    }

    /**
     * Divide by a factor or a polynom: multiply by its inverse.
     * @throws {MathError} when the two factors do not share the same base polynomial.
     */
    divide(value: InputAlgebra<Factor | Polynom>): this {
        return this.multiply(new Factor(value).inverse())
    }

    /**
     * Value of the factor for given values of its variables: the polynom evaluated, then raised to the power.
     * @param values - a dictionary `{x: 2}`, or one value for a single-variable polynom.
     * @param asNumeric - `true` returns a `number`, otherwise the exact `Fraction`.
     */
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric: true): number
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric?: false): Fraction
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric?: boolean): number | Fraction
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric?: boolean): number | Fraction {
        if (asNumeric) {
            return this.polynom.evaluate(values, true) ** this.power.value
        }


        return this.polynom.evaluate(values).pow(this.power)
    }

    /**
     * Build a factor of power 1 from a polynom, or from anything a polynom accepts.
     */
    static fromPolynom(polynom: InputAlgebra<Polynom>): Factor {
        const f = new Factor()
        f.#polynom = new Polynom(polynom)
        f.#power = new Fraction(1)
        return f
    }

    /**
     * True when the base polynom contains the variable.
     */
    hasVariable(variable: string): boolean {
        return this.polynom.hasVariable(variable)
    }

    /**
     * Negate the power (`P^n` becomes `P^-n`).
     */
    inverse(): this {
        this.#power.opposite()
        return this
    }

    /**
     * True when both factors have the same base polynom and the same power.
     */
    isEqual(value: Factor): boolean {
        // Must have the same polynom and the same reduce power

        return this.isSameAs(value) &&
            this.power.isEqual(value.power)
    }

    /**
     * True when the base polynom is `1`, or the power is zero.
     */
    isOne(): boolean {
        return this.polynom.isOne() || this.power.isZero()
    }

    /**
     * True when the base polynom is the same; the power is ignored.
     */
    isSameAs(value: InputAlgebra<Factor | Polynom>) {
        let P: Polynom
        if (value instanceof Factor) {
            P = value.polynom
        } else if (value instanceof Polynom) {
            P = value
        } else {
            P = new Polynom(value)
        }


        return this.polynom.isEqual(P)
    }

    /**
     * True when the base polynom is zero.
     */
    isZero(): boolean {
        return this.polynom.isZero()
    }

    /**
     * Multiply by another factor or polynom. Succeeds only when both share the
     * same base polynomial; powers are added. Two single-monom factors with
     * integer power 1 are multiplied directly as polynomials.
     * @throws {MathError} when the base polynomials differ.
     */
    multiply(value: InputAlgebra<Factor | Polynom>): this {
        const F = new Factor(value)

        // Case if this and value are monoms of degree one.
        if(this.polynom.monoms.length===1 && this.power.isOne()
            &&
            F.polynom.monoms.length===1 && F.power.isOne()
        ){
            this.#polynom.multiply(F.polynom)
            return this
        }

        if (value instanceof Factor) {
            if (this.isSameAs(value)) {
                this.#power.add(value.power)
                return this
            }
        }


        if (this.isSameAs(F.polynom)) {
            this.#power.add(1)
            return this
        }

        throw new MathError("The two factors must be the same")
    }

    /**
     * Set the factor to `1`.
     */
    one(): this {
        this.#polynom.one()
        this.#power.one()
        return this
    }

    /**
     * A factor has no sign: use {@link PolyFactor}, which adds a factor `-1`.
     * @throws {UnsupportedOperationError} always.
     */
    opposite(): this {
        throw new UnsupportedOperationError("Factor has no sign: use PolyFactor to represent the negation")
    }

    /**
     * Base polynom. The getter returns a copy: modify the factor through its methods or the setter.
     */
    get polynom(): Polynom {
        return this.#polynom.clone()
    }

    set polynom(value: Polynom) {
        this.#polynom = value
    }

    /**
     * Multiply the power by `value`.
     */
    pow(value: number | Fraction): this {
        this.#power.multiply(value)
        return this
    }

    /**
     * Power of the factor, as a fraction (a copy). A negative power is a denominator in a {@link PolyFactor}.
     */
    get power(): Fraction {
        return this.#power.clone()
    }

    set power(value: InputValue<Fraction>) {
        this.#power = new Fraction(value)
    }

    /**
     * Not available on a single factor.
     * @throws {UnsupportedOperationError} always.
     */
    primitive(): Factor {
        throw new UnsupportedOperationError("Factor.primitive() is not applicable in the general case — use PolyFactor")
    }

    /**
     * Not available on a single factor: use {@link PolyFactor.reduce}.
     * @throws {UnsupportedOperationError} always.
     */
    reduce(): Factor {
        throw new UnsupportedOperationError("Factor.reduce() is not applicable — use PolyFactor.reduce()")
    }

    /**
     * Divide the power by `value` (the square root of `P^2` is `P^1`).
     */
    root(value: number): this {
        this.#power.divide(value)
        return this
    }

    /**
     * Square root: divide the power by 2.
     */
    sqrt(): this {
        return this.root(2)
    }

    /**
     * Subtracting two factors is not defined.
     * @throws {MathError} always.
     */
    subtract(): this {
        throw new MathError("Subtracting two factors is not possible")
    }

    /**
     * Variables of the base polynom, sorted.
     */
    get variables(): string[] {
        return this.polynom.variables
    }

    /**
     * Display option (default): a power is written `(P)^{n}`, a negative one with a negative exponent.
     * Chainable, kept by {@link clone}.
     */
    get asPower(): this {
        this.#displayMode = FACTOR_DISPLAY.POWER
        return this
    }

    /**
     * Display option: a fractional power is written as a radical (`sqrt(P)`) and a negative power as a fraction (`1/(P)`).
     * Chainable, kept by {@link clone}.
     */
    get asRoot(): this {
        this.#displayMode = FACTOR_DISPLAY.ROOT
        return this
    }

    /**
     * Set the factor to `0`.
     */
    zero(): this {
        this.#polynom.zero()
        this.#power.one()
        return this
    }

    /**
     * True when the string has no `+` or `-` outside the parentheses, so it reads as a product of factors.
     */
    static checkParseAsFactors(str: string): boolean {
        const splitPlus = splitIfOutsideParentheses(str, "+")
        if(splitPlus[0]==='') splitPlus.shift()
        if(splitPlus.length>1) return false

        const splitMinus = splitIfOutsideParentheses(str, "-")
        if(splitMinus[0]==='') splitMinus.shift()
        if(splitMinus.length>1) return false

        return true
    }

    /**
     * Parse a product string into an array of Factor instances.
     *
     * Supported format: parenthesised terms with optional powers and implicit
     * multiplication, e.g. `"(3x+2)^2*(x-1)"` or `"(x+1)(x-1)^(1/2)"`.
     * Non-parenthesised tokens (e.g. `"3x"`) are treated as a single factor
     * with implicit power ±1.
     *
     * @param isNumerator - when `false`, all parsed powers are negated (denominator use).
     */
    static factorsFromString(value: string, isNumerator = true): Factor[] {
        if (!Factor.checkParseAsFactors(value)) {
            const f = new Factor()
            f.#polynom = new Polynom(value)
            f.#power = new Fraction(isNumerator ? 1 : -1)
            return [f]
        }

        const sign = isNumerator ? 1 : -1
        const factors: Factor[] = []

        // Alternates: parenthesised factor with optional power | non-parenthesised sequence
        const regex =
            /\(([^)]+)\)(?:\^(-?[0-9]+(?:\/[0-9]+)?|\(-?[0-9]+(?:\/[0-9]+)?\)))?|([^(]+)/g

        for (const match of value.matchAll(regex)) {
            // Optional groups are undefined at runtime; `.at()` is typed `string | undefined`, unlike indexed access.
            const parenthesised = match.at(1)
            const bare = match.at(3)?.trim()

            if (parenthesised !== undefined) {
                // Case: (expr)^power
                const powStr = (match.at(2) ?? '1')
                    .replace(/[()]/g, '')

                factors.push(new Factor(
                    new Polynom(parenthesised),
                    new Fraction(powStr).multiply(sign))
                )
            } else if (bare) {
                // Case: monomial or constant outside parentheses (e.g. 3x^2, 3)
                factors.push(new Factor(new Polynom(bare), new Fraction(sign)))
            }
        }

        return factors
    }
}

export enum FACTOR_DISPLAY {
    ROOT,
    POWER
}

