import { Equation } from "../algebra/equation"
import { Polynom } from "../algebra/polynom"
import { Fraction } from "../coefficients/fraction"
import { Line3 } from "./line3"
import { Vector } from "./vector"


interface Plane3Config {
    point?: Vector,
    normal?: Vector,
    directions?: Vector[],
    equation?: Equation,
    points?: Vector[],
    coefficients?: number[]
}
export class Plane3 {
    #normal: Vector = new Vector(0, 0, 1)
    #point: Vector = new Vector(0, 0, 0).defineAsPoint()

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
    get point(): Vector {
        return this.#point
    }
    set point(value: Vector) {
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
        }

        if (config.point && config.directions?.length === 2) {
            this.point = config.point
            const [v1, v2] = config.directions
            this.normal = v1.cross(v2)
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
                this.point = new Vector(-d.clone().divide(a), 0, 0)
            } else if (b.isNotZero()) {
                this.point = new Vector(0, -d.clone().divide(b), 0)
            } else {
                this.point = new Vector(0, 0, -d.clone().divide(c))
            }
            // Make sure it's considered as point
            this.point.asPoint = true
        }

        if (config.points?.length === 3 && config.points.every(p => p instanceof Vector)) {
            const A = config.points[0]
            const B = config.points[1]
            const C = config.points[2]

            const AB = new Vector(A, B)
            const AC = new Vector(A, C)
            this.normal = AB.cross(AC)
            this.point = A
        }

        if (config.coefficients?.length === 4) {
            const [a, b, c, d] = config.coefficients
            this.normal = new Vector(a, b, c)
            this.point = new Vector(0, 0, -d).defineAsPoint()
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

    intersectWithLine(line: Line3): Vector {
        const { point, direction } = line
        const t = this.normal.dot(point).add(this.d).divide(this.normal.dot(direction).opposite())
        return point.clone().add(direction.clone().multiplyByScalar(t))
    }

}