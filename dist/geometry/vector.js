import { Fraction } from "../coefficients/fraction";
import { Numeric } from "../numeric";
import { areVectorsColinears, areVectorsEquals, dotProduct } from "./geomMath";
export class Vector {
    #x = new Fraction().zero();
    #y = new Fraction().zero();
    #asPoint = false;
    constructor(start, end) {
        if (start !== undefined) {
            this.parse(start, end);
        }
    }
    ;
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
    get asPoint() {
        return this.#asPoint;
    }
    set asPoint(value) {
        this.#asPoint = value;
    }
    get normSquare() {
        return this.#x.clone().pow(2).add(this.#y.clone().pow(2));
    }
    get norm() {
        return Math.sqrt(this.normSquare.value);
    }
    get tex() {
        if (this.#asPoint) {
            return `\\left(${this.array.map(x => x.tex).join(';')}\\right)`;
        }
        return `\\begin{pmatrix} ${this.array.map(x => x.tex).join(' \\\\ ')} \\end{pmatrix}`;
    }
    get display() {
        if (this.#asPoint) {
            return `(${this.array.map(x => x.display).join(';')})`;
        }
        return `((${this.array.map(x => x.display).join(',')}))`;
    }
    get array() {
        return [this.#x, this.#y];
    }
    get dimension() {
        return this.array.length;
    }
    get isNull() {
        return this.array.every(x => x.isZero());
    }
    static asTex(x, y) {
        return `\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}`;
    }
    static scalarProduct = (v1, v2) => {
        if (v1.dimension !== v2.dimension) {
            throw new Error('Vectors must have the same dimension');
        }
        return v1.x.clone().multiply(v2.x).add(v1.y.clone().multiply(v2.y));
    };
    static determinant = (v1, v2) => {
        return v1.x.clone().multiply(v2.y).subtract(v1.y.clone().multiply(v2.x));
    };
    parse = (start, end) => {
        this.zero();
        if (end === undefined) {
            if (start instanceof Vector) {
                return start.clone();
            }
            else {
                return this._parseString(start);
            }
        }
        if (start instanceof Vector && end instanceof Vector) {
            this.#x = end.x.clone().subtract(end.x);
            this.#y = end.x.clone().subtract(end.y);
            return this;
        }
        if ((start instanceof Fraction || typeof start === 'number' || typeof start === 'string')
            &&
                (end instanceof Fraction || typeof end === 'number' || typeof end === 'string')) {
            this.#x = new Fraction(start);
            this.#y = new Fraction(end);
            return this;
        }
        if (typeof start === 'object' && Object.hasOwn(start, 'x') && Object.hasOwn(start, 'y') &&
            typeof end === 'object' && Object.hasOwn(end, 'x') && Object.hasOwn(end, 'y')) {
            const fa = start, fb = end;
            this.#x = new Fraction(fa.x).clone().subtract(fb.x);
            this.#y = new Fraction(fa.y).clone().subtract(fb.y);
            return this;
        }
        return this;
    };
    clone() {
        const V = new Vector();
        V.x = this.x.clone();
        V.y = this.y.clone();
        return V;
    }
    zero = () => {
        this.#x = new Fraction(0);
        this.#y = new Fraction(0);
        return this;
    };
    one = () => {
        this.#x = new Fraction(1);
        this.#y = new Fraction(0);
        return this;
    };
    opposite = () => {
        this.#x.opposite();
        this.#y.opposite();
        return this;
    };
    add = (V) => {
        this.#x.add(V.x);
        this.#y.add(V.y);
        return this;
    };
    subtract = (V) => {
        return this.add(V.clone().opposite());
    };
    unit = () => {
        const norm = this.norm;
        if (norm === 0) {
            return this;
        }
        return this.divideByScalar(norm);
    };
    middleOf = (V1, V2) => {
        this.#x = V1.x.clone().add(V2.x).divide(2);
        this.#y = V1.y.clone().add(V2.y).divide(2);
        return this;
    };
    translate(value) {
        this.#x.add(value.x);
        this.#y.add(value.y);
        return this;
    }
    distanceTo(item) {
        const V = new Vector(this, item);
        return {
            value: V.norm,
            fraction: V.normSquare,
            tex: V.tex
        };
    }
    dotProduct = (V) => {
        return dotProduct(this, V);
    };
    determinantWith = (V) => {
        return Vector.determinant(this, V);
    };
    normal = () => {
        const x = this.x.clone().opposite(), y = this.y.clone();
        this.#x = y;
        this.#y = x;
        return this;
    };
    isEqual = (v) => {
        return areVectorsEquals(this, v);
    };
    isColinearTo = (v) => {
        return areVectorsColinears(this, v);
    };
    isNormalTo = (v) => {
        return this.dotProduct(v).isZero();
    };
    multiplyByScalar = (k) => {
        const scalar = new Fraction(k);
        this.#x.multiply(scalar);
        this.#y.multiply(scalar);
        return this;
    };
    divideByScalar = (k) => {
        return this.multiplyByScalar(new Fraction(k).inverse());
    };
    simplify = () => {
        return this
            .multiplyByScalar(Numeric.lcm(this.#x.denominator, this.#y.denominator))
            .divideByScalar(Numeric.gcd(this.#x.numerator, this.#y.numerator));
    };
    angleWith = (V, sharp, radian) => {
        let scalar = this.dotProduct(V).value;
        if (sharp) {
            scalar = Math.abs(scalar);
        }
        const toDegree = radian ? 1 : 180 / Math.PI;
        return toDegree * Math.acos(scalar / (this.norm * V.norm));
    };
    _parseString = (value) => {
        if (value.startsWith('(')) {
            value = value.substring(1);
        }
        if (value.endsWith(')')) {
            value = value.substring(0, value.length - 1);
        }
        const components = value.split(/[,;\s]/g)
            .filter((v) => v.trim() !== '');
        if (components.length < 2) {
            return this;
        }
        this.x = new Fraction(components[0]);
        this.y = new Fraction(components[1]);
        return this;
    };
}
export class Point extends Vector {
    constructor(start, end) {
        super();
        if (start !== undefined) {
            this.parse(start, end);
        }
        this.asPoint = true;
    }
    clone() {
        return new Point(this.x, this.y);
    }
    get tex() {
        return `\\left(${this.array.map(x => x.tex).join(';')}\\right)`;
    }
    get display() {
        return `(${this.array.map(x => x.display).join(';')})`;
    }
}
//# sourceMappingURL=vector.js.map