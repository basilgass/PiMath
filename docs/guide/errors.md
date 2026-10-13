# Errors

PiMath throws typed errors, all derived from `PiMathError`, so a script can tell a bad input from a mathematical impossibility.

| Error                       | Thrown when                                                              |
|-----------------------------|--------------------------------------------------------------------------|
| `ParseError`                | A string cannot be parsed (malformed expression)                         |
| `InvalidArgumentError`      | A value or a generator option is not valid                               |
| `MathError`                 | The operation is mathematically undefined (even root of a negative, ...) |
| `DimensionError`            | Vectors or matrices have incompatible dimensions                         |
| `IndexError`                | An index is out of range                                                 |
| `StateError`                | The object is not in a state allowing the operation                      |
| `NotImplementedError`       | The feature is not implemented yet                                       |
| `UnsupportedOperationError` | The operation does not exist for this type, by design                    |

Each one is available by name, and under `PiMath.Errors`.

```js
new Polynom('x^2+') // throws ParseError
Random.polynom({degree: -1}) // throws InvalidArgumentError
new Fraction(-4).sqrt() // throws MathError
new Matrix([[1, 2], [3]]) // throws DimensionError
new Matrix(2).setValue(5, 5, 1) // throws IndexError
new Sphere3().center // throws StateError
new Triangle(new Point(0, 0), new Point(1, 0), new Point(0, 1)).tex // throws NotImplementedError
new Factor('(x+1)^2').derivative() // throws UnsupportedOperationError
```

## Catching an error

Test with `instanceof`, not with the `name` property, which can differ in a minified build. `PiMathError` catches every error of the library.

```js
try {
    new PiMath.Polynom('x^2+')
} catch (e) {
    if (e instanceof PiMath.Errors.ParseError) {
        console.log('Malformed polynomial')
    } else if (e instanceof PiMath.Errors.PiMathError) {
        console.log('Another PiMath error: ' + e.message)
    } else {
        throw e
    }
}
```

When the parser of an expression fails, the original error is kept in the standard `cause` property of the `ParseError`.

```js
(() => { try { new Polynom('x))') } catch (e) { return e.cause instanceof Error } })() // true
```

## Strict and permissive types

Algebraic types (`Polynom`, `Monom`, `Root`, `Equation`, `Interval`, ...) refuse a malformed input instead of guessing. A string given to `Monom` must be a single term, and a sum is rejected.

```js
new Monom('3x+2') // throws ParseError
new Root('2sqrt') // throws ParseError
new Equation('2x+3') // throws ParseError
new Interval('1;5') // throws ParseError
```

The exception is `Fraction`, a numeric type: like a JavaScript number, it represents an invalid or infinite value instead of throwing. Test the result with `isNaN()` and `isFinite()`.

```js
new Fraction('abc').isNaN() // true
new Fraction(1).divide(0).isFinite() // false
```

## Atomic operations

When an operation throws, the object it was called on is **left unchanged**. This holds for the arithmetic of `Fraction`, `Root`, `Monom`, `Polynom`, `Equation`, and so on.

```js
const P = new Polynom('3x+2')

P.add('2', 'x+') // throws ParseError
P.display // 3x+2
```

## Generators

A generator validates its whole configuration before drawing anything. A wrong option throws an `InvalidArgumentError` at **every** call, never depending on chance. See [random generators](./random).
