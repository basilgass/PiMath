var ki = Object.defineProperty;
var li = (o) => {
  throw TypeError(o);
};
var Ci = (o, e, t) => e in o ? ki(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var a = (o, e, t) => Ci(o, typeof e != "symbol" ? e + "" : e, t), Ht = (o, e, t) => e.has(o) || li("Cannot " + t);
var i = (o, e, t) => (Ht(o, e, "read from private field"), t ? t.call(o) : e.get(o)), d = (o, e, t) => e.has(o) ? li("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), h = (o, e, t, s) => (Ht(o, e, "write to private field"), s ? s.call(o, t) : e.set(o, t), t), q = (o, e, t) => (Ht(o, e, "access private method"), t);
function $i(o) {
  const e = ui(o), t = [];
  let s, n;
  for (; e.length > 0; )
    s = e.shift() ?? 1, n = (e.length > 0 ? e.pop() : +s) ?? 1, t.push([s, n]);
  return t;
}
function Ii(...o) {
  const e = ni(...o);
  return o.map((t) => t / e);
}
function ui(o) {
  const e = Math.abs(o), t = Math.sqrt(e), s = [];
  for (let n = 1; n <= t; n++)
    o % n === 0 && (s.push(n), s.push(e / n));
  return s.sort(function(n, r) {
    return n - r;
  }), [...new Set(s)];
}
function ni(...o) {
  const e = function(n, r) {
    return r === 0 ? n : e(r, n % r);
  };
  let t = 1, s = 2;
  if (o.length === 0)
    return 1;
  if (o.length === 1)
    return o[0] === 0 ? 1 : o[0];
  if (t = e(o[0], o[1]), t === 1)
    return 1;
  for (s = 2; s < o.length && (t = e(t, o[s]), t !== 1); s++)
    ;
  return Math.abs(t);
}
function Pi(...o) {
  return o.reduce(function(e, t) {
    return Math.abs(e * t / ni(e, t));
  });
}
function Bi(o, e = 3) {
  return +o.toFixed(e);
}
function Si(o) {
  if (Number.isSafeInteger(o) || o.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function Ri(o) {
  const e = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return o === void 0 ? e : e.slice(0, Math.min(e.length, o));
}
function zi(o, e) {
  const t = [], s = e === !0 ? +o : o ** 2;
  for (let n = 0; n <= o; n++)
    for (let r = 0; r <= o; r++)
      n ** 2 + r ** 2 === s && t.push([n, r, o]);
  return t;
}
function Li(o, e = 2) {
  return +`${Math.round(+`${o}e${e}`)}e-${e}`;
}
const G = {
  decompose: $i,
  dividers: ui,
  divideNumbersByGCD: Ii,
  gcd: ni,
  lcm: Pi,
  numberCorrection: Bi,
  periodic: Si,
  primes: Ri,
  pythagoreanTripletsWithTarget: zi,
  round: Li
};
var w, b, ht, Se;
const $ = class $ {
  constructor(e, t) {
    // #region Class fields (2)
    d(this, w, 1);
    d(this, b, 1);
    d(this, ht, !1);
    d(this, Se, "frac");
    // ------------------------------------------
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    a(this, "parse", (e, t) => {
      let s;
      if (e === "")
        return h(this, w, 0), h(this, b, 1), this;
      switch (typeof e) {
        case "string":
          if (s = e.split("/"), s.length > 2)
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (s.map((n) => n === "" || isNaN(Number(n))).includes(!0))
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (s.length === 1)
            return this.parse(+s[0]);
          s.length === 2 ? s[1] === "0" ? (h(this, w, NaN), h(this, b, 1)) : (h(this, w, +s[0]), h(this, b, +s[1])) : (h(this, w, NaN), h(this, b, 1));
          break;
        case "number":
          if (Number.isSafeInteger(e))
            h(this, w, +e), t === void 0 || !Number.isSafeInteger(t) ? h(this, b, 1) : h(this, b, +t);
          else {
            const [, n] = e.toString().split("."), r = n ? n.length : 0;
            t === void 0 ? (h(this, w, e * Math.pow(10, r)), h(this, b, Math.pow(10, r))) : Number.isSafeInteger(t) && (h(this, w, e * Math.pow(10, r) - Math.floor(e * Math.pow(10, r - t))), this.denominator = Math.pow(10, r) - Math.pow(10, r - t)), this.reduce();
          }
          break;
        case "object":
          e instanceof $ && (h(this, w, +e.numerator), h(this, b, +e.denominator));
          break;
      }
      return this;
    });
    a(this, "clone", () => {
      const e = new $();
      return e.numerator = +i(this, w), e.denominator = +i(this, b), e;
    });
    a(this, "abs", () => (h(this, w, Math.abs(i(this, w))), h(this, b, Math.abs(i(this, b))), this));
    a(this, "add", (e) => {
      if (e instanceof $) {
        const t = i(this, w), s = i(this, b);
        h(this, w, t * e.denominator + e.numerator * s), h(this, b, s * e.denominator);
      } else
        return this.add(new $(e));
      return this.reduce();
    });
    a(this, "amplify", (e) => (Number.isSafeInteger(e) && (h(this, w, i(this, w) * e), h(this, b, i(this, b) * e)), this));
    // TODO: The rest of the functions are not used or unnecessary ?
    /**
     * Simple function to determine if it's a fraction
     */
    a(this, "areEquals", (...e) => e.every((t) => t.isEqual(e[0])));
    // ------------------------------------------
    // Compare functions
    // ------------------------------------------
    /**
     * Compare the current coefficient with another coefficient
     * @param F (Coefficient) The coefficient to _compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    a(this, "compare", (e, t) => {
      t === void 0 && (t = "=");
      let s;
      switch (e instanceof $ ? s = e.clone() : s = new $(e), t) {
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
    a(this, "divide", (e) => {
      const t = new $(e);
      if (t.numerator === 0)
        return new $().infinite();
      const s = +i(this, w), n = +i(this, b);
      return h(this, w, s * t.denominator), h(this, b, n * t.numerator), this.reduce();
    });
    a(this, "infinite", () => (h(this, w, 1 / 0), h(this, b, 1), this));
    a(this, "invalid", () => (h(this, w, NaN), h(this, b, 1), this));
    a(this, "inverse", () => {
      const e = +i(this, w);
      return h(this, w, +i(this, b)), h(this, b, e), this;
    });
    a(this, "isApproximative", () => i(this, ht) || i(this, w).toString().length >= 15 && i(this, b).toString().length >= 15);
    a(this, "isEqual", (e) => this.compare(e, "="));
    a(this, "isEven", () => this.isRelative() && this.value % 2 === 0);
    a(this, "isExact", () => !this.isApproximative());
    a(this, "isFinite", () => !this.isInfinity() && !this.isNaN());
    a(this, "isGeq", (e) => this.compare(e, ">="));
    a(this, "isGreater", (e) => this.compare(e, ">"));
    a(this, "isInfinity", () => Math.abs(i(this, w)) === 1 / 0);
    a(this, "isInverted", (e) => this.isEqual(new $().one().divide(e.clone())));
    a(this, "isLeq", (e) => this.compare(e, "<="));
    /* Compare shortcuts */
    a(this, "isLesser", (e) => this.compare(e, "<"));
    a(this, "isNaN", () => isNaN(i(this, w)));
    a(this, "isNatural", () => this.isRelative() && this.isPositive());
    a(this, "isNegative", () => this.sign() === -1);
    a(this, "isNegativeOne", () => i(this, w) === -1 && i(this, b) === 1);
    a(this, "isNotEqual", (e) => this.compare(e, "<>"));
    a(this, "isNotZero", () => i(this, w) !== 0);
    a(this, "isOdd", () => this.isRelative() && this.value % 2 === 1);
    a(this, "isOne", () => i(this, w) === 1 && i(this, b) === 1);
    a(this, "isOpposite", (e) => this.isEqual(e.clone().opposite()));
    a(this, "isPositive", () => this.sign() === 1);
    a(this, "isRational", () => !this.isRelative());
    a(this, "isReduced", () => Math.abs(G.gcd(i(this, w), i(this, b))) === 1);
    a(this, "isRelative", () => this.clone().reduce().denominator === 1);
    a(this, "isSquare", () => Math.sqrt(i(this, w)) % 1 === 0 && Math.sqrt(i(this, b)) % 1 === 0);
    a(this, "isStrictlyNegative", () => this.value < 0);
    a(this, "isStrictlyPositive", () => this.value > 0);
    // ------------------------------------------
    // Mathematical operations specific to fractions
    a(this, "isZero", () => i(this, w) === 0);
    a(this, "multiply", (e) => {
      const t = new $(e);
      return h(this, w, i(this, w) * t.numerator), h(this, b, i(this, b) * t.denominator), this.reduce();
    });
    a(this, "one", () => (h(this, w, 1), h(this, b, 1), this));
    a(this, "opposite", () => (h(this, w, -i(this, w)), this));
    a(this, "pow", (e) => {
      if (e instanceof $)
        return this.pow(e.value);
      this.reduce(), e < 0 && this.inverse();
      const t = Math.floor(Math.pow(i(this, w), Math.abs(e))), s = Math.floor(Math.pow(i(this, b), Math.abs(e)));
      return t ** Math.abs(e) === i(this, w) && s ** Math.abs(e) === i(this, b) ? (h(this, w, i(this, w) ** Math.abs(e)), h(this, b, i(this, b) ** Math.abs(e))) : (h(this, w, i(this, w) ** Math.abs(e)), h(this, b, i(this, b) ** Math.abs(e))), this;
    });
    // ------------------------------------------
    a(this, "reduce", () => {
      const e = G.gcd(i(this, w), i(this, b));
      return h(this, w, i(this, w) / e), h(this, b, i(this, b) / e), i(this, b) < 0 && (h(this, b, -i(this, b)), h(this, w, -i(this, w))), this;
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
      const s = Math.floor(Math.pow(i(this, w), Math.abs(1 / e))), n = Math.floor(Math.pow(i(this, b), Math.abs(1 / e)));
      return h(this, w, Math.pow(i(this, w), Math.abs(1 / e))), h(this, b, Math.pow(i(this, b), Math.abs(1 / e))), (s !== i(this, w) || n !== i(this, b)) && (h(this, w, i(this, w) / i(this, b)), h(this, b, 1), h(this, ht, !0)), this.multiply(t), this;
    });
    a(this, "sign", () => i(this, w) * i(this, b) >= 0 ? 1 : -1);
    a(this, "sqrt", () => this.root(2));
    a(this, "subtract", (e) => e instanceof $ ? this.add(e.clone().opposite()) : this.add(-e));
    a(this, "zero", () => (h(this, w, 0), h(this, b, 1), this));
    return e !== void 0 && this.parse(e, t), this;
  }
  // #endregion Properties and methods (55)
  // #region Getters And Setters (11)
  get denominator() {
    return i(this, b);
  }
  set denominator(e) {
    h(this, b, e);
  }
  get display() {
    return this.isExact() ? i(this, b) === 1 ? `${i(this, w)}` : `${i(this, w)}/${i(this, b)}` : this.value.toFixed(3);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get numerator() {
    return i(this, w);
  }
  set numerator(e) {
    h(this, w, e);
  }
  get tfrac() {
    return h(this, Se, "tfrac"), this;
  }
  get dfrac() {
    return h(this, Se, "dfrac"), this;
  }
  get frac() {
    return h(this, Se, "frac"), this;
  }
  // Display getter
  get tex() {
    return this.isInfinity() ? `${this.sign() === 1 ? "+" : "-"}\\infty` : this.isExact() ? i(this, b) === 1 ? `${i(this, w)}` : i(this, w) < 0 ? `-\\${i(this, Se)}{ ${-i(this, w)} }{ ${i(this, b)} }` : `\\${i(this, Se)}{ ${i(this, w)} }{ ${i(this, b)} }` : this.value.toFixed(3);
  }
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get value() {
    return i(this, w) / i(this, b);
  }
  // #endregion Getters And Setters (11)
};
w = new WeakMap(), b = new WeakMap(), ht = new WeakMap(), Se = new WeakMap(), a($, "average", (...e) => {
  const t = new $().zero();
  for (const s of e)
    t.add(s);
  return t.divide(e.length), t;
}), a($, "max", (...e) => {
  let t = new $(e[0]);
  for (const s of e) {
    const n = new $(s);
    n.isGreater(t) && (t = n.clone());
  }
  return t;
}), a($, "min", (...e) => {
  let t = new $(e[0]);
  for (const s of e) {
    const n = new $(s);
    n.isLesser(t) && (t = n.clone());
  }
  return t;
}), a($, "sort", (e, t) => {
  const n = e.map((r) => r instanceof $ ? r : new $(r)).sort((r, l) => r.value - l.value);
  return t && n.reverse(), n;
}), a($, "unique", (e) => {
  const t = {}, s = [];
  return e.forEach((n) => {
    n instanceof $ || (n = new $(n)), t[n.clone().reduce().tex] || (s.push(n.clone()), t[n.tex] = !0);
  }), s;
}), a($, "xMultiply", (...e) => {
  const t = new $();
  for (const s of e) {
    const n = new $(s);
    t.numerator = t.numerator * n.numerator, t.denominator = t.denominator * n.denominator;
  }
  return t;
});
let c = $;
var V, J, se, Xe;
class pt {
  constructor(...e) {
    d(this, V);
    d(this, J);
    d(this, se);
    d(this, Xe);
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    a(this, "parse", (e, t, s) => (h(this, se, s ?? 1), h(this, J, t ?? 2), h(this, V, e), i(this, J) % 2 === 0 && i(this, V) < 0 && h(this, Xe, !1), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    a(this, "reduce", () => {
      let e = Math.floor(Math.pow(i(this, V), 1 / i(this, J)));
      for (; e > 1; ) {
        if (i(this, V) % Math.pow(e, i(this, J)) === 0) {
          h(this, se, i(this, se) * e), h(this, V, i(this, V) / Math.pow(e, i(this, J))), e = Math.floor(Math.pow(i(this, V), 1 / i(this, J)));
          continue;
        }
        e--;
      }
      return this;
    });
    a(this, "multiply", (e) => (h(this, V, i(this, V) * e.radical), this.reduce()));
    // ------------------------------------------
    // Help functions
    // ------------------------------------------
    a(this, "hasRadical", () => !(i(this, V) === 1 || i(this, V) === 0 || !i(this, Xe)));
    h(this, V, 1), h(this, se, 1), h(this, J, 2), h(this, Xe, !0), e.length > 0 && this.parse(e[0], e[1], e[2]);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get radical() {
    return i(this, V);
  }
  set radical(e) {
    h(this, V, e);
  }
  get nth() {
    return i(this, J);
  }
  set nth(e) {
    Number.isSafeInteger(e) && e >= 2 ? h(this, J, e) : (console.log("Error setting the nth root"), h(this, J, 2));
  }
  get coefficient() {
    return i(this, se);
  }
  set coefficient(e) {
    h(this, se, e);
  }
  get tex() {
    let e;
    return i(this, se) === 1 ? e = "" : i(this, se) === -1 ? e = "-" : e = i(this, se).toString(), i(this, V) === 1 ? `${i(this, se)}` : i(this, J) === 2 ? `${e}\\sqrt{${i(this, V)}}` : `${e}\\sqrt[${i(this, J)}]{${i(this, V)}}`;
  }
  get display() {
    let e;
    return i(this, se) === 1 ? e = "" : i(this, se) === -1 ? e = "-" : e = i(this, se).toString(), i(this, V) === 1 ? `${i(this, se)}` : i(this, J) === 2 ? `${e}sqrt{${i(this, V)}}` : `${e}root(${i(this, J)}){${i(this, V)}}`;
  }
  get value() {
    return i(this, se) * Math.pow(i(this, V), 1 / i(this, J));
  }
}
V = new WeakMap(), J = new WeakMap(), se = new WeakMap(), Xe = new WeakMap();
var Di = Object.defineProperty, fi = (o) => {
  throw TypeError(o);
}, Vi = (o, e, t) => e in o ? Di(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, Xt = (o, e, t) => Vi(o, typeof e != "symbol" ? e + "" : e, t), di = (o, e, t) => e.has(o) || fi("Cannot " + t), K = (o, e, t) => (di(o, e, "read from private field"), t ? t.call(o) : e.get(o)), st = (o, e, t) => e.has(o) ? fi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), be = (o, e, t, s) => (di(o, e, "write to private field"), e.set(o, t), t);
const ri = {
  pi: Math.PI,
  e: Math.exp(1)
};
var p = /* @__PURE__ */ ((o) => (o.VARIABLE = "variable", o.COEFFICIENT = "coefficient", o.OPERATION = "operation", o.CONSTANT = "constant", o.FUNCTION = "function", o.FUNCTION_ARGUMENT = "function-argument", o.MONOM = "monom", o.LEFT_PARENTHESIS = "(", o.RIGHT_PARENTHESIS = ")", o))(p || {}), Ve = /* @__PURE__ */ ((o) => (o.EXPRESSION = "expression", o.POLYNOM = "polynom", o.SET = "set", o.NUMERIC = "numeric", o))(Ve || {});
function Zi(o, e) {
  if (o.length <= 1)
    return o;
  const t = Object.keys(e).filter((E) => e[E].type === p.FUNCTION).map((E) => E);
  t.sort((E, L) => L.length - E.length);
  const s = new RegExp(`^(${t.join("|")})\\(`), n = Object.keys(ri);
  n.sort((E, L) => L.length - E.length);
  const r = new RegExp(`^(${n.join("|")})`), l = /^(\d+(\.\d+)?)/;
  let u = "", f, m, g;
  for (; o.length > 0; ) {
    if (f = m, g = void 0, t.length > 0 && s.exec(o)) {
      const E = t.find((L) => o.startsWith(L));
      E && (g = E + "(", o = o.slice(E.length + 1), m = p.FUNCTION);
    } else if (n.length > 0 && r.exec(o)) {
      const E = n.find((L) => o.startsWith(L));
      E && (g = E, o = o.slice(E.length), m = p.CONSTANT);
    } else if (l.exec(o)) {
      const E = l.exec(o);
      E && (g = E[0], o = o.slice(E[0].length), m = p.COEFFICIENT);
    } else
      switch (g = o[0], o = o.slice(1), g) {
        case "(":
          m = p.LEFT_PARENTHESIS;
          break;
        case ")":
          m = p.RIGHT_PARENTHESIS;
          break;
        case ",":
          m = p.FUNCTION_ARGUMENT;
          break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
          m = p.OPERATION;
          break;
        default:
          m = p.VARIABLE;
      }
    if (g === void 0 || m === void 0)
      throw new Error("The token is undefined");
    u += Fi(f, m), u += g;
  }
  return u;
}
function Fi(o, e) {
  return o === void 0 || o === p.OPERATION || e === p.OPERATION || o === p.LEFT_PARENTHESIS || o === p.FUNCTION || o === p.FUNCTION_ARGUMENT || e === p.RIGHT_PARENTHESIS || e === p.FUNCTION_ARGUMENT ? "" : "*";
}
const ji = {
  "^": { precedence: 4, associative: "right", type: p.OPERATION },
  "*": { precedence: 3, associative: "left", type: p.OPERATION },
  "/": { precedence: 3, associative: "left", type: p.OPERATION },
  "+": { precedence: 2, associative: "left", type: p.OPERATION },
  "-": { precedence: 2, associative: "left", type: p.OPERATION }
}, Ui = {
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
}, Gi = {
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
}, Wi = {
  "&": { precedence: 3, associative: "left", type: p.OPERATION },
  "|": { precedence: 3, associative: "left", type: p.OPERATION },
  "!": { precedence: 4, associative: "right", type: p.OPERATION },
  "-": { precedence: 2, associative: "left", type: p.OPERATION }
};
var Ge, nt, ie, mt, Le;
class Gt {
  constructor(e) {
    st(this, Ge), st(this, nt, []), st(this, ie, {}), st(this, mt, []), st(this, Le), be(this, Ge, typeof e > "u" ? Ve.POLYNOM : e), this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return K(this, nt);
  }
  get rpnToken() {
    return K(this, nt).map((e) => e.token);
  }
  tokenConfigInitialization() {
    return K(this, Ge) === Ve.SET ? (be(this, ie, Wi), be(this, Le, !1)) : K(this, Ge) === Ve.NUMERIC ? (be(this, ie, Gi), be(this, Le, !0)) : K(this, Ge) === Ve.EXPRESSION ? (be(this, ie, Ui), be(this, Le, !0)) : (be(this, ie, ji), be(this, Le, !0)), be(this, mt, Object.keys(K(this, ie)).sort((e, t) => t.length - e.length)), K(this, ie);
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(e, t) {
    let s, n;
    if (s = "", n = void 0, e[t] === "(")
      s = "(", n = p.LEFT_PARENTHESIS;
    else if (e[t] === ")")
      s = ")", n = p.RIGHT_PARENTHESIS;
    else if (e[t] === ",")
      s = ",", n = p.FUNCTION_ARGUMENT;
    else {
      for (const r of K(this, mt))
        if (e.substring(t, t + r.length) === r) {
          s += r, n = K(this, ie)[r].type;
          break;
        }
      for (const r in ri)
        if (e.substring(t, t + r.length) === r) {
          s += r, n = p.CONSTANT;
          break;
        }
      if (s === "")
        if (/[0-9.]/.exec(e[t])) {
          const r = /^([0-9.]+)/.exec(e.substring(t));
          s = r ? r[0] : "", n = p.COEFFICIENT;
        } else if (/[a-zA-Z]/.exec(e[t])) {
          const r = /^([a-zA-Z])/.exec(e.substring(t));
          s = r ? r[0] : "", n = p.VARIABLE;
        } else
          console.log("Unidentified token", e[t], e, t), s = e[t], n = p.MONOM;
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
    (t ?? K(this, Le)) && (e = Zi(e, K(this, ie)));
    const f = 50;
    let m = 50, g;
    for (; l < e.length; ) {
      if (m--, m === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([r, l, u] = this.NextToken(e, l), u) {
        case p.MONOM:
        case p.COEFFICIENT:
        case p.VARIABLE:
        case p.CONSTANT:
          s.push({
            token: r,
            tokenType: u
          });
          break;
        case p.OPERATION:
          if (n.length > 0) {
            let E = n[n.length - 1];
            for (g = +f; E.token in K(this, ie) && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (K(this, ie)[r].associative === "left" && K(this, ie)[r].precedence <= K(this, ie)[E.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            K(this, ie)[r].associative === "right" && K(this, ie)[r].precedence < K(this, ie)[E.token].precedence); ) {
              if (g--, g === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (s.push(n.pop() ?? { token: "", tokenType: p.OPERATION }), n.length === 0)
                break;
              E = n[n.length - 1];
            }
          }
          n.push({ token: r, tokenType: u });
          break;
        case p.FUNCTION_ARGUMENT:
          for (g = +f; n[n.length - 1].token !== "(" && n.length > 0; ) {
            if (g--, g === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            s.push(n.pop() ?? { token: r, tokenType: u });
          }
          break;
        case p.LEFT_PARENTHESIS:
          n.push({ token: r, tokenType: u }), e[l] === "-" && s.push({ token: "0", tokenType: p.COEFFICIENT });
          break;
        case p.RIGHT_PARENTHESIS:
          for (g = +f; n[n.length - 1].token !== "(" && n.length > 1; ) {
            if (g--, g === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
              break;
            }
            s.push(n.pop() ?? { token: r, tokenType: u });
          }
          n.pop();
          break;
        case p.FUNCTION:
          n.push({ token: r, tokenType: u });
          break;
        default:
          throw new Error(`Token type ${r} is not handled`);
      }
    }
    return be(this, nt, s.concat(n.reverse())), this;
  }
}
Ge = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap();
class Hi {
  constructor(e, t) {
    Xt(this, "_rpn"), Xt(this, "_expression"), Xt(this, "_isValid"), this._expression = e;
    try {
      this._rpn = new Gt(Ve.NUMERIC).parse(e, t).rpn;
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
    for (const s of this._rpn)
      if (s.tokenType === p.COEFFICIENT)
        if (!isNaN(+s.token))
          t.push(+s.token);
        else {
          const n = s.token.split("/");
          if (n.length !== 2)
            throw this._isValid = !1, new Error("This coefficient is not a fraction");
          t.push(+n[0] / +n[1]);
        }
      else if (s.tokenType === p.VARIABLE && e !== void 0)
        Object.hasOwn(e, s.token) && t.push(+e[s.token]);
      else if (s.tokenType === p.CONSTANT)
        t.push(ri[s.token]);
      else if (s.tokenType === p.OPERATION) {
        if (s.token === "*") {
          const n = t.pop(), r = t.pop();
          if (r === void 0 || n === void 0)
            throw this._isValid = !1, new Error(`The multiplication factors ${r ?? "a"} or ${n ?? "b"} are not defined`);
          t.push(r * n);
        } else if (s.token === "/") {
          const n = t.pop(), r = t.pop();
          if (r === void 0 || n === void 0)
            throw this._isValid = !1, new Error(`The division values ${r ?? "a"} or ${n ?? "b"} are not defined`);
          t.push(r / n);
        } else if (s.token === "+") {
          const n = t.pop(), r = t.pop();
          if (r === void 0 || n === void 0)
            throw this._isValid = !1, new Error(`The addition values ${r ?? "a"} or ${n ?? "b"} are not defined`);
          t.push(+r + +n);
        } else if (s.token === "-") {
          const n = t.pop(), r = t.pop() ?? 0;
          if (n === void 0)
            throw this._isValid = !1, new Error("The subtraction value b is  not defined");
          t.push(r - n);
        } else if (s.token === "^") {
          const n = t.pop(), r = t.pop();
          if (r === void 0 || n === void 0)
            throw this._isValid = !1, new Error(`The base value ${r ?? "a"} or exponent ${n ?? "b"} are not defined`);
          t.push(Math.pow(r, n));
        }
      } else if (s.tokenType === p.FUNCTION) {
        const n = t.pop();
        if (n === void 0)
          throw this._isValid = !1, new Error(`The parameters for ${s.token} is not defined`);
        if (s.token === "sin")
          t.push(Math.sin(n));
        else if (s.token === "cos")
          t.push(Math.cos(n));
        else if (s.token === "tan")
          t.push(Math.tan(n));
        else if (s.token === "sqrt")
          t.push(Math.sqrt(n));
        else if (s.token === "nthrt") {
          const r = t.pop();
          if (r === void 0)
            throw this._isValid = !1, new Error("The nthrt function requires two parameters");
          n % 2 === 0 && r < 0 ? t.push(NaN) : t.push((r < 0 ? -1 : 1) * Math.pow(Math.abs(r), 1 / n));
        } else s.token === "ln" ? t.push(Math.log(n)) : s.token === "log" && t.push(Math.log10(n));
      }
    if (t.length === 1)
      return this._numberCorrection(t[0]);
    throw new Error(`There was a problem parsing: ${this._expression}`);
  }
  _numberCorrection(e, t = 8) {
    return +e.toFixed(t);
  }
}
var T, v, Ye, gt, Re, Et, Nt;
const I = class I {
  constructor(e) {
    d(this, Ye);
    d(this, T);
    d(this, v);
    /**
     * Clone the current Monom.
     */
    a(this, "clone", () => {
      const e = new I();
      e.coefficient = i(this, T).clone();
      for (const t in i(this, v))
        e.setLetter(t, i(this, v)[t].clone());
      return e;
    });
    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    a(this, "add", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        this.isSameAs(s) ? (this.isZero() && q(this, Ye, gt).call(this, s), i(this, T).add(s.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", s.display);
      }
      return this;
    });
    a(this, "containsRationalPower", () => Object.values(i(this, v)).some((e) => e.isRational()));
    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    a(this, "degree", (e) => this.variables.length === 0 ? new c().zero() : e === void 0 ? Object.values(i(this, v)).reduce((t, s) => t.clone().add(s)) : this.hasVariable(e) ? i(this, v)[e].clone() : new c().zero());
    /**
     * Derivative the monom
     * @param letter
     */
    a(this, "derivative", (e) => {
      if (e === void 0 && (e = "x"), this.hasVariable(e)) {
        const t = i(this, v)[e].clone(), s = this.clone();
        return i(s, v)[e].subtract(1), i(s, T).multiply(new c(t.clone())), s;
      } else
        return new I().zero();
    });
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    a(this, "divide", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        i(this, T).divide(s.coefficient);
        for (const n in s.literal)
          i(this, v)[n] = this.hasVariable(n) ? i(this, v)[n].subtract(s.literal[n]) : s.literal[n].clone().opposite(), i(this, v)[n].isZero() && this.removeVariable(n);
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
        if (e instanceof c)
          return i(this, Re).call(this, e.value);
        if (e instanceof pt)
          return new c().invalid();
        if (typeof e == "number")
          return i(this, Re).call(this, e);
        if (typeof e == "object") {
          const n = {};
          for (const r in e)
            n[r] = new c(e[r]).value;
          return i(this, Re).call(this, n);
        }
      }
      const s = this.coefficient.clone();
      if (typeof e == "number" || e instanceof c) {
        const n = {};
        return n[this.variables[0]] = new c(e), this.evaluate(n);
      }
      if (e instanceof pt)
        return new c().invalid();
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient;
        for (const n in i(this, v)) {
          const r = new c(e[n]);
          s.multiply(r.pow(i(this, v)[n]));
        }
      }
      return s;
    });
    // -------------------------------------
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    a(this, "hasVariable", (e) => Object.hasOwn(i(this, v), e ?? "x"));
    a(this, "inverse", () => {
      i(this, T).opposite();
      for (const e in i(this, v))
        i(this, v)[e].opposite();
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
    a(this, "isEqual", (e) => this.isSameAs(e) && i(this, T).isEqual(e.coefficient));
    a(this, "isLiteralSquare", () => {
      for (const e in this.literal)
        if (this.literal[e].isRational() || this.literal[e].isEven())
          return !1;
      return !0;
    });
    /**
     * Determine if the monom is one
     */
    a(this, "isOne", () => i(this, T).value === 1 && this.variables.length === 0);
    /**
     * Determine if two monoms are similar
     * @param M
     */
    a(this, "isSameAs", (e) => {
      const t = this.variables, s = e.variables, n = t.concat(s.filter((r) => !t.includes(r)));
      if (this.isZero() || e.isZero() || t.length === 0 && s.length === 0)
        return !0;
      if (t.length !== s.length)
        return !1;
      if (!this.isZero() && !e.isZero()) {
        for (const r of n)
          if (!this.hasVariable(r) || !e.hasVariable(r) || !i(this, v)[r].isEqual(e.literal[r]))
            return !1;
      }
      return !0;
    });
    a(this, "isSquare", () => this.coefficient.isSquare() ? this.isLiteralSquare() : !1);
    /**
     * Determine if the monom is null
     */
    a(this, "isZero", () => i(this, T).value === 0);
    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    a(this, "multiply", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        i(this, T).multiply(s.coefficient);
        for (const n in s.literal)
          this.hasVariable(n) ? i(this, v)[n].add(s.literal[n]) : i(this, v)[n] = s.literal[n].clone();
      }
      return this;
    });
    /**
     * Create a one value monom
     */
    a(this, "one", () => (h(this, T, new c().one()), h(this, v, {}), this));
    /**
     * Get the opposite
     * Returns a monom.
     */
    a(this, "opposite", () => (i(this, T).opposite(), this));
    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    a(this, "pow", (e) => {
      i(this, T).pow(e);
      for (const t in i(this, v))
        i(this, v)[t].multiply(e);
      return this;
    });
    // #endregion Properties and methods (31)
    // #region Getters And Setters (11)
    a(this, "primitive", (e) => {
      e === void 0 && (e = "x");
      const t = this.clone();
      let s;
      return t.hasVariable(e) ? (s = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(s), t.setLetter(e, s)) : (t.coefficient.isZero() && (t.coefficient = new c().one()), t.setLetter(e, 1)), t;
    });
    a(this, "reduce", () => {
      this.coefficient.reduce();
      for (const e in i(this, v))
        i(this, v)[e].isZero() && this.removeVariable(e);
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
    a(this, "setLetter", (e, t) => t instanceof c ? (this.hasVariable(e) && t.isZero() && this.removeVariable(e), i(this, v)[e] = t.clone(), this) : this.setLetter(e, new c(t)));
    /**
     * Return the square root of a monom
     */
    a(this, "sqrt", () => {
      if (this.isSquare()) {
        i(this, T).sqrt();
        for (const e in i(this, v))
          i(this, v)[e].clone().divide(2);
      }
      return this;
    });
    /**
     * Subtract multiple monoms
     * @param M (Monom[]) The monoms to subtract
     */
    a(this, "subtract", (...e) => {
      for (const t of e) {
        const s = t instanceof I ? t : new I(t);
        this.isSameAs(s) ? (this.isZero() && q(this, Ye, gt).call(this, s), i(this, T).add(s.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", s.display);
      }
      return this;
    });
    /**
     * Create a zero value monom
     */
    a(this, "zero", () => (h(this, T, new c().zero()), h(this, v, {}), this));
    d(this, Re, (e) => {
      let t = this.coefficient.value;
      if (typeof e == "number") {
        const s = {}, n = this.variables[0];
        return s[n] = e, i(this, Re).call(this, s);
      }
      if (e instanceof c) {
        const s = {};
        return s[this.variables[0]] = new c(e).value, i(this, Re).call(this, s);
      }
      if (e instanceof pt)
        return NaN;
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient.value;
        for (const s in i(this, v)) {
          const n = e[s];
          n instanceof c ? t *= n.value ** i(this, v)[s].value : t *= n ** i(this, v)[s].value;
        }
      }
      return t;
    });
    d(this, Et, (e) => {
      const s = new Gt().parse(e).rpn, n = [];
      if (s.length === 0)
        return this.zero(), this;
      if (s.length === 1) {
        const r = s[0];
        return this.one(), r.tokenType === p.COEFFICIENT ? this.coefficient = new c(r.token) : r.tokenType === p.VARIABLE && this.setLetter(r.token, 1), this;
      } else
        for (const r of s)
          i(this, Nt).call(this, n, r);
      return this.one(), this.multiply(n[0]), this;
    });
    d(this, Nt, (e, t) => {
      var f;
      let s, n, r, l, u;
      if (t.tokenType === p.COEFFICIENT)
        e.push(new I(new c(t.token)));
      else if (t.tokenType === p.VARIABLE) {
        const m = new I().one();
        m.setLetter(t.token, 1), e.push(m.clone());
      } else if (t.tokenType === p.OPERATION)
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
            u = ((f = e.pop()) == null ? void 0 : f.coefficient) ?? new c().one(), r = e.pop() ?? new I().one(), l = r.variables[0], l && r.setLetter(l, u), e.push(r);
            break;
          }
        }
    });
    return h(this, T, new c().zero()), h(this, v, {}), e !== void 0 && this.parse(e), this;
  }
  // -----------------------------------------
  /**
   * Parse a string to a monom. The string may include fraction.
   * @param inputStr
   */
  parse(e) {
    return h(this, T, new c()), h(this, v, {}), typeof e == "string" ? i(this, Et).call(this, e) : typeof e == "number" ? h(this, T, new c(e)) : e instanceof c ? h(this, T, e.clone()) : e instanceof I && (h(this, T, i(e, T).clone()), q(this, Ye, gt).call(this, e)), this;
  }
  /**
   * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
   * @returns {Fraction}
   */
  get coefficient() {
    return i(this, T);
  }
  /**
   * Set the coefficient \\(k\\) value of the monom
   * @param {Fraction | number | string} F
   */
  set coefficient(e) {
    h(this, T, new c(e));
  }
  // Display getter
  /**
   * This display getter is to be used in the polynom display getter
   */
  get display() {
    let e = "";
    const t = Object.keys(i(this, v)).sort();
    for (const s of t)
      i(this, v)[s].isNotZero() && (e += s, i(this, v)[s].isNotEqual(1) && (e += `^(${i(this, v)[s].display})`));
    return e === "" ? i(this, T).value != 0 ? i(this, T).display : "" : i(this, T).value === 1 ? e : i(this, T).value === -1 ? `-${e}` : i(this, T).value === 0 ? "0" : `${i(this, T).display}${e}`;
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
    return i(this, v);
  }
  /**
   * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
   * @param {literalType<Fraction>} L
   */
  set literal(e) {
    h(this, v, e);
  }
  /**
   * Get the literal square roots of the Monom.
   * TODO: remove this getter ? Is it used and is it correct ?
   * @returns {literalType<Fraction>}
   */
  get literalSqrt() {
    if (this.isLiteralSquare()) {
      const e = {};
      for (const t in i(this, v))
        e[t] = i(this, v)[t].clone().sqrt();
      return e;
    } else
      return i(this, v);
  }
  /**
   * Set the literal part of the monom from a string
   * @param inputStr  String like x^2y^3
   */
  set literalStr(e) {
    for (const t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)])
      t[1] in i(this, v) || (i(this, v)[t[1]] = new c().zero()), i(this, v)[t[1]].add(+t[2]);
    for (const t of [...e.matchAll(/([a-z](?!\^))/g)])
      t[1] in i(this, v) || (i(this, v)[t[1]] = new c().zero()), i(this, v)[t[1]].add(1);
  }
  get plotFunction() {
    let e = "";
    const t = Object.keys(i(this, v)).sort();
    for (const s of t)
      i(this, v)[s].isNotZero() && (e += (e === "" ? "" : "*") + s, i(this, v)[s].isNotEqual(1) && (e += `^(${i(this, v)[s].display})`));
    return e === "" ? i(this, T).value != 0 ? i(this, T).display : "" : i(this, T).value === 1 ? e : i(this, T).value === -1 ? `-${e}` : i(this, T).value === 0 ? "0" : `${i(this, T).display}*${e}`;
  }
  removeVariable(e) {
    delete i(this, v)[e];
  }
  /**
   * Get the tex output of the monom
   */
  get tex() {
    let e = "";
    const t = Object.keys(i(this, v)).sort();
    for (const s of t)
      i(this, v)[s].isNotZero() && (e += s, i(this, v)[s].isNotEqual(1) && (e += `^{ ${i(this, v)[s].tfrac.tex} }`));
    return e === "" ? i(this, T).value != 0 ? i(this, T).frac.tex : "0" : i(this, T).value === 1 ? e : i(this, T).value === -1 ? `-${e}` : i(this, T).value === 0 ? "0" : `${i(this, T).frac.tex}${e}`;
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
T = new WeakMap(), v = new WeakMap(), Ye = new WeakSet(), gt = function(e) {
  for (const t in e.literal)
    i(this, v)[t] = e.literal[t].clone();
}, Re = new WeakMap(), Et = new WeakMap(), Nt = new WeakMap(), a(I, "gcd", (...e) => {
  for (const r of e)
    if (r.containsRationalPower())
      return new I().zero();
  const t = new I(), s = G.gcd(...e.map((r) => r.coefficient.numerator)), n = G.lcm(...e.map((r) => r.coefficient.denominator));
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
a(I, "xMultiply", (...e) => {
  const t = new I().one();
  for (const s of e)
    t.multiply(s);
  return t;
});
let k = I;
var ue, Ze, P, ye, rt, pi, mi, gi, Qt, yi;
const hi = class hi {
  constructor(e, t, s = "x") {
    d(this, P);
    d(this, ue);
    d(this, Ze);
    if (h(this, Ze, s), Object.hasOwn(e, "moveLeft")) {
      const n = e;
      h(this, ue, n.left.clone().subtract(n.right));
    } else
      h(this, ue, e.clone().subtract(t ?? 0));
  }
  solve() {
    if (i(this, ue).degree().isOne())
      return q(this, P, pi).call(this);
    if (i(this, ue).degree().value === 2)
      return q(this, P, mi).call(this);
    const e = q(this, P, yi).call(this);
    if (e.length > 0)
      return e;
    if (i(this, ue).degree().value === 3)
      return q(this, P, Qt).call(this);
    throw new Error("The equation degree is too high.");
  }
  solveAsCardan() {
    if (i(this, ue).degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return q(this, P, Qt).call(this);
  }
};
ue = new WeakMap(), Ze = new WeakMap(), P = new WeakSet(), ye = function(e) {
  if (e instanceof c && e.isApproximative())
    return q(this, P, rt).call(this, e.value);
  const t = new c(e);
  return {
    variable: i(this, Ze),
    exact: t,
    value: t.value,
    tex: t.tex,
    display: t.display
  };
}, rt = function(e, t) {
  return {
    variable: i(this, Ze),
    exact: !1,
    value: +e.toFixed(10),
    tex: (t == null ? void 0 : t.tex) ?? "",
    display: (t == null ? void 0 : t.display) ?? ""
  };
}, pi = function() {
  const e = i(this, ue).monomByDegree(0).coefficient.clone().opposite().divide(i(this, ue).monomByDegree(1).coefficient);
  return [
    q(this, P, ye).call(this, e)
  ];
}, mi = function() {
  const e = i(this, ue), t = e.monomByDegree(2).coefficient, s = e.monomByDegree(1).coefficient, n = e.monomByDegree(0).coefficient, r = s.clone().pow(2).subtract(t.clone().multiply(n).multiply(4));
  if (r.isNegative())
    return [];
  if (r.isSquare()) {
    const l = r.sqrt(), u = s.clone().opposite().add(l).divide(t.clone().multiply(2)), f = s.clone().opposite().subtract(l).divide(t.clone().multiply(2));
    return l.isZero() ? [q(this, P, ye).call(this, u)] : [
      q(this, P, ye).call(this, u),
      q(this, P, ye).call(this, f)
    ].sort((m, g) => m.value - g.value);
  }
  return q(this, P, gi).call(this, t, s, r);
}, gi = function(e, t, s) {
  const n = G.dividers(s.value).filter((pe) => Math.sqrt(pe) % 1 === 0).map((pe) => Math.sqrt(pe)).pop() ?? 1, r = G.gcd(2 * e.value, t.value, n) * (e.isNegative() ? -1 : 1), l = t.clone().divide(r).opposite(), u = e.clone().divide(r).multiply(2), f = s.clone().divide(n ** 2), m = Math.abs(n / r), g = n === 1 ? "-" : `-${m} `, E = n === 1 ? "+" : `+${m} `;
  function L(pe, ce, it, Wt) {
    return `\\frac{ ${ce} ${it}\\sqrt{ ${Wt} } }{ ${pe} }`;
  }
  function te(pe, ce, it, Wt) {
    return `(${ce}${it}sqrt(${Wt}))/${pe}`;
  }
  const ae = s.value ** 0.5, le = (-t.value - ae) / (2 * e.value), ge = (-t.value + ae) / (2 * e.value);
  return [
    q(this, P, rt).call(this, le, {
      tex: L(u.tex, l.tex, g.toString(), f.tex),
      display: te(u.display, l.display, g.toString(), f.display)
    }),
    q(this, P, rt).call(this, ge, {
      tex: L(u.tex, l.tex, E.toString(), f.tex),
      display: te(u.display, l.display, E.toString(), f.display)
    })
  ].sort((pe, ce) => pe.value - ce.value);
}, Qt = function() {
  const e = i(this, ue), t = e.monomByDegree(3).coefficient, s = e.monomByDegree(2).coefficient, n = e.monomByDegree(1).coefficient, r = e.monomByDegree(0).coefficient, l = s.clone().divide(t), u = n.clone().divide(t), f = r.clone().divide(t), m = u.clone().subtract(l.clone().pow(2).divide(3)), g = f.clone().subtract(l.clone().multiply(u).divide(3)).add(l.clone().pow(3).multiply(2).divide(27)), E = g.clone().opposite(), L = m.clone().opposite().pow(3).divide(27), te = E.clone().pow(2).subtract(L.clone().multiply(4)).opposite();
  if (te.isNegative()) {
    const ae = g.clone().opposite().add(te.clone().opposite().sqrt()).divide(2).root(3), le = g.clone().opposite().subtract(te.clone().opposite().sqrt()).divide(2).root(3), ge = ae.clone().add(le).subtract(l.clone().divide(3));
    return [q(this, P, ye).call(this, ge)];
  }
  if (te.isZero()) {
    const ae = g.clone().opposite().divide(2).root(3), le = ae.clone().opposite().subtract(l.clone().divide(3)), ge = ae.clone().multiply(2).subtract(l.clone().divide(3));
    return le.isEqual(ge) ? [q(this, P, ye).call(this, le)] : [
      q(this, P, ye).call(this, ge),
      q(this, P, ye).call(this, le)
    ].sort((pe, ce) => pe.value - ce.value);
  }
  if (te.isPositive()) {
    const ae = [], le = m.value, ge = g.value, pe = l.value;
    for (let ce = 0; ce < 3; ce++)
      ae.push(2 * Math.sqrt(-le / 3) * Math.cos(Math.acos(3 * ge / (2 * le) * Math.sqrt(-3 / le)) / 3 + 2 * Math.PI * ce / 3) - pe / 3);
    return ae.map((ce) => q(this, P, rt).call(this, ce)).sort((ce, it) => ce.value - it.value);
  }
  return [];
}, yi = function() {
  let e = i(this, ue).clone(), t = [];
  const s = e.lcmDenominator();
  s !== 1 && e.multiply(s);
  const n = e.monomByDegree().coefficient;
  let r = e.monomByDegree(0).coefficient;
  for (; r.isZero(); )
    t.length === 0 && t.push(q(this, P, ye).call(this, 0)), e = e.divide("x"), r = e.monomByDegree(0).coefficient;
  const l = G.dividers(n.value), u = G.dividers(r.value);
  for (const g of l)
    for (const E of u) {
      const L = new c(E, g);
      e.evaluate(L).isZero() && !t.find((te) => te.value === L.value) && t.push(q(this, P, ye).call(this, L)), L.opposite(), e.evaluate(L).isZero() && !t.find((te) => te.value === L.value) && t.push(q(this, P, ye).call(this, L));
    }
  for (const g of t) {
    if (g.exact !== !1 && g.exact.isZero())
      continue;
    const E = i(this, ue).clone().parse("x", g.exact.denominator, -g.exact.numerator);
    for (; e.isDividableBy(E); )
      console.log(e.display, E.display), e = e.divide(E);
  }
  if (e.degree().isZero())
    return t.sort((g, E) => g.value - E.value);
  if (e.degree().value > 3)
    return [];
  const f = e.clone().parse("0");
  console.log(e.display), console.log(f.display);
  const m = new hi(e, e.clone().parse("0"), i(this, Ze));
  return t = t.concat(m.solve()), t.sort((g, E) => g.value - E.value);
};
let wt = hi;
var Fe, y, Qe, at, Tt, At, Ot, qt, lt, Mt, kt, Ct, $t, wi, It, Ke, Pt;
const C = class C {
  constructor(e, ...t) {
    d(this, $t);
    // #region Class fields (8)
    d(this, Fe);
    d(this, y);
    // #endregion Constructors (7)
    // #region Properties and methods (49)
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values
     */
    a(this, "parse", (e, ...t) => {
      if (h(this, y, []), h(this, Fe, []), typeof e == "string")
        return q(this, $t, wi).call(this, e, ...t);
      if ((typeof e == "number" || e instanceof c || e instanceof k) && t.length === 0)
        i(this, y).push(new k(e));
      else if (e instanceof k && t.length > 0)
        i(this, y).push(new k(e)), t.forEach((s) => {
          i(this, y).push(new k(s));
        });
      else if (e instanceof C)
        for (const s of e.monoms)
          i(this, y).push(s.clone());
      return this;
    });
    /**
     * Clone the polynom
     */
    a(this, "clone", () => {
      const e = new C(), t = [];
      for (const s of i(this, y))
        t.push(s.clone());
      return e.monoms = t, e;
    });
    a(this, "add", (...e) => {
      for (const t of e)
        t instanceof C ? h(this, y, i(this, y).concat(t.monoms)) : t instanceof k ? i(this, y).push(t.clone()) : typeof t == "number" && Number.isSafeInteger(t) ? i(this, y).push(new k(t.toString())) : i(this, y).push(new k(t));
      return this.reduce();
    });
    a(this, "commonMonom", () => {
      const e = new k().one(), t = this.gcdNumerator(), s = this.gcdDenominator(), n = this.degree();
      e.coefficient = new c(t, s);
      for (const r of this.variables) {
        e.setLetter(r, n);
        for (const l of i(this, y))
          if (e.setLetter(r, c.min(l.degree(r), e.degree(r))), e.degree(r).isZero())
            break;
      }
      return e;
    });
    a(this, "degree", (e) => {
      let t = new c().zero();
      for (const s of i(this, y))
        t = c.max(s.degree(e).value, t);
      return t;
    });
    a(this, "derivative", (e) => {
      const t = new C();
      for (const s of i(this, y))
        t.add(s.derivative(e));
      return t;
    });
    a(this, "divide", (e) => {
      if (e instanceof c)
        return i(this, at).call(this, e);
      if (typeof e == "number" && Number.isSafeInteger(e))
        return i(this, Tt).call(this, e);
      if (e instanceof k)
        return this.divide(new C(e));
      if (e instanceof C) {
        if (e.monoms.length === 1 && e.variables.length === 0)
          return i(this, at).call(this, e.monoms[0].coefficient);
        {
          const { quotient: t, reminder: s } = this.euclidean(e);
          if (s.isZero())
            return h(this, y, t.monoms), this;
        }
      } else if (typeof e == "string")
        return this.divide(new C(e));
      throw new Error(`Cannot divide by ${e}`);
    });
    a(this, "empty", () => (h(this, y, []), this));
    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    a(this, "euclidean", (e) => {
      const t = e.variables[0], s = new C().zero(), n = this.clone().reorder(t);
      if (e.variables.length === 0)
        return {
          quotient: this.clone().divide(e).reduce(),
          reminder: new C().zero()
        };
      const r = e.monomByDegree(void 0, t), l = e.degree(t);
      let u, f = this.degree(t).value * 2;
      for (; n.degree(t).isGeq(l) && f > 0 && (f--, u = n.monomByDegree(void 0, t).clone().divide(r), !(!u.isZero() && (s.add(u), n.subtract(e.clone().multiply(u)).reduce(), u.degree(t).isZero()))); )
        ;
      return s.reduce(), n.reduce(), { quotient: s, reminder: n };
    });
    a(this, "evaluate", (e, t) => {
      if (t)
        return i(this, At).call(this, e);
      const s = new c().zero();
      return i(this, y).forEach((n) => {
        s.add(n.evaluate(e, t));
      }), s;
    });
    // -------------------------------------
    /**
     * Factorize a polynom and store the best results in factors.
     * @param letter
     */
    a(this, "factorize", (e) => {
      let t = [], s = this.clone().reorder();
      const n = s.commonMonom();
      if (s.monomByDegree().coefficient.isStrictlyNegative() && n.coefficient.isStrictlyPositive() && !n.isOne() && n.opposite(), !n.isOne()) {
        const u = new C(n);
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
          let u = i(this, qt).call(this, s, l, e ?? "x");
          for (l = s.degree(e).value; u.length > 0; ) {
            const f = u[0];
            if (!s.isDividableBy(f))
              u.shift();
            else {
              const m = s.euclidean(f);
              t.push(f), s = m.quotient.clone(), u = u.filter((g) => {
                const E = s.monoms[0], L = s.monoms[s.monoms.length - 1], te = g.monoms[0], ae = g.monoms[g.monoms.length - 1];
                return L.isDivisible(ae) ? E.isDivisible(te) : !1;
              });
            }
          }
        }
      return s.isOne() || t.push(s.clone()), h(this, Fe, t), i(this, Fe);
    });
    a(this, "gcdDenominator", () => G.gcd(...this.getDenominators()));
    a(this, "gcdNumerator", () => G.gcd(...this.getNumerators()));
    // Next functions are used for for commonMonom, which is used in the factorize method.
    a(this, "getDenominators", () => {
      const e = [];
      for (const t of i(this, y))
        e.push(t.coefficient.denominator);
      return e;
    });
    a(this, "getNumerators", () => {
      const e = [];
      for (const t of i(this, y))
        e.push(t.coefficient.numerator);
      return e;
    });
    a(this, "getZeroes", () => new wt(this.clone()).solve());
    a(this, "integrate", (e, t, s = "x") => {
      const n = this.primitive(s), r = {}, l = {};
      return r[s] = new c(e), l[s] = new c(t), n.evaluate(l).subtract(n.evaluate(r));
    });
    a(this, "isDeveloped", (e) => {
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
    a(this, "isDividableBy", (e) => {
      if (e.degree().isOne()) {
        const t = e.getZeroes()[0];
        return t.exact instanceof c ? this.evaluate(t.exact).isZero() : !1;
      } else {
        const { reminder: t } = this.euclidean(e);
        return t.isZero();
      }
    });
    a(this, "isEqual", (e) => i(this, Qe).call(this, e, "="));
    a(this, "isOppositeAt", (e) => i(this, Qe).call(this, e.clone().opposite(), "="));
    a(this, "isReduced", (e) => {
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
    a(this, "isSameAs", (e) => i(this, Qe).call(this, e, "same"));
    a(this, "lcmDenominator", () => G.lcm(...this.getDenominators()));
    a(this, "lcmNumerator", () => G.lcm(...this.getNumerators()));
    a(this, "letters", () => {
      let e = /* @__PURE__ */ new Set();
      for (const t of i(this, y))
        e = /* @__PURE__ */ new Set([...e, ...t.variables]);
      return [...e];
    });
    a(this, "limitToInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), s = t.coefficient.sign(), n = t.degree(e);
      return n.isStrictlyPositive() ? s === 1 ? new c().infinite() : new c().infinite().opposite() : n.isZero() ? t.coefficient : new c().zero();
    });
    a(this, "limitToNegativeInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), s = t.coefficient.sign(), n = t.degree(e);
      return n.isStrictlyPositive() ? s === -1 ? new c().infinite() : new c().infinite().opposite() : n.isZero() ? t.coefficient : new c().zero();
    });
    a(this, "monomByDegree", (e, t) => {
      if (e === void 0)
        return this.monomByDegree(this.degree(t), t);
      const s = this.clone().reduce();
      for (const n of i(s, y))
        if (n.degree(t).isEqual(e))
          return n.clone();
      return new k().zero();
    });
    // Used in LinearSystem.tex
    a(this, "monomByLetter", (e) => {
      const t = this.clone().reduce();
      for (const s of i(t, y))
        if (s.hasVariable(e))
          return s.clone();
      return new k().zero();
    });
    a(this, "monomsByDegree", (e, t) => {
      if (e === void 0)
        return this.monomsByDegree(this.degree(t));
      const s = [], n = this.clone().reduce();
      for (const r of i(n, y))
        r.degree(t) === e && s.push(r.clone());
      return s;
    });
    a(this, "multiply", (e) => e instanceof C ? i(this, Ct).call(this, e) : e instanceof c ? i(this, lt).call(this, e) : e instanceof k ? i(this, kt).call(this, e) : Number.isSafeInteger(e) && typeof e == "number" ? i(this, Mt).call(this, e) : this);
    a(this, "one", () => (h(this, y, []), i(this, y).push(new k().one()), this));
    // ------------------------------------------
    a(this, "opposite", () => (h(this, y, i(this, y).map((e) => e.opposite())), this));
    a(this, "pow", (e) => {
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
    a(this, "primitive", (e) => {
      const t = new C();
      for (const s of i(this, y))
        t.add(s.primitive(e));
      return t;
    });
    a(this, "reduce", () => {
      let e = 0;
      for (; e < i(this, y).length; ) {
        for (let t = e + 1; t < i(this, y).length; t++)
          i(this, y)[e].isSameAs(i(this, y)[t]) && (i(this, y)[e].add(i(this, y)[t]), i(this, y).splice(t, 1), i(this, y)[e].isZero() && (i(this, y)[e] = new k().zero()), t--);
        e++;
      }
      h(this, y, i(this, y).filter((t) => !t.coefficient.isZero()));
      for (const t of i(this, y))
        t.coefficient.reduce();
      return this.length === 0 ? new C().zero() : this.reorder();
    });
    a(this, "reorder", (e = "x", t) => {
      t === void 0 && (t = !1);
      const s = this.variables.filter((n) => n !== e);
      return i(this, y).sort(function(n, r) {
        const l = n.degree(e).value, u = r.degree(e).value;
        if (l !== u)
          return t ? l - u : u - l;
        if (s.length > 0)
          for (const f of s) {
            const m = n.degree(f).value, g = r.degree(f).value;
            if (m !== g)
              return t ? m - g : g - m;
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
      let s;
      const n = new C().zero();
      for (const r of this.monoms)
        !r.hasVariable(e) || r.literal[e].isZero() ? n.add(r.clone()) : (s = r.literal[e].clone(), r.removeVariable(e), n.add(t.clone().pow(Math.abs(s.numerator)).multiply(r)));
      return h(this, y, n.reduce().monoms), this;
    });
    a(this, "subtract", (...e) => {
      for (const t of e)
        t instanceof C ? this.add(t.clone().opposite()) : t instanceof k ? i(this, y).push(t.clone().opposite()) : i(this, y).push(new k(t).opposite());
      return this.reduce();
    });
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    a(this, "zero", () => (h(this, y, []), i(this, y).push(new k().zero()), this));
    // #endregion Getters And Setters (22)
    // #region Private methods (15)
    d(this, Qe, (e, t) => {
      t === void 0 && (t = "=");
      const s = this.clone().reduce().reorder(), n = e.clone().reduce().reorder();
      switch (t) {
        case "=":
          return s.length !== n.length || !s.degree().isEqual(n.degree()) ? !1 : s.monoms.every((r, l) => r.isEqual(n.monoms[l]));
        case "same":
          return s.length !== n.length || !s.degree().isEqual(n.degree()) ? !1 : s.monoms.every((r, l) => r.isSameAs(n.monoms[l]));
        default:
          return !1;
      }
    });
    d(this, at, (e) => {
      for (const t of i(this, y))
        t.coefficient.divide(e);
      return this;
    });
    d(this, Tt, (e) => {
      const t = new c(e);
      for (const s of i(this, y))
        s.coefficient.divide(t);
      return this;
    });
    d(this, At, (e) => {
      let t = 0;
      return i(this, y).forEach((s) => {
        t += s.evaluate(e, !0);
      }), t;
    });
    d(this, Ot, (e) => {
      var E;
      let t, s, n, r, l, u, f, m, g;
      if (this.numberOfVars === 1)
        return n = this.monomByDegree(2, e).coefficient, r = this.monomByDegree(1, e).coefficient, l = this.monomByDegree(0, e).coefficient, u = r.clone().pow(2).subtract(n.clone().multiply(l).multiply(4)), u.isZero() ? (f = r.clone().opposite().divide(n.clone().multiply(2)), t = new C(e).subtract(f.display).multiply(f.denominator), s = new C(e).subtract(f.display).multiply(f.denominator), g = n.divide(f.denominator).divide(f.denominator), g.isOne() ? [t, s] : [new C(g.display), t, s]) : u.isPositive() && u.isSquare() ? (f = r.clone().opposite().add(u.clone().sqrt()).divide(n.clone().multiply(2)), m = r.clone().opposite().subtract(u.clone().sqrt()).divide(n.clone().multiply(2)), g = n.divide(f.denominator).divide(m.denominator), g.isOne() ? [
          new C(e).subtract(f.display).multiply(f.denominator),
          new C(e).subtract(m.display).multiply(m.denominator)
        ] : [
          new C(g.display),
          new C(e).subtract(f.display).multiply(f.denominator),
          new C(e).subtract(m.display).multiply(m.denominator)
        ]) : [this.clone()];
      if (n = this.monomByDegree(2, e), r = this.monomByDegree(1, e), l = this.monomByDegree(0, e), n.isLiteralSquare() && l.isLiteralSquare() && r.clone().pow(2).isSameAs(n.clone().multiply(l))) {
        const L = new C("x", n.coefficient, r.coefficient, l.coefficient), te = i(E = L, Ot).call(E, "x"), ae = [];
        let le;
        if (te.length >= 2) {
          for (const ge of te)
            ge.degree().isZero() ? ae.push(ge.clone()) : (le = ge.clone(), le.monoms[0].literal = n.literalSqrt, le.monoms[1].literal = l.literalSqrt, ae.push(le.clone()));
          return ae;
        }
      }
      return [this.clone()];
    });
    d(this, qt, (e, t, s) => {
      const n = e.monoms[0].dividers, r = e.monoms[e.monoms.length - 1].dividers, l = [];
      return n.forEach((u) => {
        u.degree(s).isLeq(t) && r.forEach((f) => {
          u.degree(s).isNotEqual(f.degree(s)) && (l.push(new C(u, f)), l.push(new C(u, f.clone().opposite())));
        });
      }), l;
    });
    d(this, lt, (e) => {
      for (const t of i(this, y))
        t.coefficient.multiply(e);
      return this.reduce();
    });
    d(this, Mt, (e) => i(this, lt).call(this, new c(e)));
    d(this, kt, (e) => {
      for (const t of i(this, y))
        t.multiply(e);
      return this.reduce();
    });
    d(this, Ct, (e) => {
      const t = [];
      for (const s of i(this, y))
        for (const n of e.monoms)
          t.push(k.xMultiply(s, n));
      return h(this, y, t), this.reduce();
    });
    d(this, It, (e, t) => {
      switch (t.tokenType) {
        case p.COEFFICIENT:
          e.push(new C(t.token));
          break;
        case p.VARIABLE:
          e.push(new C().add(new k(t.token)));
          break;
        case p.CONSTANT:
          console.log("Actually, not supported - will be added later !");
          break;
        case p.OPERATION:
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
            else if (t.token === "^") {
              if (s.degree().isStrictlyPositive())
                throw new Error("Cannot elevate a polynom with another polynom !");
              if (s.monoms[0].coefficient.isRelative())
                e.push(n.pow(s.monoms[0].coefficient.value));
              else if (n.monoms.length === 1 && n.monoms[0].coefficient.isOne()) {
                for (const r in n.monoms[0].literal)
                  n.monoms[0].literal[r].multiply(s.monoms[0].coefficient);
                e.push(n);
              } else
                console.error("Cannot have power with fraction");
            }
          } else if (t.token === "-") {
            const s = e.pop();
            s && e.push(s.opposite());
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
    d(this, Ke, (e, t, s, n) => {
      let r = "";
      for (const l of i(this, y)) {
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
    d(this, Pt, (e) => {
      const s = new Gt().parse(e).rpn;
      this.zero();
      const n = [];
      for (const r of s)
        i(this, It).call(this, n, r);
      return n.length === 1 && this.add(n[0]), this.reorder();
    });
    return h(this, y, []), h(this, Fe, []), e !== void 0 && this.parse(e, ...t), this;
  }
  hasVariable(e) {
    return this.variables.includes(e);
  }
  inverse() {
  }
  isOne() {
    return i(this, y).length === 1 && i(this, y)[0].coefficient.isOne() && this.degree().isZero();
  }
  isZero() {
    return i(this, y).length === 1 && i(this, y)[0].coefficient.isZero() || i(this, y).length === 0;
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
    return i(this, Ke).call(this);
  }
  get isMultiVariable() {
    return i(this, y).some((e) => e.variables.length > 1);
  }
  get length() {
    return i(this, y).length;
  }
  // ------------------------------------------
  get monoms() {
    return i(this, y);
  }
  set monoms(e) {
    h(this, y, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get plotFunction() {
    return i(this, Ke).call(this, "tex", !1, !1, !0);
  }
  get tex() {
    return i(this, Ke).call(this, "tex");
  }
  get variables() {
    let e = [];
    for (const t of i(this, y))
      e = e.concat(t.variables);
    return e = [...new Set(e)], e.sort(), e;
  }
  get zeroes() {
    return this.getZeroes();
  }
  // #endregion Private methods (15)
};
Fe = new WeakMap(), y = new WeakMap(), Qe = new WeakMap(), at = new WeakMap(), Tt = new WeakMap(), At = new WeakMap(), Ot = new WeakMap(), qt = new WeakMap(), lt = new WeakMap(), Mt = new WeakMap(), kt = new WeakMap(), Ct = new WeakMap(), $t = new WeakSet(), wi = function(e, ...t) {
  if (t.length === 0) {
    if (e = "" + e, e !== "" && !isNaN(Number(e))) {
      this.empty();
      const s = new k(e);
      return this.add(s), this;
    }
    return i(this, Pt).call(this, e);
  } else if (/^[a-z]+/.test(e)) {
    this.empty();
    const s = t.map((n) => new c(n));
    if (e.length > 1) {
      const n = e.split("");
      let r = 0;
      for (const l of s) {
        const u = new k();
        u.coefficient = l.clone(), u.literalStr = n[r] || "", this.add(u), r++;
      }
    } else {
      let n = s.length - 1;
      for (const r of s) {
        const l = new k();
        l.coefficient = r.clone(), l.literalStr = `${e}^${n}`, this.add(l), n--;
      }
    }
    return this;
  } else
    return this.zero();
}, It = new WeakMap(), Ke = new WeakMap(), Pt = new WeakMap();
let O = C;
function ci(o, e = !0) {
  return e ? `\\left( ${o} \\right)` : `(${o})`;
}
var Ee, Je, Ne, Te;
const we = class we {
  constructor(e, t) {
    d(this, Ee);
    d(this, Je, !1);
    d(this, Ne);
    d(this, Te);
    if (e instanceof we)
      h(this, Ne, e.polynom.clone()), h(this, Te, e.power.clone());
    else if (typeof e == "string" && t === void 0) {
      const [s, n = "1"] = e.split("^");
      h(this, Ne, new O(s)), h(this, Te, new c(n.replace("(", "").replace(")", "")));
    } else
      h(this, Ne, new O(e)), h(this, Te, new c(t ?? 1));
    return h(this, Ee, 1), this;
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  clone() {
    return new we(this);
  }
  add() {
    throw new Error("Adding two factors is not possible");
  }
  get withPower() {
    return h(this, Ee, 1), this;
  }
  get withRoot() {
    return h(this, Ee, 0), this;
  }
  get asSingle() {
    return h(this, Je, !0), this;
  }
  degree(e) {
    return this.polynom.degree(e).multiply(this.power);
  }
  derivative() {
    return this.power.isZero() ? [new we("0", "1")] : this.power.isOne() ? [new we(this.polynom.clone().derivative())] : [
      new we(this.power.clone()),
      new we(this.polynom.clone().derivative()),
      new we(this.polynom.clone(), this.power.clone().subtract(1))
    ];
  }
  develop() {
    if (this.power.isNatural())
      return this.polynom.clone().pow(this.power.value);
    throw new Error("The power must be a natural number");
  }
  get display() {
    const e = this.power.numerator, t = this.power.denominator;
    let s, n;
    return i(this, Ee) === 0 && t > 1 ? (s = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, n = Math.abs(e) === 1 ? "" : `^(${Math.abs(e)})`) : (s = i(this, Je) && this.power.isOne() ? this.polynom.display : ci(this.polynom.display, !1), n = t === 1 && Math.abs(e) === 1 ? "" : `^(${this.power.display})`), s = `${s}${n}`, i(this, Ee) === 0 && e < 0 && (s = `1/(${s})`), s;
  }
  divide(e) {
    if (e instanceof we && this.isSameAs(e))
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
    return e instanceof we ? t = e.polynom : e instanceof O ? t = e : t = new O(e), this.polynom.isEqual(t);
  }
  isZero() {
    return this.polynom.isZero();
  }
  multiply(e) {
    if (e instanceof we && this.isSameAs(e))
      return this.power.add(e.power), this;
    const t = new O(e);
    if (this.isSameAs(t))
      return this.power.add(1), this;
    throw new Error("The two factors must be the same");
  }
  one() {
    return i(this, Ne).one(), i(this, Te).one(), this;
  }
  opposite() {
    throw new Error("Method not implemented.");
  }
  get polynom() {
    return i(this, Ne);
  }
  set polynom(e) {
    h(this, Ne, e);
  }
  pow(e) {
    return this.power.multiply(e), this;
  }
  get power() {
    return i(this, Te);
  }
  set power(e) {
    h(this, Te, new c(e));
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
    let s, n;
    return i(this, Ee) === 0 && t > 1 ? (s = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, n = Math.abs(e) === 1 ? "" : `^{ ${Math.abs(e)} }`) : (s = i(this, Je) && this.power.isOne() ? this.polynom.tex : ci(this.polynom.tex), n = t === 1 && Math.abs(e) === 1 ? "" : `^{ ${this.power.tex} }`), s = `${s}${n}`, i(this, Ee) === 0 && e < 0 && (s = `\\frac{ 1 }{ ${s} }`), s;
  }
  get variables() {
    return this.polynom.variables;
  }
  zero() {
    return i(this, Ne).zero(), i(this, Te).one(), this;
  }
};
Ee = new WeakMap(), Je = new WeakMap(), Ne = new WeakMap(), Te = new WeakMap();
let fe = we;
var We = /* @__PURE__ */ ((o) => (o[o.ROOT = 0] = "ROOT", o[o.POWER = 1] = "POWER", o))(We || {}), A, M, ne, Bt, _e, St;
const xe = class xe {
  constructor(e, t, s) {
    // Left part of the equation
    d(this, A);
    // Right part of the equation
    d(this, M);
    // Signe of the equation
    d(this, ne);
    // #endregion Constructors (3)
    // #region Properties and methods (26)
    // ------------------------------------------
    a(this, "parse", (e) => {
      const t = i(this, Bt).call(this, e);
      if (t === !1)
        throw new Error("The equation is not valid (no sign found)");
      const s = e.split(t);
      return this.create(new O(s[0]), new O(s[1]), i(this, _e).call(this, t));
    });
    a(this, "create", (e, t, s) => (h(this, A, e), h(this, M, t), h(this, ne, i(this, _e).call(this, s ?? "=")), this));
    a(this, "clone", () => new xe(i(this, A).clone(), i(this, M).clone(), i(this, ne)));
    /**
     * Get the degree of the equation
     * @param letter
     */
    a(this, "degree", (e) => c.max(i(this, A).degree(e), i(this, M).degree(e)));
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
      const t = new c(e);
      return t.isZero() ? this : this.multiply(t.inverse());
    });
    /**
     * Determine if the equation contains a variable.
     * @param letter
     */
    a(this, "hasVariable", (e) => this.variables.includes(e));
    a(this, "isLinearTo", (e) => {
      const t = e.clone().moveLeft().simplify().left, s = this.clone().moveLeft().simplify().left;
      return t.isEqual(s) || t.isOppositeAt(s);
    });
    /**
     * Determine if the equation contains more than one letter/variable.
     */
    a(this, "isMultiVariable", () => i(this, A).isMultiVariable || i(this, M).isMultiVariable);
    // -----------------------------------------------
    // Equations helpers
    a(this, "isEqualTo", (e) => {
      const t = e.clone().moveLeft().left, s = this.clone().moveLeft().left;
      return t.isEqual(s) || t.isOppositeAt(s);
    });
    /**
     * Reorder the polynom to have only one letter on the left, the rest on the right.
     * @param letter
     */
    a(this, "isolate", (e) => {
      if (!this.degree(e).isOne() || this.isMultiVariable())
        return !1;
      let t;
      i(this, A).subtract(i(this, M)), i(this, M).zero();
      const s = [...i(this, A).monoms];
      for (const r of s)
        r.hasVariable(e) || (t = r.clone(), i(this, A).subtract(t), i(this, M).subtract(t));
      if (i(this, A).length !== 1)
        return !1;
      const n = i(this, A).monoms[0].coefficient.clone();
      return i(this, A).divide(n), i(this, M).divide(n), this;
    });
    // -----------------------------------------------
    // Equations operations
    // -----------------------------------------------
    a(this, "letters", () => [.../* @__PURE__ */ new Set([...i(this, A).letters(), ...i(this, M).letters()])]);
    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    a(this, "moveLeft", () => (i(this, A).subtract(i(this, M)), i(this, M).zero(), this));
    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    a(this, "multiply", (e) => {
      const t = new c(e);
      return i(this, A).multiply(t), i(this, M).multiply(t), i(this, ne) !== "=" && t.sign() === -1 && i(this, St).call(this), this;
    });
    a(this, "opposite", () => (h(this, A, i(this, A).opposite()), h(this, M, i(this, M).opposite()), this));
    a(this, "reorder", (e) => (i(this, A).subtract(i(this, M)), i(this, M).zero(), i(this, A).reorder(), e ? this : (i(this, A).monoms.filter((t) => t.degree().isZero()).forEach((t) => {
      const s = t.clone();
      i(this, A).subtract(s), i(this, M).subtract(s);
    }), i(this, A).reorder(), i(this, M).reorder(), this)));
    // ------------------------------------------
    a(this, "replaceBy", (e, t) => (i(this, A).replaceBy(e, t), i(this, M).replaceBy(e, t), this));
    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    a(this, "simplify", () => (this.multiply(G.lcm(...i(this, A).getDenominators(), ...i(this, M).getDenominators())), this.divide(G.gcd(...i(this, A).getNumerators(), ...i(this, M).getNumerators())), this));
    // -----------------------------------------------
    a(this, "solve", () => new wt(this.clone()).solve());
    a(this, "test", (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e)));
    // #endregion Getters And Setters (13)
    // #region Private methods (6)
    d(this, Bt, (e) => {
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
    d(this, _e, (e) => e === void 0 ? "=" : e.includes("geq") || e.includes(">=") || e.includes("=>") ? ">=" : e.includes(">") ? ">" : e.includes("leq") || e.includes("<=") || e.includes("=<") ? "<=" : e.includes("<") ? "<" : "=");
    d(this, St, () => i(this, ne) === "=" ? this : i(this, ne).includes("<") ? (i(this, ne).replace("<", ">"), this) : i(this, ne).includes(">") ? (i(this, ne).replace(">", "<"), this) : this);
    if (h(this, A, new O().zero()), h(this, M, new O().zero()), h(this, ne, "="), e !== void 0 && t === void 0) {
      if (e instanceof xe)
        return e.clone();
      typeof e == "string" && this.parse(e);
    } else e !== void 0 && t !== void 0 && (this.left = new O(e), this.right = new O(t));
    return s !== void 0 && (this.sign = s), this;
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
    if (e instanceof xe)
      return i(this, A).add(e.left), i(this, M).add(e.right), this;
    if (typeof e == "string" && !xe.isEquationString(e))
      return this.add(new xe(e));
    const t = new O(e);
    return i(this, A).add(t), i(this, M).add(t), this;
  }
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param values
   * @param asNumeric
   */
  evaluate(e, t) {
    const s = i(this, A).evaluate(e, t), n = i(this, M).evaluate(e, t);
    return t ? s === n : s.isEqual(n);
  }
  isEqual(e) {
    const t = new xe(e);
    return t.left.isEqual(i(this, A)) && t.right.isEqual(i(this, M));
  }
  pow(e) {
    return i(this, A).pow(e), i(this, M).pow(e), this;
  }
  reduce() {
    return this.moveLeft(), i(this, A).reduce(), this.simplify(), i(this, A).monoms[0].coefficient.isNegative() && this.multiply(-1), this;
  }
  split() {
    return [i(this, A).clone(), i(this, M).clone()];
  }
  subtract(e) {
    if (e instanceof xe)
      return i(this, A).subtract(e.left), i(this, M).subtract(e.right), this;
    if (typeof e == "string" && !xe.isEquationString(e))
      return this.subtract(new xe(e));
    const t = new O(e);
    return i(this, A).subtract(t), i(this, M).subtract(t), this;
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
    return `${i(this, A).display}${this.signAsTex}${i(this, M).display}`;
  }
  // Getter and setter
  get left() {
    return i(this, A);
  }
  set left(e) {
    h(this, A, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get right() {
    return i(this, M);
  }
  set right(e) {
    h(this, M, e);
  }
  // ------------------------------------------
  get sign() {
    return i(this, ne);
  }
  set sign(e) {
    h(this, ne, i(this, _e).call(this, e));
  }
  get signAsTex() {
    return i(this, ne) === ">=" ? "\\geq" : i(this, ne) === "<=" ? "\\leq" : i(this, ne);
  }
  get tex() {
    return `${i(this, A).tex}${this.signAsTex}${i(this, M).tex}`;
  }
  get variables() {
    return [...new Set(i(this, M).variables.concat(i(this, A).variables))];
  }
  // #endregion Private methods (6)
};
A = new WeakMap(), M = new WeakMap(), ne = new WeakMap(), Bt = new WeakMap(), _e = new WeakMap(), St = new WeakMap();
let H = xe;
var N, je, ct, Jt;
const me = class me {
  // #endregion Class fields (1)
  // #region Constructors (1)
  constructor(...e) {
    // #region Class fields (1)
    d(this, N, []);
    d(this, je, We.POWER);
    return this.parse(...e), this;
  }
  // #endregion Constructors (1)
  // #region Properties and methods (25)
  parse(...e) {
    return e.length === 0 ? this : (h(this, N, []), e.forEach((t) => {
      if (typeof t == "string") {
        const s = t.split(")(").join(")*(").split("*");
        i(this, N).push(...s.map((n) => new fe(n)));
      } else t instanceof me ? i(this, N).push(...t.factors.map((s) => s.clone())) : i(this, N).push(new fe(t));
    }), this);
  }
  fromPolynom(e, t) {
    return h(this, N, new O(e).factorize(t).map((s) => new fe(s))), this;
  }
  clone() {
    return new me(...i(this, N).map((e) => e.clone()));
  }
  add(...e) {
    let t = [this, ...e];
    const s = me.gcd(...t);
    t = t.map((r) => r.divide(s).reduce());
    const n = new O("0");
    return t.forEach((r) => n.add(r.develop())), h(this, N, [
      ...s.factors,
      new fe(n)
    ]), this;
  }
  degree(e) {
    return i(this, N).reduce((t, s) => t.add(s.degree(e)), new c("0"));
  }
  derivative() {
    const e = [], t = i(this, N).length;
    for (let n = 0; n < t; n++) {
      const r = i(this, N).slice(), l = r.splice(n, 1)[0];
      e.push(new me(...r).multiply(new me(...l.derivative())));
    }
    e.forEach((n) => n.reduce());
    const s = e.shift();
    return s !== void 0 && h(this, N, s.factors), this.add(...e);
  }
  develop() {
    const e = new O("1");
    return i(this, N).forEach((t) => {
      e.multiply(t.develop());
    }), e;
  }
  divide(e) {
    return h(this, N, i(this, N).concat(e.clone().factors.map((t) => t.inverse()))), this;
  }
  evaluate(e, t) {
    return t ? i(this, N).reduce((s, n) => s * n.evaluate(e, t), 1) : i(this, N).reduce((s, n) => s.multiply(n.evaluate(e)), new c("1"));
  }
  hasVariable(e) {
    return i(this, N).some((t) => t.hasVariable(e));
  }
  inverse() {
    return h(this, N, i(this, N).map((e) => e.inverse())), this;
  }
  isEqual(e) {
    const t = me.gcd(this, e), s = this.clone().divide(t).reduce(), n = e.clone().divide(t).reduce();
    return s.isOne() && n.isOne();
  }
  isOne() {
    return i(this, N).every((e) => e.isOne());
  }
  isZero() {
    return i(this, N).every((e) => e.isZero());
  }
  multiply(...e) {
    return e.forEach((t) => {
      h(this, N, i(this, N).concat(t.clone().factors));
    }), this;
  }
  one() {
    return h(this, N, [new fe("1", "1")]), this;
  }
  opposite() {
    const e = i(this, N).findIndex((t) => t.display === "(-1)");
    return e >= 0 ? i(this, N).splice(e, 1) : i(this, N).push(new fe("-1", "1")), this;
  }
  pow(e) {
    return h(this, N, i(this, N).map((t) => t.pow(e))), this;
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    const e = Yt(this);
    return h(this, N, Object.values(e).map((t) => {
      const s = t[0].polynom, n = t.reduce((r, l) => r.add(l.power), new c("0"));
      return new fe(s, n.reduce());
    }).filter((t) => !t.power.isZero())), this;
  }
  root(e) {
    return h(this, N, i(this, N).map((t) => t.root(e))), this;
  }
  sort() {
    return h(this, N, i(this, N).sort((e, t) => e.degree().isLeq(t.degree()) ? -1 : 1)), this;
  }
  sqrt() {
    return h(this, N, i(this, N).map((e) => e.sqrt())), this;
  }
  subtract(...e) {
    return this.add(...e.map((t) => t.opposite()));
  }
  zero() {
    return h(this, N, [new fe("0", "1")]), this;
  }
  static gcd(...e) {
    var s;
    if (e.length === 0)
      return new me().one();
    if (e.length === 1)
      return e[0];
    if (e.length === 2)
      return q(s = me, ct, Jt).call(s, e[0], e[1]);
    let t = e[0];
    return e.shift(), e.forEach((n) => {
      var r;
      return t = q(r = me, ct, Jt).call(r, t, n);
    }), t;
  }
  // #endregion Properties and methods (25)
  // #region Getters And Setters (5)
  get factors() {
    return i(this, N);
  }
  set factors(e) {
    h(this, N, e);
  }
  get variables() {
    return i(this, N).reduce((e, t) => e.concat(t.variables), []);
  }
  get asRoot() {
    return h(this, je, We.ROOT), this;
  }
  get asPower() {
    return h(this, je, We.POWER), this;
  }
  get numerator() {
    return i(this, N).filter((e) => e.power.isPositive());
  }
  get denominator() {
    return i(this, N).filter((e) => e.power.isNegative());
  }
  get display() {
    let e = [], t = [];
    if (i(this, je) === We.ROOT ? (e = this.numerator, t = this.denominator.map((r) => r.clone().inverse())) : e = i(this, N), e.length === 0 && (e = [new fe("1")]), t.length === 0)
      return e.length === 1 ? e[0].asSingle.display : e.map((r) => r.display).join("");
    const s = e.length === 1 ? e[0].asSingle.display : e.map((r) => r.display).join(""), n = t.length === 1 ? t[0].asSingle.display : t.map((r) => r.display).join("");
    return `(${s})/(${n})`;
  }
  get tex() {
    let e = [], t = [];
    if (i(this, je) === We.ROOT ? (e = this.numerator, t = this.denominator.map((r) => r.clone().inverse())) : e = i(this, N), e.length === 0 && (e = [new fe("1")]), t.length === 0)
      return e.length === 1 ? e[0].asSingle.tex : e.map((r) => r.tex).join("");
    const s = e.length === 1 ? e[0].asSingle.tex : e.map((r) => r.tex).join(""), n = t.length === 1 ? t[0].asSingle.tex : t.map((r) => r.tex).join("");
    return `\\frac{ ${s} }{ ${n} }`;
  }
  // #endregion Private methods (1)
};
N = new WeakMap(), je = new WeakMap(), ct = new WeakSet(), Jt = function(e, t) {
  const s = Yt(e), n = Yt(t), l = Object.keys(s).filter((u) => Object.hasOwn(n, u)).map((u) => {
    const f = s[u].reduce((g, E) => g.add(E.power), new c("0")), m = n[u].reduce((g, E) => g.add(E.power), new c("0"));
    return new fe(u, c.min(f, m));
  });
  return new me(...l);
}, d(me, ct);
let Kt = me;
function Yt(o) {
  const e = new c().one(), t = o.factors.reduce((s, n) => {
    if (n.polynom.degree().isZero())
      return n.polynom.monoms.length > 0 && e.multiply(n.polynom.monoms[0].coefficient), s;
    const r = n.polynom.display;
    return Object.hasOwn(s, r) ? s[r].push(n) : s[r] = [n], s;
  }, {});
  return e.isOne() || (t[e.display] = [new fe(e.display, 1)]), t;
}
var z, Ce, Rt, zt;
const He = class He {
  constructor(...e) {
    d(this, z);
    // Determine the letters in the linear system, usually ['x', 'y']
    d(this, Ce);
    a(this, "parse", (...e) => (h(this, z, e.map((t) => new H(t))), i(this, Rt).call(this), this));
    a(this, "clone", () => new He().parse(...i(this, z).map((e) => e.clone())));
    a(this, "buildTex", (e, t) => {
      let s, n, r = [];
      const l = [];
      for (const f of e)
        r = r.concat(f.letters());
      r = [...new Set(r)], r.sort();
      for (let f = 0; f < e.length; f++) {
        const m = e[f];
        s = [];
        for (const g of r)
          n = m.left.monomByLetter(g), s.length === 0 ? s.push(n.isZero() ? "" : n.tex) : s.push(n.isZero() ? "" : (n.coefficient.sign() === 1 ? "+" : "") + n.tex);
        if (s.push("="), s.push(m.right.tex), (t == null ? void 0 : t[f]) !== void 0) {
          s[s.length - 1] = s[s.length - 1] + " \\phantom{\\quad}";
          for (const g of t[f])
            s.push(`\\ \\cdot\\ ${g.startsWith("-") ? "\\left(" + g + "\\right)" : g}`);
        }
        l.push(s.join("&"));
      }
      let u = 0;
      return t !== void 0 && t.length > 0 && (u = t[0].length), `\\left\\{\\begin{array}{${"r".repeat(r.length)}cl ${"|l".repeat(u)}}${l.join("\\\\ ")}\\end{array}\\right.`;
    });
    a(this, "mergeEquations", (e, t, s, n) => {
      const r = e.clone().multiply(new c(s)), l = t.clone().multiply(new c(n));
      return r.left.add(l.left), r.right.add(l.right), r;
    });
    // ------------------------------------------
    a(this, "reorder", () => {
      for (const e of i(this, z))
        e.reorder();
      return this;
    });
    a(this, "solveMatrix", () => {
      const [e, t] = this.matrix, s = e.map((n, r) => [...n, t[r]]);
      for (let n = 0; n < e.length; n++) {
        const r = s[n][n].clone();
        s[n] = s[n].map((l) => l.divide(r));
        for (let l = 0; l < e.length; l++) {
          if (l === n)
            continue;
          const u = s[l][n].clone().opposite();
          for (let f = 0; f < s[l].length; f++)
            s[l][f].add(s[n][f].clone().multiply(u));
          if (s[l].slice(0, s[l].length - 1).every((f) => f.isZero()))
            return s[l][s[l].length - 1].isZero() ? [new c().infinite()] : [];
        }
      }
      return s.map((n) => n[n.length - 1]);
    });
    d(this, Rt, () => (h(this, Ce, i(this, z).reduce((e, t) => [.../* @__PURE__ */ new Set([...e, ...t.variables])], [])), i(this, Ce).sort(), this));
    d(this, zt, () => {
      const e = [], t = [];
      for (const s of i(this, z)) {
        const n = [], r = s.clone().reorder();
        for (const l of this.variables) {
          const u = r.left.monomByLetter(l);
          n.push(u.coefficient);
        }
        t.push(r.right.monoms[0].coefficient), e.push(n);
      }
      return [e, t];
    });
    return h(this, z, []), h(this, Ce, []), e.length > 0 && this.parse(...e), this;
  }
  static fromMatrix(e, t = "xyz") {
    const s = e[0].length;
    if (e.some((r) => r.length !== s))
      throw new Error("All rows must have the same number of columns");
    const n = t.split("").splice(0, s - 1);
    return new He(
      ...e.map((r) => {
        const l = new O(n.join(""), ...r);
        return new H(l, 0);
      })
    );
  }
  add(e, t) {
    if (e instanceof He) {
      const s = e.equations.length;
      if (s !== i(this, z).length)
        throw new Error("The number of equations must be the same");
      for (let n = 0; n < s; n++)
        i(this, z)[n].add(e.equations[n]);
    } else {
      if (t === void 0 || t < 0 || t >= i(this, z).length)
        throw new Error("Index out of range");
      const s = new H(e);
      i(this, z)[t].add(s);
    }
    return this;
  }
  degree(e) {
    return c.max(...i(this, z).map((t) => t.degree(e)));
  }
  get display() {
    return this.tex + "as display";
  }
  // ------------------------------------------
  get equations() {
    return i(this, z);
  }
  set equations(e) {
    h(this, z, e);
  }
  evaluate(e, t) {
    throw new Error("Method not implemented.");
  }
  hasVariable(e) {
    return i(this, Ce).includes(e);
  }
  isEqual(e) {
    return this.equations.every((t, s) => t.isEqual(e.equations[s]));
  }
  get isSolvable() {
    return this.variables.length === i(this, z).length;
  }
  get matrix() {
    return i(this, zt).call(this);
  }
  multiply(e, t) {
    if (Array.isArray(e)) {
      if (e.length !== i(this, z).length)
        throw new Error("The number of values must be the same as the number of equations");
      for (let s = 0; s < e.length; s++)
        i(this, z)[s].multiply(e[s]);
      return this;
    }
    if (t === void 0 || t < 0 || t >= i(this, z).length)
      throw new Error("Index out of range");
    return i(this, z)[t].multiply(e), this;
  }
  reduce() {
    throw new Error("Method not implemented.");
  }
  solve() {
    return [];
  }
  subtract(e, t) {
    if (e instanceof He) {
      const s = e.equations.length;
      if (s !== i(this, z).length)
        throw new Error("The number of equations must be the same");
      for (let n = 0; n < s; n++)
        i(this, z)[n].subtract(e.equations[n]);
    } else {
      if (t === void 0 || t < 0 || t >= i(this, z).length)
        throw new Error("Index out of range");
      const s = new H(e);
      i(this, z)[t].subtract(s);
    }
    return this;
  }
  get tex() {
    const e = this.clone().reorder();
    return this.buildTex(e.equations);
  }
  get variables() {
    return i(this, Ce);
  }
  set variables(e) {
    const t = typeof e == "string" ? e.split("") : [...e];
    t.sort(), h(this, Ce, t);
  }
};
z = new WeakMap(), Ce = new WeakMap(), Rt = new WeakMap(), zt = new WeakMap();
let _t = He;
function Xi(o, e) {
  return o.dimension === e.dimension && o.array.every(
    (t, s) => e.array[s].isEqual(t)
  );
}
function Yi(o, e) {
  if (o.dimension !== e.dimension)
    return !1;
  const t = e.array[0].value / o.array[0].value;
  return o.array.every(
    (s, n) => e.array[n].value === s.value * t
  );
}
function Qi(o, e) {
  return o.dimension !== e.dimension ? new c().invalid() : o.array.reduce(
    (t, s, n) => t.add(s.clone().multiply(e.array[n])),
    new c(0)
  );
}
function Ki(...o) {
  return o.some((e) => e.dimension !== o[0].dimension) ? new c().invalid() : o[0].dimension === 2 && o.length !== 2 ? new c().invalid() : o[0].dimension === 3 && o.length !== 3 ? new c().invalid() : o[0].dimension === 2 ? o[0].array[0].clone().multiply(o[1].array[1]).subtract(o[0].array[1].clone().multiply(o[1].array[0])) : o[0].array[0].clone().multiply(
    o[1].array[1].clone().multiply(o[2].array[2]).subtract(o[1].array[2].clone().multiply(o[2].array[1]))
  ).subtract(
    o[0].array[1].clone().multiply(
      o[1].array[0].clone().multiply(o[2].array[2]).subtract(o[1].array[2].clone().multiply(o[2].array[0]))
    )
  ).add(o[0].array[2].clone().multiply(o[1].array[0].clone().multiply(o[2].array[1]).subtract(o[1].array[1].clone().multiply(o[2].array[0]))));
}
var Z, ze;
const Be = class Be {
  constructor(...e) {
    d(this, Z, []);
    d(this, ze, !1);
    a(this, "zero", () => (i(this, Z).forEach((e) => e.zero()), this));
    a(this, "one", () => (this.zero(), this.x.one(), this));
    a(this, "opposite", () => (i(this, Z).forEach((e) => e.opposite()), this));
    a(this, "add", (e) => (i(this, Z).forEach((t, s) => t.add(e.array[s])), this));
    a(this, "subtract", (e) => this.add(e.clone().opposite()));
    a(this, "unit", () => {
      const e = this.norm;
      return e === 0 ? this : this.divideByScalar(e);
    });
    a(this, "dot", (e) => Qi(this, e));
    a(this, "normal", () => {
      if (this.dimension >= 3)
        throw new Error("Normal vector can only be determined in 2D");
      const e = this.x.clone().opposite(), t = this.y.clone();
      return i(this, Z)[0] = t, i(this, Z)[1] = e, this;
    });
    a(this, "isEqual", (e) => Xi(this, e));
    a(this, "isColinearTo", (e) => Yi(this, e));
    a(this, "isNormalTo", (e) => this.dot(e).isZero());
    a(this, "multiplyByScalar", (e) => {
      const t = new c(e);
      return this.array.forEach((s) => s.multiply(t)), this;
    });
    a(this, "divideByScalar", (e) => this.multiplyByScalar(new c(e).inverse()));
    a(this, "simplify", () => this.multiplyByScalar(
      G.lcm(...this.array.map((e) => e.denominator))
    ).divideByScalar(
      G.gcd(...this.array.map((e) => e.numerator))
    ).multiplyByScalar(
      this.x.isNegative() ? -1 : 1
    ));
    a(this, "angle", (e, t, s) => {
      let n = this.dot(e).value;
      return t && (n = Math.abs(n)), (s ? 1 : 180 / Math.PI) * Math.acos(n / (this.norm * e.norm));
    });
    a(this, "fromString", (e) => {
      e.startsWith("(") && (e = e.substring(1)), e.endsWith(")") && (e = e.substring(0, e.length - 1));
      const t = e.split(/[,;\s]/g).filter((s) => s.trim() !== "");
      return t.length < 2 ? this : (h(this, Z, t.map((s) => new c(s))), this);
    });
    e.length > 0 && this.parse(...e);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get array() {
    return i(this, Z);
  }
  set array(e) {
    h(this, Z, e);
  }
  get x() {
    return i(this, Z)[0];
  }
  set x(e) {
    i(this, Z)[0] = new c(e);
  }
  get y() {
    return i(this, Z)[1];
  }
  set y(e) {
    i(this, Z)[1] = new c(e);
  }
  get z() {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    return i(this, Z)[2];
  }
  set z(e) {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    i(this, Z)[2] = new c(e);
  }
  get asPoint() {
    return i(this, ze);
  }
  set asPoint(e) {
    h(this, ze, e);
  }
  get normSquare() {
    return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new c(0));
  }
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get tex() {
    return i(this, ze) ? `\\left(${this.array.map((e) => e.tex).join(";")}\\right)` : `\\begin{pmatrix} ${this.array.map((e) => e.tex).join(" \\\\ ")} \\end{pmatrix}`;
  }
  get display() {
    return i(this, ze) ? `(${this.array.map((e) => e.display).join(";")})` : `((${this.array.map((e) => e.display).join(",")}))`;
  }
  setDimension(e = 2) {
    if (e < 2)
      throw new Error("Dimension must be at least 2");
    if (e < this.dimension)
      h(this, Z, i(this, Z).slice(0, e));
    else if (e > this.dimension)
      for (let t = this.dimension; t < e; t++)
        i(this, Z).push(new c(0));
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
    return h(this, ze, e !== !1), this;
  }
  parse(...e) {
    if (e.length === 0)
      throw new Error("Invalid value");
    if (e.length === 1) {
      if (e[0] instanceof Be)
        return e[0].clone();
      if (typeof e[0] == "string")
        return this.fromString(e[0]);
      throw new Error("Invalid value");
    }
    if (e.length === 2) {
      const [t, s] = e;
      if (t instanceof Be && s instanceof Be) {
        if (t.dimension !== s.dimension)
          throw new Error("Vectors must have the same dimension");
        return h(this, Z, s.array.map((n, r) => n.clone().subtract(t.array[r]))), this;
      }
    }
    return h(this, Z, e.map((t) => new c(t))), this;
  }
  clone() {
    const e = new Be();
    return e.array = this.copy(), e.asPoint = this.asPoint, e;
  }
  copy() {
    return i(this, Z).map((e) => e.clone());
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
    return new Be(
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
    const t = new Be(this, e);
    return {
      value: t.norm,
      fraction: t.normSquare,
      tex: t.tex
    };
  }
};
Z = new WeakMap(), ze = new WeakMap();
let x = Be;
function vi(o = 0.5) {
  return Math.random() < o;
}
function de(o, e, t) {
  if (e === void 0)
    return o >= 0 ? de(0, o) : de(o, 0);
  if (o === e)
    return o;
  if (t === void 0)
    return Math.floor(Math.random() * (e - o + 1) + o);
  if (Math.abs(e - o) <= t.length)
    throw new Error("The number of excluded values is too high.");
  let s = de(o, e);
  for (; t.includes(s); )
    s = de(o, e);
  return s;
}
function X(o, e) {
  return e === !1 ? vi() ? de(1, o) : -de(1, o) : de(-o, o);
}
function Ji(o) {
  let e = G.primes();
  return o !== void 0 && (e = e.filter((t) => t < o)), oi(e);
}
function _i(o, e) {
  return e === void 0 && (e = 1), o.length <= 0 ? Object.values(o) : bi(o).slice(0, e);
}
function oi(o) {
  return o.length === 0 ? null : o[de(0, o.length - 1)];
}
function bi(o) {
  const e = Object.values(o);
  for (let t = e.length - 1; t > 0; t--) {
    const s = Math.floor(Math.random() * (t + 1)), n = e[t];
    e[t] = e[s], e[s] = n;
  }
  return e;
}
class j extends x {
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
      if (e.some((s) => s instanceof x))
        throw new Error("Creating a point with  multiple argument requires an input fraction");
      const t = e.map((s) => new c(s));
      if (t.some((s) => s.isNaN()))
        throw new Error("The value is not a valid point sting (a,b): " + e.join(","));
      this.array = t;
    }
    return this;
  }
  clone() {
    const e = new j();
    return e.array = this.copy(), e.asPoint = !0, e;
  }
}
var xi = /* @__PURE__ */ ((o) => (o.None = "none", o.Parallel = "parallel", o.Perpendicular = "perpendicular", o.Tangent = "tangent", o))(xi || {}), $e, B, S, U, re, Y, Ie, ve;
const De = class De {
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...e) {
    d(this, $e);
    // ax + by + c = 0
    d(this, B);
    d(this, S);
    d(this, U);
    d(this, re);
    d(this, Y);
    d(this, Ie);
    d(this, ve, "canonical");
    a(this, "randomPoint", (e) => i(this, Y).clone().multiplyByScalar(X(e === void 0 || e <= 1 ? 3 : e, !1)).add(i(this, re)));
    a(this, "randomNearPoint", (e) => {
      const t = this.randomPoint(e);
      let s = 10;
      for (; this.isOnLine(t) && s > 0; )
        t.x.add(X(1, !1)), t.y.add(X(1, !1)), s--;
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
        if (e[0] instanceof De)
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
        return e[0] instanceof x && e[1] instanceof De ? e[2] === "parallel" || e[2] === null ? this.fromPointAndLine(
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
    a(this, "fromEquation", (e) => {
      e.reorder(!0);
      const t = new Set(e.letters());
      if (!(t.has("x") || t.has("y")))
        return this;
      for (const s of ["x", "y"])
        t.has(s) && t.delete(s);
      return t.size > 0 ? this : this.fromCoefficient(
        e.left.monomByLetter("x").coefficient,
        e.left.monomByLetter("y").coefficient,
        e.left.monomByDegree(0).coefficient
      );
    });
    a(this, "fromCoefficient", (e, t, s) => (h(this, B, new c(e)), h(this, S, new c(t)), h(this, U, new c(s)), h(this, Y, new x(i(this, S).clone(), i(this, B).clone().opposite())), h(this, re, new x(new c().zero(), i(this, U).clone())), h(this, Ie, i(this, Y).clone().normal()), this));
    a(this, "fromPointAndDirection", (e, t) => (this.fromCoefficient(
      t.y,
      t.x.clone().opposite(),
      e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)).opposite()
    ), h(this, re, e.clone()), h(this, Y, t.clone()), h(this, Ie, i(this, Y).clone().normal()), this));
    a(this, "fromPointAndNormal", (e, t) => this.fromCoefficient(
      t.x,
      t.y,
      e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()
    ));
    a(this, "fromPointAndLine", (e, t, s) => (s === void 0 && (s = "parallel"), s === "parallel" ? this.fromPointAndNormal(e, t.normal) : s === "perpendicular" ? this.fromPointAndNormal(e, t.director) : this));
    a(this, "clone", () => (h(this, B, i(this, B).clone()), h(this, S, i(this, S).clone()), h(this, U, i(this, U).clone()), h(this, Y, i(this, Y).clone()), h(this, re, i(this, re).clone()), h(this, Ie, i(this, Ie).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    a(this, "isOnLine", (e) => i(this, B).clone().multiply(e.x).add(
      i(this, S).clone().multiply(e.y)
    ).add(i(this, U)).isZero());
    a(this, "isParallelTo", (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height));
    a(this, "isSameAs", (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height));
    a(this, "isPerpendicularTo", (e) => this.d.isNormalTo(e.d));
    a(this, "isVertical", () => this.slope.isInfinity());
    a(this, "simplify", () => {
      const e = G.lcm(i(this, B).denominator, i(this, S).denominator, i(this, U).denominator), t = G.gcd(i(this, B).numerator, i(this, S).numerator, i(this, U).numerator);
      return this.fromCoefficient(
        i(this, B).clone().multiply(e).divide(t),
        i(this, S).clone().multiply(e).divide(t),
        i(this, U).clone().multiply(e).divide(t)
      ), this;
    });
    a(this, "simplifyDirection", () => (i(this, Y).simplify(), this));
    a(this, "intersection", (e) => {
      const t = new x();
      let s = !1, n = !1;
      return i(this, S).isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new c().invalid(), t.y = new c().invalid(), s = !0) : this.isSameAs(e) ? (t.x = new c().invalid(), t.y = new c().invalid(), n = !0) : (t.x = i(this, S).clone().multiply(e.c).subtract(i(this, U).clone().multiply(e.b)).divide(i(this, B).clone().multiply(e.b).subtract(i(this, S).clone().multiply(e.a))), t.y = i(this, B).clone().multiply(e.c).subtract(i(this, U).clone().multiply(e.a)).divide(i(this, S).clone().multiply(e.a).subtract(i(this, B).clone().multiply(e.b)))), {
        point: t,
        hasIntersection: !(s || n),
        isParallel: s,
        isSame: n
      };
    });
    a(this, "getValueAtX", (e) => {
      const t = this.getEquation().isolate("y"), s = new c(e);
      return t instanceof H ? t.right.evaluate({ x: s }) : new c().invalid();
    });
    a(this, "getValueAtY", (e) => {
      const t = this.getEquation().isolate("x"), s = new c(e);
      return t instanceof H ? t.right.evaluate({ y: s }) : new c().invalid();
    });
    return h(this, B, new c().zero()), h(this, S, new c().zero()), h(this, U, new c().zero()), h(this, re, new x()), h(this, Y, new x()), h(this, Ie, new x()), h(this, $e, !0), e.length > 0 && this.parse(...e), this;
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
    return i(this, U);
  }
  set c(e) {
    h(this, U, e);
  }
  get OA() {
    return i(this, re);
  }
  set OA(e) {
    h(this, re, e);
  }
  get d() {
    return i(this, Y);
  }
  set d(e) {
    h(this, Y, e);
  }
  get n() {
    return i(this, Ie);
  }
  // ------------------------------------------
  getEquation() {
    const e = new H(new O().parse("xy", i(this, B), i(this, S), i(this, U)), new O("0"));
    return i(this, $e) ? e.simplify() : e;
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
    return h(this, ve, "canonical"), this;
  }
  get equation() {
    return h(this, ve, "equation"), this;
  }
  get mxh() {
    return h(this, ve, "mxh"), this;
  }
  get parametric() {
    return h(this, ve, "parametric"), this;
  }
  get system() {
    return h(this, ve, "system"), this;
  }
  get tex() {
    const e = i(this, ve);
    switch (h(this, ve, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().tex;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new O().parse("x", this.slope, this.height).tex;
      case "parametric":
      case "system": {
        const t = i(this, Y).clone();
        return i(this, $e) && t.simplify(), e === "parametric" ? `${x.asTex("x", "y")} = ${x.asTex(i(this, re).x.tex, i(this, re).y.tex)} + k\\cdot ${x.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}
            x &= ${new O(i(this, re).x).add(new k(i(this, Y).x).multiply(new k("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new O(i(this, re).y).add(new k(i(this, Y).y).multiply(new k("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`;
      }
      default: {
        const t = this.getEquation();
        return i(this, B).isNegative() && t.multiply(-1), t.tex;
      }
    }
  }
  get reduceBeforeDisplay() {
    return i(this, $e);
  }
  set reduceBeforeDisplay(e) {
    h(this, $e, e);
  }
  get display() {
    const e = i(this, ve);
    switch (h(this, ve, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().display;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new O().parse("x", this.slope, this.height).display;
      case "parametric": {
        const t = i(this, Y).clone();
        return i(this, $e) && t.simplify(), `((x,y))=((${i(this, re).x.display},${i(this, re).y.display}))+k((${t.x.display},${t.y.display}))`;
      }
      default: {
        const t = this.getEquation();
        return i(this, B).isNegative() && t.multiply(-1), t.display;
      }
    }
  }
  get normal() {
    return new x(i(this, B), i(this, S));
  }
  get director() {
    return i(this, Y).clone();
  }
  get slope() {
    return i(this, B).clone().opposite().divide(i(this, S));
  }
  get height() {
    return i(this, U).clone().opposite().divide(i(this, S));
  }
  fromPoints(e, t) {
    return this.fromPointAndDirection(e, new x(e, t));
  }
  distanceTo(e) {
    const t = e.x.clone().multiply(i(this, B)).add(e.y.clone().multiply(i(this, S))).add(i(this, U)).abs(), s = this.normal.normSquare;
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
      new De().fromPoints(e, t)
    );
    return s.hasIntersection ? s.point.x.value >= Math.min(e.x.value, t.x.value) && s.point.x.value <= Math.max(e.x.value, t.x.value) && s.point.y.value >= Math.min(e.y.value, t.y.value) && s.point.y.value <= Math.max(e.y.value, t.y.value) : !1;
  }
  // ------------------------------------------
  // Special functions
  // ------------------------------------------
  canonicalAsFloatCoefficient(e) {
    e === void 0 && (e = 2);
    let t = "";
    return i(this, B).isZero() || (i(this, B).isOne() ? t = "x" : i(this, B).clone().opposite().isOne() ? t = "-x" : t = i(this, B).value.toFixed(e) + "x"), i(this, S).isZero() || (i(this, S).isPositive() && (t += "+"), t += i(this, S).value.toFixed(e) + "y"), i(this, U).isZero() || (i(this, U).isPositive() && (t += "+"), t += i(this, U).value.toFixed(e)), t + "=0";
  }
};
$e = new WeakMap(), B = new WeakMap(), S = new WeakMap(), U = new WeakMap(), re = new WeakMap(), Y = new WeakMap(), Ie = new WeakMap(), ve = new WeakMap(), // A line is defined as the canonical form
a(De, "PERPENDICULAR", "perpendicular"), a(De, "PARALLEL", "parallel");
let D = De;
var oe, F, Ae, Lt, Dt, Vt, he, Ei, yt, Ni, Ti, Ai, ei;
const Zt = class Zt {
  constructor(...e) {
    d(this, he);
    d(this, oe);
    d(this, F);
    d(this, Ae);
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    a(this, "relativePosition", (e) => {
      if (i(this, oe) === void 0 || i(this, F) === void 0)
        throw new Error("Circle not defined");
      const t = e.distanceTo(i(this, oe)), s = Math.sqrt(i(this, F).value);
      return t.value - s > 1e-10 ? 0 : Math.abs(t.value - s) < 1e-10 ? 1 : 2;
    });
    a(this, "lineIntersection", (e) => {
      const t = [];
      if (i(this, Ae) === void 0)
        return [];
      const s = i(this, Ae).clone(), n = e.getEquation().clone().isolate("x"), r = e.getEquation().clone().isolate("y");
      return n instanceof H && r instanceof H && (s.replaceBy("y", r.right).simplify(), s.solve()), t;
    });
    a(this, "tangents", (e) => e instanceof c ? i(this, Vt).call(this, e) : this.isPointOnCircle(e) ? i(this, Lt).call(this, e) : i(this, oe) !== void 0 && i(this, oe).distanceTo(e).value > this.radius.value ? i(this, Dt).call(this, e) : (console.log("No tangents as the point is inside !"), []));
    a(this, "isPointOnCircle", (e) => {
      var t;
      return ((t = i(this, Ae)) == null ? void 0 : t.test({ x: e.x, y: e.y })) ?? !1;
    });
    a(this, "getPointsOnCircle", (e) => {
      const t = G.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), s = [];
      return t.forEach((n) => {
        for (const r of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
          s.push(
            new j(
              this.center.x.clone().add(r[0] * n[0]),
              this.center.y.clone().add(r[1] * n[1])
            )
          );
      }), s;
    });
    d(this, Lt, (e) => {
      const t = new x(this.center, e);
      return [new D(e, t, xi.Perpendicular)];
    });
    d(this, Dt, (e) => {
      const t = this.center.x.clone().subtract(e.x), s = this.center.y.clone().subtract(e.y), n = new O("x"), r = new O("x^2+1");
      return n.multiply(t).subtract(s).pow(2), r.multiply(this.squareRadius), new H(n, r).solve().map((f) => {
        let m;
        const g = new H("y", "x");
        return f.exact instanceof c ? (m = e.x.clone().opposite().multiply(f.exact).add(e.y), g.right.multiply(f.exact).add(m)) : (m = e.x.clone().opposite().multiply(f.value).add(e.y), g.right.multiply(f.value).add(m)), new D(g);
      });
    });
    d(this, Vt, (e) => {
      const t = e.numerator, s = -e.denominator, n = this.center.x.clone(), r = this.center.y.clone(), l = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), u = n.clone().multiply(t).opposite().subtract(r.clone().multiply(s)).add(l.clone().sqrt()), f = n.clone().multiply(t).opposite().subtract(r.clone().multiply(s)).subtract(l.clone().sqrt());
      return [new D(t, s, u), new D(t, s, f)];
    });
    e.length > 0 && this.parse(...e);
  }
  get center() {
    return i(this, oe) ?? new j();
  }
  get squareRadius() {
    return i(this, F) ?? new c(0);
  }
  get cartesian() {
    if (i(this, Ae) === void 0)
      throw new Error("Cartesian equation not defined");
    return i(this, Ae);
  }
  get radius() {
    return i(this, F) === void 0 ? { tex: "", display: "", value: 0 } : i(this, F).isSquare() ? {
      tex: i(this, F).clone().sqrt().tex,
      display: i(this, F).clone().sqrt().display,
      value: i(this, F).clone().sqrt().value
    } : {
      tex: `\\sqrt{${i(this, F).tex}}`,
      display: `sqrt(${i(this, F).display})`,
      value: i(this, F).clone().sqrt().value
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
    return new Zt(
      this.center.clone(),
      this.squareRadius.clone(),
      !0
    );
  }
  setRadius(e, t) {
    return t ? h(this, F, new c(e)) : h(this, F, new c(e).pow(2)), q(this, he, yt).call(this), this;
  }
  parse(...e) {
    return q(this, he, Ei).call(this), typeof e[0] == "string" ? q(this, he, ei).call(this, new H(e[0])) : e[0] instanceof H ? q(this, he, ei).call(this, e[0]) : e[0] instanceof Zt ? q(this, he, Ni).call(this, e[0]) : e[0] instanceof j && e.length > 1 && (e[1] instanceof j ? e[2] instanceof j || q(this, he, Ai).call(this, e[0], e[1]) : (e[1] instanceof c || typeof e[1] == "number") && q(this, he, Ti).call(this, e[0], e[1], typeof e[2] == "boolean" ? e[2] : !1)), q(this, he, yt).call(this), this;
  }
  // private _parseThroughtThreePoints(A: Point, B: Point, C: Point): this {
  //     const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(),
  //         mAC = T.remarquables.mediators.AC.clone()
  //     this.parse(mAB.intersection(mAC).point, A)
  //     return this
  // }
};
oe = new WeakMap(), F = new WeakMap(), Ae = new WeakMap(), Lt = new WeakMap(), Dt = new WeakMap(), Vt = new WeakMap(), he = new WeakSet(), Ei = function() {
  return h(this, oe, void 0), h(this, F, void 0), h(this, Ae, void 0), this;
}, yt = function() {
  h(this, Ae, new H(
    new O(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
    new O(this.squareRadius.display)
  ).moveLeft());
}, Ni = function(e) {
  return h(this, oe, e.center.clone()), h(this, F, e.squareRadius.clone()), q(this, he, yt).call(this), this;
}, Ti = function(e, t, s) {
  return h(this, oe, e.clone()), s ? h(this, F, new c(t)) : h(this, F, new c(t).pow(2)), this;
}, Ai = function(e, t) {
  return h(this, oe, e.clone()), h(this, F, new x(i(this, oe), t).normSquare), this;
}, ei = function(e) {
  if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
    const t = e.left.monomByDegree(2, "x"), s = e.left.monomByDegree(2, "y");
    let n, r, l;
    t.coefficient.isEqual(s.coefficient) ? (e.divide(t.coefficient), n = e.left.monomByDegree(1, "x"), r = e.left.monomByDegree(1, "y"), l = e.left.monomByDegree(0), h(this, oe, new j(n.coefficient.clone().divide(2).opposite(), r.coefficient.clone().divide(2).opposite())), h(this, F, l.coefficient.clone().opposite().add(i(this, oe).x.clone().pow(2)).add(i(this, oe).y.clone().pow(2)))) : (h(this, oe, void 0), h(this, F, void 0));
  }
  return this;
};
let vt = Zt;
var Q, _, ee, et, Oe, ut, Ft, ft, Pe, jt, tt;
const Ut = class Ut {
  constructor(...e) {
    d(this, Q);
    d(this, _);
    d(this, ee);
    d(this, et);
    d(this, Oe);
    d(this, ut);
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
    a(this, "parse", (...e) => {
      if (e.length === 6) {
        const t = e.map((s) => new c(s));
        if (t.some((s) => s.isNaN()))
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
          const t = e[0].clone(), s = e[1].clone(), n = e[2].clone();
          h(this, et, { AB: t, BC: s, AC: n });
          let r = t.intersection(s);
          if (r.hasIntersection)
            h(this, _, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (r = s.intersection(n), r.hasIntersection)
            h(this, ee, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (r = n.intersection(t), r.hasIntersection)
            h(this, Q, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
        } else e.every((t) => t instanceof j) && (h(this, Q, e[0].clone()), h(this, _, e[1].clone()), h(this, ee, e[2].clone()), h(this, et, {
          AB: new D(i(this, Q), i(this, _)),
          BC: new D(i(this, _), i(this, ee)),
          AC: new D(i(this, Q), i(this, ee))
        }));
      } else if (e.length === 1 && e[0] instanceof Ut)
        return e[0].clone();
      return i(this, Ft).call(this), this;
    });
    /**
     * Clone the Triangle class
     */
    a(this, "clone", () => new Ut(
      i(this, Q).clone(),
      i(this, _).clone(),
      i(this, ee).clone()
    ));
    // ------------------------------------------
    // Triangle operations and properties
    // ------------------------------------------
    /**
     * Generate the Line object for the three segments of the triangle
     */
    d(this, Ft, () => {
      h(this, Oe, {
        AB: new j().middleOf(i(this, Q), i(this, _)),
        AC: new j().middleOf(i(this, Q), i(this, ee)),
        BC: new j().middleOf(i(this, _), i(this, ee))
      }), h(this, ut, i(this, jt).call(this));
    });
    /**
     * Get the Vector2D class for the given name
     * @param ptName
     */
    d(this, ft, (e) => {
      switch (e.toUpperCase()) {
        case "A":
          return i(this, Q);
        case "B":
          return i(this, _);
        case "C":
          return i(this, ee);
      }
      return i(this, Q);
    });
    /**
     * Get the vector for the segment given by name.
     * @param ptName1
     * @param ptName2
     */
    d(this, Pe, (e, t) => new x(
      i(this, ft).call(this, e),
      i(this, ft).call(this, t)
    ));
    d(this, jt, () => {
      const e = {
        A: new D().fromPoints(i(this, Q), i(this, Oe).BC),
        B: new D().fromPoints(i(this, _), i(this, Oe).AC),
        C: new D().fromPoints(i(this, ee), i(this, Oe).AB),
        intersection: null
      }, t = {
        AB: new D().fromPointAndNormal(i(this, Oe).AB, new x(i(this, Q), i(this, _)).normal()),
        AC: new D().fromPointAndNormal(i(this, Oe).AC, new x(i(this, Q), i(this, ee)).normal()),
        BC: new D().fromPointAndNormal(i(this, Oe).BC, new x(i(this, _), i(this, ee)).normal()),
        intersection: null
      }, s = {
        A: new D().fromPointAndNormal(i(this, Q), new x(i(this, _), i(this, ee)).normal()),
        B: new D().fromPointAndNormal(i(this, _), new x(i(this, Q), i(this, ee)).normal()),
        C: new D().fromPointAndNormal(i(this, ee), new x(i(this, Q), i(this, _)).normal()),
        intersection: null
      }, n = i(this, tt).call(this, "A"), r = i(this, tt).call(this, "B"), l = i(this, tt).call(this, "C"), u = {
        A: n.internal,
        B: r.internal,
        C: r.internal,
        intersection: null
      }, f = {
        A: n.external,
        B: r.external,
        C: l.external,
        intersection: null
      }, m = {
        medians: e,
        mediators: t,
        heights: s,
        bisectors: u,
        externalBisectors: f
      };
      return m.medians.intersection = m.medians.A.intersection(m.medians.B).point, m.mediators.intersection = m.mediators.AB.intersection(m.mediators.BC).point, m.heights.intersection = m.heights.A.intersection(m.heights.B).point, m.bisectors.intersection = m.bisectors.A.intersection(m.bisectors.B).point, m;
    });
    d(this, tt, (e) => {
      const t = this.lines;
      let s, n;
      if (e === "A" ? (s = t.AB, n = t.AC) : e === "B" ? (s = t.AB, n = t.BC) : e === "C" && (s = t.BC, n = t.AC), s === void 0 || n === void 0)
        throw new Error(`The point ${e} does not exist`);
      const r = s.n.simplify().norm, l = n.n.simplify().norm, u = s.getEquation().multiply(l), f = n.getEquation().multiply(r), m = new D(u.clone().subtract(f).simplify()), g = new D(f.clone().subtract(u).simplify());
      return e === "A" ? m.hitSegment(this.B, this.C) ? { internal: m, external: g } : { internal: g, external: m } : e === "B" ? m.hitSegment(this.A, this.C) ? { internal: m, external: g } : { internal: g, external: m } : e === "C" ? m.hitSegment(this.B, this.A) ? { internal: m, external: g } : { internal: g, external: m } : { internal: m, external: g };
    });
    return e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setters
  // ------------------------------------------
  get A() {
    return i(this, Q);
  }
  get B() {
    return i(this, _);
  }
  get C() {
    return i(this, ee);
  }
  get AB() {
    return i(this, Pe).call(this, "A", "B");
  }
  get BA() {
    return i(this, Pe).call(this, "B", "A");
  }
  get BC() {
    return i(this, Pe).call(this, "B", "C");
  }
  get CB() {
    return i(this, Pe).call(this, "C", "B");
  }
  get AC() {
    return i(this, Pe).call(this, "A", "C");
  }
  get CA() {
    return i(this, Pe).call(this, "C", "A");
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
    return i(this, et);
  }
  get remarquables() {
    return i(this, ut);
  }
};
Q = new WeakMap(), _ = new WeakMap(), ee = new WeakMap(), et = new WeakMap(), Oe = new WeakMap(), ut = new WeakMap(), Ft = new WeakMap(), ft = new WeakMap(), Pe = new WeakMap(), jt = new WeakMap(), tt = new WeakMap();
let ti = Ut;
var R, W;
const ot = class ot {
  constructor(e, t) {
    // ax + by + c = 0
    d(this, R, new j());
    d(this, W, new x());
    a(this, "clone", () => (h(this, W, i(this, W).clone()), h(this, R, i(this, R).clone()), this));
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
      const t = i(this, R).clone(), s = new c(X(e, !1));
      return new j(
        t.x.clone().add(i(this, W).x.clone().multiply(s)),
        t.y.clone().add(i(this, W).y.clone().multiply(s)),
        t.z.clone().add(i(this, W).z.clone().multiply(s))
      );
    });
    return h(this, R, e.clone()), h(this, W, t.asPoint ? new x(e, t) : t.clone()), this;
  }
  get OA() {
    return i(this, R);
  }
  set OA(e) {
    h(this, R, e);
  }
  get point() {
    return i(this, R).clone();
  }
  get d() {
    return i(this, W);
  }
  set d(e) {
    h(this, W, e);
  }
  get tex() {
    return {
      parametric: `${x.asTex("x", "y", "z")} = ${x.asTex(i(this, R).x.tex, i(this, R).y.tex, i(this, R).z.tex)} + k\\cdot ${x.asTex(i(this, W).x.tex, i(this, W).y.tex, i(this, W).z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new O(i(this, R).x).add(new k(i(this, W).x).multiply(new k("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new O(i(this, R).y).add(new k(i(this, W).y).multiply(new k("k"))).reorder("k", !0).tex}\\\\
    z &= ${new O(i(this, R).z).add(new k(i(this, W).z).multiply(new k("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
      cartesian: `\\frac{ ${new O("x", 1, i(this, R).x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new O("y", 1, i(this, R).y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new O("z", 1, i(this, R).z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
    };
  }
  get display() {
    const e = i(this, R).x.display, t = i(this, R).y.display, s = i(this, R).z.display, n = this.direction.simplify(), r = n.x.display, l = n.y.display, u = n.z.display;
    return {
      parametric: `${x.asDisplay("x", "y", "z")} = ${x.asDisplay(i(this, R).x.display, i(this, R).y.display, i(this, R).z.display)} + k\\cdot ${x.asDisplay(i(this, W).x.display, i(this, W).y.display, i(this, W).z.display)}`,
      system: "",
      cartesian: `(x-${e})/${r} = (y-${t})/${l} = (z-${s})/${u}`
    };
  }
  get direction() {
    return i(this, W).clone();
  }
  distanceTo(e) {
    const t = new x(i(this, R), e), s = this.direction, n = this.direction.normSquare, r = t.cross(s).normSquare, l = r.clone().divide(n), u = l.clone().sqrt();
    return console.log("CROSS", t.cross(s).display), {
      value: Math.sqrt(l.value),
      fraction: l.clone().sqrt(),
      tex: u.isExact() ? u.tex : `\\sqrt{${l.tex}}`
    };
  }
  hitSegment(e, t) {
    const s = this.intersection(
      new ot(e, t)
    );
    return s.hasIntersection ? s.point.x.value >= Math.min(e.x.value, t.x.value) && s.point.x.value <= Math.max(e.x.value, t.x.value) && s.point.y.value >= Math.min(e.y.value, t.y.value) && s.point.y.value <= Math.max(e.y.value, t.y.value) && s.point.z.value >= Math.min(e.z.value, t.z.value) && s.point.z.value <= Math.max(e.z.value, t.z.value) : !1;
  }
};
R = new WeakMap(), W = new WeakMap(), // A line is defined as the canonical form
a(ot, "PERPENDICULAR", "perpendicular"), a(ot, "PARALLEL", "parallel");
let bt = ot;
var qe, Ue;
const ai = class ai {
  constructor(e) {
    d(this, qe, new x(0, 0, 1));
    d(this, Ue, new j(0, 0, 0));
    return e && this.parse(e), this;
  }
  get normal() {
    return i(this, qe);
  }
  set normal(e) {
    h(this, qe, e), i(this, qe).asPoint = !1;
  }
  get point() {
    return i(this, Ue);
  }
  set point(e) {
    h(this, Ue, e), i(this, Ue).asPoint = !0;
  }
  get a() {
    return i(this, qe).x;
  }
  get b() {
    return i(this, qe).y;
  }
  get c() {
    return i(this, qe).z;
  }
  get d() {
    return i(this, qe).dot(i(this, Ue)).opposite();
  }
  get tex() {
    return new H(
      new O("xyz", this.a, this.b, this.c, this.d),
      new O(0)
    ).reduce().tex;
  }
  parse(e) {
    var t, s, n;
    if (e.point && e.normal) {
      this.point = e.point, this.normal = e.normal;
      return;
    }
    if (e.point && ((t = e.directions) == null ? void 0 : t.length) === 2) {
      this.point = e.point;
      const [r, l] = e.directions;
      this.normal = r.cross(l);
      return;
    }
    if (e.equation) {
      const r = e.equation.moveLeft().reduce().left, l = r.monomByLetter("x").coefficient, u = r.monomByLetter("y").coefficient, f = r.monomByLetter("z").coefficient, m = r.monomByDegree(0).coefficient;
      this.normal = new x(l, u, f), l.isNotZero() ? this.point = new j(m.clone().divide(l).opposite(), 0, 0) : u.isNotZero() ? this.point = new j(0, m.clone().divide(u).opposite(), 0) : this.point = new j(0, 0, m.clone().divide(f).opposite());
      return;
    }
    if (((s = e.points) == null ? void 0 : s.length) === 3 && e.points.every((r) => r instanceof x)) {
      const r = e.points[0], l = e.points[1], u = e.points[2], f = new x(r, l), m = new x(r, u);
      this.normal = f.cross(m), this.point = r;
      return;
    }
    if (((n = e.coefficients) == null ? void 0 : n.length) === 4) {
      const [r, l, u, f] = e.coefficients;
      this.normal = new x(r, l, u), this.point = new j(0, 0, -f);
      return;
    }
  }
  angle(e, t, s) {
    if (e instanceof ai)
      return this.normal.angle(e.normal, t, s);
    let n;
    if (e instanceof x) {
      if (e.dimension !== 3)
        throw new Error("Vector is not 3D");
      n = e;
    } else
      n = e.direction;
    return (s ? Math.PI / 2 : 90) - this.normal.angle(n, !0, s);
  }
  distanceTo(e) {
    return this.normal.dot(e).add(this.d).abs().value / this.normal.norm;
  }
  intersectWithLine(e) {
    const { point: t, direction: s } = e, n = this.normal.dot(t).add(this.d).divide(this.normal.dot(s).opposite());
    return t.clone().add(s.clone().multiplyByScalar(n));
  }
  intersectWithPlane(e) {
    throw this.normal.cross(e.normal), new j(0, 0, 0), new Error("Intersection with plane  not yet implemented !");
  }
  isPointOnPlane(e) {
    return this.normal.dot(e).add(this.d).isZero();
  }
};
qe = new WeakMap(), Ue = new WeakMap();
let ii = ai;
var Me;
class es {
  constructor(...e) {
    d(this, Me, []);
    return h(this, Me, e), this;
  }
  get values() {
    return i(this, Me);
  }
  get array() {
    return i(this, Me).map((e) => e.array);
  }
  get dimension() {
    return [i(this, Me).length, i(this, Me)[0].dimension];
  }
  isSquare() {
    return i(this, Me).length === i(this, Me)[0].dimension;
  }
  determinant() {
    if (!this.isSquare())
      throw new Error("Matrix is not square");
    return Ki(...this.values);
  }
}
Me = new WeakMap();
function xt(o) {
  const e = Object.assign(
    {
      negative: !0,
      max: 10,
      reduced: !0,
      zero: !0,
      natural: !1
    },
    o
  ), t = new c();
  if (e.negative ? t.numerator = X(e.max, e.zero) : t.numerator = de(e.zero ? 0 : 1, e.max), e.natural)
    t.denominator = 1;
  else {
    let s = 0;
    for (; t.isRelative() && s < 10; )
      t.denominator = de(1, e.max), s++;
  }
  return e.reduced ? t.reduce() : t;
}
function Oi(o) {
  const e = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    o
  ), t = new k();
  if (t.coefficient = xt({
    zero: e.zero,
    reduced: !0,
    natural: !e.fraction
  }), e.letters.length > 1) {
    for (const s of e.letters.split(""))
      t.setLetter(s, 0);
    for (let s = 0; s < e.degree; s++) {
      const n = oi(e.letters.split(""));
      t.setLetter(n, t.degree(n).clone().add(1));
    }
  } else
    t.setLetter(e.letters, e.degree);
  return t;
}
const ts = {
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
function qi(o) {
  const e = Object.assign(
    ts,
    o
  ), t = new O().empty();
  let s;
  for (let n = e.degree; n >= 0; n--)
    s = Oi({
      letters: e.letters,
      degree: n,
      fraction: e.fraction,
      zero: n === e.degree ? !1 : e.allowNullMonom
    }), e.unit && e.degree === n && s.coefficient.one(), t.add(s);
  if (e.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposite(), e.numberOfMonoms && e.numberOfMonoms > 0 && e.numberOfMonoms < t.length)
    for (; t.length > e.numberOfMonoms; ) {
      const n = de(1, t.length - 1);
      t.monoms.splice(n, 1);
    }
  return t;
}
function is(o) {
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
  for (let s = 0; s < e.degree; s++) {
    const n = qi({
      degree: 1,
      unit: e.unit,
      fraction: e.fraction,
      letters: e.letters,
      zero: e.zero
    });
    t.multiply(n);
  }
  return new H(t, 0);
}
function Mi(o) {
  const e = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    o
  ), t = e.axis === "x", s = e.axis === "y", n = e.fraction ? xt({ max: e.max, zero: t }) : new c(X(e.max, t)), r = e.fraction ? xt({ max: e.max, zero: s }) : new c(X(e.max, s));
  return Number(e.quadrant) === 1 && (n.abs(), r.abs()), Number(e.quadrant) === 2 && (n.isPositive() && n.opposite(), r.isNegative() && r.opposite()), Number(e.quadrant) === 3 && (n.isPositive() && n.opposite(), r.isPositive() && r.opposite()), Number(e.quadrant) === 4 && (n.isNegative() && n.opposite(), r.isPositive() && r.opposite()), new j(n, r);
}
function ss(o) {
  const e = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    o
  ), t = Mi(e.center);
  let s, n;
  return e.pointsOnCircle === 8 ? (s = de(1, 3), n = s ** 2 + (s + 1) ** 2) : n = de(1, 20), new vt(t, n, !0);
}
function ns(o) {
  const e = Object.assign(
    {
      A: {
        x: X(10),
        y: X(10)
      }
    },
    o
  ), t = new x(
    X(10),
    X(10)
  );
  for (; t.isNull; )
    t.x = X(10), t.y = X(10);
  return e.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposite() : e.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposite(), new D(new x(e.A.x, e.A.y), t);
}
function rs(o) {
  const e = Object.assign(
    {
      A: {
        x: X(10),
        y: X(10),
        z: X(10)
      },
      direction: {
        x: X(10),
        y: X(10),
        z: X(10)
      }
    },
    o
  ), t = new j(e.A.x, e.A.y, e.A.z), s = new x(e.direction.x, e.direction.y, e.direction.z);
  return new bt(t, s);
}
const os = {
  equation: (o) => is(o),
  polynom: (o) => qi(o),
  monom: (o) => Oi(o),
  fraction: (o) => xt(o),
  number: (o, e, t) => de(o, e, t),
  numberSym: (o, e) => X(o, e),
  prime: (o) => Ji(o),
  bool: (o) => vi(o),
  array: (o, e) => _i(o, e),
  item: (o) => oi(o),
  shuffle: (o) => bi(o),
  line: (o) => ns(o),
  line3: (o) => rs(o),
  point: (o) => Mi(o),
  circle: (o) => ss(o)
};
var ke, dt, si;
class hs {
  /**
   *
   * @param {string} value (optional) Default polynom to parse on class creation
   */
  constructor(e) {
    d(this, dt);
    d(this, ke);
    a(this, "parse", (e) => (h(this, ke, new Gt(Ve.SET).parse(e).rpn), this));
    return h(this, ke, []), e !== void 0 && this.parse(e), this;
  }
  evaluate(e) {
    this.variables.forEach((s) => {
      Object.hasOwn(e, s) || (e[s] = !1);
    });
    const t = [];
    for (const s of i(this, ke))
      if (console.log(s), s.tokenType === "variable")
        t.push(e[s.token]);
      else if (s.tokenType === "operation")
        if (s.token === "!")
          if (t.length >= 1) {
            const n = t.pop();
            t.push(!n);
          } else
            return !1;
        else {
          const n = t.pop(), r = t.pop();
          if (n !== void 0 && r !== void 0)
            switch (s.token) {
              case "&":
                t.push(n && r);
                break;
              case "|":
                t.push(n || r);
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
    return i(this, ke);
  }
  get tex() {
    const e = [];
    for (const t of i(this, ke))
      if (t.tokenType === "variable")
        e.push(t);
      else
        switch (t.token) {
          case "&":
            if (e.length >= 2) {
              const s = e.pop(), n = e.pop();
              s && n && (n.tokenType === "mix" && (n.token = `( ${n.token} )`), s.tokenType === "mix" && (s.token = `( ${s.token} )`), e.push({ token: `${n.token} \\cap ${s.token}`, tokenType: "mix" }));
            }
            break;
          case "|":
            if (e.length >= 2) {
              const s = e.pop(), n = e.pop();
              s && n && (n.tokenType === "mix" && (n.token = `( ${n.token} )`), s.tokenType === "mix" && (s.token = `( ${s.token} )`), e.push({ token: `${n.token} \\cup ${s.token}`, tokenType: "mix" }));
            }
            break;
          case "-":
            if (e.length >= 2) {
              const s = e.pop(), n = e.pop();
              s && n && (n.tokenType === "mix" && (n.token = `( ${n.token} )`), s.tokenType === "mix" && (s.token = `( ${s.token} )`), e.push({ token: `${n.token} \\setminus ${s.token}`, tokenType: "mix" }));
            }
            break;
          case "!":
            if (e.length >= 1) {
              const s = e.pop();
              s && e.push({ token: `\\overline{ ${s.token} }`, tokenType: "variable" });
            }
            break;
        }
    return e[0].token;
  }
  get variables() {
    return i(this, ke).filter((e) => e.tokenType === "variable").map((e) => e.token);
  }
  vennAB() {
    return q(this, dt, si).call(this, {
      A: ["A", "AB"],
      B: ["B", "AB"]
    }, ["A", "B", "AB", "E"]);
  }
  vennABC() {
    return q(this, dt, si).call(this, {
      A: ["A", "AB", "AC", "ABC"],
      B: ["B", "AB", "BC", "ABC"],
      C: ["C", "AC", "BC", "ABC"]
    }, ["A", "B", "C", "AB", "AC", "BC", "ABC", "E"]);
  }
}
ke = new WeakMap(), dt = new WeakSet(), si = function(e, t) {
  const s = [];
  let n;
  if (t === void 0) {
    n = /* @__PURE__ */ new Set();
    for (const r in e)
      n = /* @__PURE__ */ new Set([
        ...n,
        ...e[r] ?? []
      ]);
  } else
    n = new Set(t);
  for (const r of i(this, ke))
    if (r.tokenType === "variable")
      e[r.token] === void 0 ? s.push(/* @__PURE__ */ new Set()) : s.push(new Set(e[r.token]));
    else
      switch (r.token) {
        case "&":
          if (s.length >= 2) {
            const l = s.pop(), u = s.pop();
            u && l && s.push(new Set([...u].filter((f) => l.has(f))));
          }
          break;
        case "|":
          if (s.length >= 2) {
            const l = s.pop(), u = s.pop();
            u && l && s.push(/* @__PURE__ */ new Set([...u, ...l]));
          }
          break;
        case "-":
          if (s.length >= 2) {
            const l = s.pop(), u = s.pop();
            u && l && s.push(new Set([...u].filter((f) => !l.has(f))));
          }
          break;
        case "!":
          if (s.length >= 1) {
            const l = s.pop();
            l && s.push(new Set([...n].filter((u) => !l.has(u))));
          }
          break;
      }
  return [...s[0]].sort();
};
const as = {
  Vector: x,
  Point: j,
  Line: D,
  Triangle: ti,
  Circle: vt,
  Line3: bt,
  Plane3: ii
}, cs = {
  Numeric: G,
  Fraction: c,
  Root: pt,
  Monom: k,
  Polynom: O,
  Equation: H,
  Matrix: es,
  LinearSystem: _t,
  Factor: fe,
  PolyFactor: Kt,
  LogicalSet: hs,
  Random: os,
  Geometry: as,
  NumExp: Hi
};
export {
  vt as Circle,
  H as Equation,
  fe as Factor,
  c as Fraction,
  D as Line,
  bt as Line3,
  _t as LinearSystem,
  hs as LogicalSet,
  es as Matrix,
  k as Monom,
  pt as NthRoot,
  Hi as NumExp,
  ii as Plane3,
  j as Point,
  Kt as PolyFactor,
  O as Polynom,
  ti as Triangle,
  x as Vector,
  cs as default
};
