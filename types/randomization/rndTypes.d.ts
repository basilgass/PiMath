import { Fraction } from "../coefficients/fraction";
import type { Point } from "../geometry/point";
import type { Vector } from "../geometry/vector";
import type { InputValue } from "../pimath.interface";
export interface RandomCoefficientConfig {
    max?: number;
    relative?: boolean;
    reduced?: boolean;
    range?: RandomRange;
    allow?: {
        zero?: boolean;
        negative?: boolean;
        positive?: boolean;
    };
}
export type FractionOrRandom = InputValue<Fraction> | RandomFraction;
export interface RandomFraction {
    fraction?: boolean | RandomCoefficientConfig;
}
export interface RandomMonomConfig {
    degree?: number;
    fraction?: boolean | RandomCoefficientConfig;
    variables?: string;
    allow?: {
        zero?: boolean;
    };
}
export interface RandomPolynomConfig {
    commonConstant?: boolean;
    degree?: number;
    factorable?: boolean;
    fraction?: boolean | RandomCoefficientConfig;
    variables?: string;
    numberOfMonoms?: number;
    unit?: boolean;
    allow?: {
        nullMonom?: boolean;
        negativeLeading?: boolean;
        commonFactor?: boolean;
    };
}
export interface RandomEquationConfig {
    degree?: number;
    variables?: string;
    fraction?: boolean | RandomCoefficientConfig;
    unit?: boolean;
    factorable?: boolean;
    shuffle?: boolean;
    solution?: {
        count?: number;
        allowZero?: boolean;
        relative?: boolean;
        range?: RandomRange;
        nothing?: boolean | number;
        everything?: boolean | number;
    };
    allow?: {
        negativeLeading?: boolean;
        commonFactor?: boolean;
    };
}
export interface RandomGeometryLineConfig {
    A?: Point | RandomGeometryPointConfig;
    slope?: FractionOrRandom;
    allow?: {
        vertical?: boolean | number;
        horizontal?: boolean | number;
        positive?: boolean | number;
        negative?: boolean | number;
    };
}
export interface RandomGeometryLine3Config {
    A?: Point | RandomGeometryPoint3Config;
    direction?: Vector | RandomGeometryVector3Config;
    allow?: {
        general?: boolean | number;
        parallelXY?: boolean | number;
        parallelXZ?: boolean | number;
        parallelYZ?: boolean | number;
        parallelX?: boolean | number;
        parallelY?: boolean | number;
        parallelZ?: boolean | number;
    };
}
export type Quadrant = 1 | 2 | 3 | 4;
export type RandomRange = number | {
    min: number;
    max: number;
};
export interface RandomGeometryPointConfig {
    axis?: 'x' | 'y' | boolean | null;
    fraction?: boolean | RandomCoefficientConfig;
    range?: RandomRange;
    quadrant?: Quadrant | Quadrant[] | null;
    allow?: {
        origin?: boolean;
    };
}
export type Octant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export interface RandomGeometryPoint3Config {
    axis?: 'x' | 'y' | 'z' | boolean | null;
    plane?: 'xy' | 'xz' | 'yz' | boolean | null;
    fraction?: boolean | RandomCoefficientConfig;
    range?: RandomRange;
    octant?: Octant | Octant[] | null;
    allow?: {
        origin?: boolean;
    };
}
export interface RandomVectorOptions {
    primitive?: boolean;
    allow?: {
        zero?: boolean;
    };
}
export interface RandomGeometryVectorConfig extends Omit<RandomGeometryPointConfig, 'allow'>, RandomVectorOptions {
}
export interface RandomGeometryVector3Config extends Omit<RandomGeometryPoint3Config, 'allow'>, RandomVectorOptions {
}
export interface RandomGeometryCircleConfig {
    center?: RandomGeometryPointConfig;
    radius?: FractionOrRandom;
    squaredRadius?: FractionOrRandom;
    pointsOnCircle?: number | {
        min?: number;
        fraction?: boolean;
    };
}
//# sourceMappingURL=rndTypes.d.ts.map