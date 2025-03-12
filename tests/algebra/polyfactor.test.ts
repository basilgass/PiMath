import { describe, expect, test } from "vitest"
import {PolyFactor} from "../../src"
import { Factor } from "../../src"

describe("PolyFactor creation", () => {
    test('should create a PolyFactor', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2')
        )

        expect(PF.factors.length).toBe(1)

        const PF2 = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '2/3')
        )

        expect(PF2.factors.length).toBe(2)
    })

    test('create a PolyFactor from a Polynom', ()=>{
        const PF = new PolyFactor().fromPolynom('x^2-5x+6')
        expect(PF).toBeDefined()
        expect(PF.factors).toHaveLength(1)
    })

    test('create a PolyFactor from a numerator and denominator', ()=>{
        const PF = new PolyFactor().fromPolynom('x^2-5x+6', 'x^2+3x+2')
        expect(PF).toBeDefined()
        expect(PF.factors).toHaveLength(2)

        const numerator = PF.numerator
        const denominator = PF.denominator
        expect(numerator.factors).toHaveLength(1)
        expect(denominator.factors).toHaveLength(1)
    })
    test('should clone a PolyFactor', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '2/3')
        )

        const PF2 = PF.clone()

        expect(PF.factors.length).toBe(PF2.factors.length)

        PF2.factors[0].power = 2

        expect(PF.factors[0].power.value).not.toBe(PF2.factors[0].power.value)
    })

    test('should make a zero PolyFactor', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '2/3')
        )

        PF.zero()

        expect(PF.factors.length).toBe(1)
        expect(PF.factors[0].polynom.display).toBe('0')
        expect(PF.factors[0].power.value).toBe(1)

        expect(PF.isZero()).toBeTruthy()
        expect(PF.isOne()).toBeFalsy()
    })

    test('should make a one PolyFactor', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '2/3')
        )

        PF.one()

        expect(PF.factors.length).toBe(1)
        expect(PF.factors[0].polynom.display).toBe('1')
        expect(PF.factors[0].power.value).toBe(1)

        expect(PF.isZero()).toBeFalsy()
        expect(PF.isOne()).toBeTruthy()
    })

    test.skip('should parse a string', () => {
        // const PF = new PolyFactor(
        //     new Factor('3x+2', '1/2'),
        //     new Factor('4x-3', '-2/3')
        // )
        //
        // // (3x+2)^(1/2)(4x-3)^(-2/3)
        // const PF2 = new PolyFactor(PF.display)
        // expect(PF.isEqual(PF2)).toBeTruthy()
    })
})

describe("PolyFactor: output functions", () => {
    test('should output as LaTeX', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '2/3')
        )

        expect(PF.tex).toBe('\\left( 3x+2 \\right)^{ \\frac{ 1 }{ 2 } }\\left( 4x-3 \\right)^{ \\frac{ 2 }{ 3 } }')
    })

    test('should output as LaTex and do not add parenthesis on power if not needed.', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1'),
            new Factor('4x-3', '3')
        )

        expect(PF.tex).toBe('\\left( 3x+2 \\right)\\left( 4x-3 \\right)^{ 3 }')
    })

    test('should output with fraction', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1'),
            new Factor('4x-3', '-2')
        )

        expect(PF.asRoot.tex).toBe(`\\frac{ 3x+2 }{ \\left( 4x-3 \\right)^{ 2 } }`)
        expect(PF.asRoot.display).toBe(`(3x+2)/((4x-3)^(2))`)
    })

    test('should output as LaTex without parenthesis at all', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1')
        )

        expect(PF.tex).toBe('3x+2')
    })

    test('should output as ASCII', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '2/3')
        )

        expect(PF.display).toBe('(3x+2)^(1/2)(4x-3)^(2/3)')
    })

})

