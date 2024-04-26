var te = Object.defineProperty;
var ie = (c, e, t) => e in c ? te(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var r = (c, e, t) => (ie(c, typeof e != "symbol" ? e + "" : e, t), t);
class x {
  static round(e, t = 2) {
    return +(Math.round(+(e + "e" + t)) + "e-" + t);
  }
  /**
   * Get the list of the nth first prime numbers.
   * @param nb : number of primes to choose from
   */
  static primes(e) {
    let t = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];
    return e === void 0 ? t : t.slice(0, Math.min(t.length, e));
  }
  /**
   * Get the list of all dividers of a number.
   * @param value
   */
  static dividers(e) {
    let t;
    const i = Math.sqrt(Math.abs(e));
    t = [];
    for (let s = 1; s <= i; s++)
      e % s === 0 && (t.push(s), t.push(e / s));
    return t.sort(function(s, n) {
      return s - n;
    }), [...new Set(t)];
  }
  /**
   * Great Common Divisor
   * @param values : number values
   */
  static gcd(...e) {
    let t = function(n, o) {
      return o === 0 ? n : t(o, n % o);
    }, i = 1, s = 2;
    if (e.length === 0)
      return 1;
    if (e.length === 1)
      return e[0] === 0 ? 1 : e[0];
    if (i = t(e[0], e[1]), i === 1)
      return 1;
    for (s = 2; s < e.length && (i = t(i, e[s]), i !== 1); s++)
      ;
    return Math.abs(i);
  }
  static divideNumbersByGCD(...e) {
    let t = x.gcd(...e);
    return e.map((i) => i / t);
  }
  /**
   * Least Common Multiple
   * @param values: list of numbers
   */
  static lcm(...e) {
    return e.reduce(function(t, i) {
      return Math.abs(t * i / x.gcd(t, i));
    });
  }
  static pythagoricianTripletsWithTarget(e, t) {
    const i = [], s = t === !0 ? +e : e ** 2;
    for (let n = 0; n <= e; n++)
      for (let o = 0; o <= e; o++)
        n ** 2 + o ** 2 === s && i.push([n, o, e]);
    return i;
  }
  static numberCorrection(e, t = 1, i = 10, s = 8) {
    return +e.toFixed(s);
  }
  static periodic(e) {
    if (Number.isSafeInteger(e) || e.toString().split(".")[0].length < 10)
      return 0;
  }
  static decompose(e) {
    let t = x.dividers(e), i = [], s, n;
    for (; t.length > 0; )
      s = t.shift(), n = t.length > 0 ? t.pop() : +s, i.push([s, n]);
    return i;
  }
}
const X = {
  pi: Math.PI,
  e: Math.exp(1)
};
var C = /* @__PURE__ */ ((c) => (c.VARIABLE = "variable", c.COEFFICIENT = "coefficient", c.OPERATION = "operation", c.CONSTANT = "constant", c.FUNCTION = "function", c.MONOM = "monom", c))(C || {}), U = /* @__PURE__ */ ((c) => (c.EXPRESSION = "expression", c.POLYNOM = "polynom", c.SET = "set", c.NUMERIC = "numeric", c))(U || {});
class P {
  constructor(e) {
    r(this, "_mode");
    r(this, "_rpn", []);
    r(this, "_tokenConfig");
    r(this, "_tokenConstant");
    r(this, "_tokenKeys");
    r(this, "_uniformize");
    this._mode = typeof e > "u" ? "polynom" : e, this.tokenConfigInitialization();
  }
  // Getter
  get rpn() {
    return this._rpn;
  }
  get rpnToken() {
    return this._rpn.map((e) => e.token);
  }
  /**
   * Determin if the token is a defined operation
   * Defined operations: + - * / ^ sin cos tan
   * @param token
   */
  // isOperation(token: string): boolean {
  //     if (token[0].match(/[+\-*/^]/g)) {
  //         return true;
  //     }
  //     //
  //     // if (token.match(/^sin|cos|tan/g)) {
  //     //     return true;
  //     // }
  //
  //     return false;
  // }
  tokenConfigInitialization() {
    return this._mode === "set" ? (this._tokenConfig = {
      "&": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "|": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "!": {
        precedence: 4,
        associative: "right",
        type: "operation"
        /* OPERATION */
      },
      "-": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      }
    }, this._uniformize = !1) : this._mode === "numeric" ? (this._tokenConfig = {
      "^": {
        precedence: 4,
        associative: "right",
        type: "operation"
        /* OPERATION */
      },
      "*": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "/": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "+": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "-": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "%": {
        precedence: 3,
        associative: "right",
        type: "operation"
        /* OPERATION */
      },
      sin: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      cos: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      tan: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      sqrt: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      nthrt: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      ln: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      log: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      }
    }, this._uniformize = !1) : this._mode === "expression" ? (this._tokenConfig = {
      "^": {
        precedence: 4,
        associative: "right",
        type: "operation"
        /* OPERATION */
      },
      "*": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "/": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "+": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "-": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "%": {
        precedence: 3,
        associative: "right",
        type: "operation"
        /* OPERATION */
      },
      sin: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      cos: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      tan: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      sqrt: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      },
      nthrt: {
        precedence: 4,
        associative: "right",
        type: "function"
        /* FUNCTION */
      }
    }, this._uniformize = !0) : (this._tokenConfig = {
      "^": {
        precedence: 4,
        associative: "right",
        type: "operation"
        /* OPERATION */
      },
      "*": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "/": {
        precedence: 3,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "+": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      },
      "-": {
        precedence: 2,
        associative: "left",
        type: "operation"
        /* OPERATION */
      }
    }, this._uniformize = !0), this._tokenKeys = Object.keys(this._tokenConfig).sort((e, t) => t.length - e.length), this._tokenConfig;
  }
  /**
   * Get the next token to analyse.
   * @param expr (string) Expression to analyse
   * @param start (number) CUrrent position in the expr string.
   */
  NextToken(e, t) {
    let i, s;
    if (i = "", s = "", e[t] === "(")
      i = "(", s = "(";
    else if (e[t] === ")")
      i = ")", s = ")";
    else if (e[t] === ",")
      i = ",", s = "function-argument";
    else {
      for (let n of this._tokenKeys)
        if (e.substring(t, t + n.length) === n) {
          i += n, s = this._tokenConfig[n].type;
          break;
        }
      for (let n in X)
        if (e.substring(t, t + n.length) === n) {
          i += n, s = "constant";
          break;
        }
      i === "" && (e[t].match(/[0-9]/) ? (this._mode, i = e.substring(t).match(/^([0-9.]+)/)[0], s = "coefficient") : e[t].match(/[a-zA-Z]/) ? (i = e.substring(t).match(/^([a-zA-Z])/)[0], s = "variable") : (console.log("Unidentified token", e[t], e, t), i = e[t], s = "monom"));
    }
    return [i, t + i.length, s];
  }
  normalize(e) {
    if (e.length === 1)
      return e;
    let t = [], i = [];
    for (let a in this._tokenConfig)
      this._tokenConfig[a].type === "function" && t.push(a);
    t.sort((a, f) => f.length - a.length);
    for (let a in X)
      i.push(a);
    i.sort((a, f) => f.length - a.length);
    let s = "", n = 0, o, l;
    for (; n < e.length - 1; ) {
      let a = 0;
      for (; a < t.length; ) {
        let f = t[a];
        e.slice(n, n + f.length + 1) === f + "(" ? (s += f + "(", n += f.length + 1, a = 0) : a++;
      }
      for (a = 0; a < i.length; ) {
        let f = i[a];
        if (e.slice(n, n + f.length) === f) {
          s += f.slice(0, -1), n += f.length - 1;
          break;
        }
        a++;
      }
      o = e[n], l = e[n + 1], s += o, o.match(/[a-zA-Z]/g) ? l != null && l.match(/[a-zA-Z\d(]/) && (s += "*") : o.match(/\d/) ? l != null && l.match(/[a-zA-Z(]/) && (s += "*") : o === ")" && l != null && l.match(/[a-zA-Z\d(]/) && (s += "*"), n++;
    }
    return s + (l === void 0 ? "" : l);
  }
  // /**
  //  * Sanitize an expression by adding missing common operation (multiplication between parentheseses)
  //  * @param expr
  //  * @constructor
  //  */
  // Uniformizer(expr: string): string {
  //     // TODO: Delete this old version
  //     // Prefere "normalize", much more robust !
  //     // Determiner if need to be uniformized
  //     if (!this._uniformize) {
  //         return expr
  //     }
  //
  //     // Generate the list of function token.
  //     let fnToken: string[] = []
  //     for (let token in this._tokenConfig) {
  //         if (this._tokenConfig[token].type === ShutingyardType.FUNCTION) {
  //             fnToken.push(token)
  //         }
  //     }
  //     // sort if from the lengthy to the smallest function
  //     fnToken.sort((a, b) => b.length - a.length)
  //     let tokenRegExp = new RegExp(`(${fnToken.join('|')})`, 'g')
  //     let functionTokenOrder = Array.from(expr.matchAll(tokenRegExp))
  //
  //
  //     let expr2;
  //
  //     // Replace all function by @
  //     expr2 = expr.replace(tokenRegExp, '@')
  //     // Add * before @ (functionn)
  //     expr2 = expr2.replace(/([\da-zA-Z])(@)/g, "$1*$2");
  //
  //     // Replace missing multiplication between two parenthese
  //     expr2 = expr2.replace(/\)\(/g, ')*(');
  //
  //     // Replace missing multiplication between number or setLetter and parenthese.
  //
  //     // 3x(x-4) => 3x*(x-4)
  //     expr2 = expr2.replace(/([\da-zA-Z])(\()/g, "$1*$2");
  //
  //     // (x-4)3x => (x-4)*3x
  //     expr2 = expr2.replace(/(\))([\da-zA-Z])/g, "$1*$2");
  //
  //     // Add multiplication between number and letters.
  //     // 3x => 3*x
  //     expr2 = expr2.replace(/([0-9])([a-zA-Z])/g, "$1*$2");
  //     expr2 = expr2.replace(/([a-zA-Z])([0-9])/g, "$1*$2");
  //
  //     // Remove letter between function token and it's parenthese.
  //     // for (let token of fnToken) {
  //     //     // Remove
  //     //     expr2 = expr2.replace(new RegExp(token + '\\*', 'g'), token);
  //     // }
  //     // Add multiplication between letters ?
  //     expr2 = expr2.replace(/([a-zA-Z])([a-zA-Z])/g, "$1*$2");
  //     expr2 = expr2.replace(/([a-zA-Z])([a-zA-Z])/g, "$1*$2");
  //
  //     // Restore operation auto formatting (prevent adding the multiplication star)
  //     let exprAsArray = expr2.split('@')
  //
  //     if (exprAsArray.length > 0) {
  //         expr2 = ""
  //         for (let idx in exprAsArray) {
  //         }
  //         for (let token of fnToken) {
  //             // Remove
  //
  //             // expr2 = expr2.replace(new RegExp(token + '\\*', 'g'), token);
  //         }
  //     }
  //
  //     return expr2;
  // }
  /**
   * Parse an expression using the shutting yard tree algorithms
   * @param expr (string) Expression to analyse
   * Returns a RPN list of items.
   * @param uniformize
   */
  parse(e, t) {
    let i = [], s = [], n = "", o = 0, l = "";
    (t || this._uniformize) && (e = this.normalize(e));
    let a = 50, f = 50, m;
    for (; o < e.length; ) {
      if (a--, a === 0) {
        console.log("SECURITY LEVEL 1 EXIT");
        break;
      }
      switch ([n, o, l] = this.NextToken(e, o), l) {
        case "monom":
        case "coefficient":
        case "variable":
        case "constant":
          i.push({
            token: n,
            tokenType: l
          });
          break;
        case "operation":
          if (s.length > 0) {
            let d = s[s.length - 1];
            for (m = +f; d.token in this._tokenConfig && //either o1 is left-associative and its precedence is less than or equal to that of o2,
            (this._tokenConfig[n].associative === "left" && this._tokenConfig[n].precedence <= this._tokenConfig[d.token].precedence || //or o1 is right associative, and has precedence less than that of o2,
            this._tokenConfig[n].associative === "right" && this._tokenConfig[n].precedence < this._tokenConfig[d.token].precedence); ) {
              if (m--, m === 0) {
                console.log("SECURITY LEVEL 2 OPERATION EXIT");
                break;
              }
              if (i.push(s.pop() || { token: "", tokenType: "operation" }), s.length === 0)
                break;
              d = s[s.length - 1];
            }
          }
          s.push({ token: n, tokenType: l });
          break;
        case "function-argument":
          for (m = +f; s[s.length - 1].token !== "(" && s.length > 0; ) {
            if (m--, m === 0) {
              console.log("SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT");
              break;
            }
            i.push(s.pop() || { token: n, tokenType: l });
          }
          break;
        case "(":
          s.push({ token: n, tokenType: l }), e[o] === "-" && i.push({ token: "0", tokenType: "coefficient" });
          break;
        case ")":
          for (m = +f; s[s.length - 1].token !== "(" && s.length > 1; ) {
            if (m--, m === 0) {
              console.log("SECURITY LEVEL 2 CLOSING PARENTHESE EXIT");
              break;
            }
            i.push(s.pop() || { token: n, tokenType: l });
          }
          s.pop();
          break;
        case "function":
          s.push({ token: n, tokenType: l });
          break;
        default:
          console.log(`SHUTING YARD: ${l} : ${n} `);
      }
    }
    return this._rpn = i.concat(s.reverse()), this;
  }
}
const b = class b {
  constructor(e, t) {
    r(this, "_denominator");
    r(this, "_numerator");
    r(this, "isApproximative", () => this._numerator.toString().length >= 15 && this._denominator.toString().length >= 15);
    r(this, "isExact", () => !this.isApproximative());
    // ------------------------------------------
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    r(this, "parse", (e, t) => {
      let i;
      if (e === null || e === "")
        return this._numerator = 0, this._denominator = 1, this;
      switch (typeof e) {
        case "string":
          if (i = e.split("/"), i.length > 2)
            throw e + " has too many divide signs";
          if (i.map((s) => s === "" || isNaN(Number(s))).includes(!0))
            throw e + " is not a valid number";
          if (i.length === 1)
            return this.parse(+i[0]);
          i.length === 2 ? i[1] === "0" ? (this._numerator = NaN, this._denominator = 1) : (this._numerator = +i[0], this._denominator = +i[1]) : (this._numerator = NaN, this._denominator = 1);
          break;
        case "number":
          if (Number.isSafeInteger(e))
            this._numerator = +e, t === void 0 || !Number.isSafeInteger(t) ? this._denominator = 1 : this._denominator = +t;
          else {
            let [s, n] = e.toString().split("."), o = n ? n.length : 0;
            t === void 0 ? (this._numerator = e * Math.pow(10, o), this._denominator = Math.pow(10, o)) : Number.isSafeInteger(t) && (this._numerator = e * Math.pow(10, o) - Math.floor(e * Math.pow(10, o - t)), this.denominator = Math.pow(10, o) - Math.pow(10, o - t)), this.reduce();
          }
          break;
        case "object":
          e instanceof b && (this._numerator = +e.numerator, this._denominator = +e.denominator);
          break;
      }
      return this;
    });
    // ------------------------------------------
    // Mathematical operations
    r(this, "clone", () => {
      let e = new b();
      return e.numerator = +this._numerator, e.denominator = +this._denominator, e;
    });
    r(this, "zero", () => (this._numerator = 0, this._denominator = 1, this));
    r(this, "one", () => (this._numerator = 1, this._denominator = 1, this));
    r(this, "infinite", () => (this._numerator = 1 / 0, this._denominator = 1, this));
    r(this, "invalid", () => (this._numerator = NaN, this._denominator = 1, this));
    // ------------------------------------------
    r(this, "opposed", () => (this._numerator = -this._numerator, this));
    r(this, "add", (e) => {
      if (e instanceof b) {
        let t = this._numerator, i = this._denominator;
        this._numerator = t * e.denominator + e.numerator * i, this._denominator = i * e.denominator;
      } else
        return this.add(new b(e));
      return this.reduce();
    });
    r(this, "subtract", (e) => e instanceof b ? this.add(e.clone().opposed()) : this.add(-e));
    r(this, "multiply", (e) => {
      let t = new b(e);
      return this._numerator = this._numerator * t.numerator, this._denominator = this._denominator * t.denominator, this.reduce();
    });
    r(this, "xMultiply", (...e) => {
      for (let t of e) {
        let i = new b(t);
        this._numerator = this._numerator * i.numerator, this._denominator = this._denominator * i.denominator;
      }
      return this;
    });
    r(this, "divide", (e) => {
      let t = new b(e);
      if (t.numerator === 0)
        return new b().infinite();
      let i = +this._numerator, s = +this._denominator;
      return this._numerator = i * t.denominator, this._denominator = s * t.numerator, this.reduce();
    });
    r(this, "invert", () => {
      let e = +this._numerator, t = +this._denominator;
      return this._numerator = t, this._denominator = e, this;
    });
    r(this, "pow", (e) => {
      if (e instanceof b)
        return this.pow(e.value);
      this.reduce(), e < 0 && this.invert();
      let t = Math.floor(Math.pow(this._numerator, Math.abs(e))), i = Math.floor(Math.pow(this._denominator, Math.abs(e)));
      return t ** Math.abs(e) === this._numerator && i ** Math.abs(e) === this._denominator ? (this._numerator = this._numerator ** Math.abs(e), this._denominator = this._denominator ** Math.abs(e)) : (this._numerator = this._numerator ** Math.abs(e), this._denominator = this._denominator ** Math.abs(e)), this;
    });
    r(this, "root", (e) => e === 0 ? this : (e < 0 && this.invert(), Math.pow(this._numerator, Math.abs(1 / e)), Math.pow(this._denominator, Math.abs(1 / e)), this._numerator = Math.pow(this._numerator, Math.abs(1 / e)), this._denominator = Math.pow(this._denominator, Math.abs(1 / e)), this));
    r(this, "sqrt", () => this.root(2));
    r(this, "abs", () => (this._numerator = Math.abs(this._numerator), this._denominator = Math.abs(this._denominator), this));
    // ------------------------------------------
    // Mathematical operations specific to fractions
    // ------------------------------------------
    r(this, "reduce", () => {
      let e = x.gcd(this._numerator, this._denominator);
      return this._numerator = this._numerator / e, this._denominator = this._denominator / e, this._denominator < 0 && (this._denominator = -this._denominator, this._numerator = -this._numerator), this;
    });
    r(this, "amplify", (e) => (Number.isSafeInteger(e) && (this._numerator *= e, this._denominator *= e), this));
    // ------------------------------------------
    // Compare functions
    // ------------------------------------------
    /**
     * Compare the current coefficient with another coefficient
     * @param F (Coefficient) The coefficient to compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    r(this, "compare", (e, t) => {
      t === void 0 && (t = "=");
      let i;
      switch (e instanceof b ? i = e.clone() : i = new b(e), t) {
        case ">":
          return this.value > i.value;
        case ">=":
          return this.value >= i.value;
        case "<":
          return this.value < i.value;
        case "<=":
          return this.value <= i.value;
        case "=":
          return this.value === i.value;
        case "<>":
          return this.value !== i.value;
        default:
          return !1;
      }
    });
    /* Compare shortcuts */
    r(this, "lesser", (e) => this.compare(e, "<"));
    r(this, "leq", (e) => this.compare(e, "<="));
    r(this, "greater", (e) => this.compare(e, ">"));
    r(this, "geq", (e) => this.compare(e, ">="));
    r(this, "isEqual", (e) => this.compare(e, "="));
    r(this, "isNotEqual", (e) => this.compare(e, "<>"));
    r(this, "isOpposed", (e) => this.isEqual(e.clone().opposed()));
    r(this, "isInverted", (e) => this.isEqual(new b().one().divide(e.clone())));
    r(this, "isZero", () => this._numerator === 0);
    r(this, "isNotZero", () => this._numerator !== 0);
    r(this, "isOne", () => this._numerator === 1 && this._denominator === 1);
    r(this, "isNegativeOne", () => this._numerator === -1 && this._denominator === 1);
    r(this, "isPositive", () => this.sign() === 1);
    r(this, "isNegative", () => this.sign() === -1);
    r(this, "isStrictlyPositive", () => this.value > 0);
    r(this, "isStrictlyNegative", () => this.value < 0);
    r(this, "isNaN", () => isNaN(this._numerator));
    r(this, "isInfinity", () => Math.abs(this._numerator) === 1 / 0);
    r(this, "isFinite", () => !this.isInfinity() && !this.isNaN());
    r(this, "isSquare", () => Math.sqrt(this._numerator) % 1 === 0 && Math.sqrt(this._denominator) % 1 === 0);
    r(this, "isReduced", () => Math.abs(x.gcd(this._numerator, this._denominator)) === 1);
    r(this, "isNatural", () => this.isRelative() && this.isPositive());
    r(this, "isRelative", () => this.clone().reduce().denominator === 1);
    r(this, "isRational", () => !this.isRelative());
    r(this, "isEven", () => this.isRelative() && this.value % 2 === 0);
    r(this, "isOdd", () => this.isRelative() && this.value % 2 === 1);
    r(this, "sign", () => this._numerator * this._denominator >= 0 ? 1 : -1);
    // TODO: The rest of the functions are not used or unnecessary ?
    /**
     * Simple function to determine if it's a fraction
     */
    r(this, "areEquals", (...e) => {
      for (let t = 0; t < e.length; t++)
        if (!this.isEqual(e[t]))
          return !1;
      return !0;
    });
    return this._numerator = 1, this._denominator = 1, e !== void 0 && this.parse(e, t), this;
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get numerator() {
    return this._numerator;
  }
  set numerator(e) {
    this._numerator = e;
  }
  get denominator() {
    return this._denominator;
  }
  set denominator(e) {
    this._denominator = e;
  }
  get value() {
    return this._numerator / this._denominator;
  }
  // Display getter
  get tex() {
    return this.isInfinity() ? `${this.sign() === 1 ? "+" : "-"}\\infty` : this.isExact() ? this._denominator === 1 ? `${this._numerator}` : this._numerator < 0 ? `-\\frac{ ${-this._numerator} }{ ${this._denominator} }` : `\\frac{ ${this._numerator} }{ ${this._denominator} }` : this.value.toFixed(3);
  }
  get texWithSign() {
    return this.isPositive() ? `+${this.tex}` : this.tex;
  }
  get display() {
    return this.isExact() ? this._denominator === 1 ? `${this._numerator}` : `${this._numerator}/${this._denominator}` : this.value.toFixed(3);
  }
  // Helper function to display fractions
  get frac() {
    return this.tex;
  }
  get dfrac() {
    return this.tex.replace("\\frac", "\\dfrac");
  }
  get tfrac() {
    return this.tex.replace("\\frac", "\\tfrac");
  }
};
r(b, "max", (...e) => {
  let t = new b(e[0]);
  for (let i of e) {
    let s = new b(i);
    s.greater(t) && (t = s.clone());
  }
  return t;
}), r(b, "min", (...e) => {
  let t = new b(e[0]);
  for (let i of e) {
    let s = new b(i);
    s.lesser(t) && (t = s.clone());
  }
  return t;
}), // ------------------------------------------
// Creation / parsing functions
r(b, "average", (...e) => {
  let t = new b().zero();
  for (let i of e)
    t.add(i);
  return t.divide(e.length), t;
}), r(b, "unique", (e, t) => {
  let i = {}, s = [];
  return e.forEach((n) => {
    i[n.clone().reduce().tex] || (s.push(n.clone()), i[n.tex] = !0);
  }), t ? b.sort(s) : s;
}), r(b, "sort", (e, t) => {
  let i = e.sort((s, n) => s.value - n.value);
  return t && i.reverse(), i;
});
let h = b;
class K {
  constructor(e, t) {
    r(this, "_rpn");
    r(this, "_expression");
    r(this, "_isValid");
    this._expression = e;
    try {
      this._rpn = new P(U.NUMERIC).parse(e, t || t === void 0).rpn;
    } catch {
      this._rpn = null, this._isValid = !1;
    }
  }
  get rpn() {
    return this._rpn;
  }
  get isValid() {
    if (this._isValid === void 0)
      try {
        const e = this.evaluate({ x: 0 });
      } catch {
        this._isValid = !1;
      }
    return this._isValid;
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
    this.isValid = !0;
    for (const i of this._rpn)
      if (i.tokenType === C.COEFFICIENT)
        isNaN(+i.token) ? this._addToStack(t, new h(i.token).value) : this._addToStack(t, +i.token);
      else if (i.tokenType === C.VARIABLE)
        e[i.token] !== void 0 && this._addToStack(t, +e[i.token]);
      else if (i.tokenType === C.CONSTANT)
        this._addToStack(t, X[i.token]);
      else if (i.tokenType === C.OPERATION) {
        if (i.token === "*") {
          const s = t.pop(), n = t.pop();
          (n === void 0 || s === void 0) && (this.isValid = !1), this._addToStack(t, n * s);
        } else if (i.token === "/") {
          const s = t.pop(), n = t.pop();
          (n === void 0 || s === void 0) && (this.isValid = !1), this._addToStack(t, n / s);
        } else if (i.token === "+") {
          const s = t.pop(), n = t.pop();
          (n === void 0 || s === void 0) && (this.isValid = !1), this._addToStack(t, +n + +s);
        } else if (i.token === "-") {
          const s = t.pop(), n = t.pop() || 0;
          s === void 0 && (this.isValid = !1), this._addToStack(t, n - s);
        } else if (i.token === "^") {
          const s = t.pop(), n = t.pop();
          (n === void 0 || s === void 0) && (this.isValid = !1), this._addToStack(t, Math.pow(n, s));
        }
      } else if (i.tokenType === C.FUNCTION) {
        const s = t.pop();
        if (s === void 0 && (this.isValid = !1), i.token === "sin")
          this._addToStack(t, Math.sin(s));
        else if (i.token === "cos")
          this._addToStack(t, Math.cos(s));
        else if (i.token === "tan")
          this._addToStack(t, Math.tan(s));
        else if (i.token === "sqrt")
          this._addToStack(t, Math.sqrt(s));
        else if (i.token === "nthrt") {
          let n = t.pop();
          s % 2 === 0 && n < 0 ? this._addToStack(t, NaN) : this._addToStack(t, (n < 0 ? -1 : 1) * Math.pow(Math.abs(n), 1 / s));
        } else
          i.token === "ln" ? this._addToStack(t, Math.log(s)) : i.token === "log" && this._addToStack(t, Math.log10(s));
      }
    if (t.length === 1)
      return t[0];
    throw `There was a problem parsing: ${this._expression}`;
  }
  _extractDecimalPart(e) {
    let t = e.toString();
    return t.includes(".") ? (t = t.split(".")[1], t.substring(0, t.length - 2)) : "";
  }
  _numberCorrection(e) {
    const s = this._extractDecimalPart(e);
    if (s === "")
      return e;
    const n = s.match(/9+$/g), o = s.match(/0+$/g);
    if (n && n[0].length >= 6) {
      const l = this._extractDecimalPart(e + 1e-14), a = l.match(/0+$/g);
      if (a && a[0].length >= 6)
        return +(e + 1e-14).toString().split(a[0])[0];
    }
    if (o && o[0].length >= 6) {
      const l = this._extractDecimalPart(e - 1e-14), a = l.match(/9+$/g);
      if (a && a[0].length >= 6)
        return +e.toString().split(o[0])[0];
    }
    return e;
  }
  _addToStack(e, t) {
    e.push(this._numberCorrection(t));
  }
}
class D {
  constructor() {
    r(this, "_config");
    r(this, "_defaultConfig");
    r(this, "mergeConfig", (e, t) => e !== void 0 ? { ...t, ...e } : t);
    r(this, "generate", () => {
    });
    r(this, "config", (e) => (this._config = this.mergeConfig(e, this._defaultConfig), this));
  }
}
const $ = class $ {
  /**
   * Create a Monom
   * Defined as \\(k \\cdot x^{n}\\), where \\( k,n \in \\mathbb{Q}\\).
   * Examples: \\(3x^2\\) or \\(3/5x^2\\)
   * @param value (optional) string The value that should be parse. Can be a Monom, a Fraction, a string or a number. If nothing is provided, it will return the trivial monom (0).
   */
  constructor(e) {
    r(this, "_coefficient");
    r(this, "_literal");
    // -----------------------------------------
    /**
     * Parse a string to a monom. The string may include fraction.
     * @param inputStr
     */
    r(this, "parse", (e) => (typeof e == "string" ? this._shutingYardToReducedMonom(e) : typeof e == "number" ? (this._coefficient = new h(e), this._literal = {}) : e instanceof h ? (this._coefficient = e.clone(), this._literal = {}) : e instanceof $ && (this._coefficient = e._coefficient.clone(), this._literal = this.copyLiterals(e.literal)), this));
    r(this, "addToken", (e, t) => {
      let i, s, n, o, l;
      if (t.tokenType === C.COEFFICIENT)
        e.push(new $(new h(t.token)));
      else if (t.tokenType === C.VARIABLE) {
        let a = new $().one();
        a.setLetter(t.token, 1), e.push(a.clone());
      } else if (t.tokenType === C.OPERATION)
        switch (t.token) {
          case "-":
            s = e.pop() || new $().zero(), i = e.pop() || new $().zero(), e.push(i.subtract(s));
            break;
          case "*":
            s = e.pop() || new $().one(), i = e.pop() || new $().one(), e.push(i.multiply(s));
            break;
          case "/":
            s = e.pop() || new $().one(), i = e.pop() || new $().one(), e.push(i.divide(s));
            break;
          case "^":
            l = e.pop().coefficient || new h().one(), n = e.pop() || new $().one(), o = n.variables[0], o !== void 0 && n.setLetter(o, l), e.push(n);
            break;
        }
    });
    /**
     * Clone the current Monom.
     */
    r(this, "clone", () => {
      let e = new $();
      e.coefficient = this._coefficient.clone();
      for (let t in this._literal)
        e.setLetter(t, this._literal[t].clone());
      return e;
    });
    r(this, "copyLiterals", (e) => {
      let t = {};
      for (let i in e)
        t[i] = e[i].clone();
      return t;
    });
    r(this, "makeSame", (e) => {
      for (let t in e._literal)
        this.setLetter(t, e._literal[t].clone());
      return this;
    });
    /**
     * Create a zero value monom
     */
    r(this, "zero", () => (this._coefficient = new h().zero(), this._literal = {}, this));
    /**
     * Create a one value monom
     */
    r(this, "one", () => (this._coefficient = new h().one(), this._literal = {}, this));
    /**
     * Clean the monom by removing each letters with a power of zero.
     */
    r(this, "clean", () => {
      for (let e in this._literal)
        this._literal[e].isZero() && delete this._literal[e];
      return this;
    });
    r(this, "reduce", () => (this.clean(), this.coefficient.reduce(), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    /**
     * Get the opposed
     * Returns a monom.
     */
    r(this, "opposed", () => (this._coefficient.opposed(), this));
    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    r(this, "add", (...e) => {
      for (let t of e)
        this.isSameAs(t) ? (this.isZero() && this.makeSame(t), this._coefficient.add(t.coefficient)) : console.log("Add monom: " + this.display + " is not similar with ", t.display);
      return this;
    });
    /**
     * Subtract multiple monoms
     * @param M (Monom[]) The monoms to subtract
     */
    r(this, "subtract", (...e) => {
      for (let t of e)
        this.isSameAs(t) ? (this.isZero() && this.makeSame(t), this._coefficient.add(t.clone().coefficient.opposed())) : console.log("Subtract: Is not similar: ", t.display);
      return this;
    });
    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    r(this, "multiply", (...e) => {
      for (let t of e) {
        this._coefficient.multiply(t.coefficient);
        for (let i in t.literal)
          this._literal[i] === void 0 ? this._literal[i] = t.literal[i].clone() : this._literal[i].add(t.literal[i]);
      }
      return this;
    });
    r(this, "multiplyByNumber", (e) => (this._coefficient.multiply(e), this));
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    r(this, "divide", (...e) => {
      for (let t of e) {
        this._coefficient.divide(t.coefficient);
        for (let i in t.literal)
          this._literal[i] = this._literal[i] === void 0 ? t.literal[i].clone().opposed() : this._literal[i].subtract(t.literal[i]), this._literal[i].isZero() && delete this._literal[i];
      }
      return this;
    });
    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    r(this, "pow", (e) => {
      this._coefficient.pow(e);
      for (let t in this._literal)
        this._literal[t].multiply(e);
      return this;
    });
    /**
     * Get the nth-root of the monom
     * @param p
     */
    r(this, "root", (e) => this);
    /**
     * Return the square root of a monom
     */
    r(this, "sqrt", () => {
      if (this.isSquare()) {
        this._coefficient.sqrt();
        for (let e in this._literal)
          this._literal[e].clone().divide(2);
      }
      return this.root(2);
    });
    // ------------------------------------------
    // Compare functions
    // ------------------------------------------
    r(this, "compare", (e, t) => {
      switch (t === void 0 && (t = "="), t) {
        case "=":
          return this.compare(e, "same") ? this._coefficient.isEqual(e.coefficient) : !1;
        case "same":
          let i = this.variables, s = e.variables, n = i.concat(s.filter((o) => i.indexOf(o) < 0));
          if (i.length === 0 && s.length === 0)
            return !0;
          if (!this.isZero() && !e.isZero()) {
            for (let o of n)
              if (this._literal[o] === void 0 || e.literal[o] === void 0 || !this._literal[o].isEqual(e.literal[o]))
                return !1;
          }
          return !0;
        default:
          return !1;
      }
    });
    /**
     * Determine if two monoms are equals
     * @param M
     */
    r(this, "isEqual", (e) => this.compare(e, "="));
    /**
     * Determine if two monoms are similar
     * @param M
     */
    r(this, "isSameAs", (e) => this.compare(e, "same"));
    r(this, "isSquare", () => this.coefficient.isSquare() ? this.isLiteralSquare() : !1);
    r(this, "isLiteralSquare", () => {
      for (let e in this.literal)
        if (this.literal[e].isRational() || this.literal[e].isEven())
          return !1;
      return !0;
    });
    r(this, "hasFractionCoefficient", () => {
      for (let e in this._literal)
        if (this._literal[e].isRational())
          return !0;
      return !1;
    });
    // ------------------------------------------
    // Misc monoms functions
    // -------------------------------------
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    r(this, "hasLetter", (e) => this._literal[e === void 0 ? "x" : e] === void 0 ? !1 : this._literal[e === void 0 ? "x" : e].isNotZero());
    /**
     * Set the power of a particular setLetter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the setLetter (must be positive integer.
     */
    r(this, "setLetter", (e, t) => {
      t instanceof h ? (this.hasLetter(e) && t.isZero() && delete this._literal[e], this._literal[e] = t.clone()) : this.setLetter(e, new h(t));
    });
    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    r(this, "degree", (e) => this.variables.length === 0 ? new h().zero() : e === void 0 ? Object.values(this._literal).reduce((t, i) => t.clone().add(i)) : this._literal[e] === void 0 ? new h().zero() : this._literal[e].clone());
    /**
     * Evaluate a monom. Each setLetter must be assigned to a Fraction.
     * @param values    Dictionary of <setLetter: Fraction>
     */
    r(this, "evaluate", (e) => {
      let t = this.coefficient.clone();
      if (typeof e == "number" || e instanceof h) {
        let i = {};
        return i[this.variables[0]] = new h(e), this.evaluate(i);
      }
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient;
        for (let i in this._literal) {
          if (e[i] === void 0)
            return new h().zero();
          let s = new h(e[i]);
          t.multiply(s.pow(this._literal[i]));
        }
      }
      return t;
    });
    r(this, "evaluateAsNumeric", (e) => {
      let t = this.coefficient.value;
      if (typeof e == "number") {
        let i = {};
        return i[this.variables[0]] = e, this.evaluateAsNumeric(i);
      }
      if (typeof e == "object") {
        if (this.variables.length === 0)
          return this.coefficient.value;
        for (let i in this._literal) {
          if (e[i] === void 0)
            return 0;
          t *= e[i] ** this._literal[i].value;
        }
      }
      return t;
    });
    /**
     * Derivative the monom
     * @param letter
     */
    r(this, "derivative", (e) => {
      if (e === void 0 && (e = "x"), this.hasLetter(e)) {
        let t = this._literal[e].clone(), i = this.clone();
        return i._literal[e].subtract(1), i._coefficient.multiply(new h(t.clone())), i;
      } else
        return new $().zero();
    });
    r(this, "primitive", (e) => {
      e === void 0 && (e = "x");
      let t = this.clone(), i;
      return t.hasLetter(e) ? (i = t.degree(e).clone().add(1), t.coefficient = t.coefficient.clone().divide(i), t.setLetter(e, i)) : (t.coefficient.isZero() && (t.coefficient = new h().one()), t.setLetter(e, 1)), t;
    });
    // ----------------------------------------
    // Static functions
    // ----------------------------------------
    // TODO: The rest of the functions are not used or unnecessary ?
    /**
     * Determine if multiple monoms are similar
     * @param M
     */
    r(this, "areSameAs", (...e) => {
      let t = !0;
      for (let i = 0; i < e.length; i++)
        if (!this.isSameAs(e[i]))
          return !1;
      return t;
    });
    /**
     * Determine if multiple monoms are equals
     * @param M
     */
    r(this, "areEquals", (...e) => {
      if (!this.areSameAs(...e))
        return !1;
      for (let t of e)
        if (!this._coefficient.isEqual(t.coefficient))
          return !1;
      return !0;
    });
    r(this, "isDivisible", (e) => {
      if (e.degree().isStrictlyPositive()) {
        for (let t of e.variables)
          if (!this.degree(t).geq(e.degree(t)))
            return !1;
      }
      return this.coefficient.isRational() || e.coefficient.isRational() ? !0 : this.coefficient.clone().divide(e.coefficient).isRelative();
    });
    r(this, "_shutingYardToReducedMonom", (e) => {
      const i = new P().parse(e).rpn;
      let s = [];
      if (i.length === 0)
        return this.zero(), this;
      if (i.length === 1) {
        const n = i[0];
        return this.one(), n.tokenType === "coefficient" ? this.coefficient = new h(n.token) : n.tokenType === "variable" && this.setLetter(n.token, 1), this;
      } else
        for (const n of i)
          this.addToken(s, n);
      return this.one(), this.multiply(s[0]), this;
    });
    return this.zero(), e !== void 0 && this.parse(e), this;
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  /**
   * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
   * @returns {Fraction}
   */
  get coefficient() {
    return this._coefficient;
  }
  /**
   * Set the coefficient \\(k\\) value of the monom
   * @param {Fraction | number | string} F
   */
  set coefficient(e) {
    this._coefficient = new h(e);
  }
  /**
   * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
   * @returns {literalType}
   */
  get literal() {
    return this._literal;
  }
  /**
   * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
   * @param {literalType} L
   */
  set literal(e) {
    this._literal = e;
  }
  /**
   * Get the literal square roots of the Monom.
   * TODO: remove this getter ? Is it used and is it correct ?
   * @returns {literalType}
   */
  get literalSqrt() {
    if (this.isLiteralSquare()) {
      let e = {};
      for (let t in this._literal)
        e[t] = this._literal[t].clone().sqrt();
      return e;
    } else
      return this._literal;
  }
  /**
   * Set the literal part of the monom from a string
   * @param inputStr  String like x^2y^3
   */
  set literalStr(e) {
    for (const t of [...e.matchAll(/([a-z])\^([+-]?[0-9]+)/g)])
      t[1] in this._literal || (this._literal[t[1]] = new h().zero()), this._literal[t[1]].add(+t[2]);
    for (const t of [...e.matchAll(/([a-z](?!\^))/g)])
      t[1] in this._literal || (this._literal[t[1]] = new h().zero()), this._literal[t[1]].add(1);
  }
  // Getter helpers.
  /**
   * Get the variables letters
   */
  get variables() {
    let e = this.clone().clean();
    return Object.keys(e.literal);
  }
  // Display getter
  /**
   * This display getter is to be used in the polynom display getter
   */
  get display() {
    let e = "", t = Object.keys(this._literal).sort();
    for (let i of t)
      this._literal[i].isNotZero() && (e += `${i}`, this._literal[i].isNotEqual(1) && (e += `^(${this._literal[i].display})`));
    return e === "" ? this._coefficient.value != 0 ? `${this._coefficient.display}` : "" : this._coefficient.value === 1 ? e : this._coefficient.value === -1 ? `-${e}` : this._coefficient.value === 0 ? "0" : `${this._coefficient.display}${e}`;
  }
  get dividers() {
    if (!this.coefficient.isRelative())
      return [this.clone()];
    if (this.hasFractionCoefficient())
      return [this.clone()];
    if (this.coefficient.numerator > 1e6)
      return [this.clone()];
    const e = x.dividers(Math.abs(this.coefficient.numerator));
    let t = [];
    for (let s in this.literal)
      t = this._getLiteralDividers(t, s);
    const i = [];
    if (t.length > 0 && e.length > 0)
      for (let s of e)
        for (let n of t) {
          let o = new $();
          o.coefficient = new h(s), o.literal = n, i.push(o);
        }
    else if (e.length === 0)
      for (let s of t) {
        let n = new $();
        n.coefficient = new h().one(), n.literal = s, i.push(n);
      }
    else
      for (let s of e) {
        let n = new $();
        n.coefficient = new h(s), i.push(n);
      }
    return i.length === 0 ? [new $().one()] : i;
  }
  /**
   * Display the monom, forcing the '+' sign to appear
   */
  get displayWithSign() {
    let e = this.display;
    return (e[0] !== "-" ? "+" : "") + e;
  }
  get texWithSign() {
    return this.coefficient.isStrictlyPositive() ? "+" + this.tex : this.tex;
  }
  get plotFunction() {
    let e = "", t = Object.keys(this._literal).sort();
    for (let i of t)
      this._literal[i].isNotZero() && (e += (e === "" ? "" : "*") + `${i}`, this._literal[i].isNotEqual(1) && (e += `^(${this._literal[i].display})`));
    return e === "" ? this._coefficient.value != 0 ? `${this._coefficient.display}` : "" : this._coefficient.value === 1 ? e : this._coefficient.value === -1 ? `-${e}` : this._coefficient.value === 0 ? "0" : `${this._coefficient.display}*${e}`;
  }
  /**
   * Get the tex output of the monom
   */
  get tex() {
    let e = "", t = Object.keys(this._literal).sort();
    for (let i of t)
      this._literal[i].isNotZero() && (e += `${i}`, this._literal[i].isNotEqual(1) && (e += `^{${this._literal[i].tfrac}}`));
    return e === "" ? this._coefficient.value != 0 ? `${this._coefficient.frac}` : "0" : this._coefficient.value === 1 ? e : this._coefficient.value === -1 ? `-${e}` : this._coefficient.value === 0 ? "0" : `${this._coefficient.frac}${e}`;
  }
  /**
   * Determine if the monom is null
   */
  isZero() {
    return this._coefficient.value === 0;
  }
  /**
   * Determine if the monom is one
   */
  isOne() {
    return this._coefficient.value === 1 && this.variables.length === 0;
  }
  _getLiteralDividers(e, t) {
    let i = [];
    for (let s = 0; s <= this.literal[t].value; s++)
      if (e.length === 0) {
        let n = {};
        n[t] = new h(s), i.push(n);
      } else
        for (let n of e) {
          let o = {};
          for (let l in n)
            o[l] = n[l];
          o[t] = new h(s), i.push(o);
        }
    return i;
  }
};
/**
 * Get the least common multiple of monoms
 * @param monoms    Array of monoms
 */
r($, "lcm", (...e) => {
  for (let l of e)
    if (l.hasFractionCoefficient())
      return new $().zero();
  let t = new $(), i = e.map((l) => l.coefficient.numerator), s = e.map((l) => l.coefficient.denominator), n = x.gcd(...i), o = x.lcm(...s);
  t.coefficient = new h(n, o).reduce();
  for (let l of e) {
    for (let a in t.literal)
      a in l.literal || t.literal[a].zero();
    for (let a in l.literal)
      t.literal[a] === void 0 && l.literal[a].isStrictlyPositive() ? t.literal[a] = l.literal[a].clone() : t.literal[a] = new h(Math.min(l.literal[a].value, t.literal[a].value));
  }
  return t;
}), // ------------------------------------------
// Creation / parsing functions
/**
 * Multiply two monoms and return a NEW monom.
 * @param monoms
 */
r($, "xmultiply", (...e) => {
  let t = new $().one();
  for (let i of e)
    t.multiply(i);
  return t;
});
let g = $;
class Q extends D {
  constructor(t) {
    super();
    r(this, "generate", () => {
      let t = new g();
      if (typeof this._config.fraction == "boolean" ? t.coefficient = w.fraction({
        zero: this._config.zero,
        reduced: !0,
        natural: !this._config.fraction
      }) : t.coefficient = w.fraction(this._config.fraction), this._config.letters.length > 1) {
        for (let i of this._config.letters.split(""))
          t.setLetter(i, 0);
        for (let i = 0; i < this._config.degree; i++) {
          const s = w.item(this._config.letters.split(""));
          t.setLetter(s, t.degree(s).clone().add(1));
        }
      } else
        t.setLetter(this._config.letters, this._config.degree);
      return t;
    });
    this._defaultConfig = {
      letters: "x",
      degree: 2,
      fraction: !0,
      zero: !1
    }, this._config = this.mergeConfig(t, this._defaultConfig);
  }
}
class J {
  constructor(...e) {
    r(this, "_radical");
    r(this, "_nth");
    r(this, "_coefficient");
    r(this, "_isValid");
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    r(this, "parse", (e, t, i) => (this._coefficient = i === void 0 ? 1 : i, this._nth = t === void 0 ? 2 : t, this._radical = e === void 0 ? 1 : e, this._nth % 2 === 0 && this._radical < 0 && (this._isValid = !1), this));
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
    r(this, "hasRadical", () => !(this._radical === 1 || this._radical === 0 || this._isValid === !1));
    this._radical = 1, this._coefficient = 1, this._nth = 2, this._isValid = !0, e !== void 0 && this.parse(e[0], e[1], e[2]);
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
var F = /* @__PURE__ */ ((c) => (c.real = "\\mathbb{R}", c.varnothing = "\\varnothing", c))(F || {});
class k {
  /**
   * Create an Equation using two polynoms.
   * Markdown *support* is cool
   * @param equations
   */
  constructor(...e) {
    r(this, "_polynom");
    // Used to solve the equation // TODO: remove the private value ?
    // Undetermined texSolutions.
    r(this, "_varnothing", "\\varnothing");
    r(this, "_real", "\\mathbb{R}");
    r(this, "_left");
    // Left part of the equation
    r(this, "_right");
    // Right part of the equation
    r(this, "_sign");
    // Signe of the equation, by default =
    r(this, "_solutions");
    // -----------------------------------------------
    r(this, "_randomizeDefaults", {
      degree: 2
    });
    r(this, "hasVariable", (e) => this.variables.includes(e));
    // ------------------------------------------
    r(this, "parse", (e) => {
      let t, i;
      if (i = this._findSign(e), i === !1) {
        console.error("The equation is not valid (no sign found)");
        return;
      }
      return t = e.split(i), this.create(new u(t[0]), new u(t[1]), this._formatSign(i));
    });
    r(this, "create", (e, t, i) => (this._left = e, this._right = t, this._sign = this._formatSign(i), this));
    // -----------------------------------------------
    // Equations generators and randomizers
    r(this, "clone", () => new k().create(this._left.clone(), this._right.clone(), this._sign + ""));
    r(this, "randomize", (e, t) => new k().create(new u(), new u(), t));
    // -----------------------------------------------
    /**
     * Reorder will move all monoms containing a letter on the left, all the other on the right.
     */
    r(this, "moveLeft", () => (this._left = this._left.clone().subtract(this._right), this._right.zero(), this));
    r(this, "reorder", (e) => (this._left.subtract(this._right), this._right.zero(), this._left.reorder(), e ? this : (this._left.monoms.filter((t) => t.degree().isZero()).forEach((t) => {
      const i = t.clone();
      this._left.subtract(i), this._right.subtract(i);
    }), this._left.reorder(), this._right.reorder(), this)));
    // -----------------------------------------------
    // Equations operations
    /**
     * Multiply by the lcm denominator and divide by the gcm numerators.
     */
    r(this, "simplify", () => (this.multiply(x.lcm(...this._left.getDenominators(), ...this._right.getDenominators())), this.divide(x.gcd(...this._left.getNumerators(), ...this._right.getNumerators())), this));
    /**
     * Reorder the polynom to have only one letter on the left, the rest on the right.
     * @param letter
     */
    r(this, "isolate", (e) => {
      if (!this.degree(e).isOne() || this.isMultiVariable())
        return !1;
      let t, i;
      this._left.subtract(this._right), this._right.zero();
      let s = [...this._left.monoms];
      for (let n of s)
        n.hasLetter(e) || (t = n.clone(), this._left.subtract(t), this._right.subtract(t));
      return this._left.length !== 1 ? !1 : (i = this._left.monoms[0].coefficient.clone(), this._left.divide(i), this._right.divide(i), this);
    });
    r(this, "replaceBy", (e, t) => (this._left.replaceBy(e, t), this._right.replaceBy(e, t), this));
    /**
     * Multiple an equation by a fraction value.
     * @param value
     */
    r(this, "multiply", (e) => {
      let t = new h(e);
      return this._left.multiply(t), this._right.multiply(t), this._sign !== "=" && t.sign() === -1 && this._reverseSign(), this;
    });
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
      let t = new h(e);
      return t.isZero() ? this : this.multiply(t.invert());
    });
    /**
     * Get the degree of the equation
     * @param letter
     */
    r(this, "degree", (e) => h.max(this._left.degree(e), this._right.degree(e)));
    /**
     * Determine if the equation contains more than one letter/variable.
     */
    r(this, "isMultiVariable", () => this._left.isMultiVariable || this._right.isMultiVariable);
    // -----------------------------------------------
    // Equations helpers
    // -----------------------------------------------
    r(this, "letters", () => [.../* @__PURE__ */ new Set([...this._left.letters(), ...this._right.letters()])]);
    // -----------------------------------------------
    r(this, "solve", () => {
      switch (this._solutions = [], this._polynom = this._left.clone().subtract(this._right), this._polynom.degree().value) {
        case 0:
        case 1:
          this._solveDegree1();
          break;
        case 2:
          this._solveDegree2();
          break;
        default:
          this._solveDegree3plus();
      }
      return this._solutions = k.makeSolutionsUnique(this._solutions), this;
    });
    r(this, "test", (e) => this.left.evaluate(e).isEqual(this.right.evaluate(e)));
    r(this, "isSameAs", (e) => {
      let t = e.clone().moveLeft().left, i = this.clone().moveLeft().left;
      return t.isEqual(i) || t.isOpposedAt(i);
    });
    r(this, "isLinearTo", (e) => {
      let t = e.clone().moveLeft().simplify().left, i = this.clone().moveLeft().simplify().left;
      return t.isEqual(i) || t.isOpposedAt(i);
    });
    r(this, "_findSign", (e) => e.includes("geq") ? e.includes("\\geq") ? "\\geq" : "geq" : e.includes("leq") ? e.includes("\\leq") ? "\\leq" : "leq" : e.includes(">=") ? ">=" : e.includes("=>") ? "=>" : e.includes(">") ? ">" : e.includes("<=") ? "<=" : e.includes("=<") ? "=<" : e.includes("<") ? "<" : e.includes("=") ? "=" : (console.log("Equation: parse string : sign not found"), !1));
    // -----------------------------------------------
    // Equations solving algorithms
    r(this, "_formatSign", (e) => e === void 0 ? "=" : e.includes("geq") || e.includes(">=") || e.includes("=>") ? ">=" : e.includes(">") ? ">" : e.includes("leq") || e.includes("<=") || e.includes("=<") ? "<=" : e.includes("<") ? "<" : "=");
    r(this, "_reverseSign", () => this._sign === "=" ? this : this._sign.includes("<") ? (this._sign.replace("<", ">"), this) : this._sign.includes(">") ? (this._sign.replace(">", "<"), this) : this);
    r(this, "isGreater", () => this._sign.indexOf(">") !== -1 ? !0 : this._sign.indexOf("geq") !== -1);
    r(this, "isStrictEqual", () => this._sign === "=");
    r(this, "isAlsoEqual", () => {
      if (this._sign.indexOf("=") !== -1 || this._sign.indexOf("geq") !== -1 || this._sign.indexOf("leq") !== -1)
        return !0;
    });
    r(this, "_solveDegree1", (e) => {
      const t = this._polynom.monomByDegree(1, e).coefficient, i = this._polynom.monomByDegree(0, e).coefficient, s = i.clone().opposed().divide(t);
      let n, o;
      return this.isStrictEqual() ? t.value === 0 ? i.value === 0 ? this._solutions = [{
        tex: this._real,
        display: "RR",
        value: NaN,
        exact: !1
      }] : this._solutions = [{
        tex: this._varnothing,
        display: "O/",
        value: NaN,
        exact: !1
      }] : this._solutions = [{
        tex: s.tex,
        display: s.display,
        value: s.value,
        exact: s
      }] : (t.value === 0 ? i.value === 0 && this.isAlsoEqual() ? (n = "\\mathbb{R}", o = "RR") : i.value > 0 ? (n = this.isGreater() ? this._real : this._varnothing, n = this.isGreater() ? "RR" : "O/") : (n = this.isGreater() ? this._varnothing : this._real, n = this.isGreater() ? "O/" : "RR") : this.isGreater() && t.sign() === 1 || !this.isGreater() && t.sign() === -1 ? (n = `\\left${this.isAlsoEqual() ? "[" : "]"}${s.tex};+\\infty\\right[`, o = `${this.isAlsoEqual() ? "[" : "]"}${s.tex};+oo[`) : (n = `\\left]-\\infty;${s.tex} \\right${this.isAlsoEqual() ? "]" : "["}`, o = `]-oo;${s.tex}${this.isAlsoEqual() ? "]" : "["}`), this._solutions = [{
        tex: n,
        display: o,
        value: NaN,
        exact: !1
      }]), this._solutions;
    });
    r(this, "_solveDegree2", (e) => {
      let t = this._polynom.monomByDegree(2, e).coefficient, i = this._polynom.monomByDegree(1, e).coefficient, s = this._polynom.monomByDegree(0, e).coefficient, n, o, l = x.lcm(t.denominator, i.denominator, s.denominator), a = t.multiply(l).value, f = i.multiply(l).value, m = s.multiply(l).value, d, p, _, q;
      if (n = f * f - 4 * a * m, n > 0)
        if (d = (-f - Math.sqrt(n)) / (2 * a), p = (-f + Math.sqrt(n)) / (2 * a), n > 1e5) {
          let v = ((-f - Math.sqrt(n)) / (2 * a)).toFixed(5), B = ((-f + Math.sqrt(n)) / (2 * a)).toFixed(5);
          this._solutions = [
            {
              tex: v,
              display: v,
              value: d,
              exact: !1
            },
            {
              tex: B,
              display: B,
              value: p,
              exact: !1
            }
          ];
        } else if (o = new J(n).reduce(), o.hasRadical()) {
          let v = x.gcd(f, 2 * a, o.coefficient), B = a / v, S = f / v;
          o.coefficient = o.coefficient / v, a < 0 && (B = -B, S = -S);
          let I = "", Z = "";
          I = `${S !== 0 ? -S + " - " : ""}${o.tex}`, Z = `${S !== 0 ? -S + " + " : ""}${o.tex}`, S !== 0 && -S + "", `${o.display}`, S !== 0 && -S + "", `${o.display}`, B !== 1 && (I = `\\frac{ ${I} }{ ${2 * B} }`, Z = `\\frac{ ${Z} }{ ${2 * B} }`), this._solutions = [
            {
              tex: I,
              display: I,
              value: d,
              exact: !1
            },
            {
              tex: Z,
              display: Z,
              value: p,
              exact: !1
            }
          ];
        } else {
          const v = new h(-f - o.coefficient, 2 * a).reduce(), B = new h(-f + o.coefficient, 2 * a).reduce();
          this._solutions = [
            {
              tex: v.frac,
              display: v.display,
              value: d,
              exact: v
            },
            {
              tex: B.frac,
              display: B.display,
              value: p,
              exact: B
            }
          ];
        }
      else if (n === 0) {
        const v = new h(-f, 2 * a).reduce();
        this._solutions = [{
          tex: v.frac,
          display: v.display,
          value: v.value,
          exact: v
        }];
      } else
        this._solutions = [{
          tex: this._varnothing,
          display: "O/",
          value: NaN,
          exact: !1
        }];
      return this.isStrictEqual() || (this._solutions.length === 2 ? (_ = d < p ? this._solutions[0].tex : this._solutions[1].tex, q = d < p ? this._solutions[1].tex : this._solutions[0].tex, this.isGreater() && t.sign() === 1 || !this.isGreater() && t.sign() === -1 ? this._solutions = [
        {
          tex: `\\left]-\\infty ; ${_}\\right${this.isAlsoEqual() ? "]" : "["} \\cup \\left${this.isAlsoEqual() ? "[" : "]"}${q};+\\infty\\right[`,
          display: `]-oo;${_}${this.isAlsoEqual() ? "]" : "["}uu${this.isAlsoEqual() ? "[" : "]"}${q};+oo[`,
          value: NaN,
          exact: !1
        }
      ] : this._solutions = [{
        tex: `\\left${this.isAlsoEqual() ? "[" : "]"}${_} ; ${q}\\right${this.isAlsoEqual() ? "]" : "["}`,
        display: `${this.isAlsoEqual() ? "[" : "]"}${_};${q}${this.isAlsoEqual() ? "]" : "["}`,
        value: NaN,
        exact: !1
      }]) : this._solutions.length === 1 && this._solutions[0].tex !== this._varnothing ? this.isAlsoEqual() ? (this.isGreater() && t.sign() === 1 || !this.isGreater() && t.sign() === -1) && (this._solutions = [{
        tex: this._real,
        display: "RR",
        value: NaN,
        exact: !1
      }]) : this.isGreater() && t.sign() === 1 || !this.isGreater() && t.sign() === -1 ? this._solutions = [
        {
          tex: `\\left]-\\infty ; ${this._solutions[0].tex}\\right[ \\cup \\left]${this._solutions[0].tex};+\\infty\\right[`,
          display: `]-oo;${this._solutions[0].tex}[uu]${this._solutions[0].tex};+oo[`,
          value: NaN,
          exact: !1
        }
      ] : this._solutions = [{
        tex: this._varnothing,
        display: "O/",
        value: NaN,
        exact: !1
      }] : this.isGreater() ? this._solutions = [{
        tex: t.sign() === 1 ? this._real : this._varnothing,
        display: t.sign() === 1 ? "RR" : "O/",
        value: NaN,
        exact: !1
      }] : this._solutions = [{
        tex: t.sign() === -1 ? this._real : this._varnothing,
        display: t.sign() === -1 ? "RR" : "O/",
        value: NaN,
        exact: !1
      }]), this._solutions;
    });
    r(this, "_solveDegree3plus", (e) => {
      let t = this.clone().moveLeft();
      return t.left.factorize(), this._solutions = [], t.left.factors.forEach((i) => {
        if (i.degree(e).leq(2)) {
          let s = new k(i, 0);
          s.solve(), s.solutions.forEach((n) => {
            this._solutions.push(n);
          });
        } else
          console.log(i.tex, ": cannot actually get the solution of this equation");
      }), this._solutions;
    });
    if (this._left = new u().zero(), this._right = new u().zero(), this._sign = "=", e.length === 1) {
      if (e[0] instanceof k)
        return e[0].clone();
      typeof e[0] == "string" && this.parse(e[0]);
    } else if (e.length === 2)
      e[0] instanceof u ? this.left = e[0].clone() : typeof e[0] == "string" && (this.left = new u(e[0])), e[1] instanceof u ? this.right = e[1].clone() : typeof e[1] == "string" && (this.right = new u(e[1]));
    else
      return this;
    return this;
  }
  // ------------------------------------------
  // Getter and setter
  get left() {
    return this._left;
  }
  set left(e) {
    this._left = e;
  }
  get right() {
    return this._right;
  }
  set right(e) {
    this._right = e;
  }
  get sign() {
    return this._sign;
  }
  set sign(e) {
    this._sign = this._formatSign(e);
  }
  // ------------------------------------------
  get solutions() {
    return this._solutions;
  }
  get isEquation() {
    return !0;
  }
  get solution() {
    return this._solutions.length === 1 && (this._solutions[0].tex === this._real || this._solutions[0].tex === this._varnothing || this._solutions[0].tex.includes("\\left")) ? `S = ${this._solutions[0]}` : `S = \\left{ ${this._solutions.map((e) => e.tex).join(";")} \\right}`;
  }
  get isReal() {
    return this._solutions === void 0 && this.solve(), this._solutions[0].tex === this._real;
  }
  get isVarnothing() {
    return this._solutions === void 0 && this.solve(), this._solutions[0].tex === this._varnothing;
  }
  get signAsTex() {
    return this._sign === ">=" || this._sign === "=>" || this._sign === "geq" ? "\\geq" : this._sign === "<=" || this._sign === "=<" || this._sign === "leq" ? "\\leq" : this._sign;
  }
  get tex() {
    return `${this._left.tex}${this.signAsTex}${this._right.tex}`;
  }
  get display() {
    return `${this._left.display}${this.signAsTex}${this._right.display}`;
  }
  get raw() {
    return `${this._left.raw}${this.signAsTex}${this._right.raw}`;
  }
  get variables() {
    return [...new Set(this._right.variables.concat(this._left.variables))];
  }
  get numberOfVars() {
    return this.variables.length;
  }
  // ------------------------------------------
  // Creation / parsing functions
  get randomizeDefaults() {
    return this._randomizeDefaults;
  }
  set randomizeDefaults(e) {
    this._randomizeDefaults = e;
  }
  static makeSolutionsUnique(e, t) {
    let i = [], s = e.filter((n) => i.includes(n.tex) ? !1 : (i.push(n.tex), !0));
    return t === !0 && s.sort((n, o) => n.value - o.value), s;
  }
}
class u {
  /**
   *
   * @param {string} polynomString (optional) Default polynom to parse on class creation
   * @param values
   */
  constructor(e, ...t) {
    r(this, "_rawString");
    r(this, "_dirty_factors");
    r(this, "_dirty_zeroes");
    r(this, "_euclidianCache");
    r(this, "_factors");
    r(this, "_monoms");
    r(this, "_texString");
    r(this, "_zeroes");
    r(this, "mark_as_dirty", () => {
      this.dirty_factors = !0, this.dirty_zeroes = !0, this.euclidianCache = {};
    });
    r(this, "addToken", (e, t) => {
      switch (t.tokenType) {
        case C.COEFFICIENT:
          e.push(new u(t.token));
          break;
        case C.VARIABLE:
          e.push(new u().add(new g(t.token)));
          break;
        case C.CONSTANT:
          console.log("Actually, not supported - will be added later !");
          break;
        case C.OPERATION:
          if (e.length >= 2) {
            const i = e.pop(), s = e.pop();
            if (t.token === "+")
              e.push(s.add(i));
            else if (t.token === "-")
              e.push(s.subtract(i));
            else if (t.token === "*")
              e.push(s.multiply(i));
            else if (t.token === "/")
              i.degree().isStrictlyPositive() ? console.log("divide by a polynom -> should create a rational polynom !") : e.push(s.divide(i.monoms[0].coefficient));
            else if (t.token === "^")
              if (i.degree().isStrictlyPositive())
                console.error("Cannot elevate a polynom with another polynom !", s.tex, i.tex);
              else if (i.monoms[0].coefficient.isRelative())
                e.push(s.pow(i.monoms[0].coefficient.value));
              else if (s.monoms.length === 1 && s.monoms[0].coefficient.isOne()) {
                for (let n in s.monoms[0].literal)
                  s.monoms[0].literal[n].multiply(i.monoms[0].coefficient);
                e.push(s);
              } else
                console.error("Cannot have power with fraction");
          } else if (t.token === "-")
            e.push(e.pop().opposed());
          else
            throw "Error parsing the polynom " + this._rawString;
          break;
        case C.MONOM:
          console.error("The monom token should not appear here");
          break;
        case C.FUNCTION:
          console.error("The function token should not appear here - might be introduced later.");
          break;
      }
    });
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values: as string, numbers or fractions
     */
    r(this, "parse", (e, ...t) => {
      if (this._monoms = [], this._factors = [], this.mark_as_dirty(), typeof e == "string")
        return this._parseString(e, ...t);
      if ((typeof e == "number" || e instanceof h || e instanceof g) && (t === void 0 || t.length === 0))
        this._monoms.push(new g(e));
      else if (e instanceof g && t.length > 0)
        this._monoms.push(new g(e)), t.forEach((i) => {
          this._monoms.push(new g(i));
        });
      else if (e instanceof u)
        for (const i of e.monoms)
          this._monoms.push(i.clone());
      return this;
    });
    /**
     * Clone the polynom
     */
    r(this, "clone", () => {
      const e = new u(), t = [];
      for (const i of this._monoms)
        t.push(i.clone());
      return e.monoms = t, e;
    });
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    r(this, "zero", () => (this._monoms = [], this._monoms.push(new g().zero()), this._rawString = "0", this.mark_as_dirty(), this));
    r(this, "one", () => (this._monoms = [], this._monoms.push(new g().one()), this._rawString = "1", this.mark_as_dirty(), this));
    r(this, "empty", () => (this._monoms = [], this._rawString = "", this.mark_as_dirty(), this));
    // ------------------------------------------
    r(this, "opposed", () => (this._monoms = this._monoms.map((e) => e.opposed()), this.mark_as_dirty(), this));
    // ------------------------------------------
    // Mathematical operations
    r(this, "add", (...e) => {
      this.mark_as_dirty();
      for (let t of e)
        t instanceof u ? this._monoms = this._monoms.concat(t.monoms) : t instanceof g ? this._monoms.push(t.clone()) : Number.isSafeInteger(t) ? this._monoms.push(new g(t.toString())) : this._monoms.push(new g(t));
      return this.reduce();
    });
    r(this, "subtract", (...e) => {
      this.mark_as_dirty();
      for (let t of e)
        t instanceof u ? this._monoms = this._monoms.concat(t.clone().opposed().monoms) : t instanceof g ? this._monoms.push(t.clone().opposed()) : Number.isSafeInteger(t) ? this._monoms.push(new g(t.toString()).opposed()) : this._monoms.push(new g(t).opposed());
      return this.reduce();
    });
    r(this, "multiply", (e) => (this.mark_as_dirty(), e instanceof u ? this.multiplyByPolynom(e) : e instanceof h ? this.multiplyByFraction(e) : e instanceof g ? this.multiplyByMonom(e) : Number.isSafeInteger(e) && typeof e == "number" ? this.multiplyByInteger(e) : this));
    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    r(this, "euclidian", (e) => {
      if (this.euclidianCache[e.tex] !== void 0)
        return this.euclidianCache[e.tex];
      const t = e.variables[0], i = new u().zero(), s = this.clone().reorder(t);
      if (e.variables.length === 0)
        return this.clone().divide(e), {
          quotient: this.clone().divide(e).reduce(),
          reminder: new u().zero()
        };
      const n = e.monomByDegree(void 0, t), o = e.degree(t);
      let l, a = this.degree(t).value * 2;
      for (; s.degree(t).geq(o) && a > 0 && (a--, l = s.monomByDegree(void 0, t).clone().divide(n), !(!l.isZero() && (i.add(l), s.subtract(e.clone().multiply(l)).reduce(), l.degree(t).isZero()))); )
        ;
      return i.reduce(), s.reduce(), { quotient: i, reminder: s };
    });
    r(this, "divide", (e) => {
      if (this.mark_as_dirty(), e instanceof h)
        return this.divideByFraction(e);
      if (typeof e == "number" && Number.isSafeInteger(e))
        return this.divideByInteger(e);
      if (e instanceof g)
        return this.divide(new u(e));
      if (e instanceof u) {
        if (e.monoms.length === 1 && e.variables.length === 0)
          return this.divideByFraction(e.monoms[0].coefficient);
        {
          let { quotient: t, reminder: i } = this.euclidian(e);
          return i.isZero() ? t : (console.log(`${this.tex} is not divideable by ${e.tex}`), new u().zero());
        }
      }
    });
    r(this, "pow", (e) => {
      if (this.mark_as_dirty(), !Number.isSafeInteger(e))
        return this.zero();
      if (e < 0)
        return this.zero();
      if (e === 0)
        return new u();
      const t = this.clone();
      for (let i = 1; i < e; i++)
        this.multiply(t);
      return this.reduce();
    });
    // ------------------------------------------
    /**
     * Compare the current coefficient with another coefficient
     * @param P
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    r(this, "compare", (e, t) => {
      t === void 0 && (t = "=");
      const i = this.clone().reduce().reorder(), s = e.clone().reduce().reorder();
      switch (t) {
        case "=":
          if (i.length !== s.length || i.degree().isNotEqual(s.degree()))
            return !1;
          for (const n in i.monoms)
            if (!i.monoms[n].isEqual(s.monoms[n]))
              return !1;
          return !0;
        case "same":
          if (i.length !== s.length || i.degree() !== s.degree())
            return !1;
          for (const n in i.monoms)
            if (!i.monoms[n].isSameAs(s.monoms[n]))
              return !1;
          return !0;
        default:
          return !1;
      }
    });
    r(this, "isEqual", (e) => this.compare(e, "="));
    r(this, "isSameAs", (e) => this.compare(e, "same"));
    r(this, "isOpposedAt", (e) => this.compare(e.clone().opposed(), "="));
    r(this, "isFactorized", (e, t) => {
      let i;
      if (e.split("(").length !== e.split(")").length)
        return !1;
      try {
        i = new u(e);
      } catch {
        return !1;
      }
      if (!this.isEqual(i))
        return !1;
      let s = e.replaceAll("*", ""), n = "" + s, o = [];
      for (let d of s.matchAll(/\(([a-z0-9+\-]+)\)(\^[0-9]*)?/g)) {
        if (d[2] !== void 0)
          for (let p = 0; p < +d[2].substring(1); p++)
            o.push(d[1]);
        else
          o.push(d[1]);
        n = n.replaceAll(d[0], "");
      }
      n !== "" && o.push(n);
      let l = o.map((d) => new u(d)), a = l.filter((d) => d.degree().geq(1) && !d.commonMonom().isOne());
      if (a.length > 0 && !t)
        return !1;
      if (a.length > 0 && t) {
        l = l.filter((p) => p.commonMonom().isOne());
        let d = new h().one();
        for (let p of a) {
          let _ = p.commonMonom(), q = p.clone().divide(_);
          _.degree().isZero() && (d.multiply(_.coefficient), l.push(q.clone()));
        }
      }
      this.factorize();
      let f = 1, m = [];
      for (let d of this.factors) {
        d.degree().isZero() && d.monoms[0].coefficient.isNegativeOne() && (f = -f);
        let p = !1;
        for (let _ = 0; _ < l.length; _++)
          if (d.isEqual(l[_])) {
            l.splice(_, 1), p = !0;
            break;
          } else if (d.isOpposedAt(l[_])) {
            l.splice(_, 1), f = -f, p = !0;
            break;
          }
        p || m.push(d.clone());
      }
      return l.length === 0 && f === 1;
    });
    // ------------------------------------------
    // Compare functions
    r(this, "isReduced", (e) => {
      if (!this.isDeveloped(e))
        return !1;
      let t = new u(e);
      if (t.monoms.length > this.monoms.length)
        return !1;
      for (let i of t.monoms)
        if (!i.coefficient.isReduced())
          return !1;
      return !1;
    });
    r(this, "isDeveloped", (e) => {
      let t, i = e.replaceAll(/\^\(([-0-9/]+)\)/g, "$1");
      if (i.includes("(") || i.includes(")"))
        return !1;
      try {
        t = new u(e);
      } catch {
        return !1;
      }
      return !!this.isEqual(t);
    });
    // -------------------------------------
    r(this, "reduce", () => {
      this._monoms.map((t) => t.clone()), [...this.variables];
      let e = 0;
      for (; e < this._monoms.length; ) {
        for (let t = e + 1; t < this._monoms.length; t++)
          this._monoms[e].isSameAs(this._monoms[t]) && (this._monoms[e].add(this._monoms[t]), this._monoms.splice(t, 1), this._monoms[e].isZero() && (this._monoms[e] = new g().zero()), t--);
        e++;
      }
      this._monoms = this._monoms.filter((t) => t.coefficient.value !== 0);
      for (const t of this._monoms)
        t.coefficient.reduce();
      return this.length === 0 ? new u().zero() : this.reorder();
    });
    r(this, "reorder", (e = "x", t) => {
      t === void 0 && (t = !1);
      let i = this.variables.filter((s) => s !== e);
      return this._monoms.sort(function(s, n) {
        let o = s.degree(e).value, l = n.degree(e).value;
        if (o !== l)
          return t ? o - l : l - o;
        if (i.length > 0)
          for (let a of i) {
            let f = s.degree(a).value, m = n.degree(a).value;
            if (f !== m)
              return t ? f - m : m - f;
          }
        return 0;
      }), this;
    });
    r(this, "degree", (e) => {
      let t = new h().zero();
      for (const i of this._monoms)
        t = h.max(i.degree(e).value, t);
      return t;
    });
    r(this, "letters", () => {
      let e = /* @__PURE__ */ new Set();
      for (let t of this._monoms)
        e = /* @__PURE__ */ new Set([...e, ...t.variables]);
      return [...e];
    });
    /**
     * Replace a variable (letter) by a polynom.
     * @param letter
     * @param P
     */
    r(this, "replaceBy", (e, t) => {
      this.mark_as_dirty();
      let i;
      const s = new u().zero();
      for (const n of this.monoms)
        n.literal[e] === void 0 || n.literal[e].isZero() ? s.add(n.clone()) : (i = n.literal[e].clone(), delete n.literal[e], s.add(t.clone().pow(Math.abs(i.numerator)).multiply(n)));
      return this._monoms = s.reduce().reorder().monoms, this;
    });
    // Evaluate a polynom.
    r(this, "evaluate", (e) => {
      const t = new h().zero();
      return this._monoms.forEach((i) => {
        t.add(i.evaluate(e));
      }), t;
    });
    r(this, "evaluateAsNumeric", (e) => {
      let t = 0;
      return this._monoms.forEach((i) => {
        t += i.evaluateAsNumeric(e);
      }), t;
    });
    r(this, "derivative", (e) => {
      let t = new u();
      for (let i of this._monoms)
        t.add(i.derivative(e));
      return t;
    });
    // ------------------------------------------
    // Misc polynoms functions
    r(this, "primitive", (e) => {
      let t = new u();
      for (let i of this._monoms)
        t.add(i.primitive(e));
      return t;
    });
    r(this, "integrate", (e, t, i) => {
      const s = this.primitive(i);
      i === void 0 && (i = "x");
      let n = {}, o = {};
      return n[i] = new h(e), o[i] = new h(t), s.evaluate(o).subtract(s.evaluate(n));
    });
    // -------------------------------------
    /**
     * Factorize a polynom and store the best results in factors.
     * @param maxValue Defines the greatest value to search to (default is 20).
     */
    r(this, "factorize", (e) => {
      if (!this.dirty_factors)
        return this._factors;
      let t = [], i = this.clone().reorder(), s = i.commonMonom();
      if (i.monomByDegree().coefficient.isStrictlyNegative() && s.coefficient.isStrictlyPositive() && !s.isOne() && s.opposed(), !s.isOne()) {
        let l = new u(s);
        t = [l.clone()], i = i.euclidian(l).quotient;
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
          let l = this._getAllPotentialFactors(i, o, e);
          for (o = i.degree(e).value; l.length > 0; ) {
            let a = l[0];
            if (!i.isDividableBy(a))
              l.shift();
            else {
              let f = i.euclidian(a);
              t.push(a), i = f.quotient.clone(), l = l.filter((m) => {
                let d = i.monoms[0], p = i.monoms[i.monoms.length - 1], _ = m.monoms[0], q = m.monoms[m.monoms.length - 1];
                return p.isDivisible(q) ? d.isDivisible(_) : !1;
              });
            }
          }
        }
      return i.isOne() || t.push(i.clone()), this._factors = t, this.dirty_factors = !1, this._factors;
    });
    r(this, "isDividableBy", (e) => {
      if (e.degree().isOne()) {
        let t = e.getZeroes()[0];
        return t.exact instanceof h ? this.evaluate(t.exact).isZero() : !1;
      } else
        return this.euclidianCache[e.tex] = this.euclidian(e), this.euclidianCache[e.tex].reminder.isZero();
    });
    // TODO: get zeroes for more than first degree and for more than natural degrees
    r(this, "getZeroes", () => {
      if (this.dirty_zeroes) {
        let e = new k(this.clone(), 0);
        e.solve(), this._zeroes = e.solutions, this.dirty_zeroes = !1;
      }
      return this._zeroes;
    });
    // TODO: analyse the next functions to determine if they are useful or not...
    r(this, "monomByDegree", (e, t) => {
      if (e === void 0)
        return this.monomByDegree(this.degree(t), t);
      const i = this.clone().reduce();
      for (const s of i._monoms)
        if (s.degree(t).isEqual(e))
          return s.clone();
      return new g().zero();
    });
    r(this, "monomsByDegree", (e, t) => {
      if (e === void 0)
        return this.monomsByDegree(this.degree(t));
      let i = [];
      const s = this.clone().reduce();
      for (const n of s._monoms)
        n.degree(t) === e && i.push(n.clone());
      return i;
    });
    // Used in LinearSystem.tex
    r(this, "monomByLetter", (e) => {
      const t = this.clone().reduce();
      for (const i of t._monoms)
        if (i.hasLetter(e))
          return i.clone();
      return new g().zero();
    });
    // Next functions are used for for commonMonom, which is used in the factorize method.
    r(this, "getDenominators", () => {
      const e = [];
      for (const t of this._monoms)
        e.push(t.coefficient.denominator);
      return e;
    });
    r(this, "getNumerators", () => {
      const e = [];
      for (const t of this._monoms)
        e.push(t.coefficient.numerator);
      return e;
    });
    r(this, "lcmDenominator", () => x.lcm(...this.getDenominators()));
    // ------------------------------------------
    // Polynoms factorization functions
    r(this, "gcdDenominator", () => x.gcd(...this.getDenominators()));
    r(this, "lcmNumerator", () => x.lcm(...this.getNumerators()));
    r(this, "gcdNumerator", () => x.gcd(...this.getNumerators()));
    // ------------------------------------------
    // Polynoms helpers functions
    // -------------------------------------
    r(this, "commonMonom", () => {
      let e = new g().one(), t, i, s = this.degree();
      t = this.gcdNumerator(), i = this.gcdDenominator(), e.coefficient = new h(t, i);
      for (let n of this.variables) {
        e.setLetter(n, s);
        for (let o of this._monoms)
          if (e.setLetter(n, h.min(o.degree(n), e.degree(n))), e.degree(n).isZero())
            break;
      }
      return e;
    });
    r(this, "limitToInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), i = t.coefficient.sign(), s = t.degree(e);
      return s.isStrictlyPositive() ? i === 1 ? new h().infinite() : new h().infinite().opposed() : s.isZero() ? t.coefficient : new h().zero();
    });
    r(this, "limitToNegativeInfinity", (e) => {
      const t = this.monomByDegree(void 0, e), i = t.coefficient.sign(), s = t.degree(e);
      return s.isStrictlyPositive() ? i === -1 ? new h().infinite() : new h().infinite().opposed() : s.isZero() ? t.coefficient : new h().zero();
    });
    r(this, "_getAllPotentialFactors", (e, t, i) => {
      let s = e.monoms[0].dividers, n = e.monoms[e.monoms.length - 1].dividers, o = [];
      return s.forEach((l) => {
        l.degree(i).leq(t) && n.forEach((a) => {
          l.degree(i).isNotEqual(a.degree(i)) && (o.push(new u(l, a)), o.push(new u(l, a.clone().opposed())));
        });
      }), o;
    });
    r(this, "genDisplay", (e, t, i, s) => {
      let n = "";
      for (const o of this._monoms) {
        if (o.coefficient.value === 0)
          continue;
        let l;
        s ? l = o.plotFunction : l = e === "tex" ? o.tex : o.display, n += `${o.coefficient.sign() === 1 && (n !== "" || t === !0) ? "+" : ""}${l}`;
      }
      return i === !0 && this.length > 1 && (e === "tex" ? n = `\\left( ${n} \\right)` : n = `(${n})`), n === "" && (n = "0"), n;
    });
    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    r(this, "shutingYardToReducedPolynom", (e) => {
      const i = new P().parse(e).rpn;
      this.zero();
      let s = [];
      new g();
      for (const n of i)
        this.addToken(s, n);
      return s.length === 1 && this.add(s[0]), this.reorder();
    });
    r(this, "multiplyByPolynom", (e) => {
      const t = [];
      for (const i of this._monoms)
        for (const s of e.monoms)
          t.push(g.xmultiply(i, s));
      return this._monoms = t, this.reduce();
    });
    r(this, "multiplyByFraction", (e) => {
      for (const t of this._monoms)
        t.coefficient.multiply(e);
      return this.reduce();
    });
    r(this, "multiplyByInteger", (e) => this.multiplyByFraction(new h(e)));
    r(this, "multiplyByMonom", (e) => {
      for (const t of this._monoms)
        t.multiply(e);
      return this.reduce();
    });
    r(this, "divideByInteger", (e) => {
      const t = new h(e);
      for (const i of this._monoms)
        i.coefficient.divide(t);
      return this;
    });
    r(this, "divideByFraction", (e) => {
      for (const t of this._monoms)
        t.coefficient.divide(e);
      return this;
    });
    r(this, "_factorize2ndDegree", (e) => {
      let t, i, s, n, o, l, a, f, m;
      if (this.numberOfVars === 1)
        return s = this.monomByDegree(2, e).coefficient, n = this.monomByDegree(1, e).coefficient, o = this.monomByDegree(0, e).coefficient, l = n.clone().pow(2).subtract(s.clone().multiply(o).multiply(4)), l.isZero() ? (a = n.clone().opposed().divide(s.clone().multiply(2)), t = new u(e).subtract(a.display).multiply(a.denominator), i = new u(e).subtract(a.display).multiply(a.denominator), m = s.divide(a.denominator).divide(a.denominator), m.isOne() ? [t, i] : [new u(m.display), t, i]) : l.isPositive() && l.isSquare() ? (a = n.clone().opposed().add(l.clone().sqrt()).divide(s.clone().multiply(2)), f = n.clone().opposed().subtract(l.clone().sqrt()).divide(s.clone().multiply(2)), m = s.divide(a.denominator).divide(f.denominator), m.isOne() ? [
          new u(e).subtract(a.display).multiply(a.denominator),
          new u(e).subtract(f.display).multiply(f.denominator)
        ] : [
          new u(m.display),
          new u(e).subtract(a.display).multiply(a.denominator),
          new u(e).subtract(f.display).multiply(f.denominator)
        ]) : [this.clone()];
      if (s = this.monomByDegree(2, e), n = this.monomByDegree(1, e), o = this.monomByDegree(0, e), s.isLiteralSquare() && o.isLiteralSquare() && n.clone().pow(2).isSameAs(s.clone().multiply(o))) {
        let p = new u("x", s.coefficient, n.coefficient, o.coefficient)._factorize2ndDegree("x"), _ = [], q;
        if (p.length >= 2) {
          for (let v of p)
            v.degree().isZero() ? _.push(v.clone()) : (q = v.clone(), q.monoms[0].literal = s.literalSqrt, q.monoms[1].literal = o.literalSqrt, _.push(q.clone()));
          return _;
        }
      }
      return [this.clone()];
    });
    r(this, "_factorizeByGroups", () => []);
    return this._monoms = [], this._factors = [], this.mark_as_dirty(), e !== void 0 && this.parse(e, ...t), this;
  }
  // ------------------------------------------
  get dirty_factors() {
    return this._dirty_factors;
  }
  set dirty_factors(e) {
    this._dirty_factors = e;
  }
  get dirty_zeroes() {
    return this._dirty_zeroes;
  }
  set dirty_zeroes(e) {
    this._dirty_zeroes = e;
  }
  get euclidianCache() {
    return this._euclidianCache;
  }
  set euclidianCache(e) {
    this._euclidianCache = e;
  }
  get factors() {
    return this.factorize();
  }
  set factors(e) {
    this.mark_as_dirty(), this._factors = e;
  }
  // ------------------------------------------
  get monoms() {
    return this._monoms;
  }
  set monoms(e) {
    this._monoms = e;
  }
  get texString() {
    return this._texString;
  }
  get zeroes() {
    return this.getZeroes();
  }
  get texFactors() {
    if (this.factorize(), this.factors.length <= 1)
      return this.tex;
    let e = {};
    for (let s of this.factors)
      e[s.tex] !== void 0 ? e[s.tex].degree++ : e[s.tex] = {
        degree: 1,
        factor: s
      };
    let t = new u().one();
    for (let s of Object.values(e).filter((n) => n.factor.monoms.length === 1))
      t.multiply(s.factor);
    let i = t.isOne() ? "" : t.tex;
    for (let s of Object.values(e).filter((n) => n.factor.monoms.length > 1))
      s.factor.length > 1 && (i += `\\left( ${s.factor.tex} \\right)${s.degree > 1 ? "^{ " + s.degree + " }" : ""}`);
    return i;
  }
  get displayFactors() {
    if (this.factorize(), this.factors.length <= 1)
      return this.display;
    let e = {};
    for (let s of this.factors)
      e[s.display] !== void 0 ? e[s.display].degree++ : e[s.display] = {
        degree: 1,
        factor: s
      };
    let t = new u().one();
    for (let s of Object.values(e).filter((n) => n.factor.monoms.length === 1))
      t.multiply(s.factor);
    let i = t.isOne() ? "" : t.display;
    for (let s of Object.values(e).filter((n) => n.factor.monoms.length > 1))
      s.factor.length > 1 && (i += `(${s.factor.display})${s.degree > 1 ? "^(" + s.degree + ")" : ""}`);
    return i;
  }
  get length() {
    return this._monoms.length;
  }
  get display() {
    return this.genDisplay();
  }
  get raw() {
    return this._rawString;
  }
  get tex() {
    return this.genDisplay("tex");
  }
  get isMultiVariable() {
    for (const t of this._monoms)
      if (t.variables.length > 1)
        return !0;
    return !1;
  }
  get variables() {
    let e = [];
    for (const t of this._monoms)
      e = e.concat(t.variables);
    return e = [...new Set(e)], e.sort(), e;
  }
  get numberOfVars() {
    return this.variables.length;
  }
  get plotFunction() {
    return this.genDisplay("tex", !1, !1, !0);
  }
  isZero() {
    return this._monoms.length === 1 && this._monoms[0].coefficient.isZero() || this._monoms.length === 0;
  }
  isOne() {
    return this._monoms.length === 1 && this._monoms[0].coefficient.isOne();
  }
  _parseString(e, ...t) {
    if (t === void 0 || t.length === 0) {
      if (e = "" + e, this._rawString = e.trim().replaceAll(" ", ""), e !== "" && !isNaN(Number(e))) {
        this.empty();
        let i = new g(e);
        return this.add(i), this;
      }
      return this.shutingYardToReducedPolynom(e);
    } else if (/^[a-z]/.test(e)) {
      this.empty();
      let i = t.map((s) => new h(s));
      if (e.length > 1) {
        let s = e.split(""), n = 0;
        for (let o of i) {
          let l = new g();
          l.coefficient = o.clone(), l.literalStr = s[n] || "", this.add(l), n++;
        }
      } else {
        let s = i.length - 1;
        for (let n of i) {
          let o = new g();
          o.coefficient = n.clone(), o.literalStr = `${e}^${s}`, this.add(o), s--;
        }
      }
      return this;
    } else
      return this.zero();
  }
}
class se extends D {
  constructor(t) {
    super();
    r(this, "generate", () => {
      if (this._config.factorable && this._config.degree > 1)
        return this.factorable();
      let t = new u().empty(), i;
      for (let s = this._config.degree; s >= 0; s--)
        i = new Q({
          letters: this._config.letters,
          degree: s,
          fraction: this._config.fraction,
          zero: s === this._config.degree ? !1 : this._config.allowNullMonom
        }).generate(), this._config.unit && this._config.degree === s && i.coefficient.one(), t.add(i);
      if (this._config.positive && t.monomByDegree().coefficient.isNegative() && t.monomByDegree().coefficient.opposed(), this._config.numberOfMonoms > 0 && this._config.numberOfMonoms < t.length) {
        let s = t.monomByDegree().clone();
        t.monoms = w.array(t.monoms.slice(1), this._config.numberOfMonoms - 1), t.add(s).reorder().reduce();
      }
      return t;
    });
    r(this, "factorable", () => {
      let t = new u().one(), i = { ...this._config };
      i.degree = 1, i.factorable = !1;
      for (let s = 0; s < this._config.degree; s++)
        t.multiply(w.polynom(i));
      return t;
    });
    this._defaultConfig = {
      letters: "x",
      degree: 2,
      fraction: !1,
      zero: !1,
      unit: !1,
      factorable: !1,
      allowNullMonom: !0,
      numberOfMonoms: 0,
      positive: !0
    }, this._config = this.mergeConfig(t, this._defaultConfig);
  }
}
class T {
  /**
   * Random boolean with a percent ratio
   * @param percent
   */
  static randomBool(e = 0.5) {
    return Math.random() < e;
  }
  /**
   * Random integer between two values.
   * @param a (number) : From this value to the second value. If the second is ommited, this value is the max value.
   * @param b (number) : To this value. If this is ommited.
   */
  static randomInt(e, t, i) {
    if (t === void 0)
      return e >= 0 ? this.randomInt(0, e) : this.randomInt(e, 0);
    if (e === t)
      return e;
    if (i === void 0)
      return Math.floor(Math.random() * (t - e + 1) + e);
    if (Math.abs(t - e) <= i.length)
      throw new Error("The number of excluded values is too high.");
    let s = this.randomInt(e, t);
    for (; i.includes(s); )
      s = this.randomInt(e, t);
    return s;
  }
  /**
   * Random integer between -max and max value.
   * @param max (number) : determine the limits.
   * @param zero (bool) : determine if zero is allowed or not.
   */
  static randomIntSym(e, t) {
    return t === !1 ? this.randomBool() ? this.randomInt(1, e) : -this.randomInt(1, e) : this.randomInt(-e, e);
  }
  static randomPrime(e) {
    let t = x.primes();
    return e !== void 0 && (t = t.filter((i) => i < e)), this.randomItem(t);
  }
  static randomArray(e, t) {
    return t === void 0 && (t = 1), e.length <= 0 ? Object.values(e) : T.shuffleArray(e).slice(0, t);
  }
  static randomItem(e) {
    return e.length === 0 ? "" : e[this.randomInt(0, e.length - 1)];
  }
  static shuffleArray(e) {
    let t = Object.values(e);
    for (let i = t.length - 1; i > 0; i--) {
      const s = Math.floor(Math.random() * (i + 1)), n = t[i];
      t[i] = t[s], t[s] = n;
    }
    return t;
  }
}
class re extends D {
  constructor(t) {
    super();
    r(this, "generate", () => {
      let t = new h();
      if (this._config.negative ? t.numerator = w.numberSym(this._config.max, this._config.zero) : t.numerator = w.number(this._config.zero ? 0 : 1, this._config.max), this._config.natural)
        t.denominator = 1;
      else {
        let i = 0;
        for (; t.isRelative() && i < 10; )
          t.denominator = w.number(1, this._config.max), i++;
      }
      return this._config.reduced ? t.reduce() : t;
    });
    this._defaultConfig = {
      negative: !0,
      max: 10,
      reduced: !0,
      zero: !0,
      natural: !1
    }, this._config = this.mergeConfig(t, this._defaultConfig);
  }
}
class ne {
  constructor() {
    r(this, "x");
    r(this, "y");
  }
}
const V = class V {
  constructor(...e) {
    r(this, "_x");
    // 1st component
    r(this, "_y");
    // 2nd component
    r(this, "_exist");
    // ------------------------------------------
    r(this, "parse", (...e) => {
      if (this.zero(), e.length === 0)
        return this;
      if (e.length === 1) {
        if (e[0] instanceof V)
          return this._x = e[0].x.clone(), this._y = e[0].y.clone(), this;
        if (typeof e[0] == "string") {
          let t = e[0].split(",");
          if (t.length === 2)
            return this._x = new h(t[0]).reduce(), this._y = new h(t[1]).reduce(), this;
        }
        return e[0] instanceof ne ? (this._x = new h(e[0].x).reduce(), this._y = new h(e[0].y).reduce(), this) : this.zero();
      }
      return e.length === 2 ? (this._x = new h(e[0]).reduce(), this._y = new h(e[1]).reduce(), this) : this;
    });
    r(this, "clone", () => (this._x = this._x.clone(), this._y = this._y.clone(), this));
    r(this, "zero", () => (this._x = new h(null), this._y = new h(null), this));
    r(this, "origin", () => (this.zero(), this));
    // ------------------------------------------
    // Display functions
    r(this, "middleOf", (e, t) => (this._x = e.x.clone().add(t.x).divide(2), this._y = e.y.clone().add(t.y).divide(2), this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    // ------------------------------------------
    // Vector functions
    // ------------------------------------------
    // ------------------------------------------
    // Static functions
    r(this, "translate", (e) => (this._x = this._x.add(e.x), this._y = this._y.add(e.y), this));
    // ------------------------------------------
    r(this, "texValues", (e) => {
      let t = [];
      return t.push(this._x.value.toFixed(e === void 0 ? 2 : e)), t.push(this._y.value.toFixed(e === void 0 ? 2 : e)), `\\left(${t.join(";")}\\right)`;
    });
    r(this, "distanceTo", (e) => {
      let t = 0, i = new h(), s = "";
      if (e instanceof A)
        return e.distanceTo(this);
      if (e instanceof V) {
        let n = new N(this, e);
        t = n.norm, i = n.normSquare.sqrt(), s = n.normSquare.isSquare() ? i.tex : `\\sqrt{\\frac{ ${n.normSquare.numerator} }{ ${n.normSquare.denominator} }}`;
      }
      return { value: t, fraction: i, tex: s };
    });
    r(this, "isInListOfPoints", (e) => e.map((i) => i.key).includes(this.key));
    r(this, "isEqual", (e) => this.x.isEqual(e.x) && this.y.isEqual(e.y));
    return this._x = new h().zero(), this._y = new h().zero(), e !== void 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e;
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e;
  }
  get tex() {
    let e = [];
    return e.push(this._x.tex), e.push(this._y.tex), `\\left(${e.join(";")}\\right)`;
  }
  get display() {
    let e = [];
    return e.push(this._x.tex), e.push(this._y.tex), `(${e.join(";")})`;
  }
  get asVector() {
    return new N(this.x, this.y);
  }
  // ------------------------------------------
  // Creation / parsing functions
  get key() {
    return `${this.x.display};${this.y.display}`;
  }
};
// ------------------------------------------
r(V, "pmatrix", (e, t, i) => i === void 0 ? `\\begin{pmatrix} ${e.tex ? e.tex : e} \\\\ ${t.tex ? t.tex : t} \\end{pmatrix}` : `\\begin{pmatrix} ${e.tex ? e.tex : e} \\\\ ${t.tex ? t.tex : t} \\\\ ${i.tex ? i.tex : i} \\end{pmatrix}`);
let y = V;
const O = class O {
  // 2nd component
  constructor(...e) {
    r(this, "_x");
    // 1st component
    r(this, "_y");
    r(this, "parse", (...e) => {
      if (this.zero(), e.length === 0)
        return this;
      if (e.length === 1)
        return e[0] instanceof O ? e[0].clone() : this._parseString(e[0]);
      if (e.length >= 2) {
        if (e[0] instanceof y && e[1] instanceof y)
          return this._x = e[1].x.clone().subtract(e[0].x), this._y = e[1].y.clone().subtract(e[0].y), this;
        (e[0] instanceof h || !isNaN(e[0])) && (this._x = new h(e[0])), (e[1] instanceof h || !isNaN(e[1])) && (this._y = new h(e[1])), typeof e[0] == "object" && !isNaN(e[0].x) && !isNaN(e[0].x) && typeof e[1] == "object" && !isNaN(e[1].x) && !isNaN(e[1].x) && (this._x = new h(+e[1].x - e[0].x), this._y = new h(+e[1].y - e[0].y));
      }
      return this;
    });
    r(this, "clone", () => {
      let e = new O();
      return this._x !== null && (e.x = this._x.clone()), this._y !== null && (e.y = this._y.clone()), e;
    });
    r(this, "reset", () => (this._x = null, this._y = null, this));
    // ------------------------------------------
    // Mathematical operations
    r(this, "zero", () => (this.reset(), this._x = new h(null), this._y = new h(null), this));
    r(this, "one", () => (this._x = new h(), this._y = new h(), this));
    // ------------------------------------------
    r(this, "opposed", () => (this._x.opposed(), this._y.opposed(), this));
    r(this, "add", (e) => (this._x.add(e.x), this._y.add(e.y), this));
    r(this, "subtract", (e) => this.add(e.clone().opposed()));
    r(this, "scalarProductWithVector", (e) => O.scalarProduct(this, e));
    r(this, "determinantWithVector", (e) => O.determinant(this, e));
    r(this, "normal", () => {
      let e = this.x.clone().opposed(), t = this.y.clone();
      return this._x = t, this._y = e, this;
    });
    r(this, "isColinearTo", (e) => this.determinantWithVector(e).isZero());
    r(this, "isNormalTo", (e) => this.scalarProductWithVector(e).isZero());
    r(this, "multiplyByScalar", (e) => {
      let t = new h(e);
      return this._x.multiply(t), this._y.multiply(t), this;
    });
    r(this, "divideByScalar", (e) => this.multiplyByScalar(new h(e).invert()));
    r(this, "simplify", () => this.multiplyByScalar(x.lcm(this._x.denominator, this._y.denominator)).divideByScalar(x.gcd(this._x.numerator, this._y.numerator)));
    // ------------------------------------------
    // Vector functions
    // ------------------------------------------
    r(this, "simplifyDirection", () => {
      let e = x.lcm(this.x.denominator, this.y.denominator), t = x.gcd(this.x.numerator, this.y.numerator);
      return this.x.multiply(e).divide(t), this.y.multiply(e).divide(t), this;
    });
    r(this, "angleWith", (e, t, i) => {
      let s = this.scalarProductWithVector(e).value, n = i ? 1 : 180 / Math.PI;
      return t && (s = Math.abs(s)), n * Math.acos(s / (this.norm * e.norm));
    });
    r(this, "_parseString", (e) => {
      let t = e.split(/[,;\s]/g);
      return this.x = new h(t[0] || null), this.y = new h(t[1] || null), this;
    });
    this._x = new h().zero(), this._y = new h().zero(), e !== void 0 && this.parse(...e);
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = new h(e);
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = new h(e);
  }
  get normSquare() {
    return this._x.clone().pow(2).add(this._y.clone().pow(2));
  }
  get norm() {
    return Math.sqrt(this.normSquare.value);
  }
  get tex() {
    return `\\begin{pmatrix}${this._x.tex} \\\\ ${this._y.tex} \\end{pmatrix}`;
  }
  get asPoint() {
    return new y(this.x, this.y);
  }
  // ------------------------------------------
  // Creation / parsing functions
  // ------------------------------------------
  get isNull() {
    return this.x.isZero() && this.y.isZero();
  }
};
r(O, "scalarProduct", (e, t) => e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y))), r(O, "determinant", (e, t) => e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)));
let N = O;
var ee = /* @__PURE__ */ ((c) => (c[c.None = 0] = "None", c.Parallel = "parallel", c.Perpendicular = "perpendicular", c.Tangent = "tangent", c))(ee || {});
const z = class z {
  /**
   * Value can be a mix of:
   *
   * @param values
   */
  constructor(...e) {
    r(this, "_referencePropriety");
    r(this, "_referenceLine");
    r(this, "_reduceBeforeDisplay");
    // ax + by + c = 0
    r(this, "_a");
    r(this, "_b");
    r(this, "_c");
    r(this, "_OA");
    r(this, "_d");
    r(this, "_n");
    r(this, "_exists");
    r(this, "randomPoint", (e) => this._d.clone().multiplyByScalar(w.numberSym(e === void 0 || e <= 1 ? 3 : e, !1)).add(this._OA.asVector).asPoint);
    r(this, "randomNearPoint", (e) => {
      let t = this.randomPoint(e), i = 10;
      for (; this.isOnLine(t) && i > 0; )
        t.x.add(w.numberSym(1, !1)), t.y.add(w.numberSym(1, !1)), i--;
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
      if (this._exists = !1, e.length === 0)
        return this;
      if (e.length === 1) {
        if (e[0] instanceof z)
          return e[0].clone();
        if (e[0] instanceof k)
          return this.parseEquation(e[0]);
        if (typeof e[0] == "string")
          try {
            let t = new k(e[0]);
            return this.parse(t);
          } catch {
            return this;
          }
      }
      if (e.length === 2) {
        if (e[0] instanceof y && e[1] instanceof N)
          return this.parseByPointAndVector(e[0], e[1]);
        if (e[0] instanceof y && e[1] instanceof y)
          return this.parseByPointAndVector(e[0], new N(e[0], e[1]));
        if (e[0] instanceof N && e[1] instanceof y)
          return this.parseByPointAndNormal(e[1], e[0]);
      }
      if (e.length === 3) {
        if ((e[0] instanceof h || typeof e[0] == "number") && (e[1] instanceof h || typeof e[1] == "number") && (e[2] instanceof h || typeof e[2] == "number"))
          return this.parseByCoefficient(e[0], e[1], e[2]);
        if (e[0] instanceof y && e[1] instanceof N) {
          if (e[2] === "perpendicular")
            return this.parseByPointAndNormal(e[0], e[1]);
          if (e[2] === "parallel")
            return this.parseByPointAndVector(e[0], e[1]);
        } else if (e[0] instanceof y && e[1] instanceof z)
          return e[2] === "parallel" || e[2] === null ? this.parseByPointAndLine(
            e[0],
            e[1],
            "parallel"
            /* Parallel */
          ) : this.parseByPointAndLine(
            e[0],
            e[1],
            "perpendicular"
            /* Perpendicular */
          );
      }
      return console.log("Someting wrong happend while creating the line"), this;
    });
    r(this, "parseEquation", (e) => {
      e.reorder(!0);
      let t = new Set(e.letters());
      if (!(t.has("x") || t.has("y")))
        return this;
      for (let i of ["x", "y"])
        t.has(i) && t.delete(i);
      return t.size > 0 ? this : this.parseByCoefficient(e.left.monomByLetter("x").coefficient, e.left.monomByLetter("y").coefficient, e.left.monomByDegree(0).coefficient);
    });
    r(this, "parseByCoefficient", (e, t, i) => (this._a = new h(e), this._b = new h(t), this._c = new h(i), this._d = new N(this._b.clone(), this._a.clone().opposed()), this._OA = new y(new h().zero(), this._c.clone()), this._n = this._d.clone().normal(), this._exists = !0, this));
    r(this, "parseByPointAndVector", (e, t) => (this.parseByCoefficient(
      t.y,
      t.x.clone().opposed(),
      e.x.clone().multiply(t.y).subtract(e.y.clone().multiply(t.x)).opposed()
    ), this._OA = e.clone(), this._d = t.clone(), this._n = this._d.clone().normal(), this._exists = !0, this));
    r(this, "parseByPointAndNormal", (e, t) => this.parseByCoefficient(
      t.x,
      t.y,
      e.x.clone().multiply(t.x).add(e.y.clone().multiply(t.y)).opposed()
    ));
    r(this, "parseByPointAndLine", (e, t, i) => (i === void 0 && (i = "parallel"), i === "parallel" ? this.parseByPointAndNormal(e, t.normal) : i === "perpendicular" ? this.parseByPointAndNormal(e, t.director) : (this._exists = !1, this)));
    r(this, "clone", () => (this._a = this._a.clone(), this._b = this._b.clone(), this._c = this._c.clone(), this._d = this._d.clone(), this._OA = this._OA.clone(), this._n = this._n.clone(), this._exists = this.exists, this));
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    r(this, "isOnLine", (e) => this._a.clone().multiply(e.x).add(
      this._b.clone().multiply(e.y)
    ).add(this._c).isZero());
    r(this, "isParallelTo", (e) => this.slope.isEqual(e.slope) && this.height.isNotEqual(e.height));
    r(this, "isSameAs", (e) => this.slope.isEqual(e.slope) && this.height.isEqual(e.height));
    r(this, "isPerpendicularTo", (e) => this.d.isNormalTo(e.d));
    r(this, "isVertical", () => this.slope.isInfinity());
    r(this, "simplify", () => {
      let e = x.lcm(this._a.denominator, this._b.denominator, this._c.denominator), t = x.gcd(this._a.numerator, this._b.numerator, this._c.numerator);
      return this.parseByCoefficient(
        this._a.clone().multiply(e).divide(t),
        this._b.clone().multiply(e).divide(t),
        this._c.clone().multiply(e).divide(t)
      ), this;
    });
    r(this, "simplifyDirection", () => (this._d.simplifyDirection(), this));
    r(this, "intersection", (e) => {
      let t = new y(), i = !1, s = !1;
      return this._b.isZero() || e.b.isZero(), this.isParallelTo(e) ? (t.x = null, t.y = null, i = !0) : this.isSameAs(e) ? (t.x = null, t.y = null, s = !0) : (t.x = this._b.clone().multiply(e.c).subtract(this._c.clone().multiply(e.b)).divide(this._a.clone().multiply(e.b).subtract(this._b.clone().multiply(e.a))), t.y = this._a.clone().multiply(e.c).subtract(this._c.clone().multiply(e.a)).divide(this._b.clone().multiply(e.a).subtract(this._a.clone().multiply(e.b)))), {
        point: t,
        hasIntersection: !(i || s),
        isParallel: i,
        isSame: s
      };
    });
    r(this, "getValueAtX", (e) => {
      const t = this.equation.clone().isolate("y"), i = new h(e);
      if (t instanceof k)
        return t.right.evaluate({ x: i });
    });
    r(this, "getValueAtY", (e) => {
      const t = this.equation.clone().isolate("x"), i = new h(e);
      if (t instanceof k)
        return t.right.evaluate({ y: i });
    });
    return this._exists = !1, this._reduceBeforeDisplay = !0, e.length > 0 && this.parse(...e), this;
  }
  get a() {
    return this._a;
  }
  // ------------------------------------------
  // Getter and setter
  set a(e) {
    this._a = e;
  }
  get b() {
    return this._b;
  }
  set b(e) {
    this._b = e;
  }
  get c() {
    return this._c;
  }
  set c(e) {
    this._c = e;
  }
  get OA() {
    return this._OA;
  }
  set OA(e) {
    this._OA = e;
  }
  get d() {
    return this._d;
  }
  set d(e) {
    this._d = e;
  }
  get n() {
    return this._n;
  }
  get exists() {
    return this._exists;
  }
  // ------------------------------------------
  get equation() {
    let e = new k(new u().parse("xy", this._a, this._b, this._c), new u("0"));
    return this._reduceBeforeDisplay ? e.simplify() : e;
  }
  get system() {
    let e = new k(
      new u("x"),
      new u(this._OA.x).add(new g("k").multiplyByNumber(this._d.x))
    ), t = new k(
      new u("y"),
      new u(this._OA.y).add(new g("k").multiplyByNumber(this._d.y))
    );
    return { x: e, y: t };
  }
  get tex() {
    let e = this.equation.clone().reorder(!0);
    this._a.isNegative() && e.multiply(-1);
    let t = this._d.clone();
    return this._reduceBeforeDisplay && t.simplifyDirection(), {
      canonical: e.tex,
      equation: e.clone().reorder().tex,
      mxh: this.slope.isInfinity() ? "x=" + this.OA.x.tex : "y=" + new u().parse("x", this.slope, this.height).tex,
      parametric: `${y.pmatrix("x", "y")} = ${y.pmatrix(this._OA.x, this._OA.y)} + k\\cdot ${y.pmatrix(t.x, t.y)}`,
      system: `\\left\\{\\begin{aligned}
            x &= ${new u(this._OA.x).add(new g(this._d.x).multiply(new g("k"))).reorder("k", !0).tex}\\\\ 
            y &= ${new u(this._OA.y).add(new g(this._d.y).multiply(new g("k"))).reorder("k", !0).tex}
            \\end{aligned}\\right.`
    };
  }
  get reduceBeforeDisplay() {
    return this._reduceBeforeDisplay;
  }
  set reduceBeforeDisplay(e) {
    this._reduceBeforeDisplay = e;
  }
  get display() {
    let e = this.equation;
    return this._a.isNegative() && e.multiply(-1), {
      canonical: e.display,
      mxh: this.slope.isInfinity() ? "x=" + this.OA.x.display : "y=" + new u().parse("x", this.slope, this.height).display,
      parametric: ""
    };
  }
  get normal() {
    return new N(this._a, this._b);
  }
  get director() {
    return this._d.clone();
  }
  get slope() {
    return this._a.clone().opposed().divide(this._b);
  }
  get height() {
    return this._c.clone().opposed().divide(this._b);
  }
  distanceTo(e) {
    let t = e.x.clone().multiply(this._a).add(e.y.clone().multiply(this._b)).add(this._c).abs(), i = this.normal.normSquare;
    if (i.isZero())
      return {
        value: NaN,
        tex: "Not a line",
        fraction: new h().infinite()
      };
    let s = t.value / Math.sqrt(i.value), n = t.clone().divide(i.clone().sqrt());
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
  hitSegment(e, t) {
    let i = this.intersection(
      new z(e, t)
    );
    return i.hasIntersection ? i.point.x.value >= Math.min(e.x.value, t.x.value) && i.point.x.value <= Math.max(e.x.value, t.x.value) && i.point.y.value >= Math.min(e.y.value, t.y.value) && i.point.y.value <= Math.max(e.y.value, t.y.value) : !1;
  }
  // ------------------------------------------
  // Special functions
  // ------------------------------------------
  canonicalAsFloatCoefficient(e) {
    e === void 0 && (e = 2), this._a.value, this._b.value, this._c.value;
    let t = "";
    return this._a.isZero() || (this._a.isOne() ? t = "x" : this._a.clone().opposed().isOne() ? t = "-x" : t = this._a.value.toFixed(e) + "x"), this._b.isZero() || (this._b.isPositive() && (t += "+"), t += this._b.value.toFixed(e) + "y"), this._c.isZero() || (this._c.isPositive() && (t += "+"), t += this._c.value.toFixed(e)), t + "=0";
  }
};
// A line is defined as the canonical form
r(z, "PERPENDICULAR", "perpendicular"), r(z, "PARALLEL", "parallel");
let A = z;
class oe extends D {
  constructor(t) {
    super();
    r(this, "generate", () => {
      const t = new N(
        w.numberSym(10),
        w.numberSym(10)
      );
      for (; t.isNull; )
        t.x = w.numberSym(10), t.y = w.numberSym(10);
      return this._config.slope === 1 ? t.x.sign() !== t.y.sign() && t.y.opposed() : this._config.slope === -1 && t.x.sign() !== t.y.sign() && t.y.opposed(), new A(new y(this._config.A.x, this._config.A.y), t);
    });
    this._defaultConfig = {
      A: {
        x: w.numberSym(10),
        y: w.numberSym(10)
      }
    }, this._config = this.mergeConfig(t, this._defaultConfig);
  }
}
class le extends D {
  constructor(t) {
    super();
    r(this, "generate", () => {
      let t, i, s = this._config.axis === !0 || this._config.axis === "x", n = this._config.axis === !0 || this._config.axis === "y";
      return t = this._config.fraction ? w.fraction({ max: this._config.max, zero: s }) : new h(w.numberSym(this._config.max, s)), i = this._config.fraction ? w.fraction({ max: this._config.max, zero: n }) : new h(w.numberSym(this._config.max, n)), +this._config.quadrant == 1 && (t.abs(), i.abs()), +this._config.quadrant == 2 && (t.isPositive() && t.opposed(), i.isNegative() && i.opposed()), +this._config.quadrant == 3 && (t.isPositive() && t.opposed(), i.isPositive() && i.opposed()), +this._config.quadrant == 4 && (t.isNegative() && t.opposed(), i.isPositive() && i.opposed()), new y(t, i);
    });
    this._defaultConfig = {
      axis: !0,
      fraction: !1,
      max: 10
    }, this._config = this.mergeConfig(t, this._defaultConfig);
  }
}
class j {
  constructor(...e) {
    r(this, "_A");
    r(this, "_B");
    r(this, "_C");
    r(this, "_lines");
    r(this, "_middles");
    r(this, "_remarquables");
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    /**
     * Parse values to a triangle. Supported formats:
     * Point, Point, Point
     * x1, y1, x2, y2, x3, y3
     * TODO: Something else ?
     * @param values
     */
    r(this, "parse", (...e) => {
      if (e.length === 6) {
        let t = e.map((i) => new h(i));
        return this.parse(
          new y(t[0], t[1]),
          new y(t[2], t[3]),
          new y(t[4], t[5])
        );
      } else if (e.length === 3) {
        if (e.filter((t) => typeof t == "string").length === 3)
          return this.parse(...e.map((t) => new A(t)));
        if (e.filter((t) => t instanceof A).length === 3) {
          this._lines = {
            AB: e[0],
            BC: e[1],
            AC: e[2]
          };
          let t = e[0].intersection(e[1]);
          if (t.hasIntersection)
            this._B = t.point.clone();
          else
            return this;
          if (t = e[1].intersection(e[2]), t.hasIntersection)
            this._C = t.point.clone();
          else
            return this;
          if (t = e[2].intersection(e[0]), t.hasIntersection)
            this._A = t.point.clone();
          else
            return this;
        } else {
          if (e.filter((t) => t instanceof y).length < 3)
            return this.parse(
              new y(e[0]),
              new y(e[1]),
              new y(e[2])
            );
          this._A = e[0].clone(), this._B = e[1].clone(), this._C = e[2].clone(), this._lines = {
            AB: new A(this._A, this._B),
            BC: new A(this._B, this._C),
            AC: new A(this._A, this._C)
          };
        }
      } else if (e.length === 1 && e[0] instanceof j)
        return e[0].clone();
      return this._updateTriangle(), this;
    });
    /**
     * Clone the Triangle class
     */
    r(this, "clone", () => (this._A = this._A.clone(), this._B = this._B.clone(), this._C = this._C.clone(), this._lines = {
      AB: this._lines.AB.clone(),
      BC: this._lines.BC.clone(),
      AC: this._lines.AC.clone()
    }, this._updateTriangle(), this));
    // ------------------------------------------
    // Triangle operations and properties
    // ------------------------------------------
    /**
     * Generate the Line object for the three segments of the triangle
     */
    r(this, "_updateTriangle", () => {
      this._middles = {
        AB: new y().middleOf(this._A, this._B),
        AC: new y().middleOf(this._A, this._C),
        BC: new y().middleOf(this._B, this._C)
      }, this._remarquables = this._calculateRemarquableLines();
    });
    /**
     * Get the Point class for the given name
     * @param ptName
     */
    r(this, "getPointByName", (e) => {
      switch (e.toUpperCase()) {
        case "A":
          return this._A;
        case "B":
          return this._B;
        case "C":
          return this._C;
      }
      return this._A;
    });
    /**
     * Get the vector for the segment given by name.
     * @param ptName1
     * @param ptName2
     */
    r(this, "getSegment", (e, t) => new N(
      this.getPointByName(e),
      this.getPointByName(t)
    ));
    r(this, "_calculateRemarquableLines", () => {
      const e = this._calculateBisectors("A"), t = this._calculateBisectors("B"), i = this._calculateBisectors("C");
      let s = {
        medians: {
          A: new A(this._A, this._middles.BC),
          B: new A(this._B, this._middles.AC),
          C: new A(this._C, this._middles.AB),
          intersection: null
        },
        mediators: {
          AB: new A(this._middles.AB, new N(this._A, this._B).normal()),
          AC: new A(this._middles.AC, new N(this._A, this._C).normal()),
          BC: new A(this._middles.BC, new N(this._B, this._C).normal()),
          intersection: null
        },
        heights: {
          A: new A(this._A, new N(this._B, this._C).normal()),
          B: new A(this._B, new N(this._A, this._C).normal()),
          C: new A(this._C, new N(this._A, this._B).normal()),
          intersection: null
        },
        bisectors: {
          A: e.internal,
          B: t.internal,
          C: t.internal,
          intersection: null
        },
        externalBisectors: {
          A: e.external,
          B: t.external,
          C: i.external,
          intersection: null
        }
      };
      return s.medians.intersection = s.medians.A.intersection(s.medians.B).point, s.mediators.intersection = s.mediators.AB.intersection(s.mediators.BC).point, s.heights.intersection = s.heights.A.intersection(s.heights.B).point, s.bisectors.intersection = s.bisectors.A.intersection(s.bisectors.B).point, s;
    });
    r(this, "_calculateBisectors", (e) => {
      let t = this.lines, i, s;
      e === "A" ? (i = t.AB, s = t.AC) : e === "B" ? (i = t.AB, s = t.BC) : e === "C" && (i = t.BC, s = t.AC);
      let n = new A(new k(i.equation.left.clone().multiply(s.n.simplify().norm), s.equation.left.clone().multiply(i.n.simplify().norm)).reorder(!0).simplify()), o = new A(new k(i.equation.left.clone().multiply(s.n.simplify().norm), s.equation.left.clone().multiply(i.n.simplify().norm).opposed()).reorder(!0).simplify());
      return e === "A" ? n.hitSegment(this.B, this.C) ? { internal: n, external: o } : { internal: o, external: n } : e === "B" ? n.hitSegment(this.A, this.C) ? { internal: n, external: o } : { internal: o, external: n } : e === "C" ? n.hitSegment(this.B, this.A) ? { internal: n, external: o } : { internal: o, external: n } : { internal: n, external: o };
    });
    return e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setters
  // ------------------------------------------
  get A() {
    return this._A;
  }
  get B() {
    return this._B;
  }
  get C() {
    return this._C;
  }
  get AB() {
    return this.getSegment("A", "B");
  }
  get BA() {
    return this.getSegment("B", "A");
  }
  get BC() {
    return this.getSegment("B", "C");
  }
  get CB() {
    return this.getSegment("C", "B");
  }
  get AC() {
    return this.getSegment("A", "C");
  }
  get CA() {
    return this.getSegment("C", "A");
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
    return this._lines;
  }
  get remarquables() {
    return this._remarquables;
  }
}
class G {
  constructor(...e) {
    r(this, "_center");
    r(this, "_squareRadius");
    r(this, "_cartesian");
    r(this, "_exists");
    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    r(this, "relativePosition", (e) => {
      let t = e.distanceTo(this.center), i = Math.sqrt(this._squareRadius.value);
      return t.value - i > 1e-10 ? 0 : Math.abs(t.value - i) < 1e-10 ? 1 : 2;
    });
    r(this, "lineIntersection", (e) => {
      let t = [], i;
      if (this._cartesian === null)
        return [];
      const s = this._cartesian.clone(), n = e.equation.clone().isolate("x"), o = e.equation.clone().isolate("y");
      if (n instanceof k && o instanceof k) {
        s.replaceBy("y", o.right).simplify(), s.solve();
        for (let l of s.solutions)
          l.exact === !1 && isNaN(l.value) || (i = new h(l.exact === !1 ? l.value : l.exact), t.push(new y(i.clone(), o.right.evaluate(i))));
      }
      return t;
    });
    r(this, "tangents", (e) => e instanceof h ? this._tangentsWithSlope(e) : this.isPointOnCircle(e) ? this._tangentsThroughOnePointOnTheCircle(e) : this.center.distanceTo(e).value > this.radius.value ? this._tangentsThroughOnePointOutsideTheCircle(e) : (console.log("No tangents as the point is inside !"), []));
    r(this, "isPointOnCircle", (e) => this._cartesian.test({ x: e.x, y: e.y }));
    r(this, "getPointsOnCircle", (e) => {
      let t = x.pythagoricianTripletsWithTarget(this._squareRadius.value, !0), i = [], s;
      return t.forEach((n) => {
        for (let o of [[1, 1], [-1, 1], [-1, -1], [1, -1]])
          s = new y(
            this.center.x.clone().add(o[0] * n[0]),
            this.center.y.clone().add(o[1] * n[1])
          ), s.isInListOfPoints(i) || i.push(s);
      }), i;
    });
    r(this, "_tangentsThroughOnePointOnTheCircle", (e) => {
      let t = new N(this._center, e);
      return [new A(e, t, ee.Perpendicular)];
    });
    r(this, "_tangentsThroughOnePointOutsideTheCircle", (e) => {
      let t = this.center.x.clone().subtract(e.x), i = this.center.y.clone().subtract(e.y), s = new u("x"), n = new u("x^2+1");
      s.multiply(t).subtract(i).pow(2), n.multiply(this.squareRadius);
      let o = new k(s, n);
      return o.moveLeft().simplify().solve(), o.solutions.map((l) => {
        let a, f = new k("y", "x");
        return l.exact instanceof h ? (a = e.x.clone().opposed().multiply(l.exact).add(e.y), f.right.multiply(l.exact).add(a)) : (a = e.x.clone().opposed().multiply(l.value).add(e.y), f.right.multiply(l.value).add(a)), new A(f);
      });
    });
    r(this, "_tangentsWithSlope", (e) => {
      const t = e.numerator, i = -e.denominator, s = this._center.x.clone(), n = this._center.y.clone();
      this._squareRadius;
      let o = this._squareRadius.clone().multiply(e.numerator ** 2 + e.denominator ** 2), l = s.clone().multiply(t).opposed().subtract(n.clone().multiply(i)).add(o.clone().sqrt()), a = s.clone().multiply(t).opposed().subtract(n.clone().multiply(i)).subtract(o.clone().sqrt());
      return [new A(t, i, l), new A(t, i, a)];
    });
    this._exists = !1, e !== void 0 && this.parse(...e);
  }
  get center() {
    return this._center;
  }
  get squareRadius() {
    return this._squareRadius;
  }
  get cartesian() {
    return this._cartesian;
  }
  get exists() {
    return this._exists;
  }
  get radius() {
    return this._squareRadius.isSquare() ? {
      tex: this._squareRadius.clone().sqrt().tex,
      display: this._squareRadius.clone().sqrt().display,
      value: this._squareRadius.clone().sqrt().value
    } : {
      tex: `\\sqrt{${this._squareRadius.tex}}`,
      display: `sqrt(${this._squareRadius.display})`,
      value: this._squareRadius.clone().sqrt().value
    };
  }
  get tex() {
    if (this._exists) {
      let e, t;
      return this._center.x.isZero() ? e = "x^2" : e = `\\left(x${this._center.x.isNegative() ? "+" : "-"}${this._center.x.clone().abs().tex}\\right)^2`, this._center.y.isZero() ? t = "y^2" : t = `\\left(y${this._center.y.isNegative() ? "+" : "-"}${this._center.y.clone().abs().tex}\\right)^2`, `${e}+${t}=${this._squareRadius.tex}`;
    } else
      return "\\text{le cercle n'existe pas.}";
  }
  get developed() {
    return this._cartesian.tex;
  }
  get display() {
    if (this._exists) {
      let e, t;
      return this._center.x.isZero() ? e = "x^2" : e = `(x${this._center.x.isNegative() ? "+" : "-"}${this._center.x.clone().abs().tex})^2`, this._center.y.isZero() ? t = "y^2" : t = `(y${this._center.y.isNegative() ? "+" : "-"}${this._center.y.clone().abs().tex})^2`, `${e}+${t}=${this._squareRadius.display}`;
    } else
      return "\\text{le cercle n'existe pas.}";
  }
  clone() {
    return this._center = this._center.clone(), this._squareRadius = this._squareRadius.clone(), this._calculateCartesian(), this;
  }
  _reset() {
    return this._center = null, this._squareRadius = null, this._cartesian = null, this._exists = !1, this;
  }
  parse(...e) {
    return this._reset(), typeof e[0] == "string" ? this._parseEquation(new k(e[0])) : e[0] instanceof k ? this._parseEquation(e[0]) : e[0] instanceof G ? this._parseCopyCircle(e[0]) : e[0] instanceof y && e.length > 1 && (e[1] instanceof y ? e[2] instanceof y ? this._parseThroughtThreePoints(e[0], e[1], e[2]) : this._parseCenterAndPointThrough(e[0], e[1]) : (e[1] instanceof h || typeof e[1] == "number") && this._parseCenterAndRadius(e[0], e[1], typeof e[2] == "boolean" ? e[2] : !1)), this._exists && (this._calculateCartesian(), this._squareRadius !== void 0 && this._squareRadius.isNegative() && (this._exists = !1)), this;
  }
  _calculateCartesian() {
    this._cartesian = new k(new u(`(x-(${this._center.x.display}))^2+(y-(${this._center.y.display}))^2`), new u(`${this._squareRadius.display}`)).moveLeft();
  }
  _parseCopyCircle(e) {
    return this._center = e.center.clone(), this._squareRadius = e.squareRadius.clone(), this._calculateCartesian(), this._exists = e.exists, this;
  }
  _parseCenterAndRadius(e, t, i) {
    return this._center = e.clone(), i ? this._squareRadius = new h(t) : this._squareRadius = new h(t).pow(2), this._exists = !0, this;
  }
  _parseCenterAndPointThrough(e, t) {
    return this._center = e.clone(), this._squareRadius = new N(this._center, t).normSquare, this._exists = !0, this;
  }
  _parseEquation(e) {
    if (this._exists = !1, e.moveLeft(), e.degree("x").value === 2 && e.degree("y").value === 2) {
      let t = e.left.monomByDegree(2, "x"), i = e.left.monomByDegree(2, "y"), s, n, o;
      t.coefficient.isEqual(i.coefficient) ? (e.divide(t.coefficient), s = e.left.monomByDegree(1, "x"), n = e.left.monomByDegree(1, "y"), o = e.left.monomByDegree(0), this._center = new y(s.coefficient.clone().divide(2).opposed(), n.coefficient.clone().divide(2).opposed()), this._squareRadius = o.coefficient.clone().opposed().add(this._center.x.clone().pow(2)).add(this._center.y.clone().pow(2)), this._calculateCartesian(), this._exists = !0) : (this._center = null, this._squareRadius = null, this._exists = !1);
    }
    return this;
  }
  _parseThroughtThreePoints(e, t, i) {
    let s = new j(e, t, i), n = s.remarquables.mediators.AB.clone(), o = s.remarquables.mediators.AC.clone();
    return this.parse(n.intersection(o).point, e), this;
  }
}
class ae extends D {
  constructor(t) {
    super();
    r(this, "generate", () => {
      const t = w.Geometry.point(this._config.center);
      let i, s;
      return this._config.pointsOnCircle === 8 ? (i = w.number(1, 3), s = i ** 2 + (i + 1) ** 2) : s = w.number(1, 20), new G(t, s, !0);
    });
    this._defaultConfig = {}, this._config = this.mergeConfig(t, this._defaultConfig);
  }
}
var w;
((c) => {
  function e(d) {
    return new se(d).generate();
  }
  c.polynom = e;
  function t(d) {
    return new Q(d).generate();
  }
  c.monom = t;
  function i(d) {
    return new re(d).generate();
  }
  c.fraction = i;
  function s(d, p, _) {
    return T.randomInt(d, p, _);
  }
  c.number = s;
  function n(d, p) {
    return T.randomIntSym(d, p);
  }
  c.numberSym = n;
  function o(d) {
    return T.randomPrime(d);
  }
  c.prime = o;
  function l(d) {
    return T.randomBool(d);
  }
  c.bool = l;
  function a(d, p) {
    return T.randomArray(d, p);
  }
  c.array = a;
  function f(d) {
    return T.randomItem(d);
  }
  c.item = f;
  function m(d) {
    return T.shuffleArray(d);
  }
  c.shuffle = m, ((d) => {
    function p(v) {
      return new oe(v).generate();
    }
    d.line = p;
    function _(v) {
      return new le(v).generate();
    }
    d.point = _;
    function q(v) {
      return new ae(v).generate();
    }
    d.circle = q;
  })(c.Geometry || (c.Geometry = {}));
})(w || (w = {}));
class Y {
  constructor(...e) {
    // Stores the original equations
    r(this, "_equations");
    // Determine the letters in the linear system, usually ['x', 'y']
    r(this, "_letters");
    // Resolution steps contains each steps
    // letter : target letter
    // steps: {system: current LinearSystem, operations: [*3,/5] or [[*3,*2], [,*5], [*2,]]}
    r(this, "_resolutionSteps");
    // Get the solution of the equation
    r(this, "_solutions");
    r(this, "buildTex", (e, t) => {
      let i, s = [], n, o = [];
      for (let a of e)
        o = o.concat(a.letters());
      o = [...new Set(o)], o.sort();
      for (let a = 0; a < e.length; a++) {
        let f = e[a];
        i = [];
        for (let m of o)
          n = f.left.monomByLetter(m), i.length === 0 ? i.push(n.isZero() ? "" : n.tex) : i.push(n.isZero() ? "" : (n.coefficient.sign() === 1 ? "+" : "") + n.tex);
        if (i.push("="), i.push(f.right.tex), t !== void 0 && t[a] !== void 0) {
          i[i.length - 1] = i[i.length - 1] + " \\phantom{\\quad}";
          for (let m of t[a])
            i.push(`\\ \\cdot\\ ${m.startsWith("-") ? "\\left(" + m + "\\right)" : m}`);
        }
        s.push(i.join("&"));
      }
      let l = 0;
      return t !== void 0 && t.length > 0 && (l = t[0].length), `\\left\\{\\begin{array}{${"r".repeat(o.length)}cl ${"|l".repeat(l)}}${s.join("\\\\ ")}\\end{array}\\right.`;
    });
    r(this, "stepTex", (e) => {
      const t = this._resolutionSteps[e];
      if (t === void 0)
        return "";
      let i = [];
      for (let s = 0; s < t.length; s++)
        i.push(this.buildTex(t[s].equations, t[s].operations));
      return `\\begin{aligned}&${i.join("\\\\&")}\\end{aligned}`;
    });
    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    r(this, "parse", (...e) => (this._equations = e.map((t) => new k(t)), this._findLetters(), this));
    r(this, "clone", () => new Y().parse(...this._equations.map((e) => e.clone())));
    // ------------------------------------------
    r(this, "reorder", () => {
      for (let e of this._equations)
        e.reorder();
      return this;
    });
    // -----------------------------------------------
    // Equations solving algorithms
    r(this, "solve", (e) => {
      this._solutions = {}, this._resolutionSteps = {}, this.reorder(), e === void 0 && (e = !1);
      for (let t of this.variables)
        this._solutions[t] = this._solveOneLetter(t, e);
      return this;
    });
    r(this, "mergeEquations", (e, t, i, s) => {
      let n = e.clone().multiply(new h(i)), o = t.clone().multiply(new h(s));
      return n.left.add(o.left), n.right.add(o.right), n;
    });
    r(this, "_findLetters", () => {
      let e = /* @__PURE__ */ new Set();
      for (let t of this._equations)
        e = /* @__PURE__ */ new Set([...e, ...t.variables]);
      return this._letters = [...e], this._letters.sort(), this;
    });
    return this._equations = [], this._letters = "xyz".split(""), e !== void 0 && e.length > 0 && this.parse(...e), this;
  }
  // ------------------------------------------
  // Getter and setter
  // ------------------------------------------
  get equations() {
    return this._equations;
  }
  set equations(e) {
    this._equations = e;
  }
  get letters() {
    return this._letters.join("");
  }
  set letters(e) {
    this._letters = e.split("");
  }
  get isSolvable() {
    return this.variables.length === this._equations.length;
  }
  get variables() {
    return this._letters;
  }
  get tex() {
    let e = this.clone().reorder();
    return e.variables, this.buildTex(e.equations);
  }
  get solution() {
    let e = [];
    this._solutions === void 0 && this.solve();
    for (let t in this._solutions) {
      if (this._solutions[t].display === "RR")
        return `\\left\\{ \\left(${this._letters.join(";")}\\right) \\big\\vert ${this.equations[0].tex} \\right\\}`;
      if (this._solutions[t].display === "O/")
        return "\\varnothing";
      e.push(this._solutions[t].tex);
    }
    return `\\left(${e.join(";")}\\right)`;
  }
  get solutionAsDisplay() {
    let e = [];
    this._solutions === void 0 && this.solve();
    for (let t in this._solutions) {
      if (this._solutions[t].display === "RR")
        return `{(${this._letters.join(";")}) | ${this.equations[0].display} }`;
      if (this._solutions[t].display === "O/")
        return "O/";
      e.push(this._solutions[t].display);
    }
    return `(${e.join(";")})`;
  }
  get resolutionSteps() {
    return this._resolutionSteps;
  }
  _linearReduction(e, t, i) {
    let s = e.left.monomByDegree(1, i).coefficient.clone(), n = t.left.monomByDegree(1, i).coefficient.clone().opposed();
    const o = x.gcd(s.numerator, n.numerator), l = x.gcd(s.denominator, n.denominator);
    return s.divide(o).multiply(l), n.divide(o).multiply(l), (n.isNegativeOne() || s.isNegativeOne()) && (s.opposed(), n.opposed()), {
      merged: this.mergeEquations(e, t, n, s),
      factors: [n, s]
    };
  }
  /**
   * Linear reduction of the equations to have only one letter
   * @param letter    letter to isolate
   * @private
   */
  _solveOneLetter(e, t) {
    let i = this.clone().equations, s = [], n;
    this._resolutionSteps[e] = [];
    for (let a of this.variables)
      if (s = [], a !== e) {
        t && (this._resolutionSteps[e].push({
          equations: i.map((f) => f.clone()),
          operations: [...new Array(i.length)].map((f) => [...new Array(i.length - 1)].map((m) => ""))
        }), n = this._resolutionSteps[e].length - 1);
        for (let f = 0; f < i.length - 1; f++) {
          const m = this._linearReduction(i[f], i[f + 1], a);
          s.push(m.merged), t && (this._resolutionSteps[e][n].operations[f][f] = m.factors[0].tex, this._resolutionSteps[e][n].operations[f + 1][f] = m.factors[1].tex);
        }
        i = [...s];
      }
    let o = i[0];
    o.solve();
    const l = o.solutions[0];
    if (t) {
      this._resolutionSteps[e].push({
        equations: [i[0]],
        operations: [[i[0].left.monoms[0].coefficient.tex]]
      });
      let a;
      l.exact instanceof h || typeof l.exact == "string" ? a = new u(l.exact) : a = new u(l.value), this._resolutionSteps[e].push({
        equations: [new k(new u(e), a)],
        operations: []
      });
    }
    return o.solutions[0];
  }
}
var L = /* @__PURE__ */ ((c) => (c.ZERO = "z", c.DEFENCE = "d", c.NOTHING = "t", c))(L || {}), M = /* @__PURE__ */ ((c) => (c.VERTICAL = "av", c.HORIZONTAL = "ah", c.SLOPE = "ao", c.HOLE = "hole", c))(M || {}), E = /* @__PURE__ */ ((c) => (c.LT = "LT", c.RT = "RT", c.LB = "LB", c.RB = "RB", c))(E || {}), H = /* @__PURE__ */ ((c) => (c.MIN = "min", c.MAX = "max", c.FLAT = "flat", c.NOTHING = "", c))(H || {}), W = /* @__PURE__ */ ((c) => (c.SIGNS = "signs", c.GROWS = "grows", c.VARIATIONS = "variatins", c))(W || {});
class he {
  constructor(e, t) {
    r(this, "fx");
    r(this, "_asymptotes");
    r(this, "_derivative");
    r(this, "_signs");
    r(this, "_variations");
    r(this, "_zeroes");
    r(this, "_config");
    r(this, "_name");
    r(this, "makeStudy", () => {
      this._zeroes = this.makeZeroes(), this._config.signs && (this._signs = this.makeSigns()), this._config.asymptotes && (this._asymptotes = this.makeAsymptotes()), this._config.derivative && (this._derivative = this.makeDerivative()), this._config.variations && (this._variations = this.makeVariation()), this._config.signs && (this._signs.tex = this.texSigns), this._config.derivative && (this._derivative.tex = this.texGrows), this._config.variations && (this._variations.tex = this.texVariations);
    });
    r(this, "indexOfZero", (e, t) => {
      for (let i = 0; i < e.length; i++)
        if (e[i].tex === t.tex)
          return i;
      return -1;
    });
    r(this, "makeOneLineForSigns", (e, t, i) => {
      let s = [], n = e.getZeroes().map((o) => o.tex);
      s.push(""), e.degree().isZero() ? s.push(e.monoms[0].coefficient.sign() === 1 ? "+" : "-") : s.push(e.evaluate(t[0].value - 1).sign() === 1 ? "+" : "-");
      for (let o = 0; o < t.length; o++)
        s.push(
          n.includes(t[o].tex) ? i : "t"
          /* NOTHING */
        ), o < t.length - 1 ? s.push(e.evaluate((t[o].value + t[o + 1].value) / 2).sign() === 1 ? "+" : "-") : o === t.length - 1 && s.push(e.evaluate(t[o].value + 1).sign() === 1 ? "+" : "-");
      return s.push(""), s;
    });
    r(this, "makeSignsResult", (e) => {
      let t = e[0].map((i, s) => s === 0 || s === e[0].length - 1 ? "" : s % 2 === 0 ? "t" : "+");
      for (let i of e)
        for (let s = 0; s < i.length; s++)
          if (s % 2 === 0) {
            if (t[s] === "d")
              continue;
            i[s] !== "t" && (t[s] = i[s]);
          } else
            i[s] === "-" && (t[s] = t[s] === "+" ? "-" : "+");
      return t;
    });
    r(this, "makeGrowsResult", (e) => {
      let t = Object.values(e.signs), i = t[t.length - 1], s = [], n = {}, o = e.zeroes;
      for (let l = 0; l < o.length; l++) {
        let a = 2 * l + 2;
        if (i[a] === "z") {
          let f, m, d = o[l].exact, p, _, q, v = new K(this.fx.plotFunction);
          if (d instanceof h) {
            let B = d, S = this.fx.evaluate(B);
            f = d.value, m = S.value, p = d.tex, _ = S.tex;
          } else
            f = o[l].value, m = v.evaluate({ x: f }), p = f.toFixed(2), _ = m.toFixed(2);
          i[a - 1] === i[a + 1] ? q = "flat" : i[a - 1] === "+" ? q = "max" : q = "min", n[o[l].tex] = {
            type: q,
            tex: { x: p, y: _ },
            value: { x: f, y: m }
          };
        }
      }
      s.push(i[1] === "+" ? "-/" : "+/");
      for (let l = 1; l < i.length - 1; l++)
        if (i[l] === "z") {
          let a = n[o[(l - 2) / 2].tex];
          s.push(`${i[l - 1]}/\\(${a.type}(${a.tex.x};${a.tex.y})\\)`);
        } else
          i[l] === "d" && s.push(`${i[l - 1]}D${i[l + 1] === "+" ? "-" : "+"}/`);
      return s.push(`${i[i.length - 2]}/`), { growsLine: s, extremes: n };
    });
    r(this, "makeVariationsResult", (e) => ({ varsLine: [], extremes: {} }));
    r(this, "drawCode", () => {
      let e = `f(x)=${this.fx.plotFunction}`, t = 1;
      this.asymptotes.forEach((i) => {
        i.type === "av" ? (e += `
av_${t}=line x=${i.zero.value}->red,dash`, t++) : i.type === "ah" ? e += `
ah=line y=${i.fx.monoms[0].coefficient.value}->orange,dash` : i.type === "ao" && (e += `
ao=line y=${i.fx.plotFunction}->red,dash`), t++;
      });
      for (let i in this.derivative.extremes) {
        let s = this.derivative.extremes[i];
        e += `
M_${t}(${s.value.x},${s.value.y})*`, t++;
      }
      return this.zeroes.forEach((i) => {
        i.type === "z" && (e += `
Z_${t}(${i.value},0)*`, t++);
      }), e;
    });
    r(this, "_makeTexFromTableOfSigns", (e) => {
      let t = e.factors.map((l) => `\\(${l.tex}\\)/1`), i = `\\(${this._config.name}(${this._config.variable})\\)/1.2`, s = e.zeroes;
      e.type === "grows" ? i = `\\(${this._config.name}'(${this._config.variable})\\)/1.2,\\(f(x${this._config.variable})\\)/2` : e.type === "variatins" && (i = `\\(${this._config.name}''(${this._config.variable})\\)/1.2,\\(f(${this._config.variable})\\)/2`);
      let n = `\\begin{tikzpicture}
\\tkzTabInit[lgt=3,espcl=2,deltacl=0]{/1.2,${t.join(",")},/.1,${i} }{{\\scriptsize \\hspace{1cm} \\(-\\infty\\)},\\(${s.map((l) => l.tex).join("\\),\\(")}\\),{\\scriptsize \\hspace{-1cm} \\(+\\infty\\)}}`, o;
      for (o = 0; o < e.factors.length; o++)
        n += `
\\tkzTabLine{${e.signs[o].join(",")}}`;
      return n += `
\\tkzTabLine{${e.signs[o].join(",")}}`, e.type === "grows" ? n += `
\\tkzTabVar{${e.signs[o + 1].join(",")}}` : e.type === "variatins" && (n += `
\\tkzTabVar{${e.signs[o + 1].join(",")}}`), n += `
\\end{tikzpicture}`, n;
    });
    if (this.fx = e, this._config = {
      name: "f",
      variable: "x",
      domain: !0,
      asymptotes: !0,
      signs: !0,
      derivative: !0,
      variations: !0
    }, t)
      if (typeof t == "string") {
        const i = t.split(",");
        this._config = {};
        let s = i.filter((n) => n.includes("(") && n.includes(")"));
        s.length === 1 && (this._config.name = s[0].split("(")[0], this._config.variable = s[0].split("(")[1].split(")")[0]), this._config.domain = i.includes("d"), this._config.asymptotes = i.includes("a"), this._config.signs = i.includes("signs"), this._config.derivative = i.includes("dx"), this._config.variations = i.includes("ddx");
      } else
        this._config = t;
    return this.makeStudy(), this;
  }
  get name() {
    return this._config.name;
  }
  set name(e) {
    this._config.name = e;
  }
  get config() {
    return this._config;
  }
  set config(e) {
    this._config = e;
  }
  get zeroes() {
    return this._zeroes;
  }
  get domain() {
    return this.fx.domain();
  }
  get signs() {
    return this._signs;
  }
  get asymptotes() {
    return this._asymptotes;
  }
  get derivative() {
    return this._derivative;
  }
  get texSigns() {
    return this._makeTexFromTableOfSigns(this._signs);
  }
  get texGrows() {
    return this._makeTexFromTableOfSigns(this._derivative);
  }
  get texVariations() {
    return this._makeTexFromTableOfSigns(this._variations);
  }
  makeZeroes() {
    return [];
  }
  makeSigns() {
    return {
      type: "signs",
      fx: null,
      factors: [],
      zeroes: [],
      signs: [],
      extremes: {},
      tex: ""
    };
  }
  makeAsymptotes() {
    return [];
  }
  makeDerivative() {
    return {
      type: "grows",
      fx: null,
      factors: [],
      zeroes: [],
      signs: [],
      extremes: {},
      tex: ""
    };
  }
  makeVariation() {
    return {
      type: "variatins",
      fx: null,
      factors: [],
      zeroes: [],
      signs: [],
      extremes: {},
      tex: ""
    };
  }
}
class ce extends he {
  constructor(e, t) {
    return super(e, t), this;
  }
  makeZeroes() {
    return this._getZeroes(this.fx);
  }
  makeSigns() {
    return this._getSigns(this.fx, this.zeroes);
  }
  makeAsymptotes() {
    const e = this.fx.clone().reduce();
    let t = [];
    this.zeroes.filter((n) => n.type === L.DEFENCE).forEach((n) => {
      let o = M.VERTICAL, l = `x=${n.tex}`, a = `x=${n.display}`;
      n.exact instanceof h ? e.denominator.evaluate(n.exact).isNotZero() && (o = M.HOLE, l = `(${n.tex};${e.evaluate(n.exact).tex})`, a = `(${n.display};${e.evaluate(n.exact).display})`) : e.denominator.evaluate(n.value).isNotZero() && (o = M.HOLE, l = `(${n.tex};${e.evaluate(n.value).tex})`, a = `(${n.display};${e.evaluate(n.value).display})`);
      const f = 1e-6;
      let m = this.fx.evaluateAsNumeric(n.value - f), d = this.fx.evaluateAsNumeric(n.value + f), p = [], _ = "";
      d < -1e4 ? (p.push(E.RB), _ += "m") : d > 1e4 && (p.push(E.RT), _ += "p"), m < -1e4 ? (p.push(E.LB), _ += "m") : m > 1e4 && (p.push(E.LT), _ += "p"), _ === "pp" ? _ = "+" : _ === "mm" ? _ = "-" : _ = `\\${_}`, t.push({
        fx: null,
        type: o,
        tex: l,
        display: a,
        zero: n,
        limits: `\\lim_{x\\to${n.tex} }\\ f(x) = ${_}\\infty`,
        deltaX: null,
        tableOfSign: null,
        position: p
      });
    });
    let i = this.fx.numerator.degree(), s = this.fx.denominator.degree();
    if (i.isEqual(s)) {
      let n = this.fx.numerator.monomByDegree().coefficient.clone().divide(this.fx.denominator.monomByDegree().coefficient), o = n.tex, { reminder: l } = e.euclidian(), a = new R(l, e.denominator);
      t.push({
        fx: new u(n),
        type: M.HORIZONTAL,
        tex: `y=${o}`,
        display: `y=${n.display}`,
        zero: null,
        limits: `\\lim_{x\\to\\infty}\\ f(x) = ${o}`,
        deltaX: a,
        tableOfSign: this._getSigns(a),
        position: this._getHorizontalAsymptoteRelativePositon(a)
      });
    } else if (s.greater(i))
      t.push({
        fx: new u("0"),
        type: M.HORIZONTAL,
        tex: "y=0",
        display: "y=0",
        zero: null,
        limits: "\\lim_{x\\to\\infty}\\ f(x) = 0",
        deltaX: null,
        tableOfSign: null,
        position: this._getHorizontalAsymptoteRelativePositon(this.fx)
      });
    else if (i.value - 1 === s.value) {
      let { quotient: n, reminder: o } = e.euclidian(), l = new R(o, e.denominator);
      t.push({
        fx: n.clone(),
        type: M.SLOPE,
        tex: `y=${n.tex}`,
        display: `y=${n.display}`,
        zero: null,
        limits: "",
        deltaX: new R(o, e.denominator),
        tableOfSign: this._getSigns(l),
        position: this._getHorizontalAsymptoteRelativePositon(l)
      });
    }
    return t;
  }
  _getHorizontalAsymptoteRelativePositon(e, t = 1e6) {
    let i = [], s = e.evaluateAsNumeric(-t), n = e.evaluateAsNumeric(t);
    return s >= 0 ? i.push(E.LT) : i.push(E.LB), n >= 0 ? i.push(E.RT) : i.push(E.RB), i;
  }
  makeDerivative() {
    let e = this.fx.clone().derivative(), t = this._getSigns(e, this._getZeroes(e), W.GROWS), i = this.makeGrowsResult(t);
    return t.signs.push(i.growsLine), t.extremes = i.extremes, t;
  }
  makeVariation() {
    let e = this.derivative.fx.clone().derivative(), t = this._getSigns(e, this._getZeroes(e), W.VARIATIONS), i = this.makeVariationsResult(t);
    return t.signs.push(i.varsLine), t.extremes = i.extremes, t;
  }
  _getZeroes(e) {
    let t = [];
    return e.numerator.getZeroes().filter((i) => !isNaN(i.value)).forEach((i) => {
      t.push({
        tex: i.tex,
        display: i.display,
        value: i.value,
        exact: i.exact,
        extrema: H.NOTHING,
        type: L.ZERO
      });
    }), e.denominator.getZeroes().filter((i) => !isNaN(i.value)).forEach((i) => {
      let s = this.indexOfZero(t, i);
      s !== -1 ? t[s].type = L.DEFENCE : t.push({
        tex: i.tex,
        display: i.display,
        value: i.value,
        exact: i.exact,
        extrema: H.NOTHING,
        type: L.DEFENCE
      });
    }), t.sort((i, s) => i.value - s.value), t;
  }
  _getSigns(e, t, i) {
    let s = [], n = [];
    return t === void 0 && (t = this._getZeroes(e)), e.numerator.factors.forEach((o) => {
      s.push(this.makeOneLineForSigns(o, t, L.ZERO)), n.push(o.clone());
    }), e.denominator.factors.forEach((o) => {
      s.push(this.makeOneLineForSigns(o, t, L.DEFENCE)), n.push(o.clone());
    }), s.push(this.makeSignsResult(s)), {
      type: i,
      fx: e,
      factors: n,
      zeroes: t,
      signs: s,
      extremes: {},
      tex: ""
    };
  }
}
class R {
  /**
   *
   * @param numerator
   * @param denominator
   */
  constructor(e, t) {
    r(this, "_denominator");
    r(this, "_numerator");
    r(this, "_rawString");
    r(this, "clone", () => new R(
      this._numerator.clone(),
      this._denominator.clone()
    ));
    r(this, "domain", () => {
      let e = this._denominator.getZeroes();
      return e.length === 0 || e[0].tex === F.real ? F.varnothing : e[0].tex === F.varnothing ? F.real : "\\mathbb{R}\\setminus\\left\\{" + e.map((t) => t.tex).join(";") + "\\right\\}";
    });
    r(this, "amplify", (e) => (this._numerator.multiply(e), this._denominator.multiply(e), this));
    r(this, "derivative", (e) => {
      let t = this._numerator.clone(), i = this._denominator.clone(), s = t.clone().derivative(e), n = i.clone().derivative(e);
      return this._numerator = s.clone().multiply(i).subtract(t.clone().multiply(n)), this._denominator = i.clone().pow(2), this;
    });
    r(this, "factorize", (e) => (this._numerator.factorize(e), this._denominator.factorize(e), this));
    r(this, "simplify", (e) => {
      let t = this._numerator.euclidian(e);
      if (!t.reminder.isZero())
        return this;
      let i = this._denominator.euclidian(e);
      return i.reminder.isZero() ? (this._numerator = t.quotient, this._denominator = i.quotient, this) : this;
    });
    r(this, "reduce", () => {
      this._numerator.factorize();
      for (let e of this._numerator.factors)
        e.degree().isZero() ? this._denominator.commonMonom().coefficient.clone().divide(e.monomByDegree().coefficient).isNatural() && this.simplify(e) : this.simplify(e);
      return this;
    });
    r(this, "opposed", () => (this._numerator.opposed(), this));
    r(this, "add", (e) => {
      let t = this._denominator.clone();
      return this.amplify(e._denominator), this._numerator.add(e._numerator.clone().multiply(t)), this;
    });
    r(this, "subtract", (e) => this.add(e.clone().opposed()));
    r(this, "euclidian", () => this._numerator.euclidian(this._denominator));
    // TODO : where and how is used limits ?
    r(this, "limits", (e, t, i) => {
      if (e === 1 / 0 || e === -1 / 0) {
        let { quotient: s, reminder: n } = this._numerator.clone().euclidian(this._denominator);
        return s.degree(i).isStrictlyPositive() ? e === 1 / 0 ? s.limitToInfinity(i) : s.limitToNegativeInfinity(i) : s.monomByDegree(void 0, i).coefficient;
      } else {
        let s = {}, n = {}, o, l, a = this.clone().reduce();
        return s[i === void 0 ? "x" : i] = new h(e), t !== "above" && t !== "below" ? (o = a._numerator.evaluate(s).divide(a._denominator.evaluate(s)), o.isInfinity() ? o.abs() : o) : (t === "above" ? n[i === void 0 ? "x" : i] = new h(e).add(1e-6) : t === "below" && (n[i === void 0 ? "x" : i] = new h(e).subtract(1e-6)), o = a._numerator.evaluate(s).divide(a._denominator.evaluate(s)), l = a._numerator.evaluate(n).divide(a._denominator.evaluate(n)).sign(), o.isInfinity() ? l === 1 ? o.abs() : o.abs().opposed() : o);
      }
    });
    r(this, "evaluate", (e) => {
      new h().zero();
      let t = this._numerator.evaluate(e), i = this._denominator.evaluate(e);
      return t.divide(i);
    });
    r(this, "evaluateAsNumeric", (e) => this._numerator.evaluateAsNumeric(e) / this._denominator.evaluateAsNumeric(e));
    r(this, "study", (e) => new ce(this, e));
    e instanceof u ? this._numerator = e.clone() : typeof e == "string" ? this._numerator = new u(e) : this._numerator = new u(), t instanceof u ? this._denominator = t.clone() : typeof t == "string" ? this._denominator = new u(t) : this._denominator = new u();
  }
  get numerator() {
    return this._numerator;
  }
  get denominator() {
    return this._denominator;
  }
  get tex() {
    return `\\frac{ ${this._numerator.tex} }{ ${this._denominator.tex} }`;
  }
  get display() {
    return `(${this._numerator.display})/(${this._denominator.display})`;
  }
  get texFactors() {
    return `\\frac{ ${this._numerator.texFactors} }{ ${this._denominator.texFactors} }`;
  }
  get displayFactors() {
    return `(${this._numerator.displayFactors})/(${this._denominator.displayFactors})`;
  }
  get plotFunction() {
    return `(${this._numerator.plotFunction})/(${this._denominator.plotFunction})`;
  }
}
class fe {
  /**
   *
   * @param {string} value (optional) Default polynom to parse on class creation
   */
  constructor(e) {
    r(this, "_rawString");
    r(this, "_rpn");
    r(this, "parse", (e) => (this._rpn = new P(U.SET).parse(e).rpn, this));
    return this._rawString = e, this.parse(e), this;
  }
  get isLogicalset() {
    return !0;
  }
  get rpn() {
    return this._rpn;
  }
  get tex() {
    let e = [];
    for (let t of this._rpn)
      if (t.tokenType === "variable")
        e.push(t);
      else
        switch (t.token) {
          case "&":
            if (e.length >= 2) {
              let i = e.pop(), s = e.pop();
              s.tokenType === "mix" && (s.token = `( ${s.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${s.token} \\cap ${i.token}`, tokenType: "mix" });
            }
            break;
          case "|":
            if (e.length >= 2) {
              let i = e.pop(), s = e.pop();
              s.tokenType === "mix" && (s.token = `( ${s.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${s.token} \\cup ${i.token}`, tokenType: "mix" });
            }
            break;
          case "-":
            if (e.length >= 2) {
              let i = e.pop(), s = e.pop();
              s.tokenType === "mix" && (s.token = `( ${s.token} )`), i.tokenType === "mix" && (i.token = `( ${i.token} )`), e.push({ token: `${s.token} \\setminus ${i.token}`, tokenType: "mix" });
            }
            break;
          case "!":
            if (e.length >= 1) {
              let i = e.pop();
              e.push({ token: `\\overline{ ${i.token} }`, tokenType: "variable" });
            }
            break;
        }
    return e[0].token;
  }
  evaluate(e, t) {
    let i = [], s;
    if (t === void 0) {
      s = /* @__PURE__ */ new Set();
      for (let n in e)
        s = /* @__PURE__ */ new Set([...s, ...e[n]]);
    } else
      s = new Set(t);
    for (let n of this._rpn)
      if (n.tokenType === "variable")
        e[n.token] === void 0 ? i.push(/* @__PURE__ */ new Set()) : i.push(new Set(e[n.token]));
      else
        switch (n.token) {
          case "&":
            if (i.length >= 2) {
              let o = i.pop(), l = i.pop();
              i.push(new Set([...l].filter((a) => o.has(a))));
            }
            break;
          case "|":
            if (i.length >= 2) {
              let o = i.pop(), l = i.pop();
              i.push(/* @__PURE__ */ new Set([...l, ...o]));
            }
            break;
          case "-":
            if (i.length >= 2) {
              let o = i.pop(), l = i.pop();
              i.push(new Set([...l].filter((a) => !o.has(a))));
            }
            break;
          case "!":
            if (i.length >= 1) {
              let o = i.pop();
              i.push(new Set([...s].filter((l) => !o.has(l))));
            }
            break;
        }
    return [...i[0]].sort();
  }
  vennAB() {
    return this.evaluate(
      {
        A: ["A", "AB"],
        B: ["B", "AB"]
      },
      ["A", "B", "AB", "E"]
    );
  }
  vennABC() {
    return this.evaluate(
      {
        A: ["A", "AB", "AC", "ABC"],
        B: ["B", "AB", "BC", "ABC"],
        C: ["C", "AC", "BC", "ABC"]
      },
      ["A", "B", "C", "AB", "AC", "BC", "E"]
    );
  }
}
const de = {
  ShutingYard: P,
  Numeric: x,
  NumExp: K,
  Fraction: h,
  Root: J,
  Monom: g,
  Polynom: u,
  Equation: k,
  LinearSystem: Y,
  Rational: R,
  Logicalset: fe,
  Random: w,
  Geometry: {
    Vector: N,
    Point: y,
    Line: A,
    Triangle: j,
    Circle: G
  }
};
export {
  de as PiMath
};
