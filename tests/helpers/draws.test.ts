import {describe, expect, it} from "vitest"
import {createDraws, currentMode} from "./draws"

describe('draws helper', () => {
    const quick = createDraws('quick')
    const normal = createDraws('normal')
    const full = createDraws('full')

    describe('draws', () => {
        it('scales the count by mode', () => {
            expect(quick.draws(100)).toBe(20)
            expect(normal.draws(100)).toBe(100)
            expect(full.draws(100)).toBe(1000)
        })

        it('never goes below a handful of draws, nor above the requested count when it is small', () => {
            expect(quick.draws(20)).toBe(5)
            expect(quick.draws(3)).toBe(3)
            expect(normal.draws(3)).toBe(3)
        })
    })

    describe('drawsToSee', () => {
        it('gives the count for which missing an outcome has the mode risk', () => {
            // ceil(ln(risk) / ln(1 - 1/21))
            expect(quick.drawsToSee(1 / 21)).toBe(284)
            expect(normal.drawsToSee(1 / 21)).toBe(567)
            expect(full.drawsToSee(1 / 21)).toBe(850)
        })

        it('guarantees the announced risk', () => {
            for (const [helper, risk] of [[quick, 1e-6], [normal, 1e-12], [full, 1e-18]] as const) {
                for (const p of [0.5, 0.1, 0.05, 1 / 21]) {
                    expect((1 - p) ** helper.drawsToSee(p)).toBeLessThanOrEqual(risk * 1.0000001)
                }
            }
        })

        it('accepts an explicit risk', () => {
            // ceil(ln(1e-3) / ln(0.5)) = 10
            expect(normal.drawsToSee(0.5, {risk: 1e-3})).toBe(10)
        })

        it('shares the risk between several outcomes', () => {
            expect(normal.drawsToSee(0.5, {outcomes: 2})).toBeGreaterThan(normal.drawsToSee(0.5))
            expect(normal.drawsToSee(0.5, {outcomes: 4})).toBeGreaterThan(normal.drawsToSee(0.5, {outcomes: 2}))
            // the risk of missing any of 3 outcomes stays below the mode risk
            expect(3 * 0.5 ** normal.drawsToSee(0.5, {outcomes: 3})).toBeLessThanOrEqual(1e-12 * 1.0000001)
        })

        it.each([0, -1, 1.5])('rejects the number of outcomes %j', (outcomes) => {
            expect(() => normal.drawsToSee(0.5, {outcomes})).toThrow(RangeError)
        })

        it.each([0, 1, -0.1, 1.5, NaN])('rejects the probability %j', (p) => {
            expect(() => normal.drawsToSee(p)).toThrow(RangeError)
        })
    })

    describe('drawsToSeeAll', () => {
        it('needs more draws than for a single outcome, because of the union bound', () => {
            expect(normal.drawsToSeeAll(6)).toBeGreaterThan(normal.drawsToSee(1 / 6))
        })

        it('guarantees the announced risk for every outcome together', () => {
            for (const k of [2, 6, 25]) {
                expect(k * (1 - 1 / k) ** normal.drawsToSeeAll(k)).toBeLessThanOrEqual(1e-12 * 1.0000001)
            }
        })

        it('needs a single draw for a single outcome', () => {
            expect(normal.drawsToSeeAll(1)).toBe(1)
        })

        it.each([0, -2, 2.5])('rejects the number of outcomes %j', (k) => {
            expect(() => normal.drawsToSeeAll(k)).toThrow(RangeError)
        })
    })

    it('reads the mode from Vitest', () => {
        expect(['quick', 'normal', 'full']).toContain(currentMode())
    })
})
