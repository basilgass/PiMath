PI - javascript math in your hands 
=============

PiMath is a script designed to create and generate mathematical exercises. 


```
let A = new PiMath.Fraction('2/3');
console.log(A.tex) // -> \frac{ 2 }{ 3 }

// Add another fraction
let B = new PiMath.Fraction('2/5');
A.add(B);
console.log(A.frac) // -> \frac{ 16 }{ 15 }
```