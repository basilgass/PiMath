# Changelog

All notable changes to PiMath. The version 0.3.0 gathers a large clean-up of the public API since 0.2.3: several changes are **breaking**, and some are **silent** (TypeScript does not report them and untyped JavaScript keeps running with a different behavior). See also the [migration guide](https://basilgass.github.io/PiMath/guide/migration).

## 0.3.0 - 2026-10-12

### Added

- `withDigits(n)` on classes that display numbers: forces a decimal display (`3/2` becomes `1.50`), `withDigits(null)` restores the default.
- Random generators for geometry: `Random.point`, `point3`, `vector`, `vector3`, `line`, `line3`, `circle`, with `axis`, `quadrant`, `plane`, `octant` and `range` options.
- `Random.fraction({range})`, `Random.equation({solution: {range, count, nothing, everything}})`.
- Typed errors (`PiMathError`, `ParseError`, `InvalidArgumentError`, `MathError`, `DimensionError`, `IndexError`, `StateError`, `NotImplementedError`).
- A new `Matrix` class on fractions, next to `PolyMatrix`; `LinearSystem` solves through the matrix classes.
- `Equation.canIsolate()` and `Equation.isEquivalentTo()`; `Line3.isOrthogonalTo()`.
- Documentation site: https://basilgass.github.io/PiMath/

### Changed (breaking)

- **Getters renamed** to the `as***` convention: `fraction.frac` becomes `fraction.asFrac`, and so on for the other classes.
- **Types, interfaces and enums are PascalCase** (`EQUATION_SIGN`, `PARTICULAR_SOLUTION`... renamed). The configuration types of the random module follow.
- **Predicates are methods**: `Polynom.isMultiVariable` becomes `hasCrossTerm()`, `LinearSystem.isSolvable` becomes a method.
- **`from***` factories are static** on `Fraction`, `Root`, `Monom`, `Polynom`, `Equation`, `Factor`, `PolyFactor`, `Matrix`, `Circle`, `Triangle`, `Sphere3`, `Solution`.
- **Operations return a value, never `null` or `undefined`**: `divide`, `inverse`, `root`, `sqrt` follow it. `Polynom.inverse()` throws `MathError` instead of returning `undefined`.
- `Equation.isolate()` throws `MathError` when the equation cannot be isolated, instead of returning `false`. Test with `canIsolate()` first.
- `evaluate` is split: structural queries (`IAlgebra`), value evaluation (`IEvaluable`) and predicates (`Equation.evaluate`, `LogicalSet.evaluate`).
- `Matrix` is now the fraction matrix; the previous polynomial matrix is `PolyMatrix`. `transpose()` returns a new instance.
- Errors raised by the library are typed instead of plain `Error`; some operations that returned a sentinel now throw (`Circle.relativePosition`, `Circle.fromEquation`, `dotProduct`, `Monom.gcd`).
- Deprecated aliases of `Equation`, `Monom` and `Polynom` are removed.
- The configuration of `Random.point`, `vector`, `line`, `line3` and `circle` is reorganized (`allow` groups, `range`, `axis`, `quadrant`).

### Changed (silent)

- `Fraction.isRational()` is `true` for every exact rational, integers included. Use `hasFractionalPart()` for the previous meaning.
- `new Fraction()` equals `0`.
- `Polynom.monoms` returns copies: modify a polynomial with its methods or by assigning `polynom.monoms`.
- Random generators validate their configuration before any draw: a wrong option now throws `InvalidArgumentError` every time.
- `Random.equation` draws fractional solutions in `[-5, 5]` by default (`solution: {range: 10}` for the previous width).
- `Random.polynom({factorable: true, allow: {commonFactor: false}})` now gives a primitive product.
- `Random.item([])` throws `InvalidArgumentError` instead of returning `null`.
- `Line3.isPerpendicularTo` requires the lines to meet; use `isOrthogonalTo` for the directions only.

### Fixed

- Mutating operations are atomic: when they throw, the object is left unchanged (`Root.add`, `Root.multiply`, `Fraction.root`, ...).
- `Equation` comparisons take the sign into account (`3x=5` no longer matches `3x<5`).
- `Root.clone` keeps its display state.
- Cubic equations without a rational root no longer loop forever.

## 0.2.9 and earlier

See the [GitHub releases](https://github.com/basilgass/PiMath/tags).
