/**
 * Checks shared by the generators of algebra: the same input must be refused with the same error whichever
 * generator receives it. Internal module, not part of the public API.
 */
import {InvalidArgumentError} from "../errors"

/** @throws {InvalidArgumentError} if `degree` is not a non-negative integer. */
export function assertDegree(degree: unknown): void {
    if (typeof degree !== 'number' || !Number.isInteger(degree) || degree < 0) {
        throw new InvalidArgumentError('degree must be a non-negative integer')
    }
}

/**
 * `variables` is a string with one lowercase letter per variable (`'x'`, `'xy'`), like the literal keys of `Monom`
 * and `Polynom.setVariable`. A repeated letter is accepted and counts once.
 *
 * @throws {InvalidArgumentError} if `variables` is not a non-empty string of lowercase letters.
 */
export function assertVariables(variables: unknown): void {
    if (typeof variables !== 'string' || !/^[a-z]+$/.test(variables)) {
        throw new InvalidArgumentError('variables must be a non-empty string of lowercase letters')
    }
}
