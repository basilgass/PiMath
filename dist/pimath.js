var Xi = Object.defineProperty;
var Ni = (o) => {
  throw TypeError(o);
};
var Yi = (o, e, t) => e in o ? Xi(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var a = (o, e, t) => Yi(o, typeof e != "symbol" ? e + "" : e, t), ri = (o, e, t) => e.has(o) || Ni("Cannot " + t);
var s = (o, e, t) => (ri(o, e, "read from private field"), t ? t.call(o) : e.get(o)), m = (o, e, t) => e.has(o) ? Ni("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), h = (o, e, t, i) => (ri(o, e, "write to private field"), i ? i.call(o, t) : e.set(o, t), t), A = (o, e, t) => (ri(o, e, "access private method"), t);
function Qi(o) {
  const e = Ai(o), t = [];
  let i, n;
  for (; e.length > 0; )
    i = e.shift() ?? 1, n = (e.length > 0 ? e.pop() : +i) ?? 1, t.push([i, n]);
  return t;
}
function Hi(...o) {
  const e = wi(...o);
  return o.map((t) => t / e);
}
function Ai(o) {
  const e = Math.abs(o), t = Math.sqrt(e), i = [];
  for (let n = 1; n <= t; n++)
    o % n === 0 && (i.push(n), i.push(e / n));
  return i.sort(function(n, r) {
    return n - r;
  }), [...new Set(i)];
}
function wi(...o) {
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
function Ki(...o) {
  return o.reduce(function(e, t) {
    return Math.abs(e * t / wi(e, t));
  });
}
function Ji(o, e = 3) {
  return +o.toFixed(e);
}
function _i(o) {
  if (Number.isSafeInteger(o) || o.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function es(o) {
  const e = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return o === void 0 ? e : e.slice(0, Math.min(e.length, o));
}
function ts(o, e) {
  const t = [], i = e === !0 ? +o : o ** 2;
  for (let n = 0; n <= o; n++)
    for (let r = 0; r <= o; r++)
      n ** 2 + r ** 2 === i && t.push([n, r, o]);
  return t;
}
function is(o, e = 2) {
  return +`${Math.round(+`${o}e${e}`)}e-${e}`;
}
const G = {
  decompose: Qi,
  dividers: Ai,
  divideNumbersByGCD: Hi,
  gcd: wi,
  lcm: Ki,
  numberCorrection: Ji,
  periodic: _i,
  primes: es,
  pythagoreanTripletsWithTarget: ts,
  round: is
};
var mt, x, v, Le;
const B = class B {
  constructor(e, t) {
    m(this, mt, !1);
    m(this, x, 1);
    m(this, v, 1);
    m(this, Le, "frac");
    // ------------------------------------------
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    a(this, "parse", (e, t) => {
      let i;
      if (e === "")
        return h(this, v, 0), h(this, x, 1), this;
      switch (typeof e) {
        case "string":
          if (i = e.split("/"), i.length > 2)
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (i.map((n) => n === "" || isNaN(Number(n))).includes(!0))
            throw new Error(`The given value is not a valid fraction (${e})`);
          if (i.length === 1)
            return this.parse(+i[0]);
          i.length === 2 ? i[1] === "0" ? (h(this, v, NaN), h(this, x, 1)) : (h(this, v, +i[0]), h(this, x, +i[1])) : (h(this, v, NaN), h(this, x, 1));
          break;
        case "number":
          if (Number.isSafeInteger(e))
            h(this, v, +e), t === void 0 || !Number.isSafeInteger(t) ? h(this, x, 1) : h(this, x, +t);
          else {
            const [, n] = e.toString().split("."), r = n ? n.length : 0;
            t === void 0 ? (h(this, v, e * Math.pow(10, r)), h(this, x, Math.pow(10, r))) : Number.isSafeInteger(t) && (h(this, v, e * Math.pow(10, r) - Math.floor(e * Math.pow(10, r - t))), this.denominator = Math.pow(10, r) - Math.pow(10, r - t)), this.reduce();
          }
          break;
        case "object":
          e instanceof B && (h(this, v, +e.numerator), h(this, x, +e.denominator));
          break;
      }
      return this;
    });
    a(this, "clone", () => {
      const e = new B();
      return e.numerator = +s(this, v), e.denominator = +s(this, x), e;
    });
    a(this, "abs", () => (h(this, v, Math.abs(s(this, v))), h(this, x, Math.abs(s(this, x))), this));
    a(this, "add", (e) => {
      if (e instanceof B) {
        const t = s(this, v), i = s(this, x);
        h(this, v, t * e.denominator + e.numerator * i), h(this, x, i * e.denominator);
      } else
        return this.add(new B(e));
      return this.reduce();
    });
    a(this, "amplify", (e) => (Number.isSafeInteger(e) && (h(this, v, s(this, v) * e), h(this, x, s(this, x) * e)), this));
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
      const i = +s(this, v), n = +s(this, x);
      return h(this, v, i * t.denominator), h(this, x, n * t.numerator), this.reduce();
    });
    a(this, "infinite", () => (h(this, v, 1 / 0), h(this, x, 1), this));
    a(this, "invalid", () => (h(this, v, NaN), h(this, x, 1), this));
    a(this, "inverse", () => {
      const e = +s(this, v);
      return h(this, v, +s(this, x)), h(this, x, e), this;
    });
    a(this, "isApproximative", () => s(this, mt) || s(this, v).toString().length >= 15 && s(this, x).toString().length >= 15);
    a(this, "isEqual", (e) => this.compare(e, "="));
    a(this, "isEven", () => this.isRelative() && this.value % 2 === 0);
    a(this, "isExact", () => !this.isApproximative());
    a(this, "isFinite", () => !this.isInfinity() && !this.isNaN());
    a(this, "isGeq", (e) => this.compare(e, ">="));
    a(this, "isGreater", (e) => this.compare(e, ">"));
    a(this, "isInfinity", () => Math.abs(s(this, v)) === 1 / 0);
    a(this, "isInverted", (e) => this.isEqual(new B().one().divide(e.clone())));
    a(this, "isLeq", (e) => this.compare(e, "<="));
    /* Compare shortcuts */
    a(this, "isLesser", (e) => this.compare(e, "<"));
    a(this, "isNaN", () => isNaN(s(this, v)));
    a(this, "isNatural", () => this.isRelative() && this.isPositive());
    a(this, "isNegative", () => this.sign() === -1);
    a(this, "isNegativeOne", () => s(this, v) === -1 && s(this, x) === 1);
    a(this, "isNotEqual", (e) => this.compare(e, "<>"));
    // ------------------------------------------
    a(this, "isNotZero", () => s(this, v) !== 0);
    a(this, "isOdd", () => this.isRelative() && this.value % 2 === 1);
    a(this, "isOne", () => s(this, v) === 1 && s(this, x) === 1);
    a(this, "isOpposite", (e) => this.isEqual(e.clone().opposite()));
    a(this, "isPositive", () => this.sign() === 1);
    a(this, "isRational", () => !this.isRelative());
    a(this, "isReduced", () => Math.abs(G.gcd(s(this, v), s(this, x))) === 1);
    a(this, "isRelative", () => this.clone().reduce().denominator === 1);
    a(this, "isSquare", () => Math.sqrt(s(this, v)) % 1 === 0 && Math.sqrt(s(this, x)) % 1 === 0);
    a(this, "isStrictlyNegative", () => this.value < 0);
    a(this, "isStrictlyPositive", () => this.value > 0);
    // Mathematical operations specific to fractions
    a(this, "isZero", () => s(this, v) === 0);
    a(this, "multiply", (e) => {
      const t = new B(e);
      return h(this, v, s(this, v) * t.numerator), h(this, x, s(this, x) * t.denominator), this.reduce();
    });
    a(this, "one", () => (h(this, v, 1), h(this, x, 1), this));
    a(this, "opposite", () => (h(this, v, -s(this, v)), this));
    a(this, "pow", (e) => {
      if (e instanceof B)
        return this.pow(e.value);
      this.reduce(), e < 0 && this.inverse();
      const t = Math.floor(Math.pow(s(this, v), Math.abs(e))), i = Math.floor(Math.pow(s(this, x), Math.abs(e)));
      return t ** Math.abs(e) === s(this, v) && i ** Math.abs(e) === s(this, x) ? (h(this, v, s(this, v) ** Math.abs(e)), h(this, x, s(this, x) ** Math.abs(e))) : (h(this, v, s(this, v) ** Math.abs(e)), h(this, x, s(this, x) ** Math.abs(e))), this;
    });
    // ------------------------------------------
    a(this, "reduce", () => {
      const e = G.gcd(s(this, v), s(this, x));
      return h(this, v, s(this, v) / e), h(this, x, s(this, x) / e), s(this, x) < 0 && (h(this, x, -s(this, x)), h(this, v, -s(this, v))), this;
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
      const i = Math.floor(Math.pow(s(this, v), Math.abs(1 / e))), n = Math.floor(Math.pow(s(this, x), Math.abs(1 / e)));
      return h(this, v, Math.pow(s(this, v), Math.abs(1 / e))), h(this, x, Math.pow(s(this, x), Math.abs(1 / e))), (i !== s(this, v) || n !== s(this, x)) && (h(this, v, s(this, v) / s(this, x)), h(this, x, 1), h(this, mt, !0)), this.multiply(t), this;
    });
    // ------------------------------------------
    // Getter and setter
    a(this, "sign", () => s(this, v) * s(this, x) >= 0 ? 1 : -1);
    a(this, "sqrt", () => this.root(2));
    a(this, "subtract", (e) => e instanceof B ? this.add(e.clone().opposite()) : this.add(-e));
    a(this, "zero", () => (h(this, v, 0), h(this, x, 1), this));
    return e !== void 0 && this.parse(e, t), this;
  }
  get denominator() {
    return s(this, x);
  }
  set denominator(e) {
    h(this, x, e);
  }
  get dfrac() {
    return h(this, Le, "dfrac"), this;
  }
  get display() {
    return this.isExact() ? s(this, x) === 1 ? `${s(this, v)}` : `${s(this, v)}/${s(this, x)}` : this.value.toFixed(3);
  }
  get frac() {
    return h(this, Le, "frac"), this;
  }
  // ------------------------------------------
  get numerator() {
    return s(this, v);
  }
  set numerator(e) {
    h(this, v, e);
  }
  // Display getter
  get tex() {
    return this.isInfinity() ? `${this.sign() === 1 ? "+" : "-"}\\infty` : this.isExact() ? s(this, x) === 1 ? `${s(this, v)}` : s(this, v) < 0 ? `-\\${s(this, Le)}{ ${-s(this, v)} }{ ${s(this, x)} }` : `\\${s(this, Le)}{ ${s(this, v)} }{ ${s(this, x)} }` : this.value.toFixed(3);
  }
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get tfrac() {
    return h(this, Le, "tfrac"), this;
  }
  get value() {
    const e = s(this, v) / s(this, x);
    return e === 0 ? 0 : e;
  }
};
mt = new WeakMap(), x = new WeakMap(), v = new WeakMap(), Le = new WeakMap(), a(B, "average", (...e) => {
  const t = new B().zero();
  for (const i of e)
    t.add(i);
  return t.divide(e.length), t;
}), a(B, "max", (...e) => {
  let t = new B(e[0]);
  for (const i of e) {
    const n = new B(i);
    n.isGreater(t) && (t = n.clone());
  }
  return t;
}), a(B, "min", (...e) => {
  let t = new B(e[0]);
  for (const i of e) {
    const n = new B(i);
    n.isLesser(t) && (t = n.clone());
  }
  return t;
}), a(B, "sort", (e, t) => {
  const n = e.map((r) => r instanceof B ? r : new B(r)).sort((r, l) => r.value - l.value);
  return t && n.reverse(), n;
}), // ------------------------------------------
// Compare functions
a(B, "unique", (e) => {
  const t = {}, i = [];
  return e.forEach((n) => {
    n instanceof B || (n = new B(n)), t[n.clone().reduce().tex] || (i.push(n.clone()), t[n.tex] = !0);
  }), i;
}), a(B, "xMultiply", (...e) => {
  const t = new B();
  for (const i of e) {
    const n = new B(i);
    t.numerator = t.numerator * n.numerator, t.denominator = t.denominator * n.denominator;
  }
  return t;
});
let u = B;
var F, ie, re, Je;
class At {
  constructor(...e) {
    m(this, F);
    m(this, ie);
    m(this, re);
    m(this, Je);
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    a(this, "parse", (e, t, i) => (h(this, re, i ?? 1), h(this, ie, t ?? 2), h(this, F, e), s(this, ie) % 2 === 0 && s(this, F) < 0 && h(this, Je, !1), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    a(this, "reduce", () => {
      let e = Math.floor(Math.pow(s(this, F), 1 / s(this, ie)));
      for (; e > 1; ) {
        if (s(this, F) % Math.pow(e, s(this, ie)) === 0) {
          h(this, re, s(this, re) * e), h(this, F, s(this, F) / Math.pow(e, s(this, ie))), e = Math.floor(Math.pow(s(this, F), 1 / s(this, ie)));
          continue;
        }
        e--;
      }
      return this;
    });
    a(this, "multiply", (e) => (h(this, F, s(this, F) * e.radical), this.reduce()));
    // ------------------------------------------
    // Help functions
    // ------------------------------------------
    a(this, "hasRadical", () => !(s(this, F) === 1 || s(this, F) === 0 || !s(this, Je)));
    h(this, F, 1), h(this, re, 1), h(this, ie, 2), h(this, Je, !0), e.length > 0 && this.parse(e[0], e[1], e[2]);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get radical() {
    return s(this, F);
  }
  set radical(e) {
    h(this, F, e);
  }
  get nth() {
    return s(this, ie);
  }
  set nth(e) {
    Number.isSafeInteger(e) && e >= 2 ? h(this, ie, e) : (console.log("Error setting the nth root"), h(this, ie, 2));
  }
  get coefficient() {
    return s(this, re);
  }
  set coefficient(e) {
    h(this, re, e);
  }
  get tex() {
    let e;
    return s(this, re) === 1 ? e = "" : s(this, re) === -1 ? e = "-" : e = s(this, re).toString(), s(this, F) === 1 ? `${s(this, re)}` : s(this, ie) === 2 ? `${e}\\sqrt{${s(this, F)}}` : `${e}\\sqrt[${s(this, ie)}]{${s(this, F)}}`;
  }
  get display() {
    let e;
    return s(this, re) === 1 ? e = "" : s(this, re) === -1 ? e = "-" : e = s(this, re).toString(), s(this, F) === 1 ? `${s(this, re)}` : s(this, ie) === 2 ? `${e}sqrt{${s(this, F)}}` : `${e}root(${s(this, ie)}){${s(this, F)}}`;
  }
  get value() {
    return s(this, re) * Math.pow(s(this, F), 1 / s(this, ie));
  }
}
F = new WeakMap(), ie = new WeakMap(), re = new WeakMap(), Je = new WeakMap();
var K, Ge, M, Qe, ye, Ti, Oi, Ci, ki, Mi, $i, Bi;
const xi = class xi {
  constructor(e, t, i = "x") {
    m(this, M);
    m(this, K);
    m(this, Ge);
    if (h(this, Ge, i), Object.hasOwn(e, "moveLeft")) {
      const n = e;
      h(this, K, n.left.clone().subtract(n.right));
    } else
      h(this, K, e.clone().subtract(t ?? 0));
  }
  solve() {
    const e = s(this, K).degree().value;
    if (e === 0)
      return [];
    if (e === 1)
      return A(this, M, Mi).call(this);
    if (e === 2)
      return A(this, M, $i).call(this);
    const t = A(this, M, Ci).call(this);
    return t.length > 0 ? t : A(this, M, Ti).call(this);
  }
  solveAsCardan() {
    if (s(this, K).degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return A(this, M, ki).call(this);
  }
};
K = new WeakMap(), Ge = new WeakMap(), M = new WeakSet(), Qe = function(e, t) {
  return {
    variable: s(this, Ge),
    exact: !1,
    value: +e.toFixed(10),
    tex: (t == null ? void 0 : t.tex) ?? "",
    display: (t == null ? void 0 : t.display) ?? ""
  };
}, ye = function(e) {
  if (e instanceof u && e.isApproximative())
    return A(this, M, Qe).call(this, e.value);
  const t = new u(e);
  return {
    variable: s(this, Ge),
    exact: t,
    value: t.value,
    tex: t.tex,
    display: t.display
  };
}, Ti = function() {
  const e = [];
  s(this, K).degree().value;
  const t = s(this, K).getCoefficients().map((p) => p.value), [i, ...n] = s(this, K).getCoefficients(), r = 1 + Math.max(...n.map((p) => p.value / i.value)), c = 2 * r / 100, f = [];
  for (let p = -r; p <= r; p += c) {
    const w = G.numberCorrection(p);
    f.push(
      {
        x: w,
        fx: s(this, K).evaluate(w, !0)
      }
    );
  }
  f.sort((p, w) => p.x - w.x);
  const d = [];
  return f.forEach((p, w) => {
    w > 0 && (p.fx === 0 ? d.push([p.x, p.x]) : f[w - 1].fx * p.fx < 0 && d.push([
      f[w - 1].x,
      p.x
    ]));
  }), d.forEach((p) => {
    const [w, L] = p;
    if (w === L)
      e.push(A(this, M, ye).call(this, w));
    else {
      const ce = A(this, M, Oi).call(this, t, w, L);
      ce !== null && e.push(A(this, M, Qe).call(this, ce));
    }
  }), e;
}, Oi = function(e, t, i, n = 1e-10) {
  let r = s(this, K).evaluate(t, !0), l = s(this, K).evaluate(i, !0);
  if (r * l > 0)
    return console.log("Pas de racine dans l'intervalle donné"), null;
  let c;
  for (; (i - t) / 2 > n; ) {
    c = (t + i) / 2;
    const f = s(this, K).evaluate(c, !0);
    if (f === 0)
      return c;
    r * f < 0 ? (i = c, l = f) : (t = c, r = f);
  }
  return (t + i) / 2;
}, Ci = function() {
  let e = s(this, K).clone(), t = [];
  const i = e.lcmDenominator();
  i !== 1 && e.multiply(i);
  const n = e.monomByDegree().coefficient;
  let r = e.monomByDegree(0).coefficient;
  for (; r.isZero(); )
    t.length === 0 && t.push(A(this, M, ye).call(this, 0)), e = e.divide("x"), r = e.monomByDegree(0).coefficient;
  const l = G.dividers(n.value), c = G.dividers(r.value);
  for (const d of l)
    for (const p of c) {
      const w = new u(p, d);
      e.evaluate(w).isZero() && !t.find((L) => L.value === w.value) && t.push(A(this, M, ye).call(this, w)), w.opposite(), e.evaluate(w).isZero() && !t.find((L) => L.value === w.value) && t.push(A(this, M, ye).call(this, w));
    }
  for (const d of t) {
    if (d.exact !== !1 && d.exact.isZero())
      continue;
    const p = s(this, K).clone().parse("x", d.exact.denominator, -d.exact.numerator);
    for (; e.isDividableBy(p); )
      e = e.divide(p);
  }
  if (e.degree().isZero())
    return t.sort((d, p) => d.value - p.value);
  if (e.degree().value > 3)
    return [];
  const f = new xi(e, e.clone().parse("0"), s(this, Ge));
  return t = t.concat(f.solve()), t.sort((d, p) => d.value - p.value);
}, ki = function() {
  const e = s(this, K), t = e.monomByDegree(3).coefficient, i = e.monomByDegree(2).coefficient, n = e.monomByDegree(1).coefficient, r = e.monomByDegree(0).coefficient, l = i.clone().divide(t), c = n.clone().divide(t), f = r.clone().divide(t), d = c.clone().subtract(l.clone().pow(2).divide(3)), p = f.clone().subtract(l.clone().multiply(c).divide(3)).add(l.clone().pow(3).multiply(2).divide(27)), w = p.clone().opposite(), L = d.clone().opposite().pow(3).divide(27), ce = w.clone().pow(2).subtract(L.clone().multiply(4)).opposite();
  if (ce.isNegative()) {
    const ue = p.clone().opposite().add(ce.clone().opposite().sqrt()).divide(2).root(3), fe = p.clone().opposite().subtract(ce.clone().opposite().sqrt()).divide(2).root(3), we = ue.clone().add(fe).subtract(l.clone().divide(3));
    return [A(this, M, ye).call(this, we)];
  }
  if (ce.isZero()) {
    const ue = p.clone().opposite().divide(2).root(3), fe = ue.clone().opposite().subtract(l.clone().divide(3)), we = ue.clone().multiply(2).subtract(l.clone().divide(3));
    return fe.isEqual(we) ? [A(this, M, ye).call(this, fe)] : [
      A(this, M, ye).call(this, we),
      A(this, M, ye).call(this, fe)
    ].sort((ge, pe) => ge.value - pe.value);
  }
  if (ce.isPositive()) {
    const ue = [], fe = d.value, we = p.value, ge = l.value;
    for (let pe = 0; pe < 3; pe++)
      ue.push(2 * Math.sqrt(-fe / 3) * Math.cos(Math.acos(3 * we / (2 * fe) * Math.sqrt(-3 / fe)) / 3 + 2 * Math.PI * pe / 3) - ge / 3);
    return ue.map((pe) => A(this, M, Qe).call(this, pe)).sort((pe, lt) => pe.value - lt.value);
  }
  return [];
}, Mi = function() {
  const [e, t] = s(this, K).getCoefficients(), i = t.opposite().divide(e);
  return [
    A(this, M, ye).call(this, i)
  ];
}, $i = function() {
  const e = s(this, K), [t, i, n] = e.getCoefficients(), r = i.clone().pow(2).subtract(t.clone().multiply(n).multiply(4));
  if (r.isNegative())
    return [];
  if (r.isSquare()) {
    const l = r.sqrt(), c = i.clone().opposite().add(l).divide(t.clone().multiply(2)), f = i.clone().opposite().subtract(l).divide(t.clone().multiply(2));
    return l.isZero() ? [A(this, M, ye).call(this, c)] : [
      A(this, M, ye).call(this, c),
      A(this, M, ye).call(this, f)
    ].sort((d, p) => d.value - p.value);
  }
  return A(this, M, Bi).call(this, t, i, r);
}, Bi = function(e, t, i) {
  const n = G.dividers(i.value).filter((ge) => Math.sqrt(ge) % 1 === 0).map((ge) => Math.sqrt(ge)).pop() ?? 1, r = G.gcd(2 * e.value, t.value, n) * (e.isNegative() ? -1 : 1), l = t.clone().divide(r).opposite(), c = e.clone().divide(r).multiply(2), f = i.clone().divide(n ** 2), d = Math.abs(n / r), p = n === 1 ? "-" : `-${d} `, w = n === 1 ? "+" : `+${d} `;
  function L(ge, pe, lt, ni) {
    return `\\frac{ ${pe} ${lt}\\sqrt{ ${ni} } }{ ${ge} }`;
  }
  function ce(ge, pe, lt, ni) {
    return `(${pe}${lt}sqrt(${ni}))/${ge}`;
  }
  const ue = i.value ** 0.5, fe = (-t.value - ue) / (2 * e.value), we = (-t.value + ue) / (2 * e.value);
  return [
    A(this, M, Qe).call(this, fe, {
      tex: L(c.tex, l.tex, p.toString(), f.tex),
      display: ce(c.display, l.display, p.toString(), f.display)
    }),
    A(this, M, Qe).call(this, we, {
      tex: L(c.tex, l.tex, w.toString(), f.tex),
      display: ce(c.display, l.display, w.toString(), f.display)
    })
  ].sort((ge, pe) => ge.value - pe.value);
};
let Mt = xi;
var ss = Object.defineProperty, Pi = (o) => {
  throw TypeError(o);
}, ns = (o, e, t) => e in o ? ss(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, oi = (o, e, t) => ns(o, typeof e != "symbol" ? e + "" : e, t), Si = (o, e, t) => e.has(o) || Pi("Cannot " + t), te = (o, e, t) => (Si(o, e, "read from private field"), t ? t.call(o) : e.get(o)), ct = (o, e, t) => e.has(o) ? Pi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), Ne = (o, e, t, i) => (Si(o, e, "write to private field"), e.set(o, t), t);
const vi = {
  pi: Math.PI,
  e: Math.exp(1)
};
var g = /* @__PURE__ */ ((o) => (o.VARIABLE = "variable", o.COEFFICIENT = "coefficient", o.OPERATION = "operation", o.CONSTANT = "constant", o.FUNCTION = "function", o.FUNCTION_ARGUMENT = "function-argument", o.MONOM = "monom", o.LEFT_PARENTHESIS = "(", o.RIGHT_PARENTHESIS = ")", o))(g || {}), Ue = /* @__PURE__ */ ((o) => (o.EXPRESSION = "expression", o.POLYNOM = "polynom", o.SET = "set", o.NUMERIC = "numeric", o))(Ue || {});
function rs(o, e) {
  if (o.length <= 1)
    return o;
  const t = Object.keys(e).filter((w) => e[w].type === g.FUNCTION).map((w) => w);
  t.sort((w, L) => L.length - w.length);
  const i = new RegExp(`^(${t.join("|")})\\(`), n = Object.keys(vi);
  n.sort((w, L) => L.length - w.length);
  const r = new RegExp(`^(${n.join("|")})`), l = /^(\d+(\.\d+)?)/;
  let c = "", f, d, p;
  for (; o.length > 0; ) {
    if (f = d, p = void 0, t.length > 0 && i.exec(o)) {
      const w = t.find((L) => o.startsWith(L));
      w && (p = w + "(", o = o.slice(w.length + 1), d = g.FUNCTION);
    } else if (n.length > 0 && r.exec(o)) {
      const w = n.find((L) => o.startsWith(L));
      w && (p = w, o = o.slice(w.length), d = g.CONSTANT);
    } else if (l.exec(o)) {
      const w = l.exec(o);
      w && (p = w[0], o = o.slice(w[0].length), d = g.COEFFICIENT);
    } else
      switch (p = o[0], o = o.slice(1), p) {
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
    if (p === void 0 || d === void 0)
      throw new Error("The token is undefined");
    c += os(f, d), c += p;
  }
  return c;
}
function os(o, e) {
  return o === void 0 || o === g.OPERATION || e === g.OPERATION || o === g.LEFT_PARENTHESIS || o === g.FUNCTION || o === g.FUNCTION_ARGUMENT || e === g.RIGHT_PARENTHESIS || e === g.FUNCTION_ARGUMENT ? "" : "*";
}
const hs = {
  "^": { precedence: 4, associative: "right", type: g.OPERATION },
  "*": { precedence: 3, associative: "left", type: g.OPERATION },
  "/": { precedence: 3, associative: "left", type: g.OPERATION },
  "+": { precedence: 2, associative: "left", type: g.OPERATION },
  "-": { precedence: 2, associative: "left", type: g.OPERATION }
}, as = {
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
}, ls = {
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
}, cs = {
  "&": { precedence: 3, associative: "left", type: g.OPERATION },
  "|": { precedence: 3, associative: "left", type: g.OPERATION },
  "!": { precedence: 4, associative: "right", type: g.OPERATION },
  "-": { precedence: 2, associative: "left", type: g.OPERATION }
};
var He, ft, ne, Tt, Fe;
class si {
  constructor(e) {
    ct(this, He), ct(this, ft, []), ct(this, ne, {}), ct(this, Tt, []), ct(this, Fe), Ne(this, He, typeof e > "u" ? Ue.POLYNOM : e), this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return te(this, ft);
  }
  get rpnToken() {
    return te(this, ft).map((e) => e.token);
  }
  tokenConfigInitialization() {
    return te(this, He) === Ue.SET ? (Ne(this, ne, cs), Ne(this, Fe, !1)) : te(this, He) === Ue.NUMERIC ? (Ne(this, ne, ls), Ne(this, Fe, !0)) : te(this, He) === Ue.EXPRESSION ? (Ne(this, ne, as), Ne(this, Fe, !0)) : (Ne(this, ne, hs), Ne(this, Fe, !0)), Ne(this, Tt, Object.keys(te(this, ne)).sort((e, t) => t.length - e.length)), te(this, ne);
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(e, t) {
    let i, n;
    if (i = "", n = void 0, e[t] === "(")
      i = "(", n = g.LEFT_PARENTHESIS;
    else if (e[t] === ")")
      i = ")", n = g.RIGHT_PARENTHESIS;
    else if (e[t] === ",")
      i = ",", n = g.FUNCTION_ARGUMENT;
    else {
      for (const r of te(this, Tt))
        if (e.substring(t, t + r.length) === r) {
          i += r, n = te(this, ne)[r].type;
          break;
        }
      for (const r in vi)
        if (e.substring(t, t + r.length) === r) {
          i += r, n = g.CONSTANT;
          break;
        }
      if (i === "")
        if (/[0-9.]/.exec(e[t])) {
          const r = /^([0-9.]+)/.exec(e.substring(t));
          i = r ? r[0] : "", n = g.COEFFICIENT;
        } else if (/[a-zA-Z]/.exec(e[t])) {
          const r = /^([a-zA-Z])/.exec(e.substring(t));
          i = r ? r[0] : "", n = g.VARIABLE;
        } else
          console.log("Unidentified token", e[t], e, t), i = e[t], n = g.MONOM;
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
    (t ?? te(this, Fe)) && (e = rs(e, te(this, ne)));
    const f = 50;
    let d = 50, p;
    for (; l < e.length; ) {
      if (d--, d === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([r, l, c] = this.NextToken(e, l), c) {
        case g.MONOM:
        case g.COEFFICIENT:
        case g.VARIABLE:
        case g.CONSTANT:
          i.push({
            token: r,
            tokenType: c
          });
          break;
        case g.OPERATION:
          if (n.length > 0) {
            let w = n[n.length - 1];
            for (p = +f; w.token in te(this, ne) && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (te(this, ne)[r].associative === "left" && te(this, ne)[r].precedence <= te(this, ne)[w.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            te(this, ne)[r].associative === "right" && te(this, ne)[r].precedence < te(this, ne)[w.token].precedence); ) {
              if (p--, p === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (i.push(n.pop() ?? { token: "", tokenType: g.OPERATION }), n.length === 0)
                break;
              w = n[n.length - 1];
            }
          }
          n.push({ token: r, tokenType: c });
          break;
        case g.FUNCTION_ARGUMENT:
          for (p = +f; n[n.length - 1].token !== "(" && n.length > 0; ) {
            if (p--, p === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            i.push(n.pop() ?? { token: r, tokenType: c });
          }
          break;
        case g.LEFT_PARENTHESIS:
          n.push({ token: r, tokenType: c }), e[l] === "-" && i.push({ token: "0", tokenType: g.COEFFICIENT });
          break;
        case g.RIGHT_PARENTHESIS:
          for (p = +f; n[n.length - 1].token !== "(" && n.length > 1; ) {
            if (p--, p === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESIS EXIT");
              break;
            }
            i.push(n.pop() ?? { token: r, tokenType: c });
          }
          n.pop();
          break;
        case g.FUNCTION:
          n.push({ token: r, tokenType: c });
          break;
        default:
          throw new Error(`Token type ${r} is not handled`);
      }
    }
    return Ne(this, ft, i.concat(n.reverse())), this;
  }
}
He = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap();
class us {
  constructor(e, t) {
    oi(this, "_rpn"), oi(this, "_expression"), oi(this, "_isValid"), this._expression = e;
    try {
      this._rpn = new si(Ue.NUMERIC).parse(e, t).rpn;
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
          const n = i.token.split("/");
          if (n.length !== 2)
            throw this._isValid = !1, new Error("This coefficient is not a fraction");
          t.push(+n[0] / +n[1]);
        }
      else if (i.tokenType === g.VARIABLE && e !== void 0)
        Object.hasOwn(e, i.token) && t.push(+e[i.token]);
      else if (i.tokenType === g.CONSTANT)
        t.push(vi[i.token]);
      else if (i.tokenType === g.OPERATION) {
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
      } else if (i.tokenType === g.FUNCTION) {
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
var T, b, _e, Ot, Ze, St, It;
const P = class P {
  constructor(e) {
    m(this, _e);
    m(this, T);
    m(this, b);
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
        this.isSameAs(i) ? (this.isZero() && A(this, _e, Ot).call(this, i), s(this, T).add(i.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", i.display);
      }
      return this;
    });
    a(this, "containsRationalPower", () => Object.values(s(this, b)).some((e) => e.isRational()));
    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    a(this, "degree", (e) => this.variables.length === 0 ? new u().zero() : e === void 0 ? Object.values(s(this, b)).reduce((t, i) => t.clone().add(i)) : this.hasVariable(e) ? s(this, b)[e].clone() : new u().zero());
    /**
     * Derivative the monom
     * @param letter
     */
    a(this, "derivative", (e) => {
      if (e === void 0 && (e = "x"), this.hasVariable(e)) {
        const t = s(this, b)[e].clone(), i = this.clone();
        return s(i, b)[e].subtract(1), s(i, T).multiply(new u(t.clone())), i;
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
        for (const n in i.literal)
          s(this, b)[n] = this.hasVariable(n) ? s(this, b)[n].subtract(i.literal[n]) : i.literal[n].clone().opposite(), s(this, b)[n].isZero() && this.removeVariable(n);
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
          return s(this, Ze).call(this, e.value);
        if (e instanceof At)
          return new u().invalid();
        if (typeof e == "number")
          return s(this, Ze).call(this, e);
        if (typeof e == "object") {
          const n = {};
          for (const r in e)
            n[r] = new u(e[r]).value;
          return s(this, Ze).call(this, n);
        }
      }
      const i = this.coefficient.clone();
      if (typeof e == "number" || e instanceof u) {
        const n = {};
        return n[this.variables[0]] = new u(e), this.evaluate(n);
      }
      if (e instanceof At)
        return new u().invalid();
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient;
        for (const n in s(this, b)) {
          const r = new u(e[n]);
          i.multiply(r.pow(s(this, b)[n]));
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
      const t = this.variables, i = e.variables, n = t.concat(i.filter((r) => !t.includes(r)));
      if (this.isZero() || e.isZero() || t.length === 0 && i.length === 0)
        return !0;
      if (t.length !== i.length)
        return !1;
      if (!this.isZero() && !e.isZero()) {
        for (const r of n)
          if (!this.hasVariable(r) || !e.hasVariable(r) || !s(this, b)[r].isEqual(e.literal[r]))
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
        for (const n in i.literal)
          this.hasVariable(n) ? s(this, b)[n].add(i.literal[n]) : s(this, b)[n] = i.literal[n].clone();
      }
      return this;
    });
    /**
     * Create a one value monom
     */
    a(this, "one", () => (h(this, T, new u().one()), h(this, b, {}), this));
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
      return t.hasVariable(e) ? (i = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(i), t.setLetter(e, i)) : (t.coefficient.isZero() && (t.coefficient = new u().one()), t.setLetter(e, 1)), t;
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
    a(this, "setLetter", (e, t) => t instanceof u ? (this.hasVariable(e) && t.isZero() && this.removeVariable(e), s(this, b)[e] = t.clone(), this) : this.setLetter(e, new u(t)));
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
        this.isSameAs(i) ? (this.isZero() && A(this, _e, Ot).call(this, i), s(this, T).add(i.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", i.display);
      }
      return this;
    });
    /**
     * Create a zero value monom
     */
    a(this, "zero", () => (h(this, T, new u().zero()), h(this, b, {}), this));
    m(this, Ze, (e) => {
      let t = this.coefficient.value;
      if (typeof e == "number") {
        const i = {}, n = this.variables[0];
        return i[n] = e, s(this, Ze).call(this, i);
      }
      if (e instanceof u) {
        const i = {};
        return i[this.variables[0]] = new u(e).value, s(this, Ze).call(this, i);
      }
      if (e instanceof At)
        return NaN;
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient.value;
        for (const i in s(this, b)) {
          const n = e[i];
          n instanceof u ? t *= n.value ** s(this, b)[i].value : t *= n ** s(this, b)[i].value;
        }
      }
      return t;
    });
    m(this, St, (e) => {
      const i = new si().parse(e).rpn, n = [];
      if (i.length === 0)
        return this.zero(), this;
      if (i.length === 1) {
        const r = i[0];
        return this.one(), r.tokenType === g.COEFFICIENT ? this.coefficient = new u(r.token) : r.tokenType === g.VARIABLE && this.setLetter(r.token, 1), this;
      } else
        for (const r of i)
          s(this, It).call(this, n, r);
      return this.one(), this.multiply(n[0]), this;
    });
    m(this, It, (e, t) => {
      var f;
      let i, n, r, l, c;
      if (t.tokenType === g.COEFFICIENT)
        e.push(new P(new u(t.token)));
      else if (t.tokenType === g.VARIABLE) {
        const d = new P().one();
        d.setLetter(t.token, 1), e.push(d.clone());
      } else if (t.tokenType === g.OPERATION)
        switch (t.token) {
          case "-":
            n = e.pop() ?? new P().zero(), i = e.pop() ?? new P().zero(), e.push(i.subtract(n));
            break;
          case "*":
            n = e.pop() ?? new P().one(), i = e.pop() ?? new P().one(), e.push(i.multiply(n));
            break;
          case "/":
            n = e.pop() ?? new P().one(), i = e.pop() ?? new P().one(), e.push(i.divide(n));
            break;
          case "^": {
            c = ((f = e.pop()) == null ? void 0 : f.coefficient) ?? new u().one(), r = e.pop() ?? new P().one(), l = r.variables[0], l && r.setLetter(l, c), e.push(r);
            break;
          }
        }
    });
    return h(this, T, new u().zero()), h(this, b, {}), e !== void 0 && this.parse(e), this;
  }
  // -----------------------------------------
  /**
   * Parse a string to a monom. The string may include fraction.
   * @param inputStr
   */
  parse(e) {
    return h(this, T, new u()), h(this, b, {}), typeof e == "string" ? s(this, St).call(this, e) : typeof e == "number" ? h(this, T, new u(e)) : e instanceof u ? h(this, T, e.clone()) : e instanceof P && (h(this, T, s(e, T).clone()), A(this, _e, Ot).call(this, e)), this;
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
    h(this, T, new u(e));
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
    const e = G.dividers(Math.abs(this.coefficient.numerator));
    let t = [];
    for (const n in this.literal)
      t = this._getLiteralDividers(t, n);
    const i = [];
    if (t.length > 0 && e.length > 0)
      for (const n of e)
        for (const r of t) {
          const l = new P();
          l.coefficient = new u(n), l.literal = r, i.push(l);
        }
    else if (e.length === 0)
      for (const n of t) {
        const r = new P();
        r.coefficient = new u().one(), r.literal = n, i.push(r);
      }
    else
      for (const n of e) {
        const r = new P();
        r.coefficient = new u(n), i.push(r);
      }
    return i.length === 0 ? [new P().one()] : i;
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
      t[1] in s(this, b) || (s(this, b)[t[1]] = new u().zero()), s(this, b)[t[1]].add(+t[2]);
    for (const t of [...e.matchAll(/([a-z](?!\^))/g)])
      t[1] in s(this, b) || (s(this, b)[t[1]] = new u().zero()), s(this, b)[t[1]].add(1);
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
T = new WeakMap(), b = new WeakMap(), _e = new WeakSet(), Ot = function(e) {
  for (const t in e.literal)
    s(this, b)[t] = e.literal[t].clone();
}, Ze = new WeakMap(), St = new WeakMap(), It = new WeakMap(), a(P, "gcd", (...e) => {
  for (const r of e)
    if (r.containsRationalPower())
      return new P().zero();
  const t = new P(), i = G.gcd(...e.map((r) => r.coefficient.numerator)), n = G.lcm(...e.map((r) => r.coefficient.denominator));
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
a(P, "xMultiply", (...e) => {
  const t = new P().one();
  for (const i of e)
    t.multiply(i);
  return t;
});
let k = P;
function qi(o, e = !0) {
  return e ? `\\left( ${o} \\right)` : `(${o})`;
}
function Ct(o, e, t, i, n) {
  return o.map((r, l) => r === e ? t : r);
}
var We, y, et, gt, tt, yt, zt, Rt, Dt, it, Lt, wt, Zt, Vt, Ft, jt, Ii, Ut, Gt;
const $ = class $ {
  constructor(e, ...t) {
    m(this, jt);
    m(this, We);
    m(this, y);
    m(this, et);
    m(this, gt, !1);
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values
     */
    a(this, "parse", (e, ...t) => {
      if (h(this, y, []), h(this, We, []), typeof e == "string")
        return A(this, jt, Ii).call(this, e, ...t);
      if ((typeof e == "number" || e instanceof u || e instanceof k) && t.length === 0)
        s(this, y).push(new k(e));
      else if (e instanceof k && t.length > 0)
        s(this, y).push(new k(e)), t.forEach((i) => {
          s(this, y).push(new k(i));
        });
      else if (e instanceof $)
        for (const i of e.monoms)
          s(this, y).push(i.clone());
      return this;
    });
    /**
     * Clone the polynom
     */
    a(this, "clone", () => {
      const e = new $(), t = [];
      for (const i of s(this, y))
        t.push(i.clone());
      return e.monoms = t, e;
    });
    a(this, "add", (...e) => {
      for (const t of e)
        t instanceof $ ? h(this, y, s(this, y).concat(t.monoms)) : t instanceof k ? s(this, y).push(t.clone()) : typeof t == "number" && Number.isSafeInteger(t) ? s(this, y).push(new k(t.toString())) : s(this, y).push(new k(t));
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
      const t = new $();
      for (const i of s(this, y))
        t.add(i.derivative(e));
      return t.reduce();
    });
    a(this, "divide", (e) => {
      if (e instanceof u)
        return s(this, yt).call(this, e);
      if (typeof e == "number" && Number.isSafeInteger(e))
        return s(this, zt).call(this, e);
      if (e instanceof k)
        return this.divide(new $(e));
      if (e instanceof $) {
        if (e.monoms.length === 1 && e.variables.length === 0)
          return s(this, yt).call(this, e.monoms[0].coefficient);
        {
          const { quotient: t, reminder: i } = this.euclidean(e);
          if (i.isZero())
            return h(this, y, t.monoms), this;
        }
      } else if (typeof e == "string")
        return this.divide(new $(e));
      throw new Error(`Cannot divide by ${e}`);
    });
    a(this, "empty", () => (h(this, y, []), this));
    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    a(this, "euclidean", (e) => {
      const t = e.variables[0], i = new $().zero(), n = this.clone().reorder(t);
      if (e.variables.length === 0)
        return {
          quotient: this.clone().divide(e).reduce(),
          reminder: new $().zero()
        };
      const r = e.monomByDegree(void 0, t), l = e.degree(t);
      let c, f = this.degree(t).value * 2;
      for (; n.degree(t).isGeq(l) && f > 0 && (f--, c = n.monomByDegree(void 0, t).clone().divide(r), !(!c.isZero() && (i.add(c), n.subtract(e.clone().multiply(c)).reduce(), c.degree(t).isZero()))); )
        ;
      return i.reduce(), n.reduce(), { quotient: i, reminder: n };
    });
    a(this, "evaluate", (e, t) => {
      if (t)
        return s(this, Rt).call(this, e);
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
        const c = new $(n);
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
          let c = s(this, Lt).call(this, i, l, e ?? "x");
          for (l = i.degree(e).value; c.length > 0; ) {
            const f = c[0];
            if (!i.isDividableBy(f))
              c.shift();
            else {
              const d = i.euclidean(f);
              t.push(f), i = d.quotient.clone(), c = c.filter((p) => {
                const w = i.monoms[0], L = i.monoms[i.monoms.length - 1], ce = p.monoms[0], ue = p.monoms[p.monoms.length - 1];
                return L.isDivisible(ue) ? w.isDivisible(ce) : !1;
              });
            }
          }
        }
      return i.isOne() || t.push(i.clone()), h(this, We, t), s(this, We);
    });
    a(this, "gcdDenominator", () => G.gcd(...this.getDenominators()));
    a(this, "gcdNumerator", () => G.gcd(...this.getNumerators()));
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
    a(this, "getZeroes", () => this.degree().isZero() ? [] : (this.roots = new Mt(this.clone()).solve(), this.roots));
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
        t = new $(e);
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
    a(this, "isEqual", (e) => s(this, tt).call(this, e, "="));
    a(this, "isOppositeAt", (e) => s(this, tt).call(this, e.clone().opposite(), "="));
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
    a(this, "isSameAs", (e) => s(this, tt).call(this, e, "same"));
    a(this, "lcmDenominator", () => G.lcm(...this.getDenominators()));
    a(this, "lcmNumerator", () => G.lcm(...this.getNumerators()));
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
    a(this, "multiply", (e) => e instanceof $ ? s(this, Ft).call(this, e) : e instanceof u ? s(this, wt).call(this, e) : e instanceof k ? s(this, Vt).call(this, e) : Number.isSafeInteger(e) && typeof e == "number" ? s(this, Zt).call(this, e) : this);
    a(this, "one", () => (h(this, y, []), s(this, y).push(new k().one()), this));
    // ------------------------------------------
    a(this, "opposite", () => (h(this, y, s(this, y).map((e) => e.opposite())), this));
    a(this, "pow", (e) => {
      if (!Number.isSafeInteger(e))
        return this.zero();
      if (e < 0)
        return this.zero();
      if (e === 0)
        return new $();
      const t = this.clone();
      for (let i = 1; i < e; i++)
        this.multiply(t);
      return this.reduce();
    });
    a(this, "primitive", (e) => {
      const t = new $();
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
      return this.length === 0 ? new $().zero() : this.reorder();
    });
    // ------------------------------------------
    a(this, "reorder", (e = "x", t) => {
      t === void 0 && (t = !1);
      const i = this.variables.filter((n) => n !== e);
      return s(this, y).sort(function(n, r) {
        const l = n.degree(e).value, c = r.degree(e).value;
        if (l !== c)
          return t ? l - c : c - l;
        if (i.length > 0)
          for (const f of i) {
            const d = n.degree(f).value, p = r.degree(f).value;
            if (d !== p)
              return t ? d - p : p - d;
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
      const n = new $().zero();
      for (const r of this.monoms)
        !r.hasVariable(e) || r.literal[e].isZero() ? n.add(r.clone()) : (i = r.literal[e].clone(), r.removeVariable(e), n.add(t.clone().pow(Math.abs(i.numerator)).multiply(r)));
      return h(this, y, n.reduce().monoms), this;
    });
    a(this, "subtract", (...e) => {
      for (const t of e)
        t instanceof $ ? this.add(t.clone().opposite()) : t instanceof k ? s(this, y).push(t.clone().opposite()) : s(this, y).push(new k(t).opposite());
      return this.reduce();
    });
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    a(this, "zero", () => (h(this, y, []), s(this, y).push(new k().zero()), this));
    m(this, tt, (e, t) => {
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
    m(this, yt, (e) => {
      for (const t of s(this, y))
        t.coefficient.divide(e);
      return this;
    });
    m(this, zt, (e) => {
      const t = new u(e);
      for (const i of s(this, y))
        i.coefficient.divide(t);
      return this;
    });
    m(this, Rt, (e) => {
      let t = 0;
      return s(this, y).forEach((i) => {
        t += i.evaluate(e, !0);
      }), t;
    });
    m(this, Dt, (e) => {
      var w;
      let t, i, n, r, l, c, f, d, p;
      if (this.numberOfVars === 1)
        return n = this.monomByDegree(2, e).coefficient, r = this.monomByDegree(1, e).coefficient, l = this.monomByDegree(0, e).coefficient, c = r.clone().pow(2).subtract(n.clone().multiply(l).multiply(4)), c.isZero() ? (f = r.clone().opposite().divide(n.clone().multiply(2)), t = new $(e).subtract(f.display).multiply(f.denominator), i = new $(e).subtract(f.display).multiply(f.denominator), p = n.divide(f.denominator).divide(f.denominator), p.isOne() ? [t, i] : [new $(p.display), t, i]) : c.isPositive() && c.isSquare() ? (f = r.clone().opposite().add(c.clone().sqrt()).divide(n.clone().multiply(2)), d = r.clone().opposite().subtract(c.clone().sqrt()).divide(n.clone().multiply(2)), p = n.divide(f.denominator).divide(d.denominator), p.isOne() ? [
          new $(e).subtract(f.display).multiply(f.denominator),
          new $(e).subtract(d.display).multiply(d.denominator)
        ] : [
          new $(p.display),
          new $(e).subtract(f.display).multiply(f.denominator),
          new $(e).subtract(d.display).multiply(d.denominator)
        ]) : [this.clone()];
      if (n = this.monomByDegree(2, e), r = this.monomByDegree(1, e), l = this.monomByDegree(0, e), n.isLiteralSquare() && l.isLiteralSquare() && r.clone().pow(2).isSameAs(n.clone().multiply(l))) {
        const L = new $("x", n.coefficient, r.coefficient, l.coefficient), ce = s(w = L, Dt).call(w, "x"), ue = [];
        let fe;
        if (ce.length >= 2) {
          for (const we of ce)
            we.degree().isZero() ? ue.push(we.clone()) : (fe = we.clone(), fe.monoms[0].literal = n.literalSqrt, fe.monoms[1].literal = l.literalSqrt, ue.push(fe.clone()));
          return ue;
        }
      }
      return [this.clone()];
    });
    m(this, it, (e, t, i, n) => {
      let r = "";
      for (const l of s(this, y)) {
        if (l.coefficient.value === 0)
          continue;
        let c;
        n ? c = l.plotFunction : c = e === "tex" ? l.tex : l.display, r += `${l.coefficient.sign() === 1 && (r !== "" || t === !0) ? "+" : ""}${c}`;
      }
      return i === !0 && this.length > 1 && (e === "tex" ? r = `\\left( ${r} \\right)` : r = `(${r})`), r === "" && (r = "0"), r;
    });
    m(this, Lt, (e, t, i) => {
      const n = e.monoms[0].dividers, r = e.monoms[e.monoms.length - 1].dividers, l = [];
      return n.forEach((c) => {
        c.degree(i).isLeq(t) && r.forEach((f) => {
          c.degree(i).isNotEqual(f.degree(i)) && (l.push(new $(c, f)), l.push(new $(c, f.clone().opposite())));
        });
      }), l;
    });
    m(this, wt, (e) => {
      for (const t of s(this, y))
        t.coefficient.multiply(e);
      return this.reduce();
    });
    m(this, Zt, (e) => s(this, wt).call(this, new u(e)));
    m(this, Vt, (e) => {
      for (const t of s(this, y))
        t.multiply(e);
      return this.reduce();
    });
    m(this, Ft, (e) => {
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
    m(this, Ut, (e) => {
      const i = new si().parse(e).rpn;
      this.zero();
      const n = [];
      for (const r of i)
        s(this, Gt).call(this, n, r);
      return n.length === 1 && this.add(n[0]), this.reorder();
    });
    m(this, Gt, (e, t) => {
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
        case g.MONOM:
          console.error("The monom token should not appear here");
          break;
        case g.FUNCTION:
          console.error("The function token should not appear here - might be introduced later.");
          break;
      }
    });
    return h(this, y, []), h(this, We, []), h(this, et, []), e !== void 0 && this.parse(e, ...t), this;
  }
  get tex() {
    return s(this, it).call(this, "tex");
  }
  get display() {
    return s(this, it).call(this);
  }
  fromCoefficients(...e) {
    h(this, y, []);
    const t = "x";
    return e.reverse().forEach((i, n) => {
      const r = new k();
      r.coefficient = new u(i), r.setLetter(t, n), s(this, y).push(r);
    }), this;
  }
  getCoefficients() {
    const e = this.clone().reorder(), t = this.degree().value + 1, i = new Array(t).fill(new u(0));
    return e.monoms.forEach((n) => {
      const r = t - n.degree().value - 1;
      i[r] = n.coefficient.clone();
    }), i;
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
    return s(this, it).call(this, "tex", !1, !1, !0);
  }
  root() {
    throw new Error("Cannot take the root from a polynom");
  }
  get roots() {
    return s(this, gt) ? s(this, et) : this.getZeroes();
  }
  set roots(e) {
    h(this, gt, !0), h(this, et, e);
  }
  sqrt() {
    throw new Error("Cannot take the square root from a polynom");
  }
  tableOfSigns() {
    const e = this.roots;
    let t = new Array(2 * e.length + 1).fill("").map((i, n) => n % 2 === 0 ? "" : "z");
    if (t.length === 1) {
      const [i] = this.getCoefficients().map((n) => n.value);
      t = Ct(t, "", i > 0 ? "+" : "-");
    } else if (this.degree().isOne()) {
      const [i] = this.getCoefficients().map((n) => n.value);
      t[0] = i > 0 ? "-" : "+", t[1] = "z", t[2] = i > 0 ? "+" : "-";
    } else
      [
        e[0].value - 1,
        ...e.map((n, r) => r === e.length - 1 ? e[r].value + 1 : (e[r].value + e[r + 1].value) / 2)
      ].forEach((n, r) => {
        const l = this.evaluate({ x: n }, !0);
        t[r * 2] = l > 0 ? "+" : "-";
      });
    return { roots: e, signs: t };
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
We = new WeakMap(), y = new WeakMap(), et = new WeakMap(), gt = new WeakMap(), tt = new WeakMap(), yt = new WeakMap(), zt = new WeakMap(), Rt = new WeakMap(), Dt = new WeakMap(), it = new WeakMap(), Lt = new WeakMap(), wt = new WeakMap(), Zt = new WeakMap(), Vt = new WeakMap(), Ft = new WeakMap(), jt = new WeakSet(), Ii = function(e, ...t) {
  if (t.length === 0) {
    if (e = "" + e, e !== "" && !isNaN(Number(e))) {
      this.empty();
      const i = new k(e);
      return this.add(i), this;
    }
    return s(this, Ut).call(this, e);
  } else if (/^[a-z]+/.test(e)) {
    this.empty();
    const i = t.map((n) => new u(n));
    if (e.length > 1) {
      const n = e.split("");
      if (n.length < t.length - 2)
        throw new Error("Too many factors for too few variables !");
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
}, Ut = new WeakMap(), Gt = new WeakMap();
let N = $;
var O, C, oe, Wt, st, Xt;
const qe = class qe {
  constructor(e, t, i) {
    // Left part of the equation
    m(this, O);
    // Right part of the equation
    m(this, C);
    // Signe of the equation
    m(this, oe);
    // ------------------------------------------
    a(this, "parse", (e) => {
      const t = s(this, Wt).call(this, e);
      if (t === !1)
        throw new Error("The equation is not valid (no sign found)");
      const i = e.split(t);
      return this.create(new N(i[0]), new N(i[1]), s(this, st).call(this, t));
    });
    a(this, "create", (e, t, i) => (h(this, O, e), h(this, C, t), h(this, oe, s(this, st).call(this, i ?? "=")), this));
    a(this, "clone", () => new qe(s(this, O).clone(), s(this, C).clone(), s(this, oe)));
    /**
     * Get the degree of the equation
     * @param letter
     */
    a(this, "degree", (e) => u.max(s(this, O).degree(e), s(this, C).degree(e)));
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
      for (const r of i)
        r.hasVariable(e) || (t = r.clone(), s(this, O).subtract(t), s(this, C).subtract(t));
      if (s(this, O).length !== 1)
        return !1;
      const n = s(this, O).monoms[0].coefficient.clone();
      return s(this, O).divide(n), s(this, C).divide(n), this;
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
      const t = new u(e);
      return s(this, O).multiply(t), s(this, C).multiply(t), s(this, oe) !== "=" && t.sign() === -1 && s(this, Xt).call(this), this;
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
    a(this, "simplify", () => (this.multiply(G.lcm(...s(this, O).getDenominators(), ...s(this, C).getDenominators())), this.divide(G.gcd(...s(this, O).getNumerators(), ...s(this, C).getNumerators())), this));
    // -----------------------------------------------
    a(this, "solve", () => new Mt(this.clone()).solve());
    a(this, "test", (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e)));
    m(this, Wt, (e) => {
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
    m(this, st, (e) => e === void 0 ? "=" : e.includes("geq") || e.includes(">=") || e.includes("=>") ? ">=" : e.includes(">") ? ">" : e.includes("leq") || e.includes("<=") || e.includes("=<") ? "<=" : e.includes("<") ? "<" : "=");
    m(this, Xt, () => s(this, oe) === "=" ? this : s(this, oe).includes("<") ? (s(this, oe).replace("<", ">"), this) : s(this, oe).includes(">") ? (s(this, oe).replace(">", "<"), this) : this);
    if (h(this, O, new N().zero()), h(this, C, new N().zero()), h(this, oe, "="), e !== void 0 && t === void 0) {
      if (e instanceof qe)
        return e.clone();
      typeof e == "string" && this.parse(e);
    } else e !== void 0 && t !== void 0 && (this.left = new N(e), this.right = new N(t));
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
    const t = new N(e);
    return s(this, O).add(t), s(this, C).add(t), this;
  }
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param values
   * @param asNumeric
   */
  evaluate(e, t) {
    const i = s(this, O).evaluate(e, t), n = s(this, C).evaluate(e, t);
    return t ? i === n : i.isEqual(n);
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
    const t = new N(e);
    return s(this, O).subtract(t), s(this, C).subtract(t), this;
  }
  static isEquationString(e) {
    return e.includes("=") || e.includes("<") || e.includes(">") || e.includes("<=") || e.includes(">=");
  }
  static makeSolutionsUnique(e, t) {
    const i = [], n = e.filter((r) => i.includes(r.tex) ? !1 : (i.push(r.tex), !0));
    return t === !0 && n.sort((r, l) => r.value - l.value), n;
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
    return s(this, oe);
  }
  set sign(e) {
    h(this, oe, s(this, st).call(this, e));
  }
  get signAsTex() {
    return s(this, oe) === ">=" ? "\\geq" : s(this, oe) === "<=" ? "\\leq" : s(this, oe);
  }
  get tex() {
    return `${s(this, O).tex}${this.signAsTex}${s(this, C).tex}`;
  }
  get variables() {
    return [...new Set(s(this, C).variables.concat(s(this, O).variables))];
  }
};
O = new WeakMap(), C = new WeakMap(), oe = new WeakMap(), Wt = new WeakMap(), st = new WeakMap(), Xt = new WeakMap();
let V = qe;
var Ce, Ae, xe, nt;
const be = class be {
  constructor(e, t) {
    m(this, Ce);
    m(this, Ae);
    m(this, xe);
    m(this, nt, !1);
    return e instanceof be ? (h(this, Ae, e.polynom.clone()), h(this, xe, e.power.clone()), t !== void 0 && s(this, xe).multiply(new u(t))) : e !== void 0 ? (h(this, Ae, new N(e)), h(this, xe, new u(t ?? 1))) : (h(this, Ae, new N()), h(this, xe, new u(1))), h(this, Ce, 1), this;
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  clone() {
    return new be(this);
  }
  fromPolynom(e) {
    return h(this, Ae, new N(e)), h(this, xe, new u(1)), this;
  }
  get tex() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, n;
    return s(this, Ce) === 0 && t > 1 ? (i = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, n = e === 1 ? "" : `^{ ${e} }`) : (i = s(this, nt) && this.power.isOne() ? this.polynom.tex : qi(this.polynom.tex), n = t === 1 && e === 1 ? "" : `^{ ${this.power.tex} }`), i = `${i}${n}`, s(this, Ce) === 0 && e < 0 && (i = `\\frac{ 1 }{ ${i} }`), i;
  }
  get display() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, n;
    return s(this, Ce) === 0 && t > 1 ? (i = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, n = e === 1 ? "" : `^(${e})`) : (i = s(this, nt) && this.power.isOne() ? this.polynom.display : qi(this.polynom.display, !1), n = t === 1 && e === 1 ? "" : `^(${this.power.display})`), i = `${i}${n}`, s(this, Ce) === 0 && e < 0 && (i = `1/(${i})`), i;
  }
  add() {
    throw new Error("Adding two factors is not possible");
  }
  get asSingle() {
    return h(this, nt, !0), this;
  }
  degree(e) {
    return this.polynom.degree(e).multiply(this.power);
  }
  derivative() {
    return this.power.isZero() ? [new be("0")] : this.power.isOne() ? [new be(this.polynom.clone().derivative())] : [
      new be(this.power.clone()),
      new be(this.polynom.clone().derivative()),
      new be(this.polynom.clone(), this.power.clone().subtract(1))
    ];
  }
  develop() {
    if (this.power.isNatural())
      return this.polynom.clone().pow(this.power.value);
    throw new Error("The power must be a natural number");
  }
  divide(e) {
    if (e instanceof be && this.isSameAs(e))
      return this.power.subtract(e.power), this;
    const t = new N(e);
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
    return e instanceof be ? t = e.polynom : e instanceof N ? t = e : t = new N(e), this.polynom.isEqual(t);
  }
  isZero() {
    return this.polynom.isZero();
  }
  multiply(e) {
    if (e instanceof be && this.isSameAs(e))
      return this.power.add(e.power), this;
    const t = new N(e);
    if (this.isSameAs(t))
      return this.power.add(1), this;
    throw new Error("The two factors must be the same");
  }
  one() {
    return s(this, Ae).one(), s(this, xe).one(), this;
  }
  opposite() {
    throw new Error("Method not implemented.");
  }
  get polynom() {
    return s(this, Ae);
  }
  set polynom(e) {
    h(this, Ae, e);
  }
  pow(e) {
    return this.power.multiply(e), this;
  }
  get power() {
    return s(this, xe);
  }
  set power(e) {
    h(this, xe, new u(e));
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
    return e.isStrictlyNegative() && (t.signs = Ct(t.signs, "z", "d")), e.denominator % 2 === 0 ? t.signs = Ct(t.signs, "-", "h") : e.numerator % 2 === 0 && (t.signs = Ct(t.signs, "-", "+")), { roots: t.roots, signs: t.signs };
  }
  get variables() {
    return this.polynom.variables;
  }
  get withPower() {
    return h(this, Ce, 1), this;
  }
  get withRoot() {
    return h(this, Ce, 0), this;
  }
  zero() {
    return s(this, Ae).zero(), s(this, xe).one(), this;
  }
};
Ce = new WeakMap(), Ae = new WeakMap(), xe = new WeakMap(), nt = new WeakMap();
let se = be;
var dt = /* @__PURE__ */ ((o) => (o[o.ROOT = 0] = "ROOT", o[o.POWER = 1] = "POWER", o))(dt || {}), Z, Se, Yt, Qt;
const Ke = class Ke {
  constructor(...e) {
    m(this, Z);
    // Determine the letters in the linear system, usually ['x', 'y']
    m(this, Se);
    a(this, "parse", (...e) => (h(this, Z, e.map((t) => new V(t))), s(this, Yt).call(this), this));
    a(this, "clone", () => new Ke().parse(...s(this, Z).map((e) => e.clone())));
    a(this, "buildTex", (e, t) => {
      let i, n, r = [];
      const l = [];
      for (const f of e)
        r = r.concat(f.letters());
      r = [...new Set(r)], r.sort();
      for (let f = 0; f < e.length; f++) {
        const d = e[f];
        i = [];
        for (const p of r)
          n = d.left.monomByLetter(p), i.length === 0 ? i.push(n.isZero() ? "" : n.tex) : i.push(n.isZero() ? "" : (n.coefficient.sign() === 1 ? "+" : "") + n.tex);
        if (i.push("="), i.push(d.right.tex), (t == null ? void 0 : t[f]) !== void 0) {
          i[i.length - 1] = i[i.length - 1] + " \\phantom{\\quad}";
          for (const p of t[f])
            i.push(`\\ \\cdot\\ ${p.startsWith("-") ? "\\left(" + p + "\\right)" : p}`);
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
      for (const e of s(this, Z))
        e.reorder();
      return this;
    });
    a(this, "solveMatrix", () => {
      const [e, t] = this.matrix, i = e.map((n, r) => [...n, t[r]]);
      for (let n = 0; n < e.length; n++) {
        let r = i[n][n].clone();
        if (r.isZero()) {
          const l = i.find((c, f) => f > n && !c[n].isZero());
          if (l)
            i[n].forEach((c, f) => c.add(l[f])), r = i[n][n].clone();
          else
            throw new Error("Unsolvable...");
        }
        i[n] = i[n].map((l) => l.divide(r));
        for (let l = 0; l < e.length; l++) {
          if (l === n)
            continue;
          const c = i[l][n].clone().opposite();
          for (let f = 0; f < i[l].length; f++)
            i[l][f].add(i[n][f].clone().multiply(c));
          if (i[l].slice(0, i[l].length - 1).every((f) => f.isZero()))
            return i[l][i[l].length - 1].isZero() ? [new u().infinite()] : [];
        }
      }
      return i.map((n) => n[n.length - 1]);
    });
    m(this, Yt, () => (h(this, Se, s(this, Z).reduce((e, t) => [.../* @__PURE__ */ new Set([...e, ...t.variables])], [])), s(this, Se).sort(), this));
    m(this, Qt, () => {
      const e = [], t = [];
      for (const i of s(this, Z)) {
        const n = [], r = i.clone().reorder();
        for (const l of this.variables) {
          const c = r.left.monomByLetter(l);
          n.push(c.coefficient);
        }
        t.push(r.right.monoms[0].coefficient), e.push(n);
      }
      return [e, t];
    });
    return h(this, Z, []), h(this, Se, []), e.length > 0 && this.parse(...e), this;
  }
  static fromMatrix(e, t = "xyz") {
    const i = e[0].length;
    if (e.some((r) => r.length !== i))
      throw new Error("All rows must have the same number of columns");
    const n = t.split("").splice(0, i - 1);
    return new Ke(
      ...e.map((r) => {
        const l = new N(n.join(""), ...r);
        return new V(l, 0);
      })
    );
  }
  add(e, t) {
    if (e instanceof Ke) {
      const i = e.equations.length;
      if (i !== s(this, Z).length)
        throw new Error("The number of equations must be the same");
      for (let n = 0; n < i; n++)
        s(this, Z)[n].add(e.equations[n]);
    } else {
      if (t === void 0 || t < 0 || t >= s(this, Z).length)
        throw new Error("Index out of range");
      const i = new V(e);
      s(this, Z)[t].add(i);
    }
    return this;
  }
  degree(e) {
    return u.max(...s(this, Z).map((t) => t.degree(e)));
  }
  get display() {
    return this.tex + "as display";
  }
  // ------------------------------------------
  get equations() {
    return s(this, Z);
  }
  set equations(e) {
    h(this, Z, e);
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
    return this.variables.length === s(this, Z).length;
  }
  get matrix() {
    return s(this, Qt).call(this);
  }
  multiply(e, t) {
    if (Array.isArray(e)) {
      if (e.length !== s(this, Z).length)
        throw new Error("The number of values must be the same as the number of equations");
      for (let i = 0; i < e.length; i++)
        s(this, Z)[i].multiply(e[i]);
      return this;
    }
    if (t === void 0 || t < 0 || t >= s(this, Z).length)
      throw new Error("Index out of range");
    return s(this, Z)[t].multiply(e), this;
  }
  reduce() {
    throw new Error("Method not implemented.");
  }
  solve() {
    return [];
  }
  subtract(e, t) {
    if (e instanceof Ke) {
      const i = e.equations.length;
      if (i !== s(this, Z).length)
        throw new Error("The number of equations must be the same");
      for (let n = 0; n < i; n++)
        s(this, Z)[n].subtract(e.equations[n]);
    } else {
      if (t === void 0 || t < 0 || t >= s(this, Z).length)
        throw new Error("Index out of range");
      const i = new V(e);
      s(this, Z)[t].subtract(i);
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
Z = new WeakMap(), Se = new WeakMap(), Yt = new WeakMap(), Qt = new WeakMap();
let hi = Ke;
var ke, vt, ai;
class fs {
  /**
   *
   * @param {string} value (optional) Default polynom to parse on class creation
   */
  constructor(e) {
    m(this, vt);
    m(this, ke);
    a(this, "parse", (e) => (h(this, ke, new si(Ue.SET).parse(e).rpn), this));
    return h(this, ke, []), e !== void 0 && this.parse(e), this;
  }
  evaluate(e) {
    this.variables.forEach((i) => {
      Object.hasOwn(e, i) || (e[i] = !1);
    });
    const t = [];
    for (const i of s(this, ke))
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
    return s(this, ke);
  }
  get tex() {
    const e = [];
    for (const t of s(this, ke))
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
    return s(this, ke).filter((e) => e.tokenType === "variable").map((e) => e.token);
  }
  vennAB() {
    return A(this, vt, ai).call(this, {
      A: ["A", "AB"],
      B: ["B", "AB"]
    }, ["A", "B", "AB", "E"]);
  }
  vennABC() {
    return A(this, vt, ai).call(this, {
      A: ["A", "AB", "AC", "ABC"],
      B: ["B", "AB", "BC", "ABC"],
      C: ["C", "AC", "BC", "ABC"]
    }, ["A", "B", "C", "AB", "AC", "BC", "ABC", "E"]);
  }
}
ke = new WeakMap(), vt = new WeakSet(), ai = function(e, t) {
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
  for (const r of s(this, ke))
    if (r.tokenType === "variable")
      e[r.token] === void 0 ? i.push(/* @__PURE__ */ new Set()) : i.push(new Set(e[r.token]));
    else
      switch (r.token) {
        case "&":
          if (i.length >= 2) {
            const l = i.pop(), c = i.pop();
            c && l && i.push(new Set([...c].filter((f) => l.has(f))));
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
            c && l && i.push(new Set([...c].filter((f) => !l.has(f))));
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
var rt, q, Ye, ci, zi, bt, ui;
const Y = class Y {
  constructor(...e) {
    m(this, bt);
    m(this, rt, dt.POWER);
    m(this, q, []);
    return this.parse(...e), this;
  }
  parse(...e) {
    return h(this, q, []), e.length === 0 ? this : (e.forEach((t) => {
      t instanceof Y ? s(this, q).push(...t.factors.map((i) => i.clone())) : s(this, q).push(new se(t));
    }), this);
  }
  clone() {
    return new Y(...s(this, q).map((e) => e.clone()));
  }
  get tex() {
    const { num: e, den: t } = A(this, bt, ui).call(this);
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.tex : e.map((r) => r.tex).join("");
    const i = e.length === 1 ? e[0].asSingle.tex : e.map((r) => r.tex).join(""), n = t.length === 1 ? t[0].asSingle.tex : t.map((r) => r.tex).join("");
    return `\\frac{ ${i} }{ ${n} }`;
  }
  get display() {
    const { num: e, den: t } = A(this, bt, ui).call(this);
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.display : e.map(
        (r, l) => l === 0 && r.polynom.monoms.length === 1 ? r.asSingle.display : r.display
      ).join("");
    const i = e.length === 1 ? e[0].asSingle.display : e.map((r) => r.display).join(""), n = t.length === 1 ? t[0].asSingle.display : t.map((r) => r.display).join("");
    return `(${i})/(${n})`;
  }
  static gcd(...e) {
    var i;
    if (e.length === 0)
      return new Y().one();
    if (e.length === 1)
      return e[0];
    if (e.length === 2)
      return A(i = Y, Ye, ci).call(i, e[0], e[1]);
    let t = e[0];
    return e.shift(), e.forEach((n) => {
      var r;
      return t = A(r = Y, Ye, ci).call(r, t, n);
    }), t;
  }
  static lcm(...e) {
    if (e.length === 0)
      return new Y().one();
    if (e.length === 1)
      return e[0];
    let t = e[0];
    return e.shift(), e.forEach((i) => {
      var n;
      return t = A(n = Y, Ye, zi).call(n, t, i);
    }), t;
  }
  add(...e) {
    const t = [this.numerator, ...e.map((c) => c.numerator)], i = [this.denominator, ...e.map((c) => c.denominator)];
    let n;
    if (i.some((c) => c.factors.length > 0)) {
      const c = Y.lcm(...i);
      t.forEach((f, d) => {
        f.multiply(c.clone().divide(i[d]));
      }), n = c;
    }
    const r = Y.gcd(...t), l = new N(0).add(
      ...t.map((c) => c.divide(r).reduce().develop().factors[0].polynom)
    ).reduce();
    return h(this, q, [
      ...r.factors,
      new se(l)
    ]), n && this.divide(n), h(this, q, s(this, q).filter((c) => !c.power.isZero())), this;
  }
  get asPower() {
    return h(this, rt, dt.POWER), this;
  }
  get asRoot() {
    return h(this, rt, dt.ROOT), this;
  }
  degree(e) {
    return s(this, q).reduce((t, i) => t.add(i.degree(e)), new u("0"));
  }
  get denominator() {
    return new Y(
      ...s(this, q).filter((e) => e.power.isNegative()).map((e) => e.clone().inverse())
    );
  }
  derivative() {
    const e = [], t = s(this, q).length;
    for (let n = 0; n < t; n++) {
      const r = s(this, q).slice(), l = r.splice(n, 1)[0].derivative();
      e.push(
        new Y(...r, ...l)
      );
    }
    e.forEach((n) => n.reduce());
    const i = e.shift();
    return i !== void 0 && h(this, q, i.factors), this.add(...e);
  }
  develop() {
    const e = new N("1"), t = new N("1");
    return this.numerator.factors.forEach((i) => {
      e.multiply(i.develop());
    }), this.denominator.factors.forEach((i) => {
      t.multiply(i.develop());
    }), new Y().fromPolynom(e, t);
  }
  divide(e) {
    return h(this, q, s(this, q).concat(e.clone().factors.map((t) => t.inverse()))), this;
  }
  evaluate(e, t) {
    return t ? s(this, q).reduce((i, n) => i * n.evaluate(e, t), 1) : s(this, q).reduce((i, n) => i.multiply(n.evaluate(e)), new u("1"));
  }
  factorize(e) {
    const t = [];
    s(this, q).forEach((l) => {
      const c = l.polynom.factorize(e);
      if (c.length > 1) {
        const f = l.power.clone();
        t.push(...c.map((d) => new se(d, f)));
      } else
        t.push(l.clone());
    });
    const i = new Y(...t), n = i.numerator.reduce(), r = i.denominator.reduce();
    return n.divide(r);
  }
  get factors() {
    return s(this, q);
  }
  set factors(e) {
    h(this, q, e);
  }
  fromPolynom(e, t) {
    if (h(this, q, [new se(new N(e))]), t) {
      const i = new N(t);
      if (i.isOne())
        return this;
      if (i.isZero())
        throw new Error("Cannot divide by zero");
      s(this, q).push(new se(i, -1));
    }
    return this;
  }
  getZeroes() {
    const e = [].concat(...s(this, q).map((t) => t.polynom.getZeroes()));
    return e.sort((t, i) => t.value - i.value), e.filter(
      (t, i, n) => i === n.findIndex(
        (r) => r.value === t.value
      )
    );
  }
  hasVariable(e) {
    return s(this, q).some((t) => t.hasVariable(e));
  }
  inverse() {
    return h(this, q, s(this, q).map((e) => e.inverse())), this;
  }
  isEqual(e) {
    const t = Y.gcd(this, e), i = this.clone().divide(t).reduce(), n = e.clone().divide(t).reduce();
    return i.isOne() && n.isOne();
  }
  isOne() {
    return s(this, q).every((e) => e.isOne());
  }
  isZero() {
    return s(this, q).every((e) => e.isZero());
  }
  multiply(...e) {
    return e.forEach((t) => {
      h(this, q, s(this, q).concat(t.clone().factors));
    }), this;
  }
  get numerator() {
    return new Y(...s(this, q).filter((e) => e.power.isPositive()));
  }
  one() {
    return h(this, q, [new se("1", "1")]), this;
  }
  opposite() {
    const e = s(this, q).findIndex((t) => t.display === "(-1)");
    return e >= 0 ? s(this, q).splice(e, 1) : s(this, q).push(new se("-1", "1")), this;
  }
  pow(e) {
    return h(this, q, s(this, q).map((t) => t.pow(e))), this;
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    const e = ut(this);
    return h(this, q, Object.values(e).map((t) => {
      const i = t[0].polynom, n = t.reduce((r, l) => r.add(l.power), new u("0"));
      return new se(i, n.reduce());
    }).filter((t) => !t.power.isZero())), this;
  }
  root(e) {
    return h(this, q, s(this, q).map((t) => t.root(e))), this;
  }
  /**
   * Reoarder the factors using :
   * 1. number of monoms
   * 2. degree of polynom
   * 3. power of polyfactor
   */
  sort(e) {
    return s(this, q).sort((t, i) => {
      const n = t.power.value, r = i.power.value;
      if (n * r < 0)
        return -n;
      const l = t.polynom.monoms.length, c = i.polynom.monoms.length;
      if (l !== c)
        return l - c;
      const f = t.polynom.degree(e).value, d = i.polynom.degree(e).value;
      return f !== d ? f - d : n !== r ? n - r : t.degree().isLeq(i.degree()) ? -1 : 1;
    }), this;
  }
  sqrt() {
    return h(this, q, s(this, q).map((e) => e.sqrt())), this;
  }
  subtract(...e) {
    return this.add(...e.map((t) => t.opposite()));
  }
  tableOfSigns() {
    const e = this.getZeroes(), t = e.map((r) => r.value), i = this.factors.map((r) => ({ factor: new se(r), ...r.tableOfSigns() }));
    return i.forEach((r) => {
      const l = new Array(2 * e.length + 1).fill("");
      let c = r.signs.shift(), f = r.roots.shift();
      const d = l.map((p, w) => {
        if (w % 2 === 0)
          return c;
        if (f === void 0 || f.value !== t[(w - 1) / 2])
          return "t";
        const L = r.signs.shift();
        return c = r.signs.shift(), f = r.roots.shift(), L;
      });
      r.roots = e, r.signs = d;
    }), { signs: i.map((r) => r.signs).reduce((r, l) => r.length === 0 ? l : (l.forEach((c, f) => {
      switch (c) {
        case "d":
          r[f] = "d";
          break;
        case "z":
          r[f] = r[f] === "d" ? "d" : "z";
          break;
        case "h":
          r[f] = "h";
          break;
        case "-":
          r[f] = r[f] === "h" ? "h" : r[f] === "-" ? "+" : "-";
          break;
      }
    }), r), []), roots: e, factors: i };
  }
  get variables() {
    return s(this, q).reduce((e, t) => e.concat(t.variables), []);
  }
  zero() {
    return h(this, q, [new se("0", "1")]), this;
  }
};
rt = new WeakMap(), q = new WeakMap(), Ye = new WeakSet(), ci = function(e, t) {
  const i = ut(e), n = ut(t), l = Object.keys(i).filter((c) => Object.hasOwn(n, c)).map((c) => {
    const f = i[c].reduce((p, w) => p.add(w.power), new u("0")), d = n[c].reduce((p, w) => p.add(w.power), new u("0"));
    return new se(c, u.min(f, d));
  });
  return new Y(...l);
}, zi = function(e, t) {
  const i = ut(e), n = ut(t), l = [.../* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(n)])].map((c) => {
    const f = Object.hasOwn(i, c) ? i[c].reduce((p, w) => p.add(w.power), new u("0")) : new u(0), d = Object.hasOwn(n, c) ? n[c].reduce((p, w) => p.add(w.power), new u("0")) : new u(0);
    return new se(c, u.max(f, d));
  });
  return new Y(...l);
}, bt = new WeakSet(), ui = function() {
  let e, t = [];
  return s(this, rt) === dt.ROOT ? (e = this.numerator.factors, t = this.denominator.factors) : e = s(this, q), e.length === 0 && (e = [new se("1")]), { num: e, den: t };
}, m(Y, Ye);
let li = Y;
function ut(o) {
  const e = new u().one(), t = new u().one(), i = o.factors.reduce((l, c) => {
    if (c.polynom.degree().isZero())
      return c.power.isPositive() ? e.multiply(c.polynom.monoms[0].coefficient) : t.multiply(c.polynom.monoms[0].coefficient), l;
    const f = c.polynom.display;
    return Object.hasOwn(l, f) ? l[f].push(c) : l[f] = [c], l;
  }, {}), { numerator: n, denominator: r } = e.divide(t).reduce();
  return n !== 1 && (i[n.toString()] = [new se(n, 1)]), r !== 1 && (i[r.toString()] = [new se(r, -1)]), i;
}
function ds(o, e) {
  return o.dimension === e.dimension && o.array.every(
    (t, i) => e.array[i].isEqual(t)
  );
}
function ps(o, e) {
  if (o.dimension !== e.dimension)
    return !1;
  const t = e.array[0].value / o.array[0].value;
  return o.array.every(
    (i, n) => e.array[n].value === i.value * t
  );
}
function ms(o, e) {
  return o.dimension !== e.dimension ? new u().invalid() : o.array.reduce(
    (t, i, n) => t.add(i.clone().multiply(e.array[n])),
    new u(0)
  );
}
function gs(...o) {
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
var j, Ve;
const De = class De {
  constructor(...e) {
    m(this, j, []);
    m(this, Ve, !1);
    a(this, "zero", () => (s(this, j).forEach((e) => e.zero()), this));
    a(this, "one", () => (this.zero(), this.x.one(), this));
    a(this, "opposite", () => (s(this, j).forEach((e) => e.opposite()), this));
    a(this, "add", (e) => (s(this, j).forEach((t, i) => t.add(e.array[i])), this));
    a(this, "subtract", (e) => this.add(e.clone().opposite()));
    a(this, "unit", () => {
      const e = this.norm;
      return e === 0 ? this : this.divideByScalar(e);
    });
    a(this, "dot", (e) => ms(this, e));
    a(this, "normal", () => {
      if (this.dimension >= 3)
        throw new Error("Normal vector can only be determined in 2D");
      const e = this.x.clone().opposite(), t = this.y.clone();
      return s(this, j)[0] = t, s(this, j)[1] = e, this;
    });
    a(this, "isEqual", (e) => ds(this, e));
    a(this, "isColinearTo", (e) => ps(this, e));
    a(this, "isNormalTo", (e) => this.dot(e).isZero());
    a(this, "multiplyByScalar", (e) => {
      const t = new u(e);
      return this.array.forEach((i) => i.multiply(t)), this;
    });
    a(this, "divideByScalar", (e) => this.multiplyByScalar(new u(e).inverse()));
    a(this, "simplify", () => this.multiplyByScalar(
      G.lcm(...this.array.map((e) => e.denominator))
    ).divideByScalar(
      G.gcd(...this.array.map((e) => e.numerator))
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
      return t.length < 2 ? this : (h(this, j, t.map((i) => new u(i))), this);
    });
    e.length > 0 && this.parse(...e);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get array() {
    return s(this, j);
  }
  set array(e) {
    h(this, j, e);
  }
  get x() {
    return s(this, j)[0];
  }
  set x(e) {
    s(this, j)[0] = new u(e);
  }
  get y() {
    return s(this, j)[1];
  }
  set y(e) {
    s(this, j)[1] = new u(e);
  }
  get z() {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    return s(this, j)[2];
  }
  set z(e) {
    if (this.dimension < 3)
      throw new Error("Vector is not 3D");
    s(this, j)[2] = new u(e);
  }
  get asPoint() {
    return s(this, Ve);
  }
  set asPoint(e) {
    h(this, Ve, e);
  }
  get normSquare() {
    return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new u(0));
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
      h(this, j, s(this, j).slice(0, e));
    else if (e > this.dimension)
      for (let t = this.dimension; t < e; t++)
        s(this, j).push(new u(0));
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
        return h(this, j, i.array.map((n, r) => n.clone().subtract(t.array[r]))), this;
      }
    }
    return h(this, j, e.map((t) => new u(t))), this;
  }
  clone() {
    const e = new De();
    return e.array = this.copy(), e.asPoint = this.asPoint, e;
  }
  copy() {
    return s(this, j).map((e) => e.clone());
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
j = new WeakMap(), Ve = new WeakMap();
let E = De;
var ve = /* @__PURE__ */ ((o) => (o.None = "none", o.Parallel = "parallel", o.Perpendicular = "perpendicular", o.Tangent = "tangent", o))(ve || {}), fi = /* @__PURE__ */ ((o) => (o.None = "none", o.Parallel = "parallel", o.Perpendicular = "perpendicular", o.Tangent = "tangent", o))(fi || {});
function Ri(o = 0.5) {
  return Math.random() < o;
}
function me(o, e, t) {
  if (e === void 0)
    return o >= 0 ? me(0, o) : me(o, 0);
  if (o === e)
    return o;
  if (t === void 0)
    return Math.floor(Math.random() * (e - o + 1) + o);
  if (Math.abs(e - o) <= t.length)
    throw new Error("The number of excluded values is too high.");
  let i = me(o, e);
  for (; t.includes(i); )
    i = me(o, e);
  return i;
}
function H(o, e) {
  return e === !1 ? Ri() ? me(1, o) : -me(1, o) : me(-o, o);
}
function ys(o) {
  let e = G.primes();
  return o !== void 0 && (e = e.filter((t) => t < o)), bi(e);
}
function ws(o, e) {
  return e === void 0 && (e = 1), o.length <= 0 ? Object.values(o) : Di(o).slice(0, e);
}
function bi(o) {
  return o.length === 0 ? null : o[me(0, o.length - 1)];
}
function Di(o) {
  const e = Object.values(o);
  for (let t = e.length - 1; t > 0; t--) {
    const i = Math.floor(Math.random() * (t + 1)), n = e[t];
    e[t] = e[i], e[i] = n;
  }
  return e;
}
class S extends E {
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
    const e = new S();
    return e.array = this.copy(), e.asPoint = !0, e;
  }
}
var Ie, I, R, W, he, J, ze, Ee;
const je = class je {
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...e) {
    m(this, Ie);
    // ax + by + c = 0
    m(this, I);
    m(this, R);
    m(this, W);
    m(this, he);
    m(this, J);
    m(this, ze);
    m(this, Ee, "canonical");
    a(this, "randomPoint", (e) => {
      const t = s(this, J).clone().multiplyByScalar(H(e === void 0 || e <= 1 ? 3 : e, !1)).add(s(this, he));
      return t.asPoint = !0, t;
    });
    a(this, "randomNearPoint", (e) => {
      const t = this.randomPoint(e);
      let i = 10;
      for (; this.isOnLine(t) && i > 0; )
        t.x.add(H(1, !1)), t.y.add(H(1, !1)), i--;
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
        if (e[0] instanceof V)
          return this.fromEquation(e[0]);
        if (typeof e[0] == "string")
          try {
            const t = new V(e[0]);
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
          if (e[2] === ve.Perpendicular)
            return this.fromPointAndNormal(e[0], e[1]);
          if (e[2] === ve.Parallel)
            return this.fromPointAndDirection(e[0], e[1]);
        }
        return e[0] instanceof E && e[1] instanceof je ? e[2] === ve.Parallel || e[2] === null ? this.fromPointAndLine(e[0], e[1], ve.Parallel) : this.fromPointAndLine(e[0], e[1], ve.Perpendicular) : this.fromCoefficient(
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
    a(this, "fromCoefficient", (e, t, i) => (h(this, I, new u(e)), h(this, R, new u(t)), h(this, W, new u(i)), h(this, J, new E(s(this, R).clone(), s(this, I).clone().opposite())), h(this, he, new E(new u().zero(), s(this, W).clone())), h(this, ze, s(this, J).clone().normal()), this));
    a(this, "fromPointAndDirection", (e, t) => (this.fromCoefficient(
      t.y,
      t.x.clone().opposite(),
      e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)).opposite()
    ), h(this, he, e.clone()), h(this, J, t.clone()), h(this, ze, s(this, J).clone().normal()), this));
    a(this, "fromPointAndNormal", (e, t) => this.fromCoefficient(
      t.x,
      t.y,
      e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()
    ));
    a(this, "fromPointAndLine", (e, t, i) => (i === void 0 && (i = ve.Parallel), i === ve.Parallel ? this.fromPointAndNormal(e, t.normal) : i === ve.Perpendicular ? this.fromPointAndNormal(e, t.director) : this));
    a(this, "clone", () => (h(this, I, s(this, I).clone()), h(this, R, s(this, R).clone()), h(this, W, s(this, W).clone()), h(this, J, s(this, J).clone()), h(this, he, s(this, he).clone()), h(this, ze, s(this, ze).clone()), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    a(this, "isOnLine", (e) => s(this, I).clone().multiply(e.x).add(
      s(this, R).clone().multiply(e.y)
    ).add(s(this, W)).isZero());
    a(this, "isParallelTo", (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height));
    a(this, "isSameAs", (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height));
    a(this, "isPerpendicularTo", (e) => this.d.isNormalTo(e.d));
    a(this, "isVertical", () => this.slope.isInfinity());
    a(this, "simplify", () => {
      const e = G.lcm(s(this, I).denominator, s(this, R).denominator, s(this, W).denominator), t = G.gcd(s(this, I).numerator, s(this, R).numerator, s(this, W).numerator);
      return this.fromCoefficient(
        s(this, I).clone().multiply(e).divide(t),
        s(this, R).clone().multiply(e).divide(t),
        s(this, W).clone().multiply(e).divide(t)
      ), this;
    });
    a(this, "simplifyDirection", () => (s(this, J).simplify(), this));
    a(this, "intersection", (e) => {
      const t = new S();
      let i = !1, n = !1;
      return s(this, R).isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = new u().invalid(), t.y = new u().invalid(), i = !0) : this.isSameAs(e) ? (t.x = new u().invalid(), t.y = new u().invalid(), n = !0) : (t.x = s(this, R).clone().multiply(e.c).subtract(s(this, W).clone().multiply(e.b)).divide(s(this, I).clone().multiply(e.b).subtract(s(this, R).clone().multiply(e.a))), t.y = s(this, I).clone().multiply(e.c).subtract(s(this, W).clone().multiply(e.a)).divide(s(this, R).clone().multiply(e.a).subtract(s(this, I).clone().multiply(e.b)))), {
        point: t,
        hasIntersection: !(i || n),
        isParallel: i,
        isSame: n
      };
    });
    a(this, "getValueAtX", (e) => {
      const t = this.getEquation().isolate("y"), i = new u(e);
      return t instanceof V ? t.right.evaluate({ x: i }) : new u().invalid();
    });
    a(this, "getValueAtY", (e) => {
      const t = this.getEquation().isolate("x"), i = new u(e);
      return t instanceof V ? t.right.evaluate({ y: i }) : new u().invalid();
    });
    return h(this, I, new u().zero()), h(this, R, new u().zero()), h(this, W, new u().zero()), h(this, he, new E()), h(this, J, new E()), h(this, ze, new E()), h(this, Ie, !0), e.length > 0 && this.parse(...e), this;
  }
  get a() {
    return s(this, I);
  }
  // ------------------------------------------
  // Getter and setter
  set a(e) {
    h(this, I, e);
  }
  get b() {
    return s(this, R);
  }
  set b(e) {
    h(this, R, e);
  }
  get c() {
    return s(this, W);
  }
  set c(e) {
    h(this, W, e);
  }
  get OA() {
    return s(this, he);
  }
  set OA(e) {
    h(this, he, e);
  }
  get d() {
    return s(this, J);
  }
  set d(e) {
    h(this, J, e);
  }
  get n() {
    return s(this, ze);
  }
  // ------------------------------------------
  getEquation() {
    const e = new V(new N().parse("xy", s(this, I), s(this, R), s(this, W)), new N("0"));
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
    return h(this, Ee, "canonical"), this;
  }
  get equation() {
    return h(this, Ee, "equation"), this;
  }
  get mxh() {
    return h(this, Ee, "mxh"), this;
  }
  get parametric() {
    return h(this, Ee, "parametric"), this;
  }
  get system() {
    return h(this, Ee, "system"), this;
  }
  get tex() {
    const e = s(this, Ee);
    switch (h(this, Ee, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().tex;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new N().parse("x", this.slope, this.height).tex;
      case "parametric":
      case "system": {
        const t = s(this, J).clone();
        return s(this, Ie) && t.simplify(), e === "parametric" ? `${E.asTex("x", "y")} = ${E.asTex(s(this, he).x.tex, s(this, he).y.tex)} + k\\cdot ${E.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}
            x &= ${new N(s(this, he).x).add(new k(s(this, J).x).multiply(new k("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new N(s(this, he).y).add(new k(s(this, J).y).multiply(new k("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`;
      }
      default: {
        const t = this.getEquation();
        return s(this, I).isNegative() && t.multiply(-1), t.tex;
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
    const e = s(this, Ee);
    switch (h(this, Ee, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().display;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new N().parse("x", this.slope, this.height).display;
      case "parametric": {
        const t = s(this, J).clone();
        return s(this, Ie) && t.simplify(), `((x,y))=((${s(this, he).x.display},${s(this, he).y.display}))+k((${t.x.display},${t.y.display}))`;
      }
      default: {
        const t = this.getEquation();
        return s(this, I).isNegative() && t.multiply(-1), t.display;
      }
    }
  }
  get normal() {
    return new E(s(this, I), s(this, R));
  }
  get director() {
    return s(this, J).clone();
  }
  get slope() {
    return s(this, I).clone().opposite().divide(s(this, R));
  }
  get height() {
    return s(this, W).clone().opposite().divide(s(this, R));
  }
  fromPoints(e, t) {
    return this.fromPointAndDirection(e, new E(e, t));
  }
  distanceTo(e) {
    const t = e.x.clone().multiply(s(this, I)).add(e.y.clone().multiply(s(this, R))).add(s(this, W)).abs(), i = this.normal.normSquare;
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
    return s(this, I).isZero() || (s(this, I).isOne() ? t = "x" : s(this, I).clone().opposite().isOne() ? t = "-x" : t = s(this, I).value.toFixed(e) + "x"), s(this, R).isZero() || (s(this, R).isPositive() && (t += "+"), t += s(this, R).value.toFixed(e) + "y"), s(this, W).isZero() || (s(this, W).isPositive() && (t += "+"), t += s(this, W).value.toFixed(e)), t + "=0";
  }
};
Ie = new WeakMap(), I = new WeakMap(), R = new WeakMap(), W = new WeakMap(), he = new WeakMap(), J = new WeakMap(), ze = new WeakMap(), Ee = new WeakMap(), // A line is defined as the canonical form
a(je, "PERPENDICULAR", ve.Perpendicular), a(je, "PARALLEL", ve.Parallel);
let z = je;
var ae, U, Me, Ht, Kt, Jt, le, Li, kt, Zi, Vi, Fi, di;
const _t = class _t {
  constructor(...e) {
    m(this, le);
    m(this, ae);
    m(this, U);
    m(this, Me);
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    a(this, "relativePosition", (e) => {
      if (s(this, ae) === void 0 || s(this, U) === void 0)
        throw new Error("Circle not defined");
      const t = e.distanceTo(s(this, ae)), i = Math.sqrt(s(this, U).value);
      return t.value - i > 1e-10 ? 0 : Math.abs(t.value - i) < 1e-10 ? 1 : 2;
    });
    a(this, "lineIntersection", (e) => {
      const t = [];
      if (s(this, Me) === void 0)
        return [];
      const i = s(this, Me).clone(), n = e.getEquation().clone().isolate("x"), r = e.getEquation().clone().isolate("y");
      return n instanceof V && r instanceof V && (i.replaceBy("y", r.right).simplify(), i.solve()), t;
    });
    a(this, "tangents", (e) => e instanceof u ? s(this, Jt).call(this, e) : this.isPointOnCircle(e) ? s(this, Ht).call(this, e) : s(this, ae) !== void 0 && s(this, ae).distanceTo(e).value > this.radius.value ? s(this, Kt).call(this, e) : (console.log("No tangents as the point is inside !"), []));
    a(this, "isPointOnCircle", (e) => {
      var t;
      return ((t = s(this, Me)) == null ? void 0 : t.test({ x: e.x, y: e.y })) ?? !1;
    });
    a(this, "getPointsOnCircle", (e) => {
      const t = G.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), i = [];
      return t.forEach((n) => {
        for (const r of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
          i.push(
            new S(
              this.center.x.clone().add(r[0] * n[0]),
              this.center.y.clone().add(r[1] * n[1])
            )
          );
      }), i;
    });
    m(this, Ht, (e) => {
      const t = new E(this.center, e);
      return [new z(e, t, ve.Perpendicular)];
    });
    m(this, Kt, (e) => {
      const t = this.center.x.clone().subtract(e.x), i = this.center.y.clone().subtract(e.y), n = new N("x"), r = new N("x^2+1");
      return n.multiply(t).subtract(i).pow(2), r.multiply(this.squareRadius), new V(n, r).solve().map((f) => {
        let d;
        const p = new V("y", "x");
        return f.exact instanceof u ? (d = e.x.clone().opposite().multiply(f.exact).add(e.y), p.right.multiply(f.exact).add(d)) : (d = e.x.clone().opposite().multiply(f.value).add(e.y), p.right.multiply(f.value).add(d)), new z(p);
      });
    });
    m(this, Jt, (e) => {
      const t = e.numerator, i = -e.denominator, n = this.center.x.clone(), r = this.center.y.clone(), l = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), c = n.clone().multiply(t).opposite().subtract(r.clone().multiply(i)).add(l.clone().sqrt()), f = n.clone().multiply(t).opposite().subtract(r.clone().multiply(i)).subtract(l.clone().sqrt());
      return [new z(t, i, c), new z(t, i, f)];
    });
    e.length > 0 && this.parse(...e);
  }
  get center() {
    return s(this, ae) ?? new S();
  }
  get squareRadius() {
    return s(this, U) ?? new u(0);
  }
  get cartesian() {
    if (s(this, Me) === void 0)
      throw new Error("Cartesian equation not defined");
    return s(this, Me);
  }
  get radius() {
    return s(this, U) === void 0 ? { tex: "", display: "", value: 0 } : s(this, U).isSquare() ? {
      tex: s(this, U).clone().sqrt().tex,
      display: s(this, U).clone().sqrt().display,
      value: s(this, U).clone().sqrt().value
    } : {
      tex: `\\sqrt{${s(this, U).tex}}`,
      display: `sqrt(${s(this, U).display})`,
      value: s(this, U).clone().sqrt().value
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
    return new _t(
      this.center.clone(),
      this.squareRadius.clone(),
      !0
    );
  }
  setRadius(e, t) {
    return t ? h(this, U, new u(e)) : h(this, U, new u(e).pow(2)), A(this, le, kt).call(this), this;
  }
  parse(...e) {
    return A(this, le, Li).call(this), typeof e[0] == "string" ? A(this, le, di).call(this, new V(e[0])) : e[0] instanceof V ? A(this, le, di).call(this, e[0]) : e[0] instanceof _t ? A(this, le, Zi).call(this, e[0]) : e[0] instanceof S && e.length > 1 && (e[1] instanceof S ? e[2] instanceof S || A(this, le, Fi).call(this, e[0], e[1]) : (e[1] instanceof u || typeof e[1] == "number") && A(this, le, Vi).call(this, e[0], e[1], typeof e[2] == "boolean" ? e[2] : !1)), A(this, le, kt).call(this), this;
  }
  // private _parseThroughtThreePoints(A: Point, B: Point, C: Point): this {
  //     const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(),
  //         mAC = T.remarquables.mediators.AC.clone()
  //     this.parse(mAB.intersection(mAC).point, A)
  //     return this
  // }
};
ae = new WeakMap(), U = new WeakMap(), Me = new WeakMap(), Ht = new WeakMap(), Kt = new WeakMap(), Jt = new WeakMap(), le = new WeakSet(), Li = function() {
  return h(this, ae, void 0), h(this, U, void 0), h(this, Me, void 0), this;
}, kt = function() {
  h(this, Me, new V(
    new N(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
    new N(this.squareRadius.display)
  ).moveLeft());
}, Zi = function(e) {
  return h(this, ae, e.center.clone()), h(this, U, e.squareRadius.clone()), A(this, le, kt).call(this), this;
}, Vi = function(e, t, i) {
  return h(this, ae, e.clone()), i ? h(this, U, new u(t)) : h(this, U, new u(t).pow(2)), this;
}, Fi = function(e, t) {
  return h(this, ae, e.clone()), h(this, U, new E(s(this, ae), t).normSquare), this;
}, di = function(e) {
  if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
    const t = e.left.monomByDegree(2, "x"), i = e.left.monomByDegree(2, "y");
    let n, r, l;
    t.coefficient.isEqual(i.coefficient) ? (e.divide(t.coefficient), n = e.left.monomByDegree(1, "x"), r = e.left.monomByDegree(1, "y"), l = e.left.monomByDegree(0), h(this, ae, new S(n.coefficient.clone().divide(2).opposite(), r.coefficient.clone().divide(2).opposite())), h(this, U, l.coefficient.clone().opposite().add(s(this, ae).x.clone().pow(2)).add(s(this, ae).y.clone().pow(2)))) : (h(this, ae, void 0), h(this, U, void 0));
  }
  return this;
};
let $t = _t;
var D, X;
const pt = class pt {
  constructor(e, t) {
    // ax + by + c = 0
    m(this, D, new S());
    m(this, X, new E());
    a(this, "clone", () => (h(this, X, s(this, X).clone()), h(this, D, s(this, D).clone()), this));
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
      const t = s(this, D).clone(), i = new u(H(e, !1));
      return new S(
        t.x.clone().add(s(this, X).x.clone().multiply(i)),
        t.y.clone().add(s(this, X).y.clone().multiply(i)),
        t.z.clone().add(s(this, X).z.clone().multiply(i))
      );
    });
    return h(this, D, e.clone()), h(this, X, t.asPoint ? new E(e, t) : t.clone()), this;
  }
  get OA() {
    return s(this, D);
  }
  set OA(e) {
    h(this, D, e);
  }
  get point() {
    return s(this, D).clone();
  }
  get d() {
    return s(this, X);
  }
  set d(e) {
    h(this, X, e);
  }
  get tex() {
    return {
      parametric: `${E.asTex("x", "y", "z")} = ${E.asTex(s(this, D).x.tex, s(this, D).y.tex, s(this, D).z.tex)} + k\\cdot ${E.asTex(s(this, X).x.tex, s(this, X).y.tex, s(this, X).z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new N(s(this, D).x).add(new k(s(this, X).x).multiply(new k("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new N(s(this, D).y).add(new k(s(this, X).y).multiply(new k("k"))).reorder("k", !0).tex}\\\\
    z &= ${new N(s(this, D).z).add(new k(s(this, X).z).multiply(new k("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
      cartesian: `\\frac{ ${new N("x", 1, s(this, D).x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new N("y", 1, s(this, D).y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new N("z", 1, s(this, D).z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
    };
  }
  get display() {
    const e = s(this, D).x.display, t = s(this, D).y.display, i = s(this, D).z.display, n = this.direction.simplify(), r = n.x.display, l = n.y.display, c = n.z.display;
    return {
      parametric: `${E.asDisplay("x", "y", "z")} = ${E.asDisplay(s(this, D).x.display, s(this, D).y.display, s(this, D).z.display)} + k\\cdot ${E.asDisplay(s(this, X).x.display, s(this, X).y.display, s(this, X).z.display)}`,
      system: "",
      cartesian: `(x-${e})/${r} = (y-${t})/${l} = (z-${i})/${c}`
    };
  }
  get direction() {
    return s(this, X).clone();
  }
  distanceTo(e) {
    const t = new E(s(this, D), e), i = this.direction, n = this.direction.normSquare, r = t.cross(i).normSquare, l = r.clone().divide(n), c = l.clone().sqrt();
    return console.log("CROSS", t.cross(i).display), {
      value: Math.sqrt(l.value),
      fraction: l.clone().sqrt(),
      tex: c.isExact() ? c.tex : `\\sqrt{${l.tex}}`
    };
  }
  hitSegment(e, t) {
    const i = this.intersection(
      new pt(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) && i.point.z.value >= Math.min(e.z.value, t.z.value) && i.point.z.value <= Math.max(e.z.value, t.z.value) : !1;
  }
};
D = new WeakMap(), X = new WeakMap(), // A line is defined as the canonical form
a(pt, "PERPENDICULAR", fi.Perpendicular), a(pt, "PARALLEL", fi.Parallel);
let Bt = pt;
var $e;
class vs {
  constructor(...e) {
    m(this, $e, []);
    return h(this, $e, e), this;
  }
  get values() {
    return s(this, $e);
  }
  get array() {
    return s(this, $e).map((e) => e.array);
  }
  get dimension() {
    return [s(this, $e).length, s(this, $e)[0].dimension];
  }
  isSquare() {
    return s(this, $e).length === s(this, $e)[0].dimension;
  }
  determinant() {
    if (!this.isSquare())
      throw new Error("Matrix is not square");
    return gs(...this.values);
  }
}
$e = new WeakMap();
var Be, Xe;
const Ei = class Ei {
  constructor(e) {
    m(this, Be, new E(0, 0, 1));
    m(this, Xe, new S(0, 0, 0));
    return e && this.parse(e), this;
  }
  get normal() {
    return s(this, Be);
  }
  set normal(e) {
    h(this, Be, e), s(this, Be).asPoint = !1;
  }
  get point() {
    return s(this, Xe);
  }
  set point(e) {
    h(this, Xe, e), s(this, Xe).asPoint = !0;
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
    return s(this, Be).dot(s(this, Xe)).opposite();
  }
  get tex() {
    return new V(
      new N("xyz", this.a, this.b, this.c, this.d),
      new N(0)
    ).reduce().tex;
  }
  get display() {
    return new V(
      new N("xyz", this.a, this.b, this.c, this.d),
      new N(0)
    ).reduce().display;
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
      const r = e.equation.moveLeft().reduce().left, l = r.monomByLetter("x").coefficient, c = r.monomByLetter("y").coefficient, f = r.monomByLetter("z").coefficient, d = r.monomByDegree(0).coefficient;
      this.normal = new E(l, c, f), l.isNotZero() ? this.point = new S(d.clone().divide(l).opposite(), 0, 0) : c.isNotZero() ? this.point = new S(0, d.clone().divide(c).opposite(), 0) : this.point = new S(0, 0, d.clone().divide(f).opposite());
      return;
    }
    if (((i = e.points) == null ? void 0 : i.length) === 3 && e.points.every((r) => r instanceof E)) {
      const r = e.points[0], l = e.points[1], c = e.points[2], f = new E(r, l), d = new E(r, c);
      this.normal = f.cross(d), this.point = r;
      return;
    }
    if (((n = e.coefficients) == null ? void 0 : n.length) === 4) {
      const [r, l, c, f] = e.coefficients;
      this.normal = new E(r, l, c), this.point = new S(0, 0, -f);
      return;
    }
  }
  angle(e, t, i) {
    if (e instanceof Ei)
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
    throw this.normal.cross(e.normal), new S(0, 0, 0), new Error("Intersection with plane  not yet implemented !");
  }
  isPointOnPlane(e) {
    return this.normal.dot(e).add(this.d).isZero();
  }
};
Be = new WeakMap(), Xe = new WeakMap();
let pi = Ei;
var Q, _, ee, ot, Pe, xt, ei, Et, Re, ti, ht;
const ii = class ii {
  constructor(...e) {
    m(this, Q, new S());
    m(this, _, new S());
    m(this, ee, new S());
    m(this, ot, {
      AB: new z(),
      AC: new z(),
      BC: new z()
    });
    m(this, Pe, {
      AB: new S(),
      AC: new S(),
      BC: new S()
    });
    m(this, xt, null);
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
            ...e.map((t) => new z(t))
          );
        if (e.every((t) => t instanceof z)) {
          const t = e[0].clone(), i = e[1].clone(), n = e[2].clone();
          h(this, ot, { AB: t, BC: i, AC: n });
          let r = t.intersection(i);
          if (r.hasIntersection)
            h(this, _, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (r = i.intersection(n), r.hasIntersection)
            h(this, ee, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (r = n.intersection(t), r.hasIntersection)
            h(this, Q, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
        } else e.every((t) => t instanceof S) && (h(this, Q, e[0].clone()), h(this, _, e[1].clone()), h(this, ee, e[2].clone()), h(this, ot, {
          AB: new z(s(this, Q), s(this, _)),
          BC: new z(s(this, _), s(this, ee)),
          AC: new z(s(this, Q), s(this, ee))
        }));
      } else if (e.length === 1 && e[0] instanceof ii)
        return e[0].clone();
      return s(this, ei).call(this), this;
    });
    /**
     * Clone the Triangle class
     */
    a(this, "clone", () => new ii(
      s(this, Q).clone(),
      s(this, _).clone(),
      s(this, ee).clone()
    ));
    // ------------------------------------------
    // Triangle operations and properties
    // ------------------------------------------
    /**
     * Generate the Line object for the three segments of the triangle
     */
    m(this, ei, () => {
      s(this, Q).asPoint = !0, s(this, _).asPoint = !0, s(this, ee).asPoint = !0, h(this, Pe, {
        AB: new S().middleOf(s(this, Q), s(this, _)),
        AC: new S().middleOf(s(this, Q), s(this, ee)),
        BC: new S().middleOf(s(this, _), s(this, ee))
      }), h(this, xt, s(this, ti).call(this));
    });
    /**
     * Get the Vector2D class for the given name
     * @param ptName
     */
    m(this, Et, (e) => {
      switch (e.toUpperCase()) {
        case "A":
          return s(this, Q);
        case "B":
          return s(this, _);
        case "C":
          return s(this, ee);
      }
      return s(this, Q);
    });
    /**
     * Get the vector for the segment given by name.
     * @param ptName1
     * @param ptName2
     */
    m(this, Re, (e, t) => new E(
      s(this, Et).call(this, e),
      s(this, Et).call(this, t)
    ));
    m(this, ti, () => {
      const e = {
        A: new z().fromPoints(s(this, Q), s(this, Pe).BC),
        B: new z().fromPoints(s(this, _), s(this, Pe).AC),
        C: new z().fromPoints(s(this, ee), s(this, Pe).AB),
        intersection: null
      }, t = {
        AB: new z().fromPointAndNormal(s(this, Pe).AB, new E(s(this, Q), s(this, _)).normal()),
        AC: new z().fromPointAndNormal(s(this, Pe).AC, new E(s(this, Q), s(this, ee)).normal()),
        BC: new z().fromPointAndNormal(s(this, Pe).BC, new E(s(this, _), s(this, ee)).normal()),
        intersection: null
      }, i = {
        A: new z().fromPointAndNormal(s(this, Q), new E(s(this, _), s(this, ee)).normal()),
        B: new z().fromPointAndNormal(s(this, _), new E(s(this, Q), s(this, ee)).normal()),
        C: new z().fromPointAndNormal(s(this, ee), new E(s(this, Q), s(this, _)).normal()),
        intersection: null
      }, n = s(this, ht).call(this, "A"), r = s(this, ht).call(this, "B"), l = s(this, ht).call(this, "C"), c = {
        A: n.internal,
        B: r.internal,
        C: r.internal,
        intersection: null
      }, f = {
        A: n.external,
        B: r.external,
        C: l.external,
        intersection: null
      }, d = {
        medians: e,
        mediators: t,
        heights: i,
        bisectors: c,
        externalBisectors: f
      };
      return d.medians.intersection = d.medians.A.intersection(d.medians.B).point, d.mediators.intersection = d.mediators.AB.intersection(d.mediators.BC).point, d.heights.intersection = d.heights.A.intersection(d.heights.B).point, d.bisectors.intersection = d.bisectors.A.intersection(d.bisectors.B).point, d;
    });
    m(this, ht, (e) => {
      const t = this.lines;
      let i, n;
      if (e === "A" ? (i = t.AB, n = t.AC) : e === "B" ? (i = t.AB, n = t.BC) : e === "C" && (i = t.BC, n = t.AC), i === void 0 || n === void 0)
        throw new Error(`The point ${e} does not exist`);
      const r = i.n.simplify().norm, l = n.n.simplify().norm, c = i.getEquation().multiply(l), f = n.getEquation().multiply(r), d = new z(c.clone().subtract(f).simplify()), p = new z(f.clone().subtract(c).simplify());
      return e === "A" ? d.hitSegment(this.B, this.C) ? { internal: d, external: p } : { internal: p, external: d } : e === "B" ? d.hitSegment(this.A, this.C) ? { internal: d, external: p } : { internal: p, external: d } : e === "C" ? d.hitSegment(this.B, this.A) ? { internal: d, external: p } : { internal: p, external: d } : { internal: d, external: p };
    });
    return e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setters
  // ------------------------------------------
  get A() {
    return s(this, Q);
  }
  get B() {
    return s(this, _);
  }
  get C() {
    return s(this, ee);
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
    return s(this, ot);
  }
  get remarquables() {
    return s(this, xt);
  }
};
Q = new WeakMap(), _ = new WeakMap(), ee = new WeakMap(), ot = new WeakMap(), Pe = new WeakMap(), xt = new WeakMap(), ei = new WeakMap(), Et = new WeakMap(), Re = new WeakMap(), ti = new WeakMap(), ht = new WeakMap();
let mi = ii;
var ji = /* @__PURE__ */ ((o) => (o[o.INTERIOR = 0] = "INTERIOR", o[o.EXTERIOR = 1] = "EXTERIOR", o[o.SECANT = 2] = "SECANT", o[o.TANGENT_INSIDE = 3] = "TANGENT_INSIDE", o[o.TANGENT_OUTSIDE = 4] = "TANGENT_OUTSIDE", o[o.SUPERPOSED = 5] = "SUPERPOSED", o[o.CONCENTRIC = 6] = "CONCENTRIC", o))(ji || {}), Te, de, Oe, at, Nt, qt, gi;
class Ui {
  constructor(e, t) {
    m(this, qt);
    m(this, Te);
    m(this, de);
    m(this, Oe);
    m(this, at, 1);
    m(this, Nt, (e) => {
      if (s(this, Oe) === void 0)
        throw new Error("Sphere3 is undefined");
      if (s(this, at) === 0)
        return e ? s(this, Oe).tex : s(this, Oe).display;
      const t = [];
      return ["x", "y", "z"].forEach((n) => {
        if (this.center[n].isZero())
          t.push(`${n}^2`);
        else {
          const r = new N(n).subtract(this.center[n]);
          t.push(
            e ? `\\(${r.tex}\\)^2` : `(${r.display})^2`
          );
        }
      }), t.join("+") + "=" + (e ? this.squareRadius.tex : this.squareRadius.display);
    });
    a(this, "relativePosition", (e) => {
      const t = this.center.distanceTo(e.center).value, i = this.radius.value, n = e.radius.value;
      return t > i + n ? 1 : t === i + n ? 4 : t === Math.abs(i - n) ? 3 : t < Math.abs(i - n) ? 0 : t === 0 ? i === n ? 5 : 6 : 2;
    });
    a(this, "isPointOnSphere", (e) => {
      var t;
      return ((t = s(this, Oe)) == null ? void 0 : t.test({
        x: e.x,
        y: e.y,
        z: e.z
      })) ?? !1;
    });
    return e && t && (h(this, Te, e), h(this, de, new u(t).clone().pow(2)), A(this, qt, gi).call(this)), this;
  }
  fromEquation(e) {
    const t = new V(e).moveLeft().reduce(), i = ["x", "y", "z"];
    if (i.some((r) => t.degree(r).value !== 2))
      return this.makeUndefined();
    const n = t.left.monomByDegree(2, "x").coefficient;
    return i.some((r) => t.left.monomByDegree(2, r).coefficient.isNotEqual(n)) ? this.makeUndefined() : (h(this, Te, new S(
      t.left.monomByDegree(1, "x").coefficient.clone().opposite().divide(2),
      t.left.monomByDegree(1, "y").coefficient.clone().opposite().divide(2),
      t.left.monomByDegree(1, "z").coefficient.clone().opposite().divide(2)
    )), h(this, de, t.left.monomByDegree(0).coefficient.clone().opposite().add(s(this, Te).x.clone().pow(2)).add(s(this, Te).y.clone().pow(2)).add(s(this, Te).z.clone().pow(2))), A(this, qt, gi).call(this), this);
  }
  get center() {
    if (s(this, Te) === void 0)
      throw new Error("Sphere3 is undefined");
    return s(this, Te);
  }
  get squareRadius() {
    if (s(this, de) === void 0)
      throw new Error("Sphere3 is undefined");
    return s(this, de);
  }
  get radius() {
    if (s(this, de) === void 0)
      throw new Error("Sphere3 is undefined");
    return s(this, de).isSquare() ? {
      tex: s(this, de).clone().sqrt().tex,
      display: s(this, de).clone().sqrt().display,
      value: s(this, de).clone().sqrt().value
    } : {
      tex: `\\sqrt{${s(this, de).tex}}`,
      display: `sqrt(${s(this, de).display})`,
      value: s(this, de).clone().sqrt().value
    };
  }
  get equation() {
    if (s(this, Oe) === void 0)
      throw new Error("Sphere3 is undefined");
    return s(this, Oe);
  }
  makeUndefined() {
    return h(this, Te, void 0), h(this, de, void 0), h(this, Oe, void 0), this;
  }
  get centerRadius() {
    return h(this, at, 1), this;
  }
  get developped() {
    return h(this, at, 0), this;
  }
  get tex() {
    return s(this, Nt).call(this, !0);
  }
  get display() {
    return s(this, Nt).call(this, !1);
  }
}
Te = new WeakMap(), de = new WeakMap(), Oe = new WeakMap(), at = new WeakMap(), Nt = new WeakMap(), qt = new WeakSet(), gi = function() {
  h(this, Oe, new V(
    new N("x").subtract(this.center.x).pow(2).add(
      new N("y").subtract(this.center.y).pow(2)
    ).add(
      new N("z").subtract(this.center.z).pow(2)
    ),
    new N(this.squareRadius)
  ).reduce());
}, a(Ui, "RELATIVE_POSITION", ji);
function Pt(o) {
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
  if (e.negative ? t.numerator = H(e.max, e.zero) : t.numerator = me(e.zero ? 0 : 1, e.max), e.natural)
    t.denominator = 1;
  else {
    let i = 0;
    for (; t.isRelative() && i < 10; )
      t.denominator = me(1, e.max), i++;
  }
  return e.reduced ? t.reduce() : t;
}
function Gi(o) {
  const e = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    o
  ), t = new k();
  if (t.coefficient = Pt({
    zero: e.zero,
    reduced: !0,
    natural: !e.fraction
  }), e.letters.length > 1) {
    for (const i of e.letters.split(""))
      t.setLetter(i, 0);
    for (let i = 0; i < e.degree; i++) {
      const n = bi(e.letters.split(""));
      t.setLetter(n, t.degree(n).clone().add(1));
    }
  } else
    t.setLetter(e.letters, e.degree);
  return t;
}
const bs = {
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
function Wi(o) {
  const e = Object.assign(
    bs,
    o
  ), t = new N().empty();
  let i;
  for (let n = e.degree; n >= 0; n--)
    i = Gi({
      letters: e.letters,
      degree: n,
      fraction: e.fraction,
      zero: n === e.degree ? !1 : e.allowNullMonom
    }), e.unit && e.degree === n && i.coefficient.one(), t.add(i);
  if (e.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposite(), e.numberOfMonoms && e.numberOfMonoms > 0 && e.numberOfMonoms < t.length)
    for (; t.length > e.numberOfMonoms; ) {
      const n = me(1, t.length - 1);
      t.monoms.splice(n, 1);
    }
  return t.reduce();
}
function xs(o) {
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
  ), t = new N().one();
  for (let i = 0; i < e.degree; i++) {
    const n = Wi({
      degree: 1,
      unit: e.unit,
      fraction: e.fraction,
      letters: e.letters,
      zero: e.zero
    });
    t.multiply(n);
  }
  return new V(t, 0);
}
function yi(o) {
  const e = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    o
  ), t = e.axis === "x", i = e.axis === "y", n = e.fraction ? Pt({ max: e.max, zero: t }) : new u(H(e.max, t)), r = e.fraction ? Pt({ max: e.max, zero: i }) : new u(H(e.max, i));
  return Number(e.quadrant) === 1 && (n.abs(), r.abs()), Number(e.quadrant) === 2 && (n.isPositive() && n.opposite(), r.isNegative() && r.opposite()), Number(e.quadrant) === 3 && (n.isPositive() && n.opposite(), r.isPositive() && r.opposite()), Number(e.quadrant) === 4 && (n.isNegative() && n.opposite(), r.isPositive() && r.opposite()), new S(n, r);
}
function Es(o) {
  const e = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    o
  ), t = yi(e.center);
  let i, n;
  return e.pointsOnCircle === 8 ? (i = me(1, 3), n = i ** 2 + (i + 1) ** 2) : n = me(1, 20), new $t(t, n, !0);
}
function Ns(o) {
  const e = Object.assign(
    {
      A: {
        x: H(10),
        y: H(10)
      }
    },
    o
  ), t = new E(
    H(10),
    H(10)
  );
  for (; t.isNull; )
    t.x = H(10), t.y = H(10);
  return e.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposite() : e.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposite(), new z().fromPointAndDirection(new E(e.A.x, e.A.y), t);
}
function qs(o) {
  const e = Object.assign(
    {
      A: {
        x: H(10),
        y: H(10),
        z: H(10)
      },
      direction: {
        x: H(10),
        y: H(10),
        z: H(10)
      }
    },
    o
  ), t = new S(e.A.x, e.A.y, e.A.z), i = new E(e.direction.x, e.direction.y, e.direction.z);
  return new Bt(t, i);
}
const As = {
  equation: (o) => xs(o),
  polynom: (o) => Wi(o),
  monom: (o) => Gi(o),
  fraction: (o) => Pt(o),
  number: (o, e, t) => me(o, e, t),
  numberSym: (o, e) => H(o, e),
  prime: (o) => ys(o),
  bool: (o) => Ri(o),
  array: (o, e) => ws(o, e),
  item: (o) => bi(o),
  shuffle: (o) => Di(o),
  line: (o) => Ns(o),
  line3: (o) => qs(o),
  vector: (o) => yi(o),
  point: (o) => {
    const e = yi(o);
    return e.asPoint = !0, e;
  },
  circle: (o) => Es(o)
}, Os = {
  Numeric: G,
  Fraction: u,
  Root: At,
  Monom: k,
  Polynom: N,
  Equation: V,
  Matrix: vs,
  LinearSystem: hi,
  Factor: se,
  PolyFactor: li,
  LogicalSet: fs,
  Random: As,
  Geometry: {
    Vector: E,
    Point: S,
    Line: z,
    Triangle: mi,
    Circle: $t,
    Line3: Bt,
    Plane3: pi,
    Sphere3: Ui
  },
  NumExp: us
};
export {
  $t as Circle,
  V as Equation,
  Mt as EquationSolver,
  dt as FACTOR_DISPLAY,
  se as Factor,
  u as Fraction,
  z as Line,
  Bt as Line3,
  hi as LinearSystem,
  fs as LogicalSet,
  vs as Matrix,
  k as Monom,
  At as NthRoot,
  us as NumExp,
  G as Numeric,
  pi as Plane3,
  S as Point,
  li as PolyFactor,
  N as Polynom,
  As as Random,
  ji as SPHERE3_RELATIVE_POSITION,
  Ui as Sphere3,
  mi as Triangle,
  E as Vector,
  ps as areVectorsColinears,
  ds as areVectorsEquals,
  Os as default,
  gs as determinant,
  ms as dotProduct
};
//# sourceMappingURL=pimath.js.map
