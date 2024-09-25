import { ISolution } from '../pimath.interface';
import { Polynom } from './polynom';
import { Equation } from './equation';
export declare class EquationSolver {
    #private;
    constructor(left: Polynom | Equation, right?: Polynom, variable?: string);
    solve(): ISolution[];
    solveAsCardan(): ISolution[];
}
