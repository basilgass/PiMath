import {Numeric} from "./maths/numeric";
import {NumExp} from "./maths/expressions/numexp";
import {Shutingyard} from "./maths/shutingyard";
import {Random} from "./maths/random";
import {Fraction, Nthroot} from "./maths/coefficients";
import {
    Monom,
    Polynom,
    Equation,
    LinearSystem,
    Rational,
    Logicalset,
    PolynomExpFactor,
    PolynomExpProduct
} from "./maths/algebra";
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
    Equation: Equation,
    LinearSystem: LinearSystem,
    Rational: Rational,
    Logicalset: Logicalset,
    Random: Random,
    PolynomExpFactor: PolynomExpFactor,
    PolynomExpProduct: PolynomExpProduct,
    Geometry: {
        Vector: Vector,
        Point: Point,
        Line: Line,
        Triangle: Triangle,
        Circle: Circle
    }
};
