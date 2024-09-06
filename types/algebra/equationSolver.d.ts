import { ISolution } from '../pimath.interface';
import { Equation } from './equation';

export declare class EquationSolver {
    #private;
    constructor(equation: Equation, variable?: string);
    solve(): ISolution[];
    solveAsCardan(): ISolution[];
}
