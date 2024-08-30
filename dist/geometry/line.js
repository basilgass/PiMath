import { Numeric } from "../numeric";
import { Fraction } from "../coefficients/fraction";
import { Equation } from "../algebra/equation";
import { Polynom } from "../algebra/polynom";
import { Monom } from "../algebra/monom";
import { Vector } from "./vector";
import { randomIntSym } from "../randomization/rndHelpers";
export var LinePropriety;
(function (LinePropriety) {
    LinePropriety["None"] = "none";
    LinePropriety["Parallel"] = "parallel";
    LinePropriety["Perpendicular"] = "perpendicular";
    LinePropriety["Tangent"] = "tangent";
})(LinePropriety || (LinePropriety = {}));
export class Line {
    static PERPENDICULAR = LinePropriety.Perpendicular;
    static PARALLEL = LinePropriety.Parallel;
    #reduceBeforeDisplay;
    #a;
    #b;
    #c;
    #OA;
    #d;
    #n;
    constructor(...values) {
        this.#a = new Fraction().zero();
        this.#b = new Fraction().zero();
        this.#c = new Fraction().zero();
        this.#OA = new Vector();
        this.#d = new Vector();
        this.#n = new Vector();
        this.#reduceBeforeDisplay = true;
        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }
    get a() {
        return this.#a;
    }
    set a(value) {
        this.#a = value;
    }
    get b() {
        return this.#b;
    }
    set b(value) {
        this.#b = value;
    }
    get c() {
        return this.#c;
    }
    set c(value) {
        this.#c = value;
    }
    get OA() {
        return this.#OA;
    }
    set OA(value) {
        this.#OA = value;
    }
    get d() {
        return this.#d;
    }
    set d(value) {
        this.#d = value;
    }
    get n() {
        return this.#n;
    }
    get equation() {
        const equ = new Equation(new Polynom().parse('xy', this.#a, this.#b, this.#c), new Polynom('0'));
        if (this.#reduceBeforeDisplay) {
            return equ.simplify();
        }
        else {
            return equ;
        }
    }
    get system() {
        const e1 = new Equation(new Polynom('x'), new Polynom(this.#OA.x)
            .add(new Monom('k').multiply(this.#d.x))), e2 = new Equation(new Polynom('y'), new Polynom(this.#OA.y)
            .add(new Monom('k').multiply(this.#d.y)));
        return { x: e1, y: e2 };
    }
    get tex() {
        const canonical = this.equation.clone().reorder(true);
        if (this.#a.isNegative()) {
            canonical.multiply(-1);
        }
        const d = this.#d.clone();
        if (this.#reduceBeforeDisplay) {
            d.simplify();
        }
        return {
            canonical: canonical.tex,
            equation: canonical.clone().reorder().tex,
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.tex : 'y=' + new Polynom().parse('x', this.slope, this.height).tex,
            parametric: `${Vector.asTex('x', 'y')} = ${Vector.asTex(this.#OA.x.tex, this.#OA.y.tex)} + k\\cdot ${Vector.asTex(d.x.tex, d.y.tex)}`,
            system: `\\left\\{\\begin{aligned}
            x &= ${(new Polynom(this.#OA.x)
                .add(new Monom(this.#d.x).multiply(new Monom('k'))))
                .reorder('k', true)
                .tex}\\\\ 
            y &= ${(new Polynom(this.#OA.y)
                .add(new Monom(this.#d.y).multiply(new Monom('k'))))
                .reorder('k', true)
                .tex}
            \\end{aligned}\\right.`
        };
    }
    get reduceBeforeDisplay() {
        return this.#reduceBeforeDisplay;
    }
    set reduceBeforeDisplay(value) {
        this.#reduceBeforeDisplay = value;
    }
    get display() {
        const canonical = this.equation;
        if (this.#a.isNegative()) {
            canonical.multiply(-1);
        }
        return {
            canonical: canonical.display,
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.display : 'y=' + new Polynom().parse('x', this.slope, this.height).display,
            parametric: ""
        };
    }
    get normal() {
        return new Vector(this.#a, this.#b);
    }
    get director() {
        return this.#d.clone();
    }
    get slope() {
        return this.#a.clone().opposite().divide(this.#b);
    }
    get height() {
        return this.#c.clone().opposite().divide(this.#b);
    }
    randomPoint = (k) => {
        return this.#d
            .clone()
            .multiplyByScalar(randomIntSym((k === undefined || k <= 1) ? 3 : k, false))
            .add(this.#OA);
    };
    randomNearPoint = (k) => {
        const pt = this.randomPoint(k);
        let maxIterationTest = 10;
        while (this.isOnLine(pt) && maxIterationTest > 0) {
            pt.x.add(randomIntSym(1, false));
            pt.y.add(randomIntSym(1, false));
            maxIterationTest--;
        }
        return pt;
    };
    parse = (...values) => {
        if (values.length === 0) {
            return this;
        }
        if (values.length === 1) {
            if (values[0] instanceof Line) {
                return values[0].clone();
            }
            else if (values[0] instanceof Equation) {
                return this.parseEquation(values[0]);
            }
            else if (typeof values[0] === "string") {
                try {
                    const E = new Equation(values[0]);
                    return this.parse(E);
                }
                catch (e) {
                    return this;
                }
            }
        }
        if (values.length === 2 && values[0] instanceof Vector && values[1] instanceof Vector) {
            if (values[0].asPoint && !values[1].asPoint) {
                return this.parseByPointAndVector(values[0], values[1]);
            }
            else if (values[0].asPoint && values[1].asPoint) {
                return this.parseByPointAndVector(values[0], new Vector(values[0], values[1]));
            }
            else if (!values[0].asPoint && values[1].asPoint) {
                return this.parseByPointAndNormal(values[1], values[0]);
            }
        }
        if (values.length === 3) {
            if (values[0] instanceof Vector && values[1] instanceof Vector) {
                if (values[2] === LinePropriety.Perpendicular) {
                    return this.parseByPointAndNormal(values[0], values[1]);
                }
                else if (values[2] === LinePropriety.Parallel) {
                    return this.parseByPointAndVector(values[0], values[1]);
                }
            }
            if (values[0] instanceof Vector && values[1] instanceof Line) {
                if (values[2] === LinePropriety.Parallel || values[2] === null) {
                    return this.parseByPointAndLine(values[0], values[1], LinePropriety.Parallel);
                }
                else {
                    return this.parseByPointAndLine(values[0], values[1], LinePropriety.Perpendicular);
                }
            }
            return this.parseByCoefficient(values[0], values[1], values[2]);
        }
        console.log('Something wrong happened while creating the line');
        return this;
    };
    parseEquation = (equ) => {
        equ.reorder(true);
        const letters = new Set(equ.letters());
        if (!(letters.has('x') || letters.has('y'))) {
            return this;
        }
        for (const elem of ['x', 'y']) {
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
        this.#a = new Fraction(a);
        this.#b = new Fraction(b);
        this.#c = new Fraction(c);
        this.#d = new Vector(this.#b.clone(), this.#a.clone().opposite());
        this.#OA = new Vector(new Fraction().zero(), this.#c.clone());
        this.#n = this.#d.clone().normal();
        return this;
    };
    parseByPointAndVector = (P, d) => {
        this.parseByCoefficient(d.y, d.x.clone().opposite(), P.x.clone().multiply(d.y).subtract(P.y.clone().multiply(d.x)).opposite());
        this.#OA = P.clone();
        this.#d = d.clone();
        this.#n = this.#d.clone().normal();
        return this;
    };
    parseByPointAndNormal = (P, n) => {
        return this.parseByCoefficient(n.x, n.y, P.x.clone().multiply(n.x)
            .add(P.y.clone().multiply(n.y)).opposite());
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
        return this;
    };
    clone = () => {
        this.#a = this.#a.clone();
        this.#b = this.#b.clone();
        this.#c = this.#c.clone();
        this.#d = this.#d.clone();
        this.#OA = this.#OA.clone();
        this.#n = this.#n.clone();
        return this;
    };
    isOnLine = (pt) => {
        return this.#a.clone()
            .multiply(pt.x)
            .add(this.#b.clone()
            .multiply(pt.y))
            .add(this.#c)
            .isZero();
    };
    isParallelTo = (line) => {
        return this.slope.isEqual(line.slope) && this.height.isNotEqual(line.height);
    };
    isSameAs = (line) => {
        return this.slope.isEqual(line.slope) && this.height.isEqual(line.height);
    };
    isPerpendicularTo = (line) => {
        return this.d.isNormalTo(line.d);
    };
    isVertical = () => {
        return this.slope.isInfinity();
    };
    simplify = () => {
        const lcm = Numeric.lcm(this.#a.denominator, this.#b.denominator, this.#c.denominator), gcd = Numeric.gcd(this.#a.numerator, this.#b.numerator, this.#c.numerator);
        this.parseByCoefficient(this.#a.clone().multiply(lcm).divide(gcd), this.#b.clone().multiply(lcm).divide(gcd), this.#c.clone().multiply(lcm).divide(gcd));
        return this;
    };
    simplifyDirection = () => {
        this.#d.simplify();
        return this;
    };
    intersection = (line) => {
        const Pt = new Vector();
        let isParallel = false, isSame = false;
        if (this.#b.isZero() || line.b.isZero()) {
        }
        if (this.isParallelTo(line)) {
            Pt.x = new Fraction().invalid();
            Pt.y = new Fraction().invalid();
            isParallel = true;
        }
        else if (this.isSameAs(line)) {
            Pt.x = new Fraction().invalid();
            Pt.y = new Fraction().invalid();
            isSame = true;
        }
        else {
            Pt.x = this.#b.clone().multiply(line.c).subtract(this.#c.clone().multiply(line.b))
                .divide(this.#a.clone().multiply(line.b).subtract(this.#b.clone().multiply(line.a)));
            Pt.y = this.#a.clone().multiply(line.c).subtract(this.#c.clone().multiply(line.a))
                .divide(this.#b.clone().multiply(line.a).subtract(this.#a.clone().multiply(line.b)));
        }
        return {
            point: Pt,
            hasIntersection: !(isParallel || isSame),
            isParallel,
            isSame
        };
    };
    distanceTo(pt) {
        const numerator = pt.x.clone().multiply(this.#a)
            .add(pt.y.clone().multiply(this.#b))
            .add(this.#c).abs(), d2 = this.normal.normSquare;
        if (d2.isZero()) {
            return {
                value: NaN,
                tex: 'Not a line',
                fraction: new Fraction().infinite()
            };
        }
        const value = numerator.value / Math.sqrt(d2.value), F = numerator.clone().divide(d2.clone().sqrt());
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
        const iPt = this.intersection(new Line(A, B));
        if (iPt.hasIntersection) {
            return iPt.point.x.value >= Math.min(A.x.value, B.x.value)
                && iPt.point.x.value <= Math.max(A.x.value, B.x.value)
                && iPt.point.y.value >= Math.min(A.y.value, B.y.value)
                && iPt.point.y.value <= Math.max(A.y.value, B.y.value);
        }
        return false;
    }
    getValueAtX = (value) => {
        const equ = this.equation.clone().isolate('y'), F = new Fraction(value);
        if (equ instanceof Equation) {
            return equ.right.evaluate({ x: F });
        }
        return new Fraction().invalid();
    };
    getValueAtY = (value) => {
        const equ = this.equation.clone().isolate('x'), F = new Fraction(value);
        if (equ instanceof Equation) {
            return equ.right.evaluate({ y: F });
        }
        return new Fraction().invalid();
    };
    canonicalAsFloatCoefficient(decimals) {
        if (decimals === undefined) {
            decimals = 2;
        }
        let canonical = '';
        if (!this.#a.isZero()) {
            if (this.#a.isOne()) {
                canonical = 'x';
            }
            else if (this.#a.clone().opposite().isOne()) {
                canonical = '-x';
            }
            else {
                canonical = this.#a.value.toFixed(decimals) + 'x';
            }
        }
        if (!this.#b.isZero()) {
            if (this.#b.isPositive()) {
                canonical += '+';
            }
            canonical += this.#b.value.toFixed(decimals) + 'y';
        }
        if (!this.#c.isZero()) {
            if (this.#c.isPositive()) {
                canonical += '+';
            }
            canonical += this.#c.value.toFixed(decimals);
        }
        return canonical + '=0';
    }
}
//# sourceMappingURL=line.js.map