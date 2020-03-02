import {Fraction} from "./fraction";
import {Numeric} from "./numeric";

export class Monom {
    private _coefficient: Fraction;
    private _literal: { [Key: string]: number };

    constructor() {
        this._coefficient = new Fraction().zero();
        this._literal = {};
        return this;
    }

    /**
     * Determine if object is a monom.
     */
    isMonom() {
        return true;
    }

    /**
     * Parse a string to a monom. The string may include fraction.
     * @param inputStr
     */
    parse = (inputStr: string): Monom => {
        // Set the literal part.
        this.literalStr = inputStr;

        // Get the coefficient
        this._coefficient = new Fraction();

        for (const v of [...inputStr.replace(/([a-z])|(\^[+-]?[0-9]+)/g, ',').split(',')]) {
            // The value is empty.
            if (v.trim() === '') {
                continue;
            }

            // Multiple the current coefficient by the new found value.
            this._coefficient.multiply(new Fraction().parse(v.trim()));
        }
        return this;
    };

    clean = (): Monom => {
        for(let letter in this._literal){
            if(this._literal[letter]===0){delete this._literal[letter];}
        }

        return this;
    }
    /**
     * Cretate a zero value monom
     */
    zero = (): Monom => {
        this._coefficient = new Fraction().zero();
        this._literal = {};
        return this;
    };

    /**
     * Clone the current Monom.
     */
    clone = (): Monom => {
        let F: Monom = new Monom();

        F.coefficient = this._coefficient.clone();

        // Copy the literal parts.
        for (let k in this._literal) {
            F.letter(k, this._literal[k]);
        }
        return F;
    };

    random = (letters: string = 'x', degree: number = 1, withFraction: boolean = false, allowZero: boolean = true): Monom => {
        this.coefficient.parseByInteger(Numeric.randomIntSym(10, allowZero), (withFraction) ? Numeric.randomInt(1, 10) : 1);

        for (let L of letters.split('')) {
            this.letter(L, (letters.length > 1) ? Numeric.randomInt(degree) : degree);
        }

        return this;
    };

    /**
     * Set the power of a particular letter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the letter (must be positive integer.
     */
    letter = (letter: string, pow: number): void => {
        // If the power is not legal or is zero, remove the letter from the dict
        if (pow <= 0 || !Number.isSafeInteger(pow)) {
            if (this._literal[letter] !== undefined) {
                delete this._literal[letter];
            }
        } else {
            this._literal[letter] = pow;
        }
    };

