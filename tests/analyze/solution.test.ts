import {describe, expect, test} from "vitest"
import {Solution} from "../../src/analyze/solution"
import {Fraction} from "../../src/coefficients/fraction"
import {Root} from "../../src/coefficients/root"
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
        expect(sols.every(s => s.exact)).toBe(true)
    })

    test("marks irrational quadratic roots exact (single source of truth)", () => {
        // x^2 - 2 = 0 -> ±sqrt(2), exact via index-2 Root
        const sols = Solution.fromQuadratic(1, 0, -2)

        expect(sols).toHaveLength(2)
        expect(sols.every(s => s.exact)).toBe(true)
    })
})

describe("Solution — fromFraction", () => {
    test("builds an exact rational solution with a zero radical", () => {
        const sol = Solution.fromFraction(new Fraction(3, 2))

        expect(sol.exact).toBe(true)
        expect(sol.root.isZero()).toBe(true)
        expect(sol.value).toBe(1.5)
    })
})

describe("Solution — value / isZero", () => {
    test("value is the sum of the rational and radical parts", () => {
        // (1/2)x^2 - x - 1 = 0 -> 1 ± sqrt(3)
        const [neg, pos] = Solution.fromQuadratic(new Fraction(1, 2), -1, -1)

        expect(pos.value).toBeCloseTo(1 + Math.sqrt(3), 3)
        expect(neg.value).toBeCloseTo(1 - Math.sqrt(3), 3)
    })

    test("isZero is true only when both parts are zero", () => {
        expect(new Solution().isZero()).toBe(true)
        expect(Solution.fromFraction(2).isZero()).toBe(false)
    })
})

describe("Solution — display / tex overrides", () => {
    test("an explicit override short-circuits the computed rendering", () => {
        const sol = Solution.fromFraction(new Fraction(3, 2))

        sol.tex = "\\text{X}"
        sol.display = "X"

        expect(sol.tex).toBe("\\text{X}")
        expect(sol.display).toBe("X")
    })
})

