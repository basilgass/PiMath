# Algebra and analysis

The algebra and analysis modules are described in one page per family of classes. Each page explains the classes with examples, then lists their members.

| Page | Classes |
|------|---------|
| [Numbers](./numbers) | `Fraction`, `Root`, `Numeric` |
| [Polynomials](./polynomials) | `Monom`, `Polynom`, `Factor`, `PolyFactor` |
| [Equations and solutions](./equations) | `Equation`, `Solution` |
| [Matrices and systems](./matrices) | `Matrix`, `PolyMatrix`, `LinearSystem` |
| [Intervals, domains and signs](./analysis) | `Interval`, `Domain`, `TableOfSigns`, `LogicalSet` |

A first example that crosses these modules: a polynomial, its roots, and the sign of its values.

```js
const P = new Polynom('x^2-5x+6')

P.factorize().map(f => f.display) // [ 'x-2', 'x-3' ]
new Equation('x^2-5x+6=0').solve().map(s => s.display) // [ '2', '3' ]
new TableOfSigns(P).negative().display // ]2;3[
```

Geometry has its own pages: [in the plane](./geometry) and [in space](./geometry3d).

## Rules shared by every class

- **Mutating operations.** `add`, `subtract`, `multiply`, `divide`, `pow`, `reduce`... modify the object and return it. `clone()` keeps the original, and a failing operation leaves the object unchanged.
- **Output.** `.tex` gives LaTeX and `.display` gives plain text. See [displaying results](./display).
- **Permissive and strict types.** `Fraction` represents an invalid or infinite value like a JavaScript number (`isNaN()`, `isFinite()`). `Root`, `Monom`, `Polynom` and the other expression types are strict and throw on a malformed input. See [errors](./errors).
- **Predicates are methods.** `isZero()`, `isOne()`, `isEqual()`, `isSameAs()`... are called with parentheses. In untyped JavaScript, `obj.isZero` without them is always truthy.
