import {Numeric} from "../src/maths/numeric";
import {expect} from "chai";

describe('Numeric', () => { // the tests container
    it('Correct number', () => {
        const a = 0.1 + 0.2
        console.log(a)


        expect(Numeric.numberCorrection(a)).to.be.equal(0.3)
    })
});
