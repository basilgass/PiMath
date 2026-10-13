import {describe, expect, test} from "vitest"
import {Equation, Line, ParseError, Point, Vector} from "../../src"
import {defined} from "../helpers/defined"


describe('Line creation', () => {
    test('create Line', () => {
        const line = new Line()

        expect(line).toBeDefined()
    })
    test('create Line through two points', () => {
        const line = Line.fromPoints(
            new Point(3, 4),
            new Point(1, 2)
        )

        expect(line).toBeDefined()
        expect(line.director.isColinearTo(new Vector(1, 1))).toBeTruthy()
    })
    test('create line from canonical coefficient', function () {
        // parse by canonical coefficients ax+by+c=0
        // a=3, b=2, c=1
        const L = new Line(3, 2, 1)

        const P1 = new Point(-2, 3)
        const P2 = new Point(-3, 4)

        expect(L.isPointOnLine(P1)).toBe(false)
        expect(L.isPointOnLine(P2)).toBe(true)
    })
    test('clone Line', () => {
        const L = Line.fromCoefficient(2, 3, 4)
        const cloned = L.clone()

        cloned.OA = new Point(0, 0)
        expect(L.asCanonical.display).toBe('2x+3y+4=0')
        expect(cloned.asCanonical.display).toBe('2x+3y=0')
    })
    test('create from a parallel', () => {
        const L = Line.fromCoefficient(2, 3, 4)

        const P = new Point(7, -2)
        const parallel = Line.fromParallel(L, P)

        expect(parallel.asCanonical.display).toBe('2x+3y-8=0')
        expect(parallel.OA.display).toBe('((7,-2))')

    })
    test('create from a perpendicular', () => {
        const L = Line.fromCoefficient(2, 3, 4)

        const P = new Point(7, -2)
        const perpendicular = Line.fromPerpendicular(L, P)

        expect(perpendicular.asCanonical.display).toBe('3x-2y-25=0')
        expect(perpendicular.OA.display).toBe('((7,-2))')

    })
    test('create parallel through fromPointAndLine', () => {
        const L = Line.fromCoefficient(2, 3, 4)
        const P = new Point(7, -2)
        const parallel = Line.fromPointAndLine(P, L)
        expect(parallel.asCanonical.display).toBe('2x+3y-8=0')
    })
    test('create perpendicular through fromPointAndLine', () => {
        const L = Line.fromCoefficient(2, 3, 4)
        const P = new Point(7, -2)
        const perpendicular = Line.fromPointAndLine(P, L, Line.PERPENDICULAR)
        expect(perpendicular.asCanonical.display).toBe('3x-2y-25=0')
    })
    test('fromEquation throws on equation without x or y', () => {
        expect(() => Line.fromEquation(new Equation('z+3=0'))).toThrow(ParseError)
    })
    test('fromEquation throws on nonlinear equation', () => {
        expect(() => Line.fromEquation(new Equation('x^2+y=0'))).toThrow(ParseError)
    })
    test('parse throws ParseError on unrecognized input', () => {
        expect(() => new Line(42)).toThrow(ParseError)
    })
})
describe('Line output', () => {
    const L = new Line('9x-8y-96=0')

    test('output as LaTeX', () => {
        expect(L.tex).toBe('9x-8y-96=0')
        expect(L.asCartesian.tex).toBe('9x-8y=96')
        expect(L.asMxh.tex).toBe('y=\\frac{ 9 }{ 8 }x-12')
        expect(L.asParametric.tex).toBe('\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ -12 \\end{pmatrix} + k\\cdot \\begin{pmatrix} 8 \\\\ 9 \\end{pmatrix}')
        expect(L.asSystem.tex).toBe(`\\left\\{\\begin{aligned}
\tx &= 8k\\\\
\ty &= -12+9k
\\end{aligned}\\right.`)
    })
    test('output as ASCII', () => {
        expect(L.display).toBe('9x-8y-96=0')
        expect(L.asCartesian.display).toBe('9x-8y=96')
        expect(L.asMxh.display).toBe('y=9/8x-12')
        expect(L.asParametric.display).toBe('((x,y))=((0,-12))+k((8,9))')
        expect(L.asSystem.display).toBe('{(x,=,8k),(y,=,-12+9k):}')
    })
})

