import { Polynom } from './polynom';
import { Equation } from './equation';
import { Solution } from '../analyze';
export declare class EquationSolver {
    #private;
    _: number;
    constructor(left: Polynom | Equation, right?: Polynom, variable?: string);
    get bissectionComplexityCounter(): number;
    get bissectionDeltaX(): number;
    set bissectionDeltaX(value: number);
    solve(): Solution[];
    solveAsCardan(): Solution[];
}
