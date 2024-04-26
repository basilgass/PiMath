/**
 * Polynom module contains everything necessary to handle polynoms.
 * @module Logicalset
 */
/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 */
export declare class Logicalset {
    private _rawString;
    private _rpn;
    /**
     *
     * @param {string} value (optional) Default polynom to parse on class creation
     */
    constructor(value: string);
    get isLogicalset(): boolean;
    get rpn(): {
        token: string;
        tokenType: string;
    }[];
    get tex(): string;
    evaluate(tokenSets: {
        [key: string]: unknown[];
    }, reference?: unknown[]): unknown[];
    vennAB(): any[];
    vennABC(): any[];
    private parse;
}
