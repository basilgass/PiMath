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
        console.log('GETTING ZEROES')
        return this._getZeroes(this.fx)
    };

    makeSigns(): ITableOfSigns {
        let tos = this._getSigns(this.fx, this.zeroes)
        return tos
    };

    makeAsymptotes(): IAsymptote[] {
        const reduced: Rational = this.fx.clone().reduce()

        // Vertical
        let asymptotes: IAsymptote[] = []
        this.zeroes.filter(x => x.type === ZEROTYPE.DEFENCE).forEach(zero => {
            // Check if it's a hole or an asymptote
            // TODO: Check for a hole ! Means calculate the limits !
            let Ztype = ASYMPTOTE.VERTICAL,
                tex = `x=${zero.tex}`
            if (zero.exact instanceof Fraction) {
                if (reduced.denominator.evaluate(zero.exact).isNotZero()) {
                    Ztype = ASYMPTOTE.HOLE
                    tex = `(${zero.tex};${reduced.evaluate(zero.exact).tex})`
                }
            } else {
                if (reduced.denominator.evaluate(zero.value).isNotZero()) {
                    Ztype = ASYMPTOTE.HOLE
                    tex = `(${zero.tex};${reduced.evaluate(zero.value).tex})`
                }
            }

            asymptotes.push({
                type: Ztype,
                tex: tex,
                zero: zero,
                limits: `\\lim_{x\\to${zero.tex} }\\ f(x) = \\pm\\infty`,
                deltaX: null
            })
        })

        // Sloped asymptote
        let NDegree = this.fx.numerator.degree(),
            DDegree = this.fx.denominator.degree()
        if (NDegree.isEqual(DDegree)) {
            let H = this.fx.numerator.monomByDegree().coefficient.clone().divide(this.fx.denominator.monomByDegree().coefficient).tex

            let {reminder} = reduced.euclidian()

            asymptotes.push({
                type: ASYMPTOTE.HORIZONTAL,
                tex: `y=${H}`,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = ${H}`,
                deltaX: new Rational(reminder, reduced.denominator)
            })
        } else if (DDegree.greater(NDegree)) {
            asymptotes.push({
                type: ASYMPTOTE.HORIZONTAL,
                tex: `y=0`,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = ${0}`,
                deltaX: null
            })
        } else if (NDegree.value - 1 === DDegree.value) {
            // Calculate the slope
            let {quotient, reminder} = reduced.euclidian()

            asymptotes.push({
                type: ASYMPTOTE.SLOPE,
                tex: `y=${quotient.tex}`,
                zero: null,
                limits: ``,
                deltaX: new Rational(reminder, reduced.denominator)
            })
        }

        return asymptotes
    };

    makeDerivative(): ITableOfSigns {
        let dx = this.fx.clone().derivative(),
            tos = this._getSigns(dx, this._getZeroes(dx), TABLE_OF_SIGNS.GROWS)

        console.log(tos.factors.length, tos.signs.length)
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

    private _getSigns(fx: Rational, zeroes: IZero[], typeOfTable?: TABLE_OF_SIGNS): ITableOfSigns {
        // Factorize the rational
        let signs: (string[])[] = [],
            factors: Polynom[] = []

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
