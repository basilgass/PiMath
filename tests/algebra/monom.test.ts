import { expect } from 'chai';
import {Fraction} from "../../src/maths/coefficients/fraction";
import exp = require("constants");
import {Polynom} from "../../src/maths/algebra/polynom";
import {Monom} from "../../src/maths/algebra/monom";

describe('Monom derivate and integrate', () => { // the tests container
	it('derivate', () => { // the single test
		const options = new Monom('7x^3'); // this will be your class
		expect(options.derivative().tex).to.be.equal('21x^2');
	});

	it('integrate', () => { // the single test
		const options = new Monom('7x^3'); // this will be your class
		expect(options.primitive().display).to.be.equal('7/4x^4');
	});
});