/***
 * Monom class
 */
import {Fraction} from "../coefficients";
import {Numeric} from "../numeric";
import {Shutingyard} from "../shutingyard";

export type literalType = {
    [Key: string]: Fraction
}

export class Monom {
    private _coefficient: Fraction;
    private _literal: literalType;

    /**
     * Create a Monom
     * Defined as \\(k \\cdot x^{n}\\), where \\( k,n \in \\mathbb{Q}\\).
     * Examples: \\(3x^2\\) or \\(3/5x^2\\)
     * @param value (optional) string The value that should be parse. Can be a Monom, a Fraction, a string or a number. If nothing is provided, it will return the trivial monom (0).
     */
    constructor(value?: unknown) {
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
    get coefficient(): Fraction {
        return this._coefficient;
    }

    /**
     * Set the coefficient \\(k\\) value of the monom
     * @param {Fraction | number | string} F
     */
    set coefficient(F: Fraction | number | string) {
        this._coefficient = new Fraction(F);
    }

    /**
     * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
     * @returns {literalType}
     */
    get literal(): literalType {
        return this._literal;
    }

    /**
     * Get the literal square roots of the Monom.
     * TODO: remove this getter ? Is it used and is it correct ?
     * @returns {literalType}
     */
    get literalSqrt(): literalType {
        if (this.isLiteralSquare()) {
            let L: literalType = {}
            for (let key in this._literal) {
                L[key] = this._literal[key].clone().sqrt()
            }
            return L;
        } else {
            return this._literal;
        }
    }

    /**
     * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
     * @param {literalType} L
     */
    set literal(L: literalType) {
        this._literal = L;
    }

    /**
     * Set the literal part of the monom from a string
     * @param inputStr  String like x^2y^3
     */
    set literalStr(inputStr: string) {
        // TODO : parse using shutingyard tree !

        // Match all x^n
        for (const v of [...inputStr.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) {
            // Create the default letter entry if necessary.
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = new Fraction().zero();
            }

            // Add the new value.
            // TODO: actually, it adds only numeric value
            this._literal[v[1]].add(+v[2]);
        }

        // Match all x
        for (const v of [...inputStr.matchAll(/([a-z](?!\^))/g)]) {
            // Match all single letters
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = new Fraction().zero();
            }

            // Add one to the value.
            this._literal[v[1]].add(1)
        }
    }

    // Getter helpers.
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
        let L: string = '',
            letters = Object.keys(this._literal).sort()
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
        // Decompose only if the coefficient is a natural number
        if (this.coefficient.denominator !== 1) {
            return [this.clone()]
        }
        // Decompose only if the power values are natural numbers.
        if (this.hasFractionCoefficient) {
            return [this.clone()]
        }

        // Security : do not do this if greater than 10000
        if (this.coefficient.numerator > 10000) {
            return [this.clone()]
        }
        const dividers = Numeric.dividers(Math.abs(this.coefficient.numerator))

        // Decompose the literals parts.
        let literals: literalType[] = [];
        for (let L in this.literal) {
            // L is the letter.
            literals = this._getLiteralDividers(literals, L)
        }

