// Expose as global
import { Equation } from "./maths/algebra/equation.ts"
import { LinearSystem } from "./maths/algebra/linearSystem.ts"
import { LogicalSet } from "./maths/algebra/logicalset.ts"
import { Monom } from "./maths/algebra/monom.ts"
import { Polynom } from "./maths/algebra/polynom.ts"
import { Rational } from "./maths/algebra/rational.ts"
import { Fraction } from "./maths/coefficients/fraction.ts"
import { NthRoot } from "./maths/coefficients/nthRoot.ts"
import { Circle } from "./maths/geometry/circle.ts"
import { Line } from "./maths/geometry/line.ts"
import { Triangle } from "./maths/geometry/triangle.ts"
import { Vector } from "./maths/geometry/vector.ts"
import { Vector3D } from "./maths/geometry/vector3d.ts"
import { Numeric } from "./maths/numeric.ts"
import { Random } from "./maths/randomization/random.ts"

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