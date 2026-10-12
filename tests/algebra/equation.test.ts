import {describe, expect, it, test} from "vitest"
import {Equation} from "../../src/algebra/equation"
import {Polynom} from "../../src/algebra/polynom"
import {Fraction} from "../../src/coefficients/fraction"
import {MathError, ParseError} from "../../src/errors"

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
    test('parse each equation sign', () => {
        expect(new Equation('x=3').sign).toBe('=')
        expect(new Equation('x<3').sign).toBe('<')
        expect(new Equation('x>3').sign).toBe('>')
        expect(new Equation('x<=3').sign).toBe('<=')
        expect(new Equation('x>=3').sign).toBe('>=')
    })
    test('parse latex and alternate sign notations', () => {
        expect(new Equation('x\\geq3').sign).toBe('>=')
        expect(new Equation('x\\leq3').sign).toBe('<=')
        expect(new Equation('x=>3').sign).toBe('>=')
        expect(new Equation('x=<3').sign).toBe('<=')
    })
    test('parsing a string without a sign throws', () => {
        expect(() => new Equation('3x+5')).toThrow(ParseError)
    })
    test('a bare expression is read as "expression = 0"', () => {
        const E = new Equation(new Polynom('3x+5'))

        expect(E.left.display).to.be.equal('3x+5')
        expect(E.right.display).to.be.equal('0')
        expect(E.sign).to.be.equal('=')
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

describe('Equation inequalities', () => {
    test('render the sign as LaTeX', () => {
        expect(new Equation('x>=3').signAsTex).toBe('\\geq')
        expect(new Equation('x<=3').signAsTex).toBe('\\leq')
        expect(new Equation('x>3').signAsTex).toBe('>')
        expect(new Equation('x<3').signAsTex).toBe('<')
    })
    test('multiply by a negative reverses the inequality sign', () => {
        const E = new Equation('2x<4')
        E.multiply(-1)

        expect(E.sign).toBe('>')
        expect(E.left.display).to.be.equal('-2x')
        expect(E.right.display).to.be.equal('-4')
    })
    test('multiply by a positive keeps the inequality sign', () => {
        const E = new Equation('2x<4')
        E.multiply(2)

        expect(E.sign).toBe('<')
    })
    test('divide by a negative reverses the inequality sign', () => {
        const E = new Equation('x>=3')
        E.divide(-1)

        expect(E.sign).toBe('<=')
        expect(E.left.display).to.be.equal('-x')
        expect(E.right.display).to.be.equal('-3')
    })
    test('an equality sign is never reversed', () => {
        const E = new Equation('2x=4')
        E.multiply(-1)

        expect(E.sign).toBe('=')
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
    test('multiply by several coefficients at once', () => {
        const E = new Equation('3x+5=-3')

        E.multiply(2, 3)
        expect(E.display).to.be.equal('18x+30=-18')
    })
    test('add several equations at once', () => {
        const E = new Equation('3x+5=0')

        E.add(new Equation('2x-1=x+3'), new Equation('x=1'))
        expect(E.display).to.be.equal('6x+4=x+4')
    })
    test('raise Equation by integer', () => {
        const E = new Equation('3x+5=-6')

        E.pow(2)
        expect(E.display).to.be.equal('9x^(2)+30x+25=36')
    })
    test('opposite negates both parts', () => {
        const E = new Equation('3x+5=2')
        E.opposite()

        expect(E.left.display).to.be.equal('-3x-5')
        expect(E.right.display).to.be.equal('-2')
    })
    test('reorder moves variables left and constants right', () => {
        const E = new Equation('3x+5=2x-1')
        E.reorder()

        expect(E.left.display).to.be.equal('x')
        expect(E.right.display).to.be.equal('-6')
    })
    test('reorder with allLeft keeps everything on the left', () => {
        const E = new Equation('3x+5=2x-1')
        E.reorder(true)

        expect(E.left.display).to.be.equal('x+6')
        expect(E.right.display).to.be.equal('0')
    })
    test('split returns detached clones of both parts', () => {
        const E = new Equation('3x+5=2')
        const [left, right] = E.split()

        expect(left.display).to.be.equal('3x+5')
        expect(right.display).to.be.equal('2')

        // Mutating the returned parts must not affect the equation.
        left.add(new Polynom('x'))
        expect(E.left.display).to.be.equal('3x+5')
    })
})

describe('Equation comparisons', () => {
    test('isEqual is strict, member by member and sign-sensitive', () => {
        const E = new Equation('3x+5=0')

        expect(E.isEqual(new Equation('3x+5=0'))).toBe(true)
        // Rearranged members are not strictly equal.
        expect(E.isEqual(new Equation('3x=-5'))).toBe(false)
        // A different sign is not equal.
        expect(E.isEqual(new Equation('3x+5<0'))).toBe(false)
    })
    test('isEquivalentTo matches equations with the same solutions', () => {
        const E = new Equation('3x+5=0')

        expect(E.isEquivalentTo(E)).toBe(true)
        // Rearranged.
        expect(E.isEquivalentTo(new Equation('3x=-5'))).toBe(true)
        // Scaled by a factor.
        expect(E.isEquivalentTo(new Equation('6x+10=0'))).toBe(true)
    })
    test('isEquivalentTo respects the inequality direction', () => {
        const E = new Equation('2x<4')

        // Positive scaling keeps the direction.
        expect(E.isEquivalentTo(new Equation('x<2'))).toBe(true)
        // Negative scaling mirrors the equation, the sign must reverse.
        expect(E.isEquivalentTo(new Equation('-x>-2'))).toBe(true)
        // Same polynom up to scale but wrong direction.
        expect(E.isEquivalentTo(new Equation('x>2'))).toBe(false)
    })
})

describe('Equation isolate', () => {
    test('isolate the single variable of a linear equation', () => {
        const E = new Equation('2x+4=0')

        // isolate mutates and returns the receiver.
        expect(E.isolate()).to.be.equal(E)
        expect(E.left.display).to.be.equal('x')
        expect(E.right.display).to.be.equal('-2')
    })
    test('isolate a chosen variable of a linear two-variable equation', () => {
        const E = new Equation('2x+3y=6')
        E.isolate('y')

        expect(E.left.display).to.be.equal('y')
        expect(E.right.evaluate({ x: new Fraction(0) }).display).to.be.equal('2')
    })
    test('cannot isolate an equation of degree greater than one', () => {
        const E = new Equation('x^2+1=0')
        const before = E.display

        expect(() => E.isolate()).toThrow(MathError)
        // A failed isolation leaves the equation untouched.
        expect(E.display).to.be.equal(before)
    })
    test('cannot isolate across a cross-term and leaves the equation intact', () => {
        const E = new Equation('xy+1=0')
        const before = E.display

        expect(() => E.isolate('x')).toThrow(MathError)
        expect(E.display).to.be.equal(before)
    })
})

describe('Equation canIsolate', () => {
    test('accepts first-degree, cross-term-free equations', () => {
        expect(new Equation('2x+4=0').canIsolate()).toBe(true)
        expect(new Equation('2x+3y=6').canIsolate('y')).toBe(true)
    })
    test('rejects higher degree and cross-term equations', () => {
        expect(new Equation('x^2+1=0').canIsolate()).toBe(false)
        expect(new Equation('xy+1=0').canIsolate('x')).toBe(false)
    })
    test('is a pure query and does not mutate the equation', () => {
        const E = new Equation('2x+3y=6')
        const before = E.display

        E.canIsolate('y')
        expect(E.display).to.be.equal(before)
    })
})

describe('Equation hasCrossTerm', () => {
    test('a single-variable equation has no cross-term', () => {
        expect(new Equation('3x+5=0').hasCrossTerm()).toBe(false)
    })
    test('a linear equation in distinct variables has no cross-term', () => {
        expect(new Equation('2x+3y=6').hasCrossTerm()).toBe(false)
    })
    test('a cross-term is detected', () => {
        expect(new Equation('xy+1=0').hasCrossTerm()).toBe(true)
    })
})

describe('Equation static functions', () => {
    test('isEquationString detects the presence of a sign', () => {
        expect(Equation.isEquationString('3x+5=0')).toBe(true)
        expect(Equation.isEquationString('3x<5')).toBe(true)
        expect(Equation.isEquationString('3x+5')).toBe(false)
    })
    test('makeSolutionsUnique removes duplicates and sorts', () => {
        const E = new Equation('x^2-3x=-2')
        const solutions = E.solve()

        const unique = Equation.makeSolutionsUnique(solutions.concat(solutions), true)
        expect(unique).to.be.length(2)
        expect(unique.map(s => s.display)).to.deep.equal(['1', '2'])
    })
})

describe('Equation evaluation', () => {
    test('evaluate the equality as a predicate', () => {
        const E = new Equation('2x=x+3')

        expect(E.evaluate({ x: 3 }, true)).toBe(true)
        expect(E.evaluate({ x: 2 }, true)).toBe(false)
        expect(E.evaluate({ x: new Fraction(3) }, false)).toBe(true)
        // asNumeric defaults to false (exact), like Polynom/Monom.
        expect(E.evaluate({ x: new Fraction(3) })).toBe(true)
        expect(E.evaluate({ x: new Fraction(2) })).toBe(false)
    })
    test('evaluate honours the inequality sign', () => {
        const E = new Equation('2x<10')   // holds iff x < 5

        expect(E.evaluate({ x: 3 }, true)).toBe(true)
        expect(E.evaluate({ x: 5 }, true)).toBe(false)
        expect(E.evaluate({ x: new Fraction(4) }, false)).toBe(true)
        expect(E.evaluate({ x: new Fraction(5) }, false)).toBe(false)

        const G = new Equation('2x>=10')  // holds iff x >= 5
        expect(G.evaluate({ x: new Fraction(5) }, false)).toBe(true)
        expect(G.evaluate({ x: new Fraction(4) }, false)).toBe(false)
    })
    test('test checks the equality at a given point', () => {
        const E = new Equation('2x=x+3')

        expect(E.test({ x: new Fraction(3) })).toBe(true)
        expect(E.test({ x: new Fraction(2) })).toBe(false)
    })
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

        expect(P.isEqual(P)).toBe(true)
        expect(P.isEquivalentTo(Q)).toBe(true)
        expect(P.isEquivalentTo(R)).toBe(true)
    })
})

describe('Equation inequalities with negative factors', () => {
    test('isolate divides by a negative coefficient and reverses the sign', () => {
        const E = new Equation('-2x<6').isolate('x')
        expect(E.display).toBe('x>-3')
    })

    test('isolate keeps the sign for a positive coefficient and for an equality', () => {
        expect(new Equation('2x<6').isolate('x').display).toBe('x<3')
        expect(new Equation('-2x=6').isolate('x').display).toBe('x=-3')
    })

    test('isolate moves the constants and reverses the sign', () => {
        expect(new Equation('5-x<2').isolate('x').display).toBe('x>3')
    })

    test('opposite reverses the direction of an inequality only', () => {
        const E = new Equation('x<3')
        E.opposite()
        expect(E.left.display).toBe('-x')
        expect(E.right.display).toBe('-3')
        expect(E.display).toContain('>')
        expect(new Equation('x=3').opposite().display).toContain('=')
    })

    test('divide by a negative value reverses the sign', () => {
        expect(new Equation('4x<8').divide(-2).display).toContain('>')
    })
})
