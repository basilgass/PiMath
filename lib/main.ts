// Expose as global
import {Shutingyard} from "./maths/shutingyard.ts";
import {Numeric} from "./maths/numeric.ts";
import {NumExp} from "./maths/numexp.ts";
import {Fraction} from "./maths/coefficients/fraction.ts";
import {NthRoot} from "./maths/coefficients/nthRoot.ts";
import {Monom} from "./maths/algebra/monom.ts";
import {Polynom} from "./maths/algebra/polynom.ts";
import {Equation} from "./maths/algebra/equation.ts";
import {LinearSystem} from "./maths/algebra/linearSystem.ts";
import {Rational} from "./maths/algebra/rational.ts";
import {Logicalset} from "./maths/algebra/logicalset.ts";
import {Random} from "./maths/randomization/random.ts";
import {Vector} from "./maths/geometry/vector.ts";
import {Point} from "./maths/geometry/point.ts";
import {Line} from "./maths/geometry/line.ts";
import {Triangle} from "./maths/geometry/triangle.ts";
import {Circle} from "./maths/geometry/circle.ts";

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
