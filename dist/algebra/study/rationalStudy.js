import { Study } from "../study";
import { Fraction } from "../../coefficients/fraction";
import { Polynom } from "../polynom";
export class RationalStudy extends Study {
    constructor(fx, config) {
        super(fx, config);
        return this;
    }
    makeZeroes() {
        return this._getZeroes(this.fx);
    }
    ;
    makeSigns() {
        return this._getSigns(this.fx, this.zeroes);
    }
    ;
    makeAsymptotes() {
        const reduced = this.fx.clone().reduce();
        const asymptotes = [];
        this.zeroes.filter(x => x.type === ZEROTYPE.DEFENCE).forEach(zero => {
            let Ztype = ASYMPTOTE.VERTICAL, tex = `x=${zero.tex}`, display = `x=${zero.display}`;
            if (zero.exact instanceof Fraction) {
                if (reduced.denominator.evaluate(zero.exact).isNotZero()) {
                    Ztype = ASYMPTOTE.HOLE;
                    tex = `(${zero.tex};${reduced.evaluate(zero.exact).tex})`;
                    display = `(${zero.display};${reduced.evaluate(zero.exact).display})`;
                }
            }
            else {
                if (reduced.denominator.evaluate(zero.value).isNotZero()) {
                    Ztype = ASYMPTOTE.HOLE;
                    tex = `(${zero.tex};${reduced.evaluate(zero.value).tex})`;
                    display = `(${zero.display};${reduced.evaluate(zero.value).display})`;
                }
            }
            const delta = 0.000001;
            let before = this.fx.evaluateAsNumeric(zero.value - delta), after = this.fx.evaluateAsNumeric(zero.value + delta), position = [], pm = "";
            if (after < -10000) {
                position.push(ASYMPTOTE_POSITION.RB);
                pm += "m";
            }
            else if (after > 10000) {
                position.push(ASYMPTOTE_POSITION.RT);
                pm += "p";
            }
            if (before < -10000) {
                position.push(ASYMPTOTE_POSITION.LB);
                pm += "m";
            }
            else if (before > 10000) {
                position.push(ASYMPTOTE_POSITION.LT);
                pm += "p";
            }
            if (pm === "pp") {
                pm = "+";
            }
            else if (pm === "mm") {
                pm = "-";
            }
            else {
                pm = `\\${pm}`;
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
            });
        });
        const NDegree = this.fx.numerator.degree(), DDegree = this.fx.denominator.degree();
        if (NDegree.isEqual(DDegree)) {
            const H = this.fx.numerator.monomByDegree().coefficient.clone().divide(this.fx.denominator.monomByDegree().coefficient), Htex = H.tex;
            const { reminder } = reduced.euclidian(), deltaX = new Rational(reminder, reduced.denominator);
            asymptotes.push({
                fx: new Polynom(H),
                type: ASYMPTOTE.HORIZONTAL,
                tex: `y=${Htex}`,
                display: `y=${H.display}`,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = ${Htex}`,
                deltaX,
                tableOfSign: this._getSigns(deltaX),
                position: this._getHorizontalAsymptoteRelativePositon(deltaX)
            });
        }
        else if (DDegree.isGreater(NDegree)) {
            asymptotes.push({
                fx: new Polynom('0'),
                type: ASYMPTOTE.HORIZONTAL,
                tex: `y=0`,
                display: `y=0`,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = 0`,
                deltaX: null,
                tableOfSign: null,
                position: this._getHorizontalAsymptoteRelativePositon(this.fx)
            });
        }
        else if (NDegree.value - 1 === DDegree.value) {
            const { quotient, reminder } = reduced.euclidian(), deltaX = new Rational(reminder, reduced.denominator);
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
            });
        }
        return asymptotes;
    }
    ;
    _getHorizontalAsymptoteRelativePositon(deltaX, delta = 1000000) {
        const position = [], before = deltaX.evaluateAsNumeric(-delta), after = deltaX.evaluateAsNumeric(delta);
        if (before >= 0) {
            position.push(ASYMPTOTE_POSITION.LT);
        }
        else {
            position.push(ASYMPTOTE_POSITION.LB);
        }
        if (after >= 0) {
            position.push(ASYMPTOTE_POSITION.RT);
        }
        else {
            position.push(ASYMPTOTE_POSITION.RB);
        }
        return position;
    }
    makeDerivative() {
        const dx = this.fx.clone().derivative(), tos = this._getSigns(dx, this._getZeroes(dx), TABLE_OF_SIGNS.GROWS);
        const result = this.makeGrowsResult(tos);
        tos.signs.push(result.growsLine);
        tos.extremes = result.extremes;
        return tos;
    }
    ;
    makeVariation() {
        const dx = this.derivative.fx.clone().derivative(), tos = this._getSigns(dx, this._getZeroes(dx), TABLE_OF_SIGNS.VARIATIONS);
        const result = this.makeVariationsResult(tos);
        tos.signs.push(result.varsLine);
        tos.extremes = result.extremes;
        return tos;
    }
    ;
    _getZeroes(fx) {
        const zeroes = [];
        fx.numerator.getZeroes().filter(x => !isNaN(x.value)).forEach(z => {
            zeroes.push({
                tex: z.tex,
                display: z.display,
                value: z.value,
                exact: z.exact,
                extrema: FUNCTION_EXTREMA.NOTHING,
                type: ZEROTYPE.ZERO
            });
        });
        fx.denominator.getZeroes().filter(x => !isNaN(x.value)).forEach(z => {
            const idx = this.indexOfZero(zeroes, z);
            if (idx !== -1) {
                zeroes[idx].type = ZEROTYPE.DEFENCE;
            }
            else {
                zeroes.push({
                    tex: z.tex,
                    display: z.display,
                    value: z.value,
                    exact: z.exact,
                    extrema: FUNCTION_EXTREMA.NOTHING,
                    type: ZEROTYPE.DEFENCE
                });
            }
        });
        zeroes.sort((a, b) => a.value - b.value);
        return zeroes;
    }
    _getSigns(fx, zeroes, typeOfTable) {
        const signs = [], factors = [];
        if (zeroes === undefined) {
            zeroes = this._getZeroes(fx);
        }
        fx.numerator.factors.forEach(factor => {
            signs.push(this.makeOneLineForSigns(factor, zeroes, ZEROTYPE.ZERO));
            factors.push(factor.clone());
        });
        fx.denominator.factors.forEach(factor => {
            signs.push(this.makeOneLineForSigns(factor, zeroes, ZEROTYPE.DEFENCE));
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
//# sourceMappingURL=rationalStudy.js.map