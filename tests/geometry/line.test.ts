import { describe, expect, it, test } from "vitest"
import { Line } from "../../src/geometry/line"
import { Point } from "../../src/geometry/point"


describe.todo('Line creation', () => {
    test.todo('create Line')
    test.todo('parse string')
    test.todo('clone Line')
    test.todo('set to zero Line')
    test.todo('set to one Line')
})
describe.todo('Line output', () => {
    test.todo('output as LaTeX')
    test.todo('output as ASCII')
})
describe.todo('Line operations', () => {
    test.todo('reduce Line')
    test.todo('add two Lines')
    test.todo('subtract two Lines')
    test.todo('multiply two Lines')
    test.todo('divide by Line')
    test.todo('raise Line by integer')
})
describe.todo('Line comparisons', () => {
    test.todo('same Line')
    test.todo('equal Line')
    test.todo('is one Line')
    test.todo('is zero Line')
})
describe.todo('Line static functions')
describe.todo('Line evaluation', () => {
    test.todo('evaluate Line')
})
describe.todo('Line generators')

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