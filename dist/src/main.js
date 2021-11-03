"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pi = void 0;
const fraction_1 = require("./maths/coefficients/fraction");
const numeric_1 = require("./maths/numeric");
const nthroot_1 = require("./maths/coefficients/nthroot");
const monom_1 = require("./maths/algebra/monom");
const polynom_1 = require("./maths/algebra/polynom");
const equation_1 = require("./maths/algebra/equation");
const linearSystem_1 = require("./maths/algebra/linearSystem");
const rational_1 = require("./maths/algebra/rational");
const vector_1 = require("./maths/geometry/vector");
const line_1 = require("./maths/geometry/line");
const point_1 = require("./maths/geometry/point");
const triangle_1 = require("./maths/geometry/triangle");
window.Pi = {
    Numeric: numeric_1.Numeric,
    Fraction: fraction_1.Fraction,
    Root: nthroot_1.Nthroot,
    Monom: monom_1.Monom,
    Polynom: polynom_1.Polynom,
    Equation: equation_1.Equation,
    LinearSystem: linearSystem_1.LinearSystem,
    Rational: rational_1.Rational,
    Geometry: {
        Vector: vector_1.Vector,
        Point: point_1.Point,
        Line: line_1.Line,
        Triangle: triangle_1.Triangle
    }
};
exports.Pi = {
    Numeric: numeric_1.Numeric,
    Fraction: fraction_1.Fraction,
    Root: nthroot_1.Nthroot,
    Monom: monom_1.Monom,
    Polynom: polynom_1.Polynom,
    Equation: equation_1.Equation,
    LinearSystem: linearSystem_1.LinearSystem,
    Rational: rational_1.Rational,
    Geometry: {
        Vector: vector_1.Vector,
        Point: point_1.Point,
        Line: line_1.Line,
        Triangle: triangle_1.Triangle
    }
};
//# sourceMappingURL=main.js.map