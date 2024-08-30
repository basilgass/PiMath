import { Line } from './line';
import { Vector } from './vector';
import { Fraction } from '../coefficients/fraction';
import { Equation } from '../algebra/equation';

export declare class Circle {
    #private;
    constructor(...values: unknown[]);
    get center(): Vector;
    get squareRadius(): Fraction;
    get cartesian(): Equation;
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
}
