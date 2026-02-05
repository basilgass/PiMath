import { Fraction } from '../coefficients/fraction';
import { Line3 } from './line3';
import { Point } from './point';
import { Vector } from './vector';
import { Plane3Config } from '../pimath.interface';
export declare class Plane3 {
    #private;
    constructor(config?: Plane3Config);
    parse(config: Plane3Config): void;
    get tex(): string;
    get display(): string;
    get a(): Fraction;
    angle(vector: Vector, sharp?: boolean, radian?: boolean): number;
    angle(line: Line3, sharp?: boolean, radian?: boolean): number;
    angle(plane: Plane3, sharp?: boolean, radian?: boolean): number;
    get b(): Fraction;
    get c(): Fraction;
    get d(): Fraction;
    distanceTo(point: Vector): number;
    intersectWithLine(line: Line3): Point;
    intersectWithPlane(plane: Plane3): Line3;
    isPointOnPlane(pt: Point): boolean;
    get normal(): Vector;
    set normal(value: Vector | Point);
    get point(): Point;
    set point(value: Point | Vector);
}
