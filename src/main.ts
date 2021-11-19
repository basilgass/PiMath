import {Fraction} from "./maths/coefficients";
import {Numeric} from "./maths/numeric";
import {Nthroot} from "./maths/coefficients";
import {Monom} from "./maths/algebra";
import {Polynom} from "./maths/algebra";
import {Equation} from "./maths/algebra";
import {LinearSystem} from "./maths/algebra";
import {Rational} from "./maths/algebra";
import {Vector} from "./maths/geometry";
import {Line} from "./maths/geometry";
import {Point} from "./maths/geometry";
import {Triangle} from "./maths/geometry";
import {Shutingyard} from "./maths/shutingyard";
import {Logicalset} from "./maths/algebra";
import {Circle} from "./maths/geometry";
import {Random} from "./maths/random";

export * from "./maths/algebra"
export * from "./maths/coefficients"
export * from "./maths/geometry"
export * from "./maths/random"
// export * from "./maths/space"
export * from "./maths/numeric"
export * from "./maths/shutingyard"

// Expose as global
// export let Pi = {
(<any>window).Pi = {
    ShutingYard: Shutingyard,
    Numeric: Numeric,
    Fraction: Fraction,
    Root: Nthroot,
    Monom: Monom,
    Polynom: Polynom,
    Equation: Equation,
    LinearSystem: LinearSystem,
    Rational: Rational,
    Logicalset: Logicalset,
    Random: Random,
    Geometry: {
        Vector: Vector,
        Point: Point,
        Line: Line,
        Triangle: Triangle,
        Circle: Circle
    }
};
