import type {
    IDisplayDigits,
    IAlgebra,
    IEvaluable,
    IExpression,
    InputAlgebra,
    InputValue,
    IPiMathObject,
    LiteralType,
} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {MathError, NotImplementedError, ParseError} from "../errors"
import {Factor, FACTOR_DISPLAY} from "./factor"
import {Polynom} from "./polynom"
import type {Solution} from "../analyze"
import {splitIfOutsideParentheses, stripParenthesis} from "../helpers"


/**
 * A polynomial expression in factored form: a list of {@link Factor}s whose product is the value. A factor with
 * a negative power belongs to the denominator. Built from a string (`"(x-1)(x+2)^2"`, `"(x+1)/(x-2)"`),
 * a polynom or factors.
 * Operations modify the object and return it; `clone()` keeps the original.
 * @example
 * new PolyFactor("(x-1)(x+2)^2").develop().display // "x^(3)+3x^(2)-4"
 */
export class PolyFactor implements IPiMathObject<PolyFactor>, IDisplayDigits,
    IExpression<PolyFactor>,
    IAlgebra, IEvaluable {

    #displayMode: FACTOR_DISPLAY = FACTOR_DISPLAY.POWER
    #factors: Factor[] = []

    constructor(...values: (InputAlgebra<Polynom> | Factor | PolyFactor)[]) {
        this.#factors = []
        values.forEach(v => {
            if (typeof v === 'string')        this.#factors.push(...PolyFactor.fromString(v).factors)
            else if (v instanceof PolyFactor) this.#factors.push(...v.factors)
            else                              this.#factors.push(new Factor(v))
        })
    }

    /**
     * Replace the content by a string, a polynom, a factor or another polyfactor.
     * @throws {ParseError} if a string is malformed.
     */
    parse(value: InputAlgebra<Polynom> | Factor | PolyFactor | string): this {
        if (typeof value === 'string')   return this.copy(PolyFactor.fromString(value))
        if (value instanceof PolyFactor) return this.copy(value)
        return this.copy(PolyFactor.fromFactors(value))
    }

    copy(value: PolyFactor): this {
        this.#factors = value.factors
        return this
    }

    clone(): PolyFactor {
        const result = new PolyFactor()
        result.#factors = this.factors
        result.#displayMode = this.#displayMode
        return result
    }

    /** @see IDisplayDigits.withDigits */
    withDigits(digits: number | null): this {
        this.#factors.forEach(f => f.withDigits(digits))
        return this
    }

    get tex(): string {
        return this.#toOutput(
            f => f.tex,
            (num, den) => `\\frac{ ${num} }{ ${den} }`
        )
    }

    get display(): string {
        return this.#toOutput(
            f => f.display,
            (num, den) => `(${num})/(${den})`
        )
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

    /**
     * Greatest common divisor: every base shared by all the polyfactors, at its lowest power.
     */
    static gcd(...values: PolyFactor[]): PolyFactor {
        if (values.length === 0) {
            return new PolyFactor().one()
        }
        if (values.length === 1) {
            return values[0].clone()
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

    /**
     * Least common multiple: every base found in one of the polyfactors, at its highest power.
     */
    static lcm(...values: PolyFactor[]): PolyFactor {
        if (values.length === 0) {
            return new PolyFactor().one()
        }
        if (values.length === 1) {
            return values[0].clone()
        }

        let PF = values[0]
        values.shift()
        values.forEach(value => PF = PolyFactor.#lcmWith(PF, value))
        return PF
    }

    /**
     * Add one or more PolyFactors to this one.
     *
     * Algorithm: compute the LCM of all denominators, scale each numerator by
     * its complementary factor, then extract the GCD of the scaled numerators
     * and collect the residuals into a single polynomial factor.
     */
    add(...values: PolyFactor[]): this {
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

    /**
     * Display option (default): the factors are written one after the other, with their exponent.
     * Chainable, kept by {@link clone}.
     */
    get asPower(): this {
        this.#displayMode = FACTOR_DISPLAY.POWER
        return this
    }

    /**
     * Display option: the factors with a negative power are written in a fraction under the numerator.
     * Chainable, kept by {@link clone}.
     */
    get asRoot(): this {
        this.#displayMode = FACTOR_DISPLAY.ROOT
        return this
    }

    /**
     * Sum of the degrees of the factors; a denominator counts negatively.
     */
    degree(variable?: string): Fraction {
        return this.#factors.reduce((acc, f) => acc.add(f.degree(variable)), new Fraction('0'))
    }

    /**
     * The factors with a negative power, as a new polyfactor with positive powers.
     */
    get denominator(): PolyFactor {
        return new PolyFactor(...this.#factors
            .filter(f => f.power.isNegative())
            .map(f => f.clone().inverse())
        )
    }

    /**
     * Derivative, by the product rule. The result is added with {@link add}, so it is factored again.
     */
    derivative(): this {
        // (fgh)' = f'gh+fg'h+fgh'
        // dPF = [f'gh, fg'h, fgh']
        const dPF: PolyFactor[] = []

        const length = this.#factors.length

        for (let i = 0; i < length; i++) {
            // unchanged factors
            const factors = this.#factors.slice()
            // derivative factor
            const derivativeFactor = factors.splice(i, 1)[0].getDerivativeFactors()
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

    /**
     * Expand the numerator and the denominator into polynoms. Returns a new polyfactor (numerator over denominator).
     * @throws {MathError} if a power is not a natural number.
     */
    develop(): PolyFactor {
        // Develop each factor and multiply them
        const N = new Polynom('1')
        const D = new Polynom('1')

        this.numerator.factors.forEach(f => {
            N.multiply(f.develop())
        })
        this.denominator.factors.forEach(f => {
            D.multiply(f.develop())
        })

        return PolyFactor.fromPolynom(N, D)
    }

    /**
     * Divide by polyfactors: append their inverted factors. The result is not reduced.
     */
    divide(...values: PolyFactor[]): this {
        for (const value of values) {
            this.#factors = this.#factors.concat(value.factors.map(f => f.inverse()))
        }
        return this
    }

    /**
     * Value of the expression for given values of its variables.
     * @param values - a dictionary `{x: 2}`, or one value for a single-variable expression.
     * @param asNumeric - `true` returns a `number`, otherwise the exact `Fraction`.
     */
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric: true): number
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric?: false): Fraction
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric?: boolean): number | Fraction
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric?: boolean): number | Fraction {
        if (asNumeric) {
            return this.#factors
                .reduce((acc, f) => acc * (f.evaluate(values, asNumeric)), 1)
        }

        return this.#factors
            .reduce((acc, f) => acc.multiply(f.evaluate(values)), new Fraction('1'))
    }

    /**
     * Factor the polynom of each factor, and return the result as a new polyfactor.
     */
    factorize(variable?: string): PolyFactor {
        // Go through each factors.
        // If it can be factorized, remove the factor (set its power to zero) and insert the new factors instead.
        const newFactors: Factor[] = []

        this.#factors.forEach(factor => {
            const factors = factor.polynom.factorize(variable)
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

    /**
     * The factors, as copies. Setting the property replaces them.
     */
    get factors(): Factor[] {
        return this.#factors.map(f=>f.clone())
    }

    set factors(value: Factor[]) {
        this.#factors = value
    }

    /**
     * Build a polyfactor with one factor for the numerator and, when given, one for the denominator.
     * @throws {MathError} if the denominator is zero.
     */
    static fromPolynom(numerator: InputAlgebra<Polynom>, denominator?: InputAlgebra<Polynom>): PolyFactor {
        const pf = new PolyFactor()
        pf.#factors = [new Factor(new Polynom(numerator))]
        if (denominator) {
            const polynom = new Polynom(denominator)
            if (polynom.isOne()) return pf
            if (polynom.isZero()) throw new MathError("Cannot divide by zero")
            pf.#factors.push(new Factor(polynom, -1))
        }
        return pf
    }

    /**
     * Build a polyfactor from factors, or from anything a factor accepts.
     */
    static fromFactors(...values: (Factor | InputAlgebra<Polynom>)[]): PolyFactor {
        const pf = new PolyFactor()
        pf.#factors = values.map(v => new Factor(v))
        return pf
    }

    /**
     * Build a polyfactor from a product of parenthesised terms, with at most one `/` for the denominator.
     * @throws {ParseError} if the numerator is empty or the string has more than one `/`.
     */
    static fromString(value: string): PolyFactor {
        const pf = new PolyFactor()
        const [num, ...den] = splitIfOutsideParentheses(value, '/')
        if (num === '') throw new ParseError('Parsing a PolyFactor from a string requires a numerator')
        if (den.length > 1) throw new ParseError('Parsing a PolyFactor from a string only allows max one signe "/"')
        if (den.length === 0) {
            pf.#factors = Factor.factorsFromString(stripParenthesis(num), true)
        } else {
            pf.#factors = [
                ...Factor.factorsFromString(stripParenthesis(num), true),
                ...Factor.factorsFromString(stripParenthesis(den[0]), false),
            ]
        }
        return pf
    }

    /**
     * Roots of every factor, sorted by value without duplicates. The roots of the denominator are included:
     * they are the values where the expression is undefined.
     */
    get roots(): Solution[] {
        const roots: Solution[] = ([] as Solution[])
            .concat(...this.#factors.map(x => x.polynom.roots))
        roots.sort((a, b) => a.value - b.value)
        return roots.filter((value, index, self) =>
            index === self.findIndex(t => t.value === value.value)
        )
    }

    /**
     * True when a factor contains the variable.
     */
    hasVariable(variable: string): boolean {
        return this.#factors.some(f => f.hasVariable(variable))
    }

    /**
     * Negate every power: numerator and denominator are swapped.
     */
    inverse(): this {
        this.#factors = this.#factors.map(f => f.inverse())
        return this
    }

    /**
     * True when both expressions are equal: their quotient, once the common factors are removed, reduces to one.
     */
    isEqual(value: PolyFactor): boolean {
        const gcd = PolyFactor.gcd(this, value)

        const PF1 = this.clone().divide(gcd).reduce()
        const PF2 = value.clone().divide(gcd).reduce()

        return PF1.isOne() && PF2.isOne()
    }

    /**
     * True when every factor is one.
     */
    isOne(): boolean {
        return this.#factors.every(f => f.isOne())
    }

    /**
     * True when a factor is zero.
     */
    isZero(): boolean {
        return this.#factors.some(f => f.isZero())
    }

    /**
     * Multiply by polyfactors, factors, polynoms or strings: append their factors. The result is not reduced.
     */
    multiply(...values: (InputAlgebra<Polynom> | Factor | PolyFactor)[]): this {
        const newFactors = values.flatMap(v => new PolyFactor(v).factors)
        this.#factors = this.#factors.concat(newFactors)
        return this
    }

    /**
     * The factors with a positive power, as a new polyfactor.
     */
    get numerator(): PolyFactor {
        return new PolyFactor(...this.#factors.filter(f => f.power.isPositive()))
    }

    /**
     * Set the expression to `1`.
     */
    one(): this {
        this.#factors = [new Factor('1', '1')]
        return this
    }

    /**
     * Change the sign: add a factor `-1`, or remove it when it is already there.
     */
    opposite(): this {
        // Add the -1 factor or remove if it exists
        const minus1 = new Factor(-1)
        const index = this.#factors.findIndex(f => f.isEqual(minus1))

        if (index >= 0) {
            this.#factors.splice(index, 1)
        } else {
            this.#factors.push(new Factor('-1', '1'))
        }

        return this
    }

    /**
     * Raise to a power: multiply the power of every factor.
     */
    pow(value: number | Fraction): this {
        this.#factors = this.#factors.map(f => f.pow(value))
        return this
    }

    /**
     * Not implemented.
     * @throws {NotImplementedError} always.
     */
    primitive(): PolyFactor {
        throw new NotImplementedError("Method not implemented.")
    }

    /**
     * Group the factors with the same base by adding their powers, remove the factors of power zero, and merge the
     * monomial factors with an integer power.
     */
    reduce(): this {
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

        // Everything is reduced - merge all monomial factors together.
        const numfactor = new Factor(1)
        const denfactor = new Factor(1)
        const monomials = this.#factors.filter(x=>x.polynom.monoms.length===1 && x.power.isRelative())
        if(monomials.length>0){
            monomials.forEach(m=> {
                if(m.power.isPositive()){
                    numfactor.multiply(new Factor(m.polynom.clone().pow(m.power.value)))
                }else{
                    denfactor.multiply(new Factor(m.polynom.clone().pow(-m.power.value)))
                }
            })

            this.#factors = this.#factors.filter(x=>!(x.polynom.monoms.length===1 && x.power.isRelative()))
            if (!denfactor.polynom.isOne()){this.#factors.push(denfactor.inverse())}
            if (!numfactor.polynom.isOne()){this.#factors.push(numfactor)}
        }

        return this
    }

    /**
     * N-th root: divide every power by `value`.
     */
    root(value: number): this {
        this.#factors = this.#factors.map(f => f.root(value))
        return this
    }

    /**
     * Reoarder the factors using :
     * 1. number of monoms
     * 2. degree of polynom
     * 3. power of polyfactor
     */
    sort(variable?: string): this {
        // Sort each polynom
        this.#factors.forEach(f => { f.polynom = f.polynom.reorder(variable) })

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
            const aDegree = a.polynom.degree(variable).value
            const bDegree = b.polynom.degree(variable).value
            if (aDegree !== bDegree) {
                return aDegree - bDegree
            }

            // The power of the PolyFactor
            if (aPower !== bPower) {
                return aPower - bPower
            }

            // It the monoms length are two AND of degree one, sort by the zero.
            if(a.polynom.degree(variable).isOne() && b.polynom.degree(variable).isOne()){
                const aSol = a.polynom.monoms[1].coefficient.clone().opposite().divide(a.polynom.monoms[0].coefficient).value
                const bSol = b.polynom.monoms[1].coefficient.clone().opposite().divide(b.polynom.monoms[0].coefficient).value

                return aSol - bSol
            }

            return a.degree().isLeq(b.degree()) ? -1 : 1
        })

        return this
    }

    /**
     * Square root: divide every power by 2.
     */
    sqrt(): this {
        this.#factors = this.#factors.map(f => f.sqrt())
        return this
    }

    /**
     * Subtract polyfactors. The operands are negated, so they are modified: pass clones to keep them.
     */
    subtract(...values: PolyFactor[]): this {
        return this.add(...values.map(f => f.opposite()))
    }

    /**
     * Variables of all the factors.
     */
    get variables(): string[] {
        return [...new Set(
            this.#factors.reduce((acc: string[], f: Factor) => acc.concat(f.variables), [])
        )]
    }

    /**
     * Set the expression to `0`.
     */
    zero(): this {
        this.#factors = [new Factor('0', '1')]
        return this
    }

    #toOutput(
        render: (f: Factor) => string,
        wrapFraction: (num: string, den: string) => string
    ): string {
        const {num, den} = this.#extractNumeratorAndDenominator()

        const renderGroup = (factors: Factor[]) => {
            if (factors.length === 1) return render(factors[0].asSingle)
            return factors
                .map((f, i) => canOmitParens(f, i) ? render(f.asSingle) : render(f))
                .join("")
        }

        const numStr = renderGroup(num)
        if (den.length === 0) return numStr
        return wrapFraction(numStr, renderGroup(den))
    }

    #extractNumeratorAndDenominator() {
        let num: Factor[]
            let den: Factor[] = []

        if (this.#displayMode === FACTOR_DISPLAY.ROOT) {
            // the power are positive integers
            num = this.numerator.factors
            den = this.denominator.factors
        } else {
            num = this.factors
        }

        // There is no factor
        if (num.length === 0) {
            num = [new Factor('1')]
        }
        return {num, den}
    }

}

function canOmitParens(f: Factor, index: number): boolean {
    if (!f.power.isOne() || f.polynom.monoms.length !== 1) return false
    if (index === 0) return true
    return f.polynom.degree().value > 0
        && !f.polynom.monoms[0].coefficient.isStrictlyNegative()
}

function keyFactors(value: PolyFactor): Record<string, Factor[]> {
    const k_numerator = new Fraction(1)
    const k_denominator = new Fraction(1)

    const kF = value.factors
        .reduce((acc: Record<string, Factor[]>, f) => {
            // It's only a value (without roots
            // TODO: implement reduce root numeric.
            if (f.polynom.degree().isZero() && f.power.isRelative()) {
                const value = f.polynom.monoms[0].coefficient.pow(f.power.clone().abs())

                if (f.power.isPositive()) {
                    k_numerator.multiply(value)
                } else {
                    k_denominator.multiply(value)
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

