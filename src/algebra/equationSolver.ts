import { InputValue, ISolution } from "../../pimath.interface"
import { Fraction } from "../coefficients/fraction"
import { Numeric } from "../numeric"
import { Equation } from "./equation"
import { Polynom } from "./polynom"

export class EquationSolver {
    readonly #equation: Equation
    readonly #variable: string

    constructor(equation: Equation, variable = "x") {
        this.#equation = equation
        this.#variable = variable
    }

    solve(): ISolution[] {

        if (this.#equation.degree().isOne()) {
            return this._solveLinear()
        }

        if (this.#equation.degree().value === 2) {
            return this._solveQuadratic()
        }

        const result = this._solveByFactorization()
        if (result.length > 0) {
            return result
        }

        // Use Cardan formula for cubic equations
        if (this.#equation.degree().value === 3) {
            return this._solveCubic_CardanFormula()
        }

        throw new Error("The equation degree is too high.")
    }

    solveAsCardan(): ISolution[] {
        if (this.#equation.degree().value !== 3) {
            throw new Error("The equation is not cubic.")
        }
        return this._solveCubic_CardanFormula()
    }

    private _makeSolution(value: InputValue<Fraction>): ISolution {
        if (value instanceof Fraction && value.isApproximative()) {
            return this._makeApproximativeSolution(value.value)
        }

        const fraction = new Fraction(value)

        return {
            variable: this.#variable,
            exact: fraction,
            value: fraction.value,
            tex: fraction.tex,
            display: fraction.display
        }
    }

    private _makeApproximativeSolution(value: number, output?: { tex: string, display: string }): ISolution {
        return {
            variable: this.#variable,
            exact: false,
            value: +value.toFixed(10),
            tex: output?.tex ?? '',
            display: output?.display ?? ''
        }
    }

    private _solveLinear(): ISolution[] {
        // The equation is linear.
        // We can solve it by isolating the variable.
        const left = this.#equation.moveLeft().left

        // left is a polynom ax+b => the solution is x = -b/a
        const f = left.monomByDegree(0).coefficient.clone().opposite().divide(left.monomByDegree(1).coefficient)

        return [
            this._makeSolution(f)
        ]
    }

    private _solveQuadratic(): ISolution[] {

        // The equation is quadratic.
        // We can solve it by isolating the variable.
        const left = this.#equation.moveLeft().left

        // left is a polynom ax^2+bx+c => the solution is x = (-b±√(b^2-4ac))/2a

        const a = left.monomByDegree(2).coefficient
        const b = left.monomByDegree(1).coefficient
        const c = left.monomByDegree(0).coefficient

        const delta2 = b.clone().pow(2).subtract(a.clone().multiply(c).multiply(4))

        // if delta2 is negative, there is no solution
        if (delta2.isNegative()) {
            return []
        }

        // if delta2 is zero, there is one solution
        // if delta2 is positive, there are two solutions
        // if delta2 is a square, it will be an exact solution.

        if (delta2.isSquare()) {
            // delta is a fraction.
            // the solutions are (-b±√(b^2-4ac))/2a
            const delta = delta2.sqrt()
            const f1 = b.clone().opposite().add(delta).divide(a.clone().multiply(2))
            const f2 = b.clone().opposite().subtract(delta).divide(a.clone().multiply(2))

            // Delta is zero, there is only one solution
            if (delta.isZero()) {
                return [this._makeSolution(f1)]
            }

            // delta is positive, there are two solutions
            return [
                this._makeSolution(f1),
                this._makeSolution(f2)
            ].sort((a, b) => a.value - b.value)
        }

        // delta is not a square, there are one or two approximative solutions.
        // We will use the approximate value of the square root.
        // const delta = delta2.value ** 0.5
        // const f1 = (-b.value + delta) / (2 * a.value)
        // const f2 = (-b.value - delta) / (2 * a.value)

        return this._solveQuadratic_Output(a, b, delta2)
    }

