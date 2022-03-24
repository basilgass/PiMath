import { Point } from "./point";
import { Line } from "./line";
import { Fraction } from "../coefficients/fraction";
import { Equation } from "../algebra/equation";
export declare class Circle {
    constructor(...values: unknown[]);
    private _center;
    get center(): Point;
    private _squareRadius;
    get squareRadius(): Fraction;
    private _cartesian;
    get cartesian(): Equation;
    private _exists;
    get exists(): boolean;
    get radius(): {
        tex: string;
        display: string;
        value: number;
    };
    get tex(): string;
    get developed(): string;
    get display(): string;
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    relativePosition: (L: Line) => number;
    lineIntersection: (L: Line) => Point[];
    tangents: (P: Point | Fraction) => Line[];
    isPointOnCircle: (P: Point) => Boolean;
    getPointsOnCircle: (numberIsInteger?: boolean) => Point[];
    clone(): Circle;
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
