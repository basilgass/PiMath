import type {InputValue} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Root} from "../coefficients/root"

export class Solution {
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
        const num = `${f.numerator} ${R.withSign.display}`

        if (f.denominator === 1) return num

        return `${num}/${f.denominator}`
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

    static fromQuadratic(A: InputValue<Fraction>, B: InputValue<Fraction>, C: InputValue<Fraction>): Solution[] {
        const [a, b, c] = [A, B, C].map(x => new Fraction(x))

        // D = b^2-4ac
        const delta2 = b.clone().pow(2).subtract(a.clone().multiply(c).multiply(4))
        if (delta2.isNegative()) {
            return []
        }

        if (delta2.isSquare()) {
            const delta = delta2.sqrt()
            const root1 = b.clone().opposite().subtract(delta).divide(a.clone().multiply(2))
            const root2 = b.clone().opposite().add(delta).divide(a.clone().multiply(2))

            return delta.isZero()
                ? [Solution.fromFraction(root1)]
                : [Solution.fromFraction(root1), Solution.fromFraction(root2)]
        }

        const sol1 = new Solution()
        sol1.fraction = b.clone().opposite().divide(a).divide(2)
        sol1.root = new Root().from(2, delta2, a.clone().multiply(2).inverse().opposite())
        sol1.setExact(false)

        const sol2 = new Solution()
        sol2.fraction = b.clone().opposite().divide(a).divide(2)
        sol2.root = new Root().from(2, delta2, a.clone().multiply(2).inverse())
        sol2.setExact(false)

        return [sol1, sol2]
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