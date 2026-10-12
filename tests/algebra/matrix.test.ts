import {describe, expect, test} from "vitest"
import {MathError, Matrix, PolyMatrix, Vector} from "../../src"

describe('Matrix creation', () => {
    test('fromString parses single-row matrix', () => {
        const M = Matrix.fromString('((1,2,3))')
        expect(M.dimension).toEqual({rows: 1, cols: 3})
        expect(M.values[0][0].display).toBe('1')
        expect(M.values[0][2].display).toBe('3')
    })
    test('isOne returns false for non-square matrix', () => {
        const M = Matrix.fromString('((1,0,0),(0,1,0))')
        expect(M.isOne()).toBe(false)
    })
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

        const M = Matrix.fromString(str)

        expect(M.values[0][1].display).toEqual('2')
        expect(M.display).toEqual(str)
    })
    test('copy replaces mathematical state without sharing references', () => {
        const A = Matrix.fromString('((1,2),(3,4))')
        const B = Matrix.fromString('((5,6),(7,8))')

        A.copy(B)

        expect(A.display).toBe('((5,6),(7,8))')
        B.setValue(0, 0, 99)
        expect(A.values[0][0].display).toBe('5')
    })
    test('clone Matrix', () => {
        const A = Matrix.fromString('((1,2),(3,4))')

        const B = A.clone()

        B.setValue(0, 0, -5)

        expect(A.values[0][0].display).toBe('1')
        expect(B.values[0][0].display).toBe('-5')

        expect(A.values[0][1].display).toBe('2')
        expect(B.values[0][1].display).toBe('2')
    })
    test('set to zero Matrix', () => {
        const M = Matrix.fromString('((1,2),(3,4))')

        M.zero()
        M.forEach(aij => {
            expect(aij.value).toBe(0)
        })
    })
    test('set to one Matrix', () => {
        const M = Matrix.fromString('((1,2),(3,4))')

        M.one()
        M.forEach((aij, row, column) => {
            expect(aij.value).toBe(
                row === column ? 1 : 0
            )
        })
    })
    test('constructor accepts string', () => {
        const M = new Matrix('((1,2),(3,4))')
        expect(M.display).toBe('((1,2),(3,4))')
    })
    test('constructor accepts 2D array', () => {
        const M = new Matrix([[1, 2], [3, 4]])
        expect(M.display).toBe('((1,2),(3,4))')
    })
})
describe('Matrix output', () => {
    test('toFixed is a one-shot option (resets after display)', () => {
        const A = Matrix.fromString('((1,2),(3,4))')
        A.inverse()

        expect(A.toFixed(3).display).toBe('((-2,1),(1.5,-0.5))')
        expect(A.display).toBe('((-2,1),(3/2,-1/2))')
    })
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

        expect(M.asBmatrix.tex).toBe(`\\begin{bmatrix}
\t1 & 3 & 5\\\\
\t2 & 4 & 6\\\\
\\end{bmatrix}`)

        expect(M.tex).not.toBe(`\\begin{pmatrix}
\t1 & 3 & 5\\\\
\t2 & 4 & 6\\\\
\\end{pmatrix}`)

        expect(M.asPmatrix.tex).toBe(`\\begin{pmatrix}
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
        expect(M.asBmatrix.display).toBe('[(2,5),(-2,-5)]')
        expect(M.display).not.toBe('((2,5),(-2,-5))')
        expect(M.asPmatrix.display).toBe('((2,5),(-2,-5))')
    })
})

describe('Geometry Matrix', function () {
    test('aij returns null for out-of-bounds index', () => {
        const M = Matrix.fromString('((1,2),(3,4))')

        expect(M.aij(0, 0)?.display).toBe('1')
        expect(M.aij(1, 1)?.display).toBe('4')
        expect(M.aij(2, 0)).toBeNull()
        expect(M.aij(0, 2)).toBeNull()
        expect(M.aij(-1, 0)).toBeNull()
    })
    test('should create a matrix from 2 vectors', function () {
        const M = Matrix.fromVectors(
            new Vector(1, 2),
            new Vector(3, 4)
        )

        expect(M).toBeDefined()
        expect(M.values.length).to.be.equal(2)
        expect(M.rows[1][1].display).to.be.equal('4')
    })

    test('should get the determinant of a 3x3 matrix', function () {
        const v1 = new Vector(1, 2, 7)
        const v2 = new Vector(3, 4, 2)
        const v3 = new Vector(5, 6, 3)
        const M = Matrix.fromVectors(v1, v2, v3)

        expect(M.determinant().value).toBe(-12)
    })

    test('should get the cofactor', () => {
        const M = Matrix.fromString('((1,2,3),(4,5,6),(7,8,9))')

        const C = M.cofactor(0, 1)

        expect(C.value).toBe(6)
    })

    test('should get the determinant 2x2', () => {
        const M = Matrix.fromString('((1,2),(3,4))')
        expect(M.determinant().display).toBe('-2')
    })

    test('should get the determinant 4x4', () => {
        const M = Matrix.fromString(
            '((1,2,4,1),(2,5,-2,-4),(1,0,-3,-2),(2,-1,5,1))'
        )
        expect(M.determinant().display).toBe('42')
    })
})

describe('PolyMatrix', () => {
    test('should get the determinant with polynoms 3x3', () => {
        const M = PolyMatrix.fromString(
            '((2-k,5,-3),(-1,3-k,0),(2,1,1-k))'
        )

        expect(M.determinant().display).toBe('-k^(3)+6k^(2)-22k+32')
    })

    test('should get the characteristic polynom from a 3x3 matrix', () => {
        const M = PolyMatrix.fromString(
            '((2,5,-3),(-1,3,0),(2,1,1))'
        )

        expect(M.characteristic_polynom().display).toBe('-k^(3)+6k^(2)-22k+32')
        expect(M.characteristic_polynom('x').display).toBe('-x^(3)+6x^(2)-22x+32')
    })
    test('characteristic_polynom throws for non-square matrix', () => {
        const M = PolyMatrix.fromString('((1,2,3),(4,5,6))')
        expect(() => M.characteristic_polynom()).toThrow()
    })
    test('characteristic_polynom on 1x1 matrix', () => {
        const M = PolyMatrix.fromString('((5))')
        expect(M.characteristic_polynom().display).toBe('-k+5')
    })
    test('characteristic_polynom on 2x2 matrix', () => {
        const M = PolyMatrix.fromString('((1,2),(3,4))')
        expect(M.characteristic_polynom().display).toBe('k^(2)-5k-2')
    })
    test('fromValues creates PolyMatrix from 2D array', () => {
        const M = PolyMatrix.fromValues([['1', '2'], ['3', '4']])
        expect(M.dimension).toEqual({rows: 2, cols: 2})
        expect(M.values[0][0].display).toBe('1')
        expect(M.values[1][1].display).toBe('4')
    })
    test('fromVectors creates PolyMatrix from vectors', () => {
        const M = PolyMatrix.fromVectors(new Vector(1, 2), new Vector(3, 4))
        expect(M.dimension).toEqual({rows: 2, cols: 2})
        expect(M.values[0][0].display).toBe('1')
        expect(M.values[1][1].display).toBe('4')
    })
    test('fromMatrix creates PolyMatrix from Matrix', () => {
        const M = Matrix.fromString('((1,2),(3,4))')
        const PM = PolyMatrix.fromMatrix(M)
        expect(PM.dimension).toEqual({rows: 2, cols: 2})
        expect(PM.values[0][0].display).toBe('1')
        expect(PM.values[1][1].display).toBe('4')
    })
})

describe('Matrix echelon forms', () => {
    test('withPartition inserts | separator in display', () => {
        const M = Matrix.fromValues([[1, 2, 3], [4, 5, 6]])
        M.withPartition(2)
        expect(M.display).toBe('((1,2|3),(4,5|6))')
    })

    test('withPartition uses array environment in tex', () => {
        const M = Matrix.fromValues([[1, 2, 3], [4, 5, 6]])
        M.withPartition(2)
        expect(M.tex).toBe(`\\left(\\begin{array}{cc|c}
\t1 & 2 & 3\\\\
\t4 & 5 & 6\\\\
\\end{array}\\right)`)
    })

    test('clone preserves partition', () => {
        const M = Matrix.fromValues([[1, 2, 3], [4, 5, 6]])
        M.withPartition(2)
        const B = M.clone()
        expect(B.display).toBe('((1,2|3),(4,5|6))')
    })

    test('withPartition out of range throws', () => {
        const M = Matrix.fromString('((1,2,3),(4,5,6))')
        expect(() => M.withPartition(0)).toThrow()
        expect(() => M.withPartition(3)).toThrow()
    })

    test('rowEchelonForm returns upper-triangular matrix without modifying receiver', () => {
        const M = Matrix.fromString('((2,4,6),(1,2,5),(3,1,1))')
        const ref = M.rowEchelonForm()
        expect(M.display).toBe('((2,4,6),(1,2,5),(3,1,1))')
        expect(ref.values[1][0].isZero()).toBe(true)
        expect(ref.values[2][0].isZero()).toBe(true)
        expect(ref.values[2][1].isZero()).toBe(true)
    })

    test('reducedRowEchelonForm of full-rank matrix gives identity block', () => {
        const M = Matrix.fromString('((1,2,3),(4,5,6),(7,8,10))')
        const rref = M.reducedRowEchelonForm()
        expect(M.display).toBe('((1,2,3),(4,5,6),(7,8,10))')
        expect(rref.isOne()).toBe(true)
    })

    test('reducedRowEchelonForm on augmented matrix extracts solution', () => {
        const aug = Matrix.fromValues([[2, 1, 5], [1, 3, 10]]).withPartition(2)
        const rref = aug.reducedRowEchelonForm()
        expect(rref.values[0][2].display).toBe('1')
        expect(rref.values[1][2].display).toBe('3')
    })

    test('rank of full-rank matrix equals its row count', () => {
        const M = Matrix.fromString('((1,2,3),(4,5,6),(7,8,10))')
        expect(M.rank()).toBe(3)
    })

    test('rank of rank-deficient matrix', () => {
        const M = Matrix.fromValues([[1, 2, 3], [2, 4, 6], [3, 6, 9]])
        expect(M.rank()).toBe(1)
    })

    test('isConsistent returns true when no contradiction row exists', () => {
        const M = Matrix.fromString('((1,0,3),(0,1,2))').withPartition(2)
        expect(M.isConsistent()).toBe(true)
    })

    test('isConsistent returns false when a [0…0|c≠0] row exists', () => {
        const M = Matrix.fromValues([[1, 0, 3], [0, 0, 1]]).withPartition(2)
        expect(M.isConsistent()).toBe(false)
    })

    test('isConsistent returns true when no partition is set', () => {
        const M = Matrix.fromString('((1,0),(0,1))')
        expect(M.isConsistent()).toBe(true)
    })
})

describe('Matrix operations', () => {
    test('add two Matrix must have same dimension', () => {
        const A = new Matrix(2, 3)
        const B = new Matrix(3, 2)

        expect(() => A.add(B)).toThrowError()

        const C = new Matrix(2, 3)

        expect(() => A.add(C)).not.toThrowError()
    })
    test('add two Matrix', () => {
        const A = Matrix.fromString('((1,2,3),(4,5,6))')
        const B = Matrix.fromString('((3,4,5),(-1,-2,-3))')

        A.add(B)
        expect(A.display).toBe('((4,6,8),(3,3,3))')
    })
    test('subtract two Matrix', () => {
        const A = Matrix.fromString('((1,2,3),(4,5,6))')
        const B = Matrix.fromString('((3,4,5),(-1,-2,-3))')

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
        const A = Matrix.fromString('((1,2,3),(4,5,6))')
        const B = Matrix.fromString('((7,8),(9,-1),(-2,-3))')

        A.multiply(B)

        expect(A.display).toBe('((19,-3),(61,9))')
    })
    test('multiply matrix by scalar', () => {
        const A = Matrix.fromString('((1,2),(3,4))')
        A.multiply(3)

        expect(A.display).toBe('((3,6),(9,12))')
    })

    test('raise Matrix by integer', () => {
        const A = Matrix.fromString('((1,2),(3,4))')
        A.pow(3)

        expect(A.display).toBe('((37,54),(81,118))')
    })

    test('invert a matrix', () => {
        const A = Matrix.fromString('((1,2),(3,4))')
        A.inverse()

        expect(A.display).toBe('((-2,1),(3/2,-1/2))')
    })

    test('inverse throws for singular matrix', () => {
        const M = Matrix.fromString('((1,2),(2,4))')
        expect(() => M.inverse()).toThrow()
    })

    test('transpose of a square matrix returns a new instance', () => {
        const A = Matrix.fromString('((1,2),(3,4))')
        const B = A.transpose()

        expect(B.display).toBe('((1,3),(2,4))')
        expect(A.display).toBe('((1,2),(3,4))')
    })

    test('transpose of a non-square matrix swaps dimensions', () => {
        const A = Matrix.fromString('((1,2,3),(4,5,6))')
        const B = A.transpose()

        expect(B.dimension).toEqual({rows: 3, cols: 2})
        expect(B.display).toBe('((1,4),(2,5),(3,6))')
        expect(A.dimension).toEqual({rows: 2, cols: 3})
    })
})

describe('Matrix 1x1', () => {
    test('determinant and cofactor of a 1x1 matrix', () => {
        const M = new Matrix([[5]])
        expect(M.determinant().display).toBe('5')
        expect(M.cofactor(0, 0).display).toBe('1')
    })

    test('inverse of a 1x1 matrix is 1/a', () => {
        const M = new Matrix([[4]]).inverse()
        expect(M.values[0][0].display).toBe('1/4')
        expect(new Matrix([[-2]]).inverse().values[0][0].display).toBe('-1/2')
    })

    test('a 1x1 zero matrix cannot be inverted', () => {
        expect(new Matrix([[0]]).canBeInverted()).toBe(false)
        expect(() => new Matrix([[0]]).inverse()).toThrow(MathError)
    })
})
