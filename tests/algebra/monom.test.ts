import {expect} from 'chai';
import {Random} from "../../lib/maths/randomization/random";
import {describe} from "mocha";
import {Monom} from "../../lib/maths/algebra/monom";

describe('Monom with integer power', () => {
    it('parsing', () => {
        const M0a = new Monom('3');
        expect(M0a.tex).to.be.equal('3')

        const M0b = new Monom('x');
        expect(M0b.tex).to.be.equal('x')

        const M0c = new Monom('3x');
        expect(M0c.tex).to.be.equal('3x')

        const M1 = new Monom('3x^5');
        expect(M1.tex).to.be.equal('3x^{5}')

        const M2 = new Monom('2/3x^2yz^3y^4')
        expect(M2.display).to.be.equal('2/3x^(2)y^(5)z^(3)')

        const M3 = new Monom('-3x^(-2)')
        expect(M3.tex).to.be.equal('-3x^{-2}')

        const M4 = new Monom('3x^(2/3)')
        expect(M4.tex).to.be.equal('3x^{\\tfrac{ 2 }{ 3 }}')

        const M5 = new Monom('-3x^(-2/3)y^(-5)8x^3')
        expect(M5.tex).to.be.equal('-24x^{\\tfrac{ 7 }{ 3 }}y^{-5}')
    })

    it('basic operations', () => {
        const M1 = new Monom('3x'),
            M2 = new Monom('2x')

        expect(M1.clone().add(M2).isEqual(new Monom('5x'))).to.be.true
        expect(M1.clone().subtract(M2).isEqual(new Monom('x'))).to.be.true
        expect(M1.clone().multiply(M2).isEqual(new Monom('6x^2'))).to.be.true
        expect(M1.clone().divide(M2).isEqual(new Monom('3/2'))).to.be.true
    })

    it('derivative', () => { // the single test
        const options = new Monom('7x^3'); // this will be your class

        expect(options.tex).to.be.equal('7x^{3}')
        expect(options.derivative().tex).to.be.equal('21x^{2}');
    });

    it('integrate', () => { // the single test
        const options = new Monom('7x^3'); // this will be your class
        expect(options.primitive().display).to.be.equal('7/4x^(4)');
    });

    it('randomize', function () {
        const M = Random.monom({
            letters: 'xyz',
            degree: 5,
            fraction: false,
            zero: false
        });

        expect(M.coefficient.isZero()).to.be.false
        expect(M.degree().value).to.be.greaterThan(0)
    });
})

describe('Monom with fraction power', () => {
    it('should create a numerical expression', () => {
        const inputStr: string = '-1/5x^(2/3)'
        const M = new Monom(inputStr),
            N = new Monom('7x^(4/5)')

        M.multiply(N.clone())

        expect(M.tex).to.be.equal('-\\frac{ 7 }{ 5 }x^{\\tfrac{ 22 }{ 15 }}')
    })
})