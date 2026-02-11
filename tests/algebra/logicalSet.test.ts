import {describe, expect, test} from "vitest"
import {LogicalSet} from "../../src"


describe('LogicalSet tests', () => {
    test('Logical set', () => {

        const LS = new LogicalSet('A|B')

        expect(1).toBe(1)
    })
})