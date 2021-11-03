"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monom = void 0;
const fraction_1 = require("../coefficients/fraction");
const numeric_1 = require("../numeric");
class Monom {
    constructor(value) {
        this.parse = (inputStr) => {
            this.literalStr = inputStr;
            this._coefficient = new fraction_1.Fraction();
            for (const v of [...inputStr.replace(/([a-z])|(\^[+-]?[0-9]+)/g, ',').split(',')]) {
                if (v.trim() === '') {
                    continue;
                }
                this._coefficient.multiply(new fraction_1.Fraction(v.trim()));
            }
            return this;
        };
        this.clone = () => {
            let F = new Monom();
            F.coefficient = this._coefficient.clone();
            for (let k in this._literal) {
                F.setLetter(k, this._literal[k]);
            }
            return F;
        };
        this.zero = () => {
            this._coefficient = new fraction_1.Fraction().zero();
            this._literal = {};
            return this;
        };
        this.one = () => {
            this._coefficient = new fraction_1.Fraction().one();
            this._literal = {};
            return this;
        };
        this.clean = () => {
            for (let letter in this._literal) {
                if (this._literal[letter] === 0) {
                    delete this._literal[letter];
                }
            }
            return this;
        };
        this.random = (letters = 'x', degree = 1, withFraction = false, allowZero = false) => {
            this.coefficient.parse(numeric_1.Numeric.randomIntSym(10, allowZero), (withFraction) ? numeric_1.Numeric.randomInt(1, 10) : 1);
            for (let L of letters.split('')) {
                this.setLetter(L, (letters.length > 1) ? numeric_1.Numeric.randomInt(degree) : degree);
            }
            return this;
        };
        this.opposed = () => {
            this._coefficient.opposed();
            return this;
        };
        this.add = (...M) => {
            for (let m of M) {
                if (this.isSameAs(m)) {
                    this._coefficient.add(m.coefficient);
                }
                else {
                    console.log('Add: Is not similar: ', m.display);
                }
            }
            return this;
        };
        this.subtract = (...M) => {
            for (let m of M) {
                if (this.isSameAs(m)) {
                    this._coefficient.add(m.coefficient.clone().opposed());
                }
                else {
                    console.log('Subtract: Is not similar: ', m.display);
                }
            }
            return this;
        };
        this.multiply = (...M) => {
            for (let m of M) {
                this._coefficient.multiply(m.coefficient);
                for (let letter in m.literal) {
                    this._literal[letter] = (this._literal[letter] === undefined) ? m.literal[letter] : this._literal[letter] + m.literal[letter];
                }
            }
            return this;
        };
        this.multiplyByNumber = (F) => {
            this._coefficient.multiply(F);
            return this;
        };
        this.divide = (...M) => {
            for (let v of M) {
                this._coefficient.divide(v.coefficient);
                for (let letter in v.literal) {
                    this._literal[letter] = (this._literal[letter] === undefined) ? -v.literal[letter] : this._literal[letter] - v.literal[letter];
                    if (this._literal[letter] === 0) {
                        delete this._literal[letter];
                    }
                }
            }
            return this;
        };
        this.pow = (nb) => {
            this._coefficient.pow(nb);
            for (let letter in this._literal) {
                this._literal[letter] *= nb;
            }
            return this;
        };
        this.root = (p) => {
            return this;
        };
        this.sqrt = () => {
            if (this.isSquare()) {
                this._coefficient.sqrt();
                for (let letter in this._literal) {
                    this._literal[letter] /= 2;
                }
            }
            return this.root(2);
        };
        this.compare = (M, sign) => {
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
                    for (let key of K) {
                        if (this._literal[key] === undefined || M.literal[key] === undefined) {
                            return false;
                        }
                        if (this._literal[key] !== M.literal[key]) {
                            return false;
                        }
                    }
                    return true;
                default:
                    return false;
            }
        };
        this.isEqual = (M) => {
            return this.compare(M, '=');
        };
        this.isSameAs = (M) => {
            return this.compare(M, 'same');
        };
        this.isSquare = () => {
            if (!this.coefficient.isSquare()) {
                return false;
            }
            for (let letter in this.literal) {
                if (this.literal[letter] % 2 !== 0) {
                    return false;
                }
            }
            return true;
        };
        this.hasLetter = (letter) => {
            return this._literal[letter === undefined ? 'x' : letter] > 0;
        };
        this.setLetter = (letter, pow) => {
            if (pow <= 0 || !Number.isSafeInteger(pow)) {
                if (this._literal[letter] !== undefined) {
                    delete this._literal[letter];
                }
            }
            else {
                this._literal[letter] = pow;
            }
        };
        this.degree = (letter) => {
            if (this.variables.length === 0) {
                return 0;
            }
            if (letter === undefined) {
                return Object.values(this._literal).reduce((t, n) => t + n);
            }
            else {
                return this._literal[letter] === undefined ? 0 : this._literal[letter];
            }
        };
        this.evaluate = (values) => {
            let r = this.coefficient.clone();
            for (let L in this._literal) {
                if (values[L] === undefined) {
                    return new fraction_1.Fraction().zero();
                }
                r.multiply(values[L].clone().pow(this._literal[L]));
            }
            return r;
        };
        this.derivative = (letter) => {
            if (letter === undefined) {
                letter = 'x';
            }
            if (this.hasLetter(letter)) {
                let d = +this._literal[letter], dM = this.clone();
                dM._literal[letter] -= 1;
                dM._coefficient.multiply(new fraction_1.Fraction('' + d));
                return dM;
            }
            else {
                return new Monom().zero();
            }
        };
        this.areSameAs = (...M) => {
            let result = true;
            for (let i = 0; i < M.length; i++) {
                if (!this.isSameAs(M[i])) {
                    return false;
                }
            }
            return result;
        };
        this.areEquals = (...M) => {
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
        this.zero();
        if (value !== undefined) {
            this.parse(value);
        }
        return this;
    }
    get isMonom() {
        return true;
    }
    get coefficient() {
        return this._coefficient;
    }
    set coefficient(F) {
        this._coefficient = F;
    }
    get literal() {
        return this._literal;
    }
    set literal(L) {
        this._literal = L;
    }
    set literalStr(inputStr) {
        for (const v of [...inputStr.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) {
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = 0;
            }
            this._literal[v[1]] += +v[2];
        }
        for (const v of [...inputStr.matchAll(/([a-z](?!\^))/g)]) {
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = 0;
            }
            this._literal[v[1]] += 1;
        }
    }
    get variables() {
        let M = this.clone().clean();
        return Object.keys(this._literal);
    }
    get display() {
        let L = '';
        for (let letter in this._literal) {
            if (this._literal[letter] !== 0) {
                L += `${letter}`;
                if (this._literal[letter] > 1) {
                    L += `^${this._literal[letter]}`;
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
    get displayWithSign() {
        let d = this.display;
        return (d[0] !== '-' ? '+' : '') + d;
    }
    get tex() {
        let L = '';
        for (let letter in this._literal) {
            if (this._literal[letter] !== 0) {
                L += `${letter}`;
                if (this._literal[letter] > 1) {
                    L += `^${this._literal[letter]}`;
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
    isZero() {
        return this._coefficient.value === 0;
    }
    isOne() {
        return this._coefficient.value === 1 && this.variables.length === 0;
    }
}
exports.Monom = Monom;
Monom.lcm = (...monoms) => {
    let M = new Monom(), coeffN = monoms.map(value => value.coefficient.numerator), coeffD = monoms.map(value => value.coefficient.denominator), n = numeric_1.Numeric.gcd(...coeffN), d = numeric_1.Numeric.lcm(...coeffD);
    M.coefficient = new fraction_1.Fraction(n, d).reduce();
    for (let m of monoms) {
        for (let letter in M.literal) {
            if (!(letter in m.literal)) {
                M.literal[letter] = 0;
            }
        }
        for (let letter in m.literal) {
            if (M.literal[letter] === undefined && m.literal[letter] > 0) {
                M.literal[letter] = m.literal[letter];
            }
            else {
                M.literal[letter] = Math.min(m.literal[letter], M.literal[letter]);
            }
        }
    }
    return M;
};
Monom.xmultiply = (...monoms) => {
    let M = new Monom().one();
    for (let m of monoms) {
        M.multiply(m);
    }
    return M;
};
//# sourceMappingURL=monom.js.map