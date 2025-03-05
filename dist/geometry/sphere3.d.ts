import { Point } from './point';
import { Fraction } from '../coefficients';
import { Equation } from '../algebra';
import { InputValue } from '../pimath.interface';
export declare enum SPHERE3_RELATIVE_POSITION {
    INTERIOR = 0,
    EXTERIOR = 1,
    SECANT = 2,
    TANGENT_INSIDE = 3,
    TANGENT_OUTSIDE = 4,
    SUPERPOSED = 5,
    CONCENTRIC = 6
}
export declare class Sphere3 {
    #private;
    constructor(center?: Point, radius?: InputValue<Fraction>);
    fromEquation(equation: Equation | string): this;
    get center(): Point;
    get squareRadius(): Fraction;
    get radius(): {
        tex: string;
        display: string;
        value: number;
    };
    get equation(): Equation;
    makeUndefined(): this;
    get centerRadius(): this;
    get developped(): this;
    get tex(): string;
    get display(): string;
    static RELATIVE_POSITION: typeof SPHERE3_RELATIVE_POSITION;
    relativePosition: (S: Sphere3) => SPHERE3_RELATIVE_POSITION;
    isPointOnSphere: (P: Point) => boolean;
}
