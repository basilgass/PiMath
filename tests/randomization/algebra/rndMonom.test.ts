import {describe, expect, it} from "vitest"
import {rndMonom} from "../../../src/randomization/algebra/rndMonom"
import {InvalidArgumentError} from "../../../src/errors"
import type {Monom} from "../../../src/algebra/monom"
import {draws, drawsToSee, drawsToSeeAll} from "../../helpers/draws"

// The number of draws follows the test mode (see tests/helpers/draws.ts): `draws(n)` for properties that hold
// for every draw, `drawsToSee(p)` for outcomes that must appear at least once (p: probability of the outcome).
function draw(count: number, config?: Parameters<typeof rndMonom>[0]): Monom[] {
    return Array.from({length: count}, () => rndMonom(config))
}

describe('rndMonom', () => {
    it('never produces a zero coefficient when allow.zero is false', () => {
        for (let i = 0; i < draws(100); i++) {
            expect(rndMonom({ allow: { zero: false } }).coefficient.value).not.toBe(0)
        }
    })

    it('never produces a zero coefficient by default', () => {
        for (const M of draw(draws(300))) {
            expect(M.coefficient.isZero()).toBe(false)
        }
    })

    it('can produce a zero coefficient when allow.zero is true', () => {
        // zero has probability 1/21 per draw
        expect(draw(drawsToSee(1 / 21), {fraction: false, allow: {zero: true}}).some(M => M.coefficient.isZero())).toBe(true)
    })

    it('produces the correct degree for a single variable', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(rndMonom({ variables: 'x', degree: 3 }).degree('x').value).toBe(3)
        }
    })

    it('produces a constant monom when degree is 0', () => {
        for (const M of draw(draws(50), {degree: 0})) {
            expect(M.degree().value).toBe(0)
            expect(M.coefficient.isZero()).toBe(false)
        }
    })

    it('distributes total degree correctly across multiple variables', () => {
        for (let i = 0; i < draws(50); i++) {
            expect(rndMonom({ variables: 'xy', degree: 3 }).degree().value).toBe(3)
        }
    })

    it('uses only the requested variables and spreads the degree over them', () => {
        const used = new Set<string>()
        for (const M of draw(Math.max(draws(300), drawsToSeeAll(3)), {variables: 'xyz', degree: 5})) {
            const total = ['x', 'y', 'z'].reduce((sum, v) => sum + M.degree(v).value, 0)
            expect(total).toBe(5)
            M.variables.forEach(v => used.add(v))
        }
        expect([...used].sort()).toEqual(['x', 'y', 'z'])
    })

    it('uses the requested variable name', () => {
        for (const M of draw(draws(30), {variables: 't', degree: 3})) {
            expect(M.variables).toEqual(['t'])
            expect(M.degree('t').value).toBe(3)
        }
    })

    describe('fraction', () => {
        it('produces an integer coefficient when fraction is false', () => {
            for (let i = 0; i < draws(50); i++) {
                expect(rndMonom({ fraction: false, allow: { zero: false } }).coefficient.denominator).toBe(1)
            }
        })

        it('produces non-integer coefficients when fraction is true', () => {
            expect(draw(drawsToSee(0.9), {fraction: true}).some(M => !M.coefficient.isRelative())).toBe(true)
        })

        it('draws an integer coefficient by default', () => {
            expect(draw(draws(200)).every(M => M.coefficient.isRelative())).toBe(true)
        })

        it('keeps the coefficient in the range of the coefficient configuration', () => {
            for (const M of draw(draws(100), {fraction: {range: {min: 2, max: 4}}})) {
                expect(M.coefficient.value).toBeGreaterThanOrEqual(2)
                expect(M.coefficient.value).toBeLessThanOrEqual(4)
            }
        })

        it('forwards the coefficient configuration when an object is given', () => {
            for (const M of draw(draws(100), {fraction: {max: 3}})) {
                expect(Math.abs(M.coefficient.numerator)).toBeLessThanOrEqual(3)
                expect(M.coefficient.denominator).toBeLessThanOrEqual(3)
            }
        })

        it('respects allow.positive: false passed via fraction config', () => {
            for (const M of draw(draws(100), {fraction: {allow: {positive: false, zero: false}}})) {
                expect(M.coefficient.value).toBeLessThan(0)
            }
        })

        it('respects allow.negative: false passed via fraction config', () => {
            for (let i = 0; i < draws(100); i++) {
                const m = rndMonom({ fraction: { allow: { negative: false, zero: false } } })
                expect(m.coefficient.value).toBeGreaterThan(0)
            }
        })
    })

    it('does not mutate defaults across calls', () => {
        for (let i = 0; i < draws(20); i++) {
            rndMonom({ variables: 'xyz', degree: 4, fraction: false })
        }
        for (let i = 0; i < draws(20); i++) {
            expect(rndMonom().degree('x').value).toBe(2)
        }
    })

    it('deduplicates repeated letters in variables', () => {
        for (let i = 0; i < draws(20); i++) {
            const m = rndMonom({ variables: 'xx', degree: 2 })
            expect(m.degree('x').value).toBe(2)
        }
    })

    it.each(['X', 'x1', 'x y', 5, null])('throws on the invalid variables %j', (variables) => {
        expect(() => rndMonom({ variables } as never)).toThrow(InvalidArgumentError)
    })

    it.each([-1, 1.5, NaN, '2'])('throws on the invalid degree %j', (degree) => {
        expect(() => rndMonom({ degree } as never)).toThrow(InvalidArgumentError)
    })

    it('throws when variables is empty', () => {
        expect(() => rndMonom({ variables: '' })).toThrow(InvalidArgumentError)
    })

    it('throws when degree is negative', () => {
        expect(() => rndMonom({ degree: -1 })).toThrow(InvalidArgumentError)
    })

    it('throws when degree is not an integer', () => {
        expect(() => rndMonom({ degree: 1.5 })).toThrow(InvalidArgumentError)
    })
})
