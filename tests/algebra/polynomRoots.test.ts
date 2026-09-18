import {describe, expect, test} from "vitest"
import {Fraction} from "../../src/coefficients/fraction"
import {solveLinear, solveQuadratic} from "../../src/algebra/polynomRoots"

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

describe("polynomRoots — solveQuadratic", () => {
    test("returns [] when the discriminant is negative", () => {
        // x^2 + 1 = 0 -> coeffs [1, 0, 1]
        expect(solveQuadratic([F(1), F(0), F(1)])).toHaveLength(0)
    })

    test("solves distinct rational roots (perfect-square discriminant)", () => {
        // x^2 + 7x + 10 = 0 -> -2, -5 ; coeffs [10, 7, 1]
        const roots = solveQuadratic([F(10), F(7), F(1)])

        expect(roots.map(r => r.fraction.value)).to.have.all.members([-2, -5])
        expect(roots.every(r => r.exact && r.root.isZero())).toBe(true)
        expect(roots.every(r => r.multiplicity === 1)).toBe(true)
    })

    test("collapses a double rational root into multiplicity 2", () => {
        // x^2 + 2x + 1 = 0 -> -1 (double) ; coeffs [1, 2, 1]
        const roots = solveQuadratic([F(1), F(2), F(1)])

        expect(roots).toHaveLength(1)
        expect(roots[0].fraction.value).toBe(-1)
        expect(roots[0].multiplicity).toBe(2)
    })

    test("keeps irrational roots exact via an index-2 Root", () => {
        // x^2 - 2 = 0 -> ±sqrt(2) ; coeffs [-2, 0, 1]
        const roots = solveQuadratic([F(-2), F(0), F(1)])

        expect(roots).toHaveLength(2)
        expect(roots.every(r => r.exact === true)).toBe(true)
        expect(roots.every(r => !r.root.isZero())).toBe(true)
        expect(roots[0].root.value).toBeCloseTo(-Math.SQRT2, 3)
        expect(roots[1].root.value).toBeCloseTo(Math.SQRT2, 3)
    })

    test("throws on a zero leading coefficient", () => {
        expect(() => solveQuadratic([F(1), F(2), F(0)])).toThrow()
    })
})
