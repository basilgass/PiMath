import {describe, expect, it, test} from "vitest"
import {Polynom} from "../../src/algebra/polynom"
import {Fraction} from "../../src/coefficients/fraction"
import {Monom} from "../../src/algebra/monom"
import type {ISolution} from "../../src/pimath.interface"

describe('Polynom creation', () => {
    test('create Polynom', () => {
        const P = new Polynom(
            new Monom('3x'),
            new Monom(2)
        )
        expect(P).toBeDefined()
        expect(P.monoms.length).toBe(2)
    })
    test('create trivial Polynom', () => {
        const P = new Polynom()

        expect(P).toBeDefined()
        expect(P.display).toBe('0')
    })
    test('create trivial Polynom', () => {
        const P = new Polynom(6)

        expect(P).toBeDefined()
        expect(P.display).toBe('6')
    })
    test('parse string', () => {
        const P = new Polynom('3x-2')

        expect(P).toBeDefined()
        expect(P.monoms.length).toBe(2)
    })
    test('parse string with parenthesis', () => {
        const P = new Polynom('(3x-2)(x-1)')

        expect(P).toBeDefined()
        expect(P.monoms.length).toBe(3)
    })
    test('parse string with parenthesis and power', () => {
        const P = new Polynom('(3x-2)^2')

        expect(P).toBeDefined()
        expect(P.monoms.length).toBe(3)
        expect(P.degree().value).toBe(2)
    })
    test('parse with rational powers', () => {
        const P = new Polynom('3x^(2/3)-5x+5/3')
        expect(P.tex).toBe('-5x+3x^{ \\tfrac{ 2 }{ 3 } }+\\frac{ 5 }{ 3 }')
        expect(P.display).toBe('-5x+3x^(2/3)+5/3')
    })
    test('parse with multiple variables', () => {
        const P = new Polynom('ax')
        expect(P.display).toBe('ax')
    })
    test('create Polynom from [x] and numbers', () => {
        const P = new Polynom('x', 2, 3, -4, 5)

        expect(P.display).toBe('2x^(3)+3x^(2)-4x+5')
    })
    test('create Polynom from [xyz] and numbers', () => {
        const P = new Polynom('xyz', 2, 3, -4, 5)

        expect(P.display).toBe('2x+3y-4z+5')
    })
    test('clone Polynom', () => {
        const P = new Polynom('3x-2')
        const C = P.clone()
        C.opposite()

        expect(C).toBeDefined()
        expect(P.display).toBe('3x-2')
    })
    test('set to zero Polynom', () => {
        const P = new Polynom().zero()

        expect(P).toBeDefined()
        expect(P.display).toBe('0')
    })
    test('set to one Polynom', () => {
        const P = new Polynom().one()

        expect(P).toBeDefined()
        expect(P.display).toBe('1')
    })
})

describe('Polynom output', () => {
    test('output as LaTeX', () => {
        const P = new Polynom('x^2-2x+1')
        expect(P.tex).toBe('x^{ 2 }-2x+1')
    })

    test('output as ASCII', () => {
        const P = new Polynom('x^2-2x+1')
        expect(P.display).toBe('x^(2)-2x+1')
    })
})

describe('Polynom operations', () => {
    test('reduce Polynom', () => {
        const P = new Polynom('3x+2x+4-1')
        P.reduce()

        expect(P.display).toBe('5x+3')
    })
    test('reorder Polynom', () => {
        const P = new Polynom('4')
        P.monoms.push(new Monom('-3x'))

        expect(P.display).toBe('4-3x')
        P.reorder()
        expect(P.display).toBe('-3x+4')
    })
    test('add two Polynoms', () => {
        const P = new Polynom('3x-2')
        const Q = new Polynom('2x+5')

        P.add(Q)

        expect(Q.display).toBe('2x+5')
        expect(P.display).toBe('5x+3')

    })
    test('subtract two Polynoms', () => {
        const P = new Polynom('3x-2')
        const Q = new Polynom('2x+5')

        P.subtract(Q)

        expect(Q.display).toBe('2x+5')
        expect(P.display).toBe('x-7')
    })
    test('multiply two Polynoms', () => {
        const P = new Polynom('3x-2')
        const Q = new Polynom('2x+5')

        P.multiply(Q)

        expect(Q.display).toBe('2x+5')
        expect(P.display).toBe('6x^(2)+11x-10')
    })
    test('divide by Fraction', () => {
        const P = new Polynom('4x^2+6x-8')

        P.divide(2)

        expect(P.display).toBe('2x^(2)+3x-4')
    })
    test('divide by Monom', () => {
        const P = new Polynom('4x^2-8x')
        const Q = new Monom('2x')

        P.divide(Q)

        expect(P.display).toBe('2x-4')
    })
    test('divide by Polynom', () => {
        const P = new Polynom('6x^2+11x-10')
        const Q = new Polynom('2x+5')

        P.divide(Q)

        expect(P.display).toBe('3x-2')
    })
    test('divide by Polynom (not dividable)', () => {
        const P = new Polynom('x^2+2x+1')
        const Q = new Polynom('x+2')

        expect(() => P.divide(Q)).toThrowError()
    })
    test('raise Polynom by integer', () => {
        const P = new Polynom('x+2')
        P.pow(2)

        expect(P.display).toBe('x^(2)+4x+4')
    })

    /* specific Polynom tests */
    it('euclidian division of two Polynoms', () => {
        const P = new Polynom('(x-3)(x^2+5x-4)+12'),
            D = new Polynom('x-3')

        const euclidian = P.euclidean(D)

        expect(euclidian.quotient.display).toBe('x^(2)+5x-4')
        expect(euclidian.reminder.display).toBe('12')
    })
    test('derivative of a Polynom', () => {
        const P = new Polynom('x^2+3x-2')

        expect(P.derivative().display).toBe('2x+3')
        expect(P.derivative('y').display).toBe('0')
    })
    test('integrate Polynom', () => {
        const F = new Polynom('2x^3-3x^2+x-3'),
            G = new Polynom('3/5x^2+4')

        expect(F.integrate(0, 2).value).toBe(-4)
        expect(G.integrate(-3, 3).display).toBe('174/5')
    })
})

