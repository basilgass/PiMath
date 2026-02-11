import {describe, expect, test} from "vitest"
import {Matrix, Vector} from "../../src"

describe('Matrix creation', () => {
    test('create Matrix', () => {
        const M = new Matrix(3, 5)

        M.setValue(2, 3, 12)

        M.forEach((aij, row, column) => {
            expect(M.values[row][column].display).toBe(
                (row === 2 && column === 3) ? '12' : '0'
            )
        })
    })
    test('parse string', () => {
        const str = "((1,2),(3,-4))"

        const M = new Matrix().fromString(str)

        expect(M.values[0][1].display).toEqual('2')
        expect(M.display).toEqual(str)
    })
    test('clone Matrix', () => {
        const A = new Matrix().fromString('((1,2),(3,4)')

        const B = A.clone()

        B.setValue(0, 0, -5)

        expect(A.values[0][0].display).toBe('1')
        expect(B.values[0][0].display).toBe('-5')

        expect(A.values[0][1].display).toBe('2')
        expect(B.values[0][1].display).toBe('2')
    })
    test('set to zero Matrix', () => {
        const M = new Matrix().fromString('((1,2),(3,4))')

        M.zero()
        M.forEach(aij => {
            expect(aij.value).toBe(0)
        })
    })
    test('set to one Matrix', () => {
        const M = new Matrix().fromString('((1,2),(3,4))')

        M.one()
        M.forEach((aij, row, column) => {
            expect(aij.value).toBe(
                row === column ? 1 : 0
            )
        })
    })
})
describe('Matrix output', () => {
    test('output as LaTeX', () => {
        const M = new Matrix(2, 3)
        M.setValue(0, 0, 1)
        M.setValue(1, 0, 2)
        M.setValue(0, 1, 3)
        M.setValue(1, 1, 4)
        M.setValue(0, 2, 5)
        M.setValue(1, 2, 6)

        expect(M.tex).toBe(`\\begin{pmatrix}
\t1 & 3 & 5\\\\
\t2 & 4 & 6\\\\
\\end{pmatrix}`)

        expect(M.bmatrix.tex).toBe(`\\begin{bmatrix}
\t1 & 3 & 5\\\\
\t2 & 4 & 6\\\\
\\end{bmatrix}`)

        expect(M.tex).not.toBe(`\\begin{pmatrix}
\t1 & 3 & 5\\\\
\t2 & 4 & 6\\\\
\\end{pmatrix}`)

        expect(M.pmatrix.tex).toBe(`\\begin{pmatrix}
\t1 & 3 & 5\\\\
\t2 & 4 & 6\\\\
\\end{pmatrix}`)
    })
    test('output as ASCII', () => {
        const M = new Matrix(2, 2)
        M.setValue(0, 0, 2)
        M.setValue(1, 0, -2)
        M.setValue(0, 1, 5)
        M.setValue(1, 1, -5)

        expect(M.display).toBe('((2,5),(-2,-5))')
        expect(M.bmatrix.display).toBe('[(2,5),(-2,-5)]')
        expect(M.display).not.toBe('((2,5),(-2,-5))')
        expect(M.pmatrix.display).toBe('((2,5),(-2,-5))')
    })
})

