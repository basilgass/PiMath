import { Line } from './line';
import { Fraction, Root } from '../coefficients';
import { Equation } from '../algebra';
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
    parse(...values: unknown[]): this;
    clone(): Circle;
    copy(circle: Circle): this;
    get tex(): string;
    get display(): string;
    get asCanonical(): this;
    get asCenterRadius(): this;
    get center(): Point;
    get equation(): Equation;
    fromCenterPoint(center: Point, pointThrough: Point): this;
    fromCenterRadius(center: Point, radius: Fraction | number, square?: boolean): this;
    fromEquation(equ: Equation): this;
    fromPoints(A: Point, B: Point, C: Point): this;
    fromString(str: string): this;
    getPointsOnCircle(): Point[];
    isPointOnCircle: (P: Point) => boolean;
    isSame(circ: Circle): boolean;
    /**
     * Find the intersection points between the circle and a line. It can be 0, 1 or 2 points.
     * The points are sorted depending on the direction vector of the line.
     * @param L
     */
    lineIntersection(L: Line): Point[];
    get radius(): Root;
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    relativePosition(L: Line): number;
    setRadius(radius: Fraction | number, square?: boolean): this;
    get squareRadius(): Fraction;
    tangents: (P: Point | Fraction) => Line[];
}
