import Polynom from "./polynom";
export default class Equation {
    private _left;
    private _right;
    private _sign;
    private _polynom;
    private _solutions;
    private _varnothing;
    private _real;
    constructor(...equations: any);
    get isEquation(): boolean;
    get solutions(): string[];
    get solution(): string;
    get isReal(): boolean;
    get isVarnothing(): boolean;
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
    parse: (equationString: string) => Equation;
    private _findSign;
    private _formatSign;
    private _reverseSign;
    create: (left: Polynom, right: Polynom, sign?: string) => Equation;
    clone: () => Equation;
    private _randomizeDefaults;
    get randomizeDefaults(): {
        [key: string]: number | string | boolean;
    };
    set randomizeDefaults(value: {
        [key: string]: number | string | boolean;
    });
    randomize: (opts?: {}, sign?: string) => Equation;
    moveLeft: () => Equation;
    reorder: (allLeft?: boolean) => Equation;
    simplify: () => Equation;
    isolate: (letter?: string) => Equation | false;
    replaceBy: (letter: string, P: Polynom) => Equation;
    multiply: (value: any) => Equation;
    divide: (value: any) => Equation;
    degree: (letter?: string) => number;
    isMultiVariable: () => boolean;
    letters: () => string[];
    solve: (letter?: string) => Equation;
    private isGreater;
    private isStrictEqual;
    private isAlsoEqual;
    private _solveDegree1;
    private _solveDegree2;
    private _solveDegree3plus;
}
