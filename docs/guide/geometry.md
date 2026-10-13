# Geometry in the plane

Geometry classes are exported by name, and grouped under `PiMath.Geometry` on the default export.

```js
import {Point, Vector, Line, Circle, Triangle} from 'pimath'
```

or, with the default export:

```js no-run
const {Point, Vector, Line, Circle, Triangle} = PiMath.Geometry
```

All the coordinates are exact fractions. The same rules apply as everywhere else: operations modify the object and return it, and `clone()` keeps the original. For space geometry (`Line3`, `Plane3`, `Sphere3`), see [geometry in space](./geometry3d).

## Points

A `Point` is built from numbers, from a string (`(1;2)`, `1,2` or `1 2`), or from another point.

```js
const A = new Point(1, 2)

A.tex // \left(1;2\right)
A.display // (1;2)
A.x.display // 1
new Point('(3/2;-1)').display // (3/2;-1)
new Point(1, 2, 3).dimension // 3
```

The coordinates `x`, `y` and `z` are fractions, and `array` gives all of them as copies. Reading `z` of a plane point throws a `DimensionError`.

```js
new Point(1, 2).z // throws DimensionError
```

### Distance and midpoint

The distance is an exact `Root`, so `distanceTo` keeps a radical.

```js
const A = new Point(0, 0)
const B = new Point(1, 1)

A.distanceTo(B).display // sqrt(2)
A.distanceTo(new Point(3, 4)).display // 5
Point.middleOf(A, new Point(3, 4)).display // (3/2;2)
A.isEqual(new Point(0, 0)) // true
A.isEqualXY(0, 0) // true
```

## Vectors

A `Vector` is built from numbers, from a string, or from two points: `new Vector(A, B)` is the vector `AB`.

```js
const v = new Vector(new Point(1, 2), new Point(4, 6))

v.display // ((3,4))
v.tex // \begin{pmatrix} 3 \\ 4 \end{pmatrix}
v.norm // 5
v.normSquare.display // 25
new Vector(3, 4).isEqual(v) // true
```

### Operations

```js
const u = new Vector(1, 2)
const w = new Vector(3, 4)

u.clone().add(w).display // ((4,6))
u.clone().subtract(w).display // ((-2,-2))
u.clone().multiplyByScalar(3).display // ((3,6))
u.clone().divideByScalar(2).display // ((1/2,1))
u.clone().opposite().display // ((-1,-2))
u.dot(w).display // 11
u.angle(w, false, false).toFixed(2) // 10.30
```

`normal()` turns a plane vector by 90 degrees, `simplify()` gives the smallest integer coordinates, and `unit()` divides by the norm, which is a decimal number.

```js
new Vector(1, 2).normal().display // ((2,-1))
new Vector('(1/2;3/2)').simplify().display // ((1,3))
new Vector(3, 4).unit().display // ((3/5,4/5))
```

### Tests

```js
new Vector(1, 2).isColinearTo(new Vector(2, 4)) // true
new Vector(1, 2).isNormalTo(new Vector(2, -1)) // true
new Vector(0, 0).isZero() // true
```

`cross` is the cross product of two vectors in space, and throws a `DimensionError` in the plane. `Vector.fromPolynom('2a-b', {a: '(1;0)', b: '(0;1)'})` builds a linear combination of named vectors.

## Lines

A `Line` is stored as `ax + by + c = 0`. It is built from an equation, from two points, from a point and a direction vector, or from three coefficients.

```js
const d = new Line('2x+3y-6=0')

d.tex // 2x+3y-6=0
d.slope.display // -2/3
d.height.display // 2
d.d.display // ((3,-2))
d.normal.display // ((2,3))
new Line(new Point(0, 0), new Point(2, 4)).tex // 2x-y=0
new Line(new Point(0, 0), new Vector(1, 2)).tex // 2x-y=0
new Line(2, 3, -6).tex // 2x+3y-6=0
```

`slope` and `height` are the `m` and `h` of `y = mx + h`. A vertical line has an infinite slope.

### Output forms

`asCartesian`, `asMxh`, `asParametric` and `asSystem` select a form for the **next** `tex` or `display` only. The default form comes back afterwards.

```js
const d = new Line('2x+3y-6=0')

d.asMxh.display // y=-2/3x+2
d.asCartesian.display // 2x+3y=6
d.asParametric.display // ((x,y))=((0,2))+k((3,-2))
d.display // 2x+3y-6=0
d.withDigits(1).asMxh.display // y=-0.7x+2.0
```

### Relations

```js
const d1 = new Line('2x+3y-6=0')
const d2 = new Line('4x+6y+1=0')

d1.isParallelTo(d2) // true
d1.isPerpendicularTo(new Line('3x-2y=0')) // true
d1.isEqual(new Line('4x+6y-12=0')) // true
d1.isPointOnLine(new Point(0, 2)) // true
d1.intersection(new Line('x-y=0')).point.display // (6/5;6/5)
d1.intersection(d2).isParallel // true
d1.distanceTo(new Point(0, 0)).display // (6sqrt(13))/13
```

