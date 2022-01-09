import {describe} from "mocha";
import {Circle, Line, Point} from "../../src/maths/geometry";
import {Fraction} from "../../src/maths/coefficients";
import {expect} from "chai";

describe('Circle', function () {
    it('should calculate the intersection of a circle and a line', function () {
        let C = new Circle(
            new Point(8, 6),
            20,
            true
        ),
            LT = new Line('2x+y-32=0'),
            LS = new Line('3x-y-8=0'),
            IPT = C.lineIntersection(LT),
            IPS = C.lineIntersection(LS)

        expect(IPT).to.be.length(1)
        expect(IPT[0].x.value).to.be.equal(12)
        expect(IPT[0].y.value).to.be.equal(8)

        expect(IPS).to.be.length(2)
        expect(IPS[0].x.value).to.be.equal(4)
        expect(IPS[0].y.value).to.be.equal(4)
        expect(IPS[1].x.value).to.be.equal(6)
        expect(IPS[1].y.value).to.be.equal(10)
    });
});