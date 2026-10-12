import {describe, expect, it} from "vitest"
import {rndLine3} from "../../../src/randomization/geometry/rndLine3"
import {Point} from "../../../src/geometry/point"
import {Vector} from "../../../src/geometry/vector"
import type {RandomGeometryLine3Config} from "../../../src/randomization/rndTypes"
import {InvalidArgumentError} from "../../../src/errors"
import {draws, drawsToSee} from "../../helpers/draws"

const SAMPLES = draws(300)

interface Direction { a: number, b: number, c: number }

function sample(config?: RandomGeometryLine3Config, count = SAMPLES) {
    return Array.from({length: count}, () => {
        const line = rndLine3(config)
        const d = line.d
        return {line, A: line.OA, d: {a: d.x.value, b: d.y.value, c: d.z.value}}
    })
}

/** Number of zero components of a direction. */
const zeros = (d: Direction) => [d.a, d.b, d.c].filter(v => v === 0).length

const shapes = {
    general: (d: Direction) => d.a !== 0 && d.b !== 0 && d.c !== 0,
    parallelXY: (d: Direction) => d.a !== 0 && d.b !== 0 && d.c === 0,
    parallelXZ: (d: Direction) => d.a !== 0 && d.b === 0 && d.c !== 0,
    parallelYZ: (d: Direction) => d.a === 0 && d.b !== 0 && d.c !== 0,
    parallelX: (d: Direction) => d.a !== 0 && d.b === 0 && d.c === 0,
    parallelY: (d: Direction) => d.a === 0 && d.b !== 0 && d.c === 0,
    parallelZ: (d: Direction) => d.a === 0 && d.b === 0 && d.c !== 0,
}

const noKind = {general: false, parallelXY: false, parallelXZ: false, parallelYZ: false, parallelX: false, parallelY: false, parallelZ: false}

