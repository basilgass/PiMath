import { Point } from "./point";
import { Vector } from "./vector";
import { Line } from "./line";
interface remarquableLines {
    'medians': {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Point;
    };
    'mediators': {
        'AB': Line;
        'AC': Line;
        'BC': Line;
        'intersection': Point;
    };
    'heights': {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Point;
    };
    'bisectors': {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Point;
    };
}
export declare class Triangle {
    private _A;
    private _B;
    private _C;
    private _lines;
    private _middles;
    private _remarquables;
    constructor(...values: any);
    get isTriangle(): boolean;
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
    get remarquables(): remarquableLines;
    parse: (...values: any) => Triangle;
    clone: () => Triangle;
    private _updateTriangle;
    private getPointByName;
    private getSegment;
    private _calculateRemarquableLines;
    private _calculateBisectors;
}
export {};
