import {describe, expect, it} from "vitest"
import {Line3} from "../../src/geometry/line3"
import {Random} from "../../src/randomization/random"
import {Vector} from "../../src/geometry/vector"
import {Point} from "../../src/geometry/point"
import {Root} from "../../src/coefficients/root"
import {defined} from "../helpers/defined"

// ─── Construction ────────────────────────────────────────────────────────────

describe('Line3 construction', () => {
    it('fromPoints creates correct OA and direction', () => {
        const A = new Point(1, 2, 3)
        const B = new Point(4, 6, 9)
        const L = Line3.fromPoints(A, B)
        expect(L.OA.x.display).toBe('1')
        expect(L.OA.y.display).toBe('2')
        expect(L.OA.z.display).toBe('3')
        expect(L.d.x.display).toBe('3')
        expect(L.d.y.display).toBe('4')
        expect(L.d.z.display).toBe('6')
    })

    it('fromPointAndDirection creates correct OA and direction', () => {
        const A = new Point(1, 2, 3)
        const d = new Vector(4, 5, 6)
        const L = Line3.fromPointAndDirection(A, d)
        expect(L.OA.x.display).toBe('1')
        expect(L.OA.y.display).toBe('2')
        expect(L.OA.z.display).toBe('3')
        expect(L.d.x.display).toBe('4')
        expect(L.d.y.display).toBe('5')
        expect(L.d.z.display).toBe('6')
    })

    it('parse with two points delegates to fromPoints', () => {
        const A = new Point(1, 2, 3)
        const B = new Point(4, 6, 9)
        const L = new Line3()
        L.parse(A, B)
        expect(L.OA.x.display).toBe('1')
        expect(L.d.x.display).toBe('3')
    })

    it('parse with point and vector delegates to fromPointAndDirection', () => {
        const A = new Point(1, 2, 3)
        const d = new Vector(4, 5, 6)
        const L = new Line3()
        L.parse(A, d)
        expect(L.OA.x.display).toBe('1')
        expect(L.d.x.display).toBe('4')
    })

    it('copy replicates OA and direction', () => {
        const L1 = new Line3(new Point(1, 2, 3), new Vector(4, 5, 6))
        const L2 = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        L2.copy(L1)
        expect(L2.OA.x.display).toBe('1')
        expect(L2.OA.y.display).toBe('2')
        expect(L2.d.x.display).toBe('4')
    })

    it('copy is isolated from the original', () => {
        const L1 = new Line3(new Point(1, 2, 3), new Vector(4, 5, 6))
        const L2 = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        L2.copy(L1)
        L1.OA.x.add(100)
        expect(L2.OA.x.display).toBe('1')
    })
})

// ─── tex / display ───────────────────────────────────────────────────────────

describe('Line3 tex/display output', () => {
    const A = new Point(1, 2, 3)
    const d = new Vector(4, 5, 6)

    it('tex returns parametric form by default', () => {
        const L = new Line3(A, d)
        expect(L.tex).toBe('\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + k\\cdot \\begin{pmatrix} 4 \\\\ 5 \\\\ 6 \\end{pmatrix}')
    })

    it('asParametric.tex returns parametric form', () => {
        const L = new Line3(A, d)
        expect(L.asParametric.tex).toBe('\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + k\\cdot \\begin{pmatrix} 4 \\\\ 5 \\\\ 6 \\end{pmatrix}')
    })

    it('asSystem.tex returns LaTeX system form', () => {
        const L = new Line3(A, d)
        expect(L.asSystem.tex).toBe('\\left\\{\\begin{aligned}\n    x &= 1+4k\\\\ \n    y &= 2+5k\\\\\n    z &= 3+6k\n\\end{aligned}\\right.')
    })

    it('asSystem.display returns AsciiMath system form', () => {
        const L = new Line3(A, d)
        expect(L.asSystem.display).toBe('{(x,=,1+4k),(y,=,2+5k),(z,=,3+6k):}')
    })

    it('asCartesian.tex returns LaTeX cartesian form', () => {
        const L = new Line3(A, d)
        expect(L.asCartesian.tex).toBe('\\frac{ x-1 }{ 4 } = \\frac{ y-2 }{ 5 } = \\frac{ z-3 }{ 6 }')
    })

    it('asCartesian.display returns AsciiMath cartesian form', () => {
        const L = new Line3(A, d)
        expect(L.asCartesian.display).toBe('(x-1)/4 = (y-2)/5 = (z-3)/6')
    })

    it('mode resets to parametric after tex', () => {
        const L = new Line3(A, d)
        void L.asSystem.tex
        expect(L.tex).toBe('\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + k\\cdot \\begin{pmatrix} 4 \\\\ 5 \\\\ 6 \\end{pmatrix}')
    })

    it('display returns parametric form by default', () => {
        const L = new Line3(A, d)
        expect(typeof L.display).toBe('string')
        expect(L.display).toBe('((x,y,z)) = ((1,2,3)) + k\\cdot ((4,5,6))')
    })
})

