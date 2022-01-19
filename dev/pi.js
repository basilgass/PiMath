/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/maths/algebra/equation.ts":
/*!***************************************!*\
  !*** ./src/maths/algebra/equation.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Equation = void 0;
const polynom_1 = __webpack_require__(/*! ./polynom */ "./src/maths/algebra/polynom.ts");
const numeric_1 = __webpack_require__(/*! ../numeric */ "./src/maths/numeric.ts");
const coefficients_1 = __webpack_require__(/*! ../coefficients */ "./src/maths/coefficients/index.ts");
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
            console.log('The equation is not valid (no sign found)');
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


/***/ }),

/***/ "./src/maths/algebra/index.ts":
/*!************************************!*\
  !*** ./src/maths/algebra/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./equation */ "./src/maths/algebra/equation.ts"), exports);
__exportStar(__webpack_require__(/*! ./linearSystem */ "./src/maths/algebra/linearSystem.ts"), exports);
__exportStar(__webpack_require__(/*! ./logicalset */ "./src/maths/algebra/logicalset.ts"), exports);
__exportStar(__webpack_require__(/*! ./monom */ "./src/maths/algebra/monom.ts"), exports);
__exportStar(__webpack_require__(/*! ./polynom */ "./src/maths/algebra/polynom.ts"), exports);
__exportStar(__webpack_require__(/*! ./rational */ "./src/maths/algebra/rational.ts"), exports);


/***/ }),

/***/ "./src/maths/algebra/linearSystem.ts":
/*!*******************************************!*\
  !*** ./src/maths/algebra/linearSystem.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinearSystem = void 0;
const coefficients_1 = __webpack_require__(/*! ../coefficients */ "./src/maths/coefficients/index.ts");
const equation_1 = __webpack_require__(/*! ./equation */ "./src/maths/algebra/equation.ts");
const polynom_1 = __webpack_require__(/*! ./polynom */ "./src/maths/algebra/polynom.ts");
const random_1 = __webpack_require__(/*! ../random */ "./src/maths/random/index.ts");
class LinearSystem {
    _solutions;
    _resolutionSteps;
    _equations;
    _letters;
    constructor(...equationStrings) {
        this._equations = [];
        this._letters = 'xy'.split('');
        if (equationStrings !== undefined && equationStrings.length > 0) {
            this.parse(...equationStrings);
        }
        return this;
    }
    get equations() {
        return this._equations;
    }
    set equations(value) {
        this._equations = value;
    }
    get letters() {
        return this._letters.join('');
    }
    set letters(value) {
        this._letters = value.split('');
    }
    get isSolvable() {
        let V = this.variables;
        if (V.length !== this._equations.length) {
            return false;
        }
        return true;
    }
    get variables() {
        let V = [];
        for (let E of this._equations) {
            V = V.concat(E.variables);
        }
        return [...new Set(V)].sort();
    }
    get tex() {
        let LS = this.clone().reorder(), letters = LS.variables, equStr, equArray = [], m;
        for (let equ of LS.equations) {
            equStr = [];
            for (let L of letters) {
                m = equ.left.monomByLetter(L);
                if (equStr.length === 0) {
                    equStr.push(m.isZero() ? '' : m.tex);
                }
                else {
                    equStr.push(m.isZero() ? '' : ((m.coefficient.sign() === 1) ? '+' : '') + m.tex);
                }
            }
            equStr.push('=');
            equStr.push(equ.right.tex);
            equArray.push(equStr.join('&'));
        }
        return `\\left\\{\\begin{array}{${"r".repeat(letters.length)}cl}${equArray.join('\\\\\ ')}\\end{array}\\right.`;
    }
    get solution() {
        let tex = [];
        if (this._solutions === undefined) {
            this.solve();
        }
        for (let letter in this._solutions) {
            if (this._solutions[letter].isReal) {
                console.log(`Undetermined (letter ${letter})`);
                return;
            }
            if (this._solutions[letter].isVarnothing) {
                console.log(`Undefined (letter ${letter})`);
                return;
            }
            tex.push(this._solutions[letter].value.dfrac);
        }
        return `(${tex.join(';')})`;
    }
    parse = (...equations) => {
        this._equations = equations.map(value => new equation_1.Equation(value));
        this._findLetters();
        return this;
    };
    setCoefficient = (...coefficients) => {
        this._equations = [];
        let i = 0;
        while (i < coefficients.length - this._letters.length) {
            let left = new polynom_1.Polynom().parse(this._letters.join(''), ...coefficients.slice(i, i + this._letters.length)), right = new polynom_1.Polynom(coefficients[i + this._letters.length].toString()), equ = new equation_1.Equation().create(left, right);
            this._equations.push(equ.clone());
            i = i + this._letters.length + 1;
        }
        return this;
    };
    clone = () => {
        return new LinearSystem().parse(...this._equations.map(equ => equ.clone()));
    };
    setLetters = (...letters) => {
        this._letters = letters;
        return this;
    };
    _findLetters = () => {
        let variables = new Set();
        for (let equ of this._equations) {
            variables = new Set([...variables, ...equ.variables]);
        }
        this._letters = [...variables];
        return this;
    };
    generate = (...solutions) => {
        let solutionsF = [];
        for (let s of solutions) {
            if (typeof s === "number") {
                solutionsF.push(new coefficients_1.Fraction(s.toString()));
            }
            else {
                solutionsF.push(s.clone());
            }
        }
        this._equations = [];
        for (let i = 0; i < solutions.length; i++) {
            this._equations.push(this._generateOneEquation(...solutionsF));
        }
        return this;
    };
    _generateOneEquation = (...solutions) => {
        let coeff = [], leftValue = new coefficients_1.Fraction().zero(), letters = ['x', 'y', 'z', 't', 'u', 'v', 'w', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'], equString = '', equ;
        for (let i = 0; i < solutions.length; i++) {
            coeff.push(random_1.Random.numberSym(5));
            leftValue.add(solutions[i].clone().multiply(coeff[i]));
            equString += `${(coeff[i] < 0) ? coeff[i] : '+' + coeff[i]}${letters[i]}`;
        }
        equ = new equation_1.Equation(`${equString}=${leftValue.display}`);
        if (equ.right.monoms[0].coefficient.denominator != 1) {
            equ.multiply(new coefficients_1.Fraction(equ.right.monoms[0].coefficient.denominator, 1));
        }
        if (this._checkIfLinerCombination(equ)) {
            return equ;
        }
        else {
            return this._generateOneEquation(...solutions);
        }
    };
    _linearReduction(eq1, eq2, letter) {
        let c1 = eq1.left.monomByDegree(1, letter).coefficient.clone(), c2 = eq2.left.monomByDegree(1, letter).coefficient.clone().opposed();
        return this.mergeEquations(eq1, eq2, c2, c1);
    }
    mergeEquations = (eq1, eq2, factor1, factor2) => {
        let eq1multiplied = eq1.clone().multiply(new coefficients_1.Fraction(factor1)), eq2multiplied = eq2.clone().multiply(new coefficients_1.Fraction(factor2));
        eq1multiplied.left.add(eq2multiplied.left);
        eq1multiplied.right.add(eq2multiplied.right);
        return eq1multiplied;
    };
    reorder = () => {
        for (let E of this._equations) {
            E.reorder();
        }
        return this;
    };
    solve = () => {
        this._solutions = {};
        this._resolutionSteps = [];
        this.reorder();
        let V = this.variables.sort();
        for (let letter of V) {
            this._solutions[letter] = this._solveOneLetter(letter, V);
        }
        return this;
    };
    _checkIfLinerCombination = (equ) => {
        return true;
    };
    _solveOneLetter(letter, V) {
        let LE = this.clone().equations, reducedEquations = [];
        for (let L of V) {
            if (L === letter) {
                continue;
            }
            for (let i = 0; i < LE.length - 1; i++) {
                reducedEquations.push(this._linearReduction(LE[i], LE[i + 1], L));
            }
            this._resolutionSteps.push(new LinearSystem().parse(...reducedEquations));
            LE = this._resolutionSteps[this._resolutionSteps.length - 1].clone().equations;
            reducedEquations = [];
        }
        let E = this._resolutionSteps[this._resolutionSteps.length - 1].equations[0];
        E.solve();
        return {
            value: new coefficients_1.Fraction(E.solutions[0].value),
            isReal: E.isReal,
            isVarnothing: E.isVarnothing
        };
    }
    log = () => {
        let str = '';
        for (let E of this._equations) {
            console.log(E.tex);
            str += `${E.tex}\\n}`;
        }
        return str;
    };
}
exports.LinearSystem = LinearSystem;


/***/ }),

/***/ "./src/maths/algebra/logicalset.ts":
/*!*****************************************!*\
  !*** ./src/maths/algebra/logicalset.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logicalset = void 0;
const shutingyard_1 = __webpack_require__(/*! ../shutingyard */ "./src/maths/shutingyard.ts");
class Logicalset {
    _rawString;
    _rpn;
    constructor(value) {
        this._rawString = value;
        this.parse(value);
        return this;
    }
    get isLogicalset() {
        return true;
    }
    ;
    parse = (value) => {
        this._rpn = new shutingyard_1.Shutingyard(shutingyard_1.ShutingyardMode.SET).parse(value).rpn;
        return this;
    };
    evaluate(tokenSets, reference) {
        let varStack = [];
        let referenceSet;
        if (reference === undefined) {
            referenceSet = new Set();
            for (let key in tokenSets) {
                referenceSet = new Set([...referenceSet, ...tokenSets[key]]);
            }
        }
        else {
            referenceSet = new Set(reference);
        }
        for (let token of this._rpn) {
            if (token.tokenType === 'variable') {
                if (tokenSets[token.token] === undefined) {
                    varStack.push(new Set());
                }
                else {
                    varStack.push(new Set(tokenSets[token.token]));
                }
            }
            else {
                switch (token.token) {
                    case '&':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            varStack.push(new Set([...first].filter(x => second.has(x))));
                        }
                        break;
                    case '|':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            varStack.push(new Set([...first, ...second]));
                        }
                        break;
                    case '-':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            varStack.push(new Set([...first].filter(x => !second.has(x))));
                        }
                        break;
                    case '!':
                        if (varStack.length >= 1) {
                            let first = varStack.pop();
                            varStack.push(new Set([...referenceSet].filter(x => !first.has(x))));
                        }
                        break;
                }
            }
        }
        return [...varStack[0]].sort();
    }
    vennAB() {
        return this.evaluate({
            A: ['A', 'AB'],
            B: ['B', 'AB']
        }, ['A', 'B', 'AB', 'E']);
    }
    vennABC() {
        return this.evaluate({
            A: ['A', 'AB', 'AC', 'ABC'],
            B: ['B', 'AB', 'BC', 'ABC'],
            C: ['C', 'AC', 'BC', 'ABC']
        }, ['A', 'B', 'C', 'AB', 'AC', 'BC', 'E']);
    }
    get rpn() {
        return this._rpn;
    }
    get tex() {
        let varStack = [];
        for (let token of this._rpn) {
            if (token.tokenType === 'variable') {
                varStack.push(token);
            }
            else {
                switch (token.token) {
                    case '&':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            if (first.tokenType === 'mix') {
                                first.token = `( ${first.token} )`;
                            }
                            if (second.tokenType === 'mix') {
                                second.token = `( ${second.token} )`;
                            }
                            varStack.push({ token: `${first.token} \\cap ${second.token}`, tokenType: 'mix' });
                        }
                        break;
                    case '|':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            if (first.tokenType === 'mix') {
                                first.token = `( ${first.token} )`;
                            }
                            if (second.tokenType === 'mix') {
                                second.token = `( ${second.token} )`;
                            }
                            varStack.push({ token: `${first.token} \\cup ${second.token}`, tokenType: 'mix' });
                        }
                        break;
                    case '-':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            if (first.tokenType === 'mix') {
                                first.token = `( ${first.token} )`;
                            }
                            if (second.tokenType === 'mix') {
                                second.token = `( ${second.token} )`;
                            }
                            varStack.push({ token: `${first.token} \\setminus ${second.token}`, tokenType: 'mix' });
                        }
                        break;
                    case '!':
                        if (varStack.length >= 1) {
                            let first = varStack.pop();
                            varStack.push({ token: `\\overline{ ${first.token} }`, tokenType: 'variable' });
                        }
                        break;
                }
            }
        }
        return varStack[0].token;
    }
}
exports.Logicalset = Logicalset;


/***/ }),

