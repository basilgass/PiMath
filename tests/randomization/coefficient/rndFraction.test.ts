import {describe, expect, it} from "vitest"
import {rndFraction} from "../../../src/randomization/coefficient/rndFraction"
import {Numeric} from "../../../src/numeric"
import {InvalidArgumentError} from "../../../src/errors"
import {draws, drawsToSee, drawsToSeeAll} from "../../helpers/draws"

describe('rndFraction', () => {
    it('never returns zero by default', () => {
        for (let i = 0; i < draws(200); i++) {
            expect(rndFraction().value).not.toBe(0)
            expect(rndFraction({ relative: true, max: 1 }).value).not.toBe(0)
        }
    })

    it('returns zero sometimes when allow.zero is true', () => {
        const values = Array.from({ length: drawsToSee(1 / 3) }, () => rndFraction({ relative: true, max: 1, allow: { zero: true } }).value)
        expect(values).toContain(0)
    })

    it('throws when allow excludes every value, zero being left to its default', () => {
        expect(() => rndFraction({ allow: { negative: false, positive: false } })).toThrow(InvalidArgumentError)
        expect(rndFraction({ allow: { negative: false, positive: false, zero: true } }).value).toBe(0)
    })

    it('rejects the former natural option and names its replacement', () => {
        expect(() => rndFraction({ natural: true } as never)).toThrow(/relative/)
        expect(() => rndFraction({ natural: false } as never)).toThrow(InvalidArgumentError)
    })

    it('never returns zero when allow.zero is false', () => {
        for (let i = 0; i < draws(100); i++) {
            expect(rndFraction({ allow: { zero: false } }).value).not.toBe(0)
        }
    })

    it('always has denominator 1 when relative is true', () => {
        for (let i = 0; i < draws(50); i++) {
            expect(rndFraction({ relative: true }).denominator).toBe(1)
        }
    })

    it('never returns a negative value when allow.negative is false', () => {
        for (let i = 0; i < draws(100); i++) {
            expect(rndFraction({ allow: { negative: false, zero: false } }).value).toBeGreaterThan(0)
        }
    })

    it('returns a fraction with no common factor when reduced is true', () => {
        for (let i = 0; i < draws(50); i++) {
            const f = rndFraction({ reduced: true, relative: false, allow: { zero: false } })
            expect(Numeric.gcd(Math.abs(f.numerator), f.denominator)).toBe(1)
        }
    })

    it('keeps numerator and denominator within [-max, max]', () => {
        const max = 5
        for (let i = 0; i < draws(100); i++) {
            const f = rndFraction({ max })
            expect(Math.abs(f.numerator)).toBeLessThanOrEqual(max)
            expect(f.denominator).toBeLessThanOrEqual(max)
        }
    })

    describe('allow.positive', () => {
        const sample = (config: Parameters<typeof rndFraction>[0], count = draws(300)) =>
            Array.from({ length: count }, () => rndFraction(config).value)

        it('never returns a positive value when false', () => {
            expect(sample({ allow: { positive: false } }).every(v => v <= 0)).toBe(true)
        })

        it('returns strictly negative values when positive and zero are false', () => {
            for (const relative of [false, true]) {
                expect(sample({ relative, allow: { positive: false, zero: false } }).every(v => v < 0)).toBe(true)
            }
        })

        it('still returns both signs by default', () => {
            const values = sample(undefined, drawsToSeeAll(2))
            expect(values.some(v => v > 0)).toBe(true)
            expect(values.some(v => v < 0)).toBe(true)
        })

        it('returns only zero when only zero is allowed', () => {
            expect(sample({ allow: { positive: false, negative: false, zero: true } }).every(v => v === 0)).toBe(true)
        })

        it('throws when no value is allowed', () => {
            expect(() => rndFraction({ allow: { positive: false, negative: false, zero: false } }))
                .toThrow(InvalidArgumentError)
        })

        it('keeps the numerator and denominator within [-max, max]', () => {
            for (const v of Array.from({ length: draws(100) }, () => rndFraction({ max: 4, allow: { positive: false, zero: false } }))) {
                expect(v.numerator).toBeGreaterThanOrEqual(-4)
                expect(v.numerator).toBeLessThan(0)
                expect(v.denominator).toBeLessThanOrEqual(4)
            }
        })
    })

    it('does not mutate defaults across calls', () => {
        for (let i = 0; i < draws(20); i++) {
            rndFraction({ allow: { negative: false, zero: false } })
        }
        let sawNegative = false
        for (let i = 0; i < drawsToSee(0.4); i++) {
            if (rndFraction().value < 0) { sawNegative = true; break }
        }
        expect(sawNegative).toBe(true)
    })

    describe('range', () => {
        const sample = (config: Parameters<typeof rndFraction>[0], count = draws(300)) =>
            Array.from({ length: count }, () => rndFraction(config))

        it('keeps the value in an interval given as a number or as bounds', () => {
            expect(sample({ range: 3 }).every(q => q.value >= -3 && q.value <= 3)).toBe(true)
            expect(sample({ range: { min: 1, max: 2 } }).every(q => q.value >= 1 && q.value <= 2)).toBe(true)
            expect(sample({ range: { min: -4, max: -3 } }).every(q => q.value >= -4 && q.value <= -3)).toBe(true)
        })

        it('draws both ends and real fractions over the interval', () => {
            const values = sample({ range: 2 }, Math.max(draws(500), drawsToSee(0.1)))
            expect(values.some(q => q.value < 0)).toBe(true)
            expect(values.some(q => q.value > 0)).toBe(true)
            expect(values.some(q => !q.isRelative())).toBe(true)
        })

        it('never returns zero by default, even on an interval that holds it', () => {
            expect(sample({ range: 1 }).every(q => q.value !== 0)).toBe(true)
        })

        it('returns zero sometimes when allow.zero is true and the interval holds it', () => {
            const values = sample({ range: 1, allow: { zero: true } }, drawsToSee(0.1))
            expect(values.some(q => q.value === 0)).toBe(true)
        })

        it('only allows the signs that the interval holds', () => {
            expect(sample({ range: { min: 0, max: 5 } }).every(q => q.value > 0)).toBe(true)
            expect(sample({ range: { min: -5, max: 0 } }).every(q => q.value < 0)).toBe(true)
        })

        it('intersects with allow', () => {
            expect(sample({ range: 5, allow: { negative: false } }).every(q => q.value > 0)).toBe(true)
            expect(() => rndFraction({ range: { min: 1, max: 5 }, allow: { positive: false } })).toThrow(InvalidArgumentError)
            expect(() => rndFraction({ range: { min: 0, max: 0 } })).toThrow(InvalidArgumentError)
        })

        it('draws an integer of the interval with relative', () => {
            const values = sample({ range: 3, relative: true }, Math.max(draws(300), drawsToSeeAll(6)))
            expect(values.every(q => q.isRelative() && Math.abs(q.value) <= 3 && q.value !== 0)).toBe(true)
            expect(new Set(values.map(q => q.value))).toEqual(new Set([-3, -2, -1, 1, 2, 3]))
        })

        it('throws at once when the interval holds no integer and relative is requested', () => {
            expect(() => rndFraction({ range: { min: 0.2, max: 0.8 }, relative: true })).toThrow(/no integer/)
            expect(() => rndFraction({ range: { min: 0, max: 0.5 }, relative: true })).toThrow(InvalidArgumentError)
        })

        it('uses max for the numerator and the denominator, and throws when no fraction fits', () => {
            for (const q of sample({ range: 10, max: 3 })) {
                expect(Math.abs(q.numerator)).toBeLessThanOrEqual(3)
                expect(q.denominator).toBeLessThanOrEqual(3)
            }
            expect(() => rndFraction({ range: { min: 0.2, max: 0.8 }, max: 1 })).toThrow(InvalidArgumentError)
        })

        it('gives halves on an interval smaller than 1, rather than integers only', () => {
            const values = sample({ range: 1 }, Math.max(draws(300), drawsToSee(0.2)))
            expect(values.some(q => !q.isRelative())).toBe(true)
        })

        it('reaches non-integer fractions on an interval that stays away from 0', () => {
            // With max = 4 no fraction n/d (d >= 2) reaches 2: the default max doubles on such an interval.
            for (const range of [{ min: 2, max: 4 }, { min: -4, max: -2 }]) {
                const values = sample({ range }, Math.max(draws(300), drawsToSee(0.1)))
                expect(values.every(q => q.value >= range.min && q.value <= range.max)).toBe(true)
                expect(values.some(q => !q.isRelative())).toBe(true)
            }
        })

        it('never returns a negative zero', () => {
            for (const q of sample({ range: 1, allow: { zero: true } })) {
                expect(Object.is(q.value, -0)).toBe(false)
            }
        })

        it.each([NaN, Infinity, { min: 3, max: 1 }, 'ten', null])('throws on the invalid range %j', (range) => {
            expect(() => rndFraction({ range } as never)).toThrow(InvalidArgumentError)
        })

        it('leaves the draw as before when no range is given', () => {
            expect(sample({ max: 10 }, draws(300)).every(q => Math.abs(q.numerator) <= 10)).toBe(true)
        })
    })
})
