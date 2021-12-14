import {expect} from "chai";
import {Fraction} from "../../src/maths/coefficients";

describe('Fraction tests', () => { // the tests container

    it('Tex display', () => { // the single test
        const options = new Fraction(2, 5); // this will be your class
        expect(options.frac).to.be.equal('\\frac{ 2 }{ 5 }');
    });

    it('Compare: equals', () => {
        let F = new Fraction(1, 3),
            Q = new Fraction(2, 6),
            P = new Fraction(2, 5);
        expect(F.isEqual(Q)).to.be.true;
        expect(F.isEqual(P)).to.be.false;
    })

    it('Operation: sum of two fraction', () => {
        let F = new Fraction(1, 3),
            Q = new Fraction(2, 7);

        F.add(Q);

        expect(F.numerator).to.be.equal(13);
        expect(F.denominator).to.be.equal(21);
    })

    it('Reduced', () => {
        let F = new Fraction(2, 5),
            Q = new Fraction(2, 6)

        expect(F.isReduced()).to.be.true
        expect(Q.isReduced()).to.be.false
    })
})