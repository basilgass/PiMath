import { Line } from "./line";
import { Vector } from "./vector";
import { Point } from "./point";
import type { remarquableLines } from "../pimath.interface";
export declare class Triangle {
    #private;
    constructor(...values: unknown[]);
    get A(): Point;
    get B(): Point;
    get C(): Point;
    get AB(): Vector;
    get BA(): Vector;
    get BC(): Vector;
    get CB(): Vector;
    get AC(): Vector;
    get CA(): Vector;
    get isRectangle(): boolean;
    get isEquilateral(): boolean;
    get isIsocele(): boolean;
    get lines(): {
        'AB': Line;
        'BC': Line;
        'AC': Line;
    };
    get remarquables(): remarquableLines | null;
    parse: (...values: unknown[]) => Triangle;
    clone: () => Triangle;
}
//# sourceMappingURL=triangle.d.ts.map