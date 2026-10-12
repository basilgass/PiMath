import {describe, expect, it} from "vitest"
import {assertDegree, assertVariables} from "../../src/randomization/rndValidation"
import {InvalidArgumentError} from "../../src/errors"

describe('rndValidation', () => {
    describe('assertDegree', () => {
        it.each([0, 1, 2, 10])('accepts the degree %j', (degree) => {
            expect(() => { assertDegree(degree) }).not.toThrow()
        })

        it.each([-1, 1.5, NaN, Infinity, '2', null, undefined])('rejects the degree %j', (degree) => {
            expect(() => { assertDegree(degree) }).toThrow(InvalidArgumentError)
        })

        it('names the option in the message', () => {
            expect(() => { assertDegree(-1) }).toThrow(/degree/)
        })
    })

    describe('assertVariables', () => {
        it.each(['x', 'xyz', 'xx', 'abz'])('accepts the variables %j, a repeated letter counting once', (variables) => {
            expect(() => { assertVariables(variables) }).not.toThrow()
        })

        it.each(['', 'X', 'x1', 'x y', 'é', 5, null, undefined, ['x']])('rejects the variables %j', (variables) => {
            expect(() => { assertVariables(variables) }).toThrow(InvalidArgumentError)
        })

        it('names the option in the message', () => {
            expect(() => { assertVariables('') }).toThrow(/variables/)
        })
    })
})
