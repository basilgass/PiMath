import {describe, expect, test} from "vitest"
import {Circle, CircleRelativePosition, Equation, Fraction, Line, Point, Vector} from "../../src"

describe('Circle creation', () => {
    test('create Circle', () => {
        const C = new Circle(new Point(8, 6), 20, true)

        expect(C).toBeDefined()
        expect(C.center.x.value).toBe(8)
        expect(C.center.y.value).toBe(6)
        expect(C.radius.value).toBe(+Math.sqrt(20).toFixed(3))
    })

    test('parse string', () => {
        const C = new Circle('(x-3)^2+(y+4)^2=16')
        expect(C.center.x.value).toBe(3)
        expect(C.center.y.value).toBe(-4)
        expect(C.radius.value).toBe(4)
    })

    test('create circle from center and through point', () => {
        const C = new Circle(
            new Point(1, 2),
            new Point(4, -2)
        )

        expect(C.center.x.value).toBe(1)
        expect(C.center.y.value).toBe(2)
        expect(C.radius.value).toBe(5)
    })

    test('create circle from three points', () => {
        const A = new Point(4, 4), B = new Point(6, 10), C = new Point(10, 2)
        const c = new Circle(A, B, C)
        expect(c.center.x.value).toBe(8)
        expect(c.center.y.value).toBe(6)
        expect(c.squareRadius.value).toBe(20)
    })

    test('fromEquation throws on non-circle equation', () => {
        expect(() => Circle.fromEquation(new Equation('x+y=1'))).toThrow()
        expect(() => Circle.fromEquation(new Equation('x^2+2y^2=4'))).toThrow()
    })

    test('fromPoints throws on collinear points', () => {
        expect(() => Circle.fromPoints(new Point(0, 0), new Point(1, 1), new Point(2, 2))).toThrow()
    })

    test('clone Circle', () => {
        const C = new Circle(new Point(8, 6), 20, true)
        const D = C.clone()
        D.setRadius(5)
        expect(D.center.x.value).toBe(8)
        expect(D.center.y.value).toBe(6)
        expect(D.radius.value).toBe(5)
        expect(C.radius.value).toBe(+Math.sqrt(20).toFixed(3))
    })
})

describe('Circle output', () => {
    test('output as LaTeX', () => {
        const C = new Circle(new Point(8, 6), 20, true)
        expect(C.tex).toBe('\\left(x-8\\right)^2+\\left(y-6\\right)^2=20')
    })
    test('output as ASCII', () => {
        const C = new Circle(new Point(8, 6), 20, true)
        expect(C.display).toBe('(x-8)^2+(y-6)^2=20')
    })
})

describe('Circle operations', () => {
    test('tangents through a Point on a Circle', () => {
        // Through one point on the circle
        const C = new Circle(
            new Point(-2, 3),
            25,
            true
        )

        const P = new Point(-5, 7)

        expect(C.tangents(P).map(x => x.display))
            .to.have.all.members(['3x-4y+43=0'])
    })

    test('tangents with a slope on a Circle', () => {
        // With a slope
        const D = new Circle('x^2+y^2+10x=2y-6'),
            slope = new Fraction(-2, 1)

        expect(D.tangents(slope).map(x => x.display))
            .to.have.all.members(['2x+y-1=0', '2x+y+19=0'])
    })

    test('tangents through an external Point on a Circle', () => {
        const E = new Circle('(x-2)^2+(y-1)^2=5')

        // Point is outside
        const P2 = new Point(6, -2)

        expect(E.tangents(P2).map(x => x.display))
            .to.have.all.members(['2x+y-10=0', '2x+11y+10=0'])

        // Point is inside
        const P3 = new Point(2, 2)
        expect(E.tangents(P3)).toHaveLength(0)
    })

    test('should calculate the intersection of a circle and a line', function () {
        const C = new Circle(
                new Point(8, 6),
                20,
                true
            ),
            LT = new Line('2x+y-32=0')
        // const LSe = new Line('3x-y-8=0')
        const LS = Line.fromPointAndDirection(
            new Point(3,1),
            new Vector(1,3)
        )
        const IPT = C.intersection(LT),
            IPS = C.intersection(LS)
        expect(IPT[0].x.value).to.be.equal(12)
        expect(IPT[0].y.value).to.be.equal(8)

        expect(IPS).to.be.length(2)
        expect(IPS[0].x.value).to.be.equal(4)
        expect(IPS[0].y.value).to.be.equal(4)
        expect(IPS[1].x.value).to.be.equal(6)
        expect(IPS[1].y.value).to.be.equal(10)
    })

    test('should get a list of point on the circle', function () {
        const C = new Circle('(x-3)^2+(y+4)^2=16')
        const pts = C.getPointsOnCircle()

        expect(pts.map(x => x.x.display + ',' + x.y.display)).to.have.all.members(['3,0', '3,-8', '7,-4', '-1,-4'])
    })

})
describe('Circle comparisons', () => {
    test('equal circles', () => {
        const C1 = Circle.fromCenterRadius(new Point(2, 3), 3)
        const C2 = Circle.fromString('(x-2)^2+(y-3)^2=9')
        const C3 = Circle.fromString('(x-2)^2+(y+3)^2=9')

        expect(C1.isEqual(C1)).toBe(true)
        expect(C1.isEqual(C2)).toBe(true)
        expect(C2.isEqual(C1)).toBe(true)
        expect(C1.isEqual(C3)).toBe(false)
    })
})

