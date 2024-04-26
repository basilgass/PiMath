// Expose as global
import {Shutingyard} from "./shutingyard.ts";
import {Numeric} from "./numeric.ts";
import {NumExp} from "./numexp.ts";
import {Fraction} from "./coefficients/fraction.ts";
import {NthRoot} from "./coefficients/nthRoot.ts";
import {Monom} from "./algebra/monom.ts";
import {Polynom} from "./algebra/polynom.ts";
import {Equation} from "./algebra/equation.ts";
import {LinearSystem} from "./algebra/linearSystem.ts";
import {Rational} from "./algebra/rational.ts";
import {Logicalset} from "./algebra/logicalset.ts";
import {Random} from "./randomization/random.ts";
import {Vector} from "./geometry/vector.ts";
import {Point} from "./geometry/point.ts";
import {Line} from "./geometry/line.ts";
import {Triangle} from "./geometry/triangle.ts";
import {Circle} from "./geometry/circle.ts";

export const PiMath = {
    ShutingYard: Shutingyard,
    Numeric: Numeric,
    NumExp: NumExp,
    Fraction: Fraction,
    Root: NthRoot,
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
