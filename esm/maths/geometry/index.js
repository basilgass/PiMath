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
export var Geometry;
(function (Geometry) {
    class Circle extends _Circle {
    }
    Geometry.Circle = Circle;
    class Line extends _Line {
    }
    Geometry.Line = Line;
    class Point extends _Point {
    }
    Geometry.Point = Point;
    class Triangle extends _Triangle {
    }
    Geometry.Triangle = Triangle;
    class Vector extends _Vector {
    }
    Geometry.Vector = Vector;
})(Geometry || (Geometry = {}));
//# sourceMappingURL=index.js.map