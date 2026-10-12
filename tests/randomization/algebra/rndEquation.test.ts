import { describe, expect, it } from "vitest"
import { rndEquation } from "../../../src/randomization/algebra/rndEquation"
import { InvalidArgumentError } from "../../../src/errors"
import {draws, drawsToSee, drawsToSeeAll} from "../../helpers/draws"

describe('rndEquation', () => {
    it('rejects the former solution.integer option and names its replacement', () => {
        expect(() => rndEquation({ degree: 2, solution: { count: 2, integer: true } } as never)).toThrow(/solution\.relative/)
    })

    it('default: produces a degree-1 equation', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(rndEquation().degree().value).toBe(1)
        }
    })

    it('factorable: produces the correct degree', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(rndEquation({ degree: 3, factorable: true }).degree().value).toBe(3)
        }
    })

    it('solution.count:2 degree 2: two distinct real solutions', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(rndEquation({ degree: 2, solution: { count: 2 } }).solve().length).toBe(2)
        }
    })

    it('solution.count:1 degree 2: one double-root solution', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(rndEquation({ degree: 2, solution: { count: 1 } }).solve().length).toBe(1)
        }
    })

    it('solution.count:0 degree 2: no real solutions', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(rndEquation({ degree: 2, solution: { count: 0 } }).solve().length).toBe(0)
        }
    })

    it('solution.count:1 degree 3: one real solution (linear × irreducible quadratic)', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(rndEquation({ degree: 3, solution: { count: 1 } }).solve().length).toBe(1)
        }
    })

    it('solution.count:2 degree 3: two distinct solutions (one doubled root)', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(rndEquation({ degree: 3, solution: { count: 2 } }).solve().length).toBe(2)
        }
    })

    it('solution.count:3 degree 3: three distinct solutions', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(rndEquation({ degree: 3, solution: { count: 3 } }).solve().length).toBe(3)
        }
    })

    it('solution.count:2 degree 4: two distinct real solutions', () => {
        for (let i = 0; i < draws(20); i++) {
            expect(rndEquation({ degree: 4, solution: { count: 2 } }).solve().length).toBe(2)
        }
    })

    it('solution.everything: both sides are identical', () => {
        for (let i = 0; i < draws(20); i++) {
            const eq = rndEquation({ solution: { everything: true } })
            expect(eq.left.tex).toBe(eq.right.tex)
        }
    })

    it('solution.nothing: sides differ by a constant', () => {
        for (let i = 0; i < draws(20); i++) {
            const eq = rndEquation({ solution: { nothing: true } })
            expect(eq.left.tex).not.toBe(eq.right.tex)
        }
    })

    it('solution.nothing with fraction:true: sides still differ', () => {
        for (let i = 0; i < draws(20); i++) {
            const eq = rndEquation({ solution: { nothing: true }, fraction: true })
            expect(eq.left.tex).not.toBe(eq.right.tex)
        }
    })

    it('shuffle: right side is non-trivial', () => {
        for (let i = 0; i < draws(20); i++) {
            const eq = rndEquation({ shuffle: true })
            expect(eq.right.degree().value).toBeGreaterThanOrEqual(1)
        }
    })

    it('shuffle combined with nothing: right side is non-trivial and no real solution', () => {
        for (let i = 0; i < draws(20); i++) {
            const eq = rndEquation({ solution: { nothing: true }, shuffle: true })
            expect(eq.right.degree().value).toBeGreaterThanOrEqual(1)
            expect(eq.left.tex).not.toBe(eq.right.tex)
            expect(eq.solve().length).toBe(0)
        }
    })

    it('shuffle combined with everything: both sides remain identical after shuffle', () => {
        for (let i = 0; i < draws(20); i++) {
            const eq = rndEquation({ solution: { everything: true }, shuffle: true })
            expect(eq.left.tex).toBe(eq.right.tex)
            expect(eq.right.degree().value).toBeGreaterThanOrEqual(1)
        }
    })

    it('solution.allowZero:false: x=0 is not a solution', () => {
        for (let i = 0; i < draws(30); i++) {
            const eq = rndEquation({ degree: 2, solution: { count: 2, allowZero: false } })
            expect(eq.solve().every(s => s.tex !== '0')).toBe(true)
        }
    })

    it('solution.relative:true: solutions have no fractional part', () => {
        for (let i = 0; i < draws(20); i++) {
            const eq = rndEquation({ degree: 2, solution: { count: 2, relative: true } })
            expect(eq.solve().every(s => !s.display.includes('/'))).toBe(true)
        }
    })

    it('produces solutions that are all exact for a quadratic without constraints', () => {
        for (let i = 0; i < draws(30); i++) {
            const eq = rndEquation({
                degree: 2,
                unit: true,
                fraction: false,
                solution: { allowZero: true, nothing: false, everything: false }
            })
            expect(eq.degree().value).toBe(2)
            eq.solve().forEach(sol => { expect(sol.exact).toBe(true) })
        }
    })

    it('produces a constant equation "c = 0" when degree is 0', () => {
        for (let i = 0; i < draws(20); i++) {
            const eq = rndEquation({ degree: 0 })
            expect(eq.degree().value).toBe(0)
            expect(eq.right.isZero()).toBe(true)
        }
    })

    describe('options', () => {
        const draw = (count: number, config?: Parameters<typeof rndEquation>[0]) =>
            Array.from({ length: count }, () => rndEquation(config))

        it('uses the requested variable', () => {
            for (const eq of draw(draws(30), { variables: 't', degree: 2 })) {
                expect(eq.variables).toEqual(['t'])
            }
        })

        it('draws integer coefficients by default', () => {
            for (const eq of draw(draws(100), { degree: 2 })) {
                expect(eq.left.monoms.every(m => m.coefficient.isRelative())).toBe(true)
            }
        })

        it('draws non-integer coefficients when fraction is true', () => {
            expect(draw(drawsToSee(0.5), { fraction: true }).some(eq => eq.left.monoms.some(m => !m.coefficient.isRelative()))).toBe(true)
        })

        it('forces a leading coefficient of 1 with unit', () => {
            for (const eq of draw(draws(100), { degree: 2, unit: true })) {
                expect(eq.left.monomByDegree().coefficient.isOne()).toBe(true)
            }
        })

        it('does not force the leading coefficient by default', () => {
            expect(draw(drawsToSee(0.8), { degree: 2 }).some(eq => !eq.left.monomByDegree().coefficient.isOne())).toBe(true)
        })

        it('keeps a positive leading coefficient by default', () => {
            for (const eq of draw(draws(100), { degree: 2 })) {
                expect(eq.left.monomByDegree().coefficient.isNegative()).toBe(false)
            }
        })

        it('produces both signs of leading coefficient when allow.negativeLeading is true', () => {
            const signs = draw(drawsToSeeAll(2), { allow: { negativeLeading: true } }).map(eq => eq.left.monomByDegree().coefficient.isNegative())
            expect(signs).toContain(true)
            expect(signs).toContain(false)
        })

        it('allows 0 as a solution by default (solution.allowZero is true)', () => {
            // each root is 0 with probability 1/21: an equation with two roots has a zero root with probability >= 0.09
            const zeros = draw(drawsToSee(0.09), { degree: 2, solution: { count: 2 } }).filter(eq => eq.solve().some(s => s.display === '0'))
            expect(zeros.length).toBeGreaterThan(0)
        })

        it('produces fractional solutions when solution.relative is false', () => {
            const fractional = draw(drawsToSee(0.5), { degree: 2, solution: { count: 2 } }).filter(eq => eq.solve().some(s => s.display.includes('/')))
            expect(fractional.length).toBeGreaterThan(0)
        })
    })

    it('throws when degree is negative', () => {
        expect(() => rndEquation({ degree: -1 })).toThrow(InvalidArgumentError)
    })

    it('throws when degree is not an integer', () => {
        expect(() => rndEquation({ degree: 1.5 })).toThrow(InvalidArgumentError)
    })

    it('throws for solution.count:0 with odd degree', () => {
        expect(() => rndEquation({ degree: 3, solution: { count: 0 } })).toThrow(InvalidArgumentError)
    })

    it('throws for solution.count greater than degree', () => {
        expect(() => rndEquation({ degree: 2, solution: { count: 3 } })).toThrow(InvalidArgumentError)
    })

    it('does not mutate defaults across calls', () => {
        for (let i = 0; i < draws(20); i++) {
            rndEquation({ degree: 3, solution: { count: 2, relative: true }, factorable: true })
        }
        for (let i = 0; i < draws(20); i++) {
            expect(rndEquation().degree().value).toBe(1)
        }
    })

    it('nothing:1 behaves like nothing:true', () => {
        for (let i = 0; i < draws(20); i++) {
            const eq = rndEquation({ solution: { nothing: 1 } })
            expect(eq.left.tex).not.toBe(eq.right.tex)
        }
    })

    it.each([2, -0.1, NaN, 'yes'])('rejects the invalid probability solution.nothing: %j', (nothing) => {
        expect(() => rndEquation({ solution: { nothing } } as never)).toThrow(/solution\.nothing/)
    })

    it.each([1.5, -1, NaN, null])('rejects the invalid probability solution.everything: %j', (everything) => {
        expect(() => rndEquation({ solution: { everything } } as never)).toThrow(/solution\.everything/)
    })

    it('accepts a boolean or a probability for solution.nothing and solution.everything', () => {
        for (const value of [true, false, 0, 0.5, 1]) {
            expect(() => rndEquation({ solution: { nothing: value } })).not.toThrow()
            expect(() => rndEquation({ solution: { everything: value } })).not.toThrow()
        }
    })

    it.each([-1, 1.5, NaN, '2'])('rejects the invalid degree %j', (degree) => {
        expect(() => rndEquation({ degree } as never)).toThrow(InvalidArgumentError)
    })

    it.each(['', 'X', 'x1', 'x y', 5, null])('rejects the invalid variables %j', (variables) => {
        expect(() => rndEquation({ variables } as never)).toThrow(InvalidArgumentError)
    })

    it('rejects several variables with factorable or solution.count, whatever mode the draw picks', () => {
        for (let i = 0; i < draws(60); i++) {
            expect(() => rndEquation({ variables: 'xy', factorable: true, solution: { nothing: 0.5 } })).toThrow(/single variable/)
            expect(() => rndEquation({ variables: 'xy', solution: { count: 1, everything: 0.5 } })).toThrow(/single variable/)
        }
    })

    it('accepts several variables, or a repeated one, when the equation is not factored', () => {
        expect(() => rndEquation({ variables: 'xy', degree: 2 })).not.toThrow()
        expect(() => rndEquation({ variables: 'xx', factorable: true, degree: 2 })).not.toThrow()
    })

    it('nothing:0 and everything:0 never produce degenerate equations', () => {
        for (let i = 0; i < draws(30); i++) {
            const eq = rndEquation({ solution: { nothing: 0, everything: 0 } })
            expect(eq.right.degree().value).toBe(0)  // right side is 0 (P = 0 form)
        }
    })

    it('allow.commonFactor:false produces a primitive polynomial (factorable)', () => {
        for (let i = 0; i < draws(20); i++) {
            const eq = rndEquation({ degree: 4, solution: { count: 2 }, allow: { commonFactor: false } })
            expect(eq.left.gcdNumerator()).toBe(1)
        }
    })

    it('nothing:0.5 and everything:0.5 — both cases appear over many runs', () => {
        let nothingCount = 0
        let everythingCount = 0
        const runs = drawsToSeeAll(2)
        for (let i = 0; i < runs; i++) {
            const eq = rndEquation({ solution: { nothing: 0.5, everything: 0.5 } })
            if (eq.left.tex === eq.right.tex) everythingCount++
            else nothingCount++
        }
        // sum=1 → normalized 50/50, never 'normal'. Both must appear.
        expect(nothingCount).toBeGreaterThan(0)
        expect(everythingCount).toBeGreaterThan(0)
        // verify normal mode never occurs (right side always 0 or equal left)
        expect(nothingCount + everythingCount).toBe(runs)
    })

    describe('solution.range', () => {
        const roots = (eq: ReturnType<typeof rndEquation>) => eq.solve().map(s => s.fraction.value)

        it('keeps integer solutions in the range, 5 by default', () => {
            for (let i = 0; i < draws(60); i++) {
                const eq = rndEquation({ degree: 2, solution: { count: 2, relative: true } })
                expect(roots(eq).every(x => Math.abs(x) <= 5)).toBe(true)
                const narrow = rndEquation({ degree: 2, solution: { count: 2, relative: true, range: { min: 2, max: 9 } } })
                expect(roots(narrow).every(x => x >= 2 && x <= 9)).toBe(true)
            }
        })

        it('keeps fractional solutions in the range', () => {
            for (let i = 0; i < draws(60); i++) {
                const eq = rndEquation({ degree: 2, solution: { count: 2, range: 2 } })
                expect(roots(eq).every(x => Math.abs(x) <= 2)).toBe(true)
            }
        })

        it('draws the whole range of integer solutions', () => {
            const seen = new Set<number>()
            for (let i = 0; i < Math.max(draws(100), drawsToSee(0.15, { outcomes: 5 })); i++) {
                roots(rndEquation({ degree: 1, solution: { count: 1, relative: true, range: 2 } })).forEach(x => seen.add(x))
            }
            expect(seen).toEqual(new Set([-2, -1, 0, 1, 2]))
        })

        it('respects allowZero: false inside a range that holds 0', () => {
            for (let i = 0; i < draws(60); i++) {
                expect(roots(rndEquation({ degree: 1, solution: { count: 1, relative: true, range: 1, allowZero: false } }))
                    .every(x => x === 1 || x === -1)).toBe(true)
            }
        })

        it('keeps the constant of nothing in the range, and non-zero', () => {
            for (let i = 0; i < draws(60); i++) {
                const eq = rndEquation({ degree: 1, solution: { nothing: 1, range: { min: 2, max: 4 } } })
                const offset = eq.left.clone().subtract(eq.right).monomByDegree(0).coefficient.value
                expect(offset).toBeGreaterThanOrEqual(2)
                expect(offset).toBeLessThanOrEqual(4)
            }
        })

        it('throws on every call when nothing can be drawn and the range only holds 0', () => {
            for (let i = 0; i < draws(40); i++) {
                expect(() => rndEquation({ solution: { nothing: 0.5, range: 0 } })).toThrow(InvalidArgumentError)
            }
            expect(() => rndEquation({ solution: { range: 0 } })).not.toThrow()
        })

        it.each([NaN, Infinity, { min: 3, max: 1 }, 'ten', null])('throws on the invalid range %j', (range) => {
            expect(() => rndEquation({ solution: { range } } as never)).toThrow(InvalidArgumentError)
        })
    })
})
