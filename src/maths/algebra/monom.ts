/***
 * Monom class
 * The monom class represents of monom of the form:
 * k * x^n * y^m * z^p
 * k: Coefficient
 * n, m, p: powers as Fraction
 * x, y, z: letters as string
 */
import {Numeric} from "../numeric";
import {Shutingyard, ShutingyardType, Token} from "../shutingyard";
import {COMPARESIGNS, literalType} from "../types";
import {RootFraction} from "../coefficients/rootFraction";
import {
    COEFFICIENT_MODE,
    CoefficientCore,
    CoefficientParserTypes,
    CoefficientTypes
} from "../coefficients/coefficientCore";
import {Fraction} from "../coefficients/fraction";


export class Monom {
    private _coefficientMode: COEFFICIENT_MODE

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

    private _coefficient: CoefficientCore<any>;

    // ------------------------------------------
    /**
     * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
     * @returns {Fraction}
     */
    get coefficient(): CoefficientCore<any> {
        return this._coefficient;
    }

    /**
     * Set the coefficient \\(k\\) value of the monom
     * @param {Fraction | number | string} F
     */
    set coefficient(F: CoefficientParserTypes) {
        this._coefficient = this.makeCoefficient(F);
    }

    private _literal: literalType;

    /**
     * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
     * @returns {literalType}
     */
    get literal(): literalType {
        return this._literal;
    }

