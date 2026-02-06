function lt(n) {
  const t = it(n), e = [];
  let i, s;
  for (; t.length > 0; )
    i = t.shift() ?? 1, s = (t.length > 0 ? t.pop() : +i) ?? 1, e.push([i, s]);
  return e;
}
function ut(...n) {
  const t = K(...n);
  return n.map((e) => e / t);
}
function it(n) {
  const t = Math.abs(n), e = Math.sqrt(t), i = [];
  for (let s = 1; s <= e; s++)
    n % s === 0 && (i.push(s), i.push(t / s));
  return i.sort(function(s, r) {
    return s - r;
  }), [...new Set(i)];
}
function K(...n) {
  const t = function(s, r) {
    return r === 0 ? s : t(r, s % r);
  };
  let e = 1, i = 2;
  if (n.length === 0)
    return 1;
  if (n.length === 1)
    return n[0] === 0 ? 1 : n[0];
  if (e = t(n[0], n[1]), e === 1)
    return 1;
  for (i = 2; i < n.length && (e = t(e, n[i]), e !== 1); i++)
    ;
  return Math.abs(e);
}
function ft(...n) {
  return n.reduce(function(t, e) {
    return Math.abs(t * e / K(t, e));
  });
}
function dt(n, t = 3) {
  return +n.toFixed(t);
}
function pt(n) {
  if (Number.isSafeInteger(n) || n.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function mt(n) {
  const t = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return n === void 0 ? t : t.slice(0, Math.min(t.length, n));
}
function gt(n, t) {
  const e = [], i = t === !0 ? +n : n ** 2;
  for (let s = 0; s <= n; s++)
    for (let r = 0; r <= n; r++)
      s ** 2 + r ** 2 === i && e.push([s, r, n]);
  return e;
}
function wt(n, t = 2) {
  return +`${Math.round(+`${n}e${t}`)}e-${t}`;
}
function yt(n, t) {
  let e = Math.floor(Math.pow(n, 1 / t));
  const i = n, s = 1;
  for (; e > 1; ) {
    const r = Math.pow(e, t);
    if (i % r === 0)
      return r;
    e--;
  }
  return s;
}
const x = {
  decompose: lt,
  dividers: it,
  divideNumbersByGCD: ut,
  gcd: K,
  lcm: ft,
  numberCorrection: dt,
  periodic: pt,
  primes: mt,
  pythagoreanTripletsWithTarget: gt,
  round: wt,
  greatestPower: yt
};
var bt = /* @__PURE__ */ ((n) => (n.frac = "frac", n.dfrac = "dfrac", n.tfrac = "tfrac", n))(bt || {});
class a {
  #t = 1;
  #e = 3;
  #i = !0;
  #s = 1;
  #r = "frac";
  #n = !1;
  constructor(t, e) {
    return t !== void 0 && this.parse(t, e), this;
  }
  // ------------------------------------------
  /**
   * Parse the value to get the numerator and denominator
   * @param value : number or string to parse to get the fraction
   */
  parse = (t, e) => t === "" ? (this.#s = 0, this.#t = 1, this) : typeof t == "string" ? this.fromString(t) : typeof t == "number" && e === void 0 ? this.fromNumber(t) : typeof t == "number" && typeof e == "number" ? this.fromNumbers(t, e) : t instanceof a ? this.copy(t) : this;
  clone = () => {
    const t = new a();
    return t.numerator = this.#s, t.denominator = this.#t, t.exact = this.exact, t;
  };
  copy(t) {
    return this.#s = t.numerator, this.#t = t.denominator, this.#i = t.exact, this;
  }
  get tex() {
    if (this.isInfinity())
      return `${this.sign() === 1 ? "+" : "-"}\\infty`;
    const t = this.#n && this.isPositive() ? "+" : "";
    return this.exact ? this.#t === 1 ? `${t}${this.#s}` : this.#s < 0 ? `-\\${this.#r}{ ${-this.#s} }{ ${this.#t} }` : `${t}\\${this.#r}{ ${this.#s} }{ ${this.#t} }` : t + this.value.toFixed(this.#e);
  }
  get display() {
    if (this.isInfinity())
      return `${this.sign() === 1 ? "+" : "-"}oo`;
    const t = this.#n && this.isPositive() ? "+" : "";
    return this.exact ? this.#t === 1 ? `${t}${this.#s}` : `${t}${this.#s}/${this.#t}` : t + this.value.toFixed(this.#e);
  }
  static average = (...t) => {
    const e = new a().zero();
    for (const i of t)
      e.add(i);
    return e.divide(t.length), e;
  };
  static isFraction(t) {
    if (t instanceof a || typeof t == "number" && !isNaN(t))
      return !0;
    if (typeof t == "string") {
      const [e, i] = t.split("/");
      return !isNaN(+e) && !isNaN(+i);
    }
    return !1;
  }
  static max = (...t) => {
    let e = new a(t[0]);
    for (const i of t) {
      const s = new a(i);
      s.isGreater(e) && (e = s.clone());
    }
    return e;
  };
  static min = (...t) => {
    let e = new a(t[0]);
    for (const i of t) {
      const s = new a(i);
      s.isLesser(e) && (e = s.clone());
    }
    return e;
  };
  static sort = (t, e) => {
    const s = t.map((r) => r instanceof a ? r : new a(r)).sort((r, o) => r.value - o.value);
    return e && s.reverse(), s;
  };
  static toSameDenominateur(...t) {
    const e = t.map((s) => new a(s)), i = x.lcm(...e.map((s) => s.denominator));
    return e.forEach((s) => s.amplify(i / s.denominator)), e;
  }
  static unique = (t) => {
    const e = {}, i = [];
    return t.forEach((s) => {
      s instanceof a || (s = new a(s)), e[s.clone().reduce().tex] || (i.push(s.clone()), e[s.tex] = !0);
    }), i;
  };
  static xMultiply = (...t) => {
    const e = new a();
    return t.forEach((i) => e.multiply(i, !1)), e;
  };
  abs = () => (this.#s = Math.abs(this.#s), this.#t = Math.abs(this.#t), this);
  add = (t) => {
    if (t instanceof a) {
      const e = this.#s, i = this.#t;
      this.#s = e * t.denominator + t.numerator * i, this.#t = i * t.denominator, this.exact = this.exact && t.exact;
    } else
      return this.add(new a(t));
    return this.reduce();
  };
  amplify = (t) => (Number.isSafeInteger(t) && (this.#s *= t, this.#t *= t), this);
  areEquals = (...t) => t.every((e) => e.isEqual(t[0]));
  /**
   * Compare the current coefficient with another coefficient
   * @param F (Coefficient) The coefficient to _compare
   * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
   */
  compare = (t, e) => {
    e ??= "=";
    let i;
    switch (t instanceof a ? i = t.clone() : i = new a(t), e) {
      case ">":
        return this.value > i.value;
      case ">=":
      case "=>":
      case "geq":
        return this.value >= i.value;
      case "<":
        return this.value < i.value;
      case "<=":
      case "=<":
      case "leq":
        return this.value <= i.value;
      case "=":
        return this.value === i.value;
      case "<>":
        return this.value !== i.value;
      default:
        return !1;
    }
  };
  get denominator() {
    return this.#t;
  }
  set denominator(t) {
    this.#t = t;
  }
  get dfrac() {
    return this.#r = "dfrac", this;
  }
  digits(t) {
    return this.#e = t, this;
  }
  divide = (t) => {
    const e = new a(t);
    if (e.numerator === 0)
      return new a().infinite();
    const i = this.#s, s = this.#t;
    return this.#s = i * e.denominator, this.#t = s * e.numerator, this.exact = this.exact && e.exact, this.reduce();
  };
  get exact() {
    return this.#i;
  }
  set exact(t) {
    this.#i = t;
  }
  get frac() {
    return this.#r = "frac", this;
  }
  fromNumber(t) {
    if (Number.isSafeInteger(t))
      return this.#s = t, this.#t = 1, this.#i = !0, this;
    const [, e] = t.toString().split("."), i = e ? e.length : 0, s = Math.pow(10, i);
    return this.#s = t * s, this.#t = s, this.#s = x.numberCorrection(this.#s), this.#t = x.numberCorrection(this.#t), this.reduce(), this.#i = i < 10, this;
  }
  fromNumbers(t, e) {
    return Number.isSafeInteger(t) && Number.isSafeInteger(e) ? (this.#s = t, this.#t = e, this.#i = !0, this) : this.fromNumber(t / e);
  }
  fromPeriodic(t, e) {
    if (e === void 0)
      return this.fromPeriodic(t, 2);
    const [, i] = t.toString().split(/[.,]/), s = i ? i.length : 0, r = Math.pow(10, s);
    return this.#s = +t * r - Math.floor(+t * Math.pow(10, s - e)), this.#t = r - Math.pow(10, s - e), this.#i = !0, this;
  }
  fromString(t) {
    const e = t.split("/").map(Number);
    return this.#i = !0, e.length > 2 ? (this.#s = NaN, this) : e.some((i) => isNaN(i)) ? (this.#s = NaN, this) : e.length === 1 ? this.fromNumber(+t) : e[1] === 0 ? (this.#s = NaN, this.#t = 1, this) : (this.#s = e[0], this.#t = e[1], this);
  }
  infinite = () => (this.#s = 1 / 0, this.#t = 1, this.exact = !0, this);
  invalid = () => (this.#s = NaN, this.#t = 1, this.exact = !0, this);
  inverse = () => {
    const t = this.sign(), e = Math.abs(this.#s);
    return this.#s = Math.abs(this.#t) * t, this.#t = e, this;
  };
  isEqual = (t) => this.compare(t, "=");
  isEven = () => this.isRelative() && this.value % 2 === 0;
  isFinite = () => !this.isInfinity() && !this.isNaN();
  isGeq = (t) => this.compare(t, ">=");
  isGreater = (t) => this.compare(t, ">");
  isInfinity = () => Math.abs(this.#s) === 1 / 0;
  isLeq = (t) => this.compare(t, "<=");
  isLesser = (t) => this.compare(t, "<");
  isNaN = () => isNaN(this.#s);
  isNatural = () => this.isRelative() && this.isPositive();
  isNegative = () => this.sign() === -1;
  isNotEqual = (t) => this.compare(t, "<>");
  isNotZero = () => this.#s !== 0;
  isOdd = () => this.isRelative() && this.value % 2 === 1;
  isOne = () => this.#s === 1 && this.#t === 1;
  isPositive = () => this.sign() === 1;
  isRational = () => this.exact && !this.isRelative();
  isReduced = () => Math.abs(x.gcd(this.#s, this.#t)) === 1;
  isRelative = () => this.exact && this.clone().reduce().denominator === 1;
  isSquare = () => Math.sqrt(this.#s) % 1 === 0 && Math.sqrt(this.#t) % 1 === 0;
  isStrictlyNegative = () => this.value < 0;
  isStrictlyPositive = () => this.value > 0;
  isUnit() {
    return Math.abs(this.#s) === 1 && this.#t === 1;
  }
  // Mathematical operations specific to fractions
  isZero = () => this.#s === 0;
  multiply = (t, e = !0) => {
    const i = new a(t);
    return this.#s = this.#s * i.numerator, this.#t = this.#t * i.denominator, this.exact = this.exact && i.exact, e ? this.reduce() : this;
  };
  // ------------------------------------------
  get numerator() {
    return this.#s;
  }
  set numerator(t) {
    this.#s = t;
  }
  one = () => this.fromNumber(1);
  opposite = () => (this.#s = -this.#s, this);
  pow = (t) => {
    if (t instanceof a)
      return this.pow(t.value);
    this.reduce(), t < 0 && this.inverse();
    const e = Math.floor(Math.pow(this.#s, Math.abs(t))), i = Math.floor(Math.pow(this.#t, Math.abs(t)));
    return e ** Math.abs(t) === this.#s && i ** Math.abs(t) === this.#t ? (this.#s = this.#s ** Math.abs(t), this.#t = this.#t ** Math.abs(t)) : (this.#s = this.#s ** Math.abs(t), this.#t = this.#t ** Math.abs(t)), this;
  };
  reduce = () => {
    const t = x.gcd(this.#s, this.#t);
    return this.#s = this.#s / t, this.#t = this.#t / t, this.#t < 0 && (this.#t = -this.#t, this.#s = -this.#s), this;
  };
  root = (t) => {
    if (t === 0)
      return this;
    if (t < 0 && this.inverse(), !Number.isSafeInteger(t))
      throw new Error("The root must be an integer.");
    if (this.isNegative() && t % 2 === 0)
      throw new Error("The root of a negative number must be odd.");
    const e = this.sign();
    this.abs(), this.reduce();
    const i = Math.floor(Math.pow(this.#s, Math.abs(1 / t))), s = Math.floor(Math.pow(this.#t, Math.abs(1 / t)));
    return this.#s = Math.pow(this.#s, Math.abs(1 / t)), this.#t = Math.pow(this.#t, Math.abs(1 / t)), (i !== this.#s || s !== this.#t) && (this.#s = this.#s / this.#t, this.#t = 1, this.exact = !1), this.multiply(e), this;
  };
  sign = () => this.#s * this.#t >= 0 ? 1 : -1;
  sqrt = () => this.root(2);
  subtract = (t) => t instanceof a ? this.add(t.clone().opposite()) : this.add(-t);
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get tfrac() {
    return this.#r = "tfrac", this;
  }
  get value() {
    const t = this.#s / this.#t;
    return t === 0 ? 0 : t;
  }
  get withSign() {
    return this.#n = !0, this;
  }
  get withoutSign() {
    return this.#n = !1, this;
  }
  zero = () => this.fromNumber(0);
}
function et(n, t = !0) {
  return t ? `\\left( ${n} \\right)` : `(${n})`;
}
function Y(n) {
  return n.startsWith("(") && (n = n.substring(1)), n.endsWith(")") && (n = n.substring(0, n.length - 1)), n;
}
function j(n, t, e, i, s) {
  return n.map((r, o) => r === t ? e : r);
}
class O {
  #t;
  #e;
  #i;
  #s = !1;
  constructor(t) {
    return this.#e = 2, this.#t = new a().zero(), this.#i = new a().zero(), t && this.parse(t), this;
  }
  parse(t) {
    if (t instanceof O)
      return this.index = t.index, this.radical = t.radical.clone(), this.factor = t.factor.clone(), this;
    if (t instanceof a)
      return this.index = 2, this.factor = t.clone(), this.radical.one(), this;
    if (typeof t == "string") {
      if (t.includes("sqrt"))
        return this.#n(t);
      if (t.includes("root"))
        return this.#r(t);
    }
    return this.index = 2, this.factor = new a(t), this.radical.one(), this;
  }
  clone() {
    return new O().from(this.index, this.radical, this.factor);
  }
  get tex() {
    const t = this.#s && this.factor.isPositive() ? "+" : "";
    if (this.#i.isZero()) return `${t}${this.#t.tex}`;
    if (this.index === 1) return `${t}${this.factor.clone().multiply(this.radical).tex}`;
    const e = this.index === 2 ? `\\sqrt{ ${this.#i.tex} }` : `\\sqrt[ ${this.index} ]{ ${this.#i.tex} }`;
    return this.#t.isUnit() ? this.#s ? `${this.#t.isOne() ? t : "-"} ${e}` : `${this.#t.isOne() ? "" : "-"}${e}` : `${t}${this.#t.tex} ${e}`;
  }
  get display() {
    const t = this.#s && this.factor.isPositive() ? "+" : "";
    if (this.#i.isZero()) return `${t}${this.#t.display}`;
    if (this.index === 1) return `${t}${this.factor.clone().multiply(this.radical).display}`;
    const e = this.index === 2 ? `sqrt(${this.#i.tex})` : `root(${this.index})(${this.#i.display})`;
    return this.#t.isUnit() ? `${this.#t.isOne() ? t : "-"}${e}` : `${t}${this.#t.display}${e}`;
  }
  add(t) {
    const e = new O(t);
    if (this.index !== e.index && !this.radical.isEqual(e.radical))
      throw new Error("Add can only be done with two same index and radical");
    return this.factor.add(e.factor), this;
  }
  divide(t) {
    return this.multiply(new O(t).inverse());
  }
  get factor() {
    return this.#t;
  }
  set factor(t) {
    this.#t = t;
  }
  from(t, e, i) {
    return this.index = t, this.radical = new a(e), this.factor = i ? new a(i) : new a().one(), this;
  }
  /**
   * convert to root(index)(radical), without factor
   */
  group() {
    return this.radical.multiply(this.factor.pow(this.index)), this.factor.one(), this;
  }
  get index() {
    return this.#e;
  }
  set index(t) {
    if (!Number.isSafeInteger(t) || t <= 0)
      throw new Error("Index must be a strictly positive integer.");
    this.#e = t;
  }
  get indexAsPow() {
    return new a(this.index).inverse();
  }
  inverse() {
    return this.factor.inverse(), this.radical.inverse(), this;
  }
  isEqual(t) {
    return this.value === t.value;
  }
  isOne() {
    return this.factor.isOne() && this.radical.isOne();
  }
  isRational() {
    const t = this.clone().reduce();
    return t.radical.isOne() ? t.factor.exact : t.index === 1 ? t.factor.exact && t.radical.exact : !1;
  }
  isZero() {
    return this.factor.isZero() || this.radical.isZero();
  }
  multiply(t) {
    const e = new O(t);
    if (this.factor.multiply(e.factor), this.index === e.index)
      return this.radical.multiply(e.radical), this;
    if (this.radical.isEqual(e.radical)) {
      const i = this.indexAsPow.add(e.indexAsPow).reduce();
      return this.index = i.denominator, this.radical = this.radical.pow(i.numerator), this;
    }
    throw new Error("Multiply can only be done if radical or index as equals.");
  }
  one() {
    return this.radical.one(), this.factor.one(), this;
  }
  opposite() {
    return this.factor.opposite(), this;
  }
  pow(t) {
    this.factor.pow(t);
    const e = x.gcd(this.index, t);
    return this.index = this.index / e, this.radical.pow(t / e), this;
  }
  get radical() {
    return this.#i;
  }
  set radical(t) {
    this.#i = t;
  }
  reduce() {
    if (this.radical.isRational()) {
      const e = this.radical.denominator;
      this.radical.denominator = 1, this.radical.numerator *= e, this.factor.divide(e);
    }
    const t = x.greatestPower(this.radical.value, this.index);
    return this.factor.multiply(Math.pow(t, 1 / this.index)), this.radical.divide(t), this;
  }
  root(t) {
    return this.group(), this.index = this.index * t, this;
  }
  sqrt() {
    return this.root(2);
  }
  subtract(t) {
    const e = new O(t);
    return this.add(e.opposite());
  }
  get value() {
    return x.numberCorrection(this.factor.value * Math.pow(this.radical.value, 1 / this.index));
  }
  get withSign() {
    return this.#s = !0, this;
  }
  get withoutSign() {
    return this.#s = !1, this;
  }
  zero() {
    return this.radical.zero(), this.factor.zero(), this;
  }
  #r(t) {
    const [e, i] = t.split("root"), [s, r] = i.split(")");
    return this.index = +Y(s), this.radical = new a(Y(r)), this.factor = e === "" ? new a().one() : new a(e), this;
  }
  #n(t) {
    const [e, i] = t.split("sqrt");
    return this.index = 2, this.radical = new a(Y(i)), this.factor = e === "" ? new a().one() : new a(e), this;
  }
}
class $ {
  #t;
  #e;
  #i;
  #s;
  #r;
  #n;
  #o;
  constructor() {
    this.#o = "x", this.#i = !1, this.#e = null, this.#n = null, this.#s = new a().zero(), this.#r = new O(), this.#t = 1;
  }
  get tex() {
    if (this.#n) return this.#n;
    if (this.#r.isZero()) return this.#s.tex;
    if (this.#s.isZero()) return this.#r.tex;
    const [t] = a.toSameDenominateur(this.#s, this.#r.factor), e = this.#r.clone().multiply(t.denominator).reduce(), i = `${t.numerator} ${e.withSign.tex}`;
    return t.denominator === 1 ? i : `\\frac{ ${i} }{ ${t.denominator} }`;
  }
  set tex(t) {
    this.#n = t;
  }
  get display() {
    if (this.#e) return this.#e;
    if (this.#r.isZero()) return this.#s.display;
    if (this.#s.isZero()) return this.#r.display;
    const [t] = a.toSameDenominateur(this.#s, this.#r.factor), e = this.#r.clone().multiply(t.denominator).reduce(), i = `${t.numerator}${e.withSign.display}`;
    return t.denominator === 1 ? i : `(${i})/${t.denominator}`;
  }
  set display(t) {
    this.#e = t;
  }
  static fromFraction(t) {
    const e = new $();
    e.setExact();
    const i = new a(t);
    return e.display = i.display, e.tex = i.tex, e.fraction = i, e.root = new O(), e;
  }
  static fromQuadratic(t, e, i) {
    const [s, r, o] = [t, e, i].map((f) => new a(f)), h = r.clone().pow(2).subtract(s.clone().multiply(o).multiply(4));
    if (h.isNegative())
      return [];
    if (h.isSquare()) {
      const f = h.sqrt(), p = r.clone().opposite().subtract(f).divide(s.clone().multiply(2)), y = r.clone().opposite().add(f).divide(s.clone().multiply(2));
      return f.isZero() ? [$.fromFraction(p)] : [$.fromFraction(p), $.fromFraction(y)];
    }
    const c = new $();
    c.fraction = r.clone().opposite().divide(s).divide(2), c.root = new O().from(2, h, s.clone().multiply(2).inverse().opposite()), c.setExact(!1);
    const l = new $();
    return l.fraction = r.clone().opposite().divide(s).divide(2), l.root = new O().from(2, h, s.clone().multiply(2).inverse()), l.setExact(!1), [c, l];
  }
  get count() {
    return this.#t;
  }
  set count(t) {
    this.#t = t;
  }
  get exact() {
    return this.#i;
  }
  set exact(t) {
    this.#i = t;
  }
  get fraction() {
    return this.#s;
  }
  set fraction(t) {
    this.#s = t;
  }
  isZero() {
    return this.#s.isZero() && this.#r.isZero();
  }
  reduce() {
    return this.#r.reduce(), this.#s.reduce(), this;
  }
  get root() {
    return this.#r;
  }
  set root(t) {
    this.#r = t;
  }
  setExact(t = !0) {
    return this.#i = t, this;
  }
  get value() {
    return this.fraction.value + this.root.value;
  }
  get variable() {
    return this.#o;
  }
  set variable(t) {
    t !== void 0 && (this.#o = t);
  }
}
class Lt {
  #t;
  #e;
  constructor(t) {
    t instanceof N || t instanceof E ? this.#t = new N(t) : this.#t = new N().fromPolynom(t), this.#e = this.#t.getRoots();
  }
  get fx() {
    return this.#t;
  }
  get roots() {
    return this.#e;
  }
}
class P {
  _;
  #t;
  #e;
  #i;
  constructor(t, e, i = "x") {
    if (this.#i = i, this.#t = 1e-4, this._ = 0, Object.hasOwn(t, "moveLeft")) {
      const s = t;
      this.#e = s.left.clone().subtract(s.right);
    } else
      this.#e = t.clone().subtract(e ?? 0);
    return this;
  }
  get bissectionComplexityCounter() {
    return this._;
  }
  get bissectionDeltaX() {
    return this.#t;
  }
  set bissectionDeltaX(t) {
    this.#t = t;
  }
  solve() {
    const t = this.#e.degree().value;
    if (t === 0)
      return [];
    if (t === 1)
      return this.#h();
    if (t === 2)
      return this.#u();
    const { solutions: e, reminder: i } = this.#c();
    return i.degree().isZero() ? e : i.degree().value <= 2 ? e.concat(
      new P(i.clone()).solve()
    ) : (this._ = 0, e.concat(
      this.#n(i)
    ).sort((s, r) => s.value - r.value));
  }
  solveAsCardan() {
    if (this.#e.degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return this.#f();
  }
  #s(t, e) {
    const i = new $();
    return i.exact = !1, i.tex = e?.tex ?? null, i.display = e?.display ?? null, i.fraction = new a(t), i.fraction.exact = !1, i.variable = this.#i, i;
  }
  #r(t) {
    return t instanceof a && !t.exact ? this.#s(t.value) : $.fromFraction(t);
  }
  // Solve using bissection algorithm (approximative solution)
  #n(t) {
    const e = [], i = t.degree().value, [s, ...r] = t.getCoefficients(), o = 2 + Math.max(...r.map((l) => l.value / s.value)), h = this.#a(t, o, 100);
    return this.#l(h, i).forEach((l) => {
      const [f, p] = l;
      if (f === p)
        e.push(this.#r(f));
      else {
        const y = this.#o(t, f, p);
        y !== null && e.push(this.#s(y));
      }
    }), e;
  }
  #o(t, e, i) {
    let s = t.evaluate(e, !0), r = t.evaluate(i, !0);
    if (s * r > 0)
      return console.log("Pas de racine dans l'intervalle donné"), null;
    let o;
    for (; (i - e) / 2 > this.#t; ) {
      this._++, o = (e + i) / 2;
      const h = t.evaluate(o, !0);
      if (h === 0)
        return o;
      s * h < 0 ? (i = o, r = h) : (e = o, s = h);
    }
    return (e + i) / 2;
  }
  #a(t, e, i) {
    const s = [], r = 2 * e / i;
    for (let o = -e; o <= e; o += r) {
      const h = x.numberCorrection(o);
      s.push(
        {
          x: h,
          fx: t.evaluate(h, !0)
        }
      );
    }
    return s;
  }
  #l(t, e) {
    const i = [];
    for (let s = 1; s < t.length; s++) {
      const r = t[s], o = t[s - 1];
      if (r.fx === 0 ? i.push([r.x, r.x]) : r.fx * o.fx < 0 && i.push([o.x, r.x]), i.length === e)
        return i;
    }
    return i;
  }
  #c() {
    const t = this.#e.clone(), e = [], i = t.lcmDenominator();
    i !== 1 && t.multiply(i);
    const s = t.monomByDegree().coefficient, r = t.monomByDegree(0).coefficient;
    if (r.isZero()) {
      e.push(this.#r(0));
      const p = t.monoms.reduce((C, q) => q.degree().value < C.degree().value ? q : C), y = p.coefficient;
      p.clone().divide(y), t.divide(p);
    }
    const o = x.dividers(s.value), h = x.dividers(r.value), c = [];
    for (const p of o)
      for (const y of h) {
        const C = new a(y, p);
        c.find((q) => q.value === C.value) || (c.push(C.clone()), c.push(C.opposite().clone()));
      }
    c.forEach((p) => {
      t.evaluate(p).isZero() && e.push(this.#r(p));
    });
    for (const p of e) {
      if (p.isZero())
        continue;
      const y = t.clone().fromCoefficients(p.fraction.denominator, -p.fraction.numerator);
      for (p.count = 0; t.isDividableBy(y); )
        t.divide(y), p.count++;
    }
    if (t.degree().isZero() || t.degree().value > 3)
      return e.sort((p, y) => p.value - y.value), { solutions: e, reminder: t };
    const l = t.clone().zero(), f = new P(t, l, this.#i);
    return {
      solutions: e.concat(f.solve()).sort((p, y) => p.value - y.value),
      reminder: l
    };
  }
  #f() {
    const t = this.#e, e = t.monomByDegree(3).coefficient, i = t.monomByDegree(2).coefficient, s = t.monomByDegree(1).coefficient, r = t.monomByDegree(0).coefficient, o = i.clone().divide(e), h = s.clone().divide(e), c = r.clone().divide(e), l = h.clone().subtract(o.clone().pow(2).divide(3)), f = c.clone().subtract(o.clone().multiply(h).divide(3)).add(o.clone().pow(3).multiply(2).divide(27)), p = f.clone().opposite(), y = l.clone().opposite().pow(3).divide(27), C = p.clone().pow(2).subtract(y.clone().multiply(4)).opposite();
    if (C.isNegative()) {
      const q = f.clone().opposite().add(C.clone().opposite().sqrt()).divide(2).root(3), k = f.clone().opposite().subtract(C.clone().opposite().sqrt()).divide(2).root(3), z = q.clone().add(k).subtract(o.clone().divide(3));
      return [this.#r(z)];
    }
    if (C.isZero()) {
      const q = f.clone().opposite().divide(2).root(3), k = q.clone().opposite().subtract(o.clone().divide(3)), z = q.clone().multiply(2).subtract(o.clone().divide(3));
      return k.isEqual(z) ? [this.#r(k)] : [
        this.#r(z),
        this.#r(k)
      ].sort((X, B) => X.value - B.value);
    }
    if (C.isPositive()) {
      const q = [], k = l.value, z = f.value, X = o.value;
      for (let B = 0; B < 3; B++)
        q.push(2 * Math.sqrt(-k / 3) * Math.cos(Math.acos(3 * z / (2 * k) * Math.sqrt(-3 / k)) / 3 + 2 * Math.PI * B / 3) - X / 3);
      return q.map((B) => this.#s(B)).sort((B, ct) => B.value - ct.value);
    }
    return [];
  }
  #h() {
    const [t, e] = this.#e.getCoefficients(), i = e.opposite().divide(t);
    return [
      this.#r(i)
    ];
  }
  #u() {
    const t = this.#e;
    t.monomByDegree().coefficient.isNegative() && t.opposite();
    const [e, i, s] = t.getCoefficients(), r = i.clone().pow(2).subtract(e.clone().multiply(s).multiply(4));
    if (r.isNegative())
      return [];
    if (r.isSquare()) {
      const o = r.sqrt(), h = i.clone().opposite().subtract(o).divide(e.clone().multiply(2)), c = i.clone().opposite().add(o).divide(e.clone().multiply(2));
      if (o.isZero()) {
        const l = this.#r(h);
        return l.count = 2, [l];
      }
      return [
        this.#r(h),
        this.#r(c)
      ].sort((l, f) => l.value - f.value);
    }
    return this.#d(e, i, r);
  }
  #d(t, e, i) {
    const s = t.clone().multiply(2), r = new $();
    r.fraction = e.clone().opposite().divide(s.clone()), r.root.radical = i.clone(), r.root.factor = new a().one().divide(s.clone()), r.exact = !0;
    const o = new $();
    return o.fraction = e.clone().opposite().divide(s.clone()), o.root.radical = i.clone(), o.root.factor = new a().one().divide(s.clone()).opposite(), o.exact = !0, [r, o].sort((h, c) => h.value - c.value);
  }
}
const J = {
  pi: Math.PI,
  e: Math.exp(1)
};
var u = /* @__PURE__ */ ((n) => (n.VARIABLE = "variable", n.COEFFICIENT = "coefficient", n.OPERATION = "operation", n.CONSTANT = "constant", n.FUNCTION = "function", n.FUNCTION_ARGUMENT = "function-argument", n.MONOM = "monom", n.LEFT_PARENTHESIS = "(", n.RIGHT_PARENTHESIS = ")", n))(u || {}), I = /* @__PURE__ */ ((n) => (n.EXPRESSION = "expression", n.POLYNOM = "polynom", n.SET = "set", n.NUMERIC = "numeric", n))(I || {});
function vt(n, t) {
  if (n.length <= 1)
    return n;
  const e = Object.keys(t).filter((p) => t[p].type === u.FUNCTION).map((p) => p);
  e.sort((p, y) => y.length - p.length);
  const i = new RegExp(`^(${e.join("|")})\\(`), s = Object.keys(J);
  s.sort((p, y) => y.length - p.length);
  const r = new RegExp(`^(${s.join("|")})`), o = /^(\d+(\.\d+)?)/;
  let h = "", c, l, f;
  for (e.forEach((p) => {
    if (n.includes(p)) {
      const y = new RegExp(`${p}([0-9.]+)`, "g");
      n = n.replaceAll(y, `${p}($1)`);
    }
  }); n.length > 0; ) {
    if (c = l, f = void 0, e.length > 0 && i.exec(n)) {
      const p = e.find((y) => n.startsWith(y));
      p && (f = p + "(", n = n.slice(p.length + 1), l = u.FUNCTION);
    } else if (s.length > 0 && r.exec(n)) {
      const p = s.find((y) => n.startsWith(y));
      p && (f = p, n = n.slice(p.length), l = u.CONSTANT);
    } else if (o.exec(n)) {
      const p = o.exec(n);
      p && (f = p[0], n = n.slice(p[0].length), l = u.COEFFICIENT);
    } else
      switch (f = n[0], n = n.slice(1), f) {
        case "(":
          l = u.LEFT_PARENTHESIS;
          break;
        case ")":
          l = u.RIGHT_PARENTHESIS;
          break;
        case ",":
          l = u.FUNCTION_ARGUMENT;
          break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
          l = u.OPERATION;
          break;
        default:
          l = u.VARIABLE;
      }
    if (f === void 0 || l === void 0)
      throw new Error("The token is undefined");
    h += xt(c, l), h += f;
  }
  return h;
}
function xt(n, t) {
  return n === void 0 || n === u.OPERATION || t === u.OPERATION || n === u.LEFT_PARENTHESIS || n === u.FUNCTION || n === u.FUNCTION_ARGUMENT || t === u.RIGHT_PARENTHESIS || t === u.FUNCTION_ARGUMENT ? "" : "*";
}
const Et = {
  "^": { precedence: 4, associative: "right", type: u.OPERATION },
  "*": { precedence: 3, associative: "left", type: u.OPERATION },
  "/": { precedence: 3, associative: "left", type: u.OPERATION },
  "+": { precedence: 2, associative: "left", type: u.OPERATION },
  "-": { precedence: 2, associative: "left", type: u.OPERATION }
}, Nt = {
  "^": { precedence: 4, associative: "right", type: u.OPERATION },
  "*": { precedence: 3, associative: "left", type: u.OPERATION },
  "/": { precedence: 3, associative: "left", type: u.OPERATION },
  "+": { precedence: 2, associative: "left", type: u.OPERATION },
  "-": { precedence: 2, associative: "left", type: u.OPERATION },
  "%": { precedence: 3, associative: "right", type: u.OPERATION },
  sin: { precedence: 4, associative: "right", type: u.FUNCTION },
  cos: { precedence: 4, associative: "right", type: u.FUNCTION },
  tan: { precedence: 4, associative: "right", type: u.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: u.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: u.FUNCTION },
  ",": { precedence: 2, associative: "left", type: u.FUNCTION_ARGUMENT }
}, At = {
  "^": { precedence: 4, associative: "right", type: u.OPERATION },
  "*": { precedence: 3, associative: "left", type: u.OPERATION },
  "/": { precedence: 3, associative: "left", type: u.OPERATION },
  "+": { precedence: 2, associative: "left", type: u.OPERATION },
  "-": { precedence: 2, associative: "left", type: u.OPERATION },
  "%": { precedence: 3, associative: "right", type: u.OPERATION },
  sin: { precedence: 4, associative: "right", type: u.FUNCTION },
  cos: { precedence: 4, associative: "right", type: u.FUNCTION },
  tan: { precedence: 4, associative: "right", type: u.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: u.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: u.FUNCTION },
  ln: { precedence: 4, associative: "right", type: u.FUNCTION },
  log: { precedence: 4, associative: "right", type: u.FUNCTION }
}, Ot = {
  "&": { precedence: 3, associative: "left", type: u.OPERATION },
  "|": { precedence: 3, associative: "left", type: u.OPERATION },
  "!": { precedence: 4, associative: "right", type: u.OPERATION },
  "-": { precedence: 2, associative: "left", type: u.OPERATION }
};
class G {
  #t;
  #e = [];
  #i = {};
  #s = [];
  #r;
  constructor(t) {
    this.#t = typeof t > "u" ? I.POLYNOM : t, this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return this.#e;
  }
  get rpnToken() {
    return this.#e.map((t) => t.token);
  }
  tokenConfigInitialization() {
    return this.#t === I.SET ? (this.#i = Ot, this.#r = !1) : this.#t === I.NUMERIC ? (this.#i = At, this.#r = !0) : this.#t === I.EXPRESSION ? (this.#i = Nt, this.#r = !0) : (this.#i = Et, this.#r = !0), this.#s = Object.keys(this.#i).sort((t, e) => e.length - t.length), this.#i;
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(t, e) {
    let i, s;
    if (i = "", s = void 0, t[e] === "(")
      i = "(", s = u.LEFT_PARENTHESIS;
    else if (t[e] === ")")
      i = ")", s = u.RIGHT_PARENTHESIS;
    else if (t[e] === ",")
      i = ",", s = u.FUNCTION_ARGUMENT;
    else {
      for (const r of this.#s)
        if (t.substring(e, e + r.length) === r) {
          i += r, s = this.#i[r].type;
          break;
        }
      for (const r in J)
        if (t.substring(e, e + r.length) === r) {
          i += r, s = u.CONSTANT;
          break;
        }
      if (i === "")
        if (/[0-9.]/.exec(t[e])) {
          const r = /^([0-9.]+)/.exec(t.substring(e));
          i = r ? r[0] : "", s = u.COEFFICIENT;
        } else if (/[a-zA-Z]/.exec(t[e])) {
          const r = /^([a-zA-Z])/.exec(t.substring(e));
          i = r ? r[0] : "", s = u.VARIABLE;
        } else
          console.log("Unidentified token", t[e], t, e), i = t[e], s = u.MONOM;
    }
    if (s === void 0)
      throw new Error(`Token type is undefined for token ${i}`);
    return [i, e + i.length, s];
  }
  /**
   * Parse an expression using the shutting yard tree algorithms
   * @param expr (string) Expression to analyse
   * Returns a RPN list of items.
   * @param uniformize
   */
  parse(t, e) {
    const i = [], s = [];
    let r = "", o = 0, h;
    (e ?? this.#r) && (t = vt(t, this.#i));
    let c = 50, l;
    for (; o < t.length; ) {
      if (c--, c === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([r, o, h] = this.NextToken(t, o), h) {
        case u.MONOM:
        case u.COEFFICIENT:
        case u.VARIABLE:
        case u.CONSTANT:
          i.push({
            token: r,
            tokenType: h
          });
          break;
        case u.OPERATION:
          if (s.length > 0) {
            let f = s[s.length - 1];
            for (l = 50; f.token in this.#i && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (this.#i[r].associative === "left" && this.#i[r].precedence <= this.#i[f.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            this.#i[r].associative === "right" && this.#i[r].precedence < this.#i[f.token].precedence); ) {
              if (l--, l === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (i.push(s.pop() ?? { token: "", tokenType: u.OPERATION }), s.length === 0)
                break;
              f = s[s.length - 1];
            }
          }
          s.push({ token: r, tokenType: h });
          break;
        case u.FUNCTION_ARGUMENT:
          for (l = 50; s[s.length - 1].token !== "(" && s.length > 0; ) {
            if (l--, l === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            i.push(s.pop() ?? { token: r, tokenType: h });
          }
          break;
        case u.LEFT_PARENTHESIS:
          s.push({ token: r, tokenType: h }), t[o] === "-" && i.push({ token: "0", tokenType: u.COEFFICIENT });
          break;
        case u.RIGHT_PARENTHESIS:
          for (l = 50; s[s.length - 1].token !== "(" && s.length > 1; ) {
            if (l--, l === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
              break;
            }
            i.push(s.pop() ?? { token: r, tokenType: h });
          }
          s.pop();
          break;
        case u.FUNCTION:
          s.push({ token: r, tokenType: h });
          break;
        default:
          throw new Error(`Token type ${r} is not handled`);
      }
    }
    return this.#e = i.concat(s.reverse()), this;
  }
}
class Tt {
  _rpn;
  _expression;
  _isValid;
  constructor(t, e) {
    this._expression = t;
    try {
      this._rpn = new G(I.NUMERIC).parse(t, e).rpn;
    } catch (i) {
      throw this._rpn = null, this._isValid = !1, console.warn(i), new Error(`There was a problem parsing: ${t}`);
    }
  }
  get rpn() {
    return this._rpn ?? [];
  }
  get isValid() {
    if (this._isValid === void 0)
      try {
        this.evaluate({ x: 2 });
      } catch {
        this._isValid = !1;
      }
    return this._isValid ?? !1;
  }
  set isValid(t) {
    this._isValid = t;
  }
  get expression() {
    return this._expression;
  }
  evaluate(t) {
    const e = [];
    if (this._rpn === null)
      return this._isValid = !1, 0;
    this._isValid = !0;
    for (const i of this._rpn)
      if (i.tokenType === u.COEFFICIENT)
        if (!isNaN(+i.token))
          e.push(+i.token);
        else {
          const s = i.token.split("/");
          if (s.length !== 2)
            throw this._isValid = !1, new Error("This coefficient is not a fraction");
          e.push(+s[0] / +s[1]);
        }
      else if (i.tokenType === u.VARIABLE && t !== void 0)
        Object.hasOwn(t, i.token) && e.push(+t[i.token]);
      else if (i.tokenType === u.CONSTANT)
        e.push(J[i.token]);
      else if (i.tokenType === u.OPERATION) {
        if (i.token === "*") {
          const s = e.pop(), r = e.pop();
          if (r === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The multiplication factors ${r ?? "a"} or ${s ?? "b"} are not defined`);
          e.push(r * s);
        } else if (i.token === "/") {
          const s = e.pop(), r = e.pop();
          if (r === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The division values ${r ?? "a"} or ${s ?? "b"} are not defined`);
          e.push(r / s);
        } else if (i.token === "+") {
          const s = e.pop(), r = e.pop();
          if (r === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The addition values ${r ?? "a"} or ${s ?? "b"} are not defined`);
          e.push(+r + +s);
        } else if (i.token === "-") {
          const s = e.pop(), r = e.pop() ?? 0;
          if (s === void 0)
            throw this._isValid = !1, new Error("The subtraction value b is  not defined");
          e.push(r - s);
        } else if (i.token === "^") {
          const s = e.pop(), r = e.pop();
          if (r === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The base value ${r ?? "a"} or exponent ${s ?? "b"} are not defined`);
          e.push(Math.pow(r, s));
        }
      } else if (i.tokenType === u.FUNCTION) {
        const s = e.pop();
        if (s === void 0)
          throw this._isValid = !1, new Error(`The parameters for ${i.token} is not defined`);
        if (i.token === "sin")
          e.push(Math.sin(s));
        else if (i.token === "cos")
          e.push(Math.cos(s));
        else if (i.token === "tan")
          e.push(Math.tan(s));
        else if (i.token === "sqrt")
          e.push(Math.sqrt(s));
        else if (i.token === "nthrt") {
          const r = e.pop();
          if (r === void 0)
            throw this._isValid = !1, new Error("The nthrt function requires two parameters");
          s % 2 === 0 && r < 0 ? e.push(NaN) : e.push((r < 0 ? -1 : 1) * Math.pow(Math.abs(r), 1 / s));
        } else i.token === "ln" ? e.push(Math.log(s)) : i.token === "log" && e.push(Math.log10(s));
      }
    if (e.length === 1)
      return this._numberCorrection(e[0]);
    throw new Error(`There was a problem parsing: ${this._expression}`);
  }
  _numberCorrection(t, e = 8) {
    return +t.toFixed(e);
  }
}
class m {
  #t;
  #e;
  constructor(t) {
    return this.#t = new a().zero(), this.#e = {}, t !== void 0 && this.parse(t), this;
  }
  // -----------------------------------------
  /**
   * Parse a string to a monom. The string may include fraction.
   * @param inputStr
   */
  parse(t) {
    return this.#t = new a(), this.#e = {}, t instanceof m ? (this.#t = t.#t.clone(), this.#i(t), this) : t instanceof a ? (this.#t = t.clone(), this) : typeof t == "number" ? (this.#t = new a(t), this) : (isNaN(Number(t)) ? this.#r(t) : this.#t = new a(Number(t)), this);
  }
  /**
   * Clone the current Monom.
   */
  clone = () => {
    const t = new m();
    t.coefficient = this.#t.clone();
    for (const e in this.#e)
      t.setLetter(e, this.#e[e].clone());
    return t;
  };
  /**
   * Get the tex output of the monom
   */
  get tex() {
    let t = "";
    const e = Object.keys(this.#e).sort();
    for (const i of e)
      this.#e[i].isNotZero() && (t += i, this.#e[i].isNotEqual(1) && (t += `^{ ${this.#e[i].tfrac.tex} }`));
    return t === "" ? this.#t.value != 0 ? this.#t.frac.tex : "0" : this.#t.value === 1 ? t : this.#t.value === -1 ? `-${t}` : this.#t.value === 0 ? "0" : `${this.#t.frac.tex}${t}`;
  }
  // Display getter
  /**
   * This display getter is to be used in the polynom display getter
   */
  get display() {
    let t = "";
    const e = Object.keys(this.#e).sort();
    for (const i of e)
      this.#e[i].isNotZero() && (t += i, this.#e[i].isNotEqual(1) && (t += `^(${this.#e[i].display})`));
    return t === "" ? this.#t.value != 0 ? this.#t.display : "" : this.#t.value === 1 ? t : this.#t.value === -1 ? `-${t}` : this.#t.value === 0 ? "0" : `${this.#t.display}${t}`;
  }
  static gcd = (...t) => {
    for (const r of t)
      if (r.containsRationalPower())
        return new m().zero();
    const e = new m(), i = x.gcd(...t.map((r) => r.coefficient.numerator)), s = x.lcm(...t.map((r) => r.coefficient.denominator));
    e.coefficient = new a(i, s).reduce();
    for (const r of t) {
      for (const o in e.literal)
        o in r.literal || e.literal[o].zero();
      for (const o in r.literal)
        !e.hasVariable(o) && r.literal[o].isStrictlyPositive() ? e.literal[o] = r.literal[o].clone() : e.literal[o] = new a(Math.min(r.literal[o].value, e.literal[o].value));
    }
    return e;
  };
  /**
   * Multiply two monoms and return a NEW monom.
   * @param monoms
   */
  static xMultiply = (...t) => {
    const e = new m().one();
    for (const i of t)
      e.multiply(i);
    return e;
  };
  /**
   * Add all similar monoms. If they aren't similar, they are simply skipped.
   * @param M (Monom[]) The monoms to add.
   */
  add = (...t) => {
    for (const e of t) {
      const i = e instanceof m ? e : new m(e);
      this.isSameAs(i) ? (this.isZero() && this.#i(i), this.#t.add(i.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", i.display);
    }
    return this;
  };
  /**
   * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
   * @returns {Fraction}
   */
  get coefficient() {
    return this.#t;
  }
  /**
   * Set the coefficient \\(k\\) value of the monom
   * @param {Fraction | number | string} F
   */
  set coefficient(t) {
    this.#t = new a(t);
  }
  containsRationalPower = () => Object.values(this.#e).some((t) => t.isRational());
  /**
   * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
   * @param letter (string) Letter to get to degree (power)
   */
  degree = (t) => this.variables.length === 0 ? new a().zero() : t === void 0 ? Object.values(this.#e).reduce((e, i) => e.clone().add(i)) : this.hasVariable(t) ? this.#e[t].clone() : new a().zero();
  /**
   * Derivative the monom
   * @param letter
   */
  derivative = (t = "x") => {
    if (this.hasVariable(t)) {
      const e = this.#e[t].clone(), i = this.clone();
      return i.#e[t].subtract(1), i.#t.multiply(new a(e.clone())), i;
    } else
      return new m().zero();
  };
  /**
   * Divide the current monoms by multiple monoms
   * @param M (Monom[])
   */
  divide = (...t) => {
    for (const e of t) {
      const i = e instanceof m ? e : new m(e);
      this.#t.divide(i.coefficient);
      for (const s in i.literal)
        this.#e[s] = this.hasVariable(s) ? this.#e[s].subtract(i.literal[s]) : i.literal[s].clone().opposite(), this.#e[s].isZero() && this.removeVariable(s);
    }
    return this;
  };
  get dividers() {
    if (!this.coefficient.isRelative())
      return [this.clone()];
    if (this.containsRationalPower())
      return [this.clone()];
    if (this.coefficient.numerator > 1e6)
      return [this.clone()];
    const t = x.dividers(Math.abs(this.coefficient.numerator));
    let e = [];
    for (const s in this.literal)
      e = this._getLiteralDividers(e, s);
    const i = [];
    if (e.length > 0 && t.length > 0)
      for (const s of t)
        for (const r of e) {
          const o = new m();
          o.coefficient = new a(s), o.literal = r, i.push(o);
        }
    else if (t.length === 0)
      for (const s of e) {
        const r = new m();
        r.coefficient = new a().one(), r.literal = s, i.push(r);
      }
    else
      for (const s of t) {
        const r = new m();
        r.coefficient = new a(s), i.push(r);
      }
    return i.length === 0 ? [new m().one()] : i;
  }
  /**
   * Evaluate a monom. Each setLetter must be assigned to a Fraction.
   * @param values    Dictionary of <setLetter: Fraction>
   * @param asNumeric
   */
  evaluate = (t, e) => {
    if (e === !0) {
      if (t instanceof a)
        return this.#s(t.value);
      if (typeof t == "number")
        return this.#s(t);
      if (typeof t == "object") {
        const s = {};
        for (const r in t)
          s[r] = new a(t[r]).value;
        return this.#s(s);
      }
    }
    const i = this.coefficient.clone();
    if (typeof t == "number" || t instanceof a) {
      const s = {};
      return s[this.variables[0]] = new a(t), this.evaluate(s);
    }
    if (typeof t == "object") {
      if (this.variables.length === 0)
        return this.coefficient;
      for (const s in this.#e) {
        const r = new a(t[s]);
        i.multiply(r.pow(this.#e[s]));
      }
    }
    return i;
  };
  // -------------------------------------
  /**
   * Determine if a monom contains a setLetter in it's literal part
   * @param letter
   */
  hasVariable = (t) => Object.hasOwn(this.#e, t ?? "x");
  integrate(t, e, i) {
    const s = this.primitive(i);
    return s.evaluate(e).subtract(s.evaluate(t));
  }
  inverse = () => {
    this.#t.opposite();
    for (const t in this.#e)
      this.#e[t].opposite();
    return this;
  };
  isDivisible = (t) => {
    if (t.degree().isStrictlyPositive()) {
      for (const e of t.variables)
        if (!this.degree(e).isGeq(t.degree(e)))
          return !1;
    }
    return this.coefficient.isRational() || t.coefficient.isRational() ? !0 : this.coefficient.clone().divide(t.coefficient).isRelative();
  };
  /**
   * Determine if two monoms are equals
   * @param M
   */
  isEqual = (t) => this.isSameAs(t) && this.#t.isEqual(t.coefficient);
  isLiteralSquare = () => {
    for (const t in this.literal)
      if (this.literal[t].isRational() || this.literal[t].isEven())
        return !1;
    return !0;
  };
  /**
   * Determine if the monom is one
   */
  isOne = () => this.#t.value === 1 && this.variables.length === 0;
  /**
   * Determine if two monoms are similar
   * @param M
   */
  isSameAs = (t) => {
    const e = this.variables, i = t.variables, s = e.concat(i.filter((r) => !e.includes(r)));
    if (this.isZero() || t.isZero() || e.length === 0 && i.length === 0)
      return !0;
    if (e.length !== i.length)
      return !1;
    if (!this.isZero() && !t.isZero()) {
      for (const r of s)
        if (!this.hasVariable(r) || !t.hasVariable(r) || !this.#e[r].isEqual(t.literal[r]))
          return !1;
    }
    return !0;
  };
  isSquare = () => this.coefficient.isSquare() ? this.isLiteralSquare() : !1;
  /**
   * Determine if the monom is null
   */
  isZero = () => this.#t.value === 0;
  /**
   * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
   * @returns {literalType}
   */
  get literal() {
    return this.#e;
  }
  /**
   * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
   * @param {literalType<Fraction>} L
   */
  set literal(t) {
    this.#e = t;
  }
  /**
   * Set the literal part of the monom from a string
   * @param inputStr  String like x^2y^3
   */
  set literalStr(t) {
    for (const e of [...t.matchAll(/([a-z])\^([+-]?[0-9]+)/g)])
      e[1] in this.#e || (this.#e[e[1]] = new a().zero()), this.#e[e[1]].add(+e[2]);
    for (const e of [...t.matchAll(/([a-z](?!\^))/g)])
      e[1] in this.#e || (this.#e[e[1]] = new a().zero()), this.#e[e[1]].add(1);
  }
  /**
   * Multiple multiple monoms to the current monom
   * @param M (Monom[]) The monoms to multiply to.
   */
  multiply = (...t) => {
    for (const e of t) {
      const i = e instanceof m ? e : new m(e);
      this.#t.multiply(i.coefficient);
      for (const s in i.literal)
        this.hasVariable(s) ? this.#e[s].add(i.literal[s]) : this.#e[s] = i.literal[s].clone();
    }
    return this;
  };
  /**
   * Create a one value monom
   */
  one = () => (this.#t = new a().one(), this.#e = {}, this);
  /**
   * Get the opposite
   * Returns a monom.
   */
  opposite = () => (this.#t.opposite(), this);
  get plotFunction() {
    let t = "";
    const e = Object.keys(this.#e).sort();
    for (const i of e)
      this.#e[i].isNotZero() && (t += (t === "" ? "" : "*") + i, this.#e[i].isNotEqual(1) && (t += `^(${this.#e[i].display})`));
    return t === "" ? this.#t.value != 0 ? this.#t.display : "" : this.#t.value === 1 ? t : this.#t.value === -1 ? `-${t}` : this.#t.value === 0 ? "0" : `${this.#t.display}*${t}`;
  }
  /**
   * Get the pow of a monom.
   * @param nb (number) : Mathematical pow
   */
  pow = (t) => {
    this.#t.pow(t);
    for (const e in this.#e)
      this.#e[e].multiply(t);
    return this;
  };
  primitive = (t = "x") => {
    const e = this.clone();
    let i;
    return e.hasVariable(t) ? (i = e.degree(t).clone().add(1), e.coefficient = e.coefficient.clone().divide(i), e.setLetter(t, i)) : (e.coefficient.isZero() && (e.coefficient = new a().one()), e.setLetter(t, 1)), e;
  };
  reduce = () => {
    this.coefficient.reduce();
    for (const t in this.#e)
      this.#e[t].isZero() && this.removeVariable(t);
    return this;
  };
  removeVariable(t) {
    delete this.#e[t];
  }
  /**
   * Get the nth-root of the monom
   */
  root = () => {
    throw new Error("Method not implemented.");
  };
  /**
   * Set the power of a particular setLetter
   * @param letter (string) Letter to change
   * @param pow (number) Power of the setLetter (must be positive integer.
   */
  setLetter = (t, e) => e instanceof a ? (this.hasVariable(t) && e.isZero() && this.removeVariable(t), this.#e[t] = e.clone(), this) : this.setLetter(t, new a(e));
  /**
   * Return the square root of a monom
   */
  sqrt = () => {
    if (this.isSquare()) {
      this.#t.sqrt();
      for (const t in this.#e)
        this.#e[t].clone().divide(2);
    }
    return this;
  };
  /**
   * Subtract multiple monoms
   * @param M (Monom[]) The monoms to subtract
   */
  subtract = (...t) => {
    for (const e of t) {
      const i = e instanceof m ? e : new m(e);
      this.isSameAs(i) ? (this.isZero() && this.#i(i), this.#t.add(i.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", i.display);
    }
    return this;
  };
  // Getter helpers.
  /**
   * Get the variables letters
   */
  get variables() {
    const t = [];
    return Object.entries(this.literal).forEach(
      ([e, i]) => {
        i.isZero() || t.push(e);
      }
    ), t.sort(), t;
  }
  /**
   * Create a zero value monom
   */
  zero = () => (this.#t = new a().zero(), this.#e = {}, this);
  #i(t) {
    for (const e in t.literal)
      this.#e[e] = t.literal[e].clone();
  }
  #s = (t) => {
    let e = this.coefficient.value;
    if (typeof t == "number") {
      const i = {}, s = this.variables[0];
      return i[s] = t, this.#s(i);
    }
    if (t instanceof a) {
      const i = {};
      return i[this.variables[0]] = new a(t).value, this.#s(i);
    }
    if (typeof t == "object") {
      if (this.variables.length === 0)
        return this.coefficient.value;
      for (const i in this.#e) {
        const s = t[i];
        s instanceof a ? e *= s.value ** this.#e[i].value : e *= s ** this.#e[i].value;
      }
    }
    return e;
  };
  #r = (t) => {
    const i = new G().parse(t).rpn, s = [];
    if (i.length === 0)
      return this.zero(), this;
    if (i.length === 1) {
      const r = i[0];
      return this.one(), r.tokenType === u.COEFFICIENT ? this.coefficient = new a(r.token) : r.tokenType === u.VARIABLE && this.setLetter(r.token, 1), this;
    } else
      for (const r of i)
        this.#n(s, r);
    return this.one(), this.multiply(s[0]), this;
  };
  #n = (t, e) => {
    let i, s, r, o, h;
    if (e.tokenType === u.COEFFICIENT)
      t.push(new m(new a(e.token)));
    else if (e.tokenType === u.VARIABLE) {
      const c = new m().one();
      c.setLetter(e.token, 1), t.push(c.clone());
    } else if (e.tokenType === u.OPERATION)
      switch (e.token) {
        case "-":
          s = t.pop() ?? new m().zero(), i = t.pop() ?? new m().zero(), t.push(i.subtract(s));
          break;
        case "*":
          s = t.pop() ?? new m().one(), i = t.pop() ?? new m().one(), t.push(i.multiply(s));
          break;
        case "/":
          s = t.pop() ?? new m().one(), i = t.pop() ?? new m().one(), t.push(i.divide(s));
          break;
        case "^": {
          h = t.pop()?.coefficient ?? new a().one(), r = t.pop() ?? new m().one(), o = r.variables[0], o && r.setLetter(o, h), t.push(r);
          break;
        }
      }
  };
  _getLiteralDividers(t, e) {
    const i = [];
    for (let s = 0; s <= this.literal[e].value; s++)
      if (t.length === 0) {
        const r = {};
        r[e] = new a(s), i.push(r);
      } else
        for (const r of t) {
          const o = {};
          for (const h in r)
            o[h] = r[h];
          o[e] = new a(s), i.push(o);
        }
    return i;
  }
}
function st(n, t) {
  if (!Number.isSafeInteger(t))
    throw new Error("Can only raise item by an integer");
  if (t < 0)
    throw new Error("Can only raise item by a positive integer");
  if (t === 0)
    return n.one();
  const e = n.clone();
  for (let i = 1; i < t; i++)
    n.multiply(e);
  return n;
}
class d {
  #t = "x";
  #e;
  #i;
  #s;
  #r = !1;
  constructor(t, ...e) {
    return this.#i = [], this.#e = [], this.#s = [], t !== void 0 && this.parse(t, ...e), this;
  }
  /**
   * Parse a string to a polynom.
   * @param inputStr
   * @param values
   */
  parse = (t, ...e) => {
    if (this.#i = [], this.#e = [], typeof t == "string")
      return this.#m(t, ...e);
    if ((typeof t == "number" || t instanceof a || t instanceof m) && e.length === 0)
      this.#i.push(new m(t));
    else if (t instanceof m && e.length > 0)
      this.#i.push(new m(t)), e.forEach((i) => {
        this.#i.push(new m(i));
      });
    else if (t instanceof d)
      for (const i of t.monoms)
        this.#i.push(i.clone());
    return this;
  };
  /**
   * Clone the polynom
   */
  clone = () => {
    const t = new d(), e = [];
    for (const i of this.#i)
      e.push(i.clone());
    return t.monoms = e, t;
  };
  get tex() {
    return this.#c("tex");
  }
  get display() {
    return this.#c();
  }
  static xMultiply(...t) {
    const e = new d().one();
    return t.forEach((i) => {
      e.multiply(i);
    }), e;
  }
  add = (...t) => {
    for (const e of t)
      e instanceof d ? this.#i = this.#i.concat(e.monoms) : e instanceof m ? this.#i.push(e.clone()) : typeof e == "number" && Number.isSafeInteger(e) ? this.#i.push(new m(e.toString())) : this.#i.push(new m(e));
    return this.reduce();
  };
  commonMonom = () => {
    const t = new m().one(), e = this.gcdNumerator(), i = this.gcdDenominator(), s = this.degree();
    t.coefficient = new a(e, i);
    for (const r of this.variables) {
      t.setLetter(r, s);
      for (const o of this.#i)
        if (t.setLetter(r, a.min(o.degree(r), t.degree(r))), t.degree(r).isZero())
          break;
    }
    return t;
  };
  degree = (t) => {
    let e = new a().zero();
    for (const i of this.#i)
      e = a.max(i.degree(t).value, e);
    return e;
  };
  derivative = (t) => {
    const e = new d();
    for (const i of this.#i)
      e.add(i.derivative(t));
    return e.reduce();
  };
  divide = (t) => {
    if (t instanceof a)
      return this.#o(t);
    if (typeof t == "number" && Number.isSafeInteger(t))
      return this.#a(t);
    if (t instanceof m)
      return this.divide(new d(t));
    if (t instanceof d) {
      if (t.monoms.length === 1 && t.variables.length === 0)
        return this.#o(t.monoms[0].coefficient);
      {
        const { quotient: e, reminder: i } = this.euclidean(t);
        if (i.isZero())
          return this.#i = e.monoms, this;
      }
    } else if (typeof t == "string")
      return this.divide(new d(t));
    throw new Error(`Cannot divide by ${t}`);
  };
  empty = () => (this.#i = [], this);
  /**
   * Divide the current polynom by another polynom.
   * @param P
   * returns {quotient: Polynom, reminder: Polynom}
   */
  euclidean = (t) => {
    const e = t.variables[0], i = new d().zero(), s = this.clone().reorder(e);
    if (t.variables.length === 0)
      return {
        quotient: this.clone().divide(t).reduce(),
        reminder: new d().zero()
      };
    const r = t.monomByDegree(void 0, e), o = t.degree(e);
    let h, c = this.degree(e).value * 2;
    for (; s.degree(e).isGeq(o) && c > 0 && (c--, h = s.monomByDegree(void 0, e).clone().divide(r), !(!h.isZero() && (i.add(h), s.subtract(t.clone().multiply(h)).reduce(), h.degree(e).isZero()))); )
      ;
    return i.reduce(), s.reduce(), { quotient: i, reminder: s };
  };
  evaluate = (t, e) => {
    if (e)
      return this.#l(t);
    const i = new a().zero();
    return this.#i.forEach((s) => {
      i.add(s.evaluate(t, e));
    }), i;
  };
  // -------------------------------------
  /**
   * Factorize a polynom and store the best results in factors.
   * @param letter
   * TODO: Handle other letter than 'x'.
   */
  factorize = (t) => {
    this.#e = [];
    let e = this.clone().reorder();
    const i = e.commonMonom();
    e.monomByDegree().coefficient.isStrictlyNegative() && i.opposite(), i.isOne() || (this.#e.push(new d(i)), e = e.euclidean(this.#e[0]).quotient);
    const s = new P(e).solve();
    if (s.length === 0)
      return this.#e = [this.clone()], this.#e;
    if (s.forEach((o) => {
      if (o.exact && o.root.isZero())
        for (let h = 0; h < o.count; h++)
          o.fraction.isRational() ? this.#e.push(new d().fromCoefficients(o.fraction.denominator, -o.fraction.numerator)) : this.#e.push(new d().fromCoefficients(1, o.fraction.clone().opposite()));
    }), this.#e.map((o) => o.degree().value).reduce((o, h) => o + h, 0) < this.degree().value) {
      const o = d.xMultiply(...this.#e);
      this.#e.push(this.clone().divide(o));
    }
    return this.#e;
  };
  get factors() {
    return this.#e.length === 0 && !this.isZero() ? this.factorize() : this.#e;
  }
  fromCoefficients(...t) {
    this.#i = [];
    const e = this.#t ?? "x";
    return t.reverse().forEach((i, s) => {
      const r = new m();
      r.coefficient = new a(i), r.setLetter(e, s), this.#i.push(r);
    }), this.reorder();
  }
  gcdDenominator = () => x.gcd(...this.getDenominators());
  gcdNumerator = () => x.gcd(...this.getNumerators());
  getCoefficients() {
    const t = this.clone().reorder(), e = this.degree().value + 1, i = new Array(e).fill(new a(0));
    return t.monoms.forEach((s) => {
      const r = e - s.degree().value - 1;
      i[r] = s.coefficient.clone();
    }), i;
  }
  // Next functions are used for for commonMonom, which is used in the factorize method.
  getDenominators = () => {
    const t = [];
    for (const e of this.#i)
      t.push(e.coefficient.denominator);
    return t;
  };
  getNumerators = () => {
    const t = [];
    for (const e of this.#i)
      t.push(e.coefficient.numerator);
    return t;
  };
  getZeroes = () => this.degree().isZero() ? [] : (this.roots = new P(this.clone()).solve(), this.roots);
  hasVariable(t) {
    return this.variables.includes(t);
  }
  integrate = (t, e, i = "x") => {
    const s = this.primitive(i), r = {}, o = {};
    return r[i] = new a(t), o[i] = new a(e), s.evaluate(o).subtract(s.evaluate(r));
  };
  inverse() {
  }
  isDeveloped = (t) => {
    let e;
    const i = t.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
    if (i.includes("(") || i.includes(")"))
      return !1;
    try {
      e = new d(t);
    } catch {
      return !1;
    }
    return !!this.isEqual(e);
  };
  isDividableBy = (t) => {
    if (t.degree().isOne()) {
      const e = t.getZeroes()[0];
      return e.exact ? this.evaluate(e.fraction).isZero() : !1;
    } else {
      const { reminder: e } = this.euclidean(t);
      return e.isZero();
    }
  };
  isEqual = (t) => this.#n(t, "=");
  get isMultiVariable() {
    return this.#i.some((t) => t.variables.length > 1);
  }
  isOne() {
    return this.#i.length === 1 && this.#i[0].coefficient.isOne() && this.degree().isZero();
  }
  isOppositeAt = (t) => this.#n(t.clone().opposite(), "=");
  isSameAs = (t) => this.#n(t, "same");
  isZero() {
    return this.#i.length === 1 && this.#i[0].coefficient.isZero() || this.#i.length === 0;
  }
  lcmDenominator = () => x.lcm(...this.getDenominators());
  lcmNumerator = () => x.lcm(...this.getNumerators());
  get length() {
    return this.#i.length;
  }
  letters = () => {
    let t = /* @__PURE__ */ new Set();
    for (const e of this.#i)
      t = /* @__PURE__ */ new Set([...t, ...e.variables]);
    return [...t];
  };
  limitToInfinity = (t) => {
    const e = this.monomByDegree(void 0, t), i = e.coefficient.sign(), s = e.degree(t);
    return s.isStrictlyPositive() ? i === 1 ? new a().infinite() : new a().infinite().opposite() : s.isZero() ? e.coefficient : new a().zero();
  };
  limitToNegativeInfinity = (t) => {
    const e = this.monomByDegree(void 0, t), i = e.coefficient.sign(), s = e.degree(t);
    return s.isStrictlyPositive() ? i === -1 ? new a().infinite() : new a().infinite().opposite() : s.isZero() ? e.coefficient : new a().zero();
  };
  monomByDegree = (t, e) => {
    if (t === void 0)
      return this.monomByDegree(this.degree(e), e);
    const i = this.clone().reduce();
    for (const s of i.#i)
      if (s.degree(e).isEqual(t))
        return s.clone();
    return new m().zero();
  };
  // Used in LinearSystem.tex
  monomByLetter = (t) => {
    const e = this.clone().reduce();
    for (const i of e.#i)
      if (i.hasVariable(t))
        return i.clone();
    return new m().zero();
  };
  // ------------------------------------------
  get monoms() {
    return this.#i;
  }
  set monoms(t) {
    this.#i = t;
  }
  monomsByDegree = (t, e) => {
    if (t === void 0)
      return this.monomsByDegree(this.degree(e));
    const i = [], s = this.clone().reduce();
    for (const r of s.#i)
      r.degree(e).isEqual(t) && i.push(r.clone());
    return i;
  };
  multiply = (t) => {
    if (t instanceof d)
      return this.#p(t);
    if (t instanceof a)
      return this.#h(t);
    if (t instanceof m)
      return this.#d(t);
    if (Number.isSafeInteger(t) && typeof t == "number")
      return this.#u(t);
    if (typeof t == "string")
      try {
        const e = new a(t);
        return this.#h(e);
      } catch {
        throw new Error("Cannot multiply by this value.");
      }
    throw new Error(`Cannot multiply by this value: ${t}`);
  };
  get numberOfVars() {
    return this.variables.length;
  }
  one = () => (this.#i = [], this.#i.push(new m().one()), this);
  // ------------------------------------------
  opposite = () => (this.#i = this.#i.map((t) => t.opposite()), this);
  get plotFunction() {
    return this.#c("tex", !1, !1, !0);
  }
  pow = (t) => st(this, t).reduce();
  primitive = (t) => {
    const e = new d();
    for (const i of this.#i)
      e.add(i.primitive(t));
    return e;
  };
  reduce = () => {
    let t = 0;
    for (; t < this.#i.length; ) {
      for (let e = t + 1; e < this.#i.length; e++)
        this.#i[t].isSameAs(this.#i[e]) && (this.#i[t].add(this.#i[e]), this.#i.splice(e, 1), this.#i[t].isZero() && (this.#i[t] = new m().zero()), e--);
      t++;
    }
    this.#i = this.#i.filter((e) => !e.coefficient.isZero());
    for (const e of this.#i)
      e.coefficient.reduce();
    return this.length === 0 ? new d().zero() : this.reorder();
  };
  reorder = (t = "x", e = !1) => {
    const i = this.variables.filter((s) => s !== t);
    return this.#i.sort(function(s, r) {
      const o = s.degree(t).value, h = r.degree(t).value;
      if (o !== h)
        return e ? o - h : h - o;
      if (i.length > 0)
        for (const c of i) {
          const l = s.degree(c).value, f = r.degree(c).value;
          if (l !== f)
            return e ? l - f : f - l;
        }
      return 0;
    }), this;
  };
  /**
   * Replace a variable (letter) by a polynom.
   * @param letter
   * @param P
   */
  replaceBy = (t, e) => {
    let i;
    const s = new d().zero();
    for (const r of this.monoms)
      !r.hasVariable(t) || r.literal[t].isZero() ? s.add(r.clone()) : (i = r.literal[t].clone(), r.removeVariable(t), s.add(e.clone().pow(Math.abs(i.numerator)).multiply(r)));
    return this.#i = s.reduce().monoms, this;
  };
  // ------------------------------------------
  root() {
    throw new Error("Cannot take the root from a polynom");
  }
  get roots() {
    return this.#r ? this.#s : this.getZeroes();
  }
  set roots(t) {
    this.#r = !0, this.#s = t;
  }
  setVariable(t) {
    return this.#t = t, this;
  }
  sqrt() {
    throw new Error("Cannot take the square root from a polynom");
  }
  subtract = (...t) => {
    for (const e of t)
      e instanceof d ? this.add(e.clone().opposite()) : e instanceof m ? this.#i.push(e.clone().opposite()) : this.#i.push(new m(e).opposite());
    return this.reduce();
  };
  tableOfSigns() {
    const t = this.roots;
    let e = new Array(2 * t.length + 1).fill("").map((i, s) => s % 2 === 0 ? "" : "z");
    if (e.length === 1) {
      const [i] = this.getCoefficients().map((s) => s.value);
      e = j(e, "", i > 0 ? "+" : "-");
    } else if (this.degree().isOne()) {
      const [i] = this.getCoefficients().map((s) => s.value);
      e[0] = i > 0 ? "-" : "+", e[1] = "z", e[2] = i > 0 ? "+" : "-";
    } else
      [
        t[0].value - 1,
        ...t.map((s, r) => r === t.length - 1 ? t[r].value + 1 : (t[r].value + t[r + 1].value) / 2)
      ].forEach((s, r) => {
        const o = this.evaluate({ x: s }, !0);
        e[r * 2] = o > 0 ? "+" : "-";
      });
    return { roots: t, signs: e };
  }
  get value() {
    if (this.degree().isZero())
      return this.monoms[0]?.coefficient.value ?? 0;
  }
  get variables() {
    let t = [];
    for (const e of this.#i)
      t = t.concat(e.variables);
    return t = [...new Set(t)], t.sort(), t;
  }
  /**
   * Set the polynom to zero.
   * @returns {this}
   */
  zero = () => (this.#i = [], this.#i.push(new m().zero()), this);
  get zeroes() {
    return this.getZeroes();
  }
  #n = (t, e) => {
    e ??= "=";
    const i = this.clone().reduce().reorder(), s = t.clone().reduce().reorder();
    switch (e) {
      case "=":
        return i.length !== s.length || !i.degree().isEqual(s.degree()) ? !1 : i.monoms.every((r, o) => r.isEqual(s.monoms[o]));
      case "same":
        return i.length !== s.length || !i.degree().isEqual(s.degree()) ? !1 : i.monoms.every((r, o) => r.isSameAs(s.monoms[o]));
      default:
        return !1;
    }
  };
  #o = (t) => {
    for (const e of this.#i)
      e.coefficient.divide(t);
    return this;
  };
  #a = (t) => {
    const e = new a(t);
    for (const i of this.#i)
      i.coefficient.divide(e);
    return this;
  };
  #l = (t) => {
    let e = 0;
    return this.#i.forEach((i) => {
      e += i.evaluate(t, !0);
    }), e;
  };
  #c = (t, e, i, s) => {
    let r = "";
    for (const o of this.#i) {
      if (o.coefficient.value === 0)
        continue;
      let h;
      s ? h = o.plotFunction : h = t === "tex" ? o.tex : o.display, r += `${o.coefficient.sign() === 1 && (r !== "" || e === !0) ? "+" : ""}${h}`;
    }
    return i === !0 && this.length > 1 && (t === "tex" ? r = `\\left( ${r} \\right)` : r = `(${r})`), r === "" && (r = "0"), r;
  };
  #f = (t, e, i) => {
    const s = t.monoms[0].dividers, r = t.monoms[t.monoms.length - 1].dividers, o = [];
    return s.forEach((h) => {
      h.degree(i).isLeq(e) && r.forEach((c) => {
        h.degree(i).isNotEqual(c.degree(i)) && (o.push(new d(h, c)), o.push(new d(h, c.clone().opposite())));
      });
    }), o;
  };
  #h = (t) => {
    for (const e of this.#i)
      e.coefficient.multiply(t);
    return this.reduce();
  };
  #u = (t) => this.#h(new a(t));
  #d = (t) => {
    for (const e of this.#i)
      e.multiply(t);
    return this.reduce();
  };
  #p = (t) => {
    const e = [];
    for (const i of this.#i)
      for (const s of t.monoms)
        e.push(m.xMultiply(i, s));
    return this.#i = e, this.reduce();
  };
  #m(t, ...e) {
    if (e.length === 0) {
      if (t !== "" && !isNaN(Number(t))) {
        this.empty();
        const i = new m(Number(t));
        return this.add(i), this;
      }
      return this.#g(t);
    } else if (/^[a-z]+/.test(t)) {
      this.empty();
      const i = e.map((s) => new a(s));
      if (t.length > 1) {
        const s = t.split("");
        if (s.length < e.length - 2)
          throw new Error("Too many factors for too few variables !");
        let r = 0;
        for (const o of i) {
          const h = new m();
          h.coefficient = o.clone(), h.literalStr = s[r] || "", this.add(h), r++;
        }
      } else {
        let s = i.length - 1;
        for (const r of i) {
          const o = new m();
          o.coefficient = r.clone(), o.literalStr = `${t}^${s}`, this.add(o), s--;
        }
      }
      return this;
    } else
      return this.zero();
  }
  /**
   * Main parse using a shutting yard class
   * @param inputStr
   */
  #g = (t) => {
    const i = new G().parse(t).rpn;
    this.zero();
    const s = [];
    for (const r of i)
      this.#w(s, r);
    return s.length === 1 && this.add(s[0]), this.reorder();
  };
  #w = (t, e) => {
    switch (e.tokenType) {
      case u.COEFFICIENT:
        t.push(new d(e.token));
        break;
      case u.VARIABLE:
        t.push(new d().add(new m(e.token)));
        break;
      case u.CONSTANT:
        console.log("Actually, not supported - will be added later !");
        break;
      case u.OPERATION:
        if (t.length >= 2) {
          const i = t.pop(), s = t.pop();
          if (s === void 0 || i === void 0)
            break;
          if (e.token === "+")
            t.push(s.add(i));
          else if (e.token === "-")
            t.push(s.subtract(i));
          else if (e.token === "*")
            t.push(s.multiply(i));
          else if (e.token === "/")
            i.degree().isStrictlyPositive() ? console.log("divide by a polynom -> should create a rational polynom !") : t.push(s.divide(i.monoms[0].coefficient));
          else if (e.token === "^") {
            if (i.degree().isStrictlyPositive())
              throw new Error("Cannot elevate a polynom with another polynom !");
            if (i.monoms[0].coefficient.isRelative())
              t.push(s.pow(i.monoms[0].coefficient.value));
            else if (s.monoms.length === 1 && s.monoms[0].coefficient.isOne()) {
              for (const r in s.monoms[0].literal)
                s.monoms[0].literal[r].multiply(i.monoms[0].coefficient);
              t.push(s);
            } else
              console.error("Cannot have power with fraction");
          }
        } else if (e.token === "-") {
          const i = t.pop();
          i && t.push(i.opposite());
        } else
          throw new Error("Error parsing the polynom");
        break;
      case u.MONOM:
        console.error("The monom token should not appear here");
        break;
      case u.FUNCTION:
        console.error("The function token should not appear here - might be introduced later.");
        break;
    }
  };
}
class v {
  // Left part of the equation
  #t;
  // Right part of the equation
  #e;
  // Signe of the equation
  #i;
  constructor(t, e, i) {
    if (this.#t = new d().zero(), this.#e = new d().zero(), this.#i = "=", t !== void 0 && e === void 0) {
      if (t instanceof v)
        return t.clone();
      typeof t == "string" && this.parse(t);
    } else t !== void 0 && e !== void 0 && (this.left = new d(t), this.right = new d(e));
    return i !== void 0 && (this.sign = i), this;
  }
  // ------------------------------------------
  parse = (t) => {
    const e = this.#s(t);
    if (e === !1)
      throw new Error("The equation is not valid (no sign found)");
    const i = t.split(e);
    return this.create(new d(i[0]), new d(i[1]), this.#r(e));
  };
  clone = () => new v(this.#t.clone(), this.#e.clone(), this.#i);
  get tex() {
    return `${this.#t.tex}${this.signAsTex}${this.#e.tex}`;
  }
  get display() {
    return `${this.#t.display}${this.signAsTex}${this.#e.display}`;
  }
  static isEquationString(t) {
    return t.includes("=") || t.includes("<") || t.includes(">") || t.includes("<=") || t.includes(">=");
  }
  static makeSolutionsUnique(t, e) {
    const i = [], s = t.filter((r) => i.includes(r.tex) ? !1 : (i.push(r.tex), !0));
    return e === !0 && s.sort((r, o) => r.value - o.value), s;
  }
  /**
   * Add a value to the equation
   * if value is an equation, add the left part to the left part of the equation
   * and the right part to the right part of the equation
   * if value is a string, try to create an equation
   * if it fails, create a polynom and add it to the left and right part of the equation
   * @param value | Polynom | Monom | Fraction | string | monom
   */
  add(t) {
    if (t instanceof v)
      return this.#t.add(t.left), this.#e.add(t.right), this;
    if (typeof t == "string" && !v.isEquationString(t))
      return this.add(new v(t));
    const e = new d(t);
    return this.#t.add(e), this.#e.add(e), this;
  }
  create = (t, e, i) => (this.#t = t, this.#e = e, this.#i = this.#r(i ?? "="), this);
  /**
   * Get the degree of the equation
   * @param letter
   */
  degree = (t) => a.max(this.#t.degree(t), this.#e.degree(t));
  /**
   * divide an equation by a given value (transformed as a fraction)
   *
   * ```
   * 8x+10=6x \vert 2
   * 4x+5=3x
   * ```
   *
   * |>Alternatively with $3x-4$ maybe it's working ?
   * $$\frac{3x}{5}$$
   *
   * @param value
   * @returns {Equation}
   */
  divide = (t) => {
    const e = new a(t);
    return e.isZero() ? this : this.multiply(e.inverse());
  };
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param values
   * @param asNumeric
   */
  evaluate(t, e) {
    const i = this.#t.evaluate(t, e), s = this.#e.evaluate(t, e);
    return e ? i === s : i.isEqual(s);
  }
  // -----------------------------------------------
  /**
   * Determine if the equation contains a variable.
   * @param letter
   */
  hasVariable = (t) => this.variables.includes(t);
  isEqual(t) {
    const e = new v(t);
    return e.left.isEqual(this.#t) && e.right.isEqual(this.#e);
  }
  // -----------------------------------------------
  // Equations operations
  // Equations helpers
  isEqualTo = (t) => {
    const e = t.clone().moveLeft().left, i = this.clone().moveLeft().left;
    return e.isEqual(i) || e.isOppositeAt(i);
  };
  isLinearTo = (t) => {
    const e = t.clone().moveLeft().simplify().left, i = this.clone().moveLeft().simplify().left;
    return e.isEqual(i) || e.isOppositeAt(i);
  };
  /**
   * Determine if the equation contains more than one letter/variable.
   */
  isMultiVariable = () => this.#t.isMultiVariable || this.#e.isMultiVariable;
  /**
   * Reorder the polynom to have only one letter on the left, the rest on the right.
   * @param letter
   */
  isolate = (t) => {
    if (!this.degree(t).isOne() || this.isMultiVariable())
      return !1;
    let e;
    this.#t.subtract(this.#e), this.#e.zero();
    const i = [...this.#t.monoms];
    for (const r of i)
      r.hasVariable(t) || (e = r.clone(), this.#t.subtract(e), this.#e.subtract(e));
    if (this.#t.length !== 1)
      return !1;
    const s = this.#t.monoms[0].coefficient.clone();
    return this.#t.divide(s), this.#e.divide(s), this;
  };
  // Getter and setter
  get left() {
    return this.#t;
  }
  set left(t) {
    this.#t = t;
  }
  // -----------------------------------------------
  letters = () => [.../* @__PURE__ */ new Set([...this.#t.letters(), ...this.#e.letters()])];
  // -----------------------------------------------
  /**
   * Reorder will move all monoms containing a letter on the left, all the other on the right.
   */
  moveLeft = () => (this.#t.subtract(this.#e), this.#e.zero(), this);
  /**
   * Multiple an equation by a fraction value.
   * @param value
   */
  multiply = (t) => {
    const e = new a(t);
    return this.#t.multiply(e), this.#e.multiply(e), this.#i !== "=" && e.sign() === -1 && this.#n(), this;
  };
  get numberOfVars() {
    return this.variables.length;
  }
  opposite = () => (this.#t = this.#t.opposite(), this.#e = this.#e.opposite(), this);
  pow(t) {
    return this.#t.pow(t), this.#e.pow(t), this;
  }
  reduce() {
    return this.moveLeft(), this.#t.reduce(), this.simplify(), this.#t.monoms[0].coefficient.isNegative() && this.multiply(-1), this;
  }
  reorder = (t) => (this.#t.subtract(this.#e), this.#e.zero(), this.#t.reorder(), t ? this : (this.#t.monoms.filter((e) => e.degree().isZero()).forEach((e) => {
    const i = e.clone();
    this.#t.subtract(i), this.#e.subtract(i);
  }), this.#t.reorder(), this.#e.reorder(), this));
  // ------------------------------------------
  replaceBy = (t, e) => (this.#t.replaceBy(t, e), this.#e.replaceBy(t, e), this);
  get right() {
    return this.#e;
  }
  set right(t) {
    this.#e = t;
  }
  // ------------------------------------------
  get sign() {
    return this.#i;
  }
  set sign(t) {
    this.#i = this.#r(t);
  }
  get signAsTex() {
    return this.#i === ">=" ? "\\geq" : this.#i === "<=" ? "\\leq" : this.#i;
  }
  /**
   * Multiply by the lcm denominator and divide by the gcm numerators.
   */
  simplify = () => (this.multiply(x.lcm(...this.#t.getDenominators(), ...this.#e.getDenominators())), this.divide(x.gcd(...this.#t.getNumerators(), ...this.#e.getNumerators())), this);
  // -----------------------------------------------
  solve = () => new P(this.clone()).solve();
  split() {
    return [this.#t.clone(), this.#e.clone()];
  }
  subtract(t) {
    if (t instanceof v)
      return this.#t.subtract(t.left), this.#e.subtract(t.right), this;
    if (typeof t == "string" && !v.isEquationString(t))
      return this.subtract(new v(t));
    const e = new d(t);
    return this.#t.subtract(e), this.#e.subtract(e), this;
  }
  test = (t) => this.left.evaluate(t).isEqual(this.right.evaluate(t));
  get variables() {
    return [...new Set(this.#e.variables.concat(this.#t.variables))];
  }
  #s = (t) => {
    if (t.includes("geq"))
      return t.includes("\\geq") ? "\\geq" : "geq";
    if (t.includes("leq"))
      return t.includes("\\leq") ? "\\leq" : "leq";
    if (t.includes(">="))
      return ">=";
    if (t.includes("=>"))
      return "=>";
    if (t.includes(">"))
      return ">";
    if (t.includes("<="))
      return "<=";
    if (t.includes("=<"))
      return "=<";
    if (t.includes("<"))
      return "<";
    if (t.includes("="))
      return "=";
    throw new Error("The equation is not valid (no sign found)");
  };
  // -----------------------------------------------
  // Equations solving algorithms
  #r = (t) => t === void 0 ? "=" : t.includes("geq") || t.includes(">=") || t.includes("=>") ? ">=" : t.includes(">") ? ">" : t.includes("leq") || t.includes("<=") || t.includes("=<") ? "<=" : t.includes("<") ? "<" : "=";
  #n = () => this.#i === "=" ? this : this.#i.includes("<") ? (this.#i.replace("<", ">"), this) : this.#i.includes(">") ? (this.#i.replace(">", "<"), this) : this;
}
class E {
  #t;
  #e;
  #i;
  #s = !1;
  constructor(t, e) {
    return t instanceof E ? (this.#e = t.polynom.clone(), this.#i = t.power.clone(), e !== void 0 && this.#i.multiply(new a(e))) : t !== void 0 ? (this.#e = new d(t), this.#i = new a(e ?? 1)) : (this.#e = new d(), this.#i = new a(1)), this.#t = 1, this;
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  clone() {
    return new E(this);
  }
  get tex() {
    const t = this.power.numerator, e = this.power.denominator;
    let i, s;
    return this.#t === 0 && e > 1 ? (i = `\\sqrt${e === 2 ? "" : `[ ${e} ]`}{ ${this.polynom.tex} }`, s = t === 1 ? "" : `^{ ${t} }`) : (i = this.#s && this.power.isOne() ? this.polynom.tex : et(this.polynom.tex), s = e === 1 && t === 1 ? "" : `^{ ${this.power.tex} }`), i = `${i}${s}`, this.#t === 0 && t < 0 && (i = `\\frac{ 1 }{ ${i} }`), i;
  }
  get display() {
    const t = this.power.numerator, e = this.power.denominator;
    let i, s;
    return this.#t === 0 && e > 1 ? (i = `${e === 2 ? "sqrt" : `root(${e})`}(${this.polynom.display})`, s = t === 1 ? "" : `^(${t})`) : (i = this.#s && this.power.isOne() ? this.polynom.display : et(this.polynom.display, !1), s = e === 1 && t === 1 ? "" : `^(${this.power.display})`), i = `${i}${s}`, this.#t === 0 && t < 0 && (i = `1/(${i})`), i;
  }
  add() {
    throw new Error("Adding two factors is not possible");
  }
  get asSingle() {
    return this.#s = !0, this;
  }
  degree(t) {
    return this.polynom.degree(t).multiply(this.power);
  }
  derivative() {
    return this.power.isZero() ? [new E("0")] : this.power.isOne() ? [new E(this.polynom.clone().derivative())] : [
      new E(this.power.clone()),
      new E(this.polynom.clone().derivative()),
      new E(this.polynom.clone(), this.power.clone().subtract(1))
    ];
  }
  develop() {
    if (this.power.isNatural())
      return this.polynom.clone().pow(this.power.value);
    throw new Error("The power must be a natural number");
  }
  divide(t) {
    if (t instanceof E && this.isSameAs(t))
      return this.power.subtract(t.power), this;
    const e = new d(t);
    if (this.isSameAs(e))
      return this.power.subtract(1), this;
    throw new Error("The two factors must be the same");
  }
  evaluate(t, e) {
    return e ? this.polynom.evaluate(t, !0) ** this.power.value : this.polynom.evaluate(t).pow(this.power);
  }
  fromPolynom(t) {
    return this.#e = new d(t), this.#i = new a(1), this;
  }
  hasVariable(t) {
    return this.polynom.hasVariable(t);
  }
  inverse() {
    return this.power.opposite(), this;
  }
  isEqual(t) {
    return this.isSameAs(t) && this.power.isEqual(t.power);
  }
  isOne() {
    return this.polynom.isOne() || this.power.isZero();
  }
  isSameAs(t) {
    let e;
    return t instanceof E ? e = t.polynom : t instanceof d ? e = t : e = new d(t), this.polynom.isEqual(e);
  }
  isZero() {
    return this.polynom.isZero();
  }
  multiply(t) {
    if (t instanceof E && this.isSameAs(t))
      return this.power.add(t.power), this;
    const e = new d(t);
    if (this.isSameAs(e))
      return this.power.add(1), this;
    throw new Error("The two factors must be the same");
  }
  one() {
    return this.#e.one(), this.#i.one(), this;
  }
  opposite() {
    throw new Error("Method not implemented.");
  }
  get polynom() {
    return this.#e;
  }
  set polynom(t) {
    this.#e = t;
  }
  pow(t) {
    return this.power.multiply(t), this;
  }
  get power() {
    return this.#i;
  }
  set power(t) {
    this.#i = new a(t);
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    throw new Error("Method not implemented.");
  }
  root(t) {
    return this.power.divide(t), this;
  }
  sqrt() {
    return this.root(2);
  }
  subtract() {
    throw new Error("Subtracting two factors is not possible");
  }
  tableOfSigns() {
    const t = this.power.clone().reduce(), e = this.polynom.tableOfSigns();
    return t.isStrictlyNegative() && (e.signs = j(e.signs, "z", "d")), t.denominator % 2 === 0 ? e.signs = j(e.signs, "-", "h") : t.numerator % 2 === 0 && (e.signs = j(e.signs, "-", "+")), { roots: e.roots, signs: e.signs };
  }
  get variables() {
    return this.polynom.variables;
  }
  get withPower() {
    return this.#t = 1, this;
  }
  get withRoot() {
    return this.#t = 0, this;
  }
  zero() {
    return this.#e.zero(), this.#i.one(), this;
  }
}
var D = /* @__PURE__ */ ((n) => (n[n.ROOT = 0] = "ROOT", n[n.POWER = 1] = "POWER", n))(D || {});
class M {
  #t;
  // Solve steps for TeX output.
  #e = [];
  // Determine the letters in the linear asSystem, usually ['x', 'y']
  #i;
  constructor(...t) {
    return this.#t = [], this.#i = [], t.length > 0 && this.parse(...t), this;
  }
  parse = (...t) => (this.#t = t.map((e) => new v(e)), this.#s(), this);
  clone = () => new M().parse(...this.#t.map((t) => t.clone()));
  get tex() {
    const t = this.clone().reorder();
    return this.buildTex(t.equations);
  }
  get display() {
    return this.tex + "as display";
  }
  static fromMatrix(t, e = "xyz") {
    const i = t[0].length;
    if (t.some((r) => r.length !== i))
      throw new Error("All rows must have the same number of columns");
    const s = e.split("").splice(0, i - 1);
    return new M(
      ...t.map((r) => {
        const o = new d(s.join(""), ...r);
        return new v(o, 0);
      })
    );
  }
  add(t, e) {
    if (t instanceof M) {
      const i = t.equations.length;
      if (i !== this.#t.length)
        throw new Error("The number of equations must be the same");
      for (let s = 0; s < i; s++)
        this.#t[s].add(t.equations[s]);
    } else {
      if (e === void 0 || e < 0 || e >= this.#t.length)
        throw new Error("Index out of range");
      const i = new v(t);
      this.#t[e].add(i);
    }
    return this;
  }
  buildTex = (t, e) => {
    let i, s, r = [];
    const o = [];
    for (const c of t)
      r = r.concat(c.letters());
    r = [...new Set(r)], r.sort();
    for (let c = 0; c < t.length; c++) {
      const l = t[c];
      i = [];
      for (const f of r)
        s = l.left.monomByLetter(f), i.length === 0 ? i.push(s.isZero() ? "" : s.tex) : i.push(s.isZero() ? "" : (s.coefficient.sign() === 1 ? "+" : "") + s.tex);
      if (i.push("="), i.push(l.right.tex), e?.[c] !== void 0) {
        i[i.length - 1] = i[i.length - 1] + " \\phantom{\\quad}";
        for (const f of e[c])
          i.push(`\\ \\cdot\\ ${f.startsWith("-") ? "\\left(" + f + "\\right)" : f}`);
      }
      o.push(i.join("&"));
    }
    let h = 0;
    return e !== void 0 && e.length > 0 && (h = e[0].length), `\\left\\{\\begin{array}{${"r".repeat(r.length)}cl ${"|l".repeat(h)}}${o.join("\\\\ ")}\\end{array}\\right.`;
  };
  degree(t) {
    return a.max(...this.#t.map((e) => e.degree(t)));
  }
  // ------------------------------------------
  get equations() {
    return this.#t;
  }
  set equations(t) {
    this.#t = t, this.#s();
  }
  evaluate(t, e) {
    throw new Error("Method not implemented.");
  }
  hasVariable(t) {
    return this.#i.includes(t);
  }
  isEqual(t) {
    return this.equations.every((e, i) => e.isEqual(t.equations[i]));
  }
  get isSolvable() {
    return this.variables.length === this.#t.length;
  }
  get matrix() {
    return this.#r();
  }
  mergeEquations(t, e) {
    const i = this.equations[t.id].clone().multiply(t.factor), s = this.equations[e.id].clone().multiply(e.factor);
    return i.add(s);
  }
  multiply(t, e) {
    if (Array.isArray(t)) {
      if (t.length !== this.#t.length)
        throw new Error("The number of values must be the same as the number of equations");
      for (let i = 0; i < t.length; i++)
        this.#t[i].multiply(t[i]);
      return this;
    }
    if (e === void 0 || e < 0 || e >= this.#t.length)
      throw new Error("Index out of range");
    return this.#t[e].multiply(t), this;
  }
  reduce() {
    return this.equations.forEach((t) => t.reduce()), this;
  }
  // ------------------------------------------
  reorder = () => {
    for (const t of this.#t)
      t.reorder();
    return this;
  };
  solve() {
    const t = [this.tex], e = this.clone();
    for (; e.variables.length > 1; ) {
      const i = e.variables[e.variables.length - 1], s = new M();
      e.solve_compute_factors(i).slice(0, e.variables.length - 1).forEach((o) => {
        s.equations.push(e.mergeEquations(...o));
      }), e.equations = s.equations, t.push(e.tex), e.reduce(), t.push(e.tex);
    }
    return console.log("\\begin{aligned}" + t.join("\\\\[2em]") + "\\end{aligned}"), [];
  }
  solveMatrix = () => {
    const [t, e] = this.matrix, i = t.map((s, r) => [...s, e[r]]);
    for (let s = 0; s < t.length; s++) {
      let r = i[s][s].clone();
      if (r.isZero()) {
        const o = i.find((h, c) => c > s && !h[s].isZero());
        if (o)
          i[s].forEach((h, c) => h.add(o[c])), r = i[s][s].clone();
        else
          throw new Error("Unsolvable...");
      }
      i[s] = i[s].map((o) => o.divide(r));
      for (let o = 0; o < t.length; o++) {
        if (o === s)
          continue;
        const h = i[o][s].clone().opposite();
        for (let c = 0; c < i[o].length; c++)
          i[o][c].add(i[s][c].clone().multiply(h));
        if (i[o].slice(0, i[o].length - 1).every((c) => c.isZero()))
          return i[o][i[o].length - 1].isZero() ? [new a().infinite()] : [];
      }
    }
    return i.map((s) => s[s.length - 1]);
  };
  solve_compute_factors(t) {
    const e = [], i = this.equations.map((s) => s.left.monomByLetter(t).coefficient.value);
    return i.forEach((s, r) => {
      for (let o = r + 1; o < i.length; o++) {
        const h = x.lcm(s, i[o]), c = s < 0 ? -1 : 1;
        e.push([
          {
            id: r,
            factor: c * h / s
          },
          {
            id: o,
            factor: -c * h / i[o]
          }
        ]);
      }
    }), e.sort((s, r) => Math.abs(s[0].factor) + Math.abs(s[1].factor) - (Math.abs(r[0].factor) + Math.abs(r[1].factor)));
  }
  subtract(t, e) {
    if (t instanceof M) {
      const i = t.equations.length;
      if (i !== this.#t.length)
        throw new Error("The number of equations must be the same");
      for (let s = 0; s < i; s++)
        this.#t[s].subtract(t.equations[s]);
    } else {
      if (e === void 0 || e < 0 || e >= this.#t.length)
        throw new Error("Index out of range");
      const i = new v(t);
      this.#t[e].subtract(i);
    }
    return this;
  }
  get variables() {
    return this.#i;
  }
  set variables(t) {
    const e = typeof t == "string" ? t.split("") : [...t];
    e.sort(), this.#i = e;
  }
  #s = () => (this.#i = this.#t.reduce((t, e) => [.../* @__PURE__ */ new Set([...t, ...e.variables])], []), this.#i.sort(), this);
  #r = () => {
    const t = [], e = [];
    for (const i of this.#t) {
      const s = [], r = i.clone().reorder();
      for (const o of this.variables) {
        const h = r.left.monomByLetter(o);
        s.push(h.coefficient);
      }
      e.push(r.right.monoms[0].coefficient), t.push(s);
    }
    return [t, e];
  };
}
class Ct {
  #t;
  /**
   *
   * @param {string} value (optional) Default polynom to parse on class creation
   */
  constructor(t) {
    return this.#t = [], t !== void 0 && this.parse(t), this;
  }
  parse = (t) => (this.#t = new G(I.SET).parse(t).rpn, this);
  evaluate(t) {
    this.variables.forEach((i) => {
      Object.hasOwn(t, i) || (t[i] = !1);
    });
    const e = [];
    for (const i of this.#t)
      if (console.log(i), i.tokenType === "variable")
        e.push(t[i.token]);
      else if (i.tokenType === "operation")
        if (i.token === "!")
          if (e.length >= 1) {
            const s = e.pop();
            e.push(!s);
          } else
            return !1;
        else {
          const s = e.pop(), r = e.pop();
          if (s !== void 0 && r !== void 0)
            switch (i.token) {
              case "&":
                e.push(s && r);
                break;
              case "|":
                e.push(s || r);
                break;
              case "-":
                return !1;
            }
          else
            return !1;
        }
    return e.length === 1 && e[0];
  }
  get rpn() {
    return this.#t;
  }
  get tex() {
    const t = [];
    for (const e of this.#t)
      if (e.tokenType === "variable")
        t.push(e);
      else
        switch (e.token) {
          case "&":
            if (t.length >= 2) {
              const i = t.pop(), s = t.pop();
              i && s && (s.tokenType === "mix" && (s.token = `( ${s.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), t.push({ token: `${s.token} \\cap ${i.token}`, tokenType: "mix" }));
            }
            break;
          case "|":
            if (t.length >= 2) {
              const i = t.pop(), s = t.pop();
              i && s && (s.tokenType === "mix" && (s.token = `( ${s.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), t.push({ token: `${s.token} \\cup ${i.token}`, tokenType: "mix" }));
            }
            break;
          case "-":
            if (t.length >= 2) {
              const i = t.pop(), s = t.pop();
              i && s && (s.tokenType === "mix" && (s.token = `( ${s.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), t.push({ token: `${s.token} \\setminus ${i.token}`, tokenType: "mix" }));
            }
            break;
          case "!":
            if (t.length >= 1) {
              const i = t.pop();
              i && t.push({ token: `\\overline{ ${i.token} }`, tokenType: "variable" });
            }
            break;
        }
    return t[0].token;
  }
  get variables() {
    return this.#t.filter((t) => t.tokenType === "variable").map((t) => t.token);
  }
  vennAB() {
    return this.#e(
      {
        A: ["A", "AB"],
        B: ["B", "AB"]
      },
      ["A", "B", "AB", "E"]
    );
  }
  vennABC() {
    return this.#e(
      {
        A: ["A", "AB", "AC", "ABC"],
        B: ["B", "AB", "BC", "ABC"],
        C: ["C", "AC", "BC", "ABC"]
      },
      ["A", "B", "C", "AB", "AC", "BC", "ABC", "E"]
    );
  }
  #e(t, e) {
    const i = [];
    let s;
    if (e === void 0) {
      s = /* @__PURE__ */ new Set();
      for (const r in t)
        s = /* @__PURE__ */ new Set([
          ...s,
          ...t[r] ?? []
        ]);
    } else
      s = new Set(e);
    for (const r of this.#t)
      if (r.tokenType === "variable")
        t[r.token] === void 0 ? i.push(/* @__PURE__ */ new Set()) : i.push(new Set(t[r.token]));
      else
        switch (r.token) {
          case "&":
            if (i.length >= 2) {
              const o = i.pop(), h = i.pop();
              h && o && i.push(new Set([...h].filter((c) => o.has(c))));
            }
            break;
          case "|":
            if (i.length >= 2) {
              const o = i.pop(), h = i.pop();
              h && o && i.push(/* @__PURE__ */ new Set([...h, ...o]));
            }
            break;
          case "-":
            if (i.length >= 2) {
              const o = i.pop(), h = i.pop();
              h && o && i.push(new Set([...h].filter((c) => !o.has(c))));
            }
            break;
          case "!":
            if (i.length >= 1) {
              const o = i.pop();
              o && i.push(new Set([...s].filter((h) => !o.has(h))));
            }
            break;
        }
    return [...i[0]].sort();
  }
}
class N {
  #t = D.POWER;
  #e = [];
  constructor(...t) {
    return this.parse(...t), this;
  }
  parse(...t) {
    return this.#e = [], t.length === 0 ? this : (t.forEach((e) => {
      e instanceof N ? this.#e.push(...e.factors.map((i) => i.clone())) : this.#e.push(new E(e));
    }), this);
  }
  clone() {
    return new N(...this.#e.map((t) => t.clone()));
  }
  get tex() {
    const { num: t, den: e } = this.#r();
    if (e.length === 0)
      return t.length === 1 ? t[0].asSingle.tex : t.map((r) => r.tex).join("");
    const i = t.length === 1 ? t[0].asSingle.tex : t.map((r) => r.tex).join(""), s = e.length === 1 ? e[0].asSingle.tex : e.map((r) => r.tex).join("");
    return `\\frac{ ${i} }{ ${s} }`;
  }
  get display() {
    const { num: t, den: e } = this.#r();
    if (e.length === 0)
      return t.length === 1 ? t[0].asSingle.display : t.map(
        (r, o) => o === 0 && r.polynom.monoms.length === 1 ? r.asSingle.display : r.display
      ).join("");
    const i = t.length === 1 ? t[0].asSingle.display : t.map((r) => r.display).join(""), s = e.length === 1 ? e[0].asSingle.display : e.map((r) => r.display).join("");
    return `(${i})/(${s})`;
  }
  static #i(t, e) {
    const i = Z(t), s = Z(e), o = Object.keys(i).filter((h) => Object.hasOwn(s, h)).map((h) => {
      const c = i[h].reduce((f, p) => f.add(p.power), new a("0")), l = s[h].reduce((f, p) => f.add(p.power), new a("0"));
      return new E(h, a.min(c, l));
    });
    return new N(...o);
  }
  static #s(t, e) {
    const i = Z(t), s = Z(e), o = [.../* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(s)])].map((h) => {
      const c = Object.hasOwn(i, h) ? i[h].reduce((f, p) => f.add(p.power), new a("0")) : new a(0), l = Object.hasOwn(s, h) ? s[h].reduce((f, p) => f.add(p.power), new a("0")) : new a(0);
      return new E(h, a.max(c, l));
    });
    return new N(...o);
  }
  static gcd(...t) {
    if (t.length === 0)
      return new N().one();
    if (t.length === 1)
      return t[0];
    if (t.length === 2)
      return N.#i(t[0], t[1]);
    let e = t[0];
    return t.shift(), t.forEach((i) => e = N.#i(e, i)), e;
  }
  static lcm(...t) {
    if (t.length === 0)
      return new N().one();
    if (t.length === 1)
      return t[0];
    let e = t[0];
    return t.shift(), t.forEach((i) => e = N.#s(e, i)), e;
  }
  add(...t) {
    const e = [this.numerator, ...t.map((h) => h.numerator)], i = [this.denominator, ...t.map((h) => h.denominator)];
    let s;
    if (i.some((h) => h.factors.length > 0)) {
      const h = N.lcm(...i);
      e.forEach((c, l) => {
        c.multiply(h.clone().divide(i[l]));
      }), s = h;
    }
    const r = N.gcd(...e), o = new d(0).add(
      ...e.map((h) => h.divide(r).reduce().develop().factors[0].polynom)
    ).reduce();
    return this.#e = [
      ...r.factors,
      new E(o)
    ], s && this.divide(s), this.#e = this.#e.filter((h) => !h.power.isZero()), this;
  }
  get asPower() {
    return this.#t = D.POWER, this;
  }
  get asRoot() {
    return this.#t = D.ROOT, this;
  }
  degree(t) {
    return this.#e.reduce((e, i) => e.add(i.degree(t)), new a("0"));
  }
  get denominator() {
    return new N(
      ...this.#e.filter((t) => t.power.isNegative()).map((t) => t.clone().inverse())
    );
  }
  derivative() {
    const t = [], e = this.#e.length;
    for (let s = 0; s < e; s++) {
      const r = this.#e.slice(), o = r.splice(s, 1)[0].derivative();
      t.push(
        new N(...r, ...o)
      );
    }
    t.forEach((s) => s.reduce());
    const i = t.shift();
    return i !== void 0 && (this.#e = i.factors), this.add(...t);
  }
  develop() {
    const t = new d("1"), e = new d("1");
    return this.numerator.factors.forEach((i) => {
      t.multiply(i.develop());
    }), this.denominator.factors.forEach((i) => {
      e.multiply(i.develop());
    }), new N().fromPolynom(t, e);
  }
  divide(t) {
    return this.#e = this.#e.concat(t.clone().factors.map((e) => e.inverse())), this;
  }
  evaluate(t, e) {
    return e ? this.#e.reduce((i, s) => i * s.evaluate(t, e), 1) : this.#e.reduce((i, s) => i.multiply(s.evaluate(t)), new a("1"));
  }
  factorize(t) {
    const e = [];
    this.#e.forEach((o) => {
      const h = o.polynom.factorize(t);
      if (h.length > 1) {
        const c = o.power.clone();
        e.push(...h.map((l) => new E(l, c)));
      } else
        e.push(o.clone());
    });
    const i = new N(...e), s = i.numerator.reduce(), r = i.denominator.reduce();
    return s.divide(r);
  }
  get factors() {
    return this.#e;
  }
  set factors(t) {
    this.#e = t;
  }
  fromPolynom(t, e) {
    if (this.#e = [new E(new d(t))], e) {
      const i = new d(e);
      if (i.isOne())
        return this;
      if (i.isZero())
        throw new Error("Cannot divide by zero");
      this.#e.push(new E(i, -1));
    }
    return this;
  }
  /**
   * Get the roots of the PolyFactor.
   */
  getRoots() {
    return [];
  }
  getZeroes() {
    const t = [].concat(...this.#e.map((e) => e.polynom.getZeroes()));
    return t.sort((e, i) => e.value - i.value), t.filter(
      (e, i, s) => i === s.findIndex(
        (r) => r.value === e.value
      )
    );
  }
  hasVariable(t) {
    return this.#e.some((e) => e.hasVariable(t));
  }
  inverse() {
    return this.#e = this.#e.map((t) => t.inverse()), this;
  }
  isEqual(t) {
    const e = N.gcd(this, t), i = this.clone().divide(e).reduce(), s = t.clone().divide(e).reduce();
    return i.isOne() && s.isOne();
  }
  isOne() {
    return this.#e.every((t) => t.isOne());
  }
  isZero() {
    return this.#e.every((t) => t.isZero());
  }
  multiply(...t) {
    return t.forEach((e) => {
      this.#e = this.#e.concat(e.clone().factors);
    }), this;
  }
  get numerator() {
    return new N(...this.#e.filter((t) => t.power.isPositive()));
  }
  one() {
    return this.#e = [new E("1", "1")], this;
  }
  opposite() {
    const t = this.#e.findIndex((e) => e.display === "(-1)");
    return t >= 0 ? this.#e.splice(t, 1) : this.#e.push(new E("-1", "1")), this;
  }
  pow(t) {
    return this.#e = this.#e.map((e) => e.pow(t)), this;
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    const t = Z(this);
    return this.#e = Object.values(t).map((e) => {
      const i = e[0].polynom, s = e.reduce((r, o) => r.add(o.power), new a("0"));
      return new E(i, s.reduce());
    }).filter((e) => !e.power.isZero()), this;
  }
  root(t) {
    return this.#e = this.#e.map((e) => e.root(t)), this;
  }
  /**
   * Reoarder the factors using :
   * 1. number of monoms
   * 2. degree of polynom
   * 3. power of polyfactor
   */
  sort(t) {
    return this.#e.sort((e, i) => {
      const s = e.power.value, r = i.power.value;
      if (s * r < 0)
        return -s;
      const o = e.polynom.monoms.length, h = i.polynom.monoms.length;
      if (o !== h)
        return o - h;
      const c = e.polynom.degree(t).value, l = i.polynom.degree(t).value;
      return c !== l ? c - l : s !== r ? s - r : e.degree().isLeq(i.degree()) ? -1 : 1;
    }), this;
  }
  sqrt() {
    return this.#e = this.#e.map((t) => t.sqrt()), this;
  }
  subtract(...t) {
    return this.add(...t.map((e) => e.opposite()));
  }
  tableOfSigns() {
    const t = this.getZeroes(), e = t.map((r) => r.value), i = this.factorize().factors.map((r) => ({ factor: new E(r), ...r.tableOfSigns() }));
    return i.forEach((r) => {
      const o = new Array(2 * t.length + 1).fill("");
      let h = r.signs.shift(), c = r.roots.shift();
      const l = o.map((f, p) => {
        if (p % 2 === 0)
          return h;
        if (c === void 0 || c.value !== e[(p - 1) / 2])
          return "t";
        const y = r.signs.shift();
        return h = r.signs.shift(), c = r.roots.shift(), y;
      });
      r.roots = t, r.signs = l;
    }), { signs: i.map((r) => [...r.signs]).reduce((r, o) => r.length === 0 ? o : (o.forEach((h, c) => {
      switch (h) {
        case "d":
          r[c] = "d";
          break;
        case "z":
          r[c] = r[c] === "d" ? "d" : "z";
          break;
        case "h":
          r[c] = "h";
          break;
        case "-":
          r[c] = r[c] === "h" ? "h" : r[c] === "-" ? "+" : "-";
          break;
      }
    }), r), []), roots: t, factors: i };
  }
  get variables() {
    return this.#e.reduce((t, e) => t.concat(e.variables), []);
  }
  zero() {
    return this.#e = [new E("0", "1")], this;
  }
  #r() {
    let t, e = [];
    return this.#t === D.ROOT ? (t = this.numerator.factors, e = this.denominator.factors) : t = this.#e, t.length === 0 && (t = [new E("1")]), { num: t, den: e };
  }
}
function Z(n) {
  const t = new a().one(), e = new a().one(), i = n.factors.reduce((o, h) => {
    if (h.polynom.degree().isZero())
      return h.power.isPositive() ? t.multiply(h.polynom.monoms[0].coefficient) : e.multiply(h.polynom.monoms[0].coefficient), o;
    const c = h.polynom.display;
    return Object.hasOwn(o, c) ? o[c].push(h) : o[c] = [h], o;
  }, {}), { numerator: s, denominator: r } = t.divide(e).reduce();
  return s !== 1 && (i[s.toString()] = [new E(s, 1)]), r !== 1 && (i[r.toString()] = [new E(r, -1)]), i;
}
class S {
  #t = null;
  #e = !0;
  #i = [];
  constructor(t, e) {
    return t && (e = e ?? t, this.fromDimensions(t, e)), this;
  }
  parse(t) {
    return this.fromValues(t);
  }
  clone() {
    const t = [];
    return this.#i.forEach((e) => {
      const i = [];
      e.forEach((s) => {
        i.push(s.clone());
      }), t.push(i);
    }), new S().fromValues(t);
  }
  get tex() {
    if (this.#i.length === 0)
      return "";
    const t = this.#e ? "pmatrix" : "bmatrix", e = [
      `\\begin{${t}}`,
      ...this.rows.map(
        (i) => "	" + i.map((s) => this.#t !== null && s.value ? +s.value.toFixed(this.#t) : s.tex).join(" & ") + "\\\\"
      ),
      `\\end{${t}}`
    ].join(`
`);
    return this.#t = null, e;
  }
  get display() {
    if (this.#i.length === 0)
      return "";
    const t = this.#e ? ["(", ")"] : ["[", "]"], e = t[0] + this.map((i) => this.#t !== null && i.value ? +i.value.toFixed(this.#t) : i.display).map((i) => `(${i.join(",")})`).join(",") + t[1];
    return this.#t = null, e;
  }
  add(t) {
    if (!this.canBeAdded(t))
      throw new Error("Cannot add a matrix with different dimensions.");
    return this.forEach((e, i, s) => {
      e.add(t.values[i][s]);
    }), this;
  }
  aij(t, e) {
    return t < 0 || t > this.dimension.rows || e < 0 || e > this.dimension.cols ? null : this.#i[t][e];
  }
  get bmatrix() {
    return this.#e = !1, this;
  }
  canBeAdded(t) {
    const { rows: e, cols: i } = this.dimension, { rows: s, cols: r } = t.dimension;
    return e === s && i === r;
  }
  canBeInverted() {
    return !(!this.isSquare() || this.determinant().isZero());
  }
  canBeMultiplied(t) {
    return this.dimension.cols === t.dimension.rows;
  }
  characteristic_polynom(t) {
    return t ??= "k", this.clone().subtract(
      new S(this.dimension.rows).one().multiply(new d(t))
    ).determinant();
  }
  cofactor(t, e) {
    const i = this.clone();
    return i.values.splice(t, 1), i.values.forEach((s) => {
      s.splice(e, 1);
    }), i.determinant().multiply((-1) ** (t + e));
  }
  get cols() {
    const t = Array.from({ length: this.dimension.cols }, () => Array.from({ length: this.dimension.rows }, () => new d()));
    return this.forEach((e, i, s) => {
      t[s][i] = e;
    }), t;
  }
  determinant() {
    if (!this.isSquare())
      throw new Error("Matrix is not square");
    const t = new d();
    return this.#i.length === 1 ? this.#i[0][0].clone() : (this.values[0].forEach((e, i) => {
      const s = this.cofactor(0, i);
      t.add(e.clone().multiply(s));
    }), t);
  }
  get dimension() {
    return {
      rows: this.#i.length,
      cols: this.#i[0].length
    };
  }
  flat() {
    return this.#i.flat();
  }
  forEach(t) {
    this.#i.forEach((e, i) => {
      e.forEach((s, r) => {
        t(s, i, r);
      });
    });
  }
  fromDimensions(t, e) {
    return this.#i = Array.from({ length: t }, () => Array.from({ length: e }, () => new d())), this;
  }
  fromString(t) {
    if (t.startsWith("((") && t.endsWith("))"))
      return this.fromString(t.substring(1, t.length - 1));
    const e = t.split("),(");
    return this.#i = e.map((i, s) => s === 0 ? i.substring(1).split(",") : s === e.length - 1 ? i.substring(0, i.length - 1).split(",") : i.split(",")).map(
      (i) => i.map((s) => new d(s))
    ), this;
  }
  fromValues(t) {
    this.#i = [];
    const e = t[0].length;
    if (t.some((i) => i.length !== e))
      throw new Error("Each line must be the same length");
    return t.forEach((i) => {
      const s = [];
      i.forEach((r) => {
        s.push(new d(r));
      }), this.#i.push(s);
    }), this;
  }
  fromVectors(...t) {
    this.#i = [];
    const e = t[0].dimension;
    if (t.some((i) => i.dimension !== e))
      throw new Error("Each vectors must be the same dimension");
    return this.fromDimensions(t[0].dimension, t.length), t.forEach((i, s) => {
      i.array.forEach((r, o) => {
        this.#i[o][s] = new d(r);
      });
    }), this;
  }
  inverse() {
    if (!this.canBeInverted())
      throw new Error("The matrix cannot be inverted.");
    const t = new S().fromDimensions(this.dimension.rows, this.dimension.cols);
    t.forEach((i, s, r) => {
      t.setValue(s, r, this.cofactor(s, r));
    }), t.transpose();
    const e = this.determinant();
    return t.forEach((i, s, r) => this.setValue(s, r, i.divide(e).reduce())), this;
  }
  isEqual(t) {
    if (!this.canBeAdded(t))
      return !1;
    let e = !0;
    return this.forEach((i, s, r) => {
      e &&= i.isEqual(t.values[s][r]);
    }), e;
  }
  isOne() {
    for (let t = 0; t < this.#i.length; t++)
      for (let e = 0; e < this.#i[t].length; e++)
        if (e === t && !this.#i[t][e].isOne() || e !== t && !this.#i[t][e].isZero())
          return !1;
    return !0;
  }
  isSquare() {
    return this.dimension.cols === this.dimension.rows;
  }
  isZero() {
    return this.flat().every((t) => t.isZero());
  }
  map(t) {
    const { rows: e, cols: i } = this.dimension, s = Array.from({ length: e }, () => Array.from({ length: i }, () => {
    }));
    return this.#i.forEach((r, o) => {
      r.forEach((h, c) => {
        s[o][c] = t(h, o, c);
      });
    }), s;
  }
  multiply(t) {
    if (t instanceof S) {
      if (!this.canBeMultiplied(t))
        throw new Error("Cannot multiply a matrix with incompatibles dimensions");
      const e = new S(this.dimension.rows, t.dimension.cols);
      return e.forEach((i, s, r) => {
        const o = this.rows[s], h = t.cols[r], c = new d();
        o.forEach((l, f) => {
          c.add(l.clone().multiply(h[f]));
        }), e.setValue(s, r, c);
      }), this.#i = e.values, this;
    }
    return this.forEach((e, i, s) => {
      this.setValue(i, s, e.multiply(t));
    }), this;
  }
  one() {
    return this.forEach((t, e, i) => {
      e === i ? t.one() : t.zero();
    }), this;
  }
  opposite() {
    return this.forEach((t) => {
      t.opposite();
    }), this;
  }
  get pmatrix() {
    return this.#e = !0, this;
  }
  pow(t) {
    return st(this, t);
  }
  reduce() {
    throw new Error("Not yet implemented");
  }
  get rows() {
    return this.#i;
  }
  setValue(t, e, i) {
    const { rows: s, cols: r } = this.dimension;
    if (t < 0 || t >= s || e < 0 || e >= r)
      throw new Error(`${t}x${e} is out of range (${s}x${r})`);
    return this.#i[t][e] = new d(i), this;
  }
  subtract(t) {
    if (!this.canBeAdded(t))
      throw new Error("Cannot subtract a matrix with different dimensions.");
    return this.forEach((e, i, s) => {
      e.subtract(t.values[i][s]);
    }), this;
  }
  toFixed(t) {
    return this.#t = t, this;
  }
  transpose() {
    return this.clone().forEach((e, i, s) => {
      this.setValue(s, i, e.clone());
    }), this;
  }
  get values() {
    return this.#i;
  }
  zero() {
    return this.forEach((t) => t.zero()), this;
  }
}
function qt(n, t) {
  return n.dimension === t.dimension && n.array.every(
    (e, i) => t.array[i].isEqual(e)
  );
}
function $t(n, t) {
  if (n.dimension !== t.dimension)
    return !1;
  const e = t.array[0].value / n.array[0].value;
  return n.array.every(
    (i, s) => t.array[s].value === i.value * e
  );
}
function kt(n, t) {
  return n.dimension !== t.dimension ? new a().invalid() : n.array.reduce(
    (e, i, s) => e.add(i.clone().multiply(t.array[s])),
    new a(0)
  );
}
function Vt(...n) {
  if (n.some((t) => t.dimension !== n[0].dimension))
    throw new Error("All vectors must have the same dimension");
  if (n[0].dimension !== n.length)
    throw new Error(`The determinant of dimension ${n[0].dimension} must have the same number of vectors (${n.length} given)`);
  return n[0].dimension === 2 ? n[0].array[0].clone().multiply(n[1].array[1]).subtract(n[0].array[1].clone().multiply(n[1].array[0])) : n[0].array[0].clone().multiply(
    n[1].array[1].clone().multiply(n[2].array[2]).subtract(n[1].array[2].clone().multiply(n[2].array[1]))
  ).subtract(
    n[0].array[1].clone().multiply(
      n[1].array[0].clone().multiply(n[2].array[2]).subtract(n[1].array[2].clone().multiply(n[2].array[0]))
    )
  ).add(n[0].array[2].clone().multiply(n[1].array[0].clone().multiply(n[2].array[1]).subtract(n[1].array[1].clone().multiply(n[2].array[0]))));
}
class R {
  #t = [];
  constructor(...t) {
    this.#t = t.map((e) => new a(e));
  }
  copy() {
    return this.#t.map((t) => t.clone());
  }
  get array() {
    return this.#t;
  }
  set array(t) {
    this.#t = t;
  }
  get dimension() {
    return this.array.length;
  }
  fromString(t) {
    t.startsWith("(") && (t = t.substring(1)), t.endsWith(")") && (t = t.substring(0, t.length - 1));
    const e = t.split(/[,;\s]/g).filter((i) => i.trim() !== "");
    return e.length < 2 ? this : (this.#t = e.map((i) => new a(i)), this);
  }
  setDimension(t = 2) {
    if (t < 2)
      throw new Error("Dimension must be at least 2");
    if (t < this.dimension)
      this.#t = this.#t.slice(0, t);
    else if (t > this.dimension)
      for (let e = this.dimension; e < t; e++)
        this.#t.push(new a(0));
    return this;
  }
  get x() {
    return this.#t[0];
  }
  set x(t) {
    this.#t[0] = new a(t);
  }
  get y() {
    return this.#t[1];
  }
  set y(t) {
    this.#t[1] = new a(t);
  }
  get z() {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    return this.#t[2];
  }
  set z(t) {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    this.#t[2] = new a(t);
  }
  zero = () => (this.#t.forEach((t) => t.zero()), this);
}
class w extends R {
  constructor(...t) {
    super(), t.length > 0 && this.parse(...t);
  }
  parse(...t) {
    if (t.length === 1) {
      if (t[0] instanceof R)
        return this.array = t[0].copy(), this;
      if (typeof t[0] == "string")
        return this.fromString(t[0]), this;
    }
    if (t.length > 1) {
      if (t.some((i) => i instanceof w))
        throw new Error("Creating a point with  multiple argument requires an input fraction");
      const e = t.map((i) => new a(i));
      if (e.some((i) => i.isNaN()))
        throw new Error("The given values are not a valid point string (a,b): ");
      this.array = e;
    }
    return this;
  }
  clone() {
    return new w(...this.copy());
  }
  get tex() {
    return `\\left(${this.array.map((t) => t.tex).join(";")}\\right)`;
  }
  get display() {
    return `(${this.array.map((t) => t.display).join(";")})`;
  }
  distanceTo(t) {
    if (this.dimension !== t.dimension)
      throw new Error("The two points must have the same dimensions.");
    const i = this.array.map((s, r) => t.array[r].clone().subtract(s)).reduce(
      (s, r) => s.add(r.clone().pow(2)),
      new a(0)
    );
    return new O().from(2, i).reduce();
  }
  middleOf(t, e) {
    if (t.dimension !== e.dimension)
      throw new Error("Vectors must be the same dimension");
    return this.array = [], t.array.forEach((i, s) => {
      this.array.push(i.clone().add(e.array[s]).divide(2));
    }), this;
  }
}
class g extends R {
  constructor(...t) {
    return super(), t.length > 0 && this.parse(...t), this;
  }
  // ------------------------------------------
  // Getter and setter
  parse(...t) {
    if (t.length === 0)
      throw new Error("Invalid value");
    if (t.length === 1) {
      if (t[0] instanceof R)
        return this.array = t[0].copy(), this;
      if (typeof t[0] == "string")
        return this.fromString(t[0]);
      throw new Error("Invalid value");
    }
    if (t.length === 2) {
      const [e, i] = t;
      if (e instanceof R && i instanceof R) {
        if (e.dimension !== i.dimension)
          throw new Error("Vectors must have the same dimension");
        return this.array = i.array.map((s, r) => s.clone().subtract(e.array[r])), this;
      }
    }
    return this.array = t.map((e) => new a(e)), this;
  }
  clone() {
    return new g(...this.copy());
  }
  get tex() {
    return `\\begin{pmatrix} ${this.array.map((t) => t.tex).join(" \\\\ ")} \\end{pmatrix}`;
  }
  get display() {
    return `((${this.array.map((t) => t.display).join(",")}))`;
  }
  static asDisplay(...t) {
    return `((${t.join(",")}))`;
  }
  static asTex(...t) {
    return `\\begin{pmatrix} ${t.join(" \\\\ ")} \\end{pmatrix}`;
  }
  add = (t) => (this.array.forEach((e, i) => e.add(t.array[i])), this);
  angle = (t, e, i) => {
    let s = this.dot(t).value;
    return e && (s = Math.abs(s)), (i ? 1 : 180 / Math.PI) * Math.acos(s / (this.norm * t.norm));
  };
  cross(t) {
    if (this.dimension !== 3 || t.dimension !== 3)
      throw new Error("Cross product can only be determined in 3D");
    return new g(
      this.y.clone().multiply(t.z).subtract(this.z.clone().multiply(t.y)),
      this.z.clone().multiply(t.x).subtract(this.x.clone().multiply(t.z)),
      this.x.clone().multiply(t.y).subtract(this.y.clone().multiply(t.x))
    );
  }
  // ------------------------------------------
  // Creation / parsing functions
  divideByScalar = (t) => this.multiplyByScalar(new a(t).inverse());
  dot = (t) => kt(this, t);
  fromString(t) {
    return t.startsWith("((") && t.endsWith("))") ? super.fromString(t.slice(1, -1)) : super.fromString(t);
  }
  isColinearTo = (t) => $t(this, t);
  isEqual = (t) => qt(this, t);
  isNormalTo = (t) => this.dot(t).isZero();
  // ------------------------------------------
  get isNull() {
    return this.array.every((t) => t.isZero());
  }
  isOne() {
    return this.array.every((t, e) => e === 0 ? t.isOne() : t.isZero());
  }
  isZero() {
    return this.array.every((t) => t.isZero());
  }
  multiplyByScalar = (t) => {
    const e = new a(t);
    return this.array.forEach((i) => i.multiply(e)), this;
  };
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get normSquare() {
    return this.array.reduce((t, e) => t.add(e.clone().pow(2)), new a(0));
  }
  normal = () => {
    if (this.dimension >= 3)
      throw new Error("Normal vector can only be determined in 2D");
    const t = this.x.clone().opposite(), e = this.y.clone();
    return this.array[0] = e, this.array[1] = t, this;
  };
  one = () => (this.zero(), this.x.one(), this);
  opposite = () => (this.array.forEach((t) => t.opposite()), this);
  simplify = () => this.multiplyByScalar(
    x.lcm(...this.array.map((t) => t.denominator))
  ).divideByScalar(
    x.gcd(...this.array.map((t) => t.numerator))
  ).multiplyByScalar(
    this.x.isNegative() ? -1 : 1
  );
  subtract = (t) => this.add(t.clone().opposite());
  translate(...t) {
    return this.array.forEach((e, i) => e.add(t[i])), this;
  }
  unit = () => {
    const t = this.norm;
    return t === 0 ? this : this.divideByScalar(t);
  };
}
var L = /* @__PURE__ */ ((n) => (n.None = "none", n.Parallel = "parallel", n.Perpendicular = "perpendicular", n.Tangent = "tangent", n))(L || {}), Q = /* @__PURE__ */ ((n) => (n.None = "none", n.Parallel = "parallel", n.Perpendicular = "perpendicular", n.Tangent = "tangent", n))(Q || {});
function rt(n = 0.5) {
  return Math.random() < n;
}
function T(n, t, e) {
  if (t === void 0)
    return n >= 0 ? T(0, n) : T(n, 0);
  if (n === t)
    return n;
  if (e === void 0)
    return Math.floor(Math.random() * (t - n + 1) + n);
  if (Math.abs(t - n) <= e.length)
    throw new Error("The number of excluded values is too high.");
  let i = T(n, t);
  for (; e.includes(i); )
    i = T(n, t);
  return i;
}
function A(n, t) {
  return t === !1 ? rt() ? T(1, n) : -T(1, n) : T(-n, n);
}
function Bt(n) {
  let t = x.primes();
  return n !== void 0 && (t = t.filter((e) => e < n)), _(t);
}
function Mt(n, t) {
  return t === void 0 && (t = 1), n.length <= 0 ? Object.values(n) : nt(n).slice(0, t);
}
function _(n) {
  return n.length === 0 ? null : n[T(0, n.length - 1)];
}
function nt(n) {
  const t = Object.values(n);
  for (let e = t.length - 1; e > 0; e--) {
    const i = Math.floor(Math.random() * (e + 1)), s = t[e];
    t[e] = t[i], t[i] = s;
  }
  return t;
}
class b {
  static PARALLEL = L.Parallel;
  static PERPENDICULAR = L.Perpendicular;
  #t;
  // A line is defined as the canonical form
  // ax + by + c = 0
  #e;
  #i;
  #s;
  // output mode.
  #r = 1;
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...t) {
    return this.#e = new a().zero(), this.#i = new a().zero(), this.#s = new a().zero(), this.#t = new g(), t.length > 0 && this.parse(...t), this;
  }
  // ------------------------------------------
  /**
   * Parse data to a line
   * @param {any} values
   * @returns {Line}
   */
  parse = (...t) => {
    if (t.length === 0)
      return this;
    if (t.length === 1) {
      if (t[0] instanceof b)
        return this.fromCoefficient(t[0].a, t[0].b, t[0].c);
      if (t[0] instanceof v)
        return this.fromEquation(t[0]);
      if (typeof t[0] == "string")
        try {
          const e = new v(t[0]);
          return this.parse(e);
        } catch (e) {
          return console.warn(e), this;
        }
    }
    if (t.length === 2) {
      if (t[0] instanceof w && t[1] instanceof w)
        return this.fromPoints(t[0], t[1]);
      if (t[0] instanceof w && t[1] instanceof g)
        return this.fromPointAndDirection(t[0], t[1]);
    }
    return t.length === 3 && t.every((e) => a.isFraction(e)) ? this.fromCoefficient(
      t[0],
      t[1],
      t[2]
    ) : (console.log("Something wrong happened while creating the line"), console.log(t), this);
  };
  // ------------------------------------------
  // Getter and setter
  clone = () => (this.#e = this.#e.clone(), this.#i = this.#i.clone(), this.#s = this.#s.clone(), this.#t = this.#t.clone(), this);
  get tex() {
    const t = this.#r;
    switch (this.#r = 1, t) {
      case 0:
        return this.getEquation().reorder().tex;
      case 2:
        return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new d().parse("x", this.slope, this.height).tex;
      case 3:
      case 4: {
        const e = this.d.clone().simplify();
        return t === 3 ? `${g.asTex("x", "y")} = ${g.asTex(this.#t.x.tex, this.#t.y.tex)} + k\\cdot ${g.asTex(e.x.tex, e.y.tex)}` : `\\left\\{\\begin{aligned}
            x &= ${new d(this.#t.x).add(new m(this.d.x).multiply(new m("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new d(this.#t.y).add(new m(this.d.y).multiply(new m("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`;
      }
      default: {
        const e = this.getEquation();
        return this.#e.isNegative() && e.multiply(-1), e.tex;
      }
    }
  }
  get display() {
    const t = this.#r;
    switch (this.#r = 1, t) {
      case 0:
        return this.getEquation().reorder().display;
      case 2:
        return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new d().parse("x", this.slope, this.height).display;
      case 3: {
        const e = this.d.clone().simplify();
        return `((x,y))=((${this.#t.x.display},${this.#t.y.display}))+k((${e.x.display},${e.y.display}))`;
      }
      case 4:
        return "";
      default: {
        const e = this.getEquation();
        return this.#e.isNegative() && e.multiply(-1), e.display;
      }
    }
  }
  get OA() {
    return this.#t;
  }
  set OA(t) {
    this.fromPointAndNormal(t, this.n);
  }
  get a() {
    return this.#e;
  }
  set a(t) {
    this.#e = t;
  }
  get asCanonical() {
    return this.#r = 1, this;
  }
  get asCartesian() {
    return this.#r = 0, this;
  }
  get asMxh() {
    return this.#r = 2, this;
  }
  get asParametric() {
    return this.#r = 3, this;
  }
  get asSystem() {
    return this.#r = 4, this;
  }
  get b() {
    return this.#i;
  }
  set b(t) {
    this.#i = t;
  }
  get c() {
    return this.#s;
  }
  set c(t) {
    this.#s = t;
  }
  // ------------------------------------------
  canonicalAsFloatCoefficient(t = 2) {
    let e = "";
    return this.#e.isZero() || (this.#e.isOne() ? e = "x" : this.#e.clone().opposite().isOne() ? e = "-x" : e = this.#e.value.toFixed(t) + "x"), this.#i.isZero() || (this.#i.isPositive() && (e += "+"), e += this.#i.value.toFixed(t) + "y"), this.#s.isZero() || (this.#s.isPositive() && (e += "+"), e += this.#s.value.toFixed(t)), e + "=0";
  }
  get d() {
    return new g(this.#i.clone(), this.#e.clone().opposite());
  }
  set d(t) {
    this.fromPointAndDirection(this.OA, t);
  }
  get director() {
    return this.d;
  }
  distanceTo(t) {
    const e = t.x.clone().multiply(this.#e).add(t.y.clone().multiply(this.#i)).add(this.#s).abs(), i = this.normal.normSquare;
    return i.isZero() ? new O(0) : new O().from(2, i.inverse(), e);
  }
  fromCoefficient = (t, e, i) => {
    this.#e = new a(t), this.#i = new a(e), this.#s = new a(i);
    const s = x.lcm(this.#e.denominator, this.#i.denominator, this.#s.denominator);
    if (s > 1 && (this.#e.multiply(s).reduce(), this.#i.multiply(s).reduce(), this.#s.multiply(s).reduce()), this.#i.isZero())
      return this.#t = new g(this.#s.clone().divide(this.#e).opposite(), 0), this;
    for (let o = 0; o < this.#i.value; o++) {
      const h = this.#e.clone().divide(this.#i).multiply(o).subtract(this.#s.clone().divide(this.#i)).reduce();
      if (this.#t = new g(o, h), h.isRelative())
        return this;
    }
    const r = this.#s.clone().divide(this.#i).opposite().reduce();
    return this.#t = new g(0, r), this;
  };
  fromEquation = (t) => {
    t.reorder(!0);
    const e = new Set(t.letters());
    if (!(e.has("x") || e.has("y")))
      return this;
    for (const i of ["x", "y"])
      e.has(i) && e.delete(i);
    return e.size > 0 ? this : this.fromCoefficient(
      t.left.monomByLetter("x").coefficient,
      t.left.monomByLetter("y").coefficient,
      t.left.monomByDegree(0).coefficient
    );
  };
  fromPointAndDirection = (t, e) => this.fromPointAndNormal(t, e.clone().normal());
  fromPointAndLine = (t, e, i = L.Parallel) => i === L.Perpendicular ? this.fromPointAndNormal(t, e.director) : this.fromPointAndNormal(t, e.normal);
  fromPointAndNormal = (t, e) => (this.fromCoefficient(
    e.x,
    e.y,
    t.x.clone().multiply(e.x).add(t.y.clone().multiply(e.y)).opposite()
  ), this.#t = new g(t.clone()), this);
  // ------------------------------------------
  // Creation / parsing functions
  fromPoints(t, e) {
    return this.fromPointAndNormal(t, new g(t, e).normal());
  }
  // ------------------------------------------
  getEquation() {
    return new v(new d().parse("xy", this.#e, this.#i, this.#s), new d("0")).simplify();
  }
  getValueAtX = (t) => {
    const e = this.getEquation().isolate("y"), i = new a(t);
    return e instanceof v ? e.right.evaluate({ x: i }) : new a().invalid();
  };
  getValueAtY = (t) => {
    const e = this.getEquation().isolate("x"), i = new a(t);
    return e instanceof v ? e.right.evaluate({ y: i }) : new a().invalid();
  };
  get height() {
    return this.#s.clone().opposite().divide(this.#i);
  }
  hitSegment(t, e) {
    const i = this.intersection(
      new b().fromPoints(t, e)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(t.x.value, e.x.value) && i.point.x.value <= Math.max(t.x.value, e.x.value) && i.point.y.value >= Math.min(t.y.value, e.y.value) && i.point.y.value <= Math.max(t.y.value, e.y.value) : !1;
  }
  intersection = (t) => {
    const e = new w();
    let i = !1, s = !1;
    return this.#i.isZero() || t.b.isZero(), this.isParallelTo(t) ? (e.x = new a().invalid(), e.y = new a().invalid(), i = !0) : this.isSameAs(t) ? (e.x = new a().invalid(), e.y = new a().invalid(), s = !0) : (e.x = this.#i.clone().multiply(t.c).subtract(this.#s.clone().multiply(t.b)).divide(this.#e.clone().multiply(t.b).subtract(this.#i.clone().multiply(t.a))), e.y = this.#e.clone().multiply(t.c).subtract(this.#s.clone().multiply(t.a)).divide(this.#i.clone().multiply(t.a).subtract(this.#e.clone().multiply(t.b)))), {
      point: e,
      hasIntersection: !(i || s),
      isParallel: i,
      isSame: s
    };
  };
  // ------------------------------------------
  isOnLine(t) {
    return this.#e.clone().multiply(t.x).add(
      this.#i.clone().multiply(t.y)
    ).add(this.#s).isZero();
  }
  isParallelTo = (t) => this.slope.isEqual(t.slope) && this.height.isNotEqual(t.height);
  isPerpendicularTo = (t) => this.d.isNormalTo(t.d);
  isSameAs = (t) => this.slope.isEqual(t.slope) && this.height.isEqual(t.height);
  isVertical = () => this.slope.isInfinity();
  get n() {
    return this.d.normal();
  }
  get normal() {
    return new g(this.#e, this.#i);
  }
  randomNearPoint = (t) => {
    const e = this.randomPoint(t);
    let i = 10;
    for (; this.isOnLine(e) && i > 0; )
      e.x.add(A(1, !1)), e.y.add(A(1, !1)), i--;
    return e;
  };
  randomPoint = (t) => {
    const e = this.d.clone().multiplyByScalar(A(t === void 0 || t <= 1 ? 3 : t, !1)).add(this.#t);
    return new w(e);
  };
  simplify = () => {
    const t = x.lcm(this.#e.denominator, this.#i.denominator, this.#s.denominator), e = x.gcd(this.#e.numerator, this.#i.numerator, this.#s.numerator);
    return this.fromCoefficient(
      this.#e.clone().multiply(t).divide(e),
      this.#i.clone().multiply(t).divide(e),
      this.#s.clone().multiply(t).divide(e)
    ), this;
  };
  get slope() {
    return this.#e.clone().opposite().divide(this.#i);
  }
}
class V {
  // This defines the triangle
  #t = new w();
  #e = new w();
  #i = new w();
  #s = !0;
  // TODO: add a check if it's a triangle or not.
  // This is calculated
  #r = {
    AB: new b(),
    AC: new b(),
    BC: new b()
  };
  #n = !0;
  #o = null;
  constructor(...t) {
    return t.length > 0 && this.parse(...t), this;
  }
  parse = (...t) => {
    if (t.length === 1 && t[0] instanceof V)
      return this.copy(t[0]);
    if (t.length === 3) {
      if (t.every((e) => typeof e == "string"))
        return this.parse(
          ...t.map((e) => new b(e))
        );
      if (t.every((e) => e instanceof b))
        return this.fromLines(t[0], t[1], t[2]);
      if (t.every((e) => e instanceof w))
        return this.fromPoints(t[0], t[1], t[2]);
    }
    if (t.length === 6) {
      const e = t.map((i) => new a(i));
      if (e.some((i) => i.isNaN()))
        throw new Error("One of the values is not a valid number");
      return this.fromCoordinates(e[0], e[1], e[2], e[3], e[4], e[5]);
    }
    return this;
  };
  /**
   * Clone the Triangle class
   */
  clone = () => new V(
    this.#t.clone(),
    this.#e.clone(),
    this.#i.clone()
  );
  /**
   * Copy the values from another triangle
   * @param value
   */
  copy(t) {
    return this.#t = t.A.clone(), this.#e = t.B.clone(), this.#i = t.C.clone(), this.#u();
  }
  get A() {
    return this.#t;
  }
  get AB() {
    return this.#h("A", "B");
  }
  get AC() {
    return this.#h("A", "C");
  }
  get B() {
    return this.#e;
  }
  get BA() {
    return this.#h("B", "A");
  }
  get BC() {
    return this.#h("B", "C");
  }
  get C() {
    return this.#i;
  }
  get CA() {
    return this.#h("C", "A");
  }
  get CB() {
    return this.#h("C", "B");
  }
  get angleABC() {
    return this.getAngle("ABC");
  }
  get angleBCA() {
    return this.getAngle("BCA");
  }
  get angleCAB() {
    return this.getAngle("CAB");
  }
  get asDegree() {
    return this.#n = !1, this;
  }
  get asRadians() {
    return this.#n = !0, this;
  }
  fromCoordinates(t, e, i, s, r, o) {
    return this.fromPoints(
      new w(t, e),
      new w(i, s),
      new w(r, o)
    );
  }
  fromLines(t, e, i) {
    const s = new b(t).clone(), r = new b(e).clone(), o = new b(i).clone();
    let h = s.intersection(r);
    return h.hasIntersection ? this.#e = h.point : this.#s = !1, h = r.intersection(o), h.hasIntersection ? this.#i = h.point : this.#s = !1, h = o.intersection(s), h.hasIntersection ? this.#t = h.point : this.#s = !1, this.#u(), this.#r = { AB: s, AC: o, BC: r }, this;
  }
  fromPoints(t, e, i) {
    return this.#t = t.clone(), this.#e = e.clone(), this.#i = i.clone(), this.#u(), this;
  }
  getAngle(t) {
    const e = this.BC.norm, i = this.AC.norm, s = this.AB.norm;
    return t === "CAB" ? this.#c(e, i, s) : t === "BCA" ? this.#c(s, i, e) : this.#c(i, e, s);
  }
  get isEquilateral() {
    const t = this.AB.normSquare.value, e = this.BC.normSquare.value, i = this.AC.normSquare.value;
    return t === e && t === i;
  }
  get isIsocele() {
    const t = this.AB.normSquare.value, e = this.BC.normSquare.value, i = this.AC.normSquare.value;
    return t === e || t === i || e === i;
  }
  get isRectangle() {
    return this.AB.isNormalTo(this.BC) || this.AB.isNormalTo(this.AC) || this.BC.isNormalTo(this.AC);
  }
  get isValid() {
    return this.#s;
  }
  set isValid(t) {
    this.#s = t;
  }
  get lines() {
    return this.#r;
  }
  get remarquables() {
    return this.#o;
  }
  #a = (t) => {
    const e = this.lines;
    let i, s;
    if (t === "A" ? (i = e.AB, s = e.AC) : t === "B" ? (i = e.AB, s = e.BC) : t === "C" && (i = e.BC, s = e.AC), i === void 0 || s === void 0)
      throw new Error(`The point ${t} does not exist`);
    const r = i.n.simplify().norm, o = s.n.simplify().norm, h = i.getEquation().multiply(o), c = s.getEquation().multiply(r), l = new b(h.clone().subtract(c).simplify()), f = new b(c.clone().subtract(h).simplify());
    return t === "A" ? l.hitSegment(this.B, this.C) ? { internal: l, external: f } : { internal: f, external: l } : t === "B" ? l.hitSegment(this.A, this.C) ? { internal: l, external: f } : { internal: f, external: l } : t === "C" ? l.hitSegment(this.B, this.A) ? { internal: l, external: f } : { internal: f, external: l } : { internal: l, external: f };
  };
  #l = () => {
    const t = {
      AB: new w().middleOf(this.#t, this.#e),
      AC: new w().middleOf(this.#t, this.#i),
      BC: new w().middleOf(this.#e, this.#i)
    }, e = {
      A: new b().fromPoints(this.#t, t.BC),
      B: new b().fromPoints(this.#e, t.AC),
      C: new b().fromPoints(this.#i, t.AB),
      intersection: null
    }, i = {
      AB: new b().fromPointAndNormal(t.AB, new g(this.#t, this.#e).normal()),
      AC: new b().fromPointAndNormal(t.AC, new g(this.#t, this.#i).normal()),
      BC: new b().fromPointAndNormal(t.BC, new g(this.#e, this.#i).normal()),
      intersection: null
    }, s = {
      A: new b().fromPointAndNormal(this.#t, new g(this.#e, this.#i).normal()),
      B: new b().fromPointAndNormal(this.#e, new g(this.#t, this.#i).normal()),
      C: new b().fromPointAndNormal(this.#i, new g(this.#t, this.#e).normal()),
      intersection: null
    }, r = this.#a("A"), o = this.#a("B"), h = this.#a("C"), c = {
      A: r.internal,
      B: o.internal,
      C: o.internal,
      intersection: null
    }, l = {
      A: r.external,
      B: o.external,
      C: h.external,
      intersection: null
    }, f = {
      medians: e,
      mediators: i,
      heights: s,
      bisectors: c,
      externalBisectors: l
    };
    return f.medians.intersection = f.medians.A.intersection(f.medians.B).point, f.mediators.intersection = f.mediators.AB.intersection(f.mediators.BC).point, f.heights.intersection = f.heights.A.intersection(f.heights.B).point, f.bisectors.intersection = f.bisectors.A.intersection(f.bisectors.B).point, f;
  };
  #c(t, e, i) {
    const s = (e ** 2 * i ** 2 - t ** 2) / (2 * e * i);
    return this.#n ? Math.acos(s) : Math.acos(s) * 180 / Math.PI;
  }
  /**
   * Get the Point class for the given name
   * @param ptName
   */
  #f = (t) => {
    switch (t.toUpperCase()) {
      case "A":
        return this.#t;
      case "B":
        return this.#e;
      case "C":
        return this.#i;
    }
    return this.#t;
  };
  /**
   * Get the vector for the segment given by name.
   * @param ptName1
   * @param ptName2
   */
  #h = (t, e) => new g(
    this.#f(t),
    this.#f(e)
  );
  /**
   * Generate the Line object for the three segments of the triangle
   */
  #u() {
    return this.#r = {
      AB: new b(this.#t, this.#e),
      BC: new b(this.#e, this.#i),
      AC: new b(this.#t, this.#i)
    }, this.#o = this.#l(), this;
  }
}
class U {
  #t = null;
  #e = null;
  #i = 1;
  #s = null;
  constructor(...t) {
    t.length > 0 && this.parse(...t);
  }
  parse(...t) {
    return typeof t[0] == "string" ? this.fromString(t[0]) : t[0] instanceof v ? this.fromEquation(t[0]) : t[0] instanceof U ? this.copy(t[0]) : t.length === 2 && t[0] instanceof w && t[1] instanceof w ? this.fromCenterPoint(t[0], t[1]) : t.length >= 2 && t[0] instanceof w && (t[1] instanceof a || typeof t[1] == "number") ? this.fromCenterRadius(
      t[0],
      t[1],
      typeof t[2] == "boolean" ? t[2] : !1
    ) : this;
  }
  clone() {
    return new U().fromCenterRadius(
      this.center.clone(),
      this.squareRadius.clone(),
      !0
    );
  }
  copy(t) {
    return this.#t = t.center.clone(), this.#s = t.squareRadius.clone(), this.#r(), this;
  }
  get tex() {
    if (this.#i === 0)
      return this.equation.moveLeft().reduce().tex;
    let t, e;
    return this.center.x.isZero() ? t = "x^2" : t = `\\left(x${this.center.x.isNegative() ? "+" : "-"}${this.center.x.clone().abs().tex}\\right)^2`, this.center.y.isZero() ? e = "y^2" : e = `\\left(y${this.center.y.isNegative() ? "+" : "-"}${this.center.y.clone().abs().tex}\\right)^2`, `${t}+${e}=${this.squareRadius.tex}`;
  }
  get display() {
    if (this.#i === 0)
      return this.equation.moveLeft().reduce().display;
    let t, e;
    return this.center.x.isZero() ? t = "x^2" : t = `(x${this.center.x.isNegative() ? "+" : "-"}${this.center.x.clone().abs().tex})^2`, this.center.y.isZero() ? e = "y^2" : e = `(y${this.center.y.isNegative() ? "+" : "-"}${this.center.y.clone().abs().tex})^2`, `${t}+${e}=${this.squareRadius.display}`;
  }
  get asCanonical() {
    return this.#i = 0, this;
  }
  get asCenterRadius() {
    return this.#i = 1, this;
  }
  get center() {
    return this.#t ?? new w();
  }
  get equation() {
    return this.#e?.clone() ?? new v("0=0");
  }
  fromCenterPoint(t, e) {
    return this.#t = t.clone(), this.#s = new g(this.#t, e).normSquare, this.#r(), this;
  }
  fromCenterRadius(t, e, i) {
    return this.#t = t.clone(), i ? this.#s = new a(e) : this.#s = new a(e).pow(2), this.#r(), this;
  }
  fromEquation(t) {
    if (t.moveLeft(), t.degree("x").value === 2 && t.degree("y").value === 2) {
      const e = t.left.monomByDegree(2, "x"), i = t.left.monomByDegree(2, "y");
      let s, r, o;
      if (e.coefficient.isEqual(i.coefficient))
        return t.divide(e.coefficient), s = t.left.monomByDegree(1, "x"), r = t.left.monomByDegree(1, "y"), o = t.left.monomByDegree(0), this.#t = new w(s.coefficient.clone().divide(2).opposite(), r.coefficient.clone().divide(2).opposite()), this.#s = o.coefficient.clone().opposite().add(this.#t.x.clone().pow(2)).add(this.#t.y.clone().pow(2)), this.#r(), this;
      this.#n();
    }
    return this;
  }
  fromPoints(t, e, i) {
    const s = new V(t, e, i);
    if (!s.isValid || !s.remarquables)
      return this.#n(), this;
    const r = s.remarquables.mediators.AB.clone(), o = s.remarquables.mediators.AC.clone();
    return this.parse(r.intersection(o).point, t), this;
  }
  fromString(t) {
    return this.fromEquation(new v(t));
  }
  getPointsOnCircle() {
    const t = x.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), e = [];
    return t.forEach((i) => {
      for (const s of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
        e.push(
          new w(
            this.center.x.clone().add(s[0] * i[0]),
            this.center.y.clone().add(s[1] * i[1])
          )
        );
    }), e;
  }
  isPointOnCircle = (t) => this.#e?.test({ x: t.x, y: t.y }) ?? !1;
  lineIntersection(t) {
    if (this.#e === null)
      return [];
    const e = this.center, i = t.d, s = t.OA, r = i.normSquare, o = s.x.clone().subtract(e.x).multiply(i.x).add(s.y.clone().subtract(e.y).multiply(i.y)).multiply(2), h = s.x.clone().subtract(e.x).pow(2).add(s.y.clone().subtract(e.y).pow(2)).subtract(this.squareRadius), c = $.fromQuadratic(r, o, h);
    if (c.length === 0)
      return [];
    if (c.length === 1) {
      const p = s.add(i.clone().multiplyByScalar(c[0].fraction));
      return [
        new w(p.x, p.y)
      ];
    }
    if (c[0].exact && c[1].exact) {
      const p = s.add(i.clone().multiplyByScalar(c[0].fraction)), y = s.add(i.clone().multiplyByScalar(c[1].fraction));
      return [
        new w(p.x, p.y),
        new w(y.x, y.y)
      ];
    }
    const l = s.add(i.clone().multiplyByScalar(c[0].value)), f = s.add(i.clone().multiplyByScalar(c[1].value));
    return [
      new w(l.x, l.y),
      new w(f.x, f.y)
    ];
  }
  get radius() {
    return new O().from(2, this.#s ?? 0);
  }
  /**
   * Get the relative position between circle and line. It corresponds to the number of intersection.
   * @param {Line} L
   * @returns {number}
   */
  relativePosition(t) {
    if (this.#t === null || this.#s === null)
      return -1;
    const e = t.distanceTo(this.#t).pow(2).value, i = this.#s.value;
    return e - i > 1e-10 ? 0 : Math.abs(e - i) < 1e-10 ? 1 : 2;
  }
  setRadius(t, e) {
    return e ? this.#s = new a(t) : this.#s = new a(t).pow(2), this.#r(), this;
  }
  get squareRadius() {
    return this.#s?.clone() ?? new a(-1);
  }
  tangents = (t) => t instanceof a ? this.#l(t) : this.isPointOnCircle(t) ? this.#o(t) : this.#t !== null && this.#t.distanceTo(t).value > this.radius.value ? this.#a(t) : [];
  #r() {
    this.#e = new v(
      new d(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
      new d(this.squareRadius.display)
    ).moveLeft();
  }
  #n() {
    this.#t = null, this.#s = null, this.#e = null;
  }
  #o = (t) => {
    const e = new g(this.center, t);
    return [new b().fromPointAndNormal(t, e)];
  };
  #a = (t) => {
    const e = this.center.x.clone().subtract(t.x), i = this.center.y.clone().subtract(t.y), s = new d("x"), r = new d("x^2+1");
    return s.multiply(e).subtract(i).pow(2), r.multiply(this.squareRadius), new v(s, r).solve().map((c) => {
      let l;
      const f = new v("y", "x");
      return c.exact ? (l = t.x.clone().opposite().multiply(c.fraction).add(t.y), f.right.multiply(c.fraction).add(l)) : (l = t.x.clone().opposite().multiply(c.value).add(t.y), f.right.multiply(c.value).add(l)), new b(f);
    });
  };
  #l = (t) => {
    const e = t.numerator, i = -t.denominator, s = this.center.x.clone(), r = this.center.y.clone(), o = this.squareRadius.clone().multiply(t.numerator ** 2 + t.denominator ** 2), h = s.clone().multiply(e).opposite().subtract(r.clone().multiply(i)).add(o.clone().sqrt()), c = s.clone().multiply(e).opposite().subtract(r.clone().multiply(i)).subtract(o.clone().sqrt());
    return [new b(e, i, h), new b(e, i, c)];
  };
}
class W {
  static PARALLEL = Q.Parallel;
  // A line is defined as the canonical form
  static PERPENDICULAR = Q.Perpendicular;
  // ax + by + c = 0
  #t = new w();
  #e = new g();
  constructor(t, e) {
    return this.#t = t.clone(), this.#e = e instanceof w ? new g(t, e) : e.clone(), this;
  }
  clone = () => (this.#e = this.#e.clone(), this.#t = this.#t.clone(), this);
  get tex() {
    return {
      parametric: `${g.asTex("x", "y", "z")} = ${g.asTex(this.#t.x.tex, this.#t.y.tex, this.#t.z.tex)} + k\\cdot ${g.asTex(this.#e.x.tex, this.#e.y.tex, this.#e.z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new d(this.#t.x).add(new m(this.#e.x).multiply(new m("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new d(this.#t.y).add(new m(this.#e.y).multiply(new m("k"))).reorder("k", !0).tex}\\\\
    z &= ${new d(this.#t.z).add(new m(this.#e.z).multiply(new m("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
      cartesian: `\\frac{ ${new d("x", 1, this.#t.x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new d("y", 1, this.#t.y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new d("z", 1, this.#t.z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
    };
  }
  get display() {
    const t = this.#t.x.display, e = this.#t.y.display, i = this.#t.z.display, s = this.direction.simplify(), r = s.x.display, o = s.y.display, h = s.z.display;
    return {
      parametric: `${g.asDisplay("x", "y", "z")} = ${g.asDisplay(this.#t.x.display, this.#t.y.display, this.#t.z.display)} + k\\cdot ${g.asDisplay(this.#e.x.display, this.#e.y.display, this.#e.z.display)}`,
      system: "",
      cartesian: `(x-${t})/${r} = (y-${e})/${o} = (z-${i})/${h}`
    };
  }
  get OA() {
    return this.#t;
  }
  set OA(t) {
    this.#t = t;
  }
  get d() {
    return this.#e;
  }
  set d(t) {
    this.#e = t;
  }
  get direction() {
    return this.#e.clone();
  }
  distanceTo(t) {
    const e = new g(this.#t, t), i = this.direction, s = this.direction.normSquare, r = e.cross(i).normSquare, o = r.clone().divide(s), h = o.clone().sqrt();
    return {
      value: Math.sqrt(o.value),
      fraction: o.clone().sqrt(),
      tex: h.exact ? h.tex : `\\sqrt{${o.tex}}`
    };
  }
  // ------------------------------------------
  // Mathematical operations
  hitSegment(t, e) {
    const i = this.intersection(
      new W(t, e)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(t.x.value, e.x.value) && i.point.x.value <= Math.max(t.x.value, e.x.value) && i.point.y.value >= Math.min(t.y.value, e.y.value) && i.point.y.value <= Math.max(t.y.value, e.y.value) && i.point.z.value >= Math.min(t.z.value, e.z.value) && i.point.z.value <= Math.max(t.z.value, e.z.value) : !1;
  }
  intersection = (t) => {
    throw new Error("Method not implemented.");
  };
  // ------------------------------------------
  isOnLine = (t) => !1;
  isParallelTo = (t) => {
    throw new Error("Method not implemented.");
  };
  isPerpendicularTo = (t) => {
    throw new Error("Method not implemented.");
  };
  isSameAs = (t) => {
    throw new Error("Method not implemented.");
  };
  isVertical = () => {
    throw new Error("Method not implemented.");
  };
  get point() {
    return this.#t.clone();
  }
  randomPoint = (t = 5) => {
    const e = this.#t.clone(), i = new a(A(t, !1));
    return new w(
      e.x.clone().add(this.#e.x.clone().multiply(i)),
      e.y.clone().add(this.#e.y.clone().multiply(i)),
      e.z.clone().add(this.#e.z.clone().multiply(i))
    );
  };
  // getValueAtX = (value: Fraction | number): Fraction => {
  //     const equ = this.equation.clone().isolate('y'),
  //         F = new Fraction(value)
  //     if (equ instanceof Equation) {
  //         return equ.right.evaluate({ x: F }) as Fraction
  //     }
  //     return new Fraction().invalid()
  // }
  // getValueAtY = (value: Fraction | number): Fraction => {
  //     const equ = this.equation.clone().isolate('x'),
  //         F = new Fraction(value)
  //     if (equ instanceof Equation) {
  //         return equ.right.evaluate({ y: F }) as Fraction
  //     }
  //     return new Fraction().invalid()
  // }
  simplify = () => {
    throw new Error("Method not implemented.");
  };
}
class tt {
  #t = new g(0, 0, 1);
  #e = new w(0, 0, 0);
  constructor(t) {
    return t && this.parse(t), this;
  }
  parse(t) {
    if (t.point && t.normal) {
      this.point = t.point, this.normal = t.normal;
      return;
    }
    if (t.point && t.directions?.length === 2) {
      this.point = t.point;
      const [e, i] = t.directions;
      this.normal = e.cross(i);
      return;
    }
    if (t.equation) {
      const e = t.equation.moveLeft().reduce().left, i = e.monomByLetter("x").coefficient, s = e.monomByLetter("y").coefficient, r = e.monomByLetter("z").coefficient, o = e.monomByDegree(0).coefficient;
      this.normal = new g(i, s, r), i.isNotZero() ? this.point = new w(o.clone().divide(i).opposite(), 0, 0) : s.isNotZero() ? this.point = new w(0, o.clone().divide(s).opposite(), 0) : this.point = new w(0, 0, o.clone().divide(r).opposite());
      return;
    }
    if (t.points?.length === 3 && t.points.every((e) => e instanceof g)) {
      const e = t.points[0], i = t.points[1], s = t.points[2], r = new g(e, i), o = new g(e, s);
      this.normal = r.cross(o), this.point = e;
      return;
    }
    if (t.coefficients?.length === 4) {
      const [e, i, s, r] = t.coefficients;
      this.normal = new g(e, i, s), this.point = new w(0, 0, -r);
      return;
    }
  }
  get tex() {
    return new v(
      new d("xyz", this.a, this.b, this.c, this.d),
      new d(0)
    ).reduce().tex;
  }
  get display() {
    return new v(
      new d("xyz", this.a, this.b, this.c, this.d),
      new d(0)
    ).reduce().display;
  }
  get a() {
    return this.#t.x;
  }
  angle(t, e, i) {
    if (t instanceof tt)
      return this.normal.angle(t.normal, e, i);
    let s;
    if (t instanceof g) {
      if (t.dimension !== 3)
        throw new Error("Vector is not 3D");
      s = t;
    } else
      s = t.direction;
    return (i ? Math.PI / 2 : 90) - this.normal.angle(s, !0, i);
  }
  get b() {
    return this.#t.y;
  }
  get c() {
    return this.#t.z;
  }
  get d() {
    return this.#t.dot(this.#e).opposite();
  }
  distanceTo(t) {
    return this.normal.dot(t).add(this.d).abs().value / this.normal.norm;
  }
  intersectWithLine(t) {
    const { point: e, direction: i } = t, s = this.normal.dot(e).add(this.d).divide(this.normal.dot(i).opposite());
    return new w(
      new g(e).add(i.clone().multiplyByScalar(s))
    );
  }
  intersectWithPlane(t) {
    throw this.normal.cross(t.normal), new w(0, 0, 0), new Error("Intersection with plane  not yet implemented !");
  }
  isPointOnPlane(t) {
    return this.normal.dot(t).add(this.d).isZero();
  }
  get normal() {
    return this.#t;
  }
  set normal(t) {
    this.#t = new g(t);
  }
  get point() {
    return this.#e;
  }
  set point(t) {
    this.#e = new w(t);
  }
}
var ot = /* @__PURE__ */ ((n) => (n[n.INTERIOR = 0] = "INTERIOR", n[n.EXTERIOR = 1] = "EXTERIOR", n[n.SECANT = 2] = "SECANT", n[n.TANGENT_INSIDE = 3] = "TANGENT_INSIDE", n[n.TANGENT_OUTSIDE = 4] = "TANGENT_OUTSIDE", n[n.SUPERPOSED = 5] = "SUPERPOSED", n[n.CONCENTRIC = 6] = "CONCENTRIC", n))(ot || {});
class St {
  #t = void 0;
  #e = void 0;
  #i = void 0;
  #s = 1;
  constructor(t, e) {
    return t && e && (this.#t = t, this.#e = new a(e).clone().pow(2), this.#n()), this;
  }
  fromEquation(t) {
    const e = new v(t).moveLeft().reduce(), i = ["x", "y", "z"];
    if (i.some((r) => e.degree(r).value !== 2))
      return this.makeUndefined();
    const s = e.left.monomByDegree(2, "x").coefficient;
    return i.some((r) => e.left.monomByDegree(2, r).coefficient.isNotEqual(s)) ? this.makeUndefined() : (this.#t = new w(
      e.left.monomByDegree(1, "x").coefficient.clone().opposite().divide(2),
      e.left.monomByDegree(1, "y").coefficient.clone().opposite().divide(2),
      e.left.monomByDegree(1, "z").coefficient.clone().opposite().divide(2)
    ), this.#e = e.left.monomByDegree(0).coefficient.clone().opposite().add(this.#t.x.clone().pow(2)).add(this.#t.y.clone().pow(2)).add(this.#t.z.clone().pow(2)), this.#n(), this);
  }
  get center() {
    if (this.#t === void 0)
      throw new Error("Sphere3 is undefined");
    return this.#t;
  }
  get squareRadius() {
    if (this.#e === void 0)
      throw new Error("Sphere3 is undefined");
    return this.#e;
  }
  get radius() {
    if (this.#e === void 0)
      throw new Error("Sphere3 is undefined");
    return this.#e.isSquare() ? {
      tex: this.#e.clone().sqrt().tex,
      display: this.#e.clone().sqrt().display,
      value: this.#e.clone().sqrt().value
    } : {
      tex: `\\sqrt{${this.#e.tex}}`,
      display: `sqrt(${this.#e.display})`,
      value: this.#e.clone().sqrt().value
    };
  }
  get equation() {
    if (this.#i === void 0)
      throw new Error("Sphere3 is undefined");
    return this.#i;
  }
  makeUndefined() {
    return this.#t = void 0, this.#e = void 0, this.#i = void 0, this;
  }
  get centerRadius() {
    return this.#s = 1, this;
  }
  get developped() {
    return this.#s = 0, this;
  }
  get tex() {
    return this.#r(!0);
  }
  get display() {
    return this.#r(!1);
  }
  #r = (t) => {
    if (this.#i === void 0)
      throw new Error("Sphere3 is undefined");
    if (this.#s === 0)
      return t ? this.#i.tex : this.#i.display;
    const e = [];
    return ["x", "y", "z"].forEach((s) => {
      if (this.center[s].isZero())
        e.push(`${s}^2`);
      else {
        const r = new d(s).subtract(this.center[s]);
        e.push(
          t ? `\\(${r.tex}\\)^2` : `(${r.display})^2`
        );
      }
    }), e.join("+") + "=" + (t ? this.squareRadius.tex : this.squareRadius.display);
  };
  #n() {
    this.#i = new v(
      new d("x").subtract(this.center.x).pow(2).add(
        new d("y").subtract(this.center.y).pow(2)
      ).add(
        new d("z").subtract(this.center.z).pow(2)
      ),
      new d(this.squareRadius)
    ).reduce();
  }
  static RELATIVE_POSITION = ot;
  relativePosition = (t) => {
    const e = this.center.distanceTo(t.center).value, i = this.radius.value, s = t.radius.value;
    return e > i + s ? 1 : e === i + s ? 4 : e === 0 ? i === s ? 5 : 6 : e === Math.abs(i - s) ? 3 : e < Math.abs(i - s) ? 0 : 2;
  };
  isPointOnSphere = (t) => this.#i?.test({
    x: t.x,
    y: t.y,
    z: t.z
  }) ?? !1;
}
function F(n) {
  const t = Object.assign(
    {
      negative: !0,
      max: 10,
      reduced: !0,
      zero: !0,
      natural: !1
    },
    n
  ), e = new a();
  if (t.negative ? e.numerator = A(t.max, t.zero) : e.numerator = T(t.zero ? 0 : 1, t.max), t.natural)
    e.denominator = 1;
  else {
    let i = 0;
    for (; e.isRelative() && i < 10; )
      e.denominator = T(1, t.max), i++;
  }
  return t.reduced ? e.reduce() : e;
}
function ht(n) {
  const t = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    n
  ), e = new m();
  if (e.coefficient = F({
    zero: t.zero,
    reduced: !0,
    natural: !t.fraction
  }), t.letters.length > 1) {
    for (const i of t.letters.split(""))
      e.setLetter(i, 0);
    for (let i = 0; i < t.degree; i++) {
      const s = _(t.letters.split(""));
      e.setLetter(s, e.degree(s).clone().add(1));
    }
  } else
    e.setLetter(t.letters, t.degree);
  return e;
}
const It = {
  letters: "x",
  degree: 2,
  fraction: !1,
  zero: !1,
  unit: !1,
  factorable: !1,
  allowNullMonom: !0,
  numberOfMonoms: 0,
  positive: !0
};
function at(n) {
  const t = Object.assign(
    It,
    n
  ), e = new d().empty();
  let i;
  for (let s = t.degree; s >= 0; s--)
    i = ht({
      letters: t.letters,
      degree: s,
      fraction: t.fraction,
      zero: s === t.degree ? !1 : t.allowNullMonom
    }), t.unit && t.degree === s && i.coefficient.one(), e.add(i);
  if (t.positive && e.monomByDegree().coefficient.isNegative() && e.monomByDegree().coefficient.opposite(), t.numberOfMonoms && t.numberOfMonoms > 0 && t.numberOfMonoms < e.length)
    for (; e.length > t.numberOfMonoms; ) {
      const s = T(1, e.length - 1);
      e.monoms.splice(s, 1);
    }
  return e.reduce();
}
function zt(n) {
  const t = Object.assign(
    {
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
    },
    n
  ), e = new d().one();
  for (let i = 0; i < t.degree; i++) {
    const s = at({
      degree: 1,
      unit: t.unit,
      fraction: t.fraction,
      letters: t.letters,
      zero: t.zero
    });
    e.multiply(s);
  }
  return new v(e, 0);
}
function H(n) {
  const t = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    n
  ), e = t.axis === "x", i = t.axis === "y", s = t.fraction ? F({ max: t.max, zero: e }) : new a(A(t.max, e)), r = t.fraction ? F({ max: t.max, zero: i }) : new a(A(t.max, i));
  return Number(t.quadrant) === 1 && (s.abs(), r.abs()), Number(t.quadrant) === 2 && (s.isPositive() && s.opposite(), r.isNegative() && r.opposite()), Number(t.quadrant) === 3 && (s.isPositive() && s.opposite(), r.isPositive() && r.opposite()), Number(t.quadrant) === 4 && (s.isNegative() && s.opposite(), r.isPositive() && r.opposite()), new w(s, r);
}
function Rt(n) {
  const t = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    n
  ), e = H(t.center);
  let i, s;
  return t.pointsOnCircle === 8 ? (i = T(1, 3), s = i ** 2 + (i + 1) ** 2) : s = T(1, 20), new U(e, s, !0);
}
function Pt(n) {
  const t = Object.assign(
    {
      A: {
        x: A(10),
        y: A(10)
      }
    },
    n
  ), e = new g(0, 0);
  for (; e.isNull; )
    e.x = A(10, t.allow?.vertical ?? !0), e.y = A(10, t.allow?.horizontal ?? !0);
  return t.slope === 1 ? e.x.sign() !== e.y.sign() && e.y.opposite() : t.slope === -1 && e.x.sign() !== e.y.sign() && e.y.opposite(), new b().fromPointAndDirection(new g(t.A.x, t.A.y), e);
}
function Zt(n) {
  const t = Object.assign(
    {
      A: {
        x: A(10),
        y: A(10),
        z: A(10)
      },
      direction: {
        x: A(10),
        y: A(10),
        z: A(10)
      }
    },
    n
  ), e = new w(t.A.x, t.A.y, t.A.z), i = new g(t.direction.x, t.direction.y, t.direction.z);
  return new W(e, i);
}
const Dt = {
  equation: (n) => zt(n),
  polynom: (n) => at(n),
  monom: (n) => ht(n),
  fraction: (n) => F(n),
  number: (n, t, e) => T(n, t, e),
  numberSym: (n, t) => A(n, t),
  prime: (n) => Bt(n),
  bool: (n) => rt(n),
  array: (n, t) => Mt(n, t),
  item: (n) => _(n),
  shuffle: (n) => nt(n),
  line: (n) => Pt(n),
  line3: (n) => Zt(n),
  vector: (n) => H(n),
  point: (n) => new w(H(n)),
  circle: (n) => Rt(n)
}, Ut = {
  Numeric: x,
  Fraction: a,
  Root: O,
  Monom: m,
  Polynom: d,
  Equation: v,
  Matrix: S,
  LinearSystem: M,
  Factor: E,
  PolyFactor: N,
  LogicalSet: Ct,
  Random: Dt,
  Geometry: {
    Vector: g,
    Point: w,
    Line: b,
    Triangle: V,
    Circle: U,
    Line3: W,
    Plane3: tt,
    Sphere3: St
  },
  NumExp: Tt
};
export {
  U as Circle,
  v as Equation,
  P as EquationSolver,
  D as FACTOR_DISPLAY,
  bt as FRAC_TYPE,
  E as Factor,
  a as Fraction,
  b as Line,
  W as Line3,
  M as LinearSystem,
  Ct as LogicalSet,
  S as Matrix,
  m as Monom,
  Tt as NumExp,
  x as Numeric,
  tt as Plane3,
  w as Point,
  N as PolyFactor,
  d as Polynom,
  Dt as Random,
  O as Root,
  ot as SPHERE3_RELATIVE_POSITION,
  $ as Solution,
  St as Sphere3,
  Lt as TableOfSigns,
  V as Triangle,
  g as Vector,
  $t as areVectorsColinears,
  qt as areVectorsEquals,
  Ut as default,
  Vt as determinantFromVectors,
  kt as dotProduct
};
//# sourceMappingURL=pimath.js.map
