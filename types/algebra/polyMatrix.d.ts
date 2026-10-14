import type { InputAlgebra, InputValue, IPiMathObject } from "../pimath.interface";
import { Polynom } from "./polynom";
import { Vector } from "../geometry/vector";
import { AbstractMatrix } from "./abstractMatrix";
import { Matrix } from "./matrix";
export type IPolyMatrixValues = InputAlgebra<Polynom>[][];
export declare class PolyMatrix extends AbstractMatrix<Polynom> implements IPiMathObject<PolyMatrix> {
    constructor();
    constructor(rows: number, cols?: number);
    constructor(value: string);
    constructor(values: InputAlgebra<Polynom>[][]);
    static fromString(value: string): PolyMatrix;
    static fromValues(values: InputAlgebra<Polynom>[][]): PolyMatrix;
    static fromDimensions(rows: number, cols?: number): PolyMatrix;
    static fromVectors(...vectors: Vector[]): PolyMatrix;
    static fromMatrix(m: Matrix): PolyMatrix;
    protected createElement(value?: InputValue<Polynom>): Polynom;
    protected createInstance(): this;
    characteristic_polynom(variable?: string): Polynom;
}
//# sourceMappingURL=polyMatrix.d.ts.map