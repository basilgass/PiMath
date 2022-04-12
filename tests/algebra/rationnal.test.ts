import {describe} from "mocha";
import {Rational} from "../../src/maths/algebra/rational";
import {Polynom} from "../../src/maths/algebra/polynom";
import {expect} from "chai";

describe('Rational tests', () => {
    it('should calculate correctly the limits to a value', () => {

        const FR = new Rational(
            new Polynom('(x+2)'),
            new Polynom('(x-4)(x+2)')
        )

        expect(FR.limits(4).tex).to.be.equal("+\\infty")
        expect(FR.limits(4, 'below').tex).to.be.equal("-\\infty")
        expect(FR.limits(4, 'above').tex).to.be.equal("+\\infty")
        expect(FR.limits(-2).tex).to.be.equal("-\\frac{ 1 }{ 6 }")
    })
    it('should calculate the limits to Infinity', () => {
        const FR0 = new Rational(
            new Polynom('3'),
            new Polynom('x-5')
        )
        const FR2 = new Rational(
            new Polynom('2x+5'),
            new Polynom('x-5')
        )

        const FR3 = new Rational(
            new Polynom('2x^2+5'),
            new Polynom('x-5')
        )

        expect(FR0.limits(Infinity).value).to.be.equal(0)
        expect(FR0.limits(-Infinity).value).to.be.equal(0)

        expect(FR2.limits(Infinity).value).to.be.equal(2)
        expect(FR2.limits(-Infinity).value).to.be.equal(2)

        expect(FR3.limits(Infinity).value).to.be.equal(Infinity)
        expect(FR3.limits(-Infinity).value).to.be.equal(-Infinity)
    })

    it('should make a table of signs', function () {
        const FR = new Rational(
            new Polynom('(x-2)'),
            new Polynom('(x+2)')
        )
        let tos = FR.makeTableOfSigns()
        expect(tos.zeroes.map(x => x.tex)).to.have.all.members(['-2', '2'])
        expect(tos.signs).to.be.eql([['', '-', 't', '-', 'z', '+', ''], ['', '-', 'd', '+', 't', '+', ''], [], ['', '+', 'd', '-', 'z', '+', '']])

        const FR2 = new Rational(
            new Polynom('6x^2+7x-20'),
            new Polynom('x^2-16')
        )
        let tos2 = FR2.makeTableOfSigns()
        expect(tos2.signs).to.be.eql([
            [
                '', '-', 't', '-',
                'z', '+', 't', '+',
                't', '+', ''
            ],
            [
                '', '-', 't', '-',
                't', '-', 'z', '+',
                't', '+', ''
            ],
            [
                '', '-', 'd', '+',
                't', '+', 't', '+',
                't', '+', ''
            ],
            [
                '', '-', 't', '-',
                't', '-', 't', '-',
                'd', '+', ''
            ],
            [],
            [
                '', '+', 'd', '-',
                'z', '+', 'z', '-',
                'd', '+', ''
            ]
        ])
    });

    it('should calculate the derivative', function () {
        const FR = new Rational(
            new Polynom('x^2+5x+6'),
            new Polynom('x-3')
        )

        FR.derivative()
    });

    it('should test', function () {
        let P = new Rational('245(x-2)', '(3x-5)(2x-3)')

        console.log(P.plotFunction)
    });
})
