/**
 * Polynom module contains everything necessary to handle polynoms.*
 */

import {literalType, Monom} from './monom';
import {Shutingyard, ShutingyardType, Token} from '../shutingyard';
import {Numeric} from '../numeric';
import {Fraction} from "../coefficients/fraction";
import {Equation, ISolution} from "./equation";
import {Random} from "../randomization/random";
import {loadHighlighter} from "typedoc/dist/lib/utils/highlighter";

export type PolynomParsingType = string | Polynom | number | Fraction | Monom

export interface IEuclidian {
    quotient: Polynom,
    reminder: Polynom
}

/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 * ```
 * let P = new Polynom('3x-4')
 * ```
 */
export class Polynom {
    private _dirty_factors: boolean
    private _dirty_zeroes: boolean
    private _euclidianCache: { [Key: string]: IEuclidian }
    private _factors: Polynom[];
    private _monoms: Monom[];
    private _rawString: string;
    private _texString: string;
    private _zeroes: ISolution[]

    /**
     *
     * @param {string} polynomString (optional) Default polynom to parse on class creation
     * @param values
     */
    constructor(polynomString?: PolynomParsingType, ...values: unknown[]) {
        this._monoms = [];
        this._factors = [];
        this.mark_as_dirty()

        if (polynomString !== undefined) {
            this.parse(polynomString, ...values);
        }
        return this;
    }

    get euclidianCache(): { [p: string]: IEuclidian } {
        return this._euclidianCache;
    }

    set euclidianCache(value: { [p: string]: IEuclidian }) {
        this._euclidianCache = value;
    }

    get dirty_zeroes(): boolean {
        return this._dirty_zeroes;
    }

    set dirty_zeroes(value: boolean) {
        this._dirty_zeroes = value;
    }

    // ------------------------------------------
    get dirty_factors(): boolean {
        return this._dirty_factors;
    }

    set dirty_factors(value: boolean) {
        this._dirty_factors = value;
    }

    // ------------------------------------------
    get monoms() {
        return this._monoms;
    }

    set monoms(M: Monom[]) {
        this._monoms = M;
    }

    get zeroes(): ISolution[] {
        return this.getZeroes()
    }

    get factors(): Polynom[] {
        return this.factorize()
    }

    set factors(value: Polynom[]) {
        this.mark_as_dirty()
        this._factors = value;
    }

    get texString(): string {
        return this._texString;
    }

    get texFactors(): string {
        this.factorize()

        if (this.factors.length <= 1) {
            return this.tex
        }

        // Build an array of texFactors with the number of similar items.
        let factorsCount: { [Key: string]: { degree: number, factor: Polynom } } = {}
        for (let f of this.factors) {
            if (factorsCount[f.tex] !== undefined) {
                factorsCount[f.tex].degree++
            } else {
                factorsCount[f.tex] = {
                    degree: 1,
                    factor: f
                }
            }
        }

        // First round to put the 'monom' first
        let simpleFactor = new Polynom().one()

        for (let item of Object.values(factorsCount).filter(item => item.factor.monoms.length === 1)) {
            simpleFactor.multiply(item.factor)
        }

        let tex = simpleFactor.isOne() ? '' : simpleFactor.tex

        // Loop through all factors that contains at least 2 monoms.
        for (let item of Object.values(factorsCount).filter(item => item.factor.monoms.length > 1)) {
            if (item.factor.length > 1) {
                tex += `\\left( ${item.factor.tex} \\right)${item.degree > 1 ? '^{ ' + item.degree + ' }' : ''}`
            }
        }

        return tex;
    }

    get displayFactors() {
        this.factorize()

        if (this.factors.length <= 1) {
            return this.display
        }

        // Build an array of texFactors with the number of similar items.
        let factorsCount: { [Key: string]: { degree: number, factor: Polynom } } = {}
        for (let f of this.factors) {
            if (factorsCount[f.display] !== undefined) {
                factorsCount[f.display].degree++
            } else {
                factorsCount[f.display] = {
                    degree: 1,
                    factor: f
                }
            }
        }

        // First round to put the 'monom' first
        let simpleFactor = new Polynom().one()

        for (let item of Object.values(factorsCount).filter(item => item.factor.monoms.length === 1)) {
            simpleFactor.multiply(item.factor)
        }

        let display = simpleFactor.isOne() ? '' : simpleFactor.display

        // Loop through all factors that contains at least 2 monoms.
        for (let item of Object.values(factorsCount).filter(item => item.factor.monoms.length > 1)) {
            if (item.factor.length > 1) {
                display += `(${item.factor.display})${item.degree > 1 ? '^(' + item.degree + ')' : ''}`
            }
        }

        return display;
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
        V.sort()
        return V;
    }

