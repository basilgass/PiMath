import {describe, expect, it} from "vitest"
import {isPoint3Feasible, rndPoint3, rndPoint3WithRules} from "../../../src/randomization/geometry/rndPoint3"
import type {Octant, RandomGeometryPoint3Config} from "../../../src/randomization/rndTypes"
import {InvalidArgumentError} from "../../../src/errors"
import {draws, drawsToSee} from "../../helpers/draws"

const SAMPLES = draws(300)

function sample(config?: RandomGeometryPoint3Config, count = SAMPLES) {
    return Array.from({length: count}, () => {
        const p = rndPoint3(config)
        return {x: p.x.value, y: p.y.value, z: p.z.value, point: p}
    })
}

describe('rndPoint3', () => {
    describe('defaults', () => {
        it('draws a 3D point with integer coordinates within [-10, 10]', () => {
            for (const {point, x, y, z} of sample()) {
                expect(point.dimension).toBe(3)
                expect(point.x.isRelative() && point.y.isRelative() && point.z.isRelative()).toBe(true)
                expect(Math.max(Math.abs(x), Math.abs(y), Math.abs(z))).toBeLessThanOrEqual(10)
            }
        })

        it('leaves coordinates unconstrained, so zeros can appear on each', () => {
            const points = sample(undefined, drawsToSee(1 / 21, {outcomes: 3}))
            expect(points.some(p => p.x === 0)).toBe(true)
            expect(points.some(p => p.y === 0)).toBe(true)
            expect(points.some(p => p.z === 0)).toBe(true)
        })

        it('does not leak a previous call configuration into the next one', () => {
            rndPoint3({axis: 'x'})
            expect(sample(undefined, drawsToSee(0.9)).some(p => p.y !== 0)).toBe(true)
        })
    })

    describe('axis', () => {
        it.each([
            ['x', (p: { x: number, y: number, z: number }) => p.y === 0 && p.z === 0],
            ['y', (p: { x: number, y: number, z: number }) => p.x === 0 && p.z === 0],
            ['z', (p: { x: number, y: number, z: number }) => p.x === 0 && p.y === 0],
        ] as const)("puts the point on the %s-axis", (axis, onAxis) => {
            const points = sample({axis}, Math.max(SAMPLES, drawsToSee(0.9)))
            expect(points.every(onAxis)).toBe(true)
            expect(points.some(p => p.x !== 0 || p.y !== 0 || p.z !== 0)).toBe(true)
        })

        it('uses all three axes with axis true', () => {
            const points = sample({axis: true}, drawsToSee(1 / 3 * 0.9, {outcomes: 3}))
            expect(points.every(p => [p.x, p.y, p.z].filter(c => c !== 0).length <= 1)).toBe(true)
            expect(points.some(p => p.x !== 0)).toBe(true)
            expect(points.some(p => p.y !== 0)).toBe(true)
            expect(points.some(p => p.z !== 0)).toBe(true)
        })

        it('never returns a zero coordinate with axis false', () => {
            for (const fraction of [false, true]) {
                for (const p of sample({axis: false, fraction})) {
                    expect(p.x).not.toBe(0)
                    expect(p.y).not.toBe(0)
                    expect(p.z).not.toBe(0)
                }
            }
        })
    })

    describe('plane', () => {
        it.each([
            ['xy', (p: { x: number, y: number, z: number }) => p.z === 0],
            ['xz', (p: { x: number, y: number, z: number }) => p.y === 0],
            ['yz', (p: { x: number, y: number, z: number }) => p.x === 0],
        ] as const)("puts the point in the %s plane", (plane, inPlane) => {
            const points = sample({plane}, Math.max(SAMPLES, drawsToSee(0.9)))
            expect(points.every(inPlane)).toBe(true)
        })

        it('leaves the other two coordinates free', () => {
            const points = sample({plane: 'xy'}, drawsToSee(0.9, {outcomes: 2}))
            expect(points.some(p => p.x !== 0)).toBe(true)
            expect(points.some(p => p.y !== 0)).toBe(true)
        })

        it('uses all three planes with plane true', () => {
            const points = sample({plane: true}, Math.max(draws(300), drawsToSee(0.3)))
            expect(points.every(p => p.x === 0 || p.y === 0 || p.z === 0)).toBe(true)
            expect(points.some(p => p.z === 0 && p.x !== 0 && p.y !== 0)).toBe(true)
            expect(points.some(p => p.y === 0 && p.x !== 0 && p.z !== 0)).toBe(true)
            expect(points.some(p => p.x === 0 && p.y !== 0 && p.z !== 0)).toBe(true)
        })

        it.each([false, null])('does not constrain the point with plane %j', (plane) => {
            expect(sample({plane}, drawsToSee(0.9)).some(p => p.z !== 0)).toBe(true)
        })
    })

    describe('allow.origin', () => {
        it('never returns the origin when excluded, even on a tiny range', () => {
            for (const p of sample({range: 1, allow: {origin: false}}, draws(500))) {
                expect(p.x === 0 && p.y === 0 && p.z === 0).toBe(false)
            }
        })

        it('keeps the point on the axis but away from the origin', () => {
            const points = sample({axis: 'z', allow: {origin: false}})
            expect(points.every(p => p.x === 0 && p.y === 0 && p.z !== 0)).toBe(true)
        })

        it('keeps the point in the plane but away from the origin', () => {
            const points = sample({plane: 'xy', range: 1, allow: {origin: false}}, draws(500))
            expect(points.every(p => p.z === 0 && (p.x !== 0 || p.y !== 0))).toBe(true)
        })

        it('keeps every axis away from the origin with axis true', () => {
            const points = sample({axis: true, allow: {origin: false}, range: 1}, Math.max(draws(500), drawsToSee(1 / 3, {outcomes: 3})))
            expect(points.every(p => p.x !== 0 || p.y !== 0 || p.z !== 0)).toBe(true)
            expect(points.some(p => p.x !== 0)).toBe(true)
            expect(points.some(p => p.y !== 0)).toBe(true)
            expect(points.some(p => p.z !== 0)).toBe(true)
        })

        it('returns the origin sometimes when allowed on a tiny range', () => {
            expect(sample({range: 1}, drawsToSee(1 / 27)).some(p => p.x === 0 && p.y === 0 && p.z === 0)).toBe(true)
        })
    })

    describe('octant', () => {
        const signs: [Octant, number, number, number][] = [
            [1, 1, 1, 1], [2, -1, 1, 1], [3, -1, -1, 1], [4, 1, -1, 1],
            [5, 1, 1, -1], [6, -1, 1, -1], [7, -1, -1, -1], [8, 1, -1, -1],
        ]

        it.each(signs)('keeps the point in octant %i, planes and axes included', (octant, sx, sy, sz) => {
            for (const fraction of [false, true]) {
                for (const p of sample({octant, fraction})) {
                    expect(p.x * sx).toBeGreaterThanOrEqual(0)
                    expect(p.y * sy).toBeGreaterThanOrEqual(0)
                    expect(p.z * sz).toBeGreaterThanOrEqual(0)
                }
            }
        })

        it('can land on a plane of the octant', () => {
            const points = sample({octant: 1, range: 1}, drawsToSee(1 / 3, {outcomes: 3}))
            expect(points.some(p => p.x === 0)).toBe(true)
            expect(points.some(p => p.y === 0)).toBe(true)
            expect(points.some(p => p.z === 0)).toBe(true)
        })

        it.each(signs)('stays strictly inside octant %i with axis false', (octant, sx, sy, sz) => {
            for (const p of sample({octant, axis: false})) {
                expect(p.x * sx).toBeGreaterThan(0)
                expect(p.y * sy).toBeGreaterThan(0)
                expect(p.z * sz).toBeGreaterThan(0)
            }
        })

        it('keeps z >= 0 and uses both octants for octants 1 and 3', () => {
            const points = sample({octant: [1, 3], axis: false}, Math.max(draws(500), drawsToSee(0.4, {outcomes: 2})))
            expect(points.every(p => p.z > 0 && p.x * p.y > 0)).toBe(true)
            expect(points.some(p => p.x > 0)).toBe(true)
            expect(points.some(p => p.x < 0)).toBe(true)
        })

        it('uses the octants of the upper half-space only for 1 to 4', () => {
            expect(sample({octant: [1, 2, 3, 4]}, draws(500)).every(p => p.z >= 0)).toBe(true)
        })

        it('treats a repeated octant like the octant alone', () => {
            expect(sample({octant: [6, 6, 6]}).every(p => p.x <= 0 && p.y >= 0 && p.z <= 0)).toBe(true)
        })

        it('is unconstrained when all eight octants are given', () => {
            const points = sample({octant: [1, 2, 3, 4, 5, 6, 7, 8]}, drawsToSee(0.1, {outcomes: 2}))
            expect(points.some(p => p.x < 0 && p.y < 0 && p.z < 0)).toBe(true)
            expect(points.some(p => p.x > 0 && p.y > 0 && p.z > 0)).toBe(true)
        })

        it('combines with an axis: octant 6 and axis x give the negative x half-axis', () => {
            const points = sample({octant: 6, axis: 'x'})
            expect(points.every(p => p.y === 0 && p.z === 0 && p.x <= 0)).toBe(true)
        })

        it('combines with a plane', () => {
            const points = sample({octant: 7, plane: 'xy'})
            expect(points.every(p => p.z === 0 && p.x <= 0 && p.y <= 0)).toBe(true)
        })
    })

    describe('range', () => {
        it('treats a negative number like its absolute value', () => {
            for (const range of [3, -3]) {
                const points = sample({range}, Math.max(draws(500), drawsToSee(1 / 7)))
                expect(points.every(p => Math.max(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z)) <= 3)).toBe(true)
                expect(points.some(p => p.z === 3 || p.z === -3)).toBe(true)
            }
        })

        it('uses explicit bounds', () => {
            const points = sample({range: {min: 2, max: 5}})
            expect(points.every(p => [p.x, p.y, p.z].every(c => c >= 2 && c <= 5))).toBe(true)
        })

        it('returns only +/-1 with range 1 and axis false', () => {
            expect(sample({range: 1, axis: false}).every(p => [p.x, p.y, p.z].every(c => Math.abs(c) === 1))).toBe(true)
        })

        it('intersects with the octant', () => {
            const points = sample({range: {min: -3, max: 10}, octant: 7})
            expect(points.every(p => [p.x, p.y, p.z].every(c => c >= -3 && c <= 0))).toBe(true)
        })
    })

    describe('fraction', () => {
        it('draws fractions, some of them non-integer, within the range', () => {
            const points = sample({fraction: true, range: 5}, Math.max(draws(500), drawsToSee(0.3)))
            expect(points.every(p => [p.x, p.y, p.z].every(c => Math.abs(c) <= 5))).toBe(true)
            expect(points.some(p => !p.point.z.isRelative())).toBe(true)
        })

        it('forwards the coefficient configuration to the fractions', () => {
            for (const {point} of sample({fraction: {max: 3, relative: true}, range: 10})) {
                for (const c of [point.x, point.y, point.z]) {
                    expect(c.denominator).toBe(1)
                    expect(Math.abs(c.numerator)).toBeLessThanOrEqual(3)
                }
            }
        })

        it('respects the octant with fractions', () => {
            expect(sample({fraction: true, octant: 8}).every(p => p.x >= 0 && p.y <= 0 && p.z <= 0)).toBe(true)
        })
    })

    describe('invalid configuration', () => {
        it.each([9, 0, 1.5, [1, 9], []])('throws on octant %j', (octant) => {
            expect(() => rndPoint3({octant} as never)).toThrow(InvalidArgumentError)
        })

        it.each([NaN, Infinity, {min: 3, max: 1}, {min: 0}, 'ten'])('throws on range %j', (range) => {
            expect(() => rndPoint3({range} as never)).toThrow(InvalidArgumentError)
        })

        it("throws on an unknown axis or plane", () => {
            expect(() => rndPoint3({axis: 'w'} as never)).toThrow(InvalidArgumentError)
            expect(() => rndPoint3({plane: 'xw'} as never)).toThrow(InvalidArgumentError)
        })

        it('rejects an axis combined with a plane', () => {
            expect(() => rndPoint3({axis: 'x', plane: 'xy'})).toThrow(InvalidArgumentError)
            expect(() => rndPoint3({axis: false, plane: 'xy'})).toThrow(InvalidArgumentError)
        })

        it('throws when the axis needs a zero that the range excludes', () => {
            expect(() => rndPoint3({axis: 'x', range: {min: 1, max: 5}})).toThrow(InvalidArgumentError)
            expect(() => rndPoint3({plane: 'xy', range: {min: 1, max: 5}})).toThrow(InvalidArgumentError)
        })

        it('throws when the octant and the range do not intersect', () => {
            expect(() => rndPoint3({octant: 1, range: {min: -5, max: -1}})).toThrow(InvalidArgumentError)
        })

        it('throws on every call when only one alternative of a random choice is impossible', () => {
            // Octants 2 and 3 need x <= 0 while the range is x >= 1: one alternative is impossible whatever is drawn.
            for (let i = 0; i < draws(50); i++) {
                expect(() => rndPoint3({octant: [1, 2], range: {min: 1, max: 5}})).toThrow(InvalidArgumentError)
            }
            // Every axis needs a zero coordinate, which this range excludes for the two others.
            for (let i = 0; i < draws(50); i++) {
                expect(() => rndPoint3({axis: true, range: {min: 1, max: 5}})).toThrow(InvalidArgumentError)
            }
        })

        it('throws when a non-zero coordinate is required on a range reduced to 0', () => {
            expect(() => rndPoint3({range: 0, axis: false})).toThrow(InvalidArgumentError)
            expect(() => rndPoint3({range: 0, allow: {origin: false}})).toThrow(InvalidArgumentError)
        })

        it('throws when no fraction can fit the requested interval', () => {
            expect(() => rndPoint3({fraction: {max: 1}, range: {min: 0.2, max: 0.8}})).toThrow(InvalidArgumentError)
        })
    })

    describe('rndPoint3WithRules', () => {
        const draw = (rules: Parameters<typeof rndPoint3WithRules>[1], config?: RandomGeometryPoint3Config, count = SAMPLES) =>
            Array.from({length: count}, () => rndPoint3WithRules(config, rules)).map(p => ({x: p.x.value, y: p.y.value, z: p.z.value, point: p}))

        it('follows the rules it is given, whatever axis and plane say', () => {
            const points = draw([['nonzero', 'nonzero', 'zero']], {axis: 'x', plane: 'yz'} as never)
            expect(points.every(p => p.x !== 0 && p.y !== 0 && p.z === 0)).toBe(true)
        })

        it('uses each alternative when several triples are given', () => {
            const points = draw([['zero', 'free', 'free'], ['free', 'zero', 'free']], undefined, drawsToSee(0.5, {outcomes: 2}))
            expect(points.every(p => p.x === 0 || p.y === 0)).toBe(true)
            expect(points.some(p => p.x === 0 && p.y !== 0)).toBe(true)
            expect(points.some(p => p.y === 0 && p.x !== 0)).toBe(true)
        })

        it('applies octant, range, fraction and allow.origin', () => {
            const points = draw([['free', 'free', 'free']], {octant: 3, range: 2, fraction: true, allow: {origin: false}})
            expect(points.every(p => p.x <= 0 && p.y <= 0 && p.z >= 0)).toBe(true)
            expect(points.every(p => Math.max(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z)) <= 2)).toBe(true)
            expect(points.every(p => p.x !== 0 || p.y !== 0 || p.z !== 0)).toBe(true)
        })

        it('throws on every call when only one of the alternatives is impossible', () => {
            for (let i = 0; i < draws(100); i++) {
                expect(() => rndPoint3WithRules({range: {min: 1, max: 5}}, [['nonzero', 'nonzero', 'nonzero'], ['zero', 'free', 'free']]))
                    .toThrow(InvalidArgumentError)
            }
        })
    })

    describe('isPoint3Feasible', () => {
        it('tells whether the rules can hold, without drawing', () => {
            expect(isPoint3Feasible(undefined, [['zero', 'free', 'nonzero']])).toBe(true)
            expect(isPoint3Feasible({range: {min: 1, max: 5}}, [['zero', 'free', 'free']])).toBe(false)
            expect(isPoint3Feasible({range: 0}, [['nonzero', 'free', 'free']])).toBe(false)
        })

        it('is false as soon as one octant of the union cannot hold the rules', () => {
            // Octant 2 needs x <= 0, which excludes every x of [1, 5]; octant 1 alone would fit.
            expect(isPoint3Feasible({octant: 1, range: {min: 1, max: 5}}, [['nonzero', 'nonzero', 'free']])).toBe(true)
            expect(isPoint3Feasible({octant: [1, 2], range: {min: 1, max: 5}}, [['nonzero', 'nonzero', 'free']])).toBe(false)
        })

        it('requires every rule of the list to hold', () => {
            expect(isPoint3Feasible({range: {min: 0, max: 5}}, [['zero', 'free', 'free'], ['nonzero', 'free', 'free']])).toBe(true)
            expect(isPoint3Feasible({range: {min: 1, max: 5}}, [['nonzero', 'free', 'free'], ['zero', 'free', 'free']])).toBe(false)
        })

        it('throws, rather than answering false, on an invalid range or octant', () => {
            expect(() => isPoint3Feasible({range: NaN}, [['free', 'free', 'free']])).toThrow(InvalidArgumentError)
            expect(() => isPoint3Feasible({octant: 9} as never, [['free', 'free', 'free']])).toThrow(InvalidArgumentError)
        })
    })
})
