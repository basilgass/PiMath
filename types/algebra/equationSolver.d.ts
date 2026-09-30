import type { Polynom } from "./polynom";
import type { Equation } from "./equation";
import { Solution } from "../analyze";
export declare class EquationSolver {
    #private;
    constructor(left: Polynom | Equation, right?: Polynom, variable?: string);
    solve(): Solution[];
    solveAsCardan(): Solution[];
}
//# sourceMappingURL=equationSolver.d.ts.map