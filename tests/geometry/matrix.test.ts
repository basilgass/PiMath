import { describe, expect, it } from "vitest"
import { Matrix } from "../../src/geometry/matrix"
import { Vector } from "../../src/geometry/vector"


describe('Geometry Matrix', function () {
    it('should create a matrix from 2 vectors', function () {
        // Create a matrix from 2 vectors
        // Check that the matrix is created
        // Check that the matrix has the right values

        const M = new Matrix(
            new Vector(1, 2),
            new Vector(3, 4)
        )

        expect(M).toBeDefined()
        expect(M.values.length).to.be.equal(2)

    })

    it('should get the determinant of a 2x2 matrix', function () {
        // Create a 2x2 matrix
        // Get the determinant of the matrix
        // Check that the result is a fraction
        // Check that the result is correct

        const M = new Matrix(
            new Vector(1, 2),
            new Vector(3, 4)
        )

        const det = M.determinant()
        expect(det).toBeDefined()
        expect(det.value).to.be.equal(-2)
    })

    it('should get the determinant of a 3x3 matrix', function () {
        // Create a 3x3 matrix
        // Get the determinant of the matrix
        // Check that the result is a fraction
        // Check that the result is correct

    })

    it('should get the determinant of a 4x4 matrix', function () {
        // Create a 4x4 matrix
        // Get the determinant of the matrix
        // Check that the result is a fraction
        // Check that the result is correct

    })
})