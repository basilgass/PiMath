import { Fraction } from "../coefficients";
import type { Vector } from "./vector";
import type { Point } from "./point";
export type VectorOrPoint = Vector | Point;
export declare function areVectorsEquals(v1: VectorOrPoint, v2: VectorOrPoint): boolean;
export declare function areVectorsColinears(v1: VectorOrPoint, v2: VectorOrPoint): boolean;
export declare function dotProduct(v1: VectorOrPoint, v2: VectorOrPoint): Fraction;
export declare function determinantFromVectors(...values: VectorOrPoint[]): Fraction;
//# sourceMappingURL=geomMath.d.ts.map