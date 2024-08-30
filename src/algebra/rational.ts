/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */

import { IAlgebra, IAnalyse, IExpression, InputAlgebra, InputValue, IPiMathObject, literalType } from "../../pimath.interface"
import { Fraction } from "../coefficients/fraction"
import { Polynom } from "./polynom"

/**
 * Rational class can handle rational polynoms
 */

export class Rational implements
    IPiMathObject<Rational>,
    IExpression<Rational>,
    IAnalyse<Rational>,
    IAlgebra<Rational> {

    #numerator: Polynom
    #denominator: Polynom

    constructor()
    constructor(value: Rational)
    constructor(numerator: InputAlgebra<Polynom>, denominator?: InputAlgebra<Polynom>)
    constructor(value?: InputAlgebra<Polynom> | Rational, denominator?: InputAlgebra<Polynom>) {

        if (value === undefined) {
            this.#numerator = new Polynom().zero()
            this.#denominator = new Polynom().one()
        } else if (value instanceof Rational) {
            return value.clone()
        } else {
            this.#numerator = new Polynom(value)
            this.#denominator = new Polynom(denominator ?? 1)
        }
    }

    get tex(): string {
        return `\\frac{ ${this.#numerator.tex} }{ ${this.#denominator.tex} }`
    }
    get display(): string {
        return `(${this.#numerator.display})/(${this.#denominator.display})`
    }

    get numerator(): Polynom {
        return this.#numerator
    }
    get denominator(): Polynom {
        return this.#denominator
    }

    clone(): Rational {
        return new Rational(
            this.#numerator.clone(),
            this.#denominator.clone()
        )
    }

    parse(): Rational {
        throw new Error("Method not implemented.")
    }

    zero(): this {
        this.#numerator.zero()
        this.#denominator.one()

        return this
    }
    one(): this {
        this.#numerator.one()
        this.#denominator.one()

        return this
    }

    add(value: InputValue<Rational>): Rational {
        throw new Error("Method not implemented.")
    }

    subtract(value: InputValue<Rational>): Rational {
        throw new Error("Method not implemented.")
    }

    opposite(): this {
        this.#numerator.opposite()

        return this
    }
    multiply(value: InputValue<Rational>): this {
        if (value instanceof Rational) {
            this.#numerator.multiply(value.numerator)
            this.#denominator.multiply(value.denominator)
        } else {
            this.#numerator.multiply(value)
        }

        return this
    }

    divide(value: InputValue<Rational>): this {
        return this.inverse().multiply(value)
    }

    reduce(): Rational {
        throw new Error("Method not implemented.")
    }
    isEqual(value: InputValue<Rational>): boolean {
        throw new Error("Method not implemented.")
    }
    isZero(): boolean {
        return this.#numerator.isZero()
    }
    isOne(): boolean {
        return this.#numerator.isOne() && this.#denominator.isOne()
    }
    inverse(): this {
        const num = this.#numerator.clone(),
            den = this.#denominator.clone()

        this.#numerator = den
        this.#denominator = num

        return this
    }
    pow(value: number): Rational {
        if (!Number.isSafeInteger(value)) {
            throw new Error('Cannot take the power of a polynom with a non integer value')
        }

        if (value < 0) {
            return this.inverse().pow(-value)
        }

        this.#numerator.pow(value)
        this.#denominator.pow(value)

        return this
    }

    sqrt(): Rational | undefined {
        throw new Error('Cannot take the square root from a polynom')
    }

    root(): Rational | undefined {
        throw new Error('Cannot take the nth root from a polynom')
    }

    derivative(): Rational | Rational[] {
        throw new Error("Method not implemented.")
    }
    primitive(): Rational {
        throw new Error("Method not implemented.")
    }
    integrate(a: InputValue<Fraction>, b: InputValue<Rational>, letter?: string): Fraction {
        throw new Error("Method not implemented.")
    }

    get variables(): string[] {
        const num = this.#numerator.variables,
            den = this.#denominator.variables

        return [...new Set([...num, ...den])]
    }

    hasVariable(letter: string): boolean {
        return this.#numerator.hasVariable(letter) || this.#denominator.hasVariable(letter)
    }

    degree(): Fraction {
        throw new Error("Getting the degree of a rational polynom is not possible")
    }

    evaluate(values: literalType<Fraction | number> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number | boolean {

        const N = this.#numerator.evaluate(values, asNumeric),
            D = this.#denominator.evaluate(values, asNumeric)

        if (N instanceof Fraction && D instanceof Fraction) {
            return N.divide(D)
        }


        return (N as number) / (D as number)

    }
}


// class RationalOld {
//     #denominator: Polynom
//     #numerator: Polynom

//     /**
//      *
//      * @param numerator
//      * @param denominator
//      */
//     constructor(numerator?: Polynom | string, denominator?: Polynom | string) {
//         if (numerator instanceof Polynom) {
//             this.#numerator = numerator.clone()
//         } else if (typeof numerator === 'string') {
//             this.#numerator = new Polynom(numerator)
//         } else {
//             this.#numerator = new Polynom()
//         }

//         if (denominator instanceof Polynom) {
//             this.#denominator = denominator.clone()
//         } else if (typeof denominator === 'string') {
//             this.#denominator = new Polynom(denominator)
//         } else {
//             this.#denominator = new Polynom()
//         }

//     }

//     get numerator(): Polynom {
//         return this.#numerator
//     }

//     get denominator(): Polynom {
//         return this.#denominator
//     }

//     get tex(): string {
//         return `\\frac{ ${this.#numerator.tex} }{ ${this.#denominator.tex} }`
//     }

//     get display(): string {
//         return `(${this.#numerator.display})/(${this.#denominator.display})`
//     }
//     get plotFunction(): string {
//         return `(${this.#numerator.plotFunction})/(${this.#denominator.plotFunction})`
//     }

//     clone = (): Rational => {
//         return new Rational(
//             this.#numerator.clone(),
//             this.#denominator.clone()
//         )
//     }

//     domain = (): string => {
//         const zeroes = this.#denominator.getZeroes()

//         if (zeroes.length === 0 || zeroes[0].tex === PARTICULAR_SOLUTION.real.toString()) {
//             return PARTICULAR_SOLUTION.varnothing
//         } else if (zeroes[0].tex === PARTICULAR_SOLUTION.varnothing.toString()) {
//             return PARTICULAR_SOLUTION.real
//         } else {
//             return '\\mathbb{R}\\setminus\\left\\{' +
//                 zeroes.map(x => x.tex).join(';') + '\\right\\}'
//         }
//     }

//     amplify = (P: Polynom): this => {
//         this.#numerator.multiply(P)
//         this.#denominator.multiply(P)

//         return this
//     }

//     derivative = (letter?: string): this => {
//         const N = this.#numerator.clone(),
//             D = this.#denominator.clone(),
//             dN = N.clone().derivative(letter),
//             dD = D.clone().derivative(letter)

//         this.#numerator = dN.clone().multiply(D).subtract(N.clone().multiply(dD))
//         this.#denominator = D.clone().pow(2)

//         return this
//     }

//     factorize = (letter?: string): this => {
//         this.#numerator.factorize(letter)
//         this.#denominator.factorize(letter)
//         return this
//     }

//     simplify = (P: Polynom): this => {
//         const NumeratorEuclidien = this.#numerator.euclidean(P)
//         if (!NumeratorEuclidien.reminder.isZero()) {
//             return this
//         }

//         const DenominatorEuclidien = this.#denominator.euclidean(P)
//         if (!DenominatorEuclidien.reminder.isZero()) {
//             return this
//         }

//         this.#numerator = NumeratorEuclidien.quotient
//         this.#denominator = DenominatorEuclidien.quotient
//         return this
//     }

//     reduce = (): this => {
//         this.#numerator.factorize()
//         for (const f of this.#numerator.factors) {

//             if (f.degree().isZero()) {
//                 // Do the simplify only if the factor can divide the denominator
//                 if (this.#denominator.commonMonom().coefficient.clone().divide(f.monomByDegree().coefficient).isNatural()) {
//                     this.simplify(f)
//                 }
//             } else {
//                 this.simplify(f)
//             }
//         }

//         return this
//     }

//     opposite = (): this => {
//         this.#numerator.opposite()
//         return this
//     }

//     add = (R: Rational): this => {
//         // 1. Make sure both rational are at the same denominator
//         // 2. Add the numerators.
//         // 3. Simplify

//         // Store the adding denominator
//         const denominator = this.#denominator.clone()

//         // Amplif the main rational polynom by the adding denominator
//         this.amplify(R.#denominator)

//         // Add to the numerator the adding value...
//         this.#numerator.add(R.#numerator.clone().multiply(denominator))

//         return this
//     }

//     subtract = (R: Rational): this => {
//         return this.add(R.clone().opposite())
//     }

//     euclidian = (): IEuclidean => {
//         return this.#numerator.euclidean(this.#denominator)
//     }

//     // TODO : where and how is used limits ?
//     limits = (value: Fraction | number, offset?: string, letter?: string): Fraction => {
//         if (value === Infinity || value === -Infinity) {
//             const { quotient, reminder } = this.#numerator.clone().euclidean(this.#denominator)

//             // quotient is positive => it will be infinite.
//             if (quotient.degree(letter).isStrictlyPositive()) {
//                 return value === Infinity ? quotient.limitToInfinity(letter) : quotient.limitToNegativeInfinity(letter)
//                 // return quotient.monomByDegree(undefined, letter).coefficient.sign()===1?(new Fraction()).infinite():(new Fraction()).infinite().opposite()
//             } else {
//                 return quotient.monomByDegree(undefined, letter).coefficient
//             }
//         } else {
//             let evalValues: literalType = {},
//                 evalValuesOffset: literalType = {},
//                 theLimit: Fraction | number,
//                 theSign: number,
//                 FR = this.clone().reduce()

//             evalValues[letter === undefined ? 'x' : letter] = new Fraction(value)

//             if (offset !== 'above' && offset !== 'below') {
//                 theLimit = FR.#numerator.evaluate(evalValues)
//                     .divide(FR.#denominator.evaluate(evalValues))

//                 return theLimit.isInfinity() ? theLimit.abs() : theLimit
//             } else {
//                 if (offset === 'above') {
//                     evalValuesOffset[letter === undefined ? 'x' : letter] = (new Fraction(value)).add(0.000001)
//                 } else if (offset === 'below') {
//                     evalValuesOffset[letter === undefined ? 'x' : letter] = (new Fraction(value)).subtract(0.000001)
//                 }

//                 theLimit = FR.#numerator.evaluate(evalValues)
//                     .divide(FR.#denominator.evaluate(evalValues))
//                 theSign = FR.#numerator.evaluate(evalValuesOffset)
//                     .divide(FR.#denominator.evaluate(evalValuesOffset)).sign()

//                 if (theLimit.isInfinity()) {
//                     return theSign === 1 ? theLimit.abs() : theLimit.abs().opposite()
//                 } else {
//                     return theLimit
//                 }
//             }
//         }
//     }

//     evaluate = (values: literalType | Fraction | number): Fraction => {
//         const r = new Fraction().zero()

//         const N = this.#numerator.evaluate(values),
//             D = this.#denominator.evaluate(values)

//         return N.divide(D)
//     }

//     evaluateAsNumeric = (values: Record<string, number> | number): number => {
//         return this.#numerator._evaluateAsNumeric(values) / this.#denominator._evaluateAsNumeric(values)
//     }

//     study = (config?: StudyConfig | string): RationalStudy => {
//         return new RationalStudy(this, config)
//     }
// }
