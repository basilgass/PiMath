import {expect} from 'chai';
import {NumExp} from "../src/maths/numexp";

describe('Numerical expression', () => { // the tests container
    it('RPN for numerical expression', () => {
        const RPN = new NumExp('3*x+5').rpn
        expect(RPN.map(x => x.token)).to.have.all.members(['3', 'x', '*', '5', '+'])

        const RPN2 = new NumExp('-3*x^2-5').rpn
        expect(RPN2.map(x => x.token)).to.have.all.members(['3', 'x', '2', '^', '*', '-', '5', '-'])
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

    it('souldd detect invalid expression withouth crahsing', function() {
        const exprPourrie = new NumExp('3xsi'),
            exprOk = new NumExp('3xsin(x)')

        expect(exprPourrie.isValid).to.be.false
        expect(exprOk.isValid).to.be.true
    })

    it('should parse without mult sign', function () {

        let a = 1 / 5

        const expr = new NumExp('3x-5', true)
        expect(expr.isValid).to.be.true
        expect(expr.evaluate({x: 2})).to.be.equal(1)

        const expr2 = new NumExp('3*x-5', true)
        expect(expr2.isValid).to.be.true
        expect(expr2.evaluate({x: 2})).to.be.equal(1)
    });

    it('should calculate sqrt from exp', function(){
        let k = new NumExp('nthrt(x,3)')
        expect(k.evaluate({x: -8})).to.be.equal(-2)
        expect(k.evaluate({x: 27})).to.be.equal(3)

        let p = new NumExp('nthrt(x,4)')
        expect(p.evaluate({x: 16})).to.be.equal(2)
        expect(p.evaluate({x: -16})).to.be.NaN
    })

    it('should work with constant', function () {

        let k = new NumExp('2pi*x')
        expect(+k.evaluate({x: 1}).toFixed(6)).to.be.equal(6.283185)
    });

    it('should work with constant but without variables', function () {

        let k = new NumExp('2pi')
        expect(+k.evaluate().toFixed(6)).to.be.equal(6.283185)
    });

    it('should parse with ln or log', function () {
        let k = new NumExp('ln(3)')
        expect(+k.evaluate().toFixed(6)).to.be.equal(1.098612)
    });
});