describe('Geometry Matrix', function () {
    test('should create a matrix from 2 vectors', function () {

        const M = new Matrix().fromVectors(
            new Vector(1, 2),
            new Vector(3, 4)
        )

        expect(M).toBeDefined()
        expect(M.values.length).to.be.equal(2)
        expect(M.rows[1][1].display).to.be.equal('4')


    })

    test('should get the determinant of a 2x2 matrix', function () {
        // Create a 2x2 matrix
        // Get the determinant of the matrix
        // Check that the result is a fraction
        // Check that the result is correct

        const M = new Matrix().fromVectors(
            new Vector(1, 2),
            new Vector(3, 4)
        )

        // const det = M.determinant()
        // expect(det).toBeDefined()
        // expect(det.value).to.be.equal(-2)
    })

    test('should get the determinant of a 3x3 matrix', function () {
        // Create a 3x3 matrix
        // Get the determinant of the matrix
        // Check that the result is a fraction
        // Check that the result is correct

        const v1 = new Vector(1, 2, 7)
        const v2 = new Vector(3, 4, 2)
        const v3 = new Vector(5, 6, 3)
        const M = new Matrix().fromVectors(v1, v2, v3)

        expect(M.determinant().value).toBe(-12)
    })

    test('should get the determinant of a 4x4 matrix', function () {
        // Create a 4x4 matrix
        // Get the determinant of the matrix
        // Check that the result is a fraction
        // Check that the result is correct

    })

    test('should get the cofactor', () => {
        const M = new Matrix().fromString('((1,2,3),(4,5,6),(7,8,9))')

        const C = M.cofactor(0, 1)


        expect(C.value).toBe(6)
    })

    test('should get the determinant 2x2', () => {
        const M = new Matrix().fromString('((1,2),(3,4))')
        // 1 2
        // 3 4
        expect(M.determinant().display).toBe('-2')
    })

    test('should get the determinant 4x4', () => {
        const M = new Matrix().fromString(
            '((1,2,4,1),(2,5,-2,-4),(1,0,-3,-2),(2,-1,5,1))'
        )
        // 1 2
        // 3 4
        expect(M.determinant().display).toBe('42')
    })

    test('should get the determinant wtesth polynoms 3x3', () => {
        const M = new Matrix().fromString(
            '((2-k,5,-3),(-1,3-k,0),(2,1,1-k))'
        )

        expect(M.determinant().display).toBe('-k^(3)+6k^(2)-22k+32')
    })

    test('should get the caracteristic polynom from a 3x3 matrix', () => {
        const M = new Matrix().fromString(
            '((2,5,-3),(-1,3,0),(2,1,1))'
        )

        expect(M.characteristic_polynom().display).toBe('-k^(3)+6k^(2)-22k+32')
        expect(M.characteristic_polynom('x').display).toBe('-x^(3)+6x^(2)-22x+32')
    })

})


describe('Matrix operations', () => {
    test('add two Matrix must have same dimnesion', () => {
        const A = new Matrix(2, 3)
        const B = new Matrix(3, 2)

        expect(() => A.add(B)).toThrowError()

        const C = new Matrix(2, 3)

        expect(() => A.add(C)).not.toThrowError()
    })
    test('add two Matrix', () => {
        const A = new Matrix().fromString('((1,2,3),(4,5,6)')
        const B = new Matrix().fromString('((3,4,5),(-1,-2,-3)')

        A.add(B)
        expect(A.display).toBe('((4,6,8),(3,3,3))')
    })
    test('subtract two Matrix', () => {
        const A = new Matrix().fromString('((1,2,3),(4,5,6)')
        const B = new Matrix().fromString('((3,4,5),(-1,-2,-3)')

        A.subtract(B)
        expect(A.display).toBe('((-2,-2,-2),(5,7,9))')
    })
    test('multiply two Matrix must be compatible', () => {
        const A = new Matrix(2, 3)
        const B = new Matrix(2, 6)
        const C = new Matrix(3, 2)
        const D = new Matrix(3, 6)

        expect(() => A.multiply(B)).toThrowError('Cannot multiply a matrix with incompatibles dimensions')
        expect(() => A.clone().multiply(C)).not.toThrowError()
        expect(() => A.clone().multiply(D)).not.toThrowError()
        expect(() => C.multiply(A)).not.toThrowError()
    })
    test('multiply two Matrix', () => {
        const A = new Matrix().fromString('((1,2,3),(4,5,6))')
        const B = new Matrix().fromString('((7,8),(9,-1),(-2,-3))')

        A.multiply(B)

        expect(A.display).toBe('((19,-3),(61,9))')

    })
    test('multiply matrix by scalar', () => {
        const A = new Matrix().fromString('((1,2),(3,4)')
        A.multiply(3)

        expect(A.display).toBe('((3,6),(9,12))')
    })

    test('raise Matrix by integer',()=>{
        const A = new Matrix().fromString('((1,2),(3,4)')
        A.pow(3)

        expect(A.display).toBe('((37,54),(81,118))')
    })

    test('invert a matrix', () => {
        const A = new Matrix().fromString('((1,2),(3,4)')
        A.inverse()

        expect(A.display).toBe('((-2,1),(3/2,-1/2))')
    })
})
