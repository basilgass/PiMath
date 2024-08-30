import type { InputValue } from "../pimath.interface";
import { Fraction } from "../coefficients/fraction";
export declare class Vector {
    #private;
    constructor();
    constructor(Vector2D: Vector);
    constructor(start: Vector, end: Vector);
    constructor(a: InputValue<Fraction>, b: InputValue<Fraction>);
    get x(): Fraction;
    set x(value: Fraction | number | string);
    get y(): Fraction;
    set y(value: Fraction | number | string);
    get asPoint(): boolean;
    set asPoint(value: boolean);
    get normSquare(): Fraction;
    get norm(): number;
    get tex(): string;
    get display(): string;
    get array(): Fraction[];
    get dimension(): number;
    get isNull(): boolean;
    static asTex(x: string, y: string): string;
    static scalarProduct: (v1: Vector, v2: Vector) => Fraction;
    static determinant: (v1: Vector, v2: Vector) => Fraction;
    parse: (start: Vector | InputValue<Fraction> | {
        x: Fraction | number;
        y: Fraction | number;
    }, end?: Vector | InputValue<Fraction> | {
        x: Fraction | number;
        y: Fraction;
    }) => Vector;
    clone(): Vector;
    zero: () => this;
    one: () => this;
    opposite: () => this;
    add: (V: Vector) => this;
    subtract: (V: Vector) => this;
    unit: () => this;
    middleOf: (V1: Vector, V2: Vector) => this;
    translate(value: Vector): this;
    translate(value: {
        x: number | Fraction;
        y: number | Fraction;
    }): this;
    distanceTo(item: Vector): {
        value: number;
        fraction: Fraction;
        tex: string;
    };
    dotProduct: (V: Vector) => Fraction;
    determinantWith: (V: Vector) => Fraction;
    normal: () => this;
    isEqual: (v: Vector) => boolean;
    isColinearTo: (v: Vector) => boolean;
    isNormalTo: (v: Vector) => boolean;
    multiplyByScalar: (k: InputValue<Fraction>) => this;
    divideByScalar: (k: InputValue<Fraction>) => this;
    simplify: () => this;
    angleWith: (V: Vector, sharp?: boolean, radian?: boolean) => number;
    private _parseString;
}
export declare class Point extends Vector {
    constructor();
    constructor(Point2D: Point);
    constructor(x: InputValue<Fraction>, y: InputValue<Fraction>);
    clone(): Point;
    get tex(): string;
    get display(): string;
}
//# sourceMappingURL=vector.d.ts.map