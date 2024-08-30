import { Fraction } from "../coefficients/fraction";
import { Vector } from "../geometry/vector";
import { Polynom } from "./polynom";
export var ZEROTYPE;
(function (ZEROTYPE) {
    ZEROTYPE["ZERO"] = "z";
    ZEROTYPE["DEFENCE"] = "d";
    ZEROTYPE["NOTHING"] = "t";
})(ZEROTYPE || (ZEROTYPE = {}));
export var ASYMPTOTE;
(function (ASYMPTOTE) {
    ASYMPTOTE["VERTICAL"] = "av";
    ASYMPTOTE["HORIZONTAL"] = "ah";
    ASYMPTOTE["SLOPE"] = "ao";
    ASYMPTOTE["HOLE"] = "hole";
})(ASYMPTOTE || (ASYMPTOTE = {}));
export var ASYMPTOTE_POSITION;
(function (ASYMPTOTE_POSITION) {
    ASYMPTOTE_POSITION["LT"] = "LT";
    ASYMPTOTE_POSITION["RT"] = "RT";
    ASYMPTOTE_POSITION["LB"] = "LB";
    ASYMPTOTE_POSITION["RB"] = "RB";
})(ASYMPTOTE_POSITION || (ASYMPTOTE_POSITION = {}));
export var FUNCTION_EXTREMA;
(function (FUNCTION_EXTREMA) {
    FUNCTION_EXTREMA["MIN"] = "min";
    FUNCTION_EXTREMA["MAX"] = "max";
    FUNCTION_EXTREMA["FLAT"] = "flat";
    FUNCTION_EXTREMA["NOTHING"] = "";
})(FUNCTION_EXTREMA || (FUNCTION_EXTREMA = {}));
export var TABLE_OF_SIGNS;
(function (TABLE_OF_SIGNS) {
    TABLE_OF_SIGNS["SIGNS"] = "signs";
    TABLE_OF_SIGNS["GROWS"] = "grows";
    TABLE_OF_SIGNS["VARIATIONS"] = "variatins";
})(TABLE_OF_SIGNS || (TABLE_OF_SIGNS = {}));
export class Study {
    fx;
    _asymptotes;
    _derivative;
    _signs;
    _variations;
    _zeroes;
    _config;
    _name;
    constructor(fx, config) {
        this.fx = fx;
        this._config = {
            name: 'f',
            variable: 'x',
            domain: true,
            asymptotes: true,
            signs: true,
            derivative: true,
            variations: true,
        };
        if (config) {
            if (typeof config === 'string') {
                const d = config.split(',');
                this._config = {};
                const n = d.filter(x => x.includes('(') && x.includes(')'));
                if (n.length === 1) {
                    this._config.name = n[0].split('(')[0];
                    this._config.variable = n[0].split('(')[1].split(')')[0];
                }
                this._config.domain = d.includes('d');
                this._config.asymptotes = d.includes('a');
                this._config.signs = d.includes('signs');
                this._config.derivative = d.includes('dx');
                this._config.variations = d.includes('ddx');
            }
            else {
                this._config = config;
            }
        }
        this.makeStudy();
        return this;
    }
    get name() {
        return this._config.name;
    }
    set name(value) {
        this._config.name = value;
    }
    get config() {
        return this._config;
    }
    set config(value) {
        this._config = value;
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
    makeStudy = () => {
        this._zeroes = this.makeZeroes();
        if (this._config.signs) {
            this._signs = this.makeSigns();
        }
        if (this._config.asymptotes) {
            this._asymptotes = this.makeAsymptotes();
        }
        if (this._config.derivative) {
            this._derivative = this.makeDerivative();
        }
        if (this._config.variations) {
            this._variations = this.makeVariation();
        }
        if (this._config.signs) {
            this._signs.tex = this.texSigns;
        }
        if (this._config.derivative) {
            this._derivative.tex = this.texGrows;
        }
        if (this._config.variations) {
            this._variations.tex = this.texVariations;
        }
    };
    indexOfZero = (zeroes, zero) => {
        for (let i = 0; i < zeroes.length; i++) {
            if (zeroes[i].tex === zero.tex) {
                return i;
            }
        }
        return -1;
    };
    makeOneLineForSigns = (factor, zeroes, zeroSign) => {
        const oneLine = [], currentZero = factor.getZeroes().map(x => x.tex);
        oneLine.push('');
        if (factor.degree().isZero()) {
            oneLine.push(factor.monoms[0].coefficient.sign() === 1 ? '+' : '-');
        }
        else {
            oneLine.push(factor.evaluate(zeroes[0].value - 1).sign() === 1 ? '+' : '-');
        }
        for (let i = 0; i < zeroes.length; i++) {
            oneLine.push(currentZero.includes(zeroes[i].tex) ? zeroSign : ZEROTYPE.NOTHING);
            if (i < zeroes.length - 1) {
                oneLine.push(factor.evaluate((zeroes[i].value + zeroes[i + 1].value) / 2).sign() === 1 ? '+' : '-');
            }
            else if (i === zeroes.length - 1) {
                oneLine.push(factor.evaluate(zeroes[i].value + 1).sign() === 1 ? '+' : '-');
            }
        }
        oneLine.push('');
        return oneLine;
    };
    makeSignsResult = (signs) => {
        const resultLine = signs[0].map((x, index) => {
            if (index === 0 || index === signs[0].length - 1) {
                return '';
            }
            if (index % 2 === 0) {
                return 't';
            }
            return '+';
        });
        for (const current of signs) {
            for (let i = 0; i < current.length; i++) {
                if (i % 2 === 0) {
                    if (resultLine[i] === 'd') {
                        continue;
                    }
                    if (current[i] !== 't') {
                        resultLine[i] = current[i];
                    }
                }
                else {
                    if (current[i] === '-') {
                        resultLine[i] = resultLine[i] === '+' ? '-' : '+';
                    }
                }
            }
        }
        return resultLine;
    };
    makeGrowsResult = (tos) => {
        const signsAsArray = Object.values(tos.signs), resultLine = signsAsArray[signsAsArray.length - 1], growsLine = [], extremes = {}, zeroes = tos.zeroes;
        for (let i = 0; i < zeroes.length; i++) {
            const pos = 2 * i + 2;
            if (resultLine[pos] === 'z') {
                let x, y, zero = zeroes[i].exact, pt, xTex, yTex, pointType;
                const exp = new NumExp(this.fx.plotFunction);
                if (zero instanceof Fraction) {
                    const value = zero, evalY = this.fx.evaluate(value);
                    x = zero.value;
                    y = evalY.value;
                    xTex = zero.tex;
                    yTex = evalY.tex;
                }
                else {
                    x = zeroes[i].value;
                    y = exp.evaluate({ x });
                    xTex = x.toFixed(2);
                    yTex = y.toFixed(2);
                }
                if (resultLine[pos - 1] === resultLine[pos + 1]) {
                    pointType = FUNCTION_EXTREMA.FLAT;
                }
                else if (resultLine[pos - 1] === '+') {
                    pointType = FUNCTION_EXTREMA.MAX;
                }
                else {
                    pointType = FUNCTION_EXTREMA.MIN;
                }
                extremes[zeroes[i].tex] = {
                    type: pointType,
                    tex: { x: xTex, y: yTex },
                    value: { x, y }
                };
            }
        }
        growsLine.push(resultLine[1] === '+' ? '-/' : '+/');
        for (let i = 1; i < resultLine.length - 1; i++) {
            if (resultLine[i] === "z") {
                const extr = extremes[zeroes[(i - 2) / 2].tex];
                growsLine.push(`${resultLine[i - 1]}/\\(${extr.type}(${extr.tex.x};${extr.tex.y})\\)`);
            }
            else if (resultLine[i] === 'd') {
                growsLine.push(`${resultLine[i - 1]}D${resultLine[i + 1] === '+' ? '-' : '+'}/`);
            }
        }
        growsLine.push(`${resultLine[resultLine.length - 2]}/`);
        return { growsLine, extremes };
    };
    makeVariationsResult = (tos) => {
        const extremes = {}, varsLine = [];
        return { varsLine, extremes };
    };
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
    drawCode = () => {
        let code = `f(x)=${this.fx.plotFunction}`;
        let i = 1;
        this.asymptotes.forEach(asymptote => {
            if (asymptote.type === ASYMPTOTE.VERTICAL) {
                code += `\nav_${i}=line x=${asymptote.zero.value}->red,dash`;
                i++;
            }
            else if (asymptote.type === ASYMPTOTE.HORIZONTAL) {
                code += `\nah=line y=${asymptote.fx.monoms[0].coefficient.value}->orange,dash`;
            }
            else if (asymptote.type === ASYMPTOTE.SLOPE) {
                code += `\nao=line y=${asymptote.fx.plotFunction}->red,dash`;
            }
            i++;
        });
        for (const zero in this.derivative.extremes) {
            const extreme = this.derivative.extremes[zero];
            code += `\nM_${i}(${extreme.value.x},${extreme.value.y})*`;
            i++;
        }
        this.zeroes.forEach(zero => {
            if (zero.type === ZEROTYPE.ZERO) {
                code += `\nZ_${i}(${zero.value},0)*`;
                i++;
            }
        });
        return code;
    };
    _makeTexFromTableOfSigns = (tos) => {
        let factors = tos.factors.map(x => `\\(${x.tex}\\)/1`), factorsFx = `\\(${this._config.name}(${this._config.variable})\\)/1.2`, zeroes = tos.zeroes;
        if (tos.type === TABLE_OF_SIGNS.GROWS) {
            factorsFx = `\\(${this._config.name}'(${this._config.variable})\\)/1.2,\\(f(x${this._config.variable})\\)/2`;
        }
        else if (tos.type === TABLE_OF_SIGNS.VARIATIONS) {
            factorsFx = `\\(${this._config.name}''(${this._config.variable})\\)/1.2,\\(f(${this._config.variable})\\)/2`;
        }
        let tex = `\\begin{tikzpicture}
\\tkzTabInit[lgt=3,espcl=2,deltacl=0]{/1.2,${factors.join(',')},/.1,${factorsFx} }{{\\scriptsize \\hspace{1cm} \\(-\\infty\\)},\\(${zeroes.map(x => x.tex).join('\\),\\(')}\\),{\\scriptsize \\hspace{-1cm} \\(+\\infty\\)}}`;
        let pos;
        for (pos = 0; pos < tos.factors.length; pos++) {
            tex += (`\n\\tkzTabLine{${tos.signs[pos].join(',')}}`);
        }
        tex += (`\n\\tkzTabLine{${tos.signs[pos].join(',')}}`);
        if (tos.type === TABLE_OF_SIGNS.GROWS) {
            tex += (`\n\\tkzTabVar{${tos.signs[pos + 1].join(',')}}`);
        }
        else if (tos.type === TABLE_OF_SIGNS.VARIATIONS) {
            tex += (`\n\\tkzTabVar{${tos.signs[pos + 1].join(',')}}`);
        }
        tex += `\n\\end{tikzpicture}`;
        return tex;
    };
}
//# sourceMappingURL=study.js.map