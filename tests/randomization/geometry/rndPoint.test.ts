import {describe, expect, it} from "vitest"
import {rndPoint} from "../../../src/randomization/geometry/rndPoint"
import type {RandomGeometryPointConfig} from "../../../src/randomization/rndTypes"
import {InvalidArgumentError} from "../../../src/errors"
import {draws, drawsToSee} from "../../helpers/draws"

const SAMPLES = draws(300)

function sample(config?: RandomGeometryPointConfig, count = SAMPLES) {
    return Array.from({length: count}, () => {
        const p = rndPoint(config)
        return {x: p.x.value, y: p.y.value, point: p}
    })
}

describe('rndPoint', () => {
    describe('defaults', () => {
        it('draws integer coordinates within [-10, 10]', () => {
            for (const {point, x, y} of sample()) {
                expect(point.x.isRelative()).toBe(true)
                expect(point.y.isRelative()).toBe(true)
                expect(Math.abs(x)).toBeLessThanOrEqual(10)
                expect(Math.abs(y)).toBeLessThanOrEqual(10)
            }
        })

        it('leaves coordinates unconstrained, so zeros can appear', () => {
            const points = sample(undefined, drawsToSee(1 / 21, {outcomes: 2}))
            expect(points.some(p => p.x === 0)).toBe(true)
            expect(points.some(p => p.y === 0)).toBe(true)
        })

        it('does not leak a previous call configuration into the next one', () => {
            rndPoint({axis: 'x'})
            expect(sample(undefined, drawsToSee(0.9)).some(p => p.y !== 0)).toBe(true)
        })
    })

    describe('axis', () => {
        it("puts the point on the x-axis with axis 'x'", () => {
            const points = sample({axis: 'x'}, Math.max(SAMPLES, drawsToSee(0.9)))
            expect(points.every(p => p.y === 0)).toBe(true)
            expect(points.some(p => p.x !== 0)).toBe(true)
        })

        it("puts the point on the y-axis with axis 'y'", () => {
            const points = sample({axis: 'y'}, Math.max(SAMPLES, drawsToSee(0.9)))
            expect(points.every(p => p.x === 0)).toBe(true)
            expect(points.some(p => p.y !== 0)).toBe(true)
        })

        it('puts the point on one of the axes, both being used, with axis true', () => {
            const points = sample({axis: true}, drawsToSee(0.4, {outcomes: 2}))
            expect(points.every(p => p.x === 0 || p.y === 0)).toBe(true)
            expect(points.some(p => p.y === 0 && p.x !== 0)).toBe(true)
            expect(points.some(p => p.x === 0 && p.y !== 0)).toBe(true)
        })

        it('never returns a zero coordinate with axis false', () => {
            for (const fraction of [false, true]) {
                for (const p of sample({axis: false, fraction})) {
                    expect(p.x).not.toBe(0)
                    expect(p.y).not.toBe(0)
                }
            }
        })
    })

    describe('allow.origin', () => {
        it('never returns the origin when excluded, even on a tiny range', () => {
            for (const p of sample({range: 1, allow: {origin: false}}, draws(500))) {
                expect(p.x === 0 && p.y === 0).toBe(false)
            }
        })

        it('keeps the point on the axis but away from the origin', () => {
            const points = sample({axis: 'x', allow: {origin: false}})
            expect(points.every(p => p.y === 0 && p.x !== 0)).toBe(true)
        })

        it('returns the origin sometimes when allowed on a tiny range', () => {
            expect(sample({range: 1}, drawsToSee(1 / 9)).some(p => p.x === 0 && p.y === 0)).toBe(true)
        })
    })

    describe('quadrant', () => {
        const signs: [1 | 2 | 3 | 4, number, number][] = [[1, 1, 1], [2, -1, 1], [3, -1, -1], [4, 1, -1]]

        it.each(signs)('keeps the point in quadrant %i, axes included', (quadrant, sx, sy) => {
            for (const fraction of [false, true]) {
                for (const p of sample({quadrant, fraction})) {
                    expect(p.x * sx).toBeGreaterThanOrEqual(0)
                    expect(p.y * sy).toBeGreaterThanOrEqual(0)
                }
            }
        })

        it('can land on the axes of the quadrant', () => {
            const points = sample({quadrant: 1, range: 1}, drawsToSee(0.5, {outcomes: 2}))
            expect(points.some(p => p.x === 0)).toBe(true)
            expect(points.some(p => p.y === 0)).toBe(true)
        })

        it.each(signs)('stays strictly inside quadrant %i with axis false', (quadrant, sx, sy) => {
            for (const p of sample({quadrant, axis: false})) {
                expect(p.x * sx).toBeGreaterThan(0)
                expect(p.y * sy).toBeGreaterThan(0)
            }
        })

        it('keeps y >= 0 and uses both signs of x for quadrants 1 and 2', () => {
            const points = sample({quadrant: [1, 2]}, Math.max(draws(500), drawsToSee(0.4, {outcomes: 2})))
            expect(points.every(p => p.y >= 0)).toBe(true)
            expect(points.some(p => p.x > 0)).toBe(true)
            expect(points.some(p => p.x < 0)).toBe(true)
        })

        it('keeps x >= 0 for quadrants 1 and 4', () => {
            expect(sample({quadrant: [1, 4]}, draws(500)).every(p => p.x >= 0)).toBe(true)
        })

        it('supports opposite quadrants, keeping x and y of the same sign', () => {
            const points = sample({quadrant: [1, 3], axis: false}, Math.max(draws(500), drawsToSee(0.5, {outcomes: 2})))
            expect(points.every(p => p.x * p.y > 0)).toBe(true)
            expect(points.some(p => p.x > 0)).toBe(true)
            expect(points.some(p => p.x < 0)).toBe(true)
        })

        it('is unconstrained when all four quadrants are given', () => {
            const points = sample({quadrant: [1, 2, 3, 4]}, drawsToSee(0.2, {outcomes: 2}))
            expect(points.some(p => p.x < 0 && p.y < 0)).toBe(true)
            expect(points.some(p => p.x > 0 && p.y > 0)).toBe(true)
        })

        it('combines with an axis: quadrant 2 and axis x gives the negative x half-axis', () => {
            const points = sample({quadrant: 2, axis: 'x'})
            expect(points.every(p => p.y === 0 && p.x <= 0)).toBe(true)
        })
    })

    describe('range', () => {
        it('treats a negative number like its absolute value', () => {
            for (const range of [3, -3]) {
                const points = sample({range}, Math.max(draws(500), drawsToSee(0.25)))
                expect(points.every(p => Math.abs(p.x) <= 3 && Math.abs(p.y) <= 3)).toBe(true)
                expect(points.some(p => p.x === 3 || p.x === -3)).toBe(true)
            }
        })

        it('uses explicit bounds', () => {
            const points = sample({range: {min: 2, max: 5}})
            expect(points.every(p => p.x >= 2 && p.x <= 5 && p.y >= 2 && p.y <= 5)).toBe(true)
        })

        it('returns only +/-1 with range 1 and axis false', () => {
            expect(sample({range: 1, axis: false}).every(p => Math.abs(p.x) === 1 && Math.abs(p.y) === 1)).toBe(true)
        })

        it('intersects with the quadrant', () => {
            const points = sample({range: {min: -3, max: 10}, quadrant: 3})
            expect(points.every(p => p.x >= -3 && p.x <= 0 && p.y >= -3 && p.y <= 0)).toBe(true)
        })
    })

    describe('fraction', () => {
        it('draws fractions, some of them non-integer, within the range', () => {
            const points = sample({fraction: true, range: 5}, Math.max(draws(500), drawsToSee(0.3)))
            expect(points.every(p => Math.abs(p.x) <= 5 && Math.abs(p.y) <= 5)).toBe(true)
            expect(points.some(p => !p.point.x.isRelative())).toBe(true)
        })

        it('draws fractions inside explicit bounds', () => {
            const points = sample({fraction: true, range: {min: 0, max: 1}})
            expect(points.every(p => p.x >= 0 && p.x <= 1 && p.y >= 0 && p.y <= 1)).toBe(true)
        })

        it('forwards the coefficient configuration to the fractions', () => {
            for (const p of sample({fraction: {max: 3, relative: true}, range: 10})) {
                expect(p.point.x.denominator).toBe(1)
                expect(Math.abs(p.point.x.numerator)).toBeLessThanOrEqual(3)
            }
        })

        it('ignores the allow of the coefficient configuration, which axis, quadrant and range drive', () => {
            const points = sample({fraction: {allow: {positive: false, negative: false, zero: false}}, range: 5}, Math.max(draws(500), drawsToSee(0.4, {outcomes: 2})))
            expect(points.some(p => p.x > 0)).toBe(true)
            expect(points.some(p => p.x < 0)).toBe(true)
        })

        it('respects the quadrant with fractions', () => {
            expect(sample({fraction: true, quadrant: 4}).every(p => p.x >= 0 && p.y <= 0)).toBe(true)
        })
    })

    describe('invalid configuration', () => {
        it.each([5, 0, [1, 5], []])('throws on quadrant %j', (quadrant) => {
            expect(() => rndPoint({quadrant} as never)).toThrow(InvalidArgumentError)
        })

        it.each([NaN, Infinity, {min: 3, max: 1}, {min: 0}, 'ten'])('throws on range %j', (range) => {
            expect(() => rndPoint({range} as never)).toThrow(InvalidArgumentError)
        })

        it("throws on an unknown axis such as 'z'", () => {
            expect(() => rndPoint({axis: 'z'} as never)).toThrow(InvalidArgumentError)
        })

        it('throws when the axis needs a zero that the range excludes', () => {
            expect(() => rndPoint({axis: 'x', range: {min: 1, max: 5}})).toThrow(InvalidArgumentError)
        })

        it('throws when the quadrant and the range do not intersect', () => {
            expect(() => rndPoint({quadrant: 1, range: {min: -5, max: -1}})).toThrow(InvalidArgumentError)
        })

        it('throws when a non-zero coordinate is required on a range reduced to 0', () => {
            expect(() => rndPoint({range: 0, axis: false})).toThrow(InvalidArgumentError)
            expect(() => rndPoint({range: 0, allow: {origin: false}})).toThrow(InvalidArgumentError)
        })

        it('throws when no fraction can fit the requested interval', () => {
            expect(() => rndPoint({fraction: {max: 1}, range: {min: 0.2, max: 0.8}})).toThrow(InvalidArgumentError)
        })
    })

    describe('alternatives of a random choice', () => {
        it('throws on every call when only some quadrants of a union fit the range', () => {
            // Quadrant 2 needs x <= 0, which the range excludes: the error cannot depend on the quadrant drawn.
            for (let i = 0; i < draws(200); i++) {
                expect(() => rndPoint({quadrant: [1, 2], range: {min: 1, max: 5}})).toThrow(InvalidArgumentError)
            }
        })

        it('throws on every call when only one axis of axis true is possible without the origin', () => {
            // The origin excluded makes the free coordinate non-zero. Quadrant 2 with x in [0, 5] limits x to 0,
            // so the x-axis alternative is impossible while the y-axis one would fit.
            for (let i = 0; i < draws(200); i++) {
                expect(() => rndPoint({axis: true, allow: {origin: false}, quadrant: 2, range: {min: 0, max: 5}}))
                    .toThrow(InvalidArgumentError)
            }
        })

        it('does not throw when every alternative fits', () => {
            for (let i = 0; i < draws(200); i++) {
                expect(() => rndPoint({quadrant: [1, 2], axis: true, range: {min: -5, max: 5}})).not.toThrow()
            }
        })
    })
})
