import {describe} from "mocha";
import {expect} from "chai";
import {Circle} from "../../src/maths/geometry/circle";
import {Line} from "../../src/maths/geometry/line";
import {Point} from "../../src/maths/geometry/point";
import {Fraction} from "../../src/maths/coefficients/fraction";

describe('Geometry Line', function () {
    it('should evaluate coordinates', function () {
        let L = new Line('3x-4y+5=0')

        let y = L.getValueAtX(0)
        console.log(y.tex)
    });

});