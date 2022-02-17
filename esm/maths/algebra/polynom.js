"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polynom = void 0;
const monom_1 = require("./monom");
const shutingyard_1 = require("../shutingyard");
const numeric_1 = require("../numeric");
const coefficients_1 = require("../coefficients");
class Polynom {
    _rawString;
    constructor(polynomString, ...values) {
        this._monoms = [];
        this._factors = [];
        if (polynomString !== undefined) {
            this.parse(polynomString, ...values);
        }
        return this;
    }
    _monoms;
    get monoms() {
        return this._monoms;
    }
    set monoms(M) {
        this._monoms = M;
    }
    _factors;
    get factors() {
        return this._factors;
    }
    set factors(value) {
        this._factors = value;
    }
    _texString;
    get texString() {
        return this._texString;
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
    parse = (inputStr, ...values) => {
        this._monoms = [];
        this._factors = [];
        if (typeof inputStr === 'string') {
            return this._parseString(inputStr, ...values);
        }
        else if (typeof inputStr === 'number' || inputStr instanceof coefficients_1.Fraction || inputStr instanceof monom_1.Monom) {
            this._monoms.push(new monom_1.Monom(inputStr));
        }
        else if (inputStr instanceof Polynom) {
            for (const m of inputStr.monoms) {
                this._monoms.push(m.clone());
            }
        }
        return this;
    };
    _parseString(inputStr, ...values) {
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
    }
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
        quotient.reduce();
        reminder.reduce();
        return { quotient, reminder };
    };
    divide = (value) => {
        if (value instanceof coefficients_1.Fraction) {
            return this.divideByFraction(value);
        }
        else if (typeof value === 'number' && Number.isSafeInteger(value)) {
            return this.divideByInteger(value);
        }
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
    static addToken = (stack, element) => {
        switch (element.tokenType) {
            case shutingyard_1.ShutingyardType.COEFFICIENT:
                stack.push(new Polynom(element.token));
                break;
            case shutingyard_1.ShutingyardType.VARIABLE:
                stack.push(new Polynom().add(new monom_1.Monom(element.token)));
                break;
            case shutingyard_1.ShutingyardType.CONSTANT:
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
                                stack.push(a.pow(b.monoms[0].coefficient.value));
                            }
                            else {
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
                    console.log('Stack size: ', stack.length);
                    if (element.token === '-') {
                        stack.push(stack.pop().opposed());
                    }
                    else {
                        console.log('While parsing, cannot apply ', element.token, 'to', stack[0].tex);
                    }
                }
                break;
            case shutingyard_1.ShutingyardType.MONOM:
                console.error('The monom token should not appear here');
                break;
            case shutingyard_1.ShutingyardType.FUNCTION:
                console.log('The function token should not appear here - might be introduced later.');
                break;
        }
    };
    shutingYardToReducedPolynom = (inputStr) => {
        const SY = new shutingyard_1.Shutingyard().parse(inputStr);
        const rpn = SY.rpn;
        this.zero();
        let stack = [], monom = new monom_1.Monom();
        for (const element of rpn) {
            Polynom.addToken(stack, element);
        }
        if (stack.length === 1) {
            this.add(stack[0]);
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
}
exports.Polynom = Polynom;
//# sourceMappingURL=polynom.js.map