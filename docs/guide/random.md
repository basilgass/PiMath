# Random generators

`PiMath.Random` builds a **new** object at each call, from a configuration object. Every option is optional.

```js
// degree 2, integer coefficients
PiMath.Random.polynom()
PiMath.Random.polynom({degree: 3, variables: 'x'})
```

## Available generators

| Generator                                         | Returns         | Typical use                           |
|---------------------------------------------------|-----------------|---------------------------------------|
| `Random.fraction(config)`                         | `Fraction`      | A coefficient                         |
| `Random.monom(config)`                            | `Monom`         | A term                                |
| `Random.polynom(config)`                          | `Polynom`       | An expression, possibly factorable    |
| `Random.equation(config)`                         | `Equation`      | An equation with controlled solutions |
| `Random.point(config)`, `Random.point3(config)`   | `Point`         | A point in the plane or in space      |
| `Random.vector(config)`, `Random.vector3(config)` | `Vector`        | A vector                              |
| `Random.line(config)`, `Random.line3(config)`     | `Line`, `Line3` | A line                                |
| `Random.circle(config)`                           | `Circle`        | A circle                              |

Small helpers are also available: `number`, `numberSym`, `prime`, `triplet`, `bool`, `array`, `item`, `shuffle`.

## Shared conventions

- **Coefficients.** `fraction: false` (default) gives integers, `fraction: true` gives fractions, and an object gives full control (`max`, `reduced`, `range`, ...).
- **Allowed values.** Permissions are grouped in `allow`: `allow.zero`, `allow.negative`, `allow.positive`... Zero is not allowed by default.
- **Integers.** An integer of either sign is called `relative` (`fraction: {relative: true}`).
- **Ranges.** `range: 5` means `[-5, 5]`, and `range: {min: -2, max: 8}` gives explicit bounds.
- **Probabilities.** An option that selects a *kind* of result (a type of line, an equation without solution...) accepts `true`, `false` or a probability between 0 and 1.
- **Validation.** A wrong configuration throws an `InvalidArgumentError` at every call, never depending on chance. See [errors](./errors).

```js
Random.polynom({degree: -1}) // throws InvalidArgumentError
Random.point({axis: 'x', range: {min: 1, max: 3}}) // throws InvalidArgumentError
```

## Numbers

```js
Random.fraction().isZero() // false
Random.fraction({relative: true}).isRelative() // true
Random.fraction({allow: {negative: false}}).isStrictlyPositive() // true
Math.abs(Random.fraction({range: 3}).value) <= 3 // true
```

