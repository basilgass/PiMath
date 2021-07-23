import { expect } from 'chai';
import {Fraction} from "../../src/maths/coefficients/fraction";
import exp = require("constants");
import {Polynom} from "../../src/maths/algebra/polynom";

describe('Polynom display', () => { // the tests container
	it('Tex display', () => { // the single test
		const options = new Polynom('x^2-2x+1'); // this will be your class
		expect(options.tex).to.be.equal('x^2-2x+1');
	});

	it('Parse polynom', () => { // the single test
		const options = new Polynom('2x(x+3)^2(x-1)'); // this will be your class
		options.reorder().reduce();
		expect(options.tex).to.be.equal('2x^4+10x^3+6x^2-18x');
	});
});

describe('Polynom operation', () => {
	it('Polynom are equals', ()=>{
		let F = new Polynom('x+3'),
			Q = new Polynom('3+x'),
			P = new Polynom('x-3');
		expect(F.isEqual(Q)).to.be.true;
		expect(F.isEqual(P)).to.be.false;
	})
});