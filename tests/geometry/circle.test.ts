import {describe} from "mocha";
import {expect} from "chai";
import {Circle} from "../../src/maths/geometry/circle";
import {Line} from "../../src/maths/geometry/line";
import {Point} from "../../src/maths/geometry/point";
import {Fraction} from "../../src/maths/coefficients/fraction";

describe('Circle', function () {
    it('should calculate the intersection of a circle and a line', function () {
        let C = new Circle(
                new Point(8, 6),
                20,
                true
            ),
            LT = new Line('2x+y-32=0'),
            LS = new Line('3x-y-8=0'),
            IPT = C.lineIntersection(LT),
            IPS = C.lineIntersection(LS)

        expect(IPT).to.be.length(1)
        expect(IPT[0].x.value).to.be.equal(12)
        expect(IPT[0].y.value).to.be.equal(8)

        expect(IPS).to.be.length(2)
        expect(IPS[0].x.value).to.be.equal(4)
        expect(IPS[0].y.value).to.be.equal(4)
        expect(IPS[1].x.value).to.be.equal(6)
        expect(IPS[1].y.value).to.be.equal(10)
    });

    it('should calculate tangents', function () {

        // Through one point on the circle
        const C = new Circle(
            new Point(-2, 3),
            25,
            true
        ), P = new Point(-5, 7);

        expect(C.tangents(P).map(x => x.tex.canonical)).to.have.all.members(['3x-4y+43=0'])

        // With a slope
        const D = new Circle('x^2+y^2+10x=2y-6'),
            slope = new Fraction(-2, 1)

        expect(D.tangents(slope).map(x => x.tex.canonical)).to.have.all.members(['2x+y-1=0', '2x+y+19=0'])

        const E = new Circle('(x-2)^2+(y-1)^2=5'),
            P2 = new Point(6, -2)

        expect(E.tangents(P2).map(x => x.tex.canonical)).to.have.all.members(['2x+y-10=0', '2x+11y+10=0'])

        let P3 = new Point(2, 2)
        expect(E.tangents(P3)).to.be.empty
    })

    it('should get a list of point on the circle', function () {
        const C = new Circle('(x-3)^2+(y+4)^2=16'),
            pts = C.getPointsOnCircle()

        expect(pts.map(x => x.x.display + ',' + x.y.display)).to.have.all.members(['3,0', '3,-8', '7,-4', '-1,-4'])
    });

    it('should calculate the circle from center and radius', function () {
        let circle = new Circle("x^2+6x+y^2-8y+12=0")

        console.log(circle.tex)
    })

    it('should parse a line', function () {
        let a1 = 133.33333333333331,
            b1 = 700,
            a2 = 134.33333333333331,
            b2 = 700.75

        let A = new Point(a1, a2),
            B = new Point(b1, b2)

        console.log(A.tex, B.tex)

        let L = new Line(A, B)
        console.log(L.tex.canonical)
    });

//     it('temp tests', () => {
//         for (let i = 0; i < 30; i++) {
//             let A = Random.Geometry.point({axis: false}),
//                 B = Random.Geometry.point({axis: false})
//
//             if (Random.bool()) {
//                 B.x = new Fraction().zero()
//             } else {
//                 B.y = new Fraction().zero()
//             }
//
//             const c1 = new Circle(A, Random.number(1, 10)),
//                 c2 = new Circle(B, Random.number(1, 10))
//
//             console.log(`(exercice ${i + 1}): déterminer la forme \\textbf{centre-rayon} des équations cartésiennes suivantes. En déduire le centre et le rayon du cercle.
//     \\begin{enumerate}[label=\\Alph*]
//     \\item \\( (\\Gamma_1): ${c1.developed}\\) \\iftoggle{master}{\\(${c1.tex}\\)}{}
//     \\item \\( (\\Gamma_2): ${c2.developed}\\) \\iftoggle{master}{\\(${c2.tex}\\)}{}
//     \\end{enumerate}
//     \\vfill
//     ${i % 2 === 1 ? '\\newpage' : ''}
//     `)
//         }
//     })
//
//     it('temp tests 2', () => {
//         const q = `(I): Soit \\(\\Gamma_1\\) et \\(\\Gamma_2\\) deux cercles. Déterminer leur position relative à l'aide des informations ci-dessous.
//
// \\[(\\Gamma_1): @G1 \\qquad (\\Gamma_2): @G2 \\]
// \\[\\trou{@R1} \\]
//
// \\vspace{3cm}
// (II): Soit \\((\\Gamma_3):  @G3\\) un cercle. Déterminer l'équation cartésienne, sous sa forme centre-sommet, des cercles \\(\\Gamma_4\\) de rayon \\(@RAYON\\) qui sont tangents à \\(\\Gamma_3\\) en sachant que les deux centres ont la même @AXE.\\\\
// Préciser la position relative entre \\(\\Gamma_3\\) et \\(\\Gamma_4\\)
// \\[ \\trou{@R2a} \\]
// \\[ \\trou{@R2b} \\]
// `
//
//         for (let i = 0; i < 30; i++) {
//             let A = Random.Geometry.point({axis: false}),
//                 triplet = Random.item(Numeric.pythagoricianTripletsWithTarget(
//                     Random.item([5, 13, 17, 25, 29, 37, 41])
//                 ).filter(tr => {
//                     // remove all items with zero values.
//                     return tr.every(x => x !== 0)
//                 })),
//                 B = new Point(
//                     A.x.value + triplet[0],
//                     A.y.value + triplet[1]
//                 ),
//                 delta = Random.number(2, triplet[2] - 1),
//                 positionRelative = ['extérieure', 'intérieure', 'sécante', 'disjointe'][i % 4],
//                 // positionRelative = Random.item(['extérieure', 'intérieure', 'sécante', 'disjointe']),
//                 c1: Circle, c2: Circle
//
//             if (positionRelative === 'extérieure') {
//                 c1 = new Circle(A, triplet[2] - delta)
//                 c2 = new Circle(B, delta)
//             } else if (positionRelative === 'intérieure') {
//                 c1 = new Circle(A, triplet[2] + delta)
//                 c2 = new Circle(B, delta)
//             } else if (positionRelative === 'sécante') {
//                 c1 = new Circle(A, triplet[2] + delta - Random.number(1, delta - 1))
//                 c2 = new Circle(B, delta)
//             } else if (positionRelative === 'disjointe') {
//                 c1 = new Circle(A, triplet[2] + delta + 1)
//                 c2 = new Circle(B, delta)
//             }
//
//             const R1 = `\\delta(O_1;O_2)=${A.distanceTo(B).value}\\qquad r_1=${c1.radius.value} \\qquad ${c2.radius.value} \\qquad \\implies \\text{${positionRelative}} `
//
//
//             let C = Random.Geometry.point({axis: false}),
//                 r1 = Random.number(2, 10),
//                 c3 = new Circle(C, r1),
//                 // Get a random number from 2 to 10 that is not equal to r1
//                 r2 = Random.number(2, 10, [r1]),
//                 axis = Random.item(['abscisse', 'ordonnée']),
//                 centers: Point[] = []
//
//             const c3x = c3.center.x.value,
//                 c3y = c3.center.y.value
//             if (axis === 'abscisse') {
//
//                 centers = [
//                     new Point(c3x, c3y - (r1 + r2)),
//                     new Point(c3x, c3y - (r2 - r1)),
//                     new Point(c3x, c3y - (r1 - r2)),
//                     new Point(c3x, c3y + (r1 + r2))
//                 ]
//             } else {
//                 centers = [
//                     new Point(c3x - (r1 + r2), c3y),
//                     new Point(c3x - (r2 - r1), c3y),
//                     new Point(c3x - (r1 - r2), c3y),
//                     new Point(c3x + (r1 + r2), c3y)
//                 ]
//             }
//
//             console.log(`(exercice ${i + 1}): ` + q
//                     .replaceAll('@G1', c1.tex)
//                     .replaceAll('@R1', R1)
//                     .replaceAll('@G2', c2.tex)
//                     .replaceAll('@G3', c3.developed)
//                     .replaceAll('@RAYON', r2.toString())
//                     .replaceAll('@AXE', axis)
//                     .replaceAll('@R2a', centers.slice(0, 2).map(x => new Circle(x, r2).tex).join(' \\qquad '))
//                     .replaceAll('@R2b', centers.slice(2, 4).map(x => new Circle(x, r2).tex).join(' \\qquad '))
//                 + '\\vfill' + (i % 2 === 1 ? '\\newpage' : '')
//             )
//         }
//     })
});