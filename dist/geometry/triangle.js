import { Fraction } from "../coefficients/fraction";
import { Line } from "./line";
import { Equation } from "../algebra/equation";
import { Vector } from "./vector";
export class Triangle {
    _A;
    _B;
    _C;
    _lines;
    _middles;
    _remarquables;
    constructor(...values) {
        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }
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
    parse = (...values) => {
        if (values.length === 6) {
            const v = values.map((x) => new Fraction(x));
            return this.parse(new Vector(v[0], v[1]), new Vector(v[2], v[3]), new Vector(v[4], v[5]));
        }
        else if (values.length === 3) {
            if (values.filter((x) => typeof x === 'string').length === 3) {
                return this.parse(...values.map((x) => new Line(x)));
            }
            else if (values.filter((x) => x instanceof Line).length === 3) {
                this._lines = {
                    'AB': values[0],
                    'BC': values[1],
                    'AC': values[2]
                };
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
                if (values.filter((x) => (x instanceof Vector)).length < 3) {
                    return this.parse(new Vector(values[0]), new Vector(values[1]), new Vector(values[2]));
                }
                this._A = values[0].clone();
                this._B = values[1].clone();
                this._C = values[2].clone();
                this._lines = {
                    'AB': new Line(this._A, this._B),
                    'BC': new Line(this._B, this._C),
                    'AC': new Line(this._A, this._C)
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
    clone = () => {
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
    _updateTriangle = () => {
        this._middles = {
            'AB': new Vector().middleOf(this._A, this._B),
            'AC': new Vector().middleOf(this._A, this._C),
            'BC': new Vector().middleOf(this._B, this._C)
        };
        this._remarquables = this._calculateRemarquableLines();
    };
    getPointByName = (ptName) => {
        switch (ptName.toUpperCase()) {
            case 'A':
                return this._A;
            case 'B':
                return this._B;
            case 'C':
                return this._C;
        }
        return this._A;
    };
    getSegment = (ptName1, ptName2) => {
        return new Vector(this.getPointByName(ptName1), this.getPointByName(ptName2));
    };
    _calculateRemarquableLines = () => {
        const bA = this._calculateBisectors('A'), bB = this._calculateBisectors('B'), bC = this._calculateBisectors('C');
        const remarquables = {
            'medians': {
                'A': new Line(this._A, this._middles.BC),
                'B': new Line(this._B, this._middles.AC),
                'C': new Line(this._C, this._middles.AB),
                'intersection': null
            },
            'mediators': {
                'AB': new Line(this._middles.AB, new Vector(this._A, this._B).normal()),
                'AC': new Line(this._middles.AC, new Vector(this._A, this._C).normal()),
                'BC': new Line(this._middles.BC, new Vector(this._B, this._C).normal()),
                'intersection': null
            },
            'heights': {
                'A': new Line(this._A, new Vector(this._B, this._C).normal()),
                'B': new Line(this._B, new Vector(this._A, this._C).normal()),
                'C': new Line(this._C, new Vector(this._A, this._B).normal()),
                'intersection': null
            },
            'bisectors': {
                'A': bA.internal,
                'B': bB.internal,
                'C': bB.internal,
                'intersection': null
            },
            externalBisectors: {
                'A': bA.external,
                'B': bB.external,
                'C': bC.external,
                'intersection': null
            }
        };
        remarquables.medians.intersection = remarquables.medians.A.intersection(remarquables.medians.B).point;
        remarquables.mediators.intersection = remarquables.mediators.AB.intersection(remarquables.mediators.BC).point;
        remarquables.heights.intersection = remarquables.heights.A.intersection(remarquables.heights.B).point;
        remarquables.bisectors.intersection = remarquables.bisectors.A.intersection(remarquables.bisectors.B).point;
        return remarquables;
    };
    _calculateBisectors = (pt) => {
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
        const b1 = new Line(new Equation(d1.equation.left.clone().multiply(d2.n.simplify().norm), d2.equation.left.clone().multiply(d1.n.simplify().norm)).reorder(true).simplify()), b2 = new Line(new Equation(d1.equation.left.clone().multiply(d2.n.simplify().norm), d2.equation.left.clone().multiply(d1.n.simplify().norm).opposite()).reorder(true).simplify());
        if (pt === 'A') {
            return b1.hitSegment(this.B, this.C) ? { internal: b1, external: b2 } : { internal: b2, external: b1 };
        }
        if (pt === 'B') {
            return b1.hitSegment(this.A, this.C) ? { internal: b1, external: b2 } : { internal: b2, external: b1 };
        }
        if (pt === 'C') {
            return b1.hitSegment(this.B, this.A) ? { internal: b1, external: b2 } : { internal: b2, external: b1 };
        }
        return { internal: b1, external: b2 };
    };
}
//# sourceMappingURL=triangle.js.map