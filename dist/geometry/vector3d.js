import { Fraction } from "../coefficients/fraction";
import { Numeric } from "../numeric";
import { dotProduct } from "./geomMath";
export class Vector3D {
    #x = new Fraction().zero();
    #y = new Fraction().zero();
    #z = new Fraction().zero();
    #asPoint = false;
    constructor(x, y, z) {
        if (x instanceof Point3D && y instanceof Point3D) {
            this.x = y.x.clone().subtract(x.x);
            this.y = y.y.clone().subtract(x.y);
            this.z = y.z.clone().subtract(x.z);
        }
        else {
            if (x) {
                this.x = new Fraction(x);
            }
            if (y) {
                this.y = new Fraction(y);
            }
            if (z) {
                this.z = new Fraction(z);
            }
        }
        return this;
    }
    get x() {
        return this.#x;
    }
    set x(value) {
        this.#x = new Fraction(value);
    }
    get y() {
        return this.#y;
    }
    set y(value) {
        this.#y = new Fraction(value);
    }
    get z() {
        return this.#z;
    }
    set z(value) {
        this.#z = new Fraction(value);
    }
    get asPoint() {
        return this.#asPoint;
    }
    set asPoint(value) {
        this.#asPoint = value;
    }
    get array() {
        return [this.#x, this.#y, this.#z];
    }
    get tex() {
        return `\\begin{pmatrix} ${this.#x.tex} \\\\ ${this.#y.tex} \\\\ ${this.#z.tex} \\end{pmatrix}`;
    }
    get display() {
        return `((${this.#x.display},${this.#y.display},${this.#z.display}))`;
    }
    dimension = 3;
    clone() {
        return new Vector3D(this.#x, this.#y, this.#z);
    }
    static asTex(x, y, z) {
        return `\\begin{pmatrix} ${x} \\\\ ${y} \\\\ ${z} \\end{pmatrix}`;
    }
    isEqual = (v) => {
        return this.x.isEqual(v.x) && this.y.isEqual(v.y) && this.z.isEqual(v.z);
    };
    add(value) {
        this.x.add(value.x);
        this.y.add(value.y);
        this.z.add(value.z);
        return this;
    }
    opposite() {
        this.x.opposite();
        this.y.opposite();
        this.z.opposite();
        return this;
    }
    subtract(value) {
        return this.add(value.opposite());
    }
    multiply(value) {
        this.x.multiply(value);
        this.y.multiply(value);
        this.z.multiply(value);
        return this;
    }
    dot(value) {
        return dotProduct(this, value);
    }
    cross(value) {
        return new Vector3D(this.y.clone().multiply(value.z).subtract(this.z.clone().multiply(value.y)), this.z.clone().multiply(value.x).subtract(this.x.clone().multiply(value.z)), this.x.clone().multiply(value.y).subtract(this.y.clone().multiply(value.x)));
    }
    reduce() {
        this.x.reduce();
        this.y.reduce();
        this.z.reduce();
        const gcd = Numeric.gcd(this.x.numerator, this.y.numerator, this.z.numerator);
        if (gcd > 1) {
            this.x.divide(gcd);
            this.y.divide(gcd);
            this.z.divide(gcd);
        }
        const lcm = Numeric.lcm(this.x.denominator, this.y.denominator, this.z.denominator);
        if (lcm > 1) {
            this.x.multiply(lcm);
            this.y.multiply(lcm);
            this.z.multiply(lcm);
        }
        if (this.x.isNegative()) {
            this.x.opposite();
            this.y.opposite();
            this.z.opposite();
        }
        return this;
    }
}
export class Point3D extends Vector3D {
    constructor(x, y, z) {
        super(x, y, z);
        this.asPoint = true;
    }
    clone() {
        return new Point3D(this.x, this.y, this.z);
    }
    get tex() {
        return `\\left( ${this.x.tex} ; ${this.y.tex} ; ${this.z.tex} \\right)`;
    }
    get display() {
        return `(${this.x.display};${this.y.display};${this.z.display})`;
    }
}
//# sourceMappingURL=vector3d.js.map