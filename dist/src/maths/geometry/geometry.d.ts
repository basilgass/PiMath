import { Fraction } from "../coefficients/fraction";
export declare class Vector2D {
    private _x;
    private _y;
    private _scalar;
    constructor();
    /**
     * Parse two Fraction to a new Vector.
     * @param x
     * @param y
     */
    parse: (x: Fraction, y: Fraction) => Vector2D;
    trivial: () => Vector2D;
    parseByNumber: (x: number, y: number) => Vector2D;
    clone: () => Vector2D;
    norme: () => number;
    unit: () => Vector2D;
    opposed: () => Vector2D;
    add: (V: Vector2D) => Vector2D;
    subtract: (V: Vector2D) => Vector2D;
    multiplyByScalar: (k: number) => Vector2D;
    angle: (V: Vector2D) => number;
    scalarProduct: (V: Vector2D) => Fraction;
    static scalarProduct: (V1: Vector2D, V2: Vector2D) => Fraction;
    get x(): Fraction;
    set x(value: Fraction);
    get y(): Fraction;
    set y(value: Fraction);
    get tex(): string;
    get Tex(): string;
}
export declare class Matrix {
    private _dimX;
    private _dimY;
    constructor();
    get isSquared(): boolean;
    get dimX(): number;
    get dimY(): number;
}