/***/ "./src/maths/algebra/monom.ts":
/*!************************************!*\
  !*** ./src/maths/algebra/monom.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Monom = void 0;
const coefficients_1 = __webpack_require__(/*! ../coefficients */ "./src/maths/coefficients/index.ts");
const numeric_1 = __webpack_require__(/*! ../numeric */ "./src/maths/numeric.ts");
const shutingyard_1 = __webpack_require__(/*! ../shutingyard */ "./src/maths/shutingyard.ts");
class Monom {
    _coefficient;
    _literal;
    constructor(value) {
        this.zero();
        if (value !== undefined) {
            this.parse(value);
        }
        return this;
    }
    get coefficient() {
        return this._coefficient;
    }
    set coefficient(F) {
        this._coefficient = new coefficients_1.Fraction(F);
    }
    get literal() {
        return this._literal;
    }
    get literalSqrt() {
        if (this.isLiteralSquare()) {
            let L = {};
            for (let key in this._literal) {
                L[key] = this._literal[key].clone().sqrt();
            }
            return L;
        }
        else {
            return this._literal;
        }
    }
    set literal(L) {
        this._literal = L;
    }
    set literalStr(inputStr) {
        for (const v of [...inputStr.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) {
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = new coefficients_1.Fraction().zero();
            }
            this._literal[v[1]].add(+v[2]);
        }
        for (const v of [...inputStr.matchAll(/([a-z](?!\^))/g)]) {
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = new coefficients_1.Fraction().zero();
            }
            this._literal[v[1]].add(1);
        }
    }
    get variables() {
        this.clone().clean();
        return Object.keys(this._literal);
    }
    get display() {
        let L = '', letters = Object.keys(this._literal).sort();
        for (let letter of letters) {
            if (this._literal[letter].isNotZero()) {
                L += `${letter}`;
                if (this._literal[letter].isNotEqual(1)) {
                    L += `^${this._literal[letter].display}`;
                }
            }
        }
        if (L === '') {
            if (this._coefficient.value != 0) {
                return `${this._coefficient.display}`;
            }
            else {
                return '';
            }
        }
        else {
            if (this._coefficient.value === 1) {
                return L;
            }
            else if (this._coefficient.value === -1) {
                return `-${L}`;
            }
            else if (this._coefficient.value === 0) {
                return '0';
            }
            else {
                return `${this._coefficient.display}${L}`;
            }
        }
    }
    get dividers() {
        if (this.coefficient.denominator !== 1) {
            return [this.clone()];
        }
        if (this.hasFractionCoefficient) {
            return [this.clone()];
        }
        if (this.coefficient.numerator > 10000) {
            return [this.clone()];
        }
        const dividers = numeric_1.Numeric.dividers(Math.abs(this.coefficient.numerator));
        let literals = [];
        for (let L in this.literal) {
            literals = this._getLiteralDividers(literals, L);
        }
        const monomDividers = [];
        if (literals.length > 0 && dividers.length > 0) {
            for (let N of dividers) {
                for (let L of literals) {
                    let M = new Monom();
                    M.coefficient = new coefficients_1.Fraction(N);
                    M.literal = L;
                    monomDividers.push(M);
                }
            }
        }
        else if (dividers.length === 0) {
            for (let L of literals) {
                let M = new Monom();
                M.coefficient = new coefficients_1.Fraction().one();
                M.literal = L;
                monomDividers.push(M);
            }
        }
        else {
            for (let N of dividers) {
                let M = new Monom();
                M.coefficient = new coefficients_1.Fraction(N);
                monomDividers.push(M);
            }
        }
        return monomDividers.length === 0 ? [new Monom().one()] : monomDividers;
    }
    _getLiteralDividers(arr, letter) {
        let tmpList = [];
        for (let d = 0; d <= this.literal[letter].value; d++) {
            if (arr.length === 0) {
                let litt = {};
                litt[letter] = new coefficients_1.Fraction(d);
                tmpList.push(litt);
            }
            else {
                for (let item of arr) {
                    let litt = {};
                    for (let currentLetter in item) {
                        litt[currentLetter] = item[currentLetter];
                    }
                    litt[letter] = new coefficients_1.Fraction(d);
                    tmpList.push(litt);
                }
            }
        }
        return tmpList;
    }
    get displayWithSign() {
        let d = this.display;
        return (d[0] !== '-' ? '+' : '') + d;
    }
    get texWithSign() {
        if (this.coefficient.isStrictlyPositive()) {
            return '+' + this.tex;
        }
        return this.tex;
    }
    get tex() {
        let L = '', letters = Object.keys(this._literal).sort();
        for (let letter of letters) {
            if (this._literal[letter].isNotZero()) {
                L += `${letter}`;
                if (this._literal[letter].isNotEqual(1)) {
                    L += `^{${this._literal[letter].display}}`;
                }
            }
        }
        if (L === '') {
            if (this._coefficient.value != 0) {
                return `${this._coefficient.dfrac}`;
            }
            else {
                return '0';
            }
        }
        else {
            if (this._coefficient.value === 1) {
                return L;
            }
            else if (this._coefficient.value === -1) {
                return `-${L}`;
            }
            else if (this._coefficient.value === 0) {
                return '0';
            }
            else {
                return `${this._coefficient.dfrac}${L}`;
            }
        }
    }
    parse = (inputStr) => {
        if (typeof inputStr === 'string') {
            this._shutingYardToReducedMonom(inputStr);
        }
        else if (typeof inputStr === 'number') {
            this._coefficient = new coefficients_1.Fraction(inputStr);
            this._literal = {};
        }
        else if (inputStr instanceof coefficients_1.Fraction) {
            this._coefficient = inputStr.clone();
            this._literal = {};
        }
        else if (inputStr instanceof Monom) {
            this._coefficient = inputStr._coefficient.clone();
            this._literal = this.copyLiterals(inputStr.literal);
        }
        return this;
    };
    _shutingYardToReducedMonom = (inputStr) => {
        const SY = new shutingyard_1.Shutingyard().parse(inputStr);
        const rpn = SY.rpn;
        let stack = [], m, pow, letter, q1, q2;
        if (rpn.length === 0) {
            this.zero();
            return this;
        }
        else if (rpn.length === 1) {
            const element = rpn[0];
            this.one();
            if (element.tokenType === 'coefficient') {
                this.coefficient = new coefficients_1.Fraction(element.token);
            }
            else if (element.tokenType === 'variable') {
                this.setLetter(element.token, 1);
            }
            return this;
        }
        else {
            for (const element of rpn) {
                if (element.tokenType === 'coefficient') {
                    let M = new Monom().one();
                    M.coefficient = new coefficients_1.Fraction(element.token);
                    stack.push(M.clone());
                }
                else if (element.tokenType === 'variable') {
                    let M = new Monom().one();
                    M.setLetter(element.token, 1);
                    stack.push(M.clone());
                }
                else if (element.tokenType === 'operation') {
                    switch (element.token) {
                        case '-':
                            q2 = (stack.pop()) || new Monom().zero();
                            q1 = (stack.pop()) || new Monom().zero();
                            stack.push(q1.subtract(q2));
                            break;
                        case '*':
                            q2 = (stack.pop()) || new Monom().one();
                            q1 = (stack.pop()) || new Monom().one();
                            stack.push(q1.multiply(q2));
                            break;
                        case '^':
                            pow = (stack.pop().coefficient) || new coefficients_1.Fraction().one();
                            m = (stack.pop()) || new Monom().one();
                            letter = m.variables[0];
                            if (letter !== undefined) {
                                m.setLetter(letter, pow);
                            }
                            stack.push(m);
                            break;
                    }
                }
            }
        }
        this.one();
        this.multiply(stack[0]);
        return this;
    };
    clone = () => {
        let F = new Monom();
        F.coefficient = this._coefficient.clone();
        for (let k in this._literal) {
            F.setLetter(k, this._literal[k].clone());
        }
        return F;
    };
    copyLiterals = (literal) => {
        let L = {};
        for (let k in literal) {
            L[k] = literal[k].clone();
        }
        return L;
    };
    makeSame = (M) => {
        for (let k in M._literal) {
            this.setLetter(k, M._literal[k].clone());
        }
        return this;
    };
    zero = () => {
        this._coefficient = new coefficients_1.Fraction().zero();
        this._literal = {};
        return this;
    };
    one = () => {
        this._coefficient = new coefficients_1.Fraction().one();
        this._literal = {};
        return this;
    };
    clean = () => {
        for (let letter in this._literal) {
            if (this._literal[letter].isZero()) {
                delete this._literal[letter];
            }
        }
        return this;
    };
    opposed = () => {
        this._coefficient.opposed();
        return this;
    };
    add = (...M) => {
        for (let m of M) {
            if (this.isSameAs(m)) {
                if (this.isZero()) {
                    this.makeSame(m);
                }
                this._coefficient.add(m.coefficient);
            }
            else {
                console.log('Add: Is not similar: ', m.display);
            }
        }
        return this;
    };
    subtract = (...M) => {
        for (let m of M) {
            if (this.isSameAs(m)) {
                if (this.isZero()) {
                    this.makeSame(m);
                }
                this._coefficient.add(m.clone().coefficient.opposed());
            }
            else {
                console.log('Subtract: Is not similar: ', m.display);
            }
        }
        return this;
    };
    multiply = (...M) => {
        for (let m of M) {
            this._coefficient.multiply(m.coefficient);
            for (let letter in m.literal) {
                if (this._literal[letter] === undefined) {
                    this._literal[letter] = m.literal[letter].clone();
                }
                else {
                    this._literal[letter].add(m.literal[letter]);
                }
            }
        }
        return this;
    };
    multiplyByNumber = (F) => {
        this._coefficient.multiply(F);
        return this;
    };
    divide = (...M) => {
        for (let v of M) {
            this._coefficient.divide(v.coefficient);
            for (let letter in v.literal) {
                this._literal[letter] = (this._literal[letter] === undefined) ? v.literal[letter].clone().opposed() : this._literal[letter].subtract(v.literal[letter]);
                if (this._literal[letter].isZero()) {
                    delete this._literal[letter];
                }
            }
        }
        return this;
    };
    pow = (nb) => {
        this._coefficient.pow(nb);
        for (let letter in this._literal) {
            this._literal[letter].pow(nb);
        }
        return this;
    };
    root = (p) => {
        return this;
    };
    sqrt = () => {
        if (this.isSquare()) {
            this._coefficient.sqrt();
            for (let letter in this._literal) {
                this._literal[letter].clone().divide(2);
            }
        }
        return this.root(2);
    };
    compare = (M, sign) => {
        if (sign === undefined) {
            sign = '=';
        }
        switch (sign) {
            case '=':
                if (!this.compare(M, 'same')) {
                    return false;
                }
                return this._coefficient.isEqual(M.coefficient);
            case 'same':
                let M1 = this.variables, M2 = M.variables, K = M1.concat(M2.filter((item) => M1.indexOf(item) < 0));
                if (!this.isZero() && !M.isZero()) {
                    for (let key of K) {
                        if (this._literal[key] === undefined || M.literal[key] === undefined) {
                            return false;
                        }
                        if (!this._literal[key].isEqual(M.literal[key])) {
                            return false;
                        }
                    }
                }
                return true;
            default:
                return false;
        }
    };
    isZero() {
        return this._coefficient.value === 0;
    }
    isOne() {
        return this._coefficient.value === 1 && this.variables.length === 0;
    }
    isEqual = (M) => {
        return this.compare(M, '=');
    };
    isSameAs = (M) => {
        return this.compare(M, 'same');
    };
    isSquare = () => {
        if (!this.coefficient.isSquare()) {
            return false;
        }
        return this.isLiteralSquare();
    };
    isLiteralSquare = () => {
        for (let letter in this.literal) {
            if (this.literal[letter].isRational()) {
                return false;
            }
            if (this.literal[letter].isEven()) {
                return false;
            }
        }
        return true;
    };
    hasFractionCoefficient = () => {
        for (let letter in this._literal) {
            if (this._literal[letter].isRational()) {
                return true;
            }
        }
        return false;
    };
    hasLetter = (letter) => {
        if (this._literal[letter === undefined ? 'x' : letter] === undefined) {
            return false;
        }
        return this._literal[letter === undefined ? 'x' : letter].isNotZero();
    };
    setLetter = (letter, pow) => {
        if (pow instanceof coefficients_1.Fraction) {
            if (this.hasLetter(letter) && pow.isZero()) {
                delete this._literal[letter];
            }
            this._literal[letter] = pow.clone();
        }
        else {
            this.setLetter(letter, new coefficients_1.Fraction(pow));
        }
    };
    degree = (letter) => {
        if (this.variables.length === 0) {
            return new coefficients_1.Fraction().zero();
        }
        if (letter === undefined) {
            return Object.values(this._literal).reduce((t, n) => t.clone().add(n));
        }
        else {
            return this._literal[letter] === undefined ? new coefficients_1.Fraction().zero() : this._literal[letter].clone();
        }
    };
    evaluate = (values) => {
        let r = this.coefficient.clone();
        if (typeof values === 'number' || values instanceof coefficients_1.Fraction) {
            let tmpValues = {};
            tmpValues[this.variables[0]] = new coefficients_1.Fraction(values);
            return this.evaluate(tmpValues);
        }
        if (typeof values === 'object') {
            for (let L in this._literal) {
                if (values[L] === undefined) {
                    return new coefficients_1.Fraction().zero();
                }
                let value = new coefficients_1.Fraction(values[L]);
                r.multiply(value.pow(this._literal[L]));
            }
        }
        return r;
    };
    derivative = (letter) => {
        if (letter === undefined) {
            letter = 'x';
        }
        if (this.hasLetter(letter)) {
            let d = this._literal[letter].clone(), dM = this.clone();
            dM._literal[letter].subtract(1);
            dM._coefficient.multiply(new coefficients_1.Fraction(d.clone()));
            return dM;
        }
        else {
            return new Monom().zero();
        }
    };
    primitive = (letter) => {
        if (letter === undefined) {
            letter = 'x';
        }
        let M = this.clone(), degree;
        if (M.hasLetter(letter)) {
            degree = M.degree(letter).clone().add(1);
            M.coefficient = M.coefficient.clone().divide(degree);
            M.setLetter(letter, degree);
        }
        else {
            if (M.coefficient.isZero()) {
                M.coefficient = new coefficients_1.Fraction().one();
            }
            M.setLetter(letter, 1);
        }
        return M;
    };
    static lcm = (...monoms) => {
        for (let m of monoms) {
            if (m.hasFractionCoefficient()) {
                return new Monom().zero();
            }
        }
        let M = new Monom(), coeffN = monoms.map(value => value.coefficient.numerator), coeffD = monoms.map(value => value.coefficient.denominator), n = numeric_1.Numeric.gcd(...coeffN), d = numeric_1.Numeric.lcm(...coeffD);
        M.coefficient = new coefficients_1.Fraction(n, d).reduce();
        for (let m of monoms) {
            for (let letter in M.literal) {
                if (!(letter in m.literal)) {
                    M.literal[letter].zero();
                }
            }
            for (let letter in m.literal) {
                if (M.literal[letter] === undefined && m.literal[letter].isStrictlyPositive()) {
                    M.literal[letter] = m.literal[letter].clone();
                }
                else {
                    M.literal[letter] = new coefficients_1.Fraction(Math.min(m.literal[letter].value, M.literal[letter].value));
                }
            }
        }
        return M;
    };
    static xmultiply = (...monoms) => {
        let M = new Monom().one();
        for (let m of monoms) {
            M.multiply(m);
        }
        return M;
    };
    areSameAs = (...M) => {
        let result = true;
        for (let i = 0; i < M.length; i++) {
            if (!this.isSameAs(M[i])) {
                return false;
            }
        }
        return result;
    };
    areEquals = (...M) => {
        if (!this.areSameAs(...M)) {
            return false;
        }
        for (let m of M) {
            if (!this._coefficient.isEqual(m.coefficient)) {
                return false;
            }
        }
        return true;
    };
}
exports.Monom = Monom;


/***/ }),

