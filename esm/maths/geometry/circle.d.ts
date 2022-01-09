import { Point } from "./point";
import { Fraction } from "../coefficients";
import { Equation } from "../algebra";
import { Line } from "./line";
export declare class Circle {
    private _center;
    private _squareRadius;
    private _cartesian;
    private _exists;
    constructor(...values: unknown[]);
    get center(): Point;
    get exists(): boolean;
    get squareRadius(): Fraction;
    get radius(): {
        tex: string;
        display: string;
    };
    get tex(): string;
    get developed(): string;
    get display(): string;
    get cartesian(): Equation;
    clone(): Circle;
    private _reset;
    private parse;
    private _calculateCartesian;
    private _parseCopyCircle;
    private _parseCenterAndRadius;
    private _parseCenterAndPointThrough;
    private _parseEquation;
    private _parseThroughtThreePoints;
    relativePosition: (L: Line) => number;
    lineIntersection: (L: Line) => Point[];
}
