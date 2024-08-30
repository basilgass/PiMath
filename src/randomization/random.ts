import type {
    randomCoefficientConfig,
    randomEquationConfig,
    randomGeometryCircleConfig,
    randomGeometryLine3Config,
    randomGeometryLineConfig,
    randomGeometryPointConfig,
    randomMonomConfig,
    randomPolynomConfig
} from "./rndTypes"
import { randomArray, randomBool, randomInt, randomIntSym, randomItem, randomPrime, shuffleArray } from "./rndHelpers"
import { rndFraction } from "./coefficient/rndFraction"
import { rndMonom } from "./algebra/rndMonom"
import { rndPolynom } from "./algebra/rndPolynom"
import { rndEquation } from "./algebra/rndEquation"
import { rndPoint } from "./geometry/rndPoint"
import { rndCircle } from "./geometry/rndCircle"
import { rndLine } from "./geometry/rndLine"
import { rndLine3 } from "./geometry/rndLine3"

export type * from "./rndTypes"

export const Random = {
    equation: (config?: randomEquationConfig) => {
        return rndEquation(config)
    },

    polynom: (config?: randomPolynomConfig) => {
        return rndPolynom(config)
    },

    monom: (config?: randomMonomConfig) => {
        return rndMonom(config)
    },

    fraction: (config?: randomCoefficientConfig) => {
        return rndFraction(config)
    },

    number: (from: number, to: number, exclude?: number[]): number => {
        return randomInt(from, to, exclude)
    },

    numberSym: (max: number, allowZero?: boolean): number => {
        return randomIntSym(max, allowZero)
    },

    prime: (max: number): number => {
        return randomPrime(max)
    },

    bool: (percent?: number): boolean => {
        return randomBool(percent)
    },

    array: <T>(arr: T[], number?: number): T[] => {
        return randomArray(arr, number)
    },

    item: <T>(arr: T[]): T => {
        return randomItem(arr)
    },

    shuffle: <T>(arr: T[]): T[] => {
        return shuffleArray(arr)
    },

    line: (config?: randomGeometryLineConfig) => {
        return rndLine(config)
    },

    line3: (config?: randomGeometryLine3Config) => {
        return rndLine3(config)
    },

    point: (config?: randomGeometryPointConfig) => {
        return rndPoint(config)
    },

    circle: (config?: randomGeometryCircleConfig) => {
        return rndCircle(config)
    }
}