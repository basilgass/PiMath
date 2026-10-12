import {describe, expect, it} from "vitest"
import {rndPolynom} from "../../../src/randomization/algebra/rndPolynom"
import {InvalidArgumentError} from "../../../src/errors"
import {solvePolynom} from "../../../src/algebra/polynomRoots"
import type {Polynom} from "../../../src/algebra/polynom"
import {draws, drawsToSee, drawsToSeeAll} from "../../helpers/draws"

// The number of draws follows the test mode (see tests/helpers/draws.ts): `draws(n)` for properties that hold
// for every draw, `drawsToSee(p)` for outcomes that must appear at least once (p: probability of the outcome).
function draw(count: number, config?: Parameters<typeof rndPolynom>[0]): Polynom[] {
    return Array.from({length: count}, () => rndPolynom(config))
}

describe('rndPolynom', () => {
    it('produces the correct degree', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(rndPolynom({ degree: 3 }).degree().value).toBe(3)
        }
    })

    it('produces a non-zero constant when degree is 0', () => {
        for (const P of draw(draws(50), {degree: 0})) {
            expect(P.degree().value).toBe(0)
            expect(P.isZero()).toBe(false)
        }
    })

    it('produces all terms when nullMonom is false', () => {
        for (let i = 0; i < draws(30); i++) {
            const P = rndPolynom({ degree: 3, allow: { nullMonom: false } })
            expect(P.length).toBe(4)
        }
    })

    it('can omit non-leading terms by default (allow.nullMonom is true)', () => {
        // a non-leading coefficient is zero with probability 1/21: a degree 3 polynom misses a term with probability >= 0.13
        expect(draw(drawsToSee(0.13), {degree: 3}).some(P => P.length < 4)).toBe(true)
    })

    it('never produces a negative leading coefficient by default', () => {
        for (let i = 0; i < draws(100); i++) {
            expect(rndPolynom().monomByDegree().coefficient.isNegative()).toBe(false)
        }
    })

    it('produces both signs of leading coefficient when allow.negativeLeading is true', () => {
        const signs = draw(drawsToSeeAll(2), {allow: {negativeLeading: true}}).map(P => P.monomByDegree().coefficient.isNegative())
        expect(signs).toContain(true)
        expect(signs).toContain(false)
    })

    it('limits the number of monomials and preserves degree', () => {
        for (let i = 0; i < draws(30); i++) {
            const P = rndPolynom({ degree: 5, numberOfMonoms: 3, allow: { nullMonom: false } })
            expect(P.length).toBe(3)
            expect(P.degree().value).toBe(5)
        }
    })

    it('ignores numberOfMonoms when the polynom already has fewer terms', () => {
        for (const P of draw(draws(30), {degree: 2, numberOfMonoms: 5, allow: {nullMonom: false}})) {
            expect(P.length).toBe(3)
        }
    })

    it('produces a primitive polynomial when allow.commonFactor is false', () => {
        for (let i = 0; i < draws(50); i++) {
            const P = rndPolynom({ allow: { commonFactor: false } })
            expect(Math.abs(P.gcdNumerator())).toBe(1)
        }
    })

    it('can produce a common factor by default (allow.commonFactor is true)', () => {
        expect(draw(drawsToSee(0.3), {degree: 1}).some(P => Math.abs(P.gcdNumerator()) > 1)).toBe(true)
    })

    describe('unit', () => {
        it('forces a leading coefficient of 1', () => {
            for (const P of draw(draws(100), {unit: true})) {
                expect(P.monomByDegree().coefficient.isOne()).toBe(true)
            }
        })

        it('forces a leading coefficient of 1 with fractions too', () => {
            for (const P of draw(draws(100), {unit: true, fraction: true})) {
                expect(P.monomByDegree().coefficient.isOne()).toBe(true)
            }
        })

        it('does not force the leading coefficient by default', () => {
            expect(draw(drawsToSee(0.8)).some(P => !P.monomByDegree().coefficient.isOne())).toBe(true)
        })
    })

    describe('fraction', () => {
        it('draws integer coefficients by default and when false', () => {
            for (const config of [undefined, {fraction: false}]) {
                for (const P of draw(draws(100), config)) {
                    expect(P.monoms.every(m => m.coefficient.isRelative())).toBe(true)
                }
            }
        })

        it('draws non-integer coefficients when true', () => {
            expect(draw(drawsToSee(0.5), {fraction: true}).some(P => P.monoms.some(m => !m.coefficient.isRelative()))).toBe(true)
        })

        it('forwards the coefficient configuration when an object is given', () => {
            for (const P of draw(draws(100), {fraction: {max: 3}})) {
                for (const m of P.monoms) {
                    expect(Math.abs(m.coefficient.numerator)).toBeLessThanOrEqual(3)
                    expect(m.coefficient.denominator).toBeLessThanOrEqual(3)
                }
            }
        })
    })

    describe('invalid configuration', () => {
        it.each([-1, 1.5, NaN, '2'])('throws on the invalid degree %j', (degree) => {
            expect(() => rndPolynom({ degree } as never)).toThrow(InvalidArgumentError)
        })

        it.each(['', 'X', 'x1', 'x y', 5, null])('throws on the invalid variables %j', (variables) => {
            expect(() => rndPolynom({ variables } as never)).toThrow(InvalidArgumentError)
        })

        it('checks the variables of a factorable polynom too', () => {
            expect(() => rndPolynom({ factorable: true, variables: 'X' })).toThrow(InvalidArgumentError)
        })
    })

    describe('variables', () => {
        it('uses only the requested variable', () => {
            for (const P of draw(draws(50), {variables: 't'})) {
                expect(P.variables).toEqual(['t'])
            }
        })

        it('uses only the requested variables, and all of them over many draws', () => {
            const used = new Set<string>()
            for (const P of draw(Math.max(draws(200), drawsToSeeAll(2)), {variables: 'xy', degree: 2})) {
                for (const v of P.variables) {
                    expect(['x', 'y']).toContain(v)
                    used.add(v)
                }
            }
            expect([...used].sort()).toEqual(['x', 'y'])
        })
    })

    describe('factorable', () => {
        // unit: true keeps the linear factors monic, so that no extra constant factor is extracted.
        it('produces the correct degree', () => {
            for (let i = 0; i < draws(20); i++) {
                expect(rndPolynom({ factorable: true, degree: 3 }).degree().value).toBe(3)
            }
        })

        it('has coefficients with no common divisor when allow.commonFactor is false, and no constant factor', () => {
            for (const degree of [1, 2, 3, 4]) {
                for (const commonConstant of [undefined, false]) {
                    for (const P of draw(draws(40), {factorable: true, degree, commonConstant, allow: {commonFactor: false}})) {
                        expect(P.gcdNumerator()).toBe(1)
                        expect(P.degree().value).toBe(degree)
                    }
                }
            }
        })

        it('can still have a common divisor when allow.commonFactor is true, the default', () => {
            const polynoms = draw(Math.max(draws(100), drawsToSee(0.8)), {factorable: true, degree: 2, commonConstant: true})
            expect(polynoms.some(P => P.gcdNumerator() > 1)).toBe(true)
        })

        it('throws on every call when commonConstant: true contradicts allow.commonFactor: false', () => {
            for (let i = 0; i < draws(40); i++) {
                expect(() => rndPolynom({factorable: true, commonConstant: true, allow: {commonFactor: false}}))
                    .toThrow(InvalidArgumentError)
            }
            // Without factorable, commonConstant is not read.
            expect(() => rndPolynom({commonConstant: true, allow: {commonFactor: false}})).not.toThrow()
        })

        it('keeps the polynom factorable when the content is divided out', () => {
            for (const P of draw(draws(40), {factorable: true, degree: 3, unit: true, allow: {commonFactor: false}})) {
                const roots = solvePolynom(P.getCoefficients().reverse())
                expect(roots.reduce((n, r) => n + r.multiplicity, 0)).toBe(3)
            }
        })

        // `Polynom.factors` keeps a repeated factor 0 as one block (x^3 + 8x^2 gives [x^2][x+8]),
        // so complete factorability is checked on the roots: their multiplicities must add up to the degree.
        it.each([2, 3, 4])('splits into rational linear factors for degree %i, whatever commonConstant is', (degree) => {
            for (const commonConstant of [false, true, undefined]) {
                for (const P of draw(draws(30), {factorable: true, degree, unit: true, commonConstant})) {
                    const roots = solvePolynom(P.getCoefficients().reverse())
                    expect(roots.every(r => r.exact)).toBe(true)
                    expect(roots.reduce((sum, r) => sum + r.multiplicity, 0)).toBe(degree)
                }
            }
        })

        it('has a leading coefficient of 1 with unit and without common constant', () => {
            for (const P of draw(draws(50), {factorable: true, degree: 2, unit: true, commonConstant: false})) {
                expect(P.monomByDegree().coefficient.isOne()).toBe(true)
            }
        })

        // A constant may merge with a linear factor in `factors` (2x(x-6) gives [2x][x-6]), so the common
        // constant is checked through the leading coefficient, which equals it when every linear factor
        // is monic (unit: true).
        it('multiplies by a constant of absolute value >= 2 when commonConstant is true', () => {
            for (const P of draw(draws(100), {factorable: true, degree: 2, unit: true, commonConstant: true})) {
                expect(P.monomByDegree().coefficient.isRelative()).toBe(true)
                expect(Math.abs(P.monomByDegree().coefficient.value)).toBeGreaterThanOrEqual(2)
            }
        })

        it('sometimes multiplies by a constant and sometimes not when commonConstant is undefined', () => {
            // the constant is skipped only for k = +/-1 (probability 1/10), the rarer of the two outcomes
            const leading = draw(drawsToSee(0.1), {factorable: true, degree: 2, unit: true}).map(P => Math.abs(P.monomByDegree().coefficient.value))
            expect(leading).toContain(1)
            expect(leading.some(c => c >= 2)).toBe(true)
        })
    })

    it('throws when degree is negative', () => {
        expect(() => rndPolynom({ degree: -1 })).toThrow(InvalidArgumentError)
    })

    it('throws when degree is not an integer', () => {
        expect(() => rndPolynom({ degree: 1.5 })).toThrow(InvalidArgumentError)
    })

    it('does not mutate defaults across calls', () => {
        for (let i = 0; i < draws(20); i++) {
            rndPolynom({ allow: { negativeLeading: true, commonFactor: false } })
        }
        for (let i = 0; i < draws(50); i++) {
            expect(rndPolynom().monomByDegree().coefficient.isNegative()).toBe(false)
        }
    })
})
