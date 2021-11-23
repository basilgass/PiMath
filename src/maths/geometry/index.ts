export * from "./vector"
export * from "./triangle"
export * from "./point"
export * from "./circle"
export * from "./line"

import {Circle as _Circle} from "./circle";
import {Line as _Line} from "./line";
import {Point as _Point} from "./point";
import {Triangle as _Triangle} from "./triangle";
import {Vector as _Vector} from "./vector";

export namespace Geometry {
    export class Circle extends _Circle{}
    export class Line extends _Line{}
    export class Point extends _Point{}
    export class Triangle extends _Triangle{}
    export class Vector extends _Vector{}
}