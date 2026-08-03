import type {IExpressionMultiply, IPiMathObject} from "../pimath.interface"
import {InvalidArgumentError} from "../errors"

// TODO: create other operation_** to make things more generic !
export function operation_pow<T extends IPiMathObject<T> & IExpressionMultiply<T>>(item: T, value: number): T {
    if (!Number.isSafeInteger(value)) {
        throw new InvalidArgumentError('Can only raise item by an integer')
    }

    if (value < 0) {
        throw new InvalidArgumentError('Can only raise item by a positive integer')
    }

    if (value === 0) {
        return item.one()
    }

    const P = item.clone()
    for (let i = 1; i < value; i++) {
        item.multiply(P)
    }

    return item
}
