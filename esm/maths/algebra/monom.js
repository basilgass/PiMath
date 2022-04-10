"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monom = void 0;
/***
 * Monom class
 */
const numeric_1 = require("../numeric");
const shutingyard_1 = require("../shutingyard");
const fraction_1 = require("../coefficients/fraction");
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
                    Monom.addToken(stack, element);
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
Monom.addToken = (stack, element) => {
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
//# sourceMappingURL=monom.js.map