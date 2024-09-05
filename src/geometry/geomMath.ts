import { Fraction } from "../coefficients/fraction"
import type { Vector } from "./vector"

type V = Vector
export function areVectorsEquals(v1: V, v2: V): boolean {
    return v1.dimension === v2.dimension &&
        v1.array.every(
            (value, index) => {
                return v2.array[index].isEqual(value)
            })
}

export function areVectorsColinears(v1: V, v2: V): boolean {
    if (v1.dimension !== v2.dimension) { return false }

    // Constant of proportionality
    const k = v1.array[0].value / v2.array[0].value

    return v1.array.every(
        (value, index) => {
            return v2.array[index].value === k * value.value
        })
}


export function dotProduct(v1: V, v2: V): Fraction {
    if (v1.dimension !== v2.dimension) { return new Fraction().invalid() }

    // Calculate the dot product
    // Why does the reduce not add the last element?

    return v1.array.reduce(
        (acc, value, index) => {
            return acc.add(value.clone().multiply(v2.array[index]))
        }, new Fraction(0))
}

export function determinant(...values: V[]): Fraction {
    // TODO: Make it work for vectors of dimension n
    // Check if the vectors are in the same dimension
    if (values.some((value) => value.dimension !== values[0].dimension)) {
        return new Fraction().invalid()
    }

    // Check if the vectors are in dimension 2 or 3 and that the number of values is correct
    if (values[0].dimension === 2 && values.length !== 2) {
        return new Fraction().invalid()
    }

    if (values[0].dimension === 3 && values.length !== 3) {
        return new Fraction().invalid()
    }

    // Calculate the determinant 2x2
    if (values[0].dimension === 2) {
        return values[0].array[0].clone().multiply(values[1].array[1])
            .subtract(values[0].array[1].clone().multiply(values[1].array[0]))
    }

    // Calculate the determinant 3x3
    return values[0].array[0].clone()
        .multiply(
            values[1].array[1].clone().multiply(values[2].array[2])
                .subtract(values[1].array[2].clone().multiply(values[2].array[1]))
        )
        .subtract(values[0].array[1].clone()
            .multiply(
                values[1].array[0].clone().multiply(values[2].array[2])
                    .subtract(values[1].array[2].clone().multiply(values[2].array[0]))
            )
        )
        .add(values[0].array[2].clone()
            .multiply(values[1].array[0].clone().multiply(values[2].array[1])
                .subtract(values[1].array[1].clone().multiply(values[2].array[0]))))
}
