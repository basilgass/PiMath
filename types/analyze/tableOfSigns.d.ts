import type { InputAlgebra, IPiMathObject, TableOfSignsValues } from "../pimath.interface";
import { Factor, PolyFactor, Polynom } from "../algebra";
import { Solution } from "./solution";
import { Domain } from "./domain";
export declare class TableOfSigns implements IPiMathObject<TableOfSigns> {
    #private;
    constructor(value?: InputAlgebra<PolyFactor | Factor | Polynom>);
    parse(value: InputAlgebra<PolyFactor | Factor | Polynom>): this;
    static fromPolynom(p: Polynom): TableOfSigns;
    static fromFactor(f: Factor): TableOfSigns;
    static fromPolyFactor(pf: PolyFactor): TableOfSigns;
    get tex(): string;
    get display(): string;
    clone(): TableOfSigns;
    copy(value: TableOfSigns): this;
    get withFactors(): this;
    withLabel(label: string): this;
    withTkzTabOptions(lgt: number, espcl: number): this;
    positive(): Domain;
    nonNegative(): Domain;
    negative(): Domain;
    nonPositive(): Domain;
    domain(): Domain;
    zeros(): Solution[];
    poles(): Solution[];
    get roots(): Solution[];
    get signs(): TableOfSignsValues[];
    get factors(): {
        factor: Factor;
        roots: Solution[];
        signs: TableOfSignsValues[];
    }[];
}
//# sourceMappingURL=tableOfSigns.d.ts.map