import { Fraction } from '../coefficients/fraction';
import { Vector } from './vector';
import { Vector3D } from './vector3d';

type V = Vector | Vector3D;
export declare function areVectorsEquals(v1: V, v2: V): boolean;
export declare function areVectorsColinears(v1: V, v2: V): boolean;
export declare function dotProduct(v1: V, v2: V): Fraction;
export declare function determinant(...values: V[]): Fraction;
export {};
