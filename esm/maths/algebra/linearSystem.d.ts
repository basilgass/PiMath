import { Equation } from "./equation";
import { Fraction } from "../coefficients/fraction";
export declare class LinearSystem {
    private _equations;
    private _letters;
    private _resolutionSteps;
    private _solutions;
    constructor(...equationStrings: (string | Equation)[]);
    get equations(): Equation[];
    set equations(value: Equation[]);
    get letters(): string;
    set letters(value: string);
    get isSolvable(): boolean;
    get variables(): string[];
    get tex(): string;
    get solution(): string;
    get solutionAsDisplay(): string;
    buildTex: (equations: Equation[], operators?: (string[])[]) => string;
    stepTex: (letter: string) => string;
    get resolutionSteps(): {
        [p: string]: {
            equations: Equation[];
            operations: string[][];
        }[];
    };
    parse: (...equations: (string | Equation)[]) => LinearSystem;
    clone: () => LinearSystem;
    reorder: () => LinearSystem;
    solve: (withResolution?: boolean) => LinearSystem;
    mergeEquations: (eq1: Equation, eq2: Equation, factor1: Fraction, factor2: Fraction) => Equation;
    private _findLetters;
    private _linearReduction;
    /**
     * Linear reduction of the equations to have only one letter
     * @param letter    letter to isolate
     * @private
     */
    private _solveOneLetter;
}
