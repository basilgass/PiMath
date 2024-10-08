// TODO: Convert EquationSolver class to a simple function ?

import type {InputValue, ISolution} from "../pimath.interface"
import type {Polynom} from "./polynom"
import {Fraction} from "../coefficients"
import {Numeric} from "../numeric"
import type {Equation} from "./equation"

export class EquationSolver {
    readonly #equation: Polynom
    readonly #variable: string

    constructor(left: Polynom | Equation, right?: Polynom, variable = "x") {
        this.#variable = variable

        if (Object.hasOwn(left, 'moveLeft')) {
            const equ = left as Equation
            this.#equation = equ.left.clone().subtract(equ.right)
        } else {
            this.#equation = (left as Polynom).clone().subtract(right ?? 0)
        }
    }

    public solve(): ISolution[] {
        const degree = this.#equation.degree().value
        // TODO: Make sure the solutions are listed in growing order !
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
        const result = this.#solveByFactorization()
        if (result.length > 0) {
            return result
        }

        // Use approximative solutions, using bissection algorithm.
        return this.#solveByBissection()

        // // Use Cardan formula for cubic equations
        // if (this.#equation.degree().value === 3) {
        //     return this.#solveCubic_CardanFormula()
        // }
        //
        // throw new Error("The equation degree is too high.")
    }


    public solveAsCardan(): ISolution[] {
        if (this.#equation.degree().value !== 3) {
            throw new Error("The equation is not cubic.")
        }
        return this.#solveCubic_CardanFormula()
    }

    #makeApproximativeSolution(value: number, output?: { tex: string, display: string }): ISolution {
        return {
            variable: this.#variable,
            exact: false,
            value: +value.toFixed(10),
            tex: output?.tex ?? '',
            display: output?.display ?? ''
        }
    }

    #makeSolution(value: InputValue<Fraction>): ISolution {
        if (value instanceof Fraction && value.isApproximative()) {
            return this.#makeApproximativeSolution(value.value)
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

    #solveByBissection(): ISolution[] {
        const solutions: ISolution[] = []
        const degree = this.#equation.degree().value
        const coeffs = this.#equation.getCoefficients().map(x=>x.value)

        // Calculate the Cauchy Bounds.
        const [a, ...values] = this.#equation.getCoefficients()
        console.log(this.#equation.display)
        const B = 1 + Math.max(...values.map(x => x.value / a.value))

        // Cut the [-B;B] interval in *n* parts

        // Calculate the value at each points
        const n = 100
        const dx = 2 * B / n
        const evaluatedPoints: { x: number, fx: number }[] = []
        for (let searchValue = -B; searchValue <= B; searchValue += dx) {
            const x = Numeric.numberCorrection(searchValue)
            evaluatedPoints.push(
                {
                    x,
                    fx: this.#equation.evaluate(x, true) as number
                }
            )
        }

        // Sort every points
        evaluatedPoints.sort((a, b) => a.x - b.x)

        // Check if there is a least n opposite couples
        const couples: [number, number][] = []
        evaluatedPoints.forEach((value, index) => {
            if (index > 0) {
                if (value.fx === 0) {
                    couples.push([value.x, value.x])
                } else if (evaluatedPoints[index - 1].fx * value.fx < 0) {
                    couples.push([
                        evaluatedPoints[index - 1].x,
                        value.x
                    ])

                }
            }
        })

        // All solutions fund !
        couples.forEach(couple => {
            const [a, b] = couple

            if (a === b) {
                // Exact solution
                solutions.push(this.#makeSolution(a))
            }else{
                const bissection = this.#solveByBissection_algorithm(coeffs, a, b)
                if(bissection!==null) {
                    solutions.push(this.#makeApproximativeSolution(bissection))
                }
            }
        })

        console.log(solutions.map(x=>x.value))

        return solutions
    }

    #solveByBissection_algorithm(coeffs: number[], a: number, b: number, tol = 1e-10): number | null {
        let fa = this.#equation.evaluate(a, true) as number
        let fb = this.#equation.evaluate(b, true) as number

        if (fa * fb > 0) {
            console.log("Pas de racine dans l'intervalle donné")
            return null
        }

        let mid: number
        while ((b - a) / 2 > tol) {
            mid = (a + b) / 2
            const fmid = this.#equation.evaluate( mid, true) as number

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

    #solveByFactorization(): ISolution[] {
        // Move everything to the left.

        // Get the polynom on the left (on the right, it's zero)
        let left = this.#equation.clone()

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
        while (b.isZero()) {
            if (solutions.length === 0) {
                solutions.push(this.#makeSolution(0))
            }

            left = (left.divide('x'))
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
                    solutions.push(this.#makeSolution(f))
                }

                // Test with the opposite fraction
                f.opposite()
                if ((left.evaluate(f) as Fraction).isZero() && !solutions.find(s => s.value === f.value)) {
                    solutions.push(this.#makeSolution(f))
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

            const p = this.#equation.clone().parse('x', (s.exact as Fraction).denominator, -(s.exact as Fraction).numerator)

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

        // if the reduced polynom is of degree 1 or 2, we can solve it
        const solver = new EquationSolver(left, left.clone().parse('0'), this.#variable)
        solutions = solutions.concat(solver.solve())

        return solutions.sort((a, b) => a.value - b.value)
    }

    #solveCubic_CardanFormula(): ISolution[] {
        // get the coefficients of the equation
        const left = this.#equation

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

    #solveLinear(): ISolution[] {
        // The equation is linear.
        const [a, b] = this.#equation.getCoefficients()

        // left is a polynom ax+b => the solution is x = -b/a
        const f = b.opposite().divide(a)

        return [
            this.#makeSolution(f)
        ]
    }

    #solveQuadratic(): ISolution[] {

        // The equation is quadratic.
        // We can solve it by isolating the variable.
        const left = this.#equation

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
            const f1 = b.clone().opposite().add(delta).divide(a.clone().multiply(2))
            const f2 = b.clone().opposite().subtract(delta).divide(a.clone().multiply(2))

            // Delta is zero, there is only one solution
            if (delta.isZero()) {
                return [this.#makeSolution(f1)]
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

    #solveQuadratic_Output(a: Fraction, b: Fraction, delta: Fraction): ISolution[] {
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
            this.#makeApproximativeSolution(f1,
                {
                    tex: texOutput(a2.tex, b2.tex, deltaK1.toString(), delta2.tex),
                    display: displayOutput(a2.display, b2.display, deltaK1.toString(), delta2.display),
                }
            ),
            this.#makeApproximativeSolution(f2,
                {
                    tex: texOutput(a2.tex, b2.tex, deltaK2.toString(), delta2.tex),
                    display: displayOutput(a2.display, b2.display, deltaK2.toString(), delta2.display),
                }
            )
        ].sort((a, b) => a.value - b.value)
    }
}
