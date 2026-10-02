import {describe, expect, test} from "vitest"
import {Factor, PolyFactor, Polynom} from "../../src"
import {TableOfSigns} from "../../src/analyze/tableOfSigns"

describe('TableOfSigns — construction', () => {
    test('fromPolynom via constructor', () => {
        const tos = new TableOfSigns(new Polynom('x-2'))
        expect(tos.roots).toHaveLength(1)
        expect(tos.signs).toEqual(['-', 'z', '+'])
    })

    test('fromFactor via constructor', () => {
        const tos = new TableOfSigns(new Factor('x-2', -1))
        expect(tos.signs).toEqual(['-', 'd', '+'])
    })

    test('fromPolyFactor via constructor', () => {
        const tos = new TableOfSigns(PolyFactor.fromPolynom('x-1', 'x+1'))
        expect(tos.roots).toHaveLength(2)
    })

    test('PolyFactor with shared root (x-1)×(x-1)²: root deduplicated, sign changes', () => {
        const tos = TableOfSigns.fromPolyFactor(new PolyFactor(
            new Factor('x-1', 1),
            new Factor('x-1', 2)
        ))
        expect(tos.roots).toHaveLength(1)
        expect(tos.signs).toEqual(['-', 'z', '+'])
        expect(tos.zeros()[0].value).toBe(1)
    })

    test('empty constructor produces empty domain', () => {
        const tos = new TableOfSigns()
        expect(tos.roots).toHaveLength(0)
        expect(tos.domain().display).toBe('O/')
    })
})

describe('TableOfSigns — positive / negative', () => {
    test('x-2: positive on ]2;+∞[', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-2'))
        expect(tos.positive().display).toBe(']2;+oo[')
    })

    test('x-2: negative on ]-∞;2[', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-2'))
        expect(tos.negative().display).toBe(']-oo;2[')
    })

    test('(x-1)(x-3): positive on ]-∞;1[ ∪ ]3;+∞[', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('(x-1)(x-3)'))
        expect(tos.positive().length).toBe(2)
        expect(tos.positive().contains(0)).toBe(true)
        expect(tos.positive().contains(4)).toBe(true)
        expect(tos.positive().contains(2)).toBe(false)
    })

    test('constant positive polynom: positive is RR', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('5'))
        expect(tos.positive().display).toBe('RR')
    })

    test('constant negative polynom: negative is RR', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('-3'))
        expect(tos.negative().display).toBe('RR')
    })
})

describe('TableOfSigns — nonNegative / nonPositive', () => {
    test('x²: nonNegative is RR (includes root at 0)', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x^2'))
        expect(tos.nonNegative().display).toBe('RR')
    })

    test('x²: positive excludes 0', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x^2'))
        expect(tos.positive().contains(0)).toBe(false)
    })

    test('x-2: nonNegative includes root [2;+∞[', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-2'))
        expect(tos.nonNegative().display).toBe('[2;+oo[')
    })

    test('x-2: nonPositive includes root ]-∞;2]', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-2'))
        expect(tos.nonPositive().display).toBe(']-oo;2]')
    })
})

describe('TableOfSigns — zero polynomial', () => {
    test('sign slot is z with no roots', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('0'))
        expect(tos.signs).toEqual(['z'])
        expect(tos.roots).toHaveLength(0)
    })

    test('positive and negative are empty', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('0'))
        expect(tos.positive().display).toBe('O/')
        expect(tos.negative().display).toBe('O/')
    })

    test('nonNegative and nonPositive are RR', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('0'))
        expect(tos.nonNegative().display).toBe('RR')
        expect(tos.nonPositive().display).toBe('RR')
    })

    test('domain is RR', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('0'))
        expect(tos.domain().display).toBe('RR')
    })
})

