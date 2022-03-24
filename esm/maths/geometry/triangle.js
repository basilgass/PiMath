"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
const point_1 = require("./point");
const fraction_1 = require("../coefficients/fraction");
const vector_1 = require("./vector");
const line_1 = require("./line");
const equation_1 = require("../algebra/equation");
class Triangle {
    constructor(...values) {
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        /**
         * Parse values to a triangle. Supported formats:
         * Point, Point, Point
         * x1, y1, x2, y2, x3, y3
         * TODO: Something else ?
         * @param values
         */
        this.parse = (...values) => {
            if (values.length === 6) {
                // Check if all values are number or fractions.
                let v = values.map((x) => new fraction_1.Fraction(x));
                return this.parse(new point_1.Point(v[0], v[1]), new point_1.Point(v[2], v[3]), new point_1.Point(v[4], v[5]));
            }
            else if (values.length === 3) {
                // Possibilities:
                // - Three points (or part of points, only dict for example, or array (TODO: Add the array syntax for point)
                // - Three lines
                // - Three lines as text.
                if (values.filter((x) => typeof x === 'string').length === 3) {
                    return this.parse(...values.map((x) => new line_1.Line(x)));
                }
                else if (values.filter((x) => x instanceof line_1.Line).length === 3) {
                    // We have three lines
                    this._lines = {
                        'AB': values[0],
                        'BC': values[1],
                        'AC': values[2]
                    };
                    // Get the intersection points -> build the triangle using these intersection points.
                    let intersect = values[0].intersection(values[1]);
                    if (intersect.hasIntersection) {
                        this._B = intersect.point.clone();
                    }
                    else {
                        return this;
                    }
                    intersect = values[1].intersection(values[2]);
                    if (intersect.hasIntersection) {
                        this._C = intersect.point.clone();
                    }
                    else {
                        return this;
                    }
                    intersect = values[2].intersection(values[0]);
                    if (intersect.hasIntersection) {
                        this._A = intersect.point.clone();
                    }
                    else {
                        return this;
                    }
                }
                else {
                    // At least, one of the value is not a point.
                    if (values.filter((x) => (x instanceof point_1.Point)).length < 3) {
                        return this.parse(new point_1.Point(values[0]), new point_1.Point(values[1]), new point_1.Point(values[2]));
                    }
                    // We have three points.
                    this._A = values[0].clone();
                    this._B = values[1].clone();
                    this._C = values[2].clone();
                    this._lines = {
                        'AB': new line_1.Line(this._A, this._B),
                        'BC': new line_1.Line(this._B, this._C),
                        'AC': new line_1.Line(this._A, this._C)
                    };
                }
            }
            else if (values.length === 1) {
                if (values[0] instanceof Triangle) {
                    return values[0].clone();
                }
            }
            this._updateTriangle();
            return this;
        };
        /**
         * Clone the Triangle class
         */
        this.clone = () => {
            this._A = this._A.clone();
            this._B = this._B.clone();
            this._C = this._C.clone();
            this._lines = {
                'AB': this._lines.AB.clone(),
                'BC': this._lines.BC.clone(),
                'AC': this._lines.AC.clone()
            };
            this._updateTriangle();
            return this;
        };
        // ------------------------------------------
        // Triangle operations and properties
        // ------------------------------------------
        /**
         * Generate the Line object for the three segments of the triangle
         */
        this._updateTriangle = () => {
            this._middles = {
                'AB': new point_1.Point().middleOf(this._A, this._B),
                'AC': new point_1.Point().middleOf(this._A, this._C),
                'BC': new point_1.Point().middleOf(this._B, this._C)
            };
            this._remarquables = this._calculateRemarquableLines();
        };
        /**
         * Get the Point class for the given name
         * @param ptName
         */
        this.getPointByName = (ptName) => {
            switch (ptName.toUpperCase()) {
                case 'A':
                    return this._A;
                case 'B':
                    return this._B;
                case 'C':
                    return this._C;
            }
            // Something went wrong ! Return the first point
            return this._A;
        };
        /**
         * Get the vector for the segment given by name.
         * @param ptName1
         * @param ptName2
         */
        this.getSegment = (ptName1, ptName2) => {
            return new vector_1.Vector(this.getPointByName(ptName1), this.getPointByName(ptName2));
        };
        this._calculateRemarquableLines = () => {
            let remarquables = {
                'medians': {
                    'A': new line_1.Line(this._A, this._middles.BC),
                    'B': new line_1.Line(this._B, this._middles.AC),
                    'C': new line_1.Line(this._C, this._middles.AB),
                    'intersection': null
                },
                'mediators': {
                    'AB': new line_1.Line(this._middles.AB, new vector_1.Vector(this._A, this._B).normal()),
                    'AC': new line_1.Line(this._middles.AC, new vector_1.Vector(this._A, this._C).normal()),
                    'BC': new line_1.Line(this._middles.BC, new vector_1.Vector(this._B, this._C).normal()),
                    'intersection': null
                },
                'heights': {
                    'A': new line_1.Line(this._A, new vector_1.Vector(this._B, this._C).normal()),
                    'B': new line_1.Line(this._B, new vector_1.Vector(this._A, this._C).normal()),
                    'C': new line_1.Line(this._C, new vector_1.Vector(this._A, this._B).normal()),
                    'intersection': null
                },
                'bisectors': {
                    'A': this._calculateBisectors('A'),
                    'B': this._calculateBisectors('B'),
                    'C': this._calculateBisectors('C'),
                    'intersection': null
                }
            };
            // As it's a triangle, we assume the lines are intersecting and aren't parallel or superposed.
            remarquables.medians.intersection = remarquables.medians.A.intersection(remarquables.medians.B).point;
            remarquables.mediators.intersection = remarquables.mediators.AB.intersection(remarquables.mediators.BC).point;
            remarquables.heights.intersection = remarquables.heights.A.intersection(remarquables.heights.B).point;
            remarquables.bisectors.intersection = remarquables.bisectors.A.intersection(remarquables.bisectors.B).point;
            // Everything was calculated for the remarquable lines.
            return remarquables;
        };
        this._calculateBisectors = (pt) => {
            let tlines = this.lines, d1, d2;
            if (pt === 'A') {
                d1 = tlines.AB;
                d2 = tlines.AC;
            }
            else if (pt === 'B') {
                d1 = tlines.AB;
                d2 = tlines.BC;
            }
            else if (pt === 'C') {
                d1 = tlines.BC;
                d2 = tlines.AC;
            }
            let b1 = new line_1.Line(new equation_1.Equation(d1.equation.left.clone().multiply(d2.n.simplify().norm), d2.equation.left.clone().multiply(d1.n.simplify().norm)).reorder(true).simplify()), b2 = new line_1.Line(new equation_1.Equation(d1.equation.left.clone().multiply(d2.n.simplify().norm), d2.equation.left.clone().multiply(d1.n.simplify().norm).opposed()).reorder(true).simplify());
            // Must determine which bisectors is in the triangle
            if (pt === 'A') {
                return b1.hitSegment(this.B, this.C) ? b1 : b2;
            }
            if (pt === 'B') {
                return b1.hitSegment(this.A, this.C) ? b1 : b2;
            }
            if (pt === 'C') {
                return b1.hitSegment(this.B, this.A) ? b1 : b2;
            }
            // Default returns the first bisector
            return b1;
        };
        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }
    // ------------------------------------------
    // Getter and setters
    // ------------------------------------------
    get A() {
        return this._A;
    }
    get B() {
        return this._B;
    }
    get C() {
        return this._C;
    }
    get AB() {
        return this.getSegment('A', 'B');
    }
    get BA() {
        return this.getSegment('B', 'A');
    }
    get BC() {
        return this.getSegment('B', 'C');
    }
    get CB() {
        return this.getSegment('C', 'B');
    }
    get AC() {
        return this.getSegment('A', 'C');
    }
    get CA() {
        return this.getSegment('C', 'A');
    }
    get isRectangle() {
        if (this.AB.isNormalTo(this.BC)) {
            return true;
        }
        if (this.AB.isNormalTo(this.AC)) {
            return true;
        }
        if (this.BC.isNormalTo(this.AC)) {
            return true;
        }
        return false;
    }
    get isEquilateral() {
        return this.AB.normSquare.isEqual(this.BC.normSquare) &&
            this.AB.normSquare.isEqual(this.AC.normSquare);
    }
    get isIsocele() {
        return this.AB.normSquare.isEqual(this.BC.normSquare) ||
            this.AB.normSquare.isEqual(this.AC.normSquare) ||
            this.BC.normSquare.isEqual(this.AC.normSquare);
    }
    get lines() {
        return this._lines;
    }
    get remarquables() {
        return this._remarquables;
    }
}
exports.Triangle = Triangle;
//# sourceMappingURL=triangle.js.map