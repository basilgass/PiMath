import { Fraction } from '../coefficients/fraction';
import { literalType } from './monom';
import { Polynom } from './polynom';

/**
 * Equation is a class to manage equations...
 */
export interface ISolution {
    tex: string;
    display: string;
    value: number;
    exact: unknown;
}
export declare enum PARTICULAR_SOLUTION {
    real = "\\mathbb{R}",
    varnothing = "\\varnothing"
}
export declare class Equation {
    private _polynom;
    private _varnothing;
    private _real;
    private _left;
    private _right;
    private _sign;
    private _solutions;
    private _randomizeDefaults;
    /**
     * Create an Equation using two polynoms.
     * Markdown *support* is cool
     * @param equations
     */
    constructor(...equations: unknown[]);
    get left(): Polynom;
    set left(value: Polynom);
    get right(): Polynom;
    set right(value: Polynom);
    get sign(): string;
    set sign(value: string);
    get solutions(): ISolution[];
    get isEquation(): boolean;
    get solution(): string;
    get isReal(): boolean;
    get isVarnothing(): boolean;
    get signAsTex(): string;
    get tex(): string;
    get display(): string;
    get raw(): string;
    get variables(): string[];
    get numberOfVars(): number;
    get randomizeDefaults(): {
        [key: string]: number | string | boolean;
    };
    set randomizeDefaults(value: {
        [key: string]: number | string | boolean;
    });
    static makeSolutionsUnique(solutions: ISolution[], sorted?: boolean): ISolution[];
    hasVariable: (letter: string) => boolean;
    parse: (equationString: string) => Equation;
    create: (left: Polynom, right: Polynom, sign?: string) => Equation;
    clone: () => Equation;
    randomize: (opts?: {}, sign?: string) => Equation;
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    moveLeft: () => Equation;
    reorder: (allLeft?: boolean) => Equation;
    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    simplify: () => Equation;
    /**
     * Reorder the polynom to have only one letter on the left, the rest on the right.
     * @param letter
     */
    isolate: (letter?: string) => Equation | false;
    replaceBy: (letter: string, P: Polynom) => Equation;
    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    multiply: (value: unknown) => Equation;
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
    divide: (value: unknown) => Equation;
    /**
     * Get the degree of the equation
     * @param letter
     */
    degree: (letter?: string) => Fraction;
    /**
     * Determine if the equation contains more than one letter/variable.
     */
    isMultiVariable: () => boolean;
    letters: () => string[];
    solve: () => Equation;
    test: (values: literalType) => Boolean;
    isSameAs: (equ: Equation) => Boolean;
    isLinearTo: (equ: Equation) => Boolean;
    private _findSign;
    private _formatSign;
    private _reverseSign;
    private isGreater;
    private isStrictEqual;
    private isAlsoEqual;
    private _solveDegree1;
    private _solveDegree2;
    private _solveDegree3plus;
}
