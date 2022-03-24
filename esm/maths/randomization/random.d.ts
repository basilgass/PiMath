import { randomCoefficientConfig, randomMonomConfig, randomPolynomConfig } from "./rndTypes";
import { Polynom } from "../algebra/polynom";
import { Monom } from "../algebra/monom";
import { Fraction } from "../coefficients/fraction";
export * from "./rndTypes";
export declare namespace Random {
    function polynom(config?: randomPolynomConfig): Polynom;
    function monom(config?: randomMonomConfig): Monom;
    function fraction(config?: randomCoefficientConfig): Fraction;
    function number(from: number, to: number): number;
    function numberSym(max: number, allowZero?: boolean): number;
    function bool(percent?: number): boolean;
    function array(arr: any[], number?: number): any[];
    function item(arr: any[]): any;
    function shuffle(arr: any[]): any;
}
