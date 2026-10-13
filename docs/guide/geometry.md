# Geometry

Geometry classes are exported by name, and grouped under `PiMath.Geometry` on the default export.

```js
import {Point, Vector, Line, Circle} from 'pimath'
// or
const {Point, Vector, Line, Circle} = PiMath.Geometry
```

## Points and vectors

```js
const A = new Point(1, 2)
A.tex // \left(1;2\right)

const v = new Vector(new Point(1, 2), new Point(4, 6))
v.tex // \begin{pmatrix} 3 \\ 4 \end{pmatrix}
```

## Lines

```js
const d = new Line('2x+3y-6=0')
d.tex // 2x+3y-6=0
d.slope.tex // -\frac{ 2 }{ 3 }

Line.fromPoints(new Point(0, 0), new Point(2, 4)).tex // 2x-y=0
```

## Circles

```js
const c = new Circle('(x-1)^2+(y+2)^2=9')
c.center.tex // \left(1;-2\right)
```

## In space

`Line3`, `Plane3` and `Sphere3` follow the same logic. `Random.point3`, `Random.vector3` and `Random.line3` draw 3D objects.

## Random geometry

```js
PiMath.Random.line().tex
PiMath.Random.circle().tex
```

See [random generators](./random).
