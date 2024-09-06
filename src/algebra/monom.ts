/***
 * Monom class
 */
import type {
    IAlgebra,
    IAnalyse,
    IExpression,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    literalType
} from "../pimath.interface"
import { Fraction } from "../coefficients/fraction"
import { NthRoot } from "../coefficients/nthRoot"
import { Numeric } from "../numeric"

import { ShutingYard, ShutingyardType, type Token } from "piexpression"

export class Monom implements IPiMathObject<Monom>, IExpression<Monom>, IAnalyse<Monom>, IAlgebra<Monom> {
    #coefficient: Fraction
    #literal: literalType<Fraction>

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
     * Parse a string to a monom. The string may include fraction.
     * @param inputStr
     */
    public parse = (inputStr: InputAlgebra<Monom>): this => {
        // Initialize the monom
        this.#coefficient = new Fraction()
        this.#literal = {}

        if (typeof inputStr === 'string') {
            this.#shutingYardToReducedMonom(inputStr)
        } else if (typeof inputStr === 'number') {
            this.#coefficient = new Fraction(inputStr)
        } else if (inputStr instanceof Fraction) {
            this.#coefficient = inputStr.clone()
        } else if (inputStr instanceof Monom) {
            this.#coefficient = inputStr.#coefficient.clone()

            // Copy the literal parts
            this.#cloneLiteral(inputStr)
        }

        return this
    }

