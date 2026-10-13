import {describe, expect, test} from "vitest"
import {Equation, MathError, Point, Sphere3RelativePosition} from "../../src"
import {Sphere3} from "../../src/geometry/sphere3"


describe('Sphere creation', () => {
    test('create from center and radius', () => {
        const C = new Sphere3(new Point(1, 0, -3), 5)

        expect(C.center.x.value).toBe(1)
        expect(C.center.y.value).toBe(0)
        expect(C.center.z.value).toBe(-3)
        expect(C.radius.value).toBe(5)
    })

    test('create from string', () => {
        const C = new Sphere3('(x-1)^2+y^2+(z+3)^2=25')

        expect(C.center.x.value).toBe(1)
        expect(C.center.y.value).toBe(0)
        expect(C.center.z.value).toBe(-3)
        expect(C.radius.value).toBe(5)
    })

    test('create from Equation', () => {
        const C = new Sphere3(new Equation('(x-1)^2+y^2+(z+3)^2=25'))

        expect(C.center.x.value).toBe(1)
        expect(C.center.y.value).toBe(0)
        expect(C.center.z.value).toBe(-3)
        expect(C.radius.value).toBe(5)
    })

    test('create copy from Sphere3', () => {
        const original = new Sphere3(new Point(1, 0, -3), 5)
        const copy = new Sphere3(original)

        expect(copy.center.x.value).toBe(1)
        expect(copy.center.y.value).toBe(0)
        expect(copy.center.z.value).toBe(-3)
        expect(copy.radius.value).toBe(5)
    })

    test('static fromCenterRadius', () => {
        const C = Sphere3.fromCenterRadius(new Point(1, 0, -3), 5)

        expect(C.center.x.value).toBe(1)
        expect(C.center.z.value).toBe(-3)
        expect(C.radius.value).toBe(5)
    })

    test('static fromString', () => {
        const C = Sphere3.fromString('(x-1)^2+y^2+(z+3)^2=25')

        expect(C.center.x.value).toBe(1)
        expect(C.center.y.value).toBe(0)
        expect(C.center.z.value).toBe(-3)
        expect(C.radius.value).toBe(5)
    })

    test('fromEquation normalises equations with non-unit leading coefficient', () => {
        // 2x²+2y²+2z²-4x=50 ≡ x²+y²+z²-2x-25=0 → center=(1,0,0), r²=26
        const C = Sphere3.fromString('2x^2+2y^2+2z^2-4x=50')

        expect(C.center.x.value).toBe(1)
        expect(C.center.y.value).toBe(0)
        expect(C.center.z.value).toBe(0)
        expect(C.squareRadius.value).toBe(26)
    })

    test('fromEquation throws when a variable is not degree 2', () => {
        expect(() => Sphere3.fromEquation(new Equation('x^2+y^2=25'))).toThrow(MathError)
    })

    test('fromEquation throws when leading coefficients are unequal', () => {
        expect(() => Sphere3.fromEquation(new Equation('x^2+2*y^2+z^2=25'))).toThrow(MathError)
    })
})

describe('Sphere clone and copy', () => {
    test('clone produces an independent instance with same values', () => {
        const C = new Sphere3(new Point(1, 2, 3), 4)
        const C2 = C.clone()

        expect(C2.center.x.value).toBe(1)
        expect(C2.radius.value).toBe(4)
    })

    test('clone preserves display format', () => {
        const C = new Sphere3(new Point(1, 0, -3), 5)
        void C.asDeveloped
        const C2 = C.clone()

        expect(C2.display).toBe(C.display)
    })

    test('copy transfers mathematical state', () => {
        const source = new Sphere3(new Point(2, 3, 4), 6)
        const target = new Sphere3(new Point(0, 0, 0), 1)
        target.copy(source)

        expect(target.center.x.value).toBe(2)
        expect(target.radius.value).toBe(6)
    })

    test('copy resets display format to default', () => {
        const C1 = new Sphere3(new Point(1, 0, 0), 5)
        void C1.asDeveloped

        const C2 = new Sphere3(new Point(0, 0, 0), 3)
        C1.copy(C2)

        // Both should now produce the same CENTER_RADIUS output
        expect(C1.display).toBe(C2.display)
    })
})

