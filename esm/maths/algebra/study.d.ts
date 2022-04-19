/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */
import {Rational} from "./rational";
import {ISolution} from "./equation";
import {Polynom} from "./polynom";

export declare type StudyableFunction = Rational;
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
export interface IAsymptote {
    deltaX: StudyableFunction;
    limits: string;
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
    extremes: {
        [Key: string]: IExtrema;
    };
    factors: Polynom[];
    fx: StudyableFunction;
    signs: (string[])[];
    type: TABLE_OF_SIGNS;
    zeroes: IZero[];
}
export declare enum TABLE_OF_SIGNS {
    DEFAULT = 0,
    GROWS = 1,
    VARIATIONS = 2
}
/**
 * The study class is a "function study" class that will get:
 * fx               : get the function
 * domain           : string
 * zeroes           : Object (tex, IZero)
 * signs            : table of signs + tex output  using tkz-tab
 * av               : vertical asymptotic
 * ah               : horizontal asymptotic
 * ao               : obliques
 * deltaX           : position relative
 * dx               : derivative
 * grows            : growing table + tex output  using tkz-tab
 * ddx              : dérivée seconde
 * variations       : variation table + tex output  using tkz-tab
 */
export declare class Study {
    fx: StudyableFunction;
    private _asymptotes;
    private _derivative;
    private _signs;
    private _variations;
    private _zeroes;

    constructor(fx: StudyableFunction);

    get zeroes(): IZero[];

    get domain(): string;

    get signs(): ITableOfSigns;

    get asymptotes(): IAsymptote[];

    get derivative(): ITableOfSigns;

    get tex(): string;

    get texGrows(): string;

    get texVariations(): string;

    indexOfZero: (zeroes: IZero[], zero: IZero | ISolution) => number;
    makeGrowsResult: (fx: StudyableFunction, tos: ITableOfSigns) => {
        growsLine: string[];
        extremes: {
            [Key: string]: IExtrema;
        };
    };
    makeOneLineForSigns: (factor: Polynom, zeroes: IZero[], zeroSign: ZEROTYPE) => string[];
    makeSignsResult: (signs: (string[])[]) => string[];
    makeStudy: () => void;
    makeVariationsResult: (fx: StudyableFunction, tos: ITableOfSigns) => {
        varsLine: string[];
        extremes: {
            [Key: string]: IExtrema;
        };
    };

    makeZeroes(): IZero[];

    makeSigns(): ITableOfSigns;

    makeAsymptotes(): IAsymptote[];

    makeDerivative(): ITableOfSigns;

    makeVariation(): ITableOfSigns;

    private _makeTexFromTableOfSigns;
}
