import {expect} from 'chai';
import {Fraction} from "../../src/maths/coefficients";
import {Polynom} from "../../src/maths/algebra";
import {Random} from "../../src/maths/random";

describe('Polynom tests', () => {
    it('Parse polynom', () => {
        const options = new Polynom('2x(x+3)^2(x-1)');
        options.reorder().reduce();
        expect(options.tex).to.be.equal('2x^{4}+10x^{3}+6x^{2}-18x');
    });

    it('Tex display', () => {
        const options = new Polynom('x^2-2x+1');
        expect(options.tex).to.be.equal('x^{2}-2x+1');
    });

    it('Evaluate a polynom', function () {
        const P = new Polynom('2x-3')

        expect(P.evaluate(5).value).to.be.equal(7)
        expect(P.evaluate(new Fraction('5/3')).display).to.be.equal('1/3')
    });
    it('Compare: equals', () => {
        let F = new Polynom('x+3'),
            Q = new Polynom('3+x'),
            P = new Polynom('x-3');
        expect(F.isEqual(Q)).to.be.true;
        expect(F.isEqual(P)).to.be.false;
    })
    it('Integrate', () => {
        let F = new Polynom('2x^3-3x^2+x-3'),
            G = new Polynom('3/5x^2+4')

        expect(F.integrate(0, 2).value).to.be.equal(-4)
        expect(G.integrate(-3, 3).display).to.be.equal('174/5')
    })
    it('Random Polynom of degree 5', function () {
        let P = Random.polynom({
            degree: 6,
            numberOfMonoms: 3
        })

        expect(P.length).to.be.equal(3)
        expect(P.degree().value).to.be.lessThanOrEqual(6)
    });
})