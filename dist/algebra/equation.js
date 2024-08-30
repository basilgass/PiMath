import { Fraction } from "../coefficients/fraction";
import { Numeric } from "../numeric";
import { EquationSolver } from "./equationSolver";
import { Monom } from "./monom";
import { Polynom } from "./polynom";
export class Equation {
    #randomizeDefaults = {
        degree: 2
    };
    #left;
    #right;
    #sign;
    constructor(left, right, sign) {
        this.#left = new Polynom().zero();
        this.#right = new Polynom().zero();
        this.#sign = '=';
        if (left !== undefined && right === undefined) {
            if (left instanceof Equation) {
                return left.clone();
            }
            else if (typeof left === 'string') {
                this.parse(left);
            }
        }
        else if (left !== undefined && right !== undefined) {
            this.left = new Polynom(left);
            this.right = new Polynom(right);
        }
        if (sign !== undefined) {
            this.sign = sign;
        }
        return this;
    }
    parse = (equationString) => {
        const strSign = this._findSign(equationString);
        if (strSign === false) {
            throw new Error('The equation is not valid (no sign found)');
        }
        const pStr = equationString.split(strSign);
        return this.create(new Polynom(pStr[0]), new Polynom(pStr[1]), this._formatSign(strSign));
    };
    create = (left, right, sign) => {
        this.#left = left;
        this.#right = right;
        this.#sign = this._formatSign(sign ?? "=");
        return this;
    };
    clone = () => {
        return new Equation(this.#left.clone(), this.#right.clone(), this.#sign);
    };
    add(value) {
        if (value instanceof Equation) {
            this.#left.add(value.left);
            this.#right.add(value.right);
            return this;
        }
        if (typeof value === 'string' &&
            !Equation.isEquationString(value)) {
            return this.add(new Equation(value));
        }
        const p = new Polynom(value);
        this.#left.add(p);
        this.#right.add(p);
        return this;
    }
    degree = (letter) => {
        return Fraction.max(this.#left.degree(letter), this.#right.degree(letter));
    };
    divide = (value) => {
        const F = new Fraction(value);
        if (F.isZero()) {
            return this;
        }
        else {
            return this.multiply(F.inverse());
        }
    };
    evaluate(values, asNumeric) {
        const left = this.#left.evaluate(values, asNumeric), right = this.#right.evaluate(values, asNumeric);
        if (asNumeric) {
            return left === right;
        }
        return left.isEqual(right);
    }
    hasVariable = (letter) => {
        return this.variables.includes(letter);
    };
    isLinearTo = (equ) => {
        const p1 = equ.clone().moveLeft().simplify().left, p2 = this.clone().moveLeft().simplify().left;
        return p1.isEqual(p2) || p1.isOppositeAt(p2);
    };
    isMultiVariable = () => {
        return this.#left.isMultiVariable || this.#right.isMultiVariable;
    };
    isEqualTo = (equ) => {
        const p1 = equ.clone().moveLeft().left, p2 = this.clone().moveLeft().left;
        return p1.isEqual(p2) || p1.isOppositeAt(p2);
    };
    isolate = (letter) => {
        if (!this.degree(letter).isOne()) {
            return false;
        }
        if (this.isMultiVariable()) {
            return false;
        }
        let mMove;
        this.#left.subtract(this.#right);
        this.#right.zero();
        const values = [...this.#left.monoms];
        for (const m of values) {
            if (!m.hasVariable(letter)) {
                mMove = m.clone();
                this.#left.subtract(mMove);
                this.#right.subtract(mMove);
            }
        }
        if (this.#left.length !== 1) {
            return false;
        }
        const cMove = this.#left.monoms[0].coefficient.clone();
        this.#left.divide(cMove);
        this.#right.divide(cMove);
        return this;
    };
    letters = () => {
        return [...new Set([...this.#left.letters(), ...this.#right.letters()])];
    };
    moveLeft = () => {
        this.#left = this.#left.clone().subtract(this.#right);
        this.#right.zero();
        return this;
    };
    multiply = (value) => {
        const F = new Fraction(value);
        this.#left.multiply(F);
        this.#right.multiply(F);
        if (this.#sign !== '=' && F.sign() === -1) {
            this._reverseSign();
        }
        return this;
    };
    pow(value) {
        this.#left.pow(value);
        this.#right.pow(value);
        return this;
    }
    opposite = () => {
        this.#left = this.#left.opposite();
        this.#right = this.#right.opposite();
        return this;
    };
    reduce() {
        this.moveLeft();
        this.#left.reduce();
        this.simplify();
        if (this.#left.monoms[0].coefficient.isNegative()) {
            this.multiply(-1);
        }
        return this;
    }
    reorder = (allLeft) => {
        this.#left.subtract(this.#right);
        this.#right.zero();
        this.#left.reorder();
        if (allLeft) {
            return this;
        }
        this.#left.monoms
            .filter(m => m.degree().isZero())
            .forEach(m => {
            const move = m.clone();
            this.#left.subtract(move);
            this.#right.subtract(move);
        });
        this.#left.reorder();
        this.#right.reorder();
        return this;
    };
    replaceBy = (letter, P) => {
        this.#left.replaceBy(letter, P);
        this.#right.replaceBy(letter, P);
        return this;
    };
    simplify = () => {
        this.multiply(Numeric.lcm(...this.#left.getDenominators(), ...this.#right.getDenominators()));
        this.divide(Numeric.gcd(...this.#left.getNumerators(), ...this.#right.getNumerators()));
        return this;
    };
    solve = () => {
        const solver = new EquationSolver(this.clone());
        return solver.solve();
    };
    split() {
        return [this.#left.clone(), this.#right.clone()];
    }
    subtract(value) {
        if (value instanceof Equation) {
            this.#left.subtract(value.left);
            this.#right.subtract(value.right);
            return this;
        }
        if (typeof value === 'string' &&
            !Equation.isEquationString(value)) {
            return this.subtract(new Equation(value));
        }
        const p = new Polynom(value);
        this.#left.subtract(p);
        this.#right.subtract(p);
        return this;
    }
    test = (values) => {
        return this.left.evaluate(values).isEqual(this.right.evaluate(values));
    };
    static isEquationString(equationString) {
        return equationString.includes('=') ||
            equationString.includes('<') ||
            equationString.includes('>') ||
            equationString.includes('<=') ||
            equationString.includes('>=');
    }
    static makeSolutionsUnique(solutions, sorted) {
        const solutionAsTex = [], uniqueSolutions = solutions.filter(sol => {
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
    get display() {
        return `${this.#left.display}${this.signAsTex}${this.#right.display}`;
    }
    get left() {
        return this.#left;
    }
    set left(value) {
        this.#left = value;
    }
    get numberOfVars() {
        return this.variables.length;
    }
    get randomizeDefaults() {
        return this.#randomizeDefaults;
    }
    set randomizeDefaults(value) {
        this.#randomizeDefaults = value;
    }
    get right() {
        return this.#right;
    }
    set right(value) {
        this.#right = value;
    }
    get sign() {
        return this.#sign;
    }
    set sign(value) {
        this.#sign = this._formatSign(value);
    }
    get signAsTex() {
        if (this.#sign === '>=') {
            return '\\geq';
        }
        if (this.#sign === '<=') {
            return '\\leq';
        }
        return this.#sign;
    }
    get tex() {
        return `${this.#left.tex}${this.signAsTex}${this.#right.tex}`;
    }
    get variables() {
        return [...new Set(this.#right.variables.concat(this.#left.variables))];
    }
    _findSign = (equationString) => {
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
        throw new Error('The equation is not valid (no sign found)');
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
        if (this.#sign === '=') {
            return this;
        }
        if (this.#sign.includes('<')) {
            this.#sign.replace('<', '>');
            return this;
        }
        if (this.#sign.includes('>')) {
            this.#sign.replace('>', '<');
            return this;
        }
        return this;
    };
    isAlsoEqual = () => {
        if (this.#sign.includes('=')) {
            return true;
        }
        if (this.#sign.includes('geq')) {
            return true;
        }
        if (this.#sign.includes('leq')) {
            return true;
        }
        return false;
    };
    isGreater = () => {
        if (this.#sign.includes('>')) {
            return true;
        }
        return this.#sign.includes('geq');
    };
    isStrictEqual = () => {
        return this.#sign === '=';
    };
}
//# sourceMappingURL=equation.js.map