//#region src/errors.ts
var e = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = new.target.name;
	}
}, t = class extends e {}, n = class extends e {}, r = class extends e {}, i = class extends e {}, a = class extends e {}, o = class extends e {}, s = class extends e {}, c = 1e4, l;
function u(e) {
	let t = new Uint8Array(e + 1), n = [];
	for (let r = 2; r <= e; r++) if (t[r] === 0) {
		n.push(r);
		for (let n = r * r; n <= e; n += r) t[n] = 1;
	}
	return n;
}
function d(e) {
	let t = f(e), n = [], r, i;
	for (; t.length > 0;) r = t.shift() ?? 1, i = (t.length > 0 ? t.pop() : r) ?? 1, n.push([r, i]);
	return n;
}
function ee(...e) {
	let t = p(...e);
	return e.map((e) => e / t);
}
function f(e) {
	if (!Number.isInteger(e)) throw new i(`dividers expects a finite integer, got ${e}`);
	let t = Math.abs(e), n = Math.sqrt(t), r = [];
	for (let i = 1; i <= n; i++) e % i === 0 && (r.push(i), r.push(t / i));
	return r.sort(function(e, t) {
		return e - t;
	}), [...new Set(r)];
}
function p(...e) {
	let t = function(e, n) {
		return isNaN(e) || isNaN(n) ? NaN : n === 0 ? e : e === 0 ? n : t(n, e % n);
	}, n = 1, r = 2;
	if (e.length === 0) return 1;
	if (e.length === 1) return e[0] === 0 ? 1 : Math.abs(e[0]);
	if (n = t(e[0], e[1]), n === 1) return 1;
	for (r = 2; r < e.length && (n = t(n, e[r]), n !== 1); r++);
	return Math.abs(n);
}
function te(...e) {
	return e.reduce(function(e, t) {
		return Math.abs(e / p(e, t) * t);
	}, 1);
}
function ne(e, t = 3) {
	let n = Math.min(100, Math.max(0, Math.trunc(t)));
	return +e.toFixed(n);
}
function re(e) {
	return l ??= u(c), e === void 0 ? [...l] : l.slice(0, Math.min(l.length, e));
}
function ie(e, t) {
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
function ae(e, t = 2) {
	let n = Math.trunc(t), r = Math.round(Number(`${e}e${n}`));
	return Number(`${r}e${-n}`);
}
function oe(e, t) {
	if (t <= 0) return 1;
	if (e < 0) return t % 2 == 1 ? -oe(-e, t) : 1;
	let n = Math.floor(e ** (1 / t));
	for (; n > 1;) {
		let r = n ** +t;
		if (e % r === 0) return r;
		n--;
	}
	return 1;
}
function se(e, t) {
	if (t <= 0) return NaN;
	if (e < 0) return t % 2 == 1 ? -se(-e, t) : NaN;
	let n = e ** (1 / t), r = Math.round(n);
	return r ** +t === e ? r : n;
}
var m = Object.freeze({
	decompose: d,
	dividers: f,
	divideNumbersByGCD: ee,
	gcd: p,
	lcm: te,
	numberCorrection: ne,
	primes: re,
	pythagoreanTripletsWithTarget: ie,
	round: ae,
	greatestPower: oe,
	nthRoot: se
}), ce = /* @__PURE__ */ function(e) {
	return e.frac = "frac", e.dfrac = "dfrac", e.tfrac = "tfrac", e;
}({}), h = class e {
	#e = 1;
	#t = 3;
	#n = !0;
	#r = 1;
	#i = "frac";
	#a = !1;
	constructor(e, t) {
		return e !== void 0 && this.parse(e, t), this;
	}
	parse(t, n) {
		return t === "" ? this.zero() : typeof t == "number" && isNaN(t) ? this.invalid() : typeof t == "number" && !isFinite(t) ? (this.infinite(), t < 0 && this.opposite(), this) : typeof t == "string" ? this.fromString(t) : typeof t == "number" && n === void 0 ? this.fromNumber(t) : typeof t == "number" && typeof n == "number" ? this.fromNumbers(t, n) : t instanceof e ? this.copy(t) : this;
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
		return this.exact ? this.#e === 1 ? `${e}${this.#r}` : this.#r < 0 ? `-\\${this.#i}{ ${-this.#r} }{ ${this.#e} }` : `${e}\\${this.#i}{ ${this.#r} }{ ${this.#e} }` : e + this.value.toFixed(this.#t);
	}
	get display() {
		if (this.isInfinity()) return `${this.sign() === 1 ? "+" : "-"}oo`;
		let e = this.#a && this.isPositive() ? "+" : "";
		return this.exact ? this.#e === 1 ? `${e}${this.#r}` : `${e}${this.#r}/${this.#e}` : e + this.value.toFixed(this.#t);
	}
	static areEquals(...e) {
		return e.every((t) => t.isEqual(e[0]));
	}
	static average(...t) {
		let n = new e().zero();
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
		let n = t.map((t) => new e(t)), r = m.lcm(...n.map((e) => e.denominator));
		return n.forEach((e) => e.amplify(r / e.denominator)), n;
	}
	static unique(t) {
		let n = {}, r = [];
		return t.forEach((t) => {
			t instanceof e || (t = new e(t)), n[t.clone().reduce().tex] || (r.push(t.clone()), n[t.clone().reduce().tex] = !0);
		}), r;
	}
	static xMultiply(...t) {
		let n = new e();
		return t.forEach((e) => n.multiply(e, !1)), n;
	}
	abs() {
		return this.#r = Math.abs(this.#r), this.#e = Math.abs(this.#e), this;
	}
	add(t) {
		if (t instanceof e) {
			let e = this.#r, n = this.#e;
			this.#r = e * t.denominator + t.numerator * n, this.#e = n * t.denominator, this.exact = this.exact && t.exact;
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
	digits(e) {
		return this.#t = e, this;
	}
	divide(t) {
		let n = new e(t);
		if (n.numerator === 0) {
			let e = this.sign();
			return this.infinite(), e === -1 ? this.opposite() : this;
		}
		let r = this.#r, i = this.#e;
		return this.#r = r * n.denominator, this.#e = i * n.numerator, this.exact = this.exact && n.exact, this.reduce();
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
	fromNumber(e) {
		if (Number.isSafeInteger(e)) return this.#r = e, this.#e = 1, this.#n = !0, this;
		if (e.toString().includes("e") || e.toString().includes("E")) throw new i(`Exponential notation is not supported: ${e}`);
		let [, t] = e.toString().split("."), n = t ? t.length : 0, r = 10 ** n;
		return this.#r = e * r, this.#e = r, this.#r = m.numberCorrection(this.#r), this.#e = m.numberCorrection(this.#e), this.reduce(), this.#n = n < 10, this;
	}
	fromNumbers(e, t) {
		return t === 0 ? e === 0 ? this.invalid() : e < 0 ? this.infinite().opposite() : this.infinite() : Number.isSafeInteger(e) && Number.isSafeInteger(t) ? (this.#r = e, this.#e = t, this.#n = !0, this) : this.fromNumber(e / t);
	}
	fromPeriodic(e, t) {
		let [, n] = e.toString().split(/[.,]/), r = n ? n.length : 0;
		if (!Number.isSafeInteger(t) || t <= 0) throw new i("The periodic length must be a positive integer.");
		if (t > r) throw new i(`The periodic length (${t}) cannot exceed the number of decimal digits (${r}).`);
		let a = 10 ** r, o = 10 ** (r - t), s = +e, c = s < 0 ? -1 : 1, l = Math.abs(s);
		return this.#r = c * Math.round(l * a - Math.floor(l * o)), this.#e = a - o, this.#n = !0, this.reduce();
	}
	fromString(e) {
		let t = /^([+-]?)(\d*)\.(\d*)\((\d+)\)$/.exec(e);
		if (t) {
			let [, e, n, r, i] = t, a = `${n || "0"}.${r}${i}`;
			return this.fromPeriodic(a, i.length), e === "-" && this.opposite(), this.reduce();
		}
		if (e.includes("(") || e.includes(")")) return this.invalid();
		let n = e.split("/").map(Number);
		return this.#n = !0, n.length > 2 || n.some((e) => isNaN(e)) ? (this.#r = NaN, this) : n.length === 1 ? this.fromNumber(+e) : this.fromNumbers(n[0], n[1]);
	}
	infinite() {
		return this.#r = Infinity, this.#e = 1, this.exact = !0, this;
	}
	invalid() {
		return this.#r = NaN, this.#e = 1, this.exact = !0, this;
	}
	inverse() {
		let e = this.sign(), t = Math.abs(this.#r);
		return this.#r = Math.abs(this.#e) * e, this.#e = t, this;
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
		return Math.abs(m.gcd(this.#r, this.#e)) === 1;
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
		return this.#r *= r.numerator, this.#e *= r.denominator, this.exact = this.exact && r.exact, n ? this.reduce() : this;
	}
	get numerator() {
		return this.#r;
	}
	set numerator(e) {
		this.#r = e;
	}
	one() {
		return this.fromNumber(1);
	}
	opposite() {
		return this.#r = -this.#r, this;
	}
	pow(t) {
		if (t instanceof e) return this.pow(t.value);
		if (this.isNegative() && !Number.isInteger(t)) throw new r("A negative base cannot be raised to a non-integer exponent.");
		this.reduce(), t < 0 && this.inverse();
		let n = Math.abs(t);
		if (Number.isInteger(n)) return this.#r = Math.round(this.#r ** +n), this.#e = Math.round(this.#e ** +n), this;
		let i = Math.round(this.#r ** +n), a = Math.round(this.#e ** +n);
		return Math.round(i ** (1 / n)) === this.#r && Math.round(a ** (1 / n)) === this.#e ? (this.#r = i, this.#e = a) : (this.#r = this.#r ** +n / this.#e ** +n, this.#e = 1, this.exact = !1), this;
	}
	reduce() {
		let e = m.gcd(this.#r, this.#e);
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
		return this.fromNumber(0);
	}
}, g = class e {
	#e;
	#t;
	#n;
	#r = !1;
	constructor(e) {
		return this.#t = 2, this.#e = new h().zero(), this.#n = new h().zero(), e !== void 0 && this.parse(e), this;
	}
	parse(t) {
		return t instanceof e ? this.copy(t) : t instanceof h ? this.fromFraction(t) : typeof t == "string" ? this.fromString(t) : this.#i(t);
	}
	copy(e) {
		return this.index = e.index, this.radical = e.radical.clone(), this.factor = e.factor.clone(), this;
	}
	fromFraction(e) {
		return this.index = 2, this.factor = e.clone(), this.radical.one(), this;
	}
	fromString(e) {
		return e.includes("sqrt") ? this.#f(e) : e.includes("root") ? this.#d(e) : this.#i(e);
	}
	#i(e) {
		let n = new h(e);
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
		let i = new h(n);
		if (i.isNaN()) throw new t(`Cannot build a root from an invalid radical: "${n}"`);
		if (this.radical = i, r === void 0) this.factor = new h().one();
		else {
			let e = new h(r);
			if (e.isNaN()) throw new t(`Cannot build a root from an invalid factor: "${r}"`);
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
		return new h(this.index).inverse();
	}
	inverse() {
		if (this.isZero()) throw new r("Cannot invert a zero root.");
		return this.factor.inverse(), this.radical.inverse(), this;
	}
	isEqual(e) {
		if (this.isZero() && e.isZero()) return !0;
		if (!this.#a() || !e.#a() || this.#o() !== e.#o()) return !1;
		let t = m.lcm(this.index, e.index), n = this.factor.clone().abs().pow(t).multiply(this.radical.clone().abs().pow(t / this.index)), r = e.factor.clone().abs().pow(t).multiply(e.radical.clone().abs().pow(t / e.index));
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
		let n = m.gcd(t.index, e);
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
			this.radical = new h(e * t ** (this.index - 1)), this.factor.divide(t);
		}
		let e = m.greatestPower(this.radical.value, this.index);
		return this.factor.multiply(m.nthRoot(e, this.index)), this.radical.divide(e), this;
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
		return e < 0 ? this.index % 2 == 0 ? NaN : m.numberCorrection(this.factor.value * -((-e) ** (1 / this.index))) : m.numberCorrection(this.factor.value * e ** (1 / this.index));
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
		this.index = +a, this.radical = new h(o ?? s ?? "");
		let l;
		if (i === "" || i === "+" || i === "-") l = new h(i === "-" ? -1 : 1);
		else if (/^[+-]?\d+(?:\/\d+)?$/.test(i)) l = new h(i);
		else throw new t(`Invalid root format: "${e}"`);
		return c !== void 0 && l.divide(+c), this.factor = l, this;
	}
	#f(e) {
		let n = /^\((.+)\)\/(\d+)$/.exec(e);
		if (n) return this.#f(n[1]), this.factor.divide(+n[2]), this;
		let r = /^([+-]?\d*(?:\/\d+)?)sqrt(?:\((-?\d+(?:\/\d+)?)\)|(\d+))(?:\/(\d+))?$/.exec(e);
		if (!r) throw new t(`Invalid sqrt format: "${e}"`);
		let i = r[1], a = r.at(2), o = r.at(3), s = r.at(4);
		this.index = 2, this.radical = new h(a ?? o ?? "");
		let c;
		if (i === "" || i === "+" || i === "-") c = new h(i === "-" ? -1 : 1);
		else if (/^[+-]?\d+(?:\/\d+)?$/.test(i)) c = new h(i);
		else throw new t(`Invalid sqrt format: "${e}"`);
		return s !== void 0 && c.divide(+s), this.factor = c, this;
	}
}, _ = class e {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	constructor() {
		this.#o = "x", this.#n = !1, this.#t = null, this.#a = null, this.#r = new h().zero(), this.#i = new g(), this.#e = 1;
	}
	get tex() {
		if (this.#a) return this.#a;
		if (this.#i.isZero()) return this.#r.tex;
		if (this.#r.isZero()) return this.#i.tex;
		let [e] = h.toSameDenominateur(this.#r, this.#i.factor), t = this.#i.clone().multiply(e.denominator).reduce(), n = `${e.numerator} ${t.withSign.tex}`;
		return e.denominator === 1 ? n : `\\frac{ ${n} }{ ${e.denominator} }`;
	}
	set tex(e) {
		this.#a = e;
	}
	get display() {
		if (this.#t) return this.#t;
		if (this.#i.isZero()) return this.#r.display;
		if (this.#r.isZero()) return this.#i.display;
		let [e] = h.toSameDenominateur(this.#r, this.#i.factor), t = this.#i.clone().multiply(e.denominator).reduce(), n = `${e.numerator}${t.withSign.display}`;
		return e.denominator === 1 ? n : `(${n})/${e.denominator}`;
	}
	set display(e) {
		this.#t = e;
	}
	static fromFraction(t) {
		let n = new e();
		n.setExact();
		let r = new h(t);
		return n.display = r.display, n.tex = r.tex, n.fraction = r, n.root = new g(), n;
	}
	static fromQuadratic(t, n, r) {
		let [i, a, o] = [
			t,
			n,
			r
		].map((e) => new h(e)), s = a.clone().pow(2).subtract(i.clone().multiply(o).multiply(4));
		if (s.isNegative()) return [];
		if (s.isSquare()) {
			let t = s.sqrt(), n = a.clone().opposite().subtract(t).divide(i.clone().multiply(2)), r = a.clone().opposite().add(t).divide(i.clone().multiply(2));
			return t.isZero() ? [e.fromFraction(n)] : [e.fromFraction(n), e.fromFraction(r)];
		}
		let c = new e();
		c.fraction = a.clone().opposite().divide(i).divide(2), c.root = new g().from(2, s, i.clone().multiply(2).inverse().opposite()), c.setExact(!1);
		let l = new e();
		return l.fraction = a.clone().opposite().divide(i).divide(2), l.root = new g().from(2, s, i.clone().multiply(2).inverse()), l.setExact(!1), [c, l];
	}
	get count() {
		return this.#e;
	}
	set count(e) {
		this.#e = e;
	}
	get exact() {
		return this.#n;
	}
	set exact(e) {
		this.#n = e;
	}
	get fraction() {
		return this.#r;
	}
	set fraction(e) {
		this.#r = e;
	}
	isZero() {
		return this.#r.isZero() && this.#i.isZero();
	}
	reduce() {
		return this.#i.reduce(), this.#r.reduce(), this;
	}
	get root() {
		return this.#i;
	}
	set root(e) {
		this.#i = e;
	}
	setExact(e = !0) {
		return this.#n = e, this;
	}
	get value() {
		return this.fraction.value + this.root.value;
	}
	get variable() {
		return this.#o;
	}
	set variable(e) {
		e !== void 0 && (this.#o = e);
	}
}, le = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e instanceof L || e instanceof F ? new L(e) : new L().fromPolynom(e), this.#t = this.#e.getRoots();
	}
	get fx() {
		return this.#e;
	}
	get roots() {
		return this.#t;
	}
}, v = class {
	#e;
	#t;
	#n;
	#r;
	constructor(e, t, n = "x") {
		this.#e = 1e-4, this.#t = 0;
		let r;
		if ("moveLeft" in e) {
			let t = e;
			r = t.left.clone().subtract(t.right);
		} else r = e.clone().subtract(t ?? 0);
		let i = r.variables;
		this.#r = n === "x" ? i.length === 1 ? i[0] : "x" : n, this.#n = r.getCoefficients().reverse();
	}
	get bissectionComplexityCounter() {
		return this.#t;
	}
	get bissectionDeltaX() {
		return this.#e;
	}
	set bissectionDeltaX(e) {
		this.#e = e;
	}
	solve() {
		let e = this.#n.length - 1;
		if (e <= 0) return [];
		if (e === 1) return this.#f(this.#n);
		if (e === 2) return this.#p(this.#n);
		let { solutions: t, residual: n } = this.#d(this.#n), r = n.length - 1;
		return r <= 0 ? t.sort((e, t) => e.value - t.value) : r === 1 ? t.concat(this.#f(n)).sort((e, t) => e.value - t.value) : r === 2 ? t.concat(this.#p(n)).sort((e, t) => e.value - t.value) : r === 3 ? t.concat(this.#m(n)).sort((e, t) => e.value - t.value) : (this.#t = 0, t.concat(this.#h(n)).sort((e, t) => e.value - t.value));
	}
	solveAsCardan() {
		if (this.#n.length - 1 != 3) throw new r("The equation is not cubic.");
		return this.#m(this.#n);
	}
	#i(e, t) {
		let n = new _();
		return n.exact = !1, n.tex = t?.tex ?? null, n.display = t?.display ?? null, n.fraction = new h(e), n.fraction.exact = !1, n.variable = this.#r, n;
	}
	#a(e) {
		let t = e instanceof h && !e.exact ? this.#i(e.value) : _.fromFraction(e);
		return t.variable = this.#r, t;
	}
	#o(e, t) {
		let n = new h(0);
		for (let r = e.length - 1; r >= 0; r--) n.multiply(t).add(e[r]);
		return n;
	}
	#s(e, t) {
		let n = 0;
		for (let r = e.length - 1; r >= 0; r--) n = n * t + e[r].value;
		return n;
	}
	#c(e, t) {
		let n = e.length - 1, r = Array(n);
		r[n - 1] = e[n].clone();
		for (let i = n - 1; i >= 1; i--) r[i - 1] = e[i].clone().add(t.clone().multiply(r[i]));
		return r;
	}
	#l(e) {
		let t = e.length - 1, n = e[t].value, r = 0;
		for (let i = 0; i < t; i++) {
			let t = Math.abs(e[i].value / n);
			t > r && (r = t);
		}
		return 1 + r;
	}
	#u(e) {
		let t = m.lcm(...e.map((e) => e.denominator)), n = e.map((e) => e.clone().multiply(t).value), r = n.filter((e) => e !== 0).map((e) => Math.abs(e)), i = r.length > 0 ? m.gcd(...r) : 1, a = n.map((e) => e / i), o = Math.abs(a[0]), s = Math.abs(a[a.length - 1]), c = m.dividers(o), l = m.dividers(s), u = /* @__PURE__ */ new Set(), d = [];
		for (let e of c) for (let t of l) for (let n of [1, -1]) {
			let r = new h(n * e, t), i = `${r.numerator}/${r.denominator}`;
			u.has(i) || (u.add(i), d.push(r));
		}
		return d;
	}
	#d(e) {
		let t = [], n = 0;
		for (; n < e.length - 1 && e[n].isZero();) n++;
		let r = n > 0 ? e.slice(n) : e.slice();
		if (n > 0) {
			let e = this.#a(0);
			e.count = n, t.push(e);
		}
		let i = this.#u(r);
		for (let e of i) {
			if (r.length - 1 < 1) break;
			if (Math.abs(this.#s(r, e.value)) > 1e-9 || !this.#o(r, e).isZero()) continue;
			let n = this.#a(e.clone());
			for (n.count = 0; r.length - 1 >= 1 && this.#o(r, e).isZero();) r = this.#c(r, e), n.count++;
			t.push(n);
		}
		return {
			solutions: t,
			residual: r
		};
	}
	#f(e) {
		let t = e[0], n = e[1];
		return [this.#a(t.clone().opposite().divide(n))];
	}
	#p(e) {
		let t = e[0], n = e[1], r = e[2], i = n.clone().pow(2).subtract(r.clone().multiply(t).multiply(4));
		if (i.isNegative()) return [];
		let a = r.clone().multiply(2);
		if (i.isSquare()) {
			let e = i.sqrt(), t = n.clone().opposite().subtract(e).divide(a.clone()), r = n.clone().opposite().add(e).divide(a.clone());
			if (i.isZero()) {
				let e = this.#a(t);
				return e.count = 2, [e];
			}
			return [this.#a(t), this.#a(r)].sort((e, t) => e.value - t.value);
		}
		let o = new _();
		o.fraction = n.clone().opposite().divide(a.clone()), o.root.radical = i.clone(), o.root.factor = new h().one().divide(a.clone()), o.exact = !0, o.variable = this.#r;
		let s = new _();
		return s.fraction = n.clone().opposite().divide(a.clone()), s.root.radical = i.clone(), s.root.factor = new h().one().divide(a.clone()).opposite(), s.exact = !0, s.variable = this.#r, [o, s].sort((e, t) => e.value - t.value);
	}
	#m(e) {
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
		for (let e of l.map((e) => m.numberCorrection(e, 6))) u.some((t) => Math.abs(t - e) < 1e-6) || u.push(e);
		return u.map((e) => this.#i(e)).sort((e, t) => e.value - t.value);
	}
	#h(e) {
		let t = e.length - 1, n = this.#l(e), r = 2 * n / 100, i = [], a = -n, o = this.#s(e, a);
		for (let s = 1; s <= 100; s++) {
			let c = m.numberCorrection(-n + s * r), l = this.#s(e, c);
			if (l === 0) i.push(this.#i(c));
			else if (o * l < 0) {
				let t = this.#g(e, a, c);
				t !== null && i.push(this.#i(t));
			}
			if (i.length === t) break;
			a = c, o = l;
		}
		return i;
	}
	#g(e, t, n) {
		let r = this.#s(e, t);
		if (r * this.#s(e, n) > 0) return null;
		for (; (n - t) / 2 > this.#e;) {
			this.#t++;
			let i = (t + n) / 2, a = this.#s(e, i);
			if (a === 0) return i;
			r * a < 0 ? n = i : (t = i, r = a);
		}
		return (t + n) / 2;
	}
}, ue = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = new.target.name;
	}
}, y = class extends ue {}, b = class extends ue {}, de = class extends b {}, x = {
	pi: Math.PI,
	e: Math.exp(1)
}, S = /* @__PURE__ */ function(e) {
	return e.VARIABLE = "variable", e.COEFFICIENT = "coefficient", e.OPERATION = "operation", e.CONSTANT = "constant", e.FUNCTION = "function", e.FUNCTION_ARGUMENT = "function-argument", e.MONOM = "monom", e.LEFT_PARENTHESIS = "(", e.RIGHT_PARENTHESIS = ")", e;
}({}), C = /* @__PURE__ */ function(e) {
	return e.EXPRESSION = "expression", e.POLYNOM = "polynom", e.SET = "set", e.NUMERIC = "numeric", e;
}({});
function fe(e, t) {
	if (e = e.replace(/\s+/g, ""), e.length <= 1) return e;
	let n = Object.keys(t).filter((e) => t[e].type === S.FUNCTION).map((e) => e);
	n.sort((e, t) => t.length - e.length);
	let r = RegExp(`^(${n.join("|")})\\(`), i = Object.keys(x);
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
		if (t !== void 0 && e[t.length] !== "(") throw new y(`Function "${t}" must be followed by parentheses`);
		if (n.length > 0 && r.exec(e)) {
			let t = n.find((t) => e.startsWith(t));
			t && (u = t + "(", e = e.slice(t.length + 1), l = S.FUNCTION);
		} else if (i.length > 0 && a.exec(e)) {
			let t = i.find((t) => e.startsWith(t));
			t && (u = t, e = e.slice(t.length), l = S.CONSTANT);
		} else if (o.exec(e)) {
			let t = o.exec(e);
			t && (u = t[0], e = e.slice(t[0].length), l = S.COEFFICIENT);
		} else switch (u = e[0], e = e.slice(1), u) {
			case "(":
				l = S.LEFT_PARENTHESIS;
				break;
			case ")":
				l = S.RIGHT_PARENTHESIS;
				break;
			case ",":
				l = S.FUNCTION_ARGUMENT;
				break;
			case "+":
			case "-":
			case "*":
			case "/":
			case "^":
			case "%":
				l = S.OPERATION;
				break;
			default: l = S.VARIABLE;
		}
		if (u === void 0 || l === void 0) throw Error("The token is undefined");
		s += pe(c, l), s += u;
	}
	return s;
}
function pe(e, t) {
	return e === void 0 || e === S.OPERATION || t === S.OPERATION || e === S.LEFT_PARENTHESIS || e === S.FUNCTION || e === S.FUNCTION_ARGUMENT || t === S.RIGHT_PARENTHESIS || t === S.FUNCTION_ARGUMENT ? "" : "*";
}
var me = {
	"^": {
		precedence: 4,
		associative: "right",
		type: S.OPERATION
	},
	"*": {
		precedence: 3,
		associative: "left",
		type: S.OPERATION
	},
	"/": {
		precedence: 3,
		associative: "left",
		type: S.OPERATION
	},
	"+": {
		precedence: 2,
		associative: "left",
		type: S.OPERATION
	},
	"-": {
		precedence: 2,
		associative: "left",
		type: S.OPERATION
	},
	"%": {
		precedence: 3,
		associative: "left",
		type: S.OPERATION
	},
	"&": {
		precedence: 3,
		associative: "left",
		type: S.OPERATION
	},
	"|": {
		precedence: 3,
		associative: "left",
		type: S.OPERATION
	},
	"!": {
		precedence: 4,
		associative: "right",
		type: S.OPERATION
	},
	sin: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION,
		arity: 1
	},
	cos: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION,
		arity: 1
	},
	tan: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION,
		arity: 1
	},
	asin: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION,
		arity: 1
	},
	acos: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION,
		arity: 1
	},
	atan: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION,
		arity: 1
	},
	sqrt: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION,
		arity: 1
	},
	nthrt: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION,
		arity: 2
	},
	ln: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION,
		arity: 1
	},
	log: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION,
		arity: 1
	},
	logn: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION,
		arity: 2
	}
};
function w(...e) {
	let t = {};
	for (let n of e) t[n] = me[n];
	return t;
}
var T = {};
for (let [e, t] of Object.entries(me)) t.type === S.FUNCTION && (T[e] = t.arity ?? 1);
var he = w("^", "*", "/", "+", "-"), ge = w("^", "*", "/", "+", "-", "%", "sin", "cos", "tan", "asin", "acos", "atan", "sqrt", "nthrt", "ln", "log", "logn"), _e = ge, ve = w("&", "|", "!", "-"), E = class {
	#e;
	#t = [];
	#n = {};
	#r = [];
	#i;
	constructor(e) {
		this.#e = e === void 0 ? C.POLYNOM : e, this.tokenConfigInitialization();
	}
	get rpn() {
		return this.#t;
	}
	get rpnToken() {
		return this.#t.map((e) => e.token);
	}
	tokenConfigInitialization() {
		return this.#e === C.SET ? (this.#n = ve, this.#i = !1) : this.#e === C.NUMERIC ? (this.#n = ge, this.#i = !0) : this.#e === C.EXPRESSION ? (this.#n = _e, this.#i = !0) : (this.#n = he, this.#i = !0), this.#r = Object.keys(this.#n).sort((e, t) => t.length - e.length), this.#n;
	}
	NextToken(e, t) {
		let n, r;
		if (n = "", r = void 0, e[t] === "(") n = "(", r = S.LEFT_PARENTHESIS;
		else if (e[t] === ")") n = ")", r = S.RIGHT_PARENTHESIS;
		else if (e[t] === ",") n = ",", r = S.FUNCTION_ARGUMENT;
		else {
			for (let i of this.#r) if (e.substring(t, t + i.length) === i) {
				n += i, r = this.#n[i].type;
				break;
			}
			for (let i in x) if (e.substring(t, t + i.length) === i) {
				n += i, r = S.CONSTANT;
				break;
			}
			if (n === "") if (/[0-9.]/.exec(e[t])) {
				let i = /^([0-9.]+)/.exec(e.substring(t));
				n = i ? i[0] : "", r = S.COEFFICIENT;
			} else if (/[a-zA-Z]/.exec(e[t])) {
				let i = /^([a-zA-Z])/.exec(e.substring(t));
				n = i ? i[0] : "", r = S.VARIABLE;
			} else throw new y(`Unknown token "${e[t]}" at position ${t} in "${e}"`);
		}
		if (r === void 0) throw new y(`Token type is undefined for token ${n}`);
		return {
			token: n,
			nextPos: t + n.length,
			type: r
		};
	}
	parse(e, t) {
		let n = [], r = [], i = 0;
		for ((t ?? this.#i) && (e = fe(e, this.#n)); i < e.length;) {
			let t = i, { token: a, nextPos: o, type: s } = this.NextToken(e, i);
			if (i = o, i <= t) throw new y(`Parser stalled at position ${t} in "${e}"`);
			switch (s) {
				case S.COEFFICIENT:
				case S.VARIABLE:
				case S.CONSTANT:
					n.push({
						token: a,
						tokenType: s
					});
					break;
				case S.OPERATION:
					if (n.length === 0 && r.length === 0 && (a === "-" || a === "+") && n.push({
						token: "0",
						tokenType: S.COEFFICIENT
					}), r.length > 0) {
						let e = r[r.length - 1];
						for (; e.token in this.#n && (this.#n[a].associative === "left" && this.#n[a].precedence <= this.#n[e.token].precedence || this.#n[a].associative === "right" && this.#n[a].precedence < this.#n[e.token].precedence) && (n.push(r.pop() ?? {
							token: "",
							tokenType: S.OPERATION
						}), r.length !== 0);) e = r[r.length - 1];
					}
					r.push({
						token: a,
						tokenType: s
					});
					break;
				case S.FUNCTION_ARGUMENT:
					for (; r.length > 0 && r[r.length - 1].token !== "(";) n.push(r.pop() ?? {
						token: a,
						tokenType: s
					});
					if (r.length === 0) throw new y(`Misplaced argument separator ',' in "${e}"`);
					break;
				case S.LEFT_PARENTHESIS:
					r.push({
						token: a,
						tokenType: s
					}), e[i] === "-" && n.push({
						token: "0",
						tokenType: S.COEFFICIENT
					});
					break;
				case S.RIGHT_PARENTHESIS:
					for (; r.length > 0 && r[r.length - 1].token !== "(";) n.push(r.pop() ?? {
						token: a,
						tokenType: s
					});
					if (r.length === 0) throw new y(`Mismatched parentheses (unexpected ')') in "${e}"`);
					r.pop();
					break;
				case S.FUNCTION:
					r.push({
						token: a,
						tokenType: s
					});
					break;
				default: throw new y(`Token type ${a} is not handled`);
			}
		}
		if (r.some((e) => e.token === "(")) throw new y(`Mismatched parentheses (unclosed '(') in "${e}"`);
		return this.#t = n.concat(r.reverse()), this;
	}
}, ye = class {
	_rpn;
	_expression;
	constructor(e, t) {
		this._expression = e;
		try {
			this._rpn = new E(C.NUMERIC).parse(e, t).rpn;
		} catch (t) {
			throw new y(`There was a problem parsing: ${e}`, { cause: t });
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
		for (let t of this._rpn) t.tokenType === S.VARIABLE && e.add(t.token);
		return [...e];
	}
	isValid(e) {
		return this._isStructurallyValid() ? this.variables.every((t) => e !== void 0 && Object.hasOwn(e, t)) : !1;
	}
	_isStructurallyValid() {
		let e = 0;
		for (let t of this._rpn) switch (t.tokenType) {
			case S.COEFFICIENT:
			case S.VARIABLE:
			case S.CONSTANT:
				e += 1;
				break;
			case S.OPERATION:
				if (e < 2) return !1;
				--e;
				break;
			case S.FUNCTION: {
				let n = T[t.token] ?? 1;
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
		for (let n of this._rpn) if (n.tokenType === S.COEFFICIENT) t.push(+n.token);
		else if (n.tokenType === S.VARIABLE) {
			if (e === void 0 || !Object.hasOwn(e, n.token)) throw new de(`Missing value for variable "${n.token}"`);
			t.push(e[n.token]);
		} else if (n.tokenType === S.CONSTANT) t.push(x[n.token]);
		else if (n.tokenType === S.OPERATION) {
			if (n.token === "*") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new b(`The multiplication factors ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n * e);
			} else if (n.token === "/") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new b(`The division values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n / e);
			} else if (n.token === "+") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new b(`The addition values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n + e);
			} else if (n.token === "-") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new b(`The subtraction values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n - e);
			} else if (n.token === "%") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new b(`The modulo values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n % e);
			} else if (n.token === "^") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new b(`The base value ${n ?? "a"} or exponent ${e ?? "b"} are not defined`);
				t.push(n ** +e);
			}
		} else if (n.tokenType === S.FUNCTION) {
			let e = t.pop();
			if (e === void 0) throw new b(`The parameters for ${n.token} is not defined`);
			if (n.token === "sin") t.push(Math.sin(e));
			else if (n.token === "cos") t.push(Math.cos(e));
			else if (n.token === "tan") t.push(Math.tan(e));
			else if (n.token === "asin") t.push(Math.asin(e));
			else if (n.token === "acos") t.push(Math.acos(e));
			else if (n.token === "atan") t.push(Math.atan(e));
			else if (n.token === "sqrt") t.push(Math.sqrt(e));
			else if (n.token === "nthrt") {
				let n = t.pop();
				if (n === void 0) throw new b("The nthrt function requires two parameters");
				e % 2 == 0 && n < 0 ? t.push(NaN) : t.push((n < 0 ? -1 : 1) * Math.abs(n) ** (1 / e));
			} else if (n.token === "ln") t.push(Math.log(e));
			else if (n.token === "log") t.push(Math.log10(e));
			else if (n.token === "logn") {
				let n = t.pop();
				if (n === void 0) throw new b("The logn function requires two parameters");
				e <= 0 || e === 1 || n <= 0 ? t.push(NaN) : t.push(Math.log(n) / Math.log(e));
			}
		}
		if (t.length === 1) return this._numberCorrection(t[0]);
		throw new b(`There was a problem parsing: ${this._expression}`);
	}
	_numberCorrection(e, t = 8) {
		return +e.toFixed(t);
	}
}, D = class e {
	#e;
	#t;
	constructor(e) {
		return this.#e = new h().zero(), this.#t = {}, e !== void 0 && this.parse(e), this;
	}
	parse(t) {
		return t instanceof e ? this.copy(t) : t instanceof h ? this.fromFraction(t) : typeof t == "number" ? this.fromNumber(t) : this.fromString(t);
	}
	fromNumber(e) {
		return this.#e = new h(e), this.#t = {}, this;
	}
	fromFraction(e) {
		return this.#e = e.clone(), this.#t = {}, this;
	}
	fromLiteral(e, t) {
		this.#e = new h(e), this.#t = {};
		for (let e in t) this.#t[e] = t[e].clone();
		return this;
	}
	fromString(e) {
		return isNaN(Number(e)) ? this.#s(e) : this.fromNumber(Number(e));
	}
	copy(e) {
		return this.#e = e.coefficient.clone(), this.#t = {}, this.#n(e), this;
	}
	clone() {
		let t = new e();
		t.coefficient = this.#e.clone();
		for (let e in this.#t) t.setExponent(e, this.#t[e].clone());
		return t;
	}
	get tex() {
		return this.#i("tex");
	}
	get display() {
		return this.#i("display");
	}
	static gcd(...t) {
		for (let n of t) if (n.containsRationalPower()) return new e().zero();
		let n = new e();
		n.coefficient = new h(m.gcd(...t.map((e) => e.coefficient.numerator)), m.lcm(...t.map((e) => e.coefficient.denominator))).reduce();
		for (let e of t) {
			for (let t in n.literal) t in e.literal || n.removeVariable(t);
			for (let t in e.literal) !n.hasVariable(t) && e.literal[t].isStrictlyPositive() ? n.literal[t] = e.literal[t].clone() : n.literal[t] = e.literal[t].isLeq(n.literal[t]) ? e.literal[t].clone() : n.literal[t].clone();
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
		this.#e = new h(e);
	}
	containsRationalPower() {
		return Object.values(this.#t).some((e) => e.hasFractionalPart());
	}
	degree(e) {
		return this.variables.length === 0 ? new h().zero() : e === void 0 ? Object.values(this.#t).reduce((e, t) => e.clone().add(t)) : this.hasVariable(e) ? this.#t[e].clone() : new h().zero();
	}
	derivative(t = "x") {
		if (this.hasVariable(t)) {
			let e = this.#t[t].clone(), n = this.clone();
			return n.#t[t].subtract(1), n.#e.multiply(new h(e.clone())), n;
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
		let t = m.dividers(Math.abs(this.coefficient.numerator)), n = [];
		for (let e in this.literal) n = this.#a(n, e);
		let r = [];
		if (n.length > 0 && t.length > 0) for (let i of t) for (let t of n) r.push(new e().fromLiteral(i, t));
		else if (t.length === 0) for (let t of n) r.push(new e().fromLiteral(1, t));
		else for (let n of t) r.push(new e().fromNumber(n));
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
				e *= (r instanceof h ? r.value : r) ** this.#t[t].value;
			}
			return e;
		}
		let i = this.coefficient.clone();
		for (let e in this.#t) i.multiply(new h(n[e]).pow(this.#t[e]));
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
	isDivisible(e) {
		return this.isDivisibleBy(e);
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
		for (let t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) t[1] in this.#t || (this.#t[t[1]] = new h().zero()), this.#t[t[1]].add(+t[2]);
		for (let t of [...e.matchAll(/([a-z](?!\^))/g)]) t[1] in this.#t || (this.#t[t[1]] = new h().zero()), this.#t[t[1]].add(1);
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
		return this.#e = new h().one(), this.#t = {}, this;
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
		return t.hasVariable(e) ? (n = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(n), t.setExponent(e, n)) : (t.coefficient.isZero() && (t.coefficient = new h().one()), t.setExponent(e, 1)), t;
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
		return t instanceof h ? this.hasVariable(e) && t.isZero() ? (this.removeVariable(e), this) : (this.#t[e] = t.clone(), this) : this.setExponent(e, new h(t));
	}
	setLetter(e, t) {
		return this.setExponent(e, t);
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
		return this.#e = new h().zero(), this.#t = {}, this;
	}
	#n(e) {
		for (let t in e.literal) this.#t[t] = e.literal[t].clone();
	}
	#r(e) {
		if (e instanceof h || typeof e != "object") {
			let t = {};
			return this.variables.length > 0 && (t[this.variables[0]] = e instanceof h ? e : new h(e)), t;
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
			e[t] = new h(r), n.push(e);
		} else for (let i of e) {
			let e = {};
			for (let t in i) e[t] = i[t];
			e[t] = new h(r), n.push(e);
		}
		return n;
	}
	#o(t, n) {
		let r, i, a, o, s;
		if (n.tokenType === S.COEFFICIENT) t.push(new e(new h(n.token)));
		else if (n.tokenType === S.VARIABLE) {
			let r = new e().one();
			r.setExponent(n.token, 1), t.push(r.clone());
		} else if (n.tokenType === S.OPERATION) switch (n.token) {
			case "-":
				i = t.pop() ?? new e().zero(), r = t.pop() ?? new e().zero(), t.push(r.subtract(i));
				break;
			case "*":
				i = t.pop() ?? new e().one(), r = t.pop() ?? new e().one(), t.push(r.multiply(i));
				break;
			case "/":
				i = t.pop() ?? new e().one(), r = t.pop() ?? new e().one(), t.push(r.divide(i));
				break;
			case "^": s = t.pop()?.coefficient ?? new h().one(), a = t.pop() ?? new e().one(), o = a.variables[0], o && a.setExponent(o, s), t.push(a);
		}
	}
	#s(e) {
		let n;
		try {
			n = new E().parse(e);
		} catch (n) {
			throw new t(`Cannot parse "${e}" as a Monom`, { cause: n });
		}
		let r = n.rpn, i = [];
		if (r.length === 0) return this.zero(), this;
		if (r.length === 1) {
			let e = r[0];
			return this.one(), e.tokenType === S.COEFFICIENT ? this.coefficient = new h(e.token) : e.tokenType === S.VARIABLE && this.setExponent(e.token, 1), this;
		}
		for (let e of r) this.#o(i, e);
		return this.one(), this.multiply(i[0]), this;
	}
};
//#endregion
//#region src/helpers.ts
function be(e, t = !0) {
	return t ? `\\left( ${e} \\right)` : `(${e})`;
}
function O(e) {
	if (!e.startsWith("(") || !e.endsWith(")")) return e;
	let t = 0;
	for (let n = 0; n < e.length - 1; n++) if (e[n] === "(" ? t++ : e[n] === ")" && t--, t === 0) return e;
	return e.slice(1, -1);
}
function k(e, t, n, r, i) {
	return e.map((e, a) => r !== void 0 && a < r || i !== void 0 && a > i ? e : e === t ? n : e);
}
function A(e, t) {
	if (t.length !== 1) throw new i(`splitChar must be a single character, got: "${t}"`);
	let n = 0, r = 0, a = [];
	for (let i = 0; i < e.length; i++) {
		let o = e[i];
		o === "(" ? n++ : o === ")" ? n-- : o === t && n === 0 && (a.push(e.substring(r, i)), r = i + 1);
	}
	return a.push(e.substring(r)), a;
}
//#endregion
//#region src/algebra/operations.ts
function j(e, t) {
	if (!Number.isSafeInteger(t)) throw new i("Can only raise item by an integer");
	if (t < 0) throw new i("Can only raise item by a positive integer");
	if (t === 0) return e.one();
	let n = e.clone();
	for (let r = 1; r < t; r++) e.multiply(n);
	return e;
}
//#endregion
//#region src/algebra/polynom.ts
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
		if (this.#n = [], this.#t = [], this.#d(), n instanceof e) return this.copy(n);
		if (n instanceof D) return this.fromMonoms(n, ...r);
		if (n instanceof h || typeof n == "number") return r.length === 0 ? this.fromConstant(n) : this.fromCoefficients(n, ...r);
		if (typeof n == "string") return r.length === 0 ? this.fromString(n) : n.length === 1 ? this.setVariable(n).fromCoefficients(...r) : this.fromLinear(n, ...r);
		throw new t(`Cannot parse "${String(n)}" as a Polynom`);
	}
	copy(e) {
		return this.#e = e.#e, this.#n = e.monoms.map((e) => e.clone()), this.#d(), this;
	}
	clone() {
		let t = new e(), n = [];
		t.#e = this.#e;
		for (let e of this.#n) n.push(e.clone());
		return t.monoms = n, t;
	}
	get tex() {
		return this.#u("tex");
	}
	get display() {
		return this.#u();
	}
	static xMultiply(...t) {
		let n = new e().one();
		return t.forEach((e) => {
			n.multiply(e);
		}), n;
	}
	add(...t) {
		let n = [];
		for (let r of t) r instanceof e ? n.push(...r.monoms.map((e) => e.clone())) : r instanceof D ? n.push(r.clone()) : typeof r == "number" && Number.isSafeInteger(r) ? n.push(new D(r.toString())) : n.push(new D(r));
		return this.#n = this.#n.concat(n), this.reduce();
	}
	commonMonom() {
		let e = new D().one();
		e.coefficient = new h(this.gcdNumerator(), this.gcdDenominator());
		for (let t of this.variables) {
			e.setExponent(t, this.degree(t));
			for (let n of this.#n) if (e.setExponent(t, h.min(n.degree(t), e.degree(t))), e.degree(t).isZero()) break;
		}
		return e;
	}
	degree(e) {
		let t = new h().zero();
		for (let n of this.#n) t = h.max(n.degree(e).value, t);
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
		if (t instanceof h) return this.#c(t);
		if (typeof t == "number" && Number.isSafeInteger(t)) return this.#l(t);
		if (t instanceof D) return this.#a(new e(t));
		if (t instanceof e) {
			if (t.monoms.length === 1 && t.variables.length === 0) return this.#c(t.monoms[0].coefficient);
			let { quotient: e, reminder: n } = this.euclidean(t);
			if (n.isZero()) return this.#n = e.monoms, this.#d(), this;
			throw new r(`Cannot divide "${this.display}" by "${t.display}": non-zero remainder "${n.display}"`);
		}
		if (typeof t == "string") return this.#a(new e(t));
		throw new r(`Cannot divide "${this.display}" by "${String(t)}"`);
	}
	empty() {
		return this.#n = [], this.#d(), this;
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
		let n = new h().zero();
		return this.#n.forEach((t) => {
			n.add(t.evaluate(e, !1));
		}), n;
	}
	factorize(t) {
		if (this.#t = [], this.monoms.length === 1) return [this.clone()];
		let n = this.#f(t), r = this.clone().reorder(n), i = r.commonMonom();
		r.monomByDegree().coefficient.isStrictlyNegative() && i.opposite(), i.isOne() || (this.#t.push(new e(i)), r = r.euclidean(this.#t[0]).quotient);
		let a = new v(r, void 0, n).solve();
		if (a.length === 0) return this.#t.length === 0 ? this.#t = [this.clone()] : this.#t.push(r), this.#t;
		if (a.forEach((t) => {
			if (t.exact && t.root.isZero()) for (let r = 0; r < t.count; r++) t.fraction.hasFractionalPart() ? this.#t.push(new e().setVariable(n).fromCoefficients(t.fraction.denominator, -t.fraction.numerator)) : this.#t.push(new e().setVariable(n).fromCoefficients(1, t.fraction.clone().opposite()));
		}), this.#t.map((e) => e.degree().value).reduce((e, t) => e + t, 0) < this.degree().value) {
			let t = e.xMultiply(...this.#t);
			this.#t.push(this.clone().divide(t));
		}
		return this.#t;
	}
	get factors() {
		return this.#t.length === 0 && !this.isZero() ? this.factorize() : this.#t;
	}
	fromCoefficients(...e) {
		this.#n = [];
		let t = this.#e;
		return e.reverse().forEach((e, n) => {
			let r = new D();
			r.coefficient = new h(e), r.setExponent(t, n), this.#n.push(r);
		}), this.#d(), this.reorder();
	}
	fromConstant(e) {
		return this.#n = [new D(new h(e))], this.#d(), this;
	}
	fromLinear(e, ...n) {
		if (!/^[a-z]{2,}$/.test(e)) throw new t(`fromLinear expects at least two lowercase variables, got "${e}"`);
		let r = e.split(""), a = n.map((e) => new h(e));
		if (a.length > r.length + 1) throw new i(`Too many values: ${r.length} variables but ${a.length} values provided`);
		return this.empty(), a.forEach((e, t) => {
			let n = new D();
			n.coefficient = e.clone(), n.literalStr = r[t] ?? "", this.add(n);
		}), this.#d(), this;
	}
	fromMonoms(...e) {
		return this.#n = e.map((e) => e instanceof D ? e.clone() : new D(e)), this.#d(), this;
	}
	fromString(e) {
		return e !== "" && !isNaN(Number(e)) ? this.fromConstant(Number(e)) : this.#v(e);
	}
	gcdDenominator() {
		return m.gcd(...this.getDenominators());
	}
	gcdNumerator() {
		return m.gcd(...this.getNumerators());
	}
	getCoefficients() {
		if (!this.degree().isNatural()) throw new r("getCoefficients() requires a polynomial with integer degrees");
		let e = this.clone().reorder(), t = this.degree().value + 1, n = Array.from({ length: t }, () => new h(0));
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
		let r = this.#f(n), i = this.primitive(r), a = {}, o = {};
		return a[r] = new h(e), o[r] = new h(t), i.evaluate(o).subtract(i.evaluate(a));
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
	isDividableBy(e) {
		return this.isDivisibleBy(e);
	}
	isEqual(e) {
		return this.#s(e, "=");
	}
	hasCrossTerm() {
		return this.#n.some((e) => e.variables.length > 1);
	}
	isOne() {
		return this.#n.length === 1 && this.#n[0].coefficient.isOne() && this.degree().isZero();
	}
	isOppositeAt(e) {
		return this.#s(e.clone().opposite(), "=");
	}
	isSameAs(e) {
		return this.#s(e, "same");
	}
	isZero() {
		return this.#n.length === 1 && this.#n[0].coefficient.isZero() || this.#n.length === 0;
	}
	lcmDenominator() {
		return m.lcm(...this.getDenominators());
	}
	lcmNumerator() {
		return m.lcm(...this.getNumerators());
	}
	get length() {
		return this.#n.length;
	}
	limitTo(e, t) {
		let n = new h(e);
		if (n.isFinite()) {
			let e = this.#f(t);
			return this.evaluate({ [e]: n });
		}
		let r = this.monomByDegree(void 0, t), i = r.coefficient.sign(), a = r.degree(t);
		return a.isZero() ? r.coefficient.clone() : a.isStrictlyPositive() ? n.isPositive() ? i === 1 ? new h().infinite() : new h().infinite().opposite() : (a.value % 2 == 0 ? i : -i) === 1 ? new h().infinite() : new h().infinite().opposite() : new h().zero();
	}
	monomByDegree(e, t) {
		if (e === void 0) return this.monomByDegree(this.degree(t), t);
		let n = this.clone().reduce();
		for (let r of n.#n) if (r.degree(t).isEqual(e)) return r.clone();
		return new D().zero();
	}
	monomByVariable(e) {
		let t = this.clone().reduce();
		for (let n of t.#n) if (n.hasVariable(e)) return n.clone();
		return new D().zero();
	}
	monomByLetter(e) {
		return this.monomByVariable(e);
	}
	get monoms() {
		return this.#n.map((e) => e.clone());
	}
	set monoms(e) {
		this.#n = e, this.#d();
	}
	monomsByDegree(e, t) {
		if (e === void 0) return this.monomsByDegree(this.degree(t), t);
		let n = [], r = this.clone().reduce();
		for (let i of r.#n) i.degree(t).isEqual(e) && n.push(i.clone());
		return n;
	}
	multiply(...e) {
		if (e.length === 1) return this.#o(e[0]);
		let t = this.clone();
		for (let n of e) t.#o(n);
		return this.copy(t);
	}
	#o(t) {
		if (t instanceof e) return this.#g(t);
		if (t instanceof h) return this.#p(t);
		if (t instanceof D) return this.#h(t);
		if (Number.isSafeInteger(t) && typeof t == "number") return this.#m(t);
		if (typeof t == "string") try {
			let e = new h(t);
			return this.#p(e);
		} catch (e) {
			throw new r("Cannot multiply by this value.", { cause: e });
		}
		throw new r(`Cannot multiply by this value: ${t}`);
	}
	get numberOfVars() {
		return this.variables.length;
	}
	one() {
		return this.#n = [], this.#n.push(new D().one()), this.#d(), this;
	}
	opposite() {
		return this.#n = this.#n.map((e) => e.opposite()), this.#d(), this;
	}
	get plotFunction() {
		return this.#u("tex", !1, !1, !0);
	}
	pow(e) {
		return j(this, e), this.reduce();
	}
	primitive(t) {
		let n = new e();
		for (let e of this.#n) n.add(e.primitive(t));
		return n;
	}
	reduce() {
		let e = 0;
		for (; e < this.#n.length;) {
			for (let t = e + 1; t < this.#n.length; t++) this.#n[e].isSameAs(this.#n[t]) && (this.#n[e].add(this.#n[t]), this.#n.splice(t, 1), this.#n[e].isZero() && (this.#n[e] = new D().zero()), t--);
			e++;
		}
		this.#n = this.#n.filter((e) => !e.coefficient.isZero());
		for (let e of this.#n) e.coefficient.reduce();
		return this.length === 0 ? this.zero() : (this.#d(), this.reorder());
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
		return this.#n = a.reduce().monoms, this.#d(), this;
	}
	root() {
		throw new r("Cannot take the root from a polynom");
	}
	get roots() {
		return this.#i ||= (this.#r = this.degree().isZero() ? [] : new v(this.clone()).solve(), !0), this.#r;
	}
	setVariable(e) {
		if (!/^[a-z]$/.test(e)) throw new i(`setVariable expects a single lowercase variable, got "${e}"`);
		return this.#e = e, this;
	}
	sqrt() {
		throw new r("Cannot take the square root from a polynom");
	}
	subtract(...t) {
		let n = [];
		for (let r of t) r instanceof e ? n.push(...r.monoms.map((e) => e.clone().opposite())) : r instanceof D ? n.push(r.clone().opposite()) : n.push(new D(r).opposite());
		return this.#n = this.#n.concat(n), this.reduce();
	}
	tableOfSigns() {
		let e = this.roots, t = Array(2 * e.length + 1).fill("").map((e, t) => t % 2 == 0 ? "" : "z");
		if (t.length === 1) {
			let [e] = this.getCoefficients().map((e) => e.value);
			t = k(t, "", e > 0 ? "+" : "-");
		} else if (this.degree().isOne()) {
			let [e] = this.getCoefficients().map((e) => e.value);
			t[0] = e > 0 ? "-" : "+", t[1] = "z", t[2] = e > 0 ? "+" : "-";
		} else [e[0].value - 1, ...e.map((t, n) => n === e.length - 1 ? e[n].value + 1 : (e[n].value + e[n + 1].value) / 2)].forEach((e, n) => {
			let r = this.evaluate({ [this.#f()]: e }, !0);
			t[n * 2] = r > 0 ? "+" : "-";
		});
		return {
			roots: e,
			signs: t
		};
	}
	get value() {
		if (this.degree().isZero()) return this.monoms[0]?.coefficient.value ?? 0;
	}
	get variables() {
		return [...new Set(this.#n.flatMap((e) => e.variables))].sort();
	}
	zero() {
		return this.#n = [], this.#n.push(new D().zero()), this.#d(), this;
	}
	#s(e, t) {
		t ??= "=";
		let n = this.clone().reduce().reorder(), r = e.clone().reduce().reorder();
		switch (t) {
			case "=": return n.length !== r.length || !n.degree().isEqual(r.degree()) ? !1 : n.monoms.every((e, t) => e.isEqual(r.monoms[t]));
			case "same": return n.length !== r.length || !n.degree().isEqual(r.degree()) ? !1 : n.monoms.every((e, t) => e.isSameAs(r.monoms[t]));
			default: return !1;
		}
	}
	#c(e) {
		for (let t of this.#n) t.coefficient.divide(e);
		return this.#d(), this;
	}
	#l(e) {
		let t = new h(e);
		for (let e of this.#n) e.coefficient.divide(t);
		return this.#d(), this;
	}
	#u(e = "display", t, n, r) {
		let i = "";
		for (let n of this.#n) {
			if (n.coefficient.value === 0) continue;
			let a;
			a = r ? n.plotFunction : e === "tex" ? n.tex : n.display, i += `${n.coefficient.sign() === 1 && (i !== "" || t === !0) ? "+" : ""}${a}`;
		}
		return n === !0 && this.length > 1 && (i = e === "tex" ? `\\left( ${i} \\right)` : `(${i})`), i === "" && (i = "0"), i;
	}
	#d() {
		this.#i = !1, this.#t = [];
	}
	#f(e) {
		return e === void 0 ? this.variables.length === 1 ? this.variables[0] : this.#e : e;
	}
	#p(e) {
		for (let t of this.#n) t.coefficient.multiply(e);
		return this.reduce();
	}
	#m(e) {
		return this.#p(new h(e));
	}
	#h(e) {
		for (let t of this.#n) t.multiply(e);
		return this.reduce();
	}
	#g(e) {
		let t = [];
		for (let n of this.#n) for (let r of e.monoms) t.push(D.xMultiply(n, r));
		return this.#n = t, this.reduce();
	}
	#_(n, i) {
		switch (i.tokenType) {
			case S.COEFFICIENT:
				n.push(new e(i.token));
				break;
			case S.VARIABLE:
				n.push(new e().add(new D(i.token)));
				break;
			case S.CONSTANT: throw new t("Unsupported CONSTANT token in Polynom parser");
			case S.OPERATION:
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
			case S.MONOM: throw new t("Unexpected MONOM token in polynom parser");
			case S.FUNCTION: throw new t(`Unsupported function token "${i.token}" in polynom parser`);
		}
	}
	#v(e) {
		let n;
		try {
			n = new E().parse(e);
		} catch (n) {
			throw new t(`Cannot parse "${e}" as a Polynom`, { cause: n });
		}
		let r = n.rpn;
		this.zero();
		let i = [];
		for (let e of r) this.#_(i, e);
		return i.length === 1 && this.add(i[0]), this.reorder();
	}
}, N = [
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
], xe = {
	"=": "=",
	"<": ">",
	">": "<",
	"<=": ">=",
	">=": "<="
}, P = class e {
	#e;
	#t;
	#n;
	constructor(e, t, n) {
		return this.#e = new M().zero(), this.#t = new M().zero(), this.#n = "=", e !== void 0 && t === void 0 ? this.parse(e) : e !== void 0 && t !== void 0 && this.fromPolynoms(e, t, n), this;
	}
	parse(t) {
		return t instanceof e ? this.copy(t) : typeof t == "string" ? this.fromString(t) : this.fromPolynoms(t, new M().zero());
	}
	fromString(e) {
		let t = this.#o(e), n = e.split(t);
		return this.fromPolynoms(new M(n[0]), new M(n[1]), this.#s(t));
	}
	fromPolynoms(e, t, n) {
		return this.#e = new M(e), this.#t = new M(t), this.#n = this.#s(n), this;
	}
	copy(e) {
		return this.#e = e.#e.clone(), this.#t = e.#t.clone(), this.#n = e.#n, this;
	}
	clone() {
		return new e(this.#e.clone(), this.#t.clone(), this.#n);
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
		return h.max(this.#e.degree(e), this.#t.degree(e));
	}
	divide(...e) {
		let t = e.map((e) => new h(e)).filter((e) => !e.isZero()).map((e) => e.inverse());
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
		return t.isEqual(n) ? this.#n === e.#n : t.isOppositeAt(n) ? this.#n === xe[e.#n] : !1;
	}
	isLinearTo(e) {
		return this.isEquivalentTo(e);
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
		return n.#e.divide(i), n.#t.divide(i), this.#a(n);
	}
	get left() {
		return this.#e;
	}
	set left(e) {
		this.#e = e;
	}
	letters() {
		return this.variables;
	}
	moveLeft() {
		return this.#e = this.#e.clone().subtract(this.#t), this.#t = new M().zero(), this;
	}
	multiply(...e) {
		let t = this.clone();
		for (let n of e) {
			let e = new h(n);
			t.#e.multiply(e), t.#t.multiply(e), t.#n !== "=" && e.sign() === -1 && t.#c();
		}
		return this.#a(t);
	}
	get numberOfVars() {
		return this.variables.length;
	}
	opposite() {
		let e = this.#e.clone().opposite(), t = this.#t.clone().opposite();
		return this.#e = e, this.#t = t, this;
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
	set sign(e) {
		this.#n = this.#s(e);
	}
	get signAsTex() {
		return this.#n === ">=" ? "\\geq" : this.#n === "<=" ? "\\leq" : this.#n;
	}
	simplify() {
		let e = this.clone();
		return e.multiply(m.lcm(...e.#e.getDenominators(), ...e.#t.getDenominators())), e.divide(m.gcd(...e.#e.getNumerators(), ...e.#t.getNumerators())), this.#a(e);
	}
	solve() {
		return new v(this.clone()).solve();
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
	#o(e) {
		let n = N.find((t) => e.includes(t.token));
		if (n === void 0) throw new t("The equation is not valid (no sign found)");
		return n.token;
	}
	#s(e) {
		return e === void 0 ? "=" : N.find((t) => e.includes(t.token))?.sign ?? "=";
	}
	#c() {
		return this.#n = xe[this.#n], this;
	}
}, F = class e {
	#e;
	#t;
	#n;
	#r = !1;
	constructor(t, n) {
		return t instanceof e ? (this.#t = t.polynom.clone(), this.#n = t.power.clone(), n !== void 0 && this.#n.multiply(new h(n))) : t === void 0 ? (this.#t = new M(), this.#n = new h(1)) : (this.#t = new M(t), this.#n = new h(n ?? 1)), this.#e = 1, this;
	}
	parse() {
		throw new a("Method not implemented.");
	}
	copy() {
		throw new a("copy() is not yet implemented for Factor");
	}
	clone() {
		return new e(this);
	}
	get tex() {
		let e = this.power.numerator, t = this.power.denominator, n, r;
		return this.#e === 0 && t > 1 ? (n = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, r = e === 1 ? "" : `^{ ${e} }`) : (n = this.#r && this.power.isOne() ? this.polynom.tex : be(this.polynom.tex), r = t === 1 && e === 1 ? "" : `^{ ${this.power.tex} }`), n = `${n}${r}`, this.#e === 0 && e < 0 && (n = `\\frac{ 1 }{ ${n} }`), n;
	}
	get display() {
		let e = this.power.numerator, t = this.power.denominator, n, r;
		return this.#e === 0 && t > 1 ? (n = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, r = e === 1 ? "" : `^(${e})`) : (n = this.#r && this.power.isOne() ? this.polynom.display : be(this.polynom.display, !1), r = t === 1 && e === 1 ? "" : `^(${this.power.display})`), n = `${n}${r}`, this.#e === 0 && e < 0 && (n = `1/(${n})`), n;
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
		if (t instanceof e && this.isSameAs(t)) return this.power.subtract(t.power), this;
		let n = new M(t);
		if (this.isSameAs(n)) return this.power.subtract(1), this;
		throw new r("The two factors must be the same");
	}
	evaluate(e, t) {
		return t ? this.polynom.evaluate(e, !0) ** this.power.value : this.polynom.evaluate(e).pow(this.power);
	}
	fromPolynom(e) {
		return this.#t = new M(e), this.#n = new h(1), this;
	}
	hasVariable(e) {
		return this.polynom.hasVariable(e);
	}
	inverse() {
		return this.power.opposite(), this;
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
		if (this.polynom.monoms.length === 1 && this.power.isOne() && n.polynom.monoms.length === 1 && this.power.isOne()) return this.polynom.multiply(n.polynom), this;
		if (t instanceof e && this.isSameAs(t)) return this.power.add(t.power), this;
		let i = new M(t);
		if (this.isSameAs(i)) return this.power.add(1), this;
		throw new r("The two factors must be the same");
	}
	one() {
		return this.#t.one(), this.#n.one(), this;
	}
	opposite() {
		throw new a("Method not implemented.");
	}
	get polynom() {
		return this.#t;
	}
	set polynom(e) {
		this.#t = e;
	}
	pow(e) {
		return this.power.multiply(e), this;
	}
	get power() {
		return this.#n;
	}
	set power(e) {
		this.#n = new h(e);
	}
	primitive() {
		throw new a("Method not implemented.");
	}
	reduce() {
		throw new a("Method not implemented.");
	}
	root(e) {
		return this.power.divide(e), this;
	}
	sqrt() {
		return this.root(2);
	}
	subtract() {
		throw new r("Subtracting two factors is not possible");
	}
	tableOfSigns() {
		let e = this.power.clone().reduce(), t = this.polynom.tableOfSigns();
		return e.isStrictlyNegative() && (t.signs = k(t.signs, "z", "d")), e.denominator % 2 == 0 ? t.signs = k(t.signs, "-", "h") : e.numerator % 2 == 0 && (t.signs = k(t.signs, "-", "+")), {
			roots: t.roots,
			signs: t.signs
		};
	}
	get variables() {
		return this.polynom.variables;
	}
	get withPower() {
		return this.#e = 1, this;
	}
	get withRoot() {
		return this.#e = 0, this;
	}
	zero() {
		return this.#t.zero(), this.#n.one(), this;
	}
	static checkParseAsFactors(e) {
		let t = A(e, "+");
		if (t[0] === "" && t.shift(), t.length > 1) return !1;
		let n = A(e, "-");
		return n[0] === "" && n.shift(), !(n.length > 1);
	}
	static factorsFromString(t, n = !0) {
		if (!e.checkParseAsFactors(t)) return [new e(t, n ? 1 : -1)];
		let r = n ? 1 : -1, i = [];
		for (let n of t.matchAll(/\(([^)]+)\)(?:\^(-?[0-9]+(?:\/[0-9]+)?|\(-?[0-9]+(?:\/[0-9]+)?\)))?|([^(]+)/g)) if (n[1] !== void 0) {
			let t = (n[2] ?? "1").replace(/[()]/g, "");
			i.push(new e(new M(n[1]), new h(t).multiply(r)));
		} else n[3]?.trim() && i.push(new e(new M(n[3].trim()), new h(r)));
		return i;
	}
}, I = /* @__PURE__ */ function(e) {
	return e[e.ROOT = 0] = "ROOT", e[e.POWER = 1] = "POWER", e;
}({}), Se = class e {
	#e;
	#t;
	constructor(...e) {
		return this.#e = [], this.#t = [], e.length > 0 && this.parse(...e), this;
	}
	parse = (...e) => (this.#e = e.map((e) => new P(e)), this.#n(), this);
	copy() {
		throw new a("copy() is not yet implemented for LinearSystem");
	}
	clone = () => new e().parse(...this.#e.map((e) => e.clone()));
	get tex() {
		let e = this.clone().reorder();
		return this.buildTex(e.equations);
	}
	get display() {
		return this.tex + "as display";
	}
	static fromMatrix(t, r = "xyz") {
		let i = t[0].length;
		if (t.some((e) => e.length !== i)) throw new n("All rows must have the same number of columns");
		let a = r.split("").splice(0, i - 1);
		return new e(...t.map((e) => new P(new M(a.join(""), ...e), 0)));
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
			if (r === void 0 || r < 0 || r >= this.#e.length) throw new o("Index out of range");
			let e = new P(t);
			this.#e[r].add(e);
		}
		return this;
	}
	buildTex = (e, t) => {
		let n, r, i = [], a = [];
		for (let t of e) i = i.concat(t.variables);
		i = [...new Set(i)], i.sort();
		for (let o = 0; o < e.length; o++) {
			let s = e[o];
			n = [];
			for (let e of i) r = s.left.monomByVariable(e), n.length === 0 ? n.push(r.isZero() ? "" : r.tex) : n.push(r.isZero() ? "" : (r.coefficient.sign() === 1 ? "+" : "") + r.tex);
			if (n.push("="), n.push(s.right.tex), t?.[o] !== void 0) {
				n[n.length - 1] = n[n.length - 1] + " \\phantom{\\quad}";
				for (let e of t[o]) n.push(`\\ \\cdot\\ ${e.startsWith("-") ? "\\left(" + e + "\\right)" : e}`);
			}
			a.push(n.join("&"));
		}
		let o = 0;
		return t !== void 0 && t.length > 0 && (o = t[0].length), `\\left\\{\\begin{array}{${"r".repeat(i.length)}cl ${"|l".repeat(o)}}${a.join("\\\\ ")}\\end{array}\\right.`;
	};
	degree(e) {
		return h.max(...this.#e.map((t) => t.degree(e)));
	}
	get equations() {
		return this.#e;
	}
	set equations(e) {
		this.#e = e, this.#n();
	}
	evaluate(e, t) {
		throw new a("Method not implemented.");
	}
	hasVariable(e) {
		return this.#t.includes(e);
	}
	isEqual(e) {
		return this.equations.every((t, n) => t.isEqual(e.equations[n]));
	}
	get isSolvable() {
		return this.variables.length === this.#e.length;
	}
	get matrix() {
		return this.#r();
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
		if (t === void 0 || t < 0 || t >= this.#e.length) throw new o("Index out of range");
		return this.#e[t].multiply(e), this;
	}
	reduce() {
		return this.equations.forEach((e) => e.reduce()), this;
	}
	reorder = () => {
		for (let e of this.#e) e.reorder();
		return this;
	};
	solve() {
		let [e, t] = this.matrix, n = e.map((e, n) => [...e, t[n]]);
		for (let t = 0; t < e.length; t++) {
			let i = n[t][t].clone();
			if (i.isZero()) {
				let e = n.find((e, n) => n > t && !e[t].isZero());
				if (e) n[t].forEach((t, n) => t.add(e[n])), i = n[t][t].clone();
				else throw new r("Unsolvable...");
			}
			n[t] = n[t].map((e) => e.divide(i));
			for (let r = 0; r < e.length; r++) {
				if (r === t) continue;
				let e = n[r][t].clone().opposite();
				for (let i = 0; i < n[r].length; i++) n[r][i].add(n[t][i].clone().multiply(e));
				if (n[r].slice(0, n[r].length - 1).every((e) => e.isZero())) return n[r][n[r].length - 1].isZero() ? this.#i() : [];
			}
		}
		return this.#i(n);
	}
	solve_compute_factors(e) {
		let t = [], n = this.equations.map((t) => t.left.monomByVariable(e).coefficient.value);
		return n.forEach((e, r) => {
			for (let i = r + 1; i < n.length; i++) {
				let a = m.lcm(e, n[i]), o = e < 0 ? -1 : 1;
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
			if (r === void 0 || r < 0 || r >= this.#e.length) throw new o("Index out of range");
			let e = new P(t);
			this.#e[r].subtract(e);
		}
		return this;
	}
	get variables() {
		return this.#t;
	}
	set variables(e) {
		let t = typeof e == "string" ? e.split("") : [...e];
		t.sort(), this.#t = t;
	}
	#n = () => (this.#t = this.#e.reduce((e, t) => [.../* @__PURE__ */ new Set([...e, ...t.variables])], []), this.#t.sort(), this);
	#r = () => {
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
	};
	#i(e) {
		let t = [];
		return e ? (e.forEach((e, n) => {
			let r = _.fromFraction(e[e.length - 1]);
			r.variable = this.variables[n], t.push(r);
		}), t) : (this.variables.forEach((e) => {
			let n = _.fromFraction(Infinity);
			n.variable = e, t.push(n);
		}), t);
	}
}, Ce = class {
	#e;
	constructor(e) {
		return this.#e = [], e !== void 0 && this.parse(e), this;
	}
	parse = (e) => {
		try {
			this.#e = new E(C.SET).parse(e).rpn;
		} catch (n) {
			throw new t(`Cannot parse "${e}" as a LogicalSet`, { cause: n });
		}
		return this;
	};
	get tex() {
		let e = [];
		for (let t of this.#e) if (t.tokenType === "variable") e.push(t);
		else switch (t.token) {
			case "&":
				if (e.length >= 2) {
					let t = e.pop(), n = e.pop();
					t && n && (n.tokenType === "mix" && (n.token = `( ${n.token} )`), t.tokenType === "mix" && (t.token = `( ${t.token} )`), e.push({
						token: `${n.token} \\cap ${t.token}`,
						tokenType: "mix"
					}));
				}
				break;
			case "|":
				if (e.length >= 2) {
					let t = e.pop(), n = e.pop();
					t && n && (n.tokenType === "mix" && (n.token = `( ${n.token} )`), t.tokenType === "mix" && (t.token = `( ${t.token} )`), e.push({
						token: `${n.token} \\cup ${t.token}`,
						tokenType: "mix"
					}));
				}
				break;
			case "-":
				if (e.length >= 2) {
					let t = e.pop(), n = e.pop();
					t && n && (n.tokenType === "mix" && (n.token = `( ${n.token} )`), t.tokenType === "mix" && (t.token = `( ${t.token} )`), e.push({
						token: `${n.token} \\setminus ${t.token}`,
						tokenType: "mix"
					}));
				}
				break;
			case "!": if (e.length >= 1) {
				let t = e.pop();
				t && e.push({
					token: `\\overline{ ${t.token} }`,
					tokenType: "variable"
				});
			}
		}
		return e[0].token;
	}
	evaluate(e) {
		this.variables.forEach((t) => {
			Object.hasOwn(e, t) || (e[t] = !1);
		});
		let t = [];
		for (let n of this.#e) if (n.tokenType === "variable") t.push(e[n.token]);
		else if (n.tokenType === "operation") if (n.token === "!") if (t.length >= 1) {
			let e = t.pop();
			t.push(!e);
		} else return !1;
		else {
			let e = t.pop(), r = t.pop();
			if (e !== void 0 && r !== void 0) switch (n.token) {
				case "&":
					t.push(e && r);
					break;
				case "|":
					t.push(e || r);
					break;
				case "-": return !1;
			}
			else return !1;
		}
		return t.length === 1 && t[0];
	}
	get rpn() {
		return this.#e;
	}
	get variables() {
		return this.#e.filter((e) => e.tokenType === "variable").map((e) => e.token);
	}
	vennAB() {
		return this.#t({
			A: ["A", "AB"],
			B: ["B", "AB"]
		}, [
			"A",
			"B",
			"AB",
			"E"
		]);
	}
	vennABC() {
		return this.#t({
			A: [
				"A",
				"AB",
				"AC",
				"ABC"
			],
			B: [
				"B",
				"AB",
				"BC",
				"ABC"
			],
			C: [
				"C",
				"AC",
				"BC",
				"ABC"
			]
		}, [
			"A",
			"B",
			"C",
			"AB",
			"AC",
			"BC",
			"ABC",
			"E"
		]);
	}
	#t(e, t) {
		let n = [], r;
		if (t === void 0) {
			r = /* @__PURE__ */ new Set();
			for (let t in e) r = /* @__PURE__ */ new Set([...r, ...e[t] ?? []]);
		} else r = new Set(t);
		for (let t of this.#e) if (t.tokenType === "variable") e[t.token] === void 0 ? n.push(/* @__PURE__ */ new Set()) : n.push(new Set(e[t.token]));
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
		return [...n[0]].sort();
	}
}, L = class e {
	#e = I.POWER;
	#t = [];
	constructor(...e) {
		return this.parse(...e), this;
	}
	parse(...t) {
		return this.#t = [], t.length === 0 || t.forEach((t) => {
			if (typeof t == "string") return this.fromString(t);
			t instanceof e ? this.#t.push(...t.factors.map((e) => e.clone())) : this.#t.push(new F(t));
		}), this;
	}
	copy() {
		throw new a("copy() is not yet implemented for PolyFactor");
	}
	clone() {
		return new e(...this.#t.map((e) => e.clone()));
	}
	get tex() {
		let { num: e, den: t } = this.#i();
		return t.length === 0 ? e.length === 1 ? e[0].asSingle.tex : e.map((e) => e.tex).join("") : `\\frac{ ${e.length === 1 ? e[0].asSingle.tex : e.map((e) => e.tex).join("")} }{ ${t.length === 1 ? t[0].asSingle.tex : t.map((e) => e.tex).join("")} }`;
	}
	get display() {
		let { num: e, den: t } = this.#i();
		return t.length === 0 ? e.length === 1 ? e[0].asSingle.display : e.map((e, t) => t === 0 && e.polynom.monoms.length === 1 ? e.asSingle.display : e.display).join("") : `(${e.length === 1 ? e[0].asSingle.display : e.map((e) => e.display).join("")})/(${t.length === 1 ? t[0].asSingle.display : t.map((e) => e.display).join("")})`;
	}
	static #n(t, n) {
		let r = R(t), i = R(n), a = Object.keys(r).filter((e) => Object.hasOwn(i, e)).map((e) => {
			let t = r[e].reduce((e, t) => e.add(t.power), new h("0")), n = i[e].reduce((e, t) => e.add(t.power), new h("0"));
			return new F(e, h.min(t, n));
		});
		return new e(...a);
	}
	static #r(t, n) {
		let r = R(t), i = R(n), a = [.../* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(i)])].map((e) => {
			let t = Object.hasOwn(r, e) ? r[e].reduce((e, t) => e.add(t.power), new h("0")) : new h(0), n = Object.hasOwn(i, e) ? i[e].reduce((e, t) => e.add(t.power), new h("0")) : new h(0);
			return new F(e, h.max(t, n));
		});
		return new e(...a);
	}
	static gcd(...t) {
		if (t.length === 0) return new e().one();
		if (t.length === 1) return t[0];
		if (t.length === 2) return e.#n(t[0], t[1]);
		let n = t[0];
		return t.shift(), t.forEach((t) => n = e.#n(n, t)), n;
	}
	static lcm(...t) {
		if (t.length === 0) return new e().one();
		if (t.length === 1) return t[0];
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
		return this.#t = [...a.factors, new F(o)], i && this.divide(i), this.#t = this.#t.filter((e) => !e.power.isZero()), this;
	}
	get asPower() {
		return this.#e = I.POWER, this;
	}
	get asRoot() {
		return this.#e = I.ROOT, this;
	}
	degree(e) {
		return this.#t.reduce((t, n) => t.add(n.degree(e)), new h("0"));
	}
	get denominator() {
		return new e(...this.#t.filter((e) => e.power.isNegative()).map((e) => e.clone().inverse()));
	}
	derivative() {
		let t = [], n = this.#t.length;
		for (let r = 0; r < n; r++) {
			let n = this.#t.slice(), i = n.splice(r, 1)[0].derivative();
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
		}), new e().fromPolynom(t, n);
	}
	divide(...e) {
		for (let t of e) this.#t = this.#t.concat(t.clone().factors.map((e) => e.inverse()));
		return this;
	}
	evaluate(e, t) {
		return t ? this.#t.reduce((n, r) => n * r.evaluate(e, t), 1) : this.#t.reduce((t, n) => t.multiply(n.evaluate(e)), new h("1"));
	}
	factorize(t) {
		let n = [];
		this.#t.forEach((e) => {
			let r = e.polynom.factorize(t);
			if (r.length > 1) {
				let t = e.power.clone();
				n.push(...r.map((e) => new F(e, t)));
			} else n.push(e.clone());
		});
		let r = new e(...n), i = r.numerator.reduce(), a = r.denominator.reduce();
		return i.divide(a);
	}
	get factors() {
		return this.#t;
	}
	set factors(e) {
		this.#t = e;
	}
	fromPolynom(e, t) {
		if (this.#t = [new F(new M(e))], t) {
			let e = new M(t);
			if (e.isOne()) return this;
			if (e.isZero()) throw new r("Cannot divide by zero");
			this.#t.push(new F(e, -1));
		}
		return this;
	}
	fromString(e) {
		this.#t = [];
		let [n, ...r] = A(e, "/");
		if (n === "") throw new t("Parsing a PolyFactor from a string requires a numerator");
		if (r.length > 1) throw new t("Parsing a PolyFactor from a string only allows max one signe \"/\"");
		return this.#t = r.length === 0 ? F.factorsFromString(O(n), !0) : [...F.factorsFromString(O(n), !0), ...F.factorsFromString(O(r[0]), !1)], this;
	}
	getRoots() {
		return [];
	}
	getZeroes() {
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
		return this.#t.every((e) => e.isZero());
	}
	multiply(...t) {
		return t.forEach((t) => {
			let n = new e(t);
			this.#t = this.#t.concat(n.factors);
		}), this;
	}
	get numerator() {
		return new e(...this.#t.filter((e) => e.power.isPositive()));
	}
	one() {
		return this.#t = [new F("1", "1")], this;
	}
	opposite() {
		let e = this.#t.findIndex((e) => e.display === "(-1)");
		return e >= 0 ? this.#t.splice(e, 1) : this.#t.push(new F("-1", "1")), this;
	}
	pow(e) {
		return this.#t = this.#t.map((t) => t.pow(e)), this;
	}
	primitive() {
		throw new a("Method not implemented.");
	}
	reduce() {
		let e = R(this);
		this.#t = Object.values(e).map((e) => {
			let t = e[0].polynom;
			return new F(t, e.reduce((e, t) => e.add(t.power), new h("0")).reduce());
		}).filter((e) => !e.power.isZero());
		let t = new F(1), n = new F(1), r = this.#t.filter((e) => e.polynom.monoms.length === 1 && e.power.isRelative());
		return r.length > 0 && (r.forEach((e) => {
			e.power.isPositive() ? t.multiply(new F(e.polynom.clone().pow(e.power.value))) : n.multiply(new F(e.polynom.clone().pow(-e.power.value)));
		}), this.#t = this.#t.filter((e) => !(e.polynom.monoms.length === 1 && e.power.isRelative())), n.polynom.isOne() || this.#t.push(n.inverse()), t.polynom.isOne() || this.#t.push(t)), this;
	}
	root(e) {
		return this.#t = this.#t.map((t) => t.root(e)), this;
	}
	sort(e) {
		return this.#t.forEach((t) => t.polynom.reorder(e)), this.#t.sort((t, n) => {
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
	tableOfSigns() {
		let e = this.getZeroes(), t = e.map((e) => e.value), n = this.factorize().factors.map((e) => ({
			factor: new F(e),
			...e.tableOfSigns()
		}));
		return n.forEach((n) => {
			let r = Array(2 * e.length + 1).fill(""), i = n.signs.shift(), a = n.roots.shift(), o = r.map((e, r) => {
				if (r % 2 == 0) return i;
				if (a?.value !== t[(r - 1) / 2]) return "t";
				let o = n.signs.shift();
				return i = n.signs.shift(), a = n.roots.shift(), o;
			});
			n.roots = e, n.signs = o;
		}), {
			signs: n.map((e) => [...e.signs]).reduce((e, t) => e.length === 0 ? t : (t.forEach((t, n) => {
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
			roots: e,
			factors: n
		};
	}
	get variables() {
		return this.#t.reduce((e, t) => e.concat(t.variables), []);
	}
	zero() {
		return this.#t = [new F("0", "1")], this;
	}
	#i() {
		let e, t = [];
		return this.#e === I.ROOT ? (e = this.numerator.factors, t = this.denominator.factors) : e = this.#t, e.length === 0 && (e = [new F("1")]), {
			num: e,
			den: t
		};
	}
};
function R(e) {
	let t = new h().one(), n = new h().one(), r = e.factors.reduce((e, r) => {
		if (r.polynom.degree().isZero() && r.power.isRelative()) {
			let i = r.polynom.monoms[0].coefficient.pow(r.power.clone().abs());
			return r.power.isPositive() ? t.multiply(i) : n.multiply(i), e;
		}
		let i = r.polynom.display;
		return Object.hasOwn(e, i) ? e[i].push(r) : e[i] = [r], e;
	}, {}), { numerator: i, denominator: a } = t.divide(n).reduce();
	return i !== 1 && (r[i.toString()] = [new F(i, 1)]), a !== 1 && (r[a.toString()] = [new F(a, -1)]), r;
}
//#endregion
//#region src/algebra/matrix.ts
var we = class e {
	#e = null;
	#t = 0;
	#n = [];
	constructor(e, t) {
		return e && (t ??= e, this.fromDimensions(e, t)), this;
	}
	parse(e) {
		return this.fromValues(e);
	}
	copy() {
		throw new a("copy() is not yet implemented for Matrix");
	}
	clone() {
		let t = [];
		return this.#n.forEach((e) => {
			let n = [];
			e.forEach((e) => {
				n.push(e.clone());
			}), t.push(n);
		}), new e().fromValues(t);
	}
	get tex() {
		if (this.#n.length === 0) return "";
		let e = this.resolveTeXwrapper(), t = [
			`\\begin{${e}}`,
			...this.rows.map((e) => "	" + e.map((e) => this.#e !== null && e.value ? +e.value.toFixed(this.#e) : e.tex).join(" & ") + "\\\\"),
			`\\end{${e}}`
		].join("\n");
		return this.#e = null, t;
	}
	resolveWrapper() {
		return this.#t === 3 ? ["|", "|"] : this.#t === 4 ? ["||", "||"] : this.#t === 1 ? ["[", "]"] : this.#t === 2 ? ["{", "}"] : ["(", ")"];
	}
	resolveTeXwrapper() {
		return this.#t === 3 ? "vmatrix" : this.#t === 4 ? "Vmatrix" : this.#t === 1 ? "bmatrix" : this.#t === 2 ? "Bmatrix" : "pmatrix";
	}
	get display() {
		if (this.#n.length === 0) return "";
		let e = this.resolveWrapper(), t = e[0] + this.map((e) => this.#e !== null && e.value ? +e.value.toFixed(this.#e) : e.display).map((e) => `(${e.join(",")})`).join(",") + e[1];
		return this.#e = null, t;
	}
	add(e) {
		if (!this.canBeAdded(e)) throw new n("Cannot add a matrix with different dimensions.");
		return this.forEach((t, n, r) => {
			t.add(e.values[n][r]);
		}), this;
	}
	aij(e, t) {
		return e < 0 || e > this.dimension.rows || t < 0 || t > this.dimension.cols ? null : this.#n[e][t];
	}
	get asBmatrix() {
		return this.#t = 1, this;
	}
	get asBraceMatrix() {
		return this.#t = 2, this;
	}
	canBeAdded(e) {
		let { rows: t, cols: n } = this.dimension, { rows: r, cols: i } = e.dimension;
		return t === r && n === i;
	}
	canBeInverted() {
		return !(!this.isSquare() || this.determinant().isZero());
	}
	canBeMultiplied(e) {
		return this.dimension.cols === e.dimension.rows;
	}
	characteristic_polynom(t) {
		return t ??= "k", this.clone().subtract(new e(this.dimension.rows).one().multiply(new M(t))).determinant();
	}
	cofactor(e, t) {
		let n = this.clone();
		return n.values.splice(e, 1), n.values.forEach((e) => {
			e.splice(t, 1);
		}), n.determinant().multiply((-1) ** (e + t));
	}
	get cols() {
		let e = Array.from({ length: this.dimension.cols }, () => Array.from({ length: this.dimension.rows }, () => new M()));
		return this.forEach((t, n, r) => {
			e[r][n] = t;
		}), e;
	}
	determinant() {
		if (!this.isSquare()) throw new n("Matrix is not square");
		let e = new M();
		return this.#n.length === 1 ? this.#n[0][0].clone() : (this.values[0].forEach((t, n) => {
			let r = this.cofactor(0, n);
			e.add(t.clone().multiply(r));
		}), e);
	}
	get dimension() {
		return {
			rows: this.#n.length,
			cols: this.#n[0].length
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
	fromDimensions(e, t) {
		return this.#n = Array.from({ length: e }, () => Array.from({ length: t }, () => new M())), this;
	}
	fromString(e) {
		if (e.startsWith("((") && e.endsWith("))")) return this.fromString(e.substring(1, e.length - 1));
		let t = e.split("),(");
		return this.#n = t.map((e, n) => n === 0 ? e.substring(1).split(",") : n === t.length - 1 ? e.substring(0, e.length - 1).split(",") : e.split(",")).map((e) => e.map((e) => new M(e))), this;
	}
	fromValues(e) {
		this.#n = [];
		let t = e[0].length;
		if (e.some((e) => e.length !== t)) throw new n("Each line must be the same length");
		return e.forEach((e) => {
			let t = [];
			e.forEach((e) => {
				t.push(new M(e));
			}), this.#n.push(t);
		}), this;
	}
	fromVectors(...e) {
		this.#n = [];
		let t = e[0].dimension;
		if (e.some((e) => e.dimension !== t)) throw new n("Each vectors must be the same dimension");
		return this.fromDimensions(e[0].dimension, e.length), e.forEach((e, t) => {
			e.array.forEach((e, n) => {
				this.#n[n][t] = new M(e);
			});
		}), this;
	}
	inverse() {
		if (!this.canBeInverted()) throw new r("The matrix cannot be inverted.");
		let t = new e().fromDimensions(this.dimension.rows, this.dimension.cols);
		t.forEach((e, n, r) => {
			t.setValue(n, r, this.cofactor(n, r));
		}), t.transpose();
		let n = this.determinant();
		return t.forEach((e, t, r) => this.setValue(t, r, e.divide(n).reduce())), this;
	}
	isEqual(e) {
		if (!this.canBeAdded(e)) return !1;
		let t = !0;
		return this.forEach((n, r, i) => {
			t &&= n.isEqual(e.values[r][i]);
		}), t;
	}
	isOne() {
		for (let e = 0; e < this.#n.length; e++) for (let t = 0; t < this.#n[e].length; t++) if (t === e && !this.#n[e][t].isOne() || t !== e && !this.#n[e][t].isZero()) return !1;
		return !0;
	}
	isSquare() {
		return this.dimension.cols === this.dimension.rows;
	}
	isZero() {
		return this.flat().every((e) => e.isZero());
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
			let r = new e(this.dimension.rows, t.dimension.cols);
			return r.forEach((e, n, i) => {
				let a = this.rows[n], o = t.cols[i], s = new M();
				a.forEach((e, t) => {
					s.add(e.clone().multiply(o[t]));
				}), r.setValue(n, i, s);
			}), this.#n = r.values, this;
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
		return this.forEach((e) => {
			e.opposite();
		}), this;
	}
	get asPmatrix() {
		return this.#t = 0, this;
	}
	get asVmatrix() {
		return this.#t = 3, this;
	}
	get asDoubleVmatrix() {
		return this.#t = 4, this;
	}
	pow(e) {
		return j(this, e);
	}
	reduce() {
		throw new a("Not yet implemented");
	}
	get rows() {
		return this.#n;
	}
	setValue(e, t, n) {
		let { rows: r, cols: i } = this.dimension;
		if (e < 0 || e >= r || t < 0 || t >= i) throw new o(`${e}x${t} is out of range (${r}x${i})`);
		return this.#n[e][t] = new M(n), this;
	}
	subtract(e) {
		if (!this.canBeAdded(e)) throw new n("Cannot subtract a matrix with different dimensions.");
		return this.forEach((t, n, r) => {
			t.subtract(e.values[n][r]);
		}), this;
	}
	toFixed(e) {
		return this.#e = e, this;
	}
	transpose() {
		return this.clone().forEach((e, t, n) => {
			this.setValue(n, t, e.clone());
		}), this;
	}
	get values() {
		return this.#n;
	}
	zero() {
		return this.forEach((e) => e.zero()), this;
	}
};
//#endregion
//#region src/geometry/geomMath.ts
function Te(e, t) {
	return e.dimension === t.dimension && e.array.every((e, n) => t.array[n].isEqual(e));
}
function Ee(e, t) {
	if (e.dimension !== t.dimension) return !1;
	let n = t.array[0].value / e.array[0].value;
	return e.array.every((e, r) => t.array[r].value === e.value * n);
}
function De(e, t) {
	return e.dimension === t.dimension ? e.array.reduce((e, n, r) => e.add(n.clone().multiply(t.array[r])), new h(0)) : new h().invalid();
}
function Oe(...e) {
	if (e.some((t) => t.dimension !== e[0].dimension)) throw new n("All vectors must have the same dimension");
	if (e[0].dimension !== e.length) throw new n(`The determinant of dimension ${e[0].dimension} must have the same number of vectors (${e.length} given)`);
	return e[0].dimension === 2 ? e[0].array[0].clone().multiply(e[1].array[1]).subtract(e[0].array[1].clone().multiply(e[1].array[0])) : e[0].array[0].clone().multiply(e[1].array[1].clone().multiply(e[2].array[2]).subtract(e[1].array[2].clone().multiply(e[2].array[1]))).subtract(e[0].array[1].clone().multiply(e[1].array[0].clone().multiply(e[2].array[2]).subtract(e[1].array[2].clone().multiply(e[2].array[0])))).add(e[0].array[2].clone().multiply(e[1].array[0].clone().multiply(e[2].array[1]).subtract(e[1].array[1].clone().multiply(e[2].array[0]))));
}
//#endregion
//#region src/geometry/TupleN.ts
var z = class {
	#e = [];
	#t;
	constructor(...e) {
		this.#e = e.map((e) => new h(e));
	}
	cloneCoordinates() {
		return this.#e.map((e) => e.clone());
	}
	get array() {
		return this.#e;
	}
	set array(e) {
		this.#e = e;
	}
	get dimension() {
		return this.array.length;
	}
	fromString(e) {
		e.startsWith("(") && (e = e.substring(1)), e.endsWith(")") && (e = e.substring(0, e.length - 1));
		let t = e.split(/[,;\s]/g).filter((e) => e.trim() !== "");
		return t.length < 2 || (this.#e = t.map((e) => new h(e))), this;
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
		else if (e > this.dimension) for (let t = this.dimension; t < e; t++) this.#e.push(new h(0));
		return this;
	}
	get x() {
		return this.#e[0];
	}
	set x(e) {
		this.#e[0] = new h(e), this.#t?.();
	}
	get y() {
		return this.#e[1];
	}
	set y(e) {
		this.#e[1] = new h(e), this.#t?.();
	}
	get z() {
		if (this.dimension < 3) throw new n("Vector is not 3D");
		return this.#e[2];
	}
	set z(e) {
		if (this.dimension < 3) throw new n("Vector is not 3D");
		this.#e[2] = new h(e), this.#t?.();
	}
	zero = () => (this.#e.forEach((e) => e.zero()), this.#t?.(), this);
}, B = class e extends z {
	constructor(...e) {
		super(), e.length > 0 && this.parse(...e);
	}
	parse(...n) {
		if (n.length === 1) {
			if (n[0] instanceof z) return this.array = n[0].cloneCoordinates(), this;
			if (typeof n[0] == "string") return this.fromString(n[0]), this;
		}
		if (n.length > 1) {
			if (n.some((t) => t instanceof e)) throw new i("Creating a point with  multiple argument requires an input fraction");
			let r = n.map((e) => new h(e));
			if (r.some((e) => e.isNaN())) throw new t("The given values are not a valid point string (a,b): ");
			this.array = r;
		}
		return this;
	}
	clone() {
		return new e(...this.cloneCoordinates());
	}
	get tex() {
		return `\\left(${this.array.map((e) => e.tex).join(";")}\\right)`;
	}
	get display() {
		return `(${this.array.map((e) => e.display).join(";")})`;
	}
	distanceTo(e) {
		if (this.dimension !== e.dimension) throw new n("The two points must have the same dimensions.");
		let t = this.array.map((t, n) => e.array[n].clone().subtract(t)).reduce((e, t) => e.add(t.clone().pow(2)), new h(0));
		return new g().from(2, t).reduce();
	}
	isEqual(e) {
		return this.x.value === e.x.value && this.y.value === e.y.value;
	}
	isEqualXY(t, n) {
		return this.isEqual(new e(t, n));
	}
	middleOf(e, t) {
		if (e.dimension !== t.dimension) throw new n("Vectors must be the same dimension");
		return this.array = [], e.array.forEach((e, n) => {
			this.array.push(e.clone().add(t.array[n]).divide(2));
		}), this;
	}
}, V = class e extends z {
	constructor(...e) {
		return super(), e.length > 0 && this.parse(...e), this;
	}
	parse(...e) {
		if (e.length === 0) throw new i("Invalid value");
		if (e.length === 1) {
			if (e[0] instanceof z) return this.array = e[0].cloneCoordinates(), this;
			if (typeof e[0] == "string") return this.fromString(e[0]);
			throw new i("Invalid value");
		}
		if (e.length === 2) {
			let [t, r] = e;
			if (t instanceof z && r instanceof z) {
				if (t.dimension !== r.dimension) throw new n("Vectors must have the same dimension");
				return this.array = r.array.map((e, n) => e.clone().subtract(t.array[n])), this;
			}
		}
		return this.array = e.map((e) => new h(e)), this;
	}
	clone() {
		return new e(...this.cloneCoordinates());
	}
	copy() {
		throw new a("copy() is not yet implemented for Vector");
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
	add = (e) => (this.array.forEach((t, n) => t.add(e.array[n])), this);
	angle = (e, t, n) => {
		let r = this.dot(e).value;
		return t && (r = Math.abs(r)), (n ? 1 : 180 / Math.PI) * Math.acos(r / (this.norm * e.norm));
	};
	cross(t) {
		if (this.dimension !== 3 || t.dimension !== 3) throw new n("Cross product can only be determined in 3D");
		return new e(this.y.clone().multiply(t.z).subtract(this.z.clone().multiply(t.y)), this.z.clone().multiply(t.x).subtract(this.x.clone().multiply(t.z)), this.x.clone().multiply(t.y).subtract(this.y.clone().multiply(t.x)));
	}
	divideByScalar = (e) => this.multiplyByScalar(new h(e).inverse());
	dot = (e) => De(this, e);
	fromString(e) {
		return e.startsWith("((") && e.endsWith("))") ? super.fromString(e.slice(1, -1)) : super.fromString(e);
	}
	isColinearTo = (e) => Ee(this, e);
	isEqual = (e) => Te(this, e);
	isNormalTo = (e) => this.dot(e).isZero();
	get isNull() {
		return this.array.every((e) => e.isZero());
	}
	isOne() {
		return this.array.every((e, t) => t === 0 ? e.isOne() : e.isZero());
	}
	isZero() {
		return this.array.every((e) => e.isZero());
	}
	multiplyByScalar = (e) => {
		let t = new h(e);
		return this.array.forEach((e) => e.multiply(t)), this;
	};
	get norm() {
		return Math.sqrt(this.normSquare.value);
	}
	get normSquare() {
		return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new h(0));
	}
	normal = () => {
		if (this.dimension >= 3) throw new n("Normal vector can only be determined in 2D");
		let e = this.x.clone().opposite(), t = this.y.clone();
		return this.array[0] = t, this.array[1] = e, this;
	};
	one = () => (this.zero(), this.x.one(), this);
	opposite = () => (this.array.forEach((e) => e.opposite()), this);
	simplify = () => {
		let e = m.lcm(...this.array.map((e) => e.denominator)), t = m.gcd(...this.array.map((e) => e.numerator));
		return this.multiplyByScalar(new h(e, t)), this.x.isNegative() && this.opposite(), this;
	};
	subtract = (e) => this.add(e.clone().opposite());
	translate(...e) {
		return this.array.forEach((t, n) => t.add(e[n])), this;
	}
	unit = () => {
		let e = this.norm;
		return e === 0 ? this : this.divideByScalar(e);
	};
}, H = /* @__PURE__ */ function(e) {
	return e.None = "none", e.Parallel = "parallel", e.Perpendicular = "perpendicular", e.Tangent = "tangent", e;
}({}), ke = /* @__PURE__ */ function(e) {
	return e.None = "none", e.Parallel = "parallel", e.Perpendicular = "perpendicular", e.Tangent = "tangent", e;
}({});
//#endregion
//#region src/randomization/rndHelpers.ts
function Ae(e = .5) {
	return Math.random() < e;
}
function U(e, t, n) {
	if (t === void 0) return e >= 0 ? U(0, e) : U(e, 0);
	if (e === t) return e;
	if (n === void 0) return Math.floor(Math.random() * (t - e + 1) + e);
	if (Math.abs(t - e) <= n.length) throw new i("The number of excluded values is too high.");
	let r = U(e, t);
	for (; n.includes(r);) r = U(e, t);
	return r;
}
function W(e, t) {
	return t === !1 ? Ae() ? U(1, e) : -U(1, e) : U(-e, e);
}
function je(e, t) {
	let n = m.pythagoreanTripletsWithTarget(e).filter((e) => t === !0 || !e.includes(0));
	return n.length === 0 ? null : G(n);
}
function Me(e) {
	let t = m.primes();
	return e !== void 0 && (t = t.filter((t) => t < e)), G(t);
}
function Ne(e, t) {
	return t === void 0 && (t = 1), e.length <= 0 ? Object.values(e) : Pe(e).slice(0, t);
}
function G(e) {
	return e.length === 0 ? null : e[U(0, e.length - 1)];
}
function Pe(e) {
	let t = Object.values(e);
	for (let e = t.length - 1; e > 0; e--) {
		let n = Math.floor(Math.random() * (e + 1)), r = t[e];
		t[e] = t[n], t[n] = r;
	}
	return t;
}
//#endregion
//#region src/geometry/line.ts
var K = class e {
	static PARALLEL = H.Parallel;
	static PERPENDICULAR = H.Perpendicular;
	#e;
	#t;
	#n;
	#r;
	#i;
	#a = 1;
	constructor(...e) {
		return this.#t = new h().zero(), this.#n = new h().zero(), this.#r = new h().zero(), this.#e = new V(), this.#i = "lr", e.length > 0 && this.parse(...e), this;
	}
	parse = (...n) => {
		if (n.length === 0) return this;
		if (n.length === 1) {
			if (n[0] instanceof e) return this.fromCoefficient(n[0].a, n[0].b, n[0].c);
			if (n[0] instanceof P) return this.fromEquation(n[0]);
			if (typeof n[0] == "string") try {
				let e = new P(n[0]);
				return this.parse(e);
			} catch (e) {
				throw new t(`Cannot parse "${n[0]}" as a Line`, { cause: e });
			}
		}
		if (n.length === 2) {
			if (n[0] instanceof B && n[1] instanceof B) return this.fromPoints(n[0], n[1]);
			if (n[0] instanceof B && n[1] instanceof V) return this.fromPointAndDirection(n[0], n[1]);
		}
		return n.length === 3 && n.every((e) => h.isFraction(e)) ? this.fromCoefficient(n[0], n[1], n[2]) : (console.warn("Something wrong happened while creating the line"), console.warn(n), this);
	};
	copy() {
		throw new a("copy() is not yet implemented for Line");
	}
	clone = () => new e().fromCoefficient(this.#t, this.#n, this.#r);
	get tex() {
		let e = this.#a;
		switch (this.#a = 1, e) {
			case 0: return this.getEquation().reorder().tex;
			case 2: return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new M().parse("x", this.slope, this.height).tex;
			case 3:
			case 4: {
				let t = this.d.clone().simplify();
				return e === 3 ? `${V.asTex("x", "y")} = ${V.asTex(this.#e.x.tex, this.#e.y.tex)} + k\\cdot ${V.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}\n\tx &= ${new M(this.#e.x).add(new D(t.x).multiply(new D("k"))).reorder("k", !0).tex}\\\\\n\ty &= ${new M(this.#e.y).add(new D(t.y).multiply(new D("k"))).reorder("k", !0).tex}\n\\end{aligned}\\right.`;
			}
			default: {
				let e = this.getEquation();
				return e.left.monoms[0].coefficient.isNegative() && e.multiply(-1), e.tex;
			}
		}
	}
	get display() {
		let e = this.#a;
		switch (this.#a = 1, e) {
			case 0: return this.getEquation().reorder().display;
			case 2: return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new M().parse("x", this.slope, this.height).display;
			case 3: {
				let e = this.d.clone().simplify();
				return `((x,y))=((${this.#e.x.display},${this.#e.y.display}))+k((${e.x.display},${e.y.display}))`;
			}
			case 4: {
				let e = this.d.clone().simplify(), t = new M(this.#e.x).add(new D(e.x).multiply(new D("k"))).reorder("k", !0), n = new M(this.#e.y).add(new D(e.y).multiply(new D("k"))).reorder("k", !0);
				return `{(x,=,${t.display}),(y,=,${n.display}):}`;
			}
			default: {
				let e = this.getEquation();
				return e.left.monoms[0].coefficient.isNegative() && e.multiply(-1), e.display;
			}
		}
	}
	get OA() {
		return this.#e;
	}
	set OA(e) {
		this.fromPointAndNormal(e, this.n);
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
	canonicalAsFloatCoefficient(e = 2) {
		let t = "";
		return this.#t.isZero() || (t = this.#t.isOne() ? "x" : this.#t.clone().opposite().isOne() ? "-x" : this.#t.value.toFixed(e) + "x"), this.#n.isZero() || (this.#n.isPositive() && (t += "+"), t += this.#n.value.toFixed(e) + "y"), this.#r.isZero() || (this.#r.isPositive() && (t += "+"), t += this.#r.value.toFixed(e)), t + "=0";
	}
	get d() {
		let e = new V(this.#n.clone(), this.#t.clone().opposite());
		return (this.#i === "lr" && e.x.isNegative() || this.#i === "rl" && e.x.isPositive()) && e.opposite(), e;
	}
	set d(e) {
		this.fromPointAndDirection(this.OA, e);
	}
	get director() {
		return this.d;
	}
	distanceTo(e) {
		let t = e.x.clone().multiply(this.#t).add(e.y.clone().multiply(this.#n)).add(this.#r).abs(), n = this.normal.normSquare;
		return n.isZero() ? new g(0) : new g().from(2, n.inverse(), t).reduce();
	}
	fromCoefficient(e, t, n) {
		this.#t = new h(e), this.#n = new h(t), this.#r = new h(n);
		let r = [
			this.#t,
			this.#n,
			this.#r
		].every((e) => e.exact) ? m.lcm(this.#t.denominator, this.#n.denominator, this.#r.denominator) : 1;
		if (r > 1 && (this.#t.multiply(r).reduce(), this.#n.multiply(r).reduce(), this.#r.multiply(r).reduce()), this.#n.isZero()) return this.#e = new V(this.#r.clone().divide(this.#t).opposite(), 0), this;
		for (let e = 0; e < this.#n.value; e++) {
			let t = this.#t.clone().divide(this.#n).multiply(e).subtract(this.#r.clone().divide(this.#n)).reduce();
			if (this.#e = new V(e, t), t.isRelative()) return this;
		}
		let i = this.#r.clone().divide(this.#n).opposite().reduce();
		return this.#e = new V(0, i), this;
	}
	fromEquation(e) {
		e.reorder(!0);
		let t = new Set(e.variables);
		if (!(t.has("x") || t.has("y"))) return this;
		for (let e of ["x", "y"]) t.has(e) && t.delete(e);
		return t.size > 0 ? this : this.fromCoefficient(e.left.monomByVariable("x").coefficient, e.left.monomByVariable("y").coefficient, e.left.monomByDegree(0).coefficient);
	}
	fromParallel(e, t) {
		return this.fromPointAndNormal(t, e.n);
	}
	fromPerpendicular(e, t) {
		return this.fromPointAndNormal(t, e.d);
	}
	fromPointAndDirection(e, t) {
		return this.#i = t.x.isPositive() ? "lr" : "rl", this.fromPointAndNormal(e, t.clone().normal());
	}
	fromPointAndLine(e, t, n = H.Parallel) {
		return n === H.Perpendicular ? this.fromPointAndNormal(e, t.director) : this.fromPointAndNormal(e, t.normal);
	}
	fromPointAndNormal = (e, t) => t.isZero() ? (console.warn("Normal vector is null."), this) : (this.fromCoefficient(t.x, t.y, e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()), this.#e = new V(e.clone()), this);
	fromPoints(e, t) {
		return this.fromPointAndNormal(e, new V(e, t).normal());
	}
	getEquation() {
		return new P(new M().parse("xy", this.#t, this.#n, this.#r), new M("0")).simplify();
	}
	getValueAtX = (e) => {
		let t = this.getEquation(), n = new h(e);
		return t.canIsolate("y") ? t.isolate("y").right.evaluate({ x: n }) : new h().invalid();
	};
	getValueAtY = (e) => {
		let t = this.getEquation(), n = new h(e);
		return t.canIsolate("x") ? t.isolate("x").right.evaluate({ y: n }) : new h().invalid();
	};
	get height() {
		return this.#r.clone().opposite().divide(this.#n);
	}
	hitSegment(t, n) {
		let r = this.intersection(new e().fromPoints(t, n));
		return r.hasIntersection ? r.point.x.value >= Math.min(t.x.value, n.x.value) && r.point.x.value <= Math.max(t.x.value, n.x.value) && r.point.y.value >= Math.min(t.y.value, n.y.value) && r.point.y.value <= Math.max(t.y.value, n.y.value) : !1;
	}
	intersection = (e) => {
		let t = new B(), n = !1, r = !1;
		return this.#n.isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new h().invalid(), t.y = new h().invalid(), n = !0) : this.isSameAs(e) ? (t.x = new h().invalid(), t.y = new h().invalid(), r = !0) : (t.x = this.#n.clone().multiply(e.c).subtract(this.#r.clone().multiply(e.b)).divide(this.#t.clone().multiply(e.b).subtract(this.#n.clone().multiply(e.a))), t.y = this.#t.clone().multiply(e.c).subtract(this.#r.clone().multiply(e.a)).divide(this.#n.clone().multiply(e.a).subtract(this.#t.clone().multiply(e.b)))), {
			point: t,
			hasIntersection: !(n || r),
			isParallel: n,
			isSame: r
		};
	};
	isHorizontal() {
		return this.slope.value === 0;
	}
	isOnLine(e) {
		return this.#t.clone().multiply(e.x).add(this.#n.clone().multiply(e.y)).add(this.#r).isZero();
	}
	isParallelTo = (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height);
	isPerpendicularTo = (e) => this.d.isNormalTo(e.d);
	isSameAs = (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height);
	isVertical = () => this.slope.isInfinity();
	get n() {
		return this.d.normal();
	}
	get normal() {
		return new V(this.#t, this.#n);
	}
	randomNearPoint = (e) => {
		let t = this.randomPoint(e), n = 10;
		for (; this.isOnLine(t) && n > 0;) t.x.add(W(1, !1)), t.y.add(W(1, !1)), n--;
		return t;
	};
	randomPoint = (e) => new B(this.d.clone().multiplyByScalar(W(e === void 0 || e <= 1 ? 3 : e, !1)).add(this.#e));
	simplify = () => {
		let e = m.lcm(this.#t.denominator, this.#n.denominator, this.#r.denominator), t = m.gcd(this.#t.numerator, this.#n.numerator, this.#r.numerator);
		return this.fromCoefficient(this.#t.clone().multiply(e).divide(t), this.#n.clone().multiply(e).divide(t), this.#r.clone().multiply(e).divide(t)), this;
	};
	get slope() {
		return this.#t.clone().opposite().divide(this.#n);
	}
}, q = class e {
	#e = new B();
	#t = new B();
	#n = new B();
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
	parse = (...t) => {
		if (t.length === 1 && t[0] instanceof e) return this.copy(t[0]);
		if (t.length === 3) {
			if (t.every((e) => typeof e == "string")) {
				let [e, n, r] = t;
				return this.fromLines(e, n, r);
			}
			if (t.every((e) => e instanceof K)) return this.fromLines(t[0], t[1], t[2]);
			if (t.every((e) => e instanceof B)) return this.fromPoints(t[0], t[1], t[2]);
		}
		if (t.length === 6) {
			let e = t.map((e) => new h(e));
			if (e.some((e) => e.isNaN())) throw new i("One of the values is not a valid number");
			return this.fromCoordinates(e[0], e[1], e[2], e[3], e[4], e[5]);
		}
		return this;
	};
	clone = () => new e(this.#e.clone(), this.#t.clone(), this.#n.clone());
	copy(e) {
		return this.#e = e.A.clone(), this.#t = e.B.clone(), this.#n = e.C.clone(), this;
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
	fromCoordinates(e, t, n, r, i, a) {
		return this.fromPoints(new B(e, t), new B(n, r), new B(i, a));
	}
	fromLines(e, t, n) {
		let r = new K(e).clone(), i = new K(t).clone(), a = new K(n).clone(), o = r.intersection(i);
		if (o.hasIntersection) this.#t = o.point;
		else return this.#r = !1, this;
		if (o = i.intersection(a), o.hasIntersection) this.#n = o.point;
		else return this.#r = !1, this;
		if (o = a.intersection(r), o.hasIntersection) this.#e = o.point;
		else return this.#r = !1, this;
		return this.reset(), this.#i = {
			AB: r,
			AC: a,
			BC: i
		}, this;
	}
	fromPoints(e, t, n) {
		return this.#e = e.clone(), this.#t = t.clone(), this.#n = n.clone(), this.reset(), this;
	}
	getAngle(e) {
		let t = this.BC.norm, n = this.AC.norm, r = this.AB.norm;
		return e === "A" ? this.#c(t, n, r) : e === "C" ? this.#c(r, n, t) : this.#c(n, t, r);
	}
	getBisectors(e = !0) {
		if (e && this.#o.bisectors) return this.#o.bisectors;
		if (!e && this.#o.externalBisectors) return this.#o.externalBisectors;
		let t = this.#s("A", e), n = this.#s("B", e), r = this.#s("C", e), i = t.intersection(n).point;
		return e ? this.#o.bisectors = {
			A: t,
			B: n,
			C: r,
			intersection: i
		} : this.#o.externalBisectors = {
			A: t,
			B: n,
			C: r,
			intersection: i
		}, {
			A: t,
			B: n,
			C: r,
			intersection: i
		};
	}
	getHeights() {
		if (!this.#o.heights) {
			let e = new K().fromPointAndNormal(this.#e, new V(this.#t, this.#n)), t = new K().fromPointAndNormal(this.#t, new V(this.#e, this.#n)), n = new K().fromPointAndNormal(this.#n, new V(this.#e, this.#t)), r = e.intersection(t).point;
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
		let e = this.getMiddles();
		if (!this.#o.medians) {
			let t = new K().fromPoints(this.#e, e.BC), n = new K().fromPoints(this.#t, e.AC), r = new K().fromPoints(this.#n, e.AB), i = t.intersection(n).point;
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
		let e = this.getMiddles();
		if (!this.#o.mediators) {
			let t = new K().fromPointAndNormal(e.BC, new V(this.#t, this.#n)), n = new K().fromPointAndNormal(e.AC, new V(this.#e, this.#n)), r = new K().fromPointAndNormal(e.AB, new V(this.#e, this.#t)), i = t.intersection(n).point;
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
			AB: new B().middleOf(this.#e, this.#t),
			AC: new B().middleOf(this.#e, this.#n),
			BC: new B().middleOf(this.#t, this.#n)
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
	set isValid(e) {
		this.#r = e;
	}
	get lines() {
		return this.#i === null && (this.#i = {
			AB: new K(this.#e, this.#t),
			BC: new K(this.#t, this.#n),
			AC: new K(this.#e, this.#n)
		}), this.#i;
	}
	medianA() {
		return this.getMedians().A;
	}
	medianB() {
		return this.getMedians().B;
	}
	medianC() {
		return this.getMedians().C;
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
		let n = this.lines, r = new V(), i = new V(), a = new B();
		if (e === "A" ? (a = this.A.clone(), r = n.AB.clone().d, i = n.AC.clone().d) : e === "B" ? (a = this.B.clone(), r = n.AB.clone().d.opposite(), i = n.BC.clone().d) : e === "C" && (a = this.C.clone(), r = n.BC.clone().d.opposite(), i = n.AC.clone().d.opposite()), r === void 0 || i === void 0) throw new o(`The point ${e} does not exist`);
		let s = t ? r.unit().add(i.unit()) : r.unit().subtract(i.unit());
		return new K().fromPointAndDirection(a, s);
	}
	#c(e, t, n) {
		let r = (t ** 2 + n ** 2 - e ** 2) / (2 * t * n);
		return this.#a ? Math.acos(r) : m.numberCorrection(Math.acos(r) * 180 / Math.PI);
	}
	#l = (e) => {
		switch (e.toUpperCase()) {
			case "A": return this.#e;
			case "B": return this.#t;
			case "C": return this.#n;
		}
		return this.#e;
	};
	#u = (e, t) => new V(this.#l(e), this.#l(t));
}, J = class e {
	#e = null;
	#t = null;
	#n = 1;
	#r = null;
	constructor(...e) {
		e.length > 0 && this.parse(...e);
	}
	parse(...t) {
		return typeof t[0] == "string" ? this.fromString(t[0]) : t[0] instanceof P ? this.fromEquation(t[0]) : t[0] instanceof e ? this.copy(t[0]) : t.length === 2 && t[0] instanceof B && t[1] instanceof B ? this.fromCenterPoint(t[0], t[1]) : t.length >= 2 && t[0] instanceof B && (t[1] instanceof h || typeof t[1] == "number") ? this.fromCenterRadius(t[0], t[1], typeof t[2] == "boolean" && t[2]) : this;
	}
	clone() {
		return new e().fromCenterRadius(this.center.clone(), this.squareRadius.clone(), !0);
	}
	copy(e) {
		return this.#e = e.center.clone(), this.#r = e.squareRadius.clone(), this.#i(), this;
	}
	get tex() {
		if (this.#n === 0) return this.equation.moveLeft().reduce().tex;
		let e, t;
		return e = this.center.x.isZero() ? "x^2" : `\\left(x${this.center.x.isNegative() ? "+" : "-"}${this.center.x.clone().abs().tex}\\right)^2`, t = this.center.y.isZero() ? "y^2" : `\\left(y${this.center.y.isNegative() ? "+" : "-"}${this.center.y.clone().abs().tex}\\right)^2`, `${e}+${t}=${this.squareRadius.tex}`;
	}
	get display() {
		if (this.#n === 0) return this.equation.moveLeft().reduce().display;
		let e, t;
		return e = this.center.x.isZero() ? "x^2" : `(x${this.center.x.isNegative() ? "+" : "-"}${this.center.x.clone().abs().tex})^2`, t = this.center.y.isZero() ? "y^2" : `(y${this.center.y.isNegative() ? "+" : "-"}${this.center.y.clone().abs().tex})^2`, `${e}+${t}=${this.squareRadius.display}`;
	}
	get asCanonical() {
		return this.#n = 0, this;
	}
	get asCenterRadius() {
		return this.#n = 1, this;
	}
	get center() {
		return this.#e ?? new B();
	}
	get equation() {
		return this.#t?.clone() ?? new P("0=0");
	}
	fromCenterPoint(e, t) {
		return this.#e = e.clone(), this.#r = new V(this.#e, t).normSquare, this.#i(), this;
	}
	fromCenterRadius(e, t, n) {
		return this.#e = e.clone(), this.#r = n ? new h(t) : new h(t).pow(2), this.#i(), this;
	}
	fromEquation(e) {
		if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
			let t = e.left.monomByDegree(2, "x"), n = e.left.monomByDegree(2, "y"), r, i, a;
			if (t.coefficient.isEqual(n.coefficient)) return e.divide(t.coefficient), r = e.left.monomByDegree(1, "x"), i = e.left.monomByDegree(1, "y"), a = e.left.monomByDegree(0), this.#e = new B(r.coefficient.clone().divide(2).opposite(), i.coefficient.clone().divide(2).opposite()), this.#r = a.coefficient.clone().opposite().add(this.#e.x.clone().pow(2)).add(this.#e.y.clone().pow(2)), this.#i(), this;
			this.#a();
		}
		return this;
	}
	fromPoints(e, t, n) {
		let r = new q(e, t, n);
		if (!r.isValid || !r.remarquables) return this.#a(), this;
		let i = r.getMediators().c.clone(), a = r.getMediators().b.clone();
		return this.fromCenterPoint(i.intersection(a).point, e);
	}
	fromString(e) {
		return this.fromEquation(new P(e));
	}
	getPointsOnCircle() {
		let e = this.squareRadius.value;
		if (!Number.isInteger(e) || e < 0) return [];
		let t = m.pythagoreanTripletsWithTarget(e, !0), n = [];
		return t.forEach((e) => {
			for (let t of [
				[1, 1],
				[-1, 1],
				[-1, -1],
				[1, -1]
			]) {
				let r = this.center.x.clone().add(t[0] * e[0]), i = this.center.y.clone().add(t[1] * e[1]);
				n.every((e) => !e.isEqualXY(r, i)) && n.push(new B(r, i));
			}
		}), n;
	}
	isPointOnCircle = (e) => this.#t?.test({
		x: e.x,
		y: e.y
	}) ?? !1;
	isSame(e) {
		return e.center.isEqual(this.center) && e.radius.isEqual(this.radius);
	}
	lineIntersection(e) {
		if (this.#t === null) return [];
		let t = this.center, n = e.d, r = e.OA, i = n.normSquare, a = r.x.clone().subtract(t.x).multiply(n.x).add(r.y.clone().subtract(t.y).multiply(n.y)).multiply(2), o = r.x.clone().subtract(t.x).pow(2).add(r.y.clone().subtract(t.y).pow(2)).subtract(this.squareRadius), s = _.fromQuadratic(i, a, o);
		if (s.length === 0) return [];
		if (s.length === 1) {
			let e = r.add(n.clone().multiplyByScalar(s[0].fraction));
			return [new B(e.x, e.y)];
		}
		let c = s[0].exact ? r.clone().add(n.clone().multiplyByScalar(s[0].fraction)) : r.clone().add(n.clone().multiplyByScalar(s[0].value)), l = s[1].exact ? r.clone().add(n.clone().multiplyByScalar(s[1].fraction)) : r.clone().add(n.clone().multiplyByScalar(s[1].value));
		return [new B(c.x, c.y), new B(l.x, l.y)].sort((e, t) => n.x.isZero() ? n.y.isPositive() ? e.y.value - t.y.value : t.y.value - e.y.value : n.x.isPositive() ? e.x.value - t.x.value : t.x.value - e.x.value);
	}
	get radius() {
		return new g().from(2, this.#r ?? 0);
	}
	relativePosition(e) {
		if (this.#e === null || this.#r === null) return -1;
		let t = e.distanceTo(this.#e).pow(2).value, n = this.#r.value;
		return t - n > 1e-10 ? 0 : Math.abs(t - n) < 1e-10 ? 1 : 2;
	}
	setRadius(e, t) {
		return this.#r = t ? new h(e) : new h(e).pow(2), this.#i(), this;
	}
	get squareRadius() {
		return this.#r?.clone() ?? new h(-1);
	}
	tangents = (e) => e instanceof h ? this.#c(e) : this.isPointOnCircle(e) ? this.#o(e) : this.#e !== null && this.#e.distanceTo(e).value > this.radius.value ? this.#s(e) : [];
	#i() {
		this.#t = new P(new M(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`), new M(this.squareRadius.display)).moveLeft();
	}
	#a() {
		this.#e = null, this.#r = null, this.#t = null;
	}
	#o = (e) => {
		let t = new V(this.center, e);
		return [new K().fromPointAndNormal(e, t)];
	};
	#s = (e) => {
		let t = this.center.x.clone().subtract(e.x), n = this.center.y.clone().subtract(e.y), r = new M("x"), i = new M("x^2+1");
		return r.multiply(t).subtract(n).pow(2), i.multiply(this.squareRadius), new P(r, i).solve().map((t) => {
			let n, r = new P("y", "x");
			return t.exact ? (n = e.x.clone().opposite().multiply(t.fraction).add(e.y), r.right.multiply(t.fraction).add(n)) : (n = e.x.clone().opposite().multiply(t.value).add(e.y), r.right.multiply(t.value).add(n)), new K(r);
		});
	};
	#c = (e) => {
		let t = e.numerator, n = -e.denominator, r = this.center.x.clone(), i = this.center.y.clone(), a = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), o = r.clone().multiply(t).opposite().subtract(i.clone().multiply(n)).add(a.clone().sqrt()), s = r.clone().multiply(t).opposite().subtract(i.clone().multiply(n)).subtract(a.clone().sqrt());
		return [new K(t, n, o), new K(t, n, s)];
	};
}, Y = class e {
	static PARALLEL = ke.Parallel;
	static PERPENDICULAR = ke.Perpendicular;
	#e = new B();
	#t = new V();
	constructor(e, t) {
		return this.#e = e.clone(), this.#t = t instanceof B ? new V(e, t) : t.clone(), this;
	}
	clone = () => (this.#t = this.#t.clone(), this.#e = this.#e.clone(), this);
	get tex() {
		return {
			parametric: `${V.asTex("x", "y", "z")} = ${V.asTex(this.#e.x.tex, this.#e.y.tex, this.#e.z.tex)} + k\\cdot ${V.asTex(this.#t.x.tex, this.#t.y.tex, this.#t.z.tex)}`,
			system: `\\left\\{\\begin{aligned}
    x &= ${new M(this.#e.x).add(new D(this.#t.x).multiply(new D("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new M(this.#e.y).add(new D(this.#t.y).multiply(new D("k"))).reorder("k", !0).tex}\\\\
    z &= ${new M(this.#e.z).add(new D(this.#t.z).multiply(new D("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
			cartesian: `\\frac{ ${new M("x", 1, this.#e.x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new M("y", 1, this.#e.y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new M("z", 1, this.#e.z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
		};
	}
	get display() {
		let e = this.#e.x.display, t = this.#e.y.display, n = this.#e.z.display, r = this.direction.simplify(), i = r.x.display, a = r.y.display, o = r.z.display;
		return {
			parametric: `${V.asDisplay("x", "y", "z")} = ${V.asDisplay(this.#e.x.display, this.#e.y.display, this.#e.z.display)} + k\\cdot ${V.asDisplay(this.#t.x.display, this.#t.y.display, this.#t.z.display)}`,
			system: "",
			cartesian: `(x-${e})/${i} = (y-${t})/${a} = (z-${n})/${o}`
		};
	}
	get OA() {
		return this.#e;
	}
	set OA(e) {
		this.#e = e;
	}
	get d() {
		return this.#t;
	}
	set d(e) {
		this.#t = e;
	}
	get direction() {
		return this.#t.clone();
	}
	distanceTo(e) {
		let t = new V(this.#e, e), n = this.direction, r = this.direction.normSquare, i = t.cross(n).normSquare.clone().divide(r), a = i.clone().sqrt();
		return {
			value: Math.sqrt(i.value),
			fraction: i.clone().sqrt(),
			tex: a.exact ? a.tex : `\\sqrt{${i.tex}}`
		};
	}
	hitSegment(t, n) {
		let r = this.intersection(new e(t, n));
		return r.hasIntersection ? r.point.x.value >= Math.min(t.x.value, n.x.value) && r.point.x.value <= Math.max(t.x.value, n.x.value) && r.point.y.value >= Math.min(t.y.value, n.y.value) && r.point.y.value <= Math.max(t.y.value, n.y.value) && r.point.z.value >= Math.min(t.z.value, n.z.value) && r.point.z.value <= Math.max(t.z.value, n.z.value) : !1;
	}
	intersection = (e) => {
		throw new a("Method not implemented.");
	};
	isOnLine = (e) => !1;
	isParallelTo = (e) => {
		throw new a("Method not implemented.");
	};
	isPerpendicularTo = (e) => {
		throw new a("Method not implemented.");
	};
	isSameAs = (e) => {
		throw new a("Method not implemented.");
	};
	isVertical = () => {
		throw new a("Method not implemented.");
	};
	get point() {
		return this.#e.clone();
	}
	randomPoint = (e = 5) => {
		let t = this.#e.clone(), n = new h(W(e, !1));
		return new B(t.x.clone().add(this.#t.x.clone().multiply(n)), t.y.clone().add(this.#t.y.clone().multiply(n)), t.z.clone().add(this.#t.z.clone().multiply(n)));
	};
	simplify = () => {
		throw new a("Method not implemented.");
	};
}, Fe = class e {
	#e = new V(0, 0, 1);
	#t = new B(0, 0, 0);
	constructor(e) {
		return e && this.parse(e), this;
	}
	parse(e) {
		if (e.point && e.normal) {
			this.point = e.point, this.normal = e.normal;
			return;
		}
		if (e.point && e.directions?.length === 2) {
			this.point = e.point;
			let [t, n] = e.directions;
			this.normal = t.cross(n);
			return;
		}
		if (e.equation) {
			let t = e.equation.moveLeft().reduce().left, n = t.monomByVariable("x").coefficient, r = t.monomByVariable("y").coefficient, i = t.monomByVariable("z").coefficient, a = t.monomByDegree(0).coefficient;
			this.normal = new V(n, r, i), this.point = n.isNotZero() ? new B(a.clone().divide(n).opposite(), 0, 0) : r.isNotZero() ? new B(0, a.clone().divide(r).opposite(), 0) : new B(0, 0, a.clone().divide(i).opposite());
			return;
		}
		if (e.points?.length === 3 && e.points.every((e) => e instanceof V)) {
			let t = e.points[0], n = e.points[1], r = e.points[2], i = new V(t, n), a = new V(t, r);
			this.normal = i.cross(a), this.point = t;
			return;
		}
		if (e.coefficients?.length === 4) {
			let [t, n, r, i] = e.coefficients;
			this.normal = new V(t, n, r), this.point = new B(0, 0, -i);
			return;
		}
	}
	get tex() {
		return new P(new M("xyz", this.a, this.b, this.c, this.d), new M(0)).reduce().tex;
	}
	get display() {
		return new P(new M("xyz", this.a, this.b, this.c, this.d), new M(0)).reduce().display;
	}
	get a() {
		return this.#e.x;
	}
	angle(t, r, i) {
		if (t instanceof e) return this.normal.angle(t.normal, r, i);
		let a;
		if (t instanceof V) {
			if (t.dimension !== 3) throw new n("Vector is not 3D");
			a = t;
		} else a = t.direction;
		return (i ? Math.PI / 2 : 90) - this.normal.angle(a, !0, i);
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
	distanceTo(e) {
		return this.normal.dot(e).add(this.d).abs().value / this.normal.norm;
	}
	intersectWithLine(e) {
		let { point: t, direction: n } = e, r = this.normal.dot(t).add(this.d).divide(this.normal.dot(n).opposite());
		return new B(new V(t).add(n.clone().multiplyByScalar(r)));
	}
	intersectWithPlane(e) {
		throw this.normal.cross(e.normal), new B(0, 0, 0), new a("Intersection with plane  not yet implemented !");
	}
	isPointOnPlane(e) {
		return this.normal.dot(e).add(this.d).isZero();
	}
	get normal() {
		return this.#e;
	}
	set normal(e) {
		this.#e = new V(e);
	}
	get point() {
		return this.#t;
	}
	set point(e) {
		this.#t = new B(e);
	}
}, Ie = /* @__PURE__ */ function(e) {
	return e[e.INTERIOR = 0] = "INTERIOR", e[e.EXTERIOR = 1] = "EXTERIOR", e[e.SECANT = 2] = "SECANT", e[e.TANGENT_INSIDE = 3] = "TANGENT_INSIDE", e[e.TANGENT_OUTSIDE = 4] = "TANGENT_OUTSIDE", e[e.SUPERPOSED = 5] = "SUPERPOSED", e[e.CONCENTRIC = 6] = "CONCENTRIC", e;
}({}), Le = class {
	#e = void 0;
	#t = void 0;
	#n = void 0;
	#r = 1;
	constructor(e, t) {
		return e && t && (this.#e = e, this.#t = new h(t).clone().pow(2), this.#a()), this;
	}
	fromEquation(e) {
		let t = new P(e).moveLeft().reduce(), n = [
			"x",
			"y",
			"z"
		];
		if (n.some((e) => t.degree(e).value !== 2)) return this.makeUndefined();
		let r = t.left.monomByDegree(2, "x").coefficient;
		return n.some((e) => t.left.monomByDegree(2, e).coefficient.isNotEqual(r)) ? this.makeUndefined() : (this.#e = new B(t.left.monomByDegree(1, "x").coefficient.clone().opposite().divide(2), t.left.monomByDegree(1, "y").coefficient.clone().opposite().divide(2), t.left.monomByDegree(1, "z").coefficient.clone().opposite().divide(2)), this.#t = t.left.monomByDegree(0).coefficient.clone().opposite().add(this.#e.x.clone().pow(2)).add(this.#e.y.clone().pow(2)).add(this.#e.z.clone().pow(2)), this.#a(), this);
	}
	get center() {
		if (this.#e === void 0) throw new s("Sphere3 is undefined");
		return this.#e;
	}
	get squareRadius() {
		if (this.#t === void 0) throw new s("Sphere3 is undefined");
		return this.#t;
	}
	get radius() {
		if (this.#t === void 0) throw new s("Sphere3 is undefined");
		return this.#t.isSquare() ? {
			tex: this.#t.clone().sqrt().tex,
			display: this.#t.clone().sqrt().display,
			value: this.#t.clone().sqrt().value
		} : {
			tex: `\\sqrt{${this.#t.tex}}`,
			display: `sqrt(${this.#t.display})`,
			value: this.#t.clone().sqrt().value
		};
	}
	get equation() {
		if (this.#n === void 0) throw new s("Sphere3 is undefined");
		return this.#n;
	}
	makeUndefined() {
		return this.#e = void 0, this.#t = void 0, this.#n = void 0, this;
	}
	get asCenterRadius() {
		return this.#r = 1, this;
	}
	get asDeveloped() {
		return this.#r = 0, this;
	}
	get tex() {
		return this.#i(!0);
	}
	get display() {
		return this.#i(!1);
	}
	#i = (e) => {
		if (this.#n === void 0) throw new s("Sphere3 is undefined");
		if (this.#r === 0) return e ? this.#n.tex : this.#n.display;
		let t = [];
		return [
			"x",
			"y",
			"z"
		].forEach((n) => {
			if (this.center[n].isZero()) t.push(`${n}^2`);
			else {
				let r = new M(n).subtract(this.center[n]);
				t.push(e ? `\\(${r.tex}\\)^2` : `(${r.display})^2`);
			}
		}), t.join("+") + "=" + (e ? this.squareRadius.tex : this.squareRadius.display);
	};
	#a() {
		this.#n = new P(new M("x").subtract(this.center.x).pow(2).add(new M("y").subtract(this.center.y).pow(2)).add(new M("z").subtract(this.center.z).pow(2)), new M(this.squareRadius)).reduce();
	}
	static RELATIVE_POSITION = Ie;
	relativePosition = (e) => {
		let t = this.center.distanceTo(e.center).value, n = this.radius.value, r = e.radius.value;
		return t > n + r ? 1 : t === n + r ? 4 : t === 0 ? n === r ? 5 : 6 : t === Math.abs(n - r) ? 3 : t < Math.abs(n - r) ? 0 : 2;
	};
	isPointOnSphere = (e) => this.#n?.test({
		x: e.x,
		y: e.y,
		z: e.z
	}) ?? !1;
};
//#endregion
//#region src/randomization/coefficient/rndFraction.ts
function X(e) {
	let t = Object.assign({
		negative: !0,
		max: 10,
		reduced: !0,
		zero: !0,
		natural: !1
	}, e), n = new h();
	if (n.numerator = t.negative ? W(t.max, t.zero) : U(+!t.zero, t.max), t.natural) n.denominator = 1;
	else {
		let e = 0;
		for (; n.isRelative() && e < 10;) n.denominator = U(1, t.max), e++;
	}
	return t.reduced ? n.reduce() : n;
}
//#endregion
//#region src/randomization/algebra/rndMonom.ts
function Re(e) {
	let t = Object.assign({
		variables: "x",
		degree: 2,
		fraction: !0,
		zero: !1
	}, e), n = new D();
	if (n.coefficient = X(Object.assign({}, {
		zero: t.zero,
		reduced: !0,
		natural: t.fraction === !1
	}, typeof t.fraction == "boolean" ? {} : t.fraction)), t.variables.length > 1) {
		for (let e of t.variables.split("")) n.setExponent(e, 0);
		for (let e = 0; e < t.degree; e++) {
			let e = G(t.variables.split(""));
			n.setExponent(e, n.degree(e).clone().add(1));
		}
	} else n.setExponent(t.variables, t.degree);
	return n;
}
//#endregion
//#region src/randomization/algebra/rndPolynom.ts
var ze = {
	variables: "x",
	degree: 2,
	fraction: !1,
	zero: !1,
	unit: !1,
	factorable: !1,
	allowNullMonom: !0,
	numberOfMonoms: 0,
	commonConstant: !1,
	positive: !0
};
function Z(e) {
	let t = Object.assign({}, ze, e);
	if (t.factorable) return Be(t);
	let n = new M().empty(), r, i = t.degree ?? 2;
	for (let e = i; e >= 0; e--) r = Re({
		variables: t.variables,
		degree: e,
		fraction: t.fraction,
		zero: e !== i && t.allowNullMonom
	}), t.unit && i === e && r.coefficient.one(), n.add(r);
	if (t.positive && n.monomByDegree().coefficient.isNegative() && n.opposite(), t.numberOfMonoms && t.numberOfMonoms > 0 && t.numberOfMonoms < n.length) for (; n.length > t.numberOfMonoms;) {
		let e = U(1, n.length - 1);
		n.monoms = n.monoms.filter((t, n) => n !== e);
	}
	return n.reduce();
}
function Be(e) {
	let t = Object.assign(ze, e), n = { ...t };
	n.degree = 1, n.factorable = !1;
	let r = [], i = t.degree ?? 2;
	for (; r.length < i;) r.push(Z(n));
	if (e?.commonConstant !== !1) {
		let t = W(10, !1);
		e?.commonConstant === !0 && (t === 1 || t === -1) && (t *= U(2, 5)), t !== 1 && t !== -1 && r.unshift(new M(t));
	}
	return M.xMultiply(...r);
}
//#endregion
//#region src/randomization/algebra/rndEquation.ts
function Ve(e) {
	let t = Object.assign({
		variables: "x",
		degree: 1,
		fraction: !1,
		zero: !1,
		unit: !1,
		factorable: !1,
		allowNullMonom: !0,
		numberOfMonoms: 0,
		positive: !0,
		solution: {
			allowZero: !0,
			fraction: !1,
			nothing: !1,
			everything: !1
		}
	}, e), n = new M().one();
	for (let e = 0; e < t.degree; e++) {
		let e = Z({
			degree: 1,
			unit: t.unit,
			fraction: t.fraction,
			variables: t.variables,
			zero: t.zero
		});
		n.multiply(e);
	}
	return new P(n, 0);
}
//#endregion
//#region src/randomization/geometry/rndPoint.ts
function Q(e) {
	let t = Object.assign({
		axis: !0,
		fraction: !1,
		max: 10,
		quadrant: null
	}, e), n = t.axis === "x", r = t.axis === "y", i = t.fraction ? X({
		max: t.max,
		zero: n
	}) : new h(W(t.max, n)), a = t.fraction ? X({
		max: t.max,
		zero: r
	}) : new h(W(t.max, r));
	return Number(t.quadrant) === 1 && (i.abs(), a.abs()), Number(t.quadrant) === 2 && (i.isPositive() && i.opposite(), a.isNegative() && a.opposite()), Number(t.quadrant) === 3 && (i.isPositive() && i.opposite(), a.isPositive() && a.opposite()), Number(t.quadrant) === 4 && (i.isNegative() && i.opposite(), a.isPositive() && a.opposite()), new B(i, a);
}
//#endregion
//#region src/randomization/geometry/rndCircle.ts
function He(e) {
	let t = Object.assign({
		center: {
			x: {
				min: -10,
				max: 10
			},
			y: {
				min: -10,
				max: 10
			}
		},
		pointsOnCircle: 8
	}, e), n = Q(t.center), r, i;
	return t.pointsOnCircle === 8 ? (r = U(1, 3), i = r ** 2 + (r + 1) ** 2) : i = U(1, 20), new J(n, i, !0);
}
//#endregion
//#region src/randomization/geometry/rndLine.ts
function Ue(e) {
	let t = Object.assign({ A: {
		x: W(10),
		y: W(10)
	} }, e), n = new V(0, 0);
	for (; n.isNull;) n.x = W(10, t.allow?.vertical ?? !0), n.y = W(10, t.allow?.horizontal ?? !0);
	return t.slope === 1 ? n.x.sign() !== n.y.sign() && n.y.opposite() : t.slope === -1 && n.x.sign() !== n.y.sign() && n.y.opposite(), new K().fromPointAndDirection(new V(t.A.x, t.A.y), n);
}
//#endregion
//#region src/randomization/geometry/rndLine3.ts
function We(e) {
	let t = Object.assign({
		A: {
			x: W(10),
			y: W(10),
			z: W(10)
		},
		direction: {
			x: W(10),
			y: W(10),
			z: W(10)
		}
	}, e);
	return new Y(new B(t.A.x, t.A.y, t.A.z), new V(t.direction.x, t.direction.y, t.direction.z));
}
//#endregion
//#region src/randomization/random.ts
var $ = {
	equation: (e) => Ve(e),
	polynom: (e) => Z(e),
	monom: (e) => Re(e),
	fraction: (e) => X(e),
	number: (e, t, n) => U(e, t, n),
	numberSym: (e, t) => W(e, t),
	prime: (e) => Me(e),
	triplet: (e, t) => je(e, t),
	bool: (e) => Ae(e),
	array: (e, t) => Ne(e, t),
	item: (e) => G(e),
	shuffle: (e) => Pe(e),
	line: (e) => Ue(e),
	line3: (e) => We(e),
	vector: (e) => new V(Q(e)),
	point: (e) => Q(e),
	circle: (e) => He(e)
}, Ge = {
	Numeric: m,
	Fraction: h,
	Root: g,
	Monom: D,
	Polynom: M,
	Equation: P,
	Matrix: we,
	LinearSystem: Se,
	Factor: F,
	PolyFactor: L,
	LogicalSet: Ce,
	Random: $,
	Geometry: {
		Vector: V,
		Point: B,
		Line: K,
		Triangle: q,
		Circle: J,
		Line3: Y,
		Plane3: Fe,
		Sphere3: Le
	},
	Errors: {
		PiMathError: e,
		ParseError: t,
		DimensionError: n,
		MathError: r,
		InvalidArgumentError: i,
		NotImplementedError: a,
		IndexError: o,
		StateError: s
	},
	NumExp: ye
};
//#endregion
export { J as Circle, n as DimensionError, P as Equation, v as EquationSolver, I as FACTOR_DISPLAY, F as Factor, ce as FracType, h as Fraction, o as IndexError, i as InvalidArgumentError, K as Line, Y as Line3, Se as LinearSystem, Ce as LogicalSet, r as MathError, we as Matrix, D as Monom, a as NotImplementedError, ye as NumExp, m as Numeric, t as ParseError, e as PiMathError, Fe as Plane3, B as Point, L as PolyFactor, M as Polynom, $ as Random, g as Root, Ie as SPHERE3_RELATIVE_POSITION, _ as Solution, Le as Sphere3, s as StateError, le as TableOfSigns, q as Triangle, V as Vector, Ee as areVectorsColinears, Te as areVectorsEquals, Ge as default, Oe as determinantFromVectors, De as dotProduct };

//# sourceMappingURL=pimath.js.map