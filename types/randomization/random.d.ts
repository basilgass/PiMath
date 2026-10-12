import type { RandomCoefficientConfig, RandomEquationConfig, RandomGeometryCircleConfig, RandomGeometryLine3Config, RandomGeometryLineConfig, RandomGeometryPoint3Config, RandomGeometryPointConfig, RandomGeometryVector3Config, RandomGeometryVectorConfig, RandomMonomConfig, RandomPolynomConfig } from "./rndTypes";
export type * from "./rndTypes";
export declare const Random: {
    equation: (config?: RandomEquationConfig) => import("..").Equation;
    polynom: (config?: RandomPolynomConfig) => import("..").Polynom;
    monom: (config?: RandomMonomConfig) => import("..").Monom;
    fraction: (config?: RandomCoefficientConfig) => import("..").Fraction;
    number: (from: number, to: number, exclude?: number[]) => number;
    numberSym: (max: number, allowZero?: boolean) => number;
    prime: (max?: number) => number;
    triplet: (target: number, allowZero?: boolean) => [number, number, number] | null;
    bool: (percent?: number) => boolean;
    array: <T>(arr: T[], number?: number) => T[];
    item: <T>(arr: T[]) => T;
    shuffle: <T>(arr: T[]) => T[];
    point: (config?: RandomGeometryPointConfig) => import("..").Point;
    point3: (config?: RandomGeometryPoint3Config) => import("..").Point;
    vector: (config?: RandomGeometryVectorConfig) => import("..").Vector;
    vector3: (config?: RandomGeometryVector3Config) => import("..").Vector;
    line: (config?: RandomGeometryLineConfig) => import("..").Line;
    line3: (config?: RandomGeometryLine3Config) => import("..").Line3;
    circle: (config?: RandomGeometryCircleConfig) => import("..").Circle;
};
//# sourceMappingURL=random.d.ts.map