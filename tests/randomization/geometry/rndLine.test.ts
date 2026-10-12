import {describe, expect, it} from "vitest"
import {rndLine} from "../../../src/randomization/geometry/rndLine"
import {Fraction} from "../../../src/coefficients/fraction"
import {Point} from "../../../src/geometry/point"
import {InvalidArgumentError} from "../../../src/errors"
import type {Line} from "../../../src/geometry/line"
import type {RandomGeometryLineConfig} from "../../../src/randomization/rndTypes"
import {draws, drawsToSee, drawsToSeeAll} from "../../helpers/draws"

// The number of draws follows the test mode (see tests/helpers/draws.ts): `draws(n)` for properties that hold
// for every draw, `drawsToSee(p)` for outcomes that must appear at least once (p: probability of the outcome).
function draw(count: number, config?: RandomGeometryLineConfig): Line[] {
    return Array.from({length: count}, () => rndLine(config))
}

type Kind = 'vertical' | 'horizontal' | 'positive' | 'negative'

function kindOf(line: Line): Kind {
    if (line.isVertical()) return 'vertical'
    if (line.isHorizontal()) return 'horizontal'
    return line.slope.isPositive() ? 'positive' : 'negative'
}

const kinds = (lines: Line[]) => new Set(lines.map(kindOf))

