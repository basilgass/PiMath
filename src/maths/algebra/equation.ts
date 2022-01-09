import {Polynom} from "./polynom";
import {Monom} from "./monom";
import {Numeric} from "../numeric";
import {Fraction, Nthroot} from "../coefficients";

/**
 * Equation is a class to manage equations...
 */
interface ISolution {
    tex: string,
    value: number,
    exact: unknown
}

export class Equation {
    private _left: Polynom;  // Left part of the equation
    private _right: Polynom; // Right part of the equation
    private _sign: string;   // Signe of the equation, by default =

    private _polynom: Polynom;  // Used to solve the equation // TODO: remove the private value ?
    private _solutions: ISolution[]

    // Undetermined texSolutions.
    private _varnothing: string = '\\varnothing';
    private _real: string = '\\mathbb{R}';

    /**
     * Create an Equation using two polynoms.
     * Markdown *support* is cool
     * @param equations
     */
    constructor(...equations: unknown[]) {
        // Default equation
        this._left = new Polynom().zero();
        this._right = new Polynom().zero();
        this._sign = '=';

        if (equations.length === 1) {
            if(equations[0] instanceof Equation) {
                return equations[0].clone();
            } else if(typeof equations[0] === 'string') {
                this.parse(equations[0]);
            }
        } else if (equations.length === 2) {
            if(equations[0] instanceof Polynom){
                this.left = equations[0].clone()
            }else if(typeof equations[0] === 'string'){
                this.left = new Polynom(equations[0])
            }

            if(equations[1] instanceof Polynom){
                this.right = equations[1].clone()
            }else if(typeof equations[1] === 'string'){
                this.right = new Polynom(equations[1])
            }
        } else {
            // Return default empty equation
            return this;
        }

        return this;
    }

    get isEquation() {
        return true;
    }

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get solutions(): ISolution[] {
        return this._solutions
    }
    get solution(): string {
        if (this._solutions.length === 1
            &&
            (
                this._solutions[0].tex === this._real
                || this._solutions[0].tex === this._varnothing
                || this._solutions[0].tex.includes('\\left')
            )
        ) {
            return `S = ${this._solutions[0]}`;
        }
        return `S = \\left{ ${this._solutions.map(x => x.tex).join(';')} \\right}`;
    }

    get isReal(): boolean {
        if (this._solutions === undefined) {
            this.solve();
        }
        return this._solutions[0].tex === this._real;
    }

    get isVarnothing(): boolean {
        if (this._solutions === undefined) {
            this.solve();
        }
        return this._solutions[0].tex === this._varnothing;
    }

    get signAsTex(): string {
        if (this._sign === '>=' || this._sign === '=>' || this._sign === 'geq') {
            return '\\geq';
        }
        if (this._sign === '<=' || this._sign === '=<' || this._sign === 'leq') {
            return '\\leq';
        }
        return this._sign;
    }

    get tex(): string {
        return `${this._left.tex}${this.signAsTex}${this._right.tex}`;
    }

    get display(): string {
        return `${this._left.display}${this.signAsTex}${this._right.display}`;
    }


    get raw(): string {
        return `${this._left.raw}${this.signAsTex}${this._right.raw}`;
    }

    get variables(): string[] {
        return [...new Set(this._right.variables.concat(this._left.variables))];
    }

    get numberOfVars(): number {
        return this.variables.length;
    }

    get left(): Polynom {
        return this._left;
    }

    set left(value: Polynom) {
        this._left = value;
    }

    get right(): Polynom {
        return this._right;
    }

    set right(value: Polynom) {
        this._right = value;
    }

    get sign(): string {
        return this._sign;
    }

    set sign(value: string) {
        // Set the sign value as formatted.
        this._sign = this._formatSign(value);
    }


    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    parse = (equationString: string): Equation => {
        let pStr: string[], strSign: string | false;
        // Find the string separator
        strSign = this._findSign(equationString);

        if (strSign === false) {
            console.log('The equation is not valid (no sign found)');
            return;
        }

        // The StrSign is found
        pStr = equationString.split(strSign);

        return this.create(new Polynom(pStr[0]), new Polynom(pStr[1]), this._formatSign(strSign));
    };

