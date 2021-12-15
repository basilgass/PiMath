"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
const coefficients_1 = require("../coefficients");
const vector_1 = require("./vector");
const point_1 = require("./point");
const algebra_1 = require("../algebra");
const numeric_1 = require("../numeric");
var LinePropriety;
(function (LinePropriety) {
    LinePropriety[LinePropriety["None"] = 0] = "None";
    LinePropriety[LinePropriety["Parallel"] = 1] = "Parallel";
    LinePropriety[LinePropriety["Perpendicular"] = 2] = "Perpendicular";
})(LinePropriety || (LinePropriety = {}));
class Line {
    _a;
    _b;
    _c;
    _OA;
    _d;
    _n;
    _exists;
    _referencePropriety;
    _referenceLine;
    static PERPENDICULAR = LinePropriety.Perpendicular;
    static PARALLEL = LinePropriety.Parallel;
    constructor(...values) {
        this._exists = false;
        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }
    get isLine() {
        return true;
    }
    get exists() {
        return this._exists;
    }
    get equation() {
        return new algebra_1.Equation(new algebra_1.Polynom().parse('xy', this._a, this._b, this._c), new algebra_1.Polynom('0')).simplify();
    }
    get tex() {
        let canonical = this.equation;
        if (this._a.isNegative()) {
            canonical.multiply(-1);
        }
        return {
            canonical: canonical.tex,
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.tex : 'y=' + new algebra_1.Polynom().parse('x', this.slope, this.height).tex,
            parametric: `${point_1.Point.pmatrix('x', 'y')} = ${point_1.Point.pmatrix(this._OA.x, this._OA.y)} + k\\cdot ${point_1.Point.pmatrix(this._d.x, this._d.y)}`
        };
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
    get n() {
        return this._n;
    }
    get normal() {
        return new vector_1.Vector(this._a, this._b);
    }
    get director() {
        return this._d.clone();
    }
    set d(value) {
        this._d = value;
    }
    get slope() {
        return this._a.clone().opposed().divide(this._b);
    }
    get height() {
        return this._c.clone().opposed().divide(this._b);
    }
    parse = (...values) => {
        this._exists = false;
        if (values.length === 0) {
            return this;
        }
        if (values.length === 1) {
            if (values[0] instanceof Line) {
                return values[0].clone();
            }
            else if (values[0] instanceof algebra_1.Equation) {
                return this.parseEquation(values[0]);
            }
            else if (typeof values[0] === "string") {
                try {
                    let E = new algebra_1.Equation(values[0]);
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
            if ((values[0] instanceof coefficients_1.Fraction || typeof values[0] === 'number')
                &&
                    (values[1] instanceof coefficients_1.Fraction || typeof values[1] === 'number')
                &&
                    (values[2] instanceof coefficients_1.Fraction || typeof values[2] === 'number')) {
                return this.parseByCoefficient(values[0], values[1], values[2]);
            }
        }
        console.log('Someting wrong happend while creating the line');
        return this;
    };
    parseEquation = (equ) => {
        equ.reorder(true);
        let letters = new Set(equ.letters());
        if (!(letters.has('x') || letters.has('y'))) {
            return this;
        }
        for (let elem of ['x', 'y']) {
            if (letters.has(elem)) {
                letters.delete(elem);
            }
        }
        if (letters.size > 0) {
            return this;
        }
        return this.parseByCoefficient(equ.left.monomByLetter('x').coefficient, equ.left.monomByLetter('y').coefficient, equ.left.monomByDegree(0).coefficient);
    };
    parseByCoefficient = (a, b, c) => {
        this._a = new coefficients_1.Fraction(a);
        this._b = new coefficients_1.Fraction(b);
        this._c = new coefficients_1.Fraction(c);
        this._d = new vector_1.Vector(this._b.clone(), this._a.clone().opposed());
        this._OA = new point_1.Point(new coefficients_1.Fraction().zero(), this._c.clone());
        this._n = this._d.clone().normal();
        this._exists = true;
        return this;
    };
    parseByPointAndVector = (P, d) => {
        this.parseByCoefficient(d.y, d.x.clone().opposed(), P.x.clone().multiply(d.y).subtract(P.y.clone().multiply(d.x)).opposed());
        this._OA = P.clone();
        this._d = d.clone();
        this._n = this._d.clone().normal();
        this._exists = true;
        return this;
    };
    parseByPointAndNormal = (P, n) => {
        return this.parseByCoefficient(n.x, n.y, P.x.clone().multiply(n.x)
            .add(P.y.clone().multiply(n.y)).opposed());
    };
    parseByPointAndLine = (P, L, orientation) => {
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
    clone = () => {
        this._a = this._a.clone();
        this._b = this._b.clone();
        this._c = this._c.clone();
        this._d = this._d.clone();
        this._OA = this._OA.clone();
        this._n = this._n.clone();
        this._exists = this.exists;
        return this;
    };
    isParellelTo = (line) => {
        return this.slope.isEqual(line.slope) && this.height.isNotEqual(line.height);
    };
    isSameAs = (line) => {
        return this.slope.isEqual(line.slope) && this.height.isEqual(line.height);
    };
    simplifyDirection = () => {
        let lcm = numeric_1.Numeric.lcm(this._d.x.denominator, this._d.y.denominator), gcd = numeric_1.Numeric.gcd(this._d.x.numerator, this._d.y.numerator);
        this._d.x.multiply(lcm).divide(gcd);
        this._d.y.multiply(lcm).divide(gcd);
        return this;
    };
    intersection = (line) => {
        let Pt = new point_1.Point(), isParallel = false, isSame = false, hasIntersection = true;
        if (this._b.isZero() || line.b.isZero()) {
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
    distanceTo(pt) {
        let numerator = pt.x.clone().multiply(this._a)
            .add(pt.y.clone().multiply(this._b))
            .add(this._c).abs(), d2 = this.normal.normSquare;
        if (d2.isZero()) {
            return {
                value: NaN,
                tex: 'Not a line',
                fraction: new coefficients_1.Fraction().infinite()
            };
        }
        let value = numerator.value / Math.sqrt(d2.value), F = numerator.clone().divide(d2.clone().sqrt());
        if (d2.isSquare()) {
            return {
                value,
                tex: F.tex,
                fraction: F
            };
        }
        return {
            value,
            tex: `\\frac{${numerator.tex}}{\\sqrt{${d2.tex}}}`,
            fraction: F
        };
    }
    hitSegment(A, B) {
        let iPt = this.intersection(new Line(A, B));
        if (iPt.hasIntersection) {
            return iPt.point.x.value >= Math.min(A.x.value, B.x.value)
                && iPt.point.x.value <= Math.max(A.x.value, B.x.value)
                && iPt.point.y.value >= Math.min(A.y.value, B.y.value)
                && iPt.point.y.value <= Math.max(A.y.value, B.y.value);
        }
        return false;
    }
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
//# sourceMappingURL=line.js.map