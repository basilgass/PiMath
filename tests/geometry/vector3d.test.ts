import { describe, expect, it } from "vitest"
import { Vector3D } from "../../src/geometry/vector3d"
import { determinant } from "../../src/geometry/geomMath"
import { createLogger } from "vite"

describe('Geometry Vector3D', function () {

    it('should create a vector from 3 numbers', function () {
        // Create a vector from 3 numbers
        // Check that the vector is created
        // Check that the vector has the right coordinates

        const v = new Vector3D(1, 2, 3)
        expect(v).toBeDefined()
        expect(v.x.display).to.be.equal('1')
    })

    it('should get the cross product of 2 vectors', function () {
        // Create 2 vectors
        // Get the cross product of the 2 vectors
        // Check that the result is a vector
        // Check that the result has the right coordinates

        const v1 = new Vector3D(2, -1, 4)
        const v2 = new Vector3D(-2, 3, 1)
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

        const v1 = new Vector3D(
            -6, -2, -2
        )
        const v2 = new Vector3D(
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

        const v1 = new Vector3D(2, 9, 6)
        const v2 = new Vector3D(-4, 7, 4)
        const v3 = new Vector3D(-2, 4, 7)
        const det = determinant(v1.clone(), v2.clone(), v3.clone())
        expect(det).toBeDefined()
        console.log(det.value / 6)

        expect(det.value).to.be.equal(-43)
    })
})