import type { InputAlgebra, InputValue, IPiMathObject } from "../pimath.interface";
import { Polynom } from "../algebra/polynom";
import { Fraction } from "../coefficients";
import { TupleN } from "./TupleN";
import { type Point } from "./point";
export declare class Vector extends TupleN implements IPiMathObject<Vector> {
    constructor(...values: (Vector | Point)[] | InputValue<Fraction>[]);
    parse(...values: (Vector | Point)[] | InputValue<Fraction>[]): this;
    clone(): Vector;
    get tex(): string;
    get display(): string;
    static asDisplay(...values: string[]): string;
    static asTex(...values: string[]): string;
    add(V: Vector): this;
    angle(V: Vector, sharp?: boolean, radian?: boolean): number;
    cross(value: Vector): Vector;
    divideByScalar(k: InputValue<Fraction>): this;
    dot(V: Vector | Point): Fraction;
    static fromString(value: string): Vector;
    static fromPolynom(expr: InputAlgebra<Polynom>, vectors: Record<string, Vector | string>): Vector;
    isColinearTo(v: Vector): boolean;
    isEqual(v: Vector): boolean;
    isNormalTo(v: Vector): boolean;
    isOne(): boolean;
    multiplyByScalar(k: InputValue<Fraction>): this;
    normal(): this;
    one(): this;
    simplify(): this;
    subtract(V: Vector): this;
    translate(...values: Fraction[]): this;
    unit(): this;
}
//# sourceMappingURL=vector.d.ts.map