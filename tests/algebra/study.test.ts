import {describe} from "mocha";
import {Rational} from "../../src/maths/algebra/rational";
import {Study} from "../../src/maths/algebra/study";

describe('Study tests', () => {
    it('should get the zeroes', function () {
        const study = new Study(
            new Rational('(3x-2)(x-3)(x+4)', 'x^2-5x+6')
        )

        console.log(study.zeroes.map(z => z.tex + ', ' + z.type))

        console.log(study.asymptotes)
    });
})
