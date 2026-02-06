import {Fraction} from "../coefficients/fraction"

export interface randomCoefficientConfig {
    max?: number,
    natural?: boolean
    negative?: boolean,
    reduced?: boolean,
    zero?: boolean,
}

export interface randomMonomConfig {
    degree?: number,
    fraction?: boolean | randomCoefficientConfig,
    letters?: string,
    zero?: boolean
}

export interface randomPolynomConfig {
    allowNullMonom?: boolean,
    commonConstant?: boolean ,
    degree?: number,
    factorable?: boolean,
    fraction?: boolean | randomCoefficientConfig,
    letters?: string,
    numberOfMonoms?: number,
    positive?: boolean
    unit?: boolean,
    zero?: boolean
}

export interface randomEquationConfig extends randomPolynomConfig {
    solution?: {
        allowZero?: boolean,
        fraction?: boolean,
        nothing?: boolean,
        everything?: boolean,
    }
}


export interface randomGeometryLineConfig {
    A: { x: number | Fraction, y: number | Fraction },
    allow?: {
        vertical?: boolean,
        horizontal?: boolean
    }
    slope?: Fraction | string | number,
}

export interface randomGeometryLine3Config {
    A?: { x: number | Fraction, y: number | Fraction, z: number | Fraction },
    direction?: { x: number | Fraction, y: number | Fraction, z: number | Fraction },
}


export interface randomGeometryPointConfig {
    axis?: 'x' | 'y' | 'z' | null,
    fraction?: boolean,
    max?: number
    quadrant?: number | null,
}

export interface randomGeometryCircleConfig {
    center?: randomGeometryPointConfig,
    pointsOnCircle?: number
    radius?: number,
}