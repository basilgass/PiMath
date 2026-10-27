//#region src/errors.ts
var e = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = new.target.name;
	}
}, t = class extends e {}, n = class extends e {}, r = class extends e {}, i = class extends e {}, a = class extends e {}, o = class extends e {}, s = class extends e {}, c = class extends e {};
//#endregion
//#region src/helpers.ts
function l(e) {
	if (e !== null && (!Number.isInteger(e) || e < 0 || e > 100)) throw new i(`withDigits expects null or an integer from 0 to 100, got: ${e}`);
	return e;
}
function u(e, t = !0) {
	return t ? `\\left( ${e} \\right)` : `(${e})`;
}
function d(e) {
	if (!e.startsWith("(") || !e.endsWith(")")) return e;
	let t = 0;
	for (let n = 0; n < e.length - 1; n++) if (e[n] === "(" ? t++ : e[n] === ")" && t--, t === 0) return e;
	return e.slice(1, -1);
}
function f(e, t, n, r, i) {
	return e.map((e, a) => r !== void 0 && a < r || i !== void 0 && a > i ? e : e === t ? n : e);
}
function p(e, t) {
	if (t.length !== 1) throw new i(`splitChar must be a single character, got: "${t}"`);
	let n = 0, r = 0, a = [];
	for (let i = 0; i < e.length; i++) {
		let o = e[i];
		o === "(" ? n++ : o === ")" ? n-- : o === t && n === 0 && (a.push(e.substring(r, i)), r = i + 1);
	}
	return a.push(e.substring(r)), a;
}
//#endregion
//#region src/numeric.ts
var ee = 1e4, m;
function te(e) {
	let t = new Uint8Array(e + 1), n = [];
	for (let r = 2; r <= e; r++) if (t[r] === 0) {
		n.push(r);
		for (let n = r * r; n <= e; n += r) t[n] = 1;
	}
	return n;
}
function ne(e) {
	let t = ie(e), n = [], r, i;
	for (; t.length > 0;) r = t.shift() ?? 1, i = (t.length > 0 ? t.pop() : r) ?? 1, n.push([r, i]);
	return n;
}
function re(...e) {
	let t = ae(...e);
	return e.map((e) => e / t);
}
function ie(e) {
	if (!Number.isInteger(e)) throw new i(`dividers expects a finite integer, got ${e}`);
	let t = Math.abs(e), n = Math.sqrt(t), r = [];
	for (let i = 1; i <= n; i++) e % i === 0 && (r.push(i), r.push(t / i));
	return r.sort(function(e, t) {
		return e - t;
	}), [...new Set(r)];
}
function ae(...e) {
	let t = function(e, n) {
		return isNaN(e) || isNaN(n) ? NaN : n === 0 ? e : e === 0 ? n : t(n, e % n);
	};
	if (e.length === 0) return 1;
	if (e.length === 1) return e[0] === 0 ? 1 : Math.abs(e[0]);
	let n = t(e[0], e[1]);
	if (n === 1) return 1;
	for (let r = 2; r < e.length && (n = t(n, e[r]), n !== 1); r++);
	return Math.abs(n);
}
function oe(...e) {
	return e.includes(0) ? 0 : e.reduce(function(e, t) {
		return Math.abs(e / ae(e, t) * t);
	}, 1);
}
function se(e, t = 3) {
	let n = Math.min(100, Math.max(0, Math.trunc(t)));
	return +e.toFixed(n);
}
function ce(e) {
	if (m ??= te(ee), e === void 0) return [...m];
	if (!Number.isInteger(e) || e < 0) throw new i(`primes expects a non-negative integer, got: ${e}`);
	return m.slice(0, Math.min(m.length, e));
}
function le(e, t) {
	if (!Number.isInteger(e) || e < 0) throw new i(`pythagoreanTripletsWithTarget expects a non-negative integer target, got ${e}`);
	let n = t === !0 ? e : e ** 2, r = t === !0 ? Math.sqrt(e) : e, a = [];
	for (let e = 0; e <= r; e++) {
		let t = n - e ** 2;
		if (t < 0) break;
		let i = Math.round(Math.sqrt(t));
		i * i === t && a.push([
			e,
			i,
			r
		]);
	}
	return a;
}
function ue(e, t = 2) {
	if (!Number.isFinite(e)) return e;
	let n = (e, t) => {
		let [n, r] = e.toExponential().split("e");
		return Number(`${n}e${Number(r) + t}`);
	}, r = Math.trunc(t);
	return n(Math.round(n(e, r)), -r);
}
function de(e, t) {
	if (t <= 0) return 1;
	if (e < 0) return t % 2 == 1 ? -de(-e, t) : 1;
	let n = Math.round(e ** (1 / t));
	for (; n > 1 && n ** +t > e;) n--;
	for (; n > 1;) {
		let r = n ** +t;
		if (e % r === 0) return r;
		n--;
	}
	return 1;
}
function fe(e, t) {
	if (t <= 0) return NaN;
	if (e < 0) return t % 2 == 1 ? -fe(-e, t) : NaN;
	let n = e ** (1 / t), r = Math.round(n);
	return r ** +t === e ? r : n;
}
var h = Object.freeze({
	decompose: ne,
	dividers: ie,
	divideNumbersByGCD: re,
	gcd: ae,
	lcm: oe,
	numberCorrection: se,
	primes: ce,
	pythagoreanTripletsWithTarget: le,
	round: ue,
	greatestPower: de,
	nthRoot: fe
}), pe = /* @__PURE__ */ function(e) {
	return e.frac = "frac", e.dfrac = "dfrac", e.tfrac = "tfrac", e;
}({}), me = 3, g = class e {
	#e = 1;
	#t = null;
	#n = !0;
	#r = 0;
	#i = "frac";
	#a = !1;
	constructor(e, t) {
		return e !== void 0 && this.parse(e, t), this;
	}
	parse(t, n) {
		return t === "" ? this.zero() : typeof t == "number" && isNaN(t) ? this.invalid() : typeof t == "number" && !isFinite(t) ? (this.infinite(), t < 0 && this.opposite(), this) : typeof t == "string" ? this.copy(e.fromString(t)) : typeof t == "number" && n === void 0 ? this.copy(e.fromNumber(t)) : typeof t == "number" && typeof n == "number" ? this.copy(e.fromNumbers(t, n)) : t instanceof e ? this.copy(t) : this;
	}
	clone() {
		let t = new e();
		return t.numerator = this.#r, t.denominator = this.#e, t.exact = this.exact, t.#i = this.#i, t.#t = this.#t, t.#a = this.#a, t;
	}
	copy(e) {
		return this.#r = e.numerator, this.#e = e.denominator, this.#n = e.exact, this;
	}
	get tex() {
		if (this.isInfinity()) return `${this.sign() === 1 ? "+" : "-"}\\infty`;
		let e = this.#a && this.isPositive() ? "+" : "";
		return this.#t === null ? this.exact ? this.#e === 1 ? `${e}${this.#r}` : this.#r < 0 ? `-\\${this.#i}{ ${-this.#r} }{ ${this.#e} }` : `${e}\\${this.#i}{ ${this.#r} }{ ${this.#e} }` : e + this.value.toFixed(me) : e + this.value.toFixed(this.#t);
	}
	get display() {
		if (this.isInfinity()) return `${this.sign() === 1 ? "+" : "-"}oo`;
		let e = this.#a && this.isPositive() ? "+" : "";
		return this.#t === null ? this.exact ? this.#e === 1 ? `${e}${this.#r}` : `${e}${this.#r}/${this.#e}` : e + this.value.toFixed(me) : e + this.value.toFixed(this.#t);
	}
	static areEquals(...e) {
		return e.every((t) => t.isEqual(e[0]));
	}
	static average(...t) {
		let n = new e(0);
		for (let e of t) n.add(e);
		return n.divide(t.length), n;
	}
	static isFraction(t) {
		if (t instanceof e || typeof t == "number" && !isNaN(t)) return !0;
		if (typeof t == "string") {
			if (t === "" || /^([+-]?)(\d*)\.(\d*)\((\d+)\)$/.test(t)) return !0;
			let e = t.split("/");
			return e.length <= 2 && e.every((e) => e.trim() !== "" && !isNaN(+e));
		}
		return !1;
	}
	static max(...t) {
		let n = new e(t[0]);
		for (let r of t) {
			let t = new e(r);
			t.isGreater(n) && (n = t.clone());
		}
		return n;
	}
	static min(...t) {
		let n = new e(t[0]);
		for (let r of t) {
			let t = new e(r);
			t.isLesser(n) && (n = t.clone());
		}
		return n;
	}
	static sort(t, n) {
		let r = t.map((t) => t instanceof e ? t : new e(t)).sort((e, t) => e.value - t.value);
		return n && r.reverse(), r;
	}
	static toSameDenominateur(...t) {
		let n = t.map((t) => new e(t)), r = h.lcm(...n.map((e) => e.denominator));
		return n.forEach((e) => e.amplify(r / e.denominator)), n;
	}
	static unique(t) {
		let n = {}, r = [];
		return t.forEach((t) => {
			t instanceof e || (t = new e(t)), n[t.clone().reduce().tex] || (r.push(t.clone()), n[t.clone().reduce().tex] = !0);
		}), r;
	}
	static xMultiply(...t) {
		let n = new e(1);
		return t.forEach((e) => n.multiply(e, !1)), n;
	}
	abs() {
		return this.#r = Math.abs(this.#r), this.#e = Math.abs(this.#e), this;
	}
	add(t) {
		if (t instanceof e) {
			let e = this.#r, n = this.#e;
			this.#r = e * t.denominator + t.numerator * n, this.#e = n * t.denominator, this.exact = this.exact && t.exact, this.#o();
		} else return this.add(new e(t));
		return this.reduce();
	}
	amplify(e) {
		if (!Number.isSafeInteger(e)) throw new i("The amplification factor must be a safe integer.");
		if (e === 0) throw new i("The amplification factor cannot be zero.");
		return this.#r *= e, this.#e *= e, this;
	}
	compare(t, n) {
		n ??= "=";
		let r;
		switch (r = t instanceof e ? t.clone() : new e(t), n) {
			case ">": return this.value > r.value;
			case ">=":
			case "=>":
			case "geq": return this.value >= r.value;
			case "<": return this.value < r.value;
			case "<=":
			case "=<":
			case "leq": return this.value <= r.value;
			case "=":
			case "same": return this.#r * r.denominator === r.numerator * this.#e;
			case "<>":
			case "neq": return this.#r * r.denominator !== r.numerator * this.#e;
			default: return !1;
		}
	}
	get denominator() {
		return this.#e;
	}
	set denominator(e) {
		if (e === 0) {
			if (this.#r === 0) {
				this.invalid();
				return;
			}
			let e = this.sign();
			this.infinite(), e === -1 && this.opposite();
			return;
		}
		this.#e = e;
	}
	get asDfrac() {
		return this.#i = "dfrac", this;
	}
	withDigits(e) {
		return this.#t = l(e), this;
	}
	divide(t) {
		let n = new e(t);
		if (n.numerator === 0) {
			let e = this.sign();
			return this.infinite(), e === -1 ? this.opposite() : this;
		}
		let r = this.#r, i = this.#e;
		return this.#r = r * n.denominator, this.#e = i * n.numerator, this.exact = this.exact && n.exact, this.#o(), this.reduce();
	}
	get exact() {
		return this.#n;
	}
	set exact(e) {
		this.#n = e;
	}
	get asFrac() {
		return this.#i = "frac", this;
	}
	static fromNumber(t) {
		let n = new e();
		if (Number.isSafeInteger(t)) return n.#r = t, n.#e = 1, n.#n = !0, n;
		if (t.toString().includes("e") || t.toString().includes("E")) throw new i(`Exponential notation is not supported: ${t}`);
		let [, r] = t.toString().split("."), a = r ? r.length : 0, o = 10 ** a;
		return n.#r = t * o, n.#e = o, n.#r = h.numberCorrection(n.#r), n.#e = h.numberCorrection(n.#e), n.reduce(), n.#n = a < 10, n;
	}
	static fromNumbers(t, n) {
		if (n === 0) {
			if (t === 0) return new e().invalid();
			let n = new e().infinite();
			return t < 0 && n.opposite(), n;
		}
		if (Number.isSafeInteger(t) && Number.isSafeInteger(n)) {
			let r = new e();
			return r.#r = t, r.#e = n, r.#n = !0, r;
		}
		return e.fromNumber(t / n);
	}
	static fromPeriodic(t, n) {
		let [, r] = t.toString().split(/[.,]/), a = r ? r.length : 0;
		if (!Number.isSafeInteger(n) || n <= 0) throw new i("The periodic length must be a positive integer.");
		if (n > a) throw new i(`The periodic length (${n}) cannot exceed the number of decimal digits (${a}).`);
		let o = 10 ** a, s = 10 ** (a - n), c = +t, l = c < 0 ? -1 : 1, u = Math.abs(c), d = new e();
		return d.#r = l * Math.round(u * o - Math.floor(u * s)), d.#e = o - s, d.#n = !0, d.reduce();
	}
	static fromString(t) {
		let n = /^([+-]?)(\d*)\.(\d*)\((\d+)\)$/.exec(t);
		if (n) {
			let [, t, r, i, a] = n, o = `${r || "0"}.${i}${a}`, s = e.fromPeriodic(o, a.length);
			return t === "-" && s.opposite(), s.reduce();
		}
		if (t.includes("(") || t.includes(")")) return new e().invalid();
		let r = t.split("/").map(Number);
		return r.length > 2 || r.some((e) => isNaN(e)) ? new e().invalid() : r.length === 1 ? e.fromNumber(+t) : e.fromNumbers(r[0], r[1]);
	}
	infinite() {
		return this.#r = Infinity, this.#e = 1, this.exact = !0, this;
	}
	invalid() {
		return this.#r = NaN, this.#e = 1, this.exact = !0, this;
	}
	inverse() {
		if (this.#r === 0) return this.infinite();
		let e = this.sign(), t = Math.abs(this.#r);
		return this.#r = Math.abs(this.#e) * e, this.#e = t, this;
	}
	#o() {
		let e = (e) => Number.isFinite(e) && Math.abs(e) > 2 ** 53 - 1;
		(e(this.#r) || e(this.#e)) && (this.exact = !1);
	}
	isEqual(e) {
		return this.compare(e, "=");
	}
	isEven() {
		return this.isRelative() && this.value % 2 == 0;
	}
	isFinite() {
		return !this.isInfinity() && !this.isNaN();
	}
	isGeq(e) {
		return this.compare(e, ">=");
	}
	isGreater(e) {
		return this.compare(e, ">");
	}
	isInfinity() {
		return Math.abs(this.#r) === Infinity;
	}
	isLeq(e) {
		return this.compare(e, "<=");
	}
	isLesser(e) {
		return this.compare(e, "<");
	}
	isNaN() {
		return isNaN(this.#r);
	}
	isNatural() {
		return this.isRelative() && this.isPositive();
	}
	isNegative() {
		return this.sign() === -1;
	}
	isNotEqual(e) {
		return this.compare(e, "<>");
	}
	isNotZero() {
		return this.#r !== 0;
	}
	isOdd() {
		return this.isRelative() && Math.abs(this.value % 2) === 1;
	}
	isOne() {
		return this.#r === 1 && this.#e === 1;
	}
	isPeriodic() {
		if (!this.exact || !this.isFinite()) return !1;
		let e = Math.abs(this.clone().reduce().denominator);
		for (; e % 2 == 0;) e /= 2;
		for (; e % 5 == 0;) e /= 5;
		return e !== 1;
	}
	isPositive() {
		return this.sign() === 1;
	}
	isRational() {
		return this.exact && this.isFinite();
	}
	hasFractionalPart() {
		return this.exact && !this.isRelative();
	}
	isReduced() {
		return Math.abs(h.gcd(this.#r, this.#e)) === 1;
	}
	isRelative() {
		return this.exact && this.clone().reduce().denominator === 1;
	}
	isSquare() {
		let e = this.clone().reduce();
		if (e.isNegative()) return !1;
		let t = Math.abs(e.numerator), n = Math.abs(e.denominator), r = Math.round(Math.sqrt(t)), i = Math.round(Math.sqrt(n));
		return r * r === t && i * i === n;
	}
	isStrictlyNegative() {
		return this.value < 0;
	}
	isStrictlyPositive() {
		return this.value > 0;
	}
	isUnit() {
		return Math.abs(this.#r) === 1 && this.#e === 1;
	}
	isZero() {
		return this.#r === 0;
	}
	multiply(t, n = !0) {
		let r = new e(t);
		return this.#r *= r.numerator, this.#e *= r.denominator, this.exact = this.exact && r.exact, this.#o(), n ? this.reduce() : this;
	}
	get numerator() {
		return this.#r;
	}
	set numerator(e) {
		this.#r = e;
	}
	one() {
		return this.copy(e.fromNumber(1));
	}
	opposite() {
		return this.#r = -this.#r, this;
	}
	pow(t) {
		if (t instanceof e) return this.pow(t.value);
		if (this.isNegative() && !Number.isInteger(t)) throw new r("A negative base cannot be raised to a non-integer exponent.");
		this.reduce(), t < 0 && this.inverse();
		let n = Math.abs(t);
		if (Number.isInteger(n)) return this.#r = Math.round(this.#r ** +n), this.#e = Math.round(this.#e ** +n), this.#o(), this;
		let i = Math.round(this.#r ** +n), a = Math.round(this.#e ** +n);
		return Math.round(i ** (1 / n)) === this.#r && Math.round(a ** (1 / n)) === this.#e ? (this.#r = i, this.#e = a) : (this.#r = this.#r ** +n / this.#e ** +n, this.#e = 1, this.exact = !1), this;
	}
	reduce() {
		let e = h.gcd(this.#r, this.#e);
		return this.#r /= e, this.#e /= e, this.#e < 0 && (this.#e = -this.#e, this.#r = -this.#r), this;
	}
	root(e) {
		if (e === 0) return this;
		if (!Number.isSafeInteger(e)) throw new i("The root must be an integer.");
		if (this.isNegative() && e % 2 == 0) throw new r("The root of a negative number must be odd.");
		e < 0 && this.inverse();
		let t = this.sign();
		this.abs(), this.reduce();
		let n = Math.abs(e), a = Math.round(this.#r ** (1 / n)), o = Math.round(this.#e ** (1 / n));
		return a ** +n === this.#r && o ** +n === this.#e ? (this.#r = a, this.#e = o) : (this.#r = this.#r ** (1 / n) / this.#e ** (1 / n), this.#e = 1, this.exact = !1), this.multiply(t), this;
	}
	sign() {
		return this.isNaN() || this.#r * this.#e >= 0 ? 1 : -1;
	}
	sqrt() {
		return this.root(2);
	}
	subtract(t) {
		return t instanceof e ? this.add(t.clone().opposite()) : this.add(new e(t).opposite());
	}
	get asTfrac() {
		return this.#i = "tfrac", this;
	}
	toRepeatingDecimal() {
		if (!this.exact || !this.isFinite()) throw new i("Cannot decompose a non-exact or infinite fraction.");
		let e = this.clone().reduce(), t = e.sign(), n = Math.abs(e.numerator), r = Math.abs(e.denominator), a = Math.floor(n / r).toString(), o = n % r, s = [], c = /* @__PURE__ */ new Map(), l = -1;
		for (; o !== 0;) {
			let e = c.get(o);
			if (e !== void 0) {
				l = e;
				break;
			}
			c.set(o, s.length), o *= 10, s.push(Math.floor(o / r)), o %= r;
		}
		let u = (l === -1 ? s : s.slice(0, l)).join(""), d = l === -1 ? "" : s.slice(l).join("");
		return {
			sign: t,
			integerPart: a,
			nonPeriodic: u,
			periodic: d,
			periodLength: d.length
		};
	}
	get value() {
		let e = this.#r / this.#e;
		return e === 0 ? 0 : e;
	}
	get withSign() {
		return this.#a = !0, this;
	}
	get withoutSign() {
		return this.#a = !1, this;
	}
	zero() {
		return this.copy(e.fromNumber(0));
	}
}, _ = class e {
	#e;
	#t;
	#n;
	#r = !1;
	constructor(e) {
		return this.#t = 2, this.#e = new g(0), this.#n = new g(0), e !== void 0 && this.parse(e), this;
	}
	parse(t) {
		if (t instanceof e) return this.copy(t);
		if (t instanceof g) return this.copy(e.fromFraction(t));
		if (typeof t == "string") return this.copy(e.fromString(t));
		let n = new e();
		return n.#i(t), this.copy(n);
	}
	copy(e) {
		return this.index = e.index, this.radical = e.radical.clone(), this.factor = e.factor.clone(), this;
	}
	static fromFraction(t) {
		let n = new e();
		return n.index = 2, n.factor = t.clone(), n.#n.one(), n;
	}
	static fromString(t) {
		let n = new e();
		return t.includes("sqrt") ? n.#f(t) : t.includes("root") ? n.#d(t) : n.#i(t);
	}
	#i(e) {
		let n = new g(e);
		if (n.isNaN()) throw new t(`Cannot parse "${e}" as a root or fraction`);
		return this.index = 2, this.factor = n, this.radical.one(), this;
	}
	clone() {
		let t = new e().from(this.index, this.radical, this.factor);
		return t.#r = this.#r, t;
	}
	get tex() {
		let e = this.#r && this.factor.isPositive() ? "+" : "", t = e && this.#e.numerator === 1 ? " " : "";
		if (this.isZero()) return `${e}0`;
		let n = this.#l(this.#e.denominator, this.#n.denominator), r = this.#l(this.#e.numerator, this.#n.numerator) ?? "1";
		return n === null ? `${e}${t}${r}` : `${e}${t}\\frac{ ${r} }{ ${n} }`;
	}
	get display() {
		let e = this.#r && this.factor.isPositive() ? "+" : "";
		if (this.isZero()) return `${e}0`;
		let t = this.#c(this.#e.denominator, this.#n.denominator, !0), n = this.#c(this.#e.numerator, this.#n.numerator, t !== null) ?? "1";
		return t === null ? `${e}${n}` : `${e}${n}/${t}`;
	}
	add(e) {
		return this.#s(e, !1);
	}
	divide(t) {
		return this.multiply(new e(t).inverse());
	}
	get factor() {
		return this.#e;
	}
	set factor(e) {
		if (e.isNaN()) throw new i("The factor cannot be an invalid (NaN) fraction.");
		this.#e = e;
	}
	from(e, n, r) {
		this.index = e;
		let i = new g(n);
		if (i.isNaN()) throw new t(`Cannot build a root from an invalid radical: "${n instanceof g ? n.display : n}"`);
		if (this.radical = i, r === void 0) this.factor = new g(1);
		else {
			let e = new g(r);
			if (e.isNaN()) throw new t(`Cannot build a root from an invalid factor: "${r instanceof g ? r.display : r}"`);
			this.factor = e;
		}
		return this;
	}
	group() {
		return this.radical.multiply(this.factor.pow(this.index)), this.factor.one(), this;
	}
	get index() {
		return this.#t;
	}
	set index(e) {
		if (!Number.isSafeInteger(e) || e <= 0) throw new i("Index must be a strictly positive integer.");
		this.#t = e;
	}
	get indexAsPow() {
		return new g(this.index).inverse();
	}
	inverse() {
		if (this.isZero()) throw new r("Cannot invert a zero root.");
		return this.factor.inverse(), this.radical.inverse(), this;
	}
	isEqual(e) {
		if (this.isZero() && e.isZero()) return !0;
		if (!this.#a() || !e.#a() || this.#o() !== e.#o()) return !1;
		let t = h.lcm(this.index, e.index), n = this.factor.clone().abs().pow(t).multiply(this.radical.clone().abs().pow(t / this.index)), r = e.factor.clone().abs().pow(t).multiply(e.radical.clone().abs().pow(t / e.index));
		return n.isEqual(r);
	}
	#a() {
		return !(this.radical.isNegative() && this.index % 2 == 0);
	}
	#o() {
		let e = this.index % 2 == 1 ? this.radical.sign() : 1;
		return this.factor.sign() * e;
	}
	isOne() {
		return this.factor.isOne() && this.radical.isOne();
	}
	isRational() {
		let e = this.clone().reduce();
		return e.radical.isOne() ? e.factor.exact : e.index === 1 && e.factor.exact && e.radical.exact;
	}
	isZero() {
		return this.factor.isZero() || this.radical.isZero();
	}
	multiply(t) {
		let n = this.clone(), i = new e(t);
		if (n.index !== i.index && !n.radical.isEqual(i.radical)) throw new r("Multiply can only be done if radical or index as equals.");
		if (n.factor.multiply(i.factor), n.index === i.index) n.radical.multiply(i.radical);
		else {
			let e = n.indexAsPow.add(i.indexAsPow).reduce();
			n.index = e.denominator, n.radical = n.radical.pow(e.numerator);
		}
		return this.parse(n);
	}
	one() {
		return this.radical.one(), this.factor.one(), this;
	}
	opposite() {
		return this.factor.opposite(), this;
	}
	pow(e) {
		let t = this.clone();
		t.factor.pow(e);
		let n = h.gcd(t.index, e);
		return t.index /= n, t.radical.pow(e / n), this.parse(t);
	}
	get radical() {
		return this.#n;
	}
	set radical(e) {
		if (e.isNaN()) throw new i("The radical cannot be an invalid (NaN) fraction.");
		this.#n = e;
	}
	reduce() {
		if (this.radical.hasFractionalPart()) {
			let e = this.radical.numerator, t = this.radical.denominator;
			this.radical = new g(e * t ** (this.index - 1)), this.factor.divide(t);
		}
		let e = h.greatestPower(this.radical.value, this.index);
		return this.factor.multiply(h.nthRoot(e, this.index)), this.radical.divide(e), this;
	}
	root(e) {
		if (!Number.isSafeInteger(e) || e <= 0) throw new i("The root degree must be a strictly positive integer.");
		let t = this.clone();
		return t.group(), t.index *= e, this.parse(t);
	}
	sqrt() {
		return this.root(2);
	}
	subtract(e) {
		return this.#s(e, !0);
	}
	#s(t, n) {
		let i = this.clone().reduce(), a = new e(t).reduce();
		if (i.index !== a.index || !i.radical.isEqual(a.radical)) throw new r("Roots must share the same index and radical to be added or subtracted");
		return n ? i.factor.subtract(a.factor) : i.factor.add(a.factor), this.parse(i);
	}
	get value() {
		let e = this.radical.value;
		return e < 0 ? this.index % 2 == 0 ? NaN : h.numberCorrection(this.factor.value * -((-e) ** (1 / this.index))) : h.numberCorrection(this.factor.value * e ** (1 / this.index));
	}
	get withSign() {
		return this.#r = !0, this;
	}
	get withoutSign() {
		return this.#r = !1, this;
	}
	zero() {
		return this.radical.zero(), this.factor.zero(), this;
	}
	#c(e, t, n) {
		let r = this.#t === 2 ? "sqrt" : `root(${this.#t})`;
		return this.#u(e, t, {
			radical: (e) => `${r}(${e})`,
			separator: "",
			wrap: n
		});
	}
	#l(e, t) {
		let n = this.#t === 2 ? "\\sqrt" : `\\sqrt[ ${this.#t} ]`;
		return this.#u(e, t, {
			radical: (e) => `${n}{ ${e} }`,
			separator: " "
		});
	}
	#u(e, t, n) {
		let r = [e === 1 || e === 0 ? null : e === -1 ? "-" : e.toString(), t !== 1 && t !== 0 ? n.radical(t) : null].filter((e) => e !== null);
		return r.length === 0 ? null : n.wrap && r.length === 2 ? `(${r.join(n.separator)})` : r.join(n.separator);
	}
	#d(e) {
		let n = /^\((.+)\)\/(\d+)$/.exec(e);
		if (n) return this.#d(n[1]), this.factor.divide(+n[2]), this;
		let r = /^([+-]?\d*(?:\/\d+)?)root\((\d+)\)(?:\((-?\d+(?:\/\d+)?)\)|(\d+))(?:\/(\d+))?$/.exec(e);
		if (!r) throw new t(`Invalid root format: "${e}"`);
		let i = r[1], a = r[2], o = r.at(3), s = r.at(4), c = r.at(5);
		this.index = +a, this.radical = new g(o ?? s ?? "");
		let l;
		if (i === "" || i === "+" || i === "-") l = new g(i === "-" ? -1 : 1);
		else if (/^[+-]?\d+(?:\/\d+)?$/.test(i)) l = new g(i);
		else throw new t(`Invalid root format: "${e}"`);
		return c !== void 0 && l.divide(+c), this.factor = l, this;
	}
	#f(e) {
		let n = /^\((.+)\)\/(\d+)$/.exec(e);
		if (n) return this.#f(n[1]), this.factor.divide(+n[2]), this;
		let r = /^([+-]?\d*(?:\/\d+)?)sqrt(?:\((-?\d+(?:\/\d+)?)\)|(\d+))(?:\/(\d+))?$/.exec(e);
		if (!r) throw new t(`Invalid sqrt format: "${e}"`);
		let i = r[1], a = r.at(2), o = r.at(3), s = r.at(4);
		this.index = 2, this.radical = new g(a ?? o ?? "");
		let c;
		if (i === "" || i === "+" || i === "-") c = new g(i === "-" ? -1 : 1);
		else if (/^[+-]?\d+(?:\/\d+)?$/.test(i)) c = new g(i);
		else throw new t(`Invalid sqrt format: "${e}"`);
		return s !== void 0 && c.divide(+s), this.factor = c, this;
	}
}, he = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = new.target.name;
	}
}, v = class extends he {}, y = class extends he {}, ge = class extends y {}, _e = {
	pi: Math.PI,
	e: Math.exp(1)
}, b = /* @__PURE__ */ function(e) {
	return e.VARIABLE = "variable", e.COEFFICIENT = "coefficient", e.OPERATION = "operation", e.CONSTANT = "constant", e.FUNCTION = "function", e.FUNCTION_ARGUMENT = "function-argument", e.MONOM = "monom", e.LEFT_PARENTHESIS = "(", e.RIGHT_PARENTHESIS = ")", e;
}({}), x = /* @__PURE__ */ function(e) {
	return e.EXPRESSION = "expression", e.POLYNOM = "polynom", e.SET = "set", e.NUMERIC = "numeric", e;
}({});
function ve(e, t) {
	if (e = e.replace(/\s+/g, ""), e.length <= 1) return e;
	let n = Object.keys(t).filter((e) => t[e].type === b.FUNCTION).map((e) => e);
	n.sort((e, t) => t.length - e.length);
	let r = RegExp(`^(${n.join("|")})\\(`), i = Object.keys(_e);
	i.sort((e, t) => t.length - e.length);
	let a = RegExp(`^(${i.join("|")})`), o = /^(\d+(\.\d+)?)/, s = "", c, l, u;
	for (n.forEach((t) => {
		if (e.includes(t)) {
			let n = RegExp(`${t}([0-9.]+)`, "g");
			e = e.replaceAll(n, `${t}($1)`);
		}
	}); e.length > 0;) {
		c = l, u = void 0;
		let t = n.find((t) => e.startsWith(t));
		if (t !== void 0 && e[t.length] !== "(") throw new v(`Function "${t}" must be followed by parentheses`);
		if (n.length > 0 && r.exec(e)) {
			let t = n.find((t) => e.startsWith(t));
			t && (u = t + "(", e = e.slice(t.length + 1), l = b.FUNCTION);
		} else if (i.length > 0 && a.exec(e)) {
			let t = i.find((t) => e.startsWith(t));
			t && (u = t, e = e.slice(t.length), l = b.CONSTANT);
		} else if (o.exec(e)) {
			let t = o.exec(e);
			t && (u = t[0], e = e.slice(t[0].length), l = b.COEFFICIENT);
		} else switch (u = e[0], e = e.slice(1), u) {
			case "(":
				l = b.LEFT_PARENTHESIS;
				break;
			case ")":
				l = b.RIGHT_PARENTHESIS;
				break;
			case ",":
				l = b.FUNCTION_ARGUMENT;
				break;
			case "+":
			case "-":
			case "*":
			case "/":
			case "^":
			case "%":
				l = b.OPERATION;
				break;
			default: l = b.VARIABLE;
		}
		if (u === void 0 || l === void 0) throw Error("The token is undefined");
		s += ye(c, l), s += u;
	}
	return s;
}
function ye(e, t) {
	return e === void 0 || e === b.OPERATION || t === b.OPERATION || e === b.LEFT_PARENTHESIS || e === b.FUNCTION || e === b.FUNCTION_ARGUMENT || t === b.RIGHT_PARENTHESIS || t === b.FUNCTION_ARGUMENT ? "" : "*";
}
var be = {
	"^": {
		precedence: 4,
		associative: "right",
		type: b.OPERATION
	},
	"*": {
		precedence: 3,
		associative: "left",
		type: b.OPERATION
	},
	"/": {
		precedence: 3,
		associative: "left",
		type: b.OPERATION
	},
	"+": {
		precedence: 2,
		associative: "left",
		type: b.OPERATION
	},
	"-": {
		precedence: 2,
		associative: "left",
		type: b.OPERATION
	},
	"%": {
		precedence: 3,
		associative: "left",
		type: b.OPERATION
	},
	"&": {
		precedence: 3,
		associative: "left",
		type: b.OPERATION
	},
	"|": {
		precedence: 3,
		associative: "left",
		type: b.OPERATION
	},
	"!": {
		precedence: 4,
		associative: "right",
		type: b.OPERATION
	},
	sin: {
		precedence: 4,
		associative: "right",
		type: b.FUNCTION,
		arity: 1
	},
	cos: {
		precedence: 4,
		associative: "right",
		type: b.FUNCTION,
		arity: 1
	},
	tan: {
		precedence: 4,
		associative: "right",
		type: b.FUNCTION,
		arity: 1
	},
	asin: {
		precedence: 4,
		associative: "right",
		type: b.FUNCTION,
		arity: 1
	},
	acos: {
		precedence: 4,
		associative: "right",
		type: b.FUNCTION,
		arity: 1
	},
	atan: {
		precedence: 4,
		associative: "right",
		type: b.FUNCTION,
		arity: 1
	},
	sqrt: {
		precedence: 4,
		associative: "right",
		type: b.FUNCTION,
		arity: 1
	},
	nthrt: {
		precedence: 4,
		associative: "right",
		type: b.FUNCTION,
		arity: 2
	},
	ln: {
		precedence: 4,
		associative: "right",
		type: b.FUNCTION,
		arity: 1
	},
	log: {
		precedence: 4,
		associative: "right",
		type: b.FUNCTION,
		arity: 1
	},
	logn: {
		precedence: 4,
		associative: "right",
		type: b.FUNCTION,
		arity: 2
	}
};
function xe(...e) {
	let t = {};
	for (let n of e) t[n] = be[n];
	return t;
}
var Se = {};
for (let [e, t] of Object.entries(be)) t.type === b.FUNCTION && (Se[e] = t.arity ?? 1);
var Ce = xe("^", "*", "/", "+", "-"), we = xe("^", "*", "/", "+", "-", "%", "sin", "cos", "tan", "asin", "acos", "atan", "sqrt", "nthrt", "ln", "log", "logn"), Te = we, Ee = xe("&", "|", "!", "-"), S = class {
	#e;
	#t = [];
	#n = {};
	#r = [];
	#i;
	constructor(e) {
		this.#e = e === void 0 ? x.POLYNOM : e, this.tokenConfigInitialization();
	}
	get rpn() {
		return this.#t;
	}
	get rpnToken() {
		return this.#t.map((e) => e.token);
	}
	tokenConfigInitialization() {
		return this.#e === x.SET ? (this.#n = Ee, this.#i = !1) : this.#e === x.NUMERIC ? (this.#n = we, this.#i = !0) : this.#e === x.EXPRESSION ? (this.#n = Te, this.#i = !0) : (this.#n = Ce, this.#i = !0), this.#r = Object.keys(this.#n).sort((e, t) => t.length - e.length), this.#n;
	}
	NextToken(e, t) {
		let n, r;
		if (n = "", r = void 0, e[t] === "(") n = "(", r = b.LEFT_PARENTHESIS;
		else if (e[t] === ")") n = ")", r = b.RIGHT_PARENTHESIS;
		else if (e[t] === ",") n = ",", r = b.FUNCTION_ARGUMENT;
		else {
			for (let i of this.#r) if (e.substring(t, t + i.length) === i) {
				n += i, r = this.#n[i].type;
				break;
			}
			for (let i in _e) if (e.substring(t, t + i.length) === i) {
				n += i, r = b.CONSTANT;
				break;
			}
			if (n === "") if (/[0-9.]/.exec(e[t])) {
				let i = /^([0-9.]+)/.exec(e.substring(t));
				n = i ? i[0] : "", r = b.COEFFICIENT;
			} else if (/[a-zA-Z]/.exec(e[t])) {
				let i = /^([a-zA-Z])/.exec(e.substring(t));
				n = i ? i[0] : "", r = b.VARIABLE;
			} else throw new v(`Unknown token "${e[t]}" at position ${t} in "${e}"`);
		}
		if (r === void 0) throw new v(`Token type is undefined for token ${n}`);
		return {
			token: n,
			nextPos: t + n.length,
			type: r
		};
	}
	parse(e, t) {
		let n = [], r = [], i = 0;
		for ((t ?? this.#i) && (e = ve(e, this.#n)); i < e.length;) {
			let t = i, { token: a, nextPos: o, type: s } = this.NextToken(e, i);
			if (i = o, i <= t) throw new v(`Parser stalled at position ${t} in "${e}"`);
			switch (s) {
				case b.COEFFICIENT:
				case b.VARIABLE:
				case b.CONSTANT:
					n.push({
						token: a,
						tokenType: s
					});
					break;
				case b.OPERATION:
					if (n.length === 0 && r.length === 0 && (a === "-" || a === "+") && n.push({
						token: "0",
						tokenType: b.COEFFICIENT
					}), r.length > 0) {
						let e = r[r.length - 1];
						for (; e.token in this.#n && (this.#n[a].associative === "left" && this.#n[a].precedence <= this.#n[e.token].precedence || this.#n[a].associative === "right" && this.#n[a].precedence < this.#n[e.token].precedence) && (n.push(r.pop() ?? {
							token: "",
							tokenType: b.OPERATION
						}), r.length !== 0);) e = r[r.length - 1];
					}
					r.push({
						token: a,
						tokenType: s
					});
					break;
				case b.FUNCTION_ARGUMENT:
					for (; r.length > 0 && r[r.length - 1].token !== "(";) n.push(r.pop() ?? {
						token: a,
						tokenType: s
					});
					if (r.length === 0) throw new v(`Misplaced argument separator ',' in "${e}"`);
					break;
				case b.LEFT_PARENTHESIS:
					r.push({
						token: a,
						tokenType: s
					}), e[i] === "-" && n.push({
						token: "0",
						tokenType: b.COEFFICIENT
					});
					break;
				case b.RIGHT_PARENTHESIS:
					for (; r.length > 0 && r[r.length - 1].token !== "(";) n.push(r.pop() ?? {
						token: a,
						tokenType: s
					});
					if (r.length === 0) throw new v(`Mismatched parentheses (unexpected ')') in "${e}"`);
					r.pop();
					break;
				case b.FUNCTION:
					r.push({
						token: a,
						tokenType: s
					});
					break;
				default: throw new v(`Token type ${a} is not handled`);
			}
		}
		if (r.some((e) => e.token === "(")) throw new v(`Mismatched parentheses (unclosed '(') in "${e}"`);
		return this.#t = n.concat(r.reverse()), this;
	}
}, De = class {
	_rpn;
	_expression;
	constructor(e, t) {
		this._expression = e;
		try {
			this._rpn = new S(x.NUMERIC).parse(e, t).rpn;
		} catch (t) {
			throw new v(`There was a problem parsing: ${e}`, { cause: t });
		}
	}
	get rpn() {
		return this._rpn;
	}
	get expression() {
		return this._expression;
	}
	get variables() {
		let e = /* @__PURE__ */ new Set();
		for (let t of this._rpn) t.tokenType === b.VARIABLE && e.add(t.token);
		return [...e];
	}
	isValid(e) {
		return this._isStructurallyValid() ? this.variables.every((t) => e !== void 0 && Object.hasOwn(e, t)) : !1;
	}
	_isStructurallyValid() {
		let e = 0;
		for (let t of this._rpn) switch (t.tokenType) {
			case b.COEFFICIENT:
			case b.VARIABLE:
			case b.CONSTANT:
				e += 1;
				break;
			case b.OPERATION:
				if (e < 2) return !1;
				--e;
				break;
			case b.FUNCTION: {
				let n = Se[t.token] ?? 1;
				if (e < n) return !1;
				e += 1 - n;
				break;
			}
			default: return !1;
		}
		return e === 1;
	}
	evaluate(e) {
		let t = [];
		for (let n of this._rpn) if (n.tokenType === b.COEFFICIENT) t.push(+n.token);
		else if (n.tokenType === b.VARIABLE) {
			if (e === void 0 || !Object.hasOwn(e, n.token)) throw new ge(`Missing value for variable "${n.token}"`);
			t.push(e[n.token]);
		} else if (n.tokenType === b.CONSTANT) t.push(_e[n.token]);
		else if (n.tokenType === b.OPERATION) {
			if (n.token === "*") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new y(`The multiplication factors ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n * e);
			} else if (n.token === "/") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new y(`The division values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n / e);
			} else if (n.token === "+") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new y(`The addition values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n + e);
			} else if (n.token === "-") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new y(`The subtraction values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n - e);
			} else if (n.token === "%") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new y(`The modulo values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n % e);
			} else if (n.token === "^") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new y(`The base value ${n ?? "a"} or exponent ${e ?? "b"} are not defined`);
				t.push(n ** +e);
			}
		} else if (n.tokenType === b.FUNCTION) {
			let e = t.pop();
			if (e === void 0) throw new y(`The parameters for ${n.token} is not defined`);
			if (n.token === "sin") t.push(Math.sin(e));
			else if (n.token === "cos") t.push(Math.cos(e));
			else if (n.token === "tan") t.push(Math.tan(e));
			else if (n.token === "asin") t.push(Math.asin(e));
			else if (n.token === "acos") t.push(Math.acos(e));
			else if (n.token === "atan") t.push(Math.atan(e));
			else if (n.token === "sqrt") t.push(Math.sqrt(e));
			else if (n.token === "nthrt") {
				let n = t.pop();
				if (n === void 0) throw new y("The nthrt function requires two parameters");
				e % 2 == 0 && n < 0 ? t.push(NaN) : t.push((n < 0 ? -1 : 1) * Math.abs(n) ** (1 / e));
			} else if (n.token === "ln") t.push(Math.log(e));
			else if (n.token === "log") t.push(Math.log10(e));
			else if (n.token === "logn") {
				let n = t.pop();
				if (n === void 0) throw new y("The logn function requires two parameters");
				e <= 0 || e === 1 || n <= 0 ? t.push(NaN) : t.push(Math.log(n) / Math.log(e));
			}
		}
		if (t.length === 1) return this._numberCorrection(t[0]);
		throw new y(`There was a problem parsing: ${this._expression}`);
	}
	_numberCorrection(e, t = 8) {
		return +e.toFixed(t);
	}
};
//#endregion
//#region src/algebra/polynomRoots.ts
function Oe(e) {
	return e.fraction.value + e.root.value;
}
function C(e, t = 1) {
	return {
		fraction: e.clone(),
		root: new _(),
		exact: !0,
		multiplicity: t
	};
}
function ke(e, t = 1) {
	let n = new g(e);
	return n.exact = !1, {
		fraction: n,
		root: new _(),
		exact: !1,
		multiplicity: t
	};
}
function w(e) {
	return e.sort((e, t) => Oe(e) - Oe(t));
}
function T(e) {
	let t = e.length;
	for (; t > 0 && e[t - 1].isZero();) t--;
	return e.slice(0, t);
}
function Ae(e, t, n) {
	if (e.length !== t + 1 || e[t].isZero()) throw new r(`${n} requires a degree-${t} coefficient vector with a non-zero leading coefficient`);
}
function je(e) {
	Ae(e, 1, "solveLinear");
	let t = e[0], n = e[1];
	return [C(t.clone().opposite().divide(n))];
}
function E(e) {
	Ae(e, 2, "solveQuadratic");
	let t = e[0], n = e[1], r = e[2], i = n.clone().pow(2).subtract(r.clone().multiply(t).multiply(4));
	if (i.isNegative()) return [];
	let a = r.clone().multiply(2);
	if (i.isSquare()) {
		let e = i.sqrt(), t = n.clone().opposite().subtract(e).divide(a.clone()), r = n.clone().opposite().add(e).divide(a.clone());
		return i.isZero() ? [C(t, 2)] : w([C(t), C(r)]);
	}
	let o = new _();
	o.radical = i.clone(), o.factor = new g(1).divide(a.clone());
	let s = new _();
	return s.radical = i.clone(), s.factor = new g(1).divide(a.clone()).opposite(), w([{
		fraction: n.clone().opposite().divide(a.clone()).reduce(),
		root: o.reduce(),
		exact: !0,
		multiplicity: 1
	}, {
		fraction: n.clone().opposite().divide(a.clone()).reduce(),
		root: s.reduce(),
		exact: !0,
		multiplicity: 1
	}]);
}
function Me(e) {
	Ae(e, 3, "solveCubicCardan");
	let t = e[3].value, n = e[2].value, r = e[1].value, i = e[0].value, a = (3 * t * r - n * n) / (3 * t * t), o = (2 * n * n * n - 9 * t * n * r + 27 * t * t * i) / (27 * t * t * t), s = n / (3 * t), c = 1e-9, l = [];
	if (Math.abs(a) < c) l.push(Math.cbrt(-o) - s);
	else {
		let e = o * o / 4 + a * a * a / 27;
		if (e > c) {
			let t = Math.sqrt(e), n = Math.cbrt(-o / 2 + t), r = Math.cbrt(-o / 2 - t);
			l.push(n + r - s);
		} else {
			let e = 2 * Math.sqrt(-a / 3), t = Math.max(-1, Math.min(1, 3 * o / (a * e))), n = Math.acos(t);
			for (let t = 0; t < 3; t++) l.push(e * Math.cos(n / 3 - 2 * Math.PI * t / 3) - s);
		}
	}
	let u = [];
	for (let e of l.map((e) => h.numberCorrection(e, 6))) u.some((t) => Math.abs(t - e) < 1e-6) || u.push(e);
	return w(u.map((e) => ke(e)));
}
function Ne(e, t) {
	let n = new g(0);
	for (let r = e.length - 1; r >= 0; r--) n.multiply(t).add(e[r]);
	return n;
}
function D(e, t) {
	let n = 0;
	for (let r = e.length - 1; r >= 0; r--) n = n * t + e[r].value;
	return n;
}
function Pe(e, t) {
	let n = e.length - 1, r = Array(n);
	r[n - 1] = e[n].clone();
	for (let i = n - 1; i >= 1; i--) r[i - 1] = e[i].clone().add(t.clone().multiply(r[i]));
	return r;
}
function Fe(e) {
	let t = e.length - 1, n = e[t].value, r = 0;
	for (let i = 0; i < t; i++) {
		let t = Math.abs(e[i].value / n);
		t > r && (r = t);
	}
	return 1 + r;
}
function Ie(e) {
	let t = h.lcm(...e.map((e) => e.denominator)), n = e.map((e) => e.clone().multiply(t).value), r = n.filter((e) => e !== 0).map((e) => Math.abs(e)), i = r.length > 0 ? h.gcd(...r) : 1, a = n.map((e) => e / i), o = Math.abs(a[0]), s = Math.abs(a[a.length - 1]), c = h.dividers(o), l = h.dividers(s), u = /* @__PURE__ */ new Set(), d = [];
	for (let e of c) for (let t of l) for (let n of [1, -1]) {
		let r = new g(n * e, t), i = `${r.numerator}/${r.denominator}`;
		u.has(i) || (u.add(i), d.push(r));
	}
	return d;
}
function Le(e) {
	let t = [], n = 0;
	for (; n < e.length - 1 && e[n].isZero();) n++;
	let r = n > 0 ? e.slice(n) : e.slice();
	n > 0 && t.push(C(new g(0), n));
	let i = Ie(r);
	for (let e of i) {
		if (r.length - 1 < 1) break;
		if (Math.abs(D(r, e.value)) > 1e-9 || !Ne(r, e).isZero()) continue;
		let n = 0;
		for (; r.length - 1 >= 1 && Ne(r, e).isZero();) r = Pe(r, e), n++;
		t.push(C(e.clone(), n));
	}
	return {
		solutions: t,
		residual: r
	};
}
function Re(e, t, n, r) {
	let i = D(e, t);
	if (i * D(e, n) > 0) return null;
	for (; (n - t) / 2 > r;) {
		let r = (t + n) / 2, a = D(e, r);
		if (a === 0) return r;
		i * a < 0 ? n = r : (t = r, i = a);
	}
	return (t + n) / 2;
}
function ze(e) {
	return e.every((e) => Number.isSafeInteger(e.numerator) && Number.isSafeInteger(e.denominator));
}
function Be(e) {
	return e.slice(1).map((e, t) => e.clone().multiply(t + 1));
}
function O(e, t) {
	let n = T(t), r = T(e).map((e) => e.clone()), i = Array(Math.max(r.length - n.length + 1, 0)).fill(new g(0)), a = n[n.length - 1];
	for (; r.length >= n.length;) {
		let e = r.length - n.length, t = r[r.length - 1].clone().divide(a);
		i[e] = t.clone();
		for (let i = 0; i < n.length; i++) r[e + i] = r[e + i].clone().subtract(t.clone().multiply(n[i]));
		if (r[r.length - 1] = new g(0), r = T(r), !ze(r) || !ze(i)) return null;
	}
	return {
		quotient: i,
		remainder: r
	};
}
function Ve(e, t) {
	let n = T(e), r = T(t);
	for (; r.length > 0;) {
		let e = O(n, r);
		if (e === null) return null;
		n = r, r = e.remainder;
	}
	let i = n[n.length - 1];
	return n.map((e) => e.clone().divide(i));
}
function He(e) {
	let t = Be(e), n = Ve(e, t);
	if (n === null) return null;
	let r = O(e, n), i = O(t, n);
	if (r === null || i === null) return null;
	let a = r.quotient, o = i.quotient, s = [];
	for (let e = 1; T(a).length > 1; e++) {
		let t = Be(a), n = Math.max(o.length, t.length), r = Array.from({ length: n }, (e, n) => (o[n] ?? new g(0)).clone().subtract(t[n] ?? new g(0))), i = Ve(a, r), c = i === null ? null : O(a, i), l = i === null ? null : O(r, i);
		if (i === null || c === null || l === null) return null;
		i.length > 1 && s.push({
			factor: i,
			power: e
		}), a = c.quotient, o = l.quotient;
	}
	return s;
}
function Ue(e, t) {
	let n = He(e);
	return n === null || n.length === 1 && n[0].power === 1 ? We(e, t) : n.flatMap(({ factor: e, power: n }) => {
		let r = e.length - 1;
		return (r === 1 ? je(e) : r === 2 ? E(e) : r === 3 ? Me(e) : We(e, t)).map((e) => ({
			...e,
			multiplicity: e.multiplicity * n
		}));
	});
}
function We(e, t) {
	let n = e.length - 1, r = Fe(e), i = 2 * r / 100, a = [], o = -r, s = D(e, o);
	for (let c = 1; c <= 100; c++) {
		let l = h.numberCorrection(-r + c * i), u = D(e, l);
		if (u === 0) a.push(ke(l));
		else if (s * u < 0) {
			let n = Re(e, o, l, t);
			n !== null && a.push(ke(n));
		}
		if (a.length === n) break;
		o = l, s = u;
	}
	return a;
}
function Ge(e, t) {
	let n = t?.bisectionDeltaX ?? 1e-4;
	if (n <= 0) throw new i("bisectionDeltaX must be > 0");
	let r = T(e), a = r.length - 1;
	if (a <= 0) return [];
	if (a === 1) return je(r);
	if (a === 2) return E(r);
	let { solutions: o, residual: s } = Le(r), c = s.length - 1;
	return w(c <= 0 ? o : c === 1 ? o.concat(je(s)) : c === 2 ? o.concat(E(s)) : c === 3 ? o.concat(Me(s)) : o.concat(Ue(s, n)));
}
//#endregion
//#region src/analyze/solution.ts
var k = class e {
	#e;
	#t = null;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	constructor(e) {
		this.#s = "x", this.#r = !1, this.#n = null, this.#o = null, this.#i = new g(0), this.#a = new _(), this.#e = 1, e !== void 0 && this.parse(e);
	}
	withDigits(e) {
		return this.#t = l(e), this;
	}
	get tex() {
		return this.#t === null ? this.#o ? this.#o : this.#c(this.#i.tex, this.#a.tex, (e, t) => `${e} ${t.withSign.tex}`, (e, t) => `\\frac{ ${e} }{ ${t} }`) : this.value.toFixed(this.#t);
	}
	set tex(e) {
		this.#o = e;
	}
	get display() {
		return this.#t === null ? this.#n ? this.#n : this.#c(this.#i.display, this.#a.display, (e, t) => `${e}${t.withSign.display}`, (e, t) => `(${e})/${t}`) : this.value.toFixed(this.#t);
	}
	set display(e) {
		this.#n = e;
	}
	#c(e, t, n, r) {
		if (this.#a.isZero()) return e;
		if (this.#i.isZero()) return t;
		let [i] = g.toSameDenominateur(this.#i, this.#a.factor), a = this.#a.clone().multiply(i.denominator).reduce(), o = n(i.numerator, a);
		return i.denominator === 1 ? o : r(o, i.denominator);
	}
	static fromFraction(t) {
		let n = new e();
		n.setExact();
		let r = new g(t);
		return n.display = r.display, n.tex = r.tex, n.#i = r, n.#a = new _(), n;
	}
	static fromRoot(t) {
		let n = new e();
		return n.#a = new _(t), n.#r = !0, n;
	}
	static fromPolynomRoot(t) {
		let n = new e();
		return n.#i = t.fraction.clone(), n.#a = t.root.clone(), n.#r = t.exact, n.#e = t.multiplicity, n;
	}
	static fromQuadratic(t, n, r) {
		let [i, a, o] = [
			t,
			n,
			r
		].map((e) => new g(e));
		return E([
			o,
			a,
			i
		]).map((t) => e.fromPolynomRoot(t));
	}
	static fromString(n) {
		let r = n.trim(), i = /^\(([+-]?\d+)([+-])(\d*)sqrt\((\d+)\)\)\/(\d+)$/.exec(r);
		if (i) {
			let [, t, n, r, a, o] = i, s = +o, c = new e();
			c.#i = new g(+t, s);
			let l = r === "" ? 1 : +r, u = new g(n === "-" ? -l : l, s), d = new _();
			return d.index = 2, d.radical = new g(+a), d.factor = u, c.#a = d, c.#r = !0, c;
		}
		if (r.includes("sqrt") || r.includes("root")) {
			let t = new e();
			return t.#i = new g(0), t.#a = _.fromString(r), t.#r = !0, t;
		}
		let a = g.fromString(r);
		if (a.isNaN()) throw new t(`Cannot parse "${n}" as a Solution`);
		return e.fromFraction(a);
	}
	parse(t) {
		return t instanceof e ? this.copy(t) : typeof t == "string" ? this.copy(e.fromString(t)) : t instanceof g ? this.copy(e.fromFraction(t)) : t instanceof _ ? this.copy(e.fromRoot(t)) : this.copy(e.fromPolynomRoot(t));
	}
	copy(e) {
		return this.#i = e.#i.clone(), this.#a = e.#a.clone(), this.#r = e.#r, this.#e = e.#e, this.#s = e.#s, this.#n = null, this.#o = null, this;
	}
	clone() {
		let t = new e();
		return t.#i = this.#i.clone(), t.#a = this.#a.clone(), t.#r = this.#r, t.#e = this.#e, t.#s = this.#s, t.#n = this.#n, t.#o = this.#o, t.#t = this.#t, t;
	}
	get count() {
		return this.#e;
	}
	get exact() {
		return this.#r;
	}
	get fraction() {
		return this.#i;
	}
	isZero() {
		return this.#i.isZero() && this.#a.isZero();
	}
	reduce() {
		return this.#a.reduce(), this.#i.reduce(), this;
	}
	get root() {
		return this.#a;
	}
	setExact(e = !0) {
		return this.#r = e, this;
	}
	get value() {
		return this.fraction.value + this.root.value;
	}
	get variable() {
		return this.#s;
	}
	set variable(e) {
		if (e !== void 0) {
			if (!/^[a-z]$/.test(e)) throw new i(`variable expects a single lowercase letter, got "${e}"`);
			this.#s = e;
		}
	}
};
//#endregion
//#region src/analyze/interval.ts
function Ke(e, t) {
	return e.numerator * t.denominator === t.numerator * e.denominator;
}
function qe(e, t) {
	if (!Ke(e.fraction, t.fraction)) return !1;
	let n = e.root, r = t.root;
	return n.isZero() && r.isZero() ? !0 : n.isZero() === r.isZero() && n.index === r.index && Ke(n.factor, r.factor) && Ke(n.radical, r.radical);
}
function Je(e, t) {
	if (e.exact && t.exact && qe(e, t)) return 0;
	let n = e.value - t.value;
	return n === 0 ? 0 : n > 0 ? 1 : -1;
}
function Ye(e, t) {
	return e === null && t === null ? 0 : e === null ? -1 : t === null ? 1 : Je(e, t);
}
function Xe(e, t) {
	return e === null && t === null ? 0 : e === null ? 1 : t === null ? -1 : Je(e, t);
}
var A = class e {
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor(e) {
		this.#e = null, this.#t = null, this.#n = !0, this.#r = !0, this.#i = !1, e !== void 0 && this.parse(e);
	}
	static fromBounds(t, n, r, i) {
		let a = new e();
		return a.#e = t?.clone() ?? null, a.#t = n?.clone() ?? null, a.#n = t === null || r, a.#r = n === null || i, a;
	}
	static empty() {
		let t = new e();
		return t.#i = !0, t;
	}
	static real() {
		return e.fromBounds(null, null, !0, !0);
	}
	static point(t) {
		return e.fromBounds(t, t, !1, !1);
	}
	static fromString(n) {
		let r = n.trim();
		if (r === "O/") return e.empty();
		if (r === "RR") return e.real();
		let i = k.fromString("0");
		if (r === "RR_+") return e.fromBounds(i, null, !1, !0);
		if (r === "RR_+**") return e.fromBounds(i, null, !0, !0);
		if (r === "RR_-") return e.fromBounds(null, i, !0, !1);
		if (r === "RR_-**") return e.fromBounds(null, i, !0, !0);
		if (r.startsWith("{") && r.endsWith("}") && !r.includes(";")) return e.point(k.fromString(r.slice(1, -1)));
		let a = r[0], o = r[r.length - 1];
		if ((a === "[" || a === "]") && (o === "[" || o === "]")) {
			let i = r.indexOf(";");
			if (i === -1) throw new t(`Missing ';' in interval: "${n}"`);
			let s = r.slice(1, i).trim(), c = r.slice(i + 1, -1).trim(), l = s === "-oo" ? null : k.fromString(s), u = c === "+oo" ? null : k.fromString(c);
			return e.fromBounds(l, u, a === "]", o === "[");
		}
		throw new t(`Cannot parse "${n}" as an Interval`);
	}
	parse(n) {
		if (n instanceof e) return this.copy(n);
		if (typeof n == "string") return this.copy(e.fromString(n));
		throw new t(`Cannot parse ${typeof n} as Interval`);
	}
	get tex() {
		return this.#a("tex");
	}
	get display() {
		return this.#a("display");
	}
	#a(e) {
		if (this.#i) return e === "tex" ? "\\emptyset" : "O/";
		let t = this.#e;
		if (t !== null && this.isPoint()) {
			let n = e === "tex" ? t.tex : t.display;
			return e === "tex" ? `\\left\\{${n}\\right\\}` : `{${n}}`;
		}
		let n = e === "tex" ? "-\\infty" : "-oo", r = e === "tex" ? "+\\infty" : "+oo", i = this.#e === null ? n : e === "tex" ? this.#e.tex : this.#e.display, a = this.#t === null ? r : e === "tex" ? this.#t.tex : this.#t.display;
		return `${this.#n ? "]" : "["}${i};${a}${this.#r ? "[" : "]"}`;
	}
	clone() {
		let t = new e();
		return t.#e = this.#e?.clone() ?? null, t.#t = this.#t?.clone() ?? null, t.#n = this.#n, t.#r = this.#r, t.#i = this.#i, t;
	}
	copy(e) {
		return this.#e = e.#e?.clone() ?? null, this.#t = e.#t?.clone() ?? null, this.#n = e.#n, this.#r = e.#r, this.#i = e.#i, this;
	}
	isEmpty() {
		if (this.#i) return !0;
		if (this.#e === null || this.#t === null) return !1;
		let e = Je(this.#e, this.#t);
		return e > 0 || e === 0 && (this.#n || this.#r);
	}
	isPoint() {
		return this.#i || this.#e === null || this.#t === null ? !1 : !this.#n && !this.#r && Je(this.#e, this.#t) === 0;
	}
	isReal() {
		return !this.#i && this.#e === null && this.#t === null;
	}
	contains(e) {
		if (this.isEmpty()) return !1;
		let t = typeof e == "number" ? e : e.value;
		if (Number.isNaN(t)) return !1;
		if (this.#e !== null) {
			let e = this.#e.value;
			if (this.#n ? t <= e : t < e) return !1;
		}
		if (this.#t !== null) {
			let e = this.#t.value;
			if (this.#r ? t >= e : t > e) return !1;
		}
		return !0;
	}
	intersect(t) {
		if (this.isEmpty() || t.isEmpty()) return e.empty();
		let n = Ye(this.#e, t.#e), r = n >= 0 ? this.#e : t.#e, i = n > 0 ? this.#n : n < 0 ? t.#n : this.#n || t.#n, a = Xe(this.#t, t.#t), o = a <= 0 ? this.#t : t.#t, s = a < 0 ? this.#r : a > 0 ? t.#r : this.#r || t.#r, c = e.fromBounds(r, o, i, s);
		return c.isEmpty() ? e.empty() : c;
	}
	get left() {
		return this.#e;
	}
	get right() {
		return this.#t;
	}
	get leftOpen() {
		return this.#n;
	}
	get rightOpen() {
		return this.#r;
	}
};
//#endregion
//#region src/analyze/domain.ts
function Ze(e) {
	let t = e.filter((e) => !e.isEmpty());
	if (t.length === 0) return [];
	t.sort((e, t) => {
		let n = Ye(e.left, t.left);
		return n === 0 ? e.leftOpen === t.leftOpen ? 0 : e.leftOpen ? 1 : -1 : n;
	});
	let n = [t[0].clone()];
	for (let e = 1; e < t.length; e++) {
		let r = n[n.length - 1], i = t[e], a = i.left === null ? 1 : Xe(r.right, i.left), o = a === 0 && (!r.rightOpen || !i.leftOpen);
		if (a > 0 || o) {
			let e = Xe(r.right, i.right), t = e >= 0 ? r.right : i.right, a = e > 0 ? r.rightOpen : (e < 0 || r.rightOpen) && i.rightOpen;
			n[n.length - 1] = A.fromBounds(r.left, t, r.leftOpen, a);
		} else n.push(i.clone());
	}
	return n;
}
var Qe = class e {
	#e;
	constructor(e) {
		this.#e = [], e !== void 0 && this.parse(e);
	}
	static fromIntervals(t) {
		let n = new e();
		return n.#e = Ze(t), n;
	}
	static fromInterval(t) {
		return e.fromIntervals([t]);
	}
	static empty() {
		return new e();
	}
	static real() {
		return e.fromIntervals([A.real()]);
	}
	static fromString(t) {
		let n = t.trim();
		if (n === "O/") return e.empty();
		if (n === "RR") return e.real();
		if (n === "RR^**") {
			let t = k.fromString("0");
			return e.fromIntervals([A.fromBounds(null, t, !0, !0), A.fromBounds(t, null, !0, !0)]);
		}
		if (n.startsWith("RR\\{") && n.endsWith("}")) {
			let t = n.slice(4, -1).split(";").map((e) => A.point(k.fromString(e.trim())));
			return e.fromIntervals(t).complement();
		}
		if (n.startsWith("{") && n.endsWith("}") && n.includes(";")) {
			let t = n.slice(1, -1).split(";").map((e) => A.point(k.fromString(e.trim())));
			return e.fromIntervals(t);
		}
		if (n.includes("uu")) {
			let t = n.split("uu").flatMap((t) => e.fromString(t.trim()).intervals);
			return e.fromIntervals(t);
		}
		return e.fromInterval(A.fromString(n));
	}
	parse(n) {
		if (n instanceof e) return this.copy(n);
		if (n instanceof A) return this.copy(e.fromInterval(n));
		if (typeof n == "string") return this.copy(e.fromString(n));
		throw new t(`Cannot parse ${typeof n} as Domain`);
	}
	get tex() {
		return this.#t("tex");
	}
	get display() {
		return this.#t("display");
	}
	#t(e) {
		if (this.isEmpty()) return e === "tex" ? "\\emptyset" : "O/";
		if (this.#e.length === 1 && this.#e[0].isReal()) return e === "tex" ? "\\mathbb{R}" : "RR";
		let t = this.#n();
		if (t !== null) {
			let n = t.map((t) => e === "tex" ? t.tex : t.display).join(";");
			return e === "tex" ? `\\mathbb{R} \\setminus \\left\\{${n}\\right\\}` : `RR\\{${n}}`;
		}
		let n = this.#r();
		if (n !== null) {
			let { side: t, strict: r } = n;
			return e === "tex" ? r ? `\\mathbb{R}_${t}^*` : `\\mathbb{R}_${t}` : r ? `RR_${t}**` : `RR_${t}`;
		}
		let r = e === "tex" ? " \\cup " : "uu";
		return this.#e.map((t) => e === "tex" ? t.tex : t.display).join(r);
	}
	#n() {
		let e = this.#e;
		if (e[0].left !== null || e[e.length - 1].right !== null) return null;
		let t = [];
		for (let n = 0; n < e.length - 1; n++) {
			let r = e[n], i = e[n + 1];
			if (!r.rightOpen || !i.leftOpen || r.right === null || i.left === null || Ye(r.right, i.left) !== 0) return null;
			t.push(r.right);
		}
		return t;
	}
	#r() {
		if (this.#e.length !== 1) return null;
		let e = this.#e[0];
		return e.left === null && e.right !== null && e.right.value === 0 ? {
			side: "-",
			strict: e.rightOpen
		} : e.right === null && e.left !== null && e.left.value === 0 ? {
			side: "+",
			strict: e.leftOpen
		} : null;
	}
	clone() {
		let t = new e();
		return t.#e = this.#e.map((e) => e.clone()), t;
	}
	copy(e) {
		return this.#e = e.#e.map((e) => e.clone()), this;
	}
	isEmpty() {
		return this.#e.length === 0;
	}
	contains(e) {
		return this.#e.some((t) => t.contains(e));
	}
	intersect(t) {
		let n = [];
		for (let e of this.#e) for (let r of t.#e) {
			let t = e.intersect(r);
			t.isEmpty() || n.push(t);
		}
		return e.fromIntervals(n);
	}
	union(t) {
		return e.fromIntervals([...this.#e, ...t.#e]);
	}
	complement() {
		if (this.isEmpty()) return e.real();
		let t = this.#e, n = [], r = t[0];
		r.left !== null && n.push(A.fromBounds(null, r.left, !0, !r.leftOpen));
		for (let e = 0; e < t.length - 1; e++) {
			let r = t[e], i = t[e + 1];
			n.push(A.fromBounds(r.right, i.left, !r.rightOpen, !i.leftOpen));
		}
		let i = t[t.length - 1];
		return i.right !== null && n.push(A.fromBounds(i.right, null, !i.rightOpen, !0)), e.fromIntervals(n);
	}
	get intervals() {
		return this.#e.map((e) => e.clone());
	}
	get length() {
		return this.#e.length;
	}
}, $e = class e {
	#e;
	#t;
	#n;
	#r = !1;
	#i = "f(x)";
	#a = 2;
	#o = 1.2;
	constructor(e) {
		this.#e = [], this.#t = [""], this.#n = [], e !== void 0 && this.parse(e);
	}
	parse(t) {
		return t instanceof ft ? this.copy(e.fromPolyFactor(t)) : t instanceof L ? this.copy(e.fromFactor(t)) : t instanceof M ? this.copy(e.fromPolynom(t)) : this.copy(e.fromFactor(new L(t)));
	}
	static fromPolynom(t) {
		let n = new e(), r = e.#s(t);
		return n.#e = r.roots, n.#t = r.signs, n;
	}
	static fromFactor(t) {
		let n = new e(), r = e.#c(t);
		return n.#e = r.roots, n.#t = r.signs, n;
	}
	static fromPolyFactor(t) {
		let n = new e(), r = e.#l(t);
		return n.#e = r.roots, n.#t = r.signs, n.#n = r.factorRows, n;
	}
	static #s(e) {
		let t = e.roots, n = Array(2 * t.length + 1).fill("").map((e, t) => t % 2 == 0 ? "" : "z");
		if (n.length === 1) {
			let [t] = e.getCoefficients().map((e) => e.value);
			n = f(n, "", t > 0 ? "+" : t < 0 ? "-" : "z");
		} else {
			let r = e.variables[0] ?? "x";
			[t[0].value - 1, ...t.map((e, n) => n === t.length - 1 ? t[n].value + 1 : (t[n].value + t[n + 1].value) / 2)].forEach((t, i) => {
				let a = e.evaluate({ [r]: t }, !0);
				n[i * 2] = a > 0 ? "+" : "-";
			});
		}
		return {
			roots: t,
			signs: n
		};
	}
	static #c(t) {
		let n = t.power.reduce(), r = e.#s(t.polynom);
		return n.isStrictlyNegative() && (r.signs = f(r.signs, "z", "d")), n.denominator % 2 == 0 ? r.signs = f(r.signs, "-", "h") : n.numerator % 2 == 0 && (r.signs = f(r.signs, "-", "+")), {
			roots: r.roots,
			signs: r.signs
		};
	}
	static #l(t) {
		let n = t.roots, r = n.map((e) => e.value), i = t.factorize().factors.map((t) => {
			let n = e.#c(t);
			return {
				factor: new L(t),
				roots: n.roots,
				signs: n.signs
			};
		});
		return i.forEach((e) => {
			let t = Array(2 * n.length + 1).fill(""), i = e.signs.shift(), a = e.roots.shift(), o = t.map((t, n) => {
				if (n % 2 == 0) return i ?? "";
				if (a?.value !== r[(n - 1) / 2]) return "t";
				let o = e.signs.shift();
				return i = e.signs.shift(), a = e.roots.shift(), o;
			});
			e.roots = n, e.signs = o;
		}), {
			roots: n,
			signs: i.map((e) => [...e.signs]).reduce((e, t) => e.length === 0 ? t : (t.forEach((t, n) => {
				switch (t) {
					case "d":
						e[n] = "d";
						break;
					case "z":
						e[n] = e[n] === "d" ? "d" : "z";
						break;
					case "h":
						e[n] = "h";
						break;
					case "-": e[n] = e[n] === "h" ? "h" : e[n] === "-" ? "+" : "-";
				}
			}), e), []),
			factorRows: i
		};
	}
	static #u(e) {
		let t = e.power.clone().reduce();
		if (t.isStrictlyNegative() && t.opposite(), t.isOne()) return e.polynom.tex;
		let n = e.clone();
		return n.power = t, n.tex;
	}
	get tex() {
		let t = [
			"\\footnotesize \\(-\\infty\\)",
			...this.#e.map((e) => `\\(${e.tex}\\)`),
			"\\footnotesize \\(+\\infty\\)"
		].join(", "), n = this.#r && this.#n.length > 0, r = [
			"/1",
			...n ? this.#n.map((t) => `\\(${e.#u(t.factor)}\\)/1`) : [],
			"/.1",
			`\\(${this.#i}\\)/1`
		], i = [
			...n ? this.#n.map((e) => `\\tkzTabLine{,${e.signs.join(",")}}`) : [],
			"\\tkzTabLine{}",
			`\\tkzTabLine{,${this.#t.join(",")}}`
		];
		return [
			"\\begin{tikzpicture}",
			`  \\tkzTabInit[lgt=${this.#a},espcl=${this.#o}]`,
			`  {${r.join(",")}}`,
			`  {${t}}`,
			...i.map((e) => `  ${e}`),
			"\\end{tikzpicture}"
		].join("\n");
	}
	get display() {
		throw new a("TableOfSigns.display is not yet implemented");
	}
	clone() {
		let t = new e();
		return t.#e = this.#e.map((e) => e.clone()), t.#t = [...this.#t], t.#n = this.#n.map((e) => ({
			factor: new L(e.factor),
			roots: e.roots.map((e) => e.clone()),
			signs: [...e.signs]
		})), t.#r = this.#r, t.#i = this.#i, t.#a = this.#a, t.#o = this.#o, t;
	}
	copy(e) {
		return this.#e = e.#e.map((e) => e.clone()), this.#t = [...e.#t], this.#n = e.#n.map((e) => ({
			factor: new L(e.factor),
			roots: e.roots.map((e) => e.clone()),
			signs: [...e.signs]
		})), this;
	}
	get withFactors() {
		return this.#r = !0, this;
	}
	withLabel(e) {
		return this.#i = e, this;
	}
	withTkzTabOptions(e, t) {
		return this.#a = e, this.#o = t, this;
	}
	#d(e, t) {
		let n = this.#e.length, r = [];
		for (let t = 0; t <= n; t++) if (e(this.#t[2 * t])) {
			let e = t === 0 ? null : this.#e[t - 1], i = t === n ? null : this.#e[t];
			r.push(A.fromBounds(e, i, !0, !0));
		}
		for (let e = 0; e < n; e++) t(this.#t[2 * e + 1]) && r.push(A.point(this.#e[e]));
		return Qe.fromIntervals(r);
	}
	positive() {
		return this.#d((e) => e === "+", () => !1);
	}
	nonNegative() {
		return this.#d((e) => e === "+" || e === "z", (e) => e === "z");
	}
	negative() {
		return this.#d((e) => e === "-", () => !1);
	}
	nonPositive() {
		return this.#d((e) => e === "-" || e === "z", (e) => e === "z");
	}
	domain() {
		return this.#d((e) => e !== "h" && e !== "d" && e !== "", (e) => e !== "d" && e !== "h");
	}
	zeros() {
		return this.#e.filter((e, t) => this.#t[2 * t + 1] === "z").map((e) => e.clone());
	}
	poles() {
		return this.#e.filter((e, t) => this.#t[2 * t + 1] === "d").map((e) => e.clone());
	}
	get roots() {
		return this.#e.map((e) => e.clone());
	}
	get signs() {
		return [...this.#t];
	}
	get factors() {
		return this.#n.map((e) => ({
			factor: e.factor,
			roots: e.roots.map((e) => e.clone()),
			signs: [...e.signs]
		}));
	}
}, et = class {
	#e;
	#t;
	constructor(e, t, n) {
		if (n !== void 0 && !/^[a-z]$/.test(n)) throw new i(`EquationSolver expects a single lowercase variable, got "${n}"`);
		let r;
		if ("moveLeft" in e) {
			let t = e;
			r = t.left.clone().subtract(t.right);
		} else r = e.clone().subtract(t ?? 0);
		let a = r.variables;
		this.#t = n ?? (a.length === 1 ? a[0] : "x"), this.#e = r.getCoefficients().reverse();
	}
	solve() {
		return Ge(this.#e).map((e) => this.#n(e));
	}
	solveAsCardan() {
		if (this.#e.length - 1 != 3) throw new r("The equation is not cubic.");
		return Me(this.#e).map((e) => this.#n(e));
	}
	#n(e) {
		let t = k.fromPolynomRoot(e);
		return t.variable = this.#t, t;
	}
}, j = class e {
	#e;
	#t;
	constructor(e) {
		return this.#e = new g(0), this.#t = {}, e !== void 0 && this.parse(e), this;
	}
	parse(t) {
		return t instanceof e ? this.copy(t) : t instanceof g || typeof t == "number" ? this.copy(e.fromFraction(t)) : this.copy(e.fromString(t));
	}
	static fromNumber(t) {
		return e.fromFraction(t);
	}
	static fromFraction(t) {
		let n = new e();
		return n.#e = new g(t), n.#t = {}, n;
	}
	static fromLiteral(t, n) {
		let r = new e();
		r.#e = new g(t), r.#t = {};
		for (let e in n) r.#t[e] = n[e].clone();
		return r;
	}
	static fromString(t) {
		if (!isNaN(Number(t))) return e.fromNumber(Number(t));
		let n = new e();
		return n.#s(t), n;
	}
	copy(e) {
		return this.#e = e.coefficient.clone(), this.#t = {}, this.#n(e), this;
	}
	clone() {
		let t = new e();
		t.#e = this.#e.clone();
		for (let e in this.#t) t.setExponent(e, this.#t[e].clone());
		return t;
	}
	withDigits(e) {
		return this.#e.withDigits(e), this;
	}
	get tex() {
		return this.#i("tex");
	}
	get display() {
		return this.#i("display");
	}
	static gcd(...t) {
		for (let e of t) if (e.containsRationalPower()) throw new r("Monom.gcd: all monomials must have integer powers");
		let n = new e();
		n.coefficient = new g(h.gcd(...t.map((e) => e.coefficient.numerator)), h.lcm(...t.map((e) => e.coefficient.denominator))).reduce();
		for (let [e, r] of t.entries()) {
			for (let e in n.literal) e in r.literal || n.removeVariable(e);
			for (let i in r.literal) t.slice(0, e).every((e) => i in e.literal) && (!n.hasVariable(i) && r.literal[i].isStrictlyPositive() ? n.literal[i] = r.literal[i].clone() : n.literal[i] = r.literal[i].isLeq(n.literal[i]) ? r.literal[i].clone() : n.literal[i].clone());
		}
		return n;
	}
	static xMultiply(...t) {
		let n = new e().one();
		for (let e of t) n.multiply(e);
		return n;
	}
	add(...t) {
		let n = this.clone();
		for (let i of t) {
			let t = i instanceof e ? i : new e(i);
			if (n.isSameAs(t)) n.isZero() && n.#n(t), n.#e.add(t.coefficient);
			else throw new r("Add monom: " + this.display + " is not similar with " + t.display);
		}
		return this.copy(n);
	}
	get coefficient() {
		return this.#e;
	}
	set coefficient(e) {
		this.#e = new g(e);
	}
	containsRationalPower() {
		return Object.values(this.#t).some((e) => e.hasFractionalPart());
	}
	degree(e) {
		return this.variables.length === 0 ? new g(0) : e === void 0 ? Object.values(this.#t).reduce((e, t) => e.clone().add(t)) : this.hasVariable(e) ? this.#t[e].clone() : new g(0);
	}
	derivative(t = "x") {
		if (this.hasVariable(t)) {
			let e = this.#t[t].clone(), n = this.clone();
			return n.#t[t].subtract(1), n.#e.multiply(new g(e.clone())), n;
		}
		return new e().zero();
	}
	divide(...t) {
		for (let n of t) {
			let t = n instanceof e ? n : new e(n);
			this.#e.divide(t.coefficient);
			for (let e in t.literal) this.#t[e] = this.hasVariable(e) ? this.#t[e].subtract(t.literal[e]) : t.literal[e].clone().opposite(), this.#t[e].isZero() && this.removeVariable(e);
		}
		return this;
	}
	get dividers() {
		if (!this.coefficient.isRelative() || this.containsRationalPower() || this.coefficient.numerator > 1e6) return [this.clone()];
		let t = h.dividers(Math.abs(this.coefficient.numerator)), n = [];
		for (let e in this.literal) n = this.#a(n, e);
		let r = [];
		if (n.length > 0 && t.length > 0) for (let i of t) for (let t of n) r.push(e.fromLiteral(i, t));
		else if (t.length === 0) for (let t of n) r.push(e.fromLiteral(1, t));
		else for (let n of t) r.push(e.fromNumber(n));
		return r.length === 0 ? [new e().one()] : r;
	}
	evaluate(e, t) {
		let n = this.#r(e);
		if (this.variables.length === 0) return t === !0 ? this.coefficient.value : this.coefficient.clone();
		for (let e in this.#t) if (!(e in n)) throw new r("evaluate: missing value for variable " + e);
		if (t === !0) {
			let e = this.coefficient.value;
			for (let t in this.#t) {
				let r = n[t];
				e *= (r instanceof g ? r.value : r) ** this.#t[t].value;
			}
			return e;
		}
		let i = this.coefficient.clone();
		for (let e in this.#t) i.multiply(new g(n[e]).pow(this.#t[e]));
		return i;
	}
	hasVariable(e) {
		return Object.hasOwn(this.#t, e);
	}
	integrate(e, t, n) {
		let r = this.primitive(n);
		return r.evaluate(t, !1).subtract(r.evaluate(e, !1));
	}
	inverse() {
		this.#e.inverse();
		for (let e in this.#t) this.#t[e].opposite();
		return this;
	}
	isDivisibleBy(e) {
		if (e.degree().isStrictlyPositive()) {
			for (let t of e.variables) if (!this.degree(t).isGeq(e.degree(t))) return !1;
		}
		return this.coefficient.hasFractionalPart() || e.coefficient.hasFractionalPart() ? !0 : this.coefficient.clone().divide(e.coefficient).isRelative();
	}
	isEqual(e) {
		return this.isSameAs(e) && this.#e.isEqual(e.coefficient);
	}
	isLiteralSquare() {
		for (let e in this.literal) if (this.literal[e].hasFractionalPart() || this.literal[e].isOdd()) return !1;
		return !0;
	}
	isOne() {
		return this.#e.value === 1 && this.variables.length === 0;
	}
	isSameAs(e) {
		let t = this.variables, n = e.variables, r = t.concat(n.filter((e) => !t.includes(e)));
		if (this.isZero() || e.isZero() || t.length === 0 && n.length === 0) return !0;
		if (t.length !== n.length) return !1;
		if (!this.isZero() && !e.isZero()) {
			for (let t of r) if (!this.hasVariable(t) || !e.hasVariable(t) || !this.#t[t].isEqual(e.literal[t])) return !1;
		}
		return !0;
	}
	isSquare() {
		return this.coefficient.isSquare() ? this.isLiteralSquare() : !1;
	}
	isZero() {
		return this.#e.value === 0;
	}
	get literal() {
		return this.#t;
	}
	set literal(e) {
		this.#t = e;
	}
	set literalStr(e) {
		for (let t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) t[1] in this.#t || (this.#t[t[1]] = new g(0)), this.#t[t[1]].add(+t[2]);
		for (let t of [...e.matchAll(/([a-z](?!\^))/g)]) t[1] in this.#t || (this.#t[t[1]] = new g(0)), this.#t[t[1]].add(1);
	}
	multiply(...t) {
		for (let n of t) {
			let t = n instanceof e ? n : new e(n);
			this.#e.multiply(t.coefficient);
			for (let e in t.literal) this.hasVariable(e) ? this.#t[e].add(t.literal[e]) : this.#t[e] = t.literal[e].clone();
		}
		return this;
	}
	one() {
		return this.#e = new g(1), this.#t = {}, this;
	}
	opposite() {
		return this.#e.opposite(), this;
	}
	get plotFunction() {
		return this.#i("plot");
	}
	pow(e) {
		this.#e.pow(e);
		for (let t in this.#t) this.#t[t].multiply(e);
		return this;
	}
	primitive(e = "x") {
		let t = this.clone(), n;
		if (t.coefficient.isZero()) return t;
		if (t.hasVariable(e)) {
			if (n = t.degree(e).clone().add(1), n.isZero()) throw new r(`The primitive of ${this.display} is a logarithm, not a monom`);
			t.coefficient = t.coefficient.clone().divide(n), t.setExponent(e, n);
		} else t.setExponent(e, 1);
		return t;
	}
	reduce() {
		this.coefficient.reduce();
		for (let e in this.#t) this.#t[e].isZero() && this.removeVariable(e);
		return this;
	}
	removeVariable(e) {
		delete this.#t[e];
	}
	root() {
		throw new a("Method not implemented.");
	}
	setExponent(e, t) {
		return t instanceof g ? t.isZero() ? (this.hasVariable(e) && this.removeVariable(e), this) : (this.#t[e] = t.clone(), this) : this.setExponent(e, new g(t));
	}
	sqrt() {
		if (!this.coefficient.isSquare()) throw new r("sqrt: coefficient is not a perfect square: " + this.display);
		this.#e.sqrt();
		for (let e in this.#t) this.#t[e].divide(2);
		return this;
	}
	subtract(...t) {
		let n = this.clone();
		for (let i of t) {
			let t = i instanceof e ? i : new e(i);
			if (n.isSameAs(t)) n.isZero() && n.#n(t), n.#e.add(t.clone().coefficient.opposite());
			else throw new r("Subtract: Is not similar: " + t.display);
		}
		return this.copy(n);
	}
	get variables() {
		let e = [];
		return Object.entries(this.literal).forEach(([t, n]) => {
			n.isZero() || e.push(t);
		}), e.sort(), e;
	}
	zero() {
		return this.#e = new g(0), this.#t = {}, this;
	}
	#n(e) {
		for (let t in e.literal) this.#t[t] = e.literal[t].clone();
	}
	#r(e) {
		if (e instanceof g || typeof e != "object") {
			let t = {};
			return this.variables.length > 0 && (t[this.variables[0]] = e instanceof g ? e : new g(e)), t;
		}
		return e;
	}
	#i(e) {
		let t = "", n = Object.keys(this.#t).sort();
		for (let r of n) this.#t[r].isNotZero() && (e === "plot" && t !== "" && (t += "*"), t += r, this.#t[r].isNotEqual(1) && (t += e === "tex" ? `^{ ${this.#t[r].asTfrac.tex} }` : `^(${this.#t[r].display})`));
		let r = e === "tex" ? this.#e.asFrac.tex : this.#e.display;
		return t === "" ? this.#e.value === 0 ? "0" : r : this.#e.value === 1 ? t : this.#e.value === -1 ? `-${t}` : this.#e.value === 0 ? "0" : e === "plot" ? `${r}*${t}` : `${r}${t}`;
	}
	#a(e, t) {
		let n = [];
		for (let r = 0; r <= this.literal[t].value; r++) if (e.length === 0) {
			let e = {};
			e[t] = new g(r), n.push(e);
		} else for (let i of e) {
			let e = {};
			for (let t in i) e[t] = i[t];
			e[t] = new g(r), n.push(e);
		}
		return n;
	}
	#o(n, r, i) {
		let a = (e) => new t(`Cannot parse "${i}" as a Monom: ${e}`);
		switch (r.tokenType) {
			case b.COEFFICIENT:
				n.push(new e(new g(r.token)));
				return;
			case b.VARIABLE: {
				let t = new e().one();
				t.setExponent(r.token, 1), n.push(t);
				return;
			}
			case b.OPERATION: {
				let e = n.pop(), t = n.pop();
				if (t === void 0 || e === void 0) throw a("an operator is missing an operand");
				switch (r.token) {
					case "+":
					case "-":
						if (t.isZero()) n.push(r.token === "-" ? e.opposite() : e);
						else if (e.isZero()) n.push(t);
						else throw a("a sum or a difference of terms is not a monom, use a Polynom");
						return;
					case "*":
						n.push(t.multiply(e));
						return;
					case "/":
						n.push(t.divide(e));
						return;
					case "^":
						if (e.variables.length > 0) throw a("the exponent must be a number");
						n.push(t.pow(e.coefficient));
						return;
					default: throw a(`unsupported operator "${r.token}"`);
				}
			}
			default: throw a(`unsupported element "${r.token}"`);
		}
	}
	#s(e) {
		let n;
		try {
			n = new S().parse(e);
		} catch (n) {
			throw new t(`Cannot parse "${e}" as a Monom`, { cause: n });
		}
		let r = n.rpn;
		if (r.length === 0) return this.zero(), this;
		let i = [];
		for (let t of r) this.#o(i, t, e);
		if (i.length !== 1) throw new t(`Cannot parse "${e}" as a Monom: it must be a single term`);
		return this.one(), this.multiply(i[0]), this;
	}
};
//#endregion
//#region src/algebra/polynom.ts
function tt({ x: e, y: t }) {
	let n = {
		x: new g(e),
		y: new g(t)
	};
	if (!n.x.isFinite() || !n.y.isFinite()) throw new i("fromThreePoints expects finite coordinates");
	return n;
}
function nt(e, t) {
	return t.y.clone().subtract(e.y).divide(t.x.clone().subtract(e.x));
}
var M = class e {
	#e = "x";
	#t;
	#n;
	#r;
	#i = !1;
	constructor(e, ...t) {
		return this.#n = [], this.#t = [], this.#r = [], e !== void 0 && this.parse(e, ...t), this;
	}
	parse(n, ...r) {
		if (n instanceof e) return this.copy(n);
		if (n instanceof j) return this.copy(e.fromMonoms(n, ...r));
		if (n instanceof g || typeof n == "number") return r.length === 0 ? this.copy(e.fromConstant(n)) : this.copy(e.fromCoefficients(this.#e, n, ...r));
		if (typeof n == "string") return r.length === 0 ? this.copy(e.fromString(n)) : n.length === 1 ? this.copy(e.fromCoefficients(n, ...r)) : this.copy(e.fromLinear(n, ...r));
		throw new t(`Cannot parse "${String(n)}" as a Polynom`);
	}
	copy(e) {
		return this.#e = e.#e, this.#n = e.monoms.map((e) => e.clone()), this.#u(), this;
	}
	clone() {
		let t = new e(), n = [];
		t.#e = this.#e;
		for (let e of this.#n) n.push(e.clone());
		return t.monoms = n, t;
	}
	withDigits(e) {
		return this.#n.forEach((t) => t.withDigits(e)), this;
	}
	get tex() {
		return this.#l("tex");
	}
	get display() {
		return this.#l();
	}
	static xMultiply(...t) {
		let n = new e().one();
		return t.forEach((e) => {
			n.multiply(e);
		}), n;
	}
	add(...t) {
		let n = t.flatMap((t) => e.#f(t).monoms);
		return this.#n = this.#n.concat(n), this.reduce();
	}
	commonMonom() {
		let e = new j().one();
		e.coefficient = new g(this.gcdNumerator(), this.gcdDenominator());
		for (let t of this.variables) {
			e.setExponent(t, this.degree(t));
			for (let n of this.#n) if (e.setExponent(t, g.min(n.degree(t), e.degree(t))), e.degree(t).isZero()) break;
		}
		return e;
	}
	degree(e) {
		let t = new g(0);
		for (let n of this.#n) t = g.max(n.degree(e).value, t);
		return t;
	}
	derivative(t) {
		let n = new e();
		for (let e of this.#n) n.add(e.derivative(t));
		return n.reduce();
	}
	divide(...e) {
		if (e.length === 1) return this.#a(e[0]);
		let t = this.clone();
		for (let n of e) t.#a(n);
		return this.copy(t);
	}
	#a(t) {
		if (t instanceof g) return this.#s(t);
		if (typeof t == "number" && Number.isSafeInteger(t)) return this.#c(t);
		if (t instanceof j) return this.#a(new e(t));
		if (t instanceof e) {
			if (t.monoms.length === 1 && t.variables.length === 0) return this.#s(t.monoms[0].coefficient);
			let { quotient: e, reminder: n } = this.euclidean(t);
			if (n.isZero()) return this.#n = e.monoms, this.#u(), this;
			throw new r(`Cannot divide "${this.display}" by "${t.display}": non-zero remainder "${n.display}"`);
		}
		if (typeof t == "string") return this.#a(new e(t));
		throw new r(`Cannot divide "${this.display}" by "${String(t)}"`);
	}
	empty() {
		return this.#n = [], this.#u(), this;
	}
	euclidean(t) {
		let n = t.variables[0], i = new e().zero(), a = this.clone().reorder(n);
		if (t.variables.length === 0) return {
			quotient: this.clone().divide(t).reduce(),
			reminder: new e().zero()
		};
		if (!this.degree(n).isNatural() || !t.degree(n).isNatural()) throw new r("Euclidean division requires integer degrees");
		let o = t.monomByDegree(void 0, n), s = t.degree(n), c, l = this.degree(n).value - s.value + 1;
		for (; a.degree(n).isGeq(s) && l > 0 && (l--, c = a.monomByDegree(void 0, n).clone().divide(o), !(!c.isZero() && (i.add(c), a.subtract(t.clone().multiply(c)).reduce(), c.degree(n).isZero()))););
		return i.reduce(), a.reduce(), {
			quotient: i,
			reminder: a
		};
	}
	evaluate(e, t) {
		if (t === !0) {
			let t = 0;
			return this.#n.forEach((n) => {
				t += n.evaluate(e, !0);
			}), t;
		}
		let n = new g(0);
		return this.#n.forEach((t) => {
			n.add(t.evaluate(e, !1));
		}), n;
	}
	factorize(t) {
		if (this.#t = [], this.monoms.length === 1) return [this.clone()];
		let n = this.#d(t), r = this.clone().reorder(n), i = r.commonMonom();
		r.monomByDegree().coefficient.isStrictlyNegative() && i.opposite(), i.isOne() || (this.#t.push(new e(i)), r = r.euclidean(this.#t[0]).quotient);
		let a = new et(r, void 0, n).solve();
		if (a.length === 0) return this.#t.length === 0 ? this.#t = [this.clone()] : this.#t.push(r), this.#t;
		a.forEach((t) => {
			if (t.exact && t.root.isZero()) for (let r = 0; r < t.count; r++) t.fraction.hasFractionalPart() ? this.#t.push(e.fromCoefficients(n, t.fraction.denominator, -t.fraction.numerator)) : this.#t.push(e.fromCoefficients(n, 1, t.fraction.clone().opposite()));
		});
		let o = e.xMultiply(...this.#t), s = this.clone().divide(o);
		return s.degree().isStrictlyPositive() ? this.#t.push(s) : s.isOne() || this.#t.unshift(s), this.#t;
	}
	get factors() {
		return this.#t.length === 0 && !this.isZero() ? this.factorize() : this.#t;
	}
	static fromCoefficients(t, ...n) {
		if (!/^[a-z]$/.test(t)) throw new i(`fromCoefficients expects a single lowercase letter, got "${t}"`);
		let r = new e();
		return r.#e = t, [...n].reverse().forEach((e, n) => {
			let i = new j();
			i.coefficient = new g(e), i.setExponent(t, n), r.#n.push(i);
		}), r.#u(), r.reorder();
	}
	static fromConstant(t) {
		return e.fromMonoms(new g(t));
	}
	static fromLinear(n, ...r) {
		if (!/^[a-z]{2,}$/.test(n)) throw new t(`fromLinear expects at least two lowercase variables, got "${n}"`);
		let a = n.split(""), o = r.map((e) => new g(e));
		if (o.length > a.length + 1) throw new i(`Too many values: ${a.length} variables but ${o.length} values provided`);
		let s = new e();
		return o.forEach((e, t) => {
			let n = new j();
			n.coefficient = e.clone(), n.literalStr = a[t] ?? "", s.add(n);
		}), s.#u(), s;
	}
	static fromMonoms(...t) {
		let n = new e();
		return n.#n = t.map((e) => e instanceof j ? e.clone() : new j(e)), n.#u(), n;
	}
	static fromThreePoints(t, n, i, a = "x") {
		let o = tt(t), s = tt(n), c = tt(i);
		if (o.x.isEqual(s.x) || o.x.isEqual(c.x) || s.x.isEqual(c.x)) throw new r("fromThreePoints needs three points with distinct x values");
		let l = nt(o, s), u = nt(s, c).clone().subtract(l).divide(c.x.clone().subtract(o.x)), d = l.clone().subtract(u.clone().multiply(o.x.clone().add(s.x))), f = o.y.clone().subtract(l.clone().multiply(o.x)).add(u.clone().multiply(o.x).multiply(s.x));
		return e.fromCoefficients(a, u, d, f);
	}
	static fromString(t) {
		if (t !== "" && !isNaN(Number(t))) return e.fromConstant(Number(t));
		let n = new e();
		return n.#h(t), n;
	}
	gcdDenominator() {
		return h.gcd(...this.getDenominators());
	}
	gcdNumerator() {
		return h.gcd(...this.getNumerators());
	}
	getCoefficients() {
		if (!this.degree().isNatural()) throw new r("getCoefficients() requires a polynomial with integer degrees");
		let e = this.clone().reorder(), t = this.degree().value + 1, n = Array.from({ length: t }, () => new g(0));
		return e.monoms.forEach((e) => {
			let r = t - e.degree().value - 1;
			n[r] = e.coefficient.clone();
		}), n;
	}
	getDenominators() {
		let e = [];
		for (let t of this.#n) e.push(t.coefficient.denominator);
		return e;
	}
	getNumerators() {
		let e = [];
		for (let t of this.#n) e.push(t.coefficient.numerator);
		return e;
	}
	hasVariable(e) {
		return this.variables.includes(e);
	}
	integrate(e, t, n) {
		let r = this.#d(n), i = this.primitive(r), a = {}, o = {};
		return a[r] = new g(e), o[r] = new g(t), i.evaluate(o).subtract(i.evaluate(a));
	}
	inverse() {
		throw new r("Cannot invert a polynom");
	}
	isDeveloped(t) {
		let n = t.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
		if (n.includes("(") || n.includes(")")) return !1;
		let r = new e(t);
		return !!this.isEqual(r);
	}
	isDivisibleBy(e) {
		if (e.degree().isOne()) {
			let t = e.roots[0];
			return t.exact ? this.evaluate(t.fraction).isZero() : !1;
		}
		{
			let { reminder: t } = this.euclidean(e);
			return t.isZero();
		}
	}
	isEqual(e) {
		return this.#o(e, "=");
	}
	hasCrossTerm() {
		return this.#n.some((e) => e.variables.length > 1);
	}
	isOne() {
		return this.#n.length === 1 && this.#n[0].coefficient.isOne() && this.degree().isZero();
	}
	isOppositeAt(e) {
		return this.#o(e.clone().opposite(), "=");
	}
	isSameAs(e) {
		return this.#o(e, "same");
	}
	isZero() {
		return this.#n.length === 1 && this.#n[0].coefficient.isZero() || this.#n.length === 0;
	}
	lcmDenominator() {
		return h.lcm(...this.getDenominators());
	}
	lcmNumerator() {
		return h.lcm(...this.getNumerators());
	}
	get length() {
		return this.#n.length;
	}
	limitTo(e, t) {
		let n = new g(e);
		if (n.isFinite()) {
			let e = this.#d(t);
			return this.evaluate({ [e]: n });
		}
		let r = this.monomByDegree(void 0, t), i = r.coefficient.sign(), a = r.degree(t);
		return a.isZero() ? r.coefficient.clone() : a.isStrictlyPositive() ? n.isPositive() ? i === 1 ? new g().infinite() : new g().infinite().opposite() : (a.value % 2 == 0 ? i : -i) === 1 ? new g().infinite() : new g().infinite().opposite() : new g(0);
	}
	monomByDegree(e, t) {
		if (e === void 0) return this.monomByDegree(this.degree(t), t);
		let n = this.clone().reduce();
		for (let r of n.#n) if (r.degree(t).isEqual(e)) return r.clone();
		return new j().zero();
	}
	monomByVariable(e) {
		let t = this.clone().reduce();
		for (let n of t.#n) if (n.hasVariable(e)) return n.clone();
		return new j().zero();
	}
	get monoms() {
		return this.#n.map((e) => e.clone());
	}
	set monoms(e) {
		this.#n = e, this.#u();
	}
	monomsByDegree(e, t) {
		if (e === void 0) return this.monomsByDegree(this.degree(t), t);
		let n = [], r = this.clone().reduce();
		for (let i of r.#n) i.degree(t).isEqual(e) && n.push(i.clone());
		return n;
	}
	multiply(...t) {
		let n = t.map((t) => e.#f(t));
		for (let e of n) this.#p(e);
		return this;
	}
	get numberOfVars() {
		return this.variables.length;
	}
	one() {
		return this.#n = [], this.#n.push(new j().one()), this.#u(), this;
	}
	opposite() {
		return this.#n = this.#n.map((e) => e.opposite()), this.#u(), this;
	}
	get plotFunction() {
		return this.#l("tex", !1, !1, !0);
	}
	pow(e) {
		if (!Number.isSafeInteger(e)) throw new i("Can only raise item by an integer");
		if (e < 0) throw new i("Can only raise item by a non-negative integer");
		if (e === 0) return this.one();
		let t = this.clone();
		for (let n = 1; n < e; n++) this.multiply(t);
		return this.reduce();
	}
	primitive(t) {
		let n = new e();
		for (let e of this.#n) n.add(e.primitive(t));
		return n;
	}
	reduce() {
		let e = [];
		for (let t of this.#n) {
			if (t.isZero()) continue;
			let n = e.find((e) => !e.isZero() && e.isSameAs(t));
			n ? n.add(t) : e.push(t);
		}
		this.#n = e.filter((e) => !e.isZero());
		for (let e of this.#n) e.coefficient.reduce();
		return this.length === 0 ? this.zero() : (this.#u(), this.reorder());
	}
	reorder(e, t = !1) {
		e ??= this.#e;
		let n = this.variables.filter((t) => t !== e);
		return this.#n.sort(function(r, i) {
			let a = r.degree(e).value, o = i.degree(e).value;
			if (a !== o) return t ? a - o : o - a;
			if (n.length > 0) for (let e of n) {
				let n = r.degree(e).value, a = i.degree(e).value;
				if (n !== a) return t ? n - a : a - n;
			}
			return 0;
		}), this;
	}
	replaceBy(t, n) {
		let i, a = new e().zero();
		for (let e of this.monoms) if (!e.hasVariable(t) || e.literal[t].isZero()) a.add(e.clone());
		else {
			if (i = e.literal[t].clone(), e.removeVariable(t), i.isStrictlyNegative()) throw new r(`Cannot replace variable "${t}" with negative power in a Polynom`);
			a.add(n.clone().pow(i.numerator).multiply(e));
		}
		return this.#n = a.reduce().monoms, this.#u(), this;
	}
	root() {
		throw new r("Cannot take the root from a polynom");
	}
	get roots() {
		return this.#i ||= (this.#r = this.degree().isZero() ? [] : new et(this.clone()).solve(), !0), this.#r;
	}
	setVariable(e) {
		if (!/^[a-z]$/.test(e)) throw new i(`setVariable expects a single lowercase variable, got "${e}"`);
		return this.#e = e, this;
	}
	sqrt() {
		throw new r("Cannot take the square root from a polynom");
	}
	subtract(...t) {
		let n = t.flatMap((t) => e.#f(t).opposite().monoms);
		return this.#n = this.#n.concat(n), this.reduce();
	}
	get value() {
		if (this.degree().isZero()) return this.monoms[0]?.coefficient.value ?? 0;
	}
	get variables() {
		return [...new Set(this.#n.flatMap((e) => e.variables))].sort();
	}
	zero() {
		return this.#n = [], this.#n.push(new j().zero()), this.#u(), this;
	}
	#o(e, t) {
		t ??= "=";
		let n = this.clone().reduce().reorder(), r = e.clone().reduce().reorder();
		switch (t) {
			case "=": return n.length !== r.length || !n.degree().isEqual(r.degree()) ? !1 : n.monoms.every((e, t) => e.isEqual(r.monoms[t]));
			case "same": return n.length !== r.length || !n.degree().isEqual(r.degree()) ? !1 : n.monoms.every((e, t) => e.isSameAs(r.monoms[t]));
			default: return !1;
		}
	}
	#s(e) {
		for (let t of this.#n) t.coefficient.divide(e);
		return this.#u(), this;
	}
	#c(e) {
		let t = new g(e);
		for (let e of this.#n) e.coefficient.divide(t);
		return this.#u(), this;
	}
	#l(e = "display", t, n, r) {
		let i = "";
		for (let n of this.#n) {
			if (n.coefficient.value === 0) continue;
			let a;
			a = r ? n.plotFunction : e === "tex" ? n.tex : n.display, i += `${n.coefficient.sign() === 1 && (i !== "" || t === !0) ? "+" : ""}${a}`;
		}
		return n === !0 && this.length > 1 && (i = e === "tex" ? `\\left( ${i} \\right)` : `(${i})`), i === "" && (i = "0"), i;
	}
	#u() {
		this.#i = !1, this.#t = [];
	}
	#d(e) {
		return e === void 0 ? this.variables.length === 1 ? this.variables[0] : this.#e : e;
	}
	static #f(t) {
		if (t === void 0) throw new i("An operand is required");
		return new e(t);
	}
	#p(e) {
		let t = [];
		for (let n of this.#n) for (let r of e.monoms) t.push(j.xMultiply(n, r));
		return this.#n = t, this.reduce();
	}
	#m(n, i) {
		switch (i.tokenType) {
			case b.COEFFICIENT:
				n.push(new e(i.token));
				break;
			case b.VARIABLE:
				n.push(new e().add(new j(i.token)));
				break;
			case b.CONSTANT: throw new t("Unsupported CONSTANT token in Polynom parser");
			case b.OPERATION:
				if (n.length >= 2) {
					let e = n.pop(), a = n.pop();
					if (a === void 0 || e === void 0) throw new t("Unexpected undefined operand in Polynom parser stack");
					if (i.token === "+") n.push(a.add(e));
					else if (i.token === "-") n.push(a.subtract(e));
					else if (i.token === "*") n.push(a.multiply(e));
					else if (i.token === "/") {
						if (e.degree().isStrictlyPositive()) throw new r("Cannot divide a Polynom by another Polynom of degree > 0");
						n.push(a.divide(e.monoms[0].coefficient));
					} else if (i.token === "^") {
						if (e.degree().isStrictlyPositive()) throw new r("Cannot elevate a polynom with another polynom !");
						if (e.monoms[0].coefficient.isNatural()) n.push(a.pow(e.monoms[0].coefficient.value));
						else if (a.#n.length === 1 && a.#n[0].coefficient.isOne()) {
							for (let t in a.#n[0].literal) a.#n[0].literal[t].multiply(e.#n[0].coefficient);
							n.push(a);
						} else throw new r("Cannot raise a multi-monom Polynom to a fractional power");
					}
				} else if (i.token === "-") {
					let e = n.pop();
					e && n.push(e.opposite());
				} else throw new t("Error parsing the polynom");
				break;
			case b.MONOM: throw new t("Unexpected MONOM token in polynom parser");
			case b.FUNCTION: throw new t(`Unsupported function token "${i.token}" in polynom parser`);
		}
	}
	#h(e) {
		let n;
		try {
			n = new S().parse(e);
		} catch (n) {
			throw new t(`Cannot parse "${e}" as a Polynom`, { cause: n });
		}
		let r = n.rpn;
		this.zero();
		let i = [];
		for (let e of r) this.#m(i, e);
		return i.length === 1 && this.add(i[0]), this.reorder();
	}
};
//#endregion
//#region src/geometry/geomMath.ts
function rt(e, t) {
	if (e.dimension !== t.dimension) return !1;
	let n = e.array, r = t.array;
	return n.every((e, t) => r[t].isEqual(e));
}
function it(e, t) {
	if (e.dimension !== t.dimension) return !1;
	let n = e.array, r = t.array;
	for (let e = 0; e < n.length; e++) for (let t = e + 1; t < n.length; t++) if (!n[e].clone().multiply(r[t]).isEqual(n[t].clone().multiply(r[e]))) return !1;
	return !0;
}
function at(e, t) {
	if (e.dimension !== t.dimension) throw new n("Vectors must have the same dimension");
	return e.array.reduce((e, n, r) => e.add(n.clone().multiply(t.array[r])), new g(0));
}
function ot(...e) {
	if (e.length === 0) throw new n("At least one vector is required");
	if (e.some((t) => t.dimension !== e[0].dimension)) throw new n("All vectors must have the same dimension");
	let t = e[0].dimension;
	if (t !== e.length) throw new n(`Determinant of dimension ${t} requires exactly ${t} vectors (${e.length} given)`);
	let r = e.map((e) => e.cloneCoordinates()), i = 1;
	for (let e = 0; e < t - 1; e++) {
		if (r[e][e].isZero()) {
			let n = !1;
			for (let a = e + 1; a < t; a++) if (!r[a][e].isZero()) {
				[r[e], r[a]] = [r[a], r[e]], i = -i, n = !0;
				break;
			}
			if (!n) return new g(0);
		}
		let n = e === 0 ? new g(1) : r[e - 1][e - 1];
		for (let i = e + 1; i < t; i++) for (let a = e + 1; a < t; a++) r[i][a] = r[e][e].clone().multiply(r[i][a]).subtract(r[i][e].clone().multiply(r[e][a])).divide(n);
	}
	return i === 1 ? r[t - 1][t - 1].clone() : r[t - 1][t - 1].clone().opposite();
}
//#endregion
//#region src/geometry/TupleN.ts
var N = class {
	#e = [];
	#t;
	cloneCoordinates() {
		return this.#e.map((e) => e.clone());
	}
	withDigits(e) {
		return this.#e.forEach((t) => t.withDigits(e)), this;
	}
	get array() {
		return this.#e.map((e) => e.clone());
	}
	set array(e) {
		this.#e = e;
	}
	get dimension() {
		return this.#e.length;
	}
	static parseString(e) {
		e.startsWith("(") && (e = e.substring(1)), e.endsWith(")") && (e = e.substring(0, e.length - 1));
		let n = e.split(/[,;\s]/g).filter((e) => e.trim() !== "");
		if (n.length < 2) throw new t(`Cannot parse "${e}" as a tuple: at least 2 components required`);
		return n.map((e) => new g(e));
	}
	get onChange() {
		return this.#t;
	}
	set onChange(e) {
		this.#t = e;
	}
	setDimension(e = 2) {
		if (e < 2) throw new n("Dimension must be at least 2");
		if (e < this.dimension) this.#e = this.#e.slice(0, e);
		else if (e > this.dimension) for (let t = this.dimension; t < e; t++) this.#e.push(new g(0));
		return this;
	}
	get x() {
		return this.#e[0];
	}
	set x(e) {
		this.#e[0] = new g(e), this.#t?.();
	}
	get y() {
		return this.#e[1];
	}
	set y(e) {
		this.#e[1] = new g(e), this.#t?.();
	}
	get z() {
		if (this.dimension < 3) throw new n("Vector is not 3D");
		return this.#e[2];
	}
	set z(e) {
		if (this.dimension < 3) throw new n("Vector is not 3D");
		this.#e[2] = new g(e), this.#t?.();
	}
	copy(e) {
		return this.array = e.cloneCoordinates(), this;
	}
	isZero() {
		return this.#e.every((e) => e.isZero());
	}
	get norm() {
		return Math.sqrt(this.normSquare.value);
	}
	get normSquare() {
		return this.#e.reduce((e, t) => e.add(t.clone().pow(2)), new g(0));
	}
	opposite() {
		return this.array = this.cloneCoordinates().map((e) => e.opposite()), this;
	}
	zero() {
		return this.#e.forEach((e) => e.zero()), this.#t?.(), this;
	}
}, P = class e extends N {
	constructor(...e) {
		super(), e.length > 0 && this.parse(...e);
	}
	parse(...n) {
		if (n.length === 1) {
			if (n[0] instanceof N) return this.array = n[0].cloneCoordinates(), this;
			if (typeof n[0] == "string") return this.copy(e.fromString(n[0]));
		}
		if (n.length > 1) {
			if (n.some((e) => e instanceof N)) throw new i("Creating a point from multiple arguments requires scalar inputs");
			let e = n.map((e) => new g(e));
			if (e.some((e) => e.isNaN())) throw new t("The given values are not a valid point string (a,b): ");
			this.array = e;
		}
		return this;
	}
	static fromString(t) {
		let n = new e();
		return n.array = N.parseString(t), n;
	}
	clone() {
		let t = new e();
		return t.array = this.cloneCoordinates(), t;
	}
	get tex() {
		return `\\left(${this.array.map((e) => e.tex).join(";")}\\right)`;
	}
	get display() {
		return `(${this.array.map((e) => e.display).join(";")})`;
	}
	distanceTo(e) {
		if (this.dimension !== e.dimension) throw new n("The two points must have the same dimensions.");
		let t = this.array.map((t, n) => e.array[n].clone().subtract(t)).reduce((e, t) => e.add(t.clone().pow(2)), new g(0));
		return new _().from(2, t).reduce();
	}
	isEqual(e) {
		if (this.dimension !== e.dimension) return !1;
		let t = e.array;
		return this.array.every((e, n) => e.isEqual(t[n]));
	}
	isEqualXY(t, n) {
		return this.isEqual(new e(t, n));
	}
	static middleOf(t, n) {
		return new e().middleOf(t, n);
	}
	middleOf(e, t) {
		if (e.dimension !== t.dimension) throw new n("Vectors must be the same dimension");
		return this.array = e.cloneCoordinates().map((e, n) => e.add(t.array[n]).divide(2)), this;
	}
}, F = class e extends N {
	constructor(...e) {
		return super(), e.length > 0 && this.parse(...e), this;
	}
	parse(...r) {
		if (r.length === 0) throw new i("Invalid value");
		if (r.length === 1) {
			if (r[0] instanceof N) return this.copy(r[0]);
			if (typeof r[0] == "string") return this.copy(e.fromString(r[0]));
			throw new i("Invalid value");
		}
		if (r.length === 2) {
			let [e, t] = r;
			if (e instanceof N && t instanceof N) {
				if (e.dimension !== t.dimension) throw new n("Vectors must have the same dimension");
				return this.array = t.array.map((t, n) => t.clone().subtract(e.array[n])), this;
			}
		}
		if (r.some((e) => e instanceof N)) throw new i("Creating a vector from multiple arguments requires scalar inputs");
		let a = r.map((e) => new g(e));
		if (a.some((e) => e.isNaN())) throw new t("The given values are not valid coordinates");
		return this.array = a, this;
	}
	clone() {
		let t = new e();
		return t.array = this.cloneCoordinates(), t;
	}
	get tex() {
		return `\\begin{pmatrix} ${this.array.map((e) => e.tex).join(" \\\\ ")} \\end{pmatrix}`;
	}
	get display() {
		return `((${this.array.map((e) => e.display).join(",")}))`;
	}
	static asDisplay(...e) {
		return `((${e.join(",")}))`;
	}
	static asTex(...e) {
		return `\\begin{pmatrix} ${e.join(" \\\\ ")} \\end{pmatrix}`;
	}
	add(e) {
		return this.array = this.cloneCoordinates().map((t, n) => t.add(e.array[n])), this;
	}
	angle(e, t, n) {
		let i = this.norm * e.norm;
		if (i === 0) throw new r("The angle with a zero vector is undefined");
		let a = this.dot(e).value;
		return t && (a = Math.abs(a)), (n ? 1 : 180 / Math.PI) * Math.acos(Math.max(-1, Math.min(1, a / i)));
	}
	cross(t) {
		if (this.dimension !== 3 || t.dimension !== 3) throw new n("Cross product can only be determined in 3D");
		return new e(this.y.clone().multiply(t.z).subtract(this.z.clone().multiply(t.y)), this.z.clone().multiply(t.x).subtract(this.x.clone().multiply(t.z)), this.x.clone().multiply(t.y).subtract(this.y.clone().multiply(t.x)));
	}
	divideByScalar(e) {
		return this.multiplyByScalar(new g(e).inverse());
	}
	dot(e) {
		return at(this, e);
	}
	static fromString(t) {
		let n = new e();
		return n.array = t.startsWith("((") && t.endsWith("))") ? N.parseString(t.slice(1, -1)) : N.parseString(t), n;
	}
	static fromPolynom(t, r) {
		let a = t instanceof M ? t : new M(t), o = {};
		for (let [t, n] of Object.entries(r)) o[t] = n instanceof e ? n : e.fromString(n);
		let s = Object.values(o).map((e) => e.dimension);
		if (s.length === 0) throw new i("No vectors provided");
		if (new Set(s).size > 1) throw new n("All vectors must have the same dimension");
		let c = new e(...Array.from({ length: s[0] }, () => 0));
		for (let e of a.monoms) {
			let t = e.variables;
			if (t.length === 0) {
				if (!e.coefficient.isZero()) throw new i("Constant term has no associated vector");
				continue;
			}
			if (t.length > 1 || e.degree().value !== 1) throw new i(`Monom is not a simple linear term: ${e.display}`);
			let n = t[0];
			if (!(n in o)) throw new i(`No vector provided for variable '${n}'`);
			c.add(o[n].clone().multiplyByScalar(e.coefficient));
		}
		return c;
	}
	isColinearTo(e) {
		return it(this, e);
	}
	isEqual(e) {
		return rt(this, e);
	}
	isNormalTo(e) {
		return this.dot(e).isZero();
	}
	isOne() {
		return this.array.every((e, t) => t === 0 ? e.isOne() : e.isZero());
	}
	multiplyByScalar(e) {
		let t = new g(e);
		return this.array = this.cloneCoordinates().map((e) => e.multiply(t)), this;
	}
	normal() {
		if (this.dimension >= 3) throw new n("Normal vector can only be determined in 2D");
		let e = this.x.clone().opposite(), t = this.y.clone();
		return this.x = t, this.y = e, this;
	}
	one() {
		return this.zero(), this.x.one(), this;
	}
	simplify() {
		let e = h.lcm(...this.array.map((e) => e.denominator)), t = h.gcd(...this.array.map((e) => e.numerator));
		return this.multiplyByScalar(new g(e, t)), this.x.isNegative() && this.opposite(), this;
	}
	subtract(e) {
		return this.add(e.clone().opposite());
	}
	translate(...e) {
		return this.array = this.cloneCoordinates().map((t, n) => t.add(e[n])), this;
	}
	unit() {
		let e = this.norm;
		return e === 0 ? this : this.divideByScalar(e);
	}
}, st = class e {
	#e = 0;
	#t = null;
	#n = [];
	constructor(e, t) {
		e && (t ??= e, this.#o(e, t));
	}
	parse(e) {
		return typeof e == "string" ? this.#s(e) : e.length > 0 && e[0] instanceof F ? this.#l(...e) : this.#c(e);
	}
	copy(e) {
		return this.#n = e.#n.map((e) => e.map((e) => e.clone())), this.#t = e.#t, this;
	}
	clone() {
		let e = [];
		this.#n.forEach((t) => {
			e.push(t.map((e) => e.clone()));
		});
		let t = this.createInstance().#c(e);
		return t.#t = this.#t, t;
	}
	get tex() {
		if (this.#n.length === 0) return "";
		if (this.#t !== null) {
			let { cols: e } = this.dimension, t = "c".repeat(this.#t) + "|" + "c".repeat(e - this.#t), [n, r] = this.#i(), i = this.#n.map((e) => "	" + e.map((e) => e.tex).join(" & ") + "\\\\");
			return [
				`\\left${n}\\begin{array}{${t}}`,
				...i,
				`\\end{array}\\right${r}`
			].join("\n");
		}
		let e = this.#a();
		return [
			`\\begin{${e}}`,
			...this.#n.map((e) => "	" + e.map((e) => e.tex).join(" & ") + "\\\\"),
			`\\end{${e}}`
		].join("\n");
	}
	#r() {
		return this.#e === 3 ? ["|", "|"] : this.#e === 4 ? ["||", "||"] : this.#e === 1 ? ["[", "]"] : this.#e === 2 ? ["{", "}"] : ["(", ")"];
	}
	#i() {
		return this.#e === 3 ? ["|", "|"] : this.#e === 4 ? ["\\|", "\\|"] : this.#e === 1 ? ["[", "]"] : this.#e === 2 ? ["\\{", "\\}"] : ["(", ")"];
	}
	#a() {
		return this.#e === 3 ? "vmatrix" : this.#e === 4 ? "Vmatrix" : this.#e === 1 ? "bmatrix" : this.#e === 2 ? "Bmatrix" : "pmatrix";
	}
	get display() {
		if (this.#n.length === 0) return "";
		let e = this.#t, t = this.#r();
		return t[0] + this.map((e) => e.display).map((t) => e === null ? `(${t.join(",")})` : `(${t.slice(0, e).join(",")}|${t.slice(e).join(",")})`).join(",") + t[1];
	}
	add(e) {
		if (!this.canBeAdded(e)) throw new n("Cannot add a matrix with different dimensions.");
		return this.forEach((t, n, r) => {
			t.add(e.#n[n][r]);
		}), this;
	}
	aij(e, t) {
		return e < 0 || e >= this.dimension.rows || t < 0 || t >= this.dimension.cols ? null : this.#n[e][t];
	}
	get asBmatrix() {
		return this.#e = 1, this;
	}
	get asBraceMatrix() {
		return this.#e = 2, this;
	}
	canBeAdded(e) {
		let { rows: t, cols: n } = this.dimension, { rows: r, cols: i } = e.dimension;
		return t === r && n === i;
	}
	canBeInverted() {
		return this.isSquare() ? !this.determinant().isZero() : !1;
	}
	canBeMultiplied(e) {
		return this.dimension.cols === e.dimension.rows;
	}
	cofactor(e, t) {
		if (this.#n.length === 1) return this.createElement(1);
		let n = this.clone();
		return n.#n.splice(e, 1), n.#n.forEach((e) => {
			e.splice(t, 1);
		}), n.determinant().multiply((-1) ** (e + t));
	}
	get cols() {
		return Array.from({ length: this.dimension.cols }, (e, t) => Array.from({ length: this.dimension.rows }, (e, n) => this.#n[n][t].clone()));
	}
	determinant() {
		if (!this.isSquare()) throw new n("Matrix is not square");
		if (this.#n.length === 1) return this.#n[0][0].clone();
		let e = this.createElement(0);
		return this.#n[0].forEach((t, n) => {
			let r = this.cofactor(0, n);
			e.add(t.clone().multiply(r));
		}), e;
	}
	get dimension() {
		return {
			rows: this.#n.length,
			cols: this.#n.length > 0 ? this.#n[0].length : 0
		};
	}
	flat() {
		return this.#n.flat();
	}
	forEach(e) {
		this.#n.forEach((t, n) => {
			t.forEach((t, r) => {
				e(t, n, r);
			});
		});
	}
	#o(e, t) {
		return this.#n = Array.from({ length: e }, () => Array.from({ length: t }, () => this.createElement(0))), this;
	}
	#s(e) {
		if (e.startsWith("((") && e.endsWith("))")) return this.#s(e.substring(1, e.length - 1));
		let t = e.split("),(");
		return this.#n = t.map((e, n) => n === 0 && n === t.length - 1 ? e.slice(1, -1).split(",") : n === 0 ? e.substring(1).split(",") : n === t.length - 1 ? e.substring(0, e.length - 1).split(",") : e.split(",")).map((e) => e.map((e) => this.createElement(e))), this;
	}
	#c(e) {
		this.#n = [];
		let t = e[0].length;
		if (e.some((e) => e.length !== t)) throw new n("Each line must be the same length");
		return e.forEach((e) => {
			this.#n.push(e.map((e) => this.createElement(e)));
		}), this;
	}
	#l(...e) {
		this.#n = [];
		let t = e[0].dimension;
		if (e.some((e) => e.dimension !== t)) throw new n("Each vectors must be the same dimension");
		return this.#o(e[0].dimension, e.length), e.forEach((e, t) => {
			e.array.forEach((e, n) => {
				this.#n[n][t] = this.createElement(e);
			});
		}), this;
	}
	#u(e) {
		let { rows: t, cols: n } = this.dimension, r = 0;
		for (let i = 0; i < n && r < t; i++) {
			let n = -1;
			for (let e = r; e < t; e++) if (!this.#n[e][i].isZero()) {
				n = e;
				break;
			}
			if (n === -1) continue;
			n !== r && ([this.#n[r], this.#n[n]] = [this.#n[n], this.#n[r]]);
			let a = this.#n[r][i].clone();
			this.#n[r] = this.#n[r].map((e) => e.clone().divide(a).reduce());
			for (let n = e ? 0 : r + 1; n < t; n++) {
				if (n === r) continue;
				let e = this.#n[n][i].clone();
				e.isZero() || (this.#n[n] = this.#n[n].map((t, n) => t.clone().subtract(e.clone().multiply(this.#n[r][n])).reduce()));
			}
			r++;
		}
		return this;
	}
	inverse() {
		if (!this.canBeInverted()) throw new r("The matrix cannot be inverted.");
		let e = this.createInstance().#o(this.dimension.rows, this.dimension.cols);
		e.forEach((t, n, r) => {
			e.setValue(n, r, this.cofactor(n, r));
		});
		let t = e.transpose(), n = this.determinant();
		return t.forEach((e, t, r) => this.setValue(t, r, e.divide(n).reduce())), this;
	}
	isEqual(e) {
		if (!this.canBeAdded(e)) return !1;
		let t = !0;
		return this.forEach((n, r, i) => {
			t &&= n.isEqual(e.#n[r][i]);
		}), t;
	}
	isOne() {
		if (!this.isSquare()) return !1;
		for (let e = 0; e < this.#n.length; e++) for (let t = 0; t < this.#n[e].length; t++) if (t === e && !this.#n[e][t].isOne() || t !== e && !this.#n[e][t].isZero()) return !1;
		return !0;
	}
	isSquare() {
		return this.dimension.cols === this.dimension.rows;
	}
	isZero() {
		return this.flat().every((e) => e.isZero());
	}
	isConsistent() {
		if (this.#t === null) return !0;
		let e = this.#t;
		return !this.rowEchelonForm().rows.some((t) => t.slice(0, e).every((e) => e.isZero()) && t.slice(e).some((e) => !e.isZero()));
	}
	map(e) {
		let { rows: t, cols: n } = this.dimension, r = Array.from({ length: t }, () => Array.from({ length: n }, () => void 0));
		return this.#n.forEach((t, n) => {
			t.forEach((t, i) => {
				r[n][i] = e(t, n, i);
			});
		}), r;
	}
	multiply(t) {
		if (t instanceof e) {
			if (!this.canBeMultiplied(t)) throw new n("Cannot multiply a matrix with incompatibles dimensions");
			let e = this.createInstance().#o(this.dimension.rows, t.dimension.cols);
			return e.forEach((n, r, i) => {
				let a = this.createElement(0);
				this.#n[r].forEach((e, n) => {
					a.add(e.clone().multiply(t.#n[n][i]));
				}), e.#n[r][i] = a;
			}), this.#n = e.#n, this;
		}
		return this.forEach((e, n, r) => {
			this.setValue(n, r, e.multiply(t));
		}), this;
	}
	one() {
		return this.forEach((e, t, n) => {
			t === n ? e.one() : e.zero();
		}), this;
	}
	opposite() {
		return this.forEach((e) => e.opposite()), this;
	}
	get asPmatrix() {
		return this.#e = 0, this;
	}
	get asVmatrix() {
		return this.#e = 3, this;
	}
	get asDoubleVmatrix() {
		return this.#e = 4, this;
	}
	pow(e) {
		if (!Number.isSafeInteger(e)) throw new i("Can only raise item by an integer");
		if (e < 0) throw new i("Can only raise item by a non-negative integer");
		if (e === 0) return this.one();
		let t = this.clone();
		for (let n = 1; n < e; n++) this.multiply(t);
		return this;
	}
	rank() {
		return this.rowEchelonForm().rows.filter((e) => e.some((e) => !e.isZero())).length;
	}
	reduce() {
		return this.forEach((e) => e.reduce()), this;
	}
	reducedRowEchelonForm() {
		return this.clone().#u(!0);
	}
	rowEchelonForm() {
		return this.clone().#u(!1);
	}
	get rows() {
		return this.#n.map((e) => e.map((e) => e.clone()));
	}
	setValue(e, t, n) {
		let { rows: r, cols: i } = this.dimension;
		if (e < 0 || e >= r || t < 0 || t >= i) throw new s(`${e}x${t} is out of range (${r}x${i})`);
		return this.#n[e][t] = this.createElement(n), this;
	}
	subtract(e) {
		if (!this.canBeAdded(e)) throw new n("Cannot subtract a matrix with different dimensions.");
		return this.forEach((t, n, r) => {
			t.subtract(e.#n[n][r]);
		}), this;
	}
	withDigits(e) {
		l(e);
		for (let t of this.#n) for (let n of t) n.withDigits(e);
		return this;
	}
	transpose() {
		let { rows: e, cols: t } = this.dimension, n = this.createInstance().#o(t, e);
		return this.forEach((e, t, r) => {
			n.#n[r][t] = e.clone();
		}), n;
	}
	get values() {
		return this.#n.map((e) => e.map((e) => e.clone()));
	}
	withPartition(e) {
		let { cols: t } = this.dimension;
		if (e <= 0 || e >= t) throw new s(`Partition column ${e} is out of range (matrix has ${t} columns)`);
		return this.#t = e, this;
	}
	zero() {
		return this.forEach((e) => e.zero()), this;
	}
}, ct = [
	{
		token: "\\geq",
		sign: ">="
	},
	{
		token: "geq",
		sign: ">="
	},
	{
		token: "\\leq",
		sign: "<="
	},
	{
		token: "leq",
		sign: "<="
	},
	{
		token: ">=",
		sign: ">="
	},
	{
		token: "=>",
		sign: ">="
	},
	{
		token: "<=",
		sign: "<="
	},
	{
		token: "=<",
		sign: "<="
	},
	{
		token: ">",
		sign: ">"
	},
	{
		token: "<",
		sign: "<"
	},
	{
		token: "=",
		sign: "="
	}
], lt = {
	"=": "=",
	"<": ">",
	">": "<",
	"<=": ">=",
	">=": "<="
}, I = class e {
	#e;
	#t;
	#n;
	constructor(t, n, r) {
		this.#e = new M().zero(), this.#t = new M().zero(), this.#n = "=", t !== void 0 && n === void 0 ? this.parse(t) : t !== void 0 && n !== void 0 && this.copy(e.fromPolynoms(t, n, r));
	}
	parse(t) {
		return t instanceof e ? this.copy(t) : typeof t == "string" ? this.copy(e.fromString(t)) : this.copy(e.fromPolynoms(t, new M().zero()));
	}
	static fromString(t) {
		let n = e.#o(t), r = t.split(n);
		return e.fromPolynoms(new M(r[0]), new M(r[1]), e.#s(n));
	}
	static fromPolynoms(t, n, r) {
		let i = new e();
		return i.#e = new M(t), i.#t = new M(n), i.#n = e.#s(r), i;
	}
	copy(e) {
		return this.#e = e.#e.clone(), this.#t = e.#t.clone(), this.#n = e.#n, this;
	}
	clone() {
		return new e(this.#e.clone(), this.#t.clone(), this.#n);
	}
	withDigits(e) {
		return this.#e.withDigits(e), this.#t.withDigits(e), this;
	}
	get tex() {
		return `${this.#e.tex}${this.signAsTex}${this.#t.tex}`;
	}
	get display() {
		return `${this.#e.display}${this.signAsTex}${this.#t.display}`;
	}
	static isEquationString(e) {
		return e.includes("=") || e.includes("<") || e.includes(">") || e.includes("<=") || e.includes(">=");
	}
	static makeSolutionsUnique(e, t) {
		let n = [], r = e.filter((e) => !n.includes(e.tex) && (n.push(e.tex), !0));
		return t === !0 && r.sort((e, t) => e.value - t.value), r;
	}
	add(...e) {
		let t = this.clone();
		for (let n of e) t.#r(n);
		return this.#a(t);
	}
	#r(t) {
		if (t instanceof e) {
			this.#e.add(t.left), this.#t.add(t.right);
			return;
		}
		if (typeof t == "string" && !e.isEquationString(t)) {
			this.#r(new e(t));
			return;
		}
		let n = new M(t);
		this.#e.add(n), this.#t.add(n);
	}
	degree(e) {
		return g.max(this.#e.degree(e), this.#t.degree(e));
	}
	divide(...e) {
		let t = e.map((e) => new g(e)).filter((e) => !e.isZero()).map((e) => e.inverse());
		return this.multiply(...t);
	}
	evaluate(e, t = !1) {
		let n = this.#e.evaluate(e, t), r = this.#t.evaluate(e, t);
		if (t) {
			let e = n, t = r;
			switch (this.#n) {
				case "<": return e < t;
				case ">": return e > t;
				case "<=": return e <= t;
				case ">=": return e >= t;
				default: return e === t;
			}
		}
		return n.compare(r, this.#n);
	}
	hasVariable(e) {
		return this.variables.includes(e);
	}
	isEqual(t) {
		let n = new e(t);
		return this.#n === n.#n && n.left.isEqual(this.#e) && n.right.isEqual(this.#t);
	}
	isEquivalentTo(e) {
		let t = this.clone().moveLeft().simplify().left, n = e.clone().moveLeft().simplify().left;
		return t.isEqual(n) ? this.#n === e.#n : t.isOppositeAt(n) ? this.#n === lt[e.#n] : !1;
	}
	hasCrossTerm() {
		return this.#e.hasCrossTerm() || this.#t.hasCrossTerm();
	}
	canIsolate(e) {
		return this.degree(e).isOne() && !this.hasCrossTerm();
	}
	isolate(e) {
		if (!this.canIsolate(e)) throw new r(`Cannot isolate "${e ?? this.variables[0]}" in ${this.display}`);
		let t = e ?? this.variables[0], n = this.clone();
		n.#e.subtract(n.#t), n.#t.zero();
		for (let e of [...n.#e.monoms]) if (!e.hasVariable(t)) {
			let t = e.clone();
			n.#e.subtract(t), n.#t.subtract(t);
		}
		if (n.#e.length !== 1) throw new r(`Failed to isolate "${t}" in ${this.display}`);
		let i = n.#e.monoms[0].coefficient.clone();
		return n.#e.divide(i), n.#t.divide(i), n.#n !== "=" && i.isStrictlyNegative() && n.#c(), this.#a(n);
	}
	get left() {
		return this.#e;
	}
	set left(e) {
		this.#e = e;
	}
	moveLeft() {
		return this.#e = this.#e.clone().subtract(this.#t), this.#t = new M().zero(), this;
	}
	multiply(...e) {
		let t = this.clone();
		for (let n of e) {
			let e = new g(n);
			t.#e.multiply(e), t.#t.multiply(e), t.#n !== "=" && e.sign() === -1 && t.#c();
		}
		return this.#a(t);
	}
	get numberOfVars() {
		return this.variables.length;
	}
	opposite() {
		let e = this.#e.clone().opposite(), t = this.#t.clone().opposite();
		return this.#e = e, this.#t = t, this.#c();
	}
	pow(e) {
		let t = this.#e.clone().pow(e), n = this.#t.clone().pow(e);
		return this.#e = t, this.#t = n, this;
	}
	reduce() {
		let e = this.clone();
		return e.moveLeft(), e.#e.reduce(), e.simplify(), e.#e.monoms[0].coefficient.isNegative() && e.multiply(-1), this.#a(e);
	}
	reorder(e) {
		let t = this.#e.clone().subtract(this.#t), n = new M().zero();
		return t.reorder(), e ? (this.#e = t, this.#t = n, this) : (t.monoms.filter((e) => e.degree().isZero()).forEach((e) => {
			let r = e.clone();
			t.subtract(r), n.subtract(r);
		}), t.reorder(), n.reorder(), this.#e = t, this.#t = n, this);
	}
	replaceBy(e, t) {
		return this.#e.replaceBy(e, t), this.#t.replaceBy(e, t), this;
	}
	get right() {
		return this.#t;
	}
	set right(e) {
		this.#t = e;
	}
	get sign() {
		return this.#n;
	}
	set sign(t) {
		this.#n = e.#s(t);
	}
	get signAsTex() {
		return this.#n === ">=" ? "\\geq" : this.#n === "<=" ? "\\leq" : this.#n;
	}
	simplify() {
		let e = this.clone();
		return e.multiply(h.lcm(...e.#e.getDenominators(), ...e.#t.getDenominators())), e.divide(h.gcd(...e.#e.getNumerators(), ...e.#t.getNumerators())), this.#a(e);
	}
	solve() {
		return new et(this.clone()).solve();
	}
	split() {
		return [this.#e.clone(), this.#t.clone()];
	}
	subtract(...e) {
		let t = this.clone();
		for (let n of e) t.#i(n);
		return this.#a(t);
	}
	#i(t) {
		if (t instanceof e) {
			this.#e.subtract(t.left), this.#t.subtract(t.right);
			return;
		}
		if (typeof t == "string" && !e.isEquationString(t)) {
			this.#i(new e(t));
			return;
		}
		let n = new M(t);
		this.#e.subtract(n), this.#t.subtract(n);
	}
	test(e) {
		return this.left.evaluate(e).isEqual(this.right.evaluate(e));
	}
	get variables() {
		return [...new Set(this.#t.variables.concat(this.#e.variables))];
	}
	#a(e) {
		return this.#e = e.#e, this.#t = e.#t, this.#n = e.#n, this;
	}
	static #o(e) {
		let n = ct.find((t) => e.includes(t.token));
		if (n === void 0) throw new t("The equation is not valid (no sign found)");
		return n.token;
	}
	static #s(e) {
		return e === void 0 ? "=" : ct.find((t) => e.includes(t.token))?.sign ?? "=";
	}
	#c() {
		return this.#n = lt[this.#n], this;
	}
}, L = class e {
	#e;
	#t;
	#n;
	#r = !1;
	constructor(e, t) {
		this.#t = new M(), this.#n = new g(1), this.#e = 1, e !== void 0 && this.parse(e, t);
	}
	parse(t, n) {
		return t instanceof e ? this.copy(t) : typeof t == "string" ? this.copy(e.fromString(t)) : this.copy(e.fromPolynom(t)), n !== void 0 && this.#n.multiply(new g(n)), this;
	}
	static fromString(t) {
		return e.factorsFromString(t)[0];
	}
	copy(e) {
		return this.#t = e.#t.clone(), this.#n = e.#n.clone(), this;
	}
	clone() {
		let t = new e(this);
		return t.#e = this.#e, t.#r = this.#r, t;
	}
	withDigits(e) {
		return this.#t.withDigits(e), this;
	}
	get tex() {
		if (this.#e === 0 && this.#n.isNegative()) return `\\frac{ 1 }{ ${this.#i().tex} }`;
		let e = this.power.numerator, t = this.power.denominator, n, r;
		return this.#e === 0 && t > 1 ? (n = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, r = e === 1 ? "" : `^{ ${e} }`) : (n = this.#r && this.power.isOne() ? this.polynom.tex : u(this.polynom.tex), r = t === 1 && e === 1 ? "" : `^{ ${this.power.tex} }`), n = `${n}${r}`, n;
	}
	get display() {
		if (this.#e === 0 && this.#n.isNegative()) return `1/(${this.#i().display})`;
		let e = this.power.numerator, t = this.power.denominator, n, r;
		return this.#e === 0 && t > 1 ? (n = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, r = e === 1 ? "" : `^(${e})`) : (n = this.#r && this.power.isOne() ? this.polynom.display : u(this.polynom.display, !1), r = t === 1 && e === 1 ? "" : `^(${this.power.display})`), n = `${n}${r}`, n;
	}
	#i() {
		let e = this.clone().inverse();
		return e.power.isOne() ? e.asSingle : e;
	}
	add() {
		throw new r("Adding two factors is not possible");
	}
	get asSingle() {
		return this.#r = !0, this;
	}
	degree(e) {
		return this.polynom.degree(e).multiply(this.power);
	}
	derivative() {
		throw new o("Factor.derivative() is not supported — use getDerivativeFactors() and compose via PolyFactor");
	}
	getDerivativeFactors() {
		return this.power.isZero() ? [new e("0")] : this.power.isOne() ? [new e(this.polynom.clone().derivative())] : [
			new e(this.power.clone()),
			new e(this.polynom.clone().derivative()),
			new e(this.polynom.clone(), this.power.clone().subtract(1))
		];
	}
	develop() {
		if (this.power.isNatural()) return this.polynom.clone().pow(this.power.value);
		throw new r("The power must be a natural number");
	}
	divide(t) {
		return this.multiply(new e(t).inverse());
	}
	evaluate(e, t) {
		return t ? this.polynom.evaluate(e, !0) ** this.power.value : this.polynom.evaluate(e).pow(this.power);
	}
	static fromPolynom(t) {
		let n = new e();
		return n.#t = new M(t), n.#n = new g(1), n;
	}
	hasVariable(e) {
		return this.polynom.hasVariable(e);
	}
	inverse() {
		return this.#n.opposite(), this;
	}
	isEqual(e) {
		return this.isSameAs(e) && this.power.isEqual(e.power);
	}
	isOne() {
		return this.polynom.isOne() || this.power.isZero();
	}
	isSameAs(t) {
		let n;
		return n = t instanceof e ? t.polynom : t instanceof M ? t : new M(t), this.polynom.isEqual(n);
	}
	isZero() {
		return this.polynom.isZero();
	}
	multiply(t) {
		let n = new e(t);
		if (this.polynom.monoms.length === 1 && this.power.isOne() && n.polynom.monoms.length === 1 && n.power.isOne()) return this.#t.multiply(n.polynom), this;
		if (t instanceof e && this.isSameAs(t)) return this.#n.add(t.power), this;
		if (this.isSameAs(n.polynom)) return this.#n.add(1), this;
		throw new r("The two factors must be the same");
	}
	one() {
		return this.#t.one(), this.#n.one(), this;
	}
	opposite() {
		throw new o("Factor has no sign: use PolyFactor to represent the negation");
	}
	get polynom() {
		return this.#t.clone();
	}
	set polynom(e) {
		this.#t = e;
	}
	pow(e) {
		return this.#n.multiply(e), this;
	}
	get power() {
		return this.#n.clone();
	}
	set power(e) {
		this.#n = new g(e);
	}
	primitive() {
		throw new o("Factor.primitive() is not applicable in the general case — use PolyFactor");
	}
	reduce() {
		throw new o("Factor.reduce() is not applicable — use PolyFactor.reduce()");
	}
	root(e) {
		return this.#n.divide(e), this;
	}
	sqrt() {
		return this.root(2);
	}
	subtract() {
		throw new r("Subtracting two factors is not possible");
	}
	get variables() {
		return this.polynom.variables;
	}
	get asPower() {
		return this.#e = 1, this;
	}
	get asRoot() {
		return this.#e = 0, this;
	}
	zero() {
		return this.#t.zero(), this.#n.one(), this;
	}
	static checkParseAsFactors(e) {
		let t = p(e, "+");
		if (t[0] === "" && t.shift(), t.length > 1) return !1;
		let n = p(e, "-");
		return n[0] === "" && n.shift(), !(n.length > 1);
	}
	static factorsFromString(t, n = !0) {
		if (!e.checkParseAsFactors(t)) {
			let r = new e();
			return r.#t = new M(t), r.#n = new g(n ? 1 : -1), [r];
		}
		let r = n ? 1 : -1, i = [];
		for (let n of t.matchAll(/\(([^)]+)\)(?:\^(-?[0-9]+(?:\/[0-9]+)?|\(-?[0-9]+(?:\/[0-9]+)?\)))?|([^(]+)/g)) {
			let t = n.at(1), a = n.at(3)?.trim();
			if (t !== void 0) {
				let a = (n.at(2) ?? "1").replace(/[()]/g, "");
				i.push(new e(new M(t), new g(a).multiply(r)));
			} else a && i.push(new e(new M(a), new g(r)));
		}
		return i;
	}
}, R = /* @__PURE__ */ function(e) {
	return e[e.ROOT = 0] = "ROOT", e[e.POWER = 1] = "POWER", e;
}({}), z = class e extends st {
	constructor(e, t) {
		typeof e == "number" || e === void 0 ? super(e, t) : (super(), this.parse(e));
	}
	static fromString(t) {
		return new e(t);
	}
	static fromValues(t) {
		return new e(t);
	}
	static fromDimensions(t, n) {
		return new e(t, n);
	}
	static fromVectors(...t) {
		return new e().parse(t);
	}
	createElement(e) {
		return e === void 0 ? new g(0) : new g(e);
	}
	createInstance() {
		return new e();
	}
}, ut = class e {
	#e;
	#t = null;
	#n;
	constructor(...e) {
		return this.#e = [], this.#n = [], e.length > 0 && this.parse(...e), this;
	}
	parse(...e) {
		return this.fromEquations(...e.map((e) => new I(e)));
	}
	fromEquations(...e) {
		let t = [...new Set(e.flatMap((e) => e.variables))].sort(), n = e.map((e) => {
			let n = e.clone().reorder(), r = t.map((e) => n.left.monomByVariable(e).coefficient), i = n.right.monoms[0].coefficient;
			return [...r, i];
		});
		return this.fromComponents(n, t.join(""));
	}
	fromComponents(e, t = "xyz") {
		if (e.length === 0) throw new n("Matrix must have at least one row");
		let r = e[0].length;
		if (e.some((e) => e.length !== r)) throw new n("All rows must have the same number of columns");
		let i = t.split("").slice(0, r - 1);
		return this.#e = e.map((e) => new I(new M(i.join(""), ...e.slice(0, -1)), e[e.length - 1])), this.#r(), this;
	}
	fromMatrix(e, t = "xyz") {
		return this.fromComponents(e.rows, t);
	}
	fromVectors(...e) {
		return this.fromMatrix(z.fromVectors(...e));
	}
	copy() {
		throw new a("copy() is not yet implemented for LinearSystem");
	}
	clone() {
		let t = new e();
		return t.#e = this.#e.map((e) => e.clone()), t.#n = [...this.#n], t.#t = this.#t, t;
	}
	withDigits(e) {
		return this.#t = l(e), this.#e.forEach((t) => t.withDigits(e)), this;
	}
	get tex() {
		let e = this.clone().reorder().withDigits(this.#t);
		return this.buildTex(e.equations);
	}
	get display() {
		let e = this.clone().reorder().withDigits(this.#t);
		return this.#o(e.equations, "display");
	}
	static solutionAsDisplay(e) {
		return `(${e.map((e) => e.display).join(";")})`;
	}
	static solutionAsTex(e) {
		return `\\left( ${e.map((e) => e.tex).join(" ; ")} \\right)`;
	}
	add(t, r) {
		if (t instanceof e) {
			let e = t.equations.length;
			if (e !== this.#e.length) throw new n("The number of equations must be the same");
			for (let n = 0; n < e; n++) this.#e[n].add(t.equations[n]);
		} else {
			if (r === void 0 || r < 0 || r >= this.#e.length) throw new s("Index out of range");
			let e = new I(t);
			this.#e[r].add(e);
		}
		return this;
	}
	buildTex(e, t) {
		return this.#o(e, "tex", t);
	}
	degree(e) {
		return g.max(...this.#e.map((t) => t.degree(e)));
	}
	get equations() {
		return this.#e.map((e) => e.clone());
	}
	set equations(e) {
		this.#e = e, this.#r();
	}
	evaluate() {
		throw new a("Method not implemented.");
	}
	hasVariable(e) {
		return this.#n.includes(e);
	}
	isEqual(e) {
		return this.equations.every((t, n) => t.isEqual(e.equations[n]));
	}
	isSolvable() {
		let e = this.toAugmentedMatrix();
		return e.isConsistent() && e.rank() === this.#n.length;
	}
	get matrix() {
		let [e, t] = this.#i();
		return [z.fromValues(e), new F(...t)];
	}
	toAugmentedMatrix() {
		let [e, t] = this.#i();
		return z.fromValues(e.map((e, n) => [...e, t[n]])).withPartition(this.#n.length);
	}
	mergeEquations(e, t) {
		let n = this.equations[e.id].clone().multiply(e.factor), r = this.equations[t.id].clone().multiply(t.factor);
		return n.add(r);
	}
	multiply(e, t) {
		if (Array.isArray(e)) {
			if (e.length !== this.#e.length) throw new n("The number of values must be the same as the number of equations");
			for (let t = 0; t < e.length; t++) this.#e[t].multiply(e[t]);
			return this;
		}
		if (t === void 0 || t < 0 || t >= this.#e.length) throw new s("Index out of range");
		return this.#e[t].multiply(e), this;
	}
	reduce() {
		return this.#e.forEach((e) => e.reduce()), this;
	}
	reorder() {
		for (let e of this.#e) e.reorder();
		return this;
	}
	solve() {
		let e = this.toAugmentedMatrix();
		if (!e.isConsistent()) return [];
		if (e.rank() < this.#n.length) return this.#a();
		let t = e.reducedRowEchelonForm();
		return this.#a(t.rows.slice(0, this.#n.length));
	}
	solve_compute_factors(e) {
		let t = [], n = this.equations.map((t) => t.left.monomByVariable(e).coefficient.value);
		return n.forEach((e, r) => {
			for (let i = r + 1; i < n.length; i++) {
				let a = h.lcm(e, n[i]), o = e < 0 ? -1 : 1;
				t.push([{
					id: r,
					factor: o * a / e
				}, {
					id: i,
					factor: -o * a / n[i]
				}]);
			}
		}), t.sort((e, t) => Math.abs(e[0].factor) + Math.abs(e[1].factor) - (Math.abs(t[0].factor) + Math.abs(t[1].factor)));
	}
	subtract(t, r) {
		if (t instanceof e) {
			let e = t.equations.length;
			if (e !== this.#e.length) throw new n("The number of equations must be the same");
			for (let n = 0; n < e; n++) this.#e[n].subtract(t.equations[n]);
		} else {
			if (r === void 0 || r < 0 || r >= this.#e.length) throw new s("Index out of range");
			let e = new I(t);
			this.#e[r].subtract(e);
		}
		return this;
	}
	get variables() {
		return this.#n;
	}
	set variables(e) {
		let t = typeof e == "string" ? e.split("") : [...e];
		t.sort(), this.#n = t;
	}
	#r() {
		return this.#n = this.#e.reduce((e, t) => [.../* @__PURE__ */ new Set([...e, ...t.variables])], []), this.#n.sort(), this;
	}
	#i() {
		let e = [], t = [];
		for (let n of this.#e) {
			let r = [], i = n.clone().reorder();
			for (let e of this.variables) {
				let t = i.left.monomByVariable(e);
				r.push(t.coefficient);
			}
			t.push(i.right.monoms[0].coefficient), e.push(r);
		}
		return [e, t];
	}
	#a(e) {
		let t = [];
		return e ? (e.forEach((e, n) => {
			let r = k.fromFraction(e[e.length - 1]);
			r.variable = this.variables[n], t.push(r);
		}), t) : (this.variables.forEach((e) => {
			let n = k.fromFraction(Infinity);
			n.variable = e, t.push(n);
		}), t);
	}
	#o(e, t, n) {
		let r = [];
		for (let t of e) r = r.concat(t.variables);
		r = [...new Set(r)].sort();
		let i = [];
		for (let a = 0; a < e.length; a++) {
			let o = e[a], s = [];
			for (let e of r) {
				let n = o.left.monomByVariable(e);
				if (s.length === 0) s.push(n.isZero() ? "" : t === "tex" ? n.tex : n.display);
				else {
					let e = n.coefficient.sign() === 1 ? "+" : "";
					s.push(n.isZero() ? "" : e + (t === "tex" ? n.tex : n.display));
				}
			}
			if (s.push("="), s.push(t === "tex" ? o.right.tex : o.right.display), t === "tex" && n?.[a] !== void 0) {
				s[s.length - 1] = s[s.length - 1] + " \\phantom{\\quad}";
				for (let e of n[a]) s.push(`\\ \\cdot\\ ${e.startsWith("-") ? "\\left(" + e + "\\right)" : e}`);
			}
			i.push(t === "tex" ? s.join("&") : `(${s.join(",")})`);
		}
		if (t === "tex") {
			let e = n?.[0]?.length ?? 0;
			return `\\left\\{\\begin{array}{${"r".repeat(r.length)}cl ${"|l".repeat(e)}}${i.join("\\\\ ")}\\end{array}\\right.`;
		}
		return `{${i.join(",")}:}`;
	}
}, dt = class e {
	#e;
	#t = "E";
	constructor(e) {
		return this.#e = [], e !== void 0 && this.parse(e), this;
	}
	static fromString(n) {
		let r = new e();
		try {
			r.#e = new S(x.SET).parse(n).rpn;
		} catch (e) {
			throw new t(`Cannot parse "${n}" as a LogicalSet`, { cause: e });
		}
		return r;
	}
	parse(t) {
		return this.copy(e.fromString(t));
	}
	clone() {
		let t = new e();
		return t.#e = this.#e.map((e) => ({ ...e })), t.#t = this.#t, t;
	}
	copy(e) {
		return this.#e = e.#e.map((e) => ({ ...e })), this;
	}
	withUniverse(e) {
		return this.#t = e, this;
	}
	#n(e) {
		let t = e === "tex" ? "\\cap" : "∩", n = e === "tex" ? "\\cup" : "∪", r = e === "tex" ? "\\setminus" : "\\", i = (t) => e === "tex" ? `\\overline{ ${t} }` : `overline(${t})`, a = [];
		for (let e of this.#e) if (e.tokenType === "variable") a.push({ ...e });
		else switch (e.token) {
			case "&":
				if (a.length >= 2) {
					let e = a.pop(), n = a.pop();
					e && n && (n.tokenType === "mix" && (n.token = `( ${n.token} )`), e.tokenType === "mix" && (e.token = `( ${e.token} )`), a.push({
						token: `${n.token} ${t} ${e.token}`,
						tokenType: "mix"
					}));
				}
				break;
			case "|":
				if (a.length >= 2) {
					let e = a.pop(), t = a.pop();
					e && t && (t.tokenType === "mix" && (t.token = `( ${t.token} )`), e.tokenType === "mix" && (e.token = `( ${e.token} )`), a.push({
						token: `${t.token} ${n} ${e.token}`,
						tokenType: "mix"
					}));
				}
				break;
			case "-":
				if (a.length >= 2) {
					let e = a.pop(), t = a.pop();
					e && t && (t.tokenType === "mix" && (t.token = `( ${t.token} )`), e.tokenType === "mix" && (e.token = `( ${e.token} )`), a.push({
						token: `${t.token} ${r} ${e.token}`,
						tokenType: "mix"
					}));
				}
				break;
			case "!": if (a.length >= 1) {
				let e = a.pop();
				e && a.push({
					token: i(e.token),
					tokenType: "variable"
				});
			}
		}
		return a.length === 0 ? "" : a[0].token;
	}
	get tex() {
		return this.#n("tex");
	}
	get display() {
		return this.#n("display");
	}
	evaluate(e) {
		let t = { ...e };
		this.variables.forEach((e) => {
			Object.hasOwn(t, e) || (t[e] = !1);
		});
		let n = [];
		for (let e of this.#e) if (e.tokenType === "variable") n.push(t[e.token]);
		else if (e.tokenType === "operation") if (e.token === "!") if (n.length >= 1) {
			let e = n.pop();
			n.push(!e);
		} else return !1;
		else {
			let t = n.pop(), r = n.pop();
			if (t !== void 0 && r !== void 0) switch (e.token) {
				case "&":
					n.push(t && r);
					break;
				case "|":
					n.push(t || r);
					break;
				case "-": n.push(r && !t);
			}
			else return !1;
		}
		return n.length === 1 && n[0];
	}
	get rpn() {
		return this.#e;
	}
	get variables() {
		return [...new Set(this.#e.filter((e) => e.tokenType === "variable").map((e) => e.token))];
	}
	venn(...e) {
		if (e.length === 0) throw new i("venn() requires at least one variable");
		let t = [...new Set(e)].sort();
		if (t.some((e) => e.length !== 1)) throw new i("venn() variables must be single characters");
		let n = t.length, r = {}, a = [];
		for (let e = 1; e < 1 << n; e++) {
			let n = t.filter((t, n) => e & 1 << n).join("");
			a.push(n), t.forEach((t, i) => {
				e & 1 << i && (r[t] ??= []).push(n);
			});
		}
		return this.#r(r, [...a, this.#t]);
	}
	vennAB() {
		return this.venn("A", "B");
	}
	vennABC() {
		return this.venn("A", "B", "C");
	}
	#r(e, t) {
		let n = [], r;
		if (t === void 0) {
			r = /* @__PURE__ */ new Set();
			for (let t in e) r = /* @__PURE__ */ new Set([...r, ...e[t] ?? []]);
		} else r = new Set(t);
		for (let t of this.#e) if (t.tokenType === "variable") n.push(new Set(e[t.token] ?? []));
		else switch (t.token) {
			case "&":
				if (n.length >= 2) {
					let e = n.pop(), t = n.pop();
					t && e && n.push(new Set([...t].filter((t) => e.has(t))));
				}
				break;
			case "|":
				if (n.length >= 2) {
					let e = n.pop(), t = n.pop();
					t && e && n.push(/* @__PURE__ */ new Set([...t, ...e]));
				}
				break;
			case "-":
				if (n.length >= 2) {
					let e = n.pop(), t = n.pop();
					t && e && n.push(new Set([...t].filter((t) => !e.has(t))));
				}
				break;
			case "!": if (n.length >= 1) {
				let e = n.pop();
				e && n.push(new Set([...r].filter((t) => !e.has(t))));
			}
		}
		return n.length === 0 ? [] : [...n[0]].sort();
	}
}, ft = class e {
	#e = R.POWER;
	#t = [];
	constructor(...t) {
		this.#t = [], t.forEach((t) => {
			typeof t == "string" ? this.#t.push(...e.fromString(t).factors) : t instanceof e ? this.#t.push(...t.factors) : this.#t.push(new L(t));
		});
	}
	parse(t) {
		return typeof t == "string" ? this.copy(e.fromString(t)) : t instanceof e ? this.copy(t) : this.copy(e.fromFactors(t));
	}
	copy(e) {
		return this.#t = e.factors, this;
	}
	clone() {
		let t = new e();
		return t.#t = this.factors, t.#e = this.#e, t;
	}
	withDigits(e) {
		return this.#t.forEach((t) => t.withDigits(e)), this;
	}
	get tex() {
		return this.#i((e) => e.tex, (e, t) => `\\frac{ ${e} }{ ${t} }`);
	}
	get display() {
		return this.#i((e) => e.display, (e, t) => `(${e})/(${t})`);
	}
	static #n(t, n) {
		let r = B(t), i = B(n), a = Object.keys(r).filter((e) => Object.hasOwn(i, e)).map((e) => {
			let t = r[e].reduce((e, t) => e.add(t.power), new g("0")), n = i[e].reduce((e, t) => e.add(t.power), new g("0"));
			return new L(e, g.min(t, n));
		});
		return new e(...a);
	}
	static #r(t, n) {
		let r = B(t), i = B(n), a = [.../* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(i)])].map((e) => {
			let t = Object.hasOwn(r, e) ? r[e].reduce((e, t) => e.add(t.power), new g("0")) : new g(0), n = Object.hasOwn(i, e) ? i[e].reduce((e, t) => e.add(t.power), new g("0")) : new g(0);
			return new L(e, g.max(t, n));
		});
		return new e(...a);
	}
	static gcd(...t) {
		if (t.length === 0) return new e().one();
		if (t.length === 1) return t[0].clone();
		if (t.length === 2) return e.#n(t[0], t[1]);
		let n = t[0];
		return t.shift(), t.forEach((t) => n = e.#n(n, t)), n;
	}
	static lcm(...t) {
		if (t.length === 0) return new e().one();
		if (t.length === 1) return t[0].clone();
		let n = t[0];
		return t.shift(), t.forEach((t) => n = e.#r(n, t)), n;
	}
	add(...t) {
		let n = [this.numerator, ...t.map((e) => e.numerator)], r = [this.denominator, ...t.map((e) => e.denominator)], i;
		if (r.some((e) => e.factors.length > 0)) {
			let t = e.lcm(...r);
			n.forEach((e, n) => {
				e.multiply(t.clone().divide(r[n]));
			}), i = t;
		}
		let a = e.gcd(...n), o = new M(0).add(...n.map((e) => e.divide(a).reduce().develop().factors[0].polynom)).reduce();
		return this.#t = [...a.factors, new L(o)], i && this.divide(i), this.#t = this.#t.filter((e) => !e.power.isZero()), this;
	}
	get asPower() {
		return this.#e = R.POWER, this;
	}
	get asRoot() {
		return this.#e = R.ROOT, this;
	}
	degree(e) {
		return this.#t.reduce((t, n) => t.add(n.degree(e)), new g("0"));
	}
	get denominator() {
		return new e(...this.#t.filter((e) => e.power.isNegative()).map((e) => e.clone().inverse()));
	}
	derivative() {
		let t = [], n = this.#t.length;
		for (let r = 0; r < n; r++) {
			let n = this.#t.slice(), i = n.splice(r, 1)[0].getDerivativeFactors();
			t.push(new e(...n, ...i));
		}
		t.forEach((e) => e.reduce());
		let r = t.shift();
		return r !== void 0 && (this.#t = r.factors), this.add(...t);
	}
	develop() {
		let t = new M("1"), n = new M("1");
		return this.numerator.factors.forEach((e) => {
			t.multiply(e.develop());
		}), this.denominator.factors.forEach((e) => {
			n.multiply(e.develop());
		}), e.fromPolynom(t, n);
	}
	divide(...e) {
		for (let t of e) this.#t = this.#t.concat(t.factors.map((e) => e.inverse()));
		return this;
	}
	evaluate(e, t) {
		return t ? this.#t.reduce((n, r) => n * r.evaluate(e, t), 1) : this.#t.reduce((t, n) => t.multiply(n.evaluate(e)), new g("1"));
	}
	factorize(t) {
		let n = [];
		this.#t.forEach((e) => {
			let r = e.polynom.factorize(t);
			if (r.length > 1) {
				let t = e.power.clone();
				n.push(...r.map((e) => new L(e, t)));
			} else n.push(e.clone());
		});
		let r = new e(...n), i = r.numerator.reduce(), a = r.denominator.reduce();
		return i.divide(a);
	}
	get factors() {
		return this.#t.map((e) => e.clone());
	}
	set factors(e) {
		this.#t = e;
	}
	static fromPolynom(t, n) {
		let i = new e();
		if (i.#t = [new L(new M(t))], n) {
			let e = new M(n);
			if (e.isOne()) return i;
			if (e.isZero()) throw new r("Cannot divide by zero");
			i.#t.push(new L(e, -1));
		}
		return i;
	}
	static fromFactors(...t) {
		let n = new e();
		return n.#t = t.map((e) => new L(e)), n;
	}
	static fromString(n) {
		let r = new e(), [i, ...a] = p(n, "/");
		if (i === "") throw new t("Parsing a PolyFactor from a string requires a numerator");
		if (a.length > 1) throw new t("Parsing a PolyFactor from a string only allows max one signe \"/\"");
		return r.#t = a.length === 0 ? L.factorsFromString(d(i), !0) : [...L.factorsFromString(d(i), !0), ...L.factorsFromString(d(a[0]), !1)], r;
	}
	get roots() {
		let e = [].concat(...this.#t.map((e) => e.polynom.roots));
		return e.sort((e, t) => e.value - t.value), e.filter((e, t, n) => t === n.findIndex((t) => t.value === e.value));
	}
	hasVariable(e) {
		return this.#t.some((t) => t.hasVariable(e));
	}
	inverse() {
		return this.#t = this.#t.map((e) => e.inverse()), this;
	}
	isEqual(t) {
		let n = e.gcd(this, t), r = this.clone().divide(n).reduce(), i = t.clone().divide(n).reduce();
		return r.isOne() && i.isOne();
	}
	isOne() {
		return this.#t.every((e) => e.isOne());
	}
	isZero() {
		return this.#t.some((e) => e.isZero());
	}
	multiply(...t) {
		let n = t.flatMap((t) => new e(t).factors);
		return this.#t = this.#t.concat(n), this;
	}
	get numerator() {
		return new e(...this.#t.filter((e) => e.power.isPositive()));
	}
	one() {
		return this.#t = [new L("1", "1")], this;
	}
	opposite() {
		let e = new L(-1), t = this.#t.findIndex((t) => t.isEqual(e));
		return t >= 0 ? this.#t.splice(t, 1) : this.#t.push(new L("-1", "1")), this;
	}
	pow(e) {
		return this.#t = this.#t.map((t) => t.pow(e)), this;
	}
	primitive() {
		throw new a("Method not implemented.");
	}
	reduce() {
		let e = B(this);
		this.#t = Object.values(e).map((e) => {
			let t = e[0].polynom;
			return new L(t, e.reduce((e, t) => e.add(t.power), new g("0")).reduce());
		}).filter((e) => !e.power.isZero());
		let t = new L(1), n = new L(1), r = this.#t.filter((e) => e.polynom.monoms.length === 1 && e.power.isRelative());
		if (r.length > 0) {
			r.forEach((e) => {
				e.power.isPositive() ? t.multiply(new L(e.polynom.clone().pow(e.power.value))) : n.multiply(new L(e.polynom.clone().pow(-e.power.value)));
			}), this.#t = this.#t.filter((e) => !(e.polynom.monoms.length === 1 && e.power.isRelative()));
			let [e] = t.polynom.monoms, [i] = n.polynom.monoms;
			if (!e.containsRationalPower() && !i.containsRationalPower()) {
				let r = j.gcd(e, i);
				r.isOne() || (t = new L(M.fromMonoms(e.divide(r))), n = new L(M.fromMonoms(i.divide(r))));
			}
			n.polynom.isOne() || this.#t.push(n.inverse()), t.polynom.isOne() || this.#t.push(t);
		}
		return this;
	}
	root(e) {
		return this.#t = this.#t.map((t) => t.root(e)), this;
	}
	sort(e) {
		return this.#t.forEach((t) => {
			t.polynom = t.polynom.reorder(e);
		}), this.#t.sort((t, n) => {
			let r = t.power.value, i = n.power.value;
			if (r * i < 0) return -r;
			let a = t.polynom.monoms.length, o = n.polynom.monoms.length;
			if (a !== o) return a - o;
			let s = t.polynom.degree(e).value, c = n.polynom.degree(e).value;
			return s === c ? r === i ? t.polynom.degree(e).isOne() && n.polynom.degree(e).isOne() ? t.polynom.monoms[1].coefficient.clone().opposite().divide(t.polynom.monoms[0].coefficient).value - n.polynom.monoms[1].coefficient.clone().opposite().divide(n.polynom.monoms[0].coefficient).value : t.degree().isLeq(n.degree()) ? -1 : 1 : r - i : s - c;
		}), this;
	}
	sqrt() {
		return this.#t = this.#t.map((e) => e.sqrt()), this;
	}
	subtract(...e) {
		return this.add(...e.map((e) => e.opposite()));
	}
	get variables() {
		return [...new Set(this.#t.reduce((e, t) => e.concat(t.variables), []))];
	}
	zero() {
		return this.#t = [new L("0", "1")], this;
	}
	#i(e, t) {
		let { num: n, den: r } = this.#a(), i = (t) => t.length === 1 ? e(t[0].asSingle) : t.map((t, n) => pt(t, n) ? e(t.asSingle) : e(t)).join(""), a = i(n);
		return r.length === 0 ? a : t(a, i(r));
	}
	#a() {
		let e, t = [];
		return this.#e === R.ROOT ? (e = this.numerator.factors, t = this.denominator.factors) : e = this.factors, e.length === 0 && (e = [new L("1")]), {
			num: e,
			den: t
		};
	}
};
function pt(e, t) {
	return !e.power.isOne() || e.polynom.monoms.length !== 1 ? !1 : t === 0 || e.polynom.degree().value > 0 && !e.polynom.monoms[0].coefficient.isStrictlyNegative();
}
function B(e) {
	let t = new g(1), n = new g(1), r = e.factors.reduce((e, r) => {
		if (r.polynom.degree().isZero() && r.power.isRelative()) {
			let i = r.polynom.monoms[0].coefficient.pow(r.power.clone().abs());
			return r.power.isPositive() ? t.multiply(i) : n.multiply(i), e;
		}
		let i = r.polynom.display;
		return Object.hasOwn(e, i) ? e[i].push(r) : e[i] = [r], e;
	}, {}), { numerator: i, denominator: a } = t.divide(n).reduce();
	return i !== 1 && (r[i.toString()] = [new L(i, 1)]), a !== 1 && (r[a.toString()] = [new L(a, -1)]), r;
}
//#endregion
//#region src/algebra/polyMatrix.ts
var mt = class e extends st {
	constructor(e, t) {
		typeof e == "number" || e === void 0 ? super(e, t) : (super(), this.parse(e));
	}
	static fromString(t) {
		return new e().parse(t);
	}
	static fromValues(t) {
		return new e().parse(t);
	}
	static fromDimensions(t, n) {
		return new e(t, n);
	}
	static fromVectors(...t) {
		return new e().parse(t);
	}
	static fromMatrix(t) {
		return e.fromValues(t.values.map((e) => e.map((e) => e.display)));
	}
	createElement(e) {
		return e === void 0 ? new M() : new M(e);
	}
	createInstance() {
		return new e();
	}
	characteristic_polynom(t) {
		if (!this.isSquare()) throw new n("characteristic_polynom requires a square matrix");
		return t ??= "k", this.clone().subtract(new e(this.dimension.rows).one().multiply(new M(t))).determinant();
	}
}, ht = /* @__PURE__ */ function(e) {
	return e.None = "none", e.Parallel = "parallel", e.Perpendicular = "perpendicular", e.Tangent = "tangent", e;
}({});
//#endregion
//#region src/randomization/rndHelpers.ts
function gt(e = .5) {
	return Math.random() < e;
}
function V(e, t, n) {
	if (t === void 0) return e >= 0 ? V(0, e) : V(e, 0);
	if (e > t && ([e, t] = [t, e]), e === t) return e;
	if (n === void 0) return Math.floor(Math.random() * (t - e + 1) + e);
	if (Math.abs(t - e) + 1 <= n.length) throw new i("The number of excluded values is too high.");
	let r = V(e, t);
	for (; n.includes(r);) r = V(e, t);
	return r;
}
function H(e, t) {
	return t === !1 ? gt() ? V(1, e) : -V(1, e) : V(-e, e);
}
function _t(e, t) {
	let n = h.pythagoreanTripletsWithTarget(e).filter((e) => t === !0 || !e.includes(0));
	return n.length === 0 ? null : U(n);
}
function vt(e) {
	let t = h.primes();
	return e !== void 0 && (t = t.filter((t) => t < e)), U(t);
}
function yt(e, t = 1) {
	return bt(e).slice(0, t);
}
function U(e) {
	if (e.length === 0) throw new i("Cannot pick a random item from an empty array.");
	return e[V(0, e.length - 1)];
}
function bt(e) {
	let t = Object.values(e);
	for (let e = t.length - 1; e > 0; e--) {
		let n = Math.floor(Math.random() * (e + 1)), r = t[e];
		t[e] = t[n], t[n] = r;
	}
	return t;
}
//#endregion
//#region src/geometry/line.ts
var W = class e {
	static PARALLEL = ht.Parallel;
	static PERPENDICULAR = ht.Perpendicular;
	#e;
	#t;
	#n;
	#r;
	#i;
	#a = 1;
	#o = null;
	constructor(...e) {
		return this.#t = new g(0), this.#n = new g(0), this.#r = new g(0), this.#e = new F(), this.#i = "lr", e.length > 0 && this.parse(...e), this;
	}
	parse(...n) {
		if (n.length === 0) return this;
		if (n.length === 1) {
			if (n[0] instanceof e) return this.copy(n[0]);
			if (n[0] instanceof I) return this.copy(e.fromEquation(n[0]));
			if (typeof n[0] == "string") try {
				return this.copy(e.fromEquation(n[0]));
			} catch (e) {
				throw new t(`Cannot parse "${n[0]}" as a Line`, { cause: e });
			}
		}
		if (n.length === 2) {
			if (n[0] instanceof P && n[1] instanceof P) return this.copy(e.fromPoints(n[0], n[1]));
			if (n[0] instanceof P && n[1] instanceof F) return this.copy(e.fromPointAndDirection(n[0], n[1]));
		}
		if (n.length === 3 && n.every((e) => g.isFraction(e))) return this.copy(e.fromCoefficient(n[0], n[1], n[2]));
		throw new t("Cannot parse arguments as a Line");
	}
	copy(e) {
		return this.#t = e.#t.clone(), this.#n = e.#n.clone(), this.#r = e.#r.clone(), this.#e = e.#e.clone(), this.#i = e.#i, this.#a = 1, this.#o = null, this;
	}
	clone() {
		let t = new e();
		return t.copy(this), t.#a = this.#a, t.#o = this.#o, t;
	}
	get tex() {
		let e = this.#a;
		return this.#a = 1, this.#s("tex", e, this.#o);
	}
	get display() {
		let e = this.#a;
		return this.#a = 1, this.#s("display", e, this.#o);
	}
	#s(e, t, n) {
		if (n !== null) switch (t) {
			case 0: return this.#c(!1, n) + "=" + (-this.#r.value).toFixed(n);
			case 2: return this.#l(n);
			case 3: {
				let t = this.d.clone().simplify(), r = this.#e.x.value.toFixed(n), i = this.#e.y.value.toFixed(n), a = t.x.value.toFixed(n), o = t.y.value.toFixed(n);
				return e === "tex" ? `${F.asTex("x", "y")} = ${F.asTex(r, i)} + k\\cdot ${F.asTex(a, o)}` : `((x,y))=((${r},${i}))+k((${a},${o}))`;
			}
			case 4: {
				let t = this.d.clone().simplify(), r = this.#u(this.#e.x, t.x, n), i = this.#u(this.#e.y, t.y, n);
				return e === "tex" ? `\\left\\{\\begin{aligned}\n\tx &= ${r}\\\\\n\ty &= ${i}\n\\end{aligned}\\right.` : `{(x,=,${r}),(y,=,${i}):}`;
			}
			default: return this.#c(!0, n) + "=0";
		}
		switch (t) {
			case 0: return this.getEquation().reorder()[e];
			case 2: return this.slope.isInfinity() ? "x=" + this.OA.x[e] : "y=" + new M().parse("x", this.slope, this.height)[e];
			case 3: {
				let t = this.d.clone().simplify();
				return e === "tex" ? `${F.asTex("x", "y")} = ${F.asTex(this.#e.x.tex, this.#e.y.tex)} + k\\cdot ${F.asTex(t.x.tex, t.y.tex)}` : `((x,y))=((${this.#e.x.display},${this.#e.y.display}))+k((${t.x.display},${t.y.display}))`;
			}
			case 4: {
				let t = this.d.clone().simplify();
				if (e === "tex") return `\\left\\{\\begin{aligned}\n\tx &= ${new M(this.#e.x).add(new j(t.x).multiply(new j("k"))).reorder("k", !0).tex}\\\\\n\ty &= ${new M(this.#e.y).add(new j(t.y).multiply(new j("k"))).reorder("k", !0).tex}\n\\end{aligned}\\right.`;
				let n = new M(this.#e.x).add(new j(t.x).multiply(new j("k"))).reorder("k", !0), r = new M(this.#e.y).add(new j(t.y).multiply(new j("k"))).reorder("k", !0);
				return `{(x,=,${n.display}),(y,=,${r.display}):}`;
			}
			default: {
				let t = this.getEquation();
				return t.left.monoms[0].coefficient.isNegative() && t.multiply(-1), t[e];
			}
		}
	}
	#c(e, t) {
		let n = "";
		return this.#t.isZero() || (n = this.#t.value.toFixed(t) + "x"), this.#n.isZero() || (n !== "" && this.#n.isPositive() && (n += "+"), n += this.#n.value.toFixed(t) + "y"), e && !this.#r.isZero() && (n !== "" && this.#r.isPositive() && (n += "+"), n += this.#r.value.toFixed(t)), n;
	}
	#l(e) {
		if (this.slope.isInfinity()) return "x=" + this.OA.x.value.toFixed(e);
		let t = this.slope.value.toFixed(e), n = this.height.value, r = "y=" + t + "x";
		return n > 0 ? r += "+" + n.toFixed(e) : n < 0 && (r += n.toFixed(e)), r;
	}
	#u(e, t, n) {
		let r = "";
		return e.isZero() || (r = e.value.toFixed(n)), t.isZero() || (r !== "" && t.isPositive() && (r += "+"), r += t.value.toFixed(n) + "k"), r || "0";
	}
	get OA() {
		return this.#e;
	}
	set OA(t) {
		this.copy(e.fromPointAndNormal(t, this.n));
	}
	get a() {
		return this.#t;
	}
	set a(e) {
		this.#t = e;
	}
	get asCanonical() {
		return this.#a = 1, this;
	}
	get asCartesian() {
		return this.#a = 0, this;
	}
	get asMxh() {
		return this.#a = 2, this;
	}
	get asParametric() {
		return this.#a = 3, this;
	}
	get asSystem() {
		return this.#a = 4, this;
	}
	withDigits(e) {
		return this.#o = l(e), this;
	}
	get b() {
		return this.#n;
	}
	set b(e) {
		this.#n = e;
	}
	get c() {
		return this.#r;
	}
	set c(e) {
		this.#r = e;
	}
	get d() {
		let e = new F(this.#n.clone(), this.#t.clone().opposite());
		return (this.#i === "lr" && e.x.isNegative() || this.#i === "rl" && e.x.isPositive()) && e.opposite(), e;
	}
	set d(t) {
		this.copy(e.fromPointAndDirection(this.OA, t));
	}
	get director() {
		return this.d;
	}
	distanceTo(e) {
		let t = e.x.clone().multiply(this.#t).add(e.y.clone().multiply(this.#n)).add(this.#r).abs(), n = this.normal.normSquare;
		return n.isZero() ? new _(0) : new _().from(2, n.inverse(), t).reduce();
	}
	static fromCoefficient(t, n, r) {
		let i = new e();
		i.#t = new g(t), i.#n = new g(n), i.#r = new g(r);
		let a = [
			i.#t,
			i.#n,
			i.#r
		].every((e) => e.exact) ? h.lcm(i.#t.denominator, i.#n.denominator, i.#r.denominator) : 1;
		if (a > 1 && (i.#t.multiply(a).reduce(), i.#n.multiply(a).reduce(), i.#r.multiply(a).reduce()), i.#n.isZero()) return i.#e = new F(i.#r.clone().divide(i.#t).opposite(), 0), i;
		for (let e = 0; e < i.#n.value; e++) {
			let t = i.#t.clone().divide(i.#n).multiply(e).subtract(i.#r.clone().divide(i.#n)).reduce();
			if (i.#e = new F(e, t), t.isRelative()) return i;
		}
		return i.#e = new F(0, i.#r.clone().divide(i.#n).opposite().reduce()), i;
	}
	static fromEquation(n) {
		let r = new I(n);
		r.reorder(!0);
		let i = new Set(r.variables);
		if (!(i.has("x") || i.has("y"))) throw new t("Equation must contain at least x or y to define a line");
		for (let e of ["x", "y"]) i.delete(e);
		if (i.size > 0) throw new t(`Equation contains unknown variable(s): ${[...i].join(", ")}`);
		if (r.left.degree("x").value > 1 || r.left.degree("y").value > 1) throw new t("Equation must be linear (degree ≤ 1) to define a line");
		return e.fromCoefficient(r.left.monomByVariable("x").coefficient, r.left.monomByVariable("y").coefficient, r.left.monomByDegree(0).coefficient);
	}
	static fromParallel(t, n) {
		return e.fromPointAndNormal(n, t.n);
	}
	static fromPerpendicular(t, n) {
		return e.fromPointAndNormal(n, t.d);
	}
	static fromPointAndDirection(t, n) {
		let r = e.fromPointAndNormal(t, n.clone().normal());
		return r.#i = n.x.isPositive() ? "lr" : "rl", r;
	}
	static fromPointAndLine(t, n, r = ht.Parallel) {
		return r === ht.Perpendicular ? e.fromPointAndNormal(t, n.director) : e.fromPointAndNormal(t, n.normal);
	}
	static fromPointAndNormal(n, r) {
		if (r.isZero()) throw new t("Normal vector cannot be zero");
		let i = e.fromCoefficient(r.x, r.y, n.x.clone().multiply(r.x).add(n.y.clone().multiply(r.y)).opposite());
		return i.#e = new F(n.clone()), i;
	}
	static fromPoints(t, n) {
		return e.fromPointAndNormal(t, new F(t, n).normal());
	}
	getEquation() {
		return new I(new M().parse("xy", this.#t, this.#n, this.#r), new M("0")).simplify();
	}
	getValueAtX(e) {
		let t = this.getEquation(), n = new g(e);
		return t.canIsolate("y") ? t.isolate("y").right.evaluate({ x: n }) : new g().invalid();
	}
	getValueAtY(e) {
		let t = this.getEquation(), n = new g(e);
		return t.canIsolate("x") ? t.isolate("x").right.evaluate({ y: n }) : new g().invalid();
	}
	get height() {
		return this.#r.clone().opposite().divide(this.#n);
	}
	hitSegment(t, n) {
		let r = this.intersection(e.fromPoints(t, n));
		return r.hasIntersection ? r.point.x.value >= Math.min(t.x.value, n.x.value) && r.point.x.value <= Math.max(t.x.value, n.x.value) && r.point.y.value >= Math.min(t.y.value, n.y.value) && r.point.y.value <= Math.max(t.y.value, n.y.value) : !1;
	}
	intersection(e) {
		if (this.isEqual(e)) return {
			point: null,
			hasIntersection: !1,
			isParallel: !1,
			isSame: !0
		};
		if (this.isParallelTo(e)) return {
			point: null,
			hasIntersection: !1,
			isParallel: !0,
			isSame: !1
		};
		let t = new P();
		return t.x = this.#n.clone().multiply(e.c).subtract(this.#r.clone().multiply(e.b)).divide(this.#t.clone().multiply(e.b).subtract(this.#n.clone().multiply(e.a))), t.y = this.#t.clone().multiply(e.c).subtract(this.#r.clone().multiply(e.a)).divide(this.#n.clone().multiply(e.a).subtract(this.#t.clone().multiply(e.b))), {
			point: t,
			hasIntersection: !0,
			isParallel: !1,
			isSame: !1
		};
	}
	isHorizontal() {
		return this.slope.value === 0;
	}
	isPointOnLine(e) {
		return this.#t.clone().multiply(e.x).add(this.#n.clone().multiply(e.y)).add(this.#r).isZero();
	}
	isParallelTo(e) {
		return this.#t.clone().multiply(e.b).subtract(e.a.clone().multiply(this.#n)).isZero() && !this.isEqual(e);
	}
	isPerpendicularTo(e) {
		return this.d.isNormalTo(e.d);
	}
	isEqual(e) {
		return this.#t.clone().multiply(e.b).subtract(e.a.clone().multiply(this.#n)).isZero() ? this.#n.isZero() && e.b.isZero() ? this.#t.clone().multiply(e.c).subtract(e.a.clone().multiply(this.#r)).isZero() : this.#n.clone().multiply(e.c).subtract(e.b.clone().multiply(this.#r)).isZero() : !1;
	}
	isVertical() {
		return this.slope.isInfinity();
	}
	get n() {
		return this.d.normal();
	}
	get normal() {
		return new F(this.#t, this.#n);
	}
	randomNearPoint(e) {
		let t = this.randomPoint(e), n = 10;
		for (; this.isPointOnLine(t) && n > 0;) t.x.add(H(1, !1)), t.y.add(H(1, !1)), n--;
		return t;
	}
	randomPoint(e) {
		return new P(this.d.clone().multiplyByScalar(H(e === void 0 || e <= 1 ? 3 : e, !1)).add(this.#e));
	}
	simplify() {
		let t = h.lcm(this.#t.denominator, this.#n.denominator, this.#r.denominator), n = h.gcd(this.#t.numerator, this.#n.numerator, this.#r.numerator);
		return this.copy(e.fromCoefficient(this.#t.clone().multiply(t).divide(n), this.#n.clone().multiply(t).divide(n), this.#r.clone().multiply(t).divide(n))), this;
	}
	project(e) {
		let t = this.normal, n = t.dot(t), r = t.dot(e).add(this.#r).divide(n);
		return new P(new F(e).subtract(t.clone().multiplyByScalar(r)));
	}
	reflect(e) {
		let t = new F(e, this.project(e));
		return new P(new F(e).add(t.multiplyByScalar(2)));
	}
	get slope() {
		return this.#t.clone().opposite().divide(this.#n);
	}
}, xt = class e {
	#e = new P();
	#t = new P();
	#n = new P();
	#r = !1;
	#i = null;
	#a = !0;
	#o = {
		mediators: null,
		medians: null,
		heights: null,
		externalBisectors: null,
		bisectors: null
	};
	constructor(...e) {
		return e.length > 0 && this.parse(...e), this;
	}
	parse(...t) {
		if (t.length === 1 && t[0] instanceof e) return this.copy(t[0]);
		if (t.length === 3) {
			if (t.every((e) => typeof e == "string")) {
				let [n, r, i] = t;
				return this.copy(e.fromLines(n, r, i));
			}
			if (t.every((e) => e instanceof W)) return this.copy(e.fromLines(t[0], t[1], t[2]));
			if (t.every((e) => e instanceof P)) return this.copy(e.fromPoints(t[0], t[1], t[2]));
		}
		if (t.length === 6) {
			let n = t.map((e) => new g(e));
			if (n.some((e) => e.isNaN())) throw new i("One of the values is not a valid number");
			return this.copy(e.fromCoordinates(n[0], n[1], n[2], n[3], n[4], n[5]));
		}
		return this;
	}
	get tex() {
		throw new a("Triangle has no equation representation");
	}
	get display() {
		throw new a("Triangle has no equation representation");
	}
	clone() {
		let t = new e();
		return t.#e = this.#e.clone(), t.#t = this.#t.clone(), t.#n = this.#n.clone(), t.#a = this.#a, t.reset(), t;
	}
	copy(e) {
		return this.#e = e.A.clone(), this.#t = e.B.clone(), this.#n = e.C.clone(), this.reset(), this;
	}
	get A() {
		return this.#e;
	}
	set A(e) {
		this.#e = e, this.#e.onChange = () => this.reset(), this.reset();
	}
	get AB() {
		return this.#u("A", "B");
	}
	get AC() {
		return this.#u("A", "C");
	}
	get B() {
		return this.#t;
	}
	set B(e) {
		this.#t = e, this.#t.onChange = () => this.reset(), this.reset();
	}
	get BA() {
		return this.#u("B", "A");
	}
	get BC() {
		return this.#u("B", "C");
	}
	get C() {
		return this.#n;
	}
	set C(e) {
		this.#n = e, this.#n.onChange = () => this.reset(), this.reset();
	}
	get CA() {
		return this.#u("C", "A");
	}
	get CB() {
		return this.#u("C", "B");
	}
	get asDegree() {
		return this.#a = !1, this;
	}
	get asRadians() {
		return this.#a = !0, this;
	}
	static fromCoordinates(t, n, r, i, a, o) {
		return e.fromPoints(new P(t, n), new P(r, i), new P(a, o));
	}
	static fromLines(t, n, i) {
		let a = new e(), o = new W(t).clone(), s = new W(n).clone(), c = new W(i).clone(), l = o.intersection(s);
		if (!l.hasIntersection) throw new r("Triangle.fromLines: lines AB and BC do not intersect");
		if (a.#t = l.point, l = s.intersection(c), !l.hasIntersection) throw new r("Triangle.fromLines: lines BC and AC do not intersect");
		if (a.#n = l.point, l = c.intersection(o), !l.hasIntersection) throw new r("Triangle.fromLines: lines AC and AB do not intersect");
		if (a.#e = l.point, a.reset(), !a.#r) throw new r("Triangle.fromLines: lines form a degenerate triangle");
		return a.#i = {
			AB: o,
			AC: c,
			BC: s
		}, a;
	}
	static fromPoints(t, n, i) {
		let a = new e();
		if (a.#e = t.clone(), a.#t = n.clone(), a.#n = i.clone(), a.reset(), !a.#r) throw new r("Triangle.fromPoints: points must form a non-degenerate triangle");
		return a;
	}
	getAngle(e) {
		let t = this.BC.norm, n = this.AC.norm, r = this.AB.norm;
		return e === "A" ? this.#c(t, n, r) : e === "C" ? this.#c(r, n, t) : this.#c(n, t, r);
	}
	getBisectors(e = !0) {
		if (!this.#r) throw new r("Triangle is degenerate");
		if (e && this.#o.bisectors) return this.#o.bisectors;
		if (!e && this.#o.externalBisectors) return this.#o.externalBisectors;
		let t = this.#s("A", e), n = this.#s("B", e), i = this.#s("C", e), a = t.intersection(n).point;
		return e ? this.#o.bisectors = {
			A: t,
			B: n,
			C: i,
			intersection: a
		} : this.#o.externalBisectors = {
			A: t,
			B: n,
			C: i,
			intersection: a
		}, {
			A: t,
			B: n,
			C: i,
			intersection: a
		};
	}
	getHeights() {
		if (!this.#r) throw new r("Triangle is degenerate");
		if (!this.#o.heights) {
			let e = W.fromPointAndNormal(this.#e, new F(this.#t, this.#n)), t = W.fromPointAndNormal(this.#t, new F(this.#e, this.#n)), n = W.fromPointAndNormal(this.#n, new F(this.#e, this.#t)), r = e.intersection(t).point;
			this.#o.heights = {
				A: e,
				B: t,
				C: n,
				intersection: r
			};
		}
		return this.#o.heights;
	}
	getMedians() {
		if (!this.#r) throw new r("Triangle is degenerate");
		if (!this.#o.medians) {
			let e = this.getMiddles(), t = W.fromPoints(this.#e, e.BC), n = W.fromPoints(this.#t, e.AC), r = W.fromPoints(this.#n, e.AB), i = t.intersection(n).point;
			this.#o.medians = {
				A: t,
				B: n,
				C: r,
				intersection: i
			};
		}
		return this.#o.medians;
	}
	getMediators() {
		if (!this.#r) throw new r("Triangle is degenerate");
		if (!this.#o.mediators) {
			let e = this.getMiddles(), t = W.fromPointAndNormal(e.BC, new F(this.#t, this.#n)), n = W.fromPointAndNormal(e.AC, new F(this.#e, this.#n)), r = W.fromPointAndNormal(e.AB, new F(this.#e, this.#t)), i = t.intersection(n).point;
			this.#o.mediators = {
				a: t,
				b: n,
				c: r,
				intersection: i
			};
		}
		return this.#o.mediators;
	}
	getMiddles() {
		return {
			AB: new P().middleOf(this.#e, this.#t),
			AC: new P().middleOf(this.#e, this.#n),
			BC: new P().middleOf(this.#t, this.#n)
		};
	}
	getPoints() {
		return [
			this.A,
			this.B,
			this.C
		];
	}
	getSortedPoints() {
		return this.getPoints().sort((e, t) => e.x.value === t.x.value ? e.y.value - t.y.value : e.x.value - t.x.value);
	}
	isEqual(e) {
		if (!this.#r || !e.isValid) return !1;
		let t = this.getSortedPoints(), n = e.getSortedPoints();
		return t.every((e, r) => t[r].isEqual(n[r]));
	}
	isEquilateral() {
		if (!this.#r) return !1;
		let e = this.AB.normSquare.value, t = this.BC.normSquare.value, n = this.AC.normSquare.value;
		return e === t && e === n;
	}
	isIsocele() {
		if (!this.#r) return !1;
		let e = this.AB.normSquare.value, t = this.BC.normSquare.value, n = this.AC.normSquare.value;
		return e === t || e === n || t === n;
	}
	isRectangle() {
		return this.#r ? this.AB.isNormalTo(this.BC) || this.AB.isNormalTo(this.AC) || this.BC.isNormalTo(this.AC) : !1;
	}
	get isValid() {
		return this.#r;
	}
	get lines() {
		return this.#i === null && (this.#i = {
			AB: new W(this.#e, this.#t),
			BC: new W(this.#t, this.#n),
			AC: new W(this.#e, this.#n)
		}), this.#i;
	}
	get remarquables() {
		return this.#o;
	}
	reset() {
		return this.#r = !this.AB.isColinearTo(this.AC), this.#i = null, this.#o = {
			mediators: null,
			medians: null,
			heights: null,
			externalBisectors: null,
			bisectors: null
		}, this;
	}
	#s(e, t = !0) {
		let n = this.#l(e).clone(), [r, i] = e === "A" ? ["B", "C"] : e === "B" ? ["A", "C"] : ["A", "B"], a = new F(n, this.#l(r)), o = new F(n, this.#l(i)), s = t ? a.unit().add(o.unit()) : a.unit().subtract(o.unit());
		return W.fromPointAndDirection(n, s);
	}
	#c(e, t, n) {
		let r = (t ** 2 + n ** 2 - e ** 2) / (2 * t * n);
		return this.#a ? Math.acos(r) : h.numberCorrection(Math.acos(r) * 180 / Math.PI);
	}
	#l(e) {
		switch (e) {
			case "A": return this.#e;
			case "B": return this.#t;
			case "C": return this.#n;
		}
	}
	#u(e, t) {
		return new F(this.#l(e), this.#l(t));
	}
}, St = /* @__PURE__ */ function(e) {
	return e[e.INTERIOR = 0] = "INTERIOR", e[e.EXTERIOR = 1] = "EXTERIOR", e[e.SECANT = 2] = "SECANT", e[e.TANGENT_INSIDE = 3] = "TANGENT_INSIDE", e[e.TANGENT_OUTSIDE = 4] = "TANGENT_OUTSIDE", e[e.SUPERPOSED = 5] = "SUPERPOSED", e[e.CONCENTRIC = 6] = "CONCENTRIC", e;
}({}), Ct = class e {
	#e = void 0;
	#t = void 0;
	#n = 1;
	#r = void 0;
	#i = null;
	constructor(...e) {
		e.length > 0 && this.parse(...e);
	}
	parse(...t) {
		return typeof t[0] == "string" ? this.copy(e.fromString(t[0])) : t[0] instanceof I ? this.copy(e.fromEquation(t[0])) : t[0] instanceof e ? this.copy(t[0]) : t.length === 2 && t[0] instanceof P && t[1] instanceof P ? this.copy(e.fromCenterPoint(t[0], t[1])) : t.length >= 2 && t[0] instanceof P && (t[1] instanceof g || typeof t[1] == "number") ? this.copy(e.fromCenterRadius(t[0], t[1], typeof t[2] == "boolean" && t[2])) : t.length === 3 && t[0] instanceof P && t[1] instanceof P && t[2] instanceof P ? this.copy(e.fromPoints(t[0], t[1], t[2])) : this;
	}
	clone() {
		if (this.#e === void 0 || this.#r === void 0) return new e();
		let t = e.fromCenterRadius(this.#e, this.#r, !0);
		return t.#n = this.#n, t.withDigits(this.#i);
	}
	withDigits(e) {
		return this.#i = l(e), this.#e?.withDigits(e), this.#r?.withDigits(e), this.#t?.withDigits(e), this;
	}
	copy(e) {
		return e.#e === void 0 || e.#r === void 0 ? (this.#s(), this) : (this.#e = e.#e.clone(), this.#r = e.#r.clone(), this.#n = 1, this.#o(), this.withDigits(this.#i));
	}
	get tex() {
		return this.#a("tex");
	}
	get display() {
		return this.#a("display");
	}
	get asDeveloped() {
		return this.#n = 0, this;
	}
	get asCenterRadius() {
		return this.#n = 1, this;
	}
	get center() {
		return this.#e ?? new P();
	}
	get equation() {
		return this.#t?.clone() ?? new I("0=0");
	}
	static fromCenterPoint(t, n) {
		let r = new e();
		return r.#e = t.clone(), r.#r = new F(r.#e, n).normSquare, r.#o(), r;
	}
	static fromCenterRadius(t, n, r) {
		let i = new e();
		return i.#e = t.clone(), i.#r = r ? new g(n) : new g(n).pow(2), i.#o(), i;
	}
	static fromEquation(t) {
		let n = new e(), i = new I(t);
		if (i.moveLeft(), i.degree("x").value !== 2 || i.degree("y").value !== 2) throw new r("Cannot create a Circle: equation must be degree 2 in both x and y");
		let a = i.left.monomByDegree(2, "x"), o = i.left.monomByDegree(2, "y");
		if (!a.coefficient.isEqual(o.coefficient)) throw new r("Cannot create a Circle: coefficients of x² and y² must be equal");
		i.divide(a.coefficient);
		let s = i.left.monomByDegree(1, "x"), c = i.left.monomByDegree(1, "y"), l = i.left.monomByDegree(0);
		return n.#e = new P(s.coefficient.clone().divide(2).opposite(), c.coefficient.clone().divide(2).opposite()), n.#r = l.coefficient.clone().opposite().add(n.#e.x.clone().pow(2)).add(n.#e.y.clone().pow(2)), n.#o(), n;
	}
	static fromPoints(t, n, i) {
		let a = new xt(t, n, i);
		if (!a.isValid) throw new r("Cannot create a Circle: points must form a non-degenerate triangle");
		let o = a.getMediators().c.clone(), s = a.getMediators().b.clone(), c = o.intersection(s);
		if (!c.hasIntersection) throw new r("Cannot find circumcenter: mediators do not intersect");
		return e.fromCenterPoint(c.point, t);
	}
	static fromString(t) {
		return e.fromEquation(t);
	}
	getPointsOnCircle() {
		let e = this.squareRadius.value;
		if (!Number.isInteger(e) || e < 0) return [];
		let t = h.pythagoreanTripletsWithTarget(e, !0), n = [];
		return t.forEach((e) => {
			for (let t of [
				[1, 1],
				[-1, 1],
				[-1, -1],
				[1, -1]
			]) {
				let r = this.center.x.clone().add(t[0] * e[0]), i = this.center.y.clone().add(t[1] * e[1]);
				n.every((e) => !e.isEqualXY(r, i)) && n.push(new P(r, i));
			}
		}), n;
	}
	isPointOnCircle(e) {
		return this.#t?.test({
			x: e.x,
			y: e.y
		}) ?? !1;
	}
	isEqual(e) {
		return e.center.isEqual(this.center) && e.squareRadius.isEqual(this.squareRadius);
	}
	intersection(e) {
		if (this.#t === void 0) return [];
		let t = this.center, n = e.d, r = e.OA, i = n.normSquare, a = r.x.clone().subtract(t.x).multiply(n.x).add(r.y.clone().subtract(t.y).multiply(n.y)).multiply(2), o = r.x.clone().subtract(t.x).pow(2).add(r.y.clone().subtract(t.y).pow(2)).subtract(this.squareRadius), s = k.fromQuadratic(i, a, o);
		if (s.length === 0) return [];
		if (s.length === 1) {
			let e = r.clone().add(n.clone().multiplyByScalar(s[0].fraction));
			return [new P(e.x, e.y)];
		}
		let c = s[0].root.isZero() ? r.clone().add(n.clone().multiplyByScalar(s[0].fraction)) : r.clone().add(n.clone().multiplyByScalar(s[0].value)), l = s[1].root.isZero() ? r.clone().add(n.clone().multiplyByScalar(s[1].fraction)) : r.clone().add(n.clone().multiplyByScalar(s[1].value));
		return [new P(c.x, c.y), new P(l.x, l.y)].sort((e, t) => n.x.isZero() ? n.y.isPositive() ? e.y.value - t.y.value : t.y.value - e.y.value : n.x.isPositive() ? e.x.value - t.x.value : t.x.value - e.x.value);
	}
	get radius() {
		return new _().from(2, this.#r ?? 0).reduce();
	}
	relativePosition(t) {
		if (this.#e === void 0 || this.#r === void 0) throw new r("Circle is not initialized");
		if (t instanceof e) {
			let e = new F(this.center, t.center).normSquare, n = this.squareRadius, r = t.squareRadius;
			if (e.isZero()) return n.isEqual(r) ? 5 : 6;
			let i = e.clone().subtract(n).subtract(r), a = n.clone().multiply(r).multiply(4), o = i.clone().pow(2).subtract(a);
			return o.isZero() ? i.isNegative() ? 3 : 4 : o.isNegative() ? 2 : +!i.isNegative();
		}
		let n = t.distanceTo(this.#e).pow(2).value, i = this.#r.value;
		return n - i > 1e-10 ? 0 : Math.abs(n - i) < 1e-10 ? 1 : 2;
	}
	static RELATIVE_POSITION = St;
	setRadius(e, t) {
		return this.#r = t ? new g(e) : new g(e).pow(2), this.#o(), this;
	}
	get squareRadius() {
		return this.#r?.clone() ?? new g(-1);
	}
	tangents(e) {
		return e instanceof g ? this.#u(e) : this.isPointOnCircle(e) ? this.#c(e) : this.#e !== void 0 && this.#e.distanceTo(e).value > this.radius.value ? this.#l(e) : [];
	}
	#a(e) {
		if (this.#n === 0) {
			let t = this.equation.moveLeft().reduce().withDigits(this.#i);
			return e === "tex" ? t.tex : t.display;
		}
		let t = this.center, n = t.x.clone().abs(), r = t.y.clone().abs(), i = this.squareRadius;
		return `${t.x.isZero() ? "x^2" : e === "tex" ? `\\left(x${t.x.isNegative() ? "+" : "-"}${n.tex}\\right)^2` : `(x${t.x.isNegative() ? "+" : "-"}${n.display})^2`}+${t.y.isZero() ? "y^2" : e === "tex" ? `\\left(y${t.y.isNegative() ? "+" : "-"}${r.tex}\\right)^2` : `(y${t.y.isNegative() ? "+" : "-"}${r.display})^2`}=${e === "tex" ? i.tex : i.display}`;
	}
	#o() {
		let e = M.fromCoefficients("x", 1, this.center.x.clone().opposite()).pow(2), t = M.fromCoefficients("y", 1, this.center.y.clone().opposite()).pow(2), n = M.fromConstant(this.squareRadius);
		this.#t = new I(e.add(t).subtract(n), 0).withDigits(this.#i);
	}
	#s() {
		this.#e = void 0, this.#r = void 0, this.#t = void 0;
	}
	#c(e) {
		let t = new F(this.center, e);
		return [W.fromPointAndNormal(e, t)];
	}
	#l(e) {
		let t = this.center.x.clone().subtract(e.x), n = this.center.y.clone().subtract(e.y), r = new M("x"), i = new M("x^2+1");
		return r.multiply(t).subtract(n).pow(2), i.multiply(this.squareRadius), new I(r, i).solve().map((t) => {
			let n = t.root.isZero() ? t.fraction : new g(t.value), r = e.x.clone().opposite().multiply(n).add(e.y), i = new I("y", "x");
			return i.right.multiply(n).add(r), new W(i);
		});
	}
	#u(e) {
		let t = e.numerator, n = -e.denominator, r = this.center.x.clone(), i = this.center.y.clone(), a = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), o = r.clone().multiply(t).opposite().subtract(i.clone().multiply(n)).add(a.clone().sqrt()), s = r.clone().multiply(t).opposite().subtract(i.clone().multiply(n)).subtract(a.clone().sqrt());
		return [new W(t, n, o), new W(t, n, s)];
	}
}, G = class e {
	#e = new P();
	#t = new F();
	#n = 0;
	#r = null;
	constructor(e, t) {
		return e !== void 0 && t !== void 0 && (t instanceof P, this.parse(e, t)), this;
	}
	static fromPoints(t, n) {
		let r = new e();
		return r.#e = t.clone(), r.#t = new F(t, n), r;
	}
	static fromPointAndDirection(t, n) {
		let r = new e();
		return r.#e = t.clone(), r.#t = n.clone(), r;
	}
	parse(t, n) {
		return n instanceof P ? this.copy(e.fromPoints(t, n)) : this.copy(e.fromPointAndDirection(t, n));
	}
	copy(e) {
		return this.#e = e.#e.clone(), this.#t = e.#t.clone(), this.#n = 0, this;
	}
	clone() {
		let t = new e();
		return t.#e = this.#e.clone(), t.#t = this.#t.clone(), t.#n = this.#n, t.#r = this.#r, t;
	}
	withDigits(e) {
		return this.#r = l(e), this.#e.withDigits(e), this.#t.withDigits(e), this;
	}
	get asParametric() {
		return this.#n = 0, this;
	}
	get asSystem() {
		return this.#n = 1, this;
	}
	get asCartesian() {
		return this.#n = 2, this;
	}
	get tex() {
		let e = this.#n;
		return this.#n = 0, this.#i("tex", e);
	}
	get display() {
		let e = this.#n;
		return this.#n = 0, this.#i("display", e);
	}
	#i(e, t) {
		switch (t) {
			case 1: return this.#o(e);
			case 2: return this.#s(e);
			default: return this.#a(e);
		}
	}
	#a(e) {
		return e === "tex" ? `${F.asTex("x", "y", "z")} = ${F.asTex(this.#e.x.tex, this.#e.y.tex, this.#e.z.tex)} + k\\cdot ${F.asTex(this.#t.x.tex, this.#t.y.tex, this.#t.z.tex)}` : `${F.asDisplay("x", "y", "z")} = ${F.asDisplay(this.#e.x.display, this.#e.y.display, this.#e.z.display)} + k\\cdot ${F.asDisplay(this.#t.x.display, this.#t.y.display, this.#t.z.display)}`;
	}
	#o(e) {
		let t = new M(this.#e.x).add(new j(this.#t.x).multiply(new j("k"))).reorder("k", !0).withDigits(this.#r), n = new M(this.#e.y).add(new j(this.#t.y).multiply(new j("k"))).reorder("k", !0).withDigits(this.#r), r = new M(this.#e.z).add(new j(this.#t.z).multiply(new j("k"))).reorder("k", !0).withDigits(this.#r);
		return e === "tex" ? `\\left\\{\\begin{aligned}\n    x &= ${t.tex}\\\\ \n    y &= ${n.tex}\\\\\n    z &= ${r.tex}\n\\end{aligned}\\right.` : `{(x,=,${t.display}),(y,=,${n.display}),(z,=,${r.display}):}`;
	}
	#s(e) {
		let t = this.#t.clone().simplify().withDigits(this.#r), n = [
			{
				v: "x",
				offset: this.#e.x,
				di: t.x
			},
			{
				v: "y",
				offset: this.#e.y,
				di: t.y
			},
			{
				v: "z",
				offset: this.#e.z,
				di: t.z
			}
		];
		return e === "tex" ? n.map(({ v: e, offset: t, di: n }) => `\\frac{ ${new M(e, 1, t.clone().opposite()).withDigits(this.#r).tex} }{ ${n.tex} }`).join(" = ") : n.map(({ v: e, offset: t, di: n }) => `(${new M(e, 1, t.clone().opposite()).withDigits(this.#r).display})/${n.display}`).join(" = ");
	}
	get OA() {
		return this.#e;
	}
	set OA(e) {
		this.#e = e;
	}
	get d() {
		return this.direction;
	}
	set d(e) {
		this.#t = e;
	}
	get direction() {
		return this.#t.clone();
	}
	get point() {
		return this.#e.clone();
	}
	distanceTo(e) {
		let t = new F(this.#e, e), n = this.direction, r = t.cross(n).normSquare, i = n.normSquare;
		return new _().from(2, r.clone().divide(i)).reduce();
	}
	hitSegment(t, n) {
		let r = this.intersection(new e(t, n));
		return r.hasIntersection ? r.point.x.value >= Math.min(t.x.value, n.x.value) && r.point.x.value <= Math.max(t.x.value, n.x.value) && r.point.y.value >= Math.min(t.y.value, n.y.value) && r.point.y.value <= Math.max(t.y.value, n.y.value) && r.point.z.value >= Math.min(t.z.value, n.z.value) && r.point.z.value <= Math.max(t.z.value, n.z.value) : !1;
	}
	intersection(e) {
		if (this.isEqual(e)) return {
			point: null,
			hasIntersection: !1,
			isParallel: !1,
			isSame: !0
		};
		if (this.isParallelTo(e)) return {
			point: null,
			hasIntersection: !1,
			isParallel: !0,
			isSame: !1
		};
		let t = new F(this.#e, e.#e), n = this.#t.cross(e.#t);
		if (!t.dot(n).isZero()) return {
			point: null,
			hasIntersection: !1,
			isParallel: !1,
			isSame: !1
		};
		let r = t.cross(e.#t).dot(n).divide(n.normSquare);
		return {
			point: new P(this.#e.x.clone().add(this.#t.x.clone().multiply(r)), this.#e.y.clone().add(this.#t.y.clone().multiply(r)), this.#e.z.clone().add(this.#t.z.clone().multiply(r))),
			hasIntersection: !0,
			isParallel: !1,
			isSame: !1
		};
	}
	isPointOnLine(e) {
		return new F(this.#e, e).isColinearTo(this.#t);
	}
	isEqual(e) {
		return this.#t.isColinearTo(e.#t) && this.isPointOnLine(e.#e);
	}
	isParallelTo(e) {
		return this.#t.isColinearTo(e.#t) && !this.isEqual(e);
	}
	isOrthogonalTo(e) {
		return this.#t.isNormalTo(e.#t);
	}
	isPerpendicularTo(e) {
		return this.isOrthogonalTo(e) && this.intersection(e).hasIntersection;
	}
	randomPoint(e = 5) {
		let t = this.#e.clone(), n = new g(H(e, !1));
		return new P(t.x.clone().add(this.#t.x.clone().multiply(n)), t.y.clone().add(this.#t.y.clone().multiply(n)), t.z.clone().add(this.#t.z.clone().multiply(n)));
	}
	randomNearPoint(e) {
		let t = this.randomPoint(e), n = 10;
		for (; this.isPointOnLine(t) && n > 0;) t.x.add(H(1, !1)), t.y.add(H(1, !1)), t.z.add(H(1, !1)), n--;
		return t;
	}
	simplify() {
		return this.#t.simplify(), this;
	}
	project(e) {
		let t = new F(this.#e, e).dot(this.#t).divide(this.#t.dot(this.#t));
		return new P(new F(this.#e).add(this.#t.clone().multiplyByScalar(t)));
	}
	reflect(e) {
		let t = new F(e, this.project(e));
		return new P(new F(e).add(t.multiplyByScalar(2)));
	}
}, wt = class e {
	#e = new F(0, 0, 1);
	#t = new P(0, 0, 0);
	#n = null;
	constructor(e) {
		e && this.parse(e);
	}
	static fromPointAndNormal(t, n) {
		let r = new e();
		return r.#t = new P(t), r.#e = new F(n), r;
	}
	static fromPointAndDirections(t, n, r) {
		let i = new e();
		return i.#t = new P(t), i.#e = n.cross(r), i;
	}
	static fromEquation(t) {
		let n = new I(t).moveLeft().reduce().left, r = n.monomByVariable("x").coefficient, i = n.monomByVariable("y").coefficient, a = n.monomByVariable("z").coefficient, o = n.monomByDegree(0).coefficient, s = new e();
		return s.#e = new F(r, i, a), s.#t = r.isNotZero() ? new P(o.clone().divide(r).opposite(), 0, 0) : i.isNotZero() ? new P(0, o.clone().divide(i).opposite(), 0) : new P(0, 0, o.clone().divide(a).opposite()), s;
	}
	static fromString(t) {
		return e.fromEquation(t);
	}
	static fromPoints(t, n, r) {
		let i = new e(), a = new F(t, n), o = new F(t, r);
		return i.#e = a.cross(o), i.#t = new P(t), i;
	}
	static fromCoefficients(t, n, r, i) {
		let a = new g(t), o = new g(n), s = new g(r), c = new g(i), l = new e();
		return l.#e = new F(a, o, s), l.#t = a.isNotZero() ? new P(c.clone().divide(a).opposite(), 0, 0) : o.isNotZero() ? new P(0, c.clone().divide(o).opposite(), 0) : new P(0, 0, c.clone().divide(s).opposite()), l;
	}
	parse(n) {
		if (n.point && n.normal) return this.copy(e.fromPointAndNormal(n.point, n.normal));
		if (n.point && n.directions?.length === 2) {
			let [t, r] = n.directions;
			return this.copy(e.fromPointAndDirections(n.point, t, r));
		}
		if (n.equation) return this.copy(e.fromEquation(n.equation));
		if (n.points?.length === 3 && n.points.every((e) => e instanceof P)) {
			let [t, r, i] = n.points;
			return this.copy(e.fromPoints(t, r, i));
		}
		if (n.coefficients?.length === 4) {
			let [t, r, i, a] = n.coefficients;
			return this.copy(e.fromCoefficients(t, r, i, a));
		}
		throw new t("Cannot parse Plane3Config: no valid combination of properties found");
	}
	copy(e) {
		return this.#e = e.#e.clone(), this.#t = e.#t.clone(), this;
	}
	clone() {
		let t = new e();
		return t.#e = this.#e.clone(), t.#t = this.#t.clone(), t.#n = this.#n, t;
	}
	withDigits(e) {
		return this.#n = l(e), this.#e.withDigits(e), this.#t.withDigits(e), this;
	}
	#r(e) {
		let t = new I(new M("xyz", this.a, this.b, this.c, this.d), new M(0)).reduce().withDigits(this.#n);
		return e === "tex" ? t.tex : t.display;
	}
	get tex() {
		return this.#r("tex");
	}
	get display() {
		return this.#r("display");
	}
	get a() {
		return this.#e.x;
	}
	get b() {
		return this.#e.y;
	}
	get c() {
		return this.#e.z;
	}
	get d() {
		return this.#e.dot(this.#t).opposite();
	}
	get normal() {
		return this.#e;
	}
	set normal(e) {
		this.#e = new F(e);
	}
	get point() {
		return this.#t;
	}
	set point(e) {
		this.#t = new P(e);
	}
	angle(t, r, i) {
		if (t instanceof e) return this.normal.angle(t.normal, r, i);
		let a;
		if (t instanceof F) {
			if (t.dimension !== 3) throw new n("Vector is not 3D");
			a = t;
		} else a = t.direction;
		return (i ? Math.PI / 2 : 90) - this.normal.angle(a, !0, i);
	}
	distanceTo(e) {
		let t = this.normal.dot(e).add(this.d).abs(), n = this.#e.normSquare;
		return new _().from(2, n.inverse(), t).reduce();
	}
	intersectWithLine(e) {
		let { point: t, direction: n } = e, r = this.normal.dot(n);
		if (r.isZero()) {
			let e = this.isPointOnPlane(t);
			return {
				point: null,
				hasIntersection: !1,
				isParallel: !e,
				isOnPlane: e
			};
		}
		let i = this.normal.dot(t).add(this.d).divide(r.opposite());
		return {
			point: new P(new F(t).add(n.clone().multiplyByScalar(i))),
			hasIntersection: !0,
			isParallel: !1,
			isOnPlane: !1
		};
	}
	intersectWithPlane(e) {
		if (this.#e.isColinearTo(e.normal)) {
			let t = this.isEqual(e);
			return {
				line: null,
				hasIntersection: !1,
				isParallel: !t,
				isEqual: t
			};
		}
		let t = this.#e.cross(e.normal), [n, r, i, a] = [
			this.a,
			this.b,
			this.c,
			this.d
		], [o, s, c, l] = [
			e.a,
			e.b,
			e.c,
			e.d
		], u = a.clone().opposite(), d = l.clone().opposite(), f, p = Math.abs(t.x.value), ee = Math.abs(t.y.value), m = Math.abs(t.z.value);
		if (m >= p && m >= ee) {
			let e = t.z;
			f = new P(u.clone().multiply(s).subtract(r.clone().multiply(d)).divide(e), n.clone().multiply(d).subtract(o.clone().multiply(u)).divide(e), 0);
		} else if (ee >= p) {
			let e = t.y.clone().opposite();
			f = new P(u.clone().multiply(c).subtract(i.clone().multiply(d)).divide(e), 0, n.clone().multiply(d).subtract(o.clone().multiply(u)).divide(e));
		} else {
			let e = t.x;
			f = new P(0, u.clone().multiply(c).subtract(i.clone().multiply(d)).divide(e), r.clone().multiply(d).subtract(s.clone().multiply(u)).divide(e));
		}
		return {
			line: new G(f, t),
			hasIntersection: !0,
			isParallel: !1,
			isEqual: !1
		};
	}
	isPointOnPlane(e) {
		return this.normal.dot(e).add(this.d).isZero();
	}
	isParallelTo(t) {
		return t instanceof e ? this.normal.isColinearTo(t.normal) : this.normal.dot(t.direction).isZero();
	}
	isPerpendicularTo(t) {
		return t instanceof e ? this.normal.dot(t.normal).isZero() : this.normal.isColinearTo(t.direction);
	}
	simplify() {
		return this.#e.simplify(), this;
	}
	isEqual(e) {
		return this.normal.isColinearTo(e.normal) && this.isPointOnPlane(e.point);
	}
	project(e) {
		let t = this.#e.dot(this.#e), n = this.#e.dot(e).add(this.d).divide(t);
		return new P(new F(e).subtract(this.#e.clone().multiplyByScalar(n)));
	}
	reflect(e) {
		let t = new F(e, this.project(e));
		return new P(new F(e).add(t.multiplyByScalar(2)));
	}
}, Tt = /* @__PURE__ */ function(e) {
	return e[e.INTERIOR = 0] = "INTERIOR", e[e.EXTERIOR = 1] = "EXTERIOR", e[e.SECANT = 2] = "SECANT", e[e.TANGENT_INSIDE = 3] = "TANGENT_INSIDE", e[e.TANGENT_OUTSIDE = 4] = "TANGENT_OUTSIDE", e[e.SUPERPOSED = 5] = "SUPERPOSED", e[e.CONCENTRIC = 6] = "CONCENTRIC", e;
}({}), Et = class e {
	#e = void 0;
	#t = void 0;
	#n = null;
	#r = void 0;
	#i = 1;
	constructor(...e) {
		e.length > 0 && this.parse(...e);
	}
	parse(...t) {
		return typeof t[0] == "string" ? this.copy(e.fromString(t[0])) : t[0] instanceof I ? this.copy(e.fromEquation(t[0])) : t[0] instanceof e ? this.copy(t[0]) : t[0] instanceof P && t[1] !== void 0 ? this.copy(e.fromCenterRadius(t[0], t[1], typeof t[2] == "boolean" && t[2])) : this;
	}
	clone() {
		if (this.#e === void 0 || this.#t === void 0) return new e();
		let t = new e();
		return t.#e = this.#e.clone(), t.#t = this.#t.clone(), t.#r = this.#r?.clone(), t.#i = this.#i, t.#n = this.#n, t;
	}
	withDigits(e) {
		return this.#n = l(e), this.#e?.withDigits(e), this.#t?.withDigits(e), this.#r?.withDigits(e), this;
	}
	copy(e) {
		return e.#e === void 0 || e.#t === void 0 ? (this.#a(), this) : (this.#e = e.#e.clone(), this.#t = e.#t.clone(), this.#i = 1, this.#s(), this.withDigits(this.#n));
	}
	static fromCenterRadius(t, n, r) {
		let i = new e();
		return i.#e = t.clone(), i.#t = r ? new g(n) : new g(n).pow(2), i.#s(), i;
	}
	static fromEquation(t) {
		let n = new e(), i = new I(t).moveLeft().reduce(), a = [
			"x",
			"y",
			"z"
		];
		for (let e of a) if (i.degree(e).value !== 2) throw new r("Cannot create a Sphere3: equation must be degree 2 in x, y and z");
		let o = i.left.monomByDegree(2, "x").coefficient;
		for (let e of a) if (i.left.monomByDegree(2, e).coefficient.isNotEqual(o)) throw new r("Cannot create a Sphere3: coefficients of x², y² and z² must be equal");
		return i.divide(o), n.#e = new P(i.left.monomByDegree(1, "x").coefficient.clone().divide(2).opposite(), i.left.monomByDegree(1, "y").coefficient.clone().divide(2).opposite(), i.left.monomByDegree(1, "z").coefficient.clone().divide(2).opposite()), n.#t = i.left.monomByDegree(0).coefficient.clone().opposite().add(n.#e.x.clone().pow(2)).add(n.#e.y.clone().pow(2)).add(n.#e.z.clone().pow(2)), n.#s(), n;
	}
	static fromString(t) {
		return e.fromEquation(t);
	}
	get center() {
		if (this.#e === void 0) throw new c("Sphere3 is undefined");
		return this.#e;
	}
	get squareRadius() {
		if (this.#t === void 0) throw new c("Sphere3 is undefined");
		return this.#t;
	}
	get radius() {
		if (this.#t === void 0) throw new c("Sphere3 is undefined");
		if (this.#t.isSquare()) {
			let e = this.#t.clone().sqrt();
			return {
				tex: e.tex,
				display: e.display,
				value: e.value
			};
		}
		return {
			tex: `\\sqrt{${this.#t.tex}}`,
			display: `sqrt(${this.#t.display})`,
			value: this.#t.clone().sqrt().value
		};
	}
	get equation() {
		if (this.#r === void 0) throw new c("Sphere3 is undefined");
		return this.#r;
	}
	get asCenterRadius() {
		return this.#i = 1, this;
	}
	get asDeveloped() {
		return this.#i = 0, this;
	}
	get tex() {
		return this.#o("tex");
	}
	get display() {
		return this.#o("display");
	}
	#a() {
		this.#e = void 0, this.#t = void 0, this.#r = void 0;
	}
	#o(e) {
		if (this.#r === void 0) throw new c("Sphere3 is undefined");
		if (this.#i === 0) return e === "tex" ? this.#r.tex : this.#r.display;
		let t = [];
		return [
			"x",
			"y",
			"z"
		].forEach((n) => {
			if (this.center[n].isZero()) t.push(`${n}^2`);
			else {
				let r = new M(n).subtract(this.center[n]).withDigits(this.#n);
				t.push(e === "tex" ? `\\(${r.tex}\\)^2` : `(${r.display})^2`);
			}
		}), t.join("+") + "=" + (e === "tex" ? this.squareRadius.tex : this.squareRadius.display);
	}
	#s() {
		let e = M.fromCoefficients("x", 1, this.center.x.clone().opposite()).pow(2), t = M.fromCoefficients("y", 1, this.center.y.clone().opposite()).pow(2), n = M.fromCoefficients("z", 1, this.center.z.clone().opposite()).pow(2), r = M.fromConstant(this.squareRadius);
		this.#r = new I(e.add(t).add(n).subtract(r), 0);
	}
	static RELATIVE_POSITION = Tt;
	relativePosition(e) {
		let t = new F(this.center, e.center).normSquare, n = this.squareRadius, r = e.squareRadius;
		if (t.isZero()) return n.isEqual(r) ? 5 : 6;
		let i = t.clone().subtract(n).subtract(r), a = n.clone().multiply(r).multiply(4), o = i.clone().pow(2).subtract(a);
		return o.isZero() ? i.isNegative() ? 3 : 4 : o.isNegative() ? 2 : +!i.isNegative();
	}
	isPointOnSphere(e) {
		return this.#r?.test({
			x: e.x,
			y: e.y,
			z: e.z
		}) ?? !1;
	}
	isEqual(e) {
		return e.center.isEqual(this.center) && e.squareRadius.isEqual(this.squareRadius);
	}
};
//#endregion
//#region src/randomization/rndConfig.ts
function Dt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Ot(e) {
	return typeof e == "object" && !!e && !(e instanceof g);
}
function kt(e) {
	return Object.fromEntries(Object.entries(e ?? {}).filter(([, e]) => e !== void 0));
}
function K(e, t) {
	let n = {
		...e,
		...kt(t)
	};
	for (let r of Object.keys(e)) {
		let i = e[r], a = t?.[r];
		Dt(i) && (n[r] = {
			...i,
			...Dt(a) ? kt(a) : {}
		});
	}
	return n;
}
//#endregion
//#region src/randomization/rndInterval.ts
var At = 1e3;
function q(e) {
	return e === 0 ? 0 : e;
}
function J(e) {
	if (typeof e == "number" && Number.isFinite(e)) {
		let t = Math.abs(e);
		return {
			min: q(-t),
			max: t
		};
	}
	if (typeof e == "object" && e && Number.isFinite(e.min) && Number.isFinite(e.max) && e.min <= e.max) return {
		min: q(e.min),
		max: q(e.max)
	};
	throw new i("range must be a finite number or {min, max} with min <= max");
}
//#endregion
//#region src/randomization/coefficient/rndFraction.ts
var jt = {
	max: 10,
	reduced: !0,
	relative: !1,
	allow: {
		negative: !0,
		positive: !0,
		zero: !1
	}
};
function Y(e) {
	if (e !== void 0 && "natural" in e) throw new i("natural was renamed relative: use { relative: true } for an integer");
	let t = K(jt, e);
	return e?.range === void 0 ? Mt(t) : Nt(t, J(e.range), e.max);
}
function Mt(e) {
	let t = Math.max(1, e.max), { negative: n, positive: r, zero: a } = e.allow, o = n ? -t : +!a, s = r ? t : a ? 0 : -1;
	if (o > s) throw new i("allow excludes every value: enable negative, positive or zero");
	let c = new g();
	if (c.numerator = V(o, s, !a && o <= 0 && s >= 0 ? [0] : void 0), e.relative || c.numerator === 0) c.denominator = 1;
	else {
		let e = Array.from({ length: t - 1 }, (e, t) => t + 2).filter((e) => c.numerator % e !== 0);
		c.denominator = e.length > 0 ? U(e) : 1;
	}
	return e.reduced ? c.reduce() : c;
}
function Nt(e, t, n) {
	let r = {
		negative: e.allow.negative && t.min < 0,
		positive: e.allow.positive && t.max > 0,
		zero: e.allow.zero && t.min <= 0 && t.max >= 0
	};
	if (!r.negative && !r.positive && !r.zero) throw new i(`allow leaves no value in the interval [${t.min}, ${t.max}]`);
	if (e.relative && !Pt(t, r.zero)) throw new i(`no integer in [${t.min}, ${t.max}]`);
	let a = Math.max(Math.abs(t.min), Math.abs(t.max)), o = t.min >= 1 || t.max <= -1, s = n ?? Math.max(2, Math.ceil(o ? 2 * a : a));
	for (let n = 0; n < At; n++) {
		let n = Mt({
			...e,
			max: s,
			allow: r
		});
		if (n.value >= t.min && n.value <= t.max) return n;
	}
	throw new i(`could not draw a fraction in [${t.min}, ${t.max}] (widen range or raise max)`);
}
function Pt(e, t) {
	let n = Math.ceil(e.min), r = Math.floor(e.max);
	return n > r ? !1 : n !== 0 || r !== 0 || t;
}
//#endregion
//#region src/randomization/rndValidation.ts
function Ft(e) {
	if (typeof e != "number" || !Number.isInteger(e) || e < 0) throw new i("degree must be a non-negative integer");
}
function It(e) {
	if (typeof e != "string" || !/^[a-z]+$/.test(e)) throw new i("variables must be a non-empty string of lowercase letters");
}
//#endregion
//#region src/randomization/algebra/rndMonom.ts
var Lt = {
	variables: "x",
	degree: 2,
	fraction: !1,
	allow: { zero: !1 }
};
function Rt(e) {
	let t = K(Lt, e);
	Ft(t.degree), It(t.variables);
	let n = new j();
	n.coefficient = Y(K({
		reduced: !0,
		relative: t.fraction === !1,
		allow: {
			zero: t.allow.zero,
			negative: !0
		}
	}, typeof t.fraction == "object" ? t.fraction : void 0));
	let r = [...new Set(t.variables.split(""))];
	if (r.length > 1) {
		for (let e of r) n.setExponent(e, 0);
		for (let e = 0; e < t.degree; e++) {
			let e = U(r);
			n.setExponent(e, n.degree(e).add(1));
		}
	} else n.setExponent(r[0], t.degree);
	return n;
}
//#endregion
//#region src/randomization/algebra/rndPolynom.ts
var zt = 10, Bt = {
	variables: "x",
	degree: 2,
	fraction: !1,
	unit: !1,
	factorable: !1,
	numberOfMonoms: 0,
	allow: {
		nullMonom: !0,
		negativeLeading: !1,
		commonFactor: !0
	}
};
function X(e) {
	let t = K(Bt, e);
	if (Ft(t.degree), It(t.variables), t.factorable) return Vt(t);
	let n = !t.allow.commonFactor && t.fraction === !1, r = new M().empty(), i, a = t.degree;
	for (let e = a; e >= 0; e--) i = Rt({
		variables: t.variables,
		degree: e,
		fraction: t.fraction,
		allow: { zero: e !== a && t.allow.nullMonom }
	}), t.unit && a === e && i.coefficient.one(), r.add(i);
	if (!t.allow.negativeLeading && r.monomByDegree().coefficient.isNegative() && r.opposite(), t.numberOfMonoms > 0 && t.numberOfMonoms < r.length) for (; r.length > t.numberOfMonoms;) {
		let e = V(1, r.length - 1);
		r.monoms = r.monoms.filter((t, n) => n !== e);
	}
	let o = r.reduce();
	if (n) {
		let e = o.gcdNumerator();
		e > 1 && (o.monoms = o.monoms.map((t) => (t.coefficient.divide(e), t)));
	}
	return o;
}
function Vt(e) {
	let t = e.allow?.commonFactor === !1;
	if (t && e.commonConstant === !0) throw new i("commonConstant: true contradicts allow.commonFactor: false");
	let n = {
		...e,
		allow: { ...e.allow },
		degree: 1,
		factorable: !1
	}, r = e.degree ?? Bt.degree, a = [];
	for (; a.length < r;) a.push(X(n));
	if (e.commonConstant !== !1 && !t) {
		let t = H(zt, !1);
		e.allow?.negativeLeading !== !0 && (t = Math.abs(t)), e.commonConstant === !0 && (t === 1 || t === -1) && (t *= V(2, 5)), t !== 1 && t !== -1 && a.unshift(new M(t));
	}
	let o = M.xMultiply(...a);
	if (t && e.fraction === !1) {
		let e = o.gcdNumerator();
		e > 1 && (o.monoms = o.monoms.map((t) => (t.coefficient.divide(e), t)));
	}
	return o;
}
//#endregion
//#region src/randomization/rndCoordinates.ts
function Ht(e, t) {
	return t === 1 ? {
		min: Math.max(e.min, 0),
		max: e.max
	} : t === -1 ? {
		min: e.min,
		max: Math.min(e.max, 0)
	} : e;
}
function Ut(e, t) {
	let { min: n, max: r } = e, i = `the interval [${n}, ${r}]`, a = "(check axis, plane, quadrant, octant and range)";
	return n > r ? `the range and the sign constraint have no value in common ${a}` : t === "zero" && (n > 0 || r < 0) ? `the zero rule needs a coordinate equal to 0, but ${i} excludes 0 ${a}` : t === "nonzero" && n === 0 && r === 0 ? `a non-zero coordinate is required, but ${i} only allows 0 ${a}` : null;
}
function Wt(e, t) {
	for (let n = 0; n < e.length; n++) {
		let r = Ut(e[n], t[n]);
		if (r !== null) return r;
	}
	return null;
}
function Gt(e, t) {
	let n = Ut(e, t);
	if (n !== null) throw new i(n);
}
function Z(e, t, n) {
	if (Gt(e, t), t === "zero") return new g(0);
	let r = t === "nonzero";
	return n ? qt(e, r, n === !0 ? {} : n) : new g(Kt(e, r));
}
function Kt(e, t) {
	let n = q(Math.ceil(e.min)), r = q(Math.floor(e.max));
	if (n > r || t && n === 0 && r === 0) throw new i(`no integer in [${e.min}, ${e.max}]`);
	return t && n <= 0 && r >= 0 ? V(n, r, [0]) : V(n, r);
}
function qt(e, t, n) {
	return Y({
		...n,
		range: e,
		allow: {
			negative: !0,
			positive: !0,
			zero: !t
		}
	});
}
//#endregion
//#region src/randomization/rndKinds.ts
function Jt(e, t, n = "allow") {
	for (let r of e) {
		let e = t[r];
		if (!(typeof e == "boolean" || typeof e == "number" && e >= 0 && e <= 1)) throw new i(`${n}.${r} must be a boolean or a probability between 0 and 1`);
	}
}
function Yt(e, t, n) {
	let r = Object.fromEntries(e.map((e) => [e, 0])), i = [], a = [], o = 0;
	for (let s of e) {
		let e = t[s];
		typeof e == "number" ? (r[s] = e, o += e) : e === !0 && (n[s] === void 0 ? a : i).push(s);
	}
	if (o >= 1) return r;
	let s = 1 - o, c = i.reduce((e, t) => e + (n[t] ?? 0), 0);
	if (a.length > 0) {
		let e = c > s ? s / c : 1;
		i.forEach((t) => {
			r[t] = (n[t] ?? 0) * e;
		}), a.forEach((t) => {
			r[t] = (s - c * e) / a.length;
		});
	} else i.forEach((e) => {
		r[e] = n[e] ?? 0;
	});
	return r;
}
function Xt(e, t) {
	let n = e.reduce((e, n) => e + t[n], 0);
	if (n <= 0) throw new i("allow excludes every kind of line");
	let r = Math.random() * n;
	for (let n of e) {
		if (r < t[n]) return n;
		r -= t[n];
	}
	return [...e].reverse().find((e) => t[e] > 0) ?? e[e.length - 1];
}
function Zt(e, t, n) {
	return Xt(e, Yt(e, t, n));
}
//#endregion
//#region src/randomization/algebra/rndEquation.ts
var Qt = {
	degree: 1,
	variables: "x",
	fraction: !1,
	unit: !1,
	factorable: !1,
	shuffle: !1,
	solution: {
		count: void 0,
		allowZero: !0,
		relative: !1,
		range: 5,
		nothing: !1,
		everything: !1
	},
	allow: {
		negativeLeading: !1,
		commonFactor: !0
	}
};
function $t(e) {
	return e === !0 ? 1 : e === !1 ? 0 : e;
}
function en(e, t) {
	let n = $t(e), r = $t(t), i = Math.random();
	return n + r <= 1 ? i < n ? "nothing" : i < n + r ? "everything" : "normal" : i < n / (n + r) ? "nothing" : "everything";
}
function tn(e) {
	if (e?.solution !== void 0 && "integer" in e.solution) throw new i("solution.integer was renamed solution.relative");
	let t = K(Qt, e);
	Ft(t.degree), It(t.variables), Jt(["nothing", "everything"], t.solution, "solution");
	let n = J(t.solution.range);
	if ($t(t.solution.nothing) > 0 && Gt(n, "nonzero"), (t.factorable || t.solution.count !== void 0) && new Set(t.variables).size > 1) throw new i("factorable and solution.count need a single variable");
	let r = nn(t);
	return t.shuffle && r.add(X({
		degree: t.degree,
		variables: t.variables,
		fraction: t.fraction,
		allow: { negativeLeading: !1 }
	})), r;
}
function nn(e) {
	let t = en(e.solution.nothing, e.solution.everything);
	return t === "everything" ? rn(e) : t === "nothing" ? an(e) : e.factorable || e.solution.count !== void 0 ? on(e) : new I(X({
		degree: e.degree,
		variables: e.variables,
		fraction: e.fraction,
		unit: e.unit,
		allow: {
			negativeLeading: e.allow.negativeLeading,
			commonFactor: e.allow.commonFactor
		}
	}), 0);
}
function rn(e) {
	let t = X({
		degree: e.degree,
		variables: e.variables,
		fraction: e.fraction,
		unit: e.unit,
		allow: {
			nullMonom: !1,
			negativeLeading: e.allow.negativeLeading
		}
	});
	return new I(t, t.clone());
}
function an(e) {
	let t = X({
		degree: e.degree,
		variables: e.variables,
		fraction: e.fraction,
		unit: e.unit,
		allow: {
			nullMonom: !1,
			negativeLeading: e.allow.negativeLeading
		}
	}), n = M.fromConstant(Z(J(e.solution.range), "nonzero", e.fraction !== !1 && sn(e)));
	return new I(t.clone().add(n), t);
}
function on(e) {
	let t = e.degree, n = e.solution.count ?? t;
	if (!Number.isInteger(n) || n < 0 || n > t) throw new i("solution.count must be an integer between 0 and degree");
	if (n === 0 && t % 2 != 0) throw new i("an odd-degree polynomial always has at least one real solution");
	let r = (t - n) % 2 != 0, a = [];
	for (let t = 0; t < n; t++) for (let t = 0; t < 200; t++) {
		let n = cn(e);
		if (!a.some((e) => e.isEqual(n))) {
			a.push(n);
			break;
		}
		if (t === 199) throw new i("could not generate enough distinct roots");
	}
	let o = a.map((t) => ln(t, e.variables[0]));
	r && o.push(o[0].clone());
	let s = e.variables[0], c = (t - o.length) / 2, l = [...o, ...Array.from({ length: c }, () => dn(s))];
	if (l.length === 0) return new I(new M(V(1, 9)), 0);
	let u = M.xMultiply(...l);
	if (!e.allow.negativeLeading && u.monomByDegree().coefficient.isNegative() && u.opposite(), !e.allow.commonFactor) {
		let e = u.gcdNumerator();
		e > 1 && (u.monoms = u.monoms.map((t) => (t.coefficient.divide(e), t)));
	}
	return new I(u, 0);
}
function sn(e) {
	return typeof e.fraction != "object" || e.fraction;
}
function cn(e) {
	return Z(J(e.solution.range), e.solution.allowZero ? "free" : "nonzero", !e.solution.relative && sn(e));
}
function ln(e, t) {
	let n = e.numerator, r = e.denominator, i = -n;
	return i === 0 ? new M(`${r}${t}`) : new M(`${r}${t}${i > 0 ? "+" : ""}${i}`);
}
var un = 5;
function dn(e) {
	let t = V(1, un), n = V(1, un), r = H(Math.ceil(2 * Math.sqrt(t * n)) - 1);
	return r === 0 ? new M(`${t}${e}^2+${n}`) : new M(`${t}${e}^2${r > 0 ? `+${r}` : String(r)}${e}+${n}`);
}
//#endregion
//#region src/randomization/geometry/rndPoint.ts
var fn = {
	axis: null,
	fraction: !1,
	range: 10,
	quadrant: null,
	allow: { origin: !0 }
}, pn = {
	1: {
		x: 1,
		y: 1
	},
	2: {
		x: -1,
		y: 1
	},
	3: {
		x: -1,
		y: -1
	},
	4: {
		x: 1,
		y: -1
	}
};
function Q(e) {
	let t = K(fn, e), n = J(t.range), r = mn(t.quadrant), a = hn(t.axis, t.allow.origin), o = r.map((e) => ({
		x: Ht(n, e === null ? void 0 : pn[e].x),
		y: Ht(n, e === null ? void 0 : pn[e].y)
	}));
	for (let e of o) for (let t of a) {
		let n = Wt([e.x, e.y], [t.x, t.y]);
		if (n !== null) throw new i(n);
	}
	let s = U(o), c = U(a);
	for (let e = 0; e < At; e++) {
		let e = Z(s.x, c.x, t.fraction), n = Z(s.y, c.y, t.fraction);
		if (t.allow.origin || !(e.isZero() && n.isZero())) return new P(e, n);
	}
	throw new i("could not draw a point other than the origin");
}
function mn(e) {
	if (e === null) return [null];
	let t = Array.isArray(e) ? e : [e];
	if (t.length === 0 || t.some((e) => ![
		1,
		2,
		3,
		4
	].includes(e))) throw new i("quadrant must be 1, 2, 3, 4, an array of them, or null");
	let n = [...new Set(t)];
	return n.length === 4 ? [null] : n;
}
function hn(e, t) {
	let n = t ? "free" : "nonzero", r = {
		x: n,
		y: "zero"
	}, a = {
		x: "zero",
		y: n
	};
	if (e === !0) return [r, a];
	if (e === "x") return [r];
	if (e === "y") return [a];
	if (e === !1) return [{
		x: "nonzero",
		y: "nonzero"
	}];
	if (e === null) return [{
		x: "free",
		y: "free"
	}];
	throw new i("axis must be 'x', 'y', true, false or null");
}
//#endregion
//#region src/randomization/geometry/rndCircle.ts
var gn = { pointsOnCircle: {
	min: 8,
	fraction: !1
} }, _n = {
	radius: 5,
	squaredRadius: 25
};
function vn(e) {
	let { radius: t, squaredRadius: n } = e ?? {};
	if (t !== void 0 && n !== void 0) throw new i("radius and squaredRadius cannot be combined");
	let r = e?.pointsOnCircle !== void 0, a = bn(K(gn, { pointsOnCircle: yn(e?.pointsOnCircle) }).pointsOnCircle), o = t === void 0 ? "squaredRadius" : "radius", s = t ?? n, c = s === void 0 || r ? a.min : 0, l = s !== void 0 && !Ot(s) ? Cn(o, s, c) : wn(o, s, c);
	return new Ct(Q(e?.center), l, !0);
}
function yn(e) {
	if (e !== void 0) {
		if (typeof e == "number") return { min: e };
		if (typeof e != "object" || !e) throw new i("pointsOnCircle must be a number or { min, fraction }");
		return e;
	}
}
function bn(e) {
	let { min: t, fraction: n } = e;
	if (!Number.isInteger(t) || t < 0) throw new i("pointsOnCircle.min must be a non-negative integer");
	if (typeof n != "boolean") throw new i("pointsOnCircle.fraction must be a boolean");
	if (n) throw new a("pointsOnCircle.fraction: true is not implemented yet");
	return { min: t };
}
var xn = /* @__PURE__ */ new Map();
function Sn(e) {
	let t = e.value, n = Number.isInteger(t), r = n ? xn.get(t) : void 0;
	if (r !== void 0) return r;
	let i = new Ct(new P(0, 0), e, !0).getPointsOnCircle().length;
	return n && xn.set(t, i), i;
}
function Cn(e, t, n) {
	let r = new g(t);
	if (r.isNaN() || !r.isFinite() || !(r.value > 0)) throw new i(`${e} must be a finite number greater than 0, got ${t instanceof g ? t.display : String(t)}`);
	let a = e === "radius" ? r.clone().pow(2) : r;
	if (n > 0) {
		let e = Sn(a);
		if (e < n) throw new i(`the circle has ${e} points with integer offsets, fewer than the ${n} requested`);
	}
	return a;
}
function wn(e, t, n) {
	let r = t?.fraction ?? !1;
	if (typeof r != "boolean" && typeof r != "object") throw new i(`${e}.fraction must be a boolean or a coefficient configuration`);
	let a = r === !0 ? {} : r === !1 ? { relative: !0 } : r;
	if (!a.relative) {
		if (n > 0) throw new i("a fractional radius has no point with integer offsets: use an integer (fraction: false) or pointsOnCircle: 0");
		let t = Y({
			...a,
			allow: {
				zero: !1,
				negative: !1,
				positive: !0
			}
		});
		return e === "radius" ? t.clone().pow(2) : t;
	}
	let o = a.max ?? _n[e];
	if (!Number.isInteger(o) || o < 1) throw new i(`${e}.fraction.max must be an integer greater than 0`);
	let s = Array.from({ length: o }, (t, n) => new g(e === "radius" ? (n + 1) ** 2 : n + 1)).filter((e) => n === 0 || Sn(e) >= n);
	if (s.length === 0) throw new i(`no ${e} up to ${o} gives at least ${n} points with integer offsets`);
	return U(s);
}
//#endregion
//#region src/randomization/geometry/rndLine.ts
var Tn = [
	"vertical",
	"horizontal",
	"positive",
	"negative"
], En = .05, Dn = { allow: {
	vertical: !0,
	horizontal: !0,
	positive: !0,
	negative: !0
} };
function On(e) {
	let t = K(Dn, { allow: e?.allow });
	Jt(Tn, t.allow);
	let n = jn(e?.A), r = e?.slope;
	if (r === void 0 || Ot(r)) return W.fromPointAndDirection(n, Mn(r, t.allow));
	if (Object.values(e?.allow ?? {}).some((e) => e !== void 0)) throw new i("allow cannot be combined with an exact slope");
	return W.fromPointAndDirection(n, An(kn(r)));
}
function kn(e) {
	let t = new g(e);
	if (t.isNaN() || !t.isFinite()) throw new i(`slope must be a finite number or fraction, got ${e instanceof g ? e.display : String(e)}`);
	return t;
}
function An(e) {
	let t = e.clone().reduce();
	return new F(t.denominator, t.numerator);
}
function jn(e) {
	if (e === void 0) return Q();
	if (e instanceof P) {
		if (e.dimension !== 2) throw new i("A must be a 2D point");
		return e.clone();
	}
	if (typeof e == "object" && e && !("x" in e) && !("y" in e)) return Q(e);
	throw new i("A must be a Point or a point configuration (use new Point(x, y) for an exact point)");
}
function Mn(e, t) {
	let n = e?.fraction ?? !0;
	if (typeof n != "boolean" && typeof n != "object") throw new i("slope.fraction must be a boolean or a coefficient configuration");
	let r = Zt(Tn, t, {
		vertical: En,
		horizontal: En
	});
	return r === "vertical" ? new F(0, 1) : r === "horizontal" ? new F(1, 0) : An(Y({
		...n === !0 ? {} : n === !1 ? { relative: !0 } : n,
		allow: {
			zero: !1,
			positive: r === "positive",
			negative: r === "negative"
		}
	}));
}
//#endregion
//#region src/randomization/geometry/rndComponents.ts
var Nn = {
	primitive: !1,
	allow: { zero: !1 }
};
function Pn(e) {
	let t = e.allow ?? {};
	if (t.origin !== void 0) throw new i("allow.origin does not apply to a vector: use allow.zero");
	if (t.zero !== void 0 && typeof t.zero != "boolean") throw new i("allow.zero must be a boolean");
	if (e.primitive !== void 0 && typeof e.primitive != "boolean") throw new i("primitive must be a boolean");
	let n = e.fraction, r = !n || typeof n == "object" && n.relative === !0;
	if (e.primitive === !0 && !r) throw new i("primitive requires integer components: use fraction false or { relative: true }");
}
function Fn(e, t, n) {
	if (!n) return e();
	let r = J(t);
	for (let t = 0; t < At; t++) {
		let t = In(e());
		if (t.array.every((e) => e.value >= r.min && e.value <= r.max)) return t;
	}
	throw new i("could not draw a primitive vector within the range (widen range)");
}
function In(e) {
	let t = e.array.map((e) => Math.abs(e.numerator));
	if (t.every((e) => e === 0)) return e;
	let n = h.gcd(...t);
	return n === 1 ? e : new F(...e.array.map((e) => new g(e.numerator / n)));
}
function Ln(e, t) {
	Pn(e ?? {});
	let { allow: n, primitive: r } = K(Nn, {
		primitive: e?.primitive,
		allow: e?.allow
	}), { allow: i, primitive: a, ...o } = e ?? {};
	return Fn(() => new F(t({
		...o,
		allow: { origin: n.zero }
	})), e?.range ?? 10, r);
}
//#endregion
//#region src/randomization/geometry/rndPoint3.ts
var Rn = {
	axis: null,
	plane: null,
	fraction: !1,
	range: 10,
	octant: null,
	allow: { origin: !0 }
}, zn = [
	"x",
	"y",
	"z"
], Bn = [
	"xy",
	"xz",
	"yz"
], Vn = {
	1: [
		1,
		1,
		1
	],
	2: [
		-1,
		1,
		1
	],
	3: [
		-1,
		-1,
		1
	],
	4: [
		1,
		-1,
		1
	],
	5: [
		1,
		1,
		-1
	],
	6: [
		-1,
		1,
		-1
	],
	7: [
		-1,
		-1,
		-1
	],
	8: [
		1,
		-1,
		-1
	]
};
function $(e) {
	let t = K(Rn, e);
	return Gn(t, Jn(t.axis, t.plane, t.allow.origin));
}
function Hn(e, t) {
	return Gn(K(Rn, e), t);
}
function Un(e, t) {
	return Wn(K(Rn, e)).every((e) => t.every((t) => Wt(e, t) === null));
}
function Wn(e) {
	let t = J(e.range);
	return Kn(e.octant).map((e) => qn(t, e));
}
function Gn(e, t) {
	let n = Wn(e);
	for (let e of n) for (let n of t) {
		let t = Wt(e, n);
		if (t !== null) throw new i(t);
	}
	let r = U(n), a = U(t);
	for (let t = 0; t < At; t++) {
		let [t, n, i] = r.map((t, n) => Z(t, a[n], e.fraction));
		if (e.allow.origin || !(t.isZero() && n.isZero() && i.isZero())) return new P(t, n, i);
	}
	throw new i("could not draw a point other than the origin");
}
function Kn(e) {
	if (e === null) return [null];
	let t = Array.isArray(e) ? e : [e];
	if (t.length === 0 || t.some((e) => !Number.isInteger(e) || e < 1 || e > 8)) throw new i("octant must be an integer from 1 to 8, an array of them, or null");
	let n = [...new Set(t)];
	return n.length === 8 ? [null] : n;
}
function qn(e, t) {
	return (t === null ? [
		void 0,
		void 0,
		void 0
	] : Vn[t]).map((t) => Ht(e, t));
}
function Jn(e, t, n) {
	let r = Yn(e), a = Xn(t);
	if (a !== null) {
		if (e !== null) throw new i("axis and plane cannot be combined");
		return a.map((e) => zn.map((t) => e.includes(t) ? "free" : "zero"));
	}
	if (r === "none") return [[
		"nonzero",
		"nonzero",
		"nonzero"
	]];
	if (r === null) return [[
		"free",
		"free",
		"free"
	]];
	let o = n ? "free" : "nonzero";
	return r.map((e) => zn.map((t) => t === e ? o : "zero"));
}
function Yn(e) {
	if (e === null) return null;
	if (e === !1) return "none";
	if (e === !0) return zn;
	if (typeof e == "string" && zn.includes(e)) return [e];
	throw new i("axis must be 'x', 'y', 'z', true, false or null");
}
function Xn(e) {
	if (e === null || e === !1) return null;
	if (e === !0) return Bn;
	if (typeof e == "string" && Bn.includes(e)) return [e];
	throw new i("plane must be 'xy', 'xz', 'yz', true, false or null");
}
//#endregion
//#region src/randomization/geometry/rndVector3.ts
function Zn(e) {
	return Ln(e, $);
}
function Qn(e, t) {
	return Ln(e, (e) => Hn(e, t));
}
//#endregion
//#region src/randomization/geometry/rndLine3.ts
var $n = [
	"general",
	"parallelXY",
	"parallelXZ",
	"parallelYZ",
	"parallelX",
	"parallelY",
	"parallelZ"
], er = {
	general: [
		"nonzero",
		"nonzero",
		"nonzero"
	],
	parallelXY: [
		"nonzero",
		"nonzero",
		"zero"
	],
	parallelXZ: [
		"nonzero",
		"zero",
		"nonzero"
	],
	parallelYZ: [
		"zero",
		"nonzero",
		"nonzero"
	],
	parallelX: [
		"nonzero",
		"zero",
		"zero"
	],
	parallelY: [
		"zero",
		"nonzero",
		"zero"
	],
	parallelZ: [
		"zero",
		"zero",
		"nonzero"
	]
}, tr = .05, nr = .02, rr = {
	parallelXY: tr,
	parallelXZ: tr,
	parallelYZ: tr,
	parallelX: nr,
	parallelY: nr,
	parallelZ: nr
}, ir = { allow: {
	general: !0,
	parallelXY: !0,
	parallelXZ: !0,
	parallelYZ: !0,
	parallelX: !0,
	parallelY: !0,
	parallelZ: !0
} };
function ar(e) {
	let t = K(ir, { allow: e?.allow }).allow;
	Jt($n, t);
	let n = e?.direction;
	if (n instanceof F) {
		let t = sr(n);
		if (Object.values(e?.allow ?? {}).some((e) => e !== void 0)) throw new i("allow cannot be combined with an exact direction");
		return G.fromPointAndDirection(or(e?.A), t);
	}
	let r = ur(cr(n), t);
	return G.fromPointAndDirection(or(e?.A), r);
}
function or(e) {
	if (e === void 0) return $();
	if (e instanceof P) {
		if (e.dimension !== 3) throw new i("A must be a 3D point");
		return e.clone();
	}
	if (lr(e)) return $(e);
	throw new i("A must be a Point or a point configuration (use new Point(x, y, z) for an exact point)");
}
function sr(e) {
	if (e.dimension !== 3) throw new i("direction must be a 3D vector");
	if (e.isZero()) throw new i("direction must not be the null vector");
	return e.clone();
}
function cr(e) {
	let t = e ?? {};
	if (!lr(t)) throw new i("direction must be a Vector or a vector configuration (use new Vector(x, y, z) for an exact direction)");
	if (Pn(t), t.allow?.zero === !0) throw new i("the direction of a line cannot be the null vector: allow.zero must not be true");
	return t;
}
function lr(e) {
	return typeof e == "object" && !!e && !Array.isArray(e) && !("x" in e) && !("y" in e) && !("z" in e);
}
function ur(e, t) {
	let { allow: n, primitive: r, ...a } = e, o = { ...t };
	for (let e of $n) {
		if (Un(a, [er[e]])) continue;
		let t = o[e];
		if (typeof t == "number" && t > 0) throw new i(`allow.${e} cannot be satisfied with this direction configuration`);
		o[e] = !1;
	}
	let s = Zt($n, o, rr);
	return Qn({
		...e,
		allow: { zero: !1 }
	}, [er[s]]);
}
//#endregion
//#region src/randomization/geometry/rndVector.ts
function dr(e) {
	return Ln(e, Q);
}
//#endregion
//#region src/randomization/random.ts
var fr = {
	equation: (e) => tn(e),
	polynom: (e) => X(e),
	monom: (e) => Rt(e),
	fraction: (e) => Y(e),
	number: (e, t, n) => V(e, t, n),
	numberSym: (e, t) => H(e, t),
	prime: (e) => vt(e),
	triplet: (e, t) => _t(e, t),
	bool: (e) => gt(e),
	array: (e, t) => yt(e, t),
	item: (e) => U(e),
	shuffle: (e) => bt(e),
	point: (e) => Q(e),
	point3: (e) => $(e),
	vector: (e) => dr(e),
	vector3: (e) => Zn(e),
	line: (e) => On(e),
	line3: (e) => ar(e),
	circle: (e) => vn(e)
}, pr = {
	Numeric: h,
	Fraction: g,
	Root: _,
	Monom: j,
	Polynom: M,
	Equation: I,
	Matrix: z,
	PolyMatrix: mt,
	LinearSystem: ut,
	Factor: L,
	PolyFactor: ft,
	LogicalSet: dt,
	Solution: k,
	TableOfSigns: $e,
	Interval: A,
	Domain: Qe,
	Random: fr,
	Geometry: {
		Vector: F,
		Point: P,
		Line: W,
		Triangle: xt,
		Circle: Ct,
		Line3: G,
		Plane3: wt,
		Sphere3: Et
	},
	Errors: {
		PiMathError: e,
		ParseError: t,
		DimensionError: n,
		MathError: r,
		InvalidArgumentError: i,
		NotImplementedError: a,
		UnsupportedOperationError: o,
		IndexError: s,
		StateError: c
	},
	NumExp: De
};
//#endregion
export { st as AbstractMatrix, Ct as Circle, St as CircleRelativePosition, n as DimensionError, Qe as Domain, I as Equation, R as FACTOR_DISPLAY, L as Factor, pe as FracType, g as Fraction, s as IndexError, A as Interval, i as InvalidArgumentError, W as Line, G as Line3, ut as LinearSystem, dt as LogicalSet, r as MathError, z as Matrix, j as Monom, a as NotImplementedError, De as NumExp, h as Numeric, t as ParseError, e as PiMathError, wt as Plane3, P as Point, ft as PolyFactor, mt as PolyMatrix, M as Polynom, fr as Random, _ as Root, k as Solution, Et as Sphere3, Tt as Sphere3RelativePosition, c as StateError, $e as TableOfSigns, xt as Triangle, N as TupleN, o as UnsupportedOperationError, F as Vector, it as areVectorsColinears, rt as areVectorsEquals, Ye as cmpLeft, Xe as cmpRight, pr as default, ot as determinantFromVectors, at as dotProduct };

//# sourceMappingURL=pimath.js.map