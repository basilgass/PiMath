import { Line } from './line';
import { Vector } from './vector';
import { Point } from './point';
import { remarquableLines } from '../pimath.interface';
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
    /**
     * Parse values to a triangle. Supported formats:
     * Vector2D, Vector2D, Vector2D
     * x1, y1, x2, y2, x3, y3
     * TODO: Something else ?
     * @param values
     */
    parse: (...values: unknown[]) => Triangle;
    /**
     * Clone the Triangle class
     */
    clone: () => Triangle;
}
