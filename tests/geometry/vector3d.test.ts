import {describe, expect, it, test} from "vitest"
import {determinant} from "../../src/geometry/geomMath"
import {Vector} from "../../src/geometry/vector"
import {Numeric} from "../../src/numeric"
import {Plane3, Point} from "../../src"

describe('Vector 3D creation', () => {

    test('create Vector 3D', () => {
        const v = new Vector(1, 2, -3)

        expect(v).toBeDefined()
        expect(v.x.display).toBe('1')
        expect(v.y.display).toBe('2')
        expect(v.z.display).toBe('-3')
    })

    test('create Vector 3D from 2 other vectors', () => {
        const A = new Vector(1, 2, -3)
        const B = new Vector(3, 5, 4)

        const v = new Vector(A, B)

        expect(v.x.display).toBe('2')
        expect(v.y.display).toBe('3')
        expect(v.z.display).toBe('7')
    })

    test('parse string', () => {
        const v = new Vector('(1;2;-3)')

        expect(v).toBeDefined()
        expect(v.x.display).toBe('1')
        expect(v.y.display).toBe('2')
        expect(v.z.display).toBe('-3')
    })
    test('clone Vector 3D', () => {
        const v = new Vector(1, 2, -3)
        const v2 = v.clone()

        v2.x = 5

        expect(v.x.display).toBe('1')
        expect(v2.x.display).toBe('5')
    })
    test('set to zero Vector 3D', () => {
        const v = new Vector(1, 2, -3)

        v.zero()

        expect(v.x.display).toBe('0')
        expect(v.y.display).toBe('0')
        expect(v.z.display).toBe('0')
    })
    test('set to one Vector 3D', () => {
        const v = new Vector(1, 2, -3)

        v.one()
        console.log(v.display)
        expect(v.x.display).toBe('1')
        expect(v.y.display).toBe('0')
        expect(v.z.display).toBe('0')
    })
})
describe('Vector 3D output', () => {
    test('output as LaTeX', () => {
        const v = new Vector(1, 2, -3)

        expect(v.tex).toBe('\\begin{pmatrix} 1 \\\\ 2 \\\\ -3 \\end{pmatrix}')
    })
    test('output as ASCII', () => {
        const v = new Vector(1, 2, -3)

        expect(v.display).toBe('((1,2,-3))')
    })
})
describe('Vector 3D operations', () => {
    test('simplify Vector 3D', () => {
        const v = new Vector(-4, -8, 12)

        v.simplify()

        expect(v.x.display).toBe('1')
        expect(v.y.display).toBe('2')
        expect(v.z.display).toBe('-3')
    })
    test('add two Vector 3Ds', () => {
        const v1 = new Vector(1, 2, -3)
        const v2 = new Vector(4, -5, 6)

        const sum = v1.clone().add(v2)

        expect(sum.x.display).toBe('5')
        expect(sum.y.display).toBe('-3')
        expect(sum.z.display).toBe('3')
        expect(v1.array.map(x => x.value)).toEqual([1, 2, -3])
    })
    test('subtract two Vector 3Ds', () => {
        const v1 = new Vector(1, 2, -3)
        const v2 = new Vector(4, -5, 6)

        const diff = v1.clone().subtract(v2)

        expect(diff.x.display).toBe('-3')
        expect(diff.y.display).toBe('7')
        expect(diff.z.display).toBe('-9')
    })
    test('multiply Vector 3D by scalar', () => {
        const v = new Vector(1, 2, -3)
        v.multiplyByScalar(2)

        expect(v.array.map(x => x.value)).toEqual([2, 4, -6])
    })
    test('dot product two Vector 3Ds', () => {
        const v1 = new Vector(1, 2, -3)
        const v2 = new Vector(4, -5, 6)

        const dot = v1.dot(v2)

        expect(dot.display).toBe('-24')
    })
    test('cross product two Vector 3Ds', () => {
        const v1 = new Vector(1, 2, -3)
        const v2 = new Vector(4, -5, 6)

        const cross = v1.cross(v2)

        expect(cross.x.display).toBe('-3')
        expect(cross.y.display).toBe('-18')
        expect(cross.z.display).toBe('-13')
    })

    test('norm of a Vector 3D', () => {
        const v1 = new Vector(1, 4, 8)
        const v2 = new Vector(1, 1, 1)

        expect(v1.normSquare.display).toBe('81')
        expect(v1.norm).toBe(9)
        expect(v2.normSquare.display).toBe('3')
        expect(v2.norm).toBe(Math.sqrt(3))
    })

    test('angle between two vectors', () => {
        const v1 = new Vector(1, -10, 4)
        const v2 = new Vector(1, 1, 1)

        const a = v1.angle(v2)
        expect(Numeric.numberCorrection(a)).toBe(105.479)

        const b = v1.angle(v2,true)
        expect(Numeric.numberCorrection(b)).toBe(74.521)

        const r = v1.angle(v2,true, true)
        expect(Numeric.numberCorrection(r)).toBe(1.301)
    })
})
describe('Vector 3D comparisons', () => {
    test('colinear Vector 3D', () => {
        const v1 = new Vector(1, 2, -3)
        const v2 = new Vector(-3, -6, 9)
        const v3 = new Vector(1, 2, 3)

        expect(v1.isColinearTo(v1)).toBeTruthy()
        expect(v1.isColinearTo(v2)).toBeTruthy()
        expect(v1.isColinearTo(v3)).toBeFalsy()
    })
    test('equal Vector 3D', () => {
        const v1 = new Vector(1, 2, -3)
        const v2 = new Vector(1, 2, -3)
        const v3 = new Vector(1, 2, 3)

        expect(v1.isEqual(v1)).toBeTruthy()
        expect(v1.isEqual(v2)).toBeTruthy()
        expect(v1.isEqual(v3)).toBeFalsy()
    })
    test('is one Vector 3D', () => {
        const v = new Vector(1, 0, 0)
        expect(v.isOne()).toBeTruthy()
        expect(v.isZero()).toBeFalsy()
    })
    test('is zero Vector 3D', () => {
        const v = new Vector(0, 0, 0)
        expect(v.isOne()).toBeFalsy()
        expect(v.isZero()).toBeTruthy()
    })
})