describe("PolyFactor: operations", () => {
    test('should multiply two PolyFactors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '2/3')
        )

        const PF2 = new PolyFactor(
            new Factor('3x+2', '3'),
            new Factor('7x-5', '2/3')
        )

        const PF3 = PF.multiply(PF2)

        expect(PF3.factors.length).toBe(4)
        expect(PF3.factors[3].power.display).toBe('2/3')
    })

    test('should divide two PolyFactors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '2/3')
        )

        const PF2 = new PolyFactor(
            new Factor('3x+2', '3'),
            new Factor('7x-5', '2/3')
        )

        const PF3 = PF.divide(PF2)

        expect(PF3.factors.length).toBe(4)
        expect(PF3.factors[3].power.display).toBe('-2/3')
    })

    test('should inverse a PolyFactors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '-2/3')
        )

        const PF2 = PF.inverse()

        expect(PF2.factors.length).toBe(2)
        expect(PF2.factors[0].power.display).toBe('-1/2')
        expect(PF2.factors[1].power.display).toBe('2/3')
    })

    test('should take the sqrt of a PolyFactors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '2/3')
        )

        const PF2 = PF.sqrt()

        expect(PF2.factors.length).toBe(2)
        expect(PF2.factors[0].power.display).toBe('1/4')
        expect(PF2.factors[1].power.display).toBe('1/3')
    })

    test('should take the power of a PolyFactors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '2/3')
        )

        const PF2 = PF.pow(5)

        expect(PF2.factors.length).toBe(2)
        expect(PF2.factors[0].power.display).toBe('5/2')
        expect(PF2.factors[1].power.display).toBe('10/3')
    })

    test('should take the root of a PolyFactors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '-2/3')
        )

        const PF2 = PF.root(-5)

        expect(PF2.factors.length).toBe(2)
        expect(PF2.factors[0].power.display).toBe('-1/10')
        expect(PF2.factors[1].power.display).toBe('2/15')
    })

    test('should reduce a PolyFactors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1/2'),
            new Factor('4x-3', '2/3'),
            new Factor('3x+2', '3'),
            new Factor('7x-5', '2/3')
        )

        PF.reduce()

        // There must be only 3 factors
        expect(PF.factors.length).toBe(3)

        // The grouped factor must be 3x+2
        const groupedFactor = PF.factors.filter(f => f.polynom.display === '3x+2')
        expect(groupedFactor.length).toBe(1)
        expect(groupedFactor[0].power.display).toBe('7/2')
    })

    test('should reduce a PolyFactors with constant factors', ()=>{
        const PF = new PolyFactor().fromPolynom('18(x+6)(x+3)','27x+243')
        const PFF = PF.factorize()
        expect(PFF.asRoot.display).toBe('((18)(x+3)(x+6))/((27)(x+9))')

        PFF.reduce()
        expect(PFF.asRoot.display).toBe('((2)(x+3)(x+6))/((3)(x+9))')
    })

    test('should get the gcd of two PolyFactors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '4'),
            new Factor('4x-3', '2')
        )

        const PF2 = new PolyFactor(
            new Factor('3x+2', '6'),
            new Factor('4x-3')
        )

        const PF3 = PolyFactor.gcd(PF, PF2)

        // There must be only 2 factors
        expect(PF3.factors.length).toBe(2)

        // Get the factor with the base polynom 3x+2
        const factor1 = PF3.factors.filter(f => f.polynom.display === '3x+2')
        expect(factor1.length).toBe(1)
        expect(factor1[0].power.display).toBe('4')

        const factor2 = PF3.factors.filter(f => f.polynom.display === '4x-3')
        expect(factor2.length).toBe(1)
        expect(factor2[0].power.display).toBe('1')

    })

    test('should get the gcd of three PolyFactors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '4'),
            new Factor('4x-3', '2')
        )

        const PF2 = new PolyFactor(
            new Factor('3x+2', '6'),
            new Factor('4x-3')
        )

        const PF3 = new PolyFactor(
            new Factor('3x+2', '2'),
            new Factor('4x-3', '3')
        )

        const PF4 = PolyFactor.gcd(PF, PF2, PF3)

        // There must be only 2 factors
        expect(PF4.factors.length).toBe(2)

        // Get the factor with the base polynom 3x+2
        const factor1 = PF4.factors.filter(f => f.polynom.display === '3x+2')
        expect(factor1.length).toBe(1)
        expect(factor1[0].power.display).toBe('2')

        const factor2 = PF4.factors.filter(f => f.polynom.display === '4x-3')
        expect(factor2.length).toBe(1)
        expect(factor2[0].power.display).toBe('1')

    })

    test('should return gcd=1 if no common factors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '4'),
            new Factor('4x-3', '2')
        )

        const PF2 = new PolyFactor(
            new Factor('5x+2', '6'),
            new Factor('4x+3')
        )

        const gcd = PolyFactor.gcd(PF, PF2)

        expect(gcd.isOne()).toBeTruthy()
    })

    test.todo('should get the lcm of two PolyFactors')
})

