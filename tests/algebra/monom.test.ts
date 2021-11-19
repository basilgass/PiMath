import {expect} from 'chai';
import {Monom} from "../../src/maths/algebra/monom";
import {Random} from "../../src/maths/random/random";

describe('Monom derivate and integrate', () => { // the tests container
    it('derivate', () => { // the single test
        const options = new Monom('7x^3'); // this will be your class
        expect(options.derivative().tex).to.be.equal('21x^2');
    });

    it('integrate', () => { // the single test
        const options = new Monom('7x^3'); // this will be your class
        expect(options.primitive().display).to.be.equal('7/4x^4');
    });

    it('should create random Monom', function () {
        const M = Random.monom({
            letters: 'xyz',
            degree: 5,
            fraction: false,
			zero: false
        });

        expect(M.coefficient.isZero()).to.be.false
        expect(M.degree()).to.be.greaterThan(0)
    });
});