// ─── Predicates ──────────────────────────────────────────────────────────────

describe('Line3 geometric predicates', () => {
    const xAxis = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))

    it('isPointOnLine returns true for the base point', () => {
        expect(xAxis.isPointOnLine(new Point(0, 0, 0))).toBe(true)
    })

    it('isPointOnLine returns true for a point on the line', () => {
        expect(xAxis.isPointOnLine(new Point(3, 0, 0))).toBe(true)
    })

    it('isPointOnLine returns false for a point not on the line', () => {
        expect(xAxis.isPointOnLine(new Point(3, 1, 0))).toBe(false)
    })

    it('isEqual returns true for the same geometric line (different OA)', () => {
        const L = new Line3(new Point(5, 0, 0), new Vector(2, 0, 0))
        expect(xAxis.isEqual(L)).toBe(true)
    })

    it('isEqual returns false for a parallel but distinct line', () => {
        const L = new Line3(new Point(0, 1, 0), new Vector(1, 0, 0))
        expect(xAxis.isEqual(L)).toBe(false)
    })

    it('isParallelTo returns true for a parallel line', () => {
        const L = new Line3(new Point(0, 1, 0), new Vector(2, 0, 0))
        expect(xAxis.isParallelTo(L)).toBe(true)
    })

    it('isParallelTo returns false for the same line', () => {
        const L = new Line3(new Point(5, 0, 0), new Vector(1, 0, 0))
        expect(xAxis.isParallelTo(L)).toBe(false)
    })

    it('isParallelTo returns false for a non-parallel line', () => {
        const L = new Line3(new Point(0, 0, 0), new Vector(0, 1, 0))
        expect(xAxis.isParallelTo(L)).toBe(false)
    })

    it('isOrthogonalTo returns true for orthogonal intersecting lines', () => {
        const L = new Line3(new Point(0, 0, 0), new Vector(0, 1, 0))
        expect(xAxis.isOrthogonalTo(L)).toBe(true)
    })

    it('isOrthogonalTo returns true for skew lines with orthogonal directions', () => {
        // x-axis and a line through (0,1,0) with z-direction: directions orthogonal, lines skew
        const L = new Line3(new Point(0, 1, 0), new Vector(0, 0, 1))
        expect(xAxis.isOrthogonalTo(L)).toBe(true)
    })

    it('isOrthogonalTo returns false for non-orthogonal directions', () => {
        const L = new Line3(new Point(0, 0, 0), new Vector(1, 1, 0))
        expect(xAxis.isOrthogonalTo(L)).toBe(false)
    })

    it('isPerpendicularTo returns true for orthogonal intersecting lines', () => {
        const L = new Line3(new Point(0, 0, 0), new Vector(0, 1, 0))
        expect(xAxis.isPerpendicularTo(L)).toBe(true)
    })

    it('isPerpendicularTo returns false for skew lines with orthogonal directions', () => {
        // orthogonal directions but no intersection → not perpendicular
        const L = new Line3(new Point(0, 1, 0), new Vector(0, 0, 1))
        expect(xAxis.isPerpendicularTo(L)).toBe(false)
    })

    it('isPerpendicularTo returns false for a non-orthogonal line', () => {
        const L = new Line3(new Point(0, 0, 0), new Vector(1, 1, 0))
        expect(xAxis.isPerpendicularTo(L)).toBe(false)
    })
})

// ─── simplify ────────────────────────────────────────────────────────────────

describe('Line3 simplify', () => {
    it('simplify reduces the direction vector', () => {
        const L = new Line3(new Point(1, 2, 3), new Vector(4, 6, 8))
        L.simplify()
        expect(L.d.x.display).toBe('2')
        expect(L.d.y.display).toBe('3')
        expect(L.d.z.display).toBe('4')
    })

    it('simplify returns this', () => {
        const L = new Line3(new Point(0, 0, 0), new Vector(2, 4, 6))
        expect(L.simplify()).toBe(L)
    })
})

// ─── intersection ────────────────────────────────────────────────────────────

