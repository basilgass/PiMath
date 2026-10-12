import {describe, expect, test} from "vitest"
import {
    Circle, Equation, Factor, Fraction, InvalidArgumentError, Line, Line3, LinearSystem, Matrix, Monom, Plane3,
    Point, PolyFactor, PolyMatrix, Polynom, Solution, Sphere3, Triangle, Vector
} from "../src"

describe('withDigits — Fraction', () => {
    test('shows an exact fraction as a decimal with the requested digits', () => {
        expect(new Fraction(3, 2).withDigits(2).display).toBe('1.50')
        expect(new Fraction(3, 2).withDigits(2).tex).toBe('1.50')
        expect(new Fraction(3).withDigits(1).display).toBe('3.0')
        expect(new Fraction(1, 3).withDigits(0).display).toBe('0')
    })

    test('null goes back to the default display', () => {
        const F = new Fraction(3, 2).withDigits(2)
        expect(F.withDigits(null).display).toBe('3/2')
        const approx = Fraction.fromNumber(Math.SQRT2)
        approx.exact = false
        expect(approx.display).toBe('1.414')
        expect(approx.withDigits(5).display).toBe('1.41421')
    })

    test('is chainable and copied by clone but not by copy', () => {
        const F = new Fraction(3, 2).withDigits(2)
        expect(F.clone().display).toBe('1.50')
        expect(new Fraction(1, 4).copy(F).display).toBe('3/2')
    })

    test('rejects an invalid number of digits', () => {
        for (const bad of [-1, 101, 1.5, NaN]) {
            expect(() => new Fraction(1, 2).withDigits(bad)).toThrow(InvalidArgumentError)
        }
    })

    test('infinite values are not affected', () => {
        expect(new Fraction(1).divide(0).withDigits(2).display).toBe('+oo')
    })
})

describe('withDigits — algebra', () => {
    test('Monom changes its coefficient but not its exponents', () => {
        expect(new Monom('3/2x^2').withDigits(2).display).toBe('1.50x^(2)')
    })

    test('Polynom changes every coefficient', () => {
        const P = new Polynom('1/2x^2-3/4x+2').withDigits(2)
        expect(P.display).toBe('0.50x^(2)-0.75x+2.00')
        expect(P.clone().display).toBe(P.display)
        expect(P.withDigits(null).display).toBe('1/2x^(2)-3/4x+2')
    })

    test('Factor keeps its power exact', () => {
        expect(new Factor('1/2x+1', 2).withDigits(1).display).toBe('(0.5x+1.0)^(2)')
    })

    test('PolyFactor changes the coefficients of every factor and keeps the powers exact', () => {
        const PF = new PolyFactor(new Factor('1/2x+1', 2), new Factor('x-3/2', 1)).withDigits(1)
        expect(PF.display).toBe('(0.5x+1.0)^(2)(x-1.5)')
        expect(PF.clone().display).toBe(PF.display)
    })

    test('Equation changes both members', () => {
        expect(new Equation('1/2x=3/4').withDigits(2).display).toBe('0.50x=0.75')
    })

    test('LinearSystem changes every equation', () => {
        const S = new LinearSystem('1/2x+y=3/2', 'x-y=1').withDigits(1)
        expect(S.display).toContain('0.5x')
        expect(S.display).toContain('1.5')
    })

    test('Matrix and PolyMatrix', () => {
        expect(new Matrix([[new Fraction(1, 2), 1]]).withDigits(2).display).toBe('((0.50,1.00))')
        expect(PolyMatrix.fromValues([['1/2x']]).withDigits(1).display).toContain('0.5x')
    })

    test('Solution shows its numeric value, radical included', () => {
        const S = Solution.fromString('(1+sqrt(2))/2')
        expect(S.withDigits(2).display).toBe('1.21')
        expect(S.clone().tex).toBe('1.21')
        expect(S.withDigits(null).display).not.toBe('1.21')
    })
})

describe('withDigits — geometry', () => {
    test('Point and Vector', () => {
        expect(new Point(new Fraction(1, 2), 1).withDigits(2).display).toBe('(0.50;1.00)')
        expect(new Vector(new Fraction(1, 2), 1).withDigits(1).clone().display).toBe('((0.5,1.0))')
    })

    test('Line changes every output mode and stays until it is reset', () => {
        const L = Line.fromPoints(new Point(0, 0), new Point(2, 3)).withDigits(2)
        expect(L.display).toContain('3.00x')
        expect(L.display).toContain('3.00x')
        expect(L.clone().display).toBe(L.display)
        expect(L.withDigits(null).display).not.toContain('.')
    })

    test('Line3 in parametric, system and cartesian forms', () => {
        const L = new Line3(new Point(1, 2, 3), new Vector(new Fraction(1, 2), 1, 1)).withDigits(1)
        expect(L.display).toContain('0.5')
        expect(L.asSystem.display).toContain('1.0')
        expect(L.asCartesian.display).toContain('.')
        expect(L.clone().display).toBe(L.display)
    })

    test('Plane3', () => {
        const P = new Plane3({coefficients: [new Fraction(1, 2), 1, 1, 3]}).withDigits(1)
        expect(P.display).toContain('2.0y')
        expect(P.clone().display).toBe(P.display)
    })

    test('Circle in both forms, kept by clone', () => {
        const C = Circle.fromCenterRadius(new Point(new Fraction(1, 2), 1), 2).withDigits(1)
        expect(C.display).toContain('0.5')
        expect(C.clone().display).toBe(C.display)
        expect(C.asDeveloped.display).toContain('.')
        expect(C.clone().asDeveloped.display).toContain('.')
    })

    test('Sphere3, kept by clone', () => {
        const S = Sphere3.fromCenterRadius(new Point(new Fraction(1, 2), 0, 1), 2).withDigits(1)
        expect(S.display).toContain('0.5')
        expect(S.clone().display).toBe(S.display)
    })

    test('the incenter of a triangle can be shown with 2 digits', () => {
        const T = Triangle.fromPoints(new Point(0, 0), new Point(4, 0), new Point(1, 3))
        const I = T.getBisectors().intersection
        expect(I).not.toBeNull()
        expect(I?.withDigits(2).display).toMatch(/^\(\d\.\d\d;\d\.\d\d\)$/)
    })
})
