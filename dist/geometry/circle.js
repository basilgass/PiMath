import { Line, LinePropriety } from "./line";
import { Vector } from "./vector";
import { Triangle } from "./triangle";
import { Numeric } from "../numeric";
import { Fraction } from "../coefficients/fraction";
import { Equation } from "../algebra/equation";
import { Polynom } from "../algebra/polynom";
import { Monom } from "../algebra/monom";
export class Circle {
    _center;
    _squareRadius;
    _cartesian;
    _exists;
    constructor(...values) {
        this._exists = false;
        if (values !== undefined) {
            this.parse(...values);
        }
    }
    get center() {
        return this._center;
    }
    get squareRadius() {
        return this._squareRadius;
    }
    get cartesian() {
        return this._cartesian;
    }
    get exists() {
        return this._exists;
    }
    get radius() {
        if (this._squareRadius.isSquare()) {
            return {
                tex: this._squareRadius.clone().sqrt().tex,
                display: this._squareRadius.clone().sqrt().display,
                value: this._squareRadius.clone().sqrt().value
            };
        }
        else {
            return {
                tex: `\\sqrt{${this._squareRadius.tex}}`,
                display: `sqrt(${this._squareRadius.display})`,
                value: this._squareRadius.clone().sqrt().value
            };
        }
    }
    get tex() {
        if (this._exists) {
            let cx, cy;
            if (this._center.x.isZero()) {
                cx = 'x^2';
            }
            else {
                cx = `\\left(x${this._center.x.isNegative() ? '+' : '-'}${this._center.x.clone().abs().tex}\\right)^2`;
            }
            if (this._center.y.isZero()) {
                cy = 'y^2';
            }
            else {
                cy = `\\left(y${this._center.y.isNegative() ? '+' : '-'}${this._center.y.clone().abs().tex}\\right)^2`;
            }
            return `${cx}+${cy}=${this._squareRadius.tex}`;
        }
        else {
            return `\\text{le cercle n'existe pas.}`;
        }
    }
    get developed() {
        return this._cartesian.tex;
    }
    get display() {
        if (this._exists) {
            let cx, cy;
            if (this._center.x.isZero()) {
                cx = 'x^2';
            }
            else {
                cx = `(x${this._center.x.isNegative() ? '+' : '-'}${this._center.x.clone().abs().tex})^2`;
            }
            if (this._center.y.isZero()) {
                cy = 'y^2';
            }
            else {
                cy = `(y${this._center.y.isNegative() ? '+' : '-'}${this._center.y.clone().abs().tex})^2`;
            }
            return `${cx}+${cy}=${this._squareRadius.display}`;
        }
        else {
            return `\\text{le cercle n'existe pas.}`;
        }
    }
    relativePosition = (L) => {
        const distance = L.distanceTo(this.center), radius = Math.sqrt(this._squareRadius.value);
        if (distance.value - radius > 0.0000000001) {
            return 0;
        }
        else if (Math.abs(distance.value - radius) < 0.0000000001) {
            return 1;
        }
        else {
            return 2;
        }
    };
    lineIntersection = (L) => {
        let intersectionPoints = [], solX;
        if (this._cartesian === null) {
            return [];
        }
        const equX = this._cartesian.clone(), lineX = L.equation.clone().isolate('x'), lineY = L.equation.clone().isolate('y');
        if (lineX instanceof Equation && lineY instanceof Equation) {
            equX.replaceBy('y', lineY.right).simplify();
            equX.solve();
            for (const x of equX.solutions) {
                if (x.exact === false && isNaN(x.value)) {
                    continue;
                }
                solX = new Fraction(x.exact === false ? x.value : x.exact);
                intersectionPoints.push(new Vector(solX.clone(), lineY.right.evaluate(solX)));
            }
        }
        return intersectionPoints;
    };
    tangents = (P) => {
        if (P instanceof Fraction) {
            return this._tangentsWithSlope(P);
        }
        else if (this.isPointOnCircle(P)) {
            return this._tangentsThroughOnePointOnTheCircle(P);
        }
        else if (this.center.distanceTo(P).value > this.radius.value) {
            return this._tangentsThroughOnePointOutsideTheCircle(P);
        }
        else {
            console.log('No tangents as the point is inside !');
        }
        return [];
    };
    isPointOnCircle = (P) => {
        return this._cartesian.test({ x: P.x, y: P.y });
    };
    getPointsOnCircle = (numberIsInteger) => {
        if (numberIsInteger === undefined) {
            numberIsInteger = false;
        }
        const triplets = Numeric.pythagoreanTripletsWithTarget(this._squareRadius.value, true);
        let points = [], pt;
        triplets.forEach(triplet => {
            for (const k of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
                pt = new Vector(this.center.x.clone().add(k[0] * triplet[0]), this.center.y.clone().add(k[1] * triplet[1]));
                if (!pt.isInListOfPoints(points)) {
                    points.push(pt);
                }
            }
        });
        return points;
    };
    clone() {
        this._center = this._center.clone();
        this._squareRadius = this._squareRadius.clone();
        this._calculateCartesian();
        return this;
    }
    _tangentsThroughOnePointOnTheCircle = (P) => {
        const CT = new Vector(this._center, P);
        return [new Line(P, CT, LinePropriety.Perpendicular)];
    };
    _tangentsThroughOnePointOutsideTheCircle = (P) => {
        const cx_px = this.center.x.clone().subtract(P.x), cy_py = this.center.y.clone().subtract(P.y), polyLeft = new Polynom('x'), polyRight = new Polynom('x^2+1');
        polyLeft.multiply(cx_px).subtract(cy_py).pow(2);
        polyRight.multiply(this.squareRadius);
        const equ = new Equation(polyLeft, polyRight);
        equ.moveLeft().simplify().solve();
        return equ.solutions.map(sol => {
            let h, equ = new Equation('y', 'x');
            if (sol.exact instanceof Fraction) {
                h = P.x.clone().opposite().multiply(sol.exact).add(P.y);
                equ.right.multiply(sol.exact).add(h);
            }
            else {
                h = P.x.clone().opposite().multiply(sol.value).add(P.y);
                equ.right.multiply(sol.value).add(h);
            }
            return new Line(equ);
        });
    };
    _tangentsWithSlope = (slope) => {
        const a = slope.numerator, b = -slope.denominator, c1 = this._center.x.clone(), c2 = this._center.y.clone(), r = this._squareRadius;
        const sq = this._squareRadius.clone().multiply(slope.numerator ** 2 + slope.denominator ** 2), x1 = c1.clone().multiply(a).opposite().subtract(c2.clone().multiply(b)).add(sq.clone().sqrt()), x2 = c1.clone().multiply(a).opposite().subtract(c2.clone().multiply(b)).subtract(sq.clone().sqrt());
        return [new Line(a, b, x1), new Line(a, b, x2)];
    };
    _reset() {
        this._center = null;
        this._squareRadius = null;
        this._cartesian = null;
        this._exists = false;
        return this;
    }
    parse(...values) {
        this._reset();
        if (typeof values[0] === 'string') {
            this._parseEquation(new Equation(values[0]));
        }
        else if (values[0] instanceof Equation) {
            this._parseEquation(values[0]);
        }
        else if (values[0] instanceof Circle) {
            this._parseCopyCircle(values[0]);
        }
        else if (values[0] instanceof Vector && values.length > 1) {
            if (values[1] instanceof Vector) {
                if (values[2] instanceof Vector) {
                    this._parseThroughtThreePoints(values[0], values[1], values[2]);
                }
                else {
                    this._parseCenterAndPointThrough(values[0], values[1]);
                }
            }
            else if (values[1] instanceof Fraction || typeof values[1] === 'number') {
                this._parseCenterAndRadius(values[0], values[1], (typeof values[2] === "boolean") ? values[2] : false);
            }
        }
        if (this._exists) {
            this._calculateCartesian();
            if (this._squareRadius !== undefined && this._squareRadius.isNegative()) {
                this._exists = false;
            }
        }
        return this;
    }
    _calculateCartesian() {
        this._cartesian = (new Equation(new Polynom(`(x-(${this._center.x.display}))^2+(y-(${this._center.y.display}))^2`), new Polynom(this._squareRadius.display))).moveLeft();
    }
    _parseCopyCircle(circle) {
        this._center = circle.center.clone();
        this._squareRadius = circle.squareRadius.clone();
        this._calculateCartesian();
        this._exists = circle.exists;
        return this;
    }
    _parseCenterAndRadius(center, radius, square) {
        this._center = center.clone();
        if (square) {
            this._squareRadius = (new Fraction(radius));
        }
        else {
            this._squareRadius = new Fraction(radius).pow(2);
        }
        this._exists = true;
        return this;
    }
    _parseCenterAndPointThrough(center, pointThrough) {
        this._center = center.clone();
        this._squareRadius = new Vector(this._center, pointThrough).normSquare;
        this._exists = true;
        return this;
    }
    _parseEquation(equ) {
        this._exists = false;
        equ.moveLeft();
        if (equ.degree('x').value === 2 && equ.degree('y').value === 2) {
            let x2 = equ.left.monomByDegree(2, 'x'), y2 = equ.left.monomByDegree(2, 'y'), x1, y1, c;
            if (x2.coefficient.isEqual(y2.coefficient)) {
                equ.divide(x2.coefficient);
                x1 = equ.left.monomByDegree(1, 'x');
                y1 = equ.left.monomByDegree(1, 'y');
                c = equ.left.monomByDegree(0);
                this._center = new Vector(x1.coefficient.clone().divide(2).opposite(), y1.coefficient.clone().divide(2).opposite());
                this._squareRadius = c.coefficient.clone().opposite()
                    .add(this._center.x.clone().pow(2))
                    .add(this._center.y.clone().pow(2));
                this._calculateCartesian();
                this._exists = true;
            }
            else {
                this._center = null;
                this._squareRadius = null;
                this._exists = false;
            }
        }
        return this;
    }
    _parseThroughtThreePoints(A, B, C) {
        const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(), mAC = T.remarquables.mediators.AC.clone();
        this.parse(mAB.intersection(mAC).point, A);
        return this;
    }
}
//# sourceMappingURL=circle.js.map