    private _findSign = (equationString: string): string | false => {
        let strSign: string = '';

        if (equationString.includes('geq')) {
            return (equationString.includes('\\geq')) ? '\\geq' : 'geq';
        } else if (equationString.includes('leq')) {
            return (equationString.includes('\\leq')) ? '\\leq' : 'leq';
        } else if (equationString.includes('>=')) {
            return '>=';
        } else if (equationString.includes('=>')) {
            return '=>';
        } else if (equationString.includes('>')) {
            return '>';
        } else if (equationString.includes('<=')) {
            return '<=';
        } else if (equationString.includes('=<')) {
            return '=<';
        } else if (equationString.includes('<')) {
            return '<';
        } else if (equationString.includes('=')) {
            return '='
        }
        if (strSign === '') {
            console.log('Equation: parse string : sign not found');
            return false;
        }
    };

    private _formatSign = (signStr: string): string => {
        if (signStr === undefined) {
            return '=';
        }

        if (signStr.includes('geq')) {
            return '>=';
        } else if (signStr.includes('>=')) {
            return '>=';
        } else if (signStr.includes('=>')) {
            return '>=';
        } else if (signStr.includes('>')) {
            return '>';
        } else if (signStr.includes('leq')) {
            return '<=';
        } else if (signStr.includes('<=')) {
            return '<=';
        } else if (signStr.includes('=<')) {
            return '<=';
        } else if (signStr.includes('<')) {
            return '<';
        } else {
            return '='
        }
    };

    private _reverseSign = (): Equation => {
        if (this._sign === '=') {
            return this;
        }

        if (this._sign.includes('<')) {
            this._sign.replace('<', '>');
            return this;
        }
        if (this._sign.includes('>')) {
            this._sign.replace('>', '<');
            return this;
        }

        return this;
    };

    create = (left: Polynom, right: Polynom, sign?: string): Equation => {
        this._left = left;
        this._right = right;
        this._sign = this._formatSign(sign);
        return this;
    };

    clone = (): Equation => {
        return new Equation().create(this._left.clone(), this._right.clone(), this._sign + '');
    };

    // -----------------------------------------------
    // Equations generators and randomizers
    // -----------------------------------------------
    private _randomizeDefaults: { [key: string]: number | string | boolean } = {
        degree: 2
    };
    get randomizeDefaults(): { [key: string]: number | string | boolean } {
        return this._randomizeDefaults;
    }

    set randomizeDefaults(value) {
        this._randomizeDefaults = value;
    }

    randomize = (opts?: {}, sign?: string): Equation => {
        // TODO: Generate equations randomly, using config.
        return new Equation().create(new Polynom(), new Polynom(), sign);
    };


    // -----------------------------------------------
    // Equations operations
    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    moveLeft = (): Equation => {
        this._left = this._left.clone().subtract(this._right)
        this._right.zero()
        return this;
    }
    reorder = (allLeft?: boolean): Equation => {
        // Move all monoms of degree greater than 0 to the left.
        // and all zero degree monoms to the right.
        this._left.subtract(this._right);
        this._right.zero();

        if (allLeft) {
            return this.moveLeft()
        }
        let mMove: Monom;
        for (let m of this._left.monoms) {
            if (m.degree().isZero()) {
                mMove = m.clone();
                this._left.subtract(mMove);
                this._right.subtract(mMove);
            }
        }

        // Reorder the left and right polynoms
        this._left.reorder();
        this._right.reorder();
        return this;
    };

    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    simplify = (): Equation => {
        this.multiply(Numeric.lcm(...this._left.getDenominators(), ...this._right.getDenominators()));
        this.divide(Numeric.gcd(...this._left.getNumerators(), ...this._right.getNumerators()));
        return this;
    }

