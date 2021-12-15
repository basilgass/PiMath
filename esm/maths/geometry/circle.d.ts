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
    private parse;
    get radius(): {
        tex: string;
        display: string;
    };
    get tex(): string;
    get developed(): string;
    checkCircle: (P: Equation) => boolean;
    relativePosition: (L: Line) => number;
}
