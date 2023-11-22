import { randomCoefficientConfig, randomGeometryLineConfig, randomGeometryPointConfig, randomMonomConfig, randomPolynomConfig } from "./rndTypes";
import { Polynom } from "../algebra/polynom";
import { Monom } from "../algebra/monom";
import { Fraction } from "../coefficients/fraction";
import { Line } from "../geometry/line";
import { Point } from "../geometry/point";
export * from "./rndTypes";
export declare namespace Random {
    function polynom(config?: randomPolynomConfig): Polynom;
    function monom(config?: randomMonomConfig): Monom;
    function fraction(config?: randomCoefficientConfig): Fraction;
    function number(from: number, to: number, exclude?: number[]): number;
    function numberSym(max: number, allowZero?: boolean): number;
    function prime(max: number): number;
    function bool(percent?: number): boolean;
    function array(arr: any[], number?: number): any[];
    function item(arr: any[]): any;
    function shuffle(arr: any[]): any[];
    namespace Geometry {
        function line(config?: randomGeometryLineConfig): Line;
        function point(config?: randomGeometryPointConfig): Point;
    }
}
