# Displaying results

Every mathematical object exposes two outputs:

| Property   | Output                      | Example for a fraction |
|------------|-----------------------------|------------------------|
| `.tex`     | LaTeX, for MathJax or KaTeX | `\frac{ 2 }{ 3 }`      |
| `.display` | Plain text                  | `2/3`                  |

```js
const p = new PiMath.Polynom('x^2-5x+6')
p.tex // x^{ 2 }-5x+6
p.display // x^2-5x+6
```

## Choosing a form: `as***`

Getters starting with `as` select a **representation** and return the same object, so they chain before the output.

```js
const f = new PiMath.Fraction('16/15')
f.asFrac.tex // \frac{ 16 }{ 15 }
```

The available forms depend on the class: `asCanonical` for lines, `asBmatrix` for matrices, `asDfrac` for fractions, and so on. The TypeScript declarations shipped with the package list them for each class.

## Display options: `with***`

Getters starting with `with` or `without` toggle a **display option** and also return the same object. For example `withSign` and `withoutSign`, or `withPower`, depending on the class.

## Decimals: `withDigits(n)`

`withDigits(n)` forces a decimal display with `n` digits (0 to 100), even for exact values. `withDigits(null)` restores the default display.

```js
const f = new PiMath.Fraction('3/2')
f.withDigits(2).display // 1.50
f.withDigits(null).display // 3/2
```

Only coefficients are affected, never exponents. Call it **last**: an operation that creates new values starts again from the default display.

## Numeric value

`.value` gives the number as a JavaScript `number`.

```js
new PiMath.Fraction('3/4').value // 0.75
```

## Rendering LaTeX in a page

Load MathJax or KaTeX in your page, then put the `.tex` string between delimiters, for example `\( ... \)`.
