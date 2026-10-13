import {describe, expect, test} from 'vitest'
import {CompletionContext, type CompletionResult} from '@codemirror/autocomplete'
import {EditorState} from '@codemirror/state'
import {completions, mergeCompletions} from '../../src/completions'
import {pimathCompletion} from '../../src/completions/codemirror'
import {defined} from '../helpers/defined'

/** The suggestions at the end of `code` (`|` marks the cursor when it is not at the end). */
function suggest(code: string, options?: Parameters<typeof pimathCompletion>[0]): CompletionResult | null {
    const cursor = code.indexOf('|')
    const text = code.replace('|', '')
    const state = EditorState.create({doc: text})
    const pos = cursor === -1 ? text.length : cursor
    return pimathCompletion(options)(new CompletionContext(state, pos, false)) as CompletionResult | null
}

function labels(code: string): string[] {
    return (suggest(code)?.options ?? []).map(o => o.label)
}

describe('completion data', () => {
    test('every name of the global object is offered', () => {
        const names = completions.globals.map(g => g.label)
        for (const name of ['PiMath', 'Fraction', 'Polynom', 'Random', 'Numeric', 'Point', 'ParseError']) {
            expect(names).toContain(name)
        }
    })

    test('every generator has its signature and its options', () => {
        for (const generator of Object.keys(completions.options)) {
            expect(completions.signatures[generator]).toBeDefined()
        }
        expect(Object.keys(completions.options)).toContain('Random.equation')
        expect(completions.options['Random.equation'].map(o => o.path)).toContain('degree')
    })

    test('mergeCompletions adds entries without changing the original', () => {
        const merged = mergeCompletions(completions, {
            globals: [{label: 'iteration', type: 'property'}],
            members: {Random: [{label: 'points', type: 'function'}]},
        })

        expect(merged.globals.map(g => g.label)).toContain('iteration')
        expect(merged.members.Random.map(e => e.label)).toContain('points')
        expect(merged.members.Random.map(e => e.label)).toContain('equation')
        expect(completions.globals.map(g => g.label)).not.toContain('iteration')
    })
})

describe('pimathCompletion', () => {
    test('suggests the names of the library while typing a name', () => {
        const result = defined(suggest('const a = new Fra'))
        expect(result.from).toBe('const a = new '.length)
        expect(result.options.map(o => o.label)).toContain('Fraction')
    })

    test('suggests nothing after a dot on an unknown name', () => {
        expect(suggest('const P = new Polynom("x")\nP.')).toBeNull()
    })

    test('suggests the generators after Random. and PiMath.Random.', () => {
        expect(labels('Random.')).toContain('equation')
        expect(labels('PiMath.Random.')).toContain('equation')
        expect(labels('Random.eq')).toContain('equation')
    })

    test('replaces only what follows the dot', () => {
        const code = 'Random.eq'
        expect(defined(suggest(code)).from).toBe('Random.'.length)
    })

    test('suggests the classes after PiMath. and the geometry after PiMath.Geometry.', () => {
        expect(labels('PiMath.')).toEqual(expect.arrayContaining(['Fraction', 'Geometry', 'Errors', 'Random']))
        expect(labels('PiMath.Geometry.')).toContain('Point')
        expect(labels('PiMath.Errors.')).toContain('ParseError')
    })

    test('suggests the static members of a class, also by its full path', () => {
        expect(labels('Line.')).toContain('fromPoints')
        expect(labels('PiMath.Geometry.Line.')).toContain('fromPoints')
        expect(labels('Fraction.')).toContain('fromString')
    })

    test('suggests the functions of Numeric', () => {
        expect(labels('Numeric.')).toEqual(expect.arrayContaining(['gcd', 'lcm']))
    })

    test('suggests the options of a generator inside its configuration object', () => {
        const names = labels('Random.equation({ de')
        expect(names).toContain('degree')
        expect(names).toContain('solution')
    })

    test('suggests an option after a comma, and gives its type and default', () => {
        const result = defined(suggest('Random.equation({ degree: 2, '))
        const variables = defined(result.options.find(o => o.label === 'variables'))
        expect(variables.detail).toContain('string')
        expect(variables.detail).toContain("'x'")
        expect(variables.info).toBeTruthy()
    })

    test('suggests the options of a group, found by its path', () => {
        expect(labels('Random.equation({ allow: { ')).toContain('commonFactor')
        expect(labels('Random.equation({ solution: { ')).toContain('count')
        expect(labels('Random.equation({ ')).toContain('allow')
    })

    test('works with the full path of the generator', () => {
        expect(labels('PiMath.Random.equation({ ')).toContain('degree')
    })

    test('does not suggest an option where a value is expected', () => {
        expect(suggest('Random.equation({ degree: ')).toBeNull()
        expect(suggest('Random.equation({ degree: [1, ')).toBeNull()
    })

    test('does not suggest options for an object that is not the first argument', () => {
        expect(suggest('Random.equation(1, { ')).toBeNull()
    })

    test('suggests nothing inside a string or a comment', () => {
        expect(suggest('const a = "Fra')).toBeNull()
        expect(suggest('// Fra')).toBeNull()
        expect(suggest("const s = 'Random.eq")).toBeNull()
    })

    test('ignores brackets written inside a string', () => {
        expect(labels('const s = "({"\nRandom.equation({ ')).toContain('degree')
    })

    test('offers the entries added with extend', () => {
        const result = suggest('PiMathExt.', {extend: {members: {PiMathExt: [{label: 'wrap', type: 'function'}]}}})
        expect(defined(result).options.map(o => o.label)).toEqual(['wrap'])
    })
})
