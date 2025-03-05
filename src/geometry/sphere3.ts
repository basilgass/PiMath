import {Point} from "./point"
import {Fraction} from "../coefficients"
import {Equation, Polynom} from "../algebra"
import type {InputValue} from "../pimath.interface"

enum SPHERE3_FORMAT {
    DEVELOPPED,
    CENTER_RADIUS
}

export enum SPHERE3_RELATIVE_POSITION {
    INTERIOR,
    EXTERIOR,
    SECANT,
    TANGENT_INSIDE,
    TANGENT_OUTSIDE,
    SUPERPOSED,
    CONCENTRIC
}

export class Sphere3 {
    #center: Point | undefined = undefined
    #squareRadius: Fraction | undefined = undefined
    #equation: Equation | undefined = undefined
    #format: SPHERE3_FORMAT = SPHERE3_FORMAT.CENTER_RADIUS

    constructor(center?: Point, radius?: InputValue<Fraction>) {
        if (center && radius) {
            this.#center = center
            this.#squareRadius = new Fraction(radius).clone().pow(2)
            this.#computeEquation()
        }
        return this
    }

    fromEquation(equation: Equation | string): this {
        const equ = new Equation(equation).moveLeft().reduce()

        // Check that x, y, z has the same power and same coefficient.
        const letters = ['x', 'y', 'z']

        if (letters.some((letter) => equ.degree(letter).value !== 2)){
            return this.makeUndefined()
        }

        const coefficient = equ.left.monomByDegree(2, 'x').coefficient
        if (letters.some((letter) => equ.left.monomByDegree(2, letter).coefficient.isNotEqual(coefficient))) {
            return this.makeUndefined()
        }

        this.#center = new Point(
            equ.left.monomByDegree(1, 'x').coefficient.clone().opposite().divide(2),
            equ.left.monomByDegree(1, 'y').coefficient.clone().opposite().divide(2),
            equ.left.monomByDegree(1, 'z').coefficient.clone().opposite().divide(2)
        )

        this.#squareRadius = equ.left.monomByDegree(0)
            .coefficient.clone().opposite()
            .add(this.#center.x.clone().pow(2))
            .add(this.#center.y.clone().pow(2))
            .add(this.#center.z.clone().pow(2))

        this.#computeEquation()
        return this
    }

    get center(): Point {
        if (this.#center === undefined) {
            throw new Error('Sphere3 is undefined')
        }
        return this.#center
    }

    get squareRadius(): Fraction {
        if (this.#squareRadius === undefined) {
            throw new Error('Sphere3 is undefined')
        }
        return this.#squareRadius
    }

    get radius(): { tex: string, display: string, value: number } {
        if (this.#squareRadius === undefined) {
            throw new Error('Sphere3 is undefined')
        }

        if (this.#squareRadius.isSquare()) {
            return {
                tex: this.#squareRadius.clone().sqrt().tex,
                display: this.#squareRadius.clone().sqrt().display,
                value: this.#squareRadius.clone().sqrt().value
            }
        } else {
            return {
                tex: `\\sqrt{${this.#squareRadius.tex}}`,
                display: `sqrt(${this.#squareRadius.display})`,
                value: this.#squareRadius.clone().sqrt().value
            }
        }
    }

    get equation(): Equation {
        if (this.#equation === undefined) {
            throw new Error('Sphere3 is undefined')
        }
        return this.#equation
    }

    makeUndefined(): this {
        this.#center = undefined
        this.#squareRadius = undefined
        this.#equation = undefined
        return this
    }

    get centerRadius(): this {
        this.#format = SPHERE3_FORMAT.CENTER_RADIUS
        return this
    }

    get developped(): this {
        this.#format = SPHERE3_FORMAT.DEVELOPPED
        return this
    }


    get tex(): string {
        return this.#output(true)
    }

    get display(): string {
        return this.#output(false)
    }

    #output = (asTex: boolean): string => {
        if (this.#equation === undefined) {
            throw new Error('Sphere3 is undefined')
        }

        if (this.#format === SPHERE3_FORMAT.DEVELOPPED) {
            return asTex ? this.#equation.tex : this.#equation.display
        }

        const output: string[] = []
        const letters: ('x' | 'y' | 'z')[] = ['x', 'y', 'z']

        letters.forEach((letter: 'x' | 'y' | 'z') => {
            if (this.center[letter].isZero()) {
                output.push(`${letter}^2`)
            } else {
                const P = new Polynom(letter).subtract(this.center[letter])
                output.push(
                    asTex ?
                        `\\(${P.tex}\\)^2` :
                        `(${P.display})^2`
                )
            }
        })

        return output.join('+') + '=' + (asTex ? this.squareRadius.tex : this.squareRadius.display)

    }

    #computeEquation(): void {
        this.#equation = new Equation(
            new Polynom('x').subtract(this.center.x).pow(2)
                .add(
                    new Polynom('y').subtract(this.center.y).pow(2)
                )
                .add(
                    new Polynom('z').subtract(this.center.z).pow(2)
                ),
            new Polynom(this.squareRadius)
        ).reduce()
    }

    static RELATIVE_POSITION = SPHERE3_RELATIVE_POSITION
    relativePosition = (S: Sphere3): SPHERE3_RELATIVE_POSITION => {
        const distance = this.center.distanceTo(S.center).value
        const r1 = this.radius.value
        const r2 = S.radius.value

        if (distance > r1 + r2) {
            return SPHERE3_RELATIVE_POSITION.EXTERIOR
        }

        if (distance === r1 + r2) {
            return SPHERE3_RELATIVE_POSITION.TANGENT_OUTSIDE
        }

        if(distance===0) {
            return r1===r2 ? SPHERE3_RELATIVE_POSITION.SUPERPOSED : SPHERE3_RELATIVE_POSITION.CONCENTRIC
        }

        if (distance === Math.abs(r1 - r2)) {
            return SPHERE3_RELATIVE_POSITION.TANGENT_INSIDE
        }


        if (distance < Math.abs(r1 - r2)) {
            return SPHERE3_RELATIVE_POSITION.INTERIOR
        }

        return SPHERE3_RELATIVE_POSITION.SECANT

    }

    isPointOnSphere = (P: Point): boolean => {
        return this.#equation?.test({
            x: P.x,
            y: P.y,
            z: P.z
        }) ?? false
    }
}