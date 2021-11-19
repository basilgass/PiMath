import { randomMonomConfig, randomPolynomConfig } from "./rndTypes";
import { Monom, Polynom } from "../algebra";
export * from "./rndTypes";
export declare namespace Random {
    function polynom(config?: randomPolynomConfig): Polynom;
    function monom(config?: randomMonomConfig): Monom;
    function number(from: number, to: number): number;
    function numberSym(max: number, allowZero?: boolean): number;
    function bool(percent?: number): boolean;
    function array(arr: any[], number?: number): any[];
    function item(arr: any[]): any;
    function shuffle(arr: any[]): any;
}
