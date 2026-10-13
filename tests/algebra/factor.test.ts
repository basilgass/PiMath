import {describe, expect, test} from "vitest"
import {Factor} from "../../src/algebra/factor"
import {Polynom} from "../../src/algebra/polynom"
import {MathError} from "../../src/errors"
import {TableOfSigns} from "../../src/analyze/tableOfSigns"


describe("Factors creation", () => {
    test('should create a factor', function () {
        const F = new Factor('3x+2', '1/2')

        expect(F.polynom.display).toBe('3x+2')
        expect(F.power.value).toBe(0.5)
    })

    test('should make a zero factor', () => {
        const F = new Factor('3x+2', '1/2')
        F.zero()

        expect(F.polynom.display).toBe('0')
        expect(F.power.value).toBe(1)
    })

    test('should make a power factor', () => {
        const F = new Factor('3x+2', '1/2')
        F.one()

        expect(F.polynom.display).toBe('1')
        expect(F.power.value).toBe(1)
    })

    test('should clone a Factor', () => {
        const F = new Factor('3x+2', '1/2')
        const F2 = F.clone()

        expect(F.isEqual(F2)).toBeTruthy()

        // Change the clone
        F2.power = 3

        expect(F.isEqual(F2)).toBeFalsy()
    })

})

describe("Factors outputs", () => {
    test('should output LaTeX with power', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.tex).toBe('\\left( 3x+2 \\right)^{ \\frac{ 1 }{ 2 } }')
    })

    test('should output LaTeX with sqrt', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.asRoot.tex).toBe('\\sqrt{ 3x+2 }')
    })
    test('should output LaTeX with root', () => {
        const F = new Factor('3x+2', '2/3')

        expect(F.asRoot.tex).toBe('\\sqrt[ 3 ]{ 3x+2 }^{ 2 }')
    })

    test('should output ASCII with power', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.display).toBe('(3x+2)^(1/2)')
    })

    test('should output ASCII with sqrt', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.asRoot.display).toBe('sqrt(3x+2)')
    })

    test('should output ASCII with root', () => {
        const F = new Factor('3x+2', '2/3')

        expect(F.asRoot.display).toBe('root(3)(3x+2)^(2)')
    })

})

describe("Factors: compare functions", () => {
    test('should determine if two factors are same (same polynom)', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.isSameAs('3x+2')).toBeTruthy()
        expect(F.isSameAs('3x-2')).toBeFalsy()
        expect(F.isSameAs('6x+4')).toBeFalsy()
    })

    test('should compare to zero', () => {
        const F = new Factor('3x+2', '1/2')
        const F0 = new Factor('0', '1/2')
        expect(F.isZero()).toBeFalsy()
        expect(F0.isZero()).toBeTruthy()
    })

    test('should compare to one', () => {
        const F = new Factor('3x+2', '1/2')
        const F0 = new Factor('0', '1/2')
        const F1a = new Factor('1', '1/2')
        const F1b = new Factor('3x+2', '0')

        expect(F.isOne()).toBeFalsy()
        expect(F0.isOne()).toBeFalsy()
        expect(F1a.isOne()).toBeTruthy()
        expect(F1b.isOne()).toBeTruthy()
    })

    test('should compare two factors', () => {
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
    test('should raised to power', () => {
        const F = new Factor('3x+2', '1/2')

        F.pow(3)

        expect(F.power.display).toBe('3/2')
    })

    test('should apply the root', () => {
        const F = new Factor('3x+2', '1/2')

        F.root(5)

        expect(F.power.display).toBe('1/10')
    })

    test('should apply the square root', () => {
        const F = new Factor('3x+2', '1/2')

        F.sqrt()

        expect(F.power.display).toBe('1/4')
    })

    test('should multiply a factor and a polynom', () => {
        const F = new Factor('3x+2', '1/2')
        const P = new Polynom('3x+2')

        expect(F.multiply(P).power.display).toBe('3/2')
    })
    test('should multiply a factor by another factor', () => {
        const F = new Factor('3x+2', '1/2')
        const M = new Factor('3x+2', '5/3')

        expect(F.multiply(M).power.reduce().display).toBe('13/6')
    })

    test('should divide a factor and a polynom', () => {
        const F = new Factor('3x+2', '1/2')
        const P = new Polynom('3x+2')

        expect(F.divide(P).power.display).toBe('-1/2')
    })
    test('should divide a factor by another factor', () => {
        const F = new Factor('3x+2', '1/2')
        const M = new Factor('3x+2', '5/3')

        expect(F.divide(M).power.reduce().display).toBe('-7/6')
    })

    test('should get the inverse of a Factor', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.inverse().power.display).toBe('-1/2')
    })

    test('throws when multiplying single-monom factors with different polynomials and non-unit power', () => {
        const F = new Factor('3x', 1)
        expect(() => F.multiply(new Factor('5x', '1/2'))).toThrow(MathError)
    })

    test('multiply failure leaves the receiver intact', () => {
        const F = new Factor('3x+2', '1/2')
        const display = F.display
        expect(() => F.multiply(new Factor('x-1'))).toThrow(MathError)
        expect(F.display).toBe(display)
    })

    test('divide failure leaves the receiver intact', () => {
        const F = new Factor('3x+2', '1/2')
        const display = F.display
        expect(() => F.divide(new Factor('x-1'))).toThrow(MathError)
        expect(F.display).toBe(display)
    })
})

