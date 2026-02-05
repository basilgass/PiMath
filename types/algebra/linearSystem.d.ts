import { IAlgebra, IEquation, InputValue, IPiMathObject, literalType } from '../pimath.interface';
import { Fraction } from '../coefficients';
import { Equation } from './equation';
import { Polynom } from './polynom';
import { Solution } from '../analyze/solution';
export declare class LinearSystem implements IPiMathObject<LinearSystem>, IEquation<LinearSystem>, IAlgebra<LinearSystem> {
    #private;
    constructor(...values: (string | Equation)[]);
    parse: (...equations: (string | Equation)[]) => this;
    clone: () => LinearSystem;
    get tex(): string;
    get display(): string;
    static fromMatrix(matrix: InputValue<Fraction>[][], letters?: string): LinearSystem;
    add(value: InputValue<LinearSystem | Equation | Polynom>, index?: number): this;
    buildTex: (equations: Equation[], operators?: (string[])[]) => string;
    degree(letter?: string): Fraction;
    get equations(): Equation[];
    set equations(value: Equation[]);
    evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean): number | Fraction;
    hasVariable(letter: string): boolean;
    isEqual(value: LinearSystem): boolean;
    get isSolvable(): boolean;
    get matrix(): [Fraction[][], Fraction[]];
    mergeEquations(equation1: {
        id: number;
        factor: InputValue<Fraction>;
    }, equation2: {
        id: number;
        factor: number;
    }): Equation;
    multiply(value: InputValue<Fraction> | InputValue<Fraction>[], index?: number): this;
    reduce(): this;
    reorder: () => this;
    solve(): Solution[];
    solveMatrix: () => Fraction[];
    solve_compute_factors(letter: string): [
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
