var Zt = Object.defineProperty;
var xt = (a) => {
  throw TypeError(a);
};
var jt = (a, e, t) => e in a ? Zt(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var o = (a, e, t) => jt(a, typeof e != "symbol" ? e + "" : e, t), ct = (a, e, t) => e.has(a) || xt("Cannot " + t);
var i = (a, e, t) => (ct(a, e, "read from private field"), t ? t.call(a) : e.get(a)), b = (a, e, t) => e.has(a) ? xt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), h = (a, e, t, s) => (ct(a, e, "write to private field"), s ? s.call(a, t) : e.set(a, t), t), I = (a, e, t) => (ct(a, e, "access private method"), t);
function Ut(a) {
  const e = Nt(a), t = [];
  let s, r;
  for (; e.length > 0; )
    s = e.shift() ?? 1, r = (e.length > 0 ? e.pop() : +s) ?? 1, t.push([s, r]);
  return t;
}
function Gt(...a) {
  const e = wt(...a);
  return a.map((t) => t / e);
}
function Nt(a) {
  const e = Math.abs(a), t = Math.sqrt(e), s = [];
  for (let r = 1; r <= t; r++)
    a % r === 0 && (s.push(r), s.push(e / r));
  return s.sort(function(r, n) {
    return r - n;
  }), [...new Set(s)];
}
function wt(...a) {
  const e = function(r, n) {
    return n === 0 ? r : e(n, r % n);
  };
  let t = 1, s = 2;
  if (a.length === 0)
    return 1;
  if (a.length === 1)
    return a[0] === 0 ? 1 : a[0];
  if (t = e(a[0], a[1]), t === 1)
    return 1;
  for (s = 2; s < a.length && (t = e(t, a[s]), t !== 1); s++)
    ;
  return Math.abs(t);
}
function Wt(...a) {
  return a.reduce(function(e, t) {
    return Math.abs(e * t / wt(e, t));
  });
}
function Yt(a, e = 3) {
  return +a.toFixed(e);
}
function Ht(a) {
  if (Number.isSafeInteger(a) || a.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function Xt(a) {
  const e = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return a === void 0 ? e : e.slice(0, Math.min(e.length, a));
}
function Qt(a, e) {
  const t = [], s = e === !0 ? +a : a ** 2;
  for (let r = 0; r <= a; r++)
    for (let n = 0; n <= a; n++)
      r ** 2 + n ** 2 === s && t.push([r, n, a]);
  return t;
}
function Kt(a, e = 2) {
  return +`${Math.round(+`${a}e${e}`)}e-${e}`;
}
const j = {
  decompose: Ut,
  dividers: Nt,
  divideNumbersByGCD: Gt,
  gcd: wt,
  lcm: Wt,
  numberCorrection: Yt,
  periodic: Ht,
  primes: Xt,
  pythagoreanTripletsWithTarget: Qt,
  round: Kt
};
var y, m, Se;
const B = class B {
  constructor(e, t) {
    // #region Class fields (2)
    b(this, y);
    b(this, m);
    b(this, Se);
    // #endregion Constructors (5)
    // #region Properties and methods (55)
    // ------------------------------------------
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    o(this, "parse", (e, t) => {
      let s;
      if (e === "")
        return h(this, m, 0), h(this, y, 1), this;
      switch (typeof e) {
        case "string":
          if (s = e.split("/"), s.length > 2)
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (s.map((r) => r === "" || isNaN(Number(r))).includes(!0))
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (s.length === 1)
            return this.parse(+s[0]);
          s.length === 2 ? s[1] === "0" ? (h(this, m, NaN), h(this, y, 1)) : (h(this, m, +s[0]), h(this, y, +s[1])) : (h(this, m, NaN), h(this, y, 1));
          break;
        case "number":
          if (Number.isSafeInteger(e))
            h(this, m, +e), t === void 0 || !Number.isSafeInteger(t) ? h(this, y, 1) : h(this, y, +t);
          else {
            const [, r] = e.toString().split("."), n = r ? r.length : 0;
            t === void 0 ? (h(this, m, e * Math.pow(10, n)), h(this, y, Math.pow(10, n))) : Number.isSafeInteger(t) && (h(this, m, e * Math.pow(10, n) - Math.floor(e * Math.pow(10, n - t))), this.denominator = Math.pow(10, n) - Math.pow(10, n - t)), this.reduce();
          }
          break;
        case "object":
          e instanceof B && (h(this, m, +e.numerator), h(this, y, +e.denominator));
          break;
      }
      return this;
    });
    o(this, "clone", () => {
      const e = new B();
      return e.numerator = +i(this, m), e.denominator = +i(this, y), e;
    });
    o(this, "abs", () => (h(this, m, Math.abs(i(this, m))), h(this, y, Math.abs(i(this, y))), this));
    o(this, "add", (e) => {
      if (e instanceof B) {
        const t = i(this, m), s = i(this, y);
        h(this, m, t * e.denominator + e.numerator * s), h(this, y, s * e.denominator);
      } else
        return this.add(new B(e));
      return this.reduce();
    });
    o(this, "amplify", (e) => (Number.isSafeInteger(e) && (h(this, m, i(this, m) * e), h(this, y, i(this, y) * e)), this));
    // TODO: The rest of the functions are not used or unnecessary ?
    /**
     * Simple function to determine if it's a fraction
     */
    o(this, "areEquals", (...e) => e.every((t) => t.isEqual(e[0])));
    // ------------------------------------------
    // Compare functions
    // ------------------------------------------
    /**
     * Compare the current coefficient with another coefficient
     * @param F (Coefficient) The coefficient to _compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    o(this, "compare", (e, t) => {
      t === void 0 && (t = "=");
      let s;
      switch (e instanceof B ? s = e.clone() : s = new B(e), t) {
        case ">":
          return this.value > s.value;
        case ">=":
        case "=>":
        case "geq":
          return this.value >= s.value;
        case "<":
          return this.value < s.value;
        case "<=":
        case "=<":
        case "leq":
          return this.value <= s.value;
        case "=":
          return this.value === s.value;
        case "<>":
          return this.value !== s.value;
        default:
          return !1;
      }
    });
    o(this, "divide", (e) => {
      const t = new B(e);
      if (t.numerator === 0)
        return new B().infinite();
      const s = +i(this, m), r = +i(this, y);
      return h(this, m, s * t.denominator), h(this, y, r * t.numerator), this.reduce();
    });
    o(this, "infinite", () => (h(this, m, 1 / 0), h(this, y, 1), this));
    o(this, "invalid", () => (h(this, m, NaN), h(this, y, 1), this));
    o(this, "inverse", () => {
      const e = +i(this, m), t = +i(this, y);
      return h(this, m, t), h(this, y, e), this;
    });
    o(this, "isApproximative", () => i(this, Se) || i(this, m).toString().length >= 15 && i(this, y).toString().length >= 15);
    o(this, "isEqual", (e) => this.compare(e, "="));
    o(this, "isEven", () => this.isRelative() && this.value % 2 === 0);
    o(this, "isExact", () => !this.isApproximative());
    o(this, "isFinite", () => !this.isInfinity() && !this.isNaN());
    o(this, "isGeq", (e) => this.compare(e, ">="));
    o(this, "isGreater", (e) => this.compare(e, ">"));
    o(this, "isInfinity", () => Math.abs(i(this, m)) === 1 / 0);
    o(this, "isInverted", (e) => this.isEqual(new B().one().divide(e.clone())));
    o(this, "isLeq", (e) => this.compare(e, "<="));
    /* Compare shortcuts */
    o(this, "isLesser", (e) => this.compare(e, "<"));
    o(this, "isNaN", () => isNaN(i(this, m)));
    o(this, "isNatural", () => this.isRelative() && this.isPositive());
    o(this, "isNegative", () => this.sign() === -1);
    o(this, "isNegativeOne", () => i(this, m) === -1 && i(this, y) === 1);
    o(this, "isNotEqual", (e) => this.compare(e, "<>"));
    o(this, "isNotZero", () => i(this, m) !== 0);
    o(this, "isOdd", () => this.isRelative() && this.value % 2 === 1);
    o(this, "isOne", () => i(this, m) === 1 && i(this, y) === 1);
    o(this, "isOpposite", (e) => this.isEqual(e.clone().opposite()));
    o(this, "isPositive", () => this.sign() === 1);
    o(this, "isRational", () => !this.isRelative());
    o(this, "isReduced", () => Math.abs(j.gcd(i(this, m), i(this, y))) === 1);
    o(this, "isRelative", () => this.clone().reduce().denominator === 1);
    o(this, "isSquare", () => Math.sqrt(i(this, m)) % 1 === 0 && Math.sqrt(i(this, y)) % 1 === 0);
    o(this, "isStrictlyNegative", () => this.value < 0);
    o(this, "isStrictlyPositive", () => this.value > 0);
    // ------------------------------------------
    // Mathematical operations specific to fractions
    o(this, "isZero", () => i(this, m) === 0);
    o(this, "multiply", (e) => {
      const t = new B(e);
      return h(this, m, i(this, m) * t.numerator), h(this, y, i(this, y) * t.denominator), this.reduce();
    });
    o(this, "one", () => (h(this, m, 1), h(this, y, 1), this));
    o(this, "opposite", () => (h(this, m, -i(this, m)), this));
    o(this, "pow", (e) => {
      if (e instanceof B)
        return this.pow(e.value);
      this.reduce(), e < 0 && this.inverse();
      const t = Math.floor(Math.pow(i(this, m), Math.abs(e))), s = Math.floor(Math.pow(i(this, y), Math.abs(e)));
      return t ** Math.abs(e) === i(this, m) && s ** Math.abs(e) === i(this, y) ? (h(this, m, i(this, m) ** Math.abs(e)), h(this, y, i(this, y) ** Math.abs(e))) : (h(this, m, i(this, m) ** Math.abs(e)), h(this, y, i(this, y) ** Math.abs(e))), this;
    });
    // ------------------------------------------
    o(this, "reduce", () => {
      const e = j.gcd(i(this, m), i(this, y));
      return h(this, m, i(this, m) / e), h(this, y, i(this, y) / e), i(this, y) < 0 && (h(this, y, -i(this, y)), h(this, m, -i(this, m))), this;
    });
    o(this, "root", (e) => {
      if (e === 0)
        return this;
      if (e < 0 && this.inverse(), !Number.isSafeInteger(e))
        throw new Error("The root must be an integer.");
      if (this.isNegative() && e % 2 === 0)
        throw new Error("The root of a negative number must be odd.");
      const t = this.sign();
      this.abs(), this.reduce();
      const s = Math.floor(Math.pow(i(this, m), Math.abs(1 / e))), r = Math.floor(Math.pow(i(this, y), Math.abs(1 / e)));
      return h(this, m, Math.pow(i(this, m), Math.abs(1 / e))), h(this, y, Math.pow(i(this, y), Math.abs(1 / e))), (s !== i(this, m) || r !== i(this, y)) && (h(this, m, i(this, m) / i(this, y)), h(this, y, 1), h(this, Se, !0)), this.multiply(t), this;
    });
    o(this, "sign", () => i(this, m) * i(this, y) >= 0 ? 1 : -1);
    o(this, "sqrt", () => this.root(2));
    o(this, "subtract", (e) => e instanceof B ? this.add(e.clone().opposite()) : this.add(-e));
    o(this, "zero", () => (h(this, m, 0), h(this, y, 1), this));
    return h(this, m, 1), h(this, y, 1), h(this, Se, !1), e !== void 0 && this.parse(e, t), this;
  }
  // #endregion Properties and methods (55)
  // #region Getters And Setters (11)
  get denominator() {
    return i(this, y);
  }
  set denominator(e) {
    h(this, y, e);
  }
  // ------------------------------------------
  // Creation / parsing functions
  get dfrac() {
    return this.tex.replace("\\frac", "\\dfrac");
  }
  get display() {
    return this.isExact() ? i(this, y) === 1 ? `${i(this, m)}` : `${i(this, m)}/${i(this, y)}` : this.value.toFixed(3);
  }
  // Helper function to display fractions
  get frac() {
    return this.tex;
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get numerator() {
    return i(this, m);
  }
  set numerator(e) {
    h(this, m, e);
  }
  // Display getter
  get tex() {
    return this.isInfinity() ? `${this.sign() === 1 ? "+" : "-"}\\infty` : this.isExact() ? i(this, y) === 1 ? `${i(this, m)}` : i(this, m) < 0 ? `-\\frac{ ${-i(this, m)} }{ ${i(this, y)} }` : `\\frac{ ${i(this, m)} }{ ${i(this, y)} }` : this.value.toFixed(3);
  }
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get tfrac() {
    return this.tex.replace("\\frac", "\\tfrac");
  }
  get value() {
    return i(this, m) / i(this, y);
  }
  // #endregion Getters And Setters (11)
};
y = new WeakMap(), m = new WeakMap(), Se = new WeakMap(), o(B, "average", (...e) => {
  const t = new B().zero();
  for (const s of e)
    t.add(s);
  return t.divide(e.length), t;
}), o(B, "max", (...e) => {
  let t = new B(e[0]);
  for (const s of e) {
    const r = new B(s);
    r.isGreater(t) && (t = r.clone());
  }
  return t;
}), o(B, "min", (...e) => {
  let t = new B(e[0]);
  for (const s of e) {
    const r = new B(s);
    r.isLesser(t) && (t = r.clone());
  }
  return t;
}), o(B, "sort", (e, t) => {
  const r = e.map((n) => n instanceof B ? n : new B(n)).sort((n, l) => n.value - l.value);
  return t && r.reverse(), r;
}), o(B, "unique", (e) => {
  const t = {}, s = [];
  return e.forEach((r) => {
    r instanceof B || (r = new B(r)), t[r.clone().reduce().tex] || (s.push(r.clone()), t[r.tex] = !0);
  }), s;
}), o(B, "xMultiply", (...e) => {
  const t = new B();
  for (const s of e) {
    const r = new B(s);
    t.numerator = t.numerator * r.numerator, t.denominator = t.denominator * r.denominator;
  }
  return t;
});
let c = B;
var Ot = (a) => {
  throw TypeError(a);
}, Tt = (a, e, t) => e.has(a) || Ot("Cannot " + t), Q = (a, e, t) => (Tt(a, e, "read from private field"), t ? t.call(a) : e.get(a)), Fe = (a, e, t) => e.has(a) ? Ot("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), me = (a, e, t, s) => (Tt(a, e, "write to private field"), e.set(a, t), t);
const At = {
  pi: Math.PI,
  e: Math.exp(1)
};
var f = /* @__PURE__ */ ((a) => (a.VARIABLE = "variable", a.COEFFICIENT = "coefficient", a.OPERATION = "operation", a.CONSTANT = "constant", a.FUNCTION = "function", a.FUNCTION_ARGUMENT = "function-argument", a.MONOM = "monom", a.LEFT_PARENTHESIS = "(", a.RIGHT_PARENTHESIS = ")", a))(f || {}), Ve = /* @__PURE__ */ ((a) => (a.EXPRESSION = "expression", a.POLYNOM = "polynom", a.SET = "set", a.NUMERIC = "numeric", a))(Ve || {});
function Jt(a, e) {
  if (a.length <= 1)
    return a;
  const t = Object.keys(e).filter((x) => e[x].type === f.FUNCTION).map((x) => x);
  t.sort((x, R) => R.length - x.length);
  const s = new RegExp(`^(${t.join("|")})\\(`), r = Object.keys(At);
  r.sort((x, R) => R.length - x.length);
  const n = new RegExp(`^(${r.join("|")})`), l = /^(\d+(\.\d+)?)/;
  let u = "", v, d, w;
  for (; a.length > 0; ) {
    if (v = d, w = void 0, t.length > 0 && s.exec(a)) {
      const x = t.find((R) => a.startsWith(R));
      x && (w = x + "(", a = a.slice(x.length + 1), d = f.FUNCTION);
    } else if (r.length > 0 && n.exec(a)) {
      const x = r.find((R) => a.startsWith(R));
      x && (w = x, a = a.slice(x.length), d = f.CONSTANT);
    } else if (l.exec(a)) {
      const x = l.exec(a);
      x && (w = x[0], a = a.slice(x[0].length), d = f.COEFFICIENT);
    } else
      switch (w = a[0], a = a.slice(1), w) {
        case "(":
          d = f.LEFT_PARENTHESIS;
          break;
        case ")":
          d = f.RIGHT_PARENTHESIS;
          break;
        case ",":
          d = f.FUNCTION_ARGUMENT;
          break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
          d = f.OPERATION;
          break;
        default:
          d = f.VARIABLE;
      }
    if (w === void 0 || d === void 0)
      throw new Error("The token is undefined");
    u += _t(v, d), u += w;
  }
  return u;
}
function _t(a, e) {
  return a === void 0 || a === f.OPERATION || e === f.OPERATION || a === f.LEFT_PARENTHESIS || a === f.FUNCTION || a === f.FUNCTION_ARGUMENT || e === f.RIGHT_PARENTHESIS || e === f.FUNCTION_ARGUMENT ? "" : "*";
}
const ei = {
  "^": { precedence: 4, associative: "right", type: f.OPERATION },
  "*": { precedence: 3, associative: "left", type: f.OPERATION },
  "/": { precedence: 3, associative: "left", type: f.OPERATION },
  "+": { precedence: 2, associative: "left", type: f.OPERATION },
  "-": { precedence: 2, associative: "left", type: f.OPERATION }
}, ti = {
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
}, ii = {
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
}, si = {
  "&": { precedence: 3, associative: "left", type: f.OPERATION },
  "|": { precedence: 3, associative: "left", type: f.OPERATION },
  "!": { precedence: 4, associative: "right", type: f.OPERATION },
  "-": { precedence: 2, associative: "left", type: f.OPERATION }
};
var $e, Ze, _, Xe, Me;
class qt {
  constructor(e) {
    Fe(this, $e), Fe(this, Ze, []), Fe(this, _, {}), Fe(this, Xe, []), Fe(this, Me), me(this, $e, typeof e > "u" ? Ve.POLYNOM : e), this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return Q(this, Ze);
  }
  get rpnToken() {
    return Q(this, Ze).map((e) => e.token);
  }
  tokenConfigInitialization() {
    return Q(this, $e) === Ve.SET ? (me(this, _, si), me(this, Me, !1)) : Q(this, $e) === Ve.NUMERIC ? (me(this, _, ii), me(this, Me, !0)) : Q(this, $e) === Ve.EXPRESSION ? (me(this, _, ti), me(this, Me, !0)) : (me(this, _, ei), me(this, Me, !0)), me(this, Xe, Object.keys(Q(this, _)).sort((e, t) => t.length - e.length)), Q(this, _);
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(e, t) {
    let s, r;
    if (s = "", r = void 0, e[t] === "(")
      s = "(", r = f.LEFT_PARENTHESIS;
    else if (e[t] === ")")
      s = ")", r = f.RIGHT_PARENTHESIS;
    else if (e[t] === ",")
      s = ",", r = f.FUNCTION_ARGUMENT;
    else {
      for (const n of Q(this, Xe))
        if (e.substring(t, t + n.length) === n) {
          s += n, r = Q(this, _)[n].type;
          break;
        }
      for (const n in At)
        if (e.substring(t, t + n.length) === n) {
          s += n, r = f.CONSTANT;
          break;
        }
      if (s === "")
        if (/[0-9.]/.exec(e[t])) {
          const n = /^([0-9.]+)/.exec(e.substring(t));
          s = n ? n[0] : "", r = f.COEFFICIENT;
        } else if (/[a-zA-Z]/.exec(e[t])) {
          const n = /^([a-zA-Z])/.exec(e.substring(t));
          s = n ? n[0] : "", r = f.VARIABLE;
        } else
          console.log("Unidentified token", e[t], e, t), s = e[t], r = f.MONOM;
    }
    if (r === void 0)
      throw new Error(`Token type is undefined for token ${s}`);
    return [s, t + s.length, r];
  }
  /**
   * Parse an expression using the shutting yard tree algorithms
   * @param expr (string) Expression to analyse
   * Returns a RPN list of items.
   * @param uniformize
   */
  parse(e, t) {
    const s = [], r = [];
    let n = "", l = 0, u;
    (t ?? Q(this, Me)) && (e = Jt(e, Q(this, _)));
    const v = 50;
    let d = 50, w;
    for (; l < e.length; ) {
      if (d--, d === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([n, l, u] = this.NextToken(e, l), u) {
        case f.MONOM:
        case f.COEFFICIENT:
        case f.VARIABLE:
        case f.CONSTANT:
          s.push({
            token: n,
            tokenType: u
          });
          break;
        case f.OPERATION:
          if (r.length > 0) {
            let x = r[r.length - 1];
            for (w = +v; x.token in Q(this, _) && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (Q(this, _)[n].associative === "left" && Q(this, _)[n].precedence <= Q(this, _)[x.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            Q(this, _)[n].associative === "right" && Q(this, _)[n].precedence < Q(this, _)[x.token].precedence); ) {
              if (w--, w === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (s.push(r.pop() ?? { token: "", tokenType: f.OPERATION }), r.length === 0)
                break;
              x = r[r.length - 1];
            }
          }
          r.push({ token: n, tokenType: u });
          break;
        case f.FUNCTION_ARGUMENT:
          for (w = +v; r[r.length - 1].token !== "(" && r.length > 0; ) {
            if (w--, w === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            s.push(r.pop() ?? { token: n, tokenType: u });
          }
          break;
        case f.LEFT_PARENTHESIS:
          r.push({ token: n, tokenType: u }), e[l] === "-" && s.push({ token: "0", tokenType: f.COEFFICIENT });
          break;
        case f.RIGHT_PARENTHESIS:
          for (w = +v; r[r.length - 1].token !== "(" && r.length > 1; ) {
            if (w--, w === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
              break;
            }
            s.push(r.pop() ?? { token: n, tokenType: u });
          }
          r.pop();
          break;
        case f.FUNCTION:
          r.push({ token: n, tokenType: u });
          break;
        default:
          throw new Error(`Token type ${n} is not handled`);
      }
    }
    return me(this, Ze, s.concat(r.reverse())), this;
  }
}
$e = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap(), Xe = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap();
class Qe {
  constructor(...e) {
    o(this, "_radical");
    o(this, "_nth");
    o(this, "_coefficient");
    o(this, "_isValid");
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    o(this, "parse", (e, t, s) => (this._coefficient = s ?? 1, this._nth = t ?? 2, this._radical = e, this._nth % 2 === 0 && this._radical < 0 && (this._isValid = !1), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    o(this, "reduce", () => {
      let e = Math.floor(Math.pow(this._radical, 1 / this._nth));
      for (; e > 1; ) {
        if (this._radical % Math.pow(e, this._nth) === 0) {
          this._coefficient *= e, this._radical = this._radical / Math.pow(e, this._nth), e = Math.floor(Math.pow(this._radical, 1 / this._nth));
          continue;
        }
        e--;
      }
      return this;
    });
    o(this, "multiply", (e) => (this._radical *= e.radical, this.reduce()));
    // ------------------------------------------
    // Help functions
    // ------------------------------------------
    o(this, "hasRadical", () => !(this._radical === 1 || this._radical === 0 || !this._isValid));
    this._radical = 1, this._coefficient = 1, this._nth = 2, this._isValid = !0, e.length > 0 && this.parse(e[0], e[1], e[2]);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get radical() {
    return this._radical;
  }
  set radical(e) {
    this._radical = e;
  }
  get nth() {
    return this._nth;
  }
  set nth(e) {
    Number.isSafeInteger(e) && e >= 2 ? this._nth = e : (console.log("Error setting the nth root"), this._nth = 2);
  }
  get coefficient() {
    return this._coefficient;
  }
  set coefficient(e) {
    this._coefficient = e;
  }
  get tex() {
    let e;
    return this._coefficient === 1 ? e = "" : this._coefficient === -1 ? e = "-" : e = this._coefficient.toString(), this._radical === 1 ? `${this._coefficient}` : this._nth === 2 ? `${e}\\sqrt{${this._radical}}` : `${e}\\sqrt[${this._nth}]{${this._radical}}`;
  }
  get display() {
    let e;
    return this._coefficient === 1 ? e = "" : this._coefficient === -1 ? e = "-" : e = this._coefficient.toString(), this._radical === 1 ? `${this._coefficient}` : this._nth === 2 ? `${e}sqrt{${this._radical}}` : `${e}root(${this._nth}){${this._radical}}`;
  }
  get value() {
    return this._coefficient * Math.pow(this._radical, 1 / this._nth);
  }
}
var N, g;
const $ = class $ {
  constructor(e) {
    b(this, N);
    b(this, g);
    // -----------------------------------------
    /**
     * Parse a string to a monom. The string may include fraction.
     * @param inputStr
     */
    o(this, "parse", (e) => (h(this, N, new c()), h(this, g, {}), typeof e == "string" ? this._shutingYardToReducedMonom(e) : typeof e == "number" ? h(this, N, new c(e)) : e instanceof c ? h(this, N, e.clone()) : e instanceof $ && (h(this, N, i(e, N).clone()), this._cloneLiteral(e)), this));
    /**
     * Clone the current Monom.
     */
    o(this, "clone", () => {
      const e = new $();
      e.coefficient = i(this, N).clone();
      for (const t in i(this, g))
        e.setLetter(t, i(this, g)[t].clone());
      return e;
    });
    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    o(this, "add", (...e) => {
      for (const t of e) {
        const s = t instanceof $ ? t : new $(t);
        this.isSameAs(s) ? (this.isZero() && this._cloneLiteral(s), i(this, N).add(s.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", s.display);
      }
      return this;
    });
    o(this, "containsRationalPower", () => Object.values(i(this, g)).some((e) => e.isRational()));
    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    o(this, "degree", (e) => this.variables.length === 0 ? new c().zero() : e === void 0 ? Object.values(i(this, g)).reduce((t, s) => t.clone().add(s)) : this.hasVariable(e) ? i(this, g)[e].clone() : new c().zero());
    /**
     * Derivative the monom
     * @param letter
     */
    o(this, "derivative", (e) => {
      if (e === void 0 && (e = "x"), this.hasVariable(e)) {
        const t = i(this, g)[e].clone(), s = this.clone();
        return i(s, g)[e].subtract(1), i(s, N).multiply(new c(t.clone())), s;
      } else
        return new $().zero();
    });
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    o(this, "divide", (...e) => {
      for (const t of e) {
        const s = t instanceof $ ? t : new $(t);
        i(this, N).divide(s.coefficient);
        for (const r in s.literal)
          i(this, g)[r] = this.hasVariable(r) ? i(this, g)[r].subtract(s.literal[r]) : s.literal[r].clone().opposite(), i(this, g)[r].isZero() && this.removeVariable(r);
      }
      return this;
    });
    /**
     * Evaluate a monom. Each setLetter must be assigned to a Fraction.
     * @param values    Dictionary of <setLetter: Fraction>
     * @param asNumeric
     */
    o(this, "evaluate", (e, t) => {
      if (t === !0) {
        if (e instanceof c)
          return this._evaluateAsNumeric(e.value);
        if (e instanceof Qe)
          return new c().invalid();
        if (typeof e == "number")
          return this._evaluateAsNumeric(e);
        if (typeof e == "object") {
          const r = {};
          for (const n in e)
            r[n] = new c(e[n]).value;
          return this._evaluateAsNumeric(r);
        }
      }
      const s = this.coefficient.clone();
      if (typeof e == "number" || e instanceof c) {
        const r = {};
        return r[this.variables[0]] = new c(e), this.evaluate(r);
      }
      if (e instanceof Qe)
        return new c().invalid();
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient;
        for (const r in i(this, g)) {
          const n = new c(e[r]);
          s.multiply(n.pow(i(this, g)[r]));
        }
      }
      return s;
    });
    // -------------------------------------
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    o(this, "hasVariable", (e) => Object.hasOwn(i(this, g), e ?? "x"));
    o(this, "inverse", () => {
      i(this, N).opposite();
      for (const e in i(this, g))
        i(this, g)[e].opposite();
      return this;
    });
    o(this, "isDivisible", (e) => {
      if (e.degree().isStrictlyPositive()) {
        for (const t of e.variables)
          if (!this.degree(t).isGeq(e.degree(t)))
            return !1;
      }
      return this.coefficient.isRational() || e.coefficient.isRational() ? !0 : this.coefficient.clone().divide(e.coefficient).isRelative();
    });
    /**
     * Determine if two monoms are equals
     * @param M
     */
    o(this, "isEqual", (e) => this.isSameAs(e) && i(this, N).isEqual(e.coefficient));
    o(this, "isLiteralSquare", () => {
      for (const e in this.literal)
        if (this.literal[e].isRational() || this.literal[e].isEven())
          return !1;
      return !0;
    });
    /**
     * Determine if the monom is one
     */
    o(this, "isOne", () => i(this, N).value === 1 && this.variables.length === 0);
    /**
     * Determine if two monoms are similar
     * @param M
     */
    o(this, "isSameAs", (e) => {
      const t = this.variables, s = e.variables, r = t.concat(s.filter((n) => !t.includes(n)));
      if (this.isZero() || e.isZero() || t.length === 0 && s.length === 0)
        return !0;
      if (t.length !== s.length)
        return !1;
      if (!this.isZero() && !e.isZero()) {
        for (const n of r)
          if (!this.hasVariable(n) || !e.hasVariable(n) || !i(this, g)[n].isEqual(e.literal[n]))
            return !1;
      }
      return !0;
    });
    o(this, "isSquare", () => this.coefficient.isSquare() ? this.isLiteralSquare() : !1);
    /**
     * Determine if the monom is null
     */
    o(this, "isZero", () => i(this, N).value === 0);
    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    o(this, "multiply", (...e) => {
      for (const t of e) {
        const s = t instanceof $ ? t : new $(t);
        i(this, N).multiply(s.coefficient);
        for (const r in s.literal)
          this.hasVariable(r) ? i(this, g)[r].add(s.literal[r]) : i(this, g)[r] = s.literal[r].clone();
      }
      return this;
    });
    /**
     * Create a one value monom
     */
    o(this, "one", () => (h(this, N, new c().one()), h(this, g, {}), this));
    /**
     * Get the opposite
     * Returns a monom.
     */
    o(this, "opposite", () => (i(this, N).opposite(), this));
    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    o(this, "pow", (e) => {
      i(this, N).pow(e);
      for (const t in i(this, g))
        i(this, g)[t].multiply(e);
      return this;
    });
    // #endregion Properties and methods (31)
    // #region Getters And Setters (11)
    o(this, "primitive", (e) => {
      e === void 0 && (e = "x");
      const t = this.clone();
      let s;
      return t.hasVariable(e) ? (s = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(s), t.setLetter(e, s)) : (t.coefficient.isZero() && (t.coefficient = new c().one()), t.setLetter(e, 1)), t;
    });
    o(this, "reduce", () => {
      this.coefficient.reduce();
      for (const e in i(this, g))
        i(this, g)[e].isZero() && this.removeVariable(e);
      return this;
    });
    /**
     * Get the nth-root of the monom
     * @param p
     */
    o(this, "root", () => {
      throw new Error("Method not implemented.");
    });
    /**
     * Set the power of a particular setLetter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the setLetter (must be positive integer.
     */
    o(this, "setLetter", (e, t) => t instanceof c ? (this.hasVariable(e) && t.isZero() && this.removeVariable(e), i(this, g)[e] = t.clone(), this) : this.setLetter(e, new c(t)));
    /**
     * Return the square root of a monom
     */
    o(this, "sqrt", () => {
      if (this.isSquare()) {
        i(this, N).sqrt();
        for (const e in i(this, g))
          i(this, g)[e].clone().divide(2);
      }
      return this;
    });
    /**
     * Subtract multiple monoms
     * @param M (Monom[]) The monoms to subtract
     */
    o(this, "subtract", (...e) => {
      for (const t of e) {
        const s = t instanceof $ ? t : new $(t);
        this.isSameAs(s) ? (this.isZero() && this._cloneLiteral(s), i(this, N).add(s.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", s.display);
      }
      return this;
    });
    /**
     * Create a zero value monom
     */
    o(this, "zero", () => (h(this, N, new c().zero()), h(this, g, {}), this));
    o(this, "_evaluateAsNumeric", (e) => {
      let t = this.coefficient.value;
      if (typeof e == "number") {
        const s = {}, r = this.variables[0];
        return s[r] = e, this._evaluateAsNumeric(s);
      }
      if (e instanceof c) {
        const s = {};
        return s[this.variables[0]] = new c(e).value, this._evaluateAsNumeric(s);
      }
      if (e instanceof Qe)
        return NaN;
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient.value;
        for (const s in i(this, g)) {
          const r = e[s];
          r instanceof c ? t *= r.value ** i(this, g)[s].value : t *= r ** i(this, g)[s].value;
        }
      }
      return t;
    });
    o(this, "_shutingYardToReducedMonom", (e) => {
      const s = new qt().parse(e).rpn, r = [];
      if (s.length === 0)
        return this.zero(), this;
      if (s.length === 1) {
        const n = s[0];
        return this.one(), n.tokenType === f.COEFFICIENT ? this.coefficient = new c(n.token) : n.tokenType === f.VARIABLE && this.setLetter(n.token, 1), this;
      } else
        for (const n of s)
          this._shutingYard_AddToken(r, n);
      return this.one(), this.multiply(r[0]), this;
    });
    o(this, "_shutingYard_AddToken", (e, t) => {
      var v;
      let s, r, n, l, u;
      if (t.tokenType === f.COEFFICIENT)
        e.push(new $(new c(t.token)));
      else if (t.tokenType === f.VARIABLE) {
        const d = new $().one();
        d.setLetter(t.token, 1), e.push(d.clone());
      } else if (t.tokenType === f.OPERATION)
        switch (t.token) {
          case "-":
            r = e.pop() ?? new $().zero(), s = e.pop() ?? new $().zero(), e.push(s.subtract(r));
            break;
          case "*":
            r = e.pop() ?? new $().one(), s = e.pop() ?? new $().one(), e.push(s.multiply(r));
            break;
          case "/":
            r = e.pop() ?? new $().one(), s = e.pop() ?? new $().one(), e.push(s.divide(r));
            break;
          case "^": {
            u = ((v = e.pop()) == null ? void 0 : v.coefficient) ?? new c().one(), n = e.pop() ?? new $().one(), l = n.variables[0], l && n.setLetter(l, u), e.push(n);
            break;
          }
        }
    });
    return h(this, N, new c().zero()), h(this, g, {}), e !== void 0 && this.parse(e), this;
  }
  /**
   * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
   * @returns {Fraction}
   */
  get coefficient() {
    return i(this, N);
  }
  /**
   * Set the coefficient \\(k\\) value of the monom
   * @param {Fraction | number | string} F
   */
  set coefficient(e) {
    h(this, N, new c(e));
  }
  // Display getter
  /**
   * This display getter is to be used in the polynom display getter
   */
  get display() {
    let e = "";
    const t = Object.keys(i(this, g)).sort();
    for (const s of t)
      i(this, g)[s].isNotZero() && (e += s, i(this, g)[s].isNotEqual(1) && (e += `^(${i(this, g)[s].display})`));
    return e === "" ? i(this, N).value != 0 ? i(this, N).display : "" : i(this, N).value === 1 ? e : i(this, N).value === -1 ? `-${e}` : i(this, N).value === 0 ? "0" : `${i(this, N).display}${e}`;
  }
  get dividers() {
    if (!this.coefficient.isRelative())
      return [this.clone()];
    if (this.containsRationalPower())
      return [this.clone()];
    if (this.coefficient.numerator > 1e6)
      return [this.clone()];
    const e = j.dividers(Math.abs(this.coefficient.numerator));
    let t = [];
    for (const r in this.literal)
      t = this._getLiteralDividers(t, r);
    const s = [];
    if (t.length > 0 && e.length > 0)
      for (const r of e)
        for (const n of t) {
          const l = new $();
          l.coefficient = new c(r), l.literal = n, s.push(l);
        }
    else if (e.length === 0)
      for (const r of t) {
        const n = new $();
        n.coefficient = new c().one(), n.literal = r, s.push(n);
      }
    else
      for (const r of e) {
        const n = new $();
        n.coefficient = new c(r), s.push(n);
      }
    return s.length === 0 ? [new $().one()] : s;
  }
  integrate(e, t, s) {
    const r = this.primitive(s);
    return r.evaluate(t).subtract(r.evaluate(e));
  }
  /**
   * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
   * @returns {literalType}
   */
  get literal() {
    return i(this, g);
  }
  /**
   * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
   * @param {literalType<Fraction>} L
   */
  set literal(e) {
    h(this, g, e);
  }
  /**
   * Get the literal square roots of the Monom.
   * TODO: remove this getter ? Is it used and is it correct ?
   * @returns {literalType<Fraction>}
   */
  get literalSqrt() {
    if (this.isLiteralSquare()) {
      const e = {};
      for (const t in i(this, g))
        e[t] = i(this, g)[t].clone().sqrt();
      return e;
    } else
      return i(this, g);
  }
  /**
   * Set the literal part of the monom from a string
   * @param inputStr  String like x^2y^3
   */
  set literalStr(e) {
    for (const t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)])
      t[1] in i(this, g) || (i(this, g)[t[1]] = new c().zero()), i(this, g)[t[1]].add(+t[2]);
    for (const t of [...e.matchAll(/([a-z](?!\^))/g)])
      t[1] in i(this, g) || (i(this, g)[t[1]] = new c().zero()), i(this, g)[t[1]].add(1);
  }
  get plotFunction() {
    let e = "";
    const t = Object.keys(i(this, g)).sort();
    for (const s of t)
      i(this, g)[s].isNotZero() && (e += (e === "" ? "" : "*") + s, i(this, g)[s].isNotEqual(1) && (e += `^(${i(this, g)[s].display})`));
    return e === "" ? i(this, N).value != 0 ? i(this, N).display : "" : i(this, N).value === 1 ? e : i(this, N).value === -1 ? `-${e}` : i(this, N).value === 0 ? "0" : `${i(this, N).display}*${e}`;
  }
  removeVariable(e) {
    delete i(this, g)[e];
  }
  /**
   * Get the tex output of the monom
   */
  get tex() {
    let e = "";
    const t = Object.keys(i(this, g)).sort();
    for (const s of t)
      i(this, g)[s].isNotZero() && (e += s, i(this, g)[s].isNotEqual(1) && (e += `^{ ${i(this, g)[s].tfrac} }`));
    return e === "" ? i(this, N).value != 0 ? i(this, N).frac : "0" : i(this, N).value === 1 ? e : i(this, N).value === -1 ? `-${e}` : i(this, N).value === 0 ? "0" : `${i(this, N).frac}${e}`;
  }
  // Getter helpers.
  /**
   * Get the variables letters
   */
  get variables() {
    const e = [];
    return Object.entries(this.literal).forEach(
      ([t, s]) => {
        s.isZero() || e.push(t);
      }
    ), e.sort(), e;
  }
  _cloneLiteral(e) {
    for (const t in e.literal)
      i(this, g)[t] = e.literal[t].clone();
  }
  _getLiteralDividers(e, t) {
    const s = [];
    for (let r = 0; r <= this.literal[t].value; r++)
      if (e.length === 0) {
        const n = {};
        n[t] = new c(r), s.push(n);
      } else
        for (const n of e) {
          const l = {};
          for (const u in n)
            l[u] = n[u];
          l[t] = new c(r), s.push(l);
        }
    return s;
  }
  // #endregion Private methods (5)
};
N = new WeakMap(), g = new WeakMap(), o($, "gcd", (...e) => {
  for (const n of e)
    if (n.containsRationalPower())
      return new $().zero();
  const t = new $(), s = j.gcd(...e.map((n) => n.coefficient.numerator)), r = j.lcm(...e.map((n) => n.coefficient.denominator));
  t.coefficient = new c(s, r).reduce();
  for (const n of e) {
    for (const l in t.literal)
      l in n.literal || t.literal[l].zero();
    for (const l in n.literal)
      !t.hasVariable(l) && n.literal[l].isStrictlyPositive() ? t.literal[l] = n.literal[l].clone() : t.literal[l] = new c(Math.min(n.literal[l].value, t.literal[l].value));
  }
  return t;
}), /**
 * Multiply two monoms and return a NEW monom.
 * @param monoms
 */
o($, "xMultiply", (...e) => {
  const t = new $().one();
  for (const s of e)
    t.multiply(s);
  return t;
});
let M = $;
var Ce, p;
const C = class C {
  constructor(e, ...t) {
    // #region Class fields (8)
    b(this, Ce);
    b(this, p);
    // #endregion Constructors (7)
    // #region Properties and methods (49)
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values
     */
    o(this, "parse", (e, ...t) => {
      if (h(this, p, []), h(this, Ce, []), typeof e == "string")
        return this._parseString(e, ...t);
      if ((typeof e == "number" || e instanceof c || e instanceof M) && t.length === 0)
        i(this, p).push(new M(e));
      else if (e instanceof M && t.length > 0)
        i(this, p).push(new M(e)), t.forEach((s) => {
          i(this, p).push(new M(s));
        });
      else if (e instanceof C)
        for (const s of e.monoms)
          i(this, p).push(s.clone());
      return this;
    });
    /**
     * Clone the polynom
     */
    o(this, "clone", () => {
      const e = new C(), t = [];
      for (const s of i(this, p))
        t.push(s.clone());
      return e.monoms = t, e;
    });
    o(this, "add", (...e) => {
      for (const t of e)
        t instanceof C ? h(this, p, i(this, p).concat(t.monoms)) : t instanceof M ? i(this, p).push(t.clone()) : typeof t == "number" && Number.isSafeInteger(t) ? i(this, p).push(new M(t.toString())) : i(this, p).push(new M(t));
      return this.reduce();
    });
    o(this, "commonMonom", () => {
      const e = new M().one(), t = this.gcdNumerator(), s = this.gcdDenominator(), r = this.degree();
      e.coefficient = new c(t, s);
      for (const n of this.variables) {
        e.setLetter(n, r);
        for (const l of i(this, p))
          if (e.setLetter(n, c.min(l.degree(n), e.degree(n))), e.degree(n).isZero())
            break;
      }
      return e;
    });
    o(this, "degree", (e) => {
      let t = new c().zero();
      for (const s of i(this, p))
        t = c.max(s.degree(e).value, t);
      return t;
    });
    o(this, "derivative", (e) => {
      const t = new C();
      for (const s of i(this, p))
        t.add(s.derivative(e));
      return t;
    });
    o(this, "divide", (e) => {
      if (e instanceof c)
        return this._divideByFraction(e);
      if (typeof e == "number" && Number.isSafeInteger(e))
        return this._divideByInteger(e);
      if (e instanceof M)
        return this.divide(new C(e));
      if (e instanceof C) {
        if (e.monoms.length === 1 && e.variables.length === 0)
          return this._divideByFraction(e.monoms[0].coefficient);
        {
          const { quotient: t, reminder: s } = this.euclidean(e);
          if (s.isZero())
            return t;
        }
      }
      throw new Error("Cannot divide by ${value.toString}");
    });
    o(this, "empty", () => (h(this, p, []), this));
    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    o(this, "euclidean", (e) => {
      const t = e.variables[0], s = new C().zero(), r = this.clone().reorder(t);
      if (e.variables.length === 0)
        return {
          quotient: this.clone().divide(e).reduce(),
          reminder: new C().zero()
        };
      const n = e.monomByDegree(void 0, t), l = e.degree(t);
      let u, v = this.degree(t).value * 2;
      for (; r.degree(t).isGeq(l) && v > 0 && (v--, u = r.monomByDegree(void 0, t).clone().divide(n), !(!u.isZero() && (s.add(u), r.subtract(e.clone().multiply(u)).reduce(), u.degree(t).isZero()))); )
        ;
      return s.reduce(), r.reduce(), { quotient: s, reminder: r };
    });
    o(this, "evaluate", (e, t) => {
      if (t)
        return this._evaluateAsNumeric(e);
      const s = new c().zero();
      return i(this, p).forEach((r) => {
        s.add(r.evaluate(e, t));
      }), s;
    });
    // -------------------------------------
    /**
     * Factorize a polynom and store the best results in factors.
     * @param maxValue Defines the greatest value to search to (default is 20).
     */
    o(this, "factorize", (e) => {
      let t = [], s = this.clone().reorder();
      const r = s.commonMonom();
      if (s.monomByDegree().coefficient.isStrictlyNegative() && r.coefficient.isStrictlyPositive() && !r.isOne() && r.opposite(), !r.isOne()) {
        const u = new C(r);
        t = [u.clone()], s = s.euclidean(u).quotient;
      }
      let n = s.degree().clone().multiply(2).value, l = 1;
      for (; n >= 0; )
        if (n--, s.monoms.length < 2) {
          s.isOne() || (t.push(s.clone()), s.one());
          break;
        } else if (s.degree(e).isOne()) {
          t.push(s.clone()), s.one();
          break;
        } else {
          let u = this._getAllPotentialFactors(s, l, e ?? "x");
          for (l = s.degree(e).value; u.length > 0; ) {
            const v = u[0];
            if (!s.isDividableBy(v))
              u.shift();
            else {
              const d = s.euclidean(v);
              t.push(v), s = d.quotient.clone(), u = u.filter((w) => {
                const x = s.monoms[0], R = s.monoms[s.monoms.length - 1], V = w.monoms[0], U = w.monoms[w.monoms.length - 1];
                return R.isDivisible(U) ? x.isDivisible(V) : !1;
              });
            }
          }
        }
      return s.isOne() || t.push(s.clone()), h(this, Ce, t), i(this, Ce);
    });
    o(this, "gcdDenominator", () => j.gcd(...this.getDenominators()));
    o(this, "gcdNumerator", () => j.gcd(...this.getNumerators()));
    // Next functions are used for for commonMonom, which is used in the factorize method.
    o(this, "getDenominators", () => {
      const e = [];
      for (const t of i(this, p))
        e.push(t.coefficient.denominator);
      return e;
    });
    o(this, "getNumerators", () => {
      const e = [];
      for (const t of i(this, p))
        e.push(t.coefficient.numerator);
      return e;
    });
    o(this, "getZeroes", () => new Je(
      new re(this, 0)
    ).solve());
    o(this, "integrate", (e, t, s = "x") => {
      const r = this.primitive(s), n = {}, l = {};
      return n[s] = new c(e), l[s] = new c(t), r.evaluate(l).subtract(r.evaluate(n));
    });
    o(this, "isDeveloped", (e) => {
      let t;
      const s = e.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
      if (s.includes("(") || s.includes(")"))
        return !1;
      try {
        t = new C(e);
      } catch {
        return !1;
      }
      return !!this.isEqual(t);
    });
    o(this, "isDividableBy", (e) => {
      if (e.degree().isOne()) {
        const t = e.getZeroes()[0];
        return t.exact instanceof c ? this.evaluate(t.exact).isZero() : !1;
      } else {
        const { reminder: t } = this.euclidean(e);
        return t.isZero();
      }
    });
    o(this, "isEqual", (e) => this._compare(e, "="));
    o(this, "isOppositeAt", (e) => this._compare(e.clone().opposite(), "="));
    o(this, "isReduced", (e) => {
      if (!this.isDeveloped(e))
        return !1;
      const t = new C(e);
      if (t.monoms.length > this.monoms.length)
        return !1;
      for (const s of t.monoms)
        if (!s.coefficient.isReduced())
          return !1;
      return !1;
    });
    o(this, "isSameAs", (e) => this._compare(e, "same"));
    o(this, "lcmDenominator", () => j.lcm(...this.getDenominators()));
    o(this, "lcmNumerator", () => j.lcm(...this.getNumerators()));
    o(this, "letters", () => {
      let e = /* @__PURE__ */ new Set();
      for (const t of i(this, p))
        e = /* @__PURE__ */ new Set([...e, ...t.variables]);
      return [...e];
    });
    o(this, "limitToInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), s = t.coefficient.sign(), r = t.degree(e);
      return r.isStrictlyPositive() ? s === 1 ? new c().infinite() : new c().infinite().opposite() : r.isZero() ? t.coefficient : new c().zero();
    });
    o(this, "limitToNegativeInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), s = t.coefficient.sign(), r = t.degree(e);
      return r.isStrictlyPositive() ? s === -1 ? new c().infinite() : new c().infinite().opposite() : r.isZero() ? t.coefficient : new c().zero();
    });
    o(this, "monomByDegree", (e, t) => {
      if (e === void 0)
        return this.monomByDegree(this.degree(t), t);
      const s = this.clone().reduce();
      for (const r of i(s, p))
        if (r.degree(t).isEqual(e))
          return r.clone();
      return new M().zero();
    });
    // Used in LinearSystem.tex
    o(this, "monomByLetter", (e) => {
      const t = this.clone().reduce();
      for (const s of i(t, p))
        if (s.hasVariable(e))
          return s.clone();
      return new M().zero();
    });
    o(this, "monomsByDegree", (e, t) => {
      if (e === void 0)
        return this.monomsByDegree(this.degree(t));
      const s = [], r = this.clone().reduce();
      for (const n of i(r, p))
        n.degree(t) === e && s.push(n.clone());
      return s;
    });
    o(this, "multiply", (e) => e instanceof C ? this._multiplyByPolynom(e) : e instanceof c ? this._multiplyByFraction(e) : e instanceof M ? this._multiplyByMonom(e) : Number.isSafeInteger(e) && typeof e == "number" ? this._multiplyByInteger(e) : this);
    o(this, "one", () => (h(this, p, []), i(this, p).push(new M().one()), this));
    // ------------------------------------------
    o(this, "opposite", () => (h(this, p, i(this, p).map((e) => e.opposite())), this));
    o(this, "pow", (e) => {
      if (!Number.isSafeInteger(e))
        return this.zero();
      if (e < 0)
        return this.zero();
      if (e === 0)
        return new C();
      const t = this.clone();
      for (let s = 1; s < e; s++)
        this.multiply(t);
      return this.reduce();
    });
    o(this, "primitive", (e) => {
      const t = new C();
      for (const s of i(this, p))
        t.add(s.primitive(e));
      return t;
    });
    o(this, "reduce", () => {
      let e = 0;
      for (; e < i(this, p).length; ) {
        for (let t = e + 1; t < i(this, p).length; t++)
          i(this, p)[e].isSameAs(i(this, p)[t]) && (i(this, p)[e].add(i(this, p)[t]), i(this, p).splice(t, 1), i(this, p)[e].isZero() && (i(this, p)[e] = new M().zero()), t--);
        e++;
      }
      h(this, p, i(this, p).filter((t) => !t.coefficient.isZero()));
      for (const t of i(this, p))
        t.coefficient.reduce();
      return this.length === 0 ? new C().zero() : this.reorder();
    });
    o(this, "reorder", (e = "x", t) => {
      t === void 0 && (t = !1);
      const s = this.variables.filter((r) => r !== e);
      return i(this, p).sort(function(r, n) {
        const l = r.degree(e).value, u = n.degree(e).value;
        if (l !== u)
          return t ? l - u : u - l;
        if (s.length > 0)
          for (const v of s) {
            const d = r.degree(v).value, w = n.degree(v).value;
            if (d !== w)
              return t ? d - w : w - d;
          }
        return 0;
      }), this;
    });
    /**
     * Replace a variable (letter) by a polynom.
     * @param letter
     * @param P
     */
    o(this, "replaceBy", (e, t) => {
      let s;
      const r = new C().zero();
      for (const n of this.monoms)
        !n.hasVariable(e) || n.literal[e].isZero() ? r.add(n.clone()) : (s = n.literal[e].clone(), n.removeVariable(e), r.add(t.clone().pow(Math.abs(s.numerator)).multiply(n)));
      return h(this, p, r.reduce().monoms), this;
    });
    o(this, "subtract", (...e) => {
      for (const t of e)
        t instanceof C ? this.add(t.clone().opposite()) : t instanceof M ? i(this, p).push(t.clone().opposite()) : i(this, p).push(new M(t).opposite());
      return this.reduce();
    });
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    o(this, "zero", () => (h(this, p, []), i(this, p).push(new M().zero()), this));
    // #endregion Getters And Setters (22)
    // #region Private methods (15)
    o(this, "_compare", (e, t) => {
      t === void 0 && (t = "=");
      const s = this.clone().reduce(), r = e.clone().reduce();
      switch (t) {
        case "=":
          return s.length !== r.length || s.degree().isNotEqual(r.degree()) ? !1 : s.monoms.every((n, l) => n.isEqual(r.monoms[l]));
        case "same":
          return s.length !== r.length || !s.degree().isEqual(r.degree()) ? !1 : s.monoms.every((n, l) => n.isSameAs(r.monoms[l]));
        default:
          return !1;
      }
    });
    o(this, "_divideByFraction", (e) => {
      for (const t of i(this, p))
        t.coefficient.divide(e);
      return this;
    });
    o(this, "_divideByInteger", (e) => {
      const t = new c(e);
      for (const s of i(this, p))
        s.coefficient.divide(t);
      return this;
    });
    o(this, "_evaluateAsNumeric", (e) => {
      let t = 0;
      return i(this, p).forEach((s) => {
        t += s.evaluate(e, !0);
      }), t;
    });
    o(this, "_factorize2ndDegree", (e) => {
      let t, s, r, n, l, u, v, d, w;
      if (this.numberOfVars === 1)
        return r = this.monomByDegree(2, e).coefficient, n = this.monomByDegree(1, e).coefficient, l = this.monomByDegree(0, e).coefficient, u = n.clone().pow(2).subtract(r.clone().multiply(l).multiply(4)), u.isZero() ? (v = n.clone().opposite().divide(r.clone().multiply(2)), t = new C(e).subtract(v.display).multiply(v.denominator), s = new C(e).subtract(v.display).multiply(v.denominator), w = r.divide(v.denominator).divide(v.denominator), w.isOne() ? [t, s] : [new C(w.display), t, s]) : u.isPositive() && u.isSquare() ? (v = n.clone().opposite().add(u.clone().sqrt()).divide(r.clone().multiply(2)), d = n.clone().opposite().subtract(u.clone().sqrt()).divide(r.clone().multiply(2)), w = r.divide(v.denominator).divide(d.denominator), w.isOne() ? [
          new C(e).subtract(v.display).multiply(v.denominator),
          new C(e).subtract(d.display).multiply(d.denominator)
        ] : [
          new C(w.display),
          new C(e).subtract(v.display).multiply(v.denominator),
          new C(e).subtract(d.display).multiply(d.denominator)
        ]) : [this.clone()];
      if (r = this.monomByDegree(2, e), n = this.monomByDegree(1, e), l = this.monomByDegree(0, e), r.isLiteralSquare() && l.isLiteralSquare() && n.clone().pow(2).isSameAs(r.clone().multiply(l))) {
        const R = new C("x", r.coefficient, n.coefficient, l.coefficient)._factorize2ndDegree("x"), V = [];
        let U;
        if (R.length >= 2) {
          for (const ne of R)
            ne.degree().isZero() ? V.push(ne.clone()) : (U = ne.clone(), U.monoms[0].literal = r.literalSqrt, U.monoms[1].literal = l.literalSqrt, V.push(U.clone()));
          return V;
        }
      }
      return [this.clone()];
    });
    o(this, "_factorizeByGroups", () => []);
    o(this, "_getAllPotentialFactors", (e, t, s) => {
      const r = e.monoms[0].dividers, n = e.monoms[e.monoms.length - 1].dividers, l = [];
      return r.forEach((u) => {
        u.degree(s).isLeq(t) && n.forEach((v) => {
          u.degree(s).isNotEqual(v.degree(s)) && (l.push(new C(u, v)), l.push(new C(u, v.clone().opposite())));
        });
      }), l;
    });
    o(this, "_multiplyByFraction", (e) => {
      for (const t of i(this, p))
        t.coefficient.multiply(e);
      return this.reduce();
    });
    o(this, "_multiplyByInteger", (e) => this._multiplyByFraction(new c(e)));
    o(this, "_multiplyByMonom", (e) => {
      for (const t of i(this, p))
        t.multiply(e);
      return this.reduce();
    });
    o(this, "_multiplyByPolynom", (e) => {
      const t = [];
      for (const s of i(this, p))
        for (const r of e.monoms)
          t.push(M.xMultiply(s, r));
      return h(this, p, t), this.reduce();
    });
    o(this, "_shutingYard_addToken", (e, t) => {
      switch (t.tokenType) {
        case f.COEFFICIENT:
          e.push(new C(t.token));
          break;
        case f.VARIABLE:
          e.push(new C().add(new M(t.token)));
          break;
        case f.CONSTANT:
          console.log("Actually, not supported - will be added later !");
          break;
        case f.OPERATION:
          if (e.length >= 2) {
            const s = e.pop(), r = e.pop();
            if (r === void 0 || s === void 0)
              break;
            if (t.token === "+")
              e.push(r.add(s));
            else if (t.token === "-")
              e.push(r.subtract(s));
            else if (t.token === "*")
              e.push(r.multiply(s));
            else if (t.token === "/")
              s.degree().isStrictlyPositive() ? console.log("divide by a polynom -> should create a rational polynom !") : e.push(r.divide(s.monoms[0].coefficient));
            else if (t.token === "^")
              if (s.degree().isStrictlyPositive())
                console.error("Cannot elevate a polynom with another polynom !", r.tex, s.tex);
              else if (s.monoms[0].coefficient.isRelative())
                e.push(r.pow(s.monoms[0].coefficient.value));
              else if (r.monoms.length === 1 && r.monoms[0].coefficient.isOne()) {
                for (const n in r.monoms[0].literal)
                  r.monoms[0].literal[n].multiply(s.monoms[0].coefficient);
                e.push(r);
              } else
                console.error("Cannot have power with fraction");
          } else if (t.token === "-") {
            const s = e.pop();
            s && e.push(s.opposite());
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
    });
    o(this, "genDisplay", (e, t, s, r) => {
      let n = "";
      for (const l of i(this, p)) {
        if (l.coefficient.value === 0)
          continue;
        let u;
        r ? u = l.plotFunction : u = e === "tex" ? l.tex : l.display, n += `${l.coefficient.sign() === 1 && (n !== "" || t === !0) ? "+" : ""}${u}`;
      }
      return s === !0 && this.length > 1 && (e === "tex" ? n = `\\left( ${n} \\right)` : n = `(${n})`), n === "" && (n = "0"), n;
    });
    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    o(this, "_shutingYardToReducedPolynom", (e) => {
      const s = new qt().parse(e).rpn;
      this.zero();
      const r = [];
      for (const n of s)
        this._shutingYard_addToken(r, n);
      return r.length === 1 && this.add(r[0]), this.reorder();
    });
    return h(this, p, []), h(this, Ce, []), e !== void 0 && this.parse(e, ...t), this;
  }
  hasVariable(e) {
    return this.variables.includes(e);
  }
  inverse() {
  }
  isOne() {
    return i(this, p).length === 1 && i(this, p)[0].coefficient.isOne();
  }
  isZero() {
    return i(this, p).length === 1 && i(this, p)[0].coefficient.isZero() || i(this, p).length === 0;
  }
  root() {
    throw new Error("Cannot take the root from a polynom");
  }
  sqrt() {
    throw new Error("Cannot take the square root from a polynom");
  }
  // #endregion Properties and methods (49)
  // #region Getters And Setters (22)
  // ------------------------------------------
  get display() {
    return this.genDisplay();
  }
  get isMultiVariable() {
    return i(this, p).some((e) => e.variables.length > 1);
  }
  get length() {
    return i(this, p).length;
  }
  // ------------------------------------------
  get monoms() {
    return i(this, p);
  }
  set monoms(e) {
    h(this, p, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get plotFunction() {
    return this.genDisplay("tex", !1, !1, !0);
  }
  get tex() {
    return this.genDisplay("tex");
  }
  get variables() {
    let e = [];
    for (const t of i(this, p))
      e = e.concat(t.variables);
    return e = [...new Set(e)], e.sort(), e;
  }
  get zeroes() {
    return this.getZeroes();
  }
  _parseString(e, ...t) {
    if (t.length === 0) {
      if (e = "" + e, e !== "" && !isNaN(Number(e))) {
        this.empty();
        const s = new M(e);
        return this.add(s), this;
      }
      return this._shutingYardToReducedPolynom(e);
    } else if (/^[a-z]+/.test(e)) {
      this.empty();
      const s = t.map((r) => new c(r));
      if (e.length > 1) {
        const r = e.split("");
        let n = 0;
        for (const l of s) {
          const u = new M();
          u.coefficient = l.clone(), u.literalStr = r[n] || "", this.add(u), n++;
        }
      } else {
        let r = s.length - 1;
        for (const n of s) {
          const l = new M();
          l.coefficient = n.clone(), l.literalStr = `${e}^${r}`, this.add(l), r--;
        }
      }
      return this;
    } else
      return this.zero();
  }
  // #endregion Private methods (15)
};
Ce = new WeakMap(), p = new WeakMap();
let A = C;
var ae, Re, P, fe, je, Mt, It, Ct, ft, Bt;
const bt = class bt {
  constructor(e, t = "x") {
    b(this, P);
    b(this, ae);
    b(this, Re);
    h(this, ae, e), h(this, Re, t);
  }
  solve() {
    if (i(this, ae).degree().isOne())
      return I(this, P, Mt).call(this);
    if (i(this, ae).degree().value === 2)
      return I(this, P, It).call(this);
    const e = I(this, P, Bt).call(this);
    if (e.length > 0)
      return e;
    if (i(this, ae).degree().value === 3)
      return I(this, P, ft).call(this);
    throw new Error("The equation degree is too high.");
  }
  solveAsCardan() {
    if (i(this, ae).degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return I(this, P, ft).call(this);
  }
};
ae = new WeakMap(), Re = new WeakMap(), P = new WeakSet(), fe = function(e) {
  if (e instanceof c && e.isApproximative())
    return I(this, P, je).call(this, e.value);
  const t = new c(e);
  return {
    variable: i(this, Re),
    exact: t,
    value: t.value,
    tex: t.tex,
    display: t.display
  };
}, je = function(e, t) {
  return {
    variable: i(this, Re),
    exact: !1,
    value: +e.toFixed(10),
    tex: (t == null ? void 0 : t.tex) ?? "",
    display: (t == null ? void 0 : t.display) ?? ""
  };
}, Mt = function() {
  const e = i(this, ae).moveLeft().left, t = e.monomByDegree(0).coefficient.clone().opposite().divide(e.monomByDegree(1).coefficient);
  return [
    I(this, P, fe).call(this, t)
  ];
}, It = function() {
  const e = i(this, ae).moveLeft().left, t = e.monomByDegree(2).coefficient, s = e.monomByDegree(1).coefficient, r = e.monomByDegree(0).coefficient, n = s.clone().pow(2).subtract(t.clone().multiply(r).multiply(4));
  if (n.isNegative())
    return [];
  if (n.isSquare()) {
    const l = n.sqrt(), u = s.clone().opposite().add(l).divide(t.clone().multiply(2)), v = s.clone().opposite().subtract(l).divide(t.clone().multiply(2));
    return l.isZero() ? [I(this, P, fe).call(this, u)] : [
      I(this, P, fe).call(this, u),
      I(this, P, fe).call(this, v)
    ].sort((d, w) => d.value - w.value);
  }
  return I(this, P, Ct).call(this, t, s, n);
}, Ct = function(e, t, s) {
  const r = j.dividers(s.value).filter((ce) => Math.sqrt(ce) % 1 === 0).map((ce) => Math.sqrt(ce)).pop() ?? 1, n = j.gcd(2 * e.value, t.value, r) * (e.isNegative() ? -1 : 1), l = t.clone().divide(n).opposite(), u = e.clone().divide(n).multiply(2), v = s.clone().divide(r ** 2), d = Math.abs(r / n), w = r === 1 ? "-" : `-${d} `, x = r === 1 ? "+" : `+${d} `;
  function R(ce, oe, De, lt) {
    return `\\frac{ ${oe} ${De}\\sqrt{ ${lt} } }{ ${ce} }`;
  }
  function V(ce, oe, De, lt) {
    return `(${oe}${De}sqrt(${lt}))/${ce}`;
  }
  const U = s.value ** 0.5, ne = (-t.value - U) / (2 * e.value), Te = (-t.value + U) / (2 * e.value);
  return [
    I(this, P, je).call(this, ne, {
      tex: R(u.tex, l.tex, w.toString(), v.tex),
      display: V(u.display, l.display, w.toString(), v.display)
    }),
    I(this, P, je).call(this, Te, {
      tex: R(u.tex, l.tex, x.toString(), v.tex),
      display: V(u.display, l.display, x.toString(), v.display)
    })
  ].sort((ce, oe) => ce.value - oe.value);
}, ft = function() {
  const e = i(this, ae).moveLeft().left, t = e.monomByDegree(3).coefficient, s = e.monomByDegree(2).coefficient, r = e.monomByDegree(1).coefficient, n = e.monomByDegree(0).coefficient, l = s.clone().divide(t), u = r.clone().divide(t), v = n.clone().divide(t), d = u.clone().subtract(l.clone().pow(2).divide(3)), w = v.clone().subtract(l.clone().multiply(u).divide(3)).add(l.clone().pow(3).multiply(2).divide(27)), x = w.clone().opposite(), R = d.clone().opposite().pow(3).divide(27), V = x.clone().pow(2).subtract(R.clone().multiply(4)).opposite();
  if (V.isNegative()) {
    const U = w.clone().opposite().add(V.clone().opposite().sqrt()).divide(2).root(3), ne = w.clone().opposite().subtract(V.clone().opposite().sqrt()).divide(2).root(3), Te = U.clone().add(ne).subtract(l.clone().divide(3));
    return [I(this, P, fe).call(this, Te)];
  }
  if (V.isZero()) {
    const U = w.clone().opposite().divide(2).root(3), ne = U.clone().opposite().subtract(l.clone().divide(3)), Te = U.clone().multiply(2).subtract(l.clone().divide(3));
    return ne.isEqual(Te) ? [I(this, P, fe).call(this, ne)] : [
      I(this, P, fe).call(this, Te),
      I(this, P, fe).call(this, ne)
    ].sort((ce, oe) => ce.value - oe.value);
  }
  if (V.isPositive()) {
    const U = [], ne = d.value, Te = w.value, ce = l.value;
    for (let oe = 0; oe < 3; oe++)
      U.push(2 * Math.sqrt(-ne / 3) * Math.cos(Math.acos(3 * Te / (2 * ne) * Math.sqrt(-3 / ne)) / 3 + 2 * Math.PI * oe / 3) - ce / 3);
    return U.map((oe) => I(this, P, je).call(this, oe)).sort((oe, De) => oe.value - De.value);
  }
  return [];
}, Bt = function() {
  i(this, ae).moveLeft();
  let e = i(this, ae).left.clone(), t = [];
  const s = e.lcmDenominator();
  s !== 1 && e.multiply(s);
  const r = e.monomByDegree().coefficient;
  let n = e.monomByDegree(0).coefficient;
  const l = new A("x");
  for (; n.isZero(); )
    t.length === 0 && t.push(I(this, P, fe).call(this, 0)), e = e.divide(l), n = e.monomByDegree(0).coefficient;
  const u = j.dividers(r.value), v = j.dividers(n.value);
  for (const x of u)
    for (const R of v) {
      const V = new c(R, x);
      e.evaluate(V).isZero() && !t.find((U) => U.value === V.value) && t.push(I(this, P, fe).call(this, V)), V.opposite(), e.evaluate(V).isZero() && !t.find((U) => U.value === V.value) && t.push(I(this, P, fe).call(this, V));
    }
  for (const x of t) {
    if (x.exact !== !1 && x.exact.isZero())
      continue;
    const R = new A("x", x.exact.denominator, -x.exact.numerator);
    for (; e.isDividableBy(R); )
      e = e.divide(R);
  }
  if (e.degree().isZero())
    return t.sort((x, R) => x.value - R.value);
  if (e.degree().value > 3)
    return [];
  const d = i(this, ae).clone();
  d.left = e;
  const w = new bt(d);
  return t = t.concat(w.solve()), t.sort((x, R) => x.value - R.value);
};
let Je = bt;
var Ge, T, q, L;
const ye = class ye {
  constructor(e, t, s) {
    // #region Class fields (6)
    // TODO: Randomize defaults should be something else...
    b(this, Ge, {
      degree: 2
    });
    // Left part of the equation
    b(this, T);
    // Right part of the equation
    b(this, q);
    // Signe of the equation
    b(this, L);
    // #endregion Constructors (3)
    // #region Properties and methods (26)
    // ------------------------------------------
    o(this, "parse", (e) => {
      const t = this._findSign(e);
      if (t === !1)
        throw new Error("The equation is not valid (no sign found)");
      const s = e.split(t);
      return this.create(new A(s[0]), new A(s[1]), this._formatSign(t));
    });
    o(this, "create", (e, t, s) => (h(this, T, e), h(this, q, t), h(this, L, this._formatSign(s ?? "=")), this));
    o(this, "clone", () => new ye(i(this, T).clone(), i(this, q).clone(), i(this, L)));
    /**
     * Get the degree of the equation
     * @param letter
     */
    o(this, "degree", (e) => c.max(i(this, T).degree(e), i(this, q).degree(e)));
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
    o(this, "divide", (e) => {
      const t = new c(e);
      return t.isZero() ? this : this.multiply(t.inverse());
    });
    /**
     * Determine if the equation contains a variable.
     * @param letter
     */
    o(this, "hasVariable", (e) => this.variables.includes(e));
    o(this, "isLinearTo", (e) => {
      const t = e.clone().moveLeft().simplify().left, s = this.clone().moveLeft().simplify().left;
      return t.isEqual(s) || t.isOppositeAt(s);
    });
    /**
     * Determine if the equation contains more than one letter/variable.
     */
    o(this, "isMultiVariable", () => i(this, T).isMultiVariable || i(this, q).isMultiVariable);
    // -----------------------------------------------
    // Equations helpers
    o(this, "isEqualTo", (e) => {
      const t = e.clone().moveLeft().left, s = this.clone().moveLeft().left;
      return t.isEqual(s) || t.isOppositeAt(s);
    });
    /**
     * Reorder the polynom to have only one letter on the left, the rest on the right.
     * @param letter
     */
    o(this, "isolate", (e) => {
      if (!this.degree(e).isOne() || this.isMultiVariable())
        return !1;
      let t;
      i(this, T).subtract(i(this, q)), i(this, q).zero();
      const s = [...i(this, T).monoms];
      for (const n of s)
        n.hasVariable(e) || (t = n.clone(), i(this, T).subtract(t), i(this, q).subtract(t));
      if (i(this, T).length !== 1)
        return !1;
      const r = i(this, T).monoms[0].coefficient.clone();
      return i(this, T).divide(r), i(this, q).divide(r), this;
    });
    // -----------------------------------------------
    // Equations operations
    // -----------------------------------------------
    o(this, "letters", () => [.../* @__PURE__ */ new Set([...i(this, T).letters(), ...i(this, q).letters()])]);
    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    o(this, "moveLeft", () => (i(this, T).subtract(i(this, q)), i(this, q).zero(), this));
    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    o(this, "multiply", (e) => {
      const t = new c(e);
      return i(this, T).multiply(t), i(this, q).multiply(t), i(this, L) !== "=" && t.sign() === -1 && this._reverseSign(), this;
    });
    o(this, "opposite", () => (h(this, T, i(this, T).opposite()), h(this, q, i(this, q).opposite()), this));
    o(this, "reorder", (e) => (i(this, T).subtract(i(this, q)), i(this, q).zero(), i(this, T).reorder(), e ? this : (i(this, T).monoms.filter((t) => t.degree().isZero()).forEach((t) => {
      const s = t.clone();
      i(this, T).subtract(s), i(this, q).subtract(s);
    }), i(this, T).reorder(), i(this, q).reorder(), this)));
    // ------------------------------------------
    o(this, "replaceBy", (e, t) => (i(this, T).replaceBy(e, t), i(this, q).replaceBy(e, t), this));
    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    o(this, "simplify", () => (this.multiply(j.lcm(...i(this, T).getDenominators(), ...i(this, q).getDenominators())), this.divide(j.gcd(...i(this, T).getNumerators(), ...i(this, q).getNumerators())), this));
    // -----------------------------------------------
    o(this, "solve", () => new Je(this.clone()).solve());
    o(this, "test", (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e)));
    // #endregion Getters And Setters (13)
    // #region Private methods (6)
    o(this, "_findSign", (e) => {
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
    });
    // -----------------------------------------------
    // Equations solving algorithms
    o(this, "_formatSign", (e) => e === void 0 ? "=" : e.includes("geq") || e.includes(">=") || e.includes("=>") ? ">=" : e.includes(">") ? ">" : e.includes("leq") || e.includes("<=") || e.includes("=<") ? "<=" : e.includes("<") ? "<" : "=");
    o(this, "_reverseSign", () => i(this, L) === "=" ? this : i(this, L).includes("<") ? (i(this, L).replace("<", ">"), this) : i(this, L).includes(">") ? (i(this, L).replace(">", "<"), this) : this);
    o(this, "isAlsoEqual", () => !!(i(this, L).includes("=") || i(this, L).includes("geq") || i(this, L).includes("leq")));
    o(this, "isGreater", () => i(this, L).includes(">") ? !0 : i(this, L).includes("geq"));
    o(this, "isStrictEqual", () => i(this, L) === "=");
    if (h(this, T, new A().zero()), h(this, q, new A().zero()), h(this, L, "="), e !== void 0 && t === void 0) {
      if (e instanceof ye)
        return e.clone();
      typeof e == "string" && this.parse(e);
    } else e !== void 0 && t !== void 0 && (this.left = new A(e), this.right = new A(t));
    return s !== void 0 && (this.sign = s), this;
  }
  /**
   * Add a value to the equation
   * if value is an equation, add the left part to the left part of the equation
   * and the right part to the right part of the equation
   * if value is a string, try to create an equation
   * if it fails, create a polynom and add it to the left and right part of the equation
   * @param Equation | Polynom | Monom | Fraction | string | monom
   */
  add(e) {
    if (e instanceof ye)
      return i(this, T).add(e.left), i(this, q).add(e.right), this;
    if (typeof e == "string" && !ye.isEquationString(e))
      return this.add(new ye(e));
    const t = new A(e);
    return i(this, T).add(t), i(this, q).add(t), this;
  }
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param values
   * @param asNumeric
   */
  evaluate(e, t) {
    const s = i(this, T).evaluate(e, t), r = i(this, q).evaluate(e, t);
    return t ? s === r : s.isEqual(r);
  }
  pow(e) {
    return i(this, T).pow(e), i(this, q).pow(e), this;
  }
  reduce() {
    return this.moveLeft(), i(this, T).reduce(), this.simplify(), i(this, T).monoms[0].coefficient.isNegative() && this.multiply(-1), this;
  }
  split() {
    return [i(this, T).clone(), i(this, q).clone()];
  }
  subtract(e) {
    if (e instanceof ye)
      return i(this, T).subtract(e.left), i(this, q).subtract(e.right), this;
    if (typeof e == "string" && !ye.isEquationString(e))
      return this.subtract(new ye(e));
    const t = new A(e);
    return i(this, T).subtract(t), i(this, q).subtract(t), this;
  }
  static isEquationString(e) {
    return e.includes("=") || e.includes("<") || e.includes(">") || e.includes("<=") || e.includes(">=");
  }
  static makeSolutionsUnique(e, t) {
    const s = [], r = e.filter((n) => s.includes(n.tex) ? !1 : (s.push(n.tex), !0));
    return t === !0 && r.sort((n, l) => n.value - l.value), r;
  }
  // #endregion Properties and methods (26)
  // #region Getters And Setters (13)
  get display() {
    return `${i(this, T).display}${this.signAsTex}${i(this, q).display}`;
  }
  // Getter and setter
  get left() {
    return i(this, T);
  }
  set left(e) {
    h(this, T, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  // Creation / parsing functions
  get randomizeDefaults() {
    return i(this, Ge);
  }
  set randomizeDefaults(e) {
    h(this, Ge, e);
  }
  get right() {
    return i(this, q);
  }
  set right(e) {
    h(this, q, e);
  }
  // ------------------------------------------
  get sign() {
    return i(this, L);
  }
  set sign(e) {
    h(this, L, this._formatSign(e));
  }
  get signAsTex() {
    return i(this, L) === ">=" ? "\\geq" : i(this, L) === "<=" ? "\\leq" : i(this, L);
  }
  get tex() {
    return `${i(this, T).tex}${this.signAsTex}${i(this, q).tex}`;
  }
  get variables() {
    return [...new Set(i(this, q).variables.concat(i(this, T).variables))];
  }
  // #endregion Private methods (6)
};
Ge = new WeakMap(), T = new WeakMap(), q = new WeakMap(), L = new WeakMap();
let re = ye;
function Et(a, e = !0) {
  return e ? `\\left( ${a} \\right)` : `(${a})`;
}
var ge, ze, we, ve;
const de = class de {
  constructor(e, t) {
    b(this, ge);
    b(this, ze, !1);
    b(this, we);
    b(this, ve);
    if (e instanceof de)
      h(this, we, e.polynom.clone()), h(this, ve, e.power.clone());
    else if (typeof e == "string" && t === void 0) {
      const [s, r = "1"] = e.split("^");
      h(this, we, new A(s)), h(this, ve, new c(r.replace("(", "").replace(")", "")));
    } else
      h(this, we, new A(e)), h(this, ve, new c(t ?? 1));
    return h(this, ge, 1), this;
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  clone() {
    return new de(this);
  }
  add() {
    throw new Error("Adding two factors is not possible");
  }
  get asPower() {
    return h(this, ge, 1), this;
  }
  get asRoot() {
    return h(this, ge, 0), this;
  }
  get asSingle() {
    return h(this, ze, !0), this;
  }
  degree(e) {
    return this.polynom.degree(e).multiply(this.power);
  }
  derivative() {
    return this.power.isZero() ? [new de("0", "1")] : this.power.isOne() ? [new de(this.polynom.clone().derivative())] : [
      new de(this.power.clone()),
      new de(this.polynom.clone().derivative()),
      new de(this.polynom.clone(), this.power.clone().subtract(1))
    ];
  }
  develop() {
    if (this.power.isNatural())
      return this.polynom.clone().pow(this.power.value);
    throw new Error("The power must be a natural number");
  }
  get display() {
    const e = this.power.numerator, t = this.power.denominator;
    let s, r;
    return i(this, ge) === 0 && t > 1 ? (s = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, r = Math.abs(e) === 1 ? "" : `^(${Math.abs(e)})`) : (s = i(this, ze) && this.power.isOne() ? this.polynom.display : Et(this.polynom.display, !1), r = t === 1 && Math.abs(e) === 1 ? "" : `^(${this.power.display})`), s = `${s}${r}`, i(this, ge) === 0 && e < 0 && (s = `1/(${s})`), s;
  }
  divide(e) {
    if (e instanceof de && this.isSameAs(e))
      return this.power.subtract(e.power), this;
    const t = new A(e);
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
    return e instanceof de ? t = e.polynom : e instanceof A ? t = e : t = new A(e), this.polynom.isEqual(t);
  }
  isZero() {
    return this.polynom.isZero();
  }
  multiply(e) {
    if (e instanceof de && this.isSameAs(e))
      return this.power.add(e.power), this;
    const t = new A(e);
    if (this.isSameAs(t))
      return this.power.add(1), this;
    throw new Error("The two factors must be the same");
  }
  one() {
    return i(this, we).one(), i(this, ve).one(), this;
  }
  opposite() {
    throw new Error("Method not implemented.");
  }
  get polynom() {
    return i(this, we);
  }
  set polynom(e) {
    h(this, we, e);
  }
  pow(e) {
    return this.power.multiply(e), this;
  }
  get power() {
    return i(this, ve);
  }
  set power(e) {
    h(this, ve, new c(e));
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
  get tex() {
    const e = this.power.numerator, t = this.power.denominator;
    let s, r;
    return i(this, ge) === 0 && t > 1 ? (s = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, r = Math.abs(e) === 1 ? "" : `^{ ${Math.abs(e)} }`) : (s = i(this, ze) && this.power.isOne() ? this.polynom.tex : Et(this.polynom.tex), r = t === 1 && Math.abs(e) === 1 ? "" : `^{ ${this.power.tex} }`), s = `${s}${r}`, i(this, ge) === 0 && e < 0 && (s = `\\frac{ 1 }{ ${s} }`), s;
  }
  get variables() {
    return this.polynom.variables;
  }
  zero() {
    return i(this, we).zero(), i(this, ve).one(), this;
  }
};
ge = new WeakMap(), ze = new WeakMap(), we = new WeakMap(), ve = new WeakMap();
let he = de;
var Pe = /* @__PURE__ */ ((a) => (a[a.ROOT = 0] = "ROOT", a[a.POWER = 1] = "POWER", a))(Pe || {}), E, Be, We, pt;
const ue = class ue {
  // #endregion Class fields (1)
  // #region Constructors (1)
  constructor(...e) {
    // #region Class fields (1)
    b(this, E, []);
    b(this, Be, Pe.POWER);
    return this.parse(...e), this;
  }
  // #endregion Constructors (1)
  // #region Properties and methods (25)
  parse(...e) {
    return e.length === 0 ? this : (h(this, E, []), e.forEach((t) => {
      if (typeof t == "string") {
        const s = t.split(")(").join(")*(").split("*");
        i(this, E).push(...s.map((r) => new he(r)));
      } else t instanceof ue ? i(this, E).push(...t.factors.map((s) => s.clone())) : i(this, E).push(new he(t));
    }), this);
  }
  clone() {
    return new ue(...i(this, E).map((e) => e.clone()));
  }
  add(...e) {
    let t = [this, ...e];
    const s = ue.gcd(...t);
    t = t.map((n) => n.divide(s).reduce());
    const r = new A("0");
    return t.forEach((n) => r.add(n.develop())), h(this, E, [
      ...s.factors,
      new he(r)
    ]), this;
  }
  degree(e) {
    return i(this, E).reduce((t, s) => t.add(s.degree(e)), new c("0"));
  }
  derivative() {
    const e = [], t = i(this, E).length;
    for (let r = 0; r < t; r++) {
      const n = i(this, E).slice(), l = n.splice(r, 1)[0];
      e.push(new ue(...n).multiply(new ue(...l.derivative())));
    }
    e.forEach((r) => r.reduce());
    const s = e.shift();
    return s !== void 0 && h(this, E, s.factors), this.add(...e);
  }
  develop() {
    const e = new A("1");
    return i(this, E).forEach((t) => {
      e.multiply(t.develop());
    }), e;
  }
  divide(e) {
    return h(this, E, i(this, E).concat(e.clone().factors.map((t) => t.inverse()))), this;
  }
  evaluate(e, t) {
    return t ? i(this, E).reduce((s, r) => s * r.evaluate(e, t), 1) : i(this, E).reduce((s, r) => s.multiply(r.evaluate(e)), new c("1"));
  }
  hasVariable(e) {
    return i(this, E).some((t) => t.hasVariable(e));
  }
  inverse() {
    return h(this, E, i(this, E).map((e) => e.inverse())), this;
  }
  isEqual(e) {
    const t = ue.gcd(this, e), s = this.clone().divide(t).reduce(), r = e.clone().divide(t).reduce();
    return s.isOne() && r.isOne();
  }
  isOne() {
    return i(this, E).every((e) => e.isOne());
  }
  isZero() {
    return i(this, E).every((e) => e.isZero());
  }
  multiply(...e) {
    return e.forEach((t) => {
      h(this, E, i(this, E).concat(t.clone().factors));
    }), this;
  }
  one() {
    return h(this, E, [new he("1", "1")]), this;
  }
  opposite() {
    const e = i(this, E).findIndex((t) => t.display === "(-1)");
    return e >= 0 ? i(this, E).splice(e, 1) : i(this, E).push(new he("-1", "1")), this;
  }
  pow(e) {
    return h(this, E, i(this, E).map((t) => t.pow(e))), this;
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    const e = ut(this);
    return h(this, E, Object.values(e).map((t) => {
      const s = t[0].polynom, r = t.reduce((n, l) => n.add(l.power), new c("0"));
      return new he(s, r.reduce());
    }).filter((t) => !t.power.isZero())), this;
  }
  root(e) {
    return h(this, E, i(this, E).map((t) => t.root(e))), this;
  }
  sort() {
    return h(this, E, i(this, E).sort((e, t) => e.degree().isLeq(t.degree()) ? -1 : 1)), this;
  }
  sqrt() {
    return h(this, E, i(this, E).map((e) => e.sqrt())), this;
  }
  subtract(...e) {
    return this.add(...e.map((t) => t.opposite()));
  }
  zero() {
    return h(this, E, [new he("0", "1")]), this;
  }
  static gcd(...e) {
    var s;
    if (e.length === 0)
      return new ue().one();
    if (e.length === 1)
      return e[0];
    if (e.length === 2)
      return I(s = ue, We, pt).call(s, e[0], e[1]);
    let t = e[0];
    return e.shift(), e.forEach((r) => {
      var n;
      return t = I(n = ue, We, pt).call(n, t, r);
    }), t;
  }
  // #endregion Properties and methods (25)
  // #region Getters And Setters (5)
  get factors() {
    return i(this, E);
  }
  set factors(e) {
    h(this, E, e);
  }
  get variables() {
    return i(this, E).reduce((e, t) => e.concat(t.variables), []);
  }
  get asRoot() {
    return h(this, Be, Pe.ROOT), this;
  }
  get asPower() {
    return h(this, Be, Pe.POWER), this;
  }
  get numerator() {
    return i(this, E).filter((e) => e.power.isPositive());
  }
  get denominator() {
    return i(this, E).filter((e) => e.power.isNegative());
  }
  get display() {
    let e = [], t = [];
    if (i(this, Be) === Pe.ROOT ? (e = this.numerator, t = this.denominator.map((n) => n.clone().inverse())) : e = i(this, E), e.length === 0 && (e = [new he("1")]), t.length === 0)
      return e.length === 1 ? e[0].asSingle.display : e.map((n) => n.display).join("");
    const s = e.length === 1 ? e[0].asSingle.display : e.map((n) => n.display).join(""), r = t.length === 1 ? t[0].asSingle.display : t.map((n) => n.display).join("");
    return `(${s})/(${r})`;
  }
  get tex() {
    let e = [], t = [];
    if (i(this, Be) === Pe.ROOT ? (e = this.numerator, t = this.denominator.map((n) => n.clone().inverse())) : e = i(this, E), e.length === 0 && (e = [new he("1")]), t.length === 0)
      return e.length === 1 ? e[0].asSingle.tex : e.map((n) => n.tex).join("");
    const s = e.length === 1 ? e[0].asSingle.tex : e.map((n) => n.tex).join(""), r = t.length === 1 ? t[0].asSingle.tex : t.map((n) => n.tex).join("");
    return `\\frac{ ${s} }{ ${r} }`;
  }
  // #endregion Private methods (1)
};
E = new WeakMap(), Be = new WeakMap(), We = new WeakSet(), pt = function(e, t) {
  const s = ut(e), r = ut(t), l = Object.keys(s).filter((u) => Object.hasOwn(r, u)).map((u) => {
    const v = s[u].reduce((w, x) => w.add(x.power), new c("0")), d = r[u].reduce((w, x) => w.add(x.power), new c("0"));
    return new he(u, c.min(v, d));
  });
  return new ue(...l);
}, b(ue, We);
let dt = ue;
function ut(a) {
  const e = new c().one(), t = a.factors.reduce((s, r) => {
    if (r.polynom.degree().isZero())
      return r.polynom.monoms.length > 0 && e.multiply(r.polynom.monoms[0].coefficient), s;
    const n = r.polynom.display;
    return Object.hasOwn(s, n) ? s[n].push(r) : s[n] = [r], s;
  }, {});
  return e.isOne() || (t[e.display] = [new he(e.display, 1)]), t;
}
function ri(a, e) {
  return a.dimension === e.dimension && a.array.every(
    (t, s) => e.array[s].isEqual(t)
  );
}
function ni(a, e) {
  if (a.dimension !== e.dimension)
    return !1;
  const t = a.array[0].value / e.array[0].value;
  return a.array.every(
    (s, r) => e.array[r].value === t * s.value
  );
}
function oi(a, e) {
  return a.dimension !== e.dimension ? new c().invalid() : a.array.reduce(
    (t, s, r) => t.add(s.clone().multiply(e.array[r])),
    new c(0)
  );
}
var se, qe, tt;
const Ae = class Ae {
  constructor(...e) {
    b(this, se, []);
    b(this, qe, !1);
    o(this, "zero", () => (this.array.forEach((e) => e.zero()), this));
    o(this, "one", () => (this.array.forEach((e, t) => t === 1 ? e.one() : e.zero()), this));
    o(this, "opposite", () => (this.array.forEach((e) => e.opposite()), this));
    o(this, "add", (e) => (this.array.forEach((t, s) => t.add(e.array[s])), this));
    o(this, "subtract", (e) => this.add(e.clone().opposite()));
    o(this, "unit", () => {
      const e = this.norm;
      return e === 0 ? this : this.divideByScalar(e);
    });
    o(this, "dot", (e) => oi(this, e));
    o(this, "normal", () => {
      if (this.dimension >= 3)
        throw new Error("Normal vector can only be determined in 2D");
      const e = this.x.clone().opposite(), t = this.y.clone();
      return i(this, se)[0] = t, i(this, se)[1] = e, this;
    });
    o(this, "isEqual", (e) => ri(this, e));
    o(this, "isColinearTo", (e) => ni(this, e));
    o(this, "isNormalTo", (e) => this.dot(e).isZero());
    o(this, "multiplyByScalar", (e) => {
      const t = new c(e);
      return this.array.forEach((s) => s.multiply(t)), this;
    });
    o(this, "divideByScalar", (e) => this.multiplyByScalar(new c(e).inverse()));
    o(this, "simplify", () => this.multiplyByScalar(
      j.lcm(...this.array.map((e) => e.denominator))
    ).divideByScalar(
      j.gcd(...this.array.map((e) => e.numerator))
    ).multiplyByScalar(
      this.x.isNegative() ? -1 : 1
    ));
    o(this, "angle", (e, t, s) => {
      let r = this.dot(e).value;
      return t && (r = Math.abs(r)), (s ? 1 : 180 / Math.PI) * Math.acos(r / (this.norm * e.norm));
    });
    b(this, tt, (e) => {
      e.startsWith("(") && (e = e.substring(1)), e.endsWith(")") && (e = e.substring(0, e.length - 1));
      const t = e.split(/[,;\s]/g).filter((s) => s.trim() !== "");
      return t.length < 2 ? this : (h(this, se, t.map((s) => new c(s))), this);
    });
    e.length > 0 && this.parse(...e);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get array() {
    return i(this, se);
  }
  set array(e) {
    h(this, se, e);
  }
  get x() {
    return i(this, se)[0];
  }
  set x(e) {
    i(this, se)[0] = new c(e);
  }
  get y() {
    return i(this, se)[1];
  }
  set y(e) {
    i(this, se)[1] = new c(e);
  }
  get z() {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    return i(this, se)[2];
  }
  set z(e) {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    i(this, se)[2] = new c(e);
  }
  get asPoint() {
    return i(this, qe);
  }
  set asPoint(e) {
    h(this, qe, e);
  }
  get normSquare() {
    return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new c(0));
  }
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get tex() {
    return i(this, qe) ? `\\left(${this.array.map((e) => e.tex).join(";")}\\right)` : `\\begin{pmatrix} ${this.array.map((e) => e.tex).join(" \\\\ ")} \\end{pmatrix}`;
  }
  get display() {
    return i(this, qe) ? `(${this.array.map((e) => e.display).join(";")})` : `((${this.array.map((e) => e.display).join(",")}))`;
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
    return h(this, qe, e !== !1), this;
  }
  parse(...e) {
    if (e.length === 0)
      throw new Error("Invalid value");
    if (e.length === 1) {
      if (e[0] instanceof Ae)
        return e[0].clone();
      if (typeof e[0] == "string")
        return i(this, tt).call(this, e[0]);
      throw new Error("Invalid value");
    }
    if (e.length === 2) {
      const [t, s] = e;
      if (t instanceof Ae && s instanceof Ae) {
        if (t.dimension !== s.dimension)
          throw new Error("Vectors must have the same dimension");
        return h(this, se, s.array.map((r, n) => r.clone().subtract(t.array[n]))), this;
      }
    }
    return h(this, se, e.map((t) => new c(t))), this;
  }
  clone() {
    const e = new Ae();
    return e.array = this.copy(), e.asPoint = this.asPoint, e;
  }
  copy() {
    return this.array.map((e) => e.clone());
  }
  middleOf(e, t) {
    if (e.dimension !== t.dimension)
      throw new Error("Vectors must be the same dimension");
    return this.array = [], e.array.forEach((s, r) => {
      this.array.push(s.clone().add(t.array[r]).divide(2));
    }), this;
  }
  translate(...e) {
    return this.array.forEach((t, s) => t.add(e[s])), this;
  }
  cross(e) {
    if (this.dimension !== 3 || e.dimension !== 3)
      throw new Error("Cross product can only be determined in 3D");
    return new Ae(
      this.y.clone().multiply(e.z).subtract(this.z.clone().multiply(e.y)),
      this.z.clone().multiply(e.x).subtract(this.x.clone().multiply(e.z)),
      this.x.clone().multiply(e.y).subtract(this.y.clone().multiply(e.x))
    );
  }
  distanceTo(e) {
    const t = new Ae(this, e);
    return {
      value: t.norm,
      fraction: t.normSquare,
      tex: t.tex
    };
  }
};
se = new WeakMap(), qe = new WeakMap(), tt = new WeakMap();
let O = Ae;
function $t(a = 0.5) {
  return Math.random() < a;
}
function le(a, e, t) {
  if (e === void 0)
    return a >= 0 ? le(0, a) : le(a, 0);
  if (a === e)
    return a;
  if (t === void 0)
    return Math.floor(Math.random() * (e - a + 1) + a);
  if (Math.abs(e - a) <= t.length)
    throw new Error("The number of excluded values is too high.");
  let s = le(a, e);
  for (; t.includes(s); )
    s = le(a, e);
  return s;
}
function Y(a, e) {
  return e === !1 ? $t() ? le(1, a) : -le(1, a) : le(-a, a);
}
function ai(a) {
  let e = j.primes();
  return a !== void 0 && (e = e.filter((t) => t < a)), vt(e);
}
function hi(a, e) {
  return e === void 0 && (e = 1), a.length <= 0 ? Object.values(a) : Pt(a).slice(0, e);
}
function vt(a) {
  return a.length === 0 ? null : a[le(0, a.length - 1)];
}
function Pt(a) {
  const e = Object.values(a);
  for (let t = e.length - 1; t > 0; t--) {
    const s = Math.floor(Math.random() * (t + 1)), r = e[t];
    e[t] = e[s], e[s] = r;
  }
  return e;
}
class W extends O {
  constructor(...e) {
    super(), e.length > 0 && this.parse(...e);
  }
  parse(...e) {
    if (this.asPoint = !0, e.length === 0) {
      if (e[0] instanceof O)
        return this.array = e[0].copy(), this;
      if (typeof e[0] == "string") {
        const t = e[0].replaceAll("(", "").replaceAll(")", "").split(",").map((s) => new c(s));
        if (t.some((s) => s.isNaN()))
          throw new Error("The value is not a valid point sting (a,b): " + e[0]);
        this.array = t;
      }
    }
    if (e.length > 1) {
      if (e.some((s) => s instanceof O))
        throw new Error("Creating a point with  multiple argument requires an input fraction");
      const t = e.map((s) => new c(s));
      if (t.some((s) => s.isNaN()))
        throw new Error("The value is not a valid point sting (a,b): " + e.join(","));
      this.array = t;
    }
    return this;
  }
  clone() {
    const e = new W();
    return e.array = this.copy(), e.asPoint = !0, e;
  }
}
var St = /* @__PURE__ */ ((a) => (a.None = "none", a.Parallel = "parallel", a.Perpendicular = "perpendicular", a.Tangent = "tangent", a))(St || {}), Ee, S, z, Z, ee, H, Ne, pe;
const Ie = class Ie {
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...e) {
    b(this, Ee);
    // ax + by + c = 0
    b(this, S);
    b(this, z);
    b(this, Z);
    b(this, ee);
    b(this, H);
    b(this, Ne);
    b(this, pe, "canonical");
    o(this, "randomPoint", (e) => i(this, H).clone().multiplyByScalar(Y(e === void 0 || e <= 1 ? 3 : e, !1)).add(i(this, ee)));
    o(this, "randomNearPoint", (e) => {
      const t = this.randomPoint(e);
      let s = 10;
      for (; this.isOnLine(t) && s > 0; )
        t.x.add(Y(1, !1)), t.y.add(Y(1, !1)), s--;
      return t;
    });
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    /**
     * Parse data to a line
     * @param {any} values
     * @returns {Line}
     */
    o(this, "parse", (...e) => {
      if (e.length === 0)
        return this;
      if (e.length === 1) {
        if (e[0] instanceof Ie)
          return e[0].clone();
        if (e[0] instanceof re)
          return this.parseEquation(e[0]);
        if (typeof e[0] == "string")
          try {
            const t = new re(e[0]);
            return this.parse(t);
          } catch {
            return this;
          }
      }
      if (e.length === 2) {
        if (e[0] instanceof W && e[1] instanceof O)
          return this.parseByPointAndVector(e[0], e[1]);
        if (e[0] instanceof W && e[1] instanceof W)
          return this.parseByPointAndVector(e[0], new O(e[0], e[1]));
      }
      if (e.length === 3) {
        if (e[0] instanceof O && e[1] instanceof O) {
          if (e[2] === "perpendicular")
            return this.parseByPointAndNormal(e[0], e[1]);
          if (e[2] === "parallel")
            return this.parseByPointAndVector(e[0], e[1]);
        }
        return e[0] instanceof O && e[1] instanceof Ie ? e[2] === "parallel" || e[2] === null ? this.parseByPointAndLine(
          e[0],
          e[1],
          "parallel"
          /* Parallel */
        ) : this.parseByPointAndLine(
          e[0],
          e[1],
          "perpendicular"
          /* Perpendicular */
        ) : this.parseByCoefficient(
          e[0],
          e[1],
          e[2]
        );
      }
      return console.log("Something wrong happened while creating the line"), this;
    });
    o(this, "parseEquation", (e) => {
      e.reorder(!0);
      const t = new Set(e.letters());
      if (!(t.has("x") || t.has("y")))
        return this;
      for (const s of ["x", "y"])
        t.has(s) && t.delete(s);
      return t.size > 0 ? this : this.parseByCoefficient(e.left.monomByLetter("x").coefficient, e.left.monomByLetter("y").coefficient, e.left.monomByDegree(0).coefficient);
    });
    o(this, "parseByCoefficient", (e, t, s) => (h(this, S, new c(e)), h(this, z, new c(t)), h(this, Z, new c(s)), h(this, H, new O(i(this, z).clone(), i(this, S).clone().opposite())), h(this, ee, new O(new c().zero(), i(this, Z).clone())), h(this, Ne, i(this, H).clone().normal()), this));
    o(this, "parseByPointAndVector", (e, t) => (this.parseByCoefficient(
      t.y,
      t.x.clone().opposite(),
      e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)).opposite()
    ), h(this, ee, e.clone()), h(this, H, t.clone()), h(this, Ne, i(this, H).clone().normal()), this));
    o(this, "parseByPointAndNormal", (e, t) => this.parseByCoefficient(
      t.x,
      t.y,
      e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()
    ));
    o(this, "parseByPointAndLine", (e, t, s) => (s === void 0 && (s = "parallel"), s === "parallel" ? this.parseByPointAndNormal(e, t.normal) : s === "perpendicular" ? this.parseByPointAndNormal(e, t.director) : this));
    o(this, "clone", () => (h(this, S, i(this, S).clone()), h(this, z, i(this, z).clone()), h(this, Z, i(this, Z).clone()), h(this, H, i(this, H).clone()), h(this, ee, i(this, ee).clone()), h(this, Ne, i(this, Ne).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    o(this, "isOnLine", (e) => i(this, S).clone().multiply(e.x).add(
      i(this, z).clone().multiply(e.y)
    ).add(i(this, Z)).isZero());
    o(this, "isParallelTo", (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height));
    o(this, "isSameAs", (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height));
    o(this, "isPerpendicularTo", (e) => this.d.isNormalTo(e.d));
    o(this, "isVertical", () => this.slope.isInfinity());
    o(this, "simplify", () => {
      const e = j.lcm(i(this, S).denominator, i(this, z).denominator, i(this, Z).denominator), t = j.gcd(i(this, S).numerator, i(this, z).numerator, i(this, Z).numerator);
      return this.parseByCoefficient(
        i(this, S).clone().multiply(e).divide(t),
        i(this, z).clone().multiply(e).divide(t),
        i(this, Z).clone().multiply(e).divide(t)
      ), this;
    });
    o(this, "simplifyDirection", () => (i(this, H).simplify(), this));
    o(this, "intersection", (e) => {
      const t = new O();
      let s = !1, r = !1;
      return i(this, z).isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new c().invalid(), t.y = new c().invalid(), s = !0) : this.isSameAs(e) ? (t.x = new c().invalid(), t.y = new c().invalid(), r = !0) : (t.x = i(this, z).clone().multiply(e.c).subtract(i(this, Z).clone().multiply(e.b)).divide(i(this, S).clone().multiply(e.b).subtract(i(this, z).clone().multiply(e.a))), t.y = i(this, S).clone().multiply(e.c).subtract(i(this, Z).clone().multiply(e.a)).divide(i(this, z).clone().multiply(e.a).subtract(i(this, S).clone().multiply(e.b)))), {
        point: t,
        hasIntersection: !(s || r),
        isParallel: s,
        isSame: r
      };
    });
    o(this, "getValueAtX", (e) => {
      const t = this.getEquation().isolate("y"), s = new c(e);
      return t instanceof re ? t.right.evaluate({ x: s }) : new c().invalid();
    });
    o(this, "getValueAtY", (e) => {
      const t = this.getEquation().isolate("x"), s = new c(e);
      return t instanceof re ? t.right.evaluate({ y: s }) : new c().invalid();
    });
    return h(this, S, new c().zero()), h(this, z, new c().zero()), h(this, Z, new c().zero()), h(this, ee, new O()), h(this, H, new O()), h(this, Ne, new O()), h(this, Ee, !0), e.length > 0 && this.parse(...e), this;
  }
  get a() {
    return i(this, S);
  }
  // ------------------------------------------
  // Getter and setter
  set a(e) {
    h(this, S, e);
  }
  get b() {
    return i(this, z);
  }
  set b(e) {
    h(this, z, e);
  }
  get c() {
    return i(this, Z);
  }
  set c(e) {
    h(this, Z, e);
  }
  get OA() {
    return i(this, ee);
  }
  set OA(e) {
    h(this, ee, e);
  }
  get d() {
    return i(this, H);
  }
  set d(e) {
    h(this, H, e);
  }
  get n() {
    return i(this, Ne);
  }
  // ------------------------------------------
  getEquation() {
    const e = new re(new A().parse("xy", i(this, S), i(this, z), i(this, Z)), new A("0"));
    return i(this, Ee) ? e.simplify() : e;
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
    return h(this, pe, "canonical"), this;
  }
  get equation() {
    return h(this, pe, "equation"), this;
  }
  get mxh() {
    return h(this, pe, "mxh"), this;
  }
  get parametric() {
    return h(this, pe, "parametric"), this;
  }
  get system() {
    return h(this, pe, "system"), this;
  }
  get tex() {
    const e = i(this, pe);
    switch (h(this, pe, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().tex;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new A().parse("x", this.slope, this.height).tex;
      case "parametric":
      case "system": {
        const t = i(this, H).clone();
        return i(this, Ee) && t.simplify(), e === "parametric" ? `${O.asTex("x", "y")} = ${O.asTex(i(this, ee).x.tex, i(this, ee).y.tex)} + k\\cdot ${O.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}
            x &= ${new A(i(this, ee).x).add(new M(i(this, H).x).multiply(new M("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new A(i(this, ee).y).add(new M(i(this, H).y).multiply(new M("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`;
      }
      default: {
        const t = this.getEquation();
        return i(this, S).isNegative() && t.multiply(-1), t.tex;
      }
    }
  }
  get reduceBeforeDisplay() {
    return i(this, Ee);
  }
  set reduceBeforeDisplay(e) {
    h(this, Ee, e);
  }
  get display() {
    const e = i(this, pe);
    switch (h(this, pe, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().display;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new A().parse("x", this.slope, this.height).display;
      case "parametric": {
        const t = i(this, H).clone();
        return i(this, Ee) && t.simplify(), `((x,y))=((${i(this, ee).x.display},${i(this, ee).y.display}))+k((${t.x.display},${t.y.display}))`;
      }
      default: {
        const t = this.getEquation();
        return i(this, S).isNegative() && t.multiply(-1), t.display;
      }
    }
  }
  get normal() {
    return new O(i(this, S), i(this, z));
  }
  get director() {
    return i(this, H).clone();
  }
  get slope() {
    return i(this, S).clone().opposite().divide(i(this, z));
  }
  get height() {
    return i(this, Z).clone().opposite().divide(i(this, z));
  }
  distanceTo(e) {
    const t = e.x.clone().multiply(i(this, S)).add(e.y.clone().multiply(i(this, z))).add(i(this, Z)).abs(), s = this.normal.normSquare;
    if (s.isZero())
      return {
        value: NaN,
        tex: "Not a line",
        fraction: new c().infinite()
      };
    const r = t.value / Math.sqrt(s.value), n = t.clone().divide(s.clone().sqrt());
    return s.isSquare() ? {
      value: r,
      tex: n.tex,
      fraction: n
    } : {
      value: r,
      tex: `\\frac{${t.tex}}{\\sqrt{${s.tex}}}`,
      fraction: n
    };
  }
  hitSegment(e, t) {
    const s = this.intersection(
      new Ie(e, t)
    );
    return s.hasIntersection ? s.point.x.value >= Math.min(e.x.value, t.x.value) && s.point.x.value <= Math.max(e.x.value, t.x.value) && s.point.y.value >= Math.min(e.y.value, t.y.value) && s.point.y.value <= Math.max(e.y.value, t.y.value) : !1;
  }
  // ------------------------------------------
  // Special functions
  // ------------------------------------------
  canonicalAsFloatCoefficient(e) {
    e === void 0 && (e = 2);
    let t = "";
    return i(this, S).isZero() || (i(this, S).isOne() ? t = "x" : i(this, S).clone().opposite().isOne() ? t = "-x" : t = i(this, S).value.toFixed(e) + "x"), i(this, z).isZero() || (i(this, z).isPositive() && (t += "+"), t += i(this, z).value.toFixed(e) + "y"), i(this, Z).isZero() || (i(this, Z).isPositive() && (t += "+"), t += i(this, Z).value.toFixed(e)), t + "=0";
  }
};
Ee = new WeakMap(), S = new WeakMap(), z = new WeakMap(), Z = new WeakMap(), ee = new WeakMap(), H = new WeakMap(), Ne = new WeakMap(), pe = new WeakMap(), // A line is defined as the canonical form
o(Ie, "PERPENDICULAR", "perpendicular"), o(Ie, "PARALLEL", "parallel");
let F = Ie;
var te, D, be, it, st, rt, ie, Rt, Ke, zt, kt, Lt, mt;
const nt = class nt {
  constructor(...e) {
    b(this, ie);
    b(this, te);
    b(this, D);
    b(this, be);
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    o(this, "relativePosition", (e) => {
      if (i(this, te) === void 0 || i(this, D) === void 0)
        throw new Error("Circle not defined");
      const t = e.distanceTo(i(this, te)), s = Math.sqrt(i(this, D).value);
      return t.value - s > 1e-10 ? 0 : Math.abs(t.value - s) < 1e-10 ? 1 : 2;
    });
    o(this, "lineIntersection", (e) => {
      const t = [];
      if (i(this, be) === void 0)
        return [];
      const s = i(this, be).clone(), r = e.getEquation().clone().isolate("x"), n = e.getEquation().clone().isolate("y");
      return r instanceof re && n instanceof re && (s.replaceBy("y", n.right).simplify(), s.solve()), t;
    });
    o(this, "tangents", (e) => e instanceof c ? i(this, rt).call(this, e) : this.isPointOnCircle(e) ? i(this, it).call(this, e) : i(this, te) !== void 0 && i(this, te).distanceTo(e).value > this.radius.value ? (i(this, st).call(this, e), []) : (console.log("No tangents as the point is inside !"), []));
    o(this, "isPointOnCircle", (e) => {
      var t;
      return ((t = i(this, be)) == null ? void 0 : t.test({ x: e.x, y: e.y })) ?? !1;
    });
    o(this, "getPointsOnCircle", (e) => {
      const t = j.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), s = [];
      return t.forEach((r) => {
        for (const n of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
          s.push(
            new W(
              this.center.x.clone().add(n[0] * r[0]),
              this.center.y.clone().add(n[1] * r[1])
            )
          );
      }), s;
    });
    b(this, it, (e) => {
      const t = new W(this.center, e);
      return [new F(e, t, St.Perpendicular)];
    });
    b(this, st, (e) => {
      const t = this.center.x.clone().subtract(e.x), s = this.center.y.clone().subtract(e.y), r = new A("x"), n = new A("x^2+1");
      r.multiply(t).subtract(s).pow(2), n.multiply(this.squareRadius), new re(r, n).moveLeft().simplify().solve();
    });
    b(this, rt, (e) => {
      const t = e.numerator, s = -e.denominator, r = this.center.x.clone(), n = this.center.y.clone(), l = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), u = r.clone().multiply(t).opposite().subtract(n.clone().multiply(s)).add(l.clone().sqrt()), v = r.clone().multiply(t).opposite().subtract(n.clone().multiply(s)).subtract(l.clone().sqrt());
      return [new F(t, s, u), new F(t, s, v)];
    });
    e.length > 0 && this.parse(...e);
  }
  get center() {
    return i(this, te) ?? new W();
  }
  get squareRadius() {
    return i(this, D) ?? new c(0);
  }
  get cartesian() {
    if (i(this, be) === void 0)
      throw new Error("Cartesian equation not defined");
    return i(this, be);
  }
  get radius() {
    return i(this, D) === void 0 ? { tex: "", display: "", value: 0 } : i(this, D).isSquare() ? {
      tex: i(this, D).clone().sqrt().tex,
      display: i(this, D).clone().sqrt().display,
      value: i(this, D).clone().sqrt().value
    } : {
      tex: `\\sqrt{${i(this, D).tex}}`,
      display: `sqrt(${i(this, D).display})`,
      value: i(this, D).clone().sqrt().value
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
  clone() {
    return new nt(
      this.center.clone(),
      this.squareRadius.clone(),
      !0
    );
  }
  setRadius(e, t) {
    return t ? h(this, D, new c(e)) : h(this, D, new c(e).pow(2)), I(this, ie, Ke).call(this), this;
  }
  parse(...e) {
    return I(this, ie, Rt).call(this), typeof e[0] == "string" ? I(this, ie, mt).call(this, new re(e[0])) : e[0] instanceof re ? I(this, ie, mt).call(this, e[0]) : e[0] instanceof nt ? I(this, ie, zt).call(this, e[0]) : e[0] instanceof W && e.length > 1 && (e[1] instanceof W ? e[2] instanceof W || I(this, ie, Lt).call(this, e[0], e[1]) : (e[1] instanceof c || typeof e[1] == "number") && I(this, ie, kt).call(this, e[0], e[1], typeof e[2] == "boolean" ? e[2] : !1)), I(this, ie, Ke).call(this), this;
  }
  // private _parseThroughtThreePoints(A: Point, B: Point, C: Point): this {
  //     const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(),
  //         mAC = T.remarquables.mediators.AC.clone()
  //     this.parse(mAB.intersection(mAC).point, A)
  //     return this
  // }
};
te = new WeakMap(), D = new WeakMap(), be = new WeakMap(), it = new WeakMap(), st = new WeakMap(), rt = new WeakMap(), ie = new WeakSet(), Rt = function() {
  return h(this, te, void 0), h(this, D, void 0), h(this, be, void 0), this;
}, Ke = function() {
  h(this, be, new re(
    new A(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
    new A(this.squareRadius.display)
  ).moveLeft());
}, zt = function(e) {
  return h(this, te, e.center.clone()), h(this, D, e.squareRadius.clone()), I(this, ie, Ke).call(this), this;
}, kt = function(e, t, s) {
  return h(this, te, e.clone()), s ? h(this, D, new c(t)) : h(this, D, new c(t).pow(2)), this;
}, Lt = function(e, t) {
  return h(this, te, e.clone()), h(this, D, new O(i(this, te), t).normSquare), this;
}, mt = function(e) {
  if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
    const t = e.left.monomByDegree(2, "x"), s = e.left.monomByDegree(2, "y");
    let r, n, l;
    t.coefficient.isEqual(s.coefficient) ? (e.divide(t.coefficient), r = e.left.monomByDegree(1, "x"), n = e.left.monomByDegree(1, "y"), l = e.left.monomByDegree(0), h(this, te, new W(r.coefficient.clone().divide(2).opposite(), n.coefficient.clone().divide(2).opposite())), h(this, D, l.coefficient.clone().opposite().add(i(this, te).x.clone().pow(2)).add(i(this, te).y.clone().pow(2)))) : (h(this, te, void 0), h(this, D, void 0));
  }
  return this;
};
let _e = nt;
var X, K, J, ke, xe, Ye, ot, He, Oe, at, Le;
const ht = class ht {
  constructor(...e) {
    b(this, X);
    b(this, K);
    b(this, J);
    b(this, ke);
    b(this, xe);
    b(this, Ye);
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    /**
     * Parse values to a triangle. Supported formats:
     * Vector2D, Vector2D, Vector2D
     * x1, y1, x2, y2, x3, y3
     * TODO: Something else ?
     * @param values
     */
    o(this, "parse", (...e) => {
      if (e.length === 6) {
        const t = e.map((s) => new c(s));
        if (t.some((s) => s.isNaN()))
          throw new Error("One of the values is not a valid number");
        return this.parse(
          new O(t[0], t[1]),
          new O(t[2], t[3]),
          new O(t[4], t[5])
        );
      } else if (e.length === 3) {
        if (e.every((t) => typeof t == "string"))
          return this.parse(...e.map((t) => new F(t)));
        if (e.every((t) => t instanceof F)) {
          const t = e[0].clone(), s = e[1].clone(), r = e[2].clone();
          h(this, ke, { AB: t, BC: s, AC: r });
          let n = t.intersection(s);
          if (n.hasIntersection)
            h(this, K, n.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (n = s.intersection(r), n.hasIntersection)
            h(this, J, n.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (n = r.intersection(t), n.hasIntersection)
            h(this, X, n.point.clone());
          else
            throw new Error("Lines do not intersect !");
        } else e.every((t) => t instanceof W) && (h(this, X, e[0].clone()), h(this, K, e[1].clone()), h(this, J, e[2].clone()), h(this, ke, {
          AB: new F(i(this, X), i(this, K)),
          BC: new F(i(this, K), i(this, J)),
          AC: new F(i(this, X), i(this, J))
        }));
      } else if (e.length === 1 && e[0] instanceof ht)
        return e[0].clone();
      return i(this, ot).call(this), this;
    });
    /**
     * Clone the Triangle class
     */
    o(this, "clone", () => new ht(
      i(this, X).clone(),
      i(this, K).clone(),
      i(this, J).clone()
    ));
    // ------------------------------------------
    // Triangle operations and properties
    // ------------------------------------------
    /**
     * Generate the Line object for the three segments of the triangle
     */
    b(this, ot, () => {
      h(this, xe, {
        AB: new W().middleOf(i(this, X), i(this, K)),
        AC: new W().middleOf(i(this, X), i(this, J)),
        BC: new W().middleOf(i(this, K), i(this, J))
      }), h(this, Ye, i(this, at).call(this));
    });
    /**
     * Get the Vector2D class for the given name
     * @param ptName
     */
    b(this, He, (e) => {
      switch (e.toUpperCase()) {
        case "A":
          return i(this, X);
        case "B":
          return i(this, K);
        case "C":
          return i(this, J);
      }
      return i(this, X);
    });
    /**
     * Get the vector for the segment given by name.
     * @param ptName1
     * @param ptName2
     */
    b(this, Oe, (e, t) => new O(
      i(this, He).call(this, e),
      i(this, He).call(this, t)
    ));
    b(this, at, () => {
      const e = {
        A: new F(i(this, X), i(this, xe).BC),
        B: new F(i(this, K), i(this, xe).AC),
        C: new F(i(this, J), i(this, xe).AB),
        intersection: null
      }, t = {
        AB: new F(i(this, xe).AB, new O(i(this, X), i(this, K)).normal()),
        AC: new F(i(this, xe).AC, new O(i(this, X), i(this, J)).normal()),
        BC: new F(i(this, xe).BC, new O(i(this, K), i(this, J)).normal()),
        intersection: null
      }, s = {
        A: new F(i(this, X), new O(i(this, K), i(this, J)).normal()),
        B: new F(i(this, K), new O(i(this, X), i(this, J)).normal()),
        C: new F(i(this, J), new O(i(this, X), i(this, K)).normal()),
        intersection: null
      }, r = i(this, Le).call(this, "A"), n = i(this, Le).call(this, "B"), l = i(this, Le).call(this, "C"), u = {
        A: r.internal,
        B: n.internal,
        C: n.internal,
        intersection: null
      }, v = {
        A: r.external,
        B: n.external,
        C: l.external,
        intersection: null
      }, d = {
        medians: e,
        mediators: t,
        heights: s,
        bisectors: u,
        externalBisectors: v
      };
      return d.medians.intersection = d.medians.A.intersection(d.medians.B).point, d.mediators.intersection = d.mediators.AB.intersection(d.mediators.BC).point, d.heights.intersection = d.heights.A.intersection(d.heights.B).point, d.bisectors.intersection = d.bisectors.A.intersection(d.bisectors.B).point, d;
    });
    b(this, Le, (e) => {
      const t = this.lines;
      let s, r;
      if (e === "A" ? (s = t.AB, r = t.AC) : e === "B" ? (s = t.AB, r = t.BC) : e === "C" && (s = t.BC, r = t.AC), s === void 0 || r === void 0)
        throw new Error(`The point ${e} does not exist`);
      const n = s.n.simplify().norm, l = r.n.simplify().norm, u = s.getEquation().multiply(l), v = r.getEquation().multiply(n), d = new F(u.clone().subtract(v).simplify()), w = new F(v.clone().subtract(u).simplify());
      return e === "A" ? d.hitSegment(this.B, this.C) ? { internal: d, external: w } : { internal: w, external: d } : e === "B" ? d.hitSegment(this.A, this.C) ? { internal: d, external: w } : { internal: w, external: d } : e === "C" ? d.hitSegment(this.B, this.A) ? { internal: d, external: w } : { internal: w, external: d } : { internal: d, external: w };
    });
    return e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setters
  // ------------------------------------------
  get A() {
    return i(this, X);
  }
  get B() {
    return i(this, K);
  }
  get C() {
    return i(this, J);
  }
  get AB() {
    return i(this, Oe).call(this, "A", "B");
  }
  get BA() {
    return i(this, Oe).call(this, "B", "A");
  }
  get BC() {
    return i(this, Oe).call(this, "B", "C");
  }
  get CB() {
    return i(this, Oe).call(this, "C", "B");
  }
  get AC() {
    return i(this, Oe).call(this, "A", "C");
  }
  get CA() {
    return i(this, Oe).call(this, "C", "A");
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
    return i(this, ke);
  }
  get remarquables() {
    return i(this, Ye);
  }
};
X = new WeakMap(), K = new WeakMap(), J = new WeakMap(), ke = new WeakMap(), xe = new WeakMap(), Ye = new WeakMap(), ot = new WeakMap(), He = new WeakMap(), Oe = new WeakMap(), at = new WeakMap(), Le = new WeakMap();
let yt = ht;
function et(a) {
  const e = Object.assign(
    {
      negative: !0,
      max: 10,
      reduced: !0,
      zero: !0,
      natural: !1
    },
    a
  ), t = new c();
  if (e.negative ? t.numerator = Y(e.max, e.zero) : t.numerator = le(e.zero ? 0 : 1, e.max), e.natural)
    t.denominator = 1;
  else {
    let s = 0;
    for (; t.isRelative() && s < 10; )
      t.denominator = le(1, e.max), s++;
  }
  return e.reduced ? t.reduce() : t;
}
function Dt(a) {
  const e = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    a
  ), t = new M();
  if (t.coefficient = et({
    zero: e.zero,
    reduced: !0,
    natural: !e.fraction
  }), e.letters.length > 1) {
    for (const s of e.letters.split(""))
      t.setLetter(s, 0);
    for (let s = 0; s < e.degree; s++) {
      const r = vt(e.letters.split(""));
      t.setLetter(r, t.degree(r).clone().add(1));
    }
  } else
    t.setLetter(e.letters, e.degree);
  return t;
}
const li = {
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
function Ft(a) {
  const e = Object.assign(
    li,
    a
  ), t = new A().empty();
  let s;
  for (let r = e.degree; r >= 0; r--)
    s = Dt({
      letters: e.letters,
      degree: r,
      fraction: e.fraction,
      zero: r === e.degree ? !1 : e.allowNullMonom
    }), e.unit && e.degree === r && s.coefficient.one(), t.add(s);
  if (e.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposite(), e.numberOfMonoms && e.numberOfMonoms > 0 && e.numberOfMonoms < t.length)
    for (; t.length > e.numberOfMonoms; ) {
      const r = le(1, t.length - 1);
      t.monoms.splice(r, 1);
    }
  return t;
}
function ci(a) {
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
    a
  ), t = new A().one();
  for (let s = 0; s < e.degree; s++) {
    const r = Ft({
      degree: 1,
      unit: e.unit,
      fraction: e.fraction,
      letters: e.letters,
      zero: e.zero
    });
    t.multiply(r);
  }
  return new re(t, 0);
}
function Vt(a) {
  const e = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    a
  ), t = e.axis === "x", s = e.axis === "y", r = e.fraction ? et({ max: e.max, zero: t }) : new c(Y(e.max, t)), n = e.fraction ? et({ max: e.max, zero: s }) : new c(Y(e.max, s));
  return Number(e.quadrant) === 1 && (r.abs(), n.abs()), Number(e.quadrant) === 2 && (r.isPositive() && r.opposite(), n.isNegative() && n.opposite()), Number(e.quadrant) === 3 && (r.isPositive() && r.opposite(), n.isPositive() && n.opposite()), Number(e.quadrant) === 4 && (r.isNegative() && r.opposite(), n.isPositive() && n.opposite()), new W(r, n);
}
function ui(a) {
  const e = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    a
  ), t = Vt(e.center);
  let s, r;
  return e.pointsOnCircle === 8 ? (s = le(1, 3), r = s ** 2 + (s + 1) ** 2) : r = le(1, 20), new _e(t, r, !0);
}
function fi(a) {
  const e = Object.assign(
    {
      A: {
        x: Y(10),
        y: Y(10)
      }
    },
    a
  ), t = new O(
    Y(10),
    Y(10)
  );
  for (; t.isNull; )
    t.x = Y(10), t.y = Y(10);
  return e.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposite() : e.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposite(), new F(new O(e.A.x, e.A.y), t);
}
var k, G;
const Ue = class Ue {
  constructor(e, t) {
    // ax + by + c = 0
    b(this, k, new W());
    b(this, G, new O());
    o(this, "clone", () => (h(this, G, i(this, G).clone()), h(this, k, i(this, k).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    o(this, "isOnLine", (e) => !1);
    o(this, "isParallelTo", (e) => {
      throw new Error("Method not implemented.");
    });
    o(this, "isSameAs", (e) => {
      throw new Error("Method not implemented.");
    });
    o(this, "isPerpendicularTo", (e) => {
      throw new Error("Method not implemented.");
    });
    o(this, "isVertical", () => {
      throw new Error("Method not implemented.");
    });
    o(this, "simplify", () => {
      throw new Error("Method not implemented.");
    });
    o(this, "intersection", (e) => {
      throw new Error("Method not implemented.");
    });
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
    o(this, "randomPoint", (e = 5) => {
      const t = i(this, k).clone(), s = new c(Y(e, !1));
      return new W(
        t.x.clone().add(i(this, G).x.clone().multiply(s)),
        t.y.clone().add(i(this, G).y.clone().multiply(s)),
        t.z.clone().add(i(this, G).z.clone().multiply(s))
      );
    });
    return h(this, k, e.clone()), h(this, G, t.asPoint ? new O(e, t) : t.clone()), this;
  }
  get OA() {
    return i(this, k);
  }
  set OA(e) {
    h(this, k, e);
  }
  get point() {
    return i(this, k).clone();
  }
  get d() {
    return i(this, G);
  }
  set d(e) {
    h(this, G, e);
  }
  get tex() {
    return {
      parametric: `${O.asTex("x", "y", "z")} = ${O.asTex(i(this, k).x.tex, i(this, k).y.tex, i(this, k).z.tex)} + k\\cdot ${O.asTex(i(this, G).x.tex, i(this, G).y.tex, i(this, G).z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new A(i(this, k).x).add(new M(i(this, G).x).multiply(new M("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new A(i(this, k).y).add(new M(i(this, G).y).multiply(new M("k"))).reorder("k", !0).tex}\\\\
    z &= ${new A(i(this, k).z).add(new M(i(this, G).z).multiply(new M("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
      cartesian: `\\frac{ ${new A("x", 1, i(this, k).x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new A("y", 1, i(this, k).y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new A("z", 1, i(this, k).z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
    };
  }
  get display() {
    const e = i(this, k).x.display, t = i(this, k).y.display, s = i(this, k).z.display, r = this.direction.simplify(), n = r.x.display, l = r.y.display, u = r.z.display;
    return {
      parametric: `${O.asDisplay("x", "y", "z")} = ${O.asDisplay(i(this, k).x.display, i(this, k).y.display, i(this, k).z.display)} + k\\cdot ${O.asDisplay(i(this, G).x.display, i(this, G).y.display, i(this, G).z.display)}`,
      system: "",
      cartesian: `(x-${e})/${n} = (y-${t})/${l} = (z-${s})/${u}`
    };
  }
  get direction() {
    return i(this, G).clone();
  }
  distanceTo(e) {
    const t = new O(i(this, k), e), s = this.direction, r = this.direction.normSquare, n = t.cross(s).normSquare, l = n.clone().divide(r), u = l.clone().sqrt();
    return console.log("CROSS", t.cross(s).display), {
      value: Math.sqrt(l.value),
      fraction: l.clone().sqrt(),
      tex: u.isExact() ? u.tex : `\\sqrt{${l.tex}}`
    };
  }
  hitSegment(e, t) {
    const s = this.intersection(
      new Ue(e, t)
    );
    return s.hasIntersection ? s.point.x.value >= Math.min(e.x.value, t.x.value) && s.point.x.value <= Math.max(e.x.value, t.x.value) && s.point.y.value >= Math.min(e.y.value, t.y.value) && s.point.y.value <= Math.max(e.y.value, t.y.value) && s.point.z.value >= Math.min(e.z.value, t.z.value) && s.point.z.value <= Math.max(e.z.value, t.z.value) : !1;
  }
};
k = new WeakMap(), G = new WeakMap(), // A line is defined as the canonical form
o(Ue, "PERPENDICULAR", "perpendicular"), o(Ue, "PARALLEL", "parallel");
let gt = Ue;
function di(a) {
  const e = Object.assign(
    {
      A: {
        x: Y(10),
        y: Y(10),
        z: Y(10)
      },
      direction: {
        x: Y(10),
        y: Y(10),
        z: Y(10)
      }
    },
    a
  ), t = new W(e.A.x, e.A.y, e.A.z), s = new O(e.direction.x, e.direction.y, e.direction.z);
  return new gt(t, s);
}
const pi = {
  equation: (a) => ci(a),
  polynom: (a) => Ft(a),
  monom: (a) => Dt(a),
  fraction: (a) => et(a),
  number: (a, e, t) => le(a, e, t),
  numberSym: (a, e) => Y(a, e),
  prime: (a) => ai(a),
  bool: (a) => $t(a),
  array: (a, e) => hi(a, e),
  item: (a) => vt(a),
  shuffle: (a) => Pt(a),
  line: (a) => fi(a),
  line3: (a) => di(a),
  point: (a) => Vt(a),
  circle: (a) => ui(a)
}, mi = {
  Vector: O,
  Point: W,
  Line: F,
  Triangle: yt,
  Circle: _e
}, gi = {
  Numeric: j,
  Fraction: c,
  Root: Qe,
  Monom: M,
  Polynom: A,
  Equation: re,
  // LinearSystem,s
  Factor: he,
  PolyFactor: dt,
  // LogicalSet,
  Random: pi,
  Geometry: mi
};
export {
  gi as default
};
