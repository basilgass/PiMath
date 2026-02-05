// Expose as global
// Coefficients
import {Fraction, Root} from "./coefficients"

// Algebra
import {Equation, Factor, LinearSystem, LogicalSet, Matrix, Monom, PolyFactor, Polynom} from "./algebra"

// Geometry
import {Circle, Line, Line3, Plane3, Point, Sphere3, Triangle, Vector} from "./geometry"

// Numeric
import {Numeric} from "./numeric"

// NumExp
import {NumExp} from "piexpression"

// randomization
import {Random} from "./randomization/random"

// export everything to make them available as module
export * from "./coefficients"
export * from "./algebra"
export * from "./geometry"
export * from "./analyze"

export {Numeric}
export {NumExp}
export {Random}

// Typesetting
export type * from "./pimath.interface"

// Make a global object
const PiMath = {
    Numeric,
    Fraction,
    Root,
    Monom,
    Polynom,
    Equation,
    Matrix,
    LinearSystem,
    Factor,
    PolyFactor,
    LogicalSet,
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
    NumExp
}

// Export as default value
export default PiMath
