import {describe, expect, test} from "vitest"
import {Fraction} from "../../src/coefficients/fraction"
import {solveCubicCardan, solveLinear, solvePolynom, solveQuadratic} from "../../src/algebra/polynomRoots"

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

describe("polynomRoots — solveCubicCardan", () => {
    test("finds the single real root of a one-root cubic (approximate)", () => {
        // x^3 + x^2 + 5x + 5 = 0 -> x = -1 ; coeffs [5, 5, 1, 1]
        const roots = solveCubicCardan([F(5), F(5), F(1), F(1)])

        expect(roots).toHaveLength(1)
        expect(roots[0].fraction.value).toBeCloseTo(-1, 6)
        expect(roots[0].exact).toBe(false)
    })

    test("finds three real roots (trigonometric branch, approximate)", () => {
        // x^3 + 2x^2 - 5x - 6 = 0 -> -3, -1, 2 ; coeffs [-6, -5, 2, 1]
        const roots = solveCubicCardan([F(-6), F(-5), F(2), F(1)])

        expect(roots).toHaveLength(3)
        expect(roots.map(r => r.fraction.value)[0]).toBeCloseTo(-3, 6)
        expect(roots.map(r => r.fraction.value)[1]).toBeCloseTo(-1, 6)
        expect(roots.map(r => r.fraction.value)[2]).toBeCloseTo(2, 6)
        expect(roots.every(r => r.exact === false)).toBe(true)
    })

    test("throws on a wrong-length vector", () => {
        expect(() => solveCubicCardan([F(1), F(2), F(3)])).toThrow()
    })
})

describe("polynomRoots — solvePolynom", () => {
    test("returns [] for empty or constant vectors", () => {
        expect(solvePolynom([])).toHaveLength(0)
        expect(solvePolynom([F(5)])).toHaveLength(0)
    })

    test("normalizes trailing high-degree zeros to the true degree", () => {
        // [1, 2, 0] is really 2x + 1 (degree 1), not a quadratic with a=0.
        const roots = solvePolynom([F(1), F(2), F(0)])

        expect(roots).toHaveLength(1)
        expect(roots[0].fraction.value).toBe(-1 / 2)
        expect(roots[0].exact).toBe(true)
    })

    test("dispatches degree 1 and 2 to closed forms", () => {
        // x - 2 = 0 -> [−2, 1]
        expect(solvePolynom([F(-2), F(1)])[0].fraction.value).toBe(2)
        // x^2 + 7x + 10 -> [10, 7, 1]
        expect(solvePolynom([F(10), F(7), F(1)]).map(r => r.fraction.value))
            .to.have.all.members([-2, -5])
    })

    test("strips the zero root with its multiplicity", () => {
        // x^5(x^2 + x - 1) : coeffs low->high = [0,0,0,0,0,-1,-1,1]
        const roots = solvePolynom([F(0), F(0), F(0), F(0), F(0), F(-1), F(-1), F(1)])

        const zero = roots.find(r => rootValueOf(r) === 0)
        expect(zero).toBeDefined()
        expect(zero?.multiplicity).toBe(5)
    })

    test("factors exact rational roots then sorts by value", () => {
        // (2x-1)(3x+5)(x-7)(x+3) = 6x^4 -17x^3 -159x^2 -127x +105 -> -3, -5/3, 1/2, 7
        // expanded low->high = [105, -127, -159, -17, 6]
        const roots = solvePolynom([F(105), F(-127), F(-159), F(-17), F(6)])

        expect(roots.map(r => r.fraction.value)).to.have.all.members([-3, -5 / 3, 1 / 2, 7])
    })

    test("routes a residual cubic to Cardan without looping", () => {
        // x^3 - 3x - 1 = 0 : three irrational roots, no rational root.
        const roots = solvePolynom([F(-1), F(-3), F(0), F(1)])

        expect(roots).toHaveLength(3)
        expect(roots.every(r => r.exact === false)).toBe(true)
    })

    test("bisects a degree-4+ residual with a negative leading term", () => {
        // -(x-1)(x-2)(x-3)(x-4)(x-5) = 0 -> 1..5
        // expanded low->high = [120, -274, 225, -85, 15, -1]
        const roots = solvePolynom([F(120), F(-274), F(225), F(-85), F(15), F(-1)])

        expect(roots.map(r => Math.round(rootValueOf(r)))).to.have.all.members([1, 2, 3, 4, 5])
    })

    test("rejects a non-positive bisection step", () => {
        const coeffs = [F(120), F(-274), F(225), F(-85), F(15), F(-1)]

        expect(() => solvePolynom(coeffs, {bisectionDeltaX: 0})).toThrow()
        expect(() => solvePolynom(coeffs, {bisectionDeltaX: -1})).toThrow()
    })
})

function rootValueOf(r: { fraction: {value: number}, root: {value: number} }): number {
    return r.fraction.value + r.root.value
}
