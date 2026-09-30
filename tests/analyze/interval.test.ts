import {describe, expect, it} from "vitest"
import {Interval} from "../../src/analyze/interval"
import {Solution} from "../../src/analyze/solution"
import {Fraction} from "../../src/coefficients"

function sol(n: number, d = 1): Solution {
    return Solution.fromFraction(new Fraction(n, d))
}

describe("Interval — factories", () => {
    it("real() spans all of ℝ", () => {
        const iv = Interval.real()
        expect(iv.left).toBeNull()
        expect(iv.right).toBeNull()
        expect(iv.isReal()).toBe(true)
        expect(iv.isEmpty()).toBe(false)
    })

    it("empty() is empty", () => {
        expect(Interval.empty().isEmpty()).toBe(true)
    })

    it("point(x) is a closed singleton", () => {
        const iv = Interval.point(sol(3))
        expect(iv.isPoint()).toBe(true)
        expect(iv.isEmpty()).toBe(false)
    })

    it("fromBounds enforces infinite endpoints to be open", () => {
        const iv = Interval.fromBounds(null, sol(2), false, false)
        expect(iv.leftOpen).toBe(true)  // null → forced open
        expect(iv.rightOpen).toBe(false)
    })
})

describe("Interval — isEmpty / isPoint", () => {
    it("degenerate open interval ]a;a[ is empty", () => {
        const iv = Interval.fromBounds(sol(2), sol(2), true, false)
        expect(iv.isEmpty()).toBe(true)
    })

    it("degenerate half-open interval ]a;a] is empty", () => {
        expect(Interval.fromBounds(sol(2), sol(2), true, false).isEmpty()).toBe(true)
    })

    it("[a;a] is a point, not empty", () => {
        const iv = Interval.fromBounds(sol(2), sol(2), false, false)
        expect(iv.isPoint()).toBe(true)
        expect(iv.isEmpty()).toBe(false)
    })

    it("reversed bounds ]b;a[ with b>a is empty", () => {
        expect(Interval.fromBounds(sol(5), sol(2), true, true).isEmpty()).toBe(true)
    })
})

describe("Interval — contains", () => {
    it("]-∞;2] contains 2", () => {
        const iv = Interval.fromBounds(null, sol(2), true, false)
        expect(iv.contains(new Fraction(2))).toBe(true)
    })

    it("]-∞;2[ does not contain 2", () => {
        const iv = Interval.fromBounds(null, sol(2), true, true)
        expect(iv.contains(new Fraction(2))).toBe(false)
    })

    it("[1;3] contains 2", () => {
        expect(Interval.fromBounds(sol(1), sol(3), false, false).contains(2)).toBe(true)
    })

    it("empty interval contains nothing", () => {
        expect(Interval.empty().contains(0)).toBe(false)
    })
})

describe("Interval — intersect", () => {
    it("]-∞;3[ ∩ ]1;+∞[ = ]1;3[", () => {
        const a = Interval.fromBounds(null, sol(3), true, true)
        const b = Interval.fromBounds(sol(1), null, true, true)
        const r = a.intersect(b)
        expect(r.left?.value).toBe(1)
        expect(r.right?.value).toBe(3)
        expect(r.leftOpen).toBe(true)
        expect(r.rightOpen).toBe(true)
    })

    it("[1;3] ∩ [2;5] = [2;3]", () => {
        const r = Interval.fromBounds(sol(1), sol(3), false, false)
            .intersect(Interval.fromBounds(sol(2), sol(5), false, false))
        expect(r.left?.value).toBe(2)
        expect(r.right?.value).toBe(3)
    })

    it("disjoint intervals return empty", () => {
        const r = Interval.fromBounds(sol(1), sol(2), false, false)
            .intersect(Interval.fromBounds(sol(3), sol(4), false, false))
        expect(r.isEmpty()).toBe(true)
    })

    it("open endpoint at boundary returns empty", () => {
        const r = Interval.fromBounds(null, sol(2), true, true)
            .intersect(Interval.fromBounds(sol(2), null, true, true))
        expect(r.isEmpty()).toBe(true)
    })

    it("closed endpoint at boundary returns point", () => {
        const r = Interval.fromBounds(null, sol(2), true, false)
            .intersect(Interval.fromBounds(sol(2), null, false, true))
        expect(r.isPoint()).toBe(true)
        expect(r.left?.value).toBe(2)
    })

    it("any ∩ empty = empty", () => {
        expect(Interval.real().intersect(Interval.empty()).isEmpty()).toBe(true)
    })
})

describe("Interval — display/tex (French notation)", () => {
    it("empty → O/ / \\emptyset", () => {
        expect(Interval.empty().display).toBe("O/")
        expect(Interval.empty().tex).toBe("\\emptyset")
    })

    it("real → ]-oo;+oo[", () => {
        expect(Interval.real().display).toBe("]-oo;+oo[")
    })

    it("point {3} display", () => {
        expect(Interval.point(sol(3)).display).toBe("{3}")
    })

    it("]1;2] display", () => {
        const iv = Interval.fromBounds(sol(1), sol(2), true, false)
        expect(iv.display).toBe("]1;2]")
    })

    it("[1;2[ tex", () => {
        const iv = Interval.fromBounds(sol(1), sol(2), false, true)
        expect(iv.tex).toBe("[1;2[")
    })
})

describe("Interval — clone/copy", () => {
    it("clone produces independent copy", () => {
        const a = Interval.fromBounds(sol(1), sol(3), false, true)
        const b = a.clone()
        expect(b.display).toBe(a.display)
        expect(b).not.toBe(a)
    })
})
