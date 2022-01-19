"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monom = void 0;
const coefficients_1 = require("../coefficients");
const numeric_1 = require("../numeric");
const shutingyard_1 = require("../shutingyard");
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
//# sourceMappingURL=monom.js.map