describe("Factors: algebra operations", () => {
    test('should get the variables', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.variables).toEqual(['x'])
    })

    test('should determine if test containes a variable', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.hasVariable('x')).toBeTruthy()
        expect(F.hasVariable('y')).toBeFalsy()
    })

    test('should get the degree of the factor', () => {
        const F = new Factor('3x+2', '1/2')
        const F2 = new Factor('3x^3+2', '1/2')

        expect(F.degree().display).toBe('1/2')
        expect(F2.degree().display).toBe('3/2')
    })

    test('should evaluate the factor', () => {
        const F = new Factor('3x+2', '1/2')

        expect(F.evaluate({ x: 2 }).value).toBe(2.8284271247461903)
    })

    test('should get the derivative of a trivial Factor', ()=>{
        const F = new Factor('3')
        const dF = F.getDerivativeFactors()

        expect(dF).toHaveLength(1)
        expect(dF[0].asSingle.display).toBe('0')
    })


    test('should get the derivative of a monomial Factor', ()=>{
        const F = Factor.fromPolynom('3x^4')
        const dF = F.getDerivativeFactors()
        expect(dF).toHaveLength(1)
        expect(dF[0].asSingle.display).toBe('12x^(3)')
    })


    test('should get the derivative of the factor', () => {
        const F = new Factor('3x^2+2x-1', '1/2')

        const dF = F.getDerivativeFactors()
        expect(dF.length).toBe(3)

        const [dF1, dF2, dF3] = dF
        expect(dF1.polynom.display).toBe('1/2')
        expect(dF1.power.display).toBe('1')
        expect(dF2.polynom.display).toBe('6x+2')
        expect(dF2.power.display).toBe('1')
        expect(dF3.polynom.display).toBe('3x^(2)+2x-1')
        expect(dF3.power.display).toBe('-1/2')
    })

    test('should develop a Factor', () => {
        const F = new Factor('x+2', '3')

        const dF = F.develop()

        expect(dF.degree().value).toBe(3)
        expect(dF.display).toBe('x^(3)+6x^(2)+12x+8')
    })

    test('evaluate returns a number when asNumeric is true', () => {
        const F = new Factor('3x+2', '1/2')
        const result = F.evaluate({x: 2}, true)
        expect(typeof result).toBe('number')
        expect(result).toBeCloseTo(2.8284271247461903)
    })

    test('develop throws when power is not a natural number', () => {
        const F = new Factor('x+2', '1/2')
        expect(() => F.develop()).toThrow(MathError)
    })
})

