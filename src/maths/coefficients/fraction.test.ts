import { expect } from 'chai';
import {Fraction} from "./fraction";

describe('Fraction display', () => { // the tests container
	it('Tex display', () => { // the single test
		const options = new Fraction(2, 5); // this will be your class

		expect(options.frac).to.be.equal('\\frac{ 2 }{ 5 }');

	});
});

describe('Fraction operation', () => {
	it('Sum of two fraction', () => {
		let F = new Fraction(1, 3), Q = new Fraction(2,7);
		F.add(Q);

		expect(F.numerator).to.be.equal(13);
		expect(F.denominator).to.be.equal(21);
	})
});