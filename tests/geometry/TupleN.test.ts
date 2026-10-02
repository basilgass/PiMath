import {describe, test, expect} from "vitest"
import {Point} from "../../src/geometry/point"
import {Vector} from "../../src/geometry/vector"
import {ParseError} from "../../src/errors"

// TupleN is abstract — behaviors are tested via Point and Vector.

describe('fromString', () => {
    test('parses "(x;y)" notation', () => {
        const p = Point.fromString('(1;2)')
        expect(p.x.display).toBe('1')
        expect(p.y.display).toBe('2')
    })

    test('parses comma-separated values', () => {
        const p = Point.fromString('3,4')
        expect(p.x.display).toBe('3')
        expect(p.y.display).toBe('4')
    })

    test('parses space-separated values', () => {
        const p = Point.fromString('1 2')
        expect(p.x.display).toBe('1')
        expect(p.y.display).toBe('2')
    })

    test('parses 3 components', () => {
        const p = Point.fromString('1;2;3')
        expect(p.dimension).toBe(3)
        expect(p.z.display).toBe('3')
    })

    test('parses Vector "((x,y))" notation', () => {
        const v = Vector.fromString('((1,2))')
        expect(v.x.display).toBe('1')
        expect(v.y.display).toBe('2')
    })

    test('throws ParseError when fewer than 2 components', () => {
        expect(() => Point.fromString('1')).toThrow(ParseError)
        expect(() => Point.fromString('')).toThrow(ParseError)
    })
})

describe('setDimension', () => {
    test('extends a 2D tuple to 3D, padding with zeros', () => {
        const p = new Point(1, 2)
        p.setDimension(3)
        expect(p.dimension).toBe(3)
        expect(p.z.display).toBe('0')
    })

    test('truncates a 3D tuple to 2D', () => {
        const p = new Point(1, 2, 3)
        p.setDimension(2)
        expect(p.dimension).toBe(2)
    })

    test('leaves dimension unchanged when already at target', () => {
        const p = new Point(1, 2)
        p.setDimension(2)
        expect(p.dimension).toBe(2)
        expect(p.x.display).toBe('1')
    })

    test('throws DimensionError when target < 2', () => {
        const p = new Point(1, 2)
        expect(() => p.setDimension(1)).toThrow()
        expect(() => p.setDimension(0)).toThrow()
    })
})

describe('z accessor on 2D tuple', () => {
    test('z getter throws on a 2D tuple', () => {
        const p = new Point(1, 2)
        expect(() => p.z).toThrow()
    })

    test('z setter throws on a 2D tuple', () => {
        const p = new Point(1, 2)
        expect(() => { p.z = 5 }).toThrow()
    })

    test('z getter returns value on a 3D tuple', () => {
        const p = new Point(1, 2, 3)
        expect(p.z.display).toBe('3')
    })
})

describe('copy', () => {
    test('copies coordinates from another tuple', () => {
        const a = new Point(1, 2)
        const b = new Point(3, 4)
        a.copy(b)
        expect(a.x.display).toBe('3')
        expect(a.y.display).toBe('4')
    })

    test('copy is independent — mutating source does not affect target', () => {
        const a = new Point(1, 2)
        const b = new Point(3, 4)
        a.copy(b)
        b.x = 99
        expect(a.x.display).toBe('3')
    })
})

describe('isZero', () => {
    test('returns true for a zero tuple', () => {
        const p = new Point(0, 0)
        expect(p.isZero()).toBe(true)
    })

    test('returns false for a non-zero tuple', () => {
        const p = new Point(1, 0)
        expect(p.isZero()).toBe(false)
    })
})

describe('norm and normSquare', () => {
    test('normSquare of (3, 4) is 25', () => {
        const p = new Point(3, 4)
        expect(p.normSquare.value).toBe(25)
    })

    test('norm of (3, 4) is 5', () => {
        const p = new Point(3, 4)
        expect(p.norm).toBe(5)
    })
})

describe('opposite', () => {
    test('negates all coordinates', () => {
        const p = new Point(1, -2)
        p.opposite()
        expect(p.x.display).toBe('-1')
        expect(p.y.display).toBe('2')
    })
})

describe('zero', () => {
    test('sets all coordinates to zero', () => {
        const p = new Point(3, 4)
        p.zero()
        expect(p.x.display).toBe('0')
        expect(p.y.display).toBe('0')
    })
})
