import { describe, expect, test } from "vitest"
import { Equation } from "../../src/algebra/equation"
import { LinearSystem } from "../../src/algebra/linearSystem.bak"

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
        const LS = LinearSystem.fromMatrix([
            [4, 5, 11],
            [3, -7, 24]
        ])
        expect(LS).toBeDefined()
        expect(LS.equations).toHaveLength(2)
        expect(LS.variables).toHaveLength(2)
        expect(LS.equations[0].display).to.be.equal('4x+5y+11=0')
        expect(LS.equations[1].display).to.be.equal('3x-7y+24=0')
    })

    test.todo('parse string')
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

        LS.equations[0] = new Equation('2x+3y=5')
        expect(LS2.equations[0].display).to.be.equal('4x+5y=11')

    })
    test.todo('set to zero Linear System')
    test.todo('set to one Linear System')
})
describe.todo('Linear System output', () => {
    test.todo('output as LaTeX')
    test.todo('output as ASCII')
})
describe('Linear System operations', () => {
    test.todo('reduce Linear System')
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
    test.todo('multiply two Linear Systems')
    test.todo('divide by Linear System')
    test.todo('raise Linear System by integer')
})
describe.todo('Linear System comparisons', () => {
    test.todo('same Linear System')
    test.todo('equal Linear System')
    test.todo('is one Linear System')
    test.todo('is zero Linear System')
})
describe.todo('Linear System static functions')
describe.todo('Linear System evaluation', () => {
    test.todo('evaluate Linear System')
})

describe('Linear System algebra', () => {
    test('has variable', () => {
        const LS = new LinearSystem(
            '4x+5y=11',
            '7y-24=3x'
        )
        expect(LS.hasVariable('x')).to.be.true
        expect(LS.hasVariable('y')).to.be.true
        expect(LS.hasVariable('z')).to.be.false
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
        expect(matrix.map(x => x.map(y => y.value)))
            .to.be.deep.equal([
                [4, 5],
                [-3, 7]
            ])

        expect(vector.map(x => x.value)).to.be.deep.equal([11, 24])
    })

    test('solve 2x2 Linear System', () => {
        const LS = new LinearSystem(
            '2x+5y=11',
            '7y-29=4x'
        )
        expect(LS.solveMatrix().map(x => x.value)).to.be.deep.equal([-2, 3])
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
        expect(LS.solveMatrix().map(x => x.value)).to.be.deep.equal([1, 0, 5])
    })

    test('unsolvable 2x2 Linear System', () => {
        const LS_infinite = new LinearSystem(
            '2x+5y=11',
            '4x+10y=22'
        )

        const LS_unsolvable = new LinearSystem(
            '2x+5y=11',
            '4x+10y=23'
        )

        expect(LS_infinite.solveMatrix()).to.have.length(1)
        expect(LS_infinite.solveMatrix()[0].value).to.be.equal(Infinity)
        expect(LS_unsolvable.solveMatrix()).to.have.length(0)
    })

})

describe.todo('Linear System generators')
