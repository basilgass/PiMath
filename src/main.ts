import Numeric from "./maths/numeric";
import Shutingyard from "./maths/shutingyard";
import Fraction from "./maths/coefficients/fraction";
import Nthroot from "./maths/coefficients/nthroot";
import Monom from "./maths/algebra/monom";
import Polynom from "./maths/algebra/polynom";
import Equation from "./maths/algebra/equation";
import LinearSystem from "./maths/algebra/linearSystem";
import Line from "./maths/geometry/line";
import Circle from "./maths/geometry/circle";
import Logicalset from "./maths/algebra/logicalset";
import Rational from "./maths/algebra/rational";
import {Random} from "./maths/random/random";
import Triangle from "./maths/geometry/triangle";
import Point from "./maths/geometry/point";
import Vector from "./maths/geometry/vector";

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
