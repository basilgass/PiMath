import { Fraction } from "../coefficients/fraction";
import { Numeric } from "../numeric";
import { Equation } from "./equation";
import { Polynom } from "./polynom";
export class EquationSolver {
    #equation;
    #variable;
    constructor(equation, variable = "x") {
        this.#equation = equation;
        this.#variable = variable;
    }
    solve() {
        if (this.#equation.degree().isOne()) {
            return this._solveLinear();
        }
        if (this.#equation.degree().value === 2) {
            return this._solveQuadratic();
        }
        const result = this._solveByFactorization();
        if (result.length > 0) {
            return result;
        }
        if (this.#equation.degree().value === 3) {
            return this._solveCubic_CardanFormula();
        }
        throw new Error("The equation degree is too high.");
    }
    solveAsCardan() {
        if (this.#equation.degree().value !== 3) {
            throw new Error("The equation is not cubic.");
        }
        return this._solveCubic_CardanFormula();
    }
    _makeSolution(value) {
        if (value instanceof Fraction && value.isApproximative()) {
            return this._makeApproximativeSolution(value.value);
        }
        const fraction = new Fraction(value);
        return {
            variable: this.#variable,
            exact: fraction,
            value: fraction.value,
            tex: fraction.tex,
            display: fraction.display
        };
    }
    _makeApproximativeSolution(value, output) {
        return {
            variable: this.#variable,
            exact: false,
            value: +value.toFixed(10),
            tex: output?.tex ?? '',
            display: output?.display ?? ''
        };
    }
    _solveLinear() {
        const left = this.#equation.moveLeft().left;
        const f = left.monomByDegree(0).coefficient.clone().opposite().divide(left.monomByDegree(1).coefficient);
        return [
            this._makeSolution(f)
        ];
    }
    _solveQuadratic() {
        const left = this.#equation.moveLeft().left;
        const a = left.monomByDegree(2).coefficient;
        const b = left.monomByDegree(1).coefficient;
        const c = left.monomByDegree(0).coefficient;
        const delta2 = b.clone().pow(2).subtract(a.clone().multiply(c).multiply(4));
        if (delta2.isNegative()) {
            return [];
        }
        if (delta2.isSquare()) {
            const delta = delta2.sqrt();
            const f1 = b.clone().opposite().add(delta).divide(a.clone().multiply(2));
            const f2 = b.clone().opposite().subtract(delta).divide(a.clone().multiply(2));
            if (delta.isZero()) {
                return [this._makeSolution(f1)];
            }
            return [
                this._makeSolution(f1),
                this._makeSolution(f2)
            ].sort((a, b) => a.value - b.value);
        }
        return this._solveQuadratic_Output(a, b, delta2);
    }
    _solveQuadratic_Output(a, b, delta) {
        const deltaFactor = Numeric
            .dividers(delta.value)
            .filter(x => Math.sqrt(x) % 1 === 0)
            .map(x => Math.sqrt(x)).pop() ?? 1;
        const gcd = Numeric.gcd(2 * a.value, b.value, deltaFactor) * (a.isNegative() ? -1 : 1);
        const b2 = b.clone().divide(gcd).opposite();
        const a2 = a.clone().divide(gcd).multiply(2);
        const delta2 = delta.clone().divide(deltaFactor ** 2);
        const deltaGcd = Math.abs(deltaFactor / gcd);
        const deltaK1 = deltaFactor === 1 ? '-' : `-${deltaGcd} `;
        const deltaK2 = deltaFactor === 1 ? '+' : `+${deltaGcd} `;
        function texOutput(a, b, k, delta) {
            return `\\frac{ ${b} ${k}\\sqrt{ ${delta} } }{ ${a} }`;
        }
        function displayOutput(a, b, k, delta) {
            return `(${b}${k}sqrt(${delta}))/${a}`;
        }
        const d = delta.value ** 0.5;
        const f1 = (-b.value - d) / (2 * a.value);
        const f2 = (-b.value + d) / (2 * a.value);
        return [
            this._makeApproximativeSolution(f1, {
                tex: texOutput(a2.tex, b2.tex, deltaK1.toString(), delta2.tex),
                display: displayOutput(a2.display, b2.display, deltaK1.toString(), delta2.display),
            }),
            this._makeApproximativeSolution(f2, {
                tex: texOutput(a2.tex, b2.tex, deltaK2.toString(), delta2.tex),
                display: displayOutput(a2.display, b2.display, deltaK2.toString(), delta2.display),
            })
        ].sort((a, b) => a.value - b.value);
    }
    _solveCubic_CardanFormula() {
        const left = this.#equation.moveLeft().left;
        const a = left.monomByDegree(3).coefficient;
        const b = left.monomByDegree(2).coefficient;
        const c = left.monomByDegree(1).coefficient;
        const d = left.monomByDegree(0).coefficient;
        const an = b.clone().divide(a);
        const bn = c.clone().divide(a);
        const cn = d.clone().divide(a);
        const p = bn.clone().subtract(an.clone().pow(2).divide(3));
        const q = cn.clone()
            .subtract(an.clone().multiply(bn).divide(3))
            .add(an.clone().pow(3).multiply(2).divide(27));
        const S = q.clone().opposite();
        const P = p.clone().opposite().pow(3).divide(27);
        const delta = S.clone().pow(2).subtract(P.clone().multiply(4)).opposite();
        if (delta.isNegative()) {
            const u = q.clone().opposite().add(delta.clone().opposite().sqrt()).divide(2).root(3);
            const v = q.clone().opposite().subtract(delta.clone().opposite().sqrt()).divide(2).root(3);
            const x = u.clone().add(v).subtract(an.clone().divide(3));
            return [this._makeSolution(x)];
        }
        if (delta.isZero()) {
            const u = q.clone().opposite().divide(2).root(3);
            const x1 = u.clone().opposite().subtract(an.clone().divide(3));
            const x2 = u.clone().multiply(2).subtract(an.clone().divide(3));
            if (x1.isEqual(x2)) {
                return [this._makeSolution(x1)];
            }
            return [
                this._makeSolution(x2),
                this._makeSolution(x1)
            ].sort((a, b) => a.value - b.value);
        }
        if (delta.isPositive()) {
            const x = [];
            const pv = p.value, qv = q.value, anv = an.value;
            for (let i = 0; i < 3; i++) {
                x.push(2 * Math.sqrt(-pv / 3) * Math.cos(Math.acos(3 * qv / (2 * pv) * Math.sqrt(-3 / pv)) / 3 + 2 * Math.PI * i / 3) - anv / 3);
            }
            return x
                .map(v => this._makeApproximativeSolution(v))
                .sort((a, b) => a.value - b.value);
        }
        return [];
    }
    _solveByFactorization() {
        let left = this.#equation.moveLeft().left.clone();
        let solutions = [];
        const lcm = left.lcmDenominator();
        if (lcm !== 1) {
            left.multiply(lcm);
        }
        const a = left.monomByDegree().coefficient;
        let b = left.monomByDegree(0).coefficient;
        const xPolynom = new Polynom('x');
        while (b.isZero()) {
            if (solutions.length === 0) {
                solutions.push(this._makeSolution(0));
            }
            left = (left.divide(xPolynom));
            b = left.monomByDegree(0).coefficient;
        }
        const dividersA = Numeric.dividers(a.value);
        const dividersB = Numeric.dividers(b.value);
        for (const da of dividersA) {
            for (const db of dividersB) {
                const f = new Fraction(db, da);
                if (left.evaluate(f).isZero() && !solutions.find(s => s.value === f.value)) {
                    solutions.push(this._makeSolution(f));
                }
                f.opposite();
                if (left.evaluate(f).isZero() && !solutions.find(s => s.value === f.value)) {
                    solutions.push(this._makeSolution(f));
                }
            }
        }
        for (const s of solutions) {
            if (s.exact !== false && s.exact.isZero()) {
                continue;
            }
            const p = new Polynom('x', s.exact.denominator, -s.exact.numerator);
            while (left.isDividableBy(p)) {
                left = left.divide(p);
            }
        }
        if (left.degree().isZero()) {
            return solutions.sort((a, b) => a.value - b.value);
        }
        if (left.degree().value > 3) {
            return [];
        }
        const solver = new EquationSolver(new Equation(left, 0));
        solutions = solutions.concat(solver.solve());
        return solutions.sort((a, b) => a.value - b.value);
    }
}
//# sourceMappingURL=equationSolver.js.map