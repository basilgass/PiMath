import { Circle } from './maths/geometry/circle.ts';
import { Triangle } from './maths/geometry/triangle.ts';
import { Line } from './maths/geometry/line.ts';
import { Point } from './maths/geometry/point.ts';
import { Vector } from './maths/geometry/vector.ts';
import { Random } from './maths/randomization/random.ts';
import { Logicalset } from './maths/algebra/logicalset.ts';
import { Rational } from './maths/algebra/rational.ts';
import { LinearSystem } from './maths/algebra/linearSystem.ts';
import { Equation } from './maths/algebra/equation.ts';
import { Polynom } from './maths/algebra/polynom.ts';
import { Monom } from './maths/algebra/monom.ts';
import { NthRoot } from './maths/coefficients/nthRoot.ts';
import { Fraction } from './maths/coefficients/fraction.ts';
import { NumExp } from './maths/numexp.ts';
import { Numeric } from './maths/numeric.ts';
import { Shutingyard } from './maths/shutingyard.ts';

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
