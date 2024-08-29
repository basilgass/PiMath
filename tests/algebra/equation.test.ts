import { describe, expect, it, test } from "vitest"
import { Equation } from "../../lib/maths/algebra/equation"
import { Polynom } from "../../lib/maths/algebra/polynom"
import { Random } from "../../lib/maths/randomization/random"

describe('Equation creation', () => {
    test('create Equation', () => {
        const E = new Equation(
            new Polynom('x', 4, 5, 11),
            new Polynom('x', 7, -24)
        )

        expect(E).toBeDefined()
        expect(E.left.display).to.be.equal('4x^(2)+5x+11')
        expect(E.right.display).to.be.equal('7x-24')
        expect(E.display).to.be.equal('4x^(2)+5x+11=7x-24')
    })
    test('parse string', () => {
        const E = new Equation('3x+5=0')
        expect(E).toBeDefined()
        expect(E.display).to.be.equal('3x+5=0')
    })
    test('clone Equation', () => {
        const E = new Equation('3x+5=0')
        const E2 = E.clone()
        expect(E2).toBeDefined()
        expect(E2.display).to.be.equal('3x+5=0')

        E.left = new Polynom('x', 4, 5, 11)
        expect(E2.display).to.be.equal('3x+5=0')

    })
})

describe('Equation output', () => {
    test('output as LaTeX', () => {
        const E = new Equation('3x^2-3x+5/2=0')
        expect(E.tex).to.be.equal('3x^{ 2 }-3x+\\frac{ 5 }{ 2 }=0')
    })
    test('output as ASCII', () => {
        const E = new Equation('3x^2-3x+5/2=0')
        expect(E.display).to.be.equal('3x^(2)-3x+5/2=0')
    })
})

describe('Equation operations', () => {
    test('reduce Equation', () => {
        const E = new Equation('3/2x+5/3=2x-1')

        expect(E.reduce().display).to.be.equal('3x-16=0')

    })

    test('add two Equations', () => {
        const E1 = new Equation('3x+5=0'),
            E2 = new Equation('2x-1=x+3')

        const E = E1.add(E2)
        expect(E.display).to.be.equal('5x+4=x+3')
    })
    test('add polynom to Equation', () => {
        const E = new Equation('3x+5=0')
        const P = new Polynom('2x')

        E.add(P)
        expect(E.display).to.be.equal('5x+5=2x')
    })
    test('subtract two Equations', () => {
        const E1 = new Equation('3x+5=0'),
            E2 = new Equation('2x-1=x+3')

        const E = E1.subtract(E2)
        expect(E.display).to.be.equal('x+6=-x-3')
    })

    test('subtract polynom from Equation', () => {
        const E = new Equation('3x+5=0')
        const P = new Polynom('2x')

        E.subtract(P)
        expect(E.display).to.be.equal('x+5=-2x')
    })
    test('multiply an Equation by a coefficient', () => {
        const E = new Equation('3x+5=-3')

        E.multiply(2)
        expect(E.display).to.be.equal('6x+10=-6')
    })
    test('divide an Equation by a coefficient', () => {
        const E = new Equation('3x+5=-6')

        E.divide(2)
        expect(E.display).to.be.equal('3/2x+5/2=-3')
    })
    test('raise Equation by integer', () => {
        const E = new Equation('3x+5=-6')

        E.pow(2)
        expect(E.display).to.be.equal('9x^(2)+30x+25=36')
    })
})

describe('Equation comparisons', () => {
    test('equal Equation', () => {
        const E = new Equation('3x+5=0')
        expect(E.isEqualTo(E)).to.be.true

        const F = new Equation('3x=-5')
        expect(E.isEqualTo(F)).to.be.true
        expect(F.isEqualTo(E)).to.be.true

        const G = new Equation('6x+10=0')
        expect(E.isEqualTo(G)).to.be.false
    })
    test('same Equation', () => {
        const E = new Equation('3x+5=0')
        expect(E.isLinearTo(E)).to.be.true

        const F = new Equation('3x=-5')
        expect(E.isLinearTo(F)).to.be.true
        expect(F.isLinearTo(E)).to.be.true

        const G = new Equation('6x+10=0')
        expect(E.isLinearTo(G)).to.be.true
    })
})

describe.todo('Equation static functions')

