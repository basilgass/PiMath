import {describe, expect, test} from "vitest"
import {Circle, Fraction, Line, Point, Vector} from "../../src"

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

    test('create circle from three points', ()=>{
        const A = new Point(4,4)
        const B = new Point(6,10)
        const C = new Point(10,2)

        const c = new Circle().fromPoints(A, B, C)

        expect(c.center.x.value).toBe(8)
        expect(c.center.y.value).toBe(6)
        expect(c.squareRadius.value).toBe(20)
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
        const LS = new Line().fromPointAndDirection(
            new Point(3,1),
            new Vector(1,3)
        )
        const IPT = C.lineIntersection(LT),
            IPS = C.lineIntersection(LS)
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
    test('same Circle', ()=>{
        const C1 = new Circle().fromCenterRadius(
            new Point(2,3),
            3
        )

        const C2 = new Circle().fromString('(x-2)^2+(y-3)^2=9')
        const C3 = new Circle().fromString('(x-2)^2+(y+3)^2=9')

        expect(C1.isSame(C1)).toBe(true)
        expect(C1.isSame(C2)).toBe(true)
        expect(C2.isSame(C1)).toBe(true)
        expect(C1.isSame(C3)).toBe(false)
    })
})

describe.skip('Circle static functions')

describe.skip('Circle generators')
