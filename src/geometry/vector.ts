/**
 * Vector2D module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
import type { InputValue } from "../pimath.interface"
import { Fraction } from "../coefficients/fraction"
import { Numeric } from "../numeric"
import { areVectorsColinears, areVectorsEquals, dotProduct } from "./geomMath"

export class Vector {
    #x: Fraction = new Fraction().zero()   // 1st component
    #y: Fraction = new Fraction().zero()  // 2nd component
    #asPoint = false

    constructor()
    constructor(Vector2D: Vector)
    constructor(start: Vector, end: Vector)
    constructor(a: InputValue<Fraction>, b: InputValue<Fraction>)
    constructor(start?: Vector | InputValue<Fraction>, end?: Vector | InputValue<Fraction>) {
        if (start !== undefined) {
            this.parse(start, end)
        }
    };

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
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

    get asPoint(): boolean {
        return this.#asPoint
    }

    set asPoint(value: boolean) {
        this.#asPoint = value
    }


    get normSquare(): Fraction {
        return this.#x.clone().pow(2).add(this.#y.clone().pow(2))
    }

    get norm(): number {
        return Math.sqrt(this.normSquare.value)
    }

    get tex(): string {
        if (this.#asPoint) {
            return `\\left(${this.array.map(x => x.tex).join(';')}\\right)`
        }

        return `\\begin{pmatrix} ${this.array.map(x => x.tex).join(' \\\\ ')} \\end{pmatrix}`
    }

    get display(): string {
        if (this.#asPoint) {
            return `(${this.array.map(x => x.display).join(';')})`
        }

        return `((${this.array.map(x => x.display).join(',')}))`
    }

    get array(): Fraction[] {
        return [this.#x, this.#y]
    }

    get dimension(): number {
        return this.array.length
    }

    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    get isNull(): boolean {
        return this.array.every(x => x.isZero())
    }

    static asTex(x: string, y: string): string {
        return `\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}`

    }

    static scalarProduct = (v1: Vector, v2: Vector): Fraction => {
        if (v1.dimension !== v2.dimension) {
            throw new Error('Vectors must have the same dimension')
        }

        return v1.x.clone().multiply(v2.x).add(v1.y.clone().multiply(v2.y))
    }

    static determinant = (v1: Vector, v2: Vector): Fraction => {
        return v1.x.clone().multiply(v2.y).subtract(v1.y.clone().multiply(v2.x))
    }

    parse = (
        start: Vector | InputValue<Fraction> | { x: Fraction | number, y: Fraction | number },
        end?: Vector | InputValue<Fraction> | { x: Fraction | number, y: Fraction }
    ): Vector => {
        // Maybe more than one value was given...
        // Initialize the vector
        this.zero()


        if (end === undefined) {
            if (start instanceof Vector) {
                return start.clone()
            } else {
                // TODO: Check what is _parseString
                return this._parseString(start as string)
            }
        }

        // Two values are given
        if (start instanceof Vector && end instanceof Vector) {
            this.#x = end.x.clone().subtract(end.x)
            this.#y = end.x.clone().subtract(end.y)
            return this
        }

        // Two fractions are given
        if ((start instanceof Fraction || typeof start === 'number' || typeof start === 'string')
            &&
            (end instanceof Fraction || typeof end === 'number' || typeof end === 'string')
        ) {
            this.#x = new Fraction(start)
            this.#y = new Fraction(end)
            return this
        }

        // Maybe, it's any object with x and y values (x, y as Fractions or numbers)
        if (
            typeof start === 'object' && Object.hasOwn(start, 'x') && Object.hasOwn(start, 'y') &&
            typeof end === 'object' && Object.hasOwn(end, 'x') && Object.hasOwn(end, 'y')
        ) {
            const fa = start as { x: Fraction | number, y: Fraction | number },
                fb = end as { x: Fraction | number, y: Fraction | number }
            this.#x = new Fraction(fa.x).clone().subtract(fb.x)
            this.#y = new Fraction(fa.y).clone().subtract(fb.y)
            return this
        }

        return this
    }

    public clone(): Vector {
        const V = new Vector()


        V.x = this.x.clone()
        V.y = this.y.clone()

        return V
    }

    zero = (): this => {
        this.#x = new Fraction(0)
        this.#y = new Fraction(0)
        return this
    }

    one = (): this => {
        this.#x = new Fraction(1)
        this.#y = new Fraction(0)
        return this
    }

    opposite = (): this => {
        this.#x.opposite()
        this.#y.opposite()
        return this
    }

    add = (V: Vector): this => {
        this.#x.add(V.x)
        this.#y.add(V.y)

        return this
    }

    subtract = (V: Vector): this => {
        return this.add(V.clone().opposite())
    }

    unit = (): this => {
        const norm = this.norm
        if (norm === 0) {
            return this
        }

        return this.divideByScalar(norm)
    }

    middleOf = (V1: Vector, V2: Vector): this => {
        this.#x = V1.x.clone().add(V2.x).divide(2)
        this.#y = V1.y.clone().add(V2.y).divide(2)

        return this
    }

    translate(value: Vector): this
    translate(value: { x: number | Fraction, y: number | Fraction }): this
    translate(value: Vector | { x: number | Fraction, y: number | Fraction }): this {
        this.#x.add(value.x)
        this.#y.add(value.y)
        return this
    }

    distanceTo(item: Vector): { value: number, fraction: Fraction, tex: string } {
        const V = new Vector(this, item)

        return {
            value: V.norm,
            fraction: V.normSquare,
            tex: V.tex
        }
    }



    dotProduct = (V: Vector): Fraction => {
        return dotProduct(this, V)
    }

    determinantWith = (V: Vector): Fraction => {
        return Vector.determinant(this, V)
    }

    normal = (): this => {
        const x = this.x.clone().opposite(),
            y = this.y.clone()
        this.#x = y
        this.#y = x
        return this
    }

    isEqual = (v: Vector): boolean => {
        return areVectorsEquals(this, v)
    }

    isColinearTo = (v: Vector): boolean => {
        return areVectorsColinears(this, v)
    }

    isNormalTo = (v: Vector): boolean => {
        return this.dotProduct(v).isZero()
    }

    multiplyByScalar = (k: InputValue<Fraction>): this => {
        const scalar = new Fraction(k)
        this.#x.multiply(scalar)
        this.#y.multiply(scalar)
        return this
    }

    divideByScalar = (k: InputValue<Fraction>): this => {
        return this.multiplyByScalar(new Fraction(k).inverse())
    }

    simplify = (): this => {
        // Multiply by the lcm of denominators.
        return this
            .multiplyByScalar(
                Numeric.lcm(this.#x.denominator, this.#y.denominator)
            )
            .divideByScalar(
                Numeric.gcd(this.#x.numerator, this.#y.numerator)
            )
    }

    angleWith = (V: Vector, sharp?: boolean, radian?: boolean): number => {

        let scalar = this.dotProduct(V).value
        if (sharp) {
            scalar = Math.abs(scalar)
        }

        const toDegree = radian ? 1 : 180 / Math.PI

        return toDegree * Math.acos(scalar / (this.norm * V.norm))
    }

    private _parseString = (value: string): this => {
        // Remove the first letter if it's a bracket.
        if (value.startsWith('(')) {
            value = value.substring(1)
        }
        // Remove the last letter if it's a bracket.
        if (value.endsWith(')')) {
            value = value.substring(0, value.length - 1)
        }

        // Split comma, semi colon or single space.
        const components = value.split(/[,;\s]/g)
            .filter((v) => v.trim() !== '')

        // there must be at least two components.
        if (components.length < 2) {
            return this
        }

        // Validate the fraction values.
        this.x = new Fraction(components[0])
        this.y = new Fraction(components[1])
        return this
    }
}

export class Point extends Vector {
    constructor()
    constructor(Point2D: Point)
    constructor(x: InputValue<Fraction>, y: InputValue<Fraction>)
    constructor(start?: Point | InputValue<Fraction>, end?: InputValue<Fraction>) {
        super()

        if (start !== undefined) {
            this.parse(start, end)
        }

        this.asPoint = true
    }

    public override clone(): Point {
        return new Point(this.x, this.y)
    }

    override get tex(): string {
        return `\\left(${this.array.map(x => x.tex).join(';')}\\right)`
    }

    override get display(): string {
        return `(${this.array.map(x => x.display).join(';')})`
    }

}