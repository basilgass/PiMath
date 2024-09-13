import { IAlgebra, IAnalyse, IExpression, InputAlgebra, InputValue, IPiMathObject, literalType } from '../pimath.interface';
import { Fraction } from '../coefficients/fraction';

export declare class Monom implements IPiMathObject<Monom>, IExpression<Monom>, IAnalyse<Monom>, IAlgebra<Monom> {
    #private;
    constructor(value?: InputValue<Fraction>);
    constructor(value?: Monom);
    /**
     * Parse a string to a monom. The string may include fraction.
     * @param inputStr
     */
    parse(inputStr: InputAlgebra<Monom>): this;
    /**
     * Clone the current Monom.
     */
    clone: () => Monom;
    static gcd: (...monoms: Monom[]) => Monom;
    /**
     * Multiply two monoms and return a NEW monom.
     * @param monoms
     */
    static xMultiply: (...monoms: Monom[]) => Monom;
    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    add: (...M: InputAlgebra<Fraction>[]) => this;
    /**
     * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
     * @returns {Fraction}
     */
    get coefficient(): Fraction;
    /**
     * Set the coefficient \\(k\\) value of the monom
     * @param {Fraction | number | string} F
     */
    set coefficient(F: InputValue<Fraction>);
    containsRationalPower: () => boolean;
    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    degree: (letter?: string) => Fraction;
    /**
     * Derivative the monom
     * @param letter
     */
    derivative: (letter?: string) => Monom;
    /**
     * This display getter is to be used in the polynom display getter
     */
    get display(): string;
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    divide: (...M: InputAlgebra<Fraction>[]) => this;
    get dividers(): Monom[];
    /**
     * Evaluate a monom. Each setLetter must be assigned to a Fraction.
     * @param values    Dictionary of <setLetter: Fraction>
     * @param asNumeric
     */
    evaluate: (values: literalType<number | Fraction> | InputValue<Fraction>, asNumeric?: boolean) => Fraction | number;
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    hasVariable: (letter?: string) => boolean;
    integrate(a: InputValue<Fraction>, b: InputValue<Fraction>, letter?: string | undefined): Fraction;
    inverse: () => this;
    isDivisible: (div: Monom) => boolean;
    /**
     * Determine if two monoms are equals
     * @param M
     */
    isEqual: (M: Monom) => boolean;
    isLiteralSquare: () => boolean;
    /**
     * Determine if the monom is one
     */
    isOne: () => boolean;
    /**
     * Determine if two monoms are similar
     * @param M
     */
    isSameAs: (M: Monom) => boolean;
    isSquare: () => boolean;
    /**
     * Determine if the monom is null
     */
    isZero: () => boolean;
    /**
     * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
     * @returns {literalType}
     */
    get literal(): literalType<Fraction>;
    /**
     * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
     * @param {literalType<Fraction>} L
     */
    set literal(L: literalType<Fraction>);
    /**
     * Get the literal square roots of the Monom.
     * TODO: remove this getter ? Is it used and is it correct ?
     * @returns {literalType<Fraction>}
     */
    get literalSqrt(): literalType<Fraction>;
    /**
     * Set the literal part of the monom from a string
     * @param inputStr  String like x^2y^3
     */
    set literalStr(inputStr: string);
    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    multiply: (...M: InputAlgebra<Fraction>[]) => this;
    /**
     * Create a one value monom
     */
    one: () => this;
    /**
     * Get the opposite
     * Returns a monom.
     */
    opposite: () => this;
    get plotFunction(): string;
    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    pow: (nb: number | Fraction) => this;
    primitive: (letter?: string) => Monom;
    reduce: () => this;
    removeVariable(letter: string): void;
    /**
     * Get the nth-root of the monom
     */
    root: () => this;
    /**
     * Set the power of a particular setLetter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the setLetter (must be positive integer.
     */
    setLetter: (letter: string, pow: InputValue<Fraction>) => this;
    /**
     * Return the square root of a monom
     */
    sqrt: () => this;
    /**
     * Subtract multiple monoms
     * @param M (Monom[]) The monoms to subtract
     */
    subtract: (...M: InputAlgebra<Fraction>[]) => this;
    /**
     * Get the tex output of the monom
     */
    get tex(): string;
    /**
     * Get the variables letters
     */
    get variables(): string[];
    /**
     * Create a zero value monom
     */
    zero: () => this;
    private _getLiteralDividers;
}
