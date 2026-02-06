import type {InputValue} from "../pimath.interface"
import type {Polynom} from "./polynom"
import {Fraction} from "../coefficients"
import {Numeric} from "../numeric"
import type {Equation} from "./equation"
import {Solution} from "../analyze"

export class EquationSolver {
    _: number
    #bissectionDeltaX: number
    readonly #leftPolynom: Polynom
    readonly #variable: string

    constructor(left: Polynom | Equation, right?: Polynom, variable = "x") {
        this.#variable = variable
        this.#bissectionDeltaX = 1e-4
        this._ = 0

        // do this to avoid importing Polynom or Equation
        if (Object.hasOwn(left, 'moveLeft')) {
            const equ = left as Equation
            this.#leftPolynom = equ.left.clone().subtract(equ.right)
        } else {
            this.#leftPolynom = (left as Polynom).clone().subtract(right ?? 0)
        }

        return this
    }

    get bissectionComplexityCounter() {
        return this._
    }

    get bissectionDeltaX() {
        return this.#bissectionDeltaX
    }

    set bissectionDeltaX(value: number) {
        this.#bissectionDeltaX = value
    }

    public solve(): Solution[] {
        const degree = this.#leftPolynom.degree().value

        if (degree === 0) {
            return []
        }

        if (degree === 1) {
            return this.#solveLinear()
        }

        if (degree === 2) {
            return this.#solveQuadratic()
        }

        // Try to solve by factorization -> exact solutions.
        const {solutions, reminder} = this.#solveByFactorization()

        // The remaining polynom is of degree zero. No more solutions available.
        if (reminder.degree().isZero()) {
            return solutions
        }

        // The remaining polyno is of degree one or two, but cannot be solved by factorization (!).
        if (reminder.degree().value <= 2) {
            return solutions.concat(
                new EquationSolver(reminder.clone()).solve()
            )
        }

        // Use approximative solutions, using bissection algorithm.
        this._ = 0
        return solutions.concat(
            this.#solveByBissection(reminder)
        ).sort((a, b) => a.value - b.value)
    }

    public solveAsCardan(): Solution[] {
        if (this.#leftPolynom.degree().value !== 3) {
            throw new Error("The equation is not cubic.")
        }
        return this.#solveCubic_CardanFormula()
    }

    #makeApproximativeSolution(value: number, output?: { tex: string, display: string }): Solution {
        const sol = new Solution()

        sol.exact = false
        sol.tex = output?.tex ?? null
        sol.display = output?.display ?? null
        sol.fraction = new Fraction(value)
        sol.fraction.exact = false
        sol.variable = this.#variable

