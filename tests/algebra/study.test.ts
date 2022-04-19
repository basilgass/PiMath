import {describe} from "mocha";
import {Rational} from "../../src/maths/algebra/rational";
import {RationalStudy} from "../../src/maths/algebra/study/rationalStudy";

describe('Study tests', () => {
    it('should get the zeroes', function () {
        const study = new RationalStudy(
            // new Rational('x^2-4x-4', 'x+7')
            new Rational('(3x-2)(x-3)(x+4)', 'x^2-5x+6')
        )

        console.log(study.tex)
        console.log(study.asymptotes)
        console.log(study.derivative.fx.texFactors)
        console.log(study.texGrows)

    });
})
