# Getting started

## Install

```bash
npm install pimath
```

PiMath is published as an ES module.

```js
import PiMath from 'pimath'
// or, only what you need
import {Fraction, Polynom, Random} from 'pimath'
```

In a web page without a bundler, import the built file as a module. Every class is then available on the default export:

```html
<script type="module">
    import PiMath from './node_modules/pimath/dist/pimath.js'

    const f = new PiMath.Fraction('2/3')
    document.body.textContent = f.display
</script>
```

## First steps

Objects are built from a string (or from numbers) and expose their result as LaTeX with `.tex`.

```js
const A = new PiMath.Fraction('2/3')
console.log(A.tex) // \frac{ 2 }{ 3 }

// Operations modify the object and return it, so they can be chained
A.add(new PiMath.Fraction('2/5'))
console.log(A.tex) // \frac{ 16 }{ 15 }
console.log(A.display) // 16/15
```

```js
const P = new PiMath.Polynom('x^2-5x+6')
console.log(P.tex) // x^{ 2 }-5x+6
console.log(P.factorize().map(f => f.tex)) // [ 'x-2', 'x-3' ]
```

## Draw an exercise

The `Random` generators build a new object at each call.

```js
const equation = PiMath.Random.equation({degree: 2, solution: {count: 2, relative: true}})

console.log(equation.tex) // x^{ 2 }+3x-4=0
console.log(equation.solve().map(s => s.tex)) // [ '-4', '1' ]
```

Go on with [displaying results](./display) and the [random generators](./random).

## Mutating operations

`add`, `subtract`, `multiply`, `divide`, `pow`, `reduce`... **modify the object they are called on** and return it. Use `clone()` to keep the original.

```js
const a = new PiMath.Polynom('x+1')
const b = a.clone().add('2')

console.log(a.display) // x+1
console.log(b.display) // x+3
```

If an operation throws, the object is left unchanged.
