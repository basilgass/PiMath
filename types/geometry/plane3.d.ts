import { Fraction } from "../coefficients/fraction";
import { Line3 } from "./line3";
import { Point } from "./point";
import { Vector } from "./vector";
import type { Plane3Config } from "../pimath.interface";
export declare class Plane3 {
    #private;
    constructor(config?: Plane3Config);
    get normal(): Vector;
    set normal(value: Vector);
    get point(): Point;
    set point(value: Point);
    get a(): Fraction;
    get b(): Fraction;
    get c(): Fraction;
    get d(): Fraction;
    get tex(): string;
    get display(): string;
    parse(config: Plane3Config): void;
    angle(vector: Vector, sharp?: boolean, radian?: boolean): number;
    angle(line: Line3, sharp?: boolean, radian?: boolean): number;
    angle(plane: Plane3, sharp?: boolean, radian?: boolean): number;
    distanceTo(point: Vector): number;
    intersectWithLine(line: Line3): Point;
    intersectWithPlane(plane: Plane3): Line3;
    isPointOnPlane(pt: Point): boolean;
}
//# sourceMappingURL=plane3.d.ts.map