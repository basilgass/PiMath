import type { InputAlgebra, InputValue, IPiMathObject } from "../pimath.interface";
import { Fraction } from "../coefficients";
import { Vector } from "../geometry/vector";
import { AbstractMatrix } from "./abstractMatrix";
export declare class Matrix extends AbstractMatrix<Fraction> implements IPiMathObject<Matrix> {
    constructor();
    constructor(rows: number, cols?: number);
    constructor(value: string);
    constructor(values: InputAlgebra<Fraction>[][]);
    static fromString(value: string): Matrix;
    static fromValues(values: InputAlgebra<Fraction>[][]): Matrix;
    static fromDimensions(rows: number, cols?: number): Matrix;
    static fromVectors(...vectors: Vector[]): Matrix;
    protected createElement(value?: InputValue<Fraction>): Fraction;
    protected createInstance(): this;
}
//# sourceMappingURL=matrix.d.ts.map