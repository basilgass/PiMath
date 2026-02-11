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
    set A(value: Point);
    get AB(): Vector;
    get AC(): Vector;
    get B(): Point;
    set B(value: Point);
    get BA(): Vector;
    get BC(): Vector;
    get C(): Point;
    set C(value: Point);
    get CA(): Vector;
    get CB(): Vector;
    get asDegree(): this;
    get asRadians(): this;
    fromCoordinates(x1: InputValue<Fraction>, y1: InputValue<Fraction>, x2: InputValue<Fraction>, y2: InputValue<Fraction>, x3: InputValue<Fraction>, y3: InputValue<Fraction>): this;
    fromLines(line1: Line | string, line2: Line | string, line3: Line | string): this;
    fromPoints(A: Point, B: Point, C: Point): this;
    getAngle(name: 'A' | 'B' | 'C'): number;
    getBisectors(internal?: boolean): {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Point | null;
    };
    getHeights(): {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Point | null;
    };
    getMedians(): {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Point | null;
    };
    getMediators(): {
        'a': Line;
        'b': Line;
        'c': Line;
        'intersection': Point | null;
    };
    getMiddles(): {
        AB: Point;
        AC: Point;
        BC: Point;
    };
    getPoints(): Point[];
    getSortedPoints(): Point[];
    isEqual(T: Triangle): boolean;
    isEquilateral(): boolean;
    isIsocele(): boolean;
    isRectangle(): boolean;
    get isValid(): boolean;
    set isValid(value: boolean);
    get lines(): Record<TRIANGLE_SIDES, Line>;
    medianA(): Line;
    medianB(): Line;
    medianC(): Line;
    get remarquables(): remarquableLines | null;
    reset(): this;
}
export {};
