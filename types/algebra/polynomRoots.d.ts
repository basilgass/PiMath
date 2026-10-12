import { Fraction } from "../coefficients";
import type { PolynomRoot } from "../pimath.interface";
export type { PolynomRoot };
export declare function solveLinear(coeffs: Fraction[]): PolynomRoot[];
export declare function solveQuadratic(coeffs: Fraction[]): PolynomRoot[];
export declare function solveCubicCardan(coeffs: Fraction[]): PolynomRoot[];
export declare function solvePolynom(coeffs: Fraction[], options?: {
    bisectionDeltaX?: number;
}): PolynomRoot[];
//# sourceMappingURL=polynomRoots.d.ts.map