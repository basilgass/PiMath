import { Equation } from "./equation";
import { Fraction } from "./fraction";
export declare class LinearSystem {
    private _solutions;
    private _resolutionSteps;
    constructor();
    private _equations;
    get equations(): Equation[];
    set equations(value: Equation[]);
    get isSolvable(): boolean;
    get variables(): string[];
    get tex(): string;
    get texSolution(): string;
    private static _linearReduction;
    create: (...equations: Equation[]) => LinearSystem;
    createByCoefficient: (letters: String, ...coefficients: String[]) => LinearSystem;
    parse: (...equStrs: string[]) => LinearSystem;
    generate: (...solutions: Fraction[] | number[]) => LinearSystem;
    log: () => string;
    clone: () => LinearSystem;
    reorder: () => LinearSystem;
    solve: () => LinearSystem;
    private _generateOneEquation;
    private _checkIfLinerCombination;
    private _solveOneLetter;
}
