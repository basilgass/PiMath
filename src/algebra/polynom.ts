/**
 * Polynom module contains everything necessary to handle polynoms.*
 */
import {ShutingYard, ShutingyardType, type Token} from "piexpression"
import {InvalidArgumentError, MathError, ParseError} from "../errors"
import type {
    IAlgebra,
    IAnalyse,
    IDisplayDigits,
    IEvaluable,
    IExpression,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    LiteralType, XY,
} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Numeric} from '../numeric'
import {EquationSolver} from './equationSolver'
import {Monom} from './monom'
import {Solution} from "../analyze/solution"


export type PolynomParsingType = InputValue<Polynom> | Monom

export interface IEuclidean {
    quotient: Polynom,
    reminder: Polynom
}

/** Convert a point to exact fractions, rejecting NaN and infinite coordinates. */
function toPoint({x, y}: XY<InputValue<Fraction>>): XY<Fraction> {
    const point = {x: new Fraction(x), y: new Fraction(y)}
    if (!point.x.isFinite() || !point.y.isFinite()) {
        throw new InvalidArgumentError('fromThreePoints expects finite coordinates')
    }
    return point
}

/** Divided difference of order 1: the slope of the line through `A` and `B`. */
function slope(A: XY<Fraction>, B: XY<Fraction>): Fraction {
    return B.y.clone().subtract(A.y).divide(B.x.clone().subtract(A.x))
}

/**
 * A polynomial in one or several variables: a list of {@link Monom}s kept reduced and sorted by decreasing
 * degree. Built from a string (`"x^2-5x+6"`, `"(x+1)^2"`), a number, a monom, or from coefficients
 * (`new Polynom("x", 1, -5, 6)`). A malformed string throws a `ParseError`.
 * Operations modify the polynom and return it; `clone()` keeps the original. A failing operation leaves it unchanged.
 * @example
 * new Polynom("x^2-5x+6").factorize().map(f => f.display) // [ "x-2", "x-3" ]
 */