describe("PolyFactor: algebra operations", () => {
    test('should get the list of variables', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '4'),
            new Factor('4y-3', '2')
        )

        expect(PF.variables).toEqual(['x', 'y'])
    })

    test('should check if a variable is in the PolyFactor', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '4'),
            new Factor('4y-3', '2')
        )

        expect(PF.hasVariable('x')).toBeTruthy()
        expect(PF.hasVariable('z')).toBeFalsy()
    })

    test('should get the degree of the PolyFactor', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '4'),
            new Factor('4y-3', '2')
        )

        expect(PF.degree().value).toEqual(6)
        expect(PF.degree('x').value).toEqual(4)
        expect(PF.degree('y').value).toEqual(2)
    })

    test('should evaluate the PolyFactor', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '4'),
            new Factor('4y-3', '2')
        )

        expect(PF.evaluate({ x: 3, y: 2 }, true)).toEqual(366025)
    })

    test('should develop the PolyFactor', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1'),
            new Factor('4x-3', '2')
        )

        const PF2 = PF.develop()
        expect(PF2.degree().value).toBe(3)

        expect(PF2.display).toBe('48x^(3)-40x^(2)-21x+18')
    })
    test('should develop the PolyFactor in a more complex situation', ()=>{
        const PF = new PolyFactor(
            new Factor('x+1', 2),
            new Factor('x+2', 1),
            new Factor('x-3', -3)
        )

        const PF2 = PF.develop()
        expect(PF.factors).toHaveLength(3)
        expect(PF2.factors).toHaveLength(2)

        expect(PF2.numerator.display).toBe('x^(3)+4x^(2)+5x+2')
        expect(PF2.denominator.display).toBe('x^(3)-9x^(2)+27x-27')


    })

    test('should factorize the PolyFactor', ()=>{
        const PF = new PolyFactor().fromPolynom('x^2-5x+6')
        const PF2 = PF.factorize()
        expect(PF.factors).toHaveLength(1)
        expect(PF.display).toBe('x^(2)-5x+6')
        expect(PF2.factors).toHaveLength(2)
    })

    test('should factorize the PolyFactor in a more complex situation', ()=>{
        const PF = new PolyFactor(
            new Factor('x^2-5x+6', 2),
            new Factor('x^2+2x+1', -3)
        )

        const PF2 = PF.factorize()

        expect(PF.factors).toHaveLength(2)
        expect(PF.numerator.factors).toHaveLength(1)

        expect(PF2.factors).toHaveLength(3)

    })

    test('should add two PolyFactors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1'),
            new Factor('4x-3', '2')
        )

        const PF2 = new PolyFactor(
            new Factor('3x+2', '2'),
            new Factor('4x+1', '1')
        )

        PF.add(PF2)

        expect(PF.factors.length).toBe(2)
        expect(PF.display).toBe('(3x+2)(28x^(2)-13x+11)')
    })

    test('should add two PolyFactors with denominators', () => {
        // 2/(4x-3) + x/x+1 = 2x+2 + 4x^2-3x = 4x^2-x+2 / (4x-3)(x+1)
        const PF = new PolyFactor(
            new Factor('2', '1'),
            new Factor('4x-3', '-1')
        )

        const PF2 = new PolyFactor(
            new Factor('x', '1'),
            new Factor('x+1', '-1')
        )

        PF.add(PF2)

        expect(PF.factors.length).toBe(3)
        expect(PF.numerator.display).toBe('4x^(2)-x+2')
    })

    test('should get the opposite of a PolyFactor', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1'),
            new Factor('4x-3', '2')
        )

        const PF2 = PF.opposite()

        expect(PF2.factors.length).toBe(3)
        expect(PF2.sort().display).toBe('-1(3x+2)(4x-3)^(2)')
    })

    test('should subtract two PolyFactors', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '1'),
            new Factor('4x-3', '2')
        )

        const PF2 = new PolyFactor(
            new Factor('3x+2', '2'),
            new Factor('4x+1', '1')
        )

        PF.subtract(PF2)

        expect(PF.factors.length).toBe(2)
        expect(PF.sort().display).toBe('(3x+2)(4x^(2)-35x+7)')
    })

    test('should get the derivative of the PolyFactor', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '4'),
            new Factor('x^2-3x', '2')
        )

        const PF2 = PF.derivative()

        expect(PF2).toBeInstanceOf(PolyFactor)
        expect(PF2.factors.length).toBe(3)

        expect(PF2.display).toBe('(x^(2)-3x)(3x+2)^(3)(24x^(2)-46x-12)')
    })

    test('should get the derivative of a PolyFactor with negative power', ()=>{
        const PF = new PolyFactor(
            new Factor('x-4', 3),
            new Factor('2x+3', -5)
        )

        const dPF = PF.derivative().sort()

        expect(dPF.display).toBe('(-4x+49)(x-4)^(2)(2x+3)^(-6)')
    })

    test('should get the derivative of a PolyFactor with three factors', ()=>{
        const PF = new PolyFactor(
            new Factor('x-4', 3),
            new Factor('x', 2),
            new Factor('2x+3', -5)
        )

        const dPF = PF.derivative().sort()

        expect(dPF.display).toBe('x(39x-24)(x-4)^(2)(2x+3)^(-6)')
    })
})

