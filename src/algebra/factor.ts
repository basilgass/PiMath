import type {
    IAlgebra,
    IExpression,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    literalType,
    TABLE_OF_SIGNS
} from "../pimath.interface"
import {Fraction} from "../coefficients/fraction"
import {Polynom} from "./polynom"
import {replace_in_array, wrapParenthesis} from "../helpers"

export class Factor implements IPiMathObject<Factor>,
    IExpression<Factor>,
    IAlgebra<Factor> {
    #displayMode: FACTOR_DISPLAY
    #polynom: Polynom
    #power: Fraction
    #singleMode = false

    constructor(value?: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>) {

        if (value instanceof Factor) {
            this.#polynom = value.polynom.clone()
            this.#power = value.power.clone()

            if(power !== undefined){
                this.#power.multiply(new Fraction(power))
            }
        } else if(value !== undefined) {
            this.#polynom = new Polynom(value)
            this.#power = new Fraction(power ?? 1)
        }else{
            this.#polynom = new Polynom()
            this.#power = new Fraction(1)
        }

        this.#displayMode = FACTOR_DISPLAY.POWER

        return this
    }

    public parse(/*value: InputValue<Factor>*/): Factor {
        throw new Error("Method not implemented.")
    }

    public clone(): Factor {
        return new Factor(this)
    }

    public get tex(): string {
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

    public get display(): string {
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

    public add(): Factor {
        throw new Error("Adding two factors is not possible")
    }

    public get asSingle(): this {
        this.#singleMode = true
        return this
    }

    public degree(letter?: string): Fraction {
        return this.polynom.degree(letter).multiply(this.power)
    }

    public derivative(): Factor[] {
        // The power is zero, the derivative is zero
        if (this.power.isZero()) {
            return [new Factor('0')]
        }

        // The power is one, the derivative is the derivative of the polynom
        if (this.power.isOne()) {
            return [new Factor(this.polynom.clone().derivative())]
        }

        // In any other case, the derivative consist of three Factors:
        // the derivative of the polynom, the power and the polynom
        return [
            new Factor(this.power.clone()),
            new Factor(this.polynom.clone().derivative()),
            new Factor(this.polynom.clone(), this.power.clone().subtract(1))
        ]
    }

    public develop(): Polynom {
        if (this.power.isNatural()) {
            return this.polynom.clone().pow(this.power.value)
        }

        throw new Error("The power must be a natural number")
    }

    public divide(value: InputAlgebra<Factor | Polynom>): this {
        if (value instanceof Factor) {
            if (this.isSameAs(value)) {
                this.power.subtract(value.power)
                return this
            }
        }


        const P = new Polynom(value as Polynom)
        if (this.isSameAs(P)) {
            this.power.subtract(1)
            return this
        }

        throw new Error("The two factors must be the same")
    }

    public evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean): number | Fraction {
        if (asNumeric) {
            return (this.polynom.evaluate(values, true) as number) ** this.power.value
        }


        return (this.polynom.evaluate(values) as Fraction).pow(this.power)
    }

    public fromPolynom(polynom: InputValue<Polynom>): this {
        this.#polynom = new Polynom(polynom)
        this.#power = new Fraction(1)
        return this
    }

    public hasVariable(letter: string): boolean {
        return this.polynom.hasVariable(letter)
    }

    public inverse(): this {
        this.power.opposite()
        return this
    }

    public isEqual(value: Factor): boolean {
        // Must have the same polynom and the same reduce power

        return this.isSameAs(value) &&
            this.power.isEqual(value.power)
    }

    public isOne(): boolean {
        return this.polynom.isOne() || this.power.isZero()
    }

    public isSameAs(value: InputAlgebra<Factor | Polynom>) {
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

    public isZero(): boolean {
        return this.polynom.isZero()
    }

    public multiply(value: InputAlgebra<Factor | Polynom>): this {
        if (value instanceof Factor) {
            if (this.isSameAs(value)) {
                this.power.add(value.power)
                return this
            }
        }


        const P = new Polynom(value as Polynom)
        if (this.isSameAs(P)) {
            this.power.add(1)
            return this
        }

        throw new Error("The two factors must be the same")
    }

    public one(): this {
        this.#polynom.one()
        this.#power.one()
        return this
    }

    public opposite(): Factor {
        throw new Error("Method not implemented.")
    }

    public get polynom(): Polynom {
        return this.#polynom
    }

    public set polynom(value: Polynom) {
        this.#polynom = value
    }

    public pow(value: number | Fraction): this {
        this.power.multiply(value)
        return this
    }

    public get power(): Fraction {
        return this.#power
    }

    public set power(value: InputValue<Fraction>) {
        this.#power = new Fraction(value)
    }

    public primitive(): Factor {
        throw new Error("Method not implemented.")
    }

    public reduce(): Factor {
        throw new Error("Method not implemented.")
    }

    public root(value: number): this {
        this.power.divide(value)
        return this
    }

    public sqrt(): this {
        return this.root(2)
    }

    public subtract(): Factor {
        throw new Error("Subtracting two factors is not possible")
    }

    public tableOfSigns(): TABLE_OF_SIGNS {
        const pow = this.power.clone().reduce()
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

    public get variables(): string[] {
        return this.polynom.variables
    }

    public get withPower(): this {
        this.#displayMode = FACTOR_DISPLAY.POWER
        return this
    }

    public get withRoot(): this {
        this.#displayMode = FACTOR_DISPLAY.ROOT
        return this
    }

    public zero(): this {
        this.#polynom.zero()
        this.#power.one()
        return this
    }

}

export enum FACTOR_DISPLAY {
    ROOT,
    POWER
}

