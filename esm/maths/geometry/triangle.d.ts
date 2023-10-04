import { Point } from "./point";
import { Vector } from "./vector";
import { Line } from "./line";
export interface remarquableLines {
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
    externalBisectors: {
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
    get remarquables(): remarquableLines;
    /**
     * Parse values to a triangle. Supported formats:
     * Point, Point, Point
     * x1, y1, x2, y2, x3, y3
     * TODO: Something else ?
     * @param values
     */
    parse: (...values: any) => Triangle;
    /**
     * Clone the Triangle class
     */
    clone: () => Triangle;
    /**
     * Generate the Line object for the three segments of the triangle
     */
    private _updateTriangle;
    /**
     * Get the Point class for the given name
     * @param ptName
     */
    private getPointByName;
    /**
     * Get the vector for the segment given by name.
     * @param ptName1
     * @param ptName2
     */
    private getSegment;
    private _calculateRemarquableLines;
    private _calculateBisectors;
}
