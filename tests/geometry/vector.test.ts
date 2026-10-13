import {describe, test, expect} from "vitest"
import {Vector} from "../../src/geometry/vector"
import {Point} from "../../src/geometry/point"
import {DimensionError, InvalidArgumentError, MathError, ParseError} from "../../src/errors"


describe('Vector creation', () => {
    test('create Vector', ()=>{
        const v = new Vector(1,2)
        expect(v).toBeDefined()
        expect(v.array.map(x=>x.value)).toEqual([1,2])
    })
    test('parse string (a;b)', ()=>{
        const v = new Vector('(1;2/3)')
        expect(v.x.display).toBe('1')
        expect(v.y.display).toBe('2/3')
    })

    test('parse string a,b', ()=>{
        const v = new Vector('2,3')
        expect(v.x.display).toBe('2')
        expect(v.y.display).toBe('3')

        const p = new Point('2,3')
        expect(p.x.display).toBe('2')
        expect(p.y.display).toBe('3')
    })

    test('clone Vector', ()=>{
        const v = new Vector(1,2)
        const clone = v.clone()
        clone.x = 5

        expect(v.x.display).toBe('1')
        expect(clone.x.display).toBe('5')
    })
    test('set to zero Vector', ()=>{
        const v = new Vector().setDimension(2).zero()

        expect(v.x.display).toBe('0')
        expect(v.y.display).toBe('0')
    })
    test('set to one Vector', ()=>{
        const v = new Vector().setDimension(2).one()

        expect(v.x.display).toBe('1')
        expect(v.y.display).toBe('0')
    })
})
describe('Vector output', () => {
    test('output as LaTeX', ()=>{
        const v = new Vector(2,-3)

        expect(v.tex).toBe('\\begin{pmatrix} 2 \\\\ -3 \\end{pmatrix}')
    })
    test('output as ASCII', ()=>{
        const v = new Vector(2,-3)

        expect(v.display).toBe('((2,-3))')
    })
})
describe('Vector.parse errors', () => {
    test('throws InvalidArgumentError when called with no arguments', () => {
        expect(() => new Vector(undefined as never)).toThrow(InvalidArgumentError)
    })

    test('throws InvalidArgumentError for a single non-string scalar', () => {
        expect(() => new Vector(42)).toThrow(InvalidArgumentError)
    })

    test('throws InvalidArgumentError when mixing TupleN with scalars', () => {
        expect(() => new Vector(new Point(1, 2) as never, 3)).toThrow(InvalidArgumentError)
    })

    test('throws ParseError for invalid scalar coordinates', () => {
        expect(() => new Vector('x', 'y')).toThrow(ParseError)
    })

    test('throws DimensionError when building AB from vectors of different dimension', () => {
        const A = new Point(1, 2)
        const B = new Point(1, 2, 3)
        expect(() => new Vector(A, B)).toThrow(DimensionError)
    })
})

describe('Vector construction from TupleN', () => {
    test('constructs from another Vector', () => {
        const v1 = new Vector(3, 4)
        const v2 = new Vector(v1)
        v2.x = 99
        expect(v1.x.display).toBe('3')
        expect(v2.x.display).toBe('99')
    })

    test('constructs from a Point', () => {
        const p = new Point(2, 5)
        const v = new Vector(p)
        expect(v.x.display).toBe('2')
        expect(v.y.display).toBe('5')
    })

    test('builds AB vector from two Points', () => {
        const A = new Point(1, 2)
        const B = new Point(4, 6)
        const v = new Vector(A, B)
        expect(v.x.display).toBe('3')
        expect(v.y.display).toBe('4')
    })
})

describe('Vector.fromString', () => {
    test('parses ((x,y)) double-paren format', () => {
        const v = Vector.fromString('((3,7))')
        expect(v.x.display).toBe('3')
        expect(v.y.display).toBe('7')
    })

    test('parses (x;y) semicolon format', () => {
        const v = Vector.fromString('(2;-5)')
        expect(v.x.display).toBe('2')
        expect(v.y.display).toBe('-5')
    })
})

describe('Vector 2D operations', () => {
    test('dot product', () => {
        const v1 = new Vector(3, 4)
        const v2 = new Vector(1, -2)
        expect(v1.dot(v2).display).toBe('-5')
    })

    test('isNormalTo returns true for perpendicular vectors', () => {
        expect(new Vector(1, 0).isNormalTo(new Vector(0, 1))).toBe(true)
    })

    test('isNormalTo returns false for non-perpendicular vectors', () => {
        expect(new Vector(1, 1).isNormalTo(new Vector(1, 0))).toBe(false)
    })

    test('normal produces perpendicular vector (x,y)→(y,−x)', () => {
        const v = new Vector(3, 4)
        v.normal()
        expect(v.x.display).toBe('4')
        expect(v.y.display).toBe('-3')
    })

    test('normal throws DimensionError on 3D vector', () => {
        expect(() => new Vector(1, 2, 3).normal()).toThrow(DimensionError)
    })

    test('cross throws DimensionError on 2D vector', () => {
        expect(() => new Vector(1, 0).cross(new Vector(0, 1))).toThrow(DimensionError)
    })

    test('unit normalises a vector to norm 1', () => {
        const v = new Vector(3, 4).unit()
        expect(v.norm).toBe(1)
    })

    test('unit on zero vector returns zero vector unchanged', () => {
        const v = new Vector(0, 0)
        v.unit()
        expect(v.x.display).toBe('0')
        expect(v.y.display).toBe('0')
    })

    test('divideByScalar', () => {
        const v = new Vector(6, 4).divideByScalar(2)
        expect(v.x.display).toBe('3')
        expect(v.y.display).toBe('2')
    })
})

