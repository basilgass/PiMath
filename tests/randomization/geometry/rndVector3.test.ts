import {describe, expect, it} from "vitest"
import {rndVector3, rndVector3WithRules} from "../../../src/randomization/geometry/rndVector3"
import type {RandomGeometryVector3Config} from "../../../src/randomization/rndTypes"
import {Numeric} from "../../../src/numeric"
import {InvalidArgumentError} from "../../../src/errors"
import {draws, drawsToSee} from "../../helpers/draws"

const SAMPLES = draws(300)

function sample(config?: RandomGeometryVector3Config, count = SAMPLES) {
    return Array.from({length: count}, () => {
        const v = rndVector3(config)
        return {x: v.x.value, y: v.y.value, z: v.z.value, vector: v}
    })
}

describe('rndVector3', () => {
    describe('defaults', () => {
        it('draws a 3D vector with integer components within [-10, 10]', () => {
            for (const {vector, x, y, z} of sample()) {
                expect(vector.dimension).toBe(3)
                expect(vector.array.every(c => c.isRelative())).toBe(true)
                expect(Math.max(Math.abs(x), Math.abs(y), Math.abs(z))).toBeLessThanOrEqual(10)
            }
        })

        it('is never the null vector', () => {
            for (const {x, y, z} of sample({range: 1}, draws(500))) {
                expect(x === 0 && y === 0 && z === 0).toBe(false)
            }
        })

        it('does not leak a previous call configuration into the next one', () => {
            rndVector3({axis: 'x'})
            expect(sample(undefined, drawsToSee(0.9)).some(v => v.y !== 0)).toBe(true)
        })
    })

    describe('allow.zero', () => {
        it('returns the null vector sometimes when allowed', () => {
            const vectors = sample({range: 1, allow: {zero: true}}, drawsToSee(1 / 27))
            expect(vectors.some(v => v.x === 0 && v.y === 0 && v.z === 0)).toBe(true)
        })

        it('keeps the vector on the axis but not null', () => {
            expect(sample({axis: 'z'}).every(v => v.x === 0 && v.y === 0 && v.z !== 0)).toBe(true)
        })
    })

    describe('point options', () => {
        it('forwards axis, plane, octant, range and fraction', () => {
            expect(sample({plane: 'xy'}).every(v => v.z === 0)).toBe(true)
            expect(sample({octant: 7}).every(v => v.x <= 0 && v.y <= 0 && v.z <= 0)).toBe(true)
            expect(sample({range: {min: 2, max: 5}}).every(v => [v.x, v.y, v.z].every(c => c >= 2 && c <= 5))).toBe(true)
            expect(sample({fraction: true, range: 5}, Math.max(draws(500), drawsToSee(0.3))).some(v => !v.vector.z.isRelative())).toBe(true)
        })
    })

    describe('primitive', () => {
        it('draws integer components with no common divisor', () => {
            for (const {vector} of sample({primitive: true})) {
                expect(Numeric.gcd(...vector.array.map(c => Math.abs(c.numerator)))).toBe(1)
            }
        })

        it('keeps the zeros and the signs of the octant', () => {
            expect(sample({primitive: true, octant: 6}).every(v => v.x <= 0 && v.y >= 0 && v.z <= 0)).toBe(true)
            expect(sample({primitive: true, plane: 'xz'}).every(v => v.y === 0)).toBe(true)
            expect(sample({primitive: true, axis: 'z'}).every(v => v.x === 0 && v.y === 0 && Math.abs(v.z) === 1)).toBe(true)
        })

        it('stays within the range, even when the reduction would leave it', () => {
            const vectors = sample({primitive: true, range: {min: 2, max: 5}})
            expect(vectors.every(v => [v.x, v.y, v.z].every(c => c >= 2 && c <= 5))).toBe(true)
        })

        it('keeps the null vector when it is allowed', () => {
            const vectors = sample({primitive: true, range: 1, allow: {zero: true}}, drawsToSee(1 / 27))
            expect(vectors.some(v => v.x === 0 && v.y === 0 && v.z === 0)).toBe(true)
        })

        it.each([true, {max: 5}])('rejects fraction %j', (fraction) => {
            expect(() => rndVector3({primitive: true, fraction})).toThrow(InvalidArgumentError)
        })

        it('throws when no primitive vector fits the range', () => {
            expect(() => rndVector3({primitive: true, range: {min: 2, max: 2}})).toThrow(InvalidArgumentError)
        })
    })

    describe('invalid configuration', () => {
        it('rejects allow.origin with a hint', () => {
            expect(() => rndVector3({allow: {origin: true}} as never)).toThrow(/allow\.zero/)
        })

        it('lets the errors of the point options through', () => {
            expect(() => rndVector3({octant: 9} as never)).toThrow(InvalidArgumentError)
            expect(() => rndVector3({axis: 'x', plane: 'xy'})).toThrow(InvalidArgumentError)
        })
    })

    describe('rndVector3WithRules', () => {
        const draw = (rules: Parameters<typeof rndVector3WithRules>[1], config?: RandomGeometryVector3Config, count = SAMPLES) =>
            Array.from({length: count}, () => rndVector3WithRules(config, rules)).map(v => ({x: v.x.value, y: v.y.value, z: v.z.value, vector: v}))

        it('follows the rules it is given, whatever axis and plane say', () => {
            const vectors = draw([['nonzero', 'nonzero', 'zero']], {axis: 'x', plane: 'yz'} as never)
            expect(vectors.every(v => v.x !== 0 && v.y !== 0 && v.z === 0)).toBe(true)
        })

        it('uses each alternative when several triples are given', () => {
            const vectors = draw([['zero', 'nonzero', 'free'], ['nonzero', 'zero', 'free']], undefined, drawsToSee(0.5, {outcomes: 2}))
            expect(vectors.every(v => (v.x === 0) !== (v.y === 0))).toBe(true)
            expect(vectors.some(v => v.x === 0)).toBe(true)
            expect(vectors.some(v => v.y === 0)).toBe(true)
        })

        it('reduces to a primitive vector on the axis its rules give', () => {
            const vectors = draw([['nonzero', 'zero', 'zero']], {primitive: true})
            expect(vectors.every(v => Math.abs(v.x) === 1 && v.y === 0 && v.z === 0)).toBe(true)
        })

        it('applies octant and range', () => {
            const vectors = draw([['nonzero', 'nonzero', 'nonzero']], {octant: 7, range: 3})
            expect(vectors.every(v => [v.x, v.y, v.z].every(c => c < 0 && c >= -3))).toBe(true)
        })

        it('rejects allow.origin with a hint', () => {
            expect(() => rndVector3WithRules({allow: {origin: true}} as never, [['free', 'free', 'free']])).toThrow(/allow\.zero/)
        })

        it('throws on every call when only one of the alternatives is impossible', () => {
            for (let i = 0; i < draws(100); i++) {
                expect(() => rndVector3WithRules({range: {min: 1, max: 5}}, [['nonzero', 'nonzero', 'nonzero'], ['zero', 'free', 'free']]))
                    .toThrow(InvalidArgumentError)
            }
        })
    })
})
