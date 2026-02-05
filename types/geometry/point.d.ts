import { Fraction } from '../coefficients';
import { InputValue } from '../pimath.interface';
import { Root } from '../coefficients/root';
import { TupleN } from './TupleN';
import { Vector } from './vector';
export declare class Point extends TupleN {
    constructor(...values: (Point | Vector)[] | InputValue<Fraction>[]);
    parse(...values: (Point | Vector)[] | InputValue<Fraction>[]): this;
    clone(): Point;
    get tex(): string;
    get display(): string;
    distanceTo(B: Point): Root;
    middleOf(V1: Point, V2: Point): this;
}
