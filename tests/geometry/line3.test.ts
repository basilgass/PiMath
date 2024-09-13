import { describe, expect, it, test } from "vitest"
import { Line3 } from "../../src/geometry/line3"
import { Random } from "../../src/randomization/random"
import { Vector } from "../../src/geometry/vector"
import { Point } from "../../src/geometry/point"
import { Plane3 } from "../../src/geometry/plane3"
import { Equation } from "../../src/algebra/equation"

describe.todo('Line 3D creation', () => {
    test.todo('create Line 3D')
    test.todo('parse string')
    test.todo('clone Line 3D')
    test.todo('set to zero Line 3D')
    test.todo('set to one Line 3D')
})
describe.todo('Line 3D output', () => {
    test.todo('output as LaTeX')
    test.todo('output as ASCII')
})
describe.todo('Line 3D operations', () => {
    test.todo('reduce Line 3D')
    test.todo('add two Line 3Ds')
    test.todo('subtract two Line 3Ds')
    test.todo('multiply two Line 3Ds')
    test.todo('divide by Line 3D')
    test.todo('raise Line 3D by integer')
})
describe.todo('Line 3D comparisons', () => {
    test.todo('same Line 3D')
    test.todo('equal Line 3D')
    test.todo('is one Line 3D')
    test.todo('is zero Line 3D')
})
describe.todo('Line 3D static functions')
describe.todo('Line 3D evaluation', () => {
    test.todo('evaluate Line 3D')
})
describe.todo('Line 3D generators')

describe('Geometry Line3 tests', function () {
    it('should create a line from two points', function () {

        const A = new Point(1, 2, 3)
        const d = new Vector(4, 5, 6)

        const L = new Line3(A, d)

        expect(L.OA.x.display).to.be.equal('1')
    })

    it('should create a tex output', function () {

        const A = new Point(1, 2, 3)
        const d = new Vector(4, 5, 6)
        const L = new Line3(A, d)

        expect(L.tex.parametric).to.be.equal('\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + k\\cdot \\begin{pmatrix} 4 \\\\ 5 \\\\ 6 \\end{pmatrix}')
        expect(L.tex.system).to.be.equal('\\left\\{\\begin{aligned}\n    x &= 1+4k\\\\ \n    y &= 2+5k\\\\\n    z &= 3+6k\n\\end{aligned}\\right.')
    })

    it('should create a random line', function () {
        const L = Random.line3()

        expect(L.OA.dimension).to.be.equal(3)
        expect(L.d.dimension).to.be.equal(3)
    })

    it('should create a random line with a specific direction', function () {

        const d = new Vector(4, 5, 6)
        const L = Random.line3({ direction: d })

        expect(L.OA.dimension).to.be.equal(3)
        expect(L.d.dimension).to.be.equal(3)
        expect(L.d.x.display).to.be.equal('4')
        expect(L.d.y.display).to.be.equal('5')
        expect(L.d.z.display).to.be.equal('6')
    })

    it('should create a random line with a specific point', function () {

        const A = new Point(1, 2, 3)
        const L = Random.line3({ A })

        expect(L.OA.dimension).to.be.equal(3)
        expect(L.d.dimension).to.be.equal(3)
        expect(L.OA.x.display).to.be.equal('1')
        expect(L.OA.y.display).to.be.equal('2')
        expect(L.OA.z.display).to.be.equal('3')
    })

    it('should get a random point on the line', function () {
        const L = Random.line3()
        const P = L.randomPoint(2)

        expect(P.dimension).to.be.equal(3)

        // Compare the three k values
        const k1 = (P.x.value - L.OA.x.value) / L.d.x.value
        const k2 = (P.y.value - L.OA.y.value) / L.d.y.value
        const k3 = (P.z.value - L.OA.z.value) / L.d.z.value

        if (!isNaN(k1) && !isNaN(k2)) {
            expect(k1).to.be.equal(k2)
        }
        if (!isNaN(k1) && !isNaN(k3)) {
            expect(k1).to.be.equal(k3)
        }
        if (!isNaN(k2) && !isNaN(k3)) {
            expect(k2).to.be.equal(k3)
        }

        if (!isNaN(k1)) { expect(P.x.display).not.to.be.equal(L.OA.x.display) }
        if (!isNaN(k2)) { expect(P.y.display).not.to.be.equal(L.OA.y.display) }
        if (!isNaN(k3)) { expect(P.z.display).not.to.be.equal(L.OA.z.display) }
    })

    it('test', () => {
        const A1 = new Vector(3, -1, 4)
        const v1 = new Vector(-1, 2, -1)

        const v2 = new Vector(-2, 3, 1)

        const I = A1.clone().add(v1.clone().multiplyByScalar(4))
        const A2 = I.clone().subtract(v2.clone().multiplyByScalar(3))

        console.log(A2.display)

        const l1 = new Line3(A1, v1)
        const l2 = new Line3(A2, v2)

        console.log(l1.tex.parametric)
        console.log(l2.tex.cartesian)

        // const control = l1.intersection(l2)
        // console.log(control.point.display)
    })
    it('test 2', () => {
        const A = new Point(-1, 3, 4)
        const B = new Point(3, 3, 7)
        const D = new Point(3, 5, 0)
        const AB = new Vector(A, B)
        const AD = new Vector(A, D)

        console.log('A=', A.display)
        console.log('B=', B.display)
        console.log('D=', D.display)
        console.log('AB=', AB.display, AB.normSquare.display)
        console.log('AD=', AD.display, AD.normSquare.display)
        const P = B.add(new Vector(A, D).multiplyByScalar(2))
        console.log('P=', P.display)

        console.log('ABxAD=', AB.cross(AD).display)
        const p = new Plane3({
            points: [A, B, D]
        })
        console.log(p.tex)

        const S = P.clone().add(p.normal.clone().multiplyByScalar(1))
        console.log('S=', S.display)
    })
    it('test 2B', () => {
        const A = new Point(-2, 3, 4)
        const B = new Point(2, 3, 7)
        const D = new Point(2, 5, 0)
        const AB = new Vector(A, B)
        const AD = new Vector(A, D)

        console.log('A=', A.display)
        console.log('B=', B.display)
        console.log('D=', D.display)
        console.log('AB=', AB.display, AB.normSquare.display)
        console.log('AD=', AD.display, AD.normSquare.display)
        const P = B.add(new Vector(A, D).multiplyByScalar(2))
        console.log('P=', P.display)

        console.log('ABxAD=', AB.cross(AD).display)
        const p = new Plane3({
            points: [A, B, D]
        })
        console.log(p.tex)

        const S = P.clone().add(p.normal.clone().multiplyByScalar(1))
        console.log('S=', S.display)
    })

    it('test 3', () => {
        const p1 = new Plane3({
            equation: new Equation('2x-y+z=0')
        })
        const p2 = new Plane3({
            equation: new Equation('x-3y+z+5=0')
        })

        const d = new Line3(
            new Point(0, 0, 0),
            new Vector(1, -2, 3)
        )
        console.log(p1.tex)
        console.log(p2.tex)
        console.log(d.tex.parametric)

        const cross = p1.normal.cross(p2.normal)
        console.log('cross', cross.display)

        const pt = new Point(1, 2, 0)
        console.log(p1.isPointOnPlane(pt))
        console.log(p2.isPointOnPlane(pt))
        console.log(pt.display)

        const d2 = new Line3(pt, cross)
        console.log(d2.display.parametric)
    })
})
