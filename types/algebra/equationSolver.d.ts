import { Polynom } from './polynom';
import { Equation } from './equation';
import { Solution } from '../analyze/solution';
export declare class EquationSolver {
    #private;
    constructor(left: Polynom | Equation, right?: Polynom, variable?: string);
    get bissectionCompexityCounter(): number;
    get bissectionDeltaX(): number;
    set bissectionDeltaX(value: number);
    solve(): Solution[];
    solveAsCardan(): Solution[];
}
