# Geometry in space

Three classes describe lines, planes and spheres in space, next to `Point` and `Vector` which work in 2D and 3D. Everything is exact.

```js
import {Point, Vector, Line3, Plane3, Sphere3} from 'pimath'
```

Plane geometry is described in [geometry in the plane](./geometry).

## Points and vectors in space

A third coordinate makes a 3D point or vector. `z`, `cross` and the 3D classes need it.

```js
const A = new Point(1, 2, 3)
const v = new Vector(1, 0, 2)

A.display // (1;2;3)
A.dimension // 3
v.cross(new Vector(0, 1, 0)).display // ((-2,0,1))
new Vector(1, 2, 3).dot(new Vector(4, 5, 6)).display // 32
new Point(0, 0, 0).distanceTo(new Point(1, 2, 2)).display // 3
```

`setDimension(n)` adds zero coordinates or removes the last ones.

## Line3

A `Line3` is stored by a point and a direction vector. It is built from two points, or from a point and a vector.

```js
const d = new Line3(new Point(1, 0, 0), new Vector(1, 2, 3))

d.display // ((x,y,z)) = ((1,0,0)) + k\cdot ((1,2,3))
d.point.display // (1;0;0)
d.direction.display // ((1,2,3))
d.isPointOnLine(new Point(2, 2, 3)) // true
new Line3(new Point(0, 0, 0), new Point(1, 1, 1)).direction.display // ((1,1,1))
```

### Output forms

`asSystem` and `asCartesian` select another form for the **next** `tex` or `display` only.

```js
const d = new Line3(new Point(1, 0, 0), new Vector(1, 2, 3))

d.asSystem.display // {(x,=,1+k),(y,=,2k),(z,=,3k):}
d.asCartesian.display // (x-1)/1 = (y)/2 = (z)/3
d.display // ((x,y,z)) = ((1,0,0)) + k\cdot ((1,2,3))
```

### Relations

```js
const d1 = new Line3(new Point(0, 0, 0), new Vector(1, 0, 0))
const d2 = new Line3(new Point(1, 0, 0), new Vector(0, 1, 0))
const d3 = new Line3(new Point(0, 1, 0), new Vector(1, 0, 0))
const d4 = new Line3(new Point(0, 0, 1), new Vector(0, 1, 0))

d1.intersection(d2).point.display // (1;0;0)
d1.intersection(d3).isParallel // true
d1.intersection(d4).hasIntersection // false
d1.isParallelTo(d3) // true
d1.isOrthogonalTo(d4) // true
d1.isPerpendicularTo(d4) // false
d1.distanceTo(new Point(0, 3, 4)).display // 5
d1.project(new Point(2, 3, 4)).display // (2;0;0)
d1.reflect(new Point(2, 3, 4)).display // (2;-3;-4)
```

`intersection` returns `{point, hasIntersection, isParallel, isSame}`. The lines are *skew* when all of the flags are false. `isOrthogonalTo` compares the directions only, while `isPerpendicularTo` also asks the lines to meet.

## Plane3

A `Plane3` is built from a configuration object. Give one of these combinations.

| Property | Plane defined by |
|----------|------------------|
| `point` and `normal` | A point and a normal vector |
| `point` and `directions` | A point and two direction vectors |
| `points` | Three points |
| `equation` | A cartesian equation |
| `coefficients` | `[a, b, c, d]` of `ax + by + cz + d = 0` |

```js
const P = new Plane3({equation: 'x+2y+3z-6=0'})

P.display // x+2y+3z-6=0
P.tex // x+2y+3z-6=0
P.normal.display // ((1,2,3))
P.a.display // 1
P.d.display // -6
new Plane3({coefficients: [1, 2, 3, -6]}).isEqual(P) // true
new Plane3({points: [new Point(6, 0, 0), new Point(0, 3, 0), new Point(0, 0, 2)]}).isEqual(P) // true
Plane3.fromPointAndNormal(new Point(0, 0, 2), new Vector(1, 2, 3)).display // x+2y+3z-6=0
```

A configuration that matches none of the combinations throws a `ParseError`.

```js
new Plane3({}) // throws ParseError
```

### Relations

```js
const P = new Plane3({equation: 'x+2y+3z-6=0'})
const L = new Line3(new Point(0, 0, 0), new Vector(1, 1, 1))

P.isPointOnPlane(new Point(0, 0, 2)) // true
P.isParallelTo(new Plane3({equation: 'x+2y+3z+1=0'})) // true
P.isPerpendicularTo(new Plane3({equation: '2x-y=0'})) // true
P.distanceTo(new Point(0, 0, 0)).display // (3sqrt(14))/7
P.intersectWithLine(L).point.display // (1;1;1)
P.project(new Point(0, 0, 0)).display // (3/7;6/7;9/7)
```

`intersectWithLine` returns `{point, hasIntersection, isParallel, isOnPlane}`, and `intersectWithPlane` returns `{line, hasIntersection, isParallel, isEqual}`.

```js
const Q = new Plane3({equation: 'x-y=0'})

new Plane3({equation: 'x+2y+3z-6=0'}).intersectWithPlane(Q).line.display // ((x,y,z)) = ((2,2,0)) + k\cdot ((3,3,-3))
```

`angle` gives the angle between two planes, or between a plane and a line or a vector, in degrees (`angle(value, sharp, radian)`).

```js
new Plane3({equation: 'z=0'}).angle(new Plane3({equation: 'x=0'})) // 90
```

## Sphere3

A `Sphere3` is stored by its center and the **square** of its radius. It is built from an equation, or from a center and a radius.

```js
const S = new Sphere3('(x-1)^2+y^2+(z+2)^2=9')

S.center.display // (1;0;-2)
S.squareRadius.display // 9
S.radius.display // 3
S.isPointOnSphere(new Point(1, 3, -2)) // true
new Sphere3(new Point(0, 0, 0), 3).isEqual(new Sphere3('x^2+y^2+z^2=9')) // true
new Sphere3(new Point(0, 0, 0), 2).radius.display // 2
new Sphere3(new Point(0, 0, 0), 9, true).radius.display // 3
```

`radius` is an object with `tex`, `display` and `value`. An equation that is not the one of a sphere throws a `MathError`, and reading a sphere that was never defined throws a `StateError`.

```js
new Sphere3('x^2+y^2=9') // throws MathError
new Sphere3().center // throws StateError
```

`asDeveloped` and `asCenterRadius` choose the output, and `relativePosition(other)` returns a `Sphere3.RELATIVE_POSITION` value.

```js
const S = new Sphere3(new Point(0, 0, 0), 3)

S.display // x^2+y^2+z^2=9
S.asDeveloped.display // x^(2)+y^(2)+z^(2)-9=0
S.relativePosition(new Sphere3(new Point(10, 0, 0), 1)) === Sphere3.RELATIVE_POSITION.EXTERIOR // true
```

## Random geometry in space

```js
PiMath.Random.point3().tex // e.g. \left(1;-2;3\right)
PiMath.Random.vector3().tex // e.g. \begin{pmatrix} 1 \\ 2 \\ -3 \end{pmatrix}
PiMath.Random.line3().tex // e.g. \begin{pmatrix} x \\ y \\ z \end{pmatrix} = ...
```

See [random generators](./random) for the options.

## Members

### Line3

<!--@include: ./_generated/members-Line3.md-->

### Plane3

<!--@include: ./_generated/members-Plane3.md-->

### Sphere3

<!--@include: ./_generated/members-Sphere3.md-->