describe('TableOfSigns — factor sign adjustment', () => {
    test('even-power factor (x-1)²: signs are all non-negative', () => {
        const tos = TableOfSigns.fromFactor(new Factor('x-1', 2))
        expect(tos.signs).toEqual(['+', 'z', '+'])
    })

    test('even-power factor (x-1)²: nonNegative is RR', () => {
        const tos = TableOfSigns.fromFactor(new Factor('x-1', 2))
        expect(tos.nonNegative().display).toBe('RR')
    })

    test('even-power factor (x-1)²: zeros contains 1', () => {
        const tos = TableOfSigns.fromFactor(new Factor('x-1', 2))
        expect(tos.zeros()).toHaveLength(1)
        expect(tos.zeros()[0].value).toBe(1)
    })

    test('even-power factor (x-1)²: positive excludes the root', () => {
        const tos = TableOfSigns.fromFactor(new Factor('x-1', 2))
        expect(tos.positive().contains(1)).toBe(false)
        expect(tos.positive().contains(0)).toBe(true)
        expect(tos.positive().contains(2)).toBe(true)
    })
})

describe('TableOfSigns — zeros / poles', () => {
    test('zeros returns roots where sign = z', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('(x-1)(x-3)'))
        expect(tos.zeros().map(s => s.value)).toEqual(expect.arrayContaining([1, 3]))
        expect(tos.zeros()).toHaveLength(2)
    })

    test('poles returns roots where sign = d', () => {
        const tos = TableOfSigns.fromFactor(new Factor('x-2', -1))
        expect(tos.poles()).toHaveLength(1)
        expect(tos.poles()[0].value).toBe(2)
        expect(tos.zeros()).toHaveLength(0)
    })

    test('no poles for a polynomial', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x^2-4'))
        expect(tos.poles()).toHaveLength(0)
    })
})

describe('TableOfSigns — domain', () => {
    test('polynomial: domain is RR', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x^2-1'))
        expect(tos.domain().display).toBe('RR')
    })

    test('rational factor 1/(x-2): domain excludes pole', () => {
        const tos = TableOfSigns.fromFactor(new Factor('x-2', -1))
        expect(tos.domain().contains(2)).toBe(false)
        expect(tos.domain().contains(3)).toBe(true)
    })

    test('sqrt factor: domain excludes hole region', () => {
        const tos = TableOfSigns.fromFactor(new Factor('x-3', '1/2'))
        expect(tos.domain().display).toBe('[3;+oo[')
    })

    test('PolyFactor with pole and hole region: domain correct', () => {
        // sqrt(x+5) / x : defined when x+5 >= 0 and x ≠ 0
        const tos = TableOfSigns.fromPolyFactor(new PolyFactor(
            new Factor('x+5', '1/2'),
            new Factor('x', -1)
        ))
        expect(tos.domain().contains(-5)).toBe(true)   // sqrt(0)/(-5): x=0 is the pole, not here — wait: -5 → sqrt(0)/(-5) is defined? Actually x=-5: sqrt(-5+5)/(-5) = 0/(-5) = 0 → defined
        expect(tos.domain().contains(-6)).toBe(false)  // x+5 < 0 → hole region
        expect(tos.domain().contains(0)).toBe(false)   // pole
        expect(tos.domain().contains(1)).toBe(true)
    })
})

describe('TableOfSigns — clone / copy', () => {
    test('clone produces independent copy', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-1'))
        const clone = tos.clone()
        expect(clone.signs).toEqual(tos.signs)
        expect(clone).not.toBe(tos)
    })

    test('clone preserves display state', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-1'))
            .withLabel('g(x)')
            .withTkzTabOptions(3, 2)
        const clone = tos.clone()
        expect(clone.tex).toContain('\\(g(x)\\)/1')
        expect(clone.tex).toContain('[lgt=3,espcl=2]')
    })

    test('copy on instance with modified display state: target state preserved', () => {
        const src = TableOfSigns.fromPolynom(new Polynom('x-1'))
        const dst = new TableOfSigns()
        dst.withLabel('g(x)').withTkzTabOptions(4, 2)
        dst.copy(src)
        expect(dst.signs).toEqual(src.signs)
        expect(dst.tex).toContain('\\(g(x)\\)/1')
        expect(dst.tex).toContain('[lgt=4,espcl=2]')
    })

    test('copy transfers math state but not display state', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-1'))
        const other = new TableOfSigns()
        other.copy(tos)
        expect(other.signs).toEqual(tos.signs)
        expect(other.roots[0].value).toBe(1)
        // display state not copied: label stays at default
        expect(other.tex).toContain('\\(f(x)\\)/1')
    })
})

