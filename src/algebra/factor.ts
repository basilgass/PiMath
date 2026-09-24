import type {
    IAlgebra,
    IEvaluable,
    IExpression,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    LiteralType,
    TableOfSignsData
} from "../pimath.interface"
import {Fraction} from "../coefficients/fraction"
import {Polynom} from "./polynom"
import {replace_in_array, splitIfOutsideParentheses, wrapParenthesis} from "../helpers"
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
export class Factor implements IPiMathObject<Factor>,
    IExpression<Factor>,
    IAlgebra, IEvaluable {
    #displayMode: FACTOR_DISPLAY
    #polynom: Polynom
    #power: Fraction
    #singleMode = false

    constructor(value?: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>) {

        if (value instanceof Factor) {
            this.#polynom = value.#polynom.clone()
            this.#power = value.power.clone()

            if (power !== undefined) {
                this.#power.multiply(new Fraction(power))
            }
        } else if (value !== undefined) {
            this.#polynom = new Polynom(value)
            this.#power = new Fraction(power ?? 1)
        } else {
            this.#polynom = new Polynom()
            this.#power = new Fraction(1)
        }

        this.#displayMode = FACTOR_DISPLAY.POWER

        return this
    }

    parse(value: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>): this {
        if (value instanceof Factor) {
            this.copy(value)
        } else if (typeof value === 'string') {
            this.fromString(value)
        } else {
            this.fromPolynom(value)
        }
        if (power !== undefined) this.#power.multiply(new Fraction(power))
        return this
    }

    fromString(value: string): this {
        return this.copy(Factor.factorsFromString(value)[0])
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

    get tex(): string {
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

        // If the power is negative, make it as a fraction.
        if (this.#displayMode === FACTOR_DISPLAY.ROOT && num < 0) {
            base = `\\frac{ 1 }{ ${base} }`
        }


        return base
    }

    get display(): string {
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

        // If the power is negative, make it as a fraction.
        if (this.#displayMode === FACTOR_DISPLAY.ROOT && num < 0) {
            base = `1/(${base})`
        }


        return base
    }

    /** @throws {MathError} always — adding two factors is not defined. */
    add(): this {
        throw new MathError("Adding two factors is not possible")
    }

    get asSingle(): this {
        this.#singleMode = true
        return this
    }

    degree(variable?: string): Fraction {
        return this.polynom.degree(variable).multiply(this.power)
    }

    /** @throws {UnsupportedOperationError} always — use {@link getDerivativeFactors} and compose via PolyFactor. */
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

    develop(): Polynom {
        if (this.power.isNatural()) {
            return this.polynom.clone().pow(this.power.value)
        }

        throw new MathError("The power must be a natural number")
    }

    /** @throws {MathError} when the two factors do not share the same base polynomial. */
    divide(value: InputAlgebra<Factor | Polynom>): this {
        return this.multiply(new Factor(value).inverse())
    }

    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric: true): number
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric?: false): Fraction
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric?: boolean): number | Fraction
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric?: boolean): number | Fraction {
        if (asNumeric) {
            return this.polynom.evaluate(values, true) ** this.power.value
        }


        return this.polynom.evaluate(values).pow(this.power)
    }

    fromPolynom(polynom: InputAlgebra<Polynom>): this {
        this.#polynom = new Polynom(polynom)
        this.#power = new Fraction(1)
        return this
    }

    hasVariable(variable: string): boolean {
        return this.polynom.hasVariable(variable)
    }

    inverse(): this {
        this.#power.opposite()
        return this
    }

    isEqual(value: Factor): boolean {
        // Must have the same polynom and the same reduce power

        return this.isSameAs(value) &&
            this.power.isEqual(value.power)
    }

    isOne(): boolean {
        return this.polynom.isOne() || this.power.isZero()
    }

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

    one(): this {
        this.#polynom.one()
        this.#power.one()
        return this
    }

    opposite(): this {
        throw new UnsupportedOperationError("Factor has no sign: use PolyFactor to represent the negation")
    }

    get polynom(): Polynom {
        return this.#polynom.clone()
    }

    set polynom(value: Polynom) {
        this.#polynom = value
    }

    pow(value: number | Fraction): this {
        this.#power.multiply(value)
        return this
    }

    get power(): Fraction {
        return this.#power.clone()
    }

    set power(value: InputValue<Fraction>) {
        this.#power = new Fraction(value)
    }

    primitive(): Factor {
        throw new UnsupportedOperationError("Factor.primitive() is not applicable in the general case — use PolyFactor")
    }

    reduce(): Factor {
        throw new UnsupportedOperationError("Factor.reduce() is not applicable — use PolyFactor.reduce()")
    }

    root(value: number): this {
        this.#power.divide(value)
        return this
    }

    sqrt(): this {
        return this.root(2)
    }

    /** @throws {MathError} always — subtracting two factors is not defined. */
    subtract(): this {
        throw new MathError("Subtracting two factors is not possible")
    }

    /**
     * Build the sign table for P(x)^n.
     *
     * Sign codes in the returned `signs` array:
     * - `'+'` / `'-'` — positive / negative
     * - `'z'` — zero (root of P)
     * - `'d'` — defence: undefined (asymptote) when n < 0
     * - `'h'` — hole: even-index radical of a negative, not real over ℝ
     */
    tableOfSigns(): TableOfSignsData {
        const pow = this.power.reduce()
        const tos = this.polynom.tableOfSigns()

        // The zero roots becomes defence (d) if the power is negative
        if (pow.isStrictlyNegative()) {
            tos.signs = replace_in_array(tos.signs, 'z', 'd')
        }

        // The - sign becomes
        // + (plus) if the power num is even and the power den is odd
        // i (invalid) if the power denominator is even
        if (pow.denominator % 2 === 0) {
            // it's an even roots : no negative values!
            tos.signs = replace_in_array(tos.signs, '-', 'h')
        } else if (pow.numerator % 2 === 0) {
            // it's an even power :  negative values becomes positive !
            tos.signs = replace_in_array(tos.signs, '-', '+')
        }


        return {roots: tos.roots, signs: tos.signs}
    }

    get variables(): string[] {
        return this.polynom.variables
    }

    get asPower(): this {
        this.#displayMode = FACTOR_DISPLAY.POWER
        return this
    }

    get asRoot(): this {
        this.#displayMode = FACTOR_DISPLAY.ROOT
        return this
    }

    zero(): this {
        this.#polynom.zero()
        this.#power.one()
        return this
    }

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
            return [new Factor(value, isNumerator ? 1 : -1)]
        }

        const sign = isNumerator ? 1 : -1
        const factors: Factor[] = []

        // Alternates: parenthesised factor with optional power | non-parenthesised sequence
        const regex =
            /\(([^)]+)\)(?:\^(-?[0-9]+(?:\/[0-9]+)?|\(-?[0-9]+(?:\/[0-9]+)?\)))?|([^(]+)/g

        for (const match of value.matchAll(regex)) {
            if (match[1] !== undefined) {
                // Case: (expr)^power
                const powStr = (match[2] ?? '1')
                    .replace(/[()]/g, '')

                factors.push(new Factor(
                    new Polynom(match[1]),
                    new Fraction(powStr).multiply(sign))
                )
            } else if (match[3]?.trim()) {
                // Case: monomial or constant outside parentheses (e.g. 3x^2, 3)
                factors.push(new Factor(new Polynom(match[3].trim()), new Fraction(sign)))
            }
        }

        return factors
    }
}

export enum FACTOR_DISPLAY {
    ROOT,
    POWER
}

