import type {
    RandomCoefficientConfig,
    RandomEquationConfig,
    RandomGeometryCircleConfig,
    RandomGeometryLine3Config,
    RandomGeometryLineConfig,
    RandomGeometryPoint3Config,
    RandomGeometryPointConfig,
    RandomGeometryVector3Config,
    RandomGeometryVectorConfig,
    RandomMonomConfig,
    RandomPolynomConfig
} from "./rndTypes"

import {
    randomArray,
    randomBool,
    randomInt,
    randomIntSym,
    randomItem,
    randomPrime,
    randomTriplet,
    shuffleArray
} from "./rndHelpers"
import {rndFraction} from "./coefficient/rndFraction"
import {rndMonom} from "./algebra/rndMonom"
import {rndPolynom} from "./algebra/rndPolynom"
import {rndEquation} from "./algebra/rndEquation"
import {rndCircle} from "./geometry/rndCircle"
import {rndLine} from "./geometry/rndLine"
import {rndLine3} from "./geometry/rndLine3"
import {rndPoint} from "./geometry/rndPoint"
import {rndPoint3} from "./geometry/rndPoint3"
import {rndVector} from "./geometry/rndVector"
import {rndVector3} from "./geometry/rndVector3"

export type * from "./rndTypes"

/**
 * Facade of the random generators and helpers. Each generator takes an optional configuration, described by its
 * `Random***Config` type and by the `rnd***` function it forwards to; the helpers (`number`, `bool`, `item`…)
 * document their arguments below.
 */
export const Random = {
    /**
     * Random equation or inequality, with controlled solutions (`solution.count`, `nothing`, `everything`).
     */
    equation: (config?: RandomEquationConfig) => {
        return rndEquation(config)
    },

    /**
     * Random polynomial of a given degree, possibly factorable into linear factors.
     */
    polynom: (config?: RandomPolynomConfig) => {
        return rndPolynom(config)
    },

    /**
     * Random term such as `3x²` or `-½xy`.
     */
    monom: (config?: RandomMonomConfig) => {
        return rndMonom(config)
    },

    /**
     * Random fraction or integer, with its sign, range and size under control.
     */
    fraction: (config?: RandomCoefficientConfig) => {
        return rndFraction(config)
    },

    /**
     * Random integer in `[from, to]`, both bounds included (swapped if `from > to`), never one of `exclude`.
     * @throws {InvalidArgumentError} if `exclude` removes every value of the interval.
     */
    number: (from: number, to: number, exclude?: number[]): number => {
        return randomInt(from, to, exclude)
    },

    /** Random integer in `[-max, max]`; `allowZero: false` excludes 0. */
    numberSym: (max: number, allowZero?: boolean): number => {
        return randomIntSym(max, allowZero)
    },

    /** Random prime **strictly lower** than `max` (any prime of the list when `max` is omitted). */
    prime: (max?: number): number => {
        return randomPrime(max)
    },

    /**
     * Random Pythagorean triplet whose hypotenuse is `target`, or `null` when there is none.
     * Triplets that contain 0 are left out unless `allowZero` is `true`.
     */
    triplet: (target: number, allowZero?: boolean): [number, number, number] | null => {
        return randomTriplet(target, allowZero)
    },

    /** `true` with the probability `percent` (between 0 and 1, default 0.5). */
    bool: (percent?: number): boolean => {
        return randomBool(percent)
    },

    /** Up to `number` distinct elements of `arr` (default 1), in random order; `arr` is not modified. */
    array: <T>(arr: T[], number?: number): T[] => {
        return randomArray(arr, number)
    },

    /**
     * Random element of `arr`.
     * @throws {InvalidArgumentError} if `arr` is empty.
     */
    item: <T>(arr: T[]): T => {
        return randomItem(arr)
    },

    /** Shuffled copy of `arr`; `arr` is not modified. */
    shuffle: <T>(arr: T[]): T[] => {
        return shuffleArray(arr)
    },

    /**
     * Random point of the plane, constrained by `axis`, `quadrant` and `range`.
     */
    point: (config?: RandomGeometryPointConfig) => {
        return rndPoint(config)
    },

    /**
     * Random point of space, constrained by `axis`, `plane`, `octant` and `range`.
     */
    point3: (config?: RandomGeometryPoint3Config) => {
        return rndPoint3(config)
    },

    /**
     * Random vector of the plane, drawn like a point; the zero vector is excluded by default.
     */
    vector: (config?: RandomGeometryVectorConfig) => {
        return rndVector(config)
    },

    /**
     * Random vector of space, drawn like a point; the zero vector is excluded by default.
     */
    vector3: (config?: RandomGeometryVector3Config) => {
        return rndVector3(config)
    },

    /**
     * Random line of the plane, from a point and a slope, with a chosen kind (vertical, horizontal, positive, negative).
     */
    line: (config?: RandomGeometryLineConfig) => {
        return rndLine(config)
    },

    /**
     * Random line of space, from a point and a direction, with a chosen kind (general or parallel to a plane or an axis).
     */
    line3: (config?: RandomGeometryLine3Config) => {
        return rndLine3(config)
    },

    /**
     * Random circle, from a center and a radius, optionally with integer points on it.
     */
    circle: (config?: RandomGeometryCircleConfig) => {
        return rndCircle(config)
    }
}
