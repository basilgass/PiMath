/**
 * The examples of the demo page (`docs/demo.md`). Each one is the body of a function run by `run.mjs`: see that file
 * for what `show` and `showTex` do. `npm run docs:check` runs every example, so a broken one blocks the publication.
 *
 * `random: true` marks an example whose result changes at each run (the button then reads "New draw").
 */
export const examples = [
    {
        title: 'Fractions',
        random: false,
        code: `const a = new Fraction('3/4')
const b = new Fraction('5/6')

// operations modify the object: clone() keeps the original
showTex(\`\${a.tex} + \${b.tex} = \${a.clone().add(b).tex}\`)
showTex(\`\${a.tex} \\\\times \${b.tex} = \${a.clone().multiply(b).tex}\`)

// the same value, written as a decimal
show(a.clone().withDigits(2))
`,
    },
    {
        title: 'Polynomial',
        random: false,
        code: `const P = new Polynom('x^2-5x+6')

showTex(\`P(x) = \${P.tex}\`)
showTex(\`P'(x) = \${P.derivative().tex}\`)
showTex(\`P(x) = \${new PolyFactor(P).factorize().tex}\`)

// the roots, as exact solutions
show(P.roots)
`,
    },
    {
        title: 'Random equation with its solution',
        random: true,
        code: `const e = Random.equation({
    degree: 2,
    solution: {count: 2, relative: true, range: 6}
})

showTex(e.tex)
show('Solutions:')
e.solve().forEach(s => showTex(\`x = \${s.tex}\`))
`,
    },
    {
        title: 'Matrix',
        random: true,
        code: `const M = new Matrix([
    [Random.number(1, 5), Random.number(1, 5)],
    [Random.number(1, 5), Random.number(6, 9)]
])

showTex(\`\\\\det \${M.clone().asVmatrix.tex} = \${M.determinant().tex}\`)

if (M.canBeInverted()) {
    showTex(\`\${M.clone().tex}^{-1} = \${M.clone().inverse().tex}\`)
}
`,
    },
    {
        title: 'Line',
        random: true,
        code: `const A = Random.point({range: 5})
const B = Random.point({range: 5})

if (A.isEqual(B)) {
    show('Draw again: the two points are the same.')
} else {
    const d = Line.fromPoints(A, B)

    showTex(\`A = \${A.tex}, B = \${B.tex}\`)
    showTex(\`(AB):\\\\ \${d.tex}\`)
    showTex(\`(AB):\\\\ \${d.asMxh.tex}\`)
    showTex(\`d(O;AB) = \${d.distanceTo(new Point(0, 0)).tex}\`)
}
`,
    },
    {
        title: 'Circle',
        random: true,
        code: `const c = Random.circle()

showTex(c.tex)
showTex(\`\${c.asDeveloped.tex}\`)
showTex(\`\\\\text{center } \${c.center.tex},\\\\quad r = \${c.radius.tex}\`)

// the points with integer coordinates, easy to draw
show(c.getPointsOnCircle().slice(0, 4))
`,
    },
    {
        title: 'Table of signs',
        random: false,
        code: `const f = new PolyFactor('(x-1)(x+2)/(x-3)')
const T = new TableOfSigns(f)

showTex(\`f(x) = \${f.asRoot.tex}\`)
showTex(\`\\\\text{domain: } \${T.domain().tex}\`)
showTex(\`f(x) > 0 \\\\iff x \\\\in \${T.positive().tex}\`)
showTex(\`f(x) \\\\le 0 \\\\iff x \\\\in \${T.nonPositive().tex}\`)

// the LaTeX code of the table (tkz-tab) is in T.tex
`,
    },
]
