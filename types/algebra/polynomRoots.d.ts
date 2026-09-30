import { Fraction } from "../coefficients";
import { Root } from "../coefficients/root";
export interface PolynomRoot {
    readonly fraction: Fraction;
    readonly root: Root;
    readonly exact: boolean;
    readonly multiplicity: number;
}
export declare function solveLinear(coeffs: Fraction[]): PolynomRoot[];
export declare function solveQuadratic(coeffs: Fraction[]): PolynomRoot[];
export declare function solveCubicCardan(coeffs: Fraction[]): PolynomRoot[];
export declare function solvePolynom(coeffs: Fraction[], options?: {
    bisectionDeltaX?: number;
}): PolynomRoot[];
//# sourceMappingURL=polynomRoots.d.ts.map