"use strict";
/**
 * Polynom module contains everything necessary to handle polynoms.*
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polynom = void 0;
const monom_1 = require("./monom");
const shutingyard_1 = require("../shutingyard");
const numeric_1 = require("../numeric");
const fraction_1 = require("../coefficients/fraction");
const equation_1 = require("./equation");
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
        this.mark_as_dirty = () => {
            this.dirty_factors = true;
            this.dirty_zeroes = true;
            this.euclidianCache = {};
        };
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
                                console.error('Cannot elevate a polynom with another polynom !', a.tex, b.tex);
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
        // Creation / parsing functions
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
            this.mark_as_dirty();
            // TODO: allow to enter a liste of Fraction (a, b, c, ...) to make a polynom ax^n + bx^(n-1) + cx^(n-2) + ...
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
            this.mark_as_dirty();
            return this;
        };
        this.one = () => {
            this._monoms = [];
            this._monoms.push(new monom_1.Monom().one());
            this._rawString = '1';
            this.mark_as_dirty();
            return this;
        };
        this.empty = () => {
            this._monoms = [];
            this._rawString = '';
            this.mark_as_dirty();
            return this;
        };
        // ------------------------------------------
        this.opposed = () => {
            this._monoms = this._monoms.map(m => m.opposed());
            this.mark_as_dirty();
            return this;
        };
        // ------------------------------------------
        // Mathematical operations
        this.add = (...values) => {
            this.mark_as_dirty();
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
        this.subtract = (...values) => {
            this.mark_as_dirty();
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
            this.mark_as_dirty();
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
            if (this.euclidianCache[P.tex] !== undefined) {
                return this.euclidianCache[P.tex];
            }
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
            this.mark_as_dirty();
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
            this.mark_as_dirty();
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
        // ------------------------------------------
        // Compare functions
        this.isReduced = (polynomString) => {
            // The polynom must be developed to be reduced.
            if (!this.isDeveloped(polynomString)) {
                return false;
            }
            let P = new Polynom(polynomString);
            if (P.monoms.length > this.monoms.length) {
                return false;
            }
            // TODO: Not ur the reduced systme checking is working properly !
            for (let m of P.monoms) {
                if (!m.coefficient.isReduced()) {
                    return false;
                }
            }
            return false;
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
            this.mark_as_dirty();
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
        // ------------------------------------------
        // Misc polynoms functions
        this.primitive = (letter) => {
            let dP = new Polynom();
            for (let m of this._monoms) {
                dP.add(m.primitive(letter));
            }
            return dP;
        };
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
            if (!this.dirty_factors) {
                return this._factors;
            }
            let factors = [];
            let P = this.clone().reorder();
            // Extract the common monom
            // 2x^3+6x^2 => 2x^2
            let M = P.commonMonom();
            // If the polynom starts with a negative monom, factorize it.
            if (P.monomByDegree().coefficient.isStrictlyNegative() && M.coefficient.isStrictlyPositive()) {
                M.opposed();
            }
            if (!M.isOne()) {
                let tempPolynom = new Polynom(M);
                factors = [tempPolynom.clone()];
                P = P.euclidian(tempPolynom).quotient;
            }
            // Main loop
            let securityLoop = P.degree().clone().multiply(2).value, maxDegree = 1;
            while (securityLoop >= 0) {
                securityLoop--;
                if (P.monoms.length < 2) {
                    // The polynom has only one monom => 7x^2
                    // No need to continue.
                    if (!P.isOne()) {
                        factors.push(P.clone());
                        P.one();
                    }
                    break;
                }
                else if (P.degree(letter).isOne()) {
                    // The polynom is a first degree polynom => 3x-5
                    // No need to continue
                    factors.push(P.clone());
                    P.one();
                    break;
                }
                else {
                    // Create the list of all "potential" polynom dividers.
                    let allDividers = this._getAllPotentialFactors(P, maxDegree, letter);
                    maxDegree = P.degree(letter).value;
                    // Actually: 100ms
                    while (allDividers.length > 0) {
                        let div = allDividers[0];
                        if (!P.isDividableBy(div)) {
                            // Not dividable. Remove it from the list
                            allDividers.shift();
                        }
                        else {
                            // It's dividable - so make the division
                            let result = P.euclidian(div);
                            // Add the factor
                            factors.push(div);
                            // As it's dividable, get the quotient.
                            P = result.quotient.clone();
                            // filter all dividers that are no more suitable.
                            allDividers = allDividers.filter(x => {
                                let pX = P.monoms[0], pC = P.monoms[P.monoms.length - 1], dX = x.monoms[0], dC = x.monoms[x.monoms.length - 1];
                                // Check last item (degree zero)
                                if (!pC.isDivisible(dC)) {
                                    return false;
                                }
                                // Check the first item (degree max)
                                if (!pX.isDivisible(dX)) {
                                    return false;
                                }
                                return true;
                            });
                        }
                    }
                }
            }
            // Maybe there is still something in the Polynom (not everything was possible to factorize)
            if (!P.isOne()) {
                factors.push(P.clone());
            }
            // Save the factors
            this._factors = factors;
            // The factors list is no more dirty
            this.dirty_factors = false;
            return this._factors;
        };
        this.isDividableBy = (div) => {
            // Quick evaluation.
            if (div.degree().isOne()) {
                let zero = div.getZeroes()[0];
                if (zero.exact instanceof fraction_1.Fraction) {
                    return this.evaluate(zero.exact).isZero();
                }
                else {
                    return false;
                }
            }
            else {
                this.euclidianCache[div.tex] = this.euclidian(div);
                return this.euclidianCache[div.tex].reminder.isZero();
            }
        };
        // TODO: get zeroes for more than first degree and for more than natural degrees
        this.getZeroes = () => {
            if (this.dirty_zeroes) {
                let equ = new equation_1.Equation(this.clone(), 0);
                equ.solve();
                this._zeroes = equ.solutions;
                this.dirty_zeroes = false;
            }
            return this._zeroes;
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
        this._getAllPotentialFactors = (P, maxDegree, letter) => {
            let m1 = P.monoms[0].dividers, m2 = P.monoms[P.monoms.length - 1].dividers;
            let allDividers = [];
            m1.forEach(m1d => {
                // Get only polynom that has a degree less than a specific value
                if (m1d.degree(letter).leq(maxDegree)) {
                    m2.forEach(m2d => {
                        if (m1d.degree(letter).isNotEqual(m2d.degree(letter))) {
                            allDividers.push(new Polynom(m1d, m2d));
                            allDividers.push(new Polynom(m1d, m2d.clone().opposed()));
                        }
                    });
                }
            });
            return allDividers;
        };
        this.genDisplay = (output, forceSign, wrapParentheses, withAllMultSign) => {
            let P = '';
            for (const k of this._monoms) {
                if (k.coefficient.value === 0) {
                    continue;
                }
                // The monom to be displayed
                let m;
                if (withAllMultSign) {
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
            }
        };
        this._factorizeByGroups = () => {
            // TODO: Factorize by groups.
            return [];
        };
        this._monoms = [];
        this._factors = [];
        this.mark_as_dirty();
        if (polynomString !== undefined) {
            this.parse(polynomString, ...values);
        }
        return this;
    }
    get euclidianCache() {
        return this._euclidianCache;
    }
    set euclidianCache(value) {
        this._euclidianCache = value;
    }
    get dirty_zeroes() {
        return this._dirty_zeroes;
    }
    set dirty_zeroes(value) {
        this._dirty_zeroes = value;
    }
    // ------------------------------------------
    get dirty_factors() {
        return this._dirty_factors;
    }
    set dirty_factors(value) {
        this._dirty_factors = value;
    }
    // ------------------------------------------
    get monoms() {
        return this._monoms;
    }
    set monoms(M) {
        this._monoms = M;
    }
    get zeroes() {
        return this.getZeroes();
    }
    get factors() {
        return this.factorize();
    }
    set factors(value) {
        this.mark_as_dirty();
        this._factors = value;
    }
    get texString() {
        return this._texString;
    }
    get texFactors() {
        this.factorize();
        if (this.factors.length <= 1) {
            return this.tex;
        }
        // Build an array of texFactors with the number of similar items.
        let factorsCount = {};
        for (let f of this.factors) {
            if (factorsCount[f.tex] !== undefined) {
                factorsCount[f.tex].degree++;
            }
            else {
                factorsCount[f.tex] = {
                    degree: 1,
                    factor: f
                };
            }
        }
        // First round to put the 'monom' first
        let simpleFactor = new Polynom().one();
        for (let item of Object.values(factorsCount).filter(item => item.factor.monoms.length === 1)) {
            simpleFactor.multiply(item.factor);
        }
        let tex = simpleFactor.isOne() ? '' : simpleFactor.tex;
        // Loop through all factors that contains at least 2 monoms.
        for (let item of Object.values(factorsCount).filter(item => item.factor.monoms.length > 1)) {
            if (item.factor.length > 1) {
                tex += `\\left( ${item.factor.tex} \\right)${item.degree > 1 ? '^{ ' + item.degree + ' }' : ''}`;
            }
        }
        return tex;
    }
    get displayFactors() {
        this.factorize();
        if (this.factors.length <= 1) {
            return this.display;
        }
        // Build an array of texFactors with the number of similar items.
        let factorsCount = {};
        for (let f of this.factors) {
            if (factorsCount[f.display] !== undefined) {
                factorsCount[f.display].degree++;
            }
            else {
                factorsCount[f.display] = {
                    degree: 1,
                    factor: f
                };
            }
        }
        // First round to put the 'monom' first
        let simpleFactor = new Polynom().one();
        for (let item of Object.values(factorsCount).filter(item => item.factor.monoms.length === 1)) {
            simpleFactor.multiply(item.factor);
        }
        let display = simpleFactor.isOne() ? '' : simpleFactor.display;
        // Loop through all factors that contains at least 2 monoms.
        for (let item of Object.values(factorsCount).filter(item => item.factor.monoms.length > 1)) {
            if (item.factor.length > 1) {
                display += `(${item.factor.display})${item.degree > 1 ? '^(' + item.degree + ')' : ''}`;
            }
        }
        return display.replaceAll(' ', '');
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
    get plotFunction() {
        return this.genDisplay('tex', false, false, true);
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
//# sourceMappingURL=polynom.js.map