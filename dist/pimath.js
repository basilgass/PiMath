//#region src/errors.ts
var e = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = new.target.name;
	}
}, t = class extends e {}, n = class extends e {}, r = class extends e {}, i = class extends e {}, a = class extends e {}, o = class extends e {}, s = class extends e {}, c = class extends e {}, l = 1e4, u;
function d(e) {
	let t = new Uint8Array(e + 1), n = [];
	for (let r = 2; r <= e; r++) if (t[r] === 0) {
		n.push(r);
		for (let n = r * r; n <= e; n += r) t[n] = 1;
	}
	return n;
}
function ee(e) {
	let t = ne(e), n = [], r, i;
	for (; t.length > 0;) r = t.shift() ?? 1, i = (t.length > 0 ? t.pop() : r) ?? 1, n.push([r, i]);
	return n;
}
function te(...e) {
	let t = f(...e);
	return e.map((e) => e / t);
}
function ne(e) {
	if (!Number.isInteger(e)) throw new i(`dividers expects a finite integer, got ${e}`);
	let t = Math.abs(e), n = Math.sqrt(t), r = [];
	for (let i = 1; i <= n; i++) e % i === 0 && (r.push(i), r.push(t / i));
	return r.sort(function(e, t) {
		return e - t;
	}), [...new Set(r)];
}
function f(...e) {
	let t = function(e, n) {
		return isNaN(e) || isNaN(n) ? NaN : n === 0 ? e : e === 0 ? n : t(n, e % n);
	}, n = 1, r = 2;
	if (e.length === 0) return 1;
	if (e.length === 1) return e[0] === 0 ? 1 : Math.abs(e[0]);
	if (n = t(e[0], e[1]), n === 1) return 1;
	for (r = 2; r < e.length && (n = t(n, e[r]), n !== 1); r++);
	return Math.abs(n);
}
function re(...e) {
	return e.reduce(function(e, t) {
		return Math.abs(e / f(e, t) * t);
	}, 1);
}
function ie(e, t = 3) {
	let n = Math.min(100, Math.max(0, Math.trunc(t)));
	return +e.toFixed(n);
}
function ae(e) {
	return u ??= d(l), e === void 0 ? [...u] : u.slice(0, Math.min(u.length, e));
}
function oe(e, t) {
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
function se(e, t = 2) {
	let n = Math.trunc(t), r = Math.round(Number(`${e}e${n}`));
	return Number(`${r}e${-n}`);
}
function ce(e, t) {
	if (t <= 0) return 1;
	if (e < 0) return t % 2 == 1 ? -ce(-e, t) : 1;
	let n = Math.floor(e ** (1 / t));
	for (; n > 1;) {
		let r = n ** +t;
		if (e % r === 0) return r;
		n--;
	}
	return 1;
}
function le(e, t) {
	if (t <= 0) return NaN;
	if (e < 0) return t % 2 == 1 ? -le(-e, t) : NaN;
	let n = e ** (1 / t), r = Math.round(n);
	return r ** +t === e ? r : n;
}
var p = Object.freeze({
	decompose: ee,
	dividers: ne,
	divideNumbersByGCD: te,
	gcd: f,
	lcm: re,
	numberCorrection: ie,
	primes: ae,
	pythagoreanTripletsWithTarget: oe,
	round: se,
	greatestPower: ce,
	nthRoot: le
}), ue = /* @__PURE__ */ function(e) {
	return e.frac = "frac", e.dfrac = "dfrac", e.tfrac = "tfrac", e;
}({}), m = class e {
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
		let n = t.map((t) => new e(t)), r = p.lcm(...n.map((e) => e.denominator));
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
	static fromNumber(t) {
		let n = new e();
		if (Number.isSafeInteger(t)) return n.#r = t, n.#e = 1, n.#n = !0, n;
		if (t.toString().includes("e") || t.toString().includes("E")) throw new i(`Exponential notation is not supported: ${t}`);
		let [, r] = t.toString().split("."), a = r ? r.length : 0, o = 10 ** a;
		return n.#r = t * o, n.#e = o, n.#r = p.numberCorrection(n.#r), n.#e = p.numberCorrection(n.#e), n.reduce(), n.#n = a < 10, n;
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
		return Math.abs(p.gcd(this.#r, this.#e)) === 1;
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
		if (Number.isInteger(n)) return this.#r = Math.round(this.#r ** +n), this.#e = Math.round(this.#e ** +n), this;
		let i = Math.round(this.#r ** +n), a = Math.round(this.#e ** +n);
		return Math.round(i ** (1 / n)) === this.#r && Math.round(a ** (1 / n)) === this.#e ? (this.#r = i, this.#e = a) : (this.#r = this.#r ** +n / this.#e ** +n, this.#e = 1, this.exact = !1), this;
	}
	reduce() {
		let e = p.gcd(this.#r, this.#e);
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
}, h = class e {
	#e;
	#t;
	#n;
	#r = !1;
	constructor(e) {
		return this.#t = 2, this.#e = new m().zero(), this.#n = new m().zero(), e !== void 0 && this.parse(e), this;
	}
	parse(t) {
		if (t instanceof e) return this.copy(t);
		if (t instanceof m) return this.copy(e.fromFraction(t));
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
		let n = new m(e);
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
		let i = new m(n);
		if (i.isNaN()) throw new t(`Cannot build a root from an invalid radical: "${n}"`);
		if (this.radical = i, r === void 0) this.factor = new m().one();
		else {
			let e = new m(r);
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
		return new m(this.index).inverse();
	}
	inverse() {
		if (this.isZero()) throw new r("Cannot invert a zero root.");
		return this.factor.inverse(), this.radical.inverse(), this;
	}
	isEqual(e) {
		if (this.isZero() && e.isZero()) return !0;
		if (!this.#a() || !e.#a() || this.#o() !== e.#o()) return !1;
		let t = p.lcm(this.index, e.index), n = this.factor.clone().abs().pow(t).multiply(this.radical.clone().abs().pow(t / this.index)), r = e.factor.clone().abs().pow(t).multiply(e.radical.clone().abs().pow(t / e.index));
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
		let n = p.gcd(t.index, e);
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
			this.radical = new m(e * t ** (this.index - 1)), this.factor.divide(t);
		}
		let e = p.greatestPower(this.radical.value, this.index);
		return this.factor.multiply(p.nthRoot(e, this.index)), this.radical.divide(e), this;
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
		return e < 0 ? this.index % 2 == 0 ? NaN : p.numberCorrection(this.factor.value * -((-e) ** (1 / this.index))) : p.numberCorrection(this.factor.value * e ** (1 / this.index));
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
		this.index = +a, this.radical = new m(o ?? s ?? "");
		let l;
		if (i === "" || i === "+" || i === "-") l = new m(i === "-" ? -1 : 1);
		else if (/^[+-]?\d+(?:\/\d+)?$/.test(i)) l = new m(i);
		else throw new t(`Invalid root format: "${e}"`);
		return c !== void 0 && l.divide(+c), this.factor = l, this;
	}
	#f(e) {
		let n = /^\((.+)\)\/(\d+)$/.exec(e);
		if (n) return this.#f(n[1]), this.factor.divide(+n[2]), this;
		let r = /^([+-]?\d*(?:\/\d+)?)sqrt(?:\((-?\d+(?:\/\d+)?)\)|(\d+))(?:\/(\d+))?$/.exec(e);
		if (!r) throw new t(`Invalid sqrt format: "${e}"`);
		let i = r[1], a = r.at(2), o = r.at(3), s = r.at(4);
		this.index = 2, this.radical = new m(a ?? o ?? "");
		let c;
		if (i === "" || i === "+" || i === "-") c = new m(i === "-" ? -1 : 1);
		else if (/^[+-]?\d+(?:\/\d+)?$/.test(i)) c = new m(i);
		else throw new t(`Invalid sqrt format: "${e}"`);
		return s !== void 0 && c.divide(+s), this.factor = c, this;
	}
};
//#endregion
//#region src/algebra/polynomRoots.ts
function de(e) {
	return e.fraction.value + e.root.value;
}
function g(e, t = 1) {
	return {
		fraction: e.clone(),
		root: new h(),
		exact: !0,
		multiplicity: t
	};
}
function fe(e, t = 1) {
	let n = new m(e);
	return n.exact = !1, {
		fraction: n,
		root: new h(),
		exact: !1,
		multiplicity: t
	};
}
function _(e) {
	return e.sort((e, t) => de(e) - de(t));
}
function pe(e) {
	let t = e.length;
	for (; t > 0 && e[t - 1].isZero();) t--;
	return e.slice(0, t);
}
function v(e, t, n) {
	if (e.length !== t + 1 || e[t].isZero()) throw new r(`${n} requires a degree-${t} coefficient vector with a non-zero leading coefficient`);
}
function me(e) {
	v(e, 1, "solveLinear");
	let t = e[0], n = e[1];
	return [g(t.clone().opposite().divide(n))];
}
function y(e) {
	v(e, 2, "solveQuadratic");
	let t = e[0], n = e[1], r = e[2], i = n.clone().pow(2).subtract(r.clone().multiply(t).multiply(4));
	if (i.isNegative()) return [];
	let a = r.clone().multiply(2);
	if (i.isSquare()) {
		let e = i.sqrt(), t = n.clone().opposite().subtract(e).divide(a.clone()), r = n.clone().opposite().add(e).divide(a.clone());
		return i.isZero() ? [g(t, 2)] : _([g(t), g(r)]);
	}
	let o = new h();
	o.radical = i.clone(), o.factor = new m().one().divide(a.clone());
	let s = new h();
	return s.radical = i.clone(), s.factor = new m().one().divide(a.clone()).opposite(), _([{
		fraction: n.clone().opposite().divide(a.clone()),
		root: o,
		exact: !0,
		multiplicity: 1
	}, {
		fraction: n.clone().opposite().divide(a.clone()),
		root: s,
		exact: !0,
		multiplicity: 1
	}]);
}
function he(e) {
	v(e, 3, "solveCubicCardan");
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
	for (let e of l.map((e) => p.numberCorrection(e, 6))) u.some((t) => Math.abs(t - e) < 1e-6) || u.push(e);
	return _(u.map((e) => fe(e)));
}
function ge(e, t) {
	let n = new m(0);
	for (let r = e.length - 1; r >= 0; r--) n.multiply(t).add(e[r]);
	return n;
}
function b(e, t) {
	let n = 0;
	for (let r = e.length - 1; r >= 0; r--) n = n * t + e[r].value;
	return n;
}
function _e(e, t) {
	let n = e.length - 1, r = Array(n);
	r[n - 1] = e[n].clone();
	for (let i = n - 1; i >= 1; i--) r[i - 1] = e[i].clone().add(t.clone().multiply(r[i]));
	return r;
}
function ve(e) {
	let t = e.length - 1, n = e[t].value, r = 0;
	for (let i = 0; i < t; i++) {
		let t = Math.abs(e[i].value / n);
		t > r && (r = t);
	}
	return 1 + r;
}
function ye(e) {
	let t = p.lcm(...e.map((e) => e.denominator)), n = e.map((e) => e.clone().multiply(t).value), r = n.filter((e) => e !== 0).map((e) => Math.abs(e)), i = r.length > 0 ? p.gcd(...r) : 1, a = n.map((e) => e / i), o = Math.abs(a[0]), s = Math.abs(a[a.length - 1]), c = p.dividers(o), l = p.dividers(s), u = /* @__PURE__ */ new Set(), d = [];
	for (let e of c) for (let t of l) for (let n of [1, -1]) {
		let r = new m(n * e, t), i = `${r.numerator}/${r.denominator}`;
		u.has(i) || (u.add(i), d.push(r));
	}
	return d;
}
function be(e) {
	let t = [], n = 0;
	for (; n < e.length - 1 && e[n].isZero();) n++;
	let r = n > 0 ? e.slice(n) : e.slice();
	n > 0 && t.push(g(new m(0), n));
	let i = ye(r);
	for (let e of i) {
		if (r.length - 1 < 1) break;
		if (Math.abs(b(r, e.value)) > 1e-9 || !ge(r, e).isZero()) continue;
		let n = 0;
		for (; r.length - 1 >= 1 && ge(r, e).isZero();) r = _e(r, e), n++;
		t.push(g(e.clone(), n));
	}
	return {
		solutions: t,
		residual: r
	};
}
function xe(e, t, n, r) {
	let i = b(e, t);
	if (i * b(e, n) > 0) return null;
	for (; (n - t) / 2 > r;) {
		let r = (t + n) / 2, a = b(e, r);
		if (a === 0) return r;
		i * a < 0 ? n = r : (t = r, i = a);
	}
	return (t + n) / 2;
}
function Se(e, t) {
	let n = e.length - 1, r = ve(e), i = 2 * r / 100, a = [], o = -r, s = b(e, o);
	for (let c = 1; c <= 100; c++) {
		let l = p.numberCorrection(-r + c * i), u = b(e, l);
		if (u === 0) a.push(fe(l));
		else if (s * u < 0) {
			let n = xe(e, o, l, t);
			n !== null && a.push(fe(n));
		}
		if (a.length === n) break;
		o = l, s = u;
	}
	return a;
}
function Ce(e, t) {
	let n = t?.bisectionDeltaX ?? 1e-4;
	if (n <= 0) throw new i("bisectionDeltaX must be > 0");
	let r = pe(e), a = r.length - 1;
	if (a <= 0) return [];
	if (a === 1) return me(r);
	if (a === 2) return y(r);
	let { solutions: o, residual: s } = be(r), c = s.length - 1;
	return _(c <= 0 ? o : c === 1 ? o.concat(me(s)) : c === 2 ? o.concat(y(s)) : c === 3 ? o.concat(he(s)) : o.concat(Se(s, n)));
}
//#endregion
//#region src/analyze/solution.ts
var x = class e {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	constructor() {
		this.#o = "x", this.#n = !1, this.#t = null, this.#a = null, this.#r = new m().zero(), this.#i = new h(), this.#e = 1;
	}
	get tex() {
		return this.#a ? this.#a : this.#s(this.#r.tex, this.#i.tex, (e, t) => `${e} ${t.withSign.tex}`, (e, t) => `\\frac{ ${e} }{ ${t} }`);
	}
	set tex(e) {
		this.#a = e;
	}
	get display() {
		return this.#t ? this.#t : this.#s(this.#r.display, this.#i.display, (e, t) => `${e}${t.withSign.display}`, (e, t) => `(${e})/${t}`);
	}
	set display(e) {
		this.#t = e;
	}
	#s(e, t, n, r) {
		if (this.#i.isZero()) return e;
		if (this.#r.isZero()) return t;
		let [i] = m.toSameDenominateur(this.#r, this.#i.factor), a = this.#i.clone().multiply(i.denominator).reduce(), o = n(i.numerator, a);
		return i.denominator === 1 ? o : r(o, i.denominator);
	}
	static fromFraction(t) {
		let n = new e();
		n.setExact();
		let r = new m(t);
		return n.display = r.display, n.tex = r.tex, n.#r = r, n.#i = new h(), n;
	}
	static fromRoot(t) {
		let n = new e();
		return n.#i = new h(t), n.#n = !0, n;
	}
	static fromPolynomRoot(t) {
		let n = new e();
		return n.#r = t.fraction.clone(), n.#i = t.root.clone(), n.#n = t.exact, n.#e = t.multiplicity, n;
	}
	static fromQuadratic(t, n, r) {
		let [i, a, o] = [
			t,
			n,
			r
		].map((e) => new m(e));
		return y([
			o,
			a,
			i
		]).map((t) => e.fromPolynomRoot(t));
	}
	static fromString(n) {
		let r = n.trim(), i = /^\(([+-]?\d+)([+-])(\d*)sqrt\((\d+)\)\)\/(\d+)$/.exec(r);
		if (i) {
			let [, t, n, r, a, o] = i, s = +o, c = new e();
			c.#r = new m(+t, s);
			let l = r === "" ? 1 : +r, u = new m(n === "-" ? -l : l, s), d = new h();
			return d.index = 2, d.radical = new m(+a), d.factor = u, c.#i = d, c.#n = !0, c;
		}
		if (r.includes("sqrt") || r.includes("root")) {
			let t = new e();
			return t.#r = new m().zero(), t.#i = h.fromString(r), t.#n = !0, t;
		}
		let a = m.fromString(r);
		if (a.isNaN()) throw new t(`Cannot parse "${n}" as a Solution`);
		return e.fromFraction(a);
	}
	static parse(t) {
		return t instanceof e ? new e().copy(t) : t instanceof m ? e.fromFraction(t) : t instanceof h ? e.fromRoot(t) : e.fromPolynomRoot(t);
	}
	copy(e) {
		return this.#r = e.#r.clone(), this.#i = e.#i.clone(), this.#n = e.#n, this.#e = e.#e, this.#o = e.#o, this.#t = null, this.#a = null, this;
	}
	clone() {
		let t = new e();
		return t.#r = this.#r.clone(), t.#i = this.#i.clone(), t.#n = this.#n, t.#e = this.#e, t.#o = this.#o, t.#t = this.#t, t.#a = this.#a, t;
	}
	get count() {
		return this.#e;
	}
	get exact() {
		return this.#n;
	}
	get fraction() {
		return this.#r;
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
		if (e !== void 0) {
			if (!/^[a-z]$/.test(e)) throw new i(`variable expects a single lowercase letter, got "${e}"`);
			this.#o = e;
		}
	}
};
//#endregion
//#region src/analyze/interval.ts
function S(e, t) {
	return e.value === t.value ? 0 : e.value > t.value ? 1 : -1;
}
function C(e, t) {
	return e === null && t === null ? 0 : e === null ? -1 : t === null ? 1 : S(e, t);
}
function w(e, t) {
	return e === null && t === null ? 0 : e === null ? 1 : t === null ? -1 : S(e, t);
}
var T = class e {
	#e;
	#t;
	#n;
	#r;
	#i;
	constructor() {
		this.#e = null, this.#t = null, this.#n = !0, this.#r = !0, this.#i = !1;
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
		let i = x.fromString("0");
		if (r === "RR_+") return e.fromBounds(i, null, !1, !0);
		if (r === "RR_+**") return e.fromBounds(i, null, !0, !0);
		if (r === "RR_-") return e.fromBounds(null, i, !0, !1);
		if (r === "RR_-**") return e.fromBounds(null, i, !0, !0);
		if (r.startsWith("{") && r.endsWith("}") && !r.includes(";")) return e.point(x.fromString(r.slice(1, -1)));
		let a = r[0], o = r[r.length - 1];
		if ((a === "[" || a === "]") && (o === "[" || o === "]")) {
			let i = r.indexOf(";");
			if (i === -1) throw new t(`Missing ';' in interval: "${n}"`);
			let s = r.slice(1, i).trim(), c = r.slice(i + 1, -1).trim(), l = s === "-oo" ? null : x.fromString(s), u = c === "+oo" ? null : x.fromString(c);
			return e.fromBounds(l, u, a === "]", o === "[");
		}
		throw new t(`Cannot parse "${n}" as an Interval`);
	}
	get tex() {
		return this.#a("tex");
	}
	get display() {
		return this.#a("display");
	}
	#a(e) {
		if (this.#i) return e === "tex" ? "\\emptyset" : "O/";
		if (this.isPoint()) {
			let t = e === "tex" ? this.#e.tex : this.#e.display;
			return e === "tex" ? `\\left\\{${t}\\right\\}` : `{${t}}`;
		}
		let t = e === "tex" ? "-\\infty" : "-oo", n = e === "tex" ? "+\\infty" : "+oo", r = this.#e === null ? t : e === "tex" ? this.#e.tex : this.#e.display, i = this.#t === null ? n : e === "tex" ? this.#t.tex : this.#t.display;
		return `${this.#n ? "]" : "["}${r};${i}${this.#r ? "[" : "]"}`;
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
		let e = S(this.#e, this.#t);
		return e > 0 || e === 0 && (this.#n || this.#r);
	}
	isPoint() {
		return this.#i || this.#e === null || this.#t === null ? !1 : !this.#n && !this.#r && S(this.#e, this.#t) === 0;
	}
	isReal() {
		return !this.#i && this.#e === null && this.#t === null;
	}
	contains(e) {
		if (this.isEmpty()) return !1;
		let t = typeof e == "number" ? e : e.value;
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
		let n = C(this.#e, t.#e), r = n >= 0 ? this.#e : t.#e, i = n > 0 ? this.#n : n < 0 ? t.#n : this.#n || t.#n, a = w(this.#t, t.#t), o = a <= 0 ? this.#t : t.#t, s = a < 0 ? this.#r : a > 0 ? t.#r : this.#r || t.#r, c = e.fromBounds(r, o, i, s);
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
function we(e) {
	let t = e.filter((e) => !e.isEmpty());
	if (t.length === 0) return [];
	t.sort((e, t) => {
		let n = C(e.left, t.left);
		return n === 0 ? e.leftOpen ? 1 : -1 : n;
	});
	let n = [t[0].clone()];
	for (let e = 1; e < t.length; e++) {
		let r = n[n.length - 1], i = t[e], a = w(r.right, i.left), o = a === 0 && (!r.rightOpen || !i.leftOpen);
		if (a > 0 || o) {
			let e = w(r.right, i.right), t = e >= 0 ? r.right : i.right, a = e > 0 ? r.rightOpen : (e < 0 || r.rightOpen) && i.rightOpen;
			n[n.length - 1] = T.fromBounds(r.left, t, r.leftOpen, a);
		} else n.push(i.clone());
	}
	return n;
}
var Te = class e {
	#e;
	constructor(e) {
		this.#e = we(e);
	}
	static fromIntervals(t) {
		return new e(t);
	}
	static fromInterval(t) {
		return new e([t]);
	}
	static empty() {
		return new e([]);
	}
	static real() {
		return new e([T.real()]);
	}
	static fromString(t) {
		let n = t.trim();
		if (n === "O/") return e.empty();
		if (n === "RR") return e.real();
		if (n === "RR^**") {
			let t = x.fromString("0");
			return e.fromIntervals([T.fromBounds(null, t, !0, !0), T.fromBounds(t, null, !0, !0)]);
		}
		if (n.startsWith("RR\\{") && n.endsWith("}")) {
			let t = n.slice(4, -1).split(";").map((e) => T.point(x.fromString(e.trim())));
			return e.fromIntervals(t).complement();
		}
		if (n.startsWith("{") && n.endsWith("}") && n.includes(";")) {
			let t = n.slice(1, -1).split(";").map((e) => T.point(x.fromString(e.trim())));
			return e.fromIntervals(t);
		}
		if (n.includes("uu")) {
			let t = n.split("uu").flatMap((t) => e.fromString(t.trim()).intervals);
			return e.fromIntervals(t);
		}
		return e.fromInterval(T.fromString(n));
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
		if (e[0].left !== null || e.at(-1).right !== null) return null;
		let t = [];
		for (let n = 0; n < e.length - 1; n++) {
			let r = e[n], i = e[n + 1];
			if (!r.rightOpen || !i.leftOpen || r.right === null || i.left === null || r.right.value !== i.left.value) return null;
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
		return new e(this.#e.map((e) => e.clone()));
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
		return new e(n);
	}
	union(t) {
		return new e([...this.#e, ...t.#e]);
	}
	complement() {
		if (this.isEmpty()) return e.real();
		let t = this.#e, n = [], r = t[0];
		r.left !== null && n.push(T.fromBounds(null, r.left, !0, !r.leftOpen));
		for (let e = 0; e < t.length - 1; e++) {
			let r = t[e], i = t[e + 1];
			n.push(T.fromBounds(r.right, i.left, !r.rightOpen, !i.leftOpen));
		}
		let i = t.at(-1);
		return i.right !== null && n.push(T.fromBounds(i.right, null, !i.rightOpen, !0)), new e(n);
	}
	get intervals() {
		return this.#e.map((e) => e.clone());
	}
	get length() {
		return this.#e.length;
	}
};
//#endregion
//#region src/helpers.ts
function Ee(e, t = !0) {
	return t ? `\\left( ${e} \\right)` : `(${e})`;
}
function E(e) {
	if (!e.startsWith("(") || !e.endsWith(")")) return e;
	let t = 0;
	for (let n = 0; n < e.length - 1; n++) if (e[n] === "(" ? t++ : e[n] === ")" && t--, t === 0) return e;
	return e.slice(1, -1);
}
function D(e, t, n, r, i) {
	return e.map((e, a) => r !== void 0 && a < r || i !== void 0 && a > i ? e : e === t ? n : e);
}
function O(e, t) {
	if (t.length !== 1) throw new i(`splitChar must be a single character, got: "${t}"`);
	let n = 0, r = 0, a = [];
	for (let i = 0; i < e.length; i++) {
		let o = e[i];
		o === "(" ? n++ : o === ")" ? n-- : o === t && n === 0 && (a.push(e.substring(r, i)), r = i + 1);
	}
	return a.push(e.substring(r)), a;
}
//#endregion
//#region src/analyze/tableOfSigns.ts
var De = class e {
	#e;
	#t;
	#n;
	#r = !1;
	#i = "f(x)";
	#a = 2;
	#o = 1.2;
	constructor(t) {
		if (this.#e = [], this.#t = [""], this.#n = [], t !== void 0) {
			if (t instanceof B) {
				let n = e.#c(t);
				this.#e = n.roots, this.#t = n.signs;
			} else if (t instanceof at) {
				let n = e.#l(t);
				this.#e = n.roots, this.#t = n.signs, this.#n = n.factorRows;
			} else if (t instanceof R) {
				let n = e.#s(t);
				this.#e = n.roots, this.#t = n.signs;
			}
		}
	}
	static fromPolynom(t) {
		return new e(t);
	}
	static fromFactor(t) {
		return new e(t);
	}
	static fromPolyFactor(t) {
		return new e(t);
	}
	static #s(e) {
		let t = e.roots, n = Array(2 * t.length + 1).fill("").map((e, t) => t % 2 == 0 ? "" : "z");
		if (n.length === 1) {
			let [t] = e.getCoefficients().map((e) => e.value);
			n = D(n, "", t > 0 ? "+" : "-");
		} else if (e.degree().isOne()) {
			let [t] = e.getCoefficients().map((e) => e.value);
			n[0] = t > 0 ? "-" : "+", n[1] = "z", n[2] = t > 0 ? "+" : "-";
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
		return n.isStrictlyNegative() && (r.signs = D(r.signs, "z", "d")), n.denominator % 2 == 0 ? r.signs = D(r.signs, "-", "h") : n.numerator % 2 == 0 && (r.signs = D(r.signs, "-", "+")), {
			roots: r.roots,
			signs: r.signs
		};
	}
	static #l(t) {
		let n = t.roots, r = n.map((e) => e.value), i = t.factorize().factors.map((t) => {
			let n = e.#c(t);
			return {
				factor: new B(t),
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
			factor: new B(e.factor),
			roots: e.roots.map((e) => e.clone()),
			signs: [...e.signs]
		})), t.#r = this.#r, t.#i = this.#i, t.#a = this.#a, t.#o = this.#o, t;
	}
	copy(e) {
		return this.#e = e.#e.map((e) => e.clone()), this.#t = [...e.#t], this.#n = e.#n.map((e) => ({
			factor: new B(e.factor),
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
			r.push(T.fromBounds(e, i, !0, !0));
		}
		for (let e = 0; e < n; e++) t(this.#t[2 * e + 1]) && r.push(T.point(this.#e[e]));
		return Te.fromIntervals(r);
	}
	positive() {
		return this.#d((e) => e === "+", () => !1);
	}
	nonNegative() {
		return this.#d((e) => e === "+", (e) => e === "z");
	}
	negative() {
		return this.#d((e) => e === "-", () => !1);
	}
	nonPositive() {
		return this.#d((e) => e === "-", (e) => e === "z");
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
}, k = class {
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
		return Ce(this.#e).map((e) => this.#n(e));
	}
	solveAsCardan() {
		if (this.#e.length - 1 != 3) throw new r("The equation is not cubic.");
		return he(this.#e).map((e) => this.#n(e));
	}
	#n(e) {
		let t = x.fromPolynomRoot(e);
		return t.variable = this.#t, t;
	}
}, Oe = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = new.target.name;
	}
}, A = class extends Oe {}, j = class extends Oe {}, ke = class extends j {}, M = {
	pi: Math.PI,
	e: Math.exp(1)
}, N = /* @__PURE__ */ function(e) {
	return e.VARIABLE = "variable", e.COEFFICIENT = "coefficient", e.OPERATION = "operation", e.CONSTANT = "constant", e.FUNCTION = "function", e.FUNCTION_ARGUMENT = "function-argument", e.MONOM = "monom", e.LEFT_PARENTHESIS = "(", e.RIGHT_PARENTHESIS = ")", e;
}({}), P = /* @__PURE__ */ function(e) {
	return e.EXPRESSION = "expression", e.POLYNOM = "polynom", e.SET = "set", e.NUMERIC = "numeric", e;
}({});
function Ae(e, t) {
	if (e = e.replace(/\s+/g, ""), e.length <= 1) return e;
	let n = Object.keys(t).filter((e) => t[e].type === N.FUNCTION).map((e) => e);
	n.sort((e, t) => t.length - e.length);
	let r = RegExp(`^(${n.join("|")})\\(`), i = Object.keys(M);
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
		if (t !== void 0 && e[t.length] !== "(") throw new A(`Function "${t}" must be followed by parentheses`);
		if (n.length > 0 && r.exec(e)) {
			let t = n.find((t) => e.startsWith(t));
			t && (u = t + "(", e = e.slice(t.length + 1), l = N.FUNCTION);
		} else if (i.length > 0 && a.exec(e)) {
			let t = i.find((t) => e.startsWith(t));
			t && (u = t, e = e.slice(t.length), l = N.CONSTANT);
		} else if (o.exec(e)) {
			let t = o.exec(e);
			t && (u = t[0], e = e.slice(t[0].length), l = N.COEFFICIENT);
		} else switch (u = e[0], e = e.slice(1), u) {
			case "(":
				l = N.LEFT_PARENTHESIS;
				break;
			case ")":
				l = N.RIGHT_PARENTHESIS;
				break;
			case ",":
				l = N.FUNCTION_ARGUMENT;
				break;
			case "+":
			case "-":
			case "*":
			case "/":
			case "^":
			case "%":
				l = N.OPERATION;
				break;
			default: l = N.VARIABLE;
		}
		if (u === void 0 || l === void 0) throw Error("The token is undefined");
		s += je(c, l), s += u;
	}
	return s;
}
function je(e, t) {
	return e === void 0 || e === N.OPERATION || t === N.OPERATION || e === N.LEFT_PARENTHESIS || e === N.FUNCTION || e === N.FUNCTION_ARGUMENT || t === N.RIGHT_PARENTHESIS || t === N.FUNCTION_ARGUMENT ? "" : "*";
}
var Me = {
	"^": {
		precedence: 4,
		associative: "right",
		type: N.OPERATION
	},
	"*": {
		precedence: 3,
		associative: "left",
		type: N.OPERATION
	},
	"/": {
		precedence: 3,
		associative: "left",
		type: N.OPERATION
	},
	"+": {
		precedence: 2,
		associative: "left",
		type: N.OPERATION
	},
	"-": {
		precedence: 2,
		associative: "left",
		type: N.OPERATION
	},
	"%": {
		precedence: 3,
		associative: "left",
		type: N.OPERATION
	},
	"&": {
		precedence: 3,
		associative: "left",
		type: N.OPERATION
	},
	"|": {
		precedence: 3,
		associative: "left",
		type: N.OPERATION
	},
	"!": {
		precedence: 4,
		associative: "right",
		type: N.OPERATION
	},
	sin: {
		precedence: 4,
		associative: "right",
		type: N.FUNCTION,
		arity: 1
	},
	cos: {
		precedence: 4,
		associative: "right",
		type: N.FUNCTION,
		arity: 1
	},
	tan: {
		precedence: 4,
		associative: "right",
		type: N.FUNCTION,
		arity: 1
	},
	asin: {
		precedence: 4,
		associative: "right",
		type: N.FUNCTION,
		arity: 1
	},
	acos: {
		precedence: 4,
		associative: "right",
		type: N.FUNCTION,
		arity: 1
	},
	atan: {
		precedence: 4,
		associative: "right",
		type: N.FUNCTION,
		arity: 1
	},
	sqrt: {
		precedence: 4,
		associative: "right",
		type: N.FUNCTION,
		arity: 1
	},
	nthrt: {
		precedence: 4,
		associative: "right",
		type: N.FUNCTION,
		arity: 2
	},
	ln: {
		precedence: 4,
		associative: "right",
		type: N.FUNCTION,
		arity: 1
	},
	log: {
		precedence: 4,
		associative: "right",
		type: N.FUNCTION,
		arity: 1
	},
	logn: {
		precedence: 4,
		associative: "right",
		type: N.FUNCTION,
		arity: 2
	}
};
function F(...e) {
	let t = {};
	for (let n of e) t[n] = Me[n];
	return t;
}
var Ne = {};
for (let [e, t] of Object.entries(Me)) t.type === N.FUNCTION && (Ne[e] = t.arity ?? 1);
var Pe = F("^", "*", "/", "+", "-"), Fe = F("^", "*", "/", "+", "-", "%", "sin", "cos", "tan", "asin", "acos", "atan", "sqrt", "nthrt", "ln", "log", "logn"), Ie = Fe, Le = F("&", "|", "!", "-"), I = class {
	#e;
	#t = [];
	#n = {};
	#r = [];
	#i;
	constructor(e) {
		this.#e = e === void 0 ? P.POLYNOM : e, this.tokenConfigInitialization();
	}
	get rpn() {
		return this.#t;
	}
	get rpnToken() {
		return this.#t.map((e) => e.token);
	}
	tokenConfigInitialization() {
		return this.#e === P.SET ? (this.#n = Le, this.#i = !1) : this.#e === P.NUMERIC ? (this.#n = Fe, this.#i = !0) : this.#e === P.EXPRESSION ? (this.#n = Ie, this.#i = !0) : (this.#n = Pe, this.#i = !0), this.#r = Object.keys(this.#n).sort((e, t) => t.length - e.length), this.#n;
	}
	NextToken(e, t) {
		let n, r;
		if (n = "", r = void 0, e[t] === "(") n = "(", r = N.LEFT_PARENTHESIS;
		else if (e[t] === ")") n = ")", r = N.RIGHT_PARENTHESIS;
		else if (e[t] === ",") n = ",", r = N.FUNCTION_ARGUMENT;
		else {
			for (let i of this.#r) if (e.substring(t, t + i.length) === i) {
				n += i, r = this.#n[i].type;
				break;
			}
			for (let i in M) if (e.substring(t, t + i.length) === i) {
				n += i, r = N.CONSTANT;
				break;
			}
			if (n === "") if (/[0-9.]/.exec(e[t])) {
				let i = /^([0-9.]+)/.exec(e.substring(t));
				n = i ? i[0] : "", r = N.COEFFICIENT;
			} else if (/[a-zA-Z]/.exec(e[t])) {
				let i = /^([a-zA-Z])/.exec(e.substring(t));
				n = i ? i[0] : "", r = N.VARIABLE;
			} else throw new A(`Unknown token "${e[t]}" at position ${t} in "${e}"`);
		}
		if (r === void 0) throw new A(`Token type is undefined for token ${n}`);
		return {
			token: n,
			nextPos: t + n.length,
			type: r
		};
	}
	parse(e, t) {
		let n = [], r = [], i = 0;
		for ((t ?? this.#i) && (e = Ae(e, this.#n)); i < e.length;) {
			let t = i, { token: a, nextPos: o, type: s } = this.NextToken(e, i);
			if (i = o, i <= t) throw new A(`Parser stalled at position ${t} in "${e}"`);
			switch (s) {
				case N.COEFFICIENT:
				case N.VARIABLE:
				case N.CONSTANT:
					n.push({
						token: a,
						tokenType: s
					});
					break;
				case N.OPERATION:
					if (n.length === 0 && r.length === 0 && (a === "-" || a === "+") && n.push({
						token: "0",
						tokenType: N.COEFFICIENT
					}), r.length > 0) {
						let e = r[r.length - 1];
						for (; e.token in this.#n && (this.#n[a].associative === "left" && this.#n[a].precedence <= this.#n[e.token].precedence || this.#n[a].associative === "right" && this.#n[a].precedence < this.#n[e.token].precedence) && (n.push(r.pop() ?? {
							token: "",
							tokenType: N.OPERATION
						}), r.length !== 0);) e = r[r.length - 1];
					}
					r.push({
						token: a,
						tokenType: s
					});
					break;
				case N.FUNCTION_ARGUMENT:
					for (; r.length > 0 && r[r.length - 1].token !== "(";) n.push(r.pop() ?? {
						token: a,
						tokenType: s
					});
					if (r.length === 0) throw new A(`Misplaced argument separator ',' in "${e}"`);
					break;
				case N.LEFT_PARENTHESIS:
					r.push({
						token: a,
						tokenType: s
					}), e[i] === "-" && n.push({
						token: "0",
						tokenType: N.COEFFICIENT
					});
					break;
				case N.RIGHT_PARENTHESIS:
					for (; r.length > 0 && r[r.length - 1].token !== "(";) n.push(r.pop() ?? {
						token: a,
						tokenType: s
					});
					if (r.length === 0) throw new A(`Mismatched parentheses (unexpected ')') in "${e}"`);
					r.pop();
					break;
				case N.FUNCTION:
					r.push({
						token: a,
						tokenType: s
					});
					break;
				default: throw new A(`Token type ${a} is not handled`);
			}
		}
		if (r.some((e) => e.token === "(")) throw new A(`Mismatched parentheses (unclosed '(') in "${e}"`);
		return this.#t = n.concat(r.reverse()), this;
	}
}, Re = class {
	_rpn;
	_expression;
	constructor(e, t) {
		this._expression = e;
		try {
			this._rpn = new I(P.NUMERIC).parse(e, t).rpn;
		} catch (t) {
			throw new A(`There was a problem parsing: ${e}`, { cause: t });
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
		for (let t of this._rpn) t.tokenType === N.VARIABLE && e.add(t.token);
		return [...e];
	}
	isValid(e) {
		return this._isStructurallyValid() ? this.variables.every((t) => e !== void 0 && Object.hasOwn(e, t)) : !1;
	}
	_isStructurallyValid() {
		let e = 0;
		for (let t of this._rpn) switch (t.tokenType) {
			case N.COEFFICIENT:
			case N.VARIABLE:
			case N.CONSTANT:
				e += 1;
				break;
			case N.OPERATION:
				if (e < 2) return !1;
				--e;
				break;
			case N.FUNCTION: {
				let n = Ne[t.token] ?? 1;
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
		for (let n of this._rpn) if (n.tokenType === N.COEFFICIENT) t.push(+n.token);
		else if (n.tokenType === N.VARIABLE) {
			if (e === void 0 || !Object.hasOwn(e, n.token)) throw new ke(`Missing value for variable "${n.token}"`);
			t.push(e[n.token]);
		} else if (n.tokenType === N.CONSTANT) t.push(M[n.token]);
		else if (n.tokenType === N.OPERATION) {
			if (n.token === "*") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new j(`The multiplication factors ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n * e);
			} else if (n.token === "/") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new j(`The division values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n / e);
			} else if (n.token === "+") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new j(`The addition values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n + e);
			} else if (n.token === "-") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new j(`The subtraction values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n - e);
			} else if (n.token === "%") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new j(`The modulo values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n % e);
			} else if (n.token === "^") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw new j(`The base value ${n ?? "a"} or exponent ${e ?? "b"} are not defined`);
				t.push(n ** +e);
			}
		} else if (n.tokenType === N.FUNCTION) {
			let e = t.pop();
			if (e === void 0) throw new j(`The parameters for ${n.token} is not defined`);
			if (n.token === "sin") t.push(Math.sin(e));
			else if (n.token === "cos") t.push(Math.cos(e));
			else if (n.token === "tan") t.push(Math.tan(e));
			else if (n.token === "asin") t.push(Math.asin(e));
			else if (n.token === "acos") t.push(Math.acos(e));
			else if (n.token === "atan") t.push(Math.atan(e));
			else if (n.token === "sqrt") t.push(Math.sqrt(e));
			else if (n.token === "nthrt") {
				let n = t.pop();
				if (n === void 0) throw new j("The nthrt function requires two parameters");
				e % 2 == 0 && n < 0 ? t.push(NaN) : t.push((n < 0 ? -1 : 1) * Math.abs(n) ** (1 / e));
			} else if (n.token === "ln") t.push(Math.log(e));
			else if (n.token === "log") t.push(Math.log10(e));
			else if (n.token === "logn") {
				let n = t.pop();
				if (n === void 0) throw new j("The logn function requires two parameters");
				e <= 0 || e === 1 || n <= 0 ? t.push(NaN) : t.push(Math.log(n) / Math.log(e));
			}
		}
		if (t.length === 1) return this._numberCorrection(t[0]);
		throw new j(`There was a problem parsing: ${this._expression}`);
	}
	_numberCorrection(e, t = 8) {
		return +e.toFixed(t);
	}
}, L = class e {
	#e;
	#t;
	constructor(e) {
		return this.#e = new m().zero(), this.#t = {}, e !== void 0 && this.parse(e), this;
	}
	parse(t) {
		return t instanceof e ? this.copy(t) : t instanceof m ? this.fromFraction(t) : typeof t == "number" ? this.fromNumber(t) : this.fromString(t);
	}
	fromNumber(e) {
		return this.#e = new m(e), this.#t = {}, this;
	}
	fromFraction(e) {
		return this.#e = e.clone(), this.#t = {}, this;
	}
	fromLiteral(e, t) {
		this.#e = new m(e), this.#t = {};
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
		n.coefficient = new m(p.gcd(...t.map((e) => e.coefficient.numerator)), p.lcm(...t.map((e) => e.coefficient.denominator))).reduce();
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
		this.#e = new m(e);
	}
	containsRationalPower() {
		return Object.values(this.#t).some((e) => e.hasFractionalPart());
	}
	degree(e) {
		return this.variables.length === 0 ? new m().zero() : e === void 0 ? Object.values(this.#t).reduce((e, t) => e.clone().add(t)) : this.hasVariable(e) ? this.#t[e].clone() : new m().zero();
	}
	derivative(t = "x") {
		if (this.hasVariable(t)) {
			let e = this.#t[t].clone(), n = this.clone();
			return n.#t[t].subtract(1), n.#e.multiply(new m(e.clone())), n;
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
		let t = p.dividers(Math.abs(this.coefficient.numerator)), n = [];
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
				e *= (r instanceof m ? r.value : r) ** this.#t[t].value;
			}
			return e;
		}
		let i = this.coefficient.clone();
		for (let e in this.#t) i.multiply(new m(n[e]).pow(this.#t[e]));
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
		for (let t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) t[1] in this.#t || (this.#t[t[1]] = new m().zero()), this.#t[t[1]].add(+t[2]);
		for (let t of [...e.matchAll(/([a-z](?!\^))/g)]) t[1] in this.#t || (this.#t[t[1]] = new m().zero()), this.#t[t[1]].add(1);
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
		return this.#e = new m().one(), this.#t = {}, this;
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
		return t.hasVariable(e) ? (n = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(n), t.setExponent(e, n)) : (t.coefficient.isZero() && (t.coefficient = new m().one()), t.setExponent(e, 1)), t;
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
		return t instanceof m ? this.hasVariable(e) && t.isZero() ? (this.removeVariable(e), this) : (this.#t[e] = t.clone(), this) : this.setExponent(e, new m(t));
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
		return this.#e = new m().zero(), this.#t = {}, this;
	}
	#n(e) {
		for (let t in e.literal) this.#t[t] = e.literal[t].clone();
	}
	#r(e) {
		if (e instanceof m || typeof e != "object") {
			let t = {};
			return this.variables.length > 0 && (t[this.variables[0]] = e instanceof m ? e : new m(e)), t;
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
			e[t] = new m(r), n.push(e);
		} else for (let i of e) {
			let e = {};
			for (let t in i) e[t] = i[t];
			e[t] = new m(r), n.push(e);
		}
		return n;
	}
	#o(t, n) {
		let r, i, a, o, s;
		if (n.tokenType === N.COEFFICIENT) t.push(new e(new m(n.token)));
		else if (n.tokenType === N.VARIABLE) {
			let r = new e().one();
			r.setExponent(n.token, 1), t.push(r.clone());
		} else if (n.tokenType === N.OPERATION) switch (n.token) {
			case "-":
				i = t.pop() ?? new e().zero(), r = t.pop() ?? new e().zero(), t.push(r.subtract(i));
				break;
			case "*":
				i = t.pop() ?? new e().one(), r = t.pop() ?? new e().one(), t.push(r.multiply(i));
				break;
			case "/":
				i = t.pop() ?? new e().one(), r = t.pop() ?? new e().one(), t.push(r.divide(i));
				break;
			case "^": s = t.pop()?.coefficient ?? new m().one(), a = t.pop() ?? new e().one(), o = a.variables[0], o && a.setExponent(o, s), t.push(a);
		}
	}
	#s(e) {
		let n;
		try {
			n = new I().parse(e);
		} catch (n) {
			throw new t(`Cannot parse "${e}" as a Monom`, { cause: n });
		}
		let r = n.rpn, i = [];
		if (r.length === 0) return this.zero(), this;
		if (r.length === 1) {
			let e = r[0];
			return this.one(), e.tokenType === N.COEFFICIENT ? this.coefficient = new m(e.token) : e.tokenType === N.VARIABLE && this.setExponent(e.token, 1), this;
		}
		for (let e of r) this.#o(i, e);
		return this.one(), this.multiply(i[0]), this;
	}
}, R = class e {
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
		if (n instanceof L) return this.fromMonoms(n, ...r);
		if (n instanceof m || typeof n == "number") return r.length === 0 ? this.fromConstant(n) : this.fromCoefficients(n, ...r);
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
		for (let r of t) r instanceof e ? n.push(...r.monoms.map((e) => e.clone())) : r instanceof L ? n.push(r.clone()) : typeof r == "number" && Number.isSafeInteger(r) ? n.push(new L(r.toString())) : n.push(new L(r));
		return this.#n = this.#n.concat(n), this.reduce();
	}
	commonMonom() {
		let e = new L().one();
		e.coefficient = new m(this.gcdNumerator(), this.gcdDenominator());
		for (let t of this.variables) {
			e.setExponent(t, this.degree(t));
			for (let n of this.#n) if (e.setExponent(t, m.min(n.degree(t), e.degree(t))), e.degree(t).isZero()) break;
		}
		return e;
	}
	degree(e) {
		let t = new m().zero();
		for (let n of this.#n) t = m.max(n.degree(e).value, t);
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
		if (t instanceof m) return this.#c(t);
		if (typeof t == "number" && Number.isSafeInteger(t)) return this.#l(t);
		if (t instanceof L) return this.#a(new e(t));
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
		let n = new m().zero();
		return this.#n.forEach((t) => {
			n.add(t.evaluate(e, !1));
		}), n;
	}
	factorize(t) {
		if (this.#t = [], this.monoms.length === 1) return [this.clone()];
		let n = this.#f(t), r = this.clone().reorder(n), i = r.commonMonom();
		r.monomByDegree().coefficient.isStrictlyNegative() && i.opposite(), i.isOne() || (this.#t.push(new e(i)), r = r.euclidean(this.#t[0]).quotient);
		let a = new k(r, void 0, n).solve();
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
			let r = new L();
			r.coefficient = new m(e), r.setExponent(t, n), this.#n.push(r);
		}), this.#d(), this.reorder();
	}
	fromConstant(e) {
		return this.#n = [new L(new m(e))], this.#d(), this;
	}
	fromLinear(e, ...n) {
		if (!/^[a-z]{2,}$/.test(e)) throw new t(`fromLinear expects at least two lowercase variables, got "${e}"`);
		let r = e.split(""), a = n.map((e) => new m(e));
		if (a.length > r.length + 1) throw new i(`Too many values: ${r.length} variables but ${a.length} values provided`);
		return this.empty(), a.forEach((e, t) => {
			let n = new L();
			n.coefficient = e.clone(), n.literalStr = r[t] ?? "", this.add(n);
		}), this.#d(), this;
	}
	fromMonoms(...e) {
		return this.#n = e.map((e) => e instanceof L ? e.clone() : new L(e)), this.#d(), this;
	}
	fromString(e) {
		return e !== "" && !isNaN(Number(e)) ? this.fromConstant(Number(e)) : this.#v(e);
	}
	gcdDenominator() {
		return p.gcd(...this.getDenominators());
	}
	gcdNumerator() {
		return p.gcd(...this.getNumerators());
	}
	getCoefficients() {
		if (!this.degree().isNatural()) throw new r("getCoefficients() requires a polynomial with integer degrees");
		let e = this.clone().reorder(), t = this.degree().value + 1, n = Array.from({ length: t }, () => new m(0));
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
		return a[r] = new m(e), o[r] = new m(t), i.evaluate(o).subtract(i.evaluate(a));
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
		return p.lcm(...this.getDenominators());
	}
	lcmNumerator() {
		return p.lcm(...this.getNumerators());
	}
	get length() {
		return this.#n.length;
	}
	limitTo(e, t) {
		let n = new m(e);
		if (n.isFinite()) {
			let e = this.#f(t);
			return this.evaluate({ [e]: n });
		}
		let r = this.monomByDegree(void 0, t), i = r.coefficient.sign(), a = r.degree(t);
		return a.isZero() ? r.coefficient.clone() : a.isStrictlyPositive() ? n.isPositive() ? i === 1 ? new m().infinite() : new m().infinite().opposite() : (a.value % 2 == 0 ? i : -i) === 1 ? new m().infinite() : new m().infinite().opposite() : new m().zero();
	}
	monomByDegree(e, t) {
		if (e === void 0) return this.monomByDegree(this.degree(t), t);
		let n = this.clone().reduce();
		for (let r of n.#n) if (r.degree(t).isEqual(e)) return r.clone();
		return new L().zero();
	}
	monomByVariable(e) {
		let t = this.clone().reduce();
		for (let n of t.#n) if (n.hasVariable(e)) return n.clone();
		return new L().zero();
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
		if (t instanceof m) return this.#p(t);
		if (t instanceof L) return this.#h(t);
		if (Number.isSafeInteger(t) && typeof t == "number") return this.#m(t);
		if (typeof t == "string") try {
			let e = new m(t);
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
		return this.#n = [], this.#n.push(new L().one()), this.#d(), this;
	}
	opposite() {
		return this.#n = this.#n.map((e) => e.opposite()), this.#d(), this;
	}
	get plotFunction() {
		return this.#u("tex", !1, !1, !0);
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
		let e = 0;
		for (; e < this.#n.length;) {
			for (let t = e + 1; t < this.#n.length; t++) this.#n[e].isSameAs(this.#n[t]) && (this.#n[e].add(this.#n[t]), this.#n.splice(t, 1), this.#n[e].isZero() && (this.#n[e] = new L().zero()), t--);
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
		return this.#i ||= (this.#r = this.degree().isZero() ? [] : new k(this.clone()).solve(), !0), this.#r;
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
		for (let r of t) r instanceof e ? n.push(...r.monoms.map((e) => e.clone().opposite())) : r instanceof L ? n.push(r.clone().opposite()) : n.push(new L(r).opposite());
		return this.#n = this.#n.concat(n), this.reduce();
	}
	get value() {
		if (this.degree().isZero()) return this.monoms[0]?.coefficient.value ?? 0;
	}
	get variables() {
		return [...new Set(this.#n.flatMap((e) => e.variables))].sort();
	}
	zero() {
		return this.#n = [], this.#n.push(new L().zero()), this.#d(), this;
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
		let t = new m(e);
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
		return this.#p(new m(e));
	}
	#h(e) {
		for (let t of this.#n) t.multiply(e);
		return this.reduce();
	}
	#g(e) {
		let t = [];
		for (let n of this.#n) for (let r of e.monoms) t.push(L.xMultiply(n, r));
		return this.#n = t, this.reduce();
	}
	#_(n, i) {
		switch (i.tokenType) {
			case N.COEFFICIENT:
				n.push(new e(i.token));
				break;
			case N.VARIABLE:
				n.push(new e().add(new L(i.token)));
				break;
			case N.CONSTANT: throw new t("Unsupported CONSTANT token in Polynom parser");
			case N.OPERATION:
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
			case N.MONOM: throw new t("Unexpected MONOM token in polynom parser");
			case N.FUNCTION: throw new t(`Unsupported function token "${i.token}" in polynom parser`);
		}
	}
	#v(e) {
		let n;
		try {
			n = new I().parse(e);
		} catch (n) {
			throw new t(`Cannot parse "${e}" as a Polynom`, { cause: n });
		}
		let r = n.rpn;
		this.zero();
		let i = [];
		for (let e of r) this.#_(i, e);
		return i.length === 1 && this.add(i[0]), this.reorder();
	}
}, ze = [
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
], Be = {
	"=": "=",
	"<": ">",
	">": "<",
	"<=": ">=",
	">=": "<="
}, z = class e {
	#e;
	#t;
	#n;
	constructor(e, t, n) {
		return this.#e = new R().zero(), this.#t = new R().zero(), this.#n = "=", e !== void 0 && t === void 0 ? this.parse(e) : e !== void 0 && t !== void 0 && this.fromPolynoms(e, t, n), this;
	}
	parse(t) {
		return t instanceof e ? this.copy(t) : typeof t == "string" ? this.fromString(t) : this.fromPolynoms(t, new R().zero());
	}
	fromString(e) {
		let t = this.#o(e), n = e.split(t);
		return this.fromPolynoms(new R(n[0]), new R(n[1]), this.#s(t));
	}
	fromPolynoms(e, t, n) {
		return this.#e = new R(e), this.#t = new R(t), this.#n = this.#s(n), this;
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
		let n = new R(t);
		this.#e.add(n), this.#t.add(n);
	}
	degree(e) {
		return m.max(this.#e.degree(e), this.#t.degree(e));
	}
	divide(...e) {
		let t = e.map((e) => new m(e)).filter((e) => !e.isZero()).map((e) => e.inverse());
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
		return t.isEqual(n) ? this.#n === e.#n : t.isOppositeAt(n) ? this.#n === Be[e.#n] : !1;
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
		return this.#e = this.#e.clone().subtract(this.#t), this.#t = new R().zero(), this;
	}
	multiply(...e) {
		let t = this.clone();
		for (let n of e) {
			let e = new m(n);
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
		let t = this.#e.clone().subtract(this.#t), n = new R().zero();
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
		return e.multiply(p.lcm(...e.#e.getDenominators(), ...e.#t.getDenominators())), e.divide(p.gcd(...e.#e.getNumerators(), ...e.#t.getNumerators())), this.#a(e);
	}
	solve() {
		return new k(this.clone()).solve();
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
		let n = new R(t);
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
		let n = ze.find((t) => e.includes(t.token));
		if (n === void 0) throw new t("The equation is not valid (no sign found)");
		return n.token;
	}
	#s(e) {
		return e === void 0 ? "=" : ze.find((t) => e.includes(t.token))?.sign ?? "=";
	}
	#c() {
		return this.#n = Be[this.#n], this;
	}
}, B = class e {
	#e;
	#t;
	#n;
	#r = !1;
	constructor(t, n) {
		return t instanceof e ? (this.#t = t.#t.clone(), this.#n = t.power.clone(), n !== void 0 && this.#n.multiply(new m(n))) : t === void 0 ? (this.#t = new R(), this.#n = new m(1)) : (this.#t = new R(t), this.#n = new m(n ?? 1)), this.#e = 1, this;
	}
	parse(t, n) {
		return t instanceof e ? this.copy(t) : typeof t == "string" ? this.fromString(t) : this.fromPolynom(t), n !== void 0 && this.#n.multiply(new m(n)), this;
	}
	fromString(t) {
		return this.copy(e.factorsFromString(t)[0]);
	}
	copy(e) {
		return this.#t = e.#t.clone(), this.#n = e.#n.clone(), this;
	}
	clone() {
		let t = new e(this);
		return t.#e = this.#e, t.#r = this.#r, t;
	}
	get tex() {
		let e = this.power.numerator, t = this.power.denominator, n, r;
		return this.#e === 0 && t > 1 ? (n = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, r = e === 1 ? "" : `^{ ${e} }`) : (n = this.#r && this.power.isOne() ? this.polynom.tex : Ee(this.polynom.tex), r = t === 1 && e === 1 ? "" : `^{ ${this.power.tex} }`), n = `${n}${r}`, this.#e === 0 && e < 0 && (n = `\\frac{ 1 }{ ${n} }`), n;
	}
	get display() {
		let e = this.power.numerator, t = this.power.denominator, n, r;
		return this.#e === 0 && t > 1 ? (n = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, r = e === 1 ? "" : `^(${e})`) : (n = this.#r && this.power.isOne() ? this.polynom.display : Ee(this.polynom.display, !1), r = t === 1 && e === 1 ? "" : `^(${this.power.display})`), n = `${n}${r}`, this.#e === 0 && e < 0 && (n = `1/(${n})`), n;
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
	fromPolynom(e) {
		return this.#t = new R(e), this.#n = new m(1), this;
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
		return n = t instanceof e ? t.polynom : t instanceof R ? t : new R(t), this.polynom.isEqual(n);
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
		this.#n = new m(e);
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
		let t = O(e, "+");
		if (t[0] === "" && t.shift(), t.length > 1) return !1;
		let n = O(e, "-");
		return n[0] === "" && n.shift(), !(n.length > 1);
	}
	static factorsFromString(t, n = !0) {
		if (!e.checkParseAsFactors(t)) return [new e(t, n ? 1 : -1)];
		let r = n ? 1 : -1, i = [];
		for (let n of t.matchAll(/\(([^)]+)\)(?:\^(-?[0-9]+(?:\/[0-9]+)?|\(-?[0-9]+(?:\/[0-9]+)?\)))?|([^(]+)/g)) if (n[1] !== void 0) {
			let t = (n[2] ?? "1").replace(/[()]/g, "");
			i.push(new e(new R(n[1]), new m(t).multiply(r)));
		} else n[3]?.trim() && i.push(new e(new R(n[3].trim()), new m(r)));
		return i;
	}
}, V = /* @__PURE__ */ function(e) {
	return e[e.ROOT = 0] = "ROOT", e[e.POWER = 1] = "POWER", e;
}({}), H = class e {
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
		return t ??= "k", this.clone().subtract(new e(this.dimension.rows).one().multiply(new R(t))).determinant();
	}
	cofactor(e, t) {
		let n = this.clone();
		return n.values.splice(e, 1), n.values.forEach((e) => {
			e.splice(t, 1);
		}), n.determinant().multiply((-1) ** (e + t));
	}
	get cols() {
		let e = Array.from({ length: this.dimension.cols }, () => Array.from({ length: this.dimension.rows }, () => new R()));
		return this.forEach((t, n, r) => {
			e[r][n] = t;
		}), e;
	}
	determinant() {
		if (!this.isSquare()) throw new n("Matrix is not square");
		let e = new R();
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
		return this.#n = Array.from({ length: e }, () => Array.from({ length: t }, () => new R())), this;
	}
	fromString(e) {
		if (e.startsWith("((") && e.endsWith("))")) return this.fromString(e.substring(1, e.length - 1));
		let t = e.split("),(");
		return this.#n = t.map((e, n) => n === 0 ? e.substring(1).split(",") : n === t.length - 1 ? e.substring(0, e.length - 1).split(",") : e.split(",")).map((e) => e.map((e) => new R(e))), this;
	}
	fromValues(e) {
		this.#n = [];
		let t = e[0].length;
		if (e.some((e) => e.length !== t)) throw new n("Each line must be the same length");
		return e.forEach((e) => {
			let t = [];
			e.forEach((e) => {
				t.push(new R(e));
			}), this.#n.push(t);
		}), this;
	}
	fromVectors(...e) {
		this.#n = [];
		let t = e[0].dimension;
		if (e.some((e) => e.dimension !== t)) throw new n("Each vectors must be the same dimension");
		return this.fromDimensions(e[0].dimension, e.length), e.forEach((e, t) => {
			e.array.forEach((e, n) => {
				this.#n[n][t] = new R(e);
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
				let a = this.rows[n], o = t.cols[i], s = new R();
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
		if (!Number.isSafeInteger(e)) throw new i("Can only raise item by an integer");
		if (e < 0) throw new i("Can only raise item by a non-negative integer");
		if (e === 0) return this.one();
		let t = this.clone();
		for (let n = 1; n < e; n++) this.multiply(t);
		return this;
	}
	reduce() {
		throw new a("Not yet implemented");
	}
	get rows() {
		return this.#n;
	}
	setValue(e, t, n) {
		let { rows: r, cols: i } = this.dimension;
		if (e < 0 || e >= r || t < 0 || t >= i) throw new s(`${e}x${t} is out of range (${r}x${i})`);
		return this.#n[e][t] = new R(n), this;
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
function Ve(e, t) {
	return e.dimension === t.dimension && e.array.every((e, n) => t.array[n].isEqual(e));
}
function He(e, t) {
	if (e.dimension !== t.dimension) return !1;
	let n = t.array[0].value / e.array[0].value;
	return e.array.every((e, r) => t.array[r].value === e.value * n);
}
function Ue(e, t) {
	return e.dimension === t.dimension ? e.array.reduce((e, n, r) => e.add(n.clone().multiply(t.array[r])), new m(0)) : new m().invalid();
}
function We(...e) {
	if (e.some((t) => t.dimension !== e[0].dimension)) throw new n("All vectors must have the same dimension");
	if (e[0].dimension !== e.length) throw new n(`The determinant of dimension ${e[0].dimension} must have the same number of vectors (${e.length} given)`);
	return e[0].dimension === 2 ? e[0].array[0].clone().multiply(e[1].array[1]).subtract(e[0].array[1].clone().multiply(e[1].array[0])) : e[0].array[0].clone().multiply(e[1].array[1].clone().multiply(e[2].array[2]).subtract(e[1].array[2].clone().multiply(e[2].array[1]))).subtract(e[0].array[1].clone().multiply(e[1].array[0].clone().multiply(e[2].array[2]).subtract(e[1].array[2].clone().multiply(e[2].array[0])))).add(e[0].array[2].clone().multiply(e[1].array[0].clone().multiply(e[2].array[1]).subtract(e[1].array[1].clone().multiply(e[2].array[0]))));
}
//#endregion
//#region src/geometry/TupleN.ts
var U = class {
	#e = [];
	#t;
	constructor(...e) {
		this.#e = e.map((e) => new m(e));
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
		return t.length < 2 || (this.#e = t.map((e) => new m(e))), this;
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
		else if (e > this.dimension) for (let t = this.dimension; t < e; t++) this.#e.push(new m(0));
		return this;
	}
	get x() {
		return this.#e[0];
	}
	set x(e) {
		this.#e[0] = new m(e), this.#t?.();
	}
	get y() {
		return this.#e[1];
	}
	set y(e) {
		this.#e[1] = new m(e), this.#t?.();
	}
	get z() {
		if (this.dimension < 3) throw new n("Vector is not 3D");
		return this.#e[2];
	}
	set z(e) {
		if (this.dimension < 3) throw new n("Vector is not 3D");
		this.#e[2] = new m(e), this.#t?.();
	}
	zero = () => (this.#e.forEach((e) => e.zero()), this.#t?.(), this);
}, W = class e extends U {
	constructor(...e) {
		super(), e.length > 0 && this.parse(...e);
	}
	parse(...n) {
		if (n.length === 1) {
			if (n[0] instanceof U) return this.array = n[0].cloneCoordinates(), this;
			if (typeof n[0] == "string") return this.fromString(n[0]), this;
		}
		if (n.length > 1) {
			if (n.some((t) => t instanceof e)) throw new i("Creating a point with  multiple argument requires an input fraction");
			let r = n.map((e) => new m(e));
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
		let t = this.array.map((t, n) => e.array[n].clone().subtract(t)).reduce((e, t) => e.add(t.clone().pow(2)), new m(0));
		return new h().from(2, t).reduce();
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
}, G = class e extends U {
	constructor(...e) {
		return super(), e.length > 0 && this.parse(...e), this;
	}
	parse(...e) {
		if (e.length === 0) throw new i("Invalid value");
		if (e.length === 1) {
			if (e[0] instanceof U) return this.array = e[0].cloneCoordinates(), this;
			if (typeof e[0] == "string") return this.fromString(e[0]);
			throw new i("Invalid value");
		}
		if (e.length === 2) {
			let [t, r] = e;
			if (t instanceof U && r instanceof U) {
				if (t.dimension !== r.dimension) throw new n("Vectors must have the same dimension");
				return this.array = r.array.map((e, n) => e.clone().subtract(t.array[n])), this;
			}
		}
		return this.array = e.map((e) => new m(e)), this;
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
	divideByScalar = (e) => this.multiplyByScalar(new m(e).inverse());
	dot = (e) => Ue(this, e);
	fromString(e) {
		return e.startsWith("((") && e.endsWith("))") ? super.fromString(e.slice(1, -1)) : super.fromString(e);
	}
	isColinearTo = (e) => He(this, e);
	isEqual = (e) => Ve(this, e);
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
		let t = new m(e);
		return this.array.forEach((e) => e.multiply(t)), this;
	};
	get norm() {
		return Math.sqrt(this.normSquare.value);
	}
	get normSquare() {
		return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new m(0));
	}
	normal = () => {
		if (this.dimension >= 3) throw new n("Normal vector can only be determined in 2D");
		let e = this.x.clone().opposite(), t = this.y.clone();
		return this.array[0] = t, this.array[1] = e, this;
	};
	one = () => (this.zero(), this.x.one(), this);
	opposite = () => (this.array.forEach((e) => e.opposite()), this);
	simplify = () => {
		let e = p.lcm(...this.array.map((e) => e.denominator)), t = p.gcd(...this.array.map((e) => e.numerator));
		return this.multiplyByScalar(new m(e, t)), this.x.isNegative() && this.opposite(), this;
	};
	subtract = (e) => this.add(e.clone().opposite());
	translate(...e) {
		return this.array.forEach((t, n) => t.add(e[n])), this;
	}
	unit = () => {
		let e = this.norm;
		return e === 0 ? this : this.divideByScalar(e);
	};
}, K = /* @__PURE__ */ function(e) {
	return e.None = "none", e.Parallel = "parallel", e.Perpendicular = "perpendicular", e.Tangent = "tangent", e;
}({}), Ge = /* @__PURE__ */ function(e) {
	return e.None = "none", e.Parallel = "parallel", e.Perpendicular = "perpendicular", e.Tangent = "tangent", e;
}({});
//#endregion
//#region src/randomization/rndHelpers.ts
function Ke(e = .5) {
	return Math.random() < e;
}
function q(e, t, n) {
	if (t === void 0) return e >= 0 ? q(0, e) : q(e, 0);
	if (e === t) return e;
	if (n === void 0) return Math.floor(Math.random() * (t - e + 1) + e);
	if (Math.abs(t - e) <= n.length) throw new i("The number of excluded values is too high.");
	let r = q(e, t);
	for (; n.includes(r);) r = q(e, t);
	return r;
}
function J(e, t) {
	return t === !1 ? Ke() ? q(1, e) : -q(1, e) : q(-e, e);
}
function qe(e, t) {
	let n = p.pythagoreanTripletsWithTarget(e).filter((e) => t === !0 || !e.includes(0));
	return n.length === 0 ? null : Y(n);
}
function Je(e) {
	let t = p.primes();
	return e !== void 0 && (t = t.filter((t) => t < e)), Y(t);
}
function Ye(e, t) {
	return t === void 0 && (t = 1), e.length <= 0 ? Object.values(e) : Xe(e).slice(0, t);
}
function Y(e) {
	return e.length === 0 ? null : e[q(0, e.length - 1)];
}
function Xe(e) {
	let t = Object.values(e);
	for (let e = t.length - 1; e > 0; e--) {
		let n = Math.floor(Math.random() * (e + 1)), r = t[e];
		t[e] = t[n], t[n] = r;
	}
	return t;
}
//#endregion
//#region src/geometry/line.ts
var X = class e {
	static PARALLEL = K.Parallel;
	static PERPENDICULAR = K.Perpendicular;
	#e;
	#t;
	#n;
	#r;
	#i;
	#a = 1;
	constructor(...e) {
		return this.#t = new m().zero(), this.#n = new m().zero(), this.#r = new m().zero(), this.#e = new G(), this.#i = "lr", e.length > 0 && this.parse(...e), this;
	}
	parse = (...n) => {
		if (n.length === 0) return this;
		if (n.length === 1) {
			if (n[0] instanceof e) return this.fromCoefficient(n[0].a, n[0].b, n[0].c);
			if (n[0] instanceof z) return this.fromEquation(n[0]);
			if (typeof n[0] == "string") try {
				let e = new z(n[0]);
				return this.parse(e);
			} catch (e) {
				throw new t(`Cannot parse "${n[0]}" as a Line`, { cause: e });
			}
		}
		if (n.length === 2) {
			if (n[0] instanceof W && n[1] instanceof W) return this.fromPoints(n[0], n[1]);
			if (n[0] instanceof W && n[1] instanceof G) return this.fromPointAndDirection(n[0], n[1]);
		}
		return n.length === 3 && n.every((e) => m.isFraction(e)) ? this.fromCoefficient(n[0], n[1], n[2]) : (console.warn("Something wrong happened while creating the line"), console.warn(n), this);
	};
	copy() {
		throw new a("copy() is not yet implemented for Line");
	}
	clone = () => new e().fromCoefficient(this.#t, this.#n, this.#r);
	get tex() {
		let e = this.#a;
		switch (this.#a = 1, e) {
			case 0: return this.getEquation().reorder().tex;
			case 2: return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new R().parse("x", this.slope, this.height).tex;
			case 3:
			case 4: {
				let t = this.d.clone().simplify();
				return e === 3 ? `${G.asTex("x", "y")} = ${G.asTex(this.#e.x.tex, this.#e.y.tex)} + k\\cdot ${G.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}\n\tx &= ${new R(this.#e.x).add(new L(t.x).multiply(new L("k"))).reorder("k", !0).tex}\\\\\n\ty &= ${new R(this.#e.y).add(new L(t.y).multiply(new L("k"))).reorder("k", !0).tex}\n\\end{aligned}\\right.`;
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
			case 2: return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new R().parse("x", this.slope, this.height).display;
			case 3: {
				let e = this.d.clone().simplify();
				return `((x,y))=((${this.#e.x.display},${this.#e.y.display}))+k((${e.x.display},${e.y.display}))`;
			}
			case 4: {
				let e = this.d.clone().simplify(), t = new R(this.#e.x).add(new L(e.x).multiply(new L("k"))).reorder("k", !0), n = new R(this.#e.y).add(new L(e.y).multiply(new L("k"))).reorder("k", !0);
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
		let e = new G(this.#n.clone(), this.#t.clone().opposite());
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
		return n.isZero() ? new h(0) : new h().from(2, n.inverse(), t).reduce();
	}
	fromCoefficient(e, t, n) {
		this.#t = new m(e), this.#n = new m(t), this.#r = new m(n);
		let r = [
			this.#t,
			this.#n,
			this.#r
		].every((e) => e.exact) ? p.lcm(this.#t.denominator, this.#n.denominator, this.#r.denominator) : 1;
		if (r > 1 && (this.#t.multiply(r).reduce(), this.#n.multiply(r).reduce(), this.#r.multiply(r).reduce()), this.#n.isZero()) return this.#e = new G(this.#r.clone().divide(this.#t).opposite(), 0), this;
		for (let e = 0; e < this.#n.value; e++) {
			let t = this.#t.clone().divide(this.#n).multiply(e).subtract(this.#r.clone().divide(this.#n)).reduce();
			if (this.#e = new G(e, t), t.isRelative()) return this;
		}
		let i = this.#r.clone().divide(this.#n).opposite().reduce();
		return this.#e = new G(0, i), this;
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
	fromPointAndLine(e, t, n = K.Parallel) {
		return n === K.Perpendicular ? this.fromPointAndNormal(e, t.director) : this.fromPointAndNormal(e, t.normal);
	}
	fromPointAndNormal = (e, t) => t.isZero() ? (console.warn("Normal vector is null."), this) : (this.fromCoefficient(t.x, t.y, e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()), this.#e = new G(e.clone()), this);
	fromPoints(e, t) {
		return this.fromPointAndNormal(e, new G(e, t).normal());
	}
	getEquation() {
		return new z(new R().parse("xy", this.#t, this.#n, this.#r), new R("0")).simplify();
	}
	getValueAtX = (e) => {
		let t = this.getEquation(), n = new m(e);
		return t.canIsolate("y") ? t.isolate("y").right.evaluate({ x: n }) : new m().invalid();
	};
	getValueAtY = (e) => {
		let t = this.getEquation(), n = new m(e);
		return t.canIsolate("x") ? t.isolate("x").right.evaluate({ y: n }) : new m().invalid();
	};
	get height() {
		return this.#r.clone().opposite().divide(this.#n);
	}
	hitSegment(t, n) {
		let r = this.intersection(new e().fromPoints(t, n));
		return r.hasIntersection ? r.point.x.value >= Math.min(t.x.value, n.x.value) && r.point.x.value <= Math.max(t.x.value, n.x.value) && r.point.y.value >= Math.min(t.y.value, n.y.value) && r.point.y.value <= Math.max(t.y.value, n.y.value) : !1;
	}
	intersection = (e) => {
		let t = new W(), n = !1, r = !1;
		return this.#n.isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new m().invalid(), t.y = new m().invalid(), n = !0) : this.isSameAs(e) ? (t.x = new m().invalid(), t.y = new m().invalid(), r = !0) : (t.x = this.#n.clone().multiply(e.c).subtract(this.#r.clone().multiply(e.b)).divide(this.#t.clone().multiply(e.b).subtract(this.#n.clone().multiply(e.a))), t.y = this.#t.clone().multiply(e.c).subtract(this.#r.clone().multiply(e.a)).divide(this.#n.clone().multiply(e.a).subtract(this.#t.clone().multiply(e.b)))), {
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
		return new G(this.#t, this.#n);
	}
	randomNearPoint = (e) => {
		let t = this.randomPoint(e), n = 10;
		for (; this.isOnLine(t) && n > 0;) t.x.add(J(1, !1)), t.y.add(J(1, !1)), n--;
		return t;
	};
	randomPoint = (e) => new W(this.d.clone().multiplyByScalar(J(e === void 0 || e <= 1 ? 3 : e, !1)).add(this.#e));
	simplify = () => {
		let e = p.lcm(this.#t.denominator, this.#n.denominator, this.#r.denominator), t = p.gcd(this.#t.numerator, this.#n.numerator, this.#r.numerator);
		return this.fromCoefficient(this.#t.clone().multiply(e).divide(t), this.#n.clone().multiply(e).divide(t), this.#r.clone().multiply(e).divide(t)), this;
	};
	get slope() {
		return this.#t.clone().opposite().divide(this.#n);
	}
}, Ze = class e {
	#e = new W();
	#t = new W();
	#n = new W();
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
			if (t.every((e) => e instanceof X)) return this.fromLines(t[0], t[1], t[2]);
			if (t.every((e) => e instanceof W)) return this.fromPoints(t[0], t[1], t[2]);
		}
		if (t.length === 6) {
			let e = t.map((e) => new m(e));
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
		return this.fromPoints(new W(e, t), new W(n, r), new W(i, a));
	}
	fromLines(e, t, n) {
		let r = new X(e).clone(), i = new X(t).clone(), a = new X(n).clone(), o = r.intersection(i);
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
			let e = new X().fromPointAndNormal(this.#e, new G(this.#t, this.#n)), t = new X().fromPointAndNormal(this.#t, new G(this.#e, this.#n)), n = new X().fromPointAndNormal(this.#n, new G(this.#e, this.#t)), r = e.intersection(t).point;
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
			let t = new X().fromPoints(this.#e, e.BC), n = new X().fromPoints(this.#t, e.AC), r = new X().fromPoints(this.#n, e.AB), i = t.intersection(n).point;
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
			let t = new X().fromPointAndNormal(e.BC, new G(this.#t, this.#n)), n = new X().fromPointAndNormal(e.AC, new G(this.#e, this.#n)), r = new X().fromPointAndNormal(e.AB, new G(this.#e, this.#t)), i = t.intersection(n).point;
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
			AB: new W().middleOf(this.#e, this.#t),
			AC: new W().middleOf(this.#e, this.#n),
			BC: new W().middleOf(this.#t, this.#n)
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
			AB: new X(this.#e, this.#t),
			BC: new X(this.#t, this.#n),
			AC: new X(this.#e, this.#n)
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
		let n = this.lines, r = new G(), i = new G(), a = new W();
		if (e === "A" ? (a = this.A.clone(), r = n.AB.clone().d, i = n.AC.clone().d) : e === "B" ? (a = this.B.clone(), r = n.AB.clone().d.opposite(), i = n.BC.clone().d) : e === "C" && (a = this.C.clone(), r = n.BC.clone().d.opposite(), i = n.AC.clone().d.opposite()), r === void 0 || i === void 0) throw new s(`The point ${e} does not exist`);
		let o = t ? r.unit().add(i.unit()) : r.unit().subtract(i.unit());
		return new X().fromPointAndDirection(a, o);
	}
	#c(e, t, n) {
		let r = (t ** 2 + n ** 2 - e ** 2) / (2 * t * n);
		return this.#a ? Math.acos(r) : p.numberCorrection(Math.acos(r) * 180 / Math.PI);
	}
	#l = (e) => {
		switch (e.toUpperCase()) {
			case "A": return this.#e;
			case "B": return this.#t;
			case "C": return this.#n;
		}
		return this.#e;
	};
	#u = (e, t) => new G(this.#l(e), this.#l(t));
}, Qe = class e {
	#e = null;
	#t = null;
	#n = 1;
	#r = null;
	constructor(...e) {
		e.length > 0 && this.parse(...e);
	}
	parse(...t) {
		return typeof t[0] == "string" ? this.fromString(t[0]) : t[0] instanceof z ? this.fromEquation(t[0]) : t[0] instanceof e ? this.copy(t[0]) : t.length === 2 && t[0] instanceof W && t[1] instanceof W ? this.fromCenterPoint(t[0], t[1]) : t.length >= 2 && t[0] instanceof W && (t[1] instanceof m || typeof t[1] == "number") ? this.fromCenterRadius(t[0], t[1], typeof t[2] == "boolean" && t[2]) : this;
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
		return this.#e ?? new W();
	}
	get equation() {
		return this.#t?.clone() ?? new z("0=0");
	}
	fromCenterPoint(e, t) {
		return this.#e = e.clone(), this.#r = new G(this.#e, t).normSquare, this.#i(), this;
	}
	fromCenterRadius(e, t, n) {
		return this.#e = e.clone(), this.#r = n ? new m(t) : new m(t).pow(2), this.#i(), this;
	}
	fromEquation(e) {
		if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
			let t = e.left.monomByDegree(2, "x"), n = e.left.monomByDegree(2, "y"), r, i, a;
			if (t.coefficient.isEqual(n.coefficient)) return e.divide(t.coefficient), r = e.left.monomByDegree(1, "x"), i = e.left.monomByDegree(1, "y"), a = e.left.monomByDegree(0), this.#e = new W(r.coefficient.clone().divide(2).opposite(), i.coefficient.clone().divide(2).opposite()), this.#r = a.coefficient.clone().opposite().add(this.#e.x.clone().pow(2)).add(this.#e.y.clone().pow(2)), this.#i(), this;
			this.#a();
		}
		return this;
	}
	fromPoints(e, t, n) {
		let r = new Ze(e, t, n);
		if (!r.isValid || !r.remarquables) return this.#a(), this;
		let i = r.getMediators().c.clone(), a = r.getMediators().b.clone();
		return this.fromCenterPoint(i.intersection(a).point, e);
	}
	fromString(e) {
		return this.fromEquation(new z(e));
	}
	getPointsOnCircle() {
		let e = this.squareRadius.value;
		if (!Number.isInteger(e) || e < 0) return [];
		let t = p.pythagoreanTripletsWithTarget(e, !0), n = [];
		return t.forEach((e) => {
			for (let t of [
				[1, 1],
				[-1, 1],
				[-1, -1],
				[1, -1]
			]) {
				let r = this.center.x.clone().add(t[0] * e[0]), i = this.center.y.clone().add(t[1] * e[1]);
				n.every((e) => !e.isEqualXY(r, i)) && n.push(new W(r, i));
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
		let t = this.center, n = e.d, r = e.OA, i = n.normSquare, a = r.x.clone().subtract(t.x).multiply(n.x).add(r.y.clone().subtract(t.y).multiply(n.y)).multiply(2), o = r.x.clone().subtract(t.x).pow(2).add(r.y.clone().subtract(t.y).pow(2)).subtract(this.squareRadius), s = x.fromQuadratic(i, a, o);
		if (s.length === 0) return [];
		if (s.length === 1) {
			let e = r.add(n.clone().multiplyByScalar(s[0].fraction));
			return [new W(e.x, e.y)];
		}
		let c = s[0].exact ? r.clone().add(n.clone().multiplyByScalar(s[0].fraction)) : r.clone().add(n.clone().multiplyByScalar(s[0].value)), l = s[1].exact ? r.clone().add(n.clone().multiplyByScalar(s[1].fraction)) : r.clone().add(n.clone().multiplyByScalar(s[1].value));
		return [new W(c.x, c.y), new W(l.x, l.y)].sort((e, t) => n.x.isZero() ? n.y.isPositive() ? e.y.value - t.y.value : t.y.value - e.y.value : n.x.isPositive() ? e.x.value - t.x.value : t.x.value - e.x.value);
	}
	get radius() {
		return new h().from(2, this.#r ?? 0);
	}
	relativePosition(e) {
		if (this.#e === null || this.#r === null) return -1;
		let t = e.distanceTo(this.#e).pow(2).value, n = this.#r.value;
		return t - n > 1e-10 ? 0 : Math.abs(t - n) < 1e-10 ? 1 : 2;
	}
	setRadius(e, t) {
		return this.#r = t ? new m(e) : new m(e).pow(2), this.#i(), this;
	}
	get squareRadius() {
		return this.#r?.clone() ?? new m(-1);
	}
	tangents = (e) => e instanceof m ? this.#c(e) : this.isPointOnCircle(e) ? this.#o(e) : this.#e !== null && this.#e.distanceTo(e).value > this.radius.value ? this.#s(e) : [];
	#i() {
		this.#t = new z(new R(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`), new R(this.squareRadius.display)).moveLeft();
	}
	#a() {
		this.#e = null, this.#r = null, this.#t = null;
	}
	#o = (e) => {
		let t = new G(this.center, e);
		return [new X().fromPointAndNormal(e, t)];
	};
	#s = (e) => {
		let t = this.center.x.clone().subtract(e.x), n = this.center.y.clone().subtract(e.y), r = new R("x"), i = new R("x^2+1");
		return r.multiply(t).subtract(n).pow(2), i.multiply(this.squareRadius), new z(r, i).solve().map((t) => {
			let n, r = new z("y", "x");
			return t.exact ? (n = e.x.clone().opposite().multiply(t.fraction).add(e.y), r.right.multiply(t.fraction).add(n)) : (n = e.x.clone().opposite().multiply(t.value).add(e.y), r.right.multiply(t.value).add(n)), new X(r);
		});
	};
	#c = (e) => {
		let t = e.numerator, n = -e.denominator, r = this.center.x.clone(), i = this.center.y.clone(), a = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), o = r.clone().multiply(t).opposite().subtract(i.clone().multiply(n)).add(a.clone().sqrt()), s = r.clone().multiply(t).opposite().subtract(i.clone().multiply(n)).subtract(a.clone().sqrt());
		return [new X(t, n, o), new X(t, n, s)];
	};
}, $e = class e {
	static PARALLEL = Ge.Parallel;
	static PERPENDICULAR = Ge.Perpendicular;
	#e = new W();
	#t = new G();
	constructor(e, t) {
		return this.#e = e.clone(), this.#t = t instanceof W ? new G(e, t) : t.clone(), this;
	}
	clone = () => (this.#t = this.#t.clone(), this.#e = this.#e.clone(), this);
	get tex() {
		return {
			parametric: `${G.asTex("x", "y", "z")} = ${G.asTex(this.#e.x.tex, this.#e.y.tex, this.#e.z.tex)} + k\\cdot ${G.asTex(this.#t.x.tex, this.#t.y.tex, this.#t.z.tex)}`,
			system: `\\left\\{\\begin{aligned}
    x &= ${new R(this.#e.x).add(new L(this.#t.x).multiply(new L("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new R(this.#e.y).add(new L(this.#t.y).multiply(new L("k"))).reorder("k", !0).tex}\\\\
    z &= ${new R(this.#e.z).add(new L(this.#t.z).multiply(new L("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
			cartesian: `\\frac{ ${new R("x", 1, this.#e.x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new R("y", 1, this.#e.y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new R("z", 1, this.#e.z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
		};
	}
	get display() {
		let e = this.#e.x.display, t = this.#e.y.display, n = this.#e.z.display, r = this.direction.simplify(), i = r.x.display, a = r.y.display, o = r.z.display;
		return {
			parametric: `${G.asDisplay("x", "y", "z")} = ${G.asDisplay(this.#e.x.display, this.#e.y.display, this.#e.z.display)} + k\\cdot ${G.asDisplay(this.#t.x.display, this.#t.y.display, this.#t.z.display)}`,
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
		let t = new G(this.#e, e), n = this.direction, r = this.direction.normSquare, i = t.cross(n).normSquare.clone().divide(r), a = i.clone().sqrt();
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
		let t = this.#e.clone(), n = new m(J(e, !1));
		return new W(t.x.clone().add(this.#t.x.clone().multiply(n)), t.y.clone().add(this.#t.y.clone().multiply(n)), t.z.clone().add(this.#t.z.clone().multiply(n)));
	};
	simplify = () => {
		throw new a("Method not implemented.");
	};
}, et = class e {
	#e = new G(0, 0, 1);
	#t = new W(0, 0, 0);
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
			this.normal = new G(n, r, i), this.point = n.isNotZero() ? new W(a.clone().divide(n).opposite(), 0, 0) : r.isNotZero() ? new W(0, a.clone().divide(r).opposite(), 0) : new W(0, 0, a.clone().divide(i).opposite());
			return;
		}
		if (e.points?.length === 3 && e.points.every((e) => e instanceof G)) {
			let t = e.points[0], n = e.points[1], r = e.points[2], i = new G(t, n), a = new G(t, r);
			this.normal = i.cross(a), this.point = t;
			return;
		}
		if (e.coefficients?.length === 4) {
			let [t, n, r, i] = e.coefficients;
			this.normal = new G(t, n, r), this.point = new W(0, 0, -i);
			return;
		}
	}
	get tex() {
		return new z(new R("xyz", this.a, this.b, this.c, this.d), new R(0)).reduce().tex;
	}
	get display() {
		return new z(new R("xyz", this.a, this.b, this.c, this.d), new R(0)).reduce().display;
	}
	get a() {
		return this.#e.x;
	}
	angle(t, r, i) {
		if (t instanceof e) return this.normal.angle(t.normal, r, i);
		let a;
		if (t instanceof G) {
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
		return new W(new G(t).add(n.clone().multiplyByScalar(r)));
	}
	intersectWithPlane(e) {
		throw this.normal.cross(e.normal), new W(0, 0, 0), new a("Intersection with plane  not yet implemented !");
	}
	isPointOnPlane(e) {
		return this.normal.dot(e).add(this.d).isZero();
	}
	get normal() {
		return this.#e;
	}
	set normal(e) {
		this.#e = new G(e);
	}
	get point() {
		return this.#t;
	}
	set point(e) {
		this.#t = new W(e);
	}
}, tt = /* @__PURE__ */ function(e) {
	return e[e.INTERIOR = 0] = "INTERIOR", e[e.EXTERIOR = 1] = "EXTERIOR", e[e.SECANT = 2] = "SECANT", e[e.TANGENT_INSIDE = 3] = "TANGENT_INSIDE", e[e.TANGENT_OUTSIDE = 4] = "TANGENT_OUTSIDE", e[e.SUPERPOSED = 5] = "SUPERPOSED", e[e.CONCENTRIC = 6] = "CONCENTRIC", e;
}({}), nt = class {
	#e = void 0;
	#t = void 0;
	#n = void 0;
	#r = 1;
	constructor(e, t) {
		return e && t && (this.#e = e, this.#t = new m(t).clone().pow(2), this.#a()), this;
	}
	fromEquation(e) {
		let t = new z(e).moveLeft().reduce(), n = [
			"x",
			"y",
			"z"
		];
		if (n.some((e) => t.degree(e).value !== 2)) return this.makeUndefined();
		let r = t.left.monomByDegree(2, "x").coefficient;
		return n.some((e) => t.left.monomByDegree(2, e).coefficient.isNotEqual(r)) ? this.makeUndefined() : (this.#e = new W(t.left.monomByDegree(1, "x").coefficient.clone().opposite().divide(2), t.left.monomByDegree(1, "y").coefficient.clone().opposite().divide(2), t.left.monomByDegree(1, "z").coefficient.clone().opposite().divide(2)), this.#t = t.left.monomByDegree(0).coefficient.clone().opposite().add(this.#e.x.clone().pow(2)).add(this.#e.y.clone().pow(2)).add(this.#e.z.clone().pow(2)), this.#a(), this);
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
		if (this.#n === void 0) throw new c("Sphere3 is undefined");
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
		if (this.#n === void 0) throw new c("Sphere3 is undefined");
		if (this.#r === 0) return e ? this.#n.tex : this.#n.display;
		let t = [];
		return [
			"x",
			"y",
			"z"
		].forEach((n) => {
			if (this.center[n].isZero()) t.push(`${n}^2`);
			else {
				let r = new R(n).subtract(this.center[n]);
				t.push(e ? `\\(${r.tex}\\)^2` : `(${r.display})^2`);
			}
		}), t.join("+") + "=" + (e ? this.squareRadius.tex : this.squareRadius.display);
	};
	#a() {
		this.#n = new z(new R("x").subtract(this.center.x).pow(2).add(new R("y").subtract(this.center.y).pow(2)).add(new R("z").subtract(this.center.z).pow(2)), new R(this.squareRadius)).reduce();
	}
	static RELATIVE_POSITION = tt;
	relativePosition = (e) => {
		let t = this.center.distanceTo(e.center).value, n = this.radius.value, r = e.radius.value;
		return t > n + r ? 1 : t === n + r ? 4 : t === 0 ? n === r ? 5 : 6 : t === Math.abs(n - r) ? 3 : t < Math.abs(n - r) ? 0 : 2;
	};
	isPointOnSphere = (e) => this.#n?.test({
		x: e.x,
		y: e.y,
		z: e.z
	}) ?? !1;
}, rt = class e {
	#e;
	#t;
	constructor(...e) {
		return this.#e = [], this.#t = [], e.length > 0 && this.parse(...e), this;
	}
	parse(...e) {
		return this.fromEquations(...e.map((e) => new z(e)));
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
		return this.#e = e.map((e) => new z(new R(i.join(""), ...e.slice(0, -1)), e[e.length - 1])), this.#n(), this;
	}
	fromMatrix(e, t = "xyz") {
		let n = e.rows.map((e) => e.map((e) => e.monoms[0].coefficient));
		return this.fromComponents(n, t);
	}
	fromVectors(...e) {
		return this.fromMatrix(new H().fromVectors(...e));
	}
	copy() {
		throw new a("copy() is not yet implemented for LinearSystem");
	}
	clone() {
		return new e().parse(...this.#e.map((e) => e.clone()));
	}
	get tex() {
		let e = this.clone().reorder();
		return this.buildTex(e.equations);
	}
	get display() {
		let e = this.clone().reorder();
		return this.#a(e.equations, "display");
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
			let e = new z(t);
			this.#e[r].add(e);
		}
		return this;
	}
	buildTex(e, t) {
		return this.#a(e, "tex", t);
	}
	degree(e) {
		return m.max(...this.#e.map((t) => t.degree(e)));
	}
	get equations() {
		return this.#e.map((e) => e.clone());
	}
	set equations(e) {
		this.#e = e, this.#n();
	}
	evaluate() {
		throw new a("Method not implemented.");
	}
	hasVariable(e) {
		return this.#t.includes(e);
	}
	isEqual(e) {
		return this.equations.every((t, n) => t.isEqual(e.equations[n]));
	}
	isSolvable() {
		if (this.variables.length !== this.#e.length) return !1;
		let [e] = this.matrix;
		return !e.determinant().isZero();
	}
	get matrix() {
		let [e, t] = this.#r();
		return [new H().fromValues(e), new G(...t)];
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
		let [e, t] = this.#r(), n = e.map((e, n) => [...e, t[n]]);
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
				let a = p.lcm(e, n[i]), o = e < 0 ? -1 : 1;
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
			let e = new z(t);
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
	#n() {
		return this.#t = this.#e.reduce((e, t) => [.../* @__PURE__ */ new Set([...e, ...t.variables])], []), this.#t.sort(), this;
	}
	#r() {
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
	#i(e) {
		let t = [];
		return e ? (e.forEach((e, n) => {
			let r = x.fromFraction(e[e.length - 1]);
			r.variable = this.variables[n], t.push(r);
		}), t) : (this.variables.forEach((e) => {
			let n = x.fromFraction(Infinity);
			n.variable = e, t.push(n);
		}), t);
	}
	#a(e, t, n) {
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
}, it = class {
	#e;
	constructor(e) {
		return this.#e = [], e !== void 0 && this.parse(e), this;
	}
	parse = (e) => {
		try {
			this.#e = new I(P.SET).parse(e).rpn;
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
}, at = class e {
	#e = V.POWER;
	#t = [];
	constructor(...t) {
		return this.#t = [], t.forEach((t) => {
			typeof t == "string" ? this.#t.push(...new e().fromString(t).factors) : t instanceof e ? this.#t.push(...t.factors) : this.#t.push(new B(t));
		}), this;
	}
	parse(t) {
		return typeof t == "string" ? this.fromString(t) : t instanceof e ? this.copy(t) : this.fromFactors(t);
	}
	copy(e) {
		return this.#t = e.factors, this;
	}
	clone() {
		let t = new e();
		return t.#t = this.factors, t.#e = this.#e, t;
	}
	get tex() {
		return this.#i((e) => e.tex, (e, t) => `\\frac{ ${e} }{ ${t} }`);
	}
	get display() {
		return this.#i((e) => e.display, (e, t) => `(${e})/(${t})`);
	}
	static #n(t, n) {
		let r = Z(t), i = Z(n), a = Object.keys(r).filter((e) => Object.hasOwn(i, e)).map((e) => {
			let t = r[e].reduce((e, t) => e.add(t.power), new m("0")), n = i[e].reduce((e, t) => e.add(t.power), new m("0"));
			return new B(e, m.min(t, n));
		});
		return new e(...a);
	}
	static #r(t, n) {
		let r = Z(t), i = Z(n), a = [.../* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(i)])].map((e) => {
			let t = Object.hasOwn(r, e) ? r[e].reduce((e, t) => e.add(t.power), new m("0")) : new m(0), n = Object.hasOwn(i, e) ? i[e].reduce((e, t) => e.add(t.power), new m("0")) : new m(0);
			return new B(e, m.max(t, n));
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
		let a = e.gcd(...n), o = new R(0).add(...n.map((e) => e.divide(a).reduce().develop().factors[0].polynom)).reduce();
		return this.#t = [...a.factors, new B(o)], i && this.divide(i), this.#t = this.#t.filter((e) => !e.power.isZero()), this;
	}
	get asPower() {
		return this.#e = V.POWER, this;
	}
	get asRoot() {
		return this.#e = V.ROOT, this;
	}
	degree(e) {
		return this.#t.reduce((t, n) => t.add(n.degree(e)), new m("0"));
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
		let t = new R("1"), n = new R("1");
		return this.numerator.factors.forEach((e) => {
			t.multiply(e.develop());
		}), this.denominator.factors.forEach((e) => {
			n.multiply(e.develop());
		}), new e().fromPolynom(t, n);
	}
	divide(...e) {
		for (let t of e) this.#t = this.#t.concat(t.factors.map((e) => e.inverse()));
		return this;
	}
	evaluate(e, t) {
		return t ? this.#t.reduce((n, r) => n * r.evaluate(e, t), 1) : this.#t.reduce((t, n) => t.multiply(n.evaluate(e)), new m("1"));
	}
	factorize(t) {
		let n = [];
		this.#t.forEach((e) => {
			let r = e.polynom.factorize(t);
			if (r.length > 1) {
				let t = e.power.clone();
				n.push(...r.map((e) => new B(e, t)));
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
	fromPolynom(e, t) {
		if (this.#t = [new B(new R(e))], t) {
			let e = new R(t);
			if (e.isOne()) return this;
			if (e.isZero()) throw new r("Cannot divide by zero");
			this.#t.push(new B(e, -1));
		}
		return this;
	}
	fromFactors(...e) {
		return this.#t = e.map((e) => new B(e)), this;
	}
	fromString(e) {
		this.#t = [];
		let [n, ...r] = O(e, "/");
		if (n === "") throw new t("Parsing a PolyFactor from a string requires a numerator");
		if (r.length > 1) throw new t("Parsing a PolyFactor from a string only allows max one signe \"/\"");
		return this.#t = r.length === 0 ? B.factorsFromString(E(n), !0) : [...B.factorsFromString(E(n), !0), ...B.factorsFromString(E(r[0]), !1)], this;
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
		return this.#t = [new B("1", "1")], this;
	}
	opposite() {
		let e = new B(-1), t = this.#t.findIndex((t) => t.isEqual(e));
		return t >= 0 ? this.#t.splice(t, 1) : this.#t.push(new B("-1", "1")), this;
	}
	pow(e) {
		return this.#t = this.#t.map((t) => t.pow(e)), this;
	}
	primitive() {
		throw new a("Method not implemented.");
	}
	reduce() {
		let e = Z(this);
		this.#t = Object.values(e).map((e) => {
			let t = e[0].polynom;
			return new B(t, e.reduce((e, t) => e.add(t.power), new m("0")).reduce());
		}).filter((e) => !e.power.isZero());
		let t = new B(1), n = new B(1), r = this.#t.filter((e) => e.polynom.monoms.length === 1 && e.power.isRelative());
		return r.length > 0 && (r.forEach((e) => {
			e.power.isPositive() ? t.multiply(new B(e.polynom.clone().pow(e.power.value))) : n.multiply(new B(e.polynom.clone().pow(-e.power.value)));
		}), this.#t = this.#t.filter((e) => !(e.polynom.monoms.length === 1 && e.power.isRelative())), n.polynom.isOne() || this.#t.push(n.inverse()), t.polynom.isOne() || this.#t.push(t)), this;
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
		return this.#t = [new B("0", "1")], this;
	}
	#i(e, t) {
		let { num: n, den: r } = this.#a(), i = (t) => t.length === 1 ? e(t[0].asSingle) : t.map((t, n) => ot(t, n) ? e(t.asSingle) : e(t)).join(""), a = i(n);
		return r.length === 0 ? a : t(a, i(r));
	}
	#a() {
		let e, t = [];
		return this.#e === V.ROOT ? (e = this.numerator.factors, t = this.denominator.factors) : e = this.factors, e.length === 0 && (e = [new B("1")]), {
			num: e,
			den: t
		};
	}
};
function ot(e, t) {
	return !e.power.isOne() || e.polynom.monoms.length !== 1 ? !1 : t === 0 || e.polynom.degree().value > 0 && !e.polynom.monoms[0].coefficient.isStrictlyNegative();
}
function Z(e) {
	let t = new m().one(), n = new m().one(), r = e.factors.reduce((e, r) => {
		if (r.polynom.degree().isZero() && r.power.isRelative()) {
			let i = r.polynom.monoms[0].coefficient.pow(r.power.clone().abs());
			return r.power.isPositive() ? t.multiply(i) : n.multiply(i), e;
		}
		let i = r.polynom.display;
		return Object.hasOwn(e, i) ? e[i].push(r) : e[i] = [r], e;
	}, {}), { numerator: i, denominator: a } = t.divide(n).reduce();
	return i !== 1 && (r[i.toString()] = [new B(i, 1)]), a !== 1 && (r[a.toString()] = [new B(a, -1)]), r;
}
//#endregion
//#region src/randomization/coefficient/rndFraction.ts
function Q(e) {
	let t = Object.assign({
		negative: !0,
		max: 10,
		reduced: !0,
		zero: !0,
		natural: !1
	}, e), n = new m();
	if (n.numerator = t.negative ? J(t.max, t.zero) : q(+!t.zero, t.max), t.natural) n.denominator = 1;
	else {
		let e = 0;
		for (; n.isRelative() && e < 10;) n.denominator = q(1, t.max), e++;
	}
	return t.reduced ? n.reduce() : n;
}
//#endregion
//#region src/randomization/algebra/rndMonom.ts
function st(e) {
	let t = Object.assign({
		variables: "x",
		degree: 2,
		fraction: !0,
		zero: !1
	}, e), n = new L();
	if (n.coefficient = Q(Object.assign({}, {
		zero: t.zero,
		reduced: !0,
		natural: t.fraction === !1
	}, typeof t.fraction == "boolean" ? {} : t.fraction)), t.variables.length > 1) {
		for (let e of t.variables.split("")) n.setExponent(e, 0);
		for (let e = 0; e < t.degree; e++) {
			let e = Y(t.variables.split(""));
			n.setExponent(e, n.degree(e).clone().add(1));
		}
	} else n.setExponent(t.variables, t.degree);
	return n;
}
//#endregion
//#region src/randomization/algebra/rndPolynom.ts
var ct = {
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
function lt(e) {
	let t = Object.assign({}, ct, e);
	if (t.factorable) return ut(t);
	let n = new R().empty(), r, i = t.degree ?? 2;
	for (let e = i; e >= 0; e--) r = st({
		variables: t.variables,
		degree: e,
		fraction: t.fraction,
		zero: e !== i && t.allowNullMonom
	}), t.unit && i === e && r.coefficient.one(), n.add(r);
	if (t.positive && n.monomByDegree().coefficient.isNegative() && n.opposite(), t.numberOfMonoms && t.numberOfMonoms > 0 && t.numberOfMonoms < n.length) for (; n.length > t.numberOfMonoms;) {
		let e = q(1, n.length - 1);
		n.monoms = n.monoms.filter((t, n) => n !== e);
	}
	return n.reduce();
}
function ut(e) {
	let t = Object.assign(ct, e), n = { ...t };
	n.degree = 1, n.factorable = !1;
	let r = [], i = t.degree ?? 2;
	for (; r.length < i;) r.push(lt(n));
	if (e?.commonConstant !== !1) {
		let t = J(10, !1);
		e?.commonConstant === !0 && (t === 1 || t === -1) && (t *= q(2, 5)), t !== 1 && t !== -1 && r.unshift(new R(t));
	}
	return R.xMultiply(...r);
}
//#endregion
//#region src/randomization/algebra/rndEquation.ts
function dt(e) {
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
	}, e), n = new R().one();
	for (let e = 0; e < t.degree; e++) {
		let e = lt({
			degree: 1,
			unit: t.unit,
			fraction: t.fraction,
			variables: t.variables,
			zero: t.zero
		});
		n.multiply(e);
	}
	return new z(n, 0);
}
//#endregion
//#region src/randomization/geometry/rndPoint.ts
function $(e) {
	let t = Object.assign({
		axis: !0,
		fraction: !1,
		max: 10,
		quadrant: null
	}, e), n = t.axis === "x", r = t.axis === "y", i = t.fraction ? Q({
		max: t.max,
		zero: n
	}) : new m(J(t.max, n)), a = t.fraction ? Q({
		max: t.max,
		zero: r
	}) : new m(J(t.max, r));
	return Number(t.quadrant) === 1 && (i.abs(), a.abs()), Number(t.quadrant) === 2 && (i.isPositive() && i.opposite(), a.isNegative() && a.opposite()), Number(t.quadrant) === 3 && (i.isPositive() && i.opposite(), a.isPositive() && a.opposite()), Number(t.quadrant) === 4 && (i.isNegative() && i.opposite(), a.isPositive() && a.opposite()), new W(i, a);
}
//#endregion
//#region src/randomization/geometry/rndCircle.ts
function ft(e) {
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
	}, e), n = $(t.center), r, i;
	return t.pointsOnCircle === 8 ? (r = q(1, 3), i = r ** 2 + (r + 1) ** 2) : i = q(1, 20), new Qe(n, i, !0);
}
//#endregion
//#region src/randomization/geometry/rndLine.ts
function pt(e) {
	let t = Object.assign({ A: {
		x: J(10),
		y: J(10)
	} }, e), n = new G(0, 0);
	for (; n.isNull;) n.x = J(10, t.allow?.vertical ?? !0), n.y = J(10, t.allow?.horizontal ?? !0);
	return t.slope === 1 ? n.x.sign() !== n.y.sign() && n.y.opposite() : t.slope === -1 && n.x.sign() !== n.y.sign() && n.y.opposite(), new X().fromPointAndDirection(new G(t.A.x, t.A.y), n);
}
//#endregion
//#region src/randomization/geometry/rndLine3.ts
function mt(e) {
	let t = Object.assign({
		A: {
			x: J(10),
			y: J(10),
			z: J(10)
		},
		direction: {
			x: J(10),
			y: J(10),
			z: J(10)
		}
	}, e);
	return new $e(new W(t.A.x, t.A.y, t.A.z), new G(t.direction.x, t.direction.y, t.direction.z));
}
//#endregion
//#region src/randomization/random.ts
var ht = {
	equation: (e) => dt(e),
	polynom: (e) => lt(e),
	monom: (e) => st(e),
	fraction: (e) => Q(e),
	number: (e, t, n) => q(e, t, n),
	numberSym: (e, t) => J(e, t),
	prime: (e) => Je(e),
	triplet: (e, t) => qe(e, t),
	bool: (e) => Ke(e),
	array: (e, t) => Ye(e, t),
	item: (e) => Y(e),
	shuffle: (e) => Xe(e),
	line: (e) => pt(e),
	line3: (e) => mt(e),
	vector: (e) => new G($(e)),
	point: (e) => $(e),
	circle: (e) => ft(e)
}, gt = {
	Numeric: p,
	Fraction: m,
	Root: h,
	Monom: L,
	Polynom: R,
	Equation: z,
	Matrix: H,
	LinearSystem: rt,
	Factor: B,
	PolyFactor: at,
	LogicalSet: it,
	Random: ht,
	Geometry: {
		Vector: G,
		Point: W,
		Line: X,
		Triangle: Ze,
		Circle: Qe,
		Line3: $e,
		Plane3: et,
		Sphere3: nt
	},
	Errors: {
		PiMathError: e,
		ParseError: t,
		DimensionError: n,
		MathError: r,
		InvalidArgumentError: i,
		NotImplementedError: a,
		IndexError: s,
		StateError: c
	},
	NumExp: Re
};
//#endregion
export { Qe as Circle, n as DimensionError, Te as Domain, z as Equation, k as EquationSolver, V as FACTOR_DISPLAY, B as Factor, ue as FracType, m as Fraction, s as IndexError, T as Interval, i as InvalidArgumentError, X as Line, $e as Line3, rt as LinearSystem, it as LogicalSet, r as MathError, H as Matrix, L as Monom, a as NotImplementedError, Re as NumExp, p as Numeric, t as ParseError, e as PiMathError, et as Plane3, W as Point, at as PolyFactor, R as Polynom, ht as Random, h as Root, tt as SPHERE3_RELATIVE_POSITION, x as Solution, nt as Sphere3, c as StateError, De as TableOfSigns, Ze as Triangle, o as UnsupportedOperationError, G as Vector, He as areVectorsColinears, Ve as areVectorsEquals, C as cmpLeft, w as cmpRight, gt as default, We as determinantFromVectors, Ue as dotProduct };

//# sourceMappingURL=pimath.js.map