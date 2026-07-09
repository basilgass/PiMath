import { Factor, PolyFactor, Polynom } from "../algebra";
import type { InputAlgebra } from "../pimath.interface";
import type { Solution } from "./solution";
export declare class TableOfSigns {
    #private;
    constructor(value: InputAlgebra<PolyFactor | Factor | Polynom>);
    get fx(): PolyFactor;
    get roots(): Solution[];
}
//# sourceMappingURL=tableOfSigns.d.ts.map