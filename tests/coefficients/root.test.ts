import {describe, expect, test} from "vitest"
import {Fraction, Root} from "../../src"

describe("root creation", () => {
    test('create root', () => {
        const R = new Root()

        expect(R.index).toBe(2)
        expect(R.factor.value).toBe(0)
        expect(R.radical.value).toBe(0)
    })

    test('create from defined values', ()=>{
        const R = new Root()
            .from(2, 7)

        expect(R.index).toBe(2)
        expect(R.radical.value).toBe(7)
        expect(R.factor.value).toBe(1)
    })

    test('create "sqrt(15)"', () => {
        const values = ['sqrt15', 'sqrt(15)']

        values.forEach(value => {
            const R = new Root(value)

            expect(R.index).toBe(2)
            expect(R.factor.value).toBe(1)
            expect(R.radical.value).toBe(15)
        })

    })

    test('create "7sqrt(15)"', () => {
        const values = ['7sqrt15', '7sqrt(15)']

        values.forEach(value => {
            const R = new Root(value)

            expect(R.index).toBe(2)
            expect(R.factor.value).toBe(7)
            expect(R.radical.value).toBe(15)
        })
    })

    test('create "root(3)(15)"', () => {
        const values = ['root(3)15', 'root(3)(15)']

        values.forEach(value => {
            const R = new Root(value)

            expect(R.index).toBe(3)
            expect(R.factor.value).toBe(1)
            expect(R.radical.value).toBe(15)
        })

    })

    test('create "7root(3)(15)"', () => {
        const values = ['7root(3)15', '7root(3)(15)']

        values.forEach(value => {
            const R = new Root(value)

            expect(R.index).toBe(3)
            expect(R.factor.value).toBe(7)
            expect(R.radical.value).toBe(15)
        })
    })

    test('reduce root', ()=>{
        const R = new Root().from(2, 18).reduce()
        expect(R.display).toBe('3sqrt(2)')
    })

    test('clone root', ()=>{
        const R = new Root().from(2,3,5)
        const cloned = R.clone()

        cloned.radical = new Fraction(7)

        expect(cloned.display).toBe('5sqrt(7)')
        expect(R.display).toBe('5sqrt(3)')
    })
})

describe('root string output', ()=>{
    const R1 = new Root().from(2, 3)
    const R2 = new Root().from(2, 3, 5)
    const R3 = new Root().from(3, 5)
    const R4 = new Root().from(3, 5, 7)

    test('output as asciiMath', ()=>{
        expect(R1.display).toBe('sqrt(3)')
        expect(R2.display).toBe('5sqrt(3)')
        expect(R3.display).toBe('root(3)(5)')
        expect(R4.display).toBe('7root(3)(5)')
    })

    test('output as TeX', ()=>{
        expect(R1.tex).toBe('\\sqrt{ 3 }')
        expect(R2.tex).toBe('5 \\sqrt{ 3 }')
        expect(R3.tex).toBe('\\sqrt[ 3 ]{ 5 }')
        expect(R4.tex).toBe('7 \\sqrt[ 3 ]{ 5 }')
    })

    test('output as asciiMath with fraction', ()=>{
        const R1 = new Root().from(2, 3, '2/5')
        expect(R1.display).toBe('(2sqrt(3))/5')

        const R2 = new Root().from(2, '3/7', '2/5')
        expect(R2.display).toBe('(2sqrt(3))/(5sqrt(7))')

        const R3 = new Root().from(4, 3, '2/5')
        expect(R3.display).toBe('(2root(4)(3))/5')

        const R4 = new Root().from(4, '3/7', '2/5')
        expect(R4.display).toBe('(2root(4)(3))/(5root(4)(7))')

        const R5 = new Root().from(4, '1/7', '1/5')
        expect(R5.display).toBe('1/(5root(4)(7))')

        const R6 = new Root().from(4, '2/7', '1/5')
        expect(R6.display).toBe('root(4)(2)/(5root(4)(7))')

        const R7 = new Root().from(4, '1/7', '2/5')
        expect(R7.display).toBe('2/(5root(4)(7))')

        const R01 = new Root().from(4, '0/7', '2/5')
        expect(R01.display).toBe('0')

        const R02 = new Root().from(4, '2/7', '0/5')
        expect(R02.display).toBe('0')
    })

    test('output as TeX with fraction', ()=>{
        const R1 = new Root().from(2, 3, '2/5')
        expect(R1.tex).toBe('\\frac{ 2 \\sqrt{ 3 } }{ 5 }')

        const R2 = new Root().from(2, '3/7', '2/5')
        expect(R2.tex).toBe('\\frac{ 2 \\sqrt{ 3 } }{ 5 \\sqrt{ 7 } }')

        const R3 = new Root().from(4, 3, '2/5')
        expect(R3.tex).toBe('\\frac{ 2 \\sqrt[ 4 ]{ 3 } }{ 5 }')

        const R4 = new Root().from(4, '3/7', '2/5')
        expect(R4.tex).toBe('\\frac{ 2 \\sqrt[ 4 ]{ 3 } }{ 5 \\sqrt[ 4 ]{ 7 } }')

        const R5 = new Root().from(4, '1/7', '1/5')
        expect(R5.tex).toBe('\\frac{ 1 }{ 5 \\sqrt[ 4 ]{ 7 } }')

        const R6 = new Root().from(4, '2/7', '1/5')
        expect(R6.tex).toBe('\\frac{ \\sqrt[ 4 ]{ 2 } }{ 5 \\sqrt[ 4 ]{ 7 } }')

        const R7 = new Root().from(4, '1/7', '2/5')
        expect(R7.tex).toBe('\\frac{ 2 }{ 5 \\sqrt[ 4 ]{ 7 } }')

        const R01 = new Root().from(4, '0/7', '2/5')
        expect(R01.tex).toBe('0')

        const R02 = new Root().from(4, '2/7', '0/5')
        expect(R02.tex).toBe('0')
    })
})

