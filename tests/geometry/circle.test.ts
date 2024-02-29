import {describe} from "mocha";
import {expect} from "chai";
import {Circle} from "../../src/maths/geometry/circle";
import {Line} from "../../src/maths/geometry/line";
import {Point} from "../../src/maths/geometry/point";
import {Fraction} from "../../src/maths/coefficients/fraction";
import {Random} from "../../src/maths/randomization/random";
import {Vector} from "../../src/maths/geometry/vector";

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

        // console.log(circle.tex)
    })

    it('tangentes pt ext', () => {
        function makeCircle(): { circle: Circle, point: Point, tangents: Line[] } {
            let A = Random.Geometry.point({axis: false}),
                rv = Random.number(1, 3),
                r = rv ** 2 + (rv + 1) ** 2
            let c = new Circle(A, r, true)
            let pts = c.getPointsOnCircle(true)

            pts = Random.shuffle(pts)
            let pt1: Point, pt2: Point, t1: Line, t2: Line, I: Point, n: Vector

            pt1 = pts.shift()
            for (let pt of pts) {
                // Pas vertical / horizontal
                n = new Vector(A, pt)

                if (!n.x.isZero() && !n.y.isZero() &&   // pas vertical / horizontal
                    !pt1.x.isEqual(pt.x) && !pt1.y.isEqual(pt.y) &&  // pas le même point
                    !A.isEqual(new Point().middleOf(pt1, pt)) // pas l'un en face de l'autre
                ) {
                    pt2 = pt.clone()

                    t1 = c.tangents(pt1)[0]
                    t2 = c.tangents(pt2)[0]
                    const intersection = t1.intersection(t2)

                    if (intersection.hasIntersection && intersection.point.x.isRelative()) {
                        I = intersection.point
                        break
                    }
                }
            }


            return {
                circle: c,
                tangents: [t1, t2],
                point: I
            }
        }

        for (let i = 0; i < 30; i++) {
            let {circle, tangents, point} = makeCircle()
            console.log(`\\textbf{(exercice ${i + 1})}
        
        Calculer l'équation cartésiennes des tangentes au cercle \\( (\\Gamma): ${circle.tex} \\) passant par le point \\(P=${point.tex} \\)
            \\iftoggle{master}{
            (I) \\( ${tangents[0].tex.canonical} \\quad ${tangents[1].tex.canonical} \\)
            }{}
            \\vfill
            ${i % 2 === 1 ? '\\newpage' : ''}
            `)

        }
        /**
         const C = new PiMath.Geometry.Circle(circle.value),
         pts = C.getPointsOnCircle()

         code.value = `C(${C.center.x.value},${C.center.y.value})
         c=circ C,${C.radius.value}`

         let tangents = []
         pts.forEach((pt, index) => {
         let tg = C.tangents(pt)[0]
         tangents.push(tg)
         code.value += `\nT${index + 1}(${pt.x.value},${pt.y.value})->tex:T_${index + 1}=@`
         code.value += `\nt${index + 1}=line ${tg.tex.canonical}`

         tangentPerPoints.value.push(`T_${index+1}(${pt.x.tex};${pt.y.tex})\\implies ${tg.tex.canonical}`)
         })

         for (let i = 0; i < tangents.length; i++) {
         for (let j = i + 1; j < tangents.length; j++) {
         let intersection = tangents[i].intersection(tangents[j])

         if (intersection.hasIntersection) {
         if (!intersection.point.isInListOfPoints(pts)) {
         intersection.point.name=`I_{${i + 1}-${j + 1}}`
         intersectionPoints.value.push({
         point: `I_{${i+1}-${j+1}}${intersection.point.tex}`,
         tangent1: tangents[i].tex.canonical,
         tangent2: tangents[j].tex.canonical
         })
         code.value += `\nI_${i + 1}_${j + 1}(${intersection.point.x.value},${intersection.point.y.value})->tex:I_{${i+1}-${i+2}}=@`
         }
         }
         }
         }
         */
    })
    it('tangentes temp tests', () => {
        function makeCircle(): { circle: Circle, point: Point, tangent: Line, symetric: Line } {
            let A = Random.Geometry.point({axis: false}),
                rv = Random.number(1, 3),
                r = rv ** 2 + (rv + 1) ** 2
            let c = new Circle(A, r, true)
            let pts = c.getPointsOnCircle(true)

            pts = Random.shuffle(pts)
            let pt: Point, n: Vector
            for (let p of pts) {
                n = new Vector(A, p)
                if (!n.x.isZero() && !n.y.isZero()) {
                    pt = p
                    break
                }
            }

            const p2 = new Point(A.x.clone(), A.y.clone()).translate({x: n.x.opposed(), y: n.y.opposed()})
            const t = new Line(n, pt)
            const s = new Line(n, p2)
            return {
                circle: c,
                point: pt,
                tangent: t,
                symetric: s
            }
        }

        for (let i = 0; i < 30; i++) {

            const data1 = makeCircle()
            const item1 = `Calculer l'équation de la tangente au cercle d'équation \\( (\\Gamma_1): ${data1.circle.tex} \\) un cercle passant par le point \\( T=${data1.point.tex} \\).`

            const data2 = makeCircle()
            const item2 = `Calculer l'équation des tangentes au cercle d'équation \\( (\\Gamma_2): ${data2.circle.cartesian.tex} \\) de pente \\( \\displaystyle ${data2.tangent.slope.tex} \\).`

            console.log(`\\textbf{(exercice ${i + 1})}
        
        \\begin{enumerate}[(I),itemsep=10em] 
        \\item ${item1}
        \\item ${item2}
            \\end{enumerate}
            \\iftoggle{master}{
            (I) \\( ${data1.tangent.tex.canonical} \\)
            
            (II) \\( (\\Gamma_2): ${data2.circle.tex} \\) \\\\ \\( (t_1): ${data2.tangent.tex.canonical} \\) et \\( (t_2): ${data2.symetric.tex.canonical} \\)
            
            }{}
            \\vfill
            ${i % 2 === 1 ? '\\newpage' : ''}
            `)

        }
    })
