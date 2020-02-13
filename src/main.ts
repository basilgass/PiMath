import {Fraction} from "./maths/fraction";
import {Polynom} from "./maths/polynom";
import {Monom} from "./maths/monom";
import {Numeric} from "./maths/numeric";


(<any>window).Pi = {
    Numeric: Numeric,
    Fraction: Fraction,
    Monom: Monom,
    Polynom: Polynom
};