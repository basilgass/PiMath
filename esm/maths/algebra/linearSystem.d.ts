import { Equation } from "./equation";
import { Fraction } from "../coefficients/fraction";
export declare class LinearSystem {
    private _solutions;
    private _resolutionSteps;
    private _equations;
    private _letters;
    constructor(...equationStrings: string[]);
    get equations(): Equation[];
    set equations(value: Equation[]);
    get letters(): string;
    set letters(value: string);
    get isSolvable(): boolean;
    get variables(): string[];
    get tex(): string;
    get solution(): string;
    parse: (...equations: unknown[]) => LinearSystem;
    setCoefficient: (...coefficients: string[]) => LinearSystem;
    clone: () => LinearSystem;
    setLetters: (...letters: string[]) => LinearSystem;
    private _findLetters;
    generate: (...solutions: Fraction[] | number[]) => LinearSystem;
    private _generateOneEquation;
    private _linearReduction;
    mergeEquations: (eq1: Equation, eq2: Equation, factor1: unknown, factor2: unknown) => Equation;
    reorder: () => LinearSystem;
    solve: () => LinearSystem;
    private _checkIfLinerCombination;
    /**
     * Linear reduction of the equations to have only one letter
     * @param letter    letter to isolate
     * @param V         list of variables in the linear system.
     * @private
     */
    private _solveOneLetter;
    log: () => string;
}
