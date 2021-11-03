import { Fraction } from "./maths/coefficients/fraction";
import { Numeric } from "./maths/numeric";
import { Nthroot } from "./maths/coefficients/nthroot";
import { Monom } from "./maths/algebra/monom";
import { Polynom } from "./maths/algebra/polynom";
import { Equation } from "./maths/algebra/equation";
import { LinearSystem } from "./maths/algebra/linearSystem";
import { Rational } from "./maths/algebra/rational";
import { Vector } from "./maths/geometry/vector";
import { Line } from "./maths/geometry/line";
import { Point } from "./maths/geometry/point";
import { Triangle } from "./maths/geometry/triangle";
import { Shutingyard } from "./maths/shutingyard";
import { Logicalset } from "./maths/algebra/logicalset";
export declare var Pi: {
    ShutingYard: typeof Shutingyard;
    Numeric: typeof Numeric;
    Fraction: typeof Fraction;
    Root: typeof Nthroot;
    Monom: typeof Monom;
    Polynom: typeof Polynom;
    Equation: typeof Equation;
    LinearSystem: typeof LinearSystem;
    Rational: typeof Rational;
    Logicalset: typeof Logicalset;
    Geometry: {
        Vector: typeof Vector;
        Point: typeof Point;
        Line: typeof Line;
        Triangle: typeof Triangle;
    };
};