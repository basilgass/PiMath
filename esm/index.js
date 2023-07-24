"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiMath = void 0;
const numeric_1 = require("./maths/numeric");
const numexp_1 = require("./maths/numexp");
const shutingyard_1 = require("./maths/shutingyard");
const random_1 = require("./maths/randomization/random");
const fraction_1 = require("./maths/coefficients/fraction");
const nthRoot_1 = require("./maths/coefficients/nthRoot");
const monom_1 = require("./maths/algebra/monom");
const polynom_1 = require("./maths/algebra/polynom");
const equation_1 = require("./maths/algebra/equation");
const linearSystem_1 = require("./maths/algebra/linearSystem");
const rational_1 = require("./maths/algebra/rational");
const logicalset_1 = require("./maths/algebra/logicalset");
const vector_1 = require("./maths/geometry/vector");
const line_1 = require("./maths/geometry/line");
const triangle_1 = require("./maths/geometry/triangle");
const circle_1 = require("./maths/geometry/circle");
const point_1 = require("./maths/geometry/point");
// Expose as global
exports.PiMath = {
    ShutingYard: shutingyard_1.Shutingyard,
    Numeric: numeric_1.Numeric,
    NumExp: numexp_1.NumExp,
    Fraction: fraction_1.Fraction,
    Root: nthRoot_1.NthRoot,
    Monom: monom_1.Monom,
    Polynom: polynom_1.Polynom,
    Equation: equation_1.Equation,
    LinearSystem: linearSystem_1.LinearSystem,
    Rational: rational_1.Rational,
    Logicalset: logicalset_1.Logicalset,
    Random: random_1.Random,
    Geometry: {
        Vector: vector_1.Vector,
        Point: point_1.Point,
        Line: line_1.Line,
        Triangle: triangle_1.Triangle,
        Circle: circle_1.Circle
    }
};
window.PiMath = exports.PiMath;
//# sourceMappingURL=index.js.map