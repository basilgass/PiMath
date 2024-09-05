import { Equation } from '../algebra/equation';
import { Fraction } from '../coefficients/fraction';
import { Line3 } from './line3';
import { Vector } from './vector';

interface Plane3Config {
    point?: Vector;
    normal?: Vector;
    directions?: Vector[];
    equation?: Equation;
    points?: Vector[];
    coefficients?: number[];
}
export declare class Plane3 {
    #private;
    constructor(config?: Plane3Config);
    get normal(): Vector;
    set normal(value: Vector);
    get point(): Vector;
    set point(value: Vector);
    get a(): Fraction;
    get b(): Fraction;
    get c(): Fraction;
    get d(): Fraction;
    get tex(): string;
    parse(config: Plane3Config): void;
    angle(vector: Vector, sharp?: boolean, radian?: boolean): number;
    angle(line: Line3, sharp?: boolean, radian?: boolean): number;
    angle(plane: Plane3, sharp?: boolean, radian?: boolean): number;
    distanceTo(point: Vector): number;
    intersectWithLine(line: Line3): Vector;
}
export {};
