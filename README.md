# PiMath

[![npm](https://img.shields.io/npm/v/pimath.svg)](https://www.npmjs.com/package/pimath)
[![license](https://img.shields.io/github/license/basilgass/PiMath.svg)](LICENSE.md)
[![docs](https://img.shields.io/badge/docs-online-blue.svg)](https://basilgass.github.io/PiMath/)

**Math exercises in your hands.** PiMath is a TypeScript library to create, compute and display mathematics, and to generate random exercises, with LaTeX output.

It is made for teachers who write exercise generators: objects are built from plain strings, computed exactly (fractions, roots, polynomials, equations, matrices, geometry), and displayed with `.tex`.

```js
const A = new PiMath.Fraction('2/3')
A.add(new PiMath.Fraction('2/5'))
A.tex // \frac{ 16 }{ 15 }

const P = new PiMath.Polynom('x^2-5x+6')
P.factorize().map(f => f.tex) // [ 'x-2', 'x-3' ]
```

## Draw an exercise

```js
const equation = PiMath.Random.equation({degree: 2, solution: {count: 2, relative: true}})

equation.tex // x^{ 2 }+3x-4=0
equation.solve().map(s => s.tex) // [ '-4', '1' ]
```

The generators control the coefficients, the solutions, the signs and the ranges. See the [random generators](https://basilgass.github.io/PiMath/guide/random).

## Install

```bash
npm install pimath
```

```js
import PiMath from 'pimath'
// or only what you need
import {Fraction, Polynom, Random} from 'pimath'
```

PiMath is an ES module. Without a bundler, import `dist/pimath.js` from a `<script type="module">`.

## What is inside

| Module     | Content                                                                    |
|------------|----------------------------------------------------------------------------|
| Numbers    | `Fraction`, `Root`, `Numeric`                                              |
| Algebra    | `Monom`, `Polynom`, `Equation`, `Matrix`, `LinearSystem`, `Factor`, ...    |
| Analysis   | `Solution`, `Interval`, `Domain`, `TableOfSigns`                           |
| Geometry   | `Point`, `Vector`, `Line`, `Circle`, `Triangle`, `Line3`, `Plane3`, `Sphere3` |
| Random     | `Random.polynom`, `Random.equation`, `Random.point`, `Random.line`, ...    |

## Documentation

- [Getting started](https://basilgass.github.io/PiMath/guide/getting-started)
- [Displaying results](https://basilgass.github.io/PiMath/guide/display) (`.tex`, `.display`, `withDigits`)
- [Random generators](https://basilgass.github.io/PiMath/guide/random)
- [Algebra](https://basilgass.github.io/PiMath/guide/algebra) and [geometry](https://basilgass.github.io/PiMath/guide/geometry)
- [Errors](https://basilgass.github.io/PiMath/guide/errors) and [migration from 0.2](https://basilgass.github.io/PiMath/guide/migration)
- [Changelog](CHANGELOG.md)

## Develop

```bash
npm install
npm run test        # tests (Vitest)
npm run build       # build the library
npm run docs:dev    # documentation site, with live reload
```

## License

MIT, see [LICENSE.md](LICENSE.md). Author: Basil Gass.
