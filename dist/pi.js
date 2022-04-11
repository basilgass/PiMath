/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 607:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.l = void 0;
const numeric_1 = __webpack_require__(956);
const numexp_1 = __webpack_require__(735);
const shutingyard_1 = __webpack_require__(505);
const random_1 = __webpack_require__(330);
const fraction_1 = __webpack_require__(506);
const nthRoot_1 = __webpack_require__(872);
const monom_1 = __webpack_require__(937);
const polynom_1 = __webpack_require__(38);
const equation_1 = __webpack_require__(760);
const linearSystem_1 = __webpack_require__(554);
const rational_1 = __webpack_require__(107);
const logicalset_1 = __webpack_require__(236);
const polynomexp_1 = __webpack_require__(75);
const vector_1 = __webpack_require__(586);
const line_1 = __webpack_require__(9);
const triangle_1 = __webpack_require__(164);
const circle_1 = __webpack_require__(699);
const point_1 = __webpack_require__(557);
// Expose as global
exports.l = {
    ShutingYard: shutingyard_1.Shutingyard,
    Numeric: numeric_1.Numeric,
    NumExp: numexp_1.NumExp,
    Fraction: fraction_1.Fraction,
    Root: nthRoot_1.NthRoot,
    Monom: monom_1.Monom,
    Polynom: polynom_1.Polynom,
    Equation: equation_1.Equation,
    LinearSystem: linearSystem_1.LinearSystem,
    Rational: rational_1.Rational,
    Logicalset: logicalset_1.Logicalset,
    Random: random_1.Random,
    PolynomExpFactor: polynomexp_1.PolynomExpFactor,
    PolynomExpProduct: polynomexp_1.PolynomExpProduct,
    Geometry: {
        Vector: vector_1.Vector,
        Point: point_1.Point,
        Line: line_1.Line,
        Triangle: triangle_1.Triangle,
        Circle: circle_1.Circle
    }
};
window.Pi = exports.l;


/***/ }),

