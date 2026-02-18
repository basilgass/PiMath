import {describe, expect, test} from "vitest"
import {Line, Point, Vector} from "../../src"


describe('Line creation', () => {
    test('create Line', () => {
        const line = new Line()

        expect(line).toBeDefined()
    })
    test('create Line through two points', () => {
        const line = new Line().fromPoints(
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

        expect(L.isOnLine(P1)).toBe(false)
        expect(L.isOnLine(P2)).toBe(true)
    })
    test('clone Line', () => {
        const L = new Line().fromCoefficient(2, 3, 4)
        const cloned = L.clone()

        cloned.OA = new Point(0, 0)
        expect(L.asCanonical.display).toBe('2x+3y+4=0')
        expect(cloned.asCanonical.display).toBe('2x+3y=0')
    })
    test('create from a parallel', () => {
        const L = new Line().fromCoefficient(2, 3, 4)

        const P = new Point(7, -2)
        const parallel = new Line().fromParallel(L, P)

        expect(parallel.asCanonical.display).toBe('2x+3y-8=0')
        expect(parallel.OA.display).toBe('((7,-2))')

    })
    test('create from a perpendicular', () => {
        const L = new Line().fromCoefficient(2, 3, 4)

        const P = new Point(7, -2)
        const parallel = new Line().fromPerpendicular(L, P)

        expect(parallel.asCanonical.display).toBe('3x-2y-25=0')
        expect(parallel.OA.display).toBe('((7,-2))')

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
        const L1 = new Line().fromCoefficient(1, 2, 3)
        const L2 = new Line().fromCoefficient(2, 4, 6)

        expect(L1.isSameAs(L2)).toBe(true)
        expect(L2.isSameAs(L1)).toBe(true)
    })

    test('is parallel to', () => {
        const L1 = new Line().fromCoefficient(1, 2, 3)
        const L2 = new Line().fromParallel(L1, new Point(0, 0))

        expect(L1.isParallelTo(L2)).toBe(true)
        expect(L2.isParallelTo(L1)).toBe(true)
    })

    test('is perpendicular to', () => {
        const L1 = new Line().fromCoefficient(1, 2, 3)
        const L2 = new Line().fromPerpendicular(L1, new Point(0, 0))

        expect(L1.isPerpendicularTo(L2)).toBe(true)
        expect(L2.isPerpendicularTo(L1)).toBe(true)
    })

    test('is vertical', () => {
        const L1 = new Line().fromPointAndDirection(
            new Point(1, 0),
            new Vector(0, 1)
        )

        expect(L1.isVertical()).toBe(true)
        expect(L1.isHorizontal()).toBe(false)
    })

    test('is horizontal', () => {
        const L1 = new Line().fromPointAndDirection(
            new Point(1, 0),
            new Vector(1, 0)
        )

        expect(L1.isVertical()).toBe(false)
        expect(L1.isHorizontal()).toBe(true)
    })
})

describe.todo('Line static functions')

describe.todo('Line generators')

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
        const L1 = new Line().fromPointAndDirection(
            new Point(0, 0),
            new Vector(3, 2)
        )

        const L2 = new Line().fromPointAndDirection(
            new Point(5, 6),
            new Vector(-1, 2)
        )
        const P = L1.intersection(L2)
        expect(P.hasIntersection).toBe(true)
        expect(P.point.display).toBe('(6;4)')
    })

    test('should fail on intersection with parallel lnies', () => {
        const L1 = new Line().fromPointAndDirection(
            new Point(0, 0),
            new Vector(3, 2)
        )

        const L2 = new Line().fromPointAndDirection(
            new Point(5, 6),
            new Vector(3, 2)
        )
        const P = L1.intersection(L2)

        expect(P.hasIntersection).toBe(false)
    })

    test('should check if line hits a segment', () => {
        const L = new Line().fromPointAndDirection(
            new Point(0, 0),
            new Vector(3, 2)
        )

        const A = new Point(6, 0)
        const B = new Point(6, 1)
        const C = new Point(6, 10)

        expect(L.hitSegment(A, B)).toBe(false)
        expect(L.hitSegment(A, C)).toBe(true)
    })


    test('example', () => {
        const d = new Line().fromPoints(
            new Point(3,5),
            new Point(-1,2)
        )
        const P = new Point(11,-3)

        console.log(d.distanceTo(P).display)
    })


})