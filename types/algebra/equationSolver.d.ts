import { ISolution } from '../pimath.interface';
import { Polynom } from './polynom';
import { Equation } from './equation';
export declare class EquationSolver {
    #private;
    constructor(left: Polynom | Equation, right?: Polynom, variable?: string);
    get bissectionCompexityCounter(): number;
    get bissectionDeltaX(): number;
    set bissectionDeltaX(value: number);
    solve(): ISolution[];
    solveAsCardan(): ISolution[];
}
