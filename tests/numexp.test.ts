import {expect} from 'chai';
import {NumExp} from "../src/maths/expressions/numexp";
import exp = require("constants");

describe('Numerical expression', () => { // the tests container
    it('RPN for numerical expression', () => {
        const RPN = new NumExp('3*x+5').rpn
        expect(RPN.map(x => x.token)).to.have.all.members(['3', 'x', '*', '5', '+'])

        const RPN2 = new NumExp('-3*x^2-5').rpn
        expect(RPN2.map(x=>x.token)).to.have.all.members(['3', 'x', '2', '^', '*', '-', '5', '-'])
    })

    it('Evaluate for numerical expression', () => {
        const expr = new NumExp('3*x+5')
        expect(expr.evaluate({x: 5})).to.be.equal(20)

        const expr2 = new NumExp('-3*x^2-5')
        expect(expr2.evaluate({x: -2})).to.be.equal(-17)
    })

    it('Evaluation simple mathematical functions', () => {
        const expr = new NumExp('sqrt(x)')
        expect(expr.evaluate({x: 9})).to.be.equal(3)
    })

    it('should detect invalid rpn parsing', function () {
        const exprValid = new NumExp('3*sin(x)'),
            exprInvalid = new NumExp('3*sin')

        expect(exprValid.isValid).to.be.true
        expect(exprInvalid.isValid).to.be.false
    });

    it('should parse without mult sign', function () {

        const expr = new NumExp('3x+5')

        // console.log(expr.rpn)

    });
});
