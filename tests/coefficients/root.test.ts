import {describe, expect, test} from "vitest"
import {Root} from "../../src/coefficients/root"

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
})

describe('root string ouput', ()=>{
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
})