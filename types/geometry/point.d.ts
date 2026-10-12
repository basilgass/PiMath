import { Fraction } from "../coefficients";
import type { InputValue, IPiMathObject } from "../pimath.interface";
import { Root } from "../coefficients/root";
import { TupleN } from "./TupleN";
import type { Vector } from "./vector";
export declare class Point extends TupleN implements IPiMathObject<Point> {
    constructor(...values: (Point | Vector)[] | InputValue<Fraction>[]);
    parse(...values: (Point | Vector)[] | InputValue<Fraction>[]): this;
    static fromString(value: string): Point;
    clone(): Point;
    get tex(): string;
    get display(): string;
    distanceTo(B: Point): Root;
    isEqual(pt: Point): boolean;
    isEqualXY(x: InputValue<Fraction>, y: InputValue<Fraction>): boolean;
    static middleOf(V1: Point, V2: Point): Point;
    middleOf(V1: Point, V2: Point): this;
}
//# sourceMappingURL=point.d.ts.map