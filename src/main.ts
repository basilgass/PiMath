import {Fraction} from "./maths/fraction";
import {Polynom} from "./maths/polynom";
import {Monom} from "./maths/monom";
import {Numeric} from "./maths/numeric";
import {Equation} from "./maths/equation";
import {Nthroot} from "./maths/nthroot";
import {LinearSystem} from "./maths/linearSystem";
import {Vector} from "./maths/vector";

// Expose as global
(<any>window).Pi = {
    Numeric: Numeric,
    Fraction: Fraction,
    Root: Nthroot,
    Monom: Monom,
    Polynom: Polynom,
    Equation: Equation,
    LinearSystem: LinearSystem,
    Vector: Vector
};

export var Pi = {
    Numeric: Numeric,
    Fraction: Fraction,
    Root: Nthroot,
    Monom: Monom,
    Polynom: Polynom,
    Equation: Equation,
    LinearSystem: LinearSystem,
    Vector: Vector
}
