/**
 * This class works for 2d line in a plane.
 */

import {Vector} from "./vector";
import {Point} from "./point";
import {Numeric} from "../numeric";
import {Fraction} from "../coefficients/fraction";
import {Equation} from "../algebra/equation";
import {Polynom} from "../algebra/polynom";
import {Random} from "../randomization/random";
import {Monom} from "../algebra/monom";

export enum LinePropriety {
    None,
    Parallel = 'parallel',
    Perpendicular = 'perpendicular',
    Tangent = 'tangent'
}

export class Line {
    // A line is defined as the canonical form
    static PERPENDICULAR = LinePropriety.Perpendicular
    static PARALLEL = LinePropriety.Parallel
    private _referencePropriety: LinePropriety
    private _referenceLine: Line
    private _reduceBeforeDisplay: boolean
    // ax + by + c = 0
    private _a: Fraction;
    private _b: Fraction;
    private _c: Fraction;
    private _OA: Point;
    private _d: Vector;
    private _n: Vector;
    private _exists: boolean

    /**
     * Value can be a mix of:
     *
     * @param values
     */
    constructor(...values: unknown[]) {

        this._exists = false;
        this._reduceBeforeDisplay = true

        if (values.length > 0) {
            this.parse(...values);
        }

        return this;
    }

    get a(): Fraction {
        return this._a;
    }

    // ------------------------------------------
    // Getter and setter

    set a(value: Fraction) {
        this._a = value;
    }

    get b(): Fraction {
        return this._b;
    }

    set b(value: Fraction) {
        this._b = value;
    }

    get c(): Fraction {
        return this._c;
    }

    set c(value: Fraction) {
        this._c = value;
    }

    get OA(): Point {
        return this._OA;
    }

    set OA(value: Point) {
        this._OA = value;
    }

    get d(): Vector {
        return this._d;
    }

    set d(value: Vector) {
        this._d = value;
    }

    get n(): Vector {
        return this._n;
    }

    get exists(): boolean {
        return this._exists;
    }

    // ------------------------------------------
    get equation(): Equation {
        let equ = new Equation(new Polynom().parse('xy', this._a, this._b, this._c), new Polynom('0'))
        if (this._reduceBeforeDisplay) {
            return equ.simplify();
        } else {
            return equ
        }
    }

    get system(): { x: Equation, y: Equation } {
        let e1 = new Equation(
                new Polynom('x'),
                new Polynom(this._OA.x)
                    .add(new Monom('k').multiplyByNumber(this._d.x))
            ),
            e2 = new Equation(
                new Polynom('y'),
                new Polynom(this._OA.y)
                    .add(new Monom('k').multiplyByNumber(this._d.y))
            )

        return {x: e1, y: e2}
    }

    get tex(): { canonical: string, mxh: string, parametric: string, equation: string, system: string } {
        // canonical    =>  ax + by + c = 0
        // mxh          =>  y = -a/b x - c/b
        // parametric   =>  (xy) = OA + k*d
        // equation     => ax + by = -c

        let canonical = this.equation.clone().reorder(true);
        // Make sur the first item is positive.
        if (this._a.isNegative()) {
            canonical.multiply(-1);
        }

        let d = this._d.clone()
        if (this._reduceBeforeDisplay) {
            d.simplifyDirection()
        }

        return {
            canonical: canonical.tex,
            equation: canonical.clone().reorder().tex,
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.tex : 'y=' + new Polynom().parse('x', this.slope, this.height).tex,
            parametric: `${Point.pmatrix('x', 'y')} = ${Point.pmatrix(this._OA.x, this._OA.y)} + k\\cdot ${Point.pmatrix(d.x, d.y)}`,
            system: `\\left\\{\\begin{aligned}
            x &= ${(new Polynom(this._OA.x)
                .add(new Monom(this._d.x).multiply(new Monom('k'))))
                .reorder('k', true)
                .tex}\\\\\ 
            y &= ${(new Polynom(this._OA.y)
                .add(new Monom(this._d.y).multiply(new Monom('k'))))
                .reorder('k', true)
                .tex}
            \\end{aligned}\\right.`
        }
    }