    /**
     * Reorder the polynom to have only one letter on the left, the rest on the right.
     * @param letter
     */
    isolate = (letter?: string): Equation | false => {
        // Determine if we can isolate the variables.

        // Both part of the equations must be of the first degree.
        //TODO: handle equations of degree two or more ?
        if (!this.degree(letter).isOne()) {
            return false;
        }

        // Modify the equation to isolate the asked variable.
        // TODO: must handle equations like 3xy+5y=4 => y = 4/(3x-5)
        if (this.isMultiVariable()) {
            return false;
        }

        // Isolate the letter.
        let mMove: Monom, cMove: Fraction;
        // Start by moving everything to the left.
        this._left.subtract(this._right);
        this._right.zero();
        for (let m of this._left.monoms) {
            if (!m.hasLetter(letter)) {
                mMove = m.clone();
                this._left.add(mMove.clone().opposed());
                this._right.add(mMove.clone().opposed());
            }
        }

        // In theory, we should have only one item on the left.
        if (this._left.length !== 1) {
            return false;
        }
        cMove = this._left.monoms[0].coefficient.clone();
        this._left.divide(cMove);
        this._right.divide(cMove);
        return this;
    };

    replaceBy = (letter: string, P: Polynom): Equation => {
        this._left.replaceBy(letter, P)
        this._right.replaceBy(letter, P)
        return this;
    }

    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    multiply = (value: unknown): Equation => {

        // Make sure we have a fraction.
        let F: Fraction = new Fraction(value);

        // Multiply each part of the equation by the fraction
        this._left.multiply(F);
        this._right.multiply(F);

        // The sign of the inequation must be changed.
        if (this._sign !== '=' && F.sign() === -1) {
            this._reverseSign();
        }

        return this;
    };

    /**
     * divide an equation by a given value (transformed as a fraction)
     *
     * ```
     * 8x+10=6x \vert 2
     * 4x+5=3x
     * ```
     *
     * |>Alternatively with $3x-4$ maybe it's working ?
     * $$\frac{3x}{5}$$
     *
     * @param value
     * @returns {Equation}
     */
    divide = (value: unknown): Equation => {
        // Make sure we have a fraction.
        let F: Fraction = new Fraction(value);

        if (F.isZero()) {
            return this;
        } else {
            return this.multiply(F.invert());
        }
    }

    // -----------------------------------------------
    // Equations helpers
    // -----------------------------------------------

    /**
     * Get the degree of the equation
     * @param letter
     */
    degree = (letter?: string): Fraction => {
        return Fraction.max(this._left.degree(letter), this._right.degree(letter));
    };

    /**
     * Determine if the equation contains more than one letter/variable.
     */
    isMultiVariable = (): boolean => {
        return this._left.isMultiVariable || this._right.isMultiVariable;
    };

    letters = (): string[] => {
        // @ts-ignore
        return [...new Set([...this._left.letters(), ...this._right.letters()])];
    }

    // -----------------------------------------------
    // Equations solving algorithms
    // -----------------------------------------------
    solve = (): Equation => {
        // Initialise the variables:
        this._solutions = [];

        // TODO: consolidate solving equations (inequations vs equations)
        // TODO: work with not natural degrees ?
        this._polynom = this._left.clone().subtract(this._right);

        switch (this._polynom.degree().value) {
            case 0:
            case 1:
                this._solveDegree1();
                break;
            case 2:
                this._solveDegree2();
                break;
            default:
                this._solveDegree3plus();
        }
        return this;
    };

    private isGreater = (): boolean => {
        if (this._sign.indexOf('>') !== -1) {
            return true;
        }
        return this._sign.indexOf('geq') !== -1;

    };
    private isStrictEqual = (): boolean => {
        return this._sign === '=';
    };
    private isAlsoEqual = (): boolean => {
        if (this._sign.indexOf('=') !== -1) {
            return true;
        }
        if (this._sign.indexOf('geq') !== -1) {
            return true;
        }
        if (this._sign.indexOf('leq') !== -1) {
            return true;
        }
    };

