import {describe, expect, test} from "vitest"
import {LinearSystem} from "../../src"


describe('Linear System creation', () => {
    test('create Linear System', () => {
        const LS = new LinearSystem(
            '4x+5y=11',
            '7y-24=3x'
        )
        expect(LS).toBeDefined()
        expect(LS.equations).toHaveLength(2)
        expect(LS.variables).toHaveLength(2)
        expect(LS.equations[0].display).to.be.equal('4x+5y=11')
    })
    test('create Linear System from matrix', () => {
        const LS = new LinearSystem().fromComponents([
            [4, 5, 11],
            [3, -7, 24]
        ])
        expect(LS).toBeDefined()
        expect(LS.equations).toHaveLength(2)
        expect(LS.variables).toHaveLength(2)
        expect(LS.equations[0].display).to.be.equal('4x+5y=11')
        expect(LS.equations[1].display).to.be.equal('3x-7y=24')
    })

    test('clone Linear System', () => {
        const LS = new LinearSystem(
            '4x+5y=11',
            '7y-24=3x'
        )
        const LS2 = LS.clone()
        expect(LS2).toBeDefined()
        expect(LS2.equations).toHaveLength(2)
        expect(LS2.variables).toHaveLength(2)
        expect(LS2.equations[0].display).to.be.equal('4x+5y=11')

        LS.add(new LinearSystem('2x+3y=5', '7y-24=3x'))
        expect(LS2.equations[0].display).to.be.equal('4x+5y=11')

    })
})
describe('Linear System output', () => {
    test('tex wraps system in \\left\\{...\\right.', () => {
        const LS = new LinearSystem('2x+3y=5', '4x-5y=7')
        expect(LS.tex).toContain('\\left\\{')
        expect(LS.tex).toContain('\\right.')
        expect(LS.tex).toContain('\\begin{array}')
        expect(LS.tex).toContain('&=&')
    })

    test('buildTex with operators adds \\cdot annotations', () => {
        const LS = new LinearSystem('2x+3y=5', '4x-5y=7')
        const result = LS.buildTex(LS.equations, [['2'], ['-3']])
        expect(result).toContain('\\cdot')
        expect(result).toContain('\\left(-3\\right)')
    })

    test('display renders AsciiMath matrix format', () => {
        const LS = new LinearSystem('2x+3y=5', '4x-5y=7')
        expect(LS.display).toBe('{(2x,+3y,=,5),(4x,-5y,=,7):}')
    })
})
describe('Linear System operations', () => {
    test('multiply all equations by an array of factors', () => {
        const LS = new LinearSystem('2x+3y=5', '4x+5y=7')
        LS.multiply([2, 3])
        expect(LS.equations[0].display).toBe('4x+6y=10')
        expect(LS.equations[1].display).toBe('12x+15y=21')
    })

    test('multiply one equation by index', () => {
        const LS = new LinearSystem('2x+3y=5', '4x+5y=7')
        LS.multiply(3, 1)
        expect(LS.equations[0].display).toBe('2x+3y=5')
        expect(LS.equations[1].display).toBe('12x+15y=21')
    })

    test('multiply with array length mismatch throws', () => {
        const LS = new LinearSystem('2x+3y=5', '4x+5y=7')
        expect(() => LS.multiply([2])).toThrow()
    })

    test('multiply with index out of range throws', () => {
        const LS = new LinearSystem('2x+3y=5', '4x+5y=7')
        expect(() => LS.multiply(2, 5)).toThrow()
        expect(() => LS.multiply(2)).toThrow()
    })

    test('add two Linear Systems', () => {
        const LS = new LinearSystem(
            '4x+5y=11',
            '7y-24=3x'
        )
        const LS2 = new LinearSystem(
            '2x+3y=5',
            '7y-24=3x'
        )
        const LS3 = LS.add(LS2)
        expect(LS3.equations[0].display).to.be.equal('6x+8y=16')
    })
    test('subtract two Linear Systems', () => {
        const LS = new LinearSystem(
            '4x+5y=11',
            '7y-24=3x'
        )
        const LS2 = new LinearSystem(
            '2x+3y=5',
            '7y-24=3x'
        )
        const LS3 = LS.subtract(LS2)
        expect(LS3.equations[0].display).to.be.equal('2x+2y=6')

    })
})

// describe.todo('Linear System comparisons', () => {
//     test.todo('same Linear System')
//     test.todo('equal Linear System')
//     test.todo('is one Linear System')
//     test.todo('is zero Linear System')
// })
// describe.todo('Linear System static functions')
// describe.todo('Linear System evaluation', () => {
//     test.todo('evaluate Linear System')
// })


