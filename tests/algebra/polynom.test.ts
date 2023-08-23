import {expect} from 'chai';
import {Random} from "../../src/maths/randomization/random";
import {describe} from "mocha";
import {Polynom} from "../../src/maths/algebra/polynom";
import {Fraction} from "../../src/maths/coefficients/fraction";


describe('Polynom tests', () => {
    it('Parse polynom', () => {
        const options = new Polynom('2x(x+3)^2(x-1)');
        options.reorder();
        expect(options.tex).to.be.equal('2x^{4}+10x^{3}+6x^{2}-18x');
    });

    it('Parse polynom with coefficient as fraction', () => {
        const P = new Polynom('-3/5x-2')

        expect(P.tex).to.be.equal('-\\frac{ 3 }{ 5 }x-2')
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
    it('Random Polynom of degree 6', () => {
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

    it('should factorize the polynom', () => {
        let P = new Polynom('x^2-5x+6')

        P.factorize()
        expect(P.factors.map(x => x.tex)).to.have.all.members(['x-2', 'x-3'])

        let P2 = new Polynom('x^4-32x^2+256')
        P2.factorize()
        expect(P2.factors.map(x => x.tex)).to.have.all.members(['x-4', 'x-4', 'x+4', 'x+4'])

        let P3 = new Polynom('6x^2-48x-8')
        P3.factorize()
        expect(P3.factors.map(x => x.tex)).to.have.all.members(['2', '3x^{2}-24x-4'])
    });

    it('should factorize special polynom', function () {
        let P = new Polynom('x^6-16x^5-58x^4+1592x^3-1207x^2-37576x+94864')

        P.factorize()
        expect(P.factors.map(x => x.tex)).to.have.all.members(['x-4', 'x-4', 'x+7', 'x+7', 'x-11', 'x-11'])
    });

    it('should factorize and regroup', function () {
        let P = new Polynom('7x(x-3)(x+5)(x^2-9)3x')
        P.factorize()
        expect(P.texFactors).to.be.equal('21x^{2}\\left( x+3 \\right)\\left( x-3 \\right)^{ 2 }\\left( x+5 \\right)')

        const P2 = new Polynom('-2x^3+18x')
        P2.factorize()
        expect(P2.texFactors).to.be.equal('-2x\\left( x+3 \\right)\\left( x-3 \\right)')
    });

    it('should detect if a polynom is factorized', function (){
        let P = new Polynom('x-1')
        expect(P.isFactorized('x-1')).to.be.true
        expect(P.isFactorized('x-2')).to.be.false

        let R = new Polynom('(x+2)^2')
        expect(R.isFactorized('(x+2)^2')).to.be.true

        let Q = new Polynom('(x-1)(x+2)')
        expect(Q.isFactorized('(x+2)(x-1)')).to.be.true
        expect(Q.isFactorized('x^2+x-2')).to.be.false

        let T = new Polynom('(x-3)(1-x)')
        expect(T.isFactorized('(x-1)(3-x)')).to.be.true
        expect(T.isFactorized('(x-1)(x-3)')).to.be.false
        expect(T.isFactorized('-1(x-1)(x-3)')).to.be.false
    })

    it('should detect if a polynom with power is factorized', function () {
        let P = new Polynom('(x-2)^3')

        expect(P.isFactorized('(x-2)^3')).to.be.true
        expect(P.isFactorized('(x-2)(x-2)(x-2)')).to.be.true
        expect(P.isFactorized('(x-2)^2(x-2)')).to.be.true

        let Q = new Polynom('(x-2)^4')
        expect(Q.isFactorized('(x-2)^2(x-2)^2')).to.be.true
    });

    it('should check if isFactorize with some "soft"', function () {
        let P = new Polynom('(2x-6)(x+5)')

        expect(P.isFactorized('2(x-3)(x+5)')).to.be.true
        expect(P.isFactorized('2x-6)(x+5)')).to.be.false
        expect(P.isFactorized('(2x-6)(x+5)', true)).to.be.true

        let Q = new Polynom('(4x+10)(2x-12)')
        expect(Q.isFactorized('4(2x+5)(x-6)')).to.be.true
        expect(Q.isFactorized('(8x+20)(x-6)')).to.be.false
        expect(Q.isFactorized('(8x+20)(x-6)', true)).to.be.true
    });

    it('should check if a polynom is developed', function () {
        let P = new Polynom('x(x+1)')

        expect(P.isDeveloped('x^(2)+x')).true
        expect(P.isDeveloped('x^2+x')).true
        expect(P.isDeveloped('x(x+1)')).false

    });

    it('should reorder polynom', function () {
        let P = new Polynom("3x-4+2y")
        P.reorder()
        expect(P.tex).to.be.equal('3x+2y-4')
    });
})

describe('Polynom parsing with rational power', () => {
    it('should parse with rational powers', () => {
        const P = new Polynom('3x^(2/3)-5x+5/3');
        expect(P.tex).to.be.equal('-5x+3x^{\\tfrac{ 2 }{ 3 }}+\\frac{ 5 }{ 3 }')
    })
})


// describe("test simple", ()=>{
//     it('should parce this one correctly', ()=>{
//         const P = new Polynom('-(x+2)(x-1)(x-1)(5x+4)')
//         const Q = new Polynom('(2+x)^2(1-x)^3')
//     })
// })

// TODO: working with roots !
// describe('WIP : working with roots', ()=>{
//     it('should parse with roots coefficient',  ()=>{
//         let P = new Polynom('sqrt(x)-5')
//
//         expect(P.degree().value).to.be.equal(0.5)
//     })
// })