`fraction` is the model of every coefficient option. A `fraction` option elsewhere takes the same keys. The complete list is [below](#random-fraction-coefficient-options).

## Algebra

### Monoms and polynomials

```js
Random.monom({degree: 2, variables: 'x'}).degree().display // 2
Random.polynom({degree: 3}).degree().display // 3
Random.polynom({degree: 2, variables: 't'}).variables // [ 't' ]
Random.polynom({degree: 4, numberOfMonoms: 2}).length <= 2 // true
Random.polynom({degree: 2, allow: {negativeLeading: false}}).monomByDegree().coefficient.isPositive() // true
```

With `factorable: true` the polynomial is a product of linear factors, so its roots are known. `allow.commonFactor: false` removes any common integer factor.

```js
Random.polynom({degree: 2, factorable: true}).roots.length > 0 // true
```

### Equations

The `solution` option controls the roots, which is what an exercise needs.

```js
const e = Random.equation({
    degree: 2,
    solution: {count: 2, relative: true, range: 6}
})

e.tex // e.g. x^{ 2 }+3x-4=0
e.solve().map(s => s.tex) // e.g. [ '-4', '1' ]
e.solve().length // 2
```

```js
Random.equation({degree: 3, solution: {count: 1}}).solve().length // 1
Random.equation({degree: 2, solution: {count: 2, allowZero: false}}).solve().some(s => s.isZero()) // false
```

`solution.nothing` and `solution.everything` build an equation with no solution (`P + k = P`) or with infinitely many (`P = P`). `shuffle: true` adds the same random polynomial to both sides, so the equation does not start with a zero right member.

## Geometry in the plane

### Points and vectors

`axis` forces a coordinate to zero, `quadrant` fixes signs. They are independent: `quadrant: 1` includes the axes, so combine it with `axis: false` to stay strictly inside.

```js
Random.point({quadrant: 1}).tex // e.g. \left(8;5\right)
Random.point({quadrant: 3}).x.isStrictlyPositive() // false
Random.point({axis: 'x'}).y.isZero() // true
Random.point({axis: false, quadrant: 2}).x.isStrictlyNegative() // true
Math.abs(Random.point({range: 2}).x.value) <= 2 // true
Random.point({fraction: true}).dimension // 2
```

A vector is drawn like a point, with the same options. The zero vector is excluded unless `allow.zero` is `true`, and `primitive: true` gives integer components without common divisor.

```js
Random.vector().isZero() // false
Random.vector({axis: 'y'}).x.isZero() // true
Random.vector({primitive: true}).dimension // 2
```

### Lines

A line comes from a point `A` and a slope. `A` is a `Point` or a point configuration, and `slope` is an exact value or `{fraction}`.

```js
Random.line({slope: 2}).slope.display // 2
Random.line({A: new Point(1, 2)}).isPointOnLine(new Point(1, 2)) // true
```

`allow` chooses the kind of line: `vertical`, `horizontal`, `positive` and `negative` (the sign of the slope). Each one is `false`, a probability, or `true` (default).

```js
Random.line({allow: {vertical: 1}}).isVertical() // true
Random.line({allow: {vertical: false, horizontal: 1}}).isHorizontal() // true
Random.line({allow: {vertical: false, horizontal: false, negative: false}}).slope.isStrictlyPositive() // true
```

### Circles

```js
Random.circle({radius: 5}).squareRadius.display // 25
Random.circle({squaredRadius: 5}).squareRadius.display // 5
Random.circle({pointsOnCircle: 8}).getPointsOnCircle().length >= 8 // true
```

`pointsOnCircle` asks for a circle with integer points on it, which makes the exercises easy to draw. The default is at least 8 points, applied when no radius is given.

## Geometry in space

```js
Random.point3().dimension // 3
Random.point3({plane: 'xy'}).z.isZero() // true
Random.point3({axis: 'x'}).y.isZero() // true
Random.vector3().dimension // 3
```

`axis` and `plane` act on the zero coordinates, and `octant` (1 to 8) on the signs. A line is drawn from a point `A` and a direction, and `allow` picks its kind: `general`, `parallelXY`, `parallelXZ`, `parallelYZ`, `parallelX`, `parallelY` and `parallelZ`.

```js
Random.line3().direction.dimension // 3
Random.line3({allow: {parallelX: 1}}).direction.y.isZero() // true
```

## Helpers

The helpers draw numbers and pick elements. They are used by the generators and are useful in an exercise on their own.

```js
Random.number(5, 5) // 5
Math.abs(Random.numberSym(3)) <= 3 // true
[2, 3, 5, 7].includes(Random.prime(10)) // true
Random.triplet(5).includes(5) // true
Random.triplet(7) // null
Random.bool(1) // true
Random.bool(0) // false
Random.array([1, 2, 3], 2).length // 2
Random.item(['a']) // a
Random.shuffle([1, 2, 3]).length // 3
Random.item([]) // throws InvalidArgumentError
```

- `number(from, to, exclude)`: an integer in `[from, to]`, never one of `exclude`.
- `numberSym(max, allowZero)`: an integer in `[-max, max]`.
- `prime(max)`: a prime **strictly lower** than `max`.
- `triplet(target)`: a Pythagorean triplet of hypotenuse `target`, or `null`.
- `bool(percent)`: `true` with the given probability (0.5 by default).
- `array(arr, n)` and `shuffle(arr)` do not modify the array they receive.

## Options of each generator

These tables are generated from the TypeScript types and JSDoc of the library (`npm run docs:sync`), so they always match the code. The options of `fraction` are those of [`Random.fraction`](#random-fraction-coefficient-options).

### `Random.fraction` (coefficient options)

<!--@include: ./_generated/random-fraction.md-->

### `Random.monom`

<!--@include: ./_generated/random-monom.md-->

### `Random.polynom`

<!--@include: ./_generated/random-polynom.md-->

### `Random.equation`

<!--@include: ./_generated/random-equation.md-->

### `Random.point`

<!--@include: ./_generated/random-point.md-->

### `Random.point3`

<!--@include: ./_generated/random-point3.md-->

### `Random.vector`

<!--@include: ./_generated/random-vector.md-->

### `Random.vector3`

<!--@include: ./_generated/random-vector3.md-->

### `Random.line`

<!--@include: ./_generated/random-line.md-->

### `Random.line3`

<!--@include: ./_generated/random-line3.md-->

### `Random.circle`

<!--@include: ./_generated/random-circle.md-->