describe('rndLine3', () => {
    describe('defaults', () => {
        it('draws a 3D line through an integer point of [-10, 10]', () => {
            for (const {line, A} of sample()) {
                expect(line.OA.dimension).toBe(3)
                expect(line.d.dimension).toBe(3)
                expect(A.array.every(c => c.isRelative() && Math.abs(c.value) <= 10)).toBe(true)
            }
        })

        it('never draws a null direction', () => {
            for (const {d} of sample(undefined, draws(300))) {
                expect(zeros(d)).toBeLessThan(3)
            }
        })

        it('draws the general kind most of the time and every other kind sometimes', () => {
            const lines = sample(undefined, Math.max(draws(500), drawsToSee(0.02, {outcomes: 7})))
            for (const shape of Object.values(shapes)) {
                expect(lines.some(l => shape(l.d))).toBe(true)
            }
            expect(lines.filter(l => shapes.general(l.d)).length).toBeGreaterThan(lines.length / 2)
        })

        it('does not leak a previous call configuration into the next one', () => {
            rndLine3({allow: {parallelX: 1}})
            expect(sample(undefined, drawsToSee(0.5)).some(l => !shapes.parallelX(l.d))).toBe(true)
        })
    })

    describe('A', () => {
        it('uses an exact point, cloned', () => {
            const A = new Point(1, 2, 3)
            const line = rndLine3({A})
            expect(line.OA.isEqual(A)).toBe(true)
            expect(line.OA).not.toBe(A)
        })

        it('forwards a point configuration to rndPoint3', () => {
            for (const {A} of sample({A: {octant: 7, range: 4}})) {
                expect(A.array.every(c => c.value <= 0 && c.value >= -4)).toBe(true)
            }
        })

        it('rejects a 2D point and the legacy {x, y, z} form', () => {
            expect(() => rndLine3({A: new Point(1, 2)})).toThrow(InvalidArgumentError)
            expect(() => rndLine3({A: {x: 1, y: 2, z: 3}} as never)).toThrow(InvalidArgumentError)
            expect(() => rndLine3({A: 5} as never)).toThrow(InvalidArgumentError)
        })
    })

    describe('direction', () => {
        it('uses an exact direction, cloned', () => {
            const d = new Vector(1, 0, 2)
            const line = rndLine3({direction: d})
            expect(line.d.isEqual(d)).toBe(true)
            expect(line.d).not.toBe(d)
        })

        it('forwards the vector configuration', () => {
            for (const {d} of sample({direction: {octant: 8, range: 3}})) {
                expect(d.a).toBeGreaterThanOrEqual(0)
                expect(d.b).toBeLessThanOrEqual(0)
                expect(d.c).toBeLessThanOrEqual(0)
                expect([d.a, d.b, d.c].every(v => Math.abs(v) <= 3)).toBe(true)
            }
        })

        it('draws fractions on request', () => {
            const lines = sample({direction: {fraction: true, range: 5}}, Math.max(draws(500), drawsToSee(0.3)))
            expect(lines.some(l => !l.line.d.x.isRelative() || !l.line.d.y.isRelative())).toBe(true)
        })

        it('draws primitive directions on request', () => {
            for (const {line} of sample({direction: {primitive: true}})) {
                expect(line.d.array.every(c => c.denominator === 1)).toBe(true)
                const gcd = line.d.array.reduce((g, c) => gcdOf(g, Math.abs(c.numerator)), 0)
                expect(gcd).toBe(1)
            }
        })

        it('overrides axis and plane of the vector configuration with the kind drawn', () => {
            for (const {d} of sample({direction: {axis: 'x'}, allow: {parallelXY: 1}})) {
                expect(shapes.parallelXY(d)).toBe(true)
            }
        })

        it('rejects a null exact direction, a 2D one and the legacy {x, y, z} form', () => {
            expect(() => rndLine3({direction: new Vector(0, 0, 0)})).toThrow(InvalidArgumentError)
            expect(() => rndLine3({direction: new Vector(1, 2)})).toThrow(InvalidArgumentError)
            expect(() => rndLine3({direction: {x: 1, y: 2, z: 3}} as never)).toThrow(InvalidArgumentError)
        })

        it('rejects a vector configuration that allows the null vector', () => {
            expect(() => rndLine3({direction: {allow: {zero: true}}})).toThrow(InvalidArgumentError)
        })

        it('lets the errors of the vector configuration through', () => {
            expect(() => rndLine3({direction: {octant: 9} as never})).toThrow(InvalidArgumentError)
            expect(() => rndLine3({direction: {allow: {origin: true}} as never})).toThrow(/allow\.zero/)
        })
    })

    describe('allow', () => {
        it.each(Object.entries(shapes))('draws only the kind %s when it is the only one allowed', (kind, shape) => {
            for (const {d} of sample({allow: {[kind]: 1}})) {
                expect(shape(d)).toBe(true)
            }
        })

        it('excludes a kind set to false', () => {
            const allow = {...noKind, general: true}
            for (const {d} of sample({allow}, draws(500))) {
                expect(shapes.general(d)).toBe(true)
            }
        })

        it('reads a number as a probability', () => {
            const lines = sample({allow: {parallelX: 0.5, parallelY: false, parallelZ: false}}, Math.max(draws(500), drawsToSee(0.3, {outcomes: 2})))
            expect(lines.some(l => shapes.parallelX(l.d))).toBe(true)
            expect(lines.some(l => shapes.general(l.d))).toBe(true)
        })

        it('normalizes probabilities that exceed 1', () => {
            const allow = {...noKind, general: 0.8, parallelXY: 0.8}
            const lines = sample({allow}, Math.max(draws(500), drawsToSee(0.4, {outcomes: 2})))
            expect(lines.every(l => shapes.general(l.d) || shapes.parallelXY(l.d))).toBe(true)
            expect(lines.some(l => shapes.general(l.d))).toBe(true)
            expect(lines.some(l => shapes.parallelXY(l.d))).toBe(true)
        })

        it('cannot be combined with an exact direction', () => {
            expect(() => rndLine3({direction: new Vector(1, 2, 3), allow: {general: true}})).toThrow(InvalidArgumentError)
            expect(rndLine3({direction: new Vector(1, 2, 3), allow: {}}).d.isEqual(new Vector(1, 2, 3))).toBe(true)
        })

        it('throws when every kind is excluded', () => {
            expect(() => rndLine3({allow: noKind})).toThrow(InvalidArgumentError)
        })

        it.each(['yes', 2, -0.1, NaN])('rejects the invalid entry %j', (value) => {
            expect(() => rndLine3({allow: {general: value}} as never)).toThrow(InvalidArgumentError)
        })
    })

    describe('kinds that the direction configuration makes impossible', () => {
        it('skips, with true, the kinds that need a zero when the range excludes 0', () => {
            for (const {d} of sample({direction: {range: {min: 1, max: 5}}})) {
                expect(shapes.general(d)).toBe(true)
            }
        })

        it('throws, with an explicit number, a kind that cannot be satisfied', () => {
            for (let i = 0; i < draws(30); i++) {
                expect(() => rndLine3({direction: {range: {min: 1, max: 5}}, allow: {parallelXY: 0.3}})).toThrow(InvalidArgumentError)
            }
        })

        it('throws when nothing is possible', () => {
            expect(() => rndLine3({direction: {range: 0}})).toThrow(InvalidArgumentError)
        })
    })
})

function gcdOf(a: number, b: number): number {
    return b === 0 ? a : gcdOf(b, a % b)
}
