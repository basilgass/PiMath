import {describe, test, expect} from "vitest"
import {areVectorsEquals, areVectorsColinears, dotProduct, determinantFromVectors} from "../../src/geometry/geomMath"
import {Vector} from "../../src/geometry/vector"
import {DimensionError} from "../../src/errors"

describe('areVectorsEquals', () => {
    test('equal 2D vectors', () => {
        expect(areVectorsEquals(new Vector(1, 2), new Vector(1, 2))).toBe(true)
    })

    test('different 2D vectors', () => {
        expect(areVectorsEquals(new Vector(1, 2), new Vector(1, 3))).toBe(false)
    })

    test('returns false when dimensions differ', () => {
        expect(areVectorsEquals(new Vector(1, 2), new Vector(1, 2, 3))).toBe(false)
    })

    test('exact fraction comparison — 1/3', () => {
        expect(areVectorsEquals(new Vector('1/3', '2/3'), new Vector('1/3', '2/3'))).toBe(true)
        expect(areVectorsEquals(new Vector('1/3', '2/3'), new Vector('1/3', '1/3'))).toBe(false)
    })

    test('equal 3D vectors', () => {
        expect(areVectorsEquals(new Vector(1, 2, 3), new Vector(1, 2, 3))).toBe(true)
        expect(areVectorsEquals(new Vector(1, 2, 3), new Vector(1, 2, 4))).toBe(false)
    })
})

describe('areVectorsColinears', () => {
    test('colinear 2D — positive scalar', () => {
        expect(areVectorsColinears(new Vector(1, 2), new Vector(2, 4))).toBe(true)
    })

    test('colinear 2D — negative scalar', () => {
        expect(areVectorsColinears(new Vector(1, 2), new Vector(-3, -6))).toBe(true)
    })

    test('non-colinear 2D', () => {
        expect(areVectorsColinears(new Vector(1, 2), new Vector(1, 3))).toBe(false)
    })

    test('colinear 3D', () => {
        expect(areVectorsColinears(new Vector(1, 2, -3), new Vector(-2, -4, 6))).toBe(true)
    })

    test('non-colinear 3D', () => {
        expect(areVectorsColinears(new Vector(1, 2, 3), new Vector(1, 2, 4))).toBe(false)
    })

    test('returns false when dimensions differ', () => {
        expect(areVectorsColinears(new Vector(1, 2), new Vector(1, 2, 3))).toBe(false)
    })

    test('zero vector is colinear with any vector', () => {
        expect(areVectorsColinears(new Vector(0, 0), new Vector(3, 7))).toBe(true)
        expect(areVectorsColinears(new Vector(0, 0, 0), new Vector(1, 2, 3))).toBe(true)
    })
})

describe('dotProduct', () => {
    test('standard 2D case', () => {
        expect(dotProduct(new Vector(3, 4), new Vector(1, -2)).display).toBe('-5')
    })

    test('standard 3D case', () => {
        expect(dotProduct(new Vector(1, 2, -3), new Vector(4, -5, 6)).display).toBe('-24')
    })

    test('perpendicular vectors yield zero', () => {
        expect(dotProduct(new Vector(1, 0), new Vector(0, 1)).isZero()).toBe(true)
    })

    test('throws DimensionError when dimensions differ', () => {
        expect(() => dotProduct(new Vector(1, 2), new Vector(1, 2, 3))).toThrow(DimensionError)
    })
})

describe('determinantFromVectors', () => {
    test('2×2 — basic case', () => {
        const v1 = new Vector(1, 2)
        const v2 = new Vector(3, 4)
        expect(determinantFromVectors(v1, v2).value).toBe(-2)
    })

    test('2×2 — requires row swap (pivot zero)', () => {
        const v1 = new Vector(0, 1)
        const v2 = new Vector(2, 3)
        expect(determinantFromVectors(v1, v2).value).toBe(-2)
    })

    test('3×3 — regression (expected 74)', () => {
        const v1 = new Vector(1, 2, 4)
        const v2 = new Vector(5, 4, 6)
        const v3 = new Vector(3, 7, 2)
        expect(determinantFromVectors(v1, v2, v3).value).toBe(74)
    })

    test('4×4 — block diagonal (expected 4)', () => {
        const v1 = new Vector(1, 2, 0, 0)
        const v2 = new Vector(3, 4, 0, 0)
        const v3 = new Vector(0, 0, 5, 6)
        const v4 = new Vector(0, 0, 7, 8)
        expect(determinantFromVectors(v1, v2, v3, v4).value).toBe(4)
    })

    test('singular matrix yields zero', () => {
        const v1 = new Vector(1, 2)
        const v2 = new Vector(2, 4)
        expect(determinantFromVectors(v1, v2).isZero()).toBe(true)
    })

    test('throws DimensionError for empty array', () => {
        expect(() => determinantFromVectors()).toThrow(DimensionError)
    })

    test('throws DimensionError when vector count differs from dimension', () => {
        expect(() => determinantFromVectors(new Vector(1, 2), new Vector(3, 4), new Vector(5, 6))).toThrow(DimensionError)
    })

    test('throws DimensionError when vector dimensions are inconsistent', () => {
        expect(() => determinantFromVectors(new Vector(1, 2), new Vector(1, 2, 3))).toThrow(DimensionError)
    })
})
