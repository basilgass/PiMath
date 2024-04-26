import { Circle } from './geometry/circle.ts';
import { Triangle } from './geometry/triangle.ts';
import { Line } from './geometry/line.ts';
import { Point } from './geometry/point.ts';
import { Vector } from './geometry/vector.ts';
import { Random } from './randomization/random.ts';
import { Logicalset } from './algebra/logicalset.ts';
import { Rational } from './algebra/rational.ts';
import { LinearSystem } from './algebra/linearSystem.ts';
import { Equation } from './algebra/equation.ts';
import { Polynom } from './algebra/polynom.ts';
import { Monom } from './algebra/monom.ts';
import { NthRoot } from './coefficients/nthRoot.ts';
import { Fraction } from './coefficients/fraction.ts';
import { NumExp } from './numexp.ts';
import { Numeric } from './numeric.ts';
import { Shutingyard } from './shutingyard.ts';

export declare const PiMath: {
    ShutingYard: typeof Shutingyard;
    Numeric: typeof Numeric;
    NumExp: typeof NumExp;
    Fraction: typeof Fraction;
    Root: typeof NthRoot;
    Monom: typeof Monom;
    Polynom: typeof Polynom;
    Equation: typeof Equation;
    LinearSystem: typeof LinearSystem;
    Rational: typeof Rational;
    Logicalset: typeof Logicalset;
    Random: typeof Random;
    Geometry: {
        Vector: typeof Vector;
        Point: typeof Point;
        Line: typeof Line;
        Triangle: typeof Triangle;
        Circle: typeof Circle;
    };
};
