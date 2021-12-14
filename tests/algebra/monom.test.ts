import {expect} from 'chai';
import {Monom} from "../../src/maths/algebra";
import {Random} from "../../src/maths/random";
import exp = require("constants");

describe('Monom tests', ()=> {
    it('parsing', ()=>{
        const M0a = new Monom('3');
        const M0b = new Monom('x');
        const M1 = new Monom('3x^5');
        const M2 = new Monom('2/3x^2yz^3y^4')
        const M3 = new Monom('-3x^(-2)')
        const M4 = new Monom('3x^(2/3)')
        const M5 = new Monom('-3x^(-2/3)y^(-5)8x^3')

        expect(M0a.tex).to.be.equal('3')
        expect(M0b.tex).to.be.equal('x')
        expect(M1.tex).to.be.equal('3x^{5}')
        expect(M2.display).to.be.equal('2/3x^2y^5z^3')
        expect(M3.tex).to.be.equal('-3x^{-2}')
        expect(M4.tex).to.be.equal('3x^{2/3}')
        expect(M5.tex).to.be.equal('-24x^{7/3}y^{-5}')
    })

    it('derivative', () => { // the single test
        const options = new Monom('7x^3'); // this will be your class

        expect(options.tex).to.be.equal('7x^{3}')
        expect(options.derivative().tex).to.be.equal('21x^{2}');
    });

    it('integrate', () => { // the single test
        const options = new Monom('7x^3'); // this will be your class
        expect(options.primitive().display).to.be.equal('7/4x^4');
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
