import {describe, expect, test} from "vitest"
import {LogicalSet} from "../../src"

describe('LogicalSet tests', ()=>{
    test('Logical set', ()=>{
        const LS = new LogicalSet('A|B')

        console.log(LS)
        console.log(LS.vennAB())
        console.log(LS.vennABC())
        console.log(LS.tex)

        console.log(LS.evaluate(
            {A: true, B: false}
        ))
    })
})