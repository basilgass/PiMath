# Random generators

`PiMath.Random` builds a **new** object at each call, from a configuration object. Every option is optional.

```js
PiMath.Random.polynom() // degree 2, integer coefficients
PiMath.Random.polynom({degree: 3, variables: 'x'})
```

## Available generators

| Generator                                         | Returns        | Typical use                           |
|---------------------------------------------------|----------------|---------------------------------------|
| `Random.fraction(config)`                         | `Fraction`     | A coefficient                         |
| `Random.monom(config)`                            | `Monom`        | A term                                |
| `Random.polynom(config)`                          | `Polynom`      | An expression, possibly factorable    |
| `Random.equation(config)`                         | `Equation`     | An equation with controlled solutions |
| `Random.point(config)`, `Random.point3(config)`   | `Point`        | A point in the plane or in space      |
| `Random.vector(config)`, `Random.vector3(config)` | `Vector`       | A vector                              |
| `Random.line(config)`, `Random.line3(config)`     | `Line`, `Line3` | A line                               |
| `Random.circle(config)`                           | `Circle`       | A circle                              |

Small helpers are also available: `number`, `numberSym`, `prime`, `triplet`, `bool`, `array`, `item`, `shuffle`.

## Shared conventions

- **Coefficients.** `fraction: false` (default) gives integers, `fraction: true` gives fractions, and an object gives full control (`max`, `reduced`, `range`, ...).
- **Allowed values.** Permissions are grouped in `allow`: `allow.zero`, `allow.negative`, `allow.positive`... Zero is not allowed by default.
- **Integers.** An integer of either sign is called `relative` (`fraction: {relative: true}`).
- **Ranges.** `range: 5` means `[-5, 5]`, and `range: {min: -2, max: 8}` gives explicit bounds.
- **Probabilities.** An option that selects a *kind* of result (a type of line, an equation without solution...) accepts `true`, `false` or a probability between 0 and 1.
- **Validation.** A wrong configuration throws an `InvalidArgumentError` at every call, never depending on chance. See [errors](./errors).

## Examples

### An equation with known solutions

```js
const e = PiMath.Random.equation({
    degree: 2,
    solution: {count: 2, relative: true, range: 6}
})

e.tex // x^{ 2 }+3x-4=0
e.solve().map(s => s.tex) // [ '-4', '1' ]
```

### A factorable polynomial

```js
PiMath.Random.polynom({degree: 2, factorable: true}).tex
```

With `factorable: true` the polynomial is a product of linear factors, so its roots are known. `allow.commonFactor: false` removes any common integer factor.

### Fractions inside an interval

```js
PiMath.Random.fraction({range: 3, fraction: {max: 5}}).tex
```

### A point in a quadrant

```js
PiMath.Random.point({quadrant: 1}).tex // \left(8;5\right)
```

`axis` forces a coordinate to zero, `quadrant` fixes signs. They are independent.

## Complete options

The exact options, with types, defaults and descriptions, are in the TypeScript types shipped with the package (`RandomEquationConfig`, `RandomPolynomConfig`, ...). Your editor shows them as you type the configuration object.
