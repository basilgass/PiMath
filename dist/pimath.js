var Ri = Object.defineProperty;
var yi = (o) => {
  throw TypeError(o);
};
var zi = (o, e, t) => e in o ? Ri(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var a = (o, e, t) => zi(o, typeof e != "symbol" ? e + "" : e, t), _t = (o, e, t) => e.has(o) || yi("Cannot " + t);
var s = (o, e, t) => (_t(o, e, "read from private field"), t ? t.call(o) : e.get(o)), p = (o, e, t) => e.has(o) ? yi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), h = (o, e, t, i) => (_t(o, e, "write to private field"), i ? i.call(o, t) : e.set(o, t), t), A = (o, e, t) => (_t(o, e, "access private method"), t);
function Li(o) {
  const e = vi(o), t = [];
  let i, n;
  for (; e.length > 0; )
    i = e.shift() ?? 1, n = (e.length > 0 ? e.pop() : +i) ?? 1, t.push([i, n]);
  return t;
}
function Di(...o) {
  const e = fi(...o);
  return o.map((t) => t / e);
}
function vi(o) {
  const e = Math.abs(o), t = Math.sqrt(e), i = [];
  for (let n = 1; n <= t; n++)
    o % n === 0 && (i.push(n), i.push(e / n));
  return i.sort(function(n, r) {
    return n - r;
  }), [...new Set(i)];
}
function fi(...o) {
  const e = function(n, r) {
    return r === 0 ? n : e(r, n % r);
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
function Vi(...o) {
  return o.reduce(function(e, t) {
    return Math.abs(e * t / fi(e, t));
  });
}
function Zi(o, e = 3) {
  return +o.toFixed(e);
}
function Fi(o) {
  if (Number.isSafeInteger(o) || o.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function ji(o) {
  const e = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return o === void 0 ? e : e.slice(0, Math.min(e.length, o));
}
function Ui(o, e) {
  const t = [], i = e === !0 ? +o : o ** 2;
  for (let n = 0; n <= o; n++)
    for (let r = 0; r <= o; r++)
      n ** 2 + r ** 2 === i && t.push([n, r, o]);
  return t;
}
function Wi(o, e = 2) {
  return +`${Math.round(+`${o}e${e}`)}e-${e}`;
}
const W = {
  decompose: Li,
  dividers: vi,
  divideNumbersByGCD: Di,
  gcd: fi,
  lcm: Vi,
  numberCorrection: Zi,
  periodic: Fi,
  primes: ji,
  pythagoreanTripletsWithTarget: Ui,
  round: Wi
};
var ft, b, w, ze;
const $ = class $ {
  constructor(e, t) {
    p(this, ft, !1);
    p(this, b, 1);
    p(this, w, 1);
    p(this, ze, "frac");
    // ------------------------------------------
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    a(this, "parse", (e, t) => {
      let i;
      if (e === "")
        return h(this, w, 0), h(this, b, 1), this;
      switch (typeof e) {
        case "string":
          if (i = e.split("/"), i.length > 2)
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (i.map((n) => n === "" || isNaN(Number(n))).includes(!0))
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (i.length === 1)
            return this.parse(+i[0]);
          i.length === 2 ? i[1] === "0" ? (h(this, w, NaN), h(this, b, 1)) : (h(this, w, +i[0]), h(this, b, +i[1])) : (h(this, w, NaN), h(this, b, 1));
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
      return e.numerator = +s(this, w), e.denominator = +s(this, b), e;
    });
    a(this, "abs", () => (h(this, w, Math.abs(s(this, w))), h(this, b, Math.abs(s(this, b))), this));
    a(this, "add", (e) => {
      if (e instanceof $) {
        const t = s(this, w), i = s(this, b);
        h(this, w, t * e.denominator + e.numerator * i), h(this, b, i * e.denominator);
      } else
        return this.add(new $(e));
      return this.reduce();
    });
    a(this, "amplify", (e) => (Number.isSafeInteger(e) && (h(this, w, s(this, w) * e), h(this, b, s(this, b) * e)), this));
    // TODO: The rest of the functions are not used or unnecessary ?
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
      switch (e instanceof $ ? i = e.clone() : i = new $(e), t) {
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
      const t = new $(e);
      if (t.numerator === 0)
        return new $().infinite();
      const i = +s(this, w), n = +s(this, b);
      return h(this, w, i * t.denominator), h(this, b, n * t.numerator), this.reduce();
    });
    a(this, "infinite", () => (h(this, w, 1 / 0), h(this, b, 1), this));
    a(this, "invalid", () => (h(this, w, NaN), h(this, b, 1), this));
    a(this, "inverse", () => {
      const e = +s(this, w);
      return h(this, w, +s(this, b)), h(this, b, e), this;
    });
    a(this, "isApproximative", () => s(this, ft) || s(this, w).toString().length >= 15 && s(this, b).toString().length >= 15);
    a(this, "isEqual", (e) => this.compare(e, "="));
    a(this, "isEven", () => this.isRelative() && this.value % 2 === 0);
    a(this, "isExact", () => !this.isApproximative());
    a(this, "isFinite", () => !this.isInfinity() && !this.isNaN());
    a(this, "isGeq", (e) => this.compare(e, ">="));
    a(this, "isGreater", (e) => this.compare(e, ">"));
    a(this, "isInfinity", () => Math.abs(s(this, w)) === 1 / 0);
    a(this, "isInverted", (e) => this.isEqual(new $().one().divide(e.clone())));
    a(this, "isLeq", (e) => this.compare(e, "<="));
    /* Compare shortcuts */
    a(this, "isLesser", (e) => this.compare(e, "<"));
    a(this, "isNaN", () => isNaN(s(this, w)));
    a(this, "isNatural", () => this.isRelative() && this.isPositive());
    a(this, "isNegative", () => this.sign() === -1);
    a(this, "isNegativeOne", () => s(this, w) === -1 && s(this, b) === 1);
    a(this, "isNotEqual", (e) => this.compare(e, "<>"));
    // ------------------------------------------
    a(this, "isNotZero", () => s(this, w) !== 0);
    a(this, "isOdd", () => this.isRelative() && this.value % 2 === 1);
    a(this, "isOne", () => s(this, w) === 1 && s(this, b) === 1);
    a(this, "isOpposite", (e) => this.isEqual(e.clone().opposite()));
    a(this, "isPositive", () => this.sign() === 1);
    a(this, "isRational", () => !this.isRelative());
    a(this, "isReduced", () => Math.abs(W.gcd(s(this, w), s(this, b))) === 1);
    a(this, "isRelative", () => this.clone().reduce().denominator === 1);
    a(this, "isSquare", () => Math.sqrt(s(this, w)) % 1 === 0 && Math.sqrt(s(this, b)) % 1 === 0);
    a(this, "isStrictlyNegative", () => this.value < 0);
    a(this, "isStrictlyPositive", () => this.value > 0);
    // Mathematical operations specific to fractions
    a(this, "isZero", () => s(this, w) === 0);
    a(this, "multiply", (e) => {
      const t = new $(e);
      return h(this, w, s(this, w) * t.numerator), h(this, b, s(this, b) * t.denominator), this.reduce();
    });
    a(this, "one", () => (h(this, w, 1), h(this, b, 1), this));
    a(this, "opposite", () => (h(this, w, -s(this, w)), this));
    a(this, "pow", (e) => {
      if (e instanceof $)
        return this.pow(e.value);
      this.reduce(), e < 0 && this.inverse();
      const t = Math.floor(Math.pow(s(this, w), Math.abs(e))), i = Math.floor(Math.pow(s(this, b), Math.abs(e)));
      return t ** Math.abs(e) === s(this, w) && i ** Math.abs(e) === s(this, b) ? (h(this, w, s(this, w) ** Math.abs(e)), h(this, b, s(this, b) ** Math.abs(e))) : (h(this, w, s(this, w) ** Math.abs(e)), h(this, b, s(this, b) ** Math.abs(e))), this;
    });
    // ------------------------------------------
    a(this, "reduce", () => {
      const e = W.gcd(s(this, w), s(this, b));
      return h(this, w, s(this, w) / e), h(this, b, s(this, b) / e), s(this, b) < 0 && (h(this, b, -s(this, b)), h(this, w, -s(this, w))), this;
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
      const i = Math.floor(Math.pow(s(this, w), Math.abs(1 / e))), n = Math.floor(Math.pow(s(this, b), Math.abs(1 / e)));
      return h(this, w, Math.pow(s(this, w), Math.abs(1 / e))), h(this, b, Math.pow(s(this, b), Math.abs(1 / e))), (i !== s(this, w) || n !== s(this, b)) && (h(this, w, s(this, w) / s(this, b)), h(this, b, 1), h(this, ft, !0)), this.multiply(t), this;
    });
    // ------------------------------------------
    // Getter and setter
    a(this, "sign", () => s(this, w) * s(this, b) >= 0 ? 1 : -1);
    a(this, "sqrt", () => this.root(2));
    a(this, "subtract", (e) => e instanceof $ ? this.add(e.clone().opposite()) : this.add(-e));
    a(this, "zero", () => (h(this, w, 0), h(this, b, 1), this));
    return e !== void 0 && this.parse(e, t), this;
  }
  get denominator() {
    return s(this, b);
  }
  set denominator(e) {
    h(this, b, e);
  }
  get dfrac() {
    return h(this, ze, "dfrac"), this;
  }
  get display() {
    return this.isExact() ? s(this, b) === 1 ? `${s(this, w)}` : `${s(this, w)}/${s(this, b)}` : this.value.toFixed(3);
  }
  get frac() {
    return h(this, ze, "frac"), this;
  }
  // ------------------------------------------
  get numerator() {
    return s(this, w);
  }
  set numerator(e) {
    h(this, w, e);
  }
  // Display getter
  get tex() {
    return this.isInfinity() ? `${this.sign() === 1 ? "+" : "-"}\\infty` : this.isExact() ? s(this, b) === 1 ? `${s(this, w)}` : s(this, w) < 0 ? `-\\${s(this, ze)}{ ${-s(this, w)} }{ ${s(this, b)} }` : `\\${s(this, ze)}{ ${s(this, w)} }{ ${s(this, b)} }` : this.value.toFixed(3);
  }
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get tfrac() {
    return h(this, ze, "tfrac"), this;
  }
  get value() {
    const e = s(this, w) / s(this, b);
    return e === 0 ? 0 : e;
  }
};
ft = new WeakMap(), b = new WeakMap(), w = new WeakMap(), ze = new WeakMap(), a($, "average", (...e) => {
  const t = new $().zero();
  for (const i of e)
    t.add(i);
  return t.divide(e.length), t;
}), a($, "max", (...e) => {
  let t = new $(e[0]);
  for (const i of e) {
    const n = new $(i);
    n.isGreater(t) && (t = n.clone());
  }
  return t;
}), a($, "min", (...e) => {
  let t = new $(e[0]);
  for (const i of e) {
    const n = new $(i);
    n.isLesser(t) && (t = n.clone());
  }
  return t;
}), a($, "sort", (e, t) => {
  const n = e.map((r) => r instanceof $ ? r : new $(r)).sort((r, l) => r.value - l.value);
  return t && n.reverse(), n;
}), // ------------------------------------------
// Compare functions
a($, "unique", (e) => {
  const t = {}, i = [];
  return e.forEach((n) => {
    n instanceof $ || (n = new $(n)), t[n.clone().reduce().tex] || (i.push(n.clone()), t[n.tex] = !0);
  }), i;
}), a($, "xMultiply", (...e) => {
  const t = new $();
  for (const i of e) {
    const n = new $(i);
    t.numerator = t.numerator * n.numerator, t.denominator = t.denominator * n.denominator;
  }
  return t;
});
let u = $;
var Z, te, ne, Ye;
class bt {
  constructor(...e) {
    p(this, Z);
    p(this, te);
    p(this, ne);
    p(this, Ye);
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    a(this, "parse", (e, t, i) => (h(this, ne, i ?? 1), h(this, te, t ?? 2), h(this, Z, e), s(this, te) % 2 === 0 && s(this, Z) < 0 && h(this, Ye, !1), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    a(this, "reduce", () => {
      let e = Math.floor(Math.pow(s(this, Z), 1 / s(this, te)));
      for (; e > 1; ) {
        if (s(this, Z) % Math.pow(e, s(this, te)) === 0) {
          h(this, ne, s(this, ne) * e), h(this, Z, s(this, Z) / Math.pow(e, s(this, te))), e = Math.floor(Math.pow(s(this, Z), 1 / s(this, te)));
          continue;
        }
        e--;
      }
      return this;
    });
    a(this, "multiply", (e) => (h(this, Z, s(this, Z) * e.radical), this.reduce()));
    // ------------------------------------------
    // Help functions
    // ------------------------------------------
    a(this, "hasRadical", () => !(s(this, Z) === 1 || s(this, Z) === 0 || !s(this, Ye)));
    h(this, Z, 1), h(this, ne, 1), h(this, te, 2), h(this, Ye, !0), e.length > 0 && this.parse(e[0], e[1], e[2]);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get radical() {
    return s(this, Z);
  }
  set radical(e) {
    h(this, Z, e);
  }
  get nth() {
    return s(this, te);
  }
  set nth(e) {
    Number.isSafeInteger(e) && e >= 2 ? h(this, te, e) : (console.log("Error setting the nth root"), h(this, te, 2));
  }
  get coefficient() {
    return s(this, ne);
  }
  set coefficient(e) {
    h(this, ne, e);
  }
  get tex() {
    let e;
    return s(this, ne) === 1 ? e = "" : s(this, ne) === -1 ? e = "-" : e = s(this, ne).toString(), s(this, Z) === 1 ? `${s(this, ne)}` : s(this, te) === 2 ? `${e}\\sqrt{${s(this, Z)}}` : `${e}\\sqrt[${s(this, te)}]{${s(this, Z)}}`;
  }
  get display() {
    let e;
    return s(this, ne) === 1 ? e = "" : s(this, ne) === -1 ? e = "-" : e = s(this, ne).toString(), s(this, Z) === 1 ? `${s(this, ne)}` : s(this, te) === 2 ? `${e}sqrt{${s(this, Z)}}` : `${e}root(${s(this, te)}){${s(this, Z)}}`;
  }
  get value() {
    return s(this, ne) * Math.pow(s(this, Z), 1 / s(this, te));
  }
}
Z = new WeakMap(), te = new WeakMap(), ne = new WeakMap(), Ye = new WeakMap();
var fe, je, P, at, ye, bi, ti, xi, Ei, Ni;
const mi = class mi {
  constructor(e, t, i = "x") {
    p(this, P);
    p(this, fe);
    p(this, je);
    if (h(this, je, i), Object.hasOwn(e, "moveLeft")) {
      const n = e;
      h(this, fe, n.left.clone().subtract(n.right));
    } else
      h(this, fe, e.clone().subtract(t ?? 0));
  }
  solve() {
    if (s(this, fe).degree().isOne())
      return A(this, P, xi).call(this);
    if (s(this, fe).degree().value === 2)
      return A(this, P, Ei).call(this);
    const e = A(this, P, bi).call(this);
    if (e.length > 0)
      return e;
    if (s(this, fe).degree().value === 3)
      return A(this, P, ti).call(this);
    throw new Error("The equation degree is too high.");
  }
  solveAsCardan() {
    if (s(this, fe).degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return A(this, P, ti).call(this);
  }
};
fe = new WeakMap(), je = new WeakMap(), P = new WeakSet(), at = function(e, t) {
  return {
    variable: s(this, je),
    exact: !1,
    value: +e.toFixed(10),
    tex: (t == null ? void 0 : t.tex) ?? "",
    display: (t == null ? void 0 : t.display) ?? ""
  };
}, ye = function(e) {
  if (e instanceof u && e.isApproximative())
    return A(this, P, at).call(this, e.value);
  const t = new u(e);
  return {
    variable: s(this, je),
    exact: t,
    value: t.value,
    tex: t.tex,
    display: t.display
  };
}, bi = function() {
  let e = s(this, fe).clone(), t = [];
  const i = e.lcmDenominator();
  i !== 1 && e.multiply(i);
  const n = e.monomByDegree().coefficient;
  let r = e.monomByDegree(0).coefficient;
  for (; r.isZero(); )
    t.length === 0 && t.push(A(this, P, ye).call(this, 0)), e = e.divide("x"), r = e.monomByDegree(0).coefficient;
  const l = W.dividers(n.value), c = W.dividers(r.value);
  for (const f of l)
    for (const g of c) {
      const x = new u(g, f);
      e.evaluate(x).isZero() && !t.find((V) => V.value === x.value) && t.push(A(this, P, ye).call(this, x)), x.opposite(), e.evaluate(x).isZero() && !t.find((V) => V.value === x.value) && t.push(A(this, P, ye).call(this, x));
    }
  for (const f of t) {
    if (f.exact !== !1 && f.exact.isZero())
      continue;
    const g = s(this, fe).clone().parse("x", f.exact.denominator, -f.exact.numerator);
    for (; e.isDividableBy(g); )
      e = e.divide(g);
  }
  if (e.degree().isZero())
    return t.sort((f, g) => f.value - g.value);
  if (e.degree().value > 3)
    return [];
  const d = new mi(e, e.clone().parse("0"), s(this, je));
  return t = t.concat(d.solve()), t.sort((f, g) => f.value - g.value);
}, ti = function() {
  const e = s(this, fe), t = e.monomByDegree(3).coefficient, i = e.monomByDegree(2).coefficient, n = e.monomByDegree(1).coefficient, r = e.monomByDegree(0).coefficient, l = i.clone().divide(t), c = n.clone().divide(t), d = r.clone().divide(t), f = c.clone().subtract(l.clone().pow(2).divide(3)), g = d.clone().subtract(l.clone().multiply(c).divide(3)).add(l.clone().pow(3).multiply(2).divide(27)), x = g.clone().opposite(), V = f.clone().opposite().pow(3).divide(27), pe = x.clone().pow(2).subtract(V.clone().multiply(4)).opposite();
  if (pe.isNegative()) {
    const le = g.clone().opposite().add(pe.clone().opposite().sqrt()).divide(2).root(3), ce = g.clone().opposite().subtract(pe.clone().opposite().sqrt()).divide(2).root(3), ge = le.clone().add(ce).subtract(l.clone().divide(3));
    return [A(this, P, ye).call(this, ge)];
  }
  if (pe.isZero()) {
    const le = g.clone().opposite().divide(2).root(3), ce = le.clone().opposite().subtract(l.clone().divide(3)), ge = le.clone().multiply(2).subtract(l.clone().divide(3));
    return ce.isEqual(ge) ? [A(this, P, ye).call(this, ce)] : [
      A(this, P, ye).call(this, ge),
      A(this, P, ye).call(this, ce)
    ].sort((me, ue) => me.value - ue.value);
  }
  if (pe.isPositive()) {
    const le = [], ce = f.value, ge = g.value, me = l.value;
    for (let ue = 0; ue < 3; ue++)
      le.push(2 * Math.sqrt(-ce / 3) * Math.cos(Math.acos(3 * ge / (2 * ce) * Math.sqrt(-3 / ce)) / 3 + 2 * Math.PI * ue / 3) - me / 3);
    return le.map((ue) => A(this, P, at).call(this, ue)).sort((ue, rt) => ue.value - rt.value);
  }
  return [];
}, xi = function() {
  const e = s(this, fe).monomByDegree(0).coefficient.clone().opposite().divide(s(this, fe).monomByDegree(1).coefficient);
  return [
    A(this, P, ye).call(this, e)
  ];
}, Ei = function() {
  const e = s(this, fe), t = e.monomByDegree(2).coefficient, i = e.monomByDegree(1).coefficient, n = e.monomByDegree(0).coefficient, r = i.clone().pow(2).subtract(t.clone().multiply(n).multiply(4));
  if (r.isNegative())
    return [];
  if (r.isSquare()) {
    const l = r.sqrt(), c = i.clone().opposite().add(l).divide(t.clone().multiply(2)), d = i.clone().opposite().subtract(l).divide(t.clone().multiply(2));
    return l.isZero() ? [A(this, P, ye).call(this, c)] : [
      A(this, P, ye).call(this, c),
      A(this, P, ye).call(this, d)
    ].sort((f, g) => f.value - g.value);
  }
  return A(this, P, Ni).call(this, t, i, r);
}, Ni = function(e, t, i) {
  const n = W.dividers(i.value).filter((me) => Math.sqrt(me) % 1 === 0).map((me) => Math.sqrt(me)).pop() ?? 1, r = W.gcd(2 * e.value, t.value, n) * (e.isNegative() ? -1 : 1), l = t.clone().divide(r).opposite(), c = e.clone().divide(r).multiply(2), d = i.clone().divide(n ** 2), f = Math.abs(n / r), g = n === 1 ? "-" : `-${f} `, x = n === 1 ? "+" : `+${f} `;
  function V(me, ue, rt, Jt) {
    return `\\frac{ ${ue} ${rt}\\sqrt{ ${Jt} } }{ ${me} }`;
  }
  function pe(me, ue, rt, Jt) {
    return `(${ue}${rt}sqrt(${Jt}))/${me}`;
  }
  const le = i.value ** 0.5, ce = (-t.value - le) / (2 * e.value), ge = (-t.value + le) / (2 * e.value);
  return [
    A(this, P, at).call(this, ce, {
      tex: V(c.tex, l.tex, g.toString(), d.tex),
      display: pe(c.display, l.display, g.toString(), d.display)
    }),
    A(this, P, at).call(this, ge, {
      tex: V(c.tex, l.tex, x.toString(), d.tex),
      display: pe(c.display, l.display, x.toString(), d.display)
    })
  ].sort((me, ue) => me.value - ue.value);
};
let Ot = mi;
var Gi = Object.defineProperty, Oi = (o) => {
  throw TypeError(o);
}, Hi = (o, e, t) => e in o ? Gi(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, ei = (o, e, t) => Hi(o, typeof e != "symbol" ? e + "" : e, t), Ti = (o, e, t) => e.has(o) || Oi("Cannot " + t), ee = (o, e, t) => (Ti(o, e, "read from private field"), t ? t.call(o) : e.get(o)), ot = (o, e, t) => e.has(o) ? Oi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), xe = (o, e, t, i) => (Ti(o, e, "write to private field"), e.set(o, t), t);
const di = {
  pi: Math.PI,
  e: Math.exp(1)
};
var m = /* @__PURE__ */ ((o) => (o.VARIABLE = "variable", o.COEFFICIENT = "coefficient", o.OPERATION = "operation", o.CONSTANT = "constant", o.FUNCTION = "function", o.FUNCTION_ARGUMENT = "function-argument", o.MONOM = "monom", o.LEFT_PARENTHESIS = "(", o.RIGHT_PARENTHESIS = ")", o))(m || {}), Fe = /* @__PURE__ */ ((o) => (o.EXPRESSION = "expression", o.POLYNOM = "polynom", o.SET = "set", o.NUMERIC = "numeric", o))(Fe || {});
function Xi(o, e) {
  if (o.length <= 1)
    return o;
  const t = Object.keys(e).filter((x) => e[x].type === m.FUNCTION).map((x) => x);
  t.sort((x, V) => V.length - x.length);
  const i = new RegExp(`^(${t.join("|")})\\(`), n = Object.keys(di);
  n.sort((x, V) => V.length - x.length);
  const r = new RegExp(`^(${n.join("|")})`), l = /^(\d+(\.\d+)?)/;
  let c = "", d, f, g;
  for (; o.length > 0; ) {
    if (d = f, g = void 0, t.length > 0 && i.exec(o)) {
      const x = t.find((V) => o.startsWith(V));
      x && (g = x + "(", o = o.slice(x.length + 1), f = m.FUNCTION);
    } else if (n.length > 0 && r.exec(o)) {
      const x = n.find((V) => o.startsWith(V));
      x && (g = x, o = o.slice(x.length), f = m.CONSTANT);
    } else if (l.exec(o)) {
      const x = l.exec(o);
      x && (g = x[0], o = o.slice(x[0].length), f = m.COEFFICIENT);
    } else
      switch (g = o[0], o = o.slice(1), g) {
        case "(":
          f = m.LEFT_PARENTHESIS;
          break;
        case ")":
          f = m.RIGHT_PARENTHESIS;
          break;
        case ",":
          f = m.FUNCTION_ARGUMENT;
          break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
          f = m.OPERATION;
          break;
        default:
          f = m.VARIABLE;
      }
    if (g === void 0 || f === void 0)
      throw new Error("The token is undefined");
    c += Yi(d, f), c += g;
  }
  return c;
}
function Yi(o, e) {
  return o === void 0 || o === m.OPERATION || e === m.OPERATION || o === m.LEFT_PARENTHESIS || o === m.FUNCTION || o === m.FUNCTION_ARGUMENT || e === m.RIGHT_PARENTHESIS || e === m.FUNCTION_ARGUMENT ? "" : "*";
}
const Qi = {
  "^": { precedence: 4, associative: "right", type: m.OPERATION },
  "*": { precedence: 3, associative: "left", type: m.OPERATION },
  "/": { precedence: 3, associative: "left", type: m.OPERATION },
  "+": { precedence: 2, associative: "left", type: m.OPERATION },
  "-": { precedence: 2, associative: "left", type: m.OPERATION }
}, Ki = {
  "^": { precedence: 4, associative: "right", type: m.OPERATION },
  "*": { precedence: 3, associative: "left", type: m.OPERATION },
  "/": { precedence: 3, associative: "left", type: m.OPERATION },
  "+": { precedence: 2, associative: "left", type: m.OPERATION },
  "-": { precedence: 2, associative: "left", type: m.OPERATION },
  "%": { precedence: 3, associative: "right", type: m.OPERATION },
  sin: { precedence: 4, associative: "right", type: m.FUNCTION },
  cos: { precedence: 4, associative: "right", type: m.FUNCTION },
  tan: { precedence: 4, associative: "right", type: m.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: m.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: m.FUNCTION },
  ",": { precedence: 2, associative: "left", type: m.FUNCTION_ARGUMENT }
}, Ji = {
  "^": { precedence: 4, associative: "right", type: m.OPERATION },
  "*": { precedence: 3, associative: "left", type: m.OPERATION },
  "/": { precedence: 3, associative: "left", type: m.OPERATION },
  "+": { precedence: 2, associative: "left", type: m.OPERATION },
  "-": { precedence: 2, associative: "left", type: m.OPERATION },
  "%": { precedence: 3, associative: "right", type: m.OPERATION },
  sin: { precedence: 4, associative: "right", type: m.FUNCTION },
  cos: { precedence: 4, associative: "right", type: m.FUNCTION },
  tan: { precedence: 4, associative: "right", type: m.FUNCTION },
  sqrt: { precedence: 4, associative: "right", type: m.FUNCTION },
  nthrt: { precedence: 4, associative: "right", type: m.FUNCTION },
  ln: { precedence: 4, associative: "right", type: m.FUNCTION },
  log: { precedence: 4, associative: "right", type: m.FUNCTION }
}, _i = {
  "&": { precedence: 3, associative: "left", type: m.OPERATION },
  "|": { precedence: 3, associative: "left", type: m.OPERATION },
  "!": { precedence: 4, associative: "right", type: m.OPERATION },
  "-": { precedence: 2, associative: "left", type: m.OPERATION }
};
var He, lt, se, xt, Ve;
class Kt {
  constructor(e) {
    ot(this, He), ot(this, lt, []), ot(this, se, {}), ot(this, xt, []), ot(this, Ve), xe(this, He, typeof e > "u" ? Fe.POLYNOM : e), this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return ee(this, lt);
  }
  get rpnToken() {
    return ee(this, lt).map((e) => e.token);
  }
  tokenConfigInitialization() {
    return ee(this, He) === Fe.SET ? (xe(this, se, _i), xe(this, Ve, !1)) : ee(this, He) === Fe.NUMERIC ? (xe(this, se, Ji), xe(this, Ve, !0)) : ee(this, He) === Fe.EXPRESSION ? (xe(this, se, Ki), xe(this, Ve, !0)) : (xe(this, se, Qi), xe(this, Ve, !0)), xe(this, xt, Object.keys(ee(this, se)).sort((e, t) => t.length - e.length)), ee(this, se);
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(e, t) {
    let i, n;
    if (i = "", n = void 0, e[t] === "(")
      i = "(", n = m.LEFT_PARENTHESIS;
    else if (e[t] === ")")
      i = ")", n = m.RIGHT_PARENTHESIS;
    else if (e[t] === ",")
      i = ",", n = m.FUNCTION_ARGUMENT;
    else {
      for (const r of ee(this, xt))
        if (e.substring(t, t + r.length) === r) {
          i += r, n = ee(this, se)[r].type;
          break;
        }
      for (const r in di)
        if (e.substring(t, t + r.length) === r) {
          i += r, n = m.CONSTANT;
          break;
        }
      if (i === "")
        if (/[0-9.]/.exec(e[t])) {
          const r = /^([0-9.]+)/.exec(e.substring(t));
          i = r ? r[0] : "", n = m.COEFFICIENT;
        } else if (/[a-zA-Z]/.exec(e[t])) {
          const r = /^([a-zA-Z])/.exec(e.substring(t));
          i = r ? r[0] : "", n = m.VARIABLE;
        } else
          console.log("Unidentified token", e[t], e, t), i = e[t], n = m.MONOM;
    }
    if (n === void 0)
      throw new Error(`Token type is undefined for token ${i}`);
    return [i, t + i.length, n];
  }
  /**
   * Parse an expression using the shutting yard tree algorithms
   * @param expr (string) Expression to analyse
   * Returns a RPN list of items.
   * @param uniformize
   */
  parse(e, t) {
    const i = [], n = [];
    let r = "", l = 0, c;
    (t ?? ee(this, Ve)) && (e = Xi(e, ee(this, se)));
    const d = 50;
    let f = 50, g;
    for (; l < e.length; ) {
      if (f--, f === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([r, l, c] = this.NextToken(e, l), c) {
        case m.MONOM:
        case m.COEFFICIENT:
        case m.VARIABLE:
        case m.CONSTANT:
          i.push({
            token: r,
            tokenType: c
          });
          break;
        case m.OPERATION:
          if (n.length > 0) {
            let x = n[n.length - 1];
            for (g = +d; x.token in ee(this, se) && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (ee(this, se)[r].associative === "left" && ee(this, se)[r].precedence <= ee(this, se)[x.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            ee(this, se)[r].associative === "right" && ee(this, se)[r].precedence < ee(this, se)[x.token].precedence); ) {
              if (g--, g === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (i.push(n.pop() ?? { token: "", tokenType: m.OPERATION }), n.length === 0)
                break;
              x = n[n.length - 1];
            }
          }
          n.push({ token: r, tokenType: c });
          break;
        case m.FUNCTION_ARGUMENT:
          for (g = +d; n[n.length - 1].token !== "(" && n.length > 0; ) {
            if (g--, g === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            i.push(n.pop() ?? { token: r, tokenType: c });
          }
          break;
        case m.LEFT_PARENTHESIS:
          n.push({ token: r, tokenType: c }), e[l] === "-" && i.push({ token: "0", tokenType: m.COEFFICIENT });
          break;
        case m.RIGHT_PARENTHESIS:
          for (g = +d; n[n.length - 1].token !== "(" && n.length > 1; ) {
            if (g--, g === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
              break;
            }
            i.push(n.pop() ?? { token: r, tokenType: c });
          }
          n.pop();
          break;
        case m.FUNCTION:
          n.push({ token: r, tokenType: c });
          break;
        default:
          throw new Error(`Token type ${r} is not handled`);
      }
    }
    return xe(this, lt, i.concat(n.reverse())), this;
  }
}
He = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap();
class es {
  constructor(e, t) {
    ei(this, "_rpn"), ei(this, "_expression"), ei(this, "_isValid"), this._expression = e;
    try {
      this._rpn = new Kt(Fe.NUMERIC).parse(e, t).rpn;
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
      if (i.tokenType === m.COEFFICIENT)
        if (!isNaN(+i.token))
          t.push(+i.token);
        else {
          const n = i.token.split("/");
          if (n.length !== 2)
            throw this._isValid = !1, new Error("This coefficient is not a fraction");
          t.push(+n[0] / +n[1]);
        }
      else if (i.tokenType === m.VARIABLE && e !== void 0)
        Object.hasOwn(e, i.token) && t.push(+e[i.token]);
      else if (i.tokenType === m.CONSTANT)
        t.push(di[i.token]);
      else if (i.tokenType === m.OPERATION) {
        if (i.token === "*") {
          const n = t.pop(), r = t.pop();
          if (r === void 0 || n === void 0)
            throw this._isValid = !1, new Error(`The multiplication factors ${r ?? "a"} or ${n ?? "b"} are not defined`);
          t.push(r * n);
        } else if (i.token === "/") {
          const n = t.pop(), r = t.pop();
          if (r === void 0 || n === void 0)
            throw this._isValid = !1, new Error(`The division values ${r ?? "a"} or ${n ?? "b"} are not defined`);
          t.push(r / n);
        } else if (i.token === "+") {
          const n = t.pop(), r = t.pop();
          if (r === void 0 || n === void 0)
            throw this._isValid = !1, new Error(`The addition values ${r ?? "a"} or ${n ?? "b"} are not defined`);
          t.push(+r + +n);
        } else if (i.token === "-") {
          const n = t.pop(), r = t.pop() ?? 0;
          if (n === void 0)
            throw this._isValid = !1, new Error("The subtraction value b is  not defined");
          t.push(r - n);
        } else if (i.token === "^") {
          const n = t.pop(), r = t.pop();
          if (r === void 0 || n === void 0)
            throw this._isValid = !1, new Error(`The base value ${r ?? "a"} or exponent ${n ?? "b"} are not defined`);
          t.push(Math.pow(r, n));
        }
      } else if (i.tokenType === m.FUNCTION) {
        const n = t.pop();
        if (n === void 0)
          throw this._isValid = !1, new Error(`The parameters for ${i.token} is not defined`);
        if (i.token === "sin")
          t.push(Math.sin(n));
        else if (i.token === "cos")
          t.push(Math.cos(n));
        else if (i.token === "tan")
          t.push(Math.tan(n));
        else if (i.token === "sqrt")
          t.push(Math.sqrt(n));
        else if (i.token === "nthrt") {
          const r = t.pop();
          if (r === void 0)
            throw this._isValid = !1, new Error("The nthrt function requires two parameters");
          n % 2 === 0 && r < 0 ? t.push(NaN) : t.push((r < 0 ? -1 : 1) * Math.pow(Math.abs(r), 1 / n));
        } else i.token === "ln" ? t.push(Math.log(n)) : i.token === "log" && t.push(Math.log10(n));
      }
    if (t.length === 1)
      return this._numberCorrection(t[0]);
    throw new Error(`There was a problem parsing: ${this._expression}`);
  }
  _numberCorrection(e, t = 8) {
    return +e.toFixed(t);
  }
}
var O, v, Qe, Et, Le, Mt, kt;
const I = class I {
  constructor(e) {
    p(this, Qe);
    p(this, O);
    p(this, v);
    /**
     * Clone the current Monom.
     */
    a(this, "clone", () => {
      const e = new I();
      e.coefficient = s(this, O).clone();
      for (const t in s(this, v))
        e.setLetter(t, s(this, v)[t].clone());
      return e;
    });
    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    a(this, "add", (...e) => {
      for (const t of e) {
        const i = t instanceof I ? t : new I(t);
        this.isSameAs(i) ? (this.isZero() && A(this, Qe, Et).call(this, i), s(this, O).add(i.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", i.display);
      }
      return this;
    });
    a(this, "containsRationalPower", () => Object.values(s(this, v)).some((e) => e.isRational()));
    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    a(this, "degree", (e) => this.variables.length === 0 ? new u().zero() : e === void 0 ? Object.values(s(this, v)).reduce((t, i) => t.clone().add(i)) : this.hasVariable(e) ? s(this, v)[e].clone() : new u().zero());
    /**
     * Derivative the monom
     * @param letter
     */
    a(this, "derivative", (e) => {
      if (e === void 0 && (e = "x"), this.hasVariable(e)) {
        const t = s(this, v)[e].clone(), i = this.clone();
        return s(i, v)[e].subtract(1), s(i, O).multiply(new u(t.clone())), i;
      } else
        return new I().zero();
    });
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    a(this, "divide", (...e) => {
      for (const t of e) {
        const i = t instanceof I ? t : new I(t);
        s(this, O).divide(i.coefficient);
        for (const n in i.literal)
          s(this, v)[n] = this.hasVariable(n) ? s(this, v)[n].subtract(i.literal[n]) : i.literal[n].clone().opposite(), s(this, v)[n].isZero() && this.removeVariable(n);
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
        if (e instanceof u)
          return s(this, Le).call(this, e.value);
        if (e instanceof bt)
          return new u().invalid();
        if (typeof e == "number")
          return s(this, Le).call(this, e);
        if (typeof e == "object") {
          const n = {};
          for (const r in e)
            n[r] = new u(e[r]).value;
          return s(this, Le).call(this, n);
        }
      }
      const i = this.coefficient.clone();
      if (typeof e == "number" || e instanceof u) {
        const n = {};
        return n[this.variables[0]] = new u(e), this.evaluate(n);
      }
      if (e instanceof bt)
        return new u().invalid();
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient;
        for (const n in s(this, v)) {
          const r = new u(e[n]);
          i.multiply(r.pow(s(this, v)[n]));
        }
      }
      return i;
    });
    // -------------------------------------
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    a(this, "hasVariable", (e) => Object.hasOwn(s(this, v), e ?? "x"));
    a(this, "inverse", () => {
      s(this, O).opposite();
      for (const e in s(this, v))
        s(this, v)[e].opposite();
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
    a(this, "isEqual", (e) => this.isSameAs(e) && s(this, O).isEqual(e.coefficient));
    a(this, "isLiteralSquare", () => {
      for (const e in this.literal)
        if (this.literal[e].isRational() || this.literal[e].isEven())
          return !1;
      return !0;
    });
    /**
     * Determine if the monom is one
     */
    a(this, "isOne", () => s(this, O).value === 1 && this.variables.length === 0);
    /**
     * Determine if two monoms are similar
     * @param M
     */
    a(this, "isSameAs", (e) => {
      const t = this.variables, i = e.variables, n = t.concat(i.filter((r) => !t.includes(r)));
      if (this.isZero() || e.isZero() || t.length === 0 && i.length === 0)
        return !0;
      if (t.length !== i.length)
        return !1;
      if (!this.isZero() && !e.isZero()) {
        for (const r of n)
          if (!this.hasVariable(r) || !e.hasVariable(r) || !s(this, v)[r].isEqual(e.literal[r]))
            return !1;
      }
      return !0;
    });
    a(this, "isSquare", () => this.coefficient.isSquare() ? this.isLiteralSquare() : !1);
    /**
     * Determine if the monom is null
     */
    a(this, "isZero", () => s(this, O).value === 0);
    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    a(this, "multiply", (...e) => {
      for (const t of e) {
        const i = t instanceof I ? t : new I(t);
        s(this, O).multiply(i.coefficient);
        for (const n in i.literal)
          this.hasVariable(n) ? s(this, v)[n].add(i.literal[n]) : s(this, v)[n] = i.literal[n].clone();
      }
      return this;
    });
    /**
     * Create a one value monom
     */
    a(this, "one", () => (h(this, O, new u().one()), h(this, v, {}), this));
    /**
     * Get the opposite
     * Returns a monom.
     */
    a(this, "opposite", () => (s(this, O).opposite(), this));
    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    a(this, "pow", (e) => {
      s(this, O).pow(e);
      for (const t in s(this, v))
        s(this, v)[t].multiply(e);
      return this;
    });
    a(this, "primitive", (e) => {
      e === void 0 && (e = "x");
      const t = this.clone();
      let i;
      return t.hasVariable(e) ? (i = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(i), t.setLetter(e, i)) : (t.coefficient.isZero() && (t.coefficient = new u().one()), t.setLetter(e, 1)), t;
    });
    a(this, "reduce", () => {
      this.coefficient.reduce();
      for (const e in s(this, v))
        s(this, v)[e].isZero() && this.removeVariable(e);
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
    a(this, "setLetter", (e, t) => t instanceof u ? (this.hasVariable(e) && t.isZero() && this.removeVariable(e), s(this, v)[e] = t.clone(), this) : this.setLetter(e, new u(t)));
    /**
     * Return the square root of a monom
     */
    a(this, "sqrt", () => {
      if (this.isSquare()) {
        s(this, O).sqrt();
        for (const e in s(this, v))
          s(this, v)[e].clone().divide(2);
      }
      return this;
    });
    /**
     * Subtract multiple monoms
     * @param M (Monom[]) The monoms to subtract
     */
    a(this, "subtract", (...e) => {
      for (const t of e) {
        const i = t instanceof I ? t : new I(t);
        this.isSameAs(i) ? (this.isZero() && A(this, Qe, Et).call(this, i), s(this, O).add(i.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", i.display);
      }
      return this;
    });
    /**
     * Create a zero value monom
     */
    a(this, "zero", () => (h(this, O, new u().zero()), h(this, v, {}), this));
    p(this, Le, (e) => {
      let t = this.coefficient.value;
      if (typeof e == "number") {
        const i = {}, n = this.variables[0];
        return i[n] = e, s(this, Le).call(this, i);
      }
      if (e instanceof u) {
        const i = {};
        return i[this.variables[0]] = new u(e).value, s(this, Le).call(this, i);
      }
      if (e instanceof bt)
        return NaN;
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient.value;
        for (const i in s(this, v)) {
          const n = e[i];
          n instanceof u ? t *= n.value ** s(this, v)[i].value : t *= n ** s(this, v)[i].value;
        }
      }
      return t;
    });
    p(this, Mt, (e) => {
      const i = new Kt().parse(e).rpn, n = [];
      if (i.length === 0)
        return this.zero(), this;
      if (i.length === 1) {
        const r = i[0];
        return this.one(), r.tokenType === m.COEFFICIENT ? this.coefficient = new u(r.token) : r.tokenType === m.VARIABLE && this.setLetter(r.token, 1), this;
      } else
        for (const r of i)
          s(this, kt).call(this, n, r);
      return this.one(), this.multiply(n[0]), this;
    });
    p(this, kt, (e, t) => {
      var d;
      let i, n, r, l, c;
      if (t.tokenType === m.COEFFICIENT)
        e.push(new I(new u(t.token)));
      else if (t.tokenType === m.VARIABLE) {
        const f = new I().one();
        f.setLetter(t.token, 1), e.push(f.clone());
      } else if (t.tokenType === m.OPERATION)
        switch (t.token) {
          case "-":
            n = e.pop() ?? new I().zero(), i = e.pop() ?? new I().zero(), e.push(i.subtract(n));
            break;
          case "*":
            n = e.pop() ?? new I().one(), i = e.pop() ?? new I().one(), e.push(i.multiply(n));
            break;
          case "/":
            n = e.pop() ?? new I().one(), i = e.pop() ?? new I().one(), e.push(i.divide(n));
            break;
          case "^": {
            c = ((d = e.pop()) == null ? void 0 : d.coefficient) ?? new u().one(), r = e.pop() ?? new I().one(), l = r.variables[0], l && r.setLetter(l, c), e.push(r);
            break;
          }
        }
    });
    return h(this, O, new u().zero()), h(this, v, {}), e !== void 0 && this.parse(e), this;
  }
  // -----------------------------------------
  /**
   * Parse a string to a monom. The string may include fraction.
   * @param inputStr
   */
  parse(e) {
    return h(this, O, new u()), h(this, v, {}), typeof e == "string" ? s(this, Mt).call(this, e) : typeof e == "number" ? h(this, O, new u(e)) : e instanceof u ? h(this, O, e.clone()) : e instanceof I && (h(this, O, s(e, O).clone()), A(this, Qe, Et).call(this, e)), this;
  }
  /**
   * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
   * @returns {Fraction}
   */
  get coefficient() {
    return s(this, O);
  }
  /**
   * Set the coefficient \\(k\\) value of the monom
   * @param {Fraction | number | string} F
   */
  set coefficient(e) {
    h(this, O, new u(e));
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
    return e === "" ? s(this, O).value != 0 ? s(this, O).display : "" : s(this, O).value === 1 ? e : s(this, O).value === -1 ? `-${e}` : s(this, O).value === 0 ? "0" : `${s(this, O).display}${e}`;
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
    for (const n in this.literal)
      t = this._getLiteralDividers(t, n);
    const i = [];
    if (t.length > 0 && e.length > 0)
      for (const n of e)
        for (const r of t) {
          const l = new I();
          l.coefficient = new u(n), l.literal = r, i.push(l);
        }
    else if (e.length === 0)
      for (const n of t) {
        const r = new I();
        r.coefficient = new u().one(), r.literal = n, i.push(r);
      }
    else
      for (const n of e) {
        const r = new I();
        r.coefficient = new u(n), i.push(r);
      }
    return i.length === 0 ? [new I().one()] : i;
  }
  integrate(e, t, i) {
    const n = this.primitive(i);
    return n.evaluate(t).subtract(n.evaluate(e));
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
    return e === "" ? s(this, O).value != 0 ? s(this, O).display : "" : s(this, O).value === 1 ? e : s(this, O).value === -1 ? `-${e}` : s(this, O).value === 0 ? "0" : `${s(this, O).display}*${e}`;
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
    return e === "" ? s(this, O).value != 0 ? s(this, O).frac.tex : "0" : s(this, O).value === 1 ? e : s(this, O).value === -1 ? `-${e}` : s(this, O).value === 0 ? "0" : `${s(this, O).frac.tex}${e}`;
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
    for (let n = 0; n <= this.literal[t].value; n++)
      if (e.length === 0) {
        const r = {};
        r[t] = new u(n), i.push(r);
      } else
        for (const r of e) {
          const l = {};
          for (const c in r)
            l[c] = r[c];
          l[t] = new u(n), i.push(l);
        }
    return i;
  }
};
O = new WeakMap(), v = new WeakMap(), Qe = new WeakSet(), Et = function(e) {
  for (const t in e.literal)
    s(this, v)[t] = e.literal[t].clone();
}, Le = new WeakMap(), Mt = new WeakMap(), kt = new WeakMap(), a(I, "gcd", (...e) => {
  for (const r of e)
    if (r.containsRationalPower())
      return new I().zero();
  const t = new I(), i = W.gcd(...e.map((r) => r.coefficient.numerator)), n = W.lcm(...e.map((r) => r.coefficient.denominator));
  t.coefficient = new u(i, n).reduce();
  for (const r of e) {
    for (const l in t.literal)
      l in r.literal || t.literal[l].zero();
    for (const l in r.literal)
      !t.hasVariable(l) && r.literal[l].isStrictlyPositive() ? t.literal[l] = r.literal[l].clone() : t.literal[l] = new u(Math.min(r.literal[l].value, t.literal[l].value));
  }
  return t;
}), /**
 * Multiply two monoms and return a NEW monom.
 * @param monoms
 */
a(I, "xMultiply", (...e) => {
  const t = new I().one();
  for (const i of e)
    t.multiply(i);
  return t;
});
let k = I;
function wi(o, e = !0) {
  return e ? `\\left( ${o} \\right)` : `(${o})`;
}
function Re(o, e, t, i, n) {
  return o.map((r, l) => i !== void 0 && l < i || n !== void 0 && l > n ? r : r === e ? t : r);
}
var Ue, y, Ke, dt, Je, pt, Ct, $t, It, _e, Pt, mt, Bt, St, Rt, zt, Ai, Lt, Dt;
const C = class C {
  constructor(e, ...t) {
    p(this, zt);
    p(this, Ue);
    p(this, y);
    p(this, Ke);
    p(this, dt, !1);
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values
     */
    a(this, "parse", (e, ...t) => {
      if (h(this, y, []), h(this, Ue, []), typeof e == "string")
        return A(this, zt, Ai).call(this, e, ...t);
      if ((typeof e == "number" || e instanceof u || e instanceof k) && t.length === 0)
        s(this, y).push(new k(e));
      else if (e instanceof k && t.length > 0)
        s(this, y).push(new k(e)), t.forEach((i) => {
          s(this, y).push(new k(i));
        });
      else if (e instanceof C)
        for (const i of e.monoms)
          s(this, y).push(i.clone());
      return this;
    });
    /**
     * Clone the polynom
     */
    a(this, "clone", () => {
      const e = new C(), t = [];
      for (const i of s(this, y))
        t.push(i.clone());
      return e.monoms = t, e;
    });
    a(this, "add", (...e) => {
      for (const t of e)
        t instanceof C ? h(this, y, s(this, y).concat(t.monoms)) : t instanceof k ? s(this, y).push(t.clone()) : typeof t == "number" && Number.isSafeInteger(t) ? s(this, y).push(new k(t.toString())) : s(this, y).push(new k(t));
      return this.reduce();
    });
    a(this, "commonMonom", () => {
      const e = new k().one(), t = this.gcdNumerator(), i = this.gcdDenominator(), n = this.degree();
      e.coefficient = new u(t, i);
      for (const r of this.variables) {
        e.setLetter(r, n);
        for (const l of s(this, y))
          if (e.setLetter(r, u.min(l.degree(r), e.degree(r))), e.degree(r).isZero())
            break;
      }
      return e;
    });
    a(this, "degree", (e) => {
      let t = new u().zero();
      for (const i of s(this, y))
        t = u.max(i.degree(e).value, t);
      return t;
    });
    a(this, "derivative", (e) => {
      const t = new C();
      for (const i of s(this, y))
        t.add(i.derivative(e));
      return t;
    });
    a(this, "divide", (e) => {
      if (e instanceof u)
        return s(this, pt).call(this, e);
      if (typeof e == "number" && Number.isSafeInteger(e))
        return s(this, Ct).call(this, e);
      if (e instanceof k)
        return this.divide(new C(e));
      if (e instanceof C) {
        if (e.monoms.length === 1 && e.variables.length === 0)
          return s(this, pt).call(this, e.monoms[0].coefficient);
        {
          const { quotient: t, reminder: i } = this.euclidean(e);
          if (i.isZero())
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
      const t = e.variables[0], i = new C().zero(), n = this.clone().reorder(t);
      if (e.variables.length === 0)
        return {
          quotient: this.clone().divide(e).reduce(),
          reminder: new C().zero()
        };
      const r = e.monomByDegree(void 0, t), l = e.degree(t);
      let c, d = this.degree(t).value * 2;
      for (; n.degree(t).isGeq(l) && d > 0 && (d--, c = n.monomByDegree(void 0, t).clone().divide(r), !(!c.isZero() && (i.add(c), n.subtract(e.clone().multiply(c)).reduce(), c.degree(t).isZero()))); )
        ;
      return i.reduce(), n.reduce(), { quotient: i, reminder: n };
    });
    a(this, "evaluate", (e, t) => {
      if (t)
        return s(this, $t).call(this, e);
      const i = new u().zero();
      return s(this, y).forEach((n) => {
        i.add(n.evaluate(e, t));
      }), i;
    });
    // -------------------------------------
    /**
     * Factorize a polynom and store the best results in factors.
     * @param letter
     */
    a(this, "factorize", (e) => {
      let t = [], i = this.clone().reorder();
      const n = i.commonMonom();
      if (i.monomByDegree().coefficient.isStrictlyNegative() && n.coefficient.isStrictlyPositive() && !n.isOne() && n.opposite(), !n.isOne()) {
        const c = new C(n);
        t = [c.clone()], i = i.euclidean(c).quotient;
      }
      let r = i.degree().clone().multiply(2).value, l = 1;
      for (; r >= 0; )
        if (r--, i.monoms.length < 2) {
          i.isOne() || (t.push(i.clone()), i.one());
          break;
        } else if (i.degree(e).isOne()) {
          t.push(i.clone()), i.one();
          break;
        } else {
          let c = s(this, Pt).call(this, i, l, e ?? "x");
          for (l = i.degree(e).value; c.length > 0; ) {
            const d = c[0];
            if (!i.isDividableBy(d))
              c.shift();
            else {
              const f = i.euclidean(d);
              t.push(d), i = f.quotient.clone(), c = c.filter((g) => {
                const x = i.monoms[0], V = i.monoms[i.monoms.length - 1], pe = g.monoms[0], le = g.monoms[g.monoms.length - 1];
                return V.isDivisible(le) ? x.isDivisible(pe) : !1;
              });
            }
          }
        }
      return i.isOne() || t.push(i.clone()), h(this, Ue, t), s(this, Ue);
    });
    a(this, "gcdDenominator", () => W.gcd(...this.getDenominators()));
    a(this, "gcdNumerator", () => W.gcd(...this.getNumerators()));
    // Next functions are used for for commonMonom, which is used in the factorize method.
    a(this, "getDenominators", () => {
      const e = [];
      for (const t of s(this, y))
        e.push(t.coefficient.denominator);
      return e;
    });
    a(this, "getNumerators", () => {
      const e = [];
      for (const t of s(this, y))
        e.push(t.coefficient.numerator);
      return e;
    });
    a(this, "getZeroes", () => this.degree().isZero() ? [] : (this.roots = new Ot(this.clone()).solve(), this.roots));
    a(this, "integrate", (e, t, i = "x") => {
      const n = this.primitive(i), r = {}, l = {};
      return r[i] = new u(e), l[i] = new u(t), n.evaluate(l).subtract(n.evaluate(r));
    });
    a(this, "isDeveloped", (e) => {
      let t;
      const i = e.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
      if (i.includes("(") || i.includes(")"))
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
        return t.exact instanceof u ? this.evaluate(t.exact).isZero() : !1;
      } else {
        const { reminder: t } = this.euclidean(e);
        return t.isZero();
      }
    });
    a(this, "isEqual", (e) => s(this, Je).call(this, e, "="));
    a(this, "isOppositeAt", (e) => s(this, Je).call(this, e.clone().opposite(), "="));
    a(this, "isReduced", (e) => {
      if (!this.isDeveloped(e))
        return !1;
      const t = new C(e);
      if (t.monoms.length > this.monoms.length)
        return !1;
      for (const i of t.monoms)
        if (!i.coefficient.isReduced())
          return !1;
      return !1;
    });
    a(this, "isSameAs", (e) => s(this, Je).call(this, e, "same"));
    a(this, "lcmDenominator", () => W.lcm(...this.getDenominators()));
    a(this, "lcmNumerator", () => W.lcm(...this.getNumerators()));
    a(this, "letters", () => {
      let e = /* @__PURE__ */ new Set();
      for (const t of s(this, y))
        e = /* @__PURE__ */ new Set([...e, ...t.variables]);
      return [...e];
    });
    a(this, "limitToInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), i = t.coefficient.sign(), n = t.degree(e);
      return n.isStrictlyPositive() ? i === 1 ? new u().infinite() : new u().infinite().opposite() : n.isZero() ? t.coefficient : new u().zero();
    });
    a(this, "limitToNegativeInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), i = t.coefficient.sign(), n = t.degree(e);
      return n.isStrictlyPositive() ? i === -1 ? new u().infinite() : new u().infinite().opposite() : n.isZero() ? t.coefficient : new u().zero();
    });
    a(this, "monomByDegree", (e, t) => {
      if (e === void 0)
        return this.monomByDegree(this.degree(t), t);
      const i = this.clone().reduce();
      for (const n of s(i, y))
        if (n.degree(t).isEqual(e))
          return n.clone();
      return new k().zero();
    });
    // Used in LinearSystem.tex
    a(this, "monomByLetter", (e) => {
      const t = this.clone().reduce();
      for (const i of s(t, y))
        if (i.hasVariable(e))
          return i.clone();
      return new k().zero();
    });
    a(this, "monomsByDegree", (e, t) => {
      if (e === void 0)
        return this.monomsByDegree(this.degree(t));
      const i = [], n = this.clone().reduce();
      for (const r of s(n, y))
        r.degree(t).isEqual(e) && i.push(r.clone());
      return i;
    });
    a(this, "multiply", (e) => e instanceof C ? s(this, Rt).call(this, e) : e instanceof u ? s(this, mt).call(this, e) : e instanceof k ? s(this, St).call(this, e) : Number.isSafeInteger(e) && typeof e == "number" ? s(this, Bt).call(this, e) : this);
    a(this, "one", () => (h(this, y, []), s(this, y).push(new k().one()), this));
    // ------------------------------------------
    a(this, "opposite", () => (h(this, y, s(this, y).map((e) => e.opposite())), this));
    a(this, "pow", (e) => {
      if (!Number.isSafeInteger(e))
        return this.zero();
      if (e < 0)
        return this.zero();
      if (e === 0)
        return new C();
      const t = this.clone();
      for (let i = 1; i < e; i++)
        this.multiply(t);
      return this.reduce();
    });
    a(this, "primitive", (e) => {
      const t = new C();
      for (const i of s(this, y))
        t.add(i.primitive(e));
      return t;
    });
    a(this, "reduce", () => {
      let e = 0;
      for (; e < s(this, y).length; ) {
        for (let t = e + 1; t < s(this, y).length; t++)
          s(this, y)[e].isSameAs(s(this, y)[t]) && (s(this, y)[e].add(s(this, y)[t]), s(this, y).splice(t, 1), s(this, y)[e].isZero() && (s(this, y)[e] = new k().zero()), t--);
        e++;
      }
      h(this, y, s(this, y).filter((t) => !t.coefficient.isZero()));
      for (const t of s(this, y))
        t.coefficient.reduce();
      return this.length === 0 ? new C().zero() : this.reorder();
    });
    a(this, "reorder", (e = "x", t) => {
      t === void 0 && (t = !1);
      const i = this.variables.filter((n) => n !== e);
      return s(this, y).sort(function(n, r) {
        const l = n.degree(e).value, c = r.degree(e).value;
        if (l !== c)
          return t ? l - c : c - l;
        if (i.length > 0)
          for (const d of i) {
            const f = n.degree(d).value, g = r.degree(d).value;
            if (f !== g)
              return t ? f - g : g - f;
          }
        return 0;
      }), this;
    });
    // ------------------------------------------
    /**
     * Replace a variable (letter) by a polynom.
     * @param letter
     * @param P
     */
    a(this, "replaceBy", (e, t) => {
      let i;
      const n = new C().zero();
      for (const r of this.monoms)
        !r.hasVariable(e) || r.literal[e].isZero() ? n.add(r.clone()) : (i = r.literal[e].clone(), r.removeVariable(e), n.add(t.clone().pow(Math.abs(i.numerator)).multiply(r)));
      return h(this, y, n.reduce().monoms), this;
    });
    a(this, "subtract", (...e) => {
      for (const t of e)
        t instanceof C ? this.add(t.clone().opposite()) : t instanceof k ? s(this, y).push(t.clone().opposite()) : s(this, y).push(new k(t).opposite());
      return this.reduce();
    });
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    a(this, "zero", () => (h(this, y, []), s(this, y).push(new k().zero()), this));
    p(this, Je, (e, t) => {
      t === void 0 && (t = "=");
      const i = this.clone().reduce().reorder(), n = e.clone().reduce().reorder();
      switch (t) {
        case "=":
          return i.length !== n.length || !i.degree().isEqual(n.degree()) ? !1 : i.monoms.every((r, l) => r.isEqual(n.monoms[l]));
        case "same":
          return i.length !== n.length || !i.degree().isEqual(n.degree()) ? !1 : i.monoms.every((r, l) => r.isSameAs(n.monoms[l]));
        default:
          return !1;
      }
    });
    p(this, pt, (e) => {
      for (const t of s(this, y))
        t.coefficient.divide(e);
      return this;
    });
    p(this, Ct, (e) => {
      const t = new u(e);
      for (const i of s(this, y))
        i.coefficient.divide(t);
      return this;
    });
    p(this, $t, (e) => {
      let t = 0;
      return s(this, y).forEach((i) => {
        t += i.evaluate(e, !0);
      }), t;
    });
    p(this, It, (e) => {
      var x;
      let t, i, n, r, l, c, d, f, g;
      if (this.numberOfVars === 1)
        return n = this.monomByDegree(2, e).coefficient, r = this.monomByDegree(1, e).coefficient, l = this.monomByDegree(0, e).coefficient, c = r.clone().pow(2).subtract(n.clone().multiply(l).multiply(4)), c.isZero() ? (d = r.clone().opposite().divide(n.clone().multiply(2)), t = new C(e).subtract(d.display).multiply(d.denominator), i = new C(e).subtract(d.display).multiply(d.denominator), g = n.divide(d.denominator).divide(d.denominator), g.isOne() ? [t, i] : [new C(g.display), t, i]) : c.isPositive() && c.isSquare() ? (d = r.clone().opposite().add(c.clone().sqrt()).divide(n.clone().multiply(2)), f = r.clone().opposite().subtract(c.clone().sqrt()).divide(n.clone().multiply(2)), g = n.divide(d.denominator).divide(f.denominator), g.isOne() ? [
          new C(e).subtract(d.display).multiply(d.denominator),
          new C(e).subtract(f.display).multiply(f.denominator)
        ] : [
          new C(g.display),
          new C(e).subtract(d.display).multiply(d.denominator),
          new C(e).subtract(f.display).multiply(f.denominator)
        ]) : [this.clone()];
      if (n = this.monomByDegree(2, e), r = this.monomByDegree(1, e), l = this.monomByDegree(0, e), n.isLiteralSquare() && l.isLiteralSquare() && r.clone().pow(2).isSameAs(n.clone().multiply(l))) {
        const V = new C("x", n.coefficient, r.coefficient, l.coefficient), pe = s(x = V, It).call(x, "x"), le = [];
        let ce;
        if (pe.length >= 2) {
          for (const ge of pe)
            ge.degree().isZero() ? le.push(ge.clone()) : (ce = ge.clone(), ce.monoms[0].literal = n.literalSqrt, ce.monoms[1].literal = l.literalSqrt, le.push(ce.clone()));
          return le;
        }
      }
      return [this.clone()];
    });
    p(this, _e, (e, t, i, n) => {
      let r = "";
      for (const l of s(this, y)) {
        if (l.coefficient.value === 0)
          continue;
        let c;
        n ? c = l.plotFunction : c = e === "tex" ? l.tex : l.display, r += `${l.coefficient.sign() === 1 && (r !== "" || t === !0) ? "+" : ""}${c}`;
      }
      return i === !0 && this.length > 1 && (e === "tex" ? r = `\\left( ${r} \\right)` : r = `(${r})`), r === "" && (r = "0"), r;
    });
    p(this, Pt, (e, t, i) => {
      const n = e.monoms[0].dividers, r = e.monoms[e.monoms.length - 1].dividers, l = [];
      return n.forEach((c) => {
        c.degree(i).isLeq(t) && r.forEach((d) => {
          c.degree(i).isNotEqual(d.degree(i)) && (l.push(new C(c, d)), l.push(new C(c, d.clone().opposite())));
        });
      }), l;
    });
    p(this, mt, (e) => {
      for (const t of s(this, y))
        t.coefficient.multiply(e);
      return this.reduce();
    });
    p(this, Bt, (e) => s(this, mt).call(this, new u(e)));
    p(this, St, (e) => {
      for (const t of s(this, y))
        t.multiply(e);
      return this.reduce();
    });
    p(this, Rt, (e) => {
      const t = [];
      for (const i of s(this, y))
        for (const n of e.monoms)
          t.push(k.xMultiply(i, n));
      return h(this, y, t), this.reduce();
    });
    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    p(this, Lt, (e) => {
      const i = new Kt().parse(e).rpn;
      this.zero();
      const n = [];
      for (const r of i)
        s(this, Dt).call(this, n, r);
      return n.length === 1 && this.add(n[0]), this.reorder();
    });
    p(this, Dt, (e, t) => {
      switch (t.tokenType) {
        case m.COEFFICIENT:
          e.push(new C(t.token));
          break;
        case m.VARIABLE:
          e.push(new C().add(new k(t.token)));
          break;
        case m.CONSTANT:
          console.log("Actually, not supported - will be added later !");
          break;
        case m.OPERATION:
          if (e.length >= 2) {
            const i = e.pop(), n = e.pop();
            if (n === void 0 || i === void 0)
              break;
            if (t.token === "+")
              e.push(n.add(i));
            else if (t.token === "-")
              e.push(n.subtract(i));
            else if (t.token === "*")
              e.push(n.multiply(i));
            else if (t.token === "/")
              i.degree().isStrictlyPositive() ? console.log("divide by a polynom -> should create a rational polynom !") : e.push(n.divide(i.monoms[0].coefficient));
            else if (t.token === "^") {
              if (i.degree().isStrictlyPositive())
                throw new Error("Cannot elevate a polynom with another polynom !");
              if (i.monoms[0].coefficient.isRelative())
                e.push(n.pow(i.monoms[0].coefficient.value));
              else if (n.monoms.length === 1 && n.monoms[0].coefficient.isOne()) {
                for (const r in n.monoms[0].literal)
                  n.monoms[0].literal[r].multiply(i.monoms[0].coefficient);
                e.push(n);
              } else
                console.error("Cannot have power with fraction");
            }
          } else if (t.token === "-") {
            const i = e.pop();
            i && e.push(i.opposite());
          } else
            throw new Error("Error parsing the polynom");
          break;
        case m.MONOM:
          console.error("The monom token should not appear here");
          break;
        case m.FUNCTION:
          console.error("The function token should not appear here - might be introduced later.");
          break;
      }
    });
    return h(this, y, []), h(this, Ue, []), h(this, Ke, []), e !== void 0 && this.parse(e, ...t), this;
  }
  get display() {
    return s(this, _e).call(this);
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
    h(this, y, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get plotFunction() {
    return s(this, _e).call(this, "tex", !1, !1, !0);
  }
  root() {
    throw new Error("Cannot take the root from a polynom");
  }
  get roots() {
    return s(this, dt) ? s(this, Ke) : this.getZeroes();
  }
  set roots(e) {
    h(this, dt, !0), h(this, Ke, e);
  }
  sqrt() {
    throw new Error("Cannot take the square root from a polynom");
  }
  tableOfSigns(e) {
    const t = e ?? this.getZeroes(), i = this.roots;
    if (e && i.some((r) => t.findIndex((l) => l.value === r.value) === -1))
      throw new Error("Some roots cannot be found !");
    let n = [""];
    if (t.forEach(() => n.push("t", "")), t.length === 0)
      n = Re(n, "", this.monomsByDegree()[0].coefficient.isPositive() ? "+" : "-");
    else if (this.degree().isOne()) {
      const r = this.monomsByDegree(1)[0].coefficient.sign(), l = t.findIndex((c) => c.value === i[0].value) * 2 + 1;
      n[l] = "z", n = Re(n, "", r === 1 ? "-" : "+", 0, l), n = Re(n, "", r === 1 ? "+" : "-", l);
    } else {
      let r = 0, l, c = "+";
      i.forEach((d, f) => {
        const g = t.findIndex((V) => V.value === i[f].value);
        f === 0 && (l = g * 2 + 1, n[l] = "z", n = Re(
          n,
          "",
          this.evaluate(d.value - 1, !0) < 0 ? "-" : "+",
          0,
          l
        )), r = g * 2 + 1, l = f === i.length - 1 ? n.length : t.findIndex((V) => V.value === i[f + 1].value) * 2 + 1;
        const x = f === i.length - 1 ? d.value + 1 : (d.value + i[f + 1].value) / 2;
        c = this.evaluate(x, !0) < 0 ? "-" : "+", n[r] = "z", n = Re(n, "", c, r, l), r = +l, l = n.length;
      });
    }
    return { roots: t, signs: n };
  }
  get tex() {
    return s(this, _e).call(this, "tex");
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
};
Ue = new WeakMap(), y = new WeakMap(), Ke = new WeakMap(), dt = new WeakMap(), Je = new WeakMap(), pt = new WeakMap(), Ct = new WeakMap(), $t = new WeakMap(), It = new WeakMap(), _e = new WeakMap(), Pt = new WeakMap(), mt = new WeakMap(), Bt = new WeakMap(), St = new WeakMap(), Rt = new WeakMap(), zt = new WeakSet(), Ai = function(e, ...t) {
  if (t.length === 0) {
    if (e = "" + e, e !== "" && !isNaN(Number(e))) {
      this.empty();
      const i = new k(e);
      return this.add(i), this;
    }
    return s(this, Lt).call(this, e);
  } else if (/^[a-z]+/.test(e)) {
    this.empty();
    const i = t.map((n) => new u(n));
    if (e.length > 1) {
      const n = e.split("");
      let r = 0;
      for (const l of i) {
        const c = new k();
        c.coefficient = l.clone(), c.literalStr = n[r] || "", this.add(c), r++;
      }
    } else {
      let n = i.length - 1;
      for (const r of i) {
        const l = new k();
        l.coefficient = r.clone(), l.literalStr = `${e}^${n}`, this.add(l), n--;
      }
    }
    return this;
  } else
    return this.zero();
}, Lt = new WeakMap(), Dt = new WeakMap();
let T = C;
var q, M, re, Vt, et, Zt;
const Ee = class Ee {
  constructor(e, t, i) {
    // Left part of the equation
    p(this, q);
    // Right part of the equation
    p(this, M);
    // Signe of the equation
    p(this, re);
    // ------------------------------------------
    a(this, "parse", (e) => {
      const t = s(this, Vt).call(this, e);
      if (t === !1)
        throw new Error("The equation is not valid (no sign found)");
      const i = e.split(t);
      return this.create(new T(i[0]), new T(i[1]), s(this, et).call(this, t));
    });
    a(this, "create", (e, t, i) => (h(this, q, e), h(this, M, t), h(this, re, s(this, et).call(this, i ?? "=")), this));
    a(this, "clone", () => new Ee(s(this, q).clone(), s(this, M).clone(), s(this, re)));
    /**
     * Get the degree of the equation
     * @param letter
     */
    a(this, "degree", (e) => u.max(s(this, q).degree(e), s(this, M).degree(e)));
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
      const t = new u(e);
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
    a(this, "isMultiVariable", () => s(this, q).isMultiVariable || s(this, M).isMultiVariable);
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
      s(this, q).subtract(s(this, M)), s(this, M).zero();
      const i = [...s(this, q).monoms];
      for (const r of i)
        r.hasVariable(e) || (t = r.clone(), s(this, q).subtract(t), s(this, M).subtract(t));
      if (s(this, q).length !== 1)
        return !1;
      const n = s(this, q).monoms[0].coefficient.clone();
      return s(this, q).divide(n), s(this, M).divide(n), this;
    });
    // -----------------------------------------------
    // Equations operations
    // -----------------------------------------------
    a(this, "letters", () => [.../* @__PURE__ */ new Set([...s(this, q).letters(), ...s(this, M).letters()])]);
    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    a(this, "moveLeft", () => (s(this, q).subtract(s(this, M)), s(this, M).zero(), this));
    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    a(this, "multiply", (e) => {
      const t = new u(e);
      return s(this, q).multiply(t), s(this, M).multiply(t), s(this, re) !== "=" && t.sign() === -1 && s(this, Zt).call(this), this;
    });
    a(this, "opposite", () => (h(this, q, s(this, q).opposite()), h(this, M, s(this, M).opposite()), this));
    a(this, "reorder", (e) => (s(this, q).subtract(s(this, M)), s(this, M).zero(), s(this, q).reorder(), e ? this : (s(this, q).monoms.filter((t) => t.degree().isZero()).forEach((t) => {
      const i = t.clone();
      s(this, q).subtract(i), s(this, M).subtract(i);
    }), s(this, q).reorder(), s(this, M).reorder(), this)));
    // ------------------------------------------
    a(this, "replaceBy", (e, t) => (s(this, q).replaceBy(e, t), s(this, M).replaceBy(e, t), this));
    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    a(this, "simplify", () => (this.multiply(W.lcm(...s(this, q).getDenominators(), ...s(this, M).getDenominators())), this.divide(W.gcd(...s(this, q).getNumerators(), ...s(this, M).getNumerators())), this));
    // -----------------------------------------------
    a(this, "solve", () => new Ot(this.clone()).solve());
    a(this, "test", (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e)));
    p(this, Vt, (e) => {
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
    p(this, et, (e) => e === void 0 ? "=" : e.includes("geq") || e.includes(">=") || e.includes("=>") ? ">=" : e.includes(">") ? ">" : e.includes("leq") || e.includes("<=") || e.includes("=<") ? "<=" : e.includes("<") ? "<" : "=");
    p(this, Zt, () => s(this, re) === "=" ? this : s(this, re).includes("<") ? (s(this, re).replace("<", ">"), this) : s(this, re).includes(">") ? (s(this, re).replace(">", "<"), this) : this);
    if (h(this, q, new T().zero()), h(this, M, new T().zero()), h(this, re, "="), e !== void 0 && t === void 0) {
      if (e instanceof Ee)
        return e.clone();
      typeof e == "string" && this.parse(e);
    } else e !== void 0 && t !== void 0 && (this.left = new T(e), this.right = new T(t));
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
    if (e instanceof Ee)
      return s(this, q).add(e.left), s(this, M).add(e.right), this;
    if (typeof e == "string" && !Ee.isEquationString(e))
      return this.add(new Ee(e));
    const t = new T(e);
    return s(this, q).add(t), s(this, M).add(t), this;
  }
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param values
   * @param asNumeric
   */
  evaluate(e, t) {
    const i = s(this, q).evaluate(e, t), n = s(this, M).evaluate(e, t);
    return t ? i === n : i.isEqual(n);
  }
  isEqual(e) {
    const t = new Ee(e);
    return t.left.isEqual(s(this, q)) && t.right.isEqual(s(this, M));
  }
  pow(e) {
    return s(this, q).pow(e), s(this, M).pow(e), this;
  }
  reduce() {
    return this.moveLeft(), s(this, q).reduce(), this.simplify(), s(this, q).monoms[0].coefficient.isNegative() && this.multiply(-1), this;
  }
  split() {
    return [s(this, q).clone(), s(this, M).clone()];
  }
  subtract(e) {
    if (e instanceof Ee)
      return s(this, q).subtract(e.left), s(this, M).subtract(e.right), this;
    if (typeof e == "string" && !Ee.isEquationString(e))
      return this.subtract(new Ee(e));
    const t = new T(e);
    return s(this, q).subtract(t), s(this, M).subtract(t), this;
  }
  static isEquationString(e) {
    return e.includes("=") || e.includes("<") || e.includes(">") || e.includes("<=") || e.includes(">=");
  }
  static makeSolutionsUnique(e, t) {
    const i = [], n = e.filter((r) => i.includes(r.tex) ? !1 : (i.push(r.tex), !0));
    return t === !0 && n.sort((r, l) => r.value - l.value), n;
  }
  get display() {
    return `${s(this, q).display}${this.signAsTex}${s(this, M).display}`;
  }
  // Getter and setter
  get left() {
    return s(this, q);
  }
  set left(e) {
    h(this, q, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get right() {
    return s(this, M);
  }
  set right(e) {
    h(this, M, e);
  }
  // ------------------------------------------
  get sign() {
    return s(this, re);
  }
  set sign(e) {
    h(this, re, s(this, et).call(this, e));
  }
  get signAsTex() {
    return s(this, re) === ">=" ? "\\geq" : s(this, re) === "<=" ? "\\leq" : s(this, re);
  }
  get tex() {
    return `${s(this, q).tex}${this.signAsTex}${s(this, M).tex}`;
  }
  get variables() {
    return [...new Set(s(this, M).variables.concat(s(this, q).variables))];
  }
};
q = new WeakMap(), M = new WeakMap(), re = new WeakMap(), Vt = new WeakMap(), et = new WeakMap(), Zt = new WeakMap();
let X = Ee;
var Ne, Oe, Te, tt;
const ve = class ve {
  constructor(e, t) {
    p(this, Ne);
    p(this, Oe);
    p(this, Te);
    p(this, tt, !1);
    if (e instanceof ve)
      h(this, Oe, e.polynom.clone()), h(this, Te, e.power.clone());
    else if (typeof e == "string" && t === void 0) {
      const [i, n = "1"] = e.split("^");
      h(this, Oe, new T(i)), h(this, Te, new u(n.replace("(", "").replace(")", "")));
    } else
      h(this, Oe, new T(e)), h(this, Te, new u(t ?? 1));
    return h(this, Ne, 1), this;
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  clone() {
    return new ve(this);
  }
  get tex() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, n;
    return s(this, Ne) === 0 && t > 1 ? (i = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, n = e === 1 ? "" : `^{ ${e} }`) : (i = s(this, tt) && this.power.isOne() ? this.polynom.tex : wi(this.polynom.tex), n = t === 1 && e === 1 ? "" : `^{ ${this.power.tex} }`), i = `${i}${n}`, s(this, Ne) === 0 && e < 0 && (i = `\\frac{ 1 }{ ${i} }`), i;
  }
  get display() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, n;
    return s(this, Ne) === 0 && t > 1 ? (i = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, n = e === 1 ? "" : `^(${e})`) : (i = s(this, tt) && this.power.isOne() ? this.polynom.display : wi(this.polynom.display, !1), n = t === 1 && e === 1 ? "" : `^(${this.power.display})`), i = `${i}${n}`, s(this, Ne) === 0 && e < 0 && (i = `1/(${i})`), i;
  }
  add() {
    throw new Error("Adding two factors is not possible");
  }
  get asSingle() {
    return h(this, tt, !0), this;
  }
  degree(e) {
    return this.polynom.degree(e).multiply(this.power);
  }
  derivative() {
    return this.power.isZero() ? [new ve("0", "1")] : this.power.isOne() ? [new ve(this.polynom.clone().derivative())] : [
      new ve(this.power.clone()),
      new ve(this.polynom.clone().derivative()),
      new ve(this.polynom.clone(), this.power.clone().subtract(1))
    ];
  }
  develop() {
    if (this.power.isNatural())
      return this.polynom.clone().pow(this.power.value);
    throw new Error("The power must be a natural number");
  }
  divide(e) {
    if (e instanceof ve && this.isSameAs(e))
      return this.power.subtract(e.power), this;
    const t = new T(e);
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
    return e instanceof ve ? t = e.polynom : e instanceof T ? t = e : t = new T(e), this.polynom.isEqual(t);
  }
  isZero() {
    return this.polynom.isZero();
  }
  multiply(e) {
    if (e instanceof ve && this.isSameAs(e))
      return this.power.add(e.power), this;
    const t = new T(e);
    if (this.isSameAs(t))
      return this.power.add(1), this;
    throw new Error("The two factors must be the same");
  }
  one() {
    return s(this, Oe).one(), s(this, Te).one(), this;
  }
  opposite() {
    throw new Error("Method not implemented.");
  }
  get polynom() {
    return s(this, Oe);
  }
  set polynom(e) {
    h(this, Oe, e);
  }
  pow(e) {
    return this.power.multiply(e), this;
  }
  get power() {
    return s(this, Te);
  }
  set power(e) {
    h(this, Te, new u(e));
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
  tableOfSigns(e) {
    const t = this.power.clone().reduce(), i = this.polynom.tableOfSigns(e);
    return t.isStrictlyNegative() && (i.signs = Re(i.signs, "z", "d")), t.denominator % 2 === 0 ? i.signs = Re(i.signs, "-", "h") : t.numerator % 2 === 0 && (i.signs = Re(i.signs, "-", "+")), { roots: i.roots, signs: i.signs };
  }
  get variables() {
    return this.polynom.variables;
  }
  get withPower() {
    return h(this, Ne, 1), this;
  }
  get withRoot() {
    return h(this, Ne, 0), this;
  }
  zero() {
    return s(this, Oe).zero(), s(this, Te).one(), this;
  }
};
Ne = new WeakMap(), Oe = new WeakMap(), Te = new WeakMap(), tt = new WeakMap();
let ie = ve;
var ct = /* @__PURE__ */ ((o) => (o[o.ROOT = 0] = "ROOT", o[o.POWER = 1] = "POWER", o))(ct || {}), D, $e, Ft, jt;
const Xe = class Xe {
  constructor(...e) {
    p(this, D);
    // Determine the letters in the linear system, usually ['x', 'y']
    p(this, $e);
    a(this, "parse", (...e) => (h(this, D, e.map((t) => new X(t))), s(this, Ft).call(this), this));
    a(this, "clone", () => new Xe().parse(...s(this, D).map((e) => e.clone())));
    a(this, "buildTex", (e, t) => {
      let i, n, r = [];
      const l = [];
      for (const d of e)
        r = r.concat(d.letters());
      r = [...new Set(r)], r.sort();
      for (let d = 0; d < e.length; d++) {
        const f = e[d];
        i = [];
        for (const g of r)
          n = f.left.monomByLetter(g), i.length === 0 ? i.push(n.isZero() ? "" : n.tex) : i.push(n.isZero() ? "" : (n.coefficient.sign() === 1 ? "+" : "") + n.tex);
        if (i.push("="), i.push(f.right.tex), (t == null ? void 0 : t[d]) !== void 0) {
          i[i.length - 1] = i[i.length - 1] + " \\phantom{\\quad}";
          for (const g of t[d])
            i.push(`\\ \\cdot\\ ${g.startsWith("-") ? "\\left(" + g + "\\right)" : g}`);
        }
        l.push(i.join("&"));
      }
      let c = 0;
      return t !== void 0 && t.length > 0 && (c = t[0].length), `\\left\\{\\begin{array}{${"r".repeat(r.length)}cl ${"|l".repeat(c)}}${l.join("\\\\ ")}\\end{array}\\right.`;
    });
    a(this, "mergeEquations", (e, t, i, n) => {
      const r = e.clone().multiply(new u(i)), l = t.clone().multiply(new u(n));
      return r.left.add(l.left), r.right.add(l.right), r;
    });
    // ------------------------------------------
    a(this, "reorder", () => {
      for (const e of s(this, D))
        e.reorder();
      return this;
    });
    a(this, "solveMatrix", () => {
      const [e, t] = this.matrix, i = e.map((n, r) => [...n, t[r]]);
      for (let n = 0; n < e.length; n++) {
        const r = i[n][n].clone();
        i[n] = i[n].map((l) => l.divide(r));
        for (let l = 0; l < e.length; l++) {
          if (l === n)
            continue;
          const c = i[l][n].clone().opposite();
          for (let d = 0; d < i[l].length; d++)
            i[l][d].add(i[n][d].clone().multiply(c));
          if (i[l].slice(0, i[l].length - 1).every((d) => d.isZero()))
            return i[l][i[l].length - 1].isZero() ? [new u().infinite()] : [];
        }
      }
      return i.map((n) => n[n.length - 1]);
    });
    p(this, Ft, () => (h(this, $e, s(this, D).reduce((e, t) => [.../* @__PURE__ */ new Set([...e, ...t.variables])], [])), s(this, $e).sort(), this));
    p(this, jt, () => {
      const e = [], t = [];
      for (const i of s(this, D)) {
        const n = [], r = i.clone().reorder();
        for (const l of this.variables) {
          const c = r.left.monomByLetter(l);
          n.push(c.coefficient);
        }
        t.push(r.right.monoms[0].coefficient), e.push(n);
      }
      return [e, t];
    });
    return h(this, D, []), h(this, $e, []), e.length > 0 && this.parse(...e), this;
  }
  static fromMatrix(e, t = "xyz") {
    const i = e[0].length;
    if (e.some((r) => r.length !== i))
      throw new Error("All rows must have the same number of columns");
    const n = t.split("").splice(0, i - 1);
    return new Xe(
      ...e.map((r) => {
        const l = new T(n.join(""), ...r);
        return new X(l, 0);
      })
    );
  }
  add(e, t) {
    if (e instanceof Xe) {
      const i = e.equations.length;
      if (i !== s(this, D).length)
        throw new Error("The number of equations must be the same");
      for (let n = 0; n < i; n++)
        s(this, D)[n].add(e.equations[n]);
    } else {
      if (t === void 0 || t < 0 || t >= s(this, D).length)
        throw new Error("Index out of range");
      const i = new X(e);
      s(this, D)[t].add(i);
    }
    return this;
  }
  degree(e) {
    return u.max(...s(this, D).map((t) => t.degree(e)));
  }
  get display() {
    return this.tex + "as display";
  }
  // ------------------------------------------
  get equations() {
    return s(this, D);
  }
  set equations(e) {
    h(this, D, e);
  }
  evaluate(e, t) {
    throw new Error("Method not implemented.");
  }
  hasVariable(e) {
    return s(this, $e).includes(e);
  }
  isEqual(e) {
    return this.equations.every((t, i) => t.isEqual(e.equations[i]));
  }
  get isSolvable() {
    return this.variables.length === s(this, D).length;
  }
  get matrix() {
    return s(this, jt).call(this);
  }
  multiply(e, t) {
    if (Array.isArray(e)) {
      if (e.length !== s(this, D).length)
        throw new Error("The number of values must be the same as the number of equations");
      for (let i = 0; i < e.length; i++)
        s(this, D)[i].multiply(e[i]);
      return this;
    }
    if (t === void 0 || t < 0 || t >= s(this, D).length)
      throw new Error("Index out of range");
    return s(this, D)[t].multiply(e), this;
  }
  reduce() {
    throw new Error("Method not implemented.");
  }
  solve() {
    return [];
  }
  subtract(e, t) {
    if (e instanceof Xe) {
      const i = e.equations.length;
      if (i !== s(this, D).length)
        throw new Error("The number of equations must be the same");
      for (let n = 0; n < i; n++)
        s(this, D)[n].subtract(e.equations[n]);
    } else {
      if (t === void 0 || t < 0 || t >= s(this, D).length)
        throw new Error("Index out of range");
      const i = new X(e);
      s(this, D)[t].subtract(i);
    }
    return this;
  }
  get tex() {
    const e = this.clone().reorder();
    return this.buildTex(e.equations);
  }
  get variables() {
    return s(this, $e);
  }
  set variables(e) {
    const t = typeof e == "string" ? e.split("") : [...e];
    t.sort(), h(this, $e, t);
  }
};
D = new WeakMap(), $e = new WeakMap(), Ft = new WeakMap(), jt = new WeakMap();
let ii = Xe;
var Ae, gt, si;
class ts {
  /**
   *
   * @param {string} value (optional) Default polynom to parse on class creation
   */
  constructor(e) {
    p(this, gt);
    p(this, Ae);
    a(this, "parse", (e) => (h(this, Ae, new Kt(Fe.SET).parse(e).rpn), this));
    return h(this, Ae, []), e !== void 0 && this.parse(e), this;
  }
  evaluate(e) {
    this.variables.forEach((i) => {
      Object.hasOwn(e, i) || (e[i] = !1);
    });
    const t = [];
    for (const i of s(this, Ae))
      if (console.log(i), i.tokenType === "variable")
        t.push(e[i.token]);
      else if (i.tokenType === "operation")
        if (i.token === "!")
          if (t.length >= 1) {
            const n = t.pop();
            t.push(!n);
          } else
            return !1;
        else {
          const n = t.pop(), r = t.pop();
          if (n !== void 0 && r !== void 0)
            switch (i.token) {
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
    return s(this, Ae);
  }
  get tex() {
    const e = [];
    for (const t of s(this, Ae))
      if (t.tokenType === "variable")
        e.push(t);
      else
        switch (t.token) {
          case "&":
            if (e.length >= 2) {
              const i = e.pop(), n = e.pop();
              i && n && (n.tokenType === "mix" && (n.token = `( ${n.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${n.token} \\cap ${i.token}`, tokenType: "mix" }));
            }
            break;
          case "|":
            if (e.length >= 2) {
              const i = e.pop(), n = e.pop();
              i && n && (n.tokenType === "mix" && (n.token = `( ${n.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${n.token} \\cup ${i.token}`, tokenType: "mix" }));
            }
            break;
          case "-":
            if (e.length >= 2) {
              const i = e.pop(), n = e.pop();
              i && n && (n.tokenType === "mix" && (n.token = `( ${n.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${n.token} \\setminus ${i.token}`, tokenType: "mix" }));
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
    return s(this, Ae).filter((e) => e.tokenType === "variable").map((e) => e.token);
  }
  vennAB() {
    return A(this, gt, si).call(this, {
      A: ["A", "AB"],
      B: ["B", "AB"]
    }, ["A", "B", "AB", "E"]);
  }
  vennABC() {
    return A(this, gt, si).call(this, {
      A: ["A", "AB", "AC", "ABC"],
      B: ["B", "AB", "BC", "ABC"],
      C: ["C", "AC", "BC", "ABC"]
    }, ["A", "B", "C", "AB", "AC", "BC", "ABC", "E"]);
  }
}
Ae = new WeakMap(), gt = new WeakSet(), si = function(e, t) {
  const i = [];
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
  for (const r of s(this, Ae))
    if (r.tokenType === "variable")
      e[r.token] === void 0 ? i.push(/* @__PURE__ */ new Set()) : i.push(new Set(e[r.token]));
    else
      switch (r.token) {
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
            l && i.push(new Set([...n].filter((c) => !l.has(c))));
          }
          break;
      }
  return [...i[0]].sort();
};
var it, N, Ge, ri, qi, yt, oi;
const G = class G {
  constructor(...e) {
    p(this, yt);
    p(this, it, ct.POWER);
    p(this, N, []);
    return this.parse(...e), this;
  }
  parse(...e) {
    return e.length === 0 ? this : (h(this, N, []), e.forEach((t) => {
      if (typeof t == "string") {
        const i = t.split(")(").join(")*(").split("*");
        s(this, N).push(...i.map((n) => new ie(n)));
      } else t instanceof G ? s(this, N).push(...t.factors.map((i) => i.clone())) : s(this, N).push(new ie(t));
    }), this);
  }
  clone() {
    return new G(...s(this, N).map((e) => e.clone()));
  }
  get tex() {
    const { num: e, den: t } = A(this, yt, oi).call(this);
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.tex : e.map((r) => r.tex).join("");
    const i = e.length === 1 ? e[0].asSingle.tex : e.map((r) => r.tex).join(""), n = t.length === 1 ? t[0].asSingle.tex : t.map((r) => r.tex).join("");
    return `\\frac{ ${i} }{ ${n} }`;
  }
  get display() {
    const { num: e, den: t } = A(this, yt, oi).call(this);
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.display : e.map((r) => r.display).join("");
    const i = e.length === 1 ? e[0].asSingle.display : e.map((r) => r.display).join(""), n = t.length === 1 ? t[0].asSingle.display : t.map((r) => r.display).join("");
    return `(${i})/(${n})`;
  }
  static gcd(...e) {
    var i;
    if (e.length === 0)
      return new G().one();
    if (e.length === 1)
      return e[0];
    if (e.length === 2)
      return A(i = G, Ge, ri).call(i, e[0], e[1]);
    let t = e[0];
    return e.shift(), e.forEach((n) => {
      var r;
      return t = A(r = G, Ge, ri).call(r, t, n);
    }), t;
  }
  static lcm(...e) {
    if (e.length === 0)
      return new G().one();
    if (e.length === 1)
      return e[0];
    let t = e[0];
    return e.shift(), e.forEach((i) => {
      var n;
      return t = A(n = G, Ge, qi).call(n, t, i);
    }), t;
  }
  add(...e) {
    const t = [this.numerator, ...e.map((c) => c.numerator)], i = [this.denominator, ...e.map((c) => c.denominator)];
    let n;
    if (i.some((c) => c.factors.length > 0)) {
      const c = G.lcm(...i);
      t.forEach((d, f) => {
        d.multiply(c.clone().divide(i[f]));
      }), n = c;
    }
    const r = G.gcd(...t), l = new T(0).add(
      ...t.map((c) => c.divide(r).reduce().develop().factors[0].polynom)
    );
    return h(this, N, [
      ...r.factors,
      new ie(l)
    ]), n && this.divide(n), h(this, N, s(this, N).filter((c) => !c.power.isZero())), this;
  }
  get asPower() {
    return h(this, it, ct.POWER), this;
  }
  get asRoot() {
    return h(this, it, ct.ROOT), this;
  }
  degree(e) {
    return s(this, N).reduce((t, i) => t.add(i.degree(e)), new u("0"));
  }
  get denominator() {
    return new G(
      ...s(this, N).filter((e) => e.power.isNegative()).map((e) => e.clone().inverse())
    );
  }
  derivative() {
    const e = [], t = s(this, N).length;
    for (let n = 0; n < t; n++) {
      const r = s(this, N).slice(), l = r.splice(n, 1)[0];
      e.push(new G(...r).multiply(new G(...l.derivative())));
    }
    e.forEach((n) => n.reduce());
    const i = e.shift();
    return i !== void 0 && h(this, N, i.factors), this.add(...e);
  }
  develop() {
    const e = new T("1"), t = new T("1");
    return this.numerator.factors.forEach((i) => {
      e.multiply(i.develop());
    }), this.denominator.factors.forEach((i) => {
      t.multiply(i.develop());
    }), new G().fromPolynom(e, t);
  }
  divide(e) {
    return h(this, N, s(this, N).concat(e.clone().factors.map((t) => t.inverse()))), this;
  }
  evaluate(e, t) {
    return t ? s(this, N).reduce((i, n) => i * n.evaluate(e, t), 1) : s(this, N).reduce((i, n) => i.multiply(n.evaluate(e)), new u("1"));
  }
  factorize(e) {
    const t = [];
    s(this, N).forEach((l) => {
      const c = l.polynom.factorize(e);
      if (c.length > 1) {
        const d = l.power.clone();
        t.push(...c.map((f) => new ie(f, d)));
      } else
        t.push(l.clone());
    });
    const i = new G(...t), n = i.numerator.reduce(), r = i.denominator.reduce();
    return n.divide(r);
  }
  get factors() {
    return s(this, N);
  }
  set factors(e) {
    h(this, N, e);
  }
  fromPolynom(e, t) {
    if (h(this, N, [new ie(new T(e))]), t) {
      const i = new T(t);
      if (i.isOne())
        return this;
      if (i.isZero())
        throw new Error("Cannot divide by zero");
      s(this, N).push(new ie(i, -1));
    }
    return this;
  }
  getZeroes() {
    const e = [].concat(...s(this, N).map((t) => t.polynom.getZeroes()));
    return e.sort((t, i) => t.value - i.value), e.filter(
      (t, i, n) => i === n.findIndex(
        (r) => r.value === t.value
      )
    );
  }
  hasVariable(e) {
    return s(this, N).some((t) => t.hasVariable(e));
  }
  inverse() {
    return h(this, N, s(this, N).map((e) => e.inverse())), this;
  }
  isEqual(e) {
    const t = G.gcd(this, e), i = this.clone().divide(t).reduce(), n = e.clone().divide(t).reduce();
    return i.isOne() && n.isOne();
  }
  isOne() {
    return s(this, N).every((e) => e.isOne());
  }
  isZero() {
    return s(this, N).every((e) => e.isZero());
  }
  multiply(...e) {
    return e.forEach((t) => {
      h(this, N, s(this, N).concat(t.clone().factors));
    }), this;
  }
  get numerator() {
    return new G(...s(this, N).filter((e) => e.power.isPositive()));
  }
  one() {
    return h(this, N, [new ie("1", "1")]), this;
  }
  opposite() {
    const e = s(this, N).findIndex((t) => t.display === "(-1)");
    return e >= 0 ? s(this, N).splice(e, 1) : s(this, N).push(new ie("-1", "1")), this;
  }
  pow(e) {
    return h(this, N, s(this, N).map((t) => t.pow(e))), this;
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    const e = ht(this);
    return h(this, N, Object.values(e).map((t) => {
      const i = t[0].polynom, n = t.reduce((r, l) => r.add(l.power), new u("0"));
      return new ie(i, n.reduce());
    }).filter((t) => !t.power.isZero())), this;
  }
  root(e) {
    return h(this, N, s(this, N).map((t) => t.root(e))), this;
  }
  sort() {
    return h(this, N, s(this, N).sort((e, t) => e.degree().isLeq(t.degree()) ? -1 : 1)), this;
  }
  sqrt() {
    return h(this, N, s(this, N).map((e) => e.sqrt())), this;
  }
  subtract(...e) {
    return this.add(...e.map((t) => t.opposite()));
  }
  tableOfSigns() {
    const e = this.getZeroes(), t = this.factors.map((n) => ({ factor: new ie(n), ...n.tableOfSigns(e) }));
    return { signs: t.map((n) => n.signs).reduce((n, r) => (n.length === 0 ? n = r : r.forEach((l, c) => {
      switch (l) {
        case "d":
          n[c] = "d";
          break;
        case "z":
          n[c] = n[c] === "d" ? "d" : "z";
          break;
        case "h":
          n[c] = "h";
          break;
        case "-":
          n[c] = n[c] === "h" ? "h" : n[c] === "-" ? "+" : "-";
          break;
      }
    }), n), []), roots: e, factors: t };
  }
  get variables() {
    return s(this, N).reduce((e, t) => e.concat(t.variables), []);
  }
  zero() {
    return h(this, N, [new ie("0", "1")]), this;
  }
};
it = new WeakMap(), N = new WeakMap(), Ge = new WeakSet(), ri = function(e, t) {
  const i = ht(e), n = ht(t), l = Object.keys(i).filter((c) => Object.hasOwn(n, c)).map((c) => {
    const d = i[c].reduce((g, x) => g.add(x.power), new u("0")), f = n[c].reduce((g, x) => g.add(x.power), new u("0"));
    return new ie(c, u.min(d, f));
  });
  return new G(...l);
}, qi = function(e, t) {
  const i = ht(e), n = ht(t), l = [.../* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(n)])].map((c) => {
    const d = Object.hasOwn(i, c) ? i[c].reduce((g, x) => g.add(x.power), new u("0")) : new u(0), f = Object.hasOwn(n, c) ? n[c].reduce((g, x) => g.add(x.power), new u("0")) : new u(0);
    return new ie(c, u.max(d, f));
  });
  return new G(...l);
}, yt = new WeakSet(), oi = function() {
  let e, t = [];
  return s(this, it) === ct.ROOT ? (e = this.numerator.factors, t = this.denominator.factors) : e = s(this, N), e.length === 0 && (e = [new ie("1")]), { num: e, den: t };
}, p(G, Ge);
let ni = G;
function ht(o) {
  const e = new u().one(), t = o.factors.reduce((i, n) => {
    if (n.polynom.degree().isZero())
      return n.polynom.monoms.length > 0 && e.multiply(n.polynom.monoms[0].coefficient), i;
    const r = n.polynom.display;
    return Object.hasOwn(i, r) ? i[r].push(n) : i[r] = [n], i;
  }, {});
  return e.isOne() || (t[e.display] = [new ie(e.display, 1)]), t;
}
function is(o, e) {
  return o.dimension === e.dimension && o.array.every(
    (t, i) => e.array[i].isEqual(t)
  );
}
function ss(o, e) {
  if (o.dimension !== e.dimension)
    return !1;
  const t = e.array[0].value / o.array[0].value;
  return o.array.every(
    (i, n) => e.array[n].value === i.value * t
  );
}
function ns(o, e) {
  return o.dimension !== e.dimension ? new u().invalid() : o.array.reduce(
    (t, i, n) => t.add(i.clone().multiply(e.array[n])),
    new u(0)
  );
}
function rs(...o) {
  return o.some((e) => e.dimension !== o[0].dimension) ? new u().invalid() : o[0].dimension === 2 && o.length !== 2 ? new u().invalid() : o[0].dimension === 3 && o.length !== 3 ? new u().invalid() : o[0].dimension === 2 ? o[0].array[0].clone().multiply(o[1].array[1]).subtract(o[0].array[1].clone().multiply(o[1].array[0])) : o[0].array[0].clone().multiply(
    o[1].array[1].clone().multiply(o[2].array[2]).subtract(o[1].array[2].clone().multiply(o[2].array[1]))
  ).subtract(
    o[0].array[1].clone().multiply(
      o[1].array[0].clone().multiply(o[2].array[2]).subtract(o[1].array[2].clone().multiply(o[2].array[0]))
    )
  ).add(o[0].array[2].clone().multiply(o[1].array[0].clone().multiply(o[2].array[1]).subtract(o[1].array[1].clone().multiply(o[2].array[0]))));
}
var F, De;
const Se = class Se {
  constructor(...e) {
    p(this, F, []);
    p(this, De, !1);
    a(this, "zero", () => (s(this, F).forEach((e) => e.zero()), this));
    a(this, "one", () => (this.zero(), this.x.one(), this));
    a(this, "opposite", () => (s(this, F).forEach((e) => e.opposite()), this));
    a(this, "add", (e) => (s(this, F).forEach((t, i) => t.add(e.array[i])), this));
    a(this, "subtract", (e) => this.add(e.clone().opposite()));
    a(this, "unit", () => {
      const e = this.norm;
      return e === 0 ? this : this.divideByScalar(e);
    });
    a(this, "dot", (e) => ns(this, e));
    a(this, "normal", () => {
      if (this.dimension >= 3)
        throw new Error("Normal vector can only be determined in 2D");
      const e = this.x.clone().opposite(), t = this.y.clone();
      return s(this, F)[0] = t, s(this, F)[1] = e, this;
    });
    a(this, "isEqual", (e) => is(this, e));
    a(this, "isColinearTo", (e) => ss(this, e));
    a(this, "isNormalTo", (e) => this.dot(e).isZero());
    a(this, "multiplyByScalar", (e) => {
      const t = new u(e);
      return this.array.forEach((i) => i.multiply(t)), this;
    });
    a(this, "divideByScalar", (e) => this.multiplyByScalar(new u(e).inverse()));
    a(this, "simplify", () => this.multiplyByScalar(
      W.lcm(...this.array.map((e) => e.denominator))
    ).divideByScalar(
      W.gcd(...this.array.map((e) => e.numerator))
    ).multiplyByScalar(
      this.x.isNegative() ? -1 : 1
    ));
    a(this, "angle", (e, t, i) => {
      let n = this.dot(e).value;
      return t && (n = Math.abs(n)), (i ? 1 : 180 / Math.PI) * Math.acos(n / (this.norm * e.norm));
    });
    a(this, "fromString", (e) => {
      e.startsWith("(") && (e = e.substring(1)), e.endsWith(")") && (e = e.substring(0, e.length - 1));
      const t = e.split(/[,;\s]/g).filter((i) => i.trim() !== "");
      return t.length < 2 ? this : (h(this, F, t.map((i) => new u(i))), this);
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
    h(this, F, e);
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
    return s(this, De);
  }
  set asPoint(e) {
    h(this, De, e);
  }
  get normSquare() {
    return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new u(0));
  }
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get tex() {
    return s(this, De) ? `\\left(${this.array.map((e) => e.tex).join(";")}\\right)` : `\\begin{pmatrix} ${this.array.map((e) => e.tex).join(" \\\\ ")} \\end{pmatrix}`;
  }
  get display() {
    return s(this, De) ? `(${this.array.map((e) => e.display).join(";")})` : `((${this.array.map((e) => e.display).join(",")}))`;
  }
  setDimension(e = 2) {
    if (e < 2)
      throw new Error("Dimension must be at least 2");
    if (e < this.dimension)
      h(this, F, s(this, F).slice(0, e));
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
    return h(this, De, e !== !1), this;
  }
  parse(...e) {
    if (e.length === 0)
      throw new Error("Invalid value");
    if (e.length === 1) {
      if (e[0] instanceof Se)
        return e[0].clone();
      if (typeof e[0] == "string")
        return this.fromString(e[0]);
      throw new Error("Invalid value");
    }
    if (e.length === 2) {
      const [t, i] = e;
      if (t instanceof Se && i instanceof Se) {
        if (t.dimension !== i.dimension)
          throw new Error("Vectors must have the same dimension");
        return h(this, F, i.array.map((n, r) => n.clone().subtract(t.array[r]))), this;
      }
    }
    return h(this, F, e.map((t) => new u(t))), this;
  }
  clone() {
    const e = new Se();
    return e.array = this.copy(), e.asPoint = this.asPoint, e;
  }
  copy() {
    return s(this, F).map((e) => e.clone());
  }
  middleOf(e, t) {
    if (e.dimension !== t.dimension)
      throw new Error("Vectors must be the same dimension");
    return this.array = [], e.array.forEach((i, n) => {
      this.array.push(i.clone().add(t.array[n]).divide(2));
    }), this;
  }
  translate(...e) {
    return this.array.forEach((t, i) => t.add(e[i])), this;
  }
  cross(e) {
    if (this.dimension !== 3 || e.dimension !== 3)
      throw new Error("Cross product can only be determined in 3D");
    return new Se(
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
    const t = new Se(this, e);
    return {
      value: t.norm,
      fraction: t.normSquare,
      tex: t.tex
    };
  }
};
F = new WeakMap(), De = new WeakMap();
let E = Se;
var we = /* @__PURE__ */ ((o) => (o.None = "none", o.Parallel = "parallel", o.Perpendicular = "perpendicular", o.Tangent = "tangent", o))(we || {}), hi = /* @__PURE__ */ ((o) => (o.None = "none", o.Parallel = "parallel", o.Perpendicular = "perpendicular", o.Tangent = "tangent", o))(hi || {});
function Mi(o = 0.5) {
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
  let i = de(o, e);
  for (; t.includes(i); )
    i = de(o, e);
  return i;
}
function Q(o, e) {
  return e === !1 ? Mi() ? de(1, o) : -de(1, o) : de(-o, o);
}
function os(o) {
  let e = W.primes();
  return o !== void 0 && (e = e.filter((t) => t < o)), pi(e);
}
function hs(o, e) {
  return e === void 0 && (e = 1), o.length <= 0 ? Object.values(o) : ki(o).slice(0, e);
}
function pi(o) {
  return o.length === 0 ? null : o[de(0, o.length - 1)];
}
function ki(o) {
  const e = Object.values(o);
  for (let t = e.length - 1; t > 0; t--) {
    const i = Math.floor(Math.random() * (t + 1)), n = e[t];
    e[t] = e[i], e[i] = n;
  }
  return e;
}
class B extends E {
  constructor(...e) {
    super(), e.length > 0 && this.parse(...e);
  }
  parse(...e) {
    if (this.asPoint = !0, e.length === 1) {
      if (e[0] instanceof E)
        return this.array = e[0].copy(), this;
      if (typeof e[0] == "string")
        return this.fromString(e[0]), this;
    }
    if (e.length > 1) {
      if (e.some((i) => i instanceof E))
        throw new Error("Creating a point with  multiple argument requires an input fraction");
      const t = e.map((i) => new u(i));
      if (t.some((i) => i.isNaN()))
        throw new Error("The value is not a valid point sting (a,b): " + e.join(","));
      this.array = t;
    }
    return this;
  }
  clone() {
    const e = new B();
    return e.array = this.copy(), e.asPoint = !0, e;
  }
}
var Ie, S, z, U, oe, K, Pe, be;
const Ze = class Ze {
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...e) {
    p(this, Ie);
    // ax + by + c = 0
    p(this, S);
    p(this, z);
    p(this, U);
    p(this, oe);
    p(this, K);
    p(this, Pe);
    p(this, be, "canonical");
    a(this, "randomPoint", (e) => {
      const t = s(this, K).clone().multiplyByScalar(Q(e === void 0 || e <= 1 ? 3 : e, !1)).add(s(this, oe));
      return t.asPoint = !0, t;
    });
    a(this, "randomNearPoint", (e) => {
      const t = this.randomPoint(e);
      let i = 10;
      for (; this.isOnLine(t) && i > 0; )
        t.x.add(Q(1, !1)), t.y.add(Q(1, !1)), i--;
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
        if (e[0] instanceof Ze)
          return this.fromCoefficient(e[0].a, e[0].b, e[0].c);
        if (e[0] instanceof X)
          return this.fromEquation(e[0]);
        if (typeof e[0] == "string")
          try {
            const t = new X(e[0]);
            return this.parse(t);
          } catch {
            return this;
          }
      }
      if (e.length === 2 && e.every((t) => t instanceof E)) {
        const t = e;
        if (t[0].asPoint && t[1].asPoint)
          return this.fromPointAndDirection(t[0], new E(t[0], t[1]));
        if (t[0].asPoint && !t[1].asPoint)
          return this.fromPointAndDirection(t[0], t[1]);
      }
      if (e.length === 3) {
        if (e[0] instanceof E && e[1] instanceof E) {
          if (e[2] === we.Perpendicular)
            return this.fromPointAndNormal(e[0], e[1]);
          if (e[2] === we.Parallel)
            return this.fromPointAndDirection(e[0], e[1]);
        }
        return e[0] instanceof E && e[1] instanceof Ze ? e[2] === we.Parallel || e[2] === null ? this.fromPointAndLine(e[0], e[1], we.Parallel) : this.fromPointAndLine(e[0], e[1], we.Perpendicular) : this.fromCoefficient(
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
    a(this, "fromCoefficient", (e, t, i) => (h(this, S, new u(e)), h(this, z, new u(t)), h(this, U, new u(i)), h(this, K, new E(s(this, z).clone(), s(this, S).clone().opposite())), h(this, oe, new E(new u().zero(), s(this, U).clone())), h(this, Pe, s(this, K).clone().normal()), this));
    a(this, "fromPointAndDirection", (e, t) => (this.fromCoefficient(
      t.y,
      t.x.clone().opposite(),
      e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)).opposite()
    ), h(this, oe, e.clone()), h(this, K, t.clone()), h(this, Pe, s(this, K).clone().normal()), this));
    a(this, "fromPointAndNormal", (e, t) => this.fromCoefficient(
      t.x,
      t.y,
      e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()
    ));
    a(this, "fromPointAndLine", (e, t, i) => (i === void 0 && (i = we.Parallel), i === we.Parallel ? this.fromPointAndNormal(e, t.normal) : i === we.Perpendicular ? this.fromPointAndNormal(e, t.director) : this));
    a(this, "clone", () => (h(this, S, s(this, S).clone()), h(this, z, s(this, z).clone()), h(this, U, s(this, U).clone()), h(this, K, s(this, K).clone()), h(this, oe, s(this, oe).clone()), h(this, Pe, s(this, Pe).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    a(this, "isOnLine", (e) => s(this, S).clone().multiply(e.x).add(
      s(this, z).clone().multiply(e.y)
    ).add(s(this, U)).isZero());
    a(this, "isParallelTo", (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height));
    a(this, "isSameAs", (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height));
    a(this, "isPerpendicularTo", (e) => this.d.isNormalTo(e.d));
    a(this, "isVertical", () => this.slope.isInfinity());
    a(this, "simplify", () => {
      const e = W.lcm(s(this, S).denominator, s(this, z).denominator, s(this, U).denominator), t = W.gcd(s(this, S).numerator, s(this, z).numerator, s(this, U).numerator);
      return this.fromCoefficient(
        s(this, S).clone().multiply(e).divide(t),
        s(this, z).clone().multiply(e).divide(t),
        s(this, U).clone().multiply(e).divide(t)
      ), this;
    });
    a(this, "simplifyDirection", () => (s(this, K).simplify(), this));
    a(this, "intersection", (e) => {
      const t = new B();
      let i = !1, n = !1;
      return s(this, z).isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new u().invalid(), t.y = new u().invalid(), i = !0) : this.isSameAs(e) ? (t.x = new u().invalid(), t.y = new u().invalid(), n = !0) : (t.x = s(this, z).clone().multiply(e.c).subtract(s(this, U).clone().multiply(e.b)).divide(s(this, S).clone().multiply(e.b).subtract(s(this, z).clone().multiply(e.a))), t.y = s(this, S).clone().multiply(e.c).subtract(s(this, U).clone().multiply(e.a)).divide(s(this, z).clone().multiply(e.a).subtract(s(this, S).clone().multiply(e.b)))), {
        point: t,
        hasIntersection: !(i || n),
        isParallel: i,
        isSame: n
      };
    });
    a(this, "getValueAtX", (e) => {
      const t = this.getEquation().isolate("y"), i = new u(e);
      return t instanceof X ? t.right.evaluate({ x: i }) : new u().invalid();
    });
    a(this, "getValueAtY", (e) => {
      const t = this.getEquation().isolate("x"), i = new u(e);
      return t instanceof X ? t.right.evaluate({ y: i }) : new u().invalid();
    });
    return h(this, S, new u().zero()), h(this, z, new u().zero()), h(this, U, new u().zero()), h(this, oe, new E()), h(this, K, new E()), h(this, Pe, new E()), h(this, Ie, !0), e.length > 0 && this.parse(...e), this;
  }
  get a() {
    return s(this, S);
  }
  // ------------------------------------------
  // Getter and setter
  set a(e) {
    h(this, S, e);
  }
  get b() {
    return s(this, z);
  }
  set b(e) {
    h(this, z, e);
  }
  get c() {
    return s(this, U);
  }
  set c(e) {
    h(this, U, e);
  }
  get OA() {
    return s(this, oe);
  }
  set OA(e) {
    h(this, oe, e);
  }
  get d() {
    return s(this, K);
  }
  set d(e) {
    h(this, K, e);
  }
  get n() {
    return s(this, Pe);
  }
  // ------------------------------------------
  getEquation() {
    const e = new X(new T().parse("xy", s(this, S), s(this, z), s(this, U)), new T("0"));
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
    return h(this, be, "canonical"), this;
  }
  get equation() {
    return h(this, be, "equation"), this;
  }
  get mxh() {
    return h(this, be, "mxh"), this;
  }
  get parametric() {
    return h(this, be, "parametric"), this;
  }
  get system() {
    return h(this, be, "system"), this;
  }
  get tex() {
    const e = s(this, be);
    switch (h(this, be, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().tex;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new T().parse("x", this.slope, this.height).tex;
      case "parametric":
      case "system": {
        const t = s(this, K).clone();
        return s(this, Ie) && t.simplify(), e === "parametric" ? `${E.asTex("x", "y")} = ${E.asTex(s(this, oe).x.tex, s(this, oe).y.tex)} + k\\cdot ${E.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}
            x &= ${new T(s(this, oe).x).add(new k(s(this, K).x).multiply(new k("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new T(s(this, oe).y).add(new k(s(this, K).y).multiply(new k("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`;
      }
      default: {
        const t = this.getEquation();
        return s(this, S).isNegative() && t.multiply(-1), t.tex;
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
    const e = s(this, be);
    switch (h(this, be, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().display;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new T().parse("x", this.slope, this.height).display;
      case "parametric": {
        const t = s(this, K).clone();
        return s(this, Ie) && t.simplify(), `((x,y))=((${s(this, oe).x.display},${s(this, oe).y.display}))+k((${t.x.display},${t.y.display}))`;
      }
      default: {
        const t = this.getEquation();
        return s(this, S).isNegative() && t.multiply(-1), t.display;
      }
    }
  }
  get normal() {
    return new E(s(this, S), s(this, z));
  }
  get director() {
    return s(this, K).clone();
  }
  get slope() {
    return s(this, S).clone().opposite().divide(s(this, z));
  }
  get height() {
    return s(this, U).clone().opposite().divide(s(this, z));
  }
  fromPoints(e, t) {
    return this.fromPointAndDirection(e, new E(e, t));
  }
  distanceTo(e) {
    const t = e.x.clone().multiply(s(this, S)).add(e.y.clone().multiply(s(this, z))).add(s(this, U)).abs(), i = this.normal.normSquare;
    if (i.isZero())
      return {
        value: NaN,
        tex: "Not a line",
        fraction: new u().infinite()
      };
    const n = t.value / Math.sqrt(i.value), r = t.clone().divide(i.clone().sqrt());
    return i.isSquare() ? {
      value: n,
      tex: r.tex,
      fraction: r
    } : {
      value: n,
      tex: `\\frac{${t.tex}}{\\sqrt{${i.tex}}}`,
      fraction: r
    };
  }
  hitSegment(e, t) {
    const i = this.intersection(
      new Ze().fromPoints(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) : !1;
  }
  // ------------------------------------------
  // Special functions
  // ------------------------------------------
  canonicalAsFloatCoefficient(e) {
    e === void 0 && (e = 2);
    let t = "";
    return s(this, S).isZero() || (s(this, S).isOne() ? t = "x" : s(this, S).clone().opposite().isOne() ? t = "-x" : t = s(this, S).value.toFixed(e) + "x"), s(this, z).isZero() || (s(this, z).isPositive() && (t += "+"), t += s(this, z).value.toFixed(e) + "y"), s(this, U).isZero() || (s(this, U).isPositive() && (t += "+"), t += s(this, U).value.toFixed(e)), t + "=0";
  }
};
Ie = new WeakMap(), S = new WeakMap(), z = new WeakMap(), U = new WeakMap(), oe = new WeakMap(), K = new WeakMap(), Pe = new WeakMap(), be = new WeakMap(), // A line is defined as the canonical form
a(Ze, "PERPENDICULAR", we.Perpendicular), a(Ze, "PARALLEL", we.Parallel);
let R = Ze;
var he, j, qe, Ut, Wt, Gt, ae, Ci, Nt, $i, Ii, Pi, ai;
const Ht = class Ht {
  constructor(...e) {
    p(this, ae);
    p(this, he);
    p(this, j);
    p(this, qe);
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    a(this, "relativePosition", (e) => {
      if (s(this, he) === void 0 || s(this, j) === void 0)
        throw new Error("Circle not defined");
      const t = e.distanceTo(s(this, he)), i = Math.sqrt(s(this, j).value);
      return t.value - i > 1e-10 ? 0 : Math.abs(t.value - i) < 1e-10 ? 1 : 2;
    });
    a(this, "lineIntersection", (e) => {
      const t = [];
      if (s(this, qe) === void 0)
        return [];
      const i = s(this, qe).clone(), n = e.getEquation().clone().isolate("x"), r = e.getEquation().clone().isolate("y");
      return n instanceof X && r instanceof X && (i.replaceBy("y", r.right).simplify(), i.solve()), t;
    });
    a(this, "tangents", (e) => e instanceof u ? s(this, Gt).call(this, e) : this.isPointOnCircle(e) ? s(this, Ut).call(this, e) : s(this, he) !== void 0 && s(this, he).distanceTo(e).value > this.radius.value ? s(this, Wt).call(this, e) : (console.log("No tangents as the point is inside !"), []));
    a(this, "isPointOnCircle", (e) => {
      var t;
      return ((t = s(this, qe)) == null ? void 0 : t.test({ x: e.x, y: e.y })) ?? !1;
    });
    a(this, "getPointsOnCircle", (e) => {
      const t = W.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), i = [];
      return t.forEach((n) => {
        for (const r of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
          i.push(
            new B(
              this.center.x.clone().add(r[0] * n[0]),
              this.center.y.clone().add(r[1] * n[1])
            )
          );
      }), i;
    });
    p(this, Ut, (e) => {
      const t = new E(this.center, e);
      return [new R(e, t, we.Perpendicular)];
    });
    p(this, Wt, (e) => {
      const t = this.center.x.clone().subtract(e.x), i = this.center.y.clone().subtract(e.y), n = new T("x"), r = new T("x^2+1");
      return n.multiply(t).subtract(i).pow(2), r.multiply(this.squareRadius), new X(n, r).solve().map((d) => {
        let f;
        const g = new X("y", "x");
        return d.exact instanceof u ? (f = e.x.clone().opposite().multiply(d.exact).add(e.y), g.right.multiply(d.exact).add(f)) : (f = e.x.clone().opposite().multiply(d.value).add(e.y), g.right.multiply(d.value).add(f)), new R(g);
      });
    });
    p(this, Gt, (e) => {
      const t = e.numerator, i = -e.denominator, n = this.center.x.clone(), r = this.center.y.clone(), l = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), c = n.clone().multiply(t).opposite().subtract(r.clone().multiply(i)).add(l.clone().sqrt()), d = n.clone().multiply(t).opposite().subtract(r.clone().multiply(i)).subtract(l.clone().sqrt());
      return [new R(t, i, c), new R(t, i, d)];
    });
    e.length > 0 && this.parse(...e);
  }
  get center() {
    return s(this, he) ?? new B();
  }
  get squareRadius() {
    return s(this, j) ?? new u(0);
  }
  get cartesian() {
    if (s(this, qe) === void 0)
      throw new Error("Cartesian equation not defined");
    return s(this, qe);
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
    return new Ht(
      this.center.clone(),
      this.squareRadius.clone(),
      !0
    );
  }
  setRadius(e, t) {
    return t ? h(this, j, new u(e)) : h(this, j, new u(e).pow(2)), A(this, ae, Nt).call(this), this;
  }
  parse(...e) {
    return A(this, ae, Ci).call(this), typeof e[0] == "string" ? A(this, ae, ai).call(this, new X(e[0])) : e[0] instanceof X ? A(this, ae, ai).call(this, e[0]) : e[0] instanceof Ht ? A(this, ae, $i).call(this, e[0]) : e[0] instanceof B && e.length > 1 && (e[1] instanceof B ? e[2] instanceof B || A(this, ae, Pi).call(this, e[0], e[1]) : (e[1] instanceof u || typeof e[1] == "number") && A(this, ae, Ii).call(this, e[0], e[1], typeof e[2] == "boolean" ? e[2] : !1)), A(this, ae, Nt).call(this), this;
  }
  // private _parseThroughtThreePoints(A: Point, B: Point, C: Point): this {
  //     const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(),
  //         mAC = T.remarquables.mediators.AC.clone()
  //     this.parse(mAB.intersection(mAC).point, A)
  //     return this
  // }
};
he = new WeakMap(), j = new WeakMap(), qe = new WeakMap(), Ut = new WeakMap(), Wt = new WeakMap(), Gt = new WeakMap(), ae = new WeakSet(), Ci = function() {
  return h(this, he, void 0), h(this, j, void 0), h(this, qe, void 0), this;
}, Nt = function() {
  h(this, qe, new X(
    new T(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
    new T(this.squareRadius.display)
  ).moveLeft());
}, $i = function(e) {
  return h(this, he, e.center.clone()), h(this, j, e.squareRadius.clone()), A(this, ae, Nt).call(this), this;
}, Ii = function(e, t, i) {
  return h(this, he, e.clone()), i ? h(this, j, new u(t)) : h(this, j, new u(t).pow(2)), this;
}, Pi = function(e, t) {
  return h(this, he, e.clone()), h(this, j, new E(s(this, he), t).normSquare), this;
}, ai = function(e) {
  if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
    const t = e.left.monomByDegree(2, "x"), i = e.left.monomByDegree(2, "y");
    let n, r, l;
    t.coefficient.isEqual(i.coefficient) ? (e.divide(t.coefficient), n = e.left.monomByDegree(1, "x"), r = e.left.monomByDegree(1, "y"), l = e.left.monomByDegree(0), h(this, he, new B(n.coefficient.clone().divide(2).opposite(), r.coefficient.clone().divide(2).opposite())), h(this, j, l.coefficient.clone().opposite().add(s(this, he).x.clone().pow(2)).add(s(this, he).y.clone().pow(2)))) : (h(this, he, void 0), h(this, j, void 0));
  }
  return this;
};
let Tt = Ht;
var L, H;
const ut = class ut {
  constructor(e, t) {
    // ax + by + c = 0
    p(this, L, new B());
    p(this, H, new E());
    a(this, "clone", () => (h(this, H, s(this, H).clone()), h(this, L, s(this, L).clone()), this));
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
      const t = s(this, L).clone(), i = new u(Q(e, !1));
      return new B(
        t.x.clone().add(s(this, H).x.clone().multiply(i)),
        t.y.clone().add(s(this, H).y.clone().multiply(i)),
        t.z.clone().add(s(this, H).z.clone().multiply(i))
      );
    });
    return h(this, L, e.clone()), h(this, H, t.asPoint ? new E(e, t) : t.clone()), this;
  }
  get OA() {
    return s(this, L);
  }
  set OA(e) {
    h(this, L, e);
  }
  get point() {
    return s(this, L).clone();
  }
  get d() {
    return s(this, H);
  }
  set d(e) {
    h(this, H, e);
  }
  get tex() {
    return {
      parametric: `${E.asTex("x", "y", "z")} = ${E.asTex(s(this, L).x.tex, s(this, L).y.tex, s(this, L).z.tex)} + k\\cdot ${E.asTex(s(this, H).x.tex, s(this, H).y.tex, s(this, H).z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new T(s(this, L).x).add(new k(s(this, H).x).multiply(new k("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new T(s(this, L).y).add(new k(s(this, H).y).multiply(new k("k"))).reorder("k", !0).tex}\\\\
    z &= ${new T(s(this, L).z).add(new k(s(this, H).z).multiply(new k("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
      cartesian: `\\frac{ ${new T("x", 1, s(this, L).x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new T("y", 1, s(this, L).y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new T("z", 1, s(this, L).z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
    };
  }
  get display() {
    const e = s(this, L).x.display, t = s(this, L).y.display, i = s(this, L).z.display, n = this.direction.simplify(), r = n.x.display, l = n.y.display, c = n.z.display;
    return {
      parametric: `${E.asDisplay("x", "y", "z")} = ${E.asDisplay(s(this, L).x.display, s(this, L).y.display, s(this, L).z.display)} + k\\cdot ${E.asDisplay(s(this, H).x.display, s(this, H).y.display, s(this, H).z.display)}`,
      system: "",
      cartesian: `(x-${e})/${r} = (y-${t})/${l} = (z-${i})/${c}`
    };
  }
  get direction() {
    return s(this, H).clone();
  }
  distanceTo(e) {
    const t = new E(s(this, L), e), i = this.direction, n = this.direction.normSquare, r = t.cross(i).normSquare, l = r.clone().divide(n), c = l.clone().sqrt();
    return console.log("CROSS", t.cross(i).display), {
      value: Math.sqrt(l.value),
      fraction: l.clone().sqrt(),
      tex: c.isExact() ? c.tex : `\\sqrt{${l.tex}}`
    };
  }
  hitSegment(e, t) {
    const i = this.intersection(
      new ut(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) && i.point.z.value >= Math.min(e.z.value, t.z.value) && i.point.z.value <= Math.max(e.z.value, t.z.value) : !1;
  }
};
L = new WeakMap(), H = new WeakMap(), // A line is defined as the canonical form
a(ut, "PERPENDICULAR", hi.Perpendicular), a(ut, "PARALLEL", hi.Parallel);
let At = ut;
var Me;
class as {
  constructor(...e) {
    p(this, Me, []);
    return h(this, Me, e), this;
  }
  get values() {
    return s(this, Me);
  }
  get array() {
    return s(this, Me).map((e) => e.array);
  }
  get dimension() {
    return [s(this, Me).length, s(this, Me)[0].dimension];
  }
  isSquare() {
    return s(this, Me).length === s(this, Me)[0].dimension;
  }
  determinant() {
    if (!this.isSquare())
      throw new Error("Matrix is not square");
    return rs(...this.values);
  }
}
Me = new WeakMap();
var ke, We;
const gi = class gi {
  constructor(e) {
    p(this, ke, new E(0, 0, 1));
    p(this, We, new B(0, 0, 0));
    return e && this.parse(e), this;
  }
  get normal() {
    return s(this, ke);
  }
  set normal(e) {
    h(this, ke, e), s(this, ke).asPoint = !1;
  }
  get point() {
    return s(this, We);
  }
  set point(e) {
    h(this, We, e), s(this, We).asPoint = !0;
  }
  get a() {
    return s(this, ke).x;
  }
  get b() {
    return s(this, ke).y;
  }
  get c() {
    return s(this, ke).z;
  }
  get d() {
    return s(this, ke).dot(s(this, We)).opposite();
  }
  get tex() {
    return new X(
      new T("xyz", this.a, this.b, this.c, this.d),
      new T(0)
    ).reduce().tex;
  }
  parse(e) {
    var t, i, n;
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
      const r = e.equation.moveLeft().reduce().left, l = r.monomByLetter("x").coefficient, c = r.monomByLetter("y").coefficient, d = r.monomByLetter("z").coefficient, f = r.monomByDegree(0).coefficient;
      this.normal = new E(l, c, d), l.isNotZero() ? this.point = new B(f.clone().divide(l).opposite(), 0, 0) : c.isNotZero() ? this.point = new B(0, f.clone().divide(c).opposite(), 0) : this.point = new B(0, 0, f.clone().divide(d).opposite());
      return;
    }
    if (((i = e.points) == null ? void 0 : i.length) === 3 && e.points.every((r) => r instanceof E)) {
      const r = e.points[0], l = e.points[1], c = e.points[2], d = new E(r, l), f = new E(r, c);
      this.normal = d.cross(f), this.point = r;
      return;
    }
    if (((n = e.coefficients) == null ? void 0 : n.length) === 4) {
      const [r, l, c, d] = e.coefficients;
      this.normal = new E(r, l, c), this.point = new B(0, 0, -d);
      return;
    }
  }
  angle(e, t, i) {
    if (e instanceof gi)
      return this.normal.angle(e.normal, t, i);
    let n;
    if (e instanceof E) {
      if (e.dimension !== 3)
        throw new Error("Vector is not 3D");
      n = e;
    } else
      n = e.direction;
    return (i ? Math.PI / 2 : 90) - this.normal.angle(n, !0, i);
  }
  distanceTo(e) {
    return this.normal.dot(e).add(this.d).abs().value / this.normal.norm;
  }
  intersectWithLine(e) {
    const { point: t, direction: i } = e, n = this.normal.dot(t).add(this.d).divide(this.normal.dot(i).opposite());
    return t.clone().add(i.clone().multiplyByScalar(n));
  }
  intersectWithPlane(e) {
    throw this.normal.cross(e.normal), new B(0, 0, 0), new Error("Intersection with plane  not yet implemented !");
  }
  isPointOnPlane(e) {
    return this.normal.dot(e).add(this.d).isZero();
  }
};
ke = new WeakMap(), We = new WeakMap();
let li = gi;
var Y, J, _, st, Ce, wt, Xt, vt, Be, Yt, nt;
const Qt = class Qt {
  constructor(...e) {
    p(this, Y, new B());
    p(this, J, new B());
    p(this, _, new B());
    p(this, st, {
      AB: new R(),
      AC: new R(),
      BC: new R()
    });
    p(this, Ce, {
      AB: new B(),
      AC: new B(),
      BC: new B()
    });
    p(this, wt, null);
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
        const t = e.map((i) => new u(i));
        if (t.some((i) => i.isNaN()))
          throw new Error("One of the values is not a valid number");
        return this.parse(
          new E(t[0], t[1]),
          new E(t[2], t[3]),
          new E(t[4], t[5])
        );
      } else if (e.length === 3) {
        if (e.every((t) => typeof t == "string"))
          return this.parse(
            ...e.map((t) => new R(t))
          );
        if (e.every((t) => t instanceof R)) {
          const t = e[0].clone(), i = e[1].clone(), n = e[2].clone();
          h(this, st, { AB: t, BC: i, AC: n });
          let r = t.intersection(i);
          if (r.hasIntersection)
            h(this, J, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (r = i.intersection(n), r.hasIntersection)
            h(this, _, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (r = n.intersection(t), r.hasIntersection)
            h(this, Y, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
        } else e.every((t) => t instanceof B) && (h(this, Y, e[0].clone()), h(this, J, e[1].clone()), h(this, _, e[2].clone()), h(this, st, {
          AB: new R(s(this, Y), s(this, J)),
          BC: new R(s(this, J), s(this, _)),
          AC: new R(s(this, Y), s(this, _))
        }));
      } else if (e.length === 1 && e[0] instanceof Qt)
        return e[0].clone();
      return s(this, Xt).call(this), this;
    });
    /**
     * Clone the Triangle class
     */
    a(this, "clone", () => new Qt(
      s(this, Y).clone(),
      s(this, J).clone(),
      s(this, _).clone()
    ));
    // ------------------------------------------
    // Triangle operations and properties
    // ------------------------------------------
    /**
     * Generate the Line object for the three segments of the triangle
     */
    p(this, Xt, () => {
      s(this, Y).asPoint = !0, s(this, J).asPoint = !0, s(this, _).asPoint = !0, h(this, Ce, {
        AB: new B().middleOf(s(this, Y), s(this, J)),
        AC: new B().middleOf(s(this, Y), s(this, _)),
        BC: new B().middleOf(s(this, J), s(this, _))
      }), h(this, wt, s(this, Yt).call(this));
    });
    /**
     * Get the Vector2D class for the given name
     * @param ptName
     */
    p(this, vt, (e) => {
      switch (e.toUpperCase()) {
        case "A":
          return s(this, Y);
        case "B":
          return s(this, J);
        case "C":
          return s(this, _);
      }
      return s(this, Y);
    });
    /**
     * Get the vector for the segment given by name.
     * @param ptName1
     * @param ptName2
     */
    p(this, Be, (e, t) => new E(
      s(this, vt).call(this, e),
      s(this, vt).call(this, t)
    ));
    p(this, Yt, () => {
      const e = {
        A: new R().fromPoints(s(this, Y), s(this, Ce).BC),
        B: new R().fromPoints(s(this, J), s(this, Ce).AC),
        C: new R().fromPoints(s(this, _), s(this, Ce).AB),
        intersection: null
      }, t = {
        AB: new R().fromPointAndNormal(s(this, Ce).AB, new E(s(this, Y), s(this, J)).normal()),
        AC: new R().fromPointAndNormal(s(this, Ce).AC, new E(s(this, Y), s(this, _)).normal()),
        BC: new R().fromPointAndNormal(s(this, Ce).BC, new E(s(this, J), s(this, _)).normal()),
        intersection: null
      }, i = {
        A: new R().fromPointAndNormal(s(this, Y), new E(s(this, J), s(this, _)).normal()),
        B: new R().fromPointAndNormal(s(this, J), new E(s(this, Y), s(this, _)).normal()),
        C: new R().fromPointAndNormal(s(this, _), new E(s(this, Y), s(this, J)).normal()),
        intersection: null
      }, n = s(this, nt).call(this, "A"), r = s(this, nt).call(this, "B"), l = s(this, nt).call(this, "C"), c = {
        A: n.internal,
        B: r.internal,
        C: r.internal,
        intersection: null
      }, d = {
        A: n.external,
        B: r.external,
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
    p(this, nt, (e) => {
      const t = this.lines;
      let i, n;
      if (e === "A" ? (i = t.AB, n = t.AC) : e === "B" ? (i = t.AB, n = t.BC) : e === "C" && (i = t.BC, n = t.AC), i === void 0 || n === void 0)
        throw new Error(`The point ${e} does not exist`);
      const r = i.n.simplify().norm, l = n.n.simplify().norm, c = i.getEquation().multiply(l), d = n.getEquation().multiply(r), f = new R(c.clone().subtract(d).simplify()), g = new R(d.clone().subtract(c).simplify());
      return e === "A" ? f.hitSegment(this.B, this.C) ? { internal: f, external: g } : { internal: g, external: f } : e === "B" ? f.hitSegment(this.A, this.C) ? { internal: f, external: g } : { internal: g, external: f } : e === "C" ? f.hitSegment(this.B, this.A) ? { internal: f, external: g } : { internal: g, external: f } : { internal: f, external: g };
    });
    return e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setters
  // ------------------------------------------
  get A() {
    return s(this, Y);
  }
  get B() {
    return s(this, J);
  }
  get C() {
    return s(this, _);
  }
  get AB() {
    return s(this, Be).call(this, "A", "B");
  }
  get BA() {
    return s(this, Be).call(this, "B", "A");
  }
  get BC() {
    return s(this, Be).call(this, "B", "C");
  }
  get CB() {
    return s(this, Be).call(this, "C", "B");
  }
  get AC() {
    return s(this, Be).call(this, "A", "C");
  }
  get CA() {
    return s(this, Be).call(this, "C", "A");
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
    return s(this, st);
  }
  get remarquables() {
    return s(this, wt);
  }
};
Y = new WeakMap(), J = new WeakMap(), _ = new WeakMap(), st = new WeakMap(), Ce = new WeakMap(), wt = new WeakMap(), Xt = new WeakMap(), vt = new WeakMap(), Be = new WeakMap(), Yt = new WeakMap(), nt = new WeakMap();
let ci = Qt;
function qt(o) {
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
  if (e.negative ? t.numerator = Q(e.max, e.zero) : t.numerator = de(e.zero ? 0 : 1, e.max), e.natural)
    t.denominator = 1;
  else {
    let i = 0;
    for (; t.isRelative() && i < 10; )
      t.denominator = de(1, e.max), i++;
  }
  return e.reduced ? t.reduce() : t;
}
function Bi(o) {
  const e = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    o
  ), t = new k();
  if (t.coefficient = qt({
    zero: e.zero,
    reduced: !0,
    natural: !e.fraction
  }), e.letters.length > 1) {
    for (const i of e.letters.split(""))
      t.setLetter(i, 0);
    for (let i = 0; i < e.degree; i++) {
      const n = pi(e.letters.split(""));
      t.setLetter(n, t.degree(n).clone().add(1));
    }
  } else
    t.setLetter(e.letters, e.degree);
  return t;
}
const ls = {
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
function Si(o) {
  const e = Object.assign(
    ls,
    o
  ), t = new T().empty();
  let i;
  for (let n = e.degree; n >= 0; n--)
    i = Bi({
      letters: e.letters,
      degree: n,
      fraction: e.fraction,
      zero: n === e.degree ? !1 : e.allowNullMonom
    }), e.unit && e.degree === n && i.coefficient.one(), t.add(i);
  if (e.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposite(), e.numberOfMonoms && e.numberOfMonoms > 0 && e.numberOfMonoms < t.length)
    for (; t.length > e.numberOfMonoms; ) {
      const n = de(1, t.length - 1);
      t.monoms.splice(n, 1);
    }
  return t.reduce();
}
function cs(o) {
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
  ), t = new T().one();
  for (let i = 0; i < e.degree; i++) {
    const n = Si({
      degree: 1,
      unit: e.unit,
      fraction: e.fraction,
      letters: e.letters,
      zero: e.zero
    });
    t.multiply(n);
  }
  return new X(t, 0);
}
function ui(o) {
  const e = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    o
  ), t = e.axis === "x", i = e.axis === "y", n = e.fraction ? qt({ max: e.max, zero: t }) : new u(Q(e.max, t)), r = e.fraction ? qt({ max: e.max, zero: i }) : new u(Q(e.max, i));
  return Number(e.quadrant) === 1 && (n.abs(), r.abs()), Number(e.quadrant) === 2 && (n.isPositive() && n.opposite(), r.isNegative() && r.opposite()), Number(e.quadrant) === 3 && (n.isPositive() && n.opposite(), r.isPositive() && r.opposite()), Number(e.quadrant) === 4 && (n.isNegative() && n.opposite(), r.isPositive() && r.opposite()), new B(n, r);
}
function us(o) {
  const e = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    o
  ), t = ui(e.center);
  let i, n;
  return e.pointsOnCircle === 8 ? (i = de(1, 3), n = i ** 2 + (i + 1) ** 2) : n = de(1, 20), new Tt(t, n, !0);
}
function fs(o) {
  const e = Object.assign(
    {
      A: {
        x: Q(10),
        y: Q(10)
      }
    },
    o
  ), t = new E(
    Q(10),
    Q(10)
  );
  for (; t.isNull; )
    t.x = Q(10), t.y = Q(10);
  return e.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposite() : e.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposite(), new R(new E(e.A.x, e.A.y), t);
}
function ds(o) {
  const e = Object.assign(
    {
      A: {
        x: Q(10),
        y: Q(10),
        z: Q(10)
      },
      direction: {
        x: Q(10),
        y: Q(10),
        z: Q(10)
      }
    },
    o
  ), t = new B(e.A.x, e.A.y, e.A.z), i = new E(e.direction.x, e.direction.y, e.direction.z);
  return new At(t, i);
}
const ps = {
  equation: (o) => cs(o),
  polynom: (o) => Si(o),
  monom: (o) => Bi(o),
  fraction: (o) => qt(o),
  number: (o, e, t) => de(o, e, t),
  numberSym: (o, e) => Q(o, e),
  prime: (o) => os(o),
  bool: (o) => Mi(o),
  array: (o, e) => hs(o, e),
  item: (o) => pi(o),
  shuffle: (o) => ki(o),
  line: (o) => fs(o),
  line3: (o) => ds(o),
  vector: (o) => ui(o),
  point: (o) => {
    const e = ui(o);
    return e.asPoint = !0, e;
  },
  circle: (o) => us(o)
}, gs = {
  Numeric: W,
  Fraction: u,
  Root: bt,
  Monom: k,
  Polynom: T,
  Equation: X,
  Matrix: as,
  LinearSystem: ii,
  Factor: ie,
  PolyFactor: ni,
  LogicalSet: ts,
  Random: ps,
  Geometry: {
    Vector: E,
    Point: B,
    Line: R,
    Triangle: ci,
    Circle: Tt,
    Line3: At,
    Plane3: li
  },
  NumExp: es
};
export {
  Tt as Circle,
  X as Equation,
  Ot as EquationSolver,
  ct as FACTOR_DISPLAY,
  ie as Factor,
  u as Fraction,
  R as Line,
  At as Line3,
  ii as LinearSystem,
  ts as LogicalSet,
  as as Matrix,
  k as Monom,
  bt as NthRoot,
  es as NumExp,
  W as Numeric,
  li as Plane3,
  B as Point,
  ni as PolyFactor,
  T as Polynom,
  ps as Random,
  ci as Triangle,
  E as Vector,
  ss as areVectorsColinears,
  is as areVectorsEquals,
  gs as default,
  rs as determinant,
  ns as dotProduct
};
//# sourceMappingURL=pimath.js.map
