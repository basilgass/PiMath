var Oi = Object.defineProperty;
var oi = (o) => {
  throw TypeError(o);
};
var Ai = (o, e, t) => e in o ? Oi(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var h = (o, e, t) => Ai(o, typeof e != "symbol" ? e + "" : e, t), jt = (o, e, t) => e.has(o) || oi("Cannot " + t);
var s = (o, e, t) => (jt(o, e, "read from private field"), t ? t.call(o) : e.get(o)), m = (o, e, t) => e.has(o) ? oi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), a = (o, e, t, i) => (jt(o, e, "write to private field"), i ? i.call(o, t) : e.set(o, t), t), A = (o, e, t) => (jt(o, e, "access private method"), t);
function qi(o) {
  const e = ai(o), t = [];
  let i, r;
  for (; e.length > 0; )
    i = e.shift() ?? 1, r = (e.length > 0 ? e.pop() : +i) ?? 1, t.push([i, r]);
  return t;
}
function Mi(...o) {
  const e = ti(...o);
  return o.map((t) => t / e);
}
function ai(o) {
  const e = Math.abs(o), t = Math.sqrt(e), i = [];
  for (let r = 1; r <= t; r++)
    o % r === 0 && (i.push(r), i.push(e / r));
  return i.sort(function(r, n) {
    return r - n;
  }), [...new Set(i)];
}
function ti(...o) {
  const e = function(r, n) {
    return n === 0 ? r : e(n, r % n);
  };
  let t = 1, i = 2;
  if (o.length === 0)
    return 1;
  if (o.length === 1)
    return o[0] === 0 ? 1 : o[0];
  if (t = e(o[0], o[1]), t === 1)
    return 1;
  for (i = 2; i < o.length && (t = e(t, o[i]), t !== 1); i++)
    ;
  return Math.abs(t);
}
function ki(...o) {
  return o.reduce(function(e, t) {
    return Math.abs(e * t / ti(e, t));
  });
}
function Ci(o, e = 3) {
  return +o.toFixed(e);
}
function $i(o) {
  if (Number.isSafeInteger(o) || o.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function Ii(o) {
  const e = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return o === void 0 ? e : e.slice(0, Math.min(e.length, o));
}
function Pi(o, e) {
  const t = [], i = e === !0 ? +o : o ** 2;
  for (let r = 0; r <= o; r++)
    for (let n = 0; n <= o; n++)
      r ** 2 + n ** 2 === i && t.push([r, n, o]);
  return t;
}
function Si(o, e = 2) {
  return +`${Math.round(+`${o}e${e}`)}e-${e}`;
}
const G = {
  decompose: qi,
  dividers: ai,
  divideNumbersByGCD: Mi,
  gcd: ti,
  lcm: ki,
  numberCorrection: Ci,
  periodic: $i,
  primes: Ii,
  pythagoreanTripletsWithTarget: Pi,
  round: Si
};
var it, b, w, $e;
const C = class C {
  constructor(e, t) {
    // #region Class fields (2)
    m(this, it, !1);
    m(this, b, 1);
    m(this, w, 1);
    m(this, $e, "frac");
    // ------------------------------------------
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    h(this, "parse", (e, t) => {
      let i;
      if (e === "")
        return a(this, w, 0), a(this, b, 1), this;
      switch (typeof e) {
        case "string":
          if (i = e.split("/"), i.length > 2)
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (i.map((r) => r === "" || isNaN(Number(r))).includes(!0))
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (i.length === 1)
            return this.parse(+i[0]);
          i.length === 2 ? i[1] === "0" ? (a(this, w, NaN), a(this, b, 1)) : (a(this, w, +i[0]), a(this, b, +i[1])) : (a(this, w, NaN), a(this, b, 1));
          break;
        case "number":
          if (Number.isSafeInteger(e))
            a(this, w, +e), t === void 0 || !Number.isSafeInteger(t) ? a(this, b, 1) : a(this, b, +t);
          else {
            const [, r] = e.toString().split("."), n = r ? r.length : 0;
            t === void 0 ? (a(this, w, e * Math.pow(10, n)), a(this, b, Math.pow(10, n))) : Number.isSafeInteger(t) && (a(this, w, e * Math.pow(10, n) - Math.floor(e * Math.pow(10, n - t))), this.denominator = Math.pow(10, n) - Math.pow(10, n - t)), this.reduce();
          }
          break;
        case "object":
          e instanceof C && (a(this, w, +e.numerator), a(this, b, +e.denominator));
          break;
      }
      return this;
    });
    h(this, "clone", () => {
      const e = new C();
      return e.numerator = +s(this, w), e.denominator = +s(this, b), e;
    });
    h(this, "abs", () => (a(this, w, Math.abs(s(this, w))), a(this, b, Math.abs(s(this, b))), this));
    h(this, "add", (e) => {
      if (e instanceof C) {
        const t = s(this, w), i = s(this, b);
        a(this, w, t * e.denominator + e.numerator * i), a(this, b, i * e.denominator);
      } else
        return this.add(new C(e));
      return this.reduce();
    });
    h(this, "amplify", (e) => (Number.isSafeInteger(e) && (a(this, w, s(this, w) * e), a(this, b, s(this, b) * e)), this));
    // TODO: The rest of the functions are not used or unnecessary ?
    /**
     * Simple function to determine if it's a fraction
     */
    h(this, "areEquals", (...e) => e.every((t) => t.isEqual(e[0])));
    // ------------------------------------------
    /**
     * Compare the current coefficient with another coefficient
     * @param F (Coefficient) The coefficient to _compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    h(this, "compare", (e, t) => {
      t === void 0 && (t = "=");
      let i;
      switch (e instanceof C ? i = e.clone() : i = new C(e), t) {
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
    });
    h(this, "divide", (e) => {
      const t = new C(e);
      if (t.numerator === 0)
        return new C().infinite();
      const i = +s(this, w), r = +s(this, b);
      return a(this, w, i * t.denominator), a(this, b, r * t.numerator), this.reduce();
    });
    h(this, "infinite", () => (a(this, w, 1 / 0), a(this, b, 1), this));
    h(this, "invalid", () => (a(this, w, NaN), a(this, b, 1), this));
    h(this, "inverse", () => {
      const e = +s(this, w);
      return a(this, w, +s(this, b)), a(this, b, e), this;
    });
    h(this, "isApproximative", () => s(this, it) || s(this, w).toString().length >= 15 && s(this, b).toString().length >= 15);
    h(this, "isEqual", (e) => this.compare(e, "="));
    h(this, "isEven", () => this.isRelative() && this.value % 2 === 0);
    h(this, "isExact", () => !this.isApproximative());
    h(this, "isFinite", () => !this.isInfinity() && !this.isNaN());
    h(this, "isGeq", (e) => this.compare(e, ">="));
    h(this, "isGreater", (e) => this.compare(e, ">"));
    h(this, "isInfinity", () => Math.abs(s(this, w)) === 1 / 0);
    h(this, "isInverted", (e) => this.isEqual(new C().one().divide(e.clone())));
    h(this, "isLeq", (e) => this.compare(e, "<="));
    /* Compare shortcuts */
    h(this, "isLesser", (e) => this.compare(e, "<"));
    h(this, "isNaN", () => isNaN(s(this, w)));
    h(this, "isNatural", () => this.isRelative() && this.isPositive());
    h(this, "isNegative", () => this.sign() === -1);
    h(this, "isNegativeOne", () => s(this, w) === -1 && s(this, b) === 1);
    h(this, "isNotEqual", (e) => this.compare(e, "<>"));
    // ------------------------------------------
    h(this, "isNotZero", () => s(this, w) !== 0);
    h(this, "isOdd", () => this.isRelative() && this.value % 2 === 1);
    h(this, "isOne", () => s(this, w) === 1 && s(this, b) === 1);
    h(this, "isOpposite", (e) => this.isEqual(e.clone().opposite()));
    h(this, "isPositive", () => this.sign() === 1);
    h(this, "isRational", () => !this.isRelative());
    h(this, "isReduced", () => Math.abs(G.gcd(s(this, w), s(this, b))) === 1);
    h(this, "isRelative", () => this.clone().reduce().denominator === 1);
    h(this, "isSquare", () => Math.sqrt(s(this, w)) % 1 === 0 && Math.sqrt(s(this, b)) % 1 === 0);
    h(this, "isStrictlyNegative", () => this.value < 0);
    h(this, "isStrictlyPositive", () => this.value > 0);
    // Mathematical operations specific to fractions
    h(this, "isZero", () => s(this, w) === 0);
    h(this, "multiply", (e) => {
      const t = new C(e);
      return a(this, w, s(this, w) * t.numerator), a(this, b, s(this, b) * t.denominator), this.reduce();
    });
    h(this, "one", () => (a(this, w, 1), a(this, b, 1), this));
    h(this, "opposite", () => (a(this, w, -s(this, w)), this));
    // #endregion Properties and methods (55)
    // #region Getters And Setters (11)
    h(this, "pow", (e) => {
      if (e instanceof C)
        return this.pow(e.value);
      this.reduce(), e < 0 && this.inverse();
      const t = Math.floor(Math.pow(s(this, w), Math.abs(e))), i = Math.floor(Math.pow(s(this, b), Math.abs(e)));
      return t ** Math.abs(e) === s(this, w) && i ** Math.abs(e) === s(this, b) ? (a(this, w, s(this, w) ** Math.abs(e)), a(this, b, s(this, b) ** Math.abs(e))) : (a(this, w, s(this, w) ** Math.abs(e)), a(this, b, s(this, b) ** Math.abs(e))), this;
    });
    // ------------------------------------------
    h(this, "reduce", () => {
      const e = G.gcd(s(this, w), s(this, b));
      return a(this, w, s(this, w) / e), a(this, b, s(this, b) / e), s(this, b) < 0 && (a(this, b, -s(this, b)), a(this, w, -s(this, w))), this;
    });
    h(this, "root", (e) => {
      if (e === 0)
        return this;
      if (e < 0 && this.inverse(), !Number.isSafeInteger(e))
        throw new Error("The root must be an integer.");
      if (this.isNegative() && e % 2 === 0)
        throw new Error("The root of a negative number must be odd.");
      const t = this.sign();
      this.abs(), this.reduce();
      const i = Math.floor(Math.pow(s(this, w), Math.abs(1 / e))), r = Math.floor(Math.pow(s(this, b), Math.abs(1 / e)));
      return a(this, w, Math.pow(s(this, w), Math.abs(1 / e))), a(this, b, Math.pow(s(this, b), Math.abs(1 / e))), (i !== s(this, w) || r !== s(this, b)) && (a(this, w, s(this, w) / s(this, b)), a(this, b, 1), a(this, it, !0)), this.multiply(t), this;
    });
    // ------------------------------------------
    // Getter and setter
    h(this, "sign", () => s(this, w) * s(this, b) >= 0 ? 1 : -1);
    h(this, "sqrt", () => this.root(2));
    h(this, "subtract", (e) => e instanceof C ? this.add(e.clone().opposite()) : this.add(-e));
    h(this, "zero", () => (a(this, w, 0), a(this, b, 1), this));
    return e !== void 0 && this.parse(e, t), this;
  }
  get denominator() {
    return s(this, b);
  }
  set denominator(e) {
    a(this, b, e);
  }
  get dfrac() {
    return a(this, $e, "dfrac"), this;
  }
  get display() {
    return this.isExact() ? s(this, b) === 1 ? `${s(this, w)}` : `${s(this, w)}/${s(this, b)}` : this.value.toFixed(3);
  }
  get frac() {
    return a(this, $e, "frac"), this;
  }
  // ------------------------------------------
  get numerator() {
    return s(this, w);
  }
  set numerator(e) {
    a(this, w, e);
  }
  // Display getter
  get tex() {
    return this.isInfinity() ? `${this.sign() === 1 ? "+" : "-"}\\infty` : this.isExact() ? s(this, b) === 1 ? `${s(this, w)}` : s(this, w) < 0 ? `-\\${s(this, $e)}{ ${-s(this, w)} }{ ${s(this, b)} }` : `\\${s(this, $e)}{ ${s(this, w)} }{ ${s(this, b)} }` : this.value.toFixed(3);
  }
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get tfrac() {
    return a(this, $e, "tfrac"), this;
  }
  get value() {
    const e = s(this, w) / s(this, b);
    return e === 0 ? 0 : e;
  }
  // #endregion Getters And Setters (11)
};
it = new WeakMap(), b = new WeakMap(), w = new WeakMap(), $e = new WeakMap(), h(C, "average", (...e) => {
  const t = new C().zero();
  for (const i of e)
    t.add(i);
  return t.divide(e.length), t;
}), h(C, "max", (...e) => {
  let t = new C(e[0]);
  for (const i of e) {
    const r = new C(i);
    r.isGreater(t) && (t = r.clone());
  }
  return t;
}), h(C, "min", (...e) => {
  let t = new C(e[0]);
  for (const i of e) {
    const r = new C(i);
    r.isLesser(t) && (t = r.clone());
  }
  return t;
}), h(C, "sort", (e, t) => {
  const r = e.map((n) => n instanceof C ? n : new C(n)).sort((n, l) => n.value - l.value);
  return t && r.reverse(), r;
}), // ------------------------------------------
// Compare functions
h(C, "unique", (e) => {
  const t = {}, i = [];
  return e.forEach((r) => {
    r instanceof C || (r = new C(r)), t[r.clone().reduce().tex] || (i.push(r.clone()), t[r.tex] = !0);
  }), i;
}), h(C, "xMultiply", (...e) => {
  const t = new C();
  for (const i of e) {
    const r = new C(i);
    t.numerator = t.numerator * r.numerator, t.denominator = t.denominator * r.denominator;
  }
  return t;
});
let u = C;
var Z, ee, ie, je;
class ut {
  constructor(...e) {
    m(this, Z);
    m(this, ee);
    m(this, ie);
    m(this, je);
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    h(this, "parse", (e, t, i) => (a(this, ie, i ?? 1), a(this, ee, t ?? 2), a(this, Z, e), s(this, ee) % 2 === 0 && s(this, Z) < 0 && a(this, je, !1), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    h(this, "reduce", () => {
      let e = Math.floor(Math.pow(s(this, Z), 1 / s(this, ee)));
      for (; e > 1; ) {
        if (s(this, Z) % Math.pow(e, s(this, ee)) === 0) {
          a(this, ie, s(this, ie) * e), a(this, Z, s(this, Z) / Math.pow(e, s(this, ee))), e = Math.floor(Math.pow(s(this, Z), 1 / s(this, ee)));
          continue;
        }
        e--;
      }
      return this;
    });
    h(this, "multiply", (e) => (a(this, Z, s(this, Z) * e.radical), this.reduce()));
    // ------------------------------------------
    // Help functions
    // ------------------------------------------
    h(this, "hasRadical", () => !(s(this, Z) === 1 || s(this, Z) === 0 || !s(this, je)));
    a(this, Z, 1), a(this, ie, 1), a(this, ee, 2), a(this, je, !0), e.length > 0 && this.parse(e[0], e[1], e[2]);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get radical() {
    return s(this, Z);
  }
  set radical(e) {
    a(this, Z, e);
  }
  get nth() {
    return s(this, ee);
  }
  set nth(e) {
    Number.isSafeInteger(e) && e >= 2 ? a(this, ee, e) : (console.log("Error setting the nth root"), a(this, ee, 2));
  }
  get coefficient() {
    return s(this, ie);
  }
  set coefficient(e) {
    a(this, ie, e);
  }
  get tex() {
    let e;
    return s(this, ie) === 1 ? e = "" : s(this, ie) === -1 ? e = "-" : e = s(this, ie).toString(), s(this, Z) === 1 ? `${s(this, ie)}` : s(this, ee) === 2 ? `${e}\\sqrt{${s(this, Z)}}` : `${e}\\sqrt[${s(this, ee)}]{${s(this, Z)}}`;
  }
  get display() {
    let e;
    return s(this, ie) === 1 ? e = "" : s(this, ie) === -1 ? e = "-" : e = s(this, ie).toString(), s(this, Z) === 1 ? `${s(this, ie)}` : s(this, ee) === 2 ? `${e}sqrt{${s(this, Z)}}` : `${e}root(${s(this, ee)}){${s(this, Z)}}`;
  }
  get value() {
    return s(this, ie) * Math.pow(s(this, Z), 1 / s(this, ee));
  }
}
Z = new WeakMap(), ee = new WeakMap(), ie = new WeakMap(), je = new WeakMap();
var Bi = Object.defineProperty, li = (o) => {
  throw TypeError(o);
}, Ri = (o, e, t) => e in o ? Bi(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, Ut = (o, e, t) => Ri(o, typeof e != "symbol" ? e + "" : e, t), ci = (o, e, t) => e.has(o) || li("Cannot " + t), _ = (o, e, t) => (ci(o, e, "read from private field"), t ? t.call(o) : e.get(o)), Je = (o, e, t) => e.has(o) ? li("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), we = (o, e, t, i) => (ci(o, e, "write to private field"), e.set(o, t), t);
const ii = {
  pi: Math.PI,
  e: Math.exp(1)
};
var p = /* @__PURE__ */ ((o) => (o.VARIABLE = "variable", o.COEFFICIENT = "coefficient", o.OPERATION = "operation", o.CONSTANT = "constant", o.FUNCTION = "function", o.FUNCTION_ARGUMENT = "function-argument", o.MONOM = "monom", o.LEFT_PARENTHESIS = "(", o.RIGHT_PARENTHESIS = ")", o))(p || {}), Re = /* @__PURE__ */ ((o) => (o.EXPRESSION = "expression", o.POLYNOM = "polynom", o.SET = "set", o.NUMERIC = "numeric", o))(Re || {});
function zi(o, e) {
  if (o.length <= 1)
    return o;
  const t = Object.keys(e).filter((E) => e[E].type === p.FUNCTION).map((E) => E);
  t.sort((E, L) => L.length - E.length);
  const i = new RegExp(`^(${t.join("|")})\\(`), r = Object.keys(ii);
  r.sort((E, L) => L.length - E.length);
  const n = new RegExp(`^(${r.join("|")})`), l = /^(\d+(\.\d+)?)/;
  let c = "", d, f, g;
  for (; o.length > 0; ) {
    if (d = f, g = void 0, t.length > 0 && i.exec(o)) {
      const E = t.find((L) => o.startsWith(L));
      E && (g = E + "(", o = o.slice(E.length + 1), f = p.FUNCTION);
    } else if (r.length > 0 && n.exec(o)) {
      const E = r.find((L) => o.startsWith(L));
      E && (g = E, o = o.slice(E.length), f = p.CONSTANT);
    } else if (l.exec(o)) {
      const E = l.exec(o);
      E && (g = E[0], o = o.slice(E[0].length), f = p.COEFFICIENT);
    } else
      switch (g = o[0], o = o.slice(1), g) {
        case "(":
          f = p.LEFT_PARENTHESIS;
          break;
        case ")":
          f = p.RIGHT_PARENTHESIS;
          break;
        case ",":
          f = p.FUNCTION_ARGUMENT;
          break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
          f = p.OPERATION;
          break;
        default:
          f = p.VARIABLE;
      }
    if (g === void 0 || f === void 0)
      throw new Error("The token is undefined");
    c += Li(d, f), c += g;
  }
  return c;
}
function Li(o, e) {
  return o === void 0 || o === p.OPERATION || e === p.OPERATION || o === p.LEFT_PARENTHESIS || o === p.FUNCTION || o === p.FUNCTION_ARGUMENT || e === p.RIGHT_PARENTHESIS || e === p.FUNCTION_ARGUMENT ? "" : "*";
}
const Di = {
  "^": { precedence: 4, associative: "right", type: p.OPERATION },
  "*": { precedence: 3, associative: "left", type: p.OPERATION },
  "/": { precedence: 3, associative: "left", type: p.OPERATION },
  "+": { precedence: 2, associative: "left", type: p.OPERATION },
  "-": { precedence: 2, associative: "left", type: p.OPERATION }
}, Vi = {
  "^": { precedence: 4, associative: "right", type: p.OPERATION },
  "*": { precedence: 3, associative: "left", type: p.OPERATION },
  "/": { precedence: 3, associative: "left", type: p.OPERATION },
  "+": { precedence: 2, associative: "left", type: p.OPERATION },
  "-": { precedence: 2, associative: "left", type: p.OPERATION },
  "%": { precedence: 3, associative: "right", type: p.OPERATION },
  sin: { precedence: 4, associative: "right", type: p.FUNCTION },
  cos: { precedence: 4, associative: "right", type: p.FUNCTION },
  tan: { precedence: 4, associative: "right", type: p.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: p.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: p.FUNCTION },
  ",": { precedence: 2, associative: "left", type: p.FUNCTION_ARGUMENT }
}, Zi = {
  "^": { precedence: 4, associative: "right", type: p.OPERATION },
  "*": { precedence: 3, associative: "left", type: p.OPERATION },
  "/": { precedence: 3, associative: "left", type: p.OPERATION },
  "+": { precedence: 2, associative: "left", type: p.OPERATION },
  "-": { precedence: 2, associative: "left", type: p.OPERATION },
  "%": { precedence: 3, associative: "right", type: p.OPERATION },
  sin: { precedence: 4, associative: "right", type: p.FUNCTION },
  cos: { precedence: 4, associative: "right", type: p.FUNCTION },
  tan: { precedence: 4, associative: "right", type: p.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: p.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: p.FUNCTION },
  ln: { precedence: 4, associative: "right", type: p.FUNCTION },
  log: { precedence: 4, associative: "right", type: p.FUNCTION }
}, Fi = {
  "&": { precedence: 3, associative: "left", type: p.OPERATION },
  "|": { precedence: 3, associative: "left", type: p.OPERATION },
  "!": { precedence: 4, associative: "right", type: p.OPERATION },
  "-": { precedence: 2, associative: "left", type: p.OPERATION }
};
var Ve, _e, te, ft, Se;
class Zt {
  constructor(e) {
    Je(this, Ve), Je(this, _e, []), Je(this, te, {}), Je(this, ft, []), Je(this, Se), we(this, Ve, typeof e > "u" ? Re.POLYNOM : e), this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return _(this, _e);
  }
  get rpnToken() {
    return _(this, _e).map((e) => e.token);
  }
  tokenConfigInitialization() {
    return _(this, Ve) === Re.SET ? (we(this, te, Fi), we(this, Se, !1)) : _(this, Ve) === Re.NUMERIC ? (we(this, te, Zi), we(this, Se, !0)) : _(this, Ve) === Re.EXPRESSION ? (we(this, te, Vi), we(this, Se, !0)) : (we(this, te, Di), we(this, Se, !0)), we(this, ft, Object.keys(_(this, te)).sort((e, t) => t.length - e.length)), _(this, te);
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(e, t) {
    let i, r;
    if (i = "", r = void 0, e[t] === "(")
      i = "(", r = p.LEFT_PARENTHESIS;
    else if (e[t] === ")")
      i = ")", r = p.RIGHT_PARENTHESIS;
    else if (e[t] === ",")
      i = ",", r = p.FUNCTION_ARGUMENT;
    else {
      for (const n of _(this, ft))
        if (e.substring(t, t + n.length) === n) {
          i += n, r = _(this, te)[n].type;
          break;
        }
      for (const n in ii)
        if (e.substring(t, t + n.length) === n) {
          i += n, r = p.CONSTANT;
          break;
        }
      if (i === "")
        if (/[0-9.]/.exec(e[t])) {
          const n = /^([0-9.]+)/.exec(e.substring(t));
          i = n ? n[0] : "", r = p.COEFFICIENT;
        } else if (/[a-zA-Z]/.exec(e[t])) {
          const n = /^([a-zA-Z])/.exec(e.substring(t));
          i = n ? n[0] : "", r = p.VARIABLE;
        } else
          console.log("Unidentified token", e[t], e, t), i = e[t], r = p.MONOM;
    }
    if (r === void 0)
      throw new Error(`Token type is undefined for token ${i}`);
    return [i, t + i.length, r];
  }
  /**
   * Parse an expression using the shutting yard tree algorithms
   * @param expr (string) Expression to analyse
   * Returns a RPN list of items.
   * @param uniformize
   */
  parse(e, t) {
    const i = [], r = [];
    let n = "", l = 0, c;
    (t ?? _(this, Se)) && (e = zi(e, _(this, te)));
    const d = 50;
    let f = 50, g;
    for (; l < e.length; ) {
      if (f--, f === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([n, l, c] = this.NextToken(e, l), c) {
        case p.MONOM:
        case p.COEFFICIENT:
        case p.VARIABLE:
        case p.CONSTANT:
          i.push({
            token: n,
            tokenType: c
          });
          break;
        case p.OPERATION:
          if (r.length > 0) {
            let E = r[r.length - 1];
            for (g = +d; E.token in _(this, te) && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (_(this, te)[n].associative === "left" && _(this, te)[n].precedence <= _(this, te)[E.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            _(this, te)[n].associative === "right" && _(this, te)[n].precedence < _(this, te)[E.token].precedence); ) {
              if (g--, g === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (i.push(r.pop() ?? { token: "", tokenType: p.OPERATION }), r.length === 0)
                break;
              E = r[r.length - 1];
            }
          }
          r.push({ token: n, tokenType: c });
          break;
        case p.FUNCTION_ARGUMENT:
          for (g = +d; r[r.length - 1].token !== "(" && r.length > 0; ) {
            if (g--, g === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            i.push(r.pop() ?? { token: n, tokenType: c });
          }
          break;
        case p.LEFT_PARENTHESIS:
          r.push({ token: n, tokenType: c }), e[l] === "-" && i.push({ token: "0", tokenType: p.COEFFICIENT });
          break;
        case p.RIGHT_PARENTHESIS:
          for (g = +d; r[r.length - 1].token !== "(" && r.length > 1; ) {
            if (g--, g === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
              break;
            }
            i.push(r.pop() ?? { token: n, tokenType: c });
          }
          r.pop();
          break;
        case p.FUNCTION:
          r.push({ token: n, tokenType: c });
          break;
        default:
          throw new Error(`Token type ${n} is not handled`);
      }
    }
    return we(this, _e, i.concat(r.reverse())), this;
  }
}
Ve = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap();
class ji {
  constructor(e, t) {
    Ut(this, "_rpn"), Ut(this, "_expression"), Ut(this, "_isValid"), this._expression = e;
    try {
      this._rpn = new Zt(Re.NUMERIC).parse(e, t).rpn;
    } catch {
      throw this._rpn = null, this._isValid = !1, new Error(`There was a problem parsing: ${e}`);
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
      if (i.tokenType === p.COEFFICIENT)
        if (!isNaN(+i.token))
          t.push(+i.token);
        else {
          const r = i.token.split("/");
          if (r.length !== 2)
            throw this._isValid = !1, new Error("This coefficient is not a fraction");
          t.push(+r[0] / +r[1]);
        }
      else if (i.tokenType === p.VARIABLE && e !== void 0)
        Object.hasOwn(e, i.token) && t.push(+e[i.token]);
      else if (i.tokenType === p.CONSTANT)
        t.push(ii[i.token]);
      else if (i.tokenType === p.OPERATION) {
        if (i.token === "*") {
          const r = t.pop(), n = t.pop();
          if (n === void 0 || r === void 0)
            throw this._isValid = !1, new Error(`The multiplication factors ${n ?? "a"} or ${r ?? "b"} are not defined`);
          t.push(n * r);
        } else if (i.token === "/") {
          const r = t.pop(), n = t.pop();
          if (n === void 0 || r === void 0)
            throw this._isValid = !1, new Error(`The division values ${n ?? "a"} or ${r ?? "b"} are not defined`);
          t.push(n / r);
        } else if (i.token === "+") {
          const r = t.pop(), n = t.pop();
          if (n === void 0 || r === void 0)
            throw this._isValid = !1, new Error(`The addition values ${n ?? "a"} or ${r ?? "b"} are not defined`);
          t.push(+n + +r);
        } else if (i.token === "-") {
          const r = t.pop(), n = t.pop() ?? 0;
          if (r === void 0)
            throw this._isValid = !1, new Error("The subtraction value b is  not defined");
          t.push(n - r);
        } else if (i.token === "^") {
          const r = t.pop(), n = t.pop();
          if (n === void 0 || r === void 0)
            throw this._isValid = !1, new Error(`The base value ${n ?? "a"} or exponent ${r ?? "b"} are not defined`);
          t.push(Math.pow(n, r));
        }
      } else if (i.tokenType === p.FUNCTION) {
        const r = t.pop();
        if (r === void 0)
          throw this._isValid = !1, new Error(`The parameters for ${i.token} is not defined`);
        if (i.token === "sin")
          t.push(Math.sin(r));
        else if (i.token === "cos")
          t.push(Math.cos(r));
        else if (i.token === "tan")
          t.push(Math.tan(r));
        else if (i.token === "sqrt")
          t.push(Math.sqrt(r));
        else if (i.token === "nthrt") {
          const n = t.pop();
          if (n === void 0)
            throw this._isValid = !1, new Error("The nthrt function requires two parameters");
          r % 2 === 0 && n < 0 ? t.push(NaN) : t.push((n < 0 ? -1 : 1) * Math.pow(Math.abs(n), 1 / r));
        } else i.token === "ln" ? t.push(Math.log(r)) : i.token === "log" && t.push(Math.log10(r));
      }
    if (t.length === 1)
      return this._numberCorrection(t[0]);
    throw new Error(`There was a problem parsing: ${this._expression}`);
  }
  _numberCorrection(e, t = 8) {
    return +e.toFixed(t);
  }
}
var N, v, Ue, dt, Ie, vt, bt;
const $ = class $ {
  constructor(e) {
    m(this, Ue);
    m(this, N);
    m(this, v);
    /**
     * Clone the current Monom.
     */
    h(this, "clone", () => {
      const e = new $();
      e.coefficient = s(this, N).clone();
      for (const t in s(this, v))
        e.setLetter(t, s(this, v)[t].clone());
      return e;
    });
    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    h(this, "add", (...e) => {
      for (const t of e) {
        const i = t instanceof $ ? t : new $(t);
        this.isSameAs(i) ? (this.isZero() && A(this, Ue, dt).call(this, i), s(this, N).add(i.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", i.display);
      }
      return this;
    });
    h(this, "containsRationalPower", () => Object.values(s(this, v)).some((e) => e.isRational()));
    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    h(this, "degree", (e) => this.variables.length === 0 ? new u().zero() : e === void 0 ? Object.values(s(this, v)).reduce((t, i) => t.clone().add(i)) : this.hasVariable(e) ? s(this, v)[e].clone() : new u().zero());
    /**
     * Derivative the monom
     * @param letter
     */
    h(this, "derivative", (e) => {
      if (e === void 0 && (e = "x"), this.hasVariable(e)) {
        const t = s(this, v)[e].clone(), i = this.clone();
        return s(i, v)[e].subtract(1), s(i, N).multiply(new u(t.clone())), i;
      } else
        return new $().zero();
    });
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    h(this, "divide", (...e) => {
      for (const t of e) {
        const i = t instanceof $ ? t : new $(t);
        s(this, N).divide(i.coefficient);
        for (const r in i.literal)
          s(this, v)[r] = this.hasVariable(r) ? s(this, v)[r].subtract(i.literal[r]) : i.literal[r].clone().opposite(), s(this, v)[r].isZero() && this.removeVariable(r);
      }
      return this;
    });
    /**
     * Evaluate a monom. Each setLetter must be assigned to a Fraction.
     * @param values    Dictionary of <setLetter: Fraction>
     * @param asNumeric
     */
    h(this, "evaluate", (e, t) => {
      if (t === !0) {
        if (e instanceof u)
          return s(this, Ie).call(this, e.value);
        if (e instanceof ut)
          return new u().invalid();
        if (typeof e == "number")
          return s(this, Ie).call(this, e);
        if (typeof e == "object") {
          const r = {};
          for (const n in e)
            r[n] = new u(e[n]).value;
          return s(this, Ie).call(this, r);
        }
      }
      const i = this.coefficient.clone();
      if (typeof e == "number" || e instanceof u) {
        const r = {};
        return r[this.variables[0]] = new u(e), this.evaluate(r);
      }
      if (e instanceof ut)
        return new u().invalid();
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient;
        for (const r in s(this, v)) {
          const n = new u(e[r]);
          i.multiply(n.pow(s(this, v)[r]));
        }
      }
      return i;
    });
    // -------------------------------------
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    h(this, "hasVariable", (e) => Object.hasOwn(s(this, v), e ?? "x"));
    h(this, "inverse", () => {
      s(this, N).opposite();
      for (const e in s(this, v))
        s(this, v)[e].opposite();
      return this;
    });
    h(this, "isDivisible", (e) => {
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
    h(this, "isEqual", (e) => this.isSameAs(e) && s(this, N).isEqual(e.coefficient));
    h(this, "isLiteralSquare", () => {
      for (const e in this.literal)
        if (this.literal[e].isRational() || this.literal[e].isEven())
          return !1;
      return !0;
    });
    /**
     * Determine if the monom is one
     */
    h(this, "isOne", () => s(this, N).value === 1 && this.variables.length === 0);
    /**
     * Determine if two monoms are similar
     * @param M
     */
    h(this, "isSameAs", (e) => {
      const t = this.variables, i = e.variables, r = t.concat(i.filter((n) => !t.includes(n)));
      if (this.isZero() || e.isZero() || t.length === 0 && i.length === 0)
        return !0;
      if (t.length !== i.length)
        return !1;
      if (!this.isZero() && !e.isZero()) {
        for (const n of r)
          if (!this.hasVariable(n) || !e.hasVariable(n) || !s(this, v)[n].isEqual(e.literal[n]))
            return !1;
      }
      return !0;
    });
    h(this, "isSquare", () => this.coefficient.isSquare() ? this.isLiteralSquare() : !1);
    /**
     * Determine if the monom is null
     */
    h(this, "isZero", () => s(this, N).value === 0);
    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    h(this, "multiply", (...e) => {
      for (const t of e) {
        const i = t instanceof $ ? t : new $(t);
        s(this, N).multiply(i.coefficient);
        for (const r in i.literal)
          this.hasVariable(r) ? s(this, v)[r].add(i.literal[r]) : s(this, v)[r] = i.literal[r].clone();
      }
      return this;
    });
    /**
     * Create a one value monom
     */
    h(this, "one", () => (a(this, N, new u().one()), a(this, v, {}), this));
    /**
     * Get the opposite
     * Returns a monom.
     */
    h(this, "opposite", () => (s(this, N).opposite(), this));
    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    h(this, "pow", (e) => {
      s(this, N).pow(e);
      for (const t in s(this, v))
        s(this, v)[t].multiply(e);
      return this;
    });
    // #endregion Properties and methods (31)
    // #region Getters And Setters (11)
    h(this, "primitive", (e) => {
      e === void 0 && (e = "x");
      const t = this.clone();
      let i;
      return t.hasVariable(e) ? (i = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(i), t.setLetter(e, i)) : (t.coefficient.isZero() && (t.coefficient = new u().one()), t.setLetter(e, 1)), t;
    });
    h(this, "reduce", () => {
      this.coefficient.reduce();
      for (const e in s(this, v))
        s(this, v)[e].isZero() && this.removeVariable(e);
      return this;
    });
    /**
     * Get the nth-root of the monom
     */
    h(this, "root", () => {
      throw new Error("Method not implemented.");
    });
    /**
     * Set the power of a particular setLetter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the setLetter (must be positive integer.
     */
    h(this, "setLetter", (e, t) => t instanceof u ? (this.hasVariable(e) && t.isZero() && this.removeVariable(e), s(this, v)[e] = t.clone(), this) : this.setLetter(e, new u(t)));
    /**
     * Return the square root of a monom
     */
    h(this, "sqrt", () => {
      if (this.isSquare()) {
        s(this, N).sqrt();
        for (const e in s(this, v))
          s(this, v)[e].clone().divide(2);
      }
      return this;
    });
    /**
     * Subtract multiple monoms
     * @param M (Monom[]) The monoms to subtract
     */
    h(this, "subtract", (...e) => {
      for (const t of e) {
        const i = t instanceof $ ? t : new $(t);
        this.isSameAs(i) ? (this.isZero() && A(this, Ue, dt).call(this, i), s(this, N).add(i.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", i.display);
      }
      return this;
    });
    /**
     * Create a zero value monom
     */
    h(this, "zero", () => (a(this, N, new u().zero()), a(this, v, {}), this));
    m(this, Ie, (e) => {
      let t = this.coefficient.value;
      if (typeof e == "number") {
        const i = {}, r = this.variables[0];
        return i[r] = e, s(this, Ie).call(this, i);
      }
      if (e instanceof u) {
        const i = {};
        return i[this.variables[0]] = new u(e).value, s(this, Ie).call(this, i);
      }
      if (e instanceof ut)
        return NaN;
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient.value;
        for (const i in s(this, v)) {
          const r = e[i];
          r instanceof u ? t *= r.value ** s(this, v)[i].value : t *= r ** s(this, v)[i].value;
        }
      }
      return t;
    });
    m(this, vt, (e) => {
      const i = new Zt().parse(e).rpn, r = [];
      if (i.length === 0)
        return this.zero(), this;
      if (i.length === 1) {
        const n = i[0];
        return this.one(), n.tokenType === p.COEFFICIENT ? this.coefficient = new u(n.token) : n.tokenType === p.VARIABLE && this.setLetter(n.token, 1), this;
      } else
        for (const n of i)
          s(this, bt).call(this, r, n);
      return this.one(), this.multiply(r[0]), this;
    });
    m(this, bt, (e, t) => {
      var d;
      let i, r, n, l, c;
      if (t.tokenType === p.COEFFICIENT)
        e.push(new $(new u(t.token)));
      else if (t.tokenType === p.VARIABLE) {
        const f = new $().one();
        f.setLetter(t.token, 1), e.push(f.clone());
      } else if (t.tokenType === p.OPERATION)
        switch (t.token) {
          case "-":
            r = e.pop() ?? new $().zero(), i = e.pop() ?? new $().zero(), e.push(i.subtract(r));
            break;
          case "*":
            r = e.pop() ?? new $().one(), i = e.pop() ?? new $().one(), e.push(i.multiply(r));
            break;
          case "/":
            r = e.pop() ?? new $().one(), i = e.pop() ?? new $().one(), e.push(i.divide(r));
            break;
          case "^": {
            c = ((d = e.pop()) == null ? void 0 : d.coefficient) ?? new u().one(), n = e.pop() ?? new $().one(), l = n.variables[0], l && n.setLetter(l, c), e.push(n);
            break;
          }
        }
    });
    return a(this, N, new u().zero()), a(this, v, {}), e !== void 0 && this.parse(e), this;
  }
  // -----------------------------------------
  /**
   * Parse a string to a monom. The string may include fraction.
   * @param inputStr
   */
  parse(e) {
    return a(this, N, new u()), a(this, v, {}), typeof e == "string" ? s(this, vt).call(this, e) : typeof e == "number" ? a(this, N, new u(e)) : e instanceof u ? a(this, N, e.clone()) : e instanceof $ && (a(this, N, s(e, N).clone()), A(this, Ue, dt).call(this, e)), this;
  }
  /**
   * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
   * @returns {Fraction}
   */
  get coefficient() {
    return s(this, N);
  }
  /**
   * Set the coefficient \\(k\\) value of the monom
   * @param {Fraction | number | string} F
   */
  set coefficient(e) {
    a(this, N, new u(e));
  }
  // Display getter
  /**
   * This display getter is to be used in the polynom display getter
   */
  get display() {
    let e = "";
    const t = Object.keys(s(this, v)).sort();
    for (const i of t)
      s(this, v)[i].isNotZero() && (e += i, s(this, v)[i].isNotEqual(1) && (e += `^(${s(this, v)[i].display})`));
    return e === "" ? s(this, N).value != 0 ? s(this, N).display : "" : s(this, N).value === 1 ? e : s(this, N).value === -1 ? `-${e}` : s(this, N).value === 0 ? "0" : `${s(this, N).display}${e}`;
  }
  get dividers() {
    if (!this.coefficient.isRelative())
      return [this.clone()];
    if (this.containsRationalPower())
      return [this.clone()];
    if (this.coefficient.numerator > 1e6)
      return [this.clone()];
    const e = G.dividers(Math.abs(this.coefficient.numerator));
    let t = [];
    for (const r in this.literal)
      t = this._getLiteralDividers(t, r);
    const i = [];
    if (t.length > 0 && e.length > 0)
      for (const r of e)
        for (const n of t) {
          const l = new $();
          l.coefficient = new u(r), l.literal = n, i.push(l);
        }
    else if (e.length === 0)
      for (const r of t) {
        const n = new $();
        n.coefficient = new u().one(), n.literal = r, i.push(n);
      }
    else
      for (const r of e) {
        const n = new $();
        n.coefficient = new u(r), i.push(n);
      }
    return i.length === 0 ? [new $().one()] : i;
  }
  integrate(e, t, i) {
    const r = this.primitive(i);
    return r.evaluate(t).subtract(r.evaluate(e));
  }
  /**
   * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
   * @returns {literalType}
   */
  get literal() {
    return s(this, v);
  }
  /**
   * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
   * @param {literalType<Fraction>} L
   */
  set literal(e) {
    a(this, v, e);
  }
  /**
   * Get the literal square roots of the Monom.
   * TODO: remove this getter ? Is it used and is it correct ?
   * @returns {literalType<Fraction>}
   */
  get literalSqrt() {
    if (this.isLiteralSquare()) {
      const e = {};
      for (const t in s(this, v))
        e[t] = s(this, v)[t].clone().sqrt();
      return e;
    } else
      return s(this, v);
  }
  /**
   * Set the literal part of the monom from a string
   * @param inputStr  String like x^2y^3
   */
  set literalStr(e) {
    for (const t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)])
      t[1] in s(this, v) || (s(this, v)[t[1]] = new u().zero()), s(this, v)[t[1]].add(+t[2]);
    for (const t of [...e.matchAll(/([a-z](?!\^))/g)])
      t[1] in s(this, v) || (s(this, v)[t[1]] = new u().zero()), s(this, v)[t[1]].add(1);
  }
  get plotFunction() {
    let e = "";
    const t = Object.keys(s(this, v)).sort();
    for (const i of t)
      s(this, v)[i].isNotZero() && (e += (e === "" ? "" : "*") + i, s(this, v)[i].isNotEqual(1) && (e += `^(${s(this, v)[i].display})`));
    return e === "" ? s(this, N).value != 0 ? s(this, N).display : "" : s(this, N).value === 1 ? e : s(this, N).value === -1 ? `-${e}` : s(this, N).value === 0 ? "0" : `${s(this, N).display}*${e}`;
  }
  removeVariable(e) {
    delete s(this, v)[e];
  }
  /**
   * Get the tex output of the monom
   */
  get tex() {
    let e = "";
    const t = Object.keys(s(this, v)).sort();
    for (const i of t)
      s(this, v)[i].isNotZero() && (e += i, s(this, v)[i].isNotEqual(1) && (e += `^{ ${s(this, v)[i].tfrac.tex} }`));
    return e === "" ? s(this, N).value != 0 ? s(this, N).frac.tex : "0" : s(this, N).value === 1 ? e : s(this, N).value === -1 ? `-${e}` : s(this, N).value === 0 ? "0" : `${s(this, N).frac.tex}${e}`;
  }
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
  _getLiteralDividers(e, t) {
    const i = [];
    for (let r = 0; r <= this.literal[t].value; r++)
      if (e.length === 0) {
        const n = {};
        n[t] = new u(r), i.push(n);
      } else
        for (const n of e) {
          const l = {};
          for (const c in n)
            l[c] = n[c];
          l[t] = new u(r), i.push(l);
        }
    return i;
  }
  // #endregion Private methods (5)
};
N = new WeakMap(), v = new WeakMap(), Ue = new WeakSet(), dt = function(e) {
  for (const t in e.literal)
    s(this, v)[t] = e.literal[t].clone();
}, Ie = new WeakMap(), vt = new WeakMap(), bt = new WeakMap(), h($, "gcd", (...e) => {
  for (const n of e)
    if (n.containsRationalPower())
      return new $().zero();
  const t = new $(), i = G.gcd(...e.map((n) => n.coefficient.numerator)), r = G.lcm(...e.map((n) => n.coefficient.denominator));
  t.coefficient = new u(i, r).reduce();
  for (const n of e) {
    for (const l in t.literal)
      l in n.literal || t.literal[l].zero();
    for (const l in n.literal)
      !t.hasVariable(l) && n.literal[l].isStrictlyPositive() ? t.literal[l] = n.literal[l].clone() : t.literal[l] = new u(Math.min(n.literal[l].value, t.literal[l].value));
  }
  return t;
}), /**
 * Multiply two monoms and return a NEW monom.
 * @param monoms
 */
h($, "xMultiply", (...e) => {
  const t = new $().one();
  for (const i of e)
    t.multiply(i);
  return t;
});
let M = $;
var ce, ze, I, et, ge, ui, Wt, fi, di, pi;
const ri = class ri {
  constructor(e, t, i = "x") {
    m(this, I);
    m(this, ce);
    m(this, ze);
    if (a(this, ze, i), Object.hasOwn(e, "moveLeft")) {
      const r = e;
      a(this, ce, r.left.clone().subtract(r.right));
    } else
      a(this, ce, e.clone().subtract(t ?? 0));
  }
  solve() {
    if (s(this, ce).degree().isOne())
      return A(this, I, fi).call(this);
    if (s(this, ce).degree().value === 2)
      return A(this, I, di).call(this);
    const e = A(this, I, ui).call(this);
    if (e.length > 0)
      return e;
    if (s(this, ce).degree().value === 3)
      return A(this, I, Wt).call(this);
    throw new Error("The equation degree is too high.");
  }
  solveAsCardan() {
    if (s(this, ce).degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return A(this, I, Wt).call(this);
  }
};
ce = new WeakMap(), ze = new WeakMap(), I = new WeakSet(), et = function(e, t) {
  return {
    variable: s(this, ze),
    exact: !1,
    value: +e.toFixed(10),
    tex: (t == null ? void 0 : t.tex) ?? "",
    display: (t == null ? void 0 : t.display) ?? ""
  };
}, ge = function(e) {
  if (e instanceof u && e.isApproximative())
    return A(this, I, et).call(this, e.value);
  const t = new u(e);
  return {
    variable: s(this, ze),
    exact: t,
    value: t.value,
    tex: t.tex,
    display: t.display
  };
}, ui = function() {
  let e = s(this, ce).clone(), t = [];
  const i = e.lcmDenominator();
  i !== 1 && e.multiply(i);
  const r = e.monomByDegree().coefficient;
  let n = e.monomByDegree(0).coefficient;
  for (; n.isZero(); )
    t.length === 0 && t.push(A(this, I, ge).call(this, 0)), e = e.divide("x"), n = e.monomByDegree(0).coefficient;
  const l = G.dividers(r.value), c = G.dividers(n.value);
  for (const f of l)
    for (const g of c) {
      const E = new u(g, f);
      e.evaluate(E).isZero() && !t.find((L) => L.value === E.value) && t.push(A(this, I, ge).call(this, E)), E.opposite(), e.evaluate(E).isZero() && !t.find((L) => L.value === E.value) && t.push(A(this, I, ge).call(this, E));
    }
  for (const f of t) {
    if (f.exact !== !1 && f.exact.isZero())
      continue;
    const g = s(this, ce).clone().parse("x", f.exact.denominator, -f.exact.numerator);
    for (; e.isDividableBy(g); )
      e = e.divide(g);
  }
  if (e.degree().isZero())
    return t.sort((f, g) => f.value - g.value);
  if (e.degree().value > 3)
    return [];
  const d = new ri(e, e.clone().parse("0"), s(this, ze));
  return t = t.concat(d.solve()), t.sort((f, g) => f.value - g.value);
}, Wt = function() {
  const e = s(this, ce), t = e.monomByDegree(3).coefficient, i = e.monomByDegree(2).coefficient, r = e.monomByDegree(1).coefficient, n = e.monomByDegree(0).coefficient, l = i.clone().divide(t), c = r.clone().divide(t), d = n.clone().divide(t), f = c.clone().subtract(l.clone().pow(2).divide(3)), g = d.clone().subtract(l.clone().multiply(c).divide(3)).add(l.clone().pow(3).multiply(2).divide(27)), E = g.clone().opposite(), L = f.clone().opposite().pow(3).divide(27), fe = E.clone().pow(2).subtract(L.clone().multiply(4)).opposite();
  if (fe.isNegative()) {
    const he = g.clone().opposite().add(fe.clone().opposite().sqrt()).divide(2).root(3), ae = g.clone().opposite().subtract(fe.clone().opposite().sqrt()).divide(2).root(3), me = he.clone().add(ae).subtract(l.clone().divide(3));
    return [A(this, I, ge).call(this, me)];
  }
  if (fe.isZero()) {
    const he = g.clone().opposite().divide(2).root(3), ae = he.clone().opposite().subtract(l.clone().divide(3)), me = he.clone().multiply(2).subtract(l.clone().divide(3));
    return ae.isEqual(me) ? [A(this, I, ge).call(this, ae)] : [
      A(this, I, ge).call(this, me),
      A(this, I, ge).call(this, ae)
    ].sort((de, le) => de.value - le.value);
  }
  if (fe.isPositive()) {
    const he = [], ae = f.value, me = g.value, de = l.value;
    for (let le = 0; le < 3; le++)
      he.push(2 * Math.sqrt(-ae / 3) * Math.cos(Math.acos(3 * me / (2 * ae) * Math.sqrt(-3 / ae)) / 3 + 2 * Math.PI * le / 3) - de / 3);
    return he.map((le) => A(this, I, et).call(this, le)).sort((le, Ke) => le.value - Ke.value);
  }
  return [];
}, fi = function() {
  const e = s(this, ce).monomByDegree(0).coefficient.clone().opposite().divide(s(this, ce).monomByDegree(1).coefficient);
  return [
    A(this, I, ge).call(this, e)
  ];
}, di = function() {
  const e = s(this, ce), t = e.monomByDegree(2).coefficient, i = e.monomByDegree(1).coefficient, r = e.monomByDegree(0).coefficient, n = i.clone().pow(2).subtract(t.clone().multiply(r).multiply(4));
  if (n.isNegative())
    return [];
  if (n.isSquare()) {
    const l = n.sqrt(), c = i.clone().opposite().add(l).divide(t.clone().multiply(2)), d = i.clone().opposite().subtract(l).divide(t.clone().multiply(2));
    return l.isZero() ? [A(this, I, ge).call(this, c)] : [
      A(this, I, ge).call(this, c),
      A(this, I, ge).call(this, d)
    ].sort((f, g) => f.value - g.value);
  }
  return A(this, I, pi).call(this, t, i, n);
}, pi = function(e, t, i) {
  const r = G.dividers(i.value).filter((de) => Math.sqrt(de) % 1 === 0).map((de) => Math.sqrt(de)).pop() ?? 1, n = G.gcd(2 * e.value, t.value, r) * (e.isNegative() ? -1 : 1), l = t.clone().divide(n).opposite(), c = e.clone().divide(n).multiply(2), d = i.clone().divide(r ** 2), f = Math.abs(r / n), g = r === 1 ? "-" : `-${f} `, E = r === 1 ? "+" : `+${f} `;
  function L(de, le, Ke, Ft) {
    return `\\frac{ ${le} ${Ke}\\sqrt{ ${Ft} } }{ ${de} }`;
  }
  function fe(de, le, Ke, Ft) {
    return `(${le}${Ke}sqrt(${Ft}))/${de}`;
  }
  const he = i.value ** 0.5, ae = (-t.value - he) / (2 * e.value), me = (-t.value + he) / (2 * e.value);
  return [
    A(this, I, et).call(this, ae, {
      tex: L(c.tex, l.tex, g.toString(), d.tex),
      display: fe(c.display, l.display, g.toString(), d.display)
    }),
    A(this, I, et).call(this, me, {
      tex: L(c.tex, l.tex, E.toString(), d.tex),
      display: fe(c.display, l.display, E.toString(), d.display)
    })
  ].sort((de, le) => de.value - le.value);
};
let mt = ri;
function hi(o, e = !0) {
  return e ? `\\left( ${o} \\right)` : `(${o})`;
}
function Ce(o, e, t, i, r) {
  return o.map((n, l) => i !== void 0 && l < i || r !== void 0 && l > r ? n : n === e ? t : n);
}
var Le, y, Ge, st, We, rt, xt, Et, Nt, He, Tt, nt, Ot, At, qt, ot, mi, Mt, kt, Ui;
const k = class k {
  constructor(e, ...t) {
    m(this, ot);
    // #region Class fields (8)
    m(this, Le);
    m(this, y);
    m(this, Ge);
    m(this, st, !1);
    // #endregion Constructors (7)
    // #region Properties and methods (49)
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values
     */
    h(this, "parse", (e, ...t) => {
      if (a(this, y, []), a(this, Le, []), typeof e == "string")
        return A(this, ot, mi).call(this, e, ...t);
      if ((typeof e == "number" || e instanceof u || e instanceof M) && t.length === 0)
        s(this, y).push(new M(e));
      else if (e instanceof M && t.length > 0)
        s(this, y).push(new M(e)), t.forEach((i) => {
          s(this, y).push(new M(i));
        });
      else if (e instanceof k)
        for (const i of e.monoms)
          s(this, y).push(i.clone());
      return this;
    });
    /**
     * Clone the polynom
     */
    h(this, "clone", () => {
      const e = new k(), t = [];
      for (const i of s(this, y))
        t.push(i.clone());
      return e.monoms = t, e;
    });
    h(this, "add", (...e) => {
      for (const t of e)
        t instanceof k ? a(this, y, s(this, y).concat(t.monoms)) : t instanceof M ? s(this, y).push(t.clone()) : typeof t == "number" && Number.isSafeInteger(t) ? s(this, y).push(new M(t.toString())) : s(this, y).push(new M(t));
      return this.reduce();
    });
    h(this, "commonMonom", () => {
      const e = new M().one(), t = this.gcdNumerator(), i = this.gcdDenominator(), r = this.degree();
      e.coefficient = new u(t, i);
      for (const n of this.variables) {
        e.setLetter(n, r);
        for (const l of s(this, y))
          if (e.setLetter(n, u.min(l.degree(n), e.degree(n))), e.degree(n).isZero())
            break;
      }
      return e;
    });
    h(this, "degree", (e) => {
      let t = new u().zero();
      for (const i of s(this, y))
        t = u.max(i.degree(e).value, t);
      return t;
    });
    h(this, "derivative", (e) => {
      const t = new k();
      for (const i of s(this, y))
        t.add(i.derivative(e));
      return t;
    });
    h(this, "divide", (e) => {
      if (e instanceof u)
        return s(this, rt).call(this, e);
      if (typeof e == "number" && Number.isSafeInteger(e))
        return s(this, xt).call(this, e);
      if (e instanceof M)
        return this.divide(new k(e));
      if (e instanceof k) {
        if (e.monoms.length === 1 && e.variables.length === 0)
          return s(this, rt).call(this, e.monoms[0].coefficient);
        {
          const { quotient: t, reminder: i } = this.euclidean(e);
          if (i.isZero())
            return a(this, y, t.monoms), this;
        }
      } else if (typeof e == "string")
        return this.divide(new k(e));
      throw new Error(`Cannot divide by ${e}`);
    });
    h(this, "empty", () => (a(this, y, []), this));
    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    h(this, "euclidean", (e) => {
      const t = e.variables[0], i = new k().zero(), r = this.clone().reorder(t);
      if (e.variables.length === 0)
        return {
          quotient: this.clone().divide(e).reduce(),
          reminder: new k().zero()
        };
      const n = e.monomByDegree(void 0, t), l = e.degree(t);
      let c, d = this.degree(t).value * 2;
      for (; r.degree(t).isGeq(l) && d > 0 && (d--, c = r.monomByDegree(void 0, t).clone().divide(n), !(!c.isZero() && (i.add(c), r.subtract(e.clone().multiply(c)).reduce(), c.degree(t).isZero()))); )
        ;
      return i.reduce(), r.reduce(), { quotient: i, reminder: r };
    });
    h(this, "evaluate", (e, t) => {
      if (t)
        return s(this, Et).call(this, e);
      const i = new u().zero();
      return s(this, y).forEach((r) => {
        i.add(r.evaluate(e, t));
      }), i;
    });
    // -------------------------------------
    /**
     * Factorize a polynom and store the best results in factors.
     * @param letter
     */
    h(this, "factorize", (e) => {
      let t = [], i = this.clone().reorder();
      const r = i.commonMonom();
      if (i.monomByDegree().coefficient.isStrictlyNegative() && r.coefficient.isStrictlyPositive() && !r.isOne() && r.opposite(), !r.isOne()) {
        const c = new k(r);
        t = [c.clone()], i = i.euclidean(c).quotient;
      }
      let n = i.degree().clone().multiply(2).value, l = 1;
      for (; n >= 0; )
        if (n--, i.monoms.length < 2) {
          i.isOne() || (t.push(i.clone()), i.one());
          break;
        } else if (i.degree(e).isOne()) {
          t.push(i.clone()), i.one();
          break;
        } else {
          let c = s(this, Tt).call(this, i, l, e ?? "x");
          for (l = i.degree(e).value; c.length > 0; ) {
            const d = c[0];
            if (!i.isDividableBy(d))
              c.shift();
            else {
              const f = i.euclidean(d);
              t.push(d), i = f.quotient.clone(), c = c.filter((g) => {
                const E = i.monoms[0], L = i.monoms[i.monoms.length - 1], fe = g.monoms[0], he = g.monoms[g.monoms.length - 1];
                return L.isDivisible(he) ? E.isDivisible(fe) : !1;
              });
            }
          }
        }
      return i.isOne() || t.push(i.clone()), a(this, Le, t), s(this, Le);
    });
    h(this, "gcdDenominator", () => G.gcd(...this.getDenominators()));
    h(this, "gcdNumerator", () => G.gcd(...this.getNumerators()));
    // Next functions are used for for commonMonom, which is used in the factorize method.
    h(this, "getDenominators", () => {
      const e = [];
      for (const t of s(this, y))
        e.push(t.coefficient.denominator);
      return e;
    });
    h(this, "getNumerators", () => {
      const e = [];
      for (const t of s(this, y))
        e.push(t.coefficient.numerator);
      return e;
    });
    h(this, "getZeroes", () => this.degree().isZero() ? [] : (this.roots = new mt(this.clone()).solve(), this.roots));
    h(this, "integrate", (e, t, i = "x") => {
      const r = this.primitive(i), n = {}, l = {};
      return n[i] = new u(e), l[i] = new u(t), r.evaluate(l).subtract(r.evaluate(n));
    });
    h(this, "isDeveloped", (e) => {
      let t;
      const i = e.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
      if (i.includes("(") || i.includes(")"))
        return !1;
      try {
        t = new k(e);
      } catch {
        return !1;
      }
      return !!this.isEqual(t);
    });
    h(this, "isDividableBy", (e) => {
      if (e.degree().isOne()) {
        const t = e.getZeroes()[0];
        return t.exact instanceof u ? this.evaluate(t.exact).isZero() : !1;
      } else {
        const { reminder: t } = this.euclidean(e);
        return t.isZero();
      }
    });
    h(this, "isEqual", (e) => s(this, We).call(this, e, "="));
    h(this, "isOppositeAt", (e) => s(this, We).call(this, e.clone().opposite(), "="));
    h(this, "isReduced", (e) => {
      if (!this.isDeveloped(e))
        return !1;
      const t = new k(e);
      if (t.monoms.length > this.monoms.length)
        return !1;
      for (const i of t.monoms)
        if (!i.coefficient.isReduced())
          return !1;
      return !1;
    });
    h(this, "isSameAs", (e) => s(this, We).call(this, e, "same"));
    h(this, "lcmDenominator", () => G.lcm(...this.getDenominators()));
    h(this, "lcmNumerator", () => G.lcm(...this.getNumerators()));
    h(this, "letters", () => {
      let e = /* @__PURE__ */ new Set();
      for (const t of s(this, y))
        e = /* @__PURE__ */ new Set([...e, ...t.variables]);
      return [...e];
    });
    h(this, "limitToInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), i = t.coefficient.sign(), r = t.degree(e);
      return r.isStrictlyPositive() ? i === 1 ? new u().infinite() : new u().infinite().opposite() : r.isZero() ? t.coefficient : new u().zero();
    });
    h(this, "limitToNegativeInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), i = t.coefficient.sign(), r = t.degree(e);
      return r.isStrictlyPositive() ? i === -1 ? new u().infinite() : new u().infinite().opposite() : r.isZero() ? t.coefficient : new u().zero();
    });
    h(this, "monomByDegree", (e, t) => {
      if (e === void 0)
        return this.monomByDegree(this.degree(t), t);
      const i = this.clone().reduce();
      for (const r of s(i, y))
        if (r.degree(t).isEqual(e))
          return r.clone();
      return new M().zero();
    });
    // Used in LinearSystem.tex
    h(this, "monomByLetter", (e) => {
      const t = this.clone().reduce();
      for (const i of s(t, y))
        if (i.hasVariable(e))
          return i.clone();
      return new M().zero();
    });
    h(this, "monomsByDegree", (e, t) => {
      if (e === void 0)
        return this.monomsByDegree(this.degree(t));
      const i = [], r = this.clone().reduce();
      for (const n of s(r, y))
        n.degree(t).isEqual(e) && i.push(n.clone());
      return i;
    });
    h(this, "multiply", (e) => e instanceof k ? s(this, qt).call(this, e) : e instanceof u ? s(this, nt).call(this, e) : e instanceof M ? s(this, At).call(this, e) : Number.isSafeInteger(e) && typeof e == "number" ? s(this, Ot).call(this, e) : this);
    h(this, "one", () => (a(this, y, []), s(this, y).push(new M().one()), this));
    // ------------------------------------------
    h(this, "opposite", () => (a(this, y, s(this, y).map((e) => e.opposite())), this));
    h(this, "pow", (e) => {
      if (!Number.isSafeInteger(e))
        return this.zero();
      if (e < 0)
        return this.zero();
      if (e === 0)
        return new k();
      const t = this.clone();
      for (let i = 1; i < e; i++)
        this.multiply(t);
      return this.reduce();
    });
    h(this, "primitive", (e) => {
      const t = new k();
      for (const i of s(this, y))
        t.add(i.primitive(e));
      return t;
    });
    h(this, "reduce", () => {
      let e = 0;
      for (; e < s(this, y).length; ) {
        for (let t = e + 1; t < s(this, y).length; t++)
          s(this, y)[e].isSameAs(s(this, y)[t]) && (s(this, y)[e].add(s(this, y)[t]), s(this, y).splice(t, 1), s(this, y)[e].isZero() && (s(this, y)[e] = new M().zero()), t--);
        e++;
      }
      a(this, y, s(this, y).filter((t) => !t.coefficient.isZero()));
      for (const t of s(this, y))
        t.coefficient.reduce();
      return this.length === 0 ? new k().zero() : this.reorder();
    });
    h(this, "reorder", (e = "x", t) => {
      t === void 0 && (t = !1);
      const i = this.variables.filter((r) => r !== e);
      return s(this, y).sort(function(r, n) {
        const l = r.degree(e).value, c = n.degree(e).value;
        if (l !== c)
          return t ? l - c : c - l;
        if (i.length > 0)
          for (const d of i) {
            const f = r.degree(d).value, g = n.degree(d).value;
            if (f !== g)
              return t ? f - g : g - f;
          }
        return 0;
      }), this;
    });
    // #endregion Properties and methods (49)
    // #region Getters And Setters (22)
    // ------------------------------------------
    /**
     * Replace a variable (letter) by a polynom.
     * @param letter
     * @param P
     */
    h(this, "replaceBy", (e, t) => {
      let i;
      const r = new k().zero();
      for (const n of this.monoms)
        !n.hasVariable(e) || n.literal[e].isZero() ? r.add(n.clone()) : (i = n.literal[e].clone(), n.removeVariable(e), r.add(t.clone().pow(Math.abs(i.numerator)).multiply(n)));
      return a(this, y, r.reduce().monoms), this;
    });
    h(this, "subtract", (...e) => {
      for (const t of e)
        t instanceof k ? this.add(t.clone().opposite()) : t instanceof M ? s(this, y).push(t.clone().opposite()) : s(this, y).push(new M(t).opposite());
      return this.reduce();
    });
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    h(this, "zero", () => (a(this, y, []), s(this, y).push(new M().zero()), this));
    m(this, We, (e, t) => {
      t === void 0 && (t = "=");
      const i = this.clone().reduce().reorder(), r = e.clone().reduce().reorder();
      switch (t) {
        case "=":
          return i.length !== r.length || !i.degree().isEqual(r.degree()) ? !1 : i.monoms.every((n, l) => n.isEqual(r.monoms[l]));
        case "same":
          return i.length !== r.length || !i.degree().isEqual(r.degree()) ? !1 : i.monoms.every((n, l) => n.isSameAs(r.monoms[l]));
        default:
          return !1;
      }
    });
    // #endregion Getters And Setters (22)
    // #region Private methods (15)
    m(this, rt, (e) => {
      for (const t of s(this, y))
        t.coefficient.divide(e);
      return this;
    });
    m(this, xt, (e) => {
      const t = new u(e);
      for (const i of s(this, y))
        i.coefficient.divide(t);
      return this;
    });
    m(this, Et, (e) => {
      let t = 0;
      return s(this, y).forEach((i) => {
        t += i.evaluate(e, !0);
      }), t;
    });
    m(this, Nt, (e) => {
      var E;
      let t, i, r, n, l, c, d, f, g;
      if (this.numberOfVars === 1)
        return r = this.monomByDegree(2, e).coefficient, n = this.monomByDegree(1, e).coefficient, l = this.monomByDegree(0, e).coefficient, c = n.clone().pow(2).subtract(r.clone().multiply(l).multiply(4)), c.isZero() ? (d = n.clone().opposite().divide(r.clone().multiply(2)), t = new k(e).subtract(d.display).multiply(d.denominator), i = new k(e).subtract(d.display).multiply(d.denominator), g = r.divide(d.denominator).divide(d.denominator), g.isOne() ? [t, i] : [new k(g.display), t, i]) : c.isPositive() && c.isSquare() ? (d = n.clone().opposite().add(c.clone().sqrt()).divide(r.clone().multiply(2)), f = n.clone().opposite().subtract(c.clone().sqrt()).divide(r.clone().multiply(2)), g = r.divide(d.denominator).divide(f.denominator), g.isOne() ? [
          new k(e).subtract(d.display).multiply(d.denominator),
          new k(e).subtract(f.display).multiply(f.denominator)
        ] : [
          new k(g.display),
          new k(e).subtract(d.display).multiply(d.denominator),
          new k(e).subtract(f.display).multiply(f.denominator)
        ]) : [this.clone()];
      if (r = this.monomByDegree(2, e), n = this.monomByDegree(1, e), l = this.monomByDegree(0, e), r.isLiteralSquare() && l.isLiteralSquare() && n.clone().pow(2).isSameAs(r.clone().multiply(l))) {
        const L = new k("x", r.coefficient, n.coefficient, l.coefficient), fe = s(E = L, Nt).call(E, "x"), he = [];
        let ae;
        if (fe.length >= 2) {
          for (const me of fe)
            me.degree().isZero() ? he.push(me.clone()) : (ae = me.clone(), ae.monoms[0].literal = r.literalSqrt, ae.monoms[1].literal = l.literalSqrt, he.push(ae.clone()));
          return he;
        }
      }
      return [this.clone()];
    });
    m(this, He, (e, t, i, r) => {
      let n = "";
      for (const l of s(this, y)) {
        if (l.coefficient.value === 0)
          continue;
        let c;
        r ? c = l.plotFunction : c = e === "tex" ? l.tex : l.display, n += `${l.coefficient.sign() === 1 && (n !== "" || t === !0) ? "+" : ""}${c}`;
      }
      return i === !0 && this.length > 1 && (e === "tex" ? n = `\\left( ${n} \\right)` : n = `(${n})`), n === "" && (n = "0"), n;
    });
    m(this, Tt, (e, t, i) => {
      const r = e.monoms[0].dividers, n = e.monoms[e.monoms.length - 1].dividers, l = [];
      return r.forEach((c) => {
        c.degree(i).isLeq(t) && n.forEach((d) => {
          c.degree(i).isNotEqual(d.degree(i)) && (l.push(new k(c, d)), l.push(new k(c, d.clone().opposite())));
        });
      }), l;
    });
    m(this, nt, (e) => {
      for (const t of s(this, y))
        t.coefficient.multiply(e);
      return this.reduce();
    });
    m(this, Ot, (e) => s(this, nt).call(this, new u(e)));
    m(this, At, (e) => {
      for (const t of s(this, y))
        t.multiply(e);
      return this.reduce();
    });
    m(this, qt, (e) => {
      const t = [];
      for (const i of s(this, y))
        for (const r of e.monoms)
          t.push(M.xMultiply(i, r));
      return a(this, y, t), this.reduce();
    });
    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    m(this, Mt, (e) => {
      const i = new Zt().parse(e).rpn;
      this.zero();
      const r = [];
      for (const n of i)
        s(this, kt).call(this, r, n);
      return r.length === 1 && this.add(r[0]), this.reorder();
    });
    m(this, kt, (e, t) => {
      switch (t.tokenType) {
        case p.COEFFICIENT:
          e.push(new k(t.token));
          break;
        case p.VARIABLE:
          e.push(new k().add(new M(t.token)));
          break;
        case p.CONSTANT:
          console.log("Actually, not supported - will be added later !");
          break;
        case p.OPERATION:
          if (e.length >= 2) {
            const i = e.pop(), r = e.pop();
            if (r === void 0 || i === void 0)
              break;
            if (t.token === "+")
              e.push(r.add(i));
            else if (t.token === "-")
              e.push(r.subtract(i));
            else if (t.token === "*")
              e.push(r.multiply(i));
            else if (t.token === "/")
              i.degree().isStrictlyPositive() ? console.log("divide by a polynom -> should create a rational polynom !") : e.push(r.divide(i.monoms[0].coefficient));
            else if (t.token === "^") {
              if (i.degree().isStrictlyPositive())
                throw new Error("Cannot elevate a polynom with another polynom !");
              if (i.monoms[0].coefficient.isRelative())
                e.push(r.pow(i.monoms[0].coefficient.value));
              else if (r.monoms.length === 1 && r.monoms[0].coefficient.isOne()) {
                for (const n in r.monoms[0].literal)
                  r.monoms[0].literal[n].multiply(i.monoms[0].coefficient);
                e.push(r);
              } else
                console.error("Cannot have power with fraction");
            }
          } else if (t.token === "-") {
            const i = e.pop();
            i && e.push(i.opposite());
          } else
            throw new Error("Error parsing the polynom");
          break;
        case p.MONOM:
          console.error("The monom token should not appear here");
          break;
        case p.FUNCTION:
          console.error("The function token should not appear here - might be introduced later.");
          break;
      }
    });
    return a(this, y, []), a(this, Le, []), a(this, Ge, []), e !== void 0 && this.parse(e, ...t), this;
  }
  get display() {
    return s(this, He).call(this);
  }
  hasVariable(e) {
    return this.variables.includes(e);
  }
  inverse() {
  }
  get isMultiVariable() {
    return s(this, y).some((e) => e.variables.length > 1);
  }
  isOne() {
    return s(this, y).length === 1 && s(this, y)[0].coefficient.isOne() && this.degree().isZero();
  }
  isZero() {
    return s(this, y).length === 1 && s(this, y)[0].coefficient.isZero() || s(this, y).length === 0;
  }
  get length() {
    return s(this, y).length;
  }
  // ------------------------------------------
  get monoms() {
    return s(this, y);
  }
  set monoms(e) {
    a(this, y, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get plotFunction() {
    return s(this, He).call(this, "tex", !1, !1, !0);
  }
  root() {
    throw new Error("Cannot take the root from a polynom");
  }
  get roots() {
    return s(this, st) ? s(this, Ge) : this.getZeroes();
  }
  set roots(e) {
    a(this, st, !0), a(this, Ge, e);
  }
  sqrt() {
    throw new Error("Cannot take the square root from a polynom");
  }
  tableOfSigns(e) {
    const t = e ?? this.getZeroes(), i = this.roots;
    if (e && i.some((n) => t.findIndex((l) => l.value === n.value) === -1))
      throw new Error("Some roots cannot be found !");
    let r = [""];
    if (t.forEach(() => r.push("t", "")), t.length === 0)
      r = Ce(r, "", this.monomsByDegree()[0].coefficient.isPositive() ? "+" : "-");
    else if (this.degree().isOne()) {
      const n = this.monomsByDegree(1)[0].coefficient.sign(), l = t.findIndex((c) => c.value === i[0].value) * 2 + 1;
      r[l] = "z", r = Ce(r, "", n === 1 ? "-" : "+", 0, l), r = Ce(r, "", n === 1 ? "+" : "-", l);
    } else {
      let n = 0, l, c = "+";
      i.forEach((d, f) => {
        const g = t.findIndex((L) => L.value === i[f].value);
        f === 0 && (l = g * 2 + 1, r[l] = "z", r = Ce(
          r,
          "",
          this.evaluate(d.value - 1, !0) < 0 ? "-" : "+",
          0,
          l
        )), n = g * 2 + 1, l = f === i.length - 1 ? r.length : t.findIndex((L) => L.value === i[f + 1].value) * 2 + 1;
        const E = f === i.length - 1 ? d.value + 1 : (d.value + i[f + 1].value) / 2;
        c = this.evaluate(E, !0) < 0 ? "-" : "+", r[n] = "z", r = Ce(r, "", c, n, l), n = +l, l = r.length;
      });
    }
    return { roots: t, signs: r };
  }
  get tex() {
    return s(this, He).call(this, "tex");
  }
  get variables() {
    let e = [];
    for (const t of s(this, y))
      e = e.concat(t.variables);
    return e = [...new Set(e)], e.sort(), e;
  }
  get zeroes() {
    return this.getZeroes();
  }
  // #endregion Private methods (15)
};
Le = new WeakMap(), y = new WeakMap(), Ge = new WeakMap(), st = new WeakMap(), We = new WeakMap(), rt = new WeakMap(), xt = new WeakMap(), Et = new WeakMap(), Nt = new WeakMap(), He = new WeakMap(), Tt = new WeakMap(), nt = new WeakMap(), Ot = new WeakMap(), At = new WeakMap(), qt = new WeakMap(), ot = new WeakSet(), mi = function(e, ...t) {
  if (t.length === 0) {
    if (e = "" + e, e !== "" && !isNaN(Number(e))) {
      this.empty();
      const i = new M(e);
      return this.add(i), this;
    }
    return s(this, Mt).call(this, e);
  } else if (/^[a-z]+/.test(e)) {
    this.empty();
    const i = t.map((r) => new u(r));
    if (e.length > 1) {
      const r = e.split("");
      let n = 0;
      for (const l of i) {
        const c = new M();
        c.coefficient = l.clone(), c.literalStr = r[n] || "", this.add(c), n++;
      }
    } else {
      let r = i.length - 1;
      for (const n of i) {
        const l = new M();
        l.coefficient = n.clone(), l.literalStr = `${e}^${r}`, this.add(l), r--;
      }
    }
    return this;
  } else
    return this.zero();
}, Mt = new WeakMap(), kt = new WeakMap(), Ui = function(e) {
};
let O = k;
class z {
  constructor(e, t) {
    h(this, "_displayMode");
    h(this, "_singleMode", !1);
    h(this, "_polynom");
    h(this, "_power");
    if (e instanceof z)
      this._polynom = e.polynom.clone(), this._power = e.power.clone();
    else if (typeof e == "string" && t === void 0) {
      const [i, r = "1"] = e.split("^");
      this._polynom = new O(i), this._power = new u(r.replace("(", "").replace(")", ""));
    } else
      this._polynom = new O(e), this._power = new u(t ?? 1);
    return this._displayMode = 1, this;
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  clone() {
    return new z(this);
  }
  add() {
    throw new Error("Adding two factors is not possible");
  }
  get withPower() {
    return this._displayMode = 1, this;
  }
  get withRoot() {
    return this._displayMode = 0, this;
  }
  get asSingle() {
    return this._singleMode = !0, this;
  }
  degree(e) {
    return this.polynom.degree(e).multiply(this.power);
  }
  derivative() {
    return this.power.isZero() ? [new z("0", "1")] : this.power.isOne() ? [new z(this.polynom.clone().derivative())] : [
      new z(this.power.clone()),
      new z(this.polynom.clone().derivative()),
      new z(this.polynom.clone(), this.power.clone().subtract(1))
    ];
  }
  develop() {
    if (this.power.isNatural())
      return this.polynom.clone().pow(this.power.value);
    throw new Error("The power must be a natural number");
  }
  get display() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, r;
    return this._displayMode === 0 && t > 1 ? (i = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, r = Math.abs(e) === 1 ? "" : `^(${Math.abs(e)})`) : (i = this._singleMode && this.power.isOne() ? this.polynom.display : hi(this.polynom.display, !1), r = t === 1 && Math.abs(e) === 1 ? "" : `^(${this.power.display})`), i = `${i}${r}`, this._displayMode === 0 && e < 0 && (i = `1/(${i})`), i;
  }
  divide(e) {
    if (e instanceof z && this.isSameAs(e))
      return this.power.subtract(e.power), this;
    const t = new O(e);
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
    return e instanceof z ? t = e.polynom : e instanceof O ? t = e : t = new O(e), this.polynom.isEqual(t);
  }
  isZero() {
    return this.polynom.isZero();
  }
  multiply(e) {
    if (e instanceof z && this.isSameAs(e))
      return this.power.add(e.power), this;
    const t = new O(e);
    if (this.isSameAs(t))
      return this.power.add(1), this;
    throw new Error("The two factors must be the same");
  }
  one() {
    return this._polynom.one(), this._power.one(), this;
  }
  opposite() {
    throw new Error("Method not implemented.");
  }
  get polynom() {
    return this._polynom;
  }
  set polynom(e) {
    this._polynom = e;
  }
  pow(e) {
    return this.power.multiply(e), this;
  }
  get power() {
    return this._power;
  }
  set power(e) {
    this._power = new u(e);
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
    let i, r;
    return this._displayMode === 0 && t > 1 ? (i = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, r = Math.abs(e) === 1 ? "" : `^{ ${Math.abs(e)} }`) : (i = this._singleMode && this.power.isOne() ? this.polynom.tex : hi(this.polynom.tex), r = t === 1 && Math.abs(e) === 1 ? "" : `^{ ${this.power.tex} }`), i = `${i}${r}`, this._displayMode === 0 && e < 0 && (i = `\\frac{ 1 }{ ${i} }`), i;
  }
  get variables() {
    return this.polynom.variables;
  }
  zero() {
    return this._polynom.zero(), this._power.one(), this;
  }
  tableOfSigns(e) {
    const t = this._power.clone().reduce(), i = this._polynom.tableOfSigns(e);
    return t.isStrictlyNegative() && (i.signs = Ce(i.signs, "z", "d")), t.denominator % 2 === 0 ? i.signs = Ce(i.signs, "-", "h") : t.numerator % 2 === 0 && (i.signs = Ce(i.signs, "-", "+")), { roots: i.roots, signs: i.signs };
  }
}
var Ze = /* @__PURE__ */ ((o) => (o[o.ROOT = 0] = "ROOT", o[o.POWER = 1] = "POWER", o))(Ze || {}), ht, Xt;
const pe = class pe {
  // #endregion Class fields (1)
  // #region Constructors (1)
  constructor(...e) {
    // #region Class fields (1)
    h(this, "_displayMode", Ze.POWER);
    h(this, "_factors", []);
    return this.parse(...e), this;
  }
  // #endregion Constructors (1)
  // #region Properties and methods (25)
  parse(...e) {
    return e.length === 0 ? this : (this._factors = [], e.forEach((t) => {
      if (typeof t == "string") {
        const i = t.split(")(").join(")*(").split("*");
        this._factors.push(...i.map((r) => new z(r)));
      } else t instanceof pe ? this._factors.push(...t.factors.map((i) => i.clone())) : this._factors.push(new z(t));
    }), this);
  }
  clone() {
    return new pe(...this._factors.map((e) => e.clone()));
  }
  static gcd(...e) {
    var i;
    if (e.length === 0)
      return new pe().one();
    if (e.length === 1)
      return e[0];
    if (e.length === 2)
      return A(i = pe, ht, Xt).call(i, e[0], e[1]);
    let t = e[0];
    return e.shift(), e.forEach((r) => {
      var n;
      return t = A(n = pe, ht, Xt).call(n, t, r);
    }), t;
  }
  add(...e) {
    let t = [this, ...e];
    const i = pe.gcd(...t);
    t = t.map((n) => n.divide(i).reduce());
    const r = new O("0");
    return t.forEach((n) => r.add(n.develop())), this._factors = [
      ...i.factors,
      new z(r)
    ], this;
  }
  get asPower() {
    return this._displayMode = Ze.POWER, this;
  }
  get asRoot() {
    return this._displayMode = Ze.ROOT, this;
  }
  degree(e) {
    return this._factors.reduce((t, i) => t.add(i.degree(e)), new u("0"));
  }
  get denominator() {
    return this._factors.filter((e) => e.power.isNegative());
  }
  derivative() {
    const e = [], t = this._factors.length;
    for (let r = 0; r < t; r++) {
      const n = this._factors.slice(), l = n.splice(r, 1)[0];
      e.push(new pe(...n).multiply(new pe(...l.derivative())));
    }
    e.forEach((r) => r.reduce());
    const i = e.shift();
    return i !== void 0 && (this._factors = i.factors), this.add(...e);
  }
  develop() {
    const e = new O("1");
    return this._factors.forEach((t) => {
      e.multiply(t.develop());
    }), e;
  }
  get display() {
    let e = [], t = [];
    if (this._displayMode === Ze.ROOT ? (e = this.numerator, t = this.denominator.map((n) => n.clone().inverse())) : e = this._factors, e.length === 0 && (e = [new z("1")]), t.length === 0)
      return e.length === 1 ? e[0].asSingle.display : e.map((n) => n.display).join("");
    const i = e.length === 1 ? e[0].asSingle.display : e.map((n) => n.display).join(""), r = t.length === 1 ? t[0].asSingle.display : t.map((n) => n.display).join("");
    return `(${i})/(${r})`;
  }
  divide(e) {
    return this._factors = this._factors.concat(e.clone().factors.map((t) => t.inverse())), this;
  }
  evaluate(e, t) {
    return t ? this._factors.reduce((i, r) => i * r.evaluate(e, t), 1) : this._factors.reduce((i, r) => i.multiply(r.evaluate(e)), new u("1"));
  }
  getFactors() {
    return this._factors;
  }
  get factors() {
    return this._factors;
  }
  set factors(e) {
    this._factors = e;
  }
  fromPolynom(e, t) {
    return this._factors = new O(e).factorize(t).map((i) => new z(i)), this;
  }
  getZeroes() {
    const e = [].concat(...this._factors.map((t) => t.polynom.getZeroes()));
    return e.sort((t, i) => t.value - i.value), e.filter(
      (t, i, r) => i === r.findIndex(
        (n) => n.value === t.value
      )
    );
  }
  hasVariable(e) {
    return this._factors.some((t) => t.hasVariable(e));
  }
  inverse() {
    return this._factors = this._factors.map((e) => e.inverse()), this;
  }
  isEqual(e) {
    const t = pe.gcd(this, e), i = this.clone().divide(t).reduce(), r = e.clone().divide(t).reduce();
    return i.isOne() && r.isOne();
  }
  isOne() {
    return this._factors.every((e) => e.isOne());
  }
  isZero() {
    return this._factors.every((e) => e.isZero());
  }
  multiply(...e) {
    return e.forEach((t) => {
      this._factors = this._factors.concat(t.clone().factors);
    }), this;
  }
  get numerator() {
    return this._factors.filter((e) => e.power.isPositive());
  }
  one() {
    return this._factors = [new z("1", "1")], this;
  }
  // #endregion Properties and methods (25)
  // #region Getters And Setters (5)
  opposite() {
    const e = this._factors.findIndex((t) => t.display === "(-1)");
    return e >= 0 ? this._factors.splice(e, 1) : this._factors.push(new z("-1", "1")), this;
  }
  pow(e) {
    return this._factors = this._factors.map((t) => t.pow(e)), this;
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    const e = Gt(this);
    return this._factors = Object.values(e).map((t) => {
      const i = t[0].polynom, r = t.reduce((n, l) => n.add(l.power), new u("0"));
      return new z(i, r.reduce());
    }).filter((t) => !t.power.isZero()), this;
  }
  root(e) {
    return this._factors = this._factors.map((t) => t.root(e)), this;
  }
  sort() {
    return this._factors = this._factors.sort((e, t) => e.degree().isLeq(t.degree()) ? -1 : 1), this;
  }
  sqrt() {
    return this._factors = this._factors.map((e) => e.sqrt()), this;
  }
  subtract(...e) {
    return this.add(...e.map((t) => t.opposite()));
  }
  tableOfSigns() {
    const e = this.getZeroes(), t = this.factors.map((r) => ({ factor: new z(r), ...r.tableOfSigns(e) }));
    return { signs: t.map((r) => r.signs).reduce((r, n) => (r.length === 0 ? r = n : n.forEach((l, c) => {
      switch (l) {
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
    }), r), []), roots: e, factors: t };
  }
  get tex() {
    let e = [], t = [];
    if (this._displayMode === Ze.ROOT ? (e = this.numerator, t = this.denominator.map((n) => n.clone().inverse())) : e = this._factors, e.length === 0 && (e = [new z("1")]), t.length === 0)
      return e.length === 1 ? e[0].asSingle.tex : e.map((n) => n.tex).join("");
    const i = e.length === 1 ? e[0].asSingle.tex : e.map((n) => n.tex).join(""), r = t.length === 1 ? t[0].asSingle.tex : t.map((n) => n.tex).join("");
    return `\\frac{ ${i} }{ ${r} }`;
  }
  get variables() {
    return this._factors.reduce((e, t) => e.concat(t.variables), []);
  }
  // #endregion Getters And Setters (5)
  // #region Private methods (1)
  zero() {
    return this._factors = [new z("0", "1")], this;
  }
  // #endregion Private methods (1)
};
ht = new WeakSet(), Xt = function(e, t) {
  const i = Gt(e), r = Gt(t), l = Object.keys(i).filter((c) => Object.hasOwn(r, c)).map((c) => {
    const d = i[c].reduce((g, E) => g.add(E.power), new u("0")), f = r[c].reduce((g, E) => g.add(E.power), new u("0"));
    return new z(c, u.min(d, f));
  });
  return new pe(...l);
}, m(pe, ht);
let Ht = pe;
function Gt(o) {
  const e = new u().one(), t = o.factors.reduce((i, r) => {
    if (r.polynom.degree().isZero())
      return r.polynom.monoms.length > 0 && e.multiply(r.polynom.monoms[0].coefficient), i;
    const n = r.polynom.display;
    return Object.hasOwn(i, n) ? i[n].push(r) : i[n] = [r], i;
  }, {});
  return e.isOne() || (t[e.display] = [new z(e.display, 1)]), t;
}
var T, q, se, Ct, Xe, $t;
const ve = class ve {
  constructor(e, t, i) {
    // Left part of the equation
    m(this, T);
    // Right part of the equation
    m(this, q);
    // Signe of the equation
    m(this, se);
    // #endregion Constructors (3)
    // #region Properties and methods (26)
    // ------------------------------------------
    h(this, "parse", (e) => {
      const t = s(this, Ct).call(this, e);
      if (t === !1)
        throw new Error("The equation is not valid (no sign found)");
      const i = e.split(t);
      return this.create(new O(i[0]), new O(i[1]), s(this, Xe).call(this, t));
    });
    h(this, "create", (e, t, i) => (a(this, T, e), a(this, q, t), a(this, se, s(this, Xe).call(this, i ?? "=")), this));
    h(this, "clone", () => new ve(s(this, T).clone(), s(this, q).clone(), s(this, se)));
    /**
     * Get the degree of the equation
     * @param letter
     */
    h(this, "degree", (e) => u.max(s(this, T).degree(e), s(this, q).degree(e)));
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
    h(this, "divide", (e) => {
      const t = new u(e);
      return t.isZero() ? this : this.multiply(t.inverse());
    });
    /**
     * Determine if the equation contains a variable.
     * @param letter
     */
    h(this, "hasVariable", (e) => this.variables.includes(e));
    h(this, "isLinearTo", (e) => {
      const t = e.clone().moveLeft().simplify().left, i = this.clone().moveLeft().simplify().left;
      return t.isEqual(i) || t.isOppositeAt(i);
    });
    /**
     * Determine if the equation contains more than one letter/variable.
     */
    h(this, "isMultiVariable", () => s(this, T).isMultiVariable || s(this, q).isMultiVariable);
    // -----------------------------------------------
    // Equations helpers
    h(this, "isEqualTo", (e) => {
      const t = e.clone().moveLeft().left, i = this.clone().moveLeft().left;
      return t.isEqual(i) || t.isOppositeAt(i);
    });
    /**
     * Reorder the polynom to have only one letter on the left, the rest on the right.
     * @param letter
     */
    h(this, "isolate", (e) => {
      if (!this.degree(e).isOne() || this.isMultiVariable())
        return !1;
      let t;
      s(this, T).subtract(s(this, q)), s(this, q).zero();
      const i = [...s(this, T).monoms];
      for (const n of i)
        n.hasVariable(e) || (t = n.clone(), s(this, T).subtract(t), s(this, q).subtract(t));
      if (s(this, T).length !== 1)
        return !1;
      const r = s(this, T).monoms[0].coefficient.clone();
      return s(this, T).divide(r), s(this, q).divide(r), this;
    });
    // -----------------------------------------------
    // Equations operations
    // -----------------------------------------------
    h(this, "letters", () => [.../* @__PURE__ */ new Set([...s(this, T).letters(), ...s(this, q).letters()])]);
    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    h(this, "moveLeft", () => (s(this, T).subtract(s(this, q)), s(this, q).zero(), this));
    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    h(this, "multiply", (e) => {
      const t = new u(e);
      return s(this, T).multiply(t), s(this, q).multiply(t), s(this, se) !== "=" && t.sign() === -1 && s(this, $t).call(this), this;
    });
    h(this, "opposite", () => (a(this, T, s(this, T).opposite()), a(this, q, s(this, q).opposite()), this));
    h(this, "reorder", (e) => (s(this, T).subtract(s(this, q)), s(this, q).zero(), s(this, T).reorder(), e ? this : (s(this, T).monoms.filter((t) => t.degree().isZero()).forEach((t) => {
      const i = t.clone();
      s(this, T).subtract(i), s(this, q).subtract(i);
    }), s(this, T).reorder(), s(this, q).reorder(), this)));
    // ------------------------------------------
    h(this, "replaceBy", (e, t) => (s(this, T).replaceBy(e, t), s(this, q).replaceBy(e, t), this));
    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    h(this, "simplify", () => (this.multiply(G.lcm(...s(this, T).getDenominators(), ...s(this, q).getDenominators())), this.divide(G.gcd(...s(this, T).getNumerators(), ...s(this, q).getNumerators())), this));
    // -----------------------------------------------
    h(this, "solve", () => new mt(this.clone()).solve());
    h(this, "test", (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e)));
    // #endregion Getters And Setters (13)
    // #region Private methods (6)
    m(this, Ct, (e) => {
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
    m(this, Xe, (e) => e === void 0 ? "=" : e.includes("geq") || e.includes(">=") || e.includes("=>") ? ">=" : e.includes(">") ? ">" : e.includes("leq") || e.includes("<=") || e.includes("=<") ? "<=" : e.includes("<") ? "<" : "=");
    m(this, $t, () => s(this, se) === "=" ? this : s(this, se).includes("<") ? (s(this, se).replace("<", ">"), this) : s(this, se).includes(">") ? (s(this, se).replace(">", "<"), this) : this);
    if (a(this, T, new O().zero()), a(this, q, new O().zero()), a(this, se, "="), e !== void 0 && t === void 0) {
      if (e instanceof ve)
        return e.clone();
      typeof e == "string" && this.parse(e);
    } else e !== void 0 && t !== void 0 && (this.left = new O(e), this.right = new O(t));
    return i !== void 0 && (this.sign = i), this;
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
    if (e instanceof ve)
      return s(this, T).add(e.left), s(this, q).add(e.right), this;
    if (typeof e == "string" && !ve.isEquationString(e))
      return this.add(new ve(e));
    const t = new O(e);
    return s(this, T).add(t), s(this, q).add(t), this;
  }
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param values
   * @param asNumeric
   */
  evaluate(e, t) {
    const i = s(this, T).evaluate(e, t), r = s(this, q).evaluate(e, t);
    return t ? i === r : i.isEqual(r);
  }
  isEqual(e) {
    const t = new ve(e);
    return t.left.isEqual(s(this, T)) && t.right.isEqual(s(this, q));
  }
  pow(e) {
    return s(this, T).pow(e), s(this, q).pow(e), this;
  }
  reduce() {
    return this.moveLeft(), s(this, T).reduce(), this.simplify(), s(this, T).monoms[0].coefficient.isNegative() && this.multiply(-1), this;
  }
  split() {
    return [s(this, T).clone(), s(this, q).clone()];
  }
  subtract(e) {
    if (e instanceof ve)
      return s(this, T).subtract(e.left), s(this, q).subtract(e.right), this;
    if (typeof e == "string" && !ve.isEquationString(e))
      return this.subtract(new ve(e));
    const t = new O(e);
    return s(this, T).subtract(t), s(this, q).subtract(t), this;
  }
  static isEquationString(e) {
    return e.includes("=") || e.includes("<") || e.includes(">") || e.includes("<=") || e.includes(">=");
  }
  static makeSolutionsUnique(e, t) {
    const i = [], r = e.filter((n) => i.includes(n.tex) ? !1 : (i.push(n.tex), !0));
    return t === !0 && r.sort((n, l) => n.value - l.value), r;
  }
  // #endregion Properties and methods (26)
  // #region Getters And Setters (13)
  get display() {
    return `${s(this, T).display}${this.signAsTex}${s(this, q).display}`;
  }
  // Getter and setter
  get left() {
    return s(this, T);
  }
  set left(e) {
    a(this, T, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get right() {
    return s(this, q);
  }
  set right(e) {
    a(this, q, e);
  }
  // ------------------------------------------
  get sign() {
    return s(this, se);
  }
  set sign(e) {
    a(this, se, s(this, Xe).call(this, e));
  }
  get signAsTex() {
    return s(this, se) === ">=" ? "\\geq" : s(this, se) === "<=" ? "\\leq" : s(this, se);
  }
  get tex() {
    return `${s(this, T).tex}${this.signAsTex}${s(this, q).tex}`;
  }
  get variables() {
    return [...new Set(s(this, q).variables.concat(s(this, T).variables))];
  }
  // #endregion Private methods (6)
};
T = new WeakMap(), q = new WeakMap(), se = new WeakMap(), Ct = new WeakMap(), Xe = new WeakMap(), $t = new WeakMap();
let H = ve;
var R, Oe, It, Pt;
const Fe = class Fe {
  constructor(...e) {
    m(this, R);
    // Determine the letters in the linear system, usually ['x', 'y']
    m(this, Oe);
    h(this, "parse", (...e) => (a(this, R, e.map((t) => new H(t))), s(this, It).call(this), this));
    h(this, "clone", () => new Fe().parse(...s(this, R).map((e) => e.clone())));
    h(this, "buildTex", (e, t) => {
      let i, r, n = [];
      const l = [];
      for (const d of e)
        n = n.concat(d.letters());
      n = [...new Set(n)], n.sort();
      for (let d = 0; d < e.length; d++) {
        const f = e[d];
        i = [];
        for (const g of n)
          r = f.left.monomByLetter(g), i.length === 0 ? i.push(r.isZero() ? "" : r.tex) : i.push(r.isZero() ? "" : (r.coefficient.sign() === 1 ? "+" : "") + r.tex);
        if (i.push("="), i.push(f.right.tex), (t == null ? void 0 : t[d]) !== void 0) {
          i[i.length - 1] = i[i.length - 1] + " \\phantom{\\quad}";
          for (const g of t[d])
            i.push(`\\ \\cdot\\ ${g.startsWith("-") ? "\\left(" + g + "\\right)" : g}`);
        }
        l.push(i.join("&"));
      }
      let c = 0;
      return t !== void 0 && t.length > 0 && (c = t[0].length), `\\left\\{\\begin{array}{${"r".repeat(n.length)}cl ${"|l".repeat(c)}}${l.join("\\\\ ")}\\end{array}\\right.`;
    });
    h(this, "mergeEquations", (e, t, i, r) => {
      const n = e.clone().multiply(new u(i)), l = t.clone().multiply(new u(r));
      return n.left.add(l.left), n.right.add(l.right), n;
    });
    // ------------------------------------------
    h(this, "reorder", () => {
      for (const e of s(this, R))
        e.reorder();
      return this;
    });
    h(this, "solveMatrix", () => {
      const [e, t] = this.matrix, i = e.map((r, n) => [...r, t[n]]);
      for (let r = 0; r < e.length; r++) {
        const n = i[r][r].clone();
        i[r] = i[r].map((l) => l.divide(n));
        for (let l = 0; l < e.length; l++) {
          if (l === r)
            continue;
          const c = i[l][r].clone().opposite();
          for (let d = 0; d < i[l].length; d++)
            i[l][d].add(i[r][d].clone().multiply(c));
          if (i[l].slice(0, i[l].length - 1).every((d) => d.isZero()))
            return i[l][i[l].length - 1].isZero() ? [new u().infinite()] : [];
        }
      }
      return i.map((r) => r[r.length - 1]);
    });
    m(this, It, () => (a(this, Oe, s(this, R).reduce((e, t) => [.../* @__PURE__ */ new Set([...e, ...t.variables])], [])), s(this, Oe).sort(), this));
    m(this, Pt, () => {
      const e = [], t = [];
      for (const i of s(this, R)) {
        const r = [], n = i.clone().reorder();
        for (const l of this.variables) {
          const c = n.left.monomByLetter(l);
          r.push(c.coefficient);
        }
        t.push(n.right.monoms[0].coefficient), e.push(r);
      }
      return [e, t];
    });
    return a(this, R, []), a(this, Oe, []), e.length > 0 && this.parse(...e), this;
  }
  static fromMatrix(e, t = "xyz") {
    const i = e[0].length;
    if (e.some((n) => n.length !== i))
      throw new Error("All rows must have the same number of columns");
    const r = t.split("").splice(0, i - 1);
    return new Fe(
      ...e.map((n) => {
        const l = new O(r.join(""), ...n);
        return new H(l, 0);
      })
    );
  }
  add(e, t) {
    if (e instanceof Fe) {
      const i = e.equations.length;
      if (i !== s(this, R).length)
        throw new Error("The number of equations must be the same");
      for (let r = 0; r < i; r++)
        s(this, R)[r].add(e.equations[r]);
    } else {
      if (t === void 0 || t < 0 || t >= s(this, R).length)
        throw new Error("Index out of range");
      const i = new H(e);
      s(this, R)[t].add(i);
    }
    return this;
  }
  degree(e) {
    return u.max(...s(this, R).map((t) => t.degree(e)));
  }
  get display() {
    return this.tex + "as display";
  }
  // ------------------------------------------
  get equations() {
    return s(this, R);
  }
  set equations(e) {
    a(this, R, e);
  }
  evaluate(e, t) {
    throw new Error("Method not implemented.");
  }
  hasVariable(e) {
    return s(this, Oe).includes(e);
  }
  isEqual(e) {
    return this.equations.every((t, i) => t.isEqual(e.equations[i]));
  }
  get isSolvable() {
    return this.variables.length === s(this, R).length;
  }
  get matrix() {
    return s(this, Pt).call(this);
  }
  multiply(e, t) {
    if (Array.isArray(e)) {
      if (e.length !== s(this, R).length)
        throw new Error("The number of values must be the same as the number of equations");
      for (let i = 0; i < e.length; i++)
        s(this, R)[i].multiply(e[i]);
      return this;
    }
    if (t === void 0 || t < 0 || t >= s(this, R).length)
      throw new Error("Index out of range");
    return s(this, R)[t].multiply(e), this;
  }
  reduce() {
    throw new Error("Method not implemented.");
  }
  solve() {
    return [];
  }
  subtract(e, t) {
    if (e instanceof Fe) {
      const i = e.equations.length;
      if (i !== s(this, R).length)
        throw new Error("The number of equations must be the same");
      for (let r = 0; r < i; r++)
        s(this, R)[r].subtract(e.equations[r]);
    } else {
      if (t === void 0 || t < 0 || t >= s(this, R).length)
        throw new Error("Index out of range");
      const i = new H(e);
      s(this, R)[t].subtract(i);
    }
    return this;
  }
  get tex() {
    const e = this.clone().reorder();
    return this.buildTex(e.equations);
  }
  get variables() {
    return s(this, Oe);
  }
  set variables(e) {
    const t = typeof e == "string" ? e.split("") : [...e];
    t.sort(), a(this, Oe, t);
  }
};
R = new WeakMap(), Oe = new WeakMap(), It = new WeakMap(), Pt = new WeakMap();
let Yt = Fe;
function Gi(o, e) {
  return o.dimension === e.dimension && o.array.every(
    (t, i) => e.array[i].isEqual(t)
  );
}
function Wi(o, e) {
  if (o.dimension !== e.dimension)
    return !1;
  const t = e.array[0].value / o.array[0].value;
  return o.array.every(
    (i, r) => e.array[r].value === i.value * t
  );
}
function Hi(o, e) {
  return o.dimension !== e.dimension ? new u().invalid() : o.array.reduce(
    (t, i, r) => t.add(i.clone().multiply(e.array[r])),
    new u(0)
  );
}
function Xi(...o) {
  return o.some((e) => e.dimension !== o[0].dimension) ? new u().invalid() : o[0].dimension === 2 && o.length !== 2 ? new u().invalid() : o[0].dimension === 3 && o.length !== 3 ? new u().invalid() : o[0].dimension === 2 ? o[0].array[0].clone().multiply(o[1].array[1]).subtract(o[0].array[1].clone().multiply(o[1].array[0])) : o[0].array[0].clone().multiply(
    o[1].array[1].clone().multiply(o[2].array[2]).subtract(o[1].array[2].clone().multiply(o[2].array[1]))
  ).subtract(
    o[0].array[1].clone().multiply(
      o[1].array[0].clone().multiply(o[2].array[2]).subtract(o[1].array[2].clone().multiply(o[2].array[0]))
    )
  ).add(o[0].array[2].clone().multiply(o[1].array[0].clone().multiply(o[2].array[1]).subtract(o[1].array[1].clone().multiply(o[2].array[0]))));
}
var F, Pe;
const ke = class ke {
  constructor(...e) {
    m(this, F, []);
    m(this, Pe, !1);
    h(this, "zero", () => (s(this, F).forEach((e) => e.zero()), this));
    h(this, "one", () => (this.zero(), this.x.one(), this));
    h(this, "opposite", () => (s(this, F).forEach((e) => e.opposite()), this));
    h(this, "add", (e) => (s(this, F).forEach((t, i) => t.add(e.array[i])), this));
    h(this, "subtract", (e) => this.add(e.clone().opposite()));
    h(this, "unit", () => {
      const e = this.norm;
      return e === 0 ? this : this.divideByScalar(e);
    });
    h(this, "dot", (e) => Hi(this, e));
    h(this, "normal", () => {
      if (this.dimension >= 3)
        throw new Error("Normal vector can only be determined in 2D");
      const e = this.x.clone().opposite(), t = this.y.clone();
      return s(this, F)[0] = t, s(this, F)[1] = e, this;
    });
    h(this, "isEqual", (e) => Gi(this, e));
    h(this, "isColinearTo", (e) => Wi(this, e));
    h(this, "isNormalTo", (e) => this.dot(e).isZero());
    h(this, "multiplyByScalar", (e) => {
      const t = new u(e);
      return this.array.forEach((i) => i.multiply(t)), this;
    });
    h(this, "divideByScalar", (e) => this.multiplyByScalar(new u(e).inverse()));
    h(this, "simplify", () => this.multiplyByScalar(
      G.lcm(...this.array.map((e) => e.denominator))
    ).divideByScalar(
      G.gcd(...this.array.map((e) => e.numerator))
    ).multiplyByScalar(
      this.x.isNegative() ? -1 : 1
    ));
    h(this, "angle", (e, t, i) => {
      let r = this.dot(e).value;
      return t && (r = Math.abs(r)), (i ? 1 : 180 / Math.PI) * Math.acos(r / (this.norm * e.norm));
    });
    h(this, "fromString", (e) => {
      e.startsWith("(") && (e = e.substring(1)), e.endsWith(")") && (e = e.substring(0, e.length - 1));
      const t = e.split(/[,;\s]/g).filter((i) => i.trim() !== "");
      return t.length < 2 ? this : (a(this, F, t.map((i) => new u(i))), this);
    });
    e.length > 0 && this.parse(...e);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get array() {
    return s(this, F);
  }
  set array(e) {
    a(this, F, e);
  }
  get x() {
    return s(this, F)[0];
  }
  set x(e) {
    s(this, F)[0] = new u(e);
  }
  get y() {
    return s(this, F)[1];
  }
  set y(e) {
    s(this, F)[1] = new u(e);
  }
  get z() {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    return s(this, F)[2];
  }
  set z(e) {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    s(this, F)[2] = new u(e);
  }
  get asPoint() {
    return s(this, Pe);
  }
  set asPoint(e) {
    a(this, Pe, e);
  }
  get normSquare() {
    return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new u(0));
  }
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get tex() {
    return s(this, Pe) ? `\\left(${this.array.map((e) => e.tex).join(";")}\\right)` : `\\begin{pmatrix} ${this.array.map((e) => e.tex).join(" \\\\ ")} \\end{pmatrix}`;
  }
  get display() {
    return s(this, Pe) ? `(${this.array.map((e) => e.display).join(";")})` : `((${this.array.map((e) => e.display).join(",")}))`;
  }
  setDimension(e = 2) {
    if (e < 2)
      throw new Error("Dimension must be at least 2");
    if (e < this.dimension)
      a(this, F, s(this, F).slice(0, e));
    else if (e > this.dimension)
      for (let t = this.dimension; t < e; t++)
        s(this, F).push(new u(0));
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
    return a(this, Pe, e !== !1), this;
  }
  parse(...e) {
    if (e.length === 0)
      throw new Error("Invalid value");
    if (e.length === 1) {
      if (e[0] instanceof ke)
        return e[0].clone();
      if (typeof e[0] == "string")
        return this.fromString(e[0]);
      throw new Error("Invalid value");
    }
    if (e.length === 2) {
      const [t, i] = e;
      if (t instanceof ke && i instanceof ke) {
        if (t.dimension !== i.dimension)
          throw new Error("Vectors must have the same dimension");
        return a(this, F, i.array.map((r, n) => r.clone().subtract(t.array[n]))), this;
      }
    }
    return a(this, F, e.map((t) => new u(t))), this;
  }
  clone() {
    const e = new ke();
    return e.array = this.copy(), e.asPoint = this.asPoint, e;
  }
  copy() {
    return s(this, F).map((e) => e.clone());
  }
  middleOf(e, t) {
    if (e.dimension !== t.dimension)
      throw new Error("Vectors must be the same dimension");
    return this.array = [], e.array.forEach((i, r) => {
      this.array.push(i.clone().add(t.array[r]).divide(2));
    }), this;
  }
  translate(...e) {
    return this.array.forEach((t, i) => t.add(e[i])), this;
  }
  cross(e) {
    if (this.dimension !== 3 || e.dimension !== 3)
      throw new Error("Cross product can only be determined in 3D");
    return new ke(
      this.y.clone().multiply(e.z).subtract(this.z.clone().multiply(e.y)),
      this.z.clone().multiply(e.x).subtract(this.x.clone().multiply(e.z)),
      this.x.clone().multiply(e.y).subtract(this.y.clone().multiply(e.x))
    );
  }
  isZero() {
    return this.array.every((e) => e.isZero());
  }
  isOne() {
    return this.array.every((e, t) => t === 0 ? e.isOne() : e.isZero());
  }
  distanceTo(e) {
    const t = new ke(this, e);
    return {
      value: t.norm,
      fraction: t.normSquare,
      tex: t.tex
    };
  }
};
F = new WeakMap(), Pe = new WeakMap();
let x = ke;
function gi(o = 0.5) {
  return Math.random() < o;
}
function ue(o, e, t) {
  if (e === void 0)
    return o >= 0 ? ue(0, o) : ue(o, 0);
  if (o === e)
    return o;
  if (t === void 0)
    return Math.floor(Math.random() * (e - o + 1) + o);
  if (Math.abs(e - o) <= t.length)
    throw new Error("The number of excluded values is too high.");
  let i = ue(o, e);
  for (; t.includes(i); )
    i = ue(o, e);
  return i;
}
function Y(o, e) {
  return e === !1 ? gi() ? ue(1, o) : -ue(1, o) : ue(-o, o);
}
function Yi(o) {
  let e = G.primes();
  return o !== void 0 && (e = e.filter((t) => t < o)), si(e);
}
function Qi(o, e) {
  return e === void 0 && (e = 1), o.length <= 0 ? Object.values(o) : yi(o).slice(0, e);
}
function si(o) {
  return o.length === 0 ? null : o[ue(0, o.length - 1)];
}
function yi(o) {
  const e = Object.values(o);
  for (let t = e.length - 1; t > 0; t--) {
    const i = Math.floor(Math.random() * (t + 1)), r = e[t];
    e[t] = e[i], e[i] = r;
  }
  return e;
}
class V extends x {
  constructor(...e) {
    super(), e.length > 0 && this.parse(...e);
  }
  parse(...e) {
    if (this.asPoint = !0, e.length === 1) {
      if (e[0] instanceof x)
        return this.array = e[0].copy(), this;
      if (typeof e[0] == "string")
        return this.fromString(e[0]), this;
    }
    if (e.length > 1) {
      if (e.some((i) => i instanceof x))
        throw new Error("Creating a point with  multiple argument requires an input fraction");
      const t = e.map((i) => new u(i));
      if (t.some((i) => i.isNaN()))
        throw new Error("The value is not a valid point sting (a,b): " + e.join(","));
      this.array = t;
    }
    return this;
  }
  clone() {
    const e = new V();
    return e.array = this.copy(), e.asPoint = !0, e;
  }
}
var wi = /* @__PURE__ */ ((o) => (o.None = "none", o.Parallel = "parallel", o.Perpendicular = "perpendicular", o.Tangent = "tangent", o))(wi || {}), Ae, P, S, U, re, Q, qe, ye;
const Be = class Be {
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...e) {
    m(this, Ae);
    // ax + by + c = 0
    m(this, P);
    m(this, S);
    m(this, U);
    m(this, re);
    m(this, Q);
    m(this, qe);
    m(this, ye, "canonical");
    h(this, "randomPoint", (e) => {
      const t = s(this, Q).clone().multiplyByScalar(Y(e === void 0 || e <= 1 ? 3 : e, !1)).add(s(this, re));
      return t.asPoint = !0, t;
    });
    h(this, "randomNearPoint", (e) => {
      const t = this.randomPoint(e);
      let i = 10;
      for (; this.isOnLine(t) && i > 0; )
        t.x.add(Y(1, !1)), t.y.add(Y(1, !1)), i--;
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
    h(this, "parse", (...e) => {
      if (e.length === 0)
        return this;
      if (e.length === 1) {
        if (e[0] instanceof Be)
          return this.fromCoefficient(e[0].a, e[0].b, e[0].c);
        if (e[0] instanceof H)
          return this.fromEquation(e[0]);
        if (typeof e[0] == "string")
          try {
            const t = new H(e[0]);
            return this.parse(t);
          } catch {
            return this;
          }
      }
      if (e.length === 2 && e.every((t) => t instanceof x)) {
        const t = e;
        if (t[0].asPoint && t[1].asPoint)
          return this.fromPointAndDirection(t[0], new x(t[0], t[1]));
        if (t[0].asPoint && !t[1].asPoint)
          return this.fromPointAndDirection(t[0], t[1]);
      }
      if (e.length === 3) {
        if (e[0] instanceof x && e[1] instanceof x) {
          if (e[2] === "perpendicular")
            return this.fromPointAndNormal(e[0], e[1]);
          if (e[2] === "parallel")
            return this.fromPointAndDirection(e[0], e[1]);
        }
        return e[0] instanceof x && e[1] instanceof Be ? e[2] === "parallel" || e[2] === null ? this.fromPointAndLine(
          e[0],
          e[1],
          "parallel"
          /* Parallel */
        ) : this.fromPointAndLine(
          e[0],
          e[1],
          "perpendicular"
          /* Perpendicular */
        ) : this.fromCoefficient(
          e[0],
          e[1],
          e[2]
        );
      }
      return console.log("Something wrong happened while creating the line"), console.log(e), this;
    });
    h(this, "fromEquation", (e) => {
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
    });
    h(this, "fromCoefficient", (e, t, i) => (a(this, P, new u(e)), a(this, S, new u(t)), a(this, U, new u(i)), a(this, Q, new x(s(this, S).clone(), s(this, P).clone().opposite())), a(this, re, new x(new u().zero(), s(this, U).clone())), a(this, qe, s(this, Q).clone().normal()), this));
    h(this, "fromPointAndDirection", (e, t) => (this.fromCoefficient(
      t.y,
      t.x.clone().opposite(),
      e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)).opposite()
    ), a(this, re, e.clone()), a(this, Q, t.clone()), a(this, qe, s(this, Q).clone().normal()), this));
    h(this, "fromPointAndNormal", (e, t) => this.fromCoefficient(
      t.x,
      t.y,
      e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()
    ));
    h(this, "fromPointAndLine", (e, t, i) => (i === void 0 && (i = "parallel"), i === "parallel" ? this.fromPointAndNormal(e, t.normal) : i === "perpendicular" ? this.fromPointAndNormal(e, t.director) : this));
    h(this, "clone", () => (a(this, P, s(this, P).clone()), a(this, S, s(this, S).clone()), a(this, U, s(this, U).clone()), a(this, Q, s(this, Q).clone()), a(this, re, s(this, re).clone()), a(this, qe, s(this, qe).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    h(this, "isOnLine", (e) => s(this, P).clone().multiply(e.x).add(
      s(this, S).clone().multiply(e.y)
    ).add(s(this, U)).isZero());
    h(this, "isParallelTo", (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height));
    h(this, "isSameAs", (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height));
    h(this, "isPerpendicularTo", (e) => this.d.isNormalTo(e.d));
    h(this, "isVertical", () => this.slope.isInfinity());
    h(this, "simplify", () => {
      const e = G.lcm(s(this, P).denominator, s(this, S).denominator, s(this, U).denominator), t = G.gcd(s(this, P).numerator, s(this, S).numerator, s(this, U).numerator);
      return this.fromCoefficient(
        s(this, P).clone().multiply(e).divide(t),
        s(this, S).clone().multiply(e).divide(t),
        s(this, U).clone().multiply(e).divide(t)
      ), this;
    });
    h(this, "simplifyDirection", () => (s(this, Q).simplify(), this));
    h(this, "intersection", (e) => {
      const t = new V();
      let i = !1, r = !1;
      return s(this, S).isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new u().invalid(), t.y = new u().invalid(), i = !0) : this.isSameAs(e) ? (t.x = new u().invalid(), t.y = new u().invalid(), r = !0) : (t.x = s(this, S).clone().multiply(e.c).subtract(s(this, U).clone().multiply(e.b)).divide(s(this, P).clone().multiply(e.b).subtract(s(this, S).clone().multiply(e.a))), t.y = s(this, P).clone().multiply(e.c).subtract(s(this, U).clone().multiply(e.a)).divide(s(this, S).clone().multiply(e.a).subtract(s(this, P).clone().multiply(e.b)))), {
        point: t,
        hasIntersection: !(i || r),
        isParallel: i,
        isSame: r
      };
    });
    h(this, "getValueAtX", (e) => {
      const t = this.getEquation().isolate("y"), i = new u(e);
      return t instanceof H ? t.right.evaluate({ x: i }) : new u().invalid();
    });
    h(this, "getValueAtY", (e) => {
      const t = this.getEquation().isolate("x"), i = new u(e);
      return t instanceof H ? t.right.evaluate({ y: i }) : new u().invalid();
    });
    return a(this, P, new u().zero()), a(this, S, new u().zero()), a(this, U, new u().zero()), a(this, re, new x()), a(this, Q, new x()), a(this, qe, new x()), a(this, Ae, !0), e.length > 0 && this.parse(...e), this;
  }
  get a() {
    return s(this, P);
  }
  // ------------------------------------------
  // Getter and setter
  set a(e) {
    a(this, P, e);
  }
  get b() {
    return s(this, S);
  }
  set b(e) {
    a(this, S, e);
  }
  get c() {
    return s(this, U);
  }
  set c(e) {
    a(this, U, e);
  }
  get OA() {
    return s(this, re);
  }
  set OA(e) {
    a(this, re, e);
  }
  get d() {
    return s(this, Q);
  }
  set d(e) {
    a(this, Q, e);
  }
  get n() {
    return s(this, qe);
  }
  // ------------------------------------------
  getEquation() {
    const e = new H(new O().parse("xy", s(this, P), s(this, S), s(this, U)), new O("0"));
    return s(this, Ae) ? e.simplify() : e;
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
    return a(this, ye, "canonical"), this;
  }
  get equation() {
    return a(this, ye, "equation"), this;
  }
  get mxh() {
    return a(this, ye, "mxh"), this;
  }
  get parametric() {
    return a(this, ye, "parametric"), this;
  }
  get system() {
    return a(this, ye, "system"), this;
  }
  get tex() {
    const e = s(this, ye);
    switch (a(this, ye, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().tex;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new O().parse("x", this.slope, this.height).tex;
      case "parametric":
      case "system": {
        const t = s(this, Q).clone();
        return s(this, Ae) && t.simplify(), e === "parametric" ? `${x.asTex("x", "y")} = ${x.asTex(s(this, re).x.tex, s(this, re).y.tex)} + k\\cdot ${x.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}
            x &= ${new O(s(this, re).x).add(new M(s(this, Q).x).multiply(new M("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new O(s(this, re).y).add(new M(s(this, Q).y).multiply(new M("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`;
      }
      default: {
        const t = this.getEquation();
        return s(this, P).isNegative() && t.multiply(-1), t.tex;
      }
    }
  }
  get reduceBeforeDisplay() {
    return s(this, Ae);
  }
  set reduceBeforeDisplay(e) {
    a(this, Ae, e);
  }
  get display() {
    const e = s(this, ye);
    switch (a(this, ye, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().display;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new O().parse("x", this.slope, this.height).display;
      case "parametric": {
        const t = s(this, Q).clone();
        return s(this, Ae) && t.simplify(), `((x,y))=((${s(this, re).x.display},${s(this, re).y.display}))+k((${t.x.display},${t.y.display}))`;
      }
      default: {
        const t = this.getEquation();
        return s(this, P).isNegative() && t.multiply(-1), t.display;
      }
    }
  }
  get normal() {
    return new x(s(this, P), s(this, S));
  }
  get director() {
    return s(this, Q).clone();
  }
  get slope() {
    return s(this, P).clone().opposite().divide(s(this, S));
  }
  get height() {
    return s(this, U).clone().opposite().divide(s(this, S));
  }
  fromPoints(e, t) {
    return this.fromPointAndDirection(e, new x(e, t));
  }
  distanceTo(e) {
    const t = e.x.clone().multiply(s(this, P)).add(e.y.clone().multiply(s(this, S))).add(s(this, U)).abs(), i = this.normal.normSquare;
    if (i.isZero())
      return {
        value: NaN,
        tex: "Not a line",
        fraction: new u().infinite()
      };
    const r = t.value / Math.sqrt(i.value), n = t.clone().divide(i.clone().sqrt());
    return i.isSquare() ? {
      value: r,
      tex: n.tex,
      fraction: n
    } : {
      value: r,
      tex: `\\frac{${t.tex}}{\\sqrt{${i.tex}}}`,
      fraction: n
    };
  }
  hitSegment(e, t) {
    const i = this.intersection(
      new Be().fromPoints(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) : !1;
  }
  // ------------------------------------------
  // Special functions
  // ------------------------------------------
  canonicalAsFloatCoefficient(e) {
    e === void 0 && (e = 2);
    let t = "";
    return s(this, P).isZero() || (s(this, P).isOne() ? t = "x" : s(this, P).clone().opposite().isOne() ? t = "-x" : t = s(this, P).value.toFixed(e) + "x"), s(this, S).isZero() || (s(this, S).isPositive() && (t += "+"), t += s(this, S).value.toFixed(e) + "y"), s(this, U).isZero() || (s(this, U).isPositive() && (t += "+"), t += s(this, U).value.toFixed(e)), t + "=0";
  }
};
Ae = new WeakMap(), P = new WeakMap(), S = new WeakMap(), U = new WeakMap(), re = new WeakMap(), Q = new WeakMap(), qe = new WeakMap(), ye = new WeakMap(), // A line is defined as the canonical form
h(Be, "PERPENDICULAR", "perpendicular"), h(Be, "PARALLEL", "parallel");
let D = Be;
var ne, j, be, St, Bt, Rt, oe, vi, pt, bi, xi, Ei, Qt;
const zt = class zt {
  constructor(...e) {
    m(this, oe);
    m(this, ne);
    m(this, j);
    m(this, be);
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    h(this, "relativePosition", (e) => {
      if (s(this, ne) === void 0 || s(this, j) === void 0)
        throw new Error("Circle not defined");
      const t = e.distanceTo(s(this, ne)), i = Math.sqrt(s(this, j).value);
      return t.value - i > 1e-10 ? 0 : Math.abs(t.value - i) < 1e-10 ? 1 : 2;
    });
    h(this, "lineIntersection", (e) => {
      const t = [];
      if (s(this, be) === void 0)
        return [];
      const i = s(this, be).clone(), r = e.getEquation().clone().isolate("x"), n = e.getEquation().clone().isolate("y");
      return r instanceof H && n instanceof H && (i.replaceBy("y", n.right).simplify(), i.solve()), t;
    });
    h(this, "tangents", (e) => e instanceof u ? s(this, Rt).call(this, e) : this.isPointOnCircle(e) ? s(this, St).call(this, e) : s(this, ne) !== void 0 && s(this, ne).distanceTo(e).value > this.radius.value ? s(this, Bt).call(this, e) : (console.log("No tangents as the point is inside !"), []));
    h(this, "isPointOnCircle", (e) => {
      var t;
      return ((t = s(this, be)) == null ? void 0 : t.test({ x: e.x, y: e.y })) ?? !1;
    });
    h(this, "getPointsOnCircle", (e) => {
      const t = G.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), i = [];
      return t.forEach((r) => {
        for (const n of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
          i.push(
            new V(
              this.center.x.clone().add(n[0] * r[0]),
              this.center.y.clone().add(n[1] * r[1])
            )
          );
      }), i;
    });
    m(this, St, (e) => {
      const t = new x(this.center, e);
      return [new D(e, t, wi.Perpendicular)];
    });
    m(this, Bt, (e) => {
      const t = this.center.x.clone().subtract(e.x), i = this.center.y.clone().subtract(e.y), r = new O("x"), n = new O("x^2+1");
      return r.multiply(t).subtract(i).pow(2), n.multiply(this.squareRadius), new H(r, n).solve().map((d) => {
        let f;
        const g = new H("y", "x");
        return d.exact instanceof u ? (f = e.x.clone().opposite().multiply(d.exact).add(e.y), g.right.multiply(d.exact).add(f)) : (f = e.x.clone().opposite().multiply(d.value).add(e.y), g.right.multiply(d.value).add(f)), new D(g);
      });
    });
    m(this, Rt, (e) => {
      const t = e.numerator, i = -e.denominator, r = this.center.x.clone(), n = this.center.y.clone(), l = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), c = r.clone().multiply(t).opposite().subtract(n.clone().multiply(i)).add(l.clone().sqrt()), d = r.clone().multiply(t).opposite().subtract(n.clone().multiply(i)).subtract(l.clone().sqrt());
      return [new D(t, i, c), new D(t, i, d)];
    });
    e.length > 0 && this.parse(...e);
  }
  get center() {
    return s(this, ne) ?? new V();
  }
  get squareRadius() {
    return s(this, j) ?? new u(0);
  }
  get cartesian() {
    if (s(this, be) === void 0)
      throw new Error("Cartesian equation not defined");
    return s(this, be);
  }
  get radius() {
    return s(this, j) === void 0 ? { tex: "", display: "", value: 0 } : s(this, j).isSquare() ? {
      tex: s(this, j).clone().sqrt().tex,
      display: s(this, j).clone().sqrt().display,
      value: s(this, j).clone().sqrt().value
    } : {
      tex: `\\sqrt{${s(this, j).tex}}`,
      display: `sqrt(${s(this, j).display})`,
      value: s(this, j).clone().sqrt().value
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
    return new zt(
      this.center.clone(),
      this.squareRadius.clone(),
      !0
    );
  }
  setRadius(e, t) {
    return t ? a(this, j, new u(e)) : a(this, j, new u(e).pow(2)), A(this, oe, pt).call(this), this;
  }
  parse(...e) {
    return A(this, oe, vi).call(this), typeof e[0] == "string" ? A(this, oe, Qt).call(this, new H(e[0])) : e[0] instanceof H ? A(this, oe, Qt).call(this, e[0]) : e[0] instanceof zt ? A(this, oe, bi).call(this, e[0]) : e[0] instanceof V && e.length > 1 && (e[1] instanceof V ? e[2] instanceof V || A(this, oe, Ei).call(this, e[0], e[1]) : (e[1] instanceof u || typeof e[1] == "number") && A(this, oe, xi).call(this, e[0], e[1], typeof e[2] == "boolean" ? e[2] : !1)), A(this, oe, pt).call(this), this;
  }
  // private _parseThroughtThreePoints(A: Point, B: Point, C: Point): this {
  //     const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(),
  //         mAC = T.remarquables.mediators.AC.clone()
  //     this.parse(mAB.intersection(mAC).point, A)
  //     return this
  // }
};
ne = new WeakMap(), j = new WeakMap(), be = new WeakMap(), St = new WeakMap(), Bt = new WeakMap(), Rt = new WeakMap(), oe = new WeakSet(), vi = function() {
  return a(this, ne, void 0), a(this, j, void 0), a(this, be, void 0), this;
}, pt = function() {
  a(this, be, new H(
    new O(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
    new O(this.squareRadius.display)
  ).moveLeft());
}, bi = function(e) {
  return a(this, ne, e.center.clone()), a(this, j, e.squareRadius.clone()), A(this, oe, pt).call(this), this;
}, xi = function(e, t, i) {
  return a(this, ne, e.clone()), i ? a(this, j, new u(t)) : a(this, j, new u(t).pow(2)), this;
}, Ei = function(e, t) {
  return a(this, ne, e.clone()), a(this, j, new x(s(this, ne), t).normSquare), this;
}, Qt = function(e) {
  if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
    const t = e.left.monomByDegree(2, "x"), i = e.left.monomByDegree(2, "y");
    let r, n, l;
    t.coefficient.isEqual(i.coefficient) ? (e.divide(t.coefficient), r = e.left.monomByDegree(1, "x"), n = e.left.monomByDegree(1, "y"), l = e.left.monomByDegree(0), a(this, ne, new V(r.coefficient.clone().divide(2).opposite(), n.coefficient.clone().divide(2).opposite())), a(this, j, l.coefficient.clone().opposite().add(s(this, ne).x.clone().pow(2)).add(s(this, ne).y.clone().pow(2)))) : (a(this, ne, void 0), a(this, j, void 0));
  }
  return this;
};
let gt = zt;
var X, K, J, Ye, xe, at, Lt, lt, Me, Dt, Qe;
const Vt = class Vt {
  constructor(...e) {
    m(this, X);
    m(this, K);
    m(this, J);
    m(this, Ye);
    m(this, xe);
    m(this, at);
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
    h(this, "parse", (...e) => {
      if (e.length === 6) {
        const t = e.map((i) => new u(i));
        if (t.some((i) => i.isNaN()))
          throw new Error("One of the values is not a valid number");
        return this.parse(
          new x(t[0], t[1]),
          new x(t[2], t[3]),
          new x(t[4], t[5])
        );
      } else if (e.length === 3) {
        if (e.every((t) => typeof t == "string"))
          return this.parse(
            ...e.map((t) => new D(t))
          );
        if (e.every((t) => t instanceof D)) {
          const t = e[0].clone(), i = e[1].clone(), r = e[2].clone();
          a(this, Ye, { AB: t, BC: i, AC: r });
          let n = t.intersection(i);
          if (n.hasIntersection)
            a(this, K, n.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (n = i.intersection(r), n.hasIntersection)
            a(this, J, n.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (n = r.intersection(t), n.hasIntersection)
            a(this, X, n.point.clone());
          else
            throw new Error("Lines do not intersect !");
        } else e.every((t) => t instanceof V) && (a(this, X, e[0].clone()), a(this, K, e[1].clone()), a(this, J, e[2].clone()), a(this, Ye, {
          AB: new D(s(this, X), s(this, K)),
          BC: new D(s(this, K), s(this, J)),
          AC: new D(s(this, X), s(this, J))
        }));
      } else if (e.length === 1 && e[0] instanceof Vt)
        return e[0].clone();
      return s(this, Lt).call(this), this;
    });
    /**
     * Clone the Triangle class
     */
    h(this, "clone", () => new Vt(
      s(this, X).clone(),
      s(this, K).clone(),
      s(this, J).clone()
    ));
    // ------------------------------------------
    // Triangle operations and properties
    // ------------------------------------------
    /**
     * Generate the Line object for the three segments of the triangle
     */
    m(this, Lt, () => {
      s(this, X).asPoint = !0, s(this, K).asPoint = !0, s(this, J).asPoint = !0, a(this, xe, {
        AB: new V().middleOf(s(this, X), s(this, K)),
        AC: new V().middleOf(s(this, X), s(this, J)),
        BC: new V().middleOf(s(this, K), s(this, J))
      }), a(this, at, s(this, Dt).call(this));
    });
    /**
     * Get the Vector2D class for the given name
     * @param ptName
     */
    m(this, lt, (e) => {
      switch (e.toUpperCase()) {
        case "A":
          return s(this, X);
        case "B":
          return s(this, K);
        case "C":
          return s(this, J);
      }
      return s(this, X);
    });
    /**
     * Get the vector for the segment given by name.
     * @param ptName1
     * @param ptName2
     */
    m(this, Me, (e, t) => new x(
      s(this, lt).call(this, e),
      s(this, lt).call(this, t)
    ));
    m(this, Dt, () => {
      const e = {
        A: new D().fromPoints(s(this, X), s(this, xe).BC),
        B: new D().fromPoints(s(this, K), s(this, xe).AC),
        C: new D().fromPoints(s(this, J), s(this, xe).AB),
        intersection: null
      }, t = {
        AB: new D().fromPointAndNormal(s(this, xe).AB, new x(s(this, X), s(this, K)).normal()),
        AC: new D().fromPointAndNormal(s(this, xe).AC, new x(s(this, X), s(this, J)).normal()),
        BC: new D().fromPointAndNormal(s(this, xe).BC, new x(s(this, K), s(this, J)).normal()),
        intersection: null
      }, i = {
        A: new D().fromPointAndNormal(s(this, X), new x(s(this, K), s(this, J)).normal()),
        B: new D().fromPointAndNormal(s(this, K), new x(s(this, X), s(this, J)).normal()),
        C: new D().fromPointAndNormal(s(this, J), new x(s(this, X), s(this, K)).normal()),
        intersection: null
      }, r = s(this, Qe).call(this, "A"), n = s(this, Qe).call(this, "B"), l = s(this, Qe).call(this, "C"), c = {
        A: r.internal,
        B: n.internal,
        C: n.internal,
        intersection: null
      }, d = {
        A: r.external,
        B: n.external,
        C: l.external,
        intersection: null
      }, f = {
        medians: e,
        mediators: t,
        heights: i,
        bisectors: c,
        externalBisectors: d
      };
      return f.medians.intersection = f.medians.A.intersection(f.medians.B).point, f.mediators.intersection = f.mediators.AB.intersection(f.mediators.BC).point, f.heights.intersection = f.heights.A.intersection(f.heights.B).point, f.bisectors.intersection = f.bisectors.A.intersection(f.bisectors.B).point, f;
    });
    m(this, Qe, (e) => {
      const t = this.lines;
      let i, r;
      if (e === "A" ? (i = t.AB, r = t.AC) : e === "B" ? (i = t.AB, r = t.BC) : e === "C" && (i = t.BC, r = t.AC), i === void 0 || r === void 0)
        throw new Error(`The point ${e} does not exist`);
      const n = i.n.simplify().norm, l = r.n.simplify().norm, c = i.getEquation().multiply(l), d = r.getEquation().multiply(n), f = new D(c.clone().subtract(d).simplify()), g = new D(d.clone().subtract(c).simplify());
      return e === "A" ? f.hitSegment(this.B, this.C) ? { internal: f, external: g } : { internal: g, external: f } : e === "B" ? f.hitSegment(this.A, this.C) ? { internal: f, external: g } : { internal: g, external: f } : e === "C" ? f.hitSegment(this.B, this.A) ? { internal: f, external: g } : { internal: g, external: f } : { internal: f, external: g };
    });
    return e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setters
  // ------------------------------------------
  get A() {
    return s(this, X);
  }
  get B() {
    return s(this, K);
  }
  get C() {
    return s(this, J);
  }
  get AB() {
    return s(this, Me).call(this, "A", "B");
  }
  get BA() {
    return s(this, Me).call(this, "B", "A");
  }
  get BC() {
    return s(this, Me).call(this, "B", "C");
  }
  get CB() {
    return s(this, Me).call(this, "C", "B");
  }
  get AC() {
    return s(this, Me).call(this, "A", "C");
  }
  get CA() {
    return s(this, Me).call(this, "C", "A");
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
    return s(this, Ye);
  }
  get remarquables() {
    return s(this, at);
  }
};
X = new WeakMap(), K = new WeakMap(), J = new WeakMap(), Ye = new WeakMap(), xe = new WeakMap(), at = new WeakMap(), Lt = new WeakMap(), lt = new WeakMap(), Me = new WeakMap(), Dt = new WeakMap(), Qe = new WeakMap();
let Kt = Vt;
var B, W;
const tt = class tt {
  constructor(e, t) {
    // ax + by + c = 0
    m(this, B, new V());
    m(this, W, new x());
    h(this, "clone", () => (a(this, W, s(this, W).clone()), a(this, B, s(this, B).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    h(this, "isOnLine", (e) => !1);
    h(this, "isParallelTo", (e) => {
      throw new Error("Method not implemented.");
    });
    h(this, "isSameAs", (e) => {
      throw new Error("Method not implemented.");
    });
    h(this, "isPerpendicularTo", (e) => {
      throw new Error("Method not implemented.");
    });
    h(this, "isVertical", () => {
      throw new Error("Method not implemented.");
    });
    h(this, "simplify", () => {
      throw new Error("Method not implemented.");
    });
    h(this, "intersection", (e) => {
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
    h(this, "randomPoint", (e = 5) => {
      const t = s(this, B).clone(), i = new u(Y(e, !1));
      return new V(
        t.x.clone().add(s(this, W).x.clone().multiply(i)),
        t.y.clone().add(s(this, W).y.clone().multiply(i)),
        t.z.clone().add(s(this, W).z.clone().multiply(i))
      );
    });
    return a(this, B, e.clone()), a(this, W, t.asPoint ? new x(e, t) : t.clone()), this;
  }
  get OA() {
    return s(this, B);
  }
  set OA(e) {
    a(this, B, e);
  }
  get point() {
    return s(this, B).clone();
  }
  get d() {
    return s(this, W);
  }
  set d(e) {
    a(this, W, e);
  }
  get tex() {
    return {
      parametric: `${x.asTex("x", "y", "z")} = ${x.asTex(s(this, B).x.tex, s(this, B).y.tex, s(this, B).z.tex)} + k\\cdot ${x.asTex(s(this, W).x.tex, s(this, W).y.tex, s(this, W).z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new O(s(this, B).x).add(new M(s(this, W).x).multiply(new M("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new O(s(this, B).y).add(new M(s(this, W).y).multiply(new M("k"))).reorder("k", !0).tex}\\\\
    z &= ${new O(s(this, B).z).add(new M(s(this, W).z).multiply(new M("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
      cartesian: `\\frac{ ${new O("x", 1, s(this, B).x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new O("y", 1, s(this, B).y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new O("z", 1, s(this, B).z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
    };
  }
  get display() {
    const e = s(this, B).x.display, t = s(this, B).y.display, i = s(this, B).z.display, r = this.direction.simplify(), n = r.x.display, l = r.y.display, c = r.z.display;
    return {
      parametric: `${x.asDisplay("x", "y", "z")} = ${x.asDisplay(s(this, B).x.display, s(this, B).y.display, s(this, B).z.display)} + k\\cdot ${x.asDisplay(s(this, W).x.display, s(this, W).y.display, s(this, W).z.display)}`,
      system: "",
      cartesian: `(x-${e})/${n} = (y-${t})/${l} = (z-${i})/${c}`
    };
  }
  get direction() {
    return s(this, W).clone();
  }
  distanceTo(e) {
    const t = new x(s(this, B), e), i = this.direction, r = this.direction.normSquare, n = t.cross(i).normSquare, l = n.clone().divide(r), c = l.clone().sqrt();
    return console.log("CROSS", t.cross(i).display), {
      value: Math.sqrt(l.value),
      fraction: l.clone().sqrt(),
      tex: c.isExact() ? c.tex : `\\sqrt{${l.tex}}`
    };
  }
  hitSegment(e, t) {
    const i = this.intersection(
      new tt(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) && i.point.z.value >= Math.min(e.z.value, t.z.value) && i.point.z.value <= Math.max(e.z.value, t.z.value) : !1;
  }
};
B = new WeakMap(), W = new WeakMap(), // A line is defined as the canonical form
h(tt, "PERPENDICULAR", "perpendicular"), h(tt, "PARALLEL", "parallel");
let yt = tt;
var Ee, De;
const ni = class ni {
  constructor(e) {
    m(this, Ee, new x(0, 0, 1));
    m(this, De, new V(0, 0, 0));
    return e && this.parse(e), this;
  }
  get normal() {
    return s(this, Ee);
  }
  set normal(e) {
    a(this, Ee, e), s(this, Ee).asPoint = !1;
  }
  get point() {
    return s(this, De);
  }
  set point(e) {
    a(this, De, e), s(this, De).asPoint = !0;
  }
  get a() {
    return s(this, Ee).x;
  }
  get b() {
    return s(this, Ee).y;
  }
  get c() {
    return s(this, Ee).z;
  }
  get d() {
    return s(this, Ee).dot(s(this, De)).opposite();
  }
  get tex() {
    return new H(
      new O("xyz", this.a, this.b, this.c, this.d),
      new O(0)
    ).reduce().tex;
  }
  parse(e) {
    var t, i, r;
    if (e.point && e.normal) {
      this.point = e.point, this.normal = e.normal;
      return;
    }
    if (e.point && ((t = e.directions) == null ? void 0 : t.length) === 2) {
      this.point = e.point;
      const [n, l] = e.directions;
      this.normal = n.cross(l);
      return;
    }
    if (e.equation) {
      const n = e.equation.moveLeft().reduce().left, l = n.monomByLetter("x").coefficient, c = n.monomByLetter("y").coefficient, d = n.monomByLetter("z").coefficient, f = n.monomByDegree(0).coefficient;
      this.normal = new x(l, c, d), l.isNotZero() ? this.point = new V(f.clone().divide(l).opposite(), 0, 0) : c.isNotZero() ? this.point = new V(0, f.clone().divide(c).opposite(), 0) : this.point = new V(0, 0, f.clone().divide(d).opposite());
      return;
    }
    if (((i = e.points) == null ? void 0 : i.length) === 3 && e.points.every((n) => n instanceof x)) {
      const n = e.points[0], l = e.points[1], c = e.points[2], d = new x(n, l), f = new x(n, c);
      this.normal = d.cross(f), this.point = n;
      return;
    }
    if (((r = e.coefficients) == null ? void 0 : r.length) === 4) {
      const [n, l, c, d] = e.coefficients;
      this.normal = new x(n, l, c), this.point = new V(0, 0, -d);
      return;
    }
  }
  angle(e, t, i) {
    if (e instanceof ni)
      return this.normal.angle(e.normal, t, i);
    let r;
    if (e instanceof x) {
      if (e.dimension !== 3)
        throw new Error("Vector is not 3D");
      r = e;
    } else
      r = e.direction;
    return (i ? Math.PI / 2 : 90) - this.normal.angle(r, !0, i);
  }
  distanceTo(e) {
    return this.normal.dot(e).add(this.d).abs().value / this.normal.norm;
  }
  intersectWithLine(e) {
    const { point: t, direction: i } = e, r = this.normal.dot(t).add(this.d).divide(this.normal.dot(i).opposite());
    return t.clone().add(i.clone().multiplyByScalar(r));
  }
  intersectWithPlane(e) {
    throw this.normal.cross(e.normal), new V(0, 0, 0), new Error("Intersection with plane  not yet implemented !");
  }
  isPointOnPlane(e) {
    return this.normal.dot(e).add(this.d).isZero();
  }
};
Ee = new WeakMap(), De = new WeakMap();
let Jt = ni;
var Ne;
class Ki {
  constructor(...e) {
    m(this, Ne, []);
    return a(this, Ne, e), this;
  }
  get values() {
    return s(this, Ne);
  }
  get array() {
    return s(this, Ne).map((e) => e.array);
  }
  get dimension() {
    return [s(this, Ne).length, s(this, Ne)[0].dimension];
  }
  isSquare() {
    return s(this, Ne).length === s(this, Ne)[0].dimension;
  }
  determinant() {
    if (!this.isSquare())
      throw new Error("Matrix is not square");
    return Xi(...this.values);
  }
}
Ne = new WeakMap();
function wt(o) {
  const e = Object.assign(
    {
      negative: !0,
      max: 10,
      reduced: !0,
      zero: !0,
      natural: !1
    },
    o
  ), t = new u();
  if (e.negative ? t.numerator = Y(e.max, e.zero) : t.numerator = ue(e.zero ? 0 : 1, e.max), e.natural)
    t.denominator = 1;
  else {
    let i = 0;
    for (; t.isRelative() && i < 10; )
      t.denominator = ue(1, e.max), i++;
  }
  return e.reduced ? t.reduce() : t;
}
function Ni(o) {
  const e = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    o
  ), t = new M();
  if (t.coefficient = wt({
    zero: e.zero,
    reduced: !0,
    natural: !e.fraction
  }), e.letters.length > 1) {
    for (const i of e.letters.split(""))
      t.setLetter(i, 0);
    for (let i = 0; i < e.degree; i++) {
      const r = si(e.letters.split(""));
      t.setLetter(r, t.degree(r).clone().add(1));
    }
  } else
    t.setLetter(e.letters, e.degree);
  return t;
}
const Ji = {
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
function Ti(o) {
  const e = Object.assign(
    Ji,
    o
  ), t = new O().empty();
  let i;
  for (let r = e.degree; r >= 0; r--)
    i = Ni({
      letters: e.letters,
      degree: r,
      fraction: e.fraction,
      zero: r === e.degree ? !1 : e.allowNullMonom
    }), e.unit && e.degree === r && i.coefficient.one(), t.add(i);
  if (e.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposite(), e.numberOfMonoms && e.numberOfMonoms > 0 && e.numberOfMonoms < t.length)
    for (; t.length > e.numberOfMonoms; ) {
      const r = ue(1, t.length - 1);
      t.monoms.splice(r, 1);
    }
  return t;
}
function _i(o) {
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
    o
  ), t = new O().one();
  for (let i = 0; i < e.degree; i++) {
    const r = Ti({
      degree: 1,
      unit: e.unit,
      fraction: e.fraction,
      letters: e.letters,
      zero: e.zero
    });
    t.multiply(r);
  }
  return new H(t, 0);
}
function _t(o) {
  const e = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    o
  ), t = e.axis === "x", i = e.axis === "y", r = e.fraction ? wt({ max: e.max, zero: t }) : new u(Y(e.max, t)), n = e.fraction ? wt({ max: e.max, zero: i }) : new u(Y(e.max, i));
  return Number(e.quadrant) === 1 && (r.abs(), n.abs()), Number(e.quadrant) === 2 && (r.isPositive() && r.opposite(), n.isNegative() && n.opposite()), Number(e.quadrant) === 3 && (r.isPositive() && r.opposite(), n.isPositive() && n.opposite()), Number(e.quadrant) === 4 && (r.isNegative() && r.opposite(), n.isPositive() && n.opposite()), new V(r, n);
}
function es(o) {
  const e = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    o
  ), t = _t(e.center);
  let i, r;
  return e.pointsOnCircle === 8 ? (i = ue(1, 3), r = i ** 2 + (i + 1) ** 2) : r = ue(1, 20), new gt(t, r, !0);
}
function ts(o) {
  const e = Object.assign(
    {
      A: {
        x: Y(10),
        y: Y(10)
      }
    },
    o
  ), t = new x(
    Y(10),
    Y(10)
  );
  for (; t.isNull; )
    t.x = Y(10), t.y = Y(10);
  return e.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposite() : e.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposite(), new D(new x(e.A.x, e.A.y), t);
}
function is(o) {
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
    o
  ), t = new V(e.A.x, e.A.y, e.A.z), i = new x(e.direction.x, e.direction.y, e.direction.z);
  return new yt(t, i);
}
const ss = {
  equation: (o) => _i(o),
  polynom: (o) => Ti(o),
  monom: (o) => Ni(o),
  fraction: (o) => wt(o),
  number: (o, e, t) => ue(o, e, t),
  numberSym: (o, e) => Y(o, e),
  prime: (o) => Yi(o),
  bool: (o) => gi(o),
  array: (o, e) => Qi(o, e),
  item: (o) => si(o),
  shuffle: (o) => yi(o),
  line: (o) => ts(o),
  line3: (o) => is(o),
  vector: (o) => _t(o),
  point: (o) => {
    const e = _t(o);
    return e.asPoint = !0, e;
  },
  circle: (o) => es(o)
};
var Te, ct, ei;
class rs {
  /**
   *
   * @param {string} value (optional) Default polynom to parse on class creation
   */
  constructor(e) {
    m(this, ct);
    m(this, Te);
    h(this, "parse", (e) => (a(this, Te, new Zt(Re.SET).parse(e).rpn), this));
    return a(this, Te, []), e !== void 0 && this.parse(e), this;
  }
  evaluate(e) {
    this.variables.forEach((i) => {
      Object.hasOwn(e, i) || (e[i] = !1);
    });
    const t = [];
    for (const i of s(this, Te))
      if (console.log(i), i.tokenType === "variable")
        t.push(e[i.token]);
      else if (i.tokenType === "operation")
        if (i.token === "!")
          if (t.length >= 1) {
            const r = t.pop();
            t.push(!r);
          } else
            return !1;
        else {
          const r = t.pop(), n = t.pop();
          if (r !== void 0 && n !== void 0)
            switch (i.token) {
              case "&":
                t.push(r && n);
                break;
              case "|":
                t.push(r || n);
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
    return s(this, Te);
  }
  get tex() {
    const e = [];
    for (const t of s(this, Te))
      if (t.tokenType === "variable")
        e.push(t);
      else
        switch (t.token) {
          case "&":
            if (e.length >= 2) {
              const i = e.pop(), r = e.pop();
              i && r && (r.tokenType === "mix" && (r.token = `( ${r.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${r.token} \\cap ${i.token}`, tokenType: "mix" }));
            }
            break;
          case "|":
            if (e.length >= 2) {
              const i = e.pop(), r = e.pop();
              i && r && (r.tokenType === "mix" && (r.token = `( ${r.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${r.token} \\cup ${i.token}`, tokenType: "mix" }));
            }
            break;
          case "-":
            if (e.length >= 2) {
              const i = e.pop(), r = e.pop();
              i && r && (r.tokenType === "mix" && (r.token = `( ${r.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${r.token} \\setminus ${i.token}`, tokenType: "mix" }));
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
    return s(this, Te).filter((e) => e.tokenType === "variable").map((e) => e.token);
  }
  vennAB() {
    return A(this, ct, ei).call(this, {
      A: ["A", "AB"],
      B: ["B", "AB"]
    }, ["A", "B", "AB", "E"]);
  }
  vennABC() {
    return A(this, ct, ei).call(this, {
      A: ["A", "AB", "AC", "ABC"],
      B: ["B", "AB", "BC", "ABC"],
      C: ["C", "AC", "BC", "ABC"]
    }, ["A", "B", "C", "AB", "AC", "BC", "ABC", "E"]);
  }
}
Te = new WeakMap(), ct = new WeakSet(), ei = function(e, t) {
  const i = [];
  let r;
  if (t === void 0) {
    r = /* @__PURE__ */ new Set();
    for (const n in e)
      r = /* @__PURE__ */ new Set([
        ...r,
        ...e[n] ?? []
      ]);
  } else
    r = new Set(t);
  for (const n of s(this, Te))
    if (n.tokenType === "variable")
      e[n.token] === void 0 ? i.push(/* @__PURE__ */ new Set()) : i.push(new Set(e[n.token]));
    else
      switch (n.token) {
        case "&":
          if (i.length >= 2) {
            const l = i.pop(), c = i.pop();
            c && l && i.push(new Set([...c].filter((d) => l.has(d))));
          }
          break;
        case "|":
          if (i.length >= 2) {
            const l = i.pop(), c = i.pop();
            c && l && i.push(/* @__PURE__ */ new Set([...c, ...l]));
          }
          break;
        case "-":
          if (i.length >= 2) {
            const l = i.pop(), c = i.pop();
            c && l && i.push(new Set([...c].filter((d) => !l.has(d))));
          }
          break;
        case "!":
          if (i.length >= 1) {
            const l = i.pop();
            l && i.push(new Set([...r].filter((c) => !l.has(c))));
          }
          break;
      }
  return [...i[0]].sort();
};
const ns = {
  Vector: x,
  Point: V,
  Line: D,
  Triangle: Kt,
  Circle: gt,
  Line3: yt,
  Plane3: Jt
}, hs = {
  Numeric: G,
  Fraction: u,
  Root: ut,
  Monom: M,
  Polynom: O,
  Equation: H,
  Matrix: Ki,
  LinearSystem: Yt,
  Factor: z,
  PolyFactor: Ht,
  LogicalSet: rs,
  Random: ss,
  Geometry: ns,
  NumExp: ji
};
export {
  hs as default
};
