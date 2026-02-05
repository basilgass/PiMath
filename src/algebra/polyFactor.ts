import type {
    FACTOR_TABLE_OF_SIGNS,
    IAlgebra,
    IExpression,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    literalType,
    POLYFACTOR_TABLE_OF_SIGNS,
    TABLE_OF_SIGNS_VALUES
} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Factor, FACTOR_DISPLAY} from "./factor"
import {Polynom} from "./polynom"
import type {Solution} from "../analyze/solution"


// PolyFactor is a class that represents a polynomial in factored form.
export class PolyFactor implements IPiMathObject<PolyFactor>,
    IExpression<PolyFactor>,
    IAlgebra<PolyFactor> {

    #displayMode: FACTOR_DISPLAY = FACTOR_DISPLAY.POWER
    #factors: Factor[] = []

    constructor(...values: (InputAlgebra<Polynom> | Factor | PolyFactor)[]) {
        this.parse(...values)
        return this
    }

    public parse(...values: (InputAlgebra<Polynom> | Factor | PolyFactor)[]): this {
        // Init the factors list
        this.#factors = []

        // Nothing to create
        if (values.length === 0) {
            return this
        }

        values.forEach(value => {
            if (value instanceof PolyFactor) {
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

    public get tex(): string {
        const {num, den} = this.#extractNumeratorAndDenominator()

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

    public get display(): string {
        const {num, den} = this.#extractNumeratorAndDenominator()

        if (den.length === 0) {
            if (num.length === 1) {
                return num[0].asSingle.display
            }

            return num.map((f, index) =>
                index === 0 && f.polynom.monoms.length === 1 ? f.asSingle.display : f.display
            ).join("")
        }

        // There is a numerator and a denominator
        const numTeX = num.length === 1 ? num[0].asSingle.display : num.map(f => f.display).join("")
        const denTeX = den.length === 1 ? den[0].asSingle.display : den.map(f => f.display).join("")

        return `(${numTeX})/(${denTeX})`

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

    static #lcmWith(PF1: PolyFactor, PF2: PolyFactor): PolyFactor {

        const factors1 = keyFactors(PF1)

        const factors2 = keyFactors(PF2)

        const common = [...new Set([...Object.keys(factors1), ...Object.keys(factors2)])]

        // Find the maximum power of the common factors
        const factors = common.map(k => {
            const power =
                Object.hasOwn(factors1, k) ?
                    factors1[k].reduce((acc, f) => acc.add(f.power), new Fraction('0')) :
                    new Fraction(0)
            const power2 = Object.hasOwn(factors2, k) ?
                factors2[k].reduce((acc, f) => acc.add(f.power), new Fraction('0')) :
                new Fraction(0)
            return new Factor(k, Fraction.max(power, power2))
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

    public static lcm(...values: PolyFactor[]): PolyFactor {
        if (values.length === 0) {
            return new PolyFactor().one()
        }
        if (values.length === 1) {
            return values[0]
        }

        let PF = values[0]
        values.shift()
        values.forEach(value => PF = PolyFactor.#lcmWith(PF, value))
        return PF
    }

    public add(...values: PolyFactor[]): this {
        // Adding two (or more) polyfactors:
        // if both are numerators only, use the common polynom
        // if there are denominators, multiply every polyfactors to match the lcm polyfactor.

        const numerators: PolyFactor[] = [this.numerator, ...values.map(x => x.numerator)]
        const denominators: PolyFactor[] = [this.denominator, ...values.map(x => x.denominator)]

        let denominator: PolyFactor | undefined
        if (denominators.some(d => d.factors.length > 0)) {
            // At least one of the denominators is not empty.
            const lcm = PolyFactor.lcm(...denominators)

            // Multiply each numerators by the complementary.
            numerators.forEach((n, index) => {
                n.multiply(lcm.clone().divide(denominators[index]))
            })

            // Set the common denominator to the lcm PolyFctor
            denominator = lcm
        }

        // Now, every polyfactor should have a common denominator. Just add the numerators.
        const gcd = PolyFactor.gcd(...numerators)
        const remainingPolynom = new Polynom(0)
            .add(...numerators.map(pf => {
                    return pf
                        .divide(gcd).reduce()
                        .develop() // should be a polyfactor with one factor, with a power of 1
                        .factors[0]
                        .polynom
                })
            ).reduce()

        this.#factors = [
            ...gcd.factors,
            new Factor(remainingPolynom)
        ]

        if (denominator) {
            this.divide(denominator)
        }

        // Remove all factors with a power of zero
        this.#factors = this.#factors.filter(x => !x.power.isZero())

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

    get denominator(): PolyFactor {
        return new PolyFactor(...this.#factors
            .filter(f => f.power.isNegative())
            .map(f => f.clone().inverse())
        )
    }

    public derivative(): this {
        // (fgh)' = f'gh+fg'h+fgh'
        // dPF = [f'gh, fg'h, fgh']
        const dPF: PolyFactor[] = []

        const length = this.#factors.length

        for (let i = 0; i < length; i++) {
            // unchanged factors
            const factors = this.#factors.slice()
            // derivative factor
            const derivativeFactor = factors.splice(i, 1)[0].derivative()
            // Add the product of factors
            dPF.push(
                new PolyFactor(...factors, ...derivativeFactor))
        }

        // Reduce the polyFactors
        dPF.forEach(pf => pf.reduce())

        const first = dPF.shift()
        if (first !== undefined) {
            this.#factors = first.factors
        }

        // Add each factors together.
        return this.add(...dPF)
    }

    public develop(): PolyFactor {
        // Develop each factor and multiply them
        const N = new Polynom('1')
        const D = new Polynom('1')

        this.numerator.factors.forEach(f => {
            N.multiply(f.develop())
        })
        this.denominator.factors.forEach(f => {
            D.multiply(f.develop())
        })

        return new PolyFactor().fromPolynom(N, D)
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

    public factorize(letter?: string): PolyFactor {
        // Go through each factors.
        // If it can be factorized, remove the factor (set its power to zero) and insert the new factors instead.
        const newFactors: Factor[] = []

        this.#factors.forEach(factor => {
            const factors = factor.polynom.factorize(letter)
            if (factors.length > 1) {
                const pow = factor.power.clone()
                newFactors.push(...factors.map(x => new Factor(x, pow)))
            } else {
                newFactors.push(factor.clone())
            }
        })

        const result = new PolyFactor(...newFactors)
        const numerator = result.numerator.reduce()
        const denominator = result.denominator.reduce()

        return numerator.divide(denominator)
    }

    public get factors(): Factor[] {
        return this.#factors
    }

    public set factors(value: Factor[]) {
        this.#factors = value
    }

    public fromPolynom(numerator: InputAlgebra<Polynom>, denominator?: InputAlgebra<Polynom>): this {
        // fromPolynom loads the numerator and denominator as is, without factorizing !
        this.#factors = [new Factor(new Polynom(numerator))]

        if (denominator) {
            const polynom = new Polynom(denominator)

            if (polynom.isOne()) {
                return this
            }
            if (polynom.isZero()) {
                throw new Error("Cannot divide by zero")
            }
            this.#factors.push(new Factor(polynom, -1))
        }
        // // Find all factors from a polynom
        // this.#factors = new Polynom(numerator)
        //     .factorize(letter)
        //     .map(value => new Factor(value))
        //
        // if (denominator) {
        //     new Polynom(denominator)
        //         .factorize(letter)
        //         .forEach(value => this.#factors.push(new Factor(value, -1)))
        // }

        return this
    }

    /**
     * Get the roots of the PolyFactor.
     */
    public getRoots(): Solution[] {
        return []
    }

    public getZeroes(): Solution[] {
        // Calculate the list of roots (ordered, unique)
        const roots: Solution[] = ([] as Solution[])
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

    get numerator(): PolyFactor {
        return new PolyFactor(...this.#factors.filter(f => f.power.isPositive()))
    }

    public one(): this {
        this.#factors = [new Factor('1', '1')]
        return this
    }

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

    /**
     * Reoarder the factors using :
     * 1. number of monoms
     * 2. degree of polynom
     * 3. power of polyfactor
     */
    public sort(letter?: string): this {
        this.#factors.sort((a, b) => {
            // If the compare powers are opposite, the negative power goes to the end.
            const aPower = a.power.value
            const bPower = b.power.value
            if (aPower * bPower < 0) {
                return -aPower
            }


            // Monom length
            const aLength = a.polynom.monoms.length
            const bLength = b.polynom.monoms.length
            if (aLength !== bLength) {
                return aLength - bLength
            }

            // The monom length are the same, check the polynom degree.
            const aDegree = a.polynom.degree(letter).value
            const bDegree = b.polynom.degree(letter).value
            if (aDegree !== bDegree) {
                return aDegree - bDegree
            }

            // The power of the PolyFactor
            if (aPower !== bPower) {
                return aPower - bPower
            }

            return a.degree().isLeq(b.degree()) ? -1 : 1
        })

        return this
    }

    public sqrt(): this {
        this.#factors = this.#factors.map(f => f.sqrt())
        return this
    }

    public subtract(...values: PolyFactor[]): this {
        return this.add(...values.map(f => f.opposite()))
    }

    public tableOfSigns(): POLYFACTOR_TABLE_OF_SIGNS {
        // Calculate the table of signs for each factor
        const roots = this.getZeroes()
        const roots_key = roots.map(x => x.value)

        // Get the table of signs of every factors


        // These signs are NOT aligned
        const factors: FACTOR_TABLE_OF_SIGNS[] = this.factorize().factors
            .map(factor => {
                return {factor: new Factor(factor), ...factor.tableOfSigns()}
            })

        // Build the table of signs with extra roots for each factors.
        factors.forEach(item => {
            // Create the new signs row
            const empty_signs: TABLE_OF_SIGNS_VALUES[] = new Array(2 * roots.length + 1).fill('') as unknown as TABLE_OF_SIGNS_VALUES[]

            let sign = item.signs.shift() as unknown as TABLE_OF_SIGNS_VALUES
            let root = item.roots.shift()

            const aligned_signs = empty_signs.map((_sign, index) => {
                if (index % 2 === 0) {
                    return sign
                }

                // The sign for this indexed root is a t(ab)
                if (root === undefined || root.value !== roots_key[(index - 1) / 2]) {
                    return 't'
                }

                // The indexed root is the new root
                const rootSign = item.signs.shift() as unknown as TABLE_OF_SIGNS_VALUES

                // Make the new signs.
                sign = item.signs.shift() as unknown as TABLE_OF_SIGNS_VALUES
                root = item.roots.shift()
                return rootSign
            })

            // Set the roots for this item to all roots
            item.roots = roots
            item.signs = aligned_signs
        })

        // Build the table of signs with extra roots : reault line
        const signs: TABLE_OF_SIGNS_VALUES[] = factors
            .map((item) => [...item.signs])
            .reduce<TABLE_OF_SIGNS_VALUES[]>((a, b) => {
                if (a.length === 0) {
                    return b
                }

                // a and b are "not aligned"
                b.forEach((value, index) => {
                    // Case of a zero, invalid or tab value
                    // tab < zero < defence
                    switch (value) {
                        case "d":
                            a[index] = "d"
                            break
                        case "z":
                            a[index] = a[index] === "d" ? "d" : "z"
                            break
                        case "h":
                            a[index] = "h"
                            break
                        case "-":
                            a[index] = a[index] === "h" ? "h" : a[index] === "-" ? "+" : "-"
                            break
                    }
                })

                return a
            }, [])

        return {signs, roots, factors}
    }

    public get variables(): string[] {
        return this.#factors
            .reduce((acc: string[], f: Factor) => acc.concat(f.variables), [])
    }

    public zero(): this {
        this.#factors = [new Factor('0', '1')]
        return this
    }

    #extractNumeratorAndDenominator() {
        let num: Factor[],
            den: Factor[] = []

        if (this.#displayMode === FACTOR_DISPLAY.ROOT) {
            // the power are positive integers
            num = this.numerator.factors
            den = this.denominator.factors
        } else {
            num = this.#factors
        }

        // There is no factor
        if (num.length === 0) {
            num = [new Factor('1')]
        }
        return {num, den}
    }

}

function keyFactors(value: PolyFactor): Record<string, Factor[]> {
    const k_numerator = new Fraction().one()
    const k_denominator = new Fraction().one()

    const kF = value.factors
        .reduce((acc: Record<string, Factor[]>, f) => {
            // It's only a value
            if (f.polynom.degree().isZero()) {
                if (f.power.isPositive()) {
                    k_numerator.multiply(f.polynom.monoms[0].coefficient)
                } else {
                    k_denominator.multiply(f.polynom.monoms[0].coefficient)
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


    const {numerator, denominator} = k_numerator.divide(k_denominator).reduce()
    if(numerator!==1){
        kF[numerator.toString()] = [new Factor(numerator, 1)]
    }
    if(denominator!==1){
        kF[denominator.toString()] = [new Factor(denominator, -1)]
    }

    return kF
}
