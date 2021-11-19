import { Fraction } from "../coefficients";
import { Equation } from "./equation";
export declare class LinearSystem {
    private _solutions;
    private _resolutionSteps;
    private _equations;
    private _letters;
    constructor(...equationStrings: string[]);
    get isLinerarSystem(): boolean;
    get equations(): Equation[];
    set equations(value: Equation[]);
    get letters(): string;
    set letters(value: string);
    get isSolvable(): boolean;
    get variables(): string[];
    get tex(): string;
    get texSolution(): string;
    parse: (...equations: any[]) => LinearSystem;
    setCoefficient: (...coefficients: string[]) => LinearSystem;
    clone: () => LinearSystem;
    setLetters: (...letters: string[]) => LinearSystem;
    private _findLetters;
    generate: (...solutions: Fraction[] | number[]) => LinearSystem;
    private _generateOneEquation;
    private _linearReduction;
    mergeEquations: (eq1: Equation, eq2: Equation, factor1: any, factor2: any) => Equation;
    reorder: () => LinearSystem;
    solve: () => LinearSystem;
    private _checkIfLinerCombination;
    private _solveOneLetter;
    log: () => string;
}
