/**
 * Polynom module contains everything necessary to handle polynoms.*
 */

import {literalType, Monom} from './monom';
import {Shutingyard} from '../shutingyard';
import {Numeric} from '../numeric';
import {Random, randomPolynomConfig} from "../random";
import {Fraction} from "../coefficients";

/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 * ```
 * let P = new Polynom('3x-4')
 * ```
 */
export class Polynom {
    private _rawString: string;
    private _monoms: Monom[];
    private _factors: Polynom[];
    private _texString: string;

    /**
     *
     * @param {string} polynomString (optional) Default polynom to parse on class creation
     * @param values
     */
    constructor(polynomString?: string, ...values: unknown[]) {
        this._monoms = [];
        this._factors = [];
        if (polynomString !== undefined) {
            this.parse(polynomString, ...values);
        }
        return this;
    }

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get monoms() {
        return this._monoms;
    }

    set monoms(M: Monom[]) {
        this._monoms = M;
    }

    get factors(): Polynom[] {
        return this._factors;
    }

    set factors(value: Polynom[]) {
        this._factors = value;
    }

    get texFactors(): string {
        this.factorize()

        let tex = ''
        for (let f of this.factors) {
            if (f.monoms.length > 1) {
                tex += `(${f.tex})`
            } else {
                tex = f.tex + tex;
            }
        }
        return tex;
    }

    get texString(): string {
        return this._texString;
    }

    get length() {
        // TODO: Must reduce the monoms list to remove the zero coefficient.
        return this._monoms.length;
    }

    get display(): string {
        return this.genDisplay();
    }

    get raw(): string {
        return this._rawString
    }

    get tex(): string {
        return this.genDisplay('tex');
    }

    get isMultiVariable(): boolean {
        const B = false;
        for (const m of this._monoms) {
            if (m.variables.length > 1) {
                return true;
            }
        }
        return B;
    }

    get variables(): string[] {
        let V: string[] = [];

        for (const m of this._monoms) {
            V = V.concat(m.variables);
        }

        // Remove duplicates.
        V = [...new Set(V)];

        return V;
    }

    get numberOfVars(): number {
        return this.variables.length;
    }

    private genDisplay = (output?: string, forceSign?: boolean, wrapParentheses?: boolean): string => {
        let P: string = '';

        for (const k of this._monoms) {
            if (k.coefficient.value === 0) {
                continue;
            }

            P += `${(k.coefficient.sign() === 1 && (P !== '' || forceSign === true)) ? '+' : ''}${(output === 'tex') ? k.tex : k.display}`;
        }

        if (wrapParentheses === true && this.length > 1) {
            if (output === 'tex') {
                P = `\\left( ${P} \\right)`;
            } else {
                P = `(${P})`;
            }
        }

        if (P === '') {
            P = '0';
        }
        return P;
    };


    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values: as string, numbers or fractions
     */
    parse = (inputStr: string, ...values: unknown[]): Polynom => {

        if (values === undefined || values.length === 0) {
            inputStr = '' + inputStr;
            this._rawString = inputStr;

            // Parse the polynom using the shuting yard algorithm
            if (inputStr !== '' && !isNaN(Number(inputStr))) {
                this.empty();
                // It's a simple number.
                let m = new Monom(inputStr);
                // m.coefficient = new Fraction(inputStr);
                // m.literalStr = '';
                this.add(m);
                return this;
            }

            // Parse the string.
            return this.shutingYardToReducedPolynom(inputStr);
        } else if (/^[a-z]/.test(inputStr)) {
            // We assume the inputStr contains only letters.
            this.empty();

            let fractions = values.map(x => new Fraction(x));
            // Multiple setLetter version
            if (inputStr.length > 1) {
                // TODO: check that the number of values given correspond to the letters (+1 eventually)
                let letters = inputStr.split(''),
                    i = 0;
                for (let F of fractions) {
                    let m = new Monom();
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
                    let m = new Monom()
                    m.coefficient = F.clone();
                    m.literalStr = `${inputStr}^${n}`
                    this.add(m);
                    n--;
                }
            }
            return this;
        } else {
            return this.zero();
        }

    };

    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    private shutingYardToReducedPolynom = (inputStr: string): Polynom => {
        // Get the RPN array of the current expression
        const SY: Shutingyard = new Shutingyard().parse(inputStr);
        const rpn: { token: string, tokenType: string }[] = SY.rpn;
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
        return this;
    }

