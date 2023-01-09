import {describe} from "mocha";
import {expect} from "chai";
import {Equation} from "../../src/maths/algebra/equation";
import {PiMath} from "../../src";
import exp = require("constants");
import {LinearSystem} from "../../src/maths/algebra/linearSystem";
import {Polynom} from "../../src/maths/algebra/polynom";

describe('Linear systems tests', () => {
    it('should solve a 2x2 equations', () => {
        let LS = new LinearSystem(
            '4x+5y=11',
            '7y-24=3x'
        )
        LS.solve()
        expect(LS.solution).to.be.equal('(-1;3)')
    })
    it('should solve a 3x3 equations', () => {
        let LS = new LinearSystem(
            '2x+7y-z=-3',
            '-3x+2y+3z=12',
            '-5x-3y+2z=5'
        )

        LS.solve()
        console.log(LS.solution)
    })

    it('should solve a 3x3 equations II ', () => {
        let LS = new LinearSystem(
            '-x+y-z=-6',
            '3x+2y+z=14',
            '5x+y+3z=7'
        )

        LS.solve()
        console.log(LS.solution)
    })

    it('should calculate the reduction', function () {
        let E1 = new Polynom('6x+21y-3z'),
            E2 = new Polynom('-6x+21y-3z')

        // Start from hre
        console.log('------------')
        console.log(E1.tex, E2.tex)

        console.log(E1.monoms.map(x=>x.tex))
        console.log(E2.monoms.map(x=>x.tex))
        E1.add(E2);

        console.log(E1.tex)
    });
})