// All other operation tests (add, subtract, multiply, norm, angle, colinear, equal, simplify) are in vector3d.test.ts
describe.todo('Vector generators')

describe('Vector.fromPolynom', () => {
    test('linear combination 2D: 3a+5b', () => {
        const a = new Vector(1, 0)
        const b = new Vector(0, 1)
        const v = Vector.fromPolynom('3a+5b', {a, b})
        expect(v.x.display).toBe('3')
        expect(v.y.display).toBe('5')
    })

    test('negative coefficient: -2a+b', () => {
        const a = new Vector(1, 0)
        const b = new Vector(0, 1)
        const v = Vector.fromPolynom('-2a+b', {a, b})
        expect(v.x.display).toBe('-2')
        expect(v.y.display).toBe('1')
    })

    test('single term: 3a', () => {
        const a = new Vector(2, 4)
        const v = Vector.fromPolynom('3a', {a})
        expect(v.x.display).toBe('6')
        expect(v.y.display).toBe('12')
    })

    test('vectors passed as strings', () => {
        const v = Vector.fromPolynom('2a+3b', {a: '((1,0))', b: '((0,1))'})
        expect(v.x.display).toBe('2')
        expect(v.y.display).toBe('3')
    })

    test('fractional coefficient: (1/2)a', () => {
        const a = new Vector(4, 6)
        const v = Vector.fromPolynom('(1/2)a', {a})
        expect(v.x.display).toBe('2')
        expect(v.y.display).toBe('3')
    })

    test('zero polynomial yields zero vector', () => {
        const a = new Vector(1, 2)
        const v = Vector.fromPolynom('0a', {a})
        expect(v.x.display).toBe('0')
        expect(v.y.display).toBe('0')
    })

    test('3D vectors', () => {
        const a = new Vector(1, 0, 0)
        const b = new Vector(0, 1, 0)
        const v = Vector.fromPolynom('2a+3b', {a, b})
        expect(v.x.display).toBe('2')
        expect(v.y.display).toBe('3')
        expect(v.z.display).toBe('0')
    })

    test('throws InvalidArgumentError when no vectors provided', () => {
        expect(() => Vector.fromPolynom('3a', {})).toThrow(InvalidArgumentError)
    })

    test('throws InvalidArgumentError when variable missing from dictionary', () => {
        const a = new Vector(1, 0)
        expect(() => Vector.fromPolynom('3a+2b', {a})).toThrow(InvalidArgumentError)
    })

    test('throws InvalidArgumentError for non-zero constant term', () => {
        const a = new Vector(1, 0)
        expect(() => Vector.fromPolynom('3a+2', {a})).toThrow(InvalidArgumentError)
    })

    test('throws InvalidArgumentError for non-linear monom (a²)', () => {
        const a = new Vector(1, 0)
        expect(() => Vector.fromPolynom('a^2', {a})).toThrow(InvalidArgumentError)
    })

    test('throws InvalidArgumentError for multi-variable monom (ab)', () => {
        const a = new Vector(1, 0)
        const b = new Vector(0, 1)
        expect(() => Vector.fromPolynom('ab', {a, b})).toThrow(InvalidArgumentError)
    })

    test('throws DimensionError when vectors have different dimensions', () => {
        const a = new Vector(1, 0)
        const b = new Vector(0, 1, 0)
        expect(() => Vector.fromPolynom('a+b', {a, b})).toThrow(DimensionError)
    })
})
describe('Vector angle rounding and degenerate cases', () => {
    test('colinear vectors give 0 and not NaN even when the ratio rounds above 1', () => {
        const a = new Vector(1, -8, 2)
        const b = new Vector(3, -24, 6)
        expect(a.angle(b)).toBeCloseTo(0, 4)
        expect(a.angle(b.clone().opposite())).toBeCloseTo(180, 4)
        expect(a.angle(b.clone().opposite(), true)).toBeCloseTo(0, 4)
    })

    test('a zero vector has no angle', () => {
        expect(() => new Vector(1, 2).angle(new Vector(0, 0))).toThrow(MathError)
    })
})
