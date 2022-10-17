"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const polynom_1 = require("../polynom");
class RationalStudy extends study_1.Study {
    constructor(fx) {
        super(fx);
        return this;
    }
    makeZeroes() {
        return this._getZeroes(this.fx);
    }
    ;
    _getHorizontalAsymptoteRelativePositon(deltaX, delta = 1000000) {
        let position = [], before = deltaX.evaluateAsNumeric(-delta), after = deltaX.evaluateAsNumeric(delta);
        if (before >= 0) {
            position.push(study_1.ASYMPTOTE_POSITION.LT);
        } else {
            position.push(study_1.ASYMPTOTE_POSITION.LB);
        }
        if (after >= 0) {
            position.push(study_1.ASYMPTOTE_POSITION.RT);
        } else {
            position.push(study_1.ASYMPTOTE_POSITION.RB);
        }
        return position;
    }

    makeAsymptotes() {
        const reduced = this.fx.clone().reduce();
        // Vertical
        let asymptotes = [];
        this.zeroes.filter(x => x.type === study_1.ZEROTYPE.DEFENCE).forEach(zero => {
            // Check if it's a hole or an asymptote
            let Ztype = study_1.ASYMPTOTE.VERTICAL, tex = `x=${zero.tex}`;
            // Check if it's a hole: the reduced polynom should not be null
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
            // Get the position before and after the asymptote.
            const delta = 0.000001;
            let before = this.fx.evaluateAsNumeric(zero.value - delta),
                after = this.fx.evaluateAsNumeric(zero.value + delta), position = [], pm = "";
            if (after < -10000) {
                position.push(study_1.ASYMPTOTE_POSITION.RB);
                pm += "m";
            } else if (after > 10000) {
                position.push(study_1.ASYMPTOTE_POSITION.RT);
                pm += "p";
            }
            if (before < -10000) {
                position.push(study_1.ASYMPTOTE_POSITION.LB);
                pm += "m";
            } else if (before > 10000) {
                position.push(study_1.ASYMPTOTE_POSITION.LT);
                pm += "p";
            }
            // Left and right are to infinity
            // TODO: handle the case were one side of the asymptote isn't infinity (not possible in rational study?!)
            if (pm === "pp") {
                pm = "+";
            } else if (pm === "mm") {
                pm = "-";
            } else {
                pm = `\\${pm}`;
            }
            asymptotes.push({
                fx: null,
                type: Ztype,
                tex: tex,
                zero: zero,
                limits: `\\lim_{x\\to${zero.tex} }\\ f(x) = ${pm}\\infty`,
                deltaX: null,
                tableOfSign: null,
                position
            });
        });
        // Sloped asymptote
        let NDegree = this.fx.numerator.degree(), DDegree = this.fx.denominator.degree();
        if (NDegree.isEqual(DDegree)) {
            let H = this.fx.numerator.monomByDegree().coefficient.clone().divide(this.fx.denominator.monomByDegree().coefficient), Htex = H.tex;
            let { reminder } = reduced.euclidian(), deltaX = new rational_1.Rational(reminder, reduced.denominator);
            // Determine the position above or below on the left / right of the asymptote.
            asymptotes.push({
                fx: new polynom_1.Polynom(H),
                type: study_1.ASYMPTOTE.HORIZONTAL,
                tex: `y=${Htex}`,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = ${Htex}`,
                deltaX,
                tableOfSign: this._getSigns(deltaX),
                position: this._getHorizontalAsymptoteRelativePositon(deltaX)
            });
        }
        else if (DDegree.greater(NDegree)) {
            asymptotes.push({
                fx: new polynom_1.Polynom('0'),
                type: study_1.ASYMPTOTE.HORIZONTAL,
                tex: `y=0`,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = ${0}`,
                deltaX: null,
                tableOfSign: null,
                position: this._getHorizontalAsymptoteRelativePositon(this.fx)
            });
        }
        else if (NDegree.value - 1 === DDegree.value) {
            // Calculate the slope
            let { quotient, reminder } = reduced.euclidian(), deltaX = new rational_1.Rational(reminder, reduced.denominator);
            asymptotes.push({
                fx: quotient.clone(),
                type: study_1.ASYMPTOTE.SLOPE,
                tex: `y=${quotient.tex}`,
                zero: null,
                limits: ``,
                deltaX: new rational_1.Rational(reminder, reduced.denominator),
                tableOfSign: this._getSigns(deltaX),
                position: this._getHorizontalAsymptoteRelativePositon(deltaX)
            });
        }
        return asymptotes;
    }
    ;

    makeDerivative() {
        let dx = this.fx.clone().derivative(),
            tos = this._getSigns(dx, this._getZeroes(dx), study_1.TABLE_OF_SIGNS.GROWS);
        let result = this.makeGrowsResult(tos);
        tos.signs.push(result.growsLine);
        tos.extremes = result.extremes;
        return tos;
    }
    ;

    makeSigns() {
        return this._getSigns(this.fx, this.zeroes);
    }
    ;

    makeVariation() {
        // Get the zeroes, make signs.
        let dx = this.derivative.fx.clone().derivative(), tos = this._getSigns(dx, this._getZeroes(dx), study_1.TABLE_OF_SIGNS.VARIATIONS);
        let result = this.makeVariationsResult(tos);
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
            }
            else {
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
        if (zeroes === undefined) {
            zeroes = this._getZeroes(fx);
        }
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
            extremes: {},
            tex: ''
        };
    }
}
exports.RationalStudy = RationalStudy;
//# sourceMappingURL=rationalStudy.js.map