    private _solveDegree1 = (letter?: string): ISolution[] => {
        const m1 = this._polynom.monomByDegree(1, letter).coefficient,
            m0 = this._polynom.monomByDegree(0, letter).coefficient,
            v = m0.clone().opposed().divide(m1);
        let s: string;

        if (this.isStrictEqual()) {
            if (m1.value === 0) {
                // In this case, the coefficient of the x variable is zero.
                if (m0.value === 0) {
                    this._solutions = [{
                        tex: this._real,
                        value: NaN,
                        exact: false
                    }];
                } else {
                    this._solutions = [{
                        tex: this._varnothing,
                        value: NaN,
                        exact: false
                    }];
                }
            } else {
                this._solutions = [{
                    tex: v.display,
                    value: v.value,
                    exact: v
                }]
            }
        } else {
            if (m1.value === 0) {
                // In this case, the coefficient of the x variable is zero.
                if (m0.value === 0 && this.isAlsoEqual()) {
                    s = '\\mathbb{R}';
                } else {
                    if (m0.value > 0) {
                        s = this.isGreater() ? this._real : this._varnothing;
                    } else {
                        s = !this.isGreater() ? this._real : this._varnothing;
                    }
                }
            } else {
                // Must handle the case if the m1 monom is negative.
                if ((this.isGreater() && m1.sign() === 1) || (!this.isGreater() && m1.sign() === -1)) {
                    s = `\\left${this.isAlsoEqual() ? '\\[' : '\\]'}${v};+\\infty\\right\\[`;
                } else {
                    s = `\\left\\]-\\infty;${v} \\right\\${this.isAlsoEqual() ? '\\]' : '\\['}`;
                }
            }
            this._solutions = [{
                tex: s,
                value: NaN,
                exact: false
            }];
        }

        return this._solutions;
    };

