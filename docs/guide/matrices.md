# Matrices and systems

`Matrix` holds fractions, `PolyMatrix` holds polynoms, and `LinearSystem` solves systems of linear equations.

```js
import {Matrix, PolyMatrix, LinearSystem} from 'pimath'
```

## Matrix

### Build a matrix

```js
new Matrix([[1, 2], [3, 4]]).display // ((1,2),(3,4))
new Matrix('((1,2),(3,4))').display // ((1,2),(3,4))
new Matrix(2, 3).display // ((0,0,0),(0,0,0))
new Matrix(2).display // ((0,0),(0,0))
Matrix.fromVectors(new Vector(1, 2), new Vector(3, 4)).display // ((1,3),(2,4))
```

Rows of different lengths throw a `DimensionError`. Each vector given to `fromVectors` is a *column*.

```js
new Matrix([[1, 2], [3]]) // throws DimensionError
```

Indices are zero-based.

```js
const M = new Matrix([[1, 2], [3, 4]])

M.dimension // { rows: 2, cols: 2 }
M.values[1][0].display // 3
M.rows.length // 2
M.cols[1].map(f => f.display) // [ '2', '4' ]
M.aij(0, 1).display // 2
M.aij(5, 5) // null
M.setValue(0, 0, 9).display // ((9,2),(3,4))
```

`values`, `rows` and `cols` give copies. `setValue` throws an `IndexError` outside of the matrix.

### Operations

Operations modify the matrix and return it. A dimension mismatch throws a `DimensionError`.

```js
new Matrix([[1, 2], [3, 4]]).add(new Matrix([[1, 1], [1, 1]])).display // ((2,3),(4,5))
new Matrix([[1, 2], [3, 4]]).subtract(new Matrix([[1, 1], [1, 1]])).display // ((0,1),(2,3))
new Matrix([[1, 2], [3, 4]]).multiply(2).display // ((2,4),(6,8))
new Matrix([[1, 2], [3, 4]]).multiply(new Matrix([[0, 1], [1, 0]])).display // ((2,1),(4,3))
new Matrix([[1, 2], [3, 4]]).pow(2).display // ((7,10),(15,22))
new Matrix([[1, 2], [3, 4]]).opposite().display // ((-1,-2),(-3,-4))
new Matrix([[1, 2], [3, 4]]).transpose().display // ((1,3),(2,4))
new Matrix([[1, 2], [3, 4]]).inverse().display // ((-2,1),(3/2,-1/2))
```

`transpose`, `rowEchelonForm` and `reducedRowEchelonForm` return a new matrix. `inverse` throws a `MathError` when the matrix is not invertible, so test it first.

```js
new Matrix([[1, 2], [3, 4]]).canBeInverted() // true
new Matrix([[1, 2], [2, 4]]).canBeInverted() // false
new Matrix([[1, 2], [3, 4]]).canBeMultiplied(new Matrix(3, 1)) // false
```

### Determinant, rank and reduction

```js
const M = new Matrix([[1, 2], [3, 4]])

M.determinant().display // -2
M.cofactor(0, 0).display // 4
M.rank() // 2
M.isSquare() // true
new Matrix([[1, 2], [3, 4]]).reducedRowEchelonForm().display // ((1,0),(0,1))
new Matrix([[2, 4], [1, 3]]).rowEchelonForm().display // ((1,2),(0,1))
```

`determinant` throws a `DimensionError` for a matrix that is not square. `cofactor(i, j)` is the signed minor.

### Display

```js
const M = new Matrix([[1, 2], [3, 4]])

M.display // ((1,2),(3,4))
M.asBmatrix.display // [(1,2),(3,4)]
M.asVmatrix.display // |(1,2),(3,4)|
```

`tex` writes a `pmatrix` environment. The delimiter options `asPmatrix` (default), `asBmatrix`, `asBraceMatrix`, `asVmatrix` and `asDoubleVmatrix` are chainable and stay set.

```js no-run
M.tex
// \begin{pmatrix}
//     1 & 2\\
//     3 & 4\\
// \end{pmatrix}
```

