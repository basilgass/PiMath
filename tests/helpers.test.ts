import {describe, expect, test} from "vitest"
import {replace_in_array, splitIfOutsideParentheses} from "../src/helpers"

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

describe('split outside parenthesis', () => {
    test('no separator → returns the whole string', () => {
        expect(splitIfOutsideParentheses('abc', '/')).toEqual(['abc'])
    })

    test('empty string → returns array with one empty string', () => {
        expect(splitIfOutsideParentheses('', '/')).toEqual([''])
    })

    test('single separator', () => {
        expect(splitIfOutsideParentheses('a/b', '/')).toEqual(['a', 'b'])
    })

    test('multiple separators', () => {
        expect(splitIfOutsideParentheses('a/b/c', '/')).toEqual(['a', 'b', 'c'])
    })

    test('separator at the start', () => {
        expect(splitIfOutsideParentheses('/a', '/')).toEqual(['', 'a'])
    })

    test('separator at the end', () => {
        expect(splitIfOutsideParentheses('a/', '/')).toEqual(['a', ''])
    })

    test('separator inside parentheses → no split', () => {
        expect(splitIfOutsideParentheses('(a/b)', '/')).toEqual(['(a/b)'])
    })

    test('separator both inside and outside parentheses', () => {
        expect(splitIfOutsideParentheses('(a/b)/c', '/')).toEqual(['(a/b)', 'c'])
    })

    test('nested parentheses', () => {
        expect(splitIfOutsideParentheses('(a/(b/c))/d', '/')).toEqual(['(a/(b/c))', 'd'])
    })

    test('multiple parenthesised groups', () => {
        expect(splitIfOutsideParentheses('(a+b)/(c+d)', '/')).toEqual(['(a+b)', '(c+d)'])
    })

    test('different separator (*)', () => {
        expect(splitIfOutsideParentheses('a*(b+c)', '*')).toEqual(['a', '(b+c)'])
    })

    test('multi-character splitChar → throws', () => {
        expect(() => splitIfOutsideParentheses('a//b', '//')).toThrow()
    })
})