/***/ "./src/maths/algebra/polynom.ts":
/*!**************************************!*\
  !*** ./src/maths/algebra/polynom.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Polynom = void 0;
const monom_1 = __webpack_require__(/*! ./monom */ "./src/maths/algebra/monom.ts");
const shutingyard_1 = __webpack_require__(/*! ../shutingyard */ "./src/maths/shutingyard.ts");
const numeric_1 = __webpack_require__(/*! ../numeric */ "./src/maths/numeric.ts");
const coefficients_1 = __webpack_require__(/*! ../coefficients */ "./src/maths/coefficients/index.ts");
class Polynom {
    _rawString;
    _monoms;
    _factors;
    _texString;
    constructor(polynomString, ...values) {
        this._monoms = [];
        this._factors = [];
        if (polynomString !== undefined) {
            this.parse(polynomString, ...values);
        }
        return this;
    }
    get monoms() {
        return this._monoms;
    }
    set monoms(M) {
        this._monoms = M;
    }
    get factors() {
        return this._factors;
    }
    set factors(value) {
        this._factors = value;
    }
    get texFactors() {
        this.factorize();
        let tex = '';
        for (let f of this.factors) {
            if (f.monoms.length > 1) {
                tex += `(${f.tex})`;
            }
            else {
                tex = f.tex + tex;
            }
        }
        return tex;
    }
    get texString() {
        return this._texString;
    }
    get length() {
        return this._monoms.length;
    }
    get display() {
        return this.genDisplay();
    }
    get raw() {
        return this._rawString;
    }
    get tex() {
        return this.genDisplay('tex');
    }
    get isMultiVariable() {
        const B = false;
        for (const m of this._monoms) {
            if (m.variables.length > 1) {
                return true;
            }
        }
        return B;
    }
    get variables() {
        let V = [];
        for (const m of this._monoms) {
            V = V.concat(m.variables);
        }
        V = [...new Set(V)];
        return V;
    }
    get numberOfVars() {
        return this.variables.length;
    }
    genDisplay = (output, forceSign, wrapParentheses) => {
        let P = '';
        for (const k of this._monoms) {
            if (k.coefficient.value === 0) {
                continue;
            }
            P += `${(k.coefficient.sign() === 1 && (P !== '' || forceSign === true)) ? '+' : ''}${(output === 'tex') ? k.tex : k.display}`;
        }
        if (wrapParentheses === true && this.length > 1) {
            if (output === 'tex') {
                P = `\\left( ${P} \\right)`;
            }
            else {
                P = `(${P})`;
            }
        }
        if (P === '') {
            P = '0';
        }
        return P;
    };
    parse = (inputStr, ...values) => {
        if (values === undefined || values.length === 0) {
            inputStr = '' + inputStr;
            this._rawString = inputStr;
            if (inputStr !== '' && !isNaN(Number(inputStr))) {
                this.empty();
                let m = new monom_1.Monom(inputStr);
                this.add(m);
                return this;
            }
            return this.shutingYardToReducedPolynom(inputStr);
        }
        else if (/^[a-z]/.test(inputStr)) {
            this.empty();
            let fractions = values.map(x => new coefficients_1.Fraction(x));
            if (inputStr.length > 1) {
                let letters = inputStr.split(''), i = 0;
                for (let F of fractions) {
                    let m = new monom_1.Monom();
                    m.coefficient = F.clone();
                    m.literalStr = letters[i] || '';
                    this.add(m);
                    i++;
                }
            }
            else {
                let n = fractions.length - 1;
                for (let F of fractions) {
                    let m = new monom_1.Monom();
                    m.coefficient = F.clone();
                    m.literalStr = `${inputStr}^${n}`;
                    this.add(m);
                    n--;
                }
            }
            return this;
        }
        else {
            return this.zero();
        }
    };
    shutingYardToReducedPolynom = (inputStr) => {
        const SY = new shutingyard_1.Shutingyard().parse(inputStr);
        const rpn = SY.rpn;
        let m1;
        let m2;
        let stack = [], previousToken = null, tempPolynom;
        for (const element of rpn) {
            if (element.tokenType === 'coefficient' || element.tokenType === 'variable') {
                tempPolynom = new Polynom().zero();
                tempPolynom.monoms = [new monom_1.Monom(element.token)];
                stack.push(tempPolynom.clone());
            }
            else if (element.tokenType === 'operation') {
                m2 = (stack.pop()) || new Polynom().zero();
                m1 = (stack.pop()) || new Polynom().zero();
                switch (element.token) {
                    case '+':
                        stack.push(m1.add(m2));
                        break;
                    case '-':
                        stack.push(m1.subtract(m2));
                        break;
                    case '*':
                        stack.push(m1.multiply(m2));
                        break;
                    case '^':
                        stack.push(m1.pow(+previousToken));
                }
            }
            previousToken = element.token;
        }
        this._monoms = stack[0].monoms;
        return this;
    };
    clone = () => {
        const P = new Polynom();
        const M = [];
        for (const m of this._monoms) {
            M.push(m.clone());
        }
        P.monoms = M;
        return P;
    };
    zero = () => {
        this._monoms = [];
        this._monoms.push(new monom_1.Monom().zero());
        this._rawString = '0';
        return this;
    };
    one = () => {
        this._monoms = [];
        this._monoms.push(new monom_1.Monom().one());
        this._rawString = '1';
        return this;
    };
    empty = () => {
        this._monoms = [];
        this._rawString = '';
        return this;
    };
    opposed = () => {
        this._monoms = this._monoms.map(m => m.opposed());
        return this;
    };
    add = (...values) => {
        for (let value of values) {
            if (value instanceof Polynom) {
                this._monoms = this._monoms.concat(value.monoms);
            }
            else if (value instanceof monom_1.Monom) {
                this._monoms.push(value.clone());
            }
            else if (Number.isSafeInteger(value)) {
                this._monoms.push(new monom_1.Monom(value.toString()));
            }
            else {
                this._monoms.push(new monom_1.Monom(value));
            }
        }
        return this.reduce();
    };
    subtract = (...values) => {
        for (let value of values) {
            if (value instanceof Polynom) {
                this._monoms = this._monoms.concat(value.clone().opposed().monoms);
            }
            else if (value instanceof monom_1.Monom) {
                this._monoms.push(value.clone().opposed());
            }
            else if (Number.isSafeInteger(value)) {
                this._monoms.push(new monom_1.Monom(value.toString()).opposed());
            }
            else {
                this._monoms.push(new monom_1.Monom(value).opposed());
            }
        }
        return this.reduce();
    };
    multiply = (value) => {
        if (value instanceof Polynom) {
            return this.multiplyByPolynom(value);
        }
        else if (value instanceof coefficients_1.Fraction) {
            return this.multiplyByFraction(value);
        }
        else if (value instanceof monom_1.Monom) {
            return this.multiplyByMonom(value);
        }
        else if (Number.isSafeInteger(value) && typeof value === 'number') {
            return this.multiplyByInteger(value);
        }
        return this;
    };
    multiplyByPolynom = (P) => {
        const M = [];
        for (const m1 of this._monoms) {
            for (const m2 of P.monoms) {
                M.push(monom_1.Monom.xmultiply(m1, m2));
            }
        }
        this._monoms = M;
        return this.reduce();
    };
    multiplyByFraction = (F) => {
        for (const m of this._monoms) {
            m.coefficient.multiply(F);
        }
        return this.reduce();
    };
    multiplyByInteger = (nb) => {
        return this.multiplyByFraction(new coefficients_1.Fraction(nb));
    };
    multiplyByMonom = (M) => {
        for (const m of this._monoms) {
            m.multiply(M);
        }
        return this.reduce();
    };
    euclidian = (P) => {
        const letter = P.variables[0];
        const quotient = new Polynom().zero();
        const reminder = this.clone().reorder(letter);
        if (P.variables.length === 0) {
            return { quotient, reminder };
        }
        const maxMP = P.monomByDegree(undefined, letter);
        const degreeP = P.degree(letter);
        let newM;
        let MaxIteration = this.degree(letter).clone().multiply(2);
        while (reminder.degree(letter).geq(degreeP) && MaxIteration.isPositive()) {
            MaxIteration.subtract(1);
            newM = reminder.monomByDegree(undefined, letter).clone().divide(maxMP);
            if (newM.isZero()) {
                break;
            }
            quotient.add(newM);
            reminder.subtract(P.clone().multiply(newM));
        }
        return { quotient, reminder };
    };
    divide = (value) => {
        if (value instanceof coefficients_1.Fraction) {
            this.divideByFraction(value);
        }
        else if (typeof value === 'number' && Number.isSafeInteger(value)) {
            return this.divideByInteger(value);
        }
    };
    divideByInteger = (nb) => {
        const nbF = new coefficients_1.Fraction(nb);
        for (const m of this._monoms) {
            m.coefficient.divide(nbF);
        }
        return this;
    };
    divideByFraction = (F) => {
        for (const m of this._monoms) {
            m.coefficient.divide(F);
        }
        return this;
    };
    pow = (nb) => {
        if (!Number.isSafeInteger(nb)) {
            return this.zero();
        }
        if (nb < 0) {
            return this.zero();
        }
        if (nb === 0) {
            return new Polynom();
        }
        const P = this.clone();
        for (let i = 1; i < nb; i++) {
            this.multiply(P);
        }
        return this.reduce();
    };
    compare = (P, sign) => {
        if (sign === undefined) {
            sign = '=';
        }
        const cP1 = this.clone().reduce().reorder();
        const cP2 = P.clone().reduce().reorder();
        switch (sign) {
            case '=':
                if (cP1.length !== cP2.length || cP1.degree().isNotEqual(cP2.degree())) {
                    return false;
                }
                for (const i in cP1.monoms) {
                    if (!cP1.monoms[i].isEqual(cP2.monoms[i])) {
                        return false;
                    }
                }
                return true;
            case 'same':
                if (cP1.length !== cP2.length || cP1.degree() !== cP2.degree()) {
                    return false;
                }
                for (const i in cP1.monoms) {
                    if (!cP1.monoms[i].isSameAs(cP2.monoms[i])) {
                        return false;
                    }
                }
                return true;
            default:
                return false;
        }
    };
    isZero() {
        return (this._monoms.length === 1 && this._monoms[0].coefficient.isZero()) || this._monoms.length === 0;
    }
    isOne() {
        return this._monoms.length === 1 && this._monoms[0].coefficient.isOne();
    }
    isEqual = (P) => {
        return this.compare(P, '=');
    };
    isSameAs = (P) => {
        return this.compare(P, 'same');
    };
    isOpposedAt = (P) => {
        return this.compare(P.clone().opposed(), '=');
    };
    isFactorized = (polynomString) => {
        let P;
        if (polynomString.match(/\(/g).length !== polynomString.match(/\)/g).length) {
            return false;
        }
        try {
            P = new Polynom(polynomString);
        }
        catch (e) {
            return false;
        }
        if (!this.isEqual(P)) {
            return false;
        }
        let polynomStringNormalized = polynomString.replaceAll('*', ''), polynomStringReduced = '' + polynomStringNormalized, factors = [];
        for (let x of polynomStringNormalized.matchAll(/\(([a-z0-9+\-]+)\)(\^[0-9]*)?/g)) {
            if (x[2] !== undefined) {
                for (let i = 0; i < +x[2].substr(1); i++) {
                    factors.push(x[1]);
                }
            }
            else {
                factors.push(x[1]);
            }
            polynomStringReduced = polynomStringReduced.replaceAll(x[0], '');
        }
        if (polynomStringReduced !== '') {
            factors.push(polynomStringReduced);
        }
        let polyFactors = factors.map(x => new Polynom(x));
        this.factorize();
        let sign = 1;
        for (let f of this.factors) {
            for (let i = 0; i < polyFactors.length; i++) {
                if (f.isEqual(polyFactors[i])) {
                    polyFactors.splice(i, 1);
                    break;
                }
                else if (f.isOpposedAt(polyFactors[i])) {
                    polyFactors.splice(i, 1);
                    sign = -sign;
                    break;
                }
            }
        }
        return (polyFactors.length === 0 && sign === 1);
    };
    isDeveloped = (polynomString) => {
        let P;
        if (polynomString.match(/\(/g).length + polynomString.match(/\)/g).length) {
            return false;
        }
        try {
            P = new Polynom(polynomString);
        }
        catch (e) {
            return false;
        }
        if (!this.isEqual(P)) {
            return false;
        }
        let polynomStringNormalized = polynomString.replaceAll('[*\s]', '');
        return polynomStringNormalized === P.reduce().reorder().display;
    };
    reduce = () => {
        for (let i = 0; i < this._monoms.length; i++) {
            for (let j = i + 1; j < this._monoms.length; j++) {
                if (this._monoms[i].isSameAs(this.monoms[j])) {
                    this._monoms[i].add(this.monoms[j]);
                    this._monoms.splice(j, 1);
                }
            }
        }
        this._monoms = this._monoms.filter((m) => {
            return m.coefficient.value !== 0;
        });
        for (const m of this._monoms) {
            m.coefficient.reduce();
        }
        if (this.length === 0) {
            return new Polynom().zero();
        }
        return this;
    };
    reorder = (letter = 'x') => {
        this._monoms.sort(function (a, b) {
            return b.degree(letter).clone().subtract(a.degree(letter)).value;
        });
        return this.reduce();
    };
    degree = (letter) => {
        let d = new coefficients_1.Fraction().zero();
        for (const m of this._monoms) {
            d = coefficients_1.Fraction.max(m.degree(letter).value, d);
        }
        return d;
    };
    letters = () => {
        let L = [], S = new Set();
        for (let m of this._monoms) {
            S = new Set([...S, ...m.variables]);
        }
        return [...S];
    };
    replaceBy = (letter, P) => {
        let pow;
        const resultPolynom = new Polynom().zero();
        for (const m of this.monoms) {
            if (m.literal[letter] === undefined || m.literal[letter].isZero()) {
                resultPolynom.add(m.clone());
            }
            else {
                pow = m.literal[letter].clone();
                delete m.literal[letter];
                resultPolynom.add(P.clone().pow(Math.abs(pow.numerator)).multiply(m));
            }
        }
        this._monoms = resultPolynom.reduce().reorder().monoms;
        return this;
    };
    evaluate = (values) => {
        const r = new coefficients_1.Fraction().zero();
        this._monoms.forEach(monom => {
            r.add(monom.evaluate(values));
        });
        return r;
    };
    derivative = (letter) => {
        let dP = new Polynom();
        for (let m of this._monoms) {
            dP.add(m.derivative(letter));
        }
        return dP;
    };
    primitive = (letter) => {
        let dP = new Polynom();
        for (let m of this._monoms) {
            dP.add(m.primitive(letter));
        }
        return dP;
    };
    integrate = (a, b, letter) => {
        const primitive = this.primitive(letter);
        if (letter === undefined) {
            letter = 'x';
        }
        let valuesA = {}, valuesB = {};
        valuesA[letter] = new coefficients_1.Fraction(a);
        valuesB[letter] = new coefficients_1.Fraction(b);
        return primitive.evaluate(valuesB).subtract(primitive.evaluate(valuesA));
    };
    factorize = (letter) => {
        let factors = [];
        let P = this.clone().reorder(), M = P.commonMonom(), tempPolynom;
        if (!M.isOne()) {
            tempPolynom = new Polynom();
            tempPolynom.monoms = [M];
            factors = [tempPolynom.clone()];
            P = P.euclidian(tempPolynom).quotient;
        }
        let securityLoop = P.degree().clone().multiply(2).value;
        while (securityLoop >= 0) {
            securityLoop--;
            if (P.monoms.length < 2) {
                if (!P.isOne()) {
                    factors.push(P.clone());
                }
                break;
            }
            else {
                let m1 = P.monoms[0].dividers, m2 = P.monoms[P.monoms.length - 1].dividers;
                for (let m1d of m1) {
                    for (let m2d of m2) {
                        let dividerPolynom = new Polynom(), result;
                        dividerPolynom.monoms = [m1d.clone(), m2d.clone()];
                        result = P.euclidian(dividerPolynom);
                        if (result.reminder.isZero()) {
                            P = result.quotient.clone();
                            factors.push(dividerPolynom);
                            continue;
                        }
                        dividerPolynom.monoms = [m1d.clone(), m2d.clone().opposed()];
                        result = P.euclidian(dividerPolynom);
                        if (result.reminder.isZero()) {
                            P = result.quotient.clone();
                            factors.push(dividerPolynom);
                        }
                    }
                }
            }
        }
        this.factors = factors;
        return factors;
    };
    _factorize2ndDegree = (letter) => {
        let P1, P2, a, b, c, delta, x1, x2, factor;
        if (this.numberOfVars === 1) {
            a = this.monomByDegree(2, letter).coefficient;
            b = this.monomByDegree(1, letter).coefficient;
            c = this.monomByDegree(0, letter).coefficient;
            delta = b.clone().pow(2).subtract(a.clone().multiply(c).multiply(4));
            if (delta.isZero()) {
                x1 = b.clone().opposed().divide(a.clone().multiply(2));
                P1 = new Polynom(letter).subtract(x1.display).multiply(x1.denominator);
                P2 = new Polynom(letter).subtract(x1.display).multiply(x1.denominator);
                factor = a.divide(x1.denominator).divide(x1.denominator);
                if (!factor.isOne()) {
                    return [new Polynom(factor.display), P1, P2];
                }
                else {
                    return [P1, P2];
                }
            }
            else if (delta.isPositive() && delta.isSquare()) {
                x1 = b.clone().opposed()
                    .add(delta.clone().sqrt())
                    .divide(a.clone().multiply(2));
                x2 = b.clone().opposed()
                    .subtract(delta.clone().sqrt())
                    .divide(a.clone().multiply(2));
                factor = a.divide(x1.denominator).divide(x2.denominator);
                if (factor.isOne()) {
                    return [
                        new Polynom(letter).subtract(x1.display).multiply(x1.denominator),
                        new Polynom(letter).subtract(x2.display).multiply(x2.denominator),
                    ];
                }
                else {
                    return [
                        new Polynom(factor.display),
                        new Polynom(letter).subtract(x1.display).multiply(x1.denominator),
                        new Polynom(letter).subtract(x2.display).multiply(x2.denominator),
                    ];
                }
            }
            else {
                return [this.clone()];
            }
        }
        else {
            a = this.monomByDegree(2, letter);
            b = this.monomByDegree(1, letter);
            c = this.monomByDegree(0, letter);
            if (a.isLiteralSquare() && c.isLiteralSquare()) {
                if (b.clone().pow(2).isSameAs(a.clone().multiply(c))) {
                    let xPolynom = new Polynom('x', a.coefficient, b.coefficient, c.coefficient);
                    let xFactors = xPolynom._factorize2ndDegree('x');
                    let factors = [], xyzPolynom;
                    if (xFactors.length >= 2) {
                        for (let p of xFactors) {
                            if (p.degree().isZero()) {
                                factors.push(p.clone());
                            }
                            else {
                                xyzPolynom = p.clone();
                                xyzPolynom.monoms[0].literal = a.literalSqrt;
                                xyzPolynom.monoms[1].literal = c.literalSqrt;
                                factors.push(xyzPolynom.clone());
                            }
                        }
                        return factors;
                    }
                }
            }
            return [this.clone()];
        }
    };
    _factorizeByGroups = () => {
        return [];
    };
    getZeroes = () => {
        const Z = [];
        switch (this.degree().value) {
            case 0:
                if (this._monoms[0].coefficient.value === 0) {
                    return [true];
                }
                else {
                    return [false];
                }
            case 1:
                if (this._monoms.length === 1) {
                    return [new coefficients_1.Fraction().zero()];
                }
                else {
                    const P = this.clone().reduce().reorder();
                    return [P.monoms[1].coefficient.opposed().divide(P.monoms[0].coefficient)];
                }
            default:
                if (this._factors.length === 0) {
                    this.factorize();
                }
                let zeroes = [], zeroesAsTex = [];
                for (let P of this._factors) {
                    if (P.degree().greater(2)) {
                    }
                    else if (P.degree().value === 2) {
                        let A = P.monomByDegree(2).coefficient, B = P.monomByDegree(1).coefficient, C = P.monomByDegree(0).coefficient, D = B.clone().pow(2).subtract(A.clone().multiply(C).multiply(4));
                        if (D.value > 0) {
                            let x1 = (-(B.value) + Math.sqrt(D.value)) / (2 * A.value), x2 = (-(B.value) - Math.sqrt(D.value)) / (2 * A.value);
                            zeroes.push(new coefficients_1.Fraction(x1.toFixed(3)).reduce());
                            zeroes.push(new coefficients_1.Fraction(x2.toFixed(3)).reduce());
                        }
                        else if (D.value === 0) {
                        }
                        else {
                            console.log('No zero for ', P.tex);
                        }
                    }
                    else {
                        for (let z of P.getZeroes()) {
                            if (z === false || z === true) {
                                continue;
                            }
                            if (zeroesAsTex.indexOf(z.frac) === -1) {
                                zeroes.push(z);
                                zeroesAsTex.push(z.frac);
                            }
                        }
                    }
                }
                return zeroes;
        }
        return Z;
    };
    monomByDegree = (degree, letter) => {
        if (degree === undefined) {
            return this.monomByDegree(this.degree(letter), letter);
        }
        const M = this.clone().reduce();
        for (const m of M._monoms) {
            if (m.degree(letter).isEqual(degree)) {
                return m.clone();
            }
        }
        return new monom_1.Monom().zero();
    };
    monomsByDegree = (degree, letter) => {
        if (degree === undefined) {
            return this.monomsByDegree(this.degree(letter));
        }
        let Ms = [];
        const M = this.clone().reduce();
        for (const m of M._monoms) {
            if (m.degree(letter) === degree) {
                Ms.push(m.clone());
            }
        }
        return Ms;
    };
    monomByLetter = (letter) => {
        const M = this.clone().reduce();
        for (const m of M._monoms) {
            if (m.hasLetter(letter)) {
                return m.clone();
            }
        }
        return new monom_1.Monom().zero();
    };
    getDenominators = () => {
        const denominators = [];
        for (const m of this._monoms) {
            denominators.push(m.coefficient.denominator);
        }
        return denominators;
    };
    getNumerators = () => {
        const numerators = [];
        for (const m of this._monoms) {
            numerators.push(m.coefficient.numerator);
        }
        return numerators;
    };
    lcmDenominator = () => {
        return numeric_1.Numeric.lcm(...this.getDenominators());
    };
    gcdDenominator = () => {
        return numeric_1.Numeric.gcd(...this.getDenominators());
    };
    lcmNumerator = () => {
        return numeric_1.Numeric.lcm(...this.getNumerators());
    };
    gcdNumerator = () => {
        return numeric_1.Numeric.gcd(...this.getNumerators());
    };
    commonMonom = () => {
        let M = new monom_1.Monom().one(), numerator, denominator, degree = this.degree();
        numerator = this.gcdNumerator();
        denominator = this.gcdDenominator();
        M.coefficient = new coefficients_1.Fraction(numerator, denominator);
        for (let L of this.variables) {
            M.setLetter(L, degree);
            for (let m of this._monoms) {
                M.setLetter(L, coefficients_1.Fraction.min(m.degree(L), M.degree(L)));
                if (M.degree(L).isZero()) {
                    break;
                }
            }
        }
        return M;
    };
}
exports.Polynom = Polynom;