    /**
     * Clone the current Monom.
     */
    public clone = (): Monom => {
        const F: Monom = new Monom()

        F.coefficient = this.#coefficient.clone()

        // Copy the literal parts.
        for (const k in this.#literal) {
            F.setLetter(k, this.#literal[k].clone())
        }
        return F
    }

    public static gcd = (...monoms: Monom[]): Monom => {
        // All the monoms must be with natural powers...
        for (const m of monoms) {
            if (m.containsRationalPower()) {
                return new Monom().zero()
            }
        }

        const M = new Monom(),
            n: number = Numeric.gcd(...monoms.map(value => value.coefficient.numerator)),
            d: number = Numeric.lcm(...monoms.map(value => value.coefficient.denominator))

        // Get the coefficient.
        M.coefficient = new Fraction(n, d).reduce()

        // Set the literal parts - go through each monoms literal parts and get only the lowest degree of each letters.
        for (const m of monoms) {
            // Remove the inexistant letters from the resulting monom
            for (const letter in M.literal) {
                if (!(letter in m.literal)) {
                    M.literal[letter].zero()
                }
            }
            for (const letter in m.literal) {
                if (!M.hasVariable(letter) && m.literal[letter].isStrictlyPositive()) {
                    M.literal[letter] = m.literal[letter].clone()
                } else {
                    M.literal[letter] = new Fraction(Math.min(m.literal[letter].value, M.literal[letter].value))
                }
            }
        }

        return M
    }

    /**
     * Multiply two monoms and return a NEW monom.
     * @param monoms
     */
    public static xMultiply = (...monoms: Monom[]): Monom => {
        const M = new Monom().one()

        for (const m of monoms) {
            M.multiply(m)
        }

        return M
    }

    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    public add = (...M: InputAlgebra<Fraction>[]): this => {
        for (const m of M) {
            // If the value given is not a monom, create it.
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m

            if (this.isSameAs(mAsMonom)) {
                if (this.isZero()) {
                    this.#cloneLiteral(mAsMonom)
                }

                this.#coefficient.add(mAsMonom.coefficient)
            } else {
                console.log('Add monom: ' + this.display + ' is not similar with ', mAsMonom.display)
            }
        }
        return this
    }

    /**
     * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
     * @returns {Fraction}
     */
    public get coefficient(): Fraction {
        return this.#coefficient
    }

    /**
     * Set the coefficient \\(k\\) value of the monom
     * @param {Fraction | number | string} F
     */
    public set coefficient(F: InputValue<Fraction>) {
        this.#coefficient = new Fraction(F)
    }

    public containsRationalPower = (): boolean => {
        return Object.values(this.#literal).some((value) => value.isRational())
    }

    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    public degree = (letter?: string): Fraction => {
        if (this.variables.length === 0) {
            return new Fraction().zero()
        }
        if (letter === undefined) {
            // Not setLetter given -> we get the global monom degree (sum of all the letters).
            return Object.values(this.#literal).reduce((t, n) => t.clone().add(n))
        } else {
            // A setLetter is given -> get the corresponding power.
            return !this.hasVariable(letter) ? new Fraction().zero() : this.#literal[letter].clone()
        }
    }

    /**
     * Derivative the monom
     * @param letter
     */
    public derivative = (letter?: string): Monom => {
        // No setLetter given - assume it's the setLetter 'x'
        if (letter === undefined) {
            letter = 'x'
        }

        if (this.hasVariable(letter)) {
            const d = this.#literal[letter].clone(),
                dM = this.clone()

            // Subtract one to the degree.
            dM.#literal[letter].subtract(1)

            // Multiply the coefficient by the previous degree
            dM.#coefficient.multiply(new Fraction(d.clone()))
            return dM
        } else {
            return new Monom().zero()
        }
    }

    // Display getter
    /**
     * This display getter is to be used in the polynom display getter
     */
    public get display(): string {
        let L = ''
        const letters = Object.keys(this.#literal).sort()
        for (const letter of letters) {
            if (this.#literal[letter].isNotZero()) {
                L += letter
                if (this.#literal[letter].isNotEqual(1)) {
                    L += `^(${this.#literal[letter].display})`
                }
            }
        }

        if (L === '') {
            // No setLetter - means it's only a number !
            if (this.#coefficient.value != 0) {
                return this.#coefficient.display
            } else {
                return ''
            }
        } else {
            if (this.#coefficient.value === 1) {
                return L
            } else if (this.#coefficient.value === -1) {
                return `-${L}`
            } else if (this.#coefficient.value === 0) {
                return '0'
            } else {
                return `${this.#coefficient.display}${L}`
            }
        }
    }

    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    public divide = (...M: InputAlgebra<Fraction>[]): this => {
        // Depending on the given value, choose the current item
        for (const m of M) {
            // If the value given is not a monom, create it.
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m

            // Divide the coefficient
            this.#coefficient.divide(mAsMonom.coefficient)

            // Subtract the power values
            for (const letter in mAsMonom.literal) {

                this.#literal[letter] = this.hasVariable(letter) ?
                    this.#literal[letter].subtract(mAsMonom.literal[letter]) :
                    mAsMonom.literal[letter].clone().opposite()


                // If the power of a particular setLetter is zero, delete it from the literal part..
                if (this.#literal[letter].isZero()) {
                    this.removeVariable(letter)
                }
            }
        }
        return this
    }

    public get dividers(): Monom[] {
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
        let literals: literalType<Fraction>[] = []
        for (const L in this.literal) {
            // L is the letter.
            literals = this._getLiteralDividers(literals, L)
        }

        const monomDividers: Monom[] = []
        if (literals.length > 0 && dividers.length > 0) {
            for (const N of dividers) {
                for (const L of literals) {
                    const M = new Monom()
                    M.coefficient = new Fraction(N)
                    M.literal = L
                    monomDividers.push(M)
                }
            }
        } else if (dividers.length === 0) {
            for (const L of literals) {
                const M = new Monom()
                M.coefficient = new Fraction().one()
                M.literal = L
                monomDividers.push(M)
            }
        } else {
            for (const N of dividers) {
                const M = new Monom()
                M.coefficient = new Fraction(N)
                monomDividers.push(M)
            }
        }

        return monomDividers.length === 0 ? [new Monom().one()] : monomDividers
    }

    /**
     * Evaluate a monom. Each setLetter must be assigned to a Fraction.
     * @param values    Dictionary of <setLetter: Fraction>
     * @param asNumeric
     */
    public evaluate = (values: literalType<number | Fraction> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number => {
        // If as numeric return the numeric value
        if (asNumeric === true) {
            // Convert all values to numeric
            // If the value is a Fraction, convert it to a number
            if (values instanceof Fraction) {
                return this.#evaluateAsNumeric(values.value)
            }

            // If the value is a NthRoot, return undefined
            if (values instanceof NthRoot) {
                return new Fraction().invalid()
            }

            // If the value is a number, return the numeric value
            if (typeof values === 'number') {
                return this.#evaluateAsNumeric(values)
            }

            // If the value is an object, return the numeric value
            if (typeof values === 'object') {
                // Convert {[key:string]:Fraction} to {[key:string]:number}
                const tmpValues: literalType<number> = {}
                for (const L in values) {
                    tmpValues[L] = new Fraction(values[L]).value
                }

                return this.#evaluateAsNumeric(tmpValues)
            }
        }

        // The answer must be a Fraction
        const r = this.coefficient.clone()

        if (typeof values === 'number' || values instanceof Fraction) {
            const tmpValues: literalType<Fraction> = {}
            tmpValues[this.variables[0]] = new Fraction(values)
            return this.evaluate(tmpValues)
        }

        if (values instanceof NthRoot) {
            return new Fraction().invalid()
        }

        if (typeof values === 'object') {
            if (this.variables.length === 0) {
                return this.coefficient
            }

            for (const L in this.#literal) {
                const value = new Fraction(values[L])

                r.multiply(value.pow(this.#literal[L]))
            }
        }

        return r
    }

    // -------------------------------------
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    public hasVariable = (letter?: string): boolean => {
        // The letter was not found
        return Object.hasOwn(this.#literal, letter ?? 'x')
    }

    public integrate(a: InputValue<Fraction>, b: InputValue<Fraction>, letter?: string | undefined): Fraction {
        const primitive = this.primitive(letter)

        return (primitive.evaluate(b) as Fraction)
            .subtract(primitive.evaluate(a) as Fraction)
    }

    public inverse = (): this => {
        this.#coefficient.opposite()
        for (const letter in this.#literal) {
            this.#literal[letter].opposite()
        }
        return this
    }

    public isDivisible = (div: Monom): boolean => {
        // For all variables (letters), the current monom must have a degree higher than the divider
        if (div.degree().isStrictlyPositive()) {
            for (const letter of div.variables) {
                if (!this.degree(letter).isGeq(div.degree(letter))) {
                    return false
                }
            }
        }

        // If the coefficient is rational, we suppose we don't need to check the division by the coefficient.
        if (this.coefficient.isRational() || div.coefficient.isRational()) {
            return true
        }

        return this.coefficient.clone().divide(div.coefficient).isRelative()
    }

    /**
     * Determine if two monoms are equals
     * @param M
     */
    public isEqual = (M: Monom): boolean => {
        return this.isSameAs(M) && this.#coefficient.isEqual(M.coefficient)
    }

    public isLiteralSquare = (): boolean => {
        for (const letter in this.literal) {
            // A literal square must have a natural power
            if (this.literal[letter].isRational()) {
                return false
            }

            // The natural power must be be even
            if (this.literal[letter].isEven()) {
                return false
            }
        }

        return true
    }

    /**
     * Determine if the monom is one
     */
    public isOne = (): boolean => {
        return this.#coefficient.value === 1 && this.variables.length === 0
    }

    /**
     * Determine if two monoms are similar
     * @param M
     */
    public isSameAs = (M: Monom): boolean => {
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

        // To _compare, both must be different than zero.
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

    public isSquare = (): boolean => {
        if (!this.coefficient.isSquare()) {
            return false
        }
        return this.isLiteralSquare()
    }

    /**
     * Determine if the monom is null
     */
    public isZero = (): boolean => {
        return this.#coefficient.value === 0
    }

    /**
     * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
     * @returns {literalType}
     */
    public get literal(): literalType<Fraction> {
        return this.#literal
    }

    /**
     * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
     * @param {literalType<Fraction>} L
     */
    public set literal(L: literalType<Fraction>) {
        this.#literal = L
    }

    /**
     * Get the literal square roots of the Monom.
     * TODO: remove this getter ? Is it used and is it correct ?
     * @returns {literalType<Fraction>}
     */
    public get literalSqrt(): literalType<Fraction> {
        // TODO: used in Polynom._factorize2ndDegree : remove it from here ?
        if (this.isLiteralSquare()) {
            const L: literalType<Fraction> = {}
            for (const key in this.#literal) {
                L[key] = this.#literal[key].clone().sqrt()
            }
            return L
        } else {
            return this.#literal
        }
    }

    /**
     * Set the literal part of the monom from a string
     * @param inputStr  String like x^2y^3
     */
    public set literalStr(inputStr: string) {
        // TODO : parse using shutingyard tree !

        // Match all x^n
        for (const v of [...inputStr.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) {
            // Create the default letter entry if necessary.
            if (!(v[1] in this.#literal)) {
                this.#literal[v[1]] = new Fraction().zero()
            }

            // Add the new value.
            // TODO: actually, it adds only numeric value
            this.#literal[v[1]].add(+v[2])
        }

        // Match all x
        for (const v of [...inputStr.matchAll(/([a-z](?!\^))/g)]) {
            // Match all single letters
            if (!(v[1] in this.#literal)) {
                this.#literal[v[1]] = new Fraction().zero()
            }

            // Add one to the value.
            this.#literal[v[1]].add(1)
        }
    }

    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    public multiply = (...M: InputAlgebra<Fraction>[]): this => {
        for (const m of M) {
            // If the value given is not a monom, create it.
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m

            // Multiply the coefficient.
            this.#coefficient.multiply(mAsMonom.coefficient)

            // Multiply the literal parts.
            for (const letter in mAsMonom.literal) {
                if (!this.hasVariable(letter)) {
                    this.#literal[letter] = mAsMonom.literal[letter].clone()
                } else {
                    this.#literal[letter].add(mAsMonom.literal[letter])
                }
            }
        }
        return this
    }

    /**
     * Create a one value monom
     */
    public one = (): this => {
        this.#coefficient = new Fraction().one()
        this.#literal = {}
        return this
    }

    /**
     * Get the opposite
     * Returns a monom.
     */
    public opposite = (): this => {
        this.#coefficient.opposite()
        return this
    }

    public get plotFunction(): string {
        let L = ''
        const letters = Object.keys(this.#literal).sort()

        for (const letter of letters) {
            if (this.#literal[letter].isNotZero()) {
                L += (L === '' ? "" : "*") + letter
                if (this.#literal[letter].isNotEqual(1)) {
                    L += `^(${this.#literal[letter].display})`
                }
            }
        }

        // No literal part
        if (L === '') {
            // No setLetter - means it's only a number !
            if (this.#coefficient.value != 0) {
                return this.#coefficient.display
            } else {
                return ''
            }
        } else {
            if (this.#coefficient.value === 1) {
                return L
            } else if (this.#coefficient.value === -1) {
                return `-${L}`
            } else if (this.#coefficient.value === 0) {
                return '0'
            } else {
                return `${this.#coefficient.display}*${L}`
            }
        }
    }

    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    public pow = (nb: number | Fraction): this => {
        this.#coefficient.pow(nb)
        for (const letter in this.#literal) {
            this.#literal[letter].multiply(nb)
        }
        return this
    }

    // #endregion Properties and methods (31)

    // #region Getters And Setters (11)

    public primitive = (letter?: string): Monom => {
        // TODO: derivative including the ln value => implies creating different monom system ?
        if (letter === undefined) {
            letter = 'x'
        }

        // Zero monom
        const M = this.clone()
        let degree: Fraction

        if (M.hasVariable(letter)) {
            degree = M.degree(letter).clone().add(1)
            M.coefficient = M.coefficient.clone().divide(degree)
            M.setLetter(letter, degree)
        } else {
            // There is no letter.

            // The coefficient might be zero (=> x) or a number a (=> ax)
            if (M.coefficient.isZero()) {
                M.coefficient = new Fraction().one()
            }
            M.setLetter(letter, 1)
        }

        return M
    }

    public reduce = (): this => {
        // Reduce the coefficient
        this.coefficient.reduce()

        // Reduce the literal parts (removing null powers)
        for (const letter in this.#literal) {
            if (this.#literal[letter].isZero()) {
                this.removeVariable(letter)
            }
        }
        return this
    }

    public removeVariable(letter: string) {
        /* eslint-disable */
        delete this.#literal[letter]
        /* eslint-enable */
    }

    /**
     * Get the nth-root of the monom
     * @param p
     */
    public root = (): this => {
        throw new Error('Method not implemented.')
    }

    /**
     * Set the power of a particular setLetter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the setLetter (must be positive integer.
     */
    public setLetter = (letter: string, pow: InputValue<Fraction>): this => {
        if (!(pow instanceof Fraction)) {
            return this.setLetter(letter, new Fraction(pow))
        }

        // Set the power of the letter to zero => remove it
        if (this.hasVariable(letter) && pow.isZero()) {
            this.removeVariable(letter)
        }


        this.#literal[letter] = pow.clone()

        return this
    }

    /**
     * Return the square root of a monom
     */
    public sqrt = (): this => {
        if (this.isSquare()) {
            this.#coefficient.sqrt()
            for (const letter in this.#literal) {
                this.#literal[letter].clone().divide(2)
            }
        }

        return this
    }

    /**
     * Subtract multiple monoms
     * @param M (Monom[]) The monoms to subtract
     */
    public subtract = (...M: InputAlgebra<Fraction>[]): this => {
        for (const m of M) {
            // If the value given is not a monom, create it.
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m

            if (this.isSameAs(mAsMonom)) {
                if (this.isZero()) {
                    this.#cloneLiteral(mAsMonom)
                }

                this.#coefficient.add(mAsMonom.clone().coefficient.opposite())
            } else {
                console.log('Subtract: Is not similar: ', mAsMonom.display)
            }
        }
        return this
    }

    /**
     * Get the tex output of the monom
     */
    public get tex(): string {
        // TODO: display with square root !
        let L = ''
        const letters = Object.keys(this.#literal).sort()

        for (const letter of letters) {
            if (this.#literal[letter].isNotZero()) {
                L += letter
                if (this.#literal[letter].isNotEqual(1)) {
                    L += `^{ ${this.#literal[letter].tfrac} }`
                }
            }
        }

        if (L === '') {
            // No setLetter - means it's only a number !
            if (this.#coefficient.value != 0) {
                return this.#coefficient.frac
            } else {
                return '0'
            }
        } else {
            if (this.#coefficient.value === 1) {
                return L
            } else if (this.#coefficient.value === -1) {
                return `-${L}`
            } else if (this.#coefficient.value === 0) {
                return '0'
            } else {
                return `${this.#coefficient.frac}${L}`
            }
        }
    }

    // Getter helpers.
    /**
     * Get the variables letters
     */
    public get variables(): string[] {
        // const M = this.clone().clean()

        const L: string[] = []
        Object.entries(this.literal).forEach(
            ([key, value]) => {
                if (!value.isZero()) {
                    L.push(key)
                }
            })
        L.sort()
        return L
        // return Object.keys(M.literal)
    }

    /**
     * Create a zero value monom
     */
    public zero = (): this => {
        this.#coefficient = new Fraction().zero()
        this.#literal = {}
        return this
    }

    #cloneLiteral(inputStr: Monom) {
        for (const k in inputStr.literal) {
            this.#literal[k] = inputStr.literal[k].clone()
        }
    }

    #evaluateAsNumeric = (values: literalType<number | Fraction> | InputValue<Fraction>): number => {
        let r = this.coefficient.value

        if (typeof values === "number") {
            const tmpValues: literalType<number> = {}
            const key = this.variables[0]
            tmpValues[key] = values

            return this.#evaluateAsNumeric(tmpValues)
        }

        if (values instanceof Fraction) {
            const tmpValues: literalType<number> = {}
            tmpValues[this.variables[0]] = new Fraction(values).value
            return this.#evaluateAsNumeric(tmpValues)
        }

        if (values instanceof NthRoot) {
            return NaN
        }

        if (typeof values === 'object') {
            if (this.variables.length === 0) {
                return this.coefficient.value
            }

            for (const L in this.#literal) {
                const v = values[L]

                if (v instanceof Fraction) {
                    r *= v.value ** (this.#literal[L].value)
                } else {
                    r *= v ** (this.#literal[L].value)
                }
            }
        }

        return r
    }

    private _getLiteralDividers(arr: literalType<Fraction>[], letter: string): literalType<Fraction>[] {
        const tmpList: Record<string, Fraction>[] = []

        // Be default, this.literal[letter] should be a rational number.
        for (let d = 0; d <= this.literal[letter].value; d++) {
            if (arr.length === 0) {
                const litt: literalType<Fraction> = {}
                litt[letter] = new Fraction(d)
                tmpList.push(litt)
            } else {
                for (const item of arr) {
                    const litt: literalType<Fraction> = {}
                    for (const currentLetter in item) {
                        litt[currentLetter] = item[currentLetter]
                    }
                    litt[letter] = new Fraction(d)
                    tmpList.push(litt)
                }
            }
        }
        return tmpList
    }

    #shutingYardToReducedMonom = (inputStr: string): this => {
        // Get the RPN array of the current expression
        const SY: ShutingYard = new ShutingYard().parse(inputStr)
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
                this.setLetter(element.token, 1)
            }
            return this
        } else {
            // Reset the monom
            for (const element of rpn) {
                this.#shutingYard_AddToken(stack, element)
            }
        }

        this.one()
        this.multiply(stack[0])
        return this
    }

    #shutingYard_AddToken = (stack: Monom[], element: Token): void => {
        let q1: Monom, q2: Monom, m: Monom, letter: string, pow: Fraction

        if (element.tokenType === ShutingyardType.COEFFICIENT) {
            stack.push(new Monom(new Fraction(element.token)))

        } else if (element.tokenType === ShutingyardType.VARIABLE) {
            const M = new Monom().one()
            M.setLetter(element.token, 1)
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

                    letter = m.variables[0]

                    if (letter) {
                        m.setLetter(letter, pow)
                    }

                    stack.push(m)
                    // this.multiply(m.clone())
                    break
                }
            }
        }
    }

    // #endregion Private methods (5)
}
