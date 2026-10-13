# Errors

PiMath throws typed errors, all derived from `PiMathError`, so a script can tell a bad input from a mathematical impossibility.

| Error                  | Thrown when                                                              |
|------------------------|--------------------------------------------------------------------------|
| `ParseError`           | A string cannot be parsed (malformed expression)                         |
| `InvalidArgumentError` | A value or a generator option is not valid                               |
| `MathError`            | The operation is mathematically undefined (even root of a negative, ...) |
| `DimensionError`       | Vectors or matrices have incompatible dimensions                         |
| `IndexError`           | An index is out of range                                                 |
| `StateError`           | The object is not in a state allowing the operation                      |
| `NotImplementedError`  | The feature is not implemented yet                                       |

```js
try {
    new PiMath.Polynom('x^2+')
} catch (e) {
    if (e instanceof PiMath.Errors.ParseError) {
        console.log('Malformed polynomial')
    }
}
```

Test with `instanceof`: the `name` property can differ in a minified build.

## Strict parsing

Algebraic types (`Polynom`, `Monom`, `Root`, ...) refuse a malformed input instead of guessing. The exception is `Fraction`, a numeric type that represents an invalid value as `NaN`.

## Atomic operations

When an operation throws, the object it was called on is **left unchanged**.
