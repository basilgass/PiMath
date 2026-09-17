import {describe, expect, test} from "vitest"
import {Equation} from "../../src/algebra/equation"
import {EquationSolver} from "../../src/algebra/equationSolver"


describe("Equation Solver", () => {
    test("should solve the equation", () => {
        const equation = new Equation("x+2=4")

        const solver = new EquationSolver(equation)
        const result = solver.solve()

        expect(result.length).toBe(1)
        expect(result[0].variable).toBe("x")
        expect(result[0].value).toBe(2)
        expect(result[0].exact).not.toBeFalsy()
    })

    test('reports the solution in the equation own variable', () => {
        const equation = new Equation("t^2-4=0")

        const result = new EquationSolver(equation).solve()

        expect(result.map(s => s.value)).to.have.all.members([-2, 2])
        expect(result.every(s => s.variable === "t")).toBe(true)
    })

    test('should solve the quadratic equation', () => {
        const equation = new Equation("x^2+7x+10=0")

        const solver = new EquationSolver(equation)
        const result = solver.solve()

        expect(result.length).to.eq(2)
        expect(result[0].variable).to.eq("x")
        expect(result.map(x => x.value)).to.have.all.members([-2, -5])
        expect(result[0].value).to.eq(-5)
        expect(result[0].exact).not.toBeFalsy()
    })

    test('should solve the quadratic equation (one solution)', () => {
        const equation = new Equation("x^2+2x+1=0")

        const solver = new EquationSolver(equation)
        const result = solver.solve()

        expect(result.length).to.eq(1)
        expect(result[0].variable).to.eq("x")
        expect(result[0].value).to.eq(-1)
        expect(result[0].exact).not.toBeFalsy()
    })

    test('should solve the quadratic equation (no solution)', () => {
        const equation = new Equation("x^2+1=0")

        const solver = new EquationSolver(equation)
        const result = solver.solve()

        expect(result.length).to.eq(0)
    })

    test('should solve the quadratic equation (approximative)', () => {
        const equation = new Equation("x^2+x-10=0")

        const solver = new EquationSolver(equation)
        const result = solver.solve()

        expect(result.length).to.eq(2)
        expect(result[0].variable).to.eq("x")
        expect(result[0].exact).toBeTruthy()
        expect(result[1].exact).toBeTruthy()

        expect(result[0].display).to.eq("(-1-sqrt(41))/2")
        expect(result[1].display).to.eq("(-1+sqrt(41))/2")
    })

    test('should solve the cubic equation (one double solution)', () => {
        const equation = new Equation("(x-2)^2(3x+5)=0")

        const solver = new EquationSolver(equation)
        const result = solver.solve()

        expect(result.length).to.eq(2)
        expect(result[0].variable).to.eq("x")
        expect(result[0].fraction.display).to.be.eq('-5/3')
        expect(result[0].value).to.be.approximately(-5 / 3, 0.0001)
        expect(result[0].exact).not.toBeFalsy()
        expect(result[1].fraction.display).to.eq('2')
    })

    test('should solve the cubic equation (unique triple solution)', () => {
        const equation = new Equation("x^3-3x^2+3x-1=0")

        const solver = new EquationSolver(equation)
        const result = solver.solveAsCardan()

        expect(result.length).to.eq(1)
        expect(result[0].variable).to.eq("x")
        expect(result[0].value).to.eq(1)
        expect(result[0].exact).toBe(false)
    })

    test('should solve the cubic equation (Cardan method, delta is negative)', () => {
        const equation = new Equation("x^3+x^2+5x+5=0")

        const solver = new EquationSolver(equation)
        const result = solver.solveAsCardan()

        expect(result.length).to.eq(1)
        expect(result[0].variable).to.eq("x")
        expect(result[0].value).toBeCloseTo(-1, 6)
        expect(result[0].exact).toBe(false)
    })

    test('should solve the cubic equation (Cardan method, delta is positive)', () => {
            const equation = new Equation("x^3+2x^2-5x-6=0")

            const solver = new EquationSolver(equation)
            const result = solver.solveAsCardan()

            expect(result.length).to.eq(3)
            expect(result[0].variable).to.eq("x")
            expect(result[0].value).toBeCloseTo(-3, 6)
            expect(result[1].value).toBeCloseTo(-1, 6)
            expect(result[2].value).toBeCloseTo(2, 6)
            expect(result.every(s => s.exact === false)).toBe(true)
        }
    )

    test('should solve a factorisable equation', () => {
        const equation = new Equation("(2x-1)(3x+5)(x-7)(x+3)=0")

        const solver = new EquationSolver(equation)
        const result = solver.solve()

        expect(result.length).to.eq(4)
        expect(result[0].variable).to.eq("x")
        expect(result[0].display).to.eq('-3')
        expect(result[1].display).to.eq('-5/3')
        expect(result[2].display).to.eq('1/2')
        expect(result[3].display).to.eq('7')
    })

    test('should mix two methods to solve the equation', () => {
        const equation = new Equation("(x+3)(x-2)(x^2+x-1)=0")

        const solver = new EquationSolver(equation)
        const result = solver.solve()

        expect(result.length).to.eq(4)
        expect(result[0].variable).to.eq("x")
        expect(result[0].display).to.eq('-3')
        expect(result[1].display).to.eq("(-1-sqrt(5))/2")
        expect(result[2].display).to.eq("(-1+sqrt(5))/2")
        expect(result[3].display).to.eq('2')
    })

    test('should mix two methods to solve the equation (with trivial solutions)', () => {
        const equation = new Equation("x^5(x^2+x-1)=0")

        const solver = new EquationSolver(equation)

        const result = solver.solve()
        expect(result.length).to.eq(3)
        expect(result[0].variable).to.eq("x")
        expect(result[0].display).to.eq("(-1-sqrt(5))/2")
        expect(result[1].display).to.eq('0')
        expect(result[2].display).to.eq("(-1+sqrt(5))/2")
    })

    test('should mix multiple methods', () => {
        const equation = new Equation("x^5(x^2+x-1)^3=0")
        const solutions = new EquationSolver(equation).solve()

        expect(solutions).toHaveLength(3)
        expect(solutions[0].exact).toBeFalsy()
        expect(solutions[0].value).toBeCloseTo(-1.618, 3)
        expect(solutions[1].exact).not.toBeFalsy()
        expect(solutions[1].value).toBe(0)
        expect(solutions[2].exact).toBeFalsy()
        expect(solutions[2].value).toBeCloseTo(0.618, 3)
    })

    test('should solve complex equation', ()=>{
        const equation = new Equation('x^5-5x^4+3x^2+3=0')
        const solutions = new EquationSolver(equation).solve()

        expect(solutions[0].value).toBe(-1)
        expect(solutions[1].value).toBeCloseTo(1.1655, 3)
        expect(solutions[2].value).toBeCloseTo(4.868, 3)
    })

    test('counts the multiplicity of the zero root', () => {
        const equation = new Equation("x^5(x^2+x-1)=0")

        const result = new EquationSolver(equation).solve()

        const zero = result.find(s => s.value === 0)
        expect(zero).toBeDefined()
        expect(zero?.count).toBe(5)
    })

    test('solves an irreducible cubic numerically without looping', () => {
        // x^3 - 3x - 1 = 0 : three real irrational roots, no rational root.
        const equation = new Equation("x^3-3x-1=0")

        const result = new EquationSolver(equation).solve()

        expect(result).toHaveLength(3)
        expect(result.every(s => s.exact === false)).toBe(true)
        expect(result[0].value).toBeCloseTo(-1.532, 2)
        expect(result[1].value).toBeCloseTo(-0.347, 2)
        expect(result[2].value).toBeCloseTo(1.879, 2)
    })

    test('solve() is idempotent (no receiver mutation)', () => {
        const equation = new Equation("-x^2+3x-2=0")
        const solver = new EquationSolver(equation)

        const first = solver.solve().map(s => s.value).sort((a, b) => a - b)
        const second = solver.solve().map(s => s.value).sort((a, b) => a - b)

        expect(second).toEqual(first)
        expect(first).to.have.all.members([1, 2])
    })

    test('marks quadratic-irrational solutions exact and cubic-irreducible solutions inexact', () => {
        const quad = new EquationSolver(new Equation("x^2-2=0")).solve()
        expect(quad.every(s => s.exact === true)).toBe(true)

        const cubic = new EquationSolver(new Equation("x^3-3x-1=0")).solve()
        expect(cubic.every(s => s.exact === false)).toBe(true)
    })

    test('finds all real roots when the leading term is negative', () => {
        const equation = new Equation("-(x-1)(x-2)(x-3)(x-4)(x-5)=0")
        const result = new EquationSolver(equation).solve()

        expect(result.map(s => Math.round(s.value))).to.have.all.members([1, 2, 3, 4, 5])
    })
})