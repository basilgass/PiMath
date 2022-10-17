"use strict";
/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */
Object.defineProperty(exports, "__esModule", {value: true});
exports.Study = exports.TABLE_OF_SIGNS = exports.FUNCTION_EXTREMA = exports.ASYMPTOTE_POSITION = exports.ASYMPTOTE = exports.ZEROTYPE = void 0;
const fraction_1 = require("../coefficients/fraction");
const numexp_1 = require("../expressions/numexp");
var ZEROTYPE;
(function (ZEROTYPE) {
    ZEROTYPE["ZERO"] = "z";
    ZEROTYPE["DEFENCE"] = "d";
    ZEROTYPE["NOTHING"] = "t";
})(ZEROTYPE = exports.ZEROTYPE || (exports.ZEROTYPE = {}));
var ASYMPTOTE;
(function (ASYMPTOTE) {
    ASYMPTOTE["VERTICAL"] = "av";
    ASYMPTOTE["HORIZONTAL"] = "ah";
    ASYMPTOTE["SLOPE"] = "ao";
    ASYMPTOTE["HOLE"] = "hole";
})(ASYMPTOTE = exports.ASYMPTOTE || (exports.ASYMPTOTE = {}));
var ASYMPTOTE_POSITION;
(function (ASYMPTOTE_POSITION) {
    ASYMPTOTE_POSITION["LT"] = "LT";
    ASYMPTOTE_POSITION["RT"] = "RT";
    ASYMPTOTE_POSITION["LB"] = "LB";
    ASYMPTOTE_POSITION["RB"] = "RB";
})(ASYMPTOTE_POSITION = exports.ASYMPTOTE_POSITION || (exports.ASYMPTOTE_POSITION = {}));
var FUNCTION_EXTREMA;
(function (FUNCTION_EXTREMA) {
    FUNCTION_EXTREMA["MIN"] = "min";
    FUNCTION_EXTREMA["MAX"] = "max";
    FUNCTION_EXTREMA["FLAT"] = "flat";
    FUNCTION_EXTREMA["NOTHING"] = "";
})(FUNCTION_EXTREMA = exports.FUNCTION_EXTREMA || (exports.FUNCTION_EXTREMA = {}));
var TABLE_OF_SIGNS;
(function (TABLE_OF_SIGNS) {
    TABLE_OF_SIGNS["SIGNS"] = "signs";
    TABLE_OF_SIGNS["GROWS"] = "grows";
    TABLE_OF_SIGNS["VARIATIONS"] = "variations";
})(TABLE_OF_SIGNS = exports.TABLE_OF_SIGNS || (exports.TABLE_OF_SIGNS = {}));
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
class Study {
    constructor(fx) {
        this.makeStudy = () => {
            this._zeroes = this.makeZeroes();
            this._signs = this.makeSigns();
            this._asymptotes = this.makeAsymptotes();
            this._derivative = this.makeDerivative();
            this._variations = this.makeVariation();
            this._signs.tex = this.texSigns;
            this._derivative.tex = this.texGrows;
            this._variations.tex = this.texVariations;
        };
        this.indexOfZero = (zeroes, zero) => {
            for (let i = 0; i < zeroes.length; i++) {
                if (zeroes[i].tex === zero.tex) {
                    return i;
                }
            }
            return -1;
        };
        this.makeOneLineForSigns = (factor, zeroes, zeroSign) => {
            let oneLine = [], currentZero = factor.getZeroes().map(x => x.tex);
            // First +/- sign, before the first zero
            oneLine.push('');
            if (factor.degree().isZero()) {
                oneLine.push(factor.monoms[0].coefficient.sign() === 1 ? '+' : '-');
            } else {
                oneLine.push(factor.evaluate(zeroes[0].value - 1).sign() === 1 ? '+' : '-');
            }
            for (let i = 0; i < zeroes.length; i++) {
                // Add the zero if it's the current one
                oneLine.push(currentZero.includes(zeroes[i].tex) ? zeroSign : ZEROTYPE.NOTHING);
                // + / - sign after the current zero
                if (i < zeroes.length - 1) {
                    oneLine.push(factor.evaluate((zeroes[i].value + zeroes[i + 1].value) / 2).sign() === 1 ? '+' : '-');
                } else if (i === zeroes.length - 1) {
                    oneLine.push(factor.evaluate(zeroes[i].value + 1).sign() === 1 ? '+' : '-');
                }
            }
            oneLine.push('');
            return oneLine;
        };
        this.makeSignsResult = (signs) => {
            // Initialize the result line with the first line of the signs table
            let resultLine = signs[0].map((x, index) => {
                if (index === 0 || index === signs[0].length - 1) {
                    return '';
                }
                if (index % 2 === 0) {
                    return 't';
                }
                return '+';
            });
            // Go through each lines (except the first)
            for (let current of signs) {
                for (let i = 0; i < current.length; i++) {
                    if (i % 2 === 0) {
                        // t, z or d
                        if (resultLine[i] === 'd') {
                            continue;
                        }
                        if (current[i] !== 't') {
                            resultLine[i] = current[i];
                        }
                    } else {
                        // + or -
                        if (current[i] === '-') {
                            resultLine[i] = resultLine[i] === '+' ? '-' : '+';
                        }
                    }
                }
            }
            return resultLine;
        };
        this.makeGrowsResult = (tos) => {
            // Use the last line (=> resultLine) to grab the necessary information
            let signsAsArray = Object.values(tos.signs), resultLine = signsAsArray[signsAsArray.length - 1],
                growsLine = [], extremes = {}, zeroes = tos.zeroes;
            // Get the extremes
            for (let i = 0; i < zeroes.length; i++) {
                // Get the corresponding item in the resultLine.
                let pos = 2 * i + 2;
                if (resultLine[pos] === 'z') {
                    // It's a zero. Get the coordinates
                    let x, y, zero = zeroes[i].exact, pt, xTex, yTex, pointType;
                    // TODO: NumExp should parse something that isn't yet plotFunction
                    let exp = new numexp_1.NumExp(this.fx.plotFunction);
                    if (zero instanceof fraction_1.Fraction) {
                        let value = zero, evalY = this.fx.evaluate(value);
                        x = zero.value;
                        y = evalY.value;
                        xTex = zero.tex;
                        yTex = evalY.tex;
                    } else {
                        x = zeroes[i].value;
                        y = exp.evaluate({x});
                        xTex = x.toFixed(2);
                        yTex = y.toFixed(2);
                    }
                    // Determine the type of the zero.
                    if (resultLine[pos - 1] === resultLine[pos + 1]) {
                        pointType = FUNCTION_EXTREMA.FLAT;
                    } else if (resultLine[pos - 1] === '+') {
                        pointType = FUNCTION_EXTREMA.MAX;
                    } else {
                        pointType = FUNCTION_EXTREMA.MIN;
                    }
                    // Add the point to the list
                    extremes[zeroes[i].tex] = {
                        type: pointType,
                        tex: {x: xTex, y: yTex},
                        value: {x, y}
                    };
                }
            }
            // Create the grows line, based on tkz-tab
            // \tkzTabLine{  ,  +  ,  z    ,  -  ,  d  ,  -  ,  z  ,  +  ,  }
            // \tkzTabVar{     -/  , +/$3$ ,       -D+/ , -/$1$  , +/  }
            growsLine.push(resultLine[1] === '+' ? '-/' : '+/');
            for (let i = 1; i < resultLine.length - 1; i++) {
                if (resultLine[i] === "z") {
                    let extr = extremes[zeroes[(i - 2) / 2].tex];
                    growsLine.push(`${resultLine[i - 1]}/\\(${extr.type}(${extr.tex.x};${extr.tex.y})\\)`);
                } else if (resultLine[i] === 'd') {
                    growsLine.push(`${resultLine[i - 1]}D${resultLine[i + 1] === '+' ? '-' : '+'}/`);
                }
            }
            growsLine.push(`${resultLine[resultLine.length - 2]}/`);
            return {growsLine, extremes};
        };
        this.makeVariationsResult = (tos) => {
            // TODO: make variations result is not yet implemented.
            let extremes = {}, varsLine = [];
            return {varsLine, extremes};
        };
        this._makeTexFromTableOfSigns = (tos) => {
            let factors = tos.factors.map(x => `\\(${x.tex}\\)/1`), factorsFx = "\\(fx\\)/1.2", zeroes = tos.zeroes;
            // Add the last lines "label"
            if (tos.type === TABLE_OF_SIGNS.GROWS) {
                factorsFx = "\\(f'(x)\\)/1.2,\\(f(x)\\)/2";
            } else if (tos.type === TABLE_OF_SIGNS.VARIATIONS) {
                factorsFx = "\\(f''(x)\\)/1.2,\\(f(x)\\)/2";
            }
            // Create the tikzPicture header
            let tex = `\\begin{tikzpicture}
\\tkzTabInit[lgt=3,espcl=2,deltacl=0]{/1.2,${factors.join(',')},/.1,${factorsFx} }{{\\scriptsize \\hspace{1cm} \\(-\\infty\\)},\\(${zeroes.map(x => x.tex).join('\\),\\(')}\\),{\\scriptsize \\hspace{-1cm} \\(+\\infty\\)}}`;
            let pos;
            for (pos = 0; pos < tos.factors.length; pos++) {
                tex += (`\n\\tkzTabLine{${tos.signs[pos].join(',')}}`);
            }
            // Add the result line
            tex += (`\n\\tkzTabLine{${tos.signs[pos].join(',')}}`);
            // Add the grows / vars line
            if (tos.type === TABLE_OF_SIGNS.GROWS) {
                tex += (`\n\\tkzTabVar{${tos.signs[pos + 1].join(',')}}`);
            } else if (tos.type === TABLE_OF_SIGNS.VARIATIONS) {
                // TODO: Check variations table for as tex
                tex += (`\n\\tkzTabVar{${tos.signs[pos + 1].join(',')}}`);
            }
            tex += `\n\\end{tikzpicture}`;
            return tex;
        };
        this.drawCode = () => {
            // Function as string
            let code = `f(x)=${this.fx.plotFunction}`;
            // Asymptotes
            let i = 1;
            this.asymptotes.forEach(asymptote => {
                if (asymptote.type === ASYMPTOTE.VERTICAL) {
                    code += `\nav_${i}=line x=${asymptote.zero.value}->red,dash`;
                    i++;
                } else if (asymptote.type === ASYMPTOTE.HORIZONTAL) {
                    code += `\nah=line y=${asymptote.fx.monoms[0].coefficient.value}->orange,dash`;
                } else if (asymptote.type === ASYMPTOTE.SLOPE) {
                    code += `\nao=line y=${asymptote.fx.plotFunction}->red,dash`;
                }
                i++;
            });
            // Extremes
            for (let zero in this.derivative.extremes) {
                let extreme = this.derivative.extremes[zero];
                code += `\nM_${i}(${extreme.value.x},${extreme.value.y})*`;
                i++;
            }
            // Zeroes
            this.zeroes.forEach(zero => {
                if (zero.type === ZEROTYPE.ZERO) {
                    code += `\nZ_${i}(${zero.value},0)*`;
                    i++;
                }
            });
            return code;
        };
        this.fx = fx;
        this.makeStudy();
        return this;
    }
    get zeroes() {
        return this._zeroes;
    }
    get domain() {
        return this.fx.domain();
    }
    get signs() {
        return this._signs;
    }
    get asymptotes() {
        return this._asymptotes;
    }
    get derivative() {
        return this._derivative;
    }
    get texSigns() {
        return this._makeTexFromTableOfSigns(this._signs);
    }
    get texGrows() {
        return this._makeTexFromTableOfSigns(this._derivative);
    }
    get texVariations() {
        return this._makeTexFromTableOfSigns(this._variations);
    }
    makeZeroes() {
        return [];
    }
    ;
    makeSigns() {
        return {
            type: TABLE_OF_SIGNS.SIGNS,
            fx: null,
            factors: [],
            zeroes: [],
            signs: [],
            extremes: {},
            tex: ''
        };
    }
    ;
    makeAsymptotes() {
        return [];
    }
    makeDerivative() {
        return {
            type: TABLE_OF_SIGNS.GROWS,
            fx: null,
            factors: [],
            zeroes: [],
            signs: [],
            extremes: {},
            tex: ''
        };
    }
    makeVariation() {
        return {
            type: TABLE_OF_SIGNS.VARIATIONS,
            fx: null,
            factors: [],
            zeroes: [],
            signs: [],
            extremes: {},
            tex: ''
        };
    }
}
exports.Study = Study;
//# sourceMappingURL=study.js.map