import { describe, expect, test, } from "vitest"
import { Random } from "../../src/randomization/random"
import { Monom } from "../../src/algebra/monom"
import { Fraction } from "../../src/coefficients/fraction"

describe('Monom creation', () => {
    test('create Monom', () => {
        const M = new Monom()
        expect(M.coefficient.isOne()).toBeFalsy()
    })
    test('set coefficient', () => {
        const M = new Monom()
        M.coefficient = new Fraction(2, 3)

        expect(M.coefficient.numerator).toBe(2)
        expect(M.coefficient.denominator).toBe(3)
    })

    test('set literal', () => {
        const M = new Monom()
        M.literal = { x: new Fraction(2) }

        expect(Object.hasOwn(M.literal, 'x')).toBeTruthy()
        expect(M.literal.x.value).toBe(2)
    })

    test('parse string', () => {
        const M = new Monom('3x^2')

        expect(M.coefficient.numerator).toBe(3)
        expect(M.coefficient.denominator).toBe(1)
        expect(Object.hasOwn(M.literal, 'x')).toBeTruthy()
        expect(M.literal.x.value).toBe(2)
    })

    test('parse string (output as display)', () => {
        const M0a = new Monom('3')
        expect(M0a.tex).to.be.equal('3')

        const M0b = new Monom('x')
        expect(M0b.tex).to.be.equal('x')

        const M0c = new Monom('3x')
        expect(M0c.tex).to.be.equal('3x')

        const M1 = new Monom('3x^5')
        expect(M1.tex).to.be.equal('3x^{ 5 }')

        const M2 = new Monom('2/3x^2yz^3y^4')
        expect(M2.display).to.be.equal('2/3x^(2)y^(5)z^(3)')

        const M3 = new Monom('-3x^(-2)')
        expect(M3.tex).to.be.equal('-3x^{ -2 }')

        const M4 = new Monom('3x^(2/3)')
        expect(M4.tex).to.be.equal('3x^{ \\tfrac{ 2 }{ 3 } }')

        const M5 = new Monom('-3x^(-2/3)y^(-5)8x^3')
        expect(M5.tex).to.be.equal('-24x^{ \\tfrac{ 7 }{ 3 } }y^{ -5 }')
    })

    test('parse string with fraction power', () => {
        const M = new Monom('-1/5x^(2/3)')
        expect(M.tex).to.be.equal('-\\frac{ 1 }{ 5 }x^{ \\tfrac{ 2 }{ 3 } }')
    })

    test('clone Monom', () => {
        const M = new Monom()

        M.coefficient = new Fraction(2, 3)
        M.literal.x = new Fraction(3)

        const N = M.clone()

        expect(N.coefficient.display).toBe('2/3')
        expect(N.literal.x.value).toBe(3)

    })

    test('set to zero Monom', () => {
        const M = new Monom('3x^2')
        M.zero()
        expect(M.coefficient.value).toBe(0)
        expect(Object.keys(M.literal).length).toBe(0)
    })

    test('set to one Monom', () => {
        const M = new Monom('3x^2')
        M.one()
        expect(M.coefficient.value).toBe(1)
        expect(Object.keys(M.literal).length).toBe(0)

    })
})

describe('Monom output', () => {
    test('output as LaTeX', () => {
        const M = new Monom('3x^2')
        expect(M.tex).toBe('3x^{ 2 }')
    })

    test('output as ASCII', () => {
        const M = new Monom('3x^2')
        expect(M.display).toBe('3x^(2)')
    })
})

