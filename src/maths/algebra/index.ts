import {Monom} from "./monom";
import {Polynom} from "./polynom";
import {Equation} from "./equation";
import {LinearSystem} from "./linearSystem";
import {Rational} from "./rational";
import {Logicalset} from "./logicalset";

export * from "./equation"
export * from "./linearSystem"
export * from "./logicalset"
export * from "./monom"
export * from "./polynom"
export * from "./rational"

export namespace Algebra {
    export function monom(value?: string): Monom {
        return new Monom(value)
    }

    export function polynom(polynomString?: string, ...values: any[]): Polynom {
        return new Polynom(polynomString, ...values)
    }

    export function equation(...equations: any): Equation {
        return new Equation(...equations)
    }

    export function linearSystem(...equations: string[]): LinearSystem {
        return new LinearSystem(...equations)
    }

    export function rational(numerator?: Polynom, denominator?: Polynom):Rational {
        return new Rational(numerator, denominator)
    }

    export function logicalset(value: string):Logicalset {
        return new Logicalset(value)
    }
}