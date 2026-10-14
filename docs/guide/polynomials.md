# Polynomials

Four classes cover polynomial expressions:

| Class | Represents | Example |
|-------|------------|---------|
| `Monom` | A term: a coefficient and powers of variables | `3x^2y` |
| `Polynom` | A sum of terms | `x^2-5x+6` |
| `Factor` | A polynom raised to a power | `(x+1)^2` |
| `PolyFactor` | A product of factors, with a denominator if needed | `(x-2)(x-3)/(x+1)` |

```js
import {Monom, Polynom, Factor, PolyFactor} from 'pimath'
```

As everywhere in PiMath, operations modify the object and return it. Use `clone()` to keep the original, and a failing operation leaves the object unchanged.

## Monom

A `Monom` has a `coefficient` (a `Fraction`) and a `literal` part, a dictionary from each variable to its exponent. Exponents are fractions too, so `x^(1/2)` is allowed.

```js
const m = new Monom('3x^2y')

m.tex // 3x^{ 2 }y
m.coefficient.display // 3
m.variables // [ 'x', 'y' ]
m.degree().display // 3
m.degree('x').display // 2
```

A string must be a single term. Spaces are ignored, and a power applies to the whole base: `(3x)^2` is `9x^2`. A malformed string, a sum such as `3x+2` (use a `Polynom`), or a negative exponent without parentheses (`x^-1`, write `x^(-1)`) throws a `ParseError`.

```js
new Monom('3x((') // throws ParseError
new Monom('3x+2') // throws ParseError
new Monom('(3x)^2').display // 9x^(2)
new Monom('x^(-1)').display // x^(-1)
```

### Operations

`add` and `subtract` only work between *similar* monoms (same variables, same exponents), otherwise they throw a `MathError`. `multiply` and `divide` always work.

```js
new Monom('3x').add('2x').display // 5x
new Monom('3x').add('2y') // throws MathError
new Monom('3x^2').multiply('2xy').display // 6x^(3)y
new Monom('6x^2').divide('2x').display // 3x
new Monom('3x^2').derivative('x').display // 6x
new Monom('6x^2').primitive('x').display // 2x^(3)
new Monom('3x^2y').evaluate({x: 2, y: 5}).display // 60
```

`evaluate` needs a value for every variable and throws a `MathError` otherwise. `primitive` throws for `x^-1`, whose primitive is a logarithm.

### Tests

```js
new Monom('3x').isSameAs(new Monom('5x')) // true
new Monom('6x^2').isDivisibleBy(new Monom('2x')) // true
new Monom('4x^2').isSquare() // true
Monom.gcd(new Monom('6x^2y'), new Monom('4x^3')).display // 2x^(2)
```

## Polynom

A `Polynom` is a list of monoms, always kept reduced and sorted by decreasing degree.

### Build a polynom

```js
new Polynom('x^2-5x+6').display // x^(2)-5x+6
new Polynom('(x+1)^2').display // x^(2)+2x+1
new Polynom('x', 1, -5, 6).display // x^(2)-5x+6
new Polynom('xyz', 2, 3, 5, 7).display // 2x+3y+5z+7
new Polynom(5).display // 5
```

With a single letter and some numbers, the numbers are the coefficients from the highest degree down. With several letters, the polynom is linear: `'xyz', a, b, c, d` is `ax + by + cz + d`. Strings accept sums, products, integer powers and a division by a constant.

```js
new Polynom('x^2+') // throws ParseError
```

`Polynom.fromThreePoints` builds the polynom of degree at most 2 through three points. The result is exact, and aligned points give a line.

```js
Polynom.fromThreePoints({x: 1, y: 2}, {x: 2, y: 3}, {x: 4, y: 11}).display // x^(2)-2x+3
Polynom.fromThreePoints({x: 0, y: 1}, {x: 1, y: 3}, {x: 2, y: 5}).display // 2x+1
Polynom.fromThreePoints({x: 1, y: 2}, {x: 1, y: 3}, {x: 2, y: 3}) // throws MathError
```

### Display

```js
const P = new Polynom('x^2-5x+6')

P.tex // x^{ 2 }-5x+6
P.display // x^(2)-5x+6
P.withDigits(2).display // x^(2)-5.00x+6.00
```

### Operations

`add`, `subtract`, `multiply` and `divide` accept polynoms, monoms, numbers and strings, and several operands at once. A string is read as a polynom, and a malformed one throws a `ParseError` without changing the polynom.

