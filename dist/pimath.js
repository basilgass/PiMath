var tt = Object.defineProperty;
var Ve = (a) => {
  throw TypeError(a);
};
var it = (a, e, t) => e in a ? tt(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var r = (a, e, t) => it(a, typeof e != "symbol" ? e + "" : e, t), Ue = (a, e, t) => e.has(a) || Ve("Cannot " + t);
var i = (a, e, t) => (Ue(a, e, "read from private field"), t ? t.call(a) : e.get(a)), E = (a, e, t) => e.has(a) ? Ve("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), l = (a, e, t, s) => (Ue(a, e, "write to private field"), s ? s.call(a, t) : e.set(a, t), t);
function st(a) {
  const e = je(a), t = [];
  let s, n;
  for (; e.length > 0; )
    s = e.shift() ?? 1, n = (e.length > 0 ? e.pop() : +s) ?? 1, t.push([s, n]);
  return t;
}
function nt(...a) {
  const e = Be(...a);
  return a.map((t) => t / e);
}
function je(a) {
  const e = Math.abs(a), t = Math.sqrt(e), s = [];
  for (let n = 1; n <= t; n++)
    a % n === 0 && (s.push(n), s.push(e / n));
  return s.sort(function(n, o) {
    return n - o;
  }), [...new Set(s)];
}
function Be(...a) {
  const e = function(n, o) {
    return o === 0 ? n : e(o, n % o);
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
function rt(...a) {
  return a.reduce(function(e, t) {
    return Math.abs(e * t / Be(e, t));
  });
}
function ot(a, e = 3) {
  return +a.toFixed(e);
}
function at(a) {
  if (Number.isSafeInteger(a) || a.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function lt(a) {
  const e = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return a === void 0 ? e : e.slice(0, Math.min(e.length, a));
}
function ht(a, e) {
  const t = [], s = e === !0 ? +a : a ** 2;
  for (let n = 0; n <= a; n++)
    for (let o = 0; o <= a; o++)
      n ** 2 + o ** 2 === s && t.push([n, o, a]);
  return t;
}
function ct(a, e = 2) {
  return +`${Math.round(+`${a}e${e}`)}e-${e}`;
}
const C = {
  decompose: st,
  dividers: je,
  divideNumbersByGCD: nt,
  gcd: Be,
  lcm: rt,
  numberCorrection: ot,
  periodic: at,
  primes: lt,
  pythagoreanTripletsWithTarget: ht,
  round: ct
};
var m, p, Me;
const q = class q {
  constructor(e, t) {
    // #region Class fields (2)
    E(this, m);
    E(this, p);
    E(this, Me);
    // #endregion Constructors (5)
    // #region Properties and methods (55)
    // ------------------------------------------
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    r(this, "parse", (e, t) => {
      let s;
      if (e === "")
        return l(this, p, 0), l(this, m, 1), this;
      switch (typeof e) {
        case "string":
          if (s = e.split("/"), s.length > 2)
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (s.map((n) => n === "" || isNaN(Number(n))).includes(!0))
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (s.length === 1)
            return this.parse(+s[0]);
          s.length === 2 ? s[1] === "0" ? (l(this, p, NaN), l(this, m, 1)) : (l(this, p, +s[0]), l(this, m, +s[1])) : (l(this, p, NaN), l(this, m, 1));
          break;
        case "number":
          if (Number.isSafeInteger(e))
            l(this, p, +e), t === void 0 || !Number.isSafeInteger(t) ? l(this, m, 1) : l(this, m, +t);
          else {
            const [, n] = e.toString().split("."), o = n ? n.length : 0;
            t === void 0 ? (l(this, p, e * Math.pow(10, o)), l(this, m, Math.pow(10, o))) : Number.isSafeInteger(t) && (l(this, p, e * Math.pow(10, o) - Math.floor(e * Math.pow(10, o - t))), this.denominator = Math.pow(10, o) - Math.pow(10, o - t)), this.reduce();
          }
          break;
        case "object":
          e instanceof q && (l(this, p, +e.numerator), l(this, m, +e.denominator));
          break;
      }
      return this;
    });
    r(this, "clone", () => {
      const e = new q();
      return e.numerator = +i(this, p), e.denominator = +i(this, m), e;
    });
    r(this, "abs", () => (l(this, p, Math.abs(i(this, p))), l(this, m, Math.abs(i(this, m))), this));
    r(this, "add", (e) => {
      if (e instanceof q) {
        const t = i(this, p), s = i(this, m);
        l(this, p, t * e.denominator + e.numerator * s), l(this, m, s * e.denominator);
      } else
        return this.add(new q(e));
      return this.reduce();
    });
    r(this, "amplify", (e) => (Number.isSafeInteger(e) && (l(this, p, i(this, p) * e), l(this, m, i(this, m) * e)), this));
    // TODO: The rest of the functions are not used or unnecessary ?
    /**
     * Simple function to determine if it's a fraction
     */
    r(this, "areEquals", (...e) => e.every((t) => t.isEqual(e[0])));
    // ------------------------------------------
    // Compare functions
    // ------------------------------------------
    /**
     * Compare the current coefficient with another coefficient
     * @param F (Coefficient) The coefficient to _compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    r(this, "compare", (e, t) => {
      t === void 0 && (t = "=");
      let s;
      switch (e instanceof q ? s = e.clone() : s = new q(e), t) {
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
    r(this, "divide", (e) => {
      const t = new q(e);
      if (t.numerator === 0)
        return new q().infinite();
      const s = +i(this, p), n = +i(this, m);
      return l(this, p, s * t.denominator), l(this, m, n * t.numerator), this.reduce();
    });
    r(this, "infinite", () => (l(this, p, 1 / 0), l(this, m, 1), this));
    r(this, "invalid", () => (l(this, p, NaN), l(this, m, 1), this));
    r(this, "inverse", () => {
      const e = +i(this, p), t = +i(this, m);
      return l(this, p, t), l(this, m, e), this;
    });
    r(this, "isApproximative", () => i(this, Me) || i(this, p).toString().length >= 15 && i(this, m).toString().length >= 15);
    r(this, "isEqual", (e) => this.compare(e, "="));
    r(this, "isEven", () => this.isRelative() && this.value % 2 === 0);
    r(this, "isExact", () => !this.isApproximative());
    r(this, "isFinite", () => !this.isInfinity() && !this.isNaN());
    r(this, "isGeq", (e) => this.compare(e, ">="));
    r(this, "isGreater", (e) => this.compare(e, ">"));
    r(this, "isInfinity", () => Math.abs(i(this, p)) === 1 / 0);
    r(this, "isInverted", (e) => this.isEqual(new q().one().divide(e.clone())));
    r(this, "isLeq", (e) => this.compare(e, "<="));
    /* Compare shortcuts */
    r(this, "isLesser", (e) => this.compare(e, "<"));
    r(this, "isNaN", () => isNaN(i(this, p)));
    r(this, "isNatural", () => this.isRelative() && this.isPositive());
    r(this, "isNegative", () => this.sign() === -1);
    r(this, "isNegativeOne", () => i(this, p) === -1 && i(this, m) === 1);
    r(this, "isNotEqual", (e) => this.compare(e, "<>"));
    r(this, "isNotZero", () => i(this, p) !== 0);
    r(this, "isOdd", () => this.isRelative() && this.value % 2 === 1);
    r(this, "isOne", () => i(this, p) === 1 && i(this, m) === 1);
    r(this, "isOpposite", (e) => this.isEqual(e.clone().opposite()));
    r(this, "isPositive", () => this.sign() === 1);
    r(this, "isRational", () => !this.isRelative());
    r(this, "isReduced", () => Math.abs(C.gcd(i(this, p), i(this, m))) === 1);
    r(this, "isRelative", () => this.clone().reduce().denominator === 1);
    r(this, "isSquare", () => Math.sqrt(i(this, p)) % 1 === 0 && Math.sqrt(i(this, m)) % 1 === 0);
    r(this, "isStrictlyNegative", () => this.value < 0);
    r(this, "isStrictlyPositive", () => this.value > 0);
    // ------------------------------------------
    // Mathematical operations specific to fractions
    r(this, "isZero", () => i(this, p) === 0);
    r(this, "multiply", (e) => {
      const t = new q(e);
      return l(this, p, i(this, p) * t.numerator), l(this, m, i(this, m) * t.denominator), this.reduce();
    });
    r(this, "one", () => (l(this, p, 1), l(this, m, 1), this));
    r(this, "opposite", () => (l(this, p, -i(this, p)), this));
    r(this, "pow", (e) => {
      if (e instanceof q)
        return this.pow(e.value);
      this.reduce(), e < 0 && this.inverse();
      const t = Math.floor(Math.pow(i(this, p), Math.abs(e))), s = Math.floor(Math.pow(i(this, m), Math.abs(e)));
      return t ** Math.abs(e) === i(this, p) && s ** Math.abs(e) === i(this, m) ? (l(this, p, i(this, p) ** Math.abs(e)), l(this, m, i(this, m) ** Math.abs(e))) : (l(this, p, i(this, p) ** Math.abs(e)), l(this, m, i(this, m) ** Math.abs(e))), this;
    });
    // ------------------------------------------
    r(this, "reduce", () => {
      const e = C.gcd(i(this, p), i(this, m));
      return l(this, p, i(this, p) / e), l(this, m, i(this, m) / e), i(this, m) < 0 && (l(this, m, -i(this, m)), l(this, p, -i(this, p))), this;
    });
    r(this, "root", (e) => {
      if (e === 0)
        return this;
      if (e < 0 && this.inverse(), !Number.isSafeInteger(e))
        throw new Error("The root must be an integer.");
      if (this.isNegative() && e % 2 === 0)
        throw new Error("The root of a negative number must be odd.");
      const t = this.sign();
      this.abs();
      const s = Math.floor(Math.pow(i(this, p), Math.abs(1 / e))), n = Math.floor(Math.pow(i(this, m), Math.abs(1 / e)));
      return l(this, p, Math.pow(i(this, p), Math.abs(1 / e))), l(this, m, Math.pow(i(this, m), Math.abs(1 / e))), (s ** e !== i(this, p) || n ** e !== i(this, m)) && (l(this, p, i(this, p) / i(this, m)), l(this, m, 1)), this.multiply(t), this;
    });
    r(this, "sign", () => i(this, p) * i(this, m) >= 0 ? 1 : -1);
    r(this, "sqrt", () => this.root(2));
    r(this, "subtract", (e) => e instanceof q ? this.add(e.clone().opposite()) : this.add(-e));
    r(this, "zero", () => (l(this, p, 0), l(this, m, 1), this));
    return l(this, p, 1), l(this, m, 1), l(this, Me, !1), e !== void 0 && this.parse(e, t), this;
  }
  // #endregion Properties and methods (55)
  // #region Getters And Setters (11)
  get denominator() {
    return i(this, m);
  }
  set denominator(e) {
    l(this, m, e);
  }
  // ------------------------------------------
  // Creation / parsing functions
  get dfrac() {
    return this.tex.replace("\\frac", "\\dfrac");
  }
  get display() {
    return this.isExact() ? i(this, m) === 1 ? `${i(this, p)}` : `${i(this, p)}/${i(this, m)}` : this.value.toFixed(3);
  }
  // Helper function to display fractions
  get frac() {
    return this.tex;
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get numerator() {
    return i(this, p);
  }
  set numerator(e) {
    l(this, p, e);
  }
  // Display getter
  get tex() {
    return this.isInfinity() ? `${this.sign() === 1 ? "+" : "-"}\\infty` : this.isExact() ? i(this, m) === 1 ? `${i(this, p)}` : i(this, p) < 0 ? `-\\frac{ ${-i(this, p)} }{ ${i(this, m)} }` : `\\frac{ ${i(this, p)} }{ ${i(this, m)} }` : this.value.toFixed(3);
  }
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get tfrac() {
    return this.tex.replace("\\frac", "\\tfrac");
  }
  get value() {
    return i(this, p) / i(this, m);
  }
  // #endregion Getters And Setters (11)
};
m = new WeakMap(), p = new WeakMap(), Me = new WeakMap(), r(q, "average", (...e) => {
  const t = new q().zero();
  for (const s of e)
    t.add(s);
  return t.divide(e.length), t;
}), r(q, "max", (...e) => {
  let t = new q(e[0]);
  for (const s of e) {
    const n = new q(s);
    n.isGreater(t) && (t = n.clone());
  }
  return t;
}), r(q, "min", (...e) => {
  let t = new q(e[0]);
  for (const s of e) {
    const n = new q(s);
    n.isLesser(t) && (t = n.clone());
  }
  return t;
}), r(q, "sort", (e, t) => {
  const n = e.map((o) => o instanceof q ? o : new q(o)).sort((o, c) => o.value - c.value);
  return t && n.reverse(), n;
}), r(q, "unique", (e) => {
  const t = {}, s = [];
  return e.forEach((n) => {
    n instanceof q || (n = new q(n)), t[n.clone().reduce().tex] || (s.push(n.clone()), t[n.tex] = !0);
  }), s;
}), r(q, "xMultiply", (...e) => {
  const t = new q();
  for (const s of e) {
    const n = new q(s);
    t.numerator = t.numerator * n.numerator, t.denominator = t.denominator * n.denominator;
  }
  return t;
});
let h = q;
const Ge = {
  pi: Math.PI,
  e: Math.exp(1)
};
var u = /* @__PURE__ */ ((a) => (a.VARIABLE = "variable", a.COEFFICIENT = "coefficient", a.OPERATION = "operation", a.CONSTANT = "constant", a.FUNCTION = "function", a.FUNCTION_ARGUMENT = "function-argument", a.MONOM = "monom", a.LEFT_PARENTHESIS = "(", a.RIGHT_PARENTHESIS = ")", a))(u || {}), Ee = /* @__PURE__ */ ((a) => (a.EXPRESSION = "expression", a.POLYNOM = "polynom", a.SET = "set", a.NUMERIC = "numeric", a))(Ee || {});
function ut(a, e) {
  if (a.length <= 1)
    return a;
  const t = Object.keys(e).filter((N) => e[N].type === u.FUNCTION).map((N) => N);
  t.sort((N, k) => k.length - N.length);
  const s = new RegExp(`^(${t.join("|")})\\(`), n = Object.keys(Ge);
  n.sort((N, k) => k.length - N.length);
  const o = new RegExp(`^(${n.join("|")})`), c = /^(\d+(\.\d+)?)/;
  let f = "", w, x, g;
  for (; a.length > 0; ) {
    if (w = x, g = void 0, t.length > 0 && s.exec(a)) {
      const N = t.find((k) => a.startsWith(k));
      N && (g = N + "(", a = a.slice(N.length + 1), x = u.FUNCTION);
    } else if (n.length > 0 && o.exec(a)) {
      const N = n.find((k) => a.startsWith(k));
      N && (g = N, a = a.slice(N.length), x = u.CONSTANT);
    } else if (c.exec(a)) {
      const N = c.exec(a);
      N && (g = N[0], a = a.slice(N[0].length), x = u.COEFFICIENT);
    } else
      switch (g = a[0], a = a.slice(1), g) {
        case "(":
          x = u.LEFT_PARENTHESIS;
          break;
        case ")":
          x = u.RIGHT_PARENTHESIS;
          break;
        case ",":
          x = u.FUNCTION_ARGUMENT;
          break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
          x = u.OPERATION;
          break;
        default:
          x = u.VARIABLE;
      }
    if (g === void 0 || x === void 0)
      throw new Error("The token is undefined");
    f += ft(w, x), f += g;
  }
  return f;
}
function ft(a, e) {
  return a === void 0 || a === u.OPERATION || e === u.OPERATION || a === u.LEFT_PARENTHESIS || a === u.FUNCTION || a === u.FUNCTION_ARGUMENT || e === u.RIGHT_PARENTHESIS || e === u.FUNCTION_ARGUMENT ? "" : "*";
}
const dt = {
  "^": { precedence: 4, associative: "right", type: u.OPERATION },
  "*": { precedence: 3, associative: "left", type: u.OPERATION },
  "/": { precedence: 3, associative: "left", type: u.OPERATION },
  "+": { precedence: 2, associative: "left", type: u.OPERATION },
  "-": { precedence: 2, associative: "left", type: u.OPERATION }
}, pt = {
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
}, mt = {
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
}, yt = {
  "&": { precedence: 3, associative: "left", type: u.OPERATION },
  "|": { precedence: 3, associative: "left", type: u.OPERATION },
  "!": { precedence: 4, associative: "right", type: u.OPERATION },
  "-": { precedence: 2, associative: "left", type: u.OPERATION }
};
var me, ve, G, Ae, fe;
class Ye {
  constructor(e) {
    E(this, me);
    E(this, ve, []);
    E(this, G, {});
    E(this, Ae, []);
    E(this, fe);
    l(this, me, typeof e > "u" ? Ee.POLYNOM : e), this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return i(this, ve);
  }
  get rpnToken() {
    return i(this, ve).map((e) => e.token);
  }
  tokenConfigInitialization() {
    return i(this, me) === Ee.SET ? (l(this, G, yt), l(this, fe, !1)) : i(this, me) === Ee.NUMERIC ? (l(this, G, mt), l(this, fe, !0)) : i(this, me) === Ee.EXPRESSION ? (l(this, G, pt), l(this, fe, !0)) : (l(this, G, dt), l(this, fe, !0)), l(this, Ae, Object.keys(i(this, G)).sort((e, t) => t.length - e.length)), i(this, G);
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(e, t) {
    let s, n;
    if (s = "", n = void 0, e[t] === "(")
      s = "(", n = u.LEFT_PARENTHESIS;
    else if (e[t] === ")")
      s = ")", n = u.RIGHT_PARENTHESIS;
    else if (e[t] === ",")
      s = ",", n = u.FUNCTION_ARGUMENT;
    else {
      for (const o of i(this, Ae))
        if (e.substring(t, t + o.length) === o) {
          s += o, n = i(this, G)[o].type;
          break;
        }
      for (const o in Ge)
        if (e.substring(t, t + o.length) === o) {
          s += o, n = u.CONSTANT;
          break;
        }
      if (s === "")
        if (/[0-9.]/.exec(e[t])) {
          const o = /^([0-9.]+)/.exec(e.substring(t));
          s = o ? o[0] : "", n = u.COEFFICIENT;
        } else if (/[a-zA-Z]/.exec(e[t])) {
          const o = /^([a-zA-Z])/.exec(e.substring(t));
          s = o ? o[0] : "", n = u.VARIABLE;
        } else
          console.log("Unidentified token", e[t], e, t), s = e[t], n = u.MONOM;
    }
    if (n === void 0)
      throw new Error(`Token type is undefined for token ${s}`);
    return [s, t + s.length, n];
  }
  /**
   * Parse an expression using the shutting yard tree algorithms
   * @param expr (string) Expression to analyse
   * Returns a RPN list of items.
   * @param uniformize
   */
  parse(e, t) {
    const s = [], n = [];
    let o = "", c = 0, f;
    (t ?? i(this, fe)) && (e = ut(e, i(this, G)));
    const w = 50;
    let x = 50, g;
    for (; c < e.length; ) {
      if (x--, x === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([o, c, f] = this.NextToken(e, c), f) {
        case u.MONOM:
        case u.COEFFICIENT:
        case u.VARIABLE:
        case u.CONSTANT:
          s.push({
            token: o,
            tokenType: f
          });
          break;
        case u.OPERATION:
          if (n.length > 0) {
            let N = n[n.length - 1];
            for (g = +w; N.token in i(this, G) && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (i(this, G)[o].associative === "left" && i(this, G)[o].precedence <= i(this, G)[N.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            i(this, G)[o].associative === "right" && i(this, G)[o].precedence < i(this, G)[N.token].precedence); ) {
              if (g--, g === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (s.push(n.pop() ?? { token: "", tokenType: u.OPERATION }), n.length === 0)
                break;
              N = n[n.length - 1];
            }
          }
          n.push({ token: o, tokenType: f });
          break;
        case u.FUNCTION_ARGUMENT:
          for (g = +w; n[n.length - 1].token !== "(" && n.length > 0; ) {
            if (g--, g === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            s.push(n.pop() ?? { token: o, tokenType: f });
          }
          break;
        case u.LEFT_PARENTHESIS:
          n.push({ token: o, tokenType: f }), e[c] === "-" && s.push({ token: "0", tokenType: u.COEFFICIENT });
          break;
        case u.RIGHT_PARENTHESIS:
          for (g = +w; n[n.length - 1].token !== "(" && n.length > 1; ) {
            if (g--, g === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
              break;
            }
            s.push(n.pop() ?? { token: o, tokenType: f });
          }
          n.pop();
          break;
        case u.FUNCTION:
          n.push({ token: o, tokenType: f });
          break;
        default:
          throw new Error(`Token type ${o} is not handled`);
      }
    }
    return l(this, ve, s.concat(n.reverse())), this;
  }
}
me = new WeakMap(), ve = new WeakMap(), G = new WeakMap(), Ae = new WeakMap(), fe = new WeakMap();
class Pe {
  constructor(...e) {
    r(this, "_radical");
    r(this, "_nth");
    r(this, "_coefficient");
    r(this, "_isValid");
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    r(this, "parse", (e, t, s) => (this._coefficient = s ?? 1, this._nth = t ?? 2, this._radical = e, this._nth % 2 === 0 && this._radical < 0 && (this._isValid = !1), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    r(this, "reduce", () => {
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
    r(this, "multiply", (e) => (this._radical *= e.radical, this.reduce()));
    // ------------------------------------------
    // Help functions
    // ------------------------------------------
    r(this, "hasRadical", () => !(this._radical === 1 || this._radical === 0 || !this._isValid));
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
var v, y;
const I = class I {
  constructor(e) {
    E(this, v);
    E(this, y);
    // -----------------------------------------
    /**
     * Parse a string to a monom. The string may include fraction.
     * @param inputStr
     */
    r(this, "parse", (e) => (l(this, v, new h()), l(this, y, {}), typeof e == "string" ? this._shutingYardToReducedMonom(e) : typeof e == "number" ? l(this, v, new h(e)) : e instanceof h ? l(this, v, e.clone()) : e instanceof I && (l(this, v, i(e, v).clone()), this._cloneLiteral(e)), this));
    /**
     * Clone the current Monom.
     */
    r(this, "clone", () => {
      const e = new I();
      e.coefficient = i(this, v).clone();
      for (const t in i(this, y))
        e.setLetter(t, i(this, y)[t].clone());
      return e;
    });
    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    r(this, "add", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        this.isSameAs(s) ? (this.isZero() && this._cloneLiteral(s), i(this, v).add(s.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", s.display);
      }
      return this;
    });
    r(this, "containsRationalPower", () => Object.values(i(this, y)).some((e) => e.isRational()));
    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    r(this, "degree", (e) => this.variables.length === 0 ? new h().zero() : e === void 0 ? Object.values(i(this, y)).reduce((t, s) => t.clone().add(s)) : this.hasVariable(e) ? i(this, y)[e].clone() : new h().zero());
    /**
     * Derivative the monom
     * @param letter
     */
    r(this, "derivative", (e) => {
      if (e === void 0 && (e = "x"), this.hasVariable(e)) {
        const t = i(this, y)[e].clone(), s = this.clone();
        return i(s, y)[e].subtract(1), i(s, v).multiply(new h(t.clone())), s;
      } else
        return new I().zero();
    });
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    r(this, "divide", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        i(this, v).divide(s.coefficient);
        for (const n in s.literal)
          i(this, y)[n] = this.hasVariable(n) ? i(this, y)[n].subtract(s.literal[n]) : s.literal[n].clone().opposite(), i(this, y)[n].isZero() && this.removeVariable(n);
      }
      return this;
    });
    /**
     * Evaluate a monom. Each setLetter must be assigned to a Fraction.
     * @param values    Dictionary of <setLetter: Fraction>
     * @param asNumeric
     */
    r(this, "evaluate", (e, t) => {
      if (t === !0) {
        if (e instanceof h)
          return this._evaluateAsNumeric(e.value);
        if (e instanceof Pe)
          return new h().invalid();
        if (typeof e == "number")
          return this._evaluateAsNumeric(e);
        if (typeof e == "object") {
          const n = {};
          for (const o in e)
            n[o] = new h(e[o]).value;
          return this._evaluateAsNumeric(n);
        }
      }
      const s = this.coefficient.clone();
      if (typeof e == "number" || e instanceof h) {
        const n = {};
        return n[this.variables[0]] = new h(e), this.evaluate(n);
      }
      if (e instanceof Pe)
        return new h().invalid();
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient;
        for (const n in i(this, y)) {
          const o = new h(e[n]);
          s.multiply(o.pow(i(this, y)[n]));
        }
      }
      return s;
    });
    // -------------------------------------
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    r(this, "hasVariable", (e) => Object.hasOwn(i(this, y), e ?? "x"));
    r(this, "inverse", () => {
      i(this, v).opposite();
      for (const e in i(this, y))
        i(this, y)[e].opposite();
      return this;
    });
    r(this, "isDivisible", (e) => {
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
    r(this, "isEqual", (e) => this.isSameAs(e) && i(this, v).isEqual(e.coefficient));
    r(this, "isLiteralSquare", () => {
      for (const e in this.literal)
        if (this.literal[e].isRational() || this.literal[e].isEven())
          return !1;
      return !0;
    });
    /**
     * Determine if the monom is one
     */
    r(this, "isOne", () => i(this, v).value === 1 && this.variables.length === 0);
    /**
     * Determine if two monoms are similar
     * @param M
     */
    r(this, "isSameAs", (e) => {
      const t = this.variables, s = e.variables, n = t.concat(s.filter((o) => !t.includes(o)));
      if (this.isZero() || e.isZero() || t.length === 0 && s.length === 0)
        return !0;
      if (t.length !== s.length)
        return !1;
      if (!this.isZero() && !e.isZero()) {
        for (const o of n)
          if (!this.hasVariable(o) || !e.hasVariable(o) || !i(this, y)[o].isEqual(e.literal[o]))
            return !1;
      }
      return !0;
    });
    r(this, "isSquare", () => this.coefficient.isSquare() ? this.isLiteralSquare() : !1);
    /**
     * Determine if the monom is null
     */
    r(this, "isZero", () => i(this, v).value === 0);
    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    r(this, "multiply", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        i(this, v).multiply(s.coefficient);
        for (const n in s.literal)
          this.hasVariable(n) ? i(this, y)[n].add(s.literal[n]) : i(this, y)[n] = s.literal[n].clone();
      }
      return this;
    });
    /**
     * Create a one value monom
     */
    r(this, "one", () => (l(this, v, new h().one()), l(this, y, {}), this));
    /**
     * Get the opposite
     * Returns a monom.
     */
    r(this, "opposite", () => (i(this, v).opposite(), this));
    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    r(this, "pow", (e) => {
      i(this, v).pow(e);
      for (const t in i(this, y))
        i(this, y)[t].multiply(e);
      return this;
    });
    // #endregion Properties and methods (31)
    // #region Getters And Setters (11)
    r(this, "primitive", (e) => {
      e === void 0 && (e = "x");
      const t = this.clone();
      let s;
      return t.hasVariable(e) ? (s = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(s), t.setLetter(e, s)) : (t.coefficient.isZero() && (t.coefficient = new h().one()), t.setLetter(e, 1)), t;
    });
    r(this, "reduce", () => {
      this.coefficient.reduce();
      for (const e in i(this, y))
        i(this, y)[e].isZero() && this.removeVariable(e);
      return this;
    });
    /**
     * Get the nth-root of the monom
     * @param p
     */
    r(this, "root", () => {
      throw new Error("Method not implemented.");
    });
    /**
     * Set the power of a particular setLetter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the setLetter (must be positive integer.
     */
    r(this, "setLetter", (e, t) => t instanceof h ? (this.hasVariable(e) && t.isZero() && this.removeVariable(e), i(this, y)[e] = t.clone(), this) : this.setLetter(e, new h(t)));
    /**
     * Return the square root of a monom
     */
    r(this, "sqrt", () => {
      if (this.isSquare()) {
        i(this, v).sqrt();
        for (const e in i(this, y))
          i(this, y)[e].clone().divide(2);
      }
      return this;
    });
    /**
     * Subtract multiple monoms
     * @param M (Monom[]) The monoms to subtract
     */
    r(this, "subtract", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        this.isSameAs(s) ? (this.isZero() && this._cloneLiteral(s), i(this, v).add(s.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", s.display);
      }
      return this;
    });
    /**
     * Create a zero value monom
     */
    r(this, "zero", () => (l(this, v, new h().zero()), l(this, y, {}), this));
    r(this, "_evaluateAsNumeric", (e) => {
      let t = this.coefficient.value;
      if (typeof e == "number") {
        const s = {}, n = this.variables[0];
        return s[n] = e, this._evaluateAsNumeric(s);
      }
      if (e instanceof h) {
        const s = {};
        return s[this.variables[0]] = new h(e).value, this._evaluateAsNumeric(s);
      }
      if (e instanceof Pe)
        return NaN;
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient.value;
        for (const s in i(this, y)) {
          const n = e[s];
          n instanceof h ? t *= n.value ** i(this, y)[s].value : t *= n ** i(this, y)[s].value;
        }
      }
      return t;
    });
    r(this, "_shutingYardToReducedMonom", (e) => {
      const s = new Ye().parse(e).rpn, n = [];
      if (s.length === 0)
        return this.zero(), this;
      if (s.length === 1) {
        const o = s[0];
        return this.one(), o.tokenType === u.COEFFICIENT ? this.coefficient = new h(o.token) : o.tokenType === u.VARIABLE && this.setLetter(o.token, 1), this;
      } else
        for (const o of s)
          this._shutingYard_AddToken(n, o);
      return this.one(), this.multiply(n[0]), this;
    });
    r(this, "_shutingYard_AddToken", (e, t) => {
      var w;
      let s, n, o, c, f;
      if (t.tokenType === u.COEFFICIENT)
        e.push(new I(new h(t.token)));
      else if (t.tokenType === u.VARIABLE) {
        const x = new I().one();
        x.setLetter(t.token, 1), e.push(x.clone());
      } else if (t.tokenType === u.OPERATION)
        switch (t.token) {
          case "-":
            n = e.pop() ?? new I().zero(), s = e.pop() ?? new I().zero(), e.push(s.subtract(n));
            break;
          case "*":
            n = e.pop() ?? new I().one(), s = e.pop() ?? new I().one(), e.push(s.multiply(n));
            break;
          case "/":
            n = e.pop() ?? new I().one(), s = e.pop() ?? new I().one(), e.push(s.divide(n));
            break;
          case "^": {
            f = ((w = e.pop()) == null ? void 0 : w.coefficient) ?? new h().one(), o = e.pop() ?? new I().one(), c = o.variables[0], c && o.setLetter(c, f), e.push(o);
            break;
          }
        }
    });
    return l(this, v, new h().zero()), l(this, y, {}), e !== void 0 && this.parse(e), this;
  }
  /**
   * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
   * @returns {Fraction}
   */
  get coefficient() {
    return i(this, v);
  }
  /**
   * Set the coefficient \\(k\\) value of the monom
   * @param {Fraction | number | string} F
   */
  set coefficient(e) {
    l(this, v, new h(e));
  }
  // Display getter
  /**
   * This display getter is to be used in the polynom display getter
   */
  get display() {
    let e = "";
    const t = Object.keys(i(this, y)).sort();
    for (const s of t)
      i(this, y)[s].isNotZero() && (e += s, i(this, y)[s].isNotEqual(1) && (e += `^(${i(this, y)[s].display})`));
    return e === "" ? i(this, v).value != 0 ? i(this, v).display : "" : i(this, v).value === 1 ? e : i(this, v).value === -1 ? `-${e}` : i(this, v).value === 0 ? "0" : `${i(this, v).display}${e}`;
  }
  get dividers() {
    if (!this.coefficient.isRelative())
      return [this.clone()];
    if (this.containsRationalPower())
      return [this.clone()];
    if (this.coefficient.numerator > 1e6)
      return [this.clone()];
    const e = C.dividers(Math.abs(this.coefficient.numerator));
    let t = [];
    for (const n in this.literal)
      t = this._getLiteralDividers(t, n);
    const s = [];
    if (t.length > 0 && e.length > 0)
      for (const n of e)
        for (const o of t) {
          const c = new I();
          c.coefficient = new h(n), c.literal = o, s.push(c);
        }
    else if (e.length === 0)
      for (const n of t) {
        const o = new I();
        o.coefficient = new h().one(), o.literal = n, s.push(o);
      }
    else
      for (const n of e) {
        const o = new I();
        o.coefficient = new h(n), s.push(o);
      }
    return s.length === 0 ? [new I().one()] : s;
  }
  integrate(e, t, s) {
    const n = this.primitive(s);
    return n.evaluate(t).subtract(n.evaluate(e));
  }
  /**
   * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
   * @returns {literalType}
   */
  get literal() {
    return i(this, y);
  }
  /**
   * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
   * @param {literalType<Fraction>} L
   */
  set literal(e) {
    l(this, y, e);
  }
  /**
   * Get the literal square roots of the Monom.
   * TODO: remove this getter ? Is it used and is it correct ?
   * @returns {literalType<Fraction>}
   */
  get literalSqrt() {
    if (this.isLiteralSquare()) {
      const e = {};
      for (const t in i(this, y))
        e[t] = i(this, y)[t].clone().sqrt();
      return e;
    } else
      return i(this, y);
  }
  /**
   * Set the literal part of the monom from a string
   * @param inputStr  String like x^2y^3
   */
  set literalStr(e) {
    for (const t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)])
      t[1] in i(this, y) || (i(this, y)[t[1]] = new h().zero()), i(this, y)[t[1]].add(+t[2]);
    for (const t of [...e.matchAll(/([a-z](?!\^))/g)])
      t[1] in i(this, y) || (i(this, y)[t[1]] = new h().zero()), i(this, y)[t[1]].add(1);
  }
  get plotFunction() {
    let e = "";
    const t = Object.keys(i(this, y)).sort();
    for (const s of t)
      i(this, y)[s].isNotZero() && (e += (e === "" ? "" : "*") + s, i(this, y)[s].isNotEqual(1) && (e += `^(${i(this, y)[s].display})`));
    return e === "" ? i(this, v).value != 0 ? i(this, v).display : "" : i(this, v).value === 1 ? e : i(this, v).value === -1 ? `-${e}` : i(this, v).value === 0 ? "0" : `${i(this, v).display}*${e}`;
  }
  removeVariable(e) {
    delete i(this, y)[e];
  }
  /**
   * Get the tex output of the monom
   */
  get tex() {
    let e = "";
    const t = Object.keys(i(this, y)).sort();
    for (const s of t)
      i(this, y)[s].isNotZero() && (e += s, i(this, y)[s].isNotEqual(1) && (e += `^{ ${i(this, y)[s].tfrac} }`));
    return e === "" ? i(this, v).value != 0 ? i(this, v).frac : "0" : i(this, v).value === 1 ? e : i(this, v).value === -1 ? `-${e}` : i(this, v).value === 0 ? "0" : `${i(this, v).frac}${e}`;
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
      i(this, y)[t] = e.literal[t].clone();
  }
  _getLiteralDividers(e, t) {
    const s = [];
    for (let n = 0; n <= this.literal[t].value; n++)
      if (e.length === 0) {
        const o = {};
        o[t] = new h(n), s.push(o);
      } else
        for (const o of e) {
          const c = {};
          for (const f in o)
            c[f] = o[f];
          c[t] = new h(n), s.push(c);
        }
    return s;
  }
  // #endregion Private methods (5)
};
v = new WeakMap(), y = new WeakMap(), r(I, "gcd", (...e) => {
  for (const o of e)
    if (o.containsRationalPower())
      return new I().zero();
  const t = new I(), s = C.gcd(...e.map((o) => o.coefficient.numerator)), n = C.lcm(...e.map((o) => o.coefficient.denominator));
  t.coefficient = new h(s, n).reduce();
  for (const o of e) {
    for (const c in t.literal)
      c in o.literal || t.literal[c].zero();
    for (const c in o.literal)
      !t.hasVariable(c) && o.literal[c].isStrictlyPositive() ? t.literal[c] = o.literal[c].clone() : t.literal[c] = new h(Math.min(o.literal[c].value, t.literal[c].value));
  }
  return t;
}), /**
 * Multiply two monoms and return a NEW monom.
 * @param monoms
 */
r(I, "xMultiply", (...e) => {
  const t = new I().one();
  for (const s of e)
    t.multiply(s);
  return t;
});
let O = I;
var ye, d;
const A = class A {
  constructor(e, ...t) {
    // #region Class fields (8)
    E(this, ye);
    E(this, d);
    // #endregion Constructors (7)
    // #region Properties and methods (49)
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values
     */
    r(this, "parse", (e, ...t) => {
      if (l(this, d, []), l(this, ye, []), typeof e == "string")
        return this._parseString(e, ...t);
      if ((typeof e == "number" || e instanceof h || e instanceof O) && t.length === 0)
        i(this, d).push(new O(e));
      else if (e instanceof O && t.length > 0)
        i(this, d).push(new O(e)), t.forEach((s) => {
          i(this, d).push(new O(s));
        });
      else if (e instanceof A)
        for (const s of e.monoms)
          i(this, d).push(s.clone());
      return this;
    });
    /**
     * Clone the polynom
     */
    r(this, "clone", () => {
      const e = new A(), t = [];
      for (const s of i(this, d))
        t.push(s.clone());
      return e.monoms = t, e;
    });
    r(this, "add", (...e) => {
      for (const t of e)
        t instanceof A ? l(this, d, i(this, d).concat(t.monoms)) : t instanceof O ? i(this, d).push(t.clone()) : typeof t == "number" && Number.isSafeInteger(t) ? i(this, d).push(new O(t.toString())) : i(this, d).push(new O(t));
      return this.reduce();
    });
    r(this, "commonMonom", () => {
      const e = new O().one(), t = this.gcdNumerator(), s = this.gcdDenominator(), n = this.degree();
      e.coefficient = new h(t, s);
      for (const o of this.variables) {
        e.setLetter(o, n);
        for (const c of i(this, d))
          if (e.setLetter(o, h.min(c.degree(o), e.degree(o))), e.degree(o).isZero())
            break;
      }
      return e;
    });
    r(this, "degree", (e) => {
      let t = new h().zero();
      for (const s of i(this, d))
        t = h.max(s.degree(e).value, t);
      return t;
    });
    r(this, "derivative", (e) => {
      const t = new A();
      for (const s of i(this, d))
        t.add(s.derivative(e));
      return t;
    });
    r(this, "divide", (e) => {
      if (e instanceof h)
        return this._divideByFraction(e);
      if (typeof e == "number" && Number.isSafeInteger(e))
        return this._divideByInteger(e);
      if (e instanceof O)
        return this.divide(new A(e));
      if (e instanceof A) {
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
    r(this, "empty", () => (l(this, d, []), this));
    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    r(this, "euclidean", (e) => {
      const t = e.variables[0], s = new A().zero(), n = this.clone().reorder(t);
      if (e.variables.length === 0)
        return {
          quotient: this.clone().divide(e).reduce(),
          reminder: new A().zero()
        };
      const o = e.monomByDegree(void 0, t), c = e.degree(t);
      let f, w = this.degree(t).value * 2;
      for (; n.degree(t).isGeq(c) && w > 0 && (w--, f = n.monomByDegree(void 0, t).clone().divide(o), !(!f.isZero() && (s.add(f), n.subtract(e.clone().multiply(f)).reduce(), f.degree(t).isZero()))); )
        ;
      return s.reduce(), n.reduce(), { quotient: s, reminder: n };
    });
    r(this, "evaluate", (e, t) => {
      if (t)
        return this._evaluateAsNumeric(e);
      const s = new h().zero();
      return i(this, d).forEach((n) => {
        s.add(n.evaluate(e, t));
      }), s;
    });
    // -------------------------------------
    /**
     * Factorize a polynom and store the best results in factors.
     * @param maxValue Defines the greatest value to search to (default is 20).
     */
    r(this, "factorize", (e) => {
      let t = [], s = this.clone().reorder();
      const n = s.commonMonom();
      if (s.monomByDegree().coefficient.isStrictlyNegative() && n.coefficient.isStrictlyPositive() && !n.isOne() && n.opposite(), !n.isOne()) {
        const f = new A(n);
        t = [f.clone()], s = s.euclidean(f).quotient;
      }
      let o = s.degree().clone().multiply(2).value, c = 1;
      for (; o >= 0; )
        if (o--, s.monoms.length < 2) {
          s.isOne() || (t.push(s.clone()), s.one());
          break;
        } else if (s.degree(e).isOne()) {
          t.push(s.clone()), s.one();
          break;
        } else {
          let f = this._getAllPotentialFactors(s, c, e ?? "x");
          for (c = s.degree(e).value; f.length > 0; ) {
            const w = f[0];
            if (!s.isDividableBy(w))
              f.shift();
            else {
              const x = s.euclidean(w);
              t.push(w), s = x.quotient.clone(), f = f.filter((g) => {
                const N = s.monoms[0], k = s.monoms[s.monoms.length - 1], j = g.monoms[0], X = g.monoms[g.monoms.length - 1];
                return k.isDivisible(X) ? N.isDivisible(j) : !1;
              });
            }
          }
        }
      return s.isOne() || t.push(s.clone()), l(this, ye, t), i(this, ye);
    });
    r(this, "gcdDenominator", () => C.gcd(...this.getDenominators()));
    r(this, "gcdNumerator", () => C.gcd(...this.getNumerators()));
    // Next functions are used for for commonMonom, which is used in the factorize method.
    r(this, "getDenominators", () => {
      const e = [];
      for (const t of i(this, d))
        e.push(t.coefficient.denominator);
      return e;
    });
    r(this, "getNumerators", () => {
      const e = [];
      for (const t of i(this, d))
        e.push(t.coefficient.numerator);
      return e;
    });
    r(this, "getZeroes", () => new ze(
      new U(this, 0)
    ).solve());
    r(this, "integrate", (e, t, s = "x") => {
      const n = this.primitive(s), o = {}, c = {};
      return o[s] = new h(e), c[s] = new h(t), n.evaluate(c).subtract(n.evaluate(o));
    });
    r(this, "isDeveloped", (e) => {
      let t;
      const s = e.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
      if (s.includes("(") || s.includes(")"))
        return !1;
      try {
        t = new A(e);
      } catch {
        return !1;
      }
      return !!this.isEqual(t);
    });
    r(this, "isDividableBy", (e) => {
      if (e.degree().isOne()) {
        const t = e.getZeroes()[0];
        return t.exact instanceof h ? this.evaluate(t.exact).isZero() : !1;
      } else {
        const { reminder: t } = this.euclidean(e);
        return t.isZero();
      }
    });
    r(this, "isEqual", (e) => this._compare(e, "="));
    r(this, "isOppositeAt", (e) => this._compare(e.clone().opposite(), "="));
    r(this, "isReduced", (e) => {
      if (!this.isDeveloped(e))
        return !1;
      const t = new A(e);
      if (t.monoms.length > this.monoms.length)
        return !1;
      for (const s of t.monoms)
        if (!s.coefficient.isReduced())
          return !1;
      return !1;
    });
    r(this, "isSameAs", (e) => this._compare(e, "same"));
    r(this, "lcmDenominator", () => C.lcm(...this.getDenominators()));
    r(this, "lcmNumerator", () => C.lcm(...this.getNumerators()));
    r(this, "letters", () => {
      let e = /* @__PURE__ */ new Set();
      for (const t of i(this, d))
        e = /* @__PURE__ */ new Set([...e, ...t.variables]);
      return [...e];
    });
    r(this, "limitToInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), s = t.coefficient.sign(), n = t.degree(e);
      return n.isStrictlyPositive() ? s === 1 ? new h().infinite() : new h().infinite().opposite() : n.isZero() ? t.coefficient : new h().zero();
    });
    r(this, "limitToNegativeInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), s = t.coefficient.sign(), n = t.degree(e);
      return n.isStrictlyPositive() ? s === -1 ? new h().infinite() : new h().infinite().opposite() : n.isZero() ? t.coefficient : new h().zero();
    });
    r(this, "monomByDegree", (e, t) => {
      if (e === void 0)
        return this.monomByDegree(this.degree(t), t);
      const s = this.clone().reduce();
      for (const n of i(s, d))
        if (n.degree(t).isEqual(e))
          return n.clone();
      return new O().zero();
    });
    // Used in LinearSystem.tex
    r(this, "monomByLetter", (e) => {
      const t = this.clone().reduce();
      for (const s of i(t, d))
        if (s.hasVariable(e))
          return s.clone();
      return new O().zero();
    });
    r(this, "monomsByDegree", (e, t) => {
      if (e === void 0)
        return this.monomsByDegree(this.degree(t));
      const s = [], n = this.clone().reduce();
      for (const o of i(n, d))
        o.degree(t) === e && s.push(o.clone());
      return s;
    });
    r(this, "multiply", (e) => e instanceof A ? this._multiplyByPolynom(e) : e instanceof h ? this._multiplyByFraction(e) : e instanceof O ? this._multiplyByMonom(e) : Number.isSafeInteger(e) && typeof e == "number" ? this._multiplyByInteger(e) : this);
    r(this, "one", () => (l(this, d, []), i(this, d).push(new O().one()), this));
    // ------------------------------------------
    r(this, "opposite", () => (l(this, d, i(this, d).map((e) => e.opposite())), this));
    r(this, "pow", (e) => {
      if (!Number.isSafeInteger(e))
        return this.zero();
      if (e < 0)
        return this.zero();
      if (e === 0)
        return new A();
      const t = this.clone();
      for (let s = 1; s < e; s++)
        this.multiply(t);
      return this.reduce();
    });
    r(this, "primitive", (e) => {
      const t = new A();
      for (const s of i(this, d))
        t.add(s.primitive(e));
      return t;
    });
    r(this, "reduce", () => {
      let e = 0;
      for (; e < i(this, d).length; ) {
        for (let t = e + 1; t < i(this, d).length; t++)
          i(this, d)[e].isSameAs(i(this, d)[t]) && (i(this, d)[e].add(i(this, d)[t]), i(this, d).splice(t, 1), i(this, d)[e].isZero() && (i(this, d)[e] = new O().zero()), t--);
        e++;
      }
      l(this, d, i(this, d).filter((t) => !t.coefficient.isZero()));
      for (const t of i(this, d))
        t.coefficient.reduce();
      return this.length === 0 ? new A().zero() : this.reorder();
    });
    r(this, "reorder", (e = "x", t) => {
      t === void 0 && (t = !1);
      const s = this.variables.filter((n) => n !== e);
      return i(this, d).sort(function(n, o) {
        const c = n.degree(e).value, f = o.degree(e).value;
        if (c !== f)
          return t ? c - f : f - c;
        if (s.length > 0)
          for (const w of s) {
            const x = n.degree(w).value, g = o.degree(w).value;
            if (x !== g)
              return t ? x - g : g - x;
          }
        return 0;
      }), this;
    });
    /**
     * Replace a variable (letter) by a polynom.
     * @param letter
     * @param P
     */
    r(this, "replaceBy", (e, t) => {
      let s;
      const n = new A().zero();
      for (const o of this.monoms)
        !o.hasVariable(e) || o.literal[e].isZero() ? n.add(o.clone()) : (s = o.literal[e].clone(), o.removeVariable(e), n.add(t.clone().pow(Math.abs(s.numerator)).multiply(o)));
      return l(this, d, n.reduce().monoms), this;
    });
    r(this, "subtract", (...e) => {
      for (const t of e)
        t instanceof A ? this.add(t.clone().opposite()) : t instanceof O ? i(this, d).push(t.clone().opposite()) : i(this, d).push(new O(t).opposite());
      return this.reduce();
    });
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    r(this, "zero", () => (l(this, d, []), i(this, d).push(new O().zero()), this));
    // #endregion Getters And Setters (22)
    // #region Private methods (15)
    r(this, "_compare", (e, t) => {
      t === void 0 && (t = "=");
      const s = this.clone().reduce(), n = e.clone().reduce();
      switch (t) {
        case "=":
          return s.length !== n.length || s.degree().isNotEqual(n.degree()) ? !1 : s.monoms.every((o, c) => o.isEqual(n.monoms[c]));
        case "same":
          return s.length !== n.length || !s.degree().isEqual(n.degree()) ? !1 : s.monoms.every((o, c) => o.isSameAs(n.monoms[c]));
        default:
          return !1;
      }
    });
    r(this, "_divideByFraction", (e) => {
      for (const t of i(this, d))
        t.coefficient.divide(e);
      return this;
    });
    r(this, "_divideByInteger", (e) => {
      const t = new h(e);
      for (const s of i(this, d))
        s.coefficient.divide(t);
      return this;
    });
    r(this, "_evaluateAsNumeric", (e) => {
      let t = 0;
      return i(this, d).forEach((s) => {
        t += s.evaluate(e, !0);
      }), t;
    });
    r(this, "_factorize2ndDegree", (e) => {
      let t, s, n, o, c, f, w, x, g;
      if (this.numberOfVars === 1)
        return n = this.monomByDegree(2, e).coefficient, o = this.monomByDegree(1, e).coefficient, c = this.monomByDegree(0, e).coefficient, f = o.clone().pow(2).subtract(n.clone().multiply(c).multiply(4)), f.isZero() ? (w = o.clone().opposite().divide(n.clone().multiply(2)), t = new A(e).subtract(w.display).multiply(w.denominator), s = new A(e).subtract(w.display).multiply(w.denominator), g = n.divide(w.denominator).divide(w.denominator), g.isOne() ? [t, s] : [new A(g.display), t, s]) : f.isPositive() && f.isSquare() ? (w = o.clone().opposite().add(f.clone().sqrt()).divide(n.clone().multiply(2)), x = o.clone().opposite().subtract(f.clone().sqrt()).divide(n.clone().multiply(2)), g = n.divide(w.denominator).divide(x.denominator), g.isOne() ? [
          new A(e).subtract(w.display).multiply(w.denominator),
          new A(e).subtract(x.display).multiply(x.denominator)
        ] : [
          new A(g.display),
          new A(e).subtract(w.display).multiply(w.denominator),
          new A(e).subtract(x.display).multiply(x.denominator)
        ]) : [this.clone()];
      if (n = this.monomByDegree(2, e), o = this.monomByDegree(1, e), c = this.monomByDegree(0, e), n.isLiteralSquare() && c.isLiteralSquare() && o.clone().pow(2).isSameAs(n.clone().multiply(c))) {
        const k = new A("x", n.coefficient, o.coefficient, c.coefficient)._factorize2ndDegree("x"), j = [];
        let X;
        if (k.length >= 2) {
          for (const K of k)
            K.degree().isZero() ? j.push(K.clone()) : (X = K.clone(), X.monoms[0].literal = n.literalSqrt, X.monoms[1].literal = c.literalSqrt, j.push(X.clone()));
          return j;
        }
      }
      return [this.clone()];
    });
    r(this, "_factorizeByGroups", () => []);
    r(this, "_getAllPotentialFactors", (e, t, s) => {
      const n = e.monoms[0].dividers, o = e.monoms[e.monoms.length - 1].dividers, c = [];
      return n.forEach((f) => {
        f.degree(s).isLeq(t) && o.forEach((w) => {
          f.degree(s).isNotEqual(w.degree(s)) && (c.push(new A(f, w)), c.push(new A(f, w.clone().opposite())));
        });
      }), c;
    });
    r(this, "_multiplyByFraction", (e) => {
      for (const t of i(this, d))
        t.coefficient.multiply(e);
      return this.reduce();
    });
    r(this, "_multiplyByInteger", (e) => this._multiplyByFraction(new h(e)));
    r(this, "_multiplyByMonom", (e) => {
      for (const t of i(this, d))
        t.multiply(e);
      return this.reduce();
    });
    r(this, "_multiplyByPolynom", (e) => {
      const t = [];
      for (const s of i(this, d))
        for (const n of e.monoms)
          t.push(O.xMultiply(s, n));
      return l(this, d, t), this.reduce();
    });
    r(this, "_shutingYard_addToken", (e, t) => {
      switch (t.tokenType) {
        case u.COEFFICIENT:
          e.push(new A(t.token));
          break;
        case u.VARIABLE:
          e.push(new A().add(new O(t.token)));
          break;
        case u.CONSTANT:
          console.log("Actually, not supported - will be added later !");
          break;
        case u.OPERATION:
          if (e.length >= 2) {
            const s = e.pop(), n = e.pop();
            if (n === void 0 || s === void 0)
              break;
            if (t.token === "+")
              e.push(n.add(s));
            else if (t.token === "-")
              e.push(n.subtract(s));
            else if (t.token === "*")
              e.push(n.multiply(s));
            else if (t.token === "/")
              s.degree().isStrictlyPositive() ? console.log("divide by a polynom -> should create a rational polynom !") : e.push(n.divide(s.monoms[0].coefficient));
            else if (t.token === "^")
              if (s.degree().isStrictlyPositive())
                console.error("Cannot elevate a polynom with another polynom !", n.tex, s.tex);
              else if (s.monoms[0].coefficient.isRelative())
                e.push(n.pow(s.monoms[0].coefficient.value));
              else if (n.monoms.length === 1 && n.monoms[0].coefficient.isOne()) {
                for (const o in n.monoms[0].literal)
                  n.monoms[0].literal[o].multiply(s.monoms[0].coefficient);
                e.push(n);
              } else
                console.error("Cannot have power with fraction");
          } else if (t.token === "-") {
            const s = e.pop();
            s && e.push(s.opposite());
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
    });
    r(this, "genDisplay", (e, t, s, n) => {
      let o = "";
      for (const c of i(this, d)) {
        if (c.coefficient.value === 0)
          continue;
        let f;
        n ? f = c.plotFunction : f = e === "tex" ? c.tex : c.display, o += `${c.coefficient.sign() === 1 && (o !== "" || t === !0) ? "+" : ""}${f}`;
      }
      return s === !0 && this.length > 1 && (e === "tex" ? o = `\\left( ${o} \\right)` : o = `(${o})`), o === "" && (o = "0"), o;
    });
    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    r(this, "_shutingYardToReducedPolynom", (e) => {
      const s = new Ye().parse(e).rpn;
      this.zero();
      const n = [];
      for (const o of s)
        this._shutingYard_addToken(n, o);
      return n.length === 1 && this.add(n[0]), this.reorder();
    });
    return l(this, d, []), l(this, ye, []), e !== void 0 && this.parse(e, ...t), this;
  }
  hasVariable(e) {
    return this.variables.includes(e);
  }
  inverse() {
  }
  isOne() {
    return i(this, d).length === 1 && i(this, d)[0].coefficient.isOne();
  }
  isZero() {
    return i(this, d).length === 1 && i(this, d)[0].coefficient.isZero() || i(this, d).length === 0;
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
    return i(this, d).some((e) => e.variables.length > 1);
  }
  get length() {
    return i(this, d).length;
  }
  // ------------------------------------------
  get monoms() {
    return i(this, d);
  }
  set monoms(e) {
    l(this, d, e);
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
    for (const t of i(this, d))
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
        const s = new O(e);
        return this.add(s), this;
      }
      return this._shutingYardToReducedPolynom(e);
    } else if (/^[a-z]+/.test(e)) {
      this.empty();
      const s = t.map((n) => new h(n));
      if (e.length > 1) {
        const n = e.split("");
        let o = 0;
        for (const c of s) {
          const f = new O();
          f.coefficient = c.clone(), f.literalStr = n[o] || "", this.add(f), o++;
        }
      } else {
        let n = s.length - 1;
        for (const o of s) {
          const c = new O();
          c.coefficient = o.clone(), c.literalStr = `${e}^${n}`, this.add(c), n--;
        }
      }
      return this;
    } else
      return this.zero();
  }
  // #endregion Private methods (15)
};
ye = new WeakMap(), d = new WeakMap();
let M = A;
var ie, xe;
const _e = class _e {
  constructor(e, t = "x") {
    E(this, ie);
    E(this, xe);
    l(this, ie, e), l(this, xe, t);
  }
  solve() {
    if (i(this, ie).degree().isOne())
      return this._solveLinear();
    if (i(this, ie).degree().value === 2)
      return this._solveQuadratic();
    const e = this._solveByFactorization();
    if (e.length > 0)
      return e;
    if (i(this, ie).degree().value === 3)
      return this._solveCubic_CardanFormula();
    throw new Error("The equation degree is too high.");
  }
  solveAsCardan() {
    if (i(this, ie).degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return this._solveCubic_CardanFormula();
  }
  _makeSolution(e) {
    if (e instanceof h && e.isApproximative())
      return this._makeApproximativeSolution(e.value);
    const t = new h(e);
    return {
      variable: i(this, xe),
      exact: t,
      value: t.value,
      tex: t.tex,
      display: t.display
    };
  }
  _makeApproximativeSolution(e, t) {
    return {
      variable: i(this, xe),
      exact: !1,
      value: +e.toFixed(10),
      tex: (t == null ? void 0 : t.tex) ?? "",
      display: (t == null ? void 0 : t.display) ?? ""
    };
  }
  _solveLinear() {
    const e = i(this, ie).moveLeft().left, t = e.monomByDegree(0).coefficient.clone().opposite().divide(e.monomByDegree(1).coefficient);
    return [
      this._makeSolution(t)
    ];
  }
  _solveQuadratic() {
    const e = i(this, ie).moveLeft().left, t = e.monomByDegree(2).coefficient, s = e.monomByDegree(1).coefficient, n = e.monomByDegree(0).coefficient, o = s.clone().pow(2).subtract(t.clone().multiply(n).multiply(4));
    if (o.isNegative())
      return [];
    if (o.isSquare()) {
      const c = o.sqrt(), f = s.clone().opposite().add(c).divide(t.clone().multiply(2)), w = s.clone().opposite().subtract(c).divide(t.clone().multiply(2));
      return c.isZero() ? [this._makeSolution(f)] : [
        this._makeSolution(f),
        this._makeSolution(w)
      ].sort((x, g) => x.value - g.value);
    }
    return this._solveQuadratic_Output(t, s, o);
  }
  _solveQuadratic_Output(e, t, s) {
    const n = C.dividers(s.value).filter((te) => Math.sqrt(te) % 1 === 0).map((te) => Math.sqrt(te)).pop() ?? 1, o = C.gcd(2 * e.value, t.value, n) * (e.isNegative() ? -1 : 1), c = t.clone().divide(o).opposite(), f = e.clone().divide(o).multiply(2), w = s.clone().divide(n ** 2), x = Math.abs(n / o), g = n === 1 ? "-" : `-${x} `, N = n === 1 ? "+" : `+${x} `;
    function k(te, J, Ne, Re) {
      return `\\frac{ ${J} ${Ne}\\sqrt{ ${Re} } }{ ${te} }`;
    }
    function j(te, J, Ne, Re) {
      return `(${J}${Ne}sqrt(${Re}))/${te}`;
    }
    const X = s.value ** 0.5, K = (-t.value - X) / (2 * e.value), ue = (-t.value + X) / (2 * e.value);
    return [
      this._makeApproximativeSolution(
        K,
        {
          tex: k(f.tex, c.tex, g.toString(), w.tex),
          display: j(f.display, c.display, g.toString(), w.display)
        }
      ),
      this._makeApproximativeSolution(
        ue,
        {
          tex: k(f.tex, c.tex, N.toString(), w.tex),
          display: j(f.display, c.display, N.toString(), w.display)
        }
      )
    ].sort((te, J) => te.value - J.value);
  }
  _solveCubic_CardanFormula() {
    const e = i(this, ie).moveLeft().left, t = e.monomByDegree(3).coefficient, s = e.monomByDegree(2).coefficient, n = e.monomByDegree(1).coefficient, o = e.monomByDegree(0).coefficient, c = s.clone().divide(t), f = n.clone().divide(t), w = o.clone().divide(t), x = f.clone().subtract(c.clone().pow(2).divide(3)), g = w.clone().subtract(c.clone().multiply(f).divide(3)).add(c.clone().pow(3).multiply(2).divide(27)), N = g.clone().opposite(), k = x.clone().opposite().pow(3).divide(27), j = N.clone().pow(2).subtract(k.clone().multiply(4)).opposite();
    if (j.isNegative()) {
      const X = g.clone().opposite().add(j.clone().opposite().sqrt()).divide(2).root(3), K = g.clone().opposite().subtract(j.clone().opposite().sqrt()).divide(2).root(3), ue = X.clone().add(K).subtract(c.clone().divide(3));
      return [this._makeSolution(ue)];
    }
    if (j.isZero()) {
      const X = g.clone().opposite().divide(2).root(3), K = X.clone().opposite().subtract(c.clone().divide(3)), ue = X.clone().multiply(2).subtract(c.clone().divide(3));
      return K.isEqual(ue) ? [this._makeSolution(K)] : [
        this._makeSolution(ue),
        this._makeSolution(K)
      ].sort((te, J) => te.value - J.value);
    }
    if (j.isPositive()) {
      const X = [], K = x.value, ue = g.value, te = c.value;
      for (let J = 0; J < 3; J++)
        X.push(2 * Math.sqrt(-K / 3) * Math.cos(Math.acos(3 * ue / (2 * K) * Math.sqrt(-3 / K)) / 3 + 2 * Math.PI * J / 3) - te / 3);
      return X.map((J) => this._makeApproximativeSolution(J)).sort((J, Ne) => J.value - Ne.value);
    }
    return [];
  }
  _solveByFactorization() {
    let e = i(this, ie).moveLeft().left.clone(), t = [];
    const s = e.lcmDenominator();
    s !== 1 && e.multiply(s);
    const n = e.monomByDegree().coefficient;
    let o = e.monomByDegree(0).coefficient;
    const c = new M("x");
    for (; o.isZero(); )
      t.length === 0 && t.push(this._makeSolution(0)), e = e.divide(c), o = e.monomByDegree(0).coefficient;
    const f = C.dividers(n.value), w = C.dividers(o.value);
    for (const g of f)
      for (const N of w) {
        const k = new h(N, g);
        e.evaluate(k).isZero() && !t.find((j) => j.value === k.value) && t.push(this._makeSolution(k)), k.opposite(), e.evaluate(k).isZero() && !t.find((j) => j.value === k.value) && t.push(this._makeSolution(k));
      }
    for (const g of t) {
      if (g.exact !== !1 && g.exact.isZero())
        continue;
      const N = new M("x", g.exact.denominator, -g.exact.numerator);
      for (; e.isDividableBy(N); )
        e = e.divide(N);
    }
    if (e.degree().isZero())
      return t.sort((g, N) => g.value - N.value);
    if (e.degree().value > 3)
      return [];
    const x = new _e(new U(e, 0));
    return t = t.concat(x.solve()), t.sort((g, N) => g.value - N.value);
  }
};
ie = new WeakMap(), xe = new WeakMap();
let ze = _e;
var qe, b, T, R;
const se = class se {
  constructor(e, t, s) {
    // #region Class fields (6)
    // TODO: Randomize defaults should be something else...
    E(this, qe, {
      degree: 2
    });
    // Left part of the equation
    E(this, b);
    // Right part of the equation
    E(this, T);
    // Signe of the equation
    E(this, R);
    // #endregion Constructors (3)
    // #region Properties and methods (26)
    // ------------------------------------------
    r(this, "parse", (e) => {
      const t = this._findSign(e);
      if (t === !1)
        throw new Error("The equation is not valid (no sign found)");
      const s = e.split(t);
      return this.create(new M(s[0]), new M(s[1]), this._formatSign(t));
    });
    r(this, "create", (e, t, s) => (l(this, b, e), l(this, T, t), l(this, R, this._formatSign(s ?? "=")), this));
    r(this, "clone", () => new se(i(this, b).clone(), i(this, T).clone(), i(this, R)));
    /**
     * Get the degree of the equation
     * @param letter
     */
    r(this, "degree", (e) => h.max(i(this, b).degree(e), i(this, T).degree(e)));
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
    r(this, "divide", (e) => {
      const t = new h(e);
      return t.isZero() ? this : this.multiply(t.inverse());
    });
    /**
     * Determine if the equation contains a variable.
     * @param letter
     */
    r(this, "hasVariable", (e) => this.variables.includes(e));
    r(this, "isLinearTo", (e) => {
      const t = e.clone().moveLeft().simplify().left, s = this.clone().moveLeft().simplify().left;
      return t.isEqual(s) || t.isOppositeAt(s);
    });
    /**
     * Determine if the equation contains more than one letter/variable.
     */
    r(this, "isMultiVariable", () => i(this, b).isMultiVariable || i(this, T).isMultiVariable);
    // -----------------------------------------------
    // Equations helpers
    r(this, "isEqualTo", (e) => {
      const t = e.clone().moveLeft().left, s = this.clone().moveLeft().left;
      return t.isEqual(s) || t.isOppositeAt(s);
    });
    /**
     * Reorder the polynom to have only one letter on the left, the rest on the right.
     * @param letter
     */
    r(this, "isolate", (e) => {
      if (!this.degree(e).isOne() || this.isMultiVariable())
        return !1;
      let t;
      i(this, b).subtract(i(this, T)), i(this, T).zero();
      const s = [...i(this, b).monoms];
      for (const o of s)
        o.hasVariable(e) || (t = o.clone(), i(this, b).subtract(t), i(this, T).subtract(t));
      if (i(this, b).length !== 1)
        return !1;
      const n = i(this, b).monoms[0].coefficient.clone();
      return i(this, b).divide(n), i(this, T).divide(n), this;
    });
    // -----------------------------------------------
    // Equations operations
    // -----------------------------------------------
    r(this, "letters", () => [.../* @__PURE__ */ new Set([...i(this, b).letters(), ...i(this, T).letters()])]);
    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    r(this, "moveLeft", () => (l(this, b, i(this, b).clone().subtract(i(this, T))), i(this, T).zero(), this));
    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    r(this, "multiply", (e) => {
      const t = new h(e);
      return i(this, b).multiply(t), i(this, T).multiply(t), i(this, R) !== "=" && t.sign() === -1 && this._reverseSign(), this;
    });
    r(this, "opposite", () => (l(this, b, i(this, b).opposite()), l(this, T, i(this, T).opposite()), this));
    r(this, "reorder", (e) => (i(this, b).subtract(i(this, T)), i(this, T).zero(), i(this, b).reorder(), e ? this : (i(this, b).monoms.filter((t) => t.degree().isZero()).forEach((t) => {
      const s = t.clone();
      i(this, b).subtract(s), i(this, T).subtract(s);
    }), i(this, b).reorder(), i(this, T).reorder(), this)));
    // ------------------------------------------
    r(this, "replaceBy", (e, t) => (i(this, b).replaceBy(e, t), i(this, T).replaceBy(e, t), this));
    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    r(this, "simplify", () => (this.multiply(C.lcm(...i(this, b).getDenominators(), ...i(this, T).getDenominators())), this.divide(C.gcd(...i(this, b).getNumerators(), ...i(this, T).getNumerators())), this));
    // -----------------------------------------------
    r(this, "solve", () => new ze(this.clone()).solve());
    r(this, "test", (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e)));
    // #endregion Getters And Setters (13)
    // #region Private methods (6)
    r(this, "_findSign", (e) => {
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
    r(this, "_formatSign", (e) => e === void 0 ? "=" : e.includes("geq") || e.includes(">=") || e.includes("=>") ? ">=" : e.includes(">") ? ">" : e.includes("leq") || e.includes("<=") || e.includes("=<") ? "<=" : e.includes("<") ? "<" : "=");
    r(this, "_reverseSign", () => i(this, R) === "=" ? this : i(this, R).includes("<") ? (i(this, R).replace("<", ">"), this) : i(this, R).includes(">") ? (i(this, R).replace(">", "<"), this) : this);
    r(this, "isAlsoEqual", () => !!(i(this, R).includes("=") || i(this, R).includes("geq") || i(this, R).includes("leq")));
    r(this, "isGreater", () => i(this, R).includes(">") ? !0 : i(this, R).includes("geq"));
    r(this, "isStrictEqual", () => i(this, R) === "=");
    if (l(this, b, new M().zero()), l(this, T, new M().zero()), l(this, R, "="), e !== void 0 && t === void 0) {
      if (e instanceof se)
        return e.clone();
      typeof e == "string" && this.parse(e);
    } else e !== void 0 && t !== void 0 && (this.left = new M(e), this.right = new M(t));
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
    if (e instanceof se)
      return i(this, b).add(e.left), i(this, T).add(e.right), this;
    if (typeof e == "string" && !se.isEquationString(e))
      return this.add(new se(e));
    const t = new M(e);
    return i(this, b).add(t), i(this, T).add(t), this;
  }
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param values
   * @param asNumeric
   */
  evaluate(e, t) {
    const s = i(this, b).evaluate(e, t), n = i(this, T).evaluate(e, t);
    return t ? s === n : s.isEqual(n);
  }
  pow(e) {
    return i(this, b).pow(e), i(this, T).pow(e), this;
  }
  reduce() {
    return this.moveLeft(), i(this, b).reduce(), this.simplify(), i(this, b).monoms[0].coefficient.isNegative() && this.multiply(-1), this;
  }
  split() {
    return [i(this, b).clone(), i(this, T).clone()];
  }
  subtract(e) {
    if (e instanceof se)
      return i(this, b).subtract(e.left), i(this, T).subtract(e.right), this;
    if (typeof e == "string" && !se.isEquationString(e))
      return this.subtract(new se(e));
    const t = new M(e);
    return i(this, b).subtract(t), i(this, T).subtract(t), this;
  }
  static isEquationString(e) {
    return e.includes("=") || e.includes("<") || e.includes(">") || e.includes("<=") || e.includes(">=");
  }
  static makeSolutionsUnique(e, t) {
    const s = [], n = e.filter((o) => s.includes(o.tex) ? !1 : (s.push(o.tex), !0));
    return t === !0 && n.sort((o, c) => o.value - c.value), n;
  }
  // #endregion Properties and methods (26)
  // #region Getters And Setters (13)
  get display() {
    return `${i(this, b).display}${this.signAsTex}${i(this, T).display}`;
  }
  // Getter and setter
  get left() {
    return i(this, b);
  }
  set left(e) {
    l(this, b, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  // Creation / parsing functions
  get randomizeDefaults() {
    return i(this, qe);
  }
  set randomizeDefaults(e) {
    l(this, qe, e);
  }
  get right() {
    return i(this, T);
  }
  set right(e) {
    l(this, T, e);
  }
  // ------------------------------------------
  get sign() {
    return i(this, R);
  }
  set sign(e) {
    l(this, R, this._formatSign(e));
  }
  get signAsTex() {
    return i(this, R) === ">=" ? "\\geq" : i(this, R) === "<=" ? "\\leq" : i(this, R);
  }
  get tex() {
    return `${i(this, b).tex}${this.signAsTex}${i(this, T).tex}`;
  }
  get variables() {
    return [...new Set(i(this, T).variables.concat(i(this, b).variables))];
  }
  // #endregion Private methods (6)
};
qe = new WeakMap(), b = new WeakMap(), T = new WeakMap(), R = new WeakMap();
let U = se;
var S, V;
const Oe = class Oe {
  constructor(e, t) {
    E(this, S);
    E(this, V);
    if (l(this, S, new M().zero()), l(this, V, new M().one()), e instanceof Oe)
      return e.clone();
    e !== void 0 && (l(this, S, new M(e)), l(this, V, new M(t ?? 1)));
  }
  get tex() {
    return `\\frac{ ${i(this, S).tex} }{ ${i(this, V).tex} }`;
  }
  get display() {
    return `(${i(this, S).display})/(${i(this, V).display})`;
  }
  get numerator() {
    return i(this, S);
  }
  get denominator() {
    return i(this, V);
  }
  clone() {
    return new Oe(
      i(this, S).clone(),
      i(this, V).clone()
    );
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  zero() {
    return i(this, S).zero(), i(this, V).one(), this;
  }
  one() {
    return i(this, S).one(), i(this, V).one(), this;
  }
  add(e) {
    throw new Error("Method not implemented.");
  }
  subtract(e) {
    throw new Error("Method not implemented.");
  }
  opposite() {
    return i(this, S).opposite(), this;
  }
  multiply(e) {
    return e instanceof Oe ? (i(this, S).multiply(e.numerator), i(this, V).multiply(e.denominator)) : i(this, S).multiply(e), this;
  }
  divide(e) {
    return this.inverse().multiply(e);
  }
  reduce() {
    throw new Error("Method not implemented.");
  }
  isEqual(e) {
    throw new Error("Method not implemented.");
  }
  isZero() {
    return i(this, S).isZero();
  }
  isOne() {
    return i(this, S).isOne() && i(this, V).isOne();
  }
  inverse() {
    const e = i(this, S).clone(), t = i(this, V).clone();
    return l(this, S, t), l(this, V, e), this;
  }
  pow(e) {
    if (!Number.isSafeInteger(e))
      throw new Error("Cannot take the power of a polynom with a non integer value");
    return e < 0 ? this.inverse().pow(-e) : (i(this, S).pow(e), i(this, V).pow(e), this);
  }
  sqrt() {
    throw new Error("Cannot take the square root from a polynom");
  }
  root() {
    throw new Error("Cannot take the nth root from a polynom");
  }
  derivative() {
    throw new Error("Method not implemented.");
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  integrate(e, t, s) {
    throw new Error("Method not implemented.");
  }
  get variables() {
    const e = i(this, S).variables, t = i(this, V).variables;
    return [.../* @__PURE__ */ new Set([...e, ...t])];
  }
  hasVariable(e) {
    return i(this, S).hasVariable(e) || i(this, V).hasVariable(e);
  }
  degree() {
    throw new Error("Getting the degree of a rational polynom is not possible");
  }
  evaluate(e, t) {
    const s = i(this, S).evaluate(e, t), n = i(this, V).evaluate(e, t);
    return s instanceof h && n instanceof h ? s.divide(n) : s / n;
  }
};
S = new WeakMap(), V = new WeakMap();
let Se = Oe;
function gt(a, e) {
  return a.dimension === e.dimension && a.array.every(
    (t, s) => e.array[s].isEqual(t)
  );
}
function wt(a, e) {
  if (a.dimension !== e.dimension)
    return !1;
  const t = a.array[0].value / e.array[0].value;
  return a.array.every(
    (s, n) => e.array[n].value === t * s.value
  );
}
function He(a, e) {
  return a.dimension !== e.dimension ? new h().invalid() : a.array.reduce(
    (t, s, n) => t.add(s.clone().multiply(e.array[n])),
    new h(0)
  );
}
var D, F, ge;
const ne = class ne {
  constructor(e, t) {
    E(this, D, new h().zero());
    // 1st component
    E(this, F, new h().zero());
    // 2nd component
    E(this, ge, !1);
    r(this, "parse", (e, t) => {
      if (this.zero(), t === void 0)
        return e instanceof ne ? e.clone() : this._parseString(e);
      if (e instanceof ne && t instanceof ne)
        return l(this, D, t.x.clone().subtract(t.x)), l(this, F, t.x.clone().subtract(t.y)), this;
      if ((e instanceof h || typeof e == "number" || typeof e == "string") && (t instanceof h || typeof t == "number" || typeof t == "string"))
        return l(this, D, new h(e)), l(this, F, new h(t)), this;
      if (typeof e == "object" && Object.hasOwn(e, "x") && Object.hasOwn(e, "y") && typeof t == "object" && Object.hasOwn(t, "x") && Object.hasOwn(t, "y")) {
        const s = e, n = t;
        return l(this, D, new h(s.x).clone().subtract(n.x)), l(this, F, new h(s.y).clone().subtract(n.y)), this;
      }
      return this;
    });
    r(this, "zero", () => (l(this, D, new h(0)), l(this, F, new h(0)), this));
    r(this, "one", () => (l(this, D, new h(1)), l(this, F, new h(0)), this));
    r(this, "opposite", () => (i(this, D).opposite(), i(this, F).opposite(), this));
    r(this, "add", (e) => (i(this, D).add(e.x), i(this, F).add(e.y), this));
    r(this, "subtract", (e) => this.add(e.clone().opposite()));
    r(this, "unit", () => {
      const e = this.norm;
      return e === 0 ? this : this.divideByScalar(e);
    });
    r(this, "middleOf", (e, t) => (l(this, D, e.x.clone().add(t.x).divide(2)), l(this, F, e.y.clone().add(t.y).divide(2)), this));
    r(this, "dotProduct", (e) => He(this, e));
    r(this, "determinantWith", (e) => ne.determinant(this, e));
    r(this, "normal", () => {
      const e = this.x.clone().opposite(), t = this.y.clone();
      return l(this, D, t), l(this, F, e), this;
    });
    r(this, "isEqual", (e) => gt(this, e));
    r(this, "isColinearTo", (e) => wt(this, e));
    r(this, "isNormalTo", (e) => this.dotProduct(e).isZero());
    r(this, "multiplyByScalar", (e) => {
      const t = new h(e);
      return i(this, D).multiply(t), i(this, F).multiply(t), this;
    });
    r(this, "divideByScalar", (e) => this.multiplyByScalar(new h(e).inverse()));
    r(this, "simplify", () => this.multiplyByScalar(
      C.lcm(i(this, D).denominator, i(this, F).denominator)
    ).divideByScalar(
      C.gcd(i(this, D).numerator, i(this, F).numerator)
    ));
    r(this, "angleWith", (e, t, s) => {
      let n = this.dotProduct(e).value;
      return t && (n = Math.abs(n)), (s ? 1 : 180 / Math.PI) * Math.acos(n / (this.norm * e.norm));
    });
    r(this, "_parseString", (e) => {
      e.startsWith("(") && (e = e.substring(1)), e.endsWith(")") && (e = e.substring(0, e.length - 1));
      const t = e.split(/[,;\s]/g).filter((s) => s.trim() !== "");
      return t.length < 2 ? this : (this.x = new h(t[0]), this.y = new h(t[1]), this);
    });
    e !== void 0 && this.parse(e, t);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get x() {
    return i(this, D);
  }
  set x(e) {
    l(this, D, new h(e));
  }
  get y() {
    return i(this, F);
  }
  set y(e) {
    l(this, F, new h(e));
  }
  get asPoint() {
    return i(this, ge);
  }
  set asPoint(e) {
    l(this, ge, e);
  }
  get normSquare() {
    return i(this, D).clone().pow(2).add(i(this, F).clone().pow(2));
  }
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get tex() {
    return i(this, ge) ? `\\left(${this.array.map((e) => e.tex).join(";")}\\right)` : `\\begin{pmatrix} ${this.array.map((e) => e.tex).join(" \\\\ ")} \\end{pmatrix}`;
  }
  get display() {
    return i(this, ge) ? `(${this.array.map((e) => e.display).join(";")})` : `((${this.array.map((e) => e.display).join(",")}))`;
  }
  get array() {
    return [i(this, D), i(this, F)];
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
  static asTex(e, t) {
    return `\\begin{pmatrix} ${e} \\\\ ${t} \\end{pmatrix}`;
  }
  clone() {
    const e = new ne();
    return e.x = this.x.clone(), e.y = this.y.clone(), e;
  }
  translate(e) {
    return i(this, D).add(e.x), i(this, F).add(e.y), this;
  }
  distanceTo(e) {
    const t = new ne(this, e);
    return {
      value: t.norm,
      fraction: t.normSquare,
      tex: t.tex
    };
  }
};
D = new WeakMap(), F = new WeakMap(), ge = new WeakMap(), r(ne, "scalarProduct", (e, t) => {
  if (e.dimension !== t.dimension)
    throw new Error("Vectors must have the same dimension");
  return e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y));
}), r(ne, "determinant", (e, t) => e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)));
let P = ne;
class De extends P {
  constructor(e, t) {
    super(), e !== void 0 && this.parse(e, t), this.asPoint = !0;
  }
  clone() {
    return new De(this.x, this.y);
  }
  get tex() {
    return `\\left(${this.array.map((e) => e.tex).join(";")}\\right)`;
  }
  get display() {
    return `(${this.array.map((e) => e.display).join(";")})`;
  }
}
function Xe(a = 0.5) {
  return Math.random() < a;
}
function ee(a, e, t) {
  if (e === void 0)
    return a >= 0 ? ee(0, a) : ee(a, 0);
  if (a === e)
    return a;
  if (t === void 0)
    return Math.floor(Math.random() * (e - a + 1) + a);
  if (Math.abs(e - a) <= t.length)
    throw new Error("The number of excluded values is too high.");
  let s = ee(a, e);
  for (; t.includes(s); )
    s = ee(a, e);
  return s;
}
function Z(a, e) {
  return e === !1 ? Xe() ? ee(1, a) : -ee(1, a) : ee(-a, a);
}
function vt(a) {
  let e = C.primes();
  return a !== void 0 && (e = e.filter((t) => t < a)), Fe(e);
}
function xt(a, e) {
  return e === void 0 && (e = 1), a.length <= 0 ? Object.values(a) : We(a).slice(0, e);
}
function Fe(a) {
  return a.length === 0 ? null : a[ee(0, a.length - 1)];
}
function We(a) {
  const e = Object.values(a);
  for (let t = e.length - 1; t > 0; t--) {
    const s = Math.floor(Math.random() * (t + 1)), n = e[t];
    e[t] = e[s], e[s] = n;
  }
  return e;
}
var Qe = /* @__PURE__ */ ((a) => (a.None = "none", a.Parallel = "parallel", a.Perpendicular = "perpendicular", a.Tangent = "tangent", a))(Qe || {}), de, z, $, L, W, _, ae;
const pe = class pe {
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...e) {
    E(this, de);
    // ax + by + c = 0
    E(this, z);
    E(this, $);
    E(this, L);
    E(this, W);
    E(this, _);
    E(this, ae);
    r(this, "randomPoint", (e) => i(this, _).clone().multiplyByScalar(Z(e === void 0 || e <= 1 ? 3 : e, !1)).add(i(this, W)));
    r(this, "randomNearPoint", (e) => {
      const t = this.randomPoint(e);
      let s = 10;
      for (; this.isOnLine(t) && s > 0; )
        t.x.add(Z(1, !1)), t.y.add(Z(1, !1)), s--;
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
    r(this, "parse", (...e) => {
      if (e.length === 0)
        return this;
      if (e.length === 1) {
        if (e[0] instanceof pe)
          return e[0].clone();
        if (e[0] instanceof U)
          return this.parseEquation(e[0]);
        if (typeof e[0] == "string")
          try {
            const t = new U(e[0]);
            return this.parse(t);
          } catch {
            return this;
          }
      }
      if (e.length === 2 && e[0] instanceof P && e[1] instanceof P) {
        if (e[0].asPoint && !e[1].asPoint)
          return this.parseByPointAndVector(e[0], e[1]);
        if (e[0].asPoint && e[1].asPoint)
          return this.parseByPointAndVector(e[0], new P(e[0], e[1]));
        if (!e[0].asPoint && e[1].asPoint)
          return this.parseByPointAndNormal(e[1], e[0]);
      }
      if (e.length === 3) {
        if (e[0] instanceof P && e[1] instanceof P) {
          if (e[2] === "perpendicular")
            return this.parseByPointAndNormal(e[0], e[1]);
          if (e[2] === "parallel")
            return this.parseByPointAndVector(e[0], e[1]);
        }
        return e[0] instanceof P && e[1] instanceof pe ? e[2] === "parallel" || e[2] === null ? this.parseByPointAndLine(
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
    r(this, "parseEquation", (e) => {
      e.reorder(!0);
      const t = new Set(e.letters());
      if (!(t.has("x") || t.has("y")))
        return this;
      for (const s of ["x", "y"])
        t.has(s) && t.delete(s);
      return t.size > 0 ? this : this.parseByCoefficient(e.left.monomByLetter("x").coefficient, e.left.monomByLetter("y").coefficient, e.left.monomByDegree(0).coefficient);
    });
    r(this, "parseByCoefficient", (e, t, s) => (l(this, z, new h(e)), l(this, $, new h(t)), l(this, L, new h(s)), l(this, _, new P(i(this, $).clone(), i(this, z).clone().opposite())), l(this, W, new P(new h().zero(), i(this, L).clone())), l(this, ae, i(this, _).clone().normal()), this));
    r(this, "parseByPointAndVector", (e, t) => (this.parseByCoefficient(
      t.y,
      t.x.clone().opposite(),
      e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)).opposite()
    ), l(this, W, e.clone()), l(this, _, t.clone()), l(this, ae, i(this, _).clone().normal()), this));
    r(this, "parseByPointAndNormal", (e, t) => this.parseByCoefficient(
      t.x,
      t.y,
      e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()
    ));
    r(this, "parseByPointAndLine", (e, t, s) => (s === void 0 && (s = "parallel"), s === "parallel" ? this.parseByPointAndNormal(e, t.normal) : s === "perpendicular" ? this.parseByPointAndNormal(e, t.director) : this));
    r(this, "clone", () => (l(this, z, i(this, z).clone()), l(this, $, i(this, $).clone()), l(this, L, i(this, L).clone()), l(this, _, i(this, _).clone()), l(this, W, i(this, W).clone()), l(this, ae, i(this, ae).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    r(this, "isOnLine", (e) => i(this, z).clone().multiply(e.x).add(
      i(this, $).clone().multiply(e.y)
    ).add(i(this, L)).isZero());
    r(this, "isParallelTo", (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height));
    r(this, "isSameAs", (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height));
    r(this, "isPerpendicularTo", (e) => this.d.isNormalTo(e.d));
    r(this, "isVertical", () => this.slope.isInfinity());
    r(this, "simplify", () => {
      const e = C.lcm(i(this, z).denominator, i(this, $).denominator, i(this, L).denominator), t = C.gcd(i(this, z).numerator, i(this, $).numerator, i(this, L).numerator);
      return this.parseByCoefficient(
        i(this, z).clone().multiply(e).divide(t),
        i(this, $).clone().multiply(e).divide(t),
        i(this, L).clone().multiply(e).divide(t)
      ), this;
    });
    r(this, "simplifyDirection", () => (i(this, _).simplify(), this));
    r(this, "intersection", (e) => {
      const t = new P();
      let s = !1, n = !1;
      return i(this, $).isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new h().invalid(), t.y = new h().invalid(), s = !0) : this.isSameAs(e) ? (t.x = new h().invalid(), t.y = new h().invalid(), n = !0) : (t.x = i(this, $).clone().multiply(e.c).subtract(i(this, L).clone().multiply(e.b)).divide(i(this, z).clone().multiply(e.b).subtract(i(this, $).clone().multiply(e.a))), t.y = i(this, z).clone().multiply(e.c).subtract(i(this, L).clone().multiply(e.a)).divide(i(this, $).clone().multiply(e.a).subtract(i(this, z).clone().multiply(e.b)))), {
        point: t,
        hasIntersection: !(s || n),
        isParallel: s,
        isSame: n
      };
    });
    r(this, "getValueAtX", (e) => {
      const t = this.equation.clone().isolate("y"), s = new h(e);
      return t instanceof U ? t.right.evaluate({ x: s }) : new h().invalid();
    });
    r(this, "getValueAtY", (e) => {
      const t = this.equation.clone().isolate("x"), s = new h(e);
      return t instanceof U ? t.right.evaluate({ y: s }) : new h().invalid();
    });
    return l(this, z, new h().zero()), l(this, $, new h().zero()), l(this, L, new h().zero()), l(this, W, new P()), l(this, _, new P()), l(this, ae, new P()), l(this, de, !0), e.length > 0 && this.parse(...e), this;
  }
  get a() {
    return i(this, z);
  }
  // ------------------------------------------
  // Getter and setter
  set a(e) {
    l(this, z, e);
  }
  get b() {
    return i(this, $);
  }
  set b(e) {
    l(this, $, e);
  }
  get c() {
    return i(this, L);
  }
  set c(e) {
    l(this, L, e);
  }
  get OA() {
    return i(this, W);
  }
  set OA(e) {
    l(this, W, e);
  }
  get d() {
    return i(this, _);
  }
  set d(e) {
    l(this, _, e);
  }
  get n() {
    return i(this, ae);
  }
  // ------------------------------------------
  get equation() {
    const e = new U(new M().parse("xy", i(this, z), i(this, $), i(this, L)), new M("0"));
    return i(this, de) ? e.simplify() : e;
  }
  get system() {
    const e = new U(
      new M("x"),
      new M(i(this, W).x).add(new O("k").multiply(i(this, _).x))
    ), t = new U(
      new M("y"),
      new M(i(this, W).y).add(new O("k").multiply(i(this, _).y))
    );
    return { x: e, y: t };
  }
  get tex() {
    const e = this.equation.clone().reorder(!0);
    i(this, z).isNegative() && e.multiply(-1);
    const t = i(this, _).clone();
    return i(this, de) && t.simplify(), {
      canonical: e.tex,
      equation: e.clone().reorder().tex,
      mxh: this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new M().parse("x", this.slope, this.height).tex,
      parametric: `${P.asTex("x", "y")} = ${P.asTex(i(this, W).x.tex, i(this, W).y.tex)} + k\\cdot ${P.asTex(t.x.tex, t.y.tex)}`,
      system: `\\left\\{\\begin{aligned}
            x &= ${new M(i(this, W).x).add(new O(i(this, _).x).multiply(new O("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new M(i(this, W).y).add(new O(i(this, _).y).multiply(new O("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`
    };
  }
  get reduceBeforeDisplay() {
    return i(this, de);
  }
  set reduceBeforeDisplay(e) {
    l(this, de, e);
  }
  get display() {
    const e = this.equation;
    return i(this, z).isNegative() && e.multiply(-1), {
      canonical: e.display,
      mxh: this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new M().parse("x", this.slope, this.height).display,
      parametric: ""
    };
  }
  get normal() {
    return new P(i(this, z), i(this, $));
  }
  get director() {
    return i(this, _).clone();
  }
  get slope() {
    return i(this, z).clone().opposite().divide(i(this, $));
  }
  get height() {
    return i(this, L).clone().opposite().divide(i(this, $));
  }
  distanceTo(e) {
    const t = e.x.clone().multiply(i(this, z)).add(e.y.clone().multiply(i(this, $))).add(i(this, L)).abs(), s = this.normal.normSquare;
    if (s.isZero())
      return {
        value: NaN,
        tex: "Not a line",
        fraction: new h().infinite()
      };
    const n = t.value / Math.sqrt(s.value), o = t.clone().divide(s.clone().sqrt());
    return s.isSquare() ? {
      value: n,
      tex: o.tex,
      fraction: o
    } : {
      value: n,
      tex: `\\frac{${t.tex}}{\\sqrt{${s.tex}}}`,
      fraction: o
    };
  }
  hitSegment(e, t) {
    const s = this.intersection(
      new pe(e, t)
    );
    return s.hasIntersection ? s.point.x.value >= Math.min(e.x.value, t.x.value) && s.point.x.value <= Math.max(e.x.value, t.x.value) && s.point.y.value >= Math.min(e.y.value, t.y.value) && s.point.y.value <= Math.max(e.y.value, t.y.value) : !1;
  }
  // ------------------------------------------
  // Special functions
  // ------------------------------------------
  canonicalAsFloatCoefficient(e) {
    e === void 0 && (e = 2);
    let t = "";
    return i(this, z).isZero() || (i(this, z).isOne() ? t = "x" : i(this, z).clone().opposite().isOne() ? t = "-x" : t = i(this, z).value.toFixed(e) + "x"), i(this, $).isZero() || (i(this, $).isPositive() && (t += "+"), t += i(this, $).value.toFixed(e) + "y"), i(this, L).isZero() || (i(this, L).isPositive() && (t += "+"), t += i(this, L).value.toFixed(e)), t + "=0";
  }
};
de = new WeakMap(), z = new WeakMap(), $ = new WeakMap(), L = new WeakMap(), W = new WeakMap(), _ = new WeakMap(), ae = new WeakMap(), // A line is defined as the canonical form
r(pe, "PERPENDICULAR", "perpendicular"), r(pe, "PARALLEL", "parallel");
let we = pe;
var Y, B, re;
const Ze = class Ze {
  constructor(...e) {
    E(this, Y);
    E(this, B);
    E(this, re);
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    r(this, "relativePosition", (e) => {
      if (i(this, Y) === void 0 || i(this, B) === void 0)
        throw new Error("Circle not defined");
      const t = e.distanceTo(i(this, Y)), s = Math.sqrt(i(this, B).value);
      return t.value - s > 1e-10 ? 0 : Math.abs(t.value - s) < 1e-10 ? 1 : 2;
    });
    r(this, "lineIntersection", (e) => {
      const t = [];
      if (i(this, re) === void 0)
        return [];
      const s = i(this, re).clone(), n = e.equation.clone().isolate("x"), o = e.equation.clone().isolate("y");
      return n instanceof U && o instanceof U && (s.replaceBy("y", o.right).simplify(), s.solve()), t;
    });
    r(this, "tangents", (e) => e instanceof h ? this._tangentsWithSlope(e) : this.isPointOnCircle(e) ? this._tangentsThroughOnePointOnTheCircle(e) : i(this, Y) !== void 0 && i(this, Y).distanceTo(e).value > this.radius.value ? (this._tangentsThroughOnePointOutsideTheCircle(e), []) : (console.log("No tangents as the point is inside !"), []));
    r(this, "isPointOnCircle", (e) => {
      var t;
      return ((t = i(this, re)) == null ? void 0 : t.test({ x: e.x, y: e.y })) ?? !1;
    });
    r(this, "getPointsOnCircle", (e) => {
      const t = C.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), s = [];
      return t.forEach((n) => {
        for (const o of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
          new P(
            this.center.x.clone().add(o[0] * n[0]),
            this.center.y.clone().add(o[1] * n[1])
          );
      }), s;
    });
    r(this, "_tangentsThroughOnePointOnTheCircle", (e) => {
      const t = new P(this.center, e);
      return [new we(e, t, Qe.Perpendicular)];
    });
    r(this, "_tangentsThroughOnePointOutsideTheCircle", (e) => {
      const t = this.center.x.clone().subtract(e.x), s = this.center.y.clone().subtract(e.y), n = new M("x"), o = new M("x^2+1");
      n.multiply(t).subtract(s).pow(2), o.multiply(this.squareRadius), new U(n, o).moveLeft().simplify().solve();
    });
    r(this, "_tangentsWithSlope", (e) => {
      const t = e.numerator, s = -e.denominator, n = this.center.x.clone(), o = this.center.y.clone(), c = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), f = n.clone().multiply(t).opposite().subtract(o.clone().multiply(s)).add(c.clone().sqrt()), w = n.clone().multiply(t).opposite().subtract(o.clone().multiply(s)).subtract(c.clone().sqrt());
      return [new we(t, s, f), new we(t, s, w)];
    });
    e.length > 0 && this.parse(...e);
  }
  get center() {
    return i(this, Y) ?? new P();
  }
  get squareRadius() {
    return i(this, B) ?? new h(0);
  }
  get cartesian() {
    if (i(this, re) === void 0)
      throw new Error("Cartesian equation not defined");
    return i(this, re);
  }
  get radius() {
    return i(this, B) === void 0 ? { tex: "", display: "", value: 0 } : i(this, B).isSquare() ? {
      tex: i(this, B).clone().sqrt().tex,
      display: i(this, B).clone().sqrt().display,
      value: i(this, B).clone().sqrt().value
    } : {
      tex: `\\sqrt{${i(this, B).tex}}`,
      display: `sqrt(${i(this, B).display})`,
      value: i(this, B).clone().sqrt().value
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
    return l(this, Y, this.center.clone()), l(this, B, this.squareRadius.clone()), this._calculateCartesian(), this;
  }
  _reset() {
    return l(this, Y, void 0), l(this, B, void 0), l(this, re, void 0), this;
  }
  parse(...e) {
    return this._reset(), typeof e[0] == "string" ? this._parseEquation(new U(e[0])) : e[0] instanceof U ? this._parseEquation(e[0]) : e[0] instanceof Ze ? this._parseCopyCircle(e[0]) : e[0] instanceof P && e.length > 1 && (e[1] instanceof P ? e[2] instanceof P || this._parseCenterAndPointThrough(e[0], e[1]) : (e[1] instanceof h || typeof e[1] == "number") && this._parseCenterAndRadius(e[0], e[1], typeof e[2] == "boolean" ? e[2] : !1)), this._calculateCartesian(), this;
  }
  _calculateCartesian() {
    l(this, re, new U(new M(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`), new M(this.squareRadius.display)).moveLeft());
  }
  _parseCopyCircle(e) {
    return l(this, Y, e.center.clone()), l(this, B, e.squareRadius.clone()), this._calculateCartesian(), this;
  }
  _parseCenterAndRadius(e, t, s) {
    return l(this, Y, e.clone()), s ? l(this, B, new h(t)) : l(this, B, new h(t).pow(2)), this;
  }
  _parseCenterAndPointThrough(e, t) {
    return l(this, Y, e.clone()), l(this, B, new P(i(this, Y), t).normSquare), this;
  }
  _parseEquation(e) {
    if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
      const t = e.left.monomByDegree(2, "x"), s = e.left.monomByDegree(2, "y");
      let n, o, c;
      t.coefficient.isEqual(s.coefficient) ? (e.divide(t.coefficient), n = e.left.monomByDegree(1, "x"), o = e.left.monomByDegree(1, "y"), c = e.left.monomByDegree(0), l(this, Y, new P(n.coefficient.clone().divide(2).opposite(), o.coefficient.clone().divide(2).opposite())), l(this, B, c.coefficient.clone().opposite().add(i(this, Y).x.clone().pow(2)).add(i(this, Y).y.clone().pow(2))), this._calculateCartesian()) : (l(this, Y, void 0), l(this, B, void 0));
    }
    return this;
  }
  // private _parseThroughtThreePoints(A: Vector, B: Vector, C: Vector): this {
  //     const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(),
  //         mAC = T.remarquables.mediators.AC.clone()
  //     this.parse(mAB.intersection(mAC).point, A)
  //     return this
  // }
};
Y = new WeakMap(), B = new WeakMap(), re = new WeakMap();
let $e = Ze;
var le, he, ce, Ie;
const Ce = class Ce {
  constructor(e, t, s) {
    E(this, le, new h().zero());
    // 1st component
    E(this, he, new h().zero());
    // 2nd component
    E(this, ce, new h().zero());
    // 3rd component
    E(this, Ie, !1);
    r(this, "dimension", 3);
    r(this, "isEqual", (e) => this.x.isEqual(e.x) && this.y.isEqual(e.y) && this.z.isEqual(e.z));
    return e instanceof be && t instanceof be ? (this.x = t.x.clone().subtract(e.x), this.y = t.y.clone().subtract(e.y), this.z = t.z.clone().subtract(e.z)) : (e && (this.x = new h(e)), t && (this.y = new h(t)), s && (this.z = new h(s))), this;
  }
  get x() {
    return i(this, le);
  }
  set x(e) {
    l(this, le, new h(e));
  }
  get y() {
    return i(this, he);
  }
  set y(e) {
    l(this, he, new h(e));
  }
  get z() {
    return i(this, ce);
  }
  set z(e) {
    l(this, ce, new h(e));
  }
  get asPoint() {
    return i(this, Ie);
  }
  set asPoint(e) {
    l(this, Ie, e);
  }
  get array() {
    return [i(this, le), i(this, he), i(this, ce)];
  }
  get tex() {
    return `\\begin{pmatrix} ${i(this, le).tex} \\\\ ${i(this, he).tex} \\\\ ${i(this, ce).tex} \\end{pmatrix}`;
  }
  get display() {
    return `((${i(this, le).display},${i(this, he).display},${i(this, ce).display}))`;
  }
  clone() {
    return new Ce(i(this, le), i(this, he), i(this, ce));
  }
  static asTex(e, t, s) {
    return `\\begin{pmatrix} ${e} \\\\ ${t} \\\\ ${s} \\end{pmatrix}`;
  }
  add(e) {
    return this.x.add(e.x), this.y.add(e.y), this.z.add(e.z), this;
  }
  opposite() {
    return this.x.opposite(), this.y.opposite(), this.z.opposite(), this;
  }
  subtract(e) {
    return this.add(e.opposite());
  }
  multiply(e) {
    return this.x.multiply(e), this.y.multiply(e), this.z.multiply(e), this;
  }
  dot(e) {
    return He(this, e);
  }
  cross(e) {
    return new Ce(
      this.y.clone().multiply(e.z).subtract(this.z.clone().multiply(e.y)),
      this.z.clone().multiply(e.x).subtract(this.x.clone().multiply(e.z)),
      this.x.clone().multiply(e.y).subtract(this.y.clone().multiply(e.x))
    );
  }
  reduce() {
    this.x.reduce(), this.y.reduce(), this.z.reduce();
    const e = C.gcd(this.x.numerator, this.y.numerator, this.z.numerator);
    e > 1 && (this.x.divide(e), this.y.divide(e), this.z.divide(e));
    const t = C.lcm(this.x.denominator, this.y.denominator, this.z.denominator);
    return t > 1 && (this.x.multiply(t), this.y.multiply(t), this.z.multiply(t)), this.x.isNegative() && (this.x.opposite(), this.y.opposite(), this.z.opposite()), this;
  }
};
le = new WeakMap(), he = new WeakMap(), ce = new WeakMap(), Ie = new WeakMap();
let oe = Ce;
class be extends oe {
  constructor(e, t, s) {
    super(e, t, s), this.asPoint = !0;
  }
  clone() {
    return new be(this.x, this.y, this.z);
  }
  get tex() {
    return `\\left( ${this.x.tex} ; ${this.y.tex} ; ${this.z.tex} \\right)`;
  }
  get display() {
    return `(${this.x.display};${this.y.display};${this.z.display})`;
  }
}
function ke(a) {
  const e = Object.assign(
    {
      negative: !0,
      max: 10,
      reduced: !0,
      zero: !0,
      natural: !1
    },
    a
  ), t = new h();
  if (e.negative ? t.numerator = Z(e.max, e.zero) : t.numerator = ee(e.zero ? 0 : 1, e.max), e.natural)
    t.denominator = 1;
  else {
    let s = 0;
    for (; t.isRelative() && s < 10; )
      t.denominator = ee(1, e.max), s++;
  }
  return e.reduced ? t.reduce() : t;
}
function Ke(a) {
  const e = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    a
  ), t = new O();
  if (t.coefficient = ke({
    zero: e.zero,
    reduced: !0,
    natural: !e.fraction
  }), e.letters.length > 1) {
    for (const s of e.letters.split(""))
      t.setLetter(s, 0);
    for (let s = 0; s < e.degree; s++) {
      const n = Fe(e.letters.split(""));
      t.setLetter(n, t.degree(n).clone().add(1));
    }
  } else
    t.setLetter(e.letters, e.degree);
  return t;
}
const bt = {
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
function Je(a) {
  const e = Object.assign(
    bt,
    a
  ), t = new M().empty();
  let s;
  for (let n = e.degree; n >= 0; n--)
    s = Ke({
      letters: e.letters,
      degree: n,
      fraction: e.fraction,
      zero: n === e.degree ? !1 : e.allowNullMonom
    }), e.unit && e.degree === n && s.coefficient.one(), t.add(s);
  if (e.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposite(), e.numberOfMonoms && e.numberOfMonoms > 0 && e.numberOfMonoms < t.length)
    for (; t.length > e.numberOfMonoms; ) {
      const n = ee(1, t.length - 1);
      t.monoms.splice(n, 1);
    }
  return t;
}
function Nt(a) {
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
  ), t = new M().one();
  for (let s = 0; s < e.degree; s++) {
    const n = Je({
      degree: 1,
      unit: e.unit,
      fraction: e.fraction,
      letters: e.letters,
      zero: e.zero
    });
    t.multiply(n);
  }
  return new U(t, 0);
}
function et(a) {
  const e = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    a
  ), t = e.axis === "x", s = e.axis === "y", n = e.fraction ? ke({ max: e.max, zero: t }) : new h(Z(e.max, t)), o = e.fraction ? ke({ max: e.max, zero: s }) : new h(Z(e.max, s));
  return Number(e.quadrant) === 1 && (n.abs(), o.abs()), Number(e.quadrant) === 2 && (n.isPositive() && n.opposite(), o.isNegative() && o.opposite()), Number(e.quadrant) === 3 && (n.isPositive() && n.opposite(), o.isPositive() && o.opposite()), Number(e.quadrant) === 4 && (n.isNegative() && n.opposite(), o.isPositive() && o.opposite()), new De(n, o);
}
function Et(a) {
  const e = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    a
  ), t = et(e.center);
  let s, n;
  return e.pointsOnCircle === 8 ? (s = ee(1, 3), n = s ** 2 + (s + 1) ** 2) : n = ee(1, 20), new $e(t, n, !0);
}
function Ot(a) {
  const e = Object.assign(
    {
      A: {
        x: Z(10),
        y: Z(10)
      }
    },
    a
  ), t = new P(
    Z(10),
    Z(10)
  );
  for (; t.isNull; )
    t.x = Z(10), t.y = Z(10);
  return e.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposite() : e.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposite(), new we(new P(e.A.x, e.A.y), t);
}
var Q, H;
const Te = class Te {
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(e, t) {
    // ax + by + c = 0
    E(this, Q, new oe());
    E(this, H, new oe());
    r(this, "clone", () => (l(this, H, i(this, H).clone()), l(this, Q, i(this, Q).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    r(this, "isOnLine", (e) => !1);
    r(this, "isParallelTo", (e) => {
      throw new Error("Method not implemented.");
    });
    r(this, "isSameAs", (e) => {
      throw new Error("Method not implemented.");
    });
    r(this, "isPerpendicularTo", (e) => {
      throw new Error("Method not implemented.");
    });
    r(this, "isVertical", () => {
      throw new Error("Method not implemented.");
    });
    r(this, "simplify", () => {
      throw new Error("Method not implemented.");
    });
    r(this, "intersection", (e) => {
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
    r(this, "randomPoint", (e = 5) => {
      const t = i(this, Q).clone(), s = new h(Z(e, !1));
      return new be(
        t.x.clone().add(i(this, H).x.clone().multiply(s)),
        t.y.clone().add(i(this, H).y.clone().multiply(s)),
        t.z.clone().add(i(this, H).z.clone().multiply(s))
      );
    });
    return l(this, Q, e.clone()), l(this, H, t.clone()), this;
  }
  get OA() {
    return i(this, Q);
  }
  set OA(e) {
    l(this, Q, e);
  }
  get point() {
    return i(this, Q).clone();
  }
  get d() {
    return i(this, H);
  }
  set d(e) {
    l(this, H, e);
  }
  get tex() {
    return {
      parametric: `${oe.asTex("x", "y", "z")} = ${oe.asTex(i(this, Q).x.tex, i(this, Q).y.tex, i(this, Q).z.tex)} + k\\cdot ${oe.asTex(i(this, H).x.tex, i(this, H).y.tex, i(this, H).z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new M(i(this, Q).x).add(new O(i(this, H).x).multiply(new O("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new M(i(this, Q).y).add(new O(i(this, H).y).multiply(new O("k"))).reorder("k", !0).tex}\\\\
    z &= ${new M(i(this, Q).z).add(new O(i(this, H).z).multiply(new O("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`
    };
  }
  get direction() {
    return i(this, H).clone();
  }
  distanceTo(e) {
    throw new Error("Method not implemented.");
  }
  hitSegment(e, t) {
    const s = this.intersection(
      new Te(e, t)
    );
    return s.hasIntersection ? s.point.x.value >= Math.min(e.x.value, t.x.value) && s.point.x.value <= Math.max(e.x.value, t.x.value) && s.point.y.value >= Math.min(e.y.value, t.y.value) && s.point.y.value <= Math.max(e.y.value, t.y.value) && s.point.z.value >= Math.min(e.z.value, t.z.value) && s.point.z.value <= Math.max(e.z.value, t.z.value) : !1;
  }
};
Q = new WeakMap(), H = new WeakMap(), // A line is defined as the canonical form
r(Te, "PERPENDICULAR", "perpendicular"), r(Te, "PARALLEL", "parallel");
let Le = Te;
function Tt(a) {
  const e = Object.assign(
    {
      A: {
        x: Z(10),
        y: Z(10),
        z: Z(10)
      },
      direction: {
        x: Z(10),
        y: Z(10),
        z: Z(10)
      }
    },
    a
  ), t = new be(e.A.x, e.A.y, e.A.z), s = new oe(e.direction.x, e.direction.y, e.direction.z);
  return new Le(t, s);
}
const Mt = {
  equation: (a) => Nt(a),
  polynom: (a) => Je(a),
  monom: (a) => Ke(a),
  fraction: (a) => ke(a),
  number: (a, e, t) => ee(a, e, t),
  numberSym: (a, e) => Z(a, e),
  prime: (a) => vt(a),
  bool: (a) => Xe(a),
  array: (a, e) => xt(a, e),
  item: (a) => Fe(a),
  shuffle: (a) => We(a),
  line: (a) => Ot(a),
  line3: (a) => Tt(a),
  point: (a) => et(a),
  circle: (a) => Et(a)
}, At = {
  Vector: P,
  Line: we,
  // Triangle: Triangle,
  Circle: $e
}, qt = {
  Vector3D: oe
}, Pt = {
  Numeric: C,
  Fraction: h,
  Root: Pe,
  Monom: O,
  Polynom: M,
  Equation: U,
  // LinearSystem,
  Rational: Se,
  // LogicalSet,
  Random: Mt,
  Geometry: At,
  Geometry3D: qt
};
export {
  Pt as default
};
