import { Equation } from "../algebra/equation"
import { Polynom } from "../algebra/polynom"
import { Fraction } from "../coefficients/fraction"
import { Line3 } from "./line3"
import { Point3D, Vector3D } from "./vector3d"


interface Plane3Config {
    point?: Point3D,
    normal?: Vector3D,
    directions?: Vector3D[],
    equation?: Equation,
    points?: Point3D[],
    coefficients?: number[]
}
export class Plane3 {
    #normal: Vector3D = new Vector3D(0, 0, 1)
    #point: Point3D = new Point3D(0, 0, 0)

    constructor(config?: Plane3Config) {

        if (config) {
            this.parse(config)
        }
        return this
    }

    get normal(): Vector3D {
        return this.#normal
    }
    set normal(value: Vector3D) {
        this.#normal = value
    }
    get point(): Point3D {
        return this.#point
    }
    set point(value: Point3D) {
        this.#point = value
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
            this.normal = new Vector3D(a, b, c)

            // Get a point on the plane
            if (a.isNotZero()) {
                this.point = new Point3D(-d.clone().divide(a), 0, 0)
            } else if (b.isNotZero()) {
                this.point = new Point3D(0, -d.clone().divide(b), 0)
            } else {
                this.point = new Point3D(0, 0, -d.clone().divide(c))
            }
        }

        if (config.points?.length === 3 && config.points.every(p => p instanceof Point3D)) {
            const A = config.points[0]
            const B = config.points[1]
            const C = config.points[2]

            const AB = new Vector3D(A, B)
            const AC = new Vector3D(A, C)
            this.normal = AB.cross(AC)
            this.point = A
        }

        if (config.coefficients?.length === 4) {
            const [a, b, c, d] = config.coefficients
            this.normal = new Vector3D(a, b, c)
            this.point = new Point3D(0, 0, -d)
        }
    }

    intersectWithLine(line: Line3): Point3D {
        const { point, direction } = line
        const t = this.normal.dot(point).add(this.d).divide(this.normal.dot(direction).opposite())
        return point.clone().add(direction.clone().multiply(t))
    }

}