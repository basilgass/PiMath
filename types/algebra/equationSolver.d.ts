import type { ISolution } from "../pimath.interface";
import type { Polynom } from "./polynom";
import type { Equation } from "./equation";
export declare class EquationSolver {
    #private;
    constructor(left: Polynom | Equation, right?: Polynom, variable?: string);
    solve(): ISolution[];
    solveAsCardan(): ISolution[];
}
//# sourceMappingURL=equationSolver.d.ts.map