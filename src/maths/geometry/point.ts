/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
import {Line} from "./line";
import {Vector} from "./vector";
import {Fraction} from "../coefficients/fraction";

/**
 * Helper class - a way to identify an object {x: number, y: number}
 */
class PointXY {
    x: number
    y: number
}

export class Point {
    private _exist: boolean;

    constructor(...values: unknown[]) {
        this._x = new Fraction().zero();
        this._y = new Fraction().zero();

        if (values !== undefined) {
            this.parse(...values);
        }

        return this
    };

    private _x: Fraction;   // 1st component

    // ------------------------------------------
    get x(): Fraction {
        return this._x;
    }

    // ------------------------------------------
    // Getter and setter

    set x(value: Fraction) {
        this._x = value;
    }

    private _y: Fraction;   // 2nd component

    get y(): Fraction {
        return this._y;
    }

    set y(value: Fraction) {
        this._y = value;
    }

    get tex(): string {
        let pts = [];

        pts.push(this._x.tex);
        pts.push(this._y.tex);

        return `\\left(${pts.join(';')}\\right)`
    }

    get display(): string {
        let pts = [];

        pts.push(this._x.tex);
        pts.push(this._y.tex);

        return `(${pts.join(';')})`
    }

    get asVector(): Vector {
        return new Vector(this.x, this.y)
    }

    // ------------------------------------------
    // Creation / parsing functions

    get key(): string {
        return `${this.x.display};${this.y.display}`
    }

    // ------------------------------------------
    static pmatrix = (a: any, b: any, c?: any): string => {
        if (c === undefined) {
            return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\end{pmatrix}`;
        } else {
            return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\\\ ${c.tex ? c.tex : c} \\end{pmatrix}`;
        }
    };

    // ------------------------------------------
    parse = (...values: unknown[]): Point => {
        // Initialize the value.
        this.zero();

        // Nothing is given
        if (values.length === 0) {
            return this;
        }

        // One element is given - might be already a point !
        if (values.length === 1) {
            // it's already a point - clone it
            if (values[0] instanceof Point) {
                this._x = values[0].x.clone()
                this._y = values[0].y.clone()
                return this
            }

            // Value is given as string, comma separated.
            if (typeof values[0] === 'string') {
                let xy = values[0].split(',')
                if (xy.length === 2) {
                    this._x = new Fraction(xy[0]).reduce()
                    this._y = new Fraction(xy[1]).reduce()
                    return this
                }
            }

            // Value given as an object with {x: value, y: value}
            if (values[0] instanceof PointXY) {
                this._x = new Fraction(values[0].x).reduce()
                this._y = new Fraction(values[0].y).reduce()
                return this
            } else {
                return this.zero()
            }
        }

        if (values.length === 2) {
            this._x = new Fraction(values[0] as number | string).reduce()
            this._y = new Fraction(values[1] as number | string).reduce()
            return this
        }

        return this;
    };

    clone = (): Point => {
        this._x = this._x.clone()
        this._y = this._y.clone()

        return this
    }

    zero = (): Point => {
        this._x = new Fraction(null);
        this._y = new Fraction(null);
        return this;
    }
    // ------------------------------------------
    // Display functions

    origin = (): Point => {
        this.zero();
        return this;
    }
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------

    // ------------------------------------------
    // Vector functions
    // ------------------------------------------

    // ------------------------------------------
    // Static functions

    middleOf = (P1: Point, P2: Point): Point => {
        this._x = P1.x.clone().add(P2.x).divide(2);
        this._y = P1.y.clone().add(P2.y).divide(2);

        return this;
    }

    // ------------------------------------------
    texValues = (numberOfDigits: number): string => {
        let pts = [];

        pts.push(this._x.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));
        pts.push(this._y.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));

        return `\\left(${pts.join(';')}\\right)`
    }

    distanceTo = (item: Point | Line): { value: number, fraction: Fraction, tex: string } => {
        let value = 0, fraction = new Fraction(), tex = ''

        if (item instanceof Line) {
            return item.distanceTo(this)
        } else if (item instanceof Point) {
            let V = new Vector(this, item)

            value = V.norm
            fraction = V.normSquare.sqrt()
            tex = V.normSquare.isSquare() ? fraction.tex : `\\sqrt{\\frac{ ${V.normSquare.numerator} }{ ${V.normSquare.denominator} }}`
        }
        return {value, fraction, tex}
    }

    isInListOfPoints = (list: Point[]): boolean => {
        const keyList = list.map(x => x.key)

        return keyList.includes(this.key)
    }
}
