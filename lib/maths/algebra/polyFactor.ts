import { IAlgebra, IExpression, InputAlgebra, InputValue, IPiMathObject, literalType } from "../../pimath.interface.ts"
import { Fraction } from "../coefficients/fraction.ts"
import { Factor } from "./factor.ts"
import { Polynom } from "./polynom.ts"

// #region Classes (1)

// PolyFactor is a class that represents a polynomial in factored form.
export class PolyFactor implements
    IPiMathObject<PolyFactor>,
    IExpression<PolyFactor>,
    IAlgebra<PolyFactor> {
    // #region Class fields (1)

    #factors: Factor[] = []

    // #endregion Class fields (1)

    // #region Constructors (1)

    constructor(...values: InputAlgebra<Polynom>[])
    constructor(...values: Factor[])
    constructor(...values: (Factor | InputAlgebra<Polynom>)[]) {
        this.parse(...values)

        return this
    }

    // #endregion Constructors (1)

    // #region Properties and methods (25)
    public parse(...values: (Factor | InputAlgebra<Polynom>)[]): this {
        this.#factors = values.map(value => {
            if (value instanceof Factor) { return value }
            return new Factor(value)
        })

        return this
    }

    public clone(): PolyFactor {
        return new PolyFactor(...this.#factors.map(f => f.clone()))
    }

    public add(...values: PolyFactor[]): this {
        // List of the polyFactors
        let PF: PolyFactor[] = [this, ...values]

        // Get the gcd of the PolyFactors
        const gcd = PolyFactor.gcd(...PF)

        // Divide the PF by the gcd
        PF = PF.map(pf => pf.divide(gcd).reduce())

        // Add the dPF values: develop the polynoms and add them
        const P = new Polynom('0')
        PF.forEach(pf => P.add(pf.develop()))

        // Make the new factor
        this.#factors = [
            ...gcd.factors,
            new Factor(P)
        ]

        return this
    }

    public degree(letter?: string): Fraction {
        return this.#factors.reduce((acc, f) => acc.add(f.degree(letter)), new Fraction('0'))
    }

    public derivative(): this {
        const dPF: PolyFactor[] = []

        const length = this.#factors.length

        for (let i = 0; i < length; i++) {
            const factors = this.#factors.slice()
            const factor = factors.splice(i, 1)[0]
            dPF.push(new PolyFactor(...factors).multiply(new PolyFactor(...factor.derivative())))
        }

        // Reduce the polyFactors
        dPF.forEach(pf => pf.reduce())

        const first = dPF.shift()
        if (first !== undefined) {
            this.#factors = first.factors
        }

        return this.add(...dPF)
    }

    public develop(): Polynom {
        // Develop each factor and multiply them
        const P = new Polynom('1')

        this.#factors.forEach(f => {
            P.multiply(f.develop())
        })

        return P
    }

    public divide(value: PolyFactor): this {
        this.#factors = this.#factors.concat(value.clone().factors.map(f => f.inverse()))
        return this
    }

    public evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean): number | Fraction {
        if (asNumeric) {
            return this.#factors
                .reduce((acc, f) => acc * (f.evaluate(values, asNumeric) as number), 1)
        }

        return this.#factors
            .reduce((acc, f) => acc.multiply(f.evaluate(values)), new Fraction('1'))
    }

    public hasVariable(letter: string): boolean {
        return this.#factors.some(f => f.hasVariable(letter))
    }

    public inverse(): this {
        this.#factors = this.#factors.map(f => f.inverse())
        return this
    }

    public isEqual(value: PolyFactor): boolean {
        const gcd = PolyFactor.gcd(this, value)

        const PF1 = this.clone().divide(gcd).reduce()
        const PF2 = value.clone().divide(gcd).reduce()

        return PF1.isOne() && PF2.isOne()
    }

    public isOne(): boolean {
        return this.#factors.every(f => f.isOne())
    }

    public isZero(): boolean {
        return this.#factors.every(f => f.isZero())
    }

    public multiply(...values: PolyFactor[]): this {
        values.forEach(value => {
            this.#factors = this.#factors.concat(value.clone().factors)
        })

        return this
    }

    public one(): this {
        this.#factors = [new Factor('1', '1')]
        return this
    }

    public opposite(): this {
        // Add the -1 factor or remove if it exists
        const index = this.#factors.findIndex(f => f.display === '(-1)')

        if (index >= 0) { this.#factors.splice(index, 1) }
        else { this.#factors.push(new Factor('-1', '1')) }

        return this
    }

    public pow(value: number | Fraction): this {
        this.#factors = this.#factors.map(f => f.pow(value))
        return this
    }

    public primitive(): PolyFactor {
        throw new Error("Method not implemented.")
    }

    public reduce(): this {
        // Regroup the factors by their base
        const factors = keyFactors(this)

        // Multiply the factors of the same base
        this.#factors = Object.values(factors)
            .map(f => {
                const base = f[0].polynom
                const power = f.reduce((acc, f) => acc.add(f.power), new Fraction('0'))
                return new Factor(base, power.reduce())
            })
            .filter(f => !f.power.isZero())

        return this
    }

    public root(value: number): this {
        this.#factors = this.#factors.map(f => f.root(value))
        return this
    }

    public sort(): this {
        this.#factors = this.#factors
            .sort((a, b) => a.degree().isLeq(b.degree()) ? -1 : 1)
        return this
    }

    public sqrt(): this {
        this.#factors = this.#factors.map(f => f.sqrt())
        return this
    }

    public subtract(...values: PolyFactor[]): this {
        return this.add(...values.map(f => f.opposite()))
    }

    public zero(): this {
        this.#factors = [new Factor('0', '1')]
        return this
    }

    public static gcd(...values: PolyFactor[]): PolyFactor {
        if (values.length === 0) { return new PolyFactor().one() }
        if (values.length === 1) { return values[0] }
        if (values.length === 2) { return PolyFactor._gcdWith(values[0], values[1]) }

        // values is not undefined, 
        let PF = values[0]
        values.shift()
        values.forEach(value => PF = PolyFactor._gcdWith(PF, value))

        return PF
    }

    // #endregion Properties and methods (25)

    // #region Getters And Setters (5)

    public get display(): string {
        return this.#factors.map(f => f.display).join("")
    }

    public get factors(): Factor[] {
        return this.#factors
    }

    public set factors(value: Factor[]) {
        this.#factors = value
    }

    public get tex(): string {
        return this.#factors.map(f => f.tex).join("")
    }

    public get variables(): string[] {
        return this.#factors
            .reduce((acc: string[], f: Factor) => acc.concat(f.variables), [])
    }

    // #endregion Getters And Setters (5)

    // #region Private methods (1)

    private static _gcdWith(PF1: PolyFactor, PF2: PolyFactor): PolyFactor {
        // Get all factors of the two polynomials
        // Find the common factors
        const factors1 = keyFactors(PF1)

        const factors2 = keyFactors(PF2)

        const common = Object.keys(factors1).filter(k => Object.hasOwn(factors2, k))

        // Find the minimum power of the common factors
        const factors = common.map(k => {
            const power = factors1[k].reduce((acc, f) => acc.add(f.power), new Fraction('0'))
            const power2 = factors2[k].reduce((acc, f) => acc.add(f.power), new Fraction('0'))
            return new Factor(k, Fraction.min(power, power2))
        })

        return new PolyFactor(...factors)
    }

    // #endregion Private methods (1)
}

// #endregion Classes (1)

// #region Functions (1)

function keyFactors(value: PolyFactor): Record<string, Factor[]> {
    const coefficient = new Fraction().one()

    const kF = value.factors.reduce((acc: Record<string, Factor[]>, f) => {
        // It's only a value
        if (f.polynom.degree().isZero()) {
            if (f.polynom.monoms.length > 0) { coefficient.multiply(f.polynom.monoms[0].coefficient) }

            return acc
        }

        // It's a polynom
        const base = f.polynom.display
        if (Object.hasOwn(acc, base)) { acc[base].push(f) }
        else { acc[base] = [f] }

        return acc
    }, {})

    if (coefficient.isOne()) { return kF }

    // Add the coefficient
    kF[coefficient.display] = [new Factor(coefficient.display, 1)]

    return kF
}

// #endregion Functions (1)
