import { Numeric } from "./maths/numeric";
import { Shutingyard } from "./maths/shutingyard";
import { Random } from "./maths/random";
import { Fraction, Nthroot } from "./maths/coefficients";
import { Monom, Polynom, Equation, LinearSystem, Rational, Logicalset } from "./maths/algebra";
import { Line, Circle, Triangle, Point, Vector } from "./maths/geometry";
window.Pi = {
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
//# sourceMappingURL=main.js.map