describe('rndLine', () => {
    describe('defaults', () => {
        it('draws every kind of line: vertical, horizontal, positive and negative slopes', () => {
            // vertical and horizontal have probability 5 %, the rarest kinds
            expect(kinds(draw(drawsToSee(0.05, {outcomes: 4})))).toEqual(new Set(['vertical', 'horizontal', 'positive', 'negative']))
        })

        it('does not leak a previous configuration into the next call', () => {
            draw(draws(20), {allow: {vertical: 1}})
            expect(kinds(draw(drawsToSee(0.55) + 1)).size).toBeGreaterThan(1)
        })
    })

    describe('exact slope', () => {
        it.each([
            [2, new Fraction(2)],
            [-1, new Fraction(-1)],
            [1, new Fraction(1)],
            [0.5, new Fraction(1, 2)],
            ['-3/2', new Fraction(-3, 2)],
            ['1/3', new Fraction(1, 3)],
            [new Fraction(5, 4), new Fraction(5, 4)],
        ])('gives exactly the slope %j', (slope, expected) => {
            for (const line of draw(draws(20), {slope})) {
                expect(line.isVertical()).toBe(false)
                expect(line.slope.isEqual(expected)).toBe(true)
            }
        })

        it('gives a horizontal line for a zero slope', () => {
            for (const line of draw(draws(20), {slope: 0})) {
                expect(line.isHorizontal()).toBe(true)
            }
        })

        it.each([NaN, Infinity, 'abc'])('throws on the invalid slope %j', (slope) => {
            expect(() => rndLine({slope})).toThrow(InvalidArgumentError)
        })

        it('throws when combined with an explicit allow', () => {
            expect(() => rndLine({slope: 2, allow: {vertical: false}})).toThrow(InvalidArgumentError)
        })

        it('accepts an empty allow, or entries left undefined', () => {
            expect(() => rndLine({slope: 2, allow: {}})).not.toThrow()
            expect(() => rndLine({slope: 2, allow: {vertical: undefined}})).not.toThrow()
        })
    })

    describe('point A', () => {
        it('passes through a given Point', () => {
            const A = new Point(3, -2)
            for (const line of draw(draws(30), {A})) {
                expect(line.isPointOnLine(A)).toBe(true)
            }
        })

        it('forwards the point configuration to rndPoint', () => {
            // a range reduced to [2, 2] forces the point (2, 2)
            for (const line of draw(draws(30), {A: {range: {min: 2, max: 2}}})) {
                expect(line.isPointOnLine(new Point(2, 2))).toBe(true)
            }
        })

        it('does not modify the given Point', () => {
            const A = new Point(3, -2)
            rndLine({A})
            expect(A.display).toBe('(3;-2)')
        })

        it.each([[{x: 1, y: 2}], ['(1,2)'], [null], [42]])('throws on the invalid point %j', (A) => {
            expect(() => rndLine({A} as never)).toThrow(InvalidArgumentError)
        })

        it('throws on a 3D point', () => {
            expect(() => rndLine({A: new Point(1, 2, 3)})).toThrow(InvalidArgumentError)
        })
    })

    describe('slope.fraction', () => {
        // vertical and horizontal lines are excluded to look at the slope itself
        const sloped = {vertical: false, horizontal: false}

        it('draws integer slopes when false', () => {
            for (const line of draw(draws(200), {slope: {fraction: false}, allow: sloped})) {
                expect(line.slope.isRelative()).toBe(true)
            }
        })

        it('draws non-integer slopes when true, and by default', () => {
            for (const config of [{slope: {fraction: true}}, undefined]) {
                expect(draw(drawsToSee(0.5), {...config, allow: sloped}).some(l => !l.slope.isRelative())).toBe(true)
            }
        })

        it('forwards the coefficient configuration', () => {
            for (const line of draw(draws(200), {slope: {fraction: {max: 3}}, allow: sloped})) {
                const slope = line.slope.clone().reduce()
                expect(Math.abs(slope.numerator)).toBeLessThanOrEqual(3)
                expect(slope.denominator).toBeLessThanOrEqual(3)
            }
        })

        it('lets the kind of line decide the sign, whatever the coefficient configuration says', () => {
            const config: RandomGeometryLineConfig = {
                slope: {fraction: {allow: {positive: false, zero: true}}},
                allow: {vertical: false, horizontal: false, negative: false},
            }
            for (const line of draw(draws(100), config)) {
                expect(kindOf(line)).toBe('positive')
            }
        })

        it('throws on an invalid fraction option', () => {
            expect(() => rndLine({slope: {fraction: 'yes'}} as never)).toThrow(InvalidArgumentError)
        })
    })

    describe('allow', () => {
        it.each<Kind>(['vertical', 'horizontal', 'positive', 'negative'])('never draws a %s line when false', (kind) => {
            expect(kinds(draw(draws(1000), {allow: {[kind]: false}})).has(kind)).toBe(false)
        })

        it('always draws the requested kind when its probability is 1', () => {
            for (const kind of ['vertical', 'horizontal', 'positive', 'negative'] as Kind[]) {
                expect(kinds(draw(draws(200), {allow: {[kind]: 1}}))).toEqual(new Set([kind]))
            }
        })

        it('draws only vertical and horizontal lines when both slope signs are excluded', () => {
            expect(kinds(draw(drawsToSeeAll(2), {allow: {positive: false, negative: false}}))).toEqual(new Set(['vertical', 'horizontal']))
        })

        it('always draws a strictly positive slope when everything else is excluded', () => {
            expect(kinds(draw(draws(300), {allow: {vertical: false, horizontal: false, negative: false}}))).toEqual(new Set(['positive']))
        })

        it('uses a number as the probability of the kind', () => {
            const count = draws(2000)
            const verticals = draw(count, {allow: {vertical: 0.5}}).filter(l => l.isVertical()).length / count
            // 7 standard deviations of a proportion of 0.5, whatever the number of draws
            const tolerance = 7 * Math.sqrt(0.25 / count)
            expect(verticals).toBeGreaterThan(0.5 - tolerance)
            expect(verticals).toBeLessThan(0.5 + tolerance)
        })

        it('keeps the other kinds when a probability leaves room for them', () => {
            // vertical 0.5, horizontal 5 %, the rest shared by the slope signs: the rarest kind has probability 5 %
            expect(kinds(draw(drawsToSee(0.05, {outcomes: 4}), {allow: {vertical: 0.5}}))).toEqual(new Set(['vertical', 'horizontal', 'positive', 'negative']))
        })

        it('normalizes probabilities that exceed 1 and leaves nothing to the other kinds', () => {
            expect(kinds(draw(drawsToSeeAll(2), {allow: {vertical: 1, horizontal: 1}}))).toEqual(new Set(['vertical', 'horizontal']))
        })

        it('treats a probability of 0 like false', () => {
            expect(kinds(draw(draws(1000), {allow: {vertical: 0}})).has('vertical')).toBe(false)
        })

        it.each([2, -0.1, NaN, 'yes'])('throws on the invalid entry %j', (value) => {
            expect(() => rndLine({allow: {vertical: value}} as never)).toThrow(InvalidArgumentError)
        })

        it('throws when every kind is excluded', () => {
            expect(() => rndLine({allow: {vertical: false, horizontal: false, positive: false, negative: false}}))
                .toThrow(InvalidArgumentError)
        })
    })
})
