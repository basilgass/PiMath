import {describe} from "mocha";
import {expect} from "chai";
import {Equation} from "../../src/maths/algebra/equation";


describe('Equations tests', () => {
    it('should get the solutions', () => {

        let E1 = new Equation('3x+8', '0')
        E1.solve()
        expect(E1.solutions[0].tex).to.be.equal('-\\frac{ 8 }{ 3 }')

        let E2 = new Equation('x^2+5x+6', '0')
        E2.solve()
        expect(E2.solutions.map(x=>x.tex)).to.have.all.members(['-3', '-2'])

        let E3 = new Equation('(x-3)(x+2)(3x-5)', '0')
        E3.solve()
        expect(E3.solutions.map(x=>x.tex)).to.have.all.members([ '-2', '3', '\\frac{ 5 }{ 3 }' ])

        let E4 = new Equation('x^2+x+10', '0')
        E4.solve()
        expect(E4.solutions.map(x=>x.tex)).to.have.all.members([ '\\varnothing' ])

        let E5 = new Equation('(x-3)(x+2)(x-5)(x-7)(x+2)', 0)
        E5.solve()
        expect(E5.solutions.map(x=>x.tex)).to.have.all.members([ '-2', '3', '5', '7' ] )


        let E6 = new Equation('5x^2+7x-31', 0)
        E6.solve()
        expect(E6.solutions.map(x=>x.tex)).to.have.all.members([
            '\\frac{ -7 - \\sqrt{ 669 } }{ 10 }',
            '\\frac{ -7 + \\sqrt{ 669 } }{ 10 }'
        ] )
    })

    it('should resolve an equation of second degree', ()=>{
        let P = new Equation('-10x^2-8x+8=0')
        P.solve()
        // Delta = 64 + 320 = 384 = 6*64
        // x1 = (-8 - 8*sqrt(6))/(-20) = (-2 - 2*sqrt(6))/5
        expect([P.solutions[0].tex, P.solutions[1].tex]).to.have.all.members(['\\frac{ -2 - 2 \\sqrt{ 6 } }{ 5 }', '\\frac{ -2 + 2 \\sqrt{ 6 } }{ 5 }'])
    })

    it('should solve this equation please', function () {
        let P = new Equation("2/7(3x+5)=9-(3-x)/7")
        P.solve()

        const sols = P.solutions.map(x => x.display)
        expect(sols).to.be.length(1)
        expect(sols[0]).to.be.equal('10')
    });

    it('should detect if two equations are equal or linear', function () {
        let P = new Equation('3x+2y=5'),
            Q = new Equation('5-3x=2y'),
            R = new Equation('6x+4y-10=0')

        expect(P.isSameAs(P)).to.be.true
        expect(P.isSameAs(Q)).to.be.true
        expect(P.isSameAs(R)).to.be.false
        expect(P.isLinearTo(Q)).to.be.true
        expect(P.isLinearTo(R)).to.be.true
    })
})
