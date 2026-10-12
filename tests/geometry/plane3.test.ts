import {describe, expect, it, test} from "vitest"
import {Plane3} from "../../src/geometry/plane3"
import {Line3} from "../../src/geometry/line3"
import {Point} from "../../src/geometry/point"
import {Vector} from "../../src/geometry/vector"
import {Equation} from "../../src/algebra/equation"
import {Polynom} from "../../src/algebra/polynom"
import {ParseError} from "../../src/errors"

describe('Plane3 construction', () => {
    it('builds from a point and a normal vector', () => {
        const P = new Point(1, 2, 3)
        const N = new Vector(4, 5, 6)
        const plane = new Plane3({point: P, normal: N})

        expect(plane.normal.display).toBe('((4,5,6))')
        expect(plane.point.display).toBe('(1;2;3)')
    })

    it('builds from a point and two direction vectors', () => {
        const P = new Point(1, 0, 3)
        const v1 = new Vector(2, 1, -3)
        const v2 = new Vector(0, 2, -1)
        const plane = new Plane3({point: P, directions: [v1, v2]})

        expect(plane.normal.display).toBe(v1.cross(v2).display)
    })

    it('builds from three points', () => {
        const P1 = new Point(1, 0, 0)
        const P2 = new Point(0, 1, 0)
        const P3 = new Point(0, 0, 1)
        const plane = new Plane3({points: [P1, P2, P3]})

        expect(plane.isPointOnPlane(P1)).toBe(true)
        expect(plane.isPointOnPlane(P2)).toBe(true)
        expect(plane.isPointOnPlane(P3)).toBe(true)
    })

    it('builds from a cartesian equation', () => {
        const eq = new Equation(new Polynom('xyz', 2, 3, -1, 4), new Polynom(0))
        const plane = Plane3.fromEquation(eq)

        expect(plane.a.display).toBe('2')
        expect(plane.b.display).toBe('3')
        expect(plane.c.display).toBe('-1')
        expect(plane.d.display).toBe('4')
    })

    it('builds from four coefficients — point lies on the plane', () => {
        const plane = Plane3.fromCoefficients(1, 2, 3, -6)

        expect(plane.a.display).toBe('1')
        expect(plane.d.display).toBe('-6')
        expect(plane.isPointOnPlane(plane.point)).toBe(true)
    })

    it('fromCoefficients stores d correctly regardless of c value', () => {
        // bug regression: old code used new Point(0,0,-d) which ignored c
        const plane = Plane3.fromCoefficients(0, 0, 2, -4)

        expect(plane.d.display).toBe('-4')
        expect(plane.isPointOnPlane(plane.point)).toBe(true)
    })

    it('throws ParseError on empty config', () => {
        expect(() => new Plane3({})).toThrow(ParseError)
    })
})

describe('Plane3 output', () => {
    it('outputs correct LaTeX equation from point and normal', () => {
        const P = new Point(1, 2, 3)
        const N = new Vector(4, 5, 6)
        const plane = new Plane3({point: P, normal: N})

        expect(plane.tex).toBe('4x+5y+6z-32=0')
    })

    it('tex and display both produce the cartesian equation', () => {
        const plane = Plane3.fromCoefficients(1, 2, 3, -6)

        expect(plane.tex).toBe('x+2y+3z-6=0')
        expect(plane.display).toBe('x+2y+3z-6=0')
    })
})

describe('Plane3 clone / copy', () => {
    it('clone produces an independent copy', () => {
        const P = new Point(1, 2, 3)
        const N = new Vector(4, 5, 6)
        const plane = new Plane3({point: P, normal: N})
        const clone = plane.clone()

        expect(clone.tex).toBe(plane.tex)
        clone.normal = new Vector(1, 0, 0)
        expect(clone.tex).not.toBe(plane.tex)
    })

    it('copy transfers mathematical state', () => {
        const p1 = Plane3.fromCoefficients(1, 0, 0, -3)
        const p2 = Plane3.fromCoefficients(0, 1, 0, -5)
        p2.copy(p1)

        expect(p2.tex).toBe(p1.tex)
    })
})

