import { Fraction } from "../coefficients/fraction";
import { Numeric } from "../numeric";
export class Monom {
    _coefficient;
    _literal;
    constructor(value) {
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
    get literalSqrt() {
        if (this.isLitteralSquare()) {
            let L = {};
            for (let key in this._literal) {
                L[key] = this._literal[key] / 2;
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
        this.clone().clean();
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
    get dividers() {
        if (this.coefficient.denominator !== 1) {
            return [this.clone()];
        }
        if (this.coefficient.numerator > 10000) {
            return [this.clone()];
        }
        const dividers = Numeric.dividers(Math.abs(this.coefficient.numerator));
        let litterals = [];
        for (let L in this.literal) {
            litterals = this._getLitteralDividers(litterals, L);
        }
        const monomDividers = [];
        if (litterals.length > 0 && dividers.length > 0) {
            for (let N of dividers) {
                for (let L of litterals) {
                    let M = new Monom();
                    M.coefficient = new Fraction(N);
                    M.literal = L;
                    monomDividers.push(M);
                }
            }
        }
        else if (dividers.length === 0) {
            for (let L of litterals) {
                let M = new Monom();
                M.coefficient = new Fraction().one();
                M.literal = L;
                monomDividers.push(M);
            }
        }
        else {
            for (let N of dividers) {
                let M = new Monom();
                M.coefficient = new Fraction(N);
                monomDividers.push(M);
            }
        }
        return monomDividers.length === 0 ? [new Monom().one()] : monomDividers;
    }
    _getLitteralDividers(arr, letter) {
        let tmpList = [];
        for (let d = 0; d <= this.literal[letter]; d++) {
            if (arr.length === 0) {
                let litt = {};
                litt[letter] = d;
                tmpList.push(litt);
            }
            else {
                for (let item of arr) {
                    let litt = {};
                    for (let currentLetter in item) {
                        litt[currentLetter] = item[currentLetter];
                    }
                    litt[letter] = d;
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
    parse = (inputStr) => {
        this.literalStr = inputStr;
        this._coefficient = new Fraction();
        for (const v of [...inputStr.replace(/([a-z])|(\^[+-]?[0-9]+)/g, ',').split(',')]) {
            if (v.trim() === '') {
                continue;
            }
            this._coefficient.multiply(new Fraction(v.trim()));
        }
        return this;
    };
    clone = () => {
        let F = new Monom();
        F.coefficient = this._coefficient.clone();
        for (let k in this._literal) {
            F.setLetter(k, this._literal[k]);
        }
        return F;
    };
    zero = () => {
        this._coefficient = new Fraction().zero();
        this._literal = {};
        return this;
    };
    one = () => {
        this._coefficient = new Fraction().one();
        this._literal = {};
        return this;
    };
    clean = () => {
        for (let letter in this._literal) {
            if (this._literal[letter] === 0) {
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
                this._coefficient.add(m.coefficient.clone().opposed());
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
                this._literal[letter] = (this._literal[letter] === undefined) ? m.literal[letter] : this._literal[letter] + m.literal[letter];
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
                this._literal[letter] = (this._literal[letter] === undefined) ? -v.literal[letter] : this._literal[letter] - v.literal[letter];
                if (this._literal[letter] === 0) {
                    delete this._literal[letter];
                }
            }
        }
        return this;
    };
    pow = (nb) => {
        this._coefficient.pow(nb);
        for (let letter in this._literal) {
            this._literal[letter] *= nb;
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
                this._literal[letter] /= 2;
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
        return this.isLitteralSquare();
    };
    isLitteralSquare = () => {
        for (let letter in this.literal) {
            if (this.literal[letter] % 2 !== 0) {
                return false;
            }
        }
        return true;
    };
    hasLetter = (letter) => {
        return this._literal[letter === undefined ? 'x' : letter] > 0;
    };
    setLetter = (letter, pow) => {
        if (pow <= 0 || !Number.isSafeInteger(pow)) {
            if (this._literal[letter] !== undefined) {
                delete this._literal[letter];
            }
        }
        else {
            this._literal[letter] = pow;
        }
    };
    degree = (letter) => {
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
    evaluate = (values) => {
        let r = this.coefficient.clone();
        if (typeof values === 'number' || values instanceof Fraction) {
            let tmpValues = {};
            tmpValues[this.variables[0]] = new Fraction(values);
            return this.evaluate(tmpValues);
        }
        if (typeof values === 'object') {
            for (let L in this._literal) {
                if (values[L] === undefined) {
                    return new Fraction().zero();
                }
                let value = new Fraction(values[L]);
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
            let d = +this._literal[letter], dM = this.clone();
            dM._literal[letter] -= 1;
            dM._coefficient.multiply(new Fraction('' + d));
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
        let M = this.clone();
        if (M.hasLetter(letter)) {
            M.coefficient = M.coefficient.clone().divide(M.degree(letter) + 1);
            M.setLetter(letter, M.degree(letter) + 1);
        }
        else {
            if (M.coefficient.isZero()) {
                M.coefficient = new Fraction().one();
            }
            M.setLetter(letter, 1);
        }
        return M;
    };
    static lcm = (...monoms) => {
        let M = new Monom(), coeffN = monoms.map(value => value.coefficient.numerator), coeffD = monoms.map(value => value.coefficient.denominator), n = Numeric.gcd(...coeffN), d = Numeric.lcm(...coeffD);
        M.coefficient = new Fraction(n, d).reduce();
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
//# sourceMappingURL=monom.js.map