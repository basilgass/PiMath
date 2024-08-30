import { Fraction } from "../coefficients/fraction";
export function areVectorsEquals(v1, v2) {
    return v1.dimension === v2.dimension &&
        v1.array.every((value, index) => {
            return v2.array[index].isEqual(value);
        });
}
export function areVectorsColinears(v1, v2) {
    if (v1.dimension !== v2.dimension) {
        return false;
    }
    const k = v1.array[0].value / v2.array[0].value;
    return v1.array.every((value, index) => {
        return v2.array[index].value === k * value.value;
    });
}
export function dotProduct(v1, v2) {
    if (v1.dimension !== v2.dimension) {
        return new Fraction().invalid();
    }
    return v1.array.reduce((acc, value, index) => {
        return acc.add(value.clone().multiply(v2.array[index]));
    }, new Fraction(0));
}
export function determinant(...values) {
    if (values.some((value) => value.dimension !== values[0].dimension)) {
        return new Fraction().invalid();
    }
    if (values[0].dimension === 2 && values.length !== 2) {
        return new Fraction().invalid();
    }
    if (values[0].dimension === 3 && values.length !== 3) {
        return new Fraction().invalid();
    }
    if (values[0].dimension === 2) {
        return values[0].array[0].clone().multiply(values[1].array[1])
            .subtract(values[0].array[1].clone().multiply(values[1].array[0]));
    }
    return values[0].array[0].clone()
        .multiply(values[1].array[1].clone().multiply(values[2].array[2])
        .subtract(values[1].array[2].clone().multiply(values[2].array[1])))
        .subtract(values[0].array[1].clone()
        .multiply(values[1].array[0].clone().multiply(values[2].array[2])
        .subtract(values[1].array[2].clone().multiply(values[2].array[0]))))
        .add(values[0].array[2].clone()
        .multiply(values[1].array[0].clone().multiply(values[2].array[1])
        .subtract(values[1].array[1].clone().multiply(values[2].array[0]))));
}
//# sourceMappingURL=geomMath.js.map