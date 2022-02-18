import {expect} from 'chai';
import {Fraction} from "../../src/maths/coefficients";
import {Monom, Polynom} from "../../src/maths/algebra";
import {Random} from "../../src/maths/random";
import {describe} from "mocha";
import {Shutingyard} from "../../src/maths/shutingyard";

describe('Polynom tests', () => {
    it('Parse polynom', () => {
        const options = new Polynom('2x(x+3)^2(x-1)');
        options.reorder().reduce();
        expect(options.tex).to.be.equal('2x^{4}+10x^{3}+6x^{2}-18x');
    });

    it('Parse polynom with coefficient as fraction', ()=>{
        const P = new Polynom('-3/5x-2')

        console.log(P.tex)
        expect(P.tex).to.be.equal('-\\dfrac{ 3 }{ 5 }x-2')
    })

    it('Tex display', () => {
        const options = new Polynom('x^2-2x+1');
        expect(options.tex).to.be.equal('x^{2}-2x+1');
    });

    it('Evaluate a polynom', function () {
        const P = new Polynom('2x-3')

        expect(P.evaluate(5).value).to.be.equal(7)
        expect(P.evaluate(new Fraction('5/3')).display).to.be.equal('1/3')
    });
    it('Compare: equals', () => {
        let F = new Polynom('x+3'),
            Q = new Polynom('3+x'),
            P = new Polynom('x-3');
        expect(F.isEqual(Q)).to.be.true;
        expect(F.isEqual(P)).to.be.false;
    })
    it('Integrate', () => {
        let F = new Polynom('2x^3-3x^2+x-3'),
            G = new Polynom('3/5x^2+4')

        expect(F.integrate(0, 2).value).to.be.equal(-4)
        expect(G.integrate(-3, 3).display).to.be.equal('174/5')
    })
    it('Random Polynom of degree 5', () => {
        let P = Random.polynom({
            degree: 6,
            numberOfMonoms: 3,
            positive: true,
            fraction: {
                max: 3
            }
        })

        expect(P.length).to.be.equal(3)
        expect(P.degree().value).to.be.equal(6)
    });

    it('should calculate correctly the quotient and reminder', () => {
        let P = new Polynom('(x-3)(x^2+5x-4)+12'),
            D = new Polynom('x-3')

        let euclidian = P.euclidian(D);

        expect(euclidian.quotient.tex).to.be.equal('x^{2}+5x-4')
        expect(euclidian.reminder.tex).to.be.equal('12')
    });

    it('should factorize the polynom', ()=> {
        let P = new Polynom('x^2-5x+6')

        P.factorize()
        expect(P.factors.map(x=>x.tex)).to.have.all.members(['x-2', 'x-3'])
    })
})

describe('Polynom parsing with rational power', ()=>{
    it('should parse with rational powers', ()=> {
        const P = new Polynom('3x^(2/3)-5x+5/3');

        expect(P.tex).to.be.equal('3x^{\\tfrac{ 2 }{ 3 }}-5x+\\dfrac{ 5 }{ 3 }')
    })
})


// TODO: working with roots !
// describe('WIP : working with roots', ()=>{
//     it('should parse with roots coefficient',  ()=>{
//         let P = new Polynom('sqrt(x)-5')
//
//         expect(P.degree().value).to.be.equal(0.5)
//     })
// })
