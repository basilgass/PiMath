export * from "./equation";
export * from "./linearSystem";
export * from "./logicalset";
export * from "./monom";
export * from "./polynom";
export * from "./rational";
import { Polynom as _Polynom } from "./polynom";
import { Monom as _Monom } from "./monom";
export var Algebra;
(function (Algebra) {
    class Polynom extends _Polynom {
    }
    Algebra.Polynom = Polynom;
    class Monom extends _Monom {
    }
    Algebra.Monom = Monom;
})(Algebra || (Algebra = {}));
//# sourceMappingURL=index.js.map