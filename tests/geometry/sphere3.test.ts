import {describe, expect, test} from "vitest"
import {Point} from "../../src"
import {Sphere3} from "../../src/geometry/sphere3"


describe('Sphere creation', () => {
    test('create Sphere', () => {
        const P = new Point(1, 0, -3)
        const C = new Sphere3(P, 5)

        expect(C).toBeDefined()
        expect(C.center.x.value).toBe(1)
        expect(C.center.y.value).toBe(0)
        expect(C.center.z.value).toBe(-3)
        expect(C.radius.value).toBe(5)
    })

    test('create Sphere from string', () => {
        const C = new Sphere3()
            .fromPolynom('(x-1)^2+y^2+(z+3)^2=25')

        expect(C).toBeDefined()
        expect(C.center.x.value).toBe(1)
        expect(C.center.y.value).toBe(0)
        expect(C.center.z.value).toBe(-3)
        expect(C.radius.value).toBe(5)
    })
})