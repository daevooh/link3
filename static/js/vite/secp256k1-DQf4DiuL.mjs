var be = Object.defineProperty, ye = Object.defineProperties;
var me = Object.getOwnPropertyDescriptors;
var Pt = Object.getOwnPropertySymbols;
var xe = Object.prototype.hasOwnProperty, Ee = Object.prototype.propertyIsEnumerable;
var ut = Math.pow, Gt = (n, e, t) => e in n ? be(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, D = (n, e) => {
  for (var t in e || (e = {}))
    xe.call(e, t) && Gt(n, t, e[t]);
  if (Pt)
    for (var t of Pt(e))
      Ee.call(e, t) && Gt(n, t, e[t]);
  return n;
}, Bt = (n, e) => ye(n, me(e));
import { a1 as re, a2 as Lt, a3 as St, a4 as oe, a5 as Be, a6 as ve, a7 as P, a8 as Se, a9 as Ae, aa as Ie, ab as Ne } from "./reown-appkit-connector-RlB2KFu3.mjs";
function qe(n, e, t, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(e, t, r);
  const o = BigInt(32), s = BigInt(4294967295), c = Number(t >> o & s), f = Number(t & s), i = r ? 4 : 0, u = r ? 0 : 4;
  n.setUint32(e + i, c, r), n.setUint32(e + u, f, r);
}
function Oe(n, e, t) {
  return n & e ^ ~n & t;
}
function Le(n, e, t) {
  return n & e ^ n & t ^ e & t;
}
class He extends re {
  constructor(e, t, r, o) {
    super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = o, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = Lt(this.buffer);
  }
  update(e) {
    St(this);
    const { view: t, buffer: r, blockLen: o } = this;
    e = oe(e);
    const s = e.length;
    for (let c = 0; c < s; ) {
      const f = Math.min(o - this.pos, s - c);
      if (f === o) {
        const i = Lt(e);
        for (; o <= s - c; c += o)
          this.process(i, c);
        continue;
      }
      r.set(e.subarray(c, c + f), this.pos), this.pos += f, c += f, this.pos === o && (this.process(t, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    St(this), Be(e, this), this.finished = !0;
    const { buffer: t, view: r, blockLen: o, isLE: s } = this;
    let { pos: c } = this;
    t[c++] = 128, this.buffer.subarray(c).fill(0), this.padOffset > o - c && (this.process(r, 0), c = 0);
    for (let h = c; h < o; h++)
      t[h] = 0;
    qe(r, o - 8, BigInt(this.length * 8), s), this.process(r, 0);
    const f = Lt(e), i = this.outputLen;
    if (i % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u = i / 4, y = this.get();
    if (u > y.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let h = 0; h < u; h++)
      f.setUint32(4 * h, y[h], s);
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const r = e.slice(0, t);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: t, buffer: r, length: o, finished: s, destroyed: c, pos: f } = this;
    return e.length = o, e.pos = f, e.finished = s, e.destroyed = c, o % t && e.buffer.set(r), e;
  }
}
const Ue = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), J = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), tt = /* @__PURE__ */ new Uint32Array(64);
class Te extends He {
  constructor() {
    super(64, 32, 8, !1), this.A = J[0] | 0, this.B = J[1] | 0, this.C = J[2] | 0, this.D = J[3] | 0, this.E = J[4] | 0, this.F = J[5] | 0, this.G = J[6] | 0, this.H = J[7] | 0;
  }
  get() {
    const { A: e, B: t, C: r, D: o, E: s, F: c, G: f, H: i } = this;
    return [e, t, r, o, s, c, f, i];
  }
  // prettier-ignore
  set(e, t, r, o, s, c, f, i) {
    this.A = e | 0, this.B = t | 0, this.C = r | 0, this.D = o | 0, this.E = s | 0, this.F = c | 0, this.G = f | 0, this.H = i | 0;
  }
  process(e, t) {
    for (let h = 0; h < 16; h++, t += 4)
      tt[h] = e.getUint32(t, !1);
    for (let h = 16; h < 64; h++) {
      const l = tt[h - 15], m = tt[h - 2], N = P(l, 7) ^ P(l, 18) ^ l >>> 3, b = P(m, 17) ^ P(m, 19) ^ m >>> 10;
      tt[h] = b + tt[h - 7] + N + tt[h - 16] | 0;
    }
    let { A: r, B: o, C: s, D: c, E: f, F: i, G: u, H: y } = this;
    for (let h = 0; h < 64; h++) {
      const l = P(f, 6) ^ P(f, 11) ^ P(f, 25), m = y + l + Oe(f, i, u) + Ue[h] + tt[h] | 0, b = (P(r, 2) ^ P(r, 13) ^ P(r, 22)) + Le(r, o, s) | 0;
      y = u, u = i, i = f, f = c + m | 0, c = s, s = o, o = r, r = m + b | 0;
    }
    r = r + this.A | 0, o = o + this.B | 0, s = s + this.C | 0, c = c + this.D | 0, f = f + this.E | 0, i = i + this.F | 0, u = u + this.G | 0, y = y + this.H | 0, this.set(r, o, s, c, f, i, u, y);
  }
  roundClean() {
    tt.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const _e = /* @__PURE__ */ ve(() => new Te());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const At = /* @__PURE__ */ BigInt(0), It = /* @__PURE__ */ BigInt(1), ke = /* @__PURE__ */ BigInt(2);
function st(n) {
  return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
}
function xt(n) {
  if (!st(n))
    throw new Error("Uint8Array expected");
}
function dt(n, e) {
  if (typeof e != "boolean")
    throw new Error(n + " boolean expected, got " + e);
}
const ze = /* @__PURE__ */ Array.from({ length: 256 }, (n, e) => e.toString(16).padStart(2, "0"));
function ht(n) {
  xt(n);
  let e = "";
  for (let t = 0; t < n.length; t++)
    e += ze[n[t]];
  return e;
}
function lt(n) {
  const e = n.toString(16);
  return e.length & 1 ? "0" + e : e;
}
function jt(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return n === "" ? At : BigInt("0x" + n);
}
const $ = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Dt(n) {
  if (n >= $._0 && n <= $._9)
    return n - $._0;
  if (n >= $.A && n <= $.F)
    return n - ($.A - 10);
  if (n >= $.a && n <= $.f)
    return n - ($.a - 10);
}
function gt(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const e = n.length, t = e / 2;
  if (e % 2)
    throw new Error("hex string expected, got unpadded hex of length " + e);
  const r = new Uint8Array(t);
  for (let o = 0, s = 0; o < t; o++, s += 2) {
    const c = Dt(n.charCodeAt(s)), f = Dt(n.charCodeAt(s + 1));
    if (c === void 0 || f === void 0) {
      const i = n[s] + n[s + 1];
      throw new Error('hex string expected, got non-hex character "' + i + '" at index ' + s);
    }
    r[o] = c * 16 + f;
  }
  return r;
}
function ot(n) {
  return jt(ht(n));
}
function Yt(n) {
  return xt(n), jt(ht(Uint8Array.from(n).reverse()));
}
function wt(n, e) {
  return gt(n.toString(16).padStart(e * 2, "0"));
}
function Ft(n, e) {
  return wt(n, e).reverse();
}
function Ce(n) {
  return gt(lt(n));
}
function K(n, e, t) {
  let r;
  if (typeof e == "string")
    try {
      r = gt(e);
    } catch (s) {
      throw new Error(n + " must be hex string or Uint8Array, cause: " + s);
    }
  else if (st(e))
    r = Uint8Array.from(e);
  else
    throw new Error(n + " must be hex string or Uint8Array");
  const o = r.length;
  if (typeof t == "number" && o !== t)
    throw new Error(n + " of length " + t + " expected, got " + o);
  return r;
}
function mt(...n) {
  let e = 0;
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    xt(o), e += o.length;
  }
  const t = new Uint8Array(e);
  for (let r = 0, o = 0; r < n.length; r++) {
    const s = n[r];
    t.set(s, o), o += s.length;
  }
  return t;
}
function Ze(n, e) {
  if (n.length !== e.length)
    return !1;
  let t = 0;
  for (let r = 0; r < n.length; r++)
    t |= n[r] ^ e[r];
  return t === 0;
}
function Re(n) {
  if (typeof n != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(n));
}
const Ht = (n) => typeof n == "bigint" && At <= n;
function Nt(n, e, t) {
  return Ht(n) && Ht(e) && Ht(t) && e <= n && n < t;
}
function it(n, e, t, r) {
  if (!Nt(e, t, r))
    throw new Error("expected valid " + n + ": " + t + " <= n < " + r + ", got " + e);
}
function ie(n) {
  let e;
  for (e = 0; n > At; n >>= It, e += 1)
    ;
  return e;
}
function Me(n, e) {
  return n >> BigInt(e) & It;
}
function Ve(n, e, t) {
  return n | (t ? It : At) << BigInt(e);
}
const Kt = (n) => (ke << BigInt(n - 1)) - It, Ut = (n) => new Uint8Array(n), $t = (n) => Uint8Array.from(n);
function se(n, e, t) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2)
    throw new Error("qByteLen must be a number");
  if (typeof t != "function")
    throw new Error("hmacFn must be a function");
  let r = Ut(n), o = Ut(n), s = 0;
  const c = () => {
    r.fill(1), o.fill(0), s = 0;
  }, f = (...h) => t(o, r, ...h), i = (h = Ut()) => {
    o = f($t([0]), h), r = f(), h.length !== 0 && (o = f($t([1]), h), r = f());
  }, u = () => {
    if (s++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let h = 0;
    const l = [];
    for (; h < e; ) {
      r = f();
      const m = r.slice();
      l.push(m), h += r.length;
    }
    return mt(...l);
  };
  return (h, l) => {
    c(), i(h);
    let m;
    for (; !(m = l(u())); )
      i();
    return c(), m;
  };
}
const je = {
  bigint: (n) => typeof n == "bigint",
  function: (n) => typeof n == "function",
  boolean: (n) => typeof n == "boolean",
  string: (n) => typeof n == "string",
  stringOrUint8Array: (n) => typeof n == "string" || st(n),
  isSafeInteger: (n) => Number.isSafeInteger(n),
  array: (n) => Array.isArray(n),
  field: (n, e) => e.Fp.isValid(n),
  hash: (n) => typeof n == "function" && Number.isSafeInteger(n.outputLen)
};
function Et(n, e, t = {}) {
  const r = (o, s, c) => {
    const f = je[s];
    if (typeof f != "function")
      throw new Error("invalid validator function");
    const i = n[o];
    if (!(c && i === void 0) && !f(i, n))
      throw new Error("param " + String(o) + " is invalid. Expected " + s + ", got " + i);
  };
  for (const [o, s] of Object.entries(e))
    r(o, s, !1);
  for (const [o, s] of Object.entries(t))
    r(o, s, !0);
  return n;
}
const Ye = () => {
  throw new Error("not implemented");
};
function Ct(n) {
  const e = /* @__PURE__ */ new WeakMap();
  return (t, ...r) => {
    const o = e.get(t);
    if (o !== void 0)
      return o;
    const s = n(t, ...r);
    return e.set(t, s), s;
  };
}
const Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange: it,
  abool: dt,
  abytes: xt,
  bitGet: Me,
  bitLen: ie,
  bitMask: Kt,
  bitSet: Ve,
  bytesToHex: ht,
  bytesToNumberBE: ot,
  bytesToNumberLE: Yt,
  concatBytes: mt,
  createHmacDrbg: se,
  ensureBytes: K,
  equalBytes: Ze,
  hexToBytes: gt,
  hexToNumber: jt,
  inRange: Nt,
  isBytes: st,
  memoized: Ct,
  notImplemented: Ye,
  numberToBytesBE: wt,
  numberToBytesLE: Ft,
  numberToHexUnpadded: lt,
  numberToVarBytesBE: Ce,
  utf8ToBytes: Re,
  validateObject: Et
}, Symbol.toStringTag, { value: "Module" }));
class ce extends re {
  constructor(e, t) {
    super(), this.finished = !1, this.destroyed = !1, Se(e);
    const r = oe(t);
    if (this.iHash = e.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const o = this.blockLen, s = new Uint8Array(o);
    s.set(r.length > o ? e.create().update(r).digest() : r);
    for (let c = 0; c < s.length; c++)
      s[c] ^= 54;
    this.iHash.update(s), this.oHash = e.create();
    for (let c = 0; c < s.length; c++)
      s[c] ^= 106;
    this.oHash.update(s), s.fill(0);
  }
  update(e) {
    return St(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    St(this), Ae(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: t, iHash: r, finished: o, destroyed: s, blockLen: c, outputLen: f } = this;
    return e = e, e.finished = o, e.destroyed = s, e.blockLen = c, e.outputLen = f, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const fe = (n, e, t) => new ce(n, e).update(t).digest();
fe.create = (n, e) => new ce(n, e);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const z = BigInt(0), T = BigInt(1), rt = /* @__PURE__ */ BigInt(2), Ke = /* @__PURE__ */ BigInt(3), Zt = /* @__PURE__ */ BigInt(4), Wt = /* @__PURE__ */ BigInt(5), Xt = /* @__PURE__ */ BigInt(8);
function V(n, e) {
  const t = n % e;
  return t >= z ? t : e + t;
}
function Pe(n, e, t) {
  if (e < z)
    throw new Error("invalid exponent, negatives unsupported");
  if (t <= z)
    throw new Error("invalid modulus");
  if (t === T)
    return z;
  let r = T;
  for (; e > z; )
    e & T && (r = r * n % t), n = n * n % t, e >>= T;
  return r;
}
function Y(n, e, t) {
  let r = n;
  for (; e-- > z; )
    r *= r, r %= t;
  return r;
}
function Rt(n, e) {
  if (n === z)
    throw new Error("invert: expected non-zero number");
  if (e <= z)
    throw new Error("invert: expected positive modulus, got " + e);
  let t = V(n, e), r = e, o = z, s = T;
  for (; t !== z; ) {
    const f = r / t, i = r % t, u = o - s * f;
    r = t, t = i, o = s, s = u;
  }
  if (r !== T)
    throw new Error("invert: does not exist");
  return V(o, e);
}
function Ge(n) {
  const e = (n - T) / rt;
  let t, r, o;
  for (t = n - T, r = 0; t % rt === z; t /= rt, r++)
    ;
  for (o = rt; o < n && Pe(o, e, n) !== n - T; o++)
    if (o > 1e3)
      throw new Error("Cannot find square root: likely non-prime P");
  if (r === 1) {
    const c = (n + T) / Zt;
    return function(i, u) {
      const y = i.pow(u, c);
      if (!i.eql(i.sqr(y), u))
        throw new Error("Cannot find square root");
      return y;
    };
  }
  const s = (t + T) / rt;
  return function(f, i) {
    if (f.pow(i, e) === f.neg(f.ONE))
      throw new Error("Cannot find square root");
    let u = r, y = f.pow(f.mul(f.ONE, o), t), h = f.pow(i, s), l = f.pow(i, t);
    for (; !f.eql(l, f.ONE); ) {
      if (f.eql(l, f.ZERO))
        return f.ZERO;
      let m = 1;
      for (let b = f.sqr(l); m < u && !f.eql(b, f.ONE); m++)
        b = f.sqr(b);
      const N = f.pow(y, T << BigInt(u - m - 1));
      y = f.sqr(N), h = f.mul(h, N), l = f.mul(l, y), u = m;
    }
    return h;
  };
}
function De(n) {
  if (n % Zt === Ke) {
    const e = (n + T) / Zt;
    return function(r, o) {
      const s = r.pow(o, e);
      if (!r.eql(r.sqr(s), o))
        throw new Error("Cannot find square root");
      return s;
    };
  }
  if (n % Xt === Wt) {
    const e = (n - Wt) / Xt;
    return function(r, o) {
      const s = r.mul(o, rt), c = r.pow(s, e), f = r.mul(o, c), i = r.mul(r.mul(f, rt), c), u = r.mul(f, r.sub(i, r.ONE));
      if (!r.eql(r.sqr(u), o))
        throw new Error("Cannot find square root");
      return u;
    };
  }
  return Ge(n);
}
const $e = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function We(n) {
  const e = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, t = $e.reduce((r, o) => (r[o] = "function", r), e);
  return Et(n, t);
}
function Xe(n, e, t) {
  if (t < z)
    throw new Error("invalid exponent, negatives unsupported");
  if (t === z)
    return n.ONE;
  if (t === T)
    return e;
  let r = n.ONE, o = e;
  for (; t > z; )
    t & T && (r = n.mul(r, o)), o = n.sqr(o), t >>= T;
  return r;
}
function Qe(n, e) {
  const t = new Array(e.length), r = e.reduce((s, c, f) => n.is0(c) ? s : (t[f] = s, n.mul(s, c)), n.ONE), o = n.inv(r);
  return e.reduceRight((s, c, f) => n.is0(c) ? s : (t[f] = n.mul(s, t[f]), n.mul(s, c)), o), t;
}
function ae(n, e) {
  const t = e !== void 0 ? e : n.toString(2).length, r = Math.ceil(t / 8);
  return { nBitLength: t, nByteLength: r };
}
function ue(n, e, t = !1, r = {}) {
  if (n <= z)
    throw new Error("invalid field: expected ORDER > 0, got " + n);
  const { nBitLength: o, nByteLength: s } = ae(n, e);
  if (s > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let c;
  const f = Object.freeze({
    ORDER: n,
    isLE: t,
    BITS: o,
    BYTES: s,
    MASK: Kt(o),
    ZERO: z,
    ONE: T,
    create: (i) => V(i, n),
    isValid: (i) => {
      if (typeof i != "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof i);
      return z <= i && i < n;
    },
    is0: (i) => i === z,
    isOdd: (i) => (i & T) === T,
    neg: (i) => V(-i, n),
    eql: (i, u) => i === u,
    sqr: (i) => V(i * i, n),
    add: (i, u) => V(i + u, n),
    sub: (i, u) => V(i - u, n),
    mul: (i, u) => V(i * u, n),
    pow: (i, u) => Xe(f, i, u),
    div: (i, u) => V(i * Rt(u, n), n),
    // Same as above, but doesn't normalize
    sqrN: (i) => i * i,
    addN: (i, u) => i + u,
    subN: (i, u) => i - u,
    mulN: (i, u) => i * u,
    inv: (i) => Rt(i, n),
    sqrt: r.sqrt || ((i) => (c || (c = De(n)), c(f, i))),
    invertBatch: (i) => Qe(f, i),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (i, u, y) => y ? u : i,
    toBytes: (i) => t ? Ft(i, s) : wt(i, s),
    fromBytes: (i) => {
      if (i.length !== s)
        throw new Error("Field.fromBytes: expected " + s + " bytes, got " + i.length);
      return t ? Yt(i) : ot(i);
    }
  });
  return Object.freeze(f);
}
function le(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const e = n.toString(2).length;
  return Math.ceil(e / 8);
}
function de(n) {
  const e = le(n);
  return e + Math.ceil(e / 2);
}
function Je(n, e, t = !1) {
  const r = n.length, o = le(e), s = de(e);
  if (r < 16 || r < s || r > 1024)
    throw new Error("expected " + s + "-1024 bytes of input, got " + r);
  const c = t ? Yt(n) : ot(n), f = V(c, e - T) + T;
  return t ? Ft(f, o) : wt(f, o);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Qt = BigInt(0), vt = BigInt(1);
function Tt(n, e) {
  const t = e.negate();
  return n ? t : e;
}
function he(n, e) {
  if (!Number.isSafeInteger(n) || n <= 0 || n > e)
    throw new Error("invalid window size, expected [1.." + e + "], got W=" + n);
}
function _t(n, e) {
  he(n, e);
  const t = Math.ceil(e / n) + 1, r = ut(2, n - 1);
  return { windows: t, windowSize: r };
}
function tn(n, e) {
  if (!Array.isArray(n))
    throw new Error("array expected");
  n.forEach((t, r) => {
    if (!(t instanceof e))
      throw new Error("invalid point at index " + r);
  });
}
function en(n, e) {
  if (!Array.isArray(n))
    throw new Error("array of scalars expected");
  n.forEach((t, r) => {
    if (!e.isValid(t))
      throw new Error("invalid scalar at index " + r);
  });
}
const kt = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap();
function zt(n) {
  return ge.get(n) || 1;
}
function nn(n, e) {
  return {
    constTimeNegate: Tt,
    hasPrecomputes(t) {
      return zt(t) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(t, r, o = n.ZERO) {
      let s = t;
      for (; r > Qt; )
        r & vt && (o = o.add(s)), s = s.double(), r >>= vt;
      return o;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(t, r) {
      const { windows: o, windowSize: s } = _t(r, e), c = [];
      let f = t, i = f;
      for (let u = 0; u < o; u++) {
        i = f, c.push(i);
        for (let y = 1; y < s; y++)
          i = i.add(f), c.push(i);
        f = i.double();
      }
      return c;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(t, r, o) {
      const { windows: s, windowSize: c } = _t(t, e);
      let f = n.ZERO, i = n.BASE;
      const u = BigInt(ut(2, t) - 1), y = ut(2, t), h = BigInt(t);
      for (let l = 0; l < s; l++) {
        const m = l * c;
        let N = Number(o & u);
        o >>= h, N > c && (N -= y, o += vt);
        const b = m, a = m + Math.abs(N) - 1, g = l % 2 !== 0, x = N < 0;
        N === 0 ? i = i.add(Tt(g, r[b])) : f = f.add(Tt(x, r[a]));
      }
      return { p: f, f: i };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(t, r, o, s = n.ZERO) {
      const { windows: c, windowSize: f } = _t(t, e), i = BigInt(ut(2, t) - 1), u = ut(2, t), y = BigInt(t);
      for (let h = 0; h < c; h++) {
        const l = h * f;
        if (o === Qt)
          break;
        let m = Number(o & i);
        if (o >>= y, m > f && (m -= u, o += vt), m === 0)
          continue;
        let N = r[l + Math.abs(m) - 1];
        m < 0 && (N = N.negate()), s = s.add(N);
      }
      return s;
    },
    getPrecomputes(t, r, o) {
      let s = kt.get(r);
      return s || (s = this.precomputeWindow(r, t), t !== 1 && kt.set(r, o(s))), s;
    },
    wNAFCached(t, r, o) {
      const s = zt(t);
      return this.wNAF(s, this.getPrecomputes(s, t, o), r);
    },
    wNAFCachedUnsafe(t, r, o, s) {
      const c = zt(t);
      return c === 1 ? this.unsafeLadder(t, r, s) : this.wNAFUnsafe(c, this.getPrecomputes(c, t, o), r, s);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(t, r) {
      he(r, e), ge.set(t, r), kt.delete(t);
    }
  };
}
function rn(n, e, t, r) {
  if (tn(t, n), en(r, e), t.length !== r.length)
    throw new Error("arrays of points and scalars must have equal length");
  const o = n.ZERO, s = ie(BigInt(t.length)), c = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, f = (1 << c) - 1, i = new Array(f + 1).fill(o), u = Math.floor((e.BITS - 1) / c) * c;
  let y = o;
  for (let h = u; h >= 0; h -= c) {
    i.fill(o);
    for (let m = 0; m < r.length; m++) {
      const N = r[m], b = Number(N >> BigInt(h) & BigInt(f));
      i[b] = i[b].add(t[m]);
    }
    let l = o;
    for (let m = i.length - 1, N = o; m > 0; m--)
      N = N.add(i[m]), l = l.add(N);
    if (y = y.add(l), h !== 0)
      for (let m = 0; m < c; m++)
        y = y.double();
  }
  return y;
}
function we(n) {
  return We(n.Fp), Et(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze(Bt(D(D({}, ae(n.n, n.nBitLength)), n), {
    p: n.Fp.ORDER
  }));
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Jt(n) {
  n.lowS !== void 0 && dt("lowS", n.lowS), n.prehash !== void 0 && dt("prehash", n.prehash);
}
function on(n) {
  const e = we(n);
  Et(e, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo: t, Fp: r, a: o } = e;
  if (t) {
    if (!r.eql(o, r.ZERO))
      throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof t != "object" || typeof t.beta != "bigint" || typeof t.splitScalar != "function")
      throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze(D({}, e));
}
const { bytesToNumberBE: sn, hexToBytes: cn } = Fe;
class fn extends Error {
  constructor(e = "") {
    super(e);
  }
}
const W = {
  // asn.1 DER encoding utils
  Err: fn,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (n, e) => {
      const { Err: t } = W;
      if (n < 0 || n > 256)
        throw new t("tlv.encode: wrong tag");
      if (e.length & 1)
        throw new t("tlv.encode: unpadded data");
      const r = e.length / 2, o = lt(r);
      if (o.length / 2 & 128)
        throw new t("tlv.encode: long form length too big");
      const s = r > 127 ? lt(o.length / 2 | 128) : "";
      return lt(n) + s + o + e;
    },
    // v - value, l - left bytes (unparsed)
    decode(n, e) {
      const { Err: t } = W;
      let r = 0;
      if (n < 0 || n > 256)
        throw new t("tlv.encode: wrong tag");
      if (e.length < 2 || e[r++] !== n)
        throw new t("tlv.decode: wrong tlv");
      const o = e[r++], s = !!(o & 128);
      let c = 0;
      if (!s)
        c = o;
      else {
        const i = o & 127;
        if (!i)
          throw new t("tlv.decode(long): indefinite length not supported");
        if (i > 4)
          throw new t("tlv.decode(long): byte length is too big");
        const u = e.subarray(r, r + i);
        if (u.length !== i)
          throw new t("tlv.decode: length bytes not complete");
        if (u[0] === 0)
          throw new t("tlv.decode(long): zero leftmost byte");
        for (const y of u)
          c = c << 8 | y;
        if (r += i, c < 128)
          throw new t("tlv.decode(long): not minimal encoding");
      }
      const f = e.subarray(r, r + c);
      if (f.length !== c)
        throw new t("tlv.decode: wrong value length");
      return { v: f, l: e.subarray(r + c) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(n) {
      const { Err: e } = W;
      if (n < X)
        throw new e("integer: negative integers are not allowed");
      let t = lt(n);
      if (Number.parseInt(t[0], 16) & 8 && (t = "00" + t), t.length & 1)
        throw new e("unexpected DER parsing assertion: unpadded hex");
      return t;
    },
    decode(n) {
      const { Err: e } = W;
      if (n[0] & 128)
        throw new e("invalid signature integer: negative");
      if (n[0] === 0 && !(n[1] & 128))
        throw new e("invalid signature integer: unnecessary leading zero");
      return sn(n);
    }
  },
  toSig(n) {
    const { Err: e, _int: t, _tlv: r } = W, o = typeof n == "string" ? cn(n) : n;
    xt(o);
    const { v: s, l: c } = r.decode(48, o);
    if (c.length)
      throw new e("invalid signature: left bytes after parsing");
    const { v: f, l: i } = r.decode(2, s), { v: u, l: y } = r.decode(2, i);
    if (y.length)
      throw new e("invalid signature: left bytes after parsing");
    return { r: t.decode(f), s: t.decode(u) };
  },
  hexFromSig(n) {
    const { _tlv: e, _int: t } = W, r = e.encode(2, t.encode(n.r)), o = e.encode(2, t.encode(n.s)), s = r + o;
    return e.encode(48, s);
  }
}, X = BigInt(0), k = BigInt(1);
BigInt(2);
const te = BigInt(3);
BigInt(4);
function an(n) {
  const e = on(n), { Fp: t } = e, r = ue(e.n, e.nBitLength), o = e.toBytes || ((b, a, g) => {
    const x = a.toAffine();
    return mt(Uint8Array.from([4]), t.toBytes(x.x), t.toBytes(x.y));
  }), s = e.fromBytes || ((b) => {
    const a = b.subarray(1), g = t.fromBytes(a.subarray(0, t.BYTES)), x = t.fromBytes(a.subarray(t.BYTES, 2 * t.BYTES));
    return { x: g, y: x };
  });
  function c(b) {
    const { a, b: g } = e, x = t.sqr(b), E = t.mul(x, b);
    return t.add(t.add(E, t.mul(b, a)), g);
  }
  if (!t.eql(t.sqr(e.Gy), c(e.Gx)))
    throw new Error("bad generator point: equation left != right");
  function f(b) {
    return Nt(b, k, e.n);
  }
  function i(b) {
    const { allowedPrivateKeyLengths: a, nByteLength: g, wrapPrivateKey: x, n: E } = e;
    if (a && typeof b != "bigint") {
      if (st(b) && (b = ht(b)), typeof b != "string" || !a.includes(b.length))
        throw new Error("invalid private key");
      b = b.padStart(g * 2, "0");
    }
    let q;
    try {
      q = typeof b == "bigint" ? b : ot(K("private key", b, g));
    } catch (L) {
      throw new Error("invalid private key, expected hex or " + g + " bytes, got " + typeof b);
    }
    return x && (q = V(q, E)), it("private key", q, k, E), q;
  }
  function u(b) {
    if (!(b instanceof l))
      throw new Error("ProjectivePoint expected");
  }
  const y = Ct((b, a) => {
    const { px: g, py: x, pz: E } = b;
    if (t.eql(E, t.ONE))
      return { x: g, y: x };
    const q = b.is0();
    a == null && (a = q ? t.ONE : t.inv(E));
    const L = t.mul(g, a), I = t.mul(x, a), B = t.mul(E, a);
    if (q)
      return { x: t.ZERO, y: t.ZERO };
    if (!t.eql(B, t.ONE))
      throw new Error("invZ was invalid");
    return { x: L, y: I };
  }), h = Ct((b) => {
    if (b.is0()) {
      if (e.allowInfinityPoint && !t.is0(b.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: a, y: g } = b.toAffine();
    if (!t.isValid(a) || !t.isValid(g))
      throw new Error("bad point: x or y not FE");
    const x = t.sqr(g), E = c(a);
    if (!t.eql(x, E))
      throw new Error("bad point: equation left != right");
    if (!b.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class l {
    constructor(a, g, x) {
      if (this.px = a, this.py = g, this.pz = x, a == null || !t.isValid(a))
        throw new Error("x required");
      if (g == null || !t.isValid(g))
        throw new Error("y required");
      if (x == null || !t.isValid(x))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(a) {
      const { x: g, y: x } = a || {};
      if (!a || !t.isValid(g) || !t.isValid(x))
        throw new Error("invalid affine point");
      if (a instanceof l)
        throw new Error("projective point not allowed");
      const E = (q) => t.eql(q, t.ZERO);
      return E(g) && E(x) ? l.ZERO : new l(g, x, t.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(a) {
      const g = t.invertBatch(a.map((x) => x.pz));
      return a.map((x, E) => x.toAffine(g[E])).map(l.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(a) {
      const g = l.fromAffine(s(K("pointHex", a)));
      return g.assertValidity(), g;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(a) {
      return l.BASE.multiply(i(a));
    }
    // Multiscalar Multiplication
    static msm(a, g) {
      return rn(l, r, a, g);
    }
    // "Private method", don't use it directly
    _setWindowSize(a) {
      N.setWindowSize(this, a);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      h(this);
    }
    hasEvenY() {
      const { y: a } = this.toAffine();
      if (t.isOdd)
        return !t.isOdd(a);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(a) {
      u(a);
      const { px: g, py: x, pz: E } = this, { px: q, py: L, pz: I } = a, B = t.eql(t.mul(g, I), t.mul(q, E)), A = t.eql(t.mul(x, I), t.mul(L, E));
      return B && A;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new l(this.px, t.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b: g } = e, x = t.mul(g, te), { px: E, py: q, pz: L } = this;
      let I = t.ZERO, B = t.ZERO, A = t.ZERO, v = t.mul(E, E), C = t.mul(q, q), U = t.mul(L, L), H = t.mul(E, q);
      return H = t.add(H, H), A = t.mul(E, L), A = t.add(A, A), I = t.mul(a, A), B = t.mul(x, U), B = t.add(I, B), I = t.sub(C, B), B = t.add(C, B), B = t.mul(I, B), I = t.mul(H, I), A = t.mul(x, A), U = t.mul(a, U), H = t.sub(v, U), H = t.mul(a, H), H = t.add(H, A), A = t.add(v, v), v = t.add(A, v), v = t.add(v, U), v = t.mul(v, H), B = t.add(B, v), U = t.mul(q, L), U = t.add(U, U), v = t.mul(U, H), I = t.sub(I, v), A = t.mul(U, C), A = t.add(A, A), A = t.add(A, A), new l(I, B, A);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(a) {
      u(a);
      const { px: g, py: x, pz: E } = this, { px: q, py: L, pz: I } = a;
      let B = t.ZERO, A = t.ZERO, v = t.ZERO;
      const C = e.a, U = t.mul(e.b, te);
      let H = t.mul(g, q), j = t.mul(x, L), d = t.mul(E, I), w = t.add(g, x), p = t.add(q, L);
      w = t.mul(w, p), p = t.add(H, j), w = t.sub(w, p), p = t.add(g, E);
      let S = t.add(q, I);
      return p = t.mul(p, S), S = t.add(H, d), p = t.sub(p, S), S = t.add(x, E), B = t.add(L, I), S = t.mul(S, B), B = t.add(j, d), S = t.sub(S, B), v = t.mul(C, p), B = t.mul(U, d), v = t.add(B, v), B = t.sub(j, v), v = t.add(j, v), A = t.mul(B, v), j = t.add(H, H), j = t.add(j, H), d = t.mul(C, d), p = t.mul(U, p), j = t.add(j, d), d = t.sub(H, d), d = t.mul(C, d), p = t.add(p, d), H = t.mul(j, p), A = t.add(A, H), H = t.mul(S, p), B = t.mul(w, B), B = t.sub(B, H), H = t.mul(w, j), v = t.mul(S, v), v = t.add(v, H), new l(B, A, v);
    }
    subtract(a) {
      return this.add(a.negate());
    }
    is0() {
      return this.equals(l.ZERO);
    }
    wNAF(a) {
      return N.wNAFCached(this, a, l.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(a) {
      const { endo: g, n: x } = e;
      it("scalar", a, X, x);
      const E = l.ZERO;
      if (a === X)
        return E;
      if (this.is0() || a === k)
        return this;
      if (!g || N.hasPrecomputes(this))
        return N.wNAFCachedUnsafe(this, a, l.normalizeZ);
      let { k1neg: q, k1: L, k2neg: I, k2: B } = g.splitScalar(a), A = E, v = E, C = this;
      for (; L > X || B > X; )
        L & k && (A = A.add(C)), B & k && (v = v.add(C)), C = C.double(), L >>= k, B >>= k;
      return q && (A = A.negate()), I && (v = v.negate()), v = new l(t.mul(v.px, g.beta), v.py, v.pz), A.add(v);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(a) {
      const { endo: g, n: x } = e;
      it("scalar", a, k, x);
      let E, q;
      if (g) {
        const { k1neg: L, k1: I, k2neg: B, k2: A } = g.splitScalar(a);
        let { p: v, f: C } = this.wNAF(I), { p: U, f: H } = this.wNAF(A);
        v = N.constTimeNegate(L, v), U = N.constTimeNegate(B, U), U = new l(t.mul(U.px, g.beta), U.py, U.pz), E = v.add(U), q = C.add(H);
      } else {
        const { p: L, f: I } = this.wNAF(a);
        E = L, q = I;
      }
      return l.normalizeZ([E, q])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(a, g, x) {
      const E = l.BASE, q = (I, B) => B === X || B === k || !I.equals(E) ? I.multiplyUnsafe(B) : I.multiply(B), L = q(this, g).add(q(a, x));
      return L.is0() ? void 0 : L;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(a) {
      return y(this, a);
    }
    isTorsionFree() {
      const { h: a, isTorsionFree: g } = e;
      if (a === k)
        return !0;
      if (g)
        return g(l, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: a, clearCofactor: g } = e;
      return a === k ? this : g ? g(l, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(a = !0) {
      return dt("isCompressed", a), this.assertValidity(), o(l, this, a);
    }
    toHex(a = !0) {
      return dt("isCompressed", a), ht(this.toRawBytes(a));
    }
  }
  l.BASE = new l(e.Gx, e.Gy, t.ONE), l.ZERO = new l(t.ZERO, t.ONE, t.ZERO);
  const m = e.nBitLength, N = nn(l, e.endo ? Math.ceil(m / 2) : m);
  return {
    CURVE: e,
    ProjectivePoint: l,
    normPrivateKeyToScalar: i,
    weierstrassEquation: c,
    isWithinCurveOrder: f
  };
}
function un(n) {
  const e = we(n);
  return Et(e, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze(D({ lowS: !0 }, e));
}
function ln(n) {
  const e = un(n), { Fp: t, n: r } = e, o = t.BYTES + 1, s = 2 * t.BYTES + 1;
  function c(d) {
    return V(d, r);
  }
  function f(d) {
    return Rt(d, r);
  }
  const { ProjectivePoint: i, normPrivateKeyToScalar: u, weierstrassEquation: y, isWithinCurveOrder: h } = an(Bt(D({}, e), {
    toBytes(d, w, p) {
      const S = w.toAffine(), O = t.toBytes(S.x), _ = mt;
      return dt("isCompressed", p), p ? _(Uint8Array.from([w.hasEvenY() ? 2 : 3]), O) : _(Uint8Array.from([4]), O, t.toBytes(S.y));
    },
    fromBytes(d) {
      const w = d.length, p = d[0], S = d.subarray(1);
      if (w === o && (p === 2 || p === 3)) {
        const O = ot(S);
        if (!Nt(O, k, t.ORDER))
          throw new Error("Point is not on curve");
        const _ = y(O);
        let R;
        try {
          R = t.sqrt(_);
        } catch (F) {
          const M = F instanceof Error ? ": " + F.message : "";
          throw new Error("Point is not on curve" + M);
        }
        const Z = (R & k) === k;
        return (p & 1) === 1 !== Z && (R = t.neg(R)), { x: O, y: R };
      } else if (w === s && p === 4) {
        const O = t.fromBytes(S.subarray(0, t.BYTES)), _ = t.fromBytes(S.subarray(t.BYTES, 2 * t.BYTES));
        return { x: O, y: _ };
      } else {
        const O = o, _ = s;
        throw new Error("invalid Point, expected length of " + O + ", or uncompressed " + _ + ", got " + w);
      }
    }
  })), l = (d) => ht(wt(d, e.nByteLength));
  function m(d) {
    const w = r >> k;
    return d > w;
  }
  function N(d) {
    return m(d) ? c(-d) : d;
  }
  const b = (d, w, p) => ot(d.slice(w, p));
  class a {
    constructor(w, p, S) {
      this.r = w, this.s = p, this.recovery = S, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(w) {
      const p = e.nByteLength;
      return w = K("compactSignature", w, p * 2), new a(b(w, 0, p), b(w, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(w) {
      const { r: p, s: S } = W.toSig(K("DER", w));
      return new a(p, S);
    }
    assertValidity() {
      it("r", this.r, k, r), it("s", this.s, k, r);
    }
    addRecoveryBit(w) {
      return new a(this.r, this.s, w);
    }
    recoverPublicKey(w) {
      const { r: p, s: S, recovery: O } = this, _ = I(K("msgHash", w));
      if (O == null || ![0, 1, 2, 3].includes(O))
        throw new Error("recovery id invalid");
      const R = O === 2 || O === 3 ? p + e.n : p;
      if (R >= t.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const Z = (O & 1) === 0 ? "02" : "03", G = i.fromHex(Z + l(R)), F = f(R), M = c(-_ * F), ct = c(S * F), Q = i.BASE.multiplyAndAddUnsafe(G, M, ct);
      if (!Q)
        throw new Error("point at infinify");
      return Q.assertValidity(), Q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return m(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new a(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return gt(this.toDERHex());
    }
    toDERHex() {
      return W.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return gt(this.toCompactHex());
    }
    toCompactHex() {
      return l(this.r) + l(this.s);
    }
  }
  const g = {
    isValidPrivateKey(d) {
      try {
        return u(d), !0;
      } catch (w) {
        return !1;
      }
    },
    normPrivateKeyToScalar: u,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const d = de(e.n);
      return Je(e.randomBytes(d), e.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(d = 8, w = i.BASE) {
      return w._setWindowSize(d), w.multiply(BigInt(3)), w;
    }
  };
  function x(d, w = !0) {
    return i.fromPrivateKey(d).toRawBytes(w);
  }
  function E(d) {
    const w = st(d), p = typeof d == "string", S = (w || p) && d.length;
    return w ? S === o || S === s : p ? S === 2 * o || S === 2 * s : d instanceof i;
  }
  function q(d, w, p = !0) {
    if (E(d))
      throw new Error("first arg must be private key");
    if (!E(w))
      throw new Error("second arg must be public key");
    return i.fromHex(w).multiply(u(d)).toRawBytes(p);
  }
  const L = e.bits2int || function(d) {
    if (d.length > 8192)
      throw new Error("input is too large");
    const w = ot(d), p = d.length * 8 - e.nBitLength;
    return p > 0 ? w >> BigInt(p) : w;
  }, I = e.bits2int_modN || function(d) {
    return c(L(d));
  }, B = Kt(e.nBitLength);
  function A(d) {
    return it("num < 2^" + e.nBitLength, d, X, B), wt(d, e.nByteLength);
  }
  function v(d, w, p = C) {
    if (["recovered", "canonical"].some((et) => et in p))
      throw new Error("sign() legacy options not supported");
    const { hash: S, randomBytes: O } = e;
    let { lowS: _, prehash: R, extraEntropy: Z } = p;
    _ == null && (_ = !0), d = K("msgHash", d), Jt(p), R && (d = K("prehashed msgHash", S(d)));
    const G = I(d), F = u(w), M = [A(F), A(G)];
    if (Z != null && Z !== !1) {
      const et = Z === !0 ? O(t.BYTES) : Z;
      M.push(K("extraEntropy", et));
    }
    const ct = mt(...M), Q = G;
    function qt(et) {
      const ft = L(et);
      if (!h(ft))
        return;
      const Ot = f(ft), pt = i.BASE.multiply(ft).toAffine(), nt = c(pt.x);
      if (nt === X)
        return;
      const bt = c(Ot * c(Q + nt * F));
      if (bt === X)
        return;
      let yt = (pt.x === nt ? 0 : 2) | Number(pt.y & k), at = bt;
      return _ && m(bt) && (at = N(bt), yt ^= 1), new a(nt, at, yt);
    }
    return { seed: ct, k2sig: qt };
  }
  const C = { lowS: e.lowS, prehash: !1 }, U = { lowS: e.lowS, prehash: !1 };
  function H(d, w, p = C) {
    const { seed: S, k2sig: O } = v(d, w, p), _ = e;
    return se(_.hash.outputLen, _.nByteLength, _.hmac)(S, O);
  }
  i.BASE._setWindowSize(8);
  function j(d, w, p, S = U) {
    var yt;
    const O = d;
    w = K("msgHash", w), p = K("publicKey", p);
    const { lowS: _, prehash: R, format: Z } = S;
    if (Jt(S), "strict" in S)
      throw new Error("options.strict was renamed to lowS");
    if (Z !== void 0 && Z !== "compact" && Z !== "der")
      throw new Error("format must be compact or der");
    const G = typeof O == "string" || st(O), F = !G && !Z && typeof O == "object" && O !== null && typeof O.r == "bigint" && typeof O.s == "bigint";
    if (!G && !F)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let M, ct;
    try {
      if (F && (M = new a(O.r, O.s)), G) {
        try {
          Z !== "compact" && (M = a.fromDER(O));
        } catch (at) {
          if (!(at instanceof W.Err))
            throw at;
        }
        !M && Z !== "der" && (M = a.fromCompact(O));
      }
      ct = i.fromHex(p);
    } catch (at) {
      return !1;
    }
    if (!M || _ && M.hasHighS())
      return !1;
    R && (w = e.hash(w));
    const { r: Q, s: qt } = M, et = I(w), ft = f(qt), Ot = c(et * ft), pt = c(Q * ft), nt = (yt = i.BASE.multiplyAndAddUnsafe(ct, Ot, pt)) == null ? void 0 : yt.toAffine();
    return nt ? c(nt.x) === Q : !1;
  }
  return {
    CURVE: e,
    getPublicKey: x,
    getSharedSecret: q,
    sign: H,
    verify: j,
    ProjectivePoint: i,
    Signature: a,
    utils: g
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function dn(n) {
  return {
    hash: n,
    hmac: (e, ...t) => fe(n, e, Ne(...t)),
    randomBytes: Ie
  };
}
function hn(n, e) {
  const t = (r) => ln(D(D({}, n), dn(r)));
  return Bt(D({}, t(e)), { create: t });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const pe = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), ee = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), gn = BigInt(1), Mt = BigInt(2), ne = (n, e) => (n + e / Mt) / e;
function wn(n) {
  const e = pe, t = BigInt(3), r = BigInt(6), o = BigInt(11), s = BigInt(22), c = BigInt(23), f = BigInt(44), i = BigInt(88), u = n * n * n % e, y = u * u * n % e, h = Y(y, t, e) * y % e, l = Y(h, t, e) * y % e, m = Y(l, Mt, e) * u % e, N = Y(m, o, e) * m % e, b = Y(N, s, e) * N % e, a = Y(b, f, e) * b % e, g = Y(a, i, e) * a % e, x = Y(g, f, e) * b % e, E = Y(x, t, e) * y % e, q = Y(E, c, e) * N % e, L = Y(q, r, e) * u % e, I = Y(L, Mt, e);
  if (!Vt.eql(Vt.sqr(I), n))
    throw new Error("Cannot find square root");
  return I;
}
const Vt = ue(pe, void 0, void 0, { sqrt: wn }), pn = hn({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  Fp: Vt,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: ee,
  // Curve order, total count of valid points in the field
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  // Cofactor
  lowS: !0,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (n) => {
      const e = ee, t = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -gn * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), o = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), s = t, c = BigInt("0x100000000000000000000000000000000"), f = ne(s * n, e), i = ne(-r * n, e);
      let u = V(n - f * t - i * o, e), y = V(-f * r - i * s, e);
      const h = u > c, l = y > c;
      if (h && (u = e - u), l && (y = e - y), u > c || y > c)
        throw new Error("splitScalar: Endomorphism failed, k=" + n);
      return { k1neg: h, k1: u, k2neg: l, k2: y };
    }
  }
}, _e);
BigInt(0);
pn.ProjectivePoint;
export {
  pn as secp256k1
};
