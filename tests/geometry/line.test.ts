import {describe} from "mocha";
import {Line} from "../../src/maths/geometry/line";
import {Random} from "../../src/maths/randomization/random";
import {Point} from "../../src/maths/geometry/point";
import {expect} from "chai";

describe('Geometry Line', function () {
    it('should evaluate coordinates', function () {
        let L = new Line('3x-4y+5=0')

        let y = L.getValueAtX(0)
        console.log(y.tex)
    });

    it('should output nice Tex', function () {
        let L = new Line('9x-8y-96=0'),
            tex = L.tex

        console.log(tex.canonical)
        console.log(tex.equation)
        console.log(tex.mxh)
        console.log(tex.parametric)
    });

    it('should parse line from canonical coefficient', function (){
        let L = new Line(3, 2, 1)

        let P1 = new Point(-2,3),
            P2 = new Point(-3,4)
        expect(L.isOnLine(P1)).to.be.false
        expect(L.isOnLine(P2)).to.be.true

        console.log(L.randomNearPoint(20).display)
    })

});