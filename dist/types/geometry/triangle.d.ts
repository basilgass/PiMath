import { Line } from "./line";
import { Vector } from "./vector";
export interface remarquableLines {
    'medians': {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Vector;
    };
    'mediators': {
        'AB': Line;
        'AC': Line;
        'BC': Line;
        'intersection': Vector;
    };
    'heights': {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Vector;
    };
    'bisectors': {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Vector;
    };
    externalBisectors: {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Vector;
    };
}
export declare class Triangle {
    private _A;
    private _B;
    private _C;
    private _lines;
    private _middles;
    private _remarquables;
    constructor(...values: unknown[]);
    get A(): Vector;
    get B(): Vector;
    get C(): Vector;
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
    get remarquables(): remarquableLines;
    parse: (...values: any) => Triangle;
    clone: () => this;
    private _updateTriangle;
    private getPointByName;
    private getSegment;
    private _calculateRemarquableLines;
    private _calculateBisectors;
}
//# sourceMappingURL=triangle.d.ts.map