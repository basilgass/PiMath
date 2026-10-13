# Intervals, domains and signs

Four classes describe sets of real numbers and the sign of an expression:

| Class | Represents |
|-------|------------|
| `Interval` | One interval, with exact bounds |
| `Domain` | A union of intervals |
| `TableOfSigns` | The sign of a polynom or of a product of factors |
| `LogicalSet` | A set expression such as `A&B|!C` |

```js
import {Interval, Domain, TableOfSigns, LogicalSet} from 'pimath'
```

## Interval

An `Interval` is written with the French notation: `]a;b[` is open, `[a;b]` is closed, `]-oo;3]` is unbounded. The bounds are exact `Solution` objects, so `]-sqrt(2);3/2[` is valid.

```js
const I = new Interval(']1;5]')

I.display // ]1;5]
I.tex // ]1;5]
I.contains(5) // true
I.contains(1) // false
I.leftOpen // true
I.left.display // 1
```

Besides the bounds, a string can be one of these shortcuts.

| Notation | Meaning |
|----------|---------|
| `RR` | The real line `]-oo;+oo[` |
| `RR_+`, `RR_-` | `[0;+oo[`, `]-oo;0]` |
| `RR_+**`, `RR_-**` | `]0;+oo[`, `]-oo;0[` |
| `{a}` | The single point `a` |
| `O/` | The empty set |

```js
new Interval('RR_+').display // [0;+oo[
new Interval('{3}').display // {3}
new Interval('O/').isEmpty() // true
new Interval(']-sqrt(2);3/2[').contains(1) // true
Interval.real().tex // ]-\infty;+\infty[
```

An unrecognised string throws a `ParseError`.

```js
new Interval('1;5') // throws ParseError
```

### Intersection

```js
new Interval(']1;5]').intersect(new Interval('[3;8[')).display // [3;5]
new Interval(']1;2[').intersect(new Interval(']3;4[')).isEmpty() // true
```

`intersect` never returns `null`: the result is an empty interval when the two do not overlap.

## Domain

A `Domain` is a union of intervals. It is always kept sorted, and intervals that overlap or touch are merged.

```js
const D = new Domain(']-oo;1[uu]3;+oo[')

D.display // ]-oo;1[uu]3;+oo[
D.tex // ]-\infty;1[ \cup ]3;+\infty[
D.contains(2) // false
D.contains(0) // true
D.length // 2
```

Union is written `uu`. The notation also accepts `RR` and `O/`, as well as the following shortcuts.

```js
new Domain('RR^**').display // RR\{0}
new Domain('RR\\{1;2}').display // RR\{1;2}
new Domain('{1;2;3}').display // {1}uu{2}uu{3}
```

### Set operations

```js
const A = new Domain(']-oo;3]')
const B = new Domain(']1;5[')

A.intersect(B).display // ]1;3]
A.union(B).display // ]-oo;5[
A.complement().display // ]3;+oo[
Domain.empty().complement().display // RR
```

A `Domain` can be built from an `Interval`, and `intervals` returns the list of its intervals as copies.

```js
Domain.fromIntervals([new Interval('[0;1]'), new Interval('[1;2]')]).display // [0;2]
new Domain(']1;5[').intervals.length // 1
```

## TableOfSigns

A `TableOfSigns` is built from a `Polynom`, a `Factor` or a `PolyFactor`. It computes the roots, the sign between them, and the intervals where the expression is positive or negative.

```js
const T = new TableOfSigns(new Polynom('x^2-1'))

T.roots.map(r => r.display) // [ '-1', '1' ]
T.signs // [ '+', 'z', '-', 'z', '+' ]
T.positive().display // ]-oo;-1[uu]1;+oo[
T.negative().display // ]-1;1[
T.nonNegative().display // ]-oo;-1]uu[1;+oo[
T.nonPositive().display // [-1;1]
T.zeros().map(r => r.display) // [ '-1', '1' ]
```

`signs` has one entry per interval and one per root: the even positions are the signs between the roots, and the odd positions are the value at each root. The signs are `+`, `-`, `z` (zero), `d` (the value is undefined at a pole), `h` (hatched, the expression is not defined on the whole interval) and `t` (a factor has no root there).

With a quotient, the roots of the denominator are poles.

```js
const Q = new TableOfSigns(new PolyFactor('(x-1)/(x+2)'))

Q.signs // [ '+', 'd', '-', 'z', '+' ]
Q.poles().map(r => r.display) // [ '-2' ]
Q.zeros().map(r => r.display) // [ '1' ]
Q.domain().display // RR\{-2}
Q.positive().display // ]-oo;-2[uu]1;+oo[
```

### LaTeX

`tex` writes the code of a `tkz-tab` figure, inside a `tikzpicture` environment. `withFactors` adds a row for each factor of a `PolyFactor`, `withLabel` renames the row of the product and `withTkzTabOptions(lgt, espcl)` changes the size of the table. These options are chainable.

```js
new TableOfSigns(new Polynom('x^2-1')).withLabel('g(x)').tex.includes('g(x)') // true
new TableOfSigns(new PolyFactor('(x-1)(x+2)')).withFactors.factors.length // 2
```

The `display` output is not implemented and throws a `NotImplementedError`.

## LogicalSet

A `LogicalSet` is an expression on named sets: `&` is the intersection, `|` the union, `!` the complement and `-` the difference.

```js
const S = new LogicalSet('A&B')

S.display // A ∩ B
S.tex // A \cap B
new LogicalSet('A&!B').tex // A \cap \overline{ B }
S.variables // [ 'A', 'B' ]
```

`&` and `|` have the same priority and are applied from left to right: `A|B&C` is `(A|B)&C`. Use parentheses for any other grouping. A malformed expression throws a `ParseError`.

### Evaluate and draw

`evaluate` tells whether an element belongs to the set, given its membership of each variable. `venn` lists the zones of a Venn diagram that belong to the set.

```js
const S = new LogicalSet('A&B')

S.evaluate({A: true, B: true}) // true
S.evaluate({A: true, B: false}) // false
new LogicalSet('A|B').vennAB() // [ 'A', 'AB', 'B' ]
new LogicalSet('!A').vennAB() // [ 'B', 'E' ]
new LogicalSet('!A').withUniverse('U').vennAB() // [ 'B', 'U' ]
new LogicalSet('A&B&C').vennABC() // [ 'ABC' ]
```

A zone is named by the letters of the sets it belongs to, in alphabetical order. The zone outside of every set is `E`, or the name given to `withUniverse`.

## Members

### Interval

<!--@include: ./_generated/members-Interval.md-->

### Domain

<!--@include: ./_generated/members-Domain.md-->

### TableOfSigns

<!--@include: ./_generated/members-TableOfSigns.md-->

### LogicalSet

<!--@include: ./_generated/members-LogicalSet.md-->
