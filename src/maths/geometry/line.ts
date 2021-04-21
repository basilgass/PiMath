/**
 * This class works for 2d line in a plane.
 */

import {Fraction} from "../coefficients/fraction";
import {Vector} from "./vector";
import {Point} from "./point";
import {Polynom} from "../algebra/polynom";
import {Numeric} from "../numeric";
import {Equation} from "../algebra/equation";

export class Line {
    // A line is defined as the canonical form
    // ax + by + c = 0
    private _a: Fraction;
    private _b: Fraction;
    private _c: Fraction;
    private _OA: Point;
    private _d: Vector;
    private _n: Vector;

    constructor(...values: any) {

        if (values !== undefined) {
            this.parse(...values);
        }
    }

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get tex(): { canonical: string, mxh: string, parametric: string } {
        // canonical    =>  ax + by + c = 0
        // mxh          =>  y = -a/b x - c/b
        // parametric   =>  (xy) = OA + k*d

        let canonical = new Equation(new Polynom().parse('xy', this._a, this._b, this._c), new Polynom('0')).simplify()
        // Make sur the first item is positive.
        if(this._a.isNegative()){
            canonical.multiply(-1);
        }

        return {
            canonical: canonical.tex,
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.tex : 'y=' + new Polynom().parse('x', this.slope, this.height).tex,
            parametric: `${Point.pmatrix('x', 'y')} = ${Point.pmatrix(this._OA.x, this._OA.y)} + k\\cdot ${Point.pmatrix(this._d.x, this._d.y)}`
        }
    }

    get a(): Fraction {
        return this._a;
    }

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

    get n(): Vector {
        return this._n;
    }

    set d(value: Vector) {
        this._d = value;
    }

    get slope(): Fraction {
        return this._a.clone().opposed().divide(this._b);
    }

    get height(): Fraction {
        return this._c.clone().opposed().divide(this._b);
    }

// ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    parse = (...values: any): Line => {
        if (values.length === 3) {
            return this.parseByCoefficient(values[0], values[1], values[2]);
        } else if (values.length === 2) {
            if (values[0].isPoint && values[1].isVector) {
                return this.parseByPointAndVector(values[0], values[1]);
            } else if (values[0].isPoint && values[1].isPoint) {
                return this.parseByPointAndVector(values[0], new Vector(values[0], values[1]));
            }
        } else if (values.length === 1){
            // Maybe it's a string or an equation
            let equ = new Equation(values[0]);
            if(equ.isEquation){
                // Check if it's a valid equation.
                equ.reorder(true)

                // It must contain either x, y or both.
                let letters = new Set(equ.letters());

                // No 'x', no 'y' in the equations
                if(!(letters.has('x') || letters.has('y'))){return;}

                // Another letter in the equation.
                for(let elem of ['x', 'y']){
                    if(letters.has(elem)){
                        letters.delete(elem)}
                }
                if(letters.size>0){
                    console.log('Extra variable in the equation.')
                    return;
                }

                // Everything should be ok now...
                return this.parseByCoefficient(equ.left.monomByLetter('x').coefficient, equ.left.monomByLetter('y').coefficient, equ.left.monomByDegree(0).coefficient)
            }
        }
        // TODO: Add the ability to create line from a normal vector
        console.log('Someting wrong happend while creating the line')
        return;
    }

    parseByCoefficient = (a: Fraction, b: Fraction, c: Fraction): Line => {
        this._a = new Fraction(a);
        this._b = new Fraction(b);
        this._c = new Fraction(c);

        // TODO: initialize direction and reference point
        this._d = new Vector(this._b.clone(), this._a.clone().opposed());
        this._OA = new Point(new Fraction().zero(), this._c.clone());
        this._n = this._d.clone().normal();

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

        return this;
    }


    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    isParellelTo = (line: Line): Boolean => {
        // Do they have the isSame direction ?
        return this.slope.isEqual(line.slope) && this.height.isDifferent(line.height);
    }
    isSameAs = (line: Line): Boolean => {
        return this.slope.isEqual(line.slope) && this.height.isEqual(line.height);
    }
    simplifyDirection = (): Line => {
        let lcm = Numeric.lcm(this._d.x.denominator, this._d.y.denominator),
            gcd = Numeric.gcd(this._d.x.numerator, this._d.y.numerator);

        this._d.x.multiply(lcm).divide(gcd);
        this._d.y.multiply(lcm).divide(gcd);
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

        if (this.isParellelTo(line)) {
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
            d2 = this._n.normSquare;

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

    // ------------------------------------------
    // Special functions
    // ------------------------------------------
    canonicalAsFloatCoefficient(decimals: number): string{
        if(decimals===undefined){
            decimals = 2;
        }

        let ca = this._a.value,
            cb = this._b.value,
            cc= this._c.value,
            canonical = '';

        if(!this._a.isZero()){
            if(this._a.isOne()){
                canonical = 'x'
            }else if(this._a.clone().opposed().isOne()){
                canonical = '-x'
            }else{
                canonical = this._a.value.toFixed(decimals)+'x'
            }
        }

        if(!this._b.isZero()){
            if(this._b.isPositive()){canonical+='+'}
            canonical += this._b.value.toFixed(decimals) + 'y'
        }

        if(!this._c.isZero()){
            if(this._c.isPositive()){canonical+='+'}
            canonical += this._c.value.toFixed(decimals)
        }


        return canonical + '=0';
    }
}