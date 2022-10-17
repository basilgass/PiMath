import {Random} from "../src/maths/randomization/random";
import {Fraction} from "../esm/maths/coefficients/fraction";
import {NthRoot} from "../esm/maths/coefficients/nthRoot";

describe('Custom test', () => { // the tests container
    it('Build sqrt value', () => {

        let a = 1, b = 27, c = 50

        a = Random.number(2,20)
        b = Random.number(2,20)
        c = Random.number(2,20)

        let nthB = new NthRoot(b).reduce(),
            nthC = new NthRoot(c).reduce(),
            nthD = new NthRoot(nthB.radical * nthC.radical).reduce(),
            F = new Fraction(a*nthB.coefficient*nthD.coefficient, nthC.radical*nthC.coefficient).reduce(),
            answer = ''

        if(F.numerator>1){
            answer = `${F.numerator}`
        }
        if(nthD.radical>1){
            answer = `${answer}sqrt${nthD.radical}`
        }
        if(F.denominator>1){
            answer = `${answer}/${F.denominator}`
        }
        console.log(`${a}sqrt${b}/sqrt${c}`, answer)
    })
});
