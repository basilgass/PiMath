import { Fraction } from '../coefficients/fraction';
import { Vector } from './vector';
export declare class Matrix {
    #private;
    constructor(...values: Vector[]);
    get values(): Vector[];
    get array(): Fraction[][];
    get dimension(): number[];
    isSquare(): boolean;
    determinant(): Fraction;
}
