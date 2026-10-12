import {describe, expect, it} from "vitest"
import {Domain} from "../../src/analyze/domain"
import {Interval} from "../../src/analyze/interval"
import {Solution} from "../../src/analyze/solution"
import {Fraction} from "../../src/coefficients"

function sol(n: number, d = 1): Solution {
    return Solution.fromFraction(new Fraction(n, d))
}

function iv(l: number | null, r: number | null, lo = true, ro = true): Interval {
    return Interval.fromBounds(l === null ? null : sol(l), r === null ? null : sol(r), lo, ro)
}

describe("Domain — factories", () => {
    it("empty()", () => {
        expect(Domain.empty().isEmpty()).toBe(true)
        expect(Domain.empty().display).toBe("O/")
    })

    it("real()", () => {
        expect(Domain.real().isEmpty()).toBe(false)
        expect(Domain.real().display).toBe("RR")
    })

    it("fromIntervals normalizes (sorts + merges)", () => {
        const d = Domain.fromIntervals([iv(3, 5), iv(1, 4)])
        expect(d.display).toBe("]1;5[")  // merged, open endpoints preserved
    })

    it("fromIntervals drops empty intervals", () => {
        const d = Domain.fromIntervals([Interval.empty(), iv(1, 2)])
        expect(d.length).toBe(1)
    })
})

describe("Domain — display special cases", () => {
    it("RR_+ (non-negative)", () => {
        expect(Domain.fromInterval(iv(0, null, false, true)).display).toBe("RR_+")
    })

    it("RR_+** (strictly positive)", () => {
        expect(Domain.fromInterval(iv(0, null, true, true)).display).toBe("RR_+**")
    })

    it("RR_- (non-positive)", () => {
        expect(Domain.fromInterval(iv(null, 0, true, false)).display).toBe("RR_-")
    })

    it("RR_-** (strictly negative)", () => {
        expect(Domain.fromInterval(iv(null, 0, true, true)).display).toBe("RR_-**")
    })

    it("RR\\{pts} — two open gaps", () => {
        const d = Domain.fromIntervals([iv(null, 1), iv(1, 3), iv(3, null)])
        expect(d.display).toBe("RR\\{1;3}")
    })

    it("RR\\{pt} — one open gap", () => {
        const d = Domain.fromIntervals([iv(null, 2), iv(2, null)])
        expect(d.display).toBe("RR\\{2}")
    })

    it("general union", () => {
        const d = Domain.fromIntervals([iv(1, 2, false, false), iv(4, 5, false, false)])
        expect(d.display).toBe("[1;2]uu[4;5]")
    })
})

describe("Domain — intersect", () => {
    it("]-∞;3[ ∩ ]1;+∞[ = ]1;3[", () => {
        const a = Domain.fromInterval(iv(null, 3))
        const b = Domain.fromInterval(iv(1, null))
        expect(a.intersect(b).display).toBe("]1;3[")
    })

    it("RR ∩ D = D", () => {
        const d = Domain.fromInterval(iv(1, 2, false, true))
        expect(Domain.real().intersect(d).display).toBe(d.display)
    })

    it("D ∩ ∅ = ∅", () => {
        expect(Domain.real().intersect(Domain.empty()).isEmpty()).toBe(true)
    })

    it("multi-interval intersection", () => {
        const a = Domain.fromIntervals([iv(null, 1), iv(3, null)])
        const b = Domain.fromInterval(iv(0, 4))
        const r = a.intersect(b)
        // ]-∞;1[ ∩ ]0;4[ = ]0;1[
        // ]3;+∞[ ∩ ]0;4[ = ]3;4[
        expect(r.length).toBe(2)
    })
})

describe("Domain — union", () => {
    it("merges overlapping intervals", () => {
        const a = Domain.fromInterval(iv(1, 3))
        const b = Domain.fromInterval(iv(2, 5))
        expect(a.union(b).display).toBe("]1;5[")
    })

    it("D ∪ ∅ = D", () => {
        const d = Domain.fromInterval(iv(1, 2))
        expect(d.union(Domain.empty()).display).toBe(d.display)
    })
})

describe("Domain — complement", () => {
    it("complement of ∅ is ℝ", () => {
        expect(Domain.empty().complement().display).toBe("RR")
    })

    it("complement of ℝ is ∅", () => {
        expect(Domain.real().complement().isEmpty()).toBe(true)
    })

    it("complement of ]1;+∞[ is ]-∞;1]", () => {
        const c = Domain.fromInterval(iv(1, null)).complement()
        expect(c.display).toBe("]-oo;1]")
    })

    it("complement of [1;3] is ]-∞;1[uu]3;+∞[", () => {
        const c = Domain.fromInterval(iv(1, 3, false, false)).complement()
        expect(c.length).toBe(2)
    })
})

