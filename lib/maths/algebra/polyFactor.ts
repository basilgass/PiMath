import {IAlgebra, IOperations, IPiMathObject} from "../../pimath.interface.ts"
import {Factor} from "./factor.ts"

// PolyFactors is a class that represents a polynomial in factored form.
export class PolyFactors implements IPiMathObject<PolyFactors>, IOperations<PolyFactors>, IAlgebra<PolyFactors> {
    private _factors: Factor[]

    constructor(...values: Factor[]) {
        this._factors = values
        return this
    }
    
    get factors(): Factor[] {
        return this._factors
    }

    set factors(value: Factor[]) {
        this._factors = value
    }


}