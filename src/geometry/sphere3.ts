import {Point} from "./point"
import {Vector} from "./vector"
import {Fraction} from "../coefficients"
import {Equation, Polynom} from "../algebra"
import type {IPiMathObject, InputValue, OutputStyle} from "../pimath.interface"
import {MathError, StateError} from "../errors"

enum Sphere3Format {
    DEVELOPPED,
    CENTER_RADIUS
}

export enum Sphere3RelativePosition {
    INTERIOR,
    EXTERIOR,
    SECANT,
    TANGENT_INSIDE,
    TANGENT_OUTSIDE,
    SUPERPOSED,
    CONCENTRIC
}

export class Sphere3
    implements IPiMathObject<Sphere3> {

    #center: Point | undefined = undefined
    #squareRadius: Fraction | undefined = undefined
    #equation: Equation | undefined = undefined
    #format: Sphere3Format = Sphere3Format.CENTER_RADIUS

    constructor()
    constructor(equation: string | Equation)
    constructor(sphere: Sphere3)
    constructor(center: Point, radius: InputValue<Fraction>, square?: boolean)
    constructor(...values: unknown[]) {
        if (values.length > 0) {
            this.parse(...values)
        }
    }

    parse(...values: unknown[]): this {
        if (typeof values[0] === 'string') {
            return this.copy(Sphere3.fromString(values[0]))
        }
        if (values[0] instanceof Equation) {
            return this.copy(Sphere3.fromEquation(values[0]))
        }
        if (values[0] instanceof Sphere3) {
            return this.copy(values[0])
        }
        if (values[0] instanceof Point && values[1] !== undefined) {
            return this.copy(Sphere3.fromCenterRadius(
                values[0],
                values[1] as InputValue<Fraction>,
                typeof values[2] === 'boolean' ? values[2] : false
            ))
        }
        return this
    }

    clone(): Sphere3 {
        if (this.#center === undefined || this.#squareRadius === undefined) {
            return new Sphere3()
        }
        const s = new Sphere3()
        s.#center = this.#center.clone()
        s.#squareRadius = this.#squareRadius.clone()
        s.#equation = this.#equation?.clone()
        s.#format = this.#format
        return s
    }

    copy(sphere: Sphere3): this {
        if (sphere.#center === undefined || sphere.#squareRadius === undefined) {
            this.#reset()
            return this
        }
        this.#center = sphere.#center.clone()
        this.#squareRadius = sphere.#squareRadius.clone()
        this.#format = Sphere3Format.CENTER_RADIUS
        this.#computeEquation()
        return this
    }

    static fromCenterRadius(center: Point, radius: InputValue<Fraction>, square?: boolean): Sphere3 {
        const s = new Sphere3()
        s.#center = center.clone()
        s.#squareRadius = square ? new Fraction(radius) : new Fraction(radius).pow(2)
        s.#computeEquation()
        return s
    }

    /**
     * Does not mutate `equ`.
     * @throws {MathError} if `equ` is not a valid sphere equation (degree ≠ 2 in x/y/z, or unequal leading coefficients)
     */
    static fromEquation(equ: Equation): Sphere3 {
        const s = new Sphere3()
        const eq = equ.clone().moveLeft().reduce()
        const variables = ['x', 'y', 'z']

        for (const variable of variables) {
            if (eq.degree(variable).value !== 2) {
                throw new MathError('Cannot create a Sphere3: equation must be degree 2 in x, y and z')
            }
        }

        const coefficient = eq.left.monomByDegree(2, 'x').coefficient
        for (const variable of variables) {
            if (eq.left.monomByDegree(2, variable).coefficient.isNotEqual(coefficient)) {
                throw new MathError('Cannot create a Sphere3: coefficients of x², y² and z² must be equal')
            }
        }

        eq.divide(coefficient)

        s.#center = new Point(
            eq.left.monomByDegree(1, 'x').coefficient.clone().divide(2).opposite(),
            eq.left.monomByDegree(1, 'y').coefficient.clone().divide(2).opposite(),
            eq.left.monomByDegree(1, 'z').coefficient.clone().divide(2).opposite()
        )

        s.#squareRadius = eq.left.monomByDegree(0)
            .coefficient.clone().opposite()
            .add(s.#center.x.clone().pow(2))
            .add(s.#center.y.clone().pow(2))
            .add(s.#center.z.clone().pow(2))

        s.#computeEquation()
        return s
    }

    static fromString(str: string): Sphere3 {
        return Sphere3.fromEquation(new Equation(str))
    }

    get center(): Point {
        if (this.#center === undefined) {
            throw new StateError('Sphere3 is undefined')
        }
        return this.#center
    }

    get squareRadius(): Fraction {
        if (this.#squareRadius === undefined) {
            throw new StateError('Sphere3 is undefined')
        }
        return this.#squareRadius
    }

    get radius(): { tex: string, display: string, value: number } {
        if (this.#squareRadius === undefined) {
            throw new StateError('Sphere3 is undefined')
        }

        if (this.#squareRadius.isSquare()) {
            const sqrt = this.#squareRadius.clone().sqrt()
            return {tex: sqrt.tex, display: sqrt.display, value: sqrt.value}
        }

        return {
            tex: `\\sqrt{${this.#squareRadius.tex}}`,
            display: `sqrt(${this.#squareRadius.display})`,
            value: this.#squareRadius.clone().sqrt().value
        }
    }

    get equation(): Equation {
        if (this.#equation === undefined) {
            throw new StateError('Sphere3 is undefined')
        }
        return this.#equation
    }

    get asCenterRadius(): this {
        this.#format = Sphere3Format.CENTER_RADIUS
        return this
    }

    get asDeveloped(): this {
        this.#format = Sphere3Format.DEVELOPPED
        return this
    }

    get tex(): string {
        return this.#toOutput('tex')
    }

    get display(): string {
        return this.#toOutput('display')
    }

    #reset(): void {
        this.#center = undefined
        this.#squareRadius = undefined
        this.#equation = undefined
    }

    #toOutput(style: OutputStyle): string {
        if (this.#equation === undefined) {
            throw new StateError('Sphere3 is undefined')
        }

        if (this.#format === Sphere3Format.DEVELOPPED) {
            return style === 'tex' ? this.#equation.tex : this.#equation.display
        }

        const output: string[] = []
        const variables: ('x' | 'y' | 'z')[] = ['x', 'y', 'z']

        variables.forEach((variable: 'x' | 'y' | 'z') => {
            if (this.center[variable].isZero()) {
                output.push(`${variable}^2`)
            } else {
                const P = new Polynom(variable).subtract(this.center[variable])
                output.push(
                    style === 'tex' ?
                        `\\(${P.tex}\\)^2` :
                        `(${P.display})^2`
                )
            }
        })

        return output.join('+') + '=' + (style === 'tex' ? this.squareRadius.tex : this.squareRadius.display)
    }

    #computeEquation(): void {
        const x = Polynom.fromCoefficients('x', 1, this.center.x.clone().opposite()).pow(2)
        const y = Polynom.fromCoefficients('y', 1, this.center.y.clone().opposite()).pow(2)
        const z = Polynom.fromCoefficients('z', 1, this.center.z.clone().opposite()).pow(2)
        const k = Polynom.fromConstant(this.squareRadius)
        this.#equation = new Equation(x.add(y).add(z).subtract(k), 0)
    }

    static RELATIVE_POSITION = Sphere3RelativePosition
    relativePosition(S: Sphere3): Sphere3RelativePosition {
        const d2 = new Vector(this.center, S.center).normSquare
        const SR1 = this.squareRadius
        const SR2 = S.squareRadius

        if (d2.isZero()) {
            return SR1.isEqual(SR2)
                ? Sphere3RelativePosition.SUPERPOSED
                : Sphere3RelativePosition.CONCENTRIC
        }

        // A = d² − r1² − r2² ; equals +2r1r2 when d=r1+r2, −2r1r2 when d=|r1−r2|
        // B = (2r1r2)² = 4·r1²·r2'  →  A²=B iff d is tangent
        const A = d2.clone().subtract(SR1).subtract(SR2)
        const B = SR1.clone().multiply(SR2).multiply(4)
        const ASquaredMinusB = A.clone().pow(2).subtract(B)

        if (ASquaredMinusB.isZero()) {
            return A.isNegative()
                ? Sphere3RelativePosition.TANGENT_INSIDE
                : Sphere3RelativePosition.TANGENT_OUTSIDE
        }

        if (!ASquaredMinusB.isNegative()) {
            return A.isNegative()
                ? Sphere3RelativePosition.INTERIOR
                : Sphere3RelativePosition.EXTERIOR
        }

        return Sphere3RelativePosition.SECANT
    }

    isPointOnSphere(P: Point): boolean {
        return this.#equation?.test({
            x: P.x,
            y: P.y,
            z: P.z
        }) ?? false
    }

    isEqual(S: Sphere3): boolean {
        return S.center.isEqual(this.center)
            && S.squareRadius.isEqual(this.squareRadius)
    }
}
