import { Fraction } from "../coefficients/fraction";
import { Vector } from "./vector";
import { Point } from "./point";
import { Line3Propriety } from "../pimath.interface";
export declare class Line3 {
    #private;
    static PERPENDICULAR: Line3Propriety;
    static PARALLEL: Line3Propriety;
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
    isOnLine: (pt: Point) => boolean;
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
//# sourceMappingURL=line3.d.ts.map