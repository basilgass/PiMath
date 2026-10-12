import {describe, expect, it} from "vitest"
import {rndVector} from "../../../src/randomization/geometry/rndVector"
import type {RandomGeometryVectorConfig} from "../../../src/randomization/rndTypes"
import {Numeric} from "../../../src/numeric"
import {InvalidArgumentError} from "../../../src/errors"
import {draws, drawsToSee} from "../../helpers/draws"

const SAMPLES = draws(300)

function sample(config?: RandomGeometryVectorConfig, count = SAMPLES) {
    return Array.from({length: count}, () => {
        const v = rndVector(config)
        return {x: v.x.value, y: v.y.value, vector: v}
    })
}

describe('rndVector', () => {
    describe('defaults', () => {
        it('draws a 2D vector with integer components within [-10, 10]', () => {
            for (const {vector, x, y} of sample()) {
                expect(vector.dimension).toBe(2)
                expect(vector.x.isRelative() && vector.y.isRelative()).toBe(true)
                expect(Math.max(Math.abs(x), Math.abs(y))).toBeLessThanOrEqual(10)
            }
        })

        it('is never the null vector', () => {
            for (const {x, y} of sample({range: 1}, draws(500))) {
                expect(x === 0 && y === 0).toBe(false)
            }
        })

        it('does not leak a previous call configuration into the next one', () => {
            rndVector({axis: 'x'})
            expect(sample(undefined, drawsToSee(0.9)).some(v => v.y !== 0)).toBe(true)
        })
    })

    describe('allow.zero', () => {
        it('returns the null vector sometimes when allowed', () => {
            const vectors = sample({range: 1, allow: {zero: true}}, drawsToSee(1 / 9))
            expect(vectors.some(v => v.x === 0 && v.y === 0)).toBe(true)
        })

        it('keeps the vector on the axis but not null', () => {
            const vectors = sample({axis: 'x'})
            expect(vectors.every(v => v.y === 0 && v.x !== 0)).toBe(true)
        })
    })

    describe('point options', () => {
        it('forwards axis, quadrant, range and fraction', () => {
            expect(sample({axis: 'y'}).every(v => v.x === 0)).toBe(true)
            expect(sample({quadrant: 3}).every(v => v.x <= 0 && v.y <= 0)).toBe(true)
            expect(sample({range: {min: 2, max: 5}}).every(v => v.x >= 2 && v.x <= 5 && v.y >= 2 && v.y <= 5)).toBe(true)
            expect(sample({fraction: true, range: 5}, Math.max(draws(500), drawsToSee(0.3))).some(v => !v.vector.x.isRelative())).toBe(true)
        })
    })

    describe('primitive', () => {
        it('draws integer components with no common divisor', () => {
            for (const {vector} of sample({primitive: true})) {
                expect(Numeric.gcd(...vector.array.map(c => Math.abs(c.numerator)))).toBe(1)
            }
        })

        it('keeps the zeros and the signs of the quadrant', () => {
            expect(sample({primitive: true, quadrant: 2}).every(v => v.x <= 0 && v.y >= 0)).toBe(true)
            expect(sample({primitive: true, axis: 'x'}).every(v => v.y === 0 && Math.abs(v.x) === 1)).toBe(true)
        })

        it('stays within the range, even when the reduction would leave it', () => {
            const vectors = sample({primitive: true, range: {min: 2, max: 5}})
            expect(vectors.every(v => v.x >= 2 && v.x <= 5 && v.y >= 2 && v.y <= 5)).toBe(true)
        })

        it('reduces vectors that would otherwise have a common divisor', () => {
            const vectors = sample({primitive: true, axis: false}, drawsToSee(0.3))
            expect(vectors.some(v => Math.abs(v.x) === 1 && Math.abs(v.y) === 1)).toBe(true)
            expect(vectors.every(v => Math.abs(v.x) !== 2 || v.y % 2 !== 0)).toBe(true)
        })

        it('accepts integer fractions with relative true', () => {
            expect(sample({primitive: true, fraction: {relative: true}}).every(v => v.vector.x.denominator === 1)).toBe(true)
        })

        it('keeps the null vector when it is allowed', () => {
            const vectors = sample({primitive: true, range: 1, allow: {zero: true}}, drawsToSee(1 / 9))
            expect(vectors.some(v => v.x === 0 && v.y === 0)).toBe(true)
        })

        it.each([true, {max: 5}])('rejects fraction %j', (fraction) => {
            expect(() => rndVector({primitive: true, fraction})).toThrow(InvalidArgumentError)
        })

        it('throws when no primitive vector fits the range', () => {
            expect(() => rndVector({primitive: true, range: {min: 2, max: 2}})).toThrow(InvalidArgumentError)
        })
    })

    describe('invalid configuration', () => {
        it('rejects allow.origin with a hint', () => {
            expect(() => rndVector({allow: {origin: true}} as never)).toThrow(/allow\.zero/)
        })

        it.each(['yes', 1])('rejects a non-boolean allow.zero %j', (zero) => {
            expect(() => rndVector({allow: {zero}} as never)).toThrow(InvalidArgumentError)
        })

        it.each(['yes', 1])('rejects a non-boolean primitive %j', (primitive) => {
            expect(() => rndVector({primitive} as never)).toThrow(InvalidArgumentError)
        })

        it('lets the errors of the point options through', () => {
            expect(() => rndVector({quadrant: 5} as never)).toThrow(InvalidArgumentError)
            expect(() => rndVector({range: 0})).toThrow(InvalidArgumentError)
        })
    })
})
