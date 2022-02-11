import {Numeric} from "./maths/numeric";
import {NumExp} from "./maths/expressions/numexp";
import {Shutingyard} from "./maths/shutingyard";
import {Random} from "./maths/random";
import {Fraction, Nthroot} from "./maths/coefficients";
import {Monom, Polynom, Equation, LinearSystem, Rational, Logicalset, PolynomExp, PolynomExpFactor} from "./maths/algebra";
import {Line, Circle, Triangle, Point, Vector} from "./maths/geometry";

// Expose as global
// export let Pi = {
(<any>window).Pi = {
    ShutingYard: Shutingyard,
    Numeric: Numeric,
    NumExp: NumExp,
    Fraction: Fraction,
    Root: Nthroot,
    Monom: Monom,
    Polynom: Polynom,
    PolynomExp: PolynomExp,
    PolynomExpFactor: PolynomExpFactor,
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
