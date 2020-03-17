import {Fraction} from "./fraction";

export class Vector2D {
    private _x: Fraction;
    private _y: Fraction;
    private _scalar: number;

    constructor() {
        this._x = new Fraction().zero();
        this._y = new Fraction().zero();
        this._scalar = 1;
    }

    /**
     * Parse two Fraction to a new Vector.
     * @param x
     * @param y
     */
    parse = (x: Fraction, y: Fraction): Vector2D => {
        this._x = x;
        this._y = y;
        return this;
    };

    trivial = (): Vector2D => {
        return this.parseByNumber(0, 0);
    };

    parseByNumber = (x: number, y: number): Vector2D => {
        this._x = new Fraction().parse(x);
        this._y = new Fraction().parse(y);
        return this;
    };

    clone = () => {
        let V = new Vector2D();
        V._x = this._x.clone();
        V._y = this._y.clone();
        return V;
    };

    // Mathematical function on 2D vectors.
    norme = (): number => {
        return Math.sqrt(Math.pow(this._x.value, 2) + Math.pow(this._y.value, 2));
    };

    unit = (): Vector2D => {
        let n = this.norme();
        this._scalar = 1 / n;
        return this;
    };

    opposed = (): Vector2D => {
        this._x = this._x.opposed();
        this._y = this._y.opposed();
        return this;
    };

    add = (V: Vector2D): Vector2D => {
        this._x = this._x.add(V.x);
        this._y = this._y.add(V.y);
        return this;
    };

    substract = (V: Vector2D): Vector2D => {
        return this.add(V.clone().opposed());
    };

    multiplyByScalar = (k: number): Vector2D => {
        this._x = this._x.amplify(k);
        this._y = this._y.amplify(k);
        return this;
    };

    angle = (V: Vector2D): number => {
        let a: number;
        a = Math.acos(this.scalarProduct(V).value / (this.norme() * V.norme())) * 180 / Math.PI;
        return a;
    };

    scalarProduct = (V: Vector2D): Fraction => {
        return this._x.clone().multiply(V.x).add(this._y.clone().multiply(V.y));
    };

    // Other mathematical properties.
    static scalarProduct = (V1: Vector2D, V2: Vector2D): Fraction => {
        return V1.x.clone().multiply(V2.x).add(V1.x.clone().multiply(V2.y));
    };

    // Getter and setter
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

    get tex() {
        return `\\begin{pmatrix}${this._x.frac} \\\\\\ ${this._y.frac}\\end{pmatrix}`;
    }

    get Tex() {
        return `\\begin{pmatrix}${this._x.dfrac} \\\\\\ ${this._y.dfrac}\\end{pmatrix}`;
    }
}

export class Matrix {
    private _dimX: number;
    private _dimY: number;

    constructor() {
        this._dimX = 0;
        this._dimY = 0;
    }

    get isSquared(): boolean {
        return this._dimX === this._dimY;
    }


    get dimX(): number {
        return this._dimX;
    }

    get dimY(): number {
        return this._dimY;
    }
}
