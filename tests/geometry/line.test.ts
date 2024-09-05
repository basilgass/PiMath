import { describe, expect, it } from "vitest"
import { Line } from "../../src/geometry/line"
import { Point } from "../../src/geometry/point"

describe('Geometry Line', function () {
    it('should evaluate coordinates', function () {
        const L = new Line('3x-4y+5=0')

        const y = L.getValueAtX(0)
        expect(y.display).to.be.equal('5/4')
    })

    it('should output nice Tex', function () {
        const L = new Line('9x-8y-96=0')

        expect(L.tex).to.be.equal('9x-8y-96=0')
        expect(L.equation.tex).to.be.equal('9x-8y=96')
        expect(L.mxh.tex).to.be.equal('y=\\frac{ 9 }{ 8 }x-12')
        expect(L.parametric.tex).to.be.equal('\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ -96 \\end{pmatrix} + k\\cdot \\begin{pmatrix} 8 \\\\ 9 \\end{pmatrix}')
        // console.log(tex.system)
    })

    it('should output nice ASCII', function () {
        const L = new Line('9x-8y-96=0')

        expect(L.display).to.be.equal('9x-8y-96=0')
        expect(L.equation.display).to.be.equal('9x-8y=96')
        expect(L.mxh.display).to.be.equal('y=9/8x-12')
        expect(L.parametric.display).to.be.equal('((x,y))=((0,-96))+k((8,9))')
        // console.log(tex.system)
    })

    it('should parse line from canonical coefficient', function () {
        // parse by canonical coefficients ax+by+c=0
        // a=3, b=2, c=1
        const L = new Line(3, 2, 1)

        const P1 = new Point(-2, 3),
            P2 = new Point(-3, 4)
        expect(L.isOnLine(P1)).to.be.false
        expect(L.isOnLine(P2)).to.be.true
    })

})