export class Polynom implements IPiMathObject<Polynom>, IDisplayDigits,
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
        if (inputStr instanceof Polynom) return this.copy(inputStr)
        if (inputStr instanceof Monom) {
            return this.copy(Polynom.fromMonoms(inputStr, ...values as InputAlgebra<Fraction>[]))
        }
        if (inputStr instanceof Fraction || typeof inputStr === 'number') {
            return values.length === 0
                ? this.copy(Polynom.fromConstant(inputStr))
                : this.copy(Polynom.fromCoefficients(this.#defaultVariable, inputStr, ...values as InputValue<Fraction>[]))
        }
        if (typeof inputStr === 'string') {
            if (values.length === 0) return this.copy(Polynom.fromString(inputStr))
            return inputStr.length === 1
                ? this.copy(Polynom.fromCoefficients(inputStr, ...values as InputValue<Fraction>[]))
                : this.copy(Polynom.fromLinear(inputStr, ...values as InputValue<Fraction>[]))
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

    /** @see IDisplayDigits.withDigits */
    withDigits(digits: number | null): this {
        this.#monoms.forEach(m => m.withDigits(digits))
        return this
    }

    get tex(): string {
        return this.#genDisplay('tex')
    }

    get display(): string {
        return this.#genDisplay()
    }

    /**
     * Product of the given values, as a new polynom.
     */
    static xMultiply(...polynoms: InputValue<Polynom>[]): Polynom {
        const result = new Polynom().one()

        polynoms.forEach(P => {
            result.multiply(P)
        })

        return result
    }

    /**
     * Add polynoms, monoms, numbers or strings, then reduce. Modifies and returns the receiver.
     * A string is read as a polynom (`"2x+1"`).
     * Every operand is built before the receiver is touched: an invalid value throws and leaves it unchanged.
     * @throws {ParseError} if a string operand is malformed.
     * @throws {InvalidArgumentError} if an operand is `undefined`.
     */
    add(...values: InputAlgebra<Polynom>[]): this {
        const monoms = values.flatMap(value => Polynom.#toPolynom(value).monoms)

        this.#monoms = this.#monoms.concat(monoms)
        return this.reduce()
    }

    /**
     * Greatest monom dividing every term: gcd of the numerators over gcd of the denominators, and the lowest
     * exponent of each variable (`2x^3+6x^2` gives `2x^2`).
     */
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

    /**
     * Degree of the polynom as a fraction. Without `variable`, the highest total degree of a term; with one, the
     * highest exponent of that variable.
     */
    degree(variable?: string): Fraction {
        let d: Fraction = new Fraction(0)
        for (const m of this.#monoms) {
            d = Fraction.max(m.degree(variable).value, d)
        }

        return d
    }

    /**
     * Derivative with respect to `variable` (default `x`), as a new reduced polynom.
     */
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

    /**
     * Remove every monom. Unlike {@link zero}, which holds the monom `0`, the polynom then has no term at all.
     */
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

    /**
     * Value of the polynom for given values of its variables.
     * @param values - a dictionary `{x: 2, y: 3}`, or one value for a single-variable polynom.
     * @param asNumeric - `true` returns a `number`, otherwise the exact `Fraction`.
     * @throws {MathError} if a variable of the polynom has no value.
     * @example
     * new Polynom("x^2-5x+6").evaluate({x: 3}).display // "0"
     */
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
        const r = new Fraction(0)
        this.#monoms.forEach(monom => {
            r.add(monom.evaluate(values, false))
        })
        return r
    }

    // -------------------------------------
    /**
     * Factorize a polynom with respect to a single variable and store the best
     * results in factors. The variable is the explicit `variable`, else the sole
     * variable of a single-variable polynom, else the default variable. Multi-variable factorization (treating other variables as
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
                        this.#factors.push(Polynom.fromCoefficients(L, sol.fraction.denominator, -sol.fraction.numerator))
                    } else {
                        this.#factors.push(Polynom.fromCoefficients(L, 1, sol.fraction.clone().opposite()))
                    }
                }
            }
        })

        // What the factors found do not cover: a scalar (rational content, e.g. 1/2 in 1/2x^2-2)
        // and/or a polynom with no rational root.
        const found = Polynom.xMultiply(...this.#factors)
        const remaining = this.clone().divide(found)

        if (remaining.degree().isStrictlyPositive()) {
            this.#factors.push(remaining)
        } else if (!remaining.isOne()) {
            // Scalar first, like the common monom.
            this.#factors.unshift(remaining)
        }

        return this.#factors
    }

    /**
     * Factors of the polynom, computed by {@link factorize} on first access and kept until the polynom changes.
     * The zero polynom has none.
     */
    get factors(): Polynom[] {
        if (this.#factors.length === 0 && !this.isZero()) {
            return this.factorize()
        }

        return this.#factors
    }

    /**
     * Build a polynom from coefficients ordered highest→lowest degree.
     * The first argument is the variable (e.g. `'x'`, `'t'`).
     * @throws {InvalidArgumentError} when `variable` is not a single lowercase letter.
     */
    static fromCoefficients(variable: string, ...values: InputValue<Fraction>[]): Polynom {
        if (!/^[a-z]$/.test(variable)) {
            throw new InvalidArgumentError(`fromCoefficients expects a single lowercase letter, got "${variable}"`)
        }
        const p = new Polynom()
        p.#defaultVariable = variable
        ;[...values].reverse().forEach((coeff, index) => {
            const monom = new Monom()
            monom.coefficient = new Fraction(coeff)
            monom.setExponent(variable, index)
            p.#monoms.push(monom)
        })
        p.#invalidateCache()
        return p.reorder()
    }

    /**
     * Build a constant polynom.
     */
    static fromConstant(value: InputValue<Fraction>): Polynom {
        return Polynom.fromMonoms(new Fraction(value))
    }

    /**
     * Build a multivariate linear polynom: `'xyz', a, b, c, d` → `ax + by + cz + d`.
     * @throws {ParseError} when `variables` is not two or more lowercase letters.
     * @throws {InvalidArgumentError} when more coefficients than variables+1 are given.
     */
    static fromLinear(variables: string, ...coefficients: InputValue<Fraction>[]): Polynom {
        if (!/^[a-z]{2,}$/.test(variables)) {
            throw new ParseError(`fromLinear expects at least two lowercase variables, got "${variables}"`)
        }
        const variableList = variables.split('')
        const fractions = coefficients.map(x => new Fraction(x))
        if (fractions.length > variableList.length + 1) {
            throw new InvalidArgumentError(`Too many values: ${variableList.length} variables but ${fractions.length} values provided`)
        }
        const p = new Polynom()
        fractions.forEach((F, i) => {
            const m = new Monom()
            m.coefficient = F.clone()
            m.literalStr = variableList[i] ?? ''
            p.add(m)
        })
        p.#invalidateCache()
        return p
    }

    /**
     * Build a polynom from monoms, or from anything a monom accepts (numbers, strings, fractions).
     * The result is neither reduced nor sorted: call {@link reduce}.
     */
    static fromMonoms(...monoms: InputAlgebra<Fraction>[]): Polynom {
        const p = new Polynom()
        p.#monoms = monoms.map(m => m instanceof Monom ? m.clone() : new Monom(m))
        p.#invalidateCache()
        return p
    }

    /**
     * Build the polynom of degree at most 2 passing through three points, using Newton divided differences.
     * The result is exact (fractions). When the three points are aligned, the result is a line
     * (degree 1), or a constant when the three `y` are equal.
     *
     * @param point1 - First point `{x, y}`.
     * @param point2 - Second point `{x, y}`.
     * @param point3 - Third point `{x, y}`.
     * @param variable - Variable of the result, a single lowercase letter (default `'x'`).
     * @throws {InvalidArgumentError} when a coordinate is not finite, or `variable` is not a single lowercase letter.
     * @throws {MathError} when two points share the same `x` (no polynom is a function of that shape).
     * @example
     * Polynom.fromThreePoints({x: 1, y: 2}, {x: 2, y: 3}, {x: 4, y: 11}).display // "x^(2)-2x+3"
     */
    static fromThreePoints(
        point1: XY<InputValue<Fraction>>,
        point2: XY<InputValue<Fraction>>,
        point3: XY<InputValue<Fraction>>,
        variable = 'x',
    ): Polynom {
        const A = toPoint(point1)
        const B = toPoint(point2)
        const C = toPoint(point3)

        if (A.x.isEqual(B.x) || A.x.isEqual(C.x) || B.x.isEqual(C.x)) {
            throw new MathError('fromThreePoints needs three points with distinct x values')
        }

        // P(x) = y1 + d1 (x - x1) + a (x - x1)(x - x2), expanded into a x^2 + b x + c
        const d1 = slope(A, B)
        const d2 = slope(B, C)
        const a = d2.clone().subtract(d1).divide(C.x.clone().subtract(A.x))
        const b = d1.clone().subtract(a.clone().multiply(A.x.clone().add(B.x)))
        const c = A.y.clone().subtract(d1.clone().multiply(A.x)).add(a.clone().multiply(A.x).multiply(B.x))

        return Polynom.fromCoefficients(variable, a, b, c)
    }

    /**
     * Build a polynom from an expression: sums, products, integer powers, and division by a constant.
     * @throws {ParseError} if the string is malformed.
     * @throws {MathError} for a division by a polynom of degree 1 or more, or a fractional power of a sum.
     */
    static fromString(value: string): Polynom {
        if (value !== '' && !isNaN(Number(value))) return Polynom.fromConstant(Number(value))
        const p = new Polynom()
        p.#shutingYardToReducedPolynom(value)
        return p
    }

    /**
     * Greatest common divisor of the denominators of the coefficients.
     */
    gcdDenominator(): number {
        return Numeric.gcd(...this.getDenominators())
    }

    /**
     * Greatest common divisor of the numerators of the coefficients.
     */
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
    /**
     * Denominator of the coefficient of each monom, in the order of the monoms.
     */
    getDenominators(): number[] {
        const denominators: number[] = []
        for (const m of this.#monoms) {
            denominators.push(m.coefficient.denominator)
        }

        return denominators
    }

    /**
     * Numerator of the coefficient of each monom, in the order of the monoms.
     */
    getNumerators(): number[] {
        const numerators: number[] = []
        for (const m of this.#monoms) {
            numerators.push(m.coefficient.numerator)
        }

        return numerators
    }

    /**
     * True when the variable appears in a term with a non-zero exponent.
     */
    hasVariable(variable: string): boolean {
        return this.variables.includes(variable)
    }

    /**
     * Definite integral between `a` and `b`, as a fraction. The variable is resolved like in {@link limitTo}:
     * the one passed, else the only variable of the polynom, else the default variable.
     * @throws {MathError} if a term has a power of -1 of the variable.
     */
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
     * 1/P is not a polynom: the operation is not available.
     * @throws {MathError} always. The `IExpression` contract returns a polynom, never `null`, so impossibility is a throw.
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

    /**
     * True when the division by `div` leaves no remainder. A degree-1 divisor is tested through its root.
     */
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
     * True when both polynoms are equal once reduced and sorted: same terms, same coefficients.
     */
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

    /**
     * True for the constant polynom `1`.
     */
    isOne(): boolean {
        return this.#monoms.length === 1 && this.#monoms[0].coefficient.isOne() && this.degree().isZero()
    }

    /**
     * True when `P` is the opposite polynom (`x+1` and `-x-1`).
     */
    isOppositeAt(P: Polynom): boolean {
        return this.#compare(P.clone().opposite(), '=')
    }

    /**
     * True when both polynoms have the same terms, whatever their coefficients (`x^2+x` and `3x^2-5x`).
     */
    isSameAs(P: Polynom): boolean {
        return this.#compare(P, 'same')
    }

    /**
     * True for the zero polynom (no term, or the single term `0`).
     */
    isZero(): boolean {
        return (this.#monoms.length === 1 && this.#monoms[0].coefficient.isZero()) || this.#monoms.length === 0
    }

    /**
     * Least common multiple of the denominators of the coefficients.
     */
    lcmDenominator(): number {
        return Numeric.lcm(...this.getDenominators())
    }

    /**
     * Least common multiple of the numerators of the coefficients.
     */
    lcmNumerator(): number {
        return Numeric.lcm(...this.getNumerators())
    }

    /**
     * Number of monoms.
     */
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
            return new Fraction(0)
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

    /**
     * Monom of the given degree for `variable`, or the monom of highest degree when `degree` is omitted.
     * Returns the zero monom when none matches.
     */
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
    /**
     * First monom that contains `variable`, or the zero monom when none does.
     */
    monomByVariable(variable: string): Monom {
        const M = this.clone().reduce()
        for (const m of M.#monoms) {
            if (m.hasVariable(variable)) {
                return m.clone()
            }
        }

        return new Monom().zero()
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

    /**
     * Every monom of the given degree for `variable`, or of the highest degree when `degree` is omitted.
     */
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

    /**
     * Multiply by polynoms, monoms, fractions, numbers or strings, then reduce. Modifies and returns the receiver.
     * A string is read as a polynom (`"x+3"`).
     * Every operand is built before the receiver is touched: an invalid value throws and leaves it unchanged.
     * @throws {ParseError} if a string operand is malformed.
     * @throws {InvalidArgumentError} if an operand is `undefined`.
     */
    multiply(...values: InputAlgebra<Polynom>[]): this {
        const factors = values.map(value => Polynom.#toPolynom(value))

        for (const factor of factors) {
            this.#multiplyByPolynom(factor)
        }
        return this
    }

    /**
     * Number of distinct variables.
     */
    get numberOfVars(): number {
        return this.variables.length
    }

    /**
     * Set the polynom to the constant `1`.
     */
    one(): this {
        this.#monoms = []
        this.#monoms.push(new Monom().one())
        this.#invalidateCache()
        return this
    }

    // ------------------------------------------
    /**
     * Change the sign of every term.
     */
    opposite(): this {
        this.#monoms = this.#monoms.map(m => m.opposite())
        this.#invalidateCache()
        return this
    }

    /**
     * Expression to give to a plotting tool: explicit `*` between a coefficient and its variables.
     */
    get plotFunction(): string {
        return this.#genDisplay('tex', false, false, true)
    }

    /**
     * Raise to a non-negative integer power; the power 0 gives `1`.
     * @throws {InvalidArgumentError} if `nb` is negative or not a safe integer.
     */
    pow(nb: number): this {
        if (!Number.isSafeInteger(nb)) {
            throw new InvalidArgumentError('Can only raise item by an integer')
        }
        if (nb < 0) {
            throw new InvalidArgumentError('Can only raise item by a non-negative integer')
        }
        if (nb === 0) {
            return this.one()
        }
        const P = this.clone()
        for (let i = 1; i < nb; i++) {
            this.multiply(P)
        }
        return this.reduce()
    }

    /**
     * A primitive with respect to `variable` (default `x`), without integration constant.
     * @throws {MathError} if a term has a power of -1 of the variable.
     */
    primitive(variable?: string): Polynom {
        const dP = new Polynom()

        for (const m of this.#monoms) {
            dP.add(m.primitive(variable))
        }

        return dP
    }

    /**
     * Add the similar terms, remove the zero terms, reduce the coefficients and sort by decreasing degree.
     */
    reduce(): this {
        // Group the monoms by similarity. A zero monom is similar to every monom (see Monom.isSameAs), so it
        // is never used as a group: it would absorb a term that belongs to another group.
        const groups: Monom[] = []
        for (const m of this.#monoms) {
            if (m.isZero()) continue

            const group = groups.find(g => !g.isZero() && g.isSameAs(m))
            if (group) {
                group.add(m)
            } else {
                groups.push(m)
            }
        }

        // Remove all null monoms (a group can cancel out)
        this.#monoms = groups.filter(m => !m.isZero())

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

    /**
     * Sort the monoms by decreasing degree of `variable` (default: the default variable of the polynom), or by
     * increasing degree when `revert` is true. The other variables break the ties.
     */
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

    /**
     * The n-th root of a polynom is not a polynom: the operation is not available.
     * @throws {MathError} always.
     */
    root(): this {
        throw new MathError('Cannot take the root from a polynom')
    }

    /**
     * Roots of the polynom, as {@link Solution}s sorted by value. A constant polynom has none.
     * The result is kept until the polynom changes.
     * @throws {MathError} if a degree is not a natural number.
     */
    get roots(): Solution[] {
        if (!this.#rootsCache) {
            this.#roots = this.degree().isZero()
                ? []
                : new EquationSolver(this.clone()).solve()
            this.#rootsCache = true
        }
        return this.#roots
    }

    /**
     * Set the default variable, used when a method needs one and the polynom does not decide it.
     * @throws {InvalidArgumentError} if `value` is not a single lowercase letter.
     */
    setVariable(value: string): this {
        if (!/^[a-z]$/.test(value)) {
            throw new InvalidArgumentError(`setVariable expects a single lowercase variable, got "${value}"`)
        }
        this.#defaultVariable = value

        return this
    }

    /**
     * The square root of a polynom is not a polynom: the operation is not available.
     * @throws {MathError} always.
     */
    sqrt(): this {
        throw new MathError('Cannot take the square root from a polynom')
    }

    /**
     * Subtract polynoms, monoms, numbers or strings, then reduce. Modifies and returns the receiver.
     * A string is read as a polynom (`"x-1"`).
     * Every operand is built before the receiver is touched: an invalid value throws and leaves it unchanged.
     * @throws {ParseError} if a string operand is malformed.
     * @throws {InvalidArgumentError} if an operand is `undefined`.
     */
    subtract(...values: InputAlgebra<Polynom>[]): this {
        const monoms = values.flatMap(value => Polynom.#toPolynom(value).opposite().monoms)

        this.#monoms = this.#monoms.concat(monoms)
        return this.reduce()
    }

    /** Numeric value of a constant polynom, or `undefined` when the degree is not zero. */
    get value(): number | undefined {
        if (this.degree().isZero()) {
            return this.monoms[0]?.coefficient.value ?? 0
        }

        return undefined
    }

    /**
     * The variables of the polynom, sorted alphabetically.
     */
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

    /**
     * The polynom an operand stands for. A `new Polynom(undefined)` would silently be empty, which is never
     * a meaningful operand, so it is rejected here.
     */
    static #toPolynom(value: InputAlgebra<Polynom>): Polynom {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- untyped JS callers can pass undefined
        if (value === undefined) {
            throw new InvalidArgumentError('An operand is required')
        }
        return new Polynom(value)
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
