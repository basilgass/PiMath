import { Fraction } from "../coefficients/fraction";
import { NthRoot } from "../coefficients/nthRoot";
import { Numeric } from "../numeric";
import { ShutingYard, ShutingyardType } from "piexpression/lib";
export class Monom {
    #coefficient;
    #literal;
    constructor(value) {
        this.#coefficient = new Fraction().zero();
        this.#literal = {};
        if (value !== undefined) {
            this.parse(value);
        }
        return this;
    }
    parse = (inputStr) => {
        this.#coefficient = new Fraction();
        this.#literal = {};
        if (typeof inputStr === 'string') {
            this._shutingYardToReducedMonom(inputStr);
        }
        else if (typeof inputStr === 'number') {
            this.#coefficient = new Fraction(inputStr);
        }
        else if (inputStr instanceof Fraction) {
            this.#coefficient = inputStr.clone();
        }
        else if (inputStr instanceof Monom) {
            this.#coefficient = inputStr.#coefficient.clone();
            this._cloneLiteral(inputStr);
        }
        return this;
    };
    clone = () => {
        const F = new Monom();
        F.coefficient = this.#coefficient.clone();
        for (const k in this.#literal) {
            F.setLetter(k, this.#literal[k].clone());
        }
        return F;
    };
    static gcd = (...monoms) => {
        for (const m of monoms) {
            if (m.containsRationalPower()) {
                return new Monom().zero();
            }
        }
        const M = new Monom(), n = Numeric.gcd(...monoms.map(value => value.coefficient.numerator)), d = Numeric.lcm(...monoms.map(value => value.coefficient.denominator));
        M.coefficient = new Fraction(n, d).reduce();
        for (const m of monoms) {
            for (const letter in M.literal) {
                if (!(letter in m.literal)) {
                    M.literal[letter].zero();
                }
            }
            for (const letter in m.literal) {
                if (!M.hasVariable(letter) && m.literal[letter].isStrictlyPositive()) {
                    M.literal[letter] = m.literal[letter].clone();
                }
                else {
                    M.literal[letter] = new Fraction(Math.min(m.literal[letter].value, M.literal[letter].value));
                }
            }
        }
        return M;
    };
    static xMultiply = (...monoms) => {
        const M = new Monom().one();
        for (const m of monoms) {
            M.multiply(m);
        }
        return M;
    };
    add = (...M) => {
        for (const m of M) {
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m;
            if (this.isSameAs(mAsMonom)) {
                if (this.isZero()) {
                    this._cloneLiteral(mAsMonom);
                }
                this.#coefficient.add(mAsMonom.coefficient);
            }
            else {
                console.log('Add monom: ' + this.display + ' is not similar with ', mAsMonom.display);
            }
        }
        return this;
    };
    get coefficient() {
        return this.#coefficient;
    }
    set coefficient(F) {
        this.#coefficient = new Fraction(F);
    }
    containsRationalPower = () => {
        return Object.values(this.#literal).some((value) => value.isRational());
    };
    degree = (letter) => {
        if (this.variables.length === 0) {
            return new Fraction().zero();
        }
        if (letter === undefined) {
            return Object.values(this.#literal).reduce((t, n) => t.clone().add(n));
        }
        else {
            return !this.hasVariable(letter) ? new Fraction().zero() : this.#literal[letter].clone();
        }
    };
    derivative = (letter) => {
        if (letter === undefined) {
            letter = 'x';
        }
        if (this.hasVariable(letter)) {
            const d = this.#literal[letter].clone(), dM = this.clone();
            dM.#literal[letter].subtract(1);
            dM.#coefficient.multiply(new Fraction(d.clone()));
            return dM;
        }
        else {
            return new Monom().zero();
        }
    };
    get display() {
        let L = '';
        const letters = Object.keys(this.#literal).sort();
        for (const letter of letters) {
            if (this.#literal[letter].isNotZero()) {
                L += letter;
                if (this.#literal[letter].isNotEqual(1)) {
                    L += `^(${this.#literal[letter].display})`;
                }
            }
        }
        if (L === '') {
            if (this.#coefficient.value != 0) {
                return this.#coefficient.display;
            }
            else {
                return '';
            }
        }
        else {
            if (this.#coefficient.value === 1) {
                return L;
            }
            else if (this.#coefficient.value === -1) {
                return `-${L}`;
            }
            else if (this.#coefficient.value === 0) {
                return '0';
            }
            else {
                return `${this.#coefficient.display}${L}`;
            }
        }
    }
    divide = (...M) => {
        for (const m of M) {
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m;
            this.#coefficient.divide(mAsMonom.coefficient);
            for (const letter in mAsMonom.literal) {
                this.#literal[letter] = this.hasVariable(letter) ?
                    this.#literal[letter].subtract(mAsMonom.literal[letter]) :
                    mAsMonom.literal[letter].clone().opposite();
                if (this.#literal[letter].isZero()) {
                    this.removeVariable(letter);
                }
            }
        }
        return this;
    };
    get dividers() {
        if (!this.coefficient.isRelative()) {
            return [this.clone()];
        }
        if (this.containsRationalPower()) {
            return [this.clone()];
        }
        if (this.coefficient.numerator > 1000000) {
            return [this.clone()];
        }
        const dividers = Numeric.dividers(Math.abs(this.coefficient.numerator));
        let literals = [];
        for (const L in this.literal) {
            literals = this._getLiteralDividers(literals, L);
        }
        const monomDividers = [];
        if (literals.length > 0 && dividers.length > 0) {
            for (const N of dividers) {
                for (const L of literals) {
                    const M = new Monom();
                    M.coefficient = new Fraction(N);
                    M.literal = L;
                    monomDividers.push(M);
                }
            }
        }
        else if (dividers.length === 0) {
            for (const L of literals) {
                const M = new Monom();
                M.coefficient = new Fraction().one();
                M.literal = L;
                monomDividers.push(M);
            }
        }
        else {
            for (const N of dividers) {
                const M = new Monom();
                M.coefficient = new Fraction(N);
                monomDividers.push(M);
            }
        }
        return monomDividers.length === 0 ? [new Monom().one()] : monomDividers;
    }
    evaluate = (values, asNumeric) => {
        if (asNumeric === true) {
            if (values instanceof Fraction) {
                return this._evaluateAsNumeric(values.value);
            }
            if (values instanceof NthRoot) {
                return new Fraction().invalid();
            }
            if (typeof values === 'number') {
                return this._evaluateAsNumeric(values);
            }
            if (typeof values === 'object') {
                const tmpValues = {};
                for (const L in values) {
                    tmpValues[L] = new Fraction(values[L]).value;
                }
                return this._evaluateAsNumeric(tmpValues);
            }
        }
        const r = this.coefficient.clone();
        if (typeof values === 'number' || values instanceof Fraction) {
            const tmpValues = {};
            tmpValues[this.variables[0]] = new Fraction(values);
            return this.evaluate(tmpValues);
        }
        if (values instanceof NthRoot) {
            return new Fraction().invalid();
        }
        if (typeof values === 'object') {
            if (this.variables.length === 0) {
                return this.coefficient;
            }
            for (const L in this.#literal) {
                const value = new Fraction(values[L]);
                r.multiply(value.pow(this.#literal[L]));
            }
        }
        return r;
    };
    hasVariable = (letter) => {
        return Object.hasOwn(this.#literal, letter ?? 'x');
    };
    integrate(a, b, letter) {
        const primitive = this.primitive(letter);
        return primitive.evaluate(b)
            .subtract(primitive.evaluate(a));
    }
    inverse = () => {
        this.#coefficient.opposite();
        for (const letter in this.#literal) {
            this.#literal[letter].opposite();
        }
        return this;
    };
    isDivisible = (div) => {
        if (div.degree().isStrictlyPositive()) {
            for (const letter of div.variables) {
                if (!this.degree(letter).isGeq(div.degree(letter))) {
                    return false;
                }
            }
        }
        if (this.coefficient.isRational() || div.coefficient.isRational()) {
            return true;
        }
        return this.coefficient.clone().divide(div.coefficient).isRelative();
    };
    isEqual = (M) => {
        return this.isSameAs(M) && this.#coefficient.isEqual(M.coefficient);
    };
    isLiteralSquare = () => {
        for (const letter in this.literal) {
            if (this.literal[letter].isRational()) {
                return false;
            }
            if (this.literal[letter].isEven()) {
                return false;
            }
        }
        return true;
    };
    isOne = () => {
        return this.#coefficient.value === 1 && this.variables.length === 0;
    };
    isSameAs = (M) => {
        const M1 = this.variables;
        const M2 = M.variables;
        const K = M1.concat(M2.filter((item) => !M1.includes(item)));
        if (this.isZero() || M.isZero()) {
            return true;
        }
        if (M1.length === 0 && M2.length === 0) {
            return true;
        }
        if (M1.length !== M2.length) {
            return false;
        }
        if (!this.isZero() && !M.isZero()) {
            for (const key of K) {
                if (!this.hasVariable(key) || !M.hasVariable(key)) {
                    return false;
                }
                if (!this.#literal[key].isEqual(M.literal[key])) {
                    return false;
                }
            }
        }
        return true;
    };
    isSquare = () => {
        if (!this.coefficient.isSquare()) {
            return false;
        }
        return this.isLiteralSquare();
    };
    isZero = () => {
        return this.#coefficient.value === 0;
    };
    get literal() {
        return this.#literal;
    }
    set literal(L) {
        this.#literal = L;
    }
    get literalSqrt() {
        if (this.isLiteralSquare()) {
            const L = {};
            for (const key in this.#literal) {
                L[key] = this.#literal[key].clone().sqrt();
            }
            return L;
        }
        else {
            return this.#literal;
        }
    }
    set literalStr(inputStr) {
        for (const v of [...inputStr.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) {
            if (!(v[1] in this.#literal)) {
                this.#literal[v[1]] = new Fraction().zero();
            }
            this.#literal[v[1]].add(+v[2]);
        }
        for (const v of [...inputStr.matchAll(/([a-z](?!\^))/g)]) {
            if (!(v[1] in this.#literal)) {
                this.#literal[v[1]] = new Fraction().zero();
            }
            this.#literal[v[1]].add(1);
        }
    }
    multiply = (...M) => {
        for (const m of M) {
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m;
            this.#coefficient.multiply(mAsMonom.coefficient);
            for (const letter in mAsMonom.literal) {
                if (!this.hasVariable(letter)) {
                    this.#literal[letter] = mAsMonom.literal[letter].clone();
                }
                else {
                    this.#literal[letter].add(mAsMonom.literal[letter]);
                }
            }
        }
        return this;
    };
    one = () => {
        this.#coefficient = new Fraction().one();
        this.#literal = {};
        return this;
    };
    opposite = () => {
        this.#coefficient.opposite();
        return this;
    };
    get plotFunction() {
        let L = '';
        const letters = Object.keys(this.#literal).sort();
        for (const letter of letters) {
            if (this.#literal[letter].isNotZero()) {
                L += (L === '' ? "" : "*") + letter;
                if (this.#literal[letter].isNotEqual(1)) {
                    L += `^(${this.#literal[letter].display})`;
                }
            }
        }
        if (L === '') {
            if (this.#coefficient.value != 0) {
                return this.#coefficient.display;
            }
            else {
                return '';
            }
        }
        else {
            if (this.#coefficient.value === 1) {
                return L;
            }
            else if (this.#coefficient.value === -1) {
                return `-${L}`;
            }
            else if (this.#coefficient.value === 0) {
                return '0';
            }
            else {
                return `${this.#coefficient.display}*${L}`;
            }
        }
    }
    pow = (nb) => {
        this.#coefficient.pow(nb);
        for (const letter in this.#literal) {
            this.#literal[letter].multiply(nb);
        }
        return this;
    };
    primitive = (letter) => {
        if (letter === undefined) {
            letter = 'x';
        }
        const M = this.clone();
        let degree;
        if (M.hasVariable(letter)) {
            degree = M.degree(letter).clone().add(1);
            M.coefficient = M.coefficient.clone().divide(degree);
            M.setLetter(letter, degree);
        }
        else {
            if (M.coefficient.isZero()) {
                M.coefficient = new Fraction().one();
            }
            M.setLetter(letter, 1);
        }
        return M;
    };
    reduce = () => {
        this.coefficient.reduce();
        for (const letter in this.#literal) {
            if (this.#literal[letter].isZero()) {
                this.removeVariable(letter);
            }
        }
        return this;
    };
    removeVariable(letter) {
        delete this.#literal[letter];
    }
    root = () => {
        throw new Error('Method not implemented.');
    };
    setLetter = (letter, pow) => {
        if (!(pow instanceof Fraction)) {
            return this.setLetter(letter, new Fraction(pow));
        }
        if (this.hasVariable(letter) && pow.isZero()) {
            this.removeVariable(letter);
        }
        this.#literal[letter] = pow.clone();
        return this;
    };
    sqrt = () => {
        if (this.isSquare()) {
            this.#coefficient.sqrt();
            for (const letter in this.#literal) {
                this.#literal[letter].clone().divide(2);
            }
        }
        return this;
    };
    subtract = (...M) => {
        for (const m of M) {
            const mAsMonom = (!(m instanceof Monom)) ? new Monom(m) : m;
            if (this.isSameAs(mAsMonom)) {
                if (this.isZero()) {
                    this._cloneLiteral(mAsMonom);
                }
                this.#coefficient.add(mAsMonom.clone().coefficient.opposite());
            }
            else {
                console.log('Subtract: Is not similar: ', mAsMonom.display);
            }
        }
        return this;
    };
    get tex() {
        let L = '';
        const letters = Object.keys(this.#literal).sort();
        for (const letter of letters) {
            if (this.#literal[letter].isNotZero()) {
                L += letter;
                if (this.#literal[letter].isNotEqual(1)) {
                    L += `^{ ${this.#literal[letter].tfrac} }`;
                }
            }
        }
        if (L === '') {
            if (this.#coefficient.value != 0) {
                return this.#coefficient.frac;
            }
            else {
                return '0';
            }
        }
        else {
            if (this.#coefficient.value === 1) {
                return L;
            }
            else if (this.#coefficient.value === -1) {
                return `-${L}`;
            }
            else if (this.#coefficient.value === 0) {
                return '0';
            }
            else {
                return `${this.#coefficient.frac}${L}`;
            }
        }
    }
    get variables() {
        const L = [];
        Object.entries(this.literal).forEach(([key, value]) => {
            if (!value.isZero()) {
                L.push(key);
            }
        });
        L.sort();
        return L;
    }
    zero = () => {
        this.#coefficient = new Fraction().zero();
        this.#literal = {};
        return this;
    };
    _cloneLiteral(inputStr) {
        for (const k in inputStr.literal) {
            this.#literal[k] = inputStr.literal[k].clone();
        }
    }
    _evaluateAsNumeric = (values) => {
        let r = this.coefficient.value;
        if (typeof values === "number") {
            const tmpValues = {};
            const key = this.variables[0];
            tmpValues[key] = values;
            return this._evaluateAsNumeric(tmpValues);
        }
        if (values instanceof Fraction) {
            const tmpValues = {};
            tmpValues[this.variables[0]] = new Fraction(values).value;
            return this._evaluateAsNumeric(tmpValues);
        }
        if (values instanceof NthRoot) {
            return NaN;
        }
        if (typeof values === 'object') {
            if (this.variables.length === 0) {
                return this.coefficient.value;
            }
            for (const L in this.#literal) {
                const v = values[L];
                if (v instanceof Fraction) {
                    r *= v.value ** (this.#literal[L].value);
                }
                else {
                    r *= v ** (this.#literal[L].value);
                }
            }
        }
        return r;
    };
    _getLiteralDividers(arr, letter) {
        const tmpList = [];
        for (let d = 0; d <= this.literal[letter].value; d++) {
            if (arr.length === 0) {
                const litt = {};
                litt[letter] = new Fraction(d);
                tmpList.push(litt);
            }
            else {
                for (const item of arr) {
                    const litt = {};
                    for (const currentLetter in item) {
                        litt[currentLetter] = item[currentLetter];
                    }
                    litt[letter] = new Fraction(d);
                    tmpList.push(litt);
                }
            }
        }
        return tmpList;
    }
    _shutingYardToReducedMonom = (inputStr) => {
        const SY = new ShutingYard().parse(inputStr);
        const rpn = SY.rpn;
        const stack = [];
        if (rpn.length === 0) {
            this.zero();
            return this;
        }
        else if (rpn.length === 1) {
            const element = rpn[0];
            this.one();
            if (element.tokenType === ShutingyardType.COEFFICIENT) {
                this.coefficient = new Fraction(element.token);
            }
            else if (element.tokenType === ShutingyardType.VARIABLE) {
                this.setLetter(element.token, 1);
            }
            return this;
        }
        else {
            for (const element of rpn) {
                this._shutingYard_AddToken(stack, element);
            }
        }
        this.one();
        this.multiply(stack[0]);
        return this;
    };
    _shutingYard_AddToken = (stack, element) => {
        let q1, q2, m, letter, pow;
        if (element.tokenType === ShutingyardType.COEFFICIENT) {
            stack.push(new Monom(new Fraction(element.token)));
        }
        else if (element.tokenType === ShutingyardType.VARIABLE) {
            const M = new Monom().one();
            M.setLetter(element.token, 1);
            stack.push(M.clone());
        }
        else if (element.tokenType === ShutingyardType.OPERATION) {
            switch (element.token) {
                case '-':
                    q2 = (stack.pop()) ?? new Monom().zero();
                    q1 = (stack.pop()) ?? new Monom().zero();
                    stack.push(q1.subtract(q2));
                    break;
                case '*':
                    q2 = (stack.pop()) ?? new Monom().one();
                    q1 = (stack.pop()) ?? new Monom().one();
                    stack.push(q1.multiply(q2));
                    break;
                case '/':
                    q2 = (stack.pop()) ?? new Monom().one();
                    q1 = (stack.pop()) ?? new Monom().one();
                    stack.push(q1.divide(q2));
                    break;
                case '^': {
                    const poppedCoefficient = stack.pop()?.coefficient;
                    pow = poppedCoefficient ?? new Fraction().one();
                    m = stack.pop() ?? new Monom().one();
                    letter = m.variables[0];
                    if (letter) {
                        m.setLetter(letter, pow);
                    }
                    stack.push(m);
                    break;
                }
            }
        }
    };
}
//# sourceMappingURL=monom.js.map