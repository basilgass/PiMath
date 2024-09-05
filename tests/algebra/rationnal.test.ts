import { describe, expect, test } from "vitest"
import { Polynom } from "../../src/algebra/polynom"
import { Rational } from "../../src/algebra/rational"
import { PolyFactor } from "../../src/algebra/polyFactor"

describe('Rational creation', () => {
    test('create Rational', () => {
        const R = new Rational(new Polynom('x+2'), new Polynom('x-4'))

        expect(R).toBeDefined()
        expect(R).toBeInstanceOf(Rational)
        expect(R.numerator).toBeInstanceOf(PolyFactor)
    })
    test('parse string', () => {
        const R = new Rational('x+2', '(x-4)^3')

        expect(R).toBeDefined()
        R.numerator.reduce()
        R.denominator.reduce()
        expect(R.numerator).toBeInstanceOf(PolyFactor)
        expect(R.numerator.display).toBe('(x+2)')
        expect(R.denominator.display).toBe('(x-4)^(3)')
    })
    test('clone Rational', () => {
        const R = new Rational('x+2', '(x-4)^3')

        const R2 = R.clone()
        R.numerator = new PolyFactor('x+3')

        expect(R2.numerator.display).toBe('(x+2)')
    })
    test('set to zero Rational', () => {
        const R = new Rational('x+2', '(x-4)^3')
        R.zero()

        expect(R.numerator.display).toBe('(0)')
        expect(R.denominator.display).toBe('(1)')
    })
    test('set to one Rational', () => {
        const R = new Rational('x+2', '(x-4)^3')
        R.one()

        expect(R.numerator.display).toBe('(1)')
        expect(R.denominator.display).toBe('(1)')
    })
})

describe('Rational output', () => {
    test('output as LaTeX', () => {
        const R = new Rational('x+2', '(x-4)^3')

        expect(R.tex).toBe('\\frac{ x+2 }{ \\left( x-4 \\right)^{ 3 } }')
    })
    test.todo('output as ASCII')
})
describe.todo('Rational operations', () => {
    test.todo('reduce Rational')
    test.todo('add two Rationals')
    test.todo('subtract two Rationals')
    test.todo('multiply two Rationals')
    test.todo('divide by Rational')
    test.todo('raise Rational by integer')
})
describe.todo('Rational comparisons', () => {
    test.todo('same Rational')
    test.todo('equal Rational')
    test.todo('is one Rational')
    test.todo('is zero Rational')
})
describe.todo('Rational static functions')
describe.todo('Rational evaluation', () => {
    test.todo('evaluate Rational')
})
describe.todo('Rational generators')

/*
describe.skip('Old Rational tests', () => {
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
*/