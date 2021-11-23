export * from "./equation"
export * from "./linearSystem"
export * from "./logicalset"
export * from "./monom"
export * from "./polynom"
export * from "./rational"

import {Polynom as _Polynom} from "./polynom";
import {Monom as _Monom} from "./monom";
import {LinearSystem as _LinearSystem} from "./linearSystem";
import {Equation as _Equation} from "./equation";
import {Logicalset as _LogicalSet} from "./logicalset"
import {Rational as _Rational} from "./rational";

export namespace Algebra {
    export class Polynom extends _Polynom{}
    export class Monom extends _Monom{}
    export class LinearSystem extends _LinearSystem{}
    export class Equation extends _Equation{}
    export class LogicalSet extends _LogicalSet{}
    export class Rational extends _Rational{}
}