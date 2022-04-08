import {describe} from "mocha";
import {expect} from "chai";
import {Circle} from "../../src/maths/geometry/circle";
import {Line} from "../../src/maths/geometry/line";
import {Point} from "../../src/maths/geometry/point";
import {Fraction} from "../../src/maths/coefficients/fraction";

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

    it('should calculate tangents', function(){

        // Through one point on the circle
        const C = new Circle(
            new Point(-2, 3),
            25,
            true
        ), P = new Point(-5, 7);

        expect(C.tangents(P).map(x=>x.tex.canonical)).to.have.all.members(['3x-4y+43=0'])

        // With a slope
        const D = new Circle('x^2+y^2+10x=2y-6'),
            slope = new Fraction(-2, 1)

        expect(D.tangents(slope).map(x=>x.tex.canonical)).to.have.all.members(['2x+y-1=0', '2x+y+19=0'])

        const E = new Circle('(x-2)^2+(y-1)^2=5'),
            P2 = new Point(6, -2)

        expect(E.tangents(P2).map(x=>x.tex.canonical)).to.have.all.members(['2x+y-10=0','2x+11y+10=0'])

        let P3 = new Point(2, 2)
        expect(E.tangents(P3)).to.be.empty
    })

    it('should get a list of point on the circle', function () {
        const C = new Circle('(x-3)^2+(y+4)^2=16'),
            pts = C.getPointsOnCircle()

        expect(pts.map(x=>x.x.display + ',' + x.y.display)).to.have.all.members([ '3,0', '3,-8', '7,-4', '-1,-4' ])
    });
});