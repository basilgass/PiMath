import { randomCoefficientConfig, randomEquationConfig, randomGeometryCircleConfig, randomGeometryLine3Config, randomGeometryLineConfig, randomGeometryPointConfig, randomMonomConfig, randomPolynomConfig } from './rndTypes';

export type * from './rndTypes';
export declare const Random: {
    equation: (config?: randomEquationConfig) => import('..').Equation;
    polynom: (config?: randomPolynomConfig) => import('..').Polynom;
    monom: (config?: randomMonomConfig) => import('..').Monom;
    fraction: (config?: randomCoefficientConfig) => import('..').Fraction;
    number: (from: number, to: number, exclude?: number[]) => number;
    numberSym: (max: number, allowZero?: boolean) => number;
    prime: (max: number) => number;
    bool: (percent?: number) => boolean;
    array: <T>(arr: T[], number?: number) => T[];
    item: <T_1>(arr: T_1[]) => T_1;
    shuffle: <T_2>(arr: T_2[]) => T_2[];
    line: (config?: randomGeometryLineConfig) => import('..').Line;
    line3: (config?: randomGeometryLine3Config) => import('..').Line3;
    point: (config?: randomGeometryPointConfig) => import('..').Point;
    circle: (config?: randomGeometryCircleConfig) => import('..').Circle;
};
