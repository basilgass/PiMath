/**
 * Polynom module contains everything necessary to handle polynoms.*
 */
import {ShutingYard, ShutingyardType, type Token} from "piexpression"
import {InvalidArgumentError, MathError, ParseError} from "../errors"
import type {
    IAlgebra,
    IAnalyse,
    IEvaluable,
    IExpression,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    LiteralType,
    TableOfSignsData,
    TableOfSignsValues
} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Numeric} from '../numeric'
import {EquationSolver} from './equationSolver'
import {Monom} from './monom'
import {replace_in_array} from "../helpers"
import {operation_pow} from "./operations"
import {Solution} from "../analyze/solution"


export type PolynomParsingType = InputValue<Polynom> | Monom

export interface IEuclidean {
    quotient: Polynom,
    reminder: Polynom
}

/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 * ```
 * let P = new Polynom('3x-4')
 * ```
 */
export class Polynom implements IPiMathObject<Polynom>,
    IExpression<Polynom>,
    IAnalyse<Polynom>,
    IAlgebra, IEvaluable {

    #defaultVariable = 'x'
    #factors: Polynom[]
    #monoms: Monom[]
    #roots: Solution[]
    #rootsCache = false

    constructor(value: InputValue<Fraction>)
    constructor(value: string)
    constructor(value: Monom)
    constructor(value: Polynom)
    constructor(...values: InputValue<Fraction>[])
    constructor(...values: InputAlgebra<Polynom>[])
    constructor(polynomString?: InputAlgebra<Polynom>, ...values: InputAlgebra<Fraction>[]) {
        this.#monoms = []
        this.#factors = []
        this.#roots = []

        if (polynomString !== undefined) {
            this.parse(polynomString, ...values)
        }
        return this
    }


    /**
     * Route an input to the matching `from***` builder. This method only
     * dispatches on the input's type/format; it never inlines construction.
     * @throws {ParseError} when the input matches no known form.
     */
    parse(inputStr: PolynomParsingType, ...values: InputAlgebra<Monom>[]): this {
        this.#monoms = []
        this.#factors = []
        this.#invalidateCache()

        if (inputStr instanceof Polynom) {
            return this.copy(inputStr)
        }
        if (inputStr instanceof Monom) {
            return this.fromMonoms(inputStr, ...values as InputAlgebra<Fraction>[])
        }
        if (inputStr instanceof Fraction || typeof inputStr === 'number') {
            return values.length === 0
                ? this.fromConstant(inputStr)
                : this.fromCoefficients(inputStr, ...values as InputValue<Fraction>[])
        }
        if (typeof inputStr === 'string') {
            if (values.length === 0) {
                return this.fromString(inputStr)
            }
            return inputStr.length === 1
                ? this.setVariable(inputStr).fromCoefficients(...values as InputValue<Fraction>[])
                : this.fromLinear(inputStr, ...values as InputValue<Fraction>[])
        }

        throw new ParseError(`Cannot parse "${String(inputStr)}" as a Polynom`)
    }

    /**
     * Copy the mathematical state (monoms and default variable) of another
     * polynom into this one. Display state is not transferred — see {@link clone}.
     */
    copy(value: Polynom): this {
        this.#defaultVariable = value.#defaultVariable
        this.#monoms = value.monoms.map(m => m.clone())
        this.#invalidateCache()
        return this
    }

    clone(): Polynom {
        const P = new Polynom()
        const M: Monom[] = []
        P.#defaultVariable = this.#defaultVariable

        for (const m of this.#monoms) {
            M.push(m.clone())
        }

        P.monoms = M

        return P
    }

    get tex(): string {
        return this.#genDisplay('tex')
    }

    get display(): string {
        return this.#genDisplay()
    }

    static xMultiply(...polynoms: InputValue<Polynom>[]): Polynom {
        const result = new Polynom().one()

        polynoms.forEach(P => {
            result.multiply(P)
        })

        return result
    }

    add(...values: InputAlgebra<Polynom>[]): this {
        // Build every new monom first: a malformed value throws here, before any
        // mutation of the receiver, so a failure leaves the polynom unchanged.
        const monoms: Monom[] = []
        for (const value of values) {
            if (value instanceof Polynom) {
                monoms.push(...value.monoms.map(m => m.clone()))
            } else if (value instanceof Monom) {
                monoms.push(value.clone())
            } else if (typeof value === "number" && Number.isSafeInteger(value)) {
                monoms.push(new Monom(value.toString()))
            } else {
                monoms.push(new Monom(value))
            }
        }

        this.#monoms = this.#monoms.concat(monoms)
        return this.reduce()
    }

    commonMonom(): Monom {
        const M = new Monom().one()
        const numerator: number = this.gcdNumerator()
        const denominator: number = this.gcdDenominator()

        M.coefficient = new Fraction(numerator, denominator)
        for (const L of this.variables) {
            // Initialize the exponent with the max degree
            M.setExponent(L, this.degree(L))
            for (const m of this.#monoms) {
                M.setExponent(L, Fraction.min(m.degree(L), M.degree(L)))
                if (M.degree(L).isZero()) {
                    break
                }

            }
        }
        return M
    }

    degree(variable?: string): Fraction {
        let d: Fraction = new Fraction().zero()
        for (const m of this.#monoms) {
            d = Fraction.max(m.degree(variable).value, d)
        }

        return d
    }

    derivative(variable?: string): Polynom {
        const dP = new Polynom()

        for (const m of this.#monoms) {
            dP.add(m.derivative(variable))
        }

        return dP.reduce()
    }

    /**
     * Divide in place. Polynom division is only defined when it is exact.
     * @throws {MathError} when the divisor leaves a non-zero remainder, or when
     * the value cannot be interpreted as a divisor. The receiver is unchanged.
     */
    divide(...values: InputAlgebra<Polynom>[]): this {
        if (values.length === 1) {
            return this.#divideOne(values[0])
        }

        // Divide successively by each value on a clone; commit only on success.
        const clone = this.clone()
        for (const value of values) {
            clone.#divideOne(value)
        }
        return this.copy(clone)
    }

    #divideOne(value: InputAlgebra<Polynom>): this {
        if (value instanceof Fraction) {
            return this.#divideByFraction(value)
        } else if (typeof value === 'number' && Number.isSafeInteger(value)) {
            return this.#divideByInteger(value)
        } else if (value instanceof Monom) {
            return this.#divideOne(new Polynom(value))
        } else if (value instanceof Polynom) {
            if (value.monoms.length === 1 && value.variables.length === 0) {
                return this.#divideByFraction(value.monoms[0].coefficient)
            }

            const {quotient, reminder} = this.euclidean(value)
            if (reminder.isZero()) {
                this.#monoms = quotient.monoms
                this.#invalidateCache()
                return this
            }

            throw new MathError(`Cannot divide "${this.display}" by "${value.display}": non-zero remainder "${reminder.display}"`)
        } else if (typeof value === 'string') {
            return this.#divideOne(new Polynom(value))
        }

        throw new MathError(`Cannot divide "${this.display}" by "${String(value)}"`)
    }

    empty(): this {
        this.#monoms = []
        this.#invalidateCache()
        return this
    }

    /**
     * Euclidean division of this polynom by `P`.
     * @returns the quotient and the remainder.
     * @throws {MathError} when either polynom has a non-integer degree.
     */
    euclidean(P: Polynom): IEuclidean {
        const variable: string | undefined = P.variables[0]
        const quotient: Polynom = new Polynom().zero()
        const reminder: Polynom = this.clone().reorder(variable)

        // There is no variable - means it's a number
        if (P.variables.length === 0) {
            const q = this.clone().divide(P)

            return {
                quotient: q.reduce(),
                reminder: new Polynom().zero()
            }
        }

        if (!this.degree(variable).isNatural() || !P.degree(variable).isNatural()) {
            throw new MathError('Euclidean division requires integer degrees')
        }

        // Get at least a variable
        const maxMP: Monom = P.monomByDegree(undefined, variable)
        const degreeP: Fraction = P.degree(variable)

        let newM: Monom

        // Make the Euclidean division of the two polynoms.
        let MaxIteration = this.degree(variable).value - degreeP.value + 1

        while (reminder.degree(variable).isGeq(degreeP) && MaxIteration > 0) {
            MaxIteration--

            // Get the greatest monom divided by the max monom of the divider
            newM = reminder.monomByDegree(undefined, variable).clone().divide(maxMP)

            if (newM.isZero()) {
                continue
            }

            // Get the new quotient and reminder.
            quotient.add(newM)
            reminder.subtract(P.clone().multiply(newM)).reduce()

            // Check if the reminder is zero.
            if (newM.degree(variable).isZero()) {
                break
            }
        }

        quotient.reduce()
        reminder.reduce()
        return {quotient, reminder}
    }

    evaluate(values: LiteralType<Fraction | number> | InputValue<Fraction>, asNumeric: true): number
    evaluate(values: LiteralType<Fraction | number> | InputValue<Fraction>, asNumeric?: false): Fraction
    evaluate(values: LiteralType<Fraction | number> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number
    evaluate(values: LiteralType<Fraction | number> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number {
        // Numeric accumulation: a literal `true` makes each monom return a number.
        if (asNumeric === true) {
            let r = 0
            this.#monoms.forEach(monom => {
                r += monom.evaluate(values, true)
            })
            return r
        }

        // Exact accumulation as a Fraction.
        const r = new Fraction().zero()
        this.#monoms.forEach(monom => {
            r.add(monom.evaluate(values, false))
        })
        return r
    }

    // -------------------------------------
    /**
     * Factorize a polynom with respect to a single variable and store the best
     * results in factors. The variable is resolved by {@link #resolveVariable}
     * (explicit `variable` → the sole variable if single-variable → default
     * variable). Multi-variable factorization (treating other variables as
     * symbolic constants) is not supported — the numeric solver cannot represent
     * roots that depend on other variables.
     */
    factorize(variable?: string): Polynom[] {
        this.#factors = []

        // There is only one monom - it's already considered as factor.
        if (this.monoms.length === 1) return [this.clone()]

        const L = this.#resolveVariable(variable)
        let P = this.clone().reorder(L)

        // Extract the common monom
        // 2x^3+6x^2 => 2x^2
        const M = P.commonMonom()

        // If the polynom starts with a negative monom, factorize it.
        if (P.monomByDegree().coefficient.isStrictlyNegative()) M.opposite()

        if (!M.isOne()) {
            this.#factors.push(new Polynom(M))
            P = P.euclidean(this.#factors[0]).quotient
        }

        const solutions = new EquationSolver(P, undefined, L).solve()

        if (solutions.length === 0) {
            if (this.#factors.length === 0) {
                // No common monom was extracted: the whole polynomial is irreducible
                this.#factors = [this.clone()]
            } else {
                // Common monom was extracted: P is the irreducible remaining part
                this.#factors.push(P)
            }
            return this.#factors
        }

        solutions.forEach(sol => {
            if (sol.exact && sol.root.isZero()) {
                for (let i = 0; i < sol.count; i++) {
                    if (sol.fraction.hasFractionalPart()) {
                        this.#factors.push(new Polynom().setVariable(L).fromCoefficients(sol.fraction.denominator, -sol.fraction.numerator))
                    } else {
                        this.#factors.push(new Polynom().setVariable(L).fromCoefficients(1, sol.fraction.clone().opposite()))
                    }
                }
            }
        })

        // Check if we have all factors.
        const fDegrees = this.#factors
            .map(f => f.degree().value)
            .reduce((a, b) => a + b, 0)

        if (fDegrees < this.degree().value) {
            // missing polynom.
            const fPolynom = Polynom.xMultiply(...this.#factors)
            this.#factors.push(this.clone().divide(fPolynom))
        }

        return this.#factors
    }

    get factors(): Polynom[] {
        if (this.#factors.length === 0 && !this.isZero()) {
            return this.factorize()
        }

        return this.#factors
    }

    fromCoefficients(...values: InputValue<Fraction>[]): this {

        this.#monoms = []
        const variable = this.#defaultVariable
        values.reverse().forEach((coeff, index) => {
            const monom = new Monom()
            monom.coefficient = new Fraction(coeff)
            monom.setExponent(variable, index)

            this.#monoms.push(monom)
        })

        this.#invalidateCache()
        return this.reorder()
    }

    fromConstant(value: InputValue<Fraction>): this {
        this.#monoms = [new Monom(new Fraction(value))]
        this.#invalidateCache()
        return this
    }

    fromLinear(variables: string, ...coefficients: InputValue<Fraction>[]): this {
        if (!/^[a-z]{2,}$/.test(variables)) {
            throw new ParseError(`fromLinear expects at least two lowercase variables, got "${variables}"`)
        }

        const variableList = variables.split('')
        const fractions = coefficients.map(x => new Fraction(x))
        if (fractions.length > variableList.length + 1) {
            throw new InvalidArgumentError(`Too many values: ${variableList.length} variables but ${fractions.length} values provided`)
        }

        this.empty()
        // 'xyz', a, b, c, d => ax + by + cz + d. A trailing (n+1)th coefficient
        // has no matching variable and becomes the constant term.
        fractions.forEach((F, i) => {
            const m = new Monom()
            m.coefficient = F.clone()
            m.literalStr = variableList[i] ?? ''
            this.add(m)
        })

        this.#invalidateCache()
        return this
    }

    fromMonoms(...monoms: InputAlgebra<Fraction>[]): this {
        this.#monoms = monoms.map(m => m instanceof Monom ? m.clone() : new Monom(m))
        this.#invalidateCache()
        return this
    }

    fromString(value: string): this {
        // A plain number is a constant polynom.
        if (value !== '' && !isNaN(Number(value))) {
            return this.fromConstant(Number(value))
        }
        // Otherwise, parse the expression with the shunting-yard algorithm.
        return this.#shutingYardToReducedPolynom(value)
    }

    gcdDenominator(): number {
        return Numeric.gcd(...this.getDenominators())
    }

    gcdNumerator(): number {
        return Numeric.gcd(...this.getNumerators())
    }

    /**
     * Coefficients from the highest degree down to the constant term (zeros
     * included). Assumes a single variable.
     * @throws {MathError} when the polynom has a non-integer degree.
     */
    getCoefficients(): Fraction[] {
        if (!this.degree().isNatural()) {
            throw new MathError('getCoefficients() requires a polynomial with integer degrees')
        }

        // Assume there is only one variable.
        const orderedPolynom = this.clone().reorder()

        const length = this.degree().value + 1
        const coeffs = Array.from({length}, () => new Fraction(0))

        orderedPolynom.monoms.forEach(monom => {
            const index = length - monom.degree().value - 1
            coeffs[index] = monom.coefficient.clone()
        })

        return coeffs
    }

    // Next functions are used for for commonMonom, which is used in the factorize method.
    getDenominators(): number[] {
        const denominators: number[] = []
        for (const m of this.#monoms) {
            denominators.push(m.coefficient.denominator)
        }

        return denominators
    }

    getNumerators(): number[] {
        const numerators: number[] = []
        for (const m of this.#monoms) {
            numerators.push(m.coefficient.numerator)
        }

        return numerators
    }

    hasVariable(variable: string): boolean {
        return this.variables.includes(variable)
    }

    integrate(a: InputValue<Fraction>, b: InputValue<Fraction>, variable?: string): Fraction {
        const l = this.#resolveVariable(variable)
        const primitive = this.primitive(l)

        const valuesA: LiteralType<Fraction> = {}
        const valuesB: LiteralType<Fraction> = {}

        valuesA[l] = new Fraction(a)
        valuesB[l] = new Fraction(b)

        return (primitive.evaluate(valuesB)).subtract(primitive.evaluate(valuesA))
    }

    /**
     * @throws {MathError} always — 1/P is not a polynom. The `IExpression`
     * contract returns `Polynom` (never null), so impossibility is a throw.
     */
    inverse(): this {
        throw new MathError('Cannot invert a polynom')
    }

    /**
     * Whether the given string is the fully developed (expanded) form of this
     * polynom.
     * @throws {ParseError} when `polynomString` is malformed.
     */
    isDeveloped(polynomString: string): boolean {
        // Start by removing the parenthesis after a "power"
        const pString = polynomString.replaceAll(/\^\(([-0-9/]+)\)/g, '$1')

        // There is at least one parenthesis - it is not developed.
        if (pString.includes('(') || pString.includes(')')) {
            return false
        }


        // Build the polynom. A malformed string throws (ParseError) instead of
        // being silently treated as "not developed".
        const P = new Polynom(polynomString)

        // Both polynom aren't the same (once developed and reduced => they cannot be equivalent)
        if (!this.isEqual(P)) {
            return false
        }


        // Check that everything is completely developed. Actually, there are no parentheses... so it is fully developed
        return true
    }

    isDivisibleBy(div: Polynom): boolean {
        // Quick evaluation.
        if (div.degree().isOne()) {
            const zero = div.roots[0]

            if (zero.exact) {
                return (this.evaluate(zero.fraction)).isZero()
            } else {
                return false
            }

        } else {
            const {reminder} = this.euclidean(div)
            return reminder.isZero()
        }
    }

    /**
     * @deprecated Use {@link isDivisibleBy} instead.
     */
    isDividableBy(div: Polynom): boolean {
        return this.isDivisibleBy(div)
    }

    isEqual(P: Polynom): boolean {
        return this.#compare(P, '=')
    }

    /**
     * Whether the polynom contains a cross-term monom (a single monom carrying
     * more than one variable, such as `xy`).
     */
    hasCrossTerm(): boolean {
        return this.#monoms.some(m => m.variables.length > 1)
    }

    isOne(): boolean {
        return this.#monoms.length === 1 && this.#monoms[0].coefficient.isOne() && this.degree().isZero()
    }

    isOppositeAt(P: Polynom): boolean {
        return this.#compare(P.clone().opposite(), '=')
    }

    isSameAs(P: Polynom): boolean {
        return this.#compare(P, 'same')
    }

    isZero(): boolean {
        return (this.#monoms.length === 1 && this.#monoms[0].coefficient.isZero()) || this.#monoms.length === 0
    }

    lcmDenominator(): number {
        return Numeric.lcm(...this.getDenominators())
    }

    lcmNumerator(): number {
        return Numeric.lcm(...this.getNumerators())
    }

    get length() {
        return this.#monoms.length
    }

    /**
     * Limit of the polynom as its variable approaches `value`. An infinite
     * `value` returns a signed infinite Fraction, determined by the leading term
     * (and the degree parity at -∞).
     */
    limitTo(value: InputValue<Fraction>, variable?: string): Fraction {
        const f = new Fraction(value)

        // Finite value: evaluate directly
        if (f.isFinite()) {
            const l = this.#resolveVariable(variable)
            return this.evaluate({[l]: f})
        }

        const M = this.monomByDegree(undefined, variable)
        const sign = M.coefficient.sign()
        const degree = M.degree(variable)

        // Constant polynomial
        if (degree.isZero()) {
            return M.coefficient.clone()
        }

        if (!degree.isStrictlyPositive()) {
            return new Fraction().zero()
        }

        // Limit at +∞: determined by the leading coefficient sign
        if (f.isPositive()) {
            return sign === 1
                ? new Fraction().infinite()
                : new Fraction().infinite().opposite()
        }

        // Limit at -∞: accounts for the parity of the degree
        const degreeIsEven = degree.value % 2 === 0
        const limitSign = degreeIsEven ? sign : -sign
        return limitSign === 1
            ? new Fraction().infinite()
            : new Fraction().infinite().opposite()
    }

    monomByDegree(degree?: Fraction | number, variable?: string): Monom {
        // return the highest degree monom.
        if (degree === undefined) {
            return this.monomByDegree(this.degree(variable), variable)
        }

        // Reduce the polynom.
        const M = this.clone().reduce()
        for (const m of M.#monoms) {
            if (m.degree(variable).isEqual(degree)) {
                return m.clone()
            }
        }

        // Nothing was found - return the null monom.
        return new Monom().zero()
    }

    // Used in LinearSystem.tex
    monomByVariable(variable: string): Monom {
        const M = this.clone().reduce()
        for (const m of M.#monoms) {
            if (m.hasVariable(variable)) {
                return m.clone()
            }
        }

        return new Monom().zero()
    }

    /**
     * @deprecated Use {@link monomByVariable} instead.
     */
    monomByLetter(variable: string): Monom {
        return this.monomByVariable(variable)
    }

    // ------------------------------------------
    /**
     * A detached copy of the monoms (each one cloned). Mutating the returned
     * array or its monoms does NOT affect the polynom — go through `add` /
     * `subtract` / `multiply` / the `monoms` setter to modify it.
     */
    get monoms(): Monom[] {
        return this.#monoms.map(m => m.clone())
    }

    set monoms(M: Monom[]) {
        this.#monoms = M
        this.#invalidateCache()
    }

    monomsByDegree(degree?: number | Fraction, variable?: string): Monom[] {
        // return the highest degree monom.
        if (degree === undefined) {
            return this.monomsByDegree(this.degree(variable), variable)
        }

        // Reduce the polynom.
        const Ms: Monom[] = []

        const M = this.clone().reduce()
        for (const m of M.#monoms) {
            if (m.degree(variable).isEqual(degree)) {
                Ms.push(m.clone())
            }
        }

        return Ms
    }

    /** @throws {MathError} when a value cannot be interpreted as a multiplier. */
    multiply(...values: InputAlgebra<Polynom>[]): this {
        if (values.length === 1) {
            return this.#multiplyOne(values[0])
        }

        // Multiply successively by each value on a clone; commit only on success.
        const clone = this.clone()
        for (const value of values) {
            clone.#multiplyOne(value)
        }
        return this.copy(clone)
    }

    #multiplyOne(value: InputAlgebra<Polynom>): this {
        if (value instanceof Polynom) {
            return this.#multiplyByPolynom(value)
        }

        if (value instanceof Fraction) {
            return this.#multiplyByFraction(value)
        }

        if (value instanceof Monom) {
            return this.#multiplyByMonom(value)
        }

        if (Number.isSafeInteger(value) && typeof value === 'number') {
            return this.#multiplyByInteger(value)
        }

        if (typeof value === 'string') {
            try {
                const k = new Fraction(value)
                return this.#multiplyByFraction(k)
            } catch (e) {
                throw new MathError('Cannot multiply by this value.', {cause: e})
            }
        }

        // Something went wrong...
        throw new MathError(`Cannot multiply by this value: ${value as unknown as string}`)
    }

    get numberOfVars(): number {
        return this.variables.length
    }

    one(): this {
        this.#monoms = []
        this.#monoms.push(new Monom().one())
        this.#invalidateCache()
        return this
    }

    // ------------------------------------------
    opposite(): this {
        this.#monoms = this.#monoms.map(m => m.opposite())
        this.#invalidateCache()
        return this
    }

    get plotFunction(): string {
        return this.#genDisplay('tex', false, false, true)
    }

    pow(nb: number): this {
        // operation_pow mutates the receiver in place (repeated multiply / one()).
        operation_pow(this as Polynom, nb)
        return this.reduce()
    }

    primitive(variable?: string): Polynom {
        const dP = new Polynom()

        for (const m of this.#monoms) {
            dP.add(m.primitive(variable))
        }

        return dP
    }

    reduce(): this {
        // Reduce the polynom

        // Group the monoms by similarity
        let i = 0
        while (i < this.#monoms.length) {
            for (let j = i + 1; j < this.#monoms.length; j++) {
                if (this.#monoms[i].isSameAs(this.#monoms[j])) {
                    this.#monoms[i].add(this.#monoms[j])
                    this.#monoms.splice(j, 1)
                    if (this.#monoms[i].isZero()) {
                        this.#monoms[i] = new Monom().zero()
                    }

                    j--
                }
            }

            i++
        }

        // Remove all null monoms
        this.#monoms = this.#monoms.filter((m) => {
            return !m.coefficient.isZero()
        })

        // Reduce all monoms coefficient.
        for (const m of this.#monoms) {
            m.coefficient.reduce()
        }

        if (this.length === 0) {
            return this.zero()
        }

        this.#invalidateCache()
        return this.reorder()
    }

    reorder(variable?: string, revert = false): this {
        variable ??= this.#defaultVariable
        const otherLetters = this.variables.filter(x => x !== variable)
        this.#monoms.sort(function (a, b) {
            const da = a.degree(variable).value
            const db = b.degree(variable).value

            // Values are different
            if (da !== db) {
                return revert ? da - db : db - da
            }

            // if values are equals, check other variables - it must be reverted in that case !
            if (otherLetters.length > 0) {
                for (const L of otherLetters) {
                    const da = a.degree(L).value
                    const db = b.degree(L).value

                    // Values are different
                    if (da !== db) {
                        return revert ? da - db : db - da
                    }
                }
            }


            return 0
        })

        return this
    }

    /**
     * Replace a variable by a polynom (in place).
     * @throws {MathError} when the replaced variable appears with a negative power.
     */
    replaceBy(variable: string, P: Polynom): this {
        let pow: Fraction
        const resultPolynom: Polynom = new Polynom().zero()

        for (const m of this.monoms) {
            if (!m.hasVariable(variable) || m.literal[variable].isZero()) {
                resultPolynom.add(m.clone())
            } else {
                // We have found a variable to replace.

                // Get the power.
                pow = m.literal[variable].clone()

                // Remove the variable from the monom
                m.removeVariable(variable)

                // Add the new monom to the result polynom
                if (pow.isStrictlyNegative()) {
                    throw new MathError(`Cannot replace variable "${variable}" with negative power in a Polynom`)
                }
                resultPolynom.add(P.clone().pow(pow.numerator).multiply(m))
            }
        }


        // Reduce the monoms
        this.#monoms = resultPolynom.reduce().monoms
        this.#invalidateCache()
        return this
    }

    // ------------------------------------------

    /** @throws {MathError} always — the n-th root of a polynom is not a polynom. */
    root(): this {
        throw new MathError('Cannot take the root from a polynom')
    }

    get roots(): Solution[] {
        if (!this.#rootsCache) {
            this.#roots = this.degree().isZero()
                ? []
                : new EquationSolver(this.clone()).solve()
            this.#rootsCache = true
        }
        return this.#roots
    }

    setVariable(value: string): this {
        if (!/^[a-z]$/.test(value)) {
            throw new InvalidArgumentError(`setVariable expects a single lowercase variable, got "${value}"`)
        }
        this.#defaultVariable = value

        return this
    }

    /** @throws {MathError} always — the square root of a polynom is not a polynom. */
    sqrt(): this {
        throw new MathError('Cannot take the square root from a polynom')
    }

    subtract(...values: InputAlgebra<Polynom>[]): this {
        // Same atomicity guarantee as add: every monom is built (and negated)
        // before the receiver is touched.
        const monoms: Monom[] = []
        for (const value of values) {
            if (value instanceof Polynom) {
                monoms.push(...value.monoms.map(m => m.clone().opposite()))
            } else if (value instanceof Monom) {
                monoms.push(value.clone().opposite())
            } else {
                monoms.push(new Monom(value).opposite())
            }
        }

        this.#monoms = this.#monoms.concat(monoms)
        return this.reduce()
    }

    tableOfSigns(): TableOfSignsData {
        // returns ['+-', 'd|t|z', '+-']...

        // Memoized roots of the polynom (see the roots getter).
        const roots: Solution[] = this.roots

        // Build the table os sign length and default values
        // The signs looks like: ['+', 't', '+', 't', '+', 't', '+']
        let signs: TableOfSignsValues[] = new Array(2 * roots.length + 1)
            .fill('')
            .map((_x, index) => {
                return index % 2 === 0 ? '' : 'z'
            })


        if (signs.length === 1) {
            // The polynom is a constant or has not roots
            const [a] = this.getCoefficients().map(x => x.value)
            signs = replace_in_array(signs, '', a > 0 ? '+' : '-')
        } else if (this.degree().isOne()) {
            // First degree: ax+b
            const [a] = this.getCoefficients().map(x => x.value)

            // Get the index of the zero.
            signs[0] = a > 0 ? '-' : '+'
            signs[1] = 'z'
            signs[2] = a > 0 ? '+' : '-'
        } else {
            const testingRoots = [
                roots[0].value - 1,
                ...roots.map((_root, index) => {
                    return index === roots.length - 1 ?
                        roots[index].value + 1 :
                        (roots[index].value + roots[index + 1].value) / 2
                })
            ]

            testingRoots.forEach((test, index) => {
                const sign = this.evaluate({[this.#resolveVariable()]: test}, true)
                signs[index * 2] = sign > 0 ? '+' : '-'
            })
        }

        return {roots, signs}
    }

    /** Numeric value of a constant polynom, or `undefined` when the degree is not zero. */
    get value(): number | undefined {
        if (this.degree().isZero()) {
            return this.monoms[0]?.coefficient.value ?? 0
        }

        return undefined
    }

    get variables(): string[] {
        return [...new Set(this.#monoms.flatMap(m => m.variables))].sort()
    }

    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    zero(): this {
        this.#monoms = []
        this.#monoms.push(new Monom().zero())
        this.#invalidateCache()
        return this
    }

    #compare(P: Polynom, sign?: string): boolean {
        sign ??= '='

        // Create clone version to reduce them without altering the original polynoms.
        const cP1 = this.clone().reduce().reorder()
        const cP2 = P.clone().reduce().reorder()

        switch (sign) {
            case '=':
                // They must have the isSame length and the isSame degree
                if (cP1.length !== cP2.length || !cP1.degree().isEqual(cP2.degree())) {
                    return false
                }

                // Check if the coefficients are the isSame.
                return cP1.monoms
                    .every((m1, index) => m1.isEqual(cP2.monoms[index]))

            case 'same':
                // They must have the same length and the same degree
                if (cP1.length !== cP2.length || !cP1.degree().isEqual(cP2.degree())) {
                    return false
                }

                return cP1.monoms
                    .every((m1, index) => m1.isSameAs(cP2.monoms[index]))

            default:
                return false
        }
    }

    #divideByFraction(F: Fraction): this {
        for (const m of this.#monoms) {
            m.coefficient.divide(F)
        }

        this.#invalidateCache()
        return this
    }

    #divideByInteger(nb: number): this {
        const nbF = new Fraction(nb)
        for (const m of this.#monoms) {
            m.coefficient.divide(nbF)
        }

        this.#invalidateCache()
        return this
    }

    #genDisplay(output: 'tex' | 'display' = 'display', forceSign?: boolean, wrapParentheses?: boolean, withAllMultiplicationSign?: boolean): string {
        let P = ''

        for (const k of this.#monoms) {
            if (k.coefficient.value === 0) {
                continue
            }

            // The monom to be displayed
            let m
            if (withAllMultiplicationSign) {
                m = k.plotFunction
            } else {
                m = (output === 'tex') ? k.tex : k.display
            }

            P += `${(k.coefficient.sign() === 1 && (P !== '' || forceSign === true)) ? '+' : ''}${m}`
        }

        if (wrapParentheses === true && this.length > 1) {
            if (output === 'tex') {
                P = `\\left( ${P} \\right)`
            } else {
                P = `(${P})`
            }
        }


        if (P === '') {
            P = '0'
        }

        return P
    }

    #invalidateCache(): void {
        this.#rootsCache = false
        this.#factors = []
    }

    #resolveVariable(variable?: string): string {
        if (variable !== undefined) {
            return variable
        }
        return this.variables.length === 1 ? this.variables[0] : this.#defaultVariable
    }

    #multiplyByFraction(F: Fraction): this {
        for (const m of this.#monoms) {
            m.coefficient.multiply(F)
        }

        return this.reduce()
    }

    #multiplyByInteger(nb: number): this {
        return this.#multiplyByFraction(new Fraction(nb))
    }

    #multiplyByMonom(M: Monom): this {
        for (const m of this.#monoms) {
            m.multiply(M)
        }

        return this.reduce()
    }

    #multiplyByPolynom(P: Polynom): this {
        const M: Monom[] = []
        for (const m1 of this.#monoms) {
            for (const m2 of P.monoms) {
                M.push(Monom.xMultiply(m1, m2))
            }
        }

        this.#monoms = M
        return this.reduce()
    }

    #shutingYardAddToken(stack: Polynom[], element: Token): void {
        switch (element.tokenType) {
            case ShutingyardType.COEFFICIENT:
                stack.push(new Polynom(element.token))
                break

            case ShutingyardType.VARIABLE:
                stack.push(new Polynom().add(new Monom(element.token)))
                break

            case ShutingyardType.CONSTANT:
                throw new ParseError('Unsupported CONSTANT token in Polynom parser')

            case ShutingyardType.OPERATION:
                if (stack.length >= 2) {
                    const b = stack.pop()
                    const a = stack.pop()

                    // Check if the polynoms are not undefined.
                    if (a === undefined || b === undefined) {
                        throw new ParseError('Unexpected undefined operand in Polynom parser stack')
                    }

                    if (element.token === '+') {
                        stack.push(a.add(b))
                    } else if (element.token === '-') {
                        stack.push(a.subtract(b))
                    } else if (element.token === '*') {
                        stack.push(a.multiply(b))
                    } else if (element.token === '/') {
                        if (b.degree().isStrictlyPositive()) {
                            throw new MathError('Cannot divide a Polynom by another Polynom of degree > 0')
                        } else {
                            // a.divide(b.monoms[0].coefficient)
                            stack.push(a.divide(b.monoms[0].coefficient))
                        }
                    } else if (element.token === '^') {
                        if (b.degree().isStrictlyPositive()) {
                            throw new MathError('Cannot elevate a polynom with another polynom !')
                        } else if (b.monoms[0].coefficient.isNatural())
                            // Natural (positive) power
                        {
                            stack.push(a.pow(b.monoms[0].coefficient.value))
                        } else {
                            // Only allow power if the previous polynom is only a monom, without coefficient.
                            if (a.#monoms.length === 1 && a.#monoms[0].coefficient.isOne()) {
                                for (const variable in a.#monoms[0].literal) {
                                    a.#monoms[0].literal[variable].multiply(b.#monoms[0].coefficient)
                                }

                                stack.push(a)
                            } else {
                                throw new MathError('Cannot raise a multi-monom Polynom to a fractional power')
                            }
                        }
                    }

                } else if (element.token === '-') {
                    const a = stack.pop()
                    if (a) {
                        stack.push(a.opposite())
                    }
                } else {
                    throw new ParseError("Error parsing the polynom")
                }


                break

            case ShutingyardType.MONOM:
                // Should never appear.
                throw new ParseError('Unexpected MONOM token in polynom parser')

            case ShutingyardType.FUNCTION:
                // Should never appear.
                throw new ParseError(`Unsupported function token "${element.token}" in polynom parser`)
        }


    }

    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    #shutingYardToReducedPolynom(inputStr: string): this {
        // Get the RPN array of the current expression
        let SY: ShutingYard
        try {
            SY = new ShutingYard().parse(inputStr)
        } catch (e) {
            throw new ParseError(`Cannot parse "${inputStr}" as a Polynom`, {cause: e})
        }
        const rpn: { token: string, tokenType: ShutingyardType }[] = SY.rpn

        // New version for reducing shuting yard.
        this.zero()

        const stack: Polynom[] = []

        // Loop through the each element of the RPN
        for (const element of rpn) {
            this.#shutingYardAddToken(stack, element)
        }


        if (stack.length === 1) {
            this.add(stack[0])
        }


        return this.reorder()
    }


}
