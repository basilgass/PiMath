import {describe, expect, test} from "vitest"
import {Line, Point, Triangle} from "../../src"

describe('triangle creation', () => {
    test('create triangle from three points', () => {
        const T = new Triangle(
            new Point(1, 2),
            new Point(5, 2),
            new Point(5, 5)
        )

        expect(T).toBeDefined()
        expect(T.A).toBeDefined()
        expect(T.A.x.value).toBe(1)
        expect(T.A.y.value).toBe(2)
        expect(T.B.x.value).toBe(5)
        expect(T.B.y.value).toBe(2)
        expect(T.C.x.value).toBe(5)
        expect(T.C.y.value).toBe(5)
        expect(T.isValid).toBe(true)
    })

    test('create triangle from three lines', () => {
        const T = Triangle.fromLines(
            "3x+2y-7=0",
            "2x-3y+4=0",
            "7x-4y-25=0"
        )

        expect(T).toBeInstanceOf(Triangle)
        expect(T.A.display).toBe("(3;-1)")
        expect(T.B.display).toBe("(1;2)")
        expect(T.C.display).toBe("(7;6)")
    })

    test('create triangle from six coordinates', () => {
        const T = Triangle.fromCoordinates(1, 2, 5, 2, 5, 5)
        expect(T.A.x.value).toBe(1)
        expect(T.B.x.value).toBe(5)
        expect(T.C.y.value).toBe(5)
    })

    test('fromPoints throws on collinear points', () => {
        expect(() => Triangle.fromPoints(
            new Point(0, 0), new Point(1, 1), new Point(2, 2)
        )).toThrow()
    })

    test('fromPoints throws on superimposed points', () => {
        expect(() => Triangle.fromPoints(
            new Point(1, 2), new Point(1, 2), new Point(5, 5)
        )).toThrow()
    })

    test('fromLines throws on parallel lines', () => {
        expect(() => Triangle.fromLines(
            new Line('x=0'),
            new Line('x=1'),
            new Line('y=0')
        )).toThrow()
    })

    test('clone triangle — vertices are independent', () => {
        const T = new Triangle(
            new Point(1, 2),
            new Point(5, 2),
            new Point(5, 5)
        )

        const cloned = T.clone()
        cloned.A = new Point(8, 11)
        expect(T.A.display).toBe('(1;2)')
        expect(cloned.A.display).toBe('(8;11)')
    })

    test('clone preserves #radians option', () => {
        const T = new Triangle(
            new Point(0, 0), new Point(1, 0), new Point(1, 1)
        )
        const cloned = T.asDegree.clone()
        expect(cloned.getAngle('B')).toBe(90)
    })

    test('copy resets cached remarquables', () => {
        const T1 = new Triangle(new Point(0, 0), new Point(6, 2), new Point(4, 10))
        const T2 = new Triangle(new Point(1, 2), new Point(5, 2), new Point(5, 5))

        T1.getMedians()
        T1.copy(T2)
        expect(T1.remarquables.medians).toBeNull()
    })
})

describe('triangle comparisons', () => {
    const T = new Triangle(
        new Point(1, 2),
        new Point(4, 2),
        new Point(5, 5)
    )

    const Tiso = new Triangle(
        new Point(1, 1),
        new Point(5, -1),
        new Point(8, 10)
    )

    const Tequ = Triangle.fromPoints(
        new Point(0, 0),
        new Point(10, 0),
        new Point(5, Math.sqrt(75))
    )

    const Trec = new Triangle(
        new Point(1, 1),
        new Point(5, -1),
        new Point(8, 5)
    )

    test('equal triangle', () => {
        expect(T.isEqual(T)).toBe(true)
        expect(T.isEqual(Tiso)).toBe(false)
    })

    test('is triangle rectangle', () => {
        expect(T.isRectangle()).toBe(false)
        expect(Trec.isRectangle()).toBe(true)
    })

    test('is triangle isocele', () => {
        expect(T.isIsocele()).toBe(false)
        expect(Tiso.isIsocele()).toBe(true)
        expect(Tequ.isIsocele()).toBe(true)
    })

    test('is triangle equilateral', () => {
        expect(T.isEquilateral()).toBe(false)
        expect(Tiso.isEquilateral()).toBe(false)
        expect(Tequ.isEquilateral()).toBe(true)
    })
})

