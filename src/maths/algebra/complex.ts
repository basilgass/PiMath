import {Polynom} from "./polynom";
import {numericType} from "../types";
import {RootFraction} from "../coefficients/rootFraction";


export class Complex {
    constructor(...values: unknown[]) {
        if (values.length === 0) {
            this._real = new RootFraction(0)
            this._imaginary = new RootFraction(0)
        } else if (values.length === 1 && values[0] instanceof Complex) {
            this._real = (values[0] as Complex).real
            this._imaginary = (values[0] as Complex).imaginary
        } else if (values.length === 1 && (typeof values[0] === 'string')) {
            // it's a complex number : a+bi => parse using regex
            let cplxPolynom = new Polynom(values[0])
            if (cplxPolynom.degree().value > 1) {
                throw new Error('Invalid complex number')
            }

            this._real = new RootFraction(cplxPolynom.monomByDegree(0).coefficient as RootFraction)
            this._imaginary = new RootFraction(cplxPolynom.monomByDegree(1).coefficient as RootFraction)
        } else if (values.length === 1) {
            this._real = new RootFraction(values[0] as numericType)
            this._imaginary = new RootFraction(0)
        } else if (values.length >= 1) {
            this._real = new RootFraction(values[0] as numericType)
            this._imaginary = new RootFraction((values[1] as numericType) ?? 0)
        }
    }

    protected _real: RootFraction

    get real(): RootFraction {
        return this._real;
    }

    set real(value: RootFraction) {
        this._real = new RootFraction(value);
    }

    protected _imaginary: RootFraction

    get imaginary(): RootFraction {
        return this._imaginary;
    }

    set imaginary(value: RootFraction) {
        this._imaginary = new RootFraction(value);
    }

    get polynomial(): Polynom {
        return new Polynom("i", this._imaginary, this._real)
    }

    get display(): string {
        return this.polynomial.reorder('i', true).display
    }

    get tex(): string {
        return this.polynomial.reorder('i', true).tex
    }

    clone(): Complex {
        return new Complex(this._real.clone(), this._imaginary.clone())
    }

    add(value: Complex | numericType): Complex {
        let z = new Complex(value)
        this._real.add(z.real)
        this._imaginary.add(z.imaginary)
        return this
    }

    subtract(value: Complex | numericType): Complex {
        let z = new Complex(value)
        this._real.subtract(z.real)
        this._imaginary.subtract(z.imaginary)
        return this
    }

    multiply(value: Complex | numericType): Complex {
        let z = new Complex(value)

        let real = this._real.clone()
        this._real.multiply(z.real)
        this._real.subtract(this._imaginary.clone().multiply(z.imaginary))
        this._imaginary.multiply(z.real)
        this._imaginary.add(real.multiply(z.imaginary))
        return this
    }

    divide(value: Complex): Complex {
        let denominator = value.real.clone().pow(2).add(value.imaginary.clone().pow(2))
        this.multiply(value.conjugate())
        this._real.divide(denominator)
        this._imaginary.divide(denominator)
        return this
    }

    pow(value: RootFraction | number): Complex {
        let F = new RootFraction(value)

        if (F.isRational()) {
            throw new Error('Cannot raise a complex number to a rational power')
        }

        let p = F.value - 1,
            z = this.clone()

        for (let i = 0; i < p; i++) {
            this.multiply(z)
        }
        return this
    }

    sqrt(): Complex {
        // x^2 - y^2 = a
        // 2xy = b
        // x^2 + y^2 = sqrt(a^2+b^2)
        // => 2x^2 = sqrt(a^2+b^2) + a
        // => x = sqrt((sqrt(a^2+b^2) + a)/2)
        // => y = b/2x
        let a2 = this._real.clone().pow(2),
            b2 = this._imaginary.clone().pow(2),
            x = a2.clone().add(b2).sqrt().add(this._real).divide(2).sqrt(),
            y = this._imaginary.clone().divide(x).divide(2)
        this._real = x
        this._imaginary = y
        return this
    }

    conjugate(): Complex {
        this._imaginary.opposite()
        return this
    }

    modulusSquared(): RootFraction {
        return this._real.clone().pow(2).add(this._imaginary.clone().pow(2))
    }

    argument(): RootFraction {
        return new RootFraction(Math.atan2(this._imaginary.value, this._real.value))
    }

}