describe("Solution — fromRoot", () => {
    test("builds a radical-only exact solution from a Root", () => {
        const sol = Solution.fromRoot(new Root().from(2, 2)) // sqrt(2)

        expect(sol.fraction.isZero()).toBe(true)
        expect(sol.root.isZero()).toBe(false)
        expect(sol.exact).toBe(true)
        expect(sol.value).toBeCloseTo(Math.SQRT2, 3)
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

describe("Solution — parse (type router)", () => {
    test("routes a Fraction to fromFraction", () => {
        const sol = new Solution().parse(new Fraction(3, 2))
        expect(sol.value).toBe(1.5)
        expect(sol.root.isZero()).toBe(true)
    })

    test("routes a Root to fromRoot", () => {
        const sol = new Solution().parse(new Root().from(2, 2))
        expect(sol.fraction.isZero()).toBe(true)
        expect(sol.value).toBeCloseTo(Math.SQRT2, 3)
    })

    test("routes a PolynomRoot to fromPolynomRoot", () => {
        const [dbl] = solveQuadratic([new Fraction(1), new Fraction(2), new Fraction(1)])
        const sol = new Solution().parse(dbl)
        expect(sol.value).toBe(-1)
        expect(sol.count).toBe(2)
    })

    test("routes a Solution to an independent copy", () => {
        const source = Solution.fromFraction(new Fraction(5))
        const sol = new Solution().parse(source)
        expect(sol).not.toBe(source)
        expect(sol.value).toBe(5)
    })

    test("routes a string to fromString", () => {
        const sol = new Solution('2/3')
        expect(sol.value).toBeCloseTo(2 / 3, 5)
    })
})

describe("Solution — copy / clone", () => {
    test("copy transfers math state, not display, and clears stale overrides", () => {
        // x^2 + 2x + 1 = 0 -> -1 (multiplicity 2)
        const [dbl] = solveQuadratic([new Fraction(1), new Fraction(2), new Fraction(1)])
        const source = Solution.fromPolynomRoot(dbl)
        source.tex = "SOURCE_OVERRIDE"

        const target = new Solution()
        target.tex = "TARGET_STALE"

        const returned = target.copy(source)

        expect(returned).toBe(target)          // mutates and returns this
        expect(target.value).toBe(-1)
        expect(target.count).toBe(2)
        expect(target.exact).toBe(true)
        expect(target.tex).toBe("-1")          // recomputed: neither transferred nor stale
    })

    test("copy clones the parts (no shared references)", () => {
        const source = Solution.fromFraction(new Fraction(3, 2))
        const target = new Solution().copy(source)

        expect(target.fraction).not.toBe(source.fraction)
        expect(target.root).not.toBe(source.root)
    })

    test("clone duplicates fully, including display overrides", () => {
        const source = Solution.fromFraction(new Fraction(3, 2))
        source.tex = "KEPT"

        const c = source.clone()

        expect(c.tex).toBe("KEPT")             // display state preserved
        expect(c.value).toBe(1.5)
        expect(c.fraction).not.toBe(source.fraction)   // isolation
    })
})

describe("Solution — variable", () => {
    test("accepts a single lowercase letter", () => {
        const sol = Solution.fromFraction(1)
        sol.variable = "t"
        expect(sol.variable).toBe("t")
    })

    test("ignores undefined (keeps the current variable)", () => {
        const sol = Solution.fromFraction(1)
        sol.variable = undefined
        expect(sol.variable).toBe("x")
    })

    test("rejects a multi-character or non-lowercase-letter variable", () => {
        const sol = Solution.fromFraction(1)
        expect(() => { sol.variable = "xy" }).toThrow()
        expect(() => { sol.variable = "X" }).toThrow()
        expect(() => { sol.variable = "1" }).toThrow()
    })
})

describe("Solution — tex / display rendering", () => {
    test("renders a fraction-only solution as the fraction itself", () => {
        const sol = Solution.fromFraction(new Fraction(3, 2))

        expect(sol.tex).toBe("\\frac{ 3 }{ 2 }")
        expect(sol.display).toBe("3/2")
    })

    test("renders a radical-only solution as the radical itself", () => {
        // x^2 - 2 = 0 -> ±sqrt(2), fraction part is zero
        const [neg, pos] = Solution.fromQuadratic(1, 0, -2)

        expect(neg.tex).toBe("- \\sqrt{ 2 }")
        expect(neg.display).toBe("-sqrt(2)")
        expect(pos.tex).toBe("\\sqrt{ 2 }")
        expect(pos.display).toBe("sqrt(2)")
    })

    test("renders a radical with a denominator as a fraction", () => {
        const sol = Solution.fromRoot("sqrt(2)/3")

        expect(sol.tex).toBe("\\frac{ \\sqrt{ 2 } }{ 3 }")
        expect(sol.display).toBe("sqrt(2)/3")
    })

    test.each([
        [1, 0, -2, ["-sqrt(2)", "sqrt(2)"]],
        [1, -2, -1, ["1-sqrt(2)", "1+sqrt(2)"]],
        [1, -1, -1, ["(1-sqrt(5))/2", "(1+sqrt(5))/2"]],
        [2, -4, 1, ["(2-sqrt(2))/2", "(2+sqrt(2))/2"]],
        [1, -4, 1, ["2-sqrt(3)", "2+sqrt(3)"]],
    ])("solves %sx^2+(%s)x+(%s) with simplified roots", (a, b, c, expected) => {
        expect(Solution.fromQuadratic(a, b, c).map(s => s.display)).toEqual(expected)
    })

    test("a solved radical is the same value as the one written by hand", () => {
        const [, pos] = Solution.fromQuadratic(1, 0, -2)
        const written = Solution.fromString("sqrt(2)")

        expect(pos.root.isEqual(written.root)).toBe(true)
        expect(pos.root.factor.isEqual(written.root.factor)).toBe(true)
        expect(pos.root.radical.isEqual(written.root.radical)).toBe(true)
    })

    test("composes a mixed solution over a common denominator (denominator != 1)", () => {
        // x^2 + x - 1 = 0 -> (-1±sqrt(5))/2
        const [neg, pos] = Solution.fromQuadratic(1, 1, -1)

        expect(neg.tex).toBe("\\frac{ -1 - \\sqrt{ 5 } }{ 2 }")
        expect(neg.display).toBe("(-1-sqrt(5))/2")
        expect(pos.tex).toBe("\\frac{ -1 + \\sqrt{ 5 } }{ 2 }")
        expect(pos.display).toBe("(-1+sqrt(5))/2")
    })

    test("composes a mixed solution without a denominator wrapper (denominator == 1)", () => {
        // (1/2)x^2 - x - 1 = 0 -> 1±sqrt(3)
        const [neg, pos] = Solution.fromQuadratic(new Fraction(1, 2), -1, -1)

        expect(neg.tex).toBe("1 - \\sqrt{ 3 }")
        expect(neg.display).toBe("1-sqrt(3)")
        expect(pos.tex).toBe("1 + \\sqrt{ 3 }")
        expect(pos.display).toBe("1+sqrt(3)")
    })
})
