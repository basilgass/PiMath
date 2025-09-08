import type { IExpressionMultiply, InputAlgebra, InputValue, IPiMathObject } from "../pimath.interface";
import { Polynom } from "./polynom";
import type { Vector } from "../geometry";
export type IMatrixValues = InputAlgebra<Polynom>[][];
export declare class Matrix implements IPiMathObject<Matrix>, IExpressionMultiply<Matrix> {
    #private;
    constructor(rowCount?: number, colCount?: number);
    parse(values: IMatrixValues): this;
    clone(): Matrix;
    get tex(): string;
    get display(): string;
    add(value: Matrix): this;
    get bmatrix(): this;
    canBeAdded(matrix: Matrix): boolean;
    canBeMultiplied(matrix: Matrix): boolean;
    characteristic_polynom(letter?: string): Polynom;
    cofactor(row: number, column: number): Polynom;
    get cols(): Polynom[][];
    determinant(): Polynom;
    get dimension(): {
        rows: number;
        cols: number;
    };
    flat(): Polynom[];
    forEach(callback: (aij: Polynom, row: number, column: number) => void): void;
    fromDimensions(rows: number, cols: number): this;
    fromString(value: string): this;
    fromValues(values: IMatrixValues): this;
    fromVectors(...vectors: Vector[]): this;
    getAij(i: number, j: number): Polynom | null;
    isEqual(value: Matrix): boolean;
    isOne(): boolean;
    isSquare(): boolean;
    isZero(): boolean;
    map<T>(callback: (aij: Polynom, row: number, column: number) => T): T[][];
    multiply(value: InputValue<Polynom> | Matrix): this;
    one(): this;
    opposite(): this;
    get pmatrix(): this;
    pow(value: number): this;
    reduce(): Matrix;
    get rows(): Polynom[][];
    setValue(row: number, column: number, value: InputAlgebra<Polynom>): this;
    subtract(value: Matrix): this;
    get values(): Polynom[][];
    zero(): this;
}
//# sourceMappingURL=matrix.d.ts.map