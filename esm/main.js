"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numeric_1 = require("./maths/numeric");
const numexp_1 = require("./maths/numexp");
const shutingyard_1 = require("./maths/shutingyard");
const random_1 = require("./maths/random");
const coefficients_1 = require("./maths/coefficients");
const algebra_1 = require("./maths/algebra");
const geometry_1 = require("./maths/geometry");
window.Pi = {
    ShutingYard: shutingyard_1.Shutingyard,
    Numeric: numeric_1.Numeric,
    NumExp: numexp_1.NumExp,
    Fraction: coefficients_1.Fraction,
    Root: coefficients_1.Nthroot,
    Monom: algebra_1.Monom,
    Polynom: algebra_1.Polynom,
    Equation: algebra_1.Equation,
    LinearSystem: algebra_1.LinearSystem,
    Rational: algebra_1.Rational,
    Logicalset: algebra_1.Logicalset,
    Random: random_1.Random,
    Geometry: {
        Vector: geometry_1.Vector,
        Point: geometry_1.Point,
        Line: geometry_1.Line,
        Triangle: geometry_1.Triangle,
        Circle: geometry_1.Circle
    }
};
//# sourceMappingURL=main.js.map