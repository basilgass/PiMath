/***
 * Monom class
 */
import type {
    IAlgebra,
    IAnalyse,
    IEvaluable,
    IExpression,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    LiteralType
} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Numeric} from "../numeric"

import {ShutingYard, ShutingyardType, type Token} from "piexpression"
import {MathError, NotImplementedError, ParseError} from "../errors"

export class Monom implements IPiMathObject<Monom>, IExpression<Monom>, IAnalyse<Monom>, IAlgebra, IEvaluable {
    #coefficient: Fraction
    #literal: LiteralType<Fraction>

    constructor(value?: InputValue<Fraction>)
    constructor(value?: Monom)
    constructor(value?: InputAlgebra<Fraction>) {
        this.#coefficient = new Fraction().zero()
        this.#literal = {}

        if (value !== undefined) {
            // A string is given - try to parse the value.
            this.parse(value)
        }

        return this
    }

    // -----------------------------------------
    /**
     * Route an input to the matching `from***` builder. Same-type inputs are
     * copied; every other shape delegates without inlining construction logic.
     */
    parse(inputStr: InputAlgebra<Monom>): this {
        if (inputStr instanceof Monom) return this.copy(inputStr)
        if (inputStr instanceof Fraction || typeof inputStr === 'number') return this.copy(Monom.fromFraction(inputStr))
        return this.copy(Monom.fromString(inputStr))
    }

    /** Build a constant monom (empty literal part) from a number. */
    static fromNumber(value: number): Monom {
        return Monom.fromFraction(value)
    }

    /** Build a constant monom (empty literal part). */
    static fromFraction(value: InputValue<Fraction>): Monom {
        const m = new Monom()
        m.#coefficient = new Fraction(value)
        m.#literal = {}
        return m
    }

    /**
     * Build a monom from an explicit coefficient and literal part. The literal
     * Fractions are cloned to avoid aliasing the caller's dictionary.
     */
    static fromLiteral(coefficient: InputValue<Fraction>, literal: LiteralType<Fraction>): Monom {
        const m = new Monom()
        m.#coefficient = new Fraction(coefficient)
        m.#literal = {}
        for (const k in literal) {
            m.#literal[k] = literal[k].clone()
        }
        return m
    }

    /**
     * Build a monom from a string. A purely numeric string is a constant monom;
     * any other string is parsed as an algebraic expression.
     * @throws {ParseError} If the string cannot be parsed as a monom.
     */
    static fromString(value: string): Monom {
        if (!isNaN(Number(value))) return Monom.fromNumber(Number(value))
        const m = new Monom()
        m.#shutingYardToReducedMonom(value)
        return m
    }

    /**
     * Copy the mathematical state (coefficient and literal part) of another
     * monom into `this`. Display state is not involved (Monom has none).
     * Entry point used to commit the result of an atomic operation.
     */
    copy(value: Monom): this {
        this.#coefficient = value.coefficient.clone()
        this.#literal = {}
        this.#cloneLiteral(value)
        return this
    }

