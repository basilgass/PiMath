import { describe, expect, it } from "vitest"
import { Line3 } from "../../src/geometry/line3"
import { Random } from "../../src/randomization/random"
import { Vector } from "../../src/geometry/vector"
import { Point } from "../../src/geometry/point"

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

})
