import { ISolution } from '../pimath.interface';
import { Equation } from './equation';

export declare class EquationSolver {
    #private;
    constructor(equation: Equation, variable?: string);
    solve(): ISolution[];
    solveAsCardan(): ISolution[];
    private _makeSolution;
    private _makeApproximativeSolution;
    private _solveLinear;
    private _solveQuadratic;
    private _solveQuadratic_Output;
    private _solveCubic_CardanFormula;
    private _solveByFactorization;
}
