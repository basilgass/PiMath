import {describe, expect, test} from "vitest"
import {replace_in_array} from "../src/helpers"

describe('Replace in array', () => {
    test('complete array', () => {
        const a = ['', 't', '', 't', '', 't', '']

        const b = replace_in_array(a, '', '+')

        expect(b).toEqual([
            '+', 't', '+',
            't', '+', 't',
            '+'
        ])
    })
    test('array from start to index', ()=>{
        const a = ['', 't', '', 't', '', 't', '']

        const b = replace_in_array(a, '', '+', 0,4)

        expect(b).toEqual([
            '+', 't', '+',
            't', '+', 't',
            ''
        ])
    })

    test('array from index to end', ()=>{
        const a = ['', 't', '', 't', '', 't', '']

        const b = replace_in_array(a, '', '+', 3)

        expect(b).toEqual([
            '', 't', '',
            't', '+', 't',
            '+'
        ])
    })

    test('array from start to end', ()=>{
        const a = ['', 't', '', 't', '', 't', '']

        const b = replace_in_array(a, '', '+', 2, 4)

        expect(b).toEqual([
            '', 't', '+',
            't', '+', 't',
            ''
        ])
    })

})