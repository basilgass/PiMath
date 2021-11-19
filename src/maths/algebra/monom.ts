/***
 * Monom class
 * Defined as coefficient * literal
 * Examples: 3x^2, 3/5x^2, ...
 */
import {Fraction} from "../coefficients/fraction";
import {Numeric} from "../numeric";

    export class Monom {
        private _coefficient: Fraction;
        private _literal: { [Key: string]: number };

        /**
         * Create the monom object.
         * @param value (optional) string
         */
        constructor(value?: string) {
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
        get isMonom() {
            return true;
        }

        /**
         * Get the coefficient as fraction
         */
        get coefficient(): Fraction {
            return this._coefficient;
        }

        /**
         * Set the coefficient value of the monom
         * @param F     Fraction
         */
        set coefficient(F: Fraction) {
            this._coefficient = F;
        }

        /**
         * Get the literal part, as dictionary
         */
        get literal(): { [Key: string]: number } {
            return this._literal;
        }

        get literalSqrt(): { [Key: string]: number } {

            if (this.isLitteralSquare()) {
                let L: { [Key: string]: number } = {}
                for (let key in this._literal) {
                    L[key] = this._literal[key] / 2
                }
                return L;
            } else {
                return this._literal;
            }
        }

        /**
         * Set the literal part of the monom
         * @param L     Literal part as dictionary: <setLetter: exposant>
         */
        set literal(L: { [Key: string]: number }) {
            this._literal = L;
        }

        /**
         * Set the literal part of the monom from a string
         * @param inputStr  String like x^2y^3
         */
        set literalStr(inputStr: string) {
            // Match all x^n
            for (const v of [...inputStr.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) {
                if (!(v[1] in this._literal)) {
                    this._literal[v[1]] = 0;
                }
                this._literal[v[1]] += +v[2];
            }
            for (const v of [...inputStr.matchAll(/([a-z](?!\^))/g)]) {
                // Match all single letters
                if (!(v[1] in this._literal)) {
                    this._literal[v[1]] = 0;
                }
                this._literal[v[1]] += 1;
            }
        }

        // Getter heplers.
        /**
         * Get the variables letters
         */
        get variables(): string[] {
            this.clone().clean();
            return Object.keys(this._literal)
        }

        // Display getter
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
                // No setLetter - means it's only a number !
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

        get dividers(): Monom[] {
            // Decompose only if the coefficient it a complet value
            if (this.coefficient.denominator !== 1) {
                return [this.clone()]
            }

            // Security : do not do this if greater than 10000
            if (this.coefficient.numerator > 10000) {
                return [this.clone()]
            }
            const dividers = Numeric.dividers(Math.abs(this.coefficient.numerator))

            // Decompose the litterals parts.
            let litterals: { [key: string]: number }[] = [];
            for (let L in this.literal) {
                // L is the letter.
                litterals = this._getLitteralDividers(litterals, L)
            }

            const monomDividers: Monom[] = [];
            if (litterals.length > 0 && dividers.length > 0) {
                for (let N of dividers) {
                    for (let L of litterals) {
                        let M = new Monom();
                        M.coefficient = new Fraction(N)
                        M.literal = L
                        monomDividers.push(M)
                    }
                }
            } else if (dividers.length === 0) {
                for (let L of litterals) {
                    let M = new Monom();
                    M.coefficient = new Fraction().one()
                    M.literal = L
                    monomDividers.push(M)
                }
            } else {
                for (let N of dividers) {
                    let M = new Monom();
                    M.coefficient = new Fraction(N)
                    monomDividers.push(M)
                }
            }

            return monomDividers.length === 0 ? [new Monom().one()] : monomDividers;
        }

        private _getLitteralDividers(arr: { [key: string]: number }[], letter: string): { [key: string]: number }[] {
            let tmpList: { [key: string]: number }[] = [];

            for (let d = 0; d <= this.literal[letter]; d++) {
                if (arr.length === 0) {
                    let litt: { [key: string]: number } = {}
                    litt[letter] = d
                    tmpList.push(litt)
                } else {
                    for (let item of arr) {
                        let litt: { [key: string]: number } = {}
                        for (let currentLetter in item) {
                            litt[currentLetter] = item[currentLetter]
                        }
                        litt[letter] = d
                        tmpList.push(litt)
                    }
                }
            }
            return tmpList;
        }

        /**
         * Display the monom, forcing the '+' sign to appear
         */
        get displayWithSign(): string {
            // TODO: Rename or remove this getter ?
            let d: String = this.display;
            return (d[0] !== '-' ? '+' : '') + d;
        }

        /**
         * Get the tex output of the monom
         */
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
                // No setLetter - means it's only a number !
                if (this._coefficient.value != 0) {
                    return `${this._coefficient.dfrac}`;
                } else {
                    return '0';
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
        }

        // ------------------------------------------
        // Creation / parsing functions
        // -----------------------------------------
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
                this._coefficient.multiply(new Fraction(v.trim()));
            }

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
                F.setLetter(k, this._literal[k]);
            }
            return F;
        };

        /**
         * Create a zero value monom
         */
        zero = (): Monom => {
            this._coefficient = new Fraction().zero();
            this._literal = {};
            return this;
        };

        /**
         * Create a one value monom
         */
        one = (): Monom => {
            this._coefficient = new Fraction().one();
            this._literal = {};
            return this;
        };

        /**
         * Clean the monom by removing each letters with a power of zero.
         */
        clean = (): Monom => {
            for (let letter in this._literal) {
                if (this._literal[letter] === 0) {
                    delete this._literal[letter];
                }
            }

            return this;
        };

        // ------------------------------------------
        // Mathematical operations
        // ------------------------------------------

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
         * Subtract multiple monoms
         * @param M (Monom[]) The monoms to subtract
         */
        subtract = (...M: Monom[]): Monom => {
            for (let m of M) {
                if (this.isSameAs(m)) {
                    this._coefficient.add(m.coefficient.clone().opposed());
                } else {
                    console.log('Subtract: Is not similar: ', m.display);
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

        multiplyByNumber = (F: Fraction | number): Monom => {
            this._coefficient.multiply(F);
            return this;
        }

        /**
         * Divide the current monoms by multiple monoms
         * @param M (Monom[])
         */
        divide = (...M: Monom[]): Monom => {
            // Depending on the given value, choose the current item
            for (let v of M) {
                // Divide the coefficient
                this._coefficient.divide(v.coefficient);

                // Subtract the power values
                for (let letter in v.literal) {
                    this._literal[letter] = (this._literal[letter] === undefined) ? -v.literal[letter] : this._literal[letter] - v.literal[letter];

                    // If the power of a particular setLetter is zero, delete it from the literal part..
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

        /**
         * Get the nth-root of the monom
         * @param p
         */
        root = (p: number): Monom => {
            // TODO: determiner the nth root of a monom
            return this;
        }

        /**
         * Return the square root of a monom
         */
        sqrt = (): Monom => {
            if (this.isSquare()) {
                this._coefficient.sqrt();
                for (let letter in this._literal) {
                    this._literal[letter] /= 2;
                }
            }
            return this.root(2);
        }

        // ------------------------------------------
        // Compare functions
        // ------------------------------------------
        compare = (M: Monom, sign?: string): boolean => {
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

                    // The litteral parts are the isSame. The coefficient must be equal
                    return this._coefficient.isEqual(M.coefficient);
                case 'same':
                    // Get the list of all variables from both monoms.
                    let M1: string[] = this.variables,
                        M2: string[] = M.variables,
                        K: string[] = M1.concat(M2.filter((item) => M1.indexOf(item) < 0));

                    for (let key of K) {
                        // The setLetter is not available in one of the monom
                        if (this._literal[key] === undefined || M.literal[key] === undefined) {
                            return false;
                        }
                        // The setLetter does not have the isSame power in each monoms.
                        if (this._literal[key] !== M.literal[key]) {
                            return false;
                        }
                    }

                    // All are positive check - the monoms are the sames.
                    return true;
                default:
                    return false;
            }
        }

        /**
         * Determine if the monom is null
         */
        isZero(): boolean {
            return this._coefficient.value === 0;
        }

        /**
         * Determine if the monom is one
         */
        isOne(): boolean {
            return this._coefficient.value === 1 && this.variables.length === 0;
        }

        /**
         * Determine if two monoms are equals
         * @param M
         */
        isEqual = (M: Monom): boolean => {
            return this.compare(M, '=');
        };

        /**
         * Determine if two monoms are similar
         * @param M
         */
        isSameAs = (M: Monom): boolean => {
            return this.compare(M, 'same');
        };

        isSquare = (): boolean => {
            if (!this.coefficient.isSquare()) {
                return false;
            }
            return this.isLitteralSquare();
        }

        isLitteralSquare = (): boolean => {
            for (let letter in this.literal) {
                if (this.literal[letter] % 2 !== 0) {
                    return false;
                }
            }
            return true;
        }
        // ------------------------------------------
        // Misc monoms functions
        // -------------------------------------
        /**
         * Determine if a monom contains a setLetter in it's literal part
         * @param letter
         */
        hasLetter = (letter?: string): boolean => {
            return this._literal[letter === undefined ? 'x' : letter] > 0;
        };

        /**
         * Set the power of a particular setLetter
         * @param letter (string) Letter to change
         * @param pow (number) Power of the setLetter (must be positive integer.
         */
        setLetter = (letter: string, pow: number): void => {
            // If the power is not legal or is zero, remove the setLetter from the dict
            if (pow <= 0 || !Number.isSafeInteger(pow)) {
                if (this._literal[letter] !== undefined) {
                    delete this._literal[letter];
                }
            } else {
                this._literal[letter] = pow;
            }
        };

        /**
         * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
         * @param letter (string) Letter to get to degree (power)
         */
        degree = (letter?: string): number => {
            if (this.variables.length === 0) {
                return 0;
            }
            if (letter === undefined) {
                // Not setLetter given -> we get the global monom degree (sum of all the letters).
                return Object.values(this._literal).reduce((t, n) => t + n);
            } else {
                // A setLetter is given -> get the corresponding power.
                return this._literal[letter] === undefined ? 0 : this._literal[letter];
            }
        };

        /**
         * Evaluate a monom. Each setLetter must be assigned to a Fraction.
         * @param values    Dictionary of <setLetter: Fraction>
         */
        evaluate = (values: { [key: string]: Fraction | number } | Fraction | number): Fraction => {
            let r = this.coefficient.clone();

            if (typeof values === 'number' || values instanceof Fraction) {
                let tmpValues: { [key: string]: Fraction | number } = {}

                tmpValues[this.variables[0]] = new Fraction(values)
                return this.evaluate(tmpValues);
            }

            if (typeof values === 'object') {
                for (let L in this._literal) {
                    if (values[L] === undefined) {
                        return new Fraction().zero();
                    }
                    let value = new Fraction(values[L])
                    r.multiply(value.pow(this._literal[L]));
                }
            }
            return r;
        };

        /**
         * Derivative the monom
         * @param letter
         */
        derivative = (letter?: string): Monom => {
            // No setLetter given - assume it's the setLetter 'x'
            if (letter === undefined) {
                letter = 'x';
            }
            if (this.hasLetter(letter)) {
                let d = +this._literal[letter],
                    dM = this.clone();

                // Subtract one to the degree.
                dM._literal[letter] -= 1;

                // Multiply the coefficient by the previous degree
                dM._coefficient.multiply(new Fraction('' + d));
                return dM;
            } else {
                return new Monom().zero();
            }
        };

        primitive = (letter?: string): Monom => {
            if (letter === undefined) {
                letter = 'x'
            }

            // Zero monom
            let M = this.clone()

            if (M.hasLetter(letter)) {
                M.coefficient = M.coefficient.clone().divide(M.degree(letter) + 1)
                M.setLetter(letter, M.degree(letter) + 1)
            } else {
                // There is no letter.

                // The coefficient might be zero (=> x) or a number a (=> ax)
                if (M.coefficient.isZero()) {
                    M.coefficient = new Fraction().one()
                }
                M.setLetter(letter, 1)
            }
            return M
        }
        // ----------------------------------------
        // Static functions
        // ----------------------------------------

        /**
         * Get the least common multiple of monoms
         * @param monoms    Array of monoms
         */
        static lcm = (...monoms: Monom[]): Monom => {
            let M = new Monom(),
                coeffN: number[] = monoms.map(value => value.coefficient.numerator),
                coeffD: number[] = monoms.map(value => value.coefficient.denominator),
                n = Numeric.gcd(...coeffN),
                d = Numeric.lcm(...coeffD);

            // Get the coefficient.
            M.coefficient = new Fraction(n, d).reduce();

            // Set the literal parts - go through each monoms literal parts and get only the lowest degree of each letters.
            for (let m of monoms) {
                // Remove the inexistant letters from the resulting monom
                for (let letter in M.literal) {
                    if (!(letter in m.literal)) {
                        M.literal[letter] = 0;
                    }
                }
                for (let letter in m.literal) {
                    if (M.literal[letter] === undefined && m.literal[letter] > 0) {
                        M.literal[letter] = m.literal[letter];
                    } else {
                        M.literal[letter] = Math.min(m.literal[letter], M.literal[letter]);
                    }
                }
            }

            return M;
        };

        /**
         * Multiply two monoms and return a NEW monom.
         * @param monoms
         */
        static xmultiply = (...monoms: Monom[]): Monom => {
            let M = new Monom().one();

            for (let m of monoms) {
                M.multiply(m);
            }

            return M;
        };


        // TODO: The rest of the functions are not used or unnecessary ?
        /**
         * Determine if multiple monoms are similar
         * @param M
         */
        areSameAs = (...M: Monom[]): boolean => {
            let result: boolean = true;

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

    }
