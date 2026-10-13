import {Fraction} from "../coefficients"
import type {Vector} from "./vector"
import type {Point} from "./point"
import {DimensionError} from "../errors"

/** A vector or a point: both are tuples of coordinates. */
export type VectorOrPoint = Vector | Point
export function areVectorsEquals(v1: VectorOrPoint, v2: VectorOrPoint): boolean {
    if (v1.dimension !== v2.dimension) return false
    const a = v1.array
    const b = v2.array
    return a.every((value, index) => b[index].isEqual(value))
}

/**
 * Two vectors are colinear iff every 2×2 minor aᵢbⱼ − aⱼbᵢ equals zero.
 * Returns false immediately when dimensions differ.
 */
export function areVectorsColinears(v1: VectorOrPoint, v2: VectorOrPoint): boolean {
    if (v1.dimension !== v2.dimension) return false
    const a = v1.array
    const b = v2.array
    for (let i = 0; i < a.length; i++) {
        for (let j = i + 1; j < a.length; j++) {
            if (!a[i].clone().multiply(b[j]).isEqual(a[j].clone().multiply(b[i]))) {
                return false
            }
        }
    }
    return true
}


/** @throws {DimensionError} if the vectors have different dimensions */
export function dotProduct(v1: VectorOrPoint, v2: VectorOrPoint): Fraction {
    if (v1.dimension !== v2.dimension) {
        throw new DimensionError('Vectors must have the same dimension')
    }

    // Calculate the dot product
    return v1.array.reduce(
        (acc, value, index) => {
            return acc.add(value.clone().multiply(v2.array[index]))
        }, new Fraction(0))
}

/**
 * Computes the determinant of the n×n matrix formed by treating each vector as a row,
 * using the Bareiss algorithm (exact rational arithmetic, O(n³)).
 * @throws {DimensionError} if no vectors are given, if dimensions are inconsistent,
 *   or if the number of vectors does not equal their dimension
 */
export function determinantFromVectors(...values: VectorOrPoint[]): Fraction {
    if (values.length === 0) {
        throw new DimensionError('At least one vector is required')
    }

    if (values.some((value) => value.dimension !== values[0].dimension)) {
        throw new DimensionError('All vectors must have the same dimension')
    }

    const n = values[0].dimension
    if (n !== values.length) {
        throw new DimensionError(`Determinant of dimension ${n} requires exactly ${n} vectors (${values.length} given)`)
    }

    // Bareiss algorithm — exact integer arithmetic, O(n³)
    const M: Fraction[][] = values.map(v => v.cloneCoordinates())
    let sign = 1

    for (let k = 0; k < n - 1; k++) {
        if (M[k][k].isZero()) {
            let swapped = false
            for (let i = k + 1; i < n; i++) {
                if (!M[i][k].isZero()) {
                    ;[M[k], M[i]] = [M[i], M[k]]
                    sign = -sign
                    swapped = true
                    break
                }
            }
            if (!swapped) return new Fraction(0)
        }

        const prevPivot = k === 0 ? new Fraction(1) : M[k - 1][k - 1]

        for (let i = k + 1; i < n; i++) {
            for (let j = k + 1; j < n; j++) {
                M[i][j] = M[k][k].clone().multiply(M[i][j])
                    .subtract(M[i][k].clone().multiply(M[k][j]))
                    .divide(prevPivot)
            }
        }
    }

    return sign === 1 ? M[n - 1][n - 1].clone() : M[n - 1][n - 1].clone().opposite()
}
