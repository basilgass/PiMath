import {describe, test, expect} from "vitest"
import {Vector} from "../../src/geometry/vector"


describe('Vector creation', () => {
    test('create Vector', ()=>{
        const v = new Vector(1,2)
        expect(v).toBeDefined()
        expect(v.array.map(x=>x.value)).toEqual([1,2])
    })
    test('parse string', ()=>{
        const v = new Vector('(1;2/3)')
        expect(v.x.display).toBe('1')
        expect(v.y.display).toBe('2/3')
    })
    test('clone Vector', ()=>{
        const v = new Vector(1,2)
        const clone = v.clone()
        clone.x = 5

        expect(v.x.display).toBe('1')
        expect(clone.x.display).toBe('5')
    })
    test('set to zero Vector', ()=>{
        const v = new Vector().setDimension(2).zero()

        expect(v.x.display).toBe('0')
        expect(v.y.display).toBe('0')
    })
    test('set to one Vector', ()=>{
        const v = new Vector().setDimension(2).one()

        expect(v.x.display).toBe('1')
        expect(v.y.display).toBe('0')
    })
})
describe('Vector output', () => {
    test('output as LaTeX', ()=>{
        const v = new Vector(2,-3)

        expect(v.tex).toBe('\\begin{pmatrix} 2 \\\\ -3 \\end{pmatrix}')
    })
    test('output as ASCII', ()=>{
        const v = new Vector(2,-3)

        expect(v.display).toBe('((2,-3))')
    })
})
// All other tests are the same as vector3d.test.ts - no need to reproduce them here
describe.todo('Vector generators')