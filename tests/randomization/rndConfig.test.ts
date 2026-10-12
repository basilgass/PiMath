import {describe, expect, it} from "vitest"
import {isRandomFraction, mergeConfig} from "../../src/randomization/rndConfig"
import {Fraction} from "../../src/coefficients/fraction"

describe('mergeConfig', () => {
    it('deep-merges plain-object sub-fields, preserving defaults not overridden', () => {
        const defaults = { max: 10, allow: { zero: true, negative: true } }
        const result = mergeConfig(defaults, { allow: { zero: false } })
        expect(result.allow.zero).toBe(false)
        expect(result.allow.negative).toBe(true)
    })

    it('returns a copy of defaults when no user config is provided', () => {
        const defaults = { max: 10, allow: { zero: true } }
        const result = mergeConfig(defaults)
        expect(result).not.toBe(defaults)
        expect(result.allow).not.toBe(defaults.allow)
        expect(result).toEqual(defaults)
    })

    it('overrides flat fields from user config', () => {
        const defaults = { max: 10, reduced: true }
        const result = mergeConfig(defaults, { max: 5 })
        expect(result.max).toBe(5)
        expect(result.reduced).toBe(true)
    })

    it('keeps the default of a flat field explicitly set to undefined', () => {
        const result = mergeConfig({ max: 10, reduced: true }, { max: undefined })
        expect(result.max).toBe(10)
        expect(result.reduced).toBe(true)
    })

    it('keeps the default of a nested field explicitly set to undefined', () => {
        const result = mergeConfig({ allow: { zero: true, negative: true } }, { allow: { zero: undefined, negative: false } })
        expect(result.allow.zero).toBe(true)
        expect(result.allow.negative).toBe(false)
    })

    it('keeps null as a real value', () => {
        const result = mergeConfig<{ quadrant: number | null }>({ quadrant: 1 }, { quadrant: null })
        expect(result.quadrant).toBeNull()
    })

    describe('isRandomFraction', () => {
        it('recognizes a random-draw description', () => {
            expect(isRandomFraction({})).toBe(true)
            expect(isRandomFraction({ fraction: true })).toBe(true)
            expect(isRandomFraction({ fraction: { max: 5 } })).toBe(true)
        })

        it('does not take an exact value for a random-draw description', () => {
            expect(isRandomFraction(2)).toBe(false)
            expect(isRandomFraction('-3/2')).toBe(false)
            expect(isRandomFraction(new Fraction(1, 2))).toBe(false)
        })
    })

    it('handles multiple nested sub-objects independently', () => {
        const defaults = {
            allow: { zero: true, negative: true },
            solution: { allowZero: true, nothing: false }
        }
        const result = mergeConfig(defaults, { solution: { nothing: true } })
        expect(result.solution.nothing).toBe(true)
        expect(result.solution.allowZero).toBe(true)
        expect(result.allow.zero).toBe(true)
    })
})
