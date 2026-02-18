import {Fraction} from "./fraction"
import type {IExpression, InputValue, IPiMathObject} from "../pimath.interface"
import {stripParenthesis} from "../helpers"
import {Numeric} from "../numeric"

export class Root implements IPiMathObject<Root>, IExpression<Root> {
    #factor: Fraction
    #index: number
    #radical: Fraction
    #withSign = false

    constructor(value?: InputValue<Root | Fraction>) {
        this.#index = 2
        this.#factor = new Fraction().zero()
        this.#radical = new Fraction().zero()

        if (value) {
            this.parse(value)
        }


        return this
    }

    parse(value: InputValue<Root | Fraction>): this {
        // should be able to parse "display" roots.
        // sqrt12 or sqrt(12) or sqrt(12/5) => [2, 12 or 12/5, 1]
        // root(n)10 or root(n)(10) or root(n)(10/3) => [n, 10 or 10/3, 1]
        // 7sqrt12 or 7sqrt(12) or 7sqrt(12/5) => [2, 12 or 12/5, 7]
        // 7root(n)10 or 7root(n)(10) or 7root(n)(10/3) => [n, 10 or 10/3, 7]

        if (value instanceof Root) {
            this.index = value.index
            this.radical = value.radical.clone()
            this.factor = value.factor.clone()

            return this
        }

        if (value instanceof Fraction) {
            this.index = 2
            this.factor = value.clone()
            this.radical.one()

            return this
        }

        if (typeof value === "string") {
            if (value.includes('sqrt')) {
                return this.#parse_sqrt(value)
            }

            if (value.includes('root')) {
                return this.#parse_root(value)
            }
        }

        this.index = 2
        this.factor = new Fraction(value)
        this.radical.one()

        return this
    }

    clone(): Root {
        return new Root().from(this.index, this.radical, this.factor)
    }

    get tex(): string {
        // b \sqrt{}
        // b
        // \sqrt{}
        // -\sqrt{}

        // Force the plus sign.
        const plus = this.#withSign && this.factor.isPositive() ? '+' : ''

        if (this.value === 0) return `${plus}0`

        const den = this.#makeTeXLine(this.#factor.denominator, this.#radical.denominator)
        const num = this.#makeTeXLine(this.#factor.numerator, this.#radical.numerator) ?? '1'

        if (den === null) return `${plus}${num}`

        return `${plus}\\frac{ ${num} }{ ${den} }`
    }

    get display(): string {
        // force the '+' sign if asked
        const plus = this.#withSign && this.factor.isPositive() ? '+' : ''

        if (this.value === 0) return `${plus}0`

        const den = this.#makeDisplayLine(this.#factor.denominator, this.#radical.denominator, true)
        const num = this.#makeDisplayLine(this.#factor.numerator, this.#radical.numerator, den !== null) ?? '1'

        if (den === null) return `${plus}${num}`

        return `${plus}${num}/${den}`
    }

    add(value: InputValue<Root>): this {
        // start by reducing
        this.reduce()
        const rt = new Root(value).reduce()

        if (
            this.index !== rt.index ||
            !this.radical.isEqual(rt.radical)
        ) {
            throw new Error("Add can only be done with two same index and radical")
        }

        this.factor.add(rt.factor)

        return this
    }

    divide(value: InputValue<Root>): this {
        return this.multiply(new Root(value).inverse())
    }

    get factor(): Fraction {
        return this.#factor
    }

    set factor(value: Fraction) {
        this.#factor = value
    }

    from(index: number, radical: InputValue<Fraction>, factor?: InputValue<Fraction>): this {
        // set the index
        this.index = index

        // set the racial
        this.radical = new Fraction(radical)

        // set the factor if any
        this.factor = factor ? new Fraction(factor) : new Fraction().one()

        return this
    }

    /**
     * convert to root(index)(radical), without factor
     */
    group(): this {
        this.radical.multiply(this.factor.pow(this.index))
        this.factor.one()

        return this
    }

    get index(): number {
        return this.#index
    }

    set index(value: number) {
        if (!Number.isSafeInteger(value) || value <= 0) {
            throw new Error("Index must be a strictly positive integer.")
        }
        this.#index = value
    }

    get indexAsPow(): Fraction {
        return new Fraction(this.index).inverse()
    }

    inverse(): this {
        this.factor.inverse()
        this.radical.inverse()
        return this
    }