        return sol
    }

    #makeSolution(value: InputValue<Fraction>): Solution {
        if (value instanceof Fraction && !value.exact) {
            return this.#makeApproximativeSolution(value.value)
        }

        return Solution.fromFraction(value)
    }

    // Solve using bissection algorithm (approximative solution)
    #solveByBissection(polynom: Polynom): Solution[] {
        const solutions: Solution[] = []
        const degree = polynom.degree().value

        // Calculate the Cauchy Bounds.
        const [a, ...values] = polynom.getCoefficients()
        const B = 2 + Math.max(...values.map(x => x.value / a.value))

        // Cut the [-B;B] interval in *n* parts : n = 100

        // Calculate the f(x) value at each points
        const evaluatedPoints = this.#solveByBissection_evaluatePoints(polynom, B, 100)

        // Check if there is a least n opposite couples
        const couples = this.#solveByBissection_getCouples(evaluatedPoints, degree)

        // All solutions fund !
        couples.forEach(couple => {
            const [a, b] = couple

            if (a === b) {
                // Exact solution
                solutions.push(this.#makeSolution(a))
            } else {
                const bissection = this.#solveByBissection_algorithm(polynom, a, b)

                if (bissection !== null) {
                    solutions.push(this.#makeApproximativeSolution(bissection))
                }
            }
        })

        return solutions
    }

    #solveByBissection_algorithm(polynom: Polynom, a: number, b: number): number | null {
        let fa = polynom.evaluate(a, true) as number
        let fb = polynom.evaluate(b, true) as number

        if (fa * fb > 0) {
            console.log("Pas de racine dans l'intervalle donné")
            return null
        }

        let mid: number
        while ((b - a) / 2 > this.#bissectionDeltaX) {
            this._++

            mid = (a + b) / 2
            const fmid = polynom.evaluate(mid, true) as number

            if (fmid === 0) {
                return mid // racine exacte trouvée
            } else if (fa * fmid < 0) {
                b = mid
                fb = fmid
            } else {
                a = mid
                fa = fmid
            }
        }
        return (a + b) / 2 // retourner la racine approximative
    }

    #solveByBissection_evaluatePoints(polynom: Polynom, bounds: number, slice: number): { x: number, fx: number }[] {

        const evaluatedPoints: { x: number, fx: number }[] = []

        const dx = 2 * bounds / slice

        for (let searchValue = -bounds; searchValue <= bounds; searchValue += dx) {

            const x = Numeric.numberCorrection(searchValue)
            evaluatedPoints.push(
                {
                    x,
                    fx: polynom.evaluate(x, true) as number
                }
            )
        }

        return evaluatedPoints
    }

    #solveByBissection_getCouples(evaluatedPoints: { x: number, fx: number }[], degree: number): [number, number][] {
        const couples: [number, number][] = []

        for (let index = 1; index < evaluatedPoints.length; index++) {

            const value = evaluatedPoints[index]
            const previous = evaluatedPoints[index - 1]

            if (value.fx === 0) {
                // exact value
                couples.push([value.x, value.x])
            } else if (value.fx * previous.fx < 0) {
                // both evaluated expression are of opposite sign.
                couples.push([previous.x, value.x])
            }

            if (couples.length === degree) {
                // All couples are found.
                return couples
            }
        }

        return couples
    }

    #solveByFactorization(): { solutions: Solution[], reminder: Polynom } {
        // Move everything to the left.

        // Get the polynom on the left (on the right, it's zero)
        const left = this.#leftPolynom.clone()

        // The solutions of the equation
        const solutions: Solution[] = []

        // multiply by the lcm of the denominators
        // to get rid of the fractions
        const lcm = left.lcmDenominator()
        if (lcm !== 1) {
            left.multiply(lcm)
        }

        // alternative method : if there is no monom of degree zero.
        // - get the monom with the smallest degree.
        // - if degree>0, divide by x^{degree}
        const a = left.monomByDegree().coefficient
        const b = left.monomByDegree(0).coefficient
        if (b.isZero()) {
            solutions.push(this.#makeSolution(0))

            const m = left.monoms.reduce((min, curr) => curr.degree().value < min.degree().value ? curr : min)
            const k = m.coefficient
            m.clone().divide(k) // make the monom unit
            left.divide(m)
        }

        // get all dividers of a and b
        const dividersA = Numeric.dividers(a.value)
        const dividersB = Numeric.dividers(b.value)

        // gel all possible solutions
        const testingSolutions: Fraction[] = []
        for (const da of dividersA) {
            for (const db of dividersB) {
                const f = new Fraction(db, da)
                if (!testingSolutions.find(s => s.value === f.value)) {
                    testingSolutions.push(f.clone())
                    testingSolutions.push(f.opposite().clone())
                }

            }
        }

        // Each value in testingSolutions are "unique" -> juste test them to see if it evaluates to zero.
        testingSolutions.forEach(f => {
            if ((left.evaluate(f) as Fraction).isZero()) {
                solutions.push(this.#makeSolution(f))
            }
        })

        // divide the left polynom by the solutions (as polynom)
        // to get the reduced polynom
        for (const s of solutions) {
            // all solutions are exact solutions.
            // skip the zero solutions if it exists.
            if (s.isZero()) {
                continue
            }

            // The divider polynom
            const p = left.clone()
                .fromCoefficients(s.fraction.denominator, -s.fraction.numerator)

            // Reset the count
            s.count = 0

            // Divide as long it's dividable.
            while (left.isDividableBy(p)) {
                left.divide(p)
                s.count++
            }
        }

        // if the reduced polynom is of degree 0, we have found all the solutions
        // if the reduced polynom is of degree greater than 3, we can't solve it
        if (left.degree().isZero() || left.degree().value > 3) {
            // Tri des réponses
            solutions.sort((a, b) => a.value - b.value)
            return {solutions, reminder: left}
        }

        // if the reduced polynom is of degree 1 or 2, we can solve it
        const zeroPolynom = left.clone().zero()

        const solver = new EquationSolver(left, zeroPolynom, this.#variable)
        return {
            solutions: solutions
                .concat(solver.solve())
                .sort((a, b) => a.value - b.value),
            reminder: zeroPolynom
        }
    }

    #solveCubic_CardanFormula(): Solution[] {
        // get the coefficients of the equation
        const left = this.#leftPolynom

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

        // if delta is negative, there is one real solution
        if (delta.isNegative()) {
            const u = q.clone().opposite().add(delta.clone().opposite().sqrt()).divide(2).root(3)
            const v = q.clone().opposite().subtract(delta.clone().opposite().sqrt()).divide(2).root(3)

            const x = u.clone().add(v).subtract(an.clone().divide(3))

            return [this.#makeSolution(x)]
        }

        // if delta is zero, there are two real solutions
        if (delta.isZero()) {
            const u = q.clone().opposite().divide(2).root(3)

            const x1 = u.clone().opposite().subtract(an.clone().divide(3))
            const x2 = u.clone().multiply(2).subtract(an.clone().divide(3))

            // There is only one unique solution
            if (x1.isEqual(x2)) {
                return [this.#makeSolution(x1)]
            }

            return [
                this.#makeSolution(x2),
                this.#makeSolution(x1)
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
                .map(v => this.#makeApproximativeSolution(v))
                .sort((a, b) => a.value - b.value)

        }

        return []
    }

    #solveLinear(): Solution[] {
        // The equation is linear.
        const [a, b] = this.#leftPolynom.getCoefficients()

        // left is a polynom ax+b => the solution is x = -b/a
        const f = b.opposite().divide(a)

        return [
            this.#makeSolution(f)
        ]
    }

    #solveQuadratic(): Solution[] {

        // The equation is quadratic.
        // We can solve it by isolating the variable.

        // The monom with greatest degree must be positive.
        const left = this.#leftPolynom
        if (left.monomByDegree().coefficient.isNegative()) {
            left.opposite()
        }

        // left is a polynom ax^2+bx+c => the solution is x = (-b±√(b^2-4ac))/2a
        const [a, b, c] = left.getCoefficients()

        // delta2 = b^2-4ac
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
            const f1 = b.clone().opposite().subtract(delta).divide(a.clone().multiply(2))
            const f2 = b.clone().opposite().add(delta).divide(a.clone().multiply(2))

            // Delta is zero, there is only one solution
            if (delta.isZero()) {
                const sol = this.#makeSolution(f1)
                sol.count = 2
                return [sol]
            }

            // delta is positive, there are two solutions
            return [
                this.#makeSolution(f1),
                this.#makeSolution(f2)
            ].sort((a, b) => a.value - b.value)
        }

        // delta is not a square, there are one or two approximative solutions.
        // We will use the approximate value of the square root.
        // const delta = delta2.value ** 0.5
        // const f1 = (-b.value + delta) / (2 * a.value)
        // const f2 = (-b.value - delta) / (2 * a.value)

        return this.#solveQuadratic_Output(a, b, delta2)
    }

    #solveQuadratic_Output(a: Fraction, b: Fraction, delta: Fraction): Solution[] {
        // -b +/- sqrt(delta) / 2a
        // reduce the sqrt - extract pow.
        const a2 = a.clone().multiply(2)

        const sol1 = new Solution()
        sol1.fraction = b.clone().opposite().divide(a2.clone())
        sol1.root.radical = delta.clone()
        sol1.root.factor = new Fraction().one().divide(a2.clone())
        sol1.exact = true

        const sol2 = new Solution()
        sol2.fraction = b.clone().opposite().divide(a2.clone())
        sol2.root.radical = delta.clone()
        sol2.root.factor = new Fraction().one().divide(a2.clone()).opposite()
        sol2.exact = true

        return [sol1, sol2]
            .sort((a, b) => a.value - b.value)
    }
}
