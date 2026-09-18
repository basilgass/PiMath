import {describe, expect, test} from "vitest"
import {Solution} from "../../src/analyze/solution"
import {Fraction} from "../../src/coefficients/fraction"
import {solveQuadratic} from "../../src/algebra/polynomRoots"

describe("Solution — fromQuadratic", () => {
    test("returns [] when the discriminant is negative", () => {
        // x^2 + 1 = 0
        expect(Solution.fromQuadratic(1, 0, 1)).toHaveLength(0)
    })

    test("returns rational roots as exact", () => {
        // x^2 + 7x + 10 = 0 -> -2, -5
        const sols = Solution.fromQuadratic(1, 7, 10)

        expect(sols.map(s => s.value)).to.have.all.members([-2, -5])
        expect(sols.every(s => s.exact === true)).toBe(true)
    })

    test("marks irrational quadratic roots exact (single source of truth)", () => {
        // x^2 - 2 = 0 -> ±sqrt(2), exact via index-2 Root
        const sols = Solution.fromQuadratic(1, 0, -2)

        expect(sols).toHaveLength(2)
        expect(sols.every(s => s.exact === true)).toBe(true)
    })
})

describe("Solution — fromPolynomRoot", () => {
    test("maps multiplicity to count and preserves parts", () => {
        // x^2 + 2x + 1 = 0 -> -1 double
        const [root] = solveQuadratic([new Fraction(1), new Fraction(2), new Fraction(1)])
        const sol = Solution.fromPolynomRoot(root)

        expect(sol.value).toBe(-1)
        expect(sol.count).toBe(2)
        expect(sol.exact).toBe(true)
    })
})
