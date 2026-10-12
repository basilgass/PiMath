import {afterEach, describe, expect, it, vi} from "vitest"
import {drawKind, kindWeights, pickKind, validateKinds} from "../../src/randomization/rndKinds"
import {InvalidArgumentError} from "../../src/errors"
import {draws} from "../helpers/draws"

const LINE = ['vertical', 'horizontal', 'positive', 'negative'] as const
const LINE_SPECIAL = {vertical: 0.05, horizontal: 0.05}

const LINE3 = ['general', 'parallelXY', 'parallelXZ', 'parallelYZ', 'parallelX', 'parallelY', 'parallelZ'] as const
const LINE3_SPECIAL = {parallelXY: 0.05, parallelXZ: 0.05, parallelYZ: 0.05, parallelX: 0.02, parallelY: 0.02, parallelZ: 0.02}

const allTrue = <K extends string>(kinds: readonly K[]) => Object.fromEntries(kinds.map(k => [k, true])) as Record<K, boolean | number>

afterEach(() => {
    vi.restoreAllMocks()
})

describe('rndKinds', () => {
    describe('validateKinds', () => {
        it.each([true, false, 0, 0.5, 1])('accepts %j', (value) => {
            expect(() => { validateKinds(LINE, {...allTrue(LINE), vertical: value}) }).not.toThrow()
        })

        it.each([-0.1, 1.1, NaN, Infinity, 'yes', null, undefined])('rejects %j and names the kind', (value) => {
            const check = () => { validateKinds(LINE, {...allTrue(LINE), horizontal: value as never}) }
            expect(check).toThrow(InvalidArgumentError)
            expect(check).toThrow(/allow\.horizontal/)
        })
    })

    describe('validateKinds path', () => {
        it('names the object that holds the entries in the message', () => {
            expect(() => { validateKinds(['a'], { a: 2 }, 'solution') }).toThrow(/solution\.a must be/)
            expect(() => { validateKinds(['a'], { a: 2 }) }).toThrow(/allow\.a must be/)
        })
    })

    describe('kindWeights', () => {
        it('gives rndLine its default weights: 5 % for each special kind, the rest shared by the others', () => {
            const weights = kindWeights(LINE, allTrue(LINE), LINE_SPECIAL)
            expect(weights.vertical).toBeCloseTo(0.05)
            expect(weights.horizontal).toBeCloseTo(0.05)
            expect(weights.positive).toBeCloseTo(0.45)
            expect(weights.negative).toBeCloseTo(0.45)
        })

        it('gives rndLine3 its default weights: 5 % per plane, 2 % per axis, the rest to the general kind', () => {
            const weights = kindWeights(LINE3, allTrue(LINE3), LINE3_SPECIAL)
            for (const kind of ['parallelXY', 'parallelXZ', 'parallelYZ'] as const) expect(weights[kind]).toBeCloseTo(0.05)
            for (const kind of ['parallelX', 'parallelY', 'parallelZ'] as const) expect(weights[kind]).toBeCloseTo(0.02)
            expect(weights.general).toBeCloseTo(0.79)
        })

        it('lets an explicit number take precedence over true', () => {
            const weights = kindWeights(LINE, {...allTrue(LINE), vertical: 0.5}, LINE_SPECIAL)
            expect(weights.vertical).toBe(0.5)
            expect(weights.horizontal).toBeCloseTo(0.05)
            expect(weights.positive).toBeCloseTo(0.225)
            expect(weights.negative).toBeCloseTo(0.225)
        })

        it('drops every true once the explicit probabilities reach 1', () => {
            const weights = kindWeights(LINE, {vertical: 1, horizontal: true, positive: true, negative: false}, LINE_SPECIAL)
            expect(weights).toEqual({vertical: 1, horizontal: 0, positive: 0, negative: 0})
        })

        it('keeps explicit probabilities that exceed 1 in total, for the caller to normalize', () => {
            const weights = kindWeights(LINE, {vertical: 0.8, horizontal: 0.8, positive: true, negative: true}, LINE_SPECIAL)
            expect(weights).toEqual({vertical: 0.8, horizontal: 0.8, positive: 0, negative: 0})
        })

        it('gives the special kinds their fixed probability when no flexible kind remains', () => {
            const weights = kindWeights(LINE, {vertical: true, horizontal: true, positive: false, negative: false}, LINE_SPECIAL)
            expect(weights).toEqual({vertical: 0.05, horizontal: 0.05, positive: 0, negative: 0})
        })

        it('shrinks the special kinds when they would leave nothing to the flexible ones', () => {
            // 0.9 explicit leaves 0.1; the two specials ask for 0.1 together, so they keep 0.05 each and positive gets 0.
            const weights = kindWeights(LINE, {vertical: true, horizontal: true, positive: true, negative: 0.9}, LINE_SPECIAL)
            expect(weights.negative).toBe(0.9)
            expect(weights.vertical + weights.horizontal + weights.positive).toBeCloseTo(0.1)

            const crowded = kindWeights(LINE, {vertical: true, horizontal: true, positive: true, negative: 0.97}, LINE_SPECIAL)
            expect(crowded.vertical + crowded.horizontal + crowded.positive).toBeCloseTo(0.03)
            expect(crowded.vertical).toBeCloseTo(crowded.horizontal)
        })

        it('gives a zero weight to every kind set to false, and to all of them when all are false', () => {
            const none = Object.fromEntries(LINE.map(k => [k, false])) as Record<typeof LINE[number], boolean>
            expect(kindWeights(LINE, none, LINE_SPECIAL)).toEqual({vertical: 0, horizontal: 0, positive: 0, negative: 0})

            const weights = kindWeights(LINE, {...allTrue(LINE), positive: false}, LINE_SPECIAL)
            expect(weights.positive).toBe(0)
            expect(weights.negative).toBeCloseTo(0.9)
        })
    })

    describe('pickKind', () => {
        const kinds = ['a', 'b', 'c'] as const

        const pickWith = (random: number, weights: Record<typeof kinds[number], number>) => {
            vi.spyOn(Math, 'random').mockReturnValue(random)
            return pickKind(kinds, weights)
        }

        it('picks in proportion to the weights, through the cumulative sum', () => {
            const weights = {a: 0.25, b: 0.5, c: 0.25}
            expect(pickWith(0, weights)).toBe('a')
            expect(pickWith(0.2, weights)).toBe('a')
            expect(pickWith(0.3, weights)).toBe('b')
            expect(pickWith(0.7, weights)).toBe('b')
            expect(pickWith(0.8, weights)).toBe('c')
            expect(pickWith(0.999, weights)).toBe('c')
        })

        it('puts the boundary between two kinds in the second one', () => {
            expect(pickWith(0.25, {a: 0.25, b: 0.5, c: 0.25})).toBe('b')
            expect(pickWith(0.75, {a: 0.25, b: 0.5, c: 0.25})).toBe('c')
        })

        it('normalizes weights that do not add up to 1', () => {
            expect(pickWith(0.4, {a: 1, b: 1, c: 0})).toBe('a')
            expect(pickWith(0.6, {a: 1, b: 1, c: 0})).toBe('b')
        })

        it('skips the kinds of zero weight, whatever the random value', () => {
            expect(pickWith(0, {a: 0, b: 1, c: 0})).toBe('b')
            expect(pickWith(0.999, {a: 0, b: 1, c: 0})).toBe('b')
        })

        it('falls back on the last drawable kind when the random value outruns the sum', () => {
            expect(pickWith(1, {a: 0.5, b: 0.5, c: 0})).toBe('b')
        })

        it('throws when every weight is zero', () => {
            expect(() => pickKind(kinds, {a: 0, b: 0, c: 0})).toThrow(InvalidArgumentError)
        })
    })

    describe('drawKind', () => {
        it('chains the weights and the draw: a kind set to false is never drawn', () => {
            const allow = {...allTrue(LINE), vertical: false, positive: false}
            for (let i = 0; i < draws(500); i++) {
                expect(['horizontal', 'negative']).toContain(drawKind(LINE, allow, LINE_SPECIAL))
            }
        })

        it('always draws the only kind with a probability of 1', () => {
            for (let i = 0; i < draws(50); i++) {
                expect(drawKind(LINE3, {...allTrue(LINE3), parallelZ: 1}, LINE3_SPECIAL)).toBe('parallelZ')
            }
        })

        it('uses the weights of kindWeights', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0.97)
            // vertical 0.05, horizontal 0.05, positive 0.45, negative 0.45: 0.97 falls in the last one.
            expect(drawKind(LINE, allTrue(LINE), LINE_SPECIAL)).toBe('negative')
        })

        it('throws when allow excludes every kind', () => {
            const none = Object.fromEntries(LINE.map(k => [k, false])) as Record<typeof LINE[number], boolean>
            expect(() => drawKind(LINE, none, LINE_SPECIAL)).toThrow(InvalidArgumentError)
        })
    })
})
