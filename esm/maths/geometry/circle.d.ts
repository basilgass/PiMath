import { Point } from "./point";
import { Equation } from "../algebra";
import { Line } from "./line";
export declare class Circle {
    private _center;
    private _radius;
    private _squareRadius;
    private _cartesian;
    private _exists;
    constructor(...values: any);
    get center(): Point;
    get radius(): {
        tex: string;
        display: string;
    };
    get tex(): string;
    get developed(): string;
    get display(): string;
    get cartesian(): Equation;
    private parse;
    checkCircle: (P: Equation) => boolean;
    relativePosition: (L: Line) => number;
    lineIntersection: (L: Line) => Point[];
}