`withPartition(c)` draws a vertical bar before column `c`, as in an augmented matrix. `withDigits(n)` shows decimals.

```js
new Matrix([[1, 2, 3], [4, 5, 6]]).withPartition(2).display // ((1,2|3),(4,5|6))
new Matrix([[1, 2], [3, 4]]).multiply('1/3').withDigits(2).display // ((0.33,0.67),(1.00,1.33))
```

### Compare and test

```js
new Matrix([[1, 0], [0, 1]]).isOne() // true
new Matrix(2, 2).isZero() // true
new Matrix([[1, 2], [3, 4]]).isEqual(new Matrix([[1, 2], [3, 4]])) // true
```

### Go through the entries

```js
new Matrix([[1, 2], [3, 4]]).map(a => a.value) // [ [ 1, 2 ], [ 3, 4 ] ]
new Matrix([[1, 2], [3, 4]]).flat().map(a => a.display) // [ '1', '2', '3', '4' ]
```

`forEach(callback)` calls `callback(entry, row, column)` on the real entries, which can be modified.

## PolyMatrix

A `PolyMatrix` is built like a `Matrix` and has the same methods, with polynomial entries.

```js
const P = new PolyMatrix([['x', 1], [2, 'x+1']])

P.display // ((x,1),(2,x+1))
P.determinant().display // x^(2)+x-2
PolyMatrix.fromValues([[2, 1], [1, 2]]).characteristic_polynom('k').display // k^(2)-4k+3
```

`characteristic_polynom(variable)` is the polynom `det(A - kI)`, where `variable` names the unknown (`k` by default). `PolyMatrix.fromMatrix(M)` converts a `Matrix`.

## LinearSystem

A `LinearSystem` is built from equations written as strings, or from `Equation` objects.

```js
const S = new LinearSystem('x+y=3', 'x-y=1')

S.display // {(x,+y,=,3),(x,-y,=,1):}
S.variables // [ 'x', 'y' ]
S.solve().map(s => s.display) // [ '2', '1' ]
S.isSolvable() // true
```

The solutions come in the order of `variables`. `solve()` uses Gauss-Jordan elimination.

- A single solution gives one `Solution` per variable.
- A system with no solution gives an empty array.
- A system with infinitely many solutions gives one infinite `Solution` per variable.

```js
new LinearSystem('x+y=3', 'x+y=5').solve().length // 0
new LinearSystem('x+y=3', '2x+2y=6').solve().map(s => s.value) // [ Infinity, Infinity ]
LinearSystem.solutionAsDisplay(new LinearSystem('x+y=3', 'x-y=1').solve()) // (2;1)
```

### Build from numbers

```js
new LinearSystem().fromComponents([[1, 1, 3], [1, -1, 1]], 'xy').display // {(x,+y,=,3),(x,-y,=,1):}
```

Each row holds the coefficients of the variables, then the constant of the right member. `fromMatrix`, `fromVectors` and `fromEquations` do the same from other inputs, and replace the equations of the system.

### Work step by step

For a lesson on elimination, the system offers the elementary operations. They modify the system.

```js
const S = new LinearSystem('x+y=3', 'x-y=1')

S.multiply(2, 0).display // {(2x,+2y,=,6),(x,-y,=,1):}
S.add(new Equation('x-y=1'), 0).display // {(3x,+y,=,7),(x,-y,=,1):}
S.subtract(new Equation('x-y=1'), 1).display // {(3x,+y,=,7),(,,=,0):}
```

`mergeEquations({id, factor}, {id, factor})` returns the combination of two equations without changing the system, and `solve_compute_factors(variable)` suggests the factors that eliminate a variable. `matrix` gives the coefficients and the constants, and `toAugmentedMatrix()` the matrix `[A|b]`.

```js
const [A, b] = new LinearSystem('x+y=3', 'x-y=1').matrix

A.display // ((1,1),(1,-1))
b.display // ((3,1))
```

## Members

### Matrix

<!--@include: ./_generated/members-Matrix.md-->

### PolyMatrix

<!--@include: ./_generated/members-PolyMatrix.md-->

### LinearSystem

<!--@include: ./_generated/members-LinearSystem.md-->
