function le(r) {
  const e = ie(r), t = [];
  let i, s;
  for (; e.length > 0; )
    i = e.shift() ?? 1, s = (e.length > 0 ? e.pop() : +i) ?? 1, t.push([i, s]);
  return t;
}
function ce(...r) {
  const e = K(...r);
  return r.map((t) => t / e);
}
function ie(r) {
  const e = Math.abs(r), t = Math.sqrt(e), i = [];
  for (let s = 1; s <= t; s++)
    r % s === 0 && (i.push(s), i.push(e / s));
  return i.sort(function(s, n) {
    return s - n;
  }), [...new Set(i)];
}
function K(...r) {
  const e = function(s, n) {
    return n === 0 ? s : e(n, s % n);
  };
  let t = 1, i = 2;
  if (r.length === 0)
    return 1;
  if (r.length === 1)
    return r[0] === 0 ? 1 : r[0];
  if (t = e(r[0], r[1]), t === 1)
    return 1;
  for (i = 2; i < r.length && (t = e(t, r[i]), t !== 1); i++)
    ;
  return Math.abs(t);
}
function ue(...r) {
  return r.reduce(function(e, t) {
    return Math.abs(e * t / K(e, t));
  });
}
function fe(r, e = 3) {
  return +r.toFixed(e);
}
function de(r) {
  if (Number.isSafeInteger(r) || r.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function pe(r) {
  const e = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return r === void 0 ? e : e.slice(0, Math.min(e.length, r));
}
function me(r, e) {
  const t = [], i = e === !0 ? +r : r ** 2;
  for (let s = 0; s <= r; s++)
    for (let n = 0; n <= r; n++)
      s ** 2 + n ** 2 === i && t.push([s, n, r]);
  return t;
}
function ge(r, e = 2) {
  return +`${Math.round(+`${r}e${e}`)}e-${e}`;
}
const E = {
  decompose: le,
  dividers: ie,
  divideNumbersByGCD: ce,
  gcd: K,
  lcm: ue,
  numberCorrection: fe,
  periodic: de,
  primes: pe,
  pythagoreanTripletsWithTarget: me,
  round: ge
};
var we = /* @__PURE__ */ ((r) => (r.frac = "frac", r.dfrac = "dfrac", r.tfrac = "tfrac", r))(we || {});
class a {
  #i = !1;
  #e = 1;
  #t = 1;
  #s = "frac";
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
      return this.#t = 0, this.#e = 1, this;
    switch (typeof e) {
      case "string":
        if (i = e.split("/"), i.length > 2 && (this.#t = NaN), i.map((s) => s === "" || isNaN(Number(s))).includes(!0) && (this.#t = NaN), i.length === 1)
          return this.parse(+i[0]);
        i.length === 2 ? i[1] === "0" ? (this.#t = NaN, this.#e = 1) : (this.#t = +i[0], this.#e = +i[1]) : (this.#t = NaN, this.#e = 1);
        break;
      case "number":
        if (Number.isSafeInteger(e))
          this.#t = +e, t === void 0 || !Number.isSafeInteger(t) ? this.#e = 1 : this.#e = +t;
        else {
          const [, s] = e.toString().split("."), n = s ? s.length : 0, o = Math.pow(10, n);
          t === void 0 ? (this.#t = e * o, this.#e = o) : Number.isSafeInteger(t) && (this.#t = e * o - Math.floor(e * Math.pow(10, n - t)), this.denominator = o - Math.pow(10, n - t)), this.#t = E.numberCorrection(this.#t), this.#e = E.numberCorrection(this.#e), this.reduce();
        }
        break;
      case "object":
        e instanceof a && (this.#t = +e.numerator, this.#e = +e.denominator);
        break;
    }
    return this;
  };
  clone = () => {
    const e = new a();
    return e.numerator = +this.#t, e.denominator = +this.#e, e;
  };
  // Display getter
  get tex() {
    return this.isInfinity() ? `${this.sign() === 1 ? "+" : "-"}\\infty` : this.isExact() ? this.#e === 1 ? `${this.#t}` : this.#t < 0 ? `-\\${this.#s}{ ${-this.#t} }{ ${this.#e} }` : `\\${this.#s}{ ${this.#t} }{ ${this.#e} }` : this.value.toFixed(3);
  }
  get display() {
    return this.isExact() ? this.#e === 1 ? `${this.#t}` : `${this.#t}/${this.#e}` : this.value.toFixed(3);
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
  // ------------------------------------------
  // Compare functions
  static min = (...e) => {
    let t = new a(e[0]);
    for (const i of e) {
      const s = new a(i);
      s.isLesser(t) && (t = s.clone());
    }
    return t;
  };
  static sort = (e, t) => {
    const s = e.map((n) => n instanceof a ? n : new a(n)).sort((n, o) => n.value - o.value);
    return t && s.reverse(), s;
  };
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
  abs = () => (this.#t = Math.abs(this.#t), this.#e = Math.abs(this.#e), this);
  add = (e) => {
    if (e instanceof a) {
      const t = this.#t, i = this.#e;
      this.#t = t * e.denominator + e.numerator * i, this.#e = i * e.denominator;
    } else
      return this.add(new a(e));
    return this.reduce();
  };
  amplify = (e) => (Number.isSafeInteger(e) && (this.#t *= e, this.#e *= e), this);
  /**
   * Simple function to determine if it's a fraction
   */
  areEquals = (...e) => e.every((t) => t.isEqual(e[0]));
  // ------------------------------------------
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
    return this.#s = "dfrac", this;
  }
  divide = (e) => {
    const t = new a(e);
    if (t.numerator === 0)
      return new a().infinite();
    const i = this.#t, s = this.#e;
    return this.#t = i * t.denominator, this.#e = s * t.numerator, this.reduce();
  };
  get frac() {
    return this.#s = "frac", this;
  }
  infinite = () => (this.#t = 1 / 0, this.#e = 1, this);
  invalid = () => (this.#t = NaN, this.#e = 1, this);
  inverse = () => {
    const e = this.sign(), t = Math.abs(this.#t);
    return this.#t = Math.abs(this.#e) * e, this.#e = t, this;
  };
  isApproximative = () => this.#i || this.#t.toString().length >= 15 && this.#e.toString().length >= 15;
  isEqual = (e) => this.compare(e, "=");
  isEven = () => this.isRelative() && this.value % 2 === 0;
  isExact = () => !this.isApproximative();
  isFinite = () => !this.isInfinity() && !this.isNaN();
  isGeq = (e) => this.compare(e, ">=");
  isGreater = (e) => this.compare(e, ">");
  isInfinity = () => Math.abs(this.#t) === 1 / 0;
  isInverted = (e) => this.isEqual(new a().one().divide(e.clone()));
  isLeq = (e) => this.compare(e, "<=");
  /* Compare shortcuts */
  isLesser = (e) => this.compare(e, "<");
  isNaN = () => isNaN(this.#t);
  isNatural = () => this.isRelative() && this.isPositive();
  isNegative = () => this.sign() === -1;
  isNegativeOne = () => this.#t === -1 && this.#e === 1;
  // ------------------------------------------
  isNotEqual = (e) => this.compare(e, "<>");
  isNotZero = () => this.#t !== 0;
  isOdd = () => this.isRelative() && this.value % 2 === 1;
  isOne = () => this.#t === 1 && this.#e === 1;
  isOpposite = (e) => this.isEqual(e.clone().opposite());
  isPositive = () => this.sign() === 1;
  isRational = () => !this.isRelative();
  isReduced = () => Math.abs(E.gcd(this.#t, this.#e)) === 1;
  isRelative = () => this.clone().reduce().denominator === 1;
  isSquare = () => Math.sqrt(this.#t) % 1 === 0 && Math.sqrt(this.#e) % 1 === 0;
  isStrictlyNegative = () => this.value < 0;
  isStrictlyPositive = () => this.value > 0;
  // Mathematical operations specific to fractions
  isZero = () => this.#t === 0;
  multiply = (e) => {
    const t = new a(e);
    return this.#t = this.#t * t.numerator, this.#e = this.#e * t.denominator, this.reduce();
  };
  // ------------------------------------------
  get numerator() {
    return this.#t;
  }
  set numerator(e) {
    this.#t = e;
  }
  one = () => (this.#t = 1, this.#e = 1, this);
  opposite = () => (this.#t = -this.#t, this);
  pow = (e) => {
    if (e instanceof a)
      return this.pow(e.value);
    this.reduce(), e < 0 && this.inverse();
    const t = Math.floor(Math.pow(this.#t, Math.abs(e))), i = Math.floor(Math.pow(this.#e, Math.abs(e)));
    return t ** Math.abs(e) === this.#t && i ** Math.abs(e) === this.#e ? (this.#t = this.#t ** Math.abs(e), this.#e = this.#e ** Math.abs(e)) : (this.#t = this.#t ** Math.abs(e), this.#e = this.#e ** Math.abs(e)), this;
  };
  // ------------------------------------------
  reduce = () => {
    const e = E.gcd(this.#t, this.#e);
    return this.#t = this.#t / e, this.#e = this.#e / e, this.#e < 0 && (this.#e = -this.#e, this.#t = -this.#t), this;
  };
  // ------------------------------------------
  // Getter and setter
  root = (e) => {
    if (e === 0)
      return this;
    if (e < 0 && this.inverse(), !Number.isSafeInteger(e))
      throw new Error("The root must be an integer.");
    if (this.isNegative() && e % 2 === 0)
      throw new Error("The root of a negative number must be odd.");
    const t = this.sign();
    this.abs(), this.reduce();
    const i = Math.floor(Math.pow(this.#t, Math.abs(1 / e))), s = Math.floor(Math.pow(this.#e, Math.abs(1 / e)));
    return this.#t = Math.pow(this.#t, Math.abs(1 / e)), this.#e = Math.pow(this.#e, Math.abs(1 / e)), (i !== this.#t || s !== this.#e) && (this.#t = this.#t / this.#e, this.#e = 1, this.#i = !0), this.multiply(t), this;
  };
  sign = () => this.#t * this.#e >= 0 ? 1 : -1;
  sqrt = () => this.root(2);
  subtract = (e) => e instanceof a ? this.add(e.clone().opposite()) : this.add(-e);
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get tfrac() {
    return this.#s = "tfrac", this;
  }
  get value() {
    const e = this.#t / this.#e;
    return e === 0 ? 0 : e;
  }
  zero = () => (this.#t = 0, this.#e = 1, this);
}
class j {
  #i;
  #e;
  #t;
  #s;
  constructor(...e) {
    this.#i = 1, this.#t = 1, this.#e = 2, this.#s = !0, e.length > 0 && this.parse(e[0], e[1], e[2]);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get radical() {
    return this.#i;
  }
  set radical(e) {
    this.#i = e;
  }
  get nth() {
    return this.#e;
  }
  set nth(e) {
    Number.isSafeInteger(e) && e >= 2 ? this.#e = e : (console.log("Error setting the nth root"), this.#e = 2);
  }
  get coefficient() {
    return this.#t;
  }
  set coefficient(e) {
    this.#t = e;
  }
  get tex() {
    let e;
    return this.#t === 1 ? e = "" : this.#t === -1 ? e = "-" : e = this.#t.toString(), this.#i === 1 ? `${this.#t}` : this.#e === 2 ? `${e}\\sqrt{${this.#i}}` : `${e}\\sqrt[${this.#e}]{${this.#i}}`;
  }
  get display() {
    let e;
    return this.#t === 1 ? e = "" : this.#t === -1 ? e = "-" : e = this.#t.toString(), this.#i === 1 ? `${this.#t}` : this.#e === 2 ? `${e}sqrt{${this.#i}}` : `${e}root(${this.#e}){${this.#i}}`;
  }
  get value() {
    return this.#t * Math.pow(this.#i, 1 / this.#e);
  }
  // ------------------------------------------
  // Creation / parsing functions
  // ------------------------------------------
  parse = (e, t, i) => (this.#t = i ?? 1, this.#e = t ?? 2, this.#i = e, this.#e % 2 === 0 && this.#i < 0 && (this.#s = !1), this);
  // ------------------------------------------
  // Mathematical operations
  // ------------------------------------------
  reduce = () => {
    let e = Math.floor(Math.pow(this.#i, 1 / this.#e));
    for (; e > 1; ) {
      if (this.#i % Math.pow(e, this.#e) === 0) {
        this.#t *= e, this.#i = this.#i / Math.pow(e, this.#e), e = Math.floor(Math.pow(this.#i, 1 / this.#e));
        continue;
      }
      e--;
    }
    return this;
  };
  multiply = (e) => (this.#i *= e.radical, this.reduce());
  // ------------------------------------------
  // Help functions
  // ------------------------------------------
  hasRadical = () => !(this.#i === 1 || this.#i === 0 || !this.#s);
}
class W {
  #i;
  #e;
  constructor(e, t, i = "x") {
    if (this.#e = i, Object.hasOwn(e, "moveLeft")) {
      const s = e;
      this.#i = s.left.clone().subtract(s.right);
    } else
      this.#i = e.clone().subtract(t ?? 0);
  }
  solve() {
    const e = this.#i.degree().value;
    if (e === 0)
      return [];
    if (e === 1)
      return this.#l();
    if (e === 2)
      return this.#u();
    const { solutions: t, polynom: i } = this.#a();
    return i.degree().isZero() ? t : t.concat(
      this.#n(i)
    ).sort((s, n) => s.value - n.value);
  }
  solveAsCardan() {
    if (this.#i.degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return this.#c();
  }
  #t(e, t) {
    return {
      variable: this.#e,
      exact: !1,
      value: +e.toFixed(10),
      tex: t?.tex ?? "",
      display: t?.display ?? ""
    };
  }
  #s(e) {
    if (e instanceof a && e.isApproximative())
      return this.#t(e.value);
    const t = new a(e);
    return {
      variable: this.#e,
      exact: t,
      value: t.value,
      tex: t.tex,
      display: t.display
    };
  }
  #n(e) {
    const t = [], i = e.degree().value, s = e.getCoefficients().map((d) => d.value), [n, ...o] = e.getCoefficients(), h = 2 + Math.max(...o.map((d) => d.value / n.value)), l = this.#o(e, h, 100);
    return this.#h(l, i).forEach((d) => {
      const [m, w] = d;
      if (m === w)
        t.push(this.#s(m));
      else {
        const N = this.#r(e, s, m, w);
        N !== null && t.push(this.#t(N));
      }
    }), t;
  }
  #r(e, t, i, s, n = 1e-10) {
    let o = e.evaluate(i, !0), h = e.evaluate(s, !0);
    if (o * h > 0)
      return console.log("Pas de racine dans l'intervalle donné"), null;
    let l;
    for (; (s - i) / 2 > n; ) {
      l = (i + s) / 2;
      const c = e.evaluate(l, !0);
      if (c === 0)
        return l;
      o * c < 0 ? (s = l, h = c) : (i = l, o = c);
    }
    return (i + s) / 2;
  }
  #o(e, t, i) {
    const s = [], n = 2 * t / i;
    for (let o = -t; o <= t; o += n) {
      const h = E.numberCorrection(o);
      s.push(
        {
          x: h,
          fx: e.evaluate(h, !0)
        }
      );
    }
    return s;
  }
  #h(e, t) {
    const i = [];
    for (let s = 1; s < e.length; s++) {
      const n = e[s], o = e[s - 1];
      if (n.fx === 0 ? i.push([n.x, n.x]) : n.fx * o.fx < 0 && i.push([o.x, n.x]), i.length === t)
        return i;
    }
    return i;
  }
  #a() {
    const e = this.#i.clone(), t = [], i = e.lcmDenominator();
    i !== 1 && e.multiply(i);
    const s = e.monomByDegree().coefficient, n = e.monomByDegree(0).coefficient;
    if (n.isZero()) {
      t.push(this.#s(0));
      const m = e.monoms.reduce((N, A) => A.degree().value < N.degree().value ? A : N), w = m.coefficient;
      m.clone().divide(w), e.divide(m);
    }
    const o = E.dividers(s.value), h = E.dividers(n.value), l = [];
    for (const m of o)
      for (const w of h) {
        const N = new a(w, m);
        l.find((A) => A.value === N.value) || (l.push(N.clone()), l.push(N.opposite().clone()));
      }
    l.forEach((m) => {
      e.evaluate(m).isZero() && t.push(this.#s(m));
    });
    for (const m of t) {
      if (m.exact.isZero())
        continue;
      const w = e.clone().fromCoefficients(
        m.exact.denominator,
        -m.exact.numerator
      );
      for (; e.isDividableBy(w); )
        e.divide(w);
    }
    if (e.degree().isZero() || e.degree().value > 3)
      return t.sort((m, w) => m.value - w.value), { solutions: t, polynom: e };
    const c = e.clone().zero(), d = new W(e, c, this.#e);
    return {
      solutions: t.concat(d.solve()).sort((m, w) => m.value - w.value),
      polynom: c
    };
  }
  #c() {
    const e = this.#i, t = e.monomByDegree(3).coefficient, i = e.monomByDegree(2).coefficient, s = e.monomByDegree(1).coefficient, n = e.monomByDegree(0).coefficient, o = i.clone().divide(t), h = s.clone().divide(t), l = n.clone().divide(t), c = h.clone().subtract(o.clone().pow(2).divide(3)), d = l.clone().subtract(o.clone().multiply(h).divide(3)).add(o.clone().pow(3).multiply(2).divide(27)), m = d.clone().opposite(), w = c.clone().opposite().pow(3).divide(27), N = m.clone().pow(2).subtract(w.clone().multiply(4)).opposite();
    if (N.isNegative()) {
      const A = d.clone().opposite().add(N.clone().opposite().sqrt()).divide(2).root(3), C = d.clone().opposite().subtract(N.clone().opposite().sqrt()).divide(2).root(3), O = A.clone().add(C).subtract(o.clone().divide(3));
      return [this.#s(O)];
    }
    if (N.isZero()) {
      const A = d.clone().opposite().divide(2).root(3), C = A.clone().opposite().subtract(o.clone().divide(3)), O = A.clone().multiply(2).subtract(o.clone().divide(3));
      return C.isEqual(O) ? [this.#s(C)] : [
        this.#s(O),
        this.#s(C)
      ].sort((M, $) => M.value - $.value);
    }
    if (N.isPositive()) {
      const A = [], C = c.value, O = d.value, M = o.value;
      for (let $ = 0; $ < 3; $++)
        A.push(2 * Math.sqrt(-C / 3) * Math.cos(Math.acos(3 * O / (2 * C) * Math.sqrt(-3 / C)) / 3 + 2 * Math.PI * $ / 3) - M / 3);
      return A.map(($) => this.#t($)).sort(($, S) => $.value - S.value);
    }
    return [];
  }
  #l() {
    const [e, t] = this.#i.getCoefficients(), i = t.opposite().divide(e);
    return [
      this.#s(i)
    ];
  }
  #u() {
    const e = this.#i;
    e.monomByDegree().coefficient.isNegative() && e.opposite();
    const [t, i, s] = e.getCoefficients(), n = i.clone().pow(2).subtract(t.clone().multiply(s).multiply(4));
    if (n.isNegative())
      return [];
    if (n.isSquare()) {
      const o = n.sqrt(), h = i.clone().opposite().subtract(o).divide(t.clone().multiply(2)), l = i.clone().opposite().add(o).divide(t.clone().multiply(2));
      return o.isZero() ? [this.#s(h)] : [
        this.#s(h),
        this.#s(l)
      ].sort((c, d) => c.value - d.value);
    }
    return this.#f(t, i, n);
  }
  #f(e, t, i) {
    const s = E.dividers(i.value).filter((O) => Math.sqrt(O) % 1 === 0).map((O) => Math.sqrt(O)).pop() ?? 1, n = E.gcd(2 * e.value, t.value, s) * (e.isNegative() ? -1 : 1), o = t.clone().divide(n).opposite(), h = e.clone().divide(n).multiply(2), l = Math.abs(s / n), c = `${s === 1 ? "" : l + " "}\\sqrt{ ${i.clone().divide(s ** 2).tex} }`, d = `${s === 1 ? "" : l}sqrt(${i.clone().divide(s ** 2).display})`;
    function m(O, M, $, S) {
      const R = M === "0" ? "" : M, P = $ === "-" || R !== "" ? ` ${$} ` : "";
      return O === "1" ? `${R}${P}${S}` : `\\frac{ ${P}${P}${S} }{ ${O} }`;
    }
    function w(O, M, $, S) {
      const R = M === "0" ? "" : M, P = $ === "-" || R !== "" ? $ : "";
      return O === "1" ? `${R}${P}${S}` : `(${R}${P}${S})/${O}`;
    }
    const N = i.value ** 0.5, A = (-t.value - N) / (2 * e.value), C = (-t.value + N) / (2 * e.value);
    return [
      this.#t(
        A,
        {
          tex: m(h.tex, o.tex, "-", c),
          display: w(h.display, o.display, "-", d)
        }
      ),
      this.#t(
        C,
        {
          tex: m(h.tex, o.tex, "+", c),
          display: w(h.display, o.display, "+", d)
        }
      )
    ].sort((O, M) => O.value - M.value);
  }
}
const J = {
  pi: Math.PI,
  e: Math.exp(1)
};
var f = /* @__PURE__ */ ((r) => (r.VARIABLE = "variable", r.COEFFICIENT = "coefficient", r.OPERATION = "operation", r.CONSTANT = "constant", r.FUNCTION = "function", r.FUNCTION_ARGUMENT = "function-argument", r.MONOM = "monom", r.LEFT_PARENTHESIS = "(", r.RIGHT_PARENTHESIS = ")", r))(f || {}), z = /* @__PURE__ */ ((r) => (r.EXPRESSION = "expression", r.POLYNOM = "polynom", r.SET = "set", r.NUMERIC = "numeric", r))(z || {});
function ye(r, e) {
  if (r.length <= 1)
    return r;
  const t = Object.keys(e).filter((m) => e[m].type === f.FUNCTION).map((m) => m);
  t.sort((m, w) => w.length - m.length);
  const i = new RegExp(`^(${t.join("|")})\\(`), s = Object.keys(J);
  s.sort((m, w) => w.length - m.length);
  const n = new RegExp(`^(${s.join("|")})`), o = /^(\d+(\.\d+)?)/;
  let h = "", l, c, d;
  for (t.forEach((m) => {
    if (r.includes(m)) {
      const w = new RegExp(`${m}([0-9.]+)`, "g");
      r = r.replaceAll(w, `${m}($1)`);
    }
  }); r.length > 0; ) {
    if (l = c, d = void 0, t.length > 0 && i.exec(r)) {
      const m = t.find((w) => r.startsWith(w));
      m && (d = m + "(", r = r.slice(m.length + 1), c = f.FUNCTION);
    } else if (s.length > 0 && n.exec(r)) {
      const m = s.find((w) => r.startsWith(w));
      m && (d = m, r = r.slice(m.length), c = f.CONSTANT);
    } else if (o.exec(r)) {
      const m = o.exec(r);
      m && (d = m[0], r = r.slice(m[0].length), c = f.COEFFICIENT);
    } else
      switch (d = r[0], r = r.slice(1), d) {
        case "(":
          c = f.LEFT_PARENTHESIS;
          break;
        case ")":
          c = f.RIGHT_PARENTHESIS;
          break;
        case ",":
          c = f.FUNCTION_ARGUMENT;
          break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
          c = f.OPERATION;
          break;
        default:
          c = f.VARIABLE;
      }
    if (d === void 0 || c === void 0)
      throw new Error("The token is undefined");
    h += ve(l, c), h += d;
  }
  return h;
}
function ve(r, e) {
  return r === void 0 || r === f.OPERATION || e === f.OPERATION || r === f.LEFT_PARENTHESIS || r === f.FUNCTION || r === f.FUNCTION_ARGUMENT || e === f.RIGHT_PARENTHESIS || e === f.FUNCTION_ARGUMENT ? "" : "*";
}
const be = {
  "^": { precedence: 4, associative: "right", type: f.OPERATION },
  "*": { precedence: 3, associative: "left", type: f.OPERATION },
  "/": { precedence: 3, associative: "left", type: f.OPERATION },
  "+": { precedence: 2, associative: "left", type: f.OPERATION },
  "-": { precedence: 2, associative: "left", type: f.OPERATION }
}, xe = {
  "^": { precedence: 4, associative: "right", type: f.OPERATION },
  "*": { precedence: 3, associative: "left", type: f.OPERATION },
  "/": { precedence: 3, associative: "left", type: f.OPERATION },
  "+": { precedence: 2, associative: "left", type: f.OPERATION },
  "-": { precedence: 2, associative: "left", type: f.OPERATION },
  "%": { precedence: 3, associative: "right", type: f.OPERATION },
  sin: { precedence: 4, associative: "right", type: f.FUNCTION },
  cos: { precedence: 4, associative: "right", type: f.FUNCTION },
  tan: { precedence: 4, associative: "right", type: f.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: f.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: f.FUNCTION },
  ",": { precedence: 2, associative: "left", type: f.FUNCTION_ARGUMENT }
}, Ee = {
  "^": { precedence: 4, associative: "right", type: f.OPERATION },
  "*": { precedence: 3, associative: "left", type: f.OPERATION },
  "/": { precedence: 3, associative: "left", type: f.OPERATION },
  "+": { precedence: 2, associative: "left", type: f.OPERATION },
  "-": { precedence: 2, associative: "left", type: f.OPERATION },
  "%": { precedence: 3, associative: "right", type: f.OPERATION },
  sin: { precedence: 4, associative: "right", type: f.FUNCTION },
  cos: { precedence: 4, associative: "right", type: f.FUNCTION },
  tan: { precedence: 4, associative: "right", type: f.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: f.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: f.FUNCTION },
  ln: { precedence: 4, associative: "right", type: f.FUNCTION },
  log: { precedence: 4, associative: "right", type: f.FUNCTION }
}, Ne = {
  "&": { precedence: 3, associative: "left", type: f.OPERATION },
  "|": { precedence: 3, associative: "left", type: f.OPERATION },
  "!": { precedence: 4, associative: "right", type: f.OPERATION },
  "-": { precedence: 2, associative: "left", type: f.OPERATION }
};
class X {
  #i;
  #e = [];
  #t = {};
  #s = [];
  #n;
  constructor(e) {
    this.#i = typeof e > "u" ? z.POLYNOM : e, this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return this.#e;
  }
  get rpnToken() {
    return this.#e.map((e) => e.token);
  }
  tokenConfigInitialization() {
    return this.#i === z.SET ? (this.#t = Ne, this.#n = !1) : this.#i === z.NUMERIC ? (this.#t = Ee, this.#n = !0) : this.#i === z.EXPRESSION ? (this.#t = xe, this.#n = !0) : (this.#t = be, this.#n = !0), this.#s = Object.keys(this.#t).sort((e, t) => t.length - e.length), this.#t;
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(e, t) {
    let i, s;
    if (i = "", s = void 0, e[t] === "(")
      i = "(", s = f.LEFT_PARENTHESIS;
    else if (e[t] === ")")
      i = ")", s = f.RIGHT_PARENTHESIS;
    else if (e[t] === ",")
      i = ",", s = f.FUNCTION_ARGUMENT;
    else {
      for (const n of this.#s)
        if (e.substring(t, t + n.length) === n) {
          i += n, s = this.#t[n].type;
          break;
        }
      for (const n in J)
        if (e.substring(t, t + n.length) === n) {
          i += n, s = f.CONSTANT;
          break;
        }
      if (i === "")
        if (/[0-9.]/.exec(e[t])) {
          const n = /^([0-9.]+)/.exec(e.substring(t));
          i = n ? n[0] : "", s = f.COEFFICIENT;
        } else if (/[a-zA-Z]/.exec(e[t])) {
          const n = /^([a-zA-Z])/.exec(e.substring(t));
          i = n ? n[0] : "", s = f.VARIABLE;
        } else
          console.log("Unidentified token", e[t], e, t), i = e[t], s = f.MONOM;
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
    let n = "", o = 0, h;
    (t ?? this.#n) && (e = ye(e, this.#t));
    let l = 50, c;
    for (; o < e.length; ) {
      if (l--, l === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([n, o, h] = this.NextToken(e, o), h) {
        case f.MONOM:
        case f.COEFFICIENT:
        case f.VARIABLE:
        case f.CONSTANT:
          i.push({
            token: n,
            tokenType: h
          });
          break;
        case f.OPERATION:
          if (s.length > 0) {
            let d = s[s.length - 1];
            for (c = 50; d.token in this.#t && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (this.#t[n].associative === "left" && this.#t[n].precedence <= this.#t[d.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            this.#t[n].associative === "right" && this.#t[n].precedence < this.#t[d.token].precedence); ) {
              if (c--, c === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (i.push(s.pop() ?? { token: "", tokenType: f.OPERATION }), s.length === 0)
                break;
              d = s[s.length - 1];
            }
          }
          s.push({ token: n, tokenType: h });
          break;
        case f.FUNCTION_ARGUMENT:
          for (c = 50; s[s.length - 1].token !== "(" && s.length > 0; ) {
            if (c--, c === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            i.push(s.pop() ?? { token: n, tokenType: h });
          }
          break;
        case f.LEFT_PARENTHESIS:
          s.push({ token: n, tokenType: h }), e[o] === "-" && i.push({ token: "0", tokenType: f.COEFFICIENT });
          break;
        case f.RIGHT_PARENTHESIS:
          for (c = 50; s[s.length - 1].token !== "(" && s.length > 1; ) {
            if (c--, c === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
              break;
            }
            i.push(s.pop() ?? { token: n, tokenType: h });
          }
          s.pop();
          break;
        case f.FUNCTION:
          s.push({ token: n, tokenType: h });
          break;
        default:
          throw new Error(`Token type ${n} is not handled`);
      }
    }
    return this.#e = i.concat(s.reverse()), this;
  }
}
class Ae {
  _rpn;
  _expression;
  _isValid;
  constructor(e, t) {
    this._expression = e;
    try {
      this._rpn = new X(z.NUMERIC).parse(e, t).rpn;
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
      if (i.tokenType === f.COEFFICIENT)
        if (!isNaN(+i.token))
          t.push(+i.token);
        else {
          const s = i.token.split("/");
          if (s.length !== 2)
            throw this._isValid = !1, new Error("This coefficient is not a fraction");
          t.push(+s[0] / +s[1]);
        }
      else if (i.tokenType === f.VARIABLE && e !== void 0)
        Object.hasOwn(e, i.token) && t.push(+e[i.token]);
      else if (i.tokenType === f.CONSTANT)
        t.push(J[i.token]);
      else if (i.tokenType === f.OPERATION) {
        if (i.token === "*") {
          const s = t.pop(), n = t.pop();
          if (n === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The multiplication factors ${n ?? "a"} or ${s ?? "b"} are not defined`);
          t.push(n * s);
        } else if (i.token === "/") {
          const s = t.pop(), n = t.pop();
          if (n === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The division values ${n ?? "a"} or ${s ?? "b"} are not defined`);
          t.push(n / s);
        } else if (i.token === "+") {
          const s = t.pop(), n = t.pop();
          if (n === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The addition values ${n ?? "a"} or ${s ?? "b"} are not defined`);
          t.push(+n + +s);
        } else if (i.token === "-") {
          const s = t.pop(), n = t.pop() ?? 0;
          if (s === void 0)
            throw this._isValid = !1, new Error("The subtraction value b is  not defined");
          t.push(n - s);
        } else if (i.token === "^") {
          const s = t.pop(), n = t.pop();
          if (n === void 0 || s === void 0)
            throw this._isValid = !1, new Error(`The base value ${n ?? "a"} or exponent ${s ?? "b"} are not defined`);
          t.push(Math.pow(n, s));
        }
      } else if (i.tokenType === f.FUNCTION) {
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
          const n = t.pop();
          if (n === void 0)
            throw this._isValid = !1, new Error("The nthrt function requires two parameters");
          s % 2 === 0 && n < 0 ? t.push(NaN) : t.push((n < 0 ? -1 : 1) * Math.pow(Math.abs(n), 1 / s));
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
class p {
  #i;
  #e;
  constructor(e) {
    return this.#i = new a().zero(), this.#e = {}, e !== void 0 && this.parse(e), this;
  }
  // -----------------------------------------
  /**
   * Parse a string to a monom. The string may include fraction.
   * @param inputStr
   */
  parse(e) {
    return this.#i = new a(), this.#e = {}, typeof e == "string" ? isNaN(Number(e)) ? this.#n(e) : this.#i = new a(Number(e)) : typeof e == "number" ? this.#i = new a(e) : e instanceof a ? this.#i = e.clone() : e instanceof p && (this.#i = e.#i.clone(), this.#t(e)), this;
  }
  /**
   * Clone the current Monom.
   */
  clone = () => {
    const e = new p();
    e.coefficient = this.#i.clone();
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
    return e === "" ? this.#i.value != 0 ? this.#i.frac.tex : "0" : this.#i.value === 1 ? e : this.#i.value === -1 ? `-${e}` : this.#i.value === 0 ? "0" : `${this.#i.frac.tex}${e}`;
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
    return e === "" ? this.#i.value != 0 ? this.#i.display : "" : this.#i.value === 1 ? e : this.#i.value === -1 ? `-${e}` : this.#i.value === 0 ? "0" : `${this.#i.display}${e}`;
  }
  static gcd = (...e) => {
    for (const n of e)
      if (n.containsRationalPower())
        return new p().zero();
    const t = new p(), i = E.gcd(...e.map((n) => n.coefficient.numerator)), s = E.lcm(...e.map((n) => n.coefficient.denominator));
    t.coefficient = new a(i, s).reduce();
    for (const n of e) {
      for (const o in t.literal)
        o in n.literal || t.literal[o].zero();
      for (const o in n.literal)
        !t.hasVariable(o) && n.literal[o].isStrictlyPositive() ? t.literal[o] = n.literal[o].clone() : t.literal[o] = new a(Math.min(n.literal[o].value, t.literal[o].value));
    }
    return t;
  };
  /**
   * Multiply two monoms and return a NEW monom.
   * @param monoms
   */
  static xMultiply = (...e) => {
    const t = new p().one();
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
      const i = t instanceof p ? t : new p(t);
      this.isSameAs(i) ? (this.isZero() && this.#t(i), this.#i.add(i.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", i.display);
    }
    return this;
  };
  /**
   * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
   * @returns {Fraction}
   */
  get coefficient() {
    return this.#i;
  }
  /**
   * Set the coefficient \\(k\\) value of the monom
   * @param {Fraction | number | string} F
   */
  set coefficient(e) {
    this.#i = new a(e);
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
  derivative = (e) => {
    if (e === void 0 && (e = "x"), this.hasVariable(e)) {
      const t = this.#e[e].clone(), i = this.clone();
      return i.#e[e].subtract(1), i.#i.multiply(new a(t.clone())), i;
    } else
      return new p().zero();
  };
  /**
   * Divide the current monoms by multiple monoms
   * @param M (Monom[])
   */
  divide = (...e) => {
    for (const t of e) {
      const i = t instanceof p ? t : new p(t);
      this.#i.divide(i.coefficient);
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
    const e = E.dividers(Math.abs(this.coefficient.numerator));
    let t = [];
    for (const s in this.literal)
      t = this._getLiteralDividers(t, s);
    const i = [];
    if (t.length > 0 && e.length > 0)
      for (const s of e)
        for (const n of t) {
          const o = new p();
          o.coefficient = new a(s), o.literal = n, i.push(o);
        }
    else if (e.length === 0)
      for (const s of t) {
        const n = new p();
        n.coefficient = new a().one(), n.literal = s, i.push(n);
      }
    else
      for (const s of e) {
        const n = new p();
        n.coefficient = new a(s), i.push(n);
      }
    return i.length === 0 ? [new p().one()] : i;
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
      if (e instanceof j)
        return new a().invalid();
      if (typeof e == "number")
        return this.#s(e);
      if (typeof e == "object") {
        const s = {};
        for (const n in e)
          s[n] = new a(e[n]).value;
        return this.#s(s);
      }
    }
    const i = this.coefficient.clone();
    if (typeof e == "number" || e instanceof a) {
      const s = {};
      return s[this.variables[0]] = new a(e), this.evaluate(s);
    }
    if (e instanceof j)
      return new a().invalid();
    if (typeof e == "object") {
      if (this.variables.length === 0)
        return this.coefficient;
      for (const s in this.#e) {
        const n = new a(e[s]);
        i.multiply(n.pow(this.#e[s]));
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
    this.#i.opposite();
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
  isEqual = (e) => this.isSameAs(e) && this.#i.isEqual(e.coefficient);
  isLiteralSquare = () => {
    for (const e in this.literal)
      if (this.literal[e].isRational() || this.literal[e].isEven())
        return !1;
    return !0;
  };
  /**
   * Determine if the monom is one
   */
  isOne = () => this.#i.value === 1 && this.variables.length === 0;
  /**
   * Determine if two monoms are similar
   * @param M
   */
  isSameAs = (e) => {
    const t = this.variables, i = e.variables, s = t.concat(i.filter((n) => !t.includes(n)));
    if (this.isZero() || e.isZero() || t.length === 0 && i.length === 0)
      return !0;
    if (t.length !== i.length)
      return !1;
    if (!this.isZero() && !e.isZero()) {
      for (const n of s)
        if (!this.hasVariable(n) || !e.hasVariable(n) || !this.#e[n].isEqual(e.literal[n]))
          return !1;
    }
    return !0;
  };
  isSquare = () => this.coefficient.isSquare() ? this.isLiteralSquare() : !1;
  /**
   * Determine if the monom is null
   */
  isZero = () => this.#i.value === 0;
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
      const i = t instanceof p ? t : new p(t);
      this.#i.multiply(i.coefficient);
      for (const s in i.literal)
        this.hasVariable(s) ? this.#e[s].add(i.literal[s]) : this.#e[s] = i.literal[s].clone();
    }
    return this;
  };
  /**
   * Create a one value monom
   */
  one = () => (this.#i = new a().one(), this.#e = {}, this);
  /**
   * Get the opposite
   * Returns a monom.
   */
  opposite = () => (this.#i.opposite(), this);
  get plotFunction() {
    let e = "";
    const t = Object.keys(this.#e).sort();
    for (const i of t)
      this.#e[i].isNotZero() && (e += (e === "" ? "" : "*") + i, this.#e[i].isNotEqual(1) && (e += `^(${this.#e[i].display})`));
    return e === "" ? this.#i.value != 0 ? this.#i.display : "" : this.#i.value === 1 ? e : this.#i.value === -1 ? `-${e}` : this.#i.value === 0 ? "0" : `${this.#i.display}*${e}`;
  }
  /**
   * Get the pow of a monom.
   * @param nb (number) : Mathematical pow
   */
  pow = (e) => {
    this.#i.pow(e);
    for (const t in this.#e)
      this.#e[t].multiply(e);
    return this;
  };
  primitive = (e) => {
    e === void 0 && (e = "x");
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
      this.#i.sqrt();
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
      const i = t instanceof p ? t : new p(t);
      this.isSameAs(i) ? (this.isZero() && this.#t(i), this.#i.add(i.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", i.display);
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
  zero = () => (this.#i = new a().zero(), this.#e = {}, this);
  #t(e) {
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
    if (e instanceof j)
      return NaN;
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
  #n = (e) => {
    const i = new X().parse(e).rpn, s = [];
    if (i.length === 0)
      return this.zero(), this;
    if (i.length === 1) {
      const n = i[0];
      return this.one(), n.tokenType === f.COEFFICIENT ? this.coefficient = new a(n.token) : n.tokenType === f.VARIABLE && this.setLetter(n.token, 1), this;
    } else
      for (const n of i)
        this.#r(s, n);
    return this.one(), this.multiply(s[0]), this;
  };
  #r = (e, t) => {
    let i, s, n, o, h;
    if (t.tokenType === f.COEFFICIENT)
      e.push(new p(new a(t.token)));
    else if (t.tokenType === f.VARIABLE) {
      const l = new p().one();
      l.setLetter(t.token, 1), e.push(l.clone());
    } else if (t.tokenType === f.OPERATION)
      switch (t.token) {
        case "-":
          s = e.pop() ?? new p().zero(), i = e.pop() ?? new p().zero(), e.push(i.subtract(s));
          break;
        case "*":
          s = e.pop() ?? new p().one(), i = e.pop() ?? new p().one(), e.push(i.multiply(s));
          break;
        case "/":
          s = e.pop() ?? new p().one(), i = e.pop() ?? new p().one(), e.push(i.divide(s));
          break;
        case "^": {
          h = e.pop()?.coefficient ?? new a().one(), n = e.pop() ?? new p().one(), o = n.variables[0], o && n.setLetter(o, h), e.push(n);
          break;
        }
      }
  };
  _getLiteralDividers(e, t) {
    const i = [];
    for (let s = 0; s <= this.literal[t].value; s++)
      if (e.length === 0) {
        const n = {};
        n[t] = new a(s), i.push(n);
      } else
        for (const n of e) {
          const o = {};
          for (const h in n)
            o[h] = n[h];
          o[t] = new a(s), i.push(o);
        }
    return i;
  }
}
function te(r, e = !0) {
  return e ? `\\left( ${r} \\right)` : `(${r})`;
}
function U(r, e, t, i, s) {
  return r.map((n, o) => n === e ? t : n);
}
function se(r, e) {
  if (!Number.isSafeInteger(e))
    throw new Error("Can only raise item by an integer");
  if (e < 0)
    throw new Error("Can only raise item by a positive integer");
  if (e === 0)
    return r.one();
  const t = r.clone();
  for (let i = 1; i < e; i++)
    r.multiply(t);
  return r;
}
class u {
  #i = "x";
  #e;
  #t;
  #s;
  #n = !1;
  constructor(e, ...t) {
    return this.#t = [], this.#e = [], this.#s = [], e !== void 0 && this.parse(e, ...t), this;
  }
  /**
   * Parse a string to a polynom.
   * @param inputStr
   * @param values
   */
  parse = (e, ...t) => {
    if (this.#t = [], this.#e = [], typeof e == "string")
      return this.#g(e, ...t);
    if ((typeof e == "number" || e instanceof a || e instanceof p) && t.length === 0)
      this.#t.push(new p(e));
    else if (e instanceof p && t.length > 0)
      this.#t.push(new p(e)), t.forEach((i) => {
        this.#t.push(new p(i));
      });
    else if (e instanceof u)
      for (const i of e.monoms)
        this.#t.push(i.clone());
    return this;
  };
  /**
   * Clone the polynom
   */
  clone = () => {
    const e = new u(), t = [];
    for (const i of this.#t)
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
      t instanceof u ? this.#t = this.#t.concat(t.monoms) : t instanceof p ? this.#t.push(t.clone()) : typeof t == "number" && Number.isSafeInteger(t) ? this.#t.push(new p(t.toString())) : this.#t.push(new p(t));
    return this.reduce();
  };
  commonMonom = () => {
    const e = new p().one(), t = this.gcdNumerator(), i = this.gcdDenominator(), s = this.degree();
    e.coefficient = new a(t, i);
    for (const n of this.variables) {
      e.setLetter(n, s);
      for (const o of this.#t)
        if (e.setLetter(n, a.min(o.degree(n), e.degree(n))), e.degree(n).isZero())
          break;
    }
    return e;
  };
  degree = (e) => {
    let t = new a().zero();
    for (const i of this.#t)
      t = a.max(i.degree(e).value, t);
    return t;
  };
  derivative = (e) => {
    const t = new u();
    for (const i of this.#t)
      t.add(i.derivative(e));
    return t.reduce();
  };
  divide = (e) => {
    if (e instanceof a)
      return this.#o(e);
    if (typeof e == "number" && Number.isSafeInteger(e))
      return this.#h(e);
    if (e instanceof p)
      return this.divide(new u(e));
    if (e instanceof u) {
      if (e.monoms.length === 1 && e.variables.length === 0)
        return this.#o(e.monoms[0].coefficient);
      {
        const { quotient: t, reminder: i } = this.euclidean(e);
        if (i.isZero())
          return this.#t = t.monoms, this;
      }
    } else if (typeof e == "string")
      return this.divide(new u(e));
    throw new Error(`Cannot divide by ${e}`);
  };
  empty = () => (this.#t = [], this);
  /**
   * Divide the current polynom by another polynom.
   * @param P
   * returns {quotient: Polynom, reminder: Polynom}
   */
  euclidean = (e) => {
    const t = e.variables[0], i = new u().zero(), s = this.clone().reorder(t);
    if (e.variables.length === 0)
      return {
        quotient: this.clone().divide(e).reduce(),
        reminder: new u().zero()
      };
    const n = e.monomByDegree(void 0, t), o = e.degree(t);
    let h, l = this.degree(t).value * 2;
    for (; s.degree(t).isGeq(o) && l > 0 && (l--, h = s.monomByDegree(void 0, t).clone().divide(n), !(!h.isZero() && (i.add(h), s.subtract(e.clone().multiply(h)).reduce(), h.degree(t).isZero()))); )
      ;
    return i.reduce(), s.reduce(), { quotient: i, reminder: s };
  };
  evaluate = (e, t) => {
    if (t)
      return this.#a(e);
    const i = new a().zero();
    return this.#t.forEach((s) => {
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
      const h = new u(s);
      t = [h.clone()], i = i.euclidean(h).quotient;
    }
    let n = i.degree().clone().multiply(2).value, o = 1;
    for (; n >= 0; )
      if (n--, i.monoms.length < 2) {
        i.isOne() || (t.push(i.clone()), i.one());
        break;
      } else if (i.degree(e).isOne()) {
        t.push(i.clone()), i.one();
        break;
      } else {
        let h = this.#u(i, o, e ?? "x");
        for (o = i.degree(e).value; h.length > 0; ) {
          const l = h[0];
          if (!i.isDividableBy(l))
            h.shift();
          else {
            const c = i.euclidean(l);
            t.push(l), i = c.quotient.clone(), h = h.filter((d) => {
              const m = i.monoms[0], w = i.monoms[i.monoms.length - 1], N = d.monoms[0], A = d.monoms[d.monoms.length - 1];
              return w.isDivisible(A) ? m.isDivisible(N) : !1;
            });
          }
        }
      }
    return i.isOne() || t.push(i.clone()), this.#e = t, this.#e;
  };
  fromCoefficients(...e) {
    this.#t = [];
    const t = this.#i ?? "x";
    return e.reverse().forEach((i, s) => {
      const n = new p();
      n.coefficient = new a(i), n.setLetter(t, s), this.#t.push(n);
    }), this.reorder();
  }
  gcdDenominator = () => E.gcd(...this.getDenominators());
  gcdNumerator = () => E.gcd(...this.getNumerators());
  getCoefficients() {
    const e = this.clone().reorder(), t = this.degree().value + 1, i = new Array(t).fill(new a(0));
    return e.monoms.forEach((s) => {
      const n = t - s.degree().value - 1;
      i[n] = s.coefficient.clone();
    }), i;
  }
  // Next functions are used for for commonMonom, which is used in the factorize method.
  getDenominators = () => {
    const e = [];
    for (const t of this.#t)
      e.push(t.coefficient.denominator);
    return e;
  };
  getNumerators = () => {
    const e = [];
    for (const t of this.#t)
      e.push(t.coefficient.numerator);
    return e;
  };
  getZeroes = () => this.degree().isZero() ? [] : (this.roots = new W(this.clone()).solve(), this.roots);
  hasVariable(e) {
    return this.variables.includes(e);
  }
  integrate = (e, t, i = "x") => {
    const s = this.primitive(i), n = {}, o = {};
    return n[i] = new a(e), o[i] = new a(t), s.evaluate(o).subtract(s.evaluate(n));
  };
  inverse() {
  }
  isDeveloped = (e) => {
    let t;
    const i = e.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
    if (i.includes("(") || i.includes(")"))
      return !1;
    try {
      t = new u(e);
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
  isEqual = (e) => this.#r(e, "=");
  get isMultiVariable() {
    return this.#t.some((e) => e.variables.length > 1);
  }
  isOne() {
    return this.#t.length === 1 && this.#t[0].coefficient.isOne() && this.degree().isZero();
  }
  isOppositeAt = (e) => this.#r(e.clone().opposite(), "=");
  isReduced = (e) => {
    if (!this.isDeveloped(e))
      return !1;
    const t = new u(e);
    if (t.monoms.length > this.monoms.length)
      return !1;
    for (const i of t.monoms)
      if (!i.coefficient.isReduced())
        return !1;
    return !1;
  };
  isSameAs = (e) => this.#r(e, "same");
  isZero() {
    return this.#t.length === 1 && this.#t[0].coefficient.isZero() || this.#t.length === 0;
  }
  lcmDenominator = () => E.lcm(...this.getDenominators());
  lcmNumerator = () => E.lcm(...this.getNumerators());
  get length() {
    return this.#t.length;
  }
  letters = () => {
    let e = /* @__PURE__ */ new Set();
    for (const t of this.#t)
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
    for (const s of i.#t)
      if (s.degree(t).isEqual(e))
        return s.clone();
    return new p().zero();
  };
  // Used in LinearSystem.tex
  monomByLetter = (e) => {
    const t = this.clone().reduce();
    for (const i of t.#t)
      if (i.hasVariable(e))
        return i.clone();
    return new p().zero();
  };
  // ------------------------------------------
  get monoms() {
    return this.#t;
  }
  set monoms(e) {
    this.#t = e;
  }
  monomsByDegree = (e, t) => {
    if (e === void 0)
      return this.monomsByDegree(this.degree(t));
    const i = [], s = this.clone().reduce();
    for (const n of s.#t)
      n.degree(t).isEqual(e) && i.push(n.clone());
    return i;
  };
  multiply = (e) => {
    if (e instanceof u)
      return this.#m(e);
    if (e instanceof a)
      return this.#f(e);
    if (e instanceof p)
      return this.#p(e);
    if (Number.isSafeInteger(e) && typeof e == "number")
      return this.#d(e);
    if (typeof e == "string")
      try {
        const t = new a(e);
        return this.#f(t);
      } catch {
        throw new Error("Cannot multiply by this value.");
      }
    throw new Error("Cannot multiply by this value.");
  };
  get numberOfVars() {
    return this.variables.length;
  }
  one = () => (this.#t = [], this.#t.push(new p().one()), this);
  // ------------------------------------------
  opposite = () => (this.#t = this.#t.map((e) => e.opposite()), this);
  get plotFunction() {
    return this.#l("tex", !1, !1, !0);
  }
  pow = (e) => se(this, e).reduce();
  primitive = (e) => {
    const t = new u();
    for (const i of this.#t)
      t.add(i.primitive(e));
    return t;
  };
  reduce = () => {
    let e = 0;
    for (; e < this.#t.length; ) {
      for (let t = e + 1; t < this.#t.length; t++)
        this.#t[e].isSameAs(this.#t[t]) && (this.#t[e].add(this.#t[t]), this.#t.splice(t, 1), this.#t[e].isZero() && (this.#t[e] = new p().zero()), t--);
      e++;
    }
    this.#t = this.#t.filter((t) => !t.coefficient.isZero());
    for (const t of this.#t)
      t.coefficient.reduce();
    return this.length === 0 ? new u().zero() : this.reorder();
  };
  reorder = (e = "x", t = !1) => {
    const i = this.variables.filter((s) => s !== e);
    return this.#t.sort(function(s, n) {
      const o = s.degree(e).value, h = n.degree(e).value;
      if (o !== h)
        return t ? o - h : h - o;
      if (i.length > 0)
        for (const l of i) {
          const c = s.degree(l).value, d = n.degree(l).value;
          if (c !== d)
            return t ? c - d : d - c;
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
    const s = new u().zero();
    for (const n of this.monoms)
      !n.hasVariable(e) || n.literal[e].isZero() ? s.add(n.clone()) : (i = n.literal[e].clone(), n.removeVariable(e), s.add(t.clone().pow(Math.abs(i.numerator)).multiply(n)));
    return this.#t = s.reduce().monoms, this;
  };
  // ------------------------------------------
  root() {
    throw new Error("Cannot take the root from a polynom");
  }
  get roots() {
    return this.#n ? this.#s : this.getZeroes();
  }
  set roots(e) {
    this.#n = !0, this.#s = e;
  }
  setVariable(e) {
    return this.#i = e, this;
  }
  sqrt() {
    throw new Error("Cannot take the square root from a polynom");
  }
  subtract = (...e) => {
    for (const t of e)
      t instanceof u ? this.add(t.clone().opposite()) : t instanceof p ? this.#t.push(t.clone().opposite()) : this.#t.push(new p(t).opposite());
    return this.reduce();
  };
  tableOfSigns() {
    const e = this.roots;
    let t = new Array(2 * e.length + 1).fill("").map((i, s) => s % 2 === 0 ? "" : "z");
    if (t.length === 1) {
      const [i] = this.getCoefficients().map((s) => s.value);
      t = U(t, "", i > 0 ? "+" : "-");
    } else if (this.degree().isOne()) {
      const [i] = this.getCoefficients().map((s) => s.value);
      t[0] = i > 0 ? "-" : "+", t[1] = "z", t[2] = i > 0 ? "+" : "-";
    } else
      [
        e[0].value - 1,
        ...e.map((s, n) => n === e.length - 1 ? e[n].value + 1 : (e[n].value + e[n + 1].value) / 2)
      ].forEach((s, n) => {
        const o = this.evaluate({ x: s }, !0);
        t[n * 2] = o > 0 ? "+" : "-";
      });
    return { roots: e, signs: t };
  }
  get value() {
    if (this.degree().isZero())
      return this.monoms[0]?.coefficient.value ?? 0;
  }
  get variables() {
    let e = [];
    for (const t of this.#t)
      e = e.concat(t.variables);
    return e = [...new Set(e)], e.sort(), e;
  }
  /**
   * Set the polynom to zero.
   * @returns {this}
   */
  zero = () => (this.#t = [], this.#t.push(new p().zero()), this);
  get zeroes() {
    return this.getZeroes();
  }
  #r = (e, t) => {
    t ??= "=";
    const i = this.clone().reduce().reorder(), s = e.clone().reduce().reorder();
    switch (t) {
      case "=":
        return i.length !== s.length || !i.degree().isEqual(s.degree()) ? !1 : i.monoms.every((n, o) => n.isEqual(s.monoms[o]));
      case "same":
        return i.length !== s.length || !i.degree().isEqual(s.degree()) ? !1 : i.monoms.every((n, o) => n.isSameAs(s.monoms[o]));
      default:
        return !1;
    }
  };
  #o = (e) => {
    for (const t of this.#t)
      t.coefficient.divide(e);
    return this;
  };
  #h = (e) => {
    const t = new a(e);
    for (const i of this.#t)
      i.coefficient.divide(t);
    return this;
  };
  #a = (e) => {
    let t = 0;
    return this.#t.forEach((i) => {
      t += i.evaluate(e, !0);
    }), t;
  };
  #c = (e) => {
    let t, i, s, n, o, h, l, c, d;
    if (this.numberOfVars === 1)
      return s = this.monomByDegree(2, e).coefficient, n = this.monomByDegree(1, e).coefficient, o = this.monomByDegree(0, e).coefficient, h = n.clone().pow(2).subtract(s.clone().multiply(o).multiply(4)), h.isZero() ? (l = n.clone().opposite().divide(s.clone().multiply(2)), t = new u(e).subtract(l.display).multiply(l.denominator), i = new u(e).subtract(l.display).multiply(l.denominator), d = s.divide(l.denominator).divide(l.denominator), d.isOne() ? [t, i] : [new u(d.display), t, i]) : h.isPositive() && h.isSquare() ? (l = n.clone().opposite().add(h.clone().sqrt()).divide(s.clone().multiply(2)), c = n.clone().opposite().subtract(h.clone().sqrt()).divide(s.clone().multiply(2)), d = s.divide(l.denominator).divide(c.denominator), d.isOne() ? [
        new u(e).subtract(l.display).multiply(l.denominator),
        new u(e).subtract(c.display).multiply(c.denominator)
      ] : [
        new u(d.display),
        new u(e).subtract(l.display).multiply(l.denominator),
        new u(e).subtract(c.display).multiply(c.denominator)
      ]) : [this.clone()];
    if (s = this.monomByDegree(2, e), n = this.monomByDegree(1, e), o = this.monomByDegree(0, e), s.isLiteralSquare() && o.isLiteralSquare() && n.clone().pow(2).isSameAs(s.clone().multiply(o))) {
      const w = new u("x", s.coefficient, n.coefficient, o.coefficient).#c("x"), N = [];
      let A;
      if (w.length >= 2) {
        for (const C of w)
          C.degree().isZero() ? N.push(C.clone()) : (A = C.clone(), A.monoms[0].literal = s.literalSqrt, A.monoms[1].literal = o.literalSqrt, N.push(A.clone()));
        return N;
      }
    }
    return [this.clone()];
  };
  #l = (e, t, i, s) => {
    let n = "";
    for (const o of this.#t) {
      if (o.coefficient.value === 0)
        continue;
      let h;
      s ? h = o.plotFunction : h = e === "tex" ? o.tex : o.display, n += `${o.coefficient.sign() === 1 && (n !== "" || t === !0) ? "+" : ""}${h}`;
    }
    return i === !0 && this.length > 1 && (e === "tex" ? n = `\\left( ${n} \\right)` : n = `(${n})`), n === "" && (n = "0"), n;
  };
  #u = (e, t, i) => {
    const s = e.monoms[0].dividers, n = e.monoms[e.monoms.length - 1].dividers, o = [];
    return s.forEach((h) => {
      h.degree(i).isLeq(t) && n.forEach((l) => {
        h.degree(i).isNotEqual(l.degree(i)) && (o.push(new u(h, l)), o.push(new u(h, l.clone().opposite())));
      });
    }), o;
  };
  #f = (e) => {
    for (const t of this.#t)
      t.coefficient.multiply(e);
    return this.reduce();
  };
  #d = (e) => this.#f(new a(e));
  #p = (e) => {
    for (const t of this.#t)
      t.multiply(e);
    return this.reduce();
  };
  #m = (e) => {
    const t = [];
    for (const i of this.#t)
      for (const s of e.monoms)
        t.push(p.xMultiply(i, s));
    return this.#t = t, this.reduce();
  };
  #g(e, ...t) {
    if (t.length === 0) {
      if (e !== "" && !isNaN(Number(e))) {
        this.empty();
        const i = new p(Number(e));
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
        let n = 0;
        for (const o of i) {
          const h = new p();
          h.coefficient = o.clone(), h.literalStr = s[n] || "", this.add(h), n++;
        }
      } else {
        let s = i.length - 1;
        for (const n of i) {
          const o = new p();
          o.coefficient = n.clone(), o.literalStr = `${e}^${s}`, this.add(o), s--;
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
    const i = new X().parse(e).rpn;
    this.zero();
    const s = [];
    for (const n of i)
      this.#y(s, n);
    return s.length === 1 && this.add(s[0]), this.reorder();
  };
  #y = (e, t) => {
    switch (t.tokenType) {
      case f.COEFFICIENT:
        e.push(new u(t.token));
        break;
      case f.VARIABLE:
        e.push(new u().add(new p(t.token)));
        break;
      case f.CONSTANT:
        console.log("Actually, not supported - will be added later !");
        break;
      case f.OPERATION:
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
              for (const n in s.monoms[0].literal)
                s.monoms[0].literal[n].multiply(i.monoms[0].coefficient);
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
      case f.MONOM:
        console.error("The monom token should not appear here");
        break;
      case f.FUNCTION:
        console.error("The function token should not appear here - might be introduced later.");
        break;
    }
  };
}
class y {
  // Left part of the equation
  #i;
  // Right part of the equation
  #e;
  // Signe of the equation
  #t;
  constructor(e, t, i) {
    if (this.#i = new u().zero(), this.#e = new u().zero(), this.#t = "=", e !== void 0 && t === void 0) {
      if (e instanceof y)
        return e.clone();
      typeof e == "string" && this.parse(e);
    } else e !== void 0 && t !== void 0 && (this.left = new u(e), this.right = new u(t));
    return i !== void 0 && (this.sign = i), this;
  }
  // ------------------------------------------
  parse = (e) => {
    const t = this.#s(e);
    if (t === !1)
      throw new Error("The equation is not valid (no sign found)");
    const i = e.split(t);
    return this.create(new u(i[0]), new u(i[1]), this.#n(t));
  };
  create = (e, t, i) => (this.#i = e, this.#e = t, this.#t = this.#n(i ?? "="), this);
  clone = () => new y(this.#i.clone(), this.#e.clone(), this.#t);
  /**
   * Add a value to the equation
   * if value is an equation, add the left part to the left part of the equation
   * and the right part to the right part of the equation
   * if value is a string, try to create an equation
   * if it fails, create a polynom and add it to the left and right part of the equation
   * @param value | Polynom | Monom | Fraction | string | monom
   */
  add(e) {
    if (e instanceof y)
      return this.#i.add(e.left), this.#e.add(e.right), this;
    if (typeof e == "string" && !y.isEquationString(e))
      return this.add(new y(e));
    const t = new u(e);
    return this.#i.add(t), this.#e.add(t), this;
  }
  /**
   * Get the degree of the equation
   * @param letter
   */
  degree = (e) => a.max(this.#i.degree(e), this.#e.degree(e));
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
    const i = this.#i.evaluate(e, t), s = this.#e.evaluate(e, t);
    return t ? i === s : i.isEqual(s);
  }
  /**
   * Determine if the equation contains a variable.
   * @param letter
   */
  hasVariable = (e) => this.variables.includes(e);
  isEqual(e) {
    const t = new y(e);
    return t.left.isEqual(this.#i) && t.right.isEqual(this.#e);
  }
  isLinearTo = (e) => {
    const t = e.clone().moveLeft().simplify().left, i = this.clone().moveLeft().simplify().left;
    return t.isEqual(i) || t.isOppositeAt(i);
  };
  /**
   * Determine if the equation contains more than one letter/variable.
   */
  isMultiVariable = () => this.#i.isMultiVariable || this.#e.isMultiVariable;
  // -----------------------------------------------
  // Equations helpers
  isEqualTo = (e) => {
    const t = e.clone().moveLeft().left, i = this.clone().moveLeft().left;
    return t.isEqual(i) || t.isOppositeAt(i);
  };
  /**
   * Reorder the polynom to have only one letter on the left, the rest on the right.
   * @param letter
   */
  isolate = (e) => {
    if (!this.degree(e).isOne() || this.isMultiVariable())
      return !1;
    let t;
    this.#i.subtract(this.#e), this.#e.zero();
    const i = [...this.#i.monoms];
    for (const n of i)
      n.hasVariable(e) || (t = n.clone(), this.#i.subtract(t), this.#e.subtract(t));
    if (this.#i.length !== 1)
      return !1;
    const s = this.#i.monoms[0].coefficient.clone();
    return this.#i.divide(s), this.#e.divide(s), this;
  };
  // -----------------------------------------------
  // Equations operations
  // -----------------------------------------------
  letters = () => [.../* @__PURE__ */ new Set([...this.#i.letters(), ...this.#e.letters()])];
  // -----------------------------------------------
  /**
   * Reorder will move all monoms containing a letter on the left, all the other on the right.
   */
  moveLeft = () => (this.#i.subtract(this.#e), this.#e.zero(), this);
  /**
   * Multiple an equation by a fraction value.
   * @param value
   */
  multiply = (e) => {
    const t = new a(e);
    return this.#i.multiply(t), this.#e.multiply(t), this.#t !== "=" && t.sign() === -1 && this.#r(), this;
  };
  pow(e) {
    return this.#i.pow(e), this.#e.pow(e), this;
  }
  opposite = () => (this.#i = this.#i.opposite(), this.#e = this.#e.opposite(), this);
  reduce() {
    return this.moveLeft(), this.#i.reduce(), this.simplify(), this.#i.monoms[0].coefficient.isNegative() && this.multiply(-1), this;
  }
  reorder = (e) => (this.#i.subtract(this.#e), this.#e.zero(), this.#i.reorder(), e ? this : (this.#i.monoms.filter((t) => t.degree().isZero()).forEach((t) => {
    const i = t.clone();
    this.#i.subtract(i), this.#e.subtract(i);
  }), this.#i.reorder(), this.#e.reorder(), this));
  // ------------------------------------------
  replaceBy = (e, t) => (this.#i.replaceBy(e, t), this.#e.replaceBy(e, t), this);
  /**
   * Multiply by the lcm denominator and divide by the gcm numerators.
   */
  simplify = () => (this.multiply(E.lcm(...this.#i.getDenominators(), ...this.#e.getDenominators())), this.divide(E.gcd(...this.#i.getNumerators(), ...this.#e.getNumerators())), this);
  // -----------------------------------------------
  solve = () => new W(this.clone()).solve();
  split() {
    return [this.#i.clone(), this.#e.clone()];
  }
  subtract(e) {
    if (e instanceof y)
      return this.#i.subtract(e.left), this.#e.subtract(e.right), this;
    if (typeof e == "string" && !y.isEquationString(e))
      return this.subtract(new y(e));
    const t = new u(e);
    return this.#i.subtract(t), this.#e.subtract(t), this;
  }
  test = (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e));
  static isEquationString(e) {
    return e.includes("=") || e.includes("<") || e.includes(">") || e.includes("<=") || e.includes(">=");
  }
  static makeSolutionsUnique(e, t) {
    const i = [], s = e.filter((n) => i.includes(n.tex) ? !1 : (i.push(n.tex), !0));
    return t === !0 && s.sort((n, o) => n.value - o.value), s;
  }
  get display() {
    return `${this.#i.display}${this.signAsTex}${this.#e.display}`;
  }
  // Getter and setter
  get left() {
    return this.#i;
  }
  set left(e) {
    this.#i = e;
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get right() {
    return this.#e;
  }
  set right(e) {
    this.#e = e;
  }
  // ------------------------------------------
  get sign() {
    return this.#t;
  }
  set sign(e) {
    this.#t = this.#n(e);
  }
  get signAsTex() {
    return this.#t === ">=" ? "\\geq" : this.#t === "<=" ? "\\leq" : this.#t;
  }
  get tex() {
    return `${this.#i.tex}${this.signAsTex}${this.#e.tex}`;
  }
  get variables() {
    return [...new Set(this.#e.variables.concat(this.#i.variables))];
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
  #n = (e) => e === void 0 ? "=" : e.includes("geq") || e.includes(">=") || e.includes("=>") ? ">=" : e.includes(">") ? ">" : e.includes("leq") || e.includes("<=") || e.includes("=<") ? "<=" : e.includes("<") ? "<" : "=";
  #r = () => this.#t === "=" ? this : this.#t.includes("<") ? (this.#t.replace("<", ">"), this) : this.#t.includes(">") ? (this.#t.replace(">", "<"), this) : this;
}
class x {
  #i;
  #e;
  #t;
  #s = !1;
  constructor(e, t) {
    return e instanceof x ? (this.#e = e.polynom.clone(), this.#t = e.power.clone(), t !== void 0 && this.#t.multiply(new a(t))) : e !== void 0 ? (this.#e = new u(e), this.#t = new a(t ?? 1)) : (this.#e = new u(), this.#t = new a(1)), this.#i = 1, this;
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  clone() {
    return new x(this);
  }
  fromPolynom(e) {
    return this.#e = new u(e), this.#t = new a(1), this;
  }
  get tex() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, s;
    return this.#i === 0 && t > 1 ? (i = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, s = e === 1 ? "" : `^{ ${e} }`) : (i = this.#s && this.power.isOne() ? this.polynom.tex : te(this.polynom.tex), s = t === 1 && e === 1 ? "" : `^{ ${this.power.tex} }`), i = `${i}${s}`, this.#i === 0 && e < 0 && (i = `\\frac{ 1 }{ ${i} }`), i;
  }
  get display() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, s;
    return this.#i === 0 && t > 1 ? (i = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, s = e === 1 ? "" : `^(${e})`) : (i = this.#s && this.power.isOne() ? this.polynom.display : te(this.polynom.display, !1), s = t === 1 && e === 1 ? "" : `^(${this.power.display})`), i = `${i}${s}`, this.#i === 0 && e < 0 && (i = `1/(${i})`), i;
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
    return this.power.isZero() ? [new x("0")] : this.power.isOne() ? [new x(this.polynom.clone().derivative())] : [
      new x(this.power.clone()),
      new x(this.polynom.clone().derivative()),
      new x(this.polynom.clone(), this.power.clone().subtract(1))
    ];
  }
  develop() {
    if (this.power.isNatural())
      return this.polynom.clone().pow(this.power.value);
    throw new Error("The power must be a natural number");
  }
  divide(e) {
    if (e instanceof x && this.isSameAs(e))
      return this.power.subtract(e.power), this;
    const t = new u(e);
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
    return e instanceof x ? t = e.polynom : e instanceof u ? t = e : t = new u(e), this.polynom.isEqual(t);
  }
  isZero() {
    return this.polynom.isZero();
  }
  multiply(e) {
    if (e instanceof x && this.isSameAs(e))
      return this.power.add(e.power), this;
    const t = new u(e);
    if (this.isSameAs(t))
      return this.power.add(1), this;
    throw new Error("The two factors must be the same");
  }
  one() {
    return this.#e.one(), this.#t.one(), this;
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
    return this.#t;
  }
  set power(e) {
    this.#t = new a(e);
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
    return e.isStrictlyNegative() && (t.signs = U(t.signs, "z", "d")), e.denominator % 2 === 0 ? t.signs = U(t.signs, "-", "h") : e.numerator % 2 === 0 && (t.signs = U(t.signs, "-", "+")), { roots: t.roots, signs: t.signs };
  }
  get variables() {
    return this.polynom.variables;
  }
  get withPower() {
    return this.#i = 1, this;
  }
  get withRoot() {
    return this.#i = 0, this;
  }
  zero() {
    return this.#e.zero(), this.#t.one(), this;
  }
}
var Z = /* @__PURE__ */ ((r) => (r[r.ROOT = 0] = "ROOT", r[r.POWER = 1] = "POWER", r))(Z || {});
class D {
  #i;
  // Determine the letters in the linear system, usually ['x', 'y']
  #e;
  constructor(...e) {
    return this.#i = [], this.#e = [], e.length > 0 && this.parse(...e), this;
  }
  parse = (...e) => (this.#i = e.map((t) => new y(t)), this.#t(), this);
  clone = () => new D().parse(...this.#i.map((e) => e.clone()));
  static fromMatrix(e, t = "xyz") {
    const i = e[0].length;
    if (e.some((n) => n.length !== i))
      throw new Error("All rows must have the same number of columns");
    const s = t.split("").splice(0, i - 1);
    return new D(
      ...e.map((n) => {
        const o = new u(s.join(""), ...n);
        return new y(o, 0);
      })
    );
  }
  add(e, t) {
    if (e instanceof D) {
      const i = e.equations.length;
      if (i !== this.#i.length)
        throw new Error("The number of equations must be the same");
      for (let s = 0; s < i; s++)
        this.#i[s].add(e.equations[s]);
    } else {
      if (t === void 0 || t < 0 || t >= this.#i.length)
        throw new Error("Index out of range");
      const i = new y(e);
      this.#i[t].add(i);
    }
    return this;
  }
  buildTex = (e, t) => {
    let i, s, n = [];
    const o = [];
    for (const l of e)
      n = n.concat(l.letters());
    n = [...new Set(n)], n.sort();
    for (let l = 0; l < e.length; l++) {
      const c = e[l];
      i = [];
      for (const d of n)
        s = c.left.monomByLetter(d), i.length === 0 ? i.push(s.isZero() ? "" : s.tex) : i.push(s.isZero() ? "" : (s.coefficient.sign() === 1 ? "+" : "") + s.tex);
      if (i.push("="), i.push(c.right.tex), t?.[l] !== void 0) {
        i[i.length - 1] = i[i.length - 1] + " \\phantom{\\quad}";
        for (const d of t[l])
          i.push(`\\ \\cdot\\ ${d.startsWith("-") ? "\\left(" + d + "\\right)" : d}`);
      }
      o.push(i.join("&"));
    }
    let h = 0;
    return t !== void 0 && t.length > 0 && (h = t[0].length), `\\left\\{\\begin{array}{${"r".repeat(n.length)}cl ${"|l".repeat(h)}}${o.join("\\\\ ")}\\end{array}\\right.`;
  };
  degree(e) {
    return a.max(...this.#i.map((t) => t.degree(e)));
  }
  get display() {
    return this.tex + "as display";
  }
  // ------------------------------------------
  get equations() {
    return this.#i;
  }
  set equations(e) {
    this.#i = e;
  }
  evaluate(e, t) {
    throw new Error("Method not implemented.");
  }
  hasVariable(e) {
    return this.#e.includes(e);
  }
  isEqual(e) {
    return this.equations.every((t, i) => t.isEqual(e.equations[i]));
  }
  get isSolvable() {
    return this.variables.length === this.#i.length;
  }
  get matrix() {
    return this.#s();
  }
  mergeEquations = (e, t, i, s) => {
    const n = e.clone().multiply(new a(i)), o = t.clone().multiply(new a(s));
    return n.left.add(o.left), n.right.add(o.right), n;
  };
  multiply(e, t) {
    if (Array.isArray(e)) {
      if (e.length !== this.#i.length)
        throw new Error("The number of values must be the same as the number of equations");
      for (let i = 0; i < e.length; i++)
        this.#i[i].multiply(e[i]);
      return this;
    }
    if (t === void 0 || t < 0 || t >= this.#i.length)
      throw new Error("Index out of range");
    return this.#i[t].multiply(e), this;
  }
  reduce() {
    throw new Error("Method not implemented.");
  }
  // ------------------------------------------
  reorder = () => {
    for (const e of this.#i)
      e.reorder();
    return this;
  };
  solve() {
    return [];
  }
  solveMatrix = () => {
    const [e, t] = this.matrix, i = e.map((s, n) => [...s, t[n]]);
    for (let s = 0; s < e.length; s++) {
      let n = i[s][s].clone();
      if (n.isZero()) {
        const o = i.find((h, l) => l > s && !h[s].isZero());
        if (o)
          i[s].forEach((h, l) => h.add(o[l])), n = i[s][s].clone();
        else
          throw new Error("Unsolvable...");
      }
      i[s] = i[s].map((o) => o.divide(n));
      for (let o = 0; o < e.length; o++) {
        if (o === s)
          continue;
        const h = i[o][s].clone().opposite();
        for (let l = 0; l < i[o].length; l++)
          i[o][l].add(i[s][l].clone().multiply(h));
        if (i[o].slice(0, i[o].length - 1).every((l) => l.isZero()))
          return i[o][i[o].length - 1].isZero() ? [new a().infinite()] : [];
      }
    }
    return i.map((s) => s[s.length - 1]);
  };
  subtract(e, t) {
    if (e instanceof D) {
      const i = e.equations.length;
      if (i !== this.#i.length)
        throw new Error("The number of equations must be the same");
      for (let s = 0; s < i; s++)
        this.#i[s].subtract(e.equations[s]);
    } else {
      if (t === void 0 || t < 0 || t >= this.#i.length)
        throw new Error("Index out of range");
      const i = new y(e);
      this.#i[t].subtract(i);
    }
    return this;
  }
  get tex() {
    const e = this.clone().reorder();
    return this.buildTex(e.equations);
  }
  get variables() {
    return this.#e;
  }
  set variables(e) {
    const t = typeof e == "string" ? e.split("") : [...e];
    t.sort(), this.#e = t;
  }
  #t = () => (this.#e = this.#i.reduce((e, t) => [.../* @__PURE__ */ new Set([...e, ...t.variables])], []), this.#e.sort(), this);
  #s = () => {
    const e = [], t = [];
    for (const i of this.#i) {
      const s = [], n = i.clone().reorder();
      for (const o of this.variables) {
        const h = n.left.monomByLetter(o);
        s.push(h.coefficient);
      }
      t.push(n.right.monoms[0].coefficient), e.push(s);
    }
    return [e, t];
  };
}
class qe {
  #i;
  /**
   *
   * @param {string} value (optional) Default polynom to parse on class creation
   */
  constructor(e) {
    return this.#i = [], e !== void 0 && this.parse(e), this;
  }
  parse = (e) => (this.#i = new X(z.SET).parse(e).rpn, this);
  evaluate(e) {
    this.variables.forEach((i) => {
      Object.hasOwn(e, i) || (e[i] = !1);
    });
    const t = [];
    for (const i of this.#i)
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
          const s = t.pop(), n = t.pop();
          if (s !== void 0 && n !== void 0)
            switch (i.token) {
              case "&":
                t.push(s && n);
                break;
              case "|":
                t.push(s || n);
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
    return this.#i;
  }
  get tex() {
    const e = [];
    for (const t of this.#i)
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
    return this.#i.filter((e) => e.tokenType === "variable").map((e) => e.token);
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
      for (const n in e)
        s = /* @__PURE__ */ new Set([
          ...s,
          ...e[n] ?? []
        ]);
    } else
      s = new Set(t);
    for (const n of this.#i)
      if (n.tokenType === "variable")
        e[n.token] === void 0 ? i.push(/* @__PURE__ */ new Set()) : i.push(new Set(e[n.token]));
      else
        switch (n.token) {
          case "&":
            if (i.length >= 2) {
              const o = i.pop(), h = i.pop();
              h && o && i.push(new Set([...h].filter((l) => o.has(l))));
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
              h && o && i.push(new Set([...h].filter((l) => !o.has(l))));
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
  #i = Z.POWER;
  #e = [];
  constructor(...e) {
    return this.parse(...e), this;
  }
  parse(...e) {
    return this.#e = [], e.length === 0 ? this : (e.forEach((t) => {
      t instanceof T ? this.#e.push(...t.factors.map((i) => i.clone())) : this.#e.push(new x(t));
    }), this);
  }
  clone() {
    return new T(...this.#e.map((e) => e.clone()));
  }
  get tex() {
    const { num: e, den: t } = this.#n();
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.tex : e.map((n) => n.tex).join("");
    const i = e.length === 1 ? e[0].asSingle.tex : e.map((n) => n.tex).join(""), s = t.length === 1 ? t[0].asSingle.tex : t.map((n) => n.tex).join("");
    return `\\frac{ ${i} }{ ${s} }`;
  }
  get display() {
    const { num: e, den: t } = this.#n();
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.display : e.map(
        (n, o) => o === 0 && n.polynom.monoms.length === 1 ? n.asSingle.display : n.display
      ).join("");
    const i = e.length === 1 ? e[0].asSingle.display : e.map((n) => n.display).join(""), s = t.length === 1 ? t[0].asSingle.display : t.map((n) => n.display).join("");
    return `(${i})/(${s})`;
  }
  static #t(e, t) {
    const i = L(e), s = L(t), o = Object.keys(i).filter((h) => Object.hasOwn(s, h)).map((h) => {
      const l = i[h].reduce((d, m) => d.add(m.power), new a("0")), c = s[h].reduce((d, m) => d.add(m.power), new a("0"));
      return new x(h, a.min(l, c));
    });
    return new T(...o);
  }
  static #s(e, t) {
    const i = L(e), s = L(t), o = [.../* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(s)])].map((h) => {
      const l = Object.hasOwn(i, h) ? i[h].reduce((d, m) => d.add(m.power), new a("0")) : new a(0), c = Object.hasOwn(s, h) ? s[h].reduce((d, m) => d.add(m.power), new a("0")) : new a(0);
      return new x(h, a.max(l, c));
    });
    return new T(...o);
  }
  static gcd(...e) {
    if (e.length === 0)
      return new T().one();
    if (e.length === 1)
      return e[0];
    if (e.length === 2)
      return T.#t(e[0], e[1]);
    let t = e[0];
    return e.shift(), e.forEach((i) => t = T.#t(t, i)), t;
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
      t.forEach((l, c) => {
        l.multiply(h.clone().divide(i[c]));
      }), s = h;
    }
    const n = T.gcd(...t), o = new u(0).add(
      ...t.map((h) => h.divide(n).reduce().develop().factors[0].polynom)
    ).reduce();
    return this.#e = [
      ...n.factors,
      new x(o)
    ], s && this.divide(s), this.#e = this.#e.filter((h) => !h.power.isZero()), this;
  }
  get asPower() {
    return this.#i = Z.POWER, this;
  }
  get asRoot() {
    return this.#i = Z.ROOT, this;
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
      const n = this.#e.slice(), o = n.splice(s, 1)[0].derivative();
      e.push(
        new T(...n, ...o)
      );
    }
    e.forEach((s) => s.reduce());
    const i = e.shift();
    return i !== void 0 && (this.#e = i.factors), this.add(...e);
  }
  develop() {
    const e = new u("1"), t = new u("1");
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
        const l = o.power.clone();
        t.push(...h.map((c) => new x(c, l)));
      } else
        t.push(o.clone());
    });
    const i = new T(...t), s = i.numerator.reduce(), n = i.denominator.reduce();
    return s.divide(n);
  }
  get factors() {
    return this.#e;
  }
  set factors(e) {
    this.#e = e;
  }
  fromPolynom(e, t) {
    if (this.#e = [new x(new u(e))], t) {
      const i = new u(t);
      if (i.isOne())
        return this;
      if (i.isZero())
        throw new Error("Cannot divide by zero");
      this.#e.push(new x(i, -1));
    }
    return this;
  }
  getZeroes() {
    const e = [].concat(...this.#e.map((t) => t.polynom.getZeroes()));
    return e.sort((t, i) => t.value - i.value), e.filter(
      (t, i, s) => i === s.findIndex(
        (n) => n.value === t.value
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
    return this.#e = [new x("1", "1")], this;
  }
  opposite() {
    const e = this.#e.findIndex((t) => t.display === "(-1)");
    return e >= 0 ? this.#e.splice(e, 1) : this.#e.push(new x("-1", "1")), this;
  }
  pow(e) {
    return this.#e = this.#e.map((t) => t.pow(e)), this;
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    const e = L(this);
    return this.#e = Object.values(e).map((t) => {
      const i = t[0].polynom, s = t.reduce((n, o) => n.add(o.power), new a("0"));
      return new x(i, s.reduce());
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
      const s = t.power.value, n = i.power.value;
      if (s * n < 0)
        return -s;
      const o = t.polynom.monoms.length, h = i.polynom.monoms.length;
      if (o !== h)
        return o - h;
      const l = t.polynom.degree(e).value, c = i.polynom.degree(e).value;
      return l !== c ? l - c : s !== n ? s - n : t.degree().isLeq(i.degree()) ? -1 : 1;
    }), this;
  }
  sqrt() {
    return this.#e = this.#e.map((e) => e.sqrt()), this;
  }
  subtract(...e) {
    return this.add(...e.map((t) => t.opposite()));
  }
  tableOfSigns() {
    const e = this.getZeroes(), t = e.map((n) => n.value), i = this.factorize().factors.map((n) => ({ factor: new x(n), ...n.tableOfSigns() }));
    return i.forEach((n) => {
      const o = new Array(2 * e.length + 1).fill("");
      let h = n.signs.shift(), l = n.roots.shift();
      const c = o.map((d, m) => {
        if (m % 2 === 0)
          return h;
        if (l === void 0 || l.value !== t[(m - 1) / 2])
          return "t";
        const w = n.signs.shift();
        return h = n.signs.shift(), l = n.roots.shift(), w;
      });
      n.roots = e, n.signs = c;
    }), { signs: i.map((n) => [...n.signs]).reduce((n, o) => n.length === 0 ? o : (o.forEach((h, l) => {
      switch (h) {
        case "d":
          n[l] = "d";
          break;
        case "z":
          n[l] = n[l] === "d" ? "d" : "z";
          break;
        case "h":
          n[l] = "h";
          break;
        case "-":
          n[l] = n[l] === "h" ? "h" : n[l] === "-" ? "+" : "-";
          break;
      }
    }), n), []), roots: e, factors: i };
  }
  get variables() {
    return this.#e.reduce((e, t) => e.concat(t.variables), []);
  }
  zero() {
    return this.#e = [new x("0", "1")], this;
  }
  #n() {
    let e, t = [];
    return this.#i === Z.ROOT ? (e = this.numerator.factors, t = this.denominator.factors) : e = this.#e, e.length === 0 && (e = [new x("1")]), { num: e, den: t };
  }
}
function L(r) {
  const e = new a().one(), t = new a().one(), i = r.factors.reduce((o, h) => {
    if (h.polynom.degree().isZero())
      return h.power.isPositive() ? e.multiply(h.polynom.monoms[0].coefficient) : t.multiply(h.polynom.monoms[0].coefficient), o;
    const l = h.polynom.display;
    return Object.hasOwn(o, l) ? o[l].push(h) : o[l] = [h], o;
  }, {}), { numerator: s, denominator: n } = e.divide(t).reduce();
  return s !== 1 && (i[s.toString()] = [new x(s, 1)]), n !== 1 && (i[n.toString()] = [new x(n, -1)]), i;
}
class I {
  #i = null;
  #e = !0;
  #t = [];
  constructor(e, t) {
    return e && (t = t ?? e, this.fromDimensions(e, t)), this;
  }
  parse(e) {
    return this.fromValues(e);
  }
  clone() {
    const e = [];
    return this.#t.forEach((t) => {
      const i = [];
      t.forEach((s) => {
        i.push(s.clone());
      }), e.push(i);
    }), new I().fromValues(e);
  }
  get tex() {
    if (this.#t.length === 0)
      return "";
    const e = this.#e ? "pmatrix" : "bmatrix", t = [
      `\\begin{${e}}`,
      ...this.rows.map(
        (i) => "	" + i.map((s) => this.#i !== null && s.value ? +s.value.toFixed(this.#i) : s.tex).join(" & ") + "\\\\"
      ),
      `\\end{${e}}`
    ].join(`
`);
    return this.#i = null, t;
  }
  get display() {
    if (this.#t.length === 0)
      return "";
    const e = this.#e ? ["(", ")"] : ["[", "]"], t = e[0] + this.map((i) => this.#i !== null && i.value ? +i.value.toFixed(this.#i) : i.display).map((i) => `(${i.join(",")})`).join(",") + e[1];
    return this.#i = null, t;
  }
  add(e) {
    if (!this.canBeAdded(e))
      throw new Error("Cannot add a matrix with different dimensions.");
    return this.forEach((t, i, s) => {
      t.add(e.values[i][s]);
    }), this;
  }
  aij(e, t) {
    return e < 0 || e > this.dimension.rows || t < 0 || t > this.dimension.cols ? null : this.#t[e][t];
  }
  get bmatrix() {
    return this.#e = !1, this;
  }
  canBeAdded(e) {
    const { rows: t, cols: i } = this.dimension, { rows: s, cols: n } = e.dimension;
    return t === s && i === n;
  }
  canBeInverted() {
    return !(!this.isSquare() || this.determinant().isZero());
  }
  canBeMultiplied(e) {
    return this.dimension.cols === e.dimension.rows;
  }
  characteristic_polynom(e) {
    return e ??= "k", this.clone().subtract(
      new I(this.dimension.rows).one().multiply(new u(e))
    ).determinant();
  }
  cofactor(e, t) {
    const i = this.clone();
    return i.values.splice(e, 1), i.values.forEach((s) => {
      s.splice(t, 1);
    }), i.determinant().multiply((-1) ** (e + t));
  }
  get cols() {
    const e = Array.from({ length: this.dimension.cols }, () => Array.from({ length: this.dimension.rows }, () => new u()));
    return this.forEach((t, i, s) => {
      e[s][i] = t;
    }), e;
  }
  determinant() {
    if (!this.isSquare())
      throw new Error("Matrix is not square");
    const e = new u();
    return this.#t.length === 1 ? this.#t[0][0].clone() : (this.values[0].forEach((t, i) => {
      const s = this.cofactor(0, i);
      e.add(t.clone().multiply(s));
    }), e);
  }
  get dimension() {
    return {
      rows: this.#t.length,
      cols: this.#t[0].length
    };
  }
  flat() {
    return this.#t.flat();
  }
  forEach(e) {
    this.#t.forEach((t, i) => {
      t.forEach((s, n) => {
        e(s, i, n);
      });
    });
  }
  fromDimensions(e, t) {
    return this.#t = Array.from({ length: e }, () => Array.from({ length: t }, () => new u())), this;
  }
  fromString(e) {
    if (e.startsWith("((") && e.endsWith("))"))
      return this.fromString(e.substring(1, e.length - 1));
    const t = e.split("),(");
    return this.#t = t.map((i, s) => s === 0 ? i.substring(1).split(",") : s === t.length - 1 ? i.substring(0, i.length - 1).split(",") : i.split(",")).map(
      (i) => i.map((s) => new u(s))
    ), this;
  }
  fromValues(e) {
    this.#t = [];
    const t = e[0].length;
    if (e.some((i) => i.length !== t))
      throw new Error("Each line must be the same length");
    return e.forEach((i) => {
      const s = [];
      i.forEach((n) => {
        s.push(new u(n));
      }), this.#t.push(s);
    }), this;
  }
  fromVectors(...e) {
    this.#t = [];
    const t = e[0].dimension;
    if (e.some((i) => i.dimension !== t))
      throw new Error("Each vectors must be the same dimension");
    return this.fromDimensions(e[0].dimension, e.length), e.forEach((i, s) => {
      i.array.forEach((n, o) => {
        this.#t[o][s] = new u(n);
      });
    }), this;
  }
  inverse() {
    if (!this.canBeInverted())
      throw new Error("The matrix cannot be inverted.");
    const e = new I().fromDimensions(this.dimension.rows, this.dimension.cols);
    e.forEach((i, s, n) => {
      e.setValue(s, n, this.cofactor(s, n));
    }), e.transpose();
    const t = this.determinant();
    return e.forEach((i, s, n) => this.setValue(s, n, i.divide(t).reduce())), this;
  }
  isEqual(e) {
    if (!this.canBeAdded(e))
      return !1;
    let t = !0;
    return this.forEach((i, s, n) => {
      t &&= i.isEqual(e.values[s][n]);
    }), t;
  }
  isOne() {
    for (let e = 0; e < this.#t.length; e++)
      for (let t = 0; t < this.#t[e].length; t++)
        if (t === e && !this.#t[e][t].isOne() || t !== e && !this.#t[e][t].isZero())
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
    return this.#t.forEach((n, o) => {
      n.forEach((h, l) => {
        s[o][l] = e(h, o, l);
      });
    }), s;
  }
  multiply(e) {
    if (e instanceof I) {
      if (!this.canBeMultiplied(e))
        throw new Error("Cannot multiply a matrix with incompatibles dimensions");
      const t = new I(this.dimension.rows, e.dimension.cols);
      return t.forEach((i, s, n) => {
        const o = this.rows[s], h = e.cols[n], l = new u();
        o.forEach((c, d) => {
          l.add(c.clone().multiply(h[d]));
        }), t.setValue(s, n, l);
      }), this.#t = t.values, this;
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
    return se(this, e);
  }
  reduce() {
    throw new Error("Not yet implemented");
  }
  get rows() {
    return this.#t;
  }
  setValue(e, t, i) {
    const { rows: s, cols: n } = this.dimension;
    if (e < 0 || e >= s || t < 0 || t >= n)
      throw new Error(`${e}x${t} is out of range (${s}x${n})`);
    return this.#t[e][t] = new u(i), this;
  }
  subtract(e) {
    if (!this.canBeAdded(e))
      throw new Error("Cannot subtract a matrix with different dimensions.");
    return this.forEach((t, i, s) => {
      t.subtract(e.values[i][s]);
    }), this;
  }
  toFixed(e) {
    return this.#i = e, this;
  }
  transpose() {
    return this.clone().forEach((t, i, s) => {
      this.setValue(s, i, t.clone());
    }), this;
  }
  get values() {
    return this.#t;
  }
  zero() {
    return this.forEach((e) => e.zero()), this;
  }
}
function Te(r, e) {
  return r.dimension === e.dimension && r.array.every(
    (t, i) => e.array[i].isEqual(t)
  );
}
function Oe(r, e) {
  if (r.dimension !== e.dimension)
    return !1;
  const t = e.array[0].value / r.array[0].value;
  return r.array.every(
    (i, s) => e.array[s].value === i.value * t
  );
}
function Ce(r, e) {
  return r.dimension !== e.dimension ? new a().invalid() : r.array.reduce(
    (t, i, s) => t.add(i.clone().multiply(e.array[s])),
    new a(0)
  );
}
function De(...r) {
  if (r.some((e) => e.dimension !== r[0].dimension))
    throw new Error("All vectors must have the same dimension");
  if (r[0].dimension !== r.length)
    throw new Error(`The determinant of dimension ${r[0].dimension} must have the same number of vectors (${r.length} given)`);
  return r[0].dimension === 2 ? r[0].array[0].clone().multiply(r[1].array[1]).subtract(r[0].array[1].clone().multiply(r[1].array[0])) : r[0].array[0].clone().multiply(
    r[1].array[1].clone().multiply(r[2].array[2]).subtract(r[1].array[2].clone().multiply(r[2].array[1]))
  ).subtract(
    r[0].array[1].clone().multiply(
      r[1].array[0].clone().multiply(r[2].array[2]).subtract(r[1].array[2].clone().multiply(r[2].array[0]))
    )
  ).add(r[0].array[2].clone().multiply(r[1].array[0].clone().multiply(r[2].array[1]).subtract(r[1].array[1].clone().multiply(r[2].array[0]))));
}
class g {
  #i = [];
  #e = !1;
  constructor(...e) {
    e.length > 0 && this.parse(...e);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get array() {
    return this.#i;
  }
  set array(e) {
    this.#i = e;
  }
  get x() {
    return this.#i[0];
  }
  set x(e) {
    this.#i[0] = new a(e);
  }
  get y() {
    return this.#i[1];
  }
  set y(e) {
    this.#i[1] = new a(e);
  }
  get z() {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    return this.#i[2];
  }
  set z(e) {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    this.#i[2] = new a(e);
  }
  get asPoint() {
    return this.#e;
  }
  set asPoint(e) {
    this.#e = e;
  }
  get normSquare() {
    return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new a(0));
  }
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get tex() {
    return this.#e ? `\\left(${this.array.map((e) => e.tex).join(";")}\\right)` : `\\begin{pmatrix} ${this.array.map((e) => e.tex).join(" \\\\ ")} \\end{pmatrix}`;
  }
  get display() {
    return this.#e ? `(${this.array.map((e) => e.display).join(";")})` : `((${this.array.map((e) => e.display).join(",")}))`;
  }
  setDimension(e = 2) {
    if (e < 2)
      throw new Error("Dimension must be at least 2");
    if (e < this.dimension)
      this.#i = this.#i.slice(0, e);
    else if (e > this.dimension)
      for (let t = this.dimension; t < e; t++)
        this.#i.push(new a(0));
    return this;
  }
  get dimension() {
    return this.array.length;
  }
  // ------------------------------------------
  // Creation / parsing functions
  // ------------------------------------------
  get isNull() {
    return this.array.every((e) => e.isZero());
  }
  static asTex(...e) {
    return `\\begin{pmatrix} ${e.join(" \\\\ ")} \\end{pmatrix}`;
  }
  static asDisplay(...e) {
    return `((${e.join(",")}))`;
  }
  defineAsPoint(e) {
    return this.#e = e !== !1, this;
  }
  parse(...e) {
    if (e.length === 0)
      throw new Error("Invalid value");
    if (e.length === 1) {
      if (e[0] instanceof g)
        return e[0].clone();
      if (typeof e[0] == "string")
        return this.fromString(e[0]);
      throw new Error("Invalid value");
    }
    if (e.length === 2) {
      const [t, i] = e;
      if (t instanceof g && i instanceof g) {
        if (t.dimension !== i.dimension)
          throw new Error("Vectors must have the same dimension");
        return this.#i = i.array.map((s, n) => s.clone().subtract(t.array[n])), this;
      }
    }
    return this.#i = e.map((t) => new a(t)), this;
  }
  clone() {
    const e = new g();
    return e.array = this.copy(), e.asPoint = this.asPoint, e;
  }
  copy() {
    return this.#i.map((e) => e.clone());
  }
  zero = () => (this.#i.forEach((e) => e.zero()), this);
  one = () => (this.zero(), this.x.one(), this);
  opposite = () => (this.#i.forEach((e) => e.opposite()), this);
  add = (e) => (this.#i.forEach((t, i) => t.add(e.array[i])), this);
  subtract = (e) => this.add(e.clone().opposite());
  unit = () => {
    const e = this.norm;
    return e === 0 ? this : this.divideByScalar(e);
  };
  middleOf(e, t) {
    if (e.dimension !== t.dimension)
      throw new Error("Vectors must be the same dimension");
    return this.array = [], e.array.forEach((i, s) => {
      this.array.push(i.clone().add(t.array[s]).divide(2));
    }), this;
  }
  translate(...e) {
    return this.array.forEach((t, i) => t.add(e[i])), this;
  }
  dot = (e) => Ce(this, e);
  cross(e) {
    if (this.dimension !== 3 || e.dimension !== 3)
      throw new Error("Cross product can only be determined in 3D");
    return new g(
      this.y.clone().multiply(e.z).subtract(this.z.clone().multiply(e.y)),
      this.z.clone().multiply(e.x).subtract(this.x.clone().multiply(e.z)),
      this.x.clone().multiply(e.y).subtract(this.y.clone().multiply(e.x))
    );
  }
  normal = () => {
    if (this.dimension >= 3)
      throw new Error("Normal vector can only be determined in 2D");
    const e = this.x.clone().opposite(), t = this.y.clone();
    return this.#i[0] = t, this.#i[1] = e, this;
  };
  isZero() {
    return this.array.every((e) => e.isZero());
  }
  isOne() {
    return this.array.every((e, t) => t === 0 ? e.isOne() : e.isZero());
  }
  isEqual = (e) => Te(this, e);
  isColinearTo = (e) => Oe(this, e);
  isNormalTo = (e) => this.dot(e).isZero();
  multiplyByScalar = (e) => {
    const t = new a(e);
    return this.array.forEach((i) => i.multiply(t)), this;
  };
  divideByScalar = (e) => this.multiplyByScalar(new a(e).inverse());
  simplify = () => this.multiplyByScalar(
    E.lcm(...this.array.map((e) => e.denominator))
  ).divideByScalar(
    E.gcd(...this.array.map((e) => e.numerator))
  ).multiplyByScalar(
    this.x.isNegative() ? -1 : 1
  );
  angle = (e, t, i) => {
    let s = this.dot(e).value;
    return t && (s = Math.abs(s)), (i ? 1 : 180 / Math.PI) * Math.acos(s / (this.norm * e.norm));
  };
  fromString = (e) => {
    e.startsWith("(") && (e = e.substring(1)), e.endsWith(")") && (e = e.substring(0, e.length - 1));
    const t = e.split(/[,;\s]/g).filter((i) => i.trim() !== "");
    return t.length < 2 ? this : (this.#i = t.map((i) => new a(i)), this);
  };
  distanceTo(e) {
    const t = new g(this, e);
    return {
      value: t.norm,
      fraction: t.normSquare,
      tex: t.tex
    };
  }
}
var B = /* @__PURE__ */ ((r) => (r.None = "none", r.Parallel = "parallel", r.Perpendicular = "perpendicular", r.Tangent = "tangent", r))(B || {}), Q = /* @__PURE__ */ ((r) => (r.None = "none", r.Parallel = "parallel", r.Perpendicular = "perpendicular", r.Tangent = "tangent", r))(Q || {});
function ne(r = 0.5) {
  return Math.random() < r;
}
function k(r, e, t) {
  if (e === void 0)
    return r >= 0 ? k(0, r) : k(r, 0);
  if (r === e)
    return r;
  if (t === void 0)
    return Math.floor(Math.random() * (e - r + 1) + r);
  if (Math.abs(e - r) <= t.length)
    throw new Error("The number of excluded values is too high.");
  let i = k(r, e);
  for (; t.includes(i); )
    i = k(r, e);
  return i;
}
function q(r, e) {
  return e === !1 ? ne() ? k(1, r) : -k(1, r) : k(-r, r);
}
function $e(r) {
  let e = E.primes();
  return r !== void 0 && (e = e.filter((t) => t < r)), _(e);
}
function ke(r, e) {
  return e === void 0 && (e = 1), r.length <= 0 ? Object.values(r) : re(r).slice(0, e);
}
function _(r) {
  return r.length === 0 ? null : r[k(0, r.length - 1)];
}
function re(r) {
  const e = Object.values(r);
  for (let t = e.length - 1; t > 0; t--) {
    const i = Math.floor(Math.random() * (t + 1)), s = e[t];
    e[t] = e[i], e[i] = s;
  }
  return e;
}
class v extends g {
  constructor(...e) {
    super(), e.length > 0 && this.parse(...e);
  }
  parse(...e) {
    if (this.asPoint = !0, e.length === 1) {
      if (e[0] instanceof g)
        return this.array = e[0].copy(), this;
      if (typeof e[0] == "string")
        return this.fromString(e[0]), this;
    }
    if (e.length > 1) {
      if (e.some((i) => i instanceof g))
        throw new Error("Creating a point with  multiple argument requires an input fraction");
      const t = e.map((i) => new a(i));
      if (t.some((i) => i.isNaN()))
        throw new Error("The value is not a valid point sting (a,b): " + e.join(","));
      this.array = t;
    }
    return this;
  }
  clone() {
    const e = new v();
    return e.array = this.copy(), e.asPoint = !0, e;
  }
}
class b {
  static PARALLEL = B.Parallel;
  // A line is defined as the canonical form
  static PERPENDICULAR = B.Perpendicular;
  #i;
  // ax + by + c = 0
  #e;
  #t;
  #s;
  #n;
  #r;
  #o = "canonical";
  #h;
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...e) {
    return this.#e = new a().zero(), this.#t = new a().zero(), this.#s = new a().zero(), this.#i = new g(), this.#n = new g(), this.#r = new g(), this.#h = !0, e.length > 0 && this.parse(...e), this;
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
      if (e[0] instanceof b)
        return this.fromCoefficient(e[0].a, e[0].b, e[0].c);
      if (e[0] instanceof y)
        return this.fromEquation(e[0]);
      if (typeof e[0] == "string")
        try {
          const t = new y(e[0]);
          return this.parse(t);
        } catch {
          return this;
        }
    }
    if (e.length === 2 && e.every((t) => t instanceof g)) {
      const t = e;
      if (t[0].asPoint && t[1].asPoint)
        return this.fromPointAndDirection(t[0], new g(t[0], t[1]));
      if (t[0].asPoint && !t[1].asPoint)
        return this.fromPointAndDirection(t[0], t[1]);
    }
    if (e.length === 3) {
      if (e[0] instanceof g && e[1] instanceof g) {
        if (e[2] === B.Perpendicular)
          return this.fromPointAndNormal(e[0], e[1]);
        if (e[2] === B.Parallel)
          return this.fromPointAndDirection(e[0], e[1]);
      }
      return e[0] instanceof g && e[1] instanceof b ? e[2] === B.Parallel || e[2] === null ? this.fromPointAndLine(e[0], e[1], B.Parallel) : this.fromPointAndLine(e[0], e[1], B.Perpendicular) : this.fromCoefficient(
        e[0],
        e[1],
        e[2]
      );
    }
    return console.log("Something wrong happened while creating the line"), console.log(e), this;
  };
  // ------------------------------------------
  // Getter and setter
  clone = () => (this.#e = this.#e.clone(), this.#t = this.#t.clone(), this.#s = this.#s.clone(), this.#n = this.#n.clone(), this.#i = this.#i.clone(), this.#r = this.#r.clone(), this);
  get tex() {
    const e = this.#o;
    switch (this.#o = "canonical", e) {
      case "equation":
        return this.getEquation().reorder().tex;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new u().parse("x", this.slope, this.height).tex;
      case "parametric":
      case "system": {
        const t = this.#n.clone();
        return this.#h && t.simplify(), e === "parametric" ? `${g.asTex("x", "y")} = ${g.asTex(this.#i.x.tex, this.#i.y.tex)} + k\\cdot ${g.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}
            x &= ${new u(this.#i.x).add(new p(this.#n.x).multiply(new p("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new u(this.#i.y).add(new p(this.#n.y).multiply(new p("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`;
      }
      default: {
        const t = this.getEquation();
        return this.#e.isNegative() && t.multiply(-1), t.tex;
      }
    }
  }
  get display() {
    const e = this.#o;
    switch (this.#o = "canonical", e) {
      case "equation":
        return this.getEquation().reorder().display;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new u().parse("x", this.slope, this.height).display;
      case "parametric": {
        const t = this.#n.clone();
        return this.#h && t.simplify(), `((x,y))=((${this.#i.x.display},${this.#i.y.display}))+k((${t.x.display},${t.y.display}))`;
      }
      default: {
        const t = this.getEquation();
        return this.#e.isNegative() && t.multiply(-1), t.display;
      }
    }
  }
  get OA() {
    return this.#i;
  }
  set OA(e) {
    this.#i = e;
  }
  get a() {
    return this.#e;
  }
  set a(e) {
    this.#e = e;
  }
  get b() {
    return this.#t;
  }
  set b(e) {
    this.#t = e;
  }
  get c() {
    return this.#s;
  }
  set c(e) {
    this.#s = e;
  }
  // get system(): { x: Equation, y: Equation } {
  //     const e1 = new Equation(
  //         new Polynom('x'),
  //         new Polynom(this.#OA.x)
  //             .add(new Monom('k').multiply(this.#d.x))
  //     ),
  //         e2 = new Equation(
  //             new Polynom('y'),
  //             new Polynom(this.#OA.y)
  //                 .add(new Monom('k').multiply(this.#d.y))
  //         )
  //     return { x: e1, y: e2 }
  // }
  get canonical() {
    return this.#o = "canonical", this;
  }
  // ------------------------------------------
  canonicalAsFloatCoefficient(e) {
    e === void 0 && (e = 2);
    let t = "";
    return this.#e.isZero() || (this.#e.isOne() ? t = "x" : this.#e.clone().opposite().isOne() ? t = "-x" : t = this.#e.value.toFixed(e) + "x"), this.#t.isZero() || (this.#t.isPositive() && (t += "+"), t += this.#t.value.toFixed(e) + "y"), this.#s.isZero() || (this.#s.isPositive() && (t += "+"), t += this.#s.value.toFixed(e)), t + "=0";
  }
  get d() {
    return this.#n;
  }
  set d(e) {
    this.#n = e;
  }
  get director() {
    return this.#n.clone();
  }
  distanceTo(e) {
    const t = e.x.clone().multiply(this.#e).add(e.y.clone().multiply(this.#t)).add(this.#s).abs(), i = this.normal.normSquare;
    if (i.isZero())
      return {
        value: NaN,
        tex: "Not a line",
        fraction: new a().infinite()
      };
    const s = t.value / Math.sqrt(i.value), n = t.clone().divide(i.clone().sqrt());
    return i.isSquare() ? {
      value: s,
      tex: n.tex,
      fraction: n
    } : {
      value: s,
      tex: `\\frac{${t.tex}}{\\sqrt{${i.tex}}}`,
      fraction: n
    };
  }
  get equation() {
    return this.#o = "equation", this;
  }
  fromCoefficient = (e, t, i) => (this.#e = new a(e), this.#t = new a(t), this.#s = new a(i), this.#n = new g(this.#t.clone(), this.#e.clone().opposite()), this.#i = new g(new a().zero(), this.#s.clone()), this.#r = this.#n.clone().normal(), this);
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
  fromPointAndDirection = (e, t) => (this.fromCoefficient(
    t.y,
    t.x.clone().opposite(),
    e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)).opposite()
  ), this.#i = e.clone(), this.#n = t.clone(), this.#r = this.#n.clone().normal(), this);
  fromPointAndLine = (e, t, i) => (i === void 0 && (i = B.Parallel), i === B.Parallel ? this.fromPointAndNormal(e, t.normal) : i === B.Perpendicular ? this.fromPointAndNormal(e, t.director) : this);
  fromPointAndNormal = (e, t) => this.fromCoefficient(
    t.x,
    t.y,
    e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()
  );
  fromPoints(e, t) {
    return this.fromPointAndDirection(e, new g(e, t));
  }
  // ------------------------------------------
  getEquation() {
    const e = new y(new u().parse("xy", this.#e, this.#t, this.#s), new u("0"));
    return this.#h ? e.simplify() : e;
  }
  getValueAtX = (e) => {
    const t = this.getEquation().isolate("y"), i = new a(e);
    return t instanceof y ? t.right.evaluate({ x: i }) : new a().invalid();
  };
  // ------------------------------------------
  // Creation / parsing functions
  getValueAtY = (e) => {
    const t = this.getEquation().isolate("x"), i = new a(e);
    return t instanceof y ? t.right.evaluate({ y: i }) : new a().invalid();
  };
  get height() {
    return this.#s.clone().opposite().divide(this.#t);
  }
  hitSegment(e, t) {
    const i = this.intersection(
      new b().fromPoints(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) : !1;
  }
  intersection = (e) => {
    const t = new v();
    let i = !1, s = !1;
    return this.#t.isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new a().invalid(), t.y = new a().invalid(), i = !0) : this.isSameAs(e) ? (t.x = new a().invalid(), t.y = new a().invalid(), s = !0) : (t.x = this.#t.clone().multiply(e.c).subtract(this.#s.clone().multiply(e.b)).divide(this.#e.clone().multiply(e.b).subtract(this.#t.clone().multiply(e.a))), t.y = this.#e.clone().multiply(e.c).subtract(this.#s.clone().multiply(e.a)).divide(this.#t.clone().multiply(e.a).subtract(this.#e.clone().multiply(e.b)))), {
      point: t,
      hasIntersection: !(i || s),
      isParallel: i,
      isSame: s
    };
  };
  // ------------------------------------------
  isOnLine = (e) => this.#e.clone().multiply(e.x).add(
    this.#t.clone().multiply(e.y)
  ).add(this.#s).isZero();
  isParallelTo = (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height);
  isPerpendicularTo = (e) => this.d.isNormalTo(e.d);
  isSameAs = (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height);
  // ------------------------------------------
  // Mathematical operations
  isVertical = () => this.slope.isInfinity();
  get mxh() {
    return this.#o = "mxh", this;
  }
  get n() {
    return this.#r;
  }
  get normal() {
    return new g(this.#e, this.#t);
  }
  get parametric() {
    return this.#o = "parametric", this;
  }
  randomNearPoint = (e) => {
    const t = this.randomPoint(e);
    let i = 10;
    for (; this.isOnLine(t) && i > 0; )
      t.x.add(q(1, !1)), t.y.add(q(1, !1)), i--;
    return t;
  };
  randomPoint = (e) => {
    const t = this.#n.clone().multiplyByScalar(q(e === void 0 || e <= 1 ? 3 : e, !1)).add(this.#i);
    return t.asPoint = !0, t;
  };
  get reduceBeforeDisplay() {
    return this.#h;
  }
  set reduceBeforeDisplay(e) {
    this.#h = e;
  }
  simplify = () => {
    const e = E.lcm(this.#e.denominator, this.#t.denominator, this.#s.denominator), t = E.gcd(this.#e.numerator, this.#t.numerator, this.#s.numerator);
    return this.fromCoefficient(
      this.#e.clone().multiply(e).divide(t),
      this.#t.clone().multiply(e).divide(t),
      this.#s.clone().multiply(e).divide(t)
    ), this;
  };
  simplifyDirection = () => (this.#n.simplify(), this);
  get slope() {
    return this.#e.clone().opposite().divide(this.#t);
  }
  // ------------------------------------------
  // Special functions
  get system() {
    return this.#o = "system", this;
  }
}
class V {
  #i = void 0;
  #e = void 0;
  #t = void 0;
  constructor(...e) {
    e.length > 0 && this.parse(...e);
  }
  get center() {
    return this.#i ?? new v();
  }
  get squareRadius() {
    return this.#e ?? new a(0);
  }
  get cartesian() {
    if (this.#t === void 0)
      throw new Error("Cartesian equation not defined");
    return this.#t;
  }
  get radius() {
    return this.#e === void 0 ? { tex: "", display: "", value: 0 } : this.#e.isSquare() ? {
      tex: this.#e.clone().sqrt().tex,
      display: this.#e.clone().sqrt().display,
      value: this.#e.clone().sqrt().value
    } : {
      tex: `\\sqrt{${this.#e.tex}}`,
      display: `sqrt(${this.#e.display})`,
      value: this.#e.clone().sqrt().value
    };
  }
  get tex() {
    let e, t;
    return this.center.x.isZero() ? e = "x^2" : e = `\\left(x${this.center.x.isNegative() ? "+" : "-"}${this.center.x.clone().abs().tex}\\right)^2`, this.center.y.isZero() ? t = "y^2" : t = `\\left(y${this.center.y.isNegative() ? "+" : "-"}${this.center.y.clone().abs().tex}\\right)^2`, `${e}+${t}=${this.squareRadius.tex}`;
  }
  get developed() {
    return this.cartesian.tex;
  }
  get display() {
    let e, t;
    return this.center.x.isZero() ? e = "x^2" : e = `(x${this.center.x.isNegative() ? "+" : "-"}${this.center.x.clone().abs().tex})^2`, this.center.y.isZero() ? t = "y^2" : t = `(y${this.center.y.isNegative() ? "+" : "-"}${this.center.y.clone().abs().tex})^2`, `${e}+${t}=${this.squareRadius.display}`;
  }
  /**
   * Get the relative position between circle and line. It corresponds to the number of intersection.
   * @param {Line} L
   * @returns {number}
   */
  relativePosition = (e) => {
    if (this.#i === void 0 || this.#e === void 0)
      throw new Error("Circle not defined");
    const t = e.distanceTo(this.#i), i = Math.sqrt(this.#e.value);
    return t.value - i > 1e-10 ? 0 : Math.abs(t.value - i) < 1e-10 ? 1 : 2;
  };
  lineIntersection = (e) => {
    const t = [];
    if (this.#t === void 0)
      return [];
    const i = this.#t.clone(), s = e.getEquation().clone().isolate("x"), n = e.getEquation().clone().isolate("y");
    return s instanceof y && n instanceof y && (i.replaceBy("y", n.right).simplify(), i.solve()), t;
  };
  tangents = (e) => e instanceof a ? this.#r(e) : this.isPointOnCircle(e) ? this.#s(e) : this.#i !== void 0 && this.#i.distanceTo(e).value > this.radius.value ? this.#n(e) : (console.log("No tangents as the point is inside !"), []);
  isPointOnCircle = (e) => this.#t?.test({ x: e.x, y: e.y }) ?? !1;
  getPointsOnCircle = (e) => {
    const t = E.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), i = [];
    return t.forEach((s) => {
      for (const n of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
        i.push(
          new v(
            this.center.x.clone().add(n[0] * s[0]),
            this.center.y.clone().add(n[1] * s[1])
          )
        );
    }), i;
  };
  clone() {
    return new V(
      this.center.clone(),
      this.squareRadius.clone(),
      !0
    );
  }
  setRadius(e, t) {
    return t ? this.#e = new a(e) : this.#e = new a(e).pow(2), this.#h(), this;
  }
  #s = (e) => {
    const t = new g(this.center, e);
    return [new b(e, t, B.Perpendicular)];
  };
  #n = (e) => {
    const t = this.center.x.clone().subtract(e.x), i = this.center.y.clone().subtract(e.y), s = new u("x"), n = new u("x^2+1");
    return s.multiply(t).subtract(i).pow(2), n.multiply(this.squareRadius), new y(s, n).solve().map((l) => {
      let c;
      const d = new y("y", "x");
      return l.exact instanceof a ? (c = e.x.clone().opposite().multiply(l.exact).add(e.y), d.right.multiply(l.exact).add(c)) : (c = e.x.clone().opposite().multiply(l.value).add(e.y), d.right.multiply(l.value).add(c)), new b(d);
    });
  };
  #r = (e) => {
    const t = e.numerator, i = -e.denominator, s = this.center.x.clone(), n = this.center.y.clone(), o = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), h = s.clone().multiply(t).opposite().subtract(n.clone().multiply(i)).add(o.clone().sqrt()), l = s.clone().multiply(t).opposite().subtract(n.clone().multiply(i)).subtract(o.clone().sqrt());
    return [new b(t, i, h), new b(t, i, l)];
  };
  #o() {
    return this.#i = void 0, this.#e = void 0, this.#t = void 0, this;
  }
  parse(...e) {
    return this.#o(), typeof e[0] == "string" ? this.#u(new y(e[0])) : e[0] instanceof y ? this.#u(e[0]) : e[0] instanceof V ? this.#a(e[0]) : e[0] instanceof v && e.length > 1 && (e[1] instanceof v ? e[2] instanceof v || this.#l(e[0], e[1]) : (e[1] instanceof a || typeof e[1] == "number") && this.#c(e[0], e[1], typeof e[2] == "boolean" ? e[2] : !1)), this.#h(), this;
  }
  #h() {
    this.#t = new y(
      new u(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
      new u(this.squareRadius.display)
    ).moveLeft();
  }
  #a(e) {
    return this.#i = e.center.clone(), this.#e = e.squareRadius.clone(), this.#h(), this;
  }
  #c(e, t, i) {
    return this.#i = e.clone(), i ? this.#e = new a(t) : this.#e = new a(t).pow(2), this;
  }
  #l(e, t) {
    return this.#i = e.clone(), this.#e = new g(this.#i, t).normSquare, this;
  }
  #u(e) {
    if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
      const t = e.left.monomByDegree(2, "x"), i = e.left.monomByDegree(2, "y");
      let s, n, o;
      t.coefficient.isEqual(i.coefficient) ? (e.divide(t.coefficient), s = e.left.monomByDegree(1, "x"), n = e.left.monomByDegree(1, "y"), o = e.left.monomByDegree(0), this.#i = new v(s.coefficient.clone().divide(2).opposite(), n.coefficient.clone().divide(2).opposite()), this.#e = o.coefficient.clone().opposite().add(this.#i.x.clone().pow(2)).add(this.#i.y.clone().pow(2))) : (this.#i = void 0, this.#e = void 0);
    }
    return this;
  }
  // private _parseThroughtThreePoints(A: Point, B: Point, C: Point): this {
  //     const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(),
  //         mAC = T.remarquables.mediators.AC.clone()
  //     this.parse(mAB.intersection(mAC).point, A)
  //     return this
  // }
}
class Y {
  // A line is defined as the canonical form
  static PERPENDICULAR = Q.Perpendicular;
  static PARALLEL = Q.Parallel;
  // ax + by + c = 0
  #i = new v();
  #e = new g();
  constructor(e, t) {
    return this.#i = e.clone(), this.#e = t.asPoint ? new g(e, t) : t.clone(), this;
  }
  get OA() {
    return this.#i;
  }
  set OA(e) {
    this.#i = e;
  }
  get point() {
    return this.#i.clone();
  }
  get d() {
    return this.#e;
  }
  set d(e) {
    this.#e = e;
  }
  get tex() {
    return {
      parametric: `${g.asTex("x", "y", "z")} = ${g.asTex(this.#i.x.tex, this.#i.y.tex, this.#i.z.tex)} + k\\cdot ${g.asTex(this.#e.x.tex, this.#e.y.tex, this.#e.z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new u(this.#i.x).add(new p(this.#e.x).multiply(new p("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new u(this.#i.y).add(new p(this.#e.y).multiply(new p("k"))).reorder("k", !0).tex}\\\\
    z &= ${new u(this.#i.z).add(new p(this.#e.z).multiply(new p("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
      cartesian: `\\frac{ ${new u("x", 1, this.#i.x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new u("y", 1, this.#i.y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new u("z", 1, this.#i.z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
    };
  }
  get display() {
    const e = this.#i.x.display, t = this.#i.y.display, i = this.#i.z.display, s = this.direction.simplify(), n = s.x.display, o = s.y.display, h = s.z.display;
    return {
      parametric: `${g.asDisplay("x", "y", "z")} = ${g.asDisplay(this.#i.x.display, this.#i.y.display, this.#i.z.display)} + k\\cdot ${g.asDisplay(this.#e.x.display, this.#e.y.display, this.#e.z.display)}`,
      system: "",
      cartesian: `(x-${e})/${n} = (y-${t})/${o} = (z-${i})/${h}`
    };
  }
  get direction() {
    return this.#e.clone();
  }
  clone = () => (this.#e = this.#e.clone(), this.#i = this.#i.clone(), this);
  // ------------------------------------------
  // Mathematical operations
  // ------------------------------------------
  isOnLine = (e) => !1;
  isParallelTo = (e) => {
    throw new Error("Method not implemented.");
  };
  isSameAs = (e) => {
    throw new Error("Method not implemented.");
  };
  isPerpendicularTo = (e) => {
    throw new Error("Method not implemented.");
  };
  isVertical = () => {
    throw new Error("Method not implemented.");
  };
  simplify = () => {
    throw new Error("Method not implemented.");
  };
  intersection = (e) => {
    throw new Error("Method not implemented.");
  };
  distanceTo(e) {
    const t = new g(this.#i, e), i = this.direction, s = this.direction.normSquare, n = t.cross(i).normSquare, o = n.clone().divide(s), h = o.clone().sqrt();
    return console.log("CROSS", t.cross(i).display), {
      value: Math.sqrt(o.value),
      fraction: o.clone().sqrt(),
      tex: h.isExact() ? h.tex : `\\sqrt{${o.tex}}`
    };
  }
  hitSegment(e, t) {
    const i = this.intersection(
      new Y(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) && i.point.z.value >= Math.min(e.z.value, t.z.value) && i.point.z.value <= Math.max(e.z.value, t.z.value) : !1;
  }
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
  randomPoint = (e = 5) => {
    const t = this.#i.clone(), i = new a(q(e, !1));
    return new v(
      t.x.clone().add(this.#e.x.clone().multiply(i)),
      t.y.clone().add(this.#e.y.clone().multiply(i)),
      t.z.clone().add(this.#e.z.clone().multiply(i))
    );
  };
}
class ee {
  #i = new g(0, 0, 1);
  #e = new v(0, 0, 0);
  constructor(e) {
    return e && this.parse(e), this;
  }
  get normal() {
    return this.#i;
  }
  set normal(e) {
    this.#i = e, this.#i.asPoint = !1;
  }
  get point() {
    return this.#e;
  }
  set point(e) {
    this.#e = e, this.#e.asPoint = !0;
  }
  get a() {
    return this.#i.x;
  }
  get b() {
    return this.#i.y;
  }
  get c() {
    return this.#i.z;
  }
  get d() {
    return this.#i.dot(this.#e).opposite();
  }
  get tex() {
    return new y(
      new u("xyz", this.a, this.b, this.c, this.d),
      new u(0)
    ).reduce().tex;
  }
  get display() {
    return new y(
      new u("xyz", this.a, this.b, this.c, this.d),
      new u(0)
    ).reduce().display;
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
      const t = e.equation.moveLeft().reduce().left, i = t.monomByLetter("x").coefficient, s = t.monomByLetter("y").coefficient, n = t.monomByLetter("z").coefficient, o = t.monomByDegree(0).coefficient;
      this.normal = new g(i, s, n), i.isNotZero() ? this.point = new v(o.clone().divide(i).opposite(), 0, 0) : s.isNotZero() ? this.point = new v(0, o.clone().divide(s).opposite(), 0) : this.point = new v(0, 0, o.clone().divide(n).opposite());
      return;
    }
    if (e.points?.length === 3 && e.points.every((t) => t instanceof g)) {
      const t = e.points[0], i = e.points[1], s = e.points[2], n = new g(t, i), o = new g(t, s);
      this.normal = n.cross(o), this.point = t;
      return;
    }
    if (e.coefficients?.length === 4) {
      const [t, i, s, n] = e.coefficients;
      this.normal = new g(t, i, s), this.point = new v(0, 0, -n);
      return;
    }
  }
  angle(e, t, i) {
    if (e instanceof ee)
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
  distanceTo(e) {
    return this.normal.dot(e).add(this.d).abs().value / this.normal.norm;
  }
  intersectWithLine(e) {
    const { point: t, direction: i } = e, s = this.normal.dot(t).add(this.d).divide(this.normal.dot(i).opposite());
    return t.clone().add(i.clone().multiplyByScalar(s));
  }
  intersectWithPlane(e) {
    throw this.normal.cross(e.normal), new v(0, 0, 0), new Error("Intersection with plane  not yet implemented !");
  }
  isPointOnPlane(e) {
    return this.normal.dot(e).add(this.d).isZero();
  }
}
class F {
  #i = new v();
  #e = new v();
  #t = new v();
  #s = {
    AB: new b(),
    AC: new b(),
    BC: new b()
  };
  #n = {
    AB: new v(),
    AC: new v(),
    BC: new v()
  };
  #r = null;
  constructor(...e) {
    return e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setters
  // ------------------------------------------
  get A() {
    return this.#i;
  }
  get B() {
    return this.#e;
  }
  get C() {
    return this.#t;
  }
  get AB() {
    return this.#a("A", "B");
  }
  get BA() {
    return this.#a("B", "A");
  }
  get BC() {
    return this.#a("B", "C");
  }
  get CB() {
    return this.#a("C", "B");
  }
  get AC() {
    return this.#a("A", "C");
  }
  get CA() {
    return this.#a("C", "A");
  }
  get isRectangle() {
    return !!(this.AB.isNormalTo(this.BC) || this.AB.isNormalTo(this.AC) || this.BC.isNormalTo(this.AC));
  }
  get isEquilateral() {
    return this.AB.normSquare.isEqual(this.BC.normSquare) && this.AB.normSquare.isEqual(this.AC.normSquare);
  }
  get isIsocele() {
    return this.AB.normSquare.isEqual(this.BC.normSquare) || this.AB.normSquare.isEqual(this.AC.normSquare) || this.BC.normSquare.isEqual(this.AC.normSquare);
  }
  get lines() {
    return this.#s;
  }
  get remarquables() {
    return this.#r;
  }
  // ------------------------------------------
  // Creation / parsing functions
  // ------------------------------------------
  /**
   * Parse values to a triangle. Supported formats:
   * Vector2D, Vector2D, Vector2D
   * x1, y1, x2, y2, x3, y3
   * @param values
   */
  parse = (...e) => {
    if (e.length === 6) {
      const t = e.map((i) => new a(i));
      if (t.some((i) => i.isNaN()))
        throw new Error("One of the values is not a valid number");
      return this.parse(
        new g(t[0], t[1]),
        new g(t[2], t[3]),
        new g(t[4], t[5])
      );
    } else if (e.length === 3) {
      if (e.every((t) => typeof t == "string"))
        return this.parse(
          ...e.map((t) => new b(t))
        );
      if (e.every((t) => t instanceof b)) {
        const t = e[0].clone(), i = e[1].clone(), s = e[2].clone();
        this.#s = { AB: t, BC: i, AC: s };
        let n = t.intersection(i);
        if (n.hasIntersection)
          this.#e = n.point.clone();
        else
          throw new Error("Lines do not intersect !");
        if (n = i.intersection(s), n.hasIntersection)
          this.#t = n.point.clone();
        else
          throw new Error("Lines do not intersect !");
        if (n = s.intersection(t), n.hasIntersection)
          this.#i = n.point.clone();
        else
          throw new Error("Lines do not intersect !");
      } else e.every((t) => t instanceof v) && (this.#i = e[0].clone(), this.#e = e[1].clone(), this.#t = e[2].clone(), this.#s = {
        AB: new b(this.#i, this.#e),
        BC: new b(this.#e, this.#t),
        AC: new b(this.#i, this.#t)
      });
    } else if (e.length === 1 && e[0] instanceof F)
      return e[0].clone();
    return this.#o(), this;
  };
  /**
   * Clone the Triangle class
   */
  clone = () => new F(
    this.#i.clone(),
    this.#e.clone(),
    this.#t.clone()
  );
  // ------------------------------------------
  // Triangle operations and properties
  // ------------------------------------------
  /**
   * Generate the Line object for the three segments of the triangle
   */
  #o = () => {
    this.#i.asPoint = !0, this.#e.asPoint = !0, this.#t.asPoint = !0, this.#n = {
      AB: new v().middleOf(this.#i, this.#e),
      AC: new v().middleOf(this.#i, this.#t),
      BC: new v().middleOf(this.#e, this.#t)
    }, this.#r = this.#c();
  };
  /**
   * Get the Vector2D class for the given name
   * @param ptName
   */
  #h = (e) => {
    switch (e.toUpperCase()) {
      case "A":
        return this.#i;
      case "B":
        return this.#e;
      case "C":
        return this.#t;
    }
    return this.#i;
  };
  /**
   * Get the vector for the segment given by name.
   * @param ptName1
   * @param ptName2
   */
  #a = (e, t) => new g(
    this.#h(e),
    this.#h(t)
  );
  #c = () => {
    const e = {
      A: new b().fromPoints(this.#i, this.#n.BC),
      B: new b().fromPoints(this.#e, this.#n.AC),
      C: new b().fromPoints(this.#t, this.#n.AB),
      intersection: null
    }, t = {
      AB: new b().fromPointAndNormal(this.#n.AB, new g(this.#i, this.#e).normal()),
      AC: new b().fromPointAndNormal(this.#n.AC, new g(this.#i, this.#t).normal()),
      BC: new b().fromPointAndNormal(this.#n.BC, new g(this.#e, this.#t).normal()),
      intersection: null
    }, i = {
      A: new b().fromPointAndNormal(this.#i, new g(this.#e, this.#t).normal()),
      B: new b().fromPointAndNormal(this.#e, new g(this.#i, this.#t).normal()),
      C: new b().fromPointAndNormal(this.#t, new g(this.#i, this.#e).normal()),
      intersection: null
    }, s = this.#l("A"), n = this.#l("B"), o = this.#l("C"), h = {
      A: s.internal,
      B: n.internal,
      C: n.internal,
      intersection: null
    }, l = {
      A: s.external,
      B: n.external,
      C: o.external,
      intersection: null
    }, c = {
      medians: e,
      mediators: t,
      heights: i,
      bisectors: h,
      externalBisectors: l
    };
    return c.medians.intersection = c.medians.A.intersection(c.medians.B).point, c.mediators.intersection = c.mediators.AB.intersection(c.mediators.BC).point, c.heights.intersection = c.heights.A.intersection(c.heights.B).point, c.bisectors.intersection = c.bisectors.A.intersection(c.bisectors.B).point, c;
  };
  #l = (e) => {
    const t = this.lines;
    let i, s;
    if (e === "A" ? (i = t.AB, s = t.AC) : e === "B" ? (i = t.AB, s = t.BC) : e === "C" && (i = t.BC, s = t.AC), i === void 0 || s === void 0)
      throw new Error(`The point ${e} does not exist`);
    const n = i.n.simplify().norm, o = s.n.simplify().norm, h = i.getEquation().multiply(o), l = s.getEquation().multiply(n), c = new b(h.clone().subtract(l).simplify()), d = new b(l.clone().subtract(h).simplify());
    return e === "A" ? c.hitSegment(this.B, this.C) ? { internal: c, external: d } : { internal: d, external: c } : e === "B" ? c.hitSegment(this.A, this.C) ? { internal: c, external: d } : { internal: d, external: c } : e === "C" ? c.hitSegment(this.B, this.A) ? { internal: c, external: d } : { internal: d, external: c } : { internal: c, external: d };
  };
}
var oe = /* @__PURE__ */ ((r) => (r[r.INTERIOR = 0] = "INTERIOR", r[r.EXTERIOR = 1] = "EXTERIOR", r[r.SECANT = 2] = "SECANT", r[r.TANGENT_INSIDE = 3] = "TANGENT_INSIDE", r[r.TANGENT_OUTSIDE = 4] = "TANGENT_OUTSIDE", r[r.SUPERPOSED = 5] = "SUPERPOSED", r[r.CONCENTRIC = 6] = "CONCENTRIC", r))(oe || {});
class Be {
  #i = void 0;
  #e = void 0;
  #t = void 0;
  #s = 1;
  constructor(e, t) {
    return e && t && (this.#i = e, this.#e = new a(t).clone().pow(2), this.#r()), this;
  }
  fromEquation(e) {
    const t = new y(e).moveLeft().reduce(), i = ["x", "y", "z"];
    if (i.some((n) => t.degree(n).value !== 2))
      return this.makeUndefined();
    const s = t.left.monomByDegree(2, "x").coefficient;
    return i.some((n) => t.left.monomByDegree(2, n).coefficient.isNotEqual(s)) ? this.makeUndefined() : (this.#i = new v(
      t.left.monomByDegree(1, "x").coefficient.clone().opposite().divide(2),
      t.left.monomByDegree(1, "y").coefficient.clone().opposite().divide(2),
      t.left.monomByDegree(1, "z").coefficient.clone().opposite().divide(2)
    ), this.#e = t.left.monomByDegree(0).coefficient.clone().opposite().add(this.#i.x.clone().pow(2)).add(this.#i.y.clone().pow(2)).add(this.#i.z.clone().pow(2)), this.#r(), this);
  }
  get center() {
    if (this.#i === void 0)
      throw new Error("Sphere3 is undefined");
    return this.#i;
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
    if (this.#t === void 0)
      throw new Error("Sphere3 is undefined");
    return this.#t;
  }
  makeUndefined() {
    return this.#i = void 0, this.#e = void 0, this.#t = void 0, this;
  }
  get centerRadius() {
    return this.#s = 1, this;
  }
  get developped() {
    return this.#s = 0, this;
  }
  get tex() {
    return this.#n(!0);
  }
  get display() {
    return this.#n(!1);
  }
  #n = (e) => {
    if (this.#t === void 0)
      throw new Error("Sphere3 is undefined");
    if (this.#s === 0)
      return e ? this.#t.tex : this.#t.display;
    const t = [];
    return ["x", "y", "z"].forEach((s) => {
      if (this.center[s].isZero())
        t.push(`${s}^2`);
      else {
        const n = new u(s).subtract(this.center[s]);
        t.push(
          e ? `\\(${n.tex}\\)^2` : `(${n.display})^2`
        );
      }
    }), t.join("+") + "=" + (e ? this.squareRadius.tex : this.squareRadius.display);
  };
  #r() {
    this.#t = new y(
      new u("x").subtract(this.center.x).pow(2).add(
        new u("y").subtract(this.center.y).pow(2)
      ).add(
        new u("z").subtract(this.center.z).pow(2)
      ),
      new u(this.squareRadius)
    ).reduce();
  }
  static RELATIVE_POSITION = oe;
  relativePosition = (e) => {
    const t = this.center.distanceTo(e.center).value, i = this.radius.value, s = e.radius.value;
    return t > i + s ? 1 : t === i + s ? 4 : t === 0 ? i === s ? 5 : 6 : t === Math.abs(i - s) ? 3 : t < Math.abs(i - s) ? 0 : 2;
  };
  isPointOnSphere = (e) => this.#t?.test({
    x: e.x,
    y: e.y,
    z: e.z
  }) ?? !1;
}
function G(r) {
  const e = Object.assign(
    {
      negative: !0,
      max: 10,
      reduced: !0,
      zero: !0,
      natural: !1
    },
    r
  ), t = new a();
  if (e.negative ? t.numerator = q(e.max, e.zero) : t.numerator = k(e.zero ? 0 : 1, e.max), e.natural)
    t.denominator = 1;
  else {
    let i = 0;
    for (; t.isRelative() && i < 10; )
      t.denominator = k(1, e.max), i++;
  }
  return e.reduced ? t.reduce() : t;
}
function he(r) {
  const e = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    r
  ), t = new p();
  if (t.coefficient = G({
    zero: e.zero,
    reduced: !0,
    natural: !e.fraction
  }), e.letters.length > 1) {
    for (const i of e.letters.split(""))
      t.setLetter(i, 0);
    for (let i = 0; i < e.degree; i++) {
      const s = _(e.letters.split(""));
      t.setLetter(s, t.degree(s).clone().add(1));
    }
  } else
    t.setLetter(e.letters, e.degree);
  return t;
}
const Me = {
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
function ae(r) {
  const e = Object.assign(
    Me,
    r
  ), t = new u().empty();
  let i;
  for (let s = e.degree; s >= 0; s--)
    i = he({
      letters: e.letters,
      degree: s,
      fraction: e.fraction,
      zero: s === e.degree ? !1 : e.allowNullMonom
    }), e.unit && e.degree === s && i.coefficient.one(), t.add(i);
  if (e.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposite(), e.numberOfMonoms && e.numberOfMonoms > 0 && e.numberOfMonoms < t.length)
    for (; t.length > e.numberOfMonoms; ) {
      const s = k(1, t.length - 1);
      t.monoms.splice(s, 1);
    }
  return t.reduce();
}
function Se(r) {
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
    r
  ), t = new u().one();
  for (let i = 0; i < e.degree; i++) {
    const s = ae({
      degree: 1,
      unit: e.unit,
      fraction: e.fraction,
      letters: e.letters,
      zero: e.zero
    });
    t.multiply(s);
  }
  return new y(t, 0);
}
function H(r) {
  const e = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    r
  ), t = e.axis === "x", i = e.axis === "y", s = e.fraction ? G({ max: e.max, zero: t }) : new a(q(e.max, t)), n = e.fraction ? G({ max: e.max, zero: i }) : new a(q(e.max, i));
  return Number(e.quadrant) === 1 && (s.abs(), n.abs()), Number(e.quadrant) === 2 && (s.isPositive() && s.opposite(), n.isNegative() && n.opposite()), Number(e.quadrant) === 3 && (s.isPositive() && s.opposite(), n.isPositive() && n.opposite()), Number(e.quadrant) === 4 && (s.isNegative() && s.opposite(), n.isPositive() && n.opposite()), new v(s, n);
}
function Ie(r) {
  const e = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    r
  ), t = H(e.center);
  let i, s;
  return e.pointsOnCircle === 8 ? (i = k(1, 3), s = i ** 2 + (i + 1) ** 2) : s = k(1, 20), new V(t, s, !0);
}
function ze(r) {
  const e = Object.assign(
    {
      A: {
        x: q(10),
        y: q(10)
      }
    },
    r
  ), t = new g(
    q(10),
    q(10)
  );
  for (; t.isNull; )
    t.x = q(10), t.y = q(10);
  return e.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposite() : e.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposite(), new b().fromPointAndDirection(new g(e.A.x, e.A.y), t);
}
function Re(r) {
  const e = Object.assign(
    {
      A: {
        x: q(10),
        y: q(10),
        z: q(10)
      },
      direction: {
        x: q(10),
        y: q(10),
        z: q(10)
      }
    },
    r
  ), t = new v(e.A.x, e.A.y, e.A.z), i = new g(e.direction.x, e.direction.y, e.direction.z);
  return new Y(t, i);
}
const Pe = {
  equation: (r) => Se(r),
  polynom: (r) => ae(r),
  monom: (r) => he(r),
  fraction: (r) => G(r),
  number: (r, e, t) => k(r, e, t),
  numberSym: (r, e) => q(r, e),
  prime: (r) => $e(r),
  bool: (r) => ne(r),
  array: (r, e) => ke(r, e),
  item: (r) => _(r),
  shuffle: (r) => re(r),
  line: (r) => ze(r),
  line3: (r) => Re(r),
  vector: (r) => H(r),
  point: (r) => {
    const e = H(r);
    return e.asPoint = !0, e;
  },
  circle: (r) => Ie(r)
}, Le = {
  Numeric: E,
  Fraction: a,
  Root: j,
  Monom: p,
  Polynom: u,
  Equation: y,
  Matrix: I,
  LinearSystem: D,
  Factor: x,
  PolyFactor: T,
  LogicalSet: qe,
  Random: Pe,
  Geometry: {
    Vector: g,
    Point: v,
    Line: b,
    Triangle: F,
    Circle: V,
    Line3: Y,
    Plane3: ee,
    Sphere3: Be
  },
  NumExp: Ae
};
export {
  V as Circle,
  y as Equation,
  W as EquationSolver,
  Z as FACTOR_DISPLAY,
  we as FRAC_TYPE,
  x as Factor,
  a as Fraction,
  b as Line,
  Y as Line3,
  D as LinearSystem,
  qe as LogicalSet,
  I as Matrix,
  p as Monom,
  j as NthRoot,
  Ae as NumExp,
  E as Numeric,
  ee as Plane3,
  v as Point,
  T as PolyFactor,
  u as Polynom,
  Pe as Random,
  oe as SPHERE3_RELATIVE_POSITION,
  Be as Sphere3,
  F as Triangle,
  g as Vector,
  Oe as areVectorsColinears,
  Te as areVectorsEquals,
  Le as default,
  De as determinantFromVectors,
  Ce as dotProduct
};
//# sourceMappingURL=pimath.js.map
