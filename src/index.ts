// Expose as global
import { Equation } from "./algebra/equation"
// import { LinearSystem } from "./algebra/linearSystem"
// import { LogicalSet } from "./algebra/logicalset.bak"
import { Monom } from "./algebra/monom"
import { Polynom } from "./algebra/polynom"
import { Rational } from "./algebra/rational"
import { Fraction } from "./coefficients/fraction"
import { NthRoot } from "./coefficients/nthRoot"
import { Circle } from "./geometry/circle"
import { Line } from "./geometry/line"
import { Point } from "./geometry/point"
import { Triangle } from "./geometry/triangle"
import { Vector } from "./geometry/vector"
import { Numeric } from "./numeric"
import { Random } from "./randomization/random"

const Geometry = {
    Vector: Vector,
    Point: Point,
    Line: Line,
    Triangle: Triangle,
    Circle: Circle
}

// Make a global object
const PiMath = {
    Numeric,
    Fraction,
    Root: NthRoot,
    Monom,
    Polynom,
    Equation,
    // LinearSystem,
    Rational,
    // LogicalSet,
    Random,
    Geometry
}

// Export default value
export default PiMath