/***/ }),

/***/ "./src/maths/algebra/rational.ts":
/*!***************************************!*\
  !*** ./src/maths/algebra/rational.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rational = void 0;
const polynom_1 = __webpack_require__(/*! ./polynom */ "./src/maths/algebra/polynom.ts");
const coefficients_1 = __webpack_require__(/*! ../coefficients */ "./src/maths/coefficients/index.ts");
class Rational {
    _rawString;
    _numerator;
    _denominator;
    constructor(numerator, denominator) {
        this._numerator = numerator ? numerator.clone() : new polynom_1.Polynom();
        this._denominator = denominator ? denominator.clone() : new polynom_1.Polynom();
    }
    clone = () => {
        this._numerator = this._numerator.clone();
        this._denominator = this._denominator.clone();
        return this;
    };
    get tex() {
        return `\\dfrac{ ${this._numerator.tex} }{ ${this._denominator.tex} }`;
    }
    get texFactors() {
        this._numerator.factorize();
        this._denominator.factorize();
        return `\\dfrac{ ${this._numerator.texFactors} }{ ${this._denominator.texFactors} }`;
    }
    get numerator() {
        return this._numerator;
    }
    get denominator() {
        return this._denominator;
    }
    domain = () => {
        let zeroes = this._denominator.getZeroes();
        if (zeroes.length === 0 || zeroes[0] === false) {
            return '\\mathbb{R}';
        }
        else if (zeroes[0] === true) {
            return '\\varnothing';
        }
        else {
            return '\\mathbb{R}\\setminus\\left{' +
                zeroes.map(x => {
                    return (typeof x === 'boolean') ? '' : x.frac;
                })
                    .join(';') + '\\right}';
        }
    };
    amplify = (P) => {
        this._numerator.multiply(P);
        this._denominator.multiply(P);
        return this;
    };
    simplify = (P) => {
        let NumeratorEuclidien = this._numerator.euclidian(P);
        if (!NumeratorEuclidien.reminder.isZero()) {
            return this;
        }
        let DenominatorEuclidien = this._denominator.euclidian(P);
        if (!DenominatorEuclidien.reminder.isZero()) {
            return this;
        }
        this._numerator = NumeratorEuclidien.quotient;
        this._denominator = DenominatorEuclidien.quotient;
        return this;
    };
    reduce = () => {
        console.log(this._numerator.tex);
        this._numerator.factorize();
        console.log(this._numerator.factors.map(x => x.tex));
        for (let f of this._numerator.factors) {
            this.simplify(f);
        }
        return this;
    };
    opposed = () => {
        this._numerator.opposed();
        return this;
    };
    add = (R) => {
        let denominator = this._denominator.clone();
        this.amplify(R._denominator);
        this._numerator.add(R._numerator.clone().multiply(denominator));
        return this;
    };
    subtract = (R) => {
        return this.add(R.clone().opposed());
    };
    limits = (value, letter) => {
        if (value === Infinity || value === -Infinity) {
            let N = this._numerator.monomByDegree(this._numerator.degree(letter), letter), D = this._denominator.monomByDegree(this._denominator.degree(letter), letter);
            N.divide(D);
            if (N.degree(letter).isStrictlyPositive()) {
                return N.coefficient.sign() * (Math.pow((value > 0 ? 1 : -1), N.degree(letter).value % 2)) === 1 ? Infinity : -Infinity;
            }
            if (N.degree(letter).isZero()) {
                return N.coefficient;
            }
            if (N.degree(letter).isStrictlyPositive()) {
                return N.coefficient.sign() * (Math.pow(-1, N.degree(letter).value % 2)) === 1 ? 0 : -0;
            }
        }
        else {
            return this._numerator.evaluate({ letter: new coefficients_1.Fraction(value) }).divide(this._denominator.evaluate({ letter: new coefficients_1.Fraction(value) }));
        }
    };
}
exports.Rational = Rational;


/***/ }),

/***/ "./src/maths/coefficients/fraction.ts":
/*!********************************************!*\
  !*** ./src/maths/coefficients/fraction.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Fraction = void 0;
const numeric_1 = __webpack_require__(/*! ../numeric */ "./src/maths/numeric.ts");
class Fraction {
    _numerator;
    _denominator;
    constructor(value, denominatorOrPeriodic) {
        this._numerator = 1;
        this._denominator = 1;
        if (value !== undefined) {
            this.parse(value, denominatorOrPeriodic);
        }
        return this;
    }
    get isFraction() {
        return true;
    }
    get numerator() {
        return this._numerator;
    }
    set numerator(value) {
        this._numerator = value;
    }
    get denominator() {
        return this._denominator;
    }
    set denominator(value) {
        this._denominator = value;
    }
    get value() {
        return this._numerator / this._denominator;
    }
    get tex() {
        if (this._denominator === 1) {
            return `${this._numerator}`;
        }
        else if (this._numerator < 0) {
            return `-\\frac{ ${-this._numerator} }{ ${this._denominator} }`;
        }
        else {
            return `\\frac{ ${this._numerator} }{ ${this._denominator} }`;
        }
    }
    get display() {
        if (this._denominator === 1) {
            return `${this._numerator}`;
        }
        else {
            return `${this._numerator}/${this._denominator}`;
        }
    }
    get frac() {
        return this.tex;
    }
    get dfrac() {
        return this.tex.replace('\\frac', '\\dfrac');
    }
    parse = (value, denominatorOrPeriodic) => {
        let S;
        if (value === null || value === "") {
            this._numerator = 0;
            this._denominator = 1;
            return this;
        }
        switch (typeof value) {
            case "string":
                S = value.split('/');
                if (S.length > 2)
                    throw "Two many divide signs";
                if (S.map(x => x === '' || isNaN(Number(x))).includes(true))
                    throw "Not a number";
                if (S.length === 1) {
                    return this.parse(+S[0]);
                }
                else if (S.length === 2) {
                    if (S[1] === '0') {
                        this._numerator = NaN;
                        this._denominator = 1;
                    }
                    else {
                        this._numerator = +S[0];
                        this._denominator = +S[1];
                    }
                }
                else {
                    this._numerator = NaN;
                    this._denominator = 1;
                }
                break;
            case "number":
                if (Number.isSafeInteger(value)) {
                    this._numerator = +value;
                    if (denominatorOrPeriodic === undefined || !Number.isSafeInteger(denominatorOrPeriodic)) {
                        this._denominator = 1;
                    }
                    else {
                        this._denominator = +denominatorOrPeriodic;
                    }
                }
                else {
                    let p = (value.toString()).split('.')[1].length;
                    if (denominatorOrPeriodic === undefined) {
                        this._numerator = value * Math.pow(10, p);
                        this._denominator = Math.pow(10, p);
                    }
                    else if (Number.isSafeInteger(denominatorOrPeriodic)) {
                        this._numerator = value * Math.pow(10, p) - Math.floor(value * Math.pow(10, p - denominatorOrPeriodic));
                        this.denominator = Math.pow(10, p) - Math.pow(10, p - denominatorOrPeriodic);
                    }
                }
                break;
            case "object":
                if (value instanceof Fraction) {
                    this._numerator = +value.numerator;
                    this._denominator = +value.denominator;
                }
                break;
        }
        return this;
    };
    clone = () => {
        let F = new Fraction();
        F.numerator = +this._numerator;
        F.denominator = +this._denominator;
        return F;
    };
    zero = () => {
        this._numerator = 0;
        this._denominator = 1;
        return this;
    };
    one = () => {
        this._numerator = 1;
        this._denominator = 1;
        return this;
    };
    infinite = () => {
        this._numerator = Infinity;
        this._denominator = 1;
        return this;
    };
    invalid = () => {
        this._numerator = NaN;
        this._denominator = 1;
        return this;
    };
    opposed = () => {
        this._numerator = -this._numerator;
        return this;
    };
    add = (F) => {
        if (F instanceof Fraction) {
            let N = this._numerator, D = this._denominator;
            this._numerator = N * F.denominator + F.numerator * D;
            this._denominator = D * F.denominator;
        }
        else {
            return this.add(new Fraction(F));
        }
        return this.reduce();
    };
    subtract = (F) => {
        if (F instanceof Fraction) {
            return this.add(F.clone().opposed());
        }
        else {
            return this.add(-F);
        }
    };
    multiply = (F) => {
        let Q = new Fraction(F);
        this._numerator = this._numerator * Q.numerator;
        this._denominator = this._denominator * Q.denominator;
        return this.reduce();
    };
    divide = (F) => {
        let Q = new Fraction(F);
        if (Q.numerator === 0) {
            return new Fraction().infinite();
        }
        let N = +this._numerator, D = +this._denominator;
        this._numerator = N * Q.denominator;
        this._denominator = D * Q.numerator;
        return this.reduce();
    };
    invert = () => {
        let n = +this._numerator, d = +this._denominator;
        this._numerator = d;
        this._denominator = n;
        return this;
    };
    pow = (p) => {
        if (p instanceof Fraction) {
            return this.pow(p.value);
        }
        if (!Number.isSafeInteger(p)) {
            return this.invalid();
        }
        this.reduce();
        if (p < 0) {
            this.invert();
        }
        this._numerator = this._numerator ** Math.abs(p);
        this._denominator = this._denominator ** Math.abs(p);
        return this;
    };
    root = (p) => {
        if (p === 0) {
            return this;
        }
        if (p < 0) {
            this.invert();
        }
        let n = Math.pow(this._numerator, Math.abs(1 / p)), d = Math.pow(this._denominator, Math.abs(1 / p));
        this._numerator = Math.pow(this._numerator, Math.abs(1 / p));
        this._denominator = Math.pow(this._denominator, Math.abs(1 / p));
        return this;
    };
    sqrt = () => {
        return this.root(2);
    };
    abs = () => {
        this._numerator = Math.abs(this._numerator);
        this._denominator = Math.abs(this._denominator);
        return this;
    };
    static max = (...fractions) => {
        let M = new Fraction(fractions[0]);
        for (let m of fractions) {
            let compare = new Fraction(m);
            if (compare.greater(M)) {
                M = compare.clone();
            }
        }
        return M;
    };
    static min = (...fractions) => {
        let M = new Fraction(fractions[0]);
        for (let m of fractions) {
            let compare = new Fraction(m);
            if (compare.lesser(M)) {
                M = compare.clone();
            }
        }
        return M;
    };
    reduce = () => {
        let g = numeric_1.Numeric.gcd(this._numerator, this._denominator);
        this._numerator = this._numerator / g;
        this._denominator = this._denominator / g;
        if (this._denominator < 0) {
            this._denominator = -this._denominator;
            this._numerator = -this._numerator;
        }
        return this;
    };
    amplify = (k) => {
        if (Number.isSafeInteger(k)) {
            this._numerator *= k;
            this._denominator *= k;
        }
        return this;
    };
    compare = (F, sign) => {
        if (sign === undefined) {
            sign = '=';
        }
        let compareFraction;
        if (F instanceof Fraction) {
            compareFraction = F.clone();
        }
        else {
            compareFraction = new Fraction(F);
        }
        switch (sign) {
            case '>':
                return this.value > compareFraction.value;
            case ">=" || 0 || 0:
                return this.value >= compareFraction.value;
            case "<":
                return this.value < compareFraction.value;
            case "<=" || 0 || 0:
                return this.value <= compareFraction.value;
            case "=":
                return this.value === compareFraction.value;
            case "<>":
                return this.value !== compareFraction.value;
            default:
                return false;
        }
    };
    lesser = (than) => {
        return this.compare(than, '<');
    };
    leq = (than) => {
        return this.compare(than, '<=');
    };
    greater = (than) => {
        return this.compare(than, '>');
    };
    geq = (than) => {
        return this.compare(than, '>=');
    };
    isEqual = (than) => {
        return this.compare(than, '=');
    };
    isNotEqual = (than) => {
        return this.compare(than, '<>');
    };
    isOpposed = (p) => {
        return this.isEqual(p.clone().opposed());
    };
    isInverted = (p) => {
        return this.isEqual(new Fraction().one().divide(p.clone()));
    };
    isZero = () => {
        return this._numerator === 0;
    };
    isNotZero = () => {
        return this._numerator !== 0;
    };
    isOne = () => {
        return this._numerator === 1 && this._denominator === 1;
    };
    isNegativeOne = () => {
        return this._numerator === -1 && this._denominator === 1;
    };
    isPositive = () => {
        return this.sign() === 1;
    };
    isNegative = () => {
        return this.sign() === -1;
    };
    isStrictlyPositive = () => {
        return this.value > 0;
    };
    isStrictlyNegative = () => {
        return this.value < 0;
    };
    isNaN = () => {
        return isNaN(this._numerator);
    };
    isInfinity = () => {
        return this._numerator === Infinity;
    };
    isFinite = () => {
        return !this.isInfinity();
    };
    isSquare = () => {
        return Math.sqrt(this._numerator) % 1 === 0 && Math.sqrt(this._denominator) % 1 === 0;
    };
    isReduced = () => {
        return Math.abs(numeric_1.Numeric.gcd(this._numerator, this._denominator)) === 1;
    };
    isNatural = () => {
        return this.clone().reduce().denominator === 1;
    };
    isRational = () => {
        return !this.isNatural();
    };
    isEven = () => {
        return this.isNatural() && this.value % 2 === 0;
    };
    isOdd = () => {
        return this.isNatural() && this.value % 2 === 1;
    };
    sign = () => {
        return (this._numerator * this._denominator >= 0) ? 1 : -1;
    };
    areEquals = (...F) => {
        for (let i = 0; i < F.length; i++) {
            if (!this.isEqual(F[i])) {
                return false;
            }
        }
        return true;
    };
}
exports.Fraction = Fraction;


