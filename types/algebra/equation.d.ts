import { IAlgebra, IEquation, InputAlgebra, InputValue, IPiMathObject, ISolution, literalType } from '../pimath.interface';
import { Fraction } from '../coefficients/fraction';
import { Polynom } from './polynom';

export type EQUATION_SIGN = "=" | "<=" | ">=" | "<" | ">";
export declare class Equation implements IPiMathObject<Equation>, IEquation<Equation>, IAlgebra<Equation> {
    #private;
    constructor(equation: InputAlgebra<Polynom> | Equation);
    constructor(left: InputAlgebra<Polynom>, right: InputAlgebra<Polynom>, sign?: EQUATION_SIGN);
    parse: (equationString: string) => this;
    create: (left: Polynom, right: Polynom, sign?: string) => this;
    clone: () => Equation;
    /**
     * Add a value to the equation
     * if value is an equation, add the left part to the left part of the equation
     * and the right part to the right part of the equation
     * if value is a string, try to create an equation
     * if it fails, create a polynom and add it to the left and right part of the equation
     * @param Equation | Polynom | Monom | Fraction | string | monom
     */
    add(value: InputValue<Equation | Polynom>): this;
    /**
     * Get the degree of the equation
     * @param letter
     */
    degree: (letter?: string) => Fraction;
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
    divide: (value: InputValue<Fraction>) => this;
    /**
     * Create an Equation using two polynoms.
     * Markdown *support* is cool
     * @param values
     * @param asNumeric
     */
    evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean | undefined): boolean;
    /**
     * Determine if the equation contains a variable.
     * @param letter
     */
    hasVariable: (letter: string) => boolean;
    isLinearTo: (equ: Equation) => boolean;
    /**
     * Determine if the equation contains more than one letter/variable.
     */
    isMultiVariable: () => boolean;
    isEqualTo: (equ: Equation) => boolean;
    /**
     * Reorder the polynom to have only one letter on the left, the rest on the right.
     * @param letter
     */
    isolate: (letter?: string) => this | false;
    letters: () => string[];
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    moveLeft: () => this;
    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    multiply: (value: InputValue<Fraction>) => this;
    pow(value: number): this;
    opposite: () => this;
    reduce(): this;
    reorder: (allLeft?: boolean) => this;
    replaceBy: (letter: string, P: Polynom) => this;
    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    simplify: () => this;
    solve: () => ISolution[];
    split(): [Polynom, Polynom];
    subtract(value: InputValue<Equation | Polynom>): this;
    test: (values: literalType<Fraction>) => boolean;
    static isEquationString(equationString: string): boolean;
    static makeSolutionsUnique(solutions: ISolution[], sorted?: boolean): ISolution[];
    get display(): string;
    get left(): Polynom;
    set left(value: Polynom);
    get numberOfVars(): number;
    get randomizeDefaults(): Record<string, number | string | boolean>;
    set randomizeDefaults(value: Record<string, number | string | boolean>);
    get right(): Polynom;
    set right(value: Polynom);
    get sign(): string;
    set sign(value: string);
    get signAsTex(): string;
    get tex(): string;
    get variables(): string[];
    private _findSign;
    private _formatSign;
    private _reverseSign;
    private isAlsoEqual;
    private isGreater;
    private isStrictEqual;
}
