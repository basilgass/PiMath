import {describe, expect, it} from "vitest"
import {rndCircle} from "../../../src/randomization/geometry/rndCircle"
import {Fraction} from "../../../src/coefficients/fraction"
import {Point} from "../../../src/geometry/point"
import {InvalidArgumentError, NotImplementedError} from "../../../src/errors"
import type {Circle} from "../../../src/geometry/circle"
import type {RandomGeometryCircleConfig} from "../../../src/randomization/rndTypes"
import {draws, drawsToSee, drawsToSeeAll} from "../../helpers/draws"

// The number of draws follows the test mode (see tests/helpers/draws.ts): `draws(n)` for properties that hold
// for every draw, `drawsToSee(p)` for outcomes that must appear at least once (p: probability of the outcome).
function draw(count: number, config?: RandomGeometryCircleConfig): Circle[] {
    return Array.from({length: count}, () => rndCircle(config))
}

const squared = (circles: Circle[]) => circles.map(c => c.squareRadius.value)
const distinct = (values: number[]) => [...new Set(values)].sort((a, b) => a - b)
const pointCount = (circle: Circle) => circle.getPointsOnCircle().length

describe('rndCircle', () => {
    describe('defaults', () => {
        it('has at least 8 points with integer offsets, and only the squared radii that allow it', () => {
            const circles = draw(Math.max(draws(100), drawsToSeeAll(6)))
            expect(circles.every(c => pointCount(c) >= 8)).toBe(true)
            expect(distinct(squared(circles))).toEqual([5, 10, 13, 17, 20, 25])
        })

        it('does not leak a previous configuration into the next call', () => {
            draw(draws(20), {pointsOnCircle: 12})
            expect(distinct(squared(draw(drawsToSee(5 / 6) + 1))).length).toBeGreaterThan(1)
        })
    })

    describe('pointsOnCircle', () => {
        it('accepts a number as the minimum, with "at least" semantics', () => {
            // 12 points: squared radius 25 only, in [1, 25]
            expect(distinct(squared(draw(draws(100), {pointsOnCircle: 12})))).toEqual([25])
            expect(distinct(squared(draw(draws(100), {pointsOnCircle: {min: 12}})))).toEqual([25])
        })

        it('keeps every squared radius with a minimum of 0, including those without any integer point', () => {
            const circles = draw(drawsToSeeAll(25), {pointsOnCircle: 0})
            expect(distinct(squared(circles))).toEqual(Array.from({length: 25}, (_, i) => i + 1))
            expect(circles.some(c => pointCount(c) === 0)).toBe(true)
        })

        it('keeps only the squared radii with at least 4 points', () => {
            const circles = draw(drawsToSeeAll(13), {pointsOnCircle: 4})
            expect(circles.every(c => pointCount(c) >= 4)).toBe(true)
            expect(distinct(squared(circles))).toEqual([1, 2, 4, 5, 8, 9, 10, 13, 16, 17, 18, 20, 25])
        })

        it('treats an empty object, or a minimum left undefined, like the default minimum', () => {
            for (const pointsOnCircle of [{}, {min: undefined}, undefined]) {
                expect(draw(draws(30), {pointsOnCircle}).every(c => pointCount(c) >= 8)).toBe(true)
            }
        })

        it('throws when no squared radius has enough points', () => {
            expect(() => rndCircle({pointsOnCircle: 20})).toThrow(InvalidArgumentError)
        })

        it.each([-4, 4.5, NaN, '8', null, {min: -1}, {min: 2.5}, {fraction: 'yes'}])('throws on the invalid value %j', (pointsOnCircle) => {
            for (let i = 0; i < draws(20); i++) {
                expect(() => rndCircle({pointsOnCircle} as never)).toThrow(InvalidArgumentError)
            }
        })

        it('is not implemented yet for fractional offsets', () => {
            expect(() => rndCircle({pointsOnCircle: {fraction: true}})).toThrow(NotImplementedError)
        })
    })

    describe('exact radius', () => {
        it.each([
            [{radius: 5}, new Fraction(25)],
            [{radius: '5/2'}, new Fraction(25, 4)],
            [{radius: new Fraction(3)}, new Fraction(9)],
            [{squaredRadius: 5}, new Fraction(5)],
            [{squaredRadius: '7/2'}, new Fraction(7, 2)],
        ])('gives exactly the circle of %j, without applying the default points', (config, expected) => {
            for (const circle of draw(draws(20), config)) {
                expect(circle.squareRadius.isEqual(expected)).toBe(true)
            }
        })

        it('checks an explicit pointsOnCircle against the exact radius', () => {
            expect(() => rndCircle({radius: 3, pointsOnCircle: 8})).toThrow(InvalidArgumentError)
            expect(() => rndCircle({squaredRadius: 3, pointsOnCircle: 4})).toThrow(InvalidArgumentError)
            expect(() => rndCircle({radius: 3, pointsOnCircle: 4})).not.toThrow()
            expect(() => rndCircle({squaredRadius: 13, pointsOnCircle: 8})).not.toThrow()
        })

        it.each([NaN, Infinity, 0, -2, 'abc'])('throws on the invalid radius %j', (value) => {
            expect(() => rndCircle({radius: value})).toThrow(InvalidArgumentError)
            expect(() => rndCircle({squaredRadius: value})).toThrow(InvalidArgumentError)
        })

        it('throws when radius and squaredRadius are both given', () => {
            expect(() => rndCircle({radius: 5, squaredRadius: 25})).toThrow(InvalidArgumentError)
        })
    })

    describe('random radius', () => {
        it('draws an integer radius from 1 to 5 by default, without the default points constraint', () => {
            expect(distinct(squared(draw(drawsToSeeAll(5), {radius: {fraction: false}})))).toEqual([1, 4, 9, 16, 25])
        })

        it('draws an integer squared radius from 1 to 25 by default, without the default points constraint', () => {
            const circles = draw(drawsToSeeAll(25), {squaredRadius: {fraction: false}})
            expect(distinct(squared(circles))).toEqual(Array.from({length: 25}, (_, i) => i + 1))
        })

        it('bounds the integer draw with max', () => {
            expect(distinct(squared(draw(drawsToSeeAll(3), {radius: {fraction: {relative: true, max: 3}}})))).toEqual([1, 4, 9])
            expect(distinct(squared(draw(drawsToSeeAll(3), {squaredRadius: {fraction: {relative: true, max: 3}}})))).toEqual([1, 2, 3])
        })

        it('applies an explicit pointsOnCircle to the random radius', () => {
            expect(distinct(squared(draw(draws(30), {radius: {fraction: false}, pointsOnCircle: 8})))).toEqual([25])
            const wide = draw(Math.max(draws(100), drawsToSeeAll(2)), {squaredRadius: {fraction: {relative: true, max: 50}}, pointsOnCircle: 12})
            expect(wide.every(c => pointCount(c) >= 12)).toBe(true)
            expect(distinct(squared(wide))).toEqual([25, 50])
        })

        it('throws when the explicit points cannot be reached within max', () => {
            expect(() => rndCircle({radius: {fraction: {relative: true, max: 4}}, pointsOnCircle: 8})).toThrow(InvalidArgumentError)
        })

        it.each([0, 2.5, -3])('throws on the invalid max %j', (max) => {
            expect(() => rndCircle({squaredRadius: {fraction: {relative: true, max}}})).toThrow(InvalidArgumentError)
        })

        it('draws fractions when fraction is true, with positive values and no points constraint', () => {
            const circles = draw(Math.max(draws(100), drawsToSee(0.5)), {squaredRadius: {fraction: true}})
            expect(circles.every(c => c.squareRadius.value > 0)).toBe(true)
            expect(circles.some(c => !c.squareRadius.isRelative())).toBe(true)
            expect(draw(draws(30), {radius: {fraction: true}}).every(c => c.squareRadius.value > 0)).toBe(true)
        })

        it('refuses a fractional radius with a points requirement, which it cannot meet', () => {
            expect(() => rndCircle({squaredRadius: {fraction: true}, pointsOnCircle: 4})).toThrow(InvalidArgumentError)
            expect(() => rndCircle({squaredRadius: {fraction: true}, pointsOnCircle: 0})).not.toThrow()
        })

        it('throws on an invalid fraction option', () => {
            expect(() => rndCircle({radius: {fraction: 'yes'}} as never)).toThrow(InvalidArgumentError)
        })
    })

    describe('center', () => {
        it('forwards the configuration to rndPoint', () => {
            // a range reduced to [2, 2] forces the point (2, 2)
            for (const circle of draw(draws(30), {center: {range: {min: 2, max: 2}}})) {
                expect(circle.center.isEqual(new Point(2, 2))).toBe(true)
            }
        })

        it('keeps the points exact when the center has fractional coordinates', () => {
            for (const circle of draw(draws(50), {center: {fraction: true, range: 3}})) {
                const points = circle.getPointsOnCircle()
                expect(points.length).toBeGreaterThanOrEqual(8)
                expect(points.every(P => circle.isPointOnCircle(P))).toBe(true)
            }
        })
    })
})
