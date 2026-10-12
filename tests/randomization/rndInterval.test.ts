import {describe, expect, it} from "vitest"
import {DEFAULT_RANGE, MAX_ATTEMPTS, normalizeZero, toInterval} from "../../src/randomization/rndInterval"
import {InvalidArgumentError} from "../../src/errors"

describe('rndInterval', () => {
    describe('toInterval', () => {
        it('reads a number d as [-|d|, |d|]', () => {
            expect(toInterval(3)).toEqual({min: -3, max: 3})
            expect(toInterval(-3)).toEqual({min: -3, max: 3})
        })

        it('keeps explicit bounds, including a single value', () => {
            expect(toInterval({min: 2, max: 5})).toEqual({min: 2, max: 5})
            expect(toInterval({min: 4, max: 4})).toEqual({min: 4, max: 4})
        })

        it('never produces a negative zero', () => {
            for (const range of [0, {min: -0, max: 3}, {min: -3, max: -0}]) {
                const {min, max} = toInterval(range)
                expect(Object.is(min, -0) || Object.is(max, -0)).toBe(false)
            }
        })

        it.each([NaN, Infinity, {min: 3, max: 1}, {min: 0}, {min: 'a', max: 3}, 'ten', null, undefined])(
            'throws on range %j', (range) => {
                expect(() => toInterval(range as never)).toThrow(InvalidArgumentError)
            })
    })

    describe('normalizeZero', () => {
        it('turns a negative zero into a zero and leaves other values alone', () => {
            expect(Object.is(normalizeZero(-0), 0)).toBe(true)
            expect(Object.is(normalizeZero(0), 0)).toBe(true)
            expect(normalizeZero(-3)).toBe(-3)
            expect(normalizeZero(2.5)).toBe(2.5)
        })
    })

    describe('constants', () => {
        it('keeps the default range and the number of attempts that the generators rely on', () => {
            expect(DEFAULT_RANGE).toBe(10)
            expect(MAX_ATTEMPTS).toBe(1000)
        })
    })
})
