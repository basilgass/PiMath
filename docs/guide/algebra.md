# Algebra

## Fractions and roots

```js
const a = new PiMath.Fraction('3/4')
a.multiply(new PiMath.Fraction(2, 3)).tex // \frac{ 1 }{ 2 }

new PiMath.Root('sqrt(12)').reduce().tex // 2 \sqrt{ 3 }
```

`Fraction` is permissive: an invalid operation gives a `NaN` or infinite fraction (`isNaN()`, `isFinite()`), like a JavaScript number. `Root` is strict and throws on a malformed input.

## Polynomials

```js
const P = new PiMath.Polynom('x^2-5x+6')

P.derivative().tex // 2x-5
P.factorize().map(f => f.tex) // [ 'x-2', 'x-3' ]
P.evaluate({x: 3}).display // 0
```

Operations accept either a `Polynom` or a string.

```js
new PiMath.Polynom('x-2').multiply(new PiMath.Polynom('x+3')).tex // x^{ 2 }+x-6
new PiMath.Polynom('x+1').add('2x').display // 3x+1
```

## Equations

```js
const E = new PiMath.Equation('x^2-5x+6=0')
E.solve().map(s => s.tex) // [ '2', '3' ]
```

`solve()` returns `Solution` objects, sorted by value. Each one is flagged `exact`: it is `true` only for a rational value or a quadratic root, never for a numerical approximation.

Two notions of equality exist: `isEqual` compares the equations *as written*, and `isEquivalentTo` checks that they have the **same solutions**.

## Matrices

```js
const M = new PiMath.Matrix([[1, 2], [3, 4]])
M.tex // \begin{pmatrix} 1 & 2\\ 3 & 4\\ \end{pmatrix}
M.determinant().display // -2
```

## Other classes

`Factor` and `PolyFactor` (factored forms), `LinearSystem`, `LogicalSet`, `Interval`, `Domain` and `TableOfSigns` complete the algebra and analysis modules. Their members are listed in the TypeScript declarations (`types/`) shipped with the package.
