import {describe, expect, test} from "vitest"
import {Root} from "../../src/coefficients/root"

describe("root creation", () => {
    test('create root', () => {
        const R = new Root()

        expect(R.index).toBe(2)
        expect(R.factor.value).toBe(1)
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
})