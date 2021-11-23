export * from "./vector";
export * from "./triangle";
export * from "./point";
export * from "./circle";
export * from "./line";
import { Circle as _Circle } from "./circle";
import { Line as _Line } from "./line";
import { Point as _Point } from "./point";
import { Triangle as _Triangle } from "./triangle";
import { Vector as _Vector } from "./vector";
export declare namespace Geometry {
    class Circle extends _Circle {
    }
    class Line extends _Line {
    }
    class Point extends _Point {
    }
    class Triangle extends _Triangle {
    }
    class Vector extends _Vector {
    }
}