    get reduceBeforeDisplay(): boolean {
        return this._reduceBeforeDisplay;
    }

    set reduceBeforeDisplay(value: boolean) {
        this._reduceBeforeDisplay = value;
    }

    get display(): { canonical: string, mxh: string, parametric: string } {
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
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.display : 'y=' + new Polynom().parse('x', this.slope, this.height).display,
            parametric: ""
        }
    }

    get normal(): Vector {
        return new Vector(this._a, this._b);
    }

    get director(): Vector {
        return this._d.clone()
    }

    get slope(): Fraction {
        return this._a.clone().opposed().divide(this._b);
    }

    get height(): Fraction {
        return this._c.clone().opposed().divide(this._b);
    }

    randomPoint = (k?: number): Point => {
        // Return a random point on the line.
        return this._d
            .clone()
            .multiplyByScalar(Random.numberSym((k === undefined || k <= 1) ? 3 : k, false))
            .add(this._OA.asVector)
            .asPoint
    }
    randomNearPoint = (k?: number): Point => {
        let pt = this.randomPoint(k)

        let maxIterationTest = 10
        while (this.isOnLine(pt) && maxIterationTest > 0) {
            pt.x.add(Random.numberSym(1, false))
            pt.y.add(Random.numberSym(1, false))
            maxIterationTest--

        }
        return pt
    }