    /**
     * Clone the polynom
     */
    clone = (): Polynom => {
        const P = new Polynom();
        const M: Monom[] = [];

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
    zero = (): Polynom => {
        this._monoms = [];
        this._monoms.push(new Monom().zero());
        this._rawString = '0';
        return this;
    };

    one = (): Polynom => {
        this._monoms = [];
        this._monoms.push(new Monom().one());
        this._rawString = '1';
        return this;
    }

    empty = (): Polynom => {
        this._monoms = [];
        this._rawString = '';
        return this;
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
    // ------------------------------------------
    opposed = (): Polynom => {
        this._monoms = this._monoms.map(m => m.opposed());
        return this;
    };

    add = (...values: unknown[]): Polynom => {

        for (let value of values) {
            if (value instanceof Polynom) {
                this._monoms = this._monoms.concat(value.monoms);
            } else if (value instanceof Monom) {
                this._monoms.push(value.clone());
            } else if (Number.isSafeInteger(value)) {
                this._monoms.push(new Monom(value.toString()));
            } else {
                this._monoms.push(new Monom(value));
            }
        }

        return this.reduce();
    };

    subtract = (...values: unknown[]): Polynom => {

        for (let value of values) {
            if (value instanceof Polynom) {
                this._monoms = this._monoms.concat(value.clone().opposed().monoms);
            } else if (value instanceof Monom) {
                this._monoms.push(value.clone().opposed());
            } else if (Number.isSafeInteger(value)) {
                this._monoms.push(new Monom(value.toString()).opposed());
            } else {
                this._monoms.push(new Monom(value).opposed());
            }
        }

        return this.reduce();
    };

    multiply = (value: unknown): Polynom => {
        if (value instanceof Polynom) {
            return this.multiplyByPolynom(value);
        } else if (value instanceof Fraction) {
            return this.multiplyByFraction(value);
        } else if (value instanceof Monom) {
            return this.multiplyByMonom(value);
        } else if (Number.isSafeInteger(value) && typeof value==='number') {
            return this.multiplyByInteger(value);
        }

        // Something went wrong...
        return this;
    }

    private multiplyByPolynom = (P: Polynom): Polynom => {
        const M: Monom[] = [];
        for (const m1 of this._monoms) {
            for (const m2 of P.monoms) {
                M.push(Monom.xmultiply(m1, m2));
            }
        }

        this._monoms = M;
        return this.reduce();
    };

    private multiplyByFraction = (F: Fraction): Polynom => {
        for (const m of this._monoms) {
            m.coefficient.multiply(F);
        }

        return this.reduce();
    };

    private multiplyByInteger = (nb: number): Polynom => {
        return this.multiplyByFraction(new Fraction(nb));
    };

    private multiplyByMonom = (M: Monom): Polynom => {
        for (const m of this._monoms) {
            m.multiply(M)
        }
        return this.reduce();
    };

    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    euclidian = (P: Polynom): { quotient: Polynom, reminder: Polynom } => {
        const letter: string = P.variables[0];
        const quotient: Polynom = new Polynom().zero();
        const reminder: Polynom = this.clone().reorder(letter);

        // There is no variable !
        if (P.variables.length === 0) {
            return {quotient, reminder}
        }

        // Get at least a letter

        const maxMP: Monom = P.monomByDegree(undefined, letter);
        const degreeP: Fraction = P.degree(letter);

        let newM: Monom;

        // Make the euclidian division of the two polynoms.
        let MaxIteration = this.degree(letter).clone().multiply(2);
        while (reminder.degree(letter) >= degreeP && MaxIteration.isPositive()) {
            MaxIteration.subtract(1)

            // Get the greatest monom divided by the max monom of the divider
            newM = reminder.monomByDegree(undefined, letter).clone().divide(maxMP);

            if (newM.isZero()) {
                break;
            }

            // Get the new quotient and reminder.
            quotient.add(newM);
            reminder.subtract(P.clone().multiply(newM));
        }

        return {quotient, reminder};
    };

    divide = (value: unknown): Polynom => {
        if (value instanceof Fraction) {
            this.divideByFraction(value);
        } else if (typeof value==='number' && Number.isSafeInteger(value)) {
            return this.divideByInteger(value);
        }
    }

    private divideByInteger = (nb: number): Polynom => {
        const nbF = new Fraction(nb);
        for (const m of this._monoms) {
            m.coefficient.divide(nbF);
        }
        return this;
    };

    private divideByFraction = (F: Fraction): Polynom => {
        for (const m of this._monoms) {
            m.coefficient.divide(F);
        }
        return this;
    };

    pow = (nb: number): Polynom => {
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
    // Compare functions
    // ------------------------------------------
    /**
     * Compare the current coefficient with another coefficient
     * @param P
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    compare = (P: Polynom, sign?: string): boolean => {
        if (sign === undefined) {
            sign = '='
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

    isZero(): boolean {
        return (this._monoms.length === 1 && this._monoms[0].coefficient.isZero()) || this._monoms.length === 0;
    }

    isOne(): boolean {
        return this._monoms.length === 1 && this._monoms[0].coefficient.isOne();
    }

    isEqual = (P: Polynom): boolean => {
        return this.compare(P, '=');
    };

    isSameAs = (P: Polynom): boolean => {
        return this.compare(P, 'same');
    };

    isOpposedAt = (P: Polynom): boolean => {
        return this.compare(P.clone().opposed(), '=');
    };

    isFactorized = (polynomString: string): boolean => {
        let P;

        // Check if polynom is complete...
        if (polynomString.match(/\(/g).length !== polynomString.match(/\)/g).length) {
            return false
        }

        // Try to build the polynom
        try {
            P = new Polynom(polynomString);
        } catch (e) {
            return false;
        }

        // Both polynom aren't the same (once developed and reduced => they cannot be equivalent)
        if (!this.isEqual(P)) {
            return false;
        }

        // Check if the provided (string) version is fully factorized.
        // Run a regex on the string.
        let polynomStringNormalized = polynomString.replaceAll('*', ''),
            polynomStringReduced = '' + polynomStringNormalized,
            factors: string[] = [];

        for (let x of polynomStringNormalized.matchAll(/\(([a-z0-9+\-]+)\)(\^[0-9]*)?/g)) {
            if (x[2] !== undefined) {
                for (let i = 0; i < +x[2].substr(1); i++) {
                    factors.push(x[1])
                }
            } else {
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
                } else if (f.isOpposedAt(polyFactors[i])) {
                    polyFactors.splice(i, 1);
                    sign = -sign;
                    break;
                }
            }
        }

        // The polyfactors must be empty and the cumulative opposite factors must be 1.
        return (polyFactors.length === 0 && sign === 1);
    }

    isDeveloped = (polynomString: string): Boolean => {
        let P: Polynom;

        // There is at least one parenthese - it is not developed.
        if (polynomString.match(/\(/g).length + polynomString.match(/\)/g).length) {
            return false
        }

        // Try to build the polynom
        try {
            // Build the polynom
            P = new Polynom(polynomString);
        } catch (e) {
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
        let polynomStringNormalized = polynomString.replaceAll('[*\s]', '')

        // Determine if it's the exact same string.
        // TODO: Maybe it's enough to just make this test !
        return polynomStringNormalized === P.reduce().reorder().display
    }
    // ------------------------------------------
    // Misc polynoms functions
    // -------------------------------------
    reduce = (): Polynom => {
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
            return m.coefficient.value !== 0
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

    reorder = (letter: string = 'x'): Polynom => {
        // TODO: Must handle multiple setLetter reorder system
        this._monoms.sort(function (a, b) {
            return b.degree(letter).clone().subtract(a.degree(letter)).value
        });
        return this.reduce();
    };

    degree = (letter?: string): Fraction => {
        let d: Fraction = new Fraction().zero();
        for (const m of this._monoms) {
            d = Fraction.max(m.degree(letter).value, d);
        }
        return d;
    };

    letters = (): string[] => {
        let L: string[] = [], S = new Set();

        for (let m of this._monoms) {
            S = new Set([...S, ...m.variables]);
        }

        // @ts-ignore
        return [...S];
    }

    /**
     * Replace a variable (letter) by a polynom.
     * @param letter
     * @param P
     */
    replaceBy = (letter: string, P: Polynom): Polynom => {
        let pow: Fraction;
        const resultPolynom: Polynom = new Polynom().zero();

        for (const m of this.monoms) {
            if (m.literal[letter] === undefined || m.literal[letter].isZero()) {
                resultPolynom.add(m.clone());
            } else {
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
    evaluate = (values: literalType | Fraction | number): Fraction => {
        const r = new Fraction().zero();

        this._monoms.forEach(monom => {
            //console.log('Evaluate polynom: ', monom.display, values, monom.evaluate(values).display);
            r.add(monom.evaluate(values));
        });
        return r;
    };

    derivative = (letter?: string): Polynom => {
        let dP = new Polynom();

        for (let m of this._monoms) {
            dP.add(m.derivative(letter));
        }
        return dP;

    }

    primitive = (letter?: string): Polynom => {
        let dP = new Polynom();

        for (let m of this._monoms) {
            dP.add(m.primitive(letter))
        }
        return dP
    }

    integrate = (a: Fraction | number, b: Fraction | number, letter?: string): Fraction => {
        const primitive = this.primitive(letter)

        if (letter === undefined) {
            letter = 'x'
        }

        let valuesA: literalType = {},
            valuesB: literalType = {}
        valuesA[letter] = new Fraction(a);
        valuesB[letter] = new Fraction(b);

        return primitive.evaluate(valuesB).subtract(primitive.evaluate(valuesA))
    }
    // ------------------------------------------
    // Polynoms factorization functions
    // -------------------------------------
    /**
     * Factorize a polynom and store the best results in factors.
     * @param maxValue Defines the greatest value to search to (default is 20).
     */
    factorize = (letter?: string): Polynom[] => {
        let factors: Polynom[] = [];

        // Extract the common monom
        let P = this.clone().reorder(),
            M = P.commonMonom(),
            tempPolynom: Polynom
        // It has a common monom.
        if (!M.isOne()) {
            tempPolynom = new Polynom()
            tempPolynom.monoms = [M]
            factors = [tempPolynom.clone()]
            P = P.euclidian(tempPolynom).quotient;
        }

        let securityLoop = P.degree().clone().multiply(2).value
        // securityLoop = 0
        while (securityLoop >= 0) {
            securityLoop--


            if (P.monoms.length < 2) {
                if (!P.isOne()) {
                    factors.push(P.clone());
                }
                break;
            } else {
                // Get the first and last monom.
                let m1 = P.monoms[0].dividers,
                    m2 = P.monoms[P.monoms.length - 1].dividers

                // console.log('CURRENT VALUE')
                // console.log(P.tex)
                // console.log('---------------------')
                for (let m1d of m1) {
                    for (let m2d of m2) {
                        // if(m1d.degree()===m2d.degree()){continue}
                        let dividerPolynom = new Polynom(),
                            result
                        dividerPolynom.monoms = [m1d.clone(), m2d.clone()]
                        result = P.euclidian(dividerPolynom)

                        // console.log(dividerPolynom.tex, '=>', result.reminder.tex, '|||||', result.quotient.tex)
                        if (result.reminder.isZero()) {
                            P = result.quotient.clone();
                            factors.push(dividerPolynom)
                            continue;
                        }

                        dividerPolynom.monoms = [m1d.clone(), m2d.clone().opposed()]
                        result = P.euclidian(dividerPolynom)
                        if (result.reminder.isZero()) {
                            P = result.quotient.clone();
                            factors.push(dividerPolynom)
                        }
                        // console.log(dividerPolynom.tex, '=>', result.reminder.tex)
                    }
                }
            }

        }

        this.factors = factors
        return factors;
    }

    private _factorize2ndDegree = (letter: string): Polynom[] => {
        let P1: Polynom, P2: Polynom,
            a, b, c, delta, x1, x2, factor;

        // One variable only
        if (this.numberOfVars === 1) {
            a = this.monomByDegree(2, letter).coefficient;
            b = this.monomByDegree(1, letter).coefficient;
            c = this.monomByDegree(0, letter).coefficient;
            delta = b.clone().pow(2).subtract(a.clone().multiply(c).multiply(4));

            if (delta.isZero()) {
                x1 = b.clone().opposed().divide(a.clone().multiply(2))
                P1 = new Polynom(letter).subtract(x1.display).multiply(x1.denominator)
                P2 = new Polynom(letter).subtract(x1.display).multiply(x1.denominator)
                factor = a.divide(x1.denominator).divide(x1.denominator);

                if (!factor.isOne()) {
                    // TODO: Update new Polynom to accept anything...
                    return [new Polynom(factor.display), P1, P2]
                } else {
                    return [P1, P2]
                }
            } else if (delta.isPositive() && delta.isSquare()) {
                x1 = b.clone().opposed()
                    .add(delta.clone().sqrt())
                    .divide(a.clone().multiply(2))
                x2 = b.clone().opposed()
                    .subtract(delta.clone().sqrt())
                    .divide(a.clone().multiply(2))

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
                    ]
                } else {
                    return [
                        new Polynom(factor.display),
                        new Polynom(letter).subtract(x1.display).multiply(x1.denominator),
                        new Polynom(letter).subtract(x2.display).multiply(x2.denominator),
                    ]

                }
            } else {
                // No solution possible - return the complete value.
                return [this.clone()]
            }
        } else {
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

                    let factors = [], xyzPolynom: Polynom;

                    if (xFactors.length >= 2) {
                        for (let p of xFactors) {
                            if (p.degree().isZero()) {
                                factors.push(p.clone())
                            } else {
                                xyzPolynom = p.clone();
                                xyzPolynom.monoms[0].literal = a.literalSqrt
                                xyzPolynom.monoms[1].literal = c.literalSqrt
                                factors.push(xyzPolynom.clone())
                            }
                        }
                        return factors
                    }
                }
            }

            return [this.clone()]
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
    }

    private _factorizeByGroups = (): Polynom[] => {
        // TODO: Factorize by groups.
        return [];
    }
    // ------------------------------------------
    // Polynoms helpers functions
    // -------------------------------------
    // TODO: get zeroes for more than first degree and for more than natural degrees
    getZeroes = (): (Fraction | boolean)[] => {
        const Z: Fraction[] = [];

        switch (this.degree().value) {
            case 0:
                if (this._monoms[0].coefficient.value === 0) {
                    return [true];
                } else {
                    return [false];
                }
            case 1:
                // There is only one monoms,
                if (this._monoms.length === 1) {
                    return [new Fraction().zero()];
                } else {
                    const P = this.clone().reduce().reorder();
                    return [P.monoms[1].coefficient.opposed().divide(P.monoms[0].coefficient)];
                }
            // TODO: Determine the zeros of an equation of second degree.
            //case 2:
            default:
                // Make sure the polynom is factorized.
                if (this._factors.length === 0) {
                    this.factorize()
                }

                let zeroes = [], zeroesAsTex = [];
                for (let P of this._factors) {
                    if (P.degree().greater(2)) {
                        // TODO: Handle other polynom.

                    } else if (P.degree().value === 2) {
                        let A = P.monomByDegree(2).coefficient,
                            B = P.monomByDegree(1).coefficient,
                            C = P.monomByDegree(0).coefficient,
                            D = B.clone().pow(2).subtract(A.clone().multiply(C).multiply(4));

                        if (D.value > 0) {
                            /*console.log('Two zeroes for ', P.tex); */
                            let x1 = (-(B.value) + Math.sqrt(D.value)) / (2 * A.value),
                                x2 = (-(B.value) - Math.sqrt(D.value)) / (2 * A.value);

                            zeroes.push(new Fraction(x1.toFixed(3)).reduce());
                            zeroes.push(new Fraction(x2.toFixed(3)).reduce());
                        } else if (D.value === 0) {
                            /*console.log('One zero for ', P.tex); */

                        } else {
                            console.log('No zero for ', P.tex);
                        }
                    } else {
                        for (let z of P.getZeroes()) {
                            // Check if the zero is already in the list.
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


    // TODO: analyse the next functions to determine if they are useful or not...
    monomByDegree = (degree?: Fraction|number, letter?: string): Monom => {
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
        return new Monom().zero();
    };

    monomsByDegree = (degree?: number|Fraction, letter?: string): Monom[] => {
        if (degree === undefined) {
            // return the highest degree monom.
            return this.monomsByDegree(this.degree(letter));
        }

        // Reduce the polynom.
        let Ms: Monom[] = [];

        const M = this.clone().reduce();
        for (const m of M._monoms) {
            if (m.degree(letter) === degree) {
                Ms.push(m.clone())
            }
        }

        return Ms
        // Nothing was found - retur
    }

    // Used in LinearSystem.tex
    monomByLetter = (letter: string): Monom => {
        const M = this.clone().reduce();
        for (const m of M._monoms) {
            if (m.hasLetter(letter)) {
                return m.clone();
            }
        }

        return new Monom().zero();
    };


    // Next functions are used for for commonMonom, which is used in the factorize method.
    getDenominators = (): number[] => {
        const denominators: number[] = [];
        for (const m of this._monoms) {
            denominators.push(m.coefficient.denominator);
        }
        return denominators;
    };

    getNumerators = (): number[] => {
        const numerators: number[] = [];
        for (const m of this._monoms) {
            numerators.push(m.coefficient.numerator);
        }
        return numerators;
    };

    lcmDenominator = (): number => {
        return Numeric.lcm(...this.getDenominators());
    };

    gcdDenominator = (): number => {
        return Numeric.gcd(...this.getDenominators());
    };

    lcmNumerator = (): number => {
        return Numeric.lcm(...this.getNumerators());
    };

    gcdNumerator = (): number => {
        return Numeric.gcd(...this.getNumerators());
    };

    commonMonom = (): Monom => {
        let M = new Monom().one(), numerator: number, denominator: number, degree = this.degree();

        numerator = this.gcdNumerator();
        denominator = this.gcdDenominator();

        M.coefficient = new Fraction(numerator, denominator);
        for (let L of this.variables) {
            // Initialize the setLetter with the max degree
            M.setLetter(L, degree);
            for (let m of this._monoms) {
                M.setLetter(L, Fraction.min(m.degree(L), M.degree(L)));
                if (M.degree(L).isZero()) {
                    break;
                }
            }
        }
        return M;
    }
}