describe('Circle relative position', () => {
    test('external line returns 0', () => {
        const C = new Circle(new Point(0, 0), 5)
        const L = new Line('x-10=0')
        expect(C.relativePosition(L)).toBe(0)
    })

    test('tangent line returns 1', () => {
        const C = new Circle(new Point(0, 0), 25, true)
        const L = new Line('x-5=0')
        expect(C.relativePosition(L)).toBe(1)
    })

    test('secant line returns 2', () => {
        const C = new Circle(new Point(0, 0), 25, true)
        const L = new Line('x=0')
        expect(C.relativePosition(L)).toBe(2)
    })
})

describe('Circle parse and construction', () => {
    test('constructor with 3 points delegates to fromPoints', () => {
        const A = new Point(4, 4), B = new Point(6, 10), C = new Point(10, 2)
        const c1 = new Circle(A, B, C)
        const c2 = Circle.fromPoints(A, B, C)
        expect(c1.center.x.value).toBe(c2.center.x.value)
        expect(c1.center.y.value).toBe(c2.center.y.value)
    })

    test('fromEquation does not mutate the input equation', () => {
        const equ = new Equation('(x-3)^2+(y+4)^2=16')
        const original = equ.display
        Circle.fromEquation(equ)
        expect(equ.display).toBe(original)
    })

    test('clone preserves asDeveloped output style', () => {
        const C = new Circle(new Point(1, 2), 9, true).asDeveloped
        const D = C.clone()
        expect(D.tex).toBe(C.tex)
        expect(D.display).toBe(C.display)
    })
})

describe('Circle edge cases', () => {
    test('intersection with no intersection returns empty array', () => {
        const C = new Circle(new Point(0, 0), 25, true)
        const L = new Line('x-10=0')
        expect(C.intersection(L)).toHaveLength(0)
    })

    test('getPointsOnCircle with non-integer squared radius returns empty array', () => {
        const C = Circle.fromCenterRadius(new Point(0, 0), new Fraction(3, 2))
        expect(C.squareRadius.value).toBe(2.25)
        expect(C.getPointsOnCircle()).toHaveLength(0)
    })

    test('display with fractional center coordinates contains no LaTeX', () => {
        const C = Circle.fromCenterRadius(new Point(new Fraction(1, 2), new Fraction(3, 4)), 5)
        expect(C.display).not.toMatch(/\\/)
        expect(C.display).toContain('1/2')
        expect(C.display).toContain('3/4')
    })
})

describe('Circle relative position (circle-circle)', () => {
    test('circle inside another', () => {
        const C1 = new Circle(new Point(0, 0), 25, true)
        const C2 = new Circle(new Point(0, 2), 1)
        expect(C1.relativePosition(C2)).toBe(CircleRelativePosition.INTERIOR)
    })

    test('circle exterior to another', () => {
        const C1 = new Circle(new Point(0, 0), 25, true)
        const C2 = new Circle(new Point(10, 0), 1)
        expect(C1.relativePosition(C2)).toBe(CircleRelativePosition.EXTERIOR)
    })

    test('circle secant to another', () => {
        const C1 = new Circle(new Point(0, 0), 25, true)
        const C2 = new Circle(new Point(3, 0), 16, true)
        expect(C1.relativePosition(C2)).toBe(CircleRelativePosition.SECANT)
    })

    test('circle internally tangent to another', () => {
        // C1: center (0,0) r²=25, C2: center (2,0) r²=9 → d=2, r1=5, r2=3, r1=d+r2 → internally tangent
        const C1 = new Circle(new Point(0, 0), 25, true)
        const C2 = new Circle(new Point(2, 0), 9, true)
        expect(C1.relativePosition(C2)).toBe(CircleRelativePosition.TANGENT_INSIDE)
    })

    test('circle externally tangent to another', () => {
        // d=8, r1=5, r2=3, d=r1+r2 → externally tangent
        const C1 = new Circle(new Point(0, 0), 25, true)
        const C2 = new Circle(new Point(8, 0), 9, true)
        expect(C1.relativePosition(C2)).toBe(CircleRelativePosition.TANGENT_OUTSIDE)
    })

    test('superposed circles', () => {
        const C1 = new Circle(new Point(0, 0), 25, true)
        const C2 = new Circle(new Point(0, 0), 25, true)
        expect(C1.relativePosition(C2)).toBe(CircleRelativePosition.SUPERPOSED)
    })

    test('concentric circles', () => {
        const C1 = new Circle(new Point(0, 0), 25, true)
        const C2 = new Circle(new Point(0, 0), 9, true)
        expect(C1.relativePosition(C2)).toBe(CircleRelativePosition.CONCENTRIC)
    })
})

describe('Circle with irrational line intersections', () => {
    const C = new Circle(new Point(0, 0), 4, true)

    test('intersection keeps both irrational points instead of the chord midpoint twice', () => {
        const pts = C.intersection(Line.fromPoints(new Point(1, 0), new Point(0, 1)))
        expect(pts).toHaveLength(2)
        const [p, q] = pts
        expect(p.x.value + q.x.value).toBeCloseTo(1, 2)
        expect(Math.abs(p.x.value - q.x.value)).toBeGreaterThan(1)
        for (const pt of pts) {
            expect(pt.x.value ** 2 + pt.y.value ** 2).toBeCloseTo(4, 1)
            expect(pt.x.value + pt.y.value).toBeCloseTo(1, 2)
        }
    })

    test('tangents from an outside point with irrational slopes are two distinct tangent lines', () => {
        const tangents = C.tangents(new Point(3, 0))
        expect(tangents).toHaveLength(2)
        expect(tangents[0].isEqual(tangents[1])).toBe(false)
        for (const t of tangents) {
            // the slope is irrational, so the line is an approximation: the distance to the center is only close to the radius
            const distance = Math.abs(t.c.value) / Math.hypot(t.a.value, t.b.value)
            expect(distance).toBeCloseTo(2, 2)
            expect(t.isPointOnLine(new Point(3, 0))).toBe(true)
        }
    })
})
