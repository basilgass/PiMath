import { Fraction } from '../coefficients/fraction';
import { InputValue } from '../pimath.interface';
import { Vector } from './vector';
export declare class Point extends Vector {
    constructor();
    constructor(value: Vector);
    constructor(start: Vector, end: Vector);
    constructor(...values: InputValue<Fraction>[]);
    parse(...values: Vector[] | InputValue<Fraction>[]): this;
    clone(): Point;
}
