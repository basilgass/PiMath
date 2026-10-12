import type { IAlgebra, IEquation, InputValue, IPiMathObject } from "../pimath.interface";
import { Fraction } from "../coefficients";
import { Equation } from "./equation";
import { Matrix } from "./matrix";
import { Polynom } from "./polynom";
import { Solution } from "../analyze";
import { Vector } from "../geometry";
export declare class LinearSystem implements IPiMathObject<LinearSystem>, IEquation<LinearSystem>, IAlgebra {
    #private;
    constructor(...values: (string | Equation)[]);
    parse(...inputs: (string | Equation)[]): this;
    fromEquations(...equations: Equation[]): this;
    fromComponents(matrix: InputValue<Fraction>[][], variables?: string): this;
    fromMatrix(value: Matrix, variables?: string): this;
    fromVectors(...vectors: Vector[]): this;
    copy(): this;
    clone(): LinearSystem;
    get tex(): string;
    get display(): string;
    static solutionAsDisplay(value: Solution[]): string;
    static solutionAsTex(value: Solution[]): string;
    add(value: InputValue<LinearSystem | Equation | Polynom>, index?: number): this;
    buildTex(equations: Equation[], operators?: (string[])[]): string;
    degree(variable?: string): Fraction;
    get equations(): Equation[];
    set equations(value: Equation[]);
    evaluate(): number | Fraction;
    hasVariable(variable: string): boolean;
    isEqual(value: LinearSystem): boolean;
    isSolvable(): boolean;
    get matrix(): [Matrix, Vector];
    toAugmentedMatrix(): Matrix;
    mergeEquations(equation1: {
        id: number;
        factor: InputValue<Fraction>;
    }, equation2: {
        id: number;
        factor: number;
    }): Equation;
    multiply(value: InputValue<Fraction> | InputValue<Fraction>[], index?: number): this;
    reduce(): this;
    reorder(): this;
    solve(): Solution[];
    solve_compute_factors(variable: string): [
        {
            id: number;
            factor: number;
        },
        {
            id: number;
            factor: number;
        }
    ][];
    subtract(value: InputValue<LinearSystem | Equation | Polynom>, index?: number): this;
    get variables(): string[];
    set variables(value: string | string[]);
}
//# sourceMappingURL=linearSystem.d.ts.map