// ------------------------------------------
    // Creation / parsing functions

    // ------------------------------------------
    /**
     * Parse data to a line
     * @param {any} values
     * @returns {Line}
     */
    parse = (...values: unknown[]): Line => {
        this._exists = false;

        // Nothing is given...
        if (values.length === 0) {
            return this
        }

        // One value only: already a line (clone it), an Equation, a string (as Equation)
        if (values.length === 1) {
            if (values[0] instanceof Line) {
                // Already a Line
                return values[0].clone()
            } else if (values[0] instanceof Equation) {
                // It's an Equation
                return this.parseEquation(values[0])
            } else if (typeof values[0] === "string") {
                // It's a string - create an Equation from it.
                try {
                    let E = new Equation(values[0])
                    return this.parse(E)
                } catch (e) {
                    return this
                }
            }
        }

        if (values.length === 2) {
            if (values[0] instanceof Point && values[1] instanceof Vector) {
                return this.parseByPointAndVector(values[0], values[1]);
            } else if (values[0] instanceof Point && values[1] instanceof Point) {
                return this.parseByPointAndVector(values[0], new Vector(values[0], values[1]));
            } else if (values[0] instanceof Vector && values[1] instanceof Point) {
                return this.parseByPointAndNormal(values[1], values[0])
            }
        }

        if (values.length === 3) {
            if (
                (values[0] instanceof Fraction || typeof values[0] === 'number')
                &&
                (values[1] instanceof Fraction || typeof values[1] === 'number')
                &&
                (values[2] instanceof Fraction || typeof values[2] === 'number')
            ) {
                return this.parseByCoefficient(values[0], values[1], values[2]);
            } else if (
                values[0] instanceof Point && values[1] instanceof Vector
            ) {
                if (values[2] === LinePropriety.Perpendicular) {
                    return this.parseByPointAndNormal(values[0], values[1])
                } else if (values[2] === LinePropriety.Parallel) {
                    return this.parseByPointAndVector(values[0], values[1])
                }
            } else if (values[0] instanceof Point && values[1] instanceof Line) {
                if (values[2] === LinePropriety.Parallel || values[2] === null) {
                    return this.parseByPointAndLine(values[0], values[1], LinePropriety.Parallel)
                } else {
                    return this.parseByPointAndLine(values[0], values[1], LinePropriety.Perpendicular)
                }
            }
        }

        // TODO: Add the ability to create line from a normal vector
        console.log('Someting wrong happend while creating the line')
        return this;
    }

    parseEquation = (equ: Equation): Line => {
        // Reorder the eequation
        equ.reorder(true)

        // It must contain either x, y or both.
        let letters = new Set(equ.letters());

        // No 'x', no 'y' in the equations
        if (!(letters.has('x') || letters.has('y'))) {
            return this
        }

        // Another letter in the equation ?
        for (let elem of ['x', 'y']) {
            if (letters.has(elem)) {
                letters.delete(elem)
            }
        }

        if (letters.size > 0) {
            return this
        }

        // Everything should be ok now...
        return this.parseByCoefficient(equ.left.monomByLetter('x').coefficient, equ.left.monomByLetter('y').coefficient, equ.left.monomByDegree(0).coefficient)
    }
    parseByCoefficient = (a: Fraction | number, b: Fraction | number, c: Fraction | number): Line => {
        this._a = new Fraction(a);
        this._b = new Fraction(b);
        this._c = new Fraction(c);

        this._d = new Vector(this._b.clone(), this._a.clone().opposed());
        this._OA = new Point(new Fraction().zero(), this._c.clone());
        this._n = this._d.clone().normal();

        this._exists = true;
        return this;
    }

    parseByPointAndVector = (P: Point, d: Vector): Line => {
        // OX = OP + k*d
        // x = px + kdx     * dy
        // y = py + kdy     * dx
        // ------------------
        // dy * x = px * dy + kdxdy
        // dx * y = py * dx + kdxdy
        // ------------------
        // dy * x - dx * y = px * dy - py * dx
        // dy * x - dx * y - (px * dy - py * dx) = 0
        this.parseByCoefficient(
            d.y,
            d.x.clone().opposed(),
            P.x.clone().multiply(d.y).subtract(P.y.clone().multiply(d.x)).opposed()
        )

        // Choose the current values as point and direction vector instead of the automatic version.
        this._OA = P.clone();
        this._d = d.clone();
        this._n = this._d.clone().normal();

        this._exists = true;
        return this;
    }

    parseByPointAndNormal = (P: Point, n: Vector): Line => {
        return this.parseByCoefficient(
            n.x,
            n.y,
            P.x.clone().multiply(n.x)
                .add(P.y.clone().multiply(n.y)).opposed()
        )
    }

    parseByPointAndLine = (P: Point, L: Line, orientation?: LinePropriety): Line => {

        if (orientation === undefined) {
            orientation = LinePropriety.Parallel
        }

        if (orientation === LinePropriety.Parallel) {
            return this.parseByPointAndNormal(P, L.normal)
        } else if (orientation === LinePropriety.Perpendicular) {
            return this.parseByPointAndNormal(P, L.director)
        }

        this._exists = false
        return this
    }

    clone = (): Line => {
        this._a = this._a.clone();
        this._b = this._b.clone();
        this._c = this._c.clone();

        this._d = this._d.clone();
        this._OA = this._OA.clone();
        this._n = this._n.clone();

        this._exists = this.exists
        return this;
    }
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    isOnLine = (pt: Point): Boolean => {
        return this._a.clone()
            .multiply(pt.x)
            .add(
                this._b.clone()
                    .multiply(pt.y)
            )
            .add(this._c)
            .isZero()
    }

    isParallelTo = (line: Line): Boolean => {
        // Do they have the isSame direction ?
        return this.slope.isEqual(line.slope) && this.height.isNotEqual(line.height);
    }
    isSameAs = (line: Line): Boolean => {
        return this.slope.isEqual(line.slope) && this.height.isEqual(line.height);
    }
    isPerpendicularTo = (line: Line): Boolean => {
        return this.d.isNormalTo(line.d)
    }
    isVertical = (): Boolean => {
        return this.slope.isInfinity()
    }
    simplify = (): Line => {
        let lcm = Numeric.lcm(this._a.denominator, this._b.denominator, this._c.denominator),
            gcd = Numeric.gcd(this._a.numerator, this._b.numerator, this._c.numerator);

        this.parseByCoefficient(
            this._a.clone().multiply(lcm).divide(gcd),
            this._b.clone().multiply(lcm).divide(gcd),
            this._c.clone().multiply(lcm).divide(gcd),
        )

        return this
    }

    simplifyDirection = (): Line => {
        this._d.simplifyDirection()
        return this;
    }
    intersection = (line: Line): { point: Point, hasIntersection: boolean, isParallel: boolean, isSame: boolean } => {
        let Pt = new Point(), isParallel = false, isSame = false, hasIntersection = true;

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

        if (this.isParallelTo(line)) {
            Pt.x = null;
            Pt.y = null;
            isParallel = true;
        } else if (this.isSameAs(line)) {
            Pt.x = null;
            Pt.y = null;
            isSame = true;
        } else {
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
    }

    distanceTo(pt: Point): { value: number, fraction: Fraction, tex: string } {
        let numerator = pt.x.clone().multiply(this._a)
                .add(pt.y.clone().multiply(this._b))
                .add(this._c).abs(),
            d2 = this.normal.normSquare;

        // The denominator is null - shouldn't be possible
        if (d2.isZero()) {
            return {
                value: NaN,
                tex: 'Not a line',
                fraction: new Fraction().infinite()
            }
        }
        // The denominator is a perfect square - simplify the tex result
        let value = numerator.value / Math.sqrt(d2.value),
            F = numerator.clone().divide(d2.clone().sqrt());

        // The denominator is a perfect square.
        if (d2.isSquare()) {
            return {
                value,
                tex: F.tex,
                fraction: F
            }
        }
        // Complete answer...
        return {
            value,
            tex: `\\frac{${numerator.tex}}{\\sqrt{${d2.tex}}}`,
            fraction: F
        };
    }

    hitSegment(A: Point, B: Point): boolean {
        let iPt = this.intersection(
            new Line(A, B)
        )

        // There is an intersection point
        if (iPt.hasIntersection) {
            return iPt.point.x.value >= Math.min(A.x.value, B.x.value)
                && iPt.point.x.value <= Math.max(A.x.value, B.x.value)
                && iPt.point.y.value >= Math.min(A.y.value, B.y.value)
                && iPt.point.y.value <= Math.max(A.y.value, B.y.value)
        }
        return false;
    }

    getValueAtX = (value: Fraction | number): Fraction => {
        const equ = this.equation.clone().isolate('y'),
            F = new Fraction(value)

        if (equ instanceof Equation) {
            return equ.right.evaluate({x: F})
        }
        return
    }
    getValueAtY = (value: Fraction | number): Fraction => {
        const equ = this.equation.clone().isolate('x'),
            F = new Fraction(value)

        if (equ instanceof Equation) {
            return equ.right.evaluate({y: F})
        }
        return
    }

    // ------------------------------------------
    // Special functions
    // ------------------------------------------
    canonicalAsFloatCoefficient(decimals: number): string {
        if (decimals === undefined) {
            decimals = 2;
        }

        let ca = this._a.value,
            cb = this._b.value,
            cc = this._c.value,
            canonical = '';

        if (!this._a.isZero()) {
            if (this._a.isOne()) {
                canonical = 'x'
            } else if (this._a.clone().opposed().isOne()) {
                canonical = '-x'
            } else {
                canonical = this._a.value.toFixed(decimals) + 'x'
            }
        }

        if (!this._b.isZero()) {
            if (this._b.isPositive()) {
                canonical += '+'
            }
            canonical += this._b.value.toFixed(decimals) + 'y'
        }

        if (!this._c.isZero()) {
            if (this._c.isPositive()) {
                canonical += '+'
            }
            canonical += this._c.value.toFixed(decimals)
        }


        return canonical + '=0';
    }
}