describe('triangle operations', () => {
    test('get angle in degrees', () => {
        const T = Triangle.fromPoints(
            new Point(0, 0),
            new Point(1, 0),
            new Point(1, 1)
        )

        expect(T.asDegree.getAngle('A')).toBe(45)
        expect(T.asDegree.getAngle('B')).toBe(90)
        expect(T.asDegree.getAngle('C')).toBe(45)
    })

    test('get angle in radians', () => {
        const T = Triangle.fromPoints(
            new Point(0, 0),
            new Point(4, 0),
            new Point(4, 3)
        )

        const d = 12
        expect(+T.asRadians.getAngle('A').toFixed(d)).toBe(+Math.asin(3 / 5).toFixed(d))
        expect(+T.asRadians.getAngle('B').toFixed(d)).toBe(+(Math.PI / 2).toFixed(d))
        expect(+T.asRadians.getAngle('C').toFixed(d)).toBe(+Math.acos(3 / 5).toFixed(d))
    })
})

describe('triangle remarquable lines', () => {
    const T = new Triangle(
        new Point(0, 0),
        new Point(6, 2),
        new Point(4, 10)
    )

    test('get medianes', () => {
        const {A, B, C, intersection} = T.getMedians()

        expect(A.asCanonical.display).toBe('6x-5y=0')
        expect(B.asCanonical.display).toBe('3x+4y-26=0')
        expect(C.asCanonical.display).toBe('9x-y-26=0')
        expect(intersection?.display).toBe('(10/3;4)')
    })

    test('get mediators', () => {
        const {a, b, c, intersection} = T.getMediators()

        expect(a.asCanonical.display).toBe('x-4y+19=0')
        expect(b.asCanonical.display).toBe('2x+5y-29=0')
        expect(c.asCanonical.display).toBe('3x+y-10=0')
        expect(intersection?.display).toBe('(21/13;67/13)')
    })

    test('get heights', () => {
        const {A, B, C, intersection} = T.getHeights()

        expect(A.asCanonical.display).toBe('x-4y=0')
        expect(B.asCanonical.display).toBe('2x+5y-22=0')
        expect(C.asCanonical.display).toBe('3x+y-22=0')
        expect(intersection?.display).toBe('(88/13;22/13)')
    })

    test('get internal bissectors', () => {
        const T2 = Triangle.fromLines(
            '-3x+4y-25=0',
            '3x+4y-25=0',
            'y=-5'
        )

        const {A, B, C, intersection} = T2.getBisectors()

        expect(A.asCanonical.display).toBe('x-3y=0')
        expect(B.asCanonical.display).toBe('x=0')
        expect(C.asCanonical.display).toBe('x+3y=0')
        expect(intersection?.display).toBe('(0;0)')
    })

    test('get external bissectors', () => {
        const T2 = Triangle.fromLines(
            '-3x+4y-25=0',
            '3x+4y-25=0',
            'y=-5'
        )
        const {A, B, C} = T2.getBisectors(false)
        expect(A).toBeDefined()
        expect(B).toBeDefined()
        expect(C).toBeDefined()
    })

    test('remarquable methods throw on degenerate triangle', () => {
        const T3 = new Triangle(new Point(0, 0), new Point(1, 0), new Point(5, 5))
        T3.B = new Point(0, 0)
        expect(() => T3.getMedians()).toThrow()
        expect(() => T3.getMediators()).toThrow()
        expect(() => T3.getHeights()).toThrow()
        expect(() => T3.getBisectors()).toThrow()
    })
})

describe.skip('triangle static functions')

describe.skip('triangle generators')
