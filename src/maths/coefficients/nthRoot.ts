import {COMPARESIGNS, numericType} from "../types";
import {Fraction} from "./fraction";

/**
 * NthRoot is something like "<coefficient>\sqrt[index]{<radical>}
 */
export class NthRoot {
    private _isValid: boolean;

    constructor(radical: number, index?: number, coefficient?: numericType) {
        this._radical = 1;
        this._coefficient = new Fraction().one();
        this._index = 2;

        this._isValid = true;

        if (radical !== undefined) {
            this.parse(radical, index, coefficient)
        }
    }

    private _radical: number;

    // ------------------------------------------
    get radical(): number {
        return this._radical;
    }

    set radical(value: number) {
        this._radical = value;
    }


    // ------------------------------------------
    // Getter and setter

    private _index: number;

    get index(): number {
        return this._index;
    }

    set index(value: number) {
        if (Number.isSafeInteger(value) && value >= 2) {
            this._index = value;
        } else {
            // Error setting the index root.
            console.log('Error setting the index root');
            this._index = 2;
        }
    }

    private _coefficient: Fraction;

    get coefficient(): Fraction {
        return this._coefficient;
    }

    set coefficient(value: numericType) {
        this._coefficient = new Fraction(value);
    }

    get tex(): string {
        if (this._coefficient.isRational()) {
            // a\sqrt{}/b
            return `\\frac{ ${this._numeratorAsTex()} }{ ${this._coefficient.denominator} }`
        } else {
            // a\sqrt{}
            return this._numeratorAsTex()
        }
    }

    get display(): string {
        if (this._coefficient.isRational()) {
            // a\sqrt{}/b
            return `${this._numeratorAsDisplay()}/${this._coefficient.denominator}`
        } else {
            // a\sqrt{}
            return this._numeratorAsDisplay()
        }
    }

    get value(): number {
        return this._coefficient.value * Math.pow(this._radical, 1 / this._index);
    }

    // ------------------------------------------
    parse = (radical: number, index?: number, coefficient?: numericType): NthRoot => {
        this._coefficient = new Fraction((coefficient === undefined) ? 1 : coefficient);
        this._index = (index === undefined) ? 2 : index;
        this._radical = (radical === undefined) ? 1 : radical;

        if (this._index % 2 === 0 && this._radical < 0) {
            this._isValid = false;
        }
        return this;
    };

    // ------------------------------------------
    reduce = (): NthRoot => {
        // Max value to test.
        let V = Math.floor(Math.pow(this._radical, 1 / this._index));
        while (V > 1) {
            if (this._radical % Math.pow(V, this._index) === 0) {
                // It's dividable by V^n
                this._coefficient.multiply(V)
                this._radical = this._radical / Math.pow(V, this._index);

                // Redifine the new testing value (this is optimization)
                V = Math.floor(Math.pow(this._radical, 1 / this._index));
                continue;
            }
            V--;
        }
        this._coefficient.reduce()
        return this;
    };

    // Add two NthRoots
    add = (value: NthRoot): NthRoot => {
        // The index must be the same
        if (this._index !== value.index) {
            throw new Error('The index must be the same');
        }

        this._coefficient.add(value.coefficient);
        return this.reduce();
    };

    // Opposite of an NthRoot
    opposed = (): NthRoot => {
        this._coefficient.opposite();
        return this;
    };

    // ------------------------------------------
    // Creation / parsing functions

    // Subtract two NthRoots
    subtract = (N: NthRoot): NthRoot => {
        // The index must be the same
        if (this._index !== N.index) {
            throw new Error('The index must be the same');
        }

        this._coefficient.subtract(N.coefficient);
        return this.reduce();
    };

    // ------------------------------------------
    // Mathematical operations

    // Multiply two NthRoots
    multiply = (N: NthRoot): NthRoot => {
        // The index must be the same
        if (this._index !== N.index) {
            throw new Error('The index must be the same');
        }

        this._coefficient.multiply(N.coefficient);
        this._radical = this._radical * N.radical;
        return this.reduce();
    };

    // Divide two NthRoots and amplify the denominator to remove the root
    divide = (N: NthRoot): NthRoot => {
        // The index must be the same
        if (this._index !== N.index) {
            throw new Error('The index must be the same');
        }

        this._coefficient.divide(N.coefficient).divide(N.radical)
        this._radical = this._radical * N.radical;
        return this.reduce();
    };

    // ------------------------------------------
    hasRadical = (): boolean => {
        return !(this._radical === 1 || this._radical === 0 || this._isValid === false)
    };

    isSimilar = (N: NthRoot): boolean => {
        return this._index === N.index && this._radical === N.radical;
    }

    isZero = (): boolean => {
        return this._coefficient.isZero();
    }

    isOne = (): boolean => {
        return this._coefficient.isOne() && this._radical === 1;
    }

    // ------------------------------------------
    // Help functions

    clone(): NthRoot {
        return new NthRoot(this._radical, this._index, this._coefficient.clone());
    }

    compare(value: NthRoot, sign: COMPARESIGNS): boolean {
        return false;
    }

    invert(): NthRoot {
        return (new NthRoot(1)).divide(this).reduce()
    }

    isEqual(value: NthRoot): boolean {
        return this.compare(value, COMPARESIGNS.EQUALS)
    }

    isNotEqual(value: NthRoot): boolean {
        return !this.isEqual(value);
    }

    isReduced(): boolean {
        return false;
    }

    pow(value: NthRoot): unknown {
        return undefined;
    }

    reset(): NthRoot {
        this._coefficient.one();
        this._radical = 1
        this._index = 2
        return this;
    }

    isMinusOne = (): boolean => {
        return this._coefficient.isMinusOne() && this._radical === 1;
    }

    isUnit = (): boolean => {
        return this.isOne() || this.isMinusOne()
    }

    private _rootAsTex = (defaultTo?: string): string => {
        if (this._radical === 1) {
            return defaultTo === undefined ? '' : defaultTo;
        }

        if (this._index === 2) {
            return `\\sqrt{ ${this._radical} }`;
        } else {
            return `\\sqrt[${this._index}]{ ${this._radical} }`;
        }
    }

    private _numeratorAsTex = (): string => {
        if (this._coefficient.numerator === 1) {
            return this._rootAsTex('1');
        } else if (this._coefficient.numerator === -1) {
            return '-' + this._rootAsTex('1');
        } else {
            return `${this._coefficient.numerator} ${this._rootAsTex()}`;
        }
    }

    private _rootAsDisplay = (defaultTo?: string): string => {
        if (this._radical === 1) {
            return defaultTo === undefined ? '' : defaultTo;
        }

        if (this._index === 2) {
            return `sqrt(${this._radical})`;
        } else {
            return `root(${this._index})(${this._radical})`;
        }
    }

    private _numeratorAsDisplay = (): string => {
        if (this._coefficient.numerator === 1) {
            return this._rootAsDisplay('1');
        } else if (this._coefficient.numerator === -1) {
            return '-' + this._rootAsDisplay('1');
        } else {
            return `${this._coefficient.numerator}${this._rootAsDisplay()}`;
        }
    }


}