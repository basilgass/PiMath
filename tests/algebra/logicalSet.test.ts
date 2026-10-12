import {describe, expect, test} from "vitest"
import {LogicalSet} from "../../src"

describe('LogicalSet — tex / display', () => {
    test('intersection: A & B', () => {
        const ls = new LogicalSet('A&B')
        expect(ls.tex).toBe('A \\cap B')
        expect(ls.display).toBe('A ∩ B')
    })

    test('union: A | B', () => {
        const ls = new LogicalSet('A|B')
        expect(ls.tex).toBe('A \\cup B')
        expect(ls.display).toBe('A ∪ B')
    })

    test('set difference: A - B', () => {
        const ls = new LogicalSet('A-B')
        expect(ls.tex).toBe('A \\setminus B')
        expect(ls.display).toBe('A \\ B')
    })

    test('complement: !A', () => {
        const ls = new LogicalSet('!A')
        expect(ls.tex).toBe('\\overline{ A }')
        expect(ls.display).toBe('overline(A)')
    })

    test('nested: (A & B) | C wraps the mix operand', () => {
        const ls = new LogicalSet('A&B|C')
        expect(ls.tex).toBe('( A \\cap B ) \\cup C')
        expect(ls.display).toBe('( A ∩ B ) ∪ C')
    })

    test('empty LogicalSet returns empty string', () => {
        expect(new LogicalSet().tex).toBe('')
        expect(new LogicalSet().display).toBe('')
    })
})

describe('LogicalSet — evaluate', () => {
    test('A & B: true only when both are true', () => {
        const ls = new LogicalSet('A&B')
        expect(ls.evaluate({A: true,  B: true})).toBe(true)
        expect(ls.evaluate({A: true,  B: false})).toBe(false)
        expect(ls.evaluate({A: false, B: true})).toBe(false)
        expect(ls.evaluate({A: false, B: false})).toBe(false)
    })

    test('A | B: true when at least one is true', () => {
        const ls = new LogicalSet('A|B')
        expect(ls.evaluate({A: true,  B: false})).toBe(true)
        expect(ls.evaluate({A: false, B: true})).toBe(true)
        expect(ls.evaluate({A: false, B: false})).toBe(false)
    })

    test('!A: negation', () => {
        const ls = new LogicalSet('!A')
        expect(ls.evaluate({A: true})).toBe(false)
        expect(ls.evaluate({A: false})).toBe(true)
    })

    test('A - B: true iff in A and not in B', () => {
        const ls = new LogicalSet('A-B')
        expect(ls.evaluate({A: true,  B: false})).toBe(true)
        expect(ls.evaluate({A: true,  B: true})).toBe(false)
        expect(ls.evaluate({A: false, B: false})).toBe(false)
    })

    test('missing keys default to false', () => {
        expect(new LogicalSet('A&B').evaluate({})).toBe(false)
        expect(new LogicalSet('A|B').evaluate({A: true})).toBe(true)
    })

    test('does not mutate the values argument', () => {
        const values = {A: true}
        new LogicalSet('A&B').evaluate(values)
        expect(Object.keys(values)).toEqual(['A'])
    })
})

describe('LogicalSet — vennAB', () => {
    test('A → zones where A is true', () => {
        expect(new LogicalSet('A').vennAB()).toEqual(['A', 'AB'])
    })

    test('B → zones where B is true', () => {
        expect(new LogicalSet('B').vennAB()).toEqual(['AB', 'B'])
    })

    test('A & B → intersection zone only', () => {
        expect(new LogicalSet('A&B').vennAB()).toEqual(['AB'])
    })

    test('A | B → all zones except exterior', () => {
        expect(new LogicalSet('A|B').vennAB()).toEqual(['A', 'AB', 'B'])
    })

    test('A - B → A-only zone', () => {
        expect(new LogicalSet('A-B').vennAB()).toEqual(['A'])
    })

    test('!A → complement of A', () => {
        expect(new LogicalSet('!A').vennAB()).toEqual(['B', 'E'])
    })

    test('empty LogicalSet returns []', () => {
        expect(new LogicalSet().vennAB()).toEqual([])
    })
})

describe('LogicalSet — vennABC', () => {
    test('A & B & C → triple intersection only', () => {
        expect(new LogicalSet('A&B&C').vennABC()).toEqual(['ABC'])
    })

    test('A & B → zones common to A and B', () => {
        expect(new LogicalSet('A&B').vennABC()).toEqual(['AB', 'ABC'])
    })

    test('A | B → all zones reachable by A or B', () => {
        expect(new LogicalSet('A|B').vennABC()).toEqual(['A', 'AB', 'ABC', 'AC', 'B', 'BC'])
    })

    test('!A → complement of A in three-set universe', () => {
        expect(new LogicalSet('!A').vennABC()).toEqual(['B', 'BC', 'C', 'E'])
    })
})

describe('LogicalSet — clone / copy / fromString', () => {
    test('clone produces an independent instance with same tex', () => {
        const original = new LogicalSet('A&B')
        const cloned = original.clone()
        expect(cloned.tex).toBe(original.tex)
        cloned.parse('A|B')
        expect(original.tex).toBe('A \\cap B')
    })

    test('copy transfers mathematical state', () => {
        const source = new LogicalSet('A|B')
        const target = new LogicalSet()
        target.copy(source)
        expect(target.tex).toBe('A \\cup B')
    })

    test('fromString produces the same result as constructor', () => {
        expect(LogicalSet.fromString('A&B').tex).toBe(new LogicalSet('A&B').tex)
    })

    test('parse throws ParseError on invalid input', () => {
        expect(() => new LogicalSet('###')).toThrow()
    })
})

describe('LogicalSet — venn (n sets)', () => {
    test('venn("A","B") matches vennAB()', () => {
        const ls = new LogicalSet('A&B')
        expect(ls.venn('A', 'B')).toEqual(ls.vennAB())
    })

    test('venn("A","B","C") matches vennABC()', () => {
        const ls = new LogicalSet('A|B')
        expect(ls.venn('A', 'B', 'C')).toEqual(ls.vennABC())
    })

    test('4 sets: A&B&C&D → only ABCD zone', () => {
        expect(new LogicalSet('A&B&C&D').venn('A', 'B', 'C', 'D')).toEqual(['ABCD'])
    })

    test('4 sets: A|B → all zones touching A or B', () => {
        const result = new LogicalSet('A|B').venn('A', 'B', 'C', 'D')
        expect(result).toContain('A')
        expect(result).toContain('AB')
        expect(result).toContain('ABCD')
        expect(result).not.toContain('C')
        expect(result).not.toContain('D')
        expect(result).not.toContain('E')
    })

    test('variable in RPN but absent from venn params → treated as ∅', () => {
        // A&C with venn('A','B'): C is unknown → C = ∅ → A&∅ = ∅
        expect(new LogicalSet('A&C').venn('A', 'B')).toEqual([])
    })

    test('variable in venn params but absent from RPN → unused dimension', () => {
        // A&B with venn('A','B','C'): C is unused → same as vennABC for A&B
        expect(new LogicalSet('A&B').venn('A', 'B', 'C')).toEqual(['AB', 'ABC'])
    })

    test('throws if called with no arguments', () => {
        expect(() => new LogicalSet('A&B').venn()).toThrow()
    })

    test('throws if a variable is not a single character', () => {
        expect(() => new LogicalSet('A&B').venn('AB', 'C')).toThrow()
    })

    test('deduplicates repeated variable arguments', () => {
        expect(new LogicalSet('A&B').venn('A', 'B', 'A')).toEqual(
            new LogicalSet('A&B').venn('A', 'B')
        )
    })
})

describe('LogicalSet — withUniverse', () => {
    test('changes the exterior zone label in venn()', () => {
        const result = new LogicalSet('!A').withUniverse('Ω').vennAB()
        expect(result).toContain('Ω')
        expect(result).not.toContain('E')
    })

    test('default exterior label is "E"', () => {
        expect(new LogicalSet('!A').vennAB()).toContain('E')
    })

    test('clone() preserves withUniverse label', () => {
        const original = new LogicalSet('!A').withUniverse('U')
        const cloned = original.clone()
        expect(cloned.vennAB()).toContain('U')
    })

    test('copy() does not transfer withUniverse label', () => {
        const source = new LogicalSet('!A').withUniverse('U')
        const target = new LogicalSet().withUniverse('Ω')
        target.copy(source)
        expect(target.vennAB()).toContain('Ω')
    })
})

describe('LogicalSet — variables', () => {
    test('returns the list of variable names', () => {
        expect(new LogicalSet('A&B').variables).toEqual(['A', 'B'])
    })

    test('deduplicates repeated variables', () => {
        expect(new LogicalSet('A&A').variables).toEqual(['A'])
    })

    test('returns [] for empty expression', () => {
        expect(new LogicalSet().variables).toEqual([])
    })
})

describe('LogicalSet — operator precedence', () => {
    const table = (expression: string) => {
        const L = new LogicalSet(expression)
        return [0, 1, 2, 3, 4, 5, 6, 7]
            .map(m => (L.evaluate({A: !!(m & 1), B: !!(m & 2), C: !!(m & 4)}) ? 1 : 0))
            .join('')
    }

    test('& and | share a level and apply from left to right', () => {
        expect(table('A|B&C')).toBe(table('(A|B)&C'))
        expect(table('A&B|C')).toBe(table('(A&B)|C'))
        expect(table('A|B&C')).not.toBe(table('A|(B&C)'))
    })

    test('! binds tighter than & and |', () => {
        expect(table('!A&B')).toBe(table('(!A)&B'))
        expect(table('!A|!B')).toBe(table('(!A)|(!B)'))
    })

    test('- is applied after & and from left to right', () => {
        expect(table('A-B&C')).toBe(table('A-(B&C)'))
        expect(table('A-B-C')).toBe(table('(A-B)-C'))
    })
})
