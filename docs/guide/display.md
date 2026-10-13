# Displaying results

Every mathematical object exposes two outputs:

| Property   | Output                      | Example for a fraction |
|------------|-----------------------------|------------------------|
| `.tex`     | LaTeX, for MathJax or KaTeX | `\frac{ 2 }{ 3 }`      |
| `.display` | Plain text                  | `2/3`                  |

```js
const p = new PiMath.Polynom('x^2-5x+6')
p.tex // x^{ 2 }-5x+6
p.display // x^(2)-5x+6
```

The plain text keeps parentheses around exponents (`x^(2)`) and `/` for fractions, so that it can be read back or typed in a plot tool. `Polynom.plotFunction` and `Monom.plotFunction` add the explicit `*` such a tool needs.

```js
new Polynom('3x^2+2x').plotFunction // 3*x^(2)+2*x
```

## Choosing a form: `as***`

Getters starting with `as` select a **representation** and return the same object, so they chain before the output.

```js
const f = new PiMath.Fraction('16/15')
f.asFrac.tex // \frac{ 16 }{ 15 }
f.asDfrac.tex // \dfrac{ 16 }{ 15 }
```

| Class | Forms |
|-------|-------|
| `Fraction` | `asFrac` (default), `asDfrac`, `asTfrac` |
| `Matrix`, `PolyMatrix` | `asPmatrix` (default), `asBmatrix`, `asBraceMatrix`, `asVmatrix`, `asDoubleVmatrix` |
| `Line` | `asCanonical` (default), `asCartesian`, `asMxh`, `asParametric`, `asSystem` |
| `Line3` | `asParametric` (default), `asSystem`, `asCartesian` |
| `Circle`, `Sphere3` | `asCenterRadius` (default), `asDeveloped` |
| `Factor`, `PolyFactor` | `asPower` (default), `asRoot` |
| `Triangle` | `asRadians` (default), `asDegree` (for the angles) |

Most of them stay set until another one replaces them. The exception is `Line` and `Line3`: their form applies to the **next** `tex` or `display` only, and the default form comes back afterwards.

```js
const d = new Line('2x+3y-6=0')

d.asMxh.display // y=-2/3x+2
d.display // 2x+3y-6=0

const M = new Matrix([[1, 2], [3, 4]])

M.asBmatrix.display // [(1,2),(3,4)]
M.display // [(1,2),(3,4)]
```

## Display options: `with***`

Getters and methods starting with `with` or `without` toggle a **display option** and also return the same object.

| Option | Classes | Effect |
|--------|---------|--------|
| `withSign`, `withoutSign` | `Fraction`, `Root` | show a `+` before a positive value |
| `withDigits(n)` | most classes | decimal display, see below |
| `withPartition(c)` | `Matrix`, `PolyMatrix` | vertical bar before column `c` |
| `withFactors` | `TableOfSigns` | one row per factor |
| `withLabel(text)` | `TableOfSigns` | name of the product row |
| `withUniverse(name)` | `LogicalSet` | name of the zone outside every set |

```js
new PiMath.Fraction('3/2').withSign.display // +3/2
new Matrix([[1, 2, 3]]).withPartition(2).display // ((1,2|3))
```

## Decimals: `withDigits(n)`

`withDigits(n)` forces a decimal display with `n` digits (0 to 100), even for exact values. `withDigits(null)` restores the default display. A value outside of that range throws an `InvalidArgumentError`.

```js
const f = new PiMath.Fraction('3/2')
f.withDigits(2).display // 1.50
f.withDigits(null).display // 3/2
f.withDigits(101) // throws InvalidArgumentError
```

Only coefficients are affected, never exponents. A composite object (polynomial, matrix, line, circle...) passes the option to the values it contains.

```js
new Polynom('1/2x^2+3/4').withDigits(1).display // 0.5x^(2)+0.8
```

Call it **last**: an operation that creates new values starts again from the default display.

## Numeric value

`.value` gives the number as a JavaScript `number`.

```js
new PiMath.Fraction('3/4').value // 0.75
new Root('sqrt(2)').value // 1.414
```

## Rendering LaTeX in a page

Load KaTeX (or MathJax) in your page, then put the `.tex` string between delimiters, for example `\( ... \)`. The string `\frac{ 16 }{ 15 }` is then displayed as $\frac{16}{15}$.

This documentation site uses KaTeX.
