import {Point} from "../maths/geometry/point.ts";
import {Line} from "../maths/geometry/line.ts";

let A = new Point(0, 2),
    B = new Point(2, 3),
    C = new Point(1 / 2, 4),
    D = new Point(2, -1 / 2);

let L1 = new Line(A, B).simplifyDirection(),
    L2 = new Line(C, D).simplifyDirection();

document.getElementById('app').innerHTML = `<p>\\( ${L1.tex.parametric} \\)</p>`;
document.getElementById('app').innerHTML += `<p>\\( ${L2.tex.parametric} \\)</p>`;

let I = L1.intersection(L2);
if (I.hasIntersection) {
    document.getElementById('app').innerHTML += `<p>\\[ ${L1.intersection(L2).point.tex} \\]</p>`
} else if (I.isParallel) {
    document.getElementById('app').innerHTML += `<p>Elles sont parallèles</p>`
} else if (I.isSame) {
    document.getElementById('app').innerHTML += `<p>Elles sont confondues</p>`
}


// @ts-ignore
renderMathInElement(document.getElementById('app'), {fleqn: true});
/*let p;
p = new Pi.Polynom('3x(6x+9)+6(6x+9)');
document.getElementById('app').innerHTML = `<p>${p.raw}</p>`;
document.getElementById('app').innerHTML += `<p>${p.display}</p>`;

let v1 = new Pi.Vector('3 4'),
	v2 = new Pi.Vector('-2 5');

console.log(v1);
console.log(v2);
console.log(Pi.Vector.scalarProduct(v1, v2));


let P = new Pi.Polynom('(x+5)(x-17)(37x+35)');
let Q = new Pi.Polynom('1');
P.factorize(100)

P.factors.forEach(n=> {
	console.log(n.tex)
	Q.multiply(n);
})

// Check that we have the same polynom.
console.log(P.tex);
console.log(Q.tex);





/*let n = new Pi.Polynom(),
		d = new Pi.Polynom();
n.parse('(x+3)(x+4)');
d.parse('(x+3)(x-2)')

let r = new Pi.Rational(n, d);
document.getElementById('app').innerHTML = `<p>${r.tex}</p>`*/


/*
let M = new Pi.Monom().random('x', 2, false, false);
console.log(M.displayWithSign);

let S = new Pi.LinearSystem().parse(
	'x-3y=-2',
	'4x+7x=1'
);
S.solve();
document.getElementById('app').innerHTML = `<p>${S.tex}</p>`;
document.getElementById('app').innerHTML += `<p>${S.texSolution}</p>`;
let S = new Pi.LinearSystem().generate(3,-5,2);
document.getElementById('app').innerHTML = `<p>${S.tex}</p>`;
S.solve();
S.log;
S.tex;

S = new Pi.LinearSystem().generate(-1,8,-2);
document.getElementById('app').innerHTML += `<p>${S.tex}</p>`;
S.solve();
S.log;

let P = new Pi.Polynom('3x^2+5yx-2');
console.log(P.tex);
console.log(P.numberOfVars);
P.replaceBy('y', new Pi.Polynom('2x+1'));
console.log(P.tex);

let A = new Pi.Equation('2x+3y=5');
console.log(A.tex);

A.isolate('x');
console.log(A.tex);

A.isolate('y');
console.log(A.tex);

let P = new Pi.Polynom().rndSimple(2).makeItComplicate();
console.log(P.tex);
console.log(P.texString);

let A = new Pi.Fraction().parse('2/5');
console.log(A.frac);

let F = new Pi.Fraction().parse('18/5');
let N = new Pi.Root().parse(F).reduce();
console.log(N.tex);

let E = new Pi.Equation().create(new Pi.Polynom().parse('x^2+6x-8'), new Pi.Polynom().zero());
E.solve();
console.log(E.solutions);

let D = 42;
console.log(Pi.Numeric.dividers(D));

let X = new Pi.Polynom().rndFactorable(2, false);
console.log(X.tex);
X.factors.forEach(function(P, i){
	console.log(P.tex);
});

let EQ = new Pi.Equation('2x+3>=5x-2');
EQ.solve();
console.log(EQ.solution);

EQ.parseString('2x+3<5x-2');
EQ.solve();
console.log(EQ.solution);

EQ.parseString('7x+3>5x-2');
EQ.solve();
console.log(EQ.solution);

EQ.parseString('7x+3=<5x-2');
EQ.solve();
console.log(EQ.solution);

EQ.parseString('7x+3=<7x-2');
EQ.solve();
console.log(EQ.solution);

EQ.parseString('7x+3>7x-2');
EQ.solve();
console.log(EQ.solution);

EQ.parseString('x^2+6x+9>=0');
EQ.solve();
console.log(EQ.solution);*/