describe.todo('Vector 3D generators')

describe('Geometry Vector', function () {

    it('should create a vector from 3 numbers', function () {
        // Create a vector from 3 numbers
        // Check that the vector is created
        // Check that the vector has the right coordinates

        const v = new Vector(1, 2, 3)
        expect(v).toBeDefined()
        expect(v.x.display).to.be.equal('1')
    })

    it('should get the cross product of 2 vectors', function () {
        // Create 2 vectors
        // Get the cross product of the 2 vectors
        // Check that the result is a vector
        // Check that the result has the right coordinates

        const v1 = new Vector(2, -1, 4)
        const v2 = new Vector(-2, 3, 1)
        const cross = v1.cross(v2)
        expect(cross).toBeDefined()
        expect(cross.x.display).to.be.equal('-13')
        expect(cross.y.display).to.be.equal('-10')
        expect(cross.z.display).to.be.equal('4')
    })

    it('should get the cross product of two random vectors', function () {
        // Create 2 random vectors
        // Get the cross product of the 2 vectors
        // Check that the result is a vector

        const v1 = new Vector(
            -6, -2, -2
        )
        const v2 = new Vector(
            2, -3, 3
        )
        const cross = v1.cross(v2)
        console.log(`${v1.tex} \\times ${v2.tex} = $a`)

        console.log(cross.display)
    })

    it('should get the determinant of 3 vectors', function () {
        // Create 3 vectors
        // Get the determinant of the 3 vectors
        // Check that the result is a fraction

        const v1 = new Vector(1, 2, 4)
        const v2 = new Vector(5, 4, 6)
        const v3 = new Vector(3, 7, 2)
        const det = determinant(v1.clone(), v2.clone(), v3.clone())
        expect(det).toBeDefined()
        console.log(det.value / 6)

        expect(det.value).to.be.equal(74)
    })
})