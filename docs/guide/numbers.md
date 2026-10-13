# Numbers

Three building blocks sit under every other class: `Fraction` (an exact rational number), `Root` (a number such as `3√5`) and `Numeric` (small functions on JavaScript numbers).

```js
import {Fraction, Root, Numeric} from 'pimath'
```

## Fraction

A `Fraction` stores an integer numerator and an integer denominator. It is exact: `1/3 + 1/6` is `1/2`, not `0.4999999`.

### Build a fraction

```js
new Fraction('3/4').display // 3/4
new Fraction(3, 4).display // 3/4
new Fraction(0.75).display // 3/4
new Fraction('2.31(25)').display // 11447/4950
new Fraction().display // 0
```

A string can be an integer, a decimal, `a/b` or a periodic decimal where the repeating digits are in parentheses. The static `Fraction.isFraction(value)` tells whether a value is understood.

```js
Fraction.isFraction('2/3') // true
Fraction.isFraction('2/') // false
```

### Operations change the object

`add`, `subtract`, `multiply`, `divide`, `pow`, `root`, `sqrt`, `abs`, `opposite`, `inverse` and `reduce` **modify the fraction and return it**. Chain them, and use `clone()` to keep the original.

```js
const a = new Fraction('1/2')
const b = a.clone().add('1/3')

a.display // 1/2
b.display // 5/6
new Fraction('2/3').multiply('3/4').display // 1/2
new Fraction('-3/4').abs().display // 3/4
new Fraction(9, 4).sqrt().display // 3/2
new Fraction(6, -4).reduce().display // -3/2
```

`add`, `subtract` and `divide` reduce their result, and so does `multiply` unless it is called with `false` as second argument. `Fraction.xMultiply(...values)` multiplies without reducing.

If an operation throws, the fraction is left unchanged.

### Display

```js
const f = new Fraction('-3/4')

f.tex // -\frac{ 3 }{ 4 }
f.display // -3/4
f.asDfrac.tex // -\dfrac{ 3 }{ 4 }
f.value // -0.75
```

`asFrac`, `asDfrac` and `asTfrac` choose the LaTeX command, `withSign` shows a `+` before a positive value, and `withDigits(n)` shows a decimal with `n` digits, exact fractions included. These options are chainable and kept by `clone()`.

```js
new Fraction('3/2').withSign.display // +3/2
new Fraction('3/2').withDigits(2).display // 1.50
new Fraction('3/2').withDigits(null).display // 3/2
```

### Compare and test

```js
new Fraction('2/4').isEqual(new Fraction('1/2')) // true
new Fraction('2/4').isReduced() // false
new Fraction('3/2').isGreater(1) // true
new Fraction('4/2').isRelative() // true
new Fraction('3/2').hasFractionalPart() // true
new Fraction('1/3').isPeriodic() // true
new Fraction('9/4').isSquare() // true
```

Vocabulary used by the library:

- **relative**: an integer of any sign (`isRelative()`); **natural**: a non-negative integer (`isNatural()`).
- `isRational()` is true for every exact finite value, integers included. `hasFractionalPart()` is true only for an exact value that is not an integer.
- `isPositive()` is true for zero, `isStrictlyPositive()` is not.

### Collections

```js
Fraction.max('1/2', '2/3', '1/3').display // 2/3
Fraction.min('1/2', '2/3', '1/3').display // 1/3
Fraction.sort(['1/2', '2/3', '1/3']).map(f => f.display) // [ '1/3', '1/2', '2/3' ]
Fraction.unique(['1/2', '2/4', '1/3']).map(f => f.display) // [ '1/2', '1/3' ]
Fraction.toSameDenominateur('1/2', '1/3').map(f => f.display) // [ '3/6', '2/6' ]
Fraction.average(1, 2).display // 3/2
```

### Invalid values and infinity

`Fraction` never throws on an undefined result, like a JavaScript number. Test the result instead.

```js
new Fraction('1/0').display // +oo
new Fraction('1/0').isFinite() // false
new Fraction('0/0').isNaN() // true
new Fraction('abc').isNaN() // true
new Fraction(1).divide(0).display // +oo
```

An operation that is mathematically impossible, such as an even root of a negative value, throws a `MathError`.

```js
new Fraction(-4).sqrt() // throws MathError
```

## Root

A `Root` is `factor · ⁿ√radical`: the factor and the radical are fractions, and the index `n` is 2 for a square root. It is built from a string, a number or a fraction.

```js
new Root('sqrt(12)').display // sqrt(12)
new Root('3sqrt(5)').tex // 3 \sqrt{ 5 }
new Root('root(3)(10)').display // root(3)(10)
new Root('5/2').display // 5/2
```

`sqrt(2/7)` is the root of a fraction. A bare `/7` after the radical divides the whole root: `sqrt2/7` is `(√2)/7`.

```js
new Root('sqrt(2)/7').value // 0.202
new Root('sqrt(2/7)').value // 0.535
```

Unlike `Fraction`, `Root` is strict: a malformed input throws a `ParseError`.

```js
new Root('2sqrt') // throws ParseError
```

### Simplify

`reduce()` removes the root from the denominator and extracts the greatest perfect power.

```js
new Root('sqrt(12)').reduce().tex // 2 \sqrt{ 3 }
new Root('sqrt(1/2)').reduce().display // sqrt(2)/2
new Root('root(3)(-40)').reduce().display // -2root(3)(5)
```

For an odd index, the sign always moves to the factor. An even root of a negative radical is left as it is, and its `value` is `NaN`.

```js
new Root('sqrt(-4)').value // NaN
new Root('sqrt(9)').isRational() // true
new Root('sqrt(2)').isRational() // false
```

### Operations

Like fractions, operations modify the root and return it.

```js
new Root('2sqrt(3)').add('5sqrt(3)').display // 7sqrt(3)
new Root('sqrt(2)').multiply('sqrt(3)').display // sqrt(6)
new Root('sqrt(8)').isEqual(new Root('2sqrt(2)')) // true
```

`add` and `subtract` need the same index and the same radical once both roots are reduced; otherwise they throw a `MathError`. `multiply` needs the same index or the same radical. A failed operation leaves the root unchanged.

## Numeric

`Numeric` is a set of functions on JavaScript numbers. It is useful to build a generator from integers.

```js
Numeric.gcd(12, 18) // 6
Numeric.lcm(4, 6) // 12
Numeric.dividers(12) // [ 1, 2, 3, 4, 6, 12 ]
Numeric.primes(5) // [ 2, 3, 5, 7, 11 ]
Numeric.pythagoreanTripletsWithTarget(5).filter(t => t[0] > 0 && t[0] < t[1]) // [ [ 3, 4, 5 ] ]
```

A function that checks an integer contract throws an `InvalidArgumentError`, and a function defined over a mathematical domain returns a value for an input outside of it: `Numeric.nthRoot(-4, 2)` is `NaN`, and `Numeric.greatestPower` gives `1` when nothing can be extracted.

## Members

### Fraction

<!--@include: ./_generated/members-Fraction.md-->

### Root

<!--@include: ./_generated/members-Root.md-->

### Numeric

<!--@include: ./_generated/members-Numeric.md-->
