import { Fraction } from '../coefficients/fraction';
import { Vector } from './vector';
import { Point } from './point';
import { Line3Propriety } from '../pimath.interface';
export declare class Line3 {
    #private;
    static PARALLEL: Line3Propriety;
    static PERPENDICULAR: Line3Propriety;
    /**
     * Value can be a mix of:
     *
     * @param values
     */
    constructor(A: Point, B: Point);
    constructor(A: Point, d: Vector);
    clone: () => this;
    get tex(): {
        parametric: string;
        system: string;
        cartesian: string;
    };
    get display(): {
        parametric: string;
        system: string;
        cartesian: string;
    };
    get OA(): Point;
    set OA(value: Point);
    get d(): Vector;
    set d(value: Vector);
    get direction(): Vector;
    distanceTo(pt: Point): {
        value: number;
        fraction: Fraction;
        tex: string;
    };
    hitSegment(A: Point, B: Point): boolean;
    intersection: (line: Line3) => {
        point: Vector;
        hasIntersection: boolean;
        isParallel: boolean;
        isSame: boolean;
    };
    isOnLine: (pt: Point) => boolean;
    isParallelTo: (line: Line3) => boolean;
    isPerpendicularTo: (line: Line3) => boolean;
    isSameAs: (line: Line3) => boolean;
    isVertical: () => boolean;
    get point(): Point;
    randomPoint: (max?: number) => Point;
    simplify: () => this;
}