describe('TableOfSigns — tex output', () => {
    test('simple polynom: correct sign line', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-2'))
        expect(tos.tex).toContain('\\tkzTabLine{,-,z,+}')
    })

    test('simple polynom: root appears in bounds', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-2'))
        expect(tos.tex).toContain('\\(2\\)')
    })

    test('simple polynom: default label f(x)', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-2'))
        expect(tos.tex).toContain('\\(f(x)\\)/1')
    })

    test('simple polynom: exactly one empty tkzTabLine', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-2'))
        const emptyLines = tos.tex.split('\n').filter(l => l.trim() === '\\tkzTabLine{}')
        expect(emptyLines).toHaveLength(1)
    })

    test('withLabel changes the product row label', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-2')).withLabel('g(t)')
        expect(tos.tex).toContain('\\(g(t)\\)/1')
        expect(tos.tex).not.toContain('\\(f(x)\\)/1')
    })

    test('withTkzTabOptions sets lgt and espcl', () => {
        const tos = TableOfSigns.fromPolynom(new Polynom('x-2')).withTkzTabOptions(3, 2)
        expect(tos.tex).toContain('[lgt=3,espcl=2]')
    })

    test('PolyFactor without withFactors: only product line', () => {
        const pf = new PolyFactor(new Factor('x-1', 1), new Factor('x+2', 1))
        const tos = TableOfSigns.fromPolyFactor(pf)
        const signLines = tos.tex.split('\n').filter(l => l.includes('\\tkzTabLine{,'))
        expect(signLines).toHaveLength(1)
    })

    test('PolyFactor with withFactors: factor rows + product', () => {
        const pf = new PolyFactor(new Factor('x-1', 1), new Factor('x+2', 1))
        const tos = TableOfSigns.fromPolyFactor(pf).withFactors
        const signLines = tos.tex.split('\n').filter(l => l.includes('\\tkzTabLine{,'))
        // 2 factor rows + 1 product row
        expect(signLines).toHaveLength(3)
    })

    test('factor with power 1: label is polynom only', () => {
        const pf = new PolyFactor(new Factor('x-1', 1), new Factor('x+2', 1))
        const tos = TableOfSigns.fromPolyFactor(pf).withFactors
        expect(tos.tex).toContain('\\(x-1\\)/1')
        expect(tos.tex).toContain('\\(x+2\\)/1')
    })

    test('factor with power 2: label includes power', () => {
        const pf = new PolyFactor(new Factor('x-1', 2), new Factor('x+2', 1))
        const tos = TableOfSigns.fromPolyFactor(pf).withFactors
        // power != 1 → factor.tex used, which includes the exponent
        const tex = tos.tex
        expect(tex).not.toContain('\\(x-1\\)/1')
    })

    test('factor with power -1: label is polynom only (no negative power shown)', () => {
        const pf = new PolyFactor(new Factor('x-1', 1), new Factor('x+2', -1))
        const tos = TableOfSigns.fromPolyFactor(pf).withFactors
        // |pow| = 1 → polynom label only
        expect(tos.tex).toContain('\\(x+2\\)/1')
    })

    test('factor with power -2: label shows absolute power', () => {
        const pf = new PolyFactor(new Factor('x-1', 1), new Factor('x+2', -2))
        const tos = TableOfSigns.fromPolyFactor(pf).withFactors
        // |pow| = 2 → exponent shown, no raw \(x+2\)/1
        expect(tos.tex).not.toContain('\\(x+2\\)/1,')
    })

    test('factor with power 1/2: label includes power', () => {
        const pf = new PolyFactor(new Factor('x-1', '1/2'), new Factor('x', -1))
        const tos = TableOfSigns.fromPolyFactor(pf).withFactors
        // sqrt factor: power != 1 → factor.tex used
        expect(tos.tex).not.toContain('\\(x-1\\)/1')
    })
})