    private _solveQuadratic_Output(a: Fraction, b: Fraction, delta: Fraction): ISolution[] {
        // -b +/- sqrt(delta) / 2a
        // reduce the sqrt - extract pow.

        // Get the greatest square factor
        const deltaFactor: number = Numeric
            .dividers(delta.value)
            .filter(x => Math.sqrt(x) % 1 === 0)
            .map(x => Math.sqrt(x)).pop() ?? 1

        // Get the GCD of a, b, and the greatest delta factor.
        const gcd = Numeric.gcd(2 * a.value, b.value, deltaFactor) * (a.isNegative() ? -1 : 1)

        // Calculate the various values and transforming
        const b2 = b.clone().divide(gcd).opposite()
        const a2 = a.clone().divide(gcd).multiply(2)
        const delta2 = delta.clone().divide(deltaFactor ** 2)
        const deltaGcd = Math.abs(deltaFactor / gcd)
        const deltaK1 = deltaFactor === 1 ? '-' : `-${deltaGcd} `
        const deltaK2 = deltaFactor === 1 ? '+' : `+${deltaGcd} `

        function texOutput(a: string, b: string, k: string, delta: string) {
            return `\\frac{ ${b} ${k}\\sqrt{ ${delta} } }{ ${a} }`
        }

        function displayOutput(a: string, b: string, k: string, delta: string) {
            return `(${b}${k}sqrt(${delta}))/${a}`
        }

        const d = delta.value ** 0.5
        const f1 = (-b.value - d) / (2 * a.value)
        const f2 = (-b.value + d) / (2 * a.value)

        return [
            this._makeApproximativeSolution(f1,
                {
                    tex: texOutput(a2.tex, b2.tex, deltaK1.toString(), delta2.tex),
                    display: displayOutput(a2.display, b2.display, deltaK1.toString(), delta2.display),
                }
            ),
            this._makeApproximativeSolution(f2,
                {
                    tex: texOutput(a2.tex, b2.tex, deltaK2.toString(), delta2.tex),
                    display: displayOutput(a2.display, b2.display, deltaK2.toString(), delta2.display),
                }
            )
        ].sort((a, b) => a.value - b.value)
    }

    private _solveCubic_CardanFormula(): ISolution[] {
        // get the coefficients of the equation
        const left = this.#equation.moveLeft().left

        // left is a polynom ax^3+bx^2+cx+d => the solution is x = (-b±√(b^2-4ac))/2a
        const a = left.monomByDegree(3).coefficient
        const b = left.monomByDegree(2).coefficient
        const c = left.monomByDegree(1).coefficient
        const d = left.monomByDegree(0).coefficient

        // normalize the coefficient by dividing by a
        const an = b.clone().divide(a)
        const bn = c.clone().divide(a)
        const cn = d.clone().divide(a)

        // Depressed cubic equation
        // x^3+px+q=0
        const p = bn.clone().subtract(an.clone().pow(2).divide(3))
        const q = cn.clone()
            .subtract(an.clone().multiply(bn).divide(3))
            .add(an.clone().pow(3).multiply(2).divide(27))


        // Cardan method
        // X^2 + qX - p^3/27 = 0
        // X^2 -SX + P = 0
        // S = u^3 + v^3 = -q
        // P = u^3v^3 = -p^3/27
        // u^3 and v^3 are the roots of the equation
        const S = q.clone().opposite()
        const P = p.clone().opposite().pow(3).divide(27)

        // Discriminant : delta = -(S^2 - 4P)
        // delta < 0 : 1 real solution
        // delta = 0 : 2 real solutions
        // delta > 0 : 3 real solutions
        const delta = S.clone().pow(2).subtract(P.clone().multiply(4)).opposite()
        // console.log('an=', an.display, 'bn=', bn.display, 'cn=', cn.display)
        // console.log('p=', p.display, 'q=', q.display)
        // console.log('S=', S.display, 'P=', P.display)
        // console.log('delta=', delta.display)

        // if delta is negative, there is one real solution
        if (delta.isNegative()) {
            const u = q.clone().opposite().add(delta.clone().opposite().sqrt()).divide(2).root(3)
            const v = q.clone().opposite().subtract(delta.clone().opposite().sqrt()).divide(2).root(3)

            const x = u.clone().add(v).subtract(an.clone().divide(3))

            return [this._makeSolution(x)]
        }

        // if delta is zero, there are two real solutions
        if (delta.isZero()) {
            const u = q.clone().opposite().divide(2).root(3)

            const x1 = u.clone().opposite().subtract(an.clone().divide(3))
            const x2 = u.clone().multiply(2).subtract(an.clone().divide(3))

            // There is only one unique solution
            if (x1.isEqual(x2)) {
                return [this._makeSolution(x1)]
            }

            return [
                this._makeSolution(x2),
                this._makeSolution(x1)
            ].sort((a, b) => a.value - b.value)
        }

        // if delta is positive, there are three real solutions
        if (delta.isPositive()) {
            const x: number[] = []
            const pv = p.value,
                qv = q.value,
                anv = an.value

            for (let i = 0; i < 3; i++) {
                x.push(2 * Math.sqrt(-pv / 3) * Math.cos(Math.acos(3 * qv / (2 * pv) * Math.sqrt(-3 / pv)) / 3 + 2 * Math.PI * i / 3) - anv / 3)
            }

            return x
                .map(v => this._makeApproximativeSolution(v))
                .sort((a, b) => a.value - b.value)

        }

        return []
    }