/***/ }),

/***/ "./src/maths/coefficients/index.ts":
/*!*****************************************!*\
  !*** ./src/maths/coefficients/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./fraction */ "./src/maths/coefficients/fraction.ts"), exports);
__exportStar(__webpack_require__(/*! ./nthroot */ "./src/maths/coefficients/nthroot.ts"), exports);


/***/ }),

/***/ "./src/maths/coefficients/nthroot.ts":
/*!*******************************************!*\
  !*** ./src/maths/coefficients/nthroot.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nthroot = void 0;
class Nthroot {
    _radical;
    _nth;
    _coefficient;
    _isValid;
    constructor(...values) {
        this._radical = 1;
        this._coefficient = 1;
        this._nth = 2;
        this._isValid = true;
        if (values !== undefined) {
            this.parse(values[0], values[1], values[2]);
        }
    }
    get radical() {
        return this._radical;
    }
    set radical(value) {
        this._radical = value;
    }
    get nth() {
        return this._nth;
    }
    set nth(value) {
        if (Number.isSafeInteger(value) && value >= 2) {
            this._nth = value;
        }
        else {
            console.log('Error setting the nth root');
            this._nth = 2;
        }
    }
    get coefficient() {
        return this._coefficient;
    }
    set coefficient(value) {
        this._coefficient = value;
    }
    get tex() {
        let C;
        if (this._coefficient === 1) {
            C = '';
        }
        else if (this._coefficient === -1) {
            C = '-';
        }
        else {
            C = this._coefficient.toString();
        }
        if (this._radical === 1) {
            return `${this._coefficient}`;
        }
        else {
            if (this._nth === 2) {
                return `${C}\\sqrt{${this._radical}}`;
            }
            else {
                return `${C}\\sqrt[${this._nth}]{${this._radical}}`;
            }
        }
    }
    get value() {
        return this._coefficient * Math.pow(this._radical, 1 / this._nth);
    }
    parse = (radical, nthroot, coefficient) => {
        this._coefficient = (coefficient === undefined) ? 1 : coefficient;
        this._nth = (nthroot === undefined) ? 2 : nthroot;
        this._radical = (radical === undefined) ? 1 : radical;
        if (this._nth % 2 === 0 && this._radical < 0) {
            this._isValid = false;
        }
        return this;
    };
    reduce = () => {
        let V = Math.floor(Math.pow(this._radical, 1 / this._nth));
        while (V > 1) {
            if (this._radical % Math.pow(V, this._nth) === 0) {
                this._coefficient *= V;
                this._radical = this._radical / Math.pow(V, this._nth);
                V = Math.floor(Math.pow(this._radical, 1 / this._nth));
                continue;
            }
            V--;
        }
        return this;
    };
    multiply = (N) => {
        this._radical *= N.radical;
        return this.reduce();
    };
    hasRadical = () => {
        return !(this._radical === 1 || this._radical === 0 || this._isValid === false);
    };
}
exports.Nthroot = Nthroot;


/***/ }),

/***/ "./src/maths/geometry/circle.ts":
/*!**************************************!*\
  !*** ./src/maths/geometry/circle.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Circle = void 0;
const point_1 = __webpack_require__(/*! ./point */ "./src/maths/geometry/point.ts");
const coefficients_1 = __webpack_require__(/*! ../coefficients */ "./src/maths/coefficients/index.ts");
const algebra_1 = __webpack_require__(/*! ../algebra */ "./src/maths/algebra/index.ts");
const vector_1 = __webpack_require__(/*! ./vector */ "./src/maths/geometry/vector.ts");
const triangle_1 = __webpack_require__(/*! ./triangle */ "./src/maths/geometry/triangle.ts");
class Circle {
    _center;
    _squareRadius;
    _cartesian;
    _exists;
    constructor(...values) {
        this._exists = false;
        if (values !== undefined) {
            this.parse(...values);
        }
    }
    get center() {
        return this._center;
    }
    get exists() {
        return this._exists;
    }
    get squareRadius() {
        return this._squareRadius;
    }
    get radius() {
        if (this._squareRadius.isSquare()) {
            return {
                tex: this._squareRadius.clone().sqrt().tex,
                display: this._squareRadius.clone().sqrt().display,
            };
        }
        else {
            return {
                tex: `\\sqrt{${this._squareRadius.tex}}`,
                display: `sqrt(${this._squareRadius.display})`
            };
        }
        return this._squareRadius;
    }
    get tex() {
        if (this._exists) {
            let cx, cy;
            if (this._center.x.isZero()) {
                cx = 'x^2';
            }
            else {
                cx = `\\left(x${this._center.x.isNegative() ? '+' : '-'}${this._center.x.clone().abs().tex}\\right)^2`;
            }
            if (this._center.y.isZero()) {
                cy = 'y^2';
            }
            else {
                cy = `\\left(y${this._center.y.isNegative() ? '+' : '-'}${this._center.y.clone().abs().tex}\\right)^2`;
            }
            return `${cx}+${cy}=${this._squareRadius.tex}`;
        }
        else {
            return `\\text{le cercle n'existe pas.}`;
        }
    }
    get developed() {
        return this._cartesian.tex;
    }
    get display() {
        return this._cartesian.display;
    }
    get cartesian() {
        return this._cartesian;
    }
    clone() {
        this._center = this._center.clone();
        this._squareRadius = this._squareRadius.clone();
        this._calculateCartesian();
        return this;
    }
    _reset() {
        this._center = null;
        this._squareRadius = null;
        this._cartesian = null;
        this._exists = false;
        return this;
    }
    parse(...values) {
        this._reset();
        if (typeof values[0] === 'string') {
            this._parseEquation(new algebra_1.Equation(values[0]));
        }
        else if (values[0] instanceof algebra_1.Equation) {
            this._parseEquation(values[0]);
        }
        else if (values[0] instanceof Circle) {
            this._parseCopyCircle(values[0]);
        }
        else if (values[0] instanceof point_1.Point && values.length > 1) {
            if (values[1] instanceof point_1.Point) {
                if (values[2] instanceof point_1.Point) {
                    this._parseThroughtThreePoints(values[0], values[1], values[2]);
                }
                else {
                    this._parseCenterAndPointThrough(values[0], values[1]);
                }
            }
            else if (values[1] instanceof coefficients_1.Fraction || typeof values[1] === 'number') {
                this._parseCenterAndRadius(values[0], values[1], (typeof values[2] === "boolean") ? values[2] : false);
            }
        }
        if (this._exists) {
            this._calculateCartesian();
            if (this._squareRadius !== undefined && this._squareRadius.isNegative()) {
                this._exists = false;
            }
        }
        return this;
    }
    _calculateCartesian() {
        this._cartesian = (new algebra_1.Equation(new algebra_1.Polynom(`(x-(${this._center.x.display}))^2+(y-(${this._center.y.display}))^2`), new algebra_1.Polynom(`${this._squareRadius.display}`))).moveLeft();
    }
    _parseCopyCircle(circle) {
        this._center = circle.center.clone();
        this._squareRadius = circle.squareRadius.clone();
        this._calculateCartesian();
        this._exists = circle.exists;
        return this;
    }
    _parseCenterAndRadius(center, radius, square) {
        this._center = center.clone();
        if (square) {
            this._squareRadius = (new coefficients_1.Fraction(radius));
        }
        else {
            this._squareRadius = new coefficients_1.Fraction(radius).pow(2);
        }
        this._exists = true;
        return this;
    }
    _parseCenterAndPointThrough(center, pointThrough) {
        this._center = center.clone();
        this._squareRadius = new vector_1.Vector(this._center, pointThrough).normSquare;
        this._exists = true;
        return this;
    }
    _parseEquation(equ) {
        this._exists = false;
        equ.moveLeft();
        if (equ.degree('x').value === 2 && equ.degree('y').value === 2) {
            let x2 = equ.left.monomByDegree(2, 'x'), y2 = equ.left.monomByDegree(2, 'y'), x1, y1, c;
            if (x2.coefficient.isEqual(y2.coefficient)) {
                equ.divide(x2.coefficient);
                x1 = equ.left.monomByDegree(1, 'x');
                y1 = equ.left.monomByDegree(1, 'y');
                c = equ.left.monomByDegree(0);
                this._center = new point_1.Point(x1.coefficient.clone().divide(2).opposed(), y1.coefficient.clone().divide(2).opposed());
                this._squareRadius = c.coefficient.clone().opposed()
                    .add(this._center.x.clone().pow(2))
                    .add(this._center.y.clone().pow(2));
                this._calculateCartesian();
                this._exists = true;
            }
            else {
                this._center = null;
                this._squareRadius = null;
                this._exists = false;
            }
        }
        return this;
    }
    _parseThroughtThreePoints(A, B, C) {
        let T = new triangle_1.Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(), mAC = T.remarquables.mediators.AC.clone();
        this.parse(mAB.intersection(mAC).point, A);
        return this;
    }
    relativePosition = (L) => {
        let distance = L.distanceTo(this.center), radius = Math.sqrt(this._squareRadius.value);
        if (distance.value - radius > 0.0000000001) {
            return 0;
        }
        else if (Math.abs(distance.value - radius) < 0.0000000001) {
            return 1;
        }
        else {
            return 2;
        }
    };
    lineIntersection = (L) => {
        let intersectionPoints = [], solX;
        if (this._cartesian === null) {
            return [];
        }
        const equX = this._cartesian.clone(), lineX = L.equation.clone().isolate('x'), lineY = L.equation.clone().isolate('y');
        if (lineX instanceof algebra_1.Equation && lineY instanceof algebra_1.Equation) {
            equX.replaceBy('y', lineY.right).simplify();
            equX.solve();
            for (let x of equX.solutions) {
                if (x.exact === false && isNaN(x.value)) {
                    continue;
                }
                solX = new coefficients_1.Fraction(x.exact === false ? x.value : x.exact);
                intersectionPoints.push(new point_1.Point(solX.clone(), lineY.right.evaluate(solX)));
            }
        }
        return intersectionPoints;
    };
}
exports.Circle = Circle;


/***/ }),

/***/ "./src/maths/geometry/index.ts":
/*!*************************************!*\
  !*** ./src/maths/geometry/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./vector */ "./src/maths/geometry/vector.ts"), exports);
__exportStar(__webpack_require__(/*! ./triangle */ "./src/maths/geometry/triangle.ts"), exports);
__exportStar(__webpack_require__(/*! ./point */ "./src/maths/geometry/point.ts"), exports);
__exportStar(__webpack_require__(/*! ./circle */ "./src/maths/geometry/circle.ts"), exports);
__exportStar(__webpack_require__(/*! ./line */ "./src/maths/geometry/line.ts"), exports);


/***/ }),

