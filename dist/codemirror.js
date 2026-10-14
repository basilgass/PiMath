import { n as e, t } from "./shared.js";
import { StateField as n } from "@codemirror/state";
import { EditorView as r, showTooltip as i } from "@codemirror/view";
//#region src/completions/codemirror.ts
var a = /(\bnew\s+)?([A-Za-z_$][\w$]*(?:\s*\.\s*[A-Za-z_$][\w$]*)*)\s*$/, o = /([A-Za-z_$][\w$]*|'[^']*'|"[^"]*")\s*:$/;
function s(e) {
	let t = [], n = 0;
	for (; n < e.length;) {
		let r = e.charAt(n), i = e.charAt(n + 1);
		if (r === "/" && i === "/") {
			let t = e.indexOf("\n", n);
			if (t === -1) return null;
			n = t + 1;
		} else if (r === "/" && i === "*") {
			let t = e.indexOf("*/", n + 2);
			if (t === -1) return null;
			n = t + 2;
		} else if (r === "'" || r === "\"" || r === "`") {
			let t = n + 1;
			for (; t < e.length && e.charAt(t) !== r && (r === "`" || e.charAt(t) !== "\n");) t += e.charAt(t) === "\\" ? 2 : 1;
			if (t >= e.length || e.charAt(t) !== r) return null;
			n = t + 1;
		} else {
			if (r === "(" || r === "[" || r === "{") {
				let i = e.slice(0, n), s = null;
				if (r === "(") {
					let e = a.exec(i);
					e && (s = `${e[1] ? "new " : ""}${e[2].replace(/\s+/g, "")}`);
				} else if (r === "{") {
					let e = o.exec(i.trimEnd());
					e && (s = e[1].replace(/^['"]|['"]$/g, ""));
				}
				t.push({
					open: r,
					name: s,
					start: n,
					segment: n + 1
				});
			} else if (r === ")" || r === "]" || r === "}") t.pop();
			else if (r === ",") {
				let e = t.at(-1);
				e && (e.segment = n + 1);
			}
			n++;
		}
	}
	return t;
}
function c(e) {
	let t = e.split(".");
	return t.length > 1 && t[0] === "PiMath" && t.shift(), t.length > 1 && (t[0] === "Geometry" || t[0] === "Errors") && t.shift(), t.join(".");
}
function l(e) {
	return e.startsWith("new ") ? `new ${c(e.slice(4))}` : c(e);
}
function u(e, t) {
	let n = t.at(-1);
	if (n?.open !== "{") return null;
	let r = /^\s*([\w$]*)$/.exec(e.slice(n.segment));
	if (!r) return null;
	let i = [], a = t.length - 1;
	for (; a >= 0;) {
		let e = t[a];
		if (e.open !== "{" || e.name === null) break;
		i.unshift(e.name), a--;
	}
	let o = t[a], s = t[a - 1];
	return o?.open !== "{" || s?.open !== "(" || !s.name || !e.slice(0, o.start).trimEnd().endsWith("(") ? null : {
		generator: l(s.name),
		path: i,
		from: e.length - r[1].length
	};
}
function d(e, t, n) {
	let r = n[e];
	if (!r) return [];
	let i = t.length > 0 ? `${t.join(".")}.` : "", a = /* @__PURE__ */ new Map();
	for (let e of r) {
		if (!e.path.startsWith(i)) continue;
		let t = e.path.slice(i.length), n = t.split(".")[0];
		t !== n && a.has(n) || a.set(n, {
			label: n,
			type: "property",
			apply: `${n}: `,
			detail: t === n ? `${e.type}${e.default === null ? "" : ` = ${e.default}`}` : "{ ... }",
			info: t === n ? e.description : void 0
		});
	}
	return [...a.values()];
}
function f(e) {
	return (t) => {
		let n = t.state.sliceDoc(0, t.pos), r = s(n);
		if (!r) return null;
		let i = u(n, r);
		if (i) {
			let t = d(i.generator, i.path, e.options);
			return t.length > 0 ? {
				from: i.from,
				options: t,
				validFor: /^[\w$]*$/
			} : null;
		}
		let a = t.matchBefore(/[\w$.]*/);
		if (!a) return null;
		let o = a.text.lastIndexOf(".");
		if (o === -1) return a.text === "" && !t.explicit ? null : {
			from: a.from,
			options: e.globals,
			validFor: /^[\w$]*$/
		};
		let l = e.members[c(a.text.slice(0, o))];
		return l ? {
			from: a.from + o + 1,
			options: l,
			validFor: /^[\w$]*$/
		} : null;
	};
}
function p(n = {}) {
	return f(n.extend ? t(e, n.extend) : e);
}
function m(e, t) {
	let n = s(e.sliceDoc(0, e.selection.main.head));
	if (!n) return null;
	for (let e of [...n].reverse()) {
		if (e.open !== "(" || !e.name) continue;
		let n = t.signatures[l(e.name)];
		if (n) return {
			pos: e.start + 1,
			above: !0,
			create() {
				let e = document.createElement("div");
				return e.className = "cm-signature-help", e.textContent = n.join("\n"), { dom: e };
			}
		};
	}
	return null;
}
function h(a = {}) {
	let o = a.extend ? t(e, a.extend) : e;
	return [n.define({
		create: (e) => m(e, o),
		update: (e, t) => t.docChanged || t.selection ? m(t.state, o) : e,
		provide: (e) => i.from(e)
	}), r.baseTheme({ ".cm-signature-help": {
		padding: "2px 8px",
		fontFamily: "monospace",
		fontSize: "0.9em",
		whiteSpace: "pre"
	} })];
}
//#endregion
export { p as pimathCompletion, h as pimathSignatureHelp };

//# sourceMappingURL=codemirror.js.map