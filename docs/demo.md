---
aside: false
---

# Demo

Pick an example, change the code, and run it. The code runs in your browser against the library, the way a generator written by a teacher does.

<ClientOnly>
    <Playground />
</ClientOnly>

## How the code runs

- `PiMath` is available, and so is every class by its name: `Fraction`, `Polynom`, `Random`, `Line`...
- `show(value)` displays a value. An object with a `.tex` is drawn as LaTeX, an array is displayed element by element, and anything else as text. With several values, `show(a, b)` puts them on one line.
- `showTex(latex)` displays a LaTeX string you built, for example `` showTex(`${a.tex} + ${b.tex}`) ``.
- Operations modify the object they are called on. Use `clone()` to keep the original (see [getting started](./guide/getting-started)).

The editor suggests the names of the library while you type, the generators after `Random.`, and the options inside `Random.equation({ ... })`. The same autocompletion is available for your own CodeMirror editor, see [editor support](./guide/getting-started#editor-support).

The examples with a random draw have a **New draw** button. In your own project, import the library as described in [getting started](./guide/getting-started), then use the same code.

An endless loop in the code freezes the page: reload it.
