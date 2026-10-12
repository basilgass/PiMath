import {describe, expect, it, vi} from "vitest"
import {Point, Vector} from "../../../src/geometry"
import {drawVector, drawVectorFromPoints, validateVectorOptions} from "../../../src/randomization/geometry/rndComponents"
import {DEFAULT_RANGE, MAX_ATTEMPTS} from "../../../src/randomization/rndInterval"
import {InvalidArgumentError} from "../../../src/errors"

/** A `draw` that returns the given vectors one after the other (the last one repeats). */
function scripted(...vectors: number[][]) {
    let call = 0
    return vi.fn(() => new Vector(...vectors[Math.min(call++, vectors.length - 1)]))
}

const values = (vector: Vector) => vector.array.map(c => c.value)

describe('rndComponents', () => {
    describe('drawVector', () => {
        it('divides the components by their greatest common divisor, keeping zeros and signs', () => {
            expect(values(drawVector(scripted([4, 6]), 10, true))).toEqual([2, 3])
            expect(values(drawVector(scripted([-4, 6]), 10, true))).toEqual([-2, 3])
            expect(values(drawVector(scripted([0, 4]), 10, true))).toEqual([0, 1])
            expect(values(drawVector(scripted([6, -9, 0]), 10, true))).toEqual([2, -3, 0])
        })

        it('returns a vector that is already primitive unchanged', () => {
            expect(values(drawVector(scripted([3, 5]), 10, true))).toEqual([3, 5])
        })

        it('returns the null vector as it is', () => {
            expect(values(drawVector(scripted([0, 0, 0]), 10, true))).toEqual([0, 0, 0])
        })

        it('draws again when the reduced vector leaves the range', () => {
            // (4, 4) reduces to (1, 1), outside [2, 5]; (2, 3) is already primitive and inside.
            const draw = scripted([4, 4], [2, 3])
            expect(values(drawVector(draw, {min: 2, max: 5}, true))).toEqual([2, 3])
            expect(draw).toHaveBeenCalledTimes(2)
        })

        it('throws once the attempts are exhausted without a vector in the range', () => {
            const draw = scripted([4, 4])
            expect(() => drawVector(draw, {min: 2, max: 5}, true)).toThrow(InvalidArgumentError)
            expect(draw).toHaveBeenCalledTimes(MAX_ATTEMPTS)
        })

        it('returns the vector as drawn, without reading the range, when not primitive', () => {
            const draw = scripted([4, 6])
            expect(values(drawVector(draw, 'invalid' as never, false))).toEqual([4, 6])
            expect(draw).toHaveBeenCalledTimes(1)
        })
    })

    describe('validateVectorOptions', () => {
        it('accepts an empty configuration and the vector-only options', () => {
            expect(() => { validateVectorOptions({}) }).not.toThrow()
            expect(() => { validateVectorOptions({primitive: true, allow: {zero: true}}) }).not.toThrow()
            expect(() => { validateVectorOptions({primitive: false, allow: {zero: false}}) }).not.toThrow()
        })

        it('rejects allow.origin and points to allow.zero', () => {
            expect(() => { validateVectorOptions({allow: {origin: true}} as never) }).toThrow(/allow\.zero/)
            expect(() => { validateVectorOptions({allow: {origin: false}} as never) }).toThrow(InvalidArgumentError)
        })

        it.each(['yes', 1, null])('rejects the non-boolean allow.zero %j', (zero) => {
            expect(() => { validateVectorOptions({allow: {zero}} as never) }).toThrow(InvalidArgumentError)
        })

        it.each(['yes', 1, null])('rejects the non-boolean primitive %j', (primitive) => {
            expect(() => { validateVectorOptions({primitive} as never) }).toThrow(InvalidArgumentError)
        })

        it('requires integers for primitive', () => {
            for (const fraction of [true, {}, {max: 5}, {relative: false}]) {
                expect(() => { validateVectorOptions({primitive: true, fraction}) }).toThrow(InvalidArgumentError)
            }
            for (const fraction of [undefined, false, {relative: true}, {relative: true, max: 5}]) {
                expect(() => { validateVectorOptions({primitive: true, fraction}) }).not.toThrow()
            }
        })

        it('accepts fractions when primitive is not requested', () => {
            expect(() => { validateVectorOptions({fraction: true}) }).not.toThrow()
            expect(() => { validateVectorOptions({primitive: false, fraction: {max: 5}}) }).not.toThrow()
        })
    })

    describe('drawVectorFromPoints', () => {
        const point = (_config?: unknown) => new Point(1, 2)

        it('passes allow.zero to the point generator as allow.origin, false by default', () => {
            const drawPoint = vi.fn((_config: { allow: { origin: boolean } }) => point())
            drawVectorFromPoints(undefined, drawPoint)
            drawVectorFromPoints({}, drawPoint)
            drawVectorFromPoints({allow: {zero: true}}, drawPoint)

            expect(drawPoint.mock.calls.map(([config]) => config.allow)).toEqual([
                {origin: false}, {origin: false}, {origin: true},
            ])
        })

        it('forwards the point options and keeps the vector-only ones to itself', () => {
            const drawPoint = vi.fn(point)
            drawVectorFromPoints({axis: 'x', range: 3, fraction: {relative: true}, primitive: true, allow: {zero: true}} as never, drawPoint)

            expect(drawPoint).toHaveBeenCalledWith({axis: 'x', range: 3, fraction: {relative: true}, allow: {origin: true}})
        })

        it('builds the vector from the point', () => {
            expect(values(drawVectorFromPoints(undefined, point))).toEqual([1, 2])
        })

        it('applies primitive with the range of the configuration, and DEFAULT_RANGE by default', () => {
            const drawPoint = vi.fn(() => new Point(4, 4))
            expect(() => drawVectorFromPoints({primitive: true, range: {min: 2, max: 5}}, drawPoint)).toThrow(InvalidArgumentError)

            // (4, 4) reduces to (1, 1), inside the default range.
            expect(values(drawVectorFromPoints({primitive: true}, () => new Point(4, 4)))).toEqual([1, 1])
            expect(DEFAULT_RANGE).toBe(10)
        })

        it('validates the vector-only options before drawing any point', () => {
            const drawPoint = vi.fn(point)
            expect(() => drawVectorFromPoints({allow: {origin: true}} as never, drawPoint)).toThrow(InvalidArgumentError)
            expect(drawPoint).not.toHaveBeenCalled()
        })
    })
})