    private _solveDegree2 = (letter?: string): ISolution[] => {
        let aF = this._polynom.monomByDegree(2, letter).coefficient,
            bF = this._polynom.monomByDegree(1, letter).coefficient,
            cF = this._polynom.monomByDegree(0, letter).coefficient,
            delta: number, nthDelta: Nthroot,
            lcm = Numeric.lcm(aF.denominator, bF.denominator, cF.denominator),
            a = aF.multiply(lcm).value,
            b = bF.multiply(lcm).value,
            c = cF.multiply(lcm).value,
            realX1: number, realX2: number,
            sX1: string, sX2: string;

        delta = b * b - 4 * a * c;

        if (delta > 0) {
            realX1 = (-b - Math.sqrt(delta)) / (2 * a);
            realX2 = (-b + Math.sqrt(delta)) / (2 * a);

            if (delta > 1.0e5) {
                // The delta is too big to be parsed !
                this._solutions = [
                    {
                        tex: ((-b - Math.sqrt(delta)) / (2 * a)).toFixed(5),
                        value: realX1,
                        exact: false
                    },
                    {
                        tex: ((-b + Math.sqrt(delta)) / (2 * a)).toFixed(5),
                        value: realX2,
                        exact: false
                    }
                ]
            } else {
                nthDelta = new Nthroot(delta).reduce();
                if (nthDelta.hasRadical()) {
                    // -b +- coeff\sqrt{radical}
                    // -------------------------
                    //           2a
                    let gcd = Numeric.gcd(b, 2 * a, nthDelta.coefficient);
                    nthDelta.coefficient = nthDelta.coefficient / gcd;

                    // TODO: Can i delete the next line ?
                    // let deltaC = nthDelta.coefficient, deltaR = nthDelta.radical;
                    if (b !== 0) {
                        if (2 * a / gcd === 1) {
                            this._solutions = [
                                {
                                    tex: `${-b / gcd} - ${nthDelta.tex}`,
                                    value: realX1,
                                    exact: false // TODO: implement exact value with nthroot
                                },
                                {
                                    tex: `${-b / gcd} + ${nthDelta.tex}`,
                                    value: realX2,
                                    exact: false
                                },

                            ]
                        } else {
                            this._solutions = [
                                {
                                    tex: `\\dfrac{${-b / gcd} - ${nthDelta.tex} }{ ${2 * a / gcd} }`,
                                    value: realX1,
                                    exact: false
                                },
                                {
                                    tex: `\\dfrac{${-b / gcd} + ${nthDelta.tex} }{ ${2 * a / gcd} }`,
                                    value: realX2,
                                    exact: false
                                },
                            ]
                        }
                    } else {
                        if (2 * a / gcd === 1) {
                            this._solutions = [
                                {
                                    tex: `- ${nthDelta.tex}`,
                                    value: realX1,
                                    exact: false
                                },
                                {
                                    tex: `${nthDelta.tex}`,
                                    value: realX2,
                                    exact: false
                                },
                            ]
                        } else {
                            this._solutions = [
                                {
                                    tex: `\\dfrac{- ${nthDelta.tex} }{ ${2 * a / gcd} }`,
                                    value: realX1,
                                    exact: false
                                },
                                {
                                    tex: `\\dfrac{${nthDelta.tex} }{ ${2 * a / gcd} }`,
                                    value: realX2,
                                    exact: false
                                },
                            ]
                        }
                    }
                } else {
                    // -b +- d / 2a
                    const S1 = new Fraction(-b - nthDelta.coefficient, 2 * a).reduce(),
                        S2 = new Fraction(-b + nthDelta.coefficient, 2 * a).reduce()
                    this._solutions = [
                        {
                            tex: S1.dfrac,
                            value: realX1,
                            exact: S1
                        },
                        {
                            tex: S2.dfrac,
                            value: realX2,
                            exact: S2
                        }
                    ]
                }
            }

        } else if (delta === 0) {
            const sol = new Fraction(-b, 2 * a).reduce()
            this._solutions = [{
                tex: sol.dfrac,
                value: sol.value,
                exact: sol
            }];
        } else {
            this._solutions = [{
                tex: this._varnothing,
                value: NaN,
                exact: false
            }];
        }


        // Handle now the inequations.
        if (!this.isStrictEqual()) {
            if (this._solutions.length === 2) {
                sX1 = (realX1 < realX2) ? this._solutions[0].tex : this._solutions[1].tex;
                sX2 = (realX1 < realX2) ? this._solutions[1].tex : this._solutions[0].tex;

                if ((this.isGreater() && aF.sign() === 1) || (!this.isGreater() && aF.sign() === -1)) {
                    this._solutions = [{
                        tex: `\\left]-\\infty ; ${sX1}\\right${this.isAlsoEqual() ? ']' : '['} \\cup \\left${this.isAlsoEqual() ? '[' : ']'}${sX2};+\\infty\\right[`,
                        value: NaN,
                        exact: false
                    }
                    ];
                } else {
                    this._solutions = [{
                        tex: `\\left${this.isAlsoEqual() ? '[' : ']'}${sX1} ; ${sX2}\\right${this.isAlsoEqual() ? ']' : '['}`,
                        value: NaN,
                        exact: false
                    }]
                }
            } else if (this._solutions.length === 1 && this._solutions[0].tex !== this._varnothing) {
                if (!this.isAlsoEqual()) {
                    if ((this.isGreater() && aF.sign() === 1) || (!this.isGreater() && aF.sign() === -1)) {
                        this._solutions = [{
                            tex: `\\left]-\\infty ; ${this._solutions[0].tex}\\right[ \\cup \\left]${this._solutions[0].tex};+\\infty\\right[`,
                            value: NaN,
                            exact: false
                        }
                        ];
                    } else {
                        this._solutions = [{
                            tex: this._varnothing,
                            value: NaN,
                            exact: false
                        }];
                    }
                } else {
                    if ((this.isGreater() && aF.sign() === 1) || (!this.isGreater() && aF.sign() === -1)) {
                        this._solutions = [{
                            tex: this._real,
                            value: NaN,
                            exact: false
                        }];
                    } else {
                        // this._texSolutions = [ this._texSolutions[0] ];
                    }
                }
            } else {
                if (this.isGreater()) {
                    this._solutions = [{
                        tex: aF.sign() === 1 ? this._real : this._varnothing,
                        value: NaN,
                        exact: false
                    }];
                } else {
                    this._solutions = [{
                        tex: aF.sign() === -1 ? this._real : this._varnothing,
                        value: NaN,
                        exact: false
                    }];
                }
            }
        }
        return this._solutions;
    };

    private _solveDegree3plus = (): ISolution[] => {
        // TODO: try to resolve equations with a degree superior than 2.
        this._solutions = [{tex: 'solve x - not yet handled', value: NaN, exact: false}];  // ESLint remove system :(
        return this._solutions;
    };

}