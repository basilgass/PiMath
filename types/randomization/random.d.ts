import { randomCoefficientConfig, randomEquationConfig, randomGeometryCircleConfig, randomGeometryLine3Config, randomGeometryLineConfig, randomGeometryPointConfig, randomMonomConfig, randomPolynomConfig } from './rndTypes';

export type * from './rndTypes';
export declare const Random: {
    equation: (config?: randomEquationConfig) => import('../algebra/equation').Equation;
    polynom: (config?: randomPolynomConfig) => import('../algebra/polynom').Polynom;
    monom: (config?: randomMonomConfig) => import('../algebra/monom').Monom;
    fraction: (config?: randomCoefficientConfig) => import('../coefficients/fraction').Fraction;
    number: (from: number, to: number, exclude?: number[]) => number;
    numberSym: (max: number, allowZero?: boolean) => number;
    prime: (max: number) => number;
    bool: (percent?: number) => boolean;
    array: <T>(arr: T[], number?: number) => T[];
    item: <T_1>(arr: T_1[]) => T_1;
    shuffle: <T_2>(arr: T_2[]) => T_2[];
    line: (config?: randomGeometryLineConfig) => import('../geometry/line').Line;
    line3: (config?: randomGeometryLine3Config) => import('../geometry/line3').Line3;
    point: (config?: randomGeometryPointConfig) => import('../geometry/vector').Point;
    circle: (config?: randomGeometryCircleConfig) => import('../geometry/circle').Circle;
};
