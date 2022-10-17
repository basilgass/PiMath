/**
 * The study class is a "function study" class that will get:
 * fx               : get the function
 * domain           : string
 * zeroes           : Object (tex, IZero)
 * signs            : table of signs + tex output  using tkz-tab
 * av               : vertical asymptotic
 * ah               : horizontal asymptotic
 * ao               : obliques
 * deltaX           : position relative
 * dx               : derivative
 * grows            : growing table + tex output  using tkz-tab
 * ddx              : dérivée seconde
 * variations       : variation table + tex output  using tkz-tab
 */
import {
    ASYMPTOTE,
    ASYMPTOTE_POSITION,
    FUNCTION_EXTREMA,
    IAsymptote,
    ITableOfSigns,
    IZero,
    Study,
    StudyableFunction,
    TABLE_OF_SIGNS,
    ZEROTYPE
} from "../study";
import {Rational} from "../rational";
import {Fraction} from "../../coefficients/fraction";
import {Polynom} from "../polynom";

export class RationalStudy extends Study {
    constructor(fx: StudyableFunction) {
        super(fx)

        return this
    }

    makeZeroes(): IZero[] {
        return this._getZeroes(this.fx)
    };

    makeSigns(): ITableOfSigns {
        return this._getSigns(this.fx, this.zeroes)
    };

    makeAsymptotes(): IAsymptote[] {
        const reduced: Rational = this.fx.clone().reduce()

        // Vertical
        let asymptotes: IAsymptote[] = []
        this.zeroes.filter(x => x.type === ZEROTYPE.DEFENCE).forEach(zero => {
            // Check if it's a hole or an asymptote
            let Ztype = ASYMPTOTE.VERTICAL,
                tex = `x=${zero.tex}`,
                display = `x=${zero.display}`

            // Check if it's a hole: the reduced polynom should not be null
            if (zero.exact instanceof Fraction) {
                if (reduced.denominator.evaluate(zero.exact).isNotZero()) {
                    Ztype = ASYMPTOTE.HOLE
                    tex = `(${zero.tex};${reduced.evaluate(zero.exact).tex})`
                    display = `(${zero.display};${reduced.evaluate(zero.exact).display})`
                }
            } else {
                if (reduced.denominator.evaluate(zero.value).isNotZero()) {
                    Ztype = ASYMPTOTE.HOLE
                    tex = `(${zero.tex};${reduced.evaluate(zero.value).tex})`
                    display = `(${zero.display};${reduced.evaluate(zero.value).display})`
                }
            }

            // Get the position before and after the asymptote.
            const delta = 0.000001
            let before = this.fx.evaluateAsNumeric(zero.value - delta),
                after = this.fx.evaluateAsNumeric(zero.value + delta),
                position: ASYMPTOTE_POSITION[] = [],
                pm = ""

            if (after < -10000) {
                position.push(ASYMPTOTE_POSITION.RB)
                pm += "m"
            } else if (after > 10000) {
                position.push(ASYMPTOTE_POSITION.RT)
                pm += "p"
            }

            if (before < -10000) {
                position.push(ASYMPTOTE_POSITION.LB)
                pm += "m"
            } else if (before > 10000) {
                position.push(ASYMPTOTE_POSITION.LT)
                pm += "p"
            }

            // Left and right are to infinity
            // TODO: handle the case were one side of the asymptote isn't infinity (not possible in rational study?!)
            if (pm === "pp") {
                pm = "+"
            } else if (pm === "mm") {
                pm = "-"
            } else {
                pm = `\\${pm}`
            }

            asymptotes.push({
                fx: null,
                type: Ztype,
                tex,
                display,
                zero: zero,
                limits: `\\lim_{x\\to${zero.tex} }\\ f(x) = ${pm}\\infty`,
                deltaX: null,
                tableOfSign: null,
                position
            })
        })

        // Sloped asymptote
        let NDegree = this.fx.numerator.degree(),
            DDegree = this.fx.denominator.degree()
        if (NDegree.isEqual(DDegree)) {
            let H = this.fx.numerator.monomByDegree().coefficient.clone().divide(this.fx.denominator.monomByDegree().coefficient),
                Htex = H.tex

            let {reminder} = reduced.euclidian(),
                deltaX = new Rational(reminder, reduced.denominator)

            // Determine the position above or below on the left / right of the asymptote.
            asymptotes.push({
                fx: new Polynom(H),
                type: ASYMPTOTE.HORIZONTAL,
                tex: `y=${Htex}`,
                display: H.display,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = ${Htex}`,
                deltaX,
                tableOfSign: this._getSigns(deltaX),
                position: this._getHorizontalAsymptoteRelativePositon(deltaX)
            })
        } else if (DDegree.greater(NDegree)) {
            asymptotes.push({
                fx: new Polynom('0'),
                type: ASYMPTOTE.HORIZONTAL,
                tex: `y=0`,
                display: `y=0`,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = ${0}`,
                deltaX: null,
                tableOfSign: null,
                position: this._getHorizontalAsymptoteRelativePositon(this.fx)
            })
        } else if (NDegree.value - 1 === DDegree.value) {
            // Calculate the slope
            let {quotient, reminder} = reduced.euclidian(),
                deltaX = new Rational(reminder, reduced.denominator)

            asymptotes.push({
                fx: quotient.clone(),
                type: ASYMPTOTE.SLOPE,
                tex: `y=${quotient.tex}`,
                display: `y=${quotient.display}`,
                zero: null,
                limits: ``,
                deltaX: new Rational(reminder, reduced.denominator),
                tableOfSign: this._getSigns(deltaX),
                position: this._getHorizontalAsymptoteRelativePositon(deltaX)
            })
        }

        return asymptotes
    };

