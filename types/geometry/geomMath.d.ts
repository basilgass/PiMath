import { Fraction } from "../coefficients";
import type { Vector } from "./vector";
type V = Vector;
export declare function areVectorsEquals(v1: V, v2: V): boolean;
export declare function areVectorsColinears(v1: V, v2: V): boolean;
export declare function dotProduct(v1: V, v2: V): Fraction;
export declare function determinantFromVectors(...values: V[]): Fraction;
export {};
//# sourceMappingURL=geomMath.d.ts.map