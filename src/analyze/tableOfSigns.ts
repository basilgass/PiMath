
// TODO: move the TableOfSigns asSystem to a custom class.

import {Factor, PolyFactor, Polynom} from "../algebra"
import type {InputAlgebra} from "../pimath.interface"
import type {Solution} from "./solution"

export class TableOfSigns {
    #fx: PolyFactor
    #roots: Solution[]
    constructor(value: InputAlgebra<PolyFactor | Factor | Polynom >) {
        if(value instanceof PolyFactor || value instanceof Factor) {
            this.#fx = new PolyFactor(value)
        }else{
            this.#fx = new PolyFactor().fromPolynom(value)
        }

        // Factorize de PolyFactor.
        this.#roots = this.#fx.getRoots()

    }

    get fx() {
        return this.#fx
    }

    get roots() {
        return this.#roots
    }
}