    isEqual(root: Root): boolean {
        return this.value === root.value
    }

    isOne(): boolean {
        return this.factor.isOne() && this.radical.isOne()
    }

    isRational(): boolean {
        const reduced = this.clone().reduce()

        if (reduced.radical.isOne()) return reduced.factor.exact

        if (reduced.index === 1) return reduced.factor.exact && reduced.radical.exact

        return false
    }

    isZero(): boolean {
        return this.factor.isZero() || this.radical.isZero()
    }

    multiply(value: InputValue<Root>): this {
        const rt = new Root(value)

        this.factor.multiply(rt.factor)

        if (this.index === rt.index) {
            this.radical.multiply(rt.radical)
            return this
        }

        if (this.radical.isEqual(rt.radical)) {
            const F = this.indexAsPow.add(rt.indexAsPow).reduce()
            this.index = F.denominator
            this.radical = this.radical.pow(F.numerator)
            return this
        }

        throw new Error('Multiply can only be done if radical or index as equals.')
    }

    one(): this {
        this.radical.one()
        this.factor.one()

        return this
    }

    opposite(): this {
        this.factor.opposite()
        return this
    }

    pow(value: number): this {
        this.factor.pow(value)

        const g = Numeric.gcd(this.index, value)
        this.index = this.index / g
        this.radical.pow(value / g)

        return this
    }

    get radical(): Fraction {
        return this.#radical
    }

    set radical(value: Fraction) {
        this.#radical = value
    }

    reduce(): this {
        // 1. extract roots
        // 2. avoid roots at denominator.

        // Remove the roots at denominator
        if (this.radical.isRational()) {
            const den = this.radical.denominator
            this.radical.denominator = 1
            this.radical.numerator *= den

            this.factor.divide(den)
        }

        // Extract the greatest root from.
        const greatest = Numeric.greatestPower(this.radical.value, this.index)

        this.factor.multiply(Math.pow(greatest, 1 / this.index))
        this.radical.divide(greatest)

        return this
    }

    root(value: number): this {
        this.group()
        this.index = this.index * value
        return this
    }

    sqrt(): this {
        return this.root(2)
    }

    subtract(value: InputValue<Root>): this {
        const rt = new Root(value)

        return this.add(rt.opposite())
    }

    public get value(): number {
        return Numeric.numberCorrection(this.factor.value * Math.pow(this.radical.value, 1 / this.index))
    }

    get withSign(): this {
        this.#withSign = true
        return this
    }

    get withoutSign(): this {
        this.#withSign = false
        return this
    }

    zero(): this {
        this.radical.zero()
        this.factor.zero()
        return this
    }

    #makeDisplayLine(a: number, b: number, wrap: boolean): string | null {
        const rad = this.#index === 2 ? `sqrt` : `root(${this.#index})`

        const formatted: string[] = [
            (a !== 1 && a !== 0) ? a.toString() : null,
            (b !== 1 && b !== 0) ? `${rad}(${b})` : null,
        ].filter(x => x !== null)

        if (formatted.length === 0) return null

        if (wrap && formatted.length===2) return `(${formatted.join("")})`

        return formatted.join("")
    }

    #makeTeXLine(a: number, b: number): string | null {
        const rad = this.#index === 2 ? `\\sqrt` : `\\sqrt[ ${this.#index} ]`

        const formatted: string[] = [
            (a !== 1 && a !== 0) ? a.toString() : null,
            (b !== 1 && b !== 0) ? `${rad}{ ${b} }` : null,
        ].filter(x => x !== null)

        if (formatted.length === 0) return null

        return formatted.join(" ")
    }

    #parse_root(value: string): this {
        // value = a root(n)b or a root(n)(b)
        const [factor, index_radical] = value.split('root')
        const [index, radical] = index_radical.split(')')

        this.index = +stripParenthesis(index)

        this.radical = new Fraction(stripParenthesis(radical))

        this.factor = factor === '' ? new Fraction().one() : new Fraction(factor)

        return this
    }

    #parse_sqrt(value: string): this {
        // value = asqrtb
        const [factor, radical] = value.split('sqrt')

        this.index = 2

        this.radical = new Fraction(stripParenthesis(radical))

        this.factor = factor === '' ? new Fraction().one() : new Fraction(factor)

        return this
    }
}