var Nt = Object.defineProperty;
var at = (a) => {
  throw TypeError(a);
};
var At = (a, e, t) => e in a ? Nt(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var o = (a, e, t) => At(a, typeof e != "symbol" ? e + "" : e, t), Je = (a, e, t) => e.has(a) || at("Cannot " + t);
var i = (a, e, t) => (Je(a, e, "read from private field"), t ? t.call(a) : e.get(a)), x = (a, e, t) => e.has(a) ? at("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), h = (a, e, t, s) => (Je(a, e, "write to private field"), s ? s.call(a, t) : e.set(a, t), t), ue = (a, e, t) => (Je(a, e, "access private method"), t);
function Tt(a) {
  const e = ht(a), t = [];
  let s, n;
  for (; e.length > 0; )
    s = e.shift() ?? 1, n = (e.length > 0 ? e.pop() : +s) ?? 1, t.push([s, n]);
  return t;
}
function Ot(...a) {
  const e = nt(...a);
  return a.map((t) => t / e);
}
function ht(a) {
  const e = Math.abs(a), t = Math.sqrt(e), s = [];
  for (let n = 1; n <= t; n++)
    a % n === 0 && (s.push(n), s.push(e / n));
  return s.sort(function(n, r) {
    return n - r;
  }), [...new Set(s)];
}
function nt(...a) {
  const e = function(n, r) {
    return r === 0 ? n : e(r, n % r);
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
function qt(...a) {
  return a.reduce(function(e, t) {
    return Math.abs(e * t / nt(e, t));
  });
}
function Mt(a, e = 3) {
  return +a.toFixed(e);
}
function Ct(a) {
  if (Number.isSafeInteger(a) || a.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function It(a) {
  const e = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return a === void 0 ? e : e.slice(0, Math.min(e.length, a));
}
function Bt(a, e) {
  const t = [], s = e === !0 ? +a : a ** 2;
  for (let n = 0; n <= a; n++)
    for (let r = 0; r <= a; r++)
      n ** 2 + r ** 2 === s && t.push([n, r, a]);
  return t;
}
function St(a, e = 2) {
  return +`${Math.round(+`${a}e${e}`)}e-${e}`;
}
const F = {
  decompose: Tt,
  dividers: ht,
  divideNumbersByGCD: Ot,
  gcd: nt,
  lcm: qt,
  numberCorrection: Mt,
  periodic: Ct,
  primes: It,
  pythagoreanTripletsWithTarget: Bt,
  round: St
};
var g, m, Te;
const C = class C {
  constructor(e, t) {
    // #region Class fields (2)
    x(this, g);
    x(this, m);
    x(this, Te);
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
        return h(this, m, 0), h(this, g, 1), this;
      switch (typeof e) {
        case "string":
          if (s = e.split("/"), s.length > 2)
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (s.map((n) => n === "" || isNaN(Number(n))).includes(!0))
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (s.length === 1)
            return this.parse(+s[0]);
          s.length === 2 ? s[1] === "0" ? (h(this, m, NaN), h(this, g, 1)) : (h(this, m, +s[0]), h(this, g, +s[1])) : (h(this, m, NaN), h(this, g, 1));
          break;
        case "number":
          if (Number.isSafeInteger(e))
            h(this, m, +e), t === void 0 || !Number.isSafeInteger(t) ? h(this, g, 1) : h(this, g, +t);
          else {
            const [, n] = e.toString().split("."), r = n ? n.length : 0;
            t === void 0 ? (h(this, m, e * Math.pow(10, r)), h(this, g, Math.pow(10, r))) : Number.isSafeInteger(t) && (h(this, m, e * Math.pow(10, r) - Math.floor(e * Math.pow(10, r - t))), this.denominator = Math.pow(10, r) - Math.pow(10, r - t)), this.reduce();
          }
          break;
        case "object":
          e instanceof C && (h(this, m, +e.numerator), h(this, g, +e.denominator));
          break;
      }
      return this;
    });
    o(this, "clone", () => {
      const e = new C();
      return e.numerator = +i(this, m), e.denominator = +i(this, g), e;
    });
    o(this, "abs", () => (h(this, m, Math.abs(i(this, m))), h(this, g, Math.abs(i(this, g))), this));
    o(this, "add", (e) => {
      if (e instanceof C) {
        const t = i(this, m), s = i(this, g);
        h(this, m, t * e.denominator + e.numerator * s), h(this, g, s * e.denominator);
      } else
        return this.add(new C(e));
      return this.reduce();
    });
    o(this, "amplify", (e) => (Number.isSafeInteger(e) && (h(this, m, i(this, m) * e), h(this, g, i(this, g) * e)), this));
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
      switch (e instanceof C ? s = e.clone() : s = new C(e), t) {
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
      const t = new C(e);
      if (t.numerator === 0)
        return new C().infinite();
      const s = +i(this, m), n = +i(this, g);
      return h(this, m, s * t.denominator), h(this, g, n * t.numerator), this.reduce();
    });
    o(this, "infinite", () => (h(this, m, 1 / 0), h(this, g, 1), this));
    o(this, "invalid", () => (h(this, m, NaN), h(this, g, 1), this));
    o(this, "inverse", () => {
      const e = +i(this, m), t = +i(this, g);
      return h(this, m, t), h(this, g, e), this;
    });
    o(this, "isApproximative", () => i(this, Te) || i(this, m).toString().length >= 15 && i(this, g).toString().length >= 15);
    o(this, "isEqual", (e) => this.compare(e, "="));
    o(this, "isEven", () => this.isRelative() && this.value % 2 === 0);
    o(this, "isExact", () => !this.isApproximative());
    o(this, "isFinite", () => !this.isInfinity() && !this.isNaN());
    o(this, "isGeq", (e) => this.compare(e, ">="));
    o(this, "isGreater", (e) => this.compare(e, ">"));
    o(this, "isInfinity", () => Math.abs(i(this, m)) === 1 / 0);
    o(this, "isInverted", (e) => this.isEqual(new C().one().divide(e.clone())));
    o(this, "isLeq", (e) => this.compare(e, "<="));
    /* Compare shortcuts */
    o(this, "isLesser", (e) => this.compare(e, "<"));
    o(this, "isNaN", () => isNaN(i(this, m)));
    o(this, "isNatural", () => this.isRelative() && this.isPositive());
    o(this, "isNegative", () => this.sign() === -1);
    o(this, "isNegativeOne", () => i(this, m) === -1 && i(this, g) === 1);
    o(this, "isNotEqual", (e) => this.compare(e, "<>"));
    o(this, "isNotZero", () => i(this, m) !== 0);
    o(this, "isOdd", () => this.isRelative() && this.value % 2 === 1);
    o(this, "isOne", () => i(this, m) === 1 && i(this, g) === 1);
    o(this, "isOpposite", (e) => this.isEqual(e.clone().opposite()));
    o(this, "isPositive", () => this.sign() === 1);
    o(this, "isRational", () => !this.isRelative());
    o(this, "isReduced", () => Math.abs(F.gcd(i(this, m), i(this, g))) === 1);
    o(this, "isRelative", () => this.clone().reduce().denominator === 1);
    o(this, "isSquare", () => Math.sqrt(i(this, m)) % 1 === 0 && Math.sqrt(i(this, g)) % 1 === 0);
    o(this, "isStrictlyNegative", () => this.value < 0);
    o(this, "isStrictlyPositive", () => this.value > 0);
    // ------------------------------------------
    // Mathematical operations specific to fractions
    o(this, "isZero", () => i(this, m) === 0);
    o(this, "multiply", (e) => {
      const t = new C(e);
      return h(this, m, i(this, m) * t.numerator), h(this, g, i(this, g) * t.denominator), this.reduce();
    });
    o(this, "one", () => (h(this, m, 1), h(this, g, 1), this));
    o(this, "opposite", () => (h(this, m, -i(this, m)), this));
    o(this, "pow", (e) => {
      if (e instanceof C)
        return this.pow(e.value);
      this.reduce(), e < 0 && this.inverse();
      const t = Math.floor(Math.pow(i(this, m), Math.abs(e))), s = Math.floor(Math.pow(i(this, g), Math.abs(e)));
      return t ** Math.abs(e) === i(this, m) && s ** Math.abs(e) === i(this, g) ? (h(this, m, i(this, m) ** Math.abs(e)), h(this, g, i(this, g) ** Math.abs(e))) : (h(this, m, i(this, m) ** Math.abs(e)), h(this, g, i(this, g) ** Math.abs(e))), this;
    });
    // ------------------------------------------
    o(this, "reduce", () => {
      const e = F.gcd(i(this, m), i(this, g));
      return h(this, m, i(this, m) / e), h(this, g, i(this, g) / e), i(this, g) < 0 && (h(this, g, -i(this, g)), h(this, m, -i(this, m))), this;
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
      const s = Math.floor(Math.pow(i(this, m), Math.abs(1 / e))), n = Math.floor(Math.pow(i(this, g), Math.abs(1 / e)));
      return h(this, m, Math.pow(i(this, m), Math.abs(1 / e))), h(this, g, Math.pow(i(this, g), Math.abs(1 / e))), (s !== i(this, m) || n !== i(this, g)) && (h(this, m, i(this, m) / i(this, g)), h(this, g, 1), h(this, Te, !0)), this.multiply(t), this;
    });
    o(this, "sign", () => i(this, m) * i(this, g) >= 0 ? 1 : -1);
    o(this, "sqrt", () => this.root(2));
    o(this, "subtract", (e) => e instanceof C ? this.add(e.clone().opposite()) : this.add(-e));
    o(this, "zero", () => (h(this, m, 0), h(this, g, 1), this));
    return h(this, m, 1), h(this, g, 1), h(this, Te, !1), e !== void 0 && this.parse(e, t), this;
  }
  // #endregion Properties and methods (55)
  // #region Getters And Setters (11)
  get denominator() {
    return i(this, g);
  }
  set denominator(e) {
    h(this, g, e);
  }
  // ------------------------------------------
  // Creation / parsing functions
  get dfrac() {
    return this.tex.replace("\\frac", "\\dfrac");
  }
  get display() {
    return this.isExact() ? i(this, g) === 1 ? `${i(this, m)}` : `${i(this, m)}/${i(this, g)}` : this.value.toFixed(3);
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
    return this.isInfinity() ? `${this.sign() === 1 ? "+" : "-"}\\infty` : this.isExact() ? i(this, g) === 1 ? `${i(this, m)}` : i(this, m) < 0 ? `-\\frac{ ${-i(this, m)} }{ ${i(this, g)} }` : `\\frac{ ${i(this, m)} }{ ${i(this, g)} }` : this.value.toFixed(3);
  }
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get tfrac() {
    return this.tex.replace("\\frac", "\\tfrac");
  }
  get value() {
    return i(this, m) / i(this, g);
  }
  // #endregion Getters And Setters (11)
};
g = new WeakMap(), m = new WeakMap(), Te = new WeakMap(), o(C, "average", (...e) => {
  const t = new C().zero();
  for (const s of e)
    t.add(s);
  return t.divide(e.length), t;
}), o(C, "max", (...e) => {
  let t = new C(e[0]);
  for (const s of e) {
    const n = new C(s);
    n.isGreater(t) && (t = n.clone());
  }
  return t;
}), o(C, "min", (...e) => {
  let t = new C(e[0]);
  for (const s of e) {
    const n = new C(s);
    n.isLesser(t) && (t = n.clone());
  }
  return t;
}), o(C, "sort", (e, t) => {
  const n = e.map((r) => r instanceof C ? r : new C(r)).sort((r, l) => r.value - l.value);
  return t && n.reverse(), n;
}), o(C, "unique", (e) => {
  const t = {}, s = [];
  return e.forEach((n) => {
    n instanceof C || (n = new C(n)), t[n.clone().reduce().tex] || (s.push(n.clone()), t[n.tex] = !0);
  }), s;
}), o(C, "xMultiply", (...e) => {
  const t = new C();
  for (const s of e) {
    const n = new C(s);
    t.numerator = t.numerator * n.numerator, t.denominator = t.denominator * n.denominator;
  }
  return t;
});
let c = C;
var lt = (a) => {
  throw TypeError(a);
}, ct = (a, e, t) => e.has(a) || lt("Cannot " + t), H = (a, e, t) => (ct(a, e, "read from private field"), t ? t.call(a) : e.get(a)), Ie = (a, e, t) => e.has(a) ? lt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), ce = (a, e, t, s) => (ct(a, e, "write to private field"), e.set(a, t), t);
const ut = {
  pi: Math.PI,
  e: Math.exp(1)
};
var f = /* @__PURE__ */ ((a) => (a.VARIABLE = "variable", a.COEFFICIENT = "coefficient", a.OPERATION = "operation", a.CONSTANT = "constant", a.FUNCTION = "function", a.FUNCTION_ARGUMENT = "function-argument", a.MONOM = "monom", a.LEFT_PARENTHESIS = "(", a.RIGHT_PARENTHESIS = ")", a))(f || {}), Be = /* @__PURE__ */ ((a) => (a.EXPRESSION = "expression", a.POLYNOM = "polynom", a.SET = "set", a.NUMERIC = "numeric", a))(Be || {});
function $t(a, e) {
  if (a.length <= 1)
    return a;
  const t = Object.keys(e).filter((A) => e[A].type === f.FUNCTION).map((A) => A);
  t.sort((A, P) => P.length - A.length);
  const s = new RegExp(`^(${t.join("|")})\\(`), n = Object.keys(ut);
  n.sort((A, P) => P.length - A.length);
  const r = new RegExp(`^(${n.join("|")})`), l = /^(\d+(\.\d+)?)/;
  let u = "", v, d, y;
  for (; a.length > 0; ) {
    if (v = d, y = void 0, t.length > 0 && s.exec(a)) {
      const A = t.find((P) => a.startsWith(P));
      A && (y = A + "(", a = a.slice(A.length + 1), d = f.FUNCTION);
    } else if (n.length > 0 && r.exec(a)) {
      const A = n.find((P) => a.startsWith(P));
      A && (y = A, a = a.slice(A.length), d = f.CONSTANT);
    } else if (l.exec(a)) {
      const A = l.exec(a);
      A && (y = A[0], a = a.slice(A[0].length), d = f.COEFFICIENT);
    } else
      switch (y = a[0], a = a.slice(1), y) {
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
    if (y === void 0 || d === void 0)
      throw new Error("The token is undefined");
    u += Pt(v, d), u += y;
  }
  return u;
}
function Pt(a, e) {
  return a === void 0 || a === f.OPERATION || e === f.OPERATION || a === f.LEFT_PARENTHESIS || a === f.FUNCTION || a === f.FUNCTION_ARGUMENT || e === f.RIGHT_PARENTHESIS || e === f.FUNCTION_ARGUMENT ? "" : "*";
}
const kt = {
  "^": { precedence: 4, associative: "right", type: f.OPERATION },
  "*": { precedence: 3, associative: "left", type: f.OPERATION },
  "/": { precedence: 3, associative: "left", type: f.OPERATION },
  "+": { precedence: 2, associative: "left", type: f.OPERATION },
  "-": { precedence: 2, associative: "left", type: f.OPERATION }
}, Rt = {
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
}, zt = {
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
}, Lt = {
  "&": { precedence: 3, associative: "left", type: f.OPERATION },
  "|": { precedence: 3, associative: "left", type: f.OPERATION },
  "!": { precedence: 4, associative: "right", type: f.OPERATION },
  "-": { precedence: 2, associative: "left", type: f.OPERATION }
};
var Ae, Se, K, Le, be;
class ft {
  constructor(e) {
    Ie(this, Ae), Ie(this, Se, []), Ie(this, K, {}), Ie(this, Le, []), Ie(this, be), ce(this, Ae, typeof e > "u" ? Be.POLYNOM : e), this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return H(this, Se);
  }
  get rpnToken() {
    return H(this, Se).map((e) => e.token);
  }
  tokenConfigInitialization() {
    return H(this, Ae) === Be.SET ? (ce(this, K, Lt), ce(this, be, !1)) : H(this, Ae) === Be.NUMERIC ? (ce(this, K, zt), ce(this, be, !0)) : H(this, Ae) === Be.EXPRESSION ? (ce(this, K, Rt), ce(this, be, !0)) : (ce(this, K, kt), ce(this, be, !0)), ce(this, Le, Object.keys(H(this, K)).sort((e, t) => t.length - e.length)), H(this, K);
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(e, t) {
    let s, n;
    if (s = "", n = void 0, e[t] === "(")
      s = "(", n = f.LEFT_PARENTHESIS;
    else if (e[t] === ")")
      s = ")", n = f.RIGHT_PARENTHESIS;
    else if (e[t] === ",")
      s = ",", n = f.FUNCTION_ARGUMENT;
    else {
      for (const r of H(this, Le))
        if (e.substring(t, t + r.length) === r) {
          s += r, n = H(this, K)[r].type;
          break;
        }
      for (const r in ut)
        if (e.substring(t, t + r.length) === r) {
          s += r, n = f.CONSTANT;
          break;
        }
      if (s === "")
        if (/[0-9.]/.exec(e[t])) {
          const r = /^([0-9.]+)/.exec(e.substring(t));
          s = r ? r[0] : "", n = f.COEFFICIENT;
        } else if (/[a-zA-Z]/.exec(e[t])) {
          const r = /^([a-zA-Z])/.exec(e.substring(t));
          s = r ? r[0] : "", n = f.VARIABLE;
        } else
          console.log("Unidentified token", e[t], e, t), s = e[t], n = f.MONOM;
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
    let r = "", l = 0, u;
    (t ?? H(this, be)) && (e = $t(e, H(this, K)));
    const v = 50;
    let d = 50, y;
    for (; l < e.length; ) {
      if (d--, d === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([r, l, u] = this.NextToken(e, l), u) {
        case f.MONOM:
        case f.COEFFICIENT:
        case f.VARIABLE:
        case f.CONSTANT:
          s.push({
            token: r,
            tokenType: u
          });
          break;
        case f.OPERATION:
          if (n.length > 0) {
            let A = n[n.length - 1];
            for (y = +v; A.token in H(this, K) && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (H(this, K)[r].associative === "left" && H(this, K)[r].precedence <= H(this, K)[A.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            H(this, K)[r].associative === "right" && H(this, K)[r].precedence < H(this, K)[A.token].precedence); ) {
              if (y--, y === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (s.push(n.pop() ?? { token: "", tokenType: f.OPERATION }), n.length === 0)
                break;
              A = n[n.length - 1];
            }
          }
          n.push({ token: r, tokenType: u });
          break;
        case f.FUNCTION_ARGUMENT:
          for (y = +v; n[n.length - 1].token !== "(" && n.length > 0; ) {
            if (y--, y === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            s.push(n.pop() ?? { token: r, tokenType: u });
          }
          break;
        case f.LEFT_PARENTHESIS:
          n.push({ token: r, tokenType: u }), e[l] === "-" && s.push({ token: "0", tokenType: f.COEFFICIENT });
          break;
        case f.RIGHT_PARENTHESIS:
          for (y = +v; n[n.length - 1].token !== "(" && n.length > 1; ) {
            if (y--, y === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
              break;
            }
            s.push(n.pop() ?? { token: r, tokenType: u });
          }
          n.pop();
          break;
        case f.FUNCTION:
          n.push({ token: r, tokenType: u });
          break;
        default:
          throw new Error(`Token type ${r} is not handled`);
      }
    }
    return ce(this, Se, s.concat(n.reverse())), this;
  }
}
Ae = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap();
class De {
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
var b, w;
const I = class I {
  constructor(e) {
    x(this, b);
    x(this, w);
    // -----------------------------------------
    /**
     * Parse a string to a monom. The string may include fraction.
     * @param inputStr
     */
    o(this, "parse", (e) => (h(this, b, new c()), h(this, w, {}), typeof e == "string" ? this._shutingYardToReducedMonom(e) : typeof e == "number" ? h(this, b, new c(e)) : e instanceof c ? h(this, b, e.clone()) : e instanceof I && (h(this, b, i(e, b).clone()), this._cloneLiteral(e)), this));
    /**
     * Clone the current Monom.
     */
    o(this, "clone", () => {
      const e = new I();
      e.coefficient = i(this, b).clone();
      for (const t in i(this, w))
        e.setLetter(t, i(this, w)[t].clone());
      return e;
    });
    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    o(this, "add", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        this.isSameAs(s) ? (this.isZero() && this._cloneLiteral(s), i(this, b).add(s.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", s.display);
      }
      return this;
    });
    o(this, "containsRationalPower", () => Object.values(i(this, w)).some((e) => e.isRational()));
    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    o(this, "degree", (e) => this.variables.length === 0 ? new c().zero() : e === void 0 ? Object.values(i(this, w)).reduce((t, s) => t.clone().add(s)) : this.hasVariable(e) ? i(this, w)[e].clone() : new c().zero());
    /**
     * Derivative the monom
     * @param letter
     */
    o(this, "derivative", (e) => {
      if (e === void 0 && (e = "x"), this.hasVariable(e)) {
        const t = i(this, w)[e].clone(), s = this.clone();
        return i(s, w)[e].subtract(1), i(s, b).multiply(new c(t.clone())), s;
      } else
        return new I().zero();
    });
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    o(this, "divide", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        i(this, b).divide(s.coefficient);
        for (const n in s.literal)
          i(this, w)[n] = this.hasVariable(n) ? i(this, w)[n].subtract(s.literal[n]) : s.literal[n].clone().opposite(), i(this, w)[n].isZero() && this.removeVariable(n);
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
        if (e instanceof De)
          return new c().invalid();
        if (typeof e == "number")
          return this._evaluateAsNumeric(e);
        if (typeof e == "object") {
          const n = {};
          for (const r in e)
            n[r] = new c(e[r]).value;
          return this._evaluateAsNumeric(n);
        }
      }
      const s = this.coefficient.clone();
      if (typeof e == "number" || e instanceof c) {
        const n = {};
        return n[this.variables[0]] = new c(e), this.evaluate(n);
      }
      if (e instanceof De)
        return new c().invalid();
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient;
        for (const n in i(this, w)) {
          const r = new c(e[n]);
          s.multiply(r.pow(i(this, w)[n]));
        }
      }
      return s;
    });
    // -------------------------------------
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    o(this, "hasVariable", (e) => Object.hasOwn(i(this, w), e ?? "x"));
    o(this, "inverse", () => {
      i(this, b).opposite();
      for (const e in i(this, w))
        i(this, w)[e].opposite();
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
    o(this, "isEqual", (e) => this.isSameAs(e) && i(this, b).isEqual(e.coefficient));
    o(this, "isLiteralSquare", () => {
      for (const e in this.literal)
        if (this.literal[e].isRational() || this.literal[e].isEven())
          return !1;
      return !0;
    });
    /**
     * Determine if the monom is one
     */
    o(this, "isOne", () => i(this, b).value === 1 && this.variables.length === 0);
    /**
     * Determine if two monoms are similar
     * @param M
     */
    o(this, "isSameAs", (e) => {
      const t = this.variables, s = e.variables, n = t.concat(s.filter((r) => !t.includes(r)));
      if (this.isZero() || e.isZero() || t.length === 0 && s.length === 0)
        return !0;
      if (t.length !== s.length)
        return !1;
      if (!this.isZero() && !e.isZero()) {
        for (const r of n)
          if (!this.hasVariable(r) || !e.hasVariable(r) || !i(this, w)[r].isEqual(e.literal[r]))
            return !1;
      }
      return !0;
    });
    o(this, "isSquare", () => this.coefficient.isSquare() ? this.isLiteralSquare() : !1);
    /**
     * Determine if the monom is null
     */
    o(this, "isZero", () => i(this, b).value === 0);
    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    o(this, "multiply", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        i(this, b).multiply(s.coefficient);
        for (const n in s.literal)
          this.hasVariable(n) ? i(this, w)[n].add(s.literal[n]) : i(this, w)[n] = s.literal[n].clone();
      }
      return this;
    });
    /**
     * Create a one value monom
     */
    o(this, "one", () => (h(this, b, new c().one()), h(this, w, {}), this));
    /**
     * Get the opposite
     * Returns a monom.
     */
    o(this, "opposite", () => (i(this, b).opposite(), this));
    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    o(this, "pow", (e) => {
      i(this, b).pow(e);
      for (const t in i(this, w))
        i(this, w)[t].multiply(e);
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
      for (const e in i(this, w))
        i(this, w)[e].isZero() && this.removeVariable(e);
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
    o(this, "setLetter", (e, t) => t instanceof c ? (this.hasVariable(e) && t.isZero() && this.removeVariable(e), i(this, w)[e] = t.clone(), this) : this.setLetter(e, new c(t)));
    /**
     * Return the square root of a monom
     */
    o(this, "sqrt", () => {
      if (this.isSquare()) {
        i(this, b).sqrt();
        for (const e in i(this, w))
          i(this, w)[e].clone().divide(2);
      }
      return this;
    });
    /**
     * Subtract multiple monoms
     * @param M (Monom[]) The monoms to subtract
     */
    o(this, "subtract", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        this.isSameAs(s) ? (this.isZero() && this._cloneLiteral(s), i(this, b).add(s.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", s.display);
      }
      return this;
    });
    /**
     * Create a zero value monom
     */
    o(this, "zero", () => (h(this, b, new c().zero()), h(this, w, {}), this));
    o(this, "_evaluateAsNumeric", (e) => {
      let t = this.coefficient.value;
      if (typeof e == "number") {
        const s = {}, n = this.variables[0];
        return s[n] = e, this._evaluateAsNumeric(s);
      }
      if (e instanceof c) {
        const s = {};
        return s[this.variables[0]] = new c(e).value, this._evaluateAsNumeric(s);
      }
      if (e instanceof De)
        return NaN;
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient.value;
        for (const s in i(this, w)) {
          const n = e[s];
          n instanceof c ? t *= n.value ** i(this, w)[s].value : t *= n ** i(this, w)[s].value;
        }
      }
      return t;
    });
    o(this, "_shutingYardToReducedMonom", (e) => {
      const s = new ft().parse(e).rpn, n = [];
      if (s.length === 0)
        return this.zero(), this;
      if (s.length === 1) {
        const r = s[0];
        return this.one(), r.tokenType === f.COEFFICIENT ? this.coefficient = new c(r.token) : r.tokenType === f.VARIABLE && this.setLetter(r.token, 1), this;
      } else
        for (const r of s)
          this._shutingYard_AddToken(n, r);
      return this.one(), this.multiply(n[0]), this;
    });
    o(this, "_shutingYard_AddToken", (e, t) => {
      var v;
      let s, n, r, l, u;
      if (t.tokenType === f.COEFFICIENT)
        e.push(new I(new c(t.token)));
      else if (t.tokenType === f.VARIABLE) {
        const d = new I().one();
        d.setLetter(t.token, 1), e.push(d.clone());
      } else if (t.tokenType === f.OPERATION)
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
            u = ((v = e.pop()) == null ? void 0 : v.coefficient) ?? new c().one(), r = e.pop() ?? new I().one(), l = r.variables[0], l && r.setLetter(l, u), e.push(r);
            break;
          }
        }
    });
    return h(this, b, new c().zero()), h(this, w, {}), e !== void 0 && this.parse(e), this;
  }
  /**
   * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
   * @returns {Fraction}
   */
  get coefficient() {
    return i(this, b);
  }
  /**
   * Set the coefficient \\(k\\) value of the monom
   * @param {Fraction | number | string} F
   */
  set coefficient(e) {
    h(this, b, new c(e));
  }
  // Display getter
  /**
   * This display getter is to be used in the polynom display getter
   */
  get display() {
    let e = "";
    const t = Object.keys(i(this, w)).sort();
    for (const s of t)
      i(this, w)[s].isNotZero() && (e += s, i(this, w)[s].isNotEqual(1) && (e += `^(${i(this, w)[s].display})`));
    return e === "" ? i(this, b).value != 0 ? i(this, b).display : "" : i(this, b).value === 1 ? e : i(this, b).value === -1 ? `-${e}` : i(this, b).value === 0 ? "0" : `${i(this, b).display}${e}`;
  }
  get dividers() {
    if (!this.coefficient.isRelative())
      return [this.clone()];
    if (this.containsRationalPower())
      return [this.clone()];
    if (this.coefficient.numerator > 1e6)
      return [this.clone()];
    const e = F.dividers(Math.abs(this.coefficient.numerator));
    let t = [];
    for (const n in this.literal)
      t = this._getLiteralDividers(t, n);
    const s = [];
    if (t.length > 0 && e.length > 0)
      for (const n of e)
        for (const r of t) {
          const l = new I();
          l.coefficient = new c(n), l.literal = r, s.push(l);
        }
    else if (e.length === 0)
      for (const n of t) {
        const r = new I();
        r.coefficient = new c().one(), r.literal = n, s.push(r);
      }
    else
      for (const n of e) {
        const r = new I();
        r.coefficient = new c(n), s.push(r);
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
    return i(this, w);
  }
  /**
   * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
   * @param {literalType<Fraction>} L
   */
  set literal(e) {
    h(this, w, e);
  }
  /**
   * Get the literal square roots of the Monom.
   * TODO: remove this getter ? Is it used and is it correct ?
   * @returns {literalType<Fraction>}
   */
  get literalSqrt() {
    if (this.isLiteralSquare()) {
      const e = {};
      for (const t in i(this, w))
        e[t] = i(this, w)[t].clone().sqrt();
      return e;
    } else
      return i(this, w);
  }
  /**
   * Set the literal part of the monom from a string
   * @param inputStr  String like x^2y^3
   */
  set literalStr(e) {
    for (const t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)])
      t[1] in i(this, w) || (i(this, w)[t[1]] = new c().zero()), i(this, w)[t[1]].add(+t[2]);
    for (const t of [...e.matchAll(/([a-z](?!\^))/g)])
      t[1] in i(this, w) || (i(this, w)[t[1]] = new c().zero()), i(this, w)[t[1]].add(1);
  }
  get plotFunction() {
    let e = "";
    const t = Object.keys(i(this, w)).sort();
    for (const s of t)
      i(this, w)[s].isNotZero() && (e += (e === "" ? "" : "*") + s, i(this, w)[s].isNotEqual(1) && (e += `^(${i(this, w)[s].display})`));
    return e === "" ? i(this, b).value != 0 ? i(this, b).display : "" : i(this, b).value === 1 ? e : i(this, b).value === -1 ? `-${e}` : i(this, b).value === 0 ? "0" : `${i(this, b).display}*${e}`;
  }
  removeVariable(e) {
    delete i(this, w)[e];
  }
  /**
   * Get the tex output of the monom
   */
  get tex() {
    let e = "";
    const t = Object.keys(i(this, w)).sort();
    for (const s of t)
      i(this, w)[s].isNotZero() && (e += s, i(this, w)[s].isNotEqual(1) && (e += `^{ ${i(this, w)[s].tfrac} }`));
    return e === "" ? i(this, b).value != 0 ? i(this, b).frac : "0" : i(this, b).value === 1 ? e : i(this, b).value === -1 ? `-${e}` : i(this, b).value === 0 ? "0" : `${i(this, b).frac}${e}`;
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
      i(this, w)[t] = e.literal[t].clone();
  }
  _getLiteralDividers(e, t) {
    const s = [];
    for (let n = 0; n <= this.literal[t].value; n++)
      if (e.length === 0) {
        const r = {};
        r[t] = new c(n), s.push(r);
      } else
        for (const r of e) {
          const l = {};
          for (const u in r)
            l[u] = r[u];
          l[t] = new c(n), s.push(l);
        }
    return s;
  }
  // #endregion Private methods (5)
};
b = new WeakMap(), w = new WeakMap(), o(I, "gcd", (...e) => {
  for (const r of e)
    if (r.containsRationalPower())
      return new I().zero();
  const t = new I(), s = F.gcd(...e.map((r) => r.coefficient.numerator)), n = F.lcm(...e.map((r) => r.coefficient.denominator));
  t.coefficient = new c(s, n).reduce();
  for (const r of e) {
    for (const l in t.literal)
      l in r.literal || t.literal[l].zero();
    for (const l in r.literal)
      !t.hasVariable(l) && r.literal[l].isStrictlyPositive() ? t.literal[l] = r.literal[l].clone() : t.literal[l] = new c(Math.min(r.literal[l].value, t.literal[l].value));
  }
  return t;
}), /**
 * Multiply two monoms and return a NEW monom.
 * @param monoms
 */
o(I, "xMultiply", (...e) => {
  const t = new I().one();
  for (const s of e)
    t.multiply(s);
  return t;
});
let O = I;
var Ne, p;
const M = class M {
  constructor(e, ...t) {
    // #region Class fields (8)
    x(this, Ne);
    x(this, p);
    // #endregion Constructors (7)
    // #region Properties and methods (49)
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values
     */
    o(this, "parse", (e, ...t) => {
      if (h(this, p, []), h(this, Ne, []), typeof e == "string")
        return this._parseString(e, ...t);
      if ((typeof e == "number" || e instanceof c || e instanceof O) && t.length === 0)
        i(this, p).push(new O(e));
      else if (e instanceof O && t.length > 0)
        i(this, p).push(new O(e)), t.forEach((s) => {
          i(this, p).push(new O(s));
        });
      else if (e instanceof M)
        for (const s of e.monoms)
          i(this, p).push(s.clone());
      return this;
    });
    /**
     * Clone the polynom
     */
    o(this, "clone", () => {
      const e = new M(), t = [];
      for (const s of i(this, p))
        t.push(s.clone());
      return e.monoms = t, e;
    });
    o(this, "add", (...e) => {
      for (const t of e)
        t instanceof M ? h(this, p, i(this, p).concat(t.monoms)) : t instanceof O ? i(this, p).push(t.clone()) : typeof t == "number" && Number.isSafeInteger(t) ? i(this, p).push(new O(t.toString())) : i(this, p).push(new O(t));
      return this.reduce();
    });
    o(this, "commonMonom", () => {
      const e = new O().one(), t = this.gcdNumerator(), s = this.gcdDenominator(), n = this.degree();
      e.coefficient = new c(t, s);
      for (const r of this.variables) {
        e.setLetter(r, n);
        for (const l of i(this, p))
          if (e.setLetter(r, c.min(l.degree(r), e.degree(r))), e.degree(r).isZero())
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
      const t = new M();
      for (const s of i(this, p))
        t.add(s.derivative(e));
      return t;
    });
    o(this, "divide", (e) => {
      if (e instanceof c)
        return this._divideByFraction(e);
      if (typeof e == "number" && Number.isSafeInteger(e))
        return this._divideByInteger(e);
      if (e instanceof O)
        return this.divide(new M(e));
      if (e instanceof M) {
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
      const t = e.variables[0], s = new M().zero(), n = this.clone().reorder(t);
      if (e.variables.length === 0)
        return {
          quotient: this.clone().divide(e).reduce(),
          reminder: new M().zero()
        };
      const r = e.monomByDegree(void 0, t), l = e.degree(t);
      let u, v = this.degree(t).value * 2;
      for (; n.degree(t).isGeq(l) && v > 0 && (v--, u = n.monomByDegree(void 0, t).clone().divide(r), !(!u.isZero() && (s.add(u), n.subtract(e.clone().multiply(u)).reduce(), u.degree(t).isZero()))); )
        ;
      return s.reduce(), n.reduce(), { quotient: s, reminder: n };
    });
    o(this, "evaluate", (e, t) => {
      if (t)
        return this._evaluateAsNumeric(e);
      const s = new c().zero();
      return i(this, p).forEach((n) => {
        s.add(n.evaluate(e, t));
      }), s;
    });
    // -------------------------------------
    /**
     * Factorize a polynom and store the best results in factors.
     * @param maxValue Defines the greatest value to search to (default is 20).
     */
    o(this, "factorize", (e) => {
      let t = [], s = this.clone().reorder();
      const n = s.commonMonom();
      if (s.monomByDegree().coefficient.isStrictlyNegative() && n.coefficient.isStrictlyPositive() && !n.isOne() && n.opposite(), !n.isOne()) {
        const u = new M(n);
        t = [u.clone()], s = s.euclidean(u).quotient;
      }
      let r = s.degree().clone().multiply(2).value, l = 1;
      for (; r >= 0; )
        if (r--, s.monoms.length < 2) {
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
              t.push(v), s = d.quotient.clone(), u = u.filter((y) => {
                const A = s.monoms[0], P = s.monoms[s.monoms.length - 1], Y = y.monoms[0], Q = y.monoms[y.monoms.length - 1];
                return P.isDivisible(Q) ? A.isDivisible(Y) : !1;
              });
            }
          }
        }
      return s.isOne() || t.push(s.clone()), h(this, Ne, t), i(this, Ne);
    });
    o(this, "gcdDenominator", () => F.gcd(...this.getDenominators()));
    o(this, "gcdNumerator", () => F.gcd(...this.getNumerators()));
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
    o(this, "getZeroes", () => new Ve(
      new te(this, 0)
    ).solve());
    o(this, "integrate", (e, t, s = "x") => {
      const n = this.primitive(s), r = {}, l = {};
      return r[s] = new c(e), l[s] = new c(t), n.evaluate(l).subtract(n.evaluate(r));
    });
    o(this, "isDeveloped", (e) => {
      let t;
      const s = e.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
      if (s.includes("(") || s.includes(")"))
        return !1;
      try {
        t = new M(e);
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
      const t = new M(e);
      if (t.monoms.length > this.monoms.length)
        return !1;
      for (const s of t.monoms)
        if (!s.coefficient.isReduced())
          return !1;
      return !1;
    });
    o(this, "isSameAs", (e) => this._compare(e, "same"));
    o(this, "lcmDenominator", () => F.lcm(...this.getDenominators()));
    o(this, "lcmNumerator", () => F.lcm(...this.getNumerators()));
    o(this, "letters", () => {
      let e = /* @__PURE__ */ new Set();
      for (const t of i(this, p))
        e = /* @__PURE__ */ new Set([...e, ...t.variables]);
      return [...e];
    });
    o(this, "limitToInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), s = t.coefficient.sign(), n = t.degree(e);
      return n.isStrictlyPositive() ? s === 1 ? new c().infinite() : new c().infinite().opposite() : n.isZero() ? t.coefficient : new c().zero();
    });
    o(this, "limitToNegativeInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), s = t.coefficient.sign(), n = t.degree(e);
      return n.isStrictlyPositive() ? s === -1 ? new c().infinite() : new c().infinite().opposite() : n.isZero() ? t.coefficient : new c().zero();
    });
    o(this, "monomByDegree", (e, t) => {
      if (e === void 0)
        return this.monomByDegree(this.degree(t), t);
      const s = this.clone().reduce();
      for (const n of i(s, p))
        if (n.degree(t).isEqual(e))
          return n.clone();
      return new O().zero();
    });
    // Used in LinearSystem.tex
    o(this, "monomByLetter", (e) => {
      const t = this.clone().reduce();
      for (const s of i(t, p))
        if (s.hasVariable(e))
          return s.clone();
      return new O().zero();
    });
    o(this, "monomsByDegree", (e, t) => {
      if (e === void 0)
        return this.monomsByDegree(this.degree(t));
      const s = [], n = this.clone().reduce();
      for (const r of i(n, p))
        r.degree(t) === e && s.push(r.clone());
      return s;
    });
    o(this, "multiply", (e) => e instanceof M ? this._multiplyByPolynom(e) : e instanceof c ? this._multiplyByFraction(e) : e instanceof O ? this._multiplyByMonom(e) : Number.isSafeInteger(e) && typeof e == "number" ? this._multiplyByInteger(e) : this);
    o(this, "one", () => (h(this, p, []), i(this, p).push(new O().one()), this));
    // ------------------------------------------
    o(this, "opposite", () => (h(this, p, i(this, p).map((e) => e.opposite())), this));
    o(this, "pow", (e) => {
      if (!Number.isSafeInteger(e))
        return this.zero();
      if (e < 0)
        return this.zero();
      if (e === 0)
        return new M();
      const t = this.clone();
      for (let s = 1; s < e; s++)
        this.multiply(t);
      return this.reduce();
    });
    o(this, "primitive", (e) => {
      const t = new M();
      for (const s of i(this, p))
        t.add(s.primitive(e));
      return t;
    });
    o(this, "reduce", () => {
      let e = 0;
      for (; e < i(this, p).length; ) {
        for (let t = e + 1; t < i(this, p).length; t++)
          i(this, p)[e].isSameAs(i(this, p)[t]) && (i(this, p)[e].add(i(this, p)[t]), i(this, p).splice(t, 1), i(this, p)[e].isZero() && (i(this, p)[e] = new O().zero()), t--);
        e++;
      }
      h(this, p, i(this, p).filter((t) => !t.coefficient.isZero()));
      for (const t of i(this, p))
        t.coefficient.reduce();
      return this.length === 0 ? new M().zero() : this.reorder();
    });
    o(this, "reorder", (e = "x", t) => {
      t === void 0 && (t = !1);
      const s = this.variables.filter((n) => n !== e);
      return i(this, p).sort(function(n, r) {
        const l = n.degree(e).value, u = r.degree(e).value;
        if (l !== u)
          return t ? l - u : u - l;
        if (s.length > 0)
          for (const v of s) {
            const d = n.degree(v).value, y = r.degree(v).value;
            if (d !== y)
              return t ? d - y : y - d;
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
      const n = new M().zero();
      for (const r of this.monoms)
        !r.hasVariable(e) || r.literal[e].isZero() ? n.add(r.clone()) : (s = r.literal[e].clone(), r.removeVariable(e), n.add(t.clone().pow(Math.abs(s.numerator)).multiply(r)));
      return h(this, p, n.reduce().monoms), this;
    });
    o(this, "subtract", (...e) => {
      for (const t of e)
        t instanceof M ? this.add(t.clone().opposite()) : t instanceof O ? i(this, p).push(t.clone().opposite()) : i(this, p).push(new O(t).opposite());
      return this.reduce();
    });
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    o(this, "zero", () => (h(this, p, []), i(this, p).push(new O().zero()), this));
    // #endregion Getters And Setters (22)
    // #region Private methods (15)
    o(this, "_compare", (e, t) => {
      t === void 0 && (t = "=");
      const s = this.clone().reduce(), n = e.clone().reduce();
      switch (t) {
        case "=":
          return s.length !== n.length || s.degree().isNotEqual(n.degree()) ? !1 : s.monoms.every((r, l) => r.isEqual(n.monoms[l]));
        case "same":
          return s.length !== n.length || !s.degree().isEqual(n.degree()) ? !1 : s.monoms.every((r, l) => r.isSameAs(n.monoms[l]));
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
      let t, s, n, r, l, u, v, d, y;
      if (this.numberOfVars === 1)
        return n = this.monomByDegree(2, e).coefficient, r = this.monomByDegree(1, e).coefficient, l = this.monomByDegree(0, e).coefficient, u = r.clone().pow(2).subtract(n.clone().multiply(l).multiply(4)), u.isZero() ? (v = r.clone().opposite().divide(n.clone().multiply(2)), t = new M(e).subtract(v.display).multiply(v.denominator), s = new M(e).subtract(v.display).multiply(v.denominator), y = n.divide(v.denominator).divide(v.denominator), y.isOne() ? [t, s] : [new M(y.display), t, s]) : u.isPositive() && u.isSquare() ? (v = r.clone().opposite().add(u.clone().sqrt()).divide(n.clone().multiply(2)), d = r.clone().opposite().subtract(u.clone().sqrt()).divide(n.clone().multiply(2)), y = n.divide(v.denominator).divide(d.denominator), y.isOne() ? [
          new M(e).subtract(v.display).multiply(v.denominator),
          new M(e).subtract(d.display).multiply(d.denominator)
        ] : [
          new M(y.display),
          new M(e).subtract(v.display).multiply(v.denominator),
          new M(e).subtract(d.display).multiply(d.denominator)
        ]) : [this.clone()];
      if (n = this.monomByDegree(2, e), r = this.monomByDegree(1, e), l = this.monomByDegree(0, e), n.isLiteralSquare() && l.isLiteralSquare() && r.clone().pow(2).isSameAs(n.clone().multiply(l))) {
        const P = new M("x", n.coefficient, r.coefficient, l.coefficient)._factorize2ndDegree("x"), Y = [];
        let Q;
        if (P.length >= 2) {
          for (const ne of P)
            ne.degree().isZero() ? Y.push(ne.clone()) : (Q = ne.clone(), Q.monoms[0].literal = n.literalSqrt, Q.monoms[1].literal = l.literalSqrt, Y.push(Q.clone()));
          return Y;
        }
      }
      return [this.clone()];
    });
    o(this, "_factorizeByGroups", () => []);
    o(this, "_getAllPotentialFactors", (e, t, s) => {
      const n = e.monoms[0].dividers, r = e.monoms[e.monoms.length - 1].dividers, l = [];
      return n.forEach((u) => {
        u.degree(s).isLeq(t) && r.forEach((v) => {
          u.degree(s).isNotEqual(v.degree(s)) && (l.push(new M(u, v)), l.push(new M(u, v.clone().opposite())));
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
        for (const n of e.monoms)
          t.push(O.xMultiply(s, n));
      return h(this, p, t), this.reduce();
    });
    o(this, "_shutingYard_addToken", (e, t) => {
      switch (t.tokenType) {
        case f.COEFFICIENT:
          e.push(new M(t.token));
          break;
        case f.VARIABLE:
          e.push(new M().add(new O(t.token)));
          break;
        case f.CONSTANT:
          console.log("Actually, not supported - will be added later !");
          break;
        case f.OPERATION:
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
                for (const r in n.monoms[0].literal)
                  n.monoms[0].literal[r].multiply(s.monoms[0].coefficient);
                e.push(n);
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
    o(this, "genDisplay", (e, t, s, n) => {
      let r = "";
      for (const l of i(this, p)) {
        if (l.coefficient.value === 0)
          continue;
        let u;
        n ? u = l.plotFunction : u = e === "tex" ? l.tex : l.display, r += `${l.coefficient.sign() === 1 && (r !== "" || t === !0) ? "+" : ""}${u}`;
      }
      return s === !0 && this.length > 1 && (e === "tex" ? r = `\\left( ${r} \\right)` : r = `(${r})`), r === "" && (r = "0"), r;
    });
    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    o(this, "_shutingYardToReducedPolynom", (e) => {
      const s = new ft().parse(e).rpn;
      this.zero();
      const n = [];
      for (const r of s)
        this._shutingYard_addToken(n, r);
      return n.length === 1 && this.add(n[0]), this.reorder();
    });
    return h(this, p, []), h(this, Ne, []), e !== void 0 && this.parse(e, ...t), this;
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
        const s = new O(e);
        return this.add(s), this;
      }
      return this._shutingYardToReducedPolynom(e);
    } else if (/^[a-z]+/.test(e)) {
      this.empty();
      const s = t.map((n) => new c(n));
      if (e.length > 1) {
        const n = e.split("");
        let r = 0;
        for (const l of s) {
          const u = new O();
          u.coefficient = l.clone(), u.literalStr = n[r] || "", this.add(u), r++;
        }
      } else {
        let n = s.length - 1;
        for (const r of s) {
          const l = new O();
          l.coefficient = r.clone(), l.literalStr = `${e}^${n}`, this.add(l), n--;
        }
      }
      return this;
    } else
      return this.zero();
  }
  // #endregion Private methods (15)
};
Ne = new WeakMap(), p = new WeakMap();
let q = M;
var he, Oe;
const ot = class ot {
  constructor(e, t = "x") {
    x(this, he);
    x(this, Oe);
    h(this, he, e), h(this, Oe, t);
  }
  solve() {
    if (i(this, he).degree().isOne())
      return this._solveLinear();
    if (i(this, he).degree().value === 2)
      return this._solveQuadratic();
    const e = this._solveByFactorization();
    if (e.length > 0)
      return e;
    if (i(this, he).degree().value === 3)
      return this._solveCubic_CardanFormula();
    throw new Error("The equation degree is too high.");
  }
  solveAsCardan() {
    if (i(this, he).degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return this._solveCubic_CardanFormula();
  }
  _makeSolution(e) {
    if (e instanceof c && e.isApproximative())
      return this._makeApproximativeSolution(e.value);
    const t = new c(e);
    return {
      variable: i(this, Oe),
      exact: t,
      value: t.value,
      tex: t.tex,
      display: t.display
    };
  }
  _makeApproximativeSolution(e, t) {
    return {
      variable: i(this, Oe),
      exact: !1,
      value: +e.toFixed(10),
      tex: (t == null ? void 0 : t.tex) ?? "",
      display: (t == null ? void 0 : t.display) ?? ""
    };
  }
  _solveLinear() {
    const e = i(this, he).moveLeft().left, t = e.monomByDegree(0).coefficient.clone().opposite().divide(e.monomByDegree(1).coefficient);
    return [
      this._makeSolution(t)
    ];
  }
  _solveQuadratic() {
    const e = i(this, he).moveLeft().left, t = e.monomByDegree(2).coefficient, s = e.monomByDegree(1).coefficient, n = e.monomByDegree(0).coefficient, r = s.clone().pow(2).subtract(t.clone().multiply(n).multiply(4));
    if (r.isNegative())
      return [];
    if (r.isSquare()) {
      const l = r.sqrt(), u = s.clone().opposite().add(l).divide(t.clone().multiply(2)), v = s.clone().opposite().subtract(l).divide(t.clone().multiply(2));
      return l.isZero() ? [this._makeSolution(u)] : [
        this._makeSolution(u),
        this._makeSolution(v)
      ].sort((d, y) => d.value - y.value);
    }
    return this._solveQuadratic_Output(t, s, r);
  }
  _solveQuadratic_Output(e, t, s) {
    const n = F.dividers(s.value).filter((ae) => Math.sqrt(ae) % 1 === 0).map((ae) => Math.sqrt(ae)).pop() ?? 1, r = F.gcd(2 * e.value, t.value, n) * (e.isNegative() ? -1 : 1), l = t.clone().divide(r).opposite(), u = e.clone().divide(r).multiply(2), v = s.clone().divide(n ** 2), d = Math.abs(n / r), y = n === 1 ? "-" : `-${d} `, A = n === 1 ? "+" : `+${d} `;
    function P(ae, re, Ce, Ke) {
      return `\\frac{ ${re} ${Ce}\\sqrt{ ${Ke} } }{ ${ae} }`;
    }
    function Y(ae, re, Ce, Ke) {
      return `(${re}${Ce}sqrt(${Ke}))/${ae}`;
    }
    const Q = s.value ** 0.5, ne = (-t.value - Q) / (2 * e.value), we = (-t.value + Q) / (2 * e.value);
    return [
      this._makeApproximativeSolution(
        ne,
        {
          tex: P(u.tex, l.tex, y.toString(), v.tex),
          display: Y(u.display, l.display, y.toString(), v.display)
        }
      ),
      this._makeApproximativeSolution(
        we,
        {
          tex: P(u.tex, l.tex, A.toString(), v.tex),
          display: Y(u.display, l.display, A.toString(), v.display)
        }
      )
    ].sort((ae, re) => ae.value - re.value);
  }
  _solveCubic_CardanFormula() {
    const e = i(this, he).moveLeft().left, t = e.monomByDegree(3).coefficient, s = e.monomByDegree(2).coefficient, n = e.monomByDegree(1).coefficient, r = e.monomByDegree(0).coefficient, l = s.clone().divide(t), u = n.clone().divide(t), v = r.clone().divide(t), d = u.clone().subtract(l.clone().pow(2).divide(3)), y = v.clone().subtract(l.clone().multiply(u).divide(3)).add(l.clone().pow(3).multiply(2).divide(27)), A = y.clone().opposite(), P = d.clone().opposite().pow(3).divide(27), Y = A.clone().pow(2).subtract(P.clone().multiply(4)).opposite();
    if (Y.isNegative()) {
      const Q = y.clone().opposite().add(Y.clone().opposite().sqrt()).divide(2).root(3), ne = y.clone().opposite().subtract(Y.clone().opposite().sqrt()).divide(2).root(3), we = Q.clone().add(ne).subtract(l.clone().divide(3));
      return [this._makeSolution(we)];
    }
    if (Y.isZero()) {
      const Q = y.clone().opposite().divide(2).root(3), ne = Q.clone().opposite().subtract(l.clone().divide(3)), we = Q.clone().multiply(2).subtract(l.clone().divide(3));
      return ne.isEqual(we) ? [this._makeSolution(ne)] : [
        this._makeSolution(we),
        this._makeSolution(ne)
      ].sort((ae, re) => ae.value - re.value);
    }
    if (Y.isPositive()) {
      const Q = [], ne = d.value, we = y.value, ae = l.value;
      for (let re = 0; re < 3; re++)
        Q.push(2 * Math.sqrt(-ne / 3) * Math.cos(Math.acos(3 * we / (2 * ne) * Math.sqrt(-3 / ne)) / 3 + 2 * Math.PI * re / 3) - ae / 3);
      return Q.map((re) => this._makeApproximativeSolution(re)).sort((re, Ce) => re.value - Ce.value);
    }
    return [];
  }
  _solveByFactorization() {
    let e = i(this, he).moveLeft().left.clone(), t = [];
    const s = e.lcmDenominator();
    s !== 1 && e.multiply(s);
    const n = e.monomByDegree().coefficient;
    let r = e.monomByDegree(0).coefficient;
    const l = new q("x");
    for (; r.isZero(); )
      t.length === 0 && t.push(this._makeSolution(0)), e = e.divide(l), r = e.monomByDegree(0).coefficient;
    const u = F.dividers(n.value), v = F.dividers(r.value);
    for (const y of u)
      for (const A of v) {
        const P = new c(A, y);
        e.evaluate(P).isZero() && !t.find((Y) => Y.value === P.value) && t.push(this._makeSolution(P)), P.opposite(), e.evaluate(P).isZero() && !t.find((Y) => Y.value === P.value) && t.push(this._makeSolution(P));
      }
    for (const y of t) {
      if (y.exact !== !1 && y.exact.isZero())
        continue;
      const A = new q("x", y.exact.denominator, -y.exact.numerator);
      for (; e.isDividableBy(A); )
        e = e.divide(A);
    }
    if (e.degree().isZero())
      return t.sort((y, A) => y.value - A.value);
    if (e.degree().value > 3)
      return [];
    const d = new ot(new te(e, 0));
    return t = t.concat(d.solve()), t.sort((y, A) => y.value - A.value);
  }
};
he = new WeakMap(), Oe = new WeakMap();
let Ve = ot;
var ke, N, T, k;
const fe = class fe {
  constructor(e, t, s) {
    // #region Class fields (6)
    // TODO: Randomize defaults should be something else...
    x(this, ke, {
      degree: 2
    });
    // Left part of the equation
    x(this, N);
    // Right part of the equation
    x(this, T);
    // Signe of the equation
    x(this, k);
    // #endregion Constructors (3)
    // #region Properties and methods (26)
    // ------------------------------------------
    o(this, "parse", (e) => {
      const t = this._findSign(e);
      if (t === !1)
        throw new Error("The equation is not valid (no sign found)");
      const s = e.split(t);
      return this.create(new q(s[0]), new q(s[1]), this._formatSign(t));
    });
    o(this, "create", (e, t, s) => (h(this, N, e), h(this, T, t), h(this, k, this._formatSign(s ?? "=")), this));
    o(this, "clone", () => new fe(i(this, N).clone(), i(this, T).clone(), i(this, k)));
    /**
     * Get the degree of the equation
     * @param letter
     */
    o(this, "degree", (e) => c.max(i(this, N).degree(e), i(this, T).degree(e)));
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
    o(this, "isMultiVariable", () => i(this, N).isMultiVariable || i(this, T).isMultiVariable);
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
      i(this, N).subtract(i(this, T)), i(this, T).zero();
      const s = [...i(this, N).monoms];
      for (const r of s)
        r.hasVariable(e) || (t = r.clone(), i(this, N).subtract(t), i(this, T).subtract(t));
      if (i(this, N).length !== 1)
        return !1;
      const n = i(this, N).monoms[0].coefficient.clone();
      return i(this, N).divide(n), i(this, T).divide(n), this;
    });
    // -----------------------------------------------
    // Equations operations
    // -----------------------------------------------
    o(this, "letters", () => [.../* @__PURE__ */ new Set([...i(this, N).letters(), ...i(this, T).letters()])]);
    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    o(this, "moveLeft", () => (h(this, N, i(this, N).clone().subtract(i(this, T))), i(this, T).zero(), this));
    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    o(this, "multiply", (e) => {
      const t = new c(e);
      return i(this, N).multiply(t), i(this, T).multiply(t), i(this, k) !== "=" && t.sign() === -1 && this._reverseSign(), this;
    });
    o(this, "opposite", () => (h(this, N, i(this, N).opposite()), h(this, T, i(this, T).opposite()), this));
    o(this, "reorder", (e) => (i(this, N).subtract(i(this, T)), i(this, T).zero(), i(this, N).reorder(), e ? this : (i(this, N).monoms.filter((t) => t.degree().isZero()).forEach((t) => {
      const s = t.clone();
      i(this, N).subtract(s), i(this, T).subtract(s);
    }), i(this, N).reorder(), i(this, T).reorder(), this)));
    // ------------------------------------------
    o(this, "replaceBy", (e, t) => (i(this, N).replaceBy(e, t), i(this, T).replaceBy(e, t), this));
    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    o(this, "simplify", () => (this.multiply(F.lcm(...i(this, N).getDenominators(), ...i(this, T).getDenominators())), this.divide(F.gcd(...i(this, N).getNumerators(), ...i(this, T).getNumerators())), this));
    // -----------------------------------------------
    o(this, "solve", () => new Ve(this.clone()).solve());
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
    o(this, "_reverseSign", () => i(this, k) === "=" ? this : i(this, k).includes("<") ? (i(this, k).replace("<", ">"), this) : i(this, k).includes(">") ? (i(this, k).replace(">", "<"), this) : this);
    o(this, "isAlsoEqual", () => !!(i(this, k).includes("=") || i(this, k).includes("geq") || i(this, k).includes("leq")));
    o(this, "isGreater", () => i(this, k).includes(">") ? !0 : i(this, k).includes("geq"));
    o(this, "isStrictEqual", () => i(this, k) === "=");
    if (h(this, N, new q().zero()), h(this, T, new q().zero()), h(this, k, "="), e !== void 0 && t === void 0) {
      if (e instanceof fe)
        return e.clone();
      typeof e == "string" && this.parse(e);
    } else e !== void 0 && t !== void 0 && (this.left = new q(e), this.right = new q(t));
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
    if (e instanceof fe)
      return i(this, N).add(e.left), i(this, T).add(e.right), this;
    if (typeof e == "string" && !fe.isEquationString(e))
      return this.add(new fe(e));
    const t = new q(e);
    return i(this, N).add(t), i(this, T).add(t), this;
  }
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param values
   * @param asNumeric
   */
  evaluate(e, t) {
    const s = i(this, N).evaluate(e, t), n = i(this, T).evaluate(e, t);
    return t ? s === n : s.isEqual(n);
  }
  pow(e) {
    return i(this, N).pow(e), i(this, T).pow(e), this;
  }
  reduce() {
    return this.moveLeft(), i(this, N).reduce(), this.simplify(), i(this, N).monoms[0].coefficient.isNegative() && this.multiply(-1), this;
  }
  split() {
    return [i(this, N).clone(), i(this, T).clone()];
  }
  subtract(e) {
    if (e instanceof fe)
      return i(this, N).subtract(e.left), i(this, T).subtract(e.right), this;
    if (typeof e == "string" && !fe.isEquationString(e))
      return this.subtract(new fe(e));
    const t = new q(e);
    return i(this, N).subtract(t), i(this, T).subtract(t), this;
  }
  static isEquationString(e) {
    return e.includes("=") || e.includes("<") || e.includes(">") || e.includes("<=") || e.includes(">=");
  }
  static makeSolutionsUnique(e, t) {
    const s = [], n = e.filter((r) => s.includes(r.tex) ? !1 : (s.push(r.tex), !0));
    return t === !0 && n.sort((r, l) => r.value - l.value), n;
  }
  // #endregion Properties and methods (26)
  // #region Getters And Setters (13)
  get display() {
    return `${i(this, N).display}${this.signAsTex}${i(this, T).display}`;
  }
  // Getter and setter
  get left() {
    return i(this, N);
  }
  set left(e) {
    h(this, N, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  // Creation / parsing functions
  get randomizeDefaults() {
    return i(this, ke);
  }
  set randomizeDefaults(e) {
    h(this, ke, e);
  }
  get right() {
    return i(this, T);
  }
  set right(e) {
    h(this, T, e);
  }
  // ------------------------------------------
  get sign() {
    return i(this, k);
  }
  set sign(e) {
    h(this, k, this._formatSign(e));
  }
  get signAsTex() {
    return i(this, k) === ">=" ? "\\geq" : i(this, k) === "<=" ? "\\leq" : i(this, k);
  }
  get tex() {
    return `${i(this, N).tex}${this.signAsTex}${i(this, T).tex}`;
  }
  get variables() {
    return [...new Set(i(this, T).variables.concat(i(this, N).variables))];
  }
  // #endregion Private methods (6)
};
ke = new WeakMap(), N = new WeakMap(), T = new WeakMap(), k = new WeakMap();
let te = fe;
var L, U;
const $e = class $e {
  constructor(e, t) {
    x(this, L);
    x(this, U);
    if (h(this, L, new q().zero()), h(this, U, new q().one()), e instanceof $e)
      return e.clone();
    e !== void 0 && (h(this, L, new q(e)), h(this, U, new q(t ?? 1)));
  }
  get tex() {
    return `\\frac{ ${i(this, L).tex} }{ ${i(this, U).tex} }`;
  }
  get display() {
    return `(${i(this, L).display})/(${i(this, U).display})`;
  }
  get numerator() {
    return i(this, L);
  }
  get denominator() {
    return i(this, U);
  }
  clone() {
    return new $e(
      i(this, L).clone(),
      i(this, U).clone()
    );
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  zero() {
    return i(this, L).zero(), i(this, U).one(), this;
  }
  one() {
    return i(this, L).one(), i(this, U).one(), this;
  }
  add(e) {
    throw new Error("Method not implemented.");
  }
  subtract(e) {
    throw new Error("Method not implemented.");
  }
  opposite() {
    return i(this, L).opposite(), this;
  }
  multiply(e) {
    return e instanceof $e ? (i(this, L).multiply(e.numerator), i(this, U).multiply(e.denominator)) : i(this, L).multiply(e), this;
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
    return i(this, L).isZero();
  }
  isOne() {
    return i(this, L).isOne() && i(this, U).isOne();
  }
  inverse() {
    const e = i(this, L).clone(), t = i(this, U).clone();
    return h(this, L, t), h(this, U, e), this;
  }
  pow(e) {
    if (!Number.isSafeInteger(e))
      throw new Error("Cannot take the power of a polynom with a non integer value");
    return e < 0 ? this.inverse().pow(-e) : (i(this, L).pow(e), i(this, U).pow(e), this);
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
    const e = i(this, L).variables, t = i(this, U).variables;
    return [.../* @__PURE__ */ new Set([...e, ...t])];
  }
  hasVariable(e) {
    return i(this, L).hasVariable(e) || i(this, U).hasVariable(e);
  }
  degree() {
    throw new Error("Getting the degree of a rational polynom is not possible");
  }
  evaluate(e, t) {
    const s = i(this, L).evaluate(e, t), n = i(this, U).evaluate(e, t);
    return s instanceof c && n instanceof c ? s.divide(n) : s / n;
  }
};
L = new WeakMap(), U = new WeakMap();
let et = $e;
function Dt(a, e) {
  return a.dimension === e.dimension && a.array.every(
    (t, s) => e.array[s].isEqual(t)
  );
}
function Ft(a, e) {
  if (a.dimension !== e.dimension)
    return !1;
  const t = a.array[0].value / e.array[0].value;
  return a.array.every(
    (s, n) => e.array[n].value === t * s.value
  );
}
function Vt(a, e) {
  return a.dimension !== e.dimension ? new c().invalid() : a.array.reduce(
    (t, s, n) => t.add(s.clone().multiply(e.array[n])),
    new c(0)
  );
}
var se, xe, Ue;
const ve = class ve {
  constructor(...e) {
    x(this, se, []);
    x(this, xe, !1);
    o(this, "zero", () => (this.array.forEach((e) => e.zero()), this));
    o(this, "one", () => (this.array.forEach((e, t) => t === 1 ? e.one() : e.zero()), this));
    o(this, "opposite", () => (this.array.forEach((e) => e.opposite()), this));
    o(this, "add", (e) => (this.array.forEach((t, s) => t.add(e.array[s])), this));
    o(this, "subtract", (e) => this.add(e.clone().opposite()));
    o(this, "unit", () => {
      const e = this.norm;
      return e === 0 ? this : this.divideByScalar(e);
    });
    o(this, "dot", (e) => Vt(this, e));
    o(this, "normal", () => {
      if (this.dimension >= 3)
        throw new Error("Normal vector can only be determined in 2D");
      const e = this.x.clone().opposite(), t = this.y.clone();
      return i(this, se)[0] = t, i(this, se)[1] = e, this;
    });
    o(this, "isEqual", (e) => Dt(this, e));
    o(this, "isColinearTo", (e) => Ft(this, e));
    o(this, "isNormalTo", (e) => this.dot(e).isZero());
    o(this, "multiplyByScalar", (e) => {
      const t = new c(e);
      return this.array.forEach((s) => s.multiply(t)), this;
    });
    o(this, "divideByScalar", (e) => this.multiplyByScalar(new c(e).inverse()));
    o(this, "simplify", () => this.multiplyByScalar(
      F.lcm(...this.array.map((e) => e.denominator))
    ).divideByScalar(
      F.gcd(...this.array.map((e) => e.numerator))
    ).multiplyByScalar(
      this.x.isNegative() ? -1 : 1
    ));
    o(this, "angle", (e, t, s) => {
      let n = this.dot(e).value;
      return t && (n = Math.abs(n)), (s ? 1 : 180 / Math.PI) * Math.acos(n / (this.norm * e.norm));
    });
    x(this, Ue, (e) => {
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
    return i(this, xe);
  }
  set asPoint(e) {
    h(this, xe, e);
  }
  get normSquare() {
    return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new c(0));
  }
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get tex() {
    return i(this, xe) ? `\\left(${this.array.map((e) => e.tex).join(";")}\\right)` : `\\begin{pmatrix} ${this.array.map((e) => e.tex).join(" \\\\ ")} \\end{pmatrix}`;
  }
  get display() {
    return i(this, xe) ? `(${this.array.map((e) => e.display).join(";")})` : `((${this.array.map((e) => e.display).join(",")}))`;
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
    return h(this, xe, e !== !1), this;
  }
  parse(...e) {
    if (e.length === 0)
      throw new Error("Invalid value");
    if (e.length === 1) {
      if (e[0] instanceof ve)
        return e[0].clone();
      if (typeof e[0] == "string")
        return i(this, Ue).call(this, e[0]);
      throw new Error("Invalid value");
    }
    if (e.length === 2) {
      const [t, s] = e;
      if (t instanceof ve && s instanceof ve) {
        if (t.dimension !== s.dimension)
          throw new Error("Vectors must have the same dimension");
        return h(this, se, s.array.map((n, r) => n.clone().subtract(t.array[r]))), this;
      }
    }
    return h(this, se, e.map((t) => new c(t))), this;
  }
  clone() {
    const e = new ve();
    return e.array = this.copy(), e.asPoint = this.asPoint, e;
  }
  copy() {
    return this.array.map((e) => e.clone());
  }
  middleOf(e, t) {
    if (e.dimension !== t.dimension)
      throw new Error("Vectors must be the same dimension");
    return this.array = [], e.array.forEach((s, n) => {
      this.array.push(s.clone().add(t.array[n]).divide(2));
    }), this;
  }
  translate(...e) {
    return this.array.forEach((t, s) => t.add(e[s])), this;
  }
  cross(e) {
    if (this.dimension !== 3 || e.dimension !== 3)
      throw new Error("Cross product can only be determined in 3D");
    return new ve(
      this.y.clone().multiply(e.z).subtract(this.z.clone().multiply(e.y)),
      this.z.clone().multiply(e.x).subtract(this.x.clone().multiply(e.z)),
      this.x.clone().multiply(e.y).subtract(this.y.clone().multiply(e.x))
    );
  }
  distanceTo(e) {
    const t = new ve(this, e);
    return {
      value: t.norm,
      fraction: t.normSquare,
      tex: t.tex
    };
  }
};
se = new WeakMap(), xe = new WeakMap(), Ue = new WeakMap();
let E = ve;
function dt(a = 0.5) {
  return Math.random() < a;
}
function oe(a, e, t) {
  if (e === void 0)
    return a >= 0 ? oe(0, a) : oe(a, 0);
  if (a === e)
    return a;
  if (t === void 0)
    return Math.floor(Math.random() * (e - a + 1) + a);
  if (Math.abs(e - a) <= t.length)
    throw new Error("The number of excluded values is too high.");
  let s = oe(a, e);
  for (; t.includes(s); )
    s = oe(a, e);
  return s;
}
function _(a, e) {
  return e === !1 ? dt() ? oe(1, a) : -oe(1, a) : oe(-a, a);
}
function Zt(a) {
  let e = F.primes();
  return a !== void 0 && (e = e.filter((t) => t < a)), rt(e);
}
function _t(a, e) {
  return e === void 0 && (e = 1), a.length <= 0 ? Object.values(a) : pt(a).slice(0, e);
}
function rt(a) {
  return a.length === 0 ? null : a[oe(0, a.length - 1)];
}
function pt(a) {
  const e = Object.values(a);
  for (let t = e.length - 1; t > 0; t--) {
    const s = Math.floor(Math.random() * (t + 1)), n = e[t];
    e[t] = e[s], e[s] = n;
  }
  return e;
}
class Z extends E {
  constructor(...e) {
    super(), e.length > 0 && this.parse(...e);
  }
  parse(...e) {
    if (this.asPoint = !0, e.length === 0) {
      if (e[0] instanceof E)
        return this.array = e[0].copy(), this;
      if (typeof e[0] == "string") {
        const t = e[0].replaceAll("(", "").replaceAll(")", "").split(",").map((s) => new c(s));
        if (t.some((s) => s.isNaN()))
          throw new Error("The value is not a valid point sting (a,b): " + e[0]);
        this.array = t;
      }
    }
    if (e.length > 1) {
      if (e.some((s) => s instanceof E))
        throw new Error("Creating a point with  multiple argument requires an input fraction");
      const t = e.map((s) => new c(s));
      if (t.some((s) => s.isNaN()))
        throw new Error("The value is not a valid point sting (a,b): " + e.join(","));
      this.array = t;
    }
    return this;
  }
  clone() {
    const e = new Z();
    return e.array = this.copy(), e.asPoint = !0, e;
  }
}
var mt = /* @__PURE__ */ ((a) => (a.None = "none", a.Parallel = "parallel", a.Perpendicular = "perpendicular", a.Tangent = "tangent", a))(mt || {}), me, B, S, D, J, j, ye, le;
const Ee = class Ee {
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...e) {
    x(this, me);
    // ax + by + c = 0
    x(this, B);
    x(this, S);
    x(this, D);
    x(this, J);
    x(this, j);
    x(this, ye);
    x(this, le, "canonical");
    o(this, "randomPoint", (e) => i(this, j).clone().multiplyByScalar(_(e === void 0 || e <= 1 ? 3 : e, !1)).add(i(this, J)));
    o(this, "randomNearPoint", (e) => {
      const t = this.randomPoint(e);
      let s = 10;
      for (; this.isOnLine(t) && s > 0; )
        t.x.add(_(1, !1)), t.y.add(_(1, !1)), s--;
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
        if (e[0] instanceof Ee)
          return e[0].clone();
        if (e[0] instanceof te)
          return this.parseEquation(e[0]);
        if (typeof e[0] == "string")
          try {
            const t = new te(e[0]);
            return this.parse(t);
          } catch {
            return this;
          }
      }
      if (e.length === 2) {
        if (e[0] instanceof Z && e[1] instanceof E)
          return this.parseByPointAndVector(e[0], e[1]);
        if (e[0] instanceof Z && e[1] instanceof Z)
          return this.parseByPointAndVector(e[0], new E(e[0], e[1]));
      }
      if (e.length === 3) {
        if (e[0] instanceof E && e[1] instanceof E) {
          if (e[2] === "perpendicular")
            return this.parseByPointAndNormal(e[0], e[1]);
          if (e[2] === "parallel")
            return this.parseByPointAndVector(e[0], e[1]);
        }
        return e[0] instanceof E && e[1] instanceof Ee ? e[2] === "parallel" || e[2] === null ? this.parseByPointAndLine(
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
    o(this, "parseByCoefficient", (e, t, s) => (h(this, B, new c(e)), h(this, S, new c(t)), h(this, D, new c(s)), h(this, j, new E(i(this, S).clone(), i(this, B).clone().opposite())), h(this, J, new E(new c().zero(), i(this, D).clone())), h(this, ye, i(this, j).clone().normal()), this));
    o(this, "parseByPointAndVector", (e, t) => (this.parseByCoefficient(
      t.y,
      t.x.clone().opposite(),
      e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)).opposite()
    ), h(this, J, e.clone()), h(this, j, t.clone()), h(this, ye, i(this, j).clone().normal()), this));
    o(this, "parseByPointAndNormal", (e, t) => this.parseByCoefficient(
      t.x,
      t.y,
      e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()
    ));
    o(this, "parseByPointAndLine", (e, t, s) => (s === void 0 && (s = "parallel"), s === "parallel" ? this.parseByPointAndNormal(e, t.normal) : s === "perpendicular" ? this.parseByPointAndNormal(e, t.director) : this));
    o(this, "clone", () => (h(this, B, i(this, B).clone()), h(this, S, i(this, S).clone()), h(this, D, i(this, D).clone()), h(this, j, i(this, j).clone()), h(this, J, i(this, J).clone()), h(this, ye, i(this, ye).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    o(this, "isOnLine", (e) => i(this, B).clone().multiply(e.x).add(
      i(this, S).clone().multiply(e.y)
    ).add(i(this, D)).isZero());
    o(this, "isParallelTo", (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height));
    o(this, "isSameAs", (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height));
    o(this, "isPerpendicularTo", (e) => this.d.isNormalTo(e.d));
    o(this, "isVertical", () => this.slope.isInfinity());
    o(this, "simplify", () => {
      const e = F.lcm(i(this, B).denominator, i(this, S).denominator, i(this, D).denominator), t = F.gcd(i(this, B).numerator, i(this, S).numerator, i(this, D).numerator);
      return this.parseByCoefficient(
        i(this, B).clone().multiply(e).divide(t),
        i(this, S).clone().multiply(e).divide(t),
        i(this, D).clone().multiply(e).divide(t)
      ), this;
    });
    o(this, "simplifyDirection", () => (i(this, j).simplify(), this));
    o(this, "intersection", (e) => {
      const t = new E();
      let s = !1, n = !1;
      return i(this, S).isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new c().invalid(), t.y = new c().invalid(), s = !0) : this.isSameAs(e) ? (t.x = new c().invalid(), t.y = new c().invalid(), n = !0) : (t.x = i(this, S).clone().multiply(e.c).subtract(i(this, D).clone().multiply(e.b)).divide(i(this, B).clone().multiply(e.b).subtract(i(this, S).clone().multiply(e.a))), t.y = i(this, B).clone().multiply(e.c).subtract(i(this, D).clone().multiply(e.a)).divide(i(this, S).clone().multiply(e.a).subtract(i(this, B).clone().multiply(e.b)))), {
        point: t,
        hasIntersection: !(s || n),
        isParallel: s,
        isSame: n
      };
    });
    o(this, "getValueAtX", (e) => {
      const t = this.getEquation().isolate("y"), s = new c(e);
      return t instanceof te ? t.right.evaluate({ x: s }) : new c().invalid();
    });
    o(this, "getValueAtY", (e) => {
      const t = this.getEquation().isolate("x"), s = new c(e);
      return t instanceof te ? t.right.evaluate({ y: s }) : new c().invalid();
    });
    return h(this, B, new c().zero()), h(this, S, new c().zero()), h(this, D, new c().zero()), h(this, J, new E()), h(this, j, new E()), h(this, ye, new E()), h(this, me, !0), e.length > 0 && this.parse(...e), this;
  }
  get a() {
    return i(this, B);
  }
  // ------------------------------------------
  // Getter and setter
  set a(e) {
    h(this, B, e);
  }
  get b() {
    return i(this, S);
  }
  set b(e) {
    h(this, S, e);
  }
  get c() {
    return i(this, D);
  }
  set c(e) {
    h(this, D, e);
  }
  get OA() {
    return i(this, J);
  }
  set OA(e) {
    h(this, J, e);
  }
  get d() {
    return i(this, j);
  }
  set d(e) {
    h(this, j, e);
  }
  get n() {
    return i(this, ye);
  }
  // ------------------------------------------
  getEquation() {
    const e = new te(new q().parse("xy", i(this, B), i(this, S), i(this, D)), new q("0"));
    return i(this, me) ? e.simplify() : e;
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
    return h(this, le, "canonical"), this;
  }
  get equation() {
    return h(this, le, "equation"), this;
  }
  get mxh() {
    return h(this, le, "mxh"), this;
  }
  get parametric() {
    return h(this, le, "parametric"), this;
  }
  get system() {
    return h(this, le, "system"), this;
  }
  get tex() {
    const e = i(this, le);
    switch (h(this, le, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().tex;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new q().parse("x", this.slope, this.height).tex;
      case "parametric":
      case "system": {
        const t = i(this, j).clone();
        return i(this, me) && t.simplify(), e === "parametric" ? `${E.asTex("x", "y")} = ${E.asTex(i(this, J).x.tex, i(this, J).y.tex)} + k\\cdot ${E.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}
            x &= ${new q(i(this, J).x).add(new O(i(this, j).x).multiply(new O("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new q(i(this, J).y).add(new O(i(this, j).y).multiply(new O("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`;
      }
      default: {
        const t = this.getEquation();
        return i(this, B).isNegative() && t.multiply(-1), t.tex;
      }
    }
  }
  get reduceBeforeDisplay() {
    return i(this, me);
  }
  set reduceBeforeDisplay(e) {
    h(this, me, e);
  }
  get display() {
    const e = i(this, le);
    switch (h(this, le, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().display;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new q().parse("x", this.slope, this.height).display;
      case "parametric": {
        const t = i(this, j).clone();
        return i(this, me) && t.simplify(), `((x,y))=((${i(this, J).x.display},${i(this, J).y.display}))+k((${t.x.display},${t.y.display}))`;
      }
      default: {
        const t = this.getEquation();
        return i(this, B).isNegative() && t.multiply(-1), t.display;
      }
    }
  }
  get normal() {
    return new E(i(this, B), i(this, S));
  }
  get director() {
    return i(this, j).clone();
  }
  get slope() {
    return i(this, B).clone().opposite().divide(i(this, S));
  }
  get height() {
    return i(this, D).clone().opposite().divide(i(this, S));
  }
  distanceTo(e) {
    const t = e.x.clone().multiply(i(this, B)).add(e.y.clone().multiply(i(this, S))).add(i(this, D)).abs(), s = this.normal.normSquare;
    if (s.isZero())
      return {
        value: NaN,
        tex: "Not a line",
        fraction: new c().infinite()
      };
    const n = t.value / Math.sqrt(s.value), r = t.clone().divide(s.clone().sqrt());
    return s.isSquare() ? {
      value: n,
      tex: r.tex,
      fraction: r
    } : {
      value: n,
      tex: `\\frac{${t.tex}}{\\sqrt{${s.tex}}}`,
      fraction: r
    };
  }
  hitSegment(e, t) {
    const s = this.intersection(
      new Ee(e, t)
    );
    return s.hasIntersection ? s.point.x.value >= Math.min(e.x.value, t.x.value) && s.point.x.value <= Math.max(e.x.value, t.x.value) && s.point.y.value >= Math.min(e.y.value, t.y.value) && s.point.y.value <= Math.max(e.y.value, t.y.value) : !1;
  }
  // ------------------------------------------
  // Special functions
  // ------------------------------------------
  canonicalAsFloatCoefficient(e) {
    e === void 0 && (e = 2);
    let t = "";
    return i(this, B).isZero() || (i(this, B).isOne() ? t = "x" : i(this, B).clone().opposite().isOne() ? t = "-x" : t = i(this, B).value.toFixed(e) + "x"), i(this, S).isZero() || (i(this, S).isPositive() && (t += "+"), t += i(this, S).value.toFixed(e) + "y"), i(this, D).isZero() || (i(this, D).isPositive() && (t += "+"), t += i(this, D).value.toFixed(e)), t + "=0";
  }
};
me = new WeakMap(), B = new WeakMap(), S = new WeakMap(), D = new WeakMap(), J = new WeakMap(), j = new WeakMap(), ye = new WeakMap(), le = new WeakMap(), // A line is defined as the canonical form
o(Ee, "PERPENDICULAR", "perpendicular"), o(Ee, "PARALLEL", "parallel");
let z = Ee;
var ee, R, de, je, Ge, Ye, ie, yt, Fe, gt, wt, vt, tt;
const He = class He {
  constructor(...e) {
    x(this, ie);
    x(this, ee);
    x(this, R);
    x(this, de);
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    o(this, "relativePosition", (e) => {
      if (i(this, ee) === void 0 || i(this, R) === void 0)
        throw new Error("Circle not defined");
      const t = e.distanceTo(i(this, ee)), s = Math.sqrt(i(this, R).value);
      return t.value - s > 1e-10 ? 0 : Math.abs(t.value - s) < 1e-10 ? 1 : 2;
    });
    o(this, "lineIntersection", (e) => {
      const t = [];
      if (i(this, de) === void 0)
        return [];
      const s = i(this, de).clone(), n = e.getEquation().clone().isolate("x"), r = e.getEquation().clone().isolate("y");
      return n instanceof te && r instanceof te && (s.replaceBy("y", r.right).simplify(), s.solve()), t;
    });
    o(this, "tangents", (e) => e instanceof c ? i(this, Ye).call(this, e) : this.isPointOnCircle(e) ? i(this, je).call(this, e) : i(this, ee) !== void 0 && i(this, ee).distanceTo(e).value > this.radius.value ? (i(this, Ge).call(this, e), []) : (console.log("No tangents as the point is inside !"), []));
    o(this, "isPointOnCircle", (e) => {
      var t;
      return ((t = i(this, de)) == null ? void 0 : t.test({ x: e.x, y: e.y })) ?? !1;
    });
    o(this, "getPointsOnCircle", (e) => {
      const t = F.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), s = [];
      return t.forEach((n) => {
        for (const r of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
          s.push(
            new Z(
              this.center.x.clone().add(r[0] * n[0]),
              this.center.y.clone().add(r[1] * n[1])
            )
          );
      }), s;
    });
    x(this, je, (e) => {
      const t = new Z(this.center, e);
      return [new z(e, t, mt.Perpendicular)];
    });
    x(this, Ge, (e) => {
      const t = this.center.x.clone().subtract(e.x), s = this.center.y.clone().subtract(e.y), n = new q("x"), r = new q("x^2+1");
      n.multiply(t).subtract(s).pow(2), r.multiply(this.squareRadius), new te(n, r).moveLeft().simplify().solve();
    });
    x(this, Ye, (e) => {
      const t = e.numerator, s = -e.denominator, n = this.center.x.clone(), r = this.center.y.clone(), l = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), u = n.clone().multiply(t).opposite().subtract(r.clone().multiply(s)).add(l.clone().sqrt()), v = n.clone().multiply(t).opposite().subtract(r.clone().multiply(s)).subtract(l.clone().sqrt());
      return [new z(t, s, u), new z(t, s, v)];
    });
    e.length > 0 && this.parse(...e);
  }
  get center() {
    return i(this, ee) ?? new Z();
  }
  get squareRadius() {
    return i(this, R) ?? new c(0);
  }
  get cartesian() {
    if (i(this, de) === void 0)
      throw new Error("Cartesian equation not defined");
    return i(this, de);
  }
  get radius() {
    return i(this, R) === void 0 ? { tex: "", display: "", value: 0 } : i(this, R).isSquare() ? {
      tex: i(this, R).clone().sqrt().tex,
      display: i(this, R).clone().sqrt().display,
      value: i(this, R).clone().sqrt().value
    } : {
      tex: `\\sqrt{${i(this, R).tex}}`,
      display: `sqrt(${i(this, R).display})`,
      value: i(this, R).clone().sqrt().value
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
    return new He(
      this.center.clone(),
      this.squareRadius.clone(),
      !0
    );
  }
  setRadius(e, t) {
    return t ? h(this, R, new c(e)) : h(this, R, new c(e).pow(2)), ue(this, ie, Fe).call(this), this;
  }
  parse(...e) {
    return ue(this, ie, yt).call(this), typeof e[0] == "string" ? ue(this, ie, tt).call(this, new te(e[0])) : e[0] instanceof te ? ue(this, ie, tt).call(this, e[0]) : e[0] instanceof He ? ue(this, ie, gt).call(this, e[0]) : e[0] instanceof Z && e.length > 1 && (e[1] instanceof Z ? e[2] instanceof Z || ue(this, ie, vt).call(this, e[0], e[1]) : (e[1] instanceof c || typeof e[1] == "number") && ue(this, ie, wt).call(this, e[0], e[1], typeof e[2] == "boolean" ? e[2] : !1)), ue(this, ie, Fe).call(this), this;
  }
  // private _parseThroughtThreePoints(A: Point, B: Point, C: Point): this {
  //     const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(),
  //         mAC = T.remarquables.mediators.AC.clone()
  //     this.parse(mAB.intersection(mAC).point, A)
  //     return this
  // }
};
ee = new WeakMap(), R = new WeakMap(), de = new WeakMap(), je = new WeakMap(), Ge = new WeakMap(), Ye = new WeakMap(), ie = new WeakSet(), yt = function() {
  return h(this, ee, void 0), h(this, R, void 0), h(this, de, void 0), this;
}, Fe = function() {
  h(this, de, new te(
    new q(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
    new q(this.squareRadius.display)
  ).moveLeft());
}, gt = function(e) {
  return h(this, ee, e.center.clone()), h(this, R, e.squareRadius.clone()), ue(this, ie, Fe).call(this), this;
}, wt = function(e, t, s) {
  return h(this, ee, e.clone()), s ? h(this, R, new c(t)) : h(this, R, new c(t).pow(2)), this;
}, vt = function(e, t) {
  return h(this, ee, e.clone()), h(this, R, new E(i(this, ee), t).normSquare), this;
}, tt = function(e) {
  if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
    const t = e.left.monomByDegree(2, "x"), s = e.left.monomByDegree(2, "y");
    let n, r, l;
    t.coefficient.isEqual(s.coefficient) ? (e.divide(t.coefficient), n = e.left.monomByDegree(1, "x"), r = e.left.monomByDegree(1, "y"), l = e.left.monomByDegree(0), h(this, ee, new Z(n.coefficient.clone().divide(2).opposite(), r.coefficient.clone().divide(2).opposite())), h(this, R, l.coefficient.clone().opposite().add(i(this, ee).x.clone().pow(2)).add(i(this, ee).y.clone().pow(2)))) : (h(this, ee, void 0), h(this, R, void 0));
  }
  return this;
};
let Ze = He;
var G, W, X, qe, pe, Re, We, ze, ge, Xe, Me;
const Qe = class Qe {
  constructor(...e) {
    x(this, G);
    x(this, W);
    x(this, X);
    x(this, qe);
    x(this, pe);
    x(this, Re);
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
          new E(t[0], t[1]),
          new E(t[2], t[3]),
          new E(t[4], t[5])
        );
      } else if (e.length === 3) {
        if (e.every((t) => typeof t == "string"))
          return this.parse(...e.map((t) => new z(t)));
        if (e.every((t) => t instanceof z)) {
          const t = e[0].clone(), s = e[1].clone(), n = e[2].clone();
          h(this, qe, { AB: t, BC: s, AC: n });
          let r = t.intersection(s);
          if (r.hasIntersection)
            h(this, W, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (r = s.intersection(n), r.hasIntersection)
            h(this, X, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (r = n.intersection(t), r.hasIntersection)
            h(this, G, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
        } else e.every((t) => t instanceof Z) && (h(this, G, e[0].clone()), h(this, W, e[1].clone()), h(this, X, e[2].clone()), h(this, qe, {
          AB: new z(i(this, G), i(this, W)),
          BC: new z(i(this, W), i(this, X)),
          AC: new z(i(this, G), i(this, X))
        }));
      } else if (e.length === 1 && e[0] instanceof Qe)
        return e[0].clone();
      return i(this, We).call(this), this;
    });
    /**
     * Clone the Triangle class
     */
    o(this, "clone", () => new Qe(
      i(this, G).clone(),
      i(this, W).clone(),
      i(this, X).clone()
    ));
    // ------------------------------------------
    // Triangle operations and properties
    // ------------------------------------------
    /**
     * Generate the Line object for the three segments of the triangle
     */
    x(this, We, () => {
      h(this, pe, {
        AB: new Z().middleOf(i(this, G), i(this, W)),
        AC: new Z().middleOf(i(this, G), i(this, X)),
        BC: new Z().middleOf(i(this, W), i(this, X))
      }), h(this, Re, i(this, Xe).call(this));
    });
    /**
     * Get the Vector2D class for the given name
     * @param ptName
     */
    x(this, ze, (e) => {
      switch (e.toUpperCase()) {
        case "A":
          return i(this, G);
        case "B":
          return i(this, W);
        case "C":
          return i(this, X);
      }
      return i(this, G);
    });
    /**
     * Get the vector for the segment given by name.
     * @param ptName1
     * @param ptName2
     */
    x(this, ge, (e, t) => new E(
      i(this, ze).call(this, e),
      i(this, ze).call(this, t)
    ));
    x(this, Xe, () => {
      const e = {
        A: new z(i(this, G), i(this, pe).BC),
        B: new z(i(this, W), i(this, pe).AC),
        C: new z(i(this, X), i(this, pe).AB),
        intersection: null
      }, t = {
        AB: new z(i(this, pe).AB, new E(i(this, G), i(this, W)).normal()),
        AC: new z(i(this, pe).AC, new E(i(this, G), i(this, X)).normal()),
        BC: new z(i(this, pe).BC, new E(i(this, W), i(this, X)).normal()),
        intersection: null
      }, s = {
        A: new z(i(this, G), new E(i(this, W), i(this, X)).normal()),
        B: new z(i(this, W), new E(i(this, G), i(this, X)).normal()),
        C: new z(i(this, X), new E(i(this, G), i(this, W)).normal()),
        intersection: null
      }, n = i(this, Me).call(this, "A"), r = i(this, Me).call(this, "B"), l = i(this, Me).call(this, "C"), u = {
        A: n.internal,
        B: r.internal,
        C: r.internal,
        intersection: null
      }, v = {
        A: n.external,
        B: r.external,
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
    x(this, Me, (e) => {
      const t = this.lines;
      let s, n;
      if (e === "A" ? (s = t.AB, n = t.AC) : e === "B" ? (s = t.AB, n = t.BC) : e === "C" && (s = t.BC, n = t.AC), s === void 0 || n === void 0)
        throw new Error(`The point ${e} does not exist`);
      const r = s.n.simplify().norm, l = n.n.simplify().norm, u = s.getEquation().multiply(l), v = n.getEquation().multiply(r), d = new z(u.clone().subtract(v).simplify()), y = new z(v.clone().subtract(u).simplify());
      return e === "A" ? d.hitSegment(this.B, this.C) ? { internal: d, external: y } : { internal: y, external: d } : e === "B" ? d.hitSegment(this.A, this.C) ? { internal: d, external: y } : { internal: y, external: d } : e === "C" ? d.hitSegment(this.B, this.A) ? { internal: d, external: y } : { internal: y, external: d } : { internal: d, external: y };
    });
    return e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setters
  // ------------------------------------------
  get A() {
    return i(this, G);
  }
  get B() {
    return i(this, W);
  }
  get C() {
    return i(this, X);
  }
  get AB() {
    return i(this, ge).call(this, "A", "B");
  }
  get BA() {
    return i(this, ge).call(this, "B", "A");
  }
  get BC() {
    return i(this, ge).call(this, "B", "C");
  }
  get CB() {
    return i(this, ge).call(this, "C", "B");
  }
  get AC() {
    return i(this, ge).call(this, "A", "C");
  }
  get CA() {
    return i(this, ge).call(this, "C", "A");
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
    return i(this, qe);
  }
  get remarquables() {
    return i(this, Re);
  }
};
G = new WeakMap(), W = new WeakMap(), X = new WeakMap(), qe = new WeakMap(), pe = new WeakMap(), Re = new WeakMap(), We = new WeakMap(), ze = new WeakMap(), ge = new WeakMap(), Xe = new WeakMap(), Me = new WeakMap();
let it = Qe;
function _e(a) {
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
  if (e.negative ? t.numerator = _(e.max, e.zero) : t.numerator = oe(e.zero ? 0 : 1, e.max), e.natural)
    t.denominator = 1;
  else {
    let s = 0;
    for (; t.isRelative() && s < 10; )
      t.denominator = oe(1, e.max), s++;
  }
  return e.reduced ? t.reduce() : t;
}
function xt(a) {
  const e = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    a
  ), t = new O();
  if (t.coefficient = _e({
    zero: e.zero,
    reduced: !0,
    natural: !e.fraction
  }), e.letters.length > 1) {
    for (const s of e.letters.split(""))
      t.setLetter(s, 0);
    for (let s = 0; s < e.degree; s++) {
      const n = rt(e.letters.split(""));
      t.setLetter(n, t.degree(n).clone().add(1));
    }
  } else
    t.setLetter(e.letters, e.degree);
  return t;
}
const Ut = {
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
function bt(a) {
  const e = Object.assign(
    Ut,
    a
  ), t = new q().empty();
  let s;
  for (let n = e.degree; n >= 0; n--)
    s = xt({
      letters: e.letters,
      degree: n,
      fraction: e.fraction,
      zero: n === e.degree ? !1 : e.allowNullMonom
    }), e.unit && e.degree === n && s.coefficient.one(), t.add(s);
  if (e.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposite(), e.numberOfMonoms && e.numberOfMonoms > 0 && e.numberOfMonoms < t.length)
    for (; t.length > e.numberOfMonoms; ) {
      const n = oe(1, t.length - 1);
      t.monoms.splice(n, 1);
    }
  return t;
}
function jt(a) {
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
  ), t = new q().one();
  for (let s = 0; s < e.degree; s++) {
    const n = bt({
      degree: 1,
      unit: e.unit,
      fraction: e.fraction,
      letters: e.letters,
      zero: e.zero
    });
    t.multiply(n);
  }
  return new te(t, 0);
}
function Et(a) {
  const e = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    a
  ), t = e.axis === "x", s = e.axis === "y", n = e.fraction ? _e({ max: e.max, zero: t }) : new c(_(e.max, t)), r = e.fraction ? _e({ max: e.max, zero: s }) : new c(_(e.max, s));
  return Number(e.quadrant) === 1 && (n.abs(), r.abs()), Number(e.quadrant) === 2 && (n.isPositive() && n.opposite(), r.isNegative() && r.opposite()), Number(e.quadrant) === 3 && (n.isPositive() && n.opposite(), r.isPositive() && r.opposite()), Number(e.quadrant) === 4 && (n.isNegative() && n.opposite(), r.isPositive() && r.opposite()), new Z(n, r);
}
function Gt(a) {
  const e = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    a
  ), t = Et(e.center);
  let s, n;
  return e.pointsOnCircle === 8 ? (s = oe(1, 3), n = s ** 2 + (s + 1) ** 2) : n = oe(1, 20), new Ze(t, n, !0);
}
function Yt(a) {
  const e = Object.assign(
    {
      A: {
        x: _(10),
        y: _(10)
      }
    },
    a
  ), t = new E(
    _(10),
    _(10)
  );
  for (; t.isNull; )
    t.x = _(10), t.y = _(10);
  return e.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposite() : e.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposite(), new z(new E(e.A.x, e.A.y), t);
}
var $, V;
const Pe = class Pe {
  constructor(e, t) {
    // ax + by + c = 0
    x(this, $, new Z());
    x(this, V, new E());
    o(this, "clone", () => (h(this, V, i(this, V).clone()), h(this, $, i(this, $).clone()), this));
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
      const t = i(this, $).clone(), s = new c(_(e, !1));
      return new Z(
        t.x.clone().add(i(this, V).x.clone().multiply(s)),
        t.y.clone().add(i(this, V).y.clone().multiply(s)),
        t.z.clone().add(i(this, V).z.clone().multiply(s))
      );
    });
    return h(this, $, e.clone()), h(this, V, t.asPoint ? new E(e, t) : t.clone()), this;
  }
  get OA() {
    return i(this, $);
  }
  set OA(e) {
    h(this, $, e);
  }
  get point() {
    return i(this, $).clone();
  }
  get d() {
    return i(this, V);
  }
  set d(e) {
    h(this, V, e);
  }
  get tex() {
    return {
      parametric: `${E.asTex("x", "y", "z")} = ${E.asTex(i(this, $).x.tex, i(this, $).y.tex, i(this, $).z.tex)} + k\\cdot ${E.asTex(i(this, V).x.tex, i(this, V).y.tex, i(this, V).z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new q(i(this, $).x).add(new O(i(this, V).x).multiply(new O("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new q(i(this, $).y).add(new O(i(this, V).y).multiply(new O("k"))).reorder("k", !0).tex}\\\\
    z &= ${new q(i(this, $).z).add(new O(i(this, V).z).multiply(new O("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
      cartesian: `\\frac{ ${new q("x", 1, i(this, $).x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new q("y", 1, i(this, $).y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new q("z", 1, i(this, $).z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
    };
  }
  get display() {
    const e = i(this, $).x.display, t = i(this, $).y.display, s = i(this, $).z.display, n = this.direction.simplify(), r = n.x.display, l = n.y.display, u = n.z.display;
    return {
      parametric: `${E.asDisplay("x", "y", "z")} = ${E.asDisplay(i(this, $).x.display, i(this, $).y.display, i(this, $).z.display)} + k\\cdot ${E.asDisplay(i(this, V).x.display, i(this, V).y.display, i(this, V).z.display)}`,
      system: "",
      cartesian: `(x-${e})/${r} = (y-${t})/${l} = (z-${s})/${u}`
    };
  }
  get direction() {
    return i(this, V).clone();
  }
  distanceTo(e) {
    const t = new E(i(this, $), e), s = this.direction, n = this.direction.normSquare, r = t.cross(s).normSquare, l = r.clone().divide(n), u = l.clone().sqrt();
    return console.log("CROSS", t.cross(s).display), {
      value: Math.sqrt(l.value),
      fraction: l.clone().sqrt(),
      tex: u.isExact() ? u.tex : `\\sqrt{${l.tex}}`
    };
  }
  hitSegment(e, t) {
    const s = this.intersection(
      new Pe(e, t)
    );
    return s.hasIntersection ? s.point.x.value >= Math.min(e.x.value, t.x.value) && s.point.x.value <= Math.max(e.x.value, t.x.value) && s.point.y.value >= Math.min(e.y.value, t.y.value) && s.point.y.value <= Math.max(e.y.value, t.y.value) && s.point.z.value >= Math.min(e.z.value, t.z.value) && s.point.z.value <= Math.max(e.z.value, t.z.value) : !1;
  }
};
$ = new WeakMap(), V = new WeakMap(), // A line is defined as the canonical form
o(Pe, "PERPENDICULAR", "perpendicular"), o(Pe, "PARALLEL", "parallel");
let st = Pe;
function Ht(a) {
  const e = Object.assign(
    {
      A: {
        x: _(10),
        y: _(10),
        z: _(10)
      },
      direction: {
        x: _(10),
        y: _(10),
        z: _(10)
      }
    },
    a
  ), t = new Z(e.A.x, e.A.y, e.A.z), s = new E(e.direction.x, e.direction.y, e.direction.z);
  return new st(t, s);
}
const Wt = {
  equation: (a) => jt(a),
  polynom: (a) => bt(a),
  monom: (a) => xt(a),
  fraction: (a) => _e(a),
  number: (a, e, t) => oe(a, e, t),
  numberSym: (a, e) => _(a, e),
  prime: (a) => Zt(a),
  bool: (a) => dt(a),
  array: (a, e) => _t(a, e),
  item: (a) => rt(a),
  shuffle: (a) => pt(a),
  line: (a) => Yt(a),
  line3: (a) => Ht(a),
  point: (a) => Et(a),
  circle: (a) => Gt(a)
}, Xt = {
  Vector: E,
  Point: Z,
  Line: z,
  Triangle: it,
  Circle: Ze
}, Kt = {
  Numeric: F,
  Fraction: c,
  Root: De,
  Monom: O,
  Polynom: q,
  Equation: te,
  // LinearSystem,
  Rational: et,
  // LogicalSet,
  Random: Wt,
  Geometry: Xt
};
export {
  Kt as default
};
