import {Numeric} from "./maths/numeric";
import {NumExp} from "./maths/numexp";
import {Shutingyard} from "./maths/shutingyard";
import {Random} from "./maths/randomization/random";
import {Fraction} from "./maths/coefficients/fraction";
import {NthRoot} from "./maths/coefficients/nthRoot";
import {Monom} from "./maths/algebra/monom";
import {Polynom} from "./maths/algebra/polynom";
import {Equation} from "./maths/algebra/equation";
import {LinearSystem} from "./maths/algebra/linearSystem";
import {Rational} from "./maths/algebra/rational";
import {Logicalset} from "./maths/algebra/logicalset";
import {Vector} from "./maths/geometry/vector";
import {Line} from "./maths/geometry/line";
import {Triangle} from "./maths/geometry/triangle";
import {Circle} from "./maths/geometry/circle";
import {Point} from "./maths/geometry/point";

// Expose as global
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

// (<any>window).PiMath = PiMath
