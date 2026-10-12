import {describe, expect, it} from "vitest"
import {
    assertRule,
    restrict,
    rndCoordinate,
    ruleProblem,
    rulesProblem,
    type ZeroRule
} from "../../src/randomization/rndCoordinates"
import type {Bounds} from "../../src/randomization/rndInterval"
import {toInterval} from "../../src/randomization/rndInterval"
import {InvalidArgumentError} from "../../src/errors"
import {draws, drawsToSee} from "../helpers/draws"

function sample(interval: Bounds, rule: ZeroRule, fraction?: Parameters<typeof rndCoordinate>[2], count = draws(300)) {
    return Array.from({length: count}, () => rndCoordinate(interval, rule, fraction))
}

describe('rndCoordinates', () => {
    describe('restrict', () => {
        const interval = {min: -3, max: 5}

        it('keeps the non-negative part for sign 1 and the non-positive part for sign -1', () => {
            expect(restrict(interval, 1)).toEqual({min: 0, max: 5})
            expect(restrict(interval, -1)).toEqual({min: -3, max: 0})
        })

        it('leaves the interval alone without a sign', () => {
            expect(restrict(interval, undefined)).toEqual(interval)
        })

        it('gives an empty interval when the sign is disjoint from it', () => {
            const empty = restrict({min: 1, max: 5}, -1)
            expect(empty.min).toBeGreaterThan(empty.max)
        })
    })

    describe('ruleProblem and assertRule', () => {
        it('accepts a free coordinate on any non-empty interval', () => {
            expect(ruleProblem({min: 1, max: 5}, 'free')).toBeNull()
            expect(ruleProblem({min: 0, max: 0}, 'free')).toBeNull()
        })

        it('needs 0 in the interval for a zero coordinate', () => {
            expect(ruleProblem({min: -1, max: 1}, 'zero')).toBeNull()
            expect(ruleProblem({min: 0, max: 5}, 'zero')).toBeNull()
            expect(ruleProblem({min: 1, max: 5}, 'zero')).not.toBeNull()
            expect(ruleProblem({min: -5, max: -1}, 'zero')).not.toBeNull()
        })

        it('needs more than 0 in the interval for a non-zero coordinate', () => {
            expect(ruleProblem({min: 0, max: 0}, 'nonzero')).not.toBeNull()
            expect(ruleProblem({min: 0, max: 1}, 'nonzero')).toBeNull()
        })

        it('reports an empty interval whatever the rule', () => {
            for (const rule of ['free', 'zero', 'nonzero'] as const) {
                expect(ruleProblem({min: 2, max: 1}, rule)).not.toBeNull()
            }
        })

        it('gives the interval in the message, and throws it as an InvalidArgumentError', () => {
            expect(ruleProblem({min: 1, max: 5}, 'zero')).toContain('[1, 5]')
            expect(() => { assertRule({min: 1, max: 5}, 'zero') }).toThrow(InvalidArgumentError)
            expect(() => { assertRule({min: -1, max: 5}, 'zero') }).not.toThrow()
        })
    })

    describe('rulesProblem', () => {
        it('returns null when every rule holds on its interval, for two or three coordinates', () => {
            expect(rulesProblem([{min: -1, max: 1}, {min: 1, max: 5}], ['zero', 'nonzero'])).toBeNull()
            expect(rulesProblem([{min: -1, max: 1}, {min: 1, max: 5}, {min: 0, max: 3}], ['zero', 'free', 'nonzero'])).toBeNull()
        })

        it('reports the first coordinate whose rule cannot hold', () => {
            const intervals = [{min: -1, max: 1}, {min: 1, max: 5}, {min: 0, max: 0}]
            expect(rulesProblem(intervals, ['free', 'zero', 'nonzero'])).toBe(ruleProblem({min: 1, max: 5}, 'zero'))
            expect(rulesProblem(intervals, ['free', 'free', 'nonzero'])).toBe(ruleProblem({min: 0, max: 0}, 'nonzero'))
        })

        it('is null for no coordinate at all', () => {
            expect(rulesProblem([], [])).toBeNull()
        })
    })

    describe('rndCoordinate with integers', () => {
        it('stays in the interval and follows the zero rule', () => {
            expect(sample({min: -3, max: 3}, 'free').every(q => Math.abs(q.value) <= 3)).toBe(true)
            expect(sample({min: -3, max: 3}, 'zero').every(q => q.isZero())).toBe(true)
            expect(sample({min: -3, max: 3}, 'nonzero').every(q => !q.isZero())).toBe(true)
        })

        it('draws every integer of the interval', () => {
            const values = new Set(sample({min: -1, max: 1}, 'free', false, drawsToSee(1 / 3, {outcomes: 3})).map(q => q.value))
            expect(values).toEqual(new Set([-1, 0, 1]))
        })

        it('rounds non-integer bounds inwards', () => {
            const values = new Set(sample({min: 0.5, max: 2.5}, 'free', false, drawsToSee(0.5, {outcomes: 2})).map(q => q.value))
            expect(values).toEqual(new Set([1, 2]))
        })

        it('throws when the interval holds no integer', () => {
            expect(() => rndCoordinate({min: 0.2, max: 0.8}, 'free', false)).toThrow(InvalidArgumentError)
        })

        it('never returns a negative zero', () => {
            for (const interval of [{min: -0.5, max: 0.5}, toInterval(0), {min: -0.9, max: 0}]) {
                for (const q of sample(interval, 'free')) {
                    expect(Object.is(q.value, -0)).toBe(false)
                    expect(Object.is(q.numerator, -0)).toBe(false)
                }
            }
        })

        it('throws the rule problem before drawing', () => {
            expect(() => rndCoordinate({min: 1, max: 5}, 'zero', false)).toThrow(InvalidArgumentError)
            expect(() => rndCoordinate({min: 0, max: 0}, 'nonzero', false)).toThrow(InvalidArgumentError)
        })
    })

    describe('rndCoordinate with fractions', () => {
        it('stays in the interval and follows the zero rule', () => {
            expect(sample({min: -3, max: 3}, 'free', true).every(q => Math.abs(q.value) <= 3)).toBe(true)
            expect(sample({min: -3, max: 3}, 'nonzero', true).every(q => !q.isZero())).toBe(true)
            expect(sample({min: -3, max: 3}, 'zero', true).every(q => q.isZero())).toBe(true)
        })

        it('draws real fractions on a small interval, not only integers', () => {
            const values = sample({min: -1, max: 1}, 'free', true, Math.max(draws(500), drawsToSee(0.2)))
            expect(values.every(q => q.value >= -1 && q.value <= 1)).toBe(true)
            expect(values.some(q => !q.isRelative())).toBe(true)
        })

        it('draws halves on an interval smaller than 1', () => {
            const values = sample({min: -0.5, max: 0.5}, 'nonzero', true, Math.max(draws(300), drawsToSee(0.25, {outcomes: 2})))
            expect(values.every(q => Math.abs(q.value) === 0.5)).toBe(true)
            expect(values.some(q => q.value > 0)).toBe(true)
            expect(values.some(q => q.value < 0)).toBe(true)
        })

        it('keeps the sign of a half-line', () => {
            expect(sample({min: 0, max: 10}, 'free', true).every(q => q.value >= 0)).toBe(true)
            expect(sample({min: -10, max: 0}, 'nonzero', true).every(q => q.value < 0)).toBe(true)
        })

        it('ignores the allow of the coefficient configuration', () => {
            const values = sample({min: -5, max: 5}, 'free', {allow: {positive: false, negative: false, zero: false}},
                Math.max(draws(300), drawsToSee(0.4, {outcomes: 2})))
            expect(values.some(q => q.value > 0)).toBe(true)
            expect(values.some(q => q.value < 0)).toBe(true)
        })

        it('uses the max of the configuration for numerator and denominator', () => {
            for (const q of sample({min: -10, max: 10}, 'free', {max: 3})) {
                expect(Math.abs(q.numerator)).toBeLessThanOrEqual(3)
                expect(q.denominator).toBeLessThanOrEqual(3)
            }
        })

        it('throws when no fraction fits the interval', () => {
            expect(() => rndCoordinate({min: 0.2, max: 0.8}, 'free', {max: 1})).toThrow(InvalidArgumentError)
        })

        it('never returns a negative zero', () => {
            for (const q of sample({min: -0.5, max: 0.5}, 'free', true)) {
                expect(Object.is(q.value, -0)).toBe(false)
            }
        })
    })
})
