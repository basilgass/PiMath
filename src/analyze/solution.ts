import type {InputValue} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Root} from "../coefficients/root"
import {solveQuadratic} from "../algebra/polynomRoots"
import type {PolynomRoot} from "../algebra/polynomRoots"

export class Solution {
    #count: number
    #display: string | null
    #exact: boolean
    #fraction: Fraction
    #root: Root
    #tex: string | null
    #variable: string

    constructor() {
        this.#variable = 'x'
        this.#exact = false

        this.#display = null
        this.#tex = null

        this.#fraction = new Fraction().zero()
        this.#root = new Root()
        this.#count = 1
    }

    get tex(): string {
        if (this.#tex) return this.#tex

        if (this.#root.isZero()) return this.#fraction.tex

        if (this.#fraction.isZero()) return this.#root.tex

        const [f] = Fraction.toSameDenominateur(this.#fraction, this.#root.factor)

        const R = this.#root.clone().multiply(f.denominator).reduce()
        const num = `${f.numerator} ${R.withSign.tex}`

        if (f.denominator === 1) return num

        return `\\frac{ ${num} }{ ${f.denominator} }`
    }

    set tex(value: string | null) {
        this.#tex = value
    }

    get display(): string | null {
        if(this.#display) return this.#display

        if (this.#root.isZero()) return this.#fraction.display

        if (this.#fraction.isZero()) return this.#root.display

        const [f] = Fraction.toSameDenominateur(this.#fraction, this.#root.factor)

        const R = this.#root.clone().multiply(f.denominator).reduce()
        const num = `${f.numerator}${R.withSign.display}`

        if (f.denominator === 1) return num

        return `(${num})/${f.denominator}`
    }

    set display(value: string | null) {
        this.#display = value
    }

    static fromFraction(value: InputValue<Fraction>): Solution {
        const sol = new Solution()
        sol.setExact()

        const F = new Fraction(value)
        sol.display = F.display
        sol.tex = F.tex

        sol.fraction = F
        sol.root = new Root()

        return sol
    }

    static fromPolynomRoot(root: PolynomRoot): Solution {
        const sol = new Solution()
        sol.fraction = root.fraction.clone()
        sol.root = root.root.clone()
        sol.exact = root.exact
        sol.count = root.multiplicity
        return sol
    }

    static fromQuadratic(A: InputValue<Fraction>, B: InputValue<Fraction>, C: InputValue<Fraction>): Solution[] {
        const [a, b, c] = [A, B, C].map(x => new Fraction(x))
        // Coefficients low->high: [constant, x, x^2] = [C, B, A].
        return solveQuadratic([c, b, a]).map(root => Solution.fromPolynomRoot(root))
    }

    get count(): number {
        return this.#count
    }

    set count(value: number) {
        this.#count = value
    }

    get exact(): boolean {
        return this.#exact
    }

    set exact(value: boolean) {
        this.#exact = value
    }

    get fraction(): Fraction {
        return this.#fraction
    }

    set fraction(value: Fraction) {
        this.#fraction = value
    }

    isZero(): boolean {
        return this.#fraction.isZero() && this.#root.isZero()
    }

    reduce(): this {
        // Reduce the root
        this.#root.reduce()
        this.#fraction.reduce()

        return this
    }

    get root(): Root {
        return this.#root
    }

    set root(value: Root) {
        this.#root = value
    }

    setExact(value = true): this {
        this.#exact = value
        return this
    }

    get value(): number {
        return this.fraction.value + this.root.value
    }

    get variable(): string {
        return this.#variable
    }

    set variable(value: string | undefined) {
        if (value === undefined) {
            return
        }

        this.#variable = value
    }
}