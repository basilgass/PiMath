import {describe, expect, test} from "vitest"
import {Point, SPHERE3_RELATIVE_POSITION} from "../../src"
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
            .fromEquation('(x-1)^2+y^2+(z+3)^2=25')

        expect(C).toBeDefined()
        expect(C.center.x.value).toBe(1)
        expect(C.center.y.value).toBe(0)
        expect(C.center.z.value).toBe(-3)
        expect(C.radius.value).toBe(5)
    })
})

describe('Spheres relative position', () => {
    test('Sphere inside another', () => {
        const P = new Point(0, 0, 0)
        const C = new Sphere3(P, 5)

        const P2 = new Point(0, 0, 2)
        const C2 = new Sphere3(P2, 1)

        expect(C.relativePosition(C2)).toBe(SPHERE3_RELATIVE_POSITION.INTERIOR)

    })

    test('sphere exterior to another', () => {
        const P = new Point(0, 0, 0)
        const C = new Sphere3(P, 5)

        const P2 = new Point(0, 0, 10)
        const C2 = new Sphere3(P2, 1)

        expect(C.relativePosition(C2)).toBe(SPHERE3_RELATIVE_POSITION.EXTERIOR)

    })

    test('sphere secant to another', () => {
        const P = new Point(0, 0, 0)
        const C = new Sphere3(P, 5)

        const P2 = new Point(0, 0, 3)
        const C2 = new Sphere3(P2, 4)
        const P3 = new Point(0, 0, 7)
        const C3 = new Sphere3(P3, 4)

        expect(C.relativePosition(C2)).toBe(SPHERE3_RELATIVE_POSITION.SECANT)
        expect(C.relativePosition(C3)).toBe(SPHERE3_RELATIVE_POSITION.SECANT)

    })

    test('sphere tangent inside another', () => {
        const P = new Point(0, 0, 0)
        const C = new Sphere3(P, 5)

        const P2 = new Point(0, 0, 8)
        const C2 = new Sphere3(P2, 13)

        expect(C.relativePosition(C2)).toBe(SPHERE3_RELATIVE_POSITION.TANGENT_INSIDE)
    })

    test('sphere tangent ouside another', () => {
        const P = new Point(0, 0, 0)
        const C = new Sphere3(P, 5)

        const P2 = new Point(0, 0, 8)
        const C2 = new Sphere3(P2, 3)

        expect(C.relativePosition(C2)).toBe(SPHERE3_RELATIVE_POSITION.TANGENT_OUTSIDE)
    })

    test('sphere superposed to another', () => {
        const P = new Point(0, 0, 0)
        const C = new Sphere3(P, 5)

        const P2 = new Point(0, 0, 0)
        const C2 = new Sphere3(P2, 5)

        expect(C.relativePosition(C2)).toBe(SPHERE3_RELATIVE_POSITION.SUPERPOSED)
    })

    test('sphere concentric to another', () => {
        const P = new Point(0, 0, 0)
        const C = new Sphere3(P, 5)

        const P2 = new Point(0, 0, 0)
        const C2 = new Sphere3(P2, 6)

        expect(C.relativePosition(C2)).toBe(SPHERE3_RELATIVE_POSITION.CONCENTRIC)
    })
})