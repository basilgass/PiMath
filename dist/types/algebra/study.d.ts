import type { ISolution } from "../pimath.interface";
import { Polynom } from "./polynom";
import type { Rational } from "./rational";
export type StudyableFunction = Rational;
export declare enum ZEROTYPE {
    ZERO = "z",
    DEFENCE = "d",
    NOTHING = "t"
}
export interface IZero extends ISolution {
    extrema: FUNCTION_EXTREMA;
    type: ZEROTYPE;
}
export declare enum ASYMPTOTE {
    VERTICAL = "av",
    HORIZONTAL = "ah",
    SLOPE = "ao",
    HOLE = "hole"
}
export declare enum ASYMPTOTE_POSITION {
    "LT" = "LT",
    "RT" = "RT",
    "LB" = "LB",
    "RB" = "RB"
}
export interface IAsymptote {
    deltaX: StudyableFunction;
    display: string;
    fx: Polynom;
    limits: string;
    position: ASYMPTOTE_POSITION[];
    tableOfSign: ITableOfSigns;
    tex: string;
    type: ASYMPTOTE;
    zero: IZero;
}
export declare enum FUNCTION_EXTREMA {
    MIN = "min",
    MAX = "max",
    FLAT = "flat",
    NOTHING = ""
}
export interface IExtrema {
    tex: {
        x: string;
        y: string;
    };
    type: FUNCTION_EXTREMA;
    value: {
        x: number;
        y: number;
    };
}
export interface ITableOfSigns {
    extremes: Record<string, IExtrema>;
    factors: Polynom[];
    fx: StudyableFunction;
    signs: (string[])[];
    tex: string;
    type: TABLE_OF_SIGNS;
    zeroes: IZero[];
}
export declare enum TABLE_OF_SIGNS {
    SIGNS = "signs",
    GROWS = "grows",
    VARIATIONS = "variatins"
}
export interface StudyConfig {
    asymptotes?: boolean;
    derivative?: boolean;
    domain?: boolean;
    name?: string;
    variable?: string;
    signs?: boolean;
    variations?: boolean;
}
export declare class Study {
    fx: StudyableFunction;
    private _asymptotes;
    private _derivative;
    private _signs;
    private _variations;
    private _zeroes;
    private _config;
    private _name;
    constructor(fx: StudyableFunction, config?: StudyConfig | string);
    get name(): string;
    set name(value: string);
    get config(): StudyConfig;
    set config(value: StudyConfig);
    get zeroes(): IZero[];
    get domain(): string;
    get signs(): ITableOfSigns;
    get asymptotes(): IAsymptote[];
    get derivative(): ITableOfSigns;
    get texSigns(): string;
    get texGrows(): string;
    get texVariations(): string;
    makeStudy: () => void;
    indexOfZero: (zeroes: IZero[], zero: IZero | ISolution) => number;
    makeOneLineForSigns: (factor: Polynom, zeroes: IZero[], zeroSign: ZEROTYPE) => string[];
    makeSignsResult: (signs: (string[])[]) => string[];
    makeGrowsResult: (tos: ITableOfSigns) => {
        growsLine: string[];
        extremes: Record<string, IExtrema>;
    };
    makeVariationsResult: (tos: ITableOfSigns) => {
        varsLine: string[];
        extremes: Record<string, IExtrema>;
    };
    makeZeroes(): IZero[];
    makeSigns(): ITableOfSigns;
    makeAsymptotes(): IAsymptote[];
    makeDerivative(): ITableOfSigns;
    makeVariation(): ITableOfSigns;
    drawCode: () => string;
    private _makeTexFromTableOfSigns;
}
//# sourceMappingURL=study.d.ts.map