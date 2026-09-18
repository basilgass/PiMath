import {describe, expect, test} from "vitest"
import {Fraction} from "../../src/coefficients/fraction"
import {solveLinear} from "../../src/algebra/polynomRoots"

const F = (n: number, d = 1) => new Fraction(n, d)

describe("polynomRoots — solveLinear", () => {
    test("solves a1·x + a0 = 0 exactly", () => {
        // 2x + 4 = 0 -> x = -2, coeffs bas->haut = [4, 2]
        const roots = solveLinear([F(4), F(2)])

        expect(roots).toHaveLength(1)
        expect(roots[0].fraction.value).toBe(-2)
        expect(roots[0].root.isZero()).toBe(true)
        expect(roots[0].exact).toBe(true)
        expect(roots[0].multiplicity).toBe(1)
    })

    test("throws on a zero leading coefficient", () => {
        expect(() => solveLinear([F(4), F(0)])).toThrow()
    })

    test("throws on a wrong-length vector", () => {
        expect(() => solveLinear([F(4)])).toThrow()
    })
})