describe('Plane3 geometric operations', () => {
    it('distanceTo returns correct distance from a point', () => {
        const plane = Plane3.fromCoefficients(0, 0, 1, -2)

        expect(plane.distanceTo(new Point(0, 0, 5)).value).toBeCloseTo(3)
        expect(plane.distanceTo(new Point(1, 1, 2)).value).toBeCloseTo(0)
    })

    it('isPointOnPlane returns true for a point on the plane', () => {
        const plane = new Plane3({point: new Point(0, 0, 0), normal: new Vector(1, 1, 1)})

        expect(plane.isPointOnPlane(new Point(1, -1, 0))).toBe(true)
        expect(plane.isPointOnPlane(new Point(0, 0, 1))).toBe(false)
    })

    it('intersectWithLine returns the correct intersection point', () => {
        const plane = Plane3.fromCoefficients(0, 0, 1, 0)
        const line = new Line3(new Point(0, 0, 3), new Vector(0, 0, -1))
        const result = plane.intersectWithLine(line)

        expect(result.hasIntersection).toBe(true)
        expect(result.point!.display).toBe('(0;0;0)')
    })

    it('intersectWithLine returns isParallel for a line parallel to the plane', () => {
        const plane = Plane3.fromCoefficients(0, 0, 1, 0)
        const line = new Line3(new Point(1, 2, 5), new Vector(1, 0, 0))
        const result = plane.intersectWithLine(line)

        expect(result.hasIntersection).toBe(false)
        expect(result.isParallel).toBe(true)
        expect(result.isOnPlane).toBe(false)
        expect(result.point).toBeNull()
    })

    it('intersectWithLine returns isOnPlane for a line contained in the plane', () => {
        const plane = Plane3.fromCoefficients(0, 0, 1, 0)
        const line = new Line3(new Point(1, 2, 0), new Vector(1, 0, 0))
        const result = plane.intersectWithLine(line)

        expect(result.hasIntersection).toBe(false)
        expect(result.isParallel).toBe(false)
        expect(result.isOnPlane).toBe(true)
        expect(result.point).toBeNull()
    })

    it('angle between two planes equals angle between their normals', () => {
        const p1 = new Plane3({point: new Point(0, 0, 0), normal: new Vector(1, 0, 0)})
        const p2 = new Plane3({point: new Point(0, 0, 0), normal: new Vector(0, 1, 0)})

        expect(p1.angle(p2, true)).toBeCloseTo(90)
    })
})

describe('Plane3 predicates', () => {
    const xy = new Plane3({point: new Point(0, 0, 0), normal: new Vector(0, 0, 1)})
    const xz = new Plane3({point: new Point(0, 0, 0), normal: new Vector(0, 1, 0)})
    const xyShifted = new Plane3({point: new Point(0, 0, 3), normal: new Vector(0, 0, 1)})

    it('isParallelTo plane — parallel planes', () => {
        expect(xy.isParallelTo(xyShifted)).toBe(true)
    })

    it('isParallelTo plane — non-parallel planes', () => {
        expect(xy.isParallelTo(xz)).toBe(false)
    })

    it('isParallelTo line — direction in the plane', () => {
        const line = new Line3(new Point(0, 0, 5), new Vector(1, 0, 0))
        expect(xy.isParallelTo(line)).toBe(true)
    })

    it('isParallelTo line — line cuts through the plane', () => {
        const line = new Line3(new Point(0, 0, 0), new Vector(0, 0, 1))
        expect(xy.isParallelTo(line)).toBe(false)
    })

    it('isPerpendicularTo plane — perpendicular planes', () => {
        expect(xy.isPerpendicularTo(xz)).toBe(true)
    })

    it('isPerpendicularTo plane — parallel planes are not perpendicular', () => {
        expect(xy.isPerpendicularTo(xyShifted)).toBe(false)
    })

    it('isPerpendicularTo line — normal direction', () => {
        const line = new Line3(new Point(0, 0, 0), new Vector(0, 0, 1))
        expect(xy.isPerpendicularTo(line)).toBe(true)
    })

    it('isPerpendicularTo line — oblique line', () => {
        const line = new Line3(new Point(0, 0, 0), new Vector(1, 1, 0))
        expect(xy.isPerpendicularTo(line)).toBe(false)
    })

    it('isEqual — same plane defined differently', () => {
        const p1 = Plane3.fromCoefficients(2, 4, 6, -12)
        const p2 = Plane3.fromCoefficients(1, 2, 3, -6)
        expect(p1.isEqual(p2)).toBe(true)
    })

    it('isEqual — parallel but distinct planes are not equal', () => {
        expect(xy.isEqual(xyShifted)).toBe(false)
    })
})

describe('Plane3 simplify', () => {
    it('reduces coefficients by GCD', () => {
        const plane = Plane3.fromCoefficients(2, 4, 6, -12)
        plane.simplify()
        expect(plane.tex).toBe('x+2y+3z-6=0')
    })

    it('returns this for chaining', () => {
        const plane = Plane3.fromCoefficients(2, 4, 6, -12)
        expect(plane.simplify()).toBe(plane)
    })
})

