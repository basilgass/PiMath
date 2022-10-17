import {describe} from "mocha";
import {Rational} from "../../src/maths/algebra/rational";
import {RationalStudy} from "../../src/maths/algebra/study/rationalStudy";
import {expect} from "chai";
import {ASYMPTOTE} from "../../src/maths/algebra/study";

describe('Study tests', () => {
    it('should get the zeroes', function () {
        const study = new RationalStudy(
            // new Rational('x^2-4x-4', 'x+7')
            new Rational('(3x-2)(x-3)(x+4)', 'x^2-5x+6')
        )
        let AO = study.asymptotes.filter(x => x.type === ASYMPTOTE.SLOPE)[0]

        console.log(AO.tableOfSign.signs)
    });

    it('should create draw code block', function () {
        const study = new RationalStudy(
            new Rational("(3x-4)(2x+5)", "(x-4)(x+4)")
        )

        expect(study.drawCode()).to.be.equal("f(x)=(6*x^(2)+7*x-20)/(x^(2)-16)\n" +
            "av_1=line x=-4->red,dash\n" +
            "av_3=line x=4->red,dash\n" +
            "ah=line y=6->orange,dash\n" +
            "M_6(-20.950583847231826,5.832940216581962)*\n" +
            "M_7(-0.7637018670538883,1.4170597834180383)*\n" +
            "Z_8(-2.5,0)*\n" +
            "Z_9(1.3333333333333333,0)*")
    });

    it('should get the before/after state of asymptotes', function () {
        const study = new RationalStudy(
            new Rational("x+5", "x-3")
            // new Rational("x^2+5", "(x-3)^2")
        )

        expect(study.asymptotes[0].position).to.have.all.members(["LB", "RT"])
    });
})
