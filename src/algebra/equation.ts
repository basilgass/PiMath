import type {
    EquationSign,
    IAlgebra,
    IEquation,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    LiteralType
} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Numeric} from "../numeric"
import {MathError, ParseError} from "../errors"
import {EquationSolver} from "./equationSolver"
import {Polynom} from "./polynom"
import type {Solution} from "../analyze"

// Single source of truth mapping every accepted sign notation to its canonical
// EquationSign. Ordered by descending specificity: a prefixed / multi-character
// token MUST come before any of its substrings (\geq before geq, >= before >),
// so both the parser (#findSign) and the normalizer (#formatSign) match the
// longest token first.
const SIGN_TOKENS: readonly { token: string; sign: EquationSign }[] = [
    {token: '\\geq', sign: '>='},
    {token: 'geq', sign: '>='},
    {token: '\\leq', sign: '<='},
    {token: 'leq', sign: '<='},
    {token: '>=', sign: '>='},
    {token: '=>', sign: '>='},
    {token: '<=', sign: '<='},
    {token: '=<', sign: '<='},
    {token: '>', sign: '>'},
    {token: '<', sign: '<'},
    {token: '=', sign: '='}
]

// Sign obtained when an (in)equation is mirrored (sides swapped or globally
// negated): the direction reverses, an equality stays an equality.
const REVERSED_SIGN: Readonly<Record<EquationSign, EquationSign>> = {
    '=': '=',
    '<': '>',
    '>': '<',
    '<=': '>=',
    '>=': '<='
}

