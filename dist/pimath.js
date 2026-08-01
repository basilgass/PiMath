//#region src/numeric.ts
function e(e) {
	let t = n(e), r = [], i, a;
	for (; t.length > 0;) i = t.shift() ?? 1, a = (t.length > 0 ? t.pop() : +i) ?? 1, r.push([i, a]);
	return r;
}
function t(...e) {
	let t = r(...e);
	return e.map((e) => e / t);
}
function n(e) {
	let t = Math.abs(e), n = Math.sqrt(t), r = [];
	for (let i = 1; i <= n; i++) e % i === 0 && (r.push(i), r.push(t / i));
	return r.sort(function(e, t) {
		return e - t;
	}), [...new Set(r)];
}
function r(...e) {
	let t = function(e, n) {
		return isNaN(e) || isNaN(n) ? NaN : n === 0 ? e : e === 0 ? n : t(n, e % n);
	}, n = 1, r = 2;
	if (e.length === 0) return 1;
	if (e.length === 1) return e[0] === 0 ? 1 : e[0];
	if (n = t(e[0], e[1]), n === 1) return 1;
	for (r = 2; r < e.length && (n = t(n, e[r]), n !== 1); r++);
	return Math.abs(n);
}
function i(...e) {
	return e.reduce(function(e, t) {
		return Math.abs(e * t / r(e, t));
	});
}
function a(e, t = 3) {
	return +e.toFixed(t);
}
function o(e) {
	if (Number.isSafeInteger(e) || e.toString().split(".")[0].length < 10) return 0;
	throw Error("Periodic value: Not implemented yet");
}
function s(e) {
	let t = [
		2,
		3,
		5,
		7,
		11,
		13,
		17,
		19,
		23,
		29,
		31,
		37,
		41,
		43,
		47,
		53,
		59,
		61,
		67,
		71,
		73,
		79,
		83,
		89,
		97,
		101,
		103,
		107,
		109,
		113,
		127,
		131,
		137,
		139,
		149,
		151,
		157,
		163,
		167,
		173,
		179,
		181,
		191,
		193,
		197,
		199,
		211,
		223,
		227,
		229,
		233,
		239,
		241,
		251,
		257,
		263,
		269,
		271,
		277,
		281,
		283,
		293,
		307,
		311,
		313,
		317,
		331,
		337,
		347,
		349,
		353,
		359,
		367,
		373,
		379,
		383,
		389,
		397,
		401,
		409,
		419,
		421,
		431,
		433,
		439,
		443,
		449,
		457,
		461,
		463,
		467,
		479,
		487,
		491,
		499,
		503,
		509,
		521,
		523,
		541,
		547,
		557,
		563,
		569,
		571,
		577,
		587,
		593,
		599,
		601,
		607,
		613,
		617,
		619,
		631,
		641,
		643,
		647,
		653,
		659,
		661,
		673,
		677,
		683,
		691,
		701,
		709,
		719,
		727,
		733,
		739,
		743,
		751,
		757,
		761,
		769,
		773,
		787,
		797,
		809,
		811,
		821,
		823,
		827,
		829,
		839,
		853,
		857,
		859,
		863,
		877,
		881,
		883,
		887,
		907,
		911,
		919,
		929,
		937,
		941,
		947,
		953,
		967,
		971,
		977,
		983,
		991,
		997,
		1009,
		1013,
		1019,
		1021,
		1031,
		1033,
		1039,
		1049,
		1051,
		1061,
		1063,
		1069,
		1087,
		1091,
		1093,
		1097,
		1103,
		1109,
		1117,
		1123,
		1129,
		1151,
		1153,
		1163,
		1171,
		1181,
		1187,
		1193,
		1201,
		1213,
		1217,
		1223,
		1229,
		1231,
		1237,
		1249,
		1259,
		1277,
		1279,
		1283,
		1289,
		1291,
		1297,
		1301,
		1303,
		1307,
		1319,
		1321,
		1327,
		1361,
		1367,
		1373,
		1381,
		1399,
		1409,
		1423,
		1427,
		1429,
		1433,
		1439,
		1447,
		1451,
		1453,
		1459,
		1471,
		1481,
		1483,
		1487,
		1489,
		1493,
		1499,
		1511,
		1523,
		1531,
		1543,
		1549,
		1553,
		1559,
		1567,
		1571,
		1579,
		1583,
		1597,
		1601,
		1607,
		1609,
		1613,
		1619,
		1621,
		1627,
		1637,
		1657,
		1663,
		1667,
		1669,
		1693,
		1697,
		1699,
		1709,
		1721,
		1723,
		1733,
		1741,
		1747,
		1753,
		1759,
		1777,
		1783,
		1787,
		1789,
		1801,
		1811,
		1823,
		1831,
		1847,
		1861,
		1867,
		1871,
		1873,
		1877,
		1879,
		1889,
		1901,
		1907,
		1913,
		1931,
		1933,
		1949,
		1951,
		1973,
		1979,
		1987,
		1993,
		1997,
		1999,
		2003,
		2011,
		2017,
		2027,
		2029,
		2039,
		2053,
		2063,
		2069,
		2081,
		2083,
		2087,
		2089,
		2099,
		2111,
		2113,
		2129,
		2131,
		2137,
		2141,
		2143,
		2153,
		2161,
		2179,
		2203,
		2207,
		2213,
		2221,
		2237,
		2239,
		2243,
		2251,
		2267,
		2269,
		2273,
		2281,
		2287,
		2293,
		2297,
		2309,
		2311,
		2333,
		2339,
		2341,
		2347,
		2351,
		2357,
		2371,
		2377,
		2381,
		2383,
		2389,
		2393,
		2399,
		2411,
		2417,
		2423,
		2437,
		2441,
		2447,
		2459,
		2467,
		2473,
		2477,
		2503,
		2521,
		2531,
		2539,
		2543,
		2549,
		2551,
		2557,
		2579,
		2591,
		2593,
		2609,
		2617,
		2621,
		2633,
		2647,
		2657,
		2659,
		2663,
		2671,
		2677,
		2683,
		2687,
		2689,
		2693,
		2699,
		2707,
		2711,
		2713,
		2719,
		2729,
		2731,
		2741,
		2749,
		2753,
		2767,
		2777,
		2789,
		2791,
		2797,
		2801,
		2803,
		2819,
		2833,
		2837,
		2843,
		2851,
		2857,
		2861,
		2879,
		2887,
		2897,
		2903,
		2909,
		2917,
		2927,
		2939,
		2953,
		2957,
		2963,
		2969,
		2971,
		2999,
		3001,
		3011,
		3019,
		3023,
		3037,
		3041,
		3049,
		3061,
		3067,
		3079,
		3083,
		3089,
		3109,
		3119,
		3121,
		3137,
		3163,
		3167,
		3169,
		3181,
		3187,
		3191,
		3203,
		3209,
		3217,
		3221,
		3229,
		3251,
		3253,
		3257,
		3259,
		3271,
		3299,
		3301,
		3307,
		3313,
		3319,
		3323,
		3329,
		3331,
		3343,
		3347,
		3359,
		3361,
		3371,
		3373,
		3389,
		3391,
		3407,
		3413,
		3433,
		3449,
		3457,
		3461,
		3463,
		3467,
		3469,
		3491,
		3499,
		3511,
		3517,
		3527,
		3529,
		3533,
		3539,
		3541,
		3547,
		3557,
		3559,
		3571,
		3581,
		3583,
		3593,
		3607,
		3613,
		3617,
		3623,
		3631,
		3637,
		3643,
		3659,
		3671,
		3673,
		3677,
		3691,
		3697,
		3701,
		3709,
		3719,
		3727,
		3733,
		3739,
		3761,
		3767,
		3769,
		3779,
		3793,
		3797,
		3803,
		3821,
		3823,
		3833,
		3847,
		3851,
		3853,
		3863,
		3877,
		3881,
		3889,
		3907,
		3911,
		3917,
		3919,
		3923,
		3929,
		3931,
		3943,
		3947,
		3967,
		3989,
		4001,
		4003,
		4007,
		4013,
		4019,
		4021,
		4027,
		4049,
		4051,
		4057,
		4073,
		4079,
		4091,
		4093,
		4099,
		4111,
		4127,
		4129,
		4133,
		4139,
		4153,
		4157,
		4159,
		4177,
		4201,
		4211,
		4217,
		4219,
		4229,
		4231,
		4241,
		4243,
		4253,
		4259,
		4261,
		4271,
		4273,
		4283,
		4289,
		4297,
		4327,
		4337,
		4339,
		4349,
		4357,
		4363,
		4373,
		4391,
		4397,
		4409,
		4421,
		4423,
		4441,
		4447,
		4451,
		4457,
		4463,
		4481,
		4483,
		4493,
		4507,
		4513,
		4517,
		4519,
		4523,
		4547,
		4549,
		4561,
		4567,
		4583,
		4591,
		4597,
		4603,
		4621,
		4637,
		4639,
		4643,
		4649,
		4651,
		4657,
		4663,
		4673,
		4679,
		4691,
		4703,
		4721,
		4723,
		4729,
		4733,
		4751,
		4759,
		4783,
		4787,
		4789,
		4793,
		4799,
		4801,
		4813,
		4817,
		4831,
		4861,
		4871,
		4877,
		4889,
		4903,
		4909,
		4919,
		4931,
		4933,
		4937,
		4943,
		4951,
		4957,
		4967,
		4969,
		4973,
		4987,
		4993,
		4999,
		5003,
		5009,
		5011,
		5021,
		5023,
		5039,
		5051,
		5059,
		5077,
		5081,
		5087,
		5099,
		5101,
		5107,
		5113,
		5119,
		5147,
		5153,
		5167,
		5171,
		5179,
		5189,
		5197,
		5209,
		5227,
		5231,
		5233,
		5237,
		5261,
		5273,
		5279,
		5281,
		5297,
		5303,
		5309,
		5323,
		5333,
		5347,
		5351,
		5381,
		5387,
		5393,
		5399,
		5407,
		5413,
		5417,
		5419,
		5431,
		5437,
		5441,
		5443,
		5449,
		5471,
		5477,
		5479,
		5483,
		5501,
		5503,
		5507,
		5519,
		5521,
		5527,
		5531,
		5557,
		5563,
		5569,
		5573,
		5581,
		5591,
		5623,
		5639,
		5641,
		5647,
		5651,
		5653,
		5657,
		5659,
		5669,
		5683,
		5689,
		5693,
		5701,
		5711,
		5717,
		5737,
		5741,
		5743,
		5749,
		5779,
		5783,
		5791,
		5801,
		5807,
		5813,
		5821,
		5827,
		5839,
		5843,
		5849,
		5851,
		5857,
		5861,
		5867,
		5869,
		5879,
		5881,
		5897,
		5903,
		5923,
		5927,
		5939,
		5953,
		5981,
		5987,
		6007,
		6011,
		6029,
		6037,
		6043,
		6047,
		6053,
		6067,
		6073,
		6079,
		6089,
		6091,
		6101,
		6113,
		6121,
		6131,
		6133,
		6143,
		6151,
		6163,
		6173,
		6197,
		6199,
		6203,
		6211,
		6217,
		6221,
		6229,
		6247,
		6257,
		6263,
		6269,
		6271,
		6277,
		6287,
		6299,
		6301,
		6311,
		6317,
		6323,
		6329,
		6337,
		6343,
		6353,
		6359,
		6361,
		6367,
		6373,
		6379,
		6389,
		6397,
		6421,
		6427,
		6449,
		6451,
		6469,
		6473,
		6481,
		6491,
		6521,
		6529,
		6547,
		6551,
		6553,
		6563,
		6569,
		6571,
		6577,
		6581,
		6599,
		6607,
		6619,
		6637,
		6653,
		6659,
		6661,
		6673,
		6679,
		6689,
		6691,
		6701,
		6703,
		6709,
		6719,
		6733,
		6737,
		6761,
		6763,
		6779,
		6781,
		6791,
		6793,
		6803,
		6823,
		6827,
		6829,
		6833,
		6841,
		6857,
		6863,
		6869,
		6871,
		6883,
		6899,
		6907,
		6911,
		6917,
		6947,
		6949,
		6959,
		6961,
		6967,
		6971,
		6977,
		6983,
		6991,
		6997,
		7001,
		7013,
		7019,
		7027,
		7039,
		7043,
		7057,
		7069,
		7079,
		7103,
		7109,
		7121,
		7127,
		7129,
		7151,
		7159,
		7177,
		7187,
		7193,
		7207,
		7211,
		7213,
		7219,
		7229,
		7237,
		7243,
		7247,
		7253,
		7283,
		7297,
		7307,
		7309,
		7321,
		7331,
		7333,
		7349,
		7351,
		7369,
		7393,
		7411,
		7417,
		7433,
		7451,
		7457,
		7459,
		7477,
		7481,
		7487,
		7489,
		7499,
		7507,
		7517,
		7523,
		7529,
		7537,
		7541,
		7547,
		7549,
		7559,
		7561,
		7573,
		7577,
		7583,
		7589,
		7591,
		7603,
		7607,
		7621,
		7639,
		7643,
		7649,
		7669,
		7673,
		7681,
		7687,
		7691,
		7699,
		7703,
		7717,
		7723,
		7727,
		7741,
		7753,
		7757,
		7759,
		7789,
		7793,
		7817,
		7823,
		7829,
		7841,
		7853,
		7867,
		7873,
		7877,
		7879,
		7883,
		7901,
		7907,
		7919,
		7927,
		7933,
		7937,
		7949,
		7951,
		7963,
		7993,
		8009,
		8011,
		8017,
		8039,
		8053,
		8059,
		8069,
		8081,
		8087,
		8089,
		8093,
		8101,
		8111,
		8117,
		8123,
		8147,
		8161,
		8167,
		8171,
		8179,
		8191,
		8209,
		8219,
		8221,
		8231,
		8233,
		8237,
		8243,
		8263,
		8269,
		8273,
		8287,
		8291,
		8293,
		8297,
		8311,
		8317,
		8329,
		8353,
		8363,
		8369,
		8377,
		8387,
		8389,
		8419,
		8423,
		8429,
		8431,
		8443,
		8447,
		8461,
		8467,
		8501,
		8513,
		8521,
		8527,
		8537,
		8539,
		8543,
		8563,
		8573,
		8581,
		8597,
		8599,
		8609,
		8623,
		8627,
		8629,
		8641,
		8647,
		8663,
		8669,
		8677,
		8681,
		8689,
		8693,
		8699,
		8707,
		8713,
		8719,
		8731,
		8737,
		8741,
		8747,
		8753,
		8761,
		8779,
		8783,
		8803,
		8807,
		8819,
		8821,
		8831,
		8837,
		8839,
		8849,
		8861,
		8863,
		8867,
		8887,
		8893,
		8923,
		8929,
		8933,
		8941,
		8951,
		8963,
		8969,
		8971,
		8999,
		9001,
		9007,
		9011,
		9013,
		9029,
		9041,
		9043,
		9049,
		9059,
		9067,
		9091,
		9103,
		9109,
		9127,
		9133,
		9137,
		9151,
		9157,
		9161,
		9173,
		9181,
		9187,
		9199,
		9203,
		9209,
		9221,
		9227,
		9239,
		9241,
		9257,
		9277,
		9281,
		9283,
		9293,
		9311,
		9319,
		9323,
		9337,
		9341,
		9343,
		9349,
		9371,
		9377,
		9391,
		9397,
		9403,
		9413,
		9419,
		9421,
		9431,
		9433,
		9437,
		9439,
		9461,
		9463,
		9467,
		9473,
		9479,
		9491,
		9497,
		9511,
		9521,
		9533,
		9539,
		9547,
		9551,
		9587,
		9601,
		9613,
		9619,
		9623,
		9629,
		9631,
		9643,
		9649,
		9661,
		9677,
		9679,
		9689,
		9697,
		9719,
		9721,
		9733,
		9739,
		9743,
		9749,
		9767,
		9769,
		9781,
		9787,
		9791,
		9803,
		9811,
		9817,
		9829,
		9833,
		9839,
		9851,
		9857,
		9859,
		9871,
		9883,
		9887,
		9901,
		9907,
		9923,
		9929,
		9931,
		9941,
		9949,
		9967,
		9973
	];
	return e === void 0 ? t : t.slice(0, Math.min(t.length, e));
}
function c(e, t) {
	let n = [], r = t === !0 ? +e : e ** 2;
	for (let t = 0; t <= e; t++) for (let i = 0; i <= e; i++) t ** 2 + i ** 2 === r && n.push([
		t,
		i,
		e
	]);
	return n;
}
function l(e, t = 2) {
	let n = Math.round(Number(`${e}e${t}`));
	return Number(`${n}e-${t}`);
}
function u(e, t) {
	let n = Math.floor(e ** (1 / t)), r = e;
	for (; n > 1;) {
		let e = n ** +t;
		if (r % e === 0) return e;
		n--;
	}
	return 1;
}
var d = {
	decompose: e,
	dividers: n,
	divideNumbersByGCD: t,
	gcd: r,
	lcm: i,
	numberCorrection: a,
	periodic: o,
	primes: s,
	pythagoreanTripletsWithTarget: c,
	round: l,
	greatestPower: u
}, f = /* @__PURE__ */ function(e) {
	return e.frac = "frac", e.dfrac = "dfrac", e.tfrac = "tfrac", e;
}({}), p = class e {
	#e = 1;
	#t = 3;
	#n = !0;
	#r = 1;
	#i = "frac";
	#a = !1;
	constructor(e, t) {
		return e !== void 0 && this.parse(e, t), this;
	}
	parse = (t, n) => t === "" ? (this.#r = 0, this.#e = 1, this) : typeof t == "number" && isNaN(t) ? this.invalid() : typeof t == "number" && !isFinite(t) ? (this.infinite(), t < 0 && this.opposite(), this) : typeof t == "string" ? this.fromString(t) : typeof t == "number" && n === void 0 ? this.fromNumber(t) : typeof t == "number" && typeof n == "number" ? this.fromNumbers(t, n) : t instanceof e ? this.copy(t) : this;
	clone = () => {
		let t = new e();
		return t.numerator = this.#r, t.denominator = this.#e, t.exact = this.exact, t.#i = this.#i, t.#t = this.#t, t.#a = this.#a, t;
	};
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
	static areEquals = (...e) => e.every((t) => t.isEqual(e[0]));
	static average = (...t) => {
		let n = new e().zero();
		for (let e of t) n.add(e);
		return n.divide(t.length), n;
	};
	static isFraction(t) {
		if (t instanceof e || typeof t == "number" && !isNaN(t)) return !0;
		if (typeof t == "string") {
			let e = t.split("/");
			return e.length <= 2 && e.every((e) => !isNaN(+e));
		}
		return !1;
	}
	static max = (...t) => {
		let n = new e(t[0]);
		for (let r of t) {
			let t = new e(r);
			t.isGreater(n) && (n = t.clone());
		}
		return n;
	};
	static min = (...t) => {
		let n = new e(t[0]);
		for (let r of t) {
			let t = new e(r);
			t.isLesser(n) && (n = t.clone());
		}
		return n;
	};
	static sort = (t, n) => {
		let r = t.map((t) => t instanceof e ? t : new e(t)).sort((e, t) => e.value - t.value);
		return n && r.reverse(), r;
	};
	static toSameDenominateur(...t) {
		let n = t.map((t) => new e(t)), r = d.lcm(...n.map((e) => e.denominator));
		return n.forEach((e) => e.amplify(r / e.denominator)), n;
	}
	static unique = (t) => {
		let n = {}, r = [];
		return t.forEach((t) => {
			t instanceof e || (t = new e(t)), n[t.clone().reduce().tex] || (r.push(t.clone()), n[t.clone().reduce().tex] = !0);
		}), r;
	};
	static xMultiply = (...t) => {
		let n = new e();
		return t.forEach((e) => n.multiply(e, !1)), n;
	};
	abs = () => (this.#r = Math.abs(this.#r), this.#e = Math.abs(this.#e), this);
	add = (t) => {
		if (t instanceof e) {
			let e = this.#r, n = this.#e;
			this.#r = e * t.denominator + t.numerator * n, this.#e = n * t.denominator, this.exact = this.exact && t.exact;
		} else return this.add(new e(t));
		return this.reduce();
	};
	amplify = (e) => {
		if (!Number.isSafeInteger(e)) throw Error("The amplification factor must be a safe integer.");
		return this.#r *= e, this.#e *= e, this;
	};
	compare = (t, n) => {
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
			case "=": return this.#r * r.denominator === r.numerator * this.#e;
			case "<>": return this.#r * r.denominator !== r.numerator * this.#e;
			default: return !1;
		}
	};
	get denominator() {
		return this.#e;
	}
	set denominator(e) {
		this.#e = e;
	}
	get dfrac() {
		return this.#i = "dfrac", this;
	}
	digits(e) {
		return this.#t = e, this;
	}
	divide = (t) => {
		let n = new e(t);
		if (n.numerator === 0) return this.infinite();
		let r = this.#r, i = this.#e;
		return this.#r = r * n.denominator, this.#e = i * n.numerator, this.exact = this.exact && n.exact, this.reduce();
	};
	get exact() {
		return this.#n;
	}
	set exact(e) {
		this.#n = e;
	}
	get frac() {
		return this.#i = "frac", this;
	}
	fromNumber(e) {
		if (Number.isSafeInteger(e)) return this.#r = e, this.#e = 1, this.#n = !0, this;
		let [, t] = e.toString().split("."), n = t ? t.length : 0, r = 10 ** n;
		return this.#r = e * r, this.#e = r, this.#r = d.numberCorrection(this.#r), this.#e = d.numberCorrection(this.#e), this.reduce(), this.#n = n < 10, this;
	}
	fromNumbers(e, t) {
		return Number.isSafeInteger(e) && Number.isSafeInteger(t) ? (this.#r = e, this.#e = t, this.#n = !0, this) : this.fromNumber(e / t);
	}
	fromPeriodic(e, t) {
		let [, n] = e.toString().split(/[.,]/), r = n ? n.length : 0;
		if (!Number.isSafeInteger(t) || t <= 0) throw Error("The periodic length must be a positive integer.");
		if (t > r) throw Error(`The periodic length (${t}) cannot exceed the number of decimal digits (${r}).`);
		let i = 10 ** r;
		return this.#r = +e * i - Math.floor(e * 10 ** (r - t)), this.#e = i - 10 ** (r - t), this.#n = !0, this;
	}
	fromString(e) {
		let t = e.split("/").map(Number);
		return this.#n = !0, t.length > 2 || t.some((e) => isNaN(e)) ? (this.#r = NaN, this) : t.length === 1 ? this.fromNumber(+e) : t[1] === 0 ? this.infinite() : (this.#r = t[0], this.#e = t[1], this);
	}
	infinite = () => (this.#r = Infinity, this.#e = 1, this.exact = !0, this);
	invalid = () => (this.#r = NaN, this.#e = 1, this.exact = !0, this);
	inverse = () => {
		let e = this.sign(), t = Math.abs(this.#r);
		return this.#r = Math.abs(this.#e) * e, this.#e = t, this;
	};
	isEqual = (e) => this.compare(e, "=");
	isEven = () => this.isRelative() && this.value % 2 == 0;
	isFinite = () => !this.isInfinity() && !this.isNaN();
	isGeq = (e) => this.compare(e, ">=");
	isGreater = (e) => this.compare(e, ">");
	isInfinity = () => Math.abs(this.#r) === Infinity;
	isLeq = (e) => this.compare(e, "<=");
	isLesser = (e) => this.compare(e, "<");
	isNaN = () => isNaN(this.#r);
	isNatural = () => this.isRelative() && this.isPositive();
	isNegative = () => this.sign() === -1;
	isNotEqual = (e) => this.compare(e, "<>");
	isNotZero = () => this.#r !== 0;
	isOdd = () => this.isRelative() && Math.abs(this.value % 2) === 1;
	isOne = () => this.#r === 1 && this.#e === 1;
	isPositive = () => this.sign() === 1;
	isRational = () => this.exact && !this.isRelative();
	isReduced = () => Math.abs(d.gcd(this.#r, this.#e)) === 1;
	isRelative = () => this.exact && this.clone().reduce().denominator === 1;
	isSquare = () => Math.sqrt(this.#r) % 1 == 0 && Math.sqrt(this.#e) % 1 == 0;
	isStrictlyNegative = () => this.value < 0;
	isStrictlyPositive = () => this.value > 0;
	isUnit() {
		return Math.abs(this.#r) === 1 && this.#e === 1;
	}
	isZero = () => this.#r === 0;
	multiply = (t, n = !0) => {
		let r = new e(t);
		return this.#r *= r.numerator, this.#e *= r.denominator, this.exact = this.exact && r.exact, n ? this.reduce() : this;
	};
	get numerator() {
		return this.#r;
	}
	set numerator(e) {
		this.#r = e;
	}
	one = () => this.fromNumber(1);
	opposite = () => (this.#r = -this.#r, this);
	pow = (t) => {
		if (t instanceof e) return this.pow(t.value);
		this.reduce(), t < 0 && this.inverse();
		let n = Math.abs(t), r = this.#r ** +n, i = this.#e ** +n, a = Math.floor(r), o = Math.floor(i);
		return a === r && o === i ? (this.#r = a, this.#e = o) : (this.#r = r / i, this.#e = 1, this.exact = !1), this;
	};
	reduce = () => {
		let e = d.gcd(this.#r, this.#e);
		return this.#r /= e, this.#e /= e, this.#e < 0 && (this.#e = -this.#e, this.#r = -this.#r), this;
	};
	root = (e) => {
		if (e === 0) return this;
		if (!Number.isSafeInteger(e)) throw Error("The root must be an integer.");
		if (e < 0 && this.inverse(), this.isNegative() && e % 2 == 0) throw Error("The root of a negative number must be odd.");
		let t = this.sign();
		this.abs(), this.reduce();
		let n = Math.floor(this.#r ** +Math.abs(1 / e)), r = Math.floor(this.#e ** +Math.abs(1 / e));
		return this.#r **= +Math.abs(1 / e), this.#e **= +Math.abs(1 / e), (n !== this.#r || r !== this.#e) && (this.#r /= this.#e, this.#e = 1, this.exact = !1), this.multiply(t), this;
	};
	sign = () => this.#r * this.#e >= 0 ? 1 : -1;
	sqrt = () => this.root(2);
	subtract = (t) => t instanceof e ? this.add(t.clone().opposite()) : this.add(-t);
	get tfrac() {
		return this.#i = "tfrac", this;
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
	zero = () => this.fromNumber(0);
};
//#endregion
//#region src/helpers.ts
function m(e, t = !0) {
	return t ? `\\left( ${e} \\right)` : `(${e})`;
}
function h(e) {
	if (!e.startsWith("(") || !e.endsWith(")")) return e;
	let t = 0;
	for (let n = 0; n < e.length - 1; n++) if (e[n] === "(" ? t++ : e[n] === ")" && t--, t === 0) return e;
	return e.slice(1, -1);
}
function g(e, t, n, r, i) {
	return e.map((e, a) => r !== void 0 && a < r || i !== void 0 && a > i ? e : e === t ? n : e);
}
function _(e, t) {
	if (t.length !== 1) throw Error(`splitChar must be a single character, got: "${t}"`);
	let n = 0, r = 0, i = [];
	for (let a = 0; a < e.length; a++) {
		let o = e[a];
		o === "(" ? n++ : o === ")" ? n-- : o === t && n === 0 && (i.push(e.substring(r, a)), r = a + 1);
	}
	return i.push(e.substring(r)), i;
}
//#endregion
//#region src/coefficients/root.ts
var v = class e {
	#e;
	#t;
	#n;
	#r = !1;
	constructor(e) {
		return this.#t = 2, this.#e = new p().zero(), this.#n = new p().zero(), e && this.parse(e), this;
	}
	parse(t) {
		if (t instanceof e) return this.index = t.index, this.radical = t.radical.clone(), this.factor = t.factor.clone(), this;
		if (t instanceof p) return this.index = 2, this.factor = t.clone(), this.radical.one(), this;
		if (typeof t == "string") {
			if (t.includes("sqrt")) return this.#s(t);
			if (t.includes("root")) return this.#o(t);
		}
		return this.index = 2, this.factor = new p(t), this.radical.one(), this;
	}
	clone() {
		return new e().from(this.index, this.radical, this.factor);
	}
	get tex() {
		let e = this.#r && this.factor.isPositive() ? "+" : "", t = e && this.#e.numerator === 1 ? " " : "";
		if (this.value === 0) return `${e}0`;
		let n = this.#a(this.#e.denominator, this.#n.denominator), r = this.#a(this.#e.numerator, this.#n.numerator) ?? "1";
		return n === null ? `${e}${t}${r}` : `${e}${t}\\frac{ ${r} }{ ${n} }`;
	}
	get display() {
		let e = this.#r && this.factor.isPositive() ? "+" : "";
		if (this.value === 0) return `${e}0`;
		let t = this.#i(this.#e.denominator, this.#n.denominator, !0), n = this.#i(this.#e.numerator, this.#n.numerator, t !== null) ?? "1";
		return t === null ? `${e}${n}` : `${e}${n}/${t}`;
	}
	add(t) {
		this.reduce();
		let n = new e(t).reduce();
		if (this.index !== n.index || !this.radical.isEqual(n.radical)) throw Error("Add can only be done with two same index and radical");
		return this.factor.add(n.factor), this;
	}
	divide(t) {
		return this.multiply(new e(t).inverse());
	}
	get factor() {
		return this.#e;
	}
	set factor(e) {
		this.#e = e;
	}
	from(e, t, n) {
		return this.index = e, this.radical = new p(t), this.factor = n ? new p(n) : new p().one(), this;
	}
	group() {
		return this.radical.multiply(this.factor.pow(this.index)), this.factor.one(), this;
	}
	get index() {
		return this.#t;
	}
	set index(e) {
		if (!Number.isSafeInteger(e) || e <= 0) throw Error("Index must be a strictly positive integer.");
		this.#t = e;
	}
	get indexAsPow() {
		return new p(this.index).inverse();
	}
	inverse() {
		return this.factor.inverse(), this.radical.inverse(), this;
	}
	isEqual(e) {
		return this.value === e.value;
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
		let n = new e(t);
		if (this.factor.multiply(n.factor), this.index === n.index) return this.radical.multiply(n.radical), this;
		if (this.radical.isEqual(n.radical)) {
			let e = this.indexAsPow.add(n.indexAsPow).reduce();
			return this.index = e.denominator, this.radical = this.radical.pow(e.numerator), this;
		}
		throw Error("Multiply can only be done if radical or index as equals.");
	}
	one() {
		return this.radical.one(), this.factor.one(), this;
	}
	opposite() {
		return this.factor.opposite(), this;
	}
	pow(e) {
		this.factor.pow(e);
		let t = d.gcd(this.index, e);
		return this.index /= t, this.radical.pow(e / t), this;
	}
	get radical() {
		return this.#n;
	}
	set radical(e) {
		this.#n = e;
	}
	reduce() {
		if (this.radical.isRational()) {
			let e = this.radical.denominator;
			this.radical.denominator = 1, this.radical.numerator *= e, this.factor.divide(e);
		}
		let e = d.greatestPower(this.radical.value, this.index);
		return this.factor.multiply(e ** (1 / this.index)), this.radical.divide(e), this;
	}
	root(e) {
		return this.group(), this.index *= e, this;
	}
	sqrt() {
		return this.root(2);
	}
	subtract(t) {
		let n = new e(t);
		return this.add(n.opposite());
	}
	get value() {
		return d.numberCorrection(this.factor.value * this.radical.value ** (1 / this.index));
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
	#i(e, t, n) {
		let r = this.#t === 2 ? "sqrt" : `root(${this.#t})`, i = [e === 1 || e === 0 ? null : e === -1 ? "-" : e.toString(), t !== 1 && t !== 0 ? `${r}(${t})` : null].filter((e) => e !== null);
		return i.length === 0 ? null : n && i.length === 2 ? `(${i.join("")})` : i.join("");
	}
	#a(e, t) {
		let n = this.#t === 2 ? "\\sqrt" : `\\sqrt[ ${this.#t} ]`, r = [e === 1 || e === 0 ? null : e === -1 ? "-" : e.toString(), t !== 1 && t !== 0 ? `${n}{ ${t} }` : null].filter((e) => e !== null);
		return r.length === 0 ? null : r.join(" ");
	}
	#o(e) {
		let t = /^(.*?)root\((\d+)\)\(?([^)]+)/.exec(e);
		if (!t) throw Error(`Invalid root format: "${e}"`);
		let [, n, r, i] = t;
		return this.index = +r, this.radical = new p(i), this.factor = n === "" ? new p().one() : new p(n.trim()), this;
	}
	#s(e) {
		let [t, n] = e.split("sqrt");
		return this.index = 2, this.radical = new p(h(n)), this.factor = t === "" ? new p().one() : new p(t), this;
	}
}, y = class e {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	constructor() {
		this.#o = "x", this.#n = !1, this.#t = null, this.#a = null, this.#r = new p().zero(), this.#i = new v(), this.#e = 1;
	}
	get tex() {
		if (this.#a) return this.#a;
		if (this.#i.isZero()) return this.#r.tex;
		if (this.#r.isZero()) return this.#i.tex;
		let [e] = p.toSameDenominateur(this.#r, this.#i.factor), t = this.#i.clone().multiply(e.denominator).reduce(), n = `${e.numerator} ${t.withSign.tex}`;
		return e.denominator === 1 ? n : `\\frac{ ${n} }{ ${e.denominator} }`;
	}
	set tex(e) {
		this.#a = e;
	}
	get display() {
		if (this.#t) return this.#t;
		if (this.#i.isZero()) return this.#r.display;
		if (this.#r.isZero()) return this.#i.display;
		let [e] = p.toSameDenominateur(this.#r, this.#i.factor), t = this.#i.clone().multiply(e.denominator).reduce(), n = `${e.numerator}${t.withSign.display}`;
		return e.denominator === 1 ? n : `(${n})/${e.denominator}`;
	}
	set display(e) {
		this.#t = e;
	}
	static fromFraction(t) {
		let n = new e();
		n.setExact();
		let r = new p(t);
		return n.display = r.display, n.tex = r.tex, n.fraction = r, n.root = new v(), n;
	}
	static fromQuadratic(t, n, r) {
		let [i, a, o] = [
			t,
			n,
			r
		].map((e) => new p(e)), s = a.clone().pow(2).subtract(i.clone().multiply(o).multiply(4));
		if (s.isNegative()) return [];
		if (s.isSquare()) {
			let t = s.sqrt(), n = a.clone().opposite().subtract(t).divide(i.clone().multiply(2)), r = a.clone().opposite().add(t).divide(i.clone().multiply(2));
			return t.isZero() ? [e.fromFraction(n)] : [e.fromFraction(n), e.fromFraction(r)];
		}
		let c = new e();
		c.fraction = a.clone().opposite().divide(i).divide(2), c.root = new v().from(2, s, i.clone().multiply(2).inverse().opposite()), c.setExact(!1);
		let l = new e();
		return l.fraction = a.clone().opposite().divide(i).divide(2), l.root = new v().from(2, s, i.clone().multiply(2).inverse()), l.setExact(!1), [c, l];
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
}, ee = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e instanceof M || e instanceof A ? new M(e) : new M().fromPolynom(e), this.#t = this.#e.getRoots();
	}
	get fx() {
		return this.#e;
	}
	get roots() {
		return this.#t;
	}
}, b = class e {
	_;
	#e;
	#t;
	#n;
	constructor(e, t, n = "x") {
		if (this.#n = n, this.#e = 1e-4, this._ = 0, Object.hasOwn(e, "moveLeft")) {
			let t = e;
			this.#t = t.left.clone().subtract(t.right);
		} else this.#t = e.clone().subtract(t ?? 0);
		return this;
	}
	get bissectionComplexityCounter() {
		return this._;
	}
	get bissectionDeltaX() {
		return this.#e;
	}
	set bissectionDeltaX(e) {
		this.#e = e;
	}
	solve() {
		let t = this.#t.degree().value;
		if (t === 0) return [];
		if (t === 1) return this.#d();
		if (t === 2) return this.#f();
		let { solutions: n, reminder: r } = this.#l();
		return r.degree().isZero() ? n : r.degree().value <= 2 ? n.concat(new e(r.clone()).solve()) : (this._ = 0, n.concat(this.#a(r)).sort((e, t) => e.value - t.value));
	}
	solveAsCardan() {
		if (this.#t.degree().value !== 3) throw Error("The equation is not cubic.");
		return this.#u();
	}
	#r(e, t) {
		let n = new y();
		return n.exact = !1, n.tex = t?.tex ?? null, n.display = t?.display ?? null, n.fraction = new p(e), n.fraction.exact = !1, n.variable = this.#n, n;
	}
	#i(e) {
		return e instanceof p && !e.exact ? this.#r(e.value) : y.fromFraction(e);
	}
	#a(e) {
		let t = [], n = e.degree().value, [r, ...i] = e.getCoefficients(), a = 2 + Math.max(...i.map((e) => e.value / r.value)), o = this.#s(e, a, 100);
		return this.#c(o, n).forEach((n) => {
			let [r, i] = n;
			if (r === i) t.push(this.#i(r));
			else {
				let n = this.#o(e, r, i);
				n !== null && t.push(this.#r(n));
			}
		}), t;
	}
	#o(e, t, n) {
		let r = e.evaluate(t, !0), i = e.evaluate(n, !0);
		if (r * i > 0) return console.log("Pas de racine dans l'intervalle donné"), null;
		let a;
		for (; (n - t) / 2 > this.#e;) {
			this._++, a = (t + n) / 2;
			let o = e.evaluate(a, !0);
			if (o === 0) return a;
			r * o < 0 ? (n = a, i = o) : (t = a, r = o);
		}
		return (t + n) / 2;
	}
	#s(e, t, n) {
		let r = [], i = 2 * t / n;
		for (let n = -t; n <= t; n += i) {
			let t = d.numberCorrection(n);
			r.push({
				x: t,
				fx: e.evaluate(t, !0)
			});
		}
		return r;
	}
	#c(e, t) {
		let n = [];
		for (let r = 1; r < e.length; r++) {
			let i = e[r], a = e[r - 1];
			if (i.fx === 0 ? n.push([i.x, i.x]) : i.fx * a.fx < 0 && n.push([a.x, i.x]), n.length === t) return n;
		}
		return n;
	}
	#l() {
		let t = this.#t.clone(), n = [], r = t.lcmDenominator();
		r !== 1 && t.multiply(r);
		let i = t.monomByDegree().coefficient, a = t.monomByDegree(0).coefficient;
		if (a.isZero()) {
			n.push(this.#i(0));
			let e = t.monoms.reduce((e, t) => t.degree().value < e.degree().value ? t : e), r = e.coefficient;
			e.clone().divide(r), t.divide(e);
		}
		let o = d.dividers(i.value), s = d.dividers(a.value), c = [];
		for (let e of o) for (let t of s) {
			let n = new p(t, e);
			c.find((e) => e.value === n.value) || (c.push(n.clone()), c.push(n.opposite().clone()));
		}
		c.forEach((e) => {
			t.evaluate(e).isZero() && n.push(this.#i(e));
		});
		for (let e of n) {
			if (e.isZero()) continue;
			let n = t.clone().fromCoefficients(e.fraction.denominator, -e.fraction.numerator);
			for (e.count = 0; t.isDividableBy(n);) t.divide(n), e.count++;
		}
		if (t.degree().isZero() || t.degree().value > 3) return n.sort((e, t) => e.value - t.value), {
			solutions: n,
			reminder: t
		};
		let l = t.clone().zero(), u = new e(t, l, this.#n);
		return {
			solutions: n.concat(u.solve()).sort((e, t) => e.value - t.value),
			reminder: l
		};
	}
	#u() {
		let e = this.#t, t = e.monomByDegree(3).coefficient, n = e.monomByDegree(2).coefficient, r = e.monomByDegree(1).coefficient, i = e.monomByDegree(0).coefficient, a = n.clone().divide(t), o = r.clone().divide(t), s = i.clone().divide(t), c = o.clone().subtract(a.clone().pow(2).divide(3)), l = s.clone().subtract(a.clone().multiply(o).divide(3)).add(a.clone().pow(3).multiply(2).divide(27)), u = l.clone().opposite(), d = c.clone().opposite().pow(3).divide(27), f = u.clone().pow(2).subtract(d.clone().multiply(4)).opposite();
		if (f.isNegative()) {
			let e = l.clone().opposite().add(f.clone().opposite().sqrt()).divide(2).root(3), t = l.clone().opposite().subtract(f.clone().opposite().sqrt()).divide(2).root(3), n = e.clone().add(t).subtract(a.clone().divide(3));
			return [this.#i(n)];
		}
		if (f.isZero()) {
			let e = l.clone().opposite().divide(2).root(3), t = e.clone().opposite().subtract(a.clone().divide(3)), n = e.clone().multiply(2).subtract(a.clone().divide(3));
			return t.isEqual(n) ? [this.#i(t)] : [this.#i(n), this.#i(t)].sort((e, t) => e.value - t.value);
		}
		if (f.isPositive()) {
			let e = [], t = c.value, n = l.value, r = a.value;
			for (let i = 0; i < 3; i++) e.push(2 * Math.sqrt(-t / 3) * Math.cos(Math.acos(3 * n / (2 * t) * Math.sqrt(-3 / t)) / 3 + 2 * Math.PI * i / 3) - r / 3);
			return e.map((e) => this.#r(e)).sort((e, t) => e.value - t.value);
		}
		return [];
	}
	#d() {
		let [e, t] = this.#t.getCoefficients(), n = t.opposite().divide(e);
		return [this.#i(n)];
	}
	#f() {
		let e = this.#t;
		e.monomByDegree().coefficient.isNegative() && e.opposite();
		let [t, n, r] = e.getCoefficients(), i = n.clone().pow(2).subtract(t.clone().multiply(r).multiply(4));
		if (i.isNegative()) return [];
		if (i.isSquare()) {
			let e = i.sqrt(), r = n.clone().opposite().subtract(e).divide(t.clone().multiply(2)), a = n.clone().opposite().add(e).divide(t.clone().multiply(2));
			if (e.isZero()) {
				let e = this.#i(r);
				return e.count = 2, [e];
			}
			return [this.#i(r), this.#i(a)].sort((e, t) => e.value - t.value);
		}
		return this.#p(t, n, i);
	}
	#p(e, t, n) {
		let r = e.clone().multiply(2), i = new y();
		i.fraction = t.clone().opposite().divide(r.clone()), i.root.radical = n.clone(), i.root.factor = new p().one().divide(r.clone()), i.exact = !0;
		let a = new y();
		return a.fraction = t.clone().opposite().divide(r.clone()), a.root.radical = n.clone(), a.root.factor = new p().one().divide(r.clone()).opposite(), a.exact = !0, [i, a].sort((e, t) => e.value - t.value);
	}
}, x = {
	pi: Math.PI,
	e: Math.exp(1)
}, S = /* @__PURE__ */ function(e) {
	return e.VARIABLE = "variable", e.COEFFICIENT = "coefficient", e.OPERATION = "operation", e.CONSTANT = "constant", e.FUNCTION = "function", e.FUNCTION_ARGUMENT = "function-argument", e.MONOM = "monom", e.LEFT_PARENTHESIS = "(", e.RIGHT_PARENTHESIS = ")", e;
}({}), C = /* @__PURE__ */ function(e) {
	return e.EXPRESSION = "expression", e.POLYNOM = "polynom", e.SET = "set", e.NUMERIC = "numeric", e;
}({});
function te(e, t) {
	if (e.length <= 1) return e;
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
		if (c = l, u = void 0, n.length > 0 && r.exec(e)) {
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
				l = S.OPERATION;
				break;
			default: l = S.VARIABLE;
		}
		if (u === void 0 || l === void 0) throw Error("The token is undefined");
		s += ne(c, l), s += u;
	}
	return s;
}
function ne(e, t) {
	return e === void 0 || e === S.OPERATION || t === S.OPERATION || e === S.LEFT_PARENTHESIS || e === S.FUNCTION || e === S.FUNCTION_ARGUMENT || t === S.RIGHT_PARENTHESIS || t === S.FUNCTION_ARGUMENT ? "" : "*";
}
var re = {
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
	}
}, ie = {
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
		associative: "right",
		type: S.OPERATION
	},
	sin: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	cos: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	tan: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	sqrt: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	nthrt: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	logn: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	",": {
		precedence: 2,
		associative: "left",
		type: S.FUNCTION_ARGUMENT
	}
}, ae = {
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
		associative: "right",
		type: S.OPERATION
	},
	sin: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	cos: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	tan: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	sqrt: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	nthrt: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	ln: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	logn: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	},
	log: {
		precedence: 4,
		associative: "right",
		type: S.FUNCTION
	}
}, oe = {
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
	"-": {
		precedence: 2,
		associative: "left",
		type: S.OPERATION
	}
}, w = class {
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
		return this.#e === C.SET ? (this.#n = oe, this.#i = !1) : this.#e === C.NUMERIC ? (this.#n = ae, this.#i = !0) : this.#e === C.EXPRESSION ? (this.#n = ie, this.#i = !0) : (this.#n = re, this.#i = !0), this.#r = Object.keys(this.#n).sort((e, t) => t.length - e.length), this.#n;
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
			} else console.log("Unidentified token", e[t], e, t), n = e[t], r = S.MONOM;
		}
		if (r === void 0) throw Error(`Token type is undefined for token ${n}`);
		return [
			n,
			t + n.length,
			r
		];
	}
	parse(e, t) {
		let n = [], r = [], i = "", a = 0, o;
		(t ?? this.#i) && (e = te(e, this.#n));
		let s = 50, c;
		for (; a < e.length;) {
			if (s--, s === 0) {
				console.log("SECURITY LEVEL 1 EXIT");
				break;
			}
			switch ([i, a, o] = this.NextToken(e, a), o) {
				case S.MONOM:
				case S.COEFFICIENT:
				case S.VARIABLE:
				case S.CONSTANT:
					n.push({
						token: i,
						tokenType: o
					});
					break;
				case S.OPERATION:
					if (r.length > 0) {
						let e = r[r.length - 1];
						for (c = 50; e.token in this.#n && (this.#n[i].associative === "left" && this.#n[i].precedence <= this.#n[e.token].precedence || this.#n[i].associative === "right" && this.#n[i].precedence < this.#n[e.token].precedence);) {
							if (c--, c === 0) {
								console.log("SECURITY LEVEL 2 OPERATION EXIT");
								break;
							}
							if (n.push(r.pop() ?? {
								token: "",
								tokenType: S.OPERATION
							}), r.length === 0) break;
							e = r[r.length - 1];
						}
					}
					r.push({
						token: i,
						tokenType: o
					});
					break;
				case S.FUNCTION_ARGUMENT:
					for (c = 50; r[r.length - 1].token !== "(" && r.length > 0;) {
						if (c--, c === 0) {
							console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
							break;
						}
						n.push(r.pop() ?? {
							token: i,
							tokenType: o
						});
					}
					break;
				case S.LEFT_PARENTHESIS:
					r.push({
						token: i,
						tokenType: o
					}), e[a] === "-" && n.push({
						token: "0",
						tokenType: S.COEFFICIENT
					});
					break;
				case S.RIGHT_PARENTHESIS:
					for (c = 50; r[r.length - 1].token !== "(" && r.length > 1;) {
						if (c--, c === 0) {
							console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
							break;
						}
						n.push(r.pop() ?? {
							token: i,
							tokenType: o
						});
					}
					r.pop();
					break;
				case S.FUNCTION:
					r.push({
						token: i,
						tokenType: o
					});
					break;
				default: throw Error(`Token type ${i} is not handled`);
			}
		}
		return this.#t = n.concat(r.reverse()), this;
	}
}, T = class {
	_rpn;
	_expression;
	_isValid;
	constructor(e, t) {
		this._expression = e;
		try {
			this._rpn = new w(C.NUMERIC).parse(e, t).rpn;
		} catch (t) {
			throw this._rpn = null, this._isValid = !1, console.warn(t), Error(`There was a problem parsing: ${e}`);
		}
	}
	get rpn() {
		return this._rpn ?? [];
	}
	get isValid() {
		if (this._isValid === void 0) try {
			this.evaluate({ x: 2 });
		} catch (e) {
			e instanceof Error, this._isValid = !1;
		}
		return this._isValid ?? !1;
	}
	set isValid(e) {
		this._isValid = e;
	}
	get expression() {
		return this._expression;
	}
	evaluate(e) {
		let t = [];
		if (this._rpn === null) return this._isValid = !1, 0;
		this._isValid = !0;
		for (let n of this._rpn) if (n.tokenType === S.COEFFICIENT) if (!isNaN(+n.token)) t.push(+n.token);
		else {
			let e = n.token.split("/");
			if (e.length !== 2) throw this._isValid = !1, Error("This coefficient is not a fraction");
			t.push(e[0] / +e[1]);
		}
		else if (n.tokenType === S.VARIABLE && e !== void 0) Object.hasOwn(e, n.token) && t.push(+e[n.token]);
		else if (n.tokenType === S.CONSTANT) t.push(x[n.token]);
		else if (n.tokenType === S.OPERATION) {
			if (n.token === "*") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw this._isValid = !1, Error(`The multiplication factors ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n * e);
			} else if (n.token === "/") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw this._isValid = !1, Error(`The division values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(n / e);
			} else if (n.token === "+") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw this._isValid = !1, Error(`The addition values ${n ?? "a"} or ${e ?? "b"} are not defined`);
				t.push(+n + +e);
			} else if (n.token === "-") {
				let e = t.pop(), n = t.pop() ?? 0;
				if (e === void 0) throw this._isValid = !1, Error("The subtraction value b is  not defined");
				t.push(n - e);
			} else if (n.token === "^") {
				let e = t.pop(), n = t.pop();
				if (n === void 0 || e === void 0) throw this._isValid = !1, Error(`The base value ${n ?? "a"} or exponent ${e ?? "b"} are not defined`);
				t.push(n ** +e);
			}
		} else if (n.tokenType === S.FUNCTION) {
			let e = t.pop();
			if (e === void 0) throw this._isValid = !1, Error(`The parameters for ${n.token} is not defined`);
			if (n.token === "sin") t.push(Math.sin(e));
			else if (n.token === "cos") t.push(Math.cos(e));
			else if (n.token === "tan") t.push(Math.tan(e));
			else if (n.token === "sqrt") t.push(Math.sqrt(e));
			else if (n.token === "nthrt") {
				let n = t.pop();
				if (n === void 0) throw this._isValid = !1, Error("The nthrt function requires two parameters");
				e % 2 == 0 && n < 0 ? t.push(NaN) : t.push((n < 0 ? -1 : 1) * Math.abs(n) ** (1 / e));
			} else if (n.token === "ln") t.push(Math.log(e));
			else if (n.token === "log") t.push(Math.log10(e));
			else if (n.token === "logn") {
				let n = t.pop();
				if (n === void 0) throw this._isValid = !1, Error("The logn function requires two parameters");
				e <= 0 || e === 1 || n <= 0 ? t.push(NaN) : t.push(Math.log(n) / Math.log(e));
			}
		}
		if (t.length === 1) return this._numberCorrection(t[0]);
		throw Error(`There was a problem parsing: ${this._expression}`);
	}
	_numberCorrection(e, t = 8) {
		return +e.toFixed(t);
	}
}, E = class e {
	#e;
	#t;
	constructor(e) {
		return this.#e = new p().zero(), this.#t = {}, e !== void 0 && this.parse(e), this;
	}
	parse(t) {
		return this.#e = new p(), this.#t = {}, t instanceof e ? (this.#e = t.#e.clone(), this.#n(t), this) : t instanceof p ? (this.#e = t.clone(), this) : typeof t == "number" ? (this.#e = new p(t), this) : (isNaN(Number(t)) ? this.#s(t) : this.#e = new p(Number(t)), this);
	}
	clone = () => {
		let t = new e();
		t.coefficient = this.#e.clone();
		for (let e in this.#t) t.setLetter(e, this.#t[e].clone());
		return t;
	};
	get tex() {
		return this.#i("tex");
	}
	get display() {
		return this.#i("display");
	}
	static gcd = (...t) => {
		for (let n of t) if (n.containsRationalPower()) return new e().zero();
		let n = new e();
		n.coefficient = new p(d.gcd(...t.map((e) => e.coefficient.numerator)), d.lcm(...t.map((e) => e.coefficient.denominator))).reduce();
		for (let e of t) {
			for (let t in n.literal) t in e.literal || n.removeVariable(t);
			for (let t in e.literal) !n.hasVariable(t) && e.literal[t].isStrictlyPositive() ? n.literal[t] = e.literal[t].clone() : n.literal[t] = new p(Math.min(e.literal[t].value, n.literal[t].value));
		}
		return n;
	};
	static xMultiply = (...t) => {
		let n = new e().one();
		for (let e of t) n.multiply(e);
		return n;
	};
	add = (...t) => {
		for (let n of t) {
			let t = n instanceof e ? n : new e(n);
			if (this.isSameAs(t)) this.isZero() && this.#n(t), this.#e.add(t.coefficient);
			else throw Error("Add monom: " + this.display + " is not similar with " + t.display);
		}
		return this;
	};
	get coefficient() {
		return this.#e;
	}
	set coefficient(e) {
		this.#e = new p(e);
	}
	containsRationalPower = () => Object.values(this.#t).some((e) => e.isRational());
	degree = (e) => this.variables.length === 0 ? new p().zero() : e === void 0 ? Object.values(this.#t).reduce((e, t) => e.clone().add(t)) : this.hasVariable(e) ? this.#t[e].clone() : new p().zero();
	derivative = (t = "x") => {
		if (this.hasVariable(t)) {
			let e = this.#t[t].clone(), n = this.clone();
			return n.#t[t].subtract(1), n.#e.multiply(new p(e.clone())), n;
		}
		return new e().zero();
	};
	divide = (...t) => {
		for (let n of t) {
			let t = n instanceof e ? n : new e(n);
			this.#e.divide(t.coefficient);
			for (let e in t.literal) this.#t[e] = this.hasVariable(e) ? this.#t[e].subtract(t.literal[e]) : t.literal[e].clone().opposite(), this.#t[e].isZero() && this.removeVariable(e);
		}
		return this;
	};
	get dividers() {
		if (!this.coefficient.isRelative() || this.containsRationalPower() || this.coefficient.numerator > 1e6) return [this.clone()];
		let t = d.dividers(Math.abs(this.coefficient.numerator)), n = [];
		for (let e in this.literal) n = this.#a(n, e);
		let r = [];
		if (n.length > 0 && t.length > 0) for (let i of t) for (let t of n) {
			let n = new e();
			n.coefficient = new p(i), n.literal = t, r.push(n);
		}
		else if (t.length === 0) for (let t of n) {
			let n = new e();
			n.coefficient = new p().one(), n.literal = t, r.push(n);
		}
		else for (let n of t) {
			let t = new e();
			t.coefficient = new p(n), r.push(t);
		}
		return r.length === 0 ? [new e().one()] : r;
	}
	evaluate = (e, t) => {
		if (t === !0) {
			if (e instanceof p) return this.#r(e.value);
			if (typeof e == "number") return this.#r(e);
			if (typeof e == "object") {
				let t = {};
				for (let n in e) t[n] = new p(e[n]).value;
				return this.#r(t);
			}
		}
		let n = this.coefficient.clone();
		if (typeof e == "number" || e instanceof p) {
			let t = {};
			return t[this.variables[0]] = new p(e), this.evaluate(t);
		}
		if (typeof e == "object") {
			if (this.variables.length === 0) return this.coefficient;
			for (let t in this.#t) {
				let r = new p(e[t]);
				n.multiply(r.pow(this.#t[t]));
			}
		}
		return n;
	};
	hasVariable = (e) => Object.hasOwn(this.#t, e ?? "x");
	integrate(e, t, n) {
		let r = this.primitive(n);
		return r.evaluate(t, !1).subtract(r.evaluate(e, !1));
	}
	inverse = () => {
		this.#e.inverse();
		for (let e in this.#t) this.#t[e].opposite();
		return this;
	};
	isDivisible = (e) => {
		if (e.degree().isStrictlyPositive()) {
			for (let t of e.variables) if (!this.degree(t).isGeq(e.degree(t))) return !1;
		}
		return this.coefficient.isRational() || e.coefficient.isRational() ? !0 : this.coefficient.clone().divide(e.coefficient).isRelative();
	};
	isEqual = (e) => this.isSameAs(e) && this.#e.isEqual(e.coefficient);
	isLiteralSquare = () => {
		for (let e in this.literal) if (this.literal[e].isRational() || this.literal[e].isOdd()) return !1;
		return !0;
	};
	isOne = () => this.#e.value === 1 && this.variables.length === 0;
	isSameAs = (e) => {
		let t = this.variables, n = e.variables, r = t.concat(n.filter((e) => !t.includes(e)));
		if (this.isZero() || e.isZero() || t.length === 0 && n.length === 0) return !0;
		if (t.length !== n.length) return !1;
		if (!this.isZero() && !e.isZero()) {
			for (let t of r) if (!this.hasVariable(t) || !e.hasVariable(t) || !this.#t[t].isEqual(e.literal[t])) return !1;
		}
		return !0;
	};
	isSquare = () => this.coefficient.isSquare() ? this.isLiteralSquare() : !1;
	isZero = () => this.#e.value === 0;
	get literal() {
		return this.#t;
	}
	set literal(e) {
		this.#t = e;
	}
	set literalStr(e) {
		for (let t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)]) t[1] in this.#t || (this.#t[t[1]] = new p().zero()), this.#t[t[1]].add(+t[2]);
		for (let t of [...e.matchAll(/([a-z](?!\^))/g)]) t[1] in this.#t || (this.#t[t[1]] = new p().zero()), this.#t[t[1]].add(1);
	}
	multiply = (...t) => {
		for (let n of t) {
			let t = n instanceof e ? n : new e(n);
			this.#e.multiply(t.coefficient);
			for (let e in t.literal) this.hasVariable(e) ? this.#t[e].add(t.literal[e]) : this.#t[e] = t.literal[e].clone();
		}
		return this;
	};
	one = () => (this.#e = new p().one(), this.#t = {}, this);
	opposite = () => (this.#e.opposite(), this);
	get plotFunction() {
		return this.#i("plot");
	}
	pow = (e) => {
		this.#e.pow(e);
		for (let t in this.#t) this.#t[t].multiply(e);
		return this;
	};
	primitive = (e = "x") => {
		let t = this.clone(), n;
		return t.hasVariable(e) ? (n = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(n), t.setLetter(e, n)) : (t.coefficient.isZero() && (t.coefficient = new p().one()), t.setLetter(e, 1)), t;
	};
	reduce = () => {
		this.coefficient.reduce();
		for (let e in this.#t) this.#t[e].isZero() && this.removeVariable(e);
		return this;
	};
	removeVariable(e) {
		delete this.#t[e];
	}
	root = () => {
		throw Error("Method not implemented.");
	};
	setLetter = (e, t) => t instanceof p ? this.hasVariable(e) && t.isZero() ? (this.removeVariable(e), this) : (this.#t[e] = t.clone(), this) : this.setLetter(e, new p(t));
	sqrt = () => {
		if (this.isSquare()) {
			this.#e.sqrt();
			for (let e in this.#t) this.#t[e].divide(2);
		}
		return this;
	};
	subtract = (...t) => {
		for (let n of t) {
			let t = n instanceof e ? n : new e(n);
			if (this.isSameAs(t)) this.isZero() && this.#n(t), this.#e.add(t.clone().coefficient.opposite());
			else throw Error("Subtract: Is not similar: " + t.display);
		}
		return this;
	};
	get variables() {
		let e = [];
		return Object.entries(this.literal).forEach(([t, n]) => {
			n.isZero() || e.push(t);
		}), e.sort(), e;
	}
	zero = () => (this.#e = new p().zero(), this.#t = {}, this);
	#n(e) {
		for (let t in e.literal) this.#t[t] = e.literal[t].clone();
	}
	#r = (e) => {
		let t = this.coefficient.value;
		if (typeof e == "number") {
			let t = {}, n = this.variables[0];
			return t[n] = e, this.#r(t);
		}
		if (e instanceof p) {
			let t = {};
			return t[this.variables[0]] = new p(e).value, this.#r(t);
		}
		if (typeof e == "object") {
			if (this.variables.length === 0) return this.coefficient.value;
			for (let n in this.#t) {
				let r = e[n];
				r instanceof p ? t *= r.value ** this.#t[n].value : t *= r ** this.#t[n].value;
			}
		}
		return t;
	};
	#i = (e) => {
		let t = "", n = Object.keys(this.#t).sort();
		for (let r of n) this.#t[r].isNotZero() && (e === "plot" && t !== "" && (t += "*"), t += r, this.#t[r].isNotEqual(1) && (t += e === "tex" ? `^{ ${this.#t[r].tfrac.tex} }` : `^(${this.#t[r].display})`));
		let r = e === "tex" ? this.#e.frac.tex : this.#e.display;
		return t === "" ? this.#e.value === 0 ? "0" : r : this.#e.value === 1 ? t : this.#e.value === -1 ? `-${t}` : this.#e.value === 0 ? "0" : e === "plot" ? `${r}*${t}` : `${r}${t}`;
	};
	#a(e, t) {
		let n = [];
		for (let r = 0; r <= this.literal[t].value; r++) if (e.length === 0) {
			let e = {};
			e[t] = new p(r), n.push(e);
		} else for (let i of e) {
			let e = {};
			for (let t in i) e[t] = i[t];
			e[t] = new p(r), n.push(e);
		}
		return n;
	}
	#o = (t, n) => {
		let r, i, a, o, s;
		if (n.tokenType === S.COEFFICIENT) t.push(new e(new p(n.token)));
		else if (n.tokenType === S.VARIABLE) {
			let r = new e().one();
			r.setLetter(n.token, 1), t.push(r.clone());
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
			case "^": s = t.pop()?.coefficient ?? new p().one(), a = t.pop() ?? new e().one(), o = a.variables[0], o && a.setLetter(o, s), t.push(a);
		}
	};
	#s = (e) => {
		let t = new w().parse(e).rpn, n = [];
		if (t.length === 0) return this.zero(), this;
		if (t.length === 1) {
			let e = t[0];
			return this.one(), e.tokenType === S.COEFFICIENT ? this.coefficient = new p(e.token) : e.tokenType === S.VARIABLE && this.setLetter(e.token, 1), this;
		}
		for (let e of t) this.#o(n, e);
		return this.one(), this.multiply(n[0]), this;
	};
};
//#endregion
//#region src/algebra/operations.ts
function D(e, t) {
	if (!Number.isSafeInteger(t)) throw Error("Can only raise item by an integer");
	if (t < 0) throw Error("Can only raise item by a positive integer");
	if (t === 0) return e.one();
	let n = e.clone();
	for (let r = 1; r < t; r++) e.multiply(n);
	return e;
}
//#endregion
//#region src/algebra/polynom.ts
var O = class e {
	#e = "x";
	#t;
	#n;
	#r;
	#i = !1;
	constructor(e, ...t) {
		return this.#n = [], this.#t = [], this.#r = [], e !== void 0 && this.parse(e, ...t), this;
	}
	parse(t, ...n) {
		if (this.#n = [], this.#t = [], this.#u(), typeof t == "string") return this.#h(t, ...n);
		if ((typeof t == "number" || t instanceof p || t instanceof E) && n.length === 0) this.#n.push(new E(t));
		else if (t instanceof E && n.length > 0) this.#n.push(new E(t)), n.forEach((e) => {
			this.#n.push(new E(e));
		});
		else if (t instanceof e) for (let e of t.monoms) this.#n.push(e.clone());
		return this;
	}
	clone() {
		let t = new e(), n = [];
		t.#e = this.#e;
		for (let e of this.#n) n.push(e.clone());
		return t.monoms = n, t;
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
		for (let n of t) n instanceof e ? this.#n = this.#n.concat(n.monoms.map((e) => e.clone())) : n instanceof E ? this.#n.push(n.clone()) : typeof n == "number" && Number.isSafeInteger(n) ? this.#n.push(new E(n.toString())) : this.#n.push(new E(n));
		return this.reduce();
	}
	commonMonom() {
		let e = new E().one();
		e.coefficient = new p(this.gcdNumerator(), this.gcdDenominator());
		for (let t of this.variables) {
			e.setLetter(t, this.degree(t));
			for (let n of this.#n) if (e.setLetter(t, p.min(n.degree(t), e.degree(t))), e.degree(t).isZero()) break;
		}
		return e;
	}
	degree(e) {
		let t = new p().zero();
		for (let n of this.#n) t = p.max(n.degree(e).value, t);
		return t;
	}
	derivative(t) {
		let n = new e();
		for (let e of this.#n) n.add(e.derivative(t));
		return n.reduce();
	}
	divide(t) {
		if (t instanceof p) return this.#o(t);
		if (typeof t == "number" && Number.isSafeInteger(t)) return this.#s(t);
		if (t instanceof E) return this.divide(new e(t));
		if (t instanceof e) {
			if (t.monoms.length === 1 && t.variables.length === 0) return this.#o(t.monoms[0].coefficient);
			{
				let { quotient: e, reminder: n } = this.euclidean(t);
				if (n.isZero()) return this.#n = e.monoms, this.#u(), this;
			}
		} else if (typeof t == "string") return this.divide(new e(t));
		throw Error(`Cannot divide by ${t}`);
	}
	empty() {
		return this.#n = [], this.#u(), this;
	}
	euclidean(t) {
		let n = t.variables[0], r = new e().zero(), i = this.clone().reorder(n);
		if (t.variables.length === 0) return {
			quotient: this.clone().divide(t).reduce(),
			reminder: new e().zero()
		};
		if (!this.degree(n).isNatural() || !t.degree(n).isNatural()) throw Error("Euclidean division requires integer degrees");
		let a = t.monomByDegree(void 0, n), o = t.degree(n), s, c = this.degree(n).value - o.value + 1;
		for (; i.degree(n).isGeq(o) && c > 0 && (c--, s = i.monomByDegree(void 0, n).clone().divide(a), !(!s.isZero() && (r.add(s), i.subtract(t.clone().multiply(s)).reduce(), s.degree(n).isZero()))););
		return r.reduce(), i.reduce(), {
			quotient: r,
			reminder: i
		};
	}
	evaluate(e, t) {
		if (t) return this.#c(e);
		let n = new p().zero();
		return this.#n.forEach((r) => {
			n.add(r.evaluate(e, t));
		}), n;
	}
	factorize(t) {
		if (this.#t = [], this.monoms.length === 1) return [this.clone()];
		let n = this.clone().reorder(), r = n.commonMonom();
		n.monomByDegree().coefficient.isStrictlyNegative() && r.opposite(), r.isOne() || (this.#t.push(new e(r)), n = n.euclidean(this.#t[0]).quotient);
		let i = new b(n).solve();
		if (i.length === 0) return this.#t.length === 0 ? this.#t = [this.clone()] : this.#t.push(n), this.#t;
		if (i.forEach((t) => {
			if (t.exact && t.root.isZero()) for (let n = 0; n < t.count; n++) t.fraction.isRational() ? this.#t.push(new e().fromCoefficients(t.fraction.denominator, -t.fraction.numerator)) : this.#t.push(new e().fromCoefficients(1, t.fraction.clone().opposite()));
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
		let t = this.#e ?? "x";
		return e.reverse().forEach((e, n) => {
			let r = new E();
			r.coefficient = new p(e), r.setLetter(t, n), this.#n.push(r);
		}), this.#u(), this.reorder();
	}
	gcdDenominator() {
		return d.gcd(...this.getDenominators());
	}
	gcdNumerator() {
		return d.gcd(...this.getNumerators());
	}
	getCoefficients() {
		if (!this.degree().isNatural()) throw Error("getCoefficients() requires a polynomial with integer degrees");
		let e = this.clone().reorder(), t = this.degree().value + 1, n = Array.from({ length: t }, () => new p(0));
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
	getZeroes() {
		return this.degree().isZero() ? [] : (this.roots = new b(this.clone()).solve(), this.roots);
	}
	hasVariable(e) {
		return this.variables.includes(e);
	}
	integrate(e, t, n = "x") {
		let r = this.primitive(n), i = {}, a = {};
		return i[n] = new p(e), a[n] = new p(t), r.evaluate(a).subtract(r.evaluate(i));
	}
	inverse() {}
	isDeveloped(t) {
		let n, r = t.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
		if (r.includes("(") || r.includes(")")) return !1;
		try {
			n = new e(t);
		} catch {
			return !1;
		}
		return !!this.isEqual(n);
	}
	isDividableBy(e) {
		if (e.degree().isOne()) {
			let t = e.getZeroes()[0];
			return t.exact ? this.evaluate(t.fraction).isZero() : !1;
		}
		{
			let { reminder: t } = this.euclidean(e);
			return t.isZero();
		}
	}
	isEqual(e) {
		return this.#a(e, "=");
	}
	get isMultiVariable() {
		return this.#n.some((e) => e.variables.length > 1);
	}
	isOne() {
		return this.#n.length === 1 && this.#n[0].coefficient.isOne() && this.degree().isZero();
	}
	isOppositeAt(e) {
		return this.#a(e.clone().opposite(), "=");
	}
	isSameAs(e) {
		return this.#a(e, "same");
	}
	isZero() {
		return this.#n.length === 1 && this.#n[0].coefficient.isZero() || this.#n.length === 0;
	}
	lcmDenominator() {
		return d.lcm(...this.getDenominators());
	}
	lcmNumerator() {
		return d.lcm(...this.getNumerators());
	}
	get length() {
		return this.#n.length;
	}
	limitTo(e, t) {
		let n = new p(e);
		if (n.isFinite()) {
			let e = t ?? this.variables[0] ?? "x";
			return this.evaluate({ [e]: n });
		}
		let r = this.monomByDegree(void 0, t), i = r.coefficient.sign(), a = r.degree(t);
		return a.isZero() ? r.coefficient.clone() : a.isStrictlyPositive() ? n.isPositive() ? i === 1 ? new p().infinite() : new p().infinite().opposite() : (a.value % 2 == 0 ? i : -i) === 1 ? new p().infinite() : new p().infinite().opposite() : new p().zero();
	}
	monomByDegree(e, t) {
		if (e === void 0) return this.monomByDegree(this.degree(t), t);
		let n = this.clone().reduce();
		for (let r of n.#n) if (r.degree(t).isEqual(e)) return r.clone();
		return new E().zero();
	}
	monomByLetter(e) {
		let t = this.clone().reduce();
		for (let n of t.#n) if (n.hasVariable(e)) return n.clone();
		return new E().zero();
	}
	get monoms() {
		return this.#n;
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
	multiply(t) {
		if (t instanceof e) return this.#m(t);
		if (t instanceof p) return this.#d(t);
		if (t instanceof E) return this.#p(t);
		if (Number.isSafeInteger(t) && typeof t == "number") return this.#f(t);
		if (typeof t == "string") try {
			let e = new p(t);
			return this.#d(e);
		} catch {
			throw Error("Cannot multiply by this value.");
		}
		throw Error(`Cannot multiply by this value: ${t}`);
	}
	get numberOfVars() {
		return this.variables.length;
	}
	one() {
		return this.#n = [], this.#n.push(new E().one()), this.#u(), this;
	}
	opposite() {
		return this.#n = this.#n.map((e) => e.opposite()), this.#u(), this;
	}
	get plotFunction() {
		return this.#l("tex", !1, !1, !0);
	}
	pow(e) {
		return D(this, e).reduce();
	}
	primitive(t) {
		let n = new e();
		for (let e of this.#n) n.add(e.primitive(t));
		return n;
	}
	reduce() {
		let e = 0;
		for (; e < this.#n.length;) {
			for (let t = e + 1; t < this.#n.length; t++) this.#n[e].isSameAs(this.#n[t]) && (this.#n[e].add(this.#n[t]), this.#n.splice(t, 1), this.#n[e].isZero() && (this.#n[e] = new E().zero()), t--);
			e++;
		}
		this.#n = this.#n.filter((e) => !e.coefficient.isZero());
		for (let e of this.#n) e.coefficient.reduce();
		return this.length === 0 ? this.zero() : (this.#u(), this.reorder());
	}
	reorder(e = "x", t = !1) {
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
		let r, i = new e().zero();
		for (let e of this.monoms) if (!e.hasVariable(t) || e.literal[t].isZero()) i.add(e.clone());
		else {
			if (r = e.literal[t].clone(), e.removeVariable(t), r.isStrictlyNegative()) throw Error(`Cannot replace variable "${t}" with negative power in a Polynom`);
			i.add(n.clone().pow(r.numerator).multiply(e));
		}
		return this.#n = i.reduce().monoms, this.#u(), this;
	}
	root() {
		throw Error("Cannot take the root from a polynom");
	}
	get roots() {
		return this.#i ? this.#r : this.getZeroes();
	}
	set roots(e) {
		this.#i = !0, this.#r = e;
	}
	setVariable(e) {
		return this.#e = e, this;
	}
	sqrt() {
		throw Error("Cannot take the square root from a polynom");
	}
	subtract(...t) {
		for (let n of t) n instanceof e ? this.add(n.clone().opposite()) : n instanceof E ? this.#n.push(n.clone().opposite()) : this.#n.push(new E(n).opposite());
		return this.reduce();
	}
	tableOfSigns() {
		let e = this.roots, t = Array(2 * e.length + 1).fill("").map((e, t) => t % 2 == 0 ? "" : "z");
		if (t.length === 1) {
			let [e] = this.getCoefficients().map((e) => e.value);
			t = g(t, "", e > 0 ? "+" : "-");
		} else if (this.degree().isOne()) {
			let [e] = this.getCoefficients().map((e) => e.value);
			t[0] = e > 0 ? "-" : "+", t[1] = "z", t[2] = e > 0 ? "+" : "-";
		} else [e[0].value - 1, ...e.map((t, n) => n === e.length - 1 ? e[n].value + 1 : (e[n].value + e[n + 1].value) / 2)].forEach((e, n) => {
			let r = this.evaluate({ [this.variables[0] ?? "x"]: e }, !0);
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
		return this.#n = [], this.#n.push(new E().zero()), this.#u(), this;
	}
	get zeroes() {
		return this.getZeroes();
	}
	#a(e, t) {
		t ??= "=";
		let n = this.clone().reduce().reorder(), r = e.clone().reduce().reorder();
		switch (t) {
			case "=": return n.length !== r.length || !n.degree().isEqual(r.degree()) ? !1 : n.monoms.every((e, t) => e.isEqual(r.monoms[t]));
			case "same": return n.length !== r.length || !n.degree().isEqual(r.degree()) ? !1 : n.monoms.every((e, t) => e.isSameAs(r.monoms[t]));
			default: return !1;
		}
	}
	#o(e) {
		for (let t of this.#n) t.coefficient.divide(e);
		return this.#u(), this;
	}
	#s(e) {
		let t = new p(e);
		for (let e of this.#n) e.coefficient.divide(t);
		return this.#u(), this;
	}
	#c(e) {
		let t = 0;
		return this.#n.forEach((n) => {
			t += n.evaluate(e, !0);
		}), t;
	}
	#l(e, t, n, r) {
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
		for (let t of this.#n) t.coefficient.multiply(e);
		return this.reduce();
	}
	#f(e) {
		return this.#d(new p(e));
	}
	#p(e) {
		for (let t of this.#n) t.multiply(e);
		return this.reduce();
	}
	#m(e) {
		let t = [];
		for (let n of this.#n) for (let r of e.monoms) t.push(E.xMultiply(n, r));
		return this.#n = t, this.reduce();
	}
	#h(e, ...t) {
		if (t.length === 0) {
			if (e !== "" && !isNaN(Number(e))) {
				this.empty();
				let t = new E(Number(e));
				return this.add(t), this;
			}
			return this.#_(e);
		}
		if (/^[a-z]+$/.test(e)) {
			this.empty();
			let n = t.map((e) => new p(e));
			if (e.length > 1) {
				let t = e.split("");
				if (n.length > t.length + 1) throw Error(`Too many values: ${t.length} letters but ${n.length} values provided`);
				let r = 0;
				for (let e of n) {
					let n = new E();
					n.coefficient = e.clone(), n.literalStr = t[r] ?? "", this.add(n), r++;
				}
			} else {
				let t = n.length - 1;
				for (let r of n) {
					let n = new E();
					n.coefficient = r.clone(), n.literalStr = `${e}^${t}`, this.add(n), t--;
				}
			}
			return this;
		}
		return this.zero();
	}
	#g(t, n) {
		switch (n.tokenType) {
			case S.COEFFICIENT:
				t.push(new e(n.token));
				break;
			case S.VARIABLE:
				t.push(new e().add(new E(n.token)));
				break;
			case S.CONSTANT: throw Error("Unsupported CONSTANT token in Polynom parser");
			case S.OPERATION:
				if (t.length >= 2) {
					let e = t.pop(), r = t.pop();
					if (r === void 0 || e === void 0) throw Error("Unexpected undefined operand in Polynom parser stack");
					if (n.token === "+") t.push(r.add(e));
					else if (n.token === "-") t.push(r.subtract(e));
					else if (n.token === "*") t.push(r.multiply(e));
					else if (n.token === "/") {
						if (e.degree().isStrictlyPositive()) throw Error("Cannot divide a Polynom by another Polynom of degree > 0");
						t.push(r.divide(e.monoms[0].coefficient));
					} else if (n.token === "^") {
						if (e.degree().isStrictlyPositive()) throw Error("Cannot elevate a polynom with another polynom !");
						if (e.monoms[0].coefficient.isRelative()) t.push(r.pow(e.monoms[0].coefficient.value));
						else if (r.monoms.length === 1 && r.monoms[0].coefficient.isOne()) {
							for (let t in r.monoms[0].literal) r.monoms[0].literal[t].multiply(e.monoms[0].coefficient);
							t.push(r);
						} else throw Error("Cannot raise a multi-monom Polynom to a fractional power");
					}
				} else if (n.token === "-") {
					let e = t.pop();
					e && t.push(e.opposite());
				} else throw Error("Error parsing the polynom");
				break;
			case S.MONOM: throw Error("Unexpected MONOM token in polynom parser");
			case S.FUNCTION: throw Error(`Unsupported function token "${n.token}" in polynom parser`);
		}
	}
	#_(e) {
		let t = new w().parse(e).rpn;
		this.zero();
		let n = [];
		for (let e of t) this.#g(n, e);
		return n.length === 1 && this.add(n[0]), this.reorder();
	}
}, k = class e {
	#e;
	#t;
	#n;
	constructor(t, n, r) {
		if (this.#e = new O().zero(), this.#t = new O().zero(), this.#n = "=", t !== void 0 && n === void 0) {
			if (t instanceof e) return t.clone();
			typeof t == "string" && this.parse(t);
		} else t !== void 0 && n !== void 0 && (this.left = new O(t), this.right = new O(n));
		return r !== void 0 && (this.sign = r), this;
	}
	parse = (e) => {
		let t = this.#r(e);
		if (t === !1) throw Error("The equation is not valid (no sign found)");
		let n = e.split(t);
		return this.create(new O(n[0]), new O(n[1]), this.#i(t));
	};
	clone = () => new e(this.#e.clone(), this.#t.clone(), this.#n);
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
	add(t) {
		if (t instanceof e) return this.#e.add(t.left), this.#t.add(t.right), this;
		if (typeof t == "string" && !e.isEquationString(t)) return this.add(new e(t));
		let n = new O(t);
		return this.#e.add(n), this.#t.add(n), this;
	}
	create = (e, t, n) => (this.#e = e, this.#t = t, this.#n = this.#i(n ?? "="), this);
	degree = (e) => p.max(this.#e.degree(e), this.#t.degree(e));
	divide = (e) => {
		let t = new p(e);
		return t.isZero() ? this : this.multiply(t.inverse());
	};
	evaluate(e, t) {
		let n = this.#e.evaluate(e, t), r = this.#t.evaluate(e, t);
		return t ? n === r : n.isEqual(r);
	}
	hasVariable = (e) => this.variables.includes(e);
	isEqual(t) {
		let n = new e(t);
		return n.left.isEqual(this.#e) && n.right.isEqual(this.#t);
	}
	isEqualTo = (e) => {
		let t = e.clone().moveLeft().left, n = this.clone().moveLeft().left;
		return t.isEqual(n) || t.isOppositeAt(n);
	};
	isLinearTo = (e) => {
		let t = e.clone().moveLeft().simplify().left, n = this.clone().moveLeft().simplify().left;
		return t.isEqual(n) || t.isOppositeAt(n);
	};
	isMultiVariable = () => this.#e.isMultiVariable || this.#t.isMultiVariable;
	isolate = (e) => {
		if (!this.degree(e).isOne() || this.isMultiVariable()) return !1;
		let t;
		this.#e.subtract(this.#t), this.#t.zero();
		let n = [...this.#e.monoms];
		for (let r of n) r.hasVariable(e) || (t = r.clone(), this.#e.subtract(t), this.#t.subtract(t));
		if (this.#e.length !== 1) return !1;
		let r = this.#e.monoms[0].coefficient.clone();
		return this.#e.divide(r), this.#t.divide(r), this;
	};
	get left() {
		return this.#e;
	}
	set left(e) {
		this.#e = e;
	}
	letters = () => [.../* @__PURE__ */ new Set([...this.#e.variables, ...this.#t.variables])];
	moveLeft = () => (this.#e.subtract(this.#t), this.#t.zero(), this);
	multiply = (e) => {
		let t = new p(e);
		return this.#e.multiply(t), this.#t.multiply(t), this.#n !== "=" && t.sign() === -1 && this.#a(), this;
	};
	get numberOfVars() {
		return this.variables.length;
	}
	opposite = () => (this.#e = this.#e.opposite(), this.#t = this.#t.opposite(), this);
	pow(e) {
		return this.#e.pow(e), this.#t.pow(e), this;
	}
	reduce() {
		return this.moveLeft(), this.#e.reduce(), this.simplify(), this.#e.monoms[0].coefficient.isNegative() && this.multiply(-1), this;
	}
	reorder = (e) => (this.#e.subtract(this.#t), this.#t.zero(), this.#e.reorder(), e ? this : (this.#e.monoms.filter((e) => e.degree().isZero()).forEach((e) => {
		let t = e.clone();
		this.#e.subtract(t), this.#t.subtract(t);
	}), this.#e.reorder(), this.#t.reorder(), this));
	replaceBy = (e, t) => (this.#e.replaceBy(e, t), this.#t.replaceBy(e, t), this);
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
		this.#n = this.#i(e);
	}
	get signAsTex() {
		return this.#n === ">=" ? "\\geq" : this.#n === "<=" ? "\\leq" : this.#n;
	}
	simplify = () => (this.multiply(d.lcm(...this.#e.getDenominators(), ...this.#t.getDenominators())), this.divide(d.gcd(...this.#e.getNumerators(), ...this.#t.getNumerators())), this);
	solve = () => new b(this.clone()).solve();
	split() {
		return [this.#e.clone(), this.#t.clone()];
	}
	subtract(t) {
		if (t instanceof e) return this.#e.subtract(t.left), this.#t.subtract(t.right), this;
		if (typeof t == "string" && !e.isEquationString(t)) return this.subtract(new e(t));
		let n = new O(t);
		return this.#e.subtract(n), this.#t.subtract(n), this;
	}
	test = (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e));
	get variables() {
		return [...new Set(this.#t.variables.concat(this.#e.variables))];
	}
	#r = (e) => {
		if (e.includes("geq")) return e.includes("\\geq") ? "\\geq" : "geq";
		if (e.includes("leq")) return e.includes("\\leq") ? "\\leq" : "leq";
		if (e.includes(">=")) return ">=";
		if (e.includes("=>")) return "=>";
		if (e.includes(">")) return ">";
		if (e.includes("<=")) return "<=";
		if (e.includes("=<")) return "=<";
		if (e.includes("<")) return "<";
		if (e.includes("=")) return "=";
		throw Error("The equation is not valid (no sign found)");
	};
	#i = (e) => e === void 0 ? "=" : e.includes("geq") || e.includes(">=") || e.includes("=>") ? ">=" : e.includes(">") ? ">" : e.includes("leq") || e.includes("<=") || e.includes("=<") ? "<=" : e.includes("<") ? "<" : "=";
	#a = () => this.#n === "=" ? this : this.#n.includes("<") ? (this.#n.replace("<", ">"), this) : (this.#n.includes(">") && this.#n.replace(">", "<"), this);
}, A = class e {
	#e;
	#t;
	#n;
	#r = !1;
	constructor(t, n) {
		return t instanceof e ? (this.#t = t.polynom.clone(), this.#n = t.power.clone(), n !== void 0 && this.#n.multiply(new p(n))) : t === void 0 ? (this.#t = new O(), this.#n = new p(1)) : (this.#t = new O(t), this.#n = new p(n ?? 1)), this.#e = 1, this;
	}
	parse() {
		throw Error("Method not implemented.");
	}
	clone() {
		return new e(this);
	}
	get tex() {
		let e = this.power.numerator, t = this.power.denominator, n, r;
		return this.#e === 0 && t > 1 ? (n = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, r = e === 1 ? "" : `^{ ${e} }`) : (n = this.#r && this.power.isOne() ? this.polynom.tex : m(this.polynom.tex), r = t === 1 && e === 1 ? "" : `^{ ${this.power.tex} }`), n = `${n}${r}`, this.#e === 0 && e < 0 && (n = `\\frac{ 1 }{ ${n} }`), n;
	}
	get display() {
		let e = this.power.numerator, t = this.power.denominator, n, r;
		return this.#e === 0 && t > 1 ? (n = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, r = e === 1 ? "" : `^(${e})`) : (n = this.#r && this.power.isOne() ? this.polynom.display : m(this.polynom.display, !1), r = t === 1 && e === 1 ? "" : `^(${this.power.display})`), n = `${n}${r}`, this.#e === 0 && e < 0 && (n = `1/(${n})`), n;
	}
	add() {
		throw Error("Adding two factors is not possible");
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
		throw Error("The power must be a natural number");
	}
	divide(t) {
		if (t instanceof e && this.isSameAs(t)) return this.power.subtract(t.power), this;
		let n = new O(t);
		if (this.isSameAs(n)) return this.power.subtract(1), this;
		throw Error("The two factors must be the same");
	}
	evaluate(e, t) {
		return t ? this.polynom.evaluate(e, !0) ** this.power.value : this.polynom.evaluate(e).pow(this.power);
	}
	fromPolynom(e) {
		return this.#t = new O(e), this.#n = new p(1), this;
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
		return n = t instanceof e ? t.polynom : t instanceof O ? t : new O(t), this.polynom.isEqual(n);
	}
	isZero() {
		return this.polynom.isZero();
	}
	multiply(t) {
		let n = new e(t);
		if (this.polynom.monoms.length === 1 && this.power.isOne() && n.polynom.monoms.length === 1 && this.power.isOne()) return this.polynom.multiply(n.polynom), this;
		if (t instanceof e && this.isSameAs(t)) return this.power.add(t.power), this;
		let r = new O(t);
		if (this.isSameAs(r)) return this.power.add(1), this;
		throw Error("The two factors must be the same");
	}
	one() {
		return this.#t.one(), this.#n.one(), this;
	}
	opposite() {
		throw Error("Method not implemented.");
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
		this.#n = new p(e);
	}
	primitive() {
		throw Error("Method not implemented.");
	}
	reduce() {
		throw Error("Method not implemented.");
	}
	root(e) {
		return this.power.divide(e), this;
	}
	sqrt() {
		return this.root(2);
	}
	subtract() {
		throw Error("Subtracting two factors is not possible");
	}
	tableOfSigns() {
		let e = this.power.clone().reduce(), t = this.polynom.tableOfSigns();
		return e.isStrictlyNegative() && (t.signs = g(t.signs, "z", "d")), e.denominator % 2 == 0 ? t.signs = g(t.signs, "-", "h") : e.numerator % 2 == 0 && (t.signs = g(t.signs, "-", "+")), {
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
		let t = _(e, "+");
		if (t[0] === "" && t.shift(), t.length > 1) return !1;
		let n = _(e, "-");
		return n[0] === "" && n.shift(), !(n.length > 1);
	}
	static factorsFromString(t, n = !0) {
		if (!e.checkParseAsFactors(t)) return [new e(t, n ? 1 : -1)];
		let r = n ? 1 : -1, i = [];
		for (let n of t.matchAll(/\(([^)]+)\)(?:\^(-?[0-9]+(?:\/[0-9]+)?|\(-?[0-9]+(?:\/[0-9]+)?\)))?|([^(]+)/g)) if (n[1] !== void 0) {
			let t = (n[2] ?? "1").replace(/[()]/g, "");
			i.push(new e(new O(n[1]), new p(t).multiply(r)));
		} else n[3]?.trim() && i.push(new e(new O(n[3].trim()), new p(r)));
		return i;
	}
}, j = /* @__PURE__ */ function(e) {
	return e[e.ROOT = 0] = "ROOT", e[e.POWER = 1] = "POWER", e;
}({}), se = class e {
	#e;
	#t;
	constructor(...e) {
		return this.#e = [], this.#t = [], e.length > 0 && this.parse(...e), this;
	}
	parse = (...e) => (this.#e = e.map((e) => new k(e)), this.#n(), this);
	clone = () => new e().parse(...this.#e.map((e) => e.clone()));
	get tex() {
		let e = this.clone().reorder();
		return this.buildTex(e.equations);
	}
	get display() {
		return this.tex + "as display";
	}
	static fromMatrix(t, n = "xyz") {
		let r = t[0].length;
		if (t.some((e) => e.length !== r)) throw Error("All rows must have the same number of columns");
		let i = n.split("").splice(0, r - 1);
		return new e(...t.map((e) => new k(new O(i.join(""), ...e), 0)));
	}
	static solutionAsDisplay(e) {
		return `(${e.map((e) => e.display).join(";")})`;
	}
	static solutionAsTex(e) {
		return `\\left( ${e.map((e) => e.tex).join(" ; ")} \\right)`;
	}
	add(t, n) {
		if (t instanceof e) {
			let e = t.equations.length;
			if (e !== this.#e.length) throw Error("The number of equations must be the same");
			for (let n = 0; n < e; n++) this.#e[n].add(t.equations[n]);
		} else {
			if (n === void 0 || n < 0 || n >= this.#e.length) throw Error("Index out of range");
			let e = new k(t);
			this.#e[n].add(e);
		}
		return this;
	}
	buildTex = (e, t) => {
		let n, r, i = [], a = [];
		for (let t of e) i = i.concat(t.letters());
		i = [...new Set(i)], i.sort();
		for (let o = 0; o < e.length; o++) {
			let s = e[o];
			n = [];
			for (let e of i) r = s.left.monomByLetter(e), n.length === 0 ? n.push(r.isZero() ? "" : r.tex) : n.push(r.isZero() ? "" : (r.coefficient.sign() === 1 ? "+" : "") + r.tex);
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
		return p.max(...this.#e.map((t) => t.degree(e)));
	}
	get equations() {
		return this.#e;
	}
	set equations(e) {
		this.#e = e, this.#n();
	}
	evaluate(e, t) {
		throw Error("Method not implemented.");
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
			if (e.length !== this.#e.length) throw Error("The number of values must be the same as the number of equations");
			for (let t = 0; t < e.length; t++) this.#e[t].multiply(e[t]);
			return this;
		}
		if (t === void 0 || t < 0 || t >= this.#e.length) throw Error("Index out of range");
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
			let r = n[t][t].clone();
			if (r.isZero()) {
				let e = n.find((e, n) => n > t && !e[t].isZero());
				if (e) n[t].forEach((t, n) => t.add(e[n])), r = n[t][t].clone();
				else throw Error("Unsolvable...");
			}
			n[t] = n[t].map((e) => e.divide(r));
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
		let t = [], n = this.equations.map((t) => t.left.monomByLetter(e).coefficient.value);
		return n.forEach((e, r) => {
			for (let i = r + 1; i < n.length; i++) {
				let a = d.lcm(e, n[i]), o = e < 0 ? -1 : 1;
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
	subtract(t, n) {
		if (t instanceof e) {
			let e = t.equations.length;
			if (e !== this.#e.length) throw Error("The number of equations must be the same");
			for (let n = 0; n < e; n++) this.#e[n].subtract(t.equations[n]);
		} else {
			if (n === void 0 || n < 0 || n >= this.#e.length) throw Error("Index out of range");
			let e = new k(t);
			this.#e[n].subtract(e);
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
				let t = i.left.monomByLetter(e);
				r.push(t.coefficient);
			}
			t.push(i.right.monoms[0].coefficient), e.push(r);
		}
		return [e, t];
	};
	#i(e) {
		let t = [];
		return e ? (e.forEach((e, n) => {
			let r = y.fromFraction(e[e.length - 1]);
			r.variable = this.variables[n], t.push(r);
		}), t) : (this.variables.forEach((e) => {
			let n = y.fromFraction(Infinity);
			n.variable = e, t.push(n);
		}), t);
	}
}, ce = class {
	#e;
	constructor(e) {
		return this.#e = [], e !== void 0 && this.parse(e), this;
	}
	parse = (e) => (this.#e = new w(C.SET).parse(e).rpn, this);
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
}, M = class e {
	#e = j.POWER;
	#t = [];
	constructor(...e) {
		return this.parse(...e), this;
	}
	parse(...t) {
		return this.#t = [], t.length === 0 || t.forEach((t) => {
			if (typeof t == "string") return this.fromString(t);
			t instanceof e ? this.#t.push(...t.factors.map((e) => e.clone())) : this.#t.push(new A(t));
		}), this;
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
		let r = N(t), i = N(n), a = Object.keys(r).filter((e) => Object.hasOwn(i, e)).map((e) => {
			let t = r[e].reduce((e, t) => e.add(t.power), new p("0")), n = i[e].reduce((e, t) => e.add(t.power), new p("0"));
			return new A(e, p.min(t, n));
		});
		return new e(...a);
	}
	static #r(t, n) {
		let r = N(t), i = N(n), a = [.../* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(i)])].map((e) => {
			let t = Object.hasOwn(r, e) ? r[e].reduce((e, t) => e.add(t.power), new p("0")) : new p(0), n = Object.hasOwn(i, e) ? i[e].reduce((e, t) => e.add(t.power), new p("0")) : new p(0);
			return new A(e, p.max(t, n));
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
		let a = e.gcd(...n), o = new O(0).add(...n.map((e) => e.divide(a).reduce().develop().factors[0].polynom)).reduce();
		return this.#t = [...a.factors, new A(o)], i && this.divide(i), this.#t = this.#t.filter((e) => !e.power.isZero()), this;
	}
	get asPower() {
		return this.#e = j.POWER, this;
	}
	get asRoot() {
		return this.#e = j.ROOT, this;
	}
	degree(e) {
		return this.#t.reduce((t, n) => t.add(n.degree(e)), new p("0"));
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
		let t = new O("1"), n = new O("1");
		return this.numerator.factors.forEach((e) => {
			t.multiply(e.develop());
		}), this.denominator.factors.forEach((e) => {
			n.multiply(e.develop());
		}), new e().fromPolynom(t, n);
	}
	divide(e) {
		return this.#t = this.#t.concat(e.clone().factors.map((e) => e.inverse())), this;
	}
	evaluate(e, t) {
		return t ? this.#t.reduce((n, r) => n * r.evaluate(e, t), 1) : this.#t.reduce((t, n) => t.multiply(n.evaluate(e)), new p("1"));
	}
	factorize(t) {
		let n = [];
		this.#t.forEach((e) => {
			let r = e.polynom.factorize(t);
			if (r.length > 1) {
				let t = e.power.clone();
				n.push(...r.map((e) => new A(e, t)));
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
		if (this.#t = [new A(new O(e))], t) {
			let e = new O(t);
			if (e.isOne()) return this;
			if (e.isZero()) throw Error("Cannot divide by zero");
			this.#t.push(new A(e, -1));
		}
		return this;
	}
	fromString(e) {
		this.#t = [];
		let [t, ...n] = _(e, "/");
		if (t === "") throw Error("Parsing a PolyFactor from a string requires a numerator");
		if (n.length > 1) throw Error("Parsing a PolyFactor from a string only allows max one signe \"/\"");
		return this.#t = n.length === 0 ? A.factorsFromString(h(t), !0) : [...A.factorsFromString(h(t), !0), ...A.factorsFromString(h(n[0]), !1)], this;
	}
	getRoots() {
		return [];
	}
	getZeroes() {
		let e = [].concat(...this.#t.map((e) => e.polynom.getZeroes()));
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
		return this.#t = [new A("1", "1")], this;
	}
	opposite() {
		let e = this.#t.findIndex((e) => e.display === "(-1)");
		return e >= 0 ? this.#t.splice(e, 1) : this.#t.push(new A("-1", "1")), this;
	}
	pow(e) {
		return this.#t = this.#t.map((t) => t.pow(e)), this;
	}
	primitive() {
		throw Error("Method not implemented.");
	}
	reduce() {
		let e = N(this);
		this.#t = Object.values(e).map((e) => {
			let t = e[0].polynom;
			return new A(t, e.reduce((e, t) => e.add(t.power), new p("0")).reduce());
		}).filter((e) => !e.power.isZero());
		let t = new A(1), n = new A(1), r = this.#t.filter((e) => e.polynom.monoms.length === 1 && e.power.isRelative());
		return r.length > 0 && (r.forEach((e) => {
			e.power.isPositive() ? t.multiply(new A(e.polynom.clone().pow(e.power.value))) : n.multiply(new A(e.polynom.clone().pow(-e.power.value)));
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
			factor: new A(e),
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
		return this.#t = [new A("0", "1")], this;
	}
	#i() {
		let e, t = [];
		return this.#e === j.ROOT ? (e = this.numerator.factors, t = this.denominator.factors) : e = this.#t, e.length === 0 && (e = [new A("1")]), {
			num: e,
			den: t
		};
	}
};
function N(e) {
	let t = new p().one(), n = new p().one(), r = e.factors.reduce((e, r) => {
		if (r.polynom.degree().isZero() && r.power.isRelative()) {
			let i = r.polynom.monoms[0].coefficient.pow(r.power.clone().abs());
			return r.power.isPositive() ? t.multiply(i) : n.multiply(i), e;
		}
		let i = r.polynom.display;
		return Object.hasOwn(e, i) ? e[i].push(r) : e[i] = [r], e;
	}, {}), { numerator: i, denominator: a } = t.divide(n).reduce();
	return i !== 1 && (r[i.toString()] = [new A(i, 1)]), a !== 1 && (r[a.toString()] = [new A(a, -1)]), r;
}
//#endregion
//#region src/algebra/matrix.ts
var le = class e {
	#e = null;
	#t = 0;
	#n = [];
	constructor(e, t) {
		return e && (t ??= e, this.fromDimensions(e, t)), this;
	}
	parse(e) {
		return this.fromValues(e);
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
		if (!this.canBeAdded(e)) throw Error("Cannot add a matrix with different dimensions.");
		return this.forEach((t, n, r) => {
			t.add(e.values[n][r]);
		}), this;
	}
	aij(e, t) {
		return e < 0 || e > this.dimension.rows || t < 0 || t > this.dimension.cols ? null : this.#n[e][t];
	}
	get bmatrix() {
		return this.#t = 1, this;
	}
	get Bmatrix() {
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
		return t ??= "k", this.clone().subtract(new e(this.dimension.rows).one().multiply(new O(t))).determinant();
	}
	cofactor(e, t) {
		let n = this.clone();
		return n.values.splice(e, 1), n.values.forEach((e) => {
			e.splice(t, 1);
		}), n.determinant().multiply((-1) ** (e + t));
	}
	get cols() {
		let e = Array.from({ length: this.dimension.cols }, () => Array.from({ length: this.dimension.rows }, () => new O()));
		return this.forEach((t, n, r) => {
			e[r][n] = t;
		}), e;
	}
	determinant() {
		if (!this.isSquare()) throw Error("Matrix is not square");
		let e = new O();
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
		return this.#n = Array.from({ length: e }, () => Array.from({ length: t }, () => new O())), this;
	}
	fromString(e) {
		if (e.startsWith("((") && e.endsWith("))")) return this.fromString(e.substring(1, e.length - 1));
		let t = e.split("),(");
		return this.#n = t.map((e, n) => n === 0 ? e.substring(1).split(",") : n === t.length - 1 ? e.substring(0, e.length - 1).split(",") : e.split(",")).map((e) => e.map((e) => new O(e))), this;
	}
	fromValues(e) {
		this.#n = [];
		let t = e[0].length;
		if (e.some((e) => e.length !== t)) throw Error("Each line must be the same length");
		return e.forEach((e) => {
			let t = [];
			e.forEach((e) => {
				t.push(new O(e));
			}), this.#n.push(t);
		}), this;
	}
	fromVectors(...e) {
		this.#n = [];
		let t = e[0].dimension;
		if (e.some((e) => e.dimension !== t)) throw Error("Each vectors must be the same dimension");
		return this.fromDimensions(e[0].dimension, e.length), e.forEach((e, t) => {
			e.array.forEach((e, n) => {
				this.#n[n][t] = new O(e);
			});
		}), this;
	}
	inverse() {
		if (!this.canBeInverted()) throw Error("The matrix cannot be inverted.");
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
			if (!this.canBeMultiplied(t)) throw Error("Cannot multiply a matrix with incompatibles dimensions");
			let n = new e(this.dimension.rows, t.dimension.cols);
			return n.forEach((e, r, i) => {
				let a = this.rows[r], o = t.cols[i], s = new O();
				a.forEach((e, t) => {
					s.add(e.clone().multiply(o[t]));
				}), n.setValue(r, i, s);
			}), this.#n = n.values, this;
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
	get pmatrix() {
		return this.#t = 0, this;
	}
	get vmatrix() {
		return this.#t = 3, this;
	}
	get Vmatrix() {
		return this.#t = 4, this;
	}
	pow(e) {
		return D(this, e);
	}
	reduce() {
		throw Error("Not yet implemented");
	}
	get rows() {
		return this.#n;
	}
	setValue(e, t, n) {
		let { rows: r, cols: i } = this.dimension;
		if (e < 0 || e >= r || t < 0 || t >= i) throw Error(`${e}x${t} is out of range (${r}x${i})`);
		return this.#n[e][t] = new O(n), this;
	}
	subtract(e) {
		if (!this.canBeAdded(e)) throw Error("Cannot subtract a matrix with different dimensions.");
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
function ue(e, t) {
	return e.dimension === t.dimension && e.array.every((e, n) => t.array[n].isEqual(e));
}
function de(e, t) {
	if (e.dimension !== t.dimension) return !1;
	let n = t.array[0].value / e.array[0].value;
	return e.array.every((e, r) => t.array[r].value === e.value * n);
}
function P(e, t) {
	return e.dimension === t.dimension ? e.array.reduce((e, n, r) => e.add(n.clone().multiply(t.array[r])), new p(0)) : new p().invalid();
}
function fe(...e) {
	if (e.some((t) => t.dimension !== e[0].dimension)) throw Error("All vectors must have the same dimension");
	if (e[0].dimension !== e.length) throw Error(`The determinant of dimension ${e[0].dimension} must have the same number of vectors (${e.length} given)`);
	return e[0].dimension === 2 ? e[0].array[0].clone().multiply(e[1].array[1]).subtract(e[0].array[1].clone().multiply(e[1].array[0])) : e[0].array[0].clone().multiply(e[1].array[1].clone().multiply(e[2].array[2]).subtract(e[1].array[2].clone().multiply(e[2].array[1]))).subtract(e[0].array[1].clone().multiply(e[1].array[0].clone().multiply(e[2].array[2]).subtract(e[1].array[2].clone().multiply(e[2].array[0])))).add(e[0].array[2].clone().multiply(e[1].array[0].clone().multiply(e[2].array[1]).subtract(e[1].array[1].clone().multiply(e[2].array[0]))));
}
//#endregion
//#region src/geometry/TupleN.ts
var F = class {
	#e = [];
	#t;
	constructor(...e) {
		this.#e = e.map((e) => new p(e));
	}
	copy() {
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
		return t.length < 2 || (this.#e = t.map((e) => new p(e))), this;
	}
	get onChange() {
		return this.#t;
	}
	set onChange(e) {
		this.#t = e;
	}
	setDimension(e = 2) {
		if (e < 2) throw Error("Dimension must be at least 2");
		if (e < this.dimension) this.#e = this.#e.slice(0, e);
		else if (e > this.dimension) for (let t = this.dimension; t < e; t++) this.#e.push(new p(0));
		return this;
	}
	get x() {
		return this.#e[0];
	}
	set x(e) {
		this.#e[0] = new p(e), this.#t?.();
	}
	get y() {
		return this.#e[1];
	}
	set y(e) {
		this.#e[1] = new p(e), this.#t?.();
	}
	get z() {
		if (this.dimension < 3) throw Error("Vector is not 3D");
		return this.#e[2];
	}
	set z(e) {
		if (this.dimension < 3) throw Error("Vector is not 3D");
		this.#e[2] = new p(e), this.#t?.();
	}
	zero = () => (this.#e.forEach((e) => e.zero()), this.#t?.(), this);
}, I = class e extends F {
	constructor(...e) {
		super(), e.length > 0 && this.parse(...e);
	}
	parse(...t) {
		if (t.length === 1) {
			if (t[0] instanceof F) return this.array = t[0].copy(), this;
			if (typeof t[0] == "string") return this.fromString(t[0]), this;
		}
		if (t.length > 1) {
			if (t.some((t) => t instanceof e)) throw Error("Creating a point with  multiple argument requires an input fraction");
			let n = t.map((e) => new p(e));
			if (n.some((e) => e.isNaN())) throw Error("The given values are not a valid point string (a,b): ");
			this.array = n;
		}
		return this;
	}
	clone() {
		return new e(...this.copy());
	}
	get tex() {
		return `\\left(${this.array.map((e) => e.tex).join(";")}\\right)`;
	}
	get display() {
		return `(${this.array.map((e) => e.display).join(";")})`;
	}
	distanceTo(e) {
		if (this.dimension !== e.dimension) throw Error("The two points must have the same dimensions.");
		let t = this.array.map((t, n) => e.array[n].clone().subtract(t)).reduce((e, t) => e.add(t.clone().pow(2)), new p(0));
		return new v().from(2, t).reduce();
	}
	isEqual(e) {
		return this.x.value === e.x.value && this.y.value === e.y.value;
	}
	isEqualXY(t, n) {
		return this.isEqual(new e(t, n));
	}
	middleOf(e, t) {
		if (e.dimension !== t.dimension) throw Error("Vectors must be the same dimension");
		return this.array = [], e.array.forEach((e, n) => {
			this.array.push(e.clone().add(t.array[n]).divide(2));
		}), this;
	}
}, L = class e extends F {
	constructor(...e) {
		return super(), e.length > 0 && this.parse(...e), this;
	}
	parse(...e) {
		if (e.length === 0) throw Error("Invalid value");
		if (e.length === 1) {
			if (e[0] instanceof F) return this.array = e[0].copy(), this;
			if (typeof e[0] == "string") return this.fromString(e[0]);
			throw Error("Invalid value");
		}
		if (e.length === 2) {
			let [t, n] = e;
			if (t instanceof F && n instanceof F) {
				if (t.dimension !== n.dimension) throw Error("Vectors must have the same dimension");
				return this.array = n.array.map((e, n) => e.clone().subtract(t.array[n])), this;
			}
		}
		return this.array = e.map((e) => new p(e)), this;
	}
	clone() {
		return new e(...this.copy());
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
		if (this.dimension !== 3 || t.dimension !== 3) throw Error("Cross product can only be determined in 3D");
		return new e(this.y.clone().multiply(t.z).subtract(this.z.clone().multiply(t.y)), this.z.clone().multiply(t.x).subtract(this.x.clone().multiply(t.z)), this.x.clone().multiply(t.y).subtract(this.y.clone().multiply(t.x)));
	}
	divideByScalar = (e) => this.multiplyByScalar(new p(e).inverse());
	dot = (e) => P(this, e);
	fromString(e) {
		return e.startsWith("((") && e.endsWith("))") ? super.fromString(e.slice(1, -1)) : super.fromString(e);
	}
	isColinearTo = (e) => de(this, e);
	isEqual = (e) => ue(this, e);
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
		let t = new p(e);
		return this.array.forEach((e) => e.multiply(t)), this;
	};
	get norm() {
		return Math.sqrt(this.normSquare.value);
	}
	get normSquare() {
		return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new p(0));
	}
	normal = () => {
		if (this.dimension >= 3) throw Error("Normal vector can only be determined in 2D");
		let e = this.x.clone().opposite(), t = this.y.clone();
		return this.array[0] = t, this.array[1] = e, this;
	};
	one = () => (this.zero(), this.x.one(), this);
	opposite = () => (this.array.forEach((e) => e.opposite()), this);
	simplify = () => {
		let e = d.lcm(...this.array.map((e) => e.denominator)), t = d.gcd(...this.array.map((e) => e.numerator));
		return this.multiplyByScalar(new p(e, t)), this.x.isNegative() && this.opposite(), this;
	};
	subtract = (e) => this.add(e.clone().opposite());
	translate(...e) {
		return this.array.forEach((t, n) => t.add(e[n])), this;
	}
	unit = () => {
		let e = this.norm;
		return e === 0 ? this : this.divideByScalar(e);
	};
}, R = /* @__PURE__ */ function(e) {
	return e.None = "none", e.Parallel = "parallel", e.Perpendicular = "perpendicular", e.Tangent = "tangent", e;
}({}), z = /* @__PURE__ */ function(e) {
	return e.None = "none", e.Parallel = "parallel", e.Perpendicular = "perpendicular", e.Tangent = "tangent", e;
}({});
//#endregion
//#region src/randomization/rndHelpers.ts
function B(e = .5) {
	return Math.random() < e;
}
function V(e, t, n) {
	if (t === void 0) return e >= 0 ? V(0, e) : V(e, 0);
	if (e === t) return e;
	if (n === void 0) return Math.floor(Math.random() * (t - e + 1) + e);
	if (Math.abs(t - e) <= n.length) throw Error("The number of excluded values is too high.");
	let r = V(e, t);
	for (; n.includes(r);) r = V(e, t);
	return r;
}
function H(e, t) {
	return t === !1 ? B() ? V(1, e) : -V(1, e) : V(-e, e);
}
function pe(e, t) {
	let n = d.pythagoreanTripletsWithTarget(e).filter((e) => t === !0 || !e.includes(0));
	return n.length === 0 ? null : U(n);
}
function me(e) {
	let t = d.primes();
	return e !== void 0 && (t = t.filter((t) => t < e)), U(t);
}
function he(e, t) {
	return t === void 0 && (t = 1), e.length <= 0 ? Object.values(e) : W(e).slice(0, t);
}
function U(e) {
	return e.length === 0 ? null : e[V(0, e.length - 1)];
}
function W(e) {
	let t = Object.values(e);
	for (let e = t.length - 1; e > 0; e--) {
		let n = Math.floor(Math.random() * (e + 1)), r = t[e];
		t[e] = t[n], t[n] = r;
	}
	return t;
}
//#endregion
//#region src/geometry/line.ts
var G = class e {
	static PARALLEL = R.Parallel;
	static PERPENDICULAR = R.Perpendicular;
	#e;
	#t;
	#n;
	#r;
	#i;
	#a = 1;
	constructor(...e) {
		return this.#t = new p().zero(), this.#n = new p().zero(), this.#r = new p().zero(), this.#e = new L(), this.#i = "lr", e.length > 0 && this.parse(...e), this;
	}
	parse = (...t) => {
		if (t.length === 0) return this;
		if (t.length === 1) {
			if (t[0] instanceof e) return this.fromCoefficient(t[0].a, t[0].b, t[0].c);
			if (t[0] instanceof k) return this.fromEquation(t[0]);
			if (typeof t[0] == "string") try {
				let e = new k(t[0]);
				return this.parse(e);
			} catch (e) {
				return console.warn(e), this;
			}
		}
		if (t.length === 2) {
			if (t[0] instanceof I && t[1] instanceof I) return this.fromPoints(t[0], t[1]);
			if (t[0] instanceof I && t[1] instanceof L) return this.fromPointAndDirection(t[0], t[1]);
		}
		return t.length === 3 && t.every((e) => p.isFraction(e)) ? this.fromCoefficient(t[0], t[1], t[2]) : (console.warn("Something wrong happened while creating the line"), console.warn(t), this);
	};
	clone = () => new e().fromCoefficient(this.#t, this.#n, this.#r);
	get tex() {
		let e = this.#a;
		switch (this.#a = 1, e) {
			case 0: return this.getEquation().reorder().tex;
			case 2: return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new O().parse("x", this.slope, this.height).tex;
			case 3:
			case 4: {
				let t = this.d.clone().simplify();
				return e === 3 ? `${L.asTex("x", "y")} = ${L.asTex(this.#e.x.tex, this.#e.y.tex)} + k\\cdot ${L.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}\n\tx &= ${new O(this.#e.x).add(new E(t.x).multiply(new E("k"))).reorder("k", !0).tex}\\\\\n\ty &= ${new O(this.#e.y).add(new E(t.y).multiply(new E("k"))).reorder("k", !0).tex}\n\\end{aligned}\\right.`;
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
			case 2: return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new O().parse("x", this.slope, this.height).display;
			case 3: {
				let e = this.d.clone().simplify();
				return `((x,y))=((${this.#e.x.display},${this.#e.y.display}))+k((${e.x.display},${e.y.display}))`;
			}
			case 4: {
				let e = this.d.clone().simplify(), t = new O(this.#e.x).add(new E(e.x).multiply(new E("k"))).reorder("k", !0), n = new O(this.#e.y).add(new E(e.y).multiply(new E("k"))).reorder("k", !0);
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
		let e = new L(this.#n.clone(), this.#t.clone().opposite());
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
		return n.isZero() ? new v(0) : new v().from(2, n.inverse(), t).reduce();
	}
	fromCoefficient(e, t, n) {
		this.#t = new p(e), this.#n = new p(t), this.#r = new p(n);
		let r = [
			this.#t,
			this.#n,
			this.#r
		].every((e) => e.exact) ? d.lcm(this.#t.denominator, this.#n.denominator, this.#r.denominator) : 1;
		if (r > 1 && (this.#t.multiply(r).reduce(), this.#n.multiply(r).reduce(), this.#r.multiply(r).reduce()), this.#n.isZero()) return this.#e = new L(this.#r.clone().divide(this.#t).opposite(), 0), this;
		for (let e = 0; e < this.#n.value; e++) {
			let t = this.#t.clone().divide(this.#n).multiply(e).subtract(this.#r.clone().divide(this.#n)).reduce();
			if (this.#e = new L(e, t), t.isRelative()) return this;
		}
		let i = this.#r.clone().divide(this.#n).opposite().reduce();
		return this.#e = new L(0, i), this;
	}
	fromEquation(e) {
		e.reorder(!0);
		let t = new Set(e.letters());
		if (!(t.has("x") || t.has("y"))) return this;
		for (let e of ["x", "y"]) t.has(e) && t.delete(e);
		return t.size > 0 ? this : this.fromCoefficient(e.left.monomByLetter("x").coefficient, e.left.monomByLetter("y").coefficient, e.left.monomByDegree(0).coefficient);
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
	fromPointAndLine(e, t, n = R.Parallel) {
		return n === R.Perpendicular ? this.fromPointAndNormal(e, t.director) : this.fromPointAndNormal(e, t.normal);
	}
	fromPointAndNormal = (e, t) => t.isZero() ? (console.warn("Normal vector is null."), this) : (this.fromCoefficient(t.x, t.y, e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()), this.#e = new L(e.clone()), this);
	fromPoints(e, t) {
		return this.fromPointAndNormal(e, new L(e, t).normal());
	}
	getEquation() {
		return new k(new O().parse("xy", this.#t, this.#n, this.#r), new O("0")).simplify();
	}
	getValueAtX = (e) => {
		let t = this.getEquation().isolate("y"), n = new p(e);
		return t instanceof k ? t.right.evaluate({ x: n }) : new p().invalid();
	};
	getValueAtY = (e) => {
		let t = this.getEquation().isolate("x"), n = new p(e);
		return t instanceof k ? t.right.evaluate({ y: n }) : new p().invalid();
	};
	get height() {
		return this.#r.clone().opposite().divide(this.#n);
	}
	hitSegment(t, n) {
		let r = this.intersection(new e().fromPoints(t, n));
		return r.hasIntersection ? r.point.x.value >= Math.min(t.x.value, n.x.value) && r.point.x.value <= Math.max(t.x.value, n.x.value) && r.point.y.value >= Math.min(t.y.value, n.y.value) && r.point.y.value <= Math.max(t.y.value, n.y.value) : !1;
	}
	intersection = (e) => {
		let t = new I(), n = !1, r = !1;
		return this.#n.isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new p().invalid(), t.y = new p().invalid(), n = !0) : this.isSameAs(e) ? (t.x = new p().invalid(), t.y = new p().invalid(), r = !0) : (t.x = this.#n.clone().multiply(e.c).subtract(this.#r.clone().multiply(e.b)).divide(this.#t.clone().multiply(e.b).subtract(this.#n.clone().multiply(e.a))), t.y = this.#t.clone().multiply(e.c).subtract(this.#r.clone().multiply(e.a)).divide(this.#n.clone().multiply(e.a).subtract(this.#t.clone().multiply(e.b)))), {
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
		return new L(this.#t, this.#n);
	}
	randomNearPoint = (e) => {
		let t = this.randomPoint(e), n = 10;
		for (; this.isOnLine(t) && n > 0;) t.x.add(H(1, !1)), t.y.add(H(1, !1)), n--;
		return t;
	};
	randomPoint = (e) => new I(this.d.clone().multiplyByScalar(H(e === void 0 || e <= 1 ? 3 : e, !1)).add(this.#e));
	simplify = () => {
		let e = d.lcm(this.#t.denominator, this.#n.denominator, this.#r.denominator), t = d.gcd(this.#t.numerator, this.#n.numerator, this.#r.numerator);
		return this.fromCoefficient(this.#t.clone().multiply(e).divide(t), this.#n.clone().multiply(e).divide(t), this.#r.clone().multiply(e).divide(t)), this;
	};
	get slope() {
		return this.#t.clone().opposite().divide(this.#n);
	}
}, K = class e {
	#e = new I();
	#t = new I();
	#n = new I();
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
			if (t.every((e) => e instanceof G)) return this.fromLines(t[0], t[1], t[2]);
			if (t.every((e) => e instanceof I)) return this.fromPoints(t[0], t[1], t[2]);
		}
		if (t.length === 6) {
			let e = t.map((e) => new p(e));
			if (e.some((e) => e.isNaN())) throw Error("One of the values is not a valid number");
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
		return this.fromPoints(new I(e, t), new I(n, r), new I(i, a));
	}
	fromLines(e, t, n) {
		let r = new G(e).clone(), i = new G(t).clone(), a = new G(n).clone(), o = r.intersection(i);
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
			let e = new G().fromPointAndNormal(this.#e, new L(this.#t, this.#n)), t = new G().fromPointAndNormal(this.#t, new L(this.#e, this.#n)), n = new G().fromPointAndNormal(this.#n, new L(this.#e, this.#t)), r = e.intersection(t).point;
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
			let t = new G().fromPoints(this.#e, e.BC), n = new G().fromPoints(this.#t, e.AC), r = new G().fromPoints(this.#n, e.AB), i = t.intersection(n).point;
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
			let t = new G().fromPointAndNormal(e.BC, new L(this.#t, this.#n)), n = new G().fromPointAndNormal(e.AC, new L(this.#e, this.#n)), r = new G().fromPointAndNormal(e.AB, new L(this.#e, this.#t)), i = t.intersection(n).point;
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
			AB: new I().middleOf(this.#e, this.#t),
			AC: new I().middleOf(this.#e, this.#n),
			BC: new I().middleOf(this.#t, this.#n)
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
			AB: new G(this.#e, this.#t),
			BC: new G(this.#t, this.#n),
			AC: new G(this.#e, this.#n)
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
		let n = this.lines, r = new L(), i = new L(), a = new I();
		if (e === "A" ? (a = this.A.clone(), r = n.AB.clone().d, i = n.AC.clone().d) : e === "B" ? (a = this.B.clone(), r = n.AB.clone().d.opposite(), i = n.BC.clone().d) : e === "C" && (a = this.C.clone(), r = n.BC.clone().d.opposite(), i = n.AC.clone().d.opposite()), r === void 0 || i === void 0) throw Error(`The point ${e} does not exist`);
		let o = t ? r.unit().add(i.unit()) : r.unit().subtract(i.unit());
		return new G().fromPointAndDirection(a, o);
	}
	#c(e, t, n) {
		let r = (t ** 2 + n ** 2 - e ** 2) / (2 * t * n);
		return this.#a ? Math.acos(r) : d.numberCorrection(Math.acos(r) * 180 / Math.PI);
	}
	#l = (e) => {
		switch (e.toUpperCase()) {
			case "A": return this.#e;
			case "B": return this.#t;
			case "C": return this.#n;
		}
		return this.#e;
	};
	#u = (e, t) => new L(this.#l(e), this.#l(t));
}, q = class e {
	#e = null;
	#t = null;
	#n = 1;
	#r = null;
	constructor(...e) {
		e.length > 0 && this.parse(...e);
	}
	parse(...t) {
		return typeof t[0] == "string" ? this.fromString(t[0]) : t[0] instanceof k ? this.fromEquation(t[0]) : t[0] instanceof e ? this.copy(t[0]) : t.length === 2 && t[0] instanceof I && t[1] instanceof I ? this.fromCenterPoint(t[0], t[1]) : t.length >= 2 && t[0] instanceof I && (t[1] instanceof p || typeof t[1] == "number") ? this.fromCenterRadius(t[0], t[1], typeof t[2] == "boolean" && t[2]) : this;
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
		return this.#e ?? new I();
	}
	get equation() {
		return this.#t?.clone() ?? new k("0=0");
	}
	fromCenterPoint(e, t) {
		return this.#e = e.clone(), this.#r = new L(this.#e, t).normSquare, this.#i(), this;
	}
	fromCenterRadius(e, t, n) {
		return this.#e = e.clone(), this.#r = n ? new p(t) : new p(t).pow(2), this.#i(), this;
	}
	fromEquation(e) {
		if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
			let t = e.left.monomByDegree(2, "x"), n = e.left.monomByDegree(2, "y"), r, i, a;
			if (t.coefficient.isEqual(n.coefficient)) return e.divide(t.coefficient), r = e.left.monomByDegree(1, "x"), i = e.left.monomByDegree(1, "y"), a = e.left.monomByDegree(0), this.#e = new I(r.coefficient.clone().divide(2).opposite(), i.coefficient.clone().divide(2).opposite()), this.#r = a.coefficient.clone().opposite().add(this.#e.x.clone().pow(2)).add(this.#e.y.clone().pow(2)), this.#i(), this;
			this.#a();
		}
		return this;
	}
	fromPoints(e, t, n) {
		let r = new K(e, t, n);
		if (!r.isValid || !r.remarquables) return this.#a(), this;
		let i = r.getMediators().c.clone(), a = r.getMediators().b.clone();
		return this.fromCenterPoint(i.intersection(a).point, e);
	}
	fromString(e) {
		return this.fromEquation(new k(e));
	}
	getPointsOnCircle() {
		let e = d.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), t = [];
		return e.forEach((e) => {
			for (let n of [
				[1, 1],
				[-1, 1],
				[-1, -1],
				[1, -1]
			]) {
				let r = this.center.x.clone().add(n[0] * e[0]), i = this.center.y.clone().add(n[1] * e[1]);
				t.every((e) => !e.isEqualXY(r, i)) && t.push(new I(r, i));
			}
		}), t;
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
		let t = this.center, n = e.d, r = e.OA, i = n.normSquare, a = r.x.clone().subtract(t.x).multiply(n.x).add(r.y.clone().subtract(t.y).multiply(n.y)).multiply(2), o = r.x.clone().subtract(t.x).pow(2).add(r.y.clone().subtract(t.y).pow(2)).subtract(this.squareRadius), s = y.fromQuadratic(i, a, o);
		if (s.length === 0) return [];
		if (s.length === 1) {
			let e = r.add(n.clone().multiplyByScalar(s[0].fraction));
			return [new I(e.x, e.y)];
		}
		let c = s[0].exact ? r.clone().add(n.clone().multiplyByScalar(s[0].fraction)) : r.clone().add(n.clone().multiplyByScalar(s[0].value)), l = s[1].exact ? r.clone().add(n.clone().multiplyByScalar(s[1].fraction)) : r.clone().add(n.clone().multiplyByScalar(s[1].value));
		return [new I(c.x, c.y), new I(l.x, l.y)].sort((e, t) => n.x.isZero() ? n.y.isPositive() ? e.y.value - t.y.value : t.y.value - e.y.value : n.x.isPositive() ? e.x.value - t.x.value : t.x.value - e.x.value);
	}
	get radius() {
		return new v().from(2, this.#r ?? 0);
	}
	relativePosition(e) {
		if (this.#e === null || this.#r === null) return -1;
		let t = e.distanceTo(this.#e).pow(2).value, n = this.#r.value;
		return t - n > 1e-10 ? 0 : Math.abs(t - n) < 1e-10 ? 1 : 2;
	}
	setRadius(e, t) {
		return this.#r = t ? new p(e) : new p(e).pow(2), this.#i(), this;
	}
	get squareRadius() {
		return this.#r?.clone() ?? new p(-1);
	}
	tangents = (e) => e instanceof p ? this.#c(e) : this.isPointOnCircle(e) ? this.#o(e) : this.#e !== null && this.#e.distanceTo(e).value > this.radius.value ? this.#s(e) : [];
	#i() {
		this.#t = new k(new O(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`), new O(this.squareRadius.display)).moveLeft();
	}
	#a() {
		this.#e = null, this.#r = null, this.#t = null;
	}
	#o = (e) => {
		let t = new L(this.center, e);
		return [new G().fromPointAndNormal(e, t)];
	};
	#s = (e) => {
		let t = this.center.x.clone().subtract(e.x), n = this.center.y.clone().subtract(e.y), r = new O("x"), i = new O("x^2+1");
		return r.multiply(t).subtract(n).pow(2), i.multiply(this.squareRadius), new k(r, i).solve().map((t) => {
			let n, r = new k("y", "x");
			return t.exact ? (n = e.x.clone().opposite().multiply(t.fraction).add(e.y), r.right.multiply(t.fraction).add(n)) : (n = e.x.clone().opposite().multiply(t.value).add(e.y), r.right.multiply(t.value).add(n)), new G(r);
		});
	};
	#c = (e) => {
		let t = e.numerator, n = -e.denominator, r = this.center.x.clone(), i = this.center.y.clone(), a = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), o = r.clone().multiply(t).opposite().subtract(i.clone().multiply(n)).add(a.clone().sqrt()), s = r.clone().multiply(t).opposite().subtract(i.clone().multiply(n)).subtract(a.clone().sqrt());
		return [new G(t, n, o), new G(t, n, s)];
	};
}, J = class e {
	static PARALLEL = z.Parallel;
	static PERPENDICULAR = z.Perpendicular;
	#e = new I();
	#t = new L();
	constructor(e, t) {
		return this.#e = e.clone(), this.#t = t instanceof I ? new L(e, t) : t.clone(), this;
	}
	clone = () => (this.#t = this.#t.clone(), this.#e = this.#e.clone(), this);
	get tex() {
		return {
			parametric: `${L.asTex("x", "y", "z")} = ${L.asTex(this.#e.x.tex, this.#e.y.tex, this.#e.z.tex)} + k\\cdot ${L.asTex(this.#t.x.tex, this.#t.y.tex, this.#t.z.tex)}`,
			system: `\\left\\{\\begin{aligned}
    x &= ${new O(this.#e.x).add(new E(this.#t.x).multiply(new E("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new O(this.#e.y).add(new E(this.#t.y).multiply(new E("k"))).reorder("k", !0).tex}\\\\
    z &= ${new O(this.#e.z).add(new E(this.#t.z).multiply(new E("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
			cartesian: `\\frac{ ${new O("x", 1, this.#e.x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new O("y", 1, this.#e.y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new O("z", 1, this.#e.z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
		};
	}
	get display() {
		let e = this.#e.x.display, t = this.#e.y.display, n = this.#e.z.display, r = this.direction.simplify(), i = r.x.display, a = r.y.display, o = r.z.display;
		return {
			parametric: `${L.asDisplay("x", "y", "z")} = ${L.asDisplay(this.#e.x.display, this.#e.y.display, this.#e.z.display)} + k\\cdot ${L.asDisplay(this.#t.x.display, this.#t.y.display, this.#t.z.display)}`,
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
		let t = new L(this.#e, e), n = this.direction, r = this.direction.normSquare, i = t.cross(n).normSquare.clone().divide(r), a = i.clone().sqrt();
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
		throw Error("Method not implemented.");
	};
	isOnLine = (e) => !1;
	isParallelTo = (e) => {
		throw Error("Method not implemented.");
	};
	isPerpendicularTo = (e) => {
		throw Error("Method not implemented.");
	};
	isSameAs = (e) => {
		throw Error("Method not implemented.");
	};
	isVertical = () => {
		throw Error("Method not implemented.");
	};
	get point() {
		return this.#e.clone();
	}
	randomPoint = (e = 5) => {
		let t = this.#e.clone(), n = new p(H(e, !1));
		return new I(t.x.clone().add(this.#t.x.clone().multiply(n)), t.y.clone().add(this.#t.y.clone().multiply(n)), t.z.clone().add(this.#t.z.clone().multiply(n)));
	};
	simplify = () => {
		throw Error("Method not implemented.");
	};
}, ge = class e {
	#e = new L(0, 0, 1);
	#t = new I(0, 0, 0);
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
			let t = e.equation.moveLeft().reduce().left, n = t.monomByLetter("x").coefficient, r = t.monomByLetter("y").coefficient, i = t.monomByLetter("z").coefficient, a = t.monomByDegree(0).coefficient;
			this.normal = new L(n, r, i), this.point = n.isNotZero() ? new I(a.clone().divide(n).opposite(), 0, 0) : r.isNotZero() ? new I(0, a.clone().divide(r).opposite(), 0) : new I(0, 0, a.clone().divide(i).opposite());
			return;
		}
		if (e.points?.length === 3 && e.points.every((e) => e instanceof L)) {
			let t = e.points[0], n = e.points[1], r = e.points[2], i = new L(t, n), a = new L(t, r);
			this.normal = i.cross(a), this.point = t;
			return;
		}
		if (e.coefficients?.length === 4) {
			let [t, n, r, i] = e.coefficients;
			this.normal = new L(t, n, r), this.point = new I(0, 0, -i);
			return;
		}
	}
	get tex() {
		return new k(new O("xyz", this.a, this.b, this.c, this.d), new O(0)).reduce().tex;
	}
	get display() {
		return new k(new O("xyz", this.a, this.b, this.c, this.d), new O(0)).reduce().display;
	}
	get a() {
		return this.#e.x;
	}
	angle(t, n, r) {
		if (t instanceof e) return this.normal.angle(t.normal, n, r);
		let i;
		if (t instanceof L) {
			if (t.dimension !== 3) throw Error("Vector is not 3D");
			i = t;
		} else i = t.direction;
		return (r ? Math.PI / 2 : 90) - this.normal.angle(i, !0, r);
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
		return new I(new L(t).add(n.clone().multiplyByScalar(r)));
	}
	intersectWithPlane(e) {
		throw this.normal.cross(e.normal), new I(0, 0, 0), Error("Intersection with plane  not yet implemented !");
	}
	isPointOnPlane(e) {
		return this.normal.dot(e).add(this.d).isZero();
	}
	get normal() {
		return this.#e;
	}
	set normal(e) {
		this.#e = new L(e);
	}
	get point() {
		return this.#t;
	}
	set point(e) {
		this.#t = new I(e);
	}
}, _e = /* @__PURE__ */ function(e) {
	return e[e.INTERIOR = 0] = "INTERIOR", e[e.EXTERIOR = 1] = "EXTERIOR", e[e.SECANT = 2] = "SECANT", e[e.TANGENT_INSIDE = 3] = "TANGENT_INSIDE", e[e.TANGENT_OUTSIDE = 4] = "TANGENT_OUTSIDE", e[e.SUPERPOSED = 5] = "SUPERPOSED", e[e.CONCENTRIC = 6] = "CONCENTRIC", e;
}({}), ve = class {
	#e = void 0;
	#t = void 0;
	#n = void 0;
	#r = 1;
	constructor(e, t) {
		return e && t && (this.#e = e, this.#t = new p(t).clone().pow(2), this.#a()), this;
	}
	fromEquation(e) {
		let t = new k(e).moveLeft().reduce(), n = [
			"x",
			"y",
			"z"
		];
		if (n.some((e) => t.degree(e).value !== 2)) return this.makeUndefined();
		let r = t.left.monomByDegree(2, "x").coefficient;
		return n.some((e) => t.left.monomByDegree(2, e).coefficient.isNotEqual(r)) ? this.makeUndefined() : (this.#e = new I(t.left.monomByDegree(1, "x").coefficient.clone().opposite().divide(2), t.left.monomByDegree(1, "y").coefficient.clone().opposite().divide(2), t.left.monomByDegree(1, "z").coefficient.clone().opposite().divide(2)), this.#t = t.left.monomByDegree(0).coefficient.clone().opposite().add(this.#e.x.clone().pow(2)).add(this.#e.y.clone().pow(2)).add(this.#e.z.clone().pow(2)), this.#a(), this);
	}
	get center() {
		if (this.#e === void 0) throw Error("Sphere3 is undefined");
		return this.#e;
	}
	get squareRadius() {
		if (this.#t === void 0) throw Error("Sphere3 is undefined");
		return this.#t;
	}
	get radius() {
		if (this.#t === void 0) throw Error("Sphere3 is undefined");
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
		if (this.#n === void 0) throw Error("Sphere3 is undefined");
		return this.#n;
	}
	makeUndefined() {
		return this.#e = void 0, this.#t = void 0, this.#n = void 0, this;
	}
	get centerRadius() {
		return this.#r = 1, this;
	}
	get developped() {
		return this.#r = 0, this;
	}
	get tex() {
		return this.#i(!0);
	}
	get display() {
		return this.#i(!1);
	}
	#i = (e) => {
		if (this.#n === void 0) throw Error("Sphere3 is undefined");
		if (this.#r === 0) return e ? this.#n.tex : this.#n.display;
		let t = [];
		return [
			"x",
			"y",
			"z"
		].forEach((n) => {
			if (this.center[n].isZero()) t.push(`${n}^2`);
			else {
				let r = new O(n).subtract(this.center[n]);
				t.push(e ? `\\(${r.tex}\\)^2` : `(${r.display})^2`);
			}
		}), t.join("+") + "=" + (e ? this.squareRadius.tex : this.squareRadius.display);
	};
	#a() {
		this.#n = new k(new O("x").subtract(this.center.x).pow(2).add(new O("y").subtract(this.center.y).pow(2)).add(new O("z").subtract(this.center.z).pow(2)), new O(this.squareRadius)).reduce();
	}
	static RELATIVE_POSITION = _e;
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
function Y(e) {
	let t = Object.assign({
		negative: !0,
		max: 10,
		reduced: !0,
		zero: !0,
		natural: !1
	}, e), n = new p();
	if (n.numerator = t.negative ? H(t.max, t.zero) : V(+!t.zero, t.max), t.natural) n.denominator = 1;
	else {
		let e = 0;
		for (; n.isRelative() && e < 10;) n.denominator = V(1, t.max), e++;
	}
	return t.reduced ? n.reduce() : n;
}
//#endregion
//#region src/randomization/algebra/rndMonom.ts
function ye(e) {
	let t = Object.assign({
		letters: "x",
		degree: 2,
		fraction: !0,
		zero: !1
	}, e), n = new E();
	if (n.coefficient = Y(Object.assign({}, {
		zero: t.zero,
		reduced: !0,
		natural: t.fraction === !1
	}, typeof t.fraction == "boolean" ? {} : t.fraction)), t.letters.length > 1) {
		for (let e of t.letters.split("")) n.setLetter(e, 0);
		for (let e = 0; e < t.degree; e++) {
			let e = U(t.letters.split(""));
			n.setLetter(e, n.degree(e).clone().add(1));
		}
	} else n.setLetter(t.letters, t.degree);
	return n;
}
//#endregion
//#region src/randomization/algebra/rndPolynom.ts
var X = {
	letters: "x",
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
	let t = Object.assign({}, X, e);
	if (t.factorable) return be(t);
	let n = new O().empty(), r, i = t.degree ?? 2;
	for (let e = i; e >= 0; e--) r = ye({
		letters: t.letters,
		degree: e,
		fraction: t.fraction,
		zero: e !== i && t.allowNullMonom
	}), t.unit && i === e && r.coefficient.one(), n.add(r);
	if (t.positive && n.monomByDegree().coefficient.isNegative() && n.opposite(), t.numberOfMonoms && t.numberOfMonoms > 0 && t.numberOfMonoms < n.length) for (; n.length > t.numberOfMonoms;) {
		let e = V(1, n.length - 1);
		n.monoms.splice(e, 1);
	}
	return n.reduce();
}
function be(e) {
	let t = Object.assign(X, e), n = { ...t };
	n.degree = 1, n.factorable = !1;
	let r = [], i = t.degree ?? 2;
	for (; r.length < i;) r.push(Z(n));
	if (e?.commonConstant !== !1) {
		let t = H(10, !1);
		e?.commonConstant === !0 && (t === 1 || t === -1) && (t *= V(2, 5)), t !== 1 && t !== -1 && r.unshift(new O(t));
	}
	return O.xMultiply(...r);
}
//#endregion
//#region src/randomization/algebra/rndEquation.ts
function xe(e) {
	let t = Object.assign({
		letters: "x",
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
	}, e), n = new O().one();
	for (let e = 0; e < t.degree; e++) {
		let e = Z({
			degree: 1,
			unit: t.unit,
			fraction: t.fraction,
			letters: t.letters,
			zero: t.zero
		});
		n.multiply(e);
	}
	return new k(n, 0);
}
//#endregion
//#region src/randomization/geometry/rndPoint.ts
function Q(e) {
	let t = Object.assign({
		axis: !0,
		fraction: !1,
		max: 10,
		quadrant: null
	}, e), n = t.axis === "x", r = t.axis === "y", i = t.fraction ? Y({
		max: t.max,
		zero: n
	}) : new p(H(t.max, n)), a = t.fraction ? Y({
		max: t.max,
		zero: r
	}) : new p(H(t.max, r));
	return Number(t.quadrant) === 1 && (i.abs(), a.abs()), Number(t.quadrant) === 2 && (i.isPositive() && i.opposite(), a.isNegative() && a.opposite()), Number(t.quadrant) === 3 && (i.isPositive() && i.opposite(), a.isPositive() && a.opposite()), Number(t.quadrant) === 4 && (i.isNegative() && i.opposite(), a.isPositive() && a.opposite()), new I(i, a);
}
//#endregion
//#region src/randomization/geometry/rndCircle.ts
function Se(e) {
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
	return t.pointsOnCircle === 8 ? (r = V(1, 3), i = r ** 2 + (r + 1) ** 2) : i = V(1, 20), new q(n, i, !0);
}
//#endregion
//#region src/randomization/geometry/rndLine.ts
function Ce(e) {
	let t = Object.assign({ A: {
		x: H(10),
		y: H(10)
	} }, e), n = new L(0, 0);
	for (; n.isNull;) n.x = H(10, t.allow?.vertical ?? !0), n.y = H(10, t.allow?.horizontal ?? !0);
	return t.slope === 1 ? n.x.sign() !== n.y.sign() && n.y.opposite() : t.slope === -1 && n.x.sign() !== n.y.sign() && n.y.opposite(), new G().fromPointAndDirection(new L(t.A.x, t.A.y), n);
}
//#endregion
//#region src/randomization/geometry/rndLine3.ts
function we(e) {
	let t = Object.assign({
		A: {
			x: H(10),
			y: H(10),
			z: H(10)
		},
		direction: {
			x: H(10),
			y: H(10),
			z: H(10)
		}
	}, e);
	return new J(new I(t.A.x, t.A.y, t.A.z), new L(t.direction.x, t.direction.y, t.direction.z));
}
//#endregion
//#region src/randomization/random.ts
var $ = {
	equation: (e) => xe(e),
	polynom: (e) => Z(e),
	monom: (e) => ye(e),
	fraction: (e) => Y(e),
	number: (e, t, n) => V(e, t, n),
	numberSym: (e, t) => H(e, t),
	prime: (e) => me(e),
	triplet: (e, t) => pe(e, t),
	bool: (e) => B(e),
	array: (e, t) => he(e, t),
	item: (e) => U(e),
	shuffle: (e) => W(e),
	line: (e) => Ce(e),
	line3: (e) => we(e),
	vector: (e) => new L(Q(e)),
	point: (e) => Q(e),
	circle: (e) => Se(e)
}, Te = {
	Numeric: d,
	Fraction: p,
	Root: v,
	Monom: E,
	Polynom: O,
	Equation: k,
	Matrix: le,
	LinearSystem: se,
	Factor: A,
	PolyFactor: M,
	LogicalSet: ce,
	Random: $,
	Geometry: {
		Vector: L,
		Point: I,
		Line: G,
		Triangle: K,
		Circle: q,
		Line3: J,
		Plane3: ge,
		Sphere3: ve
	},
	NumExp: T
};
//#endregion
export { q as Circle, k as Equation, b as EquationSolver, j as FACTOR_DISPLAY, f as FRAC_TYPE, A as Factor, p as Fraction, G as Line, J as Line3, se as LinearSystem, ce as LogicalSet, le as Matrix, E as Monom, T as NumExp, d as Numeric, ge as Plane3, I as Point, M as PolyFactor, O as Polynom, $ as Random, v as Root, _e as SPHERE3_RELATIVE_POSITION, y as Solution, ve as Sphere3, ee as TableOfSigns, K as Triangle, L as Vector, de as areVectorsColinears, ue as areVectorsEquals, Te as default, fe as determinantFromVectors, P as dotProduct };

//# sourceMappingURL=pimath.js.map