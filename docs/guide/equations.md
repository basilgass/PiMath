# Equations and solutions

`Equation` holds an equation or an inequality, and `Solution` is the exact value of a root. The first one produces the second.

```js
import {Equation, Polynom, Solution} from 'pimath'
```

## Equation

An `Equation` is `left <sign> right`, where both members are `Polynom` objects and the sign is `=`, `<`, `>`, `<=` or `>=`.

### Build an equation

```js
new Equation('2x+3=7').display // 2x+3=7
new Equation('x^2-5x+6=0').tex // x^{ 2 }-5x+6=0
new Equation('x+1>=3').tex // x+1\geq3
new Equation(new Polynom('x^2-4')).display // x^(2)-4=0
new Equation('2x+3', '7').display // 2x+3=7
new Equation('2x+3', '7', '<').display // 2x+3<7
```

A string needs a sign, otherwise it throws a `ParseError`. A `Polynom` given alone is read as `polynom = 0`. Signs can also be written `\leq`, `geq`, `=>`...

```js
const E = new Equation('2x+3=7')

E.left.display // 2x+3
E.right.display // 7
E.sign // =
E.variables // [ 'x' ]
E.degree().display // 1
```

`left` and `right` give the polynoms themselves, `split()` gives copies.

### Solve

`solve()` returns the roots of `left - right = 0` as `Solution` objects, sorted by value. It ignores the sign: an inequality has the roots of its equality.

```js
new Equation('2x+3=7').solve().map(s => s.display) // [ '2' ]
new Equation('x^2-5x+6=0').solve().map(s => s.display) // [ '2', '3' ]
new Equation('x^2-2=0').solve().map(s => s.display) // [ '-sqrt(2)', 'sqrt(2)' ]
new Equation('x^2+1=0').solve().length // 0
```

Roots are exact when they are rational or quadratic radicals, and radicals are simplified (`sqrt(2)`, not `sqrt(8)/2`). An equation with no real solution gives an empty array.

### Transform

Operations modify the equation and return it. A failing operation leaves it unchanged. Adding or subtracting a value applies to both members, and multiplying by a negative number reverses an inequality.

```js
new Equation('2x+3=7').subtract(3).display // 2x=4
new Equation('2x=4').divide(2).display // x=2
new Equation('x+1<3').multiply(-1).display // -x-1>-3
new Equation('x+1<3').opposite().display // -x-1>-3
new Equation('x^2=2x+3').reduce().display // x^(2)-2x-3=0
new Equation('3x+2=5').reorder().display // 3x=3
```

`moveLeft()` moves everything to the left, `reorder()` keeps the terms with a variable on the left and the constants on the right, and `reduce()` gives integer coefficients without common divisor and a positive leading term.

### Isolate a variable

```js
new Equation('2x+3=7').canIsolate('x') // true
new Equation('2x+3=7').isolate('x').display // x=2
new Equation('2x+3y=6').isolate('y').display // y=-2/3x+2
new Equation('x^2=4').canIsolate('x') // false
```

`isolate` works on an equation of the first degree without a term such as `xy`, and throws a `MathError` otherwise. Test with `canIsolate` first.

### Check a value and compare

```js
const E = new Equation('2x+3=7')

E.evaluate({x: 2}) // true
E.evaluate({x: 3}) // false
new Equation('x+1<3').evaluate({x: 1}) // true
E.test({x: new Fraction(2)}) // true
```

`evaluate` honours the sign, `test` only checks that both members have the same value.

Two notions of equality exist.

```js
new Equation('3x=5').isEqual(new Equation('3x=5')) // true
new Equation('3x=5').isEqual(new Equation('5=3x')) // false
new Equation('3x=5').isEquivalentTo(new Equation('6x=10')) // true
new Equation('3x=5').isEquivalentTo(new Equation('3x-5=0')) // true
```

`isEqual` compares the equations *as written*. `isEquivalentTo` checks that they have the **same solutions**, up to a factor, and it takes the direction of an inequality into account.

## Solution

A `Solution` is an exact value: a rational part plus a radical part. It comes from `solve()`, or you can build one.

```js
const [a, b] = new Equation('x^2-2x-1=0').solve()

a.display // 1-sqrt(2)
b.tex // 1 + \sqrt{ 2 }
b.value.toFixed(3) // 2.414
b.exact // true
b.fraction.display // 1
b.root.display // sqrt(2)
```

The `exact` flag is `true` for a rational value or a quadratic radical, and `false` for a numerical approximation (an irreducible cubic or a polynom of degree 4 or more). `count` is the multiplicity of the root.

```js
const [s] = new Equation('x^2-2x+1=0').solve()

s.display // 1
s.count // 2
```

### Build a solution

```js
new Solution('2/5').display // 2/5
new Solution('(-1+sqrt(5))/2').tex // \frac{ -1 + \sqrt{ 5 } }{ 2 }
new Solution('2sqrt(3)/5').display // (2sqrt(3))/5
Solution.fromQuadratic(1, -2, -1).map(s => s.display) // [ '1-sqrt(2)', '1+sqrt(2)' ]
```

A string accepts a rational, a radical (`sqrt(5)`, `2sqrt(3)/5`) or the combined form `(a±bsqrt(c))/d`. Anything else throws a `ParseError`.

### Display

`withDigits(n)` shows the decimal value, whatever the exact form.

```js
const x = new Solution('(1+sqrt(2))/2')

x.withDigits(2).display // 1.21
x.withDigits(null).display // (1+sqrt(2))/2
x.variable // x
```

`variable` names the unknown the solution belongs to (`x` by default).

## Members

### Equation

<!--@include: ./_generated/members-Equation.md-->

### Solution

<!--@include: ./_generated/members-Solution.md-->
