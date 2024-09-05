import { describe, expect, it } from "vitest"
import { Plane3 } from "../../src/geometry/plane3"
import { Line3 } from "../../src/geometry/line3"
import { Point } from "../../src/geometry/point"
import { Vector } from "../../src/geometry/vector"
import { Matrix } from "../../src/geometry/matrix"

describe('Geometry Plane', function () {
    it('should create a plane from 3 points', function () {
        const P1 = new Point(1, 0, 0),
            P2 = new Point(0, 1, 0),
            P3 = new Point(0, 0, 1),
            plane = new Plane3({ points: [P1, P2, P3] })

        expect(plane).toBeDefined()
        expect(plane.normal.display).to.be.equal('((1,1,1))')
    })

    it('should create a plane from a point and a normal', function () {
        const P = new Point(1, 2, 3),
            N = new Vector(4, 5, 6),
            plane = new Plane3({ point: P, normal: N })

        expect(plane).toBeDefined()
        expect(plane.normal.display).to.be.equal('((4,5,6))')
        expect(plane.point.display).to.be.equal('(1;2;3)')
    })

    it('should output nice Tex', function () {
        const P = new Point(1, 2, 3),
            N = new Point(4, 5, 6),
            plane = new Plane3({ point: P, normal: N })

        expect(plane.tex).to.be.equal('4x+5y+6z-32=0')
    })

    it.skip('should get the intersection point with a plane', function () {
        const A = new Point(3, 1, 4)
        const L = new Line3(
            A,
            new Point(-5, -2, 1)
        )
        const K = L.randomPoint()
        L.OA = K

        console.log(L.point.display, L.d.display)

        console.log(L.tex.parametric)
        const p = new Plane3({
            points: [
                A.clone(),
                new Point(4, -4, 0),
                new Point(2, 2, 2)
            ]
        })
        console.log(p.tex)

        const intersection = p.intersectWithLine(L)
        console.log(intersection.display)

        expect(intersection.dimension).to.be.equal(3)
    })
    it.skip('should create a plane from 3 points (custom)', function () {
        const P1 = new Point(4, 6, 0),
            P2 = new Point(8, 0, 10),
            P3 = new Point(14, 8, 0),
            P4 = new Point(0, 14, 12),
            plane1 = new Plane3({ points: [P1, P2, P3] }),
            plane2 = new Plane3({ points: [P1, P2, P4] })
        console.log(plane1.tex)
        console.log(plane2.tex)

        console.log(plane1.normal.cross(plane2.normal).display)
        console.log(plane1.normal.cross(plane2.normal).simplify().display)
    })

    it.skip('should create a plane from one point and two vectors', function () {
        const P = new Point(1, 0, 3),
            v1 = new Vector(2, 1, -3),
            v2 = new Vector(0, 2, -1),
            plane = new Plane3({ point: P, directions: [v1, v2] })

        console.log(v1.cross(v2).display)
        expect(plane).toBeDefined()

        console.log(plane.tex)
    })

    it.skip('test', () => {
        const A = new Point(5, -1, 2)
        const B = new Point(7, 8, 8)
        const C = new Point(1, 6, 6)
        const D = new Point(3, 3, 9)

        const AB = new Vector(A, B)
        const AC = new Vector(A, C)
        const AD = new Vector(A, D)
        const BD = new Vector(B, D)
        const CD = new Vector(C, D)
        const CB = new Vector(C, B)
        const ABxAC = AB.cross(AC)
        const ABxAD = AB.cross(AD)
        const ACxAD = AC.cross(AD)
        const BDxCD = BD.cross(CD)

        const ABC = new Plane3({ points: [A, B, C] })
        const BCD = new Plane3({ points: [B, C, D] })
        const ACD = new Plane3({ points: [A, C, D] })
        const ABD = new Plane3({ points: [A, B, D] })
        const M = new Matrix(AB, AC, AD)
        const d = AB.clone().multiplyByScalar(AC.norm).add(AC.clone().multiplyByScalar(AB.norm)).simplify()
        const b = new Line3(A, d)
        const bc = new Line3(B, C)


        console.log('Vectors')
        console.log('AB: ', AB.display, 'AC: ', AC.display, 'AD: ', AD.display, 'BD:', BD.display, 'CD: ', CD.display)
        console.log('Cross')
        console.log('ABxAC=', ABxAC.display, 'ABxAD=', ABxAD.display, 'ACxAD=', ACxAD.display, 'BDxCD=', BDxCD.display)
        console.log('Volume')
        console.log(M.determinant().divide(6).display)
        console.log('Aire totale')
        console.log(
            ABxAC.norm / 2
            + ABxAD.norm / 2
            + ACxAD.norm / 2
            + BDxCD.norm / 2
        )
        console.log('Angle ABD')
        console.log(AB.angle(BD, true))
        console.log('Angle ABC et BCD')
        console.log(ABC.angle(BCD, true))
        console.log('Angle entre CB et ACD')
        console.log(ACD.angle(CB, true))
        console.log('Bissectrice interne BAC')
        console.log(AB.norm, AC.norm)
        console.log(b.display.parametric)
        console.log('Distance D à BC')
        console.log(bc.distanceTo(D).value)
        console.log(bc.distanceTo(D).tex)
        console.log('Hauteur issue de C')
        console.log(ABD.distanceTo(C))

    })

    it.skip('test2', () => {
        const A = new Point(6, -1, -1)
        const B = new Point(5, 2, 3)
        const Cp = new Point(3, 1, 4)
        const ABCp = new Plane3({
            points: [A, B, Cp]
        })
        const AB = new Vector(A, B)
        const ACp = new Vector(A, Cp)
        const C = Cp.clone().add(ABCp.normal.simplify().clone().multiplyByScalar(-2))
        const dAB = new Line3(A, B)
        const dBC = new Line3(B, C)
        const dAC = new Line3(A, C)
        const M = new Point().middleOf(A, Cp)
        const BM = new Vector(B, M)
        const D = B.clone().add(BM.clone().multiplyByScalar(3))
        const BCD = new Plane3({ points: [B, C, D] })
        const E = Cp.clone().add(AB)
        const BCE = new Plane3({ points: [B, C, E] })

        console.log('A=', A.display)
        console.log('B=', B.display)
        console.log('C=', C.display)
        console.log('Cp=', Cp.display)
        console.log('M=', M.display)
        console.log('(D)=', D.display)
        console.log('(E)=', E.display)
        console.log('AB=', AB.display)
        console.log('ACp=', ACp.display)
        console.log('ABCp= ', ABCp.tex)
        console.log('BCD= ', BCD.tex)
        console.log('BCE= ', BCE.tex)
        console.log('dAB=', dAB.display.parametric)
        console.log('d=dAC=', dAC.display.cartesian)
        console.log('dBC=', dBC.display.parametric)
        console.log('-----------')
        console.log('\\item \\(\\pi_1: ' + BCD.tex + '\\)')
        console.log('\\item \\(\\pi_2: ' + ABCp.tex + '\\)')
        console.log('\\item \\(\\pi_3: ' + BCE.tex + '\\)')
        console.log('\\item \\(' + `A= ${A.tex} ` + '\\)')
        console.log(`\\item \\(\\displaystyle d: ${dAC.tex.cartesian} \\)`)
    })
})