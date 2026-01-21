import { Factor, PolyFactor, Polynom } from '../algebra';
import { InputAlgebra } from '../pimath.interface';
import { Solution } from './solution';
export declare class TableOfSigns {
    #private;
    constructor(value: InputAlgebra<PolyFactor | Factor | Polynom>);
    get fx(): PolyFactor;
    get roots(): Solution[];
}
