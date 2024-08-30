/**
 * Polynom module contains everything necessary to handle polynoms.*
 */
import { ShutingYard, ShutingyardType, Token } from 'piexpression/lib'
import { IAlgebra, IAnalyse, IExpression, InputAlgebra, InputValue, IPiMathObject, ISolution, literalType } from "../../pimath.interface.ts"
import { Fraction } from "../coefficients/fraction"
import { Numeric } from '../numeric.ts'
import { Equation } from "./equation"
import { EquationSolver } from './equationSolver.ts'
import { Monom } from './monom'

// #region Type aliases (1)

export type PolynomParsingType = InputValue<Polynom> | Monom

// #endregion Type aliases (1)

// #region Interfaces (1)

export interface IEuclidean {
    // #region Properties and methods (2)

    quotient: Polynom,
    reminder: Polynom

    // #endregion Properties and methods (2)
}

// #endregion Interfaces (1)

// #region Classes (1)

/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 * ```
 * let P = new Polynom('3x-4')
 * ```
 */
export class Polynom implements
    IPiMathObject<Polynom>,
    IExpression<Polynom>,
    IAnalyse<Polynom>,
    IAlgebra<Polynom> {
    // #region Class fields (8)

    #factors: Polynom[]
    #monoms: Monom[]

    // #endregion Class fields (8)

    // #region Constructors (7)

    constructor(value: InputValue<Fraction>)
    constructor(value: string)
    constructor(value: Monom)
    constructor(value: Polynom)
    constructor(...values: InputValue<Fraction>[])
    constructor(...values: InputAlgebra<Polynom>[])
    constructor(polynomString?: InputAlgebra<Polynom>, ...values: InputAlgebra<Fraction>[]) {
        this.#monoms = []
        this.#factors = []

        if (polynomString !== undefined) {
            this.parse(polynomString, ...values)
        }


        return this
    }

    // #endregion Constructors (7)

    // #region Properties and methods (49)

    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values
     */
    public parse = (inputStr: PolynomParsingType, ...values: InputAlgebra<Monom>[]): this => {
        // Reset the main variables.
        this.#monoms = []
        this.#factors = []



        // TODO: allow to enter a liste of Fraction (a, b, c, ...) to make a polynom ax^n + bx^(n-1) + cx^(n-2) + ...
        if (typeof inputStr === 'string') {
            return this._parseString(inputStr, ...values)
        } else if (
            (typeof inputStr === 'number' || inputStr instanceof Fraction || inputStr instanceof Monom)
            && (values.length === 0)
        ) { this.#monoms.push(new Monom(inputStr as Monom)) }
        else if (inputStr instanceof Monom && values.length > 0) {
            this.#monoms.push(new Monom(inputStr))
            values.forEach(m => {
                this.#monoms.push(new Monom(m as Monom))
            })
        } else if (inputStr instanceof Polynom) { for (const m of inputStr.monoms) { this.#monoms.push(m.clone()) } }



        return this
    }

    /**
     * Clone the polynom
     */
    public clone = (): Polynom => {
        const P = new Polynom()
        const M: Monom[] = []

        for (const m of this.#monoms) { M.push(m.clone()) }


        P.monoms = M

        return P
    }

    public add = (...values: InputAlgebra<Polynom>[]): Polynom => {

        for (const value of values) {
            if (value instanceof Polynom) { this.#monoms = this.#monoms.concat(value.monoms) }
            else if (value instanceof Monom) { this.#monoms.push(value.clone()) }
            else if (typeof value === "number" && Number.isSafeInteger(value)) { this.#monoms.push(new Monom(value.toString())) }
            else { this.#monoms.push(new Monom(value)) }
        }





        return this.reduce()
    }

    public commonMonom = (): Monom => {
        const M = new Monom().one()
        const numerator: number = this.gcdNumerator()
        const denominator: number = this.gcdDenominator()
        const degree = this.degree()

        M.coefficient = new Fraction(numerator, denominator)
        for (const L of this.variables) {
            // Initialize the setLetter with the max degree
            M.setLetter(L, degree)
            for (const m of this.#monoms) {
                M.setLetter(L, Fraction.min(m.degree(L), M.degree(L)))
                if (M.degree(L).isZero()) { break }

            }
        }
        return M
    }

    public degree = (letter?: string): Fraction => {
        let d: Fraction = new Fraction().zero()
        for (const m of this.#monoms) { d = Fraction.max(m.degree(letter).value, d) }

        return d
    }

    public derivative = (letter?: string): Polynom => {
        const dP = new Polynom()

        for (const m of this.#monoms) { dP.add(m.derivative(letter)) }

        return dP
    }

    public divide = (value: InputAlgebra<Polynom>): Polynom => {

        if (value instanceof Fraction) {
            return this._divideByFraction(value)
        }
        else if (typeof value === 'number' && Number.isSafeInteger(value)) {
            return this._divideByInteger(value)
        }
        else if (value instanceof Monom) {
            return this.divide(new Polynom(value))
        }
        else if (value instanceof Polynom) {
            if (value.monoms.length === 1 && value.variables.length === 0) {
                return this._divideByFraction(value.monoms[0].coefficient)
            }
            else {
                const { quotient, reminder } = this.euclidean(value)
                if (reminder.isZero()) { return quotient }
            }
        }

        throw new Error('Cannot divide by ${value.toString}')
    }

    public empty = (): this => {
        this.#monoms = []
        return this
    }

    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    public euclidean = (P: Polynom): IEuclidean => {
        const letter: string = P.variables[0]
        const quotient: Polynom = new Polynom().zero()
        const reminder: Polynom = this.clone().reorder(letter)

        // There is no variable - means it's a number
        if (P.variables.length === 0) {
            const q = this.clone().divide(P)

            return {
                quotient: q.reduce(),
                reminder: new Polynom().zero()
            }
        }

        // Get at least a letter
        const maxMP: Monom = P.monomByDegree(undefined, letter)
        const degreeP: Fraction = P.degree(letter)

        let newM: Monom

        // Make the euclidean division of the two polynoms.
        let MaxIteration = this.degree(letter).value * 2
        while (reminder.degree(letter).isGeq(degreeP) && MaxIteration > 0) {
            MaxIteration--

            // Get the greatest monom divided by the max monom of the divider
            newM = reminder.monomByDegree(undefined, letter).clone().divide(maxMP)

            if (newM.isZero()) { continue }

            // Get the new quotient and reminder.
            quotient.add(newM)
            reminder.subtract(P.clone().multiply(newM)).reduce()

            // Check if the reminder is zero.
            if (newM.degree(letter).isZero()) { break }
        }

        quotient.reduce()
        reminder.reduce()
        return { quotient, reminder }
    }

    public evaluate = (values: literalType<Fraction | number> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number => {
        // Return the numeric value, without using Fraction
        if (asNumeric) { return this._evaluateAsNumeric(values) }

        // Build the evaluated fraction
        const r = new Fraction().zero()
        this.#monoms.forEach(monom => {
            //console.log('Evaluate polynom: ', monom.display, values, monom.evaluate(values).display);
            r.add(monom.evaluate(values, asNumeric))
        })

        return r
    }

    // -------------------------------------
    /**
     * Factorize a polynom and store the best results in factors.
     * @param maxValue Defines the greatest value to search to (default is 20).
     */
    public factorize = (letter?: string): Polynom[] => {
        let factors: Polynom[] = []
        let P = this.clone().reorder()

        // Extract the common monom
        // 2x^3+6x^2 => 2x^2
        const M = P.commonMonom()
        // If the polynom starts with a negative monom, factorize it.
        if (P.monomByDegree().coefficient.isStrictlyNegative() && M.coefficient.isStrictlyPositive() && !M.isOne()) { M.opposite() }


        if (!M.isOne()) {
            const tempPolynom: Polynom = new Polynom(M)
            factors = [tempPolynom.clone()]
            P = P.euclidean(tempPolynom).quotient
        }

        // Main loop
        let securityLoop = P.degree().clone().multiply(2).value,
            maxDegree = 1
        while (securityLoop >= 0) {
            securityLoop--
            if (P.monoms.length < 2) {
                // The polynom has only one monom => 7x^2
                // No need to continue.
                if (!P.isOne()) {
                    factors.push(P.clone())
                    P.one()
                }
                break
            } else if (P.degree(letter).isOne()) {
                // The polynom is a first degree polynom => 3x-5
                // No need to continue
                factors.push(P.clone())
                P.one()
                break
            } else {
                // Create the list of all "potential" polynom dividers.
                let allDividers: Polynom[] = this._getAllPotentialFactors(P, maxDegree, letter ?? 'x')
                maxDegree = P.degree(letter).value

                // Actually: 100ms
                while (allDividers.length > 0) {
                    const div = allDividers[0]

                    if (!P.isDividableBy(div))
                    // Not dividable. Remove it from the list
                    { allDividers.shift() }
                    else {
                        // It's dividable - so make the division
                        const result = P.euclidean(div)

                        // Add the factor
                        factors.push(div)

                        // As it's dividable, get the quotient.
                        P = result.quotient.clone()

                        // filter all dividers that are no more suitable.
                        allDividers = allDividers.filter(x => {
                            const pX = P.monoms[0],
                                pC = P.monoms[P.monoms.length - 1],
                                dX = x.monoms[0],
                                dC = x.monoms[x.monoms.length - 1]

                            // Check last item (degree zero)
                            if (!pC.isDivisible(dC)) { return false }

                            // Check the first item (degree max)
                            return pX.isDivisible(dX)
                        })
                    }
                }
            }
        }

        // Maybe there is still something in the Polynom (not everything was possible to factorize)
        if (!P.isOne()) { factors.push(P.clone()) }


        // Save the factors
        this.#factors = factors

        return this.#factors
    }

    public gcdDenominator = (): number => {
        return Numeric.gcd(...this.getDenominators())
    }

    public gcdNumerator = (): number => {
        return Numeric.gcd(...this.getNumerators())
    }

    // Next functions are used for for commonMonom, which is used in the factorize method.
    public getDenominators = (): number[] => {
        const denominators: number[] = []
        for (const m of this.#monoms) { denominators.push(m.coefficient.denominator) }

        return denominators
    }

    public getNumerators = (): number[] => {
        const numerators: number[] = []
        for (const m of this.#monoms) { numerators.push(m.coefficient.numerator) }

        return numerators
    }

    public getZeroes = (): ISolution[] => {
        return new EquationSolver(
            new Equation(this, 0)
        ).solve()

    }

    public hasVariable(letter: string): boolean {
        return this.variables.includes(letter)
    }

    public integrate = (a: InputValue<Fraction>, b: InputValue<Fraction>, letter = 'x'): Fraction => {
        const primitive = this.primitive(letter)

        const valuesA: literalType<Fraction> = {},
            valuesB: literalType<Fraction> = {}

        valuesA[letter] = new Fraction(a)
        valuesB[letter] = new Fraction(b)

        return (primitive.evaluate(valuesB) as Fraction).subtract(primitive.evaluate(valuesA))
    }

    public inverse(): Polynom | undefined {
        return undefined
    }

    public isDeveloped = (polynomString: string): boolean => {
        let P: Polynom

        // Start by removing the parenthesis after a "power"
        const pString = polynomString.replaceAll(/\^\(([-0-9/]+)\)/g, '$1')

        // There is at least one parenthesis - it is not developed.
        if (pString.includes('(') || pString.includes(')')) { return false }


        // Try to build the polynom
        try {
            // Build the polynom
            P = new Polynom(polynomString)
        } catch (e) {
            return false
        }

        // Both polynom aren't the same (once developed and reduced => they cannot be equivalent)
        if (!this.isEqual(P)) { return false }


        // Check that everything is completely developed. Actually, there are no parentheses... so it is fully developed
        return true
    }

    public isDividableBy = (div: Polynom): boolean => {
        // Quick evaluation.
        if (div.degree().isOne()) {
            const zero = div.getZeroes()[0]

            if (zero.exact instanceof Fraction) { return (this.evaluate(zero.exact) as Fraction).isZero() }
            else { return false }

        } else {
            const { reminder } = this.euclidean(div)
            return reminder.isZero()
        }
    }

    public isEqual = (P: Polynom): boolean => {
        return this._compare(P, '=')
    }

    public isOne(): boolean {
        return this.#monoms.length === 1 && this.#monoms[0].coefficient.isOne()
    }

    public isOppositeAt = (P: Polynom): boolean => {
        return this._compare(P.clone().opposite(), '=')
    }

    public isReduced = (polynomString: string): boolean => {
        // The polynom must be developed to be reduced.
        if (!this.isDeveloped(polynomString)) { return false }


        const P = new Polynom(polynomString)
        if (P.monoms.length > this.monoms.length) { return false }


        // TODO: Not ur the reduced system checking is working properly !
        for (const m of P.monoms) { if (!m.coefficient.isReduced()) { return false } }




        return false
    }

    public isSameAs = (P: Polynom): boolean => {
        return this._compare(P, 'same')
    }

    public isZero(): boolean {
        return (this.#monoms.length === 1 && this.#monoms[0].coefficient.isZero()) || this.#monoms.length === 0
    }

    public lcmDenominator = (): number => {
        return Numeric.lcm(...this.getDenominators())
    }

    public lcmNumerator = (): number => {
        return Numeric.lcm(...this.getNumerators())
    }

    public letters = (): string[] => {
        let S = new Set<string>()

        for (const m of this.#monoms) { S = new Set([...S, ...m.variables]) }


        return [...S]
    }

    public limitToInfinity = (letter?: string): Fraction => {
        const M = this.monomByDegree(undefined, letter),
            sign = M.coefficient.sign(),
            degree = M.degree(letter)

        if (degree.isStrictlyPositive()) { return sign === 1 ? (new Fraction()).infinite() : (new Fraction()).infinite().opposite() }
        else if (degree.isZero()) { return M.coefficient }


        // Any other cases
        return (new Fraction()).zero()
    }

    public limitToNegativeInfinity = (letter?: string): Fraction => {
        const M = this.monomByDegree(undefined, letter),
            sign = M.coefficient.sign(),
            degree = M.degree(letter)

        if (degree.isStrictlyPositive()) { return sign === -1 ? (new Fraction()).infinite() : (new Fraction()).infinite().opposite() }
        else if (degree.isZero()) { return M.coefficient }


        // Any other cases
        return (new Fraction()).zero()
    }

    public monomByDegree = (degree?: Fraction | number, letter?: string): Monom => {
        if (degree === undefined)
        // return the highest degree monom.
        { return this.monomByDegree(this.degree(letter), letter) }


        // Reduce the polynom.
        const M = this.clone().reduce()
        for (const m of M.#monoms) { if (m.degree(letter).isEqual(degree)) { return m.clone() } }




        // Nothing was found - return the null monom.
        return new Monom().zero()
    }

    // Used in LinearSystem.tex
    public monomByLetter = (letter: string): Monom => {
        const M = this.clone().reduce()
        for (const m of M.#monoms) { if (m.hasVariable(letter)) { return m.clone() } }


        return new Monom().zero()
    }

    public monomsByDegree = (degree?: number | Fraction, letter?: string): Monom[] => {
        if (degree === undefined)
        // return the highest degree monom.
        { return this.monomsByDegree(this.degree(letter)) }

        // Reduce the polynom.
        const Ms: Monom[] = []

        const M = this.clone().reduce()
        for (const m of M.#monoms) { if (m.degree(letter) === degree) { Ms.push(m.clone()) } }




        return Ms
        // Nothing was found - return
    }

    public multiply = (value: unknown): Polynom => {

        if (value instanceof Polynom) { return this._multiplyByPolynom(value) }
        else if (value instanceof Fraction) { return this._multiplyByFraction(value) }
        else if (value instanceof Monom) { return this._multiplyByMonom(value) }
        else if (Number.isSafeInteger(value) && typeof value === 'number') { return this._multiplyByInteger(value) }


        // Something went wrong...
        return this
    }

    public one = (): this => {
        this.#monoms = []
        this.#monoms.push(new Monom().one())
        return this
    }

    // ------------------------------------------
    public opposite = (): this => {
        this.#monoms = this.#monoms.map(m => m.opposite())
        return this
    }

    public pow = (nb: number): Polynom => {
        if (!Number.isSafeInteger(nb)) { return this.zero() }

        if (nb < 0) { return this.zero() }

        if (nb === 0) { return new Polynom() }


        const P = this.clone()
        for (let i = 1; i < nb; i++) { this.multiply(P) }

        return this.reduce()
    }

    public primitive = (letter?: string): Polynom => {
        const dP = new Polynom()

        for (const m of this.#monoms) { dP.add(m.primitive(letter)) }

        return dP
    }

    public reduce = (): Polynom => {
        // Reduce the polynom

        // Group the monoms by similarity
        let i = 0
        while (i < this.#monoms.length) {
            for (let j = i + 1; j < this.#monoms.length; j++) {
                if (this.#monoms[i].isSameAs(this.#monoms[j])) {
                    this.#monoms[i].add(this.#monoms[j])
                    this.#monoms.splice(j, 1)
                    if (this.#monoms[i].isZero()) { this.#monoms[i] = new Monom().zero() }

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
        for (const m of this.#monoms) { m.coefficient.reduce() }


        if (this.length === 0) { return new Polynom().zero() }


        return this.reorder()
    }

    public reorder = (letter = 'x', revert?: boolean): this => {
        if (revert === undefined) { revert = false }

        // TODO: Must handle multiple setLetter reorder system
        const otherLetters = this.variables.filter(x => x !== letter)
        this.#monoms.sort(function (a, b) {
            const da = a.degree(letter).value,
                db = b.degree(letter).value

            // Values are different
            if (da !== db) { return revert ? da - db : db - da }

            // if values are equals, check other letters - it must be revert in that case !
            if (otherLetters.length > 0) {
                for (const L of otherLetters) {
                    const da = a.degree(L).value,
                        db = b.degree(L).value

                    // Values are different
                    if (da !== db) { return revert ? da - db : db - da }
                }
            }




            return 0
        })

        return this
    }

    /**
     * Replace a variable (letter) by a polynom.
     * @param letter
     * @param P
     */
    public replaceBy = (letter: string, P: Polynom): this => {
        let pow: Fraction
        const resultPolynom: Polynom = new Polynom().zero()

        for (const m of this.monoms) {
            if (!m.hasVariable(letter) || m.literal[letter].isZero()) { resultPolynom.add(m.clone()) }
            else {
                // We have found a variable to replace.

                // Get the power.
                pow = m.literal[letter].clone()

                // Remove the variable from the monom
                m.removeVariable(letter)

                // Add the new monom to the result polynom
                resultPolynom.add(P.clone().pow(Math.abs(pow.numerator)).multiply(m))
            }
        }




        // Reduce the monoms
        this.#monoms = resultPolynom.reduce().monoms
        return this
    }

    public root(): Polynom {
        throw new Error('Cannot take the root from a polynom')
    }

    public sqrt(): Polynom {
        throw new Error('Cannot take the square root from a polynom')
    }

    public subtract = (...values: InputAlgebra<Polynom>[]): Polynom => {
        for (const value of values) {
            if (value instanceof Polynom) { this.add(value.clone().opposite()) }
            else if (value instanceof Monom) { this.#monoms.push(value.clone().opposite()) }
            else { this.#monoms.push(new Monom(value).opposite()) }
        }




        return this.reduce()
    }

    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    public zero = (): this => {
        this.#monoms = []
        this.#monoms.push(new Monom().zero())
        return this
    }

    // #endregion Properties and methods (49)

    // #region Getters And Setters (22)

    // ------------------------------------------

    public get display(): string {
        return this.genDisplay()
    }


    public get isMultiVariable(): boolean {
        // Determine if a monom has more than one variable.
        return this.#monoms.some(m => m.variables.length > 1)
    }

    public get length() {
        // TODO: Must reduce the monoms list to remove the zero coefficient.
        return this.#monoms.length
    }

    // ------------------------------------------
    public get monoms() {
        return this.#monoms
    }

    public set monoms(M: Monom[]) {
        this.#monoms = M
    }

    public get numberOfVars(): number {
        return this.variables.length
    }

    public get plotFunction(): string {
        return this.genDisplay('tex', false, false, true)
    }

    public get tex(): string {
        return this.genDisplay('tex')
    }

    public get variables(): string[] {
        let V: string[] = []

        for (const m of this.#monoms) { V = V.concat(m.variables) }


        // Remove duplicates.
        V = [...new Set(V)]
        V.sort()
        return V
    }

    public get zeroes(): ISolution[] {
        return this.getZeroes()
    }

    // #endregion Getters And Setters (22)

    // #region Private methods (15)

    private _compare = (P: Polynom, sign?: string): boolean => {
        if (sign === undefined) { sign = '=' }

        // Create clone version to reduce them without altering the original polynoms.
        const cP1 = this.clone().reduce()
        const cP2 = P.clone().reduce()

        switch (sign) {
            case '=':
                // They must have the isSame length and the isSame degree
                if (cP1.length !== cP2.length || cP1.degree().isNotEqual(cP2.degree())) { return false }


                // Check if the coefficients are the isSame.
                return cP1.monoms
                    .every((m1, index) => m1.isEqual(cP2.monoms[index]))

            case 'same':
                // They must have the same length and the same degree
                if (cP1.length !== cP2.length || !cP1.degree().isEqual(cP2.degree())) { return false }

                return cP1.monoms
                    .every((m1, index) => m1.isSameAs(cP2.monoms[index]))


            default:
                return false
        }
    }

    private _divideByFraction = (F: Fraction): this => {
        for (const m of this.#monoms) { m.coefficient.divide(F) }

        return this
    }

    private _divideByInteger = (nb: number): this => {
        const nbF = new Fraction(nb)
        for (const m of this.#monoms) { m.coefficient.divide(nbF) }

        return this
    }

    private _evaluateAsNumeric = (values: literalType<number | Fraction> | InputValue<Fraction>): number => {
        let r = 0
        this.#monoms.forEach(monom => {
            r += monom.evaluate(values, true) as number
        })

        return r
    }

    private _factorize2ndDegree = (letter: string): Polynom[] => {
        let P1: Polynom, P2: Polynom,
            a, b, c, delta, x1, x2, factor

        // One variable only
        if (this.numberOfVars === 1) {
            a = this.monomByDegree(2, letter).coefficient
            b = this.monomByDegree(1, letter).coefficient
            c = this.monomByDegree(0, letter).coefficient
            delta = b.clone().pow(2).subtract(a.clone().multiply(c).multiply(4))

            if (delta.isZero()) {
                x1 = b.clone().opposite().divide(a.clone().multiply(2))
                P1 = new Polynom(letter).subtract(x1.display).multiply(x1.denominator)
                P2 = new Polynom(letter).subtract(x1.display).multiply(x1.denominator)
                factor = a.divide(x1.denominator).divide(x1.denominator)

                if (!factor.isOne())
                // TODO: Update new Polynom to accept anything...
                { return [new Polynom(factor.display), P1, P2] }
                else { return [P1, P2] }

            } else if (delta.isPositive() && delta.isSquare()) {
                x1 = b.clone().opposite()
                    .add(delta.clone().sqrt())
                    .divide(a.clone().multiply(2))
                x2 = b.clone().opposite()
                    .subtract(delta.clone().sqrt())
                    .divide(a.clone().multiply(2))

                // (2x+5)(3x-2)
                // 6x^2+11x-10
                // a = 6, b = 11, c = -10
                // delta = 121-4*6*(-10) = 361= 19^2
                // x1 = (-11 + 19)  / 12 = 8/12 = 2/3
                // x2 = (-11 - 19)  / 12 = -30/12 = -5/2
                factor = a.divide(x1.denominator).divide(x2.denominator)
                if (factor.isOne()) {
                    return [
                        new Polynom(letter).subtract(x1.display).multiply(x1.denominator),
                        new Polynom(letter).subtract(x2.display).multiply(x2.denominator),
                    ]
                }


                else {
                    return [
                        new Polynom(factor.display),
                        new Polynom(letter).subtract(x1.display).multiply(x1.denominator),
                        new Polynom(letter).subtract(x2.display).multiply(x2.denominator),
                    ]
                }



            } else
            // No solution possible - return the complete value.
            { return [this.clone()] }

        } else {
            // If multiple variables, only handle perfect squares...
            a = this.monomByDegree(2, letter)
            b = this.monomByDegree(1, letter)
            c = this.monomByDegree(0, letter)

            if (a.isLiteralSquare() && c.isLiteralSquare())
            // Check the middle item is same as...


            {
                if (b.clone().pow(2).isSameAs(a.clone().multiply(c))) {
                    // Determine if the coefficient values matches.

                    // Search 4 values (r, s, t, u) that matches:
                    // (r X + s Y)(t X + u Y) = rt X^2 + (ru + st) XY + su Y^2

                    const xPolynom = new Polynom('x', a.coefficient, b.coefficient, c.coefficient)
                    const xFactors = xPolynom._factorize2ndDegree('x')

                    const factors = []
                    let xyzPolynom: Polynom

                    if (xFactors.length >= 2) {
                        for (const p of xFactors) {
                            if (p.degree().isZero()) { factors.push(p.clone()) }
                            else {
                                xyzPolynom = p.clone()
                                xyzPolynom.monoms[0].literal = a.literalSqrt
                                xyzPolynom.monoms[1].literal = c.literalSqrt
                                factors.push(xyzPolynom.clone())
                            }
                        }



                        return factors
                    }
                }
            }




            return [this.clone()]
        }
    }

    private _factorizeByGroups = (): Polynom[] => {
        // TODO: Factorize by groups.
        return []
    }

    private _getAllPotentialFactors = (P: Polynom, maxDegree: number, letter: string): Polynom[] => {
        const m1 = P.monoms[0].dividers,
            m2 = P.monoms[P.monoms.length - 1].dividers

        const allDividers: Polynom[] = []
        m1.forEach(m1d => {
            // Get only polynom that has a degree less than a specific value
            if (m1d.degree(letter).isLeq(maxDegree)) {
                m2.forEach(m2d => {
                    if (m1d.degree(letter).isNotEqual(m2d.degree(letter))) {
                        allDividers.push(new Polynom(m1d, m2d))
                        allDividers.push(new Polynom(m1d, m2d.clone().opposite()))
                    }
                })
            }



        })

        return allDividers
    }

    private _multiplyByFraction = (F: Fraction): Polynom => {
        for (const m of this.#monoms) { m.coefficient.multiply(F) }


        return this.reduce()
    }

    private _multiplyByInteger = (nb: number): Polynom => {
        return this._multiplyByFraction(new Fraction(nb))
    }

    private _multiplyByMonom = (M: Monom): Polynom => {
        for (const m of this.#monoms) { m.multiply(M) }

        return this.reduce()
    }

    private _multiplyByPolynom = (P: Polynom): Polynom => {
        const M: Monom[] = []
        for (const m1 of this.#monoms) { for (const m2 of P.monoms) { M.push(Monom.xMultiply(m1, m2)) } }




        this.#monoms = M
        return this.reduce()
    }

    private _parseString(inputStr: string, ...values: unknown[]): this {
        if (values.length === 0) {
            inputStr = '' + inputStr

            // Parse the polynom using the shutting yard algorithm
            if (inputStr !== '' && !isNaN(Number(inputStr))) {
                this.empty()
                // It's a simple number.
                const m = new Monom(inputStr)
                // m.coefficient = new Fraction(inputStr);
                // m.literalStr = '';
                this.add(m)
                return this
            }

            // Parse the string.
            return this._shutingYardToReducedPolynom(inputStr)
        } else if (/^[a-z]+/.test(inputStr)) {
            // We assume the inputStr contains only letters.
            this.empty()

            const fractions = values.map(x => new Fraction(x as InputValue<Fraction>))

            // Multiple setLetter version

            if (inputStr.length > 1) {
                // TODO: check that the number of values given correspond to the letters (+1 eventually)
                const letters = inputStr.split('')
                let i = 0

                for (const F of fractions) {
                    const m = new Monom()
                    m.coefficient = F.clone()
                    m.literalStr = letters[i] || ''
                    this.add(m)
                    i++
                }
            }
            // Single setLetter version
            else {
                let n = fractions.length - 1
                for (const F of fractions) {
                    const m = new Monom()
                    m.coefficient = F.clone()
                    m.literalStr = `${inputStr}^${n}`
                    this.add(m)
                    n--
                }
            }
            return this
        } else { return this.zero() }

    }

    private _shutingYard_addToken = (stack: Polynom[], element: Token): void => {
        switch (element.tokenType) {
            case ShutingyardType.COEFFICIENT:
                stack.push(new Polynom(element.token))
                break

            case ShutingyardType.VARIABLE:
                stack.push(new Polynom().add(new Monom(element.token)))
                break

            case ShutingyardType.CONSTANT:
                // TODO: add constant support to Polynom parsing.
                console.log('Actually, not supported - will be added later !')
                break

            case ShutingyardType.OPERATION:
                if (stack.length >= 2) {
                    const b = stack.pop(),
                        a = stack.pop()

                    // Check if the polynoms are not undefined.
                    if (a === undefined || b === undefined) { break }

                    if (element.token === '+') { stack.push(a.add(b)) }
                    else if (element.token === '-') { stack.push(a.subtract(b)) }
                    else if (element.token === '*') { stack.push(a.multiply(b)) }
                    else if (element.token === '/') {
                        if (b.degree().isStrictlyPositive()) { console.log('divide by a polynom -> should create a rational polynom !') }
                        else {
                            // a.divide(b.monoms[0].coefficient)
                            stack.push(a.divide(b.monoms[0].coefficient))
                        }
                    }

                    else if (element.token === '^') {
                        if (b.degree().isStrictlyPositive()) { console.error('Cannot elevate a polynom with another polynom !', a.tex, b.tex) }
                        else
                            if (b.monoms[0].coefficient.isRelative())
                            // Integer power
                            { stack.push(a.pow(b.monoms[0].coefficient.value)) }
                            else {
                                // Only allow power if the previous polynom is only a monom, without coefficient.
                                if (a.monoms.length === 1 && a.monoms[0].coefficient.isOne()) {
                                    for (const letter in a.monoms[0].literal) { a.monoms[0].literal[letter].multiply(b.monoms[0].coefficient) }

                                    stack.push(a)
                                } else {
                                    console.error('Cannot have power with fraction')
                                }
                            }
                    }

                } else
                    if (element.token === '-') {
                        const a = stack.pop()
                        if (a) { stack.push(a.opposite()) }
                    }
                    else {
                        throw new Error("Error parsing the polynom")
                    }


                break

            case ShutingyardType.MONOM:
                // Should never appear.
                console.error('The monom token should not appear here')
                break

            case ShutingyardType.FUNCTION:
                // Should never appear.
                console.error('The function token should not appear here - might be introduced later.')
                break
        }


    }

    private genDisplay = (output?: string, forceSign?: boolean, wrapParentheses?: boolean, withAllMultiplicationSign?: boolean): string => {
        let P = ''

        for (const k of this.#monoms) {
            if (k.coefficient.value === 0) { continue }


            // The monom to be displayed
            let m
            if (withAllMultiplicationSign) { m = k.plotFunction }
            else { m = (output === 'tex') ? k.tex : k.display }


            P += `${(k.coefficient.sign() === 1 && (P !== '' || forceSign === true)) ? '+' : ''}${m}`
        }

        if (wrapParentheses === true && this.length > 1) {
            if (output === 'tex') { P = `\\left( ${P} \\right)` }
            else { P = `(${P})` }
        }





        if (P === '') { P = '0' }

        return P
    }

    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    private _shutingYardToReducedPolynom = (inputStr: string): this => {
        // Get the RPN array of the current expression
        const SY: ShutingYard = new ShutingYard().parse(inputStr)
        const rpn: { token: string, tokenType: ShutingyardType }[] = SY.rpn

        // New version for reducing shuting yard.
        this.zero()

        const stack: Polynom[] = []

        // Loop through the each element of the RPN
        for (const element of rpn) {
            this._shutingYard_addToken(stack, element)
        }


        if (stack.length === 1) { this.add(stack[0]) }


        return this.reorder()
    }

    // #endregion Private methods (15)
}

// #endregion Classes (1)
