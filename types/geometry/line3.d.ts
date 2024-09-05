import { Fraction } from '../coefficients/fraction';
import { Vector } from './vector';
import { Point } from './point';

export declare enum LinePropriety {
    None = "none",
    Parallel = "parallel",
    Perpendicular = "perpendicular",
    Tangent = "tangent"
}
export declare class Line3 {
    #private;
    static PERPENDICULAR: LinePropriety;
    static PARALLEL: LinePropriety;
    /**
     * Value can be a mix of:
     *
     * @param values
     */
    constructor(A: Point, B: Point);
    constructor(A: Point, d: Vector);
    get OA(): Point;
    set OA(value: Point);
    get point(): Point;
    get d(): Vector;
    set d(value: Vector);
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
    get direction(): Vector;
    clone: () => this;
    isOnLine: (pt: Vector) => boolean;
    isParallelTo: (line: Line3) => boolean;
    isSameAs: (line: Line3) => boolean;
    isPerpendicularTo: (line: Line3) => boolean;
    isVertical: () => boolean;
    simplify: () => this;
    intersection: (line: Line3) => {
        point: Vector;
        hasIntersection: boolean;
        isParallel: boolean;
        isSame: boolean;
    };
    distanceTo(pt: Point): {
        value: number;
        fraction: Fraction;
        tex: string;
    };
    hitSegment(A: Point, B: Point): boolean;
    randomPoint: (max?: number) => Point;
}
