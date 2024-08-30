import { Equation } from "./algebra/equation";
import { LinearSystem } from "./algebra/linearSystem";
import { LogicalSet } from "./algebra/logicalset";
import { Monom } from "./algebra/monom";
import { Polynom } from "./algebra/polynom";
import { Rational } from "./algebra/rational";
import { Fraction } from "./coefficients/fraction";
import { NthRoot } from "./coefficients/nthRoot";
import { Circle } from "./geometry/circle";
import { Line } from "./geometry/line";
import { Triangle } from "./geometry/triangle";
import { Vector } from "./geometry/vector";
import { Vector3D } from "./geometry/vector3d";
declare const PiMath: {
    Numeric: {
        decompose: (value: number) => number[][];
        dividers: (value: number) => number[];
        divideNumbersByGCD: (...values: number[]) => number[];
        gcd: (...values: number[]) => number;
        lcm: (...values: number[]) => number;
        numberCorrection: (value: number, number_of_digits?: number) => number;
        periodic: (value: number) => number;
        primes: (nb?: number | undefined) => number[];
        pythagoreanTripletsWithTarget: (target: number, targetIsSquare?: boolean | undefined) => number[][];
        round: (value: number, decimals?: number) => number;
    };
    Fraction: typeof Fraction;
    Root: typeof NthRoot;
    Monom: typeof Monom;
    Polynom: typeof Polynom;
    Equation: typeof Equation;
    LinearSystem: typeof LinearSystem;
    Rational: typeof Rational;
    LogicalSet: typeof LogicalSet;
    Random: {
        equation: (config?: import("./randomization/rndTypes").randomEquationConfig | undefined) => Equation;
        polynom: (config?: import("./randomization/rndTypes").randomPolynomConfig | undefined) => Polynom;
        monom: (config?: import("./randomization/rndTypes").randomMonomConfig | undefined) => Monom;
        fraction: (config?: import("./randomization/rndTypes").randomCoefficientConfig | undefined) => Fraction;
        number: (from: number, to: number, exclude?: number[] | undefined) => number;
        numberSym: (max: number, allowZero?: boolean | undefined) => number;
        prime: (max: number) => number;
        bool: (percent?: number | undefined) => boolean;
        array: <T>(arr: T[], number?: number | undefined) => T[];
        item: <T_1>(arr: T_1[]) => T_1;
        shuffle: <T_2>(arr: T_2[]) => T_2[];
        line: (config?: import("./randomization/rndTypes").randomGeometryLineConfig | undefined) => Line;
        line3: (config?: import("./randomization/rndTypes").randomGeometryLine3Config | undefined) => import("./geometry/line3").Line3;
        point: (config?: import("./randomization/rndTypes").randomGeometryPointConfig | undefined) => import("./geometry/vector").Point;
        circle: (config?: import("./randomization/rndTypes").randomGeometryCircleConfig | undefined) => Circle;
    };
    Geometry: {
        Vector: typeof Vector;
        Line: typeof Line;
        Triangle: typeof Triangle;
        Circle: typeof Circle;
    };
    Geometry3D: {
        Vector3D: typeof Vector3D;
    };
};
export default PiMath;
//# sourceMappingURL=index.d.ts.map