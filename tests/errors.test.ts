import {describe, expect, test} from "vitest"
import {
    PiMathError,
    ParseError,
    DimensionError,
    MathError,
    InvalidArgumentError,
    NotImplementedError,
    IndexError,
    StateError
} from "../src/errors"
import {Polynom} from "../src/algebra/polynom"
import {Line} from "../src/geometry/line"
import {Matrix} from "../src/algebra/matrix"
import {Factor} from "../src/algebra/factor"
import {Vector} from "../src/geometry/vector"
import {Fraction} from "../src/coefficients/fraction"
import {Sphere3} from "../src/geometry/sphere3"

describe("Error hierarchy", () => {
    const cases: [string, new (m: string) => PiMathError][] = [
        ["ParseError", ParseError],
        ["DimensionError", DimensionError],
        ["MathError", MathError],
        ["InvalidArgumentError", InvalidArgumentError],
        ["NotImplementedError", NotImplementedError],
        ["IndexError", IndexError],
        ["StateError", StateError]
    ]

    test.each(cases)("%s extends PiMathError and Error", (name, Klass) => {
        const e = new Klass("boom")

        expect(e).toBeInstanceOf(PiMathError)
        expect(e).toBeInstanceOf(Error)
        expect(e.name).toBe(name)
        expect(e.message).toBe("boom")
    })

    test("cause is chained through the standard option", () => {
        const cause = new Error("root cause")
        const e = new ParseError("wrapped", {cause})

        expect(e.cause).toBe(cause)
    })
})

describe("Typed throws (first pass)", () => {
    test("malformed Polynom throws a ParseError", () => {
        expect(() => new Polynom("6x+4)")).toThrow(ParseError)
    })

    test("ParseError from parsing wraps the original error as cause", () => {
        try {
            new Polynom("6x+4)")
            expect.unreachable("should have thrown")
        } catch (e) {
            expect(e).toBeInstanceOf(ParseError)
            expect((e as ParseError).cause).toBeDefined()
        }
    })

    test("S1: malformed Line string throws a ParseError instead of a half-built Line", () => {
        expect(() => new Line("this is not a line")).toThrow(ParseError)
    })

    test("S2: isDeveloped propagates on invalid input instead of returning false", () => {
        const P = new Polynom("x^2+x")

        // Valid, developed
        expect(P.isDeveloped("x^2+x")).toBeTruthy()
        // Valid but with parentheses => not developed (early return, no throw)
        expect(P.isDeveloped("x(x+1)")).toBeFalsy()
        // Malformed without parentheses => throws (no more silent false).
        // A string with a parenthesis would return false at the early check,
        // so we use "6x+4}" to actually reach the parser.
        expect(() => P.isDeveloped("6x+4}")).toThrow(ParseError)
    })

    test("PiMath errors are all catchable through the PiMathError base", () => {
        expect(() => new Polynom("6x+4)")).toThrow(PiMathError)
    })
})

describe("Typed throws (phase 2)", () => {
    test("DimensionError: incompatible matrix addition", () => {
        expect(() => new Matrix(2, 3).add(new Matrix(3, 2))).toThrow(DimensionError)
    })

    test("DimensionError: incompatible matrix multiplication", () => {
        expect(() => new Matrix(2, 3).multiply(new Matrix(2, 6))).toThrow(DimensionError)
    })

    test("DimensionError: cross product requires 3D vectors", () => {
        expect(() => new Vector(1, 2).cross(new Vector(3, 4))).toThrow(DimensionError)
    })

    test("MathError: two factors cannot be added", () => {
        expect(() => new Factor("3x+2", "1/2").add()).toThrow(MathError)
    })

    test("MathError: cannot take the square root of a polynom", () => {
        expect(() => new Polynom("x^2+1").sqrt()).toThrow(MathError)
    })

    test("DimensionError and MathError are both PiMathError", () => {
        expect(new DimensionError("d")).toBeInstanceOf(PiMathError)
        expect(new MathError("m")).toBeInstanceOf(PiMathError)
    })
})

describe("Typed throws (phase 3)", () => {
    test("NotImplementedError: a stub method throws", () => {
        expect(() => new Factor("3x+2", "1/2").primitive()).toThrow(NotImplementedError)
    })

    test("IndexError: matrix access out of range", () => {
        expect(() => new Matrix(2, 2).setValue(9, 9, 1)).toThrow(IndexError)
    })

    test("InvalidArgumentError: non-integer amplification factor", () => {
        expect(() => new Fraction(3).amplify(1.5)).toThrow(InvalidArgumentError)
    })

    test("StateError: operating on an uninitialized Sphere3", () => {
        expect(() => new Sphere3().center).toThrow(StateError)
    })

    test("StateError is a PiMathError", () => {
        expect(new StateError("s")).toBeInstanceOf(PiMathError)
    })
})
