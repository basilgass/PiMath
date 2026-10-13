<script setup>
import {computed, onBeforeUnmount, onMounted, ref} from 'vue'
import katex from 'katex'
import * as library from 'pimath'
import {examples} from './demoExamples.mjs'
import {runExample} from './run.mjs'

const host = ref(null)
const selected = ref(0)
const output = ref([])
const error = ref('')
const ready = ref(false)

const current = computed(() => examples[selected.value])
const runLabel = computed(() => (current.value.random ? 'New draw' : 'Run'))

let view = null
let setCode = () => {}

function tex(latex) {
    return katex.renderToString(latex, {throwOnError: false, displayMode: true})
}

function execute() {
    const lines = []
    error.value = ''
    try {
        runExample(view.state.doc.toString(), library, line => lines.push(line))
    } catch (e) {
        error.value = `${e?.name ?? 'Error'}: ${e?.message ?? e}`
    }
    output.value = lines
}

function choose() {
    setCode(current.value.code)
    execute()
}

onMounted(async () => {
    const [{EditorState}, {EditorView, keymap}, {defaultKeymap, history, historyKeymap, indentWithTab}, {javascript, javascriptLanguage}, language, {tags}, {autocompletion}, {pimathCompletion, pimathSignatureHelp}] =
        await Promise.all([
            import('@codemirror/state'),
            import('@codemirror/view'),
            import('@codemirror/commands'),
            import('@codemirror/lang-javascript'),
            import('@codemirror/language'),
            import('@lezer/highlight'),
            import('@codemirror/autocomplete'),
            import('pimath/codemirror'),
        ])

    // The colors come from the classes below, which follow the theme of the site (light or dark).
    const highlight = language.HighlightStyle.define([
        {tag: tags.keyword, class: 'tok-keyword'},
        {tag: [tags.string, tags.special(tags.string)], class: 'tok-string'},
        {tag: [tags.number, tags.bool, tags.null], class: 'tok-number'},
        {tag: [tags.lineComment, tags.blockComment], class: 'tok-comment'},
        {tag: [tags.function(tags.variableName), tags.propertyName], class: 'tok-function'},
        {tag: tags.className, class: 'tok-class'},
    ])

    const create = doc => EditorState.create({
        doc,
        extensions: [
            history(),
            keymap.of([
                {key: 'Mod-Enter', run: () => { execute(); return true }},
                indentWithTab,
                ...defaultKeymap,
                ...historyKeymap,
            ]),
            javascript(),
            // The suggestions of PiMath come with the package: the same ones are available in any CodeMirror editor.
            javascriptLanguage.data.of({autocomplete: pimathCompletion(demo)}),
            autocompletion(),
            pimathSignatureHelp(demo),
            language.syntaxHighlighting(highlight),
            language.bracketMatching(),
            EditorView.lineWrapping,
        ],
    })

    // `show` and `showTex` exist only in the demo: they are added to the suggestions of PiMath.
    const demo = {
        extend: {
            globals: [
                {label: 'show', type: 'function', detail: '(...values)', info: 'Displays values: LaTeX for an object with a .tex, element by element for an array, text otherwise. Several values share one line.'},
                {label: 'showTex', type: 'function', detail: '(latex)', info: 'Displays a LaTeX string.'},
            ],
            signatures: {show: ['show(...values: unknown[])'], showTex: ['showTex(latex: string)']},
        },
    }

    view = new EditorView({state: create(current.value.code), parent: host.value})
    setCode = code => view.setState(create(code))

    ready.value = true
    execute()
})

onBeforeUnmount(() => view?.destroy())
</script>

<template>
    <div class="pm-demo">
        <div class="pm-bar">
            <label>
                Example
                <select v-model.number="selected" :disabled="!ready" @change="choose">
                    <option v-for="(example, index) in examples" :key="example.title" :value="index">
                        {{ example.title }}
                    </option>
                </select>
            </label>
            <button type="button" :disabled="!ready" @click="execute">{{ runLabel }}</button>
            <span class="pm-hint">Ctrl+Enter</span>
        </div>

        <div ref="host" class="pm-editor"></div>

        <div class="pm-output" aria-live="polite">
            <template v-for="(line, index) in output" :key="index">
                <div v-if="line.kind === 'tex'" class="pm-tex" v-html="tex(line.value)"></div>
                <pre v-else class="pm-text">{{ line.value }}</pre>
            </template>
            <pre v-if="error" class="pm-error">{{ error }}</pre>
        </div>
    </div>
</template>

<style scoped>
.pm-demo {
    margin: 16px 0;
}

.pm-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
}

.pm-bar select,
.pm-bar button {
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    padding: 4px 10px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
}

.pm-bar button {
    background: var(--vp-c-brand-3);
    border-color: var(--vp-c-brand-3);
    color: var(--vp-c-white);
    cursor: pointer;
}

.pm-bar button:disabled {
    opacity: 0.5;
    cursor: default;
}

.pm-hint {
    color: var(--vp-c-text-3);
    font-size: 0.85em;
}

.pm-editor {
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    background: var(--vp-code-block-bg);
    min-height: 120px;
}

.pm-editor :deep(.cm-editor) {
    font-family: var(--vp-font-family-mono);
    font-size: 0.9em;
    background: transparent;
    color: var(--vp-c-text-1);
}

.pm-editor :deep(.cm-editor.cm-focused) {
    outline: 2px solid var(--vp-c-brand-1);
    outline-offset: -1px;
    border-radius: 6px;
}

.pm-editor :deep(.cm-content) {
    caret-color: var(--vp-c-text-1);
    padding: 8px 0;
}

.pm-editor :deep(.cm-cursor) {
    border-left-color: var(--vp-c-text-1);
}

.pm-editor :deep(.cm-selectionBackground),
.pm-editor :deep(.cm-editor.cm-focused .cm-selectionBackground) {
    background: var(--vp-c-brand-soft);
}

.pm-editor :deep(.cm-tooltip) {
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    background: var(--vp-c-bg-elv);
    color: var(--vp-c-text-1);
}

.pm-editor :deep(.cm-tooltip-autocomplete ul li[aria-selected]) {
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-text-1);
}

.pm-editor :deep(.cm-completionInfo) {
    max-width: 22em;
    white-space: normal;
}

.pm-editor :deep(.tok-keyword) { color: var(--vp-c-brand-1); }
.pm-editor :deep(.tok-string) { color: var(--vp-c-green-1); }
.pm-editor :deep(.tok-number) { color: var(--vp-c-purple-1); }
.pm-editor :deep(.tok-comment) { color: var(--vp-c-text-3); font-style: italic; }
.pm-editor :deep(.tok-function) { color: var(--vp-c-indigo-1); }
.pm-editor :deep(.tok-class) { color: var(--vp-c-yellow-1); }

.pm-output {
    margin-top: 12px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    padding: 4px 12px;
    min-height: 48px;
    overflow-x: auto;
}

.pm-tex :deep(.katex-display) {
    margin: 0.6em 0;
}

.pm-text,
.pm-error {
    margin: 0.5em 0;
    white-space: pre-wrap;
    font-family: var(--vp-font-family-mono);
    font-size: 0.9em;
}

.pm-error {
    color: var(--vp-c-danger-1);
}
</style>
