import { Fraction } from '../coefficients/fraction';
import { Point3D, Vector3D } from './vector3d';

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
    constructor(A: Point3D, d: Vector3D);
    get OA(): Vector3D;
    set OA(value: Vector3D);
    get point(): Point3D;
    get d(): Vector3D;
    set d(value: Vector3D);
    get tex(): {
        parametric: string;
        system: string;
    };
    get direction(): Vector3D;
    clone: () => this;
    isOnLine: (pt: Vector3D) => boolean;
    isParallelTo: (line: Line3) => boolean;
    isSameAs: (line: Line3) => boolean;
    isPerpendicularTo: (line: Line3) => boolean;
    isVertical: () => boolean;
    simplify: () => this;
    intersection: (line: Line3) => {
        point: Vector3D;
        hasIntersection: boolean;
        isParallel: boolean;
        isSame: boolean;
    };
    distanceTo(pt: Vector3D): {
        value: number;
        fraction: Fraction;
        tex: string;
    };
    hitSegment(A: Vector3D, B: Vector3D): boolean;
    randomPoint: (max?: number) => Point3D;
}
