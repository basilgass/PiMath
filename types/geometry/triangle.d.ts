import { Fraction } from "../coefficients";
import { Line } from "./line";
import { Vector } from "./vector";
import { Point } from "./point";
import type { IPiMathObject, InputValue, RemarquableLines } from "../pimath.interface";
export type TriangleSide = 'AB' | 'AC' | 'BC';
export declare class Triangle implements IPiMathObject<Triangle> {
    #private;
    constructor(...values: unknown[]);
    parse(...values: unknown[]): this;
    get tex(): string;
    get display(): string;
    clone(): this;
    copy(value: Triangle): this;
    get A(): Point;
    set A(value: Point);
    get AB(): Vector;
    get AC(): Vector;
    get B(): Point;
    set B(value: Point);
    get BA(): Vector;
    get BC(): Vector;
    get C(): Point;
    set C(value: Point);
    get CA(): Vector;
    get CB(): Vector;
    get asDegree(): this;
    get asRadians(): this;
    static fromCoordinates(x1: InputValue<Fraction>, y1: InputValue<Fraction>, x2: InputValue<Fraction>, y2: InputValue<Fraction>, x3: InputValue<Fraction>, y3: InputValue<Fraction>): Triangle;
    static fromLines(line1: Line | string, line2: Line | string, line3: Line | string): Triangle;
    static fromPoints(A: Point, B: Point, C: Point): Triangle;
    getAngle(name: 'A' | 'B' | 'C'): number;
    getBisectors(internal?: boolean): {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Point | null;
    };
    getHeights(): {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Point | null;
    };
    getMedians(): {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Point | null;
    };
    getMediators(): {
        'a': Line;
        'b': Line;
        'c': Line;
        'intersection': Point | null;
    };
    getMiddles(): {
        AB: Point;
        AC: Point;
        BC: Point;
    };
    getPoints(): Point[];
    getSortedPoints(): Point[];
    isEqual(T: Triangle): boolean;
    isEquilateral(): boolean;
    isIsocele(): boolean;
    isRectangle(): boolean;
    get isValid(): boolean;
    get lines(): Record<TriangleSide, Line>;
    get remarquables(): RemarquableLines;
    reset(): this;
}
//# sourceMappingURL=triangle.d.ts.map