describe("PolyFactor: comparison operations", () => {
    test('should check if two PolyFactors are equals', () => {
        const PF = new PolyFactor(
            new Factor('3x+2', '4'),
            new Factor('4y-3', '2')
        )

        const PF2 = new PolyFactor(
            new Factor('3x+2', '4'),
            new Factor('4y-3', '2')
        )

        const PF3 = new PolyFactor(
            new Factor('3x+2', '4'),
            new Factor('4y-3', '3')
        )

        expect(PF.isEqual(PF)).toBeTruthy()
        expect(PF.isEqual(PF2)).toBeTruthy()
        expect(PF.isEqual(PF3)).toBeFalsy()
    })
})

describe('PolyFactor: Table of signs', ()=>{
    test('compile table of signs of factors', ()=>{
        const PF = new PolyFactor(
            new Factor('x-3', 3),
            new Factor('x-2', 2),
            new Factor('x+5', '1/2'),
            new Factor('x', -2)
        )

        const tos = PF.tableOfSigns()

        expect(tos.roots.map(x=>x.value)).toEqual([-5,0,2,3])
        expect(tos.signs).toEqual(['h', 'z', '-', 'd', '-', 'z', '-', 'z', '+'])
    })

    test('compile table of signs with constant value', ()=>{
        const PF = new PolyFactor().fromPolynom('3', 'x^2-1')

        const tos = PF.tableOfSigns()

        expect(tos.roots.map(x=>x.value)).toEqual([-1,1])
        expect(tos.signs).toEqual([ '+', 'd', '-', 'd', '+' ])
    })

    test('compile table of signs from two polynoms', ()=>{
        const PF = new PolyFactor().fromPolynom('(x^2-16)(x+3)', '(x+5)')

        const tos = PF.tableOfSigns()
        expect(tos.factors[0].signs).toEqual([
            '-', 't', '-',
            't', '-', 'z',
            '+', 't', '+'
        ])
    })
})

describe.skip('PolyFactor temporary tests', ()=>{
    test('test 1', ()=>{
        const PF = new PolyFactor().fromPolynom('(x-3)(x+2)', '(2x-4)')

        console.log(PF.display)
        const PFF = PF.factorize()

        console.log(PFF.asRoot.display)
    })
    test('test 2', ()=>{
       const PF = new PolyFactor().fromPolynom('18(x+6)(x+3)','27x+243')
        const PFF = PF.factorize()
        expect(PFF.asRoot.display).toBe('((18)(x+3)(x+6))/((27)(x+9))')

        PFF.reduce()
        expect(PFF.asRoot.display).toBe('((2)(x+3)(x+6))/((3)(x+9))')
    })
})
