import {describe, expect, it} from "vitest"
import {randomInt, randomIntSym, randomItem} from "../../src/randomization/rndHelpers"
import {InvalidArgumentError} from "../../src/errors"
import {draws} from "../helpers/draws"

describe('randomInt', () => {
    it('does not throw when exactly one value remains after exclusion', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(randomInt(0, 2, [0, 2])).toBe(1)
        }
    })

    it('throws when all values in range are excluded', () => {
        expect(() => randomInt(0, 1, [0, 1])).toThrow(InvalidArgumentError)
    })

    it('swaps bounds silently when a > b', () => {
        for (let i = 0; i < draws(20); i++) {
            const r = randomInt(5, 2)
            expect(r).toBeGreaterThanOrEqual(2)
            expect(r).toBeLessThanOrEqual(5)
        }
    })
})

describe('randomIntSym', () => {
    it('never returns 0 when allowZero is false', () => {
        for (let i = 0; i < draws(200); i++) {
            expect(randomIntSym(5, false)).not.toBe(0)
        }
    })

    it('stays within [-max, max]', () => {
        for (let i = 0; i < draws(50); i++) {
            const r = randomIntSym(5)
            expect(r).toBeGreaterThanOrEqual(-5)
            expect(r).toBeLessThanOrEqual(5)
        }
    })
})

describe('randomItem', () => {
    it('throws InvalidArgumentError on an empty array', () => {
        expect(() => randomItem([])).toThrow(InvalidArgumentError)
    })

    it('returns an element contained in the array', () => {
        const arr = [10, 20, 30]
        for (let i = 0; i < draws(20); i++) {
            expect(arr).toContain(randomItem(arr))
        }
    })
})