/***/ 760:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Equation = exports.PARTICULAR_SOLUTION = void 0;
const polynom_1 = __webpack_require__(38);
const numeric_1 = __webpack_require__(956);
const fraction_1 = __webpack_require__(506);
const nthRoot_1 = __webpack_require__(872);
var PARTICULAR_SOLUTION;
(function (PARTICULAR_SOLUTION) {
    PARTICULAR_SOLUTION["real"] = "\\mathbb{R}";
    PARTICULAR_SOLUTION["varnothing"] = "\\varnothing";
})(PARTICULAR_SOLUTION = exports.PARTICULAR_SOLUTION || (exports.PARTICULAR_SOLUTION = {}));
class Equation {
    /**
     * Create an Equation using two polynoms.
     * Markdown *support* is cool
     * @param equations
     */
    constructor(...equations) {
        // Undetermined texSolutions.
        this._varnothing = PARTICULAR_SOLUTION.varnothing;
        this._real = PARTICULAR_SOLUTION.real;
        this.hasVariable = (letter) => {
            return this.variables.includes(letter);
        };
        // ------------------------------------------
        // Creation / parsing functions
        // -----------------------------------------------
        this._randomizeDefaults = {
            degree: 2
        };
        // ------------------------------------------
        this.parse = (equationString) => {
            let pStr, strSign;
            // Find the string separator
            strSign = this._findSign(equationString);
            if (strSign === false) {
                console.error('The equation is not valid (no sign found)');
                return;
            }
            // The StrSign is found
            pStr = equationString.split(strSign);
            return this.create(new polynom_1.Polynom(pStr[0]), new polynom_1.Polynom(pStr[1]), this._formatSign(strSign));
        };
        this.create = (left, right, sign) => {
            this._left = left;
            this._right = right;
            this._sign = this._formatSign(sign);
            return this;
        };
        this.clone = () => {
            return new Equation().create(this._left.clone(), this._right.clone(), this._sign + '');
        };
        // -----------------------------------------------
        // Equations generators and randomizers
        this.randomize = (opts, sign) => {
            // TODO: Generate equations randomly, using config.
            return new Equation().create(new polynom_1.Polynom(), new polynom_1.Polynom(), sign);
        };
        // -----------------------------------------------
        /**
         * Reorder will move all monoms containing a letter on the left, all the other on the right.
         */
        this.moveLeft = () => {
            this._left = this._left.clone().subtract(this._right);
            this._right.zero();
            return this;
        };
        this.reorder = (allLeft) => {
            // Move all monoms of degree greater than 0 to the left.
            // and all zero degree monoms to the right.
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
            // Reorder the left and right polynoms
            this._left.reorder();
            this._right.reorder();
            return this;
        };
        /**
         * Multiply by the lcm denominator and divide by the gcm numerators.
         */
        this.simplify = () => {
            this.multiply(numeric_1.Numeric.lcm(...this._left.getDenominators(), ...this._right.getDenominators()));
            this.divide(numeric_1.Numeric.gcd(...this._left.getNumerators(), ...this._right.getNumerators()));
            return this;
        };
        // -----------------------------------------------
        // Equations operations
        /**
         * Reorder the polynom to have only one letter on the left, the rest on the right.
         * @param letter
         */
        this.isolate = (letter) => {
            // Determine if we can isolate the variables.
            // Both part of the equations must be of the first degree.
            //TODO: handle equations of degree two or more ?
            if (!this.degree(letter).isOne()) {
                return false;
            }
            // Modify the equation to isolate the asked variable.
            // TODO: must handle equations like 3xy+5y=4 => y = 4/(3x-5)
            if (this.isMultiVariable()) {
                return false;
            }
            // Isolate the letter.
            let mMove, cMove;
            // Start by moving everything to the left.
            this._left.subtract(this._right);
            this._right.zero();
            for (let m of this._left.monoms) {
                if (!m.hasLetter(letter)) {
                    mMove = m.clone();
                    this._left.add(mMove.clone().opposed());
                    this._right.add(mMove.clone().opposed());
                }
            }
            // In theory, we should have only one item on the left.
            if (this._left.length !== 1) {
                return false;
            }
            cMove = this._left.monoms[0].coefficient.clone();
            this._left.divide(cMove);
            this._right.divide(cMove);
            return this;
        };
        this.replaceBy = (letter, P) => {
            this._left.replaceBy(letter, P);
            this._right.replaceBy(letter, P);
            return this;
        };
        /**
         * Multiple an equation by a fraction value.
         * @param value
         */
        this.multiply = (value) => {
            // Make sure we have a fraction.
            let F = new fraction_1.Fraction(value);
            // Multiply each part of the equation by the fraction
            this._left.multiply(F);
            this._right.multiply(F);
            // The sign of the inequation must be changed.
            if (this._sign !== '=' && F.sign() === -1) {
                this._reverseSign();
            }
            return this;
        };
        /**
         * divide an equation by a given value (transformed as a fraction)
         *
         * ```
         * 8x+10=6x \vert 2
         * 4x+5=3x
         * ```
         *
         * |>Alternatively with $3x-4$ maybe it's working ?
         * $$\frac{3x}{5}$$
         *
         * @param value
         * @returns {Equation}
         */
        this.divide = (value) => {
            // Make sure we have a fraction.
            let F = new fraction_1.Fraction(value);
            if (F.isZero()) {
                return this;
            }
            else {
                return this.multiply(F.invert());
            }
        };
        /**
         * Get the degree of the equation
         * @param letter
         */
        this.degree = (letter) => {
            return fraction_1.Fraction.max(this._left.degree(letter), this._right.degree(letter));
        };
        /**
         * Determine if the equation contains more than one letter/variable.
         */
        this.isMultiVariable = () => {
            return this._left.isMultiVariable || this._right.isMultiVariable;
        };
        this.letters = () => {
            // @ts-ignore
            return [...new Set([...this._left.letters(), ...this._right.letters()])];
        };
        // -----------------------------------------------
        // Equations helpers
        // -----------------------------------------------
        // -----------------------------------------------
        this.solve = () => {
            // Initialise the variables:
            this._solutions = [];
            // TODO: consolidate solving equations (inequations vs equations)
            // TODO: work with not natural degrees ?
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
            // cleanup the solutions.
            this._solutions = Equation.makeSolutionsUnique(this._solutions);
            return this;
        };
        this.test = (values) => {
            return this.left.evaluate(values).isEqual(this.right.evaluate(values));
        };
        this._findSign = (equationString) => {
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
        // -----------------------------------------------
        // Equations solving algorithms
        this._formatSign = (signStr) => {
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
        this._reverseSign = () => {
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
        this.isGreater = () => {
            if (this._sign.indexOf('>') !== -1) {
                return true;
            }
            return this._sign.indexOf('geq') !== -1;
        };
        this.isStrictEqual = () => {
            return this._sign === '=';
        };
        this.isAlsoEqual = () => {
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
        this._solveDegree1 = (letter) => {
            const m1 = this._polynom.monomByDegree(1, letter).coefficient, m0 = this._polynom.monomByDegree(0, letter).coefficient, v = m0.clone().opposed().divide(m1);
            let s;
            if (this.isStrictEqual()) {
                if (m1.value === 0) {
                    // In this case, the coefficient of the x variable is zero.
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
                            tex: v.tex,
                            value: v.value,
                            exact: v
                        }];
                }
            }
            else {
                if (m1.value === 0) {
                    // In this case, the coefficient of the x variable is zero.
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
                    // Must handle the case if the m1 monom is negative.
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
        this._solveDegree2 = (letter) => {
            let aF = this._polynom.monomByDegree(2, letter).coefficient, bF = this._polynom.monomByDegree(1, letter).coefficient, cF = this._polynom.monomByDegree(0, letter).coefficient, delta, nthDelta, lcm = numeric_1.Numeric.lcm(aF.denominator, bF.denominator, cF.denominator), a = aF.multiply(lcm).value, b = bF.multiply(lcm).value, c = cF.multiply(lcm).value, realX1, realX2, sX1, sX2;
            delta = b * b - 4 * a * c;
            if (delta > 0) {
                realX1 = (-b - Math.sqrt(delta)) / (2 * a);
                realX2 = (-b + Math.sqrt(delta)) / (2 * a);
                if (delta > 1.0e5) {
                    // The delta is too big to be parsed !
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
                    nthDelta = new nthRoot_1.NthRoot(delta).reduce();
                    if (nthDelta.hasRadical()) {
                        // -b +- coeff\sqrt{radical}
                        // -------------------------
                        //           2a
                        let gcd = numeric_1.Numeric.gcd(b, 2 * a, nthDelta.coefficient);
                        nthDelta.coefficient = nthDelta.coefficient / gcd;
                        // TODO: Can i delete the next line ?
                        // let deltaC = nthDelta.coefficient, deltaR = nthDelta.radical;
                        if (b !== 0) {
                            if (2 * a / gcd === 1) {
                                this._solutions = [
                                    {
                                        tex: `${-b / gcd} - ${nthDelta.tex}`,
                                        value: realX1,
                                        exact: false // TODO: implement exact value with nthroot
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
                                        tex: `\\frac{${-b / gcd} - ${nthDelta.tex} }{ ${2 * a / gcd} }`,
                                        value: realX1,
                                        exact: false
                                    },
                                    {
                                        tex: `\\frac{${-b / gcd} + ${nthDelta.tex} }{ ${2 * a / gcd} }`,
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
                                        tex: `\\frac{- ${nthDelta.tex} }{ ${2 * a / gcd} }`,
                                        value: realX1,
                                        exact: false
                                    },
                                    {
                                        tex: `\\frac{${nthDelta.tex} }{ ${2 * a / gcd} }`,
                                        value: realX2,
                                        exact: false
                                    },
                                ];
                            }
                        }
                    }
                    else {
                        // -b +- d / 2a
                        const S1 = new fraction_1.Fraction(-b - nthDelta.coefficient, 2 * a).reduce(), S2 = new fraction_1.Fraction(-b + nthDelta.coefficient, 2 * a).reduce();
                        this._solutions = [
                            {
                                tex: S1.frac,
                                value: realX1,
                                exact: S1
                            },
                            {
                                tex: S2.frac,
                                value: realX2,
                                exact: S2
                            }
                        ];
                    }
                }
            }
            else if (delta === 0) {
                const sol = new fraction_1.Fraction(-b, 2 * a).reduce();
                this._solutions = [{
                        tex: sol.frac,
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
            // Handle now the inequations.
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
                            // this._texSolutions = [ this._texSolutions[0] ];
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
        this._solveDegree3plus = (letter) => {
            // Push everything to the left
            // factorize
            // solve each factors.
            let equ = this.clone().moveLeft();
            equ.left.factorize();
            this._solutions = [];
            equ.left.factors.forEach(factor => {
                if (factor.degree(letter).leq(2)) {
                    let factorAsEquation = new Equation(factor, 0);
                    factorAsEquation.solve();
                    factorAsEquation.solutions.forEach(solution => {
                        this._solutions.push(solution);
                    });
                }
                else {
                    console.log(factor.tex, ': cannot actually get the solution of this equation');
                }
            });
            // TODO: check equation resolution for more than degree 2
            // this._solutions = [{tex: 'solve x - not yet handled', value: NaN, exact: false}];  // ESLint remove system :(
            return this._solutions;
        };
        // Default equation
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
            // Return default empty equation
            return this;
        }
        return this;
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
    // ------------------------------------------
    // Getter and setter
    set right(value) {
        this._right = value;
    }
    get sign() {
        return this._sign;
    }
    set sign(value) {
        // Set the sign value as formatted.
        this._sign = this._formatSign(value);
    }
    // ------------------------------------------
    get solutions() {
        return this._solutions;
    }
    get isEquation() {
        return true;
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
    get randomizeDefaults() {
        return this._randomizeDefaults;
    }
    set randomizeDefaults(value) {
        this._randomizeDefaults = value;
    }
    static makeSolutionsUnique(solutions, sorted) {
        let solutionAsTex = [], uniqueSolutions = solutions.filter(sol => {
            if (!solutionAsTex.includes(sol.tex)) {
                solutionAsTex.push(sol.tex);
                return true;
            }
            else {
                return false;
            }
        });
        if (sorted === true) {
            uniqueSolutions.sort((a, b) => a.value - b.value);
        }
        return uniqueSolutions;
    }
}
exports.Equation = Equation;


/***/ }),

/***/ 554:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinearSystem = void 0;
const equation_1 = __webpack_require__(760);
const polynom_1 = __webpack_require__(38);
const random_1 = __webpack_require__(330);
const fraction_1 = __webpack_require__(506);
// TODO: Must check and rework
class LinearSystem {
    constructor(...equationStrings) {
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        this.parse = (...equations) => {
            this._equations = equations.map(value => new equation_1.Equation(value));
            this._findLetters();
            return this;
        };
        this.setCoefficient = (...coefficients) => {
            // Reset the equations list
            this._equations = [];
            let i = 0;
            while (i < coefficients.length - this._letters.length) {
                let left = new polynom_1.Polynom().parse(this._letters.join(''), ...coefficients.slice(i, i + this._letters.length)), right = new polynom_1.Polynom(coefficients[i + this._letters.length].toString()), equ = new equation_1.Equation().create(left, right);
                this._equations.push(equ.clone());
                i = i + this._letters.length + 1;
            }
            return this;
        };
        this.clone = () => {
            return new LinearSystem().parse(...this._equations.map(equ => equ.clone()));
        };
        this.setLetters = (...letters) => {
            this._letters = letters;
            return this;
        };
        this._findLetters = () => {
            // Find all letters used.
            let variables = new Set();
            for (let equ of this._equations) {
                variables = new Set([...variables, ...equ.variables]);
            }
            // TODO: How to transform (Set of string) to string[]
            // @ts-ignore
            this._letters = [...variables];
            return this;
        };
        // -----------------------------------------------
        // Equations generators and randomizers
        // -----------------------------------------------
        this.generate = (...solutions) => {
            let solutionsF = [];
            // Convert the numbers to fractions if necessary
            for (let s of solutions) {
                if (typeof s === "number") {
                    solutionsF.push(new fraction_1.Fraction(s.toString()));
                }
                else {
                    solutionsF.push(s.clone());
                }
            }
            // Create the equations and make sure they are not linear combined.
            this._equations = [];
            for (let i = 0; i < solutions.length; i++) {
                this._equations.push(this._generateOneEquation(...solutionsF));
            }
            return this;
        };
        this._generateOneEquation = (...solutions) => {
            let coeff = [], leftValue = new fraction_1.Fraction().zero(), letters = ['x', 'y', 'z', 't', 'u', 'v', 'w', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'], equString = '', equ;
            for (let i = 0; i < solutions.length; i++) {
                coeff.push(random_1.Random.numberSym(5));
                leftValue.add(solutions[i].clone().multiply(coeff[i]));
                equString += `${(coeff[i] < 0) ? coeff[i] : '+' + coeff[i]}${letters[i]}`;
            }
            // LeftValue contains the left part oof the equation - and is then the isSame as the right part.
            // It might be a Fraction.
            // Must check if it's not a linear combination
            equ = new equation_1.Equation(`${equString}=${leftValue.display}`);
            if (equ.right.monoms[0].coefficient.denominator != 1) {
                equ.multiply(new fraction_1.Fraction(equ.right.monoms[0].coefficient.denominator, 1));
            }
            if (this._checkIfLinerCombination(equ)) {
                return equ;
            }
            else {
                return this._generateOneEquation(...solutions);
            }
        };
        this.mergeEquations = (eq1, eq2, factor1, factor2) => {
            // Set and clone the equations.
            let eq1multiplied = eq1.clone().multiply(new fraction_1.Fraction(factor1)), eq2multiplied = eq2.clone().multiply(new fraction_1.Fraction(factor2));
            // Add both equations together.
            eq1multiplied.left.add(eq2multiplied.left);
            eq1multiplied.right.add(eq2multiplied.right);
            return eq1multiplied;
        };
        // ------------------------------------------
        // Solvers algorithm
        // ------------------------------------------
        this.reorder = () => {
            for (let E of this._equations) {
                E.reorder();
            }
            return this;
        };
        this.solve = () => {
            // Solve it by linear
            this._solutions = {};
            this._resolutionSteps = [];
            // Reorder all equations.
            this.reorder();
            // Get all variables in the linear system
            let V = this.variables.sort();
            for (let letter of V) {
                this._solutions[letter] = this._solveOneLetter(letter, V);
            }
            // TODO: LinearSystem - solve: optimization and handle undetermined and undefined systems.
            return this;
        };
        this._checkIfLinerCombination = (equ) => {
            return true;
        };
        // ------------------------------------------
        // Helpers
        // ------------------------------------------
        this.log = () => {
            let str = '';
            for (let E of this._equations) {
                console.log(E.tex);
                str += `${E.tex}\\n}`;
            }
            return str;
        };
        this._equations = [];
        this._letters = 'xy'.split('');
        if (equationStrings !== undefined && equationStrings.length > 0) {
            this.parse(...equationStrings);
        }
        return this;
    }
    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
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
        // TODO: in some case, it is possible to resolve systems if there isn't the isSame number of vars and equations
        if (V.length !== this._equations.length) {
            return false;
        }
        //TODO: Must check if two equations isn't a linear combination of the others ?
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
        // Build the array of values.
        // Reorder
        // This clone the system :!!!
        //TODO: Avoid cloning this linear system
        let LS = this.clone().reorder(), letters = LS.variables, equStr, equArray = [], m;
        // TODO: Manage tex output of linear equations
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
            // Add the equal sign
            equStr.push('=');
            // Add the right hand part of the equation (should be only a number, because it has been reordered)
            equStr.push(equ.right.tex);
            // Add to the list.
            equArray.push(equStr.join('&'));
        }
        return `\\left\\{\\begin{array}{${"r".repeat(letters.length)}cl}${equArray.join('\\\\\ ')}\\end{array}\\right.`;
        //return `\\left\\{\\begin{array}{rrrcl}${this._equations.map(equ => `${equ.tex}`).join('\\\\\ \n')}\\end{array}\\right.`;
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
            tex.push(this._solutions[letter].value.frac);
        }
        return `(${tex.join(';')})`;
    }
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    _linearReduction(eq1, eq2, letter) {
        // TODO: handle other signs for equations ?
        // Get the monom for the particular letter.
        let c1 = eq1.left.monomByDegree(1, letter).coefficient.clone(), c2 = eq2.left.monomByDegree(1, letter).coefficient.clone().opposed();
        return this.mergeEquations(eq1, eq2, c2, c1);
    }
    _solveOneLetter(letter, V) {
        // list of equations.
        let LE = this.clone().equations, reducedEquations = [];
        // Reduce the equations.
        // Do it as long as there is more than one step, but no more than the number of equations.
        for (let L of V) {
            // remove the setLetter from all equations using linear combinations
            if (L === letter) {
                continue;
            }
            // Linear reduction.
            // TODO: Search for better association
            for (let i = 0; i < LE.length - 1; i++) {
                reducedEquations.push(this._linearReduction(LE[i], LE[i + 1], L));
            }
            // Keep track of each steps.
            this._resolutionSteps.push(new LinearSystem().parse(...reducedEquations));
            // Set the list of equations to the new version.
            LE = this._resolutionSteps[this._resolutionSteps.length - 1].clone().equations;
            // Reset the stack
            reducedEquations = [];
        }
        // Solve the equations
        let E = this._resolutionSteps[this._resolutionSteps.length - 1].equations[0];
        E.solve();
        return {
            value: new fraction_1.Fraction(E.solutions[0].value),
            isReal: E.isReal,
            isVarnothing: E.isVarnothing
        };
    }
}
exports.LinearSystem = LinearSystem;


/***/ }),

/***/ 236:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * Polynom module contains everything necessary to handle polynoms.
 * @module Logicalset
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logicalset = void 0;
const shutingyard_1 = __webpack_require__(505);
/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 */
class Logicalset {
    /**
     *
     * @param {string} value (optional) Default polynom to parse on class creation
     */
    constructor(value) {
        this.parse = (value) => {
            // TODO: Must format the value string to convert some items...
            // Parse the updated value to the shutingyard algorithm
            this._rpn = new shutingyard_1.Shutingyard(shutingyard_1.ShutingyardMode.SET).parse(value).rpn;
            return this;
        };
        this._rawString = value;
        this.parse(value);
        return this;
    }
    get isLogicalset() {
        return true;
    }
    ;
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
                // The variable has no token - assume it's empty.
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

/***/ 937:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Monom = void 0;
/***
 * Monom class
 */
const numeric_1 = __webpack_require__(956);
const shutingyard_1 = __webpack_require__(505);
const fraction_1 = __webpack_require__(506);
class Monom {
    /**
     * Create a Monom
     * Defined as \\(k \\cdot x^{n}\\), where \\( k,n \in \\mathbb{Q}\\).
     * Examples: \\(3x^2\\) or \\(3/5x^2\\)
     * @param value (optional) string The value that should be parse. Can be a Monom, a Fraction, a string or a number. If nothing is provided, it will return the trivial monom (0).
     */
    constructor(value) {
        // ------------------------------------------
        // Creation / parsing functions
        // -----------------------------------------
        /**
         * Parse a string to a monom. The string may include fraction.
         * @param inputStr
         */
        this.parse = (inputStr) => {
            if (typeof inputStr === 'string') {
                this._shutingYardToReducedMonom(inputStr);
            }
            else if (typeof inputStr === 'number') {
                this._coefficient = new fraction_1.Fraction(inputStr);
                this._literal = {};
            }
            else if (inputStr instanceof fraction_1.Fraction) {
                this._coefficient = inputStr.clone();
                this._literal = {};
            }
            else if (inputStr instanceof Monom) {
                this._coefficient = inputStr._coefficient.clone();
                this._literal = this.copyLiterals(inputStr.literal);
            }
            return this;
        };
        this.addToken = (stack, element) => {
            let q1, q2, m, letter, pow;
            if (element.tokenType === shutingyard_1.ShutingyardType.COEFFICIENT) {
                stack.push(new Monom(new fraction_1.Fraction(element.token)));
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.VARIABLE) {
                let M = new Monom().one();
                M.setLetter(element.token, 1);
                stack.push(M.clone());
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.OPERATION) {
                switch (element.token) {
                    case '-':
                        // this should only happen for negative powers or for negative coefficient.
                        q2 = (stack.pop()) || new Monom().zero();
                        q1 = (stack.pop()) || new Monom().zero();
                        stack.push(q1.subtract(q2));
                        break;
                    case '*':
                        // Get the last element in the stack
                        q2 = (stack.pop()) || new Monom().one();
                        q1 = (stack.pop()) || new Monom().one();
                        stack.push(q1.multiply(q2));
                        break;
                    case '/':
                        // Get the last element in the stack
                        q2 = (stack.pop()) || new Monom().one();
                        q1 = (stack.pop()) || new Monom().one();
                        stack.push(q1.divide(q2));
                        break;
                    case '^':
                        // get the two last elements in the stack
                        pow = (stack.pop().coefficient) || new fraction_1.Fraction().one();
                        m = (stack.pop()) || new Monom().one();
                        letter = m.variables[0];
                        if (letter !== undefined) {
                            m.setLetter(letter, pow);
                        }
                        stack.push(m);
                        // this.multiply(m.clone())
                        break;
                }
            }
        };
        this._shutingYardToReducedMonom = (inputStr) => {
            // Get the RPN array of the current expression
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
                    this.coefficient = new fraction_1.Fraction(element.token);
                }
                else if (element.tokenType === 'variable') {
                    this.setLetter(element.token, 1);
                }
                return this;
            }
            else {
                // Reset the monom
                for (const element of rpn) {
                    this.addToken(stack, element);
                }
            }
            this.one();
            this.multiply(stack[0]);
            return this;
        };
        /**
         * Clone the current Monom.
         */
        this.clone = () => {
            let F = new Monom();
            F.coefficient = this._coefficient.clone();
            // Copy the literal parts.
            for (let k in this._literal) {
                F.setLetter(k, this._literal[k].clone());
            }
            return F;
        };
        this.copyLiterals = (literal) => {
            let L = {};
            for (let k in literal) {
                L[k] = literal[k].clone();
            }
            return L;
        };
        this.makeSame = (M) => {
            // Copy the literal parts.
            for (let k in M._literal) {
                this.setLetter(k, M._literal[k].clone());
            }
            return this;
        };
        /**
         * Create a zero value monom
         */
        this.zero = () => {
            this._coefficient = new fraction_1.Fraction().zero();
            this._literal = {};
            return this;
        };
        /**
         * Create a one value monom
         */
        this.one = () => {
            this._coefficient = new fraction_1.Fraction().one();
            this._literal = {};
            return this;
        };
        /**
         * Clean the monom by removing each letters with a power of zero.
         */
        this.clean = () => {
            for (let letter in this._literal) {
                if (this._literal[letter].isZero()) {
                    delete this._literal[letter];
                }
            }
            return this;
        };
        this.reduce = () => {
            this.clean();
            this.coefficient.reduce();
            return this;
        };
        // ------------------------------------------
        // Mathematical operations
        // ------------------------------------------
        /**
         * Get the opposed
         * Returns a monom.
         */
        this.opposed = () => {
            this._coefficient.opposed();
            return this;
        };
        /**
         * Add all similar monoms. If they aren't similar, they are simply skipped.
         * @param M (Monom[]) The monoms to add.
         */
        this.add = (...M) => {
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
        /**
         * Subtract multiple monoms
         * @param M (Monom[]) The monoms to subtract
         */
        this.subtract = (...M) => {
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
        /**
         * Multiple multiple monoms to the current monom
         * @param M (Monom[]) The monoms to multiply to.
         */
        this.multiply = (...M) => {
            for (let m of M) {
                // Multiply the coefficient.
                this._coefficient.multiply(m.coefficient);
                // Multiply the literal parts.
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
        this.multiplyByNumber = (F) => {
            this._coefficient.multiply(F);
            return this;
        };
        /**
         * Divide the current monoms by multiple monoms
         * @param M (Monom[])
         */
        this.divide = (...M) => {
            // Depending on the given value, choose the current item
            for (let v of M) {
                // Divide the coefficient
                this._coefficient.divide(v.coefficient);
                // Subtract the power values
                for (let letter in v.literal) {
                    this._literal[letter] = (this._literal[letter] === undefined) ? v.literal[letter].clone().opposed() : this._literal[letter].subtract(v.literal[letter]);
                    // If the power of a particular setLetter is zero, delete it from the literal part..
                    if (this._literal[letter].isZero()) {
                        delete this._literal[letter];
                    }
                }
            }
            return this;
        };
        /**
         * Get the pow of a monom.
         * @param nb (number) : Mathematical pow
         */
        this.pow = (nb) => {
            this._coefficient.pow(nb);
            for (let letter in this._literal) {
                this._literal[letter].multiply(nb);
            }
            return this;
        };
        /**
         * Get the nth-root of the monom
         * @param p
         */
        this.root = (p) => {
            // TODO: determiner the nth root of a monom
            return this;
        };
        /**
         * Return the square root of a monom
         */
        this.sqrt = () => {
            if (this.isSquare()) {
                this._coefficient.sqrt();
                for (let letter in this._literal) {
                    this._literal[letter].clone().divide(2);
                }
            }
            return this.root(2);
        };
        // ------------------------------------------
        // Compare functions
        // ------------------------------------------
        this.compare = (M, sign) => {
            // TODO: Build the compare systems.
            if (sign === undefined) {
                sign = '=';
            }
            switch (sign) {
                case '=':
                    // To be equal, they must be the isSame
                    if (!this.compare(M, 'same')) {
                        return false;
                    }
                    // The literal parts are the isSame. The coefficient must be equal
                    return this._coefficient.isEqual(M.coefficient);
                case 'same':
                    // Get the list of all variables from both monoms.
                    let M1 = this.variables, M2 = M.variables, K = M1.concat(M2.filter((item) => M1.indexOf(item) < 0));
                    if (M1.length === 0 && M2.length === 0) {
                        return true;
                    }
                    // To compare, both must be different than zero.
                    if (!this.isZero() && !M.isZero()) {
                        for (let key of K) {
                            // The setLetter is not available in one of the monom
                            if (this._literal[key] === undefined || M.literal[key] === undefined) {
                                return false;
                            }
                            // The setLetter does not have the isSame power in each monoms.
                            if (!this._literal[key].isEqual(M.literal[key])) {
                                return false;
                            }
                        }
                    }
                    // All are positive check - the monoms are the sames.
                    return true;
                default:
                    return false;
            }
        };
        /**
         * Determine if two monoms are equals
         * @param M
         */
        this.isEqual = (M) => {
            return this.compare(M, '=');
        };
        /**
         * Determine if two monoms are similar
         * @param M
         */
        this.isSameAs = (M) => {
            return this.compare(M, 'same');
        };
        this.isSquare = () => {
            if (!this.coefficient.isSquare()) {
                return false;
            }
            return this.isLiteralSquare();
        };
        this.isLiteralSquare = () => {
            for (let letter in this.literal) {
                // A literal square must have a natural power
                if (this.literal[letter].isRational()) {
                    return false;
                }
                // The natural power must be be even
                if (this.literal[letter].isEven()) {
                    return false;
                }
            }
            return true;
        };
        this.hasFractionCoefficient = () => {
            for (let letter in this._literal) {
                if (this._literal[letter].isRational()) {
                    return true;
                }
            }
            return false;
        };
        // ------------------------------------------
        // Misc monoms functions
        // -------------------------------------
        /**
         * Determine if a monom contains a setLetter in it's literal part
         * @param letter
         */
        this.hasLetter = (letter) => {
            // The letter was not found
            if (this._literal[letter === undefined ? 'x' : letter] === undefined) {
                return false;
            }
            // The letter is found and is not zero !
            return this._literal[letter === undefined ? 'x' : letter].isNotZero();
        };
        /**
         * Set the power of a particular setLetter
         * @param letter (string) Letter to change
         * @param pow (number) Power of the setLetter (must be positive integer.
         */
        this.setLetter = (letter, pow) => {
            if (pow instanceof fraction_1.Fraction) {
                // Set the power of the letter to zero => remove it
                if (this.hasLetter(letter) && pow.isZero()) {
                    delete this._literal[letter];
                }
                this._literal[letter] = pow.clone();
            }
            else {
                this.setLetter(letter, new fraction_1.Fraction(pow));
            }
        };
        /**
         * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
         * @param letter (string) Letter to get to degree (power)
         */
        this.degree = (letter) => {
            if (this.variables.length === 0) {
                return new fraction_1.Fraction().zero();
            }
            if (letter === undefined) {
                // Not setLetter given -> we get the global monom degree (sum of all the letters).
                return Object.values(this._literal).reduce((t, n) => t.clone().add(n));
            }
            else {
                // A setLetter is given -> get the corresponding power.
                return this._literal[letter] === undefined ? new fraction_1.Fraction().zero() : this._literal[letter].clone();
            }
        };
        /**
         * Evaluate a monom. Each setLetter must be assigned to a Fraction.
         * @param values    Dictionary of <setLetter: Fraction>
         */
        this.evaluate = (values) => {
            let r = this.coefficient.clone();
            if (typeof values === 'number' || values instanceof fraction_1.Fraction) {
                let tmpValues = {};
                tmpValues[this.variables[0]] = new fraction_1.Fraction(values);
                return this.evaluate(tmpValues);
            }
            if (typeof values === 'object') {
                for (let L in this._literal) {
                    if (values[L] === undefined) {
                        return new fraction_1.Fraction().zero();
                    }
                    let value = new fraction_1.Fraction(values[L]);
                    r.multiply(value.pow(this._literal[L]));
                }
            }
            return r;
        };
        /**
         * Derivative the monom
         * @param letter
         */
        this.derivative = (letter) => {
            // No setLetter given - assume it's the setLetter 'x'
            if (letter === undefined) {
                letter = 'x';
            }
            if (this.hasLetter(letter)) {
                let d = this._literal[letter].clone(), dM = this.clone();
                // Subtract one to the degree.
                dM._literal[letter].subtract(1);
                // Multiply the coefficient by the previous degree
                dM._coefficient.multiply(new fraction_1.Fraction(d.clone()));
                return dM;
            }
            else {
                return new Monom().zero();
            }
        };
        this.primitive = (letter) => {
            // TODO: derivative including the ln value => implies creating different monom system ?
            if (letter === undefined) {
                letter = 'x';
            }
            // Zero monom
            let M = this.clone(), degree;
            if (M.hasLetter(letter)) {
                degree = M.degree(letter).clone().add(1);
                M.coefficient = M.coefficient.clone().divide(degree);
                M.setLetter(letter, degree);
            }
            else {
                // There is no letter.
                // The coefficient might be zero (=> x) or a number a (=> ax)
                if (M.coefficient.isZero()) {
                    M.coefficient = new fraction_1.Fraction().one();
                }
                M.setLetter(letter, 1);
            }
            return M;
        };
        // TODO: The rest of the functions are not used or unnecessary ?
        /**
         * Determine if multiple monoms are similar
         * @param M
         */
        this.areSameAs = (...M) => {
            let result = true;
            // Check all monoms if they are the isSame as the "this" one.
            for (let i = 0; i < M.length; i++) {
                if (!this.isSameAs(M[i])) {
                    return false;
                }
            }
            // All check passed -> all the monoms are similar.
            return result;
        };
        /**
         * Determine if multiple monoms are equals
         * @param M
         */
        this.areEquals = (...M) => {
            // They are not similar.
            if (!this.areSameAs(...M)) {
                return false;
            }
            // Check all coefficient. They must be equals.
            for (let m of M) {
                if (!this._coefficient.isEqual(m.coefficient)) {
                    return false;
                }
            }
            // All checks passed.
            return true;
        };
        this.zero();
        if (value !== undefined) {
            // A string is given - try to parse the value.
            this.parse(value);
        }
        return this;
    }
    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    /**
     * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
     * @returns {Fraction}
     */
    get coefficient() {
        return this._coefficient;
    }
    /**
     * Set the coefficient \\(k\\) value of the monom
     * @param {Fraction | number | string} F
     */
    set coefficient(F) {
        this._coefficient = new fraction_1.Fraction(F);
    }
    /**
     * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
     * @returns {literalType}
     */
    get literal() {
        return this._literal;
    }
    /**
     * Get the literal square roots of the Monom.
     * TODO: remove this getter ? Is it used and is it correct ?
     * @returns {literalType}
     */
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
    /**
     * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
     * @param {literalType} L
     */
    set literal(L) {
        this._literal = L;
    }
    /**
     * Set the literal part of the monom from a string
     * @param inputStr  String like x^2y^3
     */
    set literalStr(inputStr) {
        // TODO : parse using shutingyard tree !
        // Match all x^n
        for (const v of [...inputStr.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) {
            // Create the default letter entry if necessary.
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = new fraction_1.Fraction().zero();
            }
            // Add the new value.
            // TODO: actually, it adds only numeric value
            this._literal[v[1]].add(+v[2]);
        }
        // Match all x
        for (const v of [...inputStr.matchAll(/([a-z](?!\^))/g)]) {
            // Match all single letters
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = new fraction_1.Fraction().zero();
            }
            // Add one to the value.
            this._literal[v[1]].add(1);
        }
    }
    // Getter helpers.
    /**
     * Get the variables letters
     */
    get variables() {
        let M = this.clone().clean();
        return Object.keys(M.literal);
    }
    // Display getter
    /**
     * This display getter is to be used in the polynom display getter
     */
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
            // No setLetter - means it's only a number !
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
        // Decompose only if the coefficient is a natural number
        if (!this.coefficient.isRelative()) {
            return [this.clone()];
        }
        // Decompose only if the power values are natural numbers.
        if (this.hasFractionCoefficient()) {
            return [this.clone()];
        }
        // Security : do not do this if greater than 10000
        if (this.coefficient.numerator > 10000) {
            return [this.clone()];
        }
        const dividers = numeric_1.Numeric.dividers(Math.abs(this.coefficient.numerator));
        // Decompose the literals parts.
        let literals = [];
        for (let L in this.literal) {
            // L is the letter.
            literals = this._getLiteralDividers(literals, L);
        }
        const monomDividers = [];
        if (literals.length > 0 && dividers.length > 0) {
            for (let N of dividers) {
                for (let L of literals) {
                    let M = new Monom();
                    M.coefficient = new fraction_1.Fraction(N);
                    M.literal = L;
                    monomDividers.push(M);
                }
            }
        }
        else if (dividers.length === 0) {
            for (let L of literals) {
                let M = new Monom();
                M.coefficient = new fraction_1.Fraction().one();
                M.literal = L;
                monomDividers.push(M);
            }
        }
        else {
            for (let N of dividers) {
                let M = new Monom();
                M.coefficient = new fraction_1.Fraction(N);
                monomDividers.push(M);
            }
        }
        return monomDividers.length === 0 ? [new Monom().one()] : monomDividers;
    }
    _getLiteralDividers(arr, letter) {
        let tmpList = [];
        // Be default, this.literal[letter] should be a rational number.
        for (let d = 0; d <= this.literal[letter].value; d++) {
            if (arr.length === 0) {
                let litt = {};
                litt[letter] = new fraction_1.Fraction(d);
                tmpList.push(litt);
            }
            else {
                for (let item of arr) {
                    let litt = {};
                    for (let currentLetter in item) {
                        litt[currentLetter] = item[currentLetter];
                    }
                    litt[letter] = new fraction_1.Fraction(d);
                    tmpList.push(litt);
                }
            }
        }
        return tmpList;
    }
    /**
     * Display the monom, forcing the '+' sign to appear
     */
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
    /**
     * Get the tex output of the monom
     */
    get tex() {
        // TODO: display with square root !
        let L = '', letters = Object.keys(this._literal).sort();
        for (let letter of letters) {
            if (this._literal[letter].isNotZero()) {
                L += `${letter}`;
                if (this._literal[letter].isNotEqual(1)) {
                    L += `^{${this._literal[letter].tfrac}}`;
                }
            }
        }
        if (L === '') {
            // No setLetter - means it's only a number !
            if (this._coefficient.value != 0) {
                return `${this._coefficient.frac}`;
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
                return `${this._coefficient.frac}${L}`;
            }
        }
    }
    /**
     * Determine if the monom is null
     */
    isZero() {
        return this._coefficient.value === 0;
    }
    /**
     * Determine if the monom is one
     */
    isOne() {
        return this._coefficient.value === 1 && this.variables.length === 0;
    }
}
exports.Monom = Monom;
// ----------------------------------------
// Static functions
// ----------------------------------------
/**
 * Get the least common multiple of monoms
 * @param monoms    Array of monoms
 */
Monom.lcm = (...monoms) => {
    // All the monoms must be with natural powers...
    for (let m of monoms) {
        if (m.hasFractionCoefficient()) {
            return new Monom().zero();
        }
    }
    let M = new Monom(), coeffN = monoms.map(value => value.coefficient.numerator), coeffD = monoms.map(value => value.coefficient.denominator), n = numeric_1.Numeric.gcd(...coeffN), d = numeric_1.Numeric.lcm(...coeffD);
    // Get the coefficient.
    M.coefficient = new fraction_1.Fraction(n, d).reduce();
    // Set the literal parts - go through each monoms literal parts and get only the lowest degree of each letters.
    for (let m of monoms) {
        // Remove the inexistant letters from the resulting monom
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
                M.literal[letter] = new fraction_1.Fraction(Math.min(m.literal[letter].value, M.literal[letter].value));
            }
        }
    }
    return M;
};
/**
 * Multiply two monoms and return a NEW monom.
 * @param monoms
 */
Monom.xmultiply = (...monoms) => {
    let M = new Monom().one();
    for (let m of monoms) {
        M.multiply(m);
    }
    return M;
};


/***/ }),

/***/ 38:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * Polynom module contains everything necessary to handle polynoms.*
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Polynom = void 0;
const monom_1 = __webpack_require__(937);
const shutingyard_1 = __webpack_require__(505);
const numeric_1 = __webpack_require__(956);
const fraction_1 = __webpack_require__(506);
const equation_1 = __webpack_require__(760);
/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 * ```
 * let P = new Polynom('3x-4')
 * ```
 */
class Polynom {
    /**
     *
     * @param {string} polynomString (optional) Default polynom to parse on class creation
     * @param values
     */
    constructor(polynomString, ...values) {
        this.addToken = (stack, element) => {
            switch (element.tokenType) {
                case shutingyard_1.ShutingyardType.COEFFICIENT:
                    stack.push(new Polynom(element.token));
                    break;
                case shutingyard_1.ShutingyardType.VARIABLE:
                    stack.push(new Polynom().add(new monom_1.Monom(element.token)));
                    break;
                case shutingyard_1.ShutingyardType.CONSTANT:
                    // TODO: add constant support to Polynom parsing.
                    console.log('Actually, not supported - will be added later !');
                    break;
                case shutingyard_1.ShutingyardType.OPERATION:
                    if (stack.length >= 2) {
                        const b = stack.pop(), a = stack.pop();
                        if (element.token === '+') {
                            stack.push(a.add(b));
                        }
                        else if (element.token === '-') {
                            stack.push(a.subtract(b));
                        }
                        else if (element.token === '*') {
                            stack.push(a.multiply(b));
                        }
                        else if (element.token === '/') {
                            if (b.degree().isStrictlyPositive()) {
                                console.log('divide by a polynom -> should create a rational polynom !');
                            }
                            else {
                                stack.push(a.divide(b.monoms[0].coefficient));
                            }
                        }
                        else if (element.token === '^') {
                            if (b.degree().isStrictlyPositive()) {
                                console.error('Cannot elevate a polynom with another polynom !');
                            }
                            else {
                                if (b.monoms[0].coefficient.isRelative()) {
                                    // Integer power
                                    stack.push(a.pow(b.monoms[0].coefficient.value));
                                }
                                else {
                                    // Only allow power if the previous polynom is only a monom, without coefficient.
                                    if (a.monoms.length === 1 && a.monoms[0].coefficient.isOne()) {
                                        for (let letter in a.monoms[0].literal) {
                                            a.monoms[0].literal[letter].multiply(b.monoms[0].coefficient);
                                        }
                                        stack.push(a);
                                    }
                                    else {
                                        console.error('Cannot have power with fraction');
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (element.token === '-') {
                            stack.push(stack.pop().opposed());
                        }
                        else {
                            throw "Error parsing the polynom " + this._rawString;
                        }
                    }
                    break;
                case shutingyard_1.ShutingyardType.MONOM:
                    // Should never appear.
                    console.error('The monom token should not appear here');
                    break;
                case shutingyard_1.ShutingyardType.FUNCTION:
                    // Should never appear.
                    console.error('The function token should not appear here - might be introduced later.');
                    break;
            }
        };
        // ------------------------------------------
        /**
         * Parse a string to a polynom.
         * @param inputStr
         * @param values: as string, numbers or fractions
         */
        this.parse = (inputStr, ...values) => {
            // Reset the main variables.
            this._monoms = [];
            this._factors = [];
            if (typeof inputStr === 'string') {
                return this._parseString(inputStr, ...values);
            }
            else if ((typeof inputStr === 'number' || inputStr instanceof fraction_1.Fraction || inputStr instanceof monom_1.Monom)
                && (values === undefined || values.length === 0)) {
                this._monoms.push(new monom_1.Monom(inputStr));
            }
            else if (inputStr instanceof monom_1.Monom && values.length > 0) {
                this._monoms.push(new monom_1.Monom(inputStr));
                values.forEach(m => {
                    this._monoms.push(new monom_1.Monom(m));
                });
            }
            else if (inputStr instanceof Polynom) {
                for (const m of inputStr.monoms) {
                    this._monoms.push(m.clone());
                }
            }
            return this;
        };
        // ------------------------------------------
        // Creation / parsing functions
        /**
         * Clone the polynom
         */
        this.clone = () => {
            const P = new Polynom();
            const M = [];
            for (const m of this._monoms) {
                M.push(m.clone());
            }
            P.monoms = M;
            return P;
        };
        /**
         * Set the polynom to zero.
         * @returns {this}
         */
        this.zero = () => {
            this._monoms = [];
            this._monoms.push(new monom_1.Monom().zero());
            this._rawString = '0';
            return this;
        };
        this.one = () => {
            this._monoms = [];
            this._monoms.push(new monom_1.Monom().one());
            this._rawString = '1';
            return this;
        };
        this.empty = () => {
            this._monoms = [];
            this._rawString = '';
            return this;
        };
        // ------------------------------------------
        this.opposed = () => {
            this._monoms = this._monoms.map(m => m.opposed());
            return this;
        };
        this.add = (...values) => {
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
        // // -----------------------------------------------
        // // Polynom generators and randomizers
        // // -----------------------------------------------
        // random(config?: randomPolynomConfig) {
        //     return Random.polynom(config);
        // }
        //
        // private _randomizeDefaults: { [key: string]: number | string | boolean } = {
        //     degree: 2,
        //     unit: true,
        //     fractions: false,
        //     factorable: false,
        //     letters: 'x',
        //     allowNullMonom: false,
        //     numberOfMonoms: false
        // };
        // get randomizeDefaults(): { [key: string]: number | string | boolean } {
        //     return this._randomizeDefaults;
        // }
        //
        // set randomizeDefaults(value) {
        //     this._randomizeDefaults = value;
        // }
        //
        // randomize = (config: { [key: string]: number | string | boolean }): Polynom => {
        //     let P = new Polynom();
        //
        //     // Check the config file and use the default values.
        //     if (config === undefined) {
        //         config = {};
        //     }
        //     for (let k in this._randomizeDefaults) {
        //         if (config[k] === undefined) {
        //             config[k] = this._randomizeDefaults[k];
        //         }
        //     }
        //
        //     // TODO: Build a more robust randomize function
        //     return P;
        // }
        //
        // rndFactorable = (degree: number = 2, unit: boolean | number = false, letters: string = 'x'): Polynom => {
        //     // TODO: Make rndFactorable polynom generator more user friendly
        //     this._factors = [];
        //     for (let i = 0; i < degree; i++) {
        //         let factorUnit = unit === true || i >= unit,
        //             p = Random.polynom({
        //                 degree: 1,
        //                 unit: factorUnit,
        //                 fraction: false,
        //                 letters
        //             });
        //         this._factors.push(p);
        //     }
        //
        //     this.empty().monoms = this._factors[0].monoms;
        //     for (let i = 1; i < this._factors.length; i++) {
        //         this.multiply(this._factors[i]);
        //     }
        //     return this;
        // };
        // ------------------------------------------
        // Mathematical operations
        this.subtract = (...values) => {
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
        this.multiply = (value) => {
            if (value instanceof Polynom) {
                return this.multiplyByPolynom(value);
            }
            else if (value instanceof fraction_1.Fraction) {
                return this.multiplyByFraction(value);
            }
            else if (value instanceof monom_1.Monom) {
                return this.multiplyByMonom(value);
            }
            else if (Number.isSafeInteger(value) && typeof value === 'number') {
                return this.multiplyByInteger(value);
            }
            // Something went wrong...
            return this;
        };
        /**
         * Divide the current polynom by another polynom.
         * @param P
         * returns {quotient: Polynom, reminder: Polynom}
         */
        this.euclidian = (P) => {
            const letter = P.variables[0];
            const quotient = new Polynom().zero();
            const reminder = this.clone().reorder(letter);
            // There is no variable - means it's a number
            if (P.variables.length === 0) {
                let q = this.clone().divide(P);
                return {
                    quotient: this.clone().divide(P),
                    reminder: new Polynom().zero()
                };
            }
            // Get at least a letter
            const maxMP = P.monomByDegree(undefined, letter);
            const degreeP = P.degree(letter);
            let newM;
            // Make the euclidian division of the two polynoms.
            let MaxIteration = this.degree(letter).clone().multiply(2);
            while (reminder.degree(letter).geq(degreeP) && MaxIteration.isPositive()) {
                MaxIteration.subtract(1);
                // Get the greatest monom divided by the max monom of the divider
                newM = reminder.monomByDegree(undefined, letter).clone().divide(maxMP);
                if (newM.isZero()) {
                    break;
                }
                // Get the new quotient and reminder.
                quotient.add(newM);
                reminder.subtract(P.clone().multiply(newM));
            }
            quotient.reduce();
            reminder.reduce();
            return { quotient, reminder };
        };
        this.divide = (value) => {
            if (value instanceof fraction_1.Fraction) {
                return this.divideByFraction(value);
            }
            else if (typeof value === 'number' && Number.isSafeInteger(value)) {
                return this.divideByInteger(value);
            }
            else if (value instanceof Polynom) {
                if (value.monoms.length === 1 && value.variables.length === 0) {
                    return this.divideByFraction(value.monoms[0].coefficient);
                }
            }
        };
        this.pow = (nb) => {
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
        // ------------------------------------------
        /**
         * Compare the current coefficient with another coefficient
         * @param P
         * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
         */
        this.compare = (P, sign) => {
            if (sign === undefined) {
                sign = '=';
            }
            // Create clone version to reduce them without altering the original polynoms.
            const cP1 = this.clone().reduce().reorder();
            const cP2 = P.clone().reduce().reorder();
            switch (sign) {
                case '=':
                    // They must have the isSame length and the isSame degree
                    if (cP1.length !== cP2.length || cP1.degree().isNotEqual(cP2.degree())) {
                        return false;
                    }
                    // Check if the coefficients are the isSame.
                    for (const i in cP1.monoms) {
                        if (!cP1.monoms[i].isEqual(cP2.monoms[i])) {
                            return false;
                        }
                    }
                    return true;
                case 'same':
                    // They must have the isSame length and the isSame degree
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
        this.isEqual = (P) => {
            return this.compare(P, '=');
        };
        this.isSameAs = (P) => {
            return this.compare(P, 'same');
        };
        this.isOpposedAt = (P) => {
            return this.compare(P.clone().opposed(), '=');
        };
        this.isFactorized = (polynomString) => {
            let P;
            // Check if polynom is complete...
            if (polynomString.match(/\(/g).length !== polynomString.match(/\)/g).length) {
                return false;
            }
            // Try to build the polynom
            try {
                P = new Polynom(polynomString);
            }
            catch (e) {
                return false;
            }
            // Both polynom aren't the same (once developed and reduced => they cannot be equivalent)
            if (!this.isEqual(P)) {
                return false;
            }
            // Check if the provided (string) version is fully factorized.
            // Run a regex on the string.
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
            // Factorize the current polynom.
            this.factorize();
            // Compare the given factors with the generated factors
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
            // The polyfactors must be empty and the cumulative opposite factors must be 1.
            return (polyFactors.length === 0 && sign === 1);
        };
        this.isDeveloped = (polynomString) => {
            let P;
            // There is at least one parenthese - it is not developed.
            if (polynomString.match(/\(/g).length + polynomString.match(/\)/g).length) {
                return false;
            }
            // Try to build the polynom
            try {
                // Build the polynom
                P = new Polynom(polynomString);
            }
            catch (e) {
                return false;
            }
            // Both polynom aren't the same (once developed and reduced => they cannot be equivalent)
            if (!this.isEqual(P)) {
                return false;
            }
            // Check that everything is completely developed. Actually, there are no parentheses... so it is fully developed
            // maybe it wasn't reduced and not ordered...
            // compare polynom string.
            // normalize the string
            let polynomStringNormalized = polynomString.replaceAll('[*\s]', '');
            // Determine if it's the exact same string.
            // TODO: Maybe it's enough to just make this test !
            return polynomStringNormalized === P.reduce().reorder().display;
        };
        // ------------------------------------------
        // Compare functions
        // -------------------------------------
        this.reduce = () => {
            for (let i = 0; i < this._monoms.length; i++) {
                for (let j = i + 1; j < this._monoms.length; j++) {
                    if (this._monoms[i].isSameAs(this.monoms[j])) {
                        this._monoms[i].add(this.monoms[j]);
                        this._monoms.splice(j, 1);
                    }
                }
            }
            // Remove all null monoms
            this._monoms = this._monoms.filter((m) => {
                return m.coefficient.value !== 0;
            });
            // Reduce all monoms coefficient.
            for (const m of this._monoms) {
                m.coefficient.reduce();
            }
            if (this.length === 0) {
                return new Polynom().zero();
            }
            return this;
        };
        this.reorder = (letter = 'x') => {
            // TODO: Must handle multiple setLetter reorder system
            this._monoms.sort(function (a, b) {
                return b.degree(letter).clone().subtract(a.degree(letter)).value;
            });
            return this.reduce();
        };
        this.degree = (letter) => {
            let d = new fraction_1.Fraction().zero();
            for (const m of this._monoms) {
                d = fraction_1.Fraction.max(m.degree(letter).value, d);
            }
            return d;
        };
        this.letters = () => {
            let L = [], S = new Set();
            for (let m of this._monoms) {
                S = new Set([...S, ...m.variables]);
            }
            // @ts-ignore
            return [...S];
        };
        /**
         * Replace a variable (letter) by a polynom.
         * @param letter
         * @param P
         */
        this.replaceBy = (letter, P) => {
            let pow;
            const resultPolynom = new Polynom().zero();
            for (const m of this.monoms) {
                if (m.literal[letter] === undefined || m.literal[letter].isZero()) {
                    resultPolynom.add(m.clone());
                }
                else {
                    // We have found a setLetter.
                    // Get the power and reset it.
                    pow = m.literal[letter].clone();
                    delete m.literal[letter];
                    // TODO: replaceBy works only with positive and natural pow
                    resultPolynom.add(P.clone().pow(Math.abs(pow.numerator)).multiply(m));
                }
            }
            this._monoms = resultPolynom.reduce().reorder().monoms;
            return this;
        };
        // Evaluate a polynom.
        this.evaluate = (values) => {
            const r = new fraction_1.Fraction().zero();
            this._monoms.forEach(monom => {
                //console.log('Evaluate polynom: ', monom.display, values, monom.evaluate(values).display);
                r.add(monom.evaluate(values));
            });
            return r;
        };
        this.derivative = (letter) => {
            let dP = new Polynom();
            for (let m of this._monoms) {
                dP.add(m.derivative(letter));
            }
            return dP;
        };
        this.primitive = (letter) => {
            let dP = new Polynom();
            for (let m of this._monoms) {
                dP.add(m.primitive(letter));
            }
            return dP;
        };
        // ------------------------------------------
        // Misc polynoms functions
        this.integrate = (a, b, letter) => {
            const primitive = this.primitive(letter);
            if (letter === undefined) {
                letter = 'x';
            }
            let valuesA = {}, valuesB = {};
            valuesA[letter] = new fraction_1.Fraction(a);
            valuesB[letter] = new fraction_1.Fraction(b);
            return primitive.evaluate(valuesB).subtract(primitive.evaluate(valuesA));
        };
        // -------------------------------------
        /**
         * Factorize a polynom and store the best results in factors.
         * @param maxValue Defines the greatest value to search to (default is 20).
         */
        this.factorize = (letter) => {
            let factors = [];
            // Extract the common monom
            let P = this.clone().reorder(), M = P.commonMonom(), tempPolynom;
            // It has a common monom.
            if (!M.isOne()) {
                tempPolynom = new Polynom(M);
                factors = [tempPolynom.clone()];
                P = P.euclidian(tempPolynom).quotient;
            }
            let securityLoop = P.degree().clone().multiply(2).value;
            let result;
            // securityLoop = 0
            while (securityLoop >= 0) {
                securityLoop--;
                if (P.monoms.length < 2) {
                    if (!P.isOne()) {
                        factors.push(P.clone());
                        P.one();
                    }
                    break;
                }
                else if (P.degree(letter).isOne()) {
                    factors.push(P.clone());
                    P.one();
                    break;
                }
                else {
                    // Get the first and last monom and build all their dividers.
                    let m1 = P.monoms[0].dividers, m2 = P.monoms[P.monoms.length - 1].dividers;
                    // Create the list of all "potential" polynom dividers.
                    let allDividers = this._getAllPotentialFactors(P, letter);
                    allDividers.every(div => {
                        result = P.euclidian(div);
                        if (result.reminder.isZero()) {
                            P = result.quotient.clone();
                            factors.push(div);
                            return false;
                        }
                        return true;
                    });
                }
            }
            if (!P.isOne()) {
                factors.push(P.clone());
            }
            this.factors = factors;
            return factors;
        };
        this._getAllPotentialFactors = (P, letter) => {
            let m1 = P.monoms[0].dividers, m2 = P.monoms[P.monoms.length - 1].dividers;
            let allDividers = [];
            m1.forEach(m1d => {
                m2.forEach(m2d => {
                    if (m1d.degree(letter).isNotEqual(m2d.degree(letter))) {
                        allDividers.push(new Polynom(m1d, m2d));
                        allDividers.push(new Polynom(m1d, m2d.clone().opposed()));
                    }
                });
            });
            return allDividers;
        };
        // TODO: get zeroes for more than first degree and for more than natural degrees
        this.getZeroes = () => {
            let equ = new equation_1.Equation(this.clone(), 0);
            equ.solve();
            return equ.solutions;
            //
            // const Z: Fraction[] = [];
            //
            // // ISolution: {tex: string, value: number, exact: boolean|Fraction|...}
            //
            // switch (this.degree().value) {
            //     case 0:
            //         if (this._monoms[0].coefficient.value === 0) {
            //             return [{
            //                 tex: '\\mathbb{R}',
            //                 value: NaN,
            //                 exact: false
            //             }];
            //         } else {
            //             return [{
            //                 tex: '\\varnothing',
            //                 value: NaN,
            //                 exact: false
            //             }];
            //         }
            //     case 1:
            //         // There is only one monoms,
            //         if (this._monoms.length === 1) {
            //             return [{
            //                 tex: '0',
            //                 value: 0,
            //                 exact: new Fraction().zero()
            //             }];
            //         } else {
            //             const P = this.clone().reduce().reorder();
            //             const coeff = P.monoms[1].coefficient.opposed().divide(P.monoms[0].coefficient)
            //             return [{
            //                 tex: coeff.tex,
            //                 value: coeff.value,
            //                 exact: coeff
            //             }];
            //         }
            //     // TODO: Determine the zeros of an equation of second degree.
            //     //case 2:
            //     default:
            //         // Make sure the polynom is factorized.
            //         if (this._factors.length === 0) {
            //             this.factorize()
            //         }
            //
            //         let zeroes:Fraction[] = [], zeroesAsTex = [];
            //         for (let P of this._factors) {
            //             if (P.degree().greater(2)) {
            //                 // TODO: get zeroes of polynom with a degree greater than 2.
            //
            //             } else if (P.degree().value === 2) {
            //                 let A = P.monomByDegree(2).coefficient,
            //                     B = P.monomByDegree(1).coefficient,
            //                     C = P.monomByDegree(0).coefficient,
            //                     D = B.clone().pow(2).subtract(A.clone().multiply(C).multiply(4));
            //
            //                 if (D.value > 0) {
            //                     /*console.log('Two zeroes for ', P.tex); */
            //                     let x1 = (-(B.value) + Math.sqrt(D.value)) / (2 * A.value),
            //                         x2 = (-(B.value) - Math.sqrt(D.value)) / (2 * A.value);
            //
            //                     zeroes.push(new Fraction(x1.toFixed(3)).reduce());
            //                     zeroes.push(new Fraction(x2.toFixed(3)).reduce());
            //                 } else if (D.value === 0) {
            //                     /*console.log('One zero for ', P.tex); */
            //                 } else {
            //                     console.log('No zero for ', P.tex);
            //                 }
            //             } else {
            //                 for (let z of P.getZeroes()) {
            //                     // Check if the zero is already in the list.
            //                     // if (z === false || z === true) {
            //                     //     continue;
            //                     // }
            //                     if (zeroesAsTex.indexOf(z.frac) === -1) {
            //                         zeroes.push(z);
            //                         zeroesAsTex.push(z.frac);
            //                     }
            //                 }
            //             }
            //         }
            //
            //
            //         return zeroes;
            // }
            // return Z;
        };
        // TODO: analyse the next functions to determine if they are useful or not...
        this.monomByDegree = (degree, letter) => {
            if (degree === undefined) {
                // return the highest degree monom.
                return this.monomByDegree(this.degree(letter), letter);
            }
            // Reduce the polynom.
            const M = this.clone().reduce();
            for (const m of M._monoms) {
                if (m.degree(letter).isEqual(degree)) {
                    return m.clone();
                }
            }
            // Nothing was found - return the null monom.
            return new monom_1.Monom().zero();
        };
        this.monomsByDegree = (degree, letter) => {
            if (degree === undefined) {
                // return the highest degree monom.
                return this.monomsByDegree(this.degree(letter));
            }
            // Reduce the polynom.
            let Ms = [];
            const M = this.clone().reduce();
            for (const m of M._monoms) {
                if (m.degree(letter) === degree) {
                    Ms.push(m.clone());
                }
            }
            return Ms;
            // Nothing was found - retur
        };
        // Used in LinearSystem.tex
        this.monomByLetter = (letter) => {
            const M = this.clone().reduce();
            for (const m of M._monoms) {
                if (m.hasLetter(letter)) {
                    return m.clone();
                }
            }
            return new monom_1.Monom().zero();
        };
        // Next functions are used for for commonMonom, which is used in the factorize method.
        this.getDenominators = () => {
            const denominators = [];
            for (const m of this._monoms) {
                denominators.push(m.coefficient.denominator);
            }
            return denominators;
        };
        this.getNumerators = () => {
            const numerators = [];
            for (const m of this._monoms) {
                numerators.push(m.coefficient.numerator);
            }
            return numerators;
        };
        this.lcmDenominator = () => {
            return numeric_1.Numeric.lcm(...this.getDenominators());
        };
        // ------------------------------------------
        // Polynoms factorization functions
        this.gcdDenominator = () => {
            return numeric_1.Numeric.gcd(...this.getDenominators());
        };
        this.lcmNumerator = () => {
            return numeric_1.Numeric.lcm(...this.getNumerators());
        };
        this.gcdNumerator = () => {
            return numeric_1.Numeric.gcd(...this.getNumerators());
        };
        // ------------------------------------------
        // Polynoms helpers functions
        // -------------------------------------
        this.commonMonom = () => {
            let M = new monom_1.Monom().one(), numerator, denominator, degree = this.degree();
            numerator = this.gcdNumerator();
            denominator = this.gcdDenominator();
            M.coefficient = new fraction_1.Fraction(numerator, denominator);
            for (let L of this.variables) {
                // Initialize the setLetter with the max degree
                M.setLetter(L, degree);
                for (let m of this._monoms) {
                    M.setLetter(L, fraction_1.Fraction.min(m.degree(L), M.degree(L)));
                    if (M.degree(L).isZero()) {
                        break;
                    }
                }
            }
            return M;
        };
        this.limitToInfinity = (letter) => {
            const M = this.monomByDegree(undefined, letter), sign = M.coefficient.sign(), degree = M.degree(letter);
            if (degree.isStrictlyPositive()) {
                return sign === 1 ? (new fraction_1.Fraction()).infinite() : (new fraction_1.Fraction()).infinite().opposed();
            }
            else if (degree.isZero()) {
                return M.coefficient;
            }
            // Any other cases
            return (new fraction_1.Fraction()).zero();
        };
        this.limitToNegativeInfinity = (letter) => {
            const M = this.monomByDegree(undefined, letter), sign = M.coefficient.sign(), degree = M.degree(letter);
            if (degree.isStrictlyPositive()) {
                return sign === -1 ? (new fraction_1.Fraction()).infinite() : (new fraction_1.Fraction()).infinite().opposed();
            }
            else if (degree.isZero()) {
                return M.coefficient;
            }
            // Any other cases
            return (new fraction_1.Fraction()).zero();
        };
        this.genDisplay = (output, forceSign, wrapParentheses) => {
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
        /**
         * Main parse using a shutting yard class
         * @param inputStr
         */
        this.shutingYardToReducedPolynom = (inputStr) => {
            // Get the RPN array of the current expression
            const SY = new shutingyard_1.Shutingyard().parse(inputStr);
            const rpn = SY.rpn;
            // New version for reducing shuting yard.
            this.zero();
            let stack = [], monom = new monom_1.Monom();
            // Loop through the
            for (const element of rpn) {
                this.addToken(stack, element);
            }
            if (stack.length === 1) {
                this.add(stack[0]);
            }
            return this;
            /**
             let m1: Polynom;
             let m2: Polynom;
    
             let stack: Polynom[] = [],
             previousToken: string = null,
             tempPolynom
    
             for (const element of rpn) {
                if (element.tokenType === 'coefficient' || element.tokenType === 'variable') {
                    tempPolynom = new Polynom().zero();
                    tempPolynom.monoms = [new Monom(element.token)]
                    stack.push(tempPolynom.clone())
                } else if (element.tokenType === 'operation') {
                    m2 = (stack.pop()) || new Polynom().zero();
                    m1 = (stack.pop()) || new Polynom().zero();
                    switch (element.token) {
                        case '+':
                            stack.push(m1.add(m2))
                            break;
                        case '-':
                            stack.push(m1.subtract(m2))
                            break;
                        case '*':
                            stack.push(m1.multiply(m2))
                            break;
                        case '^':
                            stack.push(m1.pow(+previousToken))
                    }
                }
                previousToken = element.token;
            }
    
             this._monoms = stack[0].monoms;
             return this;*/
        };
        this.multiplyByPolynom = (P) => {
            const M = [];
            for (const m1 of this._monoms) {
                for (const m2 of P.monoms) {
                    M.push(monom_1.Monom.xmultiply(m1, m2));
                }
            }
            this._monoms = M;
            return this.reduce();
        };
        this.multiplyByFraction = (F) => {
            for (const m of this._monoms) {
                m.coefficient.multiply(F);
            }
            return this.reduce();
        };
        this.multiplyByInteger = (nb) => {
            return this.multiplyByFraction(new fraction_1.Fraction(nb));
        };
        this.multiplyByMonom = (M) => {
            for (const m of this._monoms) {
                m.multiply(M);
            }
            return this.reduce();
        };
        this.divideByInteger = (nb) => {
            const nbF = new fraction_1.Fraction(nb);
            for (const m of this._monoms) {
                m.coefficient.divide(nbF);
            }
            return this;
        };
        this.divideByFraction = (F) => {
            for (const m of this._monoms) {
                m.coefficient.divide(F);
            }
            return this;
        };
        this._factorize2ndDegree = (letter) => {
            let P1, P2, a, b, c, delta, x1, x2, factor;
            // One variable only
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
                        // TODO: Update new Polynom to accept anything...
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
                    // (2x+5)(3x-2)
                    // 6x^2+11x-10
                    // a = 6, b = 11, c = -10
                    // delta = 121-4*6*(-10) = 361= 19^2
                    // x1 = (-11 + 19)  / 12 = 8/12 = 2/3
                    // x2 = (-11 - 19)  / 12 = -30/12 = -5/2
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
                    // No solution possible - return the complete value.
                    return [this.clone()];
                }
            }
            else {
                // If multiple variables, only handle perfect squares...
                a = this.monomByDegree(2, letter);
                b = this.monomByDegree(1, letter);
                c = this.monomByDegree(0, letter);
                if (a.isLiteralSquare() && c.isLiteralSquare()) {
                    // Check the middle item is same as...
                    if (b.clone().pow(2).isSameAs(a.clone().multiply(c))) {
                        // Determine if the coefficient values matches.
                        // Search 4 values (r, s, t, u) that matches:
                        // (r X + s Y)(t X + u Y) = rt X^2 + (ru + st) XY + su Y^2
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
                //
                // console.log(a.tex, b.tex, c.tex)
                // if (a.isSquare() && c.isSquare()) {
                //     console.log('A C squares')
                //     if (a.clone().sqrt().multiply(c.clone().sqrt()).multiplyByNumber(2).isSameAs(b)) {
                //         console.log('HERE')
                //         if (a.coefficient.sign() === b.coefficient.sign()) {
                //             return []
                //         }else{
                //             return []
                //         }
                //     }
                // } else if(a.isLiteralSquare() && c.isLiteralSquare()) {
                //     console.log('A C litteral SQUARES')
                //     // Check that the middle element is the product of a and c.
                //
                //     if(b.clone().pow(2).isSameAs(a.clone().multiply(c))){
                //         console.log('SAME')
                //
                //     }else{
                //         console.log('NOT SAME')
                //     }
                //
                //     return [this.clone()]
                // } else {
                //     console.log('NOT SQUARES AT ALL !!!!')
                // }
            }
        };
        this._factorizeByGroups = () => {
            // TODO: Factorize by groups.
            return [];
        };
        this._monoms = [];
        this._factors = [];
        if (polynomString !== undefined) {
            this.parse(polynomString, ...values);
        }
        return this;
    }
    // ------------------------------------------
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
    get texString() {
        return this._texString;
    }
    get texFactors() {
        this.factorize();
        if (this.factors.length === 0) {
            return this.tex;
        }
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
    get length() {
        // TODO: Must reduce the monoms list to remove the zero coefficient.
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
        // Remove duplicates.
        V = [...new Set(V)];
        return V;
    }
    get numberOfVars() {
        return this.variables.length;
    }
    isZero() {
        return (this._monoms.length === 1 && this._monoms[0].coefficient.isZero()) || this._monoms.length === 0;
    }
    isOne() {
        return this._monoms.length === 1 && this._monoms[0].coefficient.isOne();
    }
    _parseString(inputStr, ...values) {
        if (values === undefined || values.length === 0) {
            inputStr = '' + inputStr;
            this._rawString = inputStr;
            // Parse the polynom using the shutting yard algorithm
            if (inputStr !== '' && !isNaN(Number(inputStr))) {
                this.empty();
                // It's a simple number.
                let m = new monom_1.Monom(inputStr);
                // m.coefficient = new Fraction(inputStr);
                // m.literalStr = '';
                this.add(m);
                return this;
            }
            // Parse the string.
            return this.shutingYardToReducedPolynom(inputStr);
        }
        else if (/^[a-z]/.test(inputStr)) {
            // We assume the inputStr contains only letters.
            this.empty();
            let fractions = values.map(x => new fraction_1.Fraction(x));
            // Multiple setLetter version
            if (inputStr.length > 1) {
                // TODO: check that the number of values given correspond to the letters (+1 eventually)
                let letters = inputStr.split(''), i = 0;
                for (let F of fractions) {
                    let m = new monom_1.Monom();
                    m.coefficient = F.clone();
                    m.literalStr = letters[i] || '';
                    this.add(m);
                    i++;
                }
            }
            // Single setLetter version
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
    }
}
exports.Polynom = Polynom;


/***/ }),

/***/ 107:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rational = void 0;
const polynom_1 = __webpack_require__(38);
const fraction_1 = __webpack_require__(506);
const equation_1 = __webpack_require__(760);
/**
 * Rational class can handle rational polynoms
 */
class Rational {
    /**
     *
     * @param numerator
     * @param denominator
     */
    constructor(numerator, denominator) {
        this.clone = () => {
            this._numerator = this._numerator.clone();
            this._denominator = this._denominator.clone();
            return this;
        };
        this.domain = () => {
            let zeroes = this._denominator.getZeroes();
            if (zeroes.length === 0 || zeroes[0].tex === equation_1.PARTICULAR_SOLUTION.real) {
                return equation_1.PARTICULAR_SOLUTION.real;
            }
            else if (zeroes[0].tex === equation_1.PARTICULAR_SOLUTION.varnothing) {
                return equation_1.PARTICULAR_SOLUTION.varnothing;
            }
            else {
                return '\\mathbb{R}\\setminus\\left\\{' +
                    zeroes.map(x => x.tex).join(';') + '\\right\\}';
            }
        };
        this.amplify = (P) => {
            this._numerator.multiply(P);
            this._denominator.multiply(P);
            return this;
        };
        this.derivative = (letter) => {
            let N = this._numerator.clone(), D = this._denominator.clone(), dN = N.clone().derivative(letter), dD = D.clone().derivative(letter);
            this._numerator = dN.clone().multiply(D).subtract(N.clone().multiply(dD));
            this._denominator = D.clone().pow(2);
            return this;
        };
        this.simplify = (P) => {
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
        this.reduce = () => {
            this._numerator.factorize();
            for (let f of this._numerator.factors) {
                this.simplify(f);
            }
            return this;
        };
        this.opposed = () => {
            this._numerator.opposed();
            return this;
        };
        this.add = (R) => {
            // 1. Make sure both rational are at the same denominator
            // 2. Add the numerators.
            // 3. Simplify
            // Store the adding denominator
            let denominator = this._denominator.clone();
            // Amplif the main rational polynom by the adding denominator
            this.amplify(R._denominator);
            // Add to the numerator the adding value...
            this._numerator.add(R._numerator.clone().multiply(denominator));
            return this;
        };
        this.subtract = (R) => {
            return this.add(R.clone().opposed());
        };
        this.limits = (value, offset, letter) => {
            if (value === Infinity || value === -Infinity) {
                let { quotient, reminder } = this._numerator.clone().euclidian(this._denominator);
                // quotient is positive => it will be infinite.
                if (quotient.degree(letter).isStrictlyPositive()) {
                    return value === Infinity ? quotient.limitToInfinity(letter) : quotient.limitToNegativeInfinity(letter);
                    // return quotient.monomByDegree(undefined, letter).coefficient.sign()===1?(new Fraction()).infinite():(new Fraction()).infinite().opposed()
                }
                else {
                    return quotient.monomByDegree(undefined, letter).coefficient;
                }
            }
            else {
                let evalValues = {}, evalValuesOffset = {}, theLimit, theSign, FR = this.clone().reduce();
                evalValues[letter === undefined ? 'x' : letter] = new fraction_1.Fraction(value);
                if (offset !== 'above' && offset !== 'below') {
                    theLimit = FR._numerator.evaluate(evalValues)
                        .divide(FR._denominator.evaluate(evalValues));
                    return theLimit.isInfinity() ? theLimit.abs() : theLimit;
                }
                else {
                    if (offset === 'above') {
                        evalValuesOffset[letter === undefined ? 'x' : letter] = (new fraction_1.Fraction(value)).add(0.000001);
                    }
                    else if (offset === 'below') {
                        evalValuesOffset[letter === undefined ? 'x' : letter] = (new fraction_1.Fraction(value)).subtract(0.000001);
                    }
                    theLimit = FR._numerator.evaluate(evalValues)
                        .divide(FR._denominator.evaluate(evalValues));
                    theSign = FR._numerator.evaluate(evalValuesOffset)
                        .divide(FR._denominator.evaluate(evalValuesOffset)).sign();
                    if (theLimit.isInfinity()) {
                        return theSign === 1 ? theLimit.abs() : theLimit.abs().opposed();
                    }
                    else {
                        return theLimit;
                    }
                }
            }
        };
        this.makeTableOfSigns = () => {
            // Factorize the numerator and the denominator
            this._numerator.factorize();
            this._denominator.factorize();
            let zeroes = equation_1.Equation.makeSolutionsUnique([...this._numerator.getZeroes(), ...this._denominator.getZeroes()], true), NFactors = this._numerator.factors, DFactors = this._denominator.factors;
            let tableOfSigns = [], result = [];
            NFactors.forEach(factor => {
                tableOfSigns.push(this._makeOneLineOfTableOfSigns(factor, zeroes, 'z'));
            });
            DFactors.forEach(factor => {
                tableOfSigns.push(this._makeOneLineOfTableOfSigns(factor, zeroes, 'd'));
            });
            // Empty line
            tableOfSigns.push([]);
            // Add the final row as cumulative
            let resultLine = tableOfSigns[0].map((x, index) => {
                if (index === 0) {
                    return '';
                }
                if (index === tableOfSigns[0].length - 1) {
                    return '';
                }
                if (index % 2 === 0) {
                    return 't';
                }
                return '+';
            });
            for (let current of tableOfSigns) {
                for (let i = 0; i < current.length; i++) {
                    if (i % 2 === 0) {
                        // t, z or d
                        if (resultLine[i] === 'd') {
                            continue;
                        }
                        if (current[i] !== 't') {
                            resultLine[i] = current[i];
                        }
                    }
                    else {
                        // + or -
                        if (current[i] === '-') {
                            resultLine[i] = resultLine[i] === '+' ? '-' : '+';
                        }
                    }
                }
            }
            // Add the variation line.
            // TODO: add the variation line.
            tableOfSigns.push(resultLine);
            let tos = {
                factors: [...NFactors, ...DFactors],
                zeroes: zeroes,
                signs: tableOfSigns,
                tex: ''
            };
            this._makeTexFromTableOfSigns(tos);
            return tos;
        };
        this._makeTexFromTableOfSigns = (tos) => {
            let tex = `\\begin{tikzpicture}
\\tkzTabInit[lgt=3,espcl=2,deltacl=0]{/1.2,\\(${tos.factors.map(x => x.tex).join('\\)/1,\\(')}\\)/1,/.1,\\(f(x)\\)/1.2}{{\\scriptsize \\hspace{1cm} \\(-\\infty\\)},\\(${tos.zeroes.map(x => x.tex).join('\\),\\(')}\\),{\\scriptsize \\hspace{-1cm} \\(+\\infty\\)}}`;
            tos.signs.forEach(list => {
                tex += (`\n\\tkzTabLine{${list.join(',')}}`);
            });
            tex += `\n\\end{tikzpicture}`;
            tos.tex = tex;
            return tex;
        };
        this._makeOneLineOfTableOfSigns = (factor, zeroes, zeroSign) => {
            let oneLine = [], currentZero = factor.getZeroes().map(x => x.tex);
            // First +/- sign, before the first zero
            oneLine.push('');
            oneLine.push(factor.evaluate(zeroes[0].value - 1).sign() === 1 ? '+' : '-');
            for (let i = 0; i < zeroes.length; i++) {
                // Add the zero if it's the current one
                oneLine.push(currentZero.includes(zeroes[i].tex) ? zeroSign : 't');
                // + / - sign after the current zero
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
        this._numerator = numerator ? numerator.clone() : new polynom_1.Polynom();
        this._denominator = denominator ? denominator.clone() : new polynom_1.Polynom();
    }
    get numerator() {
        return this._numerator;
    }
    get denominator() {
        return this._denominator;
    }
    get tex() {
        return `\\frac{ ${this._numerator.tex} }{ ${this._denominator.tex} }`;
    }
    get texFactors() {
        return `\\frac{ ${this._numerator.texFactors} }{ ${this._denominator.texFactors} }`;
    }
}
exports.Rational = Rational;


/***/ }),

/***/ 506:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Fraction = void 0;
const numeric_1 = __webpack_require__(956);
/**
 * The fraction class make possible to handle
 * TODO: Write the documentation correctly.
 * \\(\frac{a}{b}\\) or \\[\frac{a}{b}\\]  values.
 */
class Fraction {
    constructor(value, denominatorOrPeriodic) {
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        /**
         * Parse the value to get the numerator and denominator
         * @param value : number or string to parse to get the fraction
         * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
         */
        this.parse = (value, denominatorOrPeriodic) => {
            let S;
            // A null value means a zero fraction.
            if (value === null || value === "") {
                this._numerator = 0;
                this._denominator = 1;
                return this;
            }
            switch (typeof value) {
                case "string":
                    // Split the sting value in two parts: Numerator/Denominator
                    S = value.split('/');
                    // Security checks
                    if (S.length > 2)
                        throw "Two many divide signs";
                    if (S.map(x => x === '' || isNaN(Number(x))).includes(true))
                        throw "Not a number";
                    if (S.length === 1) {
                        // No divide sign
                        return this.parse(+S[0]);
                    }
                    else if (S.length === 2) {
                        // One divide signe
                        // We check if the denominator is zero
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
                        // More than one divide sign ?
                        this._numerator = NaN;
                        this._denominator = 1;
                    }
                    break;
                case "number":
                    if (Number.isSafeInteger(value)) {
                        // The given value is an integer
                        this._numerator = +value;
                        if (denominatorOrPeriodic === undefined || !Number.isSafeInteger(denominatorOrPeriodic)) {
                            this._denominator = 1;
                        }
                        else {
                            this._denominator = +denominatorOrPeriodic;
                        }
                    }
                    else {
                        // The given value is a float number
                        // Get the number of decimals after the float sign
                        let p = (value.toString()).split('.')[1].length;
                        // Transform the float number in two integer
                        if (denominatorOrPeriodic === undefined) {
                            this._numerator = value * Math.pow(10, p);
                            this._denominator = Math.pow(10, p);
                        }
                        else if (Number.isSafeInteger(denominatorOrPeriodic)) {
                            this._numerator = value * Math.pow(10, p) - Math.floor(value * Math.pow(10, p - denominatorOrPeriodic));
                            this.denominator = Math.pow(10, p) - Math.pow(10, p - denominatorOrPeriodic);
                        }
                        this.reduce();
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
        this.clone = () => {
            let F = new Fraction();
            F.numerator = +this._numerator;
            F.denominator = +this._denominator;
            return F;
        };
        this.zero = () => {
            this._numerator = 0;
            this._denominator = 1;
            return this;
        };
        this.one = () => {
            this._numerator = 1;
            this._denominator = 1;
            return this;
        };
        this.infinite = () => {
            this._numerator = Infinity;
            this._denominator = 1;
            return this;
        };
        this.invalid = () => {
            this._numerator = NaN;
            this._denominator = 1;
            return this;
        };
        // ------------------------------------------
        // Mathematical operations
        // ------------------------------------------
        this.opposed = () => {
            this._numerator = -this._numerator;
            return this;
        };
        this.add = (F) => {
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
        this.subtract = (F) => {
            if (F instanceof Fraction) {
                return this.add(F.clone().opposed());
            }
            else {
                return this.add(-F);
            }
        };
        this.multiply = (F) => {
            // Parse the value.
            // If it's a fraction, return a clone of it
            // If it's an integer, return the fraction F/1
            let Q = new Fraction(F);
            this._numerator = this._numerator * Q.numerator;
            this._denominator = this._denominator * Q.denominator;
            return this.reduce();
        };
        this.divide = (F) => {
            let Q = new Fraction(F);
            if (Q.numerator === 0) {
                return new Fraction().infinite();
            }
            let N = +this._numerator, D = +this._denominator;
            this._numerator = N * Q.denominator;
            this._denominator = D * Q.numerator;
            return this.reduce();
        };
        this.invert = () => {
            let n = +this._numerator, d = +this._denominator;
            this._numerator = d;
            this._denominator = n;
            return this;
        };
        this.pow = (p) => {
            // TODO: Fraction.pow with a value different than a safe integer !
            if (p instanceof Fraction) {
                return this.pow(p.value);
            }
            this.reduce();
            if (p < 0) {
                this.invert();
            }
            // Check if numerator and denominator are roots of...
            // othervise, convert to numeric.
            let controlNumerator = Math.floor(Math.pow(this._numerator, Math.abs(p))), controlDenominator = Math.floor(Math.pow(this._denominator, Math.abs(p)));
            if (controlNumerator ** Math.abs(p) === this._numerator
                &&
                    controlDenominator ** Math.abs(p) === this._denominator) {
                this._numerator = this._numerator ** Math.abs(p);
                this._denominator = this._denominator ** Math.abs(p);
            }
            else {
                this._numerator = this._numerator ** Math.abs(p);
                this._denominator = this._denominator ** Math.abs(p);
            }
            return this;
        };
        this.root = (p) => {
            // TODO: nth - root of a fraction => this will return another type of coefficient.
            // Check if they are perfect roots..
            if (p === 0) {
                return this;
            }
            // If negative, invert the fraction
            if (p < 0) {
                this.invert();
            }
            let n = Math.pow(this._numerator, Math.abs(1 / p)), d = Math.pow(this._denominator, Math.abs(1 / p));
            this._numerator = Math.pow(this._numerator, Math.abs(1 / p));
            this._denominator = Math.pow(this._denominator, Math.abs(1 / p));
            return this;
        };
        this.sqrt = () => {
            return this.root(2);
        };
        this.abs = () => {
            this._numerator = Math.abs(this._numerator);
            this._denominator = Math.abs(this._denominator);
            return this;
        };
        // ------------------------------------------
        // Mathematical operations specific to fractions
        // ------------------------------------------
        this.reduce = () => {
            let g = numeric_1.Numeric.gcd(this._numerator, this._denominator);
            this._numerator = this._numerator / g;
            this._denominator = this._denominator / g;
            if (this._denominator < 0) {
                this._denominator = -this._denominator;
                this._numerator = -this._numerator;
            }
            return this;
        };
        this.amplify = (k) => {
            if (Number.isSafeInteger(k)) {
                this._numerator *= k;
                this._denominator *= k;
            }
            return this;
        };
        // ------------------------------------------
        // Compare functions
        // ------------------------------------------
        /**
         * Compare the current coefficient with another coefficient
         * @param F (Coefficient) The coefficient to compare
         * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
         */
        this.compare = (F, sign) => {
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
                    // let F2: Fraction = compareFraction.clone().reduce(),
                    //     F1: Fraction = this.clone().reduce();
                    // return (F1.numerator === F2.numerator && F1.denominator === F2.denominator);
                    return this.value === compareFraction.value;
                case "<>":
                    return this.value !== compareFraction.value;
                default:
                    return false;
            }
        };
        /* Compare shortcuts */
        this.lesser = (than) => {
            return this.compare(than, '<');
        };
        this.leq = (than) => {
            return this.compare(than, '<=');
        };
        this.greater = (than) => {
            return this.compare(than, '>');
        };
        this.geq = (than) => {
            return this.compare(than, '>=');
        };
        this.isEqual = (than) => {
            return this.compare(than, '=');
        };
        this.isNotEqual = (than) => {
            return this.compare(than, '<>');
        };
        this.isOpposed = (p) => {
            return this.isEqual(p.clone().opposed());
        };
        this.isInverted = (p) => {
            return this.isEqual(new Fraction().one().divide(p.clone()));
        };
        this.isZero = () => {
            return this._numerator === 0;
        };
        this.isNotZero = () => {
            return this._numerator !== 0;
        };
        this.isOne = () => {
            return this._numerator === 1 && this._denominator === 1;
        };
        this.isNegativeOne = () => {
            return this._numerator === -1 && this._denominator === 1;
        };
        this.isPositive = () => {
            return this.sign() === 1;
        };
        this.isNegative = () => {
            return this.sign() === -1;
        };
        this.isStrictlyPositive = () => {
            return this.value > 0;
        };
        this.isStrictlyNegative = () => {
            return this.value < 0;
        };
        this.isNaN = () => {
            return isNaN(this._numerator);
        };
        this.isInfinity = () => {
            return Math.abs(this._numerator) === Infinity;
        };
        this.isFinite = () => {
            return !this.isInfinity() && !this.isNaN();
        };
        this.isSquare = () => {
            return Math.sqrt(this._numerator) % 1 === 0 && Math.sqrt(this._denominator) % 1 === 0;
        };
        this.isReduced = () => {
            return Math.abs(numeric_1.Numeric.gcd(this._numerator, this._denominator)) === 1;
        };
        this.isNatural = () => {
            return this.isRelative() && this.isPositive();
        };
        this.isRelative = () => {
            return this.clone().reduce().denominator === 1;
        };
        this.isRational = () => {
            return !this.isRelative();
        };
        this.isEven = () => {
            return this.isRelative() && this.value % 2 === 0;
        };
        this.isOdd = () => {
            return this.isRelative() && this.value % 2 === 1;
        };
        this.sign = () => {
            return (this._numerator * this._denominator >= 0) ? 1 : -1;
        };
        // TODO: The rest of the functions are not used or unnecessary ?
        /**
         * Simple function to determine if it's a fraction
         */
        this.areEquals = (...F) => {
            for (let i = 0; i < F.length; i++) {
                if (!this.isEqual(F[i])) {
                    return false;
                }
            }
            return true;
        };
        this._numerator = 1;
        this._denominator = 1;
        if (value !== undefined) {
            this.parse(value, denominatorOrPeriodic);
        }
        return this;
    }
    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
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
    // Display getter
    get tex() {
        if (this.isInfinity()) {
            return `${this.sign() === 1 ? '+' : '-'}\\infty`;
        }
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
    // Helper function to display fractions
    get frac() {
        return this.tex;
    }
    get dfrac() {
        return this.tex.replace('\\frac', '\\dfrac');
    }
    get tfrac() {
        return this.tex.replace('\\frac', '\\tfrac');
    }
}
exports.Fraction = Fraction;
Fraction.max = (...fractions) => {
    let M = new Fraction(fractions[0]);
    for (let m of fractions) {
        let compare = new Fraction(m);
        if (compare.greater(M)) {
            M = compare.clone();
        }
    }
    return M;
};
Fraction.min = (...fractions) => {
    let M = new Fraction(fractions[0]);
    for (let m of fractions) {
        let compare = new Fraction(m);
        if (compare.lesser(M)) {
            M = compare.clone();
        }
    }
    return M;
};
Fraction.average = (...fractions) => {
    let M = new Fraction().zero();
    for (let f of fractions) {
        M.add(f);
    }
    M.divide(fractions.length);
    return M;
};
Fraction.unique = (fractions, sorted) => {
    // TODO: make sure it's wokring -> test !
    let unique = {}, distinct = [];
    fractions.forEach(x => {
        if (!unique[x.clone().reduce().tex]) {
            distinct.push(x.clone());
            unique[x.tex] = true;
        }
    });
    if (sorted) {
        return Fraction.sort(distinct);
    }
    else {
        return distinct;
    }
};
Fraction.sort = (fractions, reverse) => {
    // Todo make sure it's the correct order, not reverse -> make a test
    let sorted = fractions.sort((a, b) => a.value - b.value);
    if (reverse) {
        sorted.reverse();
    }
    return sorted;
};


/***/ }),

/***/ 872:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NthRoot = void 0;
/**
 * NthRoot is something like "a+b\sqrt{3}
 */
class NthRoot {
    constructor(...values) {
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        this.parse = (radical, nthroot, coefficient) => {
            this._coefficient = (coefficient === undefined) ? 1 : coefficient;
            this._nth = (nthroot === undefined) ? 2 : nthroot;
            this._radical = (radical === undefined) ? 1 : radical;
            if (this._nth % 2 === 0 && this._radical < 0) {
                this._isValid = false;
            }
            return this;
        };
        // ------------------------------------------
        // Mathematical operations
        // ------------------------------------------
        this.reduce = () => {
            // Max value to test.
            let V = Math.floor(Math.pow(this._radical, 1 / this._nth));
            while (V > 1) {
                if (this._radical % Math.pow(V, this._nth) === 0) {
                    // It's dividable by V^n
                    this._coefficient *= V;
                    this._radical = this._radical / Math.pow(V, this._nth);
                    // Redifine the new testing value (this is optimization)
                    V = Math.floor(Math.pow(this._radical, 1 / this._nth));
                    continue;
                }
                V--;
            }
            return this;
        };
        this.multiply = (N) => {
            this._radical *= N.radical;
            return this.reduce();
        };
        // ------------------------------------------
        // Help functions
        // ------------------------------------------
        this.hasRadical = () => {
            return !(this._radical === 1 || this._radical === 0 || this._isValid === false);
        };
        this._radical = 1;
        this._coefficient = 1;
        this._nth = 2;
        this._isValid = true;
        if (values !== undefined) {
            this.parse(values[0], values[1], values[2]);
        }
    }
    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
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
            // Error setting the nth root.
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
}
exports.NthRoot = NthRoot;


/***/ }),

/***/ 735:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumExp = void 0;
const shutingyard_1 = __webpack_require__(505);
const fraction_1 = __webpack_require__(506);
class NumExp {
    constructor(value) {
        this._expression = value;
        this._rpn = new shutingyard_1.Shutingyard(shutingyard_1.ShutingyardMode.NUMERIC).parse(value).rpn;
    }
    get rpn() {
        return this._rpn;
    }
    get isValid() {
        if (this._isValid === undefined) {
            this.evaluate({ x: 0 });
        }
        return this._isValid;
    }
    set isValid(value) {
        this._isValid = value;
    }
    get expression() {
        return this._expression;
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
        // Must modify the number if it's like:
        // a: 3.0000000000000003
        // b: 3.9999999999999994
        // remove the last character
        // check if around n last characters are either 0 or 9
        // if it is, 'round' the number.
        const epsilon = 0.00000000000001, number_of_digits = 6;
        const decimal = this._extractDecimalPart(value);
        if (decimal === '') {
            return value;
        }
        const n9 = decimal.match(/9+$/g);
        const n0 = decimal.match(/0+$/g);
        if (n9 && n9[0].length >= number_of_digits) {
            // New tested values.
            const mod = this._extractDecimalPart(value + epsilon), mod0 = mod.match(/0+$/g);
            if (mod0 && mod0[0].length >= number_of_digits) {
                // The value can be changed. Remove all zeros!
                return +((value + epsilon).toString().split(mod0[0])[0]);
            }
        }
        if (n0 && n0[0].length >= number_of_digits) {
            // New tested values.
            const mod = this._extractDecimalPart(value - epsilon), mod9 = mod.match(/9+$/g);
            if (mod9 && mod9[0].length >= number_of_digits) {
                // The value can be changed. Remove all nines!
                return +(value.toString().split(n0[0])[0]);
            }
        }
        return value;
    }
    _addToStack(stack, value) {
        stack.push(this._numberCorrection(value));
    }
    evaluate(values) {
        const stack = [];
        this.isValid = true;
        for (const element of this._rpn) {
            if (element.tokenType === shutingyard_1.ShutingyardType.COEFFICIENT) {
                // May be a numeric value or a Fraction.
                if (!isNaN(+element.token)) {
                    this._addToStack(stack, +element.token);
                }
                else {
                    this._addToStack(stack, new fraction_1.Fraction(element.token).value);
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
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, a * b);
                }
                else if (element.token === '/') {
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, a / b);
                }
                else if (element.token === '+') {
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, (+a) + (+b));
                }
                else if (element.token === '-') {
                    const b = stack.pop(), a = stack.pop() || 0;
                    if (b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, a - b);
                }
                else if (element.token === '^') {
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, Math.pow(a, b));
                }
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.FUNCTION) {
                const a = stack.pop();
                if (a === undefined) {
                    this.isValid = false;
                }
                if (element.token === 'sin') {
                    this._addToStack(stack, Math.sin(a));
                }
                else if (element.token === 'cos') {
                    this._addToStack(stack, Math.cos(a));
                }
                else if (element.token === 'tan') {
                    this._addToStack(stack, Math.tan(a));
                }
                else if (element.token === 'sqrt') {
                    this._addToStack(stack, Math.sqrt(a));
                }
            }
        }
        if (stack.length === 1) {
            return stack[0];
        }
        else {
            throw `There was a problem parsing: ${this._expression}`;
        }
    }
}
exports.NumExp = NumExp;


/***/ }),

/***/ 75:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PolynomExpProduct = exports.PolynomExpFactor = void 0;
const polynom_1 = __webpack_require__(38);
const fraction_1 = __webpack_require__(506);
class PolynomExpFactor {
    constructor(polynom, degree, mathFunction) {
        this._polynom = new polynom_1.Polynom(polynom);
        this._degree = new fraction_1.Fraction(degree === undefined ? 1 : degree);
        this._fn = mathFunction;
        this._powerAsInteger = true;
        this._forceParenthesis = true;
    }
    get forceParenthesis() {
        return this._forceParenthesis;
    }
    set forceParenthesis(value) {
        this._forceParenthesis = value;
    }
    get fn() {
        return this._fn;
    }
    set fn(value) {
        this._fn = value;
    }
    get powerAsInteger() {
        return this._powerAsInteger;
    }
    set powerAsInteger(value) {
        this._powerAsInteger = value;
    }
    get polynom() {
        return this._polynom;
    }
    set polynom(value) {
        this._polynom = value;
    }
    get degree() {
        return this._degree;
    }
    set degree(value) {
        this._degree = value;
    }
    get tex() {
        let tex;
        if (this._degree.isOne() && (this._fn !== undefined || !this._forceParenthesis)) {
            // If degree is one, no need to add the parenthesis.
            tex = this._polynom.tex;
        }
        else {
            // the degree is not one, add the parenthesis.
            if (this._powerAsInteger && !this._degree.isRelative()) {
                // the degree is a fraction and we want natural powers => use sqrt.
                tex = `\\sqrt${this._degree.denominator !== 2 ? `[ ${this._degree.denominator} ]` : ''}{ ${this._polynom.tex} }^{ ${this._degree.numerator} }`;
            }
            else if (this.isCoefficient && this.firstCoefficient.isNatural()) {
                // the value is a natural number (eg 3, 7, ...)
                tex = this._polynom.tex + this._texDegree;
            }
            else {
                // In any other case, add the parenthesis by default
                tex = `\\left( ${this._polynom.tex} \\right)${this._texDegree}`;
            }
        }
        if (this._fn !== undefined && this._fn.tex !== undefined) {
            tex = `${this._fn.tex}\\left( ${tex} \\right)`;
        }
        return tex;
    }
    get isCoefficient() {
        // TODO: Maybe reduce the coefficient if it isn't of degree one.
        return this._polynom.degree().isZero();
    }
    get firstCoefficient() {
        return this._polynom.monomByDegree().coefficient;
    }
    get _texDegree() {
        if (this._degree.isOne()) {
            return '';
        }
        else {
            return `^{ ${this._degree.tfrac} }`;
        }
    }
    setForceParenthesis(value) {
        this._forceParenthesis = value === undefined || value;
        return this;
    }
    derivative(letter) {
        if (this._degree.isOne()) {
            return new PolynomExpProduct(new PolynomExpFactor(this._polynom.clone().derivative(letter)));
        }
        else {
            return new PolynomExpProduct(new PolynomExpFactor(this._degree.clone()), new PolynomExpFactor(this._polynom.clone().derivative(letter)), new PolynomExpFactor(this._polynom.clone(), this._degree.clone().subtract(1)));
        }
    }
}
exports.PolynomExpFactor = PolynomExpFactor;
class PolynomExpProduct {
    constructor(...values) {
        this._factors = values || [];
        this._positive = true;
        this._asPositiveDegree = true;
    }
    get fn() {
        return this._fn;
    }
    set fn(value) {
        this._fn = value;
    }
    get factors() {
        return this._factors;
    }
    set factors(value) {
        this._factors = value;
    }
    get positive() {
        return this._positive;
    }
    set positive(value) {
        this._positive = value;
    }
    get asPositiveDegree() {
        return this._asPositiveDegree;
    }
    set asPositiveDegree(value) {
        this._asPositiveDegree = value;
    }
    get tex() {
        let parenthesis = this._factors.length > 1;
        // Default value
        let tex = this._factors.map(factor => factor.setForceParenthesis(parenthesis).tex).join(' \\cdot ');
        // Change the value in some cases...
        if (this._asPositiveDegree) {
            const numerators = this._factors.filter(x => x.degree.isPositive()), denominators = this._factors.filter(x => x.degree.isNegative());
            let numeratorsAsTex, denominatorsAsTex;
            if (denominators.length > 0) {
                if (numerators.length === 0) {
                    numeratorsAsTex = [1];
                }
                else if (numerators.length === 1) {
                    numeratorsAsTex = [numerators[0].setForceParenthesis(false).tex];
                }
                else {
                    parenthesis = numerators.length > 1;
                    numeratorsAsTex = numerators.map(factor => factor.setForceParenthesis(parenthesis).tex);
                }
                // Change all denominators degrees to positive.
                denominators.map(x => x.degree.opposed());
                if (denominators.length === 1) {
                    denominatorsAsTex = [denominators[0].setForceParenthesis(false).tex];
                }
                else {
                    parenthesis = denominators.length > 1;
                    denominatorsAsTex = denominators.map(factor => factor.setForceParenthesis(parenthesis).tex);
                }
                // restore all degrees to negative again.
                denominators.map(x => x.degree.opposed());
                tex = `\\frac{ ${numeratorsAsTex.join(' \\cdot ')} }{ ${denominatorsAsTex.join(' \\cdot ')} }`;
            }
        }
        // Apply the modification
        if (this._fn !== undefined && this._fn.name !== undefined && this._fn.name !== '') {
            tex = `${this._fn.tex}\\left( ${tex} \\right)`;
        }
        return tex;
    }
    reduce() {
        let coefficients = this._factors.filter(factor => factor.isCoefficient), polynoms = this._factors.filter(factor => !factor.isCoefficient);
        let result = new fraction_1.Fraction().one();
        if (coefficients.length > 1) {
            for (const factor of coefficients) {
                if (factor.degree.isPositive()) {
                    result.multiply(factor.polynom.monoms[0].coefficient.pow(factor.degree));
                }
                else {
                    result.divide(factor.polynom.monoms[0].coefficient.pow(factor.degree.clone().abs()));
                }
            }
        }
        else if (coefficients.length === 1) {
            result = coefficients[0].polynom.monoms[0].coefficient;
        }
        if (result.isOne()) {
            this._factors = [...polynoms];
        }
        else if (!result.isRelative()) {
            this._factors = [
                new PolynomExpFactor(result.numerator),
                new PolynomExpFactor(result.denominator, -1),
                ...polynoms
            ];
        }
        else {
            this._factors = [
                new PolynomExpFactor(result),
                ...polynoms
            ];
        }
        return this;
    }
    integrate(letter) {
        // Handle this kind of case:
        // A * f' * F^n
        // A * f' / F^n, n != 1
        // A * f_1 * f_2 * f_3, where (f_1 * f_2)' = f_3
        if (this._factors.length === 2) {
            // Check polynoms degree: one must of one degree less than the other.
            let d1 = this._factors[0].polynom.degree(letter).value, d2 = this._factors[1].polynom.degree(letter).value;
            if (d1 === d2 + 1) {
                return this._integrateWithInternalDerivative(this._factors[0], this._factors[1], letter);
            }
            else if (d1 + 1 === d2) {
                return this._integrateWithInternalDerivative(this._factors[1], this._factors[0], letter);
            }
        }
        return;
    }
    applyMathFunction(mathFn) {
        this._fn = mathFn;
        return this;
    }
    _integrateWithInternalDerivative(P, Pinternal, letter) {
        // Get the internal derivative
        let internalDerivative = P.polynom.clone().derivative(letter);
        // Get the factor.
        let { quotient, reminder } = Pinternal.polynom.clone().euclidian(internalDerivative);
        if (reminder.isZero() && quotient.degree(letter).isZero()) {
            // All the conditions are done. Actual situation is
            // (4x-10)(x^2-5x+7)^9
            // P1 = (x^2-5x+7), P2 = (2x-5)
            // => 1/10 * quotient * (x^2-5x+7)^10
            if (P.degree.isEqual(-1)) {
                return (new PolynomExpProduct(new PolynomExpFactor(quotient, 1), new PolynomExpFactor(P.polynom.clone(), 1, {
                    name: 'ln', tex: '\\ln', fn: (x) => Math.log(x)
                })));
            }
            else {
                return new PolynomExpProduct(new PolynomExpFactor(P.degree.clone().add(1).invert(), 1), new PolynomExpFactor(quotient, 1), new PolynomExpFactor(P.polynom.clone(), P.degree.clone().add(1)));
            }
        }
        return;
    }
}
exports.PolynomExpProduct = PolynomExpProduct;


/***/ }),

/***/ 699:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Circle = void 0;
const point_1 = __webpack_require__(557);
const line_1 = __webpack_require__(9);
const vector_1 = __webpack_require__(586);
const triangle_1 = __webpack_require__(164);
const numeric_1 = __webpack_require__(956);
const fraction_1 = __webpack_require__(506);
const equation_1 = __webpack_require__(760);
const polynom_1 = __webpack_require__(38);
class Circle {
    constructor(...values) {
        /**
         * Get the relative position between circle and line. It corresponds to the number of intersection.
         * @param {Line} L
         * @returns {number}
         */
        this.relativePosition = (L) => {
            let distance = L.distanceTo(this.center), radius = Math.sqrt(this._squareRadius.value);
            if (distance.value - radius > 0.0000000001) {
                return 0; // external
            }
            else if (Math.abs(distance.value - radius) < 0.0000000001) {
                return 1; // tangent
            }
            else {
                return 2; // external
            }
        };
        this.lineIntersection = (L) => {
            let intersectionPoints = [], solX;
            if (this._cartesian === null) {
                return [];
            }
            const equX = this._cartesian.clone(), lineX = L.equation.clone().isolate('x'), lineY = L.equation.clone().isolate('y');
            if (lineX instanceof equation_1.Equation && lineY instanceof equation_1.Equation) {
                equX.replaceBy('y', lineY.right).simplify();
                equX.solve();
                for (let x of equX.solutions) {
                    if (x.exact === false && isNaN(x.value)) {
                        continue;
                    }
                    solX = new fraction_1.Fraction(x.exact === false ? x.value : x.exact);
                    intersectionPoints.push(new point_1.Point(solX.clone(), lineY.right.evaluate(solX)));
                }
            }
            return intersectionPoints;
        };
        this.tangents = (P) => {
            if (P instanceof fraction_1.Fraction) {
                return this._tangentsWithSlope(P);
            }
            else if (this.isPointOnCircle(P)) {
                return this._tangentsThroughOnePointOnTheCircle(P);
            }
            else if (this.center.distanceTo(P).value > this.radius.value) {
                //TODO:  Must check it's outside the circle
                return this._tangentsThroughOnePointOutsideTheCircle(P);
            }
            else {
                console.log('No tangents as the point is inside !');
            }
            return [];
        };
        this.isPointOnCircle = (P) => {
            return this._cartesian.test({ x: P.x, y: P.y });
        };
        this.getPointsOnCircle = (numberIsInteger) => {
            if (numberIsInteger === undefined) {
                numberIsInteger = false;
            }
            // It means searching for pythagorician triples that make a perfect square.
            // (x-4)^2 + (y+3)^2 = 15
            let triplets = numeric_1.Numeric.pythagoricianTripletsWithTarget(this._squareRadius.value, true);
            let points = [], pt;
            triplets.forEach(triplet => {
                // Allow positive / negative values
                // x-a = t  => x = a + t
                // x-a = -t => x = a - t
                for (let k of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
                    pt = new point_1.Point(this.center.x.clone().add(k[0] * triplet[0]), this.center.y.clone().add(k[1] * triplet[1]));
                    // Check if the point is not already in points.
                    if (!pt.isInListOfPoints(points)) {
                        points.push(pt);
                    }
                }
            });
            return points;
        };
        this._tangentsThroughOnePointOnTheCircle = (P) => {
            let CT = new vector_1.Vector(this._center, P);
            return [new line_1.Line(P, CT, line_1.LinePropriety.Perpendicular)];
        };
        this._tangentsThroughOnePointOutsideTheCircle = (P) => {
            // y = mx + h
            // px, py => h = -m px + py => mx - y -m.px + py = 0 =>
            // Centre: cx, cy, radius: r
            // (m.cx - cy -m.px + py)^2 = r^2  * (m^2  + 1)
            // (m(cx-py) - (cy - py))^2 = r^2  * (m^2  + 1)
            let cx_px = this.center.x.clone().subtract(P.x), cy_py = this.center.y.clone().subtract(P.y), polyLeft = new polynom_1.Polynom('x'), polyRight = new polynom_1.Polynom('x^2+1');
            polyLeft.multiply(cx_px).subtract(cy_py).pow(2);
            polyRight.multiply(this.squareRadius);
            let equ = new equation_1.Equation(polyLeft, polyRight);
            equ.moveLeft().simplify().solve();
            return equ.solutions.map(sol => {
                //  h = -m px + py
                let h, equ = new equation_1.Equation('y', 'x');
                if (sol.exact instanceof fraction_1.Fraction) {
                    h = P.x.clone().opposed().multiply(sol.exact).add(P.y);
                    equ.right.multiply(sol.exact).add(h);
                }
                else {
                    h = P.x.clone().opposed().multiply(sol.value).add(P.y);
                    equ.right.multiply(sol.value).add(h);
                }
                return new line_1.Line(equ);
            });
        };
        this._tangentsWithSlope = (slope) => {
            // d(C;t)=r => ac1+bc2 + x = +- sqrt(a^2 + b^2)*r
            // x = -ac1-bc2  +-  sqrt(a^2 + b^2)*r
            // y = a/bx + h => ax-by + H = 0
            const a = slope.numerator, b = -slope.denominator, c1 = this._center.x.clone(), c2 = this._center.y.clone(), r = this._squareRadius;
            let sq = this._squareRadius.clone().multiply(slope.numerator ** 2 + slope.denominator ** 2), x1 = c1.clone().multiply(a).opposed().subtract(c2.clone().multiply(b)).add(sq.clone().sqrt()), x2 = c1.clone().multiply(a).opposed().subtract(c2.clone().multiply(b)).subtract(sq.clone().sqrt());
            return [new line_1.Line(a, b, x1), new line_1.Line(a, b, x2)];
        };
        this._exists = false;
        if (values !== undefined) {
            this.parse(...values);
        }
    }
    get center() {
        return this._center;
    }
    get squareRadius() {
        return this._squareRadius;
    }
    get cartesian() {
        return this._cartesian;
    }
    get exists() {
        return this._exists;
    }
    get radius() {
        if (this._squareRadius.isSquare()) {
            return {
                tex: this._squareRadius.clone().sqrt().tex,
                display: this._squareRadius.clone().sqrt().display,
                value: this._squareRadius.clone().sqrt().value
            };
        }
        else {
            return {
                tex: `\\sqrt{${this._squareRadius.tex}}`,
                display: `sqrt(${this._squareRadius.display})`,
                value: this._squareRadius.clone().sqrt().value
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
    // TODO: reformat code for better display.
    get display() {
        return this._cartesian.display;
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
        // Data can be given in these formats:
        // one value, a string -> make it an Equation
        // one value, an Equation
        // one value, a circle -> clone it
        // two values: two points (center and pointThrough)
        // two values: point and Fraction (center and radius)
        // three values: Point, Fraction, Boolean (center, square radius, true)
        this._reset();
        if (typeof values[0] === 'string') {
            this._parseEquation(new equation_1.Equation(values[0]));
        }
        else if (values[0] instanceof equation_1.Equation) {
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
            else if (values[1] instanceof fraction_1.Fraction || typeof values[1] === 'number') {
                this._parseCenterAndRadius(values[0], values[1], (typeof values[2] === "boolean") ? values[2] : false);
            }
        }
        // Calculate once the different values.
        if (this._exists) {
            this._calculateCartesian();
            // If the square radius is zero or positive, the circle exists.
            if (this._squareRadius !== undefined && this._squareRadius.isNegative()) {
                this._exists = false;
            }
        }
        return this;
    }
    _calculateCartesian() {
        this._cartesian = (new equation_1.Equation(new polynom_1.Polynom(`(x-(${this._center.x.display}))^2+(y-(${this._center.y.display}))^2`), new polynom_1.Polynom(`${this._squareRadius.display}`))).moveLeft();
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
            this._squareRadius = (new fraction_1.Fraction(radius));
        }
        else {
            this._squareRadius = new fraction_1.Fraction(radius).pow(2);
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
        // Move everything to the left.
        equ.moveLeft();
        if (equ.degree('x').value === 2 && equ.degree('y').value === 2) {
            // Both must be of degree 2.
            let x2 = equ.left.monomByDegree(2, 'x'), y2 = equ.left.monomByDegree(2, 'y'), x1, y1, c;
            // Both square monoms must have the same coefficient.
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
                // The circle is not a valid circle
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
}
exports.Circle = Circle;


/***/ }),

/***/ 9:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * This class works for 2d line in a plane.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Line = exports.LinePropriety = void 0;
const vector_1 = __webpack_require__(586);
const point_1 = __webpack_require__(557);
const numeric_1 = __webpack_require__(956);
const fraction_1 = __webpack_require__(506);
const equation_1 = __webpack_require__(760);
const polynom_1 = __webpack_require__(38);
var LinePropriety;
(function (LinePropriety) {
    LinePropriety[LinePropriety["None"] = 0] = "None";
    LinePropriety["Parallel"] = "parallel";
    LinePropriety["Perpendicular"] = "perpendicular";
    LinePropriety["Tangent"] = "tangent";
})(LinePropriety = exports.LinePropriety || (exports.LinePropriety = {}));
class Line {
    constructor(...values) {
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        /**
         * Parse data to a line
         * @param {any} values
         * @returns {Line}
         */
        this.parse = (...values) => {
            this._exists = false;
            // Nothing is given...
            if (values.length === 0) {
                return this;
            }
            // One value only: already a line (clone it), an Equation, a string (as Equation)
            if (values.length === 1) {
                if (values[0] instanceof Line) {
                    // Already a Line
                    return values[0].clone();
                }
                else if (values[0] instanceof equation_1.Equation) {
                    // It's an Equation
                    return this.parseEquation(values[0]);
                }
                else if (typeof values[0] === "string") {
                    // It's a string - create an Equation from it.
                    try {
                        let E = new equation_1.Equation(values[0]);
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
                if ((values[0] instanceof fraction_1.Fraction || typeof values[0] === 'number')
                    &&
                        (values[1] instanceof fraction_1.Fraction || typeof values[1] === 'number')
                    &&
                        (values[2] instanceof fraction_1.Fraction || typeof values[2] === 'number')) {
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
                else if (values[0] instanceof point_1.Point && values[1] instanceof Line) {
                    if (values[2] === LinePropriety.Parallel || values[2] === null) {
                        return this.parseByPointAndLine(values[0], values[1], LinePropriety.Parallel);
                    }
                    else {
                        return this.parseByPointAndLine(values[0], values[1], LinePropriety.Perpendicular);
                    }
                }
            }
            // TODO: Add the ability to create line from a normal vector
            console.log('Someting wrong happend while creating the line');
            return this;
        };
        this.parseEquation = (equ) => {
            // Reorder the eequation
            equ.reorder(true);
            // It must contain either x, y or both.
            let letters = new Set(equ.letters());
            // No 'x', no 'y' in the equations
            if (!(letters.has('x') || letters.has('y'))) {
                return this;
            }
            // Another letter in the equation ?
            for (let elem of ['x', 'y']) {
                if (letters.has(elem)) {
                    letters.delete(elem);
                }
            }
            if (letters.size > 0) {
                return this;
            }
            // Everything should be ok now...
            return this.parseByCoefficient(equ.left.monomByLetter('x').coefficient, equ.left.monomByLetter('y').coefficient, equ.left.monomByDegree(0).coefficient);
        };
        this.parseByCoefficient = (a, b, c) => {
            this._a = new fraction_1.Fraction(a);
            this._b = new fraction_1.Fraction(b);
            this._c = new fraction_1.Fraction(c);
            this._d = new vector_1.Vector(this._b.clone(), this._a.clone().opposed());
            this._OA = new point_1.Point(new fraction_1.Fraction().zero(), this._c.clone());
            this._n = this._d.clone().normal();
            this._exists = true;
            return this;
        };
        this.parseByPointAndVector = (P, d) => {
            // OX = OP + k*d
            // x = px + kdx     * dy
            // y = py + kdy     * dx
            // ------------------
            // dy * x = px * dy + kdxdy
            // dx * y = py * dx + kdxdy
            // ------------------
            // dy * x - dx * y = px * dy - py * dx
            // dy * x - dx * y - (px * dy - py * dx) = 0
            this.parseByCoefficient(d.y, d.x.clone().opposed(), P.x.clone().multiply(d.y).subtract(P.y.clone().multiply(d.x)).opposed());
            // Choose the current values as point and direction vector instead of the automatic version.
            this._OA = P.clone();
            this._d = d.clone();
            this._n = this._d.clone().normal();
            this._exists = true;
            return this;
        };
        this.parseByPointAndNormal = (P, n) => {
            return this.parseByCoefficient(n.x, n.y, P.x.clone().multiply(n.x)
                .add(P.y.clone().multiply(n.y)).opposed());
        };
        this.parseByPointAndLine = (P, L, orientation) => {
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
        this.clone = () => {
            this._a = this._a.clone();
            this._b = this._b.clone();
            this._c = this._c.clone();
            this._d = this._d.clone();
            this._OA = this._OA.clone();
            this._n = this._n.clone();
            this._exists = this.exists;
            return this;
        };
        // ------------------------------------------
        // Mathematical operations
        // ------------------------------------------
        this.isParellelTo = (line) => {
            // Do they have the isSame direction ?
            return this.slope.isEqual(line.slope) && this.height.isNotEqual(line.height);
        };
        this.isSameAs = (line) => {
            return this.slope.isEqual(line.slope) && this.height.isEqual(line.height);
        };
        this.isVertical = () => {
            return this.slope.isInfinity();
        };
        this.simplify = () => {
            let lcm = numeric_1.Numeric.lcm(this._a.denominator, this._b.denominator, this._c.denominator), gcd = numeric_1.Numeric.gcd(this._a.numerator, this._b.numerator, this._c.numerator);
            this.parseByCoefficient(this._a.clone().multiply(lcm).divide(gcd), this._b.clone().multiply(lcm).divide(gcd), this._c.clone().multiply(lcm).divide(gcd));
            return this;
        };
        this.simplifyDirection = () => {
            let lcm = numeric_1.Numeric.lcm(this._d.x.denominator, this._d.y.denominator), gcd = numeric_1.Numeric.gcd(this._d.x.numerator, this._d.y.numerator);
            this._d.x.multiply(lcm).divide(gcd);
            this._d.y.multiply(lcm).divide(gcd);
            return this;
        };
        this.intersection = (line) => {
            let Pt = new point_1.Point(), isParallel = false, isSame = false, hasIntersection = true;
            // this         => ax+by+c = 0
            // line         => dx+ey+f = 0
            //
            //  aex + bey + ce = 0
            //  dbx + bey + bf = 0
            // (ae-db)x + ce-bf = 0
            //
            //  adx + bdy + cd = 0
            //  adx + aey + af = 0
            // (bd-ae)y + (cd-af)
            //
            // x = (bf-ce)/(ae-db)
            // y = (af-cd)/(bd-ae)
            // Theres is no 'y'
            if (this._b.isZero() || line.b.isZero()) {
                // TODO : handle no y in the line canonical form
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
        this.getValueAtX = (value) => {
            const equ = this.equation.clone().isolate('y'), F = new fraction_1.Fraction(value);
            if (equ instanceof equation_1.Equation) {
                return equ.right.evaluate({ x: F });
            }
            return;
        };
        this.getValueAtY = (value) => {
            const equ = this.equation.clone().isolate('x'), F = new fraction_1.Fraction(value);
            if (equ instanceof equation_1.Equation) {
                return equ.right.evaluate({ y: F });
            }
            return;
        };
        this._exists = false;
        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }
    get exists() {
        return this._exists;
    }
    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get equation() {
        return new equation_1.Equation(new polynom_1.Polynom().parse('xy', this._a, this._b, this._c), new polynom_1.Polynom('0')).simplify();
    }
    get tex() {
        // canonical    =>  ax + by + c = 0
        // mxh          =>  y = -a/b x - c/b
        // parametric   =>  (xy) = OA + k*d
        let canonical = this.equation;
        // Make sur the first item is positive.
        if (this._a.isNegative()) {
            canonical.multiply(-1);
        }
        return {
            canonical: canonical.tex,
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.tex : 'y=' + new polynom_1.Polynom().parse('x', this.slope, this.height).tex,
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
    distanceTo(pt) {
        let numerator = pt.x.clone().multiply(this._a)
            .add(pt.y.clone().multiply(this._b))
            .add(this._c).abs(), d2 = this.normal.normSquare;
        // The denominator is null - shouldn't be possible
        if (d2.isZero()) {
            return {
                value: NaN,
                tex: 'Not a line',
                fraction: new fraction_1.Fraction().infinite()
            };
        }
        // The denominator is a perfect square - simplify the tex result
        let value = numerator.value / Math.sqrt(d2.value), F = numerator.clone().divide(d2.clone().sqrt());
        // The denominator is a perfect square.
        if (d2.isSquare()) {
            return {
                value,
                tex: F.tex,
                fraction: F
            };
        }
        // Complete answer...
        return {
            value,
            tex: `\\frac{${numerator.tex}}{\\sqrt{${d2.tex}}}`,
            fraction: F
        };
    }
    hitSegment(A, B) {
        let iPt = this.intersection(new Line(A, B));
        // There is an intersection point
        if (iPt.hasIntersection) {
            return iPt.point.x.value >= Math.min(A.x.value, B.x.value)
                && iPt.point.x.value <= Math.max(A.x.value, B.x.value)
                && iPt.point.y.value >= Math.min(A.y.value, B.y.value)
                && iPt.point.y.value <= Math.max(A.y.value, B.y.value);
        }
        return false;
    }
    // ------------------------------------------
    // Special functions
    // ------------------------------------------
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
Line.PERPENDICULAR = LinePropriety.Perpendicular;
Line.PARALLEL = LinePropriety.Parallel;


/***/ }),

/***/ 557:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Point = void 0;
/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
const line_1 = __webpack_require__(9);
const vector_1 = __webpack_require__(586);
const fraction_1 = __webpack_require__(506);
/**
 * Helper class - a way to identify an object {x: number, y: number}
 */
class PointXY {
}
class Point {
    constructor(...values) {
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        this.parse = (...values) => {
            // Initialize the value.
            this.zero();
            // Nothing is given
            if (values.length === 0) {
                return this;
            }
            // One element is given - might be already a point !
            if (values.length === 1) {
                // it's already a point - clone it
                if (values[0] instanceof Point) {
                    this._x = values[0].x.clone();
                    this._y = values[0].y.clone();
                    return this;
                }
                // Value is given as string, comma separated.
                if (typeof values[0] === 'string') {
                    let xy = values[0].split(',');
                    if (xy.length === 2) {
                        this._x = new fraction_1.Fraction(xy[0]).reduce();
                        this._y = new fraction_1.Fraction(xy[1]).reduce();
                        return this;
                    }
                }
                // Value given as an object with {x: value, y: value}
                if (values[0] instanceof PointXY) {
                    this._x = new fraction_1.Fraction(values[0].x).reduce();
                    this._y = new fraction_1.Fraction(values[0].y).reduce();
                    return this;
                }
                else {
                    return this.zero();
                }
            }
            if (values.length === 2) {
                this._x = new fraction_1.Fraction(values[0]).reduce();
                this._y = new fraction_1.Fraction(values[1]).reduce();
                return this;
            }
            return this;
        };
        this.clone = () => {
            this._x = this._x.clone();
            this._y = this._y.clone();
            return this;
        };
        this.zero = () => {
            this._x = new fraction_1.Fraction(null);
            this._y = new fraction_1.Fraction(null);
            return this;
        };
        this.origin = () => {
            this.zero();
            return this;
        };
        this.middleOf = (P1, P2) => {
            this._x = P1.x.clone().add(P2.x).divide(2);
            this._y = P1.y.clone().add(P2.y).divide(2);
            return this;
        };
        // ------------------------------------------
        // Display functions
        // ------------------------------------------
        this.texValues = (numberOfDigits) => {
            let pts = [];
            pts.push(this._x.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));
            pts.push(this._y.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));
            return `\\left(${pts.join(';')}\\right)`;
        };
        this.distanceTo = (item) => {
            let value = 0, fraction = new fraction_1.Fraction(), tex = '';
            if (item instanceof line_1.Line) {
                return item.distanceTo(this);
            }
            else if (item instanceof Point) {
                let V = new vector_1.Vector(this, item);
                value = V.norm;
                fraction = V.normSquare.sqrt();
                tex = V.normSquare.isSquare() ? fraction.tex : `\\sqrt{\\frac{ ${V.normSquare.numerator} }{ ${V.normSquare.denominator} }}`;
            }
            return { value, fraction, tex };
        };
        this.isInListOfPoints = (list) => {
            const keyList = list.map(x => x.key);
            return keyList.includes(this.key);
        };
        this._x = new fraction_1.Fraction().zero();
        this._y = new fraction_1.Fraction().zero();
        if (values !== undefined) {
            this.parse(...values);
        }
        return this;
    }
    ;
    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
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
    get key() {
        return `${this.x.display};${this.y.display}`;
    }
}
exports.Point = Point;
// ------------------------------------------
// Mathematical operations
// ------------------------------------------
// ------------------------------------------
// Vector functions
// ------------------------------------------
// ------------------------------------------
// Static functions
// ------------------------------------------
Point.pmatrix = (a, b, c) => {
    if (c === undefined) {
        return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\end{pmatrix}`;
    }
    else {
        return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\\\ ${c.tex ? c.tex : c} \\end{pmatrix}`;
    }
};


/***/ }),

/***/ 164:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Triangle = void 0;
const point_1 = __webpack_require__(557);
const fraction_1 = __webpack_require__(506);
const vector_1 = __webpack_require__(586);
const line_1 = __webpack_require__(9);
const equation_1 = __webpack_require__(760);
class Triangle {
    constructor(...values) {
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        /**
         * Parse values to a triangle. Supported formats:
         * Point, Point, Point
         * x1, y1, x2, y2, x3, y3
         * TODO: Something else ?
         * @param values
         */
        this.parse = (...values) => {
            if (values.length === 6) {
                // Check if all values are number or fractions.
                let v = values.map((x) => new fraction_1.Fraction(x));
                return this.parse(new point_1.Point(v[0], v[1]), new point_1.Point(v[2], v[3]), new point_1.Point(v[4], v[5]));
            }
            else if (values.length === 3) {
                // Possibilities:
                // - Three points (or part of points, only dict for example, or array (TODO: Add the array syntax for point)
                // - Three lines
                // - Three lines as text.
                if (values.filter((x) => typeof x === 'string').length === 3) {
                    return this.parse(...values.map((x) => new line_1.Line(x)));
                }
                else if (values.filter((x) => x instanceof line_1.Line).length === 3) {
                    // We have three lines
                    this._lines = {
                        'AB': values[0],
                        'BC': values[1],
                        'AC': values[2]
                    };
                    // Get the intersection points -> build the triangle using these intersection points.
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
                    // At least, one of the value is not a point.
                    if (values.filter((x) => (x instanceof point_1.Point)).length < 3) {
                        return this.parse(new point_1.Point(values[0]), new point_1.Point(values[1]), new point_1.Point(values[2]));
                    }
                    // We have three points.
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
        /**
         * Clone the Triangle class
         */
        this.clone = () => {
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
        // ------------------------------------------
        // Triangle operations and properties
        // ------------------------------------------
        /**
         * Generate the Line object for the three segments of the triangle
         */
        this._updateTriangle = () => {
            this._middles = {
                'AB': new point_1.Point().middleOf(this._A, this._B),
                'AC': new point_1.Point().middleOf(this._A, this._C),
                'BC': new point_1.Point().middleOf(this._B, this._C)
            };
            this._remarquables = this._calculateRemarquableLines();
        };
        /**
         * Get the Point class for the given name
         * @param ptName
         */
        this.getPointByName = (ptName) => {
            switch (ptName.toUpperCase()) {
                case 'A':
                    return this._A;
                case 'B':
                    return this._B;
                case 'C':
                    return this._C;
            }
            // Something went wrong ! Return the first point
            return this._A;
        };
        /**
         * Get the vector for the segment given by name.
         * @param ptName1
         * @param ptName2
         */
        this.getSegment = (ptName1, ptName2) => {
            return new vector_1.Vector(this.getPointByName(ptName1), this.getPointByName(ptName2));
        };
        this._calculateRemarquableLines = () => {
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
            // As it's a triangle, we assume the lines are intersecting and aren't parallel or superposed.
            remarquables.medians.intersection = remarquables.medians.A.intersection(remarquables.medians.B).point;
            remarquables.mediators.intersection = remarquables.mediators.AB.intersection(remarquables.mediators.BC).point;
            remarquables.heights.intersection = remarquables.heights.A.intersection(remarquables.heights.B).point;
            remarquables.bisectors.intersection = remarquables.bisectors.A.intersection(remarquables.bisectors.B).point;
            // Everything was calculated for the remarquable lines.
            return remarquables;
        };
        this._calculateBisectors = (pt) => {
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
            // Must determine which bisectors is in the triangle
            if (pt === 'A') {
                return b1.hitSegment(this.B, this.C) ? b1 : b2;
            }
            if (pt === 'B') {
                return b1.hitSegment(this.A, this.C) ? b1 : b2;
            }
            if (pt === 'C') {
                return b1.hitSegment(this.B, this.A) ? b1 : b2;
            }
            // Default returns the first bisector
            return b1;
        };
        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }
    // ------------------------------------------
    // Getter and setters
    // ------------------------------------------
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
}
exports.Triangle = Triangle;


/***/ }),

/***/ 586:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector = void 0;
/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
const fraction_1 = __webpack_require__(506);
const numeric_1 = __webpack_require__(956);
const point_1 = __webpack_require__(557);
class Vector {
    constructor(...values) {
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        this.parse = (...values) => {
            // TODO: Must be more strict about what is given and limit to two dimensional vectors.p
            // Maybe more than one value was given...
            // Initialize the vector
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
                // Two points are given - skip the third value.
                if (values[0] instanceof point_1.Point && values[1] instanceof point_1.Point) {
                    this._x = values[1].x.clone().subtract(values[0].x);
                    this._y = values[1].y.clone().subtract(values[0].y);
                    return this;
                }
                // Fractions or a number are give
                if (values[0] instanceof fraction_1.Fraction || !isNaN(values[0])) {
                    this._x = new fraction_1.Fraction(values[0]);
                }
                if (values[1] instanceof fraction_1.Fraction || !isNaN(values[1])) {
                    this._y = new fraction_1.Fraction(values[1]);
                }
                if ((typeof values[0] === 'object' && !isNaN(values[0].x) && !isNaN(values[0].x)) &&
                    (typeof values[1] === 'object' && !isNaN(values[1].x) && !isNaN(values[1].x))) {
                    this._x = new fraction_1.Fraction(+values[1].x - values[0].x);
                    this._y = new fraction_1.Fraction(+values[1].y - values[0].y);
                }
            }
            return this;
        };
        this.clone = () => {
            let V = new Vector();
            if (this._x !== null) {
                V.x = this._x.clone();
            }
            if (this._y !== null) {
                V.y = this._y.clone();
            }
            return V;
        };
        this.reset = () => {
            this._x = null;
            this._y = null;
            return this;
        };
        this.zero = () => {
            this.reset();
            this._x = new fraction_1.Fraction(null);
            this._y = new fraction_1.Fraction(null);
            return this;
        };
        this.one = () => {
            this._x = new fraction_1.Fraction();
            this._y = new fraction_1.Fraction();
            return this;
        };
        this._parseString = (value) => {
            // Split comma, semi colon or single space.
            let components = value.split(/[,;\s]/g);
            // Validate the fraction values.
            this.x = new fraction_1.Fraction(components[0] || null);
            this.y = new fraction_1.Fraction(components[1] || null);
            return this;
        };
        // ------------------------------------------
        // Mathematical operations
        // ------------------------------------------
        this.opposed = () => {
            this._x.opposed();
            this._y.opposed();
            return this;
        };
        this.add = (V) => {
            this._x.add(V.x);
            this._y.add(V.y);
            return this;
        };
        this.subtract = (V) => {
            return this.add(V.clone().opposed());
        };
        this.scalarProductWithVector = (V) => {
            // TODO: Add the scalar factor !!!!
            return this._x.clone().multiply(V.x).add(this._y.clone().multiply(V.y));
        };
        this.normal = () => {
            let x = this.x.clone().opposed(), y = this.y.clone();
            this._x = y;
            this._y = x;
            return this;
        };
        this.isNormalTo = (v) => {
            return this.scalarProductWithVector(v).isZero();
        };
        this.multiplyByScalar = (k) => {
            let scalar = new fraction_1.Fraction(k);
            this._x.multiply(scalar);
            this._y.multiply(scalar);
            return this;
        };
        this.divideByScalar = (k) => {
            return this.multiplyByScalar(new fraction_1.Fraction(k).invert());
        };
        // ------------------------------------------
        // Vector functions
        // ------------------------------------------
        this.simplify = () => {
            // Multiply by the lcm of denominators.
            return this.multiplyByScalar(numeric_1.Numeric.lcm(this._x.denominator, this._y.denominator))
                .divideByScalar(numeric_1.Numeric.gcd(this._x.numerator, this._y.numerator));
        };
        this.angleWith = (V, sharp, radian) => {
            let scalar = this.scalarProductWithVector(V).value, toDegree = radian ? 1 : 180 / Math.PI;
            if (sharp) {
                scalar = Math.abs(scalar);
            }
            return toDegree * Math.acos(scalar / (this.norm * V.norm));
        };
        this._x = new fraction_1.Fraction().zero();
        this._y = new fraction_1.Fraction().zero();
        if (values !== undefined) {
            this.parse(...values);
        }
    }
    ;
    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
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
}
exports.Vector = Vector;
Vector.scalarProduct = (v1, v2) => {
    // TODO: Transform to fraction with nthroot.
    return v1.x.value * v2.x.value + v1.y.value * v2.y.value;
};


/***/ }),

/***/ 956:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Numeric = void 0;
class Numeric {
    static round(value, decimals = 2) {
        return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
    }
    /**
     * Get the list of the nth first prime numbers.
     * @param nb : number of primes to choose from
     */
    static prime(nb) {
        let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
        if (nb === undefined) {
            return primes;
        }
        else {
            return primes.slice(0, Math.max(primes.length, nb));
        }
    }
    /**
     * Get the list of all dividers of a number.
     * @param value
     */
    static dividers(value) {
        let D;
        const maxV = Math.sqrt(Math.abs(value));
        // Initialize the list of dividers.
        D = [];
        for (let i = 1; i <= maxV; i++) {
            if (value % i === 0) {
                D.push(i);
                D.push(value / i);
            }
        }
        // Order numbers.
        D.sort(function (a, b) { return a - b; });
        // Make sure the array of value is unique.
        return [...new Set(D)];
    }
    /**
     * Great Common Divisor
     * @param values : number values
     */
    static gcd(...values) {
        // Define the gcd for two number
        let gcd2 = function (a, b) {
            if (b === 0) {
                return a;
            }
            return gcd2(b, a % b);
        };
        let g = 1, i = 2;
        // Nothing is given
        if (values.length === 0) {
            return 1;
        }
        // Only one number is given
        if (values.length === 1) {
            // The first number is zero
            if (values[0] === 0) {
                return 1;
            }
            // Return the number
            return values[0];
        }
        // We have at least 2 numbers.
        g = gcd2(values[0], values[1]);
        // The gcd of the two first value is one ? It's already finished.
        if (g === 1) {
            return 1;
        }
        // The current gcd isn't one. Continue with all next values.
        for (i = 2; i < values.length; i++) {
            g = gcd2(g, values[i]);
            // Escape if gcd is already one.
            if (g === 1) {
                break;
            }
        }
        return Math.abs(g);
    }
    /**
     * Least Common Multiple
     * @param values: list of numbers
     */
    static lcm(...values) {
        return values.reduce(function (a, b) {
            return Math.abs(a * b / Numeric.gcd(a, b));
        });
    }
    static pythagoricianTripletsWithTarget(target, targetIsSquare) {
        // méthode inverse, à partir du triplet.
        const triplets = [], targetValue = targetIsSquare === true ? +target : target ** 2;
        for (let u = 0; u <= target; u++) {
            for (let v = 0; v <= target; v++) {
                if (u ** 2 + v ** 2 === targetValue) {
                    triplets.push([u, v, target]);
                }
            }
        }
        return triplets;
    }
}
exports.Numeric = Numeric;


/***/ }),

/***/ 330:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Random = void 0;
const rndPolynom_1 = __webpack_require__(22);
const rndMonom_1 = __webpack_require__(793);
const rndHelpers_1 = __webpack_require__(140);
const rndFraction_1 = __webpack_require__(754);
__exportStar(__webpack_require__(230), exports);
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

/***/ 373:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomCore = void 0;
class randomCore {
    constructor() {
        this.mergeConfig = (config, defaultConfig) => {
            if (config !== undefined) {
                return { ...defaultConfig, ...config };
            }
            return defaultConfig;
        };
        this.generate = () => {
            return undefined;
        };
        this.config = (config) => {
            this._config = this.mergeConfig(config, this._defaultConfig);
            return this;
        };
    }
}
exports.randomCore = randomCore;


/***/ }),

/***/ 754:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rndFraction = void 0;
const randomCore_1 = __webpack_require__(373);
const random_1 = __webpack_require__(330);
const fraction_1 = __webpack_require__(506);
/**
 * Create a random monom based on a based configuration
 */
class rndFraction extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this.generate = () => {
            let Q = new fraction_1.Fraction();
            if (this._config.negative) {
                Q.numerator = random_1.Random.numberSym(this._config.max, this._config.zero);
            }
            else {
                Q.numerator = random_1.Random.number(this._config.zero ? 0 : 1, this._config.max);
            }
            if (this._config.natural) {
                Q.denominator = 1;
            }
            else {
                Q.denominator = random_1.Random.number(1, this._config.max);
            }
            return this._config.reduced ? Q.reduce() : Q;
        };
        this._defaultConfig = {
            negative: true,
            max: 10,
            reduced: true,
            zero: true,
            natural: false
        };
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
}
exports.rndFraction = rndFraction;


/***/ }),

/***/ 140:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rndHelpers = void 0;
/**
 * Random helpers
 */
class rndHelpers {
    /**
     * Random boolean with a percent ratio
     * @param percent
     */
    static randomBool(percent = 0.5) {
        return Math.random() < percent;
    }
    /**
     * Random integer between two values.
     * @param a (number) : From this value to the second value. If the second is ommited, this value is the max value.
     * @param b (number) : To this value. If this is ommited.
     */
    static randomInt(a, b) {
        if (b === undefined) {
            return this.randomInt(0, a);
        }
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
    /**
     * Random integer between -max and max value.
     * @param max (number) : determine the limits.
     * @param zero (bool) : determine if zero is allowed or not.
     */
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
        // Return a clone array
        if (arr.length <= 0) {
            return Object.values(arr);
        }
        // Randomize the array and return the n first elements.
        return rndHelpers.shuffleArray(arr).slice(0, number);
    }
    static randomItem(arr) {
        if (arr.length === 0) {
            return '';
        }
        return this.randomArray(arr, 1)[0];
    }
    static shuffleArray(arr) {
        // The Fisher-Yates algorithm
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

/***/ 793:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rndMonom = void 0;
const randomCore_1 = __webpack_require__(373);
const random_1 = __webpack_require__(330);
const monom_1 = __webpack_require__(937);
/**
 * Create a random monom based on a based configuration
 */
class rndMonom extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this.generate = () => {
            // Create a monom instance
            let M = new monom_1.Monom();
            // Generate the coefficient
            if (typeof this._config.fraction === "boolean") {
                M.coefficient = random_1.Random.fraction({
                    zero: this._config.zero,
                    reduced: true,
                    natural: !this._config.fraction
                });
            }
            else {
                M.coefficient = random_1.Random.fraction(this._config.fraction);
            }
            // Calculate the degree of the monom
            if (this._config.letters.length > 1) {
                // Initialise each items...
                for (let L of this._config.letters.split('')) {
                    M.setLetter(L, 0);
                }
                for (let i = 0; i < this._config.degree; i++) {
                    const L = random_1.Random.item(this._config.letters.split(""));
                    M.setLetter(L, M.degree(L).clone().add(1));
                }
            }
            else {
                M.setLetter(this._config.letters, this._config.degree);
            }
            return M;
        };
        this._defaultConfig = {
            letters: 'x',
            degree: 2,
            fraction: true,
            zero: false
        };
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
}
exports.rndMonom = rndMonom;


/***/ }),

/***/ 22:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rndPolynom = void 0;
const randomCore_1 = __webpack_require__(373);
const rndMonom_1 = __webpack_require__(793);
const random_1 = __webpack_require__(330);
const polynom_1 = __webpack_require__(38);
/**
 * Random polynoms
 */
class rndPolynom extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this.generate = () => {
            if (this._config.factorable && this._config.degree > 1) {
                return this.factorable();
            }
            // Create the polynom
            let P = new polynom_1.Polynom().empty(), M;
            for (let i = this._config.degree; i >= 0; i--) {
                // Create monom of corresponding degree.
                M = new rndMonom_1.rndMonom({
                    letters: this._config.letters,
                    degree: i,
                    fraction: this._config.fraction,
                    zero: (i === this._config.degree) ? false : this._config.allowNullMonom
                }).generate();
                // If degree is the greatest and unit is true, set the monom value to one.
                if (this._config.unit && this._config.degree === i) {
                    M.coefficient.one();
                }
                // Add to the polynom
                P.add(M);
            }
            // Make sure the first monom is positive.
            if (this._config.positive && P.monomByDegree().coefficient.isNegative()) {
                P.monomByDegree().coefficient.opposed();
            }
            // If the number of monoms is greater than the allowed value, remove some of them... except the first one !
            if (this._config.numberOfMonoms > 0 && this._config.numberOfMonoms < P.length) {
                // Get the greatest degree monom
                let M = P.monomByDegree().clone();
                P.monoms = random_1.Random.array(P.monoms.slice(1), this._config.numberOfMonoms - 1);
                P.add(M).reorder().reduce();
            }
            return P;
        };
        this.factorable = () => {
            let P = new polynom_1.Polynom().one();
            let _factorableConfig = { ...this._config };
            _factorableConfig.degree = 1;
            _factorableConfig.factorable = false;
            for (let i = 0; i < this._config.degree; i++) {
                P.multiply(random_1.Random.polynom(_factorableConfig));
            }
            return P;
        };
        // Default config for a random polynom
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
        // Merge config with initialiser
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
}
exports.rndPolynom = rndPolynom;


