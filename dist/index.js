import { Fraction } from "./coefficients/fraction";
import { NthRoot } from "./coefficients/nthRoot";
import { Monom } from "./algebra/monom";
import { Polynom } from "./algebra/polynom";
import { Factor } from "./algebra/factor";
import { PolyFactor } from "./algebra/polyFactor";
import { Equation } from "./algebra/equation";
import { LinearSystem } from "./algebra/linearSystem";
import { Circle } from "./geometry/circle";
import { Line } from "./geometry/line";
import { Point } from "./geometry/point";
import { Triangle } from "./geometry/triangle";
import { Vector } from "./geometry/vector";
import { Line3 } from "./geometry/line3";
import { Plane3 } from "./geometry/plane3";
import { Matrix } from "./geometry/matrix";
import { Numeric } from "./numeric";
import { Random } from "./randomization/random";
import { NumExp } from "piexpression";
import { LogicalSet } from "./algebra/logicalset";
const Geometry = {
    Vector: Vector,
    Point: Point,
    Line: Line,
    Triangle: Triangle,
    Circle: Circle,
    Line3: Line3,
    Plane3: Plane3,
};
const PiMath = {
    Numeric,
    Fraction,
    Root: NthRoot,
    Monom,
    Polynom,
    Equation,
    Matrix,
    LinearSystem,
    Factor,
    PolyFactor,
    LogicalSet,
    Random,
    Geometry,
    NumExp
};
export default PiMath;
//# sourceMappingURL=index.js.map