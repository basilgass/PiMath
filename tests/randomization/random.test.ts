import {describe, expect, it} from "vitest"
import {Random} from "../../src/randomization/random"
import {Fraction} from "../../src/coefficients/fraction"
import {InvalidArgumentError} from "../../src/errors"
import {draws, drawsToSee} from "../helpers/draws"

// The generators and the helpers are tested in depth next to their own file; here we only check that
// the Random facade forwards its configuration, or its arguments, to each of them.
describe('Random facade', () => {
    it('forwards the configuration of Random.fraction', () => {
        for (let i = 0; i < draws(30); i++) {
            expect(Random.fraction({ relative: true }).denominator).toBe(1)
        }
    })

    it('forwards the configuration of Random.monom', () => {
        for (let i = 0; i < draws(30); i++) {
            const M = Random.monom({ variables: 't', degree: 3, fraction: false })
            expect(M.degree('t').value).toBe(3)
            expect(M.coefficient.denominator).toBe(1)
        }
    })

    it('forwards the configuration of Random.polynom', () => {
        for (let i = 0; i < draws(30); i++) {
            const P = Random.polynom({ variables: 't', degree: 3 })
            expect(P.degree().value).toBe(3)
            expect(P.variables).toEqual(['t'])
        }
    })

    it('forwards the configuration of Random.circle', () => {
        for (let i = 0; i < draws(30); i++) {
            expect(Random.circle({ squaredRadius: 13 }).squareRadius.isEqual(new Fraction(13))).toBe(true)
        }
    })

    it('forwards the configuration of Random.line', () => {
        for (let i = 0; i < draws(30); i++) {
            expect(Random.line({ slope: '2/3' }).slope.isEqual(new Fraction(2, 3))).toBe(true)
        }
    })

    it('forwards the configuration of Random.line3', () => {
        for (let i = 0; i < draws(30); i++) {
            const line = Random.line3({ allow: { parallelZ: 1 } })
            expect(line.d.x.isZero() && line.d.y.isZero() && !line.d.z.isZero()).toBe(true)
        }
    })

    it('forwards the configuration of Random.point3', () => {
        for (let i = 0; i < draws(30); i++) {
            const P = Random.point3({ axis: 'z' })
            expect(P.dimension).toBe(3)
            expect(P.x.isZero() && P.y.isZero()).toBe(true)
        }
    })

    it('forwards the configuration of Random.point', () => {
        for (let i = 0; i < draws(30); i++) {
            expect(Random.point({ axis: 'x' }).y.isZero()).toBe(true)
        }
    })

    it('forwards the configuration of Random.vector', () => {
        for (let i = 0; i < draws(30); i++) {
            const v = Random.vector({ axis: 'y', range: 1 })
            expect(v.x.isZero() && !v.y.isZero()).toBe(true)
        }
    })

    it('forwards the configuration of Random.vector3', () => {
        for (let i = 0; i < draws(30); i++) {
            const v = Random.vector3({ plane: 'xy', primitive: true })
            expect(v.dimension).toBe(3)
            expect(v.z.isZero()).toBe(true)
        }
    })

    it('forwards the configuration of Random.equation', () => {
        for (let i = 0; i < draws(30); i++) {
            const E = Random.equation({ variables: 't', degree: 2 })
            expect(E.degree().value).toBe(2)
            expect(E.variables).toEqual(['t'])
        }
    })

    describe('helpers', () => {
        it('forwards the bounds and the exclusions of Random.number', () => {
            for (let i = 0; i < draws(50); i++) {
                expect(Random.number(5, 5)).toBe(5)
                expect(Random.number(1, 2, [1])).toBe(2)
                expect(Random.number(3, 1, [2])).not.toBe(2)
            }
            expect(() => Random.number(1, 2, [1, 2])).toThrow(InvalidArgumentError)
        })

        it('forwards allowZero to Random.numberSym', () => {
            for (let i = 0; i < draws(100); i++) {
                const n = Random.numberSym(3, false)
                expect(n).not.toBe(0)
                expect(Math.abs(n)).toBeLessThanOrEqual(3)
            }
        })

        it('forwards the bound of Random.prime, which is exclusive', () => {
            const primes = new Set(Array.from({length: drawsToSee(0.25, {outcomes: 4})}, () => Random.prime(10)))
            expect(primes).toEqual(new Set([2, 3, 5, 7]))
            expect(Random.prime()).toBeGreaterThan(1)
        })

        it('forwards the target and allowZero of Random.triplet', () => {
            const triplet = Random.triplet(5)
            expect(triplet).not.toBeNull()
            const [a, b, c] = triplet ?? [0, 0, 0]
            expect(c).toBe(5)
            expect(a * a + b * b).toBe(25)
            expect(a !== 0 && b !== 0).toBe(true)

            expect(Random.triplet(3)).toBeNull()
            expect(Random.triplet(3, true)).not.toBeNull()
        })

        it('forwards the probability of Random.bool', () => {
            for (let i = 0; i < draws(50); i++) {
                expect(Random.bool(0)).toBe(false)
                expect(Random.bool(1)).toBe(true)
            }
        })

        it('forwards the count of Random.array and leaves its argument alone', () => {
            const source = [1, 2, 3, 4, 5]
            for (let i = 0; i < draws(50); i++) {
                const three = Random.array(source, 3)
                expect(three).toHaveLength(3)
                expect(new Set(three).size).toBe(3)
                expect(three.every(x => source.includes(x))).toBe(true)
                expect(Random.array(source)).toHaveLength(1)
            }
            expect(source).toEqual([1, 2, 3, 4, 5])
        })

        it('returns an element of the array with Random.item, and throws on an empty one', () => {
            for (let i = 0; i < draws(50); i++) {
                expect(['a', 'b', 'c']).toContain(Random.item(['a', 'b', 'c']))
            }
            expect(() => Random.item([])).toThrow(InvalidArgumentError)
        })

        it('returns a shuffled copy with Random.shuffle', () => {
            const source = [1, 2, 3, 4, 5]
            for (let i = 0; i < draws(50); i++) {
                const shuffled = Random.shuffle(source)
                expect(shuffled).not.toBe(source)
                expect([...shuffled].sort()).toEqual([1, 2, 3, 4, 5])
            }
            expect(source).toEqual([1, 2, 3, 4, 5])
        })
    })
})
