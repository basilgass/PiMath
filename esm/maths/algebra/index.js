export * from "./equation";
export * from "./linearSystem";
export * from "./logicalset";
export * from "./monom";
export * from "./polynom";
export * from "./rational";
import { Polynom as _Polynom } from "./polynom";
import { Monom as _Monom } from "./monom";
import { LinearSystem as _LinearSystem } from "./linearSystem";
import { Equation as _Equation } from "./equation";
import { Logicalset as _LogicalSet } from "./logicalset";
import { Rational as _Rational } from "./rational";
export var Algebra;
(function (Algebra) {
    class Polynom extends _Polynom {
    }
    Algebra.Polynom = Polynom;
    class Monom extends _Monom {
    }
    Algebra.Monom = Monom;
    class LinearSystem extends _LinearSystem {
    }
    Algebra.LinearSystem = LinearSystem;
    class Equation extends _Equation {
    }
    Algebra.Equation = Equation;
    class LogicalSet extends _LogicalSet {
    }
    Algebra.LogicalSet = LogicalSet;
    class Rational extends _Rational {
    }
    Algebra.Rational = Rational;
})(Algebra || (Algebra = {}));
//# sourceMappingURL=index.js.map