    get numberOfVars(): number {
        return this.variables.length;
    }

    get plotFunction(): string {
        return this.genDisplay('tex', false, false, true)
    }

    mark_as_dirty = (): void => {
        this.dirty_factors = true
        this.dirty_zeroes = true
        this.euclidianCache = {}
    }

    addToken = (stack: Polynom[], element: Token): void => {
        switch (element.tokenType) {
            case ShutingyardType.COEFFICIENT:
                stack.push(new Polynom(element.token))
                break

            case ShutingyardType.VARIABLE:
                stack.push(new Polynom().add(new Monom(element.token)))
                break

            case ShutingyardType.CONSTANT:
                // TODO: add constant support to Polynom parsing.
                console.log('Actually, not supported - will be added later !')
                break

            case ShutingyardType.OPERATION:
                if (stack.length >= 2) {
                    const b = stack.pop(),
                        a = stack.pop()

                    if (element.token === '+') {
                        stack.push(a.add(b))
                    } else if (element.token === '-') {
                        stack.push(a.subtract(b))
                    } else if (element.token === '*') {
                        stack.push(a.multiply(b))
                    } else if (element.token === '/') {
                        if (b.degree().isStrictlyPositive()) {
                            console.log('divide by a polynom -> should create a rational polynom !')
                        } else {
                            stack.push(a.divide(b.monoms[0].coefficient))

                        }
                    } else if (element.token === '^') {
                        if (b.degree().isStrictlyPositive()) {
                            console.error('Cannot elevate a polynom with another polynom !', a.tex, b.tex)
                        } else {
                            if (b.monoms[0].coefficient.isRelative()) {
                                // Integer power
                                stack.push(a.pow(b.monoms[0].coefficient.value))
                            } else {
                                // Only allow power if the previous polynom is only a monom, without coefficient.
                                if (a.monoms.length === 1 && a.monoms[0].coefficient.isOne()) {
                                    for (let letter in a.monoms[0].literal) {
                                        a.monoms[0].literal[letter].multiply(b.monoms[0].coefficient)
                                    }
                                    stack.push(a)
                                } else {
                                    console.error('Cannot have power with fraction')
                                }
                            }
                        }
                    }
                } else {
                    if (element.token === '-') {
                        stack.push(stack.pop().opposed())
                    } else {
                        throw "Error parsing the polynom " + this._rawString
                    }
                }
                break

            case ShutingyardType.MONOM:
                // Should never appear.
                console.error('The monom token should not appear here')
                break;

            case ShutingyardType.FUNCTION:
                // Should never appear.
                console.error('The function token should not appear here - might be introduced later.')
                break;
        }
    }


    // ------------------------------------------
    // Creation / parsing functions

