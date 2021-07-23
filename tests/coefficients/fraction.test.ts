import { expect } from 'chai';
import {Fraction} from "../../src/maths/coefficients/fraction";
import exp = require("constants");

describe('Fraction display', () => { // the tests container
	it('Tex display', () => { // the single test
		const options = new Fraction(2, 5); // this will be your class
		expect(options.frac).to.be.equal('\\frac{ 2 }{ 5 }');
	});
});

describe('Fraction operation', () => {
	it('Fraction are equals', ()=>{
		let F = new Fraction(1,3),
			Q = new Fraction(2, 6),
			P = new Fraction(2, 5);
		expect(F.isEqual(Q)).to.be.true;
		expect(F.isEqual(P)).to.be.false;
	})
	it('Sum of two fraction', () => {
		let F = new Fraction(1, 3),
			Q = new Fraction(2,7);

		F.add(Q);

		expect(F.numerator).to.be.equal(13);
		expect(F.denominator).to.be.equal(21);
	})
});