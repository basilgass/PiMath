import type { IPiMathObject } from "../pimath.interface";
import type { Fraction } from "../coefficients";
import { Solution } from "./solution";
export declare function cmpLeft(a: Solution | null, b: Solution | null): number;
export declare function cmpRight(a: Solution | null, b: Solution | null): number;
export declare class Interval implements IPiMathObject<Interval> {
    #private;
    constructor(value?: string | Interval);
    static fromBounds(left: Solution | null, right: Solution | null, leftOpen: boolean, rightOpen: boolean): Interval;
    static empty(): Interval;
    static real(): Interval;
    static point(x: Solution): Interval;
    static fromString(value: string): Interval;
    parse(value: string | Interval): this;
    get tex(): string;
    get display(): string;
    clone(): Interval;
    copy(value: Interval): this;
    isEmpty(): boolean;
    isPoint(): boolean;
    isReal(): boolean;
    contains(x: Fraction | number): boolean;
    intersect(other: Interval): Interval;
    get left(): Solution | null;
    get right(): Solution | null;
    get leftOpen(): boolean;
    get rightOpen(): boolean;
}
//# sourceMappingURL=interval.d.ts.map