import { Fraction } from '../coefficients/fraction';
export interface randomCoefficientConfig {
    negative?: boolean;
    max?: number;
    reduced?: boolean;
    zero?: boolean;
    natural?: boolean;
}
export interface randomMonomConfig {
    letters?: string;
    degree?: number;
    fraction?: boolean | randomCoefficientConfig;
    zero?: boolean;
}
export interface randomPolynomConfig {
    letters?: string;
    degree?: number;
    fraction?: boolean | randomCoefficientConfig;
    zero?: boolean;
    unit?: boolean;
    factorable?: boolean;
    allowNullMonom?: boolean;
    numberOfMonoms?: number;
    positive?: boolean;
}
export interface randomEquationConfig extends randomPolynomConfig {
    solution?: {
        allowZero?: boolean;
        fraction?: boolean;
        nothing?: boolean;
        everything?: boolean;
    };
}
export interface randomGeometryLineConfig {
    A: {
        x: number | Fraction;
        y: number | Fraction;
    };
    slope?: Fraction | string | number;
}
export interface randomGeometryLine3Config {
    A?: {
        x: number | Fraction;
        y: number | Fraction;
        z: number | Fraction;
    };
    direction?: {
        x: number | Fraction;
        y: number | Fraction;
        z: number | Fraction;
    };
}
export interface randomGeometryPointConfig {
    quadrant?: number | null;
    axis?: 'x' | 'y' | 'z' | null;
    fraction?: boolean;
    max?: number;
}
export interface randomGeometryCircleConfig {
    center?: randomGeometryPointConfig;
    radius?: number;
    pointsOnCircle?: number;
}
