import type {
    IAlgebra,
    IExpression,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    ISolution,
    literalType, TABLE_OF_SIGNS,
    TABLE_OF_SIGNS_VALUES
} from "../pimath.interface"
import {Fraction} from "../coefficients/fraction"
import {Factor, FACTOR_DISPLAY} from "./factor"
import {Polynom} from "./polynom"

// #region Classes (1)

// PolyFactor is a class that represents a polynomial in factored form.
export class PolyFactor implements IPiMathObject<PolyFactor>,
    IExpression<PolyFactor>,
    IAlgebra<PolyFactor> {
    // #region Class fields (1)

    #displayMode: FACTOR_DISPLAY = FACTOR_DISPLAY.POWER
    #factors: Factor[] = []

    // #endregion Class fields (1)

    // #region Constructors (1)
    constructor(...values: (Factor | InputAlgebra<Polynom> | PolyFactor)[]) {
        this.parse(...values)
        return this
    }

    // #endregion Constructors (1)

    // #region Properties and methods (25)
    public parse(...values: (Factor | InputAlgebra<Polynom> | PolyFactor)[]): this {
        if (values.length === 0) {
            return this
        }

        this.#factors = []

        values.forEach(value => {
            if (typeof value === 'string') {
                const factors = value.split(')(').join(')*(').split('*')
                this.#factors.push(...factors.map(f => new Factor(f)))
            } else if (value instanceof PolyFactor) {
                this.#factors.push(...value.factors.map(f => f.clone()))
            } else {
                this.#factors.push(new Factor(value))
            }
        })

        return this
    }

    public clone(): PolyFactor {
        return new PolyFactor(...this.#factors.map(f => f.clone()))
    }

    static #gcdWith(PF1: PolyFactor, PF2: PolyFactor): PolyFactor {
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

    public static gcd(...values: PolyFactor[]): PolyFactor {
        if (values.length === 0) {
            return new PolyFactor().one()
        }
        if (values.length === 1) {
            return values[0]
        }
        if (values.length === 2) {
            return PolyFactor.#gcdWith(values[0], values[1])
        }

        // values is not undefined,
        let PF = values[0]
        values.shift()
        values.forEach(value => PF = PolyFactor.#gcdWith(PF, value))

        return PF
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

    get asPower(): this {
        this.#displayMode = FACTOR_DISPLAY.POWER
        return this
    }

    get asRoot(): this {
        this.#displayMode = FACTOR_DISPLAY.ROOT
        return this
    }

    public degree(letter?: string): Fraction {
        return this.#factors.reduce((acc, f) => acc.add(f.degree(letter)), new Fraction('0'))
    }

    get denominator(): Factor[] {
        return this.#factors.filter(f => f.power.isNegative())
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

    public get display(): string {
        let num: Factor[] = [],
            den: Factor[] = []

        if (this.#displayMode === FACTOR_DISPLAY.ROOT) {
            // the power are positive integers
            num = this.numerator
            den = this.denominator.map(f => f.clone().inverse())
        } else {
            num = this.#factors
        }

        // There is no factor
        if (num.length === 0) {
            num = [new Factor('1')]
        }

        if (den.length === 0) {
            if (num.length === 1) {
                return num[0].asSingle.display
            }

            return num.map(f => f.display).join("")
        }

        // There is a numerator and a denominator
        const numTeX = num.length === 1 ? num[0].asSingle.display : num.map(f => f.display).join("")
        const denTeX = den.length === 1 ? den[0].asSingle.display : den.map(f => f.display).join("")

        return `(${numTeX})/(${denTeX})`

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

    public get factors(): Factor[] {
        return this.#factors
    }

    public set factors(value: Factor[]) {
        this.#factors = value
    }

    public fromPolynom(polynom: InputAlgebra<Polynom>, letter?: string): this {
        // Find all factors from a polynom
        this.#factors = new Polynom(polynom).factorize(letter).map(value => new Factor(value))
        return this
    }

    public getZeroes(): ISolution[] {
        // Calculate the list of roots (ordered, unique)
        const roots: ISolution[] = ([] as ISolution[])
            .concat(...this.#factors.map(x => x.polynom.getZeroes()))
        // .concat(...tos.map(x => x.roots))

        // Sort the values.
        roots.sort((a, b) => a.value - b.value)
        // Remove duplicates.
        return roots
            .filter((value, index, self) =>
                    index === self.findIndex((t) =>
                        t.value === value.value
                    )
            )
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

    get numerator(): Factor[] {
        return this.#factors.filter(f => f.power.isPositive())
    }

    public one(): this {
        this.#factors = [new Factor('1', '1')]
        return this
    }

    // #endregion Properties and methods (25)

    // #region Getters And Setters (5)

    public opposite(): this {
        // Add the -1 factor or remove if it exists
        const index = this.#factors.findIndex(f => f.display === '(-1)')

        if (index >= 0) {
            this.#factors.splice(index, 1)
        } else {
            this.#factors.push(new Factor('-1', '1'))
        }

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

    public tableOfSigns(): TABLE_OF_SIGNS & { factors: {factor: Factor, tableOfSigns: TABLE_OF_SIGNS}[] } {
        // Calculate the table of signs for each factor
        const roots = this.getZeroes()

        // Modify each lines of tos[<index>].signs to display extra zeroes
        const factors: {factor: Factor, tableOfSigns: TABLE_OF_SIGNS}[] = this.#factors.map(factor=>{
            return {factor, tableOfSigns: factor.tableOfSigns(roots)}
        })

        // Build the table of signs with extra roots
        const signs: TABLE_OF_SIGNS_VALUES[] = factors.map(item=>item.tableOfSigns)
            .reduce<TABLE_OF_SIGNS_VALUES[]>((a, b) => {
            if (a.length === 0) {
                a = b.signs
            }else{
                // assume a and b are array from same length.
                b.signs.forEach((value, index) =>  {
                    // Case of a zero, invalid or tab value
                    // tab < zero < defence
                    switch (value){
                        case "d":
                            a[index] = "d"
                            break
                        case "z":
                            a[index] = a[index] === "d" ? "d": "z"
                            break
                        case "h":
                            a[index] = "h"
                            break
                        case "-":
                            a[index] = a[index] === "h" ? "h": a[index]==="-" ? "+": "-"
                            break
                    }
                })
            }

            return a
        }, [])

        return {signs, roots, factors}
        //
        // // the signs of the PolyFactor
        // const signs: TABLE_OF_SIGNS_VALUES[] = []
        // const currentColumn: TABLE_OF_SIGNS_VALUES[] = []
        // tos.forEach(item => {
        //     currentColumn.push(item.signs[0])
        // })
        // // add the global signs:
        // // if there is an invalid value, it's invalid
        // // if there is an even number of negative signs, it's positive
        // signs.push(
        //     currentColumn.filter(x => x === 'h').length > 0 ? 'h' :
        //         currentColumn.filter(x => x === '-').length % 2 === 0 ? '+' :
        //             '-'
        // )
        //
        // // Go through each roots
        // roots.forEach(root => {
        //     let currentColumn: TABLE_OF_SIGNS_VALUES[] = []
        //
        //     // Remove the sign and zero of the factor's table of signs it root is the zero of the factor.
        //     tos.forEach(item=>{
        //         if(item.signs.length>2){
        //             if(item.roots[0].value === root.value){
        //                 currentColumn.push(item.signs[1])
        //                 item.signs = item.signs.slice(2)
        //                 item.roots.pop() // remove the root from the list
        //             }
        //         }
        //     })
        //     signs.push(
        //         currentColumn.filter(x => x === 'd').length > 0 ? 'd' :
        //             currentColumn.filter(x => x === 'z').length > 0 ? 'z' :
        //                 't'
        //     )
        //
        //
        //     currentColumn = []
        //     tos.forEach(item => {
        //         currentColumn.push(item.signs[0])
        //     })
        //     signs.push(
        //         currentColumn.filter(x => x === 'h').length > 0 ? 'h' :
        //             currentColumn.filter(x => x === '-').length % 2 === 0 ? '+' :
        //                 '-'
        //     )
        // })
        //
        //
        //
        // return {roots, signs}
    }

    public get tex(): string {
        let num: Factor[] = [],
            den: Factor[] = []

        if (this.#displayMode === FACTOR_DISPLAY.ROOT) {
            // the power are positive integers
            num = this.numerator
            den = this.denominator.map(f => f.clone().inverse())
        } else {
            num = this.#factors
        }

        // There is no factor
        if (num.length === 0) {
            num = [new Factor('1')]
        }

        if (den.length === 0) {
            if (num.length === 1) {
                return num[0].asSingle.tex
            }

            return num.map(f => f.tex).join("")
        }

        // There is a numerator and a denominator
        const numTeX = num.length === 1 ? num[0].asSingle.tex : num.map(f => f.tex).join("")
        const denTeX = den.length === 1 ? den[0].asSingle.tex : den.map(f => f.tex).join("")

        return `\\frac{ ${numTeX} }{ ${denTeX} }`

    }

    public get variables(): string[] {
        return this.#factors
            .reduce((acc: string[], f: Factor) => acc.concat(f.variables), [])
    }

    // #endregion Getters And Setters (5)

    // #region Private methods (1)

    public zero(): this {
        this.#factors = [new Factor('0', '1')]
        return this
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
            if (f.polynom.monoms.length > 0) {
                coefficient.multiply(f.polynom.monoms[0].coefficient)
            }

            return acc
        }

        // It's a polynom
        const base = f.polynom.display
        if (Object.hasOwn(acc, base)) {
            acc[base].push(f)
        } else {
            acc[base] = [f]
        }

        return acc
    }, {})

    if (coefficient.isOne()) {
        return kF
    }

    // Add the coefficient
    kF[coefficient.display] = [new Factor(coefficient.display, 1)]

    return kF
}

// #endregion Functions (1)