`intersection` returns `{point, hasIntersection, isParallel, isSame}`, and `point` is `null` when there is no single intersection.

### Build one line from another

```js
const d = new Line('2x+3y-6=0')
const P = new Point(1, 1)

Line.fromParallel(d, P).tex // 2x+3y-5=0
Line.fromPerpendicular(d, P).tex // 3x-2y-1=0
Line.fromPointAndNormal(P, new Vector(2, 3)).tex // 2x+3y-5=0
Line.fromPointAndLine(P, d, Line.PERPENDICULAR).tex // 3x-2y-1=0
d.project(new Point(0, 0)).display // (12/13;18/13)
d.reflect(new Point(0, 0)).display // (24/13;36/13)
d.getValueAtX(3).display // 0
```

`getValueAtX` and `getValueAtY` give an invalid fraction when the line is vertical or horizontal respectively. `randomPoint(k)` and `randomNearPoint(k)` give a point on the line, or close to it, for exercises.

## Circles

A `Circle` is stored by its center and the **square** of its radius, which keeps everything exact. It is built from an equation, from a center and a radius, from a center and a point, or from three points.

```js
const c = new Circle('(x-1)^2+(y+2)^2=9')

c.center.display // (1;-2)
c.radius.display // 3
c.squareRadius.display // 9
c.tex // \left(x-1\right)^2+\left(y+2\right)^2=9
c.asDeveloped.display // x^(2)-2x+y^(2)+4y-4=0
new Circle(new Point(0, 0), 5).display // x^2+y^2=25
new Circle(new Point(1, 1), new Point(4, 5)).squareRadius.display // 25
Circle.fromPoints(new Point(0, 0), new Point(4, 0), new Point(0, 4)).center.display // (2;2)
```

An equation that is not the one of a circle throws a `MathError`.

```js
new Circle('x^2+2y^2=9') // throws MathError
```

### Points, tangents and intersections

```js
const c = new Circle(new Point(0, 0), 5)

c.isPointOnCircle(new Point(3, 4)) // true
c.getPointsOnCircle().length // 12
c.tangents(new Point(3, 4)).map(t => t.tex) // [ '3x+4y-25=0' ]
c.tangents(new Point(1, 1)).length // 0
c.intersection(new Line('y=0')).map(p => p.display) // [ '(-5;0)', '(5;0)' ]
c.relativePosition(new Line('y=5')) // 1
c.relativePosition(new Circle(new Point(3, 0), 2)) === Circle.RELATIVE_POSITION.TANGENT_INSIDE // true
```

`getPointsOnCircle` lists the points with integer coordinates around the center, and is empty when the square of the radius is not an integer. `tangents` takes a point (one tangent on the circle, two outside, none inside) or a slope. `relativePosition` returns `0`, `1` or `2` intersections for a line, and a `Circle.RELATIVE_POSITION` value for another circle.

## Triangles

A `Triangle` is built from three points, three lines, or six coordinates, and it throws a `MathError` when the vertices are collinear.

```js
const T = new Triangle(new Point(0, 0), new Point(4, 0), new Point(0, 3))

T.isValid // true
T.isRectangle() // true
T.isIsocele() // false
T.AB.display // ((4,0))
T.lines.AB.tex // y=0
T.getMiddles().BC.display // (2;3/2)
T.getAngle('A') // 1.5707963267948966
T.asDegree.getAngle('B') // 36.87
```

The remarkable lines come with their common point.

```js
const T = new Triangle(new Point(0, 0), new Point(4, 0), new Point(0, 3))

T.getMedians().intersection.display // (4/3;1)
T.getHeights().intersection.display // (0;0)
T.getMediators().intersection.display // (2;3/2)
T.getBisectors().intersection.display // (1;1)
```

`tex` and `display` are not available on a triangle: they throw a `NotImplementedError`. Describe it with its vertices (`A`, `B`, `C`) or its `lines`. Setting a vertex refreshes the validity and the remarkable lines.

## Random geometry

```js
PiMath.Random.point({quadrant: 1}).tex // e.g. \left(8;5\right)
PiMath.Random.line().tex // e.g. 2x-3y+4=0
PiMath.Random.circle().tex // e.g. \left(x-1\right)^2+y^2=25
```

See [random generators](./random) for the options.

## Members

### Point

<!--@include: ./_generated/members-Point.md-->

### Vector

<!--@include: ./_generated/members-Vector.md-->

### Line

<!--@include: ./_generated/members-Line.md-->

### Circle

<!--@include: ./_generated/members-Circle.md-->

### Triangle

<!--@include: ./_generated/members-Triangle.md-->
