import type {
    IAlgebra,
    IEquation,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    ISolution,
    literalType
} from "../pimath.interface"
import { Fraction } from "../coefficients/fraction"
import { Numeric } from "../numeric"
import { EquationSolver } from "./equationSolver"
import { Monom } from "./monom"
import { Polynom } from "./polynom"

// #region Type aliases (1)

export type EQUATION_SIGN = "=" | "<=" | ">=" | "<" | ">"

// #endregion Type aliases (1)

// #region Classes (1)

export class Equation implements
    IPiMathObject<Equation>,
    IEquation<Equation>,
    IAlgebra<Equation> {

    // Left part of the equation
    #left: Polynom
    // Right part of the equation
    #right: Polynom
    // Signe of the equation
    #sign: EQUATION_SIGN

    // #endregion Class fields (6)

    // #region Constructors (3)

    constructor(equation: InputAlgebra<Polynom> | Equation)
    constructor(left: InputAlgebra<Polynom>, right: InputAlgebra<Polynom>, sign?: EQUATION_SIGN)
    constructor(left?: InputAlgebra<Polynom> | Equation, right?: InputAlgebra<Polynom>, sign?: EQUATION_SIGN) {
        // Default equation
        this.#left = new Polynom().zero()
        this.#right = new Polynom().zero()
        this.#sign = '='

        // Only one value, it's an equation
        if (left !== undefined && right === undefined) {
            if (left instanceof Equation) {
                return left.clone()
            } else if (typeof left === 'string') {
                // Parse the equation as a string.
                this.parse(left)
            }

        } else if (left !== undefined && right !== undefined) {
            // Two values, it's an equation with left and right polynoms.
            this.left = new Polynom(left as InputAlgebra<Polynom>)
            this.right = new Polynom(right)
        }

        if (sign !== undefined) {
            this.sign = sign
        }

        return this
    }

    // #endregion Constructors (3)

    // #region Properties and methods (26)

    // ------------------------------------------
    public parse = (equationString: string): this => {
        // Find the string separator
        const strSign: string | false = this.#findSign(equationString)

        if (strSign === false) {
            throw new Error('The equation is not valid (no sign found)')
        }

        // The StrSign is found
        const pStr: string[] = equationString.split(strSign)

        return this.create(new Polynom(pStr[0]), new Polynom(pStr[1]), this.#formatSign(strSign))
    }

    public create = (left: Polynom, right: Polynom, sign?: string): this => {
        this.#left = left
        this.#right = right
        this.#sign = this.#formatSign(sign ?? "=")
        return this
    }

    public clone = (): Equation => {
        return new Equation(this.#left.clone(), this.#right.clone(), this.#sign)
    }

    /**
     * Add a value to the equation
     * if value is an equation, add the left part to the left part of the equation
     * and the right part to the right part of the equation
     * if value is a string, try to create an equation
     * if it fails, create a polynom and add it to the left and right part of the equation
     * @param value | Polynom | Monom | Fraction | string | monom
     */
    public add(value: InputValue<Equation | Polynom>): this {
        if (value instanceof Equation) {
            // add the left part of the equation
            this.#left.add(value.left)
            // add the right part of the equation
            this.#right.add(value.right)

            return this
        }

        if (typeof value === 'string' &&
            !Equation.isEquationString(value)) {

            return this.add(new Equation(value))
        }

        const p = new Polynom(value)
        this.#left.add(p)
        this.#right.add(p)

        return this
    }

    /**
     * Get the degree of the equation
     * @param letter
     */
    public degree = (letter?: string): Fraction => {
        return Fraction.max(this.#left.degree(letter), this.#right.degree(letter))
    }

    /**
     * divide an equation by a given value (transformed as a fraction)
     *
     * ```
     * 8x+10=6x \vert 2
     * 4x+5=3x
     * ```
     *
     * |>Alternatively with $3x-4$ maybe it's working ?
     * $$\frac{3x}{5}$$
     *
     * @param value
     * @returns {Equation}
     */
    public divide = (value: InputValue<Fraction>): this => {
        // Make sure we have a fraction.
        const F: Fraction = new Fraction(value)

        if (F.isZero()) {
            return this
        } else {
            return this.multiply(F.inverse())
        }
    }

    /**
     * Create an Equation using two polynoms.
     * Markdown *support* is cool
     * @param values
     * @param asNumeric
     */
    public evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean | undefined): boolean {
        // Evaluate the left and right part of the equation.
        // compare the results.

        // Evaluate the left and right part of the equation.
        const left = this.#left.evaluate(values, asNumeric),
            right = this.#right.evaluate(values, asNumeric)

        // compare the results.
        if (asNumeric) {
            return left === right
        }

        return (left as Fraction).isEqual(right as Fraction)
    }

    /**
     * Determine if the equation contains a variable.
     * @param letter
     */
    public hasVariable = (letter: string): boolean => {
        return this.variables.includes(letter)
    }


    public isEqual(value: InputValue<Equation>): boolean {
        const equ = new Equation(value)
        return equ.left.isEqual(this.#left) && equ.right.isEqual(this.#right)
    }

    public isLinearTo = (equ: Equation): boolean => {
        // Move all left.
        const p1 = equ.clone().moveLeft().simplify().left,
            p2 = this.clone().moveLeft().simplify().left

        // They are the same.
        return p1.isEqual(p2) || p1.isOppositeAt(p2)
    }

    /**
     * Determine if the equation contains more than one letter/variable.
     */
    public isMultiVariable = (): boolean => {
        return this.#left.isMultiVariable || this.#right.isMultiVariable
    }

    // -----------------------------------------------
    // Equations helpers
    public isEqualTo = (equ: Equation): boolean => {
        const p1 = equ.clone().moveLeft().left,
            p2 = this.clone().moveLeft().left

        // They are the same.
        return p1.isEqual(p2) || p1.isOppositeAt(p2)
    }

    /**
     * Reorder the polynom to have only one letter on the left, the rest on the right.
     * @param letter
     */
    public isolate = (letter?: string): this | false => {
        // Determine if we can isolate the variables.

        // Both part of the equations must be of the first degree.
        //TODO: handle equations of degree two or more ?
        if (!this.degree(letter).isOne()) {
            return false
        }

        // Modify the equation to isolate the asked variable.
        // TODO: must handle equations like 3xy+5y=4 => y = 4/(3x-5)
        if (this.isMultiVariable()) {
            return false
        }

        // Isolate the letter.
        let mMove: Monom
        // Start by moving everything to the left.
        this.#left.subtract(this.#right)
        this.#right.zero()
        const values = [...this.#left.monoms]
        for (const m of values) {
            if (!m.hasVariable(letter)) {
                mMove = m.clone()
                this.#left.subtract(mMove)
                this.#right.subtract(mMove)
            }
        }

        // In theory, we should have only one item on the left.
        if (this.#left.length !== 1) {
            return false
        }

        const cMove: Fraction = this.#left.monoms[0].coefficient.clone()
        this.#left.divide(cMove)
        this.#right.divide(cMove)
        return this
    }

    // -----------------------------------------------
    // Equations operations

    // -----------------------------------------------
    public letters = (): string[] => {
        return [...new Set([...this.#left.letters(), ...this.#right.letters()])]
    }

    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    public moveLeft = (): this => {
        this.#left.subtract(this.#right)
        this.#right.zero()
        return this
    }

    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    public multiply = (value: InputValue<Fraction>): this => {
        // Make sure we have a fraction.
        const F: Fraction = new Fraction(value)

        // Multiply each part of the equation by the fraction
        this.#left.multiply(F)
        this.#right.multiply(F)

        // The sign of the inequality must be changed.
        if (this.#sign !== '=' && F.sign() === -1) {
            this.#reverseSign()
        }

        return this
    }

    public pow(value: number): this {
        this.#left.pow(value)
        this.#right.pow(value)
        return this
    }
    public opposite = (): this => {
        this.#left = this.#left.opposite()
        this.#right = this.#right.opposite()
        return this
    }

    public reduce(): this {
        // reduce means moving everything to the left
        // remove the fractions
        // simplify the equation
        // reorder the equation
        // start with a positive left part

        // Move all left. The right part is now zero.
        this.moveLeft()

        // Reduce the equation: simplify and reorder.
        this.#left.reduce()

        // Simplify the equation.
        this.simplify()

        // Make sure the first part is positive.
        if (this.#left.monoms[0].coefficient.isNegative()) {
            this.multiply(-1)
        }

        return this
    }

    public reorder = (allLeft?: boolean): this => {
        // Move all monoms of degree greater than 0 to the left.
        // and all zero degree monoms to the right.
        this.#left.subtract(this.#right)
        this.#right.zero()
        this.#left.reorder()

        // we have all left (so equal zero) : it's done !
        if (allLeft) {
            return this
        }

        // Fetch all zero degree monoms.
        this.#left.monoms
            .filter(m => m.degree().isZero())
            .forEach(m => {
                const move = m.clone()
                this.#left.subtract(move)
                this.#right.subtract(move)
            })

        // Reorder the left and right polynoms
        this.#left.reorder()
        this.#right.reorder()
        return this
    }

    // ------------------------------------------
    public replaceBy = (letter: string, P: Polynom): this => {
        this.#left.replaceBy(letter, P)
        this.#right.replaceBy(letter, P)
        return this
    }

    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    public simplify = (): this => {
        this.multiply(Numeric.lcm(...this.#left.getDenominators(), ...this.#right.getDenominators()))
        this.divide(Numeric.gcd(...this.#left.getNumerators(), ...this.#right.getNumerators()))
        return this
    }

    // -----------------------------------------------
    public solve = (): ISolution[] => {
        const solver = new EquationSolver(this.clone())
        return solver.solve()
    }

    public split(): [Polynom, Polynom] {
        return [this.#left.clone(), this.#right.clone()]
    }

    public subtract(value: InputValue<Equation | Polynom>): this {
        if (value instanceof Equation) {
            this.#left.subtract(value.left)
            this.#right.subtract(value.right)

            return this
        }

        if (typeof value === 'string' &&
            !Equation.isEquationString(value)) {
            return this.subtract(new Equation(value))
        }

        const p = new Polynom(value)
        this.#left.subtract(p)
        this.#right.subtract(p)

        return this
    }

    public test = (values: literalType<Fraction>): boolean => {
        return (this.left.evaluate(values) as Fraction).isEqual(this.right.evaluate(values))
    }

    public static isEquationString(equationString: string): boolean {
        // The equation sign can be one of the following:
        // =, <, >, <=, >=

        return equationString.includes('=') ||
            equationString.includes('<') ||
            equationString.includes('>') ||
            equationString.includes('<=') ||
            equationString.includes('>=')
    }

    public static makeSolutionsUnique(solutions: ISolution[], sorted?: boolean): ISolution[] {
        const solutionAsTex: string[] = [],
            uniqueSolutions = solutions.filter(sol => {
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

    // #endregion Properties and methods (26)

    // #region Getters And Setters (13)

    public get display(): string {
        return `${this.#left.display}${this.signAsTex}${this.#right.display}`
    }

    // Getter and setter
    public get left(): Polynom {
        return this.#left
    }

    public set left(value: Polynom) {
        this.#left = value
    }

    public get numberOfVars(): number {
        return this.variables.length
    }

    public get right(): Polynom {
        return this.#right
    }

    public set right(value: Polynom) {
        this.#right = value
    }

    // ------------------------------------------
    public get sign(): string {
        return this.#sign
    }

    public set sign(value: string) {
        // Set the sign value as formatted.
        this.#sign = this.#formatSign(value)
    }

    public get signAsTex(): string {
        if (this.#sign === '>=') {
            return '\\geq'
        }

        if (this.#sign === '<=') {
            return '\\leq'
        }

        return this.#sign
    }

    public get tex(): string {
        return `${this.#left.tex}${this.signAsTex}${this.#right.tex}`
    }

    public get variables(): string[] {
        return [...new Set(this.#right.variables.concat(this.#left.variables))]
    }

    // #endregion Getters And Setters (13)

    // #region Private methods (6)

    #findSign = (equationString: string): string | false => {
        if (equationString.includes('geq')) {
            return (equationString.includes('\\geq')) ? '\\geq' : 'geq'
        } else if (equationString.includes('leq')) {
            return (equationString.includes('\\leq')) ? '\\leq' : 'leq'
        } else if (equationString.includes('>=')) {
            return '>='
        } else if (equationString.includes('=>')) {
            return '=>'
        } else if (equationString.includes('>')) {
            return '>'
        } else if (equationString.includes('<=')) {
            return '<='
        } else if (equationString.includes('=<')) {
            return '=<'
        } else if (equationString.includes('<')) {
            return '<'
        } else if (equationString.includes('=')) {
            return '='
        }

        throw new Error('The equation is not valid (no sign found)')
    }

    // -----------------------------------------------
    // Equations solving algorithms
    #formatSign = (signStr?: string): EQUATION_SIGN => {
        if (signStr === undefined) {
            return '='
        }

        if (signStr.includes('geq')) {
            return '>='
        } else if (signStr.includes('>=')) {
            return '>='
        } else if (signStr.includes('=>')) {
            return '>='
        } else if (signStr.includes('>')) {
            return '>'
        } else if (signStr.includes('leq')) {
            return '<='
        } else if (signStr.includes('<=')) {
            return '<='
        } else if (signStr.includes('=<')) {
            return '<='
        } else if (signStr.includes('<')) {
            return '<'
        } else {
            return '='
        }
    }

    #reverseSign = (): this => {
        if (this.#sign === '=') {
            return this
        }

        if (this.#sign.includes('<')) {
            this.#sign.replace('<', '>')
            return this
        }
        if (this.#sign.includes('>')) {
            this.#sign.replace('>', '<')
            return this
        }

        return this
    }
    // #endregion Private methods (6)
}

// #endregion Classes (1)

// #region Enums (1)


// #endregion Enums (1)