describe('Line3 intersection', () => {
    it('returns hasIntersection true and correct point for two intersecting lines', () => {
        // L1 = x-axis, L2 passes through (2,3,0) in the y-direction
        const L1 = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        const L2 = new Line3(new Point(2, 3, 0), new Vector(0, 1, 0))
        const result = L1.intersection(L2)
        expect(result.hasIntersection).toBe(true)
        expect(result.isParallel).toBe(false)
        expect(result.isSame).toBe(false)
        expect(defined(result.point).x.display).toBe('2')
        expect(defined(result.point).y.display).toBe('0')
        expect(defined(result.point).z.display).toBe('0')
    })

    it('returns isParallel true for parallel lines', () => {
        const L1 = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        const L2 = new Line3(new Point(0, 1, 0), new Vector(1, 0, 0))
        const result = L1.intersection(L2)
        expect(result.hasIntersection).toBe(false)
        expect(result.isParallel).toBe(true)
        expect(result.isSame).toBe(false)
    })

    it('returns isSame true for the same line', () => {
        const L1 = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        const L2 = new Line3(new Point(5, 0, 0), new Vector(2, 0, 0))
        const result = L1.intersection(L2)
        expect(result.hasIntersection).toBe(false)
        expect(result.isParallel).toBe(false)
        expect(result.isSame).toBe(true)
    })

    it('returns hasIntersection false for skew lines', () => {
        // L1 = x-axis, L2 passes through (0,1,1) in the z-direction
        const L1 = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        const L2 = new Line3(new Point(0, 1, 1), new Vector(0, 0, 1))
        const result = L1.intersection(L2)
        expect(result.hasIntersection).toBe(false)
        expect(result.isParallel).toBe(false)
        expect(result.isSame).toBe(false)
    })
})

// ─── randomNearPoint ─────────────────────────────────────────────────────────

describe('Line3 randomNearPoint', () => {
    it('returns a point not on the line', () => {
        const L = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        const P = L.randomNearPoint()
        expect(L.isPointOnLine(P)).toBe(false)
    })

    it('returns a 3D point', () => {
        const L = new Line3(new Point(1, 2, 3), new Vector(1, 1, 1))
        const P = L.randomNearPoint()
        expect(P.dimension).toBe(3)
    })
})

// ─── clone ───────────────────────────────────────────────────────────────────

describe('Line3 clone', () => {
    it('returns a new object, not the same reference', () => {
        const L = new Line3(new Point(1, 2, 3), new Vector(4, 5, 6))
        const C = L.clone()
        expect(C).not.toBe(L)
    })

    it('preserves the math values of the original', () => {
        const L = new Line3(new Point(1, 2, 3), new Vector(4, 5, 6))
        const C = L.clone()
        expect(C.OA.x.display).toBe('1')
        expect(C.OA.y.display).toBe('2')
        expect(C.d.x.display).toBe('4')
    })

    it('is isolated from the original after cloning', () => {
        const L = new Line3(new Point(1, 2, 3), new Vector(4, 5, 6))
        const C = L.clone()
        L.OA.x.add(100)
        expect(C.OA.x.display).toBe('1')
    })
})

// ─── distanceTo ──────────────────────────────────────────────────────────────

describe('Line3 distanceTo', () => {
    it('returns a Root instance', () => {
        const L = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        const dist = L.distanceTo(new Point(0, 3, 0))
        expect(dist).toBeInstanceOf(Root)
    })

    it('returns zero for a point on the line', () => {
        const L = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        const dist = L.distanceTo(new Point(5, 0, 0))
        expect(dist.value).toBe(0)
    })

    it('returns the correct distance for a point off the line', () => {
        // x-axis, point (0, 3, 0): distance = 3
        const L = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        const dist = L.distanceTo(new Point(0, 3, 0))
        expect(dist.value).toBe(3)
    })

    it('tex output is correct for a rational distance', () => {
        // x-axis, point (0, 3, 0): sqrt(9/1) reduced = 3
        const L = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        const dist = L.distanceTo(new Point(0, 3, 0))
        expect(dist.tex).toBe('3')
    })
})

// ─── hitSegment ──────────────────────────────────────────────────────────────

describe('Line3 hitSegment', () => {
    it('returns true when the line crosses the segment', () => {
        // x-axis hits the segment from (2,-1,0) to (2,1,0) at (2,0,0)
        const L = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        expect(L.hitSegment(new Point(2, -1, 0), new Point(2, 1, 0))).toBe(true)
    })

    it('returns false when the intersection lies outside the segment', () => {
        // x-axis would meet the line through (2,1,0)→(2,3,0) at y=0, which is outside
        const L = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        expect(L.hitSegment(new Point(2, 1, 0), new Point(2, 3, 0))).toBe(false)
    })

    it('returns false for a parallel segment', () => {
        const L = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
        expect(L.hitSegment(new Point(0, 1, 0), new Point(3, 1, 0))).toBe(false)
    })
})

// ─── Existing tests (API updated) ────────────────────────────────────────────