describe("Domain — contains", () => {
    it("RR contains everything", () => {
        expect(Domain.real().contains(42)).toBe(true)
        expect(Domain.real().contains(-999)).toBe(true)
    })

    it("∅ contains nothing", () => {
        expect(Domain.empty().contains(0)).toBe(false)
    })

    it("RR\\{0} does not contain 0", () => {
        const d = Domain.fromIntervals([iv(null, 0), iv(0, null)])
        expect(d.contains(new Fraction(0))).toBe(false)
        expect(d.contains(1)).toBe(true)
    })

    it("contains(NaN) returns false", () => {
        expect(Domain.real().contains(NaN)).toBe(false)
        expect(Domain.fromInterval(iv(1, 3)).contains(NaN)).toBe(false)
    })
})

describe("Domain — fromString", () => {
    it("O/ → empty", () => {
        expect(Domain.fromString("O/").isEmpty()).toBe(true)
    })

    it("RR → real", () => {
        expect(Domain.fromString("RR").display).toBe("RR")
    })

    it("RR^** → two intervals through zero", () => {
        const d = Domain.fromString("RR^**")
        expect(d.length).toBe(2)
        expect(d.contains(0)).toBe(false)
        expect(d.contains(1)).toBe(true)
        expect(d.contains(-1)).toBe(true)
    })

    it("RR\\{2} → ℝ minus one point", () => {
        const d = Domain.fromString("RR\\{2}")
        expect(d.contains(2)).toBe(false)
        expect(d.contains(3)).toBe(true)
        expect(d.display).toBe("RR\\{2}")
    })

    it("RR\\{1;3} → ℝ minus two points, roundtrip", () => {
        const d = Domain.fromString("RR\\{1;3}")
        expect(d.contains(1)).toBe(false)
        expect(d.contains(3)).toBe(false)
        expect(d.contains(2)).toBe(true)
        expect(d.display).toBe("RR\\{1;3}")
    })

    it("{1;2;3} → union of three singletons", () => {
        const d = Domain.fromString("{1;2;3}")
        expect(d.length).toBe(3)
        expect(d.contains(1)).toBe(true)
        expect(d.contains(2)).toBe(true)
        expect(d.contains(1.5)).toBe(false)
    })

    it("]1;2[uu]4;5[ → union of two intervals", () => {
        const d = Domain.fromString("]1;2[uu]4;5[")
        expect(d.length).toBe(2)
        expect(d.contains(1.5)).toBe(true)
        expect(d.contains(4.5)).toBe(true)
        expect(d.contains(3)).toBe(false)
    })

    it("RR_+ → [0;+∞[", () => {
        const d = Domain.fromString("RR_+")
        expect(d.display).toBe("RR_+")
        expect(d.contains(0)).toBe(true)
        expect(d.contains(-1)).toBe(false)
    })

    it("RR_+** → ]0;+∞[", () => {
        const d = Domain.fromString("RR_+**")
        expect(d.display).toBe("RR_+**")
        expect(d.contains(0)).toBe(false)
    })

    it("single interval ]1;3] roundtrip", () => {
        const d = Domain.fromString("]1;3]")
        expect(d.display).toBe("]1;3]")
    })

    it("'{3}' single singleton delegated to Interval.fromString", () => {
        const d = Domain.fromString("{3}")
        expect(d.length).toBe(1)
        expect(d.contains(3)).toBe(true)
        expect(d.contains(2)).toBe(false)
    })

    it("invalid string throws ParseError", () => {
        expect(() => Domain.fromString("invalid")).toThrow()
    })
})

describe("Domain — clone/copy", () => {
    it("clone produces independent copy", () => {
        const d = Domain.fromInterval(iv(1, 3))
        const c = d.clone()
        expect(c.display).toBe(d.display)
        expect(c).not.toBe(d)
    })

    it("copy transfers state into receiver", () => {
        const d = Domain.fromInterval(iv(1, 3))
        const c = new Domain()
        c.copy(d)
        expect(c.display).toBe(d.display)
    })
})

describe('Domain normalization of left-unbounded intervals', () => {
    it('merges two intervals unbounded on the left', () => {
        const d = new Domain(']-oo;6[uu]-oo;5[')
        expect(d.length).toBe(1)
        expect(d.contains(5.5)).toBe(true)
        expect(d.contains(6)).toBe(false)
    })

    it('complement of a merged left-unbounded union starts at the largest bound', () => {
        const c = new Domain(']-oo;5[uu]-oo;6[').complement()
        expect(c.contains(5.5)).toBe(false)
        expect(c.contains(6)).toBe(true)
    })

    it('merges a left-unbounded interval with an overlapping bounded one', () => {
        expect(new Domain(']-oo;2[uu]1;3[').display).toBe(']-oo;3[')
    })
})
