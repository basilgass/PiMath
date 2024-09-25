import { Line } from './line';
import { Fraction } from '../coefficients/fraction';
import { Equation } from '../algebra/equation';
import { IPiMathObject } from '../pimath.interface';
import { Point } from './point';
export declare class Circle implements IPiMathObject<Circle> {
    #private;
    constructor();
    constructor(equation: string | Equation);
    constructor(circle: Circle);
    constructor(center: Point, radius: Fraction | number, square?: boolean);
    constructor(center: Point, pointThrough: Point);
    constructor(A: Point, B: Point, C: Point);
    get center(): Point;
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
    lineIntersection: (L: Line) => Point[];
    tangents: (P: Point | Fraction) => Line[];
    isPointOnCircle: (P: Point) => boolean;
    getPointsOnCircle: (numberIsInteger?: boolean) => Point[];
    clone(): Circle;
    setRadius(radius: Fraction | number, square?: boolean): this;
    parse(...values: unknown[]): this;
}
