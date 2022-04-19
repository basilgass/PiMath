"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.RationalStudy = void 0;
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
const study_1 = require("../study");
const rational_1 = require("../rational");
const fraction_1 = require("../../coefficients/fraction");
class RationalStudy extends study_1.Study {
    constructor(fx) {
        console.log('RATIONAL STUDY');
        super(fx);
        return this;
    }
    makeZeroes() {
        console.log('GETTING ZEROES');
        return this._getZeroes(this.fx);
    }
    ;
    makeSigns() {
        return this._getSigns(this.fx, this.zeroes);
    }
    ;
    makeAsymptotes() {
        const reduced = this.fx.clone().reduce();
        // Vertical
        let asymptotes = [];
        this.zeroes.filter(x => x.type === study_1.ZEROTYPE.DEFENCE).forEach(zero => {
            // Check if it's a hole or an asymptote
            // TODO: Check for a hole ! Means calculate the limits !
            let Ztype = study_1.ASYMPTOTE.VERTICAL, tex = `x=${zero.tex}`;
            if (zero.exact instanceof fraction_1.Fraction) {
                if (reduced.denominator.evaluate(zero.exact).isNotZero()) {
                    Ztype = study_1.ASYMPTOTE.HOLE;
                    tex = `(${zero.tex};${reduced.evaluate(zero.exact).tex})`;
                }
            } else {
                if (reduced.denominator.evaluate(zero.value).isNotZero()) {
                    Ztype = study_1.ASYMPTOTE.HOLE;
                    tex = `(${zero.tex};${reduced.evaluate(zero.value).tex})`;
                }
            }
            asymptotes.push({
                type: Ztype,
                tex: tex,
                zero: zero,
                limits: `\\lim_{x\\to${zero.tex} }\\ f(x) = \\pm\\infty`,
                deltaX: null
            });
        });
        // Sloped asymptote
        let NDegree = this.fx.numerator.degree(), DDegree = this.fx.denominator.degree();
        if (NDegree.isEqual(DDegree)) {
            let H = this.fx.numerator.monomByDegree().coefficient.clone().divide(this.fx.denominator.monomByDegree().coefficient).tex;
            let {reminder} = reduced.euclidian();
            asymptotes.push({
                type: study_1.ASYMPTOTE.HORIZONTAL,
                tex: `y=${H}`,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = ${H}`,
                deltaX: new rational_1.Rational(reminder, reduced.denominator)
            });
        } else if (DDegree.greater(NDegree)) {
            asymptotes.push({
                type: study_1.ASYMPTOTE.HORIZONTAL,
                tex: `y=0`,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = ${0}`,
                deltaX: null
            });
        } else if (NDegree.value - 1 === DDegree.value) {
            // Calculate the slope
            let {quotient, reminder} = reduced.euclidian();
            asymptotes.push({
                type: study_1.ASYMPTOTE.SLOPE,
                tex: `y=${quotient.tex}`,
                zero: null,
                limits: ``,
                deltaX: new rational_1.Rational(reminder, reduced.denominator)
            });
        }
        return asymptotes;
    }
    ;
    makeDerivative() {
        let dx = this.fx.clone().derivative(),
            tos = this._getSigns(dx, this._getZeroes(dx), study_1.TABLE_OF_SIGNS.GROWS);
        console.log(tos.factors.length, tos.signs.length);
        let result = this.makeGrowsResult(this.fx, tos);
        tos.signs.push(result.growsLine);
        tos.extremes = result.extremes;
        console.log(tos.signs.length);
        return tos;
    }
    ;
    makeVariation() {
        // Get the zeroes, make signs.
        let dx = this.derivative.fx.clone().derivative(),
            tos = this._getSigns(dx, this._getZeroes(dx), study_1.TABLE_OF_SIGNS.VARIATIONS);
        let result = this.makeVariationsResult(this.fx, tos);
        tos.signs.push(result.varsLine);
        tos.extremes = result.extremes;
        return tos;
    }
    ;
    _getZeroes(fx) {
        // All zeroes.
        let zeroes = [];
        fx.numerator.getZeroes().filter(x => !isNaN(x.value)).forEach(z => {
            // add the item
            zeroes.push({
                tex: z.tex,
                value: z.value,
                exact: z.exact,
                extrema: study_1.FUNCTION_EXTREMA.NOTHING,
                type: study_1.ZEROTYPE.ZERO
            });
        });
        fx.denominator.getZeroes().filter(x => !isNaN(x.value)).forEach(z => {
            let idx = this.indexOfZero(zeroes, z);
            if (idx !== -1) {
                zeroes[idx].type = study_1.ZEROTYPE.DEFENCE;
            } else {
                // Add the item
                zeroes.push({
                    tex: z.tex,
                    value: z.value,
                    exact: z.exact,
                    extrema: study_1.FUNCTION_EXTREMA.NOTHING,
                    type: study_1.ZEROTYPE.DEFENCE
                });
            }
        });
        // sort all zeroes
        zeroes.sort((a, b) => a.value - b.value);
        return zeroes;
    }
    _getSigns(fx, zeroes, typeOfTable) {
        // Factorize the rational
        let signs = [], factors = [];
        fx.numerator.factors.forEach(factor => {
            signs.push(this.makeOneLineForSigns(factor, zeroes, study_1.ZEROTYPE.ZERO));
            factors.push(factor.clone());
        });
        fx.denominator.factors.forEach(factor => {
            signs.push(this.makeOneLineForSigns(factor, zeroes, study_1.ZEROTYPE.DEFENCE));
            factors.push(factor.clone());
        });
        signs.push(this.makeSignsResult(signs));
        return {
            type: typeOfTable,
            fx,
            factors,
            zeroes,
            signs,
            extremes: {}
        };
    }
}
exports.RationalStudy = RationalStudy;
//# sourceMappingURL=rationalStudy.js.map