describe('Sphere tex and display output', () => {
    test('center-radius format for sphere centered at origin', () => {
        const C = new Sphere3(new Point(0, 0, 0), 3)

        expect(C.display).toBe('x^2+y^2+z^2=9')
        expect(C.tex).toBe('x^2+y^2+z^2=9')
    })

    test('center-radius format for sphere with non-zero center', () => {
        const C = new Sphere3(new Point(1, 0, -3), 5)

        expect(C.display).toBe('(x-1)^2+y^2+(z+3)^2=25')
    })

    test('developed format returns the expanded equation', () => {
        const C = new Sphere3(new Point(1, 0, -3), 5)
        void C.asDeveloped

        expect(C.display).not.toBe('(x-1)^2+y^2+(z+3)^2=25')
        // developed form should contain the expanded polynomial on the left
        expect(C.display).toContain('=0')
    })

    test('asCenterRadius restores center-radius format after asDeveloped', () => {
        const C = new Sphere3(new Point(1, 0, -3), 5)
        const defaultDisplay = C.display
        void C.asDeveloped.asCenterRadius

        expect(C.display).toBe(defaultDisplay)
    })
})

describe('Sphere isPointOnSphere', () => {
    test('point on the sphere returns true', () => {
        // (x-1)^2+y^2+(z+3)^2=25, e.g. point (6,0,-3): (6-1)^2=25 ✓
        const C = new Sphere3(new Point(1, 0, -3), 5)

        expect(C.isPointOnSphere(new Point(6, 0, -3))).toBe(true)
    })

    test('point at center returns false', () => {
        const C = new Sphere3(new Point(1, 0, -3), 5)

        expect(C.isPointOnSphere(new Point(1, 0, -3))).toBe(false)
    })

    test('point outside the sphere returns false', () => {
        const C = new Sphere3(new Point(0, 0, 0), 3)

        expect(C.isPointOnSphere(new Point(10, 0, 0))).toBe(false)
    })
})

describe('Sphere isEqual', () => {
    test('two spheres with same center and radius are equal', () => {
        const C1 = new Sphere3(new Point(1, 2, 3), 5)
        const C2 = new Sphere3(new Point(1, 2, 3), 5)

        expect(C1.isEqual(C2)).toBe(true)
    })

    test('spheres with different centers are not equal', () => {
        const C1 = new Sphere3(new Point(0, 0, 0), 5)
        const C2 = new Sphere3(new Point(1, 0, 0), 5)

        expect(C1.isEqual(C2)).toBe(false)
    })

    test('spheres with same center but different radius are not equal', () => {
        const C1 = new Sphere3(new Point(0, 0, 0), 5)
        const C2 = new Sphere3(new Point(0, 0, 0), 3)

        expect(C1.isEqual(C2)).toBe(false)
    })

    test('isEqual is consistent with construction from equation', () => {
        const C1 = new Sphere3(new Point(1, 0, -3), 5)
        const C2 = Sphere3.fromString('(x-1)^2+y^2+(z+3)^2=25')

        expect(C1.isEqual(C2)).toBe(true)
    })
})

describe('Spheres relative position', () => {
    test('Sphere inside another', () => {
        const C = new Sphere3(new Point(0, 0, 0), 5)
        const C2 = new Sphere3(new Point(0, 0, 2), 1)

        expect(C.relativePosition(C2)).toBe(Sphere3RelativePosition.INTERIOR)
    })

    test('sphere exterior to another', () => {
        const C = new Sphere3(new Point(0, 0, 0), 5)
        const C2 = new Sphere3(new Point(0, 0, 10), 1)

        expect(C.relativePosition(C2)).toBe(Sphere3RelativePosition.EXTERIOR)
    })

    test('sphere secant to another', () => {
        const C = new Sphere3(new Point(0, 0, 0), 5)
        const C2 = new Sphere3(new Point(0, 0, 3), 4)
        const C3 = new Sphere3(new Point(0, 0, 7), 4)

        expect(C.relativePosition(C2)).toBe(Sphere3RelativePosition.SECANT)
        expect(C.relativePosition(C3)).toBe(Sphere3RelativePosition.SECANT)
    })

    test('sphere tangent inside another', () => {
        const C = new Sphere3(new Point(0, 0, 0), 5)
        const C2 = new Sphere3(new Point(0, 0, 8), 13)

        expect(C.relativePosition(C2)).toBe(Sphere3RelativePosition.TANGENT_INSIDE)
    })

    test('sphere tangent outside another', () => {
        const C = new Sphere3(new Point(0, 0, 0), 5)
        const C2 = new Sphere3(new Point(0, 0, 8), 3)

        expect(C.relativePosition(C2)).toBe(Sphere3RelativePosition.TANGENT_OUTSIDE)
    })

    test('sphere superposed to another', () => {
        const C = new Sphere3(new Point(0, 0, 0), 5)
        const C2 = new Sphere3(new Point(0, 0, 0), 5)

        expect(C.relativePosition(C2)).toBe(Sphere3RelativePosition.SUPERPOSED)
    })

    test('sphere concentric to another', () => {
        const C = new Sphere3(new Point(0, 0, 0), 5)
        const C2 = new Sphere3(new Point(0, 0, 0), 6)

        expect(C.relativePosition(C2)).toBe(Sphere3RelativePosition.CONCENTRIC)
    })
})
