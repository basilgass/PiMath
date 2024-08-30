import { InputValue } from '../pimath.interface';
import { Fraction } from '../coefficients/fraction';

export declare class Vector3D {
    #private;
    constructor();
    constructor(A: Point3D, B: Point3D);
    constructor(x: InputValue<Fraction>, y: InputValue<Fraction>, z: InputValue<Fraction>);
    get x(): Fraction;
    set x(value: Fraction | number | string);
    get y(): Fraction;
    set y(value: Fraction | number | string);
    get z(): Fraction;
    set z(value: Fraction | number | string);
    get asPoint(): boolean;
    set asPoint(value: boolean);
    get array(): Fraction[];
    get tex(): string;
    get display(): string;
    readonly dimension = 3;
    clone(): Vector3D;
    static asTex(x: string, y: string, z: string): string;
    isEqual: (v: Vector3D) => boolean;
    add(value: Vector3D): this;
    opposite(): this;
    subtract(value: Vector3D): this;
    multiply(value: Fraction): this;
    dot(value: Vector3D): Fraction;
    cross(value: Vector3D): Vector3D;
    reduce(): this;
}
export declare class Point3D extends Vector3D {
    constructor(x: InputValue<Fraction>, y: InputValue<Fraction>, z: InputValue<Fraction>);
    clone(): Point3D;
    get tex(): string;
    get display(): string;
}