export class Equation implements IPiMathObject<Equation>,
    IEquation<Equation>,
    IAlgebra {

    // Left part of the equation
    #left: Polynom
    // Right part of the equation
    #right: Polynom
    // Signe of the equation
    #sign: EquationSign


    constructor()
    constructor(equation: InputAlgebra<Polynom> | Equation)
    constructor(left: InputAlgebra<Polynom>, right: InputAlgebra<Polynom>, sign?: EquationSign)
    constructor(left?: InputAlgebra<Polynom> | Equation, right?: InputAlgebra<Polynom>, sign?: EquationSign) {
        // Default equation
        this.#left = new Polynom().zero()
        this.#right = new Polynom().zero()
        this.#sign = '='

        // Single input: an equation, a full equation string, or a bare expression.
        if (left !== undefined && right === undefined) {
            this.parse(left)
        } else if (left !== undefined && right !== undefined) {
            this.copy(Equation.fromPolynoms(left as InputAlgebra<Polynom>, right, sign))
        }
    }

    // ------------------------------------------
    /**
     * Router: dispatch an input to the matching `from***` method.
     * A same-type input goes through `copy`, a string is a full equation
     * (strict: `fromString` throws if it carries no sign), and a bare
     * algebraic expression is read as `<expr> = 0`.
     */
    parse(value: InputAlgebra<Polynom> | Equation): this {
        if (value instanceof Equation) return this.copy(value)
        if (typeof value === 'string') return this.copy(Equation.fromString(value))
        return this.copy(Equation.fromPolynoms(value, new Polynom().zero()))
    }

    /**
     * Build the equation from a complete equation string (containing a sign).
     * @throws {ParseError} when the string carries no equation sign.
     */
    static fromString(equationString: string): Equation {
        const strSign = Equation.#findSign(equationString)
        const pStr = equationString.split(strSign)
        return Equation.fromPolynoms(new Polynom(pStr[0]), new Polynom(pStr[1]), Equation.#formatSign(strSign))
    }

    /**
     * Build the equation from its two members and an optional sign
     * (defaults to `=`).
     */
    static fromPolynoms(left: InputAlgebra<Polynom>, right: InputAlgebra<Polynom>, sign?: EquationSign): Equation {
        const e = new Equation()
        e.#left = new Polynom(left)
        e.#right = new Polynom(right)
        e.#sign = Equation.#formatSign(sign)
        return e
    }

    /**
     * Copy the mathematical state (left, right and sign) of another equation
     * into this one. Entry point used by the constructor for an Equation input.
     */
    copy(value: Equation): this {
        this.#left = value.#left.clone()
        this.#right = value.#right.clone()
        this.#sign = value.#sign
        return this
    }

    clone(): Equation {
        return new Equation(this.#left.clone(), this.#right.clone(), this.#sign)
    }

    get tex(): string {
        return `${this.#left.tex}${this.signAsTex}${this.#right.tex}`
    }

    get display(): string {
        return `${this.#left.display}${this.signAsTex}${this.#right.display}`
    }

    static isEquationString(equationString: string): boolean {
        // The equation sign can be one of the following:
        // =, <, >, <=, >=

        return equationString.includes('=') ||
            equationString.includes('<') ||
            equationString.includes('>') ||
            equationString.includes('<=') ||
            equationString.includes('>=')
    }

    static makeSolutionsUnique(solutions: Solution[], sorted?: boolean): Solution[] {
        const solutionAsTex: string[] = []
        const uniqueSolutions = solutions.filter(sol => {
            if (!solutionAsTex.includes(sol.tex)) {
                solutionAsTex.push(sol.tex)
                return true
            } else {
                return false
            }
        })

        if (sorted === true) {
            uniqueSolutions.sort((a, b) => a.value - b.value)
        }

        return uniqueSolutions
    }

    /**
     * Add one or more values to the equation. An Equation operand is added
     * member by member; any other value (Polynom, Monom, Fraction, number, or a
     * sign-less string) is added to both members. Atomic: a failing operand
     * leaves the receiver intact.
     * @param values the values to add
     */
    add(...values: InputValue<Equation | Polynom>[]): this {
        // Apply each operand on a single clone; commit on success.
        const clone = this.clone()
        for (const value of values) {
            clone.#addOne(value)
        }
        return this.#commit(clone)
    }

    #addOne(value: InputValue<Equation | Polynom>): void {
        if (value instanceof Equation) {
            this.#left.add(value.left)
            this.#right.add(value.right)
            return
        }

        if (typeof value === 'string' && !Equation.isEquationString(value)) {
            this.#addOne(new Equation(value))
            return
        }

        const p = new Polynom(value)
        this.#left.add(p)
        this.#right.add(p)
    }

    /**
     * Get the degree of the equation
     * @param variable
     */
    degree(variable?: string): Fraction {
        return Fraction.max(this.#left.degree(variable), this.#right.degree(variable))
    }

    /**
     * Divide both members of the equation by a value (coerced to a Fraction).
     * A zero divisor is a no-op (the equation is returned unchanged). For an
     * inequality, a negative divisor reverses the sign.
     *
     * ```
     * 8x+10=6x | 2  ->  4x+5=3x
     * ```
     */
    divide(...values: InputValue<Fraction>[]): this {
        // Dividing by v is multiplying by 1/v; a zero divisor is a no-op.
        const inverses = values
            .map(value => new Fraction(value))
            .filter(F => !F.isZero())
            .map(F => F.inverse())

        return this.multiply(...inverses)
    }

    /**
     * Evaluate the equation as a predicate: substitute the given variable values
     * into both members and return whether the relation `left <sign> right`
     * holds (the equation sign is honoured, including inequalities). Distinct
     * from the value-producing `evaluate` of Polynom/Monom (which returns a
     * number).
     * @param values variable values to substitute (e.g. `{x: 3}`)
     * @param asNumeric compare as numbers (approximate) rather than exact
     *   Fractions; defaults to `false` (exact), like Polynom/Monom's `evaluate`
     */
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric = false): boolean {
        const left = this.#left.evaluate(values, asNumeric)
        const right = this.#right.evaluate(values, asNumeric)

        // Numeric (approximate) comparison against the equation sign.
        if (asNumeric) {
            const l = left as number
            const r = right as number
            switch (this.#sign) {
                case '<': return l < r
                case '>': return l > r
                case '<=': return l <= r
                case '>=': return l >= r
                case '=':
                default: return l === r
            }
        }

        // Exact comparison; EquationSign is a subset of Fraction.compare's CompareSign.
        return (left as Fraction).compare(right, this.#sign)
    }

    // -----------------------------------------------

    /**
     * Determine if the equation contains a variable.
     * @param variable
     */
    hasVariable(variable: string): boolean {
        return this.variables.includes(variable)
    }

    /**
     * Strict equality: both members are identical as written and the sign
     * matches. Sensitive to how terms are split and to the side order
     * (`3x=5` is not `isEqual` to `5=3x`). For "same solutions", use
     * {@link isEquivalentTo}.
     */
    isEqual(value: InputValue<Equation>): boolean {
        const equ = new Equation(value)
        return this.#sign === equ.#sign &&
            equ.left.isEqual(this.#left) &&
            equ.right.isEqual(this.#right)
    }

    // -----------------------------------------------
    // Equations operations

    /**
     * Equivalence: the two (in)equations share the same solution set. All terms
     * are moved left and the resulting polynoms are compared up to a scalar
     * factor (`3x=5`, `3x-5=0` and `6x=10` are all equivalent). For inequalities
     * a negative factor mirrors the equation, so the sign must reverse
     * accordingly. Looser than {@link isEqual}.
     */
    isEquivalentTo(equ: Equation): boolean {
        const p1 = this.clone().moveLeft().simplify().left
        const p2 = equ.clone().moveLeft().simplify().left

        // Positive proportionality: same direction, sign must match.
        if (p1.isEqual(p2)) {
            return this.#sign === equ.#sign
        }

        // Negative proportionality: the equation is mirrored, sign reverses.
        if (p1.isOppositeAt(p2)) {
            return this.#sign === REVERSED_SIGN[equ.#sign]
        }

        return false
    }

    /**
     * Whether the equation contains a cross-term monom (a single monom carrying
     * more than one variable, such as `xy`), which prevents isolating a variable
     * linearly. A linear equation in several distinct variables (e.g. `ax+by+c=0`)
     * has no cross-term and stays isolable.
     */
    hasCrossTerm(): boolean {
        return this.#left.hasCrossTerm() || this.#right.hasCrossTerm()
    }

    /**
     * Whether the equation can be linearly isolated for the given variable:
     * it must be of the first degree and free of any cross-term monom.
     * Pure query (no mutation); use it to guard `isolate`.
     */
    canIsolate(variable?: string): boolean {
        return this.degree(variable).isOne() && !this.hasCrossTerm()
    }

    /**
     * Reorder the equation to keep a single variable on the left and the rest
     * on the right. Atomic: on failure the receiver is left unchanged.
     * @throws {MathError} when the equation cannot be isolated (guard with canIsolate).
     */
    isolate(variable?: string): this {
        if (!this.canIsolate(variable)) {
            throw new MathError(`Cannot isolate "${variable ?? this.variables[0]}" in ${this.display}`)
        }

        // Resolve the variable: an explicit one wins, otherwise the sole variable
        // (single-variable and of degree one at this point, so it always exists).
        const L: string = variable ?? this.variables[0]

        // Work on a clone so a failed isolation leaves the receiver intact.
        const clone = this.clone()

        // Start by moving everything to the left.
        clone.#left.subtract(clone.#right)
        clone.#right.zero()
        for (const m of [...clone.#left.monoms]) {
            if (!m.hasVariable(L)) {
                const mMove = m.clone()
                clone.#left.subtract(mMove)
                clone.#right.subtract(mMove)
            }
        }

        // Invariant: canIsolate guarantees a single monom is left here.
        if (clone.#left.length !== 1) {
            throw new MathError(`Failed to isolate "${L}" in ${this.display}`)
        }

        const cMove: Fraction = clone.#left.monoms[0].coefficient.clone()
        clone.#left.divide(cMove)
        clone.#right.divide(cMove)
        return this.#commit(clone)
    }

    // Getter and setter
    get left(): Polynom {
        return this.#left
    }

    set left(value: Polynom) {
        this.#left = value
    }

    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a variable on the left, all the other on the right.
     */
    moveLeft(): this {
        this.#left = this.#left.clone().subtract(this.#right)
        this.#right = new Polynom().zero()
        return this
    }

    /**
     * Multiply both members of the equation by one or more fraction values.
     * A negative factor reverses the inequality sign. Atomic: a failing operand
     * leaves the receiver intact.
     * @param values the factors to multiply by
     */
    multiply(...values: InputValue<Fraction>[]): this {
        // Multiply both members by each value on a clone; commit on success so a
        // failure leaves the receiver intact.
        const clone = this.clone()
        for (const value of values) {
            const F: Fraction = new Fraction(value)
            clone.#left.multiply(F)
            clone.#right.multiply(F)

            // A negative factor reverses the inequality direction.
            if (clone.#sign !== '=' && F.sign() === -1) {
                clone.#reverseSign()
            }
        }

        return this.#commit(clone)
    }

    get numberOfVars(): number {
        return this.variables.length
    }

    opposite(): this {
        const left = this.#left.clone().opposite()
        const right = this.#right.clone().opposite()
        this.#left = left
        this.#right = right
        return this
    }

    pow(value: number): this {
        const left = this.#left.clone().pow(value)
        const right = this.#right.clone().pow(value)
        this.#left = left
        this.#right = right
        return this
    }

    reduce(): this {
        // reduce means moving everything to the left
        // remove the fractions
        // simplify the equation
        // reorder the equation
        // start with a positive left part
        // Work on a clone and commit only on success.
        const clone = this.clone()

        // Move all left. The right part is now zero.
        clone.moveLeft()

        // Reduce the equation: simplify and reorder.
        clone.#left.reduce()

        // Simplify the equation.
        clone.simplify()

        // Make sure the first part is positive.
        if (clone.#left.monoms[0].coefficient.isNegative()) {
            clone.multiply(-1)
        }

        return this.#commit(clone)
    }

    reorder(allLeft?: boolean): this {
        // Move all monoms of degree greater than 0 to the left,
        // and all zero degree monoms to the right. Work on clones so a
        // failure leaves the receiver intact.
        const left = this.#left.clone().subtract(this.#right)
        const right = new Polynom().zero()
        left.reorder()

        // we have all left (so equal zero) : it's done !
        if (allLeft) {
            this.#left = left
            this.#right = right
            return this
        }

        // Fetch all zero degree monoms.
        left.monoms
            .filter(m => m.degree().isZero())
            .forEach(m => {
                const move = m.clone()
                left.subtract(move)
                right.subtract(move)
            })

        // Reorder the left and right polynoms
        left.reorder()
        right.reorder()
        this.#left = left
        this.#right = right
        return this
    }

    // ------------------------------------------
    replaceBy(variable: string, P: Polynom): this {
        this.#left.replaceBy(variable, P)
        this.#right.replaceBy(variable, P)
        return this
    }

    get right(): Polynom {
        return this.#right
    }

    set right(value: Polynom) {
        this.#right = value
    }

    // ------------------------------------------
    get sign(): string {
        return this.#sign
    }

    set sign(value: string) {
        this.#sign = Equation.#formatSign(value)
    }
    
    get signAsTex(): string {
        if (this.#sign === '>=') {
            return '\\geq'
        }

        if (this.#sign === '<=') {
            return '\\leq'
        }

        return this.#sign
    }

    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    simplify(): this {
        const clone = this.clone()
        clone.multiply(Numeric.lcm(...clone.#left.getDenominators(), ...clone.#right.getDenominators()))
        clone.divide(Numeric.gcd(...clone.#left.getNumerators(), ...clone.#right.getNumerators()))
        return this.#commit(clone)
    }

    // -----------------------------------------------
    solve(): Solution[] {
        const solver = new EquationSolver(this.clone())
        return solver.solve()
    }

    split(): [Polynom, Polynom] {
        return [this.#left.clone(), this.#right.clone()]
    }

    /**
     * Subtract one or more values from the equation (member by member for an
     * Equation operand, from both members otherwise). Atomic: a failing operand
     * leaves the receiver intact.
     * @param values the values to subtract
     */
    subtract(...values: InputValue<Equation | Polynom>[]): this {
        const clone = this.clone()
        for (const value of values) {
            clone.#subtractOne(value)
        }
        return this.#commit(clone)
    }

    #subtractOne(value: InputValue<Equation | Polynom>): void {
        if (value instanceof Equation) {
            this.#left.subtract(value.left)
            this.#right.subtract(value.right)
            return
        }

        if (typeof value === 'string' && !Equation.isEquationString(value)) {
            this.#subtractOne(new Equation(value))
            return
        }

        const p = new Polynom(value)
        this.#left.subtract(p)
        this.#right.subtract(p)
    }

    test(values: LiteralType<Fraction>): boolean {
        return (this.left.evaluate(values)).isEqual(this.right.evaluate(values))
    }

    get variables(): string[] {
        return [...new Set(this.#right.variables.concat(this.#left.variables))]
    }

    /**
     * Commit the mathematical state of a working clone into this equation.
     * Used by the mutating operations to stay atomic: they compute on a clone
     * and only reassign the members once the whole operation has succeeded.
     */
    #commit(from: Equation): this {
        this.#left = from.#left
        this.#right = from.#right
        this.#sign = from.#sign
        return this
    }

    /**
     * Return the raw sign token present in the string (used to split it).
     * @throws {ParseError} when the string contains no equation sign.
     */
    static #findSign(equationString: string): string {
        const found = SIGN_TOKENS.find(entry => equationString.includes(entry.token))

        if (found === undefined) {
            throw new ParseError('The equation is not valid (no sign found)')
        }

        return found.token
    }

    // -----------------------------------------------
    // Equations solving algorithms
    static #formatSign(signStr?: string): EquationSign {
        if (signStr === undefined) return '='
        return SIGN_TOKENS.find(entry => signStr.includes(entry.token))?.sign ?? '='
    }

    #reverseSign(): this {
        this.#sign = REVERSED_SIGN[this.#sign]
        return this
    }
}
