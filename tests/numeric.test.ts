import {Numeric} from "../src/maths/numeric";
import {expect} from "chai";
import exp = require("constants");

describe('Numeric', () => { // the tests container
    it('Correct number', () => {
        const a = 0.1 + 0.2
        expect(Numeric.numberCorrection(a)).to.be.equal(0.3)
        const b = Math.pow(10, -5)

        expect(Numeric.numberCorrection(b, 1,12)).to.be.equal(0.00001)
    })


    it('should simplify numbers by the gcd', () => {
        let a = 12, b = 15, c = 33, d = 303;

        [a, b, c, d] = Numeric.divideNumbersByGCD(a, b, c, d)

        expect([a, b, c, d]).to.have.all.members([4, 5, 11, 101])
    })

    it('should decompose a number in two factors', function () {
        console.log(Numeric.decompose(6))
        expect(Numeric.decompose(25).map(x=>x.join(','))).to.have.all.members(['1,25', '5,5'])
        expect(Numeric.decompose(6).map(x=>x.join(','))).to.have.all.members(['1,6', '2,3'])
    });
});
