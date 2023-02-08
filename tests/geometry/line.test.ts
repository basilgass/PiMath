import {describe} from "mocha";
import {Line} from "../../src/maths/geometry/line";

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

});