describe('root operations', ()=>{
    const R1 = new Root().from(2, 3, 2) // 2sqrt(3)
    const R2 = new Root().from(2, 3, 5) // 5sqrt(3)
    const R3 = new Root().from(2, 7, 5) // 5sqrt(7)
    const R4 = new Root().from(3, 7, 5) // 5root(3)(7)

    test('reduce roots', ()=>{
        const R = new Root().from(2, 12, 7).reduce()

        expect(R.display).toBe('14sqrt(3)')
    })
    test('add two roots with same radical / index', ()=>{
        expect(R1.clone().add(R1).factor.value).toBe(4)
        expect(R1.clone().add(R2).factor.value).toBe(7)
        expect(()=>R1.clone().add(R3)).toThrowError("Add can only be done with two same index and radical")
        expect(()=>R1.clone().add(R4)).toThrowError("Add can only be done with two same index and radical")
    })

    test('get opposite of root', ()=>{
        expect(R1.clone().opposite().display).toBe('-2sqrt(3)')
    })
    test('subtract two roots with same radical / index', ()=>{
        expect(R1.clone().subtract(R1).factor.value).toBe(0)
        expect(R1.clone().subtract(R2).factor.value).toBe(-3)
        expect(()=>R1.clone().subtract(R3)).toThrowError("Add can only be done with two same index and radical")
        expect(()=>R1.clone().subtract(R4)).toThrowError("Add can only be done with two same index and radical")
    })

    test('multiply two roots with same radical or index', ()=>{
        // 2sqrt(3)
        // 5sqrt(3)
        // 5sqrt(7) = 5 * 7^(1/2)
        // 5root(3)(7) = 5 * 7^(1/3)

        const R11 = R1.clone().multiply(R1)
        expect(R11.factor.value).toBe(4)
        expect(R11.radical.value).toBe(9)

        const R12 = R1.clone().multiply(R2)
        expect(R12.factor.value).toBe(10)
        expect(R12.radical.value).toBe(9)

        const R13 =R1.clone().multiply(R3)
        expect(R13.factor.value).toBe(10)
        expect(R13.radical.value).toBe(21)

        const R34 = R3.clone().multiply(R4)
        expect(R34.factor.value).toBe(25)
        expect(R34.radical.value).toBe(7**5)
        expect(R34.index).toBe(6)

        expect(()=>R1.clone().multiply(R4)).toThrowError('Multiply can only be done if radical or index as equals.')
    })

    test('raise root to pow', ()=>{
        const R12 = R1.clone().pow(2).reduce()

        expect(R12.display).toBe('12')

        const R42 = R4.clone().pow(2).reduce()

        expect(R42.display).toBe('25root(3)(49)')
    })

    test('take root from root', ()=>{
        const R12 = R1.clone().sqrt() // sqrt(sqrt(12))

        expect(R12.display).toBe('root(4)(12)')

        const R42 = R4.clone().sqrt() // sqrt(root(3)(875))
        expect(R42.display).toBe('root(6)(875)')

        const R45 = R4.clone().root(5) // root(5)(root(3)(875))
        expect(R45.display).toBe('root(15)(875)')
    })
})