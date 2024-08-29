import { describe, expect, it } from "vitest"
import { Point3D, Vector3D } from "../../lib/maths/geometry/vector3d"
import { Plane3 } from "../../lib/maths/geometry/plane3"
import { Line3 } from "../../lib/maths/geometry/line3"
import { Point } from "../../lib/maths/geometry/vector"


describe('Geometry Plane', function () {
    it('should create a plane from 3 points', function () {
        const P1 = new Point3D(1, 0, 0),
            P2 = new Point3D(0, 1, 0),
            P3 = new Point3D(0, 0, 1),
            plane = new Plane3({ points: [P1, P2, P3] })

        expect(plane).toBeDefined()
        expect(plane.normal.display).to.be.equal('((1,1,1))')
    })

    it('should create a plane from a point and a normal', function () {
        const P = new Point3D(1, 2, 3),
            N = new Point3D(4, 5, 6),
            plane = new Plane3({ point: P, normal: N })

        expect(plane).toBeDefined()
        expect(plane.normal.display).to.be.equal('((4,5,6))')
        expect(plane.point.display).to.be.equal('((1,2,3))')
    })

    it('should output nice Tex', function () {
        const P = new Point3D(1, 2, 3),
            N = new Point3D(4, 5, 6),
            plane = new Plane3({ point: P, normal: N })

        expect(plane.tex).to.be.equal('4x+5y+6z-32=0')
    })

    it.skip('should get the intersection point with a plane', function () {
        const A = new Point3D(3, 1, 4)
        const L = new Line3(
            A,
            new Point3D(-5, -2, 1)
        )
        const K = L.randomPoint()
        L.OA = K

        console.log(L.point.display, L.d.display)

        console.log(L.tex.parametric)
        const p = new Plane3({
            points: [
                A.clone(),
                new Point3D(4, -4, 0),
                new Point3D(2, 2, 2)
            ]
        })
        console.log(p.tex)

        const intersection = p.intersectWithLine(L)
        console.log(intersection.display)

        expect(intersection.dimension).to.be.equal(3)
    })
    it('should create a plane from 3 points (custom)', function () {
        const P1 = new Point3D(4, 6, 0),
            P2 = new Point3D(8, 0, 10),
            P3 = new Point3D(14, 8, 0),
            P4 = new Point3D(0, 14, 12),
            plane1 = new Plane3({ points: [P1, P2, P3] }),
            plane2 = new Plane3({ points: [P1, P2, P4] })
        console.log(plane1.tex)
        console.log(plane2.tex)

        console.log(plane1.normal.cross(plane2.normal).display)
        console.log(plane1.normal.cross(plane2.normal).reduce().display)
    })

    it('should create a plane from one point and two vectors', function () {
        const P = new Point3D(1, 0, 3),
            v1 = new Vector3D(2, 1, -3),
            v2 = new Vector3D(0, 2, -1),
            plane = new Plane3({ point: P, directions: [v1, v2] })

        console.log(v1.cross(v2).display)
        expect(plane).toBeDefined()

        console.log(plane.tex)
    })

    it('test', () => {
        const p1 = new Point3D(2, 1, -)
        const p2 = new Point3D(-1, 3, 2)
        const p3 = new Point3D(4, 1, 9)

        const v1 = new Vector3D(p2, p1)
        const v2 = new Vector3D(p2, p3)

        console.log(v1.cross(v2).display)
    })
})