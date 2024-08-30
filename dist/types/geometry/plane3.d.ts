import { Equation } from "../algebra/equation";
import { Fraction } from "../coefficients/fraction";
import { Line3 } from "./line3";
import { Point3D, Vector3D } from "./vector3d";
interface Plane3Config {
    point?: Point3D;
    normal?: Vector3D;
    directions?: Vector3D[];
    equation?: Equation;
    points?: Point3D[];
    coefficients?: number[];
}
export declare class Plane3 {
    #private;
    constructor(config?: Plane3Config);
    get normal(): Vector3D;
    set normal(value: Vector3D);
    get point(): Point3D;
    set point(value: Point3D);
    get a(): Fraction;
    get b(): Fraction;
    get c(): Fraction;
    get d(): Fraction;
    get tex(): string;
    parse(config: Plane3Config): void;
    intersectWithLine(line: Line3): Point3D;
}
export {};
//# sourceMappingURL=plane3.d.ts.map