/***/ "./src/maths/geometry/line.ts":
/*!************************************!*\
  !*** ./src/maths/geometry/line.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Line = void 0;
const coefficients_1 = __webpack_require__(/*! ../coefficients */ "./src/maths/coefficients/index.ts");
const vector_1 = __webpack_require__(/*! ./vector */ "./src/maths/geometry/vector.ts");
const point_1 = __webpack_require__(/*! ./point */ "./src/maths/geometry/point.ts");
const algebra_1 = __webpack_require__(/*! ../algebra */ "./src/maths/algebra/index.ts");
const numeric_1 = __webpack_require__(/*! ../numeric */ "./src/maths/numeric.ts");
var LinePropriety;
(function (LinePropriety) {
    LinePropriety[LinePropriety["None"] = 0] = "None";
    LinePropriety[LinePropriety["Parallel"] = 1] = "Parallel";
    LinePropriety[LinePropriety["Perpendicular"] = 2] = "Perpendicular";
})(LinePropriety || (LinePropriety = {}));
class Line {
    _a;
    _b;
    _c;
    _OA;
    _d;
    _n;
    _exists;
    _referencePropriety;
    _referenceLine;
    static PERPENDICULAR = LinePropriety.Perpendicular;
    static PARALLEL = LinePropriety.Parallel;
    constructor(...values) {
        this._exists = false;
        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }
    get exists() {
        return this._exists;
    }
    get equation() {
        return new algebra_1.Equation(new algebra_1.Polynom().parse('xy', this._a, this._b, this._c), new algebra_1.Polynom('0')).simplify();
    }
    get tex() {
        let canonical = this.equation;
        if (this._a.isNegative()) {
            canonical.multiply(-1);
        }
        return {
            canonical: canonical.tex,
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.tex : 'y=' + new algebra_1.Polynom().parse('x', this.slope, this.height).tex,
            parametric: `${point_1.Point.pmatrix('x', 'y')} = ${point_1.Point.pmatrix(this._OA.x, this._OA.y)} + k\\cdot ${point_1.Point.pmatrix(this._d.x, this._d.y)}`
        };
    }
    get a() {
        return this._a;
    }
    set a(value) {
        this._a = value;
    }
    get b() {
        return this._b;
    }
    set b(value) {
        this._b = value;
    }
    get c() {
        return this._c;
    }
    set c(value) {
        this._c = value;
    }
    get OA() {
        return this._OA;
    }
    set OA(value) {
        this._OA = value;
    }
    get d() {
        return this._d;
    }
    get n() {
        return this._n;
    }
    get normal() {
        return new vector_1.Vector(this._a, this._b);
    }
    get director() {
        return this._d.clone();
    }
    set d(value) {
        this._d = value;
    }
    get slope() {
        return this._a.clone().opposed().divide(this._b);
    }
    get height() {
        return this._c.clone().opposed().divide(this._b);
    }
    parse = (...values) => {
        this._exists = false;
        if (values.length === 0) {
            return this;
        }
        if (values.length === 1) {
            if (values[0] instanceof Line) {
                return values[0].clone();
            }
            else if (values[0] instanceof algebra_1.Equation) {
                return this.parseEquation(values[0]);
            }
            else if (typeof values[0] === "string") {
                try {
                    let E = new algebra_1.Equation(values[0]);
                    return this.parse(E);
                }
                catch (e) {
                    return this;
                }
            }
        }
        if (values.length === 2) {
            if (values[0] instanceof point_1.Point && values[1] instanceof vector_1.Vector) {
                return this.parseByPointAndVector(values[0], values[1]);
            }
            else if (values[0] instanceof point_1.Point && values[1] instanceof point_1.Point) {
                return this.parseByPointAndVector(values[0], new vector_1.Vector(values[0], values[1]));
            }
            else if (values[0] instanceof vector_1.Vector && values[1] instanceof point_1.Point) {
                return this.parseByPointAndNormal(values[1], values[0]);
            }
        }
        if (values.length === 3) {
            if ((values[0] instanceof coefficients_1.Fraction || typeof values[0] === 'number')
                &&
                    (values[1] instanceof coefficients_1.Fraction || typeof values[1] === 'number')
                &&
                    (values[2] instanceof coefficients_1.Fraction || typeof values[2] === 'number')) {
                return this.parseByCoefficient(values[0], values[1], values[2]);
            }
            else if (values[0] instanceof point_1.Point && values[1] instanceof vector_1.Vector) {
                if (values[2] === LinePropriety.Perpendicular) {
                    return this.parseByPointAndNormal(values[0], values[1]);
                }
                else if (values[2] === LinePropriety.Parallel) {
                    return this.parseByPointAndVector(values[0], values[1]);
                }
            }
        }
        console.log('Someting wrong happend while creating the line');
        return this;
    };
    parseEquation = (equ) => {
        equ.reorder(true);
        let letters = new Set(equ.letters());
        if (!(letters.has('x') || letters.has('y'))) {
            return this;
        }
        for (let elem of ['x', 'y']) {
            if (letters.has(elem)) {
                letters.delete(elem);
            }
        }
        if (letters.size > 0) {
            return this;
        }
        return this.parseByCoefficient(equ.left.monomByLetter('x').coefficient, equ.left.monomByLetter('y').coefficient, equ.left.monomByDegree(0).coefficient);
    };
    parseByCoefficient = (a, b, c) => {
        this._a = new coefficients_1.Fraction(a);
        this._b = new coefficients_1.Fraction(b);
        this._c = new coefficients_1.Fraction(c);
        this._d = new vector_1.Vector(this._b.clone(), this._a.clone().opposed());
        this._OA = new point_1.Point(new coefficients_1.Fraction().zero(), this._c.clone());
        this._n = this._d.clone().normal();
        this._exists = true;
        return this;
    };
    parseByPointAndVector = (P, d) => {
        this.parseByCoefficient(d.y, d.x.clone().opposed(), P.x.clone().multiply(d.y).subtract(P.y.clone().multiply(d.x)).opposed());
        this._OA = P.clone();
        this._d = d.clone();
        this._n = this._d.clone().normal();
        this._exists = true;
        return this;
    };
    parseByPointAndNormal = (P, n) => {
        return this.parseByCoefficient(n.x, n.y, P.x.clone().multiply(n.x)
            .add(P.y.clone().multiply(n.y)).opposed());
    };
    parseByPointAndLine = (P, L, orientation) => {
        if (orientation === undefined) {
            orientation = LinePropriety.Parallel;
        }
        if (orientation === LinePropriety.Parallel) {
            return this.parseByPointAndNormal(P, L.normal);
        }
        else if (orientation === LinePropriety.Perpendicular) {
            return this.parseByPointAndNormal(P, L.director);
        }
        this._exists = false;
        return this;
    };
    clone = () => {
        this._a = this._a.clone();
        this._b = this._b.clone();
        this._c = this._c.clone();
        this._d = this._d.clone();
        this._OA = this._OA.clone();
        this._n = this._n.clone();
        this._exists = this.exists;
        return this;
    };
    isParellelTo = (line) => {
        return this.slope.isEqual(line.slope) && this.height.isNotEqual(line.height);
    };
    isSameAs = (line) => {
        return this.slope.isEqual(line.slope) && this.height.isEqual(line.height);
    };
    simplify = () => {
        let lcm = numeric_1.Numeric.lcm(this._a.denominator, this._b.denominator, this._c.denominator), gcd = numeric_1.Numeric.gcd(this._a.numerator, this._b.numerator, this._c.numerator);
        this.parseByCoefficient(this._a.clone().multiply(lcm).divide(gcd), this._b.clone().multiply(lcm).divide(gcd), this._c.clone().multiply(lcm).divide(gcd));
        return this;
    };
    simplifyDirection = () => {
        let lcm = numeric_1.Numeric.lcm(this._d.x.denominator, this._d.y.denominator), gcd = numeric_1.Numeric.gcd(this._d.x.numerator, this._d.y.numerator);
        this._d.x.multiply(lcm).divide(gcd);
        this._d.y.multiply(lcm).divide(gcd);
        return this;
    };
    intersection = (line) => {
        let Pt = new point_1.Point(), isParallel = false, isSame = false, hasIntersection = true;
        if (this._b.isZero() || line.b.isZero()) {
        }
        if (this.isParellelTo(line)) {
            Pt.x = null;
            Pt.y = null;
            isParallel = true;
        }
        else if (this.isSameAs(line)) {
            Pt.x = null;
            Pt.y = null;
            isSame = true;
        }
        else {
            Pt.x = this._b.clone().multiply(line.c).subtract(this._c.clone().multiply(line.b))
                .divide(this._a.clone().multiply(line.b).subtract(this._b.clone().multiply(line.a)));
            Pt.y = this._a.clone().multiply(line.c).subtract(this._c.clone().multiply(line.a))
                .divide(this._b.clone().multiply(line.a).subtract(this._a.clone().multiply(line.b)));
        }
        return {
            point: Pt,
            hasIntersection: !(isParallel || isSame),
            isParallel,
            isSame
        };
    };
    distanceTo(pt) {
        let numerator = pt.x.clone().multiply(this._a)
            .add(pt.y.clone().multiply(this._b))
            .add(this._c).abs(), d2 = this.normal.normSquare;
        if (d2.isZero()) {
            return {
                value: NaN,
                tex: 'Not a line',
                fraction: new coefficients_1.Fraction().infinite()
            };
        }
        let value = numerator.value / Math.sqrt(d2.value), F = numerator.clone().divide(d2.clone().sqrt());
        if (d2.isSquare()) {
            return {
                value,
                tex: F.tex,
                fraction: F
            };
        }
        return {
            value,
            tex: `\\frac{${numerator.tex}}{\\sqrt{${d2.tex}}}`,
            fraction: F
        };
    }
    hitSegment(A, B) {
        let iPt = this.intersection(new Line(A, B));
        if (iPt.hasIntersection) {
            return iPt.point.x.value >= Math.min(A.x.value, B.x.value)
                && iPt.point.x.value <= Math.max(A.x.value, B.x.value)
                && iPt.point.y.value >= Math.min(A.y.value, B.y.value)
                && iPt.point.y.value <= Math.max(A.y.value, B.y.value);
        }
        return false;
    }
    getValueAtX = (value) => {
        const equ = this.equation.clone().isolate('y'), F = new coefficients_1.Fraction(value);
        if (equ instanceof algebra_1.Equation) {
            return equ.right.evaluate({ x: F });
        }
        return;
    };
    getValueAtY = (value) => {
        const equ = this.equation.clone().isolate('x'), F = new coefficients_1.Fraction(value);
        if (equ instanceof algebra_1.Equation) {
            return equ.right.evaluate({ y: F });
        }
        return;
    };
    canonicalAsFloatCoefficient(decimals) {
        if (decimals === undefined) {
            decimals = 2;
        }
        let ca = this._a.value, cb = this._b.value, cc = this._c.value, canonical = '';
        if (!this._a.isZero()) {
            if (this._a.isOne()) {
                canonical = 'x';
            }
            else if (this._a.clone().opposed().isOne()) {
                canonical = '-x';
            }
            else {
                canonical = this._a.value.toFixed(decimals) + 'x';
            }
        }
        if (!this._b.isZero()) {
            if (this._b.isPositive()) {
                canonical += '+';
            }
            canonical += this._b.value.toFixed(decimals) + 'y';
        }
        if (!this._c.isZero()) {
            if (this._c.isPositive()) {
                canonical += '+';
            }
            canonical += this._c.value.toFixed(decimals);
        }
        return canonical + '=0';
    }
}
exports.Line = Line;


/***/ }),

/***/ "./src/maths/geometry/point.ts":
/*!*************************************!*\
  !*** ./src/maths/geometry/point.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Point = void 0;
const coefficients_1 = __webpack_require__(/*! ../coefficients */ "./src/maths/coefficients/index.ts");
class PointXY {
    x;
    y;
}
class Point {
    _x;
    _y;
    _exist;
    constructor(...values) {
        this._x = new coefficients_1.Fraction().zero();
        this._y = new coefficients_1.Fraction().zero();
        if (values !== undefined) {
            this.parse(...values);
        }
        return this;
    }
    ;
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get tex() {
        let pts = [];
        pts.push(this._x.tex);
        pts.push(this._y.tex);
        return `\\left(${pts.join(';')}\\right)`;
    }
    get display() {
        let pts = [];
        pts.push(this._x.tex);
        pts.push(this._y.tex);
        return `(${pts.join(';')})`;
    }
    parse = (...values) => {
        this.zero();
        if (values.length === 0) {
            return this;
        }
        if (values.length === 1) {
            if (values[0] instanceof Point) {
                this._x = values[0].x.clone();
                this._y = values[0].y.clone();
                return this;
            }
            if (typeof values[0] === 'string') {
                let xy = values[0].split(',');
                if (xy.length === 2) {
                    this._x = new coefficients_1.Fraction(xy[0]).reduce();
                    this._y = new coefficients_1.Fraction(xy[1]).reduce();
                    return this;
                }
            }
            if (values[0] instanceof PointXY) {
                this._x = new coefficients_1.Fraction(values[0].x).reduce();
                this._y = new coefficients_1.Fraction(values[0].y).reduce();
                return this;
            }
            else {
                return this.zero();
            }
        }
        if (values.length === 2) {
            this._x = new coefficients_1.Fraction(values[0]).reduce();
            this._y = new coefficients_1.Fraction(values[1]).reduce();
            return this;
        }
        return this;
    };
    clone = () => {
        this._x = this._x.clone();
        this._y = this._y.clone();
        return this;
    };
    zero = () => {
        this._x = new coefficients_1.Fraction(null);
        this._y = new coefficients_1.Fraction(null);
        return this;
    };
    origin = () => {
        this.zero();
        return this;
    };
    middleOf = (P1, P2) => {
        this._x = P1.x.clone().add(P2.x).divide(2);
        this._y = P1.y.clone().add(P2.y).divide(2);
        return this;
    };
    texValues = (numberOfDigits) => {
        let pts = [];
        pts.push(this._x.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));
        pts.push(this._y.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));
        return `\\left(${pts.join(';')}\\right)`;
    };
    static pmatrix = (a, b, c) => {
        if (c === undefined) {
            return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\end{pmatrix}`;
        }
        else {
            return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\\\ ${c.tex ? c.tex : c} \\end{pmatrix}`;
        }
    };
}
exports.Point = Point;


/***/ }),

/***/ "./src/maths/geometry/triangle.ts":
/*!****************************************!*\
  !*** ./src/maths/geometry/triangle.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Triangle = void 0;
const point_1 = __webpack_require__(/*! ./point */ "./src/maths/geometry/point.ts");
const fraction_1 = __webpack_require__(/*! ../coefficients/fraction */ "./src/maths/coefficients/fraction.ts");
const vector_1 = __webpack_require__(/*! ./vector */ "./src/maths/geometry/vector.ts");
const line_1 = __webpack_require__(/*! ./line */ "./src/maths/geometry/line.ts");
const equation_1 = __webpack_require__(/*! ../algebra/equation */ "./src/maths/algebra/equation.ts");
class Triangle {
    _A;
    _B;
    _C;
    _lines;
    _middles;
    _remarquables;
    constructor(...values) {
        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }
    get A() {
        return this._A;
    }
    get B() {
        return this._B;
    }
    get C() {
        return this._C;
    }
    get AB() {
        return this.getSegment('A', 'B');
    }
    get BA() {
        return this.getSegment('B', 'A');
    }
    get BC() {
        return this.getSegment('B', 'C');
    }
    get CB() {
        return this.getSegment('C', 'B');
    }
    get AC() {
        return this.getSegment('A', 'C');
    }
    get CA() {
        return this.getSegment('C', 'A');
    }
    get isRectangle() {
        if (this.AB.isNormalTo(this.BC)) {
            return true;
        }
        if (this.AB.isNormalTo(this.AC)) {
            return true;
        }
        if (this.BC.isNormalTo(this.AC)) {
            return true;
        }
        return false;
    }
    get isEquilateral() {
        return this.AB.normSquare.isEqual(this.BC.normSquare) &&
            this.AB.normSquare.isEqual(this.AC.normSquare);
    }
    get isIsocele() {
        return this.AB.normSquare.isEqual(this.BC.normSquare) ||
            this.AB.normSquare.isEqual(this.AC.normSquare) ||
            this.BC.normSquare.isEqual(this.AC.normSquare);
    }
    get lines() {
        return this._lines;
    }
    get remarquables() {
        return this._remarquables;
    }
    parse = (...values) => {
        if (values.length === 6) {
            let v = values.map((x) => new fraction_1.Fraction(x));
            return this.parse(new point_1.Point(v[0], v[1]), new point_1.Point(v[2], v[3]), new point_1.Point(v[4], v[5]));
        }
        else if (values.length === 3) {
            if (values.filter((x) => typeof x === 'string').length === 3) {
                return this.parse(...values.map((x) => new line_1.Line(x)));
            }
            else if (values.filter((x) => x instanceof line_1.Line).length === 3) {
                this._lines = {
                    'AB': values[0],
                    'BC': values[1],
                    'AC': values[2]
                };
                let intersect = values[0].intersection(values[1]);
                if (intersect.hasIntersection) {
                    this._B = intersect.point.clone();
                }
                else {
                    return this;
                }
                intersect = values[1].intersection(values[2]);
                if (intersect.hasIntersection) {
                    this._C = intersect.point.clone();
                }
                else {
                    return this;
                }
                intersect = values[2].intersection(values[0]);
                if (intersect.hasIntersection) {
                    this._A = intersect.point.clone();
                }
                else {
                    return this;
                }
            }
            else {
                if (values.filter((x) => (x instanceof point_1.Point)).length < 3) {
                    return this.parse(new point_1.Point(values[0]), new point_1.Point(values[1]), new point_1.Point(values[2]));
                }
                this._A = values[0].clone();
                this._B = values[1].clone();
                this._C = values[2].clone();
                this._lines = {
                    'AB': new line_1.Line(this._A, this._B),
                    'BC': new line_1.Line(this._B, this._C),
                    'AC': new line_1.Line(this._A, this._C)
                };
            }
        }
        else if (values.length === 1) {
            if (values[0] instanceof Triangle) {
                return values[0].clone();
            }
        }
        this._updateTriangle();
        return this;
    };
    clone = () => {
        this._A = this._A.clone();
        this._B = this._B.clone();
        this._C = this._C.clone();
        this._lines = {
            'AB': this._lines.AB.clone(),
            'BC': this._lines.BC.clone(),
            'AC': this._lines.AC.clone()
        };
        this._updateTriangle();
        return this;
    };
    _updateTriangle = () => {
        this._middles = {
            'AB': new point_1.Point().middleOf(this._A, this._B),
            'AC': new point_1.Point().middleOf(this._A, this._C),
            'BC': new point_1.Point().middleOf(this._B, this._C)
        };
        this._remarquables = this._calculateRemarquableLines();
    };
    getPointByName = (ptName) => {
        switch (ptName.toUpperCase()) {
            case 'A':
                return this._A;
            case 'B':
                return this._B;
            case 'C':
                return this._C;
        }
        return this._A;
    };
    getSegment = (ptName1, ptName2) => {
        return new vector_1.Vector(this.getPointByName(ptName1), this.getPointByName(ptName2));
    };
    _calculateRemarquableLines = () => {
        let remarquables = {
            'medians': {
                'A': new line_1.Line(this._A, this._middles.BC),
                'B': new line_1.Line(this._B, this._middles.AC),
                'C': new line_1.Line(this._C, this._middles.AB),
                'intersection': null
            },
            'mediators': {
                'AB': new line_1.Line(this._middles.AB, new vector_1.Vector(this._A, this._B).normal()),
                'AC': new line_1.Line(this._middles.AC, new vector_1.Vector(this._A, this._C).normal()),
                'BC': new line_1.Line(this._middles.BC, new vector_1.Vector(this._B, this._C).normal()),
                'intersection': null
            },
            'heights': {
                'A': new line_1.Line(this._A, new vector_1.Vector(this._B, this._C).normal()),
                'B': new line_1.Line(this._B, new vector_1.Vector(this._A, this._C).normal()),
                'C': new line_1.Line(this._C, new vector_1.Vector(this._A, this._B).normal()),
                'intersection': null
            },
            'bisectors': {
                'A': this._calculateBisectors('A'),
                'B': this._calculateBisectors('B'),
                'C': this._calculateBisectors('C'),
                'intersection': null
            }
        };
        remarquables.medians.intersection = remarquables.medians.A.intersection(remarquables.medians.B).point;
        remarquables.mediators.intersection = remarquables.mediators.AB.intersection(remarquables.mediators.BC).point;
        remarquables.heights.intersection = remarquables.heights.A.intersection(remarquables.heights.B).point;
        remarquables.bisectors.intersection = remarquables.bisectors.A.intersection(remarquables.bisectors.B).point;
        return remarquables;
    };
    _calculateBisectors = (pt) => {
        let tlines = this.lines, d1, d2;
        if (pt === 'A') {
            d1 = tlines.AB;
            d2 = tlines.AC;
        }
        else if (pt === 'B') {
            d1 = tlines.AB;
            d2 = tlines.BC;
        }
        else if (pt === 'C') {
            d1 = tlines.BC;
            d2 = tlines.AC;
        }
        let b1 = new line_1.Line(new equation_1.Equation(d1.equation.left.clone().multiply(d2.n.simplify().norm), d2.equation.left.clone().multiply(d1.n.simplify().norm)).reorder(true).simplify()), b2 = new line_1.Line(new equation_1.Equation(d1.equation.left.clone().multiply(d2.n.simplify().norm), d2.equation.left.clone().multiply(d1.n.simplify().norm).opposed()).reorder(true).simplify());
        if (pt === 'A') {
            return b1.hitSegment(this.B, this.C) ? b1 : b2;
        }
        if (pt === 'B') {
            return b1.hitSegment(this.A, this.C) ? b1 : b2;
        }
        if (pt === 'C') {
            return b1.hitSegment(this.B, this.A) ? b1 : b2;
        }
        return b1;
    };
}
exports.Triangle = Triangle;


