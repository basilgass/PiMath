function fe(n) {
  const e = ne(n), t = [];
  let i, s;
  for (; e.length > 0; )
    i = e.shift() ?? 1, s = (e.length > 0 ? e.pop() : +i) ?? 1, t.push([i, s]);
  return t;
}
function de(...n) {
  const e = ee(...n);
  return n.map((t) => t / e);
}
function ne(n) {
  const e = Math.abs(n), t = Math.sqrt(e), i = [];
  for (let s = 1; s <= t; s++)
    n % s === 0 && (i.push(s), i.push(e / s));
  return i.sort(function(s, r) {
    return s - r;
  }), [...new Set(i)];
}
function ee(...n) {
  const e = function(s, r) {
    return r === 0 ? s : e(r, s % r);
  };
  let t = 1, i = 2;
  if (n.length === 0)
    return 1;
  if (n.length === 1)
    return n[0] === 0 ? 1 : n[0];
  if (t = e(n[0], n[1]), t === 1)
    return 1;
  for (i = 2; i < n.length && (t = e(t, n[i]), t !== 1); i++)
    ;
  return Math.abs(t);
}
function pe(...n) {
  return n.reduce(function(e, t) {
    return Math.abs(e * t / ee(e, t));
  });
}
function me(n, e = 3) {
  return +n.toFixed(e);
}
function ge(n) {
  if (Number.isSafeInteger(n) || n.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function we(n) {
  const e = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return n === void 0 ? e : e.slice(0, Math.min(e.length, n));
}
function ye(n, e) {
  const t = [], i = e === !0 ? +n : n ** 2;
  for (let s = 0; s <= n; s++)
    for (let r = 0; r <= n; r++)
      s ** 2 + r ** 2 === i && t.push([s, r, n]);
  return t;
}
function ve(n, e = 2) {
  return +`${Math.round(+`${n}e${e}`)}e-${e}`;
}
function xe(n, e) {
  let t = Math.floor(Math.pow(n, 1 / e));
  const i = n, s = 1;
  for (; t > 1; ) {
    const r = Math.pow(t, e);
    if (i % r === 0)
      return r;
    t--;
  }
  return s;
}
const b = {
  decompose: fe,
  dividers: ne,
  divideNumbersByGCD: de,
  gcd: ee,
  lcm: pe,
  numberCorrection: me,
  periodic: ge,
  primes: we,
  pythagoreanTripletsWithTarget: ye,
  round: ve,
  greatestPower: xe
};
var be = /* @__PURE__ */ ((n) => (n.frac = "frac", n.dfrac = "dfrac", n.tfrac = "tfrac", n))(be || {});
class a {
  #t = !1;
  #e = 1;
  #i = 3;
  #s = 1;
  #r = "frac";
  #n = !1;
  constructor(e, t) {
    return e !== void 0 && this.parse(e, t), this;
  }
  // ------------------------------------------
  /**
   * Parse the value to get the numerator and denominator
   * @param value : number or string to parse to get the fraction
   * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
   */
  parse = (e, t) => {
    let i;
    if (e === "")
      return this.#s = 0, this.#e = 1, this;
    switch (typeof e) {
      case "string":
        if (i = e.split("/"), i.length > 2 && (this.#s = NaN), i.map((s) => s === "" || isNaN(Number(s))).includes(!0) && (this.#s = NaN), i.length === 1)
          return this.parse(+i[0]);
        i.length === 2 ? i[1] === "0" ? (this.#s = NaN, this.#e = 1) : (this.#s = +i[0], this.#e = +i[1]) : (this.#s = NaN, this.#e = 1);
        break;
      case "number":
        if (Number.isSafeInteger(e))
          this.#s = +e, t === void 0 || !Number.isSafeInteger(t) ? this.#e = 1 : this.#e = +t;
        else {
          const [, s] = e.toString().split("."), r = s ? s.length : 0, o = Math.pow(10, r);
          t === void 0 ? (this.#s = e * o, this.#e = o) : Number.isSafeInteger(t) && (this.#s = e * o - Math.floor(e * Math.pow(10, r - t)), this.denominator = o - Math.pow(10, r - t)), this.#s = b.numberCorrection(this.#s), this.#e = b.numberCorrection(this.#e), this.reduce();
        }
        break;
      case "object":
        e instanceof a && (this.#s = +e.numerator, this.#e = +e.denominator);
        break;
    }
    return this;
  };
  clone = () => {
    const e = new a();
    return e.numerator = this.#s, e.denominator = this.#e, e.approximative = this.approximative, e;
  };
  get tex() {
    if (this.isInfinity())
      return `${this.sign() === 1 ? "+" : "-"}\\infty`;
    const e = this.#n && this.isPositive() ? "+" : "";
    return this.isExact() ? this.#e === 1 ? `${e}${this.#s}` : this.#s < 0 ? `-\\${this.#r}{ ${-this.#s} }{ ${this.#e} }` : `${e}\\${this.#r}{ ${this.#s} }{ ${this.#e} }` : e + this.value.toFixed(this.#i);
  }
  get display() {
    if (this.isInfinity())
      return `${this.sign() === 1 ? "+" : "-"}oo`;
    const e = this.#n && this.isPositive() ? "+" : "";
    return this.isExact() ? this.#e === 1 ? `${e}${this.#s}` : `${e}${this.#s}/${this.#e}` : e + this.value.toFixed(this.#i);
  }
  static average = (...e) => {
    const t = new a().zero();
    for (const i of e)
      t.add(i);
    return t.divide(e.length), t;
  };
  static isFraction(e) {
    if (e instanceof a || typeof e == "number" && !isNaN(+e))
      return !0;
    if (typeof e == "string") {
      const [t, i] = e.split("/");
      return !isNaN(+t) && !isNaN(+i);
    }
    return !1;
  }
  static max = (...e) => {
    let t = new a(e[0]);
    for (const i of e) {
      const s = new a(i);
      s.isGreater(t) && (t = s.clone());
    }
    return t;
  };
  static min = (...e) => {
    let t = new a(e[0]);
    for (const i of e) {
      const s = new a(i);
      s.isLesser(t) && (t = s.clone());
    }
    return t;
  };
  static sort = (e, t) => {
    const s = e.map((r) => r instanceof a ? r : new a(r)).sort((r, o) => r.value - o.value);
    return t && s.reverse(), s;
  };
  static toSameDenominateur(...e) {
    const t = e.map((s) => new a(s)), i = b.lcm(...t.map((s) => s.denominator));
    return t.forEach((s) => s.amplify(i / s.denominator)), t;
  }
  static unique = (e) => {
    const t = {}, i = [];
    return e.forEach((s) => {
      s instanceof a || (s = new a(s)), t[s.clone().reduce().tex] || (i.push(s.clone()), t[s.tex] = !0);
    }), i;
  };
  static xMultiply = (...e) => {
    const t = new a();
    for (const i of e) {
      const s = new a(i);
      t.numerator = t.numerator * s.numerator, t.denominator = t.denominator * s.denominator;
    }
    return t;
  };
  abs = () => (this.#s = Math.abs(this.#s), this.#e = Math.abs(this.#e), this);
  add = (e) => {
    if (e instanceof a) {
      const t = this.#s, i = this.#e;
      this.#s = t * e.denominator + e.numerator * i, this.#e = i * e.denominator, this.approximative = this.approximative || e.approximative;
    } else
      return this.add(new a(e));
    return this.reduce();
  };
  amplify = (e) => (Number.isSafeInteger(e) && (this.#s *= e, this.#e *= e), this);
  get approximative() {
    return this.#t;
  }
  set approximative(e) {
    this.#t = e;
  }
  areEquals = (...e) => e.every((t) => t.isEqual(e[0]));
  /**
   * Compare the current coefficient with another coefficient
   * @param F (Coefficient) The coefficient to _compare
   * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
   */
  compare = (e, t) => {
    t ??= "=";
    let i;
    switch (e instanceof a ? i = e.clone() : i = new a(e), t) {
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
    return this.#e;
  }
  set denominator(e) {
    this.#e = e;
  }
  get dfrac() {
    return this.#r = "dfrac", this;
  }
  digits(e) {
    return this.#i = e, this;
  }
  divide = (e) => {
    const t = new a(e);
    if (t.numerator === 0)
      return new a().infinite();
    const i = this.#s, s = this.#e;
    return this.#s = i * t.denominator, this.#e = s * t.numerator, this.approximative = this.approximative || t.approximative, this.reduce();
  };
  get frac() {
    return this.#r = "frac", this;
  }
  infinite = () => (this.#s = 1 / 0, this.#e = 1, this.approximative = !1, this);
  invalid = () => (this.#s = NaN, this.#e = 1, this.approximative = !1, this);
  inverse = () => {
    const e = this.sign(), t = Math.abs(this.#s);
    return this.#s = Math.abs(this.#e) * e, this.#e = t, this;
  };
  isApproximative = () => this.#t || this.#s.toString().length >= 15 && this.#e.toString().length >= 15;
  isEqual = (e) => this.compare(e, "=");
  isEven = () => this.isRelative() && this.value % 2 === 0;
  isExact = () => !this.isApproximative();
  isFinite = () => !this.isInfinity() && !this.isNaN();
  isGeq = (e) => this.compare(e, ">=");
  isGreater = (e) => this.compare(e, ">");
  isInfinity = () => Math.abs(this.#s) === 1 / 0;
  isLeq = (e) => this.compare(e, "<=");
  isLesser = (e) => this.compare(e, "<");
  isNaN = () => isNaN(this.#s);
  isNatural = () => this.isRelative() && this.isPositive();
  isNegative = () => this.sign() === -1;
  isNotEqual = (e) => this.compare(e, "<>");
  isNotZero = () => this.#s !== 0;
  isOdd = () => this.isRelative() && this.value % 2 === 1;
  isOne = () => this.#s === 1 && this.#e === 1;
  isPositive = () => this.sign() === 1;
  isRational = () => !this.isApproximative() && !this.isRelative();
  isReduced = () => Math.abs(b.gcd(this.#s, this.#e)) === 1;
  isRelative = () => !this.isApproximative() && this.clone().reduce().denominator === 1;
  isSquare = () => Math.sqrt(this.#s) % 1 === 0 && Math.sqrt(this.#e) % 1 === 0;
  isStrictlyNegative = () => this.value < 0;
  isStrictlyPositive = () => this.value > 0;
  isUnit() {
    return Math.abs(this.#s) === 1 && this.#e === 1;
  }
  // Mathematical operations specific to fractions
  isZero = () => this.#s === 0;
  multiply = (e) => {
    const t = new a(e);
    return this.#s = this.#s * t.numerator, this.#e = this.#e * t.denominator, this.approximative = this.approximative || t.approximative, this.reduce();
  };
  // ------------------------------------------
  get numerator() {
    return this.#s;
  }
  set numerator(e) {
    this.#s = e;
  }
  one = () => (this.#t = !1, this.#s = 1, this.#e = 1, this);
  opposite = () => (this.#s = -this.#s, this);
  pow = (e) => {
    if (e instanceof a)
      return this.pow(e.value);
    this.reduce(), e < 0 && this.inverse();
    const t = Math.floor(Math.pow(this.#s, Math.abs(e))), i = Math.floor(Math.pow(this.#e, Math.abs(e)));
    return t ** Math.abs(e) === this.#s && i ** Math.abs(e) === this.#e ? (this.#s = this.#s ** Math.abs(e), this.#e = this.#e ** Math.abs(e)) : (this.#s = this.#s ** Math.abs(e), this.#e = this.#e ** Math.abs(e)), this;
  };
  reduce = () => {
    const e = b.gcd(this.#s, this.#e);
    return this.#s = this.#s / e, this.#e = this.#e / e, this.#e < 0 && (this.#e = -this.#e, this.#s = -this.#s), this;
  };
  root = (e) => {
    if (e === 0)
      return this;
    if (e < 0 && this.inverse(), !Number.isSafeInteger(e))
      throw new Error("The root must be an integer.");
    if (this.isNegative() && e % 2 === 0)
      throw new Error("The root of a negative number must be odd.");
    const t = this.sign();
    this.abs(), this.reduce();
    const i = Math.floor(Math.pow(this.#s, Math.abs(1 / e))), s = Math.floor(Math.pow(this.#e, Math.abs(1 / e)));
    return this.#s = Math.pow(this.#s, Math.abs(1 / e)), this.#e = Math.pow(this.#e, Math.abs(1 / e)), (i !== this.#s || s !== this.#e) && (this.#s = this.#s / this.#e, this.#e = 1, this.#t = !0), this.multiply(t), this;
  };
  sign = () => this.#s * this.#e >= 0 ? 1 : -1;
  sqrt = () => this.root(2);
  subtract = (e) => e instanceof a ? this.add(e.clone().opposite()) : this.add(-e);
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get tfrac() {
    return this.#r = "tfrac", this;
  }
  get value() {
    const e = this.#s / this.#e;
    return e === 0 ? 0 : e;
  }
  withSign(e = !0) {
    return this.#n = e, this;
  }
  zero = () => (this.#t = !1, this.#s = 0, this.#e = 1, this);
}
class Ee {
  #t;
  #e;
  #i;
  #s;
  constructor(...e) {
    this.#t = 1, this.#i = 1, this.#e = 2, this.#s = !0, e.length > 0 && this.parse(e[0], e[1], e[2]);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get radical() {
    return this.#t;
  }
  set radical(e) {
    this.#t = e;
  }
  get nth() {
    return this.#e;
  }
  set nth(e) {
    Number.isSafeInteger(e) && e >= 2 ? this.#e = e : (console.log("Error setting the nth root"), this.#e = 2);
  }
  get coefficient() {
    return this.#i;
  }
  set coefficient(e) {
    this.#i = e;
  }
  get tex() {
    let e;
    return this.#i === 1 ? e = "" : this.#i === -1 ? e = "-" : e = this.#i.toString(), this.#t === 1 ? `${this.#i}` : this.#e === 2 ? `${e}\\sqrt{${this.#t}}` : `${e}\\sqrt[${this.#e}]{${this.#t}}`;
  }
  get display() {
    let e;
    return this.#i === 1 ? e = "" : this.#i === -1 ? e = "-" : e = this.#i.toString(), this.#t === 1 ? `${this.#i}` : this.#e === 2 ? `${e}sqrt{${this.#t}}` : `${e}root(${this.#e}){${this.#t}}`;
  }
  get value() {
    return this.#i * Math.pow(this.#t, 1 / this.#e);
  }
  // ------------------------------------------
  // Creation / parsing functions
  // ------------------------------------------
  parse = (e, t, i) => (this.#i = i ?? 1, this.#e = t ?? 2, this.#t = e, this.#e % 2 === 0 && this.#t < 0 && (this.#s = !1), this);
  // ------------------------------------------
  // Mathematical operations
  // ------------------------------------------
  reduce = () => {
    let e = Math.floor(Math.pow(this.#t, 1 / this.#e));
    for (; e > 1; ) {
      if (this.#t % Math.pow(e, this.#e) === 0) {
        this.#i *= e, this.#t = this.#t / Math.pow(e, this.#e), e = Math.floor(Math.pow(this.#t, 1 / this.#e));
        continue;
      }
      e--;
    }
    return this;
  };
  multiply = (e) => (this.#t *= e.radical, this.reduce());
  // ------------------------------------------
  // Help functions
  // ------------------------------------------
  hasRadical = () => !(this.#t === 1 || this.#t === 0 || !this.#s);
}
class F {
  #t;
  #e;
  #i;
  #s;
  constructor(e, t, i = "x") {
    if (this.#s = i, this.#e = 1e-4, this.#t = 0, Object.hasOwn(e, "moveLeft")) {
      const s = e;
      this.#i = s.left.clone().subtract(s.right);
    } else
      this.#i = e.clone().subtract(t ?? 0);
  }
  get bissectionCompexityCounter() {
    return this.#t;
  }
  get bissectionDeltaX() {
    return this.#e;
  }
  set bissectionDeltaX(e) {
    this.#e = e;
  }
  solve() {
    const e = this.#i.degree().value;
    if (e === 0)
      return [];
    if (e === 1)
      return this.#c();
    if (e === 2)
      return this.#d();
    const { solutions: t, polynom: i } = this.#l();
    return i.degree().isZero() ? t : i.degree().value <= 2 ? t.concat(
      new F(i.clone()).solve()
    ) : (this.#t = 0, t.concat(
      this.#o(i)
    ).sort((s, r) => s.value - r.value));
  }
  solveAsCardan() {
    if (this.#i.degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return this.#h();
  }
  #r(e, t) {
    return {
      variable: this.#s,
      exact: !1,
      value: +e.toFixed(10),
      tex: t?.tex ?? "",
      display: t?.display ?? ""
    };
  }
  #n(e) {
    if (e instanceof a && e.isApproximative())
      return this.#r(e.value);
    const t = new a(e);
    return {
      variable: this.#s,
      exact: t,
      value: t.value,
      tex: t.tex,
      display: t.display
    };
  }
  // Solve using bissection algorithm (approximative solution)
  #o(e) {
    const t = [], i = e.degree().value, [s, ...r] = e.getCoefficients(), o = 2 + Math.max(...r.map((u) => u.value / s.value)), h = this.#u(e, o, 100);
    return this.#f(h, i).forEach((u) => {
      const [l, p] = u;
      if (l === p)
        t.push(this.#n(l));
      else {
        const y = this.#a(e, l, p);
        y !== null && t.push(this.#r(y));
      }
    }), console.log("COMPLEXITY: ", this.#t), t;
  }
  #a(e, t, i) {
    let s = e.evaluate(t, !0), r = e.evaluate(i, !0);
    if (s * r > 0)
      return console.log("Pas de racine dans l'intervalle donné"), null;
    let o;
    for (; (i - t) / 2 > this.#e; ) {
      this.#t++, o = (t + i) / 2;
      const h = e.evaluate(o, !0);
      if (h === 0)
        return o;
      s * h < 0 ? (i = o, r = h) : (t = o, s = h);
    }
    return (t + i) / 2;
  }
  #u(e, t, i) {
    const s = [], r = 2 * t / i;
    for (let o = -t; o <= t; o += r) {
      const h = b.numberCorrection(o);
      s.push(
        {
          x: h,
          fx: e.evaluate(h, !0)
        }
      );
    }
    return s;
  }
  #f(e, t) {
    const i = [];
    for (let s = 1; s < e.length; s++) {
      const r = e[s], o = e[s - 1];
      if (r.fx === 0 ? i.push([r.x, r.x]) : r.fx * o.fx < 0 && i.push([o.x, r.x]), i.length === t)
        return i;
    }
    return i;
  }
  #l() {
    const e = this.#i.clone(), t = [], i = e.lcmDenominator();
    i !== 1 && e.multiply(i);
    const s = e.monomByDegree().coefficient, r = e.monomByDegree(0).coefficient;
    if (r.isZero()) {
      t.push(this.#n(0));
      const p = e.monoms.reduce((N, A) => A.degree().value < N.degree().value ? A : N), y = p.coefficient;
      p.clone().divide(y), e.divide(p);
    }
    const o = b.dividers(s.value), h = b.dividers(r.value), c = [];
    for (const p of o)
      for (const y of h) {
        const N = new a(y, p);
        c.find((A) => A.value === N.value) || (c.push(N.clone()), c.push(N.opposite().clone()));
      }
    c.forEach((p) => {
      e.evaluate(p).isZero() && t.push(this.#n(p));
    });
    for (const p of t) {
      if (p.exact.isZero())
        continue;
      const y = e.clone().fromCoefficients(
        p.exact.denominator,
        -p.exact.numerator
      );
      for (; e.isDividableBy(y); )
        e.divide(y);
    }
    if (e.degree().isZero() || e.degree().value > 3)
      return t.sort((p, y) => p.value - y.value), { solutions: t, polynom: e };
    const u = e.clone().zero(), l = new F(e, u, this.#s);
    return {
      solutions: t.concat(l.solve()).sort((p, y) => p.value - y.value),
      polynom: u
    };
  }
  #h() {
    const e = this.#i, t = e.monomByDegree(3).coefficient, i = e.monomByDegree(2).coefficient, s = e.monomByDegree(1).coefficient, r = e.monomByDegree(0).coefficient, o = i.clone().divide(t), h = s.clone().divide(t), c = r.clone().divide(t), u = h.clone().subtract(o.clone().pow(2).divide(3)), l = c.clone().subtract(o.clone().multiply(h).divide(3)).add(o.clone().pow(3).multiply(2).divide(27)), p = l.clone().opposite(), y = u.clone().opposite().pow(3).divide(27), N = p.clone().pow(2).subtract(y.clone().multiply(4)).opposite();
    if (N.isNegative()) {
      const A = l.clone().opposite().add(N.clone().opposite().sqrt()).divide(2).root(3), $ = l.clone().opposite().subtract(N.clone().opposite().sqrt()).divide(2).root(3), q = A.clone().add($).subtract(o.clone().divide(3));
      return [this.#n(q)];
    }
    if (N.isZero()) {
      const A = l.clone().opposite().divide(2).root(3), $ = A.clone().opposite().subtract(o.clone().divide(3)), q = A.clone().multiply(2).subtract(o.clone().divide(3));
      return $.isEqual(q) ? [this.#n($)] : [
        this.#n(q),
        this.#n($)
      ].sort((M, C) => M.value - C.value);
    }
    if (N.isPositive()) {
      const A = [], $ = u.value, q = l.value, M = o.value;
      for (let C = 0; C < 3; C++)
        A.push(2 * Math.sqrt(-$ / 3) * Math.cos(Math.acos(3 * q / (2 * $) * Math.sqrt(-3 / $)) / 3 + 2 * Math.PI * C / 3) - M / 3);
      return A.map((C) => this.#r(C)).sort((C, I) => C.value - I.value);
    }
    return [];
  }
  #c() {
    const [e, t] = this.#i.getCoefficients(), i = t.opposite().divide(e);
    return [
      this.#n(i)
    ];
  }
  #d() {
    const e = this.#i;
    e.monomByDegree().coefficient.isNegative() && e.opposite();
    const [t, i, s] = e.getCoefficients(), r = i.clone().pow(2).subtract(t.clone().multiply(s).multiply(4));
    if (r.isNegative())
      return [];
    if (r.isSquare()) {
      const o = r.sqrt(), h = i.clone().opposite().subtract(o).divide(t.clone().multiply(2)), c = i.clone().opposite().add(o).divide(t.clone().multiply(2));
      return o.isZero() ? [this.#n(h)] : [
        this.#n(h),
        this.#n(c)
      ].sort((u, l) => u.value - l.value);
    }
    return this.#p(t, i, r);
  }
  #p(e, t, i) {
    const s = b.dividers(i.value).filter((q) => Math.sqrt(q) % 1 === 0).map((q) => Math.sqrt(q)).pop() ?? 1, r = b.gcd(2 * e.value, t.value, s) * (e.isNegative() ? -1 : 1), o = t.clone().divide(r).opposite(), h = e.clone().divide(r).multiply(2), c = Math.abs(s / r), u = `${s === 1 ? "" : c + " "}\\sqrt{ ${i.clone().divide(s ** 2).tex} }`, l = `${s === 1 ? "" : c}sqrt(${i.clone().divide(s ** 2).display})`;
    function p(q, M, C, I) {
      const Z = M === "0" ? "" : M, D = C === "-" || Z !== "" ? ` ${C} ` : "";
      return q === "1" ? `${Z}${D}${I}` : `\\frac{ ${D}${D}${I} }{ ${q} }`;
    }
    function y(q, M, C, I) {
      const Z = M === "0" ? "" : M, D = C === "-" || Z !== "" ? C : "";
      return q === "1" ? `${Z}${D}${I}` : `(${Z}${D}${I})/${q}`;
    }
    const N = i.value ** 0.5, A = (-t.value - N) / (2 * e.value), $ = (-t.value + N) / (2 * e.value);
    return [
      this.#r(
        A,
        {
          tex: p(h.tex, o.tex, "-", u),
          display: y(h.display, o.display, "-", l)
        }
      ),
      this.#r(
        $,
        {
          tex: p(h.tex, o.tex, "+", u),
          display: y(h.display, o.display, "+", l)
        }
      )
    ].sort((q, M) => q.value - M.value);
  }
}
const te = {
  pi: Math.PI,
  e: Math.exp(1)
};
var d = /* @__PURE__ */ ((n) => (n.VARIABLE = "variable", n.COEFFICIENT = "coefficient", n.OPERATION = "operation", n.CONSTANT = "constant", n.FUNCTION = "function", n.FUNCTION_ARGUMENT = "function-argument", n.MONOM = "monom", n.LEFT_PARENTHESIS = "(", n.RIGHT_PARENTHESIS = ")", n))(d || {}), P = /* @__PURE__ */ ((n) => (n.EXPRESSION = "expression", n.POLYNOM = "polynom", n.SET = "set", n.NUMERIC = "numeric", n))(P || {});
function Ne(n, e) {
  if (n.length <= 1)
    return n;
  const t = Object.keys(e).filter((p) => e[p].type === d.FUNCTION).map((p) => p);
  t.sort((p, y) => y.length - p.length);
  const i = new RegExp(`^(${t.join("|")})\\(`), s = Object.keys(te);
  s.sort((p, y) => y.length - p.length);
  const r = new RegExp(`^(${s.join("|")})`), o = /^(\d+(\.\d+)?)/;
  let h = "", c, u, l;
  for (t.forEach((p) => {
    if (n.includes(p)) {
      const y = new RegExp(`${p}([0-9.]+)`, "g");
      n = n.replaceAll(y, `${p}($1)`);
    }
  }); n.length > 0; ) {
    if (c = u, l = void 0, t.length > 0 && i.exec(n)) {
      const p = t.find((y) => n.startsWith(y));
      p && (l = p + "(", n = n.slice(p.length + 1), u = d.FUNCTION);
    } else if (s.length > 0 && r.exec(n)) {
      const p = s.find((y) => n.startsWith(y));
      p && (l = p, n = n.slice(p.length), u = d.CONSTANT);
    } else if (o.exec(n)) {
      const p = o.exec(n);
      p && (l = p[0], n = n.slice(p[0].length), u = d.COEFFICIENT);
    } else
      switch (l = n[0], n = n.slice(1), l) {
        case "(":
          u = d.LEFT_PARENTHESIS;
          break;
        case ")":
          u = d.RIGHT_PARENTHESIS;
          break;
        case ",":
          u = d.FUNCTION_ARGUMENT;
          break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
          u = d.OPERATION;
          break;
        default:
          u = d.VARIABLE;
      }
    if (l === void 0 || u === void 0)
      throw new Error("The token is undefined");
    h += Ae(c, u), h += l;
  }
  return h;
}
function Ae(n, e) {
  return n === void 0 || n === d.OPERATION || e === d.OPERATION || n === d.LEFT_PARENTHESIS || n === d.FUNCTION || n === d.FUNCTION_ARGUMENT || e === d.RIGHT_PARENTHESIS || e === d.FUNCTION_ARGUMENT ? "" : "*";
}
const Oe = {
  "^": { precedence: 4, associative: "right", type: d.OPERATION },
  "*": { precedence: 3, associative: "left", type: d.OPERATION },
  "/": { precedence: 3, associative: "left", type: d.OPERATION },
  "+": { precedence: 2, associative: "left", type: d.OPERATION },
  "-": { precedence: 2, associative: "left", type: d.OPERATION }
}, Te = {
  "^": { precedence: 4, associative: "right", type: d.OPERATION },
  "*": { precedence: 3, associative: "left", type: d.OPERATION },
  "/": { precedence: 3, associative: "left", type: d.OPERATION },
  "+": { precedence: 2, associative: "left", type: d.OPERATION },
  "-": { precedence: 2, associative: "left", type: d.OPERATION },
  "%": { precedence: 3, associative: "right", type: d.OPERATION },
  sin: { precedence: 4, associative: "right", type: d.FUNCTION },
  cos: { precedence: 4, associative: "right", type: d.FUNCTION },
  tan: { precedence: 4, associative: "right", type: d.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: d.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: d.FUNCTION },
  ",": { precedence: 2, associative: "left", type: d.FUNCTION_ARGUMENT }
}, qe = {
  "^": { precedence: 4, associative: "right", type: d.OPERATION },
  "*": { precedence: 3, associative: "left", type: d.OPERATION },
  "/": { precedence: 3, associative: "left", type: d.OPERATION },
  "+": { precedence: 2, associative: "left", type: d.OPERATION },
  "-": { precedence: 2, associative: "left", type: d.OPERATION },
  "%": { precedence: 3, associative: "right", type: d.OPERATION },
  sin: { precedence: 4, associative: "right", type: d.FUNCTION },
  cos: { precedence: 4, associative: "right", type: d.FUNCTION },
  tan: { precedence: 4, associative: "right", type: d.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: d.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: d.FUNCTION },
  ln: { precedence: 4, associative: "right", type: d.FUNCTION },
  log: { precedence: 4, associative: "right", type: d.FUNCTION }
}, $e = {
  "&": { precedence: 3, associative: "left", type: d.OPERATION },
  "|": { precedence: 3, associative: "left", type: d.OPERATION },
  "!": { precedence: 4, associative: "right", type: d.OPERATION },
  "-": { precedence: 2, associative: "left", type: d.OPERATION }
};
class Q {
  #t;
  #e = [];
  #i = {};
  #s = [];
  #r;
  constructor(e) {
    this.#t = typeof e > "u" ? P.POLYNOM : e, this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return this.#e;
  }
  get rpnToken() {
    return this.#e.map((e) => e.token);
  }
  tokenConfigInitialization() {
    return this.#t === P.SET ? (this.#i = $e, this.#r = !1) : this.#t === P.NUMERIC ? (this.#i = qe, this.#r = !0) : this.#t === P.EXPRESSION ? (this.#i = Te, this.#r = !0) : (this.#i = Oe, this.#r = !0), this.#s = Object.keys(this.#i).sort((e, t) => t.length - e.length), this.#i;
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(e, t) {
    let i, s;
    if (i = "", s = void 0, e[t] === "(")
      i = "(", s = d.LEFT_PARENTHESIS;
    else if (e[t] === ")")
      i = ")", s = d.RIGHT_PARENTHESIS;
    else if (e[t] === ",")
      i = ",", s = d.FUNCTION_ARGUMENT;
    else {
      for (const r of this.#s)
        if (e.substring(t, t + r.length) === r) {
          i += r, s = this.#i[r].type;
          break;
        }
      for (const r in te)
        if (e.substring(t, t + r.length) === r) {
          i += r, s = d.CONSTANT;
          break;
        }
      if (i === "")
        if (/[0-9.]/.exec(e[t])) {
          const r = /^([0-9.]+)/.exec(e.substring(t));
          i = r ? r[0] : "", s = d.COEFFICIENT;
        } else if (/[a-zA-Z]/.exec(e[t])) {
          const r = /^([a-zA-Z])/.exec(e.substring(t));
          i = r ? r[0] : "", s = d.VARIABLE;
        } else
          console.log("Unidentified token", e[t], e, t), i = e[t], s = d.MONOM;
    }
    if (s === void 0)
      throw new Error(`Token type is undefined for token ${i}`);
    return [i, t + i.length, s];
  }
  /**
   * Parse an expression using the shutting yard tree algorithms
   * @param expr (string) Expression to analyse
   * Returns a RPN list of items.
   * @param uniformize
   */
  parse(e, t) {
    const i = [], s = [];
    let r = "", o = 0, h;
    (t ?? this.#r) && (e = Ne(e, this.#i));
    let c = 50, u;
    for (; o < e.length; ) {
      if (c--, c === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([r, o, h] = this.NextToken(e, o), h) {
        case d.MONOM:
        case d.COEFFICIENT:
        case d.VARIABLE:
        case d.CONSTANT:
          i.push({
            token: r,
            tokenType: h
          });
          break;
        case d.OPERATION:
          if (s.length > 0) {
            let l = s[s.length - 1];
            for (u = 50; l.token in this.#i && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (this.#i[r].associative === "left" && this.#i[r].precedence <= this.#i[l.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            this.#i[r].associative === "right" && this.#i[r].precedence < this.#i[l.token].precedence); ) {
              if (u--, u === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (i.push(s.pop() ?? { token: "", tokenType: d.OPERATION }), s.length === 0)
                break;
              l = s[s.length - 1];
            }
          }
          s.push({ token: r, tokenType: h });
          break;
        case d.FUNCTION_ARGUMENT:
          for (u = 50; s[s.length - 1].token !== "(" && s.length > 0; ) {
            if (u--, u === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            i.push(s.pop() ?? { token: r, tokenType: h });
          }
          break;
        case d.LEFT_PARENTHESIS:
          s.push({ token: r, tokenType: h }), e[o] === "-" && i.push({ token: "0", tokenType: d.COEFFICIENT });
          break;
        case d.RIGHT_PARENTHESIS:
          for (u = 50; s[s.length - 1].token !== "(" && s.length > 1; ) {
            if (u--, u === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
              break;
            }
            i.push(s.pop() ?? { token: r, tokenType: h });
          }
          s.pop();
          break;
        case d.FUNCTION:
          s.push({ token: r, tokenType: h });
          break;
        default:
          throw new Error(`Token type ${r} is not handled`);
      }
    }
    return this.#e = i.concat(s.reverse()), this;
  }
}
class Ce {
  _rpn;
  _expression;
  _isValid;
  constructor(e, t) {
    this._expression = e;
    try {
      this._rpn = new Q(P.NUMERIC).parse(e, t).rpn;
    } catch (i) {
      throw this._rpn = null, this._isValid = !1, console.warn(i), new Error(`There was a problem parsing: ${e}`);
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
  set isValid(e) {
    this._isValid = e;
  }
  get expression() {
    return this._expression;
  }
  evaluate(e) {
    const t = [];
    if (this._rpn === null)
      return this._isValid = !1, 0;
    this._isValid = !0;
    for (const i of this._rpn)
      if (i.tokenType === d.COEFFICIENT)
        if (!isNaN(+i.token))
          t.push(+i.token);
        else {
          const s = i.token.split("/");
          if (s.length !== 2)
            throw this._isValid = !1, new Error("This coefficient is not a fraction");
          t.push(+s[0] / +s[1]);
        }
      else if (i.tokenType === d.VARIABLE && e !== void 0)
        Object.hasOwn(e, i.token) && t.push(+e[i.token]);
      else if (i.tokenType === d.CONSTANT)
        t.push(te[i.token]);
      else if (i.tokenType === d.OPERATION) {
        if (i.token === "*") {
          const s = t.pop(), r = t.pop();
          if (r === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The multiplication factors ${r ?? "a"} or ${s ?? "b"} are not defined`);
          t.push(r * s);
        } else if (i.token === "/") {
          const s = t.pop(), r = t.pop();
          if (r === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The division values ${r ?? "a"} or ${s ?? "b"} are not defined`);
          t.push(r / s);
        } else if (i.token === "+") {
          const s = t.pop(), r = t.pop();
          if (r === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The addition values ${r ?? "a"} or ${s ?? "b"} are not defined`);
          t.push(+r + +s);
        } else if (i.token === "-") {
          const s = t.pop(), r = t.pop() ?? 0;
          if (s === void 0)
            throw this._isValid = !1, new Error("The subtraction value b is  not defined");
          t.push(r - s);
        } else if (i.token === "^") {
          const s = t.pop(), r = t.pop();
          if (r === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The base value ${r ?? "a"} or exponent ${s ?? "b"} are not defined`);
          t.push(Math.pow(r, s));
        }
      } else if (i.tokenType === d.FUNCTION) {
        const s = t.pop();
        if (s === void 0)
          throw this._isValid = !1, new Error(`The parameters for ${i.token} is not defined`);
        if (i.token === "sin")
          t.push(Math.sin(s));
        else if (i.token === "cos")
          t.push(Math.cos(s));
        else if (i.token === "tan")
          t.push(Math.tan(s));
        else if (i.token === "sqrt")
          t.push(Math.sqrt(s));
        else if (i.token === "nthrt") {
          const r = t.pop();
          if (r === void 0)
            throw this._isValid = !1, new Error("The nthrt function requires two parameters");
          s % 2 === 0 && r < 0 ? t.push(NaN) : t.push((r < 0 ? -1 : 1) * Math.pow(Math.abs(r), 1 / s));
        } else i.token === "ln" ? t.push(Math.log(s)) : i.token === "log" && t.push(Math.log10(s));
      }
    if (t.length === 1)
      return this._numberCorrection(t[0]);
    throw new Error(`There was a problem parsing: ${this._expression}`);
  }
  _numberCorrection(e, t = 8) {
    return +e.toFixed(t);
  }
}
class m {
  #t;
  #e;
  constructor(e) {
    return this.#t = new a().zero(), this.#e = {}, e !== void 0 && this.parse(e), this;
  }
  // -----------------------------------------
  /**
   * Parse a string to a monom. The string may include fraction.
   * @param inputStr
   */
  parse(e) {
    return this.#t = new a(), this.#e = {}, e instanceof m ? (this.#t = e.#t.clone(), this.#i(e), this) : e instanceof a ? (this.#t = e.clone(), this) : typeof e == "number" ? (this.#t = new a(e), this) : (isNaN(Number(e)) ? this.#r(e) : this.#t = new a(Number(e)), this);
  }
  /**
   * Clone the current Monom.
   */
  clone = () => {
    const e = new m();
    e.coefficient = this.#t.clone();
    for (const t in this.#e)
      e.setLetter(t, this.#e[t].clone());
    return e;
  };
  /**
   * Get the tex output of the monom
   */
  get tex() {
    let e = "";
    const t = Object.keys(this.#e).sort();
    for (const i of t)
      this.#e[i].isNotZero() && (e += i, this.#e[i].isNotEqual(1) && (e += `^{ ${this.#e[i].tfrac.tex} }`));
    return e === "" ? this.#t.value != 0 ? this.#t.frac.tex : "0" : this.#t.value === 1 ? e : this.#t.value === -1 ? `-${e}` : this.#t.value === 0 ? "0" : `${this.#t.frac.tex}${e}`;
  }
  // Display getter
  /**
   * This display getter is to be used in the polynom display getter
   */
  get display() {
    let e = "";
    const t = Object.keys(this.#e).sort();
    for (const i of t)
      this.#e[i].isNotZero() && (e += i, this.#e[i].isNotEqual(1) && (e += `^(${this.#e[i].display})`));
    return e === "" ? this.#t.value != 0 ? this.#t.display : "" : this.#t.value === 1 ? e : this.#t.value === -1 ? `-${e}` : this.#t.value === 0 ? "0" : `${this.#t.display}${e}`;
  }
  static gcd = (...e) => {
    for (const r of e)
      if (r.containsRationalPower())
        return new m().zero();
    const t = new m(), i = b.gcd(...e.map((r) => r.coefficient.numerator)), s = b.lcm(...e.map((r) => r.coefficient.denominator));
    t.coefficient = new a(i, s).reduce();
    for (const r of e) {
      for (const o in t.literal)
        o in r.literal || t.literal[o].zero();
      for (const o in r.literal)
        !t.hasVariable(o) && r.literal[o].isStrictlyPositive() ? t.literal[o] = r.literal[o].clone() : t.literal[o] = new a(Math.min(r.literal[o].value, t.literal[o].value));
    }
    return t;
  };
  /**
   * Multiply two monoms and return a NEW monom.
   * @param monoms
   */
  static xMultiply = (...e) => {
    const t = new m().one();
    for (const i of e)
      t.multiply(i);
    return t;
  };
  /**
   * Add all similar monoms. If they aren't similar, they are simply skipped.
   * @param M (Monom[]) The monoms to add.
   */
  add = (...e) => {
    for (const t of e) {
      const i = t instanceof m ? t : new m(t);
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
  set coefficient(e) {
    this.#t = new a(e);
  }
  containsRationalPower = () => Object.values(this.#e).some((e) => e.isRational());
  /**
   * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
   * @param letter (string) Letter to get to degree (power)
   */
  degree = (e) => this.variables.length === 0 ? new a().zero() : e === void 0 ? Object.values(this.#e).reduce((t, i) => t.clone().add(i)) : this.hasVariable(e) ? this.#e[e].clone() : new a().zero();
  /**
   * Derivative the monom
   * @param letter
   */
  derivative = (e = "x") => {
    if (this.hasVariable(e)) {
      const t = this.#e[e].clone(), i = this.clone();
      return i.#e[e].subtract(1), i.#t.multiply(new a(t.clone())), i;
    } else
      return new m().zero();
  };
  /**
   * Divide the current monoms by multiple monoms
   * @param M (Monom[])
   */
  divide = (...e) => {
    for (const t of e) {
      const i = t instanceof m ? t : new m(t);
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
    const e = b.dividers(Math.abs(this.coefficient.numerator));
    let t = [];
    for (const s in this.literal)
      t = this._getLiteralDividers(t, s);
    const i = [];
    if (t.length > 0 && e.length > 0)
      for (const s of e)
        for (const r of t) {
          const o = new m();
          o.coefficient = new a(s), o.literal = r, i.push(o);
        }
    else if (e.length === 0)
      for (const s of t) {
        const r = new m();
        r.coefficient = new a().one(), r.literal = s, i.push(r);
      }
    else
      for (const s of e) {
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
  evaluate = (e, t) => {
    if (t === !0) {
      if (e instanceof a)
        return this.#s(e.value);
      if (typeof e == "number")
        return this.#s(e);
      if (typeof e == "object") {
        const s = {};
        for (const r in e)
          s[r] = new a(e[r]).value;
        return this.#s(s);
      }
    }
    const i = this.coefficient.clone();
    if (typeof e == "number" || e instanceof a) {
      const s = {};
      return s[this.variables[0]] = new a(e), this.evaluate(s);
    }
    if (typeof e == "object") {
      if (this.variables.length === 0)
        return this.coefficient;
      for (const s in this.#e) {
        const r = new a(e[s]);
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
  hasVariable = (e) => Object.hasOwn(this.#e, e ?? "x");
  integrate(e, t, i) {
    const s = this.primitive(i);
    return s.evaluate(t).subtract(s.evaluate(e));
  }
  inverse = () => {
    this.#t.opposite();
    for (const e in this.#e)
      this.#e[e].opposite();
    return this;
  };
  isDivisible = (e) => {
    if (e.degree().isStrictlyPositive()) {
      for (const t of e.variables)
        if (!this.degree(t).isGeq(e.degree(t)))
          return !1;
    }
    return this.coefficient.isRational() || e.coefficient.isRational() ? !0 : this.coefficient.clone().divide(e.coefficient).isRelative();
  };
  /**
   * Determine if two monoms are equals
   * @param M
   */
  isEqual = (e) => this.isSameAs(e) && this.#t.isEqual(e.coefficient);
  isLiteralSquare = () => {
    for (const e in this.literal)
      if (this.literal[e].isRational() || this.literal[e].isEven())
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
  isSameAs = (e) => {
    const t = this.variables, i = e.variables, s = t.concat(i.filter((r) => !t.includes(r)));
    if (this.isZero() || e.isZero() || t.length === 0 && i.length === 0)
      return !0;
    if (t.length !== i.length)
      return !1;
    if (!this.isZero() && !e.isZero()) {
      for (const r of s)
        if (!this.hasVariable(r) || !e.hasVariable(r) || !this.#e[r].isEqual(e.literal[r]))
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
  set literal(e) {
    this.#e = e;
  }
  /**
   * Get the literal square roots of the Monom.
   * @returns {literalType<Fraction>}
   */
  get literalSqrt() {
    if (this.isLiteralSquare()) {
      const e = {};
      for (const t in this.#e)
        e[t] = this.#e[t].clone().sqrt();
      return e;
    } else
      return this.#e;
  }
  /**
   * Set the literal part of the monom from a string
   * @param inputStr  String like x^2y^3
   */
  set literalStr(e) {
    for (const t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)])
      t[1] in this.#e || (this.#e[t[1]] = new a().zero()), this.#e[t[1]].add(+t[2]);
    for (const t of [...e.matchAll(/([a-z](?!\^))/g)])
      t[1] in this.#e || (this.#e[t[1]] = new a().zero()), this.#e[t[1]].add(1);
  }
  /**
   * Multiple multiple monoms to the current monom
   * @param M (Monom[]) The monoms to multiply to.
   */
  multiply = (...e) => {
    for (const t of e) {
      const i = t instanceof m ? t : new m(t);
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
    let e = "";
    const t = Object.keys(this.#e).sort();
    for (const i of t)
      this.#e[i].isNotZero() && (e += (e === "" ? "" : "*") + i, this.#e[i].isNotEqual(1) && (e += `^(${this.#e[i].display})`));
    return e === "" ? this.#t.value != 0 ? this.#t.display : "" : this.#t.value === 1 ? e : this.#t.value === -1 ? `-${e}` : this.#t.value === 0 ? "0" : `${this.#t.display}*${e}`;
  }
  /**
   * Get the pow of a monom.
   * @param nb (number) : Mathematical pow
   */
  pow = (e) => {
    this.#t.pow(e);
    for (const t in this.#e)
      this.#e[t].multiply(e);
    return this;
  };
  primitive = (e = "x") => {
    const t = this.clone();
    let i;
    return t.hasVariable(e) ? (i = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(i), t.setLetter(e, i)) : (t.coefficient.isZero() && (t.coefficient = new a().one()), t.setLetter(e, 1)), t;
  };
  reduce = () => {
    this.coefficient.reduce();
    for (const e in this.#e)
      this.#e[e].isZero() && this.removeVariable(e);
    return this;
  };
  removeVariable(e) {
    delete this.#e[e];
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
  setLetter = (e, t) => t instanceof a ? (this.hasVariable(e) && t.isZero() && this.removeVariable(e), this.#e[e] = t.clone(), this) : this.setLetter(e, new a(t));
  /**
   * Return the square root of a monom
   */
  sqrt = () => {
    if (this.isSquare()) {
      this.#t.sqrt();
      for (const e in this.#e)
        this.#e[e].clone().divide(2);
    }
    return this;
  };
  /**
   * Subtract multiple monoms
   * @param M (Monom[]) The monoms to subtract
   */
  subtract = (...e) => {
    for (const t of e) {
      const i = t instanceof m ? t : new m(t);
      this.isSameAs(i) ? (this.isZero() && this.#i(i), this.#t.add(i.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", i.display);
    }
    return this;
  };
  // Getter helpers.
  /**
   * Get the variables letters
   */
  get variables() {
    const e = [];
    return Object.entries(this.literal).forEach(
      ([t, i]) => {
        i.isZero() || e.push(t);
      }
    ), e.sort(), e;
  }
  /**
   * Create a zero value monom
   */
  zero = () => (this.#t = new a().zero(), this.#e = {}, this);
  #i(e) {
    for (const t in e.literal)
      this.#e[t] = e.literal[t].clone();
  }
  #s = (e) => {
    let t = this.coefficient.value;
    if (typeof e == "number") {
      const i = {}, s = this.variables[0];
      return i[s] = e, this.#s(i);
    }
    if (e instanceof a) {
      const i = {};
      return i[this.variables[0]] = new a(e).value, this.#s(i);
    }
    if (typeof e == "object") {
      if (this.variables.length === 0)
        return this.coefficient.value;
      for (const i in this.#e) {
        const s = e[i];
        s instanceof a ? t *= s.value ** this.#e[i].value : t *= s ** this.#e[i].value;
      }
    }
    return t;
  };
  #r = (e) => {
    const i = new Q().parse(e).rpn, s = [];
    if (i.length === 0)
      return this.zero(), this;
    if (i.length === 1) {
      const r = i[0];
      return this.one(), r.tokenType === d.COEFFICIENT ? this.coefficient = new a(r.token) : r.tokenType === d.VARIABLE && this.setLetter(r.token, 1), this;
    } else
      for (const r of i)
        this.#n(s, r);
    return this.one(), this.multiply(s[0]), this;
  };
  #n = (e, t) => {
    let i, s, r, o, h;
    if (t.tokenType === d.COEFFICIENT)
      e.push(new m(new a(t.token)));
    else if (t.tokenType === d.VARIABLE) {
      const c = new m().one();
      c.setLetter(t.token, 1), e.push(c.clone());
    } else if (t.tokenType === d.OPERATION)
      switch (t.token) {
        case "-":
          s = e.pop() ?? new m().zero(), i = e.pop() ?? new m().zero(), e.push(i.subtract(s));
          break;
        case "*":
          s = e.pop() ?? new m().one(), i = e.pop() ?? new m().one(), e.push(i.multiply(s));
          break;
        case "/":
          s = e.pop() ?? new m().one(), i = e.pop() ?? new m().one(), e.push(i.divide(s));
          break;
        case "^": {
          h = e.pop()?.coefficient ?? new a().one(), r = e.pop() ?? new m().one(), o = r.variables[0], o && r.setLetter(o, h), e.push(r);
          break;
        }
      }
  };
  _getLiteralDividers(e, t) {
    const i = [];
    for (let s = 0; s <= this.literal[t].value; s++)
      if (e.length === 0) {
        const r = {};
        r[t] = new a(s), i.push(r);
      } else
        for (const r of e) {
          const o = {};
          for (const h in r)
            o[h] = r[h];
          o[t] = new a(s), i.push(o);
        }
    return i;
  }
}
function re(n, e = !0) {
  return e ? `\\left( ${n} \\right)` : `(${n})`;
}
function K(n) {
  return n.startsWith("(") && (n = n.substring(1)), n.endsWith(")") && (n = n.substring(0, n.length - 1)), n;
}
function W(n, e, t, i, s) {
  return n.map((r, o) => r === e ? t : r);
}
function oe(n, e) {
  if (!Number.isSafeInteger(e))
    throw new Error("Can only raise item by an integer");
  if (e < 0)
    throw new Error("Can only raise item by a positive integer");
  if (e === 0)
    return n.one();
  const t = n.clone();
  for (let i = 1; i < e; i++)
    n.multiply(t);
  return n;
}
class f {
  #t = "x";
  #e;
  #i;
  #s;
  #r = !1;
  constructor(e, ...t) {
    return this.#i = [], this.#e = [], this.#s = [], e !== void 0 && this.parse(e, ...t), this;
  }
  /**
   * Parse a string to a polynom.
   * @param inputStr
   * @param values
   */
  parse = (e, ...t) => {
    if (this.#i = [], this.#e = [], typeof e == "string")
      return this.#g(e, ...t);
    if ((typeof e == "number" || e instanceof a || e instanceof m) && t.length === 0)
      this.#i.push(new m(e));
    else if (e instanceof m && t.length > 0)
      this.#i.push(new m(e)), t.forEach((i) => {
        this.#i.push(new m(i));
      });
    else if (e instanceof f)
      for (const i of e.monoms)
        this.#i.push(i.clone());
    return this;
  };
  /**
   * Clone the polynom
   */
  clone = () => {
    const e = new f(), t = [];
    for (const i of this.#i)
      t.push(i.clone());
    return e.monoms = t, e;
  };
  get tex() {
    return this.#l("tex");
  }
  get display() {
    return this.#l();
  }
  add = (...e) => {
    for (const t of e)
      t instanceof f ? this.#i = this.#i.concat(t.monoms) : t instanceof m ? this.#i.push(t.clone()) : typeof t == "number" && Number.isSafeInteger(t) ? this.#i.push(new m(t.toString())) : this.#i.push(new m(t));
    return this.reduce();
  };
  commonMonom = () => {
    const e = new m().one(), t = this.gcdNumerator(), i = this.gcdDenominator(), s = this.degree();
    e.coefficient = new a(t, i);
    for (const r of this.variables) {
      e.setLetter(r, s);
      for (const o of this.#i)
        if (e.setLetter(r, a.min(o.degree(r), e.degree(r))), e.degree(r).isZero())
          break;
    }
    return e;
  };
  degree = (e) => {
    let t = new a().zero();
    for (const i of this.#i)
      t = a.max(i.degree(e).value, t);
    return t;
  };
  derivative = (e) => {
    const t = new f();
    for (const i of this.#i)
      t.add(i.derivative(e));
    return t.reduce();
  };
  divide = (e) => {
    if (e instanceof a)
      return this.#o(e);
    if (typeof e == "number" && Number.isSafeInteger(e))
      return this.#a(e);
    if (e instanceof m)
      return this.divide(new f(e));
    if (e instanceof f) {
      if (e.monoms.length === 1 && e.variables.length === 0)
        return this.#o(e.monoms[0].coefficient);
      {
        const { quotient: t, reminder: i } = this.euclidean(e);
        if (i.isZero())
          return this.#i = t.monoms, this;
      }
    } else if (typeof e == "string")
      return this.divide(new f(e));
    throw new Error(`Cannot divide by ${e}`);
  };
  empty = () => (this.#i = [], this);
  /**
   * Divide the current polynom by another polynom.
   * @param P
   * returns {quotient: Polynom, reminder: Polynom}
   */
  euclidean = (e) => {
    const t = e.variables[0], i = new f().zero(), s = this.clone().reorder(t);
    if (e.variables.length === 0)
      return {
        quotient: this.clone().divide(e).reduce(),
        reminder: new f().zero()
      };
    const r = e.monomByDegree(void 0, t), o = e.degree(t);
    let h, c = this.degree(t).value * 2;
    for (; s.degree(t).isGeq(o) && c > 0 && (c--, h = s.monomByDegree(void 0, t).clone().divide(r), !(!h.isZero() && (i.add(h), s.subtract(e.clone().multiply(h)).reduce(), h.degree(t).isZero()))); )
      ;
    return i.reduce(), s.reduce(), { quotient: i, reminder: s };
  };
  evaluate = (e, t) => {
    if (t)
      return this.#u(e);
    const i = new a().zero();
    return this.#i.forEach((s) => {
      i.add(s.evaluate(e, t));
    }), i;
  };
  // -------------------------------------
  /**
   * Factorize a polynom and store the best results in factors.
   * @param letter
   */
  // REFACTOR: duplicate code with equationSolver.
  factorize = (e) => {
    let t = [], i = this.clone().reorder();
    const s = i.commonMonom();
    if (i.monomByDegree().coefficient.isStrictlyNegative() && s.coefficient.isStrictlyPositive() && !s.isOne() && s.opposite(), !s.isOne()) {
      const h = new f(s);
      t = [h.clone()], i = i.euclidean(h).quotient;
    }
    let r = i.degree().clone().multiply(2).value, o = 1;
    for (; r >= 0; )
      if (r--, i.monoms.length < 2) {
        i.isOne() || (t.push(i.clone()), i.one());
        break;
      } else if (i.degree(e).isOne()) {
        t.push(i.clone()), i.one();
        break;
      } else {
        let h = this.#h(i, o, e ?? "x");
        for (o = i.degree(e).value; h.length > 0; ) {
          const c = h[0];
          if (!i.isDividableBy(c))
            h.shift();
          else {
            const u = i.euclidean(c);
            t.push(c), i = u.quotient.clone(), h = h.filter((l) => {
              const p = i.monoms[0], y = i.monoms[i.monoms.length - 1], N = l.monoms[0], A = l.monoms[l.monoms.length - 1];
              return y.isDivisible(A) ? p.isDivisible(N) : !1;
            });
          }
        }
      }
    return i.isOne() || t.push(i.clone()), this.#e = t, this.#e;
  };
  fromCoefficients(...e) {
    this.#i = [];
    const t = this.#t ?? "x";
    return e.reverse().forEach((i, s) => {
      const r = new m();
      r.coefficient = new a(i), r.setLetter(t, s), this.#i.push(r);
    }), this.reorder();
  }
  gcdDenominator = () => b.gcd(...this.getDenominators());
  gcdNumerator = () => b.gcd(...this.getNumerators());
  getCoefficients() {
    const e = this.clone().reorder(), t = this.degree().value + 1, i = new Array(t).fill(new a(0));
    return e.monoms.forEach((s) => {
      const r = t - s.degree().value - 1;
      i[r] = s.coefficient.clone();
    }), i;
  }
  // Next functions are used for for commonMonom, which is used in the factorize method.
  getDenominators = () => {
    const e = [];
    for (const t of this.#i)
      e.push(t.coefficient.denominator);
    return e;
  };
  getNumerators = () => {
    const e = [];
    for (const t of this.#i)
      e.push(t.coefficient.numerator);
    return e;
  };
  getZeroes = () => this.degree().isZero() ? [] : (this.roots = new F(this.clone()).solve(), this.roots);
  hasVariable(e) {
    return this.variables.includes(e);
  }
  integrate = (e, t, i = "x") => {
    const s = this.primitive(i), r = {}, o = {};
    return r[i] = new a(e), o[i] = new a(t), s.evaluate(o).subtract(s.evaluate(r));
  };
  inverse() {
  }
  isDeveloped = (e) => {
    let t;
    const i = e.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
    if (i.includes("(") || i.includes(")"))
      return !1;
    try {
      t = new f(e);
    } catch {
      return !1;
    }
    return !!this.isEqual(t);
  };
  isDividableBy = (e) => {
    if (e.degree().isOne()) {
      const t = e.getZeroes()[0];
      return t.exact instanceof a ? this.evaluate(t.exact).isZero() : !1;
    } else {
      const { reminder: t } = this.euclidean(e);
      return t.isZero();
    }
  };
  isEqual = (e) => this.#n(e, "=");
  get isMultiVariable() {
    return this.#i.some((e) => e.variables.length > 1);
  }
  isOne() {
    return this.#i.length === 1 && this.#i[0].coefficient.isOne() && this.degree().isZero();
  }
  isOppositeAt = (e) => this.#n(e.clone().opposite(), "=");
  isReduced = (e) => {
    if (!this.isDeveloped(e))
      return !1;
    const t = new f(e);
    if (t.monoms.length > this.monoms.length)
      return !1;
    for (const i of t.monoms)
      if (!i.coefficient.isReduced())
        return !1;
    return !1;
  };
  isSameAs = (e) => this.#n(e, "same");
  isZero() {
    return this.#i.length === 1 && this.#i[0].coefficient.isZero() || this.#i.length === 0;
  }
  lcmDenominator = () => b.lcm(...this.getDenominators());
  lcmNumerator = () => b.lcm(...this.getNumerators());
  get length() {
    return this.#i.length;
  }
  letters = () => {
    let e = /* @__PURE__ */ new Set();
    for (const t of this.#i)
      e = /* @__PURE__ */ new Set([...e, ...t.variables]);
    return [...e];
  };
  limitToInfinity = (e) => {
    const t = this.monomByDegree(void 0, e), i = t.coefficient.sign(), s = t.degree(e);
    return s.isStrictlyPositive() ? i === 1 ? new a().infinite() : new a().infinite().opposite() : s.isZero() ? t.coefficient : new a().zero();
  };
  limitToNegativeInfinity = (e) => {
    const t = this.monomByDegree(void 0, e), i = t.coefficient.sign(), s = t.degree(e);
    return s.isStrictlyPositive() ? i === -1 ? new a().infinite() : new a().infinite().opposite() : s.isZero() ? t.coefficient : new a().zero();
  };
  monomByDegree = (e, t) => {
    if (e === void 0)
      return this.monomByDegree(this.degree(t), t);
    const i = this.clone().reduce();
    for (const s of i.#i)
      if (s.degree(t).isEqual(e))
        return s.clone();
    return new m().zero();
  };
  // Used in LinearSystem.tex
  monomByLetter = (e) => {
    const t = this.clone().reduce();
    for (const i of t.#i)
      if (i.hasVariable(e))
        return i.clone();
    return new m().zero();
  };
  // ------------------------------------------
  get monoms() {
    return this.#i;
  }
  set monoms(e) {
    this.#i = e;
  }
  monomsByDegree = (e, t) => {
    if (e === void 0)
      return this.monomsByDegree(this.degree(t));
    const i = [], s = this.clone().reduce();
    for (const r of s.#i)
      r.degree(t).isEqual(e) && i.push(r.clone());
    return i;
  };
  multiply = (e) => {
    if (e instanceof f)
      return this.#m(e);
    if (e instanceof a)
      return this.#c(e);
    if (e instanceof m)
      return this.#p(e);
    if (Number.isSafeInteger(e) && typeof e == "number")
      return this.#d(e);
    if (typeof e == "string")
      try {
        const t = new a(e);
        return this.#c(t);
      } catch {
        throw new Error("Cannot multiply by this value.");
      }
    throw new Error("Cannot multiply by this value.");
  };
  get numberOfVars() {
    return this.variables.length;
  }
  one = () => (this.#i = [], this.#i.push(new m().one()), this);
  // ------------------------------------------
  opposite = () => (this.#i = this.#i.map((e) => e.opposite()), this);
  get plotFunction() {
    return this.#l("tex", !1, !1, !0);
  }
  pow = (e) => oe(this, e).reduce();
  primitive = (e) => {
    const t = new f();
    for (const i of this.#i)
      t.add(i.primitive(e));
    return t;
  };
  reduce = () => {
    let e = 0;
    for (; e < this.#i.length; ) {
      for (let t = e + 1; t < this.#i.length; t++)
        this.#i[e].isSameAs(this.#i[t]) && (this.#i[e].add(this.#i[t]), this.#i.splice(t, 1), this.#i[e].isZero() && (this.#i[e] = new m().zero()), t--);
      e++;
    }
    this.#i = this.#i.filter((t) => !t.coefficient.isZero());
    for (const t of this.#i)
      t.coefficient.reduce();
    return this.length === 0 ? new f().zero() : this.reorder();
  };
  reorder = (e = "x", t = !1) => {
    const i = this.variables.filter((s) => s !== e);
    return this.#i.sort(function(s, r) {
      const o = s.degree(e).value, h = r.degree(e).value;
      if (o !== h)
        return t ? o - h : h - o;
      if (i.length > 0)
        for (const c of i) {
          const u = s.degree(c).value, l = r.degree(c).value;
          if (u !== l)
            return t ? u - l : l - u;
        }
      return 0;
    }), this;
  };
  /**
   * Replace a variable (letter) by a polynom.
   * @param letter
   * @param P
   */
  replaceBy = (e, t) => {
    let i;
    const s = new f().zero();
    for (const r of this.monoms)
      !r.hasVariable(e) || r.literal[e].isZero() ? s.add(r.clone()) : (i = r.literal[e].clone(), r.removeVariable(e), s.add(t.clone().pow(Math.abs(i.numerator)).multiply(r)));
    return this.#i = s.reduce().monoms, this;
  };
  // ------------------------------------------
  root() {
    throw new Error("Cannot take the root from a polynom");
  }
  get roots() {
    return this.#r ? this.#s : this.getZeroes();
  }
  set roots(e) {
    this.#r = !0, this.#s = e;
  }
  setVariable(e) {
    return this.#t = e, this;
  }
  sqrt() {
    throw new Error("Cannot take the square root from a polynom");
  }
  subtract = (...e) => {
    for (const t of e)
      t instanceof f ? this.add(t.clone().opposite()) : t instanceof m ? this.#i.push(t.clone().opposite()) : this.#i.push(new m(t).opposite());
    return this.reduce();
  };
  tableOfSigns() {
    const e = this.roots;
    let t = new Array(2 * e.length + 1).fill("").map((i, s) => s % 2 === 0 ? "" : "z");
    if (t.length === 1) {
      const [i] = this.getCoefficients().map((s) => s.value);
      t = W(t, "", i > 0 ? "+" : "-");
    } else if (this.degree().isOne()) {
      const [i] = this.getCoefficients().map((s) => s.value);
      t[0] = i > 0 ? "-" : "+", t[1] = "z", t[2] = i > 0 ? "+" : "-";
    } else
      [
        e[0].value - 1,
        ...e.map((s, r) => r === e.length - 1 ? e[r].value + 1 : (e[r].value + e[r + 1].value) / 2)
      ].forEach((s, r) => {
        const o = this.evaluate({ x: s }, !0);
        t[r * 2] = o > 0 ? "+" : "-";
      });
    return { roots: e, signs: t };
  }
  get value() {
    if (this.degree().isZero())
      return this.monoms[0]?.coefficient.value ?? 0;
  }
  get variables() {
    let e = [];
    for (const t of this.#i)
      e = e.concat(t.variables);
    return e = [...new Set(e)], e.sort(), e;
  }
  /**
   * Set the polynom to zero.
   * @returns {this}
   */
  zero = () => (this.#i = [], this.#i.push(new m().zero()), this);
  get zeroes() {
    return this.getZeroes();
  }
  #n = (e, t) => {
    t ??= "=";
    const i = this.clone().reduce().reorder(), s = e.clone().reduce().reorder();
    switch (t) {
      case "=":
        return i.length !== s.length || !i.degree().isEqual(s.degree()) ? !1 : i.monoms.every((r, o) => r.isEqual(s.monoms[o]));
      case "same":
        return i.length !== s.length || !i.degree().isEqual(s.degree()) ? !1 : i.monoms.every((r, o) => r.isSameAs(s.monoms[o]));
      default:
        return !1;
    }
  };
  #o = (e) => {
    for (const t of this.#i)
      t.coefficient.divide(e);
    return this;
  };
  #a = (e) => {
    const t = new a(e);
    for (const i of this.#i)
      i.coefficient.divide(t);
    return this;
  };
  #u = (e) => {
    let t = 0;
    return this.#i.forEach((i) => {
      t += i.evaluate(e, !0);
    }), t;
  };
  #f = (e) => {
    let t, i, s, r, o, h, c, u, l;
    if (this.numberOfVars === 1)
      return s = this.monomByDegree(2, e).coefficient, r = this.monomByDegree(1, e).coefficient, o = this.monomByDegree(0, e).coefficient, h = r.clone().pow(2).subtract(s.clone().multiply(o).multiply(4)), h.isZero() ? (c = r.clone().opposite().divide(s.clone().multiply(2)), t = new f(e).subtract(c.display).multiply(c.denominator), i = new f(e).subtract(c.display).multiply(c.denominator), l = s.divide(c.denominator).divide(c.denominator), l.isOne() ? [t, i] : [new f(l.display), t, i]) : h.isPositive() && h.isSquare() ? (c = r.clone().opposite().add(h.clone().sqrt()).divide(s.clone().multiply(2)), u = r.clone().opposite().subtract(h.clone().sqrt()).divide(s.clone().multiply(2)), l = s.divide(c.denominator).divide(u.denominator), l.isOne() ? [
        new f(e).subtract(c.display).multiply(c.denominator),
        new f(e).subtract(u.display).multiply(u.denominator)
      ] : [
        new f(l.display),
        new f(e).subtract(c.display).multiply(c.denominator),
        new f(e).subtract(u.display).multiply(u.denominator)
      ]) : [this.clone()];
    if (s = this.monomByDegree(2, e), r = this.monomByDegree(1, e), o = this.monomByDegree(0, e), s.isLiteralSquare() && o.isLiteralSquare() && r.clone().pow(2).isSameAs(s.clone().multiply(o))) {
      const y = new f("x", s.coefficient, r.coefficient, o.coefficient).#f("x"), N = [];
      let A;
      if (y.length >= 2) {
        for (const $ of y)
          $.degree().isZero() ? N.push($.clone()) : (A = $.clone(), A.monoms[0].literal = s.literalSqrt, A.monoms[1].literal = o.literalSqrt, N.push(A.clone()));
        return N;
      }
    }
    return [this.clone()];
  };
  #l = (e, t, i, s) => {
    let r = "";
    for (const o of this.#i) {
      if (o.coefficient.value === 0)
        continue;
      let h;
      s ? h = o.plotFunction : h = e === "tex" ? o.tex : o.display, r += `${o.coefficient.sign() === 1 && (r !== "" || t === !0) ? "+" : ""}${h}`;
    }
    return i === !0 && this.length > 1 && (e === "tex" ? r = `\\left( ${r} \\right)` : r = `(${r})`), r === "" && (r = "0"), r;
  };
  #h = (e, t, i) => {
    const s = e.monoms[0].dividers, r = e.monoms[e.monoms.length - 1].dividers, o = [];
    return s.forEach((h) => {
      h.degree(i).isLeq(t) && r.forEach((c) => {
        h.degree(i).isNotEqual(c.degree(i)) && (o.push(new f(h, c)), o.push(new f(h, c.clone().opposite())));
      });
    }), o;
  };
  #c = (e) => {
    for (const t of this.#i)
      t.coefficient.multiply(e);
    return this.reduce();
  };
  #d = (e) => this.#c(new a(e));
  #p = (e) => {
    for (const t of this.#i)
      t.multiply(e);
    return this.reduce();
  };
  #m = (e) => {
    const t = [];
    for (const i of this.#i)
      for (const s of e.monoms)
        t.push(m.xMultiply(i, s));
    return this.#i = t, this.reduce();
  };
  #g(e, ...t) {
    if (t.length === 0) {
      if (e !== "" && !isNaN(Number(e))) {
        this.empty();
        const i = new m(Number(e));
        return this.add(i), this;
      }
      return this.#w(e);
    } else if (/^[a-z]+/.test(e)) {
      this.empty();
      const i = t.map((s) => new a(s));
      if (e.length > 1) {
        const s = e.split("");
        if (s.length < t.length - 2)
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
          o.coefficient = r.clone(), o.literalStr = `${e}^${s}`, this.add(o), s--;
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
  #w = (e) => {
    const i = new Q().parse(e).rpn;
    this.zero();
    const s = [];
    for (const r of i)
      this.#y(s, r);
    return s.length === 1 && this.add(s[0]), this.reorder();
  };
  #y = (e, t) => {
    switch (t.tokenType) {
      case d.COEFFICIENT:
        e.push(new f(t.token));
        break;
      case d.VARIABLE:
        e.push(new f().add(new m(t.token)));
        break;
      case d.CONSTANT:
        console.log("Actually, not supported - will be added later !");
        break;
      case d.OPERATION:
        if (e.length >= 2) {
          const i = e.pop(), s = e.pop();
          if (s === void 0 || i === void 0)
            break;
          if (t.token === "+")
            e.push(s.add(i));
          else if (t.token === "-")
            e.push(s.subtract(i));
          else if (t.token === "*")
            e.push(s.multiply(i));
          else if (t.token === "/")
            i.degree().isStrictlyPositive() ? console.log("divide by a polynom -> should create a rational polynom !") : e.push(s.divide(i.monoms[0].coefficient));
          else if (t.token === "^") {
            if (i.degree().isStrictlyPositive())
              throw new Error("Cannot elevate a polynom with another polynom !");
            if (i.monoms[0].coefficient.isRelative())
              e.push(s.pow(i.monoms[0].coefficient.value));
            else if (s.monoms.length === 1 && s.monoms[0].coefficient.isOne()) {
              for (const r in s.monoms[0].literal)
                s.monoms[0].literal[r].multiply(i.monoms[0].coefficient);
              e.push(s);
            } else
              console.error("Cannot have power with fraction");
          }
        } else if (t.token === "-") {
          const i = e.pop();
          i && e.push(i.opposite());
        } else
          throw new Error("Error parsing the polynom");
        break;
      case d.MONOM:
        console.error("The monom token should not appear here");
        break;
      case d.FUNCTION:
        console.error("The function token should not appear here - might be introduced later.");
        break;
    }
  };
}
class x {
  // Left part of the equation
  #t;
  // Right part of the equation
  #e;
  // Signe of the equation
  #i;
  constructor(e, t, i) {
    if (this.#t = new f().zero(), this.#e = new f().zero(), this.#i = "=", e !== void 0 && t === void 0) {
      if (e instanceof x)
        return e.clone();
      typeof e == "string" && this.parse(e);
    } else e !== void 0 && t !== void 0 && (this.left = new f(e), this.right = new f(t));
    return i !== void 0 && (this.sign = i), this;
  }
  // ------------------------------------------
  parse = (e) => {
    const t = this.#s(e);
    if (t === !1)
      throw new Error("The equation is not valid (no sign found)");
    const i = e.split(t);
    return this.create(new f(i[0]), new f(i[1]), this.#r(t));
  };
  clone = () => new x(this.#t.clone(), this.#e.clone(), this.#i);
  get tex() {
    return `${this.#t.tex}${this.signAsTex}${this.#e.tex}`;
  }
  get display() {
    return `${this.#t.display}${this.signAsTex}${this.#e.display}`;
  }
  static isEquationString(e) {
    return e.includes("=") || e.includes("<") || e.includes(">") || e.includes("<=") || e.includes(">=");
  }
  static makeSolutionsUnique(e, t) {
    const i = [], s = e.filter((r) => i.includes(r.tex) ? !1 : (i.push(r.tex), !0));
    return t === !0 && s.sort((r, o) => r.value - o.value), s;
  }
  /**
   * Add a value to the equation
   * if value is an equation, add the left part to the left part of the equation
   * and the right part to the right part of the equation
   * if value is a string, try to create an equation
   * if it fails, create a polynom and add it to the left and right part of the equation
   * @param value | Polynom | Monom | Fraction | string | monom
   */
  add(e) {
    if (e instanceof x)
      return this.#t.add(e.left), this.#e.add(e.right), this;
    if (typeof e == "string" && !x.isEquationString(e))
      return this.add(new x(e));
    const t = new f(e);
    return this.#t.add(t), this.#e.add(t), this;
  }
  create = (e, t, i) => (this.#t = e, this.#e = t, this.#i = this.#r(i ?? "="), this);
  /**
   * Get the degree of the equation
   * @param letter
   */
  degree = (e) => a.max(this.#t.degree(e), this.#e.degree(e));
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
  divide = (e) => {
    const t = new a(e);
    return t.isZero() ? this : this.multiply(t.inverse());
  };
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param values
   * @param asNumeric
   */
  evaluate(e, t) {
    const i = this.#t.evaluate(e, t), s = this.#e.evaluate(e, t);
    return t ? i === s : i.isEqual(s);
  }
  // -----------------------------------------------
  /**
   * Determine if the equation contains a variable.
   * @param letter
   */
  hasVariable = (e) => this.variables.includes(e);
  isEqual(e) {
    const t = new x(e);
    return t.left.isEqual(this.#t) && t.right.isEqual(this.#e);
  }
  // -----------------------------------------------
  // Equations operations
  // Equations helpers
  isEqualTo = (e) => {
    const t = e.clone().moveLeft().left, i = this.clone().moveLeft().left;
    return t.isEqual(i) || t.isOppositeAt(i);
  };
  isLinearTo = (e) => {
    const t = e.clone().moveLeft().simplify().left, i = this.clone().moveLeft().simplify().left;
    return t.isEqual(i) || t.isOppositeAt(i);
  };
  /**
   * Determine if the equation contains more than one letter/variable.
   */
  isMultiVariable = () => this.#t.isMultiVariable || this.#e.isMultiVariable;
  /**
   * Reorder the polynom to have only one letter on the left, the rest on the right.
   * @param letter
   */
  isolate = (e) => {
    if (!this.degree(e).isOne() || this.isMultiVariable())
      return !1;
    let t;
    this.#t.subtract(this.#e), this.#e.zero();
    const i = [...this.#t.monoms];
    for (const r of i)
      r.hasVariable(e) || (t = r.clone(), this.#t.subtract(t), this.#e.subtract(t));
    if (this.#t.length !== 1)
      return !1;
    const s = this.#t.monoms[0].coefficient.clone();
    return this.#t.divide(s), this.#e.divide(s), this;
  };
  // Getter and setter
  get left() {
    return this.#t;
  }
  set left(e) {
    this.#t = e;
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
  multiply = (e) => {
    const t = new a(e);
    return this.#t.multiply(t), this.#e.multiply(t), this.#i !== "=" && t.sign() === -1 && this.#n(), this;
  };
  get numberOfVars() {
    return this.variables.length;
  }
  opposite = () => (this.#t = this.#t.opposite(), this.#e = this.#e.opposite(), this);
  pow(e) {
    return this.#t.pow(e), this.#e.pow(e), this;
  }
  reduce() {
    return this.moveLeft(), this.#t.reduce(), this.simplify(), this.#t.monoms[0].coefficient.isNegative() && this.multiply(-1), this;
  }
  reorder = (e) => (this.#t.subtract(this.#e), this.#e.zero(), this.#t.reorder(), e ? this : (this.#t.monoms.filter((t) => t.degree().isZero()).forEach((t) => {
    const i = t.clone();
    this.#t.subtract(i), this.#e.subtract(i);
  }), this.#t.reorder(), this.#e.reorder(), this));
  // ------------------------------------------
  replaceBy = (e, t) => (this.#t.replaceBy(e, t), this.#e.replaceBy(e, t), this);
  get right() {
    return this.#e;
  }
  set right(e) {
    this.#e = e;
  }
  // ------------------------------------------
  get sign() {
    return this.#i;
  }
  set sign(e) {
    this.#i = this.#r(e);
  }
  get signAsTex() {
    return this.#i === ">=" ? "\\geq" : this.#i === "<=" ? "\\leq" : this.#i;
  }
  /**
   * Multiply by the lcm denominator and divide by the gcm numerators.
   */
  simplify = () => (this.multiply(b.lcm(...this.#t.getDenominators(), ...this.#e.getDenominators())), this.divide(b.gcd(...this.#t.getNumerators(), ...this.#e.getNumerators())), this);
  // -----------------------------------------------
  solve = () => new F(this.clone()).solve();
  split() {
    return [this.#t.clone(), this.#e.clone()];
  }
  subtract(e) {
    if (e instanceof x)
      return this.#t.subtract(e.left), this.#e.subtract(e.right), this;
    if (typeof e == "string" && !x.isEquationString(e))
      return this.subtract(new x(e));
    const t = new f(e);
    return this.#t.subtract(t), this.#e.subtract(t), this;
  }
  test = (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e));
  get variables() {
    return [...new Set(this.#e.variables.concat(this.#t.variables))];
  }
  #s = (e) => {
    if (e.includes("geq"))
      return e.includes("\\geq") ? "\\geq" : "geq";
    if (e.includes("leq"))
      return e.includes("\\leq") ? "\\leq" : "leq";
    if (e.includes(">="))
      return ">=";
    if (e.includes("=>"))
      return "=>";
    if (e.includes(">"))
      return ">";
    if (e.includes("<="))
      return "<=";
    if (e.includes("=<"))
      return "=<";
    if (e.includes("<"))
      return "<";
    if (e.includes("="))
      return "=";
    throw new Error("The equation is not valid (no sign found)");
  };
  // -----------------------------------------------
  // Equations solving algorithms
  #r = (e) => e === void 0 ? "=" : e.includes("geq") || e.includes(">=") || e.includes("=>") ? ">=" : e.includes(">") ? ">" : e.includes("leq") || e.includes("<=") || e.includes("=<") ? "<=" : e.includes("<") ? "<" : "=";
  #n = () => this.#i === "=" ? this : this.#i.includes("<") ? (this.#i.replace("<", ">"), this) : this.#i.includes(">") ? (this.#i.replace(">", "<"), this) : this;
}
class E {
  #t;
  #e;
  #i;
  #s = !1;
  constructor(e, t) {
    return e instanceof E ? (this.#e = e.polynom.clone(), this.#i = e.power.clone(), t !== void 0 && this.#i.multiply(new a(t))) : e !== void 0 ? (this.#e = new f(e), this.#i = new a(t ?? 1)) : (this.#e = new f(), this.#i = new a(1)), this.#t = 1, this;
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  clone() {
    return new E(this);
  }
  fromPolynom(e) {
    return this.#e = new f(e), this.#i = new a(1), this;
  }
  get tex() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, s;
    return this.#t === 0 && t > 1 ? (i = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, s = e === 1 ? "" : `^{ ${e} }`) : (i = this.#s && this.power.isOne() ? this.polynom.tex : re(this.polynom.tex), s = t === 1 && e === 1 ? "" : `^{ ${this.power.tex} }`), i = `${i}${s}`, this.#t === 0 && e < 0 && (i = `\\frac{ 1 }{ ${i} }`), i;
  }
  get display() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, s;
    return this.#t === 0 && t > 1 ? (i = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, s = e === 1 ? "" : `^(${e})`) : (i = this.#s && this.power.isOne() ? this.polynom.display : re(this.polynom.display, !1), s = t === 1 && e === 1 ? "" : `^(${this.power.display})`), i = `${i}${s}`, this.#t === 0 && e < 0 && (i = `1/(${i})`), i;
  }
  add() {
    throw new Error("Adding two factors is not possible");
  }
  get asSingle() {
    return this.#s = !0, this;
  }
  degree(e) {
    return this.polynom.degree(e).multiply(this.power);
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
  divide(e) {
    if (e instanceof E && this.isSameAs(e))
      return this.power.subtract(e.power), this;
    const t = new f(e);
    if (this.isSameAs(t))
      return this.power.subtract(1), this;
    throw new Error("The two factors must be the same");
  }
  evaluate(e, t) {
    return t ? this.polynom.evaluate(e, !0) ** this.power.value : this.polynom.evaluate(e).pow(this.power);
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
  isSameAs(e) {
    let t;
    return e instanceof E ? t = e.polynom : e instanceof f ? t = e : t = new f(e), this.polynom.isEqual(t);
  }
  isZero() {
    return this.polynom.isZero();
  }
  multiply(e) {
    if (e instanceof E && this.isSameAs(e))
      return this.power.add(e.power), this;
    const t = new f(e);
    if (this.isSameAs(t))
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
  set polynom(e) {
    this.#e = e;
  }
  pow(e) {
    return this.power.multiply(e), this;
  }
  get power() {
    return this.#i;
  }
  set power(e) {
    this.#i = new a(e);
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    throw new Error("Method not implemented.");
  }
  root(e) {
    return this.power.divide(e), this;
  }
  sqrt() {
    return this.root(2);
  }
  subtract() {
    throw new Error("Subtracting two factors is not possible");
  }
  tableOfSigns() {
    const e = this.power.clone().reduce(), t = this.polynom.tableOfSigns();
    return e.isStrictlyNegative() && (t.signs = W(t.signs, "z", "d")), e.denominator % 2 === 0 ? t.signs = W(t.signs, "-", "h") : e.numerator % 2 === 0 && (t.signs = W(t.signs, "-", "+")), { roots: t.roots, signs: t.signs };
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
var U = /* @__PURE__ */ ((n) => (n[n.ROOT = 0] = "ROOT", n[n.POWER = 1] = "POWER", n))(U || {});
class z {
  #t;
  // Solve steps for TeX output.
  #e = [];
  // Determine the letters in the linear asSystem, usually ['x', 'y']
  #i;
  constructor(...e) {
    return this.#t = [], this.#i = [], e.length > 0 && this.parse(...e), this;
  }
  parse = (...e) => (this.#t = e.map((t) => new x(t)), this.#s(), this);
  clone = () => new z().parse(...this.#t.map((e) => e.clone()));
  get tex() {
    const e = this.clone().reorder();
    return this.buildTex(e.equations);
  }
  get display() {
    return this.tex + "as display";
  }
  static fromMatrix(e, t = "xyz") {
    const i = e[0].length;
    if (e.some((r) => r.length !== i))
      throw new Error("All rows must have the same number of columns");
    const s = t.split("").splice(0, i - 1);
    return new z(
      ...e.map((r) => {
        const o = new f(s.join(""), ...r);
        return new x(o, 0);
      })
    );
  }
  add(e, t) {
    if (e instanceof z) {
      const i = e.equations.length;
      if (i !== this.#t.length)
        throw new Error("The number of equations must be the same");
      for (let s = 0; s < i; s++)
        this.#t[s].add(e.equations[s]);
    } else {
      if (t === void 0 || t < 0 || t >= this.#t.length)
        throw new Error("Index out of range");
      const i = new x(e);
      this.#t[t].add(i);
    }
    return this;
  }
  buildTex = (e, t) => {
    let i, s, r = [];
    const o = [];
    for (const c of e)
      r = r.concat(c.letters());
    r = [...new Set(r)], r.sort();
    for (let c = 0; c < e.length; c++) {
      const u = e[c];
      i = [];
      for (const l of r)
        s = u.left.monomByLetter(l), i.length === 0 ? i.push(s.isZero() ? "" : s.tex) : i.push(s.isZero() ? "" : (s.coefficient.sign() === 1 ? "+" : "") + s.tex);
      if (i.push("="), i.push(u.right.tex), t?.[c] !== void 0) {
        i[i.length - 1] = i[i.length - 1] + " \\phantom{\\quad}";
        for (const l of t[c])
          i.push(`\\ \\cdot\\ ${l.startsWith("-") ? "\\left(" + l + "\\right)" : l}`);
      }
      o.push(i.join("&"));
    }
    let h = 0;
    return t !== void 0 && t.length > 0 && (h = t[0].length), `\\left\\{\\begin{array}{${"r".repeat(r.length)}cl ${"|l".repeat(h)}}${o.join("\\\\ ")}\\end{array}\\right.`;
  };
  degree(e) {
    return a.max(...this.#t.map((t) => t.degree(e)));
  }
  // ------------------------------------------
  get equations() {
    return this.#t;
  }
  set equations(e) {
    this.#t = e, this.#s();
  }
  evaluate(e, t) {
    throw new Error("Method not implemented.");
  }
  hasVariable(e) {
    return this.#i.includes(e);
  }
  isEqual(e) {
    return this.equations.every((t, i) => t.isEqual(e.equations[i]));
  }
  get isSolvable() {
    return this.variables.length === this.#t.length;
  }
  get matrix() {
    return this.#r();
  }
  mergeEquations(e, t) {
    const i = this.equations[e.id].clone().multiply(e.factor), s = this.equations[t.id].clone().multiply(t.factor);
    return i.add(s);
  }
  multiply(e, t) {
    if (Array.isArray(e)) {
      if (e.length !== this.#t.length)
        throw new Error("The number of values must be the same as the number of equations");
      for (let i = 0; i < e.length; i++)
        this.#t[i].multiply(e[i]);
      return this;
    }
    if (t === void 0 || t < 0 || t >= this.#t.length)
      throw new Error("Index out of range");
    return this.#t[t].multiply(e), this;
  }
  reduce() {
    return this.equations.forEach((e) => e.reduce()), this;
  }
  // ------------------------------------------
  reorder = () => {
    for (const e of this.#t)
      e.reorder();
    return this;
  };
  solve() {
    const e = [this.tex], t = this.clone();
    for (; t.variables.length > 1; ) {
      const i = t.variables[t.variables.length - 1], s = new z();
      t.solve_compute_factors(i).slice(0, t.variables.length - 1).forEach((o) => {
        s.equations.push(t.mergeEquations(...o));
      }), t.equations = s.equations, e.push(t.tex), t.reduce(), e.push(t.tex);
    }
    return console.log("\\begin{aligned}" + e.join("\\\\[2em]") + "\\end{aligned}"), [];
  }
  solveMatrix = () => {
    const [e, t] = this.matrix, i = e.map((s, r) => [...s, t[r]]);
    for (let s = 0; s < e.length; s++) {
      let r = i[s][s].clone();
      if (r.isZero()) {
        const o = i.find((h, c) => c > s && !h[s].isZero());
        if (o)
          i[s].forEach((h, c) => h.add(o[c])), r = i[s][s].clone();
        else
          throw new Error("Unsolvable...");
      }
      i[s] = i[s].map((o) => o.divide(r));
      for (let o = 0; o < e.length; o++) {
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
  solve_compute_factors(e) {
    const t = [], i = this.equations.map((s) => s.left.monomByLetter(e).coefficient.value);
    return i.forEach((s, r) => {
      for (let o = r + 1; o < i.length; o++) {
        const h = b.lcm(s, i[o]), c = s < 0 ? -1 : 1;
        t.push([
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
    }), t.sort((s, r) => Math.abs(s[0].factor) + Math.abs(s[1].factor) - (Math.abs(r[0].factor) + Math.abs(r[1].factor)));
  }
  subtract(e, t) {
    if (e instanceof z) {
      const i = e.equations.length;
      if (i !== this.#t.length)
        throw new Error("The number of equations must be the same");
      for (let s = 0; s < i; s++)
        this.#t[s].subtract(e.equations[s]);
    } else {
      if (t === void 0 || t < 0 || t >= this.#t.length)
        throw new Error("Index out of range");
      const i = new x(e);
      this.#t[t].subtract(i);
    }
    return this;
  }
  get variables() {
    return this.#i;
  }
  set variables(e) {
    const t = typeof e == "string" ? e.split("") : [...e];
    t.sort(), this.#i = t;
  }
  #s = () => (this.#i = this.#t.reduce((e, t) => [.../* @__PURE__ */ new Set([...e, ...t.variables])], []), this.#i.sort(), this);
  #r = () => {
    const e = [], t = [];
    for (const i of this.#t) {
      const s = [], r = i.clone().reorder();
      for (const o of this.variables) {
        const h = r.left.monomByLetter(o);
        s.push(h.coefficient);
      }
      t.push(r.right.monoms[0].coefficient), e.push(s);
    }
    return [e, t];
  };
}
class ke {
  #t;
  /**
   *
   * @param {string} value (optional) Default polynom to parse on class creation
   */
  constructor(e) {
    return this.#t = [], e !== void 0 && this.parse(e), this;
  }
  parse = (e) => (this.#t = new Q(P.SET).parse(e).rpn, this);
  evaluate(e) {
    this.variables.forEach((i) => {
      Object.hasOwn(e, i) || (e[i] = !1);
    });
    const t = [];
    for (const i of this.#t)
      if (console.log(i), i.tokenType === "variable")
        t.push(e[i.token]);
      else if (i.tokenType === "operation")
        if (i.token === "!")
          if (t.length >= 1) {
            const s = t.pop();
            t.push(!s);
          } else
            return !1;
        else {
          const s = t.pop(), r = t.pop();
          if (s !== void 0 && r !== void 0)
            switch (i.token) {
              case "&":
                t.push(s && r);
                break;
              case "|":
                t.push(s || r);
                break;
              case "-":
                return !1;
            }
          else
            return !1;
        }
    return t.length === 1 && t[0];
  }
  get rpn() {
    return this.#t;
  }
  get tex() {
    const e = [];
    for (const t of this.#t)
      if (t.tokenType === "variable")
        e.push(t);
      else
        switch (t.token) {
          case "&":
            if (e.length >= 2) {
              const i = e.pop(), s = e.pop();
              i && s && (s.tokenType === "mix" && (s.token = `( ${s.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${s.token} \\cap ${i.token}`, tokenType: "mix" }));
            }
            break;
          case "|":
            if (e.length >= 2) {
              const i = e.pop(), s = e.pop();
              i && s && (s.tokenType === "mix" && (s.token = `( ${s.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${s.token} \\cup ${i.token}`, tokenType: "mix" }));
            }
            break;
          case "-":
            if (e.length >= 2) {
              const i = e.pop(), s = e.pop();
              i && s && (s.tokenType === "mix" && (s.token = `( ${s.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${s.token} \\setminus ${i.token}`, tokenType: "mix" }));
            }
            break;
          case "!":
            if (e.length >= 1) {
              const i = e.pop();
              i && e.push({ token: `\\overline{ ${i.token} }`, tokenType: "variable" });
            }
            break;
        }
    return e[0].token;
  }
  get variables() {
    return this.#t.filter((e) => e.tokenType === "variable").map((e) => e.token);
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
  #e(e, t) {
    const i = [];
    let s;
    if (t === void 0) {
      s = /* @__PURE__ */ new Set();
      for (const r in e)
        s = /* @__PURE__ */ new Set([
          ...s,
          ...e[r] ?? []
        ]);
    } else
      s = new Set(t);
    for (const r of this.#t)
      if (r.tokenType === "variable")
        e[r.token] === void 0 ? i.push(/* @__PURE__ */ new Set()) : i.push(new Set(e[r.token]));
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
class T {
  #t = U.POWER;
  #e = [];
  constructor(...e) {
    return this.parse(...e), this;
  }
  parse(...e) {
    return this.#e = [], e.length === 0 ? this : (e.forEach((t) => {
      t instanceof T ? this.#e.push(...t.factors.map((i) => i.clone())) : this.#e.push(new E(t));
    }), this);
  }
  clone() {
    return new T(...this.#e.map((e) => e.clone()));
  }
  get tex() {
    const { num: e, den: t } = this.#r();
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.tex : e.map((r) => r.tex).join("");
    const i = e.length === 1 ? e[0].asSingle.tex : e.map((r) => r.tex).join(""), s = t.length === 1 ? t[0].asSingle.tex : t.map((r) => r.tex).join("");
    return `\\frac{ ${i} }{ ${s} }`;
  }
  get display() {
    const { num: e, den: t } = this.#r();
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.display : e.map(
        (r, o) => o === 0 && r.polynom.monoms.length === 1 ? r.asSingle.display : r.display
      ).join("");
    const i = e.length === 1 ? e[0].asSingle.display : e.map((r) => r.display).join(""), s = t.length === 1 ? t[0].asSingle.display : t.map((r) => r.display).join("");
    return `(${i})/(${s})`;
  }
  static #i(e, t) {
    const i = V(e), s = V(t), o = Object.keys(i).filter((h) => Object.hasOwn(s, h)).map((h) => {
      const c = i[h].reduce((l, p) => l.add(p.power), new a("0")), u = s[h].reduce((l, p) => l.add(p.power), new a("0"));
      return new E(h, a.min(c, u));
    });
    return new T(...o);
  }
  static #s(e, t) {
    const i = V(e), s = V(t), o = [.../* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(s)])].map((h) => {
      const c = Object.hasOwn(i, h) ? i[h].reduce((l, p) => l.add(p.power), new a("0")) : new a(0), u = Object.hasOwn(s, h) ? s[h].reduce((l, p) => l.add(p.power), new a("0")) : new a(0);
      return new E(h, a.max(c, u));
    });
    return new T(...o);
  }
  static gcd(...e) {
    if (e.length === 0)
      return new T().one();
    if (e.length === 1)
      return e[0];
    if (e.length === 2)
      return T.#i(e[0], e[1]);
    let t = e[0];
    return e.shift(), e.forEach((i) => t = T.#i(t, i)), t;
  }
  static lcm(...e) {
    if (e.length === 0)
      return new T().one();
    if (e.length === 1)
      return e[0];
    let t = e[0];
    return e.shift(), e.forEach((i) => t = T.#s(t, i)), t;
  }
  add(...e) {
    const t = [this.numerator, ...e.map((h) => h.numerator)], i = [this.denominator, ...e.map((h) => h.denominator)];
    let s;
    if (i.some((h) => h.factors.length > 0)) {
      const h = T.lcm(...i);
      t.forEach((c, u) => {
        c.multiply(h.clone().divide(i[u]));
      }), s = h;
    }
    const r = T.gcd(...t), o = new f(0).add(
      ...t.map((h) => h.divide(r).reduce().develop().factors[0].polynom)
    ).reduce();
    return this.#e = [
      ...r.factors,
      new E(o)
    ], s && this.divide(s), this.#e = this.#e.filter((h) => !h.power.isZero()), this;
  }
  get asPower() {
    return this.#t = U.POWER, this;
  }
  get asRoot() {
    return this.#t = U.ROOT, this;
  }
  degree(e) {
    return this.#e.reduce((t, i) => t.add(i.degree(e)), new a("0"));
  }
  get denominator() {
    return new T(
      ...this.#e.filter((e) => e.power.isNegative()).map((e) => e.clone().inverse())
    );
  }
  derivative() {
    const e = [], t = this.#e.length;
    for (let s = 0; s < t; s++) {
      const r = this.#e.slice(), o = r.splice(s, 1)[0].derivative();
      e.push(
        new T(...r, ...o)
      );
    }
    e.forEach((s) => s.reduce());
    const i = e.shift();
    return i !== void 0 && (this.#e = i.factors), this.add(...e);
  }
  develop() {
    const e = new f("1"), t = new f("1");
    return this.numerator.factors.forEach((i) => {
      e.multiply(i.develop());
    }), this.denominator.factors.forEach((i) => {
      t.multiply(i.develop());
    }), new T().fromPolynom(e, t);
  }
  divide(e) {
    return this.#e = this.#e.concat(e.clone().factors.map((t) => t.inverse())), this;
  }
  evaluate(e, t) {
    return t ? this.#e.reduce((i, s) => i * s.evaluate(e, t), 1) : this.#e.reduce((i, s) => i.multiply(s.evaluate(e)), new a("1"));
  }
  factorize(e) {
    const t = [];
    this.#e.forEach((o) => {
      const h = o.polynom.factorize(e);
      if (h.length > 1) {
        const c = o.power.clone();
        t.push(...h.map((u) => new E(u, c)));
      } else
        t.push(o.clone());
    });
    const i = new T(...t), s = i.numerator.reduce(), r = i.denominator.reduce();
    return s.divide(r);
  }
  get factors() {
    return this.#e;
  }
  set factors(e) {
    this.#e = e;
  }
  fromPolynom(e, t) {
    if (this.#e = [new E(new f(e))], t) {
      const i = new f(t);
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
    const e = [].concat(...this.#e.map((t) => t.polynom.getZeroes()));
    return e.sort((t, i) => t.value - i.value), e.filter(
      (t, i, s) => i === s.findIndex(
        (r) => r.value === t.value
      )
    );
  }
  hasVariable(e) {
    return this.#e.some((t) => t.hasVariable(e));
  }
  inverse() {
    return this.#e = this.#e.map((e) => e.inverse()), this;
  }
  isEqual(e) {
    const t = T.gcd(this, e), i = this.clone().divide(t).reduce(), s = e.clone().divide(t).reduce();
    return i.isOne() && s.isOne();
  }
  isOne() {
    return this.#e.every((e) => e.isOne());
  }
  isZero() {
    return this.#e.every((e) => e.isZero());
  }
  multiply(...e) {
    return e.forEach((t) => {
      this.#e = this.#e.concat(t.clone().factors);
    }), this;
  }
  get numerator() {
    return new T(...this.#e.filter((e) => e.power.isPositive()));
  }
  one() {
    return this.#e = [new E("1", "1")], this;
  }
  opposite() {
    const e = this.#e.findIndex((t) => t.display === "(-1)");
    return e >= 0 ? this.#e.splice(e, 1) : this.#e.push(new E("-1", "1")), this;
  }
  pow(e) {
    return this.#e = this.#e.map((t) => t.pow(e)), this;
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    const e = V(this);
    return this.#e = Object.values(e).map((t) => {
      const i = t[0].polynom, s = t.reduce((r, o) => r.add(o.power), new a("0"));
      return new E(i, s.reduce());
    }).filter((t) => !t.power.isZero()), this;
  }
  root(e) {
    return this.#e = this.#e.map((t) => t.root(e)), this;
  }
  /**
   * Reoarder the factors using :
   * 1. number of monoms
   * 2. degree of polynom
   * 3. power of polyfactor
   */
  sort(e) {
    return this.#e.sort((t, i) => {
      const s = t.power.value, r = i.power.value;
      if (s * r < 0)
        return -s;
      const o = t.polynom.monoms.length, h = i.polynom.monoms.length;
      if (o !== h)
        return o - h;
      const c = t.polynom.degree(e).value, u = i.polynom.degree(e).value;
      return c !== u ? c - u : s !== r ? s - r : t.degree().isLeq(i.degree()) ? -1 : 1;
    }), this;
  }
  sqrt() {
    return this.#e = this.#e.map((e) => e.sqrt()), this;
  }
  subtract(...e) {
    return this.add(...e.map((t) => t.opposite()));
  }
  tableOfSigns() {
    const e = this.getZeroes(), t = e.map((r) => r.value), i = this.factorize().factors.map((r) => ({ factor: new E(r), ...r.tableOfSigns() }));
    return i.forEach((r) => {
      const o = new Array(2 * e.length + 1).fill("");
      let h = r.signs.shift(), c = r.roots.shift();
      const u = o.map((l, p) => {
        if (p % 2 === 0)
          return h;
        if (c === void 0 || c.value !== t[(p - 1) / 2])
          return "t";
        const y = r.signs.shift();
        return h = r.signs.shift(), c = r.roots.shift(), y;
      });
      r.roots = e, r.signs = u;
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
    }), r), []), roots: e, factors: i };
  }
  get variables() {
    return this.#e.reduce((e, t) => e.concat(t.variables), []);
  }
  zero() {
    return this.#e = [new E("0", "1")], this;
  }
  #r() {
    let e, t = [];
    return this.#t === U.ROOT ? (e = this.numerator.factors, t = this.denominator.factors) : e = this.#e, e.length === 0 && (e = [new E("1")]), { num: e, den: t };
  }
}
function V(n) {
  const e = new a().one(), t = new a().one(), i = n.factors.reduce((o, h) => {
    if (h.polynom.degree().isZero())
      return h.power.isPositive() ? e.multiply(h.polynom.monoms[0].coefficient) : t.multiply(h.polynom.monoms[0].coefficient), o;
    const c = h.polynom.display;
    return Object.hasOwn(o, c) ? o[c].push(h) : o[c] = [h], o;
  }, {}), { numerator: s, denominator: r } = e.divide(t).reduce();
  return s !== 1 && (i[s.toString()] = [new E(s, 1)]), r !== 1 && (i[r.toString()] = [new E(r, -1)]), i;
}
class R {
  #t = null;
  #e = !0;
  #i = [];
  constructor(e, t) {
    return e && (t = t ?? e, this.fromDimensions(e, t)), this;
  }
  parse(e) {
    return this.fromValues(e);
  }
  clone() {
    const e = [];
    return this.#i.forEach((t) => {
      const i = [];
      t.forEach((s) => {
        i.push(s.clone());
      }), e.push(i);
    }), new R().fromValues(e);
  }
  get tex() {
    if (this.#i.length === 0)
      return "";
    const e = this.#e ? "pmatrix" : "bmatrix", t = [
      `\\begin{${e}}`,
      ...this.rows.map(
        (i) => "	" + i.map((s) => this.#t !== null && s.value ? +s.value.toFixed(this.#t) : s.tex).join(" & ") + "\\\\"
      ),
      `\\end{${e}}`
    ].join(`
`);
    return this.#t = null, t;
  }
  get display() {
    if (this.#i.length === 0)
      return "";
    const e = this.#e ? ["(", ")"] : ["[", "]"], t = e[0] + this.map((i) => this.#t !== null && i.value ? +i.value.toFixed(this.#t) : i.display).map((i) => `(${i.join(",")})`).join(",") + e[1];
    return this.#t = null, t;
  }
  add(e) {
    if (!this.canBeAdded(e))
      throw new Error("Cannot add a matrix with different dimensions.");
    return this.forEach((t, i, s) => {
      t.add(e.values[i][s]);
    }), this;
  }
  aij(e, t) {
    return e < 0 || e > this.dimension.rows || t < 0 || t > this.dimension.cols ? null : this.#i[e][t];
  }
  get bmatrix() {
    return this.#e = !1, this;
  }
  canBeAdded(e) {
    const { rows: t, cols: i } = this.dimension, { rows: s, cols: r } = e.dimension;
    return t === s && i === r;
  }
  canBeInverted() {
    return !(!this.isSquare() || this.determinant().isZero());
  }
  canBeMultiplied(e) {
    return this.dimension.cols === e.dimension.rows;
  }
  characteristic_polynom(e) {
    return e ??= "k", this.clone().subtract(
      new R(this.dimension.rows).one().multiply(new f(e))
    ).determinant();
  }
  cofactor(e, t) {
    const i = this.clone();
    return i.values.splice(e, 1), i.values.forEach((s) => {
      s.splice(t, 1);
    }), i.determinant().multiply((-1) ** (e + t));
  }
  get cols() {
    const e = Array.from({ length: this.dimension.cols }, () => Array.from({ length: this.dimension.rows }, () => new f()));
    return this.forEach((t, i, s) => {
      e[s][i] = t;
    }), e;
  }
  determinant() {
    if (!this.isSquare())
      throw new Error("Matrix is not square");
    const e = new f();
    return this.#i.length === 1 ? this.#i[0][0].clone() : (this.values[0].forEach((t, i) => {
      const s = this.cofactor(0, i);
      e.add(t.clone().multiply(s));
    }), e);
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
  forEach(e) {
    this.#i.forEach((t, i) => {
      t.forEach((s, r) => {
        e(s, i, r);
      });
    });
  }
  fromDimensions(e, t) {
    return this.#i = Array.from({ length: e }, () => Array.from({ length: t }, () => new f())), this;
  }
  fromString(e) {
    if (e.startsWith("((") && e.endsWith("))"))
      return this.fromString(e.substring(1, e.length - 1));
    const t = e.split("),(");
    return this.#i = t.map((i, s) => s === 0 ? i.substring(1).split(",") : s === t.length - 1 ? i.substring(0, i.length - 1).split(",") : i.split(",")).map(
      (i) => i.map((s) => new f(s))
    ), this;
  }
  fromValues(e) {
    this.#i = [];
    const t = e[0].length;
    if (e.some((i) => i.length !== t))
      throw new Error("Each line must be the same length");
    return e.forEach((i) => {
      const s = [];
      i.forEach((r) => {
        s.push(new f(r));
      }), this.#i.push(s);
    }), this;
  }
  fromVectors(...e) {
    this.#i = [];
    const t = e[0].dimension;
    if (e.some((i) => i.dimension !== t))
      throw new Error("Each vectors must be the same dimension");
    return this.fromDimensions(e[0].dimension, e.length), e.forEach((i, s) => {
      i.array.forEach((r, o) => {
        this.#i[o][s] = new f(r);
      });
    }), this;
  }
  inverse() {
    if (!this.canBeInverted())
      throw new Error("The matrix cannot be inverted.");
    const e = new R().fromDimensions(this.dimension.rows, this.dimension.cols);
    e.forEach((i, s, r) => {
      e.setValue(s, r, this.cofactor(s, r));
    }), e.transpose();
    const t = this.determinant();
    return e.forEach((i, s, r) => this.setValue(s, r, i.divide(t).reduce())), this;
  }
  isEqual(e) {
    if (!this.canBeAdded(e))
      return !1;
    let t = !0;
    return this.forEach((i, s, r) => {
      t &&= i.isEqual(e.values[s][r]);
    }), t;
  }
  isOne() {
    for (let e = 0; e < this.#i.length; e++)
      for (let t = 0; t < this.#i[e].length; t++)
        if (t === e && !this.#i[e][t].isOne() || t !== e && !this.#i[e][t].isZero())
          return !1;
    return !0;
  }
  isSquare() {
    return this.dimension.cols === this.dimension.rows;
  }
  isZero() {
    return this.flat().every((e) => e.isZero());
  }
  map(e) {
    const { rows: t, cols: i } = this.dimension, s = Array.from({ length: t }, () => Array.from({ length: i }, () => {
    }));
    return this.#i.forEach((r, o) => {
      r.forEach((h, c) => {
        s[o][c] = e(h, o, c);
      });
    }), s;
  }
  multiply(e) {
    if (e instanceof R) {
      if (!this.canBeMultiplied(e))
        throw new Error("Cannot multiply a matrix with incompatibles dimensions");
      const t = new R(this.dimension.rows, e.dimension.cols);
      return t.forEach((i, s, r) => {
        const o = this.rows[s], h = e.cols[r], c = new f();
        o.forEach((u, l) => {
          c.add(u.clone().multiply(h[l]));
        }), t.setValue(s, r, c);
      }), this.#i = t.values, this;
    }
    return this.forEach((t, i, s) => {
      this.setValue(i, s, t.multiply(e));
    }), this;
  }
  one() {
    return this.forEach((e, t, i) => {
      t === i ? e.one() : e.zero();
    }), this;
  }
  opposite() {
    return this.forEach((e) => {
      e.opposite();
    }), this;
  }
  get pmatrix() {
    return this.#e = !0, this;
  }
  pow(e) {
    return oe(this, e);
  }
  reduce() {
    throw new Error("Not yet implemented");
  }
  get rows() {
    return this.#i;
  }
  setValue(e, t, i) {
    const { rows: s, cols: r } = this.dimension;
    if (e < 0 || e >= s || t < 0 || t >= r)
      throw new Error(`${e}x${t} is out of range (${s}x${r})`);
    return this.#i[e][t] = new f(i), this;
  }
  subtract(e) {
    if (!this.canBeAdded(e))
      throw new Error("Cannot subtract a matrix with different dimensions.");
    return this.forEach((t, i, s) => {
      t.subtract(e.values[i][s]);
    }), this;
  }
  toFixed(e) {
    return this.#t = e, this;
  }
  transpose() {
    return this.clone().forEach((t, i, s) => {
      this.setValue(s, i, t.clone());
    }), this;
  }
  get values() {
    return this.#i;
  }
  zero() {
    return this.forEach((e) => e.zero()), this;
  }
}
function Be(n, e) {
  return n.dimension === e.dimension && n.array.every(
    (t, i) => e.array[i].isEqual(t)
  );
}
function Me(n, e) {
  if (n.dimension !== e.dimension)
    return !1;
  const t = e.array[0].value / n.array[0].value;
  return n.array.every(
    (i, s) => e.array[s].value === i.value * t
  );
}
function Se(n, e) {
  return n.dimension !== e.dimension ? new a().invalid() : n.array.reduce(
    (t, i, s) => t.add(i.clone().multiply(e.array[s])),
    new a(0)
  );
}
function je(...n) {
  if (n.some((e) => e.dimension !== n[0].dimension))
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
class L {
  #t = [];
  constructor(...e) {
    this.#t = e.map((t) => new a(t));
  }
  copy() {
    return this.#t.map((e) => e.clone());
  }
  get array() {
    return this.#t;
  }
  set array(e) {
    this.#t = e;
  }
  get dimension() {
    return this.array.length;
  }
  fromString(e) {
    e.startsWith("(") && (e = e.substring(1)), e.endsWith(")") && (e = e.substring(0, e.length - 1));
    const t = e.split(/[,;\s]/g).filter((i) => i.trim() !== "");
    return t.length < 2 ? this : (this.#t = t.map((i) => new a(i)), this);
  }
  setDimension(e = 2) {
    if (e < 2)
      throw new Error("Dimension must be at least 2");
    if (e < this.dimension)
      this.#t = this.#t.slice(0, e);
    else if (e > this.dimension)
      for (let t = this.dimension; t < e; t++)
        this.#t.push(new a(0));
    return this;
  }
  get x() {
    return this.#t[0];
  }
  set x(e) {
    this.#t[0] = new a(e);
  }
  get y() {
    return this.#t[1];
  }
  set y(e) {
    this.#t[1] = new a(e);
  }
  get z() {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    return this.#t[2];
  }
  set z(e) {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    this.#t[2] = new a(e);
  }
  zero = () => (this.#t.forEach((e) => e.zero()), this);
}
class k {
  #t;
  #e;
  #i;
  #s = !1;
  constructor(e) {
    return this.#e = 2, this.#t = new a().zero(), this.#i = new a().zero(), e && this.parse(e), this;
  }
  parse(e) {
    if (e instanceof k)
      return this.index = e.index, this.radical = e.radical.clone(), this.factor = e.factor.clone(), this;
    if (e instanceof a)
      return this.index = 2, this.factor = e.clone(), this.radical.one(), this;
    if (typeof e == "string") {
      if (e.includes("sqrt"))
        return this.#n(e);
      if (e.includes("root"))
        return this.#r(e);
    }
    return this.index = 2, this.factor = new a(e), this.radical.one(), this;
  }
  clone() {
    return new k().from(this.index, this.radical, this.factor);
  }
  get tex() {
    const e = this.#s && this.factor.isPositive() ? "+" : "";
    if (this.#i.isZero()) return `${e}${this.#t.tex}`;
    if (this.index === 1) return `${e}${this.factor.clone().multiply(this.radical).tex}`;
    const t = this.index === 2 ? `\\sqrt{ ${this.#i.tex} }` : `\\sqrt[ ${this.index} ]{ ${this.#i.tex} }`;
    return this.#t.isUnit() ? this.#s ? `${this.#t.isOne() ? e : "-"} ${t}` : `${this.#t.isOne() ? "" : "-"}${t}` : `${e}${this.#t.tex} ${t}`;
  }
  get display() {
    const e = this.#s && this.factor.isPositive() ? "+" : "";
    if (this.#i.isZero()) return `${e}${this.#t.display}`;
    if (this.index === 1) return `${e}${this.factor.clone().multiply(this.radical).display}`;
    const t = this.index === 2 ? `sqrt(${this.#i.tex})` : `root(${this.index})(${this.#i.display})`;
    return this.#t.isUnit() ? `${this.#t.isOne() ? e : "-"}${t}` : `${e}${this.#t.display}${t}`;
  }
  add(e) {
    const t = new k(e);
    if (this.index !== t.index && !this.radical.isEqual(t.radical))
      throw new Error("Add can only be done with two same index and radical");
    return this.factor.add(t.factor), this;
  }
  divide(e) {
    return this.multiply(new k(e).inverse());
  }
  get factor() {
    return this.#t;
  }
  set factor(e) {
    this.#t = e;
  }
  from(e, t, i) {
    return this.index = e, this.radical = new a(t), this.factor = i ? new a(i) : new a().one(), this;
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
  set index(e) {
    if (!Number.isSafeInteger(e) || e <= 0)
      throw new Error("Index must be a strictly positive integer.");
    this.#e = e;
  }
  get indexAsPow() {
    return new a(this.index).inverse();
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
  isZero() {
    return this.factor.isZero() || this.radical.isZero();
  }
  multiply(e) {
    const t = new k(e);
    if (this.factor.multiply(t.factor), this.index === t.index)
      return this.radical.multiply(t.radical), this;
    if (this.radical.isEqual(t.radical)) {
      const i = this.indexAsPow.add(t.indexAsPow).reduce();
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
  pow(e) {
    this.factor.pow(e);
    const t = b.gcd(this.index, e);
    return this.index = this.index / t, this.radical.pow(e / t), this;
  }
  get radical() {
    return this.#i;
  }
  set radical(e) {
    this.#i = e;
  }
  reduce() {
    if (this.radical.isRational()) {
      const t = this.radical.denominator;
      this.radical.denominator = 1, this.radical.numerator *= t, this.factor.divide(t);
    }
    const e = b.greatestPower(this.radical.value, this.index);
    return this.factor.multiply(Math.pow(e, 1 / this.index)), this.radical.divide(e), this;
  }
  root(e) {
    return this.group(), this.index = this.index * e, this;
  }
  sqrt() {
    return this.root(2);
  }
  subtract(e) {
    const t = new k(e);
    return this.add(t.opposite());
  }
  get value() {
    return b.numberCorrection(this.factor.value * Math.pow(this.radical.value, 1 / this.index));
  }
  withSign(e = !0) {
    return this.#s = e, this;
  }
  zero() {
    return this.radical.zero(), this.factor.zero(), this;
  }
  #r(e) {
    const [t, i] = e.split("root"), [s, r] = i.split(")");
    return this.index = +K(s), this.radical = new a(K(r)), this.factor = t === "" ? new a().one() : new a(t), this;
  }
  #n(e) {
    const [t, i] = e.split("sqrt");
    return this.index = 2, this.radical = new a(K(i)), this.factor = t === "" ? new a().one() : new a(t), this;
  }
}
class w extends L {
  constructor(...e) {
    super(), e.length > 0 && this.parse(...e);
  }
  parse(...e) {
    if (e.length === 1) {
      if (e[0] instanceof L)
        return this.array = e[0].copy(), this;
      if (typeof e[0] == "string")
        return this.fromString(e[0]), this;
    }
    if (e.length > 1) {
      if (e.some((i) => i instanceof w))
        throw new Error("Creating a point with  multiple argument requires an input fraction");
      const t = e.map((i) => new a(i));
      if (t.some((i) => i.isNaN()))
        throw new Error("The given values are not a valid point string (a,b): ");
      this.array = t;
    }
    return this;
  }
  clone() {
    return new w(...this.copy());
  }
  get tex() {
    return `\\left(${this.array.map((e) => e.tex).join(";")}\\right)`;
  }
  get display() {
    return `(${this.array.map((e) => e.display).join(";")})`;
  }
  distanceTo(e) {
    if (this.dimension !== e.dimension)
      throw new Error("The two points must have the same dimensions.");
    const i = this.array.map((s, r) => e.array[r].clone().subtract(s)).reduce(
      (s, r) => s.add(r.clone().pow(2)),
      new a(0)
    );
    return new k().from(2, i).reduce();
  }
  middleOf(e, t) {
    if (e.dimension !== t.dimension)
      throw new Error("Vectors must be the same dimension");
    return this.array = [], e.array.forEach((i, s) => {
      this.array.push(i.clone().add(t.array[s]).divide(2));
    }), this;
  }
}
class g extends L {
  constructor(...e) {
    return super(), e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setter
  parse(...e) {
    if (e.length === 0)
      throw new Error("Invalid value");
    if (e.length === 1) {
      if (e[0] instanceof L)
        return this.array = e[0].copy(), this;
      if (typeof e[0] == "string")
        return this.fromString(e[0]);
      throw new Error("Invalid value");
    }
    if (e.length === 2) {
      const [t, i] = e;
      if (t instanceof L && i instanceof L) {
        if (t.dimension !== i.dimension)
          throw new Error("Vectors must have the same dimension");
        return this.array = i.array.map((s, r) => s.clone().subtract(t.array[r])), this;
      }
    }
    return this.array = e.map((t) => new a(t)), this;
  }
  clone() {
    return new g(...this.copy());
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
  add = (e) => (this.array.forEach((t, i) => t.add(e.array[i])), this);
  angle = (e, t, i) => {
    let s = this.dot(e).value;
    return t && (s = Math.abs(s)), (i ? 1 : 180 / Math.PI) * Math.acos(s / (this.norm * e.norm));
  };
  cross(e) {
    if (this.dimension !== 3 || e.dimension !== 3)
      throw new Error("Cross product can only be determined in 3D");
    return new g(
      this.y.clone().multiply(e.z).subtract(this.z.clone().multiply(e.y)),
      this.z.clone().multiply(e.x).subtract(this.x.clone().multiply(e.z)),
      this.x.clone().multiply(e.y).subtract(this.y.clone().multiply(e.x))
    );
  }
  // ------------------------------------------
  // Creation / parsing functions
  divideByScalar = (e) => this.multiplyByScalar(new a(e).inverse());
  dot = (e) => Se(this, e);
  fromString(e) {
    return e.startsWith("((") && e.endsWith("))") ? super.fromString(e.slice(1, -1)) : super.fromString(e);
  }
  isColinearTo = (e) => Me(this, e);
  isEqual = (e) => Be(this, e);
  isNormalTo = (e) => this.dot(e).isZero();
  // ------------------------------------------
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
    const t = new a(e);
    return this.array.forEach((i) => i.multiply(t)), this;
  };
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get normSquare() {
    return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new a(0));
  }
  normal = () => {
    if (this.dimension >= 3)
      throw new Error("Normal vector can only be determined in 2D");
    const e = this.x.clone().opposite(), t = this.y.clone();
    return this.array[0] = t, this.array[1] = e, this;
  };
  one = () => (this.zero(), this.x.one(), this);
  opposite = () => (this.array.forEach((e) => e.opposite()), this);
  simplify = () => this.multiplyByScalar(
    b.lcm(...this.array.map((e) => e.denominator))
  ).divideByScalar(
    b.gcd(...this.array.map((e) => e.numerator))
  ).multiplyByScalar(
    this.x.isNegative() ? -1 : 1
  );
  subtract = (e) => this.add(e.clone().opposite());
  translate(...e) {
    return this.array.forEach((t, i) => t.add(e[i])), this;
  }
  unit = () => {
    const e = this.norm;
    return e === 0 ? this : this.divideByScalar(e);
  };
}
var j = /* @__PURE__ */ ((n) => (n.None = "none", n.Parallel = "parallel", n.Perpendicular = "perpendicular", n.Tangent = "tangent", n))(j || {}), J = /* @__PURE__ */ ((n) => (n.None = "none", n.Parallel = "parallel", n.Perpendicular = "perpendicular", n.Tangent = "tangent", n))(J || {});
function he(n = 0.5) {
  return Math.random() < n;
}
function B(n, e, t) {
  if (e === void 0)
    return n >= 0 ? B(0, n) : B(n, 0);
  if (n === e)
    return n;
  if (t === void 0)
    return Math.floor(Math.random() * (e - n + 1) + n);
  if (Math.abs(e - n) <= t.length)
    throw new Error("The number of excluded values is too high.");
  let i = B(n, e);
  for (; t.includes(i); )
    i = B(n, e);
  return i;
}
function O(n, e) {
  return e === !1 ? he() ? B(1, n) : -B(1, n) : B(-n, n);
}
function Ie(n) {
  let e = b.primes();
  return n !== void 0 && (e = e.filter((t) => t < n)), ie(e);
}
function ze(n, e) {
  return e === void 0 && (e = 1), n.length <= 0 ? Object.values(n) : ae(n).slice(0, e);
}
function ie(n) {
  return n.length === 0 ? null : n[B(0, n.length - 1)];
}
function ae(n) {
  const e = Object.values(n);
  for (let t = e.length - 1; t > 0; t--) {
    const i = Math.floor(Math.random() * (t + 1)), s = e[t];
    e[t] = e[i], e[i] = s;
  }
  return e;
}
class v {
  static PARALLEL = j.Parallel;
  static PERPENDICULAR = j.Perpendicular;
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
  constructor(...e) {
    return this.#e = new a().zero(), this.#i = new a().zero(), this.#s = new a().zero(), this.#t = new g(), e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  /**
   * Parse data to a line
   * @param {any} values
   * @returns {Line}
   */
  parse = (...e) => {
    if (e.length === 0)
      return this;
    if (e.length === 1) {
      if (e[0] instanceof v)
        return this.fromCoefficient(e[0].a, e[0].b, e[0].c);
      if (e[0] instanceof x)
        return this.fromEquation(e[0]);
      if (typeof e[0] == "string")
        try {
          const t = new x(e[0]);
          return this.parse(t);
        } catch (t) {
          return console.warn(t), this;
        }
    }
    if (e.length === 2) {
      if (e[0] instanceof w && e[1] instanceof w)
        return this.fromPoints(e[0], e[1]);
      if (e[0] instanceof w && e[1] instanceof g)
        return this.fromPointAndDirection(e[0], e[1]);
    }
    return e.length === 3 && e.every((t) => a.isFraction(t)) ? this.fromCoefficient(
      e[0],
      e[1],
      e[2]
    ) : (console.log("Something wrong happened while creating the line"), console.log(e), this);
  };
  // ------------------------------------------
  // Getter and setter
  clone = () => (this.#e = this.#e.clone(), this.#i = this.#i.clone(), this.#s = this.#s.clone(), this.#t = this.#t.clone(), this);
  get tex() {
    const e = this.#r;
    switch (this.#r = 1, e) {
      case 0:
        return this.getEquation().reorder().tex;
      case 2:
        return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new f().parse("x", this.slope, this.height).tex;
      case 3:
      case 4: {
        const t = this.d.clone().simplify();
        return e === 3 ? `${g.asTex("x", "y")} = ${g.asTex(this.#t.x.tex, this.#t.y.tex)} + k\\cdot ${g.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}
            x &= ${new f(this.#t.x).add(new m(this.d.x).multiply(new m("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new f(this.#t.y).add(new m(this.d.y).multiply(new m("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`;
      }
      default: {
        const t = this.getEquation();
        return this.#e.isNegative() && t.multiply(-1), t.tex;
      }
    }
  }
  get display() {
    const e = this.#r;
    switch (this.#r = 1, e) {
      case 0:
        return this.getEquation().reorder().display;
      case 2:
        return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new f().parse("x", this.slope, this.height).display;
      case 3: {
        const t = this.d.clone().simplify();
        return `((x,y))=((${this.#t.x.display},${this.#t.y.display}))+k((${t.x.display},${t.y.display}))`;
      }
      case 4:
        return "";
      default: {
        const t = this.getEquation();
        return this.#e.isNegative() && t.multiply(-1), t.display;
      }
    }
  }
  get OA() {
    return this.#t;
  }
  set OA(e) {
    this.fromPointAndNormal(e, this.n);
  }
  get a() {
    return this.#e;
  }
  set a(e) {
    this.#e = e;
  }
  asCanonical() {
    return this.#r = 1, this;
  }
  asCartesian() {
    return this.#r = 0, this;
  }
  asMxh() {
    return this.#r = 2, this;
  }
  asParametric() {
    return this.#r = 3, this;
  }
  asSystem() {
    return this.#r = 4, this;
  }
  get b() {
    return this.#i;
  }
  set b(e) {
    this.#i = e;
  }
  get c() {
    return this.#s;
  }
  set c(e) {
    this.#s = e;
  }
  // ------------------------------------------
  canonicalAsFloatCoefficient(e = 2) {
    let t = "";
    return this.#e.isZero() || (this.#e.isOne() ? t = "x" : this.#e.clone().opposite().isOne() ? t = "-x" : t = this.#e.value.toFixed(e) + "x"), this.#i.isZero() || (this.#i.isPositive() && (t += "+"), t += this.#i.value.toFixed(e) + "y"), this.#s.isZero() || (this.#s.isPositive() && (t += "+"), t += this.#s.value.toFixed(e)), t + "=0";
  }
  get d() {
    return new g(this.#i.clone(), this.#e.clone().opposite());
  }
  set d(e) {
    this.fromPointAndDirection(this.OA, e);
  }
  get director() {
    return this.d;
  }
  distanceTo(e) {
    const t = e.x.clone().multiply(this.#e).add(e.y.clone().multiply(this.#i)).add(this.#s).abs(), i = this.normal.normSquare;
    return i.isZero() ? new k(0) : new k().from(2, i.inverse(), t);
  }
  fromCoefficient = (e, t, i) => {
    this.#e = new a(e), this.#i = new a(t), this.#s = new a(i);
    const s = b.lcm(this.#e.denominator, this.#i.denominator, this.#s.denominator);
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
  fromEquation = (e) => {
    e.reorder(!0);
    const t = new Set(e.letters());
    if (!(t.has("x") || t.has("y")))
      return this;
    for (const i of ["x", "y"])
      t.has(i) && t.delete(i);
    return t.size > 0 ? this : this.fromCoefficient(
      e.left.monomByLetter("x").coefficient,
      e.left.monomByLetter("y").coefficient,
      e.left.monomByDegree(0).coefficient
    );
  };
  fromPointAndDirection = (e, t) => this.fromPointAndNormal(e, t.clone().normal());
  fromPointAndLine = (e, t, i = j.Parallel) => i === j.Perpendicular ? this.fromPointAndNormal(e, t.director) : this.fromPointAndNormal(e, t.normal);
  fromPointAndNormal = (e, t) => (this.fromCoefficient(
    t.x,
    t.y,
    e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()
  ), this.#t = new g(e.clone()), this);
  // ------------------------------------------
  // Creation / parsing functions
  fromPoints(e, t) {
    return this.fromPointAndNormal(e, new g(e, t).normal());
  }
  // ------------------------------------------
  getEquation() {
    return new x(new f().parse("xy", this.#e, this.#i, this.#s), new f("0")).simplify();
  }
  getValueAtX = (e) => {
    const t = this.getEquation().isolate("y"), i = new a(e);
    return t instanceof x ? t.right.evaluate({ x: i }) : new a().invalid();
  };
  getValueAtY = (e) => {
    const t = this.getEquation().isolate("x"), i = new a(e);
    return t instanceof x ? t.right.evaluate({ y: i }) : new a().invalid();
  };
  get height() {
    return this.#s.clone().opposite().divide(this.#i);
  }
  hitSegment(e, t) {
    const i = this.intersection(
      new v().fromPoints(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) : !1;
  }
  intersection = (e) => {
    const t = new w();
    let i = !1, s = !1;
    return this.#i.isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new a().invalid(), t.y = new a().invalid(), i = !0) : this.isSameAs(e) ? (t.x = new a().invalid(), t.y = new a().invalid(), s = !0) : (t.x = this.#i.clone().multiply(e.c).subtract(this.#s.clone().multiply(e.b)).divide(this.#e.clone().multiply(e.b).subtract(this.#i.clone().multiply(e.a))), t.y = this.#e.clone().multiply(e.c).subtract(this.#s.clone().multiply(e.a)).divide(this.#i.clone().multiply(e.a).subtract(this.#e.clone().multiply(e.b)))), {
      point: t,
      hasIntersection: !(i || s),
      isParallel: i,
      isSame: s
    };
  };
  // ------------------------------------------
  isOnLine(e) {
    return this.#e.clone().multiply(e.x).add(
      this.#i.clone().multiply(e.y)
    ).add(this.#s).isZero();
  }
  isParallelTo = (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height);
  isPerpendicularTo = (e) => this.d.isNormalTo(e.d);
  isSameAs = (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height);
  isVertical = () => this.slope.isInfinity();
  get n() {
    return this.d.normal();
  }
  get normal() {
    return new g(this.#e, this.#i);
  }
  randomNearPoint = (e) => {
    const t = this.randomPoint(e);
    let i = 10;
    for (; this.isOnLine(t) && i > 0; )
      t.x.add(O(1, !1)), t.y.add(O(1, !1)), i--;
    return t;
  };
  randomPoint = (e) => {
    const t = this.d.clone().multiplyByScalar(O(e === void 0 || e <= 1 ? 3 : e, !1)).add(this.#t);
    return new w(t);
  };
  simplify = () => {
    const e = b.lcm(this.#e.denominator, this.#i.denominator, this.#s.denominator), t = b.gcd(this.#e.numerator, this.#i.numerator, this.#s.numerator);
    return this.fromCoefficient(
      this.#e.clone().multiply(e).divide(t),
      this.#i.clone().multiply(e).divide(t),
      this.#s.clone().multiply(e).divide(t)
    ), this;
  };
  get slope() {
    return this.#e.clone().opposite().divide(this.#i);
  }
}
class G {
  // This defines the triangle
  #t = new w();
  #e = new w();
  #i = new w();
  #s = !0;
  // TODO: add a check if it's a triangle or not.
  // This is calculated
  #r = {
    AB: new v(),
    AC: new v(),
    BC: new v()
  };
  #n = !0;
  #o = null;
  constructor(...e) {
    return e.length > 0 && this.parse(...e), this;
  }
  parse = (...e) => {
    if (e.length === 1 && e[0] instanceof G)
      return this.copy(e[0]);
    if (e.length === 3) {
      if (e.every((t) => typeof t == "string"))
        return this.parse(
          ...e.map((t) => new v(t))
        );
      if (e.every((t) => t instanceof v))
        return this.fromLines(e[0], e[1], e[2]);
      if (e.every((t) => t instanceof w))
        return this.fromPoints(e[0], e[1], e[2]);
    }
    if (e.length === 6) {
      const t = e.map((i) => new a(i));
      if (t.some((i) => i.isNaN()))
        throw new Error("One of the values is not a valid number");
      return this.fromCoordinates(t[0], t[1], t[2], t[3], t[4], t[5]);
    }
    return this;
  };
  /**
   * Clone the Triangle class
   */
  clone = () => new G(
    this.#t.clone(),
    this.#e.clone(),
    this.#i.clone()
  );
  /**
   * Copy the values from another triangle
   * @param value
   */
  copy(e) {
    return this.#t = e.A.clone(), this.#e = e.B.clone(), this.#i = e.C.clone(), this.#c();
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
  fromCoordinates(e, t, i, s, r, o) {
    return this.fromPoints(
      new w(e, t),
      new w(i, s),
      new w(r, o)
    );
  }
  fromLines(e, t, i) {
    const s = new v(e).clone(), r = new v(t).clone(), o = new v(i).clone();
    let h = s.intersection(r);
    if (h.hasIntersection)
      this.#e = h.point;
    else
      throw new Error("Lines do not intersect !");
    if (h = r.intersection(o), h.hasIntersection)
      this.#i = h.point;
    else
      throw new Error("Lines do not intersect !");
    if (h = o.intersection(s), h.hasIntersection)
      this.#t = h.point;
    else
      throw new Error("Lines do not intersect !");
    return this.#c(), this.#r = { AB: s, AC: o, BC: r }, this;
  }
  fromPoints(e, t, i) {
    return this.#t = e.clone(), this.#e = t.clone(), this.#i = i.clone(), this.#c(), this;
  }
  getAngle(e) {
    const t = this.BC.norm, i = this.AC.norm, s = this.AB.norm;
    return e === "CAB" ? this.#f(t, i, s) : e === "BCA" ? this.#f(s, i, t) : this.#f(i, t, s);
  }
  get isEquilateral() {
    const e = this.AB.normSquare.value, t = this.BC.normSquare.value, i = this.AC.normSquare.value;
    return e === t && e === i;
  }
  get isIsocele() {
    const e = this.AB.normSquare.value, t = this.BC.normSquare.value, i = this.AC.normSquare.value;
    return e === t || e === i || t === i;
  }
  get isRectangle() {
    return this.AB.isNormalTo(this.BC) || this.AB.isNormalTo(this.AC) || this.BC.isNormalTo(this.AC);
  }
  get isValid() {
    return this.#s;
  }
  set isValid(e) {
    this.#s = e;
  }
  get lines() {
    return this.#r;
  }
  get remarquables() {
    return this.#o;
  }
  #a = (e) => {
    const t = this.lines;
    let i, s;
    if (e === "A" ? (i = t.AB, s = t.AC) : e === "B" ? (i = t.AB, s = t.BC) : e === "C" && (i = t.BC, s = t.AC), i === void 0 || s === void 0)
      throw new Error(`The point ${e} does not exist`);
    const r = i.n.simplify().norm, o = s.n.simplify().norm, h = i.getEquation().multiply(o), c = s.getEquation().multiply(r), u = new v(h.clone().subtract(c).simplify()), l = new v(c.clone().subtract(h).simplify());
    return e === "A" ? u.hitSegment(this.B, this.C) ? { internal: u, external: l } : { internal: l, external: u } : e === "B" ? u.hitSegment(this.A, this.C) ? { internal: u, external: l } : { internal: l, external: u } : e === "C" ? u.hitSegment(this.B, this.A) ? { internal: u, external: l } : { internal: l, external: u } : { internal: u, external: l };
  };
  #u = () => {
    const e = {
      AB: new w().middleOf(this.#t, this.#e),
      AC: new w().middleOf(this.#t, this.#i),
      BC: new w().middleOf(this.#e, this.#i)
    }, t = {
      A: new v().fromPoints(this.#t, e.BC),
      B: new v().fromPoints(this.#e, e.AC),
      C: new v().fromPoints(this.#i, e.AB),
      intersection: null
    }, i = {
      AB: new v().fromPointAndNormal(e.AB, new g(this.#t, this.#e).normal()),
      AC: new v().fromPointAndNormal(e.AC, new g(this.#t, this.#i).normal()),
      BC: new v().fromPointAndNormal(e.BC, new g(this.#e, this.#i).normal()),
      intersection: null
    }, s = {
      A: new v().fromPointAndNormal(this.#t, new g(this.#e, this.#i).normal()),
      B: new v().fromPointAndNormal(this.#e, new g(this.#t, this.#i).normal()),
      C: new v().fromPointAndNormal(this.#i, new g(this.#t, this.#e).normal()),
      intersection: null
    }, r = this.#a("A"), o = this.#a("B"), h = this.#a("C"), c = {
      A: r.internal,
      B: o.internal,
      C: o.internal,
      intersection: null
    }, u = {
      A: r.external,
      B: o.external,
      C: h.external,
      intersection: null
    }, l = {
      medians: t,
      mediators: i,
      heights: s,
      bisectors: c,
      externalBisectors: u
    };
    return l.medians.intersection = l.medians.A.intersection(l.medians.B).point, l.mediators.intersection = l.mediators.AB.intersection(l.mediators.BC).point, l.heights.intersection = l.heights.A.intersection(l.heights.B).point, l.bisectors.intersection = l.bisectors.A.intersection(l.bisectors.B).point, l;
  };
  #f(e, t, i) {
    const s = (t ** 2 * i ** 2 - e ** 2) / (2 * t * i);
    return this.#n ? Math.acos(s) : Math.acos(s) * 180 / Math.PI;
  }
  /**
   * Get the Point class for the given name
   * @param ptName
   */
  #l = (e) => {
    switch (e.toUpperCase()) {
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
  #h = (e, t) => new g(
    this.#l(e),
    this.#l(t)
  );
  /**
   * Generate the Line object for the three segments of the triangle
   */
  #c() {
    return this.#r = {
      AB: new v(this.#t, this.#e),
      BC: new v(this.#e, this.#i),
      AC: new v(this.#t, this.#i)
    }, this.#o = this.#u(), this;
  }
}
class S {
  #t;
  #e;
  #i;
  #s;
  #r;
  #n;
  #o;
  constructor() {
    this.#o = "x", this.#e = !1, this.#s = !0, this.#t = "?", this.#n = "?", this.#i = new a().zero(), this.#r = new k();
  }
  get tex() {
    if (this.#r.isZero()) return this.#i.tex;
    if (this.#i.isZero()) return this.#r.tex;
    const [e] = a.toSameDenominateur(this.#i, this.#r.factor), t = this.#r.clone().multiply(e.denominator).reduce(), i = `${e.numerator} ${t.withSign().tex}`;
    return e.denominator === 1 ? i : `\\frac{ ${i} }{ ${e.denominator} }`;
  }
  set tex(e) {
    this.#n = e;
  }
  get display() {
    return this.#t;
  }
  set display(e) {
    this.#t = e;
  }
  static fromFraction(e) {
    const t = new S();
    t.setExact();
    const i = new a(e);
    return t.display = i.display, t.tex = i.tex, t.fraction = i, t.root = new k(), t;
  }
  static fromQuadratic(e, t, i) {
    const [s, r, o] = [e, t, i].map((l) => new a(l)), h = r.clone().pow(2).subtract(s.clone().multiply(o).multiply(4));
    if (h.isNegative())
      return [];
    if (h.isSquare()) {
      const l = h.sqrt(), p = r.clone().opposite().subtract(l).divide(s.clone().multiply(2)), y = r.clone().opposite().add(l).divide(s.clone().multiply(2));
      return l.isZero() ? [S.fromFraction(p)] : [S.fromFraction(p), S.fromFraction(y)];
    }
    const c = new S();
    c.fraction = r.clone().opposite().divide(s).divide(2), c.root = new k().from(2, h, s.clone().multiply(2).inverse().opposite()), c.setExact(!1);
    const u = new S();
    return u.fraction = r.clone().opposite().divide(s).divide(2), u.root = new k().from(2, h, s.clone().multiply(2).inverse()), u.setExact(!1), [c, u];
  }
  get exact() {
    return this.#e;
  }
  set exact(e) {
    this.#e = e;
  }
  get fraction() {
    return this.#i;
  }
  set fraction(e) {
    this.#i = e;
  }
  isAZero(e = !0) {
    return this.#s = e, this;
  }
  get isZero() {
    return this.#s;
  }
  set isZero(e) {
    this.#s = e;
  }
  reduce() {
    return this.#r.reduce(), this.#i.reduce(), this;
  }
  get root() {
    return this.#r;
  }
  set root(e) {
    this.#r = e;
  }
  setExact(e = !0) {
    return this.#e = e, this;
  }
  get value() {
    throw new Error("To be implemented");
  }
  get variable() {
    return this.#o;
  }
  set variable(e) {
    e !== void 0 && (this.#o = e);
  }
}
class X {
  #t = null;
  #e = null;
  #i = 1;
  #s = null;
  constructor(...e) {
    e.length > 0 && this.parse(...e);
  }
  parse(...e) {
    return typeof e[0] == "string" ? this.fromString(e[0]) : e[0] instanceof x ? this.fromEquation(e[0]) : e[0] instanceof X ? this.copy(e[0]) : e.length === 2 && e[0] instanceof w && e[1] instanceof w ? this.fromCenterPoint(e[0], e[1]) : e.length >= 2 && e[0] instanceof w && (e[1] instanceof a || typeof e[1] == "number") ? this.fromCenterRadius(
      e[0],
      e[1],
      typeof e[2] == "boolean" ? e[2] : !1
    ) : this;
  }
  clone() {
    return new X().fromCenterRadius(
      this.center.clone(),
      this.squareRadius.clone(),
      !0
    );
  }
  copy(e) {
    return this.#t = e.center.clone(), this.#s = e.squareRadius.clone(), this.#r(), this;
  }
  get tex() {
    if (this.#i === 0)
      return this.equation.moveLeft().reduce().tex;
    let e, t;
    return this.center.x.isZero() ? e = "x^2" : e = `\\left(x${this.center.x.isNegative() ? "+" : "-"}${this.center.x.clone().abs().tex}\\right)^2`, this.center.y.isZero() ? t = "y^2" : t = `\\left(y${this.center.y.isNegative() ? "+" : "-"}${this.center.y.clone().abs().tex}\\right)^2`, `${e}+${t}=${this.squareRadius.tex}`;
  }
  get display() {
    if (this.#i === 0)
      return this.equation.moveLeft().reduce().display;
    let e, t;
    return this.center.x.isZero() ? e = "x^2" : e = `(x${this.center.x.isNegative() ? "+" : "-"}${this.center.x.clone().abs().tex})^2`, this.center.y.isZero() ? t = "y^2" : t = `(y${this.center.y.isNegative() ? "+" : "-"}${this.center.y.clone().abs().tex})^2`, `${e}+${t}=${this.squareRadius.display}`;
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
    return this.#e?.clone() ?? new x("0=0");
  }
  fromCenterPoint(e, t) {
    return this.#t = e.clone(), this.#s = new g(this.#t, t).normSquare, this.#r(), this;
  }
  fromCenterRadius(e, t, i) {
    return this.#t = e.clone(), i ? this.#s = new a(t) : this.#s = new a(t).pow(2), this.#r(), this;
  }
  fromEquation(e) {
    if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
      const t = e.left.monomByDegree(2, "x"), i = e.left.monomByDegree(2, "y");
      let s, r, o;
      if (t.coefficient.isEqual(i.coefficient))
        return e.divide(t.coefficient), s = e.left.monomByDegree(1, "x"), r = e.left.monomByDegree(1, "y"), o = e.left.monomByDegree(0), this.#t = new w(s.coefficient.clone().divide(2).opposite(), r.coefficient.clone().divide(2).opposite()), this.#s = o.coefficient.clone().opposite().add(this.#t.x.clone().pow(2)).add(this.#t.y.clone().pow(2)), this.#r(), this;
      this.#n();
    }
    return this;
  }
  fromPoints(e, t, i) {
    const s = new G(e, t, i);
    if (!s.isValid || !s.remarquables)
      return this.#n(), this;
    const r = s.remarquables.mediators.AB.clone(), o = s.remarquables.mediators.AC.clone();
    return this.parse(r.intersection(o).point, e), this;
  }
  fromString(e) {
    return this.fromEquation(new x(e));
  }
  getPointsOnCircle() {
    const e = b.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), t = [];
    return e.forEach((i) => {
      for (const s of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
        t.push(
          new w(
            this.center.x.clone().add(s[0] * i[0]),
            this.center.y.clone().add(s[1] * i[1])
          )
        );
    }), t;
  }
  isPointOnCircle = (e) => this.#e?.test({ x: e.x, y: e.y }) ?? !1;
  lineIntersection(e) {
    if (this.#e === null)
      return [];
    const t = this.center, i = e.d, s = e.OA, r = i.normSquare, o = s.x.clone().subtract(t.x).multiply(i.x).add(s.y.clone().subtract(t.y).multiply(i.y)).multiply(2), h = s.x.clone().subtract(t.x).pow(2).add(s.y.clone().subtract(t.y).pow(2)).subtract(this.squareRadius), c = S.fromQuadratic(r, o, h);
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
    const u = s.add(i.clone().multiplyByScalar(c[0].value)), l = s.add(i.clone().multiplyByScalar(c[1].value));
    return [
      new w(u.x, u.y),
      new w(l.x, l.y)
    ];
  }
  get radius() {
    return new k().from(2, this.#s ?? 0);
  }
  /**
   * Get the relative position between circle and line. It corresponds to the number of intersection.
   * @param {Line} L
   * @returns {number}
   */
  relativePosition(e) {
    if (this.#t === null || this.#s === null)
      return -1;
    const t = e.distanceTo(this.#t).pow(2).value, i = this.#s.value;
    return t - i > 1e-10 ? 0 : Math.abs(t - i) < 1e-10 ? 1 : 2;
  }
  setRadius(e, t) {
    return t ? this.#s = new a(e) : this.#s = new a(e).pow(2), this.#r(), this;
  }
  get squareRadius() {
    return this.#s?.clone() ?? new a(-1);
  }
  tangents = (e) => e instanceof a ? this.#u(e) : this.isPointOnCircle(e) ? this.#o(e) : this.#t !== null && this.#t.distanceTo(e).value > this.radius.value ? this.#a(e) : (console.log("No tangents as the point is inside !"), []);
  #r() {
    this.#e = new x(
      new f(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
      new f(this.squareRadius.display)
    ).moveLeft();
  }
  #n() {
    this.#t = null, this.#s = null, this.#e = null;
  }
  #o = (e) => {
    const t = new g(this.center, e);
    return [new v().fromPointAndNormal(e, t)];
  };
  #a = (e) => {
    const t = this.center.x.clone().subtract(e.x), i = this.center.y.clone().subtract(e.y), s = new f("x"), r = new f("x^2+1");
    return s.multiply(t).subtract(i).pow(2), r.multiply(this.squareRadius), new x(s, r).solve().map((c) => {
      let u;
      const l = new x("y", "x");
      return c.exact instanceof a ? (u = e.x.clone().opposite().multiply(c.exact).add(e.y), l.right.multiply(c.exact).add(u)) : (u = e.x.clone().opposite().multiply(c.value).add(e.y), l.right.multiply(c.value).add(u)), new v(l);
    });
  };
  #u = (e) => {
    const t = e.numerator, i = -e.denominator, s = this.center.x.clone(), r = this.center.y.clone(), o = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), h = s.clone().multiply(t).opposite().subtract(r.clone().multiply(i)).add(o.clone().sqrt()), c = s.clone().multiply(t).opposite().subtract(r.clone().multiply(i)).subtract(o.clone().sqrt());
    return [new v(t, i, h), new v(t, i, c)];
  };
}
class H {
  static PARALLEL = J.Parallel;
  // A line is defined as the canonical form
  static PERPENDICULAR = J.Perpendicular;
  // ax + by + c = 0
  #t = new w();
  #e = new g();
  constructor(e, t) {
    return this.#t = e.clone(), this.#e = t instanceof w ? new g(e, t) : t.clone(), this;
  }
  clone = () => (this.#e = this.#e.clone(), this.#t = this.#t.clone(), this);
  get tex() {
    return {
      parametric: `${g.asTex("x", "y", "z")} = ${g.asTex(this.#t.x.tex, this.#t.y.tex, this.#t.z.tex)} + k\\cdot ${g.asTex(this.#e.x.tex, this.#e.y.tex, this.#e.z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new f(this.#t.x).add(new m(this.#e.x).multiply(new m("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new f(this.#t.y).add(new m(this.#e.y).multiply(new m("k"))).reorder("k", !0).tex}\\\\
    z &= ${new f(this.#t.z).add(new m(this.#e.z).multiply(new m("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
      cartesian: `\\frac{ ${new f("x", 1, this.#t.x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new f("y", 1, this.#t.y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new f("z", 1, this.#t.z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
    };
  }
  get display() {
    const e = this.#t.x.display, t = this.#t.y.display, i = this.#t.z.display, s = this.direction.simplify(), r = s.x.display, o = s.y.display, h = s.z.display;
    return {
      parametric: `${g.asDisplay("x", "y", "z")} = ${g.asDisplay(this.#t.x.display, this.#t.y.display, this.#t.z.display)} + k\\cdot ${g.asDisplay(this.#e.x.display, this.#e.y.display, this.#e.z.display)}`,
      system: "",
      cartesian: `(x-${e})/${r} = (y-${t})/${o} = (z-${i})/${h}`
    };
  }
  get OA() {
    return this.#t;
  }
  set OA(e) {
    this.#t = e;
  }
  get d() {
    return this.#e;
  }
  set d(e) {
    this.#e = e;
  }
  get direction() {
    return this.#e.clone();
  }
  distanceTo(e) {
    const t = new g(this.#t, e), i = this.direction, s = this.direction.normSquare, r = t.cross(i).normSquare, o = r.clone().divide(s), h = o.clone().sqrt();
    return console.log("CROSS", t.cross(i).display), {
      value: Math.sqrt(o.value),
      fraction: o.clone().sqrt(),
      tex: h.isExact() ? h.tex : `\\sqrt{${o.tex}}`
    };
  }
  // ------------------------------------------
  // Mathematical operations
  hitSegment(e, t) {
    const i = this.intersection(
      new H(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) && i.point.z.value >= Math.min(e.z.value, t.z.value) && i.point.z.value <= Math.max(e.z.value, t.z.value) : !1;
  }
  intersection = (e) => {
    throw new Error("Method not implemented.");
  };
  // ------------------------------------------
  isOnLine = (e) => !1;
  isParallelTo = (e) => {
    throw new Error("Method not implemented.");
  };
  isPerpendicularTo = (e) => {
    throw new Error("Method not implemented.");
  };
  isSameAs = (e) => {
    throw new Error("Method not implemented.");
  };
  isVertical = () => {
    throw new Error("Method not implemented.");
  };
  get point() {
    return this.#t.clone();
  }
  randomPoint = (e = 5) => {
    const t = this.#t.clone(), i = new a(O(e, !1));
    return new w(
      t.x.clone().add(this.#e.x.clone().multiply(i)),
      t.y.clone().add(this.#e.y.clone().multiply(i)),
      t.z.clone().add(this.#e.z.clone().multiply(i))
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
class se {
  #t = new g(0, 0, 1);
  #e = new w(0, 0, 0);
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
      const [t, i] = e.directions;
      this.normal = t.cross(i);
      return;
    }
    if (e.equation) {
      const t = e.equation.moveLeft().reduce().left, i = t.monomByLetter("x").coefficient, s = t.monomByLetter("y").coefficient, r = t.monomByLetter("z").coefficient, o = t.monomByDegree(0).coefficient;
      this.normal = new g(i, s, r), i.isNotZero() ? this.point = new w(o.clone().divide(i).opposite(), 0, 0) : s.isNotZero() ? this.point = new w(0, o.clone().divide(s).opposite(), 0) : this.point = new w(0, 0, o.clone().divide(r).opposite());
      return;
    }
    if (e.points?.length === 3 && e.points.every((t) => t instanceof g)) {
      const t = e.points[0], i = e.points[1], s = e.points[2], r = new g(t, i), o = new g(t, s);
      this.normal = r.cross(o), this.point = t;
      return;
    }
    if (e.coefficients?.length === 4) {
      const [t, i, s, r] = e.coefficients;
      this.normal = new g(t, i, s), this.point = new w(0, 0, -r);
      return;
    }
  }
  get tex() {
    return new x(
      new f("xyz", this.a, this.b, this.c, this.d),
      new f(0)
    ).reduce().tex;
  }
  get display() {
    return new x(
      new f("xyz", this.a, this.b, this.c, this.d),
      new f(0)
    ).reduce().display;
  }
  get a() {
    return this.#t.x;
  }
  angle(e, t, i) {
    if (e instanceof se)
      return this.normal.angle(e.normal, t, i);
    let s;
    if (e instanceof g) {
      if (e.dimension !== 3)
        throw new Error("Vector is not 3D");
      s = e;
    } else
      s = e.direction;
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
  distanceTo(e) {
    return this.normal.dot(e).add(this.d).abs().value / this.normal.norm;
  }
  intersectWithLine(e) {
    const { point: t, direction: i } = e, s = this.normal.dot(t).add(this.d).divide(this.normal.dot(i).opposite());
    return new w(
      new g(t).add(i.clone().multiplyByScalar(s))
    );
  }
  intersectWithPlane(e) {
    throw this.normal.cross(e.normal), new w(0, 0, 0), new Error("Intersection with plane  not yet implemented !");
  }
  isPointOnPlane(e) {
    return this.normal.dot(e).add(this.d).isZero();
  }
  get normal() {
    return this.#t;
  }
  set normal(e) {
    this.#t = new g(e);
  }
  get point() {
    return this.#e;
  }
  set point(e) {
    this.#e = new w(e);
  }
}
var ce = /* @__PURE__ */ ((n) => (n[n.INTERIOR = 0] = "INTERIOR", n[n.EXTERIOR = 1] = "EXTERIOR", n[n.SECANT = 2] = "SECANT", n[n.TANGENT_INSIDE = 3] = "TANGENT_INSIDE", n[n.TANGENT_OUTSIDE = 4] = "TANGENT_OUTSIDE", n[n.SUPERPOSED = 5] = "SUPERPOSED", n[n.CONCENTRIC = 6] = "CONCENTRIC", n))(ce || {});
class Re {
  #t = void 0;
  #e = void 0;
  #i = void 0;
  #s = 1;
  constructor(e, t) {
    return e && t && (this.#t = e, this.#e = new a(t).clone().pow(2), this.#n()), this;
  }
  fromEquation(e) {
    const t = new x(e).moveLeft().reduce(), i = ["x", "y", "z"];
    if (i.some((r) => t.degree(r).value !== 2))
      return this.makeUndefined();
    const s = t.left.monomByDegree(2, "x").coefficient;
    return i.some((r) => t.left.monomByDegree(2, r).coefficient.isNotEqual(s)) ? this.makeUndefined() : (this.#t = new w(
      t.left.monomByDegree(1, "x").coefficient.clone().opposite().divide(2),
      t.left.monomByDegree(1, "y").coefficient.clone().opposite().divide(2),
      t.left.monomByDegree(1, "z").coefficient.clone().opposite().divide(2)
    ), this.#e = t.left.monomByDegree(0).coefficient.clone().opposite().add(this.#t.x.clone().pow(2)).add(this.#t.y.clone().pow(2)).add(this.#t.z.clone().pow(2)), this.#n(), this);
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
  #r = (e) => {
    if (this.#i === void 0)
      throw new Error("Sphere3 is undefined");
    if (this.#s === 0)
      return e ? this.#i.tex : this.#i.display;
    const t = [];
    return ["x", "y", "z"].forEach((s) => {
      if (this.center[s].isZero())
        t.push(`${s}^2`);
      else {
        const r = new f(s).subtract(this.center[s]);
        t.push(
          e ? `\\(${r.tex}\\)^2` : `(${r.display})^2`
        );
      }
    }), t.join("+") + "=" + (e ? this.squareRadius.tex : this.squareRadius.display);
  };
  #n() {
    this.#i = new x(
      new f("x").subtract(this.center.x).pow(2).add(
        new f("y").subtract(this.center.y).pow(2)
      ).add(
        new f("z").subtract(this.center.z).pow(2)
      ),
      new f(this.squareRadius)
    ).reduce();
  }
  static RELATIVE_POSITION = ce;
  relativePosition = (e) => {
    const t = this.center.distanceTo(e.center).value, i = this.radius.value, s = e.radius.value;
    return t > i + s ? 1 : t === i + s ? 4 : t === 0 ? i === s ? 5 : 6 : t === Math.abs(i - s) ? 3 : t < Math.abs(i - s) ? 0 : 2;
  };
  isPointOnSphere = (e) => this.#i?.test({
    x: e.x,
    y: e.y,
    z: e.z
  }) ?? !1;
}
function Y(n) {
  const e = Object.assign(
    {
      negative: !0,
      max: 10,
      reduced: !0,
      zero: !0,
      natural: !1
    },
    n
  ), t = new a();
  if (e.negative ? t.numerator = O(e.max, e.zero) : t.numerator = B(e.zero ? 0 : 1, e.max), e.natural)
    t.denominator = 1;
  else {
    let i = 0;
    for (; t.isRelative() && i < 10; )
      t.denominator = B(1, e.max), i++;
  }
  return e.reduced ? t.reduce() : t;
}
function le(n) {
  const e = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    n
  ), t = new m();
  if (t.coefficient = Y({
    zero: e.zero,
    reduced: !0,
    natural: !e.fraction
  }), e.letters.length > 1) {
    for (const i of e.letters.split(""))
      t.setLetter(i, 0);
    for (let i = 0; i < e.degree; i++) {
      const s = ie(e.letters.split(""));
      t.setLetter(s, t.degree(s).clone().add(1));
    }
  } else
    t.setLetter(e.letters, e.degree);
  return t;
}
const Pe = {
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
function ue(n) {
  const e = Object.assign(
    Pe,
    n
  ), t = new f().empty();
  let i;
  for (let s = e.degree; s >= 0; s--)
    i = le({
      letters: e.letters,
      degree: s,
      fraction: e.fraction,
      zero: s === e.degree ? !1 : e.allowNullMonom
    }), e.unit && e.degree === s && i.coefficient.one(), t.add(i);
  if (e.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposite(), e.numberOfMonoms && e.numberOfMonoms > 0 && e.numberOfMonoms < t.length)
    for (; t.length > e.numberOfMonoms; ) {
      const s = B(1, t.length - 1);
      t.monoms.splice(s, 1);
    }
  return t.reduce();
}
function Ze(n) {
  const e = Object.assign(
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
  ), t = new f().one();
  for (let i = 0; i < e.degree; i++) {
    const s = ue({
      degree: 1,
      unit: e.unit,
      fraction: e.fraction,
      letters: e.letters,
      zero: e.zero
    });
    t.multiply(s);
  }
  return new x(t, 0);
}
function _(n) {
  const e = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    n
  ), t = e.axis === "x", i = e.axis === "y", s = e.fraction ? Y({ max: e.max, zero: t }) : new a(O(e.max, t)), r = e.fraction ? Y({ max: e.max, zero: i }) : new a(O(e.max, i));
  return Number(e.quadrant) === 1 && (s.abs(), r.abs()), Number(e.quadrant) === 2 && (s.isPositive() && s.opposite(), r.isNegative() && r.opposite()), Number(e.quadrant) === 3 && (s.isPositive() && s.opposite(), r.isPositive() && r.opposite()), Number(e.quadrant) === 4 && (s.isNegative() && s.opposite(), r.isPositive() && r.opposite()), new w(s, r);
}
function De(n) {
  const e = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    n
  ), t = _(e.center);
  let i, s;
  return e.pointsOnCircle === 8 ? (i = B(1, 3), s = i ** 2 + (i + 1) ** 2) : s = B(1, 20), new X(t, s, !0);
}
function Le(n) {
  const e = Object.assign(
    {
      A: {
        x: O(10),
        y: O(10)
      }
    },
    n
  ), t = new g(
    O(10),
    O(10)
  );
  for (; t.isNull; )
    t.x = O(10), t.y = O(10);
  return e.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposite() : e.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposite(), new v().fromPointAndDirection(new g(e.A.x, e.A.y), t);
}
function Ve(n) {
  const e = Object.assign(
    {
      A: {
        x: O(10),
        y: O(10),
        z: O(10)
      },
      direction: {
        x: O(10),
        y: O(10),
        z: O(10)
      }
    },
    n
  ), t = new w(e.A.x, e.A.y, e.A.z), i = new g(e.direction.x, e.direction.y, e.direction.z);
  return new H(t, i);
}
const Ue = {
  equation: (n) => Ze(n),
  polynom: (n) => ue(n),
  monom: (n) => le(n),
  fraction: (n) => Y(n),
  number: (n, e, t) => B(n, e, t),
  numberSym: (n, e) => O(n, e),
  prime: (n) => Ie(n),
  bool: (n) => he(n),
  array: (n, e) => ze(n, e),
  item: (n) => ie(n),
  shuffle: (n) => ae(n),
  line: (n) => Le(n),
  line3: (n) => Ve(n),
  vector: (n) => _(n),
  point: (n) => new w(_(n)),
  circle: (n) => De(n)
}, Fe = {
  Numeric: b,
  Fraction: a,
  Root: Ee,
  Monom: m,
  Polynom: f,
  Equation: x,
  Matrix: R,
  LinearSystem: z,
  Factor: E,
  PolyFactor: T,
  LogicalSet: ke,
  Random: Ue,
  Geometry: {
    Vector: g,
    Point: w,
    Line: v,
    Triangle: G,
    Circle: X,
    Line3: H,
    Plane3: se,
    Sphere3: Re
  },
  NumExp: Ce
};
export {
  X as Circle,
  x as Equation,
  F as EquationSolver,
  U as FACTOR_DISPLAY,
  be as FRAC_TYPE,
  E as Factor,
  a as Fraction,
  v as Line,
  H as Line3,
  z as LinearSystem,
  ke as LogicalSet,
  R as Matrix,
  m as Monom,
  Ee as NthRoot,
  Ce as NumExp,
  b as Numeric,
  se as Plane3,
  w as Point,
  T as PolyFactor,
  f as Polynom,
  Ue as Random,
  ce as SPHERE3_RELATIVE_POSITION,
  Re as Sphere3,
  G as Triangle,
  g as Vector,
  Me as areVectorsColinears,
  Be as areVectorsEquals,
  Fe as default,
  je as determinantFromVectors,
  Se as dotProduct
};
//# sourceMappingURL=pimath.js.map