/***/ }),

/***/ 230:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 505:
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
    constructor(mode) {
        this._rpn = [];
        this._mode = typeof mode === 'undefined' ? ShutingyardMode.POLYNOM : mode;
        this.tokenConfigInitialization();
    }
    // Getter
    get rpn() {
        // console.log(this._rpn)
        return this._rpn;
    }
    /**
     * Determin if the token is a defined operation
     * Defined operations: + - * / ^ sin cos tan
     * @param token
     */
    // isOperation(token: string): boolean {
    //     if (token[0].match(/[+\-*/^]/g)) {
    //         return true;
    //     }
    //     //
    //     // if (token.match(/^sin|cos|tan/g)) {
    //     //     return true;
    //     // }
    //
    //     return false;
    // }
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
                'sqrt': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
            };
            this._uniformize = false;
        }
        else {
            this._tokenConfig = {
                '^': { precedence: 4, associative: 'right', type: ShutingyardType.OPERATION },
                '*': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '/': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '+': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '-': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                // '%': {precedence: 3, associative: 'right', type: ShutingyardType.OPERATION},
                // 'sin': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                // 'cos': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                // 'tan': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
            };
            this._uniformize = true;
        }
        this._tokenKeys = Object.keys(this._tokenConfig).sort((a, b) => b.length - a.length);
        return this._tokenConfig;
    }
    /**
     * Get the next token to analyse.
     * @param expr (string) Expression to analyse
     * @param start (number) CUrrent position in the expr string.
     */
    NextToken(expr, start) {
        let token, tokenType;
        token = '';
        tokenType = '';
        // Case of parenthesis or comma (generic items)
        if (expr[start] === '(') {
            token = '(';
            tokenType = '(';
        }
        // It's a closing parenthese
        else if (expr[start] === ')') {
            token = ')';
            tokenType = ')';
        }
        // It's an argument separator for a function
        else if (expr[start] === ',') {
            token = ',';
            tokenType = 'function-argument';
        }
        else {
            // Order token keys by token characters length (descending)
            // TODO: this is done each time ! SHould be done once !
            // const keys = Object.keys(this._tokenConfig).sort((a,b)=>b.length-a.length)
            // Extract operation and function tokens
            for (let key of this._tokenKeys) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key;
                    tokenType = this._tokenConfig[key].type;
                    break;
                }
            }
            // Extract constant
            for (let key in exports.tokenConstant) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key;
                    tokenType = ShutingyardType.CONSTANT;
                    break;
                }
            }
            if (token === '') {
                // No function found ! Might be a coefficient !
                if (expr[start].match(/[0-9]/)) {
                    if (this._mode === ShutingyardMode.POLYNOM && false) {}
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
    /**
     * Sanitize an expression by adding missing common operation (multiplication between parentheseses)
     * @param expr
     * @constructor
     */
    Uniformizer(expr) {
        // Determiner if need to be uniformized
        if (!this._uniformize) {
            return expr;
        }
        let expr2;
        // Replace missing multiplication between two parenthese
        expr2 = expr.replace(/\)\(/g, ')*(');
        // Replace missing multiplication between number or setLetter and parenthese.
        // 3x(x-4) => 3x*(x-4)
        expr2 = expr2.replace(/([\da-zA-Z])(\()/g, "$1*$2");
        // (x-4)3x => (x-4)*3x
        expr2 = expr2.replace(/(\))([\da-zA-Z])/g, "$1*$2");
        // Add multiplication between number and letters.
        // 3x => 3*x
        expr2 = expr2.replace(/([0-9])([a-zA-Z])/g, "$1*$2");
        expr2 = expr2.replace(/([a-zA-Z])([0-9])/g, "$1*$2");
        // Add multiplication between letters ?
        // TODO: More robust solution to handle all letters ?
        expr2 = expr2.replace(/([abcxyz])([abcxyz])/g, "$1*$2");
        // Restore operation auto formating (prevent adding the mutliplcation star)
        // TODO: Accept list of functions
        let fnToken = ['sin', 'cos', 'tan'];
        for (let token of fnToken) {
            expr2 = expr2.replace(new RegExp(token + '\\*', 'g'), token);
        }
        return expr2;
    }
    /**
     * Parse an expression using the shutting yard tree algorithms
     * @param expr (string) Expression to analyse
     * Returns a RPN list of items.
     * @param operators
     */
    parse(expr, operators) {
        let outQueue = [], // Output queue
        opStack = [], // Operation queue
        token = '', tokenPos = 0, tokenType = '', previousOpStatckLength = 0;
        expr = this.Uniformizer(expr);
        let securityLoopLvl1 = 50, securityLoopLvl2_default = 50, securityLoopLvl2;
        while (tokenPos < expr.length) {
            securityLoopLvl1--;
            if (securityLoopLvl1 === 0) {
                console.log('SECURITY LEVEL 1 EXIT');
                break;
            }
            // Get the next token and the corresponding new (ending) position
            [token, tokenPos, tokenType] = this.NextToken(expr, tokenPos);
            switch (tokenType) {
                case 'monom':
                case 'coefficient':
                case 'variable':
                case 'constant':
                    outQueue.push({
                        token,
                        tokenType
                    });
                    // if(previousOpStatckLength == opStack.length && outQueue.length>=2){
                    //     console.log('opStatckLength', outQueue, opStack.length)
                    //     outQueue.push('*')
                    // }
                    break;
                case 'operation':
                    previousOpStatckLength = opStack.length;
                    //If the token is an operator, o1, then:
                    if (opStack.length > 0) {
                        let opTop = opStack[opStack.length - 1];
                        securityLoopLvl2 = +securityLoopLvl2_default;
                        //while there is an operator token o2, at the top of the operator stack and
                        while (opTop.token in this._tokenConfig && (
                        //either o1 is left-associative and its precedence is less than or equal to that of o2,
                        (this._tokenConfig[token].associative === 'left' && this._tokenConfig[token].precedence <= this._tokenConfig[opTop.token].precedence)
                            ||
                                //or o1 is right associative, and has precedence less than that of o2,
                                (this._tokenConfig[token].associative === 'right' && this._tokenConfig[token].precedence < this._tokenConfig[opTop.token].precedence))) {
                            /* Security exit ! */
                            securityLoopLvl2--;
                            if (securityLoopLvl2 === 0) {
                                console.log('SECURITY LEVEL 2 OPERATION EXIT');
                                break;
                            }
                            // Add the operation to the queue
                            outQueue.push((opStack.pop()) || { token: '', tokenType: 'operation' });
                            // Get the next operation on top of the Stack.
                            if (opStack.length === 0) {
                                break;
                            }
                            opTop = opStack[opStack.length - 1];
                        }
                    }
                    //at the end of iteration push o1 onto the operator stack
                    opStack.push({ token, tokenType });
                    break;
                case 'function-argument':
                    // TODO: check if the opStack exist.
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
                    // Add an empty value if next element is negative.
                    if (expr[tokenPos] === '-') {
                        outQueue.push({ token: '0', tokenType: 'coefficient' });
                    }
                    break;
                case ')':
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    //Until the token at the top of the stack is a left parenthesis, pop operators off the stack onto the output queue.
                    while (opStack[opStack.length - 1].token !== '(' && opStack.length > 1 /*Maybe zero !? */) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 CLOSING PARENTHESE EXIT');
                            break;
                        }
                        outQueue.push((opStack.pop()) || { token, tokenType });
                    }
                    //Pop the left parenthesis from the stack, but not onto the output queue.
                    opStack.pop();
                    break;
                case 'function':
                    opStack.push({ token, tokenType });
                    break;
                default:
                    // In theory, everything should be handled.
                    console.log(`SHUTING YARD: ${tokenType} : ${token} `);
            }
            // Output
            // console.log(outQueue.concat(opStack.reverse()).join(" "));
        }
        // console.log(outQueue.concat(opStack.reverse()));
        this._rpn = outQueue.concat(opStack.reverse());
        return this;
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ })()
;
//# sourceMappingURL=pi.js.map