/***/ }),

/***/ "./src/maths/geometry/vector.ts":
/*!**************************************!*\
  !*** ./src/maths/geometry/vector.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector = void 0;
const fraction_1 = __webpack_require__(/*! ../coefficients/fraction */ "./src/maths/coefficients/fraction.ts");
const numeric_1 = __webpack_require__(/*! ../numeric */ "./src/maths/numeric.ts");
const point_1 = __webpack_require__(/*! ./point */ "./src/maths/geometry/point.ts");
class Vector {
    _x;
    _y;
    constructor(...values) {
        this._x = new fraction_1.Fraction().zero();
        this._y = new fraction_1.Fraction().zero();
        if (values !== undefined) {
            this.parse(...values);
        }
    }
    ;
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get normSquare() {
        return this._x.clone().pow(2).add(this._y.clone().pow(2));
    }
    get norm() {
        return Math.sqrt(this.normSquare.value);
    }
    get tex() {
        return `\\begin{pmatrix}${this._x.tex} \\\\\ ${this._y.tex} \\end{pmatrix}`;
    }
    parse = (...values) => {
        this.zero();
        if (values.length === 0) {
            return this;
        }
        if (values.length === 1) {
            if (values[0] instanceof Vector) {
                return values[0].clone();
            }
            else {
                return this._parseString(values[0]);
            }
        }
        if (values.length >= 2) {
            if (values[0] instanceof point_1.Point && values[1] instanceof point_1.Point) {
                this._x = values[1].x.clone().subtract(values[0].x);
                this._y = values[1].y.clone().subtract(values[0].y);
                return this;
            }
            if (values[0].isFraction || !isNaN(values[0])) {
                this._x = new fraction_1.Fraction(values[0]);
            }
            if (values[1].isFraction || !isNaN(values[1])) {
                this._y = new fraction_1.Fraction(values[1]);
            }
        }
        return this;
    };
    clone = () => {
        let V = new Vector();
        if (this._x !== null) {
            V.x = this._x.clone();
        }
        if (this._y !== null) {
            V.y = this._y.clone();
        }
        return V;
    };
    reset = () => {
        this._x = null;
        this._y = null;
        return this;
    };
    zero = () => {
        this.reset();
        this._x = new fraction_1.Fraction(null);
        this._y = new fraction_1.Fraction(null);
        return this;
    };
    one = () => {
        this._x = new fraction_1.Fraction();
        this._y = new fraction_1.Fraction();
        return this;
    };
    _parseString = (value) => {
        let components = value.split(/[,;\s]/g);
        this.x = new fraction_1.Fraction(components[0] || null);
        this.y = new fraction_1.Fraction(components[1] || null);
        return this;
    };
    opposed = () => {
        this._x.opposed();
        this._y.opposed();
        return this;
    };
    add = (V) => {
        this._x.add(V.x);
        this._y.add(V.y);
        return this;
    };
    subtract = (V) => {
        return this.add(V.clone().opposed());
    };
    scalarProductWithVector = (V) => {
        return this._x.clone().multiply(V.x).add(this._y.clone().multiply(V.y));
    };
    static scalarProduct = (v1, v2) => {
        return v1.x.value * v2.x.value + v1.y.value * v2.y.value;
    };
    normal = () => {
        let x = this.x.clone().opposed(), y = this.y.clone();
        this._x = y;
        this._y = x;
        return this;
    };
    isNormalTo = (v) => {
        return this.scalarProductWithVector(v).isZero();
    };
    multiplyByScalar = (k) => {
        let scalar = new fraction_1.Fraction(k);
        this._x.multiply(scalar);
        this._y.multiply(scalar);
        return this;
    };
    divideByScalar = (k) => {
        return this.multiplyByScalar(new fraction_1.Fraction(k).invert());
    };
    simplify = () => {
        return this.multiplyByScalar(numeric_1.Numeric.lcm(this._x.denominator, this._y.denominator))
            .divideByScalar(numeric_1.Numeric.gcd(this._x.numerator, this._y.numerator));
    };
    angleWith = (V, sharp, radian) => {
        let scalar = this.scalarProductWithVector(V).value, toDegree = radian ? 1 : 180 / Math.PI;
        if (sharp) {
            scalar = Math.abs(scalar);
        }
        return toDegree * Math.acos(scalar / (this.norm * V.norm));
    };
}
exports.Vector = Vector;


/***/ }),

/***/ "./src/maths/numeric.ts":
/*!******************************!*\
  !*** ./src/maths/numeric.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Numeric = void 0;
class Numeric {
    static round(value, decimals = 2) {
        return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
    }
    static prime(nb) {
        let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
        if (nb === undefined) {
            return primes;
        }
        else {
            return primes.slice(0, Math.max(primes.length, nb));
        }
    }
    static dividers(value) {
        let D;
        const maxV = Math.sqrt(Math.abs(value));
        D = [];
        for (let i = 1; i <= maxV; i++) {
            if (value % i === 0) {
                D.push(i);
                D.push(value / i);
            }
        }
        D.sort(function (a, b) { return a - b; });
        return [...new Set(D)];
    }
    static gcd(...values) {
        let gcd2 = function (a, b) {
            if (b === 0) {
                return a;
            }
            return gcd2(b, a % b);
        };
        let g = 1, i = 2;
        if (values.length === 0) {
            return 1;
        }
        if (values.length === 1) {
            if (values[0] === 0) {
                return 1;
            }
            return values[0];
        }
        g = gcd2(values[0], values[1]);
        if (g === 1) {
            return 1;
        }
        for (i = 2; i < values.length; i++) {
            g = gcd2(g, values[i]);
            if (g === 1) {
                break;
            }
        }
        return Math.abs(g);
    }
    static lcm(...values) {
        return values.reduce(function (a, b) {
            return Math.abs(a * b / Numeric.gcd(a, b));
        });
    }
}
exports.Numeric = Numeric;


/***/ }),

/***/ "./src/maths/numexp.ts":
/*!*****************************!*\
  !*** ./src/maths/numexp.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumExp = void 0;
const shutingyard_1 = __webpack_require__(/*! ./shutingyard */ "./src/maths/shutingyard.ts");
const coefficients_1 = __webpack_require__(/*! ./coefficients */ "./src/maths/coefficients/index.ts");
class NumExp {
    _rpn;
    _expression;
    constructor(value) {
        this._expression = value;
        this._rpn = new shutingyard_1.Shutingyard(shutingyard_1.ShutingyardMode.NUMERIC).parse(value).rpn;
    }
    _extractDecimalPart(value) {
        let decimal = value.toString();
        if (!decimal.includes('.')) {
            return '';
        }
        decimal = decimal.split('.')[1];
        return decimal.substring(0, decimal.length - 2);
    }
    _numberCorrection(value) {
        const omega = 0.00000000000001, number_of_digits = 6;
        let decimal = this._extractDecimalPart(value);
        const n9 = decimal.match(/9+$/g);
        const n0 = decimal.match(/0+$/g);
        if (n9 && n9[0].length >= number_of_digits) {
            let mod = this._extractDecimalPart(value + omega), mod0 = mod.match(/0+$/g);
            if (mod0 && mod0[0].length >= number_of_digits) {
                return +((value + omega).toString().split(mod0[0])[0]);
            }
        }
        if (n0 && n0[0].length >= number_of_digits) {
            let mod = this._extractDecimalPart(value - omega), mod9 = mod.match(/9+$/g);
            if (mod9 && mod9[0].length >= number_of_digits) {
                return +((value - omega).toString().split(mod9[0])[0]);
            }
        }
        return value;
    }
    _addToStack(stack, value) {
        stack.push(this._numberCorrection(value));
    }
    evaluate(values) {
        let stack = [];
        for (const element of this._rpn) {
            if (element.tokenType === shutingyard_1.ShutingyardType.COEFFICIENT) {
                if (!isNaN(+element.token)) {
                    this._addToStack(stack, +element.token);
                }
                else {
                    this._addToStack(stack, new coefficients_1.Fraction(element.token).value);
                }
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.VARIABLE) {
                if (values[element.token] !== undefined) {
                    this._addToStack(stack, +values[element.token]);
                }
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.CONSTANT) {
                this._addToStack(stack, shutingyard_1.tokenConstant[element.token]);
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.OPERATION) {
                if (element.token === '*') {
                    const b = +stack.pop(), a = +stack.pop();
                    this._addToStack(stack, a * b);
                }
                else if (element.token === '/') {
                    const b = +stack.pop(), a = +stack.pop();
                    this._addToStack(stack, a / b);
                }
                else if (element.token === '+') {
                    const b = +stack.pop(), a = +stack.pop();
                    this._addToStack(stack, a + b);
                }
                else if (element.token === '-') {
                    const b = +stack.pop(), a = +stack.pop();
                    this._addToStack(stack, a - b);
                }
                else if (element.token === '^') {
                    const b = +stack.pop(), a = +stack.pop();
                    this._addToStack(stack, Math.pow(a, b));
                }
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.FUNCTION) {
                const a = +stack.pop();
                if (element.token === 'sin') {
                    this._addToStack(stack, Math.sin(a));
                }
                else if (element.token === 'cos') {
                    this._addToStack(stack, Math.cos(a));
                }
                else if (element.token === 'tan') {
                    this._addToStack(stack, Math.tan(a));
                }
            }
        }
        if (stack.length === 1) {
            return stack[0];
        }
        else {
            console.error('There was a problem parsing', this._expression, '. The RPN array is', this._rpn);
            return 0;
        }
    }
}
exports.NumExp = NumExp;


/***/ }),

/***/ "./src/maths/random/index.ts":
/*!***********************************!*\
  !*** ./src/maths/random/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Random = void 0;
const rndPolynom_1 = __webpack_require__(/*! ./rndPolynom */ "./src/maths/random/rndPolynom.ts");
const rndMonom_1 = __webpack_require__(/*! ./rndMonom */ "./src/maths/random/rndMonom.ts");
const rndHelpers_1 = __webpack_require__(/*! ./rndHelpers */ "./src/maths/random/rndHelpers.ts");
const rndFraction_1 = __webpack_require__(/*! ./rndFraction */ "./src/maths/random/rndFraction.ts");
__exportStar(__webpack_require__(/*! ./rndTypes */ "./src/maths/random/rndTypes.ts"), exports);
var Random;
(function (Random) {
    function polynom(config) {
        return (new rndPolynom_1.rndPolynom(config)).generate();
    }
    Random.polynom = polynom;
    function monom(config) {
        return (new rndMonom_1.rndMonom(config)).generate();
    }
    Random.monom = monom;
    function fraction(config) {
        return (new rndFraction_1.rndFraction(config)).generate();
    }
    Random.fraction = fraction;
    function number(from, to) {
        return rndHelpers_1.rndHelpers.randomInt(from, to);
    }
    Random.number = number;
    function numberSym(max, allowZero) {
        return rndHelpers_1.rndHelpers.randomIntSym(max, allowZero);
    }
    Random.numberSym = numberSym;
    function bool(percent) {
        return rndHelpers_1.rndHelpers.randomBool(percent);
    }
    Random.bool = bool;
    function array(arr, number) {
        return rndHelpers_1.rndHelpers.randomArray(arr, number);
    }
    Random.array = array;
    function item(arr) {
        return rndHelpers_1.rndHelpers.randomItem(arr);
    }
    Random.item = item;
    function shuffle(arr) {
        rndHelpers_1.rndHelpers.shuffleArray(arr);
    }
    Random.shuffle = shuffle;
})(Random = exports.Random || (exports.Random = {}));


/***/ }),

/***/ "./src/maths/random/randomCore.ts":
/*!****************************************!*\
  !*** ./src/maths/random/randomCore.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomCore = void 0;
class randomCore {
    _config;
    _defaultConfig;
    mergeConfig = (config, defaultConfig) => {
        if (config !== undefined) {
            return { ...defaultConfig, ...config };
        }
        return defaultConfig;
    };
    generate = () => {
        return undefined;
    };
    config = (config) => {
        this._config = this.mergeConfig(config, this._defaultConfig);
        return this;
    };
}
exports.randomCore = randomCore;


/***/ }),