describe('Factor static parsing', () => {
    test('checkParseAsFactors returns true for a single parenthesised factor', () => {
        expect(Factor.checkParseAsFactors('(3x+2)^2')).toBe(true)
    })

    test('checkParseAsFactors returns true for a product of factors', () => {
        expect(Factor.checkParseAsFactors('(x+1)(x-1)')).toBe(true)
    })

    test('checkParseAsFactors returns false for a sum', () => {
        expect(Factor.checkParseAsFactors('(x+1)+(x-1)')).toBe(false)
    })

    test('checkParseAsFactors returns false for a difference', () => {
        expect(Factor.checkParseAsFactors('3x^2+2x-1')).toBe(false)
    })

    test('factorsFromString parses a parenthesised factor with power', () => {
        const factors = Factor.factorsFromString('(3x+2)^2')
        expect(factors).toHaveLength(1)
        expect(factors[0].polynom.display).toBe('3x+2')
        expect(factors[0].power.display).toBe('2')
    })

    test('factorsFromString parses a product of two factors', () => {
        const factors = Factor.factorsFromString('(x+1)(x-1)')
        expect(factors).toHaveLength(2)
        expect(factors[0].polynom.display).toBe('x+1')
        expect(factors[1].polynom.display).toBe('x-1')
    })

    test('factorsFromString wraps an unparseable string as a single factor', () => {
        const factors = Factor.factorsFromString('x^2+2x+1')
        expect(factors).toHaveLength(1)
    })

    test('factorsFromString negates powers when isNumerator is false', () => {
        const factors = Factor.factorsFromString('(x+1)^2', false)
        expect(factors[0].power.display).toBe('-2')
    })
})

describe('Table of signs of Factors', ()=>{
    test('with negative', ()=>{
        const tos = TableOfSigns.fromFactor(new Factor('x-3', -3))
        expect(tos.signs).toEqual(['-', 'd', '+'])
    })
    test('with power even', ()=>{
        const tos = TableOfSigns.fromFactor(new Factor('x-3', 2))
        expect(tos.signs).toEqual(['+', 'z', '+'])
    })
    test('with power odd', ()=>{
        const tos = TableOfSigns.fromFactor(new Factor('x-3', 3))
        expect(tos.signs).toEqual(['-', 'z', '+'])
    })
    test('with root even', ()=>{
        const tos = TableOfSigns.fromFactor(new Factor('x-3', '1/2'))
        expect(tos.signs).toEqual(['h', 'z', '+'])
    })
    test('with root odd', ()=>{
        const tos = TableOfSigns.fromFactor(new Factor('x-3', '1/3'))
        expect(tos.signs).toEqual(['-', 'z', '+'])
    })
})



describe('Factor asRoot with a negative power', () => {
    test.each([
        ['(x+1)^(-1)', '1/(x+1)', '\\frac{ 1 }{ x+1 }'],
        ['(x+1)^(-2)', '1/((x+1)^(2))', '\\frac{ 1 }{ \\left( x+1 \\right)^{ 2 } }'],
        ['(x+1)^(-1/2)', '1/(sqrt(x+1))', '\\frac{ 1 }{ \\sqrt{ x+1 } }'],
        ['(x+1)^(-3/2)', '1/(sqrt(x+1)^(3))', '\\frac{ 1 }{ \\sqrt{ x+1 }^{ 3 } }'],
    ])('%s is written with a positive power under the fraction bar', (input, display, tex) => {
        const F = new Factor(input).asRoot

        expect(F.display).toBe(display)
        expect(F.tex).toBe(tex)
    })

    test('a positive power and the default output are unchanged', () => {
        expect(new Factor('(x+1)^(1/2)').asRoot.display).toBe('sqrt(x+1)')
        expect(new Factor('(x+1)^(-2)').display).toBe('(x+1)^(-2)')
    })

    test('the factor keeps its power after being displayed', () => {
        const F = new Factor('(x+1)^(-2)').asRoot

        void F.display
        expect(F.power.display).toBe('-2')
    })
})
