import { describe, expect, it } from "vitest"
import { Factor } from "../../src/algebra/factor"
import { Polynom } from "../../src/algebra/polynom"
import { Fraction } from "../../src/coefficients/fraction"


describe("Factors creation", () => {
    it('should create a factor', function () {
        const F = new Factor('3x+2', '1/2')

        expect(F.polynom.display).toBe('3x+2')
        expect(F.power.value).toBe(0.5)
    })

    it('should make a zero factor', () => {
        const F = new Factor('3x+2', '1/2')
        F.zero()

        expect(F.polynom.display).toBe('0')
        expect(F.power.value).toBe(1)
    })

    it('should make a pone factor', () => {
        const F = new Factor('3x+2', '1/2')
        F.one()

        expect(F.polynom.display).toBe('1')
        expect(F.power.value).toBe(1)
    })

    it('should clone a Factor', () => {
        const F = new Factor('3x+2', '1/2')
        const F2 = F.clone()

        expect(F.isEqual(F2)).toBeTruthy()

        // Change the clone
        F2.power = 3

        expect(F.isEqual(F2)).toBeFalsy()
    })
})

describe("Factors outputs", () => {
    it('should output LaTeX with power', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.tex).toBe('\\left( 3x+2 \\right)^{ \\frac{ 1 }{ 2 } }')
    })

    it('should output LaTeX with sqrt', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.asRoot.tex).toBe('\\sqrt{ 3x+2 }')
    })
    it('should output LaTeX with root', () => {
        const F = new Factor('3x+2', '2/3')

        expect(F.asRoot.tex).toBe('\\sqrt[ 3 ]{ 3x+2 }^{ 2 }')
    })

    it('should output ASCII with power', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.display).toBe('(3x+2)^(1/2)')
    })

    it('should output ASCII with sqrt', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.asRoot.display).toBe('sqrt(3x+2)')
    })

    it('should output ASCII with root', () => {
        const F = new Factor('3x+2', '2/3')

        expect(F.asRoot.display).toBe('root(3)(3x+2)^(2)')
    })
})

describe("Factors: compare functions", () => {
    it('should determine if two factors are same (same polynom)', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.isSameAs('3x+2')).toBeTruthy()
        expect(F.isSameAs('3x-2')).toBeFalsy()
        expect(F.isSameAs('6x+4)')).toBeFalsy()
    })

    it('should compare to zero', () => {
        const F = new Factor('3x+2', '1/2')
        const F0 = new Factor('0', '1/2')
        expect(F.isZero()).toBeFalsy()
        expect(F0.isZero()).toBeTruthy()
    })

    it('should compare to one', () => {
        const F = new Factor('3x+2', '1/2')
        const F0 = new Factor('0', '1/2')
        const F1a = new Factor('1', '1/2')
        const F1b = new Factor('3x+2', '0')

        expect(F.isOne()).toBeFalsy()
        expect(F0.isOne()).toBeFalsy()
        expect(F1a.isOne()).toBeTruthy()
        expect(F1b.isOne()).toBeTruthy()
    })

    it('should compare two factors', () => {
        const F1 = new Factor('3x+2', '1/2')
        const F2 = new Factor('3x+2', '2/4')
        const F3 = new Factor('3x-2', '1/2')
        const F4 = new Factor('3x+2', '1/3')

        expect(F1.isEqual(F1)).toBeTruthy()
        expect(F1.isEqual(F2)).toBeTruthy()
        expect(F1.isEqual(F3)).toBeFalsy()
        expect(F1.isEqual(F4)).toBeFalsy()

    })
})

describe("Factors operations", () => {
    it('should raised to power', () => {
        const F = new Factor('3x+2', '1/2')

        F.pow(3)

        expect(F.power.display).toBe('3/2')
    })

    it('should apply the root', () => {
        const F = new Factor('3x+2', '1/2')

        F.root(5)

        expect(F.power.display).toBe('1/10')
    })

    it('should apply the square root', () => {
        const F = new Factor('3x+2', '1/2')

        F.sqrt()

        expect(F.power.display).toBe('1/4')
    })

    it('should multiply a factor and a polynom', () => {
        const F = new Factor('3x+2', '1/2')
        const P = new Polynom('3x+2')

        expect(F.multiply(P).power.display).toBe('3/2')
    })
    it('should multiply a factor by another factor', () => {
        const F = new Factor('3x+2', '1/2')
        const M = new Factor('3x+2', '5/3')

        expect(F.multiply(M).power.reduce().display).toBe('13/6')
    })

    it('should divide a factor and a polynom', () => {
        const F = new Factor('3x+2', '1/2')
        const P = new Polynom('3x+2')

        expect(F.divide(P).power.display).toBe('-1/2')
    })
    it('should divide a factor by another factor', () => {
        const F = new Factor('3x+2', '1/2')
        const M = new Factor('3x+2', '5/3')

        expect(F.divide(M).power.reduce().display).toBe('-7/6')
    })

    it('should get the inverse of a Factor', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.inverse().power.display).toBe('-1/2')
    })
})

describe("Factors: algebra operations", () => {
    it('should get the variables', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.variables).toEqual(['x'])
    })

    it('should determine if it containes a variable', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.hasVariable('x')).toBeTruthy()
        expect(F.hasVariable('y')).toBeFalsy()
    })

    it('should get the degree of the factor', () => {
        const F = new Factor('3x+2', '1/2')
        const F2 = new Factor('3x^3+2', '1/2')

        expect(F.degree().display).toBe('1/2')
        expect(F2.degree().display).toBe('3/2')
    })

    it('should evaluate the factor', () => {
        const F = new Factor('3x+2', '1/2')

        expect((F.evaluate({ x: 2 }) as Fraction).value).toBe(2.8284271247461903)
    })

    it('should get the derivative of the factor', () => {
        const F = new Factor('3x^2+2x-1', '1/2')

        const dF = F.derivative()
        expect(dF.length).toBe(3)

        const [dF1, dF2, dF3] = dF
        expect(dF1.polynom.display).toBe('1/2')
        expect(dF1.power.display).toBe('1')
        expect(dF2.polynom.display).toBe('6x+2')
        expect(dF2.power.display).toBe('1')
        expect(dF3.polynom.display).toBe('3x^(2)+2x-1')
        expect(dF3.power.display).toBe('-1/2')
    })

    it('should develop a Factor', () => {
        const F = new Factor('x+2', '3')

        const dF = F.develop()

        expect(dF.degree().value).toBe(3)
        expect(dF.display).toBe('x^(3)+6x^(2)+12x+8')
    })
})



