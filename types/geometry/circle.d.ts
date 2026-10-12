import { Line } from "./line";
import { Fraction, Root } from "../coefficients";
import { Equation } from "../algebra";
import { type InputAlgebra, type IPiMathObject } from "../pimath.interface";
import { Point } from "./point";
export declare enum CircleRelativePosition {
    INTERIOR = 0,
    EXTERIOR = 1,
    SECANT = 2,
    TANGENT_INSIDE = 3,
    TANGENT_OUTSIDE = 4,
    SUPERPOSED = 5,
    CONCENTRIC = 6
}
export declare class Circle implements IPiMathObject<Circle> {
    #private;
    constructor();
    constructor(equation: string | Equation);
    constructor(circle: Circle);
    constructor(center: Point, radius: Fraction | number, square?: boolean);
    constructor(center: Point, pointThrough: Point);
    constructor(A: Point, B: Point, C: Point);
    parse(...values: unknown[]): this;
    clone(): this;
    copy(circle: Circle): this;
    get tex(): string;
    get display(): string;
    get asDeveloped(): this;
    get asCenterRadius(): this;
    get center(): Point;
    get equation(): Equation;
    static fromCenterPoint(center: Point, pointThrough: Point): Circle;
    static fromCenterRadius(center: Point, radius: Fraction | number, square?: boolean): Circle;
    static fromEquation(value: InputAlgebra<Equation>): Circle;
    static fromPoints(A: Point, B: Point, C: Point): Circle;
    static fromString(str: string): Circle;
    getPointsOnCircle(): Point[];
    isPointOnCircle(P: Point): boolean;
    isEqual(circ: Circle): boolean;
    intersection(L: Line): Point[];
    get radius(): Root;
    relativePosition(L: Line): 0 | 1 | 2;
    relativePosition(C: Circle): CircleRelativePosition;
    static RELATIVE_POSITION: typeof CircleRelativePosition;
    setRadius(radius: Fraction | number, square?: boolean): this;
    get squareRadius(): Fraction;
    tangents(P: Point | Fraction): Line[];
}
//# sourceMappingURL=circle.d.ts.map