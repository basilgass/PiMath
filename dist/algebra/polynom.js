import { ShutingYard, ShutingyardType } from 'piexpression/lib';
import { Fraction } from "../coefficients/fraction";
import { Numeric } from '../numeric';
import { Equation } from "./equation";
import { EquationSolver } from './equationSolver';
import { Monom } from './monom';
export class Polynom {
    #factors;
    #monoms;
    constructor(polynomString, ...values) {
        this.#monoms = [];
        this.#factors = [];
        if (polynomString !== undefined) {
            this.parse(polynomString, ...values);
        }
        return this;
    }
    parse = (inputStr, ...values) => {
        this.#monoms = [];
        this.#factors = [];
        if (typeof inputStr === 'string') {
            return this._parseString(inputStr, ...values);
        }
        else if ((typeof inputStr === 'number' || inputStr instanceof Fraction || inputStr instanceof Monom)
            && (values.length === 0)) {
            this.#monoms.push(new Monom(inputStr));
        }
        else if (inputStr instanceof Monom && values.length > 0) {
            this.#monoms.push(new Monom(inputStr));
            values.forEach(m => {
                this.#monoms.push(new Monom(m));
            });
        }
        else if (inputStr instanceof Polynom) {
            for (const m of inputStr.monoms) {
                this.#monoms.push(m.clone());
            }
        }
        return this;
    };
    clone = () => {
        const P = new Polynom();
        const M = [];
        for (const m of this.#monoms) {
            M.push(m.clone());
        }
        P.monoms = M;
        return P;
    };
    add = (...values) => {
        for (const value of values) {
            if (value instanceof Polynom) {
                this.#monoms = this.#monoms.concat(value.monoms);
            }
            else if (value instanceof Monom) {
                this.#monoms.push(value.clone());
            }
            else if (typeof value === "number" && Number.isSafeInteger(value)) {
                this.#monoms.push(new Monom(value.toString()));
            }
            else {
                this.#monoms.push(new Monom(value));
            }
        }
        return this.reduce();
    };
    commonMonom = () => {
        const M = new Monom().one();
        const numerator = this.gcdNumerator();
        const denominator = this.gcdDenominator();
        const degree = this.degree();
        M.coefficient = new Fraction(numerator, denominator);
        for (const L of this.variables) {
            M.setLetter(L, degree);
            for (const m of this.#monoms) {
                M.setLetter(L, Fraction.min(m.degree(L), M.degree(L)));
                if (M.degree(L).isZero()) {
                    break;
                }
            }
        }
        return M;
    };
    degree = (letter) => {
        let d = new Fraction().zero();
        for (const m of this.#monoms) {
            d = Fraction.max(m.degree(letter).value, d);
        }
        return d;
    };
    derivative = (letter) => {
        const dP = new Polynom();
        for (const m of this.#monoms) {
            dP.add(m.derivative(letter));
        }
        return dP;
    };
    divide = (value) => {
        if (value instanceof Fraction) {
            return this._divideByFraction(value);
        }
        else if (typeof value === 'number' && Number.isSafeInteger(value)) {
            return this._divideByInteger(value);
        }
        else if (value instanceof Monom) {
            return this.divide(new Polynom(value));
        }
        else if (value instanceof Polynom) {
            if (value.monoms.length === 1 && value.variables.length === 0) {
                return this._divideByFraction(value.monoms[0].coefficient);
            }
            else {
                const { quotient, reminder } = this.euclidean(value);
                if (reminder.isZero()) {
                    return quotient;
                }
            }
        }
        throw new Error('Cannot divide by ${value.toString}');
    };
    empty = () => {
        this.#monoms = [];
        return this;
    };
    euclidean = (P) => {
        const letter = P.variables[0];
        const quotient = new Polynom().zero();
        const reminder = this.clone().reorder(letter);
        if (P.variables.length === 0) {
            const q = this.clone().divide(P);
            return {
                quotient: q.reduce(),
                reminder: new Polynom().zero()
            };
        }
        const maxMP = P.monomByDegree(undefined, letter);
        const degreeP = P.degree(letter);
        let newM;
        let MaxIteration = this.degree(letter).value * 2;
        while (reminder.degree(letter).isGeq(degreeP) && MaxIteration > 0) {
            MaxIteration--;
            newM = reminder.monomByDegree(undefined, letter).clone().divide(maxMP);
            if (newM.isZero()) {
                continue;
            }
            quotient.add(newM);
            reminder.subtract(P.clone().multiply(newM)).reduce();
            if (newM.degree(letter).isZero()) {
                break;
            }
        }
        quotient.reduce();
        reminder.reduce();
        return { quotient, reminder };
    };
    evaluate = (values, asNumeric) => {
        if (asNumeric) {
            return this._evaluateAsNumeric(values);
        }
        const r = new Fraction().zero();
        this.#monoms.forEach(monom => {
            r.add(monom.evaluate(values, asNumeric));
        });
        return r;
    };
    factorize = (letter) => {
        let factors = [];
        let P = this.clone().reorder();
        const M = P.commonMonom();
        if (P.monomByDegree().coefficient.isStrictlyNegative() && M.coefficient.isStrictlyPositive() && !M.isOne()) {
            M.opposite();
        }
        if (!M.isOne()) {
            const tempPolynom = new Polynom(M);
            factors = [tempPolynom.clone()];
            P = P.euclidean(tempPolynom).quotient;
        }
        let securityLoop = P.degree().clone().multiply(2).value, maxDegree = 1;
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
                let allDividers = this._getAllPotentialFactors(P, maxDegree, letter ?? 'x');
                maxDegree = P.degree(letter).value;
                while (allDividers.length > 0) {
                    const div = allDividers[0];
                    if (!P.isDividableBy(div)) {
                        allDividers.shift();
                    }
                    else {
                        const result = P.euclidean(div);
                        factors.push(div);
                        P = result.quotient.clone();
                        allDividers = allDividers.filter(x => {
                            const pX = P.monoms[0], pC = P.monoms[P.monoms.length - 1], dX = x.monoms[0], dC = x.monoms[x.monoms.length - 1];
                            if (!pC.isDivisible(dC)) {
                                return false;
                            }
                            return pX.isDivisible(dX);
                        });
                    }
                }
            }
        }
        if (!P.isOne()) {
            factors.push(P.clone());
        }
        this.#factors = factors;
        return this.#factors;
    };
    gcdDenominator = () => {
        return Numeric.gcd(...this.getDenominators());
    };
    gcdNumerator = () => {
        return Numeric.gcd(...this.getNumerators());
    };
    getDenominators = () => {
        const denominators = [];
        for (const m of this.#monoms) {
            denominators.push(m.coefficient.denominator);
        }
        return denominators;
    };
    getNumerators = () => {
        const numerators = [];
        for (const m of this.#monoms) {
            numerators.push(m.coefficient.numerator);
        }
        return numerators;
    };
    getZeroes = () => {
        return new EquationSolver(new Equation(this, 0)).solve();
    };
    hasVariable(letter) {
        return this.variables.includes(letter);
    }
    integrate = (a, b, letter = 'x') => {
        const primitive = this.primitive(letter);
        const valuesA = {}, valuesB = {};
        valuesA[letter] = new Fraction(a);
        valuesB[letter] = new Fraction(b);
        return primitive.evaluate(valuesB).subtract(primitive.evaluate(valuesA));
    };
    inverse() {
        return undefined;
    }
    isDeveloped = (polynomString) => {
        let P;
        const pString = polynomString.replaceAll(/\^\(([-0-9/]+)\)/g, '$1');
        if (pString.includes('(') || pString.includes(')')) {
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
        return true;
    };
    isDividableBy = (div) => {
        if (div.degree().isOne()) {
            const zero = div.getZeroes()[0];
            if (zero.exact instanceof Fraction) {
                return this.evaluate(zero.exact).isZero();
            }
            else {
                return false;
            }
        }
        else {
            const { reminder } = this.euclidean(div);
            return reminder.isZero();
        }
    };
    isEqual = (P) => {
        return this._compare(P, '=');
    };
    isOne() {
        return this.#monoms.length === 1 && this.#monoms[0].coefficient.isOne();
    }
    isOppositeAt = (P) => {
        return this._compare(P.clone().opposite(), '=');
    };
    isReduced = (polynomString) => {
        if (!this.isDeveloped(polynomString)) {
            return false;
        }
        const P = new Polynom(polynomString);
        if (P.monoms.length > this.monoms.length) {
            return false;
        }
        for (const m of P.monoms) {
            if (!m.coefficient.isReduced()) {
                return false;
            }
        }
        return false;
    };
    isSameAs = (P) => {
        return this._compare(P, 'same');
    };
    isZero() {
        return (this.#monoms.length === 1 && this.#monoms[0].coefficient.isZero()) || this.#monoms.length === 0;
    }
    lcmDenominator = () => {
        return Numeric.lcm(...this.getDenominators());
    };
    lcmNumerator = () => {
        return Numeric.lcm(...this.getNumerators());
    };
    letters = () => {
        let S = new Set();
        for (const m of this.#monoms) {
            S = new Set([...S, ...m.variables]);
        }
        return [...S];
    };
    limitToInfinity = (letter) => {
        const M = this.monomByDegree(undefined, letter), sign = M.coefficient.sign(), degree = M.degree(letter);
        if (degree.isStrictlyPositive()) {
            return sign === 1 ? (new Fraction()).infinite() : (new Fraction()).infinite().opposite();
        }
        else if (degree.isZero()) {
            return M.coefficient;
        }
        return (new Fraction()).zero();
    };
    limitToNegativeInfinity = (letter) => {
        const M = this.monomByDegree(undefined, letter), sign = M.coefficient.sign(), degree = M.degree(letter);
        if (degree.isStrictlyPositive()) {
            return sign === -1 ? (new Fraction()).infinite() : (new Fraction()).infinite().opposite();
        }
        else if (degree.isZero()) {
            return M.coefficient;
        }
        return (new Fraction()).zero();
    };
    monomByDegree = (degree, letter) => {
        if (degree === undefined) {
            return this.monomByDegree(this.degree(letter), letter);
        }
        const M = this.clone().reduce();
        for (const m of M.#monoms) {
            if (m.degree(letter).isEqual(degree)) {
                return m.clone();
            }
        }
        return new Monom().zero();
    };
    monomByLetter = (letter) => {
        const M = this.clone().reduce();
        for (const m of M.#monoms) {
            if (m.hasVariable(letter)) {
                return m.clone();
            }
        }
        return new Monom().zero();
    };
    monomsByDegree = (degree, letter) => {
        if (degree === undefined) {
            return this.monomsByDegree(this.degree(letter));
        }
        const Ms = [];
        const M = this.clone().reduce();
        for (const m of M.#monoms) {
            if (m.degree(letter) === degree) {
                Ms.push(m.clone());
            }
        }
        return Ms;
    };
    multiply = (value) => {
        if (value instanceof Polynom) {
            return this._multiplyByPolynom(value);
        }
        else if (value instanceof Fraction) {
            return this._multiplyByFraction(value);
        }
        else if (value instanceof Monom) {
            return this._multiplyByMonom(value);
        }
        else if (Number.isSafeInteger(value) && typeof value === 'number') {
            return this._multiplyByInteger(value);
        }
        return this;
    };
    one = () => {
        this.#monoms = [];
        this.#monoms.push(new Monom().one());
        return this;
    };
    opposite = () => {
        this.#monoms = this.#monoms.map(m => m.opposite());
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
    primitive = (letter) => {
        const dP = new Polynom();
        for (const m of this.#monoms) {
            dP.add(m.primitive(letter));
        }
        return dP;
    };
    reduce = () => {
        let i = 0;
        while (i < this.#monoms.length) {
            for (let j = i + 1; j < this.#monoms.length; j++) {
                if (this.#monoms[i].isSameAs(this.#monoms[j])) {
                    this.#monoms[i].add(this.#monoms[j]);
                    this.#monoms.splice(j, 1);
                    if (this.#monoms[i].isZero()) {
                        this.#monoms[i] = new Monom().zero();
                    }
                    j--;
                }
            }
            i++;
        }
        this.#monoms = this.#monoms.filter((m) => {
            return !m.coefficient.isZero();
        });
        for (const m of this.#monoms) {
            m.coefficient.reduce();
        }
        if (this.length === 0) {
            return new Polynom().zero();
        }
        return this.reorder();
    };
    reorder = (letter = 'x', revert) => {
        if (revert === undefined) {
            revert = false;
        }
        const otherLetters = this.variables.filter(x => x !== letter);
        this.#monoms.sort(function (a, b) {
            const da = a.degree(letter).value, db = b.degree(letter).value;
            if (da !== db) {
                return revert ? da - db : db - da;
            }
            if (otherLetters.length > 0) {
                for (const L of otherLetters) {
                    const da = a.degree(L).value, db = b.degree(L).value;
                    if (da !== db) {
                        return revert ? da - db : db - da;
                    }
                }
            }
            return 0;
        });
        return this;
    };
    replaceBy = (letter, P) => {
        let pow;
        const resultPolynom = new Polynom().zero();
        for (const m of this.monoms) {
            if (!m.hasVariable(letter) || m.literal[letter].isZero()) {
                resultPolynom.add(m.clone());
            }
            else {
                pow = m.literal[letter].clone();
                m.removeVariable(letter);
                resultPolynom.add(P.clone().pow(Math.abs(pow.numerator)).multiply(m));
            }
        }
        this.#monoms = resultPolynom.reduce().monoms;
        return this;
    };
    root() {
        throw new Error('Cannot take the root from a polynom');
    }
    sqrt() {
        throw new Error('Cannot take the square root from a polynom');
    }
    subtract = (...values) => {
        for (const value of values) {
            if (value instanceof Polynom) {
                this.add(value.clone().opposite());
            }
            else if (value instanceof Monom) {
                this.#monoms.push(value.clone().opposite());
            }
            else {
                this.#monoms.push(new Monom(value).opposite());
            }
        }
        return this.reduce();
    };
    zero = () => {
        this.#monoms = [];
        this.#monoms.push(new Monom().zero());
        return this;
    };
    get display() {
        return this.genDisplay();
    }
    get isMultiVariable() {
        return this.#monoms.some(m => m.variables.length > 1);
    }
    get length() {
        return this.#monoms.length;
    }
    get monoms() {
        return this.#monoms;
    }
    set monoms(M) {
        this.#monoms = M;
    }
    get numberOfVars() {
        return this.variables.length;
    }
    get plotFunction() {
        return this.genDisplay('tex', false, false, true);
    }
    get tex() {
        return this.genDisplay('tex');
    }
    get variables() {
        let V = [];
        for (const m of this.#monoms) {
            V = V.concat(m.variables);
        }
        V = [...new Set(V)];
        V.sort();
        return V;
    }
    get zeroes() {
        return this.getZeroes();
    }
    _compare = (P, sign) => {
        if (sign === undefined) {
            sign = '=';
        }
        const cP1 = this.clone().reduce();
        const cP2 = P.clone().reduce();
        switch (sign) {
            case '=':
                if (cP1.length !== cP2.length || cP1.degree().isNotEqual(cP2.degree())) {
                    return false;
                }
                return cP1.monoms
                    .every((m1, index) => m1.isEqual(cP2.monoms[index]));
            case 'same':
                if (cP1.length !== cP2.length || !cP1.degree().isEqual(cP2.degree())) {
                    return false;
                }
                return cP1.monoms
                    .every((m1, index) => m1.isSameAs(cP2.monoms[index]));
            default:
                return false;
        }
    };
    _divideByFraction = (F) => {
        for (const m of this.#monoms) {
            m.coefficient.divide(F);
        }
        return this;
    };
    _divideByInteger = (nb) => {
        const nbF = new Fraction(nb);
        for (const m of this.#monoms) {
            m.coefficient.divide(nbF);
        }
        return this;
    };
    _evaluateAsNumeric = (values) => {
        let r = 0;
        this.#monoms.forEach(monom => {
            r += monom.evaluate(values, true);
        });
        return r;
    };
    _factorize2ndDegree = (letter) => {
        let P1, P2, a, b, c, delta, x1, x2, factor;
        if (this.numberOfVars === 1) {
            a = this.monomByDegree(2, letter).coefficient;
            b = this.monomByDegree(1, letter).coefficient;
            c = this.monomByDegree(0, letter).coefficient;
            delta = b.clone().pow(2).subtract(a.clone().multiply(c).multiply(4));
            if (delta.isZero()) {
                x1 = b.clone().opposite().divide(a.clone().multiply(2));
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
                x1 = b.clone().opposite()
                    .add(delta.clone().sqrt())
                    .divide(a.clone().multiply(2));
                x2 = b.clone().opposite()
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
                    const xPolynom = new Polynom('x', a.coefficient, b.coefficient, c.coefficient);
                    const xFactors = xPolynom._factorize2ndDegree('x');
                    const factors = [];
                    let xyzPolynom;
                    if (xFactors.length >= 2) {
                        for (const p of xFactors) {
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
    _getAllPotentialFactors = (P, maxDegree, letter) => {
        const m1 = P.monoms[0].dividers, m2 = P.monoms[P.monoms.length - 1].dividers;
        const allDividers = [];
        m1.forEach(m1d => {
            if (m1d.degree(letter).isLeq(maxDegree)) {
                m2.forEach(m2d => {
                    if (m1d.degree(letter).isNotEqual(m2d.degree(letter))) {
                        allDividers.push(new Polynom(m1d, m2d));
                        allDividers.push(new Polynom(m1d, m2d.clone().opposite()));
                    }
                });
            }
        });
        return allDividers;
    };
    _multiplyByFraction = (F) => {
        for (const m of this.#monoms) {
            m.coefficient.multiply(F);
        }
        return this.reduce();
    };
    _multiplyByInteger = (nb) => {
        return this._multiplyByFraction(new Fraction(nb));
    };
    _multiplyByMonom = (M) => {
        for (const m of this.#monoms) {
            m.multiply(M);
        }
        return this.reduce();
    };
    _multiplyByPolynom = (P) => {
        const M = [];
        for (const m1 of this.#monoms) {
            for (const m2 of P.monoms) {
                M.push(Monom.xMultiply(m1, m2));
            }
        }
        this.#monoms = M;
        return this.reduce();
    };
    _parseString(inputStr, ...values) {
        if (values.length === 0) {
            inputStr = '' + inputStr;
            if (inputStr !== '' && !isNaN(Number(inputStr))) {
                this.empty();
                const m = new Monom(inputStr);
                this.add(m);
                return this;
            }
            return this._shutingYardToReducedPolynom(inputStr);
        }
        else if (/^[a-z]+/.test(inputStr)) {
            this.empty();
            const fractions = values.map(x => new Fraction(x));
            if (inputStr.length > 1) {
                const letters = inputStr.split('');
                let i = 0;
                for (const F of fractions) {
                    const m = new Monom();
                    m.coefficient = F.clone();
                    m.literalStr = letters[i] || '';
                    this.add(m);
                    i++;
                }
            }
            else {
                let n = fractions.length - 1;
                for (const F of fractions) {
                    const m = new Monom();
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
    _shutingYard_addToken = (stack, element) => {
        switch (element.tokenType) {
            case ShutingyardType.COEFFICIENT:
                stack.push(new Polynom(element.token));
                break;
            case ShutingyardType.VARIABLE:
                stack.push(new Polynom().add(new Monom(element.token)));
                break;
            case ShutingyardType.CONSTANT:
                console.log('Actually, not supported - will be added later !');
                break;
            case ShutingyardType.OPERATION:
                if (stack.length >= 2) {
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        break;
                    }
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
                            console.error('Cannot elevate a polynom with another polynom !', a.tex, b.tex);
                        }
                        else if (b.monoms[0].coefficient.isRelative()) {
                            stack.push(a.pow(b.monoms[0].coefficient.value));
                        }
                        else {
                            if (a.monoms.length === 1 && a.monoms[0].coefficient.isOne()) {
                                for (const letter in a.monoms[0].literal) {
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
                else if (element.token === '-') {
                    const a = stack.pop();
                    if (a) {
                        stack.push(a.opposite());
                    }
                }
                else {
                    throw new Error("Error parsing the polynom");
                }
                break;
            case ShutingyardType.MONOM:
                console.error('The monom token should not appear here');
                break;
            case ShutingyardType.FUNCTION:
                console.error('The function token should not appear here - might be introduced later.');
                break;
        }
    };
    genDisplay = (output, forceSign, wrapParentheses, withAllMultiplicationSign) => {
        let P = '';
        for (const k of this.#monoms) {
            if (k.coefficient.value === 0) {
                continue;
            }
            let m;
            if (withAllMultiplicationSign) {
                m = k.plotFunction;
            }
            else {
                m = (output === 'tex') ? k.tex : k.display;
            }
            P += `${(k.coefficient.sign() === 1 && (P !== '' || forceSign === true)) ? '+' : ''}${m}`;
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
    _shutingYardToReducedPolynom = (inputStr) => {
        const SY = new ShutingYard().parse(inputStr);
        const rpn = SY.rpn;
        this.zero();
        const stack = [];
        for (const element of rpn) {
            this._shutingYard_addToken(stack, element);
        }
        if (stack.length === 1) {
            this.add(stack[0]);
        }
        return this.reorder();
    };
}
//# sourceMappingURL=polynom.js.map