import {Fraction} from "../coefficients/fraction";

/**
 * Represents an angle in radians.
 * a radian value is \alpha = \frac{a\pi}{b}+kc\pi
 */
export class Radian {
    private _value: Fraction
    private _period: Fraction

    constructor(value: string | number | Fraction | Radian, period?: string | number | Fraction) {
        if (value instanceof Radian) {
            this._value = value.value.clone()
            this._period = value.period.clone()
        } else {
            this._value = new Fraction(value)
            this._period = period===undefined ? new Fraction(0) : new Fraction(period)
        }
    }

    get value(): Fraction {
        return this._value;
    }

    get period(): Fraction {
        return this._period;
    }

    clone(): Radian {
        return new Radian(this._value.clone(), this._period.clone())
    }

    get tex(): string {
        return this._formattedTex(this._value) +
            (this._period.isZero() ? '' : `+k${this._formattedTex(this._period)}`)
    }

    get display(): string {
        return this._formattedTex(this._value, false) +
            (this._period.isZero() ? '' : `+k${this._formattedTex(this._period, false)}`)
    }

    private _formattedTex(f: Fraction, asTex?: boolean): string {
        let n = "",
            d = ""

        const piStr = asTex === false ? 'pi' : '\\pi'

        if (Math.abs(f.numerator) === 1) {
            n = (f.numerator < 0 ? '-' : '') + piStr
        }else{
            n = f.numerator + piStr
        }

        if(f.isRational()){
            if(asTex === false){
                return `${n}/${f.denominator}`
            }else{
                return `\\frac{ ${n} }{ ${f.denominator} }`
            }
        }

        return n
    }


}