describe('Monom operations', () => {
    test('reduce Monom', () => {
        const M = new Monom('3x^2x^2x5x')

        M.reduce()
        expect(M.display).toBe('15x^(6)')
    })
    test('add two Monoms', () => {
        const M1 = new Monom('3x^2'),
            M2 = new Monom('2x^2')

        expect(M1.add(M2).display).toBe('5x^(2)')
    })
    test('subtract two Monoms', () => {
        const M1 = new Monom('3x^2'),
            M2 = new Monom('2x^2')

        expect(M1.subtract(M2).display).toBe('x^(2)')
    })
    test('multiply two Monoms', () => {
        const M1 = new Monom('3x^2'),
            M2 = new Monom('2x^2')

        expect(M1.multiply(M2).display).toBe('6x^(4)')
    })
    test('divide by Monom', () => {
        const M1 = new Monom('3x^3'),
            M2 = new Monom('2x^2')

        expect(M1.divide(M2).display).toBe('3/2x')
    })
    test('raise Monom by integer', () => {
        const M = new Monom('3x^2')
        M.pow(3)
        expect(M.display).toBe('27x^(6)')

    })
    test('multiply Monom by integer', () => {
        const M = new Monom('3x^2')
        M.multiply(3)
        expect(M.display).toBe('9x^(2)')
    })
    test('divide Monom by integer', () => {
        const M = new Monom('3x^2')
        M.divide(3)
        expect(M.display).toBe('x^(2)')
    })
    test('multiply Monom with fraction power', () => {
        const M = new Monom('3x^(2/3)'),
            N = new Monom('7x^(4/5)')

        M.multiply(N.clone())

        expect(M.display).toBe('21x^(22/15)')
    })
})

describe('Monom comparisons', () => {
    test('same Monom', () => {
        const M1 = new Monom('3x^2'),
            M2 = new Monom('5x^2'),
            M3 = new Monom('3x^5')

        expect(M1.isSameAs(M2)).toBeTruthy()
        expect(M1.isSameAs(M3)).toBeFalsy()

    })
    test('equal Monom', () => {
        const M1 = new Monom('3x^2'),
            M2 = new Monom('3x^2'),
            M3 = new Monom('3x^5')

        expect(M1.isEqual(M2)).toBeTruthy()
        expect(M1.isEqual(M3)).toBeFalsy()
    })
    test('is one Monom', () => {
        const M = new Monom('3x^2')
        expect(M.isOne()).toBeFalsy()

        M.one()
        expect(M.isOne()).toBeTruthy()
    })
    test('is zero Monom', () => {
        const M = new Monom('3x^2')
        expect(M.isZero()).toBeFalsy()

        M.zero()
        expect(M.isZero()).toBeTruthy()
    })
})

describe('Monom static functions', () => {
    test('gcd of Monoms', () => {
        const M1 = new Monom('6x^2'),
            M2 = new Monom('3x^3')

        expect(Monom.gcd(M1, M2).display).toBe('3x^(2)')
    })

    test('gcd of Monoms with fraction', () => {
        const M1 = new Monom('6/5x^2'),
            M2 = new Monom('3/2x^3')

        expect(Monom.gcd(M1, M2).display).toBe('3/10x^(2)')
    })

    test('multiply Monoms', () => {
        const M1 = new Monom('6x^2'),
            M2 = new Monom('3x^3')

        expect(Monom.xMultiply(M1, M2).display).toBe('18x^(5)')
    })
})

describe('Monom evaluation', () => {
    test('evaluate Monom', () => {
        const M = new Monom('3x^2')
        expect((M.evaluate(2) as Fraction).value).toBe(12)
        expect((M.evaluate(2, true) as number)).toBe(12)
    })

    test('evaluate Monom with multiple variables', () => {
        const M = new Monom('3x^2y^3')
        expect((M.evaluate({ x: 2, y: 3 }) as Fraction).value).toBe(324)
        expect((M.evaluate({ x: 2, y: 3 }, true) as number)).toBe(324)
    })
})

describe('Monom generators', () => {
    test('random Monom', () => {
        const M = Random.monom()
        expect(M.coefficient.isZero()).toBeFalsy()
        expect(M.degree().value).toBeGreaterThan(0)
    })
    test('random Monom with options', () => {
        const M = Random.monom({
            letters: 'xyz',
            degree: 5,
            fraction: false,
            zero: false
        })
        expect(M.coefficient.isZero()).toBeFalsy()
        expect(M.degree().value).toBeGreaterThan(0)
    })
})

describe('Monom algebra operations', () => {
    test('derivative of Monom', () => {
        const M = new Monom('3x^2')
        expect(M.derivative().display).toBe('6x')
    })
    test('primitive of Monom', () => {
        const M = new Monom('3x^2')
        expect(M.primitive().display).toBe('x^(3)')
    })
})
