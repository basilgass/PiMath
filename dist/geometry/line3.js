import { Fraction } from "../coefficients/fraction";
import { Polynom } from "../algebra/polynom";
import { Monom } from "../algebra/monom";
import { Point3D, Vector3D } from "./vector3d";
import { randomIntSym } from "../randomization/rndHelpers";
export var LinePropriety;
(function (LinePropriety) {
    LinePropriety["None"] = "none";
    LinePropriety["Parallel"] = "parallel";
    LinePropriety["Perpendicular"] = "perpendicular";
    LinePropriety["Tangent"] = "tangent";
})(LinePropriety || (LinePropriety = {}));
export class Line3 {
    static PERPENDICULAR = LinePropriety.Perpendicular;
    static PARALLEL = LinePropriety.Parallel;
    #OA = new Vector3D();
    #d = new Vector3D();
    constructor(A, d) {
        this.#OA = A.clone();
        this.#d = d.clone();
        return this;
    }
    get OA() {
        return this.#OA;
    }
    set OA(value) {
        this.#OA = value;
    }
    get point() {
        return this.#OA.clone();
    }
    get d() {
        return this.#d;
    }
    set d(value) {
        this.#d = value;
    }
    get tex() {
        return {
            parametric: `${Vector3D.asTex('x', 'y', 'z')} = ${Vector3D.asTex(this.#OA.x.tex, this.#OA.y.tex, this.#OA.z.tex)} + k\\cdot ${Vector3D.asTex(this.#d.x.tex, this.#d.y.tex, this.#d.z.tex)}`,
            system: `\\left\\{\\begin{aligned}
    x &= ${(new Polynom(this.#OA.x)
                .add(new Monom(this.#d.x).multiply(new Monom('k'))))
                .reorder('k', true)
                .tex}\\\\ 
    y &= ${(new Polynom(this.#OA.y)
                .add(new Monom(this.#d.y).multiply(new Monom('k'))))
                .reorder('k', true)
                .tex}\\\\
    z &= ${(new Polynom(this.#OA.z)
                .add(new Monom(this.#d.z).multiply(new Monom('k'))))
                .reorder('k', true)
                .tex}
\\end{aligned}\\right.`
        };
    }
    get direction() {
        return this.#d.clone();
    }
    clone = () => {
        this.#d = this.#d.clone();
        this.#OA = this.#OA.clone();
        return this;
    };
    isOnLine = (pt) => {
        return false;
    };
    isParallelTo = (line) => {
        throw new Error('Method not implemented.');
    };
    isSameAs = (line) => {
        throw new Error('Method not implemented.');
    };
    isPerpendicularTo = (line) => {
        throw new Error('Method not implemented.');
    };
    isVertical = () => {
        throw new Error('Method not implemented.');
    };
    simplify = () => {
        throw new Error('Method not implemented.');
    };
    intersection = (line) => {
        throw new Error('Method not implemented.');
    };
    distanceTo(pt) {
        throw new Error('Method not implemented.');
    }
    hitSegment(A, B) {
        const iPt = this.intersection(new Line3(A, B));
        if (iPt.hasIntersection) {
            return iPt.point.x.value >= Math.min(A.x.value, B.x.value)
                && iPt.point.x.value <= Math.max(A.x.value, B.x.value)
                && iPt.point.y.value >= Math.min(A.y.value, B.y.value)
                && iPt.point.y.value <= Math.max(A.y.value, B.y.value)
                && iPt.point.z.value >= Math.min(A.z.value, B.z.value)
                && iPt.point.z.value <= Math.max(A.z.value, B.z.value);
        }
        return false;
    }
    randomPoint = (max = 5) => {
        const A = this.#OA.clone(), k = new Fraction(randomIntSym(max, false));
        return new Point3D(A.x.clone().add(this.#d.x.clone().multiply(k)), A.y.clone().add(this.#d.y.clone().multiply(k)), A.z.clone().add(this.#d.z.clone().multiply(k)));
    };
}
//# sourceMappingURL=line3.js.map