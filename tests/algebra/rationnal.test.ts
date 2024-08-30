import { describe, expect, it } from "vitest"
import { Polynom } from "../../src/algebra/polynom"
import { Rational } from "../../src/algebra/rational"

describe.skip('Rational tests', () => {
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


    it('should calculate the derivative', function () {
        const FR = new Rational(
            new Polynom('x^2+5x+6'),
            new Polynom('x-3')
        )

        FR.derivative()
    })

    it('should test', function () {
        const P = new Rational('245(x-2)', '(3x-5)(2x-3)')

        expect(P.plotFunction).to.be.equal("(245*x-490)/(6*x^(2)-19*x+15)")
    })

    it('should reduce without creating fraction', function () {
        const P = new Rational('4(x+1)', '(x+1)(x-3)')
        expect(P.reduce().display).to.be.equal('(4)/(x-3)')
    })
})
