import { describe, test, expect } from "vitest"
import { Triangle } from "../../src/geometry/triangle"
import { Point } from "../../src/geometry/point"

describe('triangle creation', () => {
    test('create triangle', () => {
        const T = new Triangle(
            new Point(1, 2),
            new Point(5, 2),
            new Point(5, 5)
        )

        expect(T).toBeDefined()
        expect(T.A).toBeDefined()
        expect(T.A.x.value).toBe(1)

    })
    test.todo('parse string')
    test.todo('clone triangle')
    test.todo('set to zero triangle')
    test.todo('set to one triangle')
})
describe.todo('triangle output', () => {
    test.todo('output as LaTeX')
    test.todo('output as ASCII')
})
describe.todo('triangle operations', () => {
    test.todo('reduce triangle')
    test.todo('add two triangles')
    test.todo('subtract two triangles')
    test.todo('multiply two triangles')
    test.todo('divide by triangle')
    test.todo('raise triangle by integer')
})
describe.todo('triangle comparisons', () => {
    test.todo('same triangle')
    test.todo('equal triangle')
    test.todo('is one triangle')
    test.todo('is zero triangle')
})
describe.todo('triangle static functions')
describe.todo('triangle evaluation', () => {
    test.todo('evaluate triangle')
})
describe.todo('triangle generators')