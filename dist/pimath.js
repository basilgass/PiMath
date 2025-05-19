var Ki = Object.defineProperty;
var Ti = (o) => {
  throw TypeError(o);
};
var Ji = (o, e, t) => e in o ? Ki(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var a = (o, e, t) => Ji(o, typeof e != "symbol" ? e + "" : e, t), hi = (o, e, t) => e.has(o) || Ti("Cannot " + t);
var s = (o, e, t) => (hi(o, e, "read from private field"), t ? t.call(o) : e.get(o)), p = (o, e, t) => e.has(o) ? Ti("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), h = (o, e, t, i) => (hi(o, e, "write to private field"), i ? i.call(o, t) : e.set(o, t), t), q = (o, e, t) => (hi(o, e, "access private method"), t);
function _i(o) {
  const e = Ci(o), t = [];
  let i, r;
  for (; e.length > 0; )
    i = e.shift() ?? 1, r = (e.length > 0 ? e.pop() : +i) ?? 1, t.push([i, r]);
  return t;
}
function es(...o) {
  const e = xi(...o);
  return o.map((t) => t / e);
}
function Ci(o) {
  const e = Math.abs(o), t = Math.sqrt(e), i = [];
  for (let r = 1; r <= t; r++)
    o % r === 0 && (i.push(r), i.push(e / r));
  return i.sort(function(r, n) {
    return r - n;
  }), [...new Set(i)];
}
function xi(...o) {
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
function ts(...o) {
  return o.reduce(function(e, t) {
    return Math.abs(e * t / xi(e, t));
  });
}
function is(o, e = 3) {
  return +o.toFixed(e);
}
function ss(o) {
  if (Number.isSafeInteger(o) || o.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function rs(o) {
  const e = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return o === void 0 ? e : e.slice(0, Math.min(e.length, o));
}
function ns(o, e) {
  const t = [], i = e === !0 ? +o : o ** 2;
  for (let r = 0; r <= o; r++)
    for (let n = 0; n <= o; n++)
      r ** 2 + n ** 2 === i && t.push([r, n, o]);
  return t;
}
function os(o, e = 2) {
  return +`${Math.round(+`${o}e${e}`)}e-${e}`;
}
const W = {
  decompose: _i,
  dividers: Ci,
  divideNumbersByGCD: es,
  gcd: xi,
  lcm: ts,
  numberCorrection: is,
  periodic: ss,
  primes: rs,
  pythagoreanTripletsWithTarget: ns,
  round: os
};
var wt, E, y, Ze;
const B = class B {
  constructor(e, t) {
    p(this, wt, !1);
    p(this, E, 1);
    p(this, y, 1);
    p(this, Ze, "frac");
    // ------------------------------------------
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    a(this, "parse", (e, t) => {
      let i;
      if (e === "")
        return h(this, y, 0), h(this, E, 1), this;
      switch (typeof e) {
        case "string":
          if (i = e.split("/"), i.length > 2)
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (i.map((r) => r === "" || isNaN(Number(r))).includes(!0))
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (i.length === 1)
            return this.parse(+i[0]);
          i.length === 2 ? i[1] === "0" ? (h(this, y, NaN), h(this, E, 1)) : (h(this, y, +i[0]), h(this, E, +i[1])) : (h(this, y, NaN), h(this, E, 1));
          break;
        case "number":
          if (Number.isSafeInteger(e))
            h(this, y, +e), t === void 0 || !Number.isSafeInteger(t) ? h(this, E, 1) : h(this, E, +t);
          else {
            const [, r] = e.toString().split("."), n = r ? r.length : 0;
            t === void 0 ? (h(this, y, e * Math.pow(10, n)), h(this, E, Math.pow(10, n))) : Number.isSafeInteger(t) && (h(this, y, e * Math.pow(10, n) - Math.floor(e * Math.pow(10, n - t))), this.denominator = Math.pow(10, n) - Math.pow(10, n - t)), this.reduce();
          }
          break;
        case "object":
          e instanceof B && (h(this, y, +e.numerator), h(this, E, +e.denominator));
          break;
      }
      return this;
    });
    a(this, "clone", () => {
      const e = new B();
      return e.numerator = +s(this, y), e.denominator = +s(this, E), e;
    });
    a(this, "abs", () => (h(this, y, Math.abs(s(this, y))), h(this, E, Math.abs(s(this, E))), this));
    a(this, "add", (e) => {
      if (e instanceof B) {
        const t = s(this, y), i = s(this, E);
        h(this, y, t * e.denominator + e.numerator * i), h(this, E, i * e.denominator);
      } else
        return this.add(new B(e));
      return this.reduce();
    });
    a(this, "amplify", (e) => (Number.isSafeInteger(e) && (h(this, y, s(this, y) * e), h(this, E, s(this, E) * e)), this));
    /**
     * Simple function to determine if it's a fraction
     */
    a(this, "areEquals", (...e) => e.every((t) => t.isEqual(e[0])));
    // ------------------------------------------
    /**
     * Compare the current coefficient with another coefficient
     * @param F (Coefficient) The coefficient to _compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    a(this, "compare", (e, t) => {
      t === void 0 && (t = "=");
      let i;
      switch (e instanceof B ? i = e.clone() : i = new B(e), t) {
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
    a(this, "divide", (e) => {
      const t = new B(e);
      if (t.numerator === 0)
        return new B().infinite();
      const i = +s(this, y), r = +s(this, E);
      return h(this, y, i * t.denominator), h(this, E, r * t.numerator), this.reduce();
    });
    a(this, "infinite", () => (h(this, y, 1 / 0), h(this, E, 1), this));
    a(this, "invalid", () => (h(this, y, NaN), h(this, E, 1), this));
    a(this, "inverse", () => {
      const e = +s(this, y);
      return h(this, y, +s(this, E)), h(this, E, e), this;
    });
    a(this, "isApproximative", () => s(this, wt) || s(this, y).toString().length >= 15 && s(this, E).toString().length >= 15);
    a(this, "isEqual", (e) => this.compare(e, "="));
    a(this, "isEven", () => this.isRelative() && this.value % 2 === 0);
    a(this, "isExact", () => !this.isApproximative());
    a(this, "isFinite", () => !this.isInfinity() && !this.isNaN());
    a(this, "isGeq", (e) => this.compare(e, ">="));
    a(this, "isGreater", (e) => this.compare(e, ">"));
    a(this, "isInfinity", () => Math.abs(s(this, y)) === 1 / 0);
    a(this, "isInverted", (e) => this.isEqual(new B().one().divide(e.clone())));
    a(this, "isLeq", (e) => this.compare(e, "<="));
    /* Compare shortcuts */
    a(this, "isLesser", (e) => this.compare(e, "<"));
    a(this, "isNaN", () => isNaN(s(this, y)));
    a(this, "isNatural", () => this.isRelative() && this.isPositive());
    a(this, "isNegative", () => this.sign() === -1);
    a(this, "isNegativeOne", () => s(this, y) === -1 && s(this, E) === 1);
    a(this, "isNotEqual", (e) => this.compare(e, "<>"));
    // ------------------------------------------
    a(this, "isNotZero", () => s(this, y) !== 0);
    a(this, "isOdd", () => this.isRelative() && this.value % 2 === 1);
    a(this, "isOne", () => s(this, y) === 1 && s(this, E) === 1);
    a(this, "isOpposite", (e) => this.isEqual(e.clone().opposite()));
    a(this, "isPositive", () => this.sign() === 1);
    a(this, "isRational", () => !this.isRelative());
    a(this, "isReduced", () => Math.abs(W.gcd(s(this, y), s(this, E))) === 1);
    a(this, "isRelative", () => this.clone().reduce().denominator === 1);
    a(this, "isSquare", () => Math.sqrt(s(this, y)) % 1 === 0 && Math.sqrt(s(this, E)) % 1 === 0);
    a(this, "isStrictlyNegative", () => this.value < 0);
    a(this, "isStrictlyPositive", () => this.value > 0);
    // Mathematical operations specific to fractions
    a(this, "isZero", () => s(this, y) === 0);
    a(this, "multiply", (e) => {
      const t = new B(e);
      return h(this, y, s(this, y) * t.numerator), h(this, E, s(this, E) * t.denominator), this.reduce();
    });
    a(this, "one", () => (h(this, y, 1), h(this, E, 1), this));
    a(this, "opposite", () => (h(this, y, -s(this, y)), this));
    a(this, "pow", (e) => {
      if (e instanceof B)
        return this.pow(e.value);
      this.reduce(), e < 0 && this.inverse();
      const t = Math.floor(Math.pow(s(this, y), Math.abs(e))), i = Math.floor(Math.pow(s(this, E), Math.abs(e)));
      return t ** Math.abs(e) === s(this, y) && i ** Math.abs(e) === s(this, E) ? (h(this, y, s(this, y) ** Math.abs(e)), h(this, E, s(this, E) ** Math.abs(e))) : (h(this, y, s(this, y) ** Math.abs(e)), h(this, E, s(this, E) ** Math.abs(e))), this;
    });
    // ------------------------------------------
    a(this, "reduce", () => {
      const e = W.gcd(s(this, y), s(this, E));
      return h(this, y, s(this, y) / e), h(this, E, s(this, E) / e), s(this, E) < 0 && (h(this, E, -s(this, E)), h(this, y, -s(this, y))), this;
    });
    a(this, "root", (e) => {
      if (e === 0)
        return this;
      if (e < 0 && this.inverse(), !Number.isSafeInteger(e))
        throw new Error("The root must be an integer.");
      if (this.isNegative() && e % 2 === 0)
        throw new Error("The root of a negative number must be odd.");
      const t = this.sign();
      this.abs(), this.reduce();
      const i = Math.floor(Math.pow(s(this, y), Math.abs(1 / e))), r = Math.floor(Math.pow(s(this, E), Math.abs(1 / e)));
      return h(this, y, Math.pow(s(this, y), Math.abs(1 / e))), h(this, E, Math.pow(s(this, E), Math.abs(1 / e))), (i !== s(this, y) || r !== s(this, E)) && (h(this, y, s(this, y) / s(this, E)), h(this, E, 1), h(this, wt, !0)), this.multiply(t), this;
    });
    // ------------------------------------------
    // Getter and setter
    a(this, "sign", () => s(this, y) * s(this, E) >= 0 ? 1 : -1);
    a(this, "sqrt", () => this.root(2));
    a(this, "subtract", (e) => e instanceof B ? this.add(e.clone().opposite()) : this.add(-e));
    a(this, "zero", () => (h(this, y, 0), h(this, E, 1), this));
    return e !== void 0 && this.parse(e, t), this;
  }
  get denominator() {
    return s(this, E);
  }
  set denominator(e) {
    h(this, E, e);
  }
  get dfrac() {
    return h(this, Ze, "dfrac"), this;
  }
  get display() {
    return this.isExact() ? s(this, E) === 1 ? `${s(this, y)}` : `${s(this, y)}/${s(this, E)}` : this.value.toFixed(3);
  }
  get frac() {
    return h(this, Ze, "frac"), this;
  }
  // ------------------------------------------
  get numerator() {
    return s(this, y);
  }
  set numerator(e) {
    h(this, y, e);
  }
  // Display getter
  get tex() {
    return this.isInfinity() ? `${this.sign() === 1 ? "+" : "-"}\\infty` : this.isExact() ? s(this, E) === 1 ? `${s(this, y)}` : s(this, y) < 0 ? `-\\${s(this, Ze)}{ ${-s(this, y)} }{ ${s(this, E)} }` : `\\${s(this, Ze)}{ ${s(this, y)} }{ ${s(this, E)} }` : this.value.toFixed(3);
  }
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get tfrac() {
    return h(this, Ze, "tfrac"), this;
  }
  get value() {
    const e = s(this, y) / s(this, E);
    return e === 0 ? 0 : e;
  }
};
wt = new WeakMap(), E = new WeakMap(), y = new WeakMap(), Ze = new WeakMap(), a(B, "average", (...e) => {
  const t = new B().zero();
  for (const i of e)
    t.add(i);
  return t.divide(e.length), t;
}), a(B, "max", (...e) => {
  let t = new B(e[0]);
  for (const i of e) {
    const r = new B(i);
    r.isGreater(t) && (t = r.clone());
  }
  return t;
}), a(B, "min", (...e) => {
  let t = new B(e[0]);
  for (const i of e) {
    const r = new B(i);
    r.isLesser(t) && (t = r.clone());
  }
  return t;
}), a(B, "sort", (e, t) => {
  const r = e.map((n) => n instanceof B ? n : new B(n)).sort((n, l) => n.value - l.value);
  return t && r.reverse(), r;
}), // ------------------------------------------
// Compare functions
a(B, "unique", (e) => {
  const t = {}, i = [];
  return e.forEach((r) => {
    r instanceof B || (r = new B(r)), t[r.clone().reduce().tex] || (i.push(r.clone()), t[r.tex] = !0);
  }), i;
}), a(B, "xMultiply", (...e) => {
  const t = new B();
  for (const i of e) {
    const r = new B(i);
    t.numerator = t.numerator * r.numerator, t.denominator = t.denominator * r.denominator;
  }
  return t;
});
let f = B;
var j, se, oe, et;
class Ot {
  constructor(...e) {
    p(this, j);
    p(this, se);
    p(this, oe);
    p(this, et);
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    a(this, "parse", (e, t, i) => (h(this, oe, i ?? 1), h(this, se, t ?? 2), h(this, j, e), s(this, se) % 2 === 0 && s(this, j) < 0 && h(this, et, !1), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    a(this, "reduce", () => {
      let e = Math.floor(Math.pow(s(this, j), 1 / s(this, se)));
      for (; e > 1; ) {
        if (s(this, j) % Math.pow(e, s(this, se)) === 0) {
          h(this, oe, s(this, oe) * e), h(this, j, s(this, j) / Math.pow(e, s(this, se))), e = Math.floor(Math.pow(s(this, j), 1 / s(this, se)));
          continue;
        }
        e--;
      }
      return this;
    });
    a(this, "multiply", (e) => (h(this, j, s(this, j) * e.radical), this.reduce()));
    // ------------------------------------------
    // Help functions
    // ------------------------------------------
    a(this, "hasRadical", () => !(s(this, j) === 1 || s(this, j) === 0 || !s(this, et)));
    h(this, j, 1), h(this, oe, 1), h(this, se, 2), h(this, et, !0), e.length > 0 && this.parse(e[0], e[1], e[2]);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get radical() {
    return s(this, j);
  }
  set radical(e) {
    h(this, j, e);
  }
  get nth() {
    return s(this, se);
  }
  set nth(e) {
    Number.isSafeInteger(e) && e >= 2 ? h(this, se, e) : (console.log("Error setting the nth root"), h(this, se, 2));
  }
  get coefficient() {
    return s(this, oe);
  }
  set coefficient(e) {
    h(this, oe, e);
  }
  get tex() {
    let e;
    return s(this, oe) === 1 ? e = "" : s(this, oe) === -1 ? e = "-" : e = s(this, oe).toString(), s(this, j) === 1 ? `${s(this, oe)}` : s(this, se) === 2 ? `${e}\\sqrt{${s(this, j)}}` : `${e}\\sqrt[${s(this, se)}]{${s(this, j)}}`;
  }
  get display() {
    let e;
    return s(this, oe) === 1 ? e = "" : s(this, oe) === -1 ? e = "-" : e = s(this, oe).toString(), s(this, j) === 1 ? `${s(this, oe)}` : s(this, se) === 2 ? `${e}sqrt{${s(this, j)}}` : `${e}root(${s(this, se)}){${s(this, j)}}`;
  }
  get value() {
    return s(this, oe) * Math.pow(s(this, j), 1 / s(this, se));
  }
}
j = new WeakMap(), se = new WeakMap(), oe = new WeakMap(), et = new WeakMap();
var J, Ge, M, He, ye, ki, Mi, $i, Bi, Pi, Si, Ii;
const Ai = class Ai {
  constructor(e, t, i = "x") {
    p(this, M);
    p(this, J);
    p(this, Ge);
    if (h(this, Ge, i), Object.hasOwn(e, "moveLeft")) {
      const r = e;
      h(this, J, r.left.clone().subtract(r.right));
    } else
      h(this, J, e.clone().subtract(t ?? 0));
  }
  solve() {
    const e = s(this, J).degree().value;
    if (e === 0)
      return [];
    if (e === 1)
      return q(this, M, Pi).call(this);
    if (e === 2)
      return q(this, M, Si).call(this);
    const t = q(this, M, $i).call(this);
    return t.length > 0 ? t : q(this, M, ki).call(this);
  }
  solveAsCardan() {
    if (s(this, J).degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return q(this, M, Bi).call(this);
  }
};
J = new WeakMap(), Ge = new WeakMap(), M = new WeakSet(), He = function(e, t) {
  return {
    variable: s(this, Ge),
    exact: !1,
    value: +e.toFixed(10),
    tex: (t == null ? void 0 : t.tex) ?? "",
    display: (t == null ? void 0 : t.display) ?? ""
  };
}, ye = function(e) {
  if (e instanceof f && e.isApproximative())
    return q(this, M, He).call(this, e.value);
  const t = new f(e);
  return {
    variable: s(this, Ge),
    exact: t,
    value: t.value,
    tex: t.tex,
    display: t.display
  };
}, ki = function() {
  const e = [];
  s(this, J).degree().value;
  const t = s(this, J).getCoefficients().map((m) => m.value), [i, ...r] = s(this, J).getCoefficients(), n = 1 + Math.max(...r.map((m) => m.value / i.value)), c = 2 * n / 100, u = [];
  for (let m = -n; m <= n; m += c) {
    const v = W.numberCorrection(m);
    u.push(
      {
        x: v,
        fx: s(this, J).evaluate(v, !0)
      }
    );
  }
  u.sort((m, v) => m.x - v.x);
  const d = [];
  return u.forEach((m, v) => {
    v > 0 && (m.fx === 0 ? d.push([m.x, m.x]) : u[v - 1].fx * m.fx < 0 && d.push([
      u[v - 1].x,
      m.x
    ]));
  }), d.forEach((m) => {
    const [v, L] = m;
    if (v === L)
      e.push(q(this, M, ye).call(this, v));
    else {
      const ue = q(this, M, Mi).call(this, t, v, L);
      ue !== null && e.push(q(this, M, He).call(this, ue));
    }
  }), e;
}, Mi = function(e, t, i, r = 1e-10) {
  let n = s(this, J).evaluate(t, !0), l = s(this, J).evaluate(i, !0);
  if (n * l > 0)
    return console.log("Pas de racine dans l'intervalle donné"), null;
  let c;
  for (; (i - t) / 2 > r; ) {
    c = (t + i) / 2;
    const u = s(this, J).evaluate(c, !0);
    if (u === 0)
      return c;
    n * u < 0 ? (i = c, l = u) : (t = c, n = u);
  }
  return (t + i) / 2;
}, $i = function() {
  let e = s(this, J).clone(), t = [];
  const i = e.lcmDenominator();
  i !== 1 && e.multiply(i);
  const r = e.monomByDegree().coefficient;
  let n = e.monomByDegree(0).coefficient;
  for (; n.isZero(); )
    t.length === 0 && t.push(q(this, M, ye).call(this, 0)), e = e.divide("x"), n = e.monomByDegree(0).coefficient;
  const l = W.dividers(r.value), c = W.dividers(n.value);
  for (const d of l)
    for (const m of c) {
      const v = new f(m, d);
      e.evaluate(v).isZero() && !t.find((L) => L.value === v.value) && t.push(q(this, M, ye).call(this, v)), v.opposite(), e.evaluate(v).isZero() && !t.find((L) => L.value === v.value) && t.push(q(this, M, ye).call(this, v));
    }
  for (const d of t) {
    if (d.exact !== !1 && d.exact.isZero())
      continue;
    const m = s(this, J).clone().parse("x", d.exact.denominator, -d.exact.numerator);
    for (; e.isDividableBy(m); )
      e = e.divide(m);
  }
  if (e.degree().isZero())
    return t.sort((d, m) => d.value - m.value);
  if (e.degree().value > 3)
    return [];
  const u = new Ai(e, e.clone().parse("0"), s(this, Ge));
  return t = t.concat(u.solve()), t.sort((d, m) => d.value - m.value);
}, Bi = function() {
  const e = s(this, J), t = e.monomByDegree(3).coefficient, i = e.monomByDegree(2).coefficient, r = e.monomByDegree(1).coefficient, n = e.monomByDegree(0).coefficient, l = i.clone().divide(t), c = r.clone().divide(t), u = n.clone().divide(t), d = c.clone().subtract(l.clone().pow(2).divide(3)), m = u.clone().subtract(l.clone().multiply(c).divide(3)).add(l.clone().pow(3).multiply(2).divide(27)), v = m.clone().opposite(), L = d.clone().opposite().pow(3).divide(27), ue = v.clone().pow(2).subtract(L.clone().multiply(4)).opposite();
  if (ue.isNegative()) {
    const fe = m.clone().opposite().add(ue.clone().opposite().sqrt()).divide(2).root(3), de = m.clone().opposite().subtract(ue.clone().opposite().sqrt()).divide(2).root(3), ve = fe.clone().add(de).subtract(l.clone().divide(3));
    return [q(this, M, ye).call(this, ve)];
  }
  if (ue.isZero()) {
    const fe = m.clone().opposite().divide(2).root(3), de = fe.clone().opposite().subtract(l.clone().divide(3)), ve = fe.clone().multiply(2).subtract(l.clone().divide(3));
    return de.isEqual(ve) ? [q(this, M, ye).call(this, de)] : [
      q(this, M, ye).call(this, ve),
      q(this, M, ye).call(this, de)
    ].sort((we, me) => we.value - me.value);
  }
  if (ue.isPositive()) {
    const fe = [], de = d.value, ve = m.value, we = l.value;
    for (let me = 0; me < 3; me++)
      fe.push(2 * Math.sqrt(-de / 3) * Math.cos(Math.acos(3 * ve / (2 * de) * Math.sqrt(-3 / de)) / 3 + 2 * Math.PI * me / 3) - we / 3);
    return fe.map((me) => q(this, M, He).call(this, me)).sort((me, ut) => me.value - ut.value);
  }
  return [];
}, Pi = function() {
  const [e, t] = s(this, J).getCoefficients(), i = t.opposite().divide(e);
  return [
    q(this, M, ye).call(this, i)
  ];
}, Si = function() {
  const e = s(this, J), [t, i, r] = e.getCoefficients(), n = i.clone().pow(2).subtract(t.clone().multiply(r).multiply(4));
  if (n.isNegative())
    return [];
  if (n.isSquare()) {
    const l = n.sqrt(), c = i.clone().opposite().add(l).divide(t.clone().multiply(2)), u = i.clone().opposite().subtract(l).divide(t.clone().multiply(2));
    return l.isZero() ? [q(this, M, ye).call(this, c)] : [
      q(this, M, ye).call(this, c),
      q(this, M, ye).call(this, u)
    ].sort((d, m) => d.value - m.value);
  }
  return q(this, M, Ii).call(this, t, i, n);
}, Ii = function(e, t, i) {
  const r = W.dividers(i.value).filter((we) => Math.sqrt(we) % 1 === 0).map((we) => Math.sqrt(we)).pop() ?? 1, n = W.gcd(2 * e.value, t.value, r) * (e.isNegative() ? -1 : 1), l = t.clone().divide(n).opposite(), c = e.clone().divide(n).multiply(2), u = i.clone().divide(r ** 2), d = Math.abs(r / n), m = r === 1 ? "-" : `-${d} `, v = r === 1 ? "+" : `+${d} `;
  function L(we, me, ut, oi) {
    return `\\frac{ ${me} ${ut}\\sqrt{ ${oi} } }{ ${we} }`;
  }
  function ue(we, me, ut, oi) {
    return `(${me}${ut}sqrt(${oi}))/${we}`;
  }
  const fe = i.value ** 0.5, de = (-t.value - fe) / (2 * e.value), ve = (-t.value + fe) / (2 * e.value);
  return [
    q(this, M, He).call(this, de, {
      tex: L(c.tex, l.tex, m.toString(), u.tex),
      display: ue(c.display, l.display, m.toString(), u.display)
    }),
    q(this, M, He).call(this, ve, {
      tex: L(c.tex, l.tex, v.toString(), u.tex),
      display: ue(c.display, l.display, v.toString(), u.display)
    })
  ].sort((we, me) => we.value - me.value);
};
let Bt = Ai;
var hs = Object.defineProperty, zi = (o) => {
  throw TypeError(o);
}, as = (o, e, t) => e in o ? hs(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, ai = (o, e, t) => as(o, typeof e != "symbol" ? e + "" : e, t), Ri = (o, e, t) => e.has(o) || zi("Cannot " + t), ie = (o, e, t) => (Ri(o, e, "read from private field"), t ? t.call(o) : e.get(o)), ft = (o, e, t) => e.has(o) ? zi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), Ae = (o, e, t, i) => (Ri(o, e, "write to private field"), e.set(o, t), t);
const Ei = {
  pi: Math.PI,
  e: Math.exp(1)
};
var g = /* @__PURE__ */ ((o) => (o.VARIABLE = "variable", o.COEFFICIENT = "coefficient", o.OPERATION = "operation", o.CONSTANT = "constant", o.FUNCTION = "function", o.FUNCTION_ARGUMENT = "function-argument", o.MONOM = "monom", o.LEFT_PARENTHESIS = "(", o.RIGHT_PARENTHESIS = ")", o))(g || {}), Ue = /* @__PURE__ */ ((o) => (o.EXPRESSION = "expression", o.POLYNOM = "polynom", o.SET = "set", o.NUMERIC = "numeric", o))(Ue || {});
function ls(o, e) {
  if (o.length <= 1)
    return o;
  const t = Object.keys(e).filter((v) => e[v].type === g.FUNCTION).map((v) => v);
  t.sort((v, L) => L.length - v.length);
  const i = new RegExp(`^(${t.join("|")})\\(`), r = Object.keys(Ei);
  r.sort((v, L) => L.length - v.length);
  const n = new RegExp(`^(${r.join("|")})`), l = /^(\d+(\.\d+)?)/;
  let c = "", u, d, m;
  for (; o.length > 0; ) {
    if (u = d, m = void 0, t.length > 0 && i.exec(o)) {
      const v = t.find((L) => o.startsWith(L));
      v && (m = v + "(", o = o.slice(v.length + 1), d = g.FUNCTION);
    } else if (r.length > 0 && n.exec(o)) {
      const v = r.find((L) => o.startsWith(L));
      v && (m = v, o = o.slice(v.length), d = g.CONSTANT);
    } else if (l.exec(o)) {
      const v = l.exec(o);
      v && (m = v[0], o = o.slice(v[0].length), d = g.COEFFICIENT);
    } else
      switch (m = o[0], o = o.slice(1), m) {
        case "(":
          d = g.LEFT_PARENTHESIS;
          break;
        case ")":
          d = g.RIGHT_PARENTHESIS;
          break;
        case ",":
          d = g.FUNCTION_ARGUMENT;
          break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
          d = g.OPERATION;
          break;
        default:
          d = g.VARIABLE;
      }
    if (m === void 0 || d === void 0)
      throw new Error("The token is undefined");
    c += cs(u, d), c += m;
  }
  return c;
}
function cs(o, e) {
  return o === void 0 || o === g.OPERATION || e === g.OPERATION || o === g.LEFT_PARENTHESIS || o === g.FUNCTION || o === g.FUNCTION_ARGUMENT || e === g.RIGHT_PARENTHESIS || e === g.FUNCTION_ARGUMENT ? "" : "*";
}
const us = {
  "^": { precedence: 4, associative: "right", type: g.OPERATION },
  "*": { precedence: 3, associative: "left", type: g.OPERATION },
  "/": { precedence: 3, associative: "left", type: g.OPERATION },
  "+": { precedence: 2, associative: "left", type: g.OPERATION },
  "-": { precedence: 2, associative: "left", type: g.OPERATION }
}, fs = {
  "^": { precedence: 4, associative: "right", type: g.OPERATION },
  "*": { precedence: 3, associative: "left", type: g.OPERATION },
  "/": { precedence: 3, associative: "left", type: g.OPERATION },
  "+": { precedence: 2, associative: "left", type: g.OPERATION },
  "-": { precedence: 2, associative: "left", type: g.OPERATION },
  "%": { precedence: 3, associative: "right", type: g.OPERATION },
  sin: { precedence: 4, associative: "right", type: g.FUNCTION },
  cos: { precedence: 4, associative: "right", type: g.FUNCTION },
  tan: { precedence: 4, associative: "right", type: g.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: g.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: g.FUNCTION },
  ",": { precedence: 2, associative: "left", type: g.FUNCTION_ARGUMENT }
}, ds = {
  "^": { precedence: 4, associative: "right", type: g.OPERATION },
  "*": { precedence: 3, associative: "left", type: g.OPERATION },
  "/": { precedence: 3, associative: "left", type: g.OPERATION },
  "+": { precedence: 2, associative: "left", type: g.OPERATION },
  "-": { precedence: 2, associative: "left", type: g.OPERATION },
  "%": { precedence: 3, associative: "right", type: g.OPERATION },
  sin: { precedence: 4, associative: "right", type: g.FUNCTION },
  cos: { precedence: 4, associative: "right", type: g.FUNCTION },
  tan: { precedence: 4, associative: "right", type: g.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: g.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: g.FUNCTION },
  ln: { precedence: 4, associative: "right", type: g.FUNCTION },
  log: { precedence: 4, associative: "right", type: g.FUNCTION }
}, ps = {
  "&": { precedence: 3, associative: "left", type: g.OPERATION },
  "|": { precedence: 3, associative: "left", type: g.OPERATION },
  "!": { precedence: 4, associative: "right", type: g.OPERATION },
  "-": { precedence: 2, associative: "left", type: g.OPERATION }
};
var Ke, pt, ne, Ct, Fe;
class ni {
  constructor(e) {
    ft(this, Ke), ft(this, pt, []), ft(this, ne, {}), ft(this, Ct, []), ft(this, Fe), Ae(this, Ke, typeof e > "u" ? Ue.POLYNOM : e), this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return ie(this, pt);
  }
  get rpnToken() {
    return ie(this, pt).map((e) => e.token);
  }
  tokenConfigInitialization() {
    return ie(this, Ke) === Ue.SET ? (Ae(this, ne, ps), Ae(this, Fe, !1)) : ie(this, Ke) === Ue.NUMERIC ? (Ae(this, ne, ds), Ae(this, Fe, !0)) : ie(this, Ke) === Ue.EXPRESSION ? (Ae(this, ne, fs), Ae(this, Fe, !0)) : (Ae(this, ne, us), Ae(this, Fe, !0)), Ae(this, Ct, Object.keys(ie(this, ne)).sort((e, t) => t.length - e.length)), ie(this, ne);
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(e, t) {
    let i, r;
    if (i = "", r = void 0, e[t] === "(")
      i = "(", r = g.LEFT_PARENTHESIS;
    else if (e[t] === ")")
      i = ")", r = g.RIGHT_PARENTHESIS;
    else if (e[t] === ",")
      i = ",", r = g.FUNCTION_ARGUMENT;
    else {
      for (const n of ie(this, Ct))
        if (e.substring(t, t + n.length) === n) {
          i += n, r = ie(this, ne)[n].type;
          break;
        }
      for (const n in Ei)
        if (e.substring(t, t + n.length) === n) {
          i += n, r = g.CONSTANT;
          break;
        }
      if (i === "")
        if (/[0-9.]/.exec(e[t])) {
          const n = /^([0-9.]+)/.exec(e.substring(t));
          i = n ? n[0] : "", r = g.COEFFICIENT;
        } else if (/[a-zA-Z]/.exec(e[t])) {
          const n = /^([a-zA-Z])/.exec(e.substring(t));
          i = n ? n[0] : "", r = g.VARIABLE;
        } else
          console.log("Unidentified token", e[t], e, t), i = e[t], r = g.MONOM;
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
    (t ?? ie(this, Fe)) && (e = ls(e, ie(this, ne)));
    let u = 50, d;
    for (; l < e.length; ) {
      if (u--, u === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([n, l, c] = this.NextToken(e, l), c) {
        case g.MONOM:
        case g.COEFFICIENT:
        case g.VARIABLE:
        case g.CONSTANT:
          i.push({
            token: n,
            tokenType: c
          });
          break;
        case g.OPERATION:
          if (r.length > 0) {
            let m = r[r.length - 1];
            for (d = 50; m.token in ie(this, ne) && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (ie(this, ne)[n].associative === "left" && ie(this, ne)[n].precedence <= ie(this, ne)[m.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            ie(this, ne)[n].associative === "right" && ie(this, ne)[n].precedence < ie(this, ne)[m.token].precedence); ) {
              if (d--, d === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (i.push(r.pop() ?? { token: "", tokenType: g.OPERATION }), r.length === 0)
                break;
              m = r[r.length - 1];
            }
          }
          r.push({ token: n, tokenType: c });
          break;
        case g.FUNCTION_ARGUMENT:
          for (d = 50; r[r.length - 1].token !== "(" && r.length > 0; ) {
            if (d--, d === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            i.push(r.pop() ?? { token: n, tokenType: c });
          }
          break;
        case g.LEFT_PARENTHESIS:
          r.push({ token: n, tokenType: c }), e[l] === "-" && i.push({ token: "0", tokenType: g.COEFFICIENT });
          break;
        case g.RIGHT_PARENTHESIS:
          for (d = 50; r[r.length - 1].token !== "(" && r.length > 1; ) {
            if (d--, d === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
              break;
            }
            i.push(r.pop() ?? { token: n, tokenType: c });
          }
          r.pop();
          break;
        case g.FUNCTION:
          r.push({ token: n, tokenType: c });
          break;
        default:
          throw new Error(`Token type ${n} is not handled`);
      }
    }
    return Ae(this, pt, i.concat(r.reverse())), this;
  }
}
Ke = /* @__PURE__ */ new WeakMap(), pt = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap();
class ms {
  constructor(e, t) {
    ai(this, "_rpn"), ai(this, "_expression"), ai(this, "_isValid"), this._expression = e;
    try {
      this._rpn = new ni(Ue.NUMERIC).parse(e, t).rpn;
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
      if (i.tokenType === g.COEFFICIENT)
        if (!isNaN(+i.token))
          t.push(+i.token);
        else {
          const r = i.token.split("/");
          if (r.length !== 2)
            throw this._isValid = !1, new Error("This coefficient is not a fraction");
          t.push(+r[0] / +r[1]);
        }
      else if (i.tokenType === g.VARIABLE && e !== void 0)
        Object.hasOwn(e, i.token) && t.push(+e[i.token]);
      else if (i.tokenType === g.CONSTANT)
        t.push(Ei[i.token]);
      else if (i.tokenType === g.OPERATION) {
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
      } else if (i.tokenType === g.FUNCTION) {
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
var T, b, tt, kt, Le, zt, Rt;
const P = class P {
  constructor(e) {
    p(this, tt);
    p(this, T);
    p(this, b);
    /**
     * Clone the current Monom.
     */
    a(this, "clone", () => {
      const e = new P();
      e.coefficient = s(this, T).clone();
      for (const t in s(this, b))
        e.setLetter(t, s(this, b)[t].clone());
      return e;
    });
    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    a(this, "add", (...e) => {
      for (const t of e) {
        const i = t instanceof P ? t : new P(t);
        this.isSameAs(i) ? (this.isZero() && q(this, tt, kt).call(this, i), s(this, T).add(i.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", i.display);
      }
      return this;
    });
    a(this, "containsRationalPower", () => Object.values(s(this, b)).some((e) => e.isRational()));
    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    a(this, "degree", (e) => this.variables.length === 0 ? new f().zero() : e === void 0 ? Object.values(s(this, b)).reduce((t, i) => t.clone().add(i)) : this.hasVariable(e) ? s(this, b)[e].clone() : new f().zero());
    /**
     * Derivative the monom
     * @param letter
     */
    a(this, "derivative", (e) => {
      if (e === void 0 && (e = "x"), this.hasVariable(e)) {
        const t = s(this, b)[e].clone(), i = this.clone();
        return s(i, b)[e].subtract(1), s(i, T).multiply(new f(t.clone())), i;
      } else
        return new P().zero();
    });
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    a(this, "divide", (...e) => {
      for (const t of e) {
        const i = t instanceof P ? t : new P(t);
        s(this, T).divide(i.coefficient);
        for (const r in i.literal)
          s(this, b)[r] = this.hasVariable(r) ? s(this, b)[r].subtract(i.literal[r]) : i.literal[r].clone().opposite(), s(this, b)[r].isZero() && this.removeVariable(r);
      }
      return this;
    });
    /**
     * Evaluate a monom. Each setLetter must be assigned to a Fraction.
     * @param values    Dictionary of <setLetter: Fraction>
     * @param asNumeric
     */
    a(this, "evaluate", (e, t) => {
      if (t === !0) {
        if (e instanceof f)
          return s(this, Le).call(this, e.value);
        if (e instanceof Ot)
          return new f().invalid();
        if (typeof e == "number")
          return s(this, Le).call(this, e);
        if (typeof e == "object") {
          const r = {};
          for (const n in e)
            r[n] = new f(e[n]).value;
          return s(this, Le).call(this, r);
        }
      }
      const i = this.coefficient.clone();
      if (typeof e == "number" || e instanceof f) {
        const r = {};
        return r[this.variables[0]] = new f(e), this.evaluate(r);
      }
      if (e instanceof Ot)
        return new f().invalid();
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient;
        for (const r in s(this, b)) {
          const n = new f(e[r]);
          i.multiply(n.pow(s(this, b)[r]));
        }
      }
      return i;
    });
    // -------------------------------------
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    a(this, "hasVariable", (e) => Object.hasOwn(s(this, b), e ?? "x"));
    a(this, "inverse", () => {
      s(this, T).opposite();
      for (const e in s(this, b))
        s(this, b)[e].opposite();
      return this;
    });
    a(this, "isDivisible", (e) => {
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
    a(this, "isEqual", (e) => this.isSameAs(e) && s(this, T).isEqual(e.coefficient));
    a(this, "isLiteralSquare", () => {
      for (const e in this.literal)
        if (this.literal[e].isRational() || this.literal[e].isEven())
          return !1;
      return !0;
    });
    /**
     * Determine if the monom is one
     */
    a(this, "isOne", () => s(this, T).value === 1 && this.variables.length === 0);
    /**
     * Determine if two monoms are similar
     * @param M
     */
    a(this, "isSameAs", (e) => {
      const t = this.variables, i = e.variables, r = t.concat(i.filter((n) => !t.includes(n)));
      if (this.isZero() || e.isZero() || t.length === 0 && i.length === 0)
        return !0;
      if (t.length !== i.length)
        return !1;
      if (!this.isZero() && !e.isZero()) {
        for (const n of r)
          if (!this.hasVariable(n) || !e.hasVariable(n) || !s(this, b)[n].isEqual(e.literal[n]))
            return !1;
      }
      return !0;
    });
    a(this, "isSquare", () => this.coefficient.isSquare() ? this.isLiteralSquare() : !1);
    /**
     * Determine if the monom is null
     */
    a(this, "isZero", () => s(this, T).value === 0);
    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    a(this, "multiply", (...e) => {
      for (const t of e) {
        const i = t instanceof P ? t : new P(t);
        s(this, T).multiply(i.coefficient);
        for (const r in i.literal)
          this.hasVariable(r) ? s(this, b)[r].add(i.literal[r]) : s(this, b)[r] = i.literal[r].clone();
      }
      return this;
    });
    /**
     * Create a one value monom
     */
    a(this, "one", () => (h(this, T, new f().one()), h(this, b, {}), this));
    /**
     * Get the opposite
     * Returns a monom.
     */
    a(this, "opposite", () => (s(this, T).opposite(), this));
    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    a(this, "pow", (e) => {
      s(this, T).pow(e);
      for (const t in s(this, b))
        s(this, b)[t].multiply(e);
      return this;
    });
    a(this, "primitive", (e) => {
      e === void 0 && (e = "x");
      const t = this.clone();
      let i;
      return t.hasVariable(e) ? (i = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(i), t.setLetter(e, i)) : (t.coefficient.isZero() && (t.coefficient = new f().one()), t.setLetter(e, 1)), t;
    });
    a(this, "reduce", () => {
      this.coefficient.reduce();
      for (const e in s(this, b))
        s(this, b)[e].isZero() && this.removeVariable(e);
      return this;
    });
    /**
     * Get the nth-root of the monom
     */
    a(this, "root", () => {
      throw new Error("Method not implemented.");
    });
    /**
     * Set the power of a particular setLetter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the setLetter (must be positive integer.
     */
    a(this, "setLetter", (e, t) => t instanceof f ? (this.hasVariable(e) && t.isZero() && this.removeVariable(e), s(this, b)[e] = t.clone(), this) : this.setLetter(e, new f(t)));
    /**
     * Return the square root of a monom
     */
    a(this, "sqrt", () => {
      if (this.isSquare()) {
        s(this, T).sqrt();
        for (const e in s(this, b))
          s(this, b)[e].clone().divide(2);
      }
      return this;
    });
    /**
     * Subtract multiple monoms
     * @param M (Monom[]) The monoms to subtract
     */
    a(this, "subtract", (...e) => {
      for (const t of e) {
        const i = t instanceof P ? t : new P(t);
        this.isSameAs(i) ? (this.isZero() && q(this, tt, kt).call(this, i), s(this, T).add(i.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", i.display);
      }
      return this;
    });
    /**
     * Create a zero value monom
     */
    a(this, "zero", () => (h(this, T, new f().zero()), h(this, b, {}), this));
    p(this, Le, (e) => {
      let t = this.coefficient.value;
      if (typeof e == "number") {
        const i = {}, r = this.variables[0];
        return i[r] = e, s(this, Le).call(this, i);
      }
      if (e instanceof f) {
        const i = {};
        return i[this.variables[0]] = new f(e).value, s(this, Le).call(this, i);
      }
      if (e instanceof Ot)
        return NaN;
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient.value;
        for (const i in s(this, b)) {
          const r = e[i];
          r instanceof f ? t *= r.value ** s(this, b)[i].value : t *= r ** s(this, b)[i].value;
        }
      }
      return t;
    });
    p(this, zt, (e) => {
      const i = new ni().parse(e).rpn, r = [];
      if (i.length === 0)
        return this.zero(), this;
      if (i.length === 1) {
        const n = i[0];
        return this.one(), n.tokenType === g.COEFFICIENT ? this.coefficient = new f(n.token) : n.tokenType === g.VARIABLE && this.setLetter(n.token, 1), this;
      } else
        for (const n of i)
          s(this, Rt).call(this, r, n);
      return this.one(), this.multiply(r[0]), this;
    });
    p(this, Rt, (e, t) => {
      var u;
      let i, r, n, l, c;
      if (t.tokenType === g.COEFFICIENT)
        e.push(new P(new f(t.token)));
      else if (t.tokenType === g.VARIABLE) {
        const d = new P().one();
        d.setLetter(t.token, 1), e.push(d.clone());
      } else if (t.tokenType === g.OPERATION)
        switch (t.token) {
          case "-":
            r = e.pop() ?? new P().zero(), i = e.pop() ?? new P().zero(), e.push(i.subtract(r));
            break;
          case "*":
            r = e.pop() ?? new P().one(), i = e.pop() ?? new P().one(), e.push(i.multiply(r));
            break;
          case "/":
            r = e.pop() ?? new P().one(), i = e.pop() ?? new P().one(), e.push(i.divide(r));
            break;
          case "^": {
            c = ((u = e.pop()) == null ? void 0 : u.coefficient) ?? new f().one(), n = e.pop() ?? new P().one(), l = n.variables[0], l && n.setLetter(l, c), e.push(n);
            break;
          }
        }
    });
    return h(this, T, new f().zero()), h(this, b, {}), e !== void 0 && this.parse(e), this;
  }
  // -----------------------------------------
  /**
   * Parse a string to a monom. The string may include fraction.
   * @param inputStr
   */
  parse(e) {
    return h(this, T, new f()), h(this, b, {}), typeof e == "string" ? s(this, zt).call(this, e) : typeof e == "number" ? h(this, T, new f(e)) : e instanceof f ? h(this, T, e.clone()) : e instanceof P && (h(this, T, s(e, T).clone()), q(this, tt, kt).call(this, e)), this;
  }
  /**
   * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
   * @returns {Fraction}
   */
  get coefficient() {
    return s(this, T);
  }
  /**
   * Set the coefficient \\(k\\) value of the monom
   * @param {Fraction | number | string} F
   */
  set coefficient(e) {
    h(this, T, new f(e));
  }
  // Display getter
  /**
   * This display getter is to be used in the polynom display getter
   */
  get display() {
    let e = "";
    const t = Object.keys(s(this, b)).sort();
    for (const i of t)
      s(this, b)[i].isNotZero() && (e += i, s(this, b)[i].isNotEqual(1) && (e += `^(${s(this, b)[i].display})`));
    return e === "" ? s(this, T).value != 0 ? s(this, T).display : "" : s(this, T).value === 1 ? e : s(this, T).value === -1 ? `-${e}` : s(this, T).value === 0 ? "0" : `${s(this, T).display}${e}`;
  }
  get dividers() {
    if (!this.coefficient.isRelative())
      return [this.clone()];
    if (this.containsRationalPower())
      return [this.clone()];
    if (this.coefficient.numerator > 1e6)
      return [this.clone()];
    const e = W.dividers(Math.abs(this.coefficient.numerator));
    let t = [];
    for (const r in this.literal)
      t = this._getLiteralDividers(t, r);
    const i = [];
    if (t.length > 0 && e.length > 0)
      for (const r of e)
        for (const n of t) {
          const l = new P();
          l.coefficient = new f(r), l.literal = n, i.push(l);
        }
    else if (e.length === 0)
      for (const r of t) {
        const n = new P();
        n.coefficient = new f().one(), n.literal = r, i.push(n);
      }
    else
      for (const r of e) {
        const n = new P();
        n.coefficient = new f(r), i.push(n);
      }
    return i.length === 0 ? [new P().one()] : i;
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
    return s(this, b);
  }
  /**
   * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
   * @param {literalType<Fraction>} L
   */
  set literal(e) {
    h(this, b, e);
  }
  /**
   * Get the literal square roots of the Monom.
   * @returns {literalType<Fraction>}
   */
  get literalSqrt() {
    if (this.isLiteralSquare()) {
      const e = {};
      for (const t in s(this, b))
        e[t] = s(this, b)[t].clone().sqrt();
      return e;
    } else
      return s(this, b);
  }
  /**
   * Set the literal part of the monom from a string
   * @param inputStr  String like x^2y^3
   */
  set literalStr(e) {
    for (const t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)])
      t[1] in s(this, b) || (s(this, b)[t[1]] = new f().zero()), s(this, b)[t[1]].add(+t[2]);
    for (const t of [...e.matchAll(/([a-z](?!\^))/g)])
      t[1] in s(this, b) || (s(this, b)[t[1]] = new f().zero()), s(this, b)[t[1]].add(1);
  }
  get plotFunction() {
    let e = "";
    const t = Object.keys(s(this, b)).sort();
    for (const i of t)
      s(this, b)[i].isNotZero() && (e += (e === "" ? "" : "*") + i, s(this, b)[i].isNotEqual(1) && (e += `^(${s(this, b)[i].display})`));
    return e === "" ? s(this, T).value != 0 ? s(this, T).display : "" : s(this, T).value === 1 ? e : s(this, T).value === -1 ? `-${e}` : s(this, T).value === 0 ? "0" : `${s(this, T).display}*${e}`;
  }
  removeVariable(e) {
    delete s(this, b)[e];
  }
  /**
   * Get the tex output of the monom
   */
  get tex() {
    let e = "";
    const t = Object.keys(s(this, b)).sort();
    for (const i of t)
      s(this, b)[i].isNotZero() && (e += i, s(this, b)[i].isNotEqual(1) && (e += `^{ ${s(this, b)[i].tfrac.tex} }`));
    return e === "" ? s(this, T).value != 0 ? s(this, T).frac.tex : "0" : s(this, T).value === 1 ? e : s(this, T).value === -1 ? `-${e}` : s(this, T).value === 0 ? "0" : `${s(this, T).frac.tex}${e}`;
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
        n[t] = new f(r), i.push(n);
      } else
        for (const n of e) {
          const l = {};
          for (const c in n)
            l[c] = n[c];
          l[t] = new f(r), i.push(l);
        }
    return i;
  }
};
T = new WeakMap(), b = new WeakMap(), tt = new WeakSet(), kt = function(e) {
  for (const t in e.literal)
    s(this, b)[t] = e.literal[t].clone();
}, Le = new WeakMap(), zt = new WeakMap(), Rt = new WeakMap(), a(P, "gcd", (...e) => {
  for (const n of e)
    if (n.containsRationalPower())
      return new P().zero();
  const t = new P(), i = W.gcd(...e.map((n) => n.coefficient.numerator)), r = W.lcm(...e.map((n) => n.coefficient.denominator));
  t.coefficient = new f(i, r).reduce();
  for (const n of e) {
    for (const l in t.literal)
      l in n.literal || t.literal[l].zero();
    for (const l in n.literal)
      !t.hasVariable(l) && n.literal[l].isStrictlyPositive() ? t.literal[l] = n.literal[l].clone() : t.literal[l] = new f(Math.min(n.literal[l].value, t.literal[l].value));
  }
  return t;
}), /**
 * Multiply two monoms and return a NEW monom.
 * @param monoms
 */
a(P, "xMultiply", (...e) => {
  const t = new P().one();
  for (const i of e)
    t.multiply(i);
  return t;
});
let k = P;
function Oi(o, e = !0) {
  return e ? `\\left( ${o} \\right)` : `(${o})`;
}
function Mt(o, e, t, i, r) {
  return o.map((n, l) => n === e ? t : n);
}
function Di(o, e) {
  if (!Number.isSafeInteger(e))
    throw new Error("Can only raise item by an integer");
  if (e < 0)
    throw new Error("Can only raise item by a positive integer");
  if (e === 0)
    return o.one();
  const t = o.clone();
  for (let i = 1; i < e; i++)
    o.multiply(t);
  return o;
}
var We, w, it, yt, st, vt, Dt, Zt, Lt, rt, Vt, bt, Ft, jt, Ut, Gt, Zi, Wt, Xt;
const $ = class $ {
  constructor(e, ...t) {
    p(this, Gt);
    p(this, We);
    p(this, w);
    p(this, it);
    p(this, yt, !1);
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values
     */
    a(this, "parse", (e, ...t) => {
      if (h(this, w, []), h(this, We, []), typeof e == "string")
        return q(this, Gt, Zi).call(this, e, ...t);
      if ((typeof e == "number" || e instanceof f || e instanceof k) && t.length === 0)
        s(this, w).push(new k(e));
      else if (e instanceof k && t.length > 0)
        s(this, w).push(new k(e)), t.forEach((i) => {
          s(this, w).push(new k(i));
        });
      else if (e instanceof $)
        for (const i of e.monoms)
          s(this, w).push(i.clone());
      return this;
    });
    /**
     * Clone the polynom
     */
    a(this, "clone", () => {
      const e = new $(), t = [];
      for (const i of s(this, w))
        t.push(i.clone());
      return e.monoms = t, e;
    });
    a(this, "add", (...e) => {
      for (const t of e)
        t instanceof $ ? h(this, w, s(this, w).concat(t.monoms)) : t instanceof k ? s(this, w).push(t.clone()) : typeof t == "number" && Number.isSafeInteger(t) ? s(this, w).push(new k(t.toString())) : s(this, w).push(new k(t));
      return this.reduce();
    });
    a(this, "commonMonom", () => {
      const e = new k().one(), t = this.gcdNumerator(), i = this.gcdDenominator(), r = this.degree();
      e.coefficient = new f(t, i);
      for (const n of this.variables) {
        e.setLetter(n, r);
        for (const l of s(this, w))
          if (e.setLetter(n, f.min(l.degree(n), e.degree(n))), e.degree(n).isZero())
            break;
      }
      return e;
    });
    a(this, "degree", (e) => {
      let t = new f().zero();
      for (const i of s(this, w))
        t = f.max(i.degree(e).value, t);
      return t;
    });
    a(this, "derivative", (e) => {
      const t = new $();
      for (const i of s(this, w))
        t.add(i.derivative(e));
      return t.reduce();
    });
    a(this, "divide", (e) => {
      if (e instanceof f)
        return s(this, vt).call(this, e);
      if (typeof e == "number" && Number.isSafeInteger(e))
        return s(this, Dt).call(this, e);
      if (e instanceof k)
        return this.divide(new $(e));
      if (e instanceof $) {
        if (e.monoms.length === 1 && e.variables.length === 0)
          return s(this, vt).call(this, e.monoms[0].coefficient);
        {
          const { quotient: t, reminder: i } = this.euclidean(e);
          if (i.isZero())
            return h(this, w, t.monoms), this;
        }
      } else if (typeof e == "string")
        return this.divide(new $(e));
      throw new Error(`Cannot divide by ${e}`);
    });
    a(this, "empty", () => (h(this, w, []), this));
    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    a(this, "euclidean", (e) => {
      const t = e.variables[0], i = new $().zero(), r = this.clone().reorder(t);
      if (e.variables.length === 0)
        return {
          quotient: this.clone().divide(e).reduce(),
          reminder: new $().zero()
        };
      const n = e.monomByDegree(void 0, t), l = e.degree(t);
      let c, u = this.degree(t).value * 2;
      for (; r.degree(t).isGeq(l) && u > 0 && (u--, c = r.monomByDegree(void 0, t).clone().divide(n), !(!c.isZero() && (i.add(c), r.subtract(e.clone().multiply(c)).reduce(), c.degree(t).isZero()))); )
        ;
      return i.reduce(), r.reduce(), { quotient: i, reminder: r };
    });
    a(this, "evaluate", (e, t) => {
      if (t)
        return s(this, Zt).call(this, e);
      const i = new f().zero();
      return s(this, w).forEach((r) => {
        i.add(r.evaluate(e, t));
      }), i;
    });
    // -------------------------------------
    /**
     * Factorize a polynom and store the best results in factors.
     * @param letter
     */
    a(this, "factorize", (e) => {
      let t = [], i = this.clone().reorder();
      const r = i.commonMonom();
      if (i.monomByDegree().coefficient.isStrictlyNegative() && r.coefficient.isStrictlyPositive() && !r.isOne() && r.opposite(), !r.isOne()) {
        const c = new $(r);
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
          let c = s(this, Vt).call(this, i, l, e ?? "x");
          for (l = i.degree(e).value; c.length > 0; ) {
            const u = c[0];
            if (!i.isDividableBy(u))
              c.shift();
            else {
              const d = i.euclidean(u);
              t.push(u), i = d.quotient.clone(), c = c.filter((m) => {
                const v = i.monoms[0], L = i.monoms[i.monoms.length - 1], ue = m.monoms[0], fe = m.monoms[m.monoms.length - 1];
                return L.isDivisible(fe) ? v.isDivisible(ue) : !1;
              });
            }
          }
        }
      return i.isOne() || t.push(i.clone()), h(this, We, t), s(this, We);
    });
    a(this, "gcdDenominator", () => W.gcd(...this.getDenominators()));
    a(this, "gcdNumerator", () => W.gcd(...this.getNumerators()));
    // Next functions are used for for commonMonom, which is used in the factorize method.
    a(this, "getDenominators", () => {
      const e = [];
      for (const t of s(this, w))
        e.push(t.coefficient.denominator);
      return e;
    });
    a(this, "getNumerators", () => {
      const e = [];
      for (const t of s(this, w))
        e.push(t.coefficient.numerator);
      return e;
    });
    a(this, "getZeroes", () => this.degree().isZero() ? [] : (this.roots = new Bt(this.clone()).solve(), this.roots));
    a(this, "integrate", (e, t, i = "x") => {
      const r = this.primitive(i), n = {}, l = {};
      return n[i] = new f(e), l[i] = new f(t), r.evaluate(l).subtract(r.evaluate(n));
    });
    a(this, "isDeveloped", (e) => {
      let t;
      const i = e.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
      if (i.includes("(") || i.includes(")"))
        return !1;
      try {
        t = new $(e);
      } catch {
        return !1;
      }
      return !!this.isEqual(t);
    });
    a(this, "isDividableBy", (e) => {
      if (e.degree().isOne()) {
        const t = e.getZeroes()[0];
        return t.exact instanceof f ? this.evaluate(t.exact).isZero() : !1;
      } else {
        const { reminder: t } = this.euclidean(e);
        return t.isZero();
      }
    });
    a(this, "isEqual", (e) => s(this, st).call(this, e, "="));
    a(this, "isOppositeAt", (e) => s(this, st).call(this, e.clone().opposite(), "="));
    a(this, "isReduced", (e) => {
      if (!this.isDeveloped(e))
        return !1;
      const t = new $(e);
      if (t.monoms.length > this.monoms.length)
        return !1;
      for (const i of t.monoms)
        if (!i.coefficient.isReduced())
          return !1;
      return !1;
    });
    a(this, "isSameAs", (e) => s(this, st).call(this, e, "same"));
    a(this, "lcmDenominator", () => W.lcm(...this.getDenominators()));
    a(this, "lcmNumerator", () => W.lcm(...this.getNumerators()));
    a(this, "letters", () => {
      let e = /* @__PURE__ */ new Set();
      for (const t of s(this, w))
        e = /* @__PURE__ */ new Set([...e, ...t.variables]);
      return [...e];
    });
    a(this, "limitToInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), i = t.coefficient.sign(), r = t.degree(e);
      return r.isStrictlyPositive() ? i === 1 ? new f().infinite() : new f().infinite().opposite() : r.isZero() ? t.coefficient : new f().zero();
    });
    a(this, "limitToNegativeInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), i = t.coefficient.sign(), r = t.degree(e);
      return r.isStrictlyPositive() ? i === -1 ? new f().infinite() : new f().infinite().opposite() : r.isZero() ? t.coefficient : new f().zero();
    });
    a(this, "monomByDegree", (e, t) => {
      if (e === void 0)
        return this.monomByDegree(this.degree(t), t);
      const i = this.clone().reduce();
      for (const r of s(i, w))
        if (r.degree(t).isEqual(e))
          return r.clone();
      return new k().zero();
    });
    // Used in LinearSystem.tex
    a(this, "monomByLetter", (e) => {
      const t = this.clone().reduce();
      for (const i of s(t, w))
        if (i.hasVariable(e))
          return i.clone();
      return new k().zero();
    });
    a(this, "monomsByDegree", (e, t) => {
      if (e === void 0)
        return this.monomsByDegree(this.degree(t));
      const i = [], r = this.clone().reduce();
      for (const n of s(r, w))
        n.degree(t).isEqual(e) && i.push(n.clone());
      return i;
    });
    a(this, "multiply", (e) => e instanceof $ ? s(this, Ut).call(this, e) : e instanceof f ? s(this, bt).call(this, e) : e instanceof k ? s(this, jt).call(this, e) : Number.isSafeInteger(e) && typeof e == "number" ? s(this, Ft).call(this, e) : this);
    a(this, "one", () => (h(this, w, []), s(this, w).push(new k().one()), this));
    // ------------------------------------------
    a(this, "opposite", () => (h(this, w, s(this, w).map((e) => e.opposite())), this));
    a(this, "pow", (e) => Di(this, e).reduce());
    a(this, "primitive", (e) => {
      const t = new $();
      for (const i of s(this, w))
        t.add(i.primitive(e));
      return t;
    });
    a(this, "reduce", () => {
      let e = 0;
      for (; e < s(this, w).length; ) {
        for (let t = e + 1; t < s(this, w).length; t++)
          s(this, w)[e].isSameAs(s(this, w)[t]) && (s(this, w)[e].add(s(this, w)[t]), s(this, w).splice(t, 1), s(this, w)[e].isZero() && (s(this, w)[e] = new k().zero()), t--);
        e++;
      }
      h(this, w, s(this, w).filter((t) => !t.coefficient.isZero()));
      for (const t of s(this, w))
        t.coefficient.reduce();
      return this.length === 0 ? new $().zero() : this.reorder();
    });
    // ------------------------------------------
    a(this, "reorder", (e = "x", t) => {
      t === void 0 && (t = !1);
      const i = this.variables.filter((r) => r !== e);
      return s(this, w).sort(function(r, n) {
        const l = r.degree(e).value, c = n.degree(e).value;
        if (l !== c)
          return t ? l - c : c - l;
        if (i.length > 0)
          for (const u of i) {
            const d = r.degree(u).value, m = n.degree(u).value;
            if (d !== m)
              return t ? d - m : m - d;
          }
        return 0;
      }), this;
    });
    /**
     * Replace a variable (letter) by a polynom.
     * @param letter
     * @param P
     */
    a(this, "replaceBy", (e, t) => {
      let i;
      const r = new $().zero();
      for (const n of this.monoms)
        !n.hasVariable(e) || n.literal[e].isZero() ? r.add(n.clone()) : (i = n.literal[e].clone(), n.removeVariable(e), r.add(t.clone().pow(Math.abs(i.numerator)).multiply(n)));
      return h(this, w, r.reduce().monoms), this;
    });
    a(this, "subtract", (...e) => {
      for (const t of e)
        t instanceof $ ? this.add(t.clone().opposite()) : t instanceof k ? s(this, w).push(t.clone().opposite()) : s(this, w).push(new k(t).opposite());
      return this.reduce();
    });
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    a(this, "zero", () => (h(this, w, []), s(this, w).push(new k().zero()), this));
    p(this, st, (e, t) => {
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
    p(this, vt, (e) => {
      for (const t of s(this, w))
        t.coefficient.divide(e);
      return this;
    });
    p(this, Dt, (e) => {
      const t = new f(e);
      for (const i of s(this, w))
        i.coefficient.divide(t);
      return this;
    });
    p(this, Zt, (e) => {
      let t = 0;
      return s(this, w).forEach((i) => {
        t += i.evaluate(e, !0);
      }), t;
    });
    p(this, Lt, (e) => {
      var v;
      let t, i, r, n, l, c, u, d, m;
      if (this.numberOfVars === 1)
        return r = this.monomByDegree(2, e).coefficient, n = this.monomByDegree(1, e).coefficient, l = this.monomByDegree(0, e).coefficient, c = n.clone().pow(2).subtract(r.clone().multiply(l).multiply(4)), c.isZero() ? (u = n.clone().opposite().divide(r.clone().multiply(2)), t = new $(e).subtract(u.display).multiply(u.denominator), i = new $(e).subtract(u.display).multiply(u.denominator), m = r.divide(u.denominator).divide(u.denominator), m.isOne() ? [t, i] : [new $(m.display), t, i]) : c.isPositive() && c.isSquare() ? (u = n.clone().opposite().add(c.clone().sqrt()).divide(r.clone().multiply(2)), d = n.clone().opposite().subtract(c.clone().sqrt()).divide(r.clone().multiply(2)), m = r.divide(u.denominator).divide(d.denominator), m.isOne() ? [
          new $(e).subtract(u.display).multiply(u.denominator),
          new $(e).subtract(d.display).multiply(d.denominator)
        ] : [
          new $(m.display),
          new $(e).subtract(u.display).multiply(u.denominator),
          new $(e).subtract(d.display).multiply(d.denominator)
        ]) : [this.clone()];
      if (r = this.monomByDegree(2, e), n = this.monomByDegree(1, e), l = this.monomByDegree(0, e), r.isLiteralSquare() && l.isLiteralSquare() && n.clone().pow(2).isSameAs(r.clone().multiply(l))) {
        const L = new $("x", r.coefficient, n.coefficient, l.coefficient), ue = s(v = L, Lt).call(v, "x"), fe = [];
        let de;
        if (ue.length >= 2) {
          for (const ve of ue)
            ve.degree().isZero() ? fe.push(ve.clone()) : (de = ve.clone(), de.monoms[0].literal = r.literalSqrt, de.monoms[1].literal = l.literalSqrt, fe.push(de.clone()));
          return fe;
        }
      }
      return [this.clone()];
    });
    p(this, rt, (e, t, i, r) => {
      let n = "";
      for (const l of s(this, w)) {
        if (l.coefficient.value === 0)
          continue;
        let c;
        r ? c = l.plotFunction : c = e === "tex" ? l.tex : l.display, n += `${l.coefficient.sign() === 1 && (n !== "" || t === !0) ? "+" : ""}${c}`;
      }
      return i === !0 && this.length > 1 && (e === "tex" ? n = `\\left( ${n} \\right)` : n = `(${n})`), n === "" && (n = "0"), n;
    });
    p(this, Vt, (e, t, i) => {
      const r = e.monoms[0].dividers, n = e.monoms[e.monoms.length - 1].dividers, l = [];
      return r.forEach((c) => {
        c.degree(i).isLeq(t) && n.forEach((u) => {
          c.degree(i).isNotEqual(u.degree(i)) && (l.push(new $(c, u)), l.push(new $(c, u.clone().opposite())));
        });
      }), l;
    });
    p(this, bt, (e) => {
      for (const t of s(this, w))
        t.coefficient.multiply(e);
      return this.reduce();
    });
    p(this, Ft, (e) => s(this, bt).call(this, new f(e)));
    p(this, jt, (e) => {
      for (const t of s(this, w))
        t.multiply(e);
      return this.reduce();
    });
    p(this, Ut, (e) => {
      const t = [];
      for (const i of s(this, w))
        for (const r of e.monoms)
          t.push(k.xMultiply(i, r));
      return h(this, w, t), this.reduce();
    });
    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    p(this, Wt, (e) => {
      const i = new ni().parse(e).rpn;
      this.zero();
      const r = [];
      for (const n of i)
        s(this, Xt).call(this, r, n);
      return r.length === 1 && this.add(r[0]), this.reorder();
    });
    p(this, Xt, (e, t) => {
      switch (t.tokenType) {
        case g.COEFFICIENT:
          e.push(new $(t.token));
          break;
        case g.VARIABLE:
          e.push(new $().add(new k(t.token)));
          break;
        case g.CONSTANT:
          console.log("Actually, not supported - will be added later !");
          break;
        case g.OPERATION:
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
        case g.MONOM:
          console.error("The monom token should not appear here");
          break;
        case g.FUNCTION:
          console.error("The function token should not appear here - might be introduced later.");
          break;
      }
    });
    return h(this, w, []), h(this, We, []), h(this, it, []), e !== void 0 && this.parse(e, ...t), this;
  }
  get tex() {
    return s(this, rt).call(this, "tex");
  }
  get display() {
    return s(this, rt).call(this);
  }
  get value() {
    var e;
    if (this.degree().isZero())
      return ((e = this.monoms[0]) == null ? void 0 : e.coefficient.value) ?? 0;
  }
  fromCoefficients(...e) {
    h(this, w, []);
    const t = "x";
    return e.reverse().forEach((i, r) => {
      const n = new k();
      n.coefficient = new f(i), n.setLetter(t, r), s(this, w).push(n);
    }), this;
  }
  getCoefficients() {
    const e = this.clone().reorder(), t = this.degree().value + 1, i = new Array(t).fill(new f(0));
    return e.monoms.forEach((r) => {
      const n = t - r.degree().value - 1;
      i[n] = r.coefficient.clone();
    }), i;
  }
  hasVariable(e) {
    return this.variables.includes(e);
  }
  inverse() {
  }
  get isMultiVariable() {
    return s(this, w).some((e) => e.variables.length > 1);
  }
  isOne() {
    return s(this, w).length === 1 && s(this, w)[0].coefficient.isOne() && this.degree().isZero();
  }
  isZero() {
    return s(this, w).length === 1 && s(this, w)[0].coefficient.isZero() || s(this, w).length === 0;
  }
  get length() {
    return s(this, w).length;
  }
  // ------------------------------------------
  get monoms() {
    return s(this, w);
  }
  set monoms(e) {
    h(this, w, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get plotFunction() {
    return s(this, rt).call(this, "tex", !1, !1, !0);
  }
  root() {
    throw new Error("Cannot take the root from a polynom");
  }
  get roots() {
    return s(this, yt) ? s(this, it) : this.getZeroes();
  }
  set roots(e) {
    h(this, yt, !0), h(this, it, e);
  }
  sqrt() {
    throw new Error("Cannot take the square root from a polynom");
  }
  tableOfSigns() {
    const e = this.roots;
    let t = new Array(2 * e.length + 1).fill("").map((i, r) => r % 2 === 0 ? "" : "z");
    if (t.length === 1) {
      const [i] = this.getCoefficients().map((r) => r.value);
      t = Mt(t, "", i > 0 ? "+" : "-");
    } else if (this.degree().isOne()) {
      const [i] = this.getCoefficients().map((r) => r.value);
      t[0] = i > 0 ? "-" : "+", t[1] = "z", t[2] = i > 0 ? "+" : "-";
    } else
      [
        e[0].value - 1,
        ...e.map((r, n) => n === e.length - 1 ? e[n].value + 1 : (e[n].value + e[n + 1].value) / 2)
      ].forEach((r, n) => {
        const l = this.evaluate({ x: r }, !0);
        t[n * 2] = l > 0 ? "+" : "-";
      });
    return { roots: e, signs: t };
  }
  get variables() {
    let e = [];
    for (const t of s(this, w))
      e = e.concat(t.variables);
    return e = [...new Set(e)], e.sort(), e;
  }
  get zeroes() {
    return this.getZeroes();
  }
};
We = new WeakMap(), w = new WeakMap(), it = new WeakMap(), yt = new WeakMap(), st = new WeakMap(), vt = new WeakMap(), Dt = new WeakMap(), Zt = new WeakMap(), Lt = new WeakMap(), rt = new WeakMap(), Vt = new WeakMap(), bt = new WeakMap(), Ft = new WeakMap(), jt = new WeakMap(), Ut = new WeakMap(), Gt = new WeakSet(), Zi = function(e, ...t) {
  if (t.length === 0) {
    if (e = "" + e, e !== "" && !isNaN(Number(e))) {
      this.empty();
      const i = new k(e);
      return this.add(i), this;
    }
    return s(this, Wt).call(this, e);
  } else if (/^[a-z]+/.test(e)) {
    this.empty();
    const i = t.map((r) => new f(r));
    if (e.length > 1) {
      const r = e.split("");
      if (r.length < t.length - 2)
        throw new Error("Too many factors for too few variables !");
      let n = 0;
      for (const l of i) {
        const c = new k();
        c.coefficient = l.clone(), c.literalStr = r[n] || "", this.add(c), n++;
      }
    } else {
      let r = i.length - 1;
      for (const n of i) {
        const l = new k();
        l.coefficient = n.clone(), l.literalStr = `${e}^${r}`, this.add(l), r--;
      }
    }
    return this;
  } else
    return this.zero();
}, Wt = new WeakMap(), Xt = new WeakMap();
let x = $;
var O, C, he, Yt, nt, Qt;
const qe = class qe {
  constructor(e, t, i) {
    // Left part of the equation
    p(this, O);
    // Right part of the equation
    p(this, C);
    // Signe of the equation
    p(this, he);
    // ------------------------------------------
    a(this, "parse", (e) => {
      const t = s(this, Yt).call(this, e);
      if (t === !1)
        throw new Error("The equation is not valid (no sign found)");
      const i = e.split(t);
      return this.create(new x(i[0]), new x(i[1]), s(this, nt).call(this, t));
    });
    a(this, "create", (e, t, i) => (h(this, O, e), h(this, C, t), h(this, he, s(this, nt).call(this, i ?? "=")), this));
    a(this, "clone", () => new qe(s(this, O).clone(), s(this, C).clone(), s(this, he)));
    /**
     * Get the degree of the equation
     * @param letter
     */
    a(this, "degree", (e) => f.max(s(this, O).degree(e), s(this, C).degree(e)));
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
    a(this, "divide", (e) => {
      const t = new f(e);
      return t.isZero() ? this : this.multiply(t.inverse());
    });
    /**
     * Determine if the equation contains a variable.
     * @param letter
     */
    a(this, "hasVariable", (e) => this.variables.includes(e));
    a(this, "isLinearTo", (e) => {
      const t = e.clone().moveLeft().simplify().left, i = this.clone().moveLeft().simplify().left;
      return t.isEqual(i) || t.isOppositeAt(i);
    });
    /**
     * Determine if the equation contains more than one letter/variable.
     */
    a(this, "isMultiVariable", () => s(this, O).isMultiVariable || s(this, C).isMultiVariable);
    // -----------------------------------------------
    // Equations helpers
    a(this, "isEqualTo", (e) => {
      const t = e.clone().moveLeft().left, i = this.clone().moveLeft().left;
      return t.isEqual(i) || t.isOppositeAt(i);
    });
    /**
     * Reorder the polynom to have only one letter on the left, the rest on the right.
     * @param letter
     */
    a(this, "isolate", (e) => {
      if (!this.degree(e).isOne() || this.isMultiVariable())
        return !1;
      let t;
      s(this, O).subtract(s(this, C)), s(this, C).zero();
      const i = [...s(this, O).monoms];
      for (const n of i)
        n.hasVariable(e) || (t = n.clone(), s(this, O).subtract(t), s(this, C).subtract(t));
      if (s(this, O).length !== 1)
        return !1;
      const r = s(this, O).monoms[0].coefficient.clone();
      return s(this, O).divide(r), s(this, C).divide(r), this;
    });
    // -----------------------------------------------
    // Equations operations
    // -----------------------------------------------
    a(this, "letters", () => [.../* @__PURE__ */ new Set([...s(this, O).letters(), ...s(this, C).letters()])]);
    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    a(this, "moveLeft", () => (s(this, O).subtract(s(this, C)), s(this, C).zero(), this));
    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    a(this, "multiply", (e) => {
      const t = new f(e);
      return s(this, O).multiply(t), s(this, C).multiply(t), s(this, he) !== "=" && t.sign() === -1 && s(this, Qt).call(this), this;
    });
    a(this, "opposite", () => (h(this, O, s(this, O).opposite()), h(this, C, s(this, C).opposite()), this));
    a(this, "reorder", (e) => (s(this, O).subtract(s(this, C)), s(this, C).zero(), s(this, O).reorder(), e ? this : (s(this, O).monoms.filter((t) => t.degree().isZero()).forEach((t) => {
      const i = t.clone();
      s(this, O).subtract(i), s(this, C).subtract(i);
    }), s(this, O).reorder(), s(this, C).reorder(), this)));
    // ------------------------------------------
    a(this, "replaceBy", (e, t) => (s(this, O).replaceBy(e, t), s(this, C).replaceBy(e, t), this));
    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    a(this, "simplify", () => (this.multiply(W.lcm(...s(this, O).getDenominators(), ...s(this, C).getDenominators())), this.divide(W.gcd(...s(this, O).getNumerators(), ...s(this, C).getNumerators())), this));
    // -----------------------------------------------
    a(this, "solve", () => new Bt(this.clone()).solve());
    a(this, "test", (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e)));
    p(this, Yt, (e) => {
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
    p(this, nt, (e) => e === void 0 ? "=" : e.includes("geq") || e.includes(">=") || e.includes("=>") ? ">=" : e.includes(">") ? ">" : e.includes("leq") || e.includes("<=") || e.includes("=<") ? "<=" : e.includes("<") ? "<" : "=");
    p(this, Qt, () => s(this, he) === "=" ? this : s(this, he).includes("<") ? (s(this, he).replace("<", ">"), this) : s(this, he).includes(">") ? (s(this, he).replace(">", "<"), this) : this);
    if (h(this, O, new x().zero()), h(this, C, new x().zero()), h(this, he, "="), e !== void 0 && t === void 0) {
      if (e instanceof qe)
        return e.clone();
      typeof e == "string" && this.parse(e);
    } else e !== void 0 && t !== void 0 && (this.left = new x(e), this.right = new x(t));
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
    if (e instanceof qe)
      return s(this, O).add(e.left), s(this, C).add(e.right), this;
    if (typeof e == "string" && !qe.isEquationString(e))
      return this.add(new qe(e));
    const t = new x(e);
    return s(this, O).add(t), s(this, C).add(t), this;
  }
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param values
   * @param asNumeric
   */
  evaluate(e, t) {
    const i = s(this, O).evaluate(e, t), r = s(this, C).evaluate(e, t);
    return t ? i === r : i.isEqual(r);
  }
  isEqual(e) {
    const t = new qe(e);
    return t.left.isEqual(s(this, O)) && t.right.isEqual(s(this, C));
  }
  pow(e) {
    return s(this, O).pow(e), s(this, C).pow(e), this;
  }
  reduce() {
    return this.moveLeft(), s(this, O).reduce(), this.simplify(), s(this, O).monoms[0].coefficient.isNegative() && this.multiply(-1), this;
  }
  split() {
    return [s(this, O).clone(), s(this, C).clone()];
  }
  subtract(e) {
    if (e instanceof qe)
      return s(this, O).subtract(e.left), s(this, C).subtract(e.right), this;
    if (typeof e == "string" && !qe.isEquationString(e))
      return this.subtract(new qe(e));
    const t = new x(e);
    return s(this, O).subtract(t), s(this, C).subtract(t), this;
  }
  static isEquationString(e) {
    return e.includes("=") || e.includes("<") || e.includes(">") || e.includes("<=") || e.includes(">=");
  }
  static makeSolutionsUnique(e, t) {
    const i = [], r = e.filter((n) => i.includes(n.tex) ? !1 : (i.push(n.tex), !0));
    return t === !0 && r.sort((n, l) => n.value - l.value), r;
  }
  get display() {
    return `${s(this, O).display}${this.signAsTex}${s(this, C).display}`;
  }
  // Getter and setter
  get left() {
    return s(this, O);
  }
  set left(e) {
    h(this, O, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get right() {
    return s(this, C);
  }
  set right(e) {
    h(this, C, e);
  }
  // ------------------------------------------
  get sign() {
    return s(this, he);
  }
  set sign(e) {
    h(this, he, s(this, nt).call(this, e));
  }
  get signAsTex() {
    return s(this, he) === ">=" ? "\\geq" : s(this, he) === "<=" ? "\\leq" : s(this, he);
  }
  get tex() {
    return `${s(this, O).tex}${this.signAsTex}${s(this, C).tex}`;
  }
  get variables() {
    return [...new Set(s(this, C).variables.concat(s(this, O).variables))];
  }
};
O = new WeakMap(), C = new WeakMap(), he = new WeakMap(), Yt = new WeakMap(), nt = new WeakMap(), Qt = new WeakMap();
let F = qe;
var ke, Te, Ee, ot;
const xe = class xe {
  constructor(e, t) {
    p(this, ke);
    p(this, Te);
    p(this, Ee);
    p(this, ot, !1);
    return e instanceof xe ? (h(this, Te, e.polynom.clone()), h(this, Ee, e.power.clone()), t !== void 0 && s(this, Ee).multiply(new f(t))) : e !== void 0 ? (h(this, Te, new x(e)), h(this, Ee, new f(t ?? 1))) : (h(this, Te, new x()), h(this, Ee, new f(1))), h(this, ke, 1), this;
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  clone() {
    return new xe(this);
  }
  fromPolynom(e) {
    return h(this, Te, new x(e)), h(this, Ee, new f(1)), this;
  }
  get tex() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, r;
    return s(this, ke) === 0 && t > 1 ? (i = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, r = e === 1 ? "" : `^{ ${e} }`) : (i = s(this, ot) && this.power.isOne() ? this.polynom.tex : Oi(this.polynom.tex), r = t === 1 && e === 1 ? "" : `^{ ${this.power.tex} }`), i = `${i}${r}`, s(this, ke) === 0 && e < 0 && (i = `\\frac{ 1 }{ ${i} }`), i;
  }
  get display() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, r;
    return s(this, ke) === 0 && t > 1 ? (i = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, r = e === 1 ? "" : `^(${e})`) : (i = s(this, ot) && this.power.isOne() ? this.polynom.display : Oi(this.polynom.display, !1), r = t === 1 && e === 1 ? "" : `^(${this.power.display})`), i = `${i}${r}`, s(this, ke) === 0 && e < 0 && (i = `1/(${i})`), i;
  }
  add() {
    throw new Error("Adding two factors is not possible");
  }
  get asSingle() {
    return h(this, ot, !0), this;
  }
  degree(e) {
    return this.polynom.degree(e).multiply(this.power);
  }
  derivative() {
    return this.power.isZero() ? [new xe("0")] : this.power.isOne() ? [new xe(this.polynom.clone().derivative())] : [
      new xe(this.power.clone()),
      new xe(this.polynom.clone().derivative()),
      new xe(this.polynom.clone(), this.power.clone().subtract(1))
    ];
  }
  develop() {
    if (this.power.isNatural())
      return this.polynom.clone().pow(this.power.value);
    throw new Error("The power must be a natural number");
  }
  divide(e) {
    if (e instanceof xe && this.isSameAs(e))
      return this.power.subtract(e.power), this;
    const t = new x(e);
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
    return e instanceof xe ? t = e.polynom : e instanceof x ? t = e : t = new x(e), this.polynom.isEqual(t);
  }
  isZero() {
    return this.polynom.isZero();
  }
  multiply(e) {
    if (e instanceof xe && this.isSameAs(e))
      return this.power.add(e.power), this;
    const t = new x(e);
    if (this.isSameAs(t))
      return this.power.add(1), this;
    throw new Error("The two factors must be the same");
  }
  one() {
    return s(this, Te).one(), s(this, Ee).one(), this;
  }
  opposite() {
    throw new Error("Method not implemented.");
  }
  get polynom() {
    return s(this, Te);
  }
  set polynom(e) {
    h(this, Te, e);
  }
  pow(e) {
    return this.power.multiply(e), this;
  }
  get power() {
    return s(this, Ee);
  }
  set power(e) {
    h(this, Ee, new f(e));
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
    return e.isStrictlyNegative() && (t.signs = Mt(t.signs, "z", "d")), e.denominator % 2 === 0 ? t.signs = Mt(t.signs, "-", "h") : e.numerator % 2 === 0 && (t.signs = Mt(t.signs, "-", "+")), { roots: t.roots, signs: t.signs };
  }
  get variables() {
    return this.polynom.variables;
  }
  get withPower() {
    return h(this, ke, 1), this;
  }
  get withRoot() {
    return h(this, ke, 0), this;
  }
  zero() {
    return s(this, Te).zero(), s(this, Ee).one(), this;
  }
};
ke = new WeakMap(), Te = new WeakMap(), Ee = new WeakMap(), ot = new WeakMap();
let re = xe;
var mt = /* @__PURE__ */ ((o) => (o[o.ROOT = 0] = "ROOT", o[o.POWER = 1] = "POWER", o))(mt || {}), V, Se, Ht, Kt;
const Je = class Je {
  constructor(...e) {
    p(this, V);
    // Determine the letters in the linear system, usually ['x', 'y']
    p(this, Se);
    a(this, "parse", (...e) => (h(this, V, e.map((t) => new F(t))), s(this, Ht).call(this), this));
    a(this, "clone", () => new Je().parse(...s(this, V).map((e) => e.clone())));
    a(this, "buildTex", (e, t) => {
      let i, r, n = [];
      const l = [];
      for (const u of e)
        n = n.concat(u.letters());
      n = [...new Set(n)], n.sort();
      for (let u = 0; u < e.length; u++) {
        const d = e[u];
        i = [];
        for (const m of n)
          r = d.left.monomByLetter(m), i.length === 0 ? i.push(r.isZero() ? "" : r.tex) : i.push(r.isZero() ? "" : (r.coefficient.sign() === 1 ? "+" : "") + r.tex);
        if (i.push("="), i.push(d.right.tex), (t == null ? void 0 : t[u]) !== void 0) {
          i[i.length - 1] = i[i.length - 1] + " \\phantom{\\quad}";
          for (const m of t[u])
            i.push(`\\ \\cdot\\ ${m.startsWith("-") ? "\\left(" + m + "\\right)" : m}`);
        }
        l.push(i.join("&"));
      }
      let c = 0;
      return t !== void 0 && t.length > 0 && (c = t[0].length), `\\left\\{\\begin{array}{${"r".repeat(n.length)}cl ${"|l".repeat(c)}}${l.join("\\\\ ")}\\end{array}\\right.`;
    });
    a(this, "mergeEquations", (e, t, i, r) => {
      const n = e.clone().multiply(new f(i)), l = t.clone().multiply(new f(r));
      return n.left.add(l.left), n.right.add(l.right), n;
    });
    // ------------------------------------------
    a(this, "reorder", () => {
      for (const e of s(this, V))
        e.reorder();
      return this;
    });
    a(this, "solveMatrix", () => {
      const [e, t] = this.matrix, i = e.map((r, n) => [...r, t[n]]);
      for (let r = 0; r < e.length; r++) {
        let n = i[r][r].clone();
        if (n.isZero()) {
          const l = i.find((c, u) => u > r && !c[r].isZero());
          if (l)
            i[r].forEach((c, u) => c.add(l[u])), n = i[r][r].clone();
          else
            throw new Error("Unsolvable...");
        }
        i[r] = i[r].map((l) => l.divide(n));
        for (let l = 0; l < e.length; l++) {
          if (l === r)
            continue;
          const c = i[l][r].clone().opposite();
          for (let u = 0; u < i[l].length; u++)
            i[l][u].add(i[r][u].clone().multiply(c));
          if (i[l].slice(0, i[l].length - 1).every((u) => u.isZero()))
            return i[l][i[l].length - 1].isZero() ? [new f().infinite()] : [];
        }
      }
      return i.map((r) => r[r.length - 1]);
    });
    p(this, Ht, () => (h(this, Se, s(this, V).reduce((e, t) => [.../* @__PURE__ */ new Set([...e, ...t.variables])], [])), s(this, Se).sort(), this));
    p(this, Kt, () => {
      const e = [], t = [];
      for (const i of s(this, V)) {
        const r = [], n = i.clone().reorder();
        for (const l of this.variables) {
          const c = n.left.monomByLetter(l);
          r.push(c.coefficient);
        }
        t.push(n.right.monoms[0].coefficient), e.push(r);
      }
      return [e, t];
    });
    return h(this, V, []), h(this, Se, []), e.length > 0 && this.parse(...e), this;
  }
  static fromMatrix(e, t = "xyz") {
    const i = e[0].length;
    if (e.some((n) => n.length !== i))
      throw new Error("All rows must have the same number of columns");
    const r = t.split("").splice(0, i - 1);
    return new Je(
      ...e.map((n) => {
        const l = new x(r.join(""), ...n);
        return new F(l, 0);
      })
    );
  }
  add(e, t) {
    if (e instanceof Je) {
      const i = e.equations.length;
      if (i !== s(this, V).length)
        throw new Error("The number of equations must be the same");
      for (let r = 0; r < i; r++)
        s(this, V)[r].add(e.equations[r]);
    } else {
      if (t === void 0 || t < 0 || t >= s(this, V).length)
        throw new Error("Index out of range");
      const i = new F(e);
      s(this, V)[t].add(i);
    }
    return this;
  }
  degree(e) {
    return f.max(...s(this, V).map((t) => t.degree(e)));
  }
  get display() {
    return this.tex + "as display";
  }
  // ------------------------------------------
  get equations() {
    return s(this, V);
  }
  set equations(e) {
    h(this, V, e);
  }
  evaluate(e, t) {
    throw new Error("Method not implemented.");
  }
  hasVariable(e) {
    return s(this, Se).includes(e);
  }
  isEqual(e) {
    return this.equations.every((t, i) => t.isEqual(e.equations[i]));
  }
  get isSolvable() {
    return this.variables.length === s(this, V).length;
  }
  get matrix() {
    return s(this, Kt).call(this);
  }
  multiply(e, t) {
    if (Array.isArray(e)) {
      if (e.length !== s(this, V).length)
        throw new Error("The number of values must be the same as the number of equations");
      for (let i = 0; i < e.length; i++)
        s(this, V)[i].multiply(e[i]);
      return this;
    }
    if (t === void 0 || t < 0 || t >= s(this, V).length)
      throw new Error("Index out of range");
    return s(this, V)[t].multiply(e), this;
  }
  reduce() {
    throw new Error("Method not implemented.");
  }
  solve() {
    return [];
  }
  subtract(e, t) {
    if (e instanceof Je) {
      const i = e.equations.length;
      if (i !== s(this, V).length)
        throw new Error("The number of equations must be the same");
      for (let r = 0; r < i; r++)
        s(this, V)[r].subtract(e.equations[r]);
    } else {
      if (t === void 0 || t < 0 || t >= s(this, V).length)
        throw new Error("Index out of range");
      const i = new F(e);
      s(this, V)[t].subtract(i);
    }
    return this;
  }
  get tex() {
    const e = this.clone().reorder();
    return this.buildTex(e.equations);
  }
  get variables() {
    return s(this, Se);
  }
  set variables(e) {
    const t = typeof e == "string" ? e.split("") : [...e];
    t.sort(), h(this, Se, t);
  }
};
V = new WeakMap(), Se = new WeakMap(), Ht = new WeakMap(), Kt = new WeakMap();
let li = Je;
var Me, xt, ci;
class gs {
  /**
   *
   * @param {string} value (optional) Default polynom to parse on class creation
   */
  constructor(e) {
    p(this, xt);
    p(this, Me);
    a(this, "parse", (e) => (h(this, Me, new ni(Ue.SET).parse(e).rpn), this));
    return h(this, Me, []), e !== void 0 && this.parse(e), this;
  }
  evaluate(e) {
    this.variables.forEach((i) => {
      Object.hasOwn(e, i) || (e[i] = !1);
    });
    const t = [];
    for (const i of s(this, Me))
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
    return s(this, Me);
  }
  get tex() {
    const e = [];
    for (const t of s(this, Me))
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
    return s(this, Me).filter((e) => e.tokenType === "variable").map((e) => e.token);
  }
  vennAB() {
    return q(this, xt, ci).call(this, {
      A: ["A", "AB"],
      B: ["B", "AB"]
    }, ["A", "B", "AB", "E"]);
  }
  vennABC() {
    return q(this, xt, ci).call(this, {
      A: ["A", "AB", "AC", "ABC"],
      B: ["B", "AB", "BC", "ABC"],
      C: ["C", "AC", "BC", "ABC"]
    }, ["A", "B", "C", "AB", "AC", "BC", "ABC", "E"]);
  }
}
Me = new WeakMap(), xt = new WeakSet(), ci = function(e, t) {
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
  for (const n of s(this, Me))
    if (n.tokenType === "variable")
      e[n.token] === void 0 ? i.push(/* @__PURE__ */ new Set()) : i.push(new Set(e[n.token]));
    else
      switch (n.token) {
        case "&":
          if (i.length >= 2) {
            const l = i.pop(), c = i.pop();
            c && l && i.push(new Set([...c].filter((u) => l.has(u))));
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
            c && l && i.push(new Set([...c].filter((u) => !l.has(u))));
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
var ht, A, Qe, fi, Li, Et, di;
const Q = class Q {
  constructor(...e) {
    p(this, Et);
    p(this, ht, mt.POWER);
    p(this, A, []);
    return this.parse(...e), this;
  }
  parse(...e) {
    return h(this, A, []), e.length === 0 ? this : (e.forEach((t) => {
      t instanceof Q ? s(this, A).push(...t.factors.map((i) => i.clone())) : s(this, A).push(new re(t));
    }), this);
  }
  clone() {
    return new Q(...s(this, A).map((e) => e.clone()));
  }
  get tex() {
    const { num: e, den: t } = q(this, Et, di).call(this);
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.tex : e.map((n) => n.tex).join("");
    const i = e.length === 1 ? e[0].asSingle.tex : e.map((n) => n.tex).join(""), r = t.length === 1 ? t[0].asSingle.tex : t.map((n) => n.tex).join("");
    return `\\frac{ ${i} }{ ${r} }`;
  }
  get display() {
    const { num: e, den: t } = q(this, Et, di).call(this);
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.display : e.map(
        (n, l) => l === 0 && n.polynom.monoms.length === 1 ? n.asSingle.display : n.display
      ).join("");
    const i = e.length === 1 ? e[0].asSingle.display : e.map((n) => n.display).join(""), r = t.length === 1 ? t[0].asSingle.display : t.map((n) => n.display).join("");
    return `(${i})/(${r})`;
  }
  static gcd(...e) {
    var i;
    if (e.length === 0)
      return new Q().one();
    if (e.length === 1)
      return e[0];
    if (e.length === 2)
      return q(i = Q, Qe, fi).call(i, e[0], e[1]);
    let t = e[0];
    return e.shift(), e.forEach((r) => {
      var n;
      return t = q(n = Q, Qe, fi).call(n, t, r);
    }), t;
  }
  static lcm(...e) {
    if (e.length === 0)
      return new Q().one();
    if (e.length === 1)
      return e[0];
    let t = e[0];
    return e.shift(), e.forEach((i) => {
      var r;
      return t = q(r = Q, Qe, Li).call(r, t, i);
    }), t;
  }
  add(...e) {
    const t = [this.numerator, ...e.map((c) => c.numerator)], i = [this.denominator, ...e.map((c) => c.denominator)];
    let r;
    if (i.some((c) => c.factors.length > 0)) {
      const c = Q.lcm(...i);
      t.forEach((u, d) => {
        u.multiply(c.clone().divide(i[d]));
      }), r = c;
    }
    const n = Q.gcd(...t), l = new x(0).add(
      ...t.map((c) => c.divide(n).reduce().develop().factors[0].polynom)
    ).reduce();
    return h(this, A, [
      ...n.factors,
      new re(l)
    ]), r && this.divide(r), h(this, A, s(this, A).filter((c) => !c.power.isZero())), this;
  }
  get asPower() {
    return h(this, ht, mt.POWER), this;
  }
  get asRoot() {
    return h(this, ht, mt.ROOT), this;
  }
  degree(e) {
    return s(this, A).reduce((t, i) => t.add(i.degree(e)), new f("0"));
  }
  get denominator() {
    return new Q(
      ...s(this, A).filter((e) => e.power.isNegative()).map((e) => e.clone().inverse())
    );
  }
  derivative() {
    const e = [], t = s(this, A).length;
    for (let r = 0; r < t; r++) {
      const n = s(this, A).slice(), l = n.splice(r, 1)[0].derivative();
      e.push(
        new Q(...n, ...l)
      );
    }
    e.forEach((r) => r.reduce());
    const i = e.shift();
    return i !== void 0 && h(this, A, i.factors), this.add(...e);
  }
  develop() {
    const e = new x("1"), t = new x("1");
    return this.numerator.factors.forEach((i) => {
      e.multiply(i.develop());
    }), this.denominator.factors.forEach((i) => {
      t.multiply(i.develop());
    }), new Q().fromPolynom(e, t);
  }
  divide(e) {
    return h(this, A, s(this, A).concat(e.clone().factors.map((t) => t.inverse()))), this;
  }
  evaluate(e, t) {
    return t ? s(this, A).reduce((i, r) => i * r.evaluate(e, t), 1) : s(this, A).reduce((i, r) => i.multiply(r.evaluate(e)), new f("1"));
  }
  factorize(e) {
    const t = [];
    s(this, A).forEach((l) => {
      const c = l.polynom.factorize(e);
      if (c.length > 1) {
        const u = l.power.clone();
        t.push(...c.map((d) => new re(d, u)));
      } else
        t.push(l.clone());
    });
    const i = new Q(...t), r = i.numerator.reduce(), n = i.denominator.reduce();
    return r.divide(n);
  }
  get factors() {
    return s(this, A);
  }
  set factors(e) {
    h(this, A, e);
  }
  fromPolynom(e, t) {
    if (h(this, A, [new re(new x(e))]), t) {
      const i = new x(t);
      if (i.isOne())
        return this;
      if (i.isZero())
        throw new Error("Cannot divide by zero");
      s(this, A).push(new re(i, -1));
    }
    return this;
  }
  getZeroes() {
    const e = [].concat(...s(this, A).map((t) => t.polynom.getZeroes()));
    return e.sort((t, i) => t.value - i.value), e.filter(
      (t, i, r) => i === r.findIndex(
        (n) => n.value === t.value
      )
    );
  }
  hasVariable(e) {
    return s(this, A).some((t) => t.hasVariable(e));
  }
  inverse() {
    return h(this, A, s(this, A).map((e) => e.inverse())), this;
  }
  isEqual(e) {
    const t = Q.gcd(this, e), i = this.clone().divide(t).reduce(), r = e.clone().divide(t).reduce();
    return i.isOne() && r.isOne();
  }
  isOne() {
    return s(this, A).every((e) => e.isOne());
  }
  isZero() {
    return s(this, A).every((e) => e.isZero());
  }
  multiply(...e) {
    return e.forEach((t) => {
      h(this, A, s(this, A).concat(t.clone().factors));
    }), this;
  }
  get numerator() {
    return new Q(...s(this, A).filter((e) => e.power.isPositive()));
  }
  one() {
    return h(this, A, [new re("1", "1")]), this;
  }
  opposite() {
    const e = s(this, A).findIndex((t) => t.display === "(-1)");
    return e >= 0 ? s(this, A).splice(e, 1) : s(this, A).push(new re("-1", "1")), this;
  }
  pow(e) {
    return h(this, A, s(this, A).map((t) => t.pow(e))), this;
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    const e = dt(this);
    return h(this, A, Object.values(e).map((t) => {
      const i = t[0].polynom, r = t.reduce((n, l) => n.add(l.power), new f("0"));
      return new re(i, r.reduce());
    }).filter((t) => !t.power.isZero())), this;
  }
  root(e) {
    return h(this, A, s(this, A).map((t) => t.root(e))), this;
  }
  /**
   * Reoarder the factors using :
   * 1. number of monoms
   * 2. degree of polynom
   * 3. power of polyfactor
   */
  sort(e) {
    return s(this, A).sort((t, i) => {
      const r = t.power.value, n = i.power.value;
      if (r * n < 0)
        return -r;
      const l = t.polynom.monoms.length, c = i.polynom.monoms.length;
      if (l !== c)
        return l - c;
      const u = t.polynom.degree(e).value, d = i.polynom.degree(e).value;
      return u !== d ? u - d : r !== n ? r - n : t.degree().isLeq(i.degree()) ? -1 : 1;
    }), this;
  }
  sqrt() {
    return h(this, A, s(this, A).map((e) => e.sqrt())), this;
  }
  subtract(...e) {
    return this.add(...e.map((t) => t.opposite()));
  }
  tableOfSigns() {
    const e = this.getZeroes(), t = e.map((n) => n.value), i = this.factorize().factors.map((n) => ({ factor: new re(n), ...n.tableOfSigns() }));
    return i.forEach((n) => {
      const l = new Array(2 * e.length + 1).fill("");
      let c = n.signs.shift(), u = n.roots.shift();
      const d = l.map((m, v) => {
        if (v % 2 === 0)
          return c;
        if (u === void 0 || u.value !== t[(v - 1) / 2])
          return "t";
        const L = n.signs.shift();
        return c = n.signs.shift(), u = n.roots.shift(), L;
      });
      n.roots = e, n.signs = d;
    }), { signs: i.map((n) => [...n.signs]).reduce((n, l) => n.length === 0 ? l : (l.forEach((c, u) => {
      switch (c) {
        case "d":
          n[u] = "d";
          break;
        case "z":
          n[u] = n[u] === "d" ? "d" : "z";
          break;
        case "h":
          n[u] = "h";
          break;
        case "-":
          n[u] = n[u] === "h" ? "h" : n[u] === "-" ? "+" : "-";
          break;
      }
    }), n), []), roots: e, factors: i };
  }
  get variables() {
    return s(this, A).reduce((e, t) => e.concat(t.variables), []);
  }
  zero() {
    return h(this, A, [new re("0", "1")]), this;
  }
};
ht = new WeakMap(), A = new WeakMap(), Qe = new WeakSet(), fi = function(e, t) {
  const i = dt(e), r = dt(t), l = Object.keys(i).filter((c) => Object.hasOwn(r, c)).map((c) => {
    const u = i[c].reduce((m, v) => m.add(v.power), new f("0")), d = r[c].reduce((m, v) => m.add(v.power), new f("0"));
    return new re(c, f.min(u, d));
  });
  return new Q(...l);
}, Li = function(e, t) {
  const i = dt(e), r = dt(t), l = [.../* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(r)])].map((c) => {
    const u = Object.hasOwn(i, c) ? i[c].reduce((m, v) => m.add(v.power), new f("0")) : new f(0), d = Object.hasOwn(r, c) ? r[c].reduce((m, v) => m.add(v.power), new f("0")) : new f(0);
    return new re(c, f.max(u, d));
  });
  return new Q(...l);
}, Et = new WeakSet(), di = function() {
  let e, t = [];
  return s(this, ht) === mt.ROOT ? (e = this.numerator.factors, t = this.denominator.factors) : e = s(this, A), e.length === 0 && (e = [new re("1")]), { num: e, den: t };
}, p(Q, Qe);
let ui = Q;
function dt(o) {
  const e = new f().one(), t = new f().one(), i = o.factors.reduce((l, c) => {
    if (c.polynom.degree().isZero())
      return c.power.isPositive() ? e.multiply(c.polynom.monoms[0].coefficient) : t.multiply(c.polynom.monoms[0].coefficient), l;
    const u = c.polynom.display;
    return Object.hasOwn(l, u) ? l[u].push(c) : l[u] = [c], l;
  }, {}), { numerator: r, denominator: n } = e.divide(t).reduce();
  return r !== 1 && (i[r.toString()] = [new re(r, 1)]), n !== 1 && (i[n.toString()] = [new re(n, -1)]), i;
}
var Xe, I;
const _e = class _e {
  constructor(e, t) {
    p(this, Xe, !0);
    p(this, I, []);
    return e && (t = t ?? e, this.fromDimensions(e, t)), this;
  }
  parse(e) {
    return this.fromValues(e);
  }
  clone() {
    const e = [];
    return s(this, I).forEach((t) => {
      const i = [];
      t.forEach((r) => {
        i.push(r.clone());
      }), e.push(i);
    }), new _e().fromValues(e);
  }
  get tex() {
    if (s(this, I).length === 0)
      return "";
    const e = s(this, Xe) ? "pmatrix" : "bmatrix";
    return [
      `\\begin{${e}}`,
      ...this.rows.map((t) => "	" + t.map((i) => i.display).join(" & ") + "\\\\"),
      `\\end{${e}}`
    ].join(`
`);
  }
  get display() {
    if (s(this, I).length === 0)
      return "";
    const e = s(this, Xe) ? ["(", ")"] : ["[", "]"];
    return e[0] + this.map((t) => t.display).map((t) => `(${t.join(",")})`).join(",") + e[1];
  }
  add(e) {
    if (!this.canBeAdded(e))
      throw new Error("Cannot add a matrix with different dimensions.");
    return this.forEach((t, i, r) => {
      t.add(e.values[i][r]);
    }), this;
  }
  get bmatrix() {
    return h(this, Xe, !1), this;
  }
  canBeAdded(e) {
    const { rows: t, cols: i } = this.dimension, { rows: r, cols: n } = e.dimension;
    return t === r && i === n;
  }
  canBeMultiplied(e) {
    return this.dimension.cols === e.dimension.rows;
  }
  characteristic_polynom(e) {
    return e ?? (e = "k"), this.clone().subtract(
      new _e(this.dimension.rows).one().multiply(new x(e))
    ).determinant();
  }
  cofactor(e, t) {
    const i = this.clone();
    return i.values.splice(e, 1), i.values.forEach((r) => {
      r.splice(t, 1);
    }), i.determinant().multiply((-1) ** (e + t));
  }
  get cols() {
    const e = Array.from({ length: this.dimension.cols }, () => Array.from({ length: this.dimension.rows }, () => new x()));
    return this.forEach((t, i, r) => {
      e[r][i] = t;
    }), e;
  }
  determinant() {
    if (!this.isSquare())
      throw new Error("Matrix is not square");
    const e = new x();
    return s(this, I).length === 1 ? s(this, I)[0][0].clone() : (this.values[0].forEach((t, i) => {
      const r = this.cofactor(0, i);
      e.add(t.clone().multiply(r));
    }), e);
  }
  get dimension() {
    return {
      rows: s(this, I).length,
      cols: s(this, I)[0].length
    };
  }
  flat() {
    return s(this, I).flat();
  }
  forEach(e) {
    s(this, I).forEach((t, i) => {
      t.forEach((r, n) => {
        e(r, i, n);
      });
    });
  }
  fromDimensions(e, t) {
    return h(this, I, Array.from({ length: e }, () => Array.from({ length: t }, () => new x()))), this;
  }
  fromString(e) {
    if (e.startsWith("((") && e.endsWith("))"))
      return this.fromString(e.substring(1, e.length - 1));
    const t = e.split("),(");
    return h(this, I, t.map((i, r) => r === 0 ? i.substring(1).split(",") : r === t.length - 1 ? i.substring(0, i.length - 1).split(",") : i.split(",")).map(
      (i) => i.map((r) => new x(r))
    )), this;
  }
  fromValues(e) {
    h(this, I, []);
    const t = e[0].length;
    if (e.some((i) => i.length !== t))
      throw new Error("Each line must be the same length");
    return e.forEach((i) => {
      const r = [];
      i.forEach((n) => {
        r.push(new x(n));
      }), s(this, I).push(r);
    }), this;
  }
  fromVectors(...e) {
    h(this, I, []);
    const t = e[0].dimension;
    if (e.some((i) => i.dimension !== t))
      throw new Error("Each vectors must be the same dimension");
    return this.fromDimensions(e[0].dimension, e.length), e.forEach((i, r) => {
      i.array.forEach((n, l) => {
        s(this, I)[l][r] = new x(n);
      });
    }), this;
  }
  isEqual(e) {
    if (!this.canBeAdded(e))
      return !1;
    let t = !0;
    return this.forEach((i, r, n) => {
      t && (t = i.isEqual(e.values[r][n]));
    }), t;
  }
  isOne() {
    for (let e = 0; e < s(this, I).length; e++)
      for (let t = 0; t < s(this, I)[e].length; t++)
        if (t === e && !s(this, I)[e][t].isOne() || t !== e && !s(this, I)[e][t].isZero())
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
    const { rows: t, cols: i } = this.dimension, r = Array.from({ length: t }, () => Array.from({ length: i }, () => {
    }));
    return s(this, I).forEach((n, l) => {
      n.forEach((c, u) => {
        r[l][u] = e(c, l, u);
      });
    }), r;
  }
  multiply(e) {
    if (e instanceof _e) {
      if (!this.canBeMultiplied(e))
        throw new Error(`Cannot multiply a matrix with incompatibles dimensions: ${this.cols.length} -> ${e.rows.length} `);
      const t = new _e(this.dimension.rows, e.dimension.cols);
      return t.forEach((i, r, n) => {
        const l = this.rows[r], c = e.cols[n], u = new x();
        l.forEach((d, m) => {
          u.add(d.clone().multiply(c[m]));
        }), t.setValue(r, n, u);
      }), h(this, I, t.values), this;
    }
    return this.forEach((t) => {
      t.multiply(e);
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
    return h(this, Xe, !0), this;
  }
  pow(e) {
    return Di(this, e);
  }
  reduce() {
    throw new Error("Not yet implemented");
  }
  get rows() {
    return s(this, I);
  }
  setValue(e, t, i) {
    const { rows: r, cols: n } = this.dimension;
    if (e < 0 || e >= r || t < 0 || t >= n)
      throw new Error(`${e}x${t} is out of range (${r}x${n})`);
    return s(this, I)[e][t] = new x(i), this;
  }
  subtract(e) {
    if (!this.canBeAdded(e))
      throw new Error("Cannot subtract a matrix with different dimensions.");
    return this.forEach((t, i, r) => {
      t.subtract(e.values[i][r]);
    }), this;
  }
  get values() {
    return s(this, I);
  }
  zero() {
    return this.forEach((e) => e.zero()), this;
  }
};
Xe = new WeakMap(), I = new WeakMap();
let pi = _e;
function ws(o, e) {
  return o.dimension === e.dimension && o.array.every(
    (t, i) => e.array[i].isEqual(t)
  );
}
function ys(o, e) {
  if (o.dimension !== e.dimension)
    return !1;
  const t = e.array[0].value / o.array[0].value;
  return o.array.every(
    (i, r) => e.array[r].value === i.value * t
  );
}
function vs(o, e) {
  return o.dimension !== e.dimension ? new f().invalid() : o.array.reduce(
    (t, i, r) => t.add(i.clone().multiply(e.array[r])),
    new f(0)
  );
}
function ks(...o) {
  if (o.some((e) => e.dimension !== o[0].dimension))
    throw new Error("All vectors must have the same dimension");
  if (o[0].dimension !== o.length)
    throw new Error(`The determinant of dimension ${o[0].dimension} must have the same number of vectors (${o.length} given)`);
  return o[0].dimension === 2 ? o[0].array[0].clone().multiply(o[1].array[1]).subtract(o[0].array[1].clone().multiply(o[1].array[0])) : o[0].array[0].clone().multiply(
    o[1].array[1].clone().multiply(o[2].array[2]).subtract(o[1].array[2].clone().multiply(o[2].array[1]))
  ).subtract(
    o[0].array[1].clone().multiply(
      o[1].array[0].clone().multiply(o[2].array[2]).subtract(o[1].array[2].clone().multiply(o[2].array[0]))
    )
  ).add(o[0].array[2].clone().multiply(o[1].array[0].clone().multiply(o[2].array[1]).subtract(o[1].array[1].clone().multiply(o[2].array[0]))));
}
var U, Ve;
const De = class De {
  constructor(...e) {
    p(this, U, []);
    p(this, Ve, !1);
    a(this, "zero", () => (s(this, U).forEach((e) => e.zero()), this));
    a(this, "one", () => (this.zero(), this.x.one(), this));
    a(this, "opposite", () => (s(this, U).forEach((e) => e.opposite()), this));
    a(this, "add", (e) => (s(this, U).forEach((t, i) => t.add(e.array[i])), this));
    a(this, "subtract", (e) => this.add(e.clone().opposite()));
    a(this, "unit", () => {
      const e = this.norm;
      return e === 0 ? this : this.divideByScalar(e);
    });
    a(this, "dot", (e) => vs(this, e));
    a(this, "normal", () => {
      if (this.dimension >= 3)
        throw new Error("Normal vector can only be determined in 2D");
      const e = this.x.clone().opposite(), t = this.y.clone();
      return s(this, U)[0] = t, s(this, U)[1] = e, this;
    });
    a(this, "isEqual", (e) => ws(this, e));
    a(this, "isColinearTo", (e) => ys(this, e));
    a(this, "isNormalTo", (e) => this.dot(e).isZero());
    a(this, "multiplyByScalar", (e) => {
      const t = new f(e);
      return this.array.forEach((i) => i.multiply(t)), this;
    });
    a(this, "divideByScalar", (e) => this.multiplyByScalar(new f(e).inverse()));
    a(this, "simplify", () => this.multiplyByScalar(
      W.lcm(...this.array.map((e) => e.denominator))
    ).divideByScalar(
      W.gcd(...this.array.map((e) => e.numerator))
    ).multiplyByScalar(
      this.x.isNegative() ? -1 : 1
    ));
    a(this, "angle", (e, t, i) => {
      let r = this.dot(e).value;
      return t && (r = Math.abs(r)), (i ? 1 : 180 / Math.PI) * Math.acos(r / (this.norm * e.norm));
    });
    a(this, "fromString", (e) => {
      e.startsWith("(") && (e = e.substring(1)), e.endsWith(")") && (e = e.substring(0, e.length - 1));
      const t = e.split(/[,;\s]/g).filter((i) => i.trim() !== "");
      return t.length < 2 ? this : (h(this, U, t.map((i) => new f(i))), this);
    });
    e.length > 0 && this.parse(...e);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get array() {
    return s(this, U);
  }
  set array(e) {
    h(this, U, e);
  }
  get x() {
    return s(this, U)[0];
  }
  set x(e) {
    s(this, U)[0] = new f(e);
  }
  get y() {
    return s(this, U)[1];
  }
  set y(e) {
    s(this, U)[1] = new f(e);
  }
  get z() {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    return s(this, U)[2];
  }
  set z(e) {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    s(this, U)[2] = new f(e);
  }
  get asPoint() {
    return s(this, Ve);
  }
  set asPoint(e) {
    h(this, Ve, e);
  }
  get normSquare() {
    return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new f(0));
  }
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get tex() {
    return s(this, Ve) ? `\\left(${this.array.map((e) => e.tex).join(";")}\\right)` : `\\begin{pmatrix} ${this.array.map((e) => e.tex).join(" \\\\ ")} \\end{pmatrix}`;
  }
  get display() {
    return s(this, Ve) ? `(${this.array.map((e) => e.display).join(";")})` : `((${this.array.map((e) => e.display).join(",")}))`;
  }
  setDimension(e = 2) {
    if (e < 2)
      throw new Error("Dimension must be at least 2");
    if (e < this.dimension)
      h(this, U, s(this, U).slice(0, e));
    else if (e > this.dimension)
      for (let t = this.dimension; t < e; t++)
        s(this, U).push(new f(0));
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
    return h(this, Ve, e !== !1), this;
  }
  parse(...e) {
    if (e.length === 0)
      throw new Error("Invalid value");
    if (e.length === 1) {
      if (e[0] instanceof De)
        return e[0].clone();
      if (typeof e[0] == "string")
        return this.fromString(e[0]);
      throw new Error("Invalid value");
    }
    if (e.length === 2) {
      const [t, i] = e;
      if (t instanceof De && i instanceof De) {
        if (t.dimension !== i.dimension)
          throw new Error("Vectors must have the same dimension");
        return h(this, U, i.array.map((r, n) => r.clone().subtract(t.array[n]))), this;
      }
    }
    return h(this, U, e.map((t) => new f(t))), this;
  }
  clone() {
    const e = new De();
    return e.array = this.copy(), e.asPoint = this.asPoint, e;
  }
  copy() {
    return s(this, U).map((e) => e.clone());
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
    return new De(
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
    const t = new De(this, e);
    return {
      value: t.norm,
      fraction: t.normSquare,
      tex: t.tex
    };
  }
};
U = new WeakMap(), Ve = new WeakMap();
let N = De;
var be = /* @__PURE__ */ ((o) => (o.None = "none", o.Parallel = "parallel", o.Perpendicular = "perpendicular", o.Tangent = "tangent", o))(be || {}), mi = /* @__PURE__ */ ((o) => (o.None = "none", o.Parallel = "parallel", o.Perpendicular = "perpendicular", o.Tangent = "tangent", o))(mi || {});
function Vi(o = 0.5) {
  return Math.random() < o;
}
function ge(o, e, t) {
  if (e === void 0)
    return o >= 0 ? ge(0, o) : ge(o, 0);
  if (o === e)
    return o;
  if (t === void 0)
    return Math.floor(Math.random() * (e - o + 1) + o);
  if (Math.abs(e - o) <= t.length)
    throw new Error("The number of excluded values is too high.");
  let i = ge(o, e);
  for (; t.includes(i); )
    i = ge(o, e);
  return i;
}
function K(o, e) {
  return e === !1 ? Vi() ? ge(1, o) : -ge(1, o) : ge(-o, o);
}
function bs(o) {
  let e = W.primes();
  return o !== void 0 && (e = e.filter((t) => t < o)), Ni(e);
}
function xs(o, e) {
  return e === void 0 && (e = 1), o.length <= 0 ? Object.values(o) : Fi(o).slice(0, e);
}
function Ni(o) {
  return o.length === 0 ? null : o[ge(0, o.length - 1)];
}
function Fi(o) {
  const e = Object.values(o);
  for (let t = e.length - 1; t > 0; t--) {
    const i = Math.floor(Math.random() * (t + 1)), r = e[t];
    e[t] = e[i], e[i] = r;
  }
  return e;
}
class S extends N {
  constructor(...e) {
    super(), e.length > 0 && this.parse(...e);
  }
  parse(...e) {
    if (this.asPoint = !0, e.length === 1) {
      if (e[0] instanceof N)
        return this.array = e[0].copy(), this;
      if (typeof e[0] == "string")
        return this.fromString(e[0]), this;
    }
    if (e.length > 1) {
      if (e.some((i) => i instanceof N))
        throw new Error("Creating a point with  multiple argument requires an input fraction");
      const t = e.map((i) => new f(i));
      if (t.some((i) => i.isNaN()))
        throw new Error("The value is not a valid point sting (a,b): " + e.join(","));
      this.array = t;
    }
    return this;
  }
  clone() {
    const e = new S();
    return e.array = this.copy(), e.asPoint = !0, e;
  }
}
var Ie, z, D, X, ae, _, ze, Ne;
const je = class je {
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...e) {
    p(this, Ie);
    // ax + by + c = 0
    p(this, z);
    p(this, D);
    p(this, X);
    p(this, ae);
    p(this, _);
    p(this, ze);
    p(this, Ne, "canonical");
    a(this, "randomPoint", (e) => {
      const t = s(this, _).clone().multiplyByScalar(K(e === void 0 || e <= 1 ? 3 : e, !1)).add(s(this, ae));
      return t.asPoint = !0, t;
    });
    a(this, "randomNearPoint", (e) => {
      const t = this.randomPoint(e);
      let i = 10;
      for (; this.isOnLine(t) && i > 0; )
        t.x.add(K(1, !1)), t.y.add(K(1, !1)), i--;
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
    a(this, "parse", (...e) => {
      if (e.length === 0)
        return this;
      if (e.length === 1) {
        if (e[0] instanceof je)
          return this.fromCoefficient(e[0].a, e[0].b, e[0].c);
        if (e[0] instanceof F)
          return this.fromEquation(e[0]);
        if (typeof e[0] == "string")
          try {
            const t = new F(e[0]);
            return this.parse(t);
          } catch {
            return this;
          }
      }
      if (e.length === 2 && e.every((t) => t instanceof N)) {
        const t = e;
        if (t[0].asPoint && t[1].asPoint)
          return this.fromPointAndDirection(t[0], new N(t[0], t[1]));
        if (t[0].asPoint && !t[1].asPoint)
          return this.fromPointAndDirection(t[0], t[1]);
      }
      if (e.length === 3) {
        if (e[0] instanceof N && e[1] instanceof N) {
          if (e[2] === be.Perpendicular)
            return this.fromPointAndNormal(e[0], e[1]);
          if (e[2] === be.Parallel)
            return this.fromPointAndDirection(e[0], e[1]);
        }
        return e[0] instanceof N && e[1] instanceof je ? e[2] === be.Parallel || e[2] === null ? this.fromPointAndLine(e[0], e[1], be.Parallel) : this.fromPointAndLine(e[0], e[1], be.Perpendicular) : this.fromCoefficient(
          e[0],
          e[1],
          e[2]
        );
      }
      return console.log("Something wrong happened while creating the line"), console.log(e), this;
    });
    a(this, "fromEquation", (e) => {
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
    a(this, "fromCoefficient", (e, t, i) => (h(this, z, new f(e)), h(this, D, new f(t)), h(this, X, new f(i)), h(this, _, new N(s(this, D).clone(), s(this, z).clone().opposite())), h(this, ae, new N(new f().zero(), s(this, X).clone())), h(this, ze, s(this, _).clone().normal()), this));
    a(this, "fromPointAndDirection", (e, t) => (this.fromCoefficient(
      t.y,
      t.x.clone().opposite(),
      e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)).opposite()
    ), h(this, ae, e.clone()), h(this, _, t.clone()), h(this, ze, s(this, _).clone().normal()), this));
    a(this, "fromPointAndNormal", (e, t) => this.fromCoefficient(
      t.x,
      t.y,
      e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()
    ));
    a(this, "fromPointAndLine", (e, t, i) => (i === void 0 && (i = be.Parallel), i === be.Parallel ? this.fromPointAndNormal(e, t.normal) : i === be.Perpendicular ? this.fromPointAndNormal(e, t.director) : this));
    a(this, "clone", () => (h(this, z, s(this, z).clone()), h(this, D, s(this, D).clone()), h(this, X, s(this, X).clone()), h(this, _, s(this, _).clone()), h(this, ae, s(this, ae).clone()), h(this, ze, s(this, ze).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    a(this, "isOnLine", (e) => s(this, z).clone().multiply(e.x).add(
      s(this, D).clone().multiply(e.y)
    ).add(s(this, X)).isZero());
    a(this, "isParallelTo", (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height));
    a(this, "isSameAs", (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height));
    a(this, "isPerpendicularTo", (e) => this.d.isNormalTo(e.d));
    a(this, "isVertical", () => this.slope.isInfinity());
    a(this, "simplify", () => {
      const e = W.lcm(s(this, z).denominator, s(this, D).denominator, s(this, X).denominator), t = W.gcd(s(this, z).numerator, s(this, D).numerator, s(this, X).numerator);
      return this.fromCoefficient(
        s(this, z).clone().multiply(e).divide(t),
        s(this, D).clone().multiply(e).divide(t),
        s(this, X).clone().multiply(e).divide(t)
      ), this;
    });
    a(this, "simplifyDirection", () => (s(this, _).simplify(), this));
    a(this, "intersection", (e) => {
      const t = new S();
      let i = !1, r = !1;
      return s(this, D).isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new f().invalid(), t.y = new f().invalid(), i = !0) : this.isSameAs(e) ? (t.x = new f().invalid(), t.y = new f().invalid(), r = !0) : (t.x = s(this, D).clone().multiply(e.c).subtract(s(this, X).clone().multiply(e.b)).divide(s(this, z).clone().multiply(e.b).subtract(s(this, D).clone().multiply(e.a))), t.y = s(this, z).clone().multiply(e.c).subtract(s(this, X).clone().multiply(e.a)).divide(s(this, D).clone().multiply(e.a).subtract(s(this, z).clone().multiply(e.b)))), {
        point: t,
        hasIntersection: !(i || r),
        isParallel: i,
        isSame: r
      };
    });
    a(this, "getValueAtX", (e) => {
      const t = this.getEquation().isolate("y"), i = new f(e);
      return t instanceof F ? t.right.evaluate({ x: i }) : new f().invalid();
    });
    a(this, "getValueAtY", (e) => {
      const t = this.getEquation().isolate("x"), i = new f(e);
      return t instanceof F ? t.right.evaluate({ y: i }) : new f().invalid();
    });
    return h(this, z, new f().zero()), h(this, D, new f().zero()), h(this, X, new f().zero()), h(this, ae, new N()), h(this, _, new N()), h(this, ze, new N()), h(this, Ie, !0), e.length > 0 && this.parse(...e), this;
  }
  get a() {
    return s(this, z);
  }
  // ------------------------------------------
  // Getter and setter
  set a(e) {
    h(this, z, e);
  }
  get b() {
    return s(this, D);
  }
  set b(e) {
    h(this, D, e);
  }
  get c() {
    return s(this, X);
  }
  set c(e) {
    h(this, X, e);
  }
  get OA() {
    return s(this, ae);
  }
  set OA(e) {
    h(this, ae, e);
  }
  get d() {
    return s(this, _);
  }
  set d(e) {
    h(this, _, e);
  }
  get n() {
    return s(this, ze);
  }
  // ------------------------------------------
  getEquation() {
    const e = new F(new x().parse("xy", s(this, z), s(this, D), s(this, X)), new x("0"));
    return s(this, Ie) ? e.simplify() : e;
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
    return h(this, Ne, "canonical"), this;
  }
  get equation() {
    return h(this, Ne, "equation"), this;
  }
  get mxh() {
    return h(this, Ne, "mxh"), this;
  }
  get parametric() {
    return h(this, Ne, "parametric"), this;
  }
  get system() {
    return h(this, Ne, "system"), this;
  }
  get tex() {
    const e = s(this, Ne);
    switch (h(this, Ne, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().tex;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new x().parse("x", this.slope, this.height).tex;
      case "parametric":
      case "system": {
        const t = s(this, _).clone();
        return s(this, Ie) && t.simplify(), e === "parametric" ? `${N.asTex("x", "y")} = ${N.asTex(s(this, ae).x.tex, s(this, ae).y.tex)} + k\\cdot ${N.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}
            x &= ${new x(s(this, ae).x).add(new k(s(this, _).x).multiply(new k("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new x(s(this, ae).y).add(new k(s(this, _).y).multiply(new k("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`;
      }
      default: {
        const t = this.getEquation();
        return s(this, z).isNegative() && t.multiply(-1), t.tex;
      }
    }
  }
  get reduceBeforeDisplay() {
    return s(this, Ie);
  }
  set reduceBeforeDisplay(e) {
    h(this, Ie, e);
  }
  get display() {
    const e = s(this, Ne);
    switch (h(this, Ne, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().display;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new x().parse("x", this.slope, this.height).display;
      case "parametric": {
        const t = s(this, _).clone();
        return s(this, Ie) && t.simplify(), `((x,y))=((${s(this, ae).x.display},${s(this, ae).y.display}))+k((${t.x.display},${t.y.display}))`;
      }
      default: {
        const t = this.getEquation();
        return s(this, z).isNegative() && t.multiply(-1), t.display;
      }
    }
  }
  get normal() {
    return new N(s(this, z), s(this, D));
  }
  get director() {
    return s(this, _).clone();
  }
  get slope() {
    return s(this, z).clone().opposite().divide(s(this, D));
  }
  get height() {
    return s(this, X).clone().opposite().divide(s(this, D));
  }
  fromPoints(e, t) {
    return this.fromPointAndDirection(e, new N(e, t));
  }
  distanceTo(e) {
    const t = e.x.clone().multiply(s(this, z)).add(e.y.clone().multiply(s(this, D))).add(s(this, X)).abs(), i = this.normal.normSquare;
    if (i.isZero())
      return {
        value: NaN,
        tex: "Not a line",
        fraction: new f().infinite()
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
      new je().fromPoints(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) : !1;
  }
  // ------------------------------------------
  // Special functions
  // ------------------------------------------
  canonicalAsFloatCoefficient(e) {
    e === void 0 && (e = 2);
    let t = "";
    return s(this, z).isZero() || (s(this, z).isOne() ? t = "x" : s(this, z).clone().opposite().isOne() ? t = "-x" : t = s(this, z).value.toFixed(e) + "x"), s(this, D).isZero() || (s(this, D).isPositive() && (t += "+"), t += s(this, D).value.toFixed(e) + "y"), s(this, X).isZero() || (s(this, X).isPositive() && (t += "+"), t += s(this, X).value.toFixed(e)), t + "=0";
  }
};
Ie = new WeakMap(), z = new WeakMap(), D = new WeakMap(), X = new WeakMap(), ae = new WeakMap(), _ = new WeakMap(), ze = new WeakMap(), Ne = new WeakMap(), // A line is defined as the canonical form
a(je, "PERPENDICULAR", be.Perpendicular), a(je, "PARALLEL", be.Parallel);
let R = je;
var le, G, $e, Jt, _t, ei, ce, ji, $t, Ui, Gi, Wi, gi;
const ti = class ti {
  constructor(...e) {
    p(this, ce);
    p(this, le);
    p(this, G);
    p(this, $e);
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    a(this, "relativePosition", (e) => {
      if (s(this, le) === void 0 || s(this, G) === void 0)
        throw new Error("Circle not defined");
      const t = e.distanceTo(s(this, le)), i = Math.sqrt(s(this, G).value);
      return t.value - i > 1e-10 ? 0 : Math.abs(t.value - i) < 1e-10 ? 1 : 2;
    });
    a(this, "lineIntersection", (e) => {
      const t = [];
      if (s(this, $e) === void 0)
        return [];
      const i = s(this, $e).clone(), r = e.getEquation().clone().isolate("x"), n = e.getEquation().clone().isolate("y");
      return r instanceof F && n instanceof F && (i.replaceBy("y", n.right).simplify(), i.solve()), t;
    });
    a(this, "tangents", (e) => e instanceof f ? s(this, ei).call(this, e) : this.isPointOnCircle(e) ? s(this, Jt).call(this, e) : s(this, le) !== void 0 && s(this, le).distanceTo(e).value > this.radius.value ? s(this, _t).call(this, e) : (console.log("No tangents as the point is inside !"), []));
    a(this, "isPointOnCircle", (e) => {
      var t;
      return ((t = s(this, $e)) == null ? void 0 : t.test({ x: e.x, y: e.y })) ?? !1;
    });
    a(this, "getPointsOnCircle", (e) => {
      const t = W.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), i = [];
      return t.forEach((r) => {
        for (const n of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
          i.push(
            new S(
              this.center.x.clone().add(n[0] * r[0]),
              this.center.y.clone().add(n[1] * r[1])
            )
          );
      }), i;
    });
    p(this, Jt, (e) => {
      const t = new N(this.center, e);
      return [new R(e, t, be.Perpendicular)];
    });
    p(this, _t, (e) => {
      const t = this.center.x.clone().subtract(e.x), i = this.center.y.clone().subtract(e.y), r = new x("x"), n = new x("x^2+1");
      return r.multiply(t).subtract(i).pow(2), n.multiply(this.squareRadius), new F(r, n).solve().map((u) => {
        let d;
        const m = new F("y", "x");
        return u.exact instanceof f ? (d = e.x.clone().opposite().multiply(u.exact).add(e.y), m.right.multiply(u.exact).add(d)) : (d = e.x.clone().opposite().multiply(u.value).add(e.y), m.right.multiply(u.value).add(d)), new R(m);
      });
    });
    p(this, ei, (e) => {
      const t = e.numerator, i = -e.denominator, r = this.center.x.clone(), n = this.center.y.clone(), l = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), c = r.clone().multiply(t).opposite().subtract(n.clone().multiply(i)).add(l.clone().sqrt()), u = r.clone().multiply(t).opposite().subtract(n.clone().multiply(i)).subtract(l.clone().sqrt());
      return [new R(t, i, c), new R(t, i, u)];
    });
    e.length > 0 && this.parse(...e);
  }
  get center() {
    return s(this, le) ?? new S();
  }
  get squareRadius() {
    return s(this, G) ?? new f(0);
  }
  get cartesian() {
    if (s(this, $e) === void 0)
      throw new Error("Cartesian equation not defined");
    return s(this, $e);
  }
  get radius() {
    return s(this, G) === void 0 ? { tex: "", display: "", value: 0 } : s(this, G).isSquare() ? {
      tex: s(this, G).clone().sqrt().tex,
      display: s(this, G).clone().sqrt().display,
      value: s(this, G).clone().sqrt().value
    } : {
      tex: `\\sqrt{${s(this, G).tex}}`,
      display: `sqrt(${s(this, G).display})`,
      value: s(this, G).clone().sqrt().value
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
    return new ti(
      this.center.clone(),
      this.squareRadius.clone(),
      !0
    );
  }
  setRadius(e, t) {
    return t ? h(this, G, new f(e)) : h(this, G, new f(e).pow(2)), q(this, ce, $t).call(this), this;
  }
  parse(...e) {
    return q(this, ce, ji).call(this), typeof e[0] == "string" ? q(this, ce, gi).call(this, new F(e[0])) : e[0] instanceof F ? q(this, ce, gi).call(this, e[0]) : e[0] instanceof ti ? q(this, ce, Ui).call(this, e[0]) : e[0] instanceof S && e.length > 1 && (e[1] instanceof S ? e[2] instanceof S || q(this, ce, Wi).call(this, e[0], e[1]) : (e[1] instanceof f || typeof e[1] == "number") && q(this, ce, Gi).call(this, e[0], e[1], typeof e[2] == "boolean" ? e[2] : !1)), q(this, ce, $t).call(this), this;
  }
  // private _parseThroughtThreePoints(A: Point, B: Point, C: Point): this {
  //     const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(),
  //         mAC = T.remarquables.mediators.AC.clone()
  //     this.parse(mAB.intersection(mAC).point, A)
  //     return this
  // }
};
le = new WeakMap(), G = new WeakMap(), $e = new WeakMap(), Jt = new WeakMap(), _t = new WeakMap(), ei = new WeakMap(), ce = new WeakSet(), ji = function() {
  return h(this, le, void 0), h(this, G, void 0), h(this, $e, void 0), this;
}, $t = function() {
  h(this, $e, new F(
    new x(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
    new x(this.squareRadius.display)
  ).moveLeft());
}, Ui = function(e) {
  return h(this, le, e.center.clone()), h(this, G, e.squareRadius.clone()), q(this, ce, $t).call(this), this;
}, Gi = function(e, t, i) {
  return h(this, le, e.clone()), i ? h(this, G, new f(t)) : h(this, G, new f(t).pow(2)), this;
}, Wi = function(e, t) {
  return h(this, le, e.clone()), h(this, G, new N(s(this, le), t).normSquare), this;
}, gi = function(e) {
  if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
    const t = e.left.monomByDegree(2, "x"), i = e.left.monomByDegree(2, "y");
    let r, n, l;
    t.coefficient.isEqual(i.coefficient) ? (e.divide(t.coefficient), r = e.left.monomByDegree(1, "x"), n = e.left.monomByDegree(1, "y"), l = e.left.monomByDegree(0), h(this, le, new S(r.coefficient.clone().divide(2).opposite(), n.coefficient.clone().divide(2).opposite())), h(this, G, l.coefficient.clone().opposite().add(s(this, le).x.clone().pow(2)).add(s(this, le).y.clone().pow(2)))) : (h(this, le, void 0), h(this, G, void 0));
  }
  return this;
};
let Pt = ti;
var Z, Y;
const gt = class gt {
  constructor(e, t) {
    // ax + by + c = 0
    p(this, Z, new S());
    p(this, Y, new N());
    a(this, "clone", () => (h(this, Y, s(this, Y).clone()), h(this, Z, s(this, Z).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    a(this, "isOnLine", (e) => !1);
    a(this, "isParallelTo", (e) => {
      throw new Error("Method not implemented.");
    });
    a(this, "isSameAs", (e) => {
      throw new Error("Method not implemented.");
    });
    a(this, "isPerpendicularTo", (e) => {
      throw new Error("Method not implemented.");
    });
    a(this, "isVertical", () => {
      throw new Error("Method not implemented.");
    });
    a(this, "simplify", () => {
      throw new Error("Method not implemented.");
    });
    a(this, "intersection", (e) => {
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
    a(this, "randomPoint", (e = 5) => {
      const t = s(this, Z).clone(), i = new f(K(e, !1));
      return new S(
        t.x.clone().add(s(this, Y).x.clone().multiply(i)),
        t.y.clone().add(s(this, Y).y.clone().multiply(i)),
        t.z.clone().add(s(this, Y).z.clone().multiply(i))
      );
    });
    return h(this, Z, e.clone()), h(this, Y, t.asPoint ? new N(e, t) : t.clone()), this;
  }
  get OA() {
    return s(this, Z);
  }
  set OA(e) {
    h(this, Z, e);
  }
  get point() {
    return s(this, Z).clone();
  }
  get d() {
    return s(this, Y);
  }
  set d(e) {
    h(this, Y, e);
  }
  get tex() {
    return {
      parametric: `${N.asTex("x", "y", "z")} = ${N.asTex(s(this, Z).x.tex, s(this, Z).y.tex, s(this, Z).z.tex)} + k\\cdot ${N.asTex(s(this, Y).x.tex, s(this, Y).y.tex, s(this, Y).z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new x(s(this, Z).x).add(new k(s(this, Y).x).multiply(new k("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new x(s(this, Z).y).add(new k(s(this, Y).y).multiply(new k("k"))).reorder("k", !0).tex}\\\\
    z &= ${new x(s(this, Z).z).add(new k(s(this, Y).z).multiply(new k("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
      cartesian: `\\frac{ ${new x("x", 1, s(this, Z).x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new x("y", 1, s(this, Z).y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new x("z", 1, s(this, Z).z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
    };
  }
  get display() {
    const e = s(this, Z).x.display, t = s(this, Z).y.display, i = s(this, Z).z.display, r = this.direction.simplify(), n = r.x.display, l = r.y.display, c = r.z.display;
    return {
      parametric: `${N.asDisplay("x", "y", "z")} = ${N.asDisplay(s(this, Z).x.display, s(this, Z).y.display, s(this, Z).z.display)} + k\\cdot ${N.asDisplay(s(this, Y).x.display, s(this, Y).y.display, s(this, Y).z.display)}`,
      system: "",
      cartesian: `(x-${e})/${n} = (y-${t})/${l} = (z-${i})/${c}`
    };
  }
  get direction() {
    return s(this, Y).clone();
  }
  distanceTo(e) {
    const t = new N(s(this, Z), e), i = this.direction, r = this.direction.normSquare, n = t.cross(i).normSquare, l = n.clone().divide(r), c = l.clone().sqrt();
    return console.log("CROSS", t.cross(i).display), {
      value: Math.sqrt(l.value),
      fraction: l.clone().sqrt(),
      tex: c.isExact() ? c.tex : `\\sqrt{${l.tex}}`
    };
  }
  hitSegment(e, t) {
    const i = this.intersection(
      new gt(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) && i.point.z.value >= Math.min(e.z.value, t.z.value) && i.point.z.value <= Math.max(e.z.value, t.z.value) : !1;
  }
};
Z = new WeakMap(), Y = new WeakMap(), // A line is defined as the canonical form
a(gt, "PERPENDICULAR", mi.Perpendicular), a(gt, "PARALLEL", mi.Parallel);
let St = gt;
var Be, Ye;
const qi = class qi {
  constructor(e) {
    p(this, Be, new N(0, 0, 1));
    p(this, Ye, new S(0, 0, 0));
    return e && this.parse(e), this;
  }
  get normal() {
    return s(this, Be);
  }
  set normal(e) {
    h(this, Be, e), s(this, Be).asPoint = !1;
  }
  get point() {
    return s(this, Ye);
  }
  set point(e) {
    h(this, Ye, e), s(this, Ye).asPoint = !0;
  }
  get a() {
    return s(this, Be).x;
  }
  get b() {
    return s(this, Be).y;
  }
  get c() {
    return s(this, Be).z;
  }
  get d() {
    return s(this, Be).dot(s(this, Ye)).opposite();
  }
  get tex() {
    return new F(
      new x("xyz", this.a, this.b, this.c, this.d),
      new x(0)
    ).reduce().tex;
  }
  get display() {
    return new F(
      new x("xyz", this.a, this.b, this.c, this.d),
      new x(0)
    ).reduce().display;
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
      const n = e.equation.moveLeft().reduce().left, l = n.monomByLetter("x").coefficient, c = n.monomByLetter("y").coefficient, u = n.monomByLetter("z").coefficient, d = n.monomByDegree(0).coefficient;
      this.normal = new N(l, c, u), l.isNotZero() ? this.point = new S(d.clone().divide(l).opposite(), 0, 0) : c.isNotZero() ? this.point = new S(0, d.clone().divide(c).opposite(), 0) : this.point = new S(0, 0, d.clone().divide(u).opposite());
      return;
    }
    if (((i = e.points) == null ? void 0 : i.length) === 3 && e.points.every((n) => n instanceof N)) {
      const n = e.points[0], l = e.points[1], c = e.points[2], u = new N(n, l), d = new N(n, c);
      this.normal = u.cross(d), this.point = n;
      return;
    }
    if (((r = e.coefficients) == null ? void 0 : r.length) === 4) {
      const [n, l, c, u] = e.coefficients;
      this.normal = new N(n, l, c), this.point = new S(0, 0, -u);
      return;
    }
  }
  angle(e, t, i) {
    if (e instanceof qi)
      return this.normal.angle(e.normal, t, i);
    let r;
    if (e instanceof N) {
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
    throw this.normal.cross(e.normal), new S(0, 0, 0), new Error("Intersection with plane  not yet implemented !");
  }
  isPointOnPlane(e) {
    return this.normal.dot(e).add(this.d).isZero();
  }
};
Be = new WeakMap(), Ye = new WeakMap();
let wi = qi;
var H, ee, te, at, Pe, Nt, ii, At, Re, si, lt;
const ri = class ri {
  constructor(...e) {
    p(this, H, new S());
    p(this, ee, new S());
    p(this, te, new S());
    p(this, at, {
      AB: new R(),
      AC: new R(),
      BC: new R()
    });
    p(this, Pe, {
      AB: new S(),
      AC: new S(),
      BC: new S()
    });
    p(this, Nt, null);
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    /**
     * Parse values to a triangle. Supported formats:
     * Vector2D, Vector2D, Vector2D
     * x1, y1, x2, y2, x3, y3
     * @param values
     */
    a(this, "parse", (...e) => {
      if (e.length === 6) {
        const t = e.map((i) => new f(i));
        if (t.some((i) => i.isNaN()))
          throw new Error("One of the values is not a valid number");
        return this.parse(
          new N(t[0], t[1]),
          new N(t[2], t[3]),
          new N(t[4], t[5])
        );
      } else if (e.length === 3) {
        if (e.every((t) => typeof t == "string"))
          return this.parse(
            ...e.map((t) => new R(t))
          );
        if (e.every((t) => t instanceof R)) {
          const t = e[0].clone(), i = e[1].clone(), r = e[2].clone();
          h(this, at, { AB: t, BC: i, AC: r });
          let n = t.intersection(i);
          if (n.hasIntersection)
            h(this, ee, n.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (n = i.intersection(r), n.hasIntersection)
            h(this, te, n.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (n = r.intersection(t), n.hasIntersection)
            h(this, H, n.point.clone());
          else
            throw new Error("Lines do not intersect !");
        } else e.every((t) => t instanceof S) && (h(this, H, e[0].clone()), h(this, ee, e[1].clone()), h(this, te, e[2].clone()), h(this, at, {
          AB: new R(s(this, H), s(this, ee)),
          BC: new R(s(this, ee), s(this, te)),
          AC: new R(s(this, H), s(this, te))
        }));
      } else if (e.length === 1 && e[0] instanceof ri)
        return e[0].clone();
      return s(this, ii).call(this), this;
    });
    /**
     * Clone the Triangle class
     */
    a(this, "clone", () => new ri(
      s(this, H).clone(),
      s(this, ee).clone(),
      s(this, te).clone()
    ));
    // ------------------------------------------
    // Triangle operations and properties
    // ------------------------------------------
    /**
     * Generate the Line object for the three segments of the triangle
     */
    p(this, ii, () => {
      s(this, H).asPoint = !0, s(this, ee).asPoint = !0, s(this, te).asPoint = !0, h(this, Pe, {
        AB: new S().middleOf(s(this, H), s(this, ee)),
        AC: new S().middleOf(s(this, H), s(this, te)),
        BC: new S().middleOf(s(this, ee), s(this, te))
      }), h(this, Nt, s(this, si).call(this));
    });
    /**
     * Get the Vector2D class for the given name
     * @param ptName
     */
    p(this, At, (e) => {
      switch (e.toUpperCase()) {
        case "A":
          return s(this, H);
        case "B":
          return s(this, ee);
        case "C":
          return s(this, te);
      }
      return s(this, H);
    });
    /**
     * Get the vector for the segment given by name.
     * @param ptName1
     * @param ptName2
     */
    p(this, Re, (e, t) => new N(
      s(this, At).call(this, e),
      s(this, At).call(this, t)
    ));
    p(this, si, () => {
      const e = {
        A: new R().fromPoints(s(this, H), s(this, Pe).BC),
        B: new R().fromPoints(s(this, ee), s(this, Pe).AC),
        C: new R().fromPoints(s(this, te), s(this, Pe).AB),
        intersection: null
      }, t = {
        AB: new R().fromPointAndNormal(s(this, Pe).AB, new N(s(this, H), s(this, ee)).normal()),
        AC: new R().fromPointAndNormal(s(this, Pe).AC, new N(s(this, H), s(this, te)).normal()),
        BC: new R().fromPointAndNormal(s(this, Pe).BC, new N(s(this, ee), s(this, te)).normal()),
        intersection: null
      }, i = {
        A: new R().fromPointAndNormal(s(this, H), new N(s(this, ee), s(this, te)).normal()),
        B: new R().fromPointAndNormal(s(this, ee), new N(s(this, H), s(this, te)).normal()),
        C: new R().fromPointAndNormal(s(this, te), new N(s(this, H), s(this, ee)).normal()),
        intersection: null
      }, r = s(this, lt).call(this, "A"), n = s(this, lt).call(this, "B"), l = s(this, lt).call(this, "C"), c = {
        A: r.internal,
        B: n.internal,
        C: n.internal,
        intersection: null
      }, u = {
        A: r.external,
        B: n.external,
        C: l.external,
        intersection: null
      }, d = {
        medians: e,
        mediators: t,
        heights: i,
        bisectors: c,
        externalBisectors: u
      };
      return d.medians.intersection = d.medians.A.intersection(d.medians.B).point, d.mediators.intersection = d.mediators.AB.intersection(d.mediators.BC).point, d.heights.intersection = d.heights.A.intersection(d.heights.B).point, d.bisectors.intersection = d.bisectors.A.intersection(d.bisectors.B).point, d;
    });
    p(this, lt, (e) => {
      const t = this.lines;
      let i, r;
      if (e === "A" ? (i = t.AB, r = t.AC) : e === "B" ? (i = t.AB, r = t.BC) : e === "C" && (i = t.BC, r = t.AC), i === void 0 || r === void 0)
        throw new Error(`The point ${e} does not exist`);
      const n = i.n.simplify().norm, l = r.n.simplify().norm, c = i.getEquation().multiply(l), u = r.getEquation().multiply(n), d = new R(c.clone().subtract(u).simplify()), m = new R(u.clone().subtract(c).simplify());
      return e === "A" ? d.hitSegment(this.B, this.C) ? { internal: d, external: m } : { internal: m, external: d } : e === "B" ? d.hitSegment(this.A, this.C) ? { internal: d, external: m } : { internal: m, external: d } : e === "C" ? d.hitSegment(this.B, this.A) ? { internal: d, external: m } : { internal: m, external: d } : { internal: d, external: m };
    });
    return e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setters
  // ------------------------------------------
  get A() {
    return s(this, H);
  }
  get B() {
    return s(this, ee);
  }
  get C() {
    return s(this, te);
  }
  get AB() {
    return s(this, Re).call(this, "A", "B");
  }
  get BA() {
    return s(this, Re).call(this, "B", "A");
  }
  get BC() {
    return s(this, Re).call(this, "B", "C");
  }
  get CB() {
    return s(this, Re).call(this, "C", "B");
  }
  get AC() {
    return s(this, Re).call(this, "A", "C");
  }
  get CA() {
    return s(this, Re).call(this, "C", "A");
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
    return s(this, at);
  }
  get remarquables() {
    return s(this, Nt);
  }
};
H = new WeakMap(), ee = new WeakMap(), te = new WeakMap(), at = new WeakMap(), Pe = new WeakMap(), Nt = new WeakMap(), ii = new WeakMap(), At = new WeakMap(), Re = new WeakMap(), si = new WeakMap(), lt = new WeakMap();
let yi = ri;
var Xi = /* @__PURE__ */ ((o) => (o[o.INTERIOR = 0] = "INTERIOR", o[o.EXTERIOR = 1] = "EXTERIOR", o[o.SECANT = 2] = "SECANT", o[o.TANGENT_INSIDE = 3] = "TANGENT_INSIDE", o[o.TANGENT_OUTSIDE = 4] = "TANGENT_OUTSIDE", o[o.SUPERPOSED = 5] = "SUPERPOSED", o[o.CONCENTRIC = 6] = "CONCENTRIC", o))(Xi || {}), Oe, pe, Ce, ct, qt, Tt, vi;
class Yi {
  constructor(e, t) {
    p(this, Tt);
    p(this, Oe);
    p(this, pe);
    p(this, Ce);
    p(this, ct, 1);
    p(this, qt, (e) => {
      if (s(this, Ce) === void 0)
        throw new Error("Sphere3 is undefined");
      if (s(this, ct) === 0)
        return e ? s(this, Ce).tex : s(this, Ce).display;
      const t = [];
      return ["x", "y", "z"].forEach((r) => {
        if (this.center[r].isZero())
          t.push(`${r}^2`);
        else {
          const n = new x(r).subtract(this.center[r]);
          t.push(
            e ? `\\(${n.tex}\\)^2` : `(${n.display})^2`
          );
        }
      }), t.join("+") + "=" + (e ? this.squareRadius.tex : this.squareRadius.display);
    });
    a(this, "relativePosition", (e) => {
      const t = this.center.distanceTo(e.center).value, i = this.radius.value, r = e.radius.value;
      return t > i + r ? 1 : t === i + r ? 4 : t === 0 ? i === r ? 5 : 6 : t === Math.abs(i - r) ? 3 : t < Math.abs(i - r) ? 0 : 2;
    });
    a(this, "isPointOnSphere", (e) => {
      var t;
      return ((t = s(this, Ce)) == null ? void 0 : t.test({
        x: e.x,
        y: e.y,
        z: e.z
      })) ?? !1;
    });
    return e && t && (h(this, Oe, e), h(this, pe, new f(t).clone().pow(2)), q(this, Tt, vi).call(this)), this;
  }
  fromEquation(e) {
    const t = new F(e).moveLeft().reduce(), i = ["x", "y", "z"];
    if (i.some((n) => t.degree(n).value !== 2))
      return this.makeUndefined();
    const r = t.left.monomByDegree(2, "x").coefficient;
    return i.some((n) => t.left.monomByDegree(2, n).coefficient.isNotEqual(r)) ? this.makeUndefined() : (h(this, Oe, new S(
      t.left.monomByDegree(1, "x").coefficient.clone().opposite().divide(2),
      t.left.monomByDegree(1, "y").coefficient.clone().opposite().divide(2),
      t.left.monomByDegree(1, "z").coefficient.clone().opposite().divide(2)
    )), h(this, pe, t.left.monomByDegree(0).coefficient.clone().opposite().add(s(this, Oe).x.clone().pow(2)).add(s(this, Oe).y.clone().pow(2)).add(s(this, Oe).z.clone().pow(2))), q(this, Tt, vi).call(this), this);
  }
  get center() {
    if (s(this, Oe) === void 0)
      throw new Error("Sphere3 is undefined");
    return s(this, Oe);
  }
  get squareRadius() {
    if (s(this, pe) === void 0)
      throw new Error("Sphere3 is undefined");
    return s(this, pe);
  }
  get radius() {
    if (s(this, pe) === void 0)
      throw new Error("Sphere3 is undefined");
    return s(this, pe).isSquare() ? {
      tex: s(this, pe).clone().sqrt().tex,
      display: s(this, pe).clone().sqrt().display,
      value: s(this, pe).clone().sqrt().value
    } : {
      tex: `\\sqrt{${s(this, pe).tex}}`,
      display: `sqrt(${s(this, pe).display})`,
      value: s(this, pe).clone().sqrt().value
    };
  }
  get equation() {
    if (s(this, Ce) === void 0)
      throw new Error("Sphere3 is undefined");
    return s(this, Ce);
  }
  makeUndefined() {
    return h(this, Oe, void 0), h(this, pe, void 0), h(this, Ce, void 0), this;
  }
  get centerRadius() {
    return h(this, ct, 1), this;
  }
  get developped() {
    return h(this, ct, 0), this;
  }
  get tex() {
    return s(this, qt).call(this, !0);
  }
  get display() {
    return s(this, qt).call(this, !1);
  }
}
Oe = new WeakMap(), pe = new WeakMap(), Ce = new WeakMap(), ct = new WeakMap(), qt = new WeakMap(), Tt = new WeakSet(), vi = function() {
  h(this, Ce, new F(
    new x("x").subtract(this.center.x).pow(2).add(
      new x("y").subtract(this.center.y).pow(2)
    ).add(
      new x("z").subtract(this.center.z).pow(2)
    ),
    new x(this.squareRadius)
  ).reduce());
}, a(Yi, "RELATIVE_POSITION", Xi);
function It(o) {
  const e = Object.assign(
    {
      negative: !0,
      max: 10,
      reduced: !0,
      zero: !0,
      natural: !1
    },
    o
  ), t = new f();
  if (e.negative ? t.numerator = K(e.max, e.zero) : t.numerator = ge(e.zero ? 0 : 1, e.max), e.natural)
    t.denominator = 1;
  else {
    let i = 0;
    for (; t.isRelative() && i < 10; )
      t.denominator = ge(1, e.max), i++;
  }
  return e.reduced ? t.reduce() : t;
}
function Qi(o) {
  const e = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    o
  ), t = new k();
  if (t.coefficient = It({
    zero: e.zero,
    reduced: !0,
    natural: !e.fraction
  }), e.letters.length > 1) {
    for (const i of e.letters.split(""))
      t.setLetter(i, 0);
    for (let i = 0; i < e.degree; i++) {
      const r = Ni(e.letters.split(""));
      t.setLetter(r, t.degree(r).clone().add(1));
    }
  } else
    t.setLetter(e.letters, e.degree);
  return t;
}
const Es = {
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
function Hi(o) {
  const e = Object.assign(
    Es,
    o
  ), t = new x().empty();
  let i;
  for (let r = e.degree; r >= 0; r--)
    i = Qi({
      letters: e.letters,
      degree: r,
      fraction: e.fraction,
      zero: r === e.degree ? !1 : e.allowNullMonom
    }), e.unit && e.degree === r && i.coefficient.one(), t.add(i);
  if (e.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposite(), e.numberOfMonoms && e.numberOfMonoms > 0 && e.numberOfMonoms < t.length)
    for (; t.length > e.numberOfMonoms; ) {
      const r = ge(1, t.length - 1);
      t.monoms.splice(r, 1);
    }
  return t.reduce();
}
function Ns(o) {
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
  ), t = new x().one();
  for (let i = 0; i < e.degree; i++) {
    const r = Hi({
      degree: 1,
      unit: e.unit,
      fraction: e.fraction,
      letters: e.letters,
      zero: e.zero
    });
    t.multiply(r);
  }
  return new F(t, 0);
}
function bi(o) {
  const e = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    o
  ), t = e.axis === "x", i = e.axis === "y", r = e.fraction ? It({ max: e.max, zero: t }) : new f(K(e.max, t)), n = e.fraction ? It({ max: e.max, zero: i }) : new f(K(e.max, i));
  return Number(e.quadrant) === 1 && (r.abs(), n.abs()), Number(e.quadrant) === 2 && (r.isPositive() && r.opposite(), n.isNegative() && n.opposite()), Number(e.quadrant) === 3 && (r.isPositive() && r.opposite(), n.isPositive() && n.opposite()), Number(e.quadrant) === 4 && (r.isNegative() && r.opposite(), n.isPositive() && n.opposite()), new S(r, n);
}
function As(o) {
  const e = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    o
  ), t = bi(e.center);
  let i, r;
  return e.pointsOnCircle === 8 ? (i = ge(1, 3), r = i ** 2 + (i + 1) ** 2) : r = ge(1, 20), new Pt(t, r, !0);
}
function qs(o) {
  const e = Object.assign(
    {
      A: {
        x: K(10),
        y: K(10)
      }
    },
    o
  ), t = new N(
    K(10),
    K(10)
  );
  for (; t.isNull; )
    t.x = K(10), t.y = K(10);
  return e.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposite() : e.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposite(), new R().fromPointAndDirection(new N(e.A.x, e.A.y), t);
}
function Ts(o) {
  const e = Object.assign(
    {
      A: {
        x: K(10),
        y: K(10),
        z: K(10)
      },
      direction: {
        x: K(10),
        y: K(10),
        z: K(10)
      }
    },
    o
  ), t = new S(e.A.x, e.A.y, e.A.z), i = new N(e.direction.x, e.direction.y, e.direction.z);
  return new St(t, i);
}
const Os = {
  equation: (o) => Ns(o),
  polynom: (o) => Hi(o),
  monom: (o) => Qi(o),
  fraction: (o) => It(o),
  number: (o, e, t) => ge(o, e, t),
  numberSym: (o, e) => K(o, e),
  prime: (o) => bs(o),
  bool: (o) => Vi(o),
  array: (o, e) => xs(o, e),
  item: (o) => Ni(o),
  shuffle: (o) => Fi(o),
  line: (o) => qs(o),
  line3: (o) => Ts(o),
  vector: (o) => bi(o),
  point: (o) => {
    const e = bi(o);
    return e.asPoint = !0, e;
  },
  circle: (o) => As(o)
}, Ms = {
  Numeric: W,
  Fraction: f,
  Root: Ot,
  Monom: k,
  Polynom: x,
  Equation: F,
  Matrix: pi,
  LinearSystem: li,
  Factor: re,
  PolyFactor: ui,
  LogicalSet: gs,
  Random: Os,
  Geometry: {
    Vector: N,
    Point: S,
    Line: R,
    Triangle: yi,
    Circle: Pt,
    Line3: St,
    Plane3: wi,
    Sphere3: Yi
  },
  NumExp: ms
};
export {
  Pt as Circle,
  F as Equation,
  Bt as EquationSolver,
  mt as FACTOR_DISPLAY,
  re as Factor,
  f as Fraction,
  R as Line,
  St as Line3,
  li as LinearSystem,
  gs as LogicalSet,
  pi as Matrix,
  k as Monom,
  Ot as NthRoot,
  ms as NumExp,
  W as Numeric,
  wi as Plane3,
  S as Point,
  ui as PolyFactor,
  x as Polynom,
  Os as Random,
  Xi as SPHERE3_RELATIVE_POSITION,
  Yi as Sphere3,
  yi as Triangle,
  N as Vector,
  ys as areVectorsColinears,
  ws as areVectorsEquals,
  Ms as default,
  ks as determinantFromVectors,
  vs as dotProduct
};
//# sourceMappingURL=pimath.js.map