    /**
     * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
     * @param {literalType} L
     */
    set literal(L: literalType) {
        this._literal = L;
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
     * Set the literal part of the monom from a string
     * @param inputStr  String like x^2y^3
     */
    set literalStr(inputStr: string) {
        // TODO : parse using shutingyard tree !

        // Match all x^n
        for (const v of [...inputStr.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) {
            // Create the default letter entry if necessary.
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = this.makeCoefficient().zero();
            }

            // Add the new value.
            // TODO: actually, it adds only numeric value
            this._literal[v[1]].add(+v[2]);
        }

        // Match all x
        for (const v of [...inputStr.matchAll(/([a-z](?!\^))/g)]) {
            // Match all single letters
            if (!(v[1] in this._literal)) {
                this._literal[v[1]] = this.makeCoefficient().zero();
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
        let M = this.clone().clean();
        return Object.keys(M.literal)
    }

    // Display getter
    /**
     * This display getter is to be used in the polynom display getter
     */
    get display(): string {
        let L: string = '',
            letters = Object.keys(this._literal).sort()
        for (let letter of letters) {
            if (!this._literal[letter].isZero()) {
                L += `${letter}`;
                if (!this._literal[letter].isEqualTo(1)) {
                    L += `^(${this._literal[letter].display})`;
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
        if (!this.coefficient.isRelative()) {
            return [this.clone()]
        }


        // Decompose only if the power values are natural numbers.
        if (this.hasFractionCoefficient()) {
            return [this.clone()]
        }

        // Security : do not do this if isGreaterThan than 10000
        if (this.coefficient.numerator > 1000000) {
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
                    M.coefficient = this.makeCoefficient(N)
                    M.literal = L
                    monomDividers.push(M)
                }
            }
        } else if (dividers.length === 0) {
            for (let L of literals) {
                let M = new Monom();
                M.coefficient = this.makeCoefficient().one()
                M.literal = L
                monomDividers.push(M)
            }
        } else {
            for (let N of dividers) {
                let M = new Monom();
                M.coefficient = this.makeCoefficient(N)
                monomDividers.push(M)
            }
        }

        return monomDividers.length === 0 ? [new Monom().one()] : monomDividers;
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

    get plotFunction(): string {

        let L: string = '',
            letters = Object.keys(this._literal).sort()

        for (let letter of letters) {
            if (!this._literal[letter].isZero()) {
                L += (L === '' ? "" : "*") + `${letter}`
                if (!this._literal[letter].isEqualTo(1)) {
                    L += `^(${this._literal[letter].display})`;
                }
            }
        }

        // No literal part
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
                return `${this._coefficient.display}*${L}`;
            }
        }
    }

    // ------------------------------------------
    // Creation / parsing functions

    /**
     * Get the tex output of the monom
     */
    get tex(): string {
        // TODO: display with square root !
        let L: string = '',
            letters = Object.keys(this._literal).sort()

        for (let letter of letters) {
            if (!this._literal[letter].isZero()) {
                L += `${letter}`;
                if (!this._literal[letter].isEqualTo(1)) {
                    L += `^{${this._literal[letter].asTopFraction().tex}}`;
                }
            }
        }

        if (L === '') {
            // No setLetter - means it's only a number !
            if (this._coefficient.value != 0) {
                return `${this._coefficient.tex}`;
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
                return `${this._coefficient.tex}${L}`;
            }
        }
    }

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
        M.coefficient = this.makeCoefficient(n, d).reduce();

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
                    M.literal[letter] = this.makeCoefficient(Math.min(m.literal[letter].value, M.literal[letter].value))
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

    makeCoefficient = (...values: CoefficientParserTypes[]): CoefficientTypes => {
        if (this._coefficientMode === COEFFICIENT_MODE.FRACTION) {
            return new Fraction(...values as (Fraction | string | number)[])
        } else if (this._coefficientMode === COEFFICIENT_MODE.ROOT) {
            return new RootFraction(...values as (RootFraction | Fraction | string | number)[])
        }

        // TODO: add the other modes
        return new Fraction(...values as (Fraction | string | number)[])
    }

// -----------------------------------------
    /**
     * Parse a string to a monom. The string may include fraction.
     * @param inputStr
     */
    parse = (inputStr: unknown): Monom => {

        if (typeof inputStr === 'string') {
            this._shutingYardToReducedMonom(inputStr)
        } else if (typeof inputStr === 'number') {
            this._coefficient = this.makeCoefficient(inputStr)
            this._literal = {}
        } else if (inputStr instanceof Fraction) {
            this._coefficient = inputStr.clone()
            this._literal = {}
        } else if (inputStr instanceof RootFraction) {
            this._coefficient = inputStr.clone()
            this._literal = {}
        } else if (inputStr instanceof Monom) {
            this._coefficient = inputStr._coefficient.clone()
            this._literal = this.copyLiterals(inputStr.literal)
        }

        return this;
    };

    addToken = (stack: Monom[], element: Token): void => {

        let q1: Monom, q2: Monom, m: Monom, letter: string, pow: CoefficientCore<any>

        if (element.tokenType === ShutingyardType.COEFFICIENT) {
            stack.push(new Monom(this.makeCoefficient(element.token)))

        } else if (element.tokenType === ShutingyardType.VARIABLE) {
            let M = new Monom().one()
            M.setLetter(element.token, 1)
            stack.push(M.clone())

        } else if (element.tokenType === ShutingyardType.OPERATION) {
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
                case '/':
                    // Get the last element in the stack
                    q2 = (stack.pop()) || new Monom().one()
                    q1 = (stack.pop()) || new Monom().one()

                    stack.push(q1.divide(q2))
                    break
                case '^':
                    // get the two last elements in the stack
                    pow = (stack.pop().coefficient) || this.makeCoefficient().one()
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
        this._coefficient = this.makeCoefficient().zero();
        this._literal = {};
        return this;
    };

    /**
     * Create a one value monom
     */
    one = (): Monom => {
        this._coefficient = this.makeCoefficient().one();
        this._literal = {};
        return this;
    };

// ------------------------------------------
// Mathematical operations
// ------------------------------------------

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

    reduce = (): Monom => {
        this.clean()
        this.coefficient.reduce()
        return this
    }

    /**
     * Get the opposite
     * Returns a monom.
     */
    opposed = (): Monom => {
        this._coefficient.opposite();
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
                console.log('Add monom: ' + this.display + ' is not similar with ', m.display);
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
                this._coefficient.add(m.clone().coefficient.opposite());
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
                this._literal[letter] = (this._literal[letter] === undefined) ? v.literal[letter].clone().opposite() : this._literal[letter].subtract(v.literal[letter])

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
    pow = (nb: number | Fraction): Monom => {
        this._coefficient.pow(nb);
        for (let letter in this._literal) {
            this._literal[letter].multiply(nb)
        }
        return this;
    };

// ------------------------------------------
// Compare functions

    /**
     * Get the index-root of the monom
     * @param p
     */
    root = (p: number): Monom => {
        // TODO: determiner the index root of a monom
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
    compare = (M: Monom, sign?: COMPARESIGNS): boolean => {
        // TODO: Build the compare systems.
        if (sign === undefined) {
            sign = COMPARESIGNS.EQUALS;
        }


        switch (sign) {
            case COMPARESIGNS.EQUALS:
                // To be equal, they must be the isSame
                if (!this.compare(M, COMPARESIGNS.SAME)) {
                    return false;
                }

                // The literal parts are the isSame. The coefficient must be equal
                return this._coefficient.isEqualTo(M.coefficient);
            case COMPARESIGNS.SAME:
                // Get the list of all variables from both monoms.
                let M1: string[] = this.variables,
                    M2: string[] = M.variables,
                    K: string[] = M1.concat(M2.filter((item) => M1.indexOf(item) < 0));

                if (M1.length === 0 && M2.length === 0) {
                    return true
                }
                // To compare, both must be different than zero.
                if (!this.isZero() && !M.isZero()) {
                    for (let key of K) {
                        // The setLetter is not available in one of the monom
                        if (this._literal[key] === undefined || M.literal[key] === undefined) {
                            return false;
                        }
                        // The setLetter does not have the isSame power in each monoms.
                        if (!this._literal[key].isEqualTo(M.literal[key])) {
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
    isZero()
        :
        boolean {
        return this._coefficient.value === 0;
    }

    /**
     * Determine if the monom is one
     */
    isOne()
        :
        boolean {
        return this._coefficient.value === 1 && this.variables.length === 0;
    }

    /**
     * Determine if two monoms are equals
     * @param M
     */
    isEqual = (M: Monom): boolean => {
        return this.compare(M, COMPARESIGNS.EQUALS);
    };

    /**
     * Determine if two monoms are similar
     * @param M
     */
    isSameAs = (M: Monom): boolean => {
        return this.compare(M, COMPARESIGNS.SAME);
    };

    isSquare = (): boolean => {
        if (!this.coefficient.isSquare()) {
            return false;
        }
        return this.isLiteralSquare();
    }
// ------------------------------------------
// Misc monoms functions

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
        return !this._literal[letter === undefined ? 'x' : letter].isZero();
    };

    /**
     * Set the power of a particular setLetter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the setLetter (must be positive integer.
     */
    setLetter = (letter: string, pow: CoefficientCore<any> | number): void => {
        if (pow instanceof CoefficientCore) {
            // Set the power of the letter to zero => remove it
            if (this.hasLetter(letter) && pow.isZero()) {
                delete this._literal[letter]
            }

            this._literal[letter] = pow.clone()
        } else {
            this.setLetter(letter, this.makeCoefficient(pow))
        }
    };

    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    degree = (letter?: string): CoefficientTypes => {
        if (this.variables.length === 0) {
            return this.makeCoefficient().zero();
        }
        if (letter === undefined) {
            // Not setLetter given -> we get the global monom degree (sum of all the letters).
            return Object.values(this._literal)
                .reduce(
                    (t, n) => t.clone().add(n)
                );
        } else {
            // A setLetter is given -> get the corresponding power.
            return this._literal[letter] === undefined ? this.makeCoefficient().zero() : this._literal[letter].clone();
        }
    };

    /**
     * Evaluate a monom. Each setLetter must be assigned to a Fraction.
     * @param values    Dictionary of <setLetter: Fraction>
     */
    evaluate = (values?: literalType | Fraction | number): CoefficientCore<any> => {
        let r = this.coefficient.clone();

        if (typeof values === 'number' || values instanceof Fraction) {
            let tmpValues: literalType = {}
            tmpValues[this.variables[0]] = this.makeCoefficient(values)
            return this.evaluate(tmpValues);
        }

        if (typeof values === 'object') {
            if (this.variables.length === 0) {
                return this.coefficient
            }
            for (let L in this._literal) {
                if (values[L] === undefined) {
                    return this.makeCoefficient().zero();
                }

                let value = this.makeCoefficient(values[L])

                r.multiply(value.pow(this._literal[L]))
            }
        }

        return r;
    };

    evaluateAsNumeric = (values: { [Key: string]: number } | number): number => {
        let r = this.coefficient.value

        if (typeof values === 'number') {
            let tmpValues: { [Key: string]: number } = {}
            tmpValues[this.variables[0]] = values
            return this.evaluateAsNumeric(tmpValues);
        }

        if (typeof values === 'object') {
            if (this.variables.length === 0) {
                return this.coefficient.value
            }
            for (let L in this._literal) {
                if (values[L] === undefined) {
                    return 0;
                }

                r *= values[L] ** (this._literal[L].value)
            }
        }

        return r
    }
// ----------------------------------------
// Static functions
// ----------------------------------------

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
            dM._coefficient.multiply(this.makeCoefficient(d.clone()));
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
                M.coefficient = this.makeCoefficient().one()
            }
            M.setLetter(letter, 1)
        }

        return M
    }

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
            if (!this._coefficient.isEqualTo(m.coefficient)) {
                return false;
            }
        }

        // All checks passed.
        return true;
    };

    isDivisible = (div: Monom): boolean => {
        // For all variables (letters), the current monom must have a degree higher than the divider
        if (div.degree().isStrictlyPositive()) {
            for (let letter of div.variables) {
                if (!this.degree(letter).isGreaterOrEqualTo(div.degree(letter))) {
                    return false
                }
            }
        }

        // If the coefficient is rational, we suppose we don't need to check the division by the coefficient.
        if (this.coefficient.isRational() || div.coefficient.isRational()) {
            return true
        }

        return this.coefficient.clone().divide(div.coefficient).isRelative()
    }

    isInverted(M
                   :
                   Monom
    ):
        boolean {
        return this.clone().multiply(M).isOne();
    }

    isNegativeOne()
        :
        boolean {
        return this._coefficient.value === -1 && this.variables.length === 0;
    }

    isNotEqual(M
                   :
                   Monom
    ):
        boolean {
        return !this.isEqual(M);
    }

    isNotZero()
        :
        boolean {
        return !this.isZero();
    }

    isOpposed(M
                  :
                  Monom
    ):
        boolean {
        return this.clone().subtract(M).isZero();
    }

    isReduced()
        :
        boolean {
        // By construction, it is already reduced (litterals
        return this.coefficient.isReduced();
    }

    reset()
        :
        any {
        this._coefficient = this.makeCoefficient()
        this._literal = {}
    }

    _getLiteralDividers(arr: literalType[], letter: string):
        literalType[] {
        let tmpList: { [key: string]: CoefficientTypes }[] = [];

        // Be default, this.literal[letter] should be a rational number.
        for (let d = 0; d <= this.literal[letter].value; d++) {
            if (arr.length === 0) {
                let litt: literalType = {}
                litt[letter] = this.makeCoefficient(d)
                tmpList.push(litt)
            } else {
                for (let item of arr) {
                    let litt: literalType = {}
                    for (let currentLetter in item) {
                        litt[currentLetter] = item[currentLetter]
                    }
                    litt[letter] = this.makeCoefficient(d)
                    tmpList.push(litt)
                }
            }
        }
        return tmpList;
    }

    _shutingYardToReducedMonom = (inputStr: string): Monom => {
        // Get the RPN array of the current expression
        const SY: Shutingyard = new Shutingyard().parse(inputStr);
        const rpn: { token: string, tokenType: string }[] = SY.rpn;

        let stack: Monom[] = []

        if (rpn.length === 0) {
            this.zero()
            return this
        } else if (rpn.length === 1) {
            const element = rpn[0]

            this.one()
            if (element.tokenType === 'coefficient') {
                this.coefficient = this.makeCoefficient(element.token)
            } else if (element.tokenType === 'variable') {
                this.setLetter(element.token, 1)
            }
            return this
        } else {
            // Reset the monom
            for (const element of rpn) {
                this.addToken(stack, element)
            }
        }

        this.one()
        this.multiply(stack[0])
        return this
    }
}
