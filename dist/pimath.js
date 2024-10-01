var Bi = Object.defineProperty;
var mi = (o) => {
  throw TypeError(o);
};
var Si = (o, e, t) => e in o ? Bi(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var a = (o, e, t) => Si(o, typeof e != "symbol" ? e + "" : e, t), Kt = (o, e, t) => e.has(o) || mi("Cannot " + t);
var s = (o, e, t) => (Kt(o, e, "read from private field"), t ? t.call(o) : e.get(o)), p = (o, e, t) => e.has(o) ? mi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), h = (o, e, t, i) => (Kt(o, e, "write to private field"), i ? i.call(o, t) : e.set(o, t), t), O = (o, e, t) => (Kt(o, e, "access private method"), t);
function Ri(o) {
  const e = yi(o), t = [];
  let i, n;
  for (; e.length > 0; )
    i = e.shift() ?? 1, n = (e.length > 0 ? e.pop() : +i) ?? 1, t.push([i, n]);
  return t;
}
function zi(...o) {
  const e = ci(...o);
  return o.map((t) => t / e);
}
function yi(o) {
  const e = Math.abs(o), t = Math.sqrt(e), i = [];
  for (let n = 1; n <= t; n++)
    o % n === 0 && (i.push(n), i.push(e / n));
  return i.sort(function(n, r) {
    return n - r;
  }), [...new Set(i)];
}
function ci(...o) {
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
function Li(...o) {
  return o.reduce(function(e, t) {
    return Math.abs(e * t / ci(e, t));
  });
}
function Di(o, e = 3) {
  return +o.toFixed(e);
}
function Vi(o) {
  if (Number.isSafeInteger(o) || o.toString().split(".")[0].length < 10)
    return 0;
  throw new Error("Periodic value: Not implemented yet");
}
function Zi(o) {
  const e = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
  return o === void 0 ? e : e.slice(0, Math.min(e.length, o));
}
function Fi(o, e) {
  const t = [], i = e === !0 ? +o : o ** 2;
  for (let n = 0; n <= o; n++)
    for (let r = 0; r <= o; r++)
      n ** 2 + r ** 2 === i && t.push([n, r, o]);
  return t;
}
function ji(o, e = 2) {
  return +`${Math.round(+`${o}e${e}`)}e-${e}`;
}
const G = {
  decompose: Ri,
  dividers: yi,
  divideNumbersByGCD: zi,
  gcd: ci,
  lcm: Li,
  numberCorrection: Di,
  periodic: Vi,
  primes: Zi,
  pythagoreanTripletsWithTarget: Fi,
  round: ji
};
var lt, b, w, Re;
const $ = class $ {
  constructor(e, t) {
    p(this, lt, !1);
    p(this, b, 1);
    p(this, w, 1);
    p(this, Re, "frac");
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
    a(this, "isApproximative", () => s(this, lt) || s(this, w).toString().length >= 15 && s(this, b).toString().length >= 15);
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
    a(this, "isReduced", () => Math.abs(G.gcd(s(this, w), s(this, b))) === 1);
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
      const e = G.gcd(s(this, w), s(this, b));
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
      return h(this, w, Math.pow(s(this, w), Math.abs(1 / e))), h(this, b, Math.pow(s(this, b), Math.abs(1 / e))), (i !== s(this, w) || n !== s(this, b)) && (h(this, w, s(this, w) / s(this, b)), h(this, b, 1), h(this, lt, !0)), this.multiply(t), this;
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
    return h(this, Re, "dfrac"), this;
  }
  get display() {
    return this.isExact() ? s(this, b) === 1 ? `${s(this, w)}` : `${s(this, w)}/${s(this, b)}` : this.value.toFixed(3);
  }
  get frac() {
    return h(this, Re, "frac"), this;
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
    return this.isInfinity() ? `${this.sign() === 1 ? "+" : "-"}\\infty` : this.isExact() ? s(this, b) === 1 ? `${s(this, w)}` : s(this, w) < 0 ? `-\\${s(this, Re)}{ ${-s(this, w)} }{ ${s(this, b)} }` : `\\${s(this, Re)}{ ${s(this, w)} }{ ${s(this, b)} }` : this.value.toFixed(3);
  }
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get tfrac() {
    return h(this, Re, "tfrac"), this;
  }
  get value() {
    const e = s(this, w) / s(this, b);
    return e === 0 ? 0 : e;
  }
};
lt = new WeakMap(), b = new WeakMap(), w = new WeakMap(), Re = new WeakMap(), a($, "average", (...e) => {
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
var Z, ee, ie, He;
class wt {
  constructor(...e) {
    p(this, Z);
    p(this, ee);
    p(this, ie);
    p(this, He);
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    a(this, "parse", (e, t, i) => (h(this, ie, i ?? 1), h(this, ee, t ?? 2), h(this, Z, e), s(this, ee) % 2 === 0 && s(this, Z) < 0 && h(this, He, !1), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    a(this, "reduce", () => {
      let e = Math.floor(Math.pow(s(this, Z), 1 / s(this, ee)));
      for (; e > 1; ) {
        if (s(this, Z) % Math.pow(e, s(this, ee)) === 0) {
          h(this, ie, s(this, ie) * e), h(this, Z, s(this, Z) / Math.pow(e, s(this, ee))), e = Math.floor(Math.pow(s(this, Z), 1 / s(this, ee)));
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
    a(this, "hasRadical", () => !(s(this, Z) === 1 || s(this, Z) === 0 || !s(this, He)));
    h(this, Z, 1), h(this, ie, 1), h(this, ee, 2), h(this, He, !0), e.length > 0 && this.parse(e[0], e[1], e[2]);
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
    return s(this, ee);
  }
  set nth(e) {
    Number.isSafeInteger(e) && e >= 2 ? h(this, ee, e) : (console.log("Error setting the nth root"), h(this, ee, 2));
  }
  get coefficient() {
    return s(this, ie);
  }
  set coefficient(e) {
    h(this, ie, e);
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
Z = new WeakMap(), ee = new WeakMap(), ie = new WeakMap(), He = new WeakMap();
var Ui = Object.defineProperty, wi = (o) => {
  throw TypeError(o);
}, Gi = (o, e, t) => e in o ? Ui(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, Jt = (o, e, t) => Gi(o, typeof e != "symbol" ? e + "" : e, t), vi = (o, e, t) => e.has(o) || wi("Cannot " + t), _ = (o, e, t) => (vi(o, e, "read from private field"), t ? t.call(o) : e.get(o)), nt = (o, e, t) => e.has(o) ? wi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), be = (o, e, t, i) => (vi(o, e, "write to private field"), e.set(o, t), t);
const ui = {
  pi: Math.PI,
  e: Math.exp(1)
};
var m = /* @__PURE__ */ ((o) => (o.VARIABLE = "variable", o.COEFFICIENT = "coefficient", o.OPERATION = "operation", o.CONSTANT = "constant", o.FUNCTION = "function", o.FUNCTION_ARGUMENT = "function-argument", o.MONOM = "monom", o.LEFT_PARENTHESIS = "(", o.RIGHT_PARENTHESIS = ")", o))(m || {}), Ze = /* @__PURE__ */ ((o) => (o.EXPRESSION = "expression", o.POLYNOM = "polynom", o.SET = "set", o.NUMERIC = "numeric", o))(Ze || {});
function Wi(o, e) {
  if (o.length <= 1)
    return o;
  const t = Object.keys(e).filter((E) => e[E].type === m.FUNCTION).map((E) => E);
  t.sort((E, V) => V.length - E.length);
  const i = new RegExp(`^(${t.join("|")})\\(`), n = Object.keys(ui);
  n.sort((E, V) => V.length - E.length);
  const r = new RegExp(`^(${n.join("|")})`), l = /^(\d+(\.\d+)?)/;
  let c = "", d, f, g;
  for (; o.length > 0; ) {
    if (d = f, g = void 0, t.length > 0 && i.exec(o)) {
      const E = t.find((V) => o.startsWith(V));
      E && (g = E + "(", o = o.slice(E.length + 1), f = m.FUNCTION);
    } else if (n.length > 0 && r.exec(o)) {
      const E = n.find((V) => o.startsWith(V));
      E && (g = E, o = o.slice(E.length), f = m.CONSTANT);
    } else if (l.exec(o)) {
      const E = l.exec(o);
      E && (g = E[0], o = o.slice(E[0].length), f = m.COEFFICIENT);
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
    c += Hi(d, f), c += g;
  }
  return c;
}
function Hi(o, e) {
  return o === void 0 || o === m.OPERATION || e === m.OPERATION || o === m.LEFT_PARENTHESIS || o === m.FUNCTION || o === m.FUNCTION_ARGUMENT || e === m.RIGHT_PARENTHESIS || e === m.FUNCTION_ARGUMENT ? "" : "*";
}
const Xi = {
  "^": { precedence: 4, associative: "right", type: m.OPERATION },
  "*": { precedence: 3, associative: "left", type: m.OPERATION },
  "/": { precedence: 3, associative: "left", type: m.OPERATION },
  "+": { precedence: 2, associative: "left", type: m.OPERATION },
  "-": { precedence: 2, associative: "left", type: m.OPERATION }
}, Yi = {
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
}, Qi = {
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
}, Ki = {
  "&": { precedence: 3, associative: "left", type: m.OPERATION },
  "|": { precedence: 3, associative: "left", type: m.OPERATION },
  "!": { precedence: 4, associative: "right", type: m.OPERATION },
  "-": { precedence: 2, associative: "left", type: m.OPERATION }
};
var Ge, rt, te, vt, De;
class Yt {
  constructor(e) {
    nt(this, Ge), nt(this, rt, []), nt(this, te, {}), nt(this, vt, []), nt(this, De), be(this, Ge, typeof e > "u" ? Ze.POLYNOM : e), this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return _(this, rt);
  }
  get rpnToken() {
    return _(this, rt).map((e) => e.token);
  }
  tokenConfigInitialization() {
    return _(this, Ge) === Ze.SET ? (be(this, te, Ki), be(this, De, !1)) : _(this, Ge) === Ze.NUMERIC ? (be(this, te, Qi), be(this, De, !0)) : _(this, Ge) === Ze.EXPRESSION ? (be(this, te, Yi), be(this, De, !0)) : (be(this, te, Xi), be(this, De, !0)), be(this, vt, Object.keys(_(this, te)).sort((e, t) => t.length - e.length)), _(this, te);
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
      for (const r of _(this, vt))
        if (e.substring(t, t + r.length) === r) {
          i += r, n = _(this, te)[r].type;
          break;
        }
      for (const r in ui)
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
    (t ?? _(this, De)) && (e = Wi(e, _(this, te)));
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
            let E = n[n.length - 1];
            for (g = +d; E.token in _(this, te) && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (_(this, te)[r].associative === "left" && _(this, te)[r].precedence <= _(this, te)[E.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            _(this, te)[r].associative === "right" && _(this, te)[r].precedence < _(this, te)[E.token].precedence); ) {
              if (g--, g === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (i.push(n.pop() ?? { token: "", tokenType: m.OPERATION }), n.length === 0)
                break;
              E = n[n.length - 1];
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
    return be(this, rt, i.concat(n.reverse())), this;
  }
}
Ge = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap();
class Ji {
  constructor(e, t) {
    Jt(this, "_rpn"), Jt(this, "_expression"), Jt(this, "_isValid"), this._expression = e;
    try {
      this._rpn = new Yt(Ze.NUMERIC).parse(e, t).rpn;
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
        t.push(ui[i.token]);
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
var T, v, Xe, bt, ze, Ot, qt;
const I = class I {
  constructor(e) {
    p(this, Xe);
    p(this, T);
    p(this, v);
    /**
     * Clone the current Monom.
     */
    a(this, "clone", () => {
      const e = new I();
      e.coefficient = s(this, T).clone();
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
        this.isSameAs(i) ? (this.isZero() && O(this, Xe, bt).call(this, i), s(this, T).add(i.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", i.display);
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
        return s(i, v)[e].subtract(1), s(i, T).multiply(new u(t.clone())), i;
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
        s(this, T).divide(i.coefficient);
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
          return s(this, ze).call(this, e.value);
        if (e instanceof wt)
          return new u().invalid();
        if (typeof e == "number")
          return s(this, ze).call(this, e);
        if (typeof e == "object") {
          const n = {};
          for (const r in e)
            n[r] = new u(e[r]).value;
          return s(this, ze).call(this, n);
        }
      }
      const i = this.coefficient.clone();
      if (typeof e == "number" || e instanceof u) {
        const n = {};
        return n[this.variables[0]] = new u(e), this.evaluate(n);
      }
      if (e instanceof wt)
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
      s(this, T).opposite();
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
          if (!this.hasVariable(r) || !e.hasVariable(r) || !s(this, v)[r].isEqual(e.literal[r]))
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
        const i = t instanceof I ? t : new I(t);
        s(this, T).multiply(i.coefficient);
        for (const n in i.literal)
          this.hasVariable(n) ? s(this, v)[n].add(i.literal[n]) : s(this, v)[n] = i.literal[n].clone();
      }
      return this;
    });
    /**
     * Create a one value monom
     */
    a(this, "one", () => (h(this, T, new u().one()), h(this, v, {}), this));
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
        s(this, T).sqrt();
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
        this.isSameAs(i) ? (this.isZero() && O(this, Xe, bt).call(this, i), s(this, T).add(i.clone().coefficient.opposite())) : console.log("Subtract: Is not similar: ", i.display);
      }
      return this;
    });
    /**
     * Create a zero value monom
     */
    a(this, "zero", () => (h(this, T, new u().zero()), h(this, v, {}), this));
    p(this, ze, (e) => {
      let t = this.coefficient.value;
      if (typeof e == "number") {
        const i = {}, n = this.variables[0];
        return i[n] = e, s(this, ze).call(this, i);
      }
      if (e instanceof u) {
        const i = {};
        return i[this.variables[0]] = new u(e).value, s(this, ze).call(this, i);
      }
      if (e instanceof wt)
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
    p(this, Ot, (e) => {
      const i = new Yt().parse(e).rpn, n = [];
      if (i.length === 0)
        return this.zero(), this;
      if (i.length === 1) {
        const r = i[0];
        return this.one(), r.tokenType === m.COEFFICIENT ? this.coefficient = new u(r.token) : r.tokenType === m.VARIABLE && this.setLetter(r.token, 1), this;
      } else
        for (const r of i)
          s(this, qt).call(this, n, r);
      return this.one(), this.multiply(n[0]), this;
    });
    p(this, qt, (e, t) => {
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
    return h(this, T, new u().zero()), h(this, v, {}), e !== void 0 && this.parse(e), this;
  }
  // -----------------------------------------
  /**
   * Parse a string to a monom. The string may include fraction.
   * @param inputStr
   */
  parse(e) {
    return h(this, T, new u()), h(this, v, {}), typeof e == "string" ? s(this, Ot).call(this, e) : typeof e == "number" ? h(this, T, new u(e)) : e instanceof u ? h(this, T, e.clone()) : e instanceof I && (h(this, T, s(e, T).clone()), O(this, Xe, bt).call(this, e)), this;
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
    const t = Object.keys(s(this, v)).sort();
    for (const i of t)
      s(this, v)[i].isNotZero() && (e += i, s(this, v)[i].isNotEqual(1) && (e += `^(${s(this, v)[i].display})`));
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
    return e === "" ? s(this, T).value != 0 ? s(this, T).display : "" : s(this, T).value === 1 ? e : s(this, T).value === -1 ? `-${e}` : s(this, T).value === 0 ? "0" : `${s(this, T).display}*${e}`;
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
T = new WeakMap(), v = new WeakMap(), Xe = new WeakSet(), bt = function(e) {
  for (const t in e.literal)
    s(this, v)[t] = e.literal[t].clone();
}, ze = new WeakMap(), Ot = new WeakMap(), qt = new WeakMap(), a(I, "gcd", (...e) => {
  for (const r of e)
    if (r.containsRationalPower())
      return new I().zero();
  const t = new I(), i = G.gcd(...e.map((r) => r.coefficient.numerator)), n = G.lcm(...e.map((r) => r.coefficient.denominator));
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
let M = I;
var ce, Fe, P, ot, ye, bi, ei, xi, Ei, Ni;
const di = class di {
  constructor(e, t, i = "x") {
    p(this, P);
    p(this, ce);
    p(this, Fe);
    if (h(this, Fe, i), Object.hasOwn(e, "moveLeft")) {
      const n = e;
      h(this, ce, n.left.clone().subtract(n.right));
    } else
      h(this, ce, e.clone().subtract(t ?? 0));
  }
  solve() {
    if (s(this, ce).degree().isOne())
      return O(this, P, xi).call(this);
    if (s(this, ce).degree().value === 2)
      return O(this, P, Ei).call(this);
    const e = O(this, P, bi).call(this);
    if (e.length > 0)
      return e;
    if (s(this, ce).degree().value === 3)
      return O(this, P, ei).call(this);
    throw new Error("The equation degree is too high.");
  }
  solveAsCardan() {
    if (s(this, ce).degree().value !== 3)
      throw new Error("The equation is not cubic.");
    return O(this, P, ei).call(this);
  }
};
ce = new WeakMap(), Fe = new WeakMap(), P = new WeakSet(), ot = function(e, t) {
  return {
    variable: s(this, Fe),
    exact: !1,
    value: +e.toFixed(10),
    tex: (t == null ? void 0 : t.tex) ?? "",
    display: (t == null ? void 0 : t.display) ?? ""
  };
}, ye = function(e) {
  if (e instanceof u && e.isApproximative())
    return O(this, P, ot).call(this, e.value);
  const t = new u(e);
  return {
    variable: s(this, Fe),
    exact: t,
    value: t.value,
    tex: t.tex,
    display: t.display
  };
}, bi = function() {
  let e = s(this, ce).clone(), t = [];
  const i = e.lcmDenominator();
  i !== 1 && e.multiply(i);
  const n = e.monomByDegree().coefficient;
  let r = e.monomByDegree(0).coefficient;
  for (; r.isZero(); )
    t.length === 0 && t.push(O(this, P, ye).call(this, 0)), e = e.divide("x"), r = e.monomByDegree(0).coefficient;
  const l = G.dividers(n.value), c = G.dividers(r.value);
  for (const f of l)
    for (const g of c) {
      const E = new u(g, f);
      e.evaluate(E).isZero() && !t.find((V) => V.value === E.value) && t.push(O(this, P, ye).call(this, E)), E.opposite(), e.evaluate(E).isZero() && !t.find((V) => V.value === E.value) && t.push(O(this, P, ye).call(this, E));
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
  const d = new di(e, e.clone().parse("0"), s(this, Fe));
  return t = t.concat(d.solve()), t.sort((f, g) => f.value - g.value);
}, ei = function() {
  const e = s(this, ce), t = e.monomByDegree(3).coefficient, i = e.monomByDegree(2).coefficient, n = e.monomByDegree(1).coefficient, r = e.monomByDegree(0).coefficient, l = i.clone().divide(t), c = n.clone().divide(t), d = r.clone().divide(t), f = c.clone().subtract(l.clone().pow(2).divide(3)), g = d.clone().subtract(l.clone().multiply(c).divide(3)).add(l.clone().pow(3).multiply(2).divide(27)), E = g.clone().opposite(), V = f.clone().opposite().pow(3).divide(27), de = E.clone().pow(2).subtract(V.clone().multiply(4)).opposite();
  if (de.isNegative()) {
    const he = g.clone().opposite().add(de.clone().opposite().sqrt()).divide(2).root(3), ae = g.clone().opposite().subtract(de.clone().opposite().sqrt()).divide(2).root(3), ge = he.clone().add(ae).subtract(l.clone().divide(3));
    return [O(this, P, ye).call(this, ge)];
  }
  if (de.isZero()) {
    const he = g.clone().opposite().divide(2).root(3), ae = he.clone().opposite().subtract(l.clone().divide(3)), ge = he.clone().multiply(2).subtract(l.clone().divide(3));
    return ae.isEqual(ge) ? [O(this, P, ye).call(this, ae)] : [
      O(this, P, ye).call(this, ge),
      O(this, P, ye).call(this, ae)
    ].sort((pe, le) => pe.value - le.value);
  }
  if (de.isPositive()) {
    const he = [], ae = f.value, ge = g.value, pe = l.value;
    for (let le = 0; le < 3; le++)
      he.push(2 * Math.sqrt(-ae / 3) * Math.cos(Math.acos(3 * ge / (2 * ae) * Math.sqrt(-3 / ae)) / 3 + 2 * Math.PI * le / 3) - pe / 3);
    return he.map((le) => O(this, P, ot).call(this, le)).sort((le, st) => le.value - st.value);
  }
  return [];
}, xi = function() {
  const e = s(this, ce).monomByDegree(0).coefficient.clone().opposite().divide(s(this, ce).monomByDegree(1).coefficient);
  return [
    O(this, P, ye).call(this, e)
  ];
}, Ei = function() {
  const e = s(this, ce), t = e.monomByDegree(2).coefficient, i = e.monomByDegree(1).coefficient, n = e.monomByDegree(0).coefficient, r = i.clone().pow(2).subtract(t.clone().multiply(n).multiply(4));
  if (r.isNegative())
    return [];
  if (r.isSquare()) {
    const l = r.sqrt(), c = i.clone().opposite().add(l).divide(t.clone().multiply(2)), d = i.clone().opposite().subtract(l).divide(t.clone().multiply(2));
    return l.isZero() ? [O(this, P, ye).call(this, c)] : [
      O(this, P, ye).call(this, c),
      O(this, P, ye).call(this, d)
    ].sort((f, g) => f.value - g.value);
  }
  return O(this, P, Ni).call(this, t, i, r);
}, Ni = function(e, t, i) {
  const n = G.dividers(i.value).filter((pe) => Math.sqrt(pe) % 1 === 0).map((pe) => Math.sqrt(pe)).pop() ?? 1, r = G.gcd(2 * e.value, t.value, n) * (e.isNegative() ? -1 : 1), l = t.clone().divide(r).opposite(), c = e.clone().divide(r).multiply(2), d = i.clone().divide(n ** 2), f = Math.abs(n / r), g = n === 1 ? "-" : `-${f} `, E = n === 1 ? "+" : `+${f} `;
  function V(pe, le, st, Qt) {
    return `\\frac{ ${le} ${st}\\sqrt{ ${Qt} } }{ ${pe} }`;
  }
  function de(pe, le, st, Qt) {
    return `(${le}${st}sqrt(${Qt}))/${pe}`;
  }
  const he = i.value ** 0.5, ae = (-t.value - he) / (2 * e.value), ge = (-t.value + he) / (2 * e.value);
  return [
    O(this, P, ot).call(this, ae, {
      tex: V(c.tex, l.tex, g.toString(), d.tex),
      display: de(c.display, l.display, g.toString(), d.display)
    }),
    O(this, P, ot).call(this, ge, {
      tex: V(c.tex, l.tex, E.toString(), d.tex),
      display: de(c.display, l.display, E.toString(), d.display)
    })
  ].sort((pe, le) => pe.value - le.value);
};
let Et = di;
function gi(o, e = !0) {
  return e ? `\\left( ${o} \\right)` : `(${o})`;
}
function Se(o, e, t, i, n) {
  return o.map((r, l) => i !== void 0 && l < i || n !== void 0 && l > n ? r : r === e ? t : r);
}
var je, y, Ye, ct, Qe, ut, kt, Mt, Ct, Ke, $t, ft, It, Pt, Bt, St, Ti, Rt, zt;
const C = class C {
  constructor(e, ...t) {
    p(this, St);
    p(this, je);
    p(this, y);
    p(this, Ye);
    p(this, ct, !1);
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values
     */
    a(this, "parse", (e, ...t) => {
      if (h(this, y, []), h(this, je, []), typeof e == "string")
        return O(this, St, Ti).call(this, e, ...t);
      if ((typeof e == "number" || e instanceof u || e instanceof M) && t.length === 0)
        s(this, y).push(new M(e));
      else if (e instanceof M && t.length > 0)
        s(this, y).push(new M(e)), t.forEach((i) => {
          s(this, y).push(new M(i));
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
        t instanceof C ? h(this, y, s(this, y).concat(t.monoms)) : t instanceof M ? s(this, y).push(t.clone()) : typeof t == "number" && Number.isSafeInteger(t) ? s(this, y).push(new M(t.toString())) : s(this, y).push(new M(t));
      return this.reduce();
    });
    a(this, "commonMonom", () => {
      const e = new M().one(), t = this.gcdNumerator(), i = this.gcdDenominator(), n = this.degree();
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
        return s(this, ut).call(this, e);
      if (typeof e == "number" && Number.isSafeInteger(e))
        return s(this, kt).call(this, e);
      if (e instanceof M)
        return this.divide(new C(e));
      if (e instanceof C) {
        if (e.monoms.length === 1 && e.variables.length === 0)
          return s(this, ut).call(this, e.monoms[0].coefficient);
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
        return s(this, Mt).call(this, e);
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
          let c = s(this, $t).call(this, i, l, e ?? "x");
          for (l = i.degree(e).value; c.length > 0; ) {
            const d = c[0];
            if (!i.isDividableBy(d))
              c.shift();
            else {
              const f = i.euclidean(d);
              t.push(d), i = f.quotient.clone(), c = c.filter((g) => {
                const E = i.monoms[0], V = i.monoms[i.monoms.length - 1], de = g.monoms[0], he = g.monoms[g.monoms.length - 1];
                return V.isDivisible(he) ? E.isDivisible(de) : !1;
              });
            }
          }
        }
      return i.isOne() || t.push(i.clone()), h(this, je, t), s(this, je);
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
    a(this, "getZeroes", () => this.degree().isZero() ? [] : (this.roots = new Et(this.clone()).solve(), this.roots));
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
    a(this, "isEqual", (e) => s(this, Qe).call(this, e, "="));
    a(this, "isOppositeAt", (e) => s(this, Qe).call(this, e.clone().opposite(), "="));
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
    a(this, "isSameAs", (e) => s(this, Qe).call(this, e, "same"));
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
      return new M().zero();
    });
    // Used in LinearSystem.tex
    a(this, "monomByLetter", (e) => {
      const t = this.clone().reduce();
      for (const i of s(t, y))
        if (i.hasVariable(e))
          return i.clone();
      return new M().zero();
    });
    a(this, "monomsByDegree", (e, t) => {
      if (e === void 0)
        return this.monomsByDegree(this.degree(t));
      const i = [], n = this.clone().reduce();
      for (const r of s(n, y))
        r.degree(t).isEqual(e) && i.push(r.clone());
      return i;
    });
    a(this, "multiply", (e) => e instanceof C ? s(this, Bt).call(this, e) : e instanceof u ? s(this, ft).call(this, e) : e instanceof M ? s(this, Pt).call(this, e) : Number.isSafeInteger(e) && typeof e == "number" ? s(this, It).call(this, e) : this);
    a(this, "one", () => (h(this, y, []), s(this, y).push(new M().one()), this));
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
          s(this, y)[e].isSameAs(s(this, y)[t]) && (s(this, y)[e].add(s(this, y)[t]), s(this, y).splice(t, 1), s(this, y)[e].isZero() && (s(this, y)[e] = new M().zero()), t--);
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
        t instanceof C ? this.add(t.clone().opposite()) : t instanceof M ? s(this, y).push(t.clone().opposite()) : s(this, y).push(new M(t).opposite());
      return this.reduce();
    });
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    a(this, "zero", () => (h(this, y, []), s(this, y).push(new M().zero()), this));
    p(this, Qe, (e, t) => {
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
    p(this, ut, (e) => {
      for (const t of s(this, y))
        t.coefficient.divide(e);
      return this;
    });
    p(this, kt, (e) => {
      const t = new u(e);
      for (const i of s(this, y))
        i.coefficient.divide(t);
      return this;
    });
    p(this, Mt, (e) => {
      let t = 0;
      return s(this, y).forEach((i) => {
        t += i.evaluate(e, !0);
      }), t;
    });
    p(this, Ct, (e) => {
      var E;
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
        const V = new C("x", n.coefficient, r.coefficient, l.coefficient), de = s(E = V, Ct).call(E, "x"), he = [];
        let ae;
        if (de.length >= 2) {
          for (const ge of de)
            ge.degree().isZero() ? he.push(ge.clone()) : (ae = ge.clone(), ae.monoms[0].literal = n.literalSqrt, ae.monoms[1].literal = l.literalSqrt, he.push(ae.clone()));
          return he;
        }
      }
      return [this.clone()];
    });
    p(this, Ke, (e, t, i, n) => {
      let r = "";
      for (const l of s(this, y)) {
        if (l.coefficient.value === 0)
          continue;
        let c;
        n ? c = l.plotFunction : c = e === "tex" ? l.tex : l.display, r += `${l.coefficient.sign() === 1 && (r !== "" || t === !0) ? "+" : ""}${c}`;
      }
      return i === !0 && this.length > 1 && (e === "tex" ? r = `\\left( ${r} \\right)` : r = `(${r})`), r === "" && (r = "0"), r;
    });
    p(this, $t, (e, t, i) => {
      const n = e.monoms[0].dividers, r = e.monoms[e.monoms.length - 1].dividers, l = [];
      return n.forEach((c) => {
        c.degree(i).isLeq(t) && r.forEach((d) => {
          c.degree(i).isNotEqual(d.degree(i)) && (l.push(new C(c, d)), l.push(new C(c, d.clone().opposite())));
        });
      }), l;
    });
    p(this, ft, (e) => {
      for (const t of s(this, y))
        t.coefficient.multiply(e);
      return this.reduce();
    });
    p(this, It, (e) => s(this, ft).call(this, new u(e)));
    p(this, Pt, (e) => {
      for (const t of s(this, y))
        t.multiply(e);
      return this.reduce();
    });
    p(this, Bt, (e) => {
      const t = [];
      for (const i of s(this, y))
        for (const n of e.monoms)
          t.push(M.xMultiply(i, n));
      return h(this, y, t), this.reduce();
    });
    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    p(this, Rt, (e) => {
      const i = new Yt().parse(e).rpn;
      this.zero();
      const n = [];
      for (const r of i)
        s(this, zt).call(this, n, r);
      return n.length === 1 && this.add(n[0]), this.reorder();
    });
    p(this, zt, (e, t) => {
      switch (t.tokenType) {
        case m.COEFFICIENT:
          e.push(new C(t.token));
          break;
        case m.VARIABLE:
          e.push(new C().add(new M(t.token)));
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
    return h(this, y, []), h(this, je, []), h(this, Ye, []), e !== void 0 && this.parse(e, ...t), this;
  }
  get display() {
    return s(this, Ke).call(this);
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
    return s(this, Ke).call(this, "tex", !1, !1, !0);
  }
  root() {
    throw new Error("Cannot take the root from a polynom");
  }
  get roots() {
    return s(this, ct) ? s(this, Ye) : this.getZeroes();
  }
  set roots(e) {
    h(this, ct, !0), h(this, Ye, e);
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
      n = Se(n, "", this.monomsByDegree()[0].coefficient.isPositive() ? "+" : "-");
    else if (this.degree().isOne()) {
      const r = this.monomsByDegree(1)[0].coefficient.sign(), l = t.findIndex((c) => c.value === i[0].value) * 2 + 1;
      n[l] = "z", n = Se(n, "", r === 1 ? "-" : "+", 0, l), n = Se(n, "", r === 1 ? "+" : "-", l);
    } else {
      let r = 0, l, c = "+";
      i.forEach((d, f) => {
        const g = t.findIndex((V) => V.value === i[f].value);
        f === 0 && (l = g * 2 + 1, n[l] = "z", n = Se(
          n,
          "",
          this.evaluate(d.value - 1, !0) < 0 ? "-" : "+",
          0,
          l
        )), r = g * 2 + 1, l = f === i.length - 1 ? n.length : t.findIndex((V) => V.value === i[f + 1].value) * 2 + 1;
        const E = f === i.length - 1 ? d.value + 1 : (d.value + i[f + 1].value) / 2;
        c = this.evaluate(E, !0) < 0 ? "-" : "+", n[r] = "z", n = Se(n, "", c, r, l), r = +l, l = n.length;
      });
    }
    return { roots: t, signs: n };
  }
  get tex() {
    return s(this, Ke).call(this, "tex");
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
je = new WeakMap(), y = new WeakMap(), Ye = new WeakMap(), ct = new WeakMap(), Qe = new WeakMap(), ut = new WeakMap(), kt = new WeakMap(), Mt = new WeakMap(), Ct = new WeakMap(), Ke = new WeakMap(), $t = new WeakMap(), ft = new WeakMap(), It = new WeakMap(), Pt = new WeakMap(), Bt = new WeakMap(), St = new WeakSet(), Ti = function(e, ...t) {
  if (t.length === 0) {
    if (e = "" + e, e !== "" && !isNaN(Number(e))) {
      this.empty();
      const i = new M(e);
      return this.add(i), this;
    }
    return s(this, Rt).call(this, e);
  } else if (/^[a-z]+/.test(e)) {
    this.empty();
    const i = t.map((n) => new u(n));
    if (e.length > 1) {
      const n = e.split("");
      let r = 0;
      for (const l of i) {
        const c = new M();
        c.coefficient = l.clone(), c.literalStr = n[r] || "", this.add(c), r++;
      }
    } else {
      let n = i.length - 1;
      for (const r of i) {
        const l = new M();
        l.coefficient = r.clone(), l.literalStr = `${e}^${n}`, this.add(l), n--;
      }
    }
    return this;
  } else
    return this.zero();
}, Rt = new WeakMap(), zt = new WeakMap();
let q = C;
var Ee, Ne, Te, Je;
const we = class we {
  constructor(e, t) {
    p(this, Ee);
    p(this, Ne);
    p(this, Te);
    p(this, Je, !1);
    if (e instanceof we)
      h(this, Ne, e.polynom.clone()), h(this, Te, e.power.clone());
    else if (typeof e == "string" && t === void 0) {
      const [i, n = "1"] = e.split("^");
      h(this, Ne, new q(i)), h(this, Te, new u(n.replace("(", "").replace(")", "")));
    } else
      h(this, Ne, new q(e)), h(this, Te, new u(t ?? 1));
    return h(this, Ee, 1), this;
  }
  parse() {
    throw new Error("Method not implemented.");
  }
  clone() {
    return new we(this);
  }
  get tex() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, n;
    return s(this, Ee) === 0 && t > 1 ? (i = `\\sqrt${t === 2 ? "" : `[ ${t} ]`}{ ${this.polynom.tex} }`, n = e === 1 ? "" : `^{ ${e} }`) : (i = s(this, Je) && this.power.isOne() ? this.polynom.tex : gi(this.polynom.tex), n = t === 1 && e === 1 ? "" : `^{ ${this.power.tex} }`), i = `${i}${n}`, s(this, Ee) === 0 && e < 0 && (i = `\\frac{ 1 }{ ${i} }`), i;
  }
  get display() {
    const e = this.power.numerator, t = this.power.denominator;
    let i, n;
    return s(this, Ee) === 0 && t > 1 ? (i = `${t === 2 ? "sqrt" : `root(${t})`}(${this.polynom.display})`, n = e === 1 ? "" : `^(${e})`) : (i = s(this, Je) && this.power.isOne() ? this.polynom.display : gi(this.polynom.display, !1), n = t === 1 && e === 1 ? "" : `^(${this.power.display})`), i = `${i}${n}`, s(this, Ee) === 0 && e < 0 && (i = `1/(${i})`), i;
  }
  add() {
    throw new Error("Adding two factors is not possible");
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
  divide(e) {
    if (e instanceof we && this.isSameAs(e))
      return this.power.subtract(e.power), this;
    const t = new q(e);
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
    return e instanceof we ? t = e.polynom : e instanceof q ? t = e : t = new q(e), this.polynom.isEqual(t);
  }
  isZero() {
    return this.polynom.isZero();
  }
  multiply(e) {
    if (e instanceof we && this.isSameAs(e))
      return this.power.add(e.power), this;
    const t = new q(e);
    if (this.isSameAs(t))
      return this.power.add(1), this;
    throw new Error("The two factors must be the same");
  }
  one() {
    return s(this, Ne).one(), s(this, Te).one(), this;
  }
  opposite() {
    throw new Error("Method not implemented.");
  }
  get polynom() {
    return s(this, Ne);
  }
  set polynom(e) {
    h(this, Ne, e);
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
    return t.isStrictlyNegative() && (i.signs = Se(i.signs, "z", "d")), t.denominator % 2 === 0 ? i.signs = Se(i.signs, "-", "h") : t.numerator % 2 === 0 && (i.signs = Se(i.signs, "-", "+")), { roots: i.roots, signs: i.signs };
  }
  get variables() {
    return this.polynom.variables;
  }
  get withPower() {
    return h(this, Ee, 1), this;
  }
  get withRoot() {
    return h(this, Ee, 0), this;
  }
  zero() {
    return s(this, Ne).zero(), s(this, Te).one(), this;
  }
};
Ee = new WeakMap(), Ne = new WeakMap(), Te = new WeakMap(), Je = new WeakMap();
let ue = we;
var ht = /* @__PURE__ */ ((o) => (o[o.ROOT = 0] = "ROOT", o[o.POWER = 1] = "POWER", o))(ht || {}), _e, N, dt, ii, pt, si;
const me = class me {
  constructor(...e) {
    p(this, pt);
    p(this, _e, ht.POWER);
    p(this, N, []);
    return this.parse(...e), this;
  }
  parse(...e) {
    return e.length === 0 ? this : (h(this, N, []), e.forEach((t) => {
      if (typeof t == "string") {
        const i = t.split(")(").join(")*(").split("*");
        s(this, N).push(...i.map((n) => new ue(n)));
      } else t instanceof me ? s(this, N).push(...t.factors.map((i) => i.clone())) : s(this, N).push(new ue(t));
    }), this);
  }
  clone() {
    return new me(...s(this, N).map((e) => e.clone()));
  }
  get tex() {
    const { num: e, den: t } = O(this, pt, si).call(this);
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.tex : e.map((r) => r.tex).join("");
    const i = e.length === 1 ? e[0].asSingle.tex : e.map((r) => r.tex).join(""), n = t.length === 1 ? t[0].asSingle.tex : t.map((r) => r.tex).join("");
    return `\\frac{ ${i} }{ ${n} }`;
  }
  get display() {
    const { num: e, den: t } = O(this, pt, si).call(this);
    if (t.length === 0)
      return e.length === 1 ? e[0].asSingle.display : e.map((r) => r.display).join("");
    const i = e.length === 1 ? e[0].asSingle.display : e.map((r) => r.display).join(""), n = t.length === 1 ? t[0].asSingle.display : t.map((r) => r.display).join("");
    return `(${i})/(${n})`;
  }
  static gcd(...e) {
    var i;
    if (e.length === 0)
      return new me().one();
    if (e.length === 1)
      return e[0];
    if (e.length === 2)
      return O(i = me, dt, ii).call(i, e[0], e[1]);
    let t = e[0];
    return e.shift(), e.forEach((n) => {
      var r;
      return t = O(r = me, dt, ii).call(r, t, n);
    }), t;
  }
  add(...e) {
    let t = [this, ...e];
    const i = me.gcd(...t);
    t = t.map((r) => r.divide(i).reduce());
    const n = new q("0");
    return t.forEach((r) => n.add(r.develop())), h(this, N, [
      ...i.factors,
      new ue(n)
    ]), this;
  }
  get asPower() {
    return h(this, _e, ht.POWER), this;
  }
  get asRoot() {
    return h(this, _e, ht.ROOT), this;
  }
  degree(e) {
    return s(this, N).reduce((t, i) => t.add(i.degree(e)), new u("0"));
  }
  get denominator() {
    return s(this, N).filter((e) => e.power.isNegative());
  }
  derivative() {
    const e = [], t = s(this, N).length;
    for (let n = 0; n < t; n++) {
      const r = s(this, N).slice(), l = r.splice(n, 1)[0];
      e.push(new me(...r).multiply(new me(...l.derivative())));
    }
    e.forEach((n) => n.reduce());
    const i = e.shift();
    return i !== void 0 && h(this, N, i.factors), this.add(...e);
  }
  develop() {
    const e = new q("1");
    return s(this, N).forEach((t) => {
      e.multiply(t.develop());
    }), e;
  }
  divide(e) {
    return h(this, N, s(this, N).concat(e.clone().factors.map((t) => t.inverse()))), this;
  }
  evaluate(e, t) {
    return t ? s(this, N).reduce((i, n) => i * n.evaluate(e, t), 1) : s(this, N).reduce((i, n) => i.multiply(n.evaluate(e)), new u("1"));
  }
  get factors() {
    return s(this, N);
  }
  set factors(e) {
    h(this, N, e);
  }
  fromPolynom(e, t) {
    return h(this, N, new q(e).factorize(t).map((i) => new ue(i))), this;
  }
  getFactors() {
    return s(this, N);
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
    const t = me.gcd(this, e), i = this.clone().divide(t).reduce(), n = e.clone().divide(t).reduce();
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
    return s(this, N).filter((e) => e.power.isPositive());
  }
  one() {
    return h(this, N, [new ue("1", "1")]), this;
  }
  opposite() {
    const e = s(this, N).findIndex((t) => t.display === "(-1)");
    return e >= 0 ? s(this, N).splice(e, 1) : s(this, N).push(new ue("-1", "1")), this;
  }
  pow(e) {
    return h(this, N, s(this, N).map((t) => t.pow(e))), this;
  }
  primitive() {
    throw new Error("Method not implemented.");
  }
  reduce() {
    const e = _t(this);
    return h(this, N, Object.values(e).map((t) => {
      const i = t[0].polynom, n = t.reduce((r, l) => r.add(l.power), new u("0"));
      return new ue(i, n.reduce());
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
    const e = this.getZeroes(), t = this.factors.map((n) => ({ factor: new ue(n), ...n.tableOfSigns(e) }));
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
    return h(this, N, [new ue("0", "1")]), this;
  }
};
_e = new WeakMap(), N = new WeakMap(), dt = new WeakSet(), ii = function(e, t) {
  const i = _t(e), n = _t(t), l = Object.keys(i).filter((c) => Object.hasOwn(n, c)).map((c) => {
    const d = i[c].reduce((g, E) => g.add(E.power), new u("0")), f = n[c].reduce((g, E) => g.add(E.power), new u("0"));
    return new ue(c, u.min(d, f));
  });
  return new me(...l);
}, pt = new WeakSet(), si = function() {
  let e, t = [];
  return s(this, _e) === ht.ROOT ? (e = this.numerator, t = this.denominator.map((i) => i.clone().inverse())) : e = s(this, N), e.length === 0 && (e = [new ue("1")]), { num: e, den: t };
}, p(me, dt);
let ti = me;
function _t(o) {
  const e = new u().one(), t = o.factors.reduce((i, n) => {
    if (n.polynom.degree().isZero())
      return n.polynom.monoms.length > 0 && e.multiply(n.polynom.monoms[0].coefficient), i;
    const r = n.polynom.display;
    return Object.hasOwn(i, r) ? i[r].push(n) : i[r] = [n], i;
  }, {});
  return e.isOne() || (t[e.display] = [new ue(e.display, 1)]), t;
}
var A, k, se, Lt, et, Dt;
const xe = class xe {
  constructor(e, t, i) {
    // Left part of the equation
    p(this, A);
    // Right part of the equation
    p(this, k);
    // Signe of the equation
    p(this, se);
    // ------------------------------------------
    a(this, "parse", (e) => {
      const t = s(this, Lt).call(this, e);
      if (t === !1)
        throw new Error("The equation is not valid (no sign found)");
      const i = e.split(t);
      return this.create(new q(i[0]), new q(i[1]), s(this, et).call(this, t));
    });
    a(this, "create", (e, t, i) => (h(this, A, e), h(this, k, t), h(this, se, s(this, et).call(this, i ?? "=")), this));
    a(this, "clone", () => new xe(s(this, A).clone(), s(this, k).clone(), s(this, se)));
    /**
     * Get the degree of the equation
     * @param letter
     */
    a(this, "degree", (e) => u.max(s(this, A).degree(e), s(this, k).degree(e)));
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
    a(this, "isMultiVariable", () => s(this, A).isMultiVariable || s(this, k).isMultiVariable);
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
      s(this, A).subtract(s(this, k)), s(this, k).zero();
      const i = [...s(this, A).monoms];
      for (const r of i)
        r.hasVariable(e) || (t = r.clone(), s(this, A).subtract(t), s(this, k).subtract(t));
      if (s(this, A).length !== 1)
        return !1;
      const n = s(this, A).monoms[0].coefficient.clone();
      return s(this, A).divide(n), s(this, k).divide(n), this;
    });
    // -----------------------------------------------
    // Equations operations
    // -----------------------------------------------
    a(this, "letters", () => [.../* @__PURE__ */ new Set([...s(this, A).letters(), ...s(this, k).letters()])]);
    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    a(this, "moveLeft", () => (s(this, A).subtract(s(this, k)), s(this, k).zero(), this));
    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    a(this, "multiply", (e) => {
      const t = new u(e);
      return s(this, A).multiply(t), s(this, k).multiply(t), s(this, se) !== "=" && t.sign() === -1 && s(this, Dt).call(this), this;
    });
    a(this, "opposite", () => (h(this, A, s(this, A).opposite()), h(this, k, s(this, k).opposite()), this));
    a(this, "reorder", (e) => (s(this, A).subtract(s(this, k)), s(this, k).zero(), s(this, A).reorder(), e ? this : (s(this, A).monoms.filter((t) => t.degree().isZero()).forEach((t) => {
      const i = t.clone();
      s(this, A).subtract(i), s(this, k).subtract(i);
    }), s(this, A).reorder(), s(this, k).reorder(), this)));
    // ------------------------------------------
    a(this, "replaceBy", (e, t) => (s(this, A).replaceBy(e, t), s(this, k).replaceBy(e, t), this));
    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    a(this, "simplify", () => (this.multiply(G.lcm(...s(this, A).getDenominators(), ...s(this, k).getDenominators())), this.divide(G.gcd(...s(this, A).getNumerators(), ...s(this, k).getNumerators())), this));
    // -----------------------------------------------
    a(this, "solve", () => new Et(this.clone()).solve());
    a(this, "test", (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e)));
    p(this, Lt, (e) => {
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
    p(this, Dt, () => s(this, se) === "=" ? this : s(this, se).includes("<") ? (s(this, se).replace("<", ">"), this) : s(this, se).includes(">") ? (s(this, se).replace(">", "<"), this) : this);
    if (h(this, A, new q().zero()), h(this, k, new q().zero()), h(this, se, "="), e !== void 0 && t === void 0) {
      if (e instanceof xe)
        return e.clone();
      typeof e == "string" && this.parse(e);
    } else e !== void 0 && t !== void 0 && (this.left = new q(e), this.right = new q(t));
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
    if (e instanceof xe)
      return s(this, A).add(e.left), s(this, k).add(e.right), this;
    if (typeof e == "string" && !xe.isEquationString(e))
      return this.add(new xe(e));
    const t = new q(e);
    return s(this, A).add(t), s(this, k).add(t), this;
  }
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param values
   * @param asNumeric
   */
  evaluate(e, t) {
    const i = s(this, A).evaluate(e, t), n = s(this, k).evaluate(e, t);
    return t ? i === n : i.isEqual(n);
  }
  isEqual(e) {
    const t = new xe(e);
    return t.left.isEqual(s(this, A)) && t.right.isEqual(s(this, k));
  }
  pow(e) {
    return s(this, A).pow(e), s(this, k).pow(e), this;
  }
  reduce() {
    return this.moveLeft(), s(this, A).reduce(), this.simplify(), s(this, A).monoms[0].coefficient.isNegative() && this.multiply(-1), this;
  }
  split() {
    return [s(this, A).clone(), s(this, k).clone()];
  }
  subtract(e) {
    if (e instanceof xe)
      return s(this, A).subtract(e.left), s(this, k).subtract(e.right), this;
    if (typeof e == "string" && !xe.isEquationString(e))
      return this.subtract(new xe(e));
    const t = new q(e);
    return s(this, A).subtract(t), s(this, k).subtract(t), this;
  }
  static isEquationString(e) {
    return e.includes("=") || e.includes("<") || e.includes(">") || e.includes("<=") || e.includes(">=");
  }
  static makeSolutionsUnique(e, t) {
    const i = [], n = e.filter((r) => i.includes(r.tex) ? !1 : (i.push(r.tex), !0));
    return t === !0 && n.sort((r, l) => r.value - l.value), n;
  }
  get display() {
    return `${s(this, A).display}${this.signAsTex}${s(this, k).display}`;
  }
  // Getter and setter
  get left() {
    return s(this, A);
  }
  set left(e) {
    h(this, A, e);
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get right() {
    return s(this, k);
  }
  set right(e) {
    h(this, k, e);
  }
  // ------------------------------------------
  get sign() {
    return s(this, se);
  }
  set sign(e) {
    h(this, se, s(this, et).call(this, e));
  }
  get signAsTex() {
    return s(this, se) === ">=" ? "\\geq" : s(this, se) === "<=" ? "\\leq" : s(this, se);
  }
  get tex() {
    return `${s(this, A).tex}${this.signAsTex}${s(this, k).tex}`;
  }
  get variables() {
    return [...new Set(s(this, k).variables.concat(s(this, A).variables))];
  }
};
A = new WeakMap(), k = new WeakMap(), se = new WeakMap(), Lt = new WeakMap(), et = new WeakMap(), Dt = new WeakMap();
let H = xe;
var D, Ce, Vt, Zt;
const We = class We {
  constructor(...e) {
    p(this, D);
    // Determine the letters in the linear system, usually ['x', 'y']
    p(this, Ce);
    a(this, "parse", (...e) => (h(this, D, e.map((t) => new H(t))), s(this, Vt).call(this), this));
    a(this, "clone", () => new We().parse(...s(this, D).map((e) => e.clone())));
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
    p(this, Vt, () => (h(this, Ce, s(this, D).reduce((e, t) => [.../* @__PURE__ */ new Set([...e, ...t.variables])], [])), s(this, Ce).sort(), this));
    p(this, Zt, () => {
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
    return h(this, D, []), h(this, Ce, []), e.length > 0 && this.parse(...e), this;
  }
  static fromMatrix(e, t = "xyz") {
    const i = e[0].length;
    if (e.some((r) => r.length !== i))
      throw new Error("All rows must have the same number of columns");
    const n = t.split("").splice(0, i - 1);
    return new We(
      ...e.map((r) => {
        const l = new q(n.join(""), ...r);
        return new H(l, 0);
      })
    );
  }
  add(e, t) {
    if (e instanceof We) {
      const i = e.equations.length;
      if (i !== s(this, D).length)
        throw new Error("The number of equations must be the same");
      for (let n = 0; n < i; n++)
        s(this, D)[n].add(e.equations[n]);
    } else {
      if (t === void 0 || t < 0 || t >= s(this, D).length)
        throw new Error("Index out of range");
      const i = new H(e);
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
    return s(this, Ce).includes(e);
  }
  isEqual(e) {
    return this.equations.every((t, i) => t.isEqual(e.equations[i]));
  }
  get isSolvable() {
    return this.variables.length === s(this, D).length;
  }
  get matrix() {
    return s(this, Zt).call(this);
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
    if (e instanceof We) {
      const i = e.equations.length;
      if (i !== s(this, D).length)
        throw new Error("The number of equations must be the same");
      for (let n = 0; n < i; n++)
        s(this, D)[n].subtract(e.equations[n]);
    } else {
      if (t === void 0 || t < 0 || t >= s(this, D).length)
        throw new Error("Index out of range");
      const i = new H(e);
      s(this, D)[t].subtract(i);
    }
    return this;
  }
  get tex() {
    const e = this.clone().reorder();
    return this.buildTex(e.equations);
  }
  get variables() {
    return s(this, Ce);
  }
  set variables(e) {
    const t = typeof e == "string" ? e.split("") : [...e];
    t.sort(), h(this, Ce, t);
  }
};
D = new WeakMap(), Ce = new WeakMap(), Vt = new WeakMap(), Zt = new WeakMap();
let ni = We;
function _i(o, e) {
  return o.dimension === e.dimension && o.array.every(
    (t, i) => e.array[i].isEqual(t)
  );
}
function es(o, e) {
  if (o.dimension !== e.dimension)
    return !1;
  const t = e.array[0].value / o.array[0].value;
  return o.array.every(
    (i, n) => e.array[n].value === i.value * t
  );
}
function ts(o, e) {
  return o.dimension !== e.dimension ? new u().invalid() : o.array.reduce(
    (t, i, n) => t.add(i.clone().multiply(e.array[n])),
    new u(0)
  );
}
function is(...o) {
  return o.some((e) => e.dimension !== o[0].dimension) ? new u().invalid() : o[0].dimension === 2 && o.length !== 2 ? new u().invalid() : o[0].dimension === 3 && o.length !== 3 ? new u().invalid() : o[0].dimension === 2 ? o[0].array[0].clone().multiply(o[1].array[1]).subtract(o[0].array[1].clone().multiply(o[1].array[0])) : o[0].array[0].clone().multiply(
    o[1].array[1].clone().multiply(o[2].array[2]).subtract(o[1].array[2].clone().multiply(o[2].array[1]))
  ).subtract(
    o[0].array[1].clone().multiply(
      o[1].array[0].clone().multiply(o[2].array[2]).subtract(o[1].array[2].clone().multiply(o[2].array[0]))
    )
  ).add(o[0].array[2].clone().multiply(o[1].array[0].clone().multiply(o[2].array[1]).subtract(o[1].array[1].clone().multiply(o[2].array[0]))));
}
var F, Le;
const Be = class Be {
  constructor(...e) {
    p(this, F, []);
    p(this, Le, !1);
    a(this, "zero", () => (s(this, F).forEach((e) => e.zero()), this));
    a(this, "one", () => (this.zero(), this.x.one(), this));
    a(this, "opposite", () => (s(this, F).forEach((e) => e.opposite()), this));
    a(this, "add", (e) => (s(this, F).forEach((t, i) => t.add(e.array[i])), this));
    a(this, "subtract", (e) => this.add(e.clone().opposite()));
    a(this, "unit", () => {
      const e = this.norm;
      return e === 0 ? this : this.divideByScalar(e);
    });
    a(this, "dot", (e) => ts(this, e));
    a(this, "normal", () => {
      if (this.dimension >= 3)
        throw new Error("Normal vector can only be determined in 2D");
      const e = this.x.clone().opposite(), t = this.y.clone();
      return s(this, F)[0] = t, s(this, F)[1] = e, this;
    });
    a(this, "isEqual", (e) => _i(this, e));
    a(this, "isColinearTo", (e) => es(this, e));
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
    return s(this, Le);
  }
  set asPoint(e) {
    h(this, Le, e);
  }
  get normSquare() {
    return this.array.reduce((e, t) => e.add(t.clone().pow(2)), new u(0));
  }
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get tex() {
    return s(this, Le) ? `\\left(${this.array.map((e) => e.tex).join(";")}\\right)` : `\\begin{pmatrix} ${this.array.map((e) => e.tex).join(" \\\\ ")} \\end{pmatrix}`;
  }
  get display() {
    return s(this, Le) ? `(${this.array.map((e) => e.display).join(";")})` : `((${this.array.map((e) => e.display).join(",")}))`;
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
    return h(this, Le, e !== !1), this;
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
      const [t, i] = e;
      if (t instanceof Be && i instanceof Be) {
        if (t.dimension !== i.dimension)
          throw new Error("Vectors must have the same dimension");
        return h(this, F, i.array.map((n, r) => n.clone().subtract(t.array[r]))), this;
      }
    }
    return h(this, F, e.map((t) => new u(t))), this;
  }
  clone() {
    const e = new Be();
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
F = new WeakMap(), Le = new WeakMap();
let x = Be;
function Ai(o = 0.5) {
  return Math.random() < o;
}
function fe(o, e, t) {
  if (e === void 0)
    return o >= 0 ? fe(0, o) : fe(o, 0);
  if (o === e)
    return o;
  if (t === void 0)
    return Math.floor(Math.random() * (e - o + 1) + o);
  if (Math.abs(e - o) <= t.length)
    throw new Error("The number of excluded values is too high.");
  let i = fe(o, e);
  for (; t.includes(i); )
    i = fe(o, e);
  return i;
}
function Y(o, e) {
  return e === !1 ? Ai() ? fe(1, o) : -fe(1, o) : fe(-o, o);
}
function ss(o) {
  let e = G.primes();
  return o !== void 0 && (e = e.filter((t) => t < o)), fi(e);
}
function ns(o, e) {
  return e === void 0 && (e = 1), o.length <= 0 ? Object.values(o) : Oi(o).slice(0, e);
}
function fi(o) {
  return o.length === 0 ? null : o[fe(0, o.length - 1)];
}
function Oi(o) {
  const e = Object.values(o);
  for (let t = e.length - 1; t > 0; t--) {
    const i = Math.floor(Math.random() * (t + 1)), n = e[t];
    e[t] = e[i], e[i] = n;
  }
  return e;
}
class B extends x {
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
    const e = new B();
    return e.array = this.copy(), e.asPoint = !0, e;
  }
}
var qi = /* @__PURE__ */ ((o) => (o.None = "none", o.Parallel = "parallel", o.Perpendicular = "perpendicular", o.Tangent = "tangent", o))(qi || {}), $e, S, z, U, ne, Q, Ie, ve;
const Ve = class Ve {
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...e) {
    p(this, $e);
    // ax + by + c = 0
    p(this, S);
    p(this, z);
    p(this, U);
    p(this, ne);
    p(this, Q);
    p(this, Ie);
    p(this, ve, "canonical");
    a(this, "randomPoint", (e) => {
      const t = s(this, Q).clone().multiplyByScalar(Y(e === void 0 || e <= 1 ? 3 : e, !1)).add(s(this, ne));
      return t.asPoint = !0, t;
    });
    a(this, "randomNearPoint", (e) => {
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
    a(this, "parse", (...e) => {
      if (e.length === 0)
        return this;
      if (e.length === 1) {
        if (e[0] instanceof Ve)
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
        return e[0] instanceof x && e[1] instanceof Ve ? e[2] === "parallel" || e[2] === null ? this.fromPointAndLine(
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
      for (const i of ["x", "y"])
        t.has(i) && t.delete(i);
      return t.size > 0 ? this : this.fromCoefficient(
        e.left.monomByLetter("x").coefficient,
        e.left.monomByLetter("y").coefficient,
        e.left.monomByDegree(0).coefficient
      );
    });
    a(this, "fromCoefficient", (e, t, i) => (h(this, S, new u(e)), h(this, z, new u(t)), h(this, U, new u(i)), h(this, Q, new x(s(this, z).clone(), s(this, S).clone().opposite())), h(this, ne, new x(new u().zero(), s(this, U).clone())), h(this, Ie, s(this, Q).clone().normal()), this));
    a(this, "fromPointAndDirection", (e, t) => (this.fromCoefficient(
      t.y,
      t.x.clone().opposite(),
      e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)).opposite()
    ), h(this, ne, e.clone()), h(this, Q, t.clone()), h(this, Ie, s(this, Q).clone().normal()), this));
    a(this, "fromPointAndNormal", (e, t) => this.fromCoefficient(
      t.x,
      t.y,
      e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposite()
    ));
    a(this, "fromPointAndLine", (e, t, i) => (i === void 0 && (i = "parallel"), i === "parallel" ? this.fromPointAndNormal(e, t.normal) : i === "perpendicular" ? this.fromPointAndNormal(e, t.director) : this));
    a(this, "clone", () => (h(this, S, s(this, S).clone()), h(this, z, s(this, z).clone()), h(this, U, s(this, U).clone()), h(this, Q, s(this, Q).clone()), h(this, ne, s(this, ne).clone()), h(this, Ie, s(this, Ie).clone()), this));
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
      const e = G.lcm(s(this, S).denominator, s(this, z).denominator, s(this, U).denominator), t = G.gcd(s(this, S).numerator, s(this, z).numerator, s(this, U).numerator);
      return this.fromCoefficient(
        s(this, S).clone().multiply(e).divide(t),
        s(this, z).clone().multiply(e).divide(t),
        s(this, U).clone().multiply(e).divide(t)
      ), this;
    });
    a(this, "simplifyDirection", () => (s(this, Q).simplify(), this));
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
      return t instanceof H ? t.right.evaluate({ x: i }) : new u().invalid();
    });
    a(this, "getValueAtY", (e) => {
      const t = this.getEquation().isolate("x"), i = new u(e);
      return t instanceof H ? t.right.evaluate({ y: i }) : new u().invalid();
    });
    return h(this, S, new u().zero()), h(this, z, new u().zero()), h(this, U, new u().zero()), h(this, ne, new x()), h(this, Q, new x()), h(this, Ie, new x()), h(this, $e, !0), e.length > 0 && this.parse(...e), this;
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
    return s(this, ne);
  }
  set OA(e) {
    h(this, ne, e);
  }
  get d() {
    return s(this, Q);
  }
  set d(e) {
    h(this, Q, e);
  }
  get n() {
    return s(this, Ie);
  }
  // ------------------------------------------
  getEquation() {
    const e = new H(new q().parse("xy", s(this, S), s(this, z), s(this, U)), new q("0"));
    return s(this, $e) ? e.simplify() : e;
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
    const e = s(this, ve);
    switch (h(this, ve, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().tex;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new q().parse("x", this.slope, this.height).tex;
      case "parametric":
      case "system": {
        const t = s(this, Q).clone();
        return s(this, $e) && t.simplify(), e === "parametric" ? `${x.asTex("x", "y")} = ${x.asTex(s(this, ne).x.tex, s(this, ne).y.tex)} + k\\cdot ${x.asTex(t.x.tex, t.y.tex)}` : `\\left\\{\\begin{aligned}
            x &= ${new q(s(this, ne).x).add(new M(s(this, Q).x).multiply(new M("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new q(s(this, ne).y).add(new M(s(this, Q).y).multiply(new M("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`;
      }
      default: {
        const t = this.getEquation();
        return s(this, S).isNegative() && t.multiply(-1), t.tex;
      }
    }
  }
  get reduceBeforeDisplay() {
    return s(this, $e);
  }
  set reduceBeforeDisplay(e) {
    h(this, $e, e);
  }
  get display() {
    const e = s(this, ve);
    switch (h(this, ve, "canonical"), e) {
      case "equation":
        return this.getEquation().reorder().display;
      case "mxh":
        return this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new q().parse("x", this.slope, this.height).display;
      case "parametric": {
        const t = s(this, Q).clone();
        return s(this, $e) && t.simplify(), `((x,y))=((${s(this, ne).x.display},${s(this, ne).y.display}))+k((${t.x.display},${t.y.display}))`;
      }
      default: {
        const t = this.getEquation();
        return s(this, S).isNegative() && t.multiply(-1), t.display;
      }
    }
  }
  get normal() {
    return new x(s(this, S), s(this, z));
  }
  get director() {
    return s(this, Q).clone();
  }
  get slope() {
    return s(this, S).clone().opposite().divide(s(this, z));
  }
  get height() {
    return s(this, U).clone().opposite().divide(s(this, z));
  }
  fromPoints(e, t) {
    return this.fromPointAndDirection(e, new x(e, t));
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
      new Ve().fromPoints(e, t)
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
$e = new WeakMap(), S = new WeakMap(), z = new WeakMap(), U = new WeakMap(), ne = new WeakMap(), Q = new WeakMap(), Ie = new WeakMap(), ve = new WeakMap(), // A line is defined as the canonical form
a(Ve, "PERPENDICULAR", "perpendicular"), a(Ve, "PARALLEL", "parallel");
let R = Ve;
var re, j, Ae, Ft, jt, Ut, oe, ki, xt, Mi, Ci, $i, ri;
const Gt = class Gt {
  constructor(...e) {
    p(this, oe);
    p(this, re);
    p(this, j);
    p(this, Ae);
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    a(this, "relativePosition", (e) => {
      if (s(this, re) === void 0 || s(this, j) === void 0)
        throw new Error("Circle not defined");
      const t = e.distanceTo(s(this, re)), i = Math.sqrt(s(this, j).value);
      return t.value - i > 1e-10 ? 0 : Math.abs(t.value - i) < 1e-10 ? 1 : 2;
    });
    a(this, "lineIntersection", (e) => {
      const t = [];
      if (s(this, Ae) === void 0)
        return [];
      const i = s(this, Ae).clone(), n = e.getEquation().clone().isolate("x"), r = e.getEquation().clone().isolate("y");
      return n instanceof H && r instanceof H && (i.replaceBy("y", r.right).simplify(), i.solve()), t;
    });
    a(this, "tangents", (e) => e instanceof u ? s(this, Ut).call(this, e) : this.isPointOnCircle(e) ? s(this, Ft).call(this, e) : s(this, re) !== void 0 && s(this, re).distanceTo(e).value > this.radius.value ? s(this, jt).call(this, e) : (console.log("No tangents as the point is inside !"), []));
    a(this, "isPointOnCircle", (e) => {
      var t;
      return ((t = s(this, Ae)) == null ? void 0 : t.test({ x: e.x, y: e.y })) ?? !1;
    });
    a(this, "getPointsOnCircle", (e) => {
      const t = G.pythagoreanTripletsWithTarget(this.squareRadius.value, !0), i = [];
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
    p(this, Ft, (e) => {
      const t = new x(this.center, e);
      return [new R(e, t, qi.Perpendicular)];
    });
    p(this, jt, (e) => {
      const t = this.center.x.clone().subtract(e.x), i = this.center.y.clone().subtract(e.y), n = new q("x"), r = new q("x^2+1");
      return n.multiply(t).subtract(i).pow(2), r.multiply(this.squareRadius), new H(n, r).solve().map((d) => {
        let f;
        const g = new H("y", "x");
        return d.exact instanceof u ? (f = e.x.clone().opposite().multiply(d.exact).add(e.y), g.right.multiply(d.exact).add(f)) : (f = e.x.clone().opposite().multiply(d.value).add(e.y), g.right.multiply(d.value).add(f)), new R(g);
      });
    });
    p(this, Ut, (e) => {
      const t = e.numerator, i = -e.denominator, n = this.center.x.clone(), r = this.center.y.clone(), l = this.squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), c = n.clone().multiply(t).opposite().subtract(r.clone().multiply(i)).add(l.clone().sqrt()), d = n.clone().multiply(t).opposite().subtract(r.clone().multiply(i)).subtract(l.clone().sqrt());
      return [new R(t, i, c), new R(t, i, d)];
    });
    e.length > 0 && this.parse(...e);
  }
  get center() {
    return s(this, re) ?? new B();
  }
  get squareRadius() {
    return s(this, j) ?? new u(0);
  }
  get cartesian() {
    if (s(this, Ae) === void 0)
      throw new Error("Cartesian equation not defined");
    return s(this, Ae);
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
    return new Gt(
      this.center.clone(),
      this.squareRadius.clone(),
      !0
    );
  }
  setRadius(e, t) {
    return t ? h(this, j, new u(e)) : h(this, j, new u(e).pow(2)), O(this, oe, xt).call(this), this;
  }
  parse(...e) {
    return O(this, oe, ki).call(this), typeof e[0] == "string" ? O(this, oe, ri).call(this, new H(e[0])) : e[0] instanceof H ? O(this, oe, ri).call(this, e[0]) : e[0] instanceof Gt ? O(this, oe, Mi).call(this, e[0]) : e[0] instanceof B && e.length > 1 && (e[1] instanceof B ? e[2] instanceof B || O(this, oe, $i).call(this, e[0], e[1]) : (e[1] instanceof u || typeof e[1] == "number") && O(this, oe, Ci).call(this, e[0], e[1], typeof e[2] == "boolean" ? e[2] : !1)), O(this, oe, xt).call(this), this;
  }
  // private _parseThroughtThreePoints(A: Point, B: Point, C: Point): this {
  //     const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(),
  //         mAC = T.remarquables.mediators.AC.clone()
  //     this.parse(mAB.intersection(mAC).point, A)
  //     return this
  // }
};
re = new WeakMap(), j = new WeakMap(), Ae = new WeakMap(), Ft = new WeakMap(), jt = new WeakMap(), Ut = new WeakMap(), oe = new WeakSet(), ki = function() {
  return h(this, re, void 0), h(this, j, void 0), h(this, Ae, void 0), this;
}, xt = function() {
  h(this, Ae, new H(
    new q(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
    new q(this.squareRadius.display)
  ).moveLeft());
}, Mi = function(e) {
  return h(this, re, e.center.clone()), h(this, j, e.squareRadius.clone()), O(this, oe, xt).call(this), this;
}, Ci = function(e, t, i) {
  return h(this, re, e.clone()), i ? h(this, j, new u(t)) : h(this, j, new u(t).pow(2)), this;
}, $i = function(e, t) {
  return h(this, re, e.clone()), h(this, j, new x(s(this, re), t).normSquare), this;
}, ri = function(e) {
  if (e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
    const t = e.left.monomByDegree(2, "x"), i = e.left.monomByDegree(2, "y");
    let n, r, l;
    t.coefficient.isEqual(i.coefficient) ? (e.divide(t.coefficient), n = e.left.monomByDegree(1, "x"), r = e.left.monomByDegree(1, "y"), l = e.left.monomByDegree(0), h(this, re, new B(n.coefficient.clone().divide(2).opposite(), r.coefficient.clone().divide(2).opposite())), h(this, j, l.coefficient.clone().opposite().add(s(this, re).x.clone().pow(2)).add(s(this, re).y.clone().pow(2)))) : (h(this, re, void 0), h(this, j, void 0));
  }
  return this;
};
let Nt = Gt;
var X, K, J, tt, Oe, mt, Wt, gt, Pe, Ht, it;
const Xt = class Xt {
  constructor(...e) {
    p(this, X, new B());
    p(this, K, new B());
    p(this, J, new B());
    p(this, tt, {
      AB: new R(),
      AC: new R(),
      BC: new R()
    });
    p(this, Oe, {
      AB: new B(),
      AC: new B(),
      BC: new B()
    });
    p(this, mt, null);
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
          new x(t[0], t[1]),
          new x(t[2], t[3]),
          new x(t[4], t[5])
        );
      } else if (e.length === 3) {
        if (e.every((t) => typeof t == "string"))
          return this.parse(
            ...e.map((t) => new R(t))
          );
        if (e.every((t) => t instanceof R)) {
          const t = e[0].clone(), i = e[1].clone(), n = e[2].clone();
          h(this, tt, { AB: t, BC: i, AC: n });
          let r = t.intersection(i);
          if (r.hasIntersection)
            h(this, K, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (r = i.intersection(n), r.hasIntersection)
            h(this, J, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
          if (r = n.intersection(t), r.hasIntersection)
            h(this, X, r.point.clone());
          else
            throw new Error("Lines do not intersect !");
        } else e.every((t) => t instanceof B) && (h(this, X, e[0].clone()), h(this, K, e[1].clone()), h(this, J, e[2].clone()), h(this, tt, {
          AB: new R(s(this, X), s(this, K)),
          BC: new R(s(this, K), s(this, J)),
          AC: new R(s(this, X), s(this, J))
        }));
      } else if (e.length === 1 && e[0] instanceof Xt)
        return e[0].clone();
      return s(this, Wt).call(this), this;
    });
    /**
     * Clone the Triangle class
     */
    a(this, "clone", () => new Xt(
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
    p(this, Wt, () => {
      s(this, X).asPoint = !0, s(this, K).asPoint = !0, s(this, J).asPoint = !0, h(this, Oe, {
        AB: new B().middleOf(s(this, X), s(this, K)),
        AC: new B().middleOf(s(this, X), s(this, J)),
        BC: new B().middleOf(s(this, K), s(this, J))
      }), h(this, mt, s(this, Ht).call(this));
    });
    /**
     * Get the Vector2D class for the given name
     * @param ptName
     */
    p(this, gt, (e) => {
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
    p(this, Pe, (e, t) => new x(
      s(this, gt).call(this, e),
      s(this, gt).call(this, t)
    ));
    p(this, Ht, () => {
      const e = {
        A: new R().fromPoints(s(this, X), s(this, Oe).BC),
        B: new R().fromPoints(s(this, K), s(this, Oe).AC),
        C: new R().fromPoints(s(this, J), s(this, Oe).AB),
        intersection: null
      }, t = {
        AB: new R().fromPointAndNormal(s(this, Oe).AB, new x(s(this, X), s(this, K)).normal()),
        AC: new R().fromPointAndNormal(s(this, Oe).AC, new x(s(this, X), s(this, J)).normal()),
        BC: new R().fromPointAndNormal(s(this, Oe).BC, new x(s(this, K), s(this, J)).normal()),
        intersection: null
      }, i = {
        A: new R().fromPointAndNormal(s(this, X), new x(s(this, K), s(this, J)).normal()),
        B: new R().fromPointAndNormal(s(this, K), new x(s(this, X), s(this, J)).normal()),
        C: new R().fromPointAndNormal(s(this, J), new x(s(this, X), s(this, K)).normal()),
        intersection: null
      }, n = s(this, it).call(this, "A"), r = s(this, it).call(this, "B"), l = s(this, it).call(this, "C"), c = {
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
    p(this, it, (e) => {
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
    return s(this, X);
  }
  get B() {
    return s(this, K);
  }
  get C() {
    return s(this, J);
  }
  get AB() {
    return s(this, Pe).call(this, "A", "B");
  }
  get BA() {
    return s(this, Pe).call(this, "B", "A");
  }
  get BC() {
    return s(this, Pe).call(this, "B", "C");
  }
  get CB() {
    return s(this, Pe).call(this, "C", "B");
  }
  get AC() {
    return s(this, Pe).call(this, "A", "C");
  }
  get CA() {
    return s(this, Pe).call(this, "C", "A");
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
    return s(this, tt);
  }
  get remarquables() {
    return s(this, mt);
  }
};
X = new WeakMap(), K = new WeakMap(), J = new WeakMap(), tt = new WeakMap(), Oe = new WeakMap(), mt = new WeakMap(), Wt = new WeakMap(), gt = new WeakMap(), Pe = new WeakMap(), Ht = new WeakMap(), it = new WeakMap();
let oi = Xt;
var L, W;
const at = class at {
  constructor(e, t) {
    // ax + by + c = 0
    p(this, L, new B());
    p(this, W, new x());
    a(this, "clone", () => (h(this, W, s(this, W).clone()), h(this, L, s(this, L).clone()), this));
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
      const t = s(this, L).clone(), i = new u(Y(e, !1));
      return new B(
        t.x.clone().add(s(this, W).x.clone().multiply(i)),
        t.y.clone().add(s(this, W).y.clone().multiply(i)),
        t.z.clone().add(s(this, W).z.clone().multiply(i))
      );
    });
    return h(this, L, e.clone()), h(this, W, t.asPoint ? new x(e, t) : t.clone()), this;
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
    return s(this, W);
  }
  set d(e) {
    h(this, W, e);
  }
  get tex() {
    return {
      parametric: `${x.asTex("x", "y", "z")} = ${x.asTex(s(this, L).x.tex, s(this, L).y.tex, s(this, L).z.tex)} + k\\cdot ${x.asTex(s(this, W).x.tex, s(this, W).y.tex, s(this, W).z.tex)}`,
      system: `\\left\\{\\begin{aligned}
    x &= ${new q(s(this, L).x).add(new M(s(this, W).x).multiply(new M("k"))).reorder("k", !0).tex}\\\\ 
    y &= ${new q(s(this, L).y).add(new M(s(this, W).y).multiply(new M("k"))).reorder("k", !0).tex}\\\\
    z &= ${new q(s(this, L).z).add(new M(s(this, W).z).multiply(new M("k"))).reorder("k", !0).tex}
\\end{aligned}\\right.`,
      cartesian: `\\frac{ ${new q("x", 1, s(this, L).x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new q("y", 1, s(this, L).y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new q("z", 1, s(this, L).z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
    };
  }
  get display() {
    const e = s(this, L).x.display, t = s(this, L).y.display, i = s(this, L).z.display, n = this.direction.simplify(), r = n.x.display, l = n.y.display, c = n.z.display;
    return {
      parametric: `${x.asDisplay("x", "y", "z")} = ${x.asDisplay(s(this, L).x.display, s(this, L).y.display, s(this, L).z.display)} + k\\cdot ${x.asDisplay(s(this, W).x.display, s(this, W).y.display, s(this, W).z.display)}`,
      system: "",
      cartesian: `(x-${e})/${r} = (y-${t})/${l} = (z-${i})/${c}`
    };
  }
  get direction() {
    return s(this, W).clone();
  }
  distanceTo(e) {
    const t = new x(s(this, L), e), i = this.direction, n = this.direction.normSquare, r = t.cross(i).normSquare, l = r.clone().divide(n), c = l.clone().sqrt();
    return console.log("CROSS", t.cross(i).display), {
      value: Math.sqrt(l.value),
      fraction: l.clone().sqrt(),
      tex: c.isExact() ? c.tex : `\\sqrt{${l.tex}}`
    };
  }
  hitSegment(e, t) {
    const i = this.intersection(
      new at(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) && i.point.z.value >= Math.min(e.z.value, t.z.value) && i.point.z.value <= Math.max(e.z.value, t.z.value) : !1;
  }
};
L = new WeakMap(), W = new WeakMap(), // A line is defined as the canonical form
a(at, "PERPENDICULAR", "perpendicular"), a(at, "PARALLEL", "parallel");
let Tt = at;
var qe, Ue;
const pi = class pi {
  constructor(e) {
    p(this, qe, new x(0, 0, 1));
    p(this, Ue, new B(0, 0, 0));
    return e && this.parse(e), this;
  }
  get normal() {
    return s(this, qe);
  }
  set normal(e) {
    h(this, qe, e), s(this, qe).asPoint = !1;
  }
  get point() {
    return s(this, Ue);
  }
  set point(e) {
    h(this, Ue, e), s(this, Ue).asPoint = !0;
  }
  get a() {
    return s(this, qe).x;
  }
  get b() {
    return s(this, qe).y;
  }
  get c() {
    return s(this, qe).z;
  }
  get d() {
    return s(this, qe).dot(s(this, Ue)).opposite();
  }
  get tex() {
    return new H(
      new q("xyz", this.a, this.b, this.c, this.d),
      new q(0)
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
      this.normal = new x(l, c, d), l.isNotZero() ? this.point = new B(f.clone().divide(l).opposite(), 0, 0) : c.isNotZero() ? this.point = new B(0, f.clone().divide(c).opposite(), 0) : this.point = new B(0, 0, f.clone().divide(d).opposite());
      return;
    }
    if (((i = e.points) == null ? void 0 : i.length) === 3 && e.points.every((r) => r instanceof x)) {
      const r = e.points[0], l = e.points[1], c = e.points[2], d = new x(r, l), f = new x(r, c);
      this.normal = d.cross(f), this.point = r;
      return;
    }
    if (((n = e.coefficients) == null ? void 0 : n.length) === 4) {
      const [r, l, c, d] = e.coefficients;
      this.normal = new x(r, l, c), this.point = new B(0, 0, -d);
      return;
    }
  }
  angle(e, t, i) {
    if (e instanceof pi)
      return this.normal.angle(e.normal, t, i);
    let n;
    if (e instanceof x) {
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
qe = new WeakMap(), Ue = new WeakMap();
let hi = pi;
var ke;
class rs {
  constructor(...e) {
    p(this, ke, []);
    return h(this, ke, e), this;
  }
  get values() {
    return s(this, ke);
  }
  get array() {
    return s(this, ke).map((e) => e.array);
  }
  get dimension() {
    return [s(this, ke).length, s(this, ke)[0].dimension];
  }
  isSquare() {
    return s(this, ke).length === s(this, ke)[0].dimension;
  }
  determinant() {
    if (!this.isSquare())
      throw new Error("Matrix is not square");
    return is(...this.values);
  }
}
ke = new WeakMap();
function At(o) {
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
  if (e.negative ? t.numerator = Y(e.max, e.zero) : t.numerator = fe(e.zero ? 0 : 1, e.max), e.natural)
    t.denominator = 1;
  else {
    let i = 0;
    for (; t.isRelative() && i < 10; )
      t.denominator = fe(1, e.max), i++;
  }
  return e.reduced ? t.reduce() : t;
}
function Ii(o) {
  const e = Object.assign(
    {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    },
    o
  ), t = new M();
  if (t.coefficient = At({
    zero: e.zero,
    reduced: !0,
    natural: !e.fraction
  }), e.letters.length > 1) {
    for (const i of e.letters.split(""))
      t.setLetter(i, 0);
    for (let i = 0; i < e.degree; i++) {
      const n = fi(e.letters.split(""));
      t.setLetter(n, t.degree(n).clone().add(1));
    }
  } else
    t.setLetter(e.letters, e.degree);
  return t;
}
const os = {
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
function Pi(o) {
  const e = Object.assign(
    os,
    o
  ), t = new q().empty();
  let i;
  for (let n = e.degree; n >= 0; n--)
    i = Ii({
      letters: e.letters,
      degree: n,
      fraction: e.fraction,
      zero: n === e.degree ? !1 : e.allowNullMonom
    }), e.unit && e.degree === n && i.coefficient.one(), t.add(i);
  if (e.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposite(), e.numberOfMonoms && e.numberOfMonoms > 0 && e.numberOfMonoms < t.length)
    for (; t.length > e.numberOfMonoms; ) {
      const n = fe(1, t.length - 1);
      t.monoms.splice(n, 1);
    }
  return t.reduce();
}
function hs(o) {
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
  ), t = new q().one();
  for (let i = 0; i < e.degree; i++) {
    const n = Pi({
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
function ai(o) {
  const e = Object.assign(
    {
      axis: !0,
      fraction: !1,
      max: 10,
      quadrant: null
    },
    o
  ), t = e.axis === "x", i = e.axis === "y", n = e.fraction ? At({ max: e.max, zero: t }) : new u(Y(e.max, t)), r = e.fraction ? At({ max: e.max, zero: i }) : new u(Y(e.max, i));
  return Number(e.quadrant) === 1 && (n.abs(), r.abs()), Number(e.quadrant) === 2 && (n.isPositive() && n.opposite(), r.isNegative() && r.opposite()), Number(e.quadrant) === 3 && (n.isPositive() && n.opposite(), r.isPositive() && r.opposite()), Number(e.quadrant) === 4 && (n.isNegative() && n.opposite(), r.isPositive() && r.opposite()), new B(n, r);
}
function as(o) {
  const e = Object.assign(
    {
      center: {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 }
      },
      pointsOnCircle: 8
    },
    o
  ), t = ai(e.center);
  let i, n;
  return e.pointsOnCircle === 8 ? (i = fe(1, 3), n = i ** 2 + (i + 1) ** 2) : n = fe(1, 20), new Nt(t, n, !0);
}
function ls(o) {
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
  return e.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposite() : e.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposite(), new R(new x(e.A.x, e.A.y), t);
}
function cs(o) {
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
  ), t = new B(e.A.x, e.A.y, e.A.z), i = new x(e.direction.x, e.direction.y, e.direction.z);
  return new Tt(t, i);
}
const us = {
  equation: (o) => hs(o),
  polynom: (o) => Pi(o),
  monom: (o) => Ii(o),
  fraction: (o) => At(o),
  number: (o, e, t) => fe(o, e, t),
  numberSym: (o, e) => Y(o, e),
  prime: (o) => ss(o),
  bool: (o) => Ai(o),
  array: (o, e) => ns(o, e),
  item: (o) => fi(o),
  shuffle: (o) => Oi(o),
  line: (o) => ls(o),
  line3: (o) => cs(o),
  vector: (o) => ai(o),
  point: (o) => {
    const e = ai(o);
    return e.asPoint = !0, e;
  },
  circle: (o) => as(o)
};
var Me, yt, li;
class fs {
  /**
   *
   * @param {string} value (optional) Default polynom to parse on class creation
   */
  constructor(e) {
    p(this, yt);
    p(this, Me);
    a(this, "parse", (e) => (h(this, Me, new Yt(Ze.SET).parse(e).rpn), this));
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
    return s(this, Me).filter((e) => e.tokenType === "variable").map((e) => e.token);
  }
  vennAB() {
    return O(this, yt, li).call(this, {
      A: ["A", "AB"],
      B: ["B", "AB"]
    }, ["A", "B", "AB", "E"]);
  }
  vennABC() {
    return O(this, yt, li).call(this, {
      A: ["A", "AB", "AC", "ABC"],
      B: ["B", "AB", "BC", "ABC"],
      C: ["C", "AC", "BC", "ABC"]
    }, ["A", "B", "C", "AB", "AC", "BC", "ABC", "E"]);
  }
}
Me = new WeakMap(), yt = new WeakSet(), li = function(e, t) {
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
  for (const r of s(this, Me))
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
const ds = {
  Vector: x,
  Point: B,
  Line: R,
  Triangle: oi,
  Circle: Nt,
  Line3: Tt,
  Plane3: hi
}, ms = {
  Numeric: G,
  Fraction: u,
  Root: wt,
  Monom: M,
  Polynom: q,
  Equation: H,
  Matrix: rs,
  LinearSystem: ni,
  Factor: ue,
  PolyFactor: ti,
  LogicalSet: fs,
  Random: us,
  Geometry: ds,
  NumExp: Ji
};
export {
  ms as default
};
//# sourceMappingURL=pimath.js.map
