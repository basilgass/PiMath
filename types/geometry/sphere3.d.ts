import { Point } from "./point";
import { Fraction } from "../coefficients";
import { Equation } from "../algebra";
import type { IDisplayDigits, InputAlgebra, IPiMathObject, InputValue } from "../pimath.interface";
export declare enum Sphere3RelativePosition {
    INTERIOR = 0,
    EXTERIOR = 1,
    SECANT = 2,
    TANGENT_INSIDE = 3,
    TANGENT_OUTSIDE = 4,
    SUPERPOSED = 5,
    CONCENTRIC = 6
}
export declare class Sphere3 implements IPiMathObject<Sphere3>, IDisplayDigits {
    #private;
    constructor();
    constructor(equation: string | Equation);
    constructor(sphere: Sphere3);
    constructor(center: Point, radius: InputValue<Fraction>, square?: boolean);
    parse(...values: unknown[]): this;
    clone(): this;
    withDigits(digits: number | null): this;
    copy(sphere: Sphere3): this;
    static fromCenterRadius(center: Point, radius: InputValue<Fraction>, square?: boolean): Sphere3;
    static fromEquation(value: InputAlgebra<Equation>): Sphere3;
    static fromString(str: string): Sphere3;
    get center(): Point;
    get squareRadius(): Fraction;
    get radius(): {
        tex: string;
        display: string;
        value: number;
    };
    get equation(): Equation;
    get asCenterRadius(): this;
    get asDeveloped(): this;
    get tex(): string;
    get display(): string;
    static RELATIVE_POSITION: typeof Sphere3RelativePosition;
    relativePosition(S: Sphere3): Sphere3RelativePosition;
    isPointOnSphere(P: Point): boolean;
    isEqual(S: Sphere3): boolean;
}
//# sourceMappingURL=sphere3.d.ts.map