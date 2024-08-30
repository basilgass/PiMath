// Expose as global
import { Equation } from "./algebra/equation"
import { LinearSystem } from "./algebra/linearSystem"
import { LogicalSet } from "./algebra/logicalset"
import { Monom } from "./algebra/monom"
import { Polynom } from "./algebra/polynom"
import { Rational } from "./algebra/rational"
import { Fraction } from "./coefficients/fraction"
import { NthRoot } from "./coefficients/nthRoot"
import { Circle } from "./geometry/circle"
import { Line } from "./geometry/line"
import { Triangle } from "./geometry/triangle"
import { Vector } from "./geometry/vector"
import { Vector3D } from "./geometry/vector3d"
import { Numeric } from "./numeric"
import { Random } from "./randomization/random"

const Geometry = {
    Vector: Vector,
    Line: Line,
    Triangle: Triangle,
    Circle: Circle
}

const Geometry3D = {
    Vector3D: Vector3D
}

// Make a global object
const PiMath = {
    Numeric,
    Fraction,
    Root: NthRoot,
    Monom,
    Polynom,
    Equation,
    LinearSystem,
    Rational,
    LogicalSet,
    Random,
    Geometry,
    Geometry3D
}

// Export default value
export default PiMath