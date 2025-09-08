import type { IAlgebra, IEquation, InputValue, IPiMathObject, ISolution, literalType } from "../pimath.interface";
import { Fraction } from "../coefficients";
import { Equation } from "./equation";
import { Polynom } from "./polynom";
export declare class LinearSystem implements IPiMathObject<LinearSystem>, IEquation<LinearSystem>, IAlgebra<LinearSystem> {
    #private;
    constructor(...values: (string | Equation)[]);
    parse: (...equations: (string | Equation)[]) => this;
    clone: () => LinearSystem;
    static fromMatrix(matrix: InputValue<Fraction>[][], letters?: string): LinearSystem;
    add(value: InputValue<LinearSystem | Equation | Polynom>, index?: number): this;
    buildTex: (equations: Equation[], operators?: (string[])[]) => string;
    degree(letter?: string): Fraction;
    get display(): string;
    get equations(): Equation[];
    set equations(value: Equation[]);
    evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean): number | Fraction;
    hasVariable(letter: string): boolean;
    isEqual(value: LinearSystem): boolean;
    get isSolvable(): boolean;
    get matrix(): [Fraction[][], Fraction[]];
    mergeEquations: (eq1: Equation, eq2: Equation, factor1: Fraction, factor2: Fraction) => Equation;
    multiply(value: InputValue<Fraction> | InputValue<Fraction>[], index?: number): this;
    reduce(): LinearSystem;
    reorder: () => this;
    solve(): ISolution[];
    solveMatrix: () => Fraction[];
    subtract(value: InputValue<LinearSystem | Equation | Polynom>, index?: number): this;
    get tex(): string;
    get variables(): string[];
    set variables(value: string | string[]);
}
//# sourceMappingURL=linearSystem.d.ts.map