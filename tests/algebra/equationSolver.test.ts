import {describe, expect, test} from "vitest"
import {Equation} from "../../src/algebra/equation"
import {EquationSolver} from "../../src/algebra/equationSolver"
import type {Fraction} from "../../src/coefficients/fraction"


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
        expect(result[0].exact).toBeFalsy()
        expect(result[1].exact).toBeFalsy()

        expect(result[0].display).to.eq("(-1-sqrt(41))/2")
        expect(result[1].display).to.eq("(-1+sqrt(41))/2")
    })

    test('should solve the cubic equation (one double solution)', () => {
        const equation = new Equation("(x-2)^2(3x+5)=0")

        const solver = new EquationSolver(equation)
        const result = solver.solve()

        expect(result.length).to.eq(2)
        expect(result[0].variable).to.eq("x")
        expect((result[0].exact as Fraction).display).to.be.eq('-5/3')
        expect(result[0].value).to.be.approximately(-5 / 3, 0.0001)
        expect(result[0].exact).not.toBeFalsy()
        expect((result[1].exact as Fraction).display).to.eq('2')
    })

    test('should solve the cubic equation (unique triple solution)', () => {
        const equation = new Equation("x^3-3x^2+3x-1=0")

        const solver = new EquationSolver(equation)
        const result = solver.solveAsCardan()

        expect(result.length).to.eq(1)
        expect(result[0].variable).to.eq("x")
        expect(result[0].value).to.eq(1)
        expect(result[0].exact).not.toBeFalsy()
    })

    test.skip('should solve the cubic equation (Cardan method, delta is negative)', () => {
        const equation = new Equation("x^3+x^2+5x+5=0")

        const solver = new EquationSolver(equation)
        const result = solver.solveAsCardan()

        expect(result.length).to.eq(1)
        expect(result[0].variable).to.eq("x")
        expect(result[0].value).to.eq(-1)
        expect(result[0].exact).toBeFalsy()
    })

    test.skip('should solve the cubic equation (Cardan method, delta is positive)', () => {
            const equation = new Equation("x^3+2x^2-5x-6=0")

            const solver = new EquationSolver(equation)
            const result = solver.solveAsCardan()

            expect(result.length).to.eq(3)
            expect(result[0].variable).to.eq("x")
            expect(result[0].value).to.eq(-3)
            expect(result[1].value).to.eq(-1)
            expect(result[2].value).to.eq(2)
            expect(result[0].exact).toBeFalsy()
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

        console.log('SOLUTIONS', solutions.map(x=>`${x.display} = ${x.value}`))
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
        console.log(solutions)
    })
})