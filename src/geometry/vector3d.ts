import { InputValue } from "../../pimath.interface"
import { Fraction } from "../coefficients/fraction"
import { Numeric } from "../numeric"
import { dotProduct } from "./geomMath"


export class Vector3D {
    #x: Fraction = new Fraction().zero()  // 1st component
    #y: Fraction = new Fraction().zero()  // 2nd component
    #z: Fraction = new Fraction().zero()  // 3rd component
    #asPoint = false

    constructor()
    constructor(A: Point3D, B: Point3D)
    constructor(x: InputValue<Fraction>, y: InputValue<Fraction>, z: InputValue<Fraction>)
    constructor(x?: InputValue<Fraction> | Point3D, y?: InputValue<Fraction> | Point3D, z?: InputValue<Fraction>) {


        if (x instanceof Point3D && y instanceof Point3D) {
            this.x = y.x.clone().subtract(x.x)
            this.y = y.y.clone().subtract(x.y)
            this.z = y.z.clone().subtract(x.z)
        } else {
            if (x) { this.x = new Fraction(x as InputValue<Fraction>) }
            if (y) { this.y = new Fraction(y as InputValue<Fraction>) }
            if (z) { this.z = new Fraction(z) }
        }

        return this
    }

    get x(): Fraction {
        return this.#x
    }
    set x(value: Fraction | number | string) {
        this.#x = new Fraction(value)
    }

    get y(): Fraction {
        return this.#y
    }
    set y(value: Fraction | number | string) {
        this.#y = new Fraction(value)
    }

    get z(): Fraction {
        return this.#z
    }
    set z(value: Fraction | number | string) {
        this.#z = new Fraction(value)
    }

    get asPoint(): boolean {
        return this.#asPoint
    }

    set asPoint(value: boolean) {
        this.#asPoint = value
    }

    get array(): Fraction[] {
        return [this.#x, this.#y, this.#z]
    }


    get tex(): string {
        return `\\begin{pmatrix} ${this.#x.tex} \\\\ ${this.#y.tex} \\\\ ${this.#z.tex} \\end{pmatrix}`
    }

    get display(): string {
        return `((${this.#x.display},${this.#y.display},${this.#z.display}))`
    }

    readonly dimension = 3

    public clone(): Vector3D {
        return new Vector3D(this.#x, this.#y, this.#z)
    }

    static asTex(x: string, y: string, z: string): string {
        return `\\begin{pmatrix} ${x} \\\\ ${y} \\\\ ${z} \\end{pmatrix}`
    }

    public isEqual = (v: Vector3D): boolean => {
        return this.x.isEqual(v.x) && this.y.isEqual(v.y) && this.z.isEqual(v.z)
    }

    public add(value: Vector3D): this {
        this.x.add(value.x)
        this.y.add(value.y)
        this.z.add(value.z)
        return this
    }

    public opposite(): this {
        this.x.opposite()
        this.y.opposite()
        this.z.opposite()
        return this
    }

    public subtract(value: Vector3D): this {
        return this.add(value.opposite())
    }

    public multiply(value: Fraction): this {
        this.x.multiply(value)
        this.y.multiply(value)
        this.z.multiply(value)
        return this
    }

    public dot(value: Vector3D): Fraction {
        return dotProduct(this, value)
    }

    public cross(value: Vector3D): Vector3D {
        return new Vector3D(
            this.y.clone().multiply(value.z).subtract(this.z.clone().multiply(value.y)),
            this.z.clone().multiply(value.x).subtract(this.x.clone().multiply(value.z)),
            this.x.clone().multiply(value.y).subtract(this.y.clone().multiply(value.x))
        )
    }

    public reduce() {
        // reduce the components of the vector
        this.x.reduce()
        this.y.reduce()
        this.z.reduce()

        // assume it's a direction - means we can divided by the gcd of the components
        const gcd = Numeric.gcd(this.x.numerator, this.y.numerator, this.z.numerator)
        if (gcd > 1) {
            this.x.divide(gcd)
            this.y.divide(gcd)
            this.z.divide(gcd)
        }
        const lcm = Numeric.lcm(this.x.denominator, this.y.denominator, this.z.denominator)
        if (lcm > 1) {
            this.x.multiply(lcm)
            this.y.multiply(lcm)
            this.z.multiply(lcm)
        }
        // Make the first component positive.
        if (this.x.isNegative()) {
            this.x.opposite()
            this.y.opposite()
            this.z.opposite()
        }
        return this
    }
}

export class Point3D extends Vector3D {
    constructor(x: InputValue<Fraction>, y: InputValue<Fraction>, z: InputValue<Fraction>) {
        super(x, y, z)

        this.asPoint = true
    }

    public clone(): Point3D {
        return new Point3D(this.x, this.y, this.z)
    }

    get tex(): string {
        return `\\left( ${this.x.tex} ; ${this.y.tex} ; ${this.z.tex} \\right)`
    }

    get display(): string {
        return `(${this.x.display};${this.y.display};${this.z.display})`
    }
}