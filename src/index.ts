// Expose as global
export * from "./coefficients"
export * from "./algebra"
export * from "./geometry"

// Import items individually to make a global object
// Coefficients
import {Fraction, NthRoot} from "./coefficients"
// Algebra
import {Equation, Factor, LinearSystem, LogicalSet, Monom, PolyFactor, Polynom} from "./algebra"
// Geometry
import {Circle, Line, Line3, Matrix, Plane3, Point, Triangle, Vector} from "./geometry"
// Numeric
import {Numeric} from "./numeric"
// NumExp
import {NumExp} from "piexpression"
// randomization
import {Random} from "./randomization/random"
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
        Vector: Vector,
        Point: Point,
        Line: Line,
        Triangle: Triangle,
        Circle: Circle,
        Line3: Line3,
        Plane3: Plane3,
    },
    NumExp
}

// Export as default value
export default PiMath