describe('Line comparisons', () => {
    test('same Line', () => {
        const L1 = Line.fromCoefficient(1, 2, 3)
        const L2 = Line.fromCoefficient(2, 4, 6)

        expect(L1.isEqual(L2)).toBe(true)
        expect(L2.isEqual(L1)).toBe(true)
    })

    test('is parallel to', () => {
        const L1 = Line.fromCoefficient(1, 2, 3)
        const L2 = Line.fromParallel(L1, new Point(0, 0))

        expect(L1.isParallelTo(L2)).toBe(true)
        expect(L2.isParallelTo(L1)).toBe(true)
    })

    test('is perpendicular to', () => {
        const L1 = Line.fromCoefficient(1, 2, 3)
        const L2 = Line.fromPerpendicular(L1, new Point(0, 0))

        expect(L1.isPerpendicularTo(L2)).toBe(true)
        expect(L2.isPerpendicularTo(L1)).toBe(true)
    })

    test('is vertical', () => {
        const L1 = Line.fromPointAndDirection(
            new Point(1, 0),
            new Vector(0, 1)
        )

        expect(L1.isVertical()).toBe(true)
        expect(L1.isHorizontal()).toBe(false)
    })

    test('is horizontal', () => {
        const L1 = Line.fromPointAndDirection(
            new Point(1, 0),
            new Vector(1, 0)
        )

        expect(L1.isVertical()).toBe(false)
        expect(L1.isHorizontal()).toBe(true)
    })
})

describe('Vertical line comparisons', () => {
    const x1 = Line.fromCoefficient(1, 0, -1)  // x = 1
    const x2 = Line.fromCoefficient(1, 0, -2)  // x = 2
    const x1b = Line.fromCoefficient(2, 0, -2) // 2x = 2, same as x = 1

    test('two distinct vertical lines are parallel', () => {
        expect(x1.isParallelTo(x2)).toBe(true)
        expect(x2.isParallelTo(x1)).toBe(true)
    })

    test('two distinct vertical lines are not the same', () => {
        expect(x1.isEqual(x2)).toBe(false)
        expect(x2.isEqual(x1)).toBe(false)
    })

    test('proportional vertical lines are the same', () => {
        expect(x1.isEqual(x1b)).toBe(true)
        expect(x1b.isEqual(x1)).toBe(true)
    })

    test('parallel vertical lines have no intersection', () => {
        expect(x1.intersection(x2).hasIntersection).toBe(false)
        expect(x1.intersection(x2).isParallel).toBe(true)
    })

    test('vertical and non-vertical lines intersect', () => {
        const diagonal = new Line('x-y=0') // y = x
        const result = x1.intersection(diagonal)
        expect(result.hasIntersection).toBe(true)
        expect(defined(result.point).x.value).toBe(1)
        expect(defined(result.point).y.value).toBe(1)
    })
})

