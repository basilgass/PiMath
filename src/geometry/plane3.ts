import { Equation } from "../algebra/equation"
import { Polynom } from "../algebra/polynom"
import { Fraction } from "../coefficients/fraction"
import { Line3 } from "./line3"
import { Point } from "./point"
import { Vector } from "./vector"
import type {Plane3Config} from "../pimath.interface"



export class Plane3 {
    #normal: Vector = new Vector(0, 0, 1)
    #point: Point = new Point(0, 0, 0)

    constructor(config?: Plane3Config) {
        if (config) {
            this.parse(config)
        }

        return this
    }

    get normal(): Vector {
        return this.#normal
    }
    set normal(value: Vector) {
        this.#normal = value
        this.#normal.asPoint = false
    }
    get point(): Point {
        return this.#point
    }
    set point(value: Point) {
        this.#point = value
        this.#point.asPoint = true
    }

    get a(): Fraction {
        return this.#normal.x
    }
    get b(): Fraction {
        return this.#normal.y
    }
    get c(): Fraction {
        return this.#normal.z
    }
    get d(): Fraction {
        return this.#normal.dot(this.#point).opposite()
    }

    get tex(): string {
        // return the cartesian equation of the plane
        return new Equation(
            new Polynom('xyz', this.a, this.b, this.c, this.d),
            new Polynom(0)
        ).reduce().tex
    }

    parse(config: Plane3Config) {
        if (config.point && config.normal) {
            this.point = config.point
            this.normal = config.normal
            return
        }

        if (config.point && config.directions?.length === 2) {
            this.point = config.point
            const [v1, v2] = config.directions
            this.normal = v1.cross(v2)
            return
        }

        if (config.equation) {
            const cartesian = config.equation.moveLeft().reduce().left

            const a = cartesian.monomByLetter('x').coefficient
            const b = cartesian.monomByLetter('y').coefficient
            const c = cartesian.monomByLetter('z').coefficient
            const d = cartesian.monomByDegree(0).coefficient

            // Get the normal vector
            this.normal = new Vector(a, b, c)

            // Get a point on the plane
            if (a.isNotZero()) {
                this.point = new Point(d.clone().divide(a).opposite(), 0, 0)
            } else if (b.isNotZero()) {
                this.point = new Point(0, d.clone().divide(b).opposite(), 0)
            } else {
                this.point = new Point(0, 0, d.clone().divide(c).opposite())
            }
            // Make sure it's considered as point
            return
        }

        if (config.points?.length === 3 && config.points.every(p => p instanceof Vector)) {
            const A = config.points[0]
            const B = config.points[1]
            const C = config.points[2]

            const AB = new Vector(A, B)
            const AC = new Vector(A, C)
            this.normal = AB.cross(AC)
            this.point = A
            return
        }

        if (config.coefficients?.length === 4) {
            const [a, b, c, d] = config.coefficients
            this.normal = new Vector(a, b, c)
            this.point = new Point(0, 0, -d)
            return
        }
    }

    angle(vector: Vector, sharp?: boolean, radian?: boolean): number
    angle(line: Line3, sharp?: boolean, radian?: boolean): number
    angle(plane: Plane3, sharp?: boolean, radian?: boolean): number
    angle(value: Plane3 | Line3 | Vector, sharp?: boolean, radian?: boolean): number {
        if (value instanceof Plane3) {
            return this.normal.angle(value.normal, sharp, radian)
        }

        let direction: Vector
        if (value instanceof Vector) {
            if (value.dimension !== 3) {
                throw new Error('Vector is not 3D')
            }

            direction = value
        } else {
            direction = value.direction
        }

        const a90 = radian ? Math.PI / 2 : 90
        return a90 - this.normal.angle(direction, true, radian)
    }

    distanceTo(point: Vector): number {
        return this.normal.dot(point).add(this.d).abs().value / this.normal.norm
    }

    intersectWithLine(line: Line3): Point {
        const { point, direction } = line
        const t = this.normal.dot(point).add(this.d).divide(this.normal.dot(direction).opposite())
        return point.clone().add(direction.clone().multiplyByScalar(t))
    }

    intersectWithPlane(plane: Plane3): Line3 {
        const direction = this.normal.cross(plane.normal)

        // Solve the system:
        // p1 // p2 // z=0
        const pt = new Point(0, 0, 0)
        throw new Error('Intersection with plane  not yet implemented !')
        return new Line3(pt, direction)
    }

    isPointOnPlane(pt: Point): boolean {
        return this.normal.dot(pt).add(this.d).isZero()
    }
}