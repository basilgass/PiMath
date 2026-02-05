import { Fraction } from '../coefficients';
import { Vector } from './vector';
import { Point } from './point';
type V = Vector | Point;
export declare function areVectorsEquals(v1: V, v2: V): boolean;
export declare function areVectorsColinears(v1: V, v2: V): boolean;
export declare function dotProduct(v1: V, v2: V): Fraction;
export declare function determinantFromVectors(...values: V[]): Fraction;
export {};
