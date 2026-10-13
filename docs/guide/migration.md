# Migration

The full list of changes is in the [changelog](https://github.com/basilgass/PiMath/blob/master/CHANGELOG.md). This page lists what usually breaks first when moving from 0.2.x to 0.3.

## Method calls that changed

| Before                               | After                                                                                      |
|--------------------------------------|--------------------------------------------------------------------------------------------|
| `fraction.frac`                      | `fraction.asFrac` (`as***` getters select a form)                                          |
| `polynom.isMultiVariable`            | `polynom.hasCrossTerm()` (predicates are methods)                                          |
| `fraction.isRational()` on integers  | now `true` for any exact rational, integers included; `hasFractionalPart()` is the old one |
| `equation.isolate()` returning `false` | `equation.canIsolate()` first, then `isolate()`, which throws `MathError`                |
| `polynom.inverse() === undefined`    | throws `MathError`                                                                         |
| `new Fraction()`                     | now equals `0`                                                                             |

## Behaviors that changed silently

Some changes are not reported by the TypeScript compiler, and untyped JavaScript will not report them either:

- `polynom.monoms` returns **copies**. Modify a polynomial with its methods or by assigning `polynom.monoms = [...]`.
- Invalid arguments now throw `InvalidArgumentError` in the random generators, before any draw.
- `Random.equation` draws fractional solutions in `[-5, 5]` by default. Use `solution: {range: 10}` for a wider interval.
- `Random.item` on an empty list throws instead of returning `null`.

## Typed errors

Plain `Error` instances are replaced by [typed errors](./errors). Replace tests on `e.message` by `instanceof` checks.
