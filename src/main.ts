import {Fraction} from "./maths/coefficients/fraction";
import {Numeric} from "./maths/numeric";
import {Nthroot} from "./maths/coefficients/nthroot";
import {Monom} from "./maths/algebra/monom";
import {Polynom} from "./maths/algebra/polynom";
import {Equation} from "./maths/algebra/equation";
import {LinearSystem} from "./maths/algebra/linearSystem";
import {Rational} from "./maths/algebra/rational";
import {Vector} from "./maths/geometry/vector";
import {Line} from "./maths/geometry/line";
import {Point} from "./maths/geometry/point";
import {Triangle} from "./maths/geometry/triangle";
import {Shutingyard} from "./maths/shutingyard";
import {Logicalset} from "./maths/algebra/logicalset";

// Expose as global
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
    Geometry: {
        Vector: Vector,
        Point: Point,
        Line: Line,
        Triangle: Triangle
    }
};

export let Pi = {
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
    Geometry: {
        Vector: Vector,
        Point: Point,
        Line: Line,
        Triangle: Triangle
    }
};