describe('Polynom comparisons', () => {
    test('same Polynom', () => {
        const P = new Polynom('2x+1')
        const Q = new Polynom('3')
        const Q2 = new Polynom('x^2+1')
        Q.monoms.push(new Monom('6x'))

        expect(Q.isSameAs(P)).toBeTruthy()
        expect(Q2.isSameAs(P)).toBeFalsy()
    })
    test('equal Polynom', () => {
        const P = new Polynom('2x+1')
        const Q = new Polynom('1')
        Q.monoms.push(new Monom('2x'))
        const R = new Polynom('x+1')

        expect(Q.isEqual(P)).toBeTruthy()
        expect(P.isEqual(Q)).toBeTruthy()
        expect(P.isEqual(R)).toBeFalsy()
        expect(R.isEqual(R)).toBeTruthy()
    })
    test('is one Polynom', () => {
        const P = new Polynom('1')
        const Q = new Polynom('x')

        expect(P.isOne()).toBeTruthy()
        expect(Q.isOne()).toBeFalsy()
    })
    test('is zero Polynom', () => {
        const P = new Polynom('0')
        const Q = new Polynom('x')
        const R = new Polynom('x-x')

        expect(P.isZero()).toBeTruthy()
        expect(Q.isZero()).toBeFalsy()
        expect(R.isZero()).toBeTruthy()
    })

    /* Polynom specific checks */
    test('is Polynom developed', function () {
        const P = new Polynom('x(x+1)')

        expect(P.isDeveloped('x^(2)+x')).toBeTruthy()
        expect(P.isDeveloped('x^2+x')).toBeTruthy()
        expect(P.isDeveloped('x(x+1)')).toBeFalsy()
        expect(P.isDeveloped('x^2+x+1')).toBeFalsy()
    })
})

describe.todo('Polynom static functions')

describe('Polynom evaluation', () => {
    test('evaluate Polynom', () => {
        const P = new Polynom('2x+1')

        const evalF = P.evaluate(3) as Fraction
        const evalN = P.evaluate(-2, true) as number

        expect(evalF.display).toBe('7')
        expect(evalN).toBe(-3)
    })
})

describe('Table of signs of a Polynom', () => {
    test('first degree', () => {
        const P = new Polynom('x+3')
        const tos = P.tableOfSigns()

        expect(tos.signs).toEqual(['-', 'z', '+'])
        expect(tos.roots).toHaveLength(1)
        expect(tos.roots[0].value).toBe(-3)
    })

    test('a constant', () => {
        const P = new Polynom('3')
        const tos = P.tableOfSigns()

        expect(tos.signs).toEqual(['+'])
        expect(tos.roots).toHaveLength(0)
    })

    test('2nd degree (two solutions)', () => {
        const P = new Polynom('(x-2)(3-x)')
        const tos = P.tableOfSigns()

        expect(tos.signs).toEqual(['-', 'z', '+', 'z', '-'])
        expect(tos.roots).toHaveLength(2)
        expect(tos.roots.map(x => x.value)).toEqual(expect.arrayContaining([3, 2]))
    })

    test('2nd degree (one solution)', () => {
        const P = new Polynom('(x-2)^2')
        const tos = P.tableOfSigns()

        expect(tos.signs).toEqual(['+', 'z', '+'])
        expect(tos.roots).toHaveLength(1)
        expect(tos.roots[0].value).toEqual(2)
    })

    test('2nd degree (no solution)', () => {
        const P = new Polynom('x^2+2')
        const tos = P.tableOfSigns()

        expect(tos.signs).toEqual(['+'])
        expect(tos.roots).toHaveLength(0)
    })

    test('6th degree (three solutions)', () => {
        const P = new Polynom('x^3(x-2)^2(x+3)')
        const tos = P.tableOfSigns()

        expect(tos.signs).toEqual(['+', 'z', '-', 'z', '+', 'z', '+'])
        expect(tos.roots).toHaveLength(3)
        expect(tos.roots.map(x => x.value)).toEqual(expect.arrayContaining([0, 2, -3]))
    })

    function createSolution(value: number): ISolution{
        return {value: value, tex: '', display: '', exact: true, variable: 'x'}
    }

    test('2nd degree polynom with extra roots', () => {
        const P = new Polynom('(x-2)(x+5)') // roots are -5, 2
        const tos = P.tableOfSigns([
            createSolution(-8),
            createSolution(-5),
            createSolution(-3),
            createSolution(0),
            createSolution(2),
            createSolution(4)
        ])

        expect(tos.signs).toEqual([
                '+', 't', '+', 'z',
                '-', 't', '-', 't',
                '-', 'z', '+', 't',
                '+'
            ]
        )
    })

    test('2nd degree polynom with extra roots (and missing zero)', ()=>{
        const P = new Polynom('(x-2)(x+5)') // roots are -5, 2

        expect(()=>P.tableOfSigns([
            createSolution(-8),
            createSolution(-5),
            createSolution(-3),
            createSolution(0),
            createSolution(4)
        ])).toThrowError()

    })
})
describe.todo('Polynom generators')
