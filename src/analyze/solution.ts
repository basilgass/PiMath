// TODO: remplacer ISolution par Solution, qui sera plus robuste et extensible

import type {InputValue} from "../pimath.interface"
import {Fraction} from "../coefficients"

export class Solution {
    #display: string
    #exact: boolean
    #isZero: boolean
    #tex: string
    #variable: string

    constructor() {
        this.#variable = 'x'
        this.#exact = false
        this.#isZero = true

        this.#display = '?'
        this.#tex = '?'
    }

    get tex(): string {
        return this.#tex
    }

    set tex(value: string) {
        this.#tex = value
    }

    get display(): string {
        return this.#display
    }

    set display(value: string) {
        this.#display = value
    }

    static fromFraction(value: InputValue<Fraction>): Solution {
        const sol = new Solution()
        sol.isExact()

        const F = new Fraction(value)
        sol.display = F.display
        sol.tex = F.tex

        return sol
    }

    static fromQuadratic(values: [InputValue<Fraction>, InputValue<Fraction>, InputValue<Fraction>]): Solution[] {
        const [a, b, c] = values.map(x => new Fraction(x))

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

        const solutions = [new Solution(), new Solution()]
        solutions.forEach(sol=> sol.isExact(false))

        return solutions
    }

    get exact(): boolean {
        return this.#exact
    }

    set exact(value: boolean) {
        this.#exact = value
    }

    isAZero(value = true): this {
        this.#isZero = value
        return this
    }

    isExact(value = true): this {
        this.#exact = value
        return this
    }

    get isZero(): boolean {
        return this.#isZero
    }

    set isZero(value: boolean) {
        this.#isZero = value
    }

    get value(): number {
        throw new Error("To be implemented")
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