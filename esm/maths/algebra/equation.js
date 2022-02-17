"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equation = void 0;
const polynom_1 = require("./polynom");
const numeric_1 = require("../numeric");
const coefficients_1 = require("../coefficients");
class Equation {
    _left;
    _right;
    _sign;
    _polynom;
    _solutions;
    _varnothing = '\\varnothing';
    _real = '\\mathbb{R}';
    constructor(...equations) {
        this._left = new polynom_1.Polynom().zero();
        this._right = new polynom_1.Polynom().zero();
        this._sign = '=';
        if (equations.length === 1) {
            if (equations[0] instanceof Equation) {
                return equations[0].clone();
            }
            else if (typeof equations[0] === 'string') {
                this.parse(equations[0]);
            }
        }
        else if (equations.length === 2) {
            if (equations[0] instanceof polynom_1.Polynom) {
                this.left = equations[0].clone();
            }
            else if (typeof equations[0] === 'string') {
                this.left = new polynom_1.Polynom(equations[0]);
            }
            if (equations[1] instanceof polynom_1.Polynom) {
                this.right = equations[1].clone();
            }
            else if (typeof equations[1] === 'string') {
                this.right = new polynom_1.Polynom(equations[1]);
            }
        }
        else {
            return this;
        }
        return this;
    }
    get isEquation() {
        return true;
    }
    get solutions() {
        return this._solutions;
    }
    get solution() {
        if (this._solutions.length === 1
            &&
                (this._solutions[0].tex === this._real
                    || this._solutions[0].tex === this._varnothing
                    || this._solutions[0].tex.includes('\\left'))) {
            return `S = ${this._solutions[0]}`;
        }
        return `S = \\left{ ${this._solutions.map(x => x.tex).join(';')} \\right}`;
    }
    get isReal() {
        if (this._solutions === undefined) {
            this.solve();
        }
        return this._solutions[0].tex === this._real;
    }
    get isVarnothing() {
        if (this._solutions === undefined) {
            this.solve();
        }
        return this._solutions[0].tex === this._varnothing;
    }
    get signAsTex() {
        if (this._sign === '>=' || this._sign === '=>' || this._sign === 'geq') {
            return '\\geq';
        }
        if (this._sign === '<=' || this._sign === '=<' || this._sign === 'leq') {
            return '\\leq';
        }
        return this._sign;
    }
    get tex() {
        return `${this._left.tex}${this.signAsTex}${this._right.tex}`;
    }
    get display() {
        return `${this._left.display}${this.signAsTex}${this._right.display}`;
    }
    get raw() {
        return `${this._left.raw}${this.signAsTex}${this._right.raw}`;
    }
    get variables() {
        return [...new Set(this._right.variables.concat(this._left.variables))];
    }
    get numberOfVars() {
        return this.variables.length;
    }
    get left() {
        return this._left;
    }
    set left(value) {
        this._left = value;
    }
    get right() {
        return this._right;
    }
    set right(value) {
        this._right = value;
    }
    get sign() {
        return this._sign;
    }
    set sign(value) {
        this._sign = this._formatSign(value);
    }
    parse = (equationString) => {
        let pStr, strSign;
        strSign = this._findSign(equationString);
        if (strSign === false) {
            console.error('The equation is not valid (no sign found)');
            return;
        }
        pStr = equationString.split(strSign);
        return this.create(new polynom_1.Polynom(pStr[0]), new polynom_1.Polynom(pStr[1]), this._formatSign(strSign));
    };
    _findSign = (equationString) => {
        let strSign = '';
        if (equationString.includes('geq')) {
            return (equationString.includes('\\geq')) ? '\\geq' : 'geq';
        }
        else if (equationString.includes('leq')) {
            return (equationString.includes('\\leq')) ? '\\leq' : 'leq';
        }
        else if (equationString.includes('>=')) {
            return '>=';
        }
        else if (equationString.includes('=>')) {
            return '=>';
        }
        else if (equationString.includes('>')) {
            return '>';
        }
        else if (equationString.includes('<=')) {
            return '<=';
        }
        else if (equationString.includes('=<')) {
            return '=<';
        }
        else if (equationString.includes('<')) {
            return '<';
        }
        else if (equationString.includes('=')) {
            return '=';
        }
        if (strSign === '') {
            console.log('Equation: parse string : sign not found');
            return false;
        }
    };
    _formatSign = (signStr) => {
        if (signStr === undefined) {
            return '=';
        }
        if (signStr.includes('geq')) {
            return '>=';
        }
        else if (signStr.includes('>=')) {
            return '>=';
        }
        else if (signStr.includes('=>')) {
            return '>=';
        }
        else if (signStr.includes('>')) {
            return '>';
        }
        else if (signStr.includes('leq')) {
            return '<=';
        }
        else if (signStr.includes('<=')) {
            return '<=';
        }
        else if (signStr.includes('=<')) {
            return '<=';
        }
        else if (signStr.includes('<')) {
            return '<';
        }
        else {
            return '=';
        }
    };
    _reverseSign = () => {
        if (this._sign === '=') {
            return this;
        }
        if (this._sign.includes('<')) {
            this._sign.replace('<', '>');
            return this;
        }
        if (this._sign.includes('>')) {
            this._sign.replace('>', '<');
            return this;
        }
        return this;
    };
    create = (left, right, sign) => {
        this._left = left;
        this._right = right;
        this._sign = this._formatSign(sign);
        return this;
    };
    clone = () => {
        return new Equation().create(this._left.clone(), this._right.clone(), this._sign + '');
    };
    _randomizeDefaults = {
        degree: 2
    };
    get randomizeDefaults() {
        return this._randomizeDefaults;
    }
    set randomizeDefaults(value) {
        this._randomizeDefaults = value;
    }
    randomize = (opts, sign) => {
        return new Equation().create(new polynom_1.Polynom(), new polynom_1.Polynom(), sign);
    };
    moveLeft = () => {
        this._left = this._left.clone().subtract(this._right);
        this._right.zero();
        return this;
    };
    reorder = (allLeft) => {
        this._left.subtract(this._right);
        this._right.zero();
        if (allLeft) {
            return this.moveLeft();
        }
        let mMove;
        for (let m of this._left.monoms) {
            if (m.degree().isZero()) {
                mMove = m.clone();
                this._left.subtract(mMove);
                this._right.subtract(mMove);
            }
        }
        this._left.reorder();
        this._right.reorder();
        return this;
    };
    simplify = () => {
        this.multiply(numeric_1.Numeric.lcm(...this._left.getDenominators(), ...this._right.getDenominators()));
        this.divide(numeric_1.Numeric.gcd(...this._left.getNumerators(), ...this._right.getNumerators()));
        return this;
    };
    isolate = (letter) => {
        if (!this.degree(letter).isOne()) {
            return false;
        }
        if (this.isMultiVariable()) {
            return false;
        }
        let mMove, cMove;
        this._left.subtract(this._right);
        this._right.zero();
        for (let m of this._left.monoms) {
            if (!m.hasLetter(letter)) {
                mMove = m.clone();
                this._left.add(mMove.clone().opposed());
                this._right.add(mMove.clone().opposed());
            }
        }
        if (this._left.length !== 1) {
            return false;
        }
        cMove = this._left.monoms[0].coefficient.clone();
        this._left.divide(cMove);
        this._right.divide(cMove);
        return this;
    };
    replaceBy = (letter, P) => {
        this._left.replaceBy(letter, P);
        this._right.replaceBy(letter, P);
        return this;
    };
    multiply = (value) => {
        let F = new coefficients_1.Fraction(value);
        this._left.multiply(F);
        this._right.multiply(F);
        if (this._sign !== '=' && F.sign() === -1) {
            this._reverseSign();
        }
        return this;
    };
    divide = (value) => {
        let F = new coefficients_1.Fraction(value);
        if (F.isZero()) {
            return this;
        }
        else {
            return this.multiply(F.invert());
        }
    };
    degree = (letter) => {
        return coefficients_1.Fraction.max(this._left.degree(letter), this._right.degree(letter));
    };
    isMultiVariable = () => {
        return this._left.isMultiVariable || this._right.isMultiVariable;
    };
    letters = () => {
        return [...new Set([...this._left.letters(), ...this._right.letters()])];
    };
    solve = () => {
        this._solutions = [];
        this._polynom = this._left.clone().subtract(this._right);
        switch (this._polynom.degree().value) {
            case 0:
            case 1:
                this._solveDegree1();
                break;
            case 2:
                this._solveDegree2();
                break;
            default:
                this._solveDegree3plus();
        }
        return this;
    };
    isGreater = () => {
        if (this._sign.indexOf('>') !== -1) {
            return true;
        }
        return this._sign.indexOf('geq') !== -1;
    };
    isStrictEqual = () => {
        return this._sign === '=';
    };
    isAlsoEqual = () => {
        if (this._sign.indexOf('=') !== -1) {
            return true;
        }
        if (this._sign.indexOf('geq') !== -1) {
            return true;
        }
        if (this._sign.indexOf('leq') !== -1) {
            return true;
        }
    };
    _solveDegree1 = (letter) => {
        const m1 = this._polynom.monomByDegree(1, letter).coefficient, m0 = this._polynom.monomByDegree(0, letter).coefficient, v = m0.clone().opposed().divide(m1);
        let s;
        if (this.isStrictEqual()) {
            if (m1.value === 0) {
                if (m0.value === 0) {
                    this._solutions = [{
                            tex: this._real,
                            value: NaN,
                            exact: false
                        }];
                }
                else {
                    this._solutions = [{
                            tex: this._varnothing,
                            value: NaN,
                            exact: false
                        }];
                }
            }
            else {
                this._solutions = [{
                        tex: v.display,
                        value: v.value,
                        exact: v
                    }];
            }
        }
        else {
            if (m1.value === 0) {
                if (m0.value === 0 && this.isAlsoEqual()) {
                    s = '\\mathbb{R}';
                }
                else {
                    if (m0.value > 0) {
                        s = this.isGreater() ? this._real : this._varnothing;
                    }
                    else {
                        s = !this.isGreater() ? this._real : this._varnothing;
                    }
                }
            }
            else {
                if ((this.isGreater() && m1.sign() === 1) || (!this.isGreater() && m1.sign() === -1)) {
                    s = `\\left${this.isAlsoEqual() ? '\\[' : '\\]'}${v};+\\infty\\right\\[`;
                }
                else {
                    s = `\\left\\]-\\infty;${v} \\right\\${this.isAlsoEqual() ? '\\]' : '\\['}`;
                }
            }
            this._solutions = [{
                    tex: s,
                    value: NaN,
                    exact: false
                }];
        }
        return this._solutions;
    };
    _solveDegree2 = (letter) => {
        let aF = this._polynom.monomByDegree(2, letter).coefficient, bF = this._polynom.monomByDegree(1, letter).coefficient, cF = this._polynom.monomByDegree(0, letter).coefficient, delta, nthDelta, lcm = numeric_1.Numeric.lcm(aF.denominator, bF.denominator, cF.denominator), a = aF.multiply(lcm).value, b = bF.multiply(lcm).value, c = cF.multiply(lcm).value, realX1, realX2, sX1, sX2;
        delta = b * b - 4 * a * c;
        if (delta > 0) {
            realX1 = (-b - Math.sqrt(delta)) / (2 * a);
            realX2 = (-b + Math.sqrt(delta)) / (2 * a);
            if (delta > 1.0e5) {
                this._solutions = [
                    {
                        tex: ((-b - Math.sqrt(delta)) / (2 * a)).toFixed(5),
                        value: realX1,
                        exact: false
                    },
                    {
                        tex: ((-b + Math.sqrt(delta)) / (2 * a)).toFixed(5),
                        value: realX2,
                        exact: false
                    }
                ];
            }
            else {
                nthDelta = new coefficients_1.Nthroot(delta).reduce();
                if (nthDelta.hasRadical()) {
                    let gcd = numeric_1.Numeric.gcd(b, 2 * a, nthDelta.coefficient);
                    nthDelta.coefficient = nthDelta.coefficient / gcd;
                    if (b !== 0) {
                        if (2 * a / gcd === 1) {
                            this._solutions = [
                                {
                                    tex: `${-b / gcd} - ${nthDelta.tex}`,
                                    value: realX1,
                                    exact: false
                                },
                                {
                                    tex: `${-b / gcd} + ${nthDelta.tex}`,
                                    value: realX2,
                                    exact: false
                                },
                            ];
                        }
                        else {
                            this._solutions = [
                                {
                                    tex: `\\dfrac{${-b / gcd} - ${nthDelta.tex} }{ ${2 * a / gcd} }`,
                                    value: realX1,
                                    exact: false
                                },
                                {
                                    tex: `\\dfrac{${-b / gcd} + ${nthDelta.tex} }{ ${2 * a / gcd} }`,
                                    value: realX2,
                                    exact: false
                                },
                            ];
                        }
                    }
                    else {
                        if (2 * a / gcd === 1) {
                            this._solutions = [
                                {
                                    tex: `- ${nthDelta.tex}`,
                                    value: realX1,
                                    exact: false
                                },
                                {
                                    tex: `${nthDelta.tex}`,
                                    value: realX2,
                                    exact: false
                                },
                            ];
                        }
                        else {
                            this._solutions = [
                                {
                                    tex: `\\dfrac{- ${nthDelta.tex} }{ ${2 * a / gcd} }`,
                                    value: realX1,
                                    exact: false
                                },
                                {
                                    tex: `\\dfrac{${nthDelta.tex} }{ ${2 * a / gcd} }`,
                                    value: realX2,
                                    exact: false
                                },
                            ];
                        }
                    }
                }
                else {
                    const S1 = new coefficients_1.Fraction(-b - nthDelta.coefficient, 2 * a).reduce(), S2 = new coefficients_1.Fraction(-b + nthDelta.coefficient, 2 * a).reduce();
                    this._solutions = [
                        {
                            tex: S1.dfrac,
                            value: realX1,
                            exact: S1
                        },
                        {
                            tex: S2.dfrac,
                            value: realX2,
                            exact: S2
                        }
                    ];
                }
            }
        }
        else if (delta === 0) {
            const sol = new coefficients_1.Fraction(-b, 2 * a).reduce();
            this._solutions = [{
                    tex: sol.dfrac,
                    value: sol.value,
                    exact: sol
                }];
        }
        else {
            this._solutions = [{
                    tex: this._varnothing,
                    value: NaN,
                    exact: false
                }];
        }
        if (!this.isStrictEqual()) {
            if (this._solutions.length === 2) {
                sX1 = (realX1 < realX2) ? this._solutions[0].tex : this._solutions[1].tex;
                sX2 = (realX1 < realX2) ? this._solutions[1].tex : this._solutions[0].tex;
                if ((this.isGreater() && aF.sign() === 1) || (!this.isGreater() && aF.sign() === -1)) {
                    this._solutions = [{
                            tex: `\\left]-\\infty ; ${sX1}\\right${this.isAlsoEqual() ? ']' : '['} \\cup \\left${this.isAlsoEqual() ? '[' : ']'}${sX2};+\\infty\\right[`,
                            value: NaN,
                            exact: false
                        }
                    ];
                }
                else {
                    this._solutions = [{
                            tex: `\\left${this.isAlsoEqual() ? '[' : ']'}${sX1} ; ${sX2}\\right${this.isAlsoEqual() ? ']' : '['}`,
                            value: NaN,
                            exact: false
                        }];
                }
            }
            else if (this._solutions.length === 1 && this._solutions[0].tex !== this._varnothing) {
                if (!this.isAlsoEqual()) {
                    if ((this.isGreater() && aF.sign() === 1) || (!this.isGreater() && aF.sign() === -1)) {
                        this._solutions = [{
                                tex: `\\left]-\\infty ; ${this._solutions[0].tex}\\right[ \\cup \\left]${this._solutions[0].tex};+\\infty\\right[`,
                                value: NaN,
                                exact: false
                            }
                        ];
                    }
                    else {
                        this._solutions = [{
                                tex: this._varnothing,
                                value: NaN,
                                exact: false
                            }];
                    }
                }
                else {
                    if ((this.isGreater() && aF.sign() === 1) || (!this.isGreater() && aF.sign() === -1)) {
                        this._solutions = [{
                                tex: this._real,
                                value: NaN,
                                exact: false
                            }];
                    }
                    else {
                    }
                }
            }
            else {
                if (this.isGreater()) {
                    this._solutions = [{
                            tex: aF.sign() === 1 ? this._real : this._varnothing,
                            value: NaN,
                            exact: false
                        }];
                }
                else {
                    this._solutions = [{
                            tex: aF.sign() === -1 ? this._real : this._varnothing,
                            value: NaN,
                            exact: false
                        }];
                }
            }
        }
        return this._solutions;
    };
    _solveDegree3plus = () => {
        this._solutions = [{ tex: 'solve x - not yet handled', value: NaN, exact: false }];
        return this._solutions;
    };
}
exports.Equation = Equation;
//# sourceMappingURL=equation.js.map