/***/ "./src/maths/random/rndFraction.ts":
/*!*****************************************!*\
  !*** ./src/maths/random/rndFraction.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rndFraction = void 0;
const randomCore_1 = __webpack_require__(/*! ./randomCore */ "./src/maths/random/randomCore.ts");
const coefficients_1 = __webpack_require__(/*! ../coefficients */ "./src/maths/coefficients/index.ts");
const index_1 = __webpack_require__(/*! ./index */ "./src/maths/random/index.ts");
class rndFraction extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this._defaultConfig = {
            negative: true,
            max: 10,
            reduced: true,
            zero: true,
            natural: false
        };
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
    generate = () => {
        let Q = new coefficients_1.Fraction();
        if (this._config.negative) {
            Q.numerator = index_1.Random.numberSym(this._config.max, this._config.zero);
        }
        else {
            Q.numerator = index_1.Random.number(this._config.zero ? 0 : 1, this._config.max);
        }
        if (this._config.natural) {
            Q.denominator = 1;
        }
        else {
            Q.denominator = index_1.Random.number(1, this._config.max);
        }
        return this._config.reduced ? Q.reduce() : Q;
    };
}
exports.rndFraction = rndFraction;


/***/ }),

/***/ "./src/maths/random/rndHelpers.ts":
/*!****************************************!*\
  !*** ./src/maths/random/rndHelpers.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rndHelpers = void 0;
class rndHelpers {
    static randomBool(percent = 0.5) {
        return Math.random() < percent;
    }
    static randomInt(a, b) {
        if (b === undefined) {
            return this.randomInt(0, a);
        }
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
    static randomIntSym(max, zero) {
        if (zero === false) {
            return this.randomBool() ? this.randomInt(1, max) : -this.randomInt(1, max);
        }
        else {
            return this.randomInt(-max, max);
        }
    }
    static randomArray(arr, number) {
        if (number === undefined) {
            number = 1;
        }
        if (arr.length <= 0) {
            return Object.values(arr);
        }
        return rndHelpers.shuffleArray(arr).slice(0, number);
    }
    static randomItem(arr) {
        if (arr.length === 0) {
            return '';
        }
        return this.randomArray(arr, 1)[0];
    }
    static shuffleArray(arr) {
        let shuffleArray = Object.values(arr);
        for (let i = shuffleArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffleArray[i];
            shuffleArray[i] = shuffleArray[j];
            shuffleArray[j] = temp;
        }
        return shuffleArray;
    }
}
exports.rndHelpers = rndHelpers;


/***/ }),

/***/ "./src/maths/random/rndMonom.ts":
/*!**************************************!*\
  !*** ./src/maths/random/rndMonom.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rndMonom = void 0;
const randomCore_1 = __webpack_require__(/*! ./randomCore */ "./src/maths/random/randomCore.ts");
const index_1 = __webpack_require__(/*! ./index */ "./src/maths/random/index.ts");
const algebra_1 = __webpack_require__(/*! ../algebra */ "./src/maths/algebra/index.ts");
class rndMonom extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this._defaultConfig = {
            letters: 'x',
            degree: 2,
            fraction: true,
            zero: false
        };
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
    generate = () => {
        let M = new algebra_1.Monom();
        if (typeof this._config.fraction === "boolean") {
            M.coefficient = index_1.Random.fraction({
                zero: this._config.zero,
                reduced: true,
                natural: !this._config.fraction
            });
        }
        else {
            M.coefficient = index_1.Random.fraction(this._config.fraction);
        }
        if (this._config.letters.length > 1) {
            for (let L of this._config.letters.split('')) {
                M.setLetter(L, 0);
            }
            for (let i = 0; i < this._config.degree; i++) {
                const L = index_1.Random.item(this._config.letters.split(""));
                M.setLetter(L, M.degree(L).clone().add(1));
            }
        }
        else {
            M.setLetter(this._config.letters, this._config.degree);
        }
        return M;
    };
}
exports.rndMonom = rndMonom;


/***/ }),

/***/ "./src/maths/random/rndPolynom.ts":
/*!****************************************!*\
  !*** ./src/maths/random/rndPolynom.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rndPolynom = void 0;
const randomCore_1 = __webpack_require__(/*! ./randomCore */ "./src/maths/random/randomCore.ts");
const rndMonom_1 = __webpack_require__(/*! ./rndMonom */ "./src/maths/random/rndMonom.ts");
const index_1 = __webpack_require__(/*! ./index */ "./src/maths/random/index.ts");
const algebra_1 = __webpack_require__(/*! ../algebra */ "./src/maths/algebra/index.ts");
class rndPolynom extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this._defaultConfig = {
            letters: 'x',
            degree: 2,
            fraction: false,
            zero: false,
            unit: false,
            factorable: false,
            allowNullMonom: true,
            numberOfMonoms: 0,
            positive: true
        };
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
    generate = () => {
        if (this._config.factorable && this._config.degree > 1) {
            return this.factorable();
        }
        let P = new algebra_1.Polynom().empty(), M;
        for (let i = this._config.degree; i >= 0; i--) {
            M = new rndMonom_1.rndMonom({
                letters: this._config.letters,
                degree: i,
                fraction: this._config.fraction,
                zero: (i === this._config.degree) ? false : this._config.allowNullMonom
            }).generate();
            if (this._config.unit && this._config.degree === i) {
                M.coefficient.one();
            }
            P.add(M);
        }
        if (this._config.positive && P.monomByDegree().coefficient.isNegative()) {
            P.monomByDegree().coefficient.opposed();
        }
        if (this._config.numberOfMonoms > 0 && this._config.numberOfMonoms < P.length) {
            let M = P.monomByDegree().clone();
            P.monoms = index_1.Random.array(P.monoms.slice(1), this._config.numberOfMonoms - 1);
            P.add(M).reorder().reduce();
        }
        return P;
    };
    factorable = () => {
        let P = new algebra_1.Polynom().one();
        let _factorableConfig = { ...this._config };
        _factorableConfig.degree = 1;
        _factorableConfig.factorable = false;
        for (let i = 0; i < this._config.degree; i++) {
            P.multiply(index_1.Random.polynom(_factorableConfig));
        }
        return P;
    };
}
exports.rndPolynom = rndPolynom;


/***/ }),

/***/ "./src/maths/random/rndTypes.ts":
/*!**************************************!*\
  !*** ./src/maths/random/rndTypes.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/maths/shutingyard.ts":
/*!**********************************!*\
  !*** ./src/maths/shutingyard.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Shutingyard = exports.ShutingyardMode = exports.ShutingyardType = exports.tokenConstant = void 0;
exports.tokenConstant = {
    pi: Math.PI,
    e: Math.exp(1)
};
var ShutingyardType;
(function (ShutingyardType) {
    ShutingyardType["VARIABLE"] = "variable";
    ShutingyardType["COEFFICIENT"] = "coefficient";
    ShutingyardType["OPERATION"] = "operation";
    ShutingyardType["CONSTANT"] = "constant";
    ShutingyardType["FUNCTION"] = "function";
    ShutingyardType["MONOM"] = "monom";
})(ShutingyardType = exports.ShutingyardType || (exports.ShutingyardType = {}));
var ShutingyardMode;
(function (ShutingyardMode) {
    ShutingyardMode["POLYNOM"] = "polynom";
    ShutingyardMode["SET"] = "set";
    ShutingyardMode["NUMERIC"] = "numeric";
})(ShutingyardMode = exports.ShutingyardMode || (exports.ShutingyardMode = {}));
class Shutingyard {
    _rpn = [];
    _mode;
    _tokenConfig;
    _tokenConstant;
    _uniformize;
    _tokenKeys;
    constructor(mode) {
        this._mode = typeof mode === 'undefined' ? ShutingyardMode.POLYNOM : mode;
        this.tokenConfigInitialization();
    }
    tokenConfigInitialization() {
        if (this._mode === ShutingyardMode.SET) {
            this._tokenConfig = {
                '&': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '|': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '!': { precedence: 4, associative: 'right', type: ShutingyardType.OPERATION },
                '-': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION }
            };
            this._uniformize = false;
        }
        else if (this._mode === ShutingyardMode.NUMERIC) {
            this._tokenConfig = {
                '^': { precedence: 4, associative: 'right', type: ShutingyardType.OPERATION },
                '*': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '/': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '+': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '-': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '%': { precedence: 3, associative: 'right', type: ShutingyardType.OPERATION },
                'sin': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'cos': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'tan': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
            };
        }
        else {
            this._tokenConfig = {
                '^': { precedence: 4, associative: 'right', type: ShutingyardType.OPERATION },
                '*': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '/': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '+': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '-': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '%': { precedence: 3, associative: 'right', type: ShutingyardType.OPERATION },
                'sin': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'cos': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'tan': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
            };
            this._uniformize = true;
        }
        this._tokenKeys = Object.keys(this._tokenConfig).sort((a, b) => b.length - a.length);
        return this._tokenConfig;
    }
    NextToken2(expr, start) {
        let token, tokenType;
        token = '';
        tokenType = '';
        if (expr[start] === '(') {
            token = '(';
            tokenType = '(';
        }
        else if (expr[start] === ')') {
            token = ')';
            tokenType = ')';
        }
        else if (expr[start] === ',') {
            token = ',';
            tokenType = 'function-argument';
        }
        else {
            for (let key of this._tokenKeys) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key;
                    tokenType = this._tokenConfig[key].type;
                    break;
                }
            }
            for (let key in exports.tokenConstant) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key;
                    tokenType = ShutingyardType.CONSTANT;
                    break;
                }
            }
            if (token === '') {
                if (expr[start].match(/[0-9]/)) {
                    if (this._mode === ShutingyardMode.POLYNOM) {
                        token = expr.substring(start).match(/^([0-9.,/]+)/)[0];
                    }
                    else {
                        token = expr.substring(start).match(/^([0-9.,]+)/)[0];
                    }
                    tokenType = ShutingyardType.COEFFICIENT;
                }
                else if (expr[start].match(/[a-zA-Z]/)) {
                    token = expr.substring(start).match(/^([a-zA-Z])/)[0];
                    tokenType = ShutingyardType.VARIABLE;
                }
                else {
                    console.log('Unidentified token', expr[start], expr, start);
                    token = expr[start];
                    tokenType = ShutingyardType.MONOM;
                }
            }
        }
        return [token, start + token.length, tokenType];
    }
    Uniformizer(expr) {
        if (!this._uniformize) {
            return expr;
        }
        let expr2;
        expr2 = expr.replace(/\)\(/g, ')*(');
        expr2 = expr2.replace(/([\da-zA-Z])(\()/g, "$1*$2");
        expr2 = expr2.replace(/(\))([\da-zA-Z])/g, "$1*$2");
        expr2 = expr2.replace(/([0-9])([a-zA-Z])/g, "$1*$2");
        expr2 = expr2.replace(/([a-zA-Z])([0-9])/g, "$1*$2");
        expr2 = expr2.replace(/([abcxyz])([abcxyz])/g, "$1*$2");
        let fnToken = ['sin', 'cos', 'tan'];
        for (let token of fnToken) {
            expr2 = expr2.replace(new RegExp(token + '\\*', 'g'), token);
        }
        return expr2;
    }
    parse(expr, operators) {
        let outQueue = [], opStack = [], token = '', tokenPos = 0, tokenType = '', previousOpStatckLength = 0;
        expr = this.Uniformizer(expr);
        let securityLoopLvl1 = 50, securityLoopLvl2_default = 50, securityLoopLvl2;
        while (tokenPos < expr.length) {
            securityLoopLvl1--;
            if (securityLoopLvl1 === 0) {
                console.log('SECURITY LEVEL 1 EXIT');
                break;
            }
            [token, tokenPos, tokenType] = this.NextToken2(expr, tokenPos);
            switch (tokenType) {
                case 'monom':
                case 'coefficient':
                case 'variable':
                case 'constant':
                    outQueue.push({
                        token,
                        tokenType
                    });
                    break;
                case 'operation':
                    previousOpStatckLength = opStack.length;
                    if (opStack.length > 0) {
                        let opTop = opStack[opStack.length - 1];
                        securityLoopLvl2 = +securityLoopLvl2_default;
                        while (opTop.token in this._tokenConfig && ((this._tokenConfig[token].associative === 'left' && this._tokenConfig[token].precedence <= this._tokenConfig[opTop.token].precedence)
                            ||
                                (this._tokenConfig[token].associative === 'right' && this._tokenConfig[token].precedence < this._tokenConfig[opTop.token].precedence))) {
                            securityLoopLvl2--;
                            if (securityLoopLvl2 === 0) {
                                console.log('SECURITY LEVEL 2 OPERATION EXIT');
                                break;
                            }
                            outQueue.push((opStack.pop()) || { token: '', tokenType: 'operation' });
                            if (opStack.length === 0) {
                                break;
                            }
                            opTop = opStack[opStack.length - 1];
                        }
                    }
                    opStack.push({ token, tokenType });
                    break;
                case 'function-argument':
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    while (opStack[opStack.length - 1].token !== '(' && opStack.length > 0) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT');
                            break;
                        }
                        outQueue.push((opStack.pop()) || { token, tokenType });
                    }
                    break;
                case '(':
                    opStack.push({ token, tokenType });
                    if (expr[tokenPos] === '-') {
                        outQueue.push({ token: '0', tokenType: 'coefficient' });
                    }
                    break;
                case ')':
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    while (opStack[opStack.length - 1].token !== '(' && opStack.length > 1) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 CLOSING PARENTHESE EXIT');
                            break;
                        }
                        outQueue.push((opStack.pop()) || { token, tokenType });
                    }
                    opStack.pop();
                    break;
                case 'function':
                    opStack.push({ token, tokenType });
                    break;
                default:
                    console.log(`SHUTING YARD: ${tokenType} : ${token} `);
            }
        }
        this._rpn = outQueue.concat(opStack.reverse());
        return this;
    }
    get rpn() {
        return this._rpn;
    }
}
exports.Shutingyard = Shutingyard;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const numeric_1 = __webpack_require__(/*! ./maths/numeric */ "./src/maths/numeric.ts");
const numexp_1 = __webpack_require__(/*! ./maths/numexp */ "./src/maths/numexp.ts");
const shutingyard_1 = __webpack_require__(/*! ./maths/shutingyard */ "./src/maths/shutingyard.ts");
const random_1 = __webpack_require__(/*! ./maths/random */ "./src/maths/random/index.ts");
const coefficients_1 = __webpack_require__(/*! ./maths/coefficients */ "./src/maths/coefficients/index.ts");
const algebra_1 = __webpack_require__(/*! ./maths/algebra */ "./src/maths/algebra/index.ts");
const geometry_1 = __webpack_require__(/*! ./maths/geometry */ "./src/maths/geometry/index.ts");
window.Pi = {
    ShutingYard: shutingyard_1.Shutingyard,
    Numeric: numeric_1.Numeric,
    NumExp: numexp_1.NumExp,
    Fraction: coefficients_1.Fraction,
    Root: coefficients_1.Nthroot,
    Monom: algebra_1.Monom,
    Polynom: algebra_1.Polynom,
    Equation: algebra_1.Equation,
    LinearSystem: algebra_1.LinearSystem,
    Rational: algebra_1.Rational,
    Logicalset: algebra_1.Logicalset,
    Random: random_1.Random,
    Geometry: {
        Vector: geometry_1.Vector,
        Point: geometry_1.Point,
        Line: geometry_1.Line,
        Triangle: geometry_1.Triangle,
        Circle: geometry_1.Circle
    }
};

})();

/******/ })()
;
//# sourceMappingURL=pi.js.map