    // Mathematical operations
    /**
     * Determine if two monoms are similar
     * @param M
     */
    isSameAs = (M: Monom): boolean => {
        // Get the list of all keys from both monoms.
        let M1: string[] = Object.keys(this._literal),
            M2: string[] = Object.keys(M.literal),
            K: string[] = M1.concat(M2.filter((item) => M1.indexOf(item) < 0));

        for (let key of K) {
            // The letter is not available in one of the monom
            if (this._literal[key] === undefined || M.literal[key] === undefined) {
                return false;
            }
            // The letter does not have the same power in each monoms.
            if (this._literal[key] !== M.literal[key]) {
                return false;
            }
        }

        // All are positive check - the monoms are the sames.
        return true;
    };
    /**
     * Determine if multiple monoms are similar
     * @param M
     */
    areSameAs = (...M: Monom[]): boolean => {
        let result: boolean = true;

        // Check all monoms if they are the same as the "this" one.
        for (let i = 0; i < M.length; i++) {
            if (!this.isSameAs(M[i])) {
                return false;
            }
        }

        // All check passed -> all the monoms are similar.
        return result;
    };
    /**
     * Determine if two monoms are equals
     * @param M
     */
    isEqual = (M: Monom): boolean => {
        if (!this.isSameAs(M)) {
            return false;
        }
        return this._coefficient.isEqual(M.coefficient);
    };
    /**
     * Determine if mutliple monoms are equals
     * @param M
     */
    areEquals = (...M: Monom[]): boolean => {
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

    /**
     * Get the degree of a monom. If no letter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    degree = (letter?: string): number => {
        if (Object.entries(this._literal).length === 0) {
            return 0;
        }

        if (letter === undefined) {
            // Not letter given -> we get the global monom degree (sum of all the letters).
            return Object.values(this._literal).reduce((t, n) => t + n);
        } else {
            // A letter is given -> get the corresponding power.
            return this._literal[letter] === undefined ? 0 : this._literal[letter];
        }
    };

    hasLetter = (letter?:string):boolean => {
        if(letter===undefined){
            letter = 'x';
        }

        if(this._literal[letter]===undefined){return false;}
        return this._literal[letter]!==0;
    }

    static lcm = (...monoms:Monom[]):Monom => {
        let M = new Monom(),
            coeffN: number[] = monoms.map(value => value.coefficient.numerator),
            coeffD: number[] = monoms.map(value => value.coefficient.denominator),
            n = Numeric.gcd(...coeffN),
            d = Numeric.lcm(...coeffD);

        // Get the coefficient.
        M.coefficient = new Fraction().parseByInteger(n, d).reduce();

        // Set the litteral parts - go through each monoms litteral parts and get only the lowest degree of each letters.
        for(let m of monoms){
            // Remove the inexistant letters from the resulting monom
            for(let letter in M.literal){
                if(!(letter in m.literal)){M.literal[letter] = 0;}
            }
            for(let letter in m.literal){
                if(M.literal[letter]===undefined && m.literal[letter]>0){
                    M.literal[letter] = m.literal[letter];
                }else{
                    M.literal[letter] = Math.min(m.literal[letter], M.literal[letter]);
                }
            }
        }

        return M;
    };

    /**
     * Get the opposed
     * Returns a monom.
     */
    opposed = (): Monom => {
        this._coefficient.opposed();
        return this;
    };

    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    add = (...M: Monom[]): Monom => {
        for (let m of M) {
            if (this.isSameAs(m)) {
                this._coefficient.add(m.coefficient);
            } else {
                console.log('Add: Is not similar: ', m.display);
            }
        }
        return this;
    };

    /**
     * Substract multiple monoms
     * @param M (Monom[]) The monoms to substract
     */
    substract = (...M: Monom[]): Monom => {
        for (let m of M) {
            if (this.isSameAs(m)) {
                this._coefficient.add(m.coefficient.clone().opposed());
            } else {
                console.log('Substract: Is not similar: ', m.display);
            }
        }
        return this;
    };

    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    multiply = (...M: Monom[]): Monom => {
        for (let m of M) {
            // Multiply the coefficient.
            this._coefficient.multiply(m.coefficient);
            // Multiply the literal parts.
            for (let letter in m.literal) {
                this._literal[letter] = (this._literal[letter] === undefined) ? m.literal[letter] : this._literal[letter] + m.literal[letter];
            }
        }
        return this;
    };

    static xmultiply = (M1: Monom, M2: Monom): Monom => {
        return M1.clone().multiply(M2);
    };
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    divide = (...M: Monom[]): Monom => {
        // Depending on the given value, choose the current item
        for (let v of M) {
            // Divide the coefficient
            this._coefficient.divide(v.coefficient);

            // Substract the power values
            for (let letter in v.literal) {
                this._literal[letter] = (this._literal[letter] === undefined) ? -v.literal[letter] : this._literal[letter] - v.literal[letter];

                // If the power of a particular letter is zeor, delete it from the literal part..
                if (this._literal[letter] === 0) {
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
    pow = (nb: number): Monom => {
        this._coefficient.pow(nb);
        for (let letter in this._literal) {
            this._literal[letter] *= nb;
        }
        return this;
    };

    evaluate = (values: { [key: string]: Fraction }): Fraction => {
        let r = this.coefficient.clone();

        for (let L in this._literal) {
            if (values[L] === undefined) {
                return new Fraction().zero();
            }
            r.multiply(values[L].clone().pow(this._literal[L]));
        }
        return r;
    };

    // Setter
    set coefficient(F: Fraction) {
        this._coefficient = F;
    }

    set literal(L: { [Key: string]: number }) {
        this._literal = L;
    }

    set literalStr(inputStr: string) {
        // Match all x^n
        for (const v of [...inputStr.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) {
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = 0;
            }
            this._literal[v[1]] += +v[2];
        }
        // Match all single letters
        for (const v of [...inputStr.matchAll(/([a-z](?!\^))/g)]) {
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = 0;
            }
            this._literal[v[1]] += 1;
        }
    }

    // Getter
    get coefficient(): Fraction {
        return this._coefficient;
    }

    get literal(): { [Key: string]: number } {
        return this._literal;
    }

    get isZero(): boolean {
        return this._coefficient.value === 0;
    }

    get isMultiVariable(): boolean {
        let n:number=0;

        for(let letter in this._literal){
            if(this._literal[letter]!=0){
                n++;
            }
        }

        return n>1;
    }

    get variables():string[] {
        this.clean();
        return Object.keys(this._literal)
    }
    get numberOfVar(): number {
        return this.variables.length;
    }

    /**
     * This display getter is to be used in the polynom display getter
     */
    get display(): string {
        let L: string = '';
        for (let letter in this._literal) {
            if (this._literal[letter] !== 0) {
                L += `${letter}`;
                if (this._literal[letter] > 1) {
                    L += `^${this._literal[letter]}`;
                }
            }
        }

        if (L === '') {
            // No letter - means it's only a number !
            if (this._coefficient.value != 0) {
                return `${this._coefficient.display}`;
            } else {
                return '';
            }
        } else {
            if (this._coefficient.value === 1) {
                return L;
            } else if (this._coefficient.value === -1) {
                return `-${L}`;
            } else if (this._coefficient.value === 0) {
                return '0';
            } else {
                return `${this._coefficient.display}${L}`;
            }
        }
    }

    get tex(): string {
        let L: string = '';
        for (let letter in this._literal) {
            if (this._literal[letter] !== 0) {
                L += `${letter}`;
                if (this._literal[letter] > 1) {
                    L += `^${this._literal[letter]}`;
                }
            }
        }

        if (L === '') {
            // No letter - means it's only a number !
            if (this._coefficient.value != 0) {
                return `${this._coefficient.dfrac}`;
            } else {
                return '';
            }
        } else {
            if (this._coefficient.value === 1) {
                return L;
            } else if (this._coefficient.value === -1) {
                return `-${L}`;
            } else if (this._coefficient.value === 0) {
                return '0';
            } else {
                return `${this._coefficient.dfrac}${L}`;
            }
        }
        return '';
    }
}