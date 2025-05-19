// Expose as global
export * from "./coefficients"
export * from "./algebra"
export * from "./geometry"

// Import items individually to make a global object

// Coefficients
import {Fraction, NthRoot} from "./coefficients"

// Algebra
import {Equation, Factor, LinearSystem, LogicalSet, Monom, PolyFactor, Polynom, Matrix} from "./algebra"

// Geometry
import {Circle, Line, Line3, Plane3, Point, Triangle, Vector, Sphere3} from "./geometry"

// Numeric
import {Numeric} from "./numeric"
export {Numeric}

// NumExp
import {NumExp} from "piexpression"
export {NumExp}

// randomization
import {Random} from "./randomization/random"
export {Random}

// Typesetting
export type * from "./pimath.interface"

// Make a global object
const PiMath = {
    Numeric,
    Fraction,
    Root: NthRoot,
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