describe('Geometry Line3 tests', function () {
    it('should create a line from two points', function () {

        const A = new Point(1, 2, 3)
        const d = new Vector(4, 5, 6)

        const L = new Line3(A, d)

        expect(L.OA.x.display).to.be.equal('1')
    })

    it('should create a tex output', function () {

        const A = new Point(1, 2, 3)
        const d = new Vector(4, 5, 6)
        const L = new Line3(A, d)

        expect(L.tex).to.be.equal('\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + k\\cdot \\begin{pmatrix} 4 \\\\ 5 \\\\ 6 \\end{pmatrix}')
        expect(L.asSystem.tex).to.be.equal('\\left\\{\\begin{aligned}\n    x &= 1+4k\\\\ \n    y &= 2+5k\\\\\n    z &= 3+6k\n\\end{aligned}\\right.')
    })

    it('should create a random line', function () {
        const L = Random.line3()

        expect(L.OA.dimension).to.be.equal(3)
        expect(L.d.dimension).to.be.equal(3)
    })

    it('should create a random line with a specific direction', function () {

        const d = new Vector(4, 5, 6)
        const L = Random.line3({ direction: d })

        expect(L.OA.dimension).to.be.equal(3)
        expect(L.d.dimension).to.be.equal(3)
        expect(L.d.x.display).to.be.equal('4')
        expect(L.d.y.display).to.be.equal('5')
        expect(L.d.z.display).to.be.equal('6')
    })

    it('should create a random line with a specific point', function () {

        const A = new Point(1, 2, 3)
        const L = Random.line3({ A })

        expect(L.OA.dimension).to.be.equal(3)
        expect(L.d.dimension).to.be.equal(3)
        expect(L.OA.x.display).to.be.equal('1')
        expect(L.OA.y.display).to.be.equal('2')
        expect(L.OA.z.display).to.be.equal('3')
    })

    it('should get a random point on the line', function () {
        const L = Random.line3()
        const P = L.randomPoint(2)

        expect(P.dimension).to.be.equal(3)

        // Compare the three k values
        const k1 = (P.x.value - L.OA.x.value) / L.d.x.value
        const k2 = (P.y.value - L.OA.y.value) / L.d.y.value
        const k3 = (P.z.value - L.OA.z.value) / L.d.z.value

        if (!isNaN(k1) && !isNaN(k2)) {
            expect(k1).to.be.equal(k2)
        }
        if (!isNaN(k1) && !isNaN(k3)) {
            expect(k1).to.be.equal(k3)
        }
        if (!isNaN(k2) && !isNaN(k3)) {
            expect(k2).to.be.equal(k3)
        }

        if (!isNaN(k1)) { expect(P.x.display).not.to.be.equal(L.OA.x.display) }
        if (!isNaN(k2)) { expect(P.y.display).not.to.be.equal(L.OA.y.display) }
        if (!isNaN(k3)) { expect(P.z.display).not.to.be.equal(L.OA.z.display) }
    })

})

// ─── project ─────────────────────────────────────────────────────────────────

describe('Line3 project', () => {
    const xAxis = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))

    it('projects a point onto the x-axis', () => {
        const proj = xAxis.project(new Point(3, 4, 5))
        expect(proj.display).toBe('(3;0;0)')
    })

    it('returns the point itself when it lies on the line', () => {
        const pt = new Point(7, 0, 0)
        expect(xAxis.project(pt).display).toBe('(7;0;0)')
    })

    it('projected point lies on the line', () => {
        const L = new Line3(new Point(1, 2, 3), new Vector(2, 1, -1))
        const proj = L.project(new Point(5, 0, 4))
        expect(L.isPointOnLine(proj)).toBe(true)
    })

    it('AP vector is perpendicular to the direction after projection', () => {
        const L = new Line3(new Point(0, 1, 0), new Vector(1, 1, 0))
        const pt = new Point(3, 0, 2)
        const proj = L.project(pt)
        const residual = new Vector(proj, pt)
        expect(residual.dot(L.direction).isZero()).toBe(true)
    })
})

// ─── reflect ─────────────────────────────────────────────────────────────────

describe('Line3 reflect', () => {
    const xAxis = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))

    it('reflects a point through the x-axis', () => {
        const ref = xAxis.reflect(new Point(3, 2, 1))
        expect(ref.display).toBe('(3;-2;-1)')
    })

    it('point on the line reflects to itself', () => {
        expect(xAxis.reflect(new Point(5, 0, 0)).display).toBe('(5;0;0)')
    })

    it('projection is the midpoint of point and its reflection', () => {
        const L = new Line3(new Point(0, 1, 0), new Vector(1, 1, 1))
        const pt = new Point(3, 0, 2)
        const ref = L.reflect(pt)
        const mid = new Point(
            pt.x.clone().add(ref.x).divide(2),
            pt.y.clone().add(ref.y).divide(2),
            pt.z.clone().add(ref.z).divide(2)
        )
        expect(L.isPointOnLine(mid)).toBe(true)
    })
})