describe('Equation evaluation', () => {
    test.todo('evaluate Equation')
    test('solve linear Equation', () => {
        const E = new Equation('3x+5=11')
        const result = E.solve()

        expect(result).to.be.length(1)
        expect(result[0].display).to.be.equal('2')
    })

    test('solve quadratic Equation', () => {
        const E = new Equation('x^2-3x=-2')
        const result = E.solve()

        expect(result).to.be.length(2)
        expect(result.map(x => x.display)).to.have.all.members(['1', '2'])
    })

    test('solve cubic Equation', () => {
        const E = new Equation('x^3-3x^2+3x-1=0')
        const result = E.solve()

        expect(result).to.be.length(1)
        expect(result[0].display).to.be.equal('1')
    })

    test('solve cubic Equation with 3 solutions', () => {
        const E = new Equation('x^3-6x^2+11x-6=0')
        const result = E.solve()

        expect(result).to.be.length(3)
        expect(result.map(x => x.display)).to.have.all.members(['1', '2', '3'])
    })
})

describe('Equation generators', () => {
    test('generate random Equation of degree 1', () => {
        const E = Random.equation({ degree: 1 })

        expect(E).toBeDefined()
        expect(E.degree().display).to.be.equal('1')
    })

    test('generate random Equation of degree 2', () => {
        const E = Random.equation({
            degree: 2,
            unit: true,
            solution: {
                allowZero: true,
                fraction: false,
                nothing: false,
                everything: false
            }
        })

        expect(E).toBeDefined()
        expect(E.degree().display).to.be.equal('2')

        E.solve().forEach(sol => {
            expect(sol.exact).to.not.be.false
        })
    })
    test.todo('generate random Equation of degree 2 with integer solutions')

    test.todo('generate random Equation of degree 2 with irrational solutions')

})

describe.skip('Equations tests', () => {
    it('should get the solutions', () => {

        const E1 = new Equation('3x+8', '0')
        let result = E1.solve()
        expect(result[0].tex).to.be.equal('-\\frac{ 8 }{ 3 }')

        const E2 = new Equation('x^2+5x+6', '0')
        result = E2.solve()
        expect(result.map(x => x.tex)).to.have.all.members(['-3', '-2'])

        const E3 = new Equation('(x-3)(x+2)(3x-5)', '0')
        result = E3.solve()
        expect(result.map(x => x.tex)).to.have.all.members(['-2', '3', '\\frac{ 5 }{ 3 }'])

        const E4 = new Equation('x^2+x+10', '0')
        result = E4.solve()
        expect(result.length).to.be.eq(0)

        const E5 = new Equation('(x-3)(x+2)(x-5)(x-7)(x+2)', 0)
        result = E5.solve()
        expect(result.map(x => x.tex)).to.have.all.members(['-2', '3', '5', '7'])


        const E6 = new Equation('5x^2+7x-31', 0)
        result = E6.solve()
        expect(result.map(x => x.tex)).to.have.all.members([
            '\\frac{ -7 -\\sqrt{ 669 } }{ 10 }',
            '\\frac{ -7 +\\sqrt{ 669 } }{ 10 }'
        ])
    })

    it('should resolve an equation of second degree (reduced version)', () => {
        const P = new Equation('-10x^2-8x+8=0')
        const result = P.solve()
        expect(result[0].tex).to.have.oneOf([
            '\\frac{ -2 -2 \\sqrt{ 6 } }{ 5 }',
            '\\frac{ -2 +2 \\sqrt{ 6 } }{ 5 }'
        ])
    })

    it('should solve this equation please', function () {
        const P = new Equation("2/7(3x+5)=9-(3-x)/7")
        const result = P.solve()

        expect(result).to.be.length(1)
        expect(result[0].display).to.be.equal('10')
    })

    it('should detect if two equations are equal or linear', function () {
        const P = new Equation('3x+2y=5'),
            Q = new Equation('5-3x=2y'),
            R = new Equation('6x+4y-10=0')

        expect(P.isEqualTo(P)).to.be.true
        expect(P.isEqualTo(Q)).to.be.true
        expect(P.isEqualTo(R)).to.be.false
        expect(P.isLinearTo(Q)).to.be.true
        expect(P.isLinearTo(R)).to.be.true
    })
})