        const monomDividers: Monom[] = [];
        if (literals.length > 0 && dividers.length > 0) {
            for (let N of dividers) {
                for (let L of literals) {
                    let M = new Monom();
                    M.coefficient = new Fraction(N)
                    M.literal = L
                    monomDividers.push(M)
                }
            }
        } else if (dividers.length === 0) {
            for (let L of literals) {
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

    private _getLiteralDividers(arr: literalType[], letter: string): literalType[] {
        let tmpList: { [key: string]: Fraction }[] = [];

        // Be default, this.literal[letter] should be a rational number.
        for (let d = 0; d <= this.literal[letter].value; d++) {
            if (arr.length === 0) {
                let litt: literalType = {}
                litt[letter] = new Fraction(d)
                tmpList.push(litt)
            } else {
                for (let item of arr) {
                    let litt: literalType = {}
                    for (let currentLetter in item) {
                        litt[currentLetter] = item[currentLetter]
                    }
                    litt[letter] = new Fraction(d)
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
        let d: String = this.display;
        return (d[0] !== '-' ? '+' : '') + d;
    }

    get texWithSign(): string {
        if (this.coefficient.isStrictlyPositive()) {
            return '+' + this.tex
        }

        return this.tex
    }

    /**
     * Get the tex output of the monom
     */
    get tex(): string {
        // TODO: display with square root !
        let L: string = '',
            letters = Object.keys(this._literal).sort()

        for (let letter of letters) {
            if (this._literal[letter].isNotZero()) {
                L += `${letter}`;
                if (this._literal[letter].isNotEqual(1)) {
                    L += `^{${this._literal[letter].display}}`;
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
    parse = (inputStr: unknown): Monom => {

        if (typeof inputStr === 'string') {
            this._shutingYardToReducedMonom(inputStr)
        } else if (typeof inputStr === 'number') {
            this._coefficient = new Fraction(inputStr)
            this._literal = {}
        } else if (inputStr instanceof Fraction) {
            this._coefficient = inputStr.clone()
            this._literal = {}
        } else if (inputStr instanceof Monom) {
            this._coefficient = inputStr._coefficient.clone()
            this._literal = this.copyLiterals(inputStr.literal)
        }

        return this;
    };

    private _shutingYardToReducedMonom = (inputStr: string): Monom => {
        // Get the RPN array of the current expression
        const SY: Shutingyard = new Shutingyard().parse(inputStr);
        const rpn: { token: string, tokenType: string }[] = SY.rpn;

        let stack: Monom[] = [], m, pow, letter, q1, q2

        if (rpn.length === 0) {
            this.zero()
            return this
        } else if (rpn.length === 1) {
            const element = rpn[0]

            this.one()
            if (element.tokenType === 'coefficient') {
                this.coefficient = new Fraction(element.token)
            } else if (element.tokenType === 'variable') {
                this.setLetter(element.token, 1)
            }
            return this
        } else {
            // Reset the monom
            for (const element of rpn) {
                if (element.tokenType === 'coefficient') {
                    let M = new Monom().one()
                    M.coefficient = new Fraction(element.token)
                    stack.push(M.clone())
                } else if (element.tokenType === 'variable') {
                    let M = new Monom().one()
                    M.setLetter(element.token, 1)
                    stack.push(M.clone())
                } else if (element.tokenType === 'operation') {
                    switch (element.token) {
                        case '-':
                            // this should only happen for negative powers or for negative coefficient.
                            q2 = (stack.pop()) || new Monom().zero()
                            q1 = (stack.pop()) || new Monom().zero()

                            stack.push(q1.subtract(q2))

                            break;
                        case '*':
                            // Get the last element in the stack
                            q2 = (stack.pop()) || new Monom().one()
                            q1 = (stack.pop()) || new Monom().one()

                            stack.push(q1.multiply(q2))
                            break
                        case '^':
                            // get the two last elements in the stack
                            pow = (stack.pop().coefficient) || new Fraction().one()
                            m = (stack.pop()) || new Monom().one()

                            letter = m.variables[0]

                            if (letter !== undefined) {
                                m.setLetter(letter, pow)
                            }

                            stack.push(m)
                            // this.multiply(m.clone())
                            break
                    }
                }
            }
        }

        this.one()
        this.multiply(stack[0])
        return this
    }
    /**
     * Clone the current Monom.
     */
    clone = (): Monom => {
        let F: Monom = new Monom();

        F.coefficient = this._coefficient.clone();

        // Copy the literal parts.
        for (let k in this._literal) {
            F.setLetter(k, this._literal[k].clone());
        }
        return F;
    };

    copyLiterals = (literal: literalType): literalType => {
        let L: literalType = {}

        for (let k in literal) {
            L[k] = literal[k].clone()
        }
        return L
    }

    makeSame = (M: Monom): Monom => {
        // Copy the literal parts.
        for (let k in M._literal) {
            this.setLetter(k, M._literal[k].clone());
        }
        return this
    }

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
            if (this._literal[letter].isZero()) {
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
                if (this.isZero()) {
                    this.makeSame(m)
                }
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
                if (this.isZero()) {
                    this.makeSame(m)
                }
                this._coefficient.add(m.clone().coefficient.opposed());
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
                if (this._literal[letter] === undefined) {
                    this._literal[letter] = m.literal[letter].clone()
                } else {
                    this._literal[letter].add(m.literal[letter])
                }

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
                this._literal[letter] = (this._literal[letter] === undefined) ? v.literal[letter].clone().opposed() : this._literal[letter].subtract(v.literal[letter])

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
    pow = (nb: number): Monom => {
        this._coefficient.pow(nb);
        for (let letter in this._literal) {
            this._literal[letter].pow(nb)
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
                this._literal[letter].clone().divide(2)
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

                // The literal parts are the isSame. The coefficient must be equal
                return this._coefficient.isEqual(M.coefficient);
            case 'same':
                // Get the list of all variables from both monoms.
                let M1: string[] = this.variables,
                    M2: string[] = M.variables,
                    K: string[] = M1.concat(M2.filter((item) => M1.indexOf(item) < 0));

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
        return this.isLiteralSquare();
    }

    isLiteralSquare = (): boolean => {
        for (let letter in this.literal) {
            // A literal square must have a natural power
            if (this.literal[letter].isRational()) {
                return false
            }

            // The natural power must be be even
            if (this.literal[letter].isEven()) {
                return false;
            }
        }

        return true;
    }

    hasFractionCoefficient = (): boolean => {
        for (let letter in this._literal) {
            if (this._literal[letter].isRational()) {
                return true
            }
        }

        return false
    }
    // ------------------------------------------
    // Misc monoms functions
    // -------------------------------------
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    hasLetter = (letter?: string): boolean => {
        // The letter was not found
        if (this._literal[letter === undefined ? 'x' : letter] === undefined) {
            return false
        }

        // The letter is found and is not zero !
        return this._literal[letter === undefined ? 'x' : letter].isNotZero();
    };

    /**
     * Set the power of a particular setLetter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the setLetter (must be positive integer.
     */
    setLetter = (letter: string, pow: Fraction | number): void => {
        if (pow instanceof Fraction) {
            // Set the power of the letter to zero => remove it
            if (this.hasLetter(letter) && pow.isZero()) {
                delete this._literal[letter]
            }

            this._literal[letter] = pow.clone()
        } else {
            this.setLetter(letter, new Fraction(pow))
        }
    };

    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    degree = (letter?: string): Fraction => {
        if (this.variables.length === 0) {
            return new Fraction().zero();
        }
        if (letter === undefined) {
            // Not setLetter given -> we get the global monom degree (sum of all the letters).
            return Object.values(this._literal).reduce((t, n) => t.clone().add(n));
        } else {
            // A setLetter is given -> get the corresponding power.
            return this._literal[letter] === undefined ? new Fraction().zero() : this._literal[letter].clone();
        }
    };

    /**
     * Evaluate a monom. Each setLetter must be assigned to a Fraction.
     * @param values    Dictionary of <setLetter: Fraction>
     */
    evaluate = (values: literalType | Fraction | number): Fraction => {
        let r = this.coefficient.clone();

        if (typeof values === 'number' || values instanceof Fraction) {
            let tmpValues: literalType = {}

            tmpValues[this.variables[0]] = new Fraction(values)
            return this.evaluate(tmpValues);
        }

        if (typeof values === 'object') {
            for (let L in this._literal) {
                if (values[L] === undefined) {
                    return new Fraction().zero();
                }

                let value = new Fraction(values[L])
                r.multiply(value.pow(this._literal[L]))
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
            let d = this._literal[letter].clone(),
                dM = this.clone();

            // Subtract one to the degree.
            dM._literal[letter].subtract(1)

            // Multiply the coefficient by the previous degree
            dM._coefficient.multiply(new Fraction(d.clone()));
            return dM;
        } else {
            return new Monom().zero();
        }
    };

    primitive = (letter?: string): Monom => {
        // TODO: derivative including the ln value => implies creating different monom system ?
        if (letter === undefined) {
            letter = 'x'
        }

        // Zero monom
        let M = this.clone(), degree

        if (M.hasLetter(letter)) {
            degree = M.degree(letter).clone().add(1)
            M.coefficient = M.coefficient.clone().divide(degree)
            M.setLetter(letter, degree)
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
        // All the monoms must be with natural powers...
        for (let m of monoms) {
            if (m.hasFractionCoefficient()) {
                return new Monom().zero()
            }
        }


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
                    M.literal[letter].zero();
                }
            }
            for (let letter in m.literal) {
                if (M.literal[letter] === undefined && m.literal[letter].isStrictlyPositive()) {
                    M.literal[letter] = m.literal[letter].clone();
                } else {
                    M.literal[letter] = new Fraction(Math.min(m.literal[letter].value, M.literal[letter].value))
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