//     it('intersection temp tests', () => {
//         for (let i = 0; i < 30; i++) {
//             let A = Random.Geometry.point({axis: false}),
//                 rv = Random.number(1, 3),
//                 r = rv ** 2 + (rv + 1) ** 2
//
//             let c = new Circle(A, r, true)
//             let pts = c.getPointsOnCircle(true)
//             // console.log(r, pts.length)
//
//             // console.log(c.tex)
//             // console.log(pts.map(pt => pt.display))
//             pts = Random.shuffle(pts)
//             let ptt = pts.shift(),
//                 pt1 = pts.shift(),
//                 pt2
//
//             for (let pt of pts) {
//                 if (!pt1.x.isEqual(pt.x) && !pt1.y.isEqual(pt.y) && !A.isEqual(new Point().middleOf(pt1, pt))) {
//                     pt2 = pt.clone()
//                     break
//                 }
//             }
//
//             // console.log('Pt de tangence')
//             // console.log(ptt.display)
//             let t = c.tangents(ptt)[0]
//             // console.log(t.tex.canonical)
//
//             // console.log('intersection en deux points')
//             // console.log(pt1.display, pt2.display)
//             let d = new Line(pt1, pt2)
//             // console.log(d.tex.canonical)
//
//             let P = Random.Geometry.point()
//             while (P.x.isEqual(c.center.x) || P.y.isEqual(c.center.y)) {
//                 P = Random.Geometry.point()
//             }
//             // Le point P n'est pas sur le centre.
//             let v = new Vector(c.center, P)
//             while (P.distanceTo(A).value <= Math.sqrt(r)) {
//                 P.x.add(v.x)
//                 P.y.add(v.y)
//             }
//             let p = new Line(P, v, LinePropriety.Perpendicular)
//             // console.log(P.display)
//             // console.log(p.display.canonical)
//
//             let lignes = Random.shuffle([t, d, p])
//
// //             console.log(`A${A.display}
// // c=circ A,${Math.sqrt(r)}
// // T${ptt.display}
// // P${pt1.display}
// // Q${pt2.display}
// // t=line ${t.display.canonical}
// // d=line ${d.display.canonical}
// // p=line ${p.display.canonical}`)
//             console.log(`(exercice ${i + 1}): Soit \\(\\Gamma\\) un cercle et \\(d_1\\), \\(d_2\\) et \\(d_3\\) trois droites.
//             \\mathleft
//             \\[(\\Gamma): ${c.tex}\\]
//             \\[(d_1): ${lignes[0].tex.canonical} \\qquad (d_2): ${lignes[1].tex.canonical}  \\qquad (d_3): ${lignes[2].tex.canonical}\\]
//
//             \\begin{enumerate}[label=\\Alph*]
//             \\item déterminer les positions relatives de \\(d_1\\), \\(d_2\\) et \\(d_3\\) par rapport à \\(\\Gamma\\)
//             \\item calculer les coordonnées du ou des points d'intersection entre le cercle et une des droites qui le coupe (au choix).
//             \\end{enumerate}
//             \\iftoggle{master}{\\(${t.tex.canonical}\\implies ${ptt.tex}\\) \\\\ \\(${d.tex.canonical}\\implies ${pt1.tex},\\ ${pt2.tex}\\) \\\\}{}
//             \\vfill
//             ${i % 2 === 1 ? '\\newpage' : ''}
//             `)
//
//         }
//
//     })
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