describe('Linear System algebra', () => {
    test('has variable', () => {
        const LS = new LinearSystem(
            '4x+5y=11',
            '7y-24=3x'
        )

        expect(LS.hasVariable('x')).toBe(true)
        expect(LS.hasVariable('y')).toBe(true)
        expect(LS.hasVariable('z')).toBe(false)
    })

    test('degree of Linear System', () => {
        const LS = new LinearSystem(
            '4x+5y=11',
            '7y-24=3x'
        )
        expect(LS.degree().value).to.be.equal(1)
    })

    test('matrix of Linear System', () => {
        const LS = new LinearSystem(
            '4x+5y=11',
            '7y-24=3x'
        )
        const [matrix, vector] = LS.matrix
        expect(matrix.rows.map(row => row.map(p => p.value)))
            .to.be.deep.equal([
            [4, 5],
            [-3, 7]
        ])

        expect(vector.array.map(f => f.value)).to.be.deep.equal([11, 24])
    })

    test('solve 2x2 Linear System', () => {
        const LS = new LinearSystem(
            '2x+5y=11',
            '7y-29=4x'
        )
        expect(LS.solve().map(x => x.value)).to.be.deep.equal([-2, 3])
        /**
         * 2x+5y=11     *2
         * 4x-7y=-29    *-1
         *
         * 4x+10y=22
         * -4x+7y=29
         *
         * 17y=51
         * y=3
         */
    })

    test('solve 3x3 Linear System', () => {
        const LS = new LinearSystem(
            '2x+7y-z=-3',
            '-3x+2y+3z=12',
            '-5x-3y+2z=5'
        )
        expect(LS.solve().map(x => x.value)).to.be.deep.equal([1, 0, 5])
    })

    test('unsolvable (inifinte) 2x2 Linear System', () => {
        const LS_infinite = new LinearSystem(
            '2x+5y=11',
            '4x+10y=22'
        )
        const sols_infinite = LS_infinite.solve()
        
        expect(sols_infinite).to.have.length(2)
        expect(sols_infinite[0].value).to.be.equal(Infinity)
    })
    test('unsolvable 2x2 (impossible) Linear System', () => {
        const LS_unsolvable = new LinearSystem(
            '2x+5y=11',
            '4x+10y=23'
        )
        const sols_unsolvable = LS_unsolvable.solve()
        expect(sols_unsolvable).to.have.length(0)
    })

    test('starting equation with zero', () => {
        const LS = new LinearSystem(
            'b+c=0',
            'a+b-4c=0',
            '3a-6b+4c=3'
        )

        expect(LS.solve().map(x => x.display))
            .to.be.deep.equal(['3/5', '-3/25', '3/25'])
    })

    test('linear asSystem solve output', ()=>{
        const LS = new LinearSystem(
            '3x+2y-5z=3',
            '5x-3y+z=-2',
            '9x+2y+5z=9'
        )

        LS.solve()
    })

    test('solve with equations trivial', ()=>{
        // block 807: ne sait pas résoudre si x+3=0 et 2x+5y-34=0
        const LS = new LinearSystem('x+3=0', '2x+5y-34=0')

        const M = LS.solve()

        expect(M[0].value).toBe(-3)
        expect(M[0].variable).toBe('x')
        expect(M[1].value).toBe(8)
        expect(M[1].variable).toBe('y')

        expect(LinearSystem.solutionAsDisplay(M)).toBe('(-3;8)')
    })

})

describe('solve_compute_factors', () => {
    test('2x2 system — factors eliminate the variable', () => {
        const LS = new LinearSystem('2x+3y=5', '4x+5y=7')
        const [[eq0, eq1]] = LS.solve_compute_factors('x')
        expect(eq0.id).toBe(0)
        expect(eq1.id).toBe(1)
        expect(eq0.factor * 2 + eq1.factor * 4).toBe(0)
    })

    test('3x3 system — sorted by smallest absolute sum', () => {
        const LS = new LinearSystem('2x+3y=5', '4x+5y=7', '6x+7y=9')
        const factors = LS.solve_compute_factors('x')
        expect(factors).toHaveLength(3)
        const sums = factors.map(([a, b]) => Math.abs(a.factor) + Math.abs(b.factor))
        for (let i = 0; i < sums.length - 1; i++) {
            expect(sums[i]).toBeLessThanOrEqual(sums[i + 1])
        }
    })

    test('factors for y variable', () => {
        const LS = new LinearSystem('2x+3y=5', '4x+5y=7')
        const [[eq0, eq1]] = LS.solve_compute_factors('y')
        expect(eq0.factor * 3 + eq1.factor * 5).toBe(0)
    })
})

describe('isSolvable', () => {
    test('independent 2x2 system is solvable', () => {
        const LS = new LinearSystem('4x+5y=11', '-3x+7y=24')
        expect(LS.isSolvable()).toBe(true)
    })

    test('proportional equations are not solvable', () => {
        const LS = new LinearSystem('2x+4y=6', 'x+2y=3')
        expect(LS.isSolvable()).toBe(false)
    })

    test('more equations than variables is not solvable', () => {
        const LS = new LinearSystem('x+2y=3', 'x-y=1', '2x+y=5')
        expect(LS.isSolvable()).toBe(false)
    })
})

describe('toAugmentedMatrix', () => {
    test('produces a matrix with partition at variable count', () => {
        const LS = new LinearSystem('2x+3y=5', '4x-5y=7')
        const aug = LS.toAugmentedMatrix()
        expect(aug.dimension).toEqual({rows: 2, cols: 3})
        expect(aug.display).toBe('((2,3|5),(4,-5|7))')
    })

    test('augmented matrix of 3x3 system has correct dimensions', () => {
        const LS = new LinearSystem('2x+7y-z=-3', '-3x+2y+3z=12', '-5x-3y+2z=5')
        const aug = LS.toAugmentedMatrix()
        expect(aug.dimension).toEqual({rows: 3, cols: 4})
    })
})