    clone(): Monom {
        const F: Monom = new Monom()

        F.coefficient = this.#coefficient.clone()

        // Copy the literal parts.
        for (const k in this.#literal) {
            F.setExponent(k, this.#literal[k].clone())
        }
        return F
    }

    /**
     * Get the tex output of the monom
     */
    get tex(): string {
        return this.#format('tex')
    }

    // Display getter
    /**
     * This display getter is to be used in the polynom display getter
     */
    get display(): string {
        return this.#format('display')
    }

    static gcd(...monoms: Monom[]): Monom {
        // All the monoms must be with natural powers...
        for (const m of monoms) {
            if (m.containsRationalPower()) {
                throw new MathError('Monom.gcd: all monomials must have integer powers')
            }
        }

        const M = new Monom()
        const n: number = Numeric.gcd(...monoms.map(value => value.coefficient.numerator))
        const d: number = Numeric.lcm(...monoms.map(value => value.coefficient.denominator))

        // Get the coefficient.
        M.coefficient = new Fraction(n, d).reduce()

        // Set the literal parts - go through each monoms literal parts and get only the lowest degree of each variables.
        for (const m of monoms) {
            // Remove the inexistant variables from the resulting monom
            for (const variable in M.literal) {
                if (!(variable in m.literal)) {
                    M.removeVariable(variable)
                }
            }
            for (const variable in m.literal) {
                if (!M.hasVariable(variable) && m.literal[variable].isStrictlyPositive()) {
                    M.literal[variable] = m.literal[variable].clone()
                } else {
                    // Keep the lowest power, comparing on Fraction (no float round-trip).
                    M.literal[variable] = m.literal[variable].isLeq(M.literal[variable])
                        ? m.literal[variable].clone()
                        : M.literal[variable].clone()
                }
            }
        }

        return M
    }

    /**
     * Multiply two monoms and return a NEW monom.
     */
    static xMultiply(...monoms: Monom[]): Monom {
        const M = new Monom().one()

        for (const m of monoms) {
            M.multiply(m)
        }

        return M
    }

    /**
     * Add multiple similar monoms to the current one.
     * @param M The monoms to add.
     * @throws {MathError} If any operand is not similar to the current monom.
     *                     The receiver is left unchanged (atomic).
     */
    add(...M: InputAlgebra<Fraction>[]): this {
        const clone = this.clone()

        for (const m of M) {
            // If the value given is not a monom, create it.
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m

            if (clone.isSameAs(mAsMonom)) {
                if (clone.isZero()) {
                    clone.#cloneLiteral(mAsMonom)
                }

                clone.#coefficient.add(mAsMonom.coefficient)
            } else {
                throw new MathError('Add monom: ' + this.display + ' is not similar with ' +  mAsMonom.display)
            }
        }

        return this.copy(clone)
    }

    /**
     * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
     */
    get coefficient(): Fraction {
        return this.#coefficient
    }

    /**
     * Set the coefficient \\(k\\) value of the monom
     */
    set coefficient(F: InputValue<Fraction>) {
        this.#coefficient = new Fraction(F)
    }

    containsRationalPower(): boolean {
        return Object.values(this.#literal).some((value) => value.hasFractionalPart())
    }

    /**
     * Get the degree of a monom. If no variable is given, the result will be the global degree.
     * @param variable Letter whose power to return
     */
    degree(variable?: string): Fraction {
        if (this.variables.length === 0) {
            return new Fraction().zero()
        }
        if (variable === undefined) {
            // No variable given -> we get the global monom degree (sum of all the variables).
            return Object.values(this.#literal).reduce((t, n) => t.clone().add(n))
        } else {
            // A variable is given -> get the corresponding power.
            return !this.hasVariable(variable) ? new Fraction().zero() : this.#literal[variable].clone()
        }
    }

    /**
     * Derivative the monom
     */
    derivative(variable = 'x'): Monom {
        // No variable given - assume it's the variable 'x'
        if (this.hasVariable(variable)) {
            const d = this.#literal[variable].clone()
            const dM = this.clone()

            // Subtract one to the degree.
            dM.#literal[variable].subtract(1)

            // Multiply the coefficient by the previous degree
            dM.#coefficient.multiply(new Fraction(d.clone()))
            return dM
        } else {
            return new Monom().zero()
        }
    }

    /**
     * Divide the current monoms by multiple monoms
     * @param M The monoms to divide by.
     */
    divide(...M: InputAlgebra<Fraction>[]): this {
        // Depending on the given value, choose the current item
        for (const m of M) {
            // If the value given is not a monom, create it.
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m

            // Divide the coefficient
            this.#coefficient.divide(mAsMonom.coefficient)

            // Subtract the power values
            for (const variable in mAsMonom.literal) {

                this.#literal[variable] = this.hasVariable(variable) ?
                    this.#literal[variable].subtract(mAsMonom.literal[variable]) :
                    mAsMonom.literal[variable].clone().opposite()


                // If the power of a particular variable is zero, delete it from the literal part..
                if (this.#literal[variable].isZero()) {
                    this.removeVariable(variable)
                }
            }
        }
        return this
    }

    get dividers(): Monom[] {
        // Decompose only if the coefficient is a natural number
        if (!this.coefficient.isRelative()) {
            return [this.clone()]
        }

        // Decompose only if the power values are natural numbers.
        if (this.containsRationalPower()) {
            return [this.clone()]
        }

        // Security : do not do this if greater than 10000
        if (this.coefficient.numerator > 1000000) {
            return [this.clone()]
        }

        const dividers = Numeric.dividers(Math.abs(this.coefficient.numerator))

        // Decompose the literals parts.
        let literals: LiteralType<Fraction>[] = []
        for (const L in this.literal) {
            // L is the variable.
            literals = this.#getLiteralDividers(literals, L)
        }

        const monomDividers: Monom[] = []
        if (literals.length > 0 && dividers.length > 0) {
            for (const N of dividers) {
                for (const L of literals) {
                    monomDividers.push(Monom.fromLiteral(N, L))
                }
            }
        } else if (dividers.length === 0) {
            for (const L of literals) {
                monomDividers.push(Monom.fromLiteral(1, L))
            }
        } else {
            for (const N of dividers) {
                monomDividers.push(Monom.fromNumber(N))
            }
        }

        return monomDividers.length === 0 ? [new Monom().one()] : monomDividers
    }

    /**
     * Evaluate a monom. Every variable of the monom must be assigned in `values`;
     * extra entries in `values` (variables not present in the monom) are ignored.
     * @param values    Dictionary of <variable: Fraction | number>, or a scalar
     *                  assigned to the monom's single variable.
     * @param asNumeric When true, returns a primitive number instead of a Fraction.
     * @throws {MathError} If a variable of the monom is missing from `values`.
     */
    evaluate(values: LiteralType<number | Fraction> | InputValue<Fraction>, asNumeric: true): number
    evaluate(values: LiteralType<number | Fraction> | InputValue<Fraction>, asNumeric?: false): Fraction
    evaluate(values: LiteralType<number | Fraction> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number
    evaluate(values: LiteralType<number | Fraction> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number {
        const resolved = this.#resolveValues(values)

        // A constant monom evaluates to its coefficient, whatever the values.
        if (this.variables.length === 0) {
            return asNumeric === true ? this.coefficient.value : this.coefficient.clone()
        }

        // Every variable of the monom must be assigned.
        for (const L in this.#literal) {
            if (!(L in resolved)) {
                throw new MathError('evaluate: missing value for variable ' + L)
            }
        }

        if (asNumeric === true) {
            let r = this.coefficient.value
            for (const L in this.#literal) {
                const v = resolved[L]
                r *= (v instanceof Fraction ? v.value : v) ** this.#literal[L].value
            }
            return r
        }

        const r = this.coefficient.clone()
        for (const L in this.#literal) {
            r.multiply(new Fraction(resolved[L]).pow(this.#literal[L]))
        }
        return r
    }

    // -------------------------------------
    /**
     * Determine if a monom contains a variable in its literal part
     */
    hasVariable(variable: string): boolean {
        return Object.hasOwn(this.#literal, variable)
    }

    integrate(a: InputValue<Fraction>, b: InputValue<Fraction>, variable?: string): Fraction {
        const primitive = this.primitive(variable)

        return (primitive.evaluate(b, false))
            .subtract(primitive.evaluate(a, false))
    }

    inverse(): this {
        this.#coefficient.inverse()
        for (const variable in this.#literal) {
            this.#literal[variable].opposite()
        }
        return this
    }

    isDivisibleBy(div: Monom): boolean {
        // For all variables, the current monom must have a degree higher than the divider
        if (div.degree().isStrictlyPositive()) {
            for (const variable of div.variables) {
                if (!this.degree(variable).isGeq(div.degree(variable))) {
                    return false
                }
            }
        }

        // If the coefficient has a fractional part, we suppose we don't need to check the division by the coefficient.
        if (this.coefficient.hasFractionalPart() || div.coefficient.hasFractionalPart()) {
            return true
        }

        return this.coefficient.clone().divide(div.coefficient).isRelative()
    }

    /**
     * Determine if two monoms are equals
     */
    isEqual(M: Monom): boolean {
        return this.isSameAs(M) && this.#coefficient.isEqual(M.coefficient)
    }

    isLiteralSquare(): boolean {
        for (const variable in this.literal) {
            // A literal square must have a natural power
            if (this.literal[variable].hasFractionalPart()) {
                return false
            }

            // The natural power must be even - if it's odd, the monom is not a square.
            if (this.literal[variable].isOdd()) {
                return false
            }
        }

        return true
    }

    /**
     * Determine if the monom is one
     */
    isOne(): boolean {
        return this.#coefficient.value === 1 && this.variables.length === 0
    }

    /**
     * Determine if two monoms are similar
     */
    isSameAs(M: Monom): boolean {
        // Get the list of all variables from both monoms.
        const M1: string[] = this.variables
        const M2: string[] = M.variables

        // Get the list of all variables from both monoms.
        const K: string[] = M1.concat(M2.filter((item) => !M1.includes(item)))

        // If one of the monom is zero, it is the same than the other.
        if (this.isZero() || M.isZero()) {
            return true
        }

        // Both monoms has no literal part.
        if (M1.length === 0 && M2.length === 0) {
            return true
        }

        // Both monoms must have the same variables
        if (M1.length !== M2.length) {
            return false
        }

        // To _compare, both must be different from zero.
        if (!this.isZero() && !M.isZero()) {
            for (const key of K) {
                // The variable is not available in one of the monom
                if (!this.hasVariable(key) || !M.hasVariable(key)) {
                    return false
                }

                // The variable does not have the same power in each monoms.
                if (!this.#literal[key].isEqual(M.literal[key])) {
                    return false
                }
            }
        }

        // All are positive check - the monoms are the sames.
        return true
    }

    isSquare(): boolean {
        if (!this.coefficient.isSquare()) {
            return false
        }
        return this.isLiteralSquare()
    }

    /**
     * Determine if the monom is null
     */
    isZero(): boolean {
        return this.#coefficient.value === 0
    }

    /**
     * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
     */
    get literal(): LiteralType<Fraction> {
        return this.#literal
    }

    /**
     * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
     */
    set literal(L: LiteralType<Fraction>) {
        this.#literal = L
    }

    /**
     * Set the literal part of the monom from a string
     * @param inputStr  String like x^2y^3
     */
    set literalStr(inputStr: string) {
        // Match all x^n
        for (const v of [...inputStr.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) {
            // Create the default variable entry if necessary.
            if (!(v[1] in this.#literal)) {
                this.#literal[v[1]] = new Fraction().zero()
            }

            // Add the new value.
            this.#literal[v[1]].add(+v[2])
        }

        // Match all x
        for (const v of [...inputStr.matchAll(/([a-z](?!\^))/g)]) {
            // Match all single variables
            if (!(v[1] in this.#literal)) {
                this.#literal[v[1]] = new Fraction().zero()
            }

            // Add one to the value.
            this.#literal[v[1]].add(1)
        }
    }

    /**
     * Multiply multiple monoms into the current monom
     * @param M The monoms to multiply by.
     */
    multiply(...M: InputAlgebra<Fraction>[]): this {
        for (const m of M) {
            // If the value given is not a monom, create it.
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m

            // Multiply the coefficient.
            this.#coefficient.multiply(mAsMonom.coefficient)

            // Multiply the literal parts.
            for (const variable in mAsMonom.literal) {
                if (!this.hasVariable(variable)) {
                    this.#literal[variable] = mAsMonom.literal[variable].clone()
                } else {
                    this.#literal[variable].add(mAsMonom.literal[variable])
                }
            }
        }
        return this
    }

    /**
     * Create a one value monom
     */
    one(): this {
        this.#coefficient = new Fraction().one()
        this.#literal = {}
        return this
    }

    /**
     * Get the opposite
     * Returns a monom.
     */
    opposite(): this {
        this.#coefficient.opposite()
        return this
    }

    get plotFunction(): string {
        return this.#format('plot')
    }

    /**
     * Raise the monom to a power.
     * @param nb Mathematical power
     */
    pow(nb: number | Fraction): this {
        this.#coefficient.pow(nb)
        for (const variable in this.#literal) {
            this.#literal[variable].multiply(nb)
        }
        return this
    }

    primitive(variable = 'x'): Monom {
        // Zero monom
        const M = this.clone()
        let degree: Fraction

        if (M.hasVariable(variable)) {
            degree = M.degree(variable).clone().add(1)
            M.coefficient = M.coefficient.clone().divide(degree)
            M.setExponent(variable, degree)
        } else {
            // There is no variable.

            // The coefficient might be zero (=> x) or a number a (=> ax)
            if (M.coefficient.isZero()) {
                M.coefficient = new Fraction().one()
            }
            M.setExponent(variable, 1)
        }

        return M
    }

    reduce(): this {
        // Reduce the coefficient
        this.coefficient.reduce()

        // Reduce the literal parts (removing null powers)
        for (const variable in this.#literal) {
            if (this.#literal[variable].isZero()) {
                this.removeVariable(variable)
            }
        }
        return this
    }

    removeVariable(variable: string) {
        /* eslint-disable */
        delete this.#literal[variable]
        /* eslint-enable */
    }

    /**
     * Get the nth-root of the monom
     * @throws {NotImplementedError} Always: the nth-root of a monom is not yet implemented.
     * @todo Not yet implemented
     */
    root(): this {
        // TODO: implement nth-root for monoms
        throw new NotImplementedError('Method not implemented.')
    }

    /**
     * Set the exponent of a particular variable.
     * @param variable variable whose exponent to change
     * @param exponent exponent to assign to the variable
     */
    setExponent(variable: string, exponent: InputValue<Fraction>): this {
        if (!(exponent instanceof Fraction)) {
            return this.setExponent(variable, new Fraction(exponent))
        }

        // Set the exponent of the variable to zero => remove it
        if (this.hasVariable(variable) && exponent.isZero()) {
            this.removeVariable(variable)
            return this
        }


        this.#literal[variable] = exponent.clone()

        return this
    }

    /**
     * Return the square root of a monom. The literal part always admits a square
     * root (halving each power, rational powers allowed), so only the coefficient
     * constrains the result.
     * @throws {MathError} If the coefficient is not a perfect square. The receiver
     *                     is left unchanged (atomic: the guard precedes any mutation).
     */
    sqrt(): this {
        if (!this.coefficient.isSquare()) {
            throw new MathError('sqrt: coefficient is not a perfect square: ' + this.display)
        }

        this.#coefficient.sqrt()
        for (const variable in this.#literal) {
            this.#literal[variable].divide(2)
        }
        return this
    }

    /**
     * Subtract multiple similar monoms from the current one.
     * @param M The monoms to subtract
     * @throws {MathError} If any operand is not similar to the current monom.
     *                     The receiver is left unchanged (atomic).
     */
    subtract(...M: InputAlgebra<Fraction>[]): this {
        const clone = this.clone()

        for (const m of M) {
            // If the value given is not a monom, create it.
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m

            if (clone.isSameAs(mAsMonom)) {
                if (clone.isZero()) {
                    clone.#cloneLiteral(mAsMonom)
                }

                clone.#coefficient.add(mAsMonom.clone().coefficient.opposite())
            } else {
                throw new MathError('Subtract: Is not similar: ' + mAsMonom.display)
            }
        }

        return this.copy(clone)
    }

    // Getter helpers.
    /**
     * Get the variables variables
     */
    get variables(): string[] {
        const L: string[] = []
        Object.entries(this.literal).forEach(
            ([key, value]) => {
                if (!value.isZero()) {
                    L.push(key)
                }
            })
        L.sort()
        return L
    }

    /**
     * Create a zero value monom
     */
    zero(): this {
        this.#coefficient = new Fraction().zero()
        this.#literal = {}
        return this
    }

    #cloneLiteral(inputStr: Monom) {
        for (const k in inputStr.literal) {
            this.#literal[k] = inputStr.literal[k].clone()
        }
    }

    /**
     * Normalize the `evaluate` input to a dictionary keyed by variable. A scalar
     * (number / string / Fraction) is assigned to the monom's single variable.
     */
    #resolveValues(values: LiteralType<number | Fraction> | InputValue<Fraction>): LiteralType<number | Fraction> {
        if (values instanceof Fraction || typeof values !== 'object') {
            const dict: LiteralType<number | Fraction> = {}
            if (this.variables.length > 0) {
                dict[this.variables[0]] = values instanceof Fraction ? values : new Fraction(values)
            }
            return dict
        }
        return values
    }

    #format(type: 'tex' | 'display' | 'plot'): string {
        let L = ''
        const variables = Object.keys(this.#literal).sort()

        for (const variable of variables) {
            if (this.#literal[variable].isNotZero()) {
                if (type === 'plot' && L !== '') { L += '*' }
                L += variable
                if (this.#literal[variable].isNotEqual(1)) {
                    L += type === 'tex'
                        ? `^{ ${this.#literal[variable].asTfrac.tex} }`
                        : `^(${this.#literal[variable].display})`
                }
            }
        }

        const coeffStr = type === 'tex' ? this.#coefficient.asFrac.tex : this.#coefficient.display

        if (L === '') {
            return this.#coefficient.value !== 0 ? coeffStr : '0'
        }

        if (this.#coefficient.value === 1) { return L }
        if (this.#coefficient.value === -1) { return `-${L}` }
        if (this.#coefficient.value === 0) { return '0' }
        return type === 'plot' ? `${coeffStr}*${L}` : `${coeffStr}${L}`
    }

    #getLiteralDividers(arr: LiteralType<Fraction>[], variable: string): LiteralType<Fraction>[] {
        const tmpList: Record<string, Fraction>[] = []

        // Be default, this.literal[variable] should be a rational number.
        for (let d = 0; d <= this.literal[variable].value; d++) {
            if (arr.length === 0) {
                const litt: LiteralType<Fraction> = {}
                litt[variable] = new Fraction(d)
                tmpList.push(litt)
            } else {
                for (const item of arr) {
                    const litt: LiteralType<Fraction> = {}
                    for (const currentLetter in item) {
                        litt[currentLetter] = item[currentLetter]
                    }
                    litt[variable] = new Fraction(d)
                    tmpList.push(litt)
                }
            }
        }
        return tmpList
    }

    #shutingYardAddToken(stack: Monom[], element: Token): void {
        let q1: Monom; let q2: Monom; let m: Monom; let variable: string; let pow: Fraction

        if (element.tokenType === ShutingyardType.COEFFICIENT) {
            stack.push(new Monom(new Fraction(element.token)))

        } else if (element.tokenType === ShutingyardType.VARIABLE) {
            const M = new Monom().one()
            M.setExponent(element.token, 1)
            stack.push(M.clone())

        } else if (element.tokenType === ShutingyardType.OPERATION) {
            switch (element.token) {
                case '-':
                    // this should only happen for negative powers or for negative coefficient.
                    q2 = (stack.pop()) ?? new Monom().zero()
                    q1 = (stack.pop()) ?? new Monom().zero()

                    stack.push(q1.subtract(q2))

                    break
                case '*':
                    // Get the last element in the stack
                    q2 = (stack.pop()) ?? new Monom().one()
                    q1 = (stack.pop()) ?? new Monom().one()

                    stack.push(q1.multiply(q2))
                    break
                case '/':
                    // Get the last element in the stack
                    q2 = (stack.pop()) ?? new Monom().one()
                    q1 = (stack.pop()) ?? new Monom().one()

                    stack.push(q1.divide(q2))
                    break
                case '^': {
                    // get the two last elements in the stack
                    const poppedCoefficient = stack.pop()?.coefficient
                    pow = poppedCoefficient ?? new Fraction().one()
                    m = stack.pop() ?? new Monom().one()

                    variable = m.variables[0]

                    if (variable) {
                        m.setExponent(variable, pow)
                    }

                    stack.push(m)
                    // this.multiply(m.clone())
                    break
                }
            }
        }
    }

    #shutingYardToReducedMonom(inputStr: string): this {
        // Get the RPN array of the current expression
        let SY: ShutingYard
        try {
            SY = new ShutingYard().parse(inputStr)
        } catch (e) {
            throw new ParseError(`Cannot parse "${inputStr}" as a Monom`, {cause: e})
        }
        const rpn: { token: string, tokenType: ShutingyardType }[] = SY.rpn

        const stack: Monom[] = []

        if (rpn.length === 0) {
            this.zero()
            return this
        } else if (rpn.length === 1) {
            const element = rpn[0]

            this.one()
            if (element.tokenType === ShutingyardType.COEFFICIENT) {
                this.coefficient = new Fraction(element.token)
            } else if (element.tokenType === ShutingyardType.VARIABLE) {
                this.setExponent(element.token, 1)
            }
            return this
        } else {
            // Reset the monom
            for (const element of rpn) {
                this.#shutingYardAddToken(stack, element)
            }
        }

        this.one()
        this.multiply(stack[0])
        return this
    }
}
