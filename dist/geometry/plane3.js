import { Equation } from "../algebra/equation";
import { Polynom } from "../algebra/polynom";
import { Fraction } from "../coefficients/fraction";
import { Line3 } from "./line3";
import { Point3D, Vector3D } from "./vector3d";
export class Plane3 {
    #normal = new Vector3D(0, 0, 1);
    #point = new Point3D(0, 0, 0);
    constructor(config) {
        if (config) {
            this.parse(config);
        }
        return this;
    }
    get normal() {
        return this.#normal;
    }
    set normal(value) {
        this.#normal = value;
    }
    get point() {
        return this.#point;
    }
    set point(value) {
        this.#point = value;
    }
    get a() {
        return this.#normal.x;
    }
    get b() {
        return this.#normal.y;
    }
    get c() {
        return this.#normal.z;
    }
    get d() {
        return this.#normal.dot(this.#point).opposite();
    }
    get tex() {
        return new Equation(new Polynom('xyz', this.a, this.b, this.c, this.d), new Polynom(0)).reduce().tex;
    }
    parse(config) {
        if (config.point && config.normal) {
            this.point = config.point;
            this.normal = config.normal;
        }
        if (config.point && config.directions?.length === 2) {
            this.point = config.point;
            const [v1, v2] = config.directions;
            this.normal = v1.cross(v2);
        }
        if (config.equation) {
            const cartesian = config.equation.moveLeft().reduce().left;
            const a = cartesian.monomByLetter('x').coefficient;
            const b = cartesian.monomByLetter('y').coefficient;
            const c = cartesian.monomByLetter('z').coefficient;
            const d = cartesian.monomByDegree(0).coefficient;
            this.normal = new Vector3D(a, b, c);
            if (a.isNotZero()) {
                this.point = new Point3D(-d.clone().divide(a), 0, 0);
            }
            else if (b.isNotZero()) {
                this.point = new Point3D(0, -d.clone().divide(b), 0);
            }
            else {
                this.point = new Point3D(0, 0, -d.clone().divide(c));
            }
        }
        if (config.points?.length === 3 && config.points.every(p => p instanceof Point3D)) {
            const A = config.points[0];
            const B = config.points[1];
            const C = config.points[2];
            const AB = new Vector3D(A, B);
            const AC = new Vector3D(A, C);
            this.normal = AB.cross(AC);
            this.point = A;
        }
        if (config.coefficients?.length === 4) {
            const [a, b, c, d] = config.coefficients;
            this.normal = new Vector3D(a, b, c);
            this.point = new Point3D(0, 0, -d);
        }
    }
    intersectWithLine(line) {
        const { point, direction } = line;
        const t = this.normal.dot(point).add(this.d).divide(this.normal.dot(direction).opposite());
        return point.clone().add(direction.clone().multiply(t));
    }
}
//# sourceMappingURL=plane3.js.map