    private _solveByFactorization(): ISolution[] {
        // Move everything to the left.
        let left = this.#equation.moveLeft().left.clone()

        // The solutions of the equation
        let solutions: ISolution[] = []

        // multiply by the lcm of the denominators
        // to get rid of the fractions
        const lcm = left.lcmDenominator()
        if (lcm !== 1) {
            left.multiply(lcm)
        }

        // left is a polynom ax^n+...+b
        const a = left.monomByDegree().coefficient // Greatest coefficient
        let b = left.monomByDegree(0).coefficient // Constant term

        // if the constant term is null, the polynom can be divided by x
        const xPolynom = new Polynom('x')
        while (b.isZero()) {
            if (solutions.length === 0) {
                solutions.push(this._makeSolution(0))
            }

            left = (left.divide(xPolynom))
            b = left.monomByDegree(0).coefficient
        }

        // get all dividers of a and b
        const dividersA = Numeric.dividers(a.value)
        const dividersB = Numeric.dividers(b.value)

        // test all possible solutions
        for (const da of dividersA) {
            for (const db of dividersB) {
                const f = new Fraction(db, da)

                // Test with the fraction
                if ((left.evaluate(f) as Fraction).isZero() && !solutions.find(s => s.value === f.value)) {
                    solutions.push(this._makeSolution(f))
                }

                // Test with the opposite fraction
                f.opposite()
                if ((left.evaluate(f) as Fraction).isZero() && !solutions.find(s => s.value === f.value)) {
                    solutions.push(this._makeSolution(f))
                }
            }
        }

        // divide the left polynom by the solutions (as polynom)
        // to get the reduced polynom
        for (const s of solutions) {
            // if the solution is exact and is zero, it's already divided: skip it !
            if (s.exact !== false && (s.exact as Fraction).isZero()) {
                continue
            }

            const p = new Polynom('x', (s.exact as Fraction).denominator, -(s.exact as Fraction).numerator)

            while (left.isDividableBy(p)) {
                left = left.divide(p)
            }
        }

        // if the reduced polynom is of degree 0, we have found all the solutions
        if (left.degree().isZero()) {
            return solutions.sort((a, b) => a.value - b.value)
        }

        // if the reduced polynom is of degree greater than 3, we can't solve it
        if (left.degree().value > 3) {
            return []
        }

        const solver = new EquationSolver(new Equation(left, 0))
        solutions = solutions.concat(solver.solve())

        return solutions.sort((a, b) => a.value - b.value)

    }
}
