"use strict";
/**
 * This class works for 2d line in a plane.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = exports.LinePropriety = void 0;
const vector_1 = require("./vector");
const point_1 = require("./point");
const numeric_1 = require("../numeric");
const fraction_1 = require("../coefficients/fraction");
const equation_1 = require("../algebra/equation");
const polynom_1 = require("../algebra/polynom");
const random_1 = require("../randomization/random");
var LinePropriety;
(function (LinePropriety) {
    LinePropriety[LinePropriety["None"] = 0] = "None";
    LinePropriety["Parallel"] = "parallel";
    LinePropriety["Perpendicular"] = "perpendicular";
    LinePropriety["Tangent"] = "tangent";
})(LinePropriety = exports.LinePropriety || (exports.LinePropriety = {}));
class Line {
    constructor(...values) {
        this.randomPoint = (k) => {
            // Return a random point on the line.
            return this._d
                .clone()
                .multiplyByScalar(random_1.Random.numberSym((k === undefined || k <= 1) ? 3 : k, false))
                .add(this._OA.asVector)
                .asPoint;
        };
        this.randomNearPoint = (k) => {
            let pt = this.randomPoint(k);
            let maxIterationTest = 10;
            while (this.isOnLine(pt) && maxIterationTest > 0) {
                pt.x.add(random_1.Random.numberSym(1, false));
                pt.y.add(random_1.Random.numberSym(1, false));
                maxIterationTest--;
            }
            return pt;
        };
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        /**
         * Parse data to a line
         * @param {any} values
         * @returns {Line}
         */
        this.parse = (...values) => {
            this._exists = false;
            // Nothing is given...
            if (values.length === 0) {
                return this;
            }
            // One value only: already a line (clone it), an Equation, a string (as Equation)
            if (values.length === 1) {
                if (values[0] instanceof Line) {
                    // Already a Line
                    return values[0].clone();
                }
                else if (values[0] instanceof equation_1.Equation) {
                    // It's an Equation
                    return this.parseEquation(values[0]);
                }
                else if (typeof values[0] === "string") {
                    // It's a string - create an Equation from it.
                    try {
                        let E = new equation_1.Equation(values[0]);
                        return this.parse(E);
                    }
                    catch (e) {
                        return this;
                    }
                }
            }
            if (values.length === 2) {
                if (values[0] instanceof point_1.Point && values[1] instanceof vector_1.Vector) {
                    return this.parseByPointAndVector(values[0], values[1]);
                }
                else if (values[0] instanceof point_1.Point && values[1] instanceof point_1.Point) {
                    return this.parseByPointAndVector(values[0], new vector_1.Vector(values[0], values[1]));
                }
                else if (values[0] instanceof vector_1.Vector && values[1] instanceof point_1.Point) {
                    return this.parseByPointAndNormal(values[1], values[0]);
                }
            }
            if (values.length === 3) {
                if ((values[0] instanceof fraction_1.Fraction || typeof values[0] === 'number')
                    &&
                        (values[1] instanceof fraction_1.Fraction || typeof values[1] === 'number')
                    &&
                        (values[2] instanceof fraction_1.Fraction || typeof values[2] === 'number')) {
                    return this.parseByCoefficient(values[0], values[1], values[2]);
                }
                else if (values[0] instanceof point_1.Point && values[1] instanceof vector_1.Vector) {
                    if (values[2] === LinePropriety.Perpendicular) {
                        return this.parseByPointAndNormal(values[0], values[1]);
                    }
                    else if (values[2] === LinePropriety.Parallel) {
                        return this.parseByPointAndVector(values[0], values[1]);
                    }
                }
                else if (values[0] instanceof point_1.Point && values[1] instanceof Line) {
                    if (values[2] === LinePropriety.Parallel || values[2] === null) {
                        return this.parseByPointAndLine(values[0], values[1], LinePropriety.Parallel);
                    }
                    else {
                        return this.parseByPointAndLine(values[0], values[1], LinePropriety.Perpendicular);
                    }
                }
            }
            // TODO: Add the ability to create line from a normal vector
            console.log('Someting wrong happend while creating the line');
            return this;
        };
        this.parseEquation = (equ) => {
            // Reorder the eequation
            equ.reorder(true);
            // It must contain either x, y or both.
            let letters = new Set(equ.letters());
            // No 'x', no 'y' in the equations
            if (!(letters.has('x') || letters.has('y'))) {
                return this;
            }
            // Another letter in the equation ?
            for (let elem of ['x', 'y']) {
                if (letters.has(elem)) {
                    letters.delete(elem);
                }
            }
            if (letters.size > 0) {
                return this;
            }
            // Everything should be ok now...
            return this.parseByCoefficient(equ.left.monomByLetter('x').coefficient, equ.left.monomByLetter('y').coefficient, equ.left.monomByDegree(0).coefficient);
        };
        this.parseByCoefficient = (a, b, c) => {
            this._a = new fraction_1.Fraction(a);
            this._b = new fraction_1.Fraction(b);
            this._c = new fraction_1.Fraction(c);
            this._d = new vector_1.Vector(this._b.clone(), this._a.clone().opposed());
            this._OA = new point_1.Point(new fraction_1.Fraction().zero(), this._c.clone());
            this._n = this._d.clone().normal();
            this._exists = true;
            return this;
        };
        this.parseByPointAndVector = (P, d) => {
            // OX = OP + k*d
            // x = px + kdx     * dy
            // y = py + kdy     * dx
            // ------------------
            // dy * x = px * dy + kdxdy
            // dx * y = py * dx + kdxdy
            // ------------------
            // dy * x - dx * y = px * dy - py * dx
            // dy * x - dx * y - (px * dy - py * dx) = 0
            this.parseByCoefficient(d.y, d.x.clone().opposed(), P.x.clone().multiply(d.y).subtract(P.y.clone().multiply(d.x)).opposed());
            // Choose the current values as point and direction vector instead of the automatic version.
            this._OA = P.clone();
            this._d = d.clone();
            this._n = this._d.clone().normal();
            this._exists = true;
            return this;
        };
        this.parseByPointAndNormal = (P, n) => {
            return this.parseByCoefficient(n.x, n.y, P.x.clone().multiply(n.x)
                .add(P.y.clone().multiply(n.y)).opposed());
        };
        this.parseByPointAndLine = (P, L, orientation) => {
            if (orientation === undefined) {
                orientation = LinePropriety.Parallel;
            }
            if (orientation === LinePropriety.Parallel) {
                return this.parseByPointAndNormal(P, L.normal);
            }
            else if (orientation === LinePropriety.Perpendicular) {
                return this.parseByPointAndNormal(P, L.director);
            }
            this._exists = false;
            return this;
        };
        this.clone = () => {
            this._a = this._a.clone();
            this._b = this._b.clone();
            this._c = this._c.clone();
            this._d = this._d.clone();
            this._OA = this._OA.clone();
            this._n = this._n.clone();
            this._exists = this.exists;
            return this;
        };
        // ------------------------------------------
        // Mathematical operations
        // ------------------------------------------
        this.isOnLine = (pt) => {
            return this._a.clone()
                .multiply(pt.x)
                .add(this._b.clone()
                .multiply(pt.y))
                .add(this._c)
                .isZero();
        };
        this.isParellelTo = (line) => {
            // Do they have the isSame direction ?
            return this.slope.isEqual(line.slope) && this.height.isNotEqual(line.height);
        };
        this.isSameAs = (line) => {
            return this.slope.isEqual(line.slope) && this.height.isEqual(line.height);
        };
        this.isVertical = () => {
            return this.slope.isInfinity();
        };
        this.simplify = () => {
            let lcm = numeric_1.Numeric.lcm(this._a.denominator, this._b.denominator, this._c.denominator), gcd = numeric_1.Numeric.gcd(this._a.numerator, this._b.numerator, this._c.numerator);
            this.parseByCoefficient(this._a.clone().multiply(lcm).divide(gcd), this._b.clone().multiply(lcm).divide(gcd), this._c.clone().multiply(lcm).divide(gcd));
            return this;
        };
        this.simplifyDirection = () => {
            this._d.simplifyDirection();
            return this;
        };
        this.intersection = (line) => {
            let Pt = new point_1.Point(), isParallel = false, isSame = false, hasIntersection = true;
            // this         => ax+by+c = 0
            // line         => dx+ey+f = 0
            //
            //  aex + bey + ce = 0
            //  dbx + bey + bf = 0
            // (ae-db)x + ce-bf = 0
            //
            //  adx + bdy + cd = 0
            //  adx + aey + af = 0
            // (bd-ae)y + (cd-af)
            //
            // x = (bf-ce)/(ae-db)
            // y = (af-cd)/(bd-ae)
            // Theres is no 'y'
            if (this._b.isZero() || line.b.isZero()) {
                // TODO : handle no y in the line canonical form
            }
            if (this.isParellelTo(line)) {
                Pt.x = null;
                Pt.y = null;
                isParallel = true;
            }
            else if (this.isSameAs(line)) {
                Pt.x = null;
                Pt.y = null;
                isSame = true;
            }
            else {
                Pt.x = this._b.clone().multiply(line.c).subtract(this._c.clone().multiply(line.b))
                    .divide(this._a.clone().multiply(line.b).subtract(this._b.clone().multiply(line.a)));
                Pt.y = this._a.clone().multiply(line.c).subtract(this._c.clone().multiply(line.a))
                    .divide(this._b.clone().multiply(line.a).subtract(this._a.clone().multiply(line.b)));
            }
            return {
                point: Pt,
                hasIntersection: !(isParallel || isSame),
                isParallel,
                isSame
            };
        };
        this.getValueAtX = (value) => {
            const equ = this.equation.clone().isolate('y'), F = new fraction_1.Fraction(value);
            if (equ instanceof equation_1.Equation) {
                return equ.right.evaluate({ x: F });
            }
            return;
        };
        this.getValueAtY = (value) => {
            const equ = this.equation.clone().isolate('x'), F = new fraction_1.Fraction(value);
            if (equ instanceof equation_1.Equation) {
                return equ.right.evaluate({ y: F });
            }
            return;
        };
        this._exists = false;
        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }
    get a() {
        return this._a;
    }
    set a(value) {
        this._a = value;
    }
    get b() {
        return this._b;
    }
    set b(value) {
        this._b = value;
    }
    get c() {
        return this._c;
    }
    // ------------------------------------------
    // Getter and setter
    set c(value) {
        this._c = value;
    }
    get OA() {
        return this._OA;
    }
    set OA(value) {
        this._OA = value;
    }
    get d() {
        return this._d;
    }
    set d(value) {
        this._d = value;
    }
    get n() {
        return this._n;
    }
    get exists() {
        return this._exists;
    }
    // ------------------------------------------
    get equation() {
        return new equation_1.Equation(new polynom_1.Polynom().parse('xy', this._a, this._b, this._c), new polynom_1.Polynom('0')).simplify();
    }
    get tex() {
        // canonical    =>  ax + by + c = 0
        // mxh          =>  y = -a/b x - c/b
        // parametric   =>  (xy) = OA + k*d
        // equation     => ax + by = -c
        let canonical = this.equation.clone().reorder(true);
        // Make sur the first item is positive.
        if (this._a.isNegative()) {
            canonical.multiply(-1);
        }
        const d = this._d.clone().simplifyDirection();
        return {
            canonical: canonical.tex,
            equation: canonical.clone().reorder().tex,
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.tex : 'y=' + new polynom_1.Polynom().parse('x', this.slope, this.height).tex,
            parametric: `${point_1.Point.pmatrix('x', 'y')} = ${point_1.Point.pmatrix(this._OA.x, this._OA.y)} + k\\cdot ${point_1.Point.pmatrix(d.x, d.y)}`
        };
    }
    get display() {
        // canonical    =>  ax + by + c = 0
        // mxh          =>  y = -a/b x - c/b
        // parametric   =>  (xy) = OA + k*d // not relevant in display mode.
        let canonical = this.equation;
        // Make sur the first item is positive.
        if (this._a.isNegative()) {
            canonical.multiply(-1);
        }
        return {
            canonical: canonical.display,
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.display : 'y=' + new polynom_1.Polynom().parse('x', this.slope, this.height).display,
            parametric: ""
        };
    }
    get normal() {
        return new vector_1.Vector(this._a, this._b);
    }
    get director() {
        return this._d.clone();
    }
    get slope() {
        return this._a.clone().opposed().divide(this._b);
    }
    get height() {
        return this._c.clone().opposed().divide(this._b);
    }
    distanceTo(pt) {
        let numerator = pt.x.clone().multiply(this._a)
            .add(pt.y.clone().multiply(this._b))
            .add(this._c).abs(), d2 = this.normal.normSquare;
        // The denominator is null - shouldn't be possible
        if (d2.isZero()) {
            return {
                value: NaN,
                tex: 'Not a line',
                fraction: new fraction_1.Fraction().infinite()
            };
        }
        // The denominator is a perfect square - simplify the tex result
        let value = numerator.value / Math.sqrt(d2.value), F = numerator.clone().divide(d2.clone().sqrt());
        // The denominator is a perfect square.
        if (d2.isSquare()) {
            return {
                value,
                tex: F.tex,
                fraction: F
            };
        }
        // Complete answer...
        return {
            value,
            tex: `\\frac{${numerator.tex}}{\\sqrt{${d2.tex}}}`,
            fraction: F
        };
    }
    hitSegment(A, B) {
        let iPt = this.intersection(new Line(A, B));
        // There is an intersection point
        if (iPt.hasIntersection) {
            return iPt.point.x.value >= Math.min(A.x.value, B.x.value)
                && iPt.point.x.value <= Math.max(A.x.value, B.x.value)
                && iPt.point.y.value >= Math.min(A.y.value, B.y.value)
                && iPt.point.y.value <= Math.max(A.y.value, B.y.value);
        }
        return false;
    }
    // ------------------------------------------
    // Special functions
    // ------------------------------------------
    canonicalAsFloatCoefficient(decimals) {
        if (decimals === undefined) {
            decimals = 2;
        }
        let ca = this._a.value, cb = this._b.value, cc = this._c.value, canonical = '';
        if (!this._a.isZero()) {
            if (this._a.isOne()) {
                canonical = 'x';
            }
            else if (this._a.clone().opposed().isOne()) {
                canonical = '-x';
            }
            else {
                canonical = this._a.value.toFixed(decimals) + 'x';
            }
        }
        if (!this._b.isZero()) {
            if (this._b.isPositive()) {
                canonical += '+';
            }
            canonical += this._b.value.toFixed(decimals) + 'y';
        }
        if (!this._c.isZero()) {
            if (this._c.isPositive()) {
                canonical += '+';
            }
            canonical += this._c.value.toFixed(decimals);
        }
        return canonical + '=0';
    }
}
exports.Line = Line;
// A line is defined as the canonical form
Line.PERPENDICULAR = LinePropriety.Perpendicular;
Line.PARALLEL = LinePropriety.Parallel;
//# sourceMappingURL=line.js.map