import type { Polynom } from "./polynom";
import type { Equation } from "./equation";
import { Solution } from "../analyze";
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
//# sourceMappingURL=equationSolver.d.ts.map