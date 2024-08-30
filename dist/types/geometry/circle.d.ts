import { Line } from "./line";
import { Vector } from "./vector";
import { Fraction } from "../coefficients/fraction";
import { Equation } from "../algebra/equation";
export declare class Circle {
    private _center;
    private _squareRadius;
    private _cartesian;
    private _exists;
    constructor(...values: unknown[]);
    get center(): Vector;
    get squareRadius(): Fraction;
    get cartesian(): Equation;
    get exists(): boolean;
    get radius(): {
        tex: string;
        display: string;
        value: number;
    };
    get tex(): string;
    get developed(): string;
    get display(): string;
    relativePosition: (L: Line) => number;
    lineIntersection: (L: Line) => Vector[];
    tangents: (P: Vector | Fraction) => Line[];
    isPointOnCircle: (P: Vector) => boolean;
    getPointsOnCircle: (numberIsInteger?: boolean) => Vector[];
    clone(): this;
    private _tangentsThroughOnePointOnTheCircle;
    private _tangentsThroughOnePointOutsideTheCircle;
    private _tangentsWithSlope;
    private _reset;
    private parse;
    private _calculateCartesian;
    private _parseCopyCircle;
    private _parseCenterAndRadius;
    private _parseCenterAndPointThrough;
    private _parseEquation;
    private _parseThroughtThreePoints;
}
//# sourceMappingURL=circle.d.ts.map