    // ------------------------------------------
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values: as string, numbers or fractions
     */
    parse = (inputStr: PolynomParsingType, ...values: unknown[]): Polynom => {
        // Reset the main variables.
        this._monoms = []
        this._factors = []
        this.mark_as_dirty()

        // TODO: allow to enter a liste of Fraction (a, b, c, ...) to make a polynom ax^n + bx^(n-1) + cx^(n-2) + ...
        if (typeof inputStr === 'string') {
            return this._parseString(inputStr, ...values)
        } else if (
            (typeof inputStr === 'number' || inputStr instanceof Fraction || inputStr instanceof Monom)
            && (values === undefined || values.length === 0)
        ) {
            this._monoms.push(new Monom(inputStr))
        } else if (inputStr instanceof Monom && values.length > 0) {
            this._monoms.push(new Monom(inputStr))
            values.forEach(m => {
                this._monoms.push(new Monom(m))
            })
        } else if (inputStr instanceof Polynom) {
            for (const m of inputStr.monoms) {
                this._monoms.push(m.clone())
            }
        }

        return this
    };

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
        this.mark_as_dirty()
        return this;
    };

    one = (): Polynom => {
        this._monoms = [];
        this._monoms.push(new Monom().one());
        this._rawString = '1';
        this.mark_as_dirty()
        return this;
    }

    empty = (): Polynom => {
        this._monoms = [];
        this._rawString = '';
        this.mark_as_dirty()
        return this;
    };

    // ------------------------------------------
    opposed = (): Polynom => {
        this._monoms = this._monoms.map(m => m.opposed());
        this.mark_as_dirty()
        return this;
    };


    // ------------------------------------------
    // Mathematical operations

    add = (...values: unknown[]): Polynom => {
        this.mark_as_dirty()

        // @ts-ignore
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
        this.mark_as_dirty()

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
        this.mark_as_dirty()

        if (value instanceof Polynom) {
            return this.multiplyByPolynom(value);
        } else if (value instanceof Fraction) {
            return this.multiplyByFraction(value);
        } else if (value instanceof Monom) {
            return this.multiplyByMonom(value);
        } else if (Number.isSafeInteger(value) && typeof value === 'number') {
            return this.multiplyByInteger(value);
        }

        // Something went wrong...
        return this;
    }

    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    euclidian = (P: Polynom): IEuclidian => {

        if (this.euclidianCache[P.tex] !== undefined) {
            return this.euclidianCache[P.tex]
        }

        const letter: string = P.variables[0];
        const quotient: Polynom = new Polynom().zero();
        const reminder: Polynom = this.clone().reorder(letter);

        // There is no variable - means it's a number
        if (P.variables.length === 0) {
            let q = this.clone().divide(P)
            return {
                quotient: this.clone().divide(P),
                reminder: new Polynom().zero()
            }
        }

        // Get at least a letter

        const maxMP: Monom = P.monomByDegree(undefined, letter);
        const degreeP: Fraction = P.degree(letter);

        let newM: Monom;

        // Make the euclidian division of the two polynoms.
        let MaxIteration = this.degree(letter).clone().multiply(2);
        while (reminder.degree(letter).geq(degreeP) && MaxIteration.isPositive()) {
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

        quotient.reduce()
        reminder.reduce()
        return {quotient, reminder};
    };

    divide = (value: unknown): Polynom => {
        this.mark_as_dirty()

        if (value instanceof Fraction) {
            return this.divideByFraction(value);
        } else if (typeof value === 'number' && Number.isSafeInteger(value)) {
            return this.divideByInteger(value);
        } else if (value instanceof Monom) {
            return this.divide(new Polynom(value))
        } else if (value instanceof Polynom) {
            if (value.monoms.length === 1 && value.variables.length === 0) {
                return this.divideByFraction(value.monoms[0].coefficient)
            }else {
                let {quotient, reminder} = this.euclidian(value)
                if(reminder.isZero()){
                    return quotient
                }else{
                    console.log(`${this.tex} is not divideable by ${value.tex}`)
                    return new Polynom().zero()
                }
            }
        }
    }

    pow = (nb: number): Polynom => {
        this.mark_as_dirty()

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

    isFactorized = (polynomString: string, soft?: boolean): boolean => {
        let P;

        // Check if polynom is complete...
        if (polynomString.split('(').length !== polynomString.split(')').length) {
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
                // if there is an exponential value, add it multiple times
                for (let i = 0; i < +x[2].substring(1); i++) {
                    factors.push(x[1])
                }
            } else {
                // no power - add it once.
                factors.push(x[1]);
            }

            // Remove the current polynom
            polynomStringReduced = polynomStringReduced.replaceAll(x[0], '');
        }
        if (polynomStringReduced !== '') {
            factors.push(polynomStringReduced);
        }
        let polyFactors = factors.map(x => new Polynom(x));

        // polyFactors contain all polynoms.
        let checkPolyFactors = polyFactors.filter(x=>x.degree().geq(1) && !x.commonMonom().isOne())

        // Some polynoms are not completely factorized.
        if(checkPolyFactors.length>0 && !soft){return false}
        if(checkPolyFactors.length>0 && soft){
            polyFactors = polyFactors.filter(x=>x.commonMonom().isOne())

            let FactorizedConstant = new Fraction().one()
            for(let p of checkPolyFactors){
                let k = p.commonMonom(),
                    pFactor = p.clone().divide(k)

                if(k.degree().isZero()){
                    FactorizedConstant.multiply(k.coefficient)
                    polyFactors.push(pFactor.clone())
                }
            }
        }


        // Factorize the current polynom.
        this.factorize();

        // Compare the given factors with the generated factors
        let sign = 1,
            notFoundedFactors = []
        for (let f of this.factors) {
            // The factor is just a coefficient. Might be opposed
            if (f.degree().isZero()) {
                if (f.monoms[0].coefficient.isNegativeOne()) {
                    sign = -sign
                }
            }

            let factorFound = false
            for (let i = 0; i < polyFactors.length; i++) {
                if (f.isEqual(polyFactors[i])) {
                    polyFactors.splice(i, 1);
                    factorFound = true
                    break;
                } else if (f.isOpposedAt(polyFactors[i])) {
                    polyFactors.splice(i, 1);
                    sign = -sign;
                    factorFound = true
                    break;
                }
            }

            if (!factorFound) {
                notFoundedFactors.push(f.clone())
            }
        }

        // The polyfactors must be empty and the cumulative opposite factors must be 1.
        return (polyFactors.length === 0 && sign === 1);
    }


    // ------------------------------------------
    // Compare functions

    isReduced = (polynomString: string): Boolean => {
        // The polynom must be developed to be reduced.
        if (!this.isDeveloped(polynomString)) {
            return false
        }

        let P = new Polynom(polynomString)
        if (P.monoms.length > this.monoms.length) {
            return false
        }

        // TODO: Not ur the reduced systme checking is working properly !
        for (let m of P.monoms) {
            if (!m.coefficient.isReduced()) {
                return false
            }
        }

        return false
    }

    isDeveloped = (polynomString: string): Boolean => {
        let P: Polynom;

        // Start by removing the parenthis after a "power"
        let pString = polynomString.replaceAll(/\^\(([-0-9/]+)\)/g, '$1')

        // There is at least one parenthese - it is not developed.
        if (pString.includes('(') || pString.includes(')')) {
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
        return true

        // // maybe it wasn't reduced and not ordered...
        // // compare polynom string.
        //
        // // normalize the string
        // let polynomStringNormalized = polynomString.replaceAll('[*\s]', '')
        //
        // // Determine if it's the exact same string.
        // // TODO: Maybe it's enough to just make this test !a
        // return polynomStringNormalized === P.reduce().reorder().display
    }

    // -------------------------------------
    reduce = (): Polynom => {
        // Reduce the polynom
        let values = [...this._monoms],
            vars = [...this.variables]

        this._monoms = []

        let coeffs = values.filter(x => x.variables.length === 0)

        if (coeffs.length > 0) {
            this._monoms.push(coeffs.reduce((a, b) => a.add(b)))
        }

        // Build the new monoms
        for (let letter of vars) {
            // Monom with same letters, but might be of different degrees
            let M = values.filter(x => x.hasLetter(letter))

            while (M.length > 0) {
                // Take the first element
                const m = M.shift(), degree = m.degree(letter)

                for (let a of M.filter(x => x.degree(letter).isEqual(degree))) {
                    m.add(a)
                }

                this._monoms.push(m)

                // Make the new array.
                M = M.filter(x => x.degree(letter).isNotEqual(degree))
            }
            // reduce the monom

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
        return this.reorder();
    };

    reorder = (letter: string = 'x', revert?: boolean): Polynom => {
        if(revert===undefined){revert = false}

        // TODO: Must handle multiple setLetter reorder system
        let otherLetters = this.variables.filter(x => x !== letter)
        this._monoms.sort(function (a, b) {
            let da = a.degree(letter).value,
                db = b.degree(letter).value

            // Values are different
            if (da !== db) return revert?da-db : db - da

            // if values are equals, check other letters - it must be revert in that case !
            if (otherLetters.length > 0) {
                for (let L of otherLetters) {
                    let da = a.degree(L).value,
                        db = b.degree(L).value

                    // Values are different
                    if (da !== db) return revert?da - db : db - da
                }
            }

            return 0
            // return b.degree(letter).clone().subtract(a.degree(letter)).value
        });

        return this;
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
        this.mark_as_dirty()

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

    evaluateAsNumeric = (values: { [Key: string]: number } | number): number => {
        let r = 0
        this._monoms.forEach(monom => {
            r += monom.evaluateAsNumeric(values)
        })

        return r
    }

    derivative = (letter?: string): Polynom => {
        let dP = new Polynom();

        for (let m of this._monoms) {
            dP.add(m.derivative(letter));
        }
        return dP;
    }
    // ------------------------------------------
    // Misc polynoms functions

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

    // -------------------------------------
    /**
     * Factorize a polynom and store the best results in factors.
     * @param maxValue Defines the greatest value to search to (default is 20).
     */
    factorize = (letter?: string): Polynom[] => {
        if (!this.dirty_factors) {
            return this._factors
        }

        let factors: Polynom[] = [];
        let P = this.clone().reorder()

        // Extract the common monom
        // 2x^3+6x^2 => 2x^2
        let M = P.commonMonom()
        // If the polynom starts with a negative monom, factorize it.
        if (P.monomByDegree().coefficient.isStrictlyNegative() && M.coefficient.isStrictlyPositive() && !M.isOne()) {
            M.opposed()
        }

        if (!M.isOne()) {
            let tempPolynom: Polynom = new Polynom(M)
            factors = [tempPolynom.clone()]
            P = P.euclidian(tempPolynom).quotient;
        }

        // Main loop
        let securityLoop = P.degree().clone().multiply(2).value,
            maxDegree = 1
        while (securityLoop >= 0) {
            securityLoop--
            if (P.monoms.length < 2) {
                // The polynom has only one monom => 7x^2
                // No need to continue.
                if (!P.isOne()) {
                    factors.push(P.clone())
                    P.one()
                }
                break
            } else if (P.degree(letter).isOne()) {
                // The polynom is a first degree polynom => 3x-5
                // No need to continue
                factors.push(P.clone())
                P.one()
                break
            } else {
                // Create the list of all "potential" polynom dividers.
                let allDividers: Polynom[] = this._getAllPotentialFactors(P, maxDegree, letter)
                maxDegree = P.degree(letter).value

                // Actually: 100ms
                while (allDividers.length > 0) {
                    let div = allDividers[0]

                    if (!P.isDividableBy(div)) {
                        // Not dividable. Remove it from the list
                        allDividers.shift()
                    } else {
                        // It's dividable - so make the division
                        let result = P.euclidian(div)

                        // Add the factor
                        factors.push(div)

                        // As it's dividable, get the quotient.
                        P = result.quotient.clone()

                        // filter all dividers that are no more suitable.
                        allDividers = allDividers.filter(x => {
                            let pX = P.monoms[0],
                                pC = P.monoms[P.monoms.length - 1],
                                dX = x.monoms[0],
                                dC = x.monoms[x.monoms.length - 1]

                            // Check last item (degree zero)
                            if (!pC.isDivisible(dC)) {
                                return false
                            }

                            // Check the first item (degree max)
                            if (!pX.isDivisible(dX)) {
                                return false
                            }

                            return true
                        })
                    }
                }
            }
        }

        // Maybe there is still something in the Polynom (not everything was possible to factorize)
        if (!P.isOne()) {
            factors.push(P.clone())
        }

        // Save the factors
        this._factors = factors

        // The factors list is no more dirty
        this.dirty_factors = false

        return this._factors;
    }

    isDividableBy = (div: Polynom): boolean => {
        // Quick evaluation.
        if (div.degree().isOne()) {
            let zero = div.getZeroes()[0]

            if (zero.exact instanceof Fraction) {
                return this.evaluate(zero.exact).isZero()
            } else {
                return false
            }
        } else {
            this.euclidianCache[div.tex] = this.euclidian(div)
            return this.euclidianCache[div.tex].reminder.isZero()
        }
    }
    // TODO: get zeroes for more than first degree and for more than natural degrees
    getZeroes = (): ISolution[] => {
        if (this.dirty_zeroes) {
            let equ = new Equation(this.clone(), 0)
            equ.solve()
            this._zeroes = equ.solutions
            this.dirty_zeroes = false
        }

        return this._zeroes
    };

    // TODO: analyse the next functions to determine if they are useful or not...
    monomByDegree = (degree?: Fraction | number, letter?: string): Monom => {
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

    monomsByDegree = (degree?: number | Fraction, letter?: string): Monom[] => {
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
    // ------------------------------------------
    // Polynoms factorization functions

    gcdDenominator = (): number => {
        return Numeric.gcd(...this.getDenominators());
    };

    lcmNumerator = (): number => {
        return Numeric.lcm(...this.getNumerators());
    };

    gcdNumerator = (): number => {
        return Numeric.gcd(...this.getNumerators());
    };
    // ------------------------------------------
    // Polynoms helpers functions
    // -------------------------------------

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

    limitToInfinity = (letter?: string): Fraction => {
        const M = this.monomByDegree(undefined, letter),
            sign = M.coefficient.sign(),
            degree = M.degree(letter)

        if (degree.isStrictlyPositive()) {
            return sign === 1 ? (new Fraction()).infinite() : (new Fraction()).infinite().opposed()
        } else if (degree.isZero()) {
            return M.coefficient
        }

        // Any other cases
        return (new Fraction()).zero()
    }
    limitToNegativeInfinity = (letter?: string): Fraction => {
        const M = this.monomByDegree(undefined, letter),
            sign = M.coefficient.sign(),
            degree = M.degree(letter)

        if (degree.isStrictlyPositive()) {
            return sign === -1 ? (new Fraction()).infinite() : (new Fraction()).infinite().opposed()
        } else if (degree.isZero()) {
            return M.coefficient
        }

        // Any other cases
        return (new Fraction()).zero()
    }

    private _getAllPotentialFactors = (P: Polynom, maxDegree: number, letter: string): Polynom[] => {
        let m1 = P.monoms[0].dividers,
            m2 = P.monoms[P.monoms.length - 1].dividers

        let allDividers: Polynom[] = []
        m1.forEach(m1d => {
            // Get only polynom that has a degree less than a specific value
            if (m1d.degree(letter).leq(maxDegree)) {
                m2.forEach(m2d => {
                    if (m1d.degree(letter).isNotEqual(m2d.degree(letter))) {
                        allDividers.push(new Polynom(m1d, m2d))
                        allDividers.push(new Polynom(m1d, m2d.clone().opposed()))
                    }
                })
            }
        })

        return allDividers

    }

    private _parseString(inputStr: string, ...values: unknown[]): Polynom {
        if (values === undefined || values.length === 0) {
            inputStr = '' + inputStr;
            this._rawString = inputStr.trim().replaceAll(' ', '');

            // Parse the polynom using the shutting yard algorithm
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
    }

    private genDisplay = (output?: string, forceSign?: boolean, wrapParentheses?: boolean, withAllMultSign?: boolean): string => {
        let P: string = '';

        for (const k of this._monoms) {
            if (k.coefficient.value === 0) {
                continue;
            }

            // The monom to be displayed
            let m
            if (withAllMultSign) {
                m = k.plotFunction
            } else {
                m = (output === 'tex') ? k.tex : k.display
            }

            P += `${(k.coefficient.sign() === 1 && (P !== '' || forceSign === true)) ? '+' : ''}${m}`;
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

    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    private shutingYardToReducedPolynom = (inputStr: string): Polynom => {
        // Get the RPN array of the current expression
        const SY: Shutingyard = new Shutingyard().parse(inputStr);
        const rpn: { token: string, tokenType: string }[] = SY.rpn;

        // New version for reducing shuting yard.
        this.zero()

        let stack: Polynom[] = [],
            monom: Monom = new Monom()

        // Loop through the
        for (const element of rpn) {
            this.addToken(stack, element);
        }

        if (stack.length === 1) {
            this.add(stack[0])
        }

        return this.reorder()
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
        }
    }

    private _factorizeByGroups = (): Polynom[] => {
        // TODO: Factorize by groups.
        return [];
    }
}
