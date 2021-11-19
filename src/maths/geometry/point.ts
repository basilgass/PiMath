/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
import Fraction from "../coefficients/fraction";

//TODO: Ajouter une vérification si la droite existe.
export default class Point {
    private _x: Fraction;   // 1st component
    private _y: Fraction;   // 2nd component
    private _exist: Boolean;

    constructor(...values: any) {
        this._x = new Fraction().zero();
        this._y = new Fraction().zero();

        if (values !== undefined) {
            this.parse(...values);
        }

        return this
    };

    get isPoint() {
        return true;
    }

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get x(): Fraction {
        return this._x;
    }

    set x(value: Fraction) {
        this._x = value;
    }

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

    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------

    parse = (...values: any): Point => {
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
                return this;
            }

            // Value is given as string, comma separated.
            if(typeof values[0] === 'string'){
                let xy = values[0].split(',')
                if(xy.length===2){
                    this._x = new Fraction(xy[0]).reduce()
                    this._y = new Fraction(xy[1]).reduce()
                    return this;
                }
            }

            // Value given as an object with {x: value, y: value}
            if (values[0].x !== undefined && values[0].y !== undefined) {
                this._x = new Fraction(values[0].x).reduce()
                this._y = new Fraction(values[0].y).reduce()
            } else {
                return this.zero();
            }
        }
        if (values.length === 2) {
            this._x = new Fraction(values[0]).reduce()
            this._y = new Fraction(values[1]).reduce()
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

    origin = (): Point => {
        this.zero();
        return this;
    }

    middleOf = (P1: Point, P2: Point): Point => {
        this._x = P1.x.clone().add(P2.x).divide(2);
        this._y = P1.y.clone().add(P2.y).divide(2);

        return this;
    }
    // ------------------------------------------
    // Display functions
    // ------------------------------------------
    texValues = (numberOfDigits: number): string => {
        let pts = [];

        pts.push(this._x.value.toFixed(numberOfDigits===undefined?2:numberOfDigits));
        pts.push(this._y.value.toFixed(numberOfDigits===undefined?2:numberOfDigits));

        return `\\left(${pts.join(';')}\\right)`
    }
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------

    // ------------------------------------------
    // Vector functions
    // ------------------------------------------

    // ------------------------------------------
    // Static functions
    // ------------------------------------------
    static pmatrix = (a: any, b: any, c?: any): string => {
        if (c === undefined) {
            return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\end{pmatrix}`;
        } else {
            return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\\\ ${c.tex ? c.tex : c} \\end{pmatrix}`;
        }
    };

}
