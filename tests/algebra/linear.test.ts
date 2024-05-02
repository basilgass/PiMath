import {describe, expect, it} from "vitest";
import {LinearSystem} from "../../lib/maths/algebra/linearSystem";
import {Polynom} from "../../lib/maths/algebra/polynom";


describe('Linear systems tests', () => {
    it('should solve a 2x2 equations', () => {
        let LS = new LinearSystem(
            '4x+5y=11',
            '7y-24=3x'
        )
        LS.solve(true)

        expect(LS.solution).to.be.equal('\\left(-1;3\\right)')
    })
    it('should solve a 3x3 equations', () => {
        let LS = new LinearSystem(
            '2x+7y-z=-3',
            '-3x+2y+3z=12',
            '-5x-3y+2z=5'
        )

        LS.solve()
        expect(LS.solutionAsDisplay).to.be.equal("(1;0;5)")
    })

    it('should solve a 3x3 equations II ', () => {
        let LS = new LinearSystem(
            '-x+y-z=-6',
            '3x+2y+z=14',
            '5x+y+3z=7'
        )

        LS.solve()
    })

    it('should calculate the reduction', function () {
        let E1 = new Polynom('6x+21y-3z'),
            E2 = new Polynom('-6x+21y-3z')

        E1.add(E2);
        expect(E1.reduce().display).to.be.equal('42y-6z')
    });

    it('should use a reduced linear reducation', function () {
        let LS = new LinearSystem(
            '3x-6y+3=0',
            'x+12y-6=0'
        )
        LS.solve(true)

        const tex = LS.stepTex('x')

        expect(+LS.resolutionSteps['x'][0].operations[0][0]).to.be.equal(2)
        expect(+LS.resolutionSteps['x'][0].operations[1][0]).to.be.equal(1)
    });
})
