import { Polynom } from "./polynom";
import { Fraction } from "./fraction";
export declare class Equation {
    private _left;
    private _right;
    private _sign;
    private _polynom;
    private _solutions;
    private _varnothing;
    private _real;
    /**
     * Create an Equation using two polynoms.
     * @param equationString Equation string
     */
    constructor(equationString?: string);
    parseString: (equationString: string) => Equation;
    private _findSign;
    private _formatSign;
    create: (left: Polynom, right: Polynom, sign?: string) => Equation;
    clone: () => Equation;
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    reorder: () => Equation;
    degree: (letter?: string) => number;
    isMultiVariable: () => boolean;
    isolate: (letter?: string) => Equation | false;
    solve: (letter?: string) => void;
    private isGreater;
    private isStrictEqual;
    private isAlsoEqual;
    private _solveDegree1;
    private _solveDegree2;
    private _solveDegree3plus;
    generate: (opts?: {}, sign?: string) => Equation;
    private _reverseSign;
    multiply: (F: Fraction) => Equation;
    add: (equ: Equation) => Equation;
    substract: (equ: Equation) => Equation;
    get solutions(): string[];
    get solution(): string;
    get isReal(): boolean;
    get isVarvothing(): boolean;
    get signAsTex(): string;
    get tex(): string;
    get raw(): string;
    get variables(): string[];
    get numberOfVars(): number;
    get left(): Polynom;
    set left(value: Polynom);
    get right(): Polynom;
    set right(value: Polynom);
    get sign(): string;
    set sign(value: string);
}