```js
new Polynom('x+1').add('2x').display // 3x+1
new Polynom('x+1').add('x^2+3').display // x^(2)+x+4
new Polynom('x-2').multiply('x+3').display // x^(2)+x-6
new Polynom('x^2-1').subtract('x-1').display // x^(2)-x
new Polynom('x+1').pow(2).display // x^(2)+2x+1
new Polynom('x^2-1').divide('x-1').display // x+1
```

`divide` is exact: it throws a `MathError` when the division leaves a remainder. `euclidean` gives the quotient and the remainder instead.

```js
const {quotient, reminder} = new Polynom('x^2+1').euclidean(new Polynom('x-1'))

quotient.display // x+1
reminder.display // 2
```

`inverse`, `root` and `sqrt` always throw a `MathError`: the inverse or the root of a polynom is not a polynom.

### Study a polynom

```js
const P = new Polynom('x^2-5x+6')

P.degree().display // 2
P.variables // [ 'x' ]
P.evaluate({x: 3}).display // 0
P.evaluate(3, true) // 0
P.derivative().display // 2x-5
P.primitive().display // 1/3x^(3)-5/2x^(2)+6x
P.integrate(0, 3).display // 9/2
P.limitTo('+oo').display // +oo
```

`evaluate` returns an exact `Fraction`, or a `number` when the second argument is `true`.

### Factor and roots

```js
const P = new Polynom('x^2-5x+6')

P.factorize().map(f => f.display) // [ 'x-2', 'x-3' ]
P.roots.map(s => s.display) // [ '2', '3' ]
P.isDivisibleBy(new Polynom('x-2')) // true
new Polynom('2x^3+6x^2').commonMonom().display // 2x^(2)
```

`roots` returns `Solution` objects, sorted by value. A constant polynom has none.

### Compare

```js
new Polynom('x+1').isEqual(new Polynom('1+x')) // true
new Polynom('x+1').isOppositeAt(new Polynom('-x-1')) // true
new Polynom('x^2+x').isSameAs(new Polynom('3x^2-5x')) // true
new Polynom('x+1').isOne() // false
```

`isEqual` compares the terms and their coefficients. `isSameAs` compares the terms only.

## Factor and PolyFactor

A `PolyFactor` writes an expression as a product of factors. It is useful to display a factored form, or to check an answer of a student.

```js
const F = new PolyFactor('(x-1)(x+2)^2')

F.display // (x-1)(x+2)^(2)
F.tex // \left( x-1 \right)\left( x+2 \right)^{ 2 }
F.develop().display // x^(3)+3x^(2)-4
F.degree().display // 3
F.roots.map(s => s.display) // [ '-2', '1' ]
```

A factor with a negative power belongs to the denominator.

```js
const R = new PolyFactor('(x+1)/(x-2)')

R.numerator.display // x+1
R.denominator.display // x-2
R.asRoot.display // (x+1)/(x-2)
R.evaluate(5).display // 2
```

`asPower` (default) writes the factors one after the other with their exponent, `asRoot` writes a fraction.

On a `Factor`, `asRoot` writes a fractional power as a radical and a negative power as a fraction.

```js
new Factor('(x+1)^(-2)').asRoot.display // 1/((x+1)^(2))
new Factor('(x+1)^(1/2)').asRoot.display // sqrt(x+1)
```

```js
new PolyFactor('x^2-5x+6').factorize().display // (x-2)(x-3)
new PolyFactor('(x+1)(x+1)(x-2)').reduce().display // (x+1)^(2)(x-2)
new PolyFactor('(x+1)(x-2)').isEqual(new PolyFactor('(x-2)(x+1)')) // true
PolyFactor.gcd(new PolyFactor('(x+1)(x-2)'), new PolyFactor('(x+1)(x+3)')).display // x+1
```

`reduce` groups the factors with the same base. `isEqual` compares two expressions independently of the order of their factors.

`Factor` is the building block of a `PolyFactor`: a polynom and a power. It is rarely used alone, and several operations are not defined on it (`add`, `subtract`, `opposite`, `primitive`, `derivative`): they throw a `MathError` or an `UnsupportedOperationError`.

```js
const f = new Factor('(x+1)^2')

f.polynom.display // x+1
f.power.display // 2
f.develop().display // x^(2)+2x+1
f.add() // throws MathError
```

## Members

### Monom

<!--@include: ./_generated/members-Monom.md-->

### Polynom

<!--@include: ./_generated/members-Polynom.md-->

### Factor

<!--@include: ./_generated/members-Factor.md-->

### PolyFactor

<!--@include: ./_generated/members-PolyFactor.md-->
