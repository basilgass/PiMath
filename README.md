PI - javascript math in your hands 
=============

PI is a script designed to create and generate mathematical exercises. 
Each class has a tex output, designed to be used in any LaTeX document.

Fraction will create... fraction !

```
let A = new Pi.Fraction('2/3');
console.log(A.frac) // -> \frac{ 2 }{ 3 }

// Add another fraction
let B = new Pi.Fraction('2/5');
A.add(B);
console.log(A.frac) // -> \frac{ 16 }{ 15 }
```
New version