import {expect} from 'chai';
import {Shutingyard, ShutingyardMode} from "../lib/maths/shutingyard";

describe('Shuting yard', () => { // the tests container
    it('RPN for polynom', () => {
        const SY0: Shutingyard = new Shutingyard().parse('3+x+5');
        const SY1: Shutingyard = new Shutingyard().parse('3x+5');
        const SY2: Shutingyard = new Shutingyard().parse('3.2x+5');
        const SY3: Shutingyard = new Shutingyard().parse('3/2x+5');
        const SY3b: Shutingyard = new Shutingyard().parse('3/2(x+5)');
        const SY4: Shutingyard = new Shutingyard().parse('3/2x^2-5xy-12');
        const SY5: Shutingyard = new Shutingyard().parse('3/2x^(-3)-5xy-12');
        const SY6: Shutingyard = new Shutingyard().parse('x^3y^2z');

        expect(SY0.rpn.map(x => x.token)).to.have.all.members(['3', 'x', '+', '5', '+'])
        expect(SY1.rpn.map(x => x.token)).to.have.all.members(['3', 'x', '*', '5', '+'])
        expect(SY2.rpn.map(x => x.token)).to.have.all.members(['3.2', 'x', '*', '5', '+'])
        expect(SY3.rpn.map(x => x.token)).to.have.all.members(['3', '2', '/', 'x', '*', '5', '+'])
        expect(SY3b.rpn.map(x => x.token)).to.have.all.members(['3', '2', '/', 'x', '5', '+', '*'])
        expect(SY4.rpn.map(x => x.token)).to.have.all.members(['3', '2', '/', 'x', '2', '^', '*', '5', 'x', '*', 'y', '*', '-', '12', '-'])
        expect(SY5.rpn.map(x => x.token)).to.have.all.members(['3', '2', '/', 'x', '0', '3', '-', '^', '*', '5', 'x', '*', 'y', '*', '-', '12', '-'])
        expect(SY6.rpn.map(x => x.token)).to.have.all.members(['x', '3', '^', 'y', '2', '^', '*', 'z', '*'])
    })

    it('RPN for multi variable polynom', () => {
        const SY: Shutingyard = new Shutingyard().parse('ax+by+c')
        expect(SY.rpn.map(x => x.token)).to.have.all.members(["a", "x", "*", "b", "y", "*", "+", "c", "+"])
    })

    it('Custom RPN', () => {
        const SY1: Shutingyard = new Shutingyard(ShutingyardMode.SET).parse('(A|B)&C');
        const SY2: Shutingyard = new Shutingyard(ShutingyardMode.SET).parse('(A-B)&!C');
        expect(SY1.rpn.map(x => x.token)).to.have.all.members(['A', 'B', '|', 'C', '&'])
        expect(SY2.rpn.map(x => x.token)).to.have.all.members(['A', 'B', '-', 'C', '!', '&'])
    })

    it('should uniformize the expression', () => {
        // const SY1: Shutingyard = new Shutingyard(ShutingyardMode.POLYNOM).parse('3xx^2(x+5)')
        // expect(SY1.rpn.map(x=>x.token)).to.have.all.members([
        //     '3', 'x', '*', 'x',
        //     '2', '^', '*', 'x',
        //     '5', '+', '*'
        // ])
        //
        // const SY2: Shutingyard = new Shutingyard(ShutingyardMode.EXPRESSION).parse('3xysqrt(x-b)-ab')
        // expect(SY2.rpn.map(x=>x.token)).to.have.all.members([
        //     '3', 'x',    '*',
        //     'y', 'x',    'b',
        //     '-', 'sqrt', '*',
        //     'a', 'b',    '*',
        //     '-'
        // ])

        expect(new Shutingyard(ShutingyardMode.EXPRESSION).normalize('3x(x-5)^(2(x+7))')).to.be.equal("3*x*(x-5)^(2*(x+7))")
        expect(new Shutingyard(ShutingyardMode.EXPRESSION).normalize('sin(cos(3pi-5))+sqrt(e-sin(3pi/2))')).to.be.equal("sin(cos(3*pi-5))+sqrt(e-sin(3*pi/2))")
        expect(new Shutingyard(ShutingyardMode.EXPRESSION).normalize('sin(cos(3picos(3pi)-5))+sqrt(e-sin(3pi/2))')).to.be.equal("sin(cos(3*pi*cos(3*pi)-5))+sqrt(e-sin(3*pi/2))")
    })
});
