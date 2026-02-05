import { Fraction } from '../coefficients';
import { Line } from './line';
import { Vector } from './vector';
import { Point } from './point';
import { InputValue, remarquableLines } from '../pimath.interface';
type TRIANGLE_SIDES = 'AB' | 'AC' | 'BC';
export declare class Triangle {
    #private;
    constructor(...values: unknown[]);
    parse: (...values: unknown[]) => this;
    /**
     * Clone the Triangle class
     */
    clone: () => Triangle;
    /**
     * Copy the values from another triangle
     * @param value
     */
    copy(value: Triangle): this;
    get A(): Point;
    get AB(): Vector;
    get AC(): Vector;
    get B(): Point;
    get BA(): Vector;
    get BC(): Vector;
    get C(): Point;
    get CA(): Vector;
    get CB(): Vector;
    get angleABC(): number;
    get angleBCA(): number;
    get angleCAB(): number;
    get asDegree(): this;
    get asRadians(): this;
    fromCoordinates(x1: InputValue<Fraction>, y1: InputValue<Fraction>, x2: InputValue<Fraction>, y2: InputValue<Fraction>, x3: InputValue<Fraction>, y3: InputValue<Fraction>): this;
    fromLines(line1: Line | string, line2: Line | string, line3: Line | string): this;
    fromPoints(A: Point, B: Point, C: Point): this;
    getAngle(name: 'CAB' | 'ABC' | 'BCA'): number;
    get isEquilateral(): boolean;
    get isIsocele(): boolean;
    get isRectangle(): boolean;
    get isValid(): boolean;
    set isValid(value: boolean);
    get lines(): Record<TRIANGLE_SIDES, Line>;
    get remarquables(): remarquableLines | null;
}
export {};
