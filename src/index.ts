// Expose as global
// Coefficients
import {Fraction, Root} from "./coefficients"

// Algebra
import {Equation, Factor, LinearSystem, LogicalSet, Matrix, Monom, PolyFactor, Polynom, PolyMatrix} from "./algebra"

// Analyze
import {Domain, Interval, Solution, TableOfSigns} from "./analyze"

// Geometry
import {Circle, Line, Line3, Plane3, Point, Sphere3, Triangle, Vector} from "./geometry"

// Numeric
import {Numeric} from "./numeric"

// NumExp
import {NumExp} from "piexpression"

// randomization
import {Random} from "./randomization/random"

// Errors
import {
    PiMathError,
    ParseError,
    DimensionError,
    MathError,
    InvalidArgumentError,
    NotImplementedError,
    UnsupportedOperationError,
    IndexError,
    StateError
} from "./errors"

// export everything to make them available as module
export * from "./coefficients"
export * from "./algebra"
export * from "./geometry"
export * from "./analyze"
export * from "./errors"

export {Numeric}
export {NumExp}
export {Random}

// Typesetting
export type * from "./pimath.interface"
export type * from "./randomization/rndTypes"

/**
 * Global PiMath object for non-module contexts (e.g. script tags).
 * Named exports from this module cover the full public API, including
 * types from `pimath.interface` and the `Random` / `Numeric` utilities.
 */
const PiMath = {
    Numeric,
    Fraction,
    Root,
    Monom,
    Polynom,
    Equation,
    Matrix,
    PolyMatrix,
    LinearSystem,
    Factor,
    PolyFactor,
    LogicalSet,
    Solution,
    TableOfSigns,
    Interval,
    Domain,
    Random,
    Geometry: {
        Vector,
        Point,
        Line,
        Triangle,
        Circle,
        Line3,
        Plane3,
        Sphere3
    },
    Errors: {
        PiMathError,
        ParseError,
        DimensionError,
        MathError,
        InvalidArgumentError,
        NotImplementedError,
        UnsupportedOperationError,
        IndexError,
        StateError
    },
    NumExp
}

// Export as default value
export default PiMath
