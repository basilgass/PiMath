import {rndPolynom} from "./rndPolynom";
import {rndMonom} from "./rndMonom";
import {rndHelpers} from "./rndHelpers";
import {
    randomCoefficientConfig,
    randomGeometryLineConfig,
    randomGeometryPointConfig,
    randomMonomConfig,
    randomPolynomConfig
} from "./rndTypes";
import {rndFraction} from "./rndFraction";
import {Polynom} from "../algebra/polynom";
import {Monom} from "../algebra/monom";
import {Fraction} from "../coefficients/fraction";
import {Line} from "../geometry/line";
import {rndGeometryLine} from "./rndGeometryLine";
import {Point} from "../geometry/point";
import {rndGeometryPoint} from "./rndGeometryPoint";

export * from "./rndTypes"

export namespace Random {
    export function polynom(config?: randomPolynomConfig): Polynom {
        return (new rndPolynom(config)).generate()
    }

    export function monom(config?: randomMonomConfig): Monom {
        return (new rndMonom(config)).generate()
    }

    export function fraction(config?: randomCoefficientConfig): Fraction {
        return (new rndFraction(config)).generate()
    }

    export function number(from: number, to: number, exclude?: number[]): number {
        return rndHelpers.randomInt(from, to, exclude)
    }

    export function numberSym(max: number, allowZero?: boolean): number {
        return rndHelpers.randomIntSym(max, allowZero)
    }

    export function prime(max: number): number {
        return rndHelpers.randomPrime(max)
    }

    export function bool(percent?: number): boolean {
        return rndHelpers.randomBool(percent)
    }

    export function array(arr: any[], number?: number): any[] {
        return rndHelpers.randomArray(arr, number)
    }

    export function item(arr: any[]): any {
        return rndHelpers.randomItem(arr)
    }

    export function shuffle(arr: any[]): any[] {
        return rndHelpers.shuffleArray(arr)
    }

    export namespace Geometry {
        export function line(config?: randomGeometryLineConfig): Line {
            return (new rndGeometryLine(config).generate())
        }

        export function point(config?: randomGeometryPointConfig): Point {
            return (new rndGeometryPoint(config).generate())
        }

    }
}