describe('Plane3 reflect', () => {
    it('reflects a point through the xy-plane (z=0)', () => {
        const plane = Plane3.fromCoefficients(0, 0, 1, 0)
        expect(plane.reflect(new Point(3, 4, 5)).display).toBe('(3;4;-5)')
    })

    it('point on the plane reflects to itself', () => {
        const plane = Plane3.fromCoefficients(0, 0, 1, 0)
        expect(plane.reflect(new Point(1, 2, 0)).display).toBe('(1;2;0)')
    })

    it('projection is the midpoint of point and its reflection', () => {
        const plane = new Plane3({point: new Point(0, 0, 1), normal: new Vector(0, 0, 1)})
        const pt = new Point(2, 3, 4)
        const ref = plane.reflect(pt)
        const mid = new Point(
            pt.x.clone().add(ref.x).divide(2),
            pt.y.clone().add(ref.y).divide(2),
            pt.z.clone().add(ref.z).divide(2)
        )
        expect(plane.isPointOnPlane(mid)).toBe(true)
    })
})

describe('Plane3 intersectWithPlane', () => {
    it('returns isParallel for parallel planes', () => {
        const p1 = Plane3.fromCoefficients(0, 0, 1, 0)
        const p2 = Plane3.fromCoefficients(0, 0, 1, -3)
        const result = p1.intersectWithPlane(p2)

        expect(result.hasIntersection).toBe(false)
        expect(result.isParallel).toBe(true)
        expect(result.isEqual).toBe(false)
        expect(result.line).toBeNull()
    })

    it('returns isEqual for equal planes', () => {
        const p1 = Plane3.fromCoefficients(1, 2, 3, -6)
        const p2 = Plane3.fromCoefficients(2, 4, 6, -12)
        const result = p1.intersectWithPlane(p2)

        expect(result.hasIntersection).toBe(false)
        expect(result.isParallel).toBe(false)
        expect(result.isEqual).toBe(true)
        expect(result.line).toBeNull()
    })

    it('intersection of z=0 and x=0 is the y-axis', () => {
        const xy = Plane3.fromCoefficients(0, 0, 1, 0)  // z = 0
        const yz = Plane3.fromCoefficients(1, 0, 0, 0)  // x = 0
        const result = xy.intersectWithPlane(yz)

        expect(result.hasIntersection).toBe(true)
        expect(result.line!.isPointOnLine(new Point(0, 0, 0))).toBe(true)
        expect(result.line!.isPointOnLine(new Point(0, 5, 0))).toBe(true)
        expect(result.line!.isPointOnLine(new Point(1, 0, 0))).toBe(false)
    })

    it('intersection point lies on both planes', () => {
        const p1 = new Plane3({point: new Point(0, 0, 0), normal: new Vector(1, 1, 1)})
        const p2 = new Plane3({point: new Point(1, 0, 0), normal: new Vector(1, -1, 0)})
        const result = p1.intersectWithPlane(p2)

        expect(result.hasIntersection).toBe(true)
        expect(p1.isPointOnPlane(result.line!.point)).toBe(true)
        expect(p2.isPointOnPlane(result.line!.point)).toBe(true)
    })

    it('intersection line direction is perpendicular to both normals', () => {
        const p1 = new Plane3({point: new Point(0, 0, 1), normal: new Vector(0, 0, 1)})
        const p2 = new Plane3({point: new Point(0, 1, 0), normal: new Vector(0, 1, 0)})
        const result = p1.intersectWithPlane(p2)

        expect(result.hasIntersection).toBe(true)
        expect(result.line!.direction.dot(p1.normal).isZero()).toBe(true)
        expect(result.line!.direction.dot(p2.normal).isZero()).toBe(true)
    })

    it('general case: x+y+z=1 and x-y=0', () => {
        const p1 = Plane3.fromCoefficients(1, 1, 1, -1)
        const p2 = Plane3.fromCoefficients(1, -1, 0, 0)
        const result = p1.intersectWithPlane(p2)

        expect(result.hasIntersection).toBe(true)
        expect(p1.isPointOnPlane(result.line!.point)).toBe(true)
        expect(p2.isPointOnPlane(result.line!.point)).toBe(true)
        expect(result.line!.direction.dot(p1.normal).isZero()).toBe(true)
        expect(result.line!.direction.dot(p2.normal).isZero()).toBe(true)
    })
})

describe('Plane3 angle with parallel planes', () => {
    it('two parallel planes with non-trivial normals have a dihedral angle of 0, never NaN', () => {
        const p1 = new Plane3({coefficients: [1, -8, 2, 1]})
        const p2 = new Plane3({coefficients: [3, -24, 6, 5]})
        expect(p1.angle(p2)).toBeCloseTo(0, 4)
    })
})