    _getHorizontalAsymptoteRelativePositon(deltaX: Rational, delta: number = 1000000): ASYMPTOTE_POSITION[] {

        let position: ASYMPTOTE_POSITION[] = [],
            before = deltaX.evaluateAsNumeric(-delta),
            after = deltaX.evaluateAsNumeric(delta)

        if (before >= 0) {
            position.push(ASYMPTOTE_POSITION.LT)
        } else {
            position.push(ASYMPTOTE_POSITION.LB)
        }

        if (after >= 0) {
            position.push(ASYMPTOTE_POSITION.RT)
        } else {
            position.push(ASYMPTOTE_POSITION.RB)
        }

        return position
    }

    makeDerivative(): ITableOfSigns {
        let dx = this.fx.clone().derivative(),
            tos = this._getSigns(dx, this._getZeroes(dx), TABLE_OF_SIGNS.GROWS)

        let result = this.makeGrowsResult(tos)
        tos.signs.push(result.growsLine)
        tos.extremes = result.extremes
        return tos
    };

    makeVariation(): ITableOfSigns {
        // Get the zeroes, make signs.
        let dx = this.derivative.fx.clone().derivative(),
            tos = this._getSigns(dx, this._getZeroes(dx), TABLE_OF_SIGNS.VARIATIONS)

        let result = this.makeVariationsResult(tos)
        tos.signs.push(result.varsLine)
        tos.extremes = result.extremes
        return tos
    };

    private _getZeroes(fx: StudyableFunction) {
        // All zeroes.
        let zeroes: IZero[] = []

        fx.numerator.getZeroes().filter(x => !isNaN(x.value)).forEach(z => {
            // add the item
            zeroes.push({
                tex: z.tex,
                display: z.display,
                value: z.value,
                exact: z.exact,
                extrema: FUNCTION_EXTREMA.NOTHING,
                type: ZEROTYPE.ZERO
            })
        })

        fx.denominator.getZeroes().filter(x => !isNaN(x.value)).forEach(z => {
            let idx = this.indexOfZero(zeroes, z)

            if (idx !== -1) {
                zeroes[idx].type = ZEROTYPE.DEFENCE
            } else {
                // Add the item
                zeroes.push({
                    tex: z.tex,
                    display: z.display,
                    value: z.value,
                    exact: z.exact,
                    extrema: FUNCTION_EXTREMA.NOTHING,
                    type: ZEROTYPE.DEFENCE
                })
            }
        })

        // sort all zeroes
        zeroes.sort((a, b) => a.value - b.value)

        return zeroes
    }

    private _getSigns(fx: Rational, zeroes?: IZero[], typeOfTable?: TABLE_OF_SIGNS): ITableOfSigns {
        // Factorize the rational
        let signs: (string[])[] = [],
            factors: Polynom[] = []

        if (zeroes === undefined) {
            zeroes = this._getZeroes(fx)
        }

        fx.numerator.factors.forEach(factor => {
            signs.push(this.makeOneLineForSigns(factor, zeroes, ZEROTYPE.ZERO))
            factors.push(factor.clone())
        })

        fx.denominator.factors.forEach(factor => {
            signs.push(this.makeOneLineForSigns(factor, zeroes, ZEROTYPE.DEFENCE))
            factors.push(factor.clone())
        })

        signs.push(this.makeSignsResult(signs))

        return {
            type: typeOfTable,
            fx,
            factors,
            zeroes,
            signs,
            extremes: {},
            tex: ''
        }
    }
}