describe('Operation with Lines', function () {
    test('should evaluate coordinates at x', function () {
        const L = new Line('3x-4y+5=0')

        const y = L.getValueAtX(0)
        expect(y.display).toBe('5/4')
    })

    test('should evaluate coordinates at y', function () {
        const L = new Line('3x-4y+5=0')

        const y = L.getValueAtY(0)
        expect(y.display).toBe('-5/3')
    })

    test('should get the intersection point with another line', () => {
        const L1 = Line.fromPointAndDirection(
            new Point(0, 0),
            new Vector(3, 2)
        )

        const L2 = Line.fromPointAndDirection(
            new Point(5, 6),
            new Vector(-1, 2)
        )
        const P = L1.intersection(L2)
        expect(P.hasIntersection).toBe(true)
        expect(defined(P.point).display).toBe('(6;4)')
    })

    test('should fail on intersection with parallel lines', () => {
        const L1 = Line.fromPointAndDirection(
            new Point(0, 0),
            new Vector(3, 2)
        )

        const L2 = Line.fromPointAndDirection(
            new Point(5, 6),
            new Vector(3, 2)
        )
        const P = L1.intersection(L2)

        expect(P.hasIntersection).toBe(false)
    })

    test('should check if line hits a segment', () => {
        const L = Line.fromPointAndDirection(
            new Point(0, 0),
            new Vector(3, 2)
        )

        const A = new Point(6, 0)
        const B = new Point(6, 1)
        const C = new Point(6, 10)

        expect(L.hitSegment(A, B)).toBe(false)
        expect(L.hitSegment(A, C)).toBe(true)
    })


    test('distance from point to line', () => {
        const d = Line.fromPoints(
            new Point(3, 5),
            new Point(-1, 2)
        )
        const P = new Point(11, -3)

        expect(d.distanceTo(P).value).toBeCloseTo(11.2, 1)
    })

    test('getValueAtX returns invalid on vertical line', () => {
        const L = Line.fromCoefficient(1, 0, -3)  // x = 3
        expect(L.getValueAtX(0).isNaN()).toBe(true)
    })

})

describe('Line project', () => {
    test('projects a point onto the x-axis (y=0)', () => {
        const L = Line.fromCoefficient(0, 1, 0)   // y = 0
        const proj = L.project(new Point(3, 5))
        expect(proj.display).toBe('(3;0)')
    })

    test('projects a point onto a vertical line (x=2)', () => {
        const L = Line.fromCoefficient(1, 0, -2)  // x = 2
        const proj = L.project(new Point(7, 4))
        expect(proj.display).toBe('(2;4)')
    })

    test('returns the point itself when it lies on the line', () => {
        const L = Line.fromPoints(new Point(0, 0), new Point(1, 1))
        const pt = new Point(3, 3)
        expect(L.isPointOnLine(pt)).toBe(true)
        expect(L.project(pt).display).toBe('(3;3)')
    })

    test('projected point lies on the line', () => {
        const L = Line.fromPoints(new Point(0, 0), new Point(3, 1))
        const proj = L.project(new Point(2, 5))
        expect(L.isPointOnLine(proj)).toBe(true)
    })

    test('residual vector is perpendicular to the line direction', () => {
        const L = Line.fromPoints(new Point(1, 2), new Point(4, 6))
        const pt = new Point(0, 5)
        const proj = L.project(pt)
        const residual = new Vector(proj, pt)
        expect(residual.dot(L.d).isZero()).toBe(true)
    })
})

describe('Line reflect', () => {
    test('reflects a point through the x-axis (y=0)', () => {
        const L = Line.fromCoefficient(0, 1, 0)
        expect(L.reflect(new Point(3, 5)).display).toBe('(3;-5)')
    })

    test('reflects a point through a vertical line (x=2)', () => {
        const L = Line.fromCoefficient(1, 0, -2)
        expect(L.reflect(new Point(5, 4)).display).toBe('(-1;4)')
    })

    test('point on the line reflects to itself', () => {
        const L = Line.fromPoints(new Point(0, 0), new Point(1, 1))
        expect(L.reflect(new Point(3, 3)).display).toBe('(3;3)')
    })

    test('projection is the midpoint of point and its reflection', () => {
        const L = Line.fromPoints(new Point(0, 0), new Point(3, 1))
        const pt = new Point(1, 4)
        const ref = L.reflect(pt)
        const mid = new Point(
            pt.x.clone().add(ref.x).divide(2),
            pt.y.clone().add(ref.y).divide(2)
        )
        expect(L.isPointOnLine(mid)).toBe(true)
    })
})
