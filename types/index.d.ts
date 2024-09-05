import { Equation } from './algebra/equation';
import { Monom } from './algebra/monom';
import { Polynom } from './algebra/polynom';
import { Rational } from './algebra/rational';
import { Fraction } from './coefficients/fraction';
import { NthRoot } from './coefficients/nthRoot';
import { Circle } from './geometry/circle';
import { Line } from './geometry/line';
import { Point } from './geometry/point';
import { Triangle } from './geometry/triangle';
import { Vector } from './geometry/vector';

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
    Rational: typeof Rational;
    Random: {
        equation: (config?: import('./randomization/rndTypes').randomEquationConfig | undefined) => Equation;
        polynom: (config?: import('./randomization/rndTypes').randomPolynomConfig | undefined) => Polynom;
        monom: (config?: import('./randomization/rndTypes').randomMonomConfig | undefined) => Monom;
        fraction: (config?: import('./randomization/rndTypes').randomCoefficientConfig | undefined) => Fraction;
        number: (from: number, to: number, exclude?: number[] | undefined) => number;
        numberSym: (max: number, allowZero?: boolean | undefined) => number;
        prime: (max: number) => number;
        bool: (percent?: number | undefined) => boolean;
        array: <T>(arr: T[], number?: number | undefined) => T[];
        item: <T_1>(arr: T_1[]) => T_1;
        shuffle: <T_2>(arr: T_2[]) => T_2[];
        line: (config?: import('./randomization/rndTypes').randomGeometryLineConfig | undefined) => Line;
        line3: (config?: import('./randomization/rndTypes').randomGeometryLine3Config | undefined) => import('./geometry/line3').Line3;
        point: (config?: import('./randomization/rndTypes').randomGeometryPointConfig | undefined) => Point;
        circle: (config?: import('./randomization/rndTypes').randomGeometryCircleConfig | undefined) => Circle;
    };
    Geometry: {
        Vector: typeof Vector;
        Point: typeof Point;
        Line: typeof Line;
        Triangle: typeof Triangle;
        Circle: typeof Circle;
    };
};
export default PiMath;
