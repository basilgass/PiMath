import {describe, test, expect} from "vitest"
import {Point} from "../../src/geometry/point"
import {Vector} from "../../src/geometry/vector"
import {DimensionError, InvalidArgumentError, ParseError} from "../../src/errors"

describe('Point construction', () => {
    test('constructs from scalar arguments', () => {
        const p = new Point(1, 2)
        expect(p.x.display).toBe('1')
        expect(p.y.display).toBe('2')
    })

    test('constructs from a string "(x;y)"', () => {
        const p = new Point('(3;4)')
        expect(p.x.display).toBe('3')
        expect(p.y.display).toBe('4')
    })

    test('constructs from another Point', () => {
        const a = new Point(1, 2)
        const b = new Point(a)
        expect(b.x.display).toBe('1')
        expect(b.y.display).toBe('2')
    })

    test('constructs from a Vector', () => {
        const v = new Vector(3, 5)
        const p = new Point(v)
        expect(p.x.display).toBe('3')
        expect(p.y.display).toBe('5')
    })

    test('throws when mixing a TupleN with scalars in multi-argument form', () => {
        expect(() => new Point(new Point(1, 2) as unknown, 3 as unknown)).toThrow(InvalidArgumentError)
        expect(() => new Point(new Vector(1, 2) as unknown, 3 as unknown)).toThrow(InvalidArgumentError)
    })

    test('throws ParseError when multi-argument scalars are invalid', () => {
        expect(() => new Point('x' as unknown, 'y' as unknown)).toThrow(ParseError)
    })
})

describe('Point.clone', () => {
    test('clone is independent — mutating clone does not affect original', () => {
        const p = new Point(1, 2)
        const c = p.clone()
        c.x = 99
        expect(p.x.display).toBe('1')
        expect(c.x.display).toBe('99')
    })

    test('clone preserves all coordinates', () => {
        const p = new Point(1, 2, 3)
        const c = p.clone()
        expect(c.dimension).toBe(3)
        expect(c.z.display).toBe('3')
    })
})

describe('Point.isEqual', () => {
    test('equal points return true', () => {
        expect(new Point(1, 2).isEqual(new Point(1, 2))).toBe(true)
    })

    test('different points return false', () => {
        expect(new Point(1, 2).isEqual(new Point(1, 3))).toBe(false)
    })

    test('uses exact Fraction comparison, not float', () => {
        const p = new Point('1/3', '2/3')
        expect(p.isEqual(new Point('1/3', '2/3'))).toBe(true)
    })

    test('returns false when dimensions differ', () => {
        const p2 = new Point(1, 2)
        const p3 = new Point(1, 2, 0)
        expect(p2.isEqual(p3)).toBe(false)
    })

    test('compares all coordinates in N-D', () => {
        expect(new Point(1, 2, 3).isEqual(new Point(1, 2, 3))).toBe(true)
        expect(new Point(1, 2, 3).isEqual(new Point(1, 2, 4))).toBe(false)
    })
})

describe('Point.distanceTo', () => {
    test('distance between (0;0) and (3;4) is 5', () => {
        const A = new Point(0, 0)
        const B = new Point(3, 4)
        expect(A.distanceTo(B).value).toBe(5)
    })

    test('distance between equal points is 0', () => {
        const A = new Point(2, 3)
        expect(A.distanceTo(new Point(2, 3)).value).toBe(0)
    })

    test('throws DimensionError when dimensions differ', () => {
        expect(() => new Point(1, 2).distanceTo(new Point(1, 2, 3))).toThrow(DimensionError)
    })
})

describe('Point.middleOf', () => {
    test('midpoint of (0;0) and (2;4) is (1;2)', () => {
        const M = new Point().middleOf(new Point(0, 0), new Point(2, 4))
        expect(M.x.display).toBe('1')
        expect(M.y.display).toBe('2')
    })

    test('static middleOf returns a new Point', () => {
        const M = Point.middleOf(new Point(0, 0), new Point(4, 6))
        expect(M.x.display).toBe('2')
        expect(M.y.display).toBe('3')
    })

    test('throws DimensionError when dimensions differ', () => {
        expect(() => new Point().middleOf(new Point(1, 2), new Point(1, 2, 3))).toThrow(DimensionError)
    })
})
