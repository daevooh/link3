var cy = Object.defineProperty, ly = Object.defineProperties;
var uy = Object.getOwnPropertyDescriptors;
var aa = Object.getOwnPropertySymbols, dy = Object.getPrototypeOf, vd = Object.prototype.hasOwnProperty, Ed = Object.prototype.propertyIsEnumerable, hy = Reflect.get;
var Je = Math.pow, bd = (t, e, r) => e in t ? cy(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, C = (t, e) => {
  for (var r in e || (e = {}))
    vd.call(e, r) && bd(t, r, e[r]);
  if (aa)
    for (var r of aa(e))
      Ed.call(e, r) && bd(t, r, e[r]);
  return t;
}, B = (t, e) => ly(t, uy(e));
var us = (t, e) => {
  var r = {};
  for (var s in t)
    vd.call(t, s) && e.indexOf(s) < 0 && (r[s] = t[s]);
  if (t != null && aa)
    for (var s of aa(t))
      e.indexOf(s) < 0 && Ed.call(t, s) && (r[s] = t[s]);
  return r;
};
var _d = (t, e, r) => hy(dy(t), r, e);
var h = (t, e, r) => new Promise((s, n) => {
  var i = (c) => {
    try {
      a(r.next(c));
    } catch (l) {
      n(l);
    }
  }, o = (c) => {
    try {
      a(r.throw(c));
    } catch (l) {
      n(l);
    }
  }, a = (c) => c.done ? s(c.value) : Promise.resolve(c.value).then(i, o);
  a((r = r.apply(t, e)).next());
});
const py = Symbol(), Cd = Object.getPrototypeOf, Fl = /* @__PURE__ */ new WeakMap(), fy = (t) => t && (Fl.has(t) ? Fl.get(t) : Cd(t) === Object.prototype || Cd(t) === Array.prototype), gy = (t) => fy(t) && t[py] || null, Ad = (t, e = !0) => {
  Fl.set(t, e);
}, Ha = {}, Uc = (t) => typeof t == "object" && t !== null, ws = /* @__PURE__ */ new WeakMap(), $i = /* @__PURE__ */ new WeakSet(), my = (t = Object.is, e = (l, u) => new Proxy(l, u), r = (l) => Uc(l) && !$i.has(l) && (Array.isArray(l) || !(Symbol.iterator in l)) && !(l instanceof WeakMap) && !(l instanceof WeakSet) && !(l instanceof Error) && !(l instanceof Number) && !(l instanceof Date) && !(l instanceof String) && !(l instanceof RegExp) && !(l instanceof ArrayBuffer), s = (l) => {
  switch (l.status) {
    case "fulfilled":
      return l.value;
    case "rejected":
      throw l.reason;
    default:
      throw l;
  }
}, n = /* @__PURE__ */ new WeakMap(), i = (l, u, d = s) => {
  const p = n.get(l);
  if ((p == null ? void 0 : p[0]) === u)
    return p[1];
  const g = Array.isArray(l) ? [] : Object.create(Object.getPrototypeOf(l));
  return Ad(g, !0), n.set(l, [u, g]), Reflect.ownKeys(l).forEach((m) => {
    if (Object.getOwnPropertyDescriptor(g, m))
      return;
    const f = Reflect.get(l, m), { enumerable: w } = Reflect.getOwnPropertyDescriptor(
      l,
      m
    ), S = {
      value: f,
      enumerable: w,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if ($i.has(f))
      Ad(f, !1);
    else if (f instanceof Promise)
      delete S.value, S.get = () => d(f);
    else if (ws.has(f)) {
      const [E, I] = ws.get(
        f
      );
      S.value = i(
        E,
        I(),
        d
      );
    }
    Object.defineProperty(g, m, S);
  }), Object.preventExtensions(g);
}, o = /* @__PURE__ */ new WeakMap(), a = [1, 1], c = (l) => {
  if (!Uc(l))
    throw new Error("object required");
  const u = o.get(l);
  if (u)
    return u;
  let d = a[0];
  const p = /* @__PURE__ */ new Set(), g = (O, x = ++a[0]) => {
    d !== x && (d = x, p.forEach(($) => $(O, x)));
  };
  let m = a[1];
  const f = (O = ++a[1]) => (m !== O && !p.size && (m = O, S.forEach(([x]) => {
    const $ = x[1](O);
    $ > d && (d = $);
  })), d), w = (O) => (x, $) => {
    const F = [...x];
    F[1] = [O, ...F[1]], g(F, $);
  }, S = /* @__PURE__ */ new Map(), E = (O, x) => {
    if ((Ha ? "production" : void 0) !== "production" && S.has(O))
      throw new Error("prop listener already exists");
    if (p.size) {
      const $ = x[3](w(O));
      S.set(O, [x, $]);
    } else
      S.set(O, [x]);
  }, I = (O) => {
    var x;
    const $ = S.get(O);
    $ && (S.delete(O), (x = $[1]) == null || x.call($));
  }, A = (O) => (p.add(O), p.size === 1 && S.forEach(([$, F], W) => {
    if ((Ha ? "production" : void 0) !== "production" && F)
      throw new Error("remove already exists");
    const k = $[3](w(W));
    S.set(W, [$, k]);
  }), () => {
    p.delete(O), p.size === 0 && S.forEach(([$, F], W) => {
      F && (F(), S.set(W, [$]));
    });
  }), T = Array.isArray(l) ? [] : Object.create(Object.getPrototypeOf(l)), N = e(T, {
    deleteProperty(O, x) {
      const $ = Reflect.get(O, x);
      I(x);
      const F = Reflect.deleteProperty(O, x);
      return F && g(["delete", [x], $]), F;
    },
    set(O, x, $, F) {
      const W = Reflect.has(O, x), k = Reflect.get(O, x, F);
      if (W && (t(k, $) || o.has($) && t(k, o.get($))))
        return !0;
      I(x), Uc($) && ($ = gy($) || $);
      let v = $;
      if ($ instanceof Promise)
        $.then((_) => {
          $.status = "fulfilled", $.value = _, g(["resolve", [x], _]);
        }).catch((_) => {
          $.status = "rejected", $.reason = _, g(["reject", [x], _]);
        });
      else {
        !ws.has($) && r($) && (v = c($));
        const _ = !$i.has(v) && ws.get(v);
        _ && E(x, _);
      }
      return Reflect.set(O, x, v, F), g(["set", [x], $, k]), !0;
    }
  });
  o.set(l, N);
  const P = [
    T,
    f,
    i,
    A
  ];
  return ws.set(N, P), Reflect.ownKeys(l).forEach((O) => {
    const x = Object.getOwnPropertyDescriptor(
      l,
      O
    );
    "value" in x && (N[O] = l[O], delete x.value, delete x.writable), Object.defineProperty(T, O, x);
  }), N;
}) => [
  // public functions
  c,
  // shared state
  ws,
  $i,
  // internal things
  t,
  e,
  r,
  s,
  n,
  i,
  o,
  a
], [wy] = my();
function Ye(t = {}) {
  return wy(t);
}
function Dt(t, e, r) {
  const s = ws.get(t);
  (Ha ? "production" : void 0) !== "production" && !s && console.warn("Please use proxy object");
  let n;
  const i = [], o = s[3];
  let a = !1;
  const l = o((u) => {
    i.push(u), n || (n = Promise.resolve().then(() => {
      n = void 0, a && e(i.splice(0));
    }));
  });
  return a = !0, () => {
    a = !1, l();
  };
}
function Xi(t, e) {
  const r = ws.get(t);
  (Ha ? "production" : void 0) !== "production" && !r && console.warn("Please use proxy object");
  const [s, n, i] = r;
  return i(s, n(), e);
}
function en(t) {
  return $i.add(t), t;
}
function Wt(t, e, r, s) {
  let n = t[e];
  return Dt(
    t,
    () => {
      const i = t[e];
      Object.is(n, i) || r(n = i);
    }
  );
}
function yy(t) {
  const e = Ye({
    data: Array.from([]),
    has(r) {
      return this.data.some((s) => s[0] === r);
    },
    set(r, s) {
      const n = this.data.find((i) => i[0] === r);
      return n ? n[1] = s : this.data.push([r, s]), this;
    },
    get(r) {
      var s;
      return (s = this.data.find((n) => n[0] === r)) == null ? void 0 : s[1];
    },
    delete(r) {
      const s = this.data.findIndex((n) => n[0] === r);
      return s === -1 ? !1 : (this.data.splice(s, 1), !0);
    },
    clear() {
      this.data.splice(0);
    },
    get size() {
      return this.data.length;
    },
    toJSON() {
      return new Map(this.data);
    },
    forEach(r) {
      this.data.forEach((s) => {
        r(s[1], s[0], this);
      });
    },
    keys() {
      return this.data.map((r) => r[0]).values();
    },
    values() {
      return this.data.map((r) => r[1]).values();
    },
    entries() {
      return new Map(this.data).entries();
    },
    get [Symbol.toStringTag]() {
      return "Map";
    },
    [Symbol.iterator]() {
      return this.entries();
    }
  });
  return Object.defineProperties(e, {
    data: {
      enumerable: !1
    },
    size: {
      enumerable: !1
    },
    toJSON: {
      enumerable: !1
    }
  }), Object.seal(e), e;
}
var Mr = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function Du(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function by(t) {
  if (Object.prototype.hasOwnProperty.call(t, "__esModule")) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function s() {
      return this instanceof s ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(s) {
    var n = Object.getOwnPropertyDescriptor(t, s);
    Object.defineProperty(r, s, n.get ? n : {
      enumerable: !0,
      get: function() {
        return t[s];
      }
    });
  }), r;
}
const rg = {
  caipNetworkIdToNumber(t) {
    return t ? Number(t.split(":")[1]) : void 0;
  },
  parseEvmChainId(t) {
    return typeof t == "string" ? this.caipNetworkIdToNumber(t) : t;
  },
  getNetworksByNamespace(t, e) {
    return (t == null ? void 0 : t.filter((r) => r.chainNamespace === e)) || [];
  },
  getFirstNetworkByNamespace(t, e) {
    return this.getNetworksByNamespace(t, e)[0];
  }
};
var vy = 20, Ey = 1, li = 1e6, _y = 1e6, Cy = -7, Ay = 21, Sy = !1, zo = "[big.js] ", dn = zo + "Invalid ", fc = dn + "decimal places", Iy = dn + "rounding mode", sg = zo + "Division by zero", $e = {}, jr = void 0, Ny = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
function ng() {
  function t(e) {
    var r = this;
    if (!(r instanceof t)) return e === jr ? ng() : new t(e);
    if (e instanceof t)
      r.s = e.s, r.e = e.e, r.c = e.c.slice();
    else {
      if (typeof e != "string") {
        if (t.strict === !0 && typeof e != "bigint")
          throw TypeError(dn + "value");
        e = e === 0 && 1 / e < 0 ? "-0" : String(e);
      }
      Ty(r, e);
    }
    r.constructor = t;
  }
  return t.prototype = $e, t.DP = vy, t.RM = Ey, t.NE = Cy, t.PE = Ay, t.strict = Sy, t.roundDown = 0, t.roundHalfUp = 1, t.roundHalfEven = 2, t.roundUp = 3, t;
}
function Ty(t, e) {
  var r, s, n;
  if (!Ny.test(e))
    throw Error(dn + "number");
  for (t.s = e.charAt(0) == "-" ? (e = e.slice(1), -1) : 1, (r = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (s = e.search(/e/i)) > 0 ? (r < 0 && (r = s), r += +e.slice(s + 1), e = e.substring(0, s)) : r < 0 && (r = e.length), n = e.length, s = 0; s < n && e.charAt(s) == "0"; ) ++s;
  if (s == n)
    t.c = [t.e = 0];
  else {
    for (; n > 0 && e.charAt(--n) == "0"; ) ;
    for (t.e = r - s - 1, t.c = [], r = 0; s <= n; ) t.c[r++] = +e.charAt(s++);
  }
  return t;
}
function hn(t, e, r, s) {
  var n = t.c;
  if (r === jr && (r = t.constructor.RM), r !== 0 && r !== 1 && r !== 2 && r !== 3)
    throw Error(Iy);
  if (e < 1)
    s = r === 3 && (s || !!n[0]) || e === 0 && (r === 1 && n[0] >= 5 || r === 2 && (n[0] > 5 || n[0] === 5 && (s || n[1] !== jr))), n.length = 1, s ? (t.e = t.e - e + 1, n[0] = 1) : n[0] = t.e = 0;
  else if (e < n.length) {
    if (s = r === 1 && n[e] >= 5 || r === 2 && (n[e] > 5 || n[e] === 5 && (s || n[e + 1] !== jr || n[e - 1] & 1)) || r === 3 && (s || !!n[0]), n.length = e, s) {
      for (; ++n[--e] > 9; )
        if (n[e] = 0, e === 0) {
          ++t.e, n.unshift(1);
          break;
        }
    }
    for (e = n.length; !n[--e]; ) n.pop();
  }
  return t;
}
function pn(t, e, r) {
  var s = t.e, n = t.c.join(""), i = n.length;
  if (e)
    n = n.charAt(0) + (i > 1 ? "." + n.slice(1) : "") + (s < 0 ? "e" : "e+") + s;
  else if (s < 0) {
    for (; ++s; ) n = "0" + n;
    n = "0." + n;
  } else if (s > 0)
    if (++s > i)
      for (s -= i; s--; ) n += "0";
    else s < i && (n = n.slice(0, s) + "." + n.slice(s));
  else i > 1 && (n = n.charAt(0) + "." + n.slice(1));
  return t.s < 0 && r ? "-" + n : n;
}
$e.abs = function() {
  var t = new this.constructor(this);
  return t.s = 1, t;
};
$e.cmp = function(t) {
  var e, r = this, s = r.c, n = (t = new r.constructor(t)).c, i = r.s, o = t.s, a = r.e, c = t.e;
  if (!s[0] || !n[0]) return s[0] ? i : n[0] ? -o : 0;
  if (i != o) return i;
  if (e = i < 0, a != c) return a > c ^ e ? 1 : -1;
  for (o = (a = s.length) < (c = n.length) ? a : c, i = -1; ++i < o; )
    if (s[i] != n[i]) return s[i] > n[i] ^ e ? 1 : -1;
  return a == c ? 0 : a > c ^ e ? 1 : -1;
};
$e.div = function(t) {
  var e = this, r = e.constructor, s = e.c, n = (t = new r(t)).c, i = e.s == t.s ? 1 : -1, o = r.DP;
  if (o !== ~~o || o < 0 || o > li)
    throw Error(fc);
  if (!n[0])
    throw Error(sg);
  if (!s[0])
    return t.s = i, t.c = [t.e = 0], t;
  var a, c, l, u, d, p = n.slice(), g = a = n.length, m = s.length, f = s.slice(0, a), w = f.length, S = t, E = S.c = [], I = 0, A = o + (S.e = e.e - t.e) + 1;
  for (S.s = i, i = A < 0 ? 0 : A, p.unshift(0); w++ < a; ) f.push(0);
  do {
    for (l = 0; l < 10; l++) {
      if (a != (w = f.length))
        u = a > w ? 1 : -1;
      else
        for (d = -1, u = 0; ++d < a; )
          if (n[d] != f[d]) {
            u = n[d] > f[d] ? 1 : -1;
            break;
          }
      if (u < 0) {
        for (c = w == a ? n : p; w; ) {
          if (f[--w] < c[w]) {
            for (d = w; d && !f[--d]; ) f[d] = 9;
            --f[d], f[w] += 10;
          }
          f[w] -= c[w];
        }
        for (; !f[0]; ) f.shift();
      } else
        break;
    }
    E[I++] = u ? l : ++l, f[0] && u ? f[w] = s[g] || 0 : f = [s[g]];
  } while ((g++ < m || f[0] !== jr) && i--);
  return !E[0] && I != 1 && (E.shift(), S.e--, A--), I > A && hn(S, A, r.RM, f[0] !== jr), S;
};
$e.eq = function(t) {
  return this.cmp(t) === 0;
};
$e.gt = function(t) {
  return this.cmp(t) > 0;
};
$e.gte = function(t) {
  return this.cmp(t) > -1;
};
$e.lt = function(t) {
  return this.cmp(t) < 0;
};
$e.lte = function(t) {
  return this.cmp(t) < 1;
};
$e.minus = $e.sub = function(t) {
  var e, r, s, n, i = this, o = i.constructor, a = i.s, c = (t = new o(t)).s;
  if (a != c)
    return t.s = -c, i.plus(t);
  var l = i.c.slice(), u = i.e, d = t.c, p = t.e;
  if (!l[0] || !d[0])
    return d[0] ? t.s = -c : l[0] ? t = new o(i) : t.s = 1, t;
  if (a = u - p) {
    for ((n = a < 0) ? (a = -a, s = l) : (p = u, s = d), s.reverse(), c = a; c--; ) s.push(0);
    s.reverse();
  } else
    for (r = ((n = l.length < d.length) ? l : d).length, a = c = 0; c < r; c++)
      if (l[c] != d[c]) {
        n = l[c] < d[c];
        break;
      }
  if (n && (s = l, l = d, d = s, t.s = -t.s), (c = (r = d.length) - (e = l.length)) > 0) for (; c--; ) l[e++] = 0;
  for (c = e; r > a; ) {
    if (l[--r] < d[r]) {
      for (e = r; e && !l[--e]; ) l[e] = 9;
      --l[e], l[r] += 10;
    }
    l[r] -= d[r];
  }
  for (; l[--c] === 0; ) l.pop();
  for (; l[0] === 0; )
    l.shift(), --p;
  return l[0] || (t.s = 1, l = [p = 0]), t.c = l, t.e = p, t;
};
$e.mod = function(t) {
  var e, r = this, s = r.constructor, n = r.s, i = (t = new s(t)).s;
  if (!t.c[0])
    throw Error(sg);
  return r.s = t.s = 1, e = t.cmp(r) == 1, r.s = n, t.s = i, e ? new s(r) : (n = s.DP, i = s.RM, s.DP = s.RM = 0, r = r.div(t), s.DP = n, s.RM = i, this.minus(r.times(t)));
};
$e.neg = function() {
  var t = new this.constructor(this);
  return t.s = -t.s, t;
};
$e.plus = $e.add = function(t) {
  var e, r, s, n = this, i = n.constructor;
  if (t = new i(t), n.s != t.s)
    return t.s = -t.s, n.minus(t);
  var o = n.e, a = n.c, c = t.e, l = t.c;
  if (!a[0] || !l[0])
    return l[0] || (a[0] ? t = new i(n) : t.s = n.s), t;
  if (a = a.slice(), e = o - c) {
    for (e > 0 ? (c = o, s = l) : (e = -e, s = a), s.reverse(); e--; ) s.push(0);
    s.reverse();
  }
  for (a.length - l.length < 0 && (s = l, l = a, a = s), e = l.length, r = 0; e; a[e] %= 10) r = (a[--e] = a[e] + l[e] + r) / 10 | 0;
  for (r && (a.unshift(r), ++c), e = a.length; a[--e] === 0; ) a.pop();
  return t.c = a, t.e = c, t;
};
$e.pow = function(t) {
  var e = this, r = new e.constructor("1"), s = r, n = t < 0;
  if (t !== ~~t || t < -1e6 || t > _y)
    throw Error(dn + "exponent");
  for (n && (t = -t); t & 1 && (s = s.times(e)), t >>= 1, !!t; )
    e = e.times(e);
  return n ? r.div(s) : s;
};
$e.prec = function(t, e) {
  if (t !== ~~t || t < 1 || t > li)
    throw Error(dn + "precision");
  return hn(new this.constructor(this), t, e);
};
$e.round = function(t, e) {
  if (t === jr) t = 0;
  else if (t !== ~~t || t < -1e6 || t > li)
    throw Error(fc);
  return hn(new this.constructor(this), t + this.e + 1, e);
};
$e.sqrt = function() {
  var t, e, r, s = this, n = s.constructor, i = s.s, o = s.e, a = new n("0.5");
  if (!s.c[0]) return new n(s);
  if (i < 0)
    throw Error(zo + "No square root");
  i = Math.sqrt(+pn(s, !0, !0)), i === 0 || i === 1 / 0 ? (e = s.c.join(""), e.length + o & 1 || (e += "0"), i = Math.sqrt(e), o = ((o + 1) / 2 | 0) - (o < 0 || o & 1), t = new n((i == 1 / 0 ? "5e" : (i = i.toExponential()).slice(0, i.indexOf("e") + 1)) + o)) : t = new n(i + ""), o = t.e + (n.DP += 4);
  do
    r = t, t = a.times(r.plus(s.div(r)));
  while (r.c.slice(0, o).join("") !== t.c.slice(0, o).join(""));
  return hn(t, (n.DP -= 4) + t.e + 1, n.RM);
};
$e.times = $e.mul = function(t) {
  var e, r = this, s = r.constructor, n = r.c, i = (t = new s(t)).c, o = n.length, a = i.length, c = r.e, l = t.e;
  if (t.s = r.s == t.s ? 1 : -1, !n[0] || !i[0])
    return t.c = [t.e = 0], t;
  for (t.e = c + l, o < a && (e = n, n = i, i = e, l = o, o = a, a = l), e = new Array(l = o + a); l--; ) e[l] = 0;
  for (c = a; c--; ) {
    for (a = 0, l = o + c; l > c; )
      a = e[l] + i[c] * n[l - c - 1] + a, e[l--] = a % 10, a = a / 10 | 0;
    e[l] = a;
  }
  for (a ? ++t.e : e.shift(), c = e.length; !e[--c]; ) e.pop();
  return t.c = e, t;
};
$e.toExponential = function(t, e) {
  var r = this, s = r.c[0];
  if (t !== jr) {
    if (t !== ~~t || t < 0 || t > li)
      throw Error(fc);
    for (r = hn(new r.constructor(r), ++t, e); r.c.length < t; ) r.c.push(0);
  }
  return pn(r, !0, !!s);
};
$e.toFixed = function(t, e) {
  var r = this, s = r.c[0];
  if (t !== jr) {
    if (t !== ~~t || t < 0 || t > li)
      throw Error(fc);
    for (r = hn(new r.constructor(r), t + r.e + 1, e), t = t + r.e + 1; r.c.length < t; ) r.c.push(0);
  }
  return pn(r, !1, !!s);
};
$e[Symbol.for("nodejs.util.inspect.custom")] = $e.toJSON = $e.toString = function() {
  var t = this, e = t.constructor;
  return pn(t, t.e <= e.NE || t.e >= e.PE, !!t.c[0]);
};
$e.toNumber = function() {
  var t = +pn(this, !0, !0);
  if (this.constructor.strict === !0 && !this.eq(t.toString()))
    throw Error(zo + "Imprecise conversion");
  return t;
};
$e.toPrecision = function(t, e) {
  var r = this, s = r.constructor, n = r.c[0];
  if (t !== jr) {
    if (t !== ~~t || t < 1 || t > li)
      throw Error(dn + "precision");
    for (r = hn(new s(r), t, e); r.c.length < t; ) r.c.push(0);
  }
  return pn(r, t <= r.e || r.e <= s.NE || r.e >= s.PE, !!n);
};
$e.valueOf = function() {
  var t = this, e = t.constructor;
  if (e.strict === !0)
    throw Error(zo + "valueOf disallowed");
  return pn(t, t.e <= e.NE || t.e >= e.PE, !0);
};
var yi = ng();
const Oy = {
  bigNumber(t) {
    return t ? new yi(t) : new yi(0);
  },
  multiply(t, e) {
    if (t === void 0 || e === void 0)
      return new yi(0);
    const r = new yi(t), s = new yi(e);
    return r.times(s);
  },
  formatNumberToLocalString(t, e = 2) {
    return t === void 0 ? "0.00" : typeof t == "number" ? t.toLocaleString("en-US", {
      maximumFractionDigits: e,
      minimumFractionDigits: e
    }) : parseFloat(t).toLocaleString("en-US", {
      maximumFractionDigits: e,
      minimumFractionDigits: e
    });
  },
  parseLocalStringToNumber(t) {
    return t === void 0 ? 0 : parseFloat(t.replace(/,/gu, ""));
  }
}, Ry = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
], Py = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ type: "bool" }]
  }
], xy = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
], se = {
  WC_NAME_SUFFIX: ".reown.id",
  WC_NAME_SUFFIX_LEGACY: ".wcn.id",
  BLOCKCHAIN_API_RPC_URL: "https://rpc.walletconnect.org",
  PULSE_API_URL: "https://pulse.walletconnect.org",
  W3M_API_URL: "https://api.web3modal.org",
  CONNECTOR_ID: {
    WALLET_CONNECT: "walletConnect",
    INJECTED: "injected",
    WALLET_STANDARD: "announced",
    COINBASE: "coinbaseWallet",
    COINBASE_SDK: "coinbaseWalletSDK",
    SAFE: "safe",
    LEDGER: "ledger",
    OKX: "okx",
    EIP6963: "eip6963",
    AUTH: "ID_AUTH"
  },
  CONNECTOR_NAMES: {
    AUTH: "Auth"
  },
  AUTH_CONNECTOR_SUPPORTED_CHAINS: ["eip155", "solana"],
  LIMITS: {
    PENDING_TRANSACTIONS: 99
  },
  CHAIN: {
    EVM: "eip155",
    SOLANA: "solana",
    POLKADOT: "polkadot",
    BITCOIN: "bip122"
  },
  CHAIN_NAME_MAP: {
    eip155: "EVM Networks",
    solana: "Solana",
    polkadot: "Polkadot",
    bip122: "Bitcoin",
    cosmos: "Cosmos"
  },
  ADAPTER_TYPES: {
    BITCOIN: "bitcoin",
    SOLANA: "solana",
    WAGMI: "wagmi",
    ETHERS: "ethers",
    ETHERS5: "ethers5"
  },
  USDT_CONTRACT_ADDRESSES: [
    "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
    "0x919C1c267BC06a7039e03fcc2eF738525769109c",
    "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    "0x55d398326f99059fF775485246999027B3197955",
    "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
  ],
  HTTP_STATUS_CODES: {
    SERVICE_UNAVAILABLE: 503,
    FORBIDDEN: 403
  },
  UNSUPPORTED_NETWORK_NAME: "Unknown Network",
  SECURE_SITE_SDK_ORIGIN: (typeof process != "undefined" && typeof process.env != "undefined" ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org"
}, Dy = {
  getERC20Abi: (t) => se.USDT_CONTRACT_ADDRESSES.includes(t) ? xy : Ry,
  getSwapAbi: () => Py
}, ds = {
  validateCaipAddress(t) {
    var e;
    if (((e = t.split(":")) == null ? void 0 : e.length) !== 3)
      throw new Error("Invalid CAIP Address");
    return t;
  },
  parseCaipAddress(t) {
    const e = t.split(":");
    if (e.length !== 3)
      throw new Error(`Invalid CAIP-10 address: ${t}`);
    const [r, s, n] = e;
    if (!r || !s || !n)
      throw new Error(`Invalid CAIP-10 address: ${t}`);
    return {
      chainNamespace: r,
      chainId: s,
      address: n
    };
  },
  parseCaipNetworkId(t) {
    const e = t.split(":");
    if (e.length !== 2)
      throw new Error(`Invalid CAIP-2 network id: ${t}`);
    const [r, s] = e;
    if (!r || !s)
      throw new Error(`Invalid CAIP-2 network id: ${t}`);
    return {
      chainNamespace: r,
      chainId: s
    };
  }
}, be = {
  WALLET_ID: "@appkit/wallet_id",
  WALLET_NAME: "@appkit/wallet_name",
  SOLANA_WALLET: "@appkit/solana_wallet",
  SOLANA_CAIP_CHAIN: "@appkit/solana_caip_chain",
  ACTIVE_CAIP_NETWORK_ID: "@appkit/active_caip_network_id",
  CONNECTED_SOCIAL: "@appkit/connected_social",
  CONNECTED_SOCIAL_USERNAME: "@appkit-wallet/SOCIAL_USERNAME",
  RECENT_WALLETS: "@appkit/recent_wallets",
  DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
  ACTIVE_NAMESPACE: "@appkit/active_namespace",
  CONNECTED_NAMESPACES: "@appkit/connected_namespaces",
  CONNECTION_STATUS: "@appkit/connection_status",
  SIWX_AUTH_TOKEN: "@appkit/siwx-auth-token",
  SIWX_NONCE_TOKEN: "@appkit/siwx-nonce-token",
  TELEGRAM_SOCIAL_PROVIDER: "@appkit/social_provider",
  NATIVE_BALANCE_CACHE: "@appkit/native_balance_cache",
  PORTFOLIO_CACHE: "@appkit/portfolio_cache",
  ENS_CACHE: "@appkit/ens_cache",
  IDENTITY_CACHE: "@appkit/identity_cache",
  PREFERRED_ACCOUNT_TYPES: "@appkit/preferred_account_types"
};
function Lc(t) {
  if (!t)
    throw new Error("Namespace is required for CONNECTED_CONNECTOR_ID");
  return `@appkit/${t}:connected_connector_id`;
}
const ge = {
  setItem(t, e) {
    Ui() && e !== void 0 && localStorage.setItem(t, e);
  },
  getItem(t) {
    if (Ui())
      return localStorage.getItem(t) || void 0;
  },
  removeItem(t) {
    Ui() && localStorage.removeItem(t);
  },
  clear() {
    Ui() && localStorage.clear();
  }
};
function Ui() {
  return typeof window != "undefined" && typeof localStorage != "undefined";
}
function ns(t, e) {
  return e === "light" ? {
    "--w3m-accent": (t == null ? void 0 : t["--w3m-accent"]) || "hsla(231, 100%, 70%, 1)",
    "--w3m-background": "#fff"
  } : {
    "--w3m-accent": (t == null ? void 0 : t["--w3m-accent"]) || "hsla(230, 100%, 67%, 1)",
    "--w3m-background": "#121313"
  };
}
const Mc = (
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  (typeof process != "undefined" && typeof process.env != "undefined" ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org"
), o$ = [
  {
    label: "Coinbase",
    name: "coinbase",
    feeRange: "1-2%",
    url: "",
    supportedChains: ["eip155"]
  },
  {
    label: "Meld.io",
    name: "meld",
    feeRange: "1-2%",
    url: "https://meldcrypto.com",
    supportedChains: ["eip155", "solana"]
  }
], a$ = "WXETMuFUQmqqybHuRkSgxv:25B8LJHSfpG6LVjR2ytU5Cwh7Z4Sch2ocoU", vt = {
  FOUR_MINUTES_MS: 24e4,
  TEN_SEC_MS: 1e4,
  FIVE_SEC_MS: 5e3,
  THREE_SEC_MS: 3e3,
  ONE_SEC_MS: 1e3,
  SECURE_SITE: Mc,
  SECURE_SITE_DASHBOARD: `${Mc}/dashboard`,
  SECURE_SITE_FAVICON: `${Mc}/images/favicon.png`,
  RESTRICTED_TIMEZONES: [
    "ASIA/SHANGHAI",
    "ASIA/URUMQI",
    "ASIA/CHONGQING",
    "ASIA/HARBIN",
    "ASIA/KASHGAR",
    "ASIA/MACAU",
    "ASIA/HONG_KONG",
    "ASIA/MACAO",
    "ASIA/BEIJING",
    "ASIA/HARBIN"
  ],
  /**
   * Network name to Coinbase Pay SDK chain name map object
   * @see supported chain names on Coinbase for Pay SDK: https://github.com/coinbase/cbpay-js/blob/d4bda2c05c4d5917c8db6a05476b603546046394/src/types/onramp.ts
   */
  WC_COINBASE_PAY_SDK_CHAINS: [
    "ethereum",
    "arbitrum",
    "polygon",
    "berachain",
    "avalanche-c-chain",
    "optimism",
    "celo",
    "base"
  ],
  WC_COINBASE_PAY_SDK_FALLBACK_CHAIN: "ethereum",
  WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP: {
    Ethereum: "ethereum",
    "Arbitrum One": "arbitrum",
    Polygon: "polygon",
    Berachain: "berachain",
    Avalanche: "avalanche-c-chain",
    "OP Mainnet": "optimism",
    Celo: "celo",
    Base: "base"
  },
  WC_COINBASE_ONRAMP_APP_ID: "bf18c88d-495a-463b-b249-0b9d3656cf5e",
  SWAP_SUGGESTED_TOKENS: [
    "ETH",
    "UNI",
    "1INCH",
    "AAVE",
    "SOL",
    "ADA",
    "AVAX",
    "DOT",
    "LINK",
    "NITRO",
    "GAIA",
    "MILK",
    "TRX",
    "NEAR",
    "GNO",
    "WBTC",
    "DAI",
    "WETH",
    "USDC",
    "USDT",
    "ARB",
    "BAL",
    "BICO",
    "CRV",
    "ENS",
    "MATIC",
    "OP"
  ],
  SWAP_POPULAR_TOKENS: [
    "ETH",
    "UNI",
    "1INCH",
    "AAVE",
    "SOL",
    "ADA",
    "AVAX",
    "DOT",
    "LINK",
    "NITRO",
    "GAIA",
    "MILK",
    "TRX",
    "NEAR",
    "GNO",
    "WBTC",
    "DAI",
    "WETH",
    "USDC",
    "USDT",
    "ARB",
    "BAL",
    "BICO",
    "CRV",
    "ENS",
    "MATIC",
    "OP",
    "METAL",
    "DAI",
    "CHAMP",
    "WOLF",
    "SALE",
    "BAL",
    "BUSD",
    "MUST",
    "BTCpx",
    "ROUTE",
    "HEX",
    "WELT",
    "amDAI",
    "VSQ",
    "VISION",
    "AURUM",
    "pSP",
    "SNX",
    "VC",
    "LINK",
    "CHP",
    "amUSDT",
    "SPHERE",
    "FOX",
    "GIDDY",
    "GFC",
    "OMEN",
    "OX_OLD",
    "DE",
    "WNT"
  ],
  BALANCE_SUPPORTED_CHAINS: ["eip155", "solana"],
  SWAP_SUPPORTED_NETWORKS: [
    // Ethereum'
    "eip155:1",
    // Arbitrum One'
    "eip155:42161",
    // Optimism'
    "eip155:10",
    // ZKSync Era'
    "eip155:324",
    // Base'
    "eip155:8453",
    // BNB Smart Chain'
    "eip155:56",
    // Polygon'
    "eip155:137",
    // Gnosis'
    "eip155:100",
    // Avalanche'
    "eip155:43114",
    // Fantom'
    "eip155:250",
    // Klaytn'
    "eip155:8217",
    // Aurora
    "eip155:1313161554"
  ],
  NAMES_SUPPORTED_CHAIN_NAMESPACES: ["eip155"],
  ONRAMP_SUPPORTED_CHAIN_NAMESPACES: ["eip155", "solana"],
  ACTIVITY_ENABLED_CHAIN_NAMESPACES: ["eip155"],
  NATIVE_TOKEN_ADDRESS: {
    eip155: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    solana: "So11111111111111111111111111111111111111111",
    polkadot: "0x",
    bip122: "0x",
    cosmos: "0x"
  },
  CONVERT_SLIPPAGE_TOLERANCE: 1,
  CONNECT_LABELS: {
    MOBILE: "Open and continue in a new browser tab"
  },
  SEND_SUPPORTED_NAMESPACES: ["eip155", "solana"],
  DEFAULT_FEATURES: {
    swaps: !0,
    onramp: !0,
    receive: !0,
    send: !0,
    email: !0,
    emailShowWallets: !0,
    socials: [
      "google",
      "x",
      "discord",
      "farcaster",
      "github",
      "apple",
      "facebook"
    ],
    connectorTypeOrder: [
      "walletConnect",
      "recent",
      "injected",
      "featured",
      "custom",
      "external",
      "recommended"
    ],
    history: !0,
    analytics: !0,
    allWallets: !0,
    legalCheckbox: !1,
    smartSessions: !1,
    collapseWallets: !1,
    walletFeaturesOrder: ["onramp", "swaps", "receive", "send"],
    connectMethodsOrder: void 0,
    pay: !1
  },
  DEFAULT_ACCOUNT_TYPES: {
    bip122: "payment",
    eip155: "smartAccount",
    polkadot: "eoa",
    solana: "eoa"
  },
  ADAPTER_TYPES: {
    UNIVERSAL: "universal",
    SOLANA: "solana",
    WAGMI: "wagmi",
    ETHERS: "ethers",
    ETHERS5: "ethers5",
    BITCOIN: "bitcoin"
  }
}, re = {
  // Cache expiry in milliseconds
  cacheExpiry: {
    portfolio: 3e4,
    nativeBalance: 3e4,
    ens: 3e5,
    identity: 3e5
  },
  isCacheExpired(t, e) {
    return Date.now() - t > e;
  },
  getActiveNetworkProps() {
    const t = re.getActiveNamespace(), e = re.getActiveCaipNetworkId(), r = e ? e.split(":")[1] : void 0, s = r ? isNaN(Number(r)) ? r : Number(r) : void 0;
    return {
      namespace: t,
      caipNetworkId: e,
      chainId: s
    };
  },
  setWalletConnectDeepLink({ name: t, href: e }) {
    try {
      ge.setItem(be.DEEPLINK_CHOICE, JSON.stringify({ href: e, name: t }));
    } catch (r) {
      console.info("Unable to set WalletConnect deep link");
    }
  },
  getWalletConnectDeepLink() {
    try {
      const t = ge.getItem(be.DEEPLINK_CHOICE);
      if (t)
        return JSON.parse(t);
    } catch (t) {
      console.info("Unable to get WalletConnect deep link");
    }
  },
  deleteWalletConnectDeepLink() {
    try {
      ge.removeItem(be.DEEPLINK_CHOICE);
    } catch (t) {
      console.info("Unable to delete WalletConnect deep link");
    }
  },
  setActiveNamespace(t) {
    try {
      ge.setItem(be.ACTIVE_NAMESPACE, t);
    } catch (e) {
      console.info("Unable to set active namespace");
    }
  },
  setActiveCaipNetworkId(t) {
    try {
      ge.setItem(be.ACTIVE_CAIP_NETWORK_ID, t), re.setActiveNamespace(t.split(":")[0]);
    } catch (e) {
      console.info("Unable to set active caip network id");
    }
  },
  getActiveCaipNetworkId() {
    try {
      return ge.getItem(be.ACTIVE_CAIP_NETWORK_ID);
    } catch (t) {
      console.info("Unable to get active caip network id");
      return;
    }
  },
  deleteActiveCaipNetworkId() {
    try {
      ge.removeItem(be.ACTIVE_CAIP_NETWORK_ID);
    } catch (t) {
      console.info("Unable to delete active caip network id");
    }
  },
  deleteConnectedConnectorId(t) {
    try {
      const e = Lc(t);
      ge.removeItem(e);
    } catch (e) {
      console.info("Unable to delete connected connector id");
    }
  },
  setAppKitRecent(t) {
    try {
      const e = re.getRecentWallets();
      e.find((s) => s.id === t.id) || (e.unshift(t), e.length > 2 && e.pop(), ge.setItem(be.RECENT_WALLETS, JSON.stringify(e)));
    } catch (e) {
      console.info("Unable to set AppKit recent");
    }
  },
  getRecentWallets() {
    try {
      const t = ge.getItem(be.RECENT_WALLETS);
      return t ? JSON.parse(t) : [];
    } catch (t) {
      console.info("Unable to get AppKit recent");
    }
    return [];
  },
  setConnectedConnectorId(t, e) {
    try {
      const r = Lc(t);
      ge.setItem(r, e);
    } catch (r) {
      console.info("Unable to set Connected Connector Id");
    }
  },
  getActiveNamespace() {
    try {
      return ge.getItem(be.ACTIVE_NAMESPACE);
    } catch (t) {
      console.info("Unable to get active namespace");
    }
  },
  getConnectedConnectorId(t) {
    if (t)
      try {
        const e = Lc(t);
        return ge.getItem(e);
      } catch (e) {
        console.info("Unable to get connected connector id in namespace ", t);
      }
  },
  setConnectedSocialProvider(t) {
    try {
      ge.setItem(be.CONNECTED_SOCIAL, t);
    } catch (e) {
      console.info("Unable to set connected social provider");
    }
  },
  getConnectedSocialProvider() {
    try {
      return ge.getItem(be.CONNECTED_SOCIAL);
    } catch (t) {
      console.info("Unable to get connected social provider");
    }
  },
  deleteConnectedSocialProvider() {
    try {
      ge.removeItem(be.CONNECTED_SOCIAL);
    } catch (t) {
      console.info("Unable to delete connected social provider");
    }
  },
  getConnectedSocialUsername() {
    try {
      return ge.getItem(be.CONNECTED_SOCIAL_USERNAME);
    } catch (t) {
      console.info("Unable to get connected social username");
    }
  },
  getStoredActiveCaipNetworkId() {
    var r;
    const t = ge.getItem(be.ACTIVE_CAIP_NETWORK_ID);
    return (r = t == null ? void 0 : t.split(":")) == null ? void 0 : r[1];
  },
  setConnectionStatus(t) {
    try {
      ge.setItem(be.CONNECTION_STATUS, t);
    } catch (e) {
      console.info("Unable to set connection status");
    }
  },
  getConnectionStatus() {
    try {
      return ge.getItem(be.CONNECTION_STATUS);
    } catch (t) {
      return;
    }
  },
  getConnectedNamespaces() {
    try {
      const t = ge.getItem(be.CONNECTED_NAMESPACES);
      return t != null && t.length ? t.split(",") : [];
    } catch (t) {
      return [];
    }
  },
  setConnectedNamespaces(t) {
    try {
      const e = Array.from(new Set(t));
      ge.setItem(be.CONNECTED_NAMESPACES, e.join(","));
    } catch (e) {
      console.info("Unable to set namespaces in storage");
    }
  },
  addConnectedNamespace(t) {
    try {
      const e = re.getConnectedNamespaces();
      e.includes(t) || (e.push(t), re.setConnectedNamespaces(e));
    } catch (e) {
      console.info("Unable to add connected namespace");
    }
  },
  removeConnectedNamespace(t) {
    try {
      const e = re.getConnectedNamespaces(), r = e.indexOf(t);
      r > -1 && (e.splice(r, 1), re.setConnectedNamespaces(e));
    } catch (e) {
      console.info("Unable to remove connected namespace");
    }
  },
  getTelegramSocialProvider() {
    try {
      return ge.getItem(be.TELEGRAM_SOCIAL_PROVIDER);
    } catch (t) {
      return console.info("Unable to get telegram social provider"), null;
    }
  },
  setTelegramSocialProvider(t) {
    try {
      ge.setItem(be.TELEGRAM_SOCIAL_PROVIDER, t);
    } catch (e) {
      console.info("Unable to set telegram social provider");
    }
  },
  removeTelegramSocialProvider() {
    try {
      ge.removeItem(be.TELEGRAM_SOCIAL_PROVIDER);
    } catch (t) {
      console.info("Unable to remove telegram social provider");
    }
  },
  getBalanceCache() {
    let t = {};
    try {
      const e = ge.getItem(be.PORTFOLIO_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch (e) {
      console.info("Unable to get balance cache");
    }
    return t;
  },
  removeAddressFromBalanceCache(t) {
    try {
      const e = re.getBalanceCache();
      ge.setItem(be.PORTFOLIO_CACHE, JSON.stringify(B(C({}, e), { [t]: void 0 })));
    } catch (e) {
      console.info("Unable to remove address from balance cache", t);
    }
  },
  getBalanceCacheForCaipAddress(t) {
    try {
      const r = re.getBalanceCache()[t];
      if (r && !this.isCacheExpired(r.timestamp, this.cacheExpiry.portfolio))
        return r.balance;
      re.removeAddressFromBalanceCache(t);
    } catch (e) {
      console.info("Unable to get balance cache for address", t);
    }
  },
  updateBalanceCache(t) {
    try {
      const e = re.getBalanceCache();
      e[t.caipAddress] = t, ge.setItem(be.PORTFOLIO_CACHE, JSON.stringify(e));
    } catch (e) {
      console.info("Unable to update balance cache", t);
    }
  },
  getNativeBalanceCache() {
    let t = {};
    try {
      const e = ge.getItem(be.NATIVE_BALANCE_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch (e) {
      console.info("Unable to get balance cache");
    }
    return t;
  },
  removeAddressFromNativeBalanceCache(t) {
    try {
      const e = re.getBalanceCache();
      ge.setItem(be.NATIVE_BALANCE_CACHE, JSON.stringify(B(C({}, e), { [t]: void 0 })));
    } catch (e) {
      console.info("Unable to remove address from balance cache", t);
    }
  },
  getNativeBalanceCacheForCaipAddress(t) {
    try {
      const r = re.getNativeBalanceCache()[t];
      if (r && !this.isCacheExpired(r.timestamp, this.cacheExpiry.nativeBalance))
        return r;
      console.info("Discarding cache for address", t), re.removeAddressFromBalanceCache(t);
    } catch (e) {
      console.info("Unable to get balance cache for address", t);
    }
  },
  updateNativeBalanceCache(t) {
    try {
      const e = re.getNativeBalanceCache();
      e[t.caipAddress] = t, ge.setItem(be.NATIVE_BALANCE_CACHE, JSON.stringify(e));
    } catch (e) {
      console.info("Unable to update balance cache", t);
    }
  },
  getEnsCache() {
    let t = {};
    try {
      const e = ge.getItem(be.ENS_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch (e) {
      console.info("Unable to get ens name cache");
    }
    return t;
  },
  getEnsFromCacheForAddress(t) {
    try {
      const r = re.getEnsCache()[t];
      if (r && !this.isCacheExpired(r.timestamp, this.cacheExpiry.ens))
        return r.ens;
      re.removeEnsFromCache(t);
    } catch (e) {
      console.info("Unable to get ens name from cache", t);
    }
  },
  updateEnsCache(t) {
    try {
      const e = re.getEnsCache();
      e[t.address] = t, ge.setItem(be.ENS_CACHE, JSON.stringify(e));
    } catch (e) {
      console.info("Unable to update ens name cache", t);
    }
  },
  removeEnsFromCache(t) {
    try {
      const e = re.getEnsCache();
      ge.setItem(be.ENS_CACHE, JSON.stringify(B(C({}, e), { [t]: void 0 })));
    } catch (e) {
      console.info("Unable to remove ens name from cache", t);
    }
  },
  getIdentityCache() {
    let t = {};
    try {
      const e = ge.getItem(be.IDENTITY_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch (e) {
      console.info("Unable to get identity cache");
    }
    return t;
  },
  getIdentityFromCacheForAddress(t) {
    try {
      const r = re.getIdentityCache()[t];
      if (r && !this.isCacheExpired(r.timestamp, this.cacheExpiry.identity))
        return r.identity;
      re.removeIdentityFromCache(t);
    } catch (e) {
      console.info("Unable to get identity from cache", t);
    }
  },
  updateIdentityCache(t) {
    try {
      const e = re.getIdentityCache();
      e[t.address] = {
        identity: t.identity,
        timestamp: t.timestamp
      }, ge.setItem(be.IDENTITY_CACHE, JSON.stringify(e));
    } catch (e) {
      console.info("Unable to update identity cache", t);
    }
  },
  removeIdentityFromCache(t) {
    try {
      const e = re.getIdentityCache();
      ge.setItem(be.IDENTITY_CACHE, JSON.stringify(B(C({}, e), { [t]: void 0 })));
    } catch (e) {
      console.info("Unable to remove identity from cache", t);
    }
  },
  clearAddressCache() {
    try {
      ge.removeItem(be.PORTFOLIO_CACHE), ge.removeItem(be.NATIVE_BALANCE_CACHE), ge.removeItem(be.ENS_CACHE), ge.removeItem(be.IDENTITY_CACHE);
    } catch (t) {
      console.info("Unable to clear address cache");
    }
  },
  setPreferredAccountTypes(t) {
    try {
      ge.setItem(be.PREFERRED_ACCOUNT_TYPES, JSON.stringify(t));
    } catch (e) {
      console.info("Unable to set preferred account types", t);
    }
  },
  getPreferredAccountTypes() {
    try {
      const t = ge.getItem(be.PREFERRED_ACCOUNT_TYPES);
      return JSON.parse(t);
    } catch (t) {
      console.info("Unable to get preferred account types");
    }
  }
}, he = {
  isMobile() {
    var t;
    return this.isClient() ? !!((t = window == null ? void 0 : window.matchMedia("(pointer:coarse)")) != null && t.matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : !1;
  },
  checkCaipNetwork(t, e = "") {
    return t == null ? void 0 : t.caipNetworkId.toLocaleLowerCase().includes(e.toLowerCase());
  },
  isAndroid() {
    if (!this.isMobile())
      return !1;
    const t = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return he.isMobile() && t.includes("android");
  },
  isIos() {
    if (!this.isMobile())
      return !1;
    const t = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return t.includes("iphone") || t.includes("ipad");
  },
  isSafari() {
    return this.isClient() ? (window == null ? void 0 : window.navigator.userAgent.toLowerCase()).includes("safari") : !1;
  },
  isClient() {
    return typeof window != "undefined";
  },
  isPairingExpired(t) {
    return t ? t - Date.now() <= vt.TEN_SEC_MS : !0;
  },
  isAllowedRetry(t, e = vt.ONE_SEC_MS) {
    return Date.now() - t >= e;
  },
  copyToClopboard(t) {
    navigator.clipboard.writeText(t);
  },
  isIframe() {
    try {
      return (window == null ? void 0 : window.self) !== (window == null ? void 0 : window.top);
    } catch (t) {
      return !1;
    }
  },
  getPairingExpiry() {
    return Date.now() + vt.FOUR_MINUTES_MS;
  },
  getNetworkId(t) {
    return t == null ? void 0 : t.split(":")[1];
  },
  getPlainAddress(t) {
    return t == null ? void 0 : t.split(":")[2];
  },
  wait(t) {
    return h(this, null, function* () {
      return new Promise((e) => {
        setTimeout(e, t);
      });
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debounce(t, e = 500) {
    let r;
    return (...s) => {
      function n() {
        t(...s);
      }
      r && clearTimeout(r), r = setTimeout(n, e);
    };
  },
  isHttpUrl(t) {
    return t.startsWith("http://") || t.startsWith("https://");
  },
  formatNativeUrl(t, e) {
    if (he.isHttpUrl(t))
      return this.formatUniversalUrl(t, e);
    let r = t;
    r.includes("://") || (r = t.replaceAll("/", "").replaceAll(":", ""), r = `${r}://`), r.endsWith("/") || (r = `${r}/`), this.isTelegram() && this.isAndroid() && (e = encodeURIComponent(e));
    const s = encodeURIComponent(e);
    return {
      redirect: `${r}wc?uri=${s}`,
      href: r
    };
  },
  formatUniversalUrl(t, e) {
    if (!he.isHttpUrl(t))
      return this.formatNativeUrl(t, e);
    let r = t;
    r.endsWith("/") || (r = `${r}/`);
    const s = encodeURIComponent(e);
    return {
      redirect: `${r}wc?uri=${s}`,
      href: r
    };
  },
  getOpenTargetForPlatform(t) {
    return t === "popupWindow" ? t : this.isTelegram() ? re.getTelegramSocialProvider() ? "_top" : "_blank" : t;
  },
  openHref(t, e, r) {
    window == null || window.open(t, this.getOpenTargetForPlatform(e), r || "noreferrer noopener");
  },
  returnOpenHref(t, e, r) {
    return window == null ? void 0 : window.open(t, this.getOpenTargetForPlatform(e), r || "noreferrer noopener");
  },
  isTelegram() {
    return typeof window != "undefined" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (!!window.TelegramWebviewProxy || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!window.Telegram || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!window.TelegramWebviewProxyProto);
  },
  isPWA() {
    var r, s, n;
    if (typeof window == "undefined")
      return !1;
    const t = (s = (r = window.matchMedia) == null ? void 0 : r.call(window, "(display-mode: standalone)")) == null ? void 0 : s.matches, e = (n = window == null ? void 0 : window.navigator) == null ? void 0 : n.standalone;
    return !!(t || e);
  },
  preloadImage(t) {
    return h(this, null, function* () {
      const e = new Promise((r, s) => {
        const n = new Image();
        n.onload = r, n.onerror = s, n.crossOrigin = "anonymous", n.src = t;
      });
      return Promise.race([e, he.wait(2e3)]);
    });
  },
  formatBalance(t, e) {
    let r = "0.000";
    if (typeof t == "string") {
      const s = Number(t);
      if (s) {
        const n = Math.floor(s * 1e3) / 1e3;
        n && (r = n.toString());
      }
    }
    return `${r}${e ? ` ${e}` : ""}`;
  },
  formatBalance2(t, e) {
    var s;
    let r;
    if (t === "0")
      r = "0";
    else if (typeof t == "string") {
      const n = Number(t);
      n && (r = (s = n.toString().match(/^-?\d+(?:\.\d{0,3})?/u)) == null ? void 0 : s[0]);
    }
    return {
      value: r != null ? r : "0",
      rest: r === "0" ? "000" : "",
      symbol: e
    };
  },
  getApiUrl() {
    return se.W3M_API_URL;
  },
  getBlockchainApiUrl() {
    return se.BLOCKCHAIN_API_RPC_URL;
  },
  getAnalyticsUrl() {
    return se.PULSE_API_URL;
  },
  getUUID() {
    return crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t) => {
      const e = Math.random() * 16 | 0;
      return (t === "x" ? e : e & 3 | 8).toString(16);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseError(t) {
    var e, r;
    return typeof t == "string" ? t : typeof ((r = (e = t == null ? void 0 : t.issues) == null ? void 0 : e[0]) == null ? void 0 : r.message) == "string" ? t.issues[0].message : t instanceof Error ? t.message : "Unknown error";
  },
  sortRequestedNetworks(t, e = []) {
    const r = {};
    return e && t && (t.forEach((s, n) => {
      r[s] = n;
    }), e.sort((s, n) => {
      const i = r[s.id], o = r[n.id];
      return i !== void 0 && o !== void 0 ? i - o : i !== void 0 ? -1 : o !== void 0 ? 1 : 0;
    })), e;
  },
  calculateBalance(t) {
    var r;
    let e = 0;
    for (const s of t)
      e += (r = s.value) != null ? r : 0;
    return e;
  },
  formatTokenBalance(t) {
    const e = t.toFixed(2), [r, s] = e.split(".");
    return { dollars: r, pennies: s };
  },
  isAddress(t, e = "eip155") {
    switch (e) {
      case "eip155":
        if (/^(?:0x)?[0-9a-f]{40}$/iu.test(t)) {
          if (/^(?:0x)?[0-9a-f]{40}$/iu.test(t) || /^(?:0x)?[0-9A-F]{40}$/iu.test(t))
            return !0;
        } else return !1;
        return !1;
      case "solana":
        return /[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(t);
      default:
        return !1;
    }
  },
  uniqueBy(t, e) {
    const r = /* @__PURE__ */ new Set();
    return t.filter((s) => {
      const n = s[e];
      return r.has(n) ? !1 : (r.add(n), !0);
    });
  },
  generateSdkVersion(t, e, r) {
    const n = t.length === 0 ? vt.ADAPTER_TYPES.UNIVERSAL : t.map((i) => i.adapterType).join(",");
    return `${e}-${n}-${r}`;
  },
  // eslint-disable-next-line max-params
  createAccount(t, e, r, s, n) {
    return {
      namespace: t,
      address: e,
      type: r,
      publicKey: s,
      path: n
    };
  },
  isCaipAddress(t) {
    if (typeof t != "string")
      return !1;
    const e = t.split(":"), r = e[0];
    return e.filter(Boolean).length === 3 && r in se.CHAIN_NAME_MAP;
  },
  isMac() {
    const t = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return t.includes("macintosh") && !t.includes("safari");
  },
  formatTelegramSocialLoginUrl(t) {
    const e = `--${encodeURIComponent(window == null ? void 0 : window.location.href)}`, r = "state=";
    if (new URL(t).host === "auth.magic.link") {
      const n = "provider_authorization_url=", i = t.substring(t.indexOf(n) + n.length), o = this.injectIntoUrl(decodeURIComponent(i), r, e);
      return t.replace(i, encodeURIComponent(o));
    }
    return this.injectIntoUrl(t, r, e);
  },
  injectIntoUrl(t, e, r) {
    const s = t.indexOf(e);
    if (s === -1)
      throw new Error(`${e} parameter not found in the URL: ${t}`);
    const n = t.indexOf("&", s), i = e.length, o = n !== -1 ? n : t.length, a = t.substring(0, s + i), c = t.substring(s + i, o), l = t.substring(n), u = c + r;
    return a + u + l;
  }
};
function bi(...t) {
  return h(this, null, function* () {
    const e = yield fetch(...t);
    if (!e.ok)
      throw new Error(`HTTP status code: ${e.status}`, {
        cause: e
      });
    return e;
  });
}
class gc {
  constructor({ baseUrl: e, clientId: r }) {
    this.baseUrl = e, this.clientId = r;
  }
  get(i) {
    return h(this, null, function* () {
      var o = i, { headers: e, signal: r, cache: s } = o, n = us(o, ["headers", "signal", "cache"]);
      const a = this.createUrl(n);
      return (yield bi(a, { method: "GET", headers: e, signal: r, cache: s })).json();
    });
  }
  getBlob(n) {
    return h(this, null, function* () {
      var i = n, { headers: e, signal: r } = i, s = us(i, ["headers", "signal"]);
      const o = this.createUrl(s);
      return (yield bi(o, { method: "GET", headers: e, signal: r })).blob();
    });
  }
  post(i) {
    return h(this, null, function* () {
      var o = i, { body: e, headers: r, signal: s } = o, n = us(o, ["body", "headers", "signal"]);
      const a = this.createUrl(n);
      return (yield bi(a, {
        method: "POST",
        headers: r,
        body: e ? JSON.stringify(e) : void 0,
        signal: s
      })).json();
    });
  }
  put(i) {
    return h(this, null, function* () {
      var o = i, { body: e, headers: r, signal: s } = o, n = us(o, ["body", "headers", "signal"]);
      const a = this.createUrl(n);
      return (yield bi(a, {
        method: "PUT",
        headers: r,
        body: e ? JSON.stringify(e) : void 0,
        signal: s
      })).json();
    });
  }
  delete(i) {
    return h(this, null, function* () {
      var o = i, { body: e, headers: r, signal: s } = o, n = us(o, ["body", "headers", "signal"]);
      const a = this.createUrl(n);
      return (yield bi(a, {
        method: "DELETE",
        headers: r,
        body: e ? JSON.stringify(e) : void 0,
        signal: s
      })).json();
    });
  }
  createUrl({ path: e, params: r }) {
    const s = new URL(e, this.baseUrl);
    return r && Object.entries(r).forEach(([n, i]) => {
      i && s.searchParams.append(n, i);
    }), this.clientId && s.searchParams.append("clientId", this.clientId), s;
  }
}
const ky = {
  /**
   * Handles mobile wallet redirection for wallets that have Universal Links.
   *
   * @param {Object} properties - The properties object.
   * @param {string} properties.name - The name of the wallet.
   */
  handleSolanaDeeplinkRedirect(t) {
    if (R.state.activeChain === se.CHAIN.SOLANA) {
      const e = window.location.href, r = encodeURIComponent(e);
      if (t === "Phantom" && !("phantom" in window)) {
        const s = e.startsWith("https") ? "https" : "http", n = e.split("/")[2], i = encodeURIComponent(`${s}://${n}`);
        window.location.href = `https://phantom.app/ul/browse/${r}?ref=${i}`;
      }
      t === "Coinbase Wallet" && !("coinbaseSolana" in window) && (window.location.href = `https://go.cb-w.com/dapp?cb_url=${r}`);
    }
  }
}, Gt = Ye({
  walletImages: {},
  networkImages: {},
  chainImages: {},
  connectorImages: {},
  tokenImages: {},
  currencyImages: {}
}), Cr = {
  state: Gt,
  subscribeNetworkImages(t) {
    return Dt(Gt.networkImages, () => t(Gt.networkImages));
  },
  subscribeKey(t, e) {
    return Wt(Gt, t, e);
  },
  subscribe(t) {
    return Dt(Gt, () => t(Gt));
  },
  setWalletImage(t, e) {
    Gt.walletImages[t] = e;
  },
  setNetworkImage(t, e) {
    Gt.networkImages[t] = e;
  },
  setChainImage(t, e) {
    Gt.chainImages[t] = e;
  },
  setConnectorImage(t, e) {
    Gt.connectorImages = B(C({}, Gt.connectorImages), { [t]: e });
  },
  setTokenImage(t, e) {
    Gt.tokenImages[t] = e;
  },
  setCurrencyImage(t, e) {
    Gt.currencyImages[t] = e;
  }
}, $y = {
  // Ethereum
  eip155: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
  // Solana
  solana: "a1b58899-f671-4276-6a5e-56ca5bd59700",
  // Polkadot
  polkadot: "",
  // Bitcoin
  bip122: "0b4838db-0161-4ffe-022d-532bf03dba00",
  // Cosmos
  cosmos: ""
}, Fc = Ye({
  networkImagePromises: {}
}), ig = {
  fetchWalletImage(t) {
    return h(this, null, function* () {
      if (t)
        return yield le._fetchWalletImage(t), this.getWalletImageById(t);
    });
  },
  fetchNetworkImage(t) {
    return h(this, null, function* () {
      if (!t)
        return;
      const e = this.getNetworkImageById(t);
      return e || (Fc.networkImagePromises[t] || (Fc.networkImagePromises[t] = le._fetchNetworkImage(t)), yield Fc.networkImagePromises[t], this.getNetworkImageById(t));
    });
  },
  getWalletImageById(t) {
    if (t)
      return Cr.state.walletImages[t];
  },
  getWalletImage(t) {
    if (t != null && t.image_url)
      return t == null ? void 0 : t.image_url;
    if (t != null && t.image_id)
      return Cr.state.walletImages[t.image_id];
  },
  getNetworkImage(t) {
    var e, r, s;
    if ((e = t == null ? void 0 : t.assets) != null && e.imageUrl)
      return (r = t == null ? void 0 : t.assets) == null ? void 0 : r.imageUrl;
    if ((s = t == null ? void 0 : t.assets) != null && s.imageId)
      return Cr.state.networkImages[t.assets.imageId];
  },
  getNetworkImageById(t) {
    if (t)
      return Cr.state.networkImages[t];
  },
  getConnectorImage(t) {
    if (t != null && t.imageUrl)
      return t.imageUrl;
    if (t != null && t.imageId)
      return Cr.state.connectorImages[t.imageId];
  },
  getChainImage(t) {
    return Cr.state.networkImages[$y[t]];
  }
}, Uy = {
  getFeatureValue(t, e) {
    const r = e == null ? void 0 : e[t];
    return r === void 0 ? vt.DEFAULT_FEATURES[t] : r;
  },
  filterSocialsByPlatform(t) {
    if (!t || !t.length)
      return t;
    if (he.isTelegram()) {
      if (he.isIos())
        return t.filter((e) => e !== "google");
      if (he.isMac())
        return t.filter((e) => e !== "x");
      if (he.isAndroid())
        return t.filter((e) => !["facebook", "x"].includes(e));
    }
    return t;
  }
}, ce = Ye({
  features: vt.DEFAULT_FEATURES,
  projectId: "",
  sdkType: "appkit",
  sdkVersion: "html-wagmi-undefined",
  defaultAccountTypes: {
    solana: "eoa",
    bip122: "payment",
    polkadot: "eoa",
    eip155: "smartAccount"
  },
  enableNetworkSwitch: !0
}), q = {
  state: ce,
  subscribeKey(t, e) {
    return Wt(ce, t, e);
  },
  setOptions(t) {
    Object.assign(ce, t);
  },
  setFeatures(t) {
    if (!t)
      return;
    ce.features || (ce.features = vt.DEFAULT_FEATURES);
    const e = C(C({}, ce.features), t);
    ce.features = e, ce.features.socials && (ce.features.socials = Uy.filterSocialsByPlatform(ce.features.socials));
  },
  setProjectId(t) {
    ce.projectId = t;
  },
  setCustomRpcUrls(t) {
    ce.customRpcUrls = t;
  },
  setAllWallets(t) {
    ce.allWallets = t;
  },
  setIncludeWalletIds(t) {
    ce.includeWalletIds = t;
  },
  setExcludeWalletIds(t) {
    ce.excludeWalletIds = t;
  },
  setFeaturedWalletIds(t) {
    ce.featuredWalletIds = t;
  },
  setTokens(t) {
    ce.tokens = t;
  },
  setTermsConditionsUrl(t) {
    ce.termsConditionsUrl = t;
  },
  setPrivacyPolicyUrl(t) {
    ce.privacyPolicyUrl = t;
  },
  setCustomWallets(t) {
    ce.customWallets = t;
  },
  setIsSiweEnabled(t) {
    ce.isSiweEnabled = t;
  },
  setIsUniversalProvider(t) {
    ce.isUniversalProvider = t;
  },
  setSdkVersion(t) {
    ce.sdkVersion = t;
  },
  setMetadata(t) {
    ce.metadata = t;
  },
  setDisableAppend(t) {
    ce.disableAppend = t;
  },
  setEIP6963Enabled(t) {
    ce.enableEIP6963 = t;
  },
  setDebug(t) {
    ce.debug = t;
  },
  setEnableWalletConnect(t) {
    ce.enableWalletConnect = t;
  },
  setEnableWalletGuide(t) {
    ce.enableWalletGuide = t;
  },
  setEnableAuthLogger(t) {
    ce.enableAuthLogger = t;
  },
  setEnableWallets(t) {
    ce.enableWallets = t;
  },
  setHasMultipleAddresses(t) {
    ce.hasMultipleAddresses = t;
  },
  setSIWX(t) {
    ce.siwx = t;
  },
  setConnectMethodsOrder(t) {
    ce.features = B(C({}, ce.features), {
      connectMethodsOrder: t
    });
  },
  setWalletFeaturesOrder(t) {
    ce.features = B(C({}, ce.features), {
      walletFeaturesOrder: t
    });
  },
  setSocialsOrder(t) {
    ce.features = B(C({}, ce.features), {
      socials: t
    });
  },
  setCollapseWallets(t) {
    ce.features = B(C({}, ce.features), {
      collapseWallets: t
    });
  },
  setEnableEmbedded(t) {
    ce.enableEmbedded = t;
  },
  setAllowUnsupportedChain(t) {
    ce.allowUnsupportedChain = t;
  },
  setManualWCControl(t) {
    ce.manualWCControl = t;
  },
  setEnableNetworkSwitch(t) {
    ce.enableNetworkSwitch = t;
  },
  setDefaultAccountTypes(t = {}) {
    Object.entries(t).forEach(([e, r]) => {
      r && (ce.defaultAccountTypes[e] = r);
    });
  },
  setUniversalProviderConfigOverride(t) {
    ce.universalProviderConfigOverride = t;
  },
  getUniversalProviderConfigOverride() {
    return ce.universalProviderConfigOverride;
  },
  getSnapshot() {
    return Xi(ce);
  }
}, hs = Ye({
  message: "",
  variant: "info",
  open: !1
}), rs = {
  state: hs,
  subscribeKey(t, e) {
    return Wt(hs, t, e);
  },
  open(t, e) {
    const { debug: r } = q.state, { shortMessage: s, longMessage: n } = t;
    r && (hs.message = s, hs.variant = e, hs.open = !0), n && console.error(typeof n == "function" ? n() : n);
  },
  close() {
    hs.open = !1, hs.message = "", hs.variant = "info";
  }
}, Ly = he.getAnalyticsUrl(), My = new gc({ baseUrl: Ly, clientId: null }), Fy = ["MODAL_CREATED"], Vr = Ye({
  timestamp: Date.now(),
  reportedErrors: {},
  data: {
    type: "track",
    event: "MODAL_CREATED"
  }
}), Ke = {
  state: Vr,
  subscribe(t) {
    return Dt(Vr, () => t(Vr));
  },
  getSdkProperties() {
    const { projectId: t, sdkType: e, sdkVersion: r } = q.state;
    return {
      projectId: t,
      st: e,
      sv: r || "html-wagmi-4.2.2"
    };
  },
  _sendAnalyticsEvent(t) {
    return h(this, null, function* () {
      try {
        const e = ne.state.address;
        if (Fy.includes(t.data.event) || typeof window == "undefined")
          return;
        yield My.post({
          path: "/e",
          params: Ke.getSdkProperties(),
          body: {
            eventId: he.getUUID(),
            url: window.location.href,
            domain: window.location.hostname,
            timestamp: t.timestamp,
            props: B(C({}, t.data), { address: e })
          }
        }), Vr.reportedErrors.FORBIDDEN = !1;
      } catch (e) {
        e instanceof Error && e.cause instanceof Response && e.cause.status === se.HTTP_STATUS_CODES.FORBIDDEN && !Vr.reportedErrors.FORBIDDEN && (rs.open({
          shortMessage: "Invalid App Configuration",
          longMessage: `Origin ${Ui() ? window.origin : "uknown"} not found on Allowlist - update configuration on cloud.reown.com`
        }, "error"), Vr.reportedErrors.FORBIDDEN = !0);
      }
    });
  },
  sendEvent(t) {
    var e;
    Vr.timestamp = Date.now(), Vr.data = t, (e = q.state.features) != null && e.analytics && Ke._sendAnalyticsEvent(Vr);
  }
}, By = [
  "1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79",
  "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
  "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393"
], jy = he.getApiUrl(), Yt = new gc({ baseUrl: jy, clientId: null }), qy = 40, Sd = 4, zy = 20, we = Ye({
  promises: {},
  page: 1,
  count: 0,
  featured: [],
  allFeatured: [],
  recommended: [],
  allRecommended: [],
  wallets: [],
  filteredWallets: [],
  search: [],
  isAnalyticsEnabled: !1,
  excludedWallets: [],
  isFetchingRecommendedWallets: !1
}), le = {
  state: we,
  subscribeKey(t, e) {
    return Wt(we, t, e);
  },
  _getSdkProperties() {
    const { projectId: t, sdkType: e, sdkVersion: r } = q.state;
    return {
      projectId: t,
      st: e || "appkit",
      sv: r || "html-wagmi-4.2.2"
    };
  },
  _filterOutExtensions(t) {
    return q.state.isUniversalProvider ? t.filter((e) => !!(e.mobile_link || e.desktop_link || e.webapp_link)) : t;
  },
  _fetchWalletImage(t) {
    return h(this, null, function* () {
      const e = `${Yt.baseUrl}/getWalletImage/${t}`, r = yield Yt.getBlob({ path: e, params: le._getSdkProperties() });
      Cr.setWalletImage(t, URL.createObjectURL(r));
    });
  },
  _fetchNetworkImage(t) {
    return h(this, null, function* () {
      const e = `${Yt.baseUrl}/public/getAssetImage/${t}`, r = yield Yt.getBlob({ path: e, params: le._getSdkProperties() });
      Cr.setNetworkImage(t, URL.createObjectURL(r));
    });
  },
  _fetchConnectorImage(t) {
    return h(this, null, function* () {
      const e = `${Yt.baseUrl}/public/getAssetImage/${t}`, r = yield Yt.getBlob({ path: e, params: le._getSdkProperties() });
      Cr.setConnectorImage(t, URL.createObjectURL(r));
    });
  },
  _fetchCurrencyImage(t) {
    return h(this, null, function* () {
      const e = `${Yt.baseUrl}/public/getCurrencyImage/${t}`, r = yield Yt.getBlob({ path: e, params: le._getSdkProperties() });
      Cr.setCurrencyImage(t, URL.createObjectURL(r));
    });
  },
  _fetchTokenImage(t) {
    return h(this, null, function* () {
      const e = `${Yt.baseUrl}/public/getTokenImage/${t}`, r = yield Yt.getBlob({ path: e, params: le._getSdkProperties() });
      Cr.setTokenImage(t, URL.createObjectURL(r));
    });
  },
  fetchAllowedOrigins() {
    return h(this, null, function* () {
      try {
        const { allowedOrigins: t } = yield Yt.get({
          path: "/projects/v1/origins",
          params: le._getSdkProperties()
        });
        return t;
      } catch (t) {
        return [];
      }
    });
  },
  fetchNetworkImages() {
    return h(this, null, function* () {
      const t = R.getAllRequestedCaipNetworks(), e = t == null ? void 0 : t.map(({ assets: r }) => r == null ? void 0 : r.imageId).filter(Boolean).filter((r) => !ig.getNetworkImageById(r));
      e && (yield Promise.allSettled(e.map((r) => le._fetchNetworkImage(r))));
    });
  },
  fetchConnectorImages() {
    return h(this, null, function* () {
      const { connectors: t } = pe.state, e = t.map(({ imageId: r }) => r).filter(Boolean);
      yield Promise.allSettled(e.map((r) => le._fetchConnectorImage(r)));
    });
  },
  fetchCurrencyImages() {
    return h(this, arguments, function* (t = []) {
      yield Promise.allSettled(t.map((e) => le._fetchCurrencyImage(e)));
    });
  },
  fetchTokenImages() {
    return h(this, arguments, function* (t = []) {
      yield Promise.allSettled(t.map((e) => le._fetchTokenImage(e)));
    });
  },
  fetchWallets(t) {
    return h(this, null, function* () {
      var s, n, i;
      const e = (s = t.exclude) != null ? s : [];
      return le._getSdkProperties().sv.startsWith("html-core-") && e.push(...By), yield Yt.get({
        path: "/getWallets",
        params: B(C(C({}, le._getSdkProperties()), t), {
          page: String(t.page),
          entries: String(t.entries),
          include: (n = t.include) == null ? void 0 : n.join(","),
          exclude: (i = t.exclude) == null ? void 0 : i.join(",")
        })
      });
    });
  },
  fetchFeaturedWallets() {
    return h(this, null, function* () {
      var e;
      const { featuredWalletIds: t } = q.state;
      if (t != null && t.length) {
        const r = B(C({}, le._getSdkProperties()), {
          page: 1,
          entries: (e = t == null ? void 0 : t.length) != null ? e : Sd,
          include: t
        }), { data: s } = yield le.fetchWallets(r);
        s.sort((i, o) => t.indexOf(i.id) - t.indexOf(o.id));
        const n = s.map((i) => i.image_id).filter(Boolean);
        yield Promise.allSettled(n.map((i) => le._fetchWalletImage(i))), we.featured = s, we.allFeatured = s;
      }
    });
  },
  fetchRecommendedWallets() {
    return h(this, null, function* () {
      try {
        we.isFetchingRecommendedWallets = !0;
        const { includeWalletIds: t, excludeWalletIds: e, featuredWalletIds: r } = q.state, s = [...e != null ? e : [], ...r != null ? r : []].filter(Boolean), n = R.getRequestedCaipNetworkIds().join(","), i = {
          page: 1,
          entries: Sd,
          include: t,
          exclude: s,
          chains: n
        }, { data: o, count: a } = yield le.fetchWallets(i), c = re.getRecentWallets(), l = o.map((d) => d.image_id).filter(Boolean), u = c.map((d) => d.image_id).filter(Boolean);
        yield Promise.allSettled([...l, ...u].map((d) => le._fetchWalletImage(d))), we.recommended = o, we.allRecommended = o, we.count = a != null ? a : 0;
      } catch (t) {
      } finally {
        we.isFetchingRecommendedWallets = !1;
      }
    });
  },
  fetchWalletsByPage(e) {
    return h(this, arguments, function* ({ page: t }) {
      const { includeWalletIds: r, excludeWalletIds: s, featuredWalletIds: n } = q.state, i = R.getRequestedCaipNetworkIds().join(","), o = [
        ...we.recommended.map(({ id: d }) => d),
        ...s != null ? s : [],
        ...n != null ? n : []
      ].filter(Boolean), a = {
        page: t,
        entries: qy,
        include: r,
        exclude: o,
        chains: i
      }, { data: c, count: l } = yield le.fetchWallets(a), u = c.slice(0, zy).map((d) => d.image_id).filter(Boolean);
      yield Promise.allSettled(u.map((d) => le._fetchWalletImage(d))), we.wallets = he.uniqueBy([...we.wallets, ...le._filterOutExtensions(c)], "id"), we.count = l > we.count ? l : we.count, we.page = t;
    });
  },
  initializeExcludedWallets(e) {
    return h(this, arguments, function* ({ ids: t }) {
      const r = R.getRequestedCaipNetworkIds().join(","), s = {
        page: 1,
        entries: t.length,
        include: t,
        chains: r
      }, { data: n } = yield le.fetchWallets(s);
      n && n.forEach((i) => {
        we.excludedWallets.push({ rdns: i.rdns, name: i.name });
      });
    });
  },
  searchWallet(r) {
    return h(this, arguments, function* ({ search: t, badge: e }) {
      const { includeWalletIds: s, excludeWalletIds: n } = q.state, i = R.getRequestedCaipNetworkIds().join(",");
      we.search = [];
      const o = {
        page: 1,
        entries: 100,
        search: t == null ? void 0 : t.trim(),
        badge_type: e,
        include: s,
        exclude: n,
        chains: i
      }, { data: a } = yield le.fetchWallets(o);
      Ke.sendEvent({
        type: "track",
        event: "SEARCH_WALLET",
        properties: { badge: e != null ? e : "", search: t != null ? t : "" }
      });
      const c = a.map((l) => l.image_id).filter(Boolean);
      yield Promise.allSettled([
        ...c.map((l) => le._fetchWalletImage(l)),
        he.wait(300)
      ]), we.search = le._filterOutExtensions(a);
    });
  },
  initPromise(t, e) {
    const r = we.promises[t];
    return r || (we.promises[t] = e());
  },
  prefetch({ fetchConnectorImages: t = !0, fetchFeaturedWallets: e = !0, fetchRecommendedWallets: r = !0, fetchNetworkImages: s = !0 } = {}) {
    const n = [
      t && le.initPromise("connectorImages", le.fetchConnectorImages),
      e && le.initPromise("featuredWallets", le.fetchFeaturedWallets),
      r && le.initPromise("recommendedWallets", le.fetchRecommendedWallets),
      s && le.initPromise("networkImages", le.fetchNetworkImages)
    ].filter(Boolean);
    return Promise.allSettled(n);
  },
  prefetchAnalyticsConfig() {
    var t;
    (t = q.state.features) != null && t.analytics && le.fetchAnalyticsConfig();
  },
  fetchAnalyticsConfig() {
    return h(this, null, function* () {
      try {
        const { isAnalyticsEnabled: t } = yield Yt.get({
          path: "/getAnalyticsConfig",
          params: le._getSdkProperties()
        });
        q.setFeatures({ analytics: t });
      } catch (t) {
        q.setFeatures({ analytics: !1 });
      }
    });
  },
  filterByNamespaces(t) {
    if (!(t != null && t.length)) {
      we.featured = we.allFeatured, we.recommended = we.allRecommended;
      return;
    }
    const e = R.getRequestedCaipNetworkIds().join(",");
    we.featured = we.allFeatured.filter((r) => {
      var s;
      return (s = r.chains) == null ? void 0 : s.some((n) => e.includes(n));
    }), we.recommended = we.allRecommended.filter((r) => {
      var s;
      return (s = r.chains) == null ? void 0 : s.some((n) => e.includes(n));
    }), we.filteredWallets = we.wallets.filter((r) => {
      var s;
      return (s = r.chains) == null ? void 0 : s.some((n) => e.includes(n));
    });
  },
  clearFilterByNamespaces() {
    we.filteredWallets = [];
  },
  setFilterByNamespace(t) {
    if (!t) {
      we.featured = we.allFeatured, we.recommended = we.allRecommended;
      return;
    }
    const e = R.getRequestedCaipNetworkIds().join(",");
    we.featured = we.allFeatured.filter((r) => {
      var s;
      return (s = r.chains) == null ? void 0 : s.some((n) => e.includes(n));
    }), we.recommended = we.allRecommended.filter((r) => {
      var s;
      return (s = r.chains) == null ? void 0 : s.some((n) => e.includes(n));
    }), we.filteredWallets = we.wallets.filter((r) => {
      var s;
      return (s = r.chains) == null ? void 0 : s.some((n) => e.includes(n));
    });
  }
}, Re = Ye({
  view: "Connect",
  history: ["Connect"],
  transactionStack: []
}), xe = {
  state: Re,
  subscribeKey(t, e) {
    return Wt(Re, t, e);
  },
  pushTransactionStack(t) {
    Re.transactionStack.push(t);
  },
  popTransactionStack(t) {
    var r, s;
    const e = Re.transactionStack.pop();
    if (e)
      if (t)
        this.goBack(), (r = e == null ? void 0 : e.onCancel) == null || r.call(e);
      else {
        if (e.goBack)
          this.goBack();
        else if (e.replace) {
          const i = Re.history.indexOf("ConnectingSiwe");
          i > 0 ? this.goBackToIndex(i - 1) : (et.close(!0), Re.history = []);
        } else e.view && this.reset(e.view);
        (s = e == null ? void 0 : e.onSuccess) == null || s.call(e);
      }
  },
  push(t, e) {
    t !== Re.view && (Re.view = t, Re.history.push(t), Re.data = e);
  },
  reset(t, e) {
    Re.view = t, Re.history = [t], Re.data = e;
  },
  replace(t, e) {
    Re.history.at(-1) === t || (Re.view = t, Re.history[Re.history.length - 1] = t, Re.data = e);
  },
  goBack() {
    var e;
    const t = !R.state.activeCaipAddress && this.state.view === "ConnectingFarcaster";
    if (Re.history.length > 1 && !Re.history.includes("UnsupportedChain")) {
      Re.history.pop();
      const [r] = Re.history.slice(-1);
      r && (Re.view = r);
    } else
      et.close();
    (e = Re.data) != null && e.wallet && (Re.data.wallet = void 0), setTimeout(() => {
      var r, s, n;
      if (t) {
        ne.setFarcasterUrl(void 0, R.state.activeChain);
        const i = pe.getAuthConnector();
        (r = i == null ? void 0 : i.provider) == null || r.reload();
        const o = Xi(q.state);
        (n = (s = i == null ? void 0 : i.provider) == null ? void 0 : s.syncDappData) == null || n.call(s, {
          metadata: o.metadata,
          sdkVersion: o.sdkVersion,
          projectId: o.projectId,
          sdkType: o.sdkType
        });
      }
    }, 100);
  },
  goBackToIndex(t) {
    if (Re.history.length > 1) {
      Re.history = Re.history.slice(0, t + 1);
      const [e] = Re.history.slice(-1);
      e && (Re.view = e);
    }
  }
}, Kr = Ye({
  themeMode: "dark",
  themeVariables: {},
  w3mThemeVariables: void 0
}), Nt = {
  state: Kr,
  subscribe(t) {
    return Dt(Kr, () => t(Kr));
  },
  setThemeMode(t) {
    Kr.themeMode = t;
    try {
      const e = pe.getAuthConnector();
      if (e) {
        const r = Nt.getSnapshot().themeVariables;
        e.provider.syncTheme({
          themeMode: t,
          themeVariables: r,
          w3mThemeVariables: ns(r, t)
        });
      }
    } catch (e) {
      console.info("Unable to sync theme to auth connector");
    }
  },
  setThemeVariables(t) {
    Kr.themeVariables = C(C({}, Kr.themeVariables), t);
    try {
      const e = pe.getAuthConnector();
      if (e) {
        const r = Nt.getSnapshot().themeVariables;
        e.provider.syncTheme({
          themeVariables: r,
          w3mThemeVariables: ns(Kr.themeVariables, Kr.themeMode)
        });
      }
    } catch (e) {
      console.info("Unable to sync theme to auth connector");
    }
  },
  getSnapshot() {
    return Xi(Kr);
  }
}, og = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0,
  cosmos: void 0
}, Se = Ye({
  allConnectors: [],
  connectors: [],
  activeConnector: void 0,
  filterByNamespace: void 0,
  activeConnectorIds: C({}, og),
  filterByNamespaceMap: {
    eip155: !0,
    solana: !0,
    polkadot: !0,
    bip122: !0,
    cosmos: !0
  }
}), pe = {
  state: Se,
  subscribe(t) {
    return Dt(Se, () => {
      t(Se);
    });
  },
  subscribeKey(t, e) {
    return Wt(Se, t, e);
  },
  initialize(t) {
    t.forEach((e) => {
      const r = re.getConnectedConnectorId(e);
      r && this.setConnectorId(r, e);
    });
  },
  setActiveConnector(t) {
    t && (Se.activeConnector = en(t));
  },
  setConnectors(t) {
    t.filter((n) => !Se.allConnectors.some((i) => i.id === n.id && this.getConnectorName(i.name) === this.getConnectorName(n.name) && i.chain === n.chain)).forEach((n) => {
      n.type !== "MULTI_CHAIN" && Se.allConnectors.push(en(n));
    });
    const r = this.getEnabledNamespaces(), s = this.getEnabledConnectors(r);
    Se.connectors = this.mergeMultiChainConnectors(s);
  },
  filterByNamespaces(t) {
    Object.keys(Se.filterByNamespaceMap).forEach((e) => {
      Se.filterByNamespaceMap[e] = !1;
    }), t.forEach((e) => {
      Se.filterByNamespaceMap[e] = !0;
    }), this.updateConnectorsForEnabledNamespaces();
  },
  filterByNamespace(t, e) {
    Se.filterByNamespaceMap[t] = e, this.updateConnectorsForEnabledNamespaces();
  },
  updateConnectorsForEnabledNamespaces() {
    const t = this.getEnabledNamespaces(), e = this.getEnabledConnectors(t), r = this.areAllNamespacesEnabled();
    Se.connectors = this.mergeMultiChainConnectors(e), r ? le.clearFilterByNamespaces() : le.filterByNamespaces(t);
  },
  getEnabledNamespaces() {
    return Object.entries(Se.filterByNamespaceMap).filter(([t, e]) => e).map(([t]) => t);
  },
  getEnabledConnectors(t) {
    return Se.allConnectors.filter((e) => t.includes(e.chain));
  },
  areAllNamespacesEnabled() {
    return Object.values(Se.filterByNamespaceMap).every((t) => t);
  },
  mergeMultiChainConnectors(t) {
    const e = this.generateConnectorMapByName(t), r = [];
    return e.forEach((s) => {
      const n = s[0], i = (n == null ? void 0 : n.id) === se.CONNECTOR_ID.AUTH;
      s.length > 1 && n ? r.push({
        name: n.name,
        imageUrl: n.imageUrl,
        imageId: n.imageId,
        connectors: [...s],
        type: i ? "AUTH" : "MULTI_CHAIN",
        // These values are just placeholders, we don't use them in multi-chain connector select screen
        chain: "eip155",
        id: (n == null ? void 0 : n.id) || ""
      }) : n && r.push(n);
    }), r;
  },
  generateConnectorMapByName(t) {
    const e = /* @__PURE__ */ new Map();
    return t.forEach((r) => {
      const { name: s } = r, n = this.getConnectorName(s);
      if (!n)
        return;
      const i = e.get(n) || [];
      i.find((a) => a.chain === r.chain) || i.push(r), e.set(n, i);
    }), e;
  },
  getConnectorName(t) {
    return t && ({
      "Trust Wallet": "Trust"
    }[t] || t);
  },
  getUniqueConnectorsByName(t) {
    const e = [];
    return t.forEach((r) => {
      e.find((s) => s.chain === r.chain) || e.push(r);
    }), e;
  },
  addConnector(t) {
    var e, r, s;
    if (t.id === se.CONNECTOR_ID.AUTH) {
      const n = t, i = Xi(q.state), o = Nt.getSnapshot().themeMode, a = Nt.getSnapshot().themeVariables;
      (r = (e = n == null ? void 0 : n.provider) == null ? void 0 : e.syncDappData) == null || r.call(e, {
        metadata: i.metadata,
        sdkVersion: i.sdkVersion,
        projectId: i.projectId,
        sdkType: i.sdkType
      }), (s = n == null ? void 0 : n.provider) == null || s.syncTheme({
        themeMode: o,
        themeVariables: a,
        w3mThemeVariables: ns(a, o)
      }), this.setConnectors([t]);
    } else
      this.setConnectors([t]);
  },
  getAuthConnector(t) {
    var s;
    const e = t || R.state.activeChain, r = Se.connectors.find((n) => n.id === se.CONNECTOR_ID.AUTH);
    if (r)
      return (s = r == null ? void 0 : r.connectors) != null && s.length ? r.connectors.find((i) => i.chain === e) : r;
  },
  getAnnouncedConnectorRdns() {
    return Se.connectors.filter((t) => t.type === "ANNOUNCED").map((t) => {
      var e;
      return (e = t.info) == null ? void 0 : e.rdns;
    });
  },
  getConnectorById(t) {
    return Se.allConnectors.find((e) => e.id === t);
  },
  getConnector(t, e) {
    return Se.allConnectors.filter((s) => s.chain === R.state.activeChain).find((s) => {
      var n;
      return s.explorerId === t || ((n = s.info) == null ? void 0 : n.rdns) === e;
    });
  },
  syncIfAuthConnector(t) {
    var i, o;
    if (t.id !== "ID_AUTH")
      return;
    const e = t, r = Xi(q.state), s = Nt.getSnapshot().themeMode, n = Nt.getSnapshot().themeVariables;
    (o = (i = e == null ? void 0 : e.provider) == null ? void 0 : i.syncDappData) == null || o.call(i, {
      metadata: r.metadata,
      sdkVersion: r.sdkVersion,
      sdkType: r.sdkType,
      projectId: r.projectId
    }), e.provider.syncTheme({
      themeMode: s,
      themeVariables: n,
      w3mThemeVariables: ns(n, s)
    });
  },
  /**
   * Returns the connectors filtered by namespace.
   * @param namespace - The namespace to filter the connectors by.
   * @returns ConnectorWithProviders[].
   */
  getConnectorsByNamespace(t) {
    const e = Se.allConnectors.filter((r) => r.chain === t);
    return this.mergeMultiChainConnectors(e);
  },
  selectWalletConnector(t) {
    const e = pe.getConnector(t.id, t.rdns);
    R.state.activeChain === se.CHAIN.SOLANA && ky.handleSolanaDeeplinkRedirect((e == null ? void 0 : e.name) || t.name || ""), e ? xe.push("ConnectingExternal", { connector: e }) : xe.push("ConnectingWalletConnect", { wallet: t });
  },
  /**
   * Returns the connectors. If a namespace is provided, the connectors are filtered by namespace.
   * @param namespace - The namespace to filter the connectors by. If not provided, all connectors are returned.
   * @returns ConnectorWithProviders[].
   */
  getConnectors(t) {
    return t ? this.getConnectorsByNamespace(t) : this.mergeMultiChainConnectors(Se.allConnectors);
  },
  /**
   * Sets the filter by namespace and updates the connectors.
   * @param namespace - The namespace to filter the connectors by.
   */
  setFilterByNamespace(t) {
    Se.filterByNamespace = t, Se.connectors = this.getConnectors(t), le.setFilterByNamespace(t);
  },
  setConnectorId(t, e) {
    t && (Se.activeConnectorIds = B(C({}, Se.activeConnectorIds), {
      [e]: t
    }), re.setConnectedConnectorId(e, t));
  },
  removeConnectorId(t) {
    Se.activeConnectorIds = B(C({}, Se.activeConnectorIds), {
      [t]: void 0
    }), re.deleteConnectedConnectorId(t);
  },
  getConnectorId(t) {
    if (t)
      return Se.activeConnectorIds[t];
  },
  isConnected(t) {
    return t ? !!Se.activeConnectorIds[t] : Object.values(Se.activeConnectorIds).some((e) => !!e);
  },
  resetConnectorIds() {
    Se.activeConnectorIds = C({}, og);
  }
};
function ca(t, e) {
  return pe.getConnectorId(t) === e;
}
function Wy(t) {
  const e = Array.from(R.state.chains.keys());
  let r = [];
  return t ? (r.push([t, R.state.chains.get(t)]), ca(t, se.CONNECTOR_ID.WALLET_CONNECT) ? e.forEach((s) => {
    s !== t && ca(s, se.CONNECTOR_ID.WALLET_CONNECT) && r.push([s, R.state.chains.get(s)]);
  }) : ca(t, se.CONNECTOR_ID.AUTH) && e.forEach((s) => {
    s !== t && ca(s, se.CONNECTOR_ID.AUTH) && r.push([s, R.state.chains.get(s)]);
  })) : r = Array.from(R.state.chains.entries()), r;
}
var la = { exports: {} }, Id;
function Hy() {
  if (Id) return la.exports;
  Id = 1;
  var t = typeof Reflect == "object" ? Reflect : null, e = t && typeof t.apply == "function" ? t.apply : function(T, b, N) {
    return Function.prototype.apply.call(T, b, N);
  }, r;
  t && typeof t.ownKeys == "function" ? r = t.ownKeys : Object.getOwnPropertySymbols ? r = function(T) {
    return Object.getOwnPropertyNames(T).concat(Object.getOwnPropertySymbols(T));
  } : r = function(T) {
    return Object.getOwnPropertyNames(T);
  };
  function s(A) {
    console && console.warn && console.warn(A);
  }
  var n = Number.isNaN || function(T) {
    return T !== T;
  };
  function i() {
    i.init.call(this);
  }
  la.exports = i, la.exports.once = S, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._eventsCount = 0, i.prototype._maxListeners = void 0;
  var o = 10;
  function a(A) {
    if (typeof A != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof A);
  }
  Object.defineProperty(i, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return o;
    },
    set: function(A) {
      if (typeof A != "number" || A < 0 || n(A))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + A + ".");
      o = A;
    }
  }), i.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, i.prototype.setMaxListeners = function(T) {
    if (typeof T != "number" || T < 0 || n(T))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + T + ".");
    return this._maxListeners = T, this;
  };
  function c(A) {
    return A._maxListeners === void 0 ? i.defaultMaxListeners : A._maxListeners;
  }
  i.prototype.getMaxListeners = function() {
    return c(this);
  }, i.prototype.emit = function(T) {
    for (var b = [], N = 1; N < arguments.length; N++) b.push(arguments[N]);
    var P = T === "error", O = this._events;
    if (O !== void 0)
      P = P && O.error === void 0;
    else if (!P)
      return !1;
    if (P) {
      var x;
      if (b.length > 0 && (x = b[0]), x instanceof Error)
        throw x;
      var $ = new Error("Unhandled error." + (x ? " (" + x.message + ")" : ""));
      throw $.context = x, $;
    }
    var F = O[T];
    if (F === void 0)
      return !1;
    if (typeof F == "function")
      e(F, this, b);
    else
      for (var W = F.length, k = m(F, W), N = 0; N < W; ++N)
        e(k[N], this, b);
    return !0;
  };
  function l(A, T, b, N) {
    var P, O, x;
    if (a(b), O = A._events, O === void 0 ? (O = A._events = /* @__PURE__ */ Object.create(null), A._eventsCount = 0) : (O.newListener !== void 0 && (A.emit(
      "newListener",
      T,
      b.listener ? b.listener : b
    ), O = A._events), x = O[T]), x === void 0)
      x = O[T] = b, ++A._eventsCount;
    else if (typeof x == "function" ? x = O[T] = N ? [b, x] : [x, b] : N ? x.unshift(b) : x.push(b), P = c(A), P > 0 && x.length > P && !x.warned) {
      x.warned = !0;
      var $ = new Error("Possible EventEmitter memory leak detected. " + x.length + " " + String(T) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      $.name = "MaxListenersExceededWarning", $.emitter = A, $.type = T, $.count = x.length, s($);
    }
    return A;
  }
  i.prototype.addListener = function(T, b) {
    return l(this, T, b, !1);
  }, i.prototype.on = i.prototype.addListener, i.prototype.prependListener = function(T, b) {
    return l(this, T, b, !0);
  };
  function u() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function d(A, T, b) {
    var N = { fired: !1, wrapFn: void 0, target: A, type: T, listener: b }, P = u.bind(N);
    return P.listener = b, N.wrapFn = P, P;
  }
  i.prototype.once = function(T, b) {
    return a(b), this.on(T, d(this, T, b)), this;
  }, i.prototype.prependOnceListener = function(T, b) {
    return a(b), this.prependListener(T, d(this, T, b)), this;
  }, i.prototype.removeListener = function(T, b) {
    var N, P, O, x, $;
    if (a(b), P = this._events, P === void 0)
      return this;
    if (N = P[T], N === void 0)
      return this;
    if (N === b || N.listener === b)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete P[T], P.removeListener && this.emit("removeListener", T, N.listener || b));
    else if (typeof N != "function") {
      for (O = -1, x = N.length - 1; x >= 0; x--)
        if (N[x] === b || N[x].listener === b) {
          $ = N[x].listener, O = x;
          break;
        }
      if (O < 0)
        return this;
      O === 0 ? N.shift() : f(N, O), N.length === 1 && (P[T] = N[0]), P.removeListener !== void 0 && this.emit("removeListener", T, $ || b);
    }
    return this;
  }, i.prototype.off = i.prototype.removeListener, i.prototype.removeAllListeners = function(T) {
    var b, N, P;
    if (N = this._events, N === void 0)
      return this;
    if (N.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : N[T] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete N[T]), this;
    if (arguments.length === 0) {
      var O = Object.keys(N), x;
      for (P = 0; P < O.length; ++P)
        x = O[P], x !== "removeListener" && this.removeAllListeners(x);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (b = N[T], typeof b == "function")
      this.removeListener(T, b);
    else if (b !== void 0)
      for (P = b.length - 1; P >= 0; P--)
        this.removeListener(T, b[P]);
    return this;
  };
  function p(A, T, b) {
    var N = A._events;
    if (N === void 0)
      return [];
    var P = N[T];
    return P === void 0 ? [] : typeof P == "function" ? b ? [P.listener || P] : [P] : b ? w(P) : m(P, P.length);
  }
  i.prototype.listeners = function(T) {
    return p(this, T, !0);
  }, i.prototype.rawListeners = function(T) {
    return p(this, T, !1);
  }, i.listenerCount = function(A, T) {
    return typeof A.listenerCount == "function" ? A.listenerCount(T) : g.call(A, T);
  }, i.prototype.listenerCount = g;
  function g(A) {
    var T = this._events;
    if (T !== void 0) {
      var b = T[A];
      if (typeof b == "function")
        return 1;
      if (b !== void 0)
        return b.length;
    }
    return 0;
  }
  i.prototype.eventNames = function() {
    return this._eventsCount > 0 ? r(this._events) : [];
  };
  function m(A, T) {
    for (var b = new Array(T), N = 0; N < T; ++N)
      b[N] = A[N];
    return b;
  }
  function f(A, T) {
    for (; T + 1 < A.length; T++)
      A[T] = A[T + 1];
    A.pop();
  }
  function w(A) {
    for (var T = new Array(A.length), b = 0; b < T.length; ++b)
      T[b] = A[b].listener || A[b];
    return T;
  }
  function S(A, T) {
    return new Promise(function(b, N) {
      function P(x) {
        A.removeListener(T, O), N(x);
      }
      function O() {
        typeof A.removeListener == "function" && A.removeListener("error", P), b([].slice.call(arguments));
      }
      I(A, T, O, { once: !0 }), T !== "error" && E(A, P, { once: !0 });
    });
  }
  function E(A, T, b) {
    typeof A.on == "function" && I(A, "error", T, b);
  }
  function I(A, T, b, N) {
    if (typeof A.on == "function")
      N.once ? A.once(T, b) : A.on(T, b);
    else if (typeof A.addEventListener == "function")
      A.addEventListener(T, function P(O) {
        N.once && A.removeEventListener(T, P), b(O);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof A);
  }
  return la.exports;
}
var gr = Hy();
const ku = /* @__PURE__ */ Du(gr);
var Bc = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Bl = function(t, e) {
  return Bl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, s) {
    r.__proto__ = s;
  } || function(r, s) {
    for (var n in s) s.hasOwnProperty(n) && (r[n] = s[n]);
  }, Bl(t, e);
};
function Vy(t, e) {
  Bl(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
var jl = function() {
  return jl = Object.assign || function(e) {
    for (var r, s = 1, n = arguments.length; s < n; s++) {
      r = arguments[s];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i]);
    }
    return e;
  }, jl.apply(this, arguments);
};
function Ky(t, e) {
  var r = {};
  for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && e.indexOf(s) < 0 && (r[s] = t[s]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, s = Object.getOwnPropertySymbols(t); n < s.length; n++)
      e.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[n]) && (r[s[n]] = t[s[n]]);
  return r;
}
function Gy(t, e, r, s) {
  var n = arguments.length, i = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, r) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(t, e, r, s);
  else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (i = (n < 3 ? o(i) : n > 3 ? o(e, r, i) : o(e, r)) || i);
  return n > 3 && i && Object.defineProperty(e, r, i), i;
}
function Yy(t, e) {
  return function(r, s) {
    e(r, s, t);
  };
}
function Zy(t, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(t, e);
}
function Jy(t, e, r, s) {
  function n(i) {
    return i instanceof r ? i : new r(function(o) {
      o(i);
    });
  }
  return new (r || (r = Promise))(function(i, o) {
    function a(u) {
      try {
        l(s.next(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      try {
        l(s.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      u.done ? i(u.value) : n(u.value).then(a, c);
    }
    l((s = s.apply(t, e || [])).next());
  });
}
function Xy(t, e) {
  var r = { label: 0, sent: function() {
    if (i[0] & 1) throw i[1];
    return i[1];
  }, trys: [], ops: [] }, s, n, i, o;
  return o = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function a(l) {
    return function(u) {
      return c([l, u]);
    };
  }
  function c(l) {
    if (s) throw new TypeError("Generator is already executing.");
    for (; r; ) try {
      if (s = 1, n && (i = l[0] & 2 ? n.return : l[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, l[1])).done) return i;
      switch (n = 0, i && (l = [l[0] & 2, i.value]), l[0]) {
        case 0:
        case 1:
          i = l;
          break;
        case 4:
          return r.label++, { value: l[1], done: !1 };
        case 5:
          r.label++, n = l[1], l = [0];
          continue;
        case 7:
          l = r.ops.pop(), r.trys.pop();
          continue;
        default:
          if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (l[0] === 6 || l[0] === 2)) {
            r = 0;
            continue;
          }
          if (l[0] === 3 && (!i || l[1] > i[0] && l[1] < i[3])) {
            r.label = l[1];
            break;
          }
          if (l[0] === 6 && r.label < i[1]) {
            r.label = i[1], i = l;
            break;
          }
          if (i && r.label < i[2]) {
            r.label = i[2], r.ops.push(l);
            break;
          }
          i[2] && r.ops.pop(), r.trys.pop();
          continue;
      }
      l = e.call(t, r);
    } catch (u) {
      l = [6, u], n = 0;
    } finally {
      s = i = 0;
    }
    if (l[0] & 5) throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}
function Qy(t, e, r, s) {
  s === void 0 && (s = r), t[s] = e[r];
}
function eb(t, e) {
  for (var r in t) r !== "default" && !e.hasOwnProperty(r) && (e[r] = t[r]);
}
function ql(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], s = 0;
  if (r) return r.call(t);
  if (t && typeof t.length == "number") return {
    next: function() {
      return t && s >= t.length && (t = void 0), { value: t && t[s++], done: !t };
    }
  };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ag(t, e) {
  var r = typeof Symbol == "function" && t[Symbol.iterator];
  if (!r) return t;
  var s = r.call(t), n, i = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(n = s.next()).done; ) i.push(n.value);
  } catch (a) {
    o = { error: a };
  } finally {
    try {
      n && !n.done && (r = s.return) && r.call(s);
    } finally {
      if (o) throw o.error;
    }
  }
  return i;
}
function tb() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t = t.concat(ag(arguments[e]));
  return t;
}
function rb() {
  for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length;
  for (var s = Array(t), n = 0, e = 0; e < r; e++)
    for (var i = arguments[e], o = 0, a = i.length; o < a; o++, n++)
      s[n] = i[o];
  return s;
}
function Qi(t) {
  return this instanceof Qi ? (this.v = t, this) : new Qi(t);
}
function sb(t, e, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var s = r.apply(t, e || []), n, i = [];
  return n = {}, o("next"), o("throw"), o("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n;
  function o(p) {
    s[p] && (n[p] = function(g) {
      return new Promise(function(m, f) {
        i.push([p, g, m, f]) > 1 || a(p, g);
      });
    });
  }
  function a(p, g) {
    try {
      c(s[p](g));
    } catch (m) {
      d(i[0][3], m);
    }
  }
  function c(p) {
    p.value instanceof Qi ? Promise.resolve(p.value.v).then(l, u) : d(i[0][2], p);
  }
  function l(p) {
    a("next", p);
  }
  function u(p) {
    a("throw", p);
  }
  function d(p, g) {
    p(g), i.shift(), i.length && a(i[0][0], i[0][1]);
  }
}
function nb(t) {
  var e, r;
  return e = {}, s("next"), s("throw", function(n) {
    throw n;
  }), s("return"), e[Symbol.iterator] = function() {
    return this;
  }, e;
  function s(n, i) {
    e[n] = t[n] ? function(o) {
      return (r = !r) ? { value: Qi(t[n](o)), done: n === "return" } : i ? i(o) : o;
    } : i;
  }
}
function ib(t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = t[Symbol.asyncIterator], r;
  return e ? e.call(t) : (t = typeof ql == "function" ? ql(t) : t[Symbol.iterator](), r = {}, s("next"), s("throw"), s("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r);
  function s(i) {
    r[i] = t[i] && function(o) {
      return new Promise(function(a, c) {
        o = t[i](o), n(a, c, o.done, o.value);
      });
    };
  }
  function n(i, o, a, c) {
    Promise.resolve(c).then(function(l) {
      i({ value: l, done: a });
    }, o);
  }
}
function ob(t, e) {
  return Object.defineProperty ? Object.defineProperty(t, "raw", { value: e }) : t.raw = e, t;
}
function ab(t) {
  if (t && t.__esModule) return t;
  var e = {};
  if (t != null) for (var r in t) Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
  return e.default = t, e;
}
function cb(t) {
  return t && t.__esModule ? t : { default: t };
}
function lb(t, e) {
  if (!e.has(t))
    throw new TypeError("attempted to get private field on non-instance");
  return e.get(t);
}
function ub(t, e, r) {
  if (!e.has(t))
    throw new TypeError("attempted to set private field on non-instance");
  return e.set(t, r), r;
}
const db = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get __assign() {
    return jl;
  },
  __asyncDelegator: nb,
  __asyncGenerator: sb,
  __asyncValues: ib,
  __await: Qi,
  __awaiter: Jy,
  __classPrivateFieldGet: lb,
  __classPrivateFieldSet: ub,
  __createBinding: Qy,
  __decorate: Gy,
  __exportStar: eb,
  __extends: Vy,
  __generator: Xy,
  __importDefault: cb,
  __importStar: ab,
  __makeTemplateObject: ob,
  __metadata: Zy,
  __param: Yy,
  __read: ag,
  __rest: Ky,
  __spread: tb,
  __spreadArrays: rb,
  __values: ql
}, Symbol.toStringTag, { value: "Module" })), Wo = /* @__PURE__ */ by(db);
var jc = {}, vi = {}, Nd;
function hb() {
  if (Nd) return vi;
  Nd = 1, Object.defineProperty(vi, "__esModule", { value: !0 }), vi.delay = void 0;
  function t(e) {
    return new Promise((r) => {
      setTimeout(() => {
        r(!0);
      }, e);
    });
  }
  return vi.delay = t, vi;
}
var Ds = {}, qc = {}, ks = {}, Td;
function pb() {
  return Td || (Td = 1, Object.defineProperty(ks, "__esModule", { value: !0 }), ks.ONE_THOUSAND = ks.ONE_HUNDRED = void 0, ks.ONE_HUNDRED = 100, ks.ONE_THOUSAND = 1e3), ks;
}
var zc = {}, Od;
function fb() {
  return Od || (Od = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.ONE_YEAR = t.FOUR_WEEKS = t.THREE_WEEKS = t.TWO_WEEKS = t.ONE_WEEK = t.THIRTY_DAYS = t.SEVEN_DAYS = t.FIVE_DAYS = t.THREE_DAYS = t.ONE_DAY = t.TWENTY_FOUR_HOURS = t.TWELVE_HOURS = t.SIX_HOURS = t.THREE_HOURS = t.ONE_HOUR = t.SIXTY_MINUTES = t.THIRTY_MINUTES = t.TEN_MINUTES = t.FIVE_MINUTES = t.ONE_MINUTE = t.SIXTY_SECONDS = t.THIRTY_SECONDS = t.TEN_SECONDS = t.FIVE_SECONDS = t.ONE_SECOND = void 0, t.ONE_SECOND = 1, t.FIVE_SECONDS = 5, t.TEN_SECONDS = 10, t.THIRTY_SECONDS = 30, t.SIXTY_SECONDS = 60, t.ONE_MINUTE = t.SIXTY_SECONDS, t.FIVE_MINUTES = t.ONE_MINUTE * 5, t.TEN_MINUTES = t.ONE_MINUTE * 10, t.THIRTY_MINUTES = t.ONE_MINUTE * 30, t.SIXTY_MINUTES = t.ONE_MINUTE * 60, t.ONE_HOUR = t.SIXTY_MINUTES, t.THREE_HOURS = t.ONE_HOUR * 3, t.SIX_HOURS = t.ONE_HOUR * 6, t.TWELVE_HOURS = t.ONE_HOUR * 12, t.TWENTY_FOUR_HOURS = t.ONE_HOUR * 24, t.ONE_DAY = t.TWENTY_FOUR_HOURS, t.THREE_DAYS = t.ONE_DAY * 3, t.FIVE_DAYS = t.ONE_DAY * 5, t.SEVEN_DAYS = t.ONE_DAY * 7, t.THIRTY_DAYS = t.ONE_DAY * 30, t.ONE_WEEK = t.SEVEN_DAYS, t.TWO_WEEKS = t.ONE_WEEK * 2, t.THREE_WEEKS = t.ONE_WEEK * 3, t.FOUR_WEEKS = t.ONE_WEEK * 4, t.ONE_YEAR = t.ONE_DAY * 365;
  }(zc)), zc;
}
var Rd;
function cg() {
  return Rd || (Rd = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const e = Wo;
    e.__exportStar(pb(), t), e.__exportStar(fb(), t);
  }(qc)), qc;
}
var Pd;
function gb() {
  if (Pd) return Ds;
  Pd = 1, Object.defineProperty(Ds, "__esModule", { value: !0 }), Ds.fromMiliseconds = Ds.toMiliseconds = void 0;
  const t = cg();
  function e(s) {
    return s * t.ONE_THOUSAND;
  }
  Ds.toMiliseconds = e;
  function r(s) {
    return Math.floor(s / t.ONE_THOUSAND);
  }
  return Ds.fromMiliseconds = r, Ds;
}
var xd;
function mb() {
  return xd || (xd = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const e = Wo;
    e.__exportStar(hb(), t), e.__exportStar(gb(), t);
  }(jc)), jc;
}
var bn = {}, Dd;
function wb() {
  if (Dd) return bn;
  Dd = 1, Object.defineProperty(bn, "__esModule", { value: !0 }), bn.Watch = void 0;
  class t {
    constructor() {
      this.timestamps = /* @__PURE__ */ new Map();
    }
    start(r) {
      if (this.timestamps.has(r))
        throw new Error(`Watch already started for label: ${r}`);
      this.timestamps.set(r, { started: Date.now() });
    }
    stop(r) {
      const s = this.get(r);
      if (typeof s.elapsed != "undefined")
        throw new Error(`Watch already stopped for label: ${r}`);
      const n = Date.now() - s.started;
      this.timestamps.set(r, { started: s.started, elapsed: n });
    }
    get(r) {
      const s = this.timestamps.get(r);
      if (typeof s == "undefined")
        throw new Error(`No timestamp found for label: ${r}`);
      return s;
    }
    elapsed(r) {
      const s = this.get(r);
      return s.elapsed || Date.now() - s.started;
    }
  }
  return bn.Watch = t, bn.default = t, bn;
}
var Wc = {}, Ei = {}, kd;
function yb() {
  if (kd) return Ei;
  kd = 1, Object.defineProperty(Ei, "__esModule", { value: !0 }), Ei.IWatch = void 0;
  class t {
  }
  return Ei.IWatch = t, Ei;
}
var $d;
function bb() {
  return $d || ($d = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), Wo.__exportStar(yb(), t);
  }(Wc)), Wc;
}
var Ud;
function vb() {
  return Ud || (Ud = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const e = Wo;
    e.__exportStar(mb(), t), e.__exportStar(wb(), t), e.__exportStar(bb(), t), e.__exportStar(cg(), t);
  }(Bc)), Bc;
}
var H = vb();
class fn {
}
let Eb = class extends fn {
  constructor(e) {
    super();
  }
};
const Ld = H.FIVE_SECONDS, ui = { pulse: "heartbeat_pulse" };
let _b = class lg extends Eb {
  constructor(e) {
    super(e), this.events = new gr.EventEmitter(), this.interval = Ld, this.interval = (e == null ? void 0 : e.interval) || Ld;
  }
  static init(e) {
    return h(this, null, function* () {
      const r = new lg(e);
      return yield r.init(), r;
    });
  }
  init() {
    return h(this, null, function* () {
      yield this.initialize();
    });
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e, r) {
    this.events.on(e, r);
  }
  once(e, r) {
    this.events.once(e, r);
  }
  off(e, r) {
    this.events.off(e, r);
  }
  removeListener(e, r) {
    this.events.removeListener(e, r);
  }
  initialize() {
    return h(this, null, function* () {
      this.intervalRef = setInterval(() => this.pulse(), H.toMiliseconds(this.interval));
    });
  }
  pulse() {
    this.events.emit(ui.pulse);
  }
};
const Cb = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Ab = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Sb = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Ib(t, e) {
  if (t === "__proto__" || t === "constructor" && e && typeof e == "object" && "prototype" in e) {
    Nb(t);
    return;
  }
  return e;
}
function Nb(t) {
  console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`);
}
function ua(t, e = {}) {
  if (typeof t != "string")
    return t;
  if (t[0] === '"' && t[t.length - 1] === '"' && t.indexOf("\\") === -1)
    return t.slice(1, -1);
  const r = t.trim();
  if (r.length <= 9)
    switch (r.toLowerCase()) {
      case "true":
        return !0;
      case "false":
        return !1;
      case "undefined":
        return;
      case "null":
        return null;
      case "nan":
        return Number.NaN;
      case "infinity":
        return Number.POSITIVE_INFINITY;
      case "-infinity":
        return Number.NEGATIVE_INFINITY;
    }
  if (!Sb.test(t)) {
    if (e.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return t;
  }
  try {
    if (Cb.test(t) || Ab.test(t)) {
      if (e.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t, Ib);
    }
    return JSON.parse(t);
  } catch (s) {
    if (e.strict)
      throw s;
    return t;
  }
}
function Tb(t) {
  return !t || typeof t.then != "function" ? Promise.resolve(t) : t;
}
function ct(t, ...e) {
  try {
    return Tb(t(...e));
  } catch (r) {
    return Promise.reject(r);
  }
}
function Ob(t) {
  const e = typeof t;
  return t === null || e !== "object" && e !== "function";
}
function Rb(t) {
  const e = Object.getPrototypeOf(t);
  return !e || e.isPrototypeOf(Object);
}
function xa(t) {
  if (Ob(t))
    return String(t);
  if (Rb(t) || Array.isArray(t))
    return JSON.stringify(t);
  if (typeof t.toJSON == "function")
    return xa(t.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
const zl = "base64:";
function Pb(t) {
  return typeof t == "string" ? t : zl + kb(t);
}
function xb(t) {
  return typeof t != "string" || !t.startsWith(zl) ? t : Db(t.slice(zl.length));
}
function Db(t) {
  return globalThis.Buffer ? Buffer.from(t, "base64") : Uint8Array.from(
    globalThis.atob(t),
    (e) => e.codePointAt(0)
  );
}
function kb(t) {
  return globalThis.Buffer ? Buffer.from(t).toString("base64") : globalThis.btoa(String.fromCodePoint(...t));
}
function Ft(t) {
  var e;
  return t && ((e = t.split("?")[0]) == null ? void 0 : e.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "")) || "";
}
function $b(...t) {
  return Ft(t.join(":"));
}
function da(t) {
  return t = Ft(t), t ? t + ":" : "";
}
function Ub(t, e) {
  if (e === void 0)
    return !0;
  let r = 0, s = t.indexOf(":");
  for (; s > -1; )
    r++, s = t.indexOf(":", s + 1);
  return r <= e;
}
function Lb(t, e) {
  return e ? t.startsWith(e) && t[t.length - 1] !== "$" : t[t.length - 1] !== "$";
}
const Mb = "memory", Fb = () => {
  const t = /* @__PURE__ */ new Map();
  return {
    name: Mb,
    getInstance: () => t,
    hasItem(e) {
      return t.has(e);
    },
    getItem(e) {
      var r;
      return (r = t.get(e)) != null ? r : null;
    },
    getItemRaw(e) {
      var r;
      return (r = t.get(e)) != null ? r : null;
    },
    setItem(e, r) {
      t.set(e, r);
    },
    setItemRaw(e, r) {
      t.set(e, r);
    },
    removeItem(e) {
      t.delete(e);
    },
    getKeys() {
      return [...t.keys()];
    },
    clear() {
      t.clear();
    },
    dispose() {
      t.clear();
    }
  };
};
function Bb(t = {}) {
  const e = {
    mounts: { "": t.driver || Fb() },
    mountpoints: [""],
    watching: !1,
    watchListeners: [],
    unwatch: {}
  }, r = (u) => {
    for (const d of e.mountpoints)
      if (u.startsWith(d))
        return {
          base: d,
          relativeKey: u.slice(d.length),
          driver: e.mounts[d]
        };
    return {
      base: "",
      relativeKey: u,
      driver: e.mounts[""]
    };
  }, s = (u, d) => e.mountpoints.filter(
    (p) => p.startsWith(u) || d && u.startsWith(p)
  ).map((p) => ({
    relativeBase: u.length > p.length ? u.slice(p.length) : void 0,
    mountpoint: p,
    driver: e.mounts[p]
  })), n = (u, d) => {
    if (e.watching) {
      d = Ft(d);
      for (const p of e.watchListeners)
        p(u, d);
    }
  }, i = () => h(null, null, function* () {
    if (!e.watching) {
      e.watching = !0;
      for (const u in e.mounts)
        e.unwatch[u] = yield Md(
          e.mounts[u],
          n,
          u
        );
    }
  }), o = () => h(null, null, function* () {
    if (e.watching) {
      for (const u in e.unwatch)
        yield e.unwatch[u]();
      e.unwatch = {}, e.watching = !1;
    }
  }), a = (u, d, p) => {
    const g = /* @__PURE__ */ new Map(), m = (f) => {
      let w = g.get(f.base);
      return w || (w = {
        driver: f.driver,
        base: f.base,
        items: []
      }, g.set(f.base, w)), w;
    };
    for (const f of u) {
      const w = typeof f == "string", S = Ft(w ? f : f.key), E = w ? void 0 : f.value, I = w || !f.options ? d : C(C({}, d), f.options), A = r(S);
      m(A).items.push({
        key: S,
        value: E,
        relativeKey: A.relativeKey,
        options: I
      });
    }
    return Promise.all([...g.values()].map((f) => p(f))).then(
      (f) => f.flat()
    );
  }, c = {
    // Item
    hasItem(u, d = {}) {
      u = Ft(u);
      const { relativeKey: p, driver: g } = r(u);
      return ct(g.hasItem, p, d);
    },
    getItem(u, d = {}) {
      u = Ft(u);
      const { relativeKey: p, driver: g } = r(u);
      return ct(g.getItem, p, d).then(
        (m) => ua(m)
      );
    },
    getItems(u, d = {}) {
      return a(u, d, (p) => p.driver.getItems ? ct(
        p.driver.getItems,
        p.items.map((g) => ({
          key: g.relativeKey,
          options: g.options
        })),
        d
      ).then(
        (g) => g.map((m) => ({
          key: $b(p.base, m.key),
          value: ua(m.value)
        }))
      ) : Promise.all(
        p.items.map((g) => ct(
          p.driver.getItem,
          g.relativeKey,
          g.options
        ).then((m) => ({
          key: g.key,
          value: ua(m)
        })))
      ));
    },
    getItemRaw(u, d = {}) {
      u = Ft(u);
      const { relativeKey: p, driver: g } = r(u);
      return g.getItemRaw ? ct(g.getItemRaw, p, d) : ct(g.getItem, p, d).then(
        (m) => xb(m)
      );
    },
    setItem(g, m) {
      return h(this, arguments, function* (u, d, p = {}) {
        if (d === void 0)
          return c.removeItem(u);
        u = Ft(u);
        const { relativeKey: f, driver: w } = r(u);
        w.setItem && (yield ct(w.setItem, f, xa(d), p), w.watch || n("update", u));
      });
    },
    setItems(u, d) {
      return h(this, null, function* () {
        yield a(u, d, (p) => h(null, null, function* () {
          if (p.driver.setItems)
            return ct(
              p.driver.setItems,
              p.items.map((g) => ({
                key: g.relativeKey,
                value: xa(g.value),
                options: g.options
              })),
              d
            );
          p.driver.setItem && (yield Promise.all(
            p.items.map((g) => ct(
              p.driver.setItem,
              g.relativeKey,
              xa(g.value),
              g.options
            ))
          ));
        }));
      });
    },
    setItemRaw(g, m) {
      return h(this, arguments, function* (u, d, p = {}) {
        if (d === void 0)
          return c.removeItem(u, p);
        u = Ft(u);
        const { relativeKey: f, driver: w } = r(u);
        if (w.setItemRaw)
          yield ct(w.setItemRaw, f, d, p);
        else if (w.setItem)
          yield ct(w.setItem, f, Pb(d), p);
        else
          return;
        w.watch || n("update", u);
      });
    },
    removeItem(p) {
      return h(this, arguments, function* (u, d = {}) {
        typeof d == "boolean" && (d = { removeMeta: d }), u = Ft(u);
        const { relativeKey: g, driver: m } = r(u);
        m.removeItem && (yield ct(m.removeItem, g, d), (d.removeMeta || d.removeMata) && (yield ct(m.removeItem, g + "$", d)), m.watch || n("remove", u));
      });
    },
    // Meta
    getMeta(p) {
      return h(this, arguments, function* (u, d = {}) {
        typeof d == "boolean" && (d = { nativeOnly: d }), u = Ft(u);
        const { relativeKey: g, driver: m } = r(u), f = /* @__PURE__ */ Object.create(null);
        if (m.getMeta && Object.assign(f, yield ct(m.getMeta, g, d)), !d.nativeOnly) {
          const w = yield ct(
            m.getItem,
            g + "$",
            d
          ).then((S) => ua(S));
          w && typeof w == "object" && (typeof w.atime == "string" && (w.atime = new Date(w.atime)), typeof w.mtime == "string" && (w.mtime = new Date(w.mtime)), Object.assign(f, w));
        }
        return f;
      });
    },
    setMeta(u, d, p = {}) {
      return this.setItem(u + "$", d, p);
    },
    removeMeta(u, d = {}) {
      return this.removeItem(u + "$", d);
    },
    // Keys
    getKeys(p) {
      return h(this, arguments, function* (u, d = {}) {
        var E;
        u = da(u);
        const g = s(u, !0);
        let m = [];
        const f = [];
        let w = !0;
        for (const I of g) {
          (E = I.driver.flags) != null && E.maxDepth || (w = !1);
          const A = yield ct(
            I.driver.getKeys,
            I.relativeBase,
            d
          );
          for (const T of A) {
            const b = I.mountpoint + Ft(T);
            m.some((N) => b.startsWith(N)) || f.push(b);
          }
          m = [
            I.mountpoint,
            ...m.filter((T) => !T.startsWith(I.mountpoint))
          ];
        }
        const S = d.maxDepth !== void 0 && !w;
        return f.filter(
          (I) => (!S || Ub(I, d.maxDepth)) && Lb(I, u)
        );
      });
    },
    // Utils
    clear(p) {
      return h(this, arguments, function* (u, d = {}) {
        u = da(u), yield Promise.all(
          s(u, !1).map((g) => h(null, null, function* () {
            if (g.driver.clear)
              return ct(g.driver.clear, g.relativeBase, d);
            if (g.driver.removeItem) {
              const m = yield g.driver.getKeys(g.relativeBase || "", d);
              return Promise.all(
                m.map((f) => g.driver.removeItem(f, d))
              );
            }
          }))
        );
      });
    },
    dispose() {
      return h(this, null, function* () {
        yield Promise.all(
          Object.values(e.mounts).map((u) => Fd(u))
        );
      });
    },
    watch(u) {
      return h(this, null, function* () {
        return yield i(), e.watchListeners.push(u), () => h(null, null, function* () {
          e.watchListeners = e.watchListeners.filter(
            (d) => d !== u
          ), e.watchListeners.length === 0 && (yield o());
        });
      });
    },
    unwatch() {
      return h(this, null, function* () {
        e.watchListeners = [], yield o();
      });
    },
    // Mount
    mount(u, d) {
      if (u = da(u), u && e.mounts[u])
        throw new Error(`already mounted at ${u}`);
      return u && (e.mountpoints.push(u), e.mountpoints.sort((p, g) => g.length - p.length)), e.mounts[u] = d, e.watching && Promise.resolve(Md(d, n, u)).then((p) => {
        e.unwatch[u] = p;
      }).catch(console.error), c;
    },
    unmount(u, d = !0) {
      return h(this, null, function* () {
        var p, g;
        u = da(u), !(!u || !e.mounts[u]) && (e.watching && u in e.unwatch && ((g = (p = e.unwatch)[u]) == null || g.call(p), delete e.unwatch[u]), d && (yield Fd(e.mounts[u])), e.mountpoints = e.mountpoints.filter((m) => m !== u), delete e.mounts[u]);
      });
    },
    getMount(u = "") {
      u = Ft(u) + ":";
      const d = r(u);
      return {
        driver: d.driver,
        base: d.base
      };
    },
    getMounts(u = "", d = {}) {
      return u = Ft(u), s(u, d.parents).map((g) => ({
        driver: g.driver,
        base: g.mountpoint
      }));
    },
    // Aliases
    keys: (u, d = {}) => c.getKeys(u, d),
    get: (u, d = {}) => c.getItem(u, d),
    set: (u, d, p = {}) => c.setItem(u, d, p),
    has: (u, d = {}) => c.hasItem(u, d),
    del: (u, d = {}) => c.removeItem(u, d),
    remove: (u, d = {}) => c.removeItem(u, d)
  };
  return c;
}
function Md(t, e, r) {
  return t.watch ? t.watch((s, n) => e(s, r + n)) : () => {
  };
}
function Fd(t) {
  return h(this, null, function* () {
    typeof t.dispose == "function" && (yield ct(t.dispose));
  });
}
function gn(t) {
  return new Promise((e, r) => {
    t.oncomplete = t.onsuccess = () => e(t.result), t.onabort = t.onerror = () => r(t.error);
  });
}
function ug(t, e) {
  let r;
  const s = () => {
    if (r)
      return r;
    const n = indexedDB.open(t);
    return n.onupgradeneeded = () => n.result.createObjectStore(e), r = gn(n), r.then((i) => {
      i.onclose = () => r = void 0;
    }, () => {
    }), r;
  };
  return (n, i) => s().then((o) => i(o.transaction(e, n).objectStore(e)));
}
let Hc;
function Ho() {
  return Hc || (Hc = ug("keyval-store", "keyval")), Hc;
}
function Bd(t, e = Ho()) {
  return e("readonly", (r) => gn(r.get(t)));
}
function jb(t, e, r = Ho()) {
  return r("readwrite", (s) => (s.put(e, t), gn(s.transaction)));
}
function qb(t, e = Ho()) {
  return e("readwrite", (r) => (r.delete(t), gn(r.transaction)));
}
function zb(t = Ho()) {
  return t("readwrite", (e) => (e.clear(), gn(e.transaction)));
}
function Wb(t, e) {
  return t.openCursor().onsuccess = function() {
    this.result && (e(this.result), this.result.continue());
  }, gn(t.transaction);
}
function Hb(t = Ho()) {
  return t("readonly", (e) => {
    if (e.getAllKeys)
      return gn(e.getAllKeys());
    const r = [];
    return Wb(e, (s) => r.push(s.key)).then(() => r);
  });
}
const Vb = (t) => JSON.stringify(t, (e, r) => typeof r == "bigint" ? r.toString() + "n" : r), Kb = (t) => {
  const e = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g, r = t.replace(e, '$1"$2n"$3');
  return JSON.parse(r, (s, n) => typeof n == "string" && n.match(/^\d+n$/) ? BigInt(n.substring(0, n.length - 1)) : n);
};
function tn(t) {
  if (typeof t != "string")
    throw new Error(`Cannot safe json parse value of type ${typeof t}`);
  try {
    return Kb(t);
  } catch (e) {
    return t;
  }
}
function cs(t) {
  return typeof t == "string" ? t : Vb(t) || "";
}
const Gb = "idb-keyval";
var Yb = (t = {}) => {
  const e = t.base && t.base.length > 0 ? `${t.base}:` : "", r = (i) => e + i;
  let s;
  return t.dbName && t.storeName && (s = ug(t.dbName, t.storeName)), { name: Gb, options: t, hasItem(i) {
    return h(this, null, function* () {
      return !(typeof (yield Bd(r(i), s)) > "u");
    });
  }, getItem(i) {
    return h(this, null, function* () {
      var o;
      return (o = yield Bd(r(i), s)) != null ? o : null;
    });
  }, setItem(i, o) {
    return jb(r(i), o, s);
  }, removeItem(i) {
    return qb(r(i), s);
  }, getKeys() {
    return Hb(s);
  }, clear() {
    return zb(s);
  } };
};
const Zb = "WALLET_CONNECT_V2_INDEXED_DB", Jb = "keyvaluestorage";
let Xb = class {
  constructor() {
    this.indexedDb = Bb({ driver: Yb({ dbName: Zb, storeName: Jb }) });
  }
  getKeys() {
    return h(this, null, function* () {
      return this.indexedDb.getKeys();
    });
  }
  getEntries() {
    return h(this, null, function* () {
      return (yield this.indexedDb.getItems(yield this.indexedDb.getKeys())).map((e) => [e.key, e.value]);
    });
  }
  getItem(e) {
    return h(this, null, function* () {
      const r = yield this.indexedDb.getItem(e);
      if (r !== null) return r;
    });
  }
  setItem(e, r) {
    return h(this, null, function* () {
      yield this.indexedDb.setItem(e, cs(r));
    });
  }
  removeItem(e) {
    return h(this, null, function* () {
      yield this.indexedDb.removeItem(e);
    });
  }
};
var Vc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Da = { exports: {} };
(function() {
  let t;
  function e() {
  }
  t = e, t.prototype.getItem = function(r) {
    return this.hasOwnProperty(r) ? String(this[r]) : null;
  }, t.prototype.setItem = function(r, s) {
    this[r] = String(s);
  }, t.prototype.removeItem = function(r) {
    delete this[r];
  }, t.prototype.clear = function() {
    const r = this;
    Object.keys(r).forEach(function(s) {
      r[s] = void 0, delete r[s];
    });
  }, t.prototype.key = function(r) {
    return r = r || 0, Object.keys(this)[r];
  }, t.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof Vc < "u" && Vc.localStorage ? Da.exports = Vc.localStorage : typeof window < "u" && window.localStorage ? Da.exports = window.localStorage : Da.exports = new e();
})();
function Qb(t) {
  var e;
  return [t[0], tn((e = t[1]) != null ? e : "")];
}
let ev = class {
  constructor() {
    this.localStorage = Da.exports;
  }
  getKeys() {
    return h(this, null, function* () {
      return Object.keys(this.localStorage);
    });
  }
  getEntries() {
    return h(this, null, function* () {
      return Object.entries(this.localStorage).map(Qb);
    });
  }
  getItem(e) {
    return h(this, null, function* () {
      const r = this.localStorage.getItem(e);
      if (r !== null) return tn(r);
    });
  }
  setItem(e, r) {
    return h(this, null, function* () {
      this.localStorage.setItem(e, cs(r));
    });
  }
  removeItem(e) {
    return h(this, null, function* () {
      this.localStorage.removeItem(e);
    });
  }
};
const tv = "wc_storage_version", jd = 1, rv = (t, e, r) => h(null, null, function* () {
  const s = tv, n = yield e.getItem(s);
  if (n && n >= jd) {
    r(e);
    return;
  }
  const i = yield t.getKeys();
  if (!i.length) {
    r(e);
    return;
  }
  const o = [];
  for (; i.length; ) {
    const a = i.shift();
    if (!a) continue;
    const c = a.toLowerCase();
    if (c.includes("wc@") || c.includes("walletconnect") || c.includes("wc_") || c.includes("wallet_connect")) {
      const l = yield t.getItem(a);
      yield e.setItem(a, l), o.push(a);
    }
  }
  yield e.setItem(s, jd), r(e), sv(t, o);
}), sv = (t, e) => h(null, null, function* () {
  e.length && e.forEach((r) => h(null, null, function* () {
    yield t.removeItem(r);
  }));
});
let nv = class {
  constructor() {
    this.initialized = !1, this.setInitialized = (r) => {
      this.storage = r, this.initialized = !0;
    };
    const e = new ev();
    this.storage = e;
    try {
      const r = new Xb();
      rv(e, r, this.setInitialized);
    } catch (r) {
      this.initialized = !0;
    }
  }
  getKeys() {
    return h(this, null, function* () {
      return yield this.initialize(), this.storage.getKeys();
    });
  }
  getEntries() {
    return h(this, null, function* () {
      return yield this.initialize(), this.storage.getEntries();
    });
  }
  getItem(e) {
    return h(this, null, function* () {
      return yield this.initialize(), this.storage.getItem(e);
    });
  }
  setItem(e, r) {
    return h(this, null, function* () {
      return yield this.initialize(), this.storage.setItem(e, r);
    });
  }
  removeItem(e) {
    return h(this, null, function* () {
      return yield this.initialize(), this.storage.removeItem(e);
    });
  }
  initialize() {
    return h(this, null, function* () {
      this.initialized || (yield new Promise((e) => {
        const r = setInterval(() => {
          this.initialized && (clearInterval(r), e());
        }, 20);
      }));
    });
  }
};
var Kc, qd;
function iv() {
  if (qd) return Kc;
  qd = 1;
  function t(r) {
    try {
      return JSON.stringify(r);
    } catch (s) {
      return '"[Circular]"';
    }
  }
  Kc = e;
  function e(r, s, n) {
    var i = n && n.stringify || t, o = 1;
    if (typeof r == "object" && r !== null) {
      var a = s.length + o;
      if (a === 1) return r;
      var c = new Array(a);
      c[0] = i(r);
      for (var l = 1; l < a; l++)
        c[l] = i(s[l]);
      return c.join(" ");
    }
    if (typeof r != "string")
      return r;
    var u = s.length;
    if (u === 0) return r;
    for (var d = "", p = 1 - o, g = -1, m = r && r.length || 0, f = 0; f < m; ) {
      if (r.charCodeAt(f) === 37 && f + 1 < m) {
        switch (g = g > -1 ? g : 0, r.charCodeAt(f + 1)) {
          case 100:
          // 'd'
          case 102:
            if (p >= u || s[p] == null) break;
            g < f && (d += r.slice(g, f)), d += Number(s[p]), g = f + 2, f++;
            break;
          case 105:
            if (p >= u || s[p] == null) break;
            g < f && (d += r.slice(g, f)), d += Math.floor(Number(s[p])), g = f + 2, f++;
            break;
          case 79:
          // 'O'
          case 111:
          // 'o'
          case 106:
            if (p >= u || s[p] === void 0) break;
            g < f && (d += r.slice(g, f));
            var w = typeof s[p];
            if (w === "string") {
              d += "'" + s[p] + "'", g = f + 2, f++;
              break;
            }
            if (w === "function") {
              d += s[p].name || "<anonymous>", g = f + 2, f++;
              break;
            }
            d += i(s[p]), g = f + 2, f++;
            break;
          case 115:
            if (p >= u)
              break;
            g < f && (d += r.slice(g, f)), d += String(s[p]), g = f + 2, f++;
            break;
          case 37:
            g < f && (d += r.slice(g, f)), d += "%", g = f + 2, f++, p--;
            break;
        }
        ++p;
      }
      ++f;
    }
    return g === -1 ? r : (g < m && (d += r.slice(g)), d);
  }
  return Kc;
}
var Gc, zd;
function ov() {
  if (zd) return Gc;
  zd = 1;
  const t = iv();
  Gc = n;
  const e = T().console || {}, r = {
    mapHttpRequest: m,
    mapHttpResponse: m,
    wrapRequestSerializer: f,
    wrapResponseSerializer: f,
    wrapErrorSerializer: f,
    req: m,
    res: m,
    err: p
  };
  function s(b, N) {
    return Array.isArray(b) ? b.filter(function(O) {
      return O !== "!stdSerializers.err";
    }) : b === !0 ? Object.keys(N) : !1;
  }
  function n(b) {
    b = b || {}, b.browser = b.browser || {};
    const N = b.browser.transmit;
    if (N && typeof N.send != "function")
      throw Error("pino: transmit option must have a send function");
    const P = b.browser.write || e;
    b.browser.write && (b.browser.asObject = !0);
    const O = b.serializers || {}, x = s(b.browser.serialize, O);
    let $ = b.browser.serialize;
    Array.isArray(b.browser.serialize) && b.browser.serialize.indexOf("!stdSerializers.err") > -1 && ($ = !1);
    const F = ["error", "fatal", "warn", "info", "debug", "trace"];
    typeof P == "function" && (P.error = P.fatal = P.warn = P.info = P.debug = P.trace = P), b.enabled === !1 && (b.level = "silent");
    const W = b.level || "info", k = Object.create(P);
    k.log || (k.log = w), Object.defineProperty(k, "levelVal", {
      get: _
    }), Object.defineProperty(k, "level", {
      get: D,
      set: L
    });
    const v = {
      transmit: N,
      serialize: x,
      asObject: b.browser.asObject,
      levels: F,
      timestamp: g(b)
    };
    k.levels = n.levels, k.level = W, k.setMaxListeners = k.getMaxListeners = k.emit = k.addListener = k.on = k.prependListener = k.once = k.prependOnceListener = k.removeListener = k.removeAllListeners = k.listeners = k.listenerCount = k.eventNames = k.write = k.flush = w, k.serializers = O, k._serialize = x, k._stdErrSerialize = $, k.child = U, N && (k._logEvent = d());
    function _() {
      return this.level === "silent" ? 1 / 0 : this.levels.values[this.level];
    }
    function D() {
      return this._level;
    }
    function L(M) {
      if (M !== "silent" && !this.levels.values[M])
        throw Error("unknown level " + M);
      this._level = M, i(v, k, "error", "log"), i(v, k, "fatal", "error"), i(v, k, "warn", "error"), i(v, k, "info", "log"), i(v, k, "debug", "log"), i(v, k, "trace", "log");
    }
    function U(M, K) {
      if (!M)
        throw new Error("missing bindings for child Pino");
      K = K || {}, x && M.serializers && (K.serializers = M.serializers);
      const Z = K.serializers;
      if (x && Z) {
        var ie = Object.assign({}, O, Z), G = b.browser.serialize === !0 ? Object.keys(ie) : x;
        delete M.serializers, c([M], G, ie, this._stdErrSerialize);
      }
      function ae(me) {
        this._childLevel = (me._childLevel | 0) + 1, this.error = l(me, M, "error"), this.fatal = l(me, M, "fatal"), this.warn = l(me, M, "warn"), this.info = l(me, M, "info"), this.debug = l(me, M, "debug"), this.trace = l(me, M, "trace"), ie && (this.serializers = ie, this._serialize = G), N && (this._logEvent = d(
          [].concat(me._logEvent.bindings, M)
        ));
      }
      return ae.prototype = this, new ae(this);
    }
    return k;
  }
  n.levels = {
    values: {
      fatal: 60,
      error: 50,
      warn: 40,
      info: 30,
      debug: 20,
      trace: 10
    },
    labels: {
      10: "trace",
      20: "debug",
      30: "info",
      40: "warn",
      50: "error",
      60: "fatal"
    }
  }, n.stdSerializers = r, n.stdTimeFunctions = Object.assign({}, { nullTime: S, epochTime: E, unixTime: I, isoTime: A });
  function i(b, N, P, O) {
    const x = Object.getPrototypeOf(N);
    N[P] = N.levelVal > N.levels.values[P] ? w : x[P] ? x[P] : e[P] || e[O] || w, o(b, N, P);
  }
  function o(b, N, P) {
    !b.transmit && N[P] === w || (N[P] = /* @__PURE__ */ function(O) {
      return function() {
        const $ = b.timestamp(), F = new Array(arguments.length), W = Object.getPrototypeOf && Object.getPrototypeOf(this) === e ? e : this;
        for (var k = 0; k < F.length; k++) F[k] = arguments[k];
        if (b.serialize && !b.asObject && c(F, this._serialize, this.serializers, this._stdErrSerialize), b.asObject ? O.call(W, a(this, P, F, $)) : O.apply(W, F), b.transmit) {
          const v = b.transmit.level || N.level, _ = n.levels.values[v], D = n.levels.values[P];
          if (D < _) return;
          u(this, {
            ts: $,
            methodLevel: P,
            methodValue: D,
            transmitValue: n.levels.values[b.transmit.level || N.level],
            send: b.transmit.send,
            val: N.levelVal
          }, F);
        }
      };
    }(N[P]));
  }
  function a(b, N, P, O) {
    b._serialize && c(P, b._serialize, b.serializers, b._stdErrSerialize);
    const x = P.slice();
    let $ = x[0];
    const F = {};
    O && (F.time = O), F.level = n.levels.values[N];
    let W = (b._childLevel | 0) + 1;
    if (W < 1 && (W = 1), $ !== null && typeof $ == "object") {
      for (; W-- && typeof x[0] == "object"; )
        Object.assign(F, x.shift());
      $ = x.length ? t(x.shift(), x) : void 0;
    } else typeof $ == "string" && ($ = t(x.shift(), x));
    return $ !== void 0 && (F.msg = $), F;
  }
  function c(b, N, P, O) {
    for (const x in b)
      if (O && b[x] instanceof Error)
        b[x] = n.stdSerializers.err(b[x]);
      else if (typeof b[x] == "object" && !Array.isArray(b[x]))
        for (const $ in b[x])
          N && N.indexOf($) > -1 && $ in P && (b[x][$] = P[$](b[x][$]));
  }
  function l(b, N, P) {
    return function() {
      const O = new Array(1 + arguments.length);
      O[0] = N;
      for (var x = 1; x < O.length; x++)
        O[x] = arguments[x - 1];
      return b[P].apply(this, O);
    };
  }
  function u(b, N, P) {
    const O = N.send, x = N.ts, $ = N.methodLevel, F = N.methodValue, W = N.val, k = b._logEvent.bindings;
    c(
      P,
      b._serialize || Object.keys(b.serializers),
      b.serializers,
      b._stdErrSerialize === void 0 ? !0 : b._stdErrSerialize
    ), b._logEvent.ts = x, b._logEvent.messages = P.filter(function(v) {
      return k.indexOf(v) === -1;
    }), b._logEvent.level.label = $, b._logEvent.level.value = F, O($, b._logEvent, W), b._logEvent = d(k);
  }
  function d(b) {
    return {
      ts: 0,
      messages: [],
      bindings: b || [],
      level: { label: "", value: 0 }
    };
  }
  function p(b) {
    const N = {
      type: b.constructor.name,
      msg: b.message,
      stack: b.stack
    };
    for (const P in b)
      N[P] === void 0 && (N[P] = b[P]);
    return N;
  }
  function g(b) {
    return typeof b.timestamp == "function" ? b.timestamp : b.timestamp === !1 ? S : E;
  }
  function m() {
    return {};
  }
  function f(b) {
    return b;
  }
  function w() {
  }
  function S() {
    return !1;
  }
  function E() {
    return Date.now();
  }
  function I() {
    return Math.round(Date.now() / 1e3);
  }
  function A() {
    return new Date(Date.now()).toISOString();
  }
  function T() {
    function b(N) {
      return typeof N != "undefined" && N;
    }
    try {
      return typeof globalThis != "undefined" || Object.defineProperty(Object.prototype, "globalThis", {
        get: function() {
          return delete Object.prototype.globalThis, this.globalThis = this;
        },
        configurable: !0
      }), globalThis;
    } catch (N) {
      return b(self) || b(window) || b(this) || {};
    }
  }
  return Gc;
}
var Mn = ov();
const Vo = /* @__PURE__ */ Du(Mn), av = { level: "info" }, Ko = "custom_context", $u = 1e3 * 1024;
let cv = class {
  constructor(e) {
    this.nodeValue = e, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
}, Wd = class {
  constructor(e) {
    this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e, this.sizeInBytes = 0;
  }
  append(e) {
    const r = new cv(e);
    if (r.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${e} with size ${r.size}`);
    for (; this.size + r.size > this.maxSizeInBytes; ) this.shift();
    this.head ? (this.tail && (this.tail.next = r), this.tail = r) : (this.head = r, this.tail = r), this.lengthInNodes++, this.sizeInBytes += r.size;
  }
  shift() {
    if (!this.head) return;
    const e = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e.size;
  }
  toArray() {
    const e = [];
    let r = this.head;
    for (; r !== null; ) e.push(r.value), r = r.next;
    return e;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let e = this.head;
    return { next: () => {
      if (!e) return { done: !0, value: null };
      const r = e.value;
      return e = e.next, { done: !1, value: r };
    } };
  }
}, dg = class {
  constructor(e, r = $u) {
    this.level = e != null ? e : "error", this.levelValue = Mn.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = r, this.logs = new Wd(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(e, r) {
    r === Mn.levels.values.error ? console.error(e) : r === Mn.levels.values.warn ? console.warn(e) : r === Mn.levels.values.debug ? console.debug(e) : r === Mn.levels.values.trace ? console.trace(e) : console.log(e);
  }
  appendToLogs(e) {
    this.logs.append(cs({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: e }));
    const r = typeof e == "string" ? JSON.parse(e).level : e.level;
    r >= this.levelValue && this.forwardToConsole(e, r);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new Wd(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(e) {
    const r = this.getLogArray();
    return r.push(cs({ extraMetadata: e })), new Blob(r, { type: "application/json" });
  }
}, lv = class {
  constructor(e, r = $u) {
    this.baseChunkLogger = new dg(e, r);
  }
  write(e) {
    this.baseChunkLogger.appendToLogs(e);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e) {
    return this.baseChunkLogger.logsToBlob(e);
  }
  downloadLogsBlobInBrowser(e) {
    const r = URL.createObjectURL(this.logsToBlob(e)), s = document.createElement("a");
    s.href = r, s.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(r);
  }
}, uv = class {
  constructor(e, r = $u) {
    this.baseChunkLogger = new dg(e, r);
  }
  write(e) {
    this.baseChunkLogger.appendToLogs(e);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e) {
    return this.baseChunkLogger.logsToBlob(e);
  }
};
var dv = Object.defineProperty, hv = Object.defineProperties, pv = Object.getOwnPropertyDescriptors, Hd = Object.getOwnPropertySymbols, fv = Object.prototype.hasOwnProperty, gv = Object.prototype.propertyIsEnumerable, Vd = (t, e, r) => e in t ? dv(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Va = (t, e) => {
  for (var r in e || (e = {})) fv.call(e, r) && Vd(t, r, e[r]);
  if (Hd) for (var r of Hd(e)) gv.call(e, r) && Vd(t, r, e[r]);
  return t;
}, Ka = (t, e) => hv(t, pv(e));
function di(t) {
  return Ka(Va({}, t), { level: (t == null ? void 0 : t.level) || av.level });
}
function mv(t, e = Ko) {
  return t[e] || "";
}
function wv(t, e, r = Ko) {
  return t[r] = e, t;
}
function Ht(t, e = Ko) {
  let r = "";
  return typeof t.bindings > "u" ? r = mv(t, e) : r = t.bindings().context || "", r;
}
function yv(t, e, r = Ko) {
  const s = Ht(t, r);
  return s.trim() ? `${s}/${e}` : e;
}
function Ot(t, e, r = Ko) {
  const s = yv(t, e, r), n = t.child({ context: s });
  return wv(n, s, r);
}
function bv(t) {
  var e, r;
  const s = new lv((e = t.opts) == null ? void 0 : e.level, t.maxSizeInBytes);
  return { logger: Vo(Ka(Va({}, t.opts), { level: "trace", browser: Ka(Va({}, (r = t.opts) == null ? void 0 : r.browser), { write: (n) => s.write(n) }) })), chunkLoggerController: s };
}
function vv(t) {
  var e;
  const r = new uv((e = t.opts) == null ? void 0 : e.level, t.maxSizeInBytes);
  return { logger: Vo(Ka(Va({}, t.opts), { level: "trace" }), r), chunkLoggerController: r };
}
function Uu(t) {
  return typeof t.loggerOverride < "u" && typeof t.loggerOverride != "string" ? { logger: t.loggerOverride, chunkLoggerController: null } : typeof window < "u" ? bv(t) : vv(t);
}
var Ev = Object.defineProperty, _v = (t, e, r) => e in t ? Ev(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Kd = (t, e, r) => _v(t, typeof e != "symbol" ? e + "" : e, r);
let Cv = class extends fn {
  constructor(e) {
    super(), this.opts = e, Kd(this, "protocol", "wc"), Kd(this, "version", 2);
  }
};
var Av = Object.defineProperty, Sv = (t, e, r) => e in t ? Av(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Iv = (t, e, r) => Sv(t, e + "", r);
let Nv = class extends fn {
  constructor(e, r) {
    super(), this.core = e, this.logger = r, Iv(this, "records", /* @__PURE__ */ new Map());
  }
}, Tv = class {
  constructor(e, r) {
    this.logger = e, this.core = r;
  }
}, Ov = class extends fn {
  constructor(e, r) {
    super(), this.relayer = e, this.logger = r;
  }
}, Rv = class extends fn {
  constructor(e) {
    super();
  }
}, Pv = class {
  constructor(e, r, s, n) {
    this.core = e, this.logger = r, this.name = s;
  }
}, xv = class extends fn {
  constructor(e, r) {
    super(), this.relayer = e, this.logger = r;
  }
}, Dv = class extends fn {
  constructor(e, r) {
    super(), this.core = e, this.logger = r;
  }
}, kv = class {
  constructor(e, r, s) {
    this.core = e, this.logger = r, this.store = s;
  }
}, $v = class {
  constructor(e, r) {
    this.projectId = e, this.logger = r;
  }
}, Uv = class {
  constructor(e, r, s) {
    this.core = e, this.logger = r, this.telemetryEnabled = s;
  }
};
var Lv = Object.defineProperty, Mv = (t, e, r) => e in t ? Lv(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Gd = (t, e, r) => Mv(t, typeof e != "symbol" ? e + "" : e, r);
let Fv = class {
  constructor(e) {
    this.opts = e, Gd(this, "protocol", "wc"), Gd(this, "version", 2);
  }
}, Bv = class {
  constructor(e) {
    this.client = e;
  }
};
function jv(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function hg(t, ...e) {
  if (!jv(t)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function Yd(t, e = !0) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function qv(t, e) {
  hg(t);
  const r = e.outputLen;
  if (t.length < r) throw new Error("digestInto() expects output buffer of length at least " + r);
}
const vn = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Yc = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength);
function zv(t) {
  if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function pg(t) {
  return typeof t == "string" && (t = zv(t)), hg(t), t;
}
let Wv = class {
  clone() {
    return this._cloneInto();
  }
};
function Hv(t) {
  const e = (s) => t().update(pg(s)).digest(), r = t();
  return e.outputLen = r.outputLen, e.blockLen = r.blockLen, e.create = () => t(), e;
}
function fg(t = 32) {
  if (vn && typeof vn.getRandomValues == "function") return vn.getRandomValues(new Uint8Array(t));
  if (vn && typeof vn.randomBytes == "function") return vn.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
function Vv(t, e, r, s) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, r, s);
  const n = BigInt(32), i = BigInt(4294967295), o = Number(r >> n & i), a = Number(r & i), c = s ? 4 : 0, l = s ? 0 : 4;
  t.setUint32(e + c, o, s), t.setUint32(e + l, a, s);
}
let Kv = class extends Wv {
  constructor(e, r, s, n) {
    super(), this.blockLen = e, this.outputLen = r, this.padOffset = s, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = Yc(this.buffer);
  }
  update(e) {
    Yd(this);
    const { view: r, buffer: s, blockLen: n } = this;
    e = pg(e);
    const i = e.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(n - this.pos, i - o);
      if (a === n) {
        const c = Yc(e);
        for (; n <= i - o; o += n) this.process(c, o);
        continue;
      }
      s.set(e.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === n && (this.process(r, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    Yd(this), qv(e, this), this.finished = !0;
    const { buffer: r, view: s, blockLen: n, isLE: i } = this;
    let { pos: o } = this;
    r[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > n - o && (this.process(s, 0), o = 0);
    for (let d = o; d < n; d++) r[d] = 0;
    Vv(s, n - 8, BigInt(this.length * 8), i), this.process(s, 0);
    const a = Yc(e), c = this.outputLen;
    if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = c / 4, u = this.get();
    if (l > u.length) throw new Error("_sha2: outputLen bigger than state");
    for (let d = 0; d < l; d++) a.setUint32(4 * d, u[d], i);
  }
  digest() {
    const { buffer: e, outputLen: r } = this;
    this.digestInto(e);
    const s = e.slice(0, r);
    return this.destroy(), s;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: r, buffer: s, length: n, finished: i, destroyed: o, pos: a } = this;
    return e.length = n, e.pos = a, e.finished = i, e.destroyed = o, n % r && e.buffer.set(s), e;
  }
};
const ha = BigInt(Je(2, 32) - 1), Wl = BigInt(32);
function gg(t, e = !1) {
  return e ? { h: Number(t & ha), l: Number(t >> Wl & ha) } : { h: Number(t >> Wl & ha) | 0, l: Number(t & ha) | 0 };
}
function Gv(t, e = !1) {
  let r = new Uint32Array(t.length), s = new Uint32Array(t.length);
  for (let n = 0; n < t.length; n++) {
    const { h: i, l: o } = gg(t[n], e);
    [r[n], s[n]] = [i, o];
  }
  return [r, s];
}
const Yv = (t, e) => BigInt(t >>> 0) << Wl | BigInt(e >>> 0), Zv = (t, e, r) => t >>> r, Jv = (t, e, r) => t << 32 - r | e >>> r, Xv = (t, e, r) => t >>> r | e << 32 - r, Qv = (t, e, r) => t << 32 - r | e >>> r, eE = (t, e, r) => t << 64 - r | e >>> r - 32, tE = (t, e, r) => t >>> r - 32 | e << 64 - r, rE = (t, e) => e, sE = (t, e) => t, nE = (t, e, r) => t << r | e >>> 32 - r, iE = (t, e, r) => e << r | t >>> 32 - r, oE = (t, e, r) => e << r - 32 | t >>> 64 - r, aE = (t, e, r) => t << r - 32 | e >>> 64 - r;
function cE(t, e, r, s) {
  const n = (e >>> 0) + (s >>> 0);
  return { h: t + r + (n / Je(2, 32) | 0) | 0, l: n | 0 };
}
const lE = (t, e, r) => (t >>> 0) + (e >>> 0) + (r >>> 0), uE = (t, e, r, s) => e + r + s + (t / Je(2, 32) | 0) | 0, dE = (t, e, r, s) => (t >>> 0) + (e >>> 0) + (r >>> 0) + (s >>> 0), hE = (t, e, r, s, n) => e + r + s + n + (t / Je(2, 32) | 0) | 0, pE = (t, e, r, s, n) => (t >>> 0) + (e >>> 0) + (r >>> 0) + (s >>> 0) + (n >>> 0), fE = (t, e, r, s, n, i) => e + r + s + n + i + (t / Je(2, 32) | 0) | 0, ve = { fromBig: gg, split: Gv, toBig: Yv, shrSH: Zv, shrSL: Jv, rotrSH: Xv, rotrSL: Qv, rotrBH: eE, rotrBL: tE, rotr32H: rE, rotr32L: sE, rotlSH: nE, rotlSL: iE, rotlBH: oE, rotlBL: aE, add: cE, add3L: lE, add3H: uE, add4L: dE, add4H: hE, add5H: fE, add5L: pE }, [gE, mE] = ve.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t) => BigInt(t))), ps = new Uint32Array(80), fs = new Uint32Array(80);
let wE = class extends Kv {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  get() {
    const { Ah: e, Al: r, Bh: s, Bl: n, Ch: i, Cl: o, Dh: a, Dl: c, Eh: l, El: u, Fh: d, Fl: p, Gh: g, Gl: m, Hh: f, Hl: w } = this;
    return [e, r, s, n, i, o, a, c, l, u, d, p, g, m, f, w];
  }
  set(e, r, s, n, i, o, a, c, l, u, d, p, g, m, f, w) {
    this.Ah = e | 0, this.Al = r | 0, this.Bh = s | 0, this.Bl = n | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = c | 0, this.Eh = l | 0, this.El = u | 0, this.Fh = d | 0, this.Fl = p | 0, this.Gh = g | 0, this.Gl = m | 0, this.Hh = f | 0, this.Hl = w | 0;
  }
  process(e, r) {
    for (let I = 0; I < 16; I++, r += 4) ps[I] = e.getUint32(r), fs[I] = e.getUint32(r += 4);
    for (let I = 16; I < 80; I++) {
      const A = ps[I - 15] | 0, T = fs[I - 15] | 0, b = ve.rotrSH(A, T, 1) ^ ve.rotrSH(A, T, 8) ^ ve.shrSH(A, T, 7), N = ve.rotrSL(A, T, 1) ^ ve.rotrSL(A, T, 8) ^ ve.shrSL(A, T, 7), P = ps[I - 2] | 0, O = fs[I - 2] | 0, x = ve.rotrSH(P, O, 19) ^ ve.rotrBH(P, O, 61) ^ ve.shrSH(P, O, 6), $ = ve.rotrSL(P, O, 19) ^ ve.rotrBL(P, O, 61) ^ ve.shrSL(P, O, 6), F = ve.add4L(N, $, fs[I - 7], fs[I - 16]), W = ve.add4H(F, b, x, ps[I - 7], ps[I - 16]);
      ps[I] = W | 0, fs[I] = F | 0;
    }
    let { Ah: s, Al: n, Bh: i, Bl: o, Ch: a, Cl: c, Dh: l, Dl: u, Eh: d, El: p, Fh: g, Fl: m, Gh: f, Gl: w, Hh: S, Hl: E } = this;
    for (let I = 0; I < 80; I++) {
      const A = ve.rotrSH(d, p, 14) ^ ve.rotrSH(d, p, 18) ^ ve.rotrBH(d, p, 41), T = ve.rotrSL(d, p, 14) ^ ve.rotrSL(d, p, 18) ^ ve.rotrBL(d, p, 41), b = d & g ^ ~d & f, N = p & m ^ ~p & w, P = ve.add5L(E, T, N, mE[I], fs[I]), O = ve.add5H(P, S, A, b, gE[I], ps[I]), x = P | 0, $ = ve.rotrSH(s, n, 28) ^ ve.rotrBH(s, n, 34) ^ ve.rotrBH(s, n, 39), F = ve.rotrSL(s, n, 28) ^ ve.rotrBL(s, n, 34) ^ ve.rotrBL(s, n, 39), W = s & i ^ s & a ^ i & a, k = n & o ^ n & c ^ o & c;
      S = f | 0, E = w | 0, f = g | 0, w = m | 0, g = d | 0, m = p | 0, { h: d, l: p } = ve.add(l | 0, u | 0, O | 0, x | 0), l = a | 0, u = c | 0, a = i | 0, c = o | 0, i = s | 0, o = n | 0;
      const v = ve.add3L(x, F, k);
      s = ve.add3H(v, O, $, W), n = v | 0;
    }
    ({ h: s, l: n } = ve.add(this.Ah | 0, this.Al | 0, s | 0, n | 0)), { h: i, l: o } = ve.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: c } = ve.add(this.Ch | 0, this.Cl | 0, a | 0, c | 0), { h: l, l: u } = ve.add(this.Dh | 0, this.Dl | 0, l | 0, u | 0), { h: d, l: p } = ve.add(this.Eh | 0, this.El | 0, d | 0, p | 0), { h: g, l: m } = ve.add(this.Fh | 0, this.Fl | 0, g | 0, m | 0), { h: f, l: w } = ve.add(this.Gh | 0, this.Gl | 0, f | 0, w | 0), { h: S, l: E } = ve.add(this.Hh | 0, this.Hl | 0, S | 0, E | 0), this.set(s, n, i, o, a, c, l, u, d, p, g, m, f, w, S, E);
  }
  roundClean() {
    ps.fill(0), fs.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
const yE = Hv(() => new wE());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Lu = BigInt(0), mg = BigInt(1), bE = BigInt(2);
function Mu(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Fu(t) {
  if (!Mu(t)) throw new Error("Uint8Array expected");
}
function Zc(t, e) {
  if (typeof e != "boolean") throw new Error(t + " boolean expected, got " + e);
}
const vE = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function Bu(t) {
  Fu(t);
  let e = "";
  for (let r = 0; r < t.length; r++) e += vE[t[r]];
  return e;
}
function wg(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  return t === "" ? Lu : BigInt("0x" + t);
}
const Gr = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Zd(t) {
  if (t >= Gr._0 && t <= Gr._9) return t - Gr._0;
  if (t >= Gr.A && t <= Gr.F) return t - (Gr.A - 10);
  if (t >= Gr.a && t <= Gr.f) return t - (Gr.a - 10);
}
function yg(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  const e = t.length, r = e / 2;
  if (e % 2) throw new Error("hex string expected, got unpadded hex of length " + e);
  const s = new Uint8Array(r);
  for (let n = 0, i = 0; n < r; n++, i += 2) {
    const o = Zd(t.charCodeAt(i)), a = Zd(t.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const c = t[i] + t[i + 1];
      throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + i);
    }
    s[n] = o * 16 + a;
  }
  return s;
}
function EE(t) {
  return wg(Bu(t));
}
function ka(t) {
  return Fu(t), wg(Bu(Uint8Array.from(t).reverse()));
}
function bg(t, e) {
  return yg(t.toString(16).padStart(e * 2, "0"));
}
function Hl(t, e) {
  return bg(t, e).reverse();
}
function Yr(t, e, r) {
  let s;
  if (typeof e == "string") try {
    s = yg(e);
  } catch (i) {
    throw new Error(t + " must be hex string or Uint8Array, cause: " + i);
  }
  else if (Mu(e)) s = Uint8Array.from(e);
  else throw new Error(t + " must be hex string or Uint8Array");
  const n = s.length;
  if (typeof r == "number" && n !== r) throw new Error(t + " of length " + r + " expected, got " + n);
  return s;
}
function Jd(...t) {
  let e = 0;
  for (let s = 0; s < t.length; s++) {
    const n = t[s];
    Fu(n), e += n.length;
  }
  const r = new Uint8Array(e);
  for (let s = 0, n = 0; s < t.length; s++) {
    const i = t[s];
    r.set(i, n), n += i.length;
  }
  return r;
}
const Jc = (t) => typeof t == "bigint" && Lu <= t;
function _E(t, e, r) {
  return Jc(t) && Jc(e) && Jc(r) && e <= t && t < r;
}
function _i(t, e, r, s) {
  if (!_E(e, r, s)) throw new Error("expected valid " + t + ": " + r + " <= n < " + s + ", got " + e);
}
function CE(t) {
  let e;
  for (e = 0; t > Lu; t >>= mg, e += 1) ;
  return e;
}
const AE = (t) => (bE << BigInt(t - 1)) - mg, SE = { bigint: (t) => typeof t == "bigint", function: (t) => typeof t == "function", boolean: (t) => typeof t == "boolean", string: (t) => typeof t == "string", stringOrUint8Array: (t) => typeof t == "string" || Mu(t), isSafeInteger: (t) => Number.isSafeInteger(t), array: (t) => Array.isArray(t), field: (t, e) => e.Fp.isValid(t), hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen) };
function ju(t, e, r = {}) {
  const s = (n, i, o) => {
    const a = SE[i];
    if (typeof a != "function") throw new Error("invalid validator function");
    const c = t[n];
    if (!(o && c === void 0) && !a(c, t)) throw new Error("param " + String(n) + " is invalid. Expected " + i + ", got " + c);
  };
  for (const [n, i] of Object.entries(e)) s(n, i, !1);
  for (const [n, i] of Object.entries(r)) s(n, i, !0);
  return t;
}
function Xd(t) {
  const e = /* @__PURE__ */ new WeakMap();
  return (r, ...s) => {
    const n = e.get(r);
    if (n !== void 0) return n;
    const i = t(r, ...s);
    return e.set(r, i), i;
  };
}
const ht = BigInt(0), Xe = BigInt(1), js = BigInt(2), IE = BigInt(3), Vl = BigInt(4), Qd = BigInt(5), eh = BigInt(8);
function it(t, e) {
  const r = t % e;
  return r >= ht ? r : e + r;
}
function NE(t, e, r) {
  if (e < ht) throw new Error("invalid exponent, negatives unsupported");
  if (r <= ht) throw new Error("invalid modulus");
  if (r === Xe) return ht;
  let s = Xe;
  for (; e > ht; ) e & Xe && (s = s * t % r), t = t * t % r, e >>= Xe;
  return s;
}
function Pr(t, e, r) {
  let s = t;
  for (; e-- > ht; ) s *= s, s %= r;
  return s;
}
function th(t, e) {
  if (t === ht) throw new Error("invert: expected non-zero number");
  if (e <= ht) throw new Error("invert: expected positive modulus, got " + e);
  let r = it(t, e), s = e, n = ht, i = Xe;
  for (; r !== ht; ) {
    const o = s / r, a = s % r, c = n - i * o;
    s = r, r = a, n = i, i = c;
  }
  if (s !== Xe) throw new Error("invert: does not exist");
  return it(n, e);
}
function TE(t) {
  const e = (t - Xe) / js;
  let r, s, n;
  for (r = t - Xe, s = 0; r % js === ht; r /= js, s++) ;
  for (n = js; n < t && NE(n, e, t) !== t - Xe; n++) if (n > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (s === 1) {
    const o = (t + Xe) / Vl;
    return function(a, c) {
      const l = a.pow(c, o);
      if (!a.eql(a.sqr(l), c)) throw new Error("Cannot find square root");
      return l;
    };
  }
  const i = (r + Xe) / js;
  return function(o, a) {
    if (o.pow(a, e) === o.neg(o.ONE)) throw new Error("Cannot find square root");
    let c = s, l = o.pow(o.mul(o.ONE, n), r), u = o.pow(a, i), d = o.pow(a, r);
    for (; !o.eql(d, o.ONE); ) {
      if (o.eql(d, o.ZERO)) return o.ZERO;
      let p = 1;
      for (let m = o.sqr(d); p < c && !o.eql(m, o.ONE); p++) m = o.sqr(m);
      const g = o.pow(l, Xe << BigInt(c - p - 1));
      l = o.sqr(g), u = o.mul(u, g), d = o.mul(d, l), c = p;
    }
    return u;
  };
}
function OE(t) {
  if (t % Vl === IE) {
    const e = (t + Xe) / Vl;
    return function(r, s) {
      const n = r.pow(s, e);
      if (!r.eql(r.sqr(n), s)) throw new Error("Cannot find square root");
      return n;
    };
  }
  if (t % eh === Qd) {
    const e = (t - Qd) / eh;
    return function(r, s) {
      const n = r.mul(s, js), i = r.pow(n, e), o = r.mul(s, i), a = r.mul(r.mul(o, js), i), c = r.mul(o, r.sub(a, r.ONE));
      if (!r.eql(r.sqr(c), s)) throw new Error("Cannot find square root");
      return c;
    };
  }
  return TE(t);
}
const RE = (t, e) => (it(t, e) & Xe) === Xe, PE = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function xE(t) {
  const e = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, r = PE.reduce((s, n) => (s[n] = "function", s), e);
  return ju(t, r);
}
function DE(t, e, r) {
  if (r < ht) throw new Error("invalid exponent, negatives unsupported");
  if (r === ht) return t.ONE;
  if (r === Xe) return e;
  let s = t.ONE, n = e;
  for (; r > ht; ) r & Xe && (s = t.mul(s, n)), n = t.sqr(n), r >>= Xe;
  return s;
}
function kE(t, e) {
  const r = new Array(e.length), s = e.reduce((i, o, a) => t.is0(o) ? i : (r[a] = i, t.mul(i, o)), t.ONE), n = t.inv(s);
  return e.reduceRight((i, o, a) => t.is0(o) ? i : (r[a] = t.mul(i, r[a]), t.mul(i, o)), n), r;
}
function vg(t, e) {
  const r = e !== void 0 ? e : t.toString(2).length, s = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: s };
}
function Eg(t, e, r = !1, s = {}) {
  if (t <= ht) throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: n, nByteLength: i } = vg(t, e);
  if (i > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let o;
  const a = Object.freeze({ ORDER: t, isLE: r, BITS: n, BYTES: i, MASK: AE(n), ZERO: ht, ONE: Xe, create: (c) => it(c, t), isValid: (c) => {
    if (typeof c != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof c);
    return ht <= c && c < t;
  }, is0: (c) => c === ht, isOdd: (c) => (c & Xe) === Xe, neg: (c) => it(-c, t), eql: (c, l) => c === l, sqr: (c) => it(c * c, t), add: (c, l) => it(c + l, t), sub: (c, l) => it(c - l, t), mul: (c, l) => it(c * l, t), pow: (c, l) => DE(a, c, l), div: (c, l) => it(c * th(l, t), t), sqrN: (c) => c * c, addN: (c, l) => c + l, subN: (c, l) => c - l, mulN: (c, l) => c * l, inv: (c) => th(c, t), sqrt: s.sqrt || ((c) => (o || (o = OE(t)), o(a, c))), invertBatch: (c) => kE(a, c), cmov: (c, l, u) => u ? l : c, toBytes: (c) => r ? Hl(c, i) : bg(c, i), fromBytes: (c) => {
    if (c.length !== i) throw new Error("Field.fromBytes: expected " + i + " bytes, got " + c.length);
    return r ? ka(c) : EE(c);
  } });
  return Object.freeze(a);
}
const rh = BigInt(0), pa = BigInt(1);
function Xc(t, e) {
  const r = e.negate();
  return t ? r : e;
}
function _g(t, e) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e) throw new Error("invalid window size, expected [1.." + e + "], got W=" + t);
}
function Qc(t, e) {
  _g(t, e);
  const r = Math.ceil(e / t) + 1, s = Je(2, t - 1);
  return { windows: r, windowSize: s };
}
function $E(t, e) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((r, s) => {
    if (!(r instanceof e)) throw new Error("invalid point at index " + s);
  });
}
function UE(t, e) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((r, s) => {
    if (!e.isValid(r)) throw new Error("invalid scalar at index " + s);
  });
}
const el = /* @__PURE__ */ new WeakMap(), Cg = /* @__PURE__ */ new WeakMap();
function tl(t) {
  return Cg.get(t) || 1;
}
function LE(t, e) {
  return { constTimeNegate: Xc, hasPrecomputes(r) {
    return tl(r) !== 1;
  }, unsafeLadder(r, s, n = t.ZERO) {
    let i = r;
    for (; s > rh; ) s & pa && (n = n.add(i)), i = i.double(), s >>= pa;
    return n;
  }, precomputeWindow(r, s) {
    const { windows: n, windowSize: i } = Qc(s, e), o = [];
    let a = r, c = a;
    for (let l = 0; l < n; l++) {
      c = a, o.push(c);
      for (let u = 1; u < i; u++) c = c.add(a), o.push(c);
      a = c.double();
    }
    return o;
  }, wNAF(r, s, n) {
    const { windows: i, windowSize: o } = Qc(r, e);
    let a = t.ZERO, c = t.BASE;
    const l = BigInt(Je(2, r) - 1), u = Je(2, r), d = BigInt(r);
    for (let p = 0; p < i; p++) {
      const g = p * o;
      let m = Number(n & l);
      n >>= d, m > o && (m -= u, n += pa);
      const f = g, w = g + Math.abs(m) - 1, S = p % 2 !== 0, E = m < 0;
      m === 0 ? c = c.add(Xc(S, s[f])) : a = a.add(Xc(E, s[w]));
    }
    return { p: a, f: c };
  }, wNAFUnsafe(r, s, n, i = t.ZERO) {
    const { windows: o, windowSize: a } = Qc(r, e), c = BigInt(Je(2, r) - 1), l = Je(2, r), u = BigInt(r);
    for (let d = 0; d < o; d++) {
      const p = d * a;
      if (n === rh) break;
      let g = Number(n & c);
      if (n >>= u, g > a && (g -= l, n += pa), g === 0) continue;
      let m = s[p + Math.abs(g) - 1];
      g < 0 && (m = m.negate()), i = i.add(m);
    }
    return i;
  }, getPrecomputes(r, s, n) {
    let i = el.get(s);
    return i || (i = this.precomputeWindow(s, r), r !== 1 && el.set(s, n(i))), i;
  }, wNAFCached(r, s, n) {
    const i = tl(r);
    return this.wNAF(i, this.getPrecomputes(i, r, n), s);
  }, wNAFCachedUnsafe(r, s, n, i) {
    const o = tl(r);
    return o === 1 ? this.unsafeLadder(r, s, i) : this.wNAFUnsafe(o, this.getPrecomputes(o, r, n), s, i);
  }, setWindowSize(r, s) {
    _g(s, e), Cg.set(r, s), el.delete(r);
  } };
}
function ME(t, e, r, s) {
  if ($E(r, t), UE(s, e), r.length !== s.length) throw new Error("arrays of points and scalars must have equal length");
  const n = t.ZERO, i = CE(BigInt(r.length)), o = i > 12 ? i - 3 : i > 4 ? i - 2 : i ? 2 : 1, a = (1 << o) - 1, c = new Array(a + 1).fill(n), l = Math.floor((e.BITS - 1) / o) * o;
  let u = n;
  for (let d = l; d >= 0; d -= o) {
    c.fill(n);
    for (let g = 0; g < s.length; g++) {
      const m = s[g], f = Number(m >> BigInt(d) & BigInt(a));
      c[f] = c[f].add(r[g]);
    }
    let p = n;
    for (let g = c.length - 1, m = n; g > 0; g--) m = m.add(c[g]), p = p.add(m);
    if (u = u.add(p), d !== 0) for (let g = 0; g < o; g++) u = u.double();
  }
  return u;
}
function FE(t) {
  return xE(t.Fp), ju(t, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze(B(C(C({}, vg(t.n, t.nBitLength)), t), { p: t.Fp.ORDER }));
}
const yr = BigInt(0), $t = BigInt(1), fa = BigInt(2), BE = BigInt(8), jE = { zip215: !0 };
function qE(t) {
  const e = FE(t);
  return ju(t, { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" }, { adjustScalarBytes: "function", domain: "function", uvRatio: "function", mapToCurve: "function" }), Object.freeze(C({}, e));
}
function zE(t) {
  const e = qE(t), { Fp: r, n: s, prehash: n, hash: i, randomBytes: o, nByteLength: a, h: c } = e, l = fa << BigInt(a * 8) - $t, u = r.create, d = Eg(e.n, e.nBitLength), p = e.uvRatio || ((v, _) => {
    try {
      return { isValid: !0, value: r.sqrt(v * r.inv(_)) };
    } catch (D) {
      return { isValid: !1, value: yr };
    }
  }), g = e.adjustScalarBytes || ((v) => v), m = e.domain || ((v, _, D) => {
    if (Zc("phflag", D), _.length || D) throw new Error("Contexts/pre-hash are not supported");
    return v;
  });
  function f(v, _) {
    _i("coordinate " + v, _, yr, l);
  }
  function w(v) {
    if (!(v instanceof I)) throw new Error("ExtendedPoint expected");
  }
  const S = Xd((v, _) => {
    const { ex: D, ey: L, ez: U } = v, M = v.is0();
    _ == null && (_ = M ? BE : r.inv(U));
    const K = u(D * _), Z = u(L * _), ie = u(U * _);
    if (M) return { x: yr, y: $t };
    if (ie !== $t) throw new Error("invZ was invalid");
    return { x: K, y: Z };
  }), E = Xd((v) => {
    const { a: _, d: D } = e;
    if (v.is0()) throw new Error("bad point: ZERO");
    const { ex: L, ey: U, ez: M, et: K } = v, Z = u(L * L), ie = u(U * U), G = u(M * M), ae = u(G * G), me = u(Z * _), Me = u(G * u(me + ie)), De = u(ae + u(D * u(Z * ie)));
    if (Me !== De) throw new Error("bad point: equation left != right (1)");
    const Ae = u(L * U), St = u(M * K);
    if (Ae !== St) throw new Error("bad point: equation left != right (2)");
    return !0;
  });
  class I {
    constructor(_, D, L, U) {
      this.ex = _, this.ey = D, this.ez = L, this.et = U, f("x", _), f("y", D), f("z", L), f("t", U), Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(_) {
      if (_ instanceof I) throw new Error("extended point not allowed");
      const { x: D, y: L } = _ || {};
      return f("x", D), f("y", L), new I(D, L, $t, u(D * L));
    }
    static normalizeZ(_) {
      const D = r.invertBatch(_.map((L) => L.ez));
      return _.map((L, U) => L.toAffine(D[U])).map(I.fromAffine);
    }
    static msm(_, D) {
      return ME(I, d, _, D);
    }
    _setWindowSize(_) {
      b.setWindowSize(this, _);
    }
    assertValidity() {
      E(this);
    }
    equals(_) {
      w(_);
      const { ex: D, ey: L, ez: U } = this, { ex: M, ey: K, ez: Z } = _, ie = u(D * Z), G = u(M * U), ae = u(L * Z), me = u(K * U);
      return ie === G && ae === me;
    }
    is0() {
      return this.equals(I.ZERO);
    }
    negate() {
      return new I(u(-this.ex), this.ey, this.ez, u(-this.et));
    }
    double() {
      const { a: _ } = e, { ex: D, ey: L, ez: U } = this, M = u(D * D), K = u(L * L), Z = u(fa * u(U * U)), ie = u(_ * M), G = D + L, ae = u(u(G * G) - M - K), me = ie + K, Me = me - Z, De = ie - K, Ae = u(ae * Me), St = u(me * De), ft = u(ae * De), Rt = u(Me * me);
      return new I(Ae, St, Rt, ft);
    }
    add(_) {
      w(_);
      const { a: D, d: L } = e, { ex: U, ey: M, ez: K, et: Z } = this, { ex: ie, ey: G, ez: ae, et: me } = _;
      if (D === BigInt(-1)) {
        const hd = u((M - U) * (G + ie)), pd = u((M + U) * (G - ie)), $c = u(pd - hd);
        if ($c === yr) return this.double();
        const fd = u(K * fa * me), gd = u(Z * fa * ae), md = gd + fd, wd = pd + hd, yd = gd - fd, ny = u(md * $c), iy = u(wd * yd), oy = u(md * yd), ay = u($c * wd);
        return new I(ny, iy, ay, oy);
      }
      const Me = u(U * ie), De = u(M * G), Ae = u(Z * L * me), St = u(K * ae), ft = u((U + M) * (ie + G) - Me - De), Rt = St - Ae, or = St + Ae, Kt = u(De - D * Me), yn = u(ft * Rt), ty = u(or * Kt), ry = u(ft * Kt), sy = u(Rt * or);
      return new I(yn, ty, sy, ry);
    }
    subtract(_) {
      return this.add(_.negate());
    }
    wNAF(_) {
      return b.wNAFCached(this, _, I.normalizeZ);
    }
    multiply(_) {
      const D = _;
      _i("scalar", D, $t, s);
      const { p: L, f: U } = this.wNAF(D);
      return I.normalizeZ([L, U])[0];
    }
    multiplyUnsafe(_, D = I.ZERO) {
      const L = _;
      return _i("scalar", L, yr, s), L === yr ? T : this.is0() || L === $t ? this : b.wNAFCachedUnsafe(this, L, I.normalizeZ, D);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(c).is0();
    }
    isTorsionFree() {
      return b.unsafeLadder(this, s).is0();
    }
    toAffine(_) {
      return S(this, _);
    }
    clearCofactor() {
      const { h: _ } = e;
      return _ === $t ? this : this.multiplyUnsafe(_);
    }
    static fromHex(_, D = !1) {
      const { d: L, a: U } = e, M = r.BYTES;
      _ = Yr("pointHex", _, M), Zc("zip215", D);
      const K = _.slice(), Z = _[M - 1];
      K[M - 1] = Z & -129;
      const ie = ka(K), G = D ? l : r.ORDER;
      _i("pointHex.y", ie, yr, G);
      const ae = u(ie * ie), me = u(ae - $t), Me = u(L * ae - U);
      let { isValid: De, value: Ae } = p(me, Me);
      if (!De) throw new Error("Point.fromHex: invalid y coordinate");
      const St = (Ae & $t) === $t, ft = (Z & 128) !== 0;
      if (!D && Ae === yr && ft) throw new Error("Point.fromHex: x=0 and x_0=1");
      return ft !== St && (Ae = u(-Ae)), I.fromAffine({ x: Ae, y: ie });
    }
    static fromPrivateKey(_) {
      return O(_).point;
    }
    toRawBytes() {
      const { x: _, y: D } = this.toAffine(), L = Hl(D, r.BYTES);
      return L[L.length - 1] |= _ & $t ? 128 : 0, L;
    }
    toHex() {
      return Bu(this.toRawBytes());
    }
  }
  I.BASE = new I(e.Gx, e.Gy, $t, u(e.Gx * e.Gy)), I.ZERO = new I(yr, $t, $t, yr);
  const { BASE: A, ZERO: T } = I, b = LE(I, a * 8);
  function N(v) {
    return it(v, s);
  }
  function P(v) {
    return N(ka(v));
  }
  function O(v) {
    const _ = r.BYTES;
    v = Yr("private key", v, _);
    const D = Yr("hashed private key", i(v), 2 * _), L = g(D.slice(0, _)), U = D.slice(_, 2 * _), M = P(L), K = A.multiply(M), Z = K.toRawBytes();
    return { head: L, prefix: U, scalar: M, point: K, pointBytes: Z };
  }
  function x(v) {
    return O(v).pointBytes;
  }
  function $(v = new Uint8Array(), ..._) {
    const D = Jd(..._);
    return P(i(m(D, Yr("context", v), !!n)));
  }
  function F(v, _, D = {}) {
    v = Yr("message", v), n && (v = n(v));
    const { prefix: L, scalar: U, pointBytes: M } = O(_), K = $(D.context, L, v), Z = A.multiply(K).toRawBytes(), ie = $(D.context, Z, M, v), G = N(K + ie * U);
    _i("signature.s", G, yr, s);
    const ae = Jd(Z, Hl(G, r.BYTES));
    return Yr("result", ae, r.BYTES * 2);
  }
  const W = jE;
  function k(v, _, D, L = W) {
    const { context: U, zip215: M } = L, K = r.BYTES;
    v = Yr("signature", v, 2 * K), _ = Yr("message", _), D = Yr("publicKey", D, K), M !== void 0 && Zc("zip215", M), n && (_ = n(_));
    const Z = ka(v.slice(K, 2 * K));
    let ie, G, ae;
    try {
      ie = I.fromHex(D, M), G = I.fromHex(v.slice(0, K), M), ae = A.multiplyUnsafe(Z);
    } catch (Me) {
      return !1;
    }
    if (!M && ie.isSmallOrder()) return !1;
    const me = $(U, G.toRawBytes(), ie.toRawBytes(), _);
    return G.add(ie.multiplyUnsafe(me)).subtract(ae).clearCofactor().equals(I.ZERO);
  }
  return A._setWindowSize(8), { CURVE: e, getPublicKey: x, sign: F, verify: k, ExtendedPoint: I, utils: { getExtendedPublicKey: O, randomPrivateKey: () => o(r.BYTES), precompute(v = 8, _ = I.BASE) {
    return _._setWindowSize(v), _.multiply(BigInt(3)), _;
  } } };
}
BigInt(0), BigInt(1);
const qu = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"), sh = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
const WE = BigInt(1), nh = BigInt(2);
BigInt(3);
const HE = BigInt(5), VE = BigInt(8);
function KE(t) {
  const e = BigInt(10), r = BigInt(20), s = BigInt(40), n = BigInt(80), i = qu, o = t * t % i * t % i, a = Pr(o, nh, i) * o % i, c = Pr(a, WE, i) * t % i, l = Pr(c, HE, i) * c % i, u = Pr(l, e, i) * l % i, d = Pr(u, r, i) * u % i, p = Pr(d, s, i) * d % i, g = Pr(p, n, i) * p % i, m = Pr(g, n, i) * p % i, f = Pr(m, e, i) * l % i;
  return { pow_p_5_8: Pr(f, nh, i) * t % i, b2: o };
}
function GE(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
function YE(t, e) {
  const r = qu, s = it(e * e * e, r), n = it(s * s * e, r), i = KE(t * n).pow_p_5_8;
  let o = it(t * s * i, r);
  const a = it(e * o * o, r), c = o, l = it(o * sh, r), u = a === t, d = a === it(-t, r), p = a === it(-t * sh, r);
  return u && (o = c), (d || p) && (o = l), RE(o, r) && (o = it(-o, r)), { isValid: u || d, value: o };
}
const ZE = Eg(qu, void 0, !0), JE = { a: BigInt(-1), d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"), Fp: ZE, n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"), h: VE, Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"), Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"), hash: yE, randomBytes: fg, adjustScalarBytes: GE, uvRatio: YE }, Ag = zE(JE), XE = "EdDSA", QE = "JWT", Ga = ".", mc = "base64url", Sg = "utf8", Ig = "utf8", e0 = ":", t0 = "did", r0 = "key", ih = "base58btc", s0 = "z", n0 = "K36", i0 = 32;
function zu(t) {
  return globalThis.Buffer != null ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t;
}
function Ng(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? zu(globalThis.Buffer.allocUnsafe(t)) : new Uint8Array(t);
}
function Tg(t, e) {
  e || (e = t.reduce((n, i) => n + i.length, 0));
  const r = Ng(e);
  let s = 0;
  for (const n of t) r.set(n, s), s += n.length;
  return zu(r);
}
function o0(t, e) {
  if (t.length >= 255) throw new TypeError("Alphabet too long");
  for (var r = new Uint8Array(256), s = 0; s < r.length; s++) r[s] = 255;
  for (var n = 0; n < t.length; n++) {
    var i = t.charAt(n), o = i.charCodeAt(0);
    if (r[o] !== 255) throw new TypeError(i + " is ambiguous");
    r[o] = n;
  }
  var a = t.length, c = t.charAt(0), l = Math.log(a) / Math.log(256), u = Math.log(256) / Math.log(a);
  function d(m) {
    if (m instanceof Uint8Array || (ArrayBuffer.isView(m) ? m = new Uint8Array(m.buffer, m.byteOffset, m.byteLength) : Array.isArray(m) && (m = Uint8Array.from(m))), !(m instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (m.length === 0) return "";
    for (var f = 0, w = 0, S = 0, E = m.length; S !== E && m[S] === 0; ) S++, f++;
    for (var I = (E - S) * u + 1 >>> 0, A = new Uint8Array(I); S !== E; ) {
      for (var T = m[S], b = 0, N = I - 1; (T !== 0 || b < w) && N !== -1; N--, b++) T += 256 * A[N] >>> 0, A[N] = T % a >>> 0, T = T / a >>> 0;
      if (T !== 0) throw new Error("Non-zero carry");
      w = b, S++;
    }
    for (var P = I - w; P !== I && A[P] === 0; ) P++;
    for (var O = c.repeat(f); P < I; ++P) O += t.charAt(A[P]);
    return O;
  }
  function p(m) {
    if (typeof m != "string") throw new TypeError("Expected String");
    if (m.length === 0) return new Uint8Array();
    var f = 0;
    if (m[f] !== " ") {
      for (var w = 0, S = 0; m[f] === c; ) w++, f++;
      for (var E = (m.length - f) * l + 1 >>> 0, I = new Uint8Array(E); m[f]; ) {
        var A = r[m.charCodeAt(f)];
        if (A === 255) return;
        for (var T = 0, b = E - 1; (A !== 0 || T < S) && b !== -1; b--, T++) A += a * I[b] >>> 0, I[b] = A % 256 >>> 0, A = A / 256 >>> 0;
        if (A !== 0) throw new Error("Non-zero carry");
        S = T, f++;
      }
      if (m[f] !== " ") {
        for (var N = E - S; N !== E && I[N] === 0; ) N++;
        for (var P = new Uint8Array(w + (E - N)), O = w; N !== E; ) P[O++] = I[N++];
        return P;
      }
    }
  }
  function g(m) {
    var f = p(m);
    if (f) return f;
    throw new Error(`Non-${e} character`);
  }
  return { encode: d, decodeUnsafe: p, decode: g };
}
var a0 = o0, c0 = a0;
const Og = (t) => {
  if (t instanceof Uint8Array && t.constructor.name === "Uint8Array") return t;
  if (t instanceof ArrayBuffer) return new Uint8Array(t);
  if (ArrayBuffer.isView(t)) return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  throw new Error("Unknown type, must be binary type");
}, l0 = (t) => new TextEncoder().encode(t), u0 = (t) => new TextDecoder().decode(t);
let d0 = class {
  constructor(e, r, s) {
    this.name = e, this.prefix = r, this.baseEncode = s;
  }
  encode(e) {
    if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}, h0 = class {
  constructor(e, r, s) {
    if (this.name = e, this.prefix = r, r.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = r.codePointAt(0), this.baseDecode = s;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e) {
    return Rg(this, e);
  }
}, p0 = class {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return Rg(this, e);
  }
  decode(e) {
    const r = e[0], s = this.decoders[r];
    if (s) return s.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
const Rg = (t, e) => new p0(C(C({}, t.decoders || { [t.prefix]: t }), e.decoders || { [e.prefix]: e }));
let f0 = class {
  constructor(e, r, s, n) {
    this.name = e, this.prefix = r, this.baseEncode = s, this.baseDecode = n, this.encoder = new d0(e, r, s), this.decoder = new h0(e, r, n);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
};
const wc = ({ name: t, prefix: e, encode: r, decode: s }) => new f0(t, e, r, s), Go = ({ prefix: t, name: e, alphabet: r }) => {
  const { encode: s, decode: n } = c0(r, e);
  return wc({ prefix: t, name: e, encode: s, decode: (i) => Og(n(i)) });
}, g0 = (t, e, r, s) => {
  const n = {};
  for (let u = 0; u < e.length; ++u) n[e[u]] = u;
  let i = t.length;
  for (; t[i - 1] === "="; ) --i;
  const o = new Uint8Array(i * r / 8 | 0);
  let a = 0, c = 0, l = 0;
  for (let u = 0; u < i; ++u) {
    const d = n[t[u]];
    if (d === void 0) throw new SyntaxError(`Non-${s} character`);
    c = c << r | d, a += r, a >= 8 && (a -= 8, o[l++] = 255 & c >> a);
  }
  if (a >= r || 255 & c << 8 - a) throw new SyntaxError("Unexpected end of data");
  return o;
}, m0 = (t, e, r) => {
  const s = e[e.length - 1] === "=", n = (1 << r) - 1;
  let i = "", o = 0, a = 0;
  for (let c = 0; c < t.length; ++c) for (a = a << 8 | t[c], o += 8; o > r; ) o -= r, i += e[n & a >> o];
  if (o && (i += e[n & a << r - o]), s) for (; i.length * r & 7; ) i += "=";
  return i;
}, _t = ({ name: t, prefix: e, bitsPerChar: r, alphabet: s }) => wc({ prefix: e, name: t, encode(n) {
  return m0(n, s, r);
}, decode(n) {
  return g0(n, s, r, t);
} }), w0 = wc({ prefix: "\0", name: "identity", encode: (t) => u0(t), decode: (t) => l0(t) });
var y0 = Object.freeze({ __proto__: null, identity: w0 });
const b0 = _t({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var v0 = Object.freeze({ __proto__: null, base2: b0 });
const E0 = _t({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var _0 = Object.freeze({ __proto__: null, base8: E0 });
const C0 = Go({ prefix: "9", name: "base10", alphabet: "0123456789" });
var A0 = Object.freeze({ __proto__: null, base10: C0 });
const S0 = _t({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), I0 = _t({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var N0 = Object.freeze({ __proto__: null, base16: S0, base16upper: I0 });
const T0 = _t({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), O0 = _t({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), R0 = _t({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), P0 = _t({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), x0 = _t({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), D0 = _t({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), k0 = _t({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), $0 = _t({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), U0 = _t({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var L0 = Object.freeze({ __proto__: null, base32: T0, base32upper: O0, base32pad: R0, base32padupper: P0, base32hex: x0, base32hexupper: D0, base32hexpad: k0, base32hexpadupper: $0, base32z: U0 });
const M0 = Go({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), F0 = Go({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var B0 = Object.freeze({ __proto__: null, base36: M0, base36upper: F0 });
const j0 = Go({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), q0 = Go({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var z0 = Object.freeze({ __proto__: null, base58btc: j0, base58flickr: q0 });
const W0 = _t({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), H0 = _t({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), V0 = _t({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), K0 = _t({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var G0 = Object.freeze({ __proto__: null, base64: W0, base64pad: H0, base64url: V0, base64urlpad: K0 });
const Pg = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), Y0 = Pg.reduce((t, e, r) => (t[r] = e, t), []), Z0 = Pg.reduce((t, e, r) => (t[e.codePointAt(0)] = r, t), []);
function J0(t) {
  return t.reduce((e, r) => (e += Y0[r], e), "");
}
function X0(t) {
  const e = [];
  for (const r of t) {
    const s = Z0[r.codePointAt(0)];
    if (s === void 0) throw new Error(`Non-base256emoji character: ${r}`);
    e.push(s);
  }
  return new Uint8Array(e);
}
const Q0 = wc({ prefix: "🚀", name: "base256emoji", encode: J0, decode: X0 });
var e_ = Object.freeze({ __proto__: null, base256emoji: Q0 }), t_ = xg, oh = 128, r_ = -128, s_ = Math.pow(2, 31);
function xg(t, e, r) {
  e = e || [], r = r || 0;
  for (var s = r; t >= s_; ) e[r++] = t & 255 | oh, t /= 128;
  for (; t & r_; ) e[r++] = t & 255 | oh, t >>>= 7;
  return e[r] = t | 0, xg.bytes = r - s + 1, e;
}
var n_ = Kl, i_ = 128, ah = 127;
function Kl(t, s) {
  var r = 0, s = s || 0, n = 0, i = s, o, a = t.length;
  do {
    if (i >= a) throw Kl.bytes = 0, new RangeError("Could not decode varint");
    o = t[i++], r += n < 28 ? (o & ah) << n : (o & ah) * Math.pow(2, n), n += 7;
  } while (o >= i_);
  return Kl.bytes = i - s, r;
}
var o_ = Math.pow(2, 7), a_ = Math.pow(2, 14), c_ = Math.pow(2, 21), l_ = Math.pow(2, 28), u_ = Math.pow(2, 35), d_ = Math.pow(2, 42), h_ = Math.pow(2, 49), p_ = Math.pow(2, 56), f_ = Math.pow(2, 63), g_ = function(t) {
  return t < o_ ? 1 : t < a_ ? 2 : t < c_ ? 3 : t < l_ ? 4 : t < u_ ? 5 : t < d_ ? 6 : t < h_ ? 7 : t < p_ ? 8 : t < f_ ? 9 : 10;
}, m_ = { encode: t_, decode: n_, encodingLength: g_ }, Dg = m_;
const ch = (t, e, r = 0) => (Dg.encode(t, e, r), e), lh = (t) => Dg.encodingLength(t), Gl = (t, e) => {
  const r = e.byteLength, s = lh(t), n = s + lh(r), i = new Uint8Array(n + r);
  return ch(t, i, 0), ch(r, i, s), i.set(e, n), new w_(t, r, e, i);
};
let w_ = class {
  constructor(e, r, s, n) {
    this.code = e, this.size = r, this.digest = s, this.bytes = n;
  }
};
const kg = ({ name: t, code: e, encode: r }) => new y_(t, e, r);
let y_ = class {
  constructor(e, r, s) {
    this.name = e, this.code = r, this.encode = s;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const r = this.encode(e);
      return r instanceof Uint8Array ? Gl(this.code, r) : r.then((s) => Gl(this.code, s));
    } else throw Error("Unknown type, must be binary type");
  }
};
const $g = (t) => (e) => h(null, null, function* () {
  return new Uint8Array(yield crypto.subtle.digest(t, e));
}), b_ = kg({ name: "sha2-256", code: 18, encode: $g("SHA-256") }), v_ = kg({ name: "sha2-512", code: 19, encode: $g("SHA-512") });
var E_ = Object.freeze({ __proto__: null, sha256: b_, sha512: v_ });
const Ug = 0, __ = "identity", Lg = Og, C_ = (t) => Gl(Ug, Lg(t)), A_ = { code: Ug, name: __, encode: Lg, digest: C_ };
var S_ = Object.freeze({ __proto__: null, identity: A_ });
new TextEncoder(), new TextDecoder();
const uh = C(C(C(C(C(C(C(C(C(C({}, y0), v0), _0), A0), N0), L0), B0), z0), G0), e_);
C(C({}, E_), S_);
function Mg(t, e, r, s) {
  return { name: t, prefix: e, encoder: { name: t, prefix: e, encode: r }, decoder: { decode: s } };
}
const dh = Mg("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1))), rl = Mg("ascii", "a", (t) => {
  let e = "a";
  for (let r = 0; r < t.length; r++) e += String.fromCharCode(t[r]);
  return e;
}, (t) => {
  t = t.substring(1);
  const e = Ng(t.length);
  for (let r = 0; r < t.length; r++) e[r] = t.charCodeAt(r);
  return e;
}), Fg = C({ utf8: dh, "utf-8": dh, hex: uh.base16, latin1: rl, ascii: rl, binary: rl }, uh);
function yc(t, e = "utf8") {
  const r = Fg[e];
  if (!r) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : r.encoder.encode(t).substring(1);
}
function hi(t, e = "utf8") {
  const r = Fg[e];
  if (!r) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? zu(globalThis.Buffer.from(t, "utf-8")) : r.decoder.decode(`${r.prefix}${t}`);
}
function hh(t) {
  return tn(yc(hi(t, mc), Sg));
}
function Ya(t) {
  return yc(hi(cs(t), Sg), mc);
}
function Bg(t) {
  const e = hi(n0, ih), r = s0 + yc(Tg([e, t]), ih);
  return [t0, r0, r].join(e0);
}
function I_(t) {
  return yc(t, mc);
}
function N_(t) {
  return hi(t, mc);
}
function T_(t) {
  return hi([Ya(t.header), Ya(t.payload)].join(Ga), Ig);
}
function O_(t) {
  return [Ya(t.header), Ya(t.payload), I_(t.signature)].join(Ga);
}
function Yl(t) {
  const e = t.split(Ga), r = hh(e[0]), s = hh(e[1]), n = N_(e[2]), i = hi(e.slice(0, 2).join(Ga), Ig);
  return { header: r, payload: s, signature: n, data: i };
}
function ph(t = fg(i0)) {
  const e = Ag.getPublicKey(t);
  return { secretKey: Tg([t, e]), publicKey: e };
}
function R_(i, o, a, c) {
  return h(this, arguments, function* (t, e, r, s, n = H.fromMiliseconds(Date.now())) {
    const l = { alg: XE, typ: QE }, u = Bg(s.publicKey), d = n + r, p = { iss: u, sub: t, aud: e, iat: n, exp: d }, g = T_({ header: l, payload: p }), m = Ag.sign(g, s.secretKey.slice(0, 32));
    return O_({ header: l, payload: p, signature: m });
  });
}
var fh = function(t, e, r) {
  if (r || arguments.length === 2) for (var s = 0, n = e.length, i; s < n; s++)
    (i || !(s in e)) && (i || (i = Array.prototype.slice.call(e, 0, s)), i[s] = e[s]);
  return t.concat(i || Array.prototype.slice.call(e));
}, P_ = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, r, s) {
      this.name = e, this.version = r, this.os = s, this.type = "browser";
    }
    return t;
  }()
), x_ = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e) {
      this.version = e, this.type = "node", this.name = "node", this.os = process.platform;
    }
    return t;
  }()
), D_ = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, r, s, n) {
      this.name = e, this.version = r, this.os = s, this.bot = n, this.type = "bot-device";
    }
    return t;
  }()
), k_ = (
  /** @class */
  /* @__PURE__ */ function() {
    function t() {
      this.type = "bot", this.bot = !0, this.name = "bot", this.version = null, this.os = null;
    }
    return t;
  }()
), $_ = (
  /** @class */
  /* @__PURE__ */ function() {
    function t() {
      this.type = "react-native", this.name = "react-native", this.version = null, this.os = null;
    }
    return t;
  }()
), U_ = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/, L_ = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/, gh = 3, M_ = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", U_]
], mh = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function F_(t) {
  return typeof document == "undefined" && typeof navigator != "undefined" && navigator.product === "ReactNative" ? new $_() : typeof navigator != "undefined" ? j_(navigator.userAgent) : z_();
}
function B_(t) {
  return t !== "" && M_.reduce(function(e, r) {
    var s = r[0], n = r[1];
    if (e)
      return e;
    var i = n.exec(t);
    return !!i && [s, i];
  }, !1);
}
function j_(t) {
  var e = B_(t);
  if (!e)
    return null;
  var r = e[0], s = e[1];
  if (r === "searchbot")
    return new k_();
  var n = s[1] && s[1].split(".").join("_").split("_").slice(0, 3);
  n ? n.length < gh && (n = fh(fh([], n, !0), W_(gh - n.length), !0)) : n = [];
  var i = n.join("."), o = q_(t), a = L_.exec(t);
  return a && a[1] ? new D_(r, i, o, a[1]) : new P_(r, i, o);
}
function q_(t) {
  for (var e = 0, r = mh.length; e < r; e++) {
    var s = mh[e], n = s[0], i = s[1], o = i.exec(t);
    if (o)
      return n;
  }
  return null;
}
function z_() {
  var t = typeof process != "undefined" && process.version;
  return t ? new x_(process.version.slice(1)) : null;
}
function W_(t) {
  for (var e = [], r = 0; r < t; r++)
    e.push("0");
  return e;
}
var Fe = {}, wh;
function jg() {
  if (wh) return Fe;
  wh = 1, Object.defineProperty(Fe, "__esModule", { value: !0 }), Fe.getLocalStorage = Fe.getLocalStorageOrThrow = Fe.getCrypto = Fe.getCryptoOrThrow = Fe.getLocation = Fe.getLocationOrThrow = Fe.getNavigator = Fe.getNavigatorOrThrow = Fe.getDocument = Fe.getDocumentOrThrow = Fe.getFromWindowOrThrow = Fe.getFromWindow = void 0;
  function t(p) {
    let g;
    return typeof window != "undefined" && typeof window[p] != "undefined" && (g = window[p]), g;
  }
  Fe.getFromWindow = t;
  function e(p) {
    const g = t(p);
    if (!g)
      throw new Error(`${p} is not defined in Window`);
    return g;
  }
  Fe.getFromWindowOrThrow = e;
  function r() {
    return e("document");
  }
  Fe.getDocumentOrThrow = r;
  function s() {
    return t("document");
  }
  Fe.getDocument = s;
  function n() {
    return e("navigator");
  }
  Fe.getNavigatorOrThrow = n;
  function i() {
    return t("navigator");
  }
  Fe.getNavigator = i;
  function o() {
    return e("location");
  }
  Fe.getLocationOrThrow = o;
  function a() {
    return t("location");
  }
  Fe.getLocation = a;
  function c() {
    return e("crypto");
  }
  Fe.getCryptoOrThrow = c;
  function l() {
    return t("crypto");
  }
  Fe.getCrypto = l;
  function u() {
    return e("localStorage");
  }
  Fe.getLocalStorageOrThrow = u;
  function d() {
    return t("localStorage");
  }
  return Fe.getLocalStorage = d, Fe;
}
var rn = jg(), Ci = {}, yh;
function H_() {
  if (yh) return Ci;
  yh = 1, Object.defineProperty(Ci, "__esModule", { value: !0 }), Ci.getWindowMetadata = void 0;
  const t = jg();
  function e() {
    let r, s;
    try {
      r = t.getDocumentOrThrow(), s = t.getLocationOrThrow();
    } catch (g) {
      return null;
    }
    function n() {
      const g = r.getElementsByTagName("link"), m = [];
      for (let f = 0; f < g.length; f++) {
        const w = g[f], S = w.getAttribute("rel");
        if (S && S.toLowerCase().indexOf("icon") > -1) {
          const E = w.getAttribute("href");
          if (E)
            if (E.toLowerCase().indexOf("https:") === -1 && E.toLowerCase().indexOf("http:") === -1 && E.indexOf("//") !== 0) {
              let I = s.protocol + "//" + s.host;
              if (E.indexOf("/") === 0)
                I += E;
              else {
                const A = s.pathname.split("/");
                A.pop();
                const T = A.join("/");
                I += T + "/" + E;
              }
              m.push(I);
            } else if (E.indexOf("//") === 0) {
              const I = s.protocol + E;
              m.push(I);
            } else
              m.push(E);
        }
      }
      return m;
    }
    function i(...g) {
      const m = r.getElementsByTagName("meta");
      for (let f = 0; f < m.length; f++) {
        const w = m[f], S = ["itemprop", "property", "name"].map((E) => w.getAttribute(E)).filter((E) => E ? g.includes(E) : !1);
        if (S.length && S) {
          const E = w.getAttribute("content");
          if (E)
            return E;
        }
      }
      return "";
    }
    function o() {
      let g = i("name", "og:site_name", "og:title", "twitter:title");
      return g || (g = r.title), g;
    }
    function a() {
      return i("description", "og:description", "twitter:description", "keywords");
    }
    const c = o(), l = a(), u = s.origin, d = n();
    return {
      description: l,
      url: u,
      icons: d,
      name: c
    };
  }
  return Ci.getWindowMetadata = e, Ci;
}
var V_ = H_();
function eo(t, { strict: e = !0 } = {}) {
  return !t || typeof t != "string" ? !1 : e ? /^0x[0-9a-fA-F]*$/.test(t) : t.startsWith("0x");
}
function bh(t) {
  return eo(t, { strict: !1 }) ? Math.ceil((t.length - 2) / 2) : t.length;
}
const qg = "2.23.2";
let Ai = {
  getDocsUrl: ({ docsBaseUrl: t, docsPath: e = "", docsSlug: r }) => e ? `${t != null ? t : "https://viem.sh"}${e}${r ? `#${r}` : ""}` : void 0,
  version: `viem@${qg}`
}, bc = class Zl extends Error {
  constructor(e, r = {}) {
    var a, c;
    const s = (() => {
      var l;
      return r.cause instanceof Zl ? r.cause.details : (l = r.cause) != null && l.message ? r.cause.message : r.details;
    })(), n = r.cause instanceof Zl && r.cause.docsPath || r.docsPath, i = (a = Ai.getDocsUrl) == null ? void 0 : a.call(Ai, B(C({}, r), { docsPath: n })), o = [
      e || "An error occurred.",
      "",
      ...r.metaMessages ? [...r.metaMessages, ""] : [],
      ...i ? [`Docs: ${i}`] : [],
      ...s ? [`Details: ${s}`] : [],
      ...Ai.version ? [`Version: ${Ai.version}`] : []
    ].join(`
`);
    super(o, r.cause ? { cause: r.cause } : void 0), Object.defineProperty(this, "details", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "docsPath", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "metaMessages", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "shortMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "version", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BaseError"
    }), this.details = s, this.docsPath = n, this.metaMessages = r.metaMessages, this.name = (c = r.name) != null ? c : this.name, this.shortMessage = e, this.version = qg;
  }
  walk(e) {
    return zg(this, e);
  }
};
function zg(t, e) {
  return e != null && e(t) ? t : t && typeof t == "object" && "cause" in t && t.cause !== void 0 ? zg(t.cause, e) : e ? null : t;
}
let Wg = class extends bc {
  constructor({ size: e, targetSize: r, type: s }) {
    super(`${s.charAt(0).toUpperCase()}${s.slice(1).toLowerCase()} size (${e}) exceeds padding size (${r}).`, { name: "SizeExceedsPaddingSizeError" });
  }
};
function pi(t, { dir: e, size: r = 32 } = {}) {
  return typeof t == "string" ? K_(t, { dir: e, size: r }) : G_(t, { dir: e, size: r });
}
function K_(t, { dir: e, size: r = 32 } = {}) {
  if (r === null)
    return t;
  const s = t.replace("0x", "");
  if (s.length > r * 2)
    throw new Wg({
      size: Math.ceil(s.length / 2),
      targetSize: r,
      type: "hex"
    });
  return `0x${s[e === "right" ? "padEnd" : "padStart"](r * 2, "0")}`;
}
function G_(t, { dir: e, size: r = 32 } = {}) {
  if (r === null)
    return t;
  if (t.length > r)
    throw new Wg({
      size: t.length,
      targetSize: r,
      type: "bytes"
    });
  const s = new Uint8Array(r);
  for (let n = 0; n < r; n++) {
    const i = e === "right";
    s[i ? n : r - n - 1] = t[i ? n : t.length - n - 1];
  }
  return s;
}
let Y_ = class extends bc {
  constructor({ max: e, min: r, signed: s, size: n, value: i }) {
    super(`Number "${i}" is not in safe ${n ? `${n * 8}-bit ${s ? "signed" : "unsigned"} ` : ""}integer range ${e ? `(${r} to ${e})` : `(above ${r})`}`, { name: "IntegerOutOfRangeError" });
  }
}, Z_ = class extends bc {
  constructor({ givenSize: e, maxSize: r }) {
    super(`Size cannot exceed ${r} bytes. Given size: ${e} bytes.`, { name: "SizeOverflowError" });
  }
};
function fi(t, { size: e }) {
  if (bh(t) > e)
    throw new Z_({
      givenSize: bh(t),
      maxSize: e
    });
}
function Jl(t, e = {}) {
  const { signed: r } = e;
  e.size && fi(t, { size: e.size });
  const s = BigInt(t);
  if (!r)
    return s;
  const n = (t.length - 2) / 2, i = (/* @__PURE__ */ BigInt(1) << BigInt(n) * /* @__PURE__ */ BigInt(8) - /* @__PURE__ */ BigInt(1)) - /* @__PURE__ */ BigInt(1);
  return s <= i ? s : s - BigInt(`0x${"f".padStart(n * 2, "f")}`) - /* @__PURE__ */ BigInt(1);
}
function J_(t, e = {}) {
  return Number(Jl(t, e));
}
const X_ = /* @__PURE__ */ Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function Xl(t, e = {}) {
  return typeof t == "number" || typeof t == "bigint" ? Vg(t, e) : typeof t == "string" ? tC(t, e) : typeof t == "boolean" ? Q_(t, e) : Hg(t, e);
}
function Q_(t, e = {}) {
  const r = `0x${Number(t)}`;
  return typeof e.size == "number" ? (fi(r, { size: e.size }), pi(r, { size: e.size })) : r;
}
function Hg(t, e = {}) {
  let r = "";
  for (let n = 0; n < t.length; n++)
    r += X_[t[n]];
  const s = `0x${r}`;
  return typeof e.size == "number" ? (fi(s, { size: e.size }), pi(s, { dir: "right", size: e.size })) : s;
}
function Vg(t, e = {}) {
  const { signed: r, size: s } = e, n = BigInt(t);
  let i;
  s ? r ? i = (/* @__PURE__ */ BigInt(1) << BigInt(s) * /* @__PURE__ */ BigInt(8) - /* @__PURE__ */ BigInt(1)) - /* @__PURE__ */ BigInt(1) : i = Je(/* @__PURE__ */ BigInt(2), BigInt(s) * /* @__PURE__ */ BigInt(8)) - /* @__PURE__ */ BigInt(1) : typeof t == "number" && (i = BigInt(Number.MAX_SAFE_INTEGER));
  const o = typeof i == "bigint" && r ? -i - /* @__PURE__ */ BigInt(1) : 0;
  if (i && n > i || n < o) {
    const c = typeof t == "bigint" ? "n" : "";
    throw new Y_({
      max: i ? `${i}${c}` : void 0,
      min: `${o}${c}`,
      signed: r,
      size: s,
      value: `${t}${c}`
    });
  }
  const a = `0x${(r && n < 0 ? (/* @__PURE__ */ BigInt(1) << BigInt(s * 8)) + BigInt(n) : n).toString(16)}`;
  return s ? pi(a, { size: s }) : a;
}
const eC = /* @__PURE__ */ new TextEncoder();
function tC(t, e = {}) {
  const r = eC.encode(t);
  return Hg(r, e);
}
const rC = /* @__PURE__ */ new TextEncoder();
function sC(t, e = {}) {
  return typeof t == "number" || typeof t == "bigint" ? iC(t, e) : typeof t == "boolean" ? nC(t, e) : eo(t) ? Kg(t, e) : Gg(t, e);
}
function nC(t, e = {}) {
  const r = new Uint8Array(1);
  return r[0] = Number(t), typeof e.size == "number" ? (fi(r, { size: e.size }), pi(r, { size: e.size })) : r;
}
const Zr = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function vh(t) {
  if (t >= Zr.zero && t <= Zr.nine)
    return t - Zr.zero;
  if (t >= Zr.A && t <= Zr.F)
    return t - (Zr.A - 10);
  if (t >= Zr.a && t <= Zr.f)
    return t - (Zr.a - 10);
}
function Kg(t, e = {}) {
  let r = t;
  e.size && (fi(r, { size: e.size }), r = pi(r, { dir: "right", size: e.size }));
  let s = r.slice(2);
  s.length % 2 && (s = `0${s}`);
  const n = s.length / 2, i = new Uint8Array(n);
  for (let o = 0, a = 0; o < n; o++) {
    const c = vh(s.charCodeAt(a++)), l = vh(s.charCodeAt(a++));
    if (c === void 0 || l === void 0)
      throw new bc(`Invalid byte sequence ("${s[a - 2]}${s[a - 1]}" in "${s}").`);
    i[o] = c * 16 + l;
  }
  return i;
}
function iC(t, e) {
  const r = Vg(t, e);
  return Kg(r);
}
function Gg(t, e = {}) {
  const r = rC.encode(t);
  return typeof e.size == "number" ? (fi(r, { size: e.size }), pi(r, { dir: "right", size: e.size })) : r;
}
function Za(t) {
  if (!Number.isSafeInteger(t) || t < 0)
    throw new Error("positive integer expected, got " + t);
}
function oC(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function vc(t, ...e) {
  if (!oC(t))
    throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length))
    throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function q$(t) {
  if (typeof t != "function" || typeof t.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Za(t.outputLen), Za(t.blockLen);
}
function Eh(t, e = !0) {
  if (t.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && t.finished)
    throw new Error("Hash#digest() has already been called");
}
function aC(t, e) {
  vc(t);
  const r = e.outputLen;
  if (t.length < r)
    throw new Error("digestInto() expects output buffer of length at least " + r);
}
const ga = /* @__PURE__ */ BigInt(Je(2, 32) - 1), _h = /* @__PURE__ */ BigInt(32);
function cC(t, e = !1) {
  return e ? { h: Number(t & ga), l: Number(t >> _h & ga) } : { h: Number(t >> _h & ga) | 0, l: Number(t & ga) | 0 };
}
function lC(t, e = !1) {
  let r = new Uint32Array(t.length), s = new Uint32Array(t.length);
  for (let n = 0; n < t.length; n++) {
    const { h: i, l: o } = cC(t[n], e);
    [r[n], s[n]] = [i, o];
  }
  return [r, s];
}
const uC = (t, e, r) => t << r | e >>> 32 - r, dC = (t, e, r) => e << r | t >>> 32 - r, hC = (t, e, r) => e << r - 32 | t >>> 64 - r, pC = (t, e, r) => t << r - 32 | e >>> 64 - r, En = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function fC(t) {
  return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function z$(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
function W$(t, e) {
  return t << 32 - e | t >>> e;
}
const Ch = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function gC(t) {
  return t << 24 & 4278190080 | t << 8 & 16711680 | t >>> 8 & 65280 | t >>> 24 & 255;
}
function Ah(t) {
  for (let e = 0; e < t.length; e++)
    t[e] = gC(t[e]);
}
function mC(t) {
  if (typeof t != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function Yg(t) {
  return typeof t == "string" && (t = mC(t)), vc(t), t;
}
function H$(...t) {
  let e = 0;
  for (let s = 0; s < t.length; s++) {
    const n = t[s];
    vc(n), e += n.length;
  }
  const r = new Uint8Array(e);
  for (let s = 0, n = 0; s < t.length; s++) {
    const i = t[s];
    r.set(i, n), n += i.length;
  }
  return r;
}
class wC {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function yC(t) {
  const e = (s) => t().update(Yg(s)).digest(), r = t();
  return e.outputLen = r.outputLen, e.blockLen = r.blockLen, e.create = () => t(), e;
}
function V$(t = 32) {
  if (En && typeof En.getRandomValues == "function")
    return En.getRandomValues(new Uint8Array(t));
  if (En && typeof En.randomBytes == "function")
    return En.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
const Zg = [], Jg = [], Xg = [], bC = /* @__PURE__ */ BigInt(0), Si = /* @__PURE__ */ BigInt(1), vC = /* @__PURE__ */ BigInt(2), EC = /* @__PURE__ */ BigInt(7), _C = /* @__PURE__ */ BigInt(256), CC = /* @__PURE__ */ BigInt(113);
for (let t = 0, e = Si, r = 1, s = 0; t < 24; t++) {
  [r, s] = [s, (2 * r + 3 * s) % 5], Zg.push(2 * (5 * s + r)), Jg.push((t + 1) * (t + 2) / 2 % 64);
  let n = bC;
  for (let i = 0; i < 7; i++)
    e = (e << Si ^ (e >> EC) * CC) % _C, e & vC && (n ^= Si << (Si << /* @__PURE__ */ BigInt(i)) - Si);
  Xg.push(n);
}
const [AC, SC] = /* @__PURE__ */ lC(Xg, !0), Sh = (t, e, r) => r > 32 ? hC(t, e, r) : uC(t, e, r), Ih = (t, e, r) => r > 32 ? pC(t, e, r) : dC(t, e, r);
function IC(t, e = 24) {
  const r = new Uint32Array(10);
  for (let s = 24 - e; s < 24; s++) {
    for (let o = 0; o < 10; o++)
      r[o] = t[o] ^ t[o + 10] ^ t[o + 20] ^ t[o + 30] ^ t[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, c = (o + 2) % 10, l = r[c], u = r[c + 1], d = Sh(l, u, 1) ^ r[a], p = Ih(l, u, 1) ^ r[a + 1];
      for (let g = 0; g < 50; g += 10)
        t[o + g] ^= d, t[o + g + 1] ^= p;
    }
    let n = t[2], i = t[3];
    for (let o = 0; o < 24; o++) {
      const a = Jg[o], c = Sh(n, i, a), l = Ih(n, i, a), u = Zg[o];
      n = t[u], i = t[u + 1], t[u] = c, t[u + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        r[a] = t[o + a];
      for (let a = 0; a < 10; a++)
        t[o + a] ^= ~r[(a + 2) % 10] & r[(a + 4) % 10];
    }
    t[0] ^= AC[s], t[1] ^= SC[s];
  }
  r.fill(0);
}
class Wu extends wC {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(e, r, s, n = !1, i = 24) {
    if (super(), this.blockLen = e, this.suffix = r, this.outputLen = s, this.enableXOF = n, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Za(s), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = fC(this.state);
  }
  keccak() {
    Ch || Ah(this.state32), IC(this.state32, this.rounds), Ch || Ah(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    Eh(this);
    const { blockLen: r, state: s } = this;
    e = Yg(e);
    const n = e.length;
    for (let i = 0; i < n; ) {
      const o = Math.min(r - this.pos, n - i);
      for (let a = 0; a < o; a++)
        s[this.pos++] ^= e[i++];
      this.pos === r && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: e, suffix: r, pos: s, blockLen: n } = this;
    e[s] ^= r, (r & 128) !== 0 && s === n - 1 && this.keccak(), e[n - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    Eh(this, !1), vc(e), this.finish();
    const r = this.state, { blockLen: s } = this;
    for (let n = 0, i = e.length; n < i; ) {
      this.posOut >= s && this.keccak();
      const o = Math.min(s - this.posOut, i - n);
      e.set(r.subarray(this.posOut, this.posOut + o), n), this.posOut += o, n += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return Za(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (aC(e, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(e) {
    const { blockLen: r, suffix: s, outputLen: n, rounds: i, enableXOF: o } = this;
    return e || (e = new Wu(r, s, n, o, i)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i, e.suffix = s, e.outputLen = n, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
}
const NC = (t, e, r) => yC(() => new Wu(e, t, r)), TC = /* @__PURE__ */ NC(1, 136, 256 / 8);
function Qg(t, e) {
  const r = e || "hex", s = TC(eo(t, { strict: !1 }) ? sC(t) : t);
  return r === "bytes" ? s : Xl(s);
}
let OC = class extends Map {
  constructor(e) {
    super(), Object.defineProperty(this, "maxSize", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.maxSize = e;
  }
  get(e) {
    const r = super.get(e);
    return super.has(e) && r !== void 0 && (this.delete(e), super.set(e, r)), r;
  }
  set(e, r) {
    if (super.set(e, r), this.maxSize && this.size > this.maxSize) {
      const s = this.keys().next().value;
      s && this.delete(s);
    }
    return this;
  }
};
const sl = /* @__PURE__ */ new OC(8192);
function RC(t, e) {
  if (sl.has(`${t}.${e}`))
    return sl.get(`${t}.${e}`);
  const r = t.substring(2).toLowerCase(), s = Qg(Gg(r), "bytes"), n = r.split("");
  for (let o = 0; o < 40; o += 2)
    s[o >> 1] >> 4 >= 8 && n[o] && (n[o] = n[o].toUpperCase()), (s[o >> 1] & 15) >= 8 && n[o + 1] && (n[o + 1] = n[o + 1].toUpperCase());
  const i = `0x${n.join("")}`;
  return sl.set(`${t}.${e}`, i), i;
}
function PC(t) {
  const e = Qg(`0x${t.substring(4)}`).substring(26);
  return RC(`0x${e}`);
}
function xC(r) {
  return h(this, arguments, function* ({ hash: t, signature: e }) {
    const s = eo(t) ? t : Xl(t), { secp256k1: n } = yield import("./secp256k1-DQf4DiuL.mjs");
    return `0x${(() => {
      if (typeof e == "object" && "r" in e && "s" in e) {
        const { r: u, s: d, v: p, yParity: g } = e, m = Number(g != null ? g : p), f = Nh(m);
        return new n.Signature(Jl(u), Jl(d)).addRecoveryBit(f);
      }
      const a = eo(e) ? e : Xl(e), c = J_(`0x${a.slice(130)}`), l = Nh(c);
      return n.Signature.fromCompact(a.substring(2, 130)).addRecoveryBit(l);
    })().recoverPublicKey(s.substring(2)).toHex(!1)}`;
  });
}
function Nh(t) {
  if (t === 0 || t === 1)
    return t;
  if (t === 27)
    return 0;
  if (t === 28)
    return 1;
  throw new Error("Invalid yParityOrV value");
}
function DC(r) {
  return h(this, arguments, function* ({ hash: t, signature: e }) {
    return PC(yield xC({ hash: t, signature: e }));
  });
}
function kC(t) {
  if (t.length >= 255)
    throw new TypeError("Alphabet too long");
  const e = new Uint8Array(256);
  for (let l = 0; l < e.length; l++)
    e[l] = 255;
  for (let l = 0; l < t.length; l++) {
    const u = t.charAt(l), d = u.charCodeAt(0);
    if (e[d] !== 255)
      throw new TypeError(u + " is ambiguous");
    e[d] = l;
  }
  const r = t.length, s = t.charAt(0), n = Math.log(r) / Math.log(256), i = Math.log(256) / Math.log(r);
  function o(l) {
    if (l instanceof Uint8Array || (ArrayBuffer.isView(l) ? l = new Uint8Array(l.buffer, l.byteOffset, l.byteLength) : Array.isArray(l) && (l = Uint8Array.from(l))), !(l instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (l.length === 0)
      return "";
    let u = 0, d = 0, p = 0;
    const g = l.length;
    for (; p !== g && l[p] === 0; )
      p++, u++;
    const m = (g - p) * i + 1 >>> 0, f = new Uint8Array(m);
    for (; p !== g; ) {
      let E = l[p], I = 0;
      for (let A = m - 1; (E !== 0 || I < d) && A !== -1; A--, I++)
        E += 256 * f[A] >>> 0, f[A] = E % r >>> 0, E = E / r >>> 0;
      if (E !== 0)
        throw new Error("Non-zero carry");
      d = I, p++;
    }
    let w = m - d;
    for (; w !== m && f[w] === 0; )
      w++;
    let S = s.repeat(u);
    for (; w < m; ++w)
      S += t.charAt(f[w]);
    return S;
  }
  function a(l) {
    if (typeof l != "string")
      throw new TypeError("Expected String");
    if (l.length === 0)
      return new Uint8Array();
    let u = 0, d = 0, p = 0;
    for (; l[u] === s; )
      d++, u++;
    const g = (l.length - u) * n + 1 >>> 0, m = new Uint8Array(g);
    for (; u < l.length; ) {
      const E = l.charCodeAt(u);
      if (E > 255)
        return;
      let I = e[E];
      if (I === 255)
        return;
      let A = 0;
      for (let T = g - 1; (I !== 0 || A < p) && T !== -1; T--, A++)
        I += r * m[T] >>> 0, m[T] = I % 256 >>> 0, I = I / 256 >>> 0;
      if (I !== 0)
        throw new Error("Non-zero carry");
      p = A, u++;
    }
    let f = g - p;
    for (; f !== g && m[f] === 0; )
      f++;
    const w = new Uint8Array(d + (g - f));
    let S = d;
    for (; f !== g; )
      w[S++] = m[f++];
    return w;
  }
  function c(l) {
    const u = a(l);
    if (u)
      return u;
    throw new Error("Non-base" + r + " character");
  }
  return {
    encode: o,
    decodeUnsafe: a,
    decode: c
  };
}
var $C = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const em = kC($C);
function tm(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(t) : new Uint8Array(t);
}
function ji(t, e) {
  e || (e = t.reduce((n, i) => n + i.length, 0));
  const r = tm(e);
  let s = 0;
  for (const n of t)
    r.set(n, s), s += n.length;
  return r;
}
function UC(t, e) {
  if (t.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var r = new Uint8Array(256), s = 0; s < r.length; s++)
    r[s] = 255;
  for (var n = 0; n < t.length; n++) {
    var i = t.charAt(n), o = i.charCodeAt(0);
    if (r[o] !== 255)
      throw new TypeError(i + " is ambiguous");
    r[o] = n;
  }
  var a = t.length, c = t.charAt(0), l = Math.log(a) / Math.log(256), u = Math.log(256) / Math.log(a);
  function d(m) {
    if (m instanceof Uint8Array || (ArrayBuffer.isView(m) ? m = new Uint8Array(m.buffer, m.byteOffset, m.byteLength) : Array.isArray(m) && (m = Uint8Array.from(m))), !(m instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (m.length === 0)
      return "";
    for (var f = 0, w = 0, S = 0, E = m.length; S !== E && m[S] === 0; )
      S++, f++;
    for (var I = (E - S) * u + 1 >>> 0, A = new Uint8Array(I); S !== E; ) {
      for (var T = m[S], b = 0, N = I - 1; (T !== 0 || b < w) && N !== -1; N--, b++)
        T += 256 * A[N] >>> 0, A[N] = T % a >>> 0, T = T / a >>> 0;
      if (T !== 0)
        throw new Error("Non-zero carry");
      w = b, S++;
    }
    for (var P = I - w; P !== I && A[P] === 0; )
      P++;
    for (var O = c.repeat(f); P < I; ++P)
      O += t.charAt(A[P]);
    return O;
  }
  function p(m) {
    if (typeof m != "string")
      throw new TypeError("Expected String");
    if (m.length === 0)
      return new Uint8Array();
    var f = 0;
    if (m[f] !== " ") {
      for (var w = 0, S = 0; m[f] === c; )
        w++, f++;
      for (var E = (m.length - f) * l + 1 >>> 0, I = new Uint8Array(E); m[f]; ) {
        var A = r[m.charCodeAt(f)];
        if (A === 255)
          return;
        for (var T = 0, b = E - 1; (A !== 0 || T < S) && b !== -1; b--, T++)
          A += a * I[b] >>> 0, I[b] = A % 256 >>> 0, A = A / 256 >>> 0;
        if (A !== 0)
          throw new Error("Non-zero carry");
        S = T, f++;
      }
      if (m[f] !== " ") {
        for (var N = E - S; N !== E && I[N] === 0; )
          N++;
        for (var P = new Uint8Array(w + (E - N)), O = w; N !== E; )
          P[O++] = I[N++];
        return P;
      }
    }
  }
  function g(m) {
    var f = p(m);
    if (f)
      return f;
    throw new Error(`Non-${e} character`);
  }
  return {
    encode: d,
    decodeUnsafe: p,
    decode: g
  };
}
var LC = UC, MC = LC;
const FC = (t) => {
  if (t instanceof Uint8Array && t.constructor.name === "Uint8Array")
    return t;
  if (t instanceof ArrayBuffer)
    return new Uint8Array(t);
  if (ArrayBuffer.isView(t))
    return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  throw new Error("Unknown type, must be binary type");
}, BC = (t) => new TextEncoder().encode(t), jC = (t) => new TextDecoder().decode(t);
class qC {
  constructor(e, r, s) {
    this.name = e, this.prefix = r, this.baseEncode = s;
  }
  encode(e) {
    if (e instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class zC {
  constructor(e, r, s) {
    if (this.name = e, this.prefix = r, r.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = r.codePointAt(0), this.baseDecode = s;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e) {
    return rm(this, e);
  }
}
class WC {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return rm(this, e);
  }
  decode(e) {
    const r = e[0], s = this.decoders[r];
    if (s)
      return s.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const rm = (t, e) => new WC(C(C({}, t.decoders || { [t.prefix]: t }), e.decoders || { [e.prefix]: e }));
class HC {
  constructor(e, r, s, n) {
    this.name = e, this.prefix = r, this.baseEncode = s, this.baseDecode = n, this.encoder = new qC(e, r, s), this.decoder = new zC(e, r, n);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const Ec = ({ name: t, prefix: e, encode: r, decode: s }) => new HC(t, e, r, s), Yo = ({ prefix: t, name: e, alphabet: r }) => {
  const { encode: s, decode: n } = MC(r, e);
  return Ec({
    prefix: t,
    name: e,
    encode: s,
    decode: (i) => FC(n(i))
  });
}, VC = (t, e, r, s) => {
  const n = {};
  for (let u = 0; u < e.length; ++u)
    n[e[u]] = u;
  let i = t.length;
  for (; t[i - 1] === "="; )
    --i;
  const o = new Uint8Array(i * r / 8 | 0);
  let a = 0, c = 0, l = 0;
  for (let u = 0; u < i; ++u) {
    const d = n[t[u]];
    if (d === void 0)
      throw new SyntaxError(`Non-${s} character`);
    c = c << r | d, a += r, a >= 8 && (a -= 8, o[l++] = 255 & c >> a);
  }
  if (a >= r || 255 & c << 8 - a)
    throw new SyntaxError("Unexpected end of data");
  return o;
}, KC = (t, e, r) => {
  const s = e[e.length - 1] === "=", n = (1 << r) - 1;
  let i = "", o = 0, a = 0;
  for (let c = 0; c < t.length; ++c)
    for (a = a << 8 | t[c], o += 8; o > r; )
      o -= r, i += e[n & a >> o];
  if (o && (i += e[n & a << r - o]), s)
    for (; i.length * r & 7; )
      i += "=";
  return i;
}, Ct = ({ name: t, prefix: e, bitsPerChar: r, alphabet: s }) => Ec({
  prefix: e,
  name: t,
  encode(n) {
    return KC(n, s, r);
  },
  decode(n) {
    return VC(n, s, r, t);
  }
}), GC = Ec({
  prefix: "\0",
  name: "identity",
  encode: (t) => jC(t),
  decode: (t) => BC(t)
}), YC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: GC
}, Symbol.toStringTag, { value: "Module" })), ZC = Ct({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
}), JC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2: ZC
}, Symbol.toStringTag, { value: "Module" })), XC = Ct({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
}), QC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8: XC
}, Symbol.toStringTag, { value: "Module" })), e1 = Yo({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
}), t1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10: e1
}, Symbol.toStringTag, { value: "Module" })), r1 = Ct({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
}), s1 = Ct({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
}), n1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16: r1,
  base16upper: s1
}, Symbol.toStringTag, { value: "Module" })), i1 = Ct({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
}), o1 = Ct({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
}), a1 = Ct({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
}), c1 = Ct({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
}), l1 = Ct({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
}), u1 = Ct({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
}), d1 = Ct({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
}), h1 = Ct({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
}), p1 = Ct({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
}), f1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32: i1,
  base32hex: l1,
  base32hexpad: d1,
  base32hexpadupper: h1,
  base32hexupper: u1,
  base32pad: a1,
  base32padupper: c1,
  base32upper: o1,
  base32z: p1
}, Symbol.toStringTag, { value: "Module" })), g1 = Yo({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), m1 = Yo({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}), w1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36: g1,
  base36upper: m1
}, Symbol.toStringTag, { value: "Module" })), y1 = Yo({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), b1 = Yo({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
}), v1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc: y1,
  base58flickr: b1
}, Symbol.toStringTag, { value: "Module" })), E1 = Ct({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
}), _1 = Ct({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
}), C1 = Ct({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
}), A1 = Ct({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
}), S1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: E1,
  base64pad: _1,
  base64url: C1,
  base64urlpad: A1
}, Symbol.toStringTag, { value: "Module" })), sm = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), I1 = sm.reduce((t, e, r) => (t[r] = e, t), []), N1 = sm.reduce((t, e, r) => (t[e.codePointAt(0)] = r, t), []);
function T1(t) {
  return t.reduce((e, r) => (e += I1[r], e), "");
}
function O1(t) {
  const e = [];
  for (const r of t) {
    const s = N1[r.codePointAt(0)];
    if (s === void 0)
      throw new Error(`Non-base256emoji character: ${r}`);
    e.push(s);
  }
  return new Uint8Array(e);
}
const R1 = Ec({
  prefix: "🚀",
  name: "base256emoji",
  encode: T1,
  decode: O1
}), P1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji: R1
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const Th = C(C(C(C(C(C(C(C(C(C({}, YC), JC), QC), t1), n1), f1), w1), v1), S1), P1);
function nm(t, e, r, s) {
  return {
    name: t,
    prefix: e,
    encoder: {
      name: t,
      prefix: e,
      encode: r
    },
    decoder: { decode: s }
  };
}
const Oh = nm("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1))), nl = nm("ascii", "a", (t) => {
  let e = "a";
  for (let r = 0; r < t.length; r++)
    e += String.fromCharCode(t[r]);
  return e;
}, (t) => {
  t = t.substring(1);
  const e = tm(t.length);
  for (let r = 0; r < t.length; r++)
    e[r] = t.charCodeAt(r);
  return e;
}), im = C({
  utf8: Oh,
  "utf-8": Oh,
  hex: Th.base16,
  latin1: nl,
  ascii: nl,
  binary: nl
}, Th);
function fr(t, e = "utf8") {
  const r = im[e];
  if (!r)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t, "utf8") : r.decoder.decode(`${r.prefix}${t}`);
}
function zt(t, e = "utf8") {
  const r = im[e];
  if (!r)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : r.encoder.encode(t).substring(1);
}
const x1 = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } }, D1 = ":";
function Hn(t) {
  const [e, r] = t.split(D1);
  return { namespace: e, reference: r };
}
function om(t, e) {
  return t.includes(":") ? [t] : e.chains || [];
}
var k1 = Object.defineProperty, $1 = Object.defineProperties, U1 = Object.getOwnPropertyDescriptors, Rh = Object.getOwnPropertySymbols, L1 = Object.prototype.hasOwnProperty, M1 = Object.prototype.propertyIsEnumerable, Ph = (t, e, r) => e in t ? k1(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, xh = (t, e) => {
  for (var r in e || (e = {})) L1.call(e, r) && Ph(t, r, e[r]);
  if (Rh) for (var r of Rh(e)) M1.call(e, r) && Ph(t, r, e[r]);
  return t;
}, F1 = (t, e) => $1(t, U1(e));
const B1 = "ReactNative", rr = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, j1 = "js";
function Ja() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function xs() {
  return !rn.getDocument() && !!rn.getNavigator() && navigator.product === B1;
}
function q1() {
  return xs() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function z1() {
  return xs() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function Zo() {
  return !Ja() && !!rn.getNavigator() && !!rn.getDocument();
}
function Jo() {
  return xs() ? rr.reactNative : Ja() ? rr.node : Zo() ? rr.browser : rr.unknown;
}
function Dh() {
  var t;
  try {
    return xs() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (t = global.Application) == null ? void 0 : t.applicationId : void 0;
  } catch (e) {
    return;
  }
}
function W1(t, e) {
  const r = new URLSearchParams(t);
  for (const s of Object.keys(e).sort()) if (e.hasOwnProperty(s)) {
    const n = e[s];
    n !== void 0 && r.set(s, n);
  }
  return r.toString();
}
function H1(t) {
  var e, r;
  const s = am();
  try {
    return t != null && t.url && s.url && t.url !== s.url && (console.warn(`The configured WalletConnect 'metadata.url':${t.url} differs from the actual page url:${s.url}. This is probably unintended and can lead to issues.`), t.url = s.url), (e = t == null ? void 0 : t.icons) != null && e.length && t.icons.length > 0 && (t.icons = t.icons.filter((n) => n !== "")), F1(xh(xh({}, s), t), { url: (t == null ? void 0 : t.url) || s.url, name: (t == null ? void 0 : t.name) || s.name, description: (t == null ? void 0 : t.description) || s.description, icons: (r = t == null ? void 0 : t.icons) != null && r.length && t.icons.length > 0 ? t.icons : s.icons });
  } catch (n) {
    return console.warn("Error populating app metadata", n), t || s;
  }
}
function am() {
  return V_.getWindowMetadata() || { name: "", description: "", url: "", icons: [""] };
}
function V1() {
  if (Jo() === rr.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: r, Version: s } = global.Platform;
    return [r, s].join("-");
  }
  const t = F_();
  if (t === null) return "unknown";
  const e = t.os ? t.os.replace(" ", "").toLowerCase() : "unknown";
  return t.type === "browser" ? [e, t.name, t.version].join("-") : [e, t.version].join("-");
}
function K1() {
  var t;
  const e = Jo();
  return e === rr.browser ? [e, ((t = rn.getLocation()) == null ? void 0 : t.host) || "unknown"].join(":") : e;
}
function cm(t, e, r) {
  const s = V1(), n = K1();
  return [[t, e].join("-"), [j1, r].join("-"), s, n].join("/");
}
function G1({ protocol: t, version: e, relayUrl: r, sdkVersion: s, auth: n, projectId: i, useOnCloseEvent: o, bundleId: a, packageName: c }) {
  const l = r.split("?"), u = cm(t, e, s), d = { auth: n, ua: u, projectId: i, useOnCloseEvent: o, packageName: c || void 0, bundleId: a || void 0 }, p = W1(l[1] || "", d);
  return l[0] + "?" + p;
}
function Hs(t, e) {
  return t.filter((r) => e.includes(r)).length === t.length;
}
function Ql(t) {
  return Object.fromEntries(t.entries());
}
function eu(t) {
  return new Map(Object.entries(t));
}
function Fs(t = H.FIVE_MINUTES, e) {
  const r = H.toMiliseconds(t || H.FIVE_MINUTES);
  let s, n, i, o;
  return { resolve: (a) => {
    i && s && (clearTimeout(i), s(a), o = Promise.resolve(a));
  }, reject: (a) => {
    i && n && (clearTimeout(i), n(a));
  }, done: () => new Promise((a, c) => {
    if (o) return a(o);
    i = setTimeout(() => {
      const l = new Error(e);
      o = Promise.reject(l), c(l);
    }, r), s = a, n = c;
  }) };
}
function _s(t, e, r) {
  return new Promise((s, n) => h(null, null, function* () {
    const i = setTimeout(() => n(new Error(r)), e);
    try {
      const o = yield t;
      s(o);
    } catch (o) {
      n(o);
    }
    clearTimeout(i);
  }));
}
function lm(t, e) {
  if (typeof e == "string" && e.startsWith(`${t}:`)) return e;
  if (t.toLowerCase() === "topic") {
    if (typeof e != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e}`;
  } else if (t.toLowerCase() === "id") {
    if (typeof e != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e}`;
  }
  throw new Error(`Unknown expirer target type: ${t}`);
}
function Y1(t) {
  return lm("topic", t);
}
function Z1(t) {
  return lm("id", t);
}
function um(t) {
  const [e, r] = t.split(":"), s = { id: void 0, topic: void 0 };
  if (e === "topic" && typeof r == "string") s.topic = r;
  else if (e === "id" && Number.isInteger(Number(r))) s.id = Number(r);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${e}:${r}`);
  return s;
}
function nt(t, e) {
  return H.fromMiliseconds(Date.now() + H.toMiliseconds(t));
}
function ys(t) {
  return Date.now() >= H.toMiliseconds(t);
}
function Pe(t, e) {
  return `${t}${e ? `:${e}` : ""}`;
}
function $a(t = [], e = []) {
  return [.../* @__PURE__ */ new Set([...t, ...e])];
}
function J1(s) {
  return h(this, arguments, function* ({ id: t, topic: e, wcDeepLink: r }) {
    var n;
    try {
      if (!r) return;
      const i = typeof r == "string" ? JSON.parse(r) : r, o = i == null ? void 0 : i.href;
      if (typeof o != "string") return;
      const a = X1(o, t, e), c = Jo();
      if (c === rr.browser) {
        if (!((n = rn.getDocument()) != null && n.hasFocus())) {
          console.warn("Document does not have focus, skipping deeplink.");
          return;
        }
        Q1(a);
      } else c === rr.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && (yield global.Linking.openURL(a));
    } catch (i) {
      console.error(i);
    }
  });
}
function X1(t, e, r) {
  const s = `requestId=${e}&sessionTopic=${r}`;
  t.endsWith("/") && (t = t.slice(0, -1));
  let n = `${t}`;
  if (t.startsWith("https://t.me")) {
    const i = t.includes("?") ? "&startapp=" : "?startapp=";
    n = `${n}${i}${sA(s, !0)}`;
  } else n = `${n}/wc?${s}`;
  return n;
}
function Q1(t) {
  let e = "_self";
  rA() ? e = "_top" : (tA() || t.startsWith("https://") || t.startsWith("http://")) && (e = "_blank"), window.open(t, e, "noreferrer noopener");
}
function eA(t, e) {
  return h(this, null, function* () {
    let r = "";
    try {
      if (Zo() && (r = localStorage.getItem(e), r)) return r;
      r = yield t.getItem(e);
    } catch (s) {
      console.error(s);
    }
    return r;
  });
}
function kh(t, e) {
  if (!t.includes(e)) return null;
  const r = t.split(/([&,?,=])/), s = r.indexOf(e);
  return r[s + 2];
}
function $h() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t) => {
    const e = Math.random() * 16 | 0;
    return (t === "x" ? e : e & 3 | 8).toString(16);
  });
}
function Hu() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function tA() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function rA() {
  try {
    return window.self !== window.top;
  } catch (t) {
    return !1;
  }
}
function sA(t, e = !1) {
  const r = Buffer.from(t).toString("base64");
  return e ? r.replace(/[=]/g, "") : r;
}
function dm(t) {
  return Buffer.from(t, "base64").toString("utf-8");
}
function nA(t) {
  return new Promise((e) => setTimeout(e, t));
}
function to(t) {
  if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function iA(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Xo(t, ...e) {
  if (!iA(t)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function Vu(t) {
  if (typeof t != "function" || typeof t.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
  to(t.outputLen), to(t.blockLen);
}
function Yn(t, e = !0) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function hm(t, e) {
  Xo(t);
  const r = e.outputLen;
  if (t.length < r) throw new Error("digestInto() expects output buffer of length at least " + r);
}
const ma = BigInt(Je(2, 32) - 1), Uh = BigInt(32);
function oA(t, e = !1) {
  return e ? { h: Number(t & ma), l: Number(t >> Uh & ma) } : { h: Number(t >> Uh & ma) | 0, l: Number(t & ma) | 0 };
}
function aA(t, e = !1) {
  let r = new Uint32Array(t.length), s = new Uint32Array(t.length);
  for (let n = 0; n < t.length; n++) {
    const { h: i, l: o } = oA(t[n], e);
    [r[n], s[n]] = [i, o];
  }
  return [r, s];
}
const cA = (t, e, r) => t << r | e >>> 32 - r, lA = (t, e, r) => e << r | t >>> 32 - r, uA = (t, e, r) => e << r - 32 | t >>> 64 - r, dA = (t, e, r) => t << r - 32 | e >>> 64 - r, _n = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function hA(t) {
  return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function il(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
function xr(t, e) {
  return t << 32 - e | t >>> e;
}
const Lh = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function pA(t) {
  return t << 24 & 4278190080 | t << 8 & 16711680 | t >>> 8 & 65280 | t >>> 24 & 255;
}
function Mh(t) {
  for (let e = 0; e < t.length; e++) t[e] = pA(t[e]);
}
function fA(t) {
  if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function Zn(t) {
  return typeof t == "string" && (t = fA(t)), Xo(t), t;
}
function gA(...t) {
  let e = 0;
  for (let s = 0; s < t.length; s++) {
    const n = t[s];
    Xo(n), e += n.length;
  }
  const r = new Uint8Array(e);
  for (let s = 0, n = 0; s < t.length; s++) {
    const i = t[s];
    r.set(i, n), n += i.length;
  }
  return r;
}
let Ku = class {
  clone() {
    return this._cloneInto();
  }
};
function pm(t) {
  const e = (s) => t().update(Zn(s)).digest(), r = t();
  return e.outputLen = r.outputLen, e.blockLen = r.blockLen, e.create = () => t(), e;
}
function gi(t = 32) {
  if (_n && typeof _n.getRandomValues == "function") return _n.getRandomValues(new Uint8Array(t));
  if (_n && typeof _n.randomBytes == "function") return _n.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
const fm = [], gm = [], mm = [], mA = BigInt(0), Ii = BigInt(1), wA = BigInt(2), yA = BigInt(7), bA = BigInt(256), vA = BigInt(113);
for (let t = 0, e = Ii, r = 1, s = 0; t < 24; t++) {
  [r, s] = [s, (2 * r + 3 * s) % 5], fm.push(2 * (5 * s + r)), gm.push((t + 1) * (t + 2) / 2 % 64);
  let n = mA;
  for (let i = 0; i < 7; i++) e = (e << Ii ^ (e >> yA) * vA) % bA, e & wA && (n ^= Ii << (Ii << BigInt(i)) - Ii);
  mm.push(n);
}
const [EA, _A] = aA(mm, !0), Fh = (t, e, r) => r > 32 ? uA(t, e, r) : cA(t, e, r), Bh = (t, e, r) => r > 32 ? dA(t, e, r) : lA(t, e, r);
function CA(t, e = 24) {
  const r = new Uint32Array(10);
  for (let s = 24 - e; s < 24; s++) {
    for (let o = 0; o < 10; o++) r[o] = t[o] ^ t[o + 10] ^ t[o + 20] ^ t[o + 30] ^ t[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, c = (o + 2) % 10, l = r[c], u = r[c + 1], d = Fh(l, u, 1) ^ r[a], p = Bh(l, u, 1) ^ r[a + 1];
      for (let g = 0; g < 50; g += 10) t[o + g] ^= d, t[o + g + 1] ^= p;
    }
    let n = t[2], i = t[3];
    for (let o = 0; o < 24; o++) {
      const a = gm[o], c = Fh(n, i, a), l = Bh(n, i, a), u = fm[o];
      n = t[u], i = t[u + 1], t[u] = c, t[u + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++) r[a] = t[o + a];
      for (let a = 0; a < 10; a++) t[o + a] ^= ~r[(a + 2) % 10] & r[(a + 4) % 10];
    }
    t[0] ^= EA[s], t[1] ^= _A[s];
  }
  r.fill(0);
}
let AA = class wm extends Ku {
  constructor(e, r, s, n = !1, i = 24) {
    if (super(), this.blockLen = e, this.suffix = r, this.outputLen = s, this.enableXOF = n, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, to(s), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = hA(this.state);
  }
  keccak() {
    Lh || Mh(this.state32), CA(this.state32, this.rounds), Lh || Mh(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    Yn(this);
    const { blockLen: r, state: s } = this;
    e = Zn(e);
    const n = e.length;
    for (let i = 0; i < n; ) {
      const o = Math.min(r - this.pos, n - i);
      for (let a = 0; a < o; a++) s[this.pos++] ^= e[i++];
      this.pos === r && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = !0;
    const { state: e, suffix: r, pos: s, blockLen: n } = this;
    e[s] ^= r, (r & 128) !== 0 && s === n - 1 && this.keccak(), e[n - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    Yn(this, !1), Xo(e), this.finish();
    const r = this.state, { blockLen: s } = this;
    for (let n = 0, i = e.length; n < i; ) {
      this.posOut >= s && this.keccak();
      const o = Math.min(s - this.posOut, i - n);
      e.set(r.subarray(this.posOut, this.posOut + o), n), this.posOut += o, n += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return to(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (hm(e, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(e) {
    const { blockLen: r, suffix: s, outputLen: n, rounds: i, enableXOF: o } = this;
    return e || (e = new wm(r, s, n, o, i)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i, e.suffix = s, e.outputLen = n, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
};
const SA = (t, e, r) => pm(() => new AA(e, t, r)), IA = SA(1, 136, 256 / 8), NA = "https://rpc.walletconnect.org/v1";
function ym(t) {
  const e = `Ethereum Signed Message:
${t.length}`, r = new TextEncoder().encode(e + t);
  return "0x" + Buffer.from(IA(r)).toString("hex");
}
function TA(t, e, r, s, n, i) {
  return h(this, null, function* () {
    switch (r.t) {
      case "eip191":
        return yield OA(t, e, r.s);
      case "eip1271":
        return yield RA(t, e, r.s, s, n, i);
      default:
        throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${r.t}`);
    }
  });
}
function OA(t, e, r) {
  return h(this, null, function* () {
    return (yield DC({ hash: ym(e), signature: r })).toLowerCase() === t.toLowerCase();
  });
}
function RA(t, e, r, s, n, i) {
  return h(this, null, function* () {
    const o = Hn(s);
    if (!o.namespace || !o.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${s}`);
    try {
      const a = "0x1626ba7e", c = "0000000000000000000000000000000000000000000000000000000000000040", l = "0000000000000000000000000000000000000000000000000000000000000041", u = r.substring(2), d = ym(e).substring(2), p = a + d + c + l + u, g = yield fetch(`${i || NA}/?chainId=${s}&projectId=${n}`, { method: "POST", body: JSON.stringify({ id: PA(), jsonrpc: "2.0", method: "eth_call", params: [{ to: t, data: p }, "latest"] }) }), { result: m } = yield g.json();
      return m ? m.slice(0, a.length).toLowerCase() === a.toLowerCase() : !1;
    } catch (a) {
      return console.error("isValidEip1271Signature: ", a), !1;
    }
  });
}
function PA() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function xA(t) {
  const e = atob(t), r = new Uint8Array(e.length);
  for (let o = 0; o < e.length; o++) r[o] = e.charCodeAt(o);
  const s = r[0];
  if (s === 0) throw new Error("No signatures found");
  const n = 1 + s * 64;
  if (r.length < n) throw new Error("Transaction data too short for claimed signature count");
  if (r.length < 100) throw new Error("Transaction too short");
  const i = Buffer.from(t, "base64").slice(1, 65);
  return em.encode(i);
}
var DA = Object.defineProperty, kA = Object.defineProperties, $A = Object.getOwnPropertyDescriptors, jh = Object.getOwnPropertySymbols, UA = Object.prototype.hasOwnProperty, LA = Object.prototype.propertyIsEnumerable, qh = (t, e, r) => e in t ? DA(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, MA = (t, e) => {
  for (var r in e || (e = {})) UA.call(e, r) && qh(t, r, e[r]);
  if (jh) for (var r of jh(e)) LA.call(e, r) && qh(t, r, e[r]);
  return t;
}, FA = (t, e) => kA(t, $A(e));
const BA = "did:pkh:", Gu = (t) => t == null ? void 0 : t.split(":"), jA = (t) => {
  const e = t && Gu(t);
  if (e) return t.includes(BA) ? e[3] : e[1];
}, tu = (t) => {
  const e = t && Gu(t);
  if (e) return e[2] + ":" + e[3];
}, Xa = (t) => {
  const e = t && Gu(t);
  if (e) return e.pop();
};
function zh(t) {
  return h(this, null, function* () {
    const { cacao: e, projectId: r } = t, { s, p: n } = e, i = bm(n, n.iss), o = Xa(n.iss);
    return yield TA(o, i, s, tu(n.iss), r);
  });
}
const bm = (t, e) => {
  const r = `${t.domain} wants you to sign in with your Ethereum account:`, s = Xa(e);
  if (!t.aud && !t.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let n = t.statement || void 0;
  const i = `URI: ${t.aud || t.uri}`, o = `Version: ${t.version}`, a = `Chain ID: ${jA(e)}`, c = `Nonce: ${t.nonce}`, l = `Issued At: ${t.iat}`, u = t.exp ? `Expiration Time: ${t.exp}` : void 0, d = t.nbf ? `Not Before: ${t.nbf}` : void 0, p = t.requestId ? `Request ID: ${t.requestId}` : void 0, g = t.resources ? `Resources:${t.resources.map((f) => `
- ${f}`).join("")}` : void 0, m = Ua(t.resources);
  if (m) {
    const f = ro(m);
    n = ZA(n, f);
  }
  return [r, s, "", n, "", i, o, a, c, l, u, d, p, g].filter((f) => f != null).join(`
`);
};
function qA(t) {
  return Buffer.from(JSON.stringify(t)).toString("base64");
}
function zA(t) {
  return JSON.parse(Buffer.from(t, "base64").toString("utf-8"));
}
function sn(t) {
  if (!t) throw new Error("No recap provided, value is undefined");
  if (!t.att) throw new Error("No `att` property found");
  const e = Object.keys(t.att);
  if (!(e != null && e.length)) throw new Error("No resources found in `att` property");
  e.forEach((r) => {
    const s = t.att[r];
    if (Array.isArray(s)) throw new Error(`Resource must be an object: ${r}`);
    if (typeof s != "object") throw new Error(`Resource must be an object: ${r}`);
    if (!Object.keys(s).length) throw new Error(`Resource object is empty: ${r}`);
    Object.keys(s).forEach((n) => {
      const i = s[n];
      if (!Array.isArray(i)) throw new Error(`Ability limits ${n} must be an array of objects, found: ${i}`);
      if (!i.length) throw new Error(`Value of ${n} is empty array, must be an array with objects`);
      i.forEach((o) => {
        if (typeof o != "object") throw new Error(`Ability limits (${n}) must be an array of objects, found: ${o}`);
      });
    });
  });
}
function WA(t, e, r, s = {}) {
  return r == null || r.sort((n, i) => n.localeCompare(i)), { att: { [t]: HA(e, r, s) } };
}
function HA(t, e, r = {}) {
  e = e == null ? void 0 : e.sort((n, i) => n.localeCompare(i));
  const s = e.map((n) => ({ [`${t}/${n}`]: [r] }));
  return Object.assign({}, ...s);
}
function vm(t) {
  return sn(t), `urn:recap:${qA(t).replace(/=/g, "")}`;
}
function ro(t) {
  const e = zA(t.replace("urn:recap:", ""));
  return sn(e), e;
}
function VA(t, e, r) {
  const s = WA(t, e, r);
  return vm(s);
}
function KA(t) {
  return t && t.includes("urn:recap:");
}
function GA(t, e) {
  const r = ro(t), s = ro(e), n = YA(r, s);
  return vm(n);
}
function YA(t, e) {
  sn(t), sn(e);
  const r = Object.keys(t.att).concat(Object.keys(e.att)).sort((n, i) => n.localeCompare(i)), s = { att: {} };
  return r.forEach((n) => {
    var i, o;
    Object.keys(((i = t.att) == null ? void 0 : i[n]) || {}).concat(Object.keys(((o = e.att) == null ? void 0 : o[n]) || {})).sort((a, c) => a.localeCompare(c)).forEach((a) => {
      var c, l;
      s.att[n] = FA(MA({}, s.att[n]), { [a]: ((c = t.att[n]) == null ? void 0 : c[a]) || ((l = e.att[n]) == null ? void 0 : l[a]) });
    });
  }), s;
}
function ZA(t = "", e) {
  sn(e);
  const r = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (t.includes(r)) return t;
  const s = [];
  let n = 0;
  Object.keys(e.att).forEach((a) => {
    const c = Object.keys(e.att[a]).map((d) => ({ ability: d.split("/")[0], action: d.split("/")[1] }));
    c.sort((d, p) => d.action.localeCompare(p.action));
    const l = {};
    c.forEach((d) => {
      l[d.ability] || (l[d.ability] = []), l[d.ability].push(d.action);
    });
    const u = Object.keys(l).map((d) => (n++, `(${n}) '${d}': '${l[d].join("', '")}' for '${a}'.`));
    s.push(u.join(", ").replace(".,", "."));
  });
  const i = s.join(" "), o = `${r}${i}`;
  return `${t ? t + " " : ""}${o}`;
}
function Wh(t) {
  var e;
  const r = ro(t);
  sn(r);
  const s = (e = r.att) == null ? void 0 : e.eip155;
  return s ? Object.keys(s).map((n) => n.split("/")[1]) : [];
}
function Hh(t) {
  const e = ro(t);
  sn(e);
  const r = [];
  return Object.values(e.att).forEach((s) => {
    Object.values(s).forEach((n) => {
      var i;
      (i = n == null ? void 0 : n[0]) != null && i.chains && r.push(n[0].chains);
    });
  }), [...new Set(r.flat())];
}
function Ua(t) {
  if (!t) return;
  const e = t == null ? void 0 : t[t.length - 1];
  return KA(e) ? e : void 0;
}
function ol(t) {
  if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function Em(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function er(t, ...e) {
  if (!Em(t)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function Vh(t, e = !0) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function JA(t, e) {
  er(t);
  const r = e.outputLen;
  if (t.length < r) throw new Error("digestInto() expects output buffer of length at least " + r);
}
function Kh(t) {
  if (typeof t != "boolean") throw new Error(`boolean expected, not ${t}`);
}
const As = (t) => new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4)), XA = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength), QA = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!QA) throw new Error("Non little-endian hardware is not supported");
function eS(t) {
  if (typeof t != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
function ru(t) {
  if (typeof t == "string") t = eS(t);
  else if (Em(t)) t = su(t);
  else throw new Error("Uint8Array expected, got " + typeof t);
  return t;
}
function tS(t, e) {
  if (e == null || typeof e != "object") throw new Error("options must be defined");
  return Object.assign(t, e);
}
function rS(t, e) {
  if (t.length !== e.length) return !1;
  let r = 0;
  for (let s = 0; s < t.length; s++) r |= t[s] ^ e[s];
  return r === 0;
}
const sS = (t, e) => {
  function r(s, ...n) {
    if (er(s), t.nonceLength !== void 0) {
      const l = n[0];
      if (!l) throw new Error("nonce / iv required");
      t.varSizeNonce ? er(l) : er(l, t.nonceLength);
    }
    const i = t.tagLength;
    i && n[1] !== void 0 && er(n[1]);
    const o = e(s, ...n), a = (l, u) => {
      if (u !== void 0) {
        if (l !== 2) throw new Error("cipher output not supported");
        er(u);
      }
    };
    let c = !1;
    return { encrypt(l, u) {
      if (c) throw new Error("cannot encrypt() twice with same key + nonce");
      return c = !0, er(l), a(o.encrypt.length, u), o.encrypt(l, u);
    }, decrypt(l, u) {
      if (er(l), i && l.length < i) throw new Error("invalid ciphertext length: smaller than tagLength=" + i);
      return a(o.decrypt.length, u), o.decrypt(l, u);
    } };
  }
  return Object.assign(r, t), r;
};
function Gh(t, e, r = !0) {
  if (e === void 0) return new Uint8Array(t);
  if (e.length !== t) throw new Error("invalid output length, expected " + t + ", got: " + e.length);
  if (r && !nS(e)) throw new Error("invalid output, must be aligned");
  return e;
}
function Yh(t, e, r, s) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, r, s);
  const n = BigInt(32), i = BigInt(4294967295), o = Number(r >> n & i), a = Number(r & i);
  t.setUint32(e + 4, o, s), t.setUint32(e + 0, a, s);
}
function nS(t) {
  return t.byteOffset % 4 === 0;
}
function su(t) {
  return Uint8Array.from(t);
}
function Jn(...t) {
  for (let e = 0; e < t.length; e++) t[e].fill(0);
}
const _m = (t) => Uint8Array.from(t.split("").map((e) => e.charCodeAt(0))), iS = _m("expand 16-byte k"), oS = _m("expand 32-byte k"), aS = As(iS), cS = As(oS);
function Ie(t, e) {
  return t << e | t >>> 32 - e;
}
function nu(t) {
  return t.byteOffset % 4 === 0;
}
const wa = 64, lS = 16, Cm = Je(2, 32) - 1, Zh = new Uint32Array();
function uS(t, e, r, s, n, i, o, a) {
  const c = n.length, l = new Uint8Array(wa), u = As(l), d = nu(n) && nu(i), p = d ? As(n) : Zh, g = d ? As(i) : Zh;
  for (let m = 0; m < c; o++) {
    if (t(e, r, s, u, o, a), o >= Cm) throw new Error("arx: counter overflow");
    const f = Math.min(wa, c - m);
    if (d && f === wa) {
      const w = m / 4;
      if (m % 4 !== 0) throw new Error("arx: invalid block position");
      for (let S = 0, E; S < lS; S++) E = w + S, g[E] = p[E] ^ u[S];
      m += wa;
      continue;
    }
    for (let w = 0, S; w < f; w++) S = m + w, i[S] = n[S] ^ l[w];
    m += f;
  }
}
function dS(t, e) {
  const { allowShortKeys: r, extendNonceFn: s, counterLength: n, counterRight: i, rounds: o } = tS({ allowShortKeys: !1, counterLength: 8, counterRight: !1, rounds: 20 }, e);
  if (typeof t != "function") throw new Error("core must be a function");
  return ol(n), ol(o), Kh(i), Kh(r), (a, c, l, u, d = 0) => {
    er(a), er(c), er(l);
    const p = l.length;
    if (u === void 0 && (u = new Uint8Array(p)), er(u), ol(d), d < 0 || d >= Cm) throw new Error("arx: counter overflow");
    if (u.length < p) throw new Error(`arx: output (${u.length}) is shorter than data (${p})`);
    const g = [];
    let m = a.length, f, w;
    if (m === 32) g.push(f = su(a)), w = cS;
    else if (m === 16 && r) f = new Uint8Array(32), f.set(a), f.set(a, 16), w = aS, g.push(f);
    else throw new Error(`arx: invalid 32-byte key, got length=${m}`);
    nu(c) || g.push(c = su(c));
    const S = As(f);
    if (s) {
      if (c.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
      s(w, S, As(c.subarray(0, 16)), S), c = c.subarray(16);
    }
    const E = 16 - n;
    if (E !== c.length) throw new Error(`arx: nonce must be ${E} or 16 bytes`);
    if (E !== 12) {
      const A = new Uint8Array(12);
      A.set(c, i ? 0 : 12 - c.length), c = A, g.push(c);
    }
    const I = As(c);
    return uS(t, w, S, I, l, u, d, o), Jn(...g), u;
  };
}
const gt = (t, e) => t[e++] & 255 | (t[e++] & 255) << 8;
class hS {
  constructor(e) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = !1, e = ru(e), er(e, 32);
    const r = gt(e, 0), s = gt(e, 2), n = gt(e, 4), i = gt(e, 6), o = gt(e, 8), a = gt(e, 10), c = gt(e, 12), l = gt(e, 14);
    this.r[0] = r & 8191, this.r[1] = (r >>> 13 | s << 3) & 8191, this.r[2] = (s >>> 10 | n << 6) & 7939, this.r[3] = (n >>> 7 | i << 9) & 8191, this.r[4] = (i >>> 4 | o << 12) & 255, this.r[5] = o >>> 1 & 8190, this.r[6] = (o >>> 14 | a << 2) & 8191, this.r[7] = (a >>> 11 | c << 5) & 8065, this.r[8] = (c >>> 8 | l << 8) & 8191, this.r[9] = l >>> 5 & 127;
    for (let u = 0; u < 8; u++) this.pad[u] = gt(e, 16 + 2 * u);
  }
  process(e, r, s = !1) {
    const n = s ? 0 : 2048, { h: i, r: o } = this, a = o[0], c = o[1], l = o[2], u = o[3], d = o[4], p = o[5], g = o[6], m = o[7], f = o[8], w = o[9], S = gt(e, r + 0), E = gt(e, r + 2), I = gt(e, r + 4), A = gt(e, r + 6), T = gt(e, r + 8), b = gt(e, r + 10), N = gt(e, r + 12), P = gt(e, r + 14);
    let O = i[0] + (S & 8191), x = i[1] + ((S >>> 13 | E << 3) & 8191), $ = i[2] + ((E >>> 10 | I << 6) & 8191), F = i[3] + ((I >>> 7 | A << 9) & 8191), W = i[4] + ((A >>> 4 | T << 12) & 8191), k = i[5] + (T >>> 1 & 8191), v = i[6] + ((T >>> 14 | b << 2) & 8191), _ = i[7] + ((b >>> 11 | N << 5) & 8191), D = i[8] + ((N >>> 8 | P << 8) & 8191), L = i[9] + (P >>> 5 | n), U = 0, M = U + O * a + x * (5 * w) + $ * (5 * f) + F * (5 * m) + W * (5 * g);
    U = M >>> 13, M &= 8191, M += k * (5 * p) + v * (5 * d) + _ * (5 * u) + D * (5 * l) + L * (5 * c), U += M >>> 13, M &= 8191;
    let K = U + O * c + x * a + $ * (5 * w) + F * (5 * f) + W * (5 * m);
    U = K >>> 13, K &= 8191, K += k * (5 * g) + v * (5 * p) + _ * (5 * d) + D * (5 * u) + L * (5 * l), U += K >>> 13, K &= 8191;
    let Z = U + O * l + x * c + $ * a + F * (5 * w) + W * (5 * f);
    U = Z >>> 13, Z &= 8191, Z += k * (5 * m) + v * (5 * g) + _ * (5 * p) + D * (5 * d) + L * (5 * u), U += Z >>> 13, Z &= 8191;
    let ie = U + O * u + x * l + $ * c + F * a + W * (5 * w);
    U = ie >>> 13, ie &= 8191, ie += k * (5 * f) + v * (5 * m) + _ * (5 * g) + D * (5 * p) + L * (5 * d), U += ie >>> 13, ie &= 8191;
    let G = U + O * d + x * u + $ * l + F * c + W * a;
    U = G >>> 13, G &= 8191, G += k * (5 * w) + v * (5 * f) + _ * (5 * m) + D * (5 * g) + L * (5 * p), U += G >>> 13, G &= 8191;
    let ae = U + O * p + x * d + $ * u + F * l + W * c;
    U = ae >>> 13, ae &= 8191, ae += k * a + v * (5 * w) + _ * (5 * f) + D * (5 * m) + L * (5 * g), U += ae >>> 13, ae &= 8191;
    let me = U + O * g + x * p + $ * d + F * u + W * l;
    U = me >>> 13, me &= 8191, me += k * c + v * a + _ * (5 * w) + D * (5 * f) + L * (5 * m), U += me >>> 13, me &= 8191;
    let Me = U + O * m + x * g + $ * p + F * d + W * u;
    U = Me >>> 13, Me &= 8191, Me += k * l + v * c + _ * a + D * (5 * w) + L * (5 * f), U += Me >>> 13, Me &= 8191;
    let De = U + O * f + x * m + $ * g + F * p + W * d;
    U = De >>> 13, De &= 8191, De += k * u + v * l + _ * c + D * a + L * (5 * w), U += De >>> 13, De &= 8191;
    let Ae = U + O * w + x * f + $ * m + F * g + W * p;
    U = Ae >>> 13, Ae &= 8191, Ae += k * d + v * u + _ * l + D * c + L * a, U += Ae >>> 13, Ae &= 8191, U = (U << 2) + U | 0, U = U + M | 0, M = U & 8191, U = U >>> 13, K += U, i[0] = M, i[1] = K, i[2] = Z, i[3] = ie, i[4] = G, i[5] = ae, i[6] = me, i[7] = Me, i[8] = De, i[9] = Ae;
  }
  finalize() {
    const { h: e, pad: r } = this, s = new Uint16Array(10);
    let n = e[1] >>> 13;
    e[1] &= 8191;
    for (let a = 2; a < 10; a++) e[a] += n, n = e[a] >>> 13, e[a] &= 8191;
    e[0] += n * 5, n = e[0] >>> 13, e[0] &= 8191, e[1] += n, n = e[1] >>> 13, e[1] &= 8191, e[2] += n, s[0] = e[0] + 5, n = s[0] >>> 13, s[0] &= 8191;
    for (let a = 1; a < 10; a++) s[a] = e[a] + n, n = s[a] >>> 13, s[a] &= 8191;
    s[9] -= 8192;
    let i = (n ^ 1) - 1;
    for (let a = 0; a < 10; a++) s[a] &= i;
    i = ~i;
    for (let a = 0; a < 10; a++) e[a] = e[a] & i | s[a];
    e[0] = (e[0] | e[1] << 13) & 65535, e[1] = (e[1] >>> 3 | e[2] << 10) & 65535, e[2] = (e[2] >>> 6 | e[3] << 7) & 65535, e[3] = (e[3] >>> 9 | e[4] << 4) & 65535, e[4] = (e[4] >>> 12 | e[5] << 1 | e[6] << 14) & 65535, e[5] = (e[6] >>> 2 | e[7] << 11) & 65535, e[6] = (e[7] >>> 5 | e[8] << 8) & 65535, e[7] = (e[8] >>> 8 | e[9] << 5) & 65535;
    let o = e[0] + r[0];
    e[0] = o & 65535;
    for (let a = 1; a < 8; a++) o = (e[a] + r[a] | 0) + (o >>> 16) | 0, e[a] = o & 65535;
    Jn(s);
  }
  update(e) {
    Vh(this);
    const { buffer: r, blockLen: s } = this;
    e = ru(e);
    const n = e.length;
    for (let i = 0; i < n; ) {
      const o = Math.min(s - this.pos, n - i);
      if (o === s) {
        for (; s <= n - i; i += s) this.process(e, i);
        continue;
      }
      r.set(e.subarray(i, i + o), this.pos), this.pos += o, i += o, this.pos === s && (this.process(r, 0, !1), this.pos = 0);
    }
    return this;
  }
  destroy() {
    Jn(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(e) {
    Vh(this), JA(e, this), this.finished = !0;
    const { buffer: r, h: s } = this;
    let { pos: n } = this;
    if (n) {
      for (r[n++] = 1; n < 16; n++) r[n] = 0;
      this.process(r, 0, !0);
    }
    this.finalize();
    let i = 0;
    for (let o = 0; o < 8; o++) e[i++] = s[o] >>> 0, e[i++] = s[o] >>> 8;
    return e;
  }
  digest() {
    const { buffer: e, outputLen: r } = this;
    this.digestInto(e);
    const s = e.slice(0, r);
    return this.destroy(), s;
  }
}
function pS(t) {
  const e = (s, n) => t(n).update(ru(s)).digest(), r = t(new Uint8Array(32));
  return e.outputLen = r.outputLen, e.blockLen = r.blockLen, e.create = (s) => t(s), e;
}
const fS = pS((t) => new hS(t));
function gS(t, e, r, s, n, i = 20) {
  let o = t[0], a = t[1], c = t[2], l = t[3], u = e[0], d = e[1], p = e[2], g = e[3], m = e[4], f = e[5], w = e[6], S = e[7], E = n, I = r[0], A = r[1], T = r[2], b = o, N = a, P = c, O = l, x = u, $ = d, F = p, W = g, k = m, v = f, _ = w, D = S, L = E, U = I, M = A, K = T;
  for (let ie = 0; ie < i; ie += 2) b = b + x | 0, L = Ie(L ^ b, 16), k = k + L | 0, x = Ie(x ^ k, 12), b = b + x | 0, L = Ie(L ^ b, 8), k = k + L | 0, x = Ie(x ^ k, 7), N = N + $ | 0, U = Ie(U ^ N, 16), v = v + U | 0, $ = Ie($ ^ v, 12), N = N + $ | 0, U = Ie(U ^ N, 8), v = v + U | 0, $ = Ie($ ^ v, 7), P = P + F | 0, M = Ie(M ^ P, 16), _ = _ + M | 0, F = Ie(F ^ _, 12), P = P + F | 0, M = Ie(M ^ P, 8), _ = _ + M | 0, F = Ie(F ^ _, 7), O = O + W | 0, K = Ie(K ^ O, 16), D = D + K | 0, W = Ie(W ^ D, 12), O = O + W | 0, K = Ie(K ^ O, 8), D = D + K | 0, W = Ie(W ^ D, 7), b = b + $ | 0, K = Ie(K ^ b, 16), _ = _ + K | 0, $ = Ie($ ^ _, 12), b = b + $ | 0, K = Ie(K ^ b, 8), _ = _ + K | 0, $ = Ie($ ^ _, 7), N = N + F | 0, L = Ie(L ^ N, 16), D = D + L | 0, F = Ie(F ^ D, 12), N = N + F | 0, L = Ie(L ^ N, 8), D = D + L | 0, F = Ie(F ^ D, 7), P = P + W | 0, U = Ie(U ^ P, 16), k = k + U | 0, W = Ie(W ^ k, 12), P = P + W | 0, U = Ie(U ^ P, 8), k = k + U | 0, W = Ie(W ^ k, 7), O = O + x | 0, M = Ie(M ^ O, 16), v = v + M | 0, x = Ie(x ^ v, 12), O = O + x | 0, M = Ie(M ^ O, 8), v = v + M | 0, x = Ie(x ^ v, 7);
  let Z = 0;
  s[Z++] = o + b | 0, s[Z++] = a + N | 0, s[Z++] = c + P | 0, s[Z++] = l + O | 0, s[Z++] = u + x | 0, s[Z++] = d + $ | 0, s[Z++] = p + F | 0, s[Z++] = g + W | 0, s[Z++] = m + k | 0, s[Z++] = f + v | 0, s[Z++] = w + _ | 0, s[Z++] = S + D | 0, s[Z++] = E + L | 0, s[Z++] = I + U | 0, s[Z++] = A + M | 0, s[Z++] = T + K | 0;
}
const mS = dS(gS, { counterRight: !1, counterLength: 4, allowShortKeys: !1 }), wS = new Uint8Array(16), Jh = (t, e) => {
  t.update(e);
  const r = e.length % 16;
  r && t.update(wS.subarray(r));
}, yS = new Uint8Array(32);
function Xh(t, e, r, s, n) {
  const i = t(e, r, yS), o = fS.create(i);
  n && Jh(o, n), Jh(o, s);
  const a = new Uint8Array(16), c = XA(a);
  Yh(c, 0, BigInt(n ? n.length : 0), !0), Yh(c, 8, BigInt(s.length), !0), o.update(a);
  const l = o.digest();
  return Jn(i, a), l;
}
const bS = (t) => (e, r, s) => ({ encrypt(n, i) {
  const o = n.length;
  i = Gh(o + 16, i, !1), i.set(n);
  const a = i.subarray(0, -16);
  t(e, r, a, a, 1);
  const c = Xh(t, e, r, a, s);
  return i.set(c, o), Jn(c), i;
}, decrypt(n, i) {
  i = Gh(n.length - 16, i, !1);
  const o = n.subarray(0, -16), a = n.subarray(-16), c = Xh(t, e, r, o, s);
  if (!rS(a, c)) throw new Error("invalid tag");
  return i.set(n.subarray(0, -16)), t(e, r, i, i, 1), Jn(c), i;
} }), Am = sS({ blockSize: 64, nonceLength: 12, tagLength: 16 }, bS(mS));
let Sm = class extends Ku {
  constructor(e, r) {
    super(), this.finished = !1, this.destroyed = !1, Vu(e);
    const s = Zn(r);
    if (this.iHash = e.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const n = this.blockLen, i = new Uint8Array(n);
    i.set(s.length > n ? e.create().update(s).digest() : s);
    for (let o = 0; o < i.length; o++) i[o] ^= 54;
    this.iHash.update(i), this.oHash = e.create();
    for (let o = 0; o < i.length; o++) i[o] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(e) {
    return Yn(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    Yn(this), Xo(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: r, iHash: s, finished: n, destroyed: i, blockLen: o, outputLen: a } = this;
    return e = e, e.finished = n, e.destroyed = i, e.blockLen = o, e.outputLen = a, e.oHash = r._cloneInto(e.oHash), e.iHash = s._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const _c = (t, e, r) => new Sm(t, e).update(r).digest();
_c.create = (t, e) => new Sm(t, e);
function vS(t, e, r) {
  return Vu(t), r === void 0 && (r = new Uint8Array(t.outputLen)), _c(t, Zn(r), Zn(e));
}
const al = new Uint8Array([0]), Qh = new Uint8Array();
function ES(t, e, r, s = 32) {
  if (Vu(t), to(s), s > 255 * t.outputLen) throw new Error("Length should be <= 255*HashLen");
  const n = Math.ceil(s / t.outputLen);
  r === void 0 && (r = Qh);
  const i = new Uint8Array(n * t.outputLen), o = _c.create(t, e), a = o._cloneInto(), c = new Uint8Array(o.outputLen);
  for (let l = 0; l < n; l++) al[0] = l + 1, a.update(l === 0 ? Qh : c).update(r).update(al).digestInto(c), i.set(c, t.outputLen * l), o._cloneInto(a);
  return o.destroy(), a.destroy(), c.fill(0), al.fill(0), i.slice(0, s);
}
const _S = (t, e, r, s, n) => ES(t, vS(t, e, r), s, n);
function CS(t, e, r, s) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, r, s);
  const n = BigInt(32), i = BigInt(4294967295), o = Number(r >> n & i), a = Number(r & i), c = s ? 4 : 0, l = s ? 0 : 4;
  t.setUint32(e + c, o, s), t.setUint32(e + l, a, s);
}
function AS(t, e, r) {
  return t & e ^ ~t & r;
}
function SS(t, e, r) {
  return t & e ^ t & r ^ e & r;
}
let IS = class extends Ku {
  constructor(e, r, s, n) {
    super(), this.blockLen = e, this.outputLen = r, this.padOffset = s, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = il(this.buffer);
  }
  update(e) {
    Yn(this);
    const { view: r, buffer: s, blockLen: n } = this;
    e = Zn(e);
    const i = e.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(n - this.pos, i - o);
      if (a === n) {
        const c = il(e);
        for (; n <= i - o; o += n) this.process(c, o);
        continue;
      }
      s.set(e.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === n && (this.process(r, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    Yn(this), hm(e, this), this.finished = !0;
    const { buffer: r, view: s, blockLen: n, isLE: i } = this;
    let { pos: o } = this;
    r[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > n - o && (this.process(s, 0), o = 0);
    for (let d = o; d < n; d++) r[d] = 0;
    CS(s, n - 8, BigInt(this.length * 8), i), this.process(s, 0);
    const a = il(e), c = this.outputLen;
    if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = c / 4, u = this.get();
    if (l > u.length) throw new Error("_sha2: outputLen bigger than state");
    for (let d = 0; d < l; d++) a.setUint32(4 * d, u[d], i);
  }
  digest() {
    const { buffer: e, outputLen: r } = this;
    this.digestInto(e);
    const s = e.slice(0, r);
    return this.destroy(), s;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: r, buffer: s, length: n, finished: i, destroyed: o, pos: a } = this;
    return e.length = n, e.pos = a, e.finished = i, e.destroyed = o, n % r && e.buffer.set(s), e;
  }
};
const NS = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), gs = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), ms = new Uint32Array(64);
class TS extends IS {
  constructor() {
    super(64, 32, 8, !1), this.A = gs[0] | 0, this.B = gs[1] | 0, this.C = gs[2] | 0, this.D = gs[3] | 0, this.E = gs[4] | 0, this.F = gs[5] | 0, this.G = gs[6] | 0, this.H = gs[7] | 0;
  }
  get() {
    const { A: e, B: r, C: s, D: n, E: i, F: o, G: a, H: c } = this;
    return [e, r, s, n, i, o, a, c];
  }
  set(e, r, s, n, i, o, a, c) {
    this.A = e | 0, this.B = r | 0, this.C = s | 0, this.D = n | 0, this.E = i | 0, this.F = o | 0, this.G = a | 0, this.H = c | 0;
  }
  process(e, r) {
    for (let d = 0; d < 16; d++, r += 4) ms[d] = e.getUint32(r, !1);
    for (let d = 16; d < 64; d++) {
      const p = ms[d - 15], g = ms[d - 2], m = xr(p, 7) ^ xr(p, 18) ^ p >>> 3, f = xr(g, 17) ^ xr(g, 19) ^ g >>> 10;
      ms[d] = f + ms[d - 7] + m + ms[d - 16] | 0;
    }
    let { A: s, B: n, C: i, D: o, E: a, F: c, G: l, H: u } = this;
    for (let d = 0; d < 64; d++) {
      const p = xr(a, 6) ^ xr(a, 11) ^ xr(a, 25), g = u + p + AS(a, c, l) + NS[d] + ms[d] | 0, m = (xr(s, 2) ^ xr(s, 13) ^ xr(s, 22)) + SS(s, n, i) | 0;
      u = l, l = c, c = a, a = o + g | 0, o = i, i = n, n = s, s = g + m | 0;
    }
    s = s + this.A | 0, n = n + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, c = c + this.F | 0, l = l + this.G | 0, u = u + this.H | 0, this.set(s, n, i, o, a, c, l, u);
  }
  roundClean() {
    ms.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Qo = pm(() => new TS());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Cc = BigInt(0), Ac = BigInt(1), OS = BigInt(2);
function nn(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function ea(t) {
  if (!nn(t)) throw new Error("Uint8Array expected");
}
function Xn(t, e) {
  if (typeof e != "boolean") throw new Error(t + " boolean expected, got " + e);
}
const RS = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function Qn(t) {
  ea(t);
  let e = "";
  for (let r = 0; r < t.length; r++) e += RS[t[r]];
  return e;
}
function zn(t) {
  const e = t.toString(16);
  return e.length & 1 ? "0" + e : e;
}
function Yu(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  return t === "" ? Cc : BigInt("0x" + t);
}
const Jr = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function ep(t) {
  if (t >= Jr._0 && t <= Jr._9) return t - Jr._0;
  if (t >= Jr.A && t <= Jr.F) return t - (Jr.A - 10);
  if (t >= Jr.a && t <= Jr.f) return t - (Jr.a - 10);
}
function ei(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  const e = t.length, r = e / 2;
  if (e % 2) throw new Error("hex string expected, got unpadded hex of length " + e);
  const s = new Uint8Array(r);
  for (let n = 0, i = 0; n < r; n++, i += 2) {
    const o = ep(t.charCodeAt(i)), a = ep(t.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const c = t[i] + t[i + 1];
      throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + i);
    }
    s[n] = o * 16 + a;
  }
  return s;
}
function Ys(t) {
  return Yu(Qn(t));
}
function so(t) {
  return ea(t), Yu(Qn(Uint8Array.from(t).reverse()));
}
function ti(t, e) {
  return ei(t.toString(16).padStart(e * 2, "0"));
}
function Sc(t, e) {
  return ti(t, e).reverse();
}
function PS(t) {
  return ei(zn(t));
}
function Qt(t, e, r) {
  let s;
  if (typeof e == "string") try {
    s = ei(e);
  } catch (i) {
    throw new Error(t + " must be hex string or Uint8Array, cause: " + i);
  }
  else if (nn(e)) s = Uint8Array.from(e);
  else throw new Error(t + " must be hex string or Uint8Array");
  const n = s.length;
  if (typeof r == "number" && n !== r) throw new Error(t + " of length " + r + " expected, got " + n);
  return s;
}
function no(...t) {
  let e = 0;
  for (let s = 0; s < t.length; s++) {
    const n = t[s];
    ea(n), e += n.length;
  }
  const r = new Uint8Array(e);
  for (let s = 0, n = 0; s < t.length; s++) {
    const i = t[s];
    r.set(i, n), n += i.length;
  }
  return r;
}
function xS(t, e) {
  if (t.length !== e.length) return !1;
  let r = 0;
  for (let s = 0; s < t.length; s++) r |= t[s] ^ e[s];
  return r === 0;
}
function DS(t) {
  if (typeof t != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
const cl = (t) => typeof t == "bigint" && Cc <= t;
function Ic(t, e, r) {
  return cl(t) && cl(e) && cl(r) && e <= t && t < r;
}
function is(t, e, r, s) {
  if (!Ic(e, r, s)) throw new Error("expected valid " + t + ": " + r + " <= n < " + s + ", got " + e);
}
function Im(t) {
  let e;
  for (e = 0; t > Cc; t >>= Ac, e += 1) ;
  return e;
}
function kS(t, e) {
  return t >> BigInt(e) & Ac;
}
function $S(t, e, r) {
  return t | (r ? Ac : Cc) << BigInt(e);
}
const Zu = (t) => (OS << BigInt(t - 1)) - Ac, ll = (t) => new Uint8Array(t), tp = (t) => Uint8Array.from(t);
function Nm(t, e, r) {
  if (typeof t != "number" || t < 2) throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2) throw new Error("qByteLen must be a number");
  if (typeof r != "function") throw new Error("hmacFn must be a function");
  let s = ll(t), n = ll(t), i = 0;
  const o = () => {
    s.fill(1), n.fill(0), i = 0;
  }, a = (...u) => r(n, s, ...u), c = (u = ll()) => {
    n = a(tp([0]), u), s = a(), u.length !== 0 && (n = a(tp([1]), u), s = a());
  }, l = () => {
    if (i++ >= 1e3) throw new Error("drbg: tried 1000 values");
    let u = 0;
    const d = [];
    for (; u < e; ) {
      s = a();
      const p = s.slice();
      d.push(p), u += s.length;
    }
    return no(...d);
  };
  return (u, d) => {
    o(), c(u);
    let p;
    for (; !(p = d(l())); ) c();
    return o(), p;
  };
}
const US = { bigint: (t) => typeof t == "bigint", function: (t) => typeof t == "function", boolean: (t) => typeof t == "boolean", string: (t) => typeof t == "string", stringOrUint8Array: (t) => typeof t == "string" || nn(t), isSafeInteger: (t) => Number.isSafeInteger(t), array: (t) => Array.isArray(t), field: (t, e) => e.Fp.isValid(t), hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen) };
function mi(t, e, r = {}) {
  const s = (n, i, o) => {
    const a = US[i];
    if (typeof a != "function") throw new Error("invalid validator function");
    const c = t[n];
    if (!(o && c === void 0) && !a(c, t)) throw new Error("param " + String(n) + " is invalid. Expected " + i + ", got " + c);
  };
  for (const [n, i] of Object.entries(e)) s(n, i, !1);
  for (const [n, i] of Object.entries(r)) s(n, i, !0);
  return t;
}
const LS = () => {
  throw new Error("not implemented");
};
function iu(t) {
  const e = /* @__PURE__ */ new WeakMap();
  return (r, ...s) => {
    const n = e.get(r);
    if (n !== void 0) return n;
    const i = t(r, ...s);
    return e.set(r, i), i;
  };
}
var MS = Object.freeze({ __proto__: null, isBytes: nn, abytes: ea, abool: Xn, bytesToHex: Qn, numberToHexUnpadded: zn, hexToNumber: Yu, hexToBytes: ei, bytesToNumberBE: Ys, bytesToNumberLE: so, numberToBytesBE: ti, numberToBytesLE: Sc, numberToVarBytesBE: PS, ensureBytes: Qt, concatBytes: no, equalBytes: xS, utf8ToBytes: DS, inRange: Ic, aInRange: is, bitLen: Im, bitGet: kS, bitSet: $S, bitMask: Zu, createHmacDrbg: Nm, validateObject: mi, notImplemented: LS, memoized: iu });
const pt = BigInt(0), Qe = BigInt(1), qs = BigInt(2), FS = BigInt(3), ou = BigInt(4), rp = BigInt(5), sp = BigInt(8);
function jt(t, e) {
  const r = t % e;
  return r >= pt ? r : e + r;
}
function Tm(t, e, r) {
  if (e < pt) throw new Error("invalid exponent, negatives unsupported");
  if (r <= pt) throw new Error("invalid modulus");
  if (r === Qe) return pt;
  let s = Qe;
  for (; e > pt; ) e & Qe && (s = s * t % r), t = t * t % r, e >>= Qe;
  return s;
}
function _r(t, e, r) {
  let s = t;
  for (; e-- > pt; ) s *= s, s %= r;
  return s;
}
function au(t, e) {
  if (t === pt) throw new Error("invert: expected non-zero number");
  if (e <= pt) throw new Error("invert: expected positive modulus, got " + e);
  let r = jt(t, e), s = e, n = pt, i = Qe;
  for (; r !== pt; ) {
    const o = s / r, a = s % r, c = n - i * o;
    s = r, r = a, n = i, i = c;
  }
  if (s !== Qe) throw new Error("invert: does not exist");
  return jt(n, e);
}
function BS(t) {
  const e = (t - Qe) / qs;
  let r, s, n;
  for (r = t - Qe, s = 0; r % qs === pt; r /= qs, s++) ;
  for (n = qs; n < t && Tm(n, e, t) !== t - Qe; n++) if (n > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (s === 1) {
    const o = (t + Qe) / ou;
    return function(a, c) {
      const l = a.pow(c, o);
      if (!a.eql(a.sqr(l), c)) throw new Error("Cannot find square root");
      return l;
    };
  }
  const i = (r + Qe) / qs;
  return function(o, a) {
    if (o.pow(a, e) === o.neg(o.ONE)) throw new Error("Cannot find square root");
    let c = s, l = o.pow(o.mul(o.ONE, n), r), u = o.pow(a, i), d = o.pow(a, r);
    for (; !o.eql(d, o.ONE); ) {
      if (o.eql(d, o.ZERO)) return o.ZERO;
      let p = 1;
      for (let m = o.sqr(d); p < c && !o.eql(m, o.ONE); p++) m = o.sqr(m);
      const g = o.pow(l, Qe << BigInt(c - p - 1));
      l = o.sqr(g), u = o.mul(u, g), d = o.mul(d, l), c = p;
    }
    return u;
  };
}
function jS(t) {
  if (t % ou === FS) {
    const e = (t + Qe) / ou;
    return function(r, s) {
      const n = r.pow(s, e);
      if (!r.eql(r.sqr(n), s)) throw new Error("Cannot find square root");
      return n;
    };
  }
  if (t % sp === rp) {
    const e = (t - rp) / sp;
    return function(r, s) {
      const n = r.mul(s, qs), i = r.pow(n, e), o = r.mul(s, i), a = r.mul(r.mul(o, qs), i), c = r.mul(o, r.sub(a, r.ONE));
      if (!r.eql(r.sqr(c), s)) throw new Error("Cannot find square root");
      return c;
    };
  }
  return BS(t);
}
const qS = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function zS(t) {
  const e = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, r = qS.reduce((s, n) => (s[n] = "function", s), e);
  return mi(t, r);
}
function WS(t, e, r) {
  if (r < pt) throw new Error("invalid exponent, negatives unsupported");
  if (r === pt) return t.ONE;
  if (r === Qe) return e;
  let s = t.ONE, n = e;
  for (; r > pt; ) r & Qe && (s = t.mul(s, n)), n = t.sqr(n), r >>= Qe;
  return s;
}
function HS(t, e) {
  const r = new Array(e.length), s = e.reduce((i, o, a) => t.is0(o) ? i : (r[a] = i, t.mul(i, o)), t.ONE), n = t.inv(s);
  return e.reduceRight((i, o, a) => t.is0(o) ? i : (r[a] = t.mul(i, r[a]), t.mul(i, o)), n), r;
}
function Om(t, e) {
  const r = e !== void 0 ? e : t.toString(2).length, s = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: s };
}
function Rm(t, e, r = !1, s = {}) {
  if (t <= pt) throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: n, nByteLength: i } = Om(t, e);
  if (i > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let o;
  const a = Object.freeze({ ORDER: t, isLE: r, BITS: n, BYTES: i, MASK: Zu(n), ZERO: pt, ONE: Qe, create: (c) => jt(c, t), isValid: (c) => {
    if (typeof c != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof c);
    return pt <= c && c < t;
  }, is0: (c) => c === pt, isOdd: (c) => (c & Qe) === Qe, neg: (c) => jt(-c, t), eql: (c, l) => c === l, sqr: (c) => jt(c * c, t), add: (c, l) => jt(c + l, t), sub: (c, l) => jt(c - l, t), mul: (c, l) => jt(c * l, t), pow: (c, l) => WS(a, c, l), div: (c, l) => jt(c * au(l, t), t), sqrN: (c) => c * c, addN: (c, l) => c + l, subN: (c, l) => c - l, mulN: (c, l) => c * l, inv: (c) => au(c, t), sqrt: s.sqrt || ((c) => (o || (o = jS(t)), o(a, c))), invertBatch: (c) => HS(a, c), cmov: (c, l, u) => u ? l : c, toBytes: (c) => r ? Sc(c, i) : ti(c, i), fromBytes: (c) => {
    if (c.length !== i) throw new Error("Field.fromBytes: expected " + i + " bytes, got " + c.length);
    return r ? so(c) : Ys(c);
  } });
  return Object.freeze(a);
}
function Pm(t) {
  if (typeof t != "bigint") throw new Error("field order must be bigint");
  const e = t.toString(2).length;
  return Math.ceil(e / 8);
}
function xm(t) {
  const e = Pm(t);
  return e + Math.ceil(e / 2);
}
function VS(t, e, r = !1) {
  const s = t.length, n = Pm(e), i = xm(e);
  if (s < 16 || s < i || s > 1024) throw new Error("expected " + i + "-1024 bytes of input, got " + s);
  const o = r ? so(t) : Ys(t), a = jt(o, e - Qe) + Qe;
  return r ? Sc(a, n) : ti(a, n);
}
const np = BigInt(0), ya = BigInt(1);
function ul(t, e) {
  const r = e.negate();
  return t ? r : e;
}
function Dm(t, e) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e) throw new Error("invalid window size, expected [1.." + e + "], got W=" + t);
}
function dl(t, e) {
  Dm(t, e);
  const r = Math.ceil(e / t) + 1, s = Je(2, t - 1);
  return { windows: r, windowSize: s };
}
function KS(t, e) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((r, s) => {
    if (!(r instanceof e)) throw new Error("invalid point at index " + s);
  });
}
function GS(t, e) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((r, s) => {
    if (!e.isValid(r)) throw new Error("invalid scalar at index " + s);
  });
}
const hl = /* @__PURE__ */ new WeakMap(), km = /* @__PURE__ */ new WeakMap();
function pl(t) {
  return km.get(t) || 1;
}
function YS(t, e) {
  return { constTimeNegate: ul, hasPrecomputes(r) {
    return pl(r) !== 1;
  }, unsafeLadder(r, s, n = t.ZERO) {
    let i = r;
    for (; s > np; ) s & ya && (n = n.add(i)), i = i.double(), s >>= ya;
    return n;
  }, precomputeWindow(r, s) {
    const { windows: n, windowSize: i } = dl(s, e), o = [];
    let a = r, c = a;
    for (let l = 0; l < n; l++) {
      c = a, o.push(c);
      for (let u = 1; u < i; u++) c = c.add(a), o.push(c);
      a = c.double();
    }
    return o;
  }, wNAF(r, s, n) {
    const { windows: i, windowSize: o } = dl(r, e);
    let a = t.ZERO, c = t.BASE;
    const l = BigInt(Je(2, r) - 1), u = Je(2, r), d = BigInt(r);
    for (let p = 0; p < i; p++) {
      const g = p * o;
      let m = Number(n & l);
      n >>= d, m > o && (m -= u, n += ya);
      const f = g, w = g + Math.abs(m) - 1, S = p % 2 !== 0, E = m < 0;
      m === 0 ? c = c.add(ul(S, s[f])) : a = a.add(ul(E, s[w]));
    }
    return { p: a, f: c };
  }, wNAFUnsafe(r, s, n, i = t.ZERO) {
    const { windows: o, windowSize: a } = dl(r, e), c = BigInt(Je(2, r) - 1), l = Je(2, r), u = BigInt(r);
    for (let d = 0; d < o; d++) {
      const p = d * a;
      if (n === np) break;
      let g = Number(n & c);
      if (n >>= u, g > a && (g -= l, n += ya), g === 0) continue;
      let m = s[p + Math.abs(g) - 1];
      g < 0 && (m = m.negate()), i = i.add(m);
    }
    return i;
  }, getPrecomputes(r, s, n) {
    let i = hl.get(s);
    return i || (i = this.precomputeWindow(s, r), r !== 1 && hl.set(s, n(i))), i;
  }, wNAFCached(r, s, n) {
    const i = pl(r);
    return this.wNAF(i, this.getPrecomputes(i, r, n), s);
  }, wNAFCachedUnsafe(r, s, n, i) {
    const o = pl(r);
    return o === 1 ? this.unsafeLadder(r, s, i) : this.wNAFUnsafe(o, this.getPrecomputes(o, r, n), s, i);
  }, setWindowSize(r, s) {
    Dm(s, e), km.set(r, s), hl.delete(r);
  } };
}
function ZS(t, e, r, s) {
  if (KS(r, t), GS(s, e), r.length !== s.length) throw new Error("arrays of points and scalars must have equal length");
  const n = t.ZERO, i = Im(BigInt(r.length)), o = i > 12 ? i - 3 : i > 4 ? i - 2 : i ? 2 : 1, a = (1 << o) - 1, c = new Array(a + 1).fill(n), l = Math.floor((e.BITS - 1) / o) * o;
  let u = n;
  for (let d = l; d >= 0; d -= o) {
    c.fill(n);
    for (let g = 0; g < s.length; g++) {
      const m = s[g], f = Number(m >> BigInt(d) & BigInt(a));
      c[f] = c[f].add(r[g]);
    }
    let p = n;
    for (let g = c.length - 1, m = n; g > 0; g--) m = m.add(c[g]), p = p.add(m);
    if (u = u.add(p), d !== 0) for (let g = 0; g < o; g++) u = u.double();
  }
  return u;
}
function $m(t) {
  return zS(t.Fp), mi(t, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze(B(C(C({}, Om(t.n, t.nBitLength)), t), { p: t.Fp.ORDER }));
}
BigInt(0), BigInt(1), BigInt(2), BigInt(8);
const Cn = BigInt(0), fl = BigInt(1);
function JS(t) {
  return mi(t, { a: "bigint" }, { montgomeryBits: "isSafeInteger", nByteLength: "isSafeInteger", adjustScalarBytes: "function", domain: "function", powPminus2: "function", Gu: "bigint" }), Object.freeze(C({}, t));
}
function XS(t) {
  const e = JS(t), { P: r } = e, s = (E) => jt(E, r), n = e.montgomeryBits, i = Math.ceil(n / 8), o = e.nByteLength, a = e.adjustScalarBytes || ((E) => E), c = e.powPminus2 || ((E) => Tm(E, r - BigInt(2), r));
  function l(E, I, A) {
    const T = s(E * (I - A));
    return I = s(I - T), A = s(A + T), [I, A];
  }
  const u = (e.a - BigInt(2)) / BigInt(4);
  function d(E, I) {
    is("u", E, Cn, r), is("scalar", I, Cn, r);
    const A = I, T = E;
    let b = fl, N = Cn, P = E, O = fl, x = Cn, $;
    for (let W = BigInt(n - 1); W >= Cn; W--) {
      const k = A >> W & fl;
      x ^= k, $ = l(x, b, P), b = $[0], P = $[1], $ = l(x, N, O), N = $[0], O = $[1], x = k;
      const v = b + N, _ = s(v * v), D = b - N, L = s(D * D), U = _ - L, M = P + O, K = P - O, Z = s(K * v), ie = s(M * D), G = Z + ie, ae = Z - ie;
      P = s(G * G), O = s(T * s(ae * ae)), b = s(_ * L), N = s(U * (_ + s(u * U)));
    }
    $ = l(x, b, P), b = $[0], P = $[1], $ = l(x, N, O), N = $[0], O = $[1];
    const F = c(N);
    return s(b * F);
  }
  function p(E) {
    return Sc(s(E), i);
  }
  function g(E) {
    const I = Qt("u coordinate", E, i);
    return o === 32 && (I[31] &= 127), so(I);
  }
  function m(E) {
    const I = Qt("scalar", E), A = I.length;
    if (A !== i && A !== o) {
      let T = "" + i + " or " + o;
      throw new Error("invalid scalar, expected " + T + " bytes, got " + A);
    }
    return so(a(I));
  }
  function f(E, I) {
    const A = g(I), T = m(E), b = d(A, T);
    if (b === Cn) throw new Error("invalid private or public key received");
    return p(b);
  }
  const w = p(e.Gu);
  function S(E) {
    return f(E, w);
  }
  return { scalarMult: f, scalarMultBase: S, getSharedSecret: (E, I) => f(E, I), getPublicKey: (E) => S(E), utils: { randomPrivateKey: () => e.randomBytes(e.nByteLength) }, GuBytes: w };
}
const cu = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
BigInt(0);
const QS = BigInt(1), ip = BigInt(2), eI = BigInt(3), tI = BigInt(5);
BigInt(8);
function rI(t) {
  const e = BigInt(10), r = BigInt(20), s = BigInt(40), n = BigInt(80), i = cu, o = t * t % i * t % i, a = _r(o, ip, i) * o % i, c = _r(a, QS, i) * t % i, l = _r(c, tI, i) * c % i, u = _r(l, e, i) * l % i, d = _r(u, r, i) * u % i, p = _r(d, s, i) * d % i, g = _r(p, n, i) * p % i, m = _r(g, n, i) * p % i, f = _r(m, e, i) * l % i;
  return { pow_p_5_8: _r(f, ip, i) * t % i, b2: o };
}
function sI(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
const lu = XS({ P: cu, a: BigInt(486662), montgomeryBits: 255, nByteLength: 32, Gu: BigInt(9), powPminus2: (t) => {
  const e = cu, { pow_p_5_8: r, b2: s } = rI(t);
  return jt(_r(r, eI, e) * s, e);
}, adjustScalarBytes: sI, randomBytes: gi });
function op(t) {
  t.lowS !== void 0 && Xn("lowS", t.lowS), t.prehash !== void 0 && Xn("prehash", t.prehash);
}
function nI(t) {
  const e = $m(t);
  mi(e, { a: "field", b: "field" }, { allowedPrivateKeyLengths: "array", wrapPrivateKey: "boolean", isTorsionFree: "function", clearCofactor: "function", allowInfinityPoint: "boolean", fromBytes: "function", toBytes: "function" });
  const { endo: r, Fp: s, a: n } = e;
  if (r) {
    if (!s.eql(n, s.ZERO)) throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof r != "object" || typeof r.beta != "bigint" || typeof r.splitScalar != "function") throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze(C({}, e));
}
const { bytesToNumberBE: iI, hexToBytes: oI } = MS;
class aI extends Error {
  constructor(e = "") {
    super(e);
  }
}
const ts = { Err: aI, _tlv: { encode: (t, e) => {
  const { Err: r } = ts;
  if (t < 0 || t > 256) throw new r("tlv.encode: wrong tag");
  if (e.length & 1) throw new r("tlv.encode: unpadded data");
  const s = e.length / 2, n = zn(s);
  if (n.length / 2 & 128) throw new r("tlv.encode: long form length too big");
  const i = s > 127 ? zn(n.length / 2 | 128) : "";
  return zn(t) + i + n + e;
}, decode(t, e) {
  const { Err: r } = ts;
  let s = 0;
  if (t < 0 || t > 256) throw new r("tlv.encode: wrong tag");
  if (e.length < 2 || e[s++] !== t) throw new r("tlv.decode: wrong tlv");
  const n = e[s++], i = !!(n & 128);
  let o = 0;
  if (!i) o = n;
  else {
    const c = n & 127;
    if (!c) throw new r("tlv.decode(long): indefinite length not supported");
    if (c > 4) throw new r("tlv.decode(long): byte length is too big");
    const l = e.subarray(s, s + c);
    if (l.length !== c) throw new r("tlv.decode: length bytes not complete");
    if (l[0] === 0) throw new r("tlv.decode(long): zero leftmost byte");
    for (const u of l) o = o << 8 | u;
    if (s += c, o < 128) throw new r("tlv.decode(long): not minimal encoding");
  }
  const a = e.subarray(s, s + o);
  if (a.length !== o) throw new r("tlv.decode: wrong value length");
  return { v: a, l: e.subarray(s + o) };
} }, _int: { encode(t) {
  const { Err: e } = ts;
  if (t < ss) throw new e("integer: negative integers are not allowed");
  let r = zn(t);
  if (Number.parseInt(r[0], 16) & 8 && (r = "00" + r), r.length & 1) throw new e("unexpected DER parsing assertion: unpadded hex");
  return r;
}, decode(t) {
  const { Err: e } = ts;
  if (t[0] & 128) throw new e("invalid signature integer: negative");
  if (t[0] === 0 && !(t[1] & 128)) throw new e("invalid signature integer: unnecessary leading zero");
  return iI(t);
} }, toSig(t) {
  const { Err: e, _int: r, _tlv: s } = ts, n = typeof t == "string" ? oI(t) : t;
  ea(n);
  const { v: i, l: o } = s.decode(48, n);
  if (o.length) throw new e("invalid signature: left bytes after parsing");
  const { v: a, l: c } = s.decode(2, i), { v: l, l: u } = s.decode(2, c);
  if (u.length) throw new e("invalid signature: left bytes after parsing");
  return { r: r.decode(a), s: r.decode(l) };
}, hexFromSig(t) {
  const { _tlv: e, _int: r } = ts, s = e.encode(2, r.encode(t.r)), n = e.encode(2, r.encode(t.s)), i = s + n;
  return e.encode(48, i);
} }, ss = BigInt(0), lt = BigInt(1);
BigInt(2);
const ap = BigInt(3);
BigInt(4);
function cI(t) {
  const e = nI(t), { Fp: r } = e, s = Rm(e.n, e.nBitLength), n = e.toBytes || ((f, w, S) => {
    const E = w.toAffine();
    return no(Uint8Array.from([4]), r.toBytes(E.x), r.toBytes(E.y));
  }), i = e.fromBytes || ((f) => {
    const w = f.subarray(1), S = r.fromBytes(w.subarray(0, r.BYTES)), E = r.fromBytes(w.subarray(r.BYTES, 2 * r.BYTES));
    return { x: S, y: E };
  });
  function o(f) {
    const { a: w, b: S } = e, E = r.sqr(f), I = r.mul(E, f);
    return r.add(r.add(I, r.mul(f, w)), S);
  }
  if (!r.eql(r.sqr(e.Gy), o(e.Gx))) throw new Error("bad generator point: equation left != right");
  function a(f) {
    return Ic(f, lt, e.n);
  }
  function c(f) {
    const { allowedPrivateKeyLengths: w, nByteLength: S, wrapPrivateKey: E, n: I } = e;
    if (w && typeof f != "bigint") {
      if (nn(f) && (f = Qn(f)), typeof f != "string" || !w.includes(f.length)) throw new Error("invalid private key");
      f = f.padStart(S * 2, "0");
    }
    let A;
    try {
      A = typeof f == "bigint" ? f : Ys(Qt("private key", f, S));
    } catch (T) {
      throw new Error("invalid private key, expected hex or " + S + " bytes, got " + typeof f);
    }
    return E && (A = jt(A, I)), is("private key", A, lt, I), A;
  }
  function l(f) {
    if (!(f instanceof p)) throw new Error("ProjectivePoint expected");
  }
  const u = iu((f, w) => {
    const { px: S, py: E, pz: I } = f;
    if (r.eql(I, r.ONE)) return { x: S, y: E };
    const A = f.is0();
    w == null && (w = A ? r.ONE : r.inv(I));
    const T = r.mul(S, w), b = r.mul(E, w), N = r.mul(I, w);
    if (A) return { x: r.ZERO, y: r.ZERO };
    if (!r.eql(N, r.ONE)) throw new Error("invZ was invalid");
    return { x: T, y: b };
  }), d = iu((f) => {
    if (f.is0()) {
      if (e.allowInfinityPoint && !r.is0(f.py)) return;
      throw new Error("bad point: ZERO");
    }
    const { x: w, y: S } = f.toAffine();
    if (!r.isValid(w) || !r.isValid(S)) throw new Error("bad point: x or y not FE");
    const E = r.sqr(S), I = o(w);
    if (!r.eql(E, I)) throw new Error("bad point: equation left != right");
    if (!f.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class p {
    constructor(w, S, E) {
      if (this.px = w, this.py = S, this.pz = E, w == null || !r.isValid(w)) throw new Error("x required");
      if (S == null || !r.isValid(S)) throw new Error("y required");
      if (E == null || !r.isValid(E)) throw new Error("z required");
      Object.freeze(this);
    }
    static fromAffine(w) {
      const { x: S, y: E } = w || {};
      if (!w || !r.isValid(S) || !r.isValid(E)) throw new Error("invalid affine point");
      if (w instanceof p) throw new Error("projective point not allowed");
      const I = (A) => r.eql(A, r.ZERO);
      return I(S) && I(E) ? p.ZERO : new p(S, E, r.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(w) {
      const S = r.invertBatch(w.map((E) => E.pz));
      return w.map((E, I) => E.toAffine(S[I])).map(p.fromAffine);
    }
    static fromHex(w) {
      const S = p.fromAffine(i(Qt("pointHex", w)));
      return S.assertValidity(), S;
    }
    static fromPrivateKey(w) {
      return p.BASE.multiply(c(w));
    }
    static msm(w, S) {
      return ZS(p, s, w, S);
    }
    _setWindowSize(w) {
      m.setWindowSize(this, w);
    }
    assertValidity() {
      d(this);
    }
    hasEvenY() {
      const { y: w } = this.toAffine();
      if (r.isOdd) return !r.isOdd(w);
      throw new Error("Field doesn't support isOdd");
    }
    equals(w) {
      l(w);
      const { px: S, py: E, pz: I } = this, { px: A, py: T, pz: b } = w, N = r.eql(r.mul(S, b), r.mul(A, I)), P = r.eql(r.mul(E, b), r.mul(T, I));
      return N && P;
    }
    negate() {
      return new p(this.px, r.neg(this.py), this.pz);
    }
    double() {
      const { a: w, b: S } = e, E = r.mul(S, ap), { px: I, py: A, pz: T } = this;
      let b = r.ZERO, N = r.ZERO, P = r.ZERO, O = r.mul(I, I), x = r.mul(A, A), $ = r.mul(T, T), F = r.mul(I, A);
      return F = r.add(F, F), P = r.mul(I, T), P = r.add(P, P), b = r.mul(w, P), N = r.mul(E, $), N = r.add(b, N), b = r.sub(x, N), N = r.add(x, N), N = r.mul(b, N), b = r.mul(F, b), P = r.mul(E, P), $ = r.mul(w, $), F = r.sub(O, $), F = r.mul(w, F), F = r.add(F, P), P = r.add(O, O), O = r.add(P, O), O = r.add(O, $), O = r.mul(O, F), N = r.add(N, O), $ = r.mul(A, T), $ = r.add($, $), O = r.mul($, F), b = r.sub(b, O), P = r.mul($, x), P = r.add(P, P), P = r.add(P, P), new p(b, N, P);
    }
    add(w) {
      l(w);
      const { px: S, py: E, pz: I } = this, { px: A, py: T, pz: b } = w;
      let N = r.ZERO, P = r.ZERO, O = r.ZERO;
      const x = e.a, $ = r.mul(e.b, ap);
      let F = r.mul(S, A), W = r.mul(E, T), k = r.mul(I, b), v = r.add(S, E), _ = r.add(A, T);
      v = r.mul(v, _), _ = r.add(F, W), v = r.sub(v, _), _ = r.add(S, I);
      let D = r.add(A, b);
      return _ = r.mul(_, D), D = r.add(F, k), _ = r.sub(_, D), D = r.add(E, I), N = r.add(T, b), D = r.mul(D, N), N = r.add(W, k), D = r.sub(D, N), O = r.mul(x, _), N = r.mul($, k), O = r.add(N, O), N = r.sub(W, O), O = r.add(W, O), P = r.mul(N, O), W = r.add(F, F), W = r.add(W, F), k = r.mul(x, k), _ = r.mul($, _), W = r.add(W, k), k = r.sub(F, k), k = r.mul(x, k), _ = r.add(_, k), F = r.mul(W, _), P = r.add(P, F), F = r.mul(D, _), N = r.mul(v, N), N = r.sub(N, F), F = r.mul(v, W), O = r.mul(D, O), O = r.add(O, F), new p(N, P, O);
    }
    subtract(w) {
      return this.add(w.negate());
    }
    is0() {
      return this.equals(p.ZERO);
    }
    wNAF(w) {
      return m.wNAFCached(this, w, p.normalizeZ);
    }
    multiplyUnsafe(w) {
      const { endo: S, n: E } = e;
      is("scalar", w, ss, E);
      const I = p.ZERO;
      if (w === ss) return I;
      if (this.is0() || w === lt) return this;
      if (!S || m.hasPrecomputes(this)) return m.wNAFCachedUnsafe(this, w, p.normalizeZ);
      let { k1neg: A, k1: T, k2neg: b, k2: N } = S.splitScalar(w), P = I, O = I, x = this;
      for (; T > ss || N > ss; ) T & lt && (P = P.add(x)), N & lt && (O = O.add(x)), x = x.double(), T >>= lt, N >>= lt;
      return A && (P = P.negate()), b && (O = O.negate()), O = new p(r.mul(O.px, S.beta), O.py, O.pz), P.add(O);
    }
    multiply(w) {
      const { endo: S, n: E } = e;
      is("scalar", w, lt, E);
      let I, A;
      if (S) {
        const { k1neg: T, k1: b, k2neg: N, k2: P } = S.splitScalar(w);
        let { p: O, f: x } = this.wNAF(b), { p: $, f: F } = this.wNAF(P);
        O = m.constTimeNegate(T, O), $ = m.constTimeNegate(N, $), $ = new p(r.mul($.px, S.beta), $.py, $.pz), I = O.add($), A = x.add(F);
      } else {
        const { p: T, f: b } = this.wNAF(w);
        I = T, A = b;
      }
      return p.normalizeZ([I, A])[0];
    }
    multiplyAndAddUnsafe(w, S, E) {
      const I = p.BASE, A = (b, N) => N === ss || N === lt || !b.equals(I) ? b.multiplyUnsafe(N) : b.multiply(N), T = A(this, S).add(A(w, E));
      return T.is0() ? void 0 : T;
    }
    toAffine(w) {
      return u(this, w);
    }
    isTorsionFree() {
      const { h: w, isTorsionFree: S } = e;
      if (w === lt) return !0;
      if (S) return S(p, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: w, clearCofactor: S } = e;
      return w === lt ? this : S ? S(p, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(w = !0) {
      return Xn("isCompressed", w), this.assertValidity(), n(p, this, w);
    }
    toHex(w = !0) {
      return Xn("isCompressed", w), Qn(this.toRawBytes(w));
    }
  }
  p.BASE = new p(e.Gx, e.Gy, r.ONE), p.ZERO = new p(r.ZERO, r.ONE, r.ZERO);
  const g = e.nBitLength, m = YS(p, e.endo ? Math.ceil(g / 2) : g);
  return { CURVE: e, ProjectivePoint: p, normPrivateKeyToScalar: c, weierstrassEquation: o, isWithinCurveOrder: a };
}
function lI(t) {
  const e = $m(t);
  return mi(e, { hash: "hash", hmac: "function", randomBytes: "function" }, { bits2int: "function", bits2int_modN: "function", lowS: "boolean" }), Object.freeze(C({ lowS: !0 }, e));
}
function uI(t) {
  const e = lI(t), { Fp: r, n: s } = e, n = r.BYTES + 1, i = 2 * r.BYTES + 1;
  function o(k) {
    return jt(k, s);
  }
  function a(k) {
    return au(k, s);
  }
  const { ProjectivePoint: c, normPrivateKeyToScalar: l, weierstrassEquation: u, isWithinCurveOrder: d } = cI(B(C({}, e), { toBytes(k, v, _) {
    const D = v.toAffine(), L = r.toBytes(D.x), U = no;
    return Xn("isCompressed", _), _ ? U(Uint8Array.from([v.hasEvenY() ? 2 : 3]), L) : U(Uint8Array.from([4]), L, r.toBytes(D.y));
  }, fromBytes(k) {
    const v = k.length, _ = k[0], D = k.subarray(1);
    if (v === n && (_ === 2 || _ === 3)) {
      const L = Ys(D);
      if (!Ic(L, lt, r.ORDER)) throw new Error("Point is not on curve");
      const U = u(L);
      let M;
      try {
        M = r.sqrt(U);
      } catch (Z) {
        const ie = Z instanceof Error ? ": " + Z.message : "";
        throw new Error("Point is not on curve" + ie);
      }
      const K = (M & lt) === lt;
      return (_ & 1) === 1 !== K && (M = r.neg(M)), { x: L, y: M };
    } else if (v === i && _ === 4) {
      const L = r.fromBytes(D.subarray(0, r.BYTES)), U = r.fromBytes(D.subarray(r.BYTES, 2 * r.BYTES));
      return { x: L, y: U };
    } else {
      const L = n, U = i;
      throw new Error("invalid Point, expected length of " + L + ", or uncompressed " + U + ", got " + v);
    }
  } })), p = (k) => Qn(ti(k, e.nByteLength));
  function g(k) {
    const v = s >> lt;
    return k > v;
  }
  function m(k) {
    return g(k) ? o(-k) : k;
  }
  const f = (k, v, _) => Ys(k.slice(v, _));
  class w {
    constructor(v, _, D) {
      this.r = v, this.s = _, this.recovery = D, this.assertValidity();
    }
    static fromCompact(v) {
      const _ = e.nByteLength;
      return v = Qt("compactSignature", v, _ * 2), new w(f(v, 0, _), f(v, _, 2 * _));
    }
    static fromDER(v) {
      const { r: _, s: D } = ts.toSig(Qt("DER", v));
      return new w(_, D);
    }
    assertValidity() {
      is("r", this.r, lt, s), is("s", this.s, lt, s);
    }
    addRecoveryBit(v) {
      return new w(this.r, this.s, v);
    }
    recoverPublicKey(v) {
      const { r: _, s: D, recovery: L } = this, U = b(Qt("msgHash", v));
      if (L == null || ![0, 1, 2, 3].includes(L)) throw new Error("recovery id invalid");
      const M = L === 2 || L === 3 ? _ + e.n : _;
      if (M >= r.ORDER) throw new Error("recovery id 2 or 3 invalid");
      const K = (L & 1) === 0 ? "02" : "03", Z = c.fromHex(K + p(M)), ie = a(M), G = o(-U * ie), ae = o(D * ie), me = c.BASE.multiplyAndAddUnsafe(Z, G, ae);
      if (!me) throw new Error("point at infinify");
      return me.assertValidity(), me;
    }
    hasHighS() {
      return g(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new w(this.r, o(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return ei(this.toDERHex());
    }
    toDERHex() {
      return ts.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return ei(this.toCompactHex());
    }
    toCompactHex() {
      return p(this.r) + p(this.s);
    }
  }
  const S = { isValidPrivateKey(k) {
    try {
      return l(k), !0;
    } catch (v) {
      return !1;
    }
  }, normPrivateKeyToScalar: l, randomPrivateKey: () => {
    const k = xm(e.n);
    return VS(e.randomBytes(k), e.n);
  }, precompute(k = 8, v = c.BASE) {
    return v._setWindowSize(k), v.multiply(BigInt(3)), v;
  } };
  function E(k, v = !0) {
    return c.fromPrivateKey(k).toRawBytes(v);
  }
  function I(k) {
    const v = nn(k), _ = typeof k == "string", D = (v || _) && k.length;
    return v ? D === n || D === i : _ ? D === 2 * n || D === 2 * i : k instanceof c;
  }
  function A(k, v, _ = !0) {
    if (I(k)) throw new Error("first arg must be private key");
    if (!I(v)) throw new Error("second arg must be public key");
    return c.fromHex(v).multiply(l(k)).toRawBytes(_);
  }
  const T = e.bits2int || function(k) {
    if (k.length > 8192) throw new Error("input is too large");
    const v = Ys(k), _ = k.length * 8 - e.nBitLength;
    return _ > 0 ? v >> BigInt(_) : v;
  }, b = e.bits2int_modN || function(k) {
    return o(T(k));
  }, N = Zu(e.nBitLength);
  function P(k) {
    return is("num < 2^" + e.nBitLength, k, ss, N), ti(k, e.nByteLength);
  }
  function O(k, v, _ = x) {
    if (["recovered", "canonical"].some((De) => De in _)) throw new Error("sign() legacy options not supported");
    const { hash: D, randomBytes: L } = e;
    let { lowS: U, prehash: M, extraEntropy: K } = _;
    U == null && (U = !0), k = Qt("msgHash", k), op(_), M && (k = Qt("prehashed msgHash", D(k)));
    const Z = b(k), ie = l(v), G = [P(ie), P(Z)];
    if (K != null && K !== !1) {
      const De = K === !0 ? L(r.BYTES) : K;
      G.push(Qt("extraEntropy", De));
    }
    const ae = no(...G), me = Z;
    function Me(De) {
      const Ae = T(De);
      if (!d(Ae)) return;
      const St = a(Ae), ft = c.BASE.multiply(Ae).toAffine(), Rt = o(ft.x);
      if (Rt === ss) return;
      const or = o(St * o(me + Rt * ie));
      if (or === ss) return;
      let Kt = (ft.x === Rt ? 0 : 2) | Number(ft.y & lt), yn = or;
      return U && g(or) && (yn = m(or), Kt ^= 1), new w(Rt, yn, Kt);
    }
    return { seed: ae, k2sig: Me };
  }
  const x = { lowS: e.lowS, prehash: !1 }, $ = { lowS: e.lowS, prehash: !1 };
  function F(k, v, _ = x) {
    const { seed: D, k2sig: L } = O(k, v, _), U = e;
    return Nm(U.hash.outputLen, U.nByteLength, U.hmac)(D, L);
  }
  c.BASE._setWindowSize(8);
  function W(k, v, _, D = $) {
    var or;
    const L = k;
    v = Qt("msgHash", v), _ = Qt("publicKey", _);
    const { lowS: U, prehash: M, format: K } = D;
    if (op(D), "strict" in D) throw new Error("options.strict was renamed to lowS");
    if (K !== void 0 && K !== "compact" && K !== "der") throw new Error("format must be compact or der");
    const Z = typeof L == "string" || nn(L), ie = !Z && !K && typeof L == "object" && L !== null && typeof L.r == "bigint" && typeof L.s == "bigint";
    if (!Z && !ie) throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let G, ae;
    try {
      if (ie && (G = new w(L.r, L.s)), Z) {
        try {
          K !== "compact" && (G = w.fromDER(L));
        } catch (Kt) {
          if (!(Kt instanceof ts.Err)) throw Kt;
        }
        !G && K !== "der" && (G = w.fromCompact(L));
      }
      ae = c.fromHex(_);
    } catch (Kt) {
      return !1;
    }
    if (!G || U && G.hasHighS()) return !1;
    M && (v = e.hash(v));
    const { r: me, s: Me } = G, De = b(v), Ae = a(Me), St = o(De * Ae), ft = o(me * Ae), Rt = (or = c.BASE.multiplyAndAddUnsafe(ae, St, ft)) == null ? void 0 : or.toAffine();
    return Rt ? o(Rt.x) === me : !1;
  }
  return { CURVE: e, getPublicKey: E, getSharedSecret: A, sign: F, verify: W, ProjectivePoint: c, Signature: w, utils: S };
}
function dI(t) {
  return { hash: t, hmac: (e, ...r) => _c(t, e, gA(...r)), randomBytes: gi };
}
function hI(t, e) {
  const r = (s) => uI(C(C({}, t), dI(s)));
  return B(C({}, r(e)), { create: r });
}
const Um = Rm(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), pI = Um.create(BigInt("-3")), fI = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), gI = hI({ a: pI, b: fI, Fp: Um, n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"), Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"), Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"), h: BigInt(1), lowS: !1 }, Qo), Lm = "base10", xt = "base16", Sr = "base64pad", bs = "base64url", ta = "utf8", Mm = 0, os = 1, ra = 2, mI = 0, cp = 1, qi = 12, Ju = 32;
function wI() {
  const t = lu.utils.randomPrivateKey(), e = lu.getPublicKey(t);
  return { privateKey: zt(t, xt), publicKey: zt(e, xt) };
}
function uu() {
  const t = gi(Ju);
  return zt(t, xt);
}
function yI(t, e) {
  const r = lu.getSharedSecret(fr(t, xt), fr(e, xt)), s = _S(Qo, r, void 0, void 0, Ju);
  return zt(s, xt);
}
function La(t) {
  const e = Qo(fr(t, xt));
  return zt(e, xt);
}
function Fr(t) {
  const e = Qo(fr(t, ta));
  return zt(e, xt);
}
function Fm(t) {
  return fr(`${t}`, Lm);
}
function on(t) {
  return Number(zt(t, Lm));
}
function Bm(t) {
  return t.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function jm(t) {
  const e = t.replace(/-/g, "+").replace(/_/g, "/"), r = (4 - e.length % 4) % 4;
  return e + "=".repeat(r);
}
function bI(t) {
  const e = Fm(typeof t.type < "u" ? t.type : Mm);
  if (on(e) === os && typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const r = typeof t.senderPublicKey < "u" ? fr(t.senderPublicKey, xt) : void 0, s = typeof t.iv < "u" ? fr(t.iv, xt) : gi(qi), n = fr(t.symKey, xt), i = Am(n, s).encrypt(fr(t.message, ta)), o = qm({ type: e, sealed: i, iv: s, senderPublicKey: r });
  return t.encoding === bs ? Bm(o) : o;
}
function vI(t) {
  const e = fr(t.symKey, xt), { sealed: r, iv: s } = io({ encoded: t.encoded, encoding: t.encoding }), n = Am(e, s).decrypt(r);
  if (n === null) throw new Error("Failed to decrypt");
  return zt(n, ta);
}
function EI(t, e) {
  const r = Fm(ra), s = gi(qi), n = fr(t, ta), i = qm({ type: r, sealed: n, iv: s });
  return e === bs ? Bm(i) : i;
}
function _I(t, e) {
  const { sealed: r } = io({ encoded: t, encoding: e });
  return zt(r, ta);
}
function qm(t) {
  if (on(t.type) === ra) return zt(ji([t.type, t.sealed]), Sr);
  if (on(t.type) === os) {
    if (typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return zt(ji([t.type, t.senderPublicKey, t.iv, t.sealed]), Sr);
  }
  return zt(ji([t.type, t.iv, t.sealed]), Sr);
}
function io(t) {
  const e = (t.encoding || Sr) === bs ? jm(t.encoded) : t.encoded, r = fr(e, Sr), s = r.slice(mI, cp), n = cp;
  if (on(s) === os) {
    const c = n + Ju, l = c + qi, u = r.slice(n, c), d = r.slice(c, l), p = r.slice(l);
    return { type: s, sealed: p, iv: d, senderPublicKey: u };
  }
  if (on(s) === ra) {
    const c = r.slice(n), l = gi(qi);
    return { type: s, sealed: c, iv: l };
  }
  const i = n + qi, o = r.slice(n, i), a = r.slice(i);
  return { type: s, sealed: a, iv: o };
}
function CI(t, e) {
  const r = io({ encoded: t, encoding: e == null ? void 0 : e.encoding });
  return zm({ type: on(r.type), senderPublicKey: typeof r.senderPublicKey < "u" ? zt(r.senderPublicKey, xt) : void 0, receiverPublicKey: e == null ? void 0 : e.receiverPublicKey });
}
function zm(t) {
  const e = (t == null ? void 0 : t.type) || Mm;
  if (e === os) {
    if (typeof (t == null ? void 0 : t.senderPublicKey) > "u") throw new Error("missing sender public key");
    if (typeof (t == null ? void 0 : t.receiverPublicKey) > "u") throw new Error("missing receiver public key");
  }
  return { type: e, senderPublicKey: t == null ? void 0 : t.senderPublicKey, receiverPublicKey: t == null ? void 0 : t.receiverPublicKey };
}
function lp(t) {
  return t.type === os && typeof t.senderPublicKey == "string" && typeof t.receiverPublicKey == "string";
}
function up(t) {
  return t.type === ra;
}
function AI(t) {
  const e = Buffer.from(t.x, "base64"), r = Buffer.from(t.y, "base64");
  return ji([new Uint8Array([4]), e, r]);
}
function SI(t, e) {
  const [r, s, n] = t.split("."), i = Buffer.from(jm(n), "base64");
  if (i.length !== 64) throw new Error("Invalid signature length");
  const o = i.slice(0, 32), a = i.slice(32, 64), c = `${r}.${s}`, l = Qo(c), u = AI(e);
  if (!gI.verify(ji([o, a]), l, u)) throw new Error("Invalid signature");
  return Yl(t).payload;
}
const II = "irn";
function Qa(t) {
  return (t == null ? void 0 : t.relay) || { protocol: II };
}
function Li(t) {
  const e = x1[t];
  if (typeof e > "u") throw new Error(`Relay Protocol not supported: ${t}`);
  return e;
}
function NI(t, e = "-") {
  const r = {}, s = "relay" + e;
  return Object.keys(t).forEach((n) => {
    if (n.startsWith(s)) {
      const i = n.replace(s, ""), o = t[n];
      r[i] = o;
    }
  }), r;
}
function dp(t) {
  if (!t.includes("wc:")) {
    const l = dm(t);
    l != null && l.includes("wc:") && (t = l);
  }
  t = t.includes("wc://") ? t.replace("wc://", "") : t, t = t.includes("wc:") ? t.replace("wc:", "") : t;
  const e = t.indexOf(":"), r = t.indexOf("?") !== -1 ? t.indexOf("?") : void 0, s = t.substring(0, e), n = t.substring(e + 1, r).split("@"), i = typeof r < "u" ? t.substring(r) : "", o = new URLSearchParams(i), a = {};
  o.forEach((l, u) => {
    a[u] = l;
  });
  const c = typeof a.methods == "string" ? a.methods.split(",") : void 0;
  return { protocol: s, topic: TI(n[0]), version: parseInt(n[1], 10), symKey: a.symKey, relay: NI(a), methods: c, expiryTimestamp: a.expiryTimestamp ? parseInt(a.expiryTimestamp, 10) : void 0 };
}
function TI(t) {
  return t.startsWith("//") ? t.substring(2) : t;
}
function OI(t, e = "-") {
  const r = "relay", s = {};
  return Object.keys(t).forEach((n) => {
    const i = n, o = r + e + i;
    t[i] && (s[o] = t[i]);
  }), s;
}
function hp(t) {
  const e = new URLSearchParams(), r = OI(t.relay);
  Object.keys(r).sort().forEach((n) => {
    e.set(n, r[n]);
  }), e.set("symKey", t.symKey), t.expiryTimestamp && e.set("expiryTimestamp", t.expiryTimestamp.toString()), t.methods && e.set("methods", t.methods.join(","));
  const s = e.toString();
  return `${t.protocol}:${t.topic}@${t.version}?${s}`;
}
function ba(t, e, r) {
  return `${t}?wc_ev=${r}&topic=${e}`;
}
function wi(t) {
  const e = [];
  return t.forEach((r) => {
    const [s, n] = r.split(":");
    e.push(`${s}:${n}`);
  }), e;
}
function RI(t) {
  const e = [];
  return Object.values(t).forEach((r) => {
    e.push(...wi(r.accounts));
  }), e;
}
function PI(t, e) {
  const r = [];
  return Object.values(t).forEach((s) => {
    wi(s.accounts).includes(e) && r.push(...s.methods);
  }), r;
}
function xI(t, e) {
  const r = [];
  return Object.values(t).forEach((s) => {
    wi(s.accounts).includes(e) && r.push(...s.events);
  }), r;
}
function Xu(t) {
  return t.includes(":");
}
function Mi(t) {
  return Xu(t) ? t.split(":")[0] : t;
}
function DI(t) {
  const e = {};
  return t == null || t.forEach((r) => {
    var s;
    const [n, i] = r.split(":");
    e[n] || (e[n] = { accounts: [], chains: [], events: [], methods: [] }), e[n].accounts.push(r), (s = e[n].chains) == null || s.push(`${n}:${i}`);
  }), e;
}
function pp(t, e) {
  e = e.map((s) => s.replace("did:pkh:", ""));
  const r = DI(e);
  for (const [s, n] of Object.entries(r)) n.methods ? n.methods = $a(n.methods, t) : n.methods = t, n.events = ["chainChanged", "accountsChanged"];
  return r;
}
const kI = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, $I = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function V(t, e) {
  const { message: r, code: s } = $I[t];
  return { message: e ? `${r} ${e}` : r, code: s };
}
function Le(t, e) {
  const { message: r, code: s } = kI[t];
  return { message: e ? `${r} ${e}` : r, code: s };
}
function Ss(t, e) {
  return !!Array.isArray(t);
}
function oo(t) {
  return Object.getPrototypeOf(t) === Object.prototype && Object.keys(t).length;
}
function bt(t) {
  return typeof t > "u";
}
function rt(t, e) {
  return e && bt(t) ? !0 : typeof t == "string" && !!t.trim().length;
}
function Qu(t, e) {
  return e && bt(t) ? !0 : typeof t == "number" && !isNaN(t);
}
function UI(t, e) {
  const { requiredNamespaces: r } = e, s = Object.keys(t.namespaces), n = Object.keys(r);
  let i = !0;
  return Hs(n, s) ? (s.forEach((o) => {
    const { accounts: a, methods: c, events: l } = t.namespaces[o], u = wi(a), d = r[o];
    (!Hs(om(o, d), u) || !Hs(d.methods, c) || !Hs(d.events, l)) && (i = !1);
  }), i) : !1;
}
function ec(t) {
  return rt(t, !1) && t.includes(":") ? t.split(":").length === 2 : !1;
}
function LI(t) {
  if (rt(t, !1) && t.includes(":")) {
    const e = t.split(":");
    if (e.length === 3) {
      const r = e[0] + ":" + e[1];
      return !!e[2] && ec(r);
    }
  }
  return !1;
}
function MI(t) {
  function e(r) {
    try {
      return typeof new URL(r) < "u";
    } catch (s) {
      return !1;
    }
  }
  try {
    if (rt(t, !1)) {
      if (e(t)) return !0;
      const r = dm(t);
      return e(r);
    }
  } catch (r) {
  }
  return !1;
}
function FI(t) {
  var e;
  return (e = t == null ? void 0 : t.proposer) == null ? void 0 : e.publicKey;
}
function BI(t) {
  return t == null ? void 0 : t.topic;
}
function jI(t, e) {
  let r = null;
  return rt(t == null ? void 0 : t.publicKey, !1) || (r = V("MISSING_OR_INVALID", `${e} controller public key should be a string`)), r;
}
function fp(t) {
  let e = !0;
  return Ss(t) ? t.length && (e = t.every((r) => rt(r, !1))) : e = !1, e;
}
function qI(t, e, r) {
  let s = null;
  return Ss(e) && e.length ? e.forEach((n) => {
    s || ec(n) || (s = Le("UNSUPPORTED_CHAINS", `${r}, chain ${n} should be a string and conform to "namespace:chainId" format`));
  }) : ec(t) || (s = Le("UNSUPPORTED_CHAINS", `${r}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), s;
}
function zI(t, e, r) {
  let s = null;
  return Object.entries(t).forEach(([n, i]) => {
    if (s) return;
    const o = qI(n, om(n, i), `${e} ${r}`);
    o && (s = o);
  }), s;
}
function WI(t, e) {
  let r = null;
  return Ss(t) ? t.forEach((s) => {
    r || LI(s) || (r = Le("UNSUPPORTED_ACCOUNTS", `${e}, account ${s} should be a string and conform to "namespace:chainId:address" format`));
  }) : r = Le("UNSUPPORTED_ACCOUNTS", `${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), r;
}
function HI(t, e) {
  let r = null;
  return Object.values(t).forEach((s) => {
    if (r) return;
    const n = WI(s == null ? void 0 : s.accounts, `${e} namespace`);
    n && (r = n);
  }), r;
}
function VI(t, e) {
  let r = null;
  return fp(t == null ? void 0 : t.methods) ? fp(t == null ? void 0 : t.events) || (r = Le("UNSUPPORTED_EVENTS", `${e}, events should be an array of strings or empty array for no events`)) : r = Le("UNSUPPORTED_METHODS", `${e}, methods should be an array of strings or empty array for no methods`), r;
}
function Wm(t, e) {
  let r = null;
  return Object.values(t).forEach((s) => {
    if (r) return;
    const n = VI(s, `${e}, namespace`);
    n && (r = n);
  }), r;
}
function KI(t, e, r) {
  let s = null;
  if (t && oo(t)) {
    const n = Wm(t, e);
    n && (s = n);
    const i = zI(t, e, r);
    i && (s = i);
  } else s = V("MISSING_OR_INVALID", `${e}, ${r} should be an object with data`);
  return s;
}
function gl(t, e) {
  let r = null;
  if (t && oo(t)) {
    const s = Wm(t, e);
    s && (r = s);
    const n = HI(t, e);
    n && (r = n);
  } else r = V("MISSING_OR_INVALID", `${e}, namespaces should be an object with data`);
  return r;
}
function Hm(t) {
  return rt(t.protocol, !0);
}
function GI(t, e) {
  let r = !1;
  return t ? t && Ss(t) && t.length && t.forEach((s) => {
    r = Hm(s);
  }) : r = !0, r;
}
function YI(t) {
  return typeof t == "number";
}
function Bt(t) {
  return typeof t < "u" && typeof t !== null;
}
function ZI(t) {
  return !(!t || typeof t != "object" || !t.code || !Qu(t.code, !1) || !t.message || !rt(t.message, !1));
}
function JI(t) {
  return !(bt(t) || !rt(t.method, !1));
}
function XI(t) {
  return !(bt(t) || bt(t.result) && bt(t.error) || !Qu(t.id, !1) || !rt(t.jsonrpc, !1));
}
function QI(t) {
  return !(bt(t) || !rt(t.name, !1));
}
function gp(t, e) {
  return !(!ec(e) || !RI(t).includes(e));
}
function eN(t, e, r) {
  return rt(r, !1) ? PI(t, e).includes(r) : !1;
}
function tN(t, e, r) {
  return rt(r, !1) ? xI(t, e).includes(r) : !1;
}
function mp(t, e, r) {
  let s = null;
  const n = rN(t), i = sN(e), o = Object.keys(n), a = Object.keys(i), c = wp(Object.keys(t)), l = wp(Object.keys(e)), u = c.filter((d) => !l.includes(d));
  return u.length && (s = V("NON_CONFORMING_NAMESPACES", `${r} namespaces keys don't satisfy requiredNamespaces.
      Required: ${u.toString()}
      Received: ${Object.keys(e).toString()}`)), Hs(o, a) || (s = V("NON_CONFORMING_NAMESPACES", `${r} namespaces chains don't satisfy required namespaces.
      Required: ${o.toString()}
      Approved: ${a.toString()}`)), Object.keys(e).forEach((d) => {
    if (!d.includes(":") || s) return;
    const p = wi(e[d].accounts);
    p.includes(d) || (s = V("NON_CONFORMING_NAMESPACES", `${r} namespaces accounts don't satisfy namespace accounts for ${d}
        Required: ${d}
        Approved: ${p.toString()}`));
  }), o.forEach((d) => {
    s || (Hs(n[d].methods, i[d].methods) ? Hs(n[d].events, i[d].events) || (s = V("NON_CONFORMING_NAMESPACES", `${r} namespaces events don't satisfy namespace events for ${d}`)) : s = V("NON_CONFORMING_NAMESPACES", `${r} namespaces methods don't satisfy namespace methods for ${d}`));
  }), s;
}
function rN(t) {
  const e = {};
  return Object.keys(t).forEach((r) => {
    var s;
    r.includes(":") ? e[r] = t[r] : (s = t[r].chains) == null || s.forEach((n) => {
      e[n] = { methods: t[r].methods, events: t[r].events };
    });
  }), e;
}
function wp(t) {
  return [...new Set(t.map((e) => e.includes(":") ? e.split(":")[0] : e))];
}
function sN(t) {
  const e = {};
  return Object.keys(t).forEach((r) => {
    if (r.includes(":")) e[r] = t[r];
    else {
      const s = wi(t[r].accounts);
      s == null || s.forEach((n) => {
        e[n] = { accounts: t[r].accounts.filter((i) => i.includes(`${n}:`)), methods: t[r].methods, events: t[r].events };
      });
    }
  }), e;
}
function nN(t, e) {
  return Qu(t, !1) && t <= e.max && t >= e.min;
}
function yp() {
  const t = Jo();
  return new Promise((e) => {
    switch (t) {
      case rr.browser:
        e(iN());
        break;
      case rr.reactNative:
        e(oN());
        break;
      case rr.node:
        e(aN());
        break;
      default:
        e(!0);
    }
  });
}
function iN() {
  return Zo() && (navigator == null ? void 0 : navigator.onLine);
}
function oN() {
  return h(this, null, function* () {
    if (xs() && typeof global < "u" && global != null && global.NetInfo) {
      const t = yield global == null ? void 0 : global.NetInfo.fetch();
      return t == null ? void 0 : t.isConnected;
    }
    return !0;
  });
}
function aN() {
  return !0;
}
function cN(t) {
  switch (Jo()) {
    case rr.browser:
      lN(t);
      break;
    case rr.reactNative:
      uN(t);
      break;
  }
}
function lN(t) {
  !xs() && Zo() && (window.addEventListener("online", () => t(!0)), window.addEventListener("offline", () => t(!1)));
}
function uN(t) {
  xs() && typeof global < "u" && global != null && global.NetInfo && (global == null || global.NetInfo.addEventListener((e) => t(e == null ? void 0 : e.isConnected)));
}
const ml = {};
class Ni {
  static get(e) {
    return ml[e];
  }
  static set(e, r) {
    ml[e] = r;
  }
  static delete(e) {
    delete ml[e];
  }
}
const dN = "PARSE_ERROR", hN = "INVALID_REQUEST", pN = "METHOD_NOT_FOUND", fN = "INVALID_PARAMS", Vm = "INTERNAL_ERROR", ed = "SERVER_ERROR", gN = [-32700, -32600, -32601, -32602, -32603], zi = {
  [dN]: { code: -32700, message: "Parse error" },
  [hN]: { code: -32600, message: "Invalid Request" },
  [pN]: { code: -32601, message: "Method not found" },
  [fN]: { code: -32602, message: "Invalid params" },
  [Vm]: { code: -32603, message: "Internal error" },
  [ed]: { code: -32e3, message: "Server error" }
}, Km = ed;
function mN(t) {
  return gN.includes(t);
}
function bp(t) {
  return Object.keys(zi).includes(t) ? zi[t] : zi[Km];
}
function wN(t) {
  const e = Object.values(zi).find((r) => r.code === t);
  return e || zi[Km];
}
function Gm(t, e, r) {
  return t.message.includes("getaddrinfo ENOTFOUND") || t.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${r} RPC url at ${e}`) : t;
}
var wl = {}, Xr = {}, vp;
function yN() {
  if (vp) return Xr;
  vp = 1, Object.defineProperty(Xr, "__esModule", { value: !0 }), Xr.isBrowserCryptoAvailable = Xr.getSubtleCrypto = Xr.getBrowerCrypto = void 0;
  function t() {
    return (Mr == null ? void 0 : Mr.crypto) || (Mr == null ? void 0 : Mr.msCrypto) || {};
  }
  Xr.getBrowerCrypto = t;
  function e() {
    const s = t();
    return s.subtle || s.webkitSubtle;
  }
  Xr.getSubtleCrypto = e;
  function r() {
    return !!t() && !!e();
  }
  return Xr.isBrowserCryptoAvailable = r, Xr;
}
var Qr = {}, Ep;
function bN() {
  if (Ep) return Qr;
  Ep = 1, Object.defineProperty(Qr, "__esModule", { value: !0 }), Qr.isBrowser = Qr.isNode = Qr.isReactNative = void 0;
  function t() {
    return typeof document == "undefined" && typeof navigator != "undefined" && navigator.product === "ReactNative";
  }
  Qr.isReactNative = t;
  function e() {
    return typeof process != "undefined" && typeof process.versions != "undefined" && typeof process.versions.node != "undefined";
  }
  Qr.isNode = e;
  function r() {
    return !t() && !e();
  }
  return Qr.isBrowser = r, Qr;
}
var _p;
function vN() {
  return _p || (_p = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const e = Wo;
    e.__exportStar(yN(), t), e.__exportStar(bN(), t);
  }(wl)), wl;
}
var EN = vN();
function Ur(t = 3) {
  const e = Date.now() * Math.pow(10, t), r = Math.floor(Math.random() * Math.pow(10, t));
  return e + r;
}
function Vs(t = 6) {
  return BigInt(Ur(t));
}
function Cs(t, e, r) {
  return {
    id: r || Ur(),
    jsonrpc: "2.0",
    method: t,
    params: e
  };
}
function Nc(t, e) {
  return {
    id: t,
    jsonrpc: "2.0",
    result: e
  };
}
function Tc(t, e, r) {
  return {
    id: t,
    jsonrpc: "2.0",
    error: _N(e)
  };
}
function _N(t, e) {
  return typeof t == "undefined" ? bp(Vm) : (typeof t == "string" && (t = Object.assign(Object.assign({}, bp(ed)), { message: t })), mN(t.code) && (t = wN(t.code)), t);
}
let CN = class {
}, AN = class extends CN {
  constructor() {
    super();
  }
}, SN = class extends AN {
  constructor(e) {
    super();
  }
};
const IN = "^https?:", NN = "^wss?:";
function TN(t) {
  const e = t.match(new RegExp(/^\w+:/, "gi"));
  if (!(!e || !e.length))
    return e[0];
}
function Ym(t, e) {
  const r = TN(t);
  return typeof r == "undefined" ? !1 : new RegExp(e).test(r);
}
function Cp(t) {
  return Ym(t, IN);
}
function Ap(t) {
  return Ym(t, NN);
}
function ON(t) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(t);
}
function Zm(t) {
  return typeof t == "object" && "id" in t && "jsonrpc" in t && t.jsonrpc === "2.0";
}
function td(t) {
  return Zm(t) && "method" in t;
}
function Oc(t) {
  return Zm(t) && (Lr(t) || pr(t));
}
function Lr(t) {
  return "result" in t;
}
function pr(t) {
  return "error" in t;
}
let mr = class extends SN {
  constructor(e) {
    super(e), this.events = new gr.EventEmitter(), this.hasRegisteredEventListeners = !1, this.connection = this.setConnection(e), this.connection.connected && this.registerEventListeners();
  }
  connect() {
    return h(this, arguments, function* (e = this.connection) {
      yield this.open(e);
    });
  }
  disconnect() {
    return h(this, null, function* () {
      yield this.close();
    });
  }
  on(e, r) {
    this.events.on(e, r);
  }
  once(e, r) {
    this.events.once(e, r);
  }
  off(e, r) {
    this.events.off(e, r);
  }
  removeListener(e, r) {
    this.events.removeListener(e, r);
  }
  request(e, r) {
    return h(this, null, function* () {
      return this.requestStrict(Cs(e.method, e.params || [], e.id || Vs().toString()), r);
    });
  }
  requestStrict(e, r) {
    return h(this, null, function* () {
      return new Promise((s, n) => h(this, null, function* () {
        if (!this.connection.connected) try {
          yield this.open();
        } catch (i) {
          n(i);
        }
        this.events.on(`${e.id}`, (i) => {
          pr(i) ? n(i.error) : s(i.result);
        });
        try {
          yield this.connection.send(e, r);
        } catch (i) {
          n(i);
        }
      }));
    });
  }
  setConnection(e = this.connection) {
    return e;
  }
  onPayload(e) {
    this.events.emit("payload", e), Oc(e) ? this.events.emit(`${e.id}`, e) : this.events.emit("message", { type: e.method, data: e.params });
  }
  onClose(e) {
    e && e.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${e.code} ${e.reason ? `(${e.reason})` : ""}`)), this.events.emit("disconnect");
  }
  open() {
    return h(this, arguments, function* (e = this.connection) {
      this.connection === e && this.connection.connected || (this.connection.connected && this.close(), typeof e == "string" && (yield this.connection.open(e), e = this.connection), this.connection = this.setConnection(e), yield this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
    });
  }
  close() {
    return h(this, null, function* () {
      yield this.connection.close();
    });
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (e) => this.onPayload(e)), this.connection.on("close", (e) => this.onClose(e)), this.connection.on("error", (e) => this.events.emit("error", e)), this.connection.on("register_error", (e) => this.onClose()), this.hasRegisteredEventListeners = !0);
  }
};
const RN = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require("ws"), PN = () => typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u", Sp = (t) => t.split("?")[0], Ip = 10, xN = RN();
let DN = class {
  constructor(e) {
    if (this.url = e, this.events = new gr.EventEmitter(), this.registering = !1, !Ap(e)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    this.url = e;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e, r) {
    this.events.on(e, r);
  }
  once(e, r) {
    this.events.once(e, r);
  }
  off(e, r) {
    this.events.off(e, r);
  }
  removeListener(e, r) {
    this.events.removeListener(e, r);
  }
  open() {
    return h(this, arguments, function* (e = this.url) {
      yield this.register(e);
    });
  }
  close() {
    return h(this, null, function* () {
      return new Promise((e, r) => {
        if (typeof this.socket > "u") {
          r(new Error("Connection already closed"));
          return;
        }
        this.socket.onclose = (s) => {
          this.onClose(s), e();
        }, this.socket.close();
      });
    });
  }
  send(e) {
    return h(this, null, function* () {
      typeof this.socket > "u" && (this.socket = yield this.register());
      try {
        this.socket.send(cs(e));
      } catch (r) {
        this.onError(e.id, r);
      }
    });
  }
  register(e = this.url) {
    if (!Ap(e)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    if (this.registering) {
      const r = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= r || this.events.listenerCount("open") >= r) && this.events.setMaxListeners(r + 1), new Promise((s, n) => {
        this.events.once("register_error", (i) => {
          this.resetMaxListeners(), n(i);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u") return n(new Error("WebSocket connection is missing or invalid"));
          s(this.socket);
        });
      });
    }
    return this.url = e, this.registering = !0, new Promise((r, s) => {
      const n = EN.isReactNative() ? void 0 : { rejectUnauthorized: !ON(e) }, i = new xN(e, [], n);
      PN() ? i.onerror = (o) => {
        const a = o;
        s(this.emitError(a.error));
      } : i.on("error", (o) => {
        s(this.emitError(o));
      }), i.onopen = () => {
        this.onOpen(i), r(i);
      };
    });
  }
  onOpen(e) {
    e.onmessage = (r) => this.onPayload(r), e.onclose = (r) => this.onClose(r), this.socket = e, this.registering = !1, this.events.emit("open");
  }
  onClose(e) {
    this.socket = void 0, this.registering = !1, this.events.emit("close", e);
  }
  onPayload(e) {
    if (typeof e.data > "u") return;
    const r = typeof e.data == "string" ? tn(e.data) : e.data;
    this.events.emit("payload", r);
  }
  onError(e, r) {
    const s = this.parseError(r), n = s.message || s.toString(), i = Tc(e, n);
    this.events.emit("payload", i);
  }
  parseError(e, r = this.url) {
    return Gm(e, Sp(r), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > Ip && this.events.setMaxListeners(Ip);
  }
  emitError(e) {
    const r = this.parseError(new Error((e == null ? void 0 : e.message) || `WebSocket connection failed for host: ${Sp(this.url)}`));
    return this.events.emit("register_error", r), r;
  }
};
const Jm = "wc", Xm = 2, du = "core", zr = `${Jm}@2:${du}:`, kN = { logger: "error" }, $N = { database: ":memory:" }, UN = "crypto", Np = "client_ed25519_seed", LN = H.ONE_DAY, MN = "keychain", FN = "0.3", BN = "messages", jN = "0.3", Tp = H.SIX_HOURS, qN = "publisher", Qm = "irn", zN = "error", ew = "wss://relay.walletconnect.org", WN = "relayer", ut = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, HN = "_subscription", ar = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, VN = 0.1, hu = "2.19.2", Ve = { link_mode: "link_mode", relay: "relay" }, Ma = { inbound: "inbound", outbound: "outbound" }, KN = "0.3", GN = "WALLETCONNECT_CLIENT_ID", Op = "WALLETCONNECT_LINK_MODE_APPS", Xt = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, YN = "subscription", ZN = "0.3", JN = "pairing", XN = "0.3", Ti = { wc_pairingDelete: { req: { ttl: H.ONE_DAY, prompt: !1, tag: 1e3 }, res: { ttl: H.ONE_DAY, prompt: !1, tag: 1001 } }, wc_pairingPing: { req: { ttl: H.THIRTY_SECONDS, prompt: !1, tag: 1002 }, res: { ttl: H.THIRTY_SECONDS, prompt: !1, tag: 1003 } }, unregistered_method: { req: { ttl: H.ONE_DAY, prompt: !1, tag: 0 }, res: { ttl: H.ONE_DAY, prompt: !1, tag: 0 } } }, zs = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, br = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, QN = "history", eT = "0.3", tT = "expirer", hr = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, rT = "0.3", sT = "verify-api", nT = "https://verify.walletconnect.com", tw = "https://verify.walletconnect.org", Wi = tw, iT = `${Wi}/v3`, oT = [nT, tw], aT = "echo", cT = "https://echo.walletconnect.com", $r = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" }, es = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" }, vr = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" }, $s = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" }, Us = { authenticated_session_approve_started: "authenticated_session_approve_started", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve" }, Oi = { no_internet_connection: "no_internet_connection", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" }, lT = 0.1, uT = "event-client", dT = 86400, hT = "https://pulse.walletconnect.org/batch";
function pT(t, e) {
  if (t.length >= 255) throw new TypeError("Alphabet too long");
  for (var r = new Uint8Array(256), s = 0; s < r.length; s++) r[s] = 255;
  for (var n = 0; n < t.length; n++) {
    var i = t.charAt(n), o = i.charCodeAt(0);
    if (r[o] !== 255) throw new TypeError(i + " is ambiguous");
    r[o] = n;
  }
  var a = t.length, c = t.charAt(0), l = Math.log(a) / Math.log(256), u = Math.log(256) / Math.log(a);
  function d(m) {
    if (m instanceof Uint8Array || (ArrayBuffer.isView(m) ? m = new Uint8Array(m.buffer, m.byteOffset, m.byteLength) : Array.isArray(m) && (m = Uint8Array.from(m))), !(m instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (m.length === 0) return "";
    for (var f = 0, w = 0, S = 0, E = m.length; S !== E && m[S] === 0; ) S++, f++;
    for (var I = (E - S) * u + 1 >>> 0, A = new Uint8Array(I); S !== E; ) {
      for (var T = m[S], b = 0, N = I - 1; (T !== 0 || b < w) && N !== -1; N--, b++) T += 256 * A[N] >>> 0, A[N] = T % a >>> 0, T = T / a >>> 0;
      if (T !== 0) throw new Error("Non-zero carry");
      w = b, S++;
    }
    for (var P = I - w; P !== I && A[P] === 0; ) P++;
    for (var O = c.repeat(f); P < I; ++P) O += t.charAt(A[P]);
    return O;
  }
  function p(m) {
    if (typeof m != "string") throw new TypeError("Expected String");
    if (m.length === 0) return new Uint8Array();
    var f = 0;
    if (m[f] !== " ") {
      for (var w = 0, S = 0; m[f] === c; ) w++, f++;
      for (var E = (m.length - f) * l + 1 >>> 0, I = new Uint8Array(E); m[f]; ) {
        var A = r[m.charCodeAt(f)];
        if (A === 255) return;
        for (var T = 0, b = E - 1; (A !== 0 || T < S) && b !== -1; b--, T++) A += a * I[b] >>> 0, I[b] = A % 256 >>> 0, A = A / 256 >>> 0;
        if (A !== 0) throw new Error("Non-zero carry");
        S = T, f++;
      }
      if (m[f] !== " ") {
        for (var N = E - S; N !== E && I[N] === 0; ) N++;
        for (var P = new Uint8Array(w + (E - N)), O = w; N !== E; ) P[O++] = I[N++];
        return P;
      }
    }
  }
  function g(m) {
    var f = p(m);
    if (f) return f;
    throw new Error(`Non-${e} character`);
  }
  return { encode: d, decodeUnsafe: p, decode: g };
}
var fT = pT, gT = fT;
const rw = (t) => {
  if (t instanceof Uint8Array && t.constructor.name === "Uint8Array") return t;
  if (t instanceof ArrayBuffer) return new Uint8Array(t);
  if (ArrayBuffer.isView(t)) return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  throw new Error("Unknown type, must be binary type");
}, mT = (t) => new TextEncoder().encode(t), wT = (t) => new TextDecoder().decode(t);
class yT {
  constructor(e, r, s) {
    this.name = e, this.prefix = r, this.baseEncode = s;
  }
  encode(e) {
    if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class bT {
  constructor(e, r, s) {
    if (this.name = e, this.prefix = r, r.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = r.codePointAt(0), this.baseDecode = s;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e) {
    return sw(this, e);
  }
}
class vT {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return sw(this, e);
  }
  decode(e) {
    const r = e[0], s = this.decoders[r];
    if (s) return s.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const sw = (t, e) => new vT(C(C({}, t.decoders || { [t.prefix]: t }), e.decoders || { [e.prefix]: e }));
class ET {
  constructor(e, r, s, n) {
    this.name = e, this.prefix = r, this.baseEncode = s, this.baseDecode = n, this.encoder = new yT(e, r, s), this.decoder = new bT(e, r, n);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const Rc = ({ name: t, prefix: e, encode: r, decode: s }) => new ET(t, e, r, s), sa = ({ prefix: t, name: e, alphabet: r }) => {
  const { encode: s, decode: n } = gT(r, e);
  return Rc({ prefix: t, name: e, encode: s, decode: (i) => rw(n(i)) });
}, _T = (t, e, r, s) => {
  const n = {};
  for (let u = 0; u < e.length; ++u) n[e[u]] = u;
  let i = t.length;
  for (; t[i - 1] === "="; ) --i;
  const o = new Uint8Array(i * r / 8 | 0);
  let a = 0, c = 0, l = 0;
  for (let u = 0; u < i; ++u) {
    const d = n[t[u]];
    if (d === void 0) throw new SyntaxError(`Non-${s} character`);
    c = c << r | d, a += r, a >= 8 && (a -= 8, o[l++] = 255 & c >> a);
  }
  if (a >= r || 255 & c << 8 - a) throw new SyntaxError("Unexpected end of data");
  return o;
}, CT = (t, e, r) => {
  const s = e[e.length - 1] === "=", n = (1 << r) - 1;
  let i = "", o = 0, a = 0;
  for (let c = 0; c < t.length; ++c) for (a = a << 8 | t[c], o += 8; o > r; ) o -= r, i += e[n & a >> o];
  if (o && (i += e[n & a << r - o]), s) for (; i.length * r & 7; ) i += "=";
  return i;
}, At = ({ name: t, prefix: e, bitsPerChar: r, alphabet: s }) => Rc({ prefix: e, name: t, encode(n) {
  return CT(n, s, r);
}, decode(n) {
  return _T(n, s, r, t);
} }), AT = Rc({ prefix: "\0", name: "identity", encode: (t) => wT(t), decode: (t) => mT(t) });
var ST = Object.freeze({ __proto__: null, identity: AT });
const IT = At({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var NT = Object.freeze({ __proto__: null, base2: IT });
const TT = At({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var OT = Object.freeze({ __proto__: null, base8: TT });
const RT = sa({ prefix: "9", name: "base10", alphabet: "0123456789" });
var PT = Object.freeze({ __proto__: null, base10: RT });
const xT = At({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), DT = At({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var kT = Object.freeze({ __proto__: null, base16: xT, base16upper: DT });
const $T = At({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), UT = At({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), LT = At({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), MT = At({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), FT = At({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), BT = At({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), jT = At({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), qT = At({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), zT = At({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var WT = Object.freeze({ __proto__: null, base32: $T, base32upper: UT, base32pad: LT, base32padupper: MT, base32hex: FT, base32hexupper: BT, base32hexpad: jT, base32hexpadupper: qT, base32z: zT });
const HT = sa({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), VT = sa({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var KT = Object.freeze({ __proto__: null, base36: HT, base36upper: VT });
const GT = sa({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), YT = sa({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var ZT = Object.freeze({ __proto__: null, base58btc: GT, base58flickr: YT });
const JT = At({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), XT = At({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), QT = At({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), eO = At({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var tO = Object.freeze({ __proto__: null, base64: JT, base64pad: XT, base64url: QT, base64urlpad: eO });
const nw = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), rO = nw.reduce((t, e, r) => (t[r] = e, t), []), sO = nw.reduce((t, e, r) => (t[e.codePointAt(0)] = r, t), []);
function nO(t) {
  return t.reduce((e, r) => (e += rO[r], e), "");
}
function iO(t) {
  const e = [];
  for (const r of t) {
    const s = sO[r.codePointAt(0)];
    if (s === void 0) throw new Error(`Non-base256emoji character: ${r}`);
    e.push(s);
  }
  return new Uint8Array(e);
}
const oO = Rc({ prefix: "🚀", name: "base256emoji", encode: nO, decode: iO });
var aO = Object.freeze({ __proto__: null, base256emoji: oO }), cO = iw, Rp = 128, lO = -128, uO = Math.pow(2, 31);
function iw(t, e, r) {
  e = e || [], r = r || 0;
  for (var s = r; t >= uO; ) e[r++] = t & 255 | Rp, t /= 128;
  for (; t & lO; ) e[r++] = t & 255 | Rp, t >>>= 7;
  return e[r] = t | 0, iw.bytes = r - s + 1, e;
}
var dO = pu, hO = 128, Pp = 127;
function pu(t, s) {
  var r = 0, s = s || 0, n = 0, i = s, o, a = t.length;
  do {
    if (i >= a) throw pu.bytes = 0, new RangeError("Could not decode varint");
    o = t[i++], r += n < 28 ? (o & Pp) << n : (o & Pp) * Math.pow(2, n), n += 7;
  } while (o >= hO);
  return pu.bytes = i - s, r;
}
var pO = Math.pow(2, 7), fO = Math.pow(2, 14), gO = Math.pow(2, 21), mO = Math.pow(2, 28), wO = Math.pow(2, 35), yO = Math.pow(2, 42), bO = Math.pow(2, 49), vO = Math.pow(2, 56), EO = Math.pow(2, 63), _O = function(t) {
  return t < pO ? 1 : t < fO ? 2 : t < gO ? 3 : t < mO ? 4 : t < wO ? 5 : t < yO ? 6 : t < bO ? 7 : t < vO ? 8 : t < EO ? 9 : 10;
}, CO = { encode: cO, decode: dO, encodingLength: _O }, ow = CO;
const xp = (t, e, r = 0) => (ow.encode(t, e, r), e), Dp = (t) => ow.encodingLength(t), fu = (t, e) => {
  const r = e.byteLength, s = Dp(t), n = s + Dp(r), i = new Uint8Array(n + r);
  return xp(t, i, 0), xp(r, i, s), i.set(e, n), new AO(t, r, e, i);
};
class AO {
  constructor(e, r, s, n) {
    this.code = e, this.size = r, this.digest = s, this.bytes = n;
  }
}
const aw = ({ name: t, code: e, encode: r }) => new SO(t, e, r);
class SO {
  constructor(e, r, s) {
    this.name = e, this.code = r, this.encode = s;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const r = this.encode(e);
      return r instanceof Uint8Array ? fu(this.code, r) : r.then((s) => fu(this.code, s));
    } else throw Error("Unknown type, must be binary type");
  }
}
const cw = (t) => (e) => h(null, null, function* () {
  return new Uint8Array(yield crypto.subtle.digest(t, e));
}), IO = aw({ name: "sha2-256", code: 18, encode: cw("SHA-256") }), NO = aw({ name: "sha2-512", code: 19, encode: cw("SHA-512") });
var TO = Object.freeze({ __proto__: null, sha256: IO, sha512: NO });
const lw = 0, OO = "identity", uw = rw, RO = (t) => fu(lw, uw(t)), PO = { code: lw, name: OO, encode: uw, digest: RO };
var xO = Object.freeze({ __proto__: null, identity: PO });
new TextEncoder(), new TextDecoder();
const kp = C(C(C(C(C(C(C(C(C(C({}, ST), NT), OT), PT), kT), WT), KT), ZT), tO), aO);
C(C({}, TO), xO);
function DO(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(t) : new Uint8Array(t);
}
function dw(t, e, r, s) {
  return { name: t, prefix: e, encoder: { name: t, prefix: e, encode: r }, decoder: { decode: s } };
}
const $p = dw("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1))), yl = dw("ascii", "a", (t) => {
  let e = "a";
  for (let r = 0; r < t.length; r++) e += String.fromCharCode(t[r]);
  return e;
}, (t) => {
  t = t.substring(1);
  const e = DO(t.length);
  for (let r = 0; r < t.length; r++) e[r] = t.charCodeAt(r);
  return e;
}), kO = C({ utf8: $p, "utf-8": $p, hex: kp.base16, latin1: yl, ascii: yl, binary: yl }, kp);
function $O(t, e = "utf8") {
  const r = kO[e];
  if (!r) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t, "utf8") : r.decoder.decode(`${r.prefix}${t}`);
}
var UO = Object.defineProperty, LO = (t, e, r) => e in t ? UO(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Dr = (t, e, r) => LO(t, typeof e != "symbol" ? e + "" : e, r);
class MO {
  constructor(e, r) {
    this.core = e, this.logger = r, Dr(this, "keychain", /* @__PURE__ */ new Map()), Dr(this, "name", MN), Dr(this, "version", FN), Dr(this, "initialized", !1), Dr(this, "storagePrefix", zr), Dr(this, "init", () => h(this, null, function* () {
      if (!this.initialized) {
        const s = yield this.getKeyChain();
        typeof s < "u" && (this.keychain = s), this.initialized = !0;
      }
    })), Dr(this, "has", (s) => (this.isInitialized(), this.keychain.has(s))), Dr(this, "set", (s, n) => h(this, null, function* () {
      this.isInitialized(), this.keychain.set(s, n), yield this.persist();
    })), Dr(this, "get", (s) => {
      this.isInitialized();
      const n = this.keychain.get(s);
      if (typeof n > "u") {
        const { message: i } = V("NO_MATCHING_KEY", `${this.name}: ${s}`);
        throw new Error(i);
      }
      return n;
    }), Dr(this, "del", (s) => h(this, null, function* () {
      this.isInitialized(), this.keychain.delete(s), yield this.persist();
    })), this.core = e, this.logger = Ot(r, this.name);
  }
  get context() {
    return Ht(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  setKeyChain(e) {
    return h(this, null, function* () {
      yield this.core.storage.setItem(this.storageKey, Ql(e));
    });
  }
  getKeyChain() {
    return h(this, null, function* () {
      const e = yield this.core.storage.getItem(this.storageKey);
      return typeof e < "u" ? eu(e) : void 0;
    });
  }
  persist() {
    return h(this, null, function* () {
      yield this.setKeyChain(this.keychain);
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = V("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var FO = Object.defineProperty, BO = (t, e, r) => e in t ? FO(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, mt = (t, e, r) => BO(t, typeof e != "symbol" ? e + "" : e, r);
class jO {
  constructor(e, r, s) {
    this.core = e, this.logger = r, mt(this, "name", UN), mt(this, "keychain"), mt(this, "randomSessionIdentifier", uu()), mt(this, "initialized", !1), mt(this, "init", () => h(this, null, function* () {
      this.initialized || (yield this.keychain.init(), this.initialized = !0);
    })), mt(this, "hasKeys", (n) => (this.isInitialized(), this.keychain.has(n))), mt(this, "getClientId", () => h(this, null, function* () {
      this.isInitialized();
      const n = yield this.getClientSeed(), i = ph(n);
      return Bg(i.publicKey);
    })), mt(this, "generateKeyPair", () => {
      this.isInitialized();
      const n = wI();
      return this.setPrivateKey(n.publicKey, n.privateKey);
    }), mt(this, "signJWT", (n) => h(this, null, function* () {
      this.isInitialized();
      const i = yield this.getClientSeed(), o = ph(i), a = this.randomSessionIdentifier;
      return yield R_(a, n, LN, o);
    })), mt(this, "generateSharedKey", (n, i, o) => {
      this.isInitialized();
      const a = this.getPrivateKey(n), c = yI(a, i);
      return this.setSymKey(c, o);
    }), mt(this, "setSymKey", (n, i) => h(this, null, function* () {
      this.isInitialized();
      const o = i || La(n);
      return yield this.keychain.set(o, n), o;
    })), mt(this, "deleteKeyPair", (n) => h(this, null, function* () {
      this.isInitialized(), yield this.keychain.del(n);
    })), mt(this, "deleteSymKey", (n) => h(this, null, function* () {
      this.isInitialized(), yield this.keychain.del(n);
    })), mt(this, "encode", (n, i, o) => h(this, null, function* () {
      this.isInitialized();
      const a = zm(o), c = cs(i);
      if (up(a)) return EI(c, o == null ? void 0 : o.encoding);
      if (lp(a)) {
        const p = a.senderPublicKey, g = a.receiverPublicKey;
        n = yield this.generateSharedKey(p, g);
      }
      const l = this.getSymKey(n), { type: u, senderPublicKey: d } = a;
      return bI({ type: u, symKey: l, message: c, senderPublicKey: d, encoding: o == null ? void 0 : o.encoding });
    })), mt(this, "decode", (n, i, o) => h(this, null, function* () {
      this.isInitialized();
      const a = CI(i, o);
      if (up(a)) {
        const c = _I(i, o == null ? void 0 : o.encoding);
        return tn(c);
      }
      if (lp(a)) {
        const c = a.receiverPublicKey, l = a.senderPublicKey;
        n = yield this.generateSharedKey(c, l);
      }
      try {
        const c = this.getSymKey(n), l = vI({ symKey: c, encoded: i, encoding: o == null ? void 0 : o.encoding });
        return tn(l);
      } catch (c) {
        this.logger.error(`Failed to decode message from topic: '${n}', clientId: '${yield this.getClientId()}'`), this.logger.error(c);
      }
    })), mt(this, "getPayloadType", (n, i = Sr) => {
      const o = io({ encoded: n, encoding: i });
      return on(o.type);
    }), mt(this, "getPayloadSenderPublicKey", (n, i = Sr) => {
      const o = io({ encoded: n, encoding: i });
      return o.senderPublicKey ? zt(o.senderPublicKey, xt) : void 0;
    }), this.core = e, this.logger = Ot(r, this.name), this.keychain = s || new MO(this.core, this.logger);
  }
  get context() {
    return Ht(this.logger);
  }
  setPrivateKey(e, r) {
    return h(this, null, function* () {
      return yield this.keychain.set(e, r), e;
    });
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  getClientSeed() {
    return h(this, null, function* () {
      let e = "";
      try {
        e = this.keychain.get(Np);
      } catch (r) {
        e = uu(), yield this.keychain.set(Np, e);
      }
      return $O(e, "base16");
    });
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = V("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var qO = Object.defineProperty, zO = Object.defineProperties, WO = Object.getOwnPropertyDescriptors, Up = Object.getOwnPropertySymbols, HO = Object.prototype.hasOwnProperty, VO = Object.prototype.propertyIsEnumerable, gu = (t, e, r) => e in t ? qO(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, KO = (t, e) => {
  for (var r in e || (e = {})) HO.call(e, r) && gu(t, r, e[r]);
  if (Up) for (var r of Up(e)) VO.call(e, r) && gu(t, r, e[r]);
  return t;
}, GO = (t, e) => zO(t, WO(e)), Zt = (t, e, r) => gu(t, typeof e != "symbol" ? e + "" : e, r);
class YO extends Tv {
  constructor(e, r) {
    super(e, r), this.logger = e, this.core = r, Zt(this, "messages", /* @__PURE__ */ new Map()), Zt(this, "messagesWithoutClientAck", /* @__PURE__ */ new Map()), Zt(this, "name", BN), Zt(this, "version", jN), Zt(this, "initialized", !1), Zt(this, "storagePrefix", zr), Zt(this, "init", () => h(this, null, function* () {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const s = yield this.getRelayerMessages();
          typeof s < "u" && (this.messages = s);
          const n = yield this.getRelayerMessagesWithoutClientAck();
          typeof n < "u" && (this.messagesWithoutClientAck = n), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (s) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(s);
        } finally {
          this.initialized = !0;
        }
      }
    })), Zt(this, "set", (s, n, i) => h(this, null, function* () {
      this.isInitialized();
      const o = Fr(n);
      let a = this.messages.get(s);
      if (typeof a > "u" && (a = {}), typeof a[o] < "u") return o;
      if (a[o] = n, this.messages.set(s, a), i === Ma.inbound) {
        const c = this.messagesWithoutClientAck.get(s) || {};
        this.messagesWithoutClientAck.set(s, GO(KO({}, c), { [o]: n }));
      }
      return yield this.persist(), o;
    })), Zt(this, "get", (s) => {
      this.isInitialized();
      let n = this.messages.get(s);
      return typeof n > "u" && (n = {}), n;
    }), Zt(this, "getWithoutAck", (s) => {
      this.isInitialized();
      const n = {};
      for (const i of s) {
        const o = this.messagesWithoutClientAck.get(i) || {};
        n[i] = Object.values(o);
      }
      return n;
    }), Zt(this, "has", (s, n) => {
      this.isInitialized();
      const i = this.get(s), o = Fr(n);
      return typeof i[o] < "u";
    }), Zt(this, "ack", (s, n) => h(this, null, function* () {
      this.isInitialized();
      const i = this.messagesWithoutClientAck.get(s);
      if (typeof i > "u") return;
      const o = Fr(n);
      delete i[o], Object.keys(i).length === 0 ? this.messagesWithoutClientAck.delete(s) : this.messagesWithoutClientAck.set(s, i), yield this.persist();
    })), Zt(this, "del", (s) => h(this, null, function* () {
      this.isInitialized(), this.messages.delete(s), this.messagesWithoutClientAck.delete(s), yield this.persist();
    })), this.logger = Ot(e, this.name), this.core = r;
  }
  get context() {
    return Ht(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get storageKeyWithoutClientAck() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
  }
  setRelayerMessages(e) {
    return h(this, null, function* () {
      yield this.core.storage.setItem(this.storageKey, Ql(e));
    });
  }
  setRelayerMessagesWithoutClientAck(e) {
    return h(this, null, function* () {
      yield this.core.storage.setItem(this.storageKeyWithoutClientAck, Ql(e));
    });
  }
  getRelayerMessages() {
    return h(this, null, function* () {
      const e = yield this.core.storage.getItem(this.storageKey);
      return typeof e < "u" ? eu(e) : void 0;
    });
  }
  getRelayerMessagesWithoutClientAck() {
    return h(this, null, function* () {
      const e = yield this.core.storage.getItem(this.storageKeyWithoutClientAck);
      return typeof e < "u" ? eu(e) : void 0;
    });
  }
  persist() {
    return h(this, null, function* () {
      yield this.setRelayerMessages(this.messages), yield this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = V("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var ZO = Object.defineProperty, JO = Object.defineProperties, XO = Object.getOwnPropertyDescriptors, Lp = Object.getOwnPropertySymbols, QO = Object.prototype.hasOwnProperty, eR = Object.prototype.propertyIsEnumerable, mu = (t, e, r) => e in t ? ZO(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, va = (t, e) => {
  for (var r in e || (e = {})) QO.call(e, r) && mu(t, r, e[r]);
  if (Lp) for (var r of Lp(e)) eR.call(e, r) && mu(t, r, e[r]);
  return t;
}, bl = (t, e) => JO(t, XO(e)), Er = (t, e, r) => mu(t, typeof e != "symbol" ? e + "" : e, r);
class tR extends Ov {
  constructor(e, r) {
    super(e, r), this.relayer = e, this.logger = r, Er(this, "events", new gr.EventEmitter()), Er(this, "name", qN), Er(this, "queue", /* @__PURE__ */ new Map()), Er(this, "publishTimeout", H.toMiliseconds(H.ONE_MINUTE)), Er(this, "initialPublishTimeout", H.toMiliseconds(H.ONE_SECOND * 15)), Er(this, "needsTransportRestart", !1), Er(this, "publish", (s, n, i) => h(this, null, function* () {
      var o;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: s, message: n, opts: i } });
      const a = (i == null ? void 0 : i.ttl) || Tp, c = Qa(i), l = (i == null ? void 0 : i.prompt) || !1, u = (i == null ? void 0 : i.tag) || 0, d = (i == null ? void 0 : i.id) || Vs().toString(), p = { topic: s, message: n, opts: { ttl: a, relay: c, prompt: l, tag: u, id: d, attestation: i == null ? void 0 : i.attestation, tvf: i == null ? void 0 : i.tvf } }, g = `Failed to publish payload, please try again. id:${d} tag:${u}`;
      try {
        const m = new Promise((f) => h(this, null, function* () {
          const w = ({ id: E }) => {
            p.opts.id === E && (this.removeRequestFromQueue(E), this.relayer.events.removeListener(ut.publish, w), f(p));
          };
          this.relayer.events.on(ut.publish, w);
          const S = _s(new Promise((E, I) => {
            this.rpcPublish({ topic: s, message: n, ttl: a, prompt: l, tag: u, id: d, attestation: i == null ? void 0 : i.attestation, tvf: i == null ? void 0 : i.tvf }).then(E).catch((A) => {
              this.logger.warn(A, A == null ? void 0 : A.message), I(A);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${d} tag:${u}`);
          try {
            yield S, this.events.removeListener(ut.publish, w);
          } catch (E) {
            this.queue.set(d, bl(va({}, p), { attempt: 1 })), this.logger.warn(E, E == null ? void 0 : E.message);
          }
        }));
        this.logger.trace({ type: "method", method: "publish", params: { id: d, topic: s, message: n, opts: i } }), yield _s(m, this.publishTimeout, g);
      } catch (m) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(m), (o = i == null ? void 0 : i.internal) != null && o.throwOnFailedPublish) throw m;
      } finally {
        this.queue.delete(d);
      }
    })), Er(this, "on", (s, n) => {
      this.events.on(s, n);
    }), Er(this, "once", (s, n) => {
      this.events.once(s, n);
    }), Er(this, "off", (s, n) => {
      this.events.off(s, n);
    }), Er(this, "removeListener", (s, n) => {
      this.events.removeListener(s, n);
    }), this.relayer = e, this.logger = Ot(r, this.name), this.registerEventListeners();
  }
  get context() {
    return Ht(this.logger);
  }
  rpcPublish(e) {
    return h(this, null, function* () {
      var r, s, n, i;
      const { topic: o, message: a, ttl: c = Tp, prompt: l, tag: u, id: d, attestation: p, tvf: g } = e, m = { method: Li(Qa().protocol).publish, params: va({ topic: o, message: a, ttl: c, prompt: l, tag: u, attestation: p }, g), id: d };
      bt((r = m.params) == null ? void 0 : r.prompt) && ((s = m.params) == null || delete s.prompt), bt((n = m.params) == null ? void 0 : n.tag) && ((i = m.params) == null || delete i.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: m });
      const f = yield this.relayer.request(m);
      return this.relayer.events.emit(ut.publish, e), this.logger.debug("Successfully Published Payload"), f;
    });
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach((e, r) => h(this, null, function* () {
      const s = e.attempt + 1;
      this.queue.set(r, bl(va({}, e), { attempt: s }));
      const { topic: n, message: i, opts: o, attestation: a } = e;
      this.logger.warn({}, `Publisher: queue->publishing: ${e.opts.id}, tag: ${e.opts.tag}, attempt: ${s}`), yield this.rpcPublish(bl(va({}, e), { topic: n, message: i, ttl: o.ttl, prompt: o.prompt, tag: o.tag, id: o.id, attestation: a, tvf: o.tvf })), this.logger.warn({}, `Publisher: queue->published: ${e.opts.id}`);
    }));
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(ui.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = !1, this.relayer.events.emit(ut.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(ut.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
}
var rR = Object.defineProperty, sR = (t, e, r) => e in t ? rR(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, An = (t, e, r) => sR(t, typeof e != "symbol" ? e + "" : e, r);
class nR {
  constructor() {
    An(this, "map", /* @__PURE__ */ new Map()), An(this, "set", (e, r) => {
      const s = this.get(e);
      this.exists(e, r) || this.map.set(e, [...s, r]);
    }), An(this, "get", (e) => this.map.get(e) || []), An(this, "exists", (e, r) => this.get(e).includes(r)), An(this, "delete", (e, r) => {
      if (typeof r > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e)) return;
      const s = this.get(e);
      if (!this.exists(e, r)) return;
      const n = s.filter((i) => i !== r);
      if (!n.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, n);
    }), An(this, "clear", () => {
      this.map.clear();
    });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var iR = Object.defineProperty, oR = Object.defineProperties, aR = Object.getOwnPropertyDescriptors, Mp = Object.getOwnPropertySymbols, cR = Object.prototype.hasOwnProperty, lR = Object.prototype.propertyIsEnumerable, wu = (t, e, r) => e in t ? iR(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Ri = (t, e) => {
  for (var r in e || (e = {})) cR.call(e, r) && wu(t, r, e[r]);
  if (Mp) for (var r of Mp(e)) lR.call(e, r) && wu(t, r, e[r]);
  return t;
}, vl = (t, e) => oR(t, aR(e)), Be = (t, e, r) => wu(t, typeof e != "symbol" ? e + "" : e, r);
class uR extends xv {
  constructor(e, r) {
    super(e, r), this.relayer = e, this.logger = r, Be(this, "subscriptions", /* @__PURE__ */ new Map()), Be(this, "topicMap", new nR()), Be(this, "events", new gr.EventEmitter()), Be(this, "name", YN), Be(this, "version", ZN), Be(this, "pending", /* @__PURE__ */ new Map()), Be(this, "cached", []), Be(this, "initialized", !1), Be(this, "storagePrefix", zr), Be(this, "subscribeTimeout", H.toMiliseconds(H.ONE_MINUTE)), Be(this, "initialSubscribeTimeout", H.toMiliseconds(H.ONE_SECOND * 15)), Be(this, "clientId"), Be(this, "batchSubscribeTopicsLimit", 500), Be(this, "init", () => h(this, null, function* () {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), yield this.restore()), this.initialized = !0;
    })), Be(this, "subscribe", (s, n) => h(this, null, function* () {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s, opts: n } });
      try {
        const i = Qa(n), o = { topic: s, relay: i, transportType: n == null ? void 0 : n.transportType };
        this.pending.set(s, o);
        const a = yield this.rpcSubscribe(s, i, n);
        return typeof a == "string" && (this.onSubscribe(a, o), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s, opts: n } })), a;
      } catch (i) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(i), i;
      }
    })), Be(this, "unsubscribe", (s, n) => h(this, null, function* () {
      this.isInitialized(), typeof (n == null ? void 0 : n.id) < "u" ? yield this.unsubscribeById(s, n.id, n) : yield this.unsubscribeByTopic(s, n);
    })), Be(this, "isSubscribed", (s) => new Promise((n) => {
      n(this.topicMap.topics.includes(s));
    })), Be(this, "isKnownTopic", (s) => new Promise((n) => {
      n(this.topicMap.topics.includes(s) || this.pending.has(s) || this.cached.some((i) => i.topic === s));
    })), Be(this, "on", (s, n) => {
      this.events.on(s, n);
    }), Be(this, "once", (s, n) => {
      this.events.once(s, n);
    }), Be(this, "off", (s, n) => {
      this.events.off(s, n);
    }), Be(this, "removeListener", (s, n) => {
      this.events.removeListener(s, n);
    }), Be(this, "start", () => h(this, null, function* () {
      yield this.onConnect();
    })), Be(this, "stop", () => h(this, null, function* () {
      yield this.onDisconnect();
    })), Be(this, "restart", () => h(this, null, function* () {
      yield this.restore(), yield this.onRestart();
    })), Be(this, "checkPending", () => h(this, null, function* () {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const s = [];
      this.pending.forEach((n) => {
        s.push(n);
      }), yield this.batchSubscribe(s);
    })), Be(this, "registerEventListeners", () => {
      this.relayer.core.heartbeat.on(ui.pulse, () => h(this, null, function* () {
        yield this.checkPending();
      })), this.events.on(Xt.created, (s) => h(this, null, function* () {
        const n = Xt.created;
        this.logger.info(`Emitting ${n}`), this.logger.debug({ type: "event", event: n, data: s }), yield this.persist();
      })), this.events.on(Xt.deleted, (s) => h(this, null, function* () {
        const n = Xt.deleted;
        this.logger.info(`Emitting ${n}`), this.logger.debug({ type: "event", event: n, data: s }), yield this.persist();
      }));
    }), this.relayer = e, this.logger = Ot(r, this.name), this.clientId = "";
  }
  get context() {
    return Ht(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  get hasAnyTopics() {
    return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
  }
  hasSubscription(e, r) {
    let s = !1;
    try {
      s = this.getSubscription(e).topic === r;
    } catch (n) {
    }
    return s;
  }
  reset() {
    this.cached = [], this.initialized = !0;
  }
  onDisable() {
    this.values.length > 0 && (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
  }
  unsubscribeByTopic(e, r) {
    return h(this, null, function* () {
      const s = this.topicMap.get(e);
      yield Promise.all(s.map((n) => h(this, null, function* () {
        return yield this.unsubscribeById(e, n, r);
      })));
    });
  }
  unsubscribeById(e, r, s) {
    return h(this, null, function* () {
      this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: r, opts: s } });
      try {
        const n = Qa(s);
        yield this.restartToComplete({ topic: e, id: r, relay: n }), yield this.rpcUnsubscribe(e, r, n);
        const i = Le("USER_DISCONNECTED", `${this.name}, ${e}`);
        yield this.onUnsubscribe(e, r, i), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: r, opts: s } });
      } catch (n) {
        throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(n), n;
      }
    });
  }
  rpcSubscribe(e, r, s) {
    return h(this, null, function* () {
      var n;
      (!s || (s == null ? void 0 : s.transportType) === Ve.relay) && (yield this.restartToComplete({ topic: e, id: e, relay: r }));
      const i = { method: Li(r.protocol).subscribe, params: { topic: e } };
      this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i });
      const o = (n = s == null ? void 0 : s.internal) == null ? void 0 : n.throwOnFailedPublish;
      try {
        const a = yield this.getSubscriptionId(e);
        if ((s == null ? void 0 : s.transportType) === Ve.link_mode) return setTimeout(() => {
          (this.relayer.connected || this.relayer.connecting) && this.relayer.request(i).catch((u) => this.logger.warn(u));
        }, H.toMiliseconds(H.ONE_SECOND)), a;
        const c = new Promise((u) => h(this, null, function* () {
          const d = (p) => {
            p.topic === e && (this.events.removeListener(Xt.created, d), u(p.id));
          };
          this.events.on(Xt.created, d);
          try {
            const p = yield _s(new Promise((g, m) => {
              this.relayer.request(i).catch((f) => {
                this.logger.warn(f, f == null ? void 0 : f.message), m(f);
              }).then(g);
            }), this.initialSubscribeTimeout, `Subscribing to ${e} failed, please try again`);
            this.events.removeListener(Xt.created, d), u(p);
          } catch (p) {
          }
        })), l = yield _s(c, this.subscribeTimeout, `Subscribing to ${e} failed, please try again`);
        if (!l && o) throw new Error(`Subscribing to ${e} failed, please try again`);
        return l ? a : null;
      } catch (a) {
        if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(ut.connection_stalled), o) throw a;
      }
      return null;
    });
  }
  rpcBatchSubscribe(e) {
    return h(this, null, function* () {
      if (!e.length) return;
      const r = e[0].relay, s = { method: Li(r.protocol).batchSubscribe, params: { topics: e.map((n) => n.topic) } };
      this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s });
      try {
        yield yield _s(new Promise((n) => {
          this.relayer.request(s).catch((i) => this.logger.warn(i)).then(n);
        }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
      } catch (n) {
        this.relayer.events.emit(ut.connection_stalled);
      }
    });
  }
  rpcBatchFetchMessages(e) {
    return h(this, null, function* () {
      if (!e.length) return;
      const r = e[0].relay, s = { method: Li(r.protocol).batchFetchMessages, params: { topics: e.map((i) => i.topic) } };
      this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s });
      let n;
      try {
        n = yield yield _s(new Promise((i, o) => {
          this.relayer.request(s).catch((a) => {
            this.logger.warn(a), o(a);
          }).then(i);
        }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
      } catch (i) {
        this.relayer.events.emit(ut.connection_stalled);
      }
      return n;
    });
  }
  rpcUnsubscribe(e, r, s) {
    const n = { method: Li(s.protocol).unsubscribe, params: { topic: e, id: r } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n }), this.relayer.request(n);
  }
  onSubscribe(e, r) {
    this.setSubscription(e, vl(Ri({}, r), { id: e })), this.pending.delete(r.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((r) => {
      this.setSubscription(r.id, Ri({}, r)), this.pending.delete(r.topic);
    });
  }
  onUnsubscribe(e, r, s) {
    return h(this, null, function* () {
      this.events.removeAllListeners(r), this.hasSubscription(r, e) && this.deleteSubscription(r, s), yield this.relayer.messages.del(e);
    });
  }
  setRelayerSubscriptions(e) {
    return h(this, null, function* () {
      yield this.relayer.core.storage.setItem(this.storageKey, e);
    });
  }
  getRelayerSubscriptions() {
    return h(this, null, function* () {
      return yield this.relayer.core.storage.getItem(this.storageKey);
    });
  }
  setSubscription(e, r) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: r }), this.addSubscription(e, r);
  }
  addSubscription(e, r) {
    this.subscriptions.set(e, Ri({}, r)), this.topicMap.set(r.topic, e), this.events.emit(Xt.created, r);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const r = this.subscriptions.get(e);
    if (!r) {
      const { message: s } = V("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s);
    }
    return r;
  }
  deleteSubscription(e, r) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: r });
    const s = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(s.topic, e), this.events.emit(Xt.deleted, vl(Ri({}, s), { reason: r }));
  }
  persist() {
    return h(this, null, function* () {
      yield this.setRelayerSubscriptions(this.values), this.events.emit(Xt.sync);
    });
  }
  onRestart() {
    return h(this, null, function* () {
      if (this.cached.length) {
        const e = [...this.cached], r = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
        for (let s = 0; s < r; s++) {
          const n = e.splice(0, this.batchSubscribeTopicsLimit);
          yield this.batchSubscribe(n);
        }
      }
      this.events.emit(Xt.resubscribed);
    });
  }
  restore() {
    return h(this, null, function* () {
      try {
        const e = yield this.getRelayerSubscriptions();
        if (typeof e > "u" || !e.length) return;
        if (this.subscriptions.size) {
          const { message: r } = V("RESTORE_WILL_OVERRIDE", this.name);
          throw this.logger.error(r), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(r);
        }
        this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
      } catch (e) {
        this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
      }
    });
  }
  batchSubscribe(e) {
    return h(this, null, function* () {
      e.length && (yield this.rpcBatchSubscribe(e), this.onBatchSubscribe(yield Promise.all(e.map((r) => h(this, null, function* () {
        return vl(Ri({}, r), { id: yield this.getSubscriptionId(r.topic) });
      })))));
    });
  }
  batchFetchMessages(e) {
    return h(this, null, function* () {
      if (!e.length) return;
      this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
      const r = yield this.rpcBatchFetchMessages(e);
      r && r.messages && (yield nA(H.toMiliseconds(H.ONE_SECOND)), yield this.relayer.handleBatchMessageEvents(r.messages));
    });
  }
  onConnect() {
    return h(this, null, function* () {
      yield this.restart(), this.reset();
    });
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = V("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  restartToComplete(e) {
    return h(this, null, function* () {
      !this.relayer.connected && !this.relayer.connecting && (this.cached.push(e), yield this.relayer.transportOpen());
    });
  }
  getClientId() {
    return h(this, null, function* () {
      return this.clientId || (this.clientId = yield this.relayer.core.crypto.getClientId()), this.clientId;
    });
  }
  getSubscriptionId(e) {
    return h(this, null, function* () {
      return Fr(e + (yield this.getClientId()));
    });
  }
}
var dR = Object.defineProperty, Fp = Object.getOwnPropertySymbols, hR = Object.prototype.hasOwnProperty, pR = Object.prototype.propertyIsEnumerable, yu = (t, e, r) => e in t ? dR(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Bp = (t, e) => {
  for (var r in e || (e = {})) hR.call(e, r) && yu(t, r, e[r]);
  if (Fp) for (var r of Fp(e)) pR.call(e, r) && yu(t, r, e[r]);
  return t;
}, Ne = (t, e, r) => yu(t, typeof e != "symbol" ? e + "" : e, r);
class fR extends Rv {
  constructor(e) {
    super(e), Ne(this, "protocol", "wc"), Ne(this, "version", 2), Ne(this, "core"), Ne(this, "logger"), Ne(this, "events", new gr.EventEmitter()), Ne(this, "provider"), Ne(this, "messages"), Ne(this, "subscriber"), Ne(this, "publisher"), Ne(this, "name", WN), Ne(this, "transportExplicitlyClosed", !1), Ne(this, "initialized", !1), Ne(this, "connectionAttemptInProgress", !1), Ne(this, "relayUrl"), Ne(this, "projectId"), Ne(this, "packageName"), Ne(this, "bundleId"), Ne(this, "hasExperiencedNetworkDisruption", !1), Ne(this, "pingTimeout"), Ne(this, "heartBeatTimeout", H.toMiliseconds(H.THIRTY_SECONDS + H.FIVE_SECONDS)), Ne(this, "reconnectTimeout"), Ne(this, "connectPromise"), Ne(this, "reconnectInProgress", !1), Ne(this, "requestsInFlight", []), Ne(this, "connectTimeout", H.toMiliseconds(H.ONE_SECOND * 15)), Ne(this, "request", (r) => h(this, null, function* () {
      var s, n;
      this.logger.debug("Publishing Request Payload");
      const i = r.id || Vs().toString();
      yield this.toEstablishConnection();
      try {
        this.logger.trace({ id: i, method: r.method, topic: (s = r.params) == null ? void 0 : s.topic }, "relayer.request - publishing...");
        const o = `${i}:${((n = r.params) == null ? void 0 : n.tag) || ""}`;
        this.requestsInFlight.push(o);
        const a = yield this.provider.request(r);
        return this.requestsInFlight = this.requestsInFlight.filter((c) => c !== o), a;
      } catch (o) {
        throw this.logger.debug(`Failed to Publish Request: ${i}`), o;
      }
    })), Ne(this, "resetPingTimeout", () => {
      Ja() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
        var r, s, n, i;
        try {
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (i = (n = (s = (r = this.provider) == null ? void 0 : r.connection) == null ? void 0 : s.socket) == null ? void 0 : n.terminate) == null || i.call(n);
        } catch (o) {
          this.logger.warn(o, o == null ? void 0 : o.message);
        }
      }, this.heartBeatTimeout));
    }), Ne(this, "onPayloadHandler", (r) => {
      this.onProviderPayload(r), this.resetPingTimeout();
    }), Ne(this, "onConnectHandler", () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(ut.connect);
    }), Ne(this, "onDisconnectHandler", () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }), Ne(this, "onProviderErrorHandler", (r) => {
      this.logger.fatal(`Fatal socket error: ${r.message}`), this.events.emit(ut.error, r), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }), Ne(this, "registerProviderListeners", () => {
      this.provider.on(ar.payload, this.onPayloadHandler), this.provider.on(ar.connect, this.onConnectHandler), this.provider.on(ar.disconnect, this.onDisconnectHandler), this.provider.on(ar.error, this.onProviderErrorHandler);
    }), this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? Ot(e.logger, this.name) : Vo(di({ level: e.logger || zN })), this.messages = new YO(this.logger, e.core), this.subscriber = new uR(this, this.logger), this.publisher = new tR(this, this.logger), this.relayUrl = (e == null ? void 0 : e.relayUrl) || ew, this.projectId = e.projectId, q1() ? this.packageName = Dh() : z1() && (this.bundleId = Dh()), this.provider = {};
  }
  init() {
    return h(this, null, function* () {
      if (this.logger.trace("Initialized"), this.registerEventListeners(), yield Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = !0, this.subscriber.hasAnyTopics) try {
        yield this.transportOpen();
      } catch (e) {
        this.logger.warn(e, e == null ? void 0 : e.message);
      }
    });
  }
  get context() {
    return Ht(this.logger);
  }
  get connected() {
    var e, r, s;
    return ((s = (r = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : r.socket) == null ? void 0 : s.readyState) === 1 || !1;
  }
  get connecting() {
    var e, r, s;
    return ((s = (r = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : r.socket) == null ? void 0 : s.readyState) === 0 || this.connectPromise !== void 0 || !1;
  }
  publish(e, r, s) {
    return h(this, null, function* () {
      this.isInitialized(), yield this.publisher.publish(e, r, s), yield this.recordMessageEvent({ topic: e, message: r, publishedAt: Date.now(), transportType: Ve.relay }, Ma.outbound);
    });
  }
  subscribe(e, r) {
    return h(this, null, function* () {
      var s, n, i;
      this.isInitialized(), (!(r != null && r.transportType) || (r == null ? void 0 : r.transportType) === "relay") && (yield this.toEstablishConnection());
      const o = typeof ((s = r == null ? void 0 : r.internal) == null ? void 0 : s.throwOnFailedPublish) > "u" ? !0 : (n = r == null ? void 0 : r.internal) == null ? void 0 : n.throwOnFailedPublish;
      let a = ((i = this.subscriber.topicMap.get(e)) == null ? void 0 : i[0]) || "", c;
      const l = (u) => {
        u.topic === e && (this.subscriber.off(Xt.created, l), c());
      };
      return yield Promise.all([new Promise((u) => {
        c = u, this.subscriber.on(Xt.created, l);
      }), new Promise((u, d) => h(this, null, function* () {
        a = (yield this.subscriber.subscribe(e, Bp({ internal: { throwOnFailedPublish: o } }, r)).catch((p) => {
          o && d(p);
        })) || a, u();
      }))]), a;
    });
  }
  unsubscribe(e, r) {
    return h(this, null, function* () {
      this.isInitialized(), yield this.subscriber.unsubscribe(e, r);
    });
  }
  on(e, r) {
    this.events.on(e, r);
  }
  once(e, r) {
    this.events.once(e, r);
  }
  off(e, r) {
    this.events.off(e, r);
  }
  removeListener(e, r) {
    this.events.removeListener(e, r);
  }
  transportDisconnect() {
    return h(this, null, function* () {
      this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? yield _s(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
    });
  }
  transportClose() {
    return h(this, null, function* () {
      this.transportExplicitlyClosed = !0, yield this.transportDisconnect();
    });
  }
  transportOpen(e) {
    return h(this, null, function* () {
      if (!this.subscriber.hasAnyTopics) {
        this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");
        return;
      }
      if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), yield this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise((r, s) => h(this, null, function* () {
        yield this.connect(e).then(r).catch(s).finally(() => {
          this.connectPromise = void 0;
        });
      })), yield this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
    });
  }
  restartTransport(e) {
    return h(this, null, function* () {
      this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, yield this.confirmOnlineStateOrThrow(), yield this.transportClose(), yield this.transportOpen());
    });
  }
  confirmOnlineStateOrThrow() {
    return h(this, null, function* () {
      if (!(yield yp())) throw new Error("No internet connection detected. Please restart your network and try again.");
    });
  }
  handleBatchMessageEvents(e) {
    return h(this, null, function* () {
      if ((e == null ? void 0 : e.length) === 0) {
        this.logger.trace("Batch message events is empty. Ignoring...");
        return;
      }
      const r = e.sort((s, n) => s.publishedAt - n.publishedAt);
      this.logger.debug(`Batch of ${r.length} message events sorted`);
      for (const s of r) try {
        yield this.onMessageEvent(s);
      } catch (n) {
        this.logger.warn(n, "Error while processing batch message event: " + (n == null ? void 0 : n.message));
      }
      this.logger.trace(`Batch of ${r.length} message events processed`);
    });
  }
  onLinkMessageEvent(e, r) {
    return h(this, null, function* () {
      const { topic: s } = e;
      if (!r.sessionExists) {
        const n = nt(H.FIVE_MINUTES), i = { topic: s, expiry: n, relay: { protocol: "irn" }, active: !1 };
        yield this.core.pairing.pairings.set(s, i);
      }
      this.events.emit(ut.message, e), yield this.recordMessageEvent(e, Ma.inbound);
    });
  }
  connect(e) {
    return h(this, null, function* () {
      yield this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, yield this.transportDisconnect()), this.connectionAttemptInProgress = !0, this.transportExplicitlyClosed = !1;
      let r = 1;
      for (; r < 6; ) {
        try {
          if (this.transportExplicitlyClosed) break;
          this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${r}...`), yield this.createProvider(), yield new Promise((s, n) => h(this, null, function* () {
            const i = () => {
              n(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(ar.disconnect, i), yield _s(new Promise((o, a) => {
              this.provider.connect().then(o).catch(a);
            }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o) => {
              n(o);
            }).finally(() => {
              this.provider.off(ar.disconnect, i), clearTimeout(this.reconnectTimeout);
            }), yield new Promise((o, a) => h(this, null, function* () {
              const c = () => {
                a(new Error("Connection interrupted while trying to subscribe"));
              };
              this.provider.once(ar.disconnect, c), yield this.subscriber.start().then(o).catch(a).finally(() => {
                this.provider.off(ar.disconnect, c);
              });
            })), this.hasExperiencedNetworkDisruption = !1, s();
          }));
        } catch (s) {
          yield this.subscriber.stop();
          const n = s;
          this.logger.warn({}, n.message), this.hasExperiencedNetworkDisruption = !0;
        } finally {
          this.connectionAttemptInProgress = !1;
        }
        if (this.connected) {
          this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${r}`);
          break;
        }
        yield new Promise((s) => setTimeout(s, H.toMiliseconds(r * 1))), r++;
      }
    });
  }
  startPingTimeout() {
    var e, r, s, n, i;
    if (Ja()) try {
      (r = (e = this.provider) == null ? void 0 : e.connection) != null && r.socket && ((i = (n = (s = this.provider) == null ? void 0 : s.connection) == null ? void 0 : n.socket) == null || i.on("ping", () => {
        this.resetPingTimeout();
      })), this.resetPingTimeout();
    } catch (o) {
      this.logger.warn(o, o == null ? void 0 : o.message);
    }
  }
  createProvider() {
    return h(this, null, function* () {
      this.provider.connection && this.unregisterProviderListeners();
      const e = yield this.core.crypto.signJWT(this.relayUrl);
      this.provider = new mr(new DN(G1({ sdkVersion: hu, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: !0, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
    });
  }
  recordMessageEvent(e, r) {
    return h(this, null, function* () {
      const { topic: s, message: n } = e;
      yield this.messages.set(s, n, r);
    });
  }
  shouldIgnoreMessageEvent(e) {
    return h(this, null, function* () {
      const { topic: r, message: s } = e;
      if (!s || s.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${s}`), !0;
      if (!(yield this.subscriber.isKnownTopic(r))) return this.logger.warn(`Ignoring message for unknown topic ${r}`), !0;
      const n = this.messages.has(r, s);
      return n && this.logger.warn(`Ignoring duplicate message: ${s}`), n;
    });
  }
  onProviderPayload(e) {
    return h(this, null, function* () {
      if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), td(e)) {
        if (!e.method.endsWith(HN)) return;
        const r = e.params, { topic: s, message: n, publishedAt: i, attestation: o } = r.data, a = { topic: s, message: n, publishedAt: i, transportType: Ve.relay, attestation: o };
        this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Bp({ type: "event", event: r.id }, a)), this.events.emit(r.id, a), yield this.acknowledgePayload(e), yield this.onMessageEvent(a);
      } else Oc(e) && this.events.emit(ut.message_ack, e);
    });
  }
  onMessageEvent(e) {
    return h(this, null, function* () {
      (yield this.shouldIgnoreMessageEvent(e)) || (yield this.recordMessageEvent(e, Ma.inbound), this.events.emit(ut.message, e));
    });
  }
  acknowledgePayload(e) {
    return h(this, null, function* () {
      const r = Nc(e.id, !0);
      yield this.provider.connection.send(r);
    });
  }
  unregisterProviderListeners() {
    this.provider.off(ar.payload, this.onPayloadHandler), this.provider.off(ar.connect, this.onConnectHandler), this.provider.off(ar.disconnect, this.onDisconnectHandler), this.provider.off(ar.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  registerEventListeners() {
    return h(this, null, function* () {
      let e = yield yp();
      cN((r) => h(this, null, function* () {
        e !== r && (e = r, r ? yield this.transportOpen().catch((s) => this.logger.error(s, s == null ? void 0 : s.message)) : (this.hasExperiencedNetworkDisruption = !0, yield this.transportDisconnect(), this.transportExplicitlyClosed = !1));
      }));
    });
  }
  onProviderDisconnect() {
    return h(this, null, function* () {
      clearTimeout(this.pingTimeout), this.events.emit(ut.disconnect), this.connectionAttemptInProgress = !1, !this.reconnectInProgress && (this.reconnectInProgress = !0, yield this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(() => h(this, null, function* () {
        yield this.transportOpen().catch((e) => this.logger.error(e, e == null ? void 0 : e.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = !1;
      }), H.toMiliseconds(VN)))));
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = V("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  toEstablishConnection() {
    return h(this, null, function* () {
      if (yield this.confirmOnlineStateOrThrow(), !this.connected) {
        if (this.connectPromise) {
          yield this.connectPromise;
          return;
        }
        yield this.connect();
      }
    });
  }
}
function gR() {
}
function jp(t) {
  if (!t || typeof t != "object") return !1;
  const e = Object.getPrototypeOf(t);
  return e === null || e === Object.prototype || Object.getPrototypeOf(e) === null ? Object.prototype.toString.call(t) === "[object Object]" : !1;
}
function qp(t) {
  return Object.getOwnPropertySymbols(t).filter((e) => Object.prototype.propertyIsEnumerable.call(t, e));
}
function zp(t) {
  return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t);
}
const mR = "[object RegExp]", wR = "[object String]", yR = "[object Number]", bR = "[object Boolean]", Wp = "[object Arguments]", vR = "[object Symbol]", ER = "[object Date]", _R = "[object Map]", CR = "[object Set]", AR = "[object Array]", SR = "[object Function]", IR = "[object ArrayBuffer]", El = "[object Object]", NR = "[object Error]", TR = "[object DataView]", OR = "[object Uint8Array]", RR = "[object Uint8ClampedArray]", PR = "[object Uint16Array]", xR = "[object Uint32Array]", DR = "[object BigUint64Array]", kR = "[object Int8Array]", $R = "[object Int16Array]", UR = "[object Int32Array]", LR = "[object BigInt64Array]", MR = "[object Float32Array]", FR = "[object Float64Array]";
function BR(t, e) {
  return t === e || Number.isNaN(t) && Number.isNaN(e);
}
function jR(t, e, r) {
  return Fi(t, e, void 0, void 0, void 0, void 0, r);
}
function Fi(t, e, r, s, n, i, o) {
  const a = o(t, e, r, s, n, i);
  if (a !== void 0) return a;
  if (typeof t == typeof e) switch (typeof t) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return t === e;
    case "number":
      return t === e || Object.is(t, e);
    case "function":
      return t === e;
    case "object":
      return Hi(t, e, i, o);
  }
  return Hi(t, e, i, o);
}
function Hi(t, e, r, s) {
  if (Object.is(t, e)) return !0;
  let n = zp(t), i = zp(e);
  if (n === Wp && (n = El), i === Wp && (i = El), n !== i) return !1;
  switch (n) {
    case wR:
      return t.toString() === e.toString();
    case yR: {
      const c = t.valueOf(), l = e.valueOf();
      return BR(c, l);
    }
    case bR:
    case ER:
    case vR:
      return Object.is(t.valueOf(), e.valueOf());
    case mR:
      return t.source === e.source && t.flags === e.flags;
    case SR:
      return t === e;
  }
  r = r != null ? r : /* @__PURE__ */ new Map();
  const o = r.get(t), a = r.get(e);
  if (o != null && a != null) return o === e;
  r.set(t, e), r.set(e, t);
  try {
    switch (n) {
      case _R: {
        if (t.size !== e.size) return !1;
        for (const [c, l] of t.entries()) if (!e.has(c) || !Fi(l, e.get(c), c, t, e, r, s)) return !1;
        return !0;
      }
      case CR: {
        if (t.size !== e.size) return !1;
        const c = Array.from(t.values()), l = Array.from(e.values());
        for (let u = 0; u < c.length; u++) {
          const d = c[u], p = l.findIndex((g) => Fi(d, g, void 0, t, e, r, s));
          if (p === -1) return !1;
          l.splice(p, 1);
        }
        return !0;
      }
      case AR:
      case OR:
      case RR:
      case PR:
      case xR:
      case DR:
      case kR:
      case $R:
      case UR:
      case LR:
      case MR:
      case FR: {
        if (typeof Buffer < "u" && Buffer.isBuffer(t) !== Buffer.isBuffer(e) || t.length !== e.length) return !1;
        for (let c = 0; c < t.length; c++) if (!Fi(t[c], e[c], c, t, e, r, s)) return !1;
        return !0;
      }
      case IR:
        return t.byteLength !== e.byteLength ? !1 : Hi(new Uint8Array(t), new Uint8Array(e), r, s);
      case TR:
        return t.byteLength !== e.byteLength || t.byteOffset !== e.byteOffset ? !1 : Hi(new Uint8Array(t), new Uint8Array(e), r, s);
      case NR:
        return t.name === e.name && t.message === e.message;
      case El: {
        if (!(Hi(t.constructor, e.constructor, r, s) || jp(t) && jp(e))) return !1;
        const c = [...Object.keys(t), ...qp(t)], l = [...Object.keys(e), ...qp(e)];
        if (c.length !== l.length) return !1;
        for (let u = 0; u < c.length; u++) {
          const d = c[u], p = t[d];
          if (!Object.hasOwn(e, d)) return !1;
          const g = e[d];
          if (!Fi(p, g, d, t, e, r, s)) return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    r.delete(t), r.delete(e);
  }
}
function qR(t, e) {
  return jR(t, e, gR);
}
var zR = Object.defineProperty, Hp = Object.getOwnPropertySymbols, WR = Object.prototype.hasOwnProperty, HR = Object.prototype.propertyIsEnumerable, bu = (t, e, r) => e in t ? zR(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Vp = (t, e) => {
  for (var r in e || (e = {})) WR.call(e, r) && bu(t, r, e[r]);
  if (Hp) for (var r of Hp(e)) HR.call(e, r) && bu(t, r, e[r]);
  return t;
}, Ut = (t, e, r) => bu(t, typeof e != "symbol" ? e + "" : e, r);
class mn extends Pv {
  constructor(e, r, s, n = zr, i = void 0) {
    super(e, r, s, n), this.core = e, this.logger = r, this.name = s, Ut(this, "map", /* @__PURE__ */ new Map()), Ut(this, "version", KN), Ut(this, "cached", []), Ut(this, "initialized", !1), Ut(this, "getKey"), Ut(this, "storagePrefix", zr), Ut(this, "recentlyDeleted", []), Ut(this, "recentlyDeletedLimit", 200), Ut(this, "init", () => h(this, null, function* () {
      this.initialized || (this.logger.trace("Initialized"), yield this.restore(), this.cached.forEach((o) => {
        this.getKey && o !== null && !bt(o) ? this.map.set(this.getKey(o), o) : FI(o) ? this.map.set(o.id, o) : BI(o) && this.map.set(o.topic, o);
      }), this.cached = [], this.initialized = !0);
    })), Ut(this, "set", (o, a) => h(this, null, function* () {
      this.isInitialized(), this.map.has(o) ? yield this.update(o, a) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o, value: a }), this.map.set(o, a), yield this.persist());
    })), Ut(this, "get", (o) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o }), this.getData(o))), Ut(this, "getAll", (o) => (this.isInitialized(), o ? this.values.filter((a) => Object.keys(o).every((c) => qR(a[c], o[c]))) : this.values)), Ut(this, "update", (o, a) => h(this, null, function* () {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o, update: a });
      const c = Vp(Vp({}, this.getData(o)), a);
      this.map.set(o, c), yield this.persist();
    })), Ut(this, "delete", (o, a) => h(this, null, function* () {
      this.isInitialized(), this.map.has(o) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o, reason: a }), this.map.delete(o), this.addToRecentlyDeleted(o), yield this.persist());
    })), this.logger = Ot(r, this.name), this.storagePrefix = n, this.getKey = i;
  }
  get context() {
    return Ht(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e) {
    this.recentlyDeleted.push(e), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  setDataStore(e) {
    return h(this, null, function* () {
      yield this.core.storage.setItem(this.storageKey, e);
    });
  }
  getDataStore() {
    return h(this, null, function* () {
      return yield this.core.storage.getItem(this.storageKey);
    });
  }
  getData(e) {
    const r = this.map.get(e);
    if (!r) {
      if (this.recentlyDeleted.includes(e)) {
        const { message: n } = V("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
        throw this.logger.error(n), new Error(n);
      }
      const { message: s } = V("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(s), new Error(s);
    }
    return r;
  }
  persist() {
    return h(this, null, function* () {
      yield this.setDataStore(this.values);
    });
  }
  restore() {
    return h(this, null, function* () {
      try {
        const e = yield this.getDataStore();
        if (typeof e > "u" || !e.length) return;
        if (this.map.size) {
          const { message: r } = V("RESTORE_WILL_OVERRIDE", this.name);
          throw this.logger.error(r), new Error(r);
        }
        this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
      } catch (e) {
        this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
      }
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = V("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var VR = Object.defineProperty, KR = (t, e, r) => e in t ? VR(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, _e = (t, e, r) => KR(t, typeof e != "symbol" ? e + "" : e, r);
class GR {
  constructor(e, r) {
    this.core = e, this.logger = r, _e(this, "name", JN), _e(this, "version", XN), _e(this, "events", new ku()), _e(this, "pairings"), _e(this, "initialized", !1), _e(this, "storagePrefix", zr), _e(this, "ignoredPayloadTypes", [os]), _e(this, "registeredMethods", []), _e(this, "init", () => h(this, null, function* () {
      this.initialized || (yield this.pairings.init(), yield this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
    })), _e(this, "register", ({ methods: s }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...s])];
    }), _e(this, "create", (s) => h(this, null, function* () {
      this.isInitialized();
      const n = uu(), i = yield this.core.crypto.setSymKey(n), o = nt(H.FIVE_MINUTES), a = { protocol: Qm }, c = { topic: i, expiry: o, relay: a, active: !1, methods: s == null ? void 0 : s.methods }, l = hp({ protocol: this.core.protocol, version: this.core.version, topic: i, symKey: n, relay: a, expiryTimestamp: o, methods: s == null ? void 0 : s.methods });
      return this.events.emit(zs.create, c), this.core.expirer.set(i, o), yield this.pairings.set(i, c), yield this.core.relayer.subscribe(i, { transportType: s == null ? void 0 : s.transportType }), { topic: i, uri: l };
    })), _e(this, "pair", (s) => h(this, null, function* () {
      this.isInitialized();
      const n = this.core.eventClient.createEvent({ properties: { topic: s == null ? void 0 : s.uri, trace: [$r.pairing_started] } });
      this.isValidPair(s, n);
      const { topic: i, symKey: o, relay: a, expiryTimestamp: c, methods: l } = dp(s.uri);
      n.props.properties.topic = i, n.addTrace($r.pairing_uri_validation_success), n.addTrace($r.pairing_uri_not_expired);
      let u;
      if (this.pairings.keys.includes(i)) {
        if (u = this.pairings.get(i), n.addTrace($r.existing_pairing), u.active) throw n.setError(es.active_pairing_already_exists), new Error(`Pairing already exists: ${i}. Please try again with a new connection URI.`);
        n.addTrace($r.pairing_not_expired);
      }
      const d = c || nt(H.FIVE_MINUTES), p = { topic: i, relay: a, expiry: d, active: !1, methods: l };
      this.core.expirer.set(i, d), yield this.pairings.set(i, p), n.addTrace($r.store_new_pairing), s.activatePairing && (yield this.activate({ topic: i })), this.events.emit(zs.create, p), n.addTrace($r.emit_inactive_pairing), this.core.crypto.keychain.has(i) || (yield this.core.crypto.setSymKey(o, i)), n.addTrace($r.subscribing_pairing_topic);
      try {
        yield this.core.relayer.confirmOnlineStateOrThrow();
      } catch (g) {
        n.setError(es.no_internet_connection);
      }
      try {
        yield this.core.relayer.subscribe(i, { relay: a });
      } catch (g) {
        throw n.setError(es.subscribe_pairing_topic_failure), g;
      }
      return n.addTrace($r.subscribe_pairing_topic_success), p;
    })), _e(this, "activate", (n) => h(this, [n], function* ({ topic: s }) {
      this.isInitialized();
      const i = nt(H.FIVE_MINUTES);
      this.core.expirer.set(s, i), yield this.pairings.update(s, { active: !0, expiry: i });
    })), _e(this, "ping", (s) => h(this, null, function* () {
      this.isInitialized(), yield this.isValidPing(s), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: n } = s;
      if (this.pairings.keys.includes(n)) {
        const i = yield this.sendRequest(n, "wc_pairingPing", {}), { done: o, resolve: a, reject: c } = Fs();
        this.events.once(Pe("pairing_ping", i), ({ error: l }) => {
          l ? c(l) : a();
        }), yield o();
      }
    })), _e(this, "updateExpiry", (i) => h(this, [i], function* ({ topic: s, expiry: n }) {
      this.isInitialized(), yield this.pairings.update(s, { expiry: n });
    })), _e(this, "updateMetadata", (i) => h(this, [i], function* ({ topic: s, metadata: n }) {
      this.isInitialized(), yield this.pairings.update(s, { peerMetadata: n });
    })), _e(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), _e(this, "disconnect", (s) => h(this, null, function* () {
      this.isInitialized(), yield this.isValidDisconnect(s);
      const { topic: n } = s;
      this.pairings.keys.includes(n) && (yield this.sendRequest(n, "wc_pairingDelete", Le("USER_DISCONNECTED")), yield this.deletePairing(n));
    })), _e(this, "formatUriFromPairing", (s) => {
      this.isInitialized();
      const { topic: n, relay: i, expiry: o, methods: a } = s, c = this.core.crypto.keychain.get(n);
      return hp({ protocol: this.core.protocol, version: this.core.version, topic: n, symKey: c, relay: i, expiryTimestamp: o, methods: a });
    }), _e(this, "sendRequest", (s, n, i) => h(this, null, function* () {
      const o = Cs(n, i), a = yield this.core.crypto.encode(s, o), c = Ti[n].req;
      return this.core.history.set(s, o), this.core.relayer.publish(s, a, c), o.id;
    })), _e(this, "sendResult", (s, n, i) => h(this, null, function* () {
      const o = Nc(s, i), a = yield this.core.crypto.encode(n, o), c = (yield this.core.history.get(n, s)).request.method, l = Ti[c].res;
      yield this.core.relayer.publish(n, a, l), yield this.core.history.resolve(o);
    })), _e(this, "sendError", (s, n, i) => h(this, null, function* () {
      const o = Tc(s, i), a = yield this.core.crypto.encode(n, o), c = (yield this.core.history.get(n, s)).request.method, l = Ti[c] ? Ti[c].res : Ti.unregistered_method.res;
      yield this.core.relayer.publish(n, a, l), yield this.core.history.resolve(o);
    })), _e(this, "deletePairing", (s, n) => h(this, null, function* () {
      yield this.core.relayer.unsubscribe(s), yield Promise.all([this.pairings.delete(s, Le("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(s), n ? Promise.resolve() : this.core.expirer.del(s)]);
    })), _e(this, "cleanup", () => h(this, null, function* () {
      const s = this.pairings.getAll().filter((n) => ys(n.expiry));
      yield Promise.all(s.map((n) => this.deletePairing(n.topic)));
    })), _e(this, "onRelayEventRequest", (s) => h(this, null, function* () {
      const { topic: n, payload: i } = s;
      switch (i.method) {
        case "wc_pairingPing":
          return yield this.onPairingPingRequest(n, i);
        case "wc_pairingDelete":
          return yield this.onPairingDeleteRequest(n, i);
        default:
          return yield this.onUnknownRpcMethodRequest(n, i);
      }
    })), _e(this, "onRelayEventResponse", (s) => h(this, null, function* () {
      const { topic: n, payload: i } = s, o = (yield this.core.history.get(n, i.id)).request.method;
      switch (o) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(n, i);
        default:
          return this.onUnknownRpcMethodResponse(o);
      }
    })), _e(this, "onPairingPingRequest", (s, n) => h(this, null, function* () {
      const { id: i } = n;
      try {
        this.isValidPing({ topic: s }), yield this.sendResult(i, s, !0), this.events.emit(zs.ping, { id: i, topic: s });
      } catch (o) {
        yield this.sendError(i, s, o), this.logger.error(o);
      }
    })), _e(this, "onPairingPingResponse", (s, n) => {
      const { id: i } = n;
      setTimeout(() => {
        Lr(n) ? this.events.emit(Pe("pairing_ping", i), {}) : pr(n) && this.events.emit(Pe("pairing_ping", i), { error: n.error });
      }, 500);
    }), _e(this, "onPairingDeleteRequest", (s, n) => h(this, null, function* () {
      const { id: i } = n;
      try {
        this.isValidDisconnect({ topic: s }), yield this.deletePairing(s), this.events.emit(zs.delete, { id: i, topic: s });
      } catch (o) {
        yield this.sendError(i, s, o), this.logger.error(o);
      }
    })), _e(this, "onUnknownRpcMethodRequest", (s, n) => h(this, null, function* () {
      const { id: i, method: o } = n;
      try {
        if (this.registeredMethods.includes(o)) return;
        const a = Le("WC_METHOD_UNSUPPORTED", o);
        yield this.sendError(i, s, a), this.logger.error(a);
      } catch (a) {
        yield this.sendError(i, s, a), this.logger.error(a);
      }
    })), _e(this, "onUnknownRpcMethodResponse", (s) => {
      this.registeredMethods.includes(s) || this.logger.error(Le("WC_METHOD_UNSUPPORTED", s));
    }), _e(this, "isValidPair", (s, n) => {
      var i;
      if (!Bt(s)) {
        const { message: a } = V("MISSING_OR_INVALID", `pair() params: ${s}`);
        throw n.setError(es.malformed_pairing_uri), new Error(a);
      }
      if (!MI(s.uri)) {
        const { message: a } = V("MISSING_OR_INVALID", `pair() uri: ${s.uri}`);
        throw n.setError(es.malformed_pairing_uri), new Error(a);
      }
      const o = dp(s == null ? void 0 : s.uri);
      if (!((i = o == null ? void 0 : o.relay) != null && i.protocol)) {
        const { message: a } = V("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw n.setError(es.malformed_pairing_uri), new Error(a);
      }
      if (!(o != null && o.symKey)) {
        const { message: a } = V("MISSING_OR_INVALID", "pair() uri#symKey");
        throw n.setError(es.malformed_pairing_uri), new Error(a);
      }
      if (o != null && o.expiryTimestamp && H.toMiliseconds(o == null ? void 0 : o.expiryTimestamp) < Date.now()) {
        n.setError(es.pairing_expired);
        const { message: a } = V("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a);
      }
    }), _e(this, "isValidPing", (s) => h(this, null, function* () {
      if (!Bt(s)) {
        const { message: i } = V("MISSING_OR_INVALID", `ping() params: ${s}`);
        throw new Error(i);
      }
      const { topic: n } = s;
      yield this.isValidPairingTopic(n);
    })), _e(this, "isValidDisconnect", (s) => h(this, null, function* () {
      if (!Bt(s)) {
        const { message: i } = V("MISSING_OR_INVALID", `disconnect() params: ${s}`);
        throw new Error(i);
      }
      const { topic: n } = s;
      yield this.isValidPairingTopic(n);
    })), _e(this, "isValidPairingTopic", (s) => h(this, null, function* () {
      if (!rt(s, !1)) {
        const { message: n } = V("MISSING_OR_INVALID", `pairing topic should be a string: ${s}`);
        throw new Error(n);
      }
      if (!this.pairings.keys.includes(s)) {
        const { message: n } = V("NO_MATCHING_KEY", `pairing topic doesn't exist: ${s}`);
        throw new Error(n);
      }
      if (ys(this.pairings.get(s).expiry)) {
        yield this.deletePairing(s);
        const { message: n } = V("EXPIRED", `pairing topic: ${s}`);
        throw new Error(n);
      }
    })), this.core = e, this.logger = Ot(r, this.name), this.pairings = new mn(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return Ht(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = V("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(ut.message, (e) => h(this, null, function* () {
      const { topic: r, message: s, transportType: n } = e;
      if (this.pairings.keys.includes(r) && n !== Ve.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(s))) try {
        const i = yield this.core.crypto.decode(r, s);
        td(i) ? (this.core.history.set(r, i), yield this.onRelayEventRequest({ topic: r, payload: i })) : Oc(i) && (yield this.core.history.resolve(i), yield this.onRelayEventResponse({ topic: r, payload: i }), this.core.history.delete(r, i.id)), yield this.core.relayer.messages.ack(r, s);
      } catch (i) {
        this.logger.error(i);
      }
    }));
  }
  registerExpirerEvents() {
    this.core.expirer.on(hr.expired, (e) => h(this, null, function* () {
      const { topic: r } = um(e.target);
      r && this.pairings.keys.includes(r) && (yield this.deletePairing(r, !0), this.events.emit(zs.expire, { topic: r }));
    }));
  }
}
var YR = Object.defineProperty, ZR = (t, e, r) => e in t ? YR(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, wt = (t, e, r) => ZR(t, typeof e != "symbol" ? e + "" : e, r);
class JR extends Nv {
  constructor(e, r) {
    super(e, r), this.core = e, this.logger = r, wt(this, "records", /* @__PURE__ */ new Map()), wt(this, "events", new gr.EventEmitter()), wt(this, "name", QN), wt(this, "version", eT), wt(this, "cached", []), wt(this, "initialized", !1), wt(this, "storagePrefix", zr), wt(this, "init", () => h(this, null, function* () {
      this.initialized || (this.logger.trace("Initialized"), yield this.restore(), this.cached.forEach((s) => this.records.set(s.id, s)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    })), wt(this, "set", (s, n, i) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: s, request: n, chainId: i }), this.records.has(n.id)) return;
      const o = { id: n.id, topic: s, request: { method: n.method, params: n.params || null }, chainId: i, expiry: nt(H.THIRTY_DAYS) };
      this.records.set(o.id, o), this.persist(), this.events.emit(br.created, o);
    }), wt(this, "resolve", (s) => h(this, null, function* () {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: s }), !this.records.has(s.id)) return;
      const n = yield this.getRecord(s.id);
      typeof n.response > "u" && (n.response = pr(s) ? { error: s.error } : { result: s.result }, this.records.set(n.id, n), this.persist(), this.events.emit(br.updated, n));
    })), wt(this, "get", (s, n) => h(this, null, function* () {
      return this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: s, id: n }), yield this.getRecord(n);
    })), wt(this, "delete", (s, n) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: n }), this.values.forEach((i) => {
        if (i.topic === s) {
          if (typeof n < "u" && i.id !== n) return;
          this.records.delete(i.id), this.events.emit(br.deleted, i);
        }
      }), this.persist();
    }), wt(this, "exists", (s, n) => h(this, null, function* () {
      return this.isInitialized(), this.records.has(n) ? (yield this.getRecord(n)).topic === s : !1;
    })), wt(this, "on", (s, n) => {
      this.events.on(s, n);
    }), wt(this, "once", (s, n) => {
      this.events.once(s, n);
    }), wt(this, "off", (s, n) => {
      this.events.off(s, n);
    }), wt(this, "removeListener", (s, n) => {
      this.events.removeListener(s, n);
    }), this.logger = Ot(r, this.name);
  }
  get context() {
    return Ht(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return this.values.forEach((r) => {
      if (typeof r.response < "u") return;
      const s = { topic: r.topic, request: Cs(r.request.method, r.request.params, r.id), chainId: r.chainId };
      return e.push(s);
    }), e;
  }
  setJsonRpcRecords(e) {
    return h(this, null, function* () {
      yield this.core.storage.setItem(this.storageKey, e);
    });
  }
  getJsonRpcRecords() {
    return h(this, null, function* () {
      return yield this.core.storage.getItem(this.storageKey);
    });
  }
  getRecord(e) {
    this.isInitialized();
    const r = this.records.get(e);
    if (!r) {
      const { message: s } = V("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s);
    }
    return r;
  }
  persist() {
    return h(this, null, function* () {
      yield this.setJsonRpcRecords(this.values), this.events.emit(br.sync);
    });
  }
  restore() {
    return h(this, null, function* () {
      try {
        const e = yield this.getJsonRpcRecords();
        if (typeof e > "u" || !e.length) return;
        if (this.records.size) {
          const { message: r } = V("RESTORE_WILL_OVERRIDE", this.name);
          throw this.logger.error(r), new Error(r);
        }
        this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
      } catch (e) {
        this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
      }
    });
  }
  registerEventListeners() {
    this.events.on(br.created, (e) => {
      const r = br.created;
      this.logger.info(`Emitting ${r}`), this.logger.debug({ type: "event", event: r, record: e });
    }), this.events.on(br.updated, (e) => {
      const r = br.updated;
      this.logger.info(`Emitting ${r}`), this.logger.debug({ type: "event", event: r, record: e });
    }), this.events.on(br.deleted, (e) => {
      const r = br.deleted;
      this.logger.info(`Emitting ${r}`), this.logger.debug({ type: "event", event: r, record: e });
    }), this.core.heartbeat.on(ui.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e = !1;
      this.records.forEach((r) => {
        H.toMiliseconds(r.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${r.id}`), this.records.delete(r.id), this.events.emit(br.deleted, r, !1), e = !0);
      }), e && this.persist();
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = V("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var XR = Object.defineProperty, QR = (t, e, r) => e in t ? XR(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, It = (t, e, r) => QR(t, typeof e != "symbol" ? e + "" : e, r);
class eP extends Dv {
  constructor(e, r) {
    super(e, r), this.core = e, this.logger = r, It(this, "expirations", /* @__PURE__ */ new Map()), It(this, "events", new gr.EventEmitter()), It(this, "name", tT), It(this, "version", rT), It(this, "cached", []), It(this, "initialized", !1), It(this, "storagePrefix", zr), It(this, "init", () => h(this, null, function* () {
      this.initialized || (this.logger.trace("Initialized"), yield this.restore(), this.cached.forEach((s) => this.expirations.set(s.target, s)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    })), It(this, "has", (s) => {
      try {
        const n = this.formatTarget(s);
        return typeof this.getExpiration(n) < "u";
      } catch (n) {
        return !1;
      }
    }), It(this, "set", (s, n) => {
      this.isInitialized();
      const i = this.formatTarget(s), o = { target: i, expiry: n };
      this.expirations.set(i, o), this.checkExpiry(i, o), this.events.emit(hr.created, { target: i, expiration: o });
    }), It(this, "get", (s) => {
      this.isInitialized();
      const n = this.formatTarget(s);
      return this.getExpiration(n);
    }), It(this, "del", (s) => {
      if (this.isInitialized(), this.has(s)) {
        const n = this.formatTarget(s), i = this.getExpiration(n);
        this.expirations.delete(n), this.events.emit(hr.deleted, { target: n, expiration: i });
      }
    }), It(this, "on", (s, n) => {
      this.events.on(s, n);
    }), It(this, "once", (s, n) => {
      this.events.once(s, n);
    }), It(this, "off", (s, n) => {
      this.events.off(s, n);
    }), It(this, "removeListener", (s, n) => {
      this.events.removeListener(s, n);
    }), this.logger = Ot(r, this.name);
  }
  get context() {
    return Ht(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string") return Y1(e);
    if (typeof e == "number") return Z1(e);
    const { message: r } = V("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(r);
  }
  setExpirations(e) {
    return h(this, null, function* () {
      yield this.core.storage.setItem(this.storageKey, e);
    });
  }
  getExpirations() {
    return h(this, null, function* () {
      return yield this.core.storage.getItem(this.storageKey);
    });
  }
  persist() {
    return h(this, null, function* () {
      yield this.setExpirations(this.values), this.events.emit(hr.sync);
    });
  }
  restore() {
    return h(this, null, function* () {
      try {
        const e = yield this.getExpirations();
        if (typeof e > "u" || !e.length) return;
        if (this.expirations.size) {
          const { message: r } = V("RESTORE_WILL_OVERRIDE", this.name);
          throw this.logger.error(r), new Error(r);
        }
        this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
      } catch (e) {
        this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
      }
    });
  }
  getExpiration(e) {
    const r = this.expirations.get(e);
    if (!r) {
      const { message: s } = V("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.warn(s), new Error(s);
    }
    return r;
  }
  checkExpiry(e, r) {
    const { expiry: s } = r;
    H.toMiliseconds(s) - Date.now() <= 0 && this.expire(e, r);
  }
  expire(e, r) {
    this.expirations.delete(e), this.events.emit(hr.expired, { target: e, expiration: r });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, r) => this.checkExpiry(r, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(ui.pulse, () => this.checkExpirations()), this.events.on(hr.created, (e) => {
      const r = hr.created;
      this.logger.info(`Emitting ${r}`), this.logger.debug({ type: "event", event: r, data: e }), this.persist();
    }), this.events.on(hr.expired, (e) => {
      const r = hr.expired;
      this.logger.info(`Emitting ${r}`), this.logger.debug({ type: "event", event: r, data: e }), this.persist();
    }), this.events.on(hr.deleted, (e) => {
      const r = hr.deleted;
      this.logger.info(`Emitting ${r}`), this.logger.debug({ type: "event", event: r, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = V("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var tP = Object.defineProperty, rP = (t, e, r) => e in t ? tP(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, tt = (t, e, r) => rP(t, typeof e != "symbol" ? e + "" : e, r);
class sP extends kv {
  constructor(e, r, s) {
    super(e, r, s), this.core = e, this.logger = r, this.store = s, tt(this, "name", sT), tt(this, "abortController"), tt(this, "isDevEnv"), tt(this, "verifyUrlV3", iT), tt(this, "storagePrefix", zr), tt(this, "version", Xm), tt(this, "publicKey"), tt(this, "fetchPromise"), tt(this, "init", () => h(this, null, function* () {
      var n;
      this.isDevEnv || (this.publicKey = yield this.store.getItem(this.storeKey), this.publicKey && H.toMiliseconds((n = this.publicKey) == null ? void 0 : n.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), yield this.removePublicKey()));
    })), tt(this, "register", (n) => h(this, null, function* () {
      if (!Zo() || this.isDevEnv) return;
      const i = window.location.origin, { id: o, decryptedId: a } = n, c = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${i}&id=${o}&decryptedId=${a}`;
      try {
        const l = rn.getDocument(), u = this.startAbortTimer(H.ONE_SECOND * 5), d = yield new Promise((p, g) => {
          const m = () => {
            window.removeEventListener("message", w), l.body.removeChild(f), g("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", m);
          const f = l.createElement("iframe");
          f.src = c, f.style.display = "none", f.addEventListener("error", m, { signal: this.abortController.signal });
          const w = (S) => {
            if (S.data && typeof S.data == "string") try {
              const E = JSON.parse(S.data);
              if (E.type === "verify_attestation") {
                if (Yl(E.attestation).payload.id !== o) return;
                clearInterval(u), l.body.removeChild(f), this.abortController.signal.removeEventListener("abort", m), window.removeEventListener("message", w), p(E.attestation === null ? "" : E.attestation);
              }
            } catch (E) {
              this.logger.warn(E);
            }
          };
          l.body.appendChild(f), window.addEventListener("message", w, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", d), d;
      } catch (l) {
        this.logger.warn(l);
      }
      return "";
    })), tt(this, "resolve", (n) => h(this, null, function* () {
      if (this.isDevEnv) return "";
      const { attestationId: i, hash: o, encryptedId: a } = n;
      if (i === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (i) {
        if (Yl(i).payload.id !== a) return;
        const l = yield this.isValidJwtAttestation(i);
        if (l) {
          if (!l.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return l;
        }
      }
      if (!o) return;
      const c = this.getVerifyUrl(n == null ? void 0 : n.verifyUrl);
      return this.fetchAttestation(o, c);
    })), tt(this, "fetchAttestation", (n, i) => h(this, null, function* () {
      this.logger.debug(`resolving attestation: ${n} from url: ${i}`);
      const o = this.startAbortTimer(H.ONE_SECOND * 5), a = yield fetch(`${i}/attestation/${n}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o), a.status === 200 ? yield a.json() : void 0;
    })), tt(this, "getVerifyUrl", (n) => {
      let i = n || Wi;
      return oT.includes(i) || (this.logger.info(`verify url: ${i}, not included in trusted list, assigning default: ${Wi}`), i = Wi), i;
    }), tt(this, "fetchPublicKey", () => h(this, null, function* () {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const n = this.startAbortTimer(H.FIVE_SECONDS), i = yield fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(n), yield i.json();
      } catch (n) {
        this.logger.warn(n);
      }
    })), tt(this, "persistPublicKey", (n) => h(this, null, function* () {
      this.logger.debug("persisting public key to local storage", n), yield this.store.setItem(this.storeKey, n), this.publicKey = n;
    })), tt(this, "removePublicKey", () => h(this, null, function* () {
      this.logger.debug("removing verify v2 public key from storage"), yield this.store.removeItem(this.storeKey), this.publicKey = void 0;
    })), tt(this, "isValidJwtAttestation", (n) => h(this, null, function* () {
      const i = yield this.getPublicKey();
      try {
        if (i) return this.validateAttestation(n, i);
      } catch (a) {
        this.logger.error(a), this.logger.warn("error validating attestation");
      }
      const o = yield this.fetchAndPersistPublicKey();
      try {
        if (o) return this.validateAttestation(n, o);
      } catch (a) {
        this.logger.error(a), this.logger.warn("error validating attestation");
      }
    })), tt(this, "getPublicKey", () => h(this, null, function* () {
      return this.publicKey ? this.publicKey : yield this.fetchAndPersistPublicKey();
    })), tt(this, "fetchAndPersistPublicKey", () => h(this, null, function* () {
      if (this.fetchPromise) return yield this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise((i) => h(this, null, function* () {
        const o = yield this.fetchPublicKey();
        o && (yield this.persistPublicKey(o), i(o));
      }));
      const n = yield this.fetchPromise;
      return this.fetchPromise = void 0, n;
    })), tt(this, "validateAttestation", (n, i) => {
      const o = SI(n, i.publicKey), a = { hasExpired: H.toMiliseconds(o.exp) < Date.now(), payload: o };
      if (a.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a.payload.origin, isScam: a.payload.isScam, isVerified: a.payload.isVerified };
    }), this.logger = Ot(r, this.name), this.abortController = new AbortController(), this.isDevEnv = Hu(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return Ht(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), H.toMiliseconds(e));
  }
}
var nP = Object.defineProperty, iP = (t, e, r) => e in t ? nP(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Kp = (t, e, r) => iP(t, typeof e != "symbol" ? e + "" : e, r);
class oP extends $v {
  constructor(e, r) {
    super(e, r), this.projectId = e, this.logger = r, Kp(this, "context", aT), Kp(this, "registerDeviceToken", (s) => h(this, null, function* () {
      const { clientId: n, token: i, notificationType: o, enableEncrypted: a = !1 } = s, c = `${cT}/${this.projectId}/clients`;
      yield fetch(c, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: n, type: o, token: i, always_raw: a }) });
    })), this.logger = Ot(r, this.context);
  }
}
var aP = Object.defineProperty, Gp = Object.getOwnPropertySymbols, cP = Object.prototype.hasOwnProperty, lP = Object.prototype.propertyIsEnumerable, vu = (t, e, r) => e in t ? aP(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Pi = (t, e) => {
  for (var r in e || (e = {})) cP.call(e, r) && vu(t, r, e[r]);
  if (Gp) for (var r of Gp(e)) lP.call(e, r) && vu(t, r, e[r]);
  return t;
}, ot = (t, e, r) => vu(t, typeof e != "symbol" ? e + "" : e, r);
class uP extends Uv {
  constructor(e, r, s = !0) {
    super(e, r, s), this.core = e, this.logger = r, ot(this, "context", uT), ot(this, "storagePrefix", zr), ot(this, "storageVersion", lT), ot(this, "events", /* @__PURE__ */ new Map()), ot(this, "shouldPersist", !1), ot(this, "init", () => h(this, null, function* () {
      if (!Hu()) try {
        const n = { eventId: $h(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: yield this.core.crypto.getClientId(), user_agent: cm(this.core.relayer.protocol, this.core.relayer.version, hu) } } };
        yield this.sendEvent([n]);
      } catch (n) {
        this.logger.warn(n);
      }
    })), ot(this, "createEvent", (n) => {
      const { event: i = "ERROR", type: o = "", properties: { topic: a, trace: c } } = n, l = $h(), u = this.core.projectId || "", d = Date.now(), p = Pi({ eventId: l, timestamp: d, props: { event: i, type: o, properties: { topic: a, trace: c } }, bundleId: u, domain: this.getAppDomain() }, this.setMethods(l));
      return this.telemetryEnabled && (this.events.set(l, p), this.shouldPersist = !0), p;
    }), ot(this, "getEvent", (n) => {
      const { eventId: i, topic: o } = n;
      if (i) return this.events.get(i);
      const a = Array.from(this.events.values()).find((c) => c.props.properties.topic === o);
      if (a) return Pi(Pi({}, a), this.setMethods(a.eventId));
    }), ot(this, "deleteEvent", (n) => {
      const { eventId: i } = n;
      this.events.delete(i), this.shouldPersist = !0;
    }), ot(this, "setEventListeners", () => {
      this.core.heartbeat.on(ui.pulse, () => h(this, null, function* () {
        this.shouldPersist && (yield this.persist()), this.events.forEach((n) => {
          H.fromMiliseconds(Date.now()) - H.fromMiliseconds(n.timestamp) > dT && (this.events.delete(n.eventId), this.shouldPersist = !0);
        });
      }));
    }), ot(this, "setMethods", (n) => ({ addTrace: (i) => this.addTrace(n, i), setError: (i) => this.setError(n, i) })), ot(this, "addTrace", (n, i) => {
      const o = this.events.get(n);
      o && (o.props.properties.trace.push(i), this.events.set(n, o), this.shouldPersist = !0);
    }), ot(this, "setError", (n, i) => {
      const o = this.events.get(n);
      o && (o.props.type = i, o.timestamp = Date.now(), this.events.set(n, o), this.shouldPersist = !0);
    }), ot(this, "persist", () => h(this, null, function* () {
      yield this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = !1;
    })), ot(this, "restore", () => h(this, null, function* () {
      try {
        const n = (yield this.core.storage.getItem(this.storageKey)) || [];
        if (!n.length) return;
        n.forEach((i) => {
          this.events.set(i.eventId, Pi(Pi({}, i), this.setMethods(i.eventId)));
        });
      } catch (n) {
        this.logger.warn(n);
      }
    })), ot(this, "submit", () => h(this, null, function* () {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const n = [];
      for (const [i, o] of this.events) o.props.type && n.push(o);
      if (n.length !== 0) try {
        if ((yield this.sendEvent(n)).ok) for (const i of n) this.events.delete(i.eventId), this.shouldPersist = !0;
      } catch (i) {
        this.logger.warn(i);
      }
    })), ot(this, "sendEvent", (n) => h(this, null, function* () {
      const i = this.getAppDomain() ? "" : "&sp=desktop";
      return yield fetch(`${hT}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${hu}${i}`, { method: "POST", body: JSON.stringify(n) });
    })), ot(this, "getAppDomain", () => am().url), this.logger = Ot(r, this.context), this.telemetryEnabled = s, s ? this.restore().then(() => h(this, null, function* () {
      yield this.submit(), this.setEventListeners();
    })) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
}
var dP = Object.defineProperty, Yp = Object.getOwnPropertySymbols, hP = Object.prototype.hasOwnProperty, pP = Object.prototype.propertyIsEnumerable, Eu = (t, e, r) => e in t ? dP(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Zp = (t, e) => {
  for (var r in e || (e = {})) hP.call(e, r) && Eu(t, r, e[r]);
  if (Yp) for (var r of Yp(e)) pP.call(e, r) && Eu(t, r, e[r]);
  return t;
}, qe = (t, e, r) => Eu(t, typeof e != "symbol" ? e + "" : e, r);
let fP = class hw extends Cv {
  constructor(e) {
    var r;
    super(e), qe(this, "protocol", Jm), qe(this, "version", Xm), qe(this, "name", du), qe(this, "relayUrl"), qe(this, "projectId"), qe(this, "customStoragePrefix"), qe(this, "events", new gr.EventEmitter()), qe(this, "logger"), qe(this, "heartbeat"), qe(this, "relayer"), qe(this, "crypto"), qe(this, "storage"), qe(this, "history"), qe(this, "expirer"), qe(this, "pairing"), qe(this, "verify"), qe(this, "echoClient"), qe(this, "linkModeSupportedApps"), qe(this, "eventClient"), qe(this, "initialized", !1), qe(this, "logChunkController"), qe(this, "on", (a, c) => this.events.on(a, c)), qe(this, "once", (a, c) => this.events.once(a, c)), qe(this, "off", (a, c) => this.events.off(a, c)), qe(this, "removeListener", (a, c) => this.events.removeListener(a, c)), qe(this, "dispatchEnvelope", ({ topic: a, message: c, sessionExists: l }) => {
      if (!a || !c) return;
      const u = { topic: a, message: c, publishedAt: Date.now(), transportType: Ve.link_mode };
      this.relayer.onLinkMessageEvent(u, { sessionExists: l });
    });
    const s = this.getGlobalCore(e == null ? void 0 : e.customStoragePrefix);
    if (s) try {
      return this.customStoragePrefix = s.customStoragePrefix, this.logger = s.logger, this.heartbeat = s.heartbeat, this.crypto = s.crypto, this.history = s.history, this.expirer = s.expirer, this.storage = s.storage, this.relayer = s.relayer, this.pairing = s.pairing, this.verify = s.verify, this.echoClient = s.echoClient, this.linkModeSupportedApps = s.linkModeSupportedApps, this.eventClient = s.eventClient, this.initialized = s.initialized, this.logChunkController = s.logChunkController, s;
    } catch (a) {
      console.warn("Failed to copy global core", a);
    }
    this.projectId = e == null ? void 0 : e.projectId, this.relayUrl = (e == null ? void 0 : e.relayUrl) || ew, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const n = di({ level: typeof (e == null ? void 0 : e.logger) == "string" && e.logger ? e.logger : kN.logger, name: du }), { logger: i, chunkLoggerController: o } = Uu({ opts: n, maxSizeInBytes: e == null ? void 0 : e.maxLogBlobSizeInBytes, loggerOverride: e == null ? void 0 : e.logger });
    this.logChunkController = o, (r = this.logChunkController) != null && r.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = () => h(this, null, function* () {
      var a, c;
      (a = this.logChunkController) != null && a.downloadLogsBlobInBrowser && ((c = this.logChunkController) == null || c.downloadLogsBlobInBrowser({ clientId: yield this.crypto.getClientId() }));
    })), this.logger = Ot(i, this.name), this.heartbeat = new _b(), this.crypto = new jO(this, this.logger, e == null ? void 0 : e.keychain), this.history = new JR(this, this.logger), this.expirer = new eP(this, this.logger), this.storage = e != null && e.storage ? e.storage : new nv(Zp(Zp({}, $N), e == null ? void 0 : e.storageOptions)), this.relayer = new fR({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new GR(this, this.logger), this.verify = new sP(this, this.logger, this.storage), this.echoClient = new oP(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new uP(this, this.logger, e == null ? void 0 : e.telemetryEnabled), this.setGlobalCore(this);
  }
  static init(e) {
    return h(this, null, function* () {
      const r = new hw(e);
      yield r.initialize();
      const s = yield r.crypto.getClientId();
      return yield r.storage.setItem(GN, s), r;
    });
  }
  get context() {
    return Ht(this.logger);
  }
  start() {
    return h(this, null, function* () {
      this.initialized || (yield this.initialize());
    });
  }
  getLogsBlob() {
    return h(this, null, function* () {
      var e;
      return (e = this.logChunkController) == null ? void 0 : e.logsToBlob({ clientId: yield this.crypto.getClientId() });
    });
  }
  addLinkModeSupportedApp(e) {
    return h(this, null, function* () {
      this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), yield this.storage.setItem(Op, this.linkModeSupportedApps));
    });
  }
  initialize() {
    return h(this, null, function* () {
      this.logger.trace("Initialized");
      try {
        yield this.crypto.init(), yield this.history.init(), yield this.expirer.init(), yield this.relayer.init(), yield this.heartbeat.init(), yield this.pairing.init(), this.linkModeSupportedApps = (yield this.storage.getItem(Op)) || [], this.initialized = !0, this.logger.info("Core Initialization Success");
      } catch (e) {
        throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
      }
    });
  }
  getGlobalCore(e = "") {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const r = `_walletConnectCore_${e}`, s = `${r}_count`;
      return globalThis[s] = (globalThis[s] || 0) + 1, globalThis[s] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[s]} times.`), globalThis[r];
    } catch (r) {
      console.warn("Failed to get global WalletConnect core", r);
      return;
    }
  }
  setGlobalCore(e) {
    var r;
    try {
      if (this.isGlobalCoreDisabled()) return;
      const s = `_walletConnectCore_${((r = e.opts) == null ? void 0 : r.customStoragePrefix) || ""}`;
      globalThis[s] = e;
    } catch (s) {
      console.warn("Failed to set global WalletConnect core", s);
    }
  }
  isGlobalCoreDisabled() {
    try {
      return typeof process < "u" && process.env.DISABLE_GLOBAL_CORE === "true";
    } catch (e) {
      return !0;
    }
  }
};
const gP = fP, pw = "wc", fw = 2, gw = "client", rd = `${pw}@${fw}:${gw}:`, _l = { name: gw, logger: "error" }, Jp = "WALLETCONNECT_DEEPLINK_CHOICE", mP = "proposal", Xp = "Proposal expired", wP = "session", Sn = H.SEVEN_DAYS, yP = "engine", at = { wc_sessionPropose: { req: { ttl: H.FIVE_MINUTES, prompt: !0, tag: 1100 }, res: { ttl: H.FIVE_MINUTES, prompt: !1, tag: 1101 }, reject: { ttl: H.FIVE_MINUTES, prompt: !1, tag: 1120 }, autoReject: { ttl: H.FIVE_MINUTES, prompt: !1, tag: 1121 } }, wc_sessionSettle: { req: { ttl: H.FIVE_MINUTES, prompt: !1, tag: 1102 }, res: { ttl: H.FIVE_MINUTES, prompt: !1, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: H.ONE_DAY, prompt: !1, tag: 1104 }, res: { ttl: H.ONE_DAY, prompt: !1, tag: 1105 } }, wc_sessionExtend: { req: { ttl: H.ONE_DAY, prompt: !1, tag: 1106 }, res: { ttl: H.ONE_DAY, prompt: !1, tag: 1107 } }, wc_sessionRequest: { req: { ttl: H.FIVE_MINUTES, prompt: !0, tag: 1108 }, res: { ttl: H.FIVE_MINUTES, prompt: !1, tag: 1109 } }, wc_sessionEvent: { req: { ttl: H.FIVE_MINUTES, prompt: !0, tag: 1110 }, res: { ttl: H.FIVE_MINUTES, prompt: !1, tag: 1111 } }, wc_sessionDelete: { req: { ttl: H.ONE_DAY, prompt: !1, tag: 1112 }, res: { ttl: H.ONE_DAY, prompt: !1, tag: 1113 } }, wc_sessionPing: { req: { ttl: H.ONE_DAY, prompt: !1, tag: 1114 }, res: { ttl: H.ONE_DAY, prompt: !1, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: H.ONE_HOUR, prompt: !0, tag: 1116 }, res: { ttl: H.ONE_HOUR, prompt: !1, tag: 1117 }, reject: { ttl: H.FIVE_MINUTES, prompt: !1, tag: 1118 }, autoReject: { ttl: H.FIVE_MINUTES, prompt: !1, tag: 1119 } } }, Cl = { min: H.FIVE_MINUTES, max: H.SEVEN_DAYS }, kr = { idle: "IDLE", active: "ACTIVE" }, Qp = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" } }, bP = "request", vP = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"], EP = "wc", _P = "auth", CP = "authKeys", AP = "pairingTopics", SP = "requests", Pc = `${EP}@${1.5}:${_P}:`, Fa = `${Pc}:PUB_KEY`;
var IP = Object.defineProperty, NP = Object.defineProperties, TP = Object.getOwnPropertyDescriptors, ef = Object.getOwnPropertySymbols, OP = Object.prototype.hasOwnProperty, RP = Object.prototype.propertyIsEnumerable, _u = (t, e, r) => e in t ? IP(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, je = (t, e) => {
  for (var r in e || (e = {})) OP.call(e, r) && _u(t, r, e[r]);
  if (ef) for (var r of ef(e)) RP.call(e, r) && _u(t, r, e[r]);
  return t;
}, Pt = (t, e) => NP(t, TP(e)), j = (t, e, r) => _u(t, typeof e != "symbol" ? e + "" : e, r);
class PP extends Bv {
  constructor(e) {
    super(e), j(this, "name", yP), j(this, "events", new ku()), j(this, "initialized", !1), j(this, "requestQueue", { state: kr.idle, queue: [] }), j(this, "sessionRequestQueue", { state: kr.idle, queue: [] }), j(this, "requestQueueDelay", H.ONE_SECOND), j(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), j(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), j(this, "recentlyDeletedLimit", 200), j(this, "relayMessageCache", []), j(this, "pendingSessions", /* @__PURE__ */ new Map()), j(this, "init", () => h(this, null, function* () {
      this.initialized || (yield this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), yield this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(at) }), this.initialized = !0, setTimeout(() => h(this, null, function* () {
        yield this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }), H.toMiliseconds(this.requestQueueDelay)));
    })), j(this, "connect", (r) => h(this, null, function* () {
      this.isInitialized(), yield this.confirmOnlineStateOrThrow();
      const s = Pt(je({}, r), { requiredNamespaces: r.requiredNamespaces || {}, optionalNamespaces: r.optionalNamespaces || {} });
      yield this.isValidConnect(s);
      const { pairingTopic: n, requiredNamespaces: i, optionalNamespaces: o, sessionProperties: a, scopedProperties: c, relays: l } = s;
      let u = n, d, p = !1;
      try {
        if (u) {
          const b = this.client.core.pairing.pairings.get(u);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), p = b.active;
        }
      } catch (b) {
        throw this.client.logger.error(`connect() -> pairing.get(${u}) failed`), b;
      }
      if (!u || !p) {
        const { topic: b, uri: N } = yield this.client.core.pairing.create();
        u = b, d = N;
      }
      if (!u) {
        const { message: b } = V("NO_MATCHING_KEY", `connect() pairing topic: ${u}`);
        throw new Error(b);
      }
      const g = yield this.client.core.crypto.generateKeyPair(), m = at.wc_sessionPropose.req.ttl || H.FIVE_MINUTES, f = nt(m), w = Pt(je(je({ requiredNamespaces: i, optionalNamespaces: o, relays: l != null ? l : [{ protocol: Qm }], proposer: { publicKey: g, metadata: this.client.metadata }, expiryTimestamp: f, pairingTopic: u }, a && { sessionProperties: a }), c && { scopedProperties: c }), { id: Ur() }), S = Pe("session_connect", w.id), { reject: E, resolve: I, done: A } = Fs(m, Xp), T = ({ id: b }) => {
        b === w.id && (this.client.events.off("proposal_expire", T), this.pendingSessions.delete(w.id), this.events.emit(S, { error: { message: Xp, code: 0 } }));
      };
      return this.client.events.on("proposal_expire", T), this.events.once(S, ({ error: b, session: N }) => {
        this.client.events.off("proposal_expire", T), b ? E(b) : N && I(N);
      }), yield this.sendRequest({ topic: u, method: "wc_sessionPropose", params: w, throwOnFailedPublish: !0, clientRpcId: w.id }), yield this.setProposal(w.id, w), { uri: d, approval: A };
    })), j(this, "pair", (r) => h(this, null, function* () {
      this.isInitialized(), yield this.confirmOnlineStateOrThrow();
      try {
        return yield this.client.core.pairing.pair(r);
      } catch (s) {
        throw this.client.logger.error("pair() failed"), s;
      }
    })), j(this, "approve", (r) => h(this, null, function* () {
      var s, n, i;
      const o = this.client.core.eventClient.createEvent({ properties: { topic: (s = r == null ? void 0 : r.id) == null ? void 0 : s.toString(), trace: [vr.session_approve_started] } });
      try {
        this.isInitialized(), yield this.confirmOnlineStateOrThrow();
      } catch (O) {
        throw o.setError($s.no_internet_connection), O;
      }
      try {
        yield this.isValidProposalId(r == null ? void 0 : r.id);
      } catch (O) {
        throw this.client.logger.error(`approve() -> proposal.get(${r == null ? void 0 : r.id}) failed`), o.setError($s.proposal_not_found), O;
      }
      try {
        yield this.isValidApprove(r);
      } catch (O) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), o.setError($s.session_approve_namespace_validation_failure), O;
      }
      const { id: a, relayProtocol: c, namespaces: l, sessionProperties: u, scopedProperties: d, sessionConfig: p } = r, g = this.client.proposal.get(a);
      this.client.core.eventClient.deleteEvent({ eventId: o.eventId });
      const { pairingTopic: m, proposer: f, requiredNamespaces: w, optionalNamespaces: S } = g;
      let E = (n = this.client.core.eventClient) == null ? void 0 : n.getEvent({ topic: m });
      E || (E = (i = this.client.core.eventClient) == null ? void 0 : i.createEvent({ type: vr.session_approve_started, properties: { topic: m, trace: [vr.session_approve_started, vr.session_namespaces_validation_success] } }));
      const I = yield this.client.core.crypto.generateKeyPair(), A = f.publicKey, T = yield this.client.core.crypto.generateSharedKey(I, A), b = je(je(je({ relay: { protocol: c != null ? c : "irn" }, namespaces: l, controller: { publicKey: I, metadata: this.client.metadata }, expiry: nt(Sn) }, u && { sessionProperties: u }), d && { scopedProperties: d }), p && { sessionConfig: p }), N = Ve.relay;
      E.addTrace(vr.subscribing_session_topic);
      try {
        yield this.client.core.relayer.subscribe(T, { transportType: N });
      } catch (O) {
        throw E.setError($s.subscribe_session_topic_failure), O;
      }
      E.addTrace(vr.subscribe_session_topic_success);
      const P = Pt(je({}, b), { topic: T, requiredNamespaces: w, optionalNamespaces: S, pairingTopic: m, acknowledged: !1, self: b.controller, peer: { publicKey: f.publicKey, metadata: f.metadata }, controller: I, transportType: Ve.relay });
      yield this.client.session.set(T, P), E.addTrace(vr.store_session);
      try {
        E.addTrace(vr.publishing_session_settle), yield this.sendRequest({ topic: T, method: "wc_sessionSettle", params: b, throwOnFailedPublish: !0 }).catch((O) => {
          throw E == null || E.setError($s.session_settle_publish_failure), O;
        }), E.addTrace(vr.session_settle_publish_success), E.addTrace(vr.publishing_session_approve), yield this.sendResult({ id: a, topic: m, result: { relay: { protocol: c != null ? c : "irn" }, responderPublicKey: I }, throwOnFailedPublish: !0 }).catch((O) => {
          throw E == null || E.setError($s.session_approve_publish_failure), O;
        }), E.addTrace(vr.session_approve_publish_success);
      } catch (O) {
        throw this.client.logger.error(O), this.client.session.delete(T, Le("USER_DISCONNECTED")), yield this.client.core.relayer.unsubscribe(T), O;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: E.eventId }), yield this.client.core.pairing.updateMetadata({ topic: m, metadata: f.metadata }), yield this.client.proposal.delete(a, Le("USER_DISCONNECTED")), yield this.client.core.pairing.activate({ topic: m }), yield this.setExpiry(T, nt(Sn)), { topic: T, acknowledged: () => Promise.resolve(this.client.session.get(T)) };
    })), j(this, "reject", (r) => h(this, null, function* () {
      this.isInitialized(), yield this.confirmOnlineStateOrThrow();
      try {
        yield this.isValidReject(r);
      } catch (o) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), o;
      }
      const { id: s, reason: n } = r;
      let i;
      try {
        i = this.client.proposal.get(s).pairingTopic;
      } catch (o) {
        throw this.client.logger.error(`reject() -> proposal.get(${s}) failed`), o;
      }
      i && (yield this.sendError({ id: s, topic: i, error: n, rpcOpts: at.wc_sessionPropose.reject }), yield this.client.proposal.delete(s, Le("USER_DISCONNECTED")));
    })), j(this, "update", (r) => h(this, null, function* () {
      this.isInitialized(), yield this.confirmOnlineStateOrThrow();
      try {
        yield this.isValidUpdate(r);
      } catch (d) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), d;
      }
      const { topic: s, namespaces: n } = r, { done: i, resolve: o, reject: a } = Fs(), c = Ur(), l = Vs().toString(), u = this.client.session.get(s).namespaces;
      return this.events.once(Pe("session_update", c), ({ error: d }) => {
        d ? a(d) : o();
      }), yield this.client.session.update(s, { namespaces: n }), yield this.sendRequest({ topic: s, method: "wc_sessionUpdate", params: { namespaces: n }, throwOnFailedPublish: !0, clientRpcId: c, relayRpcId: l }).catch((d) => {
        this.client.logger.error(d), this.client.session.update(s, { namespaces: u }), a(d);
      }), { acknowledged: i };
    })), j(this, "extend", (r) => h(this, null, function* () {
      this.isInitialized(), yield this.confirmOnlineStateOrThrow();
      try {
        yield this.isValidExtend(r);
      } catch (c) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), c;
      }
      const { topic: s } = r, n = Ur(), { done: i, resolve: o, reject: a } = Fs();
      return this.events.once(Pe("session_extend", n), ({ error: c }) => {
        c ? a(c) : o();
      }), yield this.setExpiry(s, nt(Sn)), this.sendRequest({ topic: s, method: "wc_sessionExtend", params: {}, clientRpcId: n, throwOnFailedPublish: !0 }).catch((c) => {
        a(c);
      }), { acknowledged: i };
    })), j(this, "request", (r) => h(this, null, function* () {
      this.isInitialized();
      try {
        yield this.isValidRequest(r);
      } catch (S) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), S;
      }
      const { chainId: s, request: n, topic: i, expiry: o = at.wc_sessionRequest.req.ttl } = r, a = this.client.session.get(i);
      (a == null ? void 0 : a.transportType) === Ve.relay && (yield this.confirmOnlineStateOrThrow());
      const c = Ur(), l = Vs().toString(), { done: u, resolve: d, reject: p } = Fs(o, "Request expired. Please try again.");
      this.events.once(Pe("session_request", c), ({ error: S, result: E }) => {
        S ? p(S) : d(E);
      });
      const g = "wc_sessionRequest", m = this.getAppLinkIfEnabled(a.peer.metadata, a.transportType);
      if (m) return yield this.sendRequest({ clientRpcId: c, relayRpcId: l, topic: i, method: g, params: { request: Pt(je({}, n), { expiryTimestamp: nt(o) }), chainId: s }, expiry: o, throwOnFailedPublish: !0, appLink: m }).catch((S) => p(S)), this.client.events.emit("session_request_sent", { topic: i, request: n, chainId: s, id: c }), yield u();
      const f = { request: Pt(je({}, n), { expiryTimestamp: nt(o) }), chainId: s }, w = this.shouldSetTVF(g, f);
      return yield Promise.all([new Promise((S) => h(this, null, function* () {
        yield this.sendRequest(je({ clientRpcId: c, relayRpcId: l, topic: i, method: g, params: f, expiry: o, throwOnFailedPublish: !0 }, w && { tvf: this.getTVFParams(c, f) })).catch((E) => p(E)), this.client.events.emit("session_request_sent", { topic: i, request: n, chainId: s, id: c }), S();
      })), new Promise((S) => h(this, null, function* () {
        var E;
        if (!((E = a.sessionConfig) != null && E.disableDeepLink)) {
          const I = yield eA(this.client.core.storage, Jp);
          yield J1({ id: c, topic: i, wcDeepLink: I });
        }
        S();
      })), u()]).then((S) => S[2]);
    })), j(this, "respond", (r) => h(this, null, function* () {
      this.isInitialized(), yield this.isValidRespond(r);
      const { topic: s, response: n } = r, { id: i } = n, o = this.client.session.get(s);
      o.transportType === Ve.relay && (yield this.confirmOnlineStateOrThrow());
      const a = this.getAppLinkIfEnabled(o.peer.metadata, o.transportType);
      Lr(n) ? yield this.sendResult({ id: i, topic: s, result: n.result, throwOnFailedPublish: !0, appLink: a }) : pr(n) && (yield this.sendError({ id: i, topic: s, error: n.error, appLink: a })), this.cleanupAfterResponse(r);
    })), j(this, "ping", (r) => h(this, null, function* () {
      this.isInitialized(), yield this.confirmOnlineStateOrThrow();
      try {
        yield this.isValidPing(r);
      } catch (n) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), n;
      }
      const { topic: s } = r;
      if (this.client.session.keys.includes(s)) {
        const n = Ur(), i = Vs().toString(), { done: o, resolve: a, reject: c } = Fs();
        this.events.once(Pe("session_ping", n), ({ error: l }) => {
          l ? c(l) : a();
        }), yield Promise.all([this.sendRequest({ topic: s, method: "wc_sessionPing", params: {}, throwOnFailedPublish: !0, clientRpcId: n, relayRpcId: i }), o()]);
      } else this.client.core.pairing.pairings.keys.includes(s) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), yield this.client.core.pairing.ping({ topic: s }));
    })), j(this, "emit", (r) => h(this, null, function* () {
      this.isInitialized(), yield this.confirmOnlineStateOrThrow(), yield this.isValidEmit(r);
      const { topic: s, event: n, chainId: i } = r, o = Vs().toString(), a = Ur();
      yield this.sendRequest({ topic: s, method: "wc_sessionEvent", params: { event: n, chainId: i }, throwOnFailedPublish: !0, relayRpcId: o, clientRpcId: a });
    })), j(this, "disconnect", (r) => h(this, null, function* () {
      this.isInitialized(), yield this.confirmOnlineStateOrThrow(), yield this.isValidDisconnect(r);
      const { topic: s } = r;
      if (this.client.session.keys.includes(s)) yield this.sendRequest({ topic: s, method: "wc_sessionDelete", params: Le("USER_DISCONNECTED"), throwOnFailedPublish: !0 }), yield this.deleteSession({ topic: s, emitEvent: !1 });
      else if (this.client.core.pairing.pairings.keys.includes(s)) yield this.client.core.pairing.disconnect({ topic: s });
      else {
        const { message: n } = V("MISMATCHED_TOPIC", `Session or pairing topic not found: ${s}`);
        throw new Error(n);
      }
    })), j(this, "find", (r) => (this.isInitialized(), this.client.session.getAll().filter((s) => UI(s, r)))), j(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), j(this, "authenticate", (r, s) => h(this, null, function* () {
      var n;
      this.isInitialized(), this.isValidAuthenticate(r);
      const i = s && this.client.core.linkModeSupportedApps.includes(s) && ((n = this.client.metadata.redirect) == null ? void 0 : n.linkMode), o = i ? Ve.link_mode : Ve.relay;
      o === Ve.relay && (yield this.confirmOnlineStateOrThrow());
      const { chains: a, statement: c = "", uri: l, domain: u, nonce: d, type: p, exp: g, nbf: m, methods: f = [], expiry: w } = r, S = [...r.resources || []], { topic: E, uri: I } = yield this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: o });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: E, uri: I } });
      const A = yield this.client.core.crypto.generateKeyPair(), T = La(A);
      if (yield Promise.all([this.client.auth.authKeys.set(Fa, { responseTopic: T, publicKey: A }), this.client.auth.pairingTopics.set(T, { topic: T, pairingTopic: E })]), yield this.client.core.relayer.subscribe(T, { transportType: o }), this.client.logger.info(`sending request to new pairing topic: ${E}`), f.length > 0) {
        const { namespace: U } = Hn(a[0]);
        let M = VA(U, "request", f);
        Ua(S) && (M = GA(M, S.pop())), S.push(M);
      }
      const b = w && w > at.wc_sessionAuthenticate.req.ttl ? w : at.wc_sessionAuthenticate.req.ttl, N = { authPayload: { type: p != null ? p : "caip122", chains: a, statement: c, aud: l, domain: u, version: "1", nonce: d, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: g, nbf: m, resources: S }, requester: { publicKey: A, metadata: this.client.metadata }, expiryTimestamp: nt(b) }, P = { eip155: { chains: a, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...f])], events: ["chainChanged", "accountsChanged"] } }, O = { requiredNamespaces: {}, optionalNamespaces: P, relays: [{ protocol: "irn" }], pairingTopic: E, proposer: { publicKey: A, metadata: this.client.metadata }, expiryTimestamp: nt(at.wc_sessionPropose.req.ttl), id: Ur() }, { done: x, resolve: $, reject: F } = Fs(b, "Request expired"), W = Ur(), k = Pe("session_connect", O.id), v = Pe("session_request", W), _ = (K) => h(this, [K], function* ({ error: U, session: M }) {
        this.events.off(v, D), U ? F(U) : M && $({ session: M });
      }), D = (U) => h(this, null, function* () {
        var M, K, Z;
        if (yield this.deletePendingAuthRequest(W, { message: "fulfilled", code: 0 }), U.error) {
          const Ae = Le("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return U.error.code === Ae.code ? void 0 : (this.events.off(k, _), F(U.error.message));
        }
        yield this.deleteProposal(O.id), this.events.off(k, _);
        const { cacaos: ie, responder: G } = U.result, ae = [], me = [];
        for (const Ae of ie) {
          (yield zh({ cacao: Ae, projectId: this.client.core.projectId })) || (this.client.logger.error(Ae, "Signature verification failed"), F(Le("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: St } = Ae, ft = Ua(St.resources), Rt = [tu(St.iss)], or = Xa(St.iss);
          if (ft) {
            const Kt = Wh(ft), yn = Hh(ft);
            ae.push(...Kt), Rt.push(...yn);
          }
          for (const Kt of Rt) me.push(`${Kt}:${or}`);
        }
        const Me = yield this.client.core.crypto.generateSharedKey(A, G.publicKey);
        let De;
        ae.length > 0 && (De = { topic: Me, acknowledged: !0, self: { publicKey: A, metadata: this.client.metadata }, peer: G, controller: G.publicKey, expiry: nt(Sn), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: E, namespaces: pp([...new Set(ae)], [...new Set(me)]), transportType: o }, yield this.client.core.relayer.subscribe(Me, { transportType: o }), yield this.client.session.set(Me, De), E && (yield this.client.core.pairing.updateMetadata({ topic: E, metadata: G.metadata })), De = this.client.session.get(Me)), (M = this.client.metadata.redirect) != null && M.linkMode && (K = G.metadata.redirect) != null && K.linkMode && (Z = G.metadata.redirect) != null && Z.universal && s && (this.client.core.addLinkModeSupportedApp(G.metadata.redirect.universal), this.client.session.update(Me, { transportType: Ve.link_mode })), $({ auths: ie, session: De });
      });
      this.events.once(k, _), this.events.once(v, D);
      let L;
      try {
        if (i) {
          const U = Cs("wc_sessionAuthenticate", N, W);
          this.client.core.history.set(E, U);
          const M = yield this.client.core.crypto.encode("", U, { type: ra, encoding: bs });
          L = ba(s, E, M);
        } else yield Promise.all([this.sendRequest({ topic: E, method: "wc_sessionAuthenticate", params: N, expiry: r.expiry, throwOnFailedPublish: !0, clientRpcId: W }), this.sendRequest({ topic: E, method: "wc_sessionPropose", params: O, expiry: at.wc_sessionPropose.req.ttl, throwOnFailedPublish: !0, clientRpcId: O.id })]);
      } catch (U) {
        throw this.events.off(k, _), this.events.off(v, D), U;
      }
      return yield this.setProposal(O.id, O), yield this.setAuthRequest(W, { request: Pt(je({}, N), { verifyContext: {} }), pairingTopic: E, transportType: o }), { uri: L != null ? L : I, response: x };
    })), j(this, "approveSessionAuthenticate", (r) => h(this, null, function* () {
      const { id: s, auths: n } = r, i = this.client.core.eventClient.createEvent({ properties: { topic: s.toString(), trace: [Us.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (w) {
        throw i.setError(Oi.no_internet_connection), w;
      }
      const o = this.getPendingAuthRequest(s);
      if (!o) throw i.setError(Oi.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${s}`);
      const a = o.transportType || Ve.relay;
      a === Ve.relay && (yield this.confirmOnlineStateOrThrow());
      const c = o.requester.publicKey, l = yield this.client.core.crypto.generateKeyPair(), u = La(c), d = { type: os, receiverPublicKey: c, senderPublicKey: l }, p = [], g = [];
      for (const w of n) {
        if (!(yield zh({ cacao: w, projectId: this.client.core.projectId }))) {
          i.setError(Oi.invalid_cacao);
          const T = Le("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw yield this.sendError({ id: s, topic: u, error: T, encodeOpts: d }), new Error(T.message);
        }
        i.addTrace(Us.cacaos_verified);
        const { p: S } = w, E = Ua(S.resources), I = [tu(S.iss)], A = Xa(S.iss);
        if (E) {
          const T = Wh(E), b = Hh(E);
          p.push(...T), I.push(...b);
        }
        for (const T of I) g.push(`${T}:${A}`);
      }
      const m = yield this.client.core.crypto.generateSharedKey(l, c);
      i.addTrace(Us.create_authenticated_session_topic);
      let f;
      if ((p == null ? void 0 : p.length) > 0) {
        f = { topic: m, acknowledged: !0, self: { publicKey: l, metadata: this.client.metadata }, peer: { publicKey: c, metadata: o.requester.metadata }, controller: c, expiry: nt(Sn), authentication: n, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: o.pairingTopic, namespaces: pp([...new Set(p)], [...new Set(g)]), transportType: a }, i.addTrace(Us.subscribing_authenticated_session_topic);
        try {
          yield this.client.core.relayer.subscribe(m, { transportType: a });
        } catch (w) {
          throw i.setError(Oi.subscribe_authenticated_session_topic_failure), w;
        }
        i.addTrace(Us.subscribe_authenticated_session_topic_success), yield this.client.session.set(m, f), i.addTrace(Us.store_authenticated_session), yield this.client.core.pairing.updateMetadata({ topic: o.pairingTopic, metadata: o.requester.metadata });
      }
      i.addTrace(Us.publishing_authenticated_session_approve);
      try {
        yield this.sendResult({ topic: u, id: s, result: { cacaos: n, responder: { publicKey: l, metadata: this.client.metadata } }, encodeOpts: d, throwOnFailedPublish: !0, appLink: this.getAppLinkIfEnabled(o.requester.metadata, a) });
      } catch (w) {
        throw i.setError(Oi.authenticated_session_approve_publish_failure), w;
      }
      return yield this.client.auth.requests.delete(s, { message: "fulfilled", code: 0 }), yield this.client.core.pairing.activate({ topic: o.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i.eventId }), { session: f };
    })), j(this, "rejectSessionAuthenticate", (r) => h(this, null, function* () {
      this.isInitialized();
      const { id: s, reason: n } = r, i = this.getPendingAuthRequest(s);
      if (!i) throw new Error(`Could not find pending auth request with id ${s}`);
      i.transportType === Ve.relay && (yield this.confirmOnlineStateOrThrow());
      const o = i.requester.publicKey, a = yield this.client.core.crypto.generateKeyPair(), c = La(o), l = { type: os, receiverPublicKey: o, senderPublicKey: a };
      yield this.sendError({ id: s, topic: c, error: n, encodeOpts: l, rpcOpts: at.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i.requester.metadata, i.transportType) }), yield this.client.auth.requests.delete(s, { message: "rejected", code: 0 }), yield this.client.proposal.delete(s, Le("USER_DISCONNECTED"));
    })), j(this, "formatAuthMessage", (r) => {
      this.isInitialized();
      const { request: s, iss: n } = r;
      return bm(s, n);
    }), j(this, "processRelayMessageCache", () => {
      setTimeout(() => h(this, null, function* () {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const r = this.relayMessageCache.shift();
          r && (yield this.onRelayMessage(r));
        } catch (r) {
          this.client.logger.error(r);
        }
      }), 50);
    }), j(this, "cleanupDuplicatePairings", (r) => h(this, null, function* () {
      if (r.pairingTopic) try {
        const s = this.client.core.pairing.pairings.get(r.pairingTopic), n = this.client.core.pairing.pairings.getAll().filter((i) => {
          var o, a;
          return ((o = i.peerMetadata) == null ? void 0 : o.url) && ((a = i.peerMetadata) == null ? void 0 : a.url) === r.peer.metadata.url && i.topic && i.topic !== s.topic;
        });
        if (n.length === 0) return;
        this.client.logger.info(`Cleaning up ${n.length} duplicate pairing(s)`), yield Promise.all(n.map((i) => this.client.core.pairing.disconnect({ topic: i.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (s) {
        this.client.logger.error(s);
      }
    })), j(this, "deleteSession", (r) => h(this, null, function* () {
      var s;
      const { topic: n, expirerHasDeleted: i = !1, emitEvent: o = !0, id: a = 0 } = r, { self: c } = this.client.session.get(n);
      yield this.client.core.relayer.unsubscribe(n), yield this.client.session.delete(n, Le("USER_DISCONNECTED")), this.addToRecentlyDeleted(n, "session"), this.client.core.crypto.keychain.has(c.publicKey) && (yield this.client.core.crypto.deleteKeyPair(c.publicKey)), this.client.core.crypto.keychain.has(n) && (yield this.client.core.crypto.deleteSymKey(n)), i || this.client.core.expirer.del(n), this.client.core.storage.removeItem(Jp).catch((l) => this.client.logger.warn(l)), this.getPendingSessionRequests().forEach((l) => {
        l.topic === n && this.deletePendingSessionRequest(l.id, Le("USER_DISCONNECTED"));
      }), n === ((s = this.sessionRequestQueue.queue[0]) == null ? void 0 : s.topic) && (this.sessionRequestQueue.state = kr.idle), o && this.client.events.emit("session_delete", { id: a, topic: n });
    })), j(this, "deleteProposal", (r, s) => h(this, null, function* () {
      if (s) try {
        const n = this.client.proposal.get(r), i = this.client.core.eventClient.getEvent({ topic: n.pairingTopic });
        i == null || i.setError($s.proposal_expired);
      } catch (n) {
      }
      yield Promise.all([this.client.proposal.delete(r, Le("USER_DISCONNECTED")), s ? Promise.resolve() : this.client.core.expirer.del(r)]), this.addToRecentlyDeleted(r, "proposal");
    })), j(this, "deletePendingSessionRequest", (r, s, n = !1) => h(this, null, function* () {
      yield Promise.all([this.client.pendingRequest.delete(r, s), n ? Promise.resolve() : this.client.core.expirer.del(r)]), this.addToRecentlyDeleted(r, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i) => i.id !== r), n && (this.sessionRequestQueue.state = kr.idle, this.client.events.emit("session_request_expire", { id: r }));
    })), j(this, "deletePendingAuthRequest", (r, s, n = !1) => h(this, null, function* () {
      yield Promise.all([this.client.auth.requests.delete(r, s), n ? Promise.resolve() : this.client.core.expirer.del(r)]);
    })), j(this, "setExpiry", (r, s) => h(this, null, function* () {
      this.client.session.keys.includes(r) && (this.client.core.expirer.set(r, s), yield this.client.session.update(r, { expiry: s }));
    })), j(this, "setProposal", (r, s) => h(this, null, function* () {
      this.client.core.expirer.set(r, nt(at.wc_sessionPropose.req.ttl)), yield this.client.proposal.set(r, s);
    })), j(this, "setAuthRequest", (r, s) => h(this, null, function* () {
      const { request: n, pairingTopic: i, transportType: o = Ve.relay } = s;
      this.client.core.expirer.set(r, n.expiryTimestamp), yield this.client.auth.requests.set(r, { authPayload: n.authPayload, requester: n.requester, expiryTimestamp: n.expiryTimestamp, id: r, pairingTopic: i, verifyContext: n.verifyContext, transportType: o });
    })), j(this, "setPendingSessionRequest", (r) => h(this, null, function* () {
      const { id: s, topic: n, params: i, verifyContext: o } = r, a = i.request.expiryTimestamp || nt(at.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(s, a), yield this.client.pendingRequest.set(s, { id: s, topic: n, params: i, verifyContext: o });
    })), j(this, "sendRequest", (r) => h(this, null, function* () {
      const { topic: s, method: n, params: i, expiry: o, relayRpcId: a, clientRpcId: c, throwOnFailedPublish: l, appLink: u, tvf: d } = r, p = Cs(n, i, c);
      let g;
      const m = !!u;
      try {
        const S = m ? bs : Sr;
        g = yield this.client.core.crypto.encode(s, p, { encoding: S });
      } catch (S) {
        throw yield this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${s} failed`), S;
      }
      let f;
      if (vP.includes(n)) {
        const S = Fr(JSON.stringify(p)), E = Fr(g);
        f = yield this.client.core.verify.register({ id: E, decryptedId: S });
      }
      const w = at[n].req;
      if (w.attestation = f, o && (w.ttl = o), a && (w.id = a), this.client.core.history.set(s, p), m) {
        const S = ba(u, s, g);
        yield global.Linking.openURL(S, this.client.name);
      } else {
        const S = at[n].req;
        o && (S.ttl = o), a && (S.id = a), S.tvf = Pt(je({}, d), { correlationId: p.id }), l ? (S.internal = Pt(je({}, S.internal), { throwOnFailedPublish: !0 }), yield this.client.core.relayer.publish(s, g, S)) : this.client.core.relayer.publish(s, g, S).catch((E) => this.client.logger.error(E));
      }
      return p.id;
    })), j(this, "sendResult", (r) => h(this, null, function* () {
      const { id: s, topic: n, result: i, throwOnFailedPublish: o, encodeOpts: a, appLink: c } = r, l = Nc(s, i);
      let u;
      const d = c && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const m = d ? bs : Sr;
        u = yield this.client.core.crypto.encode(n, l, Pt(je({}, a || {}), { encoding: m }));
      } catch (m) {
        throw yield this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${n} failed`), m;
      }
      let p, g;
      try {
        p = yield this.client.core.history.get(n, s);
        const m = p.request;
        try {
          this.shouldSetTVF(m.method, m.params) && (g = this.getTVFParams(s, m.params, i));
        } catch (f) {
          this.client.logger.warn("sendResult() -> getTVFParams() failed", f);
        }
      } catch (m) {
        throw this.client.logger.error(`sendResult() -> history.get(${n}, ${s}) failed`), m;
      }
      if (d) {
        const m = ba(c, n, u);
        yield global.Linking.openURL(m, this.client.name);
      } else {
        const m = p.request.method, f = at[m].res;
        f.tvf = Pt(je({}, g), { correlationId: s }), o ? (f.internal = Pt(je({}, f.internal), { throwOnFailedPublish: !0 }), yield this.client.core.relayer.publish(n, u, f)) : this.client.core.relayer.publish(n, u, f).catch((w) => this.client.logger.error(w));
      }
      yield this.client.core.history.resolve(l);
    })), j(this, "sendError", (r) => h(this, null, function* () {
      const { id: s, topic: n, error: i, encodeOpts: o, rpcOpts: a, appLink: c } = r, l = Tc(s, i);
      let u;
      const d = c && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const g = d ? bs : Sr;
        u = yield this.client.core.crypto.encode(n, l, Pt(je({}, o || {}), { encoding: g }));
      } catch (g) {
        throw yield this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${n} failed`), g;
      }
      let p;
      try {
        p = yield this.client.core.history.get(n, s);
      } catch (g) {
        throw this.client.logger.error(`sendError() -> history.get(${n}, ${s}) failed`), g;
      }
      if (d) {
        const g = ba(c, n, u);
        yield global.Linking.openURL(g, this.client.name);
      } else {
        const g = p.request.method, m = a || at[g].res;
        this.client.core.relayer.publish(n, u, m);
      }
      yield this.client.core.history.resolve(l);
    })), j(this, "cleanup", () => h(this, null, function* () {
      const r = [], s = [];
      this.client.session.getAll().forEach((n) => {
        let i = !1;
        ys(n.expiry) && (i = !0), this.client.core.crypto.keychain.has(n.topic) || (i = !0), i && r.push(n.topic);
      }), this.client.proposal.getAll().forEach((n) => {
        ys(n.expiryTimestamp) && s.push(n.id);
      }), yield Promise.all([...r.map((n) => this.deleteSession({ topic: n })), ...s.map((n) => this.deleteProposal(n))]);
    })), j(this, "onProviderMessageEvent", (r) => h(this, null, function* () {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(r) : yield this.onRelayMessage(r);
    })), j(this, "onRelayEventRequest", (r) => h(this, null, function* () {
      this.requestQueue.queue.push(r), yield this.processRequestsQueue();
    })), j(this, "processRequestsQueue", () => h(this, null, function* () {
      if (this.requestQueue.state === kr.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = kr.active;
        const r = this.requestQueue.queue.shift();
        if (r) try {
          yield this.processRequest(r);
        } catch (s) {
          this.client.logger.warn(s);
        }
      }
      this.requestQueue.state = kr.idle;
    })), j(this, "processRequest", (r) => h(this, null, function* () {
      const { topic: s, payload: n, attestation: i, transportType: o, encryptedId: a } = r, c = n.method;
      if (!this.shouldIgnorePairingRequest({ topic: s, requestMethod: c })) switch (c) {
        case "wc_sessionPropose":
          return yield this.onSessionProposeRequest({ topic: s, payload: n, attestation: i, encryptedId: a });
        case "wc_sessionSettle":
          return yield this.onSessionSettleRequest(s, n);
        case "wc_sessionUpdate":
          return yield this.onSessionUpdateRequest(s, n);
        case "wc_sessionExtend":
          return yield this.onSessionExtendRequest(s, n);
        case "wc_sessionPing":
          return yield this.onSessionPingRequest(s, n);
        case "wc_sessionDelete":
          return yield this.onSessionDeleteRequest(s, n);
        case "wc_sessionRequest":
          return yield this.onSessionRequest({ topic: s, payload: n, attestation: i, encryptedId: a, transportType: o });
        case "wc_sessionEvent":
          return yield this.onSessionEventRequest(s, n);
        case "wc_sessionAuthenticate":
          return yield this.onSessionAuthenticateRequest({ topic: s, payload: n, attestation: i, encryptedId: a, transportType: o });
        default:
          return this.client.logger.info(`Unsupported request method ${c}`);
      }
    })), j(this, "onRelayEventResponse", (r) => h(this, null, function* () {
      const { topic: s, payload: n, transportType: i } = r, o = (yield this.client.core.history.get(s, n.id)).request.method;
      switch (o) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(s, n, i);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(s, n);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(s, n);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(s, n);
        case "wc_sessionPing":
          return this.onSessionPingResponse(s, n);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(s, n);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(s, n);
        default:
          return this.client.logger.info(`Unsupported response method ${o}`);
      }
    })), j(this, "onRelayEventUnknownPayload", (r) => {
      const { topic: s } = r, { message: n } = V("MISSING_OR_INVALID", `Decoded payload on topic ${s} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(n);
    }), j(this, "shouldIgnorePairingRequest", (r) => {
      const { topic: s, requestMethod: n } = r, i = this.expectedPairingMethodMap.get(s);
      return !i || i.includes(n) ? !1 : !!(i.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }), j(this, "onSessionProposeRequest", (r) => h(this, null, function* () {
      const { topic: s, payload: n, attestation: i, encryptedId: o } = r, { params: a, id: c } = n;
      try {
        const l = this.client.core.eventClient.getEvent({ topic: s });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l == null || l.setError(es.proposal_listener_not_found)), this.isValidConnect(je({}, n.params));
        const u = a.expiryTimestamp || nt(at.wc_sessionPropose.req.ttl), d = je({ id: c, pairingTopic: s, expiryTimestamp: u }, a);
        yield this.setProposal(c, d);
        const p = yield this.getVerifyContext({ attestationId: i, hash: Fr(JSON.stringify(n)), encryptedId: o, metadata: d.proposer.metadata });
        l == null || l.addTrace($r.emit_session_proposal), this.client.events.emit("session_proposal", { id: c, params: d, verifyContext: p });
      } catch (l) {
        yield this.sendError({ id: c, topic: s, error: l, rpcOpts: at.wc_sessionPropose.autoReject }), this.client.logger.error(l);
      }
    })), j(this, "onSessionProposeResponse", (r, s, n) => h(this, null, function* () {
      const { id: i } = s;
      if (Lr(s)) {
        const { result: o } = s;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: o });
        const a = this.client.proposal.get(i);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: a });
        const c = a.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: c });
        const l = o.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: l });
        const u = yield this.client.core.crypto.generateSharedKey(c, l);
        this.pendingSessions.set(i, { sessionTopic: u, pairingTopic: r, proposalId: i, publicKey: c });
        const d = yield this.client.core.relayer.subscribe(u, { transportType: n });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: d }), yield this.client.core.pairing.activate({ topic: r });
      } else if (pr(s)) {
        yield this.client.proposal.delete(i, Le("USER_DISCONNECTED"));
        const o = Pe("session_connect", i);
        if (this.events.listenerCount(o) === 0) throw new Error(`emitting ${o} without any listeners, 954`);
        this.events.emit(o, { error: s.error });
      }
    })), j(this, "onSessionSettleRequest", (r, s) => h(this, null, function* () {
      const { id: n, params: i } = s;
      try {
        this.isValidSessionSettleRequest(i);
        const { relay: o, controller: a, expiry: c, namespaces: l, sessionProperties: u, scopedProperties: d, sessionConfig: p } = s.params, g = [...this.pendingSessions.values()].find((w) => w.sessionTopic === r);
        if (!g) return this.client.logger.error(`Pending session not found for topic ${r}`);
        const m = this.client.proposal.get(g.proposalId), f = Pt(je(je(je({ topic: r, relay: o, expiry: c, namespaces: l, acknowledged: !0, pairingTopic: g.pairingTopic, requiredNamespaces: m.requiredNamespaces, optionalNamespaces: m.optionalNamespaces, controller: a.publicKey, self: { publicKey: g.publicKey, metadata: this.client.metadata }, peer: { publicKey: a.publicKey, metadata: a.metadata } }, u && { sessionProperties: u }), d && { scopedProperties: d }), p && { sessionConfig: p }), { transportType: Ve.relay });
        yield this.client.session.set(f.topic, f), yield this.setExpiry(f.topic, f.expiry), yield this.client.core.pairing.updateMetadata({ topic: g.pairingTopic, metadata: f.peer.metadata }), this.client.events.emit("session_connect", { session: f }), this.events.emit(Pe("session_connect", g.proposalId), { session: f }), this.pendingSessions.delete(g.proposalId), this.deleteProposal(g.proposalId, !1), this.cleanupDuplicatePairings(f), yield this.sendResult({ id: s.id, topic: r, result: !0, throwOnFailedPublish: !0 });
      } catch (o) {
        yield this.sendError({ id: n, topic: r, error: o }), this.client.logger.error(o);
      }
    })), j(this, "onSessionSettleResponse", (r, s) => h(this, null, function* () {
      const { id: n } = s;
      Lr(s) ? (yield this.client.session.update(r, { acknowledged: !0 }), this.events.emit(Pe("session_approve", n), {})) : pr(s) && (yield this.client.session.delete(r, Le("USER_DISCONNECTED")), this.events.emit(Pe("session_approve", n), { error: s.error }));
    })), j(this, "onSessionUpdateRequest", (r, s) => h(this, null, function* () {
      const { params: n, id: i } = s;
      try {
        const o = `${r}_session_update`, a = Ni.get(o);
        if (a && this.isRequestOutOfSync(a, i)) {
          this.client.logger.warn(`Discarding out of sync request - ${i}`), this.sendError({ id: i, topic: r, error: Le("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(je({ topic: r }, n));
        try {
          Ni.set(o, i), yield this.client.session.update(r, { namespaces: n.namespaces }), yield this.sendResult({ id: i, topic: r, result: !0, throwOnFailedPublish: !0 });
        } catch (c) {
          throw Ni.delete(o), c;
        }
        this.client.events.emit("session_update", { id: i, topic: r, params: n });
      } catch (o) {
        yield this.sendError({ id: i, topic: r, error: o }), this.client.logger.error(o);
      }
    })), j(this, "isRequestOutOfSync", (r, s) => s.toString().slice(0, -3) < r.toString().slice(0, -3)), j(this, "onSessionUpdateResponse", (r, s) => {
      const { id: n } = s, i = Pe("session_update", n);
      if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
      Lr(s) ? this.events.emit(Pe("session_update", n), {}) : pr(s) && this.events.emit(Pe("session_update", n), { error: s.error });
    }), j(this, "onSessionExtendRequest", (r, s) => h(this, null, function* () {
      const { id: n } = s;
      try {
        this.isValidExtend({ topic: r }), yield this.setExpiry(r, nt(Sn)), yield this.sendResult({ id: n, topic: r, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_extend", { id: n, topic: r });
      } catch (i) {
        yield this.sendError({ id: n, topic: r, error: i }), this.client.logger.error(i);
      }
    })), j(this, "onSessionExtendResponse", (r, s) => {
      const { id: n } = s, i = Pe("session_extend", n);
      if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
      Lr(s) ? this.events.emit(Pe("session_extend", n), {}) : pr(s) && this.events.emit(Pe("session_extend", n), { error: s.error });
    }), j(this, "onSessionPingRequest", (r, s) => h(this, null, function* () {
      const { id: n } = s;
      try {
        this.isValidPing({ topic: r }), yield this.sendResult({ id: n, topic: r, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_ping", { id: n, topic: r });
      } catch (i) {
        yield this.sendError({ id: n, topic: r, error: i }), this.client.logger.error(i);
      }
    })), j(this, "onSessionPingResponse", (r, s) => {
      const { id: n } = s, i = Pe("session_ping", n);
      setTimeout(() => {
        if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners 2176`);
        Lr(s) ? this.events.emit(Pe("session_ping", n), {}) : pr(s) && this.events.emit(Pe("session_ping", n), { error: s.error });
      }, 500);
    }), j(this, "onSessionDeleteRequest", (r, s) => h(this, null, function* () {
      const { id: n } = s;
      try {
        this.isValidDisconnect({ topic: r, reason: s.params }), Promise.all([new Promise((i) => {
          this.client.core.relayer.once(ut.publish, () => h(this, null, function* () {
            i(yield this.deleteSession({ topic: r, id: n }));
          }));
        }), this.sendResult({ id: n, topic: r, result: !0, throwOnFailedPublish: !0 }), this.cleanupPendingSentRequestsForTopic({ topic: r, error: Le("USER_DISCONNECTED") })]).catch((i) => this.client.logger.error(i));
      } catch (i) {
        this.client.logger.error(i);
      }
    })), j(this, "onSessionRequest", (r) => h(this, null, function* () {
      var s, n, i;
      const { topic: o, payload: a, attestation: c, encryptedId: l, transportType: u } = r, { id: d, params: p } = a;
      try {
        yield this.isValidRequest(je({ topic: o }, p));
        const g = this.client.session.get(o), m = yield this.getVerifyContext({ attestationId: c, hash: Fr(JSON.stringify(Cs("wc_sessionRequest", p, d))), encryptedId: l, metadata: g.peer.metadata, transportType: u }), f = { id: d, topic: o, params: p, verifyContext: m };
        yield this.setPendingSessionRequest(f), u === Ve.link_mode && (s = g.peer.metadata.redirect) != null && s.universal && this.client.core.addLinkModeSupportedApp((n = g.peer.metadata.redirect) == null ? void 0 : n.universal), (i = this.client.signConfig) != null && i.disableRequestQueue ? this.emitSessionRequest(f) : (this.addSessionRequestToSessionRequestQueue(f), this.processSessionRequestQueue());
      } catch (g) {
        yield this.sendError({ id: d, topic: o, error: g }), this.client.logger.error(g);
      }
    })), j(this, "onSessionRequestResponse", (r, s) => {
      const { id: n } = s, i = Pe("session_request", n);
      if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
      Lr(s) ? this.events.emit(Pe("session_request", n), { result: s.result }) : pr(s) && this.events.emit(Pe("session_request", n), { error: s.error });
    }), j(this, "onSessionEventRequest", (r, s) => h(this, null, function* () {
      const { id: n, params: i } = s;
      try {
        const o = `${r}_session_event_${i.event.name}`, a = Ni.get(o);
        if (a && this.isRequestOutOfSync(a, n)) {
          this.client.logger.info(`Discarding out of sync request - ${n}`);
          return;
        }
        this.isValidEmit(je({ topic: r }, i)), this.client.events.emit("session_event", { id: n, topic: r, params: i }), Ni.set(o, n);
      } catch (o) {
        yield this.sendError({ id: n, topic: r, error: o }), this.client.logger.error(o);
      }
    })), j(this, "onSessionAuthenticateResponse", (r, s) => {
      const { id: n } = s;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: r, payload: s }), Lr(s) ? this.events.emit(Pe("session_request", n), { result: s.result }) : pr(s) && this.events.emit(Pe("session_request", n), { error: s.error });
    }), j(this, "onSessionAuthenticateRequest", (r) => h(this, null, function* () {
      var s;
      const { topic: n, payload: i, attestation: o, encryptedId: a, transportType: c } = r;
      try {
        const { requester: l, authPayload: u, expiryTimestamp: d } = i.params, p = yield this.getVerifyContext({ attestationId: o, hash: Fr(JSON.stringify(i)), encryptedId: a, metadata: l.metadata, transportType: c }), g = { requester: l, pairingTopic: n, id: i.id, authPayload: u, verifyContext: p, expiryTimestamp: d };
        yield this.setAuthRequest(i.id, { request: g, pairingTopic: n, transportType: c }), c === Ve.link_mode && (s = l.metadata.redirect) != null && s.universal && this.client.core.addLinkModeSupportedApp(l.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: n, params: i.params, id: i.id, verifyContext: p });
      } catch (l) {
        this.client.logger.error(l);
        const u = i.params.requester.publicKey, d = yield this.client.core.crypto.generateKeyPair(), p = this.getAppLinkIfEnabled(i.params.requester.metadata, c), g = { type: os, receiverPublicKey: u, senderPublicKey: d };
        yield this.sendError({ id: i.id, topic: n, error: l, encodeOpts: g, rpcOpts: at.wc_sessionAuthenticate.autoReject, appLink: p });
      }
    })), j(this, "addSessionRequestToSessionRequestQueue", (r) => {
      this.sessionRequestQueue.queue.push(r);
    }), j(this, "cleanupAfterResponse", (r) => {
      this.deletePendingSessionRequest(r.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = kr.idle, this.processSessionRequestQueue();
      }, H.toMiliseconds(this.requestQueueDelay));
    }), j(this, "cleanupPendingSentRequestsForTopic", ({ topic: r, error: s }) => {
      const n = this.client.core.history.pending;
      n.length > 0 && n.filter((i) => i.topic === r && i.request.method === "wc_sessionRequest").forEach((i) => {
        const o = i.request.id, a = Pe("session_request", o);
        if (this.events.listenerCount(a) === 0) throw new Error(`emitting ${a} without any listeners`);
        this.events.emit(Pe("session_request", i.request.id), { error: s });
      });
    }), j(this, "processSessionRequestQueue", () => {
      if (this.sessionRequestQueue.state === kr.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const r = this.sessionRequestQueue.queue[0];
      if (!r) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = kr.active, this.emitSessionRequest(r);
      } catch (s) {
        this.client.logger.error(s);
      }
    }), j(this, "emitSessionRequest", (r) => {
      this.client.events.emit("session_request", r);
    }), j(this, "onPairingCreated", (r) => {
      if (r.methods && this.expectedPairingMethodMap.set(r.topic, r.methods), r.active) return;
      const s = this.client.proposal.getAll().find((n) => n.pairingTopic === r.topic);
      s && this.onSessionProposeRequest({ topic: r.topic, payload: Cs("wc_sessionPropose", Pt(je({}, s), { requiredNamespaces: s.requiredNamespaces, optionalNamespaces: s.optionalNamespaces, relays: s.relays, proposer: s.proposer, sessionProperties: s.sessionProperties, scopedProperties: s.scopedProperties }), s.id) });
    }), j(this, "isValidConnect", (r) => h(this, null, function* () {
      if (!Bt(r)) {
        const { message: l } = V("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(r)}`);
        throw new Error(l);
      }
      const { pairingTopic: s, requiredNamespaces: n, optionalNamespaces: i, sessionProperties: o, scopedProperties: a, relays: c } = r;
      if (bt(s) || (yield this.isValidPairingTopic(s)), !GI(c)) {
        const { message: l } = V("MISSING_OR_INVALID", `connect() relays: ${c}`);
        throw new Error(l);
      }
      if (!bt(n) && oo(n) !== 0 && this.validateNamespaces(n, "requiredNamespaces"), !bt(i) && oo(i) !== 0 && this.validateNamespaces(i, "optionalNamespaces"), bt(o) || this.validateSessionProps(o, "sessionProperties"), !bt(a)) {
        this.validateSessionProps(a, "scopedProperties");
        const l = Object.keys(n || {}).concat(Object.keys(i || {}));
        if (!Object.keys(a).every((u) => l.includes(u))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(a)}, required/optional namespaces: ${JSON.stringify(l)}`);
      }
    })), j(this, "validateNamespaces", (r, s) => {
      const n = KI(r, "connect()", s);
      if (n) throw new Error(n.message);
    }), j(this, "isValidApprove", (r) => h(this, null, function* () {
      if (!Bt(r)) throw new Error(V("MISSING_OR_INVALID", `approve() params: ${r}`).message);
      const { id: s, namespaces: n, relayProtocol: i, sessionProperties: o, scopedProperties: a } = r;
      this.checkRecentlyDeleted(s), yield this.isValidProposalId(s);
      const c = this.client.proposal.get(s), l = gl(n, "approve()");
      if (l) throw new Error(l.message);
      const u = mp(c.requiredNamespaces, n, "approve()");
      if (u) throw new Error(u.message);
      if (!rt(i, !0)) {
        const { message: d } = V("MISSING_OR_INVALID", `approve() relayProtocol: ${i}`);
        throw new Error(d);
      }
      if (bt(o) || this.validateSessionProps(o, "sessionProperties"), !bt(a)) {
        this.validateSessionProps(a, "scopedProperties");
        const d = new Set(Object.keys(n));
        if (!Object.keys(a).every((p) => d.has(p))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(a)}, approved namespaces: ${Array.from(d).join(", ")}`);
      }
    })), j(this, "isValidReject", (r) => h(this, null, function* () {
      if (!Bt(r)) {
        const { message: i } = V("MISSING_OR_INVALID", `reject() params: ${r}`);
        throw new Error(i);
      }
      const { id: s, reason: n } = r;
      if (this.checkRecentlyDeleted(s), yield this.isValidProposalId(s), !ZI(n)) {
        const { message: i } = V("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(n)}`);
        throw new Error(i);
      }
    })), j(this, "isValidSessionSettleRequest", (r) => {
      if (!Bt(r)) {
        const { message: l } = V("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${r}`);
        throw new Error(l);
      }
      const { relay: s, controller: n, namespaces: i, expiry: o } = r;
      if (!Hm(s)) {
        const { message: l } = V("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l);
      }
      const a = jI(n, "onSessionSettleRequest()");
      if (a) throw new Error(a.message);
      const c = gl(i, "onSessionSettleRequest()");
      if (c) throw new Error(c.message);
      if (ys(o)) {
        const { message: l } = V("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l);
      }
    }), j(this, "isValidUpdate", (r) => h(this, null, function* () {
      if (!Bt(r)) {
        const { message: c } = V("MISSING_OR_INVALID", `update() params: ${r}`);
        throw new Error(c);
      }
      const { topic: s, namespaces: n } = r;
      this.checkRecentlyDeleted(s), yield this.isValidSessionTopic(s);
      const i = this.client.session.get(s), o = gl(n, "update()");
      if (o) throw new Error(o.message);
      const a = mp(i.requiredNamespaces, n, "update()");
      if (a) throw new Error(a.message);
    })), j(this, "isValidExtend", (r) => h(this, null, function* () {
      if (!Bt(r)) {
        const { message: n } = V("MISSING_OR_INVALID", `extend() params: ${r}`);
        throw new Error(n);
      }
      const { topic: s } = r;
      this.checkRecentlyDeleted(s), yield this.isValidSessionTopic(s);
    })), j(this, "isValidRequest", (r) => h(this, null, function* () {
      if (!Bt(r)) {
        const { message: c } = V("MISSING_OR_INVALID", `request() params: ${r}`);
        throw new Error(c);
      }
      const { topic: s, request: n, chainId: i, expiry: o } = r;
      this.checkRecentlyDeleted(s), yield this.isValidSessionTopic(s);
      const { namespaces: a } = this.client.session.get(s);
      if (!gp(a, i)) {
        const { message: c } = V("MISSING_OR_INVALID", `request() chainId: ${i}`);
        throw new Error(c);
      }
      if (!JI(n)) {
        const { message: c } = V("MISSING_OR_INVALID", `request() ${JSON.stringify(n)}`);
        throw new Error(c);
      }
      if (!eN(a, i, n.method)) {
        const { message: c } = V("MISSING_OR_INVALID", `request() method: ${n.method}`);
        throw new Error(c);
      }
      if (o && !nN(o, Cl)) {
        const { message: c } = V("MISSING_OR_INVALID", `request() expiry: ${o}. Expiry must be a number (in seconds) between ${Cl.min} and ${Cl.max}`);
        throw new Error(c);
      }
    })), j(this, "isValidRespond", (r) => h(this, null, function* () {
      var s;
      if (!Bt(r)) {
        const { message: o } = V("MISSING_OR_INVALID", `respond() params: ${r}`);
        throw new Error(o);
      }
      const { topic: n, response: i } = r;
      try {
        yield this.isValidSessionTopic(n);
      } catch (o) {
        throw (s = r == null ? void 0 : r.response) != null && s.id && this.cleanupAfterResponse(r), o;
      }
      if (!XI(i)) {
        const { message: o } = V("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i)}`);
        throw new Error(o);
      }
    })), j(this, "isValidPing", (r) => h(this, null, function* () {
      if (!Bt(r)) {
        const { message: n } = V("MISSING_OR_INVALID", `ping() params: ${r}`);
        throw new Error(n);
      }
      const { topic: s } = r;
      yield this.isValidSessionOrPairingTopic(s);
    })), j(this, "isValidEmit", (r) => h(this, null, function* () {
      if (!Bt(r)) {
        const { message: a } = V("MISSING_OR_INVALID", `emit() params: ${r}`);
        throw new Error(a);
      }
      const { topic: s, event: n, chainId: i } = r;
      yield this.isValidSessionTopic(s);
      const { namespaces: o } = this.client.session.get(s);
      if (!gp(o, i)) {
        const { message: a } = V("MISSING_OR_INVALID", `emit() chainId: ${i}`);
        throw new Error(a);
      }
      if (!QI(n)) {
        const { message: a } = V("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(a);
      }
      if (!tN(o, i, n.name)) {
        const { message: a } = V("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(a);
      }
    })), j(this, "isValidDisconnect", (r) => h(this, null, function* () {
      if (!Bt(r)) {
        const { message: n } = V("MISSING_OR_INVALID", `disconnect() params: ${r}`);
        throw new Error(n);
      }
      const { topic: s } = r;
      yield this.isValidSessionOrPairingTopic(s);
    })), j(this, "isValidAuthenticate", (r) => {
      const { chains: s, uri: n, domain: i, nonce: o } = r;
      if (!Array.isArray(s) || s.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!rt(n, !1)) throw new Error("uri is required parameter");
      if (!rt(i, !1)) throw new Error("domain is required parameter");
      if (!rt(o, !1)) throw new Error("nonce is required parameter");
      if ([...new Set(s.map((c) => Hn(c).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: a } = Hn(s[0]);
      if (a !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }), j(this, "getVerifyContext", (r) => h(this, null, function* () {
      const { attestationId: s, hash: n, encryptedId: i, metadata: o, transportType: a } = r, c = { verified: { verifyUrl: o.verifyUrl || Wi, validation: "UNKNOWN", origin: o.url || "" } };
      try {
        if (a === Ve.link_mode) {
          const u = this.getAppLinkIfEnabled(o, a);
          return c.verified.validation = u && new URL(u).origin === new URL(o.url).origin ? "VALID" : "INVALID", c;
        }
        const l = yield this.client.core.verify.resolve({ attestationId: s, hash: n, encryptedId: i, verifyUrl: o.verifyUrl });
        l && (c.verified.origin = l.origin, c.verified.isScam = l.isScam, c.verified.validation = l.origin === new URL(o.url).origin ? "VALID" : "INVALID");
      } catch (l) {
        this.client.logger.warn(l);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(c)}`), c;
    })), j(this, "validateSessionProps", (r, s) => {
      Object.values(r).forEach((n, i) => {
        if (n == null) {
          const { message: o } = V("MISSING_OR_INVALID", `${s} must contain an existing value for each key. Received: ${n} for key ${Object.keys(r)[i]}`);
          throw new Error(o);
        }
      });
    }), j(this, "getPendingAuthRequest", (r) => {
      const s = this.client.auth.requests.get(r);
      return typeof s == "object" ? s : void 0;
    }), j(this, "addToRecentlyDeleted", (r, s) => {
      if (this.recentlyDeletedMap.set(r, s), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let n = 0;
        const i = this.recentlyDeletedLimit / 2;
        for (const o of this.recentlyDeletedMap.keys()) {
          if (n++ >= i) break;
          this.recentlyDeletedMap.delete(o);
        }
      }
    }), j(this, "checkRecentlyDeleted", (r) => {
      const s = this.recentlyDeletedMap.get(r);
      if (s) {
        const { message: n } = V("MISSING_OR_INVALID", `Record was recently deleted - ${s}: ${r}`);
        throw new Error(n);
      }
    }), j(this, "isLinkModeEnabled", (r, s) => {
      var n, i, o, a, c, l, u, d, p;
      return !r || s !== Ve.link_mode ? !1 : ((i = (n = this.client.metadata) == null ? void 0 : n.redirect) == null ? void 0 : i.linkMode) === !0 && ((a = (o = this.client.metadata) == null ? void 0 : o.redirect) == null ? void 0 : a.universal) !== void 0 && ((l = (c = this.client.metadata) == null ? void 0 : c.redirect) == null ? void 0 : l.universal) !== "" && ((u = r == null ? void 0 : r.redirect) == null ? void 0 : u.universal) !== void 0 && ((d = r == null ? void 0 : r.redirect) == null ? void 0 : d.universal) !== "" && ((p = r == null ? void 0 : r.redirect) == null ? void 0 : p.linkMode) === !0 && this.client.core.linkModeSupportedApps.includes(r.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }), j(this, "getAppLinkIfEnabled", (r, s) => {
      var n;
      return this.isLinkModeEnabled(r, s) ? (n = r == null ? void 0 : r.redirect) == null ? void 0 : n.universal : void 0;
    }), j(this, "handleLinkModeMessage", ({ url: r }) => {
      if (!r || !r.includes("wc_ev") || !r.includes("topic")) return;
      const s = kh(r, "topic") || "", n = decodeURIComponent(kh(r, "wc_ev") || ""), i = this.client.session.keys.includes(s);
      i && this.client.session.update(s, { transportType: Ve.link_mode }), this.client.core.dispatchEnvelope({ topic: s, message: n, sessionExists: i });
    }), j(this, "registerLinkModeListeners", () => h(this, null, function* () {
      var r;
      if (Hu() || xs() && (r = this.client.metadata.redirect) != null && r.linkMode) {
        const s = global == null ? void 0 : global.Linking;
        if (typeof s < "u") {
          s.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const n = yield s.getInitialURL();
          n && setTimeout(() => {
            this.handleLinkModeMessage({ url: n });
          }, 50);
        }
      }
    })), j(this, "shouldSetTVF", (r, s) => {
      if (!s || r !== "wc_sessionRequest") return !1;
      const { request: n } = s;
      return Object.keys(Qp).includes(n.method);
    }), j(this, "getTVFParams", (r, s, n) => {
      var i, o;
      try {
        const a = s.request.method, c = this.extractTxHashesFromResult(a, n);
        return Pt(je({ correlationId: r, rpcMethods: [a], chainId: s.chainId }, this.isValidContractData(s.request.params) && { contractAddresses: [(o = (i = s.request.params) == null ? void 0 : i[0]) == null ? void 0 : o.to] }), { txHashes: c });
      } catch (a) {
        this.client.logger.warn("Error getting TVF params", a);
      }
      return {};
    }), j(this, "isValidContractData", (r) => {
      var s;
      if (!r) return !1;
      try {
        const n = (r == null ? void 0 : r.data) || ((s = r == null ? void 0 : r[0]) == null ? void 0 : s.data);
        if (!n.startsWith("0x")) return !1;
        const i = n.slice(2);
        return /^[0-9a-fA-F]*$/.test(i) ? i.length % 2 === 0 : !1;
      } catch (n) {
      }
      return !1;
    }), j(this, "extractTxHashesFromResult", (r, s) => {
      try {
        const n = Qp[r];
        if (typeof s == "string") return [s];
        const i = s[n.key];
        if (Ss(i)) return r === "solana_signAllTransactions" ? i.map((o) => xA(o)) : i;
        if (typeof i == "string") return [i];
      } catch (n) {
        this.client.logger.warn("Error extracting tx hashes from result", n);
      }
      return [];
    });
  }
  processPendingMessageEvents() {
    return h(this, null, function* () {
      try {
        const e = this.client.session.keys, r = this.client.core.relayer.messages.getWithoutAck(e);
        for (const [s, n] of Object.entries(r)) for (const i of n) try {
          yield this.onProviderMessageEvent({ topic: s, message: i, publishedAt: Date.now() });
        } catch (o) {
          this.client.logger.warn(`Error processing pending message event for topic: ${s}, message: ${i}`);
        }
      } catch (e) {
        this.client.logger.warn("processPendingMessageEvents failed", e);
      }
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = V("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  confirmOnlineStateOrThrow() {
    return h(this, null, function* () {
      yield this.client.core.relayer.confirmOnlineStateOrThrow();
    });
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(ut.message, (e) => {
      this.onProviderMessageEvent(e);
    });
  }
  onRelayMessage(e) {
    return h(this, null, function* () {
      const { topic: r, message: s, attestation: n, transportType: i } = e, { publicKey: o } = this.client.auth.authKeys.keys.includes(Fa) ? this.client.auth.authKeys.get(Fa) : { publicKey: void 0 };
      try {
        const a = yield this.client.core.crypto.decode(r, s, { receiverPublicKey: o, encoding: i === Ve.link_mode ? bs : Sr });
        td(a) ? (this.client.core.history.set(r, a), yield this.onRelayEventRequest({ topic: r, payload: a, attestation: n, transportType: i, encryptedId: Fr(s) })) : Oc(a) ? (yield this.client.core.history.resolve(a), yield this.onRelayEventResponse({ topic: r, payload: a, transportType: i }), this.client.core.history.delete(r, a.id)) : yield this.onRelayEventUnknownPayload({ topic: r, payload: a, transportType: i }), yield this.client.core.relayer.messages.ack(r, s);
      } catch (a) {
        this.client.logger.error(a);
      }
    });
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(hr.expired, (e) => h(this, null, function* () {
      const { topic: r, id: s } = um(e.target);
      if (s && this.client.pendingRequest.keys.includes(s)) return yield this.deletePendingSessionRequest(s, V("EXPIRED"), !0);
      if (s && this.client.auth.requests.keys.includes(s)) return yield this.deletePendingAuthRequest(s, V("EXPIRED"), !0);
      r ? this.client.session.keys.includes(r) && (yield this.deleteSession({ topic: r, expirerHasDeleted: !0 }), this.client.events.emit("session_expire", { topic: r })) : s && (yield this.deleteProposal(s, !0), this.client.events.emit("proposal_expire", { id: s }));
    }));
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(zs.create, (e) => this.onPairingCreated(e)), this.client.core.pairing.events.on(zs.delete, (e) => {
      this.addToRecentlyDeleted(e.topic, "pairing");
    });
  }
  isValidPairingTopic(e) {
    if (!rt(e, !1)) {
      const { message: r } = V("MISSING_OR_INVALID", `pairing topic should be a string: ${e}`);
      throw new Error(r);
    }
    if (!this.client.core.pairing.pairings.keys.includes(e)) {
      const { message: r } = V("NO_MATCHING_KEY", `pairing topic doesn't exist: ${e}`);
      throw new Error(r);
    }
    if (ys(this.client.core.pairing.pairings.get(e).expiry)) {
      const { message: r } = V("EXPIRED", `pairing topic: ${e}`);
      throw new Error(r);
    }
  }
  isValidSessionTopic(e) {
    return h(this, null, function* () {
      if (!rt(e, !1)) {
        const { message: r } = V("MISSING_OR_INVALID", `session topic should be a string: ${e}`);
        throw new Error(r);
      }
      if (this.checkRecentlyDeleted(e), !this.client.session.keys.includes(e)) {
        const { message: r } = V("NO_MATCHING_KEY", `session topic doesn't exist: ${e}`);
        throw new Error(r);
      }
      if (ys(this.client.session.get(e).expiry)) {
        yield this.deleteSession({ topic: e });
        const { message: r } = V("EXPIRED", `session topic: ${e}`);
        throw new Error(r);
      }
      if (!this.client.core.crypto.keychain.has(e)) {
        const { message: r } = V("MISSING_OR_INVALID", `session topic does not exist in keychain: ${e}`);
        throw yield this.deleteSession({ topic: e }), new Error(r);
      }
    });
  }
  isValidSessionOrPairingTopic(e) {
    return h(this, null, function* () {
      if (this.checkRecentlyDeleted(e), this.client.session.keys.includes(e)) yield this.isValidSessionTopic(e);
      else if (this.client.core.pairing.pairings.keys.includes(e)) this.isValidPairingTopic(e);
      else if (rt(e, !1)) {
        const { message: r } = V("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${e}`);
        throw new Error(r);
      } else {
        const { message: r } = V("MISSING_OR_INVALID", `session or pairing topic should be a string: ${e}`);
        throw new Error(r);
      }
    });
  }
  isValidProposalId(e) {
    return h(this, null, function* () {
      if (!YI(e)) {
        const { message: r } = V("MISSING_OR_INVALID", `proposal id should be a number: ${e}`);
        throw new Error(r);
      }
      if (!this.client.proposal.keys.includes(e)) {
        const { message: r } = V("NO_MATCHING_KEY", `proposal id doesn't exist: ${e}`);
        throw new Error(r);
      }
      if (ys(this.client.proposal.get(e).expiryTimestamp)) {
        yield this.deleteProposal(e);
        const { message: r } = V("EXPIRED", `proposal id: ${e}`);
        throw new Error(r);
      }
    });
  }
}
class xP extends mn {
  constructor(e, r) {
    super(e, r, mP, rd), this.core = e, this.logger = r;
  }
}
let DP = class extends mn {
  constructor(e, r) {
    super(e, r, wP, rd), this.core = e, this.logger = r;
  }
};
class kP extends mn {
  constructor(e, r) {
    super(e, r, bP, rd, (s) => s.id), this.core = e, this.logger = r;
  }
}
class $P extends mn {
  constructor(e, r) {
    super(e, r, CP, Pc, () => Fa), this.core = e, this.logger = r;
  }
}
class UP extends mn {
  constructor(e, r) {
    super(e, r, AP, Pc), this.core = e, this.logger = r;
  }
}
class LP extends mn {
  constructor(e, r) {
    super(e, r, SP, Pc, (s) => s.id), this.core = e, this.logger = r;
  }
}
var MP = Object.defineProperty, FP = (t, e, r) => e in t ? MP(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Al = (t, e, r) => FP(t, typeof e != "symbol" ? e + "" : e, r);
class BP {
  constructor(e, r) {
    this.core = e, this.logger = r, Al(this, "authKeys"), Al(this, "pairingTopics"), Al(this, "requests"), this.authKeys = new $P(this.core, this.logger), this.pairingTopics = new UP(this.core, this.logger), this.requests = new LP(this.core, this.logger);
  }
  init() {
    return h(this, null, function* () {
      yield this.authKeys.init(), yield this.pairingTopics.init(), yield this.requests.init();
    });
  }
}
var jP = Object.defineProperty, qP = (t, e, r) => e in t ? jP(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Ce = (t, e, r) => qP(t, typeof e != "symbol" ? e + "" : e, r);
let zP = class mw extends Fv {
  constructor(e) {
    super(e), Ce(this, "protocol", pw), Ce(this, "version", fw), Ce(this, "name", _l.name), Ce(this, "metadata"), Ce(this, "core"), Ce(this, "logger"), Ce(this, "events", new gr.EventEmitter()), Ce(this, "engine"), Ce(this, "session"), Ce(this, "proposal"), Ce(this, "pendingRequest"), Ce(this, "auth"), Ce(this, "signConfig"), Ce(this, "on", (s, n) => this.events.on(s, n)), Ce(this, "once", (s, n) => this.events.once(s, n)), Ce(this, "off", (s, n) => this.events.off(s, n)), Ce(this, "removeListener", (s, n) => this.events.removeListener(s, n)), Ce(this, "removeAllListeners", (s) => this.events.removeAllListeners(s)), Ce(this, "connect", (s) => h(this, null, function* () {
      try {
        return yield this.engine.connect(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "pair", (s) => h(this, null, function* () {
      try {
        return yield this.engine.pair(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "approve", (s) => h(this, null, function* () {
      try {
        return yield this.engine.approve(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "reject", (s) => h(this, null, function* () {
      try {
        return yield this.engine.reject(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "update", (s) => h(this, null, function* () {
      try {
        return yield this.engine.update(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "extend", (s) => h(this, null, function* () {
      try {
        return yield this.engine.extend(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "request", (s) => h(this, null, function* () {
      try {
        return yield this.engine.request(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "respond", (s) => h(this, null, function* () {
      try {
        return yield this.engine.respond(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "ping", (s) => h(this, null, function* () {
      try {
        return yield this.engine.ping(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "emit", (s) => h(this, null, function* () {
      try {
        return yield this.engine.emit(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "disconnect", (s) => h(this, null, function* () {
      try {
        return yield this.engine.disconnect(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "find", (s) => {
      try {
        return this.engine.find(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "getPendingSessionRequests", () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), Ce(this, "authenticate", (s, n) => h(this, null, function* () {
      try {
        return yield this.engine.authenticate(s, n);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    })), Ce(this, "formatAuthMessage", (s) => {
      try {
        return this.engine.formatAuthMessage(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "approveSessionAuthenticate", (s) => h(this, null, function* () {
      try {
        return yield this.engine.approveSessionAuthenticate(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), Ce(this, "rejectSessionAuthenticate", (s) => h(this, null, function* () {
      try {
        return yield this.engine.rejectSessionAuthenticate(s);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    })), this.name = (e == null ? void 0 : e.name) || _l.name, this.metadata = H1(e == null ? void 0 : e.metadata), this.signConfig = e == null ? void 0 : e.signConfig;
    const r = typeof (e == null ? void 0 : e.logger) < "u" && typeof (e == null ? void 0 : e.logger) != "string" ? e.logger : Vo(di({ level: (e == null ? void 0 : e.logger) || _l.logger }));
    this.core = (e == null ? void 0 : e.core) || new gP(e), this.logger = Ot(r, this.name), this.session = new DP(this.core, this.logger), this.proposal = new xP(this.core, this.logger), this.pendingRequest = new kP(this.core, this.logger), this.engine = new PP(this), this.auth = new BP(this.core, this.logger);
  }
  static init(e) {
    return h(this, null, function* () {
      const r = new mw(e);
      return yield r.initialize(), r;
    });
  }
  get context() {
    return Ht(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  initialize() {
    return h(this, null, function* () {
      this.logger.trace("Initialized");
      try {
        yield this.core.start(), yield this.session.init(), yield this.proposal.init(), yield this.pendingRequest.init(), yield this.auth.init(), yield this.engine.init(), this.logger.info("SignClient Initialization Success"), setTimeout(() => {
          this.engine.processRelayMessageCache();
        }, H.toMiliseconds(H.ONE_SECOND));
      } catch (e) {
        throw this.logger.info("SignClient Initialization Failure"), this.logger.error(e.message), e;
      }
    });
  }
};
var Ea = { exports: {} }, tf;
function WP() {
  return tf || (tf = 1, function(t, e) {
    var r = typeof globalThis != "undefined" && globalThis || typeof self != "undefined" && self || typeof Mr != "undefined" && Mr, s = function() {
      function i() {
        this.fetch = !1, this.DOMException = r.DOMException;
      }
      return i.prototype = r, new i();
    }();
    (function(i) {
      (function(o) {
        var a = typeof i != "undefined" && i || typeof self != "undefined" && self || // eslint-disable-next-line no-undef
        typeof Mr != "undefined" && Mr || {}, c = {
          searchParams: "URLSearchParams" in a,
          iterable: "Symbol" in a && "iterator" in Symbol,
          blob: "FileReader" in a && "Blob" in a && function() {
            try {
              return new Blob(), !0;
            } catch (v) {
              return !1;
            }
          }(),
          formData: "FormData" in a,
          arrayBuffer: "ArrayBuffer" in a
        };
        function l(v) {
          return v && DataView.prototype.isPrototypeOf(v);
        }
        if (c.arrayBuffer)
          var u = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ], d = ArrayBuffer.isView || function(v) {
            return v && u.indexOf(Object.prototype.toString.call(v)) > -1;
          };
        function p(v) {
          if (typeof v != "string" && (v = String(v)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(v) || v === "")
            throw new TypeError('Invalid character in header field name: "' + v + '"');
          return v.toLowerCase();
        }
        function g(v) {
          return typeof v != "string" && (v = String(v)), v;
        }
        function m(v) {
          var _ = {
            next: function() {
              var D = v.shift();
              return { done: D === void 0, value: D };
            }
          };
          return c.iterable && (_[Symbol.iterator] = function() {
            return _;
          }), _;
        }
        function f(v) {
          this.map = {}, v instanceof f ? v.forEach(function(_, D) {
            this.append(D, _);
          }, this) : Array.isArray(v) ? v.forEach(function(_) {
            if (_.length != 2)
              throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + _.length);
            this.append(_[0], _[1]);
          }, this) : v && Object.getOwnPropertyNames(v).forEach(function(_) {
            this.append(_, v[_]);
          }, this);
        }
        f.prototype.append = function(v, _) {
          v = p(v), _ = g(_);
          var D = this.map[v];
          this.map[v] = D ? D + ", " + _ : _;
        }, f.prototype.delete = function(v) {
          delete this.map[p(v)];
        }, f.prototype.get = function(v) {
          return v = p(v), this.has(v) ? this.map[v] : null;
        }, f.prototype.has = function(v) {
          return this.map.hasOwnProperty(p(v));
        }, f.prototype.set = function(v, _) {
          this.map[p(v)] = g(_);
        }, f.prototype.forEach = function(v, _) {
          for (var D in this.map)
            this.map.hasOwnProperty(D) && v.call(_, this.map[D], D, this);
        }, f.prototype.keys = function() {
          var v = [];
          return this.forEach(function(_, D) {
            v.push(D);
          }), m(v);
        }, f.prototype.values = function() {
          var v = [];
          return this.forEach(function(_) {
            v.push(_);
          }), m(v);
        }, f.prototype.entries = function() {
          var v = [];
          return this.forEach(function(_, D) {
            v.push([D, _]);
          }), m(v);
        }, c.iterable && (f.prototype[Symbol.iterator] = f.prototype.entries);
        function w(v) {
          if (!v._noBody) {
            if (v.bodyUsed)
              return Promise.reject(new TypeError("Already read"));
            v.bodyUsed = !0;
          }
        }
        function S(v) {
          return new Promise(function(_, D) {
            v.onload = function() {
              _(v.result);
            }, v.onerror = function() {
              D(v.error);
            };
          });
        }
        function E(v) {
          var _ = new FileReader(), D = S(_);
          return _.readAsArrayBuffer(v), D;
        }
        function I(v) {
          var _ = new FileReader(), D = S(_), L = /charset=([A-Za-z0-9_-]+)/.exec(v.type), U = L ? L[1] : "utf-8";
          return _.readAsText(v, U), D;
        }
        function A(v) {
          for (var _ = new Uint8Array(v), D = new Array(_.length), L = 0; L < _.length; L++)
            D[L] = String.fromCharCode(_[L]);
          return D.join("");
        }
        function T(v) {
          if (v.slice)
            return v.slice(0);
          var _ = new Uint8Array(v.byteLength);
          return _.set(new Uint8Array(v)), _.buffer;
        }
        function b() {
          return this.bodyUsed = !1, this._initBody = function(v) {
            this.bodyUsed = this.bodyUsed, this._bodyInit = v, v ? typeof v == "string" ? this._bodyText = v : c.blob && Blob.prototype.isPrototypeOf(v) ? this._bodyBlob = v : c.formData && FormData.prototype.isPrototypeOf(v) ? this._bodyFormData = v : c.searchParams && URLSearchParams.prototype.isPrototypeOf(v) ? this._bodyText = v.toString() : c.arrayBuffer && c.blob && l(v) ? (this._bodyArrayBuffer = T(v.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : c.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(v) || d(v)) ? this._bodyArrayBuffer = T(v) : this._bodyText = v = Object.prototype.toString.call(v) : (this._noBody = !0, this._bodyText = ""), this.headers.get("content-type") || (typeof v == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : c.searchParams && URLSearchParams.prototype.isPrototypeOf(v) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
          }, c.blob && (this.blob = function() {
            var v = w(this);
            if (v)
              return v;
            if (this._bodyBlob)
              return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]));
          }), this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
              var v = w(this);
              return v || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
                this._bodyArrayBuffer.buffer.slice(
                  this._bodyArrayBuffer.byteOffset,
                  this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                )
              ) : Promise.resolve(this._bodyArrayBuffer));
            } else {
              if (c.blob)
                return this.blob().then(E);
              throw new Error("could not read as ArrayBuffer");
            }
          }, this.text = function() {
            var v = w(this);
            if (v)
              return v;
            if (this._bodyBlob)
              return I(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(A(this._bodyArrayBuffer));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText);
          }, c.formData && (this.formData = function() {
            return this.text().then(x);
          }), this.json = function() {
            return this.text().then(JSON.parse);
          }, this;
        }
        var N = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
        function P(v) {
          var _ = v.toUpperCase();
          return N.indexOf(_) > -1 ? _ : v;
        }
        function O(v, _) {
          if (!(this instanceof O))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          _ = _ || {};
          var D = _.body;
          if (v instanceof O) {
            if (v.bodyUsed)
              throw new TypeError("Already read");
            this.url = v.url, this.credentials = v.credentials, _.headers || (this.headers = new f(v.headers)), this.method = v.method, this.mode = v.mode, this.signal = v.signal, !D && v._bodyInit != null && (D = v._bodyInit, v.bodyUsed = !0);
          } else
            this.url = String(v);
          if (this.credentials = _.credentials || this.credentials || "same-origin", (_.headers || !this.headers) && (this.headers = new f(_.headers)), this.method = P(_.method || this.method || "GET"), this.mode = _.mode || this.mode || null, this.signal = _.signal || this.signal || function() {
            if ("AbortController" in a) {
              var M = new AbortController();
              return M.signal;
            }
          }(), this.referrer = null, (this.method === "GET" || this.method === "HEAD") && D)
            throw new TypeError("Body not allowed for GET or HEAD requests");
          if (this._initBody(D), (this.method === "GET" || this.method === "HEAD") && (_.cache === "no-store" || _.cache === "no-cache")) {
            var L = /([?&])_=[^&]*/;
            if (L.test(this.url))
              this.url = this.url.replace(L, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
            else {
              var U = /\?/;
              this.url += (U.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
            }
          }
        }
        O.prototype.clone = function() {
          return new O(this, { body: this._bodyInit });
        };
        function x(v) {
          var _ = new FormData();
          return v.trim().split("&").forEach(function(D) {
            if (D) {
              var L = D.split("="), U = L.shift().replace(/\+/g, " "), M = L.join("=").replace(/\+/g, " ");
              _.append(decodeURIComponent(U), decodeURIComponent(M));
            }
          }), _;
        }
        function $(v) {
          var _ = new f(), D = v.replace(/\r?\n[\t ]+/g, " ");
          return D.split("\r").map(function(L) {
            return L.indexOf(`
`) === 0 ? L.substr(1, L.length) : L;
          }).forEach(function(L) {
            var U = L.split(":"), M = U.shift().trim();
            if (M) {
              var K = U.join(":").trim();
              try {
                _.append(M, K);
              } catch (Z) {
                console.warn("Response " + Z.message);
              }
            }
          }), _;
        }
        b.call(O.prototype);
        function F(v, _) {
          if (!(this instanceof F))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          if (_ || (_ = {}), this.type = "default", this.status = _.status === void 0 ? 200 : _.status, this.status < 200 || this.status > 599)
            throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
          this.ok = this.status >= 200 && this.status < 300, this.statusText = _.statusText === void 0 ? "" : "" + _.statusText, this.headers = new f(_.headers), this.url = _.url || "", this._initBody(v);
        }
        b.call(F.prototype), F.prototype.clone = function() {
          return new F(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new f(this.headers),
            url: this.url
          });
        }, F.error = function() {
          var v = new F(null, { status: 200, statusText: "" });
          return v.ok = !1, v.status = 0, v.type = "error", v;
        };
        var W = [301, 302, 303, 307, 308];
        F.redirect = function(v, _) {
          if (W.indexOf(_) === -1)
            throw new RangeError("Invalid status code");
          return new F(null, { status: _, headers: { location: v } });
        }, o.DOMException = a.DOMException;
        try {
          new o.DOMException();
        } catch (v) {
          o.DOMException = function(_, D) {
            this.message = _, this.name = D;
            var L = Error(_);
            this.stack = L.stack;
          }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
        }
        function k(v, _) {
          return new Promise(function(D, L) {
            var U = new O(v, _);
            if (U.signal && U.signal.aborted)
              return L(new o.DOMException("Aborted", "AbortError"));
            var M = new XMLHttpRequest();
            function K() {
              M.abort();
            }
            M.onload = function() {
              var G = {
                statusText: M.statusText,
                headers: $(M.getAllResponseHeaders() || "")
              };
              U.url.indexOf("file://") === 0 && (M.status < 200 || M.status > 599) ? G.status = 200 : G.status = M.status, G.url = "responseURL" in M ? M.responseURL : G.headers.get("X-Request-URL");
              var ae = "response" in M ? M.response : M.responseText;
              setTimeout(function() {
                D(new F(ae, G));
              }, 0);
            }, M.onerror = function() {
              setTimeout(function() {
                L(new TypeError("Network request failed"));
              }, 0);
            }, M.ontimeout = function() {
              setTimeout(function() {
                L(new TypeError("Network request timed out"));
              }, 0);
            }, M.onabort = function() {
              setTimeout(function() {
                L(new o.DOMException("Aborted", "AbortError"));
              }, 0);
            };
            function Z(G) {
              try {
                return G === "" && a.location.href ? a.location.href : G;
              } catch (ae) {
                return G;
              }
            }
            if (M.open(U.method, Z(U.url), !0), U.credentials === "include" ? M.withCredentials = !0 : U.credentials === "omit" && (M.withCredentials = !1), "responseType" in M && (c.blob ? M.responseType = "blob" : c.arrayBuffer && (M.responseType = "arraybuffer")), _ && typeof _.headers == "object" && !(_.headers instanceof f || a.Headers && _.headers instanceof a.Headers)) {
              var ie = [];
              Object.getOwnPropertyNames(_.headers).forEach(function(G) {
                ie.push(p(G)), M.setRequestHeader(G, g(_.headers[G]));
              }), U.headers.forEach(function(G, ae) {
                ie.indexOf(ae) === -1 && M.setRequestHeader(ae, G);
              });
            } else
              U.headers.forEach(function(G, ae) {
                M.setRequestHeader(ae, G);
              });
            U.signal && (U.signal.addEventListener("abort", K), M.onreadystatechange = function() {
              M.readyState === 4 && U.signal.removeEventListener("abort", K);
            }), M.send(typeof U._bodyInit == "undefined" ? null : U._bodyInit);
          });
        }
        return k.polyfill = !0, a.fetch || (a.fetch = k, a.Headers = f, a.Request = O, a.Response = F), o.Headers = f, o.Request = O, o.Response = F, o.fetch = k, Object.defineProperty(o, "__esModule", { value: !0 }), o;
      })({});
    })(s), s.fetch.ponyfill = !0, delete s.fetch.polyfill;
    var n = r.fetch ? r : s;
    e = n.fetch, e.default = n.fetch, e.fetch = n.fetch, e.Headers = n.Headers, e.Request = n.Request, e.Response = n.Response, t.exports = e;
  }(Ea, Ea.exports)), Ea.exports;
}
var HP = WP();
const rf = /* @__PURE__ */ Du(HP);
var VP = Object.defineProperty, KP = Object.defineProperties, GP = Object.getOwnPropertyDescriptors, sf = Object.getOwnPropertySymbols, YP = Object.prototype.hasOwnProperty, ZP = Object.prototype.propertyIsEnumerable, nf = (t, e, r) => e in t ? VP(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, of = (t, e) => {
  for (var r in e || (e = {})) YP.call(e, r) && nf(t, r, e[r]);
  if (sf) for (var r of sf(e)) ZP.call(e, r) && nf(t, r, e[r]);
  return t;
}, af = (t, e) => KP(t, GP(e));
const JP = { Accept: "application/json", "Content-Type": "application/json" }, XP = "POST", cf = { headers: JP, method: XP }, lf = 10;
let Rr = class {
  constructor(e, r = !1) {
    if (this.url = e, this.disableProviderPing = r, this.events = new gr.EventEmitter(), this.isAvailable = !1, this.registering = !1, !Cp(e)) throw new Error(`Provided URL is not compatible with HTTP connection: ${e}`);
    this.url = e, this.disableProviderPing = r;
  }
  get connected() {
    return this.isAvailable;
  }
  get connecting() {
    return this.registering;
  }
  on(e, r) {
    this.events.on(e, r);
  }
  once(e, r) {
    this.events.once(e, r);
  }
  off(e, r) {
    this.events.off(e, r);
  }
  removeListener(e, r) {
    this.events.removeListener(e, r);
  }
  open() {
    return h(this, arguments, function* (e = this.url) {
      yield this.register(e);
    });
  }
  close() {
    return h(this, null, function* () {
      if (!this.isAvailable) throw new Error("Connection already closed");
      this.onClose();
    });
  }
  send(e) {
    return h(this, null, function* () {
      this.isAvailable || (yield this.register());
      try {
        const r = cs(e), s = yield (yield rf(this.url, af(of({}, cf), { body: r }))).json();
        this.onPayload({ data: s });
      } catch (r) {
        this.onError(e.id, r);
      }
    });
  }
  register() {
    return h(this, arguments, function* (e = this.url) {
      if (!Cp(e)) throw new Error(`Provided URL is not compatible with HTTP connection: ${e}`);
      if (this.registering) {
        const r = this.events.getMaxListeners();
        return (this.events.listenerCount("register_error") >= r || this.events.listenerCount("open") >= r) && this.events.setMaxListeners(r + 1), new Promise((s, n) => {
          this.events.once("register_error", (i) => {
            this.resetMaxListeners(), n(i);
          }), this.events.once("open", () => {
            if (this.resetMaxListeners(), typeof this.isAvailable > "u") return n(new Error("HTTP connection is missing or invalid"));
            s();
          });
        });
      }
      this.url = e, this.registering = !0;
      try {
        if (!this.disableProviderPing) {
          const r = cs({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
          yield rf(e, af(of({}, cf), { body: r }));
        }
        this.onOpen();
      } catch (r) {
        const s = this.parseError(r);
        throw this.events.emit("register_error", s), this.onClose(), s;
      }
    });
  }
  onOpen() {
    this.isAvailable = !0, this.registering = !1, this.events.emit("open");
  }
  onClose() {
    this.isAvailable = !1, this.registering = !1, this.events.emit("close");
  }
  onPayload(e) {
    if (typeof e.data > "u") return;
    const r = typeof e.data == "string" ? tn(e.data) : e.data;
    this.events.emit("payload", r);
  }
  onError(e, r) {
    const s = this.parseError(r), n = s.message || s.toString(), i = Tc(e, n);
    this.events.emit("payload", i);
  }
  parseError(e, r = this.url) {
    return Gm(e, r, "HTTP");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > lf && this.events.setMaxListeners(lf);
  }
};
const uf = "error", QP = "wss://relay.walletconnect.org", e2 = "wc", t2 = "universal_provider", _a = `${e2}@2:${t2}:`, ww = "https://rpc.walletconnect.org/v1/", Fn = "generic", r2 = `${ww}bundler`, wr = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
function s2() {
}
function sd(t) {
  return t == null || typeof t != "object" && typeof t != "function";
}
function nd(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function n2(t) {
  if (sd(t)) return t;
  if (Array.isArray(t) || nd(t) || t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) return t.slice(0);
  const e = Object.getPrototypeOf(t), r = e.constructor;
  if (t instanceof Date || t instanceof Map || t instanceof Set) return new r(t);
  if (t instanceof RegExp) {
    const s = new r(t);
    return s.lastIndex = t.lastIndex, s;
  }
  if (t instanceof DataView) return new r(t.buffer.slice(0));
  if (t instanceof Error) {
    const s = new r(t.message);
    return s.stack = t.stack, s.name = t.name, s.cause = t.cause, s;
  }
  if (typeof File < "u" && t instanceof File) return new r([t], t.name, { type: t.type, lastModified: t.lastModified });
  if (typeof t == "object") {
    const s = Object.create(e);
    return Object.assign(s, t);
  }
  return t;
}
function df(t) {
  return typeof t == "object" && t !== null;
}
function yw(t) {
  return Object.getOwnPropertySymbols(t).filter((e) => Object.prototype.propertyIsEnumerable.call(t, e));
}
function bw(t) {
  return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t);
}
const i2 = "[object RegExp]", vw = "[object String]", Ew = "[object Number]", _w = "[object Boolean]", Cw = "[object Arguments]", o2 = "[object Symbol]", a2 = "[object Date]", c2 = "[object Map]", l2 = "[object Set]", u2 = "[object Array]", d2 = "[object ArrayBuffer]", h2 = "[object Object]", p2 = "[object DataView]", f2 = "[object Uint8Array]", g2 = "[object Uint8ClampedArray]", m2 = "[object Uint16Array]", w2 = "[object Uint32Array]", y2 = "[object Int8Array]", b2 = "[object Int16Array]", v2 = "[object Int32Array]", E2 = "[object Float32Array]", _2 = "[object Float64Array]";
function C2(t, e) {
  return Wn(t, void 0, t, /* @__PURE__ */ new Map(), e);
}
function Wn(t, e, r, s = /* @__PURE__ */ new Map(), n = void 0) {
  const i = n == null ? void 0 : n(t, e, r, s);
  if (i != null) return i;
  if (sd(t)) return t;
  if (s.has(t)) return s.get(t);
  if (Array.isArray(t)) {
    const o = new Array(t.length);
    s.set(t, o);
    for (let a = 0; a < t.length; a++) o[a] = Wn(t[a], a, r, s, n);
    return Object.hasOwn(t, "index") && (o.index = t.index), Object.hasOwn(t, "input") && (o.input = t.input), o;
  }
  if (t instanceof Date) return new Date(t.getTime());
  if (t instanceof RegExp) {
    const o = new RegExp(t.source, t.flags);
    return o.lastIndex = t.lastIndex, o;
  }
  if (t instanceof Map) {
    const o = /* @__PURE__ */ new Map();
    s.set(t, o);
    for (const [a, c] of t) o.set(a, Wn(c, a, r, s, n));
    return o;
  }
  if (t instanceof Set) {
    const o = /* @__PURE__ */ new Set();
    s.set(t, o);
    for (const a of t) o.add(Wn(a, void 0, r, s, n));
    return o;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(t)) return t.subarray();
  if (nd(t)) {
    const o = new (Object.getPrototypeOf(t)).constructor(t.length);
    s.set(t, o);
    for (let a = 0; a < t.length; a++) o[a] = Wn(t[a], a, r, s, n);
    return o;
  }
  if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) return t.slice(0);
  if (t instanceof DataView) {
    const o = new DataView(t.buffer.slice(0), t.byteOffset, t.byteLength);
    return s.set(t, o), Ws(o, t, r, s, n), o;
  }
  if (typeof File < "u" && t instanceof File) {
    const o = new File([t], t.name, { type: t.type });
    return s.set(t, o), Ws(o, t, r, s, n), o;
  }
  if (t instanceof Blob) {
    const o = new Blob([t], { type: t.type });
    return s.set(t, o), Ws(o, t, r, s, n), o;
  }
  if (t instanceof Error) {
    const o = new t.constructor();
    return s.set(t, o), o.message = t.message, o.name = t.name, o.stack = t.stack, o.cause = t.cause, Ws(o, t, r, s, n), o;
  }
  if (typeof t == "object" && A2(t)) {
    const o = Object.create(Object.getPrototypeOf(t));
    return s.set(t, o), Ws(o, t, r, s, n), o;
  }
  return t;
}
function Ws(t, e, r = t, s, n) {
  const i = [...Object.keys(e), ...yw(e)];
  for (let o = 0; o < i.length; o++) {
    const a = i[o], c = Object.getOwnPropertyDescriptor(t, a);
    (c == null || c.writable) && (t[a] = Wn(e[a], a, r, s, n));
  }
}
function A2(t) {
  switch (bw(t)) {
    case Cw:
    case u2:
    case d2:
    case p2:
    case _w:
    case a2:
    case E2:
    case _2:
    case y2:
    case b2:
    case v2:
    case c2:
    case Ew:
    case h2:
    case i2:
    case l2:
    case vw:
    case o2:
    case f2:
    case g2:
    case m2:
    case w2:
      return !0;
    default:
      return !1;
  }
}
function S2(t, e) {
  return C2(t, (r, s, n, i) => {
    if (typeof t == "object") switch (Object.prototype.toString.call(t)) {
      case Ew:
      case vw:
      case _w: {
        const o = new t.constructor(t == null ? void 0 : t.valueOf());
        return Ws(o, t), o;
      }
      case Cw: {
        const o = {};
        return Ws(o, t), o.length = t.length, o[Symbol.iterator] = t[Symbol.iterator], o;
      }
      default:
        return;
    }
  });
}
function hf(t) {
  return S2(t);
}
function pf(t) {
  return t !== null && typeof t == "object" && bw(t) === "[object Arguments]";
}
function I2(t) {
  return nd(t);
}
function N2(t) {
  var r;
  if (typeof t != "object" || t == null) return !1;
  if (Object.getPrototypeOf(t) === null) return !0;
  if (Object.prototype.toString.call(t) !== "[object Object]") {
    const s = t[Symbol.toStringTag];
    return s == null || !((r = Object.getOwnPropertyDescriptor(t, Symbol.toStringTag)) != null && r.writable) ? !1 : t.toString() === `[object ${s}]`;
  }
  let e = t;
  for (; Object.getPrototypeOf(e) !== null; ) e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e;
}
function T2(t, ...e) {
  const r = e.slice(0, -1), s = e[e.length - 1];
  let n = t;
  for (let i = 0; i < r.length; i++) {
    const o = r[i];
    n = Cu(n, o, s, /* @__PURE__ */ new Map());
  }
  return n;
}
function Cu(t, e, r, s) {
  var i;
  if (sd(t) && (t = Object(t)), e == null || typeof e != "object") return t;
  if (s.has(e)) return n2(s.get(e));
  if (s.set(e, t), Array.isArray(e)) {
    e = e.slice();
    for (let o = 0; o < e.length; o++) e[o] = (i = e[o]) != null ? i : void 0;
  }
  const n = [...Object.keys(e), ...yw(e)];
  for (let o = 0; o < n.length; o++) {
    const a = n[o];
    let c = e[a], l = t[a];
    if (pf(c) && (c = C({}, c)), pf(l) && (l = C({}, l)), typeof Buffer < "u" && Buffer.isBuffer(c) && (c = hf(c)), Array.isArray(c)) if (typeof l == "object" && l != null) {
      const d = [], p = Reflect.ownKeys(l);
      for (let g = 0; g < p.length; g++) {
        const m = p[g];
        d[m] = l[m];
      }
      l = d;
    } else l = [];
    const u = r(l, c, a, t, e, s);
    u != null ? t[a] = u : Array.isArray(c) || df(l) && df(c) ? t[a] = Cu(l, c, r, s) : l == null && N2(c) ? t[a] = Cu({}, c, r, s) : l == null && I2(c) ? t[a] = hf(c) : (l === void 0 || c !== void 0) && (t[a] = c);
  }
  return t;
}
function O2(t, ...e) {
  return T2(t, ...e, s2);
}
var R2 = Object.defineProperty, P2 = Object.defineProperties, x2 = Object.getOwnPropertyDescriptors, ff = Object.getOwnPropertySymbols, D2 = Object.prototype.hasOwnProperty, k2 = Object.prototype.propertyIsEnumerable, gf = (t, e, r) => e in t ? R2(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Ca = (t, e) => {
  for (var r in e || (e = {})) D2.call(e, r) && gf(t, r, e[r]);
  if (ff) for (var r of ff(e)) k2.call(e, r) && gf(t, r, e[r]);
  return t;
}, $2 = (t, e) => P2(t, x2(e));
function sr(t, e, r) {
  var s;
  const n = Hn(t);
  return ((s = e.rpcMap) == null ? void 0 : s[n.reference]) || `${ww}?chainId=${n.namespace}:${n.reference}&projectId=${r}`;
}
function wn(t) {
  return t.includes(":") ? t.split(":")[1] : t;
}
function Aw(t) {
  return t.map((e) => `${e.split(":")[0]}:${e.split(":")[1]}`);
}
function U2(t, e) {
  const r = Object.keys(e.namespaces).filter((n) => n.includes(t));
  if (!r.length) return [];
  const s = [];
  return r.forEach((n) => {
    const i = e.namespaces[n].accounts;
    s.push(...i);
  }), s;
}
function Sl(t = {}, e = {}) {
  const r = mf(t), s = mf(e);
  return O2(r, s);
}
function mf(t) {
  var e, r, s, n;
  const i = {};
  if (!oo(t)) return i;
  for (const [o, a] of Object.entries(t)) {
    const c = Xu(o) ? [o] : a.chains, l = a.methods || [], u = a.events || [], d = a.rpcMap || {}, p = Mi(o);
    i[p] = $2(Ca(Ca({}, i[p]), a), { chains: $a(c, (e = i[p]) == null ? void 0 : e.chains), methods: $a(l, (r = i[p]) == null ? void 0 : r.methods), events: $a(u, (s = i[p]) == null ? void 0 : s.events), rpcMap: Ca(Ca({}, d), (n = i[p]) == null ? void 0 : n.rpcMap) });
  }
  return i;
}
function wf(t) {
  return t.includes(":") ? t.split(":")[2] : t;
}
function yf(t) {
  const e = {};
  for (const [r, s] of Object.entries(t)) {
    const n = s.methods || [], i = s.events || [], o = s.accounts || [], a = Xu(r) ? [r] : s.chains ? s.chains : Aw(s.accounts);
    e[r] = { chains: a, methods: n, events: i, accounts: o };
  }
  return e;
}
function Il(t) {
  return typeof t == "number" ? t : t.includes("0x") ? parseInt(t, 16) : (t = t.includes(":") ? t.split(":")[1] : t, isNaN(Number(t)) ? t : Number(t));
}
const Sw = {}, Oe = (t) => Sw[t], Nl = (t, e) => {
  Sw[t] = e;
};
var L2 = Object.defineProperty, M2 = (t, e, r) => e in t ? L2(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, In = (t, e, r) => M2(t, typeof e != "symbol" ? e + "" : e, r);
class F2 {
  constructor(e) {
    In(this, "name", "polkadot"), In(this, "client"), In(this, "httpProviders"), In(this, "events"), In(this, "namespace"), In(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    this.httpProviders[e] || this.setHttpProvider(e, r), this.chainId = e, this.events.emit(wr.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((r) => r.split(":")[1] === this.chainId.toString()).map((r) => r.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((r) => {
      var s;
      const n = wn(r);
      e[n] = this.createHttpProvider(n, (s = this.namespace.rpcMap) == null ? void 0 : s[r]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || sr(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new mr(new Rr(s, Oe("disableProviderPing")));
  }
}
var B2 = Object.defineProperty, j2 = Object.defineProperties, q2 = Object.getOwnPropertyDescriptors, bf = Object.getOwnPropertySymbols, z2 = Object.prototype.hasOwnProperty, W2 = Object.prototype.propertyIsEnumerable, Au = (t, e, r) => e in t ? B2(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, vf = (t, e) => {
  for (var r in e || (e = {})) z2.call(e, r) && Au(t, r, e[r]);
  if (bf) for (var r of bf(e)) W2.call(e, r) && Au(t, r, e[r]);
  return t;
}, Ef = (t, e) => j2(t, q2(e)), Nn = (t, e, r) => Au(t, typeof e != "symbol" ? e + "" : e, r);
class H2 {
  constructor(e) {
    Nn(this, "name", "eip155"), Nn(this, "client"), Nn(this, "chainId"), Nn(this, "namespace"), Nn(this, "httpProviders"), Nn(this, "events"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
  }
  request(e) {
    return h(this, null, function* () {
      switch (e.request.method) {
        case "eth_requestAccounts":
          return this.getAccounts();
        case "eth_accounts":
          return this.getAccounts();
        case "wallet_switchEthereumChain":
          return yield this.handleSwitchChain(e);
        case "eth_chainId":
          return parseInt(this.getDefaultChain());
        case "wallet_getCapabilities":
          return yield this.getCapabilities(e);
        case "wallet_getCallsStatus":
          return yield this.getCallStatus(e);
      }
      return this.namespace.methods.includes(e.request.method) ? yield this.client.request(e) : this.getHttpProvider().request(e.request);
    });
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  setDefaultChain(e, r) {
    this.httpProviders[e] || this.setHttpProvider(parseInt(e), r), this.chainId = parseInt(e), this.events.emit(wr.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId.toString();
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  createHttpProvider(e, r) {
    const s = r || sr(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new mr(new Rr(s, Oe("disableProviderPing")));
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((r) => {
      var s;
      const n = parseInt(wn(r));
      e[n] = this.createHttpProvider(n, (s = this.namespace.rpcMap) == null ? void 0 : s[r]);
    }), e;
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((r) => r.split(":")[1] === this.chainId.toString()).map((r) => r.split(":")[2]))] : [];
  }
  getHttpProvider() {
    const e = this.chainId, r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  handleSwitchChain(e) {
    return h(this, null, function* () {
      var r, s;
      let n = e.request.params ? (r = e.request.params[0]) == null ? void 0 : r.chainId : "0x0";
      n = n.startsWith("0x") ? n : `0x${n}`;
      const i = parseInt(n, 16);
      if (this.isChainApproved(i)) this.setDefaultChain(`${i}`);
      else if (this.namespace.methods.includes("wallet_switchEthereumChain")) yield this.client.request({ topic: e.topic, request: { method: e.request.method, params: [{ chainId: n }] }, chainId: (s = this.namespace.chains) == null ? void 0 : s[0] }), this.setDefaultChain(`${i}`);
      else throw new Error(`Failed to switch to chain 'eip155:${i}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
      return null;
    });
  }
  isChainApproved(e) {
    return this.namespace.chains.includes(`${this.name}:${e}`);
  }
  getCapabilities(e) {
    return h(this, null, function* () {
      var r, s, n;
      const i = (s = (r = e.request) == null ? void 0 : r.params) == null ? void 0 : s[0];
      if (!i) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
      const o = this.client.session.get(e.topic), a = ((n = o == null ? void 0 : o.sessionProperties) == null ? void 0 : n.capabilities) || {};
      if (a != null && a[i]) return a == null ? void 0 : a[i];
      const c = yield this.client.request(e);
      try {
        yield this.client.session.update(e.topic, { sessionProperties: Ef(vf({}, o.sessionProperties || {}), { capabilities: Ef(vf({}, a || {}), { [i]: c }) }) });
      } catch (l) {
        console.warn("Failed to update session with capabilities", l);
      }
      return c;
    });
  }
  getCallStatus(e) {
    return h(this, null, function* () {
      var r, s;
      const n = this.client.session.get(e.topic), i = (r = n.sessionProperties) == null ? void 0 : r.bundler_name;
      if (i) {
        const a = this.getBundlerUrl(e.chainId, i);
        try {
          return yield this.getUserOperationReceipt(a, e);
        } catch (c) {
          console.warn("Failed to fetch call status from bundler", c, a);
        }
      }
      const o = (s = n.sessionProperties) == null ? void 0 : s.bundler_url;
      if (o) try {
        return yield this.getUserOperationReceipt(o, e);
      } catch (a) {
        console.warn("Failed to fetch call status from custom bundler", a, o);
      }
      if (this.namespace.methods.includes(e.request.method)) return yield this.client.request(e);
      throw new Error("Fetching call status not approved by the wallet.");
    });
  }
  getUserOperationReceipt(e, r) {
    return h(this, null, function* () {
      var s;
      const n = new URL(e), i = yield fetch(n, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Cs("eth_getUserOperationReceipt", [(s = r.request.params) == null ? void 0 : s[0]])) });
      if (!i.ok) throw new Error(`Failed to fetch user operation receipt - ${i.status}`);
      return yield i.json();
    });
  }
  getBundlerUrl(e, r) {
    return `${r2}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${r}`;
  }
}
var V2 = Object.defineProperty, K2 = (t, e, r) => e in t ? V2(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Tn = (t, e, r) => K2(t, typeof e != "symbol" ? e + "" : e, r);
class G2 {
  constructor(e) {
    Tn(this, "name", "solana"), Tn(this, "client"), Tn(this, "httpProviders"), Tn(this, "events"), Tn(this, "namespace"), Tn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    this.httpProviders[e] || this.setHttpProvider(e, r), this.chainId = e, this.events.emit(wr.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((r) => r.split(":")[1] === this.chainId.toString()).map((r) => r.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((r) => {
      var s;
      const n = wn(r);
      e[n] = this.createHttpProvider(n, (s = this.namespace.rpcMap) == null ? void 0 : s[r]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || sr(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new mr(new Rr(s, Oe("disableProviderPing")));
  }
}
var Y2 = Object.defineProperty, Z2 = (t, e, r) => e in t ? Y2(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, On = (t, e, r) => Z2(t, typeof e != "symbol" ? e + "" : e, r);
class J2 {
  constructor(e) {
    On(this, "name", "cosmos"), On(this, "client"), On(this, "httpProviders"), On(this, "events"), On(this, "namespace"), On(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    this.httpProviders[e] || this.setHttpProvider(e, r), this.chainId = e, this.events.emit(wr.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((r) => r.split(":")[1] === this.chainId.toString()).map((r) => r.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((r) => {
      var s;
      const n = wn(r);
      e[n] = this.createHttpProvider(n, (s = this.namespace.rpcMap) == null ? void 0 : s[r]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || sr(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new mr(new Rr(s, Oe("disableProviderPing")));
  }
}
var X2 = Object.defineProperty, Q2 = (t, e, r) => e in t ? X2(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Rn = (t, e, r) => Q2(t, typeof e != "symbol" ? e + "" : e, r);
class ex {
  constructor(e) {
    Rn(this, "name", "algorand"), Rn(this, "client"), Rn(this, "httpProviders"), Rn(this, "events"), Rn(this, "namespace"), Rn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    if (!this.httpProviders[e]) {
      const s = r || sr(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.chainId = e, this.events.emit(wr.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((r) => r.split(":")[1] === this.chainId.toString()).map((r) => r.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((r) => {
      var s;
      e[r] = this.createHttpProvider(r, (s = this.namespace.rpcMap) == null ? void 0 : s[r]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || sr(e, this.namespace, this.client.core.projectId);
    return typeof s > "u" ? void 0 : new mr(new Rr(s, Oe("disableProviderPing")));
  }
}
var tx = Object.defineProperty, rx = (t, e, r) => e in t ? tx(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Pn = (t, e, r) => rx(t, typeof e != "symbol" ? e + "" : e, r);
class sx {
  constructor(e) {
    Pn(this, "name", "cip34"), Pn(this, "client"), Pn(this, "httpProviders"), Pn(this, "events"), Pn(this, "namespace"), Pn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    this.httpProviders[e] || this.setHttpProvider(e, r), this.chainId = e, this.events.emit(wr.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((r) => r.split(":")[1] === this.chainId.toString()).map((r) => r.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((r) => {
      const s = this.getCardanoRPCUrl(r), n = wn(r);
      e[n] = this.createHttpProvider(n, s);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  getCardanoRPCUrl(e) {
    const r = this.namespace.rpcMap;
    if (r) return r[e];
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || this.getCardanoRPCUrl(e);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new mr(new Rr(s, Oe("disableProviderPing")));
  }
}
var nx = Object.defineProperty, ix = (t, e, r) => e in t ? nx(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, xn = (t, e, r) => ix(t, typeof e != "symbol" ? e + "" : e, r);
class ox {
  constructor(e) {
    xn(this, "name", "elrond"), xn(this, "client"), xn(this, "httpProviders"), xn(this, "events"), xn(this, "namespace"), xn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    this.httpProviders[e] || this.setHttpProvider(e, r), this.chainId = e, this.events.emit(wr.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((r) => r.split(":")[1] === this.chainId.toString()).map((r) => r.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((r) => {
      var s;
      const n = wn(r);
      e[n] = this.createHttpProvider(n, (s = this.namespace.rpcMap) == null ? void 0 : s[r]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || sr(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new mr(new Rr(s, Oe("disableProviderPing")));
  }
}
var ax = Object.defineProperty, cx = (t, e, r) => e in t ? ax(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Dn = (t, e, r) => cx(t, typeof e != "symbol" ? e + "" : e, r);
class lx {
  constructor(e) {
    Dn(this, "name", "multiversx"), Dn(this, "client"), Dn(this, "httpProviders"), Dn(this, "events"), Dn(this, "namespace"), Dn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    this.httpProviders[e] || this.setHttpProvider(e, r), this.chainId = e, this.events.emit(wr.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((r) => r.split(":")[1] === this.chainId.toString()).map((r) => r.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((r) => {
      var s;
      const n = wn(r);
      e[n] = this.createHttpProvider(n, (s = this.namespace.rpcMap) == null ? void 0 : s[r]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || sr(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new mr(new Rr(s, Oe("disableProviderPing")));
  }
}
var ux = Object.defineProperty, dx = (t, e, r) => e in t ? ux(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, kn = (t, e, r) => dx(t, typeof e != "symbol" ? e + "" : e, r);
class hx {
  constructor(e) {
    kn(this, "name", "near"), kn(this, "client"), kn(this, "httpProviders"), kn(this, "events"), kn(this, "namespace"), kn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    if (this.chainId = e, !this.httpProviders[e]) {
      const s = r || sr(`${this.name}:${e}`, this.namespace);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.events.emit(wr.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((r) => r.split(":")[1] === this.chainId.toString()).map((r) => r.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((r) => {
      var s;
      e[r] = this.createHttpProvider(r, (s = this.namespace.rpcMap) == null ? void 0 : s[r]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || sr(e, this.namespace);
    return typeof s > "u" ? void 0 : new mr(new Rr(s, Oe("disableProviderPing")));
  }
}
var px = Object.defineProperty, fx = (t, e, r) => e in t ? px(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, $n = (t, e, r) => fx(t, typeof e != "symbol" ? e + "" : e, r);
class gx {
  constructor(e) {
    $n(this, "name", "tezos"), $n(this, "client"), $n(this, "httpProviders"), $n(this, "events"), $n(this, "namespace"), $n(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, r) {
    if (this.chainId = e, !this.httpProviders[e]) {
      const s = r || sr(`${this.name}:${e}`, this.namespace);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.events.emit(wr.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((r) => r.split(":")[1] === this.chainId.toString()).map((r) => r.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((r) => {
      e[r] = this.createHttpProvider(r);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || sr(e, this.namespace);
    return typeof s > "u" ? void 0 : new mr(new Rr(s));
  }
}
var mx = Object.defineProperty, wx = (t, e, r) => e in t ? mx(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Un = (t, e, r) => wx(t, typeof e != "symbol" ? e + "" : e, r);
class yx {
  constructor(e) {
    Un(this, "name", Fn), Un(this, "client"), Un(this, "httpProviders"), Un(this, "events"), Un(this, "namespace"), Un(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace.chains = [...new Set((this.namespace.chains || []).concat(e.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(e.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(e.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(e.events || []))], this.httpProviders = this.createHttpProviders();
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider(e.chainId).request(e.request);
  }
  setDefaultChain(e, r) {
    this.httpProviders[e] || this.setHttpProvider(e, r), this.chainId = e, this.events.emit(wr.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((r) => r.split(":")[1] === this.chainId.toString()).map((r) => r.split(":")[2]))] : [];
  }
  createHttpProviders() {
    var e, r;
    const s = {};
    return (r = (e = this.namespace) == null ? void 0 : e.accounts) == null || r.forEach((n) => {
      const i = Hn(n);
      s[`${i.namespace}:${i.reference}`] = this.createHttpProvider(n);
    }), s;
  }
  getHttpProvider(e) {
    const r = this.httpProviders[e];
    if (typeof r > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return r;
  }
  setHttpProvider(e, r) {
    const s = this.createHttpProvider(e, r);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, r) {
    const s = r || sr(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new mr(new Rr(s, Oe("disableProviderPing")));
  }
}
var bx = Object.defineProperty, vx = Object.defineProperties, Ex = Object.getOwnPropertyDescriptors, _f = Object.getOwnPropertySymbols, _x = Object.prototype.hasOwnProperty, Cx = Object.prototype.propertyIsEnumerable, Su = (t, e, r) => e in t ? bx(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Aa = (t, e) => {
  for (var r in e || (e = {})) _x.call(e, r) && Su(t, r, e[r]);
  if (_f) for (var r of _f(e)) Cx.call(e, r) && Su(t, r, e[r]);
  return t;
}, Tl = (t, e) => vx(t, Ex(e)), cr = (t, e, r) => Su(t, typeof e != "symbol" ? e + "" : e, r);
let Ax = class Iw {
  constructor(e) {
    cr(this, "client"), cr(this, "namespaces"), cr(this, "optionalNamespaces"), cr(this, "sessionProperties"), cr(this, "scopedProperties"), cr(this, "events", new ku()), cr(this, "rpcProviders", {}), cr(this, "session"), cr(this, "providerOpts"), cr(this, "logger"), cr(this, "uri"), cr(this, "disableProviderPing", !1), this.providerOpts = e, this.logger = typeof (e == null ? void 0 : e.logger) < "u" && typeof (e == null ? void 0 : e.logger) != "string" ? e.logger : Vo(di({ level: (e == null ? void 0 : e.logger) || uf })), this.disableProviderPing = (e == null ? void 0 : e.disableProviderPing) || !1;
  }
  static init(e) {
    return h(this, null, function* () {
      const r = new Iw(e);
      return yield r.initialize(), r;
    });
  }
  request(e, r, s) {
    return h(this, null, function* () {
      const [n, i] = this.validateChain(r);
      if (!this.session) throw new Error("Please call connect() before request()");
      return yield this.getProvider(n).request({ request: Aa({}, e), chainId: `${n}:${i}`, topic: this.session.topic, expiry: s });
    });
  }
  sendAsync(e, r, s, n) {
    const i = (/* @__PURE__ */ new Date()).getTime();
    this.request(e, s, n).then((o) => r(null, Nc(i, o))).catch((o) => r(o, void 0));
  }
  enable() {
    return h(this, null, function* () {
      if (!this.client) throw new Error("Sign Client not initialized");
      return this.session || (yield this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties })), yield this.requestAccounts();
    });
  }
  disconnect() {
    return h(this, null, function* () {
      var e;
      if (!this.session) throw new Error("Please call connect() before enable()");
      yield this.client.disconnect({ topic: (e = this.session) == null ? void 0 : e.topic, reason: Le("USER_DISCONNECTED") }), yield this.cleanup();
    });
  }
  connect(e) {
    return h(this, null, function* () {
      if (!this.client) throw new Error("Sign Client not initialized");
      if (this.setNamespaces(e), yield this.cleanupPendingPairings(), !e.skipPairing) return yield this.pair(e.pairingTopic);
    });
  }
  authenticate(e, r) {
    return h(this, null, function* () {
      if (!this.client) throw new Error("Sign Client not initialized");
      this.setNamespaces(e), yield this.cleanupPendingPairings();
      const { uri: s, response: n } = yield this.client.authenticate(e, r);
      s && (this.uri = s, this.events.emit("display_uri", s));
      const i = yield n();
      if (this.session = i.session, this.session) {
        const o = yf(this.session.namespaces);
        this.namespaces = Sl(this.namespaces, o), yield this.persist("namespaces", this.namespaces), this.onConnect();
      }
      return i;
    });
  }
  on(e, r) {
    this.events.on(e, r);
  }
  once(e, r) {
    this.events.once(e, r);
  }
  removeListener(e, r) {
    this.events.removeListener(e, r);
  }
  off(e, r) {
    this.events.off(e, r);
  }
  get isWalletConnect() {
    return !0;
  }
  pair(e) {
    return h(this, null, function* () {
      const { uri: r, approval: s } = yield this.client.connect({ pairingTopic: e, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties });
      r && (this.uri = r, this.events.emit("display_uri", r));
      const n = yield s();
      this.session = n;
      const i = yf(n.namespaces);
      return this.namespaces = Sl(this.namespaces, i), yield this.persist("namespaces", this.namespaces), yield this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
    });
  }
  setDefaultChain(e, r) {
    try {
      if (!this.session) return;
      const [s, n] = this.validateChain(e), i = this.getProvider(s);
      i.name === Fn ? i.setDefaultChain(`${s}:${n}`, r) : i.setDefaultChain(n, r);
    } catch (s) {
      if (!/Please call connect/.test(s.message)) throw s;
    }
  }
  cleanupPendingPairings() {
    return h(this, arguments, function* (e = {}) {
      this.logger.info("Cleaning up inactive pairings...");
      const r = this.client.pairing.getAll();
      if (Ss(r)) {
        for (const s of r) e.deletePairings ? this.client.core.expirer.set(s.topic, 0) : yield this.client.core.relayer.subscriber.unsubscribe(s.topic);
        this.logger.info(`Inactive pairings cleared: ${r.length}`);
      }
    });
  }
  abortPairingAttempt() {
    this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
  }
  checkStorage() {
    return h(this, null, function* () {
      this.namespaces = (yield this.getFromStore("namespaces")) || {}, this.optionalNamespaces = (yield this.getFromStore("optionalNamespaces")) || {}, this.session && this.createProviders();
    });
  }
  initialize() {
    return h(this, null, function* () {
      this.logger.trace("Initialized"), yield this.createClient(), yield this.checkStorage(), this.registerEventListeners();
    });
  }
  createClient() {
    return h(this, null, function* () {
      var e, r;
      if (this.client = this.providerOpts.client || (yield zP.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || uf, relayUrl: this.providerOpts.relayUrl || QP, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled })), this.providerOpts.session) try {
        this.session = this.client.session.get(this.providerOpts.session.topic);
      } catch (s) {
        throw this.logger.error("Failed to get session", s), new Error(`The provided session: ${(r = (e = this.providerOpts) == null ? void 0 : e.session) == null ? void 0 : r.topic} doesn't exist in the Sign client`);
      }
      else {
        const s = this.client.session.getAll();
        this.session = s[0];
      }
      this.logger.trace("SignClient Initialized");
    });
  }
  createProviders() {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
    const e = [...new Set(Object.keys(this.session.namespaces).map((r) => Mi(r)))];
    Nl("client", this.client), Nl("events", this.events), Nl("disableProviderPing", this.disableProviderPing), e.forEach((r) => {
      if (!this.session) return;
      const s = U2(r, this.session), n = Aw(s), i = Sl(this.namespaces, this.optionalNamespaces), o = Tl(Aa({}, i[r]), { accounts: s, chains: n });
      switch (r) {
        case "eip155":
          this.rpcProviders[r] = new H2({ namespace: o });
          break;
        case "algorand":
          this.rpcProviders[r] = new ex({ namespace: o });
          break;
        case "solana":
          this.rpcProviders[r] = new G2({ namespace: o });
          break;
        case "cosmos":
          this.rpcProviders[r] = new J2({ namespace: o });
          break;
        case "polkadot":
          this.rpcProviders[r] = new F2({ namespace: o });
          break;
        case "cip34":
          this.rpcProviders[r] = new sx({ namespace: o });
          break;
        case "elrond":
          this.rpcProviders[r] = new ox({ namespace: o });
          break;
        case "multiversx":
          this.rpcProviders[r] = new lx({ namespace: o });
          break;
        case "near":
          this.rpcProviders[r] = new hx({ namespace: o });
          break;
        case "tezos":
          this.rpcProviders[r] = new gx({ namespace: o });
          break;
        default:
          this.rpcProviders[Fn] ? this.rpcProviders[Fn].updateNamespace(o) : this.rpcProviders[Fn] = new yx({ namespace: o });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (e) => {
      var r;
      const { topic: s } = e;
      s === ((r = this.session) == null ? void 0 : r.topic) && this.events.emit("session_ping", e);
    }), this.client.on("session_event", (e) => {
      var r;
      const { params: s, topic: n } = e;
      if (n !== ((r = this.session) == null ? void 0 : r.topic)) return;
      const { event: i } = s;
      if (i.name === "accountsChanged") {
        const o = i.data;
        o && Ss(o) && this.events.emit("accountsChanged", o.map(wf));
      } else if (i.name === "chainChanged") {
        const o = s.chainId, a = s.event.data, c = Mi(o), l = Il(o) !== Il(a) ? `${c}:${Il(a)}` : o;
        this.onChainChanged(l);
      } else this.events.emit(i.name, i.data);
      this.events.emit("session_event", e);
    }), this.client.on("session_update", ({ topic: e, params: r }) => {
      var s, n;
      if (e !== ((s = this.session) == null ? void 0 : s.topic)) return;
      const { namespaces: i } = r, o = (n = this.client) == null ? void 0 : n.session.get(e);
      this.session = Tl(Aa({}, o), { namespaces: i }), this.onSessionUpdate(), this.events.emit("session_update", { topic: e, params: r });
    }), this.client.on("session_delete", (e) => h(this, null, function* () {
      var r;
      e.topic === ((r = this.session) == null ? void 0 : r.topic) && (yield this.cleanup(), this.events.emit("session_delete", e), this.events.emit("disconnect", Tl(Aa({}, Le("USER_DISCONNECTED")), { data: e.topic })));
    })), this.on(wr.DEFAULT_CHAIN_CHANGED, (e) => {
      this.onChainChanged(e, !0);
    });
  }
  getProvider(e) {
    return this.rpcProviders[e] || this.rpcProviders[Fn];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((e) => {
      var r;
      this.getProvider(e).updateNamespace((r = this.session) == null ? void 0 : r.namespaces[e]);
    });
  }
  setNamespaces(e) {
    const { namespaces: r, optionalNamespaces: s, sessionProperties: n, scopedProperties: i } = e;
    r && Object.keys(r).length && (this.namespaces = r), s && Object.keys(s).length && (this.optionalNamespaces = s), this.sessionProperties = n, this.scopedProperties = i;
  }
  validateChain(e) {
    const [r, s] = (e == null ? void 0 : e.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [r, s];
    if (r && !Object.keys(this.namespaces || {}).map((o) => Mi(o)).includes(r)) throw new Error(`Namespace '${r}' is not configured. Please call connect() first with namespace config.`);
    if (r && s) return [r, s];
    const n = Mi(Object.keys(this.namespaces)[0]), i = this.rpcProviders[n].getDefaultChain();
    return [n, i];
  }
  requestAccounts() {
    return h(this, null, function* () {
      const [e] = this.validateChain();
      return yield this.getProvider(e).requestAccounts();
    });
  }
  onChainChanged(e, r = !1) {
    return h(this, null, function* () {
      if (!this.namespaces) return;
      const [s, n] = this.validateChain(e);
      if (!n) return;
      this.updateNamespaceChain(s, n), this.events.emit("chainChanged", n);
      const i = this.getProvider(s).getDefaultChain();
      r || this.getProvider(s).setDefaultChain(n), this.emitAccountsChangedOnChainChange({ namespace: s, previousChainId: i, newChainId: e }), yield this.persist("namespaces", this.namespaces);
    });
  }
  emitAccountsChangedOnChainChange({ namespace: e, previousChainId: r, newChainId: s }) {
    var n, i;
    try {
      if (r === s) return;
      const o = (i = (n = this.session) == null ? void 0 : n.namespaces[e]) == null ? void 0 : i.accounts;
      if (!o) return;
      const a = o.filter((c) => c.includes(`${s}:`)).map(wf);
      if (!Ss(a)) return;
      this.events.emit("accountsChanged", a);
    } catch (o) {
      this.logger.warn("Failed to emit accountsChanged on chain change", o);
    }
  }
  updateNamespaceChain(e, r) {
    if (!this.namespaces) return;
    const s = this.namespaces[e] ? e : `${e}:${r}`, n = { chains: [], methods: [], events: [], defaultChain: r };
    this.namespaces[s] ? this.namespaces[s] && (this.namespaces[s].defaultChain = r) : this.namespaces[s] = n;
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  cleanup() {
    return h(this, null, function* () {
      this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, yield this.deleteFromStore("namespaces"), yield this.deleteFromStore("optionalNamespaces"), yield this.deleteFromStore("sessionProperties"), this.session = void 0, yield this.cleanupPendingPairings({ deletePairings: !0 }), yield this.cleanupStorage();
    });
  }
  persist(e, r) {
    return h(this, null, function* () {
      var s;
      const n = ((s = this.session) == null ? void 0 : s.topic) || "";
      yield this.client.core.storage.setItem(`${_a}/${e}${n}`, r);
    });
  }
  getFromStore(e) {
    return h(this, null, function* () {
      var r;
      const s = ((r = this.session) == null ? void 0 : r.topic) || "";
      return yield this.client.core.storage.getItem(`${_a}/${e}${s}`);
    });
  }
  deleteFromStore(e) {
    return h(this, null, function* () {
      var r;
      const s = ((r = this.session) == null ? void 0 : r.topic) || "";
      yield this.client.core.storage.removeItem(`${_a}/${e}${s}`);
    });
  }
  cleanupStorage() {
    return h(this, null, function* () {
      var e;
      try {
        if (((e = this.client) == null ? void 0 : e.session.length) > 0) return;
        const r = yield this.client.core.storage.getKeys();
        for (const s of r) s.startsWith(_a) && (yield this.client.core.storage.removeItem(s));
      } catch (r) {
        this.logger.warn("Failed to cleanup storage", r);
      }
    });
  }
};
const Sx = "https://secure.walletconnect.org/sdk", Ix = (typeof process != "undefined" && typeof process.env != "undefined" ? process.env.NEXT_PUBLIC_SECURE_SITE_SDK_URL : void 0) || Sx, Nx = (typeof process != "undefined" && typeof process.env != "undefined" ? process.env.NEXT_PUBLIC_DEFAULT_LOG_LEVEL : void 0) || "error", Tx = (typeof process != "undefined" && typeof process.env != "undefined" ? process.env.NEXT_PUBLIC_SECURE_SITE_SDK_VERSION : void 0) || "4", te = {
  APP_EVENT_KEY: "@w3m-app/",
  FRAME_EVENT_KEY: "@w3m-frame/",
  RPC_METHOD_KEY: "RPC_",
  STORAGE_KEY: "@appkit-wallet/",
  SESSION_TOKEN_KEY: "SESSION_TOKEN_KEY",
  EMAIL_LOGIN_USED_KEY: "EMAIL_LOGIN_USED_KEY",
  LAST_USED_CHAIN_KEY: "LAST_USED_CHAIN_KEY",
  LAST_EMAIL_LOGIN_TIME: "LAST_EMAIL_LOGIN_TIME",
  EMAIL: "EMAIL",
  PREFERRED_ACCOUNT_TYPE: "PREFERRED_ACCOUNT_TYPE",
  SMART_ACCOUNT_ENABLED: "SMART_ACCOUNT_ENABLED",
  SMART_ACCOUNT_ENABLED_NETWORKS: "SMART_ACCOUNT_ENABLED_NETWORKS",
  SOCIAL_USERNAME: "SOCIAL_USERNAME",
  APP_SWITCH_NETWORK: "@w3m-app/SWITCH_NETWORK",
  APP_CONNECT_EMAIL: "@w3m-app/CONNECT_EMAIL",
  APP_CONNECT_DEVICE: "@w3m-app/CONNECT_DEVICE",
  APP_CONNECT_OTP: "@w3m-app/CONNECT_OTP",
  APP_CONNECT_SOCIAL: "@w3m-app/CONNECT_SOCIAL",
  APP_GET_SOCIAL_REDIRECT_URI: "@w3m-app/GET_SOCIAL_REDIRECT_URI",
  APP_GET_USER: "@w3m-app/GET_USER",
  APP_SIGN_OUT: "@w3m-app/SIGN_OUT",
  APP_IS_CONNECTED: "@w3m-app/IS_CONNECTED",
  APP_GET_CHAIN_ID: "@w3m-app/GET_CHAIN_ID",
  APP_RPC_REQUEST: "@w3m-app/RPC_REQUEST",
  APP_UPDATE_EMAIL: "@w3m-app/UPDATE_EMAIL",
  APP_UPDATE_EMAIL_PRIMARY_OTP: "@w3m-app/UPDATE_EMAIL_PRIMARY_OTP",
  APP_UPDATE_EMAIL_SECONDARY_OTP: "@w3m-app/UPDATE_EMAIL_SECONDARY_OTP",
  APP_AWAIT_UPDATE_EMAIL: "@w3m-app/AWAIT_UPDATE_EMAIL",
  APP_SYNC_THEME: "@w3m-app/SYNC_THEME",
  APP_SYNC_DAPP_DATA: "@w3m-app/SYNC_DAPP_DATA",
  APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS: "@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS",
  APP_INIT_SMART_ACCOUNT: "@w3m-app/INIT_SMART_ACCOUNT",
  APP_SET_PREFERRED_ACCOUNT: "@w3m-app/SET_PREFERRED_ACCOUNT",
  APP_CONNECT_FARCASTER: "@w3m-app/CONNECT_FARCASTER",
  APP_GET_FARCASTER_URI: "@w3m-app/GET_FARCASTER_URI",
  APP_RELOAD: "@w3m-app/RELOAD",
  FRAME_SWITCH_NETWORK_ERROR: "@w3m-frame/SWITCH_NETWORK_ERROR",
  FRAME_SWITCH_NETWORK_SUCCESS: "@w3m-frame/SWITCH_NETWORK_SUCCESS",
  FRAME_CONNECT_EMAIL_ERROR: "@w3m-frame/CONNECT_EMAIL_ERROR",
  FRAME_CONNECT_EMAIL_SUCCESS: "@w3m-frame/CONNECT_EMAIL_SUCCESS",
  FRAME_CONNECT_DEVICE_ERROR: "@w3m-frame/CONNECT_DEVICE_ERROR",
  FRAME_CONNECT_DEVICE_SUCCESS: "@w3m-frame/CONNECT_DEVICE_SUCCESS",
  FRAME_CONNECT_OTP_SUCCESS: "@w3m-frame/CONNECT_OTP_SUCCESS",
  FRAME_CONNECT_OTP_ERROR: "@w3m-frame/CONNECT_OTP_ERROR",
  FRAME_CONNECT_SOCIAL_SUCCESS: "@w3m-frame/CONNECT_SOCIAL_SUCCESS",
  FRAME_CONNECT_SOCIAL_ERROR: "@w3m-frame/CONNECT_SOCIAL_ERROR",
  FRAME_CONNECT_FARCASTER_SUCCESS: "@w3m-frame/CONNECT_FARCASTER_SUCCESS",
  FRAME_CONNECT_FARCASTER_ERROR: "@w3m-frame/CONNECT_FARCASTER_ERROR",
  FRAME_GET_FARCASTER_URI_SUCCESS: "@w3m-frame/GET_FARCASTER_URI_SUCCESS",
  FRAME_GET_FARCASTER_URI_ERROR: "@w3m-frame/GET_FARCASTER_URI_ERROR",
  FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS",
  FRAME_GET_SOCIAL_REDIRECT_URI_ERROR: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR",
  FRAME_GET_USER_SUCCESS: "@w3m-frame/GET_USER_SUCCESS",
  FRAME_GET_USER_ERROR: "@w3m-frame/GET_USER_ERROR",
  FRAME_SIGN_OUT_SUCCESS: "@w3m-frame/SIGN_OUT_SUCCESS",
  FRAME_SIGN_OUT_ERROR: "@w3m-frame/SIGN_OUT_ERROR",
  FRAME_IS_CONNECTED_SUCCESS: "@w3m-frame/IS_CONNECTED_SUCCESS",
  FRAME_IS_CONNECTED_ERROR: "@w3m-frame/IS_CONNECTED_ERROR",
  FRAME_GET_CHAIN_ID_SUCCESS: "@w3m-frame/GET_CHAIN_ID_SUCCESS",
  FRAME_GET_CHAIN_ID_ERROR: "@w3m-frame/GET_CHAIN_ID_ERROR",
  FRAME_RPC_REQUEST_SUCCESS: "@w3m-frame/RPC_REQUEST_SUCCESS",
  FRAME_RPC_REQUEST_ERROR: "@w3m-frame/RPC_REQUEST_ERROR",
  FRAME_SESSION_UPDATE: "@w3m-frame/SESSION_UPDATE",
  FRAME_UPDATE_EMAIL_SUCCESS: "@w3m-frame/UPDATE_EMAIL_SUCCESS",
  FRAME_UPDATE_EMAIL_ERROR: "@w3m-frame/UPDATE_EMAIL_ERROR",
  FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS",
  FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR",
  FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS",
  FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR",
  FRAME_SYNC_THEME_SUCCESS: "@w3m-frame/SYNC_THEME_SUCCESS",
  FRAME_SYNC_THEME_ERROR: "@w3m-frame/SYNC_THEME_ERROR",
  FRAME_SYNC_DAPP_DATA_SUCCESS: "@w3m-frame/SYNC_DAPP_DATA_SUCCESS",
  FRAME_SYNC_DAPP_DATA_ERROR: "@w3m-frame/SYNC_DAPP_DATA_ERROR",
  FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS",
  FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR",
  FRAME_INIT_SMART_ACCOUNT_SUCCESS: "@w3m-frame/INIT_SMART_ACCOUNT_SUCCESS",
  FRAME_INIT_SMART_ACCOUNT_ERROR: "@w3m-frame/INIT_SMART_ACCOUNT_ERROR",
  FRAME_SET_PREFERRED_ACCOUNT_SUCCESS: "@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS",
  FRAME_SET_PREFERRED_ACCOUNT_ERROR: "@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR",
  FRAME_READY: "@w3m-frame/READY",
  FRAME_RELOAD_SUCCESS: "@w3m-frame/RELOAD_SUCCESS",
  FRAME_RELOAD_ERROR: "@w3m-frame/RELOAD_ERROR",
  RPC_RESPONSE_TYPE_ERROR: "RPC_RESPONSE_ERROR",
  RPC_RESPONSE_TYPE_TX: "RPC_RESPONSE_TRANSACTION_HASH",
  RPC_RESPONSE_TYPE_OBJECT: "RPC_RESPONSE_OBJECT"
}, Et = {
  SAFE_RPC_METHODS: [
    "eth_accounts",
    "eth_blockNumber",
    "eth_call",
    "eth_chainId",
    "eth_estimateGas",
    "eth_feeHistory",
    "eth_gasPrice",
    "eth_getAccount",
    "eth_getBalance",
    "eth_getBlockByHash",
    "eth_getBlockByNumber",
    "eth_getBlockReceipts",
    "eth_getBlockTransactionCountByHash",
    "eth_getBlockTransactionCountByNumber",
    "eth_getCode",
    "eth_getFilterChanges",
    "eth_getFilterLogs",
    "eth_getLogs",
    "eth_getProof",
    "eth_getStorageAt",
    "eth_getTransactionByBlockHashAndIndex",
    "eth_getTransactionByBlockNumberAndIndex",
    "eth_getTransactionByHash",
    "eth_getTransactionCount",
    "eth_getTransactionReceipt",
    "eth_getUncleCountByBlockHash",
    "eth_getUncleCountByBlockNumber",
    "eth_maxPriorityFeePerGas",
    "eth_newBlockFilter",
    "eth_newFilter",
    "eth_newPendingTransactionFilter",
    "eth_sendRawTransaction",
    "eth_syncing",
    "eth_uninstallFilter",
    "wallet_getCapabilities",
    "wallet_getCallsStatus",
    "eth_getUserOperationReceipt",
    "eth_estimateUserOperationGas",
    "eth_getUserOperationByHash",
    "eth_supportedEntryPoints",
    "wallet_getAssets"
  ],
  NOT_SAFE_RPC_METHODS: [
    "personal_sign",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "solana_signMessage",
    "solana_signTransaction",
    "solana_signAllTransactions",
    "solana_signAndSendTransaction",
    "wallet_sendCalls",
    "wallet_grantPermissions",
    "wallet_revokePermissions",
    "eth_sendUserOperation"
  ],
  GET_CHAIN_ID: "eth_chainId",
  RPC_METHOD_NOT_ALLOWED_MESSAGE: "Requested RPC call is not allowed",
  RPC_METHOD_NOT_ALLOWED_UI_MESSAGE: "Action not allowed",
  ACCOUNT_TYPES: {
    EOA: "eoa",
    SMART_ACCOUNT: "smartAccount"
  }
}, Bs = Object.freeze({
  message: "",
  variant: "success",
  svg: void 0,
  open: !1,
  autoClose: !0
}), st = Ye(C({}, Bs)), Ar = {
  state: st,
  subscribeKey(t, e) {
    return Wt(st, t, e);
  },
  showLoading(t, e = {}) {
    this._showMessage(C({ message: t, variant: "loading" }, e));
  },
  showSuccess(t) {
    this._showMessage({ message: t, variant: "success" });
  },
  showSvg(t, e) {
    this._showMessage({ message: t, svg: e });
  },
  showError(t) {
    const e = he.parseError(t);
    this._showMessage({ message: e, variant: "error" });
  },
  hide() {
    st.message = Bs.message, st.variant = Bs.variant, st.svg = Bs.svg, st.open = Bs.open, st.autoClose = Bs.autoClose;
  },
  _showMessage({ message: t, svg: e, variant: r = "success", autoClose: s = Bs.autoClose }) {
    st.open ? (st.open = !1, setTimeout(() => {
      st.message = t, st.variant = r, st.svg = e, st.open = !0, st.autoClose = s;
    }, 150)) : (st.message = t, st.variant = r, st.svg = e, st.open = !0, st.autoClose = s);
  }
}, Vi = {
  getSIWX() {
    return q.state.siwx;
  },
  initializeIfEnabled() {
    return h(this, null, function* () {
      var i;
      const t = q.state.siwx, e = R.getActiveCaipAddress();
      if (!(t && e))
        return;
      const [r, s, n] = e.split(":");
      if (R.checkIfSupportedNetwork(r))
        try {
          if ((yield t.getSessions(`${r}:${s}`, n)).length)
            return;
          yield et.open({
            view: "SIWXSignMessage"
          });
        } catch (o) {
          console.error("SIWXUtil:initializeIfEnabled", o), Ke.sendEvent({
            type: "track",
            event: "SIWX_AUTH_ERROR",
            properties: this.getSIWXEventProperties()
          }), yield (i = He._getClient()) == null ? void 0 : i.disconnect().catch(console.error), xe.reset("Connect"), Ar.showError("A problem occurred while trying initialize authentication");
        }
    });
  },
  requestSignMessage() {
    return h(this, null, function* () {
      const t = q.state.siwx, e = he.getPlainAddress(R.getActiveCaipAddress()), r = R.getActiveCaipNetwork(), s = He._getClient();
      if (!t)
        throw new Error("SIWX is not enabled");
      if (!e)
        throw new Error("No ActiveCaipAddress found");
      if (!r)
        throw new Error("No ActiveCaipNetwork or client found");
      if (!s)
        throw new Error("No ConnectionController client found");
      try {
        const n = yield t.createMessage({
          chainId: r.caipNetworkId,
          accountAddress: e
        }), i = n.toString();
        pe.getConnectorId(r.chainNamespace) === se.CONNECTOR_ID.AUTH && xe.pushTransactionStack({
          view: null,
          goBack: !1,
          replace: !0
        });
        const a = yield s.signMessage(i);
        yield t.addSession({
          data: n,
          message: i,
          signature: a
        }), et.close(), Ke.sendEvent({
          type: "track",
          event: "SIWX_AUTH_SUCCESS",
          properties: this.getSIWXEventProperties()
        });
      } catch (n) {
        const i = this.getSIWXEventProperties();
        (!et.state.open || xe.state.view === "ApproveTransaction") && (yield et.open({
          view: "SIWXSignMessage"
        })), i.isSmartAccount ? Ar.showError("This application might not support Smart Accounts") : Ar.showError("Signature declined"), Ke.sendEvent({
          type: "track",
          event: "SIWX_AUTH_ERROR",
          properties: i
        }), console.error("SWIXUtil:requestSignMessage", n);
      }
    });
  },
  cancelSignMessage() {
    return h(this, null, function* () {
      var t;
      try {
        const e = this.getSIWX();
        ((t = e == null ? void 0 : e.getRequired) == null ? void 0 : t.call(e)) ? yield He.disconnect() : et.close(), xe.reset("Connect"), Ke.sendEvent({
          event: "CLICK_CANCEL_SIWX",
          type: "track",
          properties: this.getSIWXEventProperties()
        });
      } catch (e) {
        console.error("SIWXUtil:cancelSignMessage", e);
      }
    });
  },
  getSessions() {
    return h(this, null, function* () {
      const t = q.state.siwx, e = he.getPlainAddress(R.getActiveCaipAddress()), r = R.getActiveCaipNetwork();
      return t && e && r ? t.getSessions(r.caipNetworkId, e) : [];
    });
  },
  isSIWXCloseDisabled() {
    return h(this, null, function* () {
      var e;
      const t = this.getSIWX();
      if (t) {
        const r = xe.state.view === "ApproveTransaction", s = xe.state.view === "SIWXSignMessage";
        if (r || s)
          return ((e = t.getRequired) == null ? void 0 : e.call(t)) && (yield this.getSessions()).length === 0;
      }
      return !1;
    });
  },
  universalProviderAuthenticate(s) {
    return h(this, arguments, function* ({ universalProvider: t, chains: e, methods: r }) {
      var c, l, u;
      const n = Vi.getSIWX(), i = new Set(e.map((d) => d.split(":")[0]));
      if (!n || i.size !== 1 || !i.has("eip155"))
        return !1;
      const o = yield n.createMessage({
        chainId: ((c = R.getActiveCaipNetwork()) == null ? void 0 : c.caipNetworkId) || "",
        accountAddress: ""
      }), a = yield t.authenticate({
        nonce: o.nonce,
        domain: o.domain,
        uri: o.uri,
        exp: o.expirationTime,
        iat: o.issuedAt,
        nbf: o.notBefore,
        requestId: o.requestId,
        version: o.version,
        resources: o.resources,
        statement: o.statement,
        chainId: o.chainId,
        methods: r,
        // The first chainId is what is used for universal provider to build the message
        chains: [o.chainId, ...e.filter((d) => d !== o.chainId)]
      });
      if (Ar.showLoading("Authenticating...", { autoClose: !1 }), ne.setConnectedWalletInfo(B(C({}, a.session.peer.metadata), {
        name: a.session.peer.metadata.name,
        icon: (l = a.session.peer.metadata.icons) == null ? void 0 : l[0],
        type: "WALLET_CONNECT"
      }), Array.from(i)[0]), (u = a == null ? void 0 : a.auths) != null && u.length) {
        const d = a.auths.map((p) => {
          const g = t.client.formatAuthMessage({
            request: p.p,
            iss: p.p.iss
          });
          return {
            data: B(C({}, p.p), {
              accountAddress: p.p.iss.split(":").slice(-1).join(""),
              chainId: p.p.iss.split(":").slice(2, 4).join(":"),
              uri: p.p.aud,
              version: p.p.version || o.version,
              expirationTime: p.p.exp,
              issuedAt: p.p.iat,
              notBefore: p.p.nbf
            }),
            message: g,
            signature: p.s.s,
            cacao: p
          };
        });
        try {
          yield n.setSessions(d), Ke.sendEvent({
            type: "track",
            event: "SIWX_AUTH_SUCCESS",
            properties: Vi.getSIWXEventProperties()
          });
        } catch (p) {
          throw console.error("SIWX:universalProviderAuth - failed to set sessions", p), Ke.sendEvent({
            type: "track",
            event: "SIWX_AUTH_ERROR",
            properties: Vi.getSIWXEventProperties()
          }), yield t.disconnect().catch(console.error), p;
        } finally {
          Ar.hide();
        }
      }
      return !0;
    });
  },
  getSIWXEventProperties() {
    var e, r;
    const t = R.state.activeChain;
    return {
      network: ((e = R.state.activeCaipNetwork) == null ? void 0 : e.caipNetworkId) || "",
      isSmartAccount: ((r = ne.state.preferredAccountTypes) == null ? void 0 : r[t]) === Et.ACCOUNT_TYPES.SMART_ACCOUNT
    };
  },
  clearSessions() {
    return h(this, null, function* () {
      const t = this.getSIWX();
      t && (yield t.setSessions([]));
    });
  }
}, ze = Ye({
  transactions: [],
  coinbaseTransactions: {},
  transactionsByYear: {},
  lastNetworkInView: void 0,
  loading: !1,
  empty: !1,
  next: void 0
}), Ox = {
  state: ze,
  subscribe(t) {
    return Dt(ze, () => t(ze));
  },
  setLastNetworkInView(t) {
    ze.lastNetworkInView = t;
  },
  fetchTransactions(t, e) {
    return h(this, null, function* () {
      var r, s;
      if (!t)
        throw new Error("Transactions can't be fetched without an accountAddress");
      ze.loading = !0;
      try {
        const n = yield de.fetchTransactions({
          account: t,
          cursor: ze.next,
          onramp: e,
          // Coinbase transaction history state updates require the latest data
          cache: e === "coinbase" ? "no-cache" : void 0,
          chainId: (r = R.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId
        }), i = this.filterSpamTransactions(n.data), o = this.filterByConnectedChain(i), a = [...ze.transactions, ...o];
        ze.loading = !1, e === "coinbase" ? ze.coinbaseTransactions = this.groupTransactionsByYearAndMonth(ze.coinbaseTransactions, n.data) : (ze.transactions = a, ze.transactionsByYear = this.groupTransactionsByYearAndMonth(ze.transactionsByYear, o)), ze.empty = a.length === 0, ze.next = n.next ? n.next : void 0;
      } catch (n) {
        const i = R.state.activeChain;
        Ke.sendEvent({
          type: "track",
          event: "ERROR_FETCH_TRANSACTIONS",
          properties: {
            address: t,
            projectId: q.state.projectId,
            cursor: ze.next,
            isSmartAccount: ((s = ne.state.preferredAccountTypes) == null ? void 0 : s[i]) === Et.ACCOUNT_TYPES.SMART_ACCOUNT
          }
        }), Ar.showError("Failed to fetch transactions"), ze.loading = !1, ze.empty = !0, ze.next = void 0;
      }
    });
  },
  groupTransactionsByYearAndMonth(t = {}, e = []) {
    const r = t;
    return e.forEach((s) => {
      var l, u;
      const n = new Date(s.metadata.minedAt).getFullYear(), i = new Date(s.metadata.minedAt).getMonth(), o = (l = r[n]) != null ? l : {}, c = ((u = o[i]) != null ? u : []).filter((d) => d.id !== s.id);
      r[n] = B(C({}, o), {
        [i]: [...c, s].sort((d, p) => new Date(p.metadata.minedAt).getTime() - new Date(d.metadata.minedAt).getTime())
      });
    }), r;
  },
  filterSpamTransactions(t) {
    return t.filter((e) => !e.transfers.every((s) => {
      var n;
      return ((n = s.nft_info) == null ? void 0 : n.flags.is_spam) === !0;
    }));
  },
  filterByConnectedChain(t) {
    var s;
    const e = (s = R.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId;
    return t.filter((n) => n.metadata.chain === e);
  },
  clearCursor() {
    ze.next = void 0;
  },
  resetTransactions() {
    ze.transactions = [], ze.transactionsByYear = {}, ze.lastNetworkInView = void 0, ze.loading = !1, ze.empty = !1, ze.next = void 0;
  }
}, We = Ye({
  wcError: !1,
  buffering: !1,
  status: "disconnected"
});
let Ls;
const He = {
  state: We,
  subscribeKey(t, e) {
    return Wt(We, t, e);
  },
  _getClient() {
    return We._client;
  },
  setClient(t) {
    We._client = en(t);
  },
  connectWalletConnect() {
    return h(this, null, function* () {
      var t, e, r, s;
      if (he.isTelegram() || he.isSafari() && he.isIos()) {
        if (Ls) {
          yield Ls, Ls = void 0;
          return;
        }
        if (!he.isPairingExpired(We == null ? void 0 : We.wcPairingExpiry)) {
          const n = We.wcUri;
          We.wcUri = n;
          return;
        }
        Ls = (e = (t = this._getClient()) == null ? void 0 : t.connectWalletConnect) == null ? void 0 : e.call(t).catch(() => {
        }), this.state.status = "connecting", yield Ls, Ls = void 0, We.wcPairingExpiry = void 0, this.state.status = "connected";
      } else
        yield (s = (r = this._getClient()) == null ? void 0 : r.connectWalletConnect) == null ? void 0 : s.call(r);
    });
  },
  connectExternal(t, e, r = !0) {
    return h(this, null, function* () {
      var s, n;
      yield (n = (s = this._getClient()) == null ? void 0 : s.connectExternal) == null ? void 0 : n.call(s, t), r && R.setActiveNamespace(e);
    });
  },
  reconnectExternal(t) {
    return h(this, null, function* () {
      var r, s;
      yield (s = (r = this._getClient()) == null ? void 0 : r.reconnectExternal) == null ? void 0 : s.call(r, t);
      const e = t.chain || R.state.activeChain;
      e && pe.setConnectorId(t.id, e);
    });
  },
  setPreferredAccountType(t, e) {
    return h(this, null, function* () {
      var s, n;
      et.setLoading(!0, R.state.activeChain);
      const r = pe.getAuthConnector();
      r && (ne.setPreferredAccountType(t, e), yield r.provider.setPreferredAccount(t), re.setPreferredAccountTypes((s = ne.state.preferredAccountTypes) != null ? s : { [e]: t }), yield this.reconnectExternal(r), et.setLoading(!1, R.state.activeChain), Ke.sendEvent({
        type: "track",
        event: "SET_PREFERRED_ACCOUNT_TYPE",
        properties: {
          accountType: t,
          network: ((n = R.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) || ""
        }
      }));
    });
  },
  signMessage(t) {
    return h(this, null, function* () {
      var e;
      return (e = this._getClient()) == null ? void 0 : e.signMessage(t);
    });
  },
  parseUnits(t, e) {
    var r;
    return (r = this._getClient()) == null ? void 0 : r.parseUnits(t, e);
  },
  formatUnits(t, e) {
    var r;
    return (r = this._getClient()) == null ? void 0 : r.formatUnits(t, e);
  },
  sendTransaction(t) {
    return h(this, null, function* () {
      var e;
      return (e = this._getClient()) == null ? void 0 : e.sendTransaction(t);
    });
  },
  getCapabilities(t) {
    return h(this, null, function* () {
      var e;
      return (e = this._getClient()) == null ? void 0 : e.getCapabilities(t);
    });
  },
  grantPermissions(t) {
    return h(this, null, function* () {
      var e;
      return (e = this._getClient()) == null ? void 0 : e.grantPermissions(t);
    });
  },
  walletGetAssets(t) {
    return h(this, null, function* () {
      var e, r;
      return (r = (e = this._getClient()) == null ? void 0 : e.walletGetAssets(t)) != null ? r : {};
    });
  },
  estimateGas(t) {
    return h(this, null, function* () {
      var e;
      return (e = this._getClient()) == null ? void 0 : e.estimateGas(t);
    });
  },
  writeContract(t) {
    return h(this, null, function* () {
      var e;
      return (e = this._getClient()) == null ? void 0 : e.writeContract(t);
    });
  },
  getEnsAddress(t) {
    return h(this, null, function* () {
      var e;
      return (e = this._getClient()) == null ? void 0 : e.getEnsAddress(t);
    });
  },
  getEnsAvatar(t) {
    return h(this, null, function* () {
      var e;
      return (e = this._getClient()) == null ? void 0 : e.getEnsAvatar(t);
    });
  },
  checkInstalled(t) {
    var e, r;
    return ((r = (e = this._getClient()) == null ? void 0 : e.checkInstalled) == null ? void 0 : r.call(e, t)) || !1;
  },
  resetWcConnection() {
    We.wcUri = void 0, We.wcPairingExpiry = void 0, We.wcLinking = void 0, We.recentWallet = void 0, We.status = "disconnected", Ox.resetTransactions(), re.deleteWalletConnectDeepLink();
  },
  resetUri() {
    We.wcUri = void 0, We.wcPairingExpiry = void 0, Ls = void 0;
  },
  finalizeWcConnection() {
    var r, s;
    const { wcLinking: t, recentWallet: e } = He.state;
    t && re.setWalletConnectDeepLink(t), e && re.setAppKitRecent(e), Ke.sendEvent({
      type: "track",
      event: "CONNECT_SUCCESS",
      properties: {
        method: t ? "mobile" : "qrcode",
        name: ((s = (r = xe.state.data) == null ? void 0 : r.wallet) == null ? void 0 : s.name) || "Unknown"
      }
    });
  },
  setWcBasic(t) {
    We.wcBasic = t;
  },
  setUri(t) {
    We.wcUri = t, We.wcPairingExpiry = he.getPairingExpiry();
  },
  setWcLinking(t) {
    We.wcLinking = t;
  },
  setWcError(t) {
    We.wcError = t, We.buffering = !1;
  },
  setRecentWallet(t) {
    We.recentWallet = t;
  },
  setBuffering(t) {
    We.buffering = t;
  },
  setStatus(t) {
    We.status = t;
  },
  disconnect(t) {
    return h(this, null, function* () {
      try {
        et.setLoading(!0, t), yield Vi.clearSessions(), yield R.disconnect(t), et.setLoading(!1, t), pe.setFilterByNamespace(void 0);
      } catch (e) {
        throw new Error("Failed to disconnect");
      }
    });
  }
}, Ln = Ye({
  loading: !1,
  open: !1,
  selectedNetworkId: void 0,
  activeChain: void 0,
  initialized: !1
}), qr = {
  state: Ln,
  subscribe(t) {
    return Dt(Ln, () => t(Ln));
  },
  subscribeOpen(t) {
    return Wt(Ln, "open", t);
  },
  set(t) {
    Object.assign(Ln, C(C({}, Ln), t));
  }
};
function Rx(t, { strict: e = !0 } = {}) {
  return !t || typeof t != "string" ? !1 : e ? /^0x[0-9a-fA-F]*$/.test(t) : t.startsWith("0x");
}
function Cf(t) {
  return Rx(t, { strict: !1 }) ? Math.ceil((t.length - 2) / 2) : t.length;
}
const Nw = "2.29.2";
let xi = {
  getDocsUrl: ({ docsBaseUrl: t, docsPath: e = "", docsSlug: r }) => e ? `${t != null ? t : "https://viem.sh"}${e}${r ? `#${r}` : ""}` : void 0,
  version: `viem@${Nw}`
};
class nr extends Error {
  constructor(e, r = {}) {
    var a, c;
    const s = (() => {
      var l;
      return r.cause instanceof nr ? r.cause.details : (l = r.cause) != null && l.message ? r.cause.message : r.details;
    })(), n = r.cause instanceof nr && r.cause.docsPath || r.docsPath, i = (a = xi.getDocsUrl) == null ? void 0 : a.call(xi, B(C({}, r), { docsPath: n })), o = [
      e || "An error occurred.",
      "",
      ...r.metaMessages ? [...r.metaMessages, ""] : [],
      ...i ? [`Docs: ${i}`] : [],
      ...s ? [`Details: ${s}`] : [],
      ...xi.version ? [`Version: ${xi.version}`] : []
    ].join(`
`);
    super(o, r.cause ? { cause: r.cause } : void 0), Object.defineProperty(this, "details", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "docsPath", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "metaMessages", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "shortMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "version", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BaseError"
    }), this.details = s, this.docsPath = n, this.metaMessages = r.metaMessages, this.name = (c = r.name) != null ? c : this.name, this.shortMessage = e, this.version = Nw;
  }
  walk(e) {
    return Tw(this, e);
  }
}
function Tw(t, e) {
  return e != null && e(t) ? t : t && typeof t == "object" && "cause" in t && t.cause !== void 0 ? Tw(t.cause, e) : e ? null : t;
}
class Ow extends nr {
  constructor({ size: e, targetSize: r, type: s }) {
    super(`${s.charAt(0).toUpperCase()}${s.slice(1).toLowerCase()} size (${e}) exceeds padding size (${r}).`, { name: "SizeExceedsPaddingSizeError" });
  }
}
function id(t, { dir: e, size: r = 32 } = {}) {
  return typeof t == "string" ? Px(t, { dir: e, size: r }) : xx(t, { dir: e, size: r });
}
function Px(t, { dir: e, size: r = 32 } = {}) {
  if (r === null)
    return t;
  const s = t.replace("0x", "");
  if (s.length > r * 2)
    throw new Ow({
      size: Math.ceil(s.length / 2),
      targetSize: r,
      type: "hex"
    });
  return `0x${s[e === "right" ? "padEnd" : "padStart"](r * 2, "0")}`;
}
function xx(t, { dir: e, size: r = 32 } = {}) {
  if (r === null)
    return t;
  if (t.length > r)
    throw new Ow({
      size: t.length,
      targetSize: r,
      type: "bytes"
    });
  const s = new Uint8Array(r);
  for (let n = 0; n < r; n++) {
    const i = e === "right";
    s[i ? n : r - n - 1] = t[i ? n : t.length - n - 1];
  }
  return s;
}
class Dx extends nr {
  constructor({ max: e, min: r, signed: s, size: n, value: i }) {
    super(`Number "${i}" is not in safe ${n ? `${n * 8}-bit ${s ? "signed" : "unsigned"} ` : ""}integer range ${e ? `(${r} to ${e})` : `(above ${r})`}`, { name: "IntegerOutOfRangeError" });
  }
}
class kx extends nr {
  constructor({ givenSize: e, maxSize: r }) {
    super(`Size cannot exceed ${r} bytes. Given size: ${e} bytes.`, { name: "SizeOverflowError" });
  }
}
function Rw(t, { size: e }) {
  if (Cf(t) > e)
    throw new kx({
      givenSize: Cf(t),
      maxSize: e
    });
}
const $x = /* @__PURE__ */ Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function Af(t, e = {}) {
  return typeof t == "number" || typeof t == "bigint" ? Lx(t, e) : typeof t == "string" ? xw(t, e) : typeof t == "boolean" ? Ux(t, e) : Pw(t, e);
}
function Ux(t, e = {}) {
  const r = `0x${Number(t)}`;
  return typeof e.size == "number" ? (Rw(r, { size: e.size }), id(r, { size: e.size })) : r;
}
function Pw(t, e = {}) {
  let r = "";
  for (let n = 0; n < t.length; n++)
    r += $x[t[n]];
  const s = `0x${r}`;
  return typeof e.size == "number" ? (Rw(s, { size: e.size }), id(s, { dir: "right", size: e.size })) : s;
}
function Lx(t, e = {}) {
  const { signed: r, size: s } = e, n = BigInt(t);
  let i;
  s ? r ? i = (/* @__PURE__ */ BigInt(1) << BigInt(s) * /* @__PURE__ */ BigInt(8) - /* @__PURE__ */ BigInt(1)) - /* @__PURE__ */ BigInt(1) : i = Je(/* @__PURE__ */ BigInt(2), BigInt(s) * /* @__PURE__ */ BigInt(8)) - /* @__PURE__ */ BigInt(1) : typeof t == "number" && (i = BigInt(Number.MAX_SAFE_INTEGER));
  const o = typeof i == "bigint" && r ? -i - /* @__PURE__ */ BigInt(1) : 0;
  if (i && n > i || n < o) {
    const c = typeof t == "bigint" ? "n" : "";
    throw new Dx({
      max: i ? `${i}${c}` : void 0,
      min: `${o}${c}`,
      signed: r,
      size: s,
      value: `${t}${c}`
    });
  }
  const a = `0x${(r && n < 0 ? (/* @__PURE__ */ BigInt(1) << BigInt(s * 8)) + BigInt(n) : n).toString(16)}`;
  return s ? id(a, { size: s }) : a;
}
const Mx = /* @__PURE__ */ new TextEncoder();
function xw(t, e = {}) {
  const r = Mx.encode(t);
  return Pw(r, e);
}
class Fx extends Map {
  constructor(e) {
    super(), Object.defineProperty(this, "maxSize", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.maxSize = e;
  }
  get(e) {
    const r = super.get(e);
    return super.has(e) && r !== void 0 && (this.delete(e), super.set(e, r)), r;
  }
  set(e, r) {
    if (super.set(e, r), this.maxSize && this.size > this.maxSize) {
      const s = this.keys().next().value;
      s && this.delete(s);
    }
    return this;
  }
}
const Zs = (t, e, r) => JSON.stringify(t, (s, n) => typeof n == "bigint" ? n.toString() : n, r);
function Bx(t, e) {
  let r = t.toString();
  const s = r.startsWith("-");
  s && (r = r.slice(1)), r = r.padStart(e, "0");
  let [n, i] = [
    r.slice(0, r.length - e),
    r.slice(r.length - e)
  ];
  return i = i.replace(/(0+)$/, ""), `${s ? "-" : ""}${n || "0"}${i ? `.${i}` : ""}`;
}
const od = (t) => t;
class Ki extends nr {
  constructor({ body: e, cause: r, details: s, headers: n, status: i, url: o }) {
    super("HTTP request failed.", {
      cause: r,
      details: s,
      metaMessages: [
        i && `Status: ${i}`,
        `URL: ${od(o)}`,
        e && `Request body: ${Zs(e)}`
      ].filter(Boolean),
      name: "HttpRequestError"
    }), Object.defineProperty(this, "body", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "headers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "status", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "url", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.body = e, this.headers = n, this.status = i, this.url = o;
  }
}
class Dw extends nr {
  constructor({ body: e, error: r, url: s }) {
    super("RPC Request failed.", {
      cause: r,
      details: r.message,
      metaMessages: [`URL: ${od(s)}`, `Request body: ${Zs(e)}`],
      name: "RpcRequestError"
    }), Object.defineProperty(this, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "data", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.code = r.code, this.data = r.data;
  }
}
class Sf extends nr {
  constructor({ body: e, url: r }) {
    super("The request took too long to respond.", {
      details: "The request timed out.",
      metaMessages: [`URL: ${od(r)}`, `Request body: ${Zs(e)}`],
      name: "TimeoutError"
    });
  }
}
const jx = -1;
class Vt extends nr {
  constructor(e, { code: r, docsPath: s, metaMessages: n, name: i, shortMessage: o }) {
    super(o, {
      cause: e,
      docsPath: s,
      metaMessages: n || (e == null ? void 0 : e.metaMessages),
      name: i || "RpcError"
    }), Object.defineProperty(this, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.name = i || e.name, this.code = e instanceof Dw ? e.code : r != null ? r : jx;
  }
}
class ir extends Vt {
  constructor(e, r) {
    super(e, r), Object.defineProperty(this, "data", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.data = r.data;
  }
}
class ao extends Vt {
  constructor(e) {
    super(e, {
      code: ao.code,
      name: "ParseRpcError",
      shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
    });
  }
}
Object.defineProperty(ao, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32700
});
class co extends Vt {
  constructor(e) {
    super(e, {
      code: co.code,
      name: "InvalidRequestRpcError",
      shortMessage: "JSON is not a valid request object."
    });
  }
}
Object.defineProperty(co, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32600
});
class lo extends Vt {
  constructor(e, { method: r } = {}) {
    super(e, {
      code: lo.code,
      name: "MethodNotFoundRpcError",
      shortMessage: `The method${r ? ` "${r}"` : ""} does not exist / is not available.`
    });
  }
}
Object.defineProperty(lo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32601
});
class uo extends Vt {
  constructor(e) {
    super(e, {
      code: uo.code,
      name: "InvalidParamsRpcError",
      shortMessage: [
        "Invalid parameters were provided to the RPC method.",
        "Double check you have provided the correct parameters."
      ].join(`
`)
    });
  }
}
Object.defineProperty(uo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32602
});
class ri extends Vt {
  constructor(e) {
    super(e, {
      code: ri.code,
      name: "InternalRpcError",
      shortMessage: "An internal error was received."
    });
  }
}
Object.defineProperty(ri, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32603
});
class ho extends Vt {
  constructor(e) {
    super(e, {
      code: ho.code,
      name: "InvalidInputRpcError",
      shortMessage: [
        "Missing or invalid parameters.",
        "Double check you have provided the correct parameters."
      ].join(`
`)
    });
  }
}
Object.defineProperty(ho, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32e3
});
class po extends Vt {
  constructor(e) {
    super(e, {
      code: po.code,
      name: "ResourceNotFoundRpcError",
      shortMessage: "Requested resource not found."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ResourceNotFoundRpcError"
    });
  }
}
Object.defineProperty(po, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32001
});
class fo extends Vt {
  constructor(e) {
    super(e, {
      code: fo.code,
      name: "ResourceUnavailableRpcError",
      shortMessage: "Requested resource not available."
    });
  }
}
Object.defineProperty(fo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32002
});
class si extends Vt {
  constructor(e) {
    super(e, {
      code: si.code,
      name: "TransactionRejectedRpcError",
      shortMessage: "Transaction creation failed."
    });
  }
}
Object.defineProperty(si, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32003
});
class Ks extends Vt {
  constructor(e, { method: r } = {}) {
    super(e, {
      code: Ks.code,
      name: "MethodNotSupportedRpcError",
      shortMessage: `Method${r ? ` "${r}"` : ""} is not supported.`
    });
  }
}
Object.defineProperty(Ks, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32004
});
class ni extends Vt {
  constructor(e) {
    super(e, {
      code: ni.code,
      name: "LimitExceededRpcError",
      shortMessage: "Request exceeds defined limit."
    });
  }
}
Object.defineProperty(ni, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32005
});
class go extends Vt {
  constructor(e) {
    super(e, {
      code: go.code,
      name: "JsonRpcVersionUnsupportedError",
      shortMessage: "Version of JSON-RPC protocol is not supported."
    });
  }
}
Object.defineProperty(go, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32006
});
class Js extends ir {
  constructor(e) {
    super(e, {
      code: Js.code,
      name: "UserRejectedRequestError",
      shortMessage: "User rejected the request."
    });
  }
}
Object.defineProperty(Js, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4001
});
class mo extends ir {
  constructor(e) {
    super(e, {
      code: mo.code,
      name: "UnauthorizedProviderError",
      shortMessage: "The requested method and/or account has not been authorized by the user."
    });
  }
}
Object.defineProperty(mo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4100
});
class wo extends ir {
  constructor(e, { method: r } = {}) {
    super(e, {
      code: wo.code,
      name: "UnsupportedProviderMethodError",
      shortMessage: `The Provider does not support the requested method${r ? ` " ${r}"` : ""}.`
    });
  }
}
Object.defineProperty(wo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4200
});
class yo extends ir {
  constructor(e) {
    super(e, {
      code: yo.code,
      name: "ProviderDisconnectedError",
      shortMessage: "The Provider is disconnected from all chains."
    });
  }
}
Object.defineProperty(yo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4900
});
class bo extends ir {
  constructor(e) {
    super(e, {
      code: bo.code,
      name: "ChainDisconnectedError",
      shortMessage: "The Provider is not connected to the requested chain."
    });
  }
}
Object.defineProperty(bo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4901
});
class vo extends ir {
  constructor(e) {
    super(e, {
      code: vo.code,
      name: "SwitchChainError",
      shortMessage: "An error occurred when attempting to switch chain."
    });
  }
}
Object.defineProperty(vo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4902
});
class Eo extends ir {
  constructor(e) {
    super(e, {
      code: Eo.code,
      name: "UnsupportedNonOptionalCapabilityError",
      shortMessage: "This Wallet does not support a capability that was not marked as optional."
    });
  }
}
Object.defineProperty(Eo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5700
});
class _o extends ir {
  constructor(e) {
    super(e, {
      code: _o.code,
      name: "UnsupportedChainIdError",
      shortMessage: "This Wallet does not support the requested chain ID."
    });
  }
}
Object.defineProperty(_o, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5710
});
class Co extends ir {
  constructor(e) {
    super(e, {
      code: Co.code,
      name: "DuplicateIdError",
      shortMessage: "There is already a bundle submitted with this ID."
    });
  }
}
Object.defineProperty(Co, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5720
});
class Ao extends ir {
  constructor(e) {
    super(e, {
      code: Ao.code,
      name: "UnknownBundleIdError",
      shortMessage: "This bundle id is unknown / has not been submitted"
    });
  }
}
Object.defineProperty(Ao, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5730
});
class So extends ir {
  constructor(e) {
    super(e, {
      code: So.code,
      name: "BundleTooLargeError",
      shortMessage: "The call bundle is too large for the Wallet to process."
    });
  }
}
Object.defineProperty(So, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5740
});
class Io extends ir {
  constructor(e) {
    super(e, {
      code: Io.code,
      name: "AtomicReadyWalletRejectedUpgradeError",
      shortMessage: "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."
    });
  }
}
Object.defineProperty(Io, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5750
});
class No extends ir {
  constructor(e) {
    super(e, {
      code: No.code,
      name: "AtomicityNotSupportedError",
      shortMessage: "The wallet does not support atomic execution but the request requires it."
    });
  }
}
Object.defineProperty(No, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5760
});
class qx extends Vt {
  constructor(e) {
    super(e, {
      name: "UnknownRpcError",
      shortMessage: "An unknown RPC error occurred."
    });
  }
}
class ad extends nr {
  constructor({ cause: e, message: r } = {}) {
    var n;
    const s = (n = r == null ? void 0 : r.replace("execution reverted: ", "")) == null ? void 0 : n.replace("execution reverted", "");
    super(`Execution reverted ${s ? `with reason: ${s}` : "for an unknown reason"}.`, {
      cause: e,
      name: "ExecutionRevertedError"
    });
  }
}
Object.defineProperty(ad, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 3
});
Object.defineProperty(ad, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /execution reverted/
});
function zx() {
  let t = () => {
  }, e = () => {
  };
  return { promise: new Promise((s, n) => {
    t = s, e = n;
  }), resolve: t, reject: e };
}
const Ol = /* @__PURE__ */ new Map();
function Wx({ fn: t, id: e, shouldSplitBatch: r, wait: s = 0, sort: n }) {
  const i = () => h(null, null, function* () {
    const d = c();
    o();
    const p = d.map(({ args: g }) => g);
    p.length !== 0 && t(p).then((g) => {
      n && Array.isArray(g) && g.sort(n);
      for (let m = 0; m < d.length; m++) {
        const { resolve: f } = d[m];
        f == null || f([g[m], g]);
      }
    }).catch((g) => {
      for (let m = 0; m < d.length; m++) {
        const { reject: f } = d[m];
        f == null || f(g);
      }
    });
  }), o = () => Ol.delete(e), a = () => c().map(({ args: d }) => d), c = () => Ol.get(e) || [], l = (d) => Ol.set(e, [...c(), d]);
  return {
    flush: o,
    schedule(d) {
      return h(this, null, function* () {
        const { promise: p, resolve: g, reject: m } = zx();
        return (r == null ? void 0 : r([...a(), d])) && i(), c().length > 0 ? (l({ args: d, resolve: g, reject: m }), p) : (l({ args: d, resolve: g, reject: m }), setTimeout(i, s), p);
      });
    }
  };
}
function kw(t) {
  return h(this, null, function* () {
    return new Promise((e) => setTimeout(e, t));
  });
}
const Iu = 256;
let Sa = Iu, Ia;
function Hx(t = 11) {
  if (!Ia || Sa + t > Iu * 2) {
    Ia = "", Sa = 0;
    for (let e = 0; e < Iu; e++)
      Ia += (256 + Math.random() * 256 | 0).toString(16).substring(1);
  }
  return Ia.substring(Sa, Sa++ + t);
}
const Na = /* @__PURE__ */ new Fx(8192);
function Vx(t, { enabled: e = !0, id: r }) {
  if (!e || !r)
    return t();
  if (Na.get(r))
    return Na.get(r);
  const s = t().finally(() => Na.delete(r));
  return Na.set(r, s), s;
}
function Kx(t, { delay: e = 100, retryCount: r = 2, shouldRetry: s = () => !0 } = {}) {
  return new Promise((n, i) => {
    const o = (...c) => h(null, [...c], function* ({ count: a = 0 } = {}) {
      const l = (d) => h(null, [d], function* ({ error: u }) {
        const p = typeof e == "function" ? e({ count: a, error: u }) : e;
        p && (yield kw(p)), o({ count: a + 1 });
      });
      try {
        const u = yield t();
        n(u);
      } catch (u) {
        if (a < r && (yield s({ count: a, error: u })))
          return l({ error: u });
        i(u);
      }
    });
    o();
  });
}
function Gx(t, e = {}) {
  return (n, ...i) => h(null, [n, ...i], function* (r, s = {}) {
    var g;
    const { dedupe: o = !1, methods: a, retryDelay: c = 150, retryCount: l = 3, uid: u } = C(C({}, e), s), { method: d } = r;
    if ((g = a == null ? void 0 : a.exclude) != null && g.includes(d))
      throw new Ks(new Error("method not supported"), {
        method: d
      });
    if (a != null && a.include && !a.include.includes(d))
      throw new Ks(new Error("method not supported"), {
        method: d
      });
    const p = o ? xw(`${u}.${Zs(r)}`) : void 0;
    return Vx(() => Kx(() => h(null, null, function* () {
      try {
        return yield t(r);
      } catch (m) {
        const f = m;
        switch (f.code) {
          // -32700
          case ao.code:
            throw new ao(f);
          // -32600
          case co.code:
            throw new co(f);
          // -32601
          case lo.code:
            throw new lo(f, { method: r.method });
          // -32602
          case uo.code:
            throw new uo(f);
          // -32603
          case ri.code:
            throw new ri(f);
          // -32000
          case ho.code:
            throw new ho(f);
          // -32001
          case po.code:
            throw new po(f);
          // -32002
          case fo.code:
            throw new fo(f);
          // -32003
          case si.code:
            throw new si(f);
          // -32004
          case Ks.code:
            throw new Ks(f, {
              method: r.method
            });
          // -32005
          case ni.code:
            throw new ni(f);
          // -32006
          case go.code:
            throw new go(f);
          // 4001
          case Js.code:
            throw new Js(f);
          // 4100
          case mo.code:
            throw new mo(f);
          // 4200
          case wo.code:
            throw new wo(f);
          // 4900
          case yo.code:
            throw new yo(f);
          // 4901
          case bo.code:
            throw new bo(f);
          // 4902
          case vo.code:
            throw new vo(f);
          // 5700
          case Eo.code:
            throw new Eo(f);
          // 5710
          case _o.code:
            throw new _o(f);
          // 5720
          case Co.code:
            throw new Co(f);
          // 5730
          case Ao.code:
            throw new Ao(f);
          // 5740
          case So.code:
            throw new So(f);
          // 5750
          case Io.code:
            throw new Io(f);
          // 5760
          case No.code:
            throw new No(f);
          // CAIP-25: User Rejected Error
          // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes#rejected-caip-25
          case 5e3:
            throw new Js(f);
          default:
            throw m instanceof nr ? m : new qx(f);
        }
      }
    }), {
      delay: ({ count: m, error: f }) => {
        var w;
        if (f && f instanceof Ki) {
          const S = (w = f == null ? void 0 : f.headers) == null ? void 0 : w.get("Retry-After");
          if (S != null && S.match(/\d/))
            return Number.parseInt(S) * 1e3;
        }
        return ~~(1 << m) * c;
      },
      retryCount: l,
      shouldRetry: ({ error: m }) => Yx(m)
    }), { enabled: o, id: p });
  });
}
function Yx(t) {
  return "code" in t && typeof t.code == "number" ? t.code === -1 || t.code === ni.code || t.code === ri.code : t instanceof Ki && t.status ? t.status === 403 || t.status === 408 || t.status === 413 || t.status === 429 || t.status === 500 || t.status === 502 || t.status === 503 || t.status === 504 : !0;
}
function $w({ key: t, methods: e, name: r, request: s, retryCount: n = 3, retryDelay: i = 150, timeout: o, type: a }, c) {
  const l = Hx();
  return {
    config: {
      key: t,
      methods: e,
      name: r,
      request: s,
      retryCount: n,
      retryDelay: i,
      timeout: o,
      type: a
    },
    request: Gx(s, { methods: e, retryCount: n, retryDelay: i, uid: l }),
    value: c
  };
}
function If(t, e = {}) {
  const { key: r = "fallback", name: s = "Fallback", rank: n = !1, shouldThrow: i = Zx, retryCount: o, retryDelay: a } = e;
  return (p) => {
    var g = p, { chain: c, pollingInterval: l = 4e3, timeout: u } = g, d = us(g, ["chain", "pollingInterval", "timeout"]);
    var E;
    let m = t, f = () => {
    };
    const w = $w({
      key: r,
      name: s,
      request(T) {
        return h(this, arguments, function* ({ method: I, params: A }) {
          let b;
          const N = (P = 0) => h(null, null, function* () {
            const O = m[P](B(C({}, d), {
              chain: c,
              retryCount: 0,
              timeout: u
            }));
            try {
              const x = yield O.request({
                method: I,
                params: A
              });
              return f({
                method: I,
                params: A,
                response: x,
                transport: O,
                status: "success"
              }), x;
            } catch (x) {
              if (f({
                error: x,
                method: I,
                params: A,
                transport: O,
                status: "error"
              }), i(x) || P === m.length - 1 || (b != null || (b = m.slice(P + 1).some(($) => {
                const { include: F, exclude: W } = $({ chain: c }).config.methods || {};
                return F ? F.includes(I) : W ? !W.includes(I) : !0;
              })), !b))
                throw x;
              return N(P + 1);
            }
          });
          return N();
        });
      },
      retryCount: o,
      retryDelay: a,
      type: "fallback"
    }, {
      onResponse: (I) => f = I,
      transports: m.map((I) => I({ chain: c, retryCount: 0 }))
    });
    if (n) {
      const I = typeof n == "object" ? n : {};
      Jx({
        chain: c,
        interval: (E = I.interval) != null ? E : l,
        onTransports: (A) => m = A,
        ping: I.ping,
        sampleCount: I.sampleCount,
        timeout: I.timeout,
        transports: m,
        weights: I.weights
      });
    }
    return w;
  };
}
function Zx(t) {
  return !!("code" in t && typeof t.code == "number" && (t.code === si.code || t.code === Js.code || ad.nodeMessage.test(t.message) || t.code === 5e3));
}
function Jx({ chain: t, interval: e = 4e3, onTransports: r, ping: s, sampleCount: n = 10, timeout: i = 1e3, transports: o, weights: a = {} }) {
  const { stability: c = 0.7, latency: l = 0.3 } = a, u = [], d = () => h(null, null, function* () {
    const p = yield Promise.all(o.map((f) => h(null, null, function* () {
      const w = f({ chain: t, retryCount: 0, timeout: i }), S = Date.now();
      let E, I;
      try {
        yield s ? s({ transport: w }) : w.request({ method: "net_listening" }), I = 1;
      } catch (T) {
        I = 0;
      } finally {
        E = Date.now();
      }
      return { latency: E - S, success: I };
    })));
    u.push(p), u.length > n && u.shift();
    const g = Math.max(...u.map((f) => Math.max(...f.map(({ latency: w }) => w)))), m = o.map((f, w) => {
      const S = u.map((b) => b[w].latency), I = 1 - S.reduce((b, N) => b + N, 0) / S.length / g, A = u.map((b) => b[w].success), T = A.reduce((b, N) => b + N, 0) / A.length;
      return T === 0 ? [0, w] : [
        l * I + c * T,
        w
      ];
    }).sort((f, w) => w[0] - f[0]);
    r(m.map(([, f]) => o[f])), yield kw(e), d();
  });
  d();
}
class Xx extends nr {
  constructor() {
    super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
      docsPath: "/docs/clients/intro",
      name: "UrlRequiredError"
    });
  }
}
function Qx(t, { errorInstance: e = new Error("timed out"), timeout: r, signal: s }) {
  return new Promise((n, i) => {
    h(null, null, function* () {
      let o;
      try {
        const a = new AbortController();
        r > 0 && (o = setTimeout(() => {
          s && a.abort();
        }, r)), n(yield t({ signal: (a == null ? void 0 : a.signal) || null }));
      } catch (a) {
        (a == null ? void 0 : a.name) === "AbortError" && i(e), i(a);
      } finally {
        clearTimeout(o);
      }
    });
  });
}
function eD() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
const Nf = /* @__PURE__ */ eD();
function tD(t, e = {}) {
  return {
    request(s) {
      return h(this, null, function* () {
        var p, g, m, f;
        const { body: n, onRequest: i = e.onRequest, onResponse: o = e.onResponse, timeout: a = (p = e.timeout) != null ? p : 1e4 } = s, c = C(C({}, (g = e.fetchOptions) != null ? g : {}), (m = s.fetchOptions) != null ? m : {}), { headers: l, method: u, signal: d } = c;
        try {
          const w = yield Qx((I) => h(null, [I], function* ({ signal: E }) {
            var P, O, x;
            const A = B(C({}, c), {
              body: Array.isArray(n) ? Zs(n.map(($) => {
                var F;
                return C({
                  jsonrpc: "2.0",
                  id: (F = $.id) != null ? F : Nf.take()
                }, $);
              })) : Zs(C({
                jsonrpc: "2.0",
                id: (P = n.id) != null ? P : Nf.take()
              }, n)),
              headers: C({
                "Content-Type": "application/json"
              }, l),
              method: u || "POST",
              signal: d || (a > 0 ? E : null)
            }), T = new Request(t, A), b = (O = yield i == null ? void 0 : i(T, A)) != null ? O : B(C({}, A), { url: t });
            return yield fetch((x = b.url) != null ? x : t, b);
          }), {
            errorInstance: new Sf({ body: n, url: t }),
            timeout: a,
            signal: !0
          });
          o && (yield o(w));
          let S;
          if ((f = w.headers.get("Content-Type")) != null && f.startsWith("application/json"))
            S = yield w.json();
          else {
            S = yield w.text();
            try {
              S = JSON.parse(S || "{}");
            } catch (E) {
              if (w.ok)
                throw E;
              S = { error: S };
            }
          }
          if (!w.ok)
            throw new Ki({
              body: n,
              details: Zs(S.error) || w.statusText,
              headers: w.headers,
              status: w.status,
              url: t
            });
          return S;
        } catch (w) {
          throw w instanceof Ki || w instanceof Sf ? w : new Ki({
            body: n,
            cause: w,
            url: t
          });
        }
      });
    }
  };
}
function Ta(t, e = {}) {
  const { batch: r, fetchOptions: s, key: n = "http", methods: i, name: o = "HTTP JSON-RPC", onFetchRequest: a, onFetchResponse: c, retryDelay: l, raw: u } = e;
  return ({ chain: d, retryCount: p, timeout: g }) => {
    var A, T;
    const { batchSize: m = 1e3, wait: f = 0 } = typeof r == "object" ? r : {}, w = (A = e.retryCount) != null ? A : p, S = (T = g != null ? g : e.timeout) != null ? T : 1e4, E = t || (d == null ? void 0 : d.rpcUrls.default.http[0]);
    if (!E)
      throw new Xx();
    const I = tD(E, {
      fetchOptions: s,
      onRequest: a,
      onResponse: c,
      timeout: S
    });
    return $w({
      key: n,
      methods: i,
      name: o,
      request(O) {
        return h(this, arguments, function* ({ method: N, params: P }) {
          const x = { method: N, params: P }, { schedule: $ } = Wx({
            id: E,
            wait: f,
            shouldSplitBatch(v) {
              return v.length > m;
            },
            fn: (v) => I.request({
              body: v
            }),
            sort: (v, _) => v.id - _.id
          }), F = (v) => h(null, null, function* () {
            return r ? $(v) : [
              yield I.request({
                body: v
              })
            ];
          }), [{ error: W, result: k }] = yield F(x);
          if (u)
            return { error: W, result: k };
          if (W)
            throw new Dw({
              body: x,
              error: W,
              url: E
            });
          return k;
        });
      },
      retryCount: w,
      retryDelay: l,
      timeout: S,
      type: "http"
    }, {
      fetchOptions: s,
      url: E
    });
  };
}
function rD(t) {
  return C({
    formatters: void 0,
    fees: void 0,
    serializers: void 0
  }, t);
}
const Rl = {
  /**
   * Creates a Balance object from an ERC7811 Asset object
   * @param asset - Asset object to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns Balance object
   */
  createBalance(t, e) {
    const r = {
      name: t.metadata.name || "",
      symbol: t.metadata.symbol || "",
      decimals: t.metadata.decimals || 0,
      value: t.metadata.value || 0,
      price: t.metadata.price || 0,
      iconUrl: t.metadata.iconUrl || ""
    };
    return {
      name: r.name,
      symbol: r.symbol,
      chainId: e,
      address: t.address === "native" ? void 0 : this.convertAddressToCAIP10Address(t.address, e),
      value: r.value,
      price: r.price,
      quantity: {
        decimals: r.decimals.toString(),
        numeric: this.convertHexToBalance({
          hex: t.balance,
          decimals: r.decimals
        })
      },
      iconUrl: r.iconUrl
    };
  },
  /**
   * Converts a hex string to a Balance object
   * @param hex - Hex string to convert
   * @param decimals - Number of decimals to use
   * @returns Balance object
   */
  convertHexToBalance({ hex: t, decimals: e }) {
    return Bx(BigInt(t), e);
  },
  /**
   * Converts an address to a CAIP-10 address
   * @param address - Address to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns CAIP-10 address
   */
  convertAddressToCAIP10Address(t, e) {
    return `${e}:${t}`;
  },
  /**
   *  Creates a CAIP-2 Chain ID from a chain ID and namespace
   * @param chainId  - Chain ID in hex format
   * @param namespace  - Chain namespace
   * @returns
   */
  createCAIP2ChainId(t, e) {
    return `${e}:${parseInt(t, 16)}`;
  },
  /**
   * Gets the chain ID in hex format from a CAIP-2 Chain ID
   * @param caip2ChainId - CAIP-2 Chain ID
   * @returns Chain ID in hex format
   */
  getChainIdHexFromCAIP2ChainId(t) {
    const e = t.split(":");
    if (e.length < 2 || !e[1])
      return "0x0";
    const r = e[1], s = parseInt(r, 10);
    return isNaN(s) ? "0x0" : `0x${s.toString(16)}`;
  },
  /**
   * Checks if a response is a valid WalletGetAssetsResponse
   * @param response - The response to check
   * @returns True if the response is a valid WalletGetAssetsResponse, false otherwise
   */
  isWalletGetAssetsResponse(t) {
    return typeof t != "object" || t === null ? !1 : Object.values(t).every((e) => Array.isArray(e) && e.every((r) => this.isValidAsset(r)));
  },
  /**
   * Checks if an asset object is valid.
   * @param asset - The asset object to check.
   * @returns True if the asset is valid, false otherwise.
   */
  isValidAsset(t) {
    return typeof t == "object" && t !== null && typeof t.address == "string" && typeof t.balance == "string" && (t.type === "ERC20" || t.type === "NATIVE") && typeof t.metadata == "object" && t.metadata !== null && typeof t.metadata.name == "string" && typeof t.metadata.symbol == "string" && typeof t.metadata.decimals == "number" && typeof t.metadata.price == "number" && typeof t.metadata.iconUrl == "string";
  }
}, Tf = {
  getMyTokensWithBalance(t) {
    return h(this, null, function* () {
      const e = ne.state.address, r = R.state.activeCaipNetwork;
      if (!e || !r)
        return [];
      if (r.chainNamespace === "eip155") {
        const n = yield this.getEIP155Balances(e, r);
        if (n)
          return this.filterLowQualityTokens(n);
      }
      const s = yield de.getBalance(e, r.caipNetworkId, t);
      return this.filterLowQualityTokens(s.balances);
    });
  },
  getEIP155Balances(t, e) {
    return h(this, null, function* () {
      var r, s;
      try {
        const n = Rl.getChainIdHexFromCAIP2ChainId(e.caipNetworkId), i = yield He.getCapabilities(t);
        if (!((s = (r = i == null ? void 0 : i[n]) == null ? void 0 : r.assetDiscovery) != null && s.supported))
          return null;
        const o = yield He.walletGetAssets({
          account: t,
          chainFilter: [n]
        });
        return Rl.isWalletGetAssetsResponse(o) ? (o[n] || []).map((c) => Rl.createBalance(c, e.caipNetworkId)) : null;
      } catch (n) {
        return null;
      }
    });
  },
  /**
   * The 1Inch API includes many low-quality tokens in the balance response,
   * which appear inconsistently. This filter prevents them from being displayed.
   */
  filterLowQualityTokens(t) {
    return t.filter((e) => e.quantity.decimals !== "0");
  },
  mapBalancesToSwapTokens(t) {
    return (t == null ? void 0 : t.map((e) => B(C({}, e), {
      address: e != null && e.address ? e.address : R.getActiveNetworkTokenAddress(),
      decimals: parseInt(e.quantity.decimals, 10),
      logoUri: e.iconUrl,
      eip2612: !1
    }))) || [];
  }
}, ke = Ye({
  tokenBalances: [],
  loading: !1
}), Of = {
  state: ke,
  subscribe(t) {
    return Dt(ke, () => t(ke));
  },
  subscribeKey(t, e) {
    return Wt(ke, t, e);
  },
  setToken(t) {
    t && (ke.token = en(t));
  },
  setTokenAmount(t) {
    ke.sendTokenAmount = t;
  },
  setReceiverAddress(t) {
    ke.receiverAddress = t;
  },
  setReceiverProfileImageUrl(t) {
    ke.receiverProfileImageUrl = t;
  },
  setReceiverProfileName(t) {
    ke.receiverProfileName = t;
  },
  setNetworkBalanceInUsd(t) {
    ke.networkBalanceInUSD = t;
  },
  setLoading(t) {
    ke.loading = t;
  },
  sendToken() {
    return h(this, null, function* () {
      var t;
      try {
        switch (this.setLoading(!0), (t = R.state.activeCaipNetwork) == null ? void 0 : t.chainNamespace) {
          case "eip155":
            yield this.sendEvmToken();
            return;
          case "solana":
            yield this.sendSolanaToken();
            return;
          default:
            throw new Error("Unsupported chain");
        }
      } finally {
        this.setLoading(!1);
      }
    });
  },
  sendEvmToken() {
    return h(this, null, function* () {
      var r, s, n, i;
      const t = R.state.activeChain, e = (r = ne.state.preferredAccountTypes) == null ? void 0 : r[t];
      if (!this.state.sendTokenAmount || !this.state.receiverAddress)
        throw new Error("An amount and receiver address are required");
      if (!this.state.token)
        throw new Error("A token is required");
      (s = this.state.token) != null && s.address ? (Ke.sendEvent({
        type: "track",
        event: "SEND_INITIATED",
        properties: {
          isSmartAccount: e === Et.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: this.state.token.address,
          amount: this.state.sendTokenAmount,
          network: ((n = R.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) || ""
        }
      }), yield this.sendERC20Token({
        receiverAddress: this.state.receiverAddress,
        tokenAddress: this.state.token.address,
        sendTokenAmount: this.state.sendTokenAmount,
        decimals: this.state.token.quantity.decimals
      })) : (Ke.sendEvent({
        type: "track",
        event: "SEND_INITIATED",
        properties: {
          isSmartAccount: e === Et.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: this.state.token.symbol || "",
          amount: this.state.sendTokenAmount,
          network: ((i = R.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId) || ""
        }
      }), yield this.sendNativeToken({
        receiverAddress: this.state.receiverAddress,
        sendTokenAmount: this.state.sendTokenAmount,
        decimals: this.state.token.quantity.decimals
      }));
    });
  },
  fetchTokenBalance(t) {
    return h(this, null, function* () {
      var i, o;
      ke.loading = !0;
      const e = (i = R.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId, r = (o = R.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace, s = R.state.activeCaipAddress, n = s ? he.getPlainAddress(s) : void 0;
      if (ke.lastRetry && !he.isAllowedRetry(ke.lastRetry, 30 * vt.ONE_SEC_MS))
        return ke.loading = !1, [];
      try {
        if (n && e && r) {
          const a = yield Tf.getMyTokensWithBalance();
          return ke.tokenBalances = a, ke.lastRetry = void 0, a;
        }
      } catch (a) {
        ke.lastRetry = Date.now(), t == null || t(a), Ar.showError("Token Balance Unavailable");
      } finally {
        ke.loading = !1;
      }
      return [];
    });
  },
  fetchNetworkBalance() {
    if (ke.tokenBalances.length === 0)
      return;
    const t = Tf.mapBalancesToSwapTokens(ke.tokenBalances);
    if (!t)
      return;
    const e = t.find((r) => r.address === R.getActiveNetworkTokenAddress());
    e && (ke.networkBalanceInUSD = e ? Oy.multiply(e.quantity.numeric, e.price).toString() : "0");
  },
  sendNativeToken(t) {
    return h(this, null, function* () {
      var o, a, c;
      const e = R.state.activeChain;
      xe.pushTransactionStack({
        view: null,
        goBack: !1
      });
      const r = t.receiverAddress, s = ne.state.address, n = He.parseUnits(t.sendTokenAmount.toString(), Number(t.decimals));
      yield He.sendTransaction({
        chainNamespace: "eip155",
        to: r,
        address: s,
        data: "0x",
        value: n != null ? n : BigInt(0)
      }), Ke.sendEvent({
        type: "track",
        event: "SEND_SUCCESS",
        properties: {
          isSmartAccount: ((o = ne.state.preferredAccountTypes) == null ? void 0 : o[e]) === Et.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: ((a = this.state.token) == null ? void 0 : a.symbol) || "",
          amount: t.sendTokenAmount,
          network: ((c = R.state.activeCaipNetwork) == null ? void 0 : c.caipNetworkId) || ""
        }
      }), this.resetSend();
    });
  },
  sendERC20Token(t) {
    return h(this, null, function* () {
      xe.pushTransactionStack({
        view: "Account",
        goBack: !1
      });
      const e = He.parseUnits(t.sendTokenAmount.toString(), Number(t.decimals));
      if (ne.state.address && t.sendTokenAmount && t.receiverAddress && t.tokenAddress) {
        const r = he.getPlainAddress(t.tokenAddress);
        yield He.writeContract({
          fromAddress: ne.state.address,
          tokenAddress: r,
          args: [t.receiverAddress, e != null ? e : BigInt(0)],
          method: "transfer",
          abi: Dy.getERC20Abi(r),
          chainNamespace: "eip155"
        }), this.resetSend();
      }
    });
  },
  sendSolanaToken() {
    return h(this, null, function* () {
      if (!this.state.sendTokenAmount || !this.state.receiverAddress)
        throw new Error("An amount and receiver address are required");
      xe.pushTransactionStack({
        view: "Account",
        goBack: !1
      }), yield He.sendTransaction({
        chainNamespace: "solana",
        to: this.state.receiverAddress,
        value: this.state.sendTokenAmount
      }), this.resetSend(), ne.fetchTokenBalance();
    });
  },
  resetSend() {
    ke.token = void 0, ke.sendTokenAmount = void 0, ke.receiverAddress = void 0, ke.receiverProfileImageUrl = void 0, ke.receiverProfileName = void 0, ke.loading = !1, ke.tokenBalances = [];
  }
}, Pl = {
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: !1,
  addressLabels: /* @__PURE__ */ new Map(),
  allAccounts: [],
  user: void 0
}, Oa = {
  caipNetwork: void 0,
  supportsAllNetworks: !0,
  smartAccountEnabledNetworks: []
}, Y = Ye({
  chains: yy(),
  activeCaipAddress: void 0,
  activeChain: void 0,
  activeCaipNetwork: void 0,
  noAdapters: !1,
  universalAdapter: {
    networkControllerClient: void 0,
    connectionControllerClient: void 0
  },
  isSwitchingNamespace: !1
}), R = {
  state: Y,
  subscribe(t) {
    return Dt(Y, () => {
      t(Y);
    });
  },
  subscribeKey(t, e) {
    return Wt(Y, t, e);
  },
  subscribeChainProp(t, e, r) {
    let s;
    return Dt(Y.chains, () => {
      var i;
      const n = r || Y.activeChain;
      if (n) {
        const o = (i = Y.chains.get(n)) == null ? void 0 : i[t];
        s !== o && (s = o, e(o));
      }
    });
  },
  initialize(t, e, r) {
    var u;
    const { chainId: s, namespace: n } = re.getActiveNetworkProps(), i = e == null ? void 0 : e.find((d) => d.id.toString() === (s == null ? void 0 : s.toString())), a = t.find((d) => (d == null ? void 0 : d.namespace) === n) || (t == null ? void 0 : t[0]), c = t.map((d) => d.namespace).filter((d) => d !== void 0), l = q.state.enableEmbedded ? /* @__PURE__ */ new Set([...c]) : /* @__PURE__ */ new Set([...(u = e == null ? void 0 : e.map((d) => d.chainNamespace)) != null ? u : []]);
    ((t == null ? void 0 : t.length) === 0 || !a) && (Y.noAdapters = !0), Y.noAdapters || (Y.activeChain = a == null ? void 0 : a.namespace, Y.activeCaipNetwork = i, this.setChainNetworkData(a == null ? void 0 : a.namespace, { caipNetwork: i }), Y.activeChain && qr.set({ activeChain: a == null ? void 0 : a.namespace })), l.forEach((d) => {
      const p = e == null ? void 0 : e.filter((g) => g.chainNamespace === d);
      R.state.chains.set(d, C({
        namespace: d,
        networkState: Ye(B(C({}, Oa), {
          caipNetwork: p == null ? void 0 : p[0]
        })),
        accountState: Ye(Pl),
        caipNetworks: p != null ? p : []
      }, r)), this.setRequestedCaipNetworks(p != null ? p : [], d);
    });
  },
  removeAdapter(t) {
    var e, r;
    if (Y.activeChain === t) {
      const s = Array.from(Y.chains.entries()).find(([n]) => n !== t);
      if (s) {
        const n = (r = (e = s[1]) == null ? void 0 : e.caipNetworks) == null ? void 0 : r[0];
        n && this.setActiveCaipNetwork(n);
      }
    }
    Y.chains.delete(t);
  },
  addAdapter(t, { networkControllerClient: e, connectionControllerClient: r }, s) {
    var n;
    Y.chains.set(t.namespace, {
      namespace: t.namespace,
      networkState: B(C({}, Oa), {
        caipNetwork: s[0]
      }),
      accountState: Pl,
      caipNetworks: s,
      connectionControllerClient: r,
      networkControllerClient: e
    }), this.setRequestedCaipNetworks((n = s == null ? void 0 : s.filter((i) => i.chainNamespace === t.namespace)) != null ? n : [], t.namespace);
  },
  addNetwork(t) {
    var r;
    const e = Y.chains.get(t.chainNamespace);
    if (e) {
      const s = [...e.caipNetworks || []];
      (r = e.caipNetworks) != null && r.find((n) => n.id === t.id) || s.push(t), Y.chains.set(t.chainNamespace, B(C({}, e), { caipNetworks: s })), this.setRequestedCaipNetworks(s, t.chainNamespace), pe.filterByNamespace(t.chainNamespace, !0);
    }
  },
  removeNetwork(t, e) {
    var s, n, i;
    const r = Y.chains.get(t);
    if (r) {
      const o = ((s = Y.activeCaipNetwork) == null ? void 0 : s.id) === e, a = [
        ...((n = r.caipNetworks) == null ? void 0 : n.filter((c) => c.id !== e)) || []
      ];
      o && ((i = r == null ? void 0 : r.caipNetworks) != null && i[0]) && this.setActiveCaipNetwork(r.caipNetworks[0]), Y.chains.set(t, B(C({}, r), { caipNetworks: a })), this.setRequestedCaipNetworks(a || [], t), a.length === 0 && pe.filterByNamespace(t, !1);
    }
  },
  setAdapterNetworkState(t, e) {
    const r = Y.chains.get(t);
    r && (r.networkState = C(C({}, r.networkState || Oa), e), Y.chains.set(t, r));
  },
  setChainAccountData(t, e, r = !0) {
    if (!t)
      throw new Error("Chain is required to update chain account data");
    const s = Y.chains.get(t);
    if (s) {
      const n = C(C({}, s.accountState || Pl), e);
      Y.chains.set(t, B(C({}, s), { accountState: n })), (Y.chains.size === 1 || Y.activeChain === t) && (e.caipAddress && (Y.activeCaipAddress = e.caipAddress), ne.replaceState(n));
    }
  },
  setChainNetworkData(t, e) {
    if (!t)
      return;
    const r = Y.chains.get(t);
    if (r) {
      const s = C(C({}, r.networkState || Oa), e);
      Y.chains.set(t, B(C({}, r), { networkState: s }));
    }
  },
  // eslint-disable-next-line max-params
  setAccountProp(t, e, r, s = !0) {
    this.setChainAccountData(r, { [t]: e }, s), t === "status" && e === "disconnected" && r && pe.removeConnectorId(r);
  },
  setActiveNamespace(t) {
    var s, n;
    Y.activeChain = t;
    const e = t ? Y.chains.get(t) : void 0, r = (s = e == null ? void 0 : e.networkState) == null ? void 0 : s.caipNetwork;
    r != null && r.id && t && (Y.activeCaipAddress = (n = e == null ? void 0 : e.accountState) == null ? void 0 : n.caipAddress, Y.activeCaipNetwork = r, this.setChainNetworkData(t, { caipNetwork: r }), re.setActiveCaipNetworkId(r == null ? void 0 : r.caipNetworkId), qr.set({
      activeChain: t,
      selectedNetworkId: r == null ? void 0 : r.caipNetworkId
    }));
  },
  setActiveCaipNetwork(t) {
    var s, n, i;
    if (!t)
      return;
    Y.activeChain !== t.chainNamespace && this.setIsSwitchingNamespace(!0);
    const e = Y.chains.get(t.chainNamespace);
    Y.activeChain = t.chainNamespace, Y.activeCaipNetwork = t, this.setChainNetworkData(t.chainNamespace, { caipNetwork: t }), (s = e == null ? void 0 : e.accountState) != null && s.address ? Y.activeCaipAddress = `${t.chainNamespace}:${t.id}:${(n = e == null ? void 0 : e.accountState) == null ? void 0 : n.address}` : Y.activeCaipAddress = void 0, this.setAccountProp("caipAddress", Y.activeCaipAddress, t.chainNamespace), e && ne.replaceState(e.accountState), Of.resetSend(), qr.set({
      activeChain: Y.activeChain,
      selectedNetworkId: (i = Y.activeCaipNetwork) == null ? void 0 : i.caipNetworkId
    }), re.setActiveCaipNetworkId(t.caipNetworkId), !this.checkIfSupportedNetwork(t.chainNamespace) && q.state.enableNetworkSwitch && !q.state.allowUnsupportedChain && !He.state.wcBasic && this.showUnsupportedChainUI();
  },
  addCaipNetwork(t) {
    var r;
    if (!t)
      return;
    const e = Y.chains.get(t.chainNamespace);
    e && ((r = e == null ? void 0 : e.caipNetworks) == null || r.push(t));
  },
  switchActiveNamespace(t) {
    return h(this, null, function* () {
      var n;
      if (!t)
        return;
      const e = t !== R.state.activeChain, r = (n = R.getNetworkData(t)) == null ? void 0 : n.caipNetwork, s = R.getCaipNetworkByNamespace(t, r == null ? void 0 : r.id);
      e && s && (yield R.switchActiveNetwork(s));
    });
  },
  switchActiveNetwork(t) {
    return h(this, null, function* () {
      var n;
      const e = R.state.chains.get(R.state.activeChain);
      !((n = e == null ? void 0 : e.caipNetworks) != null && n.some((i) => {
        var o;
        return i.id === ((o = Y.activeCaipNetwork) == null ? void 0 : o.id);
      })) && xe.goBack();
      const s = this.getNetworkControllerClient(t.chainNamespace);
      s && (yield s.switchCaipNetwork(t), Ke.sendEvent({
        type: "track",
        event: "SWITCH_NETWORK",
        properties: { network: t.caipNetworkId }
      }));
    });
  },
  getNetworkControllerClient(t) {
    const e = t || Y.activeChain, r = Y.chains.get(e);
    if (!r)
      throw new Error("Chain adapter not found");
    if (!r.networkControllerClient)
      throw new Error("NetworkController client not set");
    return r.networkControllerClient;
  },
  getConnectionControllerClient(t) {
    const e = t || Y.activeChain;
    if (!e)
      throw new Error("Chain is required to get connection controller client");
    const r = Y.chains.get(e);
    if (!(r != null && r.connectionControllerClient))
      throw new Error("ConnectionController client not set");
    return r.connectionControllerClient;
  },
  getAccountProp(t, e) {
    var n;
    let r = Y.activeChain;
    if (e && (r = e), !r)
      return;
    const s = (n = Y.chains.get(r)) == null ? void 0 : n.accountState;
    if (s)
      return s[t];
  },
  getNetworkProp(t, e) {
    var s;
    const r = (s = Y.chains.get(e)) == null ? void 0 : s.networkState;
    if (r)
      return r[t];
  },
  getRequestedCaipNetworks(t) {
    const e = Y.chains.get(t), { approvedCaipNetworkIds: r = [], requestedCaipNetworks: s = [] } = (e == null ? void 0 : e.networkState) || {};
    return he.sortRequestedNetworks(r, s);
  },
  getAllRequestedCaipNetworks() {
    const t = [];
    return Y.chains.forEach((e) => {
      const r = this.getRequestedCaipNetworks(e.namespace);
      t.push(...r);
    }), t;
  },
  setRequestedCaipNetworks(t, e) {
    this.setAdapterNetworkState(e, { requestedCaipNetworks: t });
    const s = this.getAllRequestedCaipNetworks().map((i) => i.chainNamespace), n = Array.from(new Set(s));
    pe.filterByNamespaces(n);
  },
  getAllApprovedCaipNetworkIds() {
    const t = [];
    return Y.chains.forEach((e) => {
      const r = this.getApprovedCaipNetworkIds(e.namespace);
      t.push(...r);
    }), t;
  },
  getActiveCaipNetwork() {
    return Y.activeCaipNetwork;
  },
  getActiveCaipAddress() {
    return Y.activeCaipAddress;
  },
  getApprovedCaipNetworkIds(t) {
    var s;
    const e = Y.chains.get(t);
    return ((s = e == null ? void 0 : e.networkState) == null ? void 0 : s.approvedCaipNetworkIds) || [];
  },
  setApprovedCaipNetworksData(t) {
    return h(this, null, function* () {
      const e = this.getNetworkControllerClient(), r = yield e == null ? void 0 : e.getApprovedCaipNetworksData();
      this.setAdapterNetworkState(t, {
        approvedCaipNetworkIds: r == null ? void 0 : r.approvedCaipNetworkIds,
        supportsAllNetworks: r == null ? void 0 : r.supportsAllNetworks
      });
    });
  },
  checkIfSupportedNetwork(t, e) {
    const r = e || Y.activeCaipNetwork, s = this.getRequestedCaipNetworks(t);
    return s.length ? s == null ? void 0 : s.some((n) => n.id === (r == null ? void 0 : r.id)) : !0;
  },
  checkIfSupportedChainId(t) {
    if (!Y.activeChain)
      return !0;
    const e = this.getRequestedCaipNetworks(Y.activeChain);
    return e == null ? void 0 : e.some((r) => r.id === t);
  },
  // Smart Account Network Handlers
  setSmartAccountEnabledNetworks(t, e) {
    this.setAdapterNetworkState(e, { smartAccountEnabledNetworks: t });
  },
  checkIfSmartAccountEnabled() {
    var s;
    const t = rg.caipNetworkIdToNumber((s = Y.activeCaipNetwork) == null ? void 0 : s.caipNetworkId), e = Y.activeChain;
    if (!e || !t)
      return !1;
    const r = this.getNetworkProp("smartAccountEnabledNetworks", e);
    return !!(r != null && r.includes(Number(t)));
  },
  getActiveNetworkTokenAddress() {
    var s, n;
    const t = ((s = Y.activeCaipNetwork) == null ? void 0 : s.chainNamespace) || "eip155", e = ((n = Y.activeCaipNetwork) == null ? void 0 : n.id) || 1, r = vt.NATIVE_TOKEN_ADDRESS[t];
    return `${t}:${e}:${r}`;
  },
  showUnsupportedChainUI() {
    et.open({ view: "UnsupportedChain" });
  },
  checkIfNamesSupported() {
    const t = Y.activeCaipNetwork;
    return !!(t != null && t.chainNamespace && vt.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(t.chainNamespace));
  },
  resetNetwork(t) {
    this.setAdapterNetworkState(t, {
      approvedCaipNetworkIds: void 0,
      supportsAllNetworks: !0,
      smartAccountEnabledNetworks: []
    });
  },
  resetAccount(t) {
    const e = t;
    if (!e)
      throw new Error("Chain is required to set account prop");
    Y.activeCaipAddress = void 0, this.setChainAccountData(e, {
      smartAccountDeployed: !1,
      currentTab: 0,
      caipAddress: void 0,
      address: void 0,
      balance: void 0,
      balanceSymbol: void 0,
      profileName: void 0,
      profileImage: void 0,
      addressExplorerUrl: void 0,
      tokenBalance: [],
      connectedWalletInfo: void 0,
      preferredAccountTypes: void 0,
      socialProvider: void 0,
      socialWindow: void 0,
      farcasterUrl: void 0,
      allAccounts: [],
      user: void 0,
      status: "disconnected"
    }), pe.removeConnectorId(e);
  },
  disconnect(t) {
    return h(this, null, function* () {
      const e = Wy(t);
      try {
        Of.resetSend();
        const r = yield Promise.allSettled(e.map((o) => h(this, [o], function* ([n, i]) {
          var a;
          try {
            const { caipAddress: c } = this.getAccountData(n) || {};
            c && ((a = i.connectionControllerClient) != null && a.disconnect) && (yield i.connectionControllerClient.disconnect(n)), this.resetAccount(n), this.resetNetwork(n);
          } catch (c) {
            throw new Error(`Failed to disconnect chain ${n}: ${c.message}`);
          }
        })));
        He.resetWcConnection();
        const s = r.filter((n) => n.status === "rejected");
        if (s.length > 0)
          throw new Error(s.map((n) => n.reason.message).join(", "));
        re.deleteConnectedSocialProvider(), t ? pe.removeConnectorId(t) : pe.resetConnectorIds(), Ke.sendEvent({
          type: "track",
          event: "DISCONNECT_SUCCESS",
          properties: {
            namespace: t || "all"
          }
        });
      } catch (r) {
        console.error(r.message || "Failed to disconnect chains"), Ke.sendEvent({
          type: "track",
          event: "DISCONNECT_ERROR",
          properties: {
            message: r.message || "Failed to disconnect chains"
          }
        });
      }
    });
  },
  setIsSwitchingNamespace(t) {
    Y.isSwitchingNamespace = t;
  },
  getFirstCaipNetworkSupportsAuthConnector() {
    var r, s;
    const t = [];
    let e;
    if (Y.chains.forEach((n) => {
      se.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((i) => i === n.namespace) && n.namespace && t.push(n.namespace);
    }), t.length > 0) {
      const n = t[0];
      return e = n ? (s = (r = Y.chains.get(n)) == null ? void 0 : r.caipNetworks) == null ? void 0 : s[0] : void 0, e;
    }
  },
  getAccountData(t) {
    var e;
    return t ? (e = R.state.chains.get(t)) == null ? void 0 : e.accountState : ne.state;
  },
  getNetworkData(t) {
    var r;
    const e = t || Y.activeChain;
    if (e)
      return (r = R.state.chains.get(e)) == null ? void 0 : r.networkState;
  },
  getCaipNetworkByNamespace(t, e) {
    var n, i, o;
    if (!t)
      return;
    const r = R.state.chains.get(t), s = (n = r == null ? void 0 : r.caipNetworks) == null ? void 0 : n.find((a) => a.id === e);
    return s || ((i = r == null ? void 0 : r.networkState) == null ? void 0 : i.caipNetwork) || ((o = r == null ? void 0 : r.caipNetworks) == null ? void 0 : o[0]);
  },
  /**
   * Get the requested CaipNetwork IDs for a given namespace. If namespace is not provided, all requested CaipNetwork IDs will be returned
   * @param namespace - The namespace to get the requested CaipNetwork IDs for
   * @returns The requested CaipNetwork IDs
   */
  getRequestedCaipNetworkIds() {
    const t = pe.state.filterByNamespace;
    return (t ? [Y.chains.get(t)] : Array.from(Y.chains.values())).flatMap((r) => (r == null ? void 0 : r.caipNetworks) || []).map((r) => r.caipNetworkId);
  },
  getCaipNetworks(t) {
    return t ? R.getRequestedCaipNetworks(t) : R.getAllRequestedCaipNetworks();
  }
}, sD = {
  purchaseCurrencies: [
    {
      id: "2b92315d-eab7-5bef-84fa-089a131333f5",
      name: "USD Coin",
      symbol: "USDC",
      networks: [
        {
          name: "ethereum-mainnet",
          display_name: "Ethereum",
          chain_id: "1",
          contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          name: "polygon-mainnet",
          display_name: "Polygon",
          chain_id: "137",
          contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        }
      ]
    },
    {
      id: "2b92315d-eab7-5bef-84fa-089a131333f5",
      name: "Ether",
      symbol: "ETH",
      networks: [
        {
          name: "ethereum-mainnet",
          display_name: "Ethereum",
          chain_id: "1",
          contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          name: "polygon-mainnet",
          display_name: "Polygon",
          chain_id: "137",
          contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        }
      ]
    }
  ],
  paymentCurrencies: [
    {
      id: "USD",
      payment_method_limits: [
        {
          id: "card",
          min: "10.00",
          max: "7500.00"
        },
        {
          id: "ach_bank_account",
          min: "10.00",
          max: "25000.00"
        }
      ]
    },
    {
      id: "EUR",
      payment_method_limits: [
        {
          id: "card",
          min: "10.00",
          max: "7500.00"
        },
        {
          id: "ach_bank_account",
          min: "10.00",
          max: "25000.00"
        }
      ]
    }
  ]
}, Uw = he.getBlockchainApiUrl(), Jt = Ye({
  clientId: null,
  api: new gc({ baseUrl: Uw, clientId: null }),
  supportedChains: { http: [], ws: [] }
}), de = {
  state: Jt,
  get(t) {
    return h(this, null, function* () {
      const { st: e, sv: r } = de.getSdkProperties(), s = q.state.projectId, n = B(C({}, t.params || {}), {
        st: e,
        sv: r,
        projectId: s
      });
      return Jt.api.get(B(C({}, t), {
        params: n
      }));
    });
  },
  getSdkProperties() {
    const { sdkType: t, sdkVersion: e } = q.state;
    return {
      st: t || "unknown",
      sv: e || "unknown"
    };
  },
  isNetworkSupported(t) {
    return h(this, null, function* () {
      if (!t)
        return !1;
      try {
        Jt.supportedChains.http.length || (yield de.getSupportedNetworks());
      } catch (e) {
        return !1;
      }
      return Jt.supportedChains.http.includes(t);
    });
  },
  getSupportedNetworks() {
    return h(this, null, function* () {
      const t = yield de.get({
        path: "v1/supported-chains"
      });
      return Jt.supportedChains = t, t;
    });
  },
  fetchIdentity(r) {
    return h(this, arguments, function* ({ address: t, caipNetworkId: e }) {
      if (!(yield de.isNetworkSupported(e)))
        return { avatar: "", name: "" };
      const n = re.getIdentityFromCacheForAddress(t);
      if (n)
        return n;
      const i = yield de.get({
        path: `/v1/identity/${t}`,
        params: {
          sender: R.state.activeCaipAddress ? he.getPlainAddress(R.state.activeCaipAddress) : void 0
        }
      });
      return re.updateIdentityCache({
        address: t,
        identity: i,
        timestamp: Date.now()
      }), i;
    });
  },
  fetchTransactions(o) {
    return h(this, arguments, function* ({ account: t, cursor: e, onramp: r, signal: s, cache: n, chainId: i }) {
      var c;
      return (yield de.isNetworkSupported((c = R.state.activeCaipNetwork) == null ? void 0 : c.caipNetworkId)) ? de.get({
        path: `/v1/account/${t}/history`,
        params: {
          cursor: e,
          onramp: r,
          chainId: i
        },
        signal: s,
        cache: n
      }) : { data: [], next: void 0 };
    });
  },
  fetchSwapQuote(i) {
    return h(this, arguments, function* ({ amount: t, userAddress: e, from: r, to: s, gasPrice: n }) {
      var a;
      return (yield de.isNetworkSupported((a = R.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId)) ? de.get({
        path: "/v1/convert/quotes",
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          amount: t,
          userAddress: e,
          from: r,
          to: s,
          gasPrice: n
        }
      }) : { quotes: [] };
    });
  },
  fetchSwapTokens(e) {
    return h(this, arguments, function* ({ chainId: t }) {
      var s;
      return (yield de.isNetworkSupported((s = R.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId)) ? de.get({
        path: "/v1/convert/tokens",
        params: { chainId: t }
      }) : { tokens: [] };
    });
  },
  fetchTokenPrice(e) {
    return h(this, arguments, function* ({ addresses: t }) {
      var s;
      return (yield de.isNetworkSupported((s = R.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId)) ? Jt.api.post({
        path: "/v1/fungible/price",
        body: {
          currency: "usd",
          addresses: t,
          projectId: q.state.projectId
        },
        headers: {
          "Content-Type": "application/json"
        }
      }) : { fungibles: [] };
    });
  },
  fetchSwapAllowance(r) {
    return h(this, arguments, function* ({ tokenAddress: t, userAddress: e }) {
      var n;
      return (yield de.isNetworkSupported((n = R.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId)) ? de.get({
        path: "/v1/convert/allowance",
        params: {
          tokenAddress: t,
          userAddress: e
        },
        headers: {
          "Content-Type": "application/json"
        }
      }) : { allowance: "0" };
    });
  },
  fetchGasPrice(e) {
    return h(this, arguments, function* ({ chainId: t }) {
      var i;
      const { st: r, sv: s } = de.getSdkProperties();
      if (!(yield de.isNetworkSupported((i = R.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId)))
        throw new Error("Network not supported for Gas Price");
      return de.get({
        path: "/v1/convert/gas-price",
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          chainId: t,
          st: r,
          sv: s
        }
      });
    });
  },
  generateSwapCalldata(i) {
    return h(this, arguments, function* ({ amount: t, from: e, to: r, userAddress: s, disableEstimate: n }) {
      var a;
      if (!(yield de.isNetworkSupported((a = R.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId)))
        throw new Error("Network not supported for Swaps");
      return Jt.api.post({
        path: "/v1/convert/build-transaction",
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          amount: t,
          eip155: {
            slippage: vt.CONVERT_SLIPPAGE_TOLERANCE
          },
          projectId: q.state.projectId,
          from: e,
          to: r,
          userAddress: s,
          disableEstimate: n
        }
      });
    });
  },
  generateApproveCalldata(s) {
    return h(this, arguments, function* ({ from: t, to: e, userAddress: r }) {
      var a;
      const { st: n, sv: i } = de.getSdkProperties();
      if (!(yield de.isNetworkSupported((a = R.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId)))
        throw new Error("Network not supported for Swaps");
      return de.get({
        path: "/v1/convert/build-approve",
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          userAddress: r,
          from: t,
          to: e,
          st: n,
          sv: i
        }
      });
    });
  },
  getBalance(t, e, r) {
    return h(this, null, function* () {
      var l;
      const { st: s, sv: n } = de.getSdkProperties();
      if (!(yield de.isNetworkSupported((l = R.state.activeCaipNetwork) == null ? void 0 : l.caipNetworkId)))
        return Ar.showError("Token Balance Unavailable"), { balances: [] };
      const o = `${e}:${t}`, a = re.getBalanceCacheForCaipAddress(o);
      if (a)
        return a;
      const c = yield de.get({
        path: `/v1/account/${t}/balance`,
        params: {
          currency: "usd",
          chainId: e,
          forceUpdate: r,
          st: s,
          sv: n
        }
      });
      return re.updateBalanceCache({
        caipAddress: o,
        balance: c,
        timestamp: Date.now()
      }), c;
    });
  },
  lookupEnsName(t) {
    return h(this, null, function* () {
      var r;
      return (yield de.isNetworkSupported((r = R.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId)) ? de.get({
        path: `/v1/profile/account/${t}`,
        params: { apiVersion: "2" }
      }) : { addresses: {}, attributes: [] };
    });
  },
  reverseLookupEnsName(e) {
    return h(this, arguments, function* ({ address: t }) {
      var s;
      return (yield de.isNetworkSupported((s = R.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId)) ? de.get({
        path: `/v1/profile/reverse/${t}`,
        params: {
          sender: ne.state.address,
          apiVersion: "2"
        }
      }) : [];
    });
  },
  getEnsNameSuggestions(t) {
    return h(this, null, function* () {
      var r;
      return (yield de.isNetworkSupported((r = R.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId)) ? de.get({
        path: `/v1/profile/suggestions/${t}`,
        params: { zone: "reown.id" }
      }) : { suggestions: [] };
    });
  },
  registerEnsName(n) {
    return h(this, arguments, function* ({ coinType: t, address: e, message: r, signature: s }) {
      var o;
      return (yield de.isNetworkSupported((o = R.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId)) ? Jt.api.post({
        path: "/v1/profile/account",
        body: { coin_type: t, address: e, message: r, signature: s },
        headers: {
          "Content-Type": "application/json"
        }
      }) : { success: !1 };
    });
  },
  generateOnRampURL(i) {
    return h(this, arguments, function* ({ destinationWallets: t, partnerUserId: e, defaultNetwork: r, purchaseAmount: s, paymentAmount: n }) {
      var c;
      return (yield de.isNetworkSupported((c = R.state.activeCaipNetwork) == null ? void 0 : c.caipNetworkId)) ? (yield Jt.api.post({
        path: "/v1/generators/onrampurl",
        params: {
          projectId: q.state.projectId
        },
        body: {
          destinationWallets: t,
          defaultNetwork: r,
          partnerUserId: e,
          defaultExperience: "buy",
          presetCryptoAmount: s,
          presetFiatAmount: n
        }
      })).url : "";
    });
  },
  getOnrampOptions() {
    return h(this, null, function* () {
      var e;
      if (!(yield de.isNetworkSupported((e = R.state.activeCaipNetwork) == null ? void 0 : e.caipNetworkId)))
        return { paymentCurrencies: [], purchaseCurrencies: [] };
      try {
        return yield de.get({
          path: "/v1/onramp/options"
        });
      } catch (r) {
        return sD;
      }
    });
  },
  getOnrampQuote(n) {
    return h(this, arguments, function* ({ purchaseCurrency: t, paymentCurrency: e, amount: r, network: s }) {
      var i;
      try {
        return (yield de.isNetworkSupported((i = R.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId)) ? yield Jt.api.post({
          path: "/v1/onramp/quote",
          params: {
            projectId: q.state.projectId
          },
          body: {
            purchaseCurrency: t,
            paymentCurrency: e,
            amount: r,
            network: s
          }
        }) : null;
      } catch (o) {
        return {
          coinbaseFee: { amount: r, currency: e.id },
          networkFee: { amount: r, currency: e.id },
          paymentSubtotal: { amount: r, currency: e.id },
          paymentTotal: { amount: r, currency: e.id },
          purchaseAmount: { amount: r, currency: e.id },
          quoteId: "mocked-quote-id"
        };
      }
    });
  },
  getSmartSessions(t) {
    return h(this, null, function* () {
      var r;
      return (yield de.isNetworkSupported((r = R.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId)) ? de.get({
        path: `/v1/sessions/${t}`
      }) : [];
    });
  },
  revokeSmartSession(t, e, r) {
    return h(this, null, function* () {
      var n;
      return (yield de.isNetworkSupported((n = R.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId)) ? Jt.api.post({
        path: `/v1/sessions/${t}/revoke`,
        params: {
          projectId: q.state.projectId
        },
        body: {
          pci: e,
          signature: r
        }
      }) : { success: !1 };
    });
  },
  setClientId(t) {
    Jt.clientId = t, Jt.api = new gc({ baseUrl: Uw, clientId: t });
  }
}, lr = Ye({
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: !1,
  addressLabels: /* @__PURE__ */ new Map(),
  allAccounts: []
}), ne = {
  state: lr,
  replaceState(t) {
    t && Object.assign(lr, en(t));
  },
  subscribe(t) {
    return R.subscribeChainProp("accountState", (e) => {
      if (e)
        return t(e);
    });
  },
  subscribeKey(t, e, r) {
    let s;
    return R.subscribeChainProp("accountState", (n) => {
      if (n) {
        const i = n[t];
        s !== i && (s = i, e(i));
      }
    }, r);
  },
  setStatus(t, e) {
    R.setAccountProp("status", t, e);
  },
  getCaipAddress(t) {
    return R.getAccountProp("caipAddress", t);
  },
  setCaipAddress(t, e) {
    const r = t ? he.getPlainAddress(t) : void 0;
    e === R.state.activeChain && (R.state.activeCaipAddress = t), R.setAccountProp("caipAddress", t, e), R.setAccountProp("address", r, e);
  },
  setBalance(t, e, r) {
    R.setAccountProp("balance", t, r), R.setAccountProp("balanceSymbol", e, r);
  },
  setProfileName(t, e) {
    R.setAccountProp("profileName", t, e);
  },
  setProfileImage(t, e) {
    R.setAccountProp("profileImage", t, e);
  },
  setUser(t, e) {
    R.setAccountProp("user", t, e);
  },
  setAddressExplorerUrl(t, e) {
    R.setAccountProp("addressExplorerUrl", t, e);
  },
  setSmartAccountDeployed(t, e) {
    R.setAccountProp("smartAccountDeployed", t, e);
  },
  setCurrentTab(t) {
    R.setAccountProp("currentTab", t, R.state.activeChain);
  },
  setTokenBalance(t, e) {
    t && R.setAccountProp("tokenBalance", t, e);
  },
  setShouldUpdateToAddress(t, e) {
    R.setAccountProp("shouldUpdateToAddress", t, e);
  },
  setAllAccounts(t, e) {
    R.setAccountProp("allAccounts", t, e);
  },
  addAddressLabel(t, e, r) {
    const s = R.getAccountProp("addressLabels", r) || /* @__PURE__ */ new Map();
    s.set(t, e), R.setAccountProp("addressLabels", s, r);
  },
  removeAddressLabel(t, e) {
    const r = R.getAccountProp("addressLabels", e) || /* @__PURE__ */ new Map();
    r.delete(t), R.setAccountProp("addressLabels", r, e);
  },
  setConnectedWalletInfo(t, e) {
    R.setAccountProp("connectedWalletInfo", t, e, !1);
  },
  setPreferredAccountType(t, e) {
    R.setAccountProp("preferredAccountTypes", B(C({}, lr.preferredAccountTypes), {
      [e]: t
    }), e);
  },
  setPreferredAccountTypes(t) {
    lr.preferredAccountTypes = t;
  },
  setSocialProvider(t, e) {
    t && R.setAccountProp("socialProvider", t, e);
  },
  setSocialWindow(t, e) {
    R.setAccountProp("socialWindow", t ? en(t) : void 0, e);
  },
  setFarcasterUrl(t, e) {
    R.setAccountProp("farcasterUrl", t, e);
  },
  fetchTokenBalance(t) {
    return h(this, null, function* () {
      var i, o;
      lr.balanceLoading = !0;
      const e = (i = R.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId, r = (o = R.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace, s = R.state.activeCaipAddress, n = s ? he.getPlainAddress(s) : void 0;
      if (lr.lastRetry && !he.isAllowedRetry(lr.lastRetry, 30 * vt.ONE_SEC_MS))
        return lr.balanceLoading = !1, [];
      try {
        if (n && e && r) {
          const c = (yield de.getBalance(n, e)).balances.filter((l) => l.quantity.decimals !== "0");
          return this.setTokenBalance(c, r), lr.lastRetry = void 0, lr.balanceLoading = !1, c;
        }
      } catch (a) {
        lr.lastRetry = Date.now(), t == null || t(a), Ar.showError("Token Balance Unavailable");
      } finally {
        lr.balanceLoading = !1;
      }
      return [];
    });
  },
  resetAccount(t) {
    R.resetAccount(t);
  }
}, Lt = Ye({
  loading: !1,
  loadingNamespaceMap: /* @__PURE__ */ new Map(),
  open: !1,
  shake: !1,
  namespace: void 0
}), et = {
  state: Lt,
  subscribe(t) {
    return Dt(Lt, () => t(Lt));
  },
  subscribeKey(t, e) {
    return Wt(Lt, t, e);
  },
  open(t) {
    return h(this, null, function* () {
      var n;
      const e = ne.state.status === "connected";
      He.state.wcBasic ? le.prefetch({ fetchNetworkImages: !1, fetchConnectorImages: !1 }) : yield le.prefetch({
        fetchConnectorImages: !e,
        fetchFeaturedWallets: !e,
        fetchRecommendedWallets: !e
      }), t != null && t.namespace ? (yield R.switchActiveNamespace(t.namespace), et.setLoading(!0, t.namespace)) : et.setLoading(!0), pe.setFilterByNamespace(t == null ? void 0 : t.namespace);
      const r = (n = R.getAccountData(t == null ? void 0 : t.namespace)) == null ? void 0 : n.caipAddress, s = R.state.noAdapters;
      q.state.manualWCControl || s && !r ? he.isMobile() ? xe.reset("AllWallets") : xe.reset("ConnectingWalletConnectBasic") : t != null && t.view ? xe.reset(t.view, t.data) : r ? xe.reset("Account") : xe.reset("Connect"), Lt.open = !0, qr.set({ open: !0 }), Ke.sendEvent({
        type: "track",
        event: "MODAL_OPEN",
        properties: { connected: !!r }
      });
    });
  },
  /**
   * To close the modal on the ApproveTransaction view, call close() with force=true:
   * ModalController.close(true)
   * this prevents accidental closing during transaction approval from secure sites
   * @param force - If true, the modal will close regardless of the current view
   */
  close(t = !1) {
    if (t || xe.state.view !== "ApproveTransaction") {
      const e = q.state.enableEmbedded, r = !!R.state.activeCaipAddress;
      Lt.open && Ke.sendEvent({
        type: "track",
        event: "MODAL_CLOSE",
        properties: { connected: r }
      }), Lt.open = !1, et.clearLoading(), e ? r ? xe.replace("Account") : xe.push("Connect") : qr.set({ open: !1 });
    }
    He.resetUri();
  },
  setLoading(t, e) {
    e && Lt.loadingNamespaceMap.set(e, t), Lt.loading = t, qr.set({ loading: t });
  },
  clearLoading() {
    Lt.loadingNamespaceMap.clear(), Lt.loading = !1;
  },
  shake() {
    Lt.shake || (Lt.shake = !0, setTimeout(() => {
      Lt.shake = !1;
    }, 500));
  }
}, Rf = 2147483648, nD = {
  convertEVMChainIdToCoinType(t) {
    if (t >= Rf)
      throw new Error("Invalid chainId");
    return (Rf | t) >>> 0;
  }
}, ur = Ye({
  suggestions: [],
  loading: !1
}), Lw = {
  state: ur,
  subscribe(t) {
    return Dt(ur, () => t(ur));
  },
  subscribeKey(t, e) {
    return Wt(ur, t, e);
  },
  resolveName(t) {
    return h(this, null, function* () {
      var e, r;
      try {
        return yield de.lookupEnsName(t);
      } catch (s) {
        const n = s;
        throw new Error(((r = (e = n == null ? void 0 : n.reasons) == null ? void 0 : e[0]) == null ? void 0 : r.description) || "Error resolving name");
      }
    });
  },
  isNameRegistered(t) {
    return h(this, null, function* () {
      try {
        return yield de.lookupEnsName(t), !0;
      } catch (e) {
        return !1;
      }
    });
  },
  getSuggestions(t) {
    return h(this, null, function* () {
      try {
        ur.loading = !0, ur.suggestions = [];
        const e = yield de.getEnsNameSuggestions(t);
        return ur.suggestions = e.suggestions.map((r) => B(C({}, r), {
          name: r.name
        })) || [], ur.suggestions;
      } catch (e) {
        const r = this.parseEnsApiError(e, "Error fetching name suggestions");
        throw new Error(r);
      } finally {
        ur.loading = !1;
      }
    });
  },
  getNamesForAddress(t) {
    return h(this, null, function* () {
      try {
        if (!R.state.activeCaipNetwork)
          return [];
        const r = re.getEnsFromCacheForAddress(t);
        if (r)
          return r;
        const s = yield de.reverseLookupEnsName({ address: t });
        return re.updateEnsCache({
          address: t,
          ens: s,
          timestamp: Date.now()
        }), s;
      } catch (e) {
        const r = this.parseEnsApiError(e, "Error fetching names for address");
        throw new Error(r);
      }
    });
  },
  registerName(t) {
    return h(this, null, function* () {
      const e = R.state.activeCaipNetwork;
      if (!e)
        throw new Error("Network not found");
      const r = ne.state.address, s = pe.getAuthConnector();
      if (!r || !s)
        throw new Error("Address or auth connector not found");
      ur.loading = !0;
      try {
        const n = JSON.stringify({
          name: t,
          attributes: {},
          // Unix timestamp
          timestamp: Math.floor(Date.now() / 1e3)
        });
        xe.pushTransactionStack({
          view: "RegisterAccountNameSuccess",
          goBack: !1,
          replace: !0,
          onCancel() {
            ur.loading = !1;
          }
        });
        const i = yield He.signMessage(n), o = e.id;
        if (!o)
          throw new Error("Network not found");
        const a = nD.convertEVMChainIdToCoinType(Number(o));
        yield de.registerEnsName({
          coinType: a,
          address: r,
          signature: i,
          message: n
        }), ne.setProfileName(t, e.chainNamespace), xe.replace("RegisterAccountNameSuccess");
      } catch (n) {
        const i = this.parseEnsApiError(n, `Error registering name ${t}`);
        throw xe.replace("RegisterAccountName"), new Error(i);
      } finally {
        ur.loading = !1;
      }
    });
  },
  validateName(t) {
    return /^[a-zA-Z0-9-]{4,}$/u.test(t);
  },
  parseEnsApiError(t, e) {
    var s, n;
    const r = t;
    return ((n = (s = r == null ? void 0 : r.reasons) == null ? void 0 : s[0]) == null ? void 0 : n.description) || e;
  }
}, qt = {
  METMASK_CONNECTOR_NAME: "MetaMask",
  TRUST_CONNECTOR_NAME: "Trust Wallet",
  SOLFLARE_CONNECTOR_NAME: "Solflare",
  PHANTOM_CONNECTOR_NAME: "Phantom",
  COIN98_CONNECTOR_NAME: "Coin98",
  MAGIC_EDEN_CONNECTOR_NAME: "Magic Eden",
  BACKPACK_CONNECTOR_NAME: "Backpack",
  BITGET_CONNECTOR_NAME: "Bitget Wallet",
  FRONTIER_CONNECTOR_NAME: "Frontier",
  XVERSE_CONNECTOR_NAME: "Xverse Wallet",
  LEATHER_CONNECTOR_NAME: "Leather",
  EIP155: "eip155",
  ADD_CHAIN_METHOD: "wallet_addEthereumChain",
  EIP6963_ANNOUNCE_EVENT: "eip6963:announceProvider",
  EIP6963_REQUEST_EVENT: "eip6963:requestProvider",
  CONNECTOR_RDNS_MAP: {
    coinbaseWallet: "com.coinbase.wallet",
    coinbaseWalletSDK: "com.coinbase.wallet"
  },
  CONNECTOR_TYPE_EXTERNAL: "EXTERNAL",
  CONNECTOR_TYPE_WALLET_CONNECT: "WALLET_CONNECT",
  CONNECTOR_TYPE_INJECTED: "INJECTED",
  CONNECTOR_TYPE_ANNOUNCED: "ANNOUNCED",
  CONNECTOR_TYPE_AUTH: "AUTH",
  CONNECTOR_TYPE_MULTI_CHAIN: "MULTI_CHAIN",
  CONNECTOR_TYPE_W3M_AUTH: "ID_AUTH"
}, tc = {
  NetworkImageIds: {
    1: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
    42161: "3bff954d-5cb0-47a0-9a23-d20192e74600",
    43114: "30c46e53-e989-45fb-4549-be3bd4eb3b00",
    56: "93564157-2e8e-4ce7-81df-b264dbee9b00",
    250: "06b26297-fe0c-4733-5d6b-ffa5498aac00",
    10: "ab9c186a-c52f-464b-2906-ca59d760a400",
    137: "41d04d42-da3b-4453-8506-668cc0727900",
    5e3: "e86fae9b-b770-4eea-e520-150e12c81100",
    295: "6a97d510-cac8-4e58-c7ce-e8681b044c00",
    11155111: "e909ea0a-f92a-4512-c8fc-748044ea6800",
    84532: "a18a7ecd-e307-4360-4746-283182228e00",
    1301: "4eeea7ef-0014-4649-5d1d-07271a80f600",
    130: "2257980a-3463-48c6-cbac-a42d2a956e00",
    10143: "0a728e83-bacb-46db-7844-948f05434900",
    100: "02b53f6a-e3d4-479e-1cb4-21178987d100",
    9001: "f926ff41-260d-4028-635e-91913fc28e00",
    324: "b310f07f-4ef7-49f3-7073-2a0a39685800",
    314: "5a73b3dd-af74-424e-cae0-0de859ee9400",
    4689: "34e68754-e536-40da-c153-6ef2e7188a00",
    1088: "3897a66d-40b9-4833-162f-a2c90531c900",
    1284: "161038da-44ae-4ec7-1208-0ea569454b00",
    1285: "f1d73bb6-5450-4e18-38f7-fb6484264a00",
    7777777: "845c60df-d429-4991-e687-91ae45791600",
    42220: "ab781bbc-ccc6-418d-d32d-789b15da1f00",
    8453: "7289c336-3981-4081-c5f4-efc26ac64a00",
    1313161554: "3ff73439-a619-4894-9262-4470c773a100",
    2020: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
    2021: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
    80094: "e329c2c9-59b0-4a02-83e4-212ff3779900",
    2741: "fc2427d1-5af9-4a9c-8da5-6f94627cd900",
    "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp": "a1b58899-f671-4276-6a5e-56ca5bd59700",
    "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z": "a1b58899-f671-4276-6a5e-56ca5bd59700",
    EtWTRABZaYq6iMfeYKouRu166VU2xqa1: "a1b58899-f671-4276-6a5e-56ca5bd59700",
    "000000000019d6689c085ae165831e93": "0b4838db-0161-4ffe-022d-532bf03dba00",
    "000000000933ea01ad0ee984209779ba": "39354064-d79b-420b-065d-f980c4b78200"
  },
  ConnectorImageIds: {
    [se.CONNECTOR_ID.COINBASE]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [se.CONNECTOR_ID.COINBASE_SDK]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [se.CONNECTOR_ID.SAFE]: "461db637-8616-43ce-035a-d89b8a1d5800",
    [se.CONNECTOR_ID.LEDGER]: "54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",
    [se.CONNECTOR_ID.WALLET_CONNECT]: "ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",
    [se.CONNECTOR_ID.INJECTED]: "07ba87ed-43aa-4adf-4540-9e6a2b9cae00"
  },
  ConnectorNamesMap: {
    [se.CONNECTOR_ID.INJECTED]: "Browser Wallet",
    [se.CONNECTOR_ID.WALLET_CONNECT]: "WalletConnect",
    [se.CONNECTOR_ID.COINBASE]: "Coinbase",
    [se.CONNECTOR_ID.COINBASE_SDK]: "Coinbase",
    [se.CONNECTOR_ID.LEDGER]: "Ledger",
    [se.CONNECTOR_ID.SAFE]: "Safe"
  }
}, xc = {
  getCaipTokens(t) {
    if (!t)
      return;
    const e = {};
    return Object.entries(t).forEach(([r, s]) => {
      e[`${qt.EIP155}:${r}`] = s;
    }), e;
  },
  isLowerCaseMatch(t, e) {
    return (t == null ? void 0 : t.toLowerCase()) === (e == null ? void 0 : e.toLowerCase());
  }
}, iD = new AbortController(), Br = {
  EmbeddedWalletAbortController: iD,
  UniversalProviderErrors: {
    UNAUTHORIZED_DOMAIN_NOT_ALLOWED: {
      message: "Unauthorized: origin not allowed",
      alertErrorKey: "INVALID_APP_CONFIGURATION"
    },
    JWT_VALIDATION_ERROR: {
      message: "JWT validation error: JWT Token is not yet valid",
      alertErrorKey: "JWT_TOKEN_NOT_VALID"
    },
    INVALID_KEY: {
      message: "Unauthorized: invalid key",
      alertErrorKey: "INVALID_PROJECT_ID"
    }
  },
  ALERT_ERRORS: {
    SWITCH_NETWORK_NOT_FOUND: {
      shortMessage: "Network Not Found",
      longMessage: "Network not found - please make sure it is included in 'networks' array in createAppKit function"
    },
    INVALID_APP_CONFIGURATION: {
      shortMessage: "Invalid App Configuration",
      longMessage: () => `Origin ${oD() ? window.origin : "unknown"} not found on Allowlist - update configuration on cloud.reown.com`
    },
    IFRAME_LOAD_FAILED: {
      shortMessage: "Network Error - Could not load embedded wallet",
      longMessage: () => "There was an issue loading the embedded wallet. Please try again later."
    },
    IFRAME_REQUEST_TIMEOUT: {
      shortMessage: "Embedded Wallet Request Timed Out",
      longMessage: () => "There was an issue doing the request to the embedded wallet. Please try again later."
    },
    UNVERIFIED_DOMAIN: {
      shortMessage: "Invalid App Configuration",
      longMessage: () => "There was an issue loading the embedded wallet. Please verify that your domain is allowed at cloud.reown.com"
    },
    JWT_TOKEN_NOT_VALID: {
      shortMessage: "Session Expired",
      longMessage: "Invalid session found on UniversalProvider - please check your time settings and connect again"
    },
    INVALID_PROJECT_ID: {
      shortMessage: "Invalid App Configuration",
      longMessage: "Invalid Project ID - update configuration"
    },
    PROJECT_ID_NOT_CONFIGURED: {
      shortMessage: "Project ID Not Configured",
      longMessage: "Project ID Not Configured - update configuration on cloud.reown.com"
    }
  }
};
function oD() {
  return typeof window != "undefined";
}
const aD = {
  createLogger(t, e = "error") {
    const r = di({
      level: e
    }), { logger: s } = Uu({
      opts: r
    });
    return s.error = (...n) => {
      for (const i of n)
        if (i instanceof Error) {
          t(i, ...n);
          return;
        }
      t(void 0, ...n);
    }, s;
  }
}, cD = "rpc.walletconnect.org";
function Pf(t, e) {
  const r = new URL("https://rpc.walletconnect.org/v1/");
  return r.searchParams.set("chainId", t), r.searchParams.set("projectId", e), r.toString();
}
const xl = [
  "near:mainnet",
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  "eip155:1101",
  "eip155:56",
  "eip155:42161",
  "eip155:7777777",
  "eip155:59144",
  "eip155:324",
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  "eip155:5000",
  "solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz",
  "eip155:80084",
  "eip155:5003",
  "eip155:100",
  "eip155:8453",
  "eip155:42220",
  "eip155:1313161555",
  "eip155:17000",
  "eip155:1",
  "eip155:300",
  "eip155:1313161554",
  "eip155:1329",
  "eip155:84532",
  "eip155:421614",
  "eip155:11155111",
  "eip155:8217",
  "eip155:43114",
  "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
  "eip155:999999999",
  "eip155:11155420",
  "eip155:80002",
  "eip155:97",
  "eip155:43113",
  "eip155:137",
  "eip155:10",
  "eip155:1301",
  "bip122:000000000019d6689c085ae165831e93",
  "bip122:000000000933ea01ad0ee984209779ba"
], Bn = {
  extendRpcUrlWithProjectId(t, e) {
    let r = !1;
    try {
      r = new URL(t).host === cD;
    } catch (s) {
      r = !1;
    }
    if (r) {
      const s = new URL(t);
      return s.searchParams.has("projectId") || s.searchParams.set("projectId", e), s.toString();
    }
    return t;
  },
  isCaipNetwork(t) {
    return "chainNamespace" in t && "caipNetworkId" in t;
  },
  getChainNamespace(t) {
    return this.isCaipNetwork(t) ? t.chainNamespace : se.CHAIN.EVM;
  },
  getCaipNetworkId(t) {
    return this.isCaipNetwork(t) ? t.caipNetworkId : `${se.CHAIN.EVM}:${t.id}`;
  },
  getDefaultRpcUrl(t, e, r) {
    var n, i, o;
    const s = (o = (i = (n = t.rpcUrls) == null ? void 0 : n.default) == null ? void 0 : i.http) == null ? void 0 : o[0];
    return xl.includes(e) ? Pf(e, r) : s || "";
  },
  extendCaipNetwork(t, { customNetworkImageUrls: e, projectId: r, customRpcUrls: s }) {
    var p, g, m, f, w;
    const n = this.getChainNamespace(t), i = this.getCaipNetworkId(t), o = (p = t.rpcUrls.default.http) == null ? void 0 : p[0], a = this.getDefaultRpcUrl(t, i, r), c = ((f = (m = (g = t == null ? void 0 : t.rpcUrls) == null ? void 0 : g.chainDefault) == null ? void 0 : m.http) == null ? void 0 : f[0]) || o, l = ((w = s == null ? void 0 : s[i]) == null ? void 0 : w.map((S) => S.url)) || [], u = [...l, a], d = [...l];
    return c && !d.includes(c) && d.push(c), B(C({}, t), {
      chainNamespace: n,
      caipNetworkId: i,
      assets: {
        imageId: tc.NetworkImageIds[t.id],
        imageUrl: e == null ? void 0 : e[t.id]
      },
      rpcUrls: B(C({}, t.rpcUrls), {
        default: {
          http: u
        },
        chainDefault: {
          http: d
        }
      })
    });
  },
  extendCaipNetworks(t, { customNetworkImageUrls: e, projectId: r, customRpcUrls: s }) {
    return t.map((n) => Bn.extendCaipNetwork(n, {
      customNetworkImageUrls: e,
      customRpcUrls: s,
      projectId: r
    }));
  },
  getViemTransport(t, e, r) {
    var n, i, o;
    const s = [];
    return r == null || r.forEach((a) => {
      s.push(Ta(a.url, a.config));
    }), xl.includes(t.caipNetworkId) && s.push(Ta(Pf(t.caipNetworkId, e), {
      fetchOptions: {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    })), (o = (i = (n = t == null ? void 0 : t.rpcUrls) == null ? void 0 : n.default) == null ? void 0 : i.http) == null || o.forEach((a) => {
      s.push(Ta(a));
    }), If(s);
  },
  extendWagmiTransports(t, e, r) {
    if (xl.includes(t.caipNetworkId)) {
      const s = this.getDefaultRpcUrl(t, t.caipNetworkId, e);
      return If([r, Ta(s)]);
    }
    return r;
  },
  getUnsupportedNetwork(t) {
    return {
      id: t.split(":")[1],
      caipNetworkId: t,
      name: se.UNSUPPORTED_NETWORK_NAME,
      chainNamespace: t.split(":")[0],
      nativeCurrency: {
        name: "",
        decimals: 0,
        symbol: ""
      },
      rpcUrls: {
        default: {
          http: []
        }
      }
    };
  },
  getCaipNetworkFromStorage(t) {
    var c;
    const e = re.getActiveCaipNetworkId(), r = R.getAllRequestedCaipNetworks(), s = Array.from(((c = R.state.chains) == null ? void 0 : c.keys()) || []), n = e == null ? void 0 : e.split(":")[0], i = n ? s.includes(n) : !1, o = r == null ? void 0 : r.find((l) => l.caipNetworkId === e);
    return i && !o && e ? this.getUnsupportedNetwork(e) : o || t || (r == null ? void 0 : r[0]);
  }
}, rc = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0,
  cosmos: void 0
}, Mt = Ye({
  providers: C({}, rc),
  providerIds: C({}, rc)
}), Ue = {
  state: Mt,
  subscribeKey(t, e) {
    return Wt(Mt, t, e);
  },
  subscribe(t) {
    return Dt(Mt, () => {
      t(Mt);
    });
  },
  subscribeProviders(t) {
    return Dt(Mt.providers, () => t(Mt.providers));
  },
  setProvider(t, e) {
    e && (Mt.providers[t] = en(e));
  },
  getProvider(t) {
    return Mt.providers[t];
  },
  setProviderId(t, e) {
    e && (Mt.providerIds[t] = e);
  },
  getProviderId(t) {
    if (t)
      return Mt.providerIds[t];
  },
  reset() {
    Mt.providers = C({}, rc), Mt.providerIds = C({}, rc);
  },
  resetChain(t) {
    Mt.providers[t] = void 0, Mt.providerIds[t] = void 0;
  }
}, xf = {
  transactionHash: /^0x(?:[A-Fa-f0-9]{64})$/u,
  signedMessage: /^0x(?:[a-fA-F0-9]{62,})$/u
}, yt = {
  set(t, e) {
    tr.isClient && localStorage.setItem(`${te.STORAGE_KEY}${t}`, e);
  },
  get(t) {
    return tr.isClient ? localStorage.getItem(`${te.STORAGE_KEY}${t}`) : null;
  },
  delete(t, e) {
    tr.isClient && (e ? localStorage.removeItem(t) : localStorage.removeItem(`${te.STORAGE_KEY}${t}`));
  }
}, Ra = 30 * 1e3, tr = {
  checkIfAllowedToTriggerEmail() {
    const t = yt.get(te.LAST_EMAIL_LOGIN_TIME);
    if (t) {
      const e = Date.now() - Number(t);
      if (e < Ra) {
        const r = Math.ceil((Ra - e) / 1e3);
        throw new Error(`Please try again after ${r} seconds`);
      }
    }
  },
  getTimeToNextEmailLogin() {
    const t = yt.get(te.LAST_EMAIL_LOGIN_TIME);
    if (t) {
      const e = Date.now() - Number(t);
      if (e < Ra)
        return Math.ceil((Ra - e) / 1e3);
    }
    return 0;
  },
  checkIfRequestExists(t) {
    return Et.NOT_SAFE_RPC_METHODS.includes(t.method) || Et.SAFE_RPC_METHODS.includes(t.method);
  },
  getResponseType(t) {
    return typeof t == "string" && ((t == null ? void 0 : t.match(xf.transactionHash)) || (t == null ? void 0 : t.match(xf.signedMessage))) ? te.RPC_RESPONSE_TYPE_TX : te.RPC_RESPONSE_TYPE_OBJECT;
  },
  checkIfRequestIsSafe(t) {
    return Et.SAFE_RPC_METHODS.includes(t.method);
  },
  isClient: typeof window != "undefined"
};
var Te;
(function(t) {
  t.assertEqual = (n) => n;
  function e(n) {
  }
  t.assertIs = e;
  function r(n) {
    throw new Error();
  }
  t.assertNever = r, t.arrayToEnum = (n) => {
    const i = {};
    for (const o of n)
      i[o] = o;
    return i;
  }, t.getValidEnumValues = (n) => {
    const i = t.objectKeys(n).filter((a) => typeof n[n[a]] != "number"), o = {};
    for (const a of i)
      o[a] = n[a];
    return t.objectValues(o);
  }, t.objectValues = (n) => t.objectKeys(n).map(function(i) {
    return n[i];
  }), t.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const i = [];
    for (const o in n)
      Object.prototype.hasOwnProperty.call(n, o) && i.push(o);
    return i;
  }, t.find = (n, i) => {
    for (const o of n)
      if (i(o))
        return o;
  }, t.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
  function s(n, i = " | ") {
    return n.map((o) => typeof o == "string" ? `'${o}'` : o).join(i);
  }
  t.joinValues = s, t.jsonStringifyReplacer = (n, i) => typeof i == "bigint" ? i.toString() : i;
})(Te || (Te = {}));
var Nu;
(function(t) {
  t.mergeShapes = (e, r) => C(C({}, e), r);
})(Nu || (Nu = {}));
const J = Te.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), vs = (t) => {
  switch (typeof t) {
    case "undefined":
      return J.undefined;
    case "string":
      return J.string;
    case "number":
      return isNaN(t) ? J.nan : J.number;
    case "boolean":
      return J.boolean;
    case "function":
      return J.function;
    case "bigint":
      return J.bigint;
    case "symbol":
      return J.symbol;
    case "object":
      return Array.isArray(t) ? J.array : t === null ? J.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? J.promise : typeof Map != "undefined" && t instanceof Map ? J.map : typeof Set != "undefined" && t instanceof Set ? J.set : typeof Date != "undefined" && t instanceof Date ? J.date : J.object;
    default:
      return J.unknown;
  }
}, z = Te.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), lD = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
class Nr extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (s) => {
      this.issues = [...this.issues, s];
    }, this.addIssues = (s = []) => {
      this.issues = [...this.issues, ...s];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const r = e || function(i) {
      return i.message;
    }, s = { _errors: [] }, n = (i) => {
      for (const o of i.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(n);
        else if (o.code === "invalid_return_type")
          n(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          n(o.argumentsError);
        else if (o.path.length === 0)
          s._errors.push(r(o));
        else {
          let a = s, c = 0;
          for (; c < o.path.length; ) {
            const l = o.path[c];
            c === o.path.length - 1 ? (a[l] = a[l] || { _errors: [] }, a[l]._errors.push(r(o))) : a[l] = a[l] || { _errors: [] }, a = a[l], c++;
          }
        }
    };
    return n(this), s;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, Te.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (r) => r.message) {
    const r = {}, s = [];
    for (const n of this.issues)
      n.path.length > 0 ? (r[n.path[0]] = r[n.path[0]] || [], r[n.path[0]].push(e(n))) : s.push(e(n));
    return { formErrors: s, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
Nr.create = (t) => new Nr(t);
const To = (t, e) => {
  let r;
  switch (t.code) {
    case z.invalid_type:
      t.received === J.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
      break;
    case z.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, Te.jsonStringifyReplacer)}`;
      break;
    case z.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${Te.joinValues(t.keys, ", ")}`;
      break;
    case z.invalid_union:
      r = "Invalid input";
      break;
    case z.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${Te.joinValues(t.options)}`;
      break;
    case z.invalid_enum_value:
      r = `Invalid enum value. Expected ${Te.joinValues(t.options)}, received '${t.received}'`;
      break;
    case z.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case z.invalid_return_type:
      r = "Invalid function return type";
      break;
    case z.invalid_date:
      r = "Invalid date";
      break;
    case z.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : Te.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
      break;
    case z.too_small:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
      break;
    case z.too_big:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
      break;
    case z.custom:
      r = "Invalid input";
      break;
    case z.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case z.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case z.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, Te.assertNever(t);
  }
  return { message: r };
};
let Mw = To;
function uD(t) {
  Mw = t;
}
function sc() {
  return Mw;
}
const nc = (t) => {
  const { data: e, path: r, errorMaps: s, issueData: n } = t, i = [...r, ...n.path || []], o = B(C({}, n), {
    path: i
  });
  let a = "";
  const c = s.filter((l) => !!l).slice().reverse();
  for (const l of c)
    a = l(o, { data: e, defaultError: a }).message;
  return B(C({}, n), {
    path: i,
    message: n.message || a
  });
}, dD = [];
function ee(t, e) {
  const r = nc({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      t.schemaErrorMap,
      sc(),
      To
      // then global default map
    ].filter((s) => !!s)
  });
  t.common.issues.push(r);
}
class Tt {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, r) {
    const s = [];
    for (const n of r) {
      if (n.status === "aborted")
        return fe;
      n.status === "dirty" && e.dirty(), s.push(n.value);
    }
    return { status: e.value, value: s };
  }
  static mergeObjectAsync(e, r) {
    return h(this, null, function* () {
      const s = [];
      for (const n of r)
        s.push({
          key: yield n.key,
          value: yield n.value
        });
      return Tt.mergeObjectSync(e, s);
    });
  }
  static mergeObjectSync(e, r) {
    const s = {};
    for (const n of r) {
      const { key: i, value: o } = n;
      if (i.status === "aborted" || o.status === "aborted")
        return fe;
      i.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), i.value !== "__proto__" && (typeof o.value != "undefined" || n.alwaysSet) && (s[i.value] = o.value);
    }
    return { status: e.value, value: s };
  }
}
const fe = Object.freeze({
  status: "aborted"
}), Fw = (t) => ({ status: "dirty", value: t }), kt = (t) => ({ status: "valid", value: t }), Tu = (t) => t.status === "aborted", Ou = (t) => t.status === "dirty", Oo = (t) => t.status === "valid", ic = (t) => typeof Promise != "undefined" && t instanceof Promise;
var oe;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(oe || (oe = {}));
class Wr {
  constructor(e, r, s, n) {
    this._cachedPath = [], this.parent = e, this.data = r, this._path = s, this._key = n;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Df = (t, e) => {
  if (Oo(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new Nr(t.common.issues);
      return this._error = r, this._error;
    }
  };
};
function ye(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: r, required_error: s, description: n } = t;
  if (e && (r || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: n } : { errorMap: (o, a) => o.code !== "invalid_type" ? { message: a.defaultError } : typeof a.data == "undefined" ? { message: s != null ? s : a.defaultError } : { message: r != null ? r : a.defaultError }, description: n };
}
class Ee {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return vs(e.data);
  }
  _getOrReturnCtx(e, r) {
    return r || {
      common: e.parent.common,
      data: e.data,
      parsedType: vs(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new Tt(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: vs(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (ic(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(e) {
    const r = this._parse(e);
    return Promise.resolve(r);
  }
  parse(e, r) {
    const s = this.safeParse(e, r);
    if (s.success)
      return s.data;
    throw s.error;
  }
  safeParse(e, r) {
    var s;
    const n = {
      common: {
        issues: [],
        async: (s = r == null ? void 0 : r.async) !== null && s !== void 0 ? s : !1,
        contextualErrorMap: r == null ? void 0 : r.errorMap
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: vs(e)
    }, i = this._parseSync({ data: e, path: n.path, parent: n });
    return Df(n, i);
  }
  parseAsync(e, r) {
    return h(this, null, function* () {
      const s = yield this.safeParseAsync(e, r);
      if (s.success)
        return s.data;
      throw s.error;
    });
  }
  safeParseAsync(e, r) {
    return h(this, null, function* () {
      const s = {
        common: {
          issues: [],
          contextualErrorMap: r == null ? void 0 : r.errorMap,
          async: !0
        },
        path: (r == null ? void 0 : r.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: vs(e)
      }, n = this._parse({ data: e, path: s.path, parent: s }), i = yield ic(n) ? n : Promise.resolve(n);
      return Df(s, i);
    });
  }
  refine(e, r) {
    const s = (n) => typeof r == "string" || typeof r == "undefined" ? { message: r } : typeof r == "function" ? r(n) : r;
    return this._refinement((n, i) => {
      const o = e(n), a = () => i.addIssue(C({
        code: z.custom
      }, s(n)));
      return typeof Promise != "undefined" && o instanceof Promise ? o.then((c) => c ? !0 : (a(), !1)) : o ? !0 : (a(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((s, n) => e(s) ? !0 : (n.addIssue(typeof r == "function" ? r(s, n) : r), !1));
  }
  _refinement(e) {
    return new Or({
      schema: this,
      typeName: ue.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return as.create(this, this._def);
  }
  nullable() {
    return ln.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Tr.create(this, this._def);
  }
  promise() {
    return oi.create(this, this._def);
  }
  or(e) {
    return Do.create([this, e], this._def);
  }
  and(e) {
    return ko.create(this, e, this._def);
  }
  transform(e) {
    return new Or(B(C({}, ye(this._def)), {
      schema: this,
      typeName: ue.ZodEffects,
      effect: { type: "transform", transform: e }
    }));
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new Fo(B(C({}, ye(this._def)), {
      innerType: this,
      defaultValue: r,
      typeName: ue.ZodDefault
    }));
  }
  brand() {
    return new jw(C({
      typeName: ue.ZodBranded,
      type: this
    }, ye(this._def)));
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new lc(B(C({}, ye(this._def)), {
      innerType: this,
      catchValue: r,
      typeName: ue.ZodCatch
    }));
  }
  describe(e) {
    const r = this.constructor;
    return new r(B(C({}, this._def), {
      description: e
    }));
  }
  pipe(e) {
    return na.create(this, e);
  }
  readonly() {
    return dc.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const hD = /^c[^\s-]{8,}$/i, pD = /^[a-z][a-z0-9]*$/, fD = /^[0-9A-HJKMNP-TV-Z]{26}$/, gD = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, mD = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, wD = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Dl;
const yD = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, bD = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, vD = (t) => t.precision ? t.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}Z$`) : t.precision === 0 ? t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function ED(t, e) {
  return !!((e === "v4" || !e) && yD.test(t) || (e === "v6" || !e) && bD.test(t));
}
class Ir extends Ee {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== J.string) {
      const i = this._getOrReturnCtx(e);
      return ee(
        i,
        {
          code: z.invalid_type,
          expected: J.string,
          received: i.parsedType
        }
        //
      ), fe;
    }
    const s = new Tt();
    let n;
    for (const i of this._def.checks)
      if (i.kind === "min")
        e.data.length < i.value && (n = this._getOrReturnCtx(e, n), ee(n, {
          code: z.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), s.dirty());
      else if (i.kind === "max")
        e.data.length > i.value && (n = this._getOrReturnCtx(e, n), ee(n, {
          code: z.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), s.dirty());
      else if (i.kind === "length") {
        const o = e.data.length > i.value, a = e.data.length < i.value;
        (o || a) && (n = this._getOrReturnCtx(e, n), o ? ee(n, {
          code: z.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }) : a && ee(n, {
          code: z.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }), s.dirty());
      } else if (i.kind === "email")
        mD.test(e.data) || (n = this._getOrReturnCtx(e, n), ee(n, {
          validation: "email",
          code: z.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "emoji")
        Dl || (Dl = new RegExp(wD, "u")), Dl.test(e.data) || (n = this._getOrReturnCtx(e, n), ee(n, {
          validation: "emoji",
          code: z.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "uuid")
        gD.test(e.data) || (n = this._getOrReturnCtx(e, n), ee(n, {
          validation: "uuid",
          code: z.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "cuid")
        hD.test(e.data) || (n = this._getOrReturnCtx(e, n), ee(n, {
          validation: "cuid",
          code: z.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "cuid2")
        pD.test(e.data) || (n = this._getOrReturnCtx(e, n), ee(n, {
          validation: "cuid2",
          code: z.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "ulid")
        fD.test(e.data) || (n = this._getOrReturnCtx(e, n), ee(n, {
          validation: "ulid",
          code: z.invalid_string,
          message: i.message
        }), s.dirty());
      else if (i.kind === "url")
        try {
          new URL(e.data);
        } catch (o) {
          n = this._getOrReturnCtx(e, n), ee(n, {
            validation: "url",
            code: z.invalid_string,
            message: i.message
          }), s.dirty();
        }
      else i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), ee(n, {
        validation: "regex",
        code: z.invalid_string,
        message: i.message
      }), s.dirty())) : i.kind === "trim" ? e.data = e.data.trim() : i.kind === "includes" ? e.data.includes(i.value, i.position) || (n = this._getOrReturnCtx(e, n), ee(n, {
        code: z.invalid_string,
        validation: { includes: i.value, position: i.position },
        message: i.message
      }), s.dirty()) : i.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : i.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : i.kind === "startsWith" ? e.data.startsWith(i.value) || (n = this._getOrReturnCtx(e, n), ee(n, {
        code: z.invalid_string,
        validation: { startsWith: i.value },
        message: i.message
      }), s.dirty()) : i.kind === "endsWith" ? e.data.endsWith(i.value) || (n = this._getOrReturnCtx(e, n), ee(n, {
        code: z.invalid_string,
        validation: { endsWith: i.value },
        message: i.message
      }), s.dirty()) : i.kind === "datetime" ? vD(i).test(e.data) || (n = this._getOrReturnCtx(e, n), ee(n, {
        code: z.invalid_string,
        validation: "datetime",
        message: i.message
      }), s.dirty()) : i.kind === "ip" ? ED(e.data, i.version) || (n = this._getOrReturnCtx(e, n), ee(n, {
        validation: "ip",
        code: z.invalid_string,
        message: i.message
      }), s.dirty()) : Te.assertNever(i);
    return { status: s.value, value: e.data };
  }
  _regex(e, r, s) {
    return this.refinement((n) => e.test(n), C({
      validation: r,
      code: z.invalid_string
    }, oe.errToObj(s)));
  }
  _addCheck(e) {
    return new Ir(B(C({}, this._def), {
      checks: [...this._def.checks, e]
    }));
  }
  email(e) {
    return this._addCheck(C({ kind: "email" }, oe.errToObj(e)));
  }
  url(e) {
    return this._addCheck(C({ kind: "url" }, oe.errToObj(e)));
  }
  emoji(e) {
    return this._addCheck(C({ kind: "emoji" }, oe.errToObj(e)));
  }
  uuid(e) {
    return this._addCheck(C({ kind: "uuid" }, oe.errToObj(e)));
  }
  cuid(e) {
    return this._addCheck(C({ kind: "cuid" }, oe.errToObj(e)));
  }
  cuid2(e) {
    return this._addCheck(C({ kind: "cuid2" }, oe.errToObj(e)));
  }
  ulid(e) {
    return this._addCheck(C({ kind: "ulid" }, oe.errToObj(e)));
  }
  ip(e) {
    return this._addCheck(C({ kind: "ip" }, oe.errToObj(e)));
  }
  datetime(e) {
    var r;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: e
    }) : this._addCheck(C({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) == "undefined" ? null : e == null ? void 0 : e.precision,
      offset: (r = e == null ? void 0 : e.offset) !== null && r !== void 0 ? r : !1
    }, oe.errToObj(e == null ? void 0 : e.message)));
  }
  regex(e, r) {
    return this._addCheck(C({
      kind: "regex",
      regex: e
    }, oe.errToObj(r)));
  }
  includes(e, r) {
    return this._addCheck(C({
      kind: "includes",
      value: e,
      position: r == null ? void 0 : r.position
    }, oe.errToObj(r == null ? void 0 : r.message)));
  }
  startsWith(e, r) {
    return this._addCheck(C({
      kind: "startsWith",
      value: e
    }, oe.errToObj(r)));
  }
  endsWith(e, r) {
    return this._addCheck(C({
      kind: "endsWith",
      value: e
    }, oe.errToObj(r)));
  }
  min(e, r) {
    return this._addCheck(C({
      kind: "min",
      value: e
    }, oe.errToObj(r)));
  }
  max(e, r) {
    return this._addCheck(C({
      kind: "max",
      value: e
    }, oe.errToObj(r)));
  }
  length(e, r) {
    return this._addCheck(C({
      kind: "length",
      value: e
    }, oe.errToObj(r)));
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(e) {
    return this.min(1, oe.errToObj(e));
  }
  trim() {
    return new Ir(B(C({}, this._def), {
      checks: [...this._def.checks, { kind: "trim" }]
    }));
  }
  toLowerCase() {
    return new Ir(B(C({}, this._def), {
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    }));
  }
  toUpperCase() {
    return new Ir(B(C({}, this._def), {
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    }));
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get minLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
Ir.create = (t) => {
  var e;
  return new Ir(C({
    checks: [],
    typeName: ue.ZodString,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1
  }, ye(t)));
};
function _D(t, e) {
  const r = (t.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, n = r > s ? r : s, i = parseInt(t.toFixed(n).replace(".", "")), o = parseInt(e.toFixed(n).replace(".", ""));
  return i % o / Math.pow(10, n);
}
class Os extends Ee {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== J.number) {
      const i = this._getOrReturnCtx(e);
      return ee(i, {
        code: z.invalid_type,
        expected: J.number,
        received: i.parsedType
      }), fe;
    }
    let s;
    const n = new Tt();
    for (const i of this._def.checks)
      i.kind === "int" ? Te.isInteger(e.data) || (s = this._getOrReturnCtx(e, s), ee(s, {
        code: z.invalid_type,
        expected: "integer",
        received: "float",
        message: i.message
      }), n.dirty()) : i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (s = this._getOrReturnCtx(e, s), ee(s, {
        code: z.too_small,
        minimum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), n.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (s = this._getOrReturnCtx(e, s), ee(s, {
        code: z.too_big,
        maximum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), n.dirty()) : i.kind === "multipleOf" ? _D(e.data, i.value) !== 0 && (s = this._getOrReturnCtx(e, s), ee(s, {
        code: z.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), n.dirty()) : i.kind === "finite" ? Number.isFinite(e.data) || (s = this._getOrReturnCtx(e, s), ee(s, {
        code: z.not_finite,
        message: i.message
      }), n.dirty()) : Te.assertNever(i);
    return { status: n.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, oe.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, oe.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, oe.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, oe.toString(r));
  }
  setLimit(e, r, s, n) {
    return new Os(B(C({}, this._def), {
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: s,
          message: oe.toString(n)
        }
      ]
    }));
  }
  _addCheck(e) {
    return new Os(B(C({}, this._def), {
      checks: [...this._def.checks, e]
    }));
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: oe.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: oe.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: oe.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: oe.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: oe.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: oe.toString(r)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: oe.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: oe.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: oe.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && Te.isInteger(e.value));
  }
  get isFinite() {
    let e = null, r = null;
    for (const s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
        return !0;
      s.kind === "min" ? (r === null || s.value > r) && (r = s.value) : s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(r) && Number.isFinite(e);
  }
}
Os.create = (t) => new Os(C({
  checks: [],
  typeName: ue.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1
}, ye(t)));
class Rs extends Ee {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== J.bigint) {
      const i = this._getOrReturnCtx(e);
      return ee(i, {
        code: z.invalid_type,
        expected: J.bigint,
        received: i.parsedType
      }), fe;
    }
    let s;
    const n = new Tt();
    for (const i of this._def.checks)
      i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (s = this._getOrReturnCtx(e, s), ee(s, {
        code: z.too_small,
        type: "bigint",
        minimum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), n.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (s = this._getOrReturnCtx(e, s), ee(s, {
        code: z.too_big,
        type: "bigint",
        maximum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), n.dirty()) : i.kind === "multipleOf" ? e.data % i.value !== BigInt(0) && (s = this._getOrReturnCtx(e, s), ee(s, {
        code: z.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), n.dirty()) : Te.assertNever(i);
    return { status: n.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, oe.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, oe.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, oe.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, oe.toString(r));
  }
  setLimit(e, r, s, n) {
    return new Rs(B(C({}, this._def), {
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: s,
          message: oe.toString(n)
        }
      ]
    }));
  }
  _addCheck(e) {
    return new Rs(B(C({}, this._def), {
      checks: [...this._def.checks, e]
    }));
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: oe.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: oe.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: oe.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: oe.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: oe.toString(r)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
Rs.create = (t) => {
  var e;
  return new Rs(C({
    checks: [],
    typeName: ue.ZodBigInt,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1
  }, ye(t)));
};
class Ro extends Ee {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== J.boolean) {
      const s = this._getOrReturnCtx(e);
      return ee(s, {
        code: z.invalid_type,
        expected: J.boolean,
        received: s.parsedType
      }), fe;
    }
    return kt(e.data);
  }
}
Ro.create = (t) => new Ro(C({
  typeName: ue.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1
}, ye(t)));
class an extends Ee {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== J.date) {
      const i = this._getOrReturnCtx(e);
      return ee(i, {
        code: z.invalid_type,
        expected: J.date,
        received: i.parsedType
      }), fe;
    }
    if (isNaN(e.data.getTime())) {
      const i = this._getOrReturnCtx(e);
      return ee(i, {
        code: z.invalid_date
      }), fe;
    }
    const s = new Tt();
    let n;
    for (const i of this._def.checks)
      i.kind === "min" ? e.data.getTime() < i.value && (n = this._getOrReturnCtx(e, n), ee(n, {
        code: z.too_small,
        message: i.message,
        inclusive: !0,
        exact: !1,
        minimum: i.value,
        type: "date"
      }), s.dirty()) : i.kind === "max" ? e.data.getTime() > i.value && (n = this._getOrReturnCtx(e, n), ee(n, {
        code: z.too_big,
        message: i.message,
        inclusive: !0,
        exact: !1,
        maximum: i.value,
        type: "date"
      }), s.dirty()) : Te.assertNever(i);
    return {
      status: s.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new an(B(C({}, this._def), {
      checks: [...this._def.checks, e]
    }));
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: oe.toString(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: oe.toString(r)
    });
  }
  get minDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
}
an.create = (t) => new an(C({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: ue.ZodDate
}, ye(t)));
class oc extends Ee {
  _parse(e) {
    if (this._getType(e) !== J.symbol) {
      const s = this._getOrReturnCtx(e);
      return ee(s, {
        code: z.invalid_type,
        expected: J.symbol,
        received: s.parsedType
      }), fe;
    }
    return kt(e.data);
  }
}
oc.create = (t) => new oc(C({
  typeName: ue.ZodSymbol
}, ye(t)));
class Po extends Ee {
  _parse(e) {
    if (this._getType(e) !== J.undefined) {
      const s = this._getOrReturnCtx(e);
      return ee(s, {
        code: z.invalid_type,
        expected: J.undefined,
        received: s.parsedType
      }), fe;
    }
    return kt(e.data);
  }
}
Po.create = (t) => new Po(C({
  typeName: ue.ZodUndefined
}, ye(t)));
class xo extends Ee {
  _parse(e) {
    if (this._getType(e) !== J.null) {
      const s = this._getOrReturnCtx(e);
      return ee(s, {
        code: z.invalid_type,
        expected: J.null,
        received: s.parsedType
      }), fe;
    }
    return kt(e.data);
  }
}
xo.create = (t) => new xo(C({
  typeName: ue.ZodNull
}, ye(t)));
class ii extends Ee {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return kt(e.data);
  }
}
ii.create = (t) => new ii(C({
  typeName: ue.ZodAny
}, ye(t)));
class Xs extends Ee {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return kt(e.data);
  }
}
Xs.create = (t) => new Xs(C({
  typeName: ue.ZodUnknown
}, ye(t)));
class ls extends Ee {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return ee(r, {
      code: z.invalid_type,
      expected: J.never,
      received: r.parsedType
    }), fe;
  }
}
ls.create = (t) => new ls(C({
  typeName: ue.ZodNever
}, ye(t)));
class ac extends Ee {
  _parse(e) {
    if (this._getType(e) !== J.undefined) {
      const s = this._getOrReturnCtx(e);
      return ee(s, {
        code: z.invalid_type,
        expected: J.void,
        received: s.parsedType
      }), fe;
    }
    return kt(e.data);
  }
}
ac.create = (t) => new ac(C({
  typeName: ue.ZodVoid
}, ye(t)));
class Tr extends Ee {
  _parse(e) {
    const { ctx: r, status: s } = this._processInputParams(e), n = this._def;
    if (r.parsedType !== J.array)
      return ee(r, {
        code: z.invalid_type,
        expected: J.array,
        received: r.parsedType
      }), fe;
    if (n.exactLength !== null) {
      const o = r.data.length > n.exactLength.value, a = r.data.length < n.exactLength.value;
      (o || a) && (ee(r, {
        code: o ? z.too_big : z.too_small,
        minimum: a ? n.exactLength.value : void 0,
        maximum: o ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message
      }), s.dirty());
    }
    if (n.minLength !== null && r.data.length < n.minLength.value && (ee(r, {
      code: z.too_small,
      minimum: n.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.minLength.message
    }), s.dirty()), n.maxLength !== null && r.data.length > n.maxLength.value && (ee(r, {
      code: z.too_big,
      maximum: n.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.maxLength.message
    }), s.dirty()), r.common.async)
      return Promise.all([...r.data].map((o, a) => n.type._parseAsync(new Wr(r, o, r.path, a)))).then((o) => Tt.mergeArray(s, o));
    const i = [...r.data].map((o, a) => n.type._parseSync(new Wr(r, o, r.path, a)));
    return Tt.mergeArray(s, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new Tr(B(C({}, this._def), {
      minLength: { value: e, message: oe.toString(r) }
    }));
  }
  max(e, r) {
    return new Tr(B(C({}, this._def), {
      maxLength: { value: e, message: oe.toString(r) }
    }));
  }
  length(e, r) {
    return new Tr(B(C({}, this._def), {
      exactLength: { value: e, message: oe.toString(r) }
    }));
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Tr.create = (t, e) => new Tr(C({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: ue.ZodArray
}, ye(e)));
function jn(t) {
  if (t instanceof Ge) {
    const e = {};
    for (const r in t.shape) {
      const s = t.shape[r];
      e[r] = as.create(jn(s));
    }
    return new Ge(B(C({}, t._def), {
      shape: () => e
    }));
  } else return t instanceof Tr ? new Tr(B(C({}, t._def), {
    type: jn(t.element)
  })) : t instanceof as ? as.create(jn(t.unwrap())) : t instanceof ln ? ln.create(jn(t.unwrap())) : t instanceof Hr ? Hr.create(t.items.map((e) => jn(e))) : t;
}
class Ge extends Ee {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), r = Te.objectKeys(e);
    return this._cached = { shape: e, keys: r };
  }
  _parse(e) {
    if (this._getType(e) !== J.object) {
      const l = this._getOrReturnCtx(e);
      return ee(l, {
        code: z.invalid_type,
        expected: J.object,
        received: l.parsedType
      }), fe;
    }
    const { status: s, ctx: n } = this._processInputParams(e), { shape: i, keys: o } = this._getCached(), a = [];
    if (!(this._def.catchall instanceof ls && this._def.unknownKeys === "strip"))
      for (const l in n.data)
        o.includes(l) || a.push(l);
    const c = [];
    for (const l of o) {
      const u = i[l], d = n.data[l];
      c.push({
        key: { status: "valid", value: l },
        value: u._parse(new Wr(n, d, n.path, l)),
        alwaysSet: l in n.data
      });
    }
    if (this._def.catchall instanceof ls) {
      const l = this._def.unknownKeys;
      if (l === "passthrough")
        for (const u of a)
          c.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: n.data[u] }
          });
      else if (l === "strict")
        a.length > 0 && (ee(n, {
          code: z.unrecognized_keys,
          keys: a
        }), s.dirty());
      else if (l !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const l = this._def.catchall;
      for (const u of a) {
        const d = n.data[u];
        c.push({
          key: { status: "valid", value: u },
          value: l._parse(
            new Wr(n, d, n.path, u)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: u in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(() => h(this, null, function* () {
      const l = [];
      for (const u of c) {
        const d = yield u.key;
        l.push({
          key: d,
          value: yield u.value,
          alwaysSet: u.alwaysSet
        });
      }
      return l;
    })).then((l) => Tt.mergeObjectSync(s, l)) : Tt.mergeObjectSync(s, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return oe.errToObj, new Ge(C(B(C({}, this._def), {
      unknownKeys: "strict"
    }), e !== void 0 ? {
      errorMap: (r, s) => {
        var n, i, o, a;
        const c = (o = (i = (n = this._def).errorMap) === null || i === void 0 ? void 0 : i.call(n, r, s).message) !== null && o !== void 0 ? o : s.defaultError;
        return r.code === "unrecognized_keys" ? {
          message: (a = oe.errToObj(e).message) !== null && a !== void 0 ? a : c
        } : {
          message: c
        };
      }
    } : {}));
  }
  strip() {
    return new Ge(B(C({}, this._def), {
      unknownKeys: "strip"
    }));
  }
  passthrough() {
    return new Ge(B(C({}, this._def), {
      unknownKeys: "passthrough"
    }));
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new Ge(B(C({}, this._def), {
      shape: () => C(C({}, this._def.shape()), e)
    }));
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new Ge({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => C(C({}, this._def.shape()), e._def.shape()),
      typeName: ue.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, r) {
    return this.augment({ [e]: r });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new Ge(B(C({}, this._def), {
      catchall: e
    }));
  }
  pick(e) {
    const r = {};
    return Te.objectKeys(e).forEach((s) => {
      e[s] && this.shape[s] && (r[s] = this.shape[s]);
    }), new Ge(B(C({}, this._def), {
      shape: () => r
    }));
  }
  omit(e) {
    const r = {};
    return Te.objectKeys(this.shape).forEach((s) => {
      e[s] || (r[s] = this.shape[s]);
    }), new Ge(B(C({}, this._def), {
      shape: () => r
    }));
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return jn(this);
  }
  partial(e) {
    const r = {};
    return Te.objectKeys(this.shape).forEach((s) => {
      const n = this.shape[s];
      e && !e[s] ? r[s] = n : r[s] = n.optional();
    }), new Ge(B(C({}, this._def), {
      shape: () => r
    }));
  }
  required(e) {
    const r = {};
    return Te.objectKeys(this.shape).forEach((s) => {
      if (e && !e[s])
        r[s] = this.shape[s];
      else {
        let i = this.shape[s];
        for (; i instanceof as; )
          i = i._def.innerType;
        r[s] = i;
      }
    }), new Ge(B(C({}, this._def), {
      shape: () => r
    }));
  }
  keyof() {
    return Bw(Te.objectKeys(this.shape));
  }
}
Ge.create = (t, e) => new Ge(C({
  shape: () => t,
  unknownKeys: "strip",
  catchall: ls.create(),
  typeName: ue.ZodObject
}, ye(e)));
Ge.strictCreate = (t, e) => new Ge(C({
  shape: () => t,
  unknownKeys: "strict",
  catchall: ls.create(),
  typeName: ue.ZodObject
}, ye(e)));
Ge.lazycreate = (t, e) => new Ge(C({
  shape: t,
  unknownKeys: "strip",
  catchall: ls.create(),
  typeName: ue.ZodObject
}, ye(e)));
class Do extends Ee {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = this._def.options;
    function n(i) {
      for (const a of i)
        if (a.result.status === "valid")
          return a.result;
      for (const a of i)
        if (a.result.status === "dirty")
          return r.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((a) => new Nr(a.ctx.common.issues));
      return ee(r, {
        code: z.invalid_union,
        unionErrors: o
      }), fe;
    }
    if (r.common.async)
      return Promise.all(s.map((i) => h(this, null, function* () {
        const o = B(C({}, r), {
          common: B(C({}, r.common), {
            issues: []
          }),
          parent: null
        });
        return {
          result: yield i._parseAsync({
            data: r.data,
            path: r.path,
            parent: o
          }),
          ctx: o
        };
      }))).then(n);
    {
      let i;
      const o = [];
      for (const c of s) {
        const l = B(C({}, r), {
          common: B(C({}, r.common), {
            issues: []
          }),
          parent: null
        }), u = c._parseSync({
          data: r.data,
          path: r.path,
          parent: l
        });
        if (u.status === "valid")
          return u;
        u.status === "dirty" && !i && (i = { result: u, ctx: l }), l.common.issues.length && o.push(l.common.issues);
      }
      if (i)
        return r.common.issues.push(...i.ctx.common.issues), i.result;
      const a = o.map((c) => new Nr(c));
      return ee(r, {
        code: z.invalid_union,
        unionErrors: a
      }), fe;
    }
  }
  get options() {
    return this._def.options;
  }
}
Do.create = (t, e) => new Do(C({
  options: t,
  typeName: ue.ZodUnion
}, ye(e)));
const Ba = (t) => t instanceof Uo ? Ba(t.schema) : t instanceof Or ? Ba(t.innerType()) : t instanceof Lo ? [t.value] : t instanceof Ps ? t.options : t instanceof Mo ? Object.keys(t.enum) : t instanceof Fo ? Ba(t._def.innerType) : t instanceof Po ? [void 0] : t instanceof xo ? [null] : null;
class Dc extends Ee {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== J.object)
      return ee(r, {
        code: z.invalid_type,
        expected: J.object,
        received: r.parsedType
      }), fe;
    const s = this.discriminator, n = r.data[s], i = this.optionsMap.get(n);
    return i ? r.common.async ? i._parseAsync({
      data: r.data,
      path: r.path,
      parent: r
    }) : i._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }) : (ee(r, {
      code: z.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [s]
    }), fe);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, r, s) {
    const n = /* @__PURE__ */ new Map();
    for (const i of r) {
      const o = Ba(i.shape[e]);
      if (!o)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const a of o) {
        if (n.has(a))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);
        n.set(a, i);
      }
    }
    return new Dc(C({
      typeName: ue.ZodDiscriminatedUnion,
      discriminator: e,
      options: r,
      optionsMap: n
    }, ye(s)));
  }
}
function Ru(t, e) {
  const r = vs(t), s = vs(e);
  if (t === e)
    return { valid: !0, data: t };
  if (r === J.object && s === J.object) {
    const n = Te.objectKeys(e), i = Te.objectKeys(t).filter((a) => n.indexOf(a) !== -1), o = C(C({}, t), e);
    for (const a of i) {
      const c = Ru(t[a], e[a]);
      if (!c.valid)
        return { valid: !1 };
      o[a] = c.data;
    }
    return { valid: !0, data: o };
  } else if (r === J.array && s === J.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const n = [];
    for (let i = 0; i < t.length; i++) {
      const o = t[i], a = e[i], c = Ru(o, a);
      if (!c.valid)
        return { valid: !1 };
      n.push(c.data);
    }
    return { valid: !0, data: n };
  } else return r === J.date && s === J.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class ko extends Ee {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e), n = (i, o) => {
      if (Tu(i) || Tu(o))
        return fe;
      const a = Ru(i.value, o.value);
      return a.valid ? ((Ou(i) || Ou(o)) && r.dirty(), { status: r.value, value: a.data }) : (ee(s, {
        code: z.invalid_intersection_types
      }), fe);
    };
    return s.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      }),
      this._def.right._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      })
    ]).then(([i, o]) => n(i, o)) : n(this._def.left._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }), this._def.right._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }));
  }
}
ko.create = (t, e, r) => new ko(C({
  left: t,
  right: e,
  typeName: ue.ZodIntersection
}, ye(r)));
class Hr extends Ee {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== J.array)
      return ee(s, {
        code: z.invalid_type,
        expected: J.array,
        received: s.parsedType
      }), fe;
    if (s.data.length < this._def.items.length)
      return ee(s, {
        code: z.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), fe;
    !this._def.rest && s.data.length > this._def.items.length && (ee(s, {
      code: z.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const i = [...s.data].map((o, a) => {
      const c = this._def.items[a] || this._def.rest;
      return c ? c._parse(new Wr(s, o, s.path, a)) : null;
    }).filter((o) => !!o);
    return s.common.async ? Promise.all(i).then((o) => Tt.mergeArray(r, o)) : Tt.mergeArray(r, i);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Hr(B(C({}, this._def), {
      rest: e
    }));
  }
}
Hr.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Hr(C({
    items: t,
    typeName: ue.ZodTuple,
    rest: null
  }, ye(e)));
};
class $o extends Ee {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== J.object)
      return ee(s, {
        code: z.invalid_type,
        expected: J.object,
        received: s.parsedType
      }), fe;
    const n = [], i = this._def.keyType, o = this._def.valueType;
    for (const a in s.data)
      n.push({
        key: i._parse(new Wr(s, a, s.path, a)),
        value: o._parse(new Wr(s, s.data[a], s.path, a))
      });
    return s.common.async ? Tt.mergeObjectAsync(r, n) : Tt.mergeObjectSync(r, n);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, s) {
    return r instanceof Ee ? new $o(C({
      keyType: e,
      valueType: r,
      typeName: ue.ZodRecord
    }, ye(s))) : new $o(C({
      keyType: Ir.create(),
      valueType: e,
      typeName: ue.ZodRecord
    }, ye(r)));
  }
}
class cc extends Ee {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== J.map)
      return ee(s, {
        code: z.invalid_type,
        expected: J.map,
        received: s.parsedType
      }), fe;
    const n = this._def.keyType, i = this._def.valueType, o = [...s.data.entries()].map(([a, c], l) => ({
      key: n._parse(new Wr(s, a, s.path, [l, "key"])),
      value: i._parse(new Wr(s, c, s.path, [l, "value"]))
    }));
    if (s.common.async) {
      const a = /* @__PURE__ */ new Map();
      return Promise.resolve().then(() => h(this, null, function* () {
        for (const c of o) {
          const l = yield c.key, u = yield c.value;
          if (l.status === "aborted" || u.status === "aborted")
            return fe;
          (l.status === "dirty" || u.status === "dirty") && r.dirty(), a.set(l.value, u.value);
        }
        return { status: r.value, value: a };
      }));
    } else {
      const a = /* @__PURE__ */ new Map();
      for (const c of o) {
        const l = c.key, u = c.value;
        if (l.status === "aborted" || u.status === "aborted")
          return fe;
        (l.status === "dirty" || u.status === "dirty") && r.dirty(), a.set(l.value, u.value);
      }
      return { status: r.value, value: a };
    }
  }
}
cc.create = (t, e, r) => new cc(C({
  valueType: e,
  keyType: t,
  typeName: ue.ZodMap
}, ye(r)));
class cn extends Ee {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== J.set)
      return ee(s, {
        code: z.invalid_type,
        expected: J.set,
        received: s.parsedType
      }), fe;
    const n = this._def;
    n.minSize !== null && s.data.size < n.minSize.value && (ee(s, {
      code: z.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message
    }), r.dirty()), n.maxSize !== null && s.data.size > n.maxSize.value && (ee(s, {
      code: z.too_big,
      maximum: n.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.maxSize.message
    }), r.dirty());
    const i = this._def.valueType;
    function o(c) {
      const l = /* @__PURE__ */ new Set();
      for (const u of c) {
        if (u.status === "aborted")
          return fe;
        u.status === "dirty" && r.dirty(), l.add(u.value);
      }
      return { status: r.value, value: l };
    }
    const a = [...s.data.values()].map((c, l) => i._parse(new Wr(s, c, s.path, l)));
    return s.common.async ? Promise.all(a).then((c) => o(c)) : o(a);
  }
  min(e, r) {
    return new cn(B(C({}, this._def), {
      minSize: { value: e, message: oe.toString(r) }
    }));
  }
  max(e, r) {
    return new cn(B(C({}, this._def), {
      maxSize: { value: e, message: oe.toString(r) }
    }));
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
cn.create = (t, e) => new cn(C({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: ue.ZodSet
}, ye(e)));
class Vn extends Ee {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== J.function)
      return ee(r, {
        code: z.invalid_type,
        expected: J.function,
        received: r.parsedType
      }), fe;
    function s(a, c) {
      return nc({
        data: a,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          sc(),
          To
        ].filter((l) => !!l),
        issueData: {
          code: z.invalid_arguments,
          argumentsError: c
        }
      });
    }
    function n(a, c) {
      return nc({
        data: a,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          sc(),
          To
        ].filter((l) => !!l),
        issueData: {
          code: z.invalid_return_type,
          returnTypeError: c
        }
      });
    }
    const i = { errorMap: r.common.contextualErrorMap }, o = r.data;
    if (this._def.returns instanceof oi) {
      const a = this;
      return kt(function(...c) {
        return h(this, null, function* () {
          const l = new Nr([]), u = yield a._def.args.parseAsync(c, i).catch((g) => {
            throw l.addIssue(s(c, g)), l;
          }), d = yield Reflect.apply(o, this, u);
          return yield a._def.returns._def.type.parseAsync(d, i).catch((g) => {
            throw l.addIssue(n(d, g)), l;
          });
        });
      });
    } else {
      const a = this;
      return kt(function(...c) {
        const l = a._def.args.safeParse(c, i);
        if (!l.success)
          throw new Nr([s(c, l.error)]);
        const u = Reflect.apply(o, this, l.data), d = a._def.returns.safeParse(u, i);
        if (!d.success)
          throw new Nr([n(u, d.error)]);
        return d.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new Vn(B(C({}, this._def), {
      args: Hr.create(e).rest(Xs.create())
    }));
  }
  returns(e) {
    return new Vn(B(C({}, this._def), {
      returns: e
    }));
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, r, s) {
    return new Vn(C({
      args: e || Hr.create([]).rest(Xs.create()),
      returns: r || Xs.create(),
      typeName: ue.ZodFunction
    }, ye(s)));
  }
}
class Uo extends Ee {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
Uo.create = (t, e) => new Uo(C({
  getter: t,
  typeName: ue.ZodLazy
}, ye(e)));
class Lo extends Ee {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return ee(r, {
        received: r.data,
        code: z.invalid_literal,
        expected: this._def.value
      }), fe;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Lo.create = (t, e) => new Lo(C({
  value: t,
  typeName: ue.ZodLiteral
}, ye(e)));
function Bw(t, e) {
  return new Ps(C({
    values: t,
    typeName: ue.ZodEnum
  }, ye(e)));
}
class Ps extends Ee {
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), s = this._def.values;
      return ee(r, {
        expected: Te.joinValues(s),
        received: r.parsedType,
        code: z.invalid_type
      }), fe;
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const r = this._getOrReturnCtx(e), s = this._def.values;
      return ee(r, {
        received: r.data,
        code: z.invalid_enum_value,
        options: s
      }), fe;
    }
    return kt(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Values() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  extract(e) {
    return Ps.create(e);
  }
  exclude(e) {
    return Ps.create(this.options.filter((r) => !e.includes(r)));
  }
}
Ps.create = Bw;
class Mo extends Ee {
  _parse(e) {
    const r = Te.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== J.string && s.parsedType !== J.number) {
      const n = Te.objectValues(r);
      return ee(s, {
        expected: Te.joinValues(n),
        received: s.parsedType,
        code: z.invalid_type
      }), fe;
    }
    if (r.indexOf(e.data) === -1) {
      const n = Te.objectValues(r);
      return ee(s, {
        received: s.data,
        code: z.invalid_enum_value,
        options: n
      }), fe;
    }
    return kt(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Mo.create = (t, e) => new Mo(C({
  values: t,
  typeName: ue.ZodNativeEnum
}, ye(e)));
class oi extends Ee {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== J.promise && r.common.async === !1)
      return ee(r, {
        code: z.invalid_type,
        expected: J.promise,
        received: r.parsedType
      }), fe;
    const s = r.parsedType === J.promise ? r.data : Promise.resolve(r.data);
    return kt(s.then((n) => this._def.type.parseAsync(n, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
oi.create = (t, e) => new oi(C({
  type: t,
  typeName: ue.ZodPromise
}, ye(e)));
class Or extends Ee {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ue.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e), n = this._def.effect || null, i = {
      addIssue: (o) => {
        ee(s, o), o.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (i.addIssue = i.addIssue.bind(i), n.type === "preprocess") {
      const o = n.transform(s.data, i);
      return s.common.issues.length ? {
        status: "dirty",
        value: s.data
      } : s.common.async ? Promise.resolve(o).then((a) => this._def.schema._parseAsync({
        data: a,
        path: s.path,
        parent: s
      })) : this._def.schema._parseSync({
        data: o,
        path: s.path,
        parent: s
      });
    }
    if (n.type === "refinement") {
      const o = (a) => {
        const c = n.refinement(a, i);
        if (s.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return a;
      };
      if (s.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return a.status === "aborted" ? fe : (a.status === "dirty" && r.dirty(), o(a.value), { status: r.value, value: a.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((a) => a.status === "aborted" ? fe : (a.status === "dirty" && r.dirty(), o(a.value).then(() => ({ status: r.value, value: a.value }))));
    }
    if (n.type === "transform")
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!Oo(o))
          return o;
        const a = n.transform(o.value, i);
        if (a instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: a };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => Oo(o) ? Promise.resolve(n.transform(o.value, i)).then((a) => ({ status: r.value, value: a })) : o);
    Te.assertNever(n);
  }
}
Or.create = (t, e, r) => new Or(C({
  schema: t,
  typeName: ue.ZodEffects,
  effect: e
}, ye(r)));
Or.createWithPreprocess = (t, e, r) => new Or(C({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: ue.ZodEffects
}, ye(r)));
class as extends Ee {
  _parse(e) {
    return this._getType(e) === J.undefined ? kt(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
as.create = (t, e) => new as(C({
  innerType: t,
  typeName: ue.ZodOptional
}, ye(e)));
class ln extends Ee {
  _parse(e) {
    return this._getType(e) === J.null ? kt(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ln.create = (t, e) => new ln(C({
  innerType: t,
  typeName: ue.ZodNullable
}, ye(e)));
class Fo extends Ee {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let s = r.data;
    return r.parsedType === J.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Fo.create = (t, e) => new Fo(C({
  innerType: t,
  typeName: ue.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default
}, ye(e)));
class lc extends Ee {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = B(C({}, r), {
      common: B(C({}, r.common), {
        issues: []
      })
    }), n = this._def.innerType._parse({
      data: s.data,
      path: s.path,
      parent: C({}, s)
    });
    return ic(n) ? n.then((i) => ({
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new Nr(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new Nr(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
lc.create = (t, e) => new lc(C({
  innerType: t,
  typeName: ue.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch
}, ye(e)));
class uc extends Ee {
  _parse(e) {
    if (this._getType(e) !== J.nan) {
      const s = this._getOrReturnCtx(e);
      return ee(s, {
        code: z.invalid_type,
        expected: J.nan,
        received: s.parsedType
      }), fe;
    }
    return { status: "valid", value: e.data };
  }
}
uc.create = (t) => new uc(C({
  typeName: ue.ZodNaN
}, ye(t)));
const CD = Symbol("zod_brand");
class jw extends Ee {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = r.data;
    return this._def.type._parse({
      data: s,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class na extends Ee {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return h(this, null, function* () {
        const i = yield this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return i.status === "aborted" ? fe : i.status === "dirty" ? (r.dirty(), Fw(i.value)) : this._def.out._parseAsync({
          data: i.value,
          path: s.path,
          parent: s
        });
      });
    {
      const n = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      });
      return n.status === "aborted" ? fe : n.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: n.value
      }) : this._def.out._parseSync({
        data: n.value,
        path: s.path,
        parent: s
      });
    }
  }
  static create(e, r) {
    return new na({
      in: e,
      out: r,
      typeName: ue.ZodPipeline
    });
  }
}
class dc extends Ee {
  _parse(e) {
    const r = this._def.innerType._parse(e);
    return Oo(r) && (r.value = Object.freeze(r.value)), r;
  }
}
dc.create = (t, e) => new dc(C({
  innerType: t,
  typeName: ue.ZodReadonly
}, ye(e)));
const qw = (t, e = {}, r) => t ? ii.create().superRefine((s, n) => {
  var i, o;
  if (!t(s)) {
    const a = typeof e == "function" ? e(s) : typeof e == "string" ? { message: e } : e, c = (o = (i = a.fatal) !== null && i !== void 0 ? i : r) !== null && o !== void 0 ? o : !0, l = typeof a == "string" ? { message: a } : a;
    n.addIssue(B(C({ code: "custom" }, l), { fatal: c }));
  }
}) : ii.create(), AD = {
  object: Ge.lazycreate
};
var ue;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(ue || (ue = {}));
const SD = (t, e = {
  message: `Input not instance of ${t.name}`
}) => qw((r) => r instanceof t, e), zw = Ir.create, Ww = Os.create, ID = uc.create, ND = Rs.create, Hw = Ro.create, TD = an.create, OD = oc.create, RD = Po.create, PD = xo.create, xD = ii.create, DD = Xs.create, kD = ls.create, $D = ac.create, UD = Tr.create, LD = Ge.create, MD = Ge.strictCreate, FD = Do.create, BD = Dc.create, jD = ko.create, qD = Hr.create, zD = $o.create, WD = cc.create, HD = cn.create, VD = Vn.create, KD = Uo.create, GD = Lo.create, YD = Ps.create, ZD = Mo.create, JD = oi.create, kf = Or.create, XD = as.create, QD = ln.create, e3 = Or.createWithPreprocess, t3 = na.create, r3 = () => zw().optional(), s3 = () => Ww().optional(), n3 = () => Hw().optional(), i3 = {
  string: (t) => Ir.create(B(C({}, t), { coerce: !0 })),
  number: (t) => Os.create(B(C({}, t), { coerce: !0 })),
  boolean: (t) => Ro.create(B(C({}, t), {
    coerce: !0
  })),
  bigint: (t) => Rs.create(B(C({}, t), { coerce: !0 })),
  date: (t) => an.create(B(C({}, t), { coerce: !0 }))
}, o3 = fe;
var y = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: To,
  setErrorMap: uD,
  getErrorMap: sc,
  makeIssue: nc,
  EMPTY_PATH: dD,
  addIssueToContext: ee,
  ParseStatus: Tt,
  INVALID: fe,
  DIRTY: Fw,
  OK: kt,
  isAborted: Tu,
  isDirty: Ou,
  isValid: Oo,
  isAsync: ic,
  get util() {
    return Te;
  },
  get objectUtil() {
    return Nu;
  },
  ZodParsedType: J,
  getParsedType: vs,
  ZodType: Ee,
  ZodString: Ir,
  ZodNumber: Os,
  ZodBigInt: Rs,
  ZodBoolean: Ro,
  ZodDate: an,
  ZodSymbol: oc,
  ZodUndefined: Po,
  ZodNull: xo,
  ZodAny: ii,
  ZodUnknown: Xs,
  ZodNever: ls,
  ZodVoid: ac,
  ZodArray: Tr,
  ZodObject: Ge,
  ZodUnion: Do,
  ZodDiscriminatedUnion: Dc,
  ZodIntersection: ko,
  ZodTuple: Hr,
  ZodRecord: $o,
  ZodMap: cc,
  ZodSet: cn,
  ZodFunction: Vn,
  ZodLazy: Uo,
  ZodLiteral: Lo,
  ZodEnum: Ps,
  ZodNativeEnum: Mo,
  ZodPromise: oi,
  ZodEffects: Or,
  ZodTransformer: Or,
  ZodOptional: as,
  ZodNullable: ln,
  ZodDefault: Fo,
  ZodCatch: lc,
  ZodNaN: uc,
  BRAND: CD,
  ZodBranded: jw,
  ZodPipeline: na,
  ZodReadonly: dc,
  custom: qw,
  Schema: Ee,
  ZodSchema: Ee,
  late: AD,
  get ZodFirstPartyTypeKind() {
    return ue;
  },
  coerce: i3,
  any: xD,
  array: UD,
  bigint: ND,
  boolean: Hw,
  date: TD,
  discriminatedUnion: BD,
  effect: kf,
  enum: YD,
  function: VD,
  instanceof: SD,
  intersection: jD,
  lazy: KD,
  literal: GD,
  map: WD,
  nan: ID,
  nativeEnum: ZD,
  never: kD,
  null: PD,
  nullable: QD,
  number: Ww,
  object: LD,
  oboolean: n3,
  onumber: s3,
  optional: XD,
  ostring: r3,
  pipeline: t3,
  preprocess: e3,
  promise: JD,
  record: zD,
  set: HD,
  strictObject: MD,
  string: zw,
  symbol: OD,
  transformer: kf,
  tuple: qD,
  undefined: RD,
  union: FD,
  unknown: DD,
  void: $D,
  NEVER: o3,
  ZodIssueCode: z,
  quotelessJson: lD,
  ZodError: Nr
});
const Ze = y.object({ message: y.string() });
function X(t) {
  return y.literal(te[t]);
}
y.object({
  accessList: y.array(y.string()),
  blockHash: y.string().nullable(),
  blockNumber: y.string().nullable(),
  chainId: y.string().or(y.number()),
  from: y.string(),
  gas: y.string(),
  hash: y.string(),
  input: y.string().nullable(),
  maxFeePerGas: y.string(),
  maxPriorityFeePerGas: y.string(),
  nonce: y.string(),
  r: y.string(),
  s: y.string(),
  to: y.string(),
  transactionIndex: y.string().nullable(),
  type: y.string(),
  v: y.string(),
  value: y.string()
});
const a3 = y.object({ chainId: y.string().or(y.number()) }), c3 = y.object({ email: y.string().email() }), l3 = y.object({ otp: y.string() }), u3 = y.object({ uri: y.string() }), d3 = y.object({
  chainId: y.optional(y.string().or(y.number())),
  preferredAccountType: y.optional(y.string())
}), h3 = y.object({
  provider: y.enum(["google", "github", "apple", "facebook", "x", "discord"])
}), p3 = y.object({ email: y.string().email() }), f3 = y.object({ otp: y.string() }), g3 = y.object({ otp: y.string() }), m3 = y.object({
  themeMode: y.optional(y.enum(["light", "dark"])),
  themeVariables: y.optional(y.record(y.string(), y.string().or(y.number()))),
  w3mThemeVariables: y.optional(y.record(y.string(), y.string()))
}), w3 = y.object({
  metadata: y.object({
    name: y.string(),
    description: y.string(),
    url: y.string(),
    icons: y.array(y.string())
  }).optional(),
  sdkVersion: y.string().optional(),
  sdkType: y.string().optional(),
  projectId: y.string()
}), y3 = y.object({ type: y.string() }), b3 = y.object({
  action: y.enum(["VERIFY_DEVICE", "VERIFY_OTP", "CONNECT"])
}), v3 = y.object({
  url: y.string()
}), E3 = y.object({
  userName: y.string()
}), _3 = y.object({
  email: y.string().optional().nullable(),
  address: y.string(),
  chainId: y.string().or(y.number()),
  accounts: y.array(y.object({
    address: y.string(),
    type: y.enum([
      Et.ACCOUNT_TYPES.EOA,
      Et.ACCOUNT_TYPES.SMART_ACCOUNT
    ])
  })).optional(),
  userName: y.string().optional().nullable()
}), C3 = y.object({
  action: y.enum(["VERIFY_PRIMARY_OTP", "VERIFY_SECONDARY_OTP"])
}), A3 = y.object({
  email: y.string().email().optional().nullable(),
  address: y.string(),
  chainId: y.string().or(y.number()),
  smartAccountDeployed: y.optional(y.boolean()),
  accounts: y.array(y.object({
    address: y.string(),
    type: y.enum([
      Et.ACCOUNT_TYPES.EOA,
      Et.ACCOUNT_TYPES.SMART_ACCOUNT
    ])
  })).optional(),
  preferredAccountType: y.optional(y.string())
}), S3 = y.object({ uri: y.string() }), I3 = y.object({ isConnected: y.boolean() }), N3 = y.object({ chainId: y.string().or(y.number()) }), T3 = y.object({ chainId: y.string().or(y.number()) }), O3 = y.object({ newEmail: y.string().email() }), R3 = y.object({
  smartAccountEnabledNetworks: y.array(y.number())
});
y.object({
  address: y.string(),
  isDeployed: y.boolean()
});
const P3 = y.object({
  version: y.string().optional()
}), x3 = y.object({ type: y.string(), address: y.string() }), D3 = y.any(), k3 = y.object({
  method: y.literal("eth_accounts")
}), $3 = y.object({
  method: y.literal("eth_blockNumber")
}), U3 = y.object({
  method: y.literal("eth_call"),
  params: y.array(y.any())
}), L3 = y.object({
  method: y.literal("eth_chainId")
}), M3 = y.object({
  method: y.literal("eth_estimateGas"),
  params: y.array(y.any())
}), F3 = y.object({
  method: y.literal("eth_feeHistory"),
  params: y.array(y.any())
}), B3 = y.object({
  method: y.literal("eth_gasPrice")
}), j3 = y.object({
  method: y.literal("eth_getAccount"),
  params: y.array(y.any())
}), q3 = y.object({
  method: y.literal("eth_getBalance"),
  params: y.array(y.any())
}), z3 = y.object({
  method: y.literal("eth_getBlockByHash"),
  params: y.array(y.any())
}), W3 = y.object({
  method: y.literal("eth_getBlockByNumber"),
  params: y.array(y.any())
}), H3 = y.object({
  method: y.literal("eth_getBlockReceipts"),
  params: y.array(y.any())
}), V3 = y.object({
  method: y.literal("eth_getBlockTransactionCountByHash"),
  params: y.array(y.any())
}), K3 = y.object({
  method: y.literal("eth_getBlockTransactionCountByNumber"),
  params: y.array(y.any())
}), G3 = y.object({
  method: y.literal("eth_getCode"),
  params: y.array(y.any())
}), Y3 = y.object({
  method: y.literal("eth_getFilterChanges"),
  params: y.array(y.any())
}), Z3 = y.object({
  method: y.literal("eth_getFilterLogs"),
  params: y.array(y.any())
}), J3 = y.object({
  method: y.literal("eth_getLogs"),
  params: y.array(y.any())
}), X3 = y.object({
  method: y.literal("eth_getProof"),
  params: y.array(y.any())
}), Q3 = y.object({
  method: y.literal("eth_getStorageAt"),
  params: y.array(y.any())
}), ek = y.object({
  method: y.literal("eth_getTransactionByBlockHashAndIndex"),
  params: y.array(y.any())
}), tk = y.object({
  method: y.literal("eth_getTransactionByBlockNumberAndIndex"),
  params: y.array(y.any())
}), rk = y.object({
  method: y.literal("eth_getTransactionByHash"),
  params: y.array(y.any())
}), sk = y.object({
  method: y.literal("eth_getTransactionCount"),
  params: y.array(y.any())
}), nk = y.object({
  method: y.literal("eth_getTransactionReceipt"),
  params: y.array(y.any())
}), ik = y.object({
  method: y.literal("eth_getUncleCountByBlockHash"),
  params: y.array(y.any())
}), ok = y.object({
  method: y.literal("eth_getUncleCountByBlockNumber"),
  params: y.array(y.any())
}), ak = y.object({
  method: y.literal("eth_maxPriorityFeePerGas")
}), ck = y.object({
  method: y.literal("eth_newBlockFilter")
}), lk = y.object({
  method: y.literal("eth_newFilter"),
  params: y.array(y.any())
}), uk = y.object({
  method: y.literal("eth_newPendingTransactionFilter")
}), dk = y.object({
  method: y.literal("eth_sendRawTransaction"),
  params: y.array(y.any())
}), hk = y.object({
  method: y.literal("eth_syncing"),
  params: y.array(y.any())
}), pk = y.object({
  method: y.literal("eth_uninstallFilter"),
  params: y.array(y.any())
}), $f = y.object({
  method: y.literal("personal_sign"),
  params: y.array(y.any())
}), fk = y.object({
  method: y.literal("eth_signTypedData_v4"),
  params: y.array(y.any())
}), gk = y.object({
  method: y.literal("eth_sendTransaction"),
  params: y.array(y.any())
}), mk = y.object({
  method: y.literal("solana_signMessage"),
  params: y.object({
    message: y.string(),
    pubkey: y.string()
  })
}), wk = y.object({
  method: y.literal("solana_signTransaction"),
  params: y.object({
    transaction: y.string()
  })
}), yk = y.object({
  method: y.literal("solana_signAllTransactions"),
  params: y.object({
    transactions: y.array(y.string())
  })
}), bk = y.object({
  method: y.literal("solana_signAndSendTransaction"),
  params: y.object({
    transaction: y.string(),
    options: y.object({
      skipPreflight: y.boolean().optional(),
      preflightCommitment: y.enum([
        "processed",
        "confirmed",
        "finalized",
        "recent",
        "single",
        "singleGossip",
        "root",
        "max"
      ]).optional(),
      maxRetries: y.number().optional(),
      minContextSlot: y.number().optional()
    }).optional()
  })
}), vk = y.object({
  method: y.literal("wallet_sendCalls"),
  params: y.array(y.object({
    chainId: y.string().or(y.number()).optional(),
    from: y.string().optional(),
    version: y.string().optional(),
    capabilities: y.any().optional(),
    calls: y.array(y.object({
      to: y.string().startsWith("0x"),
      data: y.string().startsWith("0x").optional(),
      value: y.string().optional()
    }))
  }))
}), Ek = y.object({
  method: y.literal("wallet_getCallsStatus"),
  params: y.array(y.string())
}), _k = y.object({
  method: y.literal("wallet_getCapabilities")
}), Ck = y.object({
  method: y.literal("wallet_grantPermissions"),
  params: y.array(y.any())
}), Ak = y.object({
  method: y.literal("wallet_revokePermissions"),
  params: y.any()
}), Sk = y.object({
  method: y.literal("wallet_getAssets"),
  params: y.any()
}), Uf = y.object({
  token: y.string()
}), Q = y.object({
  id: y.string().optional()
}), Di = {
  appEvent: Q.extend({
    type: X("APP_SWITCH_NETWORK"),
    payload: a3
  }).or(Q.extend({
    type: X("APP_CONNECT_EMAIL"),
    payload: c3
  })).or(Q.extend({ type: X("APP_CONNECT_DEVICE") })).or(Q.extend({ type: X("APP_CONNECT_OTP"), payload: l3 })).or(Q.extend({
    type: X("APP_CONNECT_SOCIAL"),
    payload: u3
  })).or(Q.extend({ type: X("APP_GET_FARCASTER_URI") })).or(Q.extend({ type: X("APP_CONNECT_FARCASTER") })).or(Q.extend({
    type: X("APP_GET_USER"),
    payload: y.optional(d3)
  })).or(Q.extend({
    type: X("APP_GET_SOCIAL_REDIRECT_URI"),
    payload: h3
  })).or(Q.extend({ type: X("APP_SIGN_OUT") })).or(Q.extend({
    type: X("APP_IS_CONNECTED"),
    payload: y.optional(Uf)
  })).or(Q.extend({ type: X("APP_GET_CHAIN_ID") })).or(Q.extend({ type: X("APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS") })).or(Q.extend({ type: X("APP_INIT_SMART_ACCOUNT") })).or(Q.extend({
    type: X("APP_SET_PREFERRED_ACCOUNT"),
    payload: y3
  })).or(Q.extend({
    type: X("APP_RPC_REQUEST"),
    payload: $f.or(Sk).or(k3).or($3).or(U3).or(L3).or(M3).or(F3).or(B3).or(j3).or(q3).or(z3).or(W3).or(H3).or(V3).or(K3).or(G3).or(Y3).or(Z3).or(J3).or(X3).or(Q3).or(ek).or(tk).or(rk).or(sk).or(nk).or(ik).or(ok).or(ak).or(ck).or(lk).or(uk).or(dk).or(hk).or(pk).or($f).or(fk).or(gk).or(mk).or(wk).or(yk).or(bk).or(Ek).or(vk).or(_k).or(Ck).or(Ak)
  })).or(Q.extend({ type: X("APP_UPDATE_EMAIL"), payload: p3 })).or(Q.extend({
    type: X("APP_UPDATE_EMAIL_PRIMARY_OTP"),
    payload: f3
  })).or(Q.extend({
    type: X("APP_UPDATE_EMAIL_SECONDARY_OTP"),
    payload: g3
  })).or(Q.extend({ type: X("APP_SYNC_THEME"), payload: m3 })).or(Q.extend({
    type: X("APP_SYNC_DAPP_DATA"),
    payload: w3
  })).or(Q.extend({
    type: X("APP_RELOAD")
  })),
  frameEvent: Q.extend({ type: X("FRAME_SWITCH_NETWORK_ERROR"), payload: Ze }).or(Q.extend({
    type: X("FRAME_SWITCH_NETWORK_SUCCESS"),
    payload: T3
  })).or(Q.extend({
    type: X("FRAME_CONNECT_EMAIL_SUCCESS"),
    payload: b3
  })).or(Q.extend({ type: X("FRAME_CONNECT_EMAIL_ERROR"), payload: Ze })).or(Q.extend({
    type: X("FRAME_GET_FARCASTER_URI_SUCCESS"),
    payload: v3
  })).or(Q.extend({ type: X("FRAME_GET_FARCASTER_URI_ERROR"), payload: Ze })).or(Q.extend({
    type: X("FRAME_CONNECT_FARCASTER_SUCCESS"),
    payload: E3
  })).or(Q.extend({ type: X("FRAME_CONNECT_FARCASTER_ERROR"), payload: Ze })).or(Q.extend({ type: X("FRAME_CONNECT_OTP_ERROR"), payload: Ze })).or(Q.extend({ type: X("FRAME_CONNECT_OTP_SUCCESS") })).or(Q.extend({ type: X("FRAME_CONNECT_DEVICE_ERROR"), payload: Ze })).or(Q.extend({ type: X("FRAME_CONNECT_DEVICE_SUCCESS") })).or(Q.extend({
    type: X("FRAME_CONNECT_SOCIAL_SUCCESS"),
    payload: _3
  })).or(Q.extend({
    type: X("FRAME_CONNECT_SOCIAL_ERROR"),
    payload: Ze
  })).or(Q.extend({ type: X("FRAME_GET_USER_ERROR"), payload: Ze })).or(Q.extend({
    type: X("FRAME_GET_USER_SUCCESS"),
    payload: A3
  })).or(Q.extend({
    type: X("FRAME_GET_SOCIAL_REDIRECT_URI_ERROR"),
    payload: Ze
  })).or(Q.extend({
    type: X("FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS"),
    payload: S3
  })).or(Q.extend({ type: X("FRAME_SIGN_OUT_ERROR"), payload: Ze })).or(Q.extend({ type: X("FRAME_SIGN_OUT_SUCCESS") })).or(Q.extend({ type: X("FRAME_IS_CONNECTED_ERROR"), payload: Ze })).or(Q.extend({
    type: X("FRAME_IS_CONNECTED_SUCCESS"),
    payload: I3
  })).or(Q.extend({ type: X("FRAME_GET_CHAIN_ID_ERROR"), payload: Ze })).or(Q.extend({
    type: X("FRAME_GET_CHAIN_ID_SUCCESS"),
    payload: N3
  })).or(Q.extend({ type: X("FRAME_RPC_REQUEST_ERROR"), payload: Ze })).or(Q.extend({ type: X("FRAME_RPC_REQUEST_SUCCESS"), payload: D3 })).or(Q.extend({ type: X("FRAME_SESSION_UPDATE"), payload: Uf })).or(Q.extend({ type: X("FRAME_UPDATE_EMAIL_ERROR"), payload: Ze })).or(Q.extend({
    type: X("FRAME_UPDATE_EMAIL_SUCCESS"),
    payload: C3
  })).or(Q.extend({
    type: X("FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR"),
    payload: Ze
  })).or(Q.extend({ type: X("FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS") })).or(Q.extend({
    type: X("FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR"),
    payload: Ze
  })).or(Q.extend({
    type: X("FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS"),
    payload: O3
  })).or(Q.extend({ type: X("FRAME_SYNC_THEME_ERROR"), payload: Ze })).or(Q.extend({ type: X("FRAME_SYNC_THEME_SUCCESS") })).or(Q.extend({ type: X("FRAME_SYNC_DAPP_DATA_ERROR"), payload: Ze })).or(Q.extend({ type: X("FRAME_SYNC_DAPP_DATA_SUCCESS") })).or(Q.extend({
    type: X("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS"),
    payload: R3
  })).or(Q.extend({
    type: X("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR"),
    payload: Ze
  })).or(Q.extend({ type: X("FRAME_INIT_SMART_ACCOUNT_ERROR"), payload: Ze })).or(Q.extend({
    type: X("FRAME_SET_PREFERRED_ACCOUNT_SUCCESS"),
    payload: x3
  })).or(Q.extend({
    type: X("FRAME_SET_PREFERRED_ACCOUNT_ERROR"),
    payload: Ze
  })).or(Q.extend({ type: X("FRAME_READY"), payload: P3 })).or(Q.extend({
    type: X("FRAME_RELOAD_ERROR"),
    payload: Ze
  })).or(Q.extend({ type: X("FRAME_RELOAD_SUCCESS") }))
};
function kl(t, e = {}) {
  var r;
  return typeof (e == null ? void 0 : e.type) == "string" && ((r = e == null ? void 0 : e.type) == null ? void 0 : r.includes(t));
}
class Ik {
  constructor({ projectId: e, isAppClient: r = !1, chainId: s = "eip155:1", enableLogger: n = !0 }) {
    if (this.iframe = null, this.iframeIsReady = !1, this.rpcUrl = se.BLOCKCHAIN_API_RPC_URL, this.initFrame = () => {
      const i = document.getElementById("w3m-iframe");
      this.iframe && !i && document.body.appendChild(this.iframe);
    }, this.events = {
      registerFrameEventHandler: (i, o, a) => {
        function c({ data: l }) {
          if (!kl(te.FRAME_EVENT_KEY, l))
            return;
          const u = Di.frameEvent.parse(l);
          u.id === i && (o(u), window.removeEventListener("message", c));
        }
        tr.isClient && (window.addEventListener("message", c), a.addEventListener("abort", () => {
          window.removeEventListener("message", c);
        }));
      },
      onFrameEvent: (i) => {
        tr.isClient && window.addEventListener("message", ({ data: o }) => {
          if (!kl(te.FRAME_EVENT_KEY, o))
            return;
          const a = Di.frameEvent.parse(o);
          i(a);
        });
      },
      onAppEvent: (i) => {
        tr.isClient && window.addEventListener("message", ({ data: o }) => {
          if (!kl(te.APP_EVENT_KEY, o))
            return;
          const a = Di.appEvent.parse(o);
          i(a);
        });
      },
      postAppEvent: (i) => {
        var o;
        if (tr.isClient) {
          if (!((o = this.iframe) != null && o.contentWindow))
            throw new Error("W3mFrame: iframe is not set");
          Di.appEvent.parse(i), this.iframe.contentWindow.postMessage(i, "*");
        }
      },
      postFrameEvent: (i) => {
        if (tr.isClient) {
          if (!parent)
            throw new Error("W3mFrame: parent is not set");
          Di.frameEvent.parse(i), parent.postMessage(i, "*");
        }
      }
    }, this.projectId = e, this.frameLoadPromise = new Promise((i, o) => {
      this.frameLoadPromiseResolver = { resolve: i, reject: o };
    }), r && (this.frameLoadPromise = new Promise((i, o) => {
      this.frameLoadPromiseResolver = { resolve: i, reject: o };
    }), tr.isClient)) {
      const i = document.createElement("iframe");
      i.id = "w3m-iframe", i.src = `${Ix}?projectId=${e}&chainId=${s}&version=${Tx}&enableLogger=${n}`, i.name = "w3m-secure-iframe", i.style.position = "fixed", i.style.zIndex = "999999", i.style.display = "none", i.style.border = "none", i.style.animationDelay = "0s, 50ms", i.style.borderBottomLeftRadius = "clamp(0px, var(--wui-border-radius-l), 44px)", i.style.borderBottomRightRadius = "clamp(0px, var(--wui-border-radius-l), 44px)", this.iframe = i, this.iframe.onerror = () => {
        var o;
        (o = this.frameLoadPromiseResolver) == null || o.reject("Unable to load email login dependency");
      }, this.events.onFrameEvent((o) => {
        var a;
        o.type === "@w3m-frame/READY" && (this.iframeIsReady = !0, (a = this.frameLoadPromiseResolver) == null || a.resolve(void 0));
      });
    }
  }
  get networks() {
    const e = [
      "eip155:1",
      "eip155:5",
      "eip155:11155111",
      "eip155:10",
      "eip155:420",
      "eip155:42161",
      "eip155:421613",
      "eip155:137",
      "eip155:80001",
      "eip155:42220",
      "eip155:1313161554",
      "eip155:1313161555",
      "eip155:56",
      "eip155:97",
      "eip155:43114",
      "eip155:43113",
      "eip155:324",
      "eip155:280",
      "eip155:100",
      "eip155:8453",
      "eip155:84531",
      "eip155:84532",
      "eip155:7777777",
      "eip155:999",
      "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
      "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
      "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
    ].map((r) => ({
      [r]: {
        rpcUrl: `${this.rpcUrl}/v1/?chainId=${r}&projectId=${this.projectId}`,
        chainId: r
      }
    }));
    return Object.assign({}, ...e);
  }
}
class Nk {
  constructor(e) {
    var i;
    const r = di({
      level: Nx
    }), { logger: s, chunkLoggerController: n } = Uu({
      opts: r
    });
    this.logger = Ot(s, this.constructor.name), this.chunkLoggerController = n, typeof window != "undefined" && ((i = this.chunkLoggerController) != null && i.downloadLogsBlobInBrowser) && (window.downloadAppKitLogsBlob || (window.downloadAppKitLogsBlob = {}), window.downloadAppKitLogsBlob.sdk = () => {
      var o;
      (o = this.chunkLoggerController) != null && o.downloadLogsBlobInBrowser && this.chunkLoggerController.downloadLogsBlobInBrowser({
        projectId: e
      });
    });
  }
}
class Tk {
  constructor({ projectId: e, chainId: r, enableLogger: s = !0, onTimeout: n, abortController: i }) {
    this.openRpcRequests = [], s && (this.w3mLogger = new Nk(e)), this.abortController = i, this.w3mFrame = new Ik({ projectId: e, isAppClient: !0, chainId: r, enableLogger: s }), this.onTimeout = n, this.getLoginEmailUsed() && this.w3mFrame.initFrame(), this.initPromise = new Promise((o) => {
      this.w3mFrame.events.onFrameEvent((a) => h(this, null, function* () {
        a.type === te.FRAME_READY && (this.initPromise = void 0, yield new Promise((c) => {
          setTimeout(c, 500);
        }), o());
      }));
    });
  }
  init() {
    return h(this, null, function* () {
      this.w3mFrame.initFrame(), this.initPromise && (yield this.initPromise);
    });
  }
  getLoginEmailUsed() {
    return !!yt.get(te.EMAIL_LOGIN_USED_KEY);
  }
  getEmail() {
    return yt.get(te.EMAIL);
  }
  getUsername() {
    return yt.get(te.SOCIAL_USERNAME);
  }
  reload() {
    return h(this, null, function* () {
      var e;
      try {
        this.w3mFrame.initFrame(), yield this.appEvent({
          type: te.APP_RELOAD
        });
      } catch (r) {
        throw (e = this.w3mLogger) == null || e.logger.error({ error: r }, "Error reloading iframe"), r;
      }
    });
  }
  connectEmail(e) {
    return h(this, null, function* () {
      var r;
      try {
        tr.checkIfAllowedToTriggerEmail(), this.w3mFrame.initFrame();
        const s = yield this.appEvent({
          type: te.APP_CONNECT_EMAIL,
          payload: e
        });
        return this.setNewLastEmailLoginTime(), s;
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error connecting email"), s;
      }
    });
  }
  connectDevice() {
    return h(this, null, function* () {
      var e;
      try {
        return this.appEvent({
          type: te.APP_CONNECT_DEVICE
        });
      } catch (r) {
        throw (e = this.w3mLogger) == null || e.logger.error({ error: r }, "Error connecting device"), r;
      }
    });
  }
  connectOtp(e) {
    return h(this, null, function* () {
      var r;
      try {
        return this.appEvent({
          type: te.APP_CONNECT_OTP,
          payload: e
        });
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error connecting otp"), s;
      }
    });
  }
  isConnected() {
    return h(this, null, function* () {
      var e;
      try {
        if (!this.getLoginEmailUsed())
          return { isConnected: !1 };
        const r = yield this.appEvent({
          type: te.APP_IS_CONNECTED
        });
        return r != null && r.isConnected || this.deleteAuthLoginCache(), r;
      } catch (r) {
        throw this.deleteAuthLoginCache(), (e = this.w3mLogger) == null || e.logger.error({ error: r }, "Error checking connection"), r;
      }
    });
  }
  getChainId() {
    return h(this, null, function* () {
      var e;
      try {
        const r = yield this.appEvent({
          type: te.APP_GET_CHAIN_ID
        });
        return this.setLastUsedChainId(r.chainId), r;
      } catch (r) {
        throw (e = this.w3mLogger) == null || e.logger.error({ error: r }, "Error getting chain id"), r;
      }
    });
  }
  getSocialRedirectUri(e) {
    return h(this, null, function* () {
      var r;
      try {
        return this.w3mFrame.initFrame(), this.appEvent({
          type: te.APP_GET_SOCIAL_REDIRECT_URI,
          payload: e
        });
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error getting social redirect uri"), s;
      }
    });
  }
  updateEmail(e) {
    return h(this, null, function* () {
      var r;
      try {
        const s = yield this.appEvent({
          type: te.APP_UPDATE_EMAIL,
          payload: e
        });
        return this.setNewLastEmailLoginTime(), s;
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error updating email"), s;
      }
    });
  }
  updateEmailPrimaryOtp(e) {
    return h(this, null, function* () {
      var r;
      try {
        return this.appEvent({
          type: te.APP_UPDATE_EMAIL_PRIMARY_OTP,
          payload: e
        });
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error updating email primary otp"), s;
      }
    });
  }
  updateEmailSecondaryOtp(e) {
    return h(this, null, function* () {
      var r;
      try {
        const s = yield this.appEvent({
          type: te.APP_UPDATE_EMAIL_SECONDARY_OTP,
          payload: e
        });
        return this.setLoginSuccess(s.newEmail), s;
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error updating email secondary otp"), s;
      }
    });
  }
  syncTheme(e) {
    return h(this, null, function* () {
      var r;
      try {
        return this.appEvent({
          type: te.APP_SYNC_THEME,
          payload: e
        });
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error syncing theme"), s;
      }
    });
  }
  syncDappData(e) {
    return h(this, null, function* () {
      var r;
      try {
        return this.appEvent({
          type: te.APP_SYNC_DAPP_DATA,
          payload: e
        });
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error syncing dapp data"), s;
      }
    });
  }
  getSmartAccountEnabledNetworks() {
    return h(this, null, function* () {
      var e;
      try {
        const r = yield this.appEvent({
          type: te.APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS
        });
        return this.persistSmartAccountEnabledNetworks(r.smartAccountEnabledNetworks), r;
      } catch (r) {
        throw this.persistSmartAccountEnabledNetworks([]), (e = this.w3mLogger) == null || e.logger.error({ error: r }, "Error getting smart account enabled networks"), r;
      }
    });
  }
  setPreferredAccount(e) {
    return h(this, null, function* () {
      var r;
      try {
        return this.appEvent({
          type: te.APP_SET_PREFERRED_ACCOUNT,
          payload: { type: e }
        });
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error setting preferred account"), s;
      }
    });
  }
  connect(e) {
    return h(this, null, function* () {
      var r;
      try {
        const s = (e == null ? void 0 : e.chainId) || this.getLastUsedChainId() || 1, n = yield this.getUser({
          chainId: s,
          preferredAccountType: e == null ? void 0 : e.preferredAccountType
        });
        return this.setLoginSuccess(n.email), this.setLastUsedChainId(n.chainId), this.user = n, n;
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error connecting"), s;
      }
    });
  }
  getUser(e) {
    return h(this, null, function* () {
      var r;
      try {
        const s = (e == null ? void 0 : e.chainId) || this.getLastUsedChainId() || 1, n = yield this.appEvent({
          type: te.APP_GET_USER,
          payload: B(C({}, e), { chainId: s })
        });
        return this.user = n, n;
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error connecting"), s;
      }
    });
  }
  connectSocial(e) {
    return h(this, null, function* () {
      var r;
      try {
        this.w3mFrame.initFrame();
        const s = yield this.appEvent({
          type: te.APP_CONNECT_SOCIAL,
          payload: { uri: e }
        });
        return s.userName && this.setSocialLoginSuccess(s.userName), s;
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error connecting social"), s;
      }
    });
  }
  getFarcasterUri() {
    return h(this, null, function* () {
      var e;
      try {
        return this.w3mFrame.initFrame(), yield this.appEvent({
          type: te.APP_GET_FARCASTER_URI
        });
      } catch (r) {
        throw (e = this.w3mLogger) == null || e.logger.error({ error: r }, "Error getting farcaster uri"), r;
      }
    });
  }
  connectFarcaster() {
    return h(this, null, function* () {
      var e;
      try {
        const r = yield this.appEvent({
          type: te.APP_CONNECT_FARCASTER
        });
        return r.userName && this.setSocialLoginSuccess(r.userName), r;
      } catch (r) {
        throw (e = this.w3mLogger) == null || e.logger.error({ error: r }, "Error connecting farcaster"), r;
      }
    });
  }
  switchNetwork(e) {
    return h(this, null, function* () {
      var r;
      try {
        const s = yield this.appEvent({
          type: te.APP_SWITCH_NETWORK,
          payload: { chainId: e }
        });
        return this.setLastUsedChainId(s.chainId), s;
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error switching network"), s;
      }
    });
  }
  disconnect() {
    return h(this, null, function* () {
      var e;
      try {
        const r = yield this.appEvent({
          type: te.APP_SIGN_OUT
        });
        return this.deleteAuthLoginCache(), r;
      } catch (r) {
        throw (e = this.w3mLogger) == null || e.logger.error({ error: r }, "Error disconnecting"), r;
      }
    });
  }
  request(e) {
    return h(this, null, function* () {
      var r, s, n, i;
      try {
        if (Et.GET_CHAIN_ID === e.method)
          return this.getLastUsedChainId();
        (r = this.rpcRequestHandler) == null || r.call(this, e);
        const o = yield this.appEvent({
          type: te.APP_RPC_REQUEST,
          payload: e
        });
        return (s = this.rpcSuccessHandler) == null || s.call(this, o, e), o;
      } catch (o) {
        throw (n = this.rpcErrorHandler) == null || n.call(this, o, e), (i = this.w3mLogger) == null || i.logger.error({ error: o }, "Error requesting"), o;
      }
    });
  }
  onRpcRequest(e) {
    this.rpcRequestHandler = e;
  }
  onRpcSuccess(e) {
    this.rpcSuccessHandler = e;
  }
  onRpcError(e) {
    this.rpcErrorHandler = e;
  }
  onIsConnected(e) {
    this.w3mFrame.events.onFrameEvent((r) => {
      r.type === te.FRAME_IS_CONNECTED_SUCCESS && r.payload.isConnected && e();
    });
  }
  onNotConnected(e) {
    this.w3mFrame.events.onFrameEvent((r) => {
      r.type === te.FRAME_IS_CONNECTED_ERROR && e(), r.type === te.FRAME_IS_CONNECTED_SUCCESS && !r.payload.isConnected && e();
    });
  }
  onConnect(e) {
    this.w3mFrame.events.onFrameEvent((r) => {
      r.type === te.FRAME_GET_USER_SUCCESS && e(r.payload);
    });
  }
  onSocialConnected(e) {
    this.w3mFrame.events.onFrameEvent((r) => {
      r.type === te.FRAME_CONNECT_SOCIAL_SUCCESS && e(r.payload);
    });
  }
  getCapabilities() {
    return h(this, null, function* () {
      try {
        return (yield this.request({
          method: "wallet_getCapabilities"
        })) || {};
      } catch (e) {
        return {};
      }
    });
  }
  onSetPreferredAccount(e) {
    this.w3mFrame.events.onFrameEvent((r) => {
      r.type === te.FRAME_SET_PREFERRED_ACCOUNT_SUCCESS ? e(r.payload) : r.type === te.FRAME_SET_PREFERRED_ACCOUNT_ERROR && e({ type: Et.ACCOUNT_TYPES.EOA });
    });
  }
  onGetSmartAccountEnabledNetworks(e) {
    this.w3mFrame.events.onFrameEvent((r) => {
      r.type === te.FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS ? e(r.payload.smartAccountEnabledNetworks) : r.type === te.FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR && e([]);
    });
  }
  getAvailableChainIds() {
    return Object.keys(this.w3mFrame.networks);
  }
  rejectRpcRequests() {
    var e;
    try {
      this.openRpcRequests.forEach(({ abortController: r, method: s }) => {
        Et.SAFE_RPC_METHODS.includes(s) || r.abort();
      }), this.openRpcRequests = [];
    } catch (r) {
      (e = this.w3mLogger) == null || e.logger.error({ error: r }, "Error aborting RPC request");
    }
  }
  appEvent(e) {
    return h(this, null, function* () {
      let r, s;
      function n(c) {
        return c.replace("@w3m-app/", "");
      }
      const i = [
        te.APP_SYNC_DAPP_DATA,
        te.APP_SYNC_THEME,
        te.APP_SET_PREFERRED_ACCOUNT
      ], o = n(e.type);
      return !this.w3mFrame.iframeIsReady && !i.includes(e.type) && (s = setTimeout(() => {
        var c;
        (c = this.onTimeout) == null || c.call(this, "iframe_load_failed"), this.abortController.abort();
      }, 2e4)), yield this.w3mFrame.frameLoadPromise, clearTimeout(s), [
        te.APP_CONNECT_EMAIL,
        te.APP_CONNECT_DEVICE,
        te.APP_CONNECT_OTP,
        te.APP_CONNECT_SOCIAL,
        te.APP_GET_SOCIAL_REDIRECT_URI
      ].map(n).includes(o) && (r = setTimeout(() => {
        var c;
        (c = this.onTimeout) == null || c.call(this, "iframe_request_timeout"), this.abortController.abort();
      }, 3e4)), new Promise((c, l) => {
        var g, m, f;
        const u = Math.random().toString(36).substring(7);
        (f = (g = this.w3mLogger) == null ? void 0 : (m = g.logger).info) == null || f.call(m, { event: e, id: u }, "Sending app event"), this.w3mFrame.events.postAppEvent(B(C({}, e), { id: u }));
        const d = new AbortController();
        if (o === "RPC_REQUEST") {
          const w = e;
          this.openRpcRequests = [...this.openRpcRequests, B(C({}, w.payload), { abortController: d })];
        }
        d.signal.addEventListener("abort", () => {
          o === "RPC_REQUEST" ? l(new Error("Request was aborted")) : o !== "GET_FARCASTER_URI" && l(new Error("Something went wrong"));
        });
        function p(w, S) {
          var E, I, A;
          w.id === u && ((I = S == null ? void 0 : (E = S.logger).info) == null || I.call(E, { framEvent: w, id: u }, "Received frame response"), w.type === `@w3m-frame/${o}_SUCCESS` ? (r && clearTimeout(r), s && clearTimeout(s), "payload" in w && c(w.payload), c(void 0)) : w.type === `@w3m-frame/${o}_ERROR` && (r && clearTimeout(r), s && clearTimeout(s), "payload" in w && l(new Error(((A = w.payload) == null ? void 0 : A.message) || "An error occurred")), l(new Error("An error occurred"))));
        }
        this.w3mFrame.events.registerFrameEventHandler(u, (w) => p(w, this.w3mLogger), this.abortController.signal);
      });
    });
  }
  setNewLastEmailLoginTime() {
    yt.set(te.LAST_EMAIL_LOGIN_TIME, Date.now().toString());
  }
  setSocialLoginSuccess(e) {
    yt.set(te.SOCIAL_USERNAME, e);
  }
  setLoginSuccess(e) {
    e && yt.set(te.EMAIL, e), yt.set(te.EMAIL_LOGIN_USED_KEY, "true"), yt.delete(te.LAST_EMAIL_LOGIN_TIME);
  }
  deleteAuthLoginCache() {
    yt.delete(te.EMAIL_LOGIN_USED_KEY), yt.delete(te.EMAIL), yt.delete(te.LAST_USED_CHAIN_KEY), yt.delete(te.SOCIAL_USERNAME);
  }
  setLastUsedChainId(e) {
    e && yt.set(te.LAST_USED_CHAIN_KEY, String(e));
  }
  getLastUsedChainId() {
    var s;
    const e = (s = yt.get(te.LAST_USED_CHAIN_KEY)) != null ? s : void 0, r = Number(e);
    return isNaN(r) ? e : r;
  }
  persistSmartAccountEnabledNetworks(e) {
    yt.set(te.SMART_ACCOUNT_ENABLED_NETWORKS, e.join(","));
  }
}
class Gi {
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- This is a singleton
  constructor() {
  }
  static getInstance({ projectId: e, chainId: r, enableLogger: s, onTimeout: n, abortController: i }) {
    return Gi.instance || (Gi.instance = new Tk({
      projectId: e,
      chainId: r,
      enableLogger: s,
      onTimeout: n,
      abortController: i
    })), Gi.instance;
  }
}
const Ok = {
  ACCOUNT_TABS: [{ label: "Tokens" }, { label: "NFTs" }, { label: "Activity" }],
  SECURE_SITE_ORIGIN: (typeof process != "undefined" && typeof process.env != "undefined" ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org",
  VIEW_DIRECTION: {
    Next: "next",
    Prev: "prev"
  },
  DEFAULT_CONNECT_METHOD_ORDER: ["email", "social", "wallet"],
  ANIMATION_DURATIONS: {
    HeaderText: 120,
    ModalHeight: 150,
    ViewTransition: 150
  }
}, Pu = {
  filterOutDuplicatesByRDNS(t) {
    const e = q.state.enableEIP6963 ? pe.state.connectors : [], r = re.getRecentWallets(), s = e.map((a) => {
      var c;
      return (c = a.info) == null ? void 0 : c.rdns;
    }).filter(Boolean), n = r.map((a) => a.rdns).filter(Boolean), i = s.concat(n);
    if (i.includes("io.metamask.mobile") && he.isMobile()) {
      const a = i.indexOf("io.metamask.mobile");
      i[a] = "io.metamask";
    }
    return t.filter((a) => !i.includes(String(a == null ? void 0 : a.rdns)));
  },
  filterOutDuplicatesByIds(t) {
    const e = pe.state.connectors.filter((a) => a.type === "ANNOUNCED" || a.type === "INJECTED"), r = re.getRecentWallets(), s = e.map((a) => a.explorerId), n = r.map((a) => a.id), i = s.concat(n);
    return t.filter((a) => !i.includes(a == null ? void 0 : a.id));
  },
  filterOutDuplicateWallets(t) {
    const e = this.filterOutDuplicatesByRDNS(t);
    return this.filterOutDuplicatesByIds(e);
  },
  markWalletsAsInstalled(t) {
    const { connectors: e } = pe.state, r = e.filter((i) => i.type === "ANNOUNCED").reduce((i, o) => {
      var a;
      return (a = o.info) != null && a.rdns && (i[o.info.rdns] = !0), i;
    }, {});
    return t.map((i) => {
      var o;
      return B(C({}, i), {
        installed: !!i.rdns && !!r[(o = i.rdns) != null ? o : ""]
      });
    }).sort((i, o) => Number(o.installed) - Number(i.installed));
  },
  getConnectOrderMethod(t, e) {
    var c;
    const r = (t == null ? void 0 : t.connectMethodsOrder) || ((c = q.state.features) == null ? void 0 : c.connectMethodsOrder), s = e || pe.state.connectors;
    if (r)
      return r;
    const { injected: n, announced: i } = ja.getConnectorsByType(s, le.state.recommended, le.state.featured), o = n.filter(ja.showConnector), a = i.filter(ja.showConnector);
    return o.length || a.length ? ["wallet", "email", "social"] : Ok.DEFAULT_CONNECT_METHOD_ORDER;
  },
  isExcluded(t) {
    const e = !!t.rdns && le.state.excludedWallets.some((s) => s.rdns === t.rdns), r = !!t.name && le.state.excludedWallets.some((s) => xc.isLowerCaseMatch(s.name, t.name));
    return e || r;
  }
}, ja = {
  getConnectorsByType(t, e, r) {
    const { customWallets: s } = q.state, n = re.getRecentWallets(), i = Pu.filterOutDuplicateWallets(e), o = Pu.filterOutDuplicateWallets(r), a = t.filter((d) => d.type === "MULTI_CHAIN"), c = t.filter((d) => d.type === "ANNOUNCED"), l = t.filter((d) => d.type === "INJECTED"), u = t.filter((d) => d.type === "EXTERNAL");
    return {
      custom: s,
      recent: n,
      external: u,
      multiChain: a,
      announced: c,
      injected: l,
      recommended: i,
      featured: o
    };
  },
  showConnector(t) {
    var n;
    const e = (n = t.info) == null ? void 0 : n.rdns, r = !!e && le.state.excludedWallets.some((i) => !!i.rdns && i.rdns === e), s = !!t.name && le.state.excludedWallets.some((i) => xc.isLowerCaseMatch(i.name, t.name));
    return !(t.type === "INJECTED" && (t.name === "Browser Wallet" && (!he.isMobile() || he.isMobile() && !e && !He.checkInstalled()) || r || s) || (t.type === "ANNOUNCED" || t.type === "EXTERNAL") && (r || s));
  },
  getIsConnectedWithWC() {
    return Array.from(R.state.chains.values()).some((r) => pe.getConnectorId(r.namespace) === se.CONNECTOR_ID.WALLET_CONNECT);
  },
  getConnectorTypeOrder({ recommended: t, featured: e, custom: r, recent: s, announced: n, injected: i, multiChain: o, external: a, overriddenConnectors: c = ((u) => (u = ((l) => (l = q.state.features) == null ? void 0 : l.connectorTypeOrder)()) != null ? u : [])() }) {
    const d = ja.getIsConnectedWithWC(), m = [
      { type: "walletConnect", isEnabled: q.state.enableWalletConnect && !d },
      { type: "recent", isEnabled: s.length > 0 },
      { type: "injected", isEnabled: [...i, ...n, ...o].length > 0 },
      { type: "featured", isEnabled: e.length > 0 },
      { type: "custom", isEnabled: r && r.length > 0 },
      { type: "external", isEnabled: a.length > 0 },
      { type: "recommended", isEnabled: t.length > 0 }
    ].filter((E) => E.isEnabled), f = new Set(m.map((E) => E.type)), w = c.filter((E) => f.has(E)).map((E) => ({ type: E, isEnabled: !0 })), S = m.filter(({ type: E }) => !w.some(({ type: A }) => A === E));
    return Array.from(new Set([...w, ...S].map(({ type: E }) => E)));
  }
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qa = globalThis, cd = qa.ShadowRoot && (qa.ShadyCSS === void 0 || qa.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ld = Symbol(), Lf = /* @__PURE__ */ new WeakMap();
let Vw = class {
  constructor(e, r, s) {
    if (this._$cssResult$ = !0, s !== ld) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (cd && e === void 0) {
      const s = r !== void 0 && r.length === 1;
      s && (e = Lf.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Lf.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const dr = (t) => new Vw(typeof t == "string" ? t : t + "", void 0, ld), Kn = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((s, n, i) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[i + 1], t[0]);
  return new Vw(r, t, ld);
}, Rk = (t, e) => {
  if (cd) t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const s = document.createElement("style"), n = qa.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = r.cssText, t.appendChild(s);
  }
}, Mf = cd ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const s of e.cssRules) r += s.cssText;
  return dr(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Pk, defineProperty: xk, getOwnPropertyDescriptor: Dk, getOwnPropertyNames: kk, getOwnPropertySymbols: $k, getPrototypeOf: Uk } = Object, Is = globalThis, Ff = Is.trustedTypes, Lk = Ff ? Ff.emptyScript : "", $l = Is.reactiveElementPolyfillSupport, Yi = (t, e) => t, xu = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Lk : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch (s) {
        r = null;
      }
  }
  return r;
} }, Kw = (t, e) => !Pk(t, e), Bf = { attribute: !0, type: String, converter: xu, reflect: !1, useDefault: !1, hasChanged: Kw };
var Zf, Jf;
(Zf = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (Jf = Is.litPropertyMetadata) != null || (Is.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let qn = class extends HTMLElement {
  static addInitializer(e) {
    var r;
    this._$Ei(), ((r = this.l) != null ? r : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = Bf) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(e, s, r);
      n !== void 0 && xk(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, r, s) {
    var o;
    const { get: n, set: i } = (o = Dk(this.prototype, e)) != null ? o : { get() {
      return this[r];
    }, set(a) {
      this[r] = a;
    } };
    return { get: n, set(a) {
      const c = n == null ? void 0 : n.call(this);
      i == null || i.call(this, a), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var r;
    return (r = this.elementProperties.get(e)) != null ? r : Bf;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Yi("elementProperties"))) return;
    const e = Uk(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Yi("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Yi("properties"))) {
      const r = this.properties, s = [...kk(r), ...$k(r)];
      for (const n of s) this.createProperty(n, r[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const r = litPropertyMetadata.get(e);
      if (r !== void 0) for (const [s, n] of r) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, s] of this.elementProperties) {
      const n = this._$Eu(r, s);
      n !== void 0 && this._$Eh.set(n, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const n of s) r.unshift(Mf(n));
    } else e !== void 0 && r.push(Mf(e));
    return r;
  }
  static _$Eu(e, r) {
    const s = r.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((r) => r(this));
  }
  addController(e) {
    var r, s;
    ((r = this._$EO) != null ? r : this._$EO = /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e));
  }
  removeController(e) {
    var r;
    (r = this._$EO) == null || r.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const s of r.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    var r;
    const e = (r = this.shadowRoot) != null ? r : this.attachShadow(this.constructor.shadowRootOptions);
    return Rk(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, r;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (r = this._$EO) == null || r.forEach((s) => {
      var n;
      return (n = s.hostConnected) == null ? void 0 : n.call(s);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((r) => {
      var s;
      return (s = r.hostDisconnected) == null ? void 0 : s.call(r);
    });
  }
  attributeChangedCallback(e, r, s) {
    this._$AK(e, s);
  }
  _$ET(e, r) {
    var i;
    const s = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (((i = s.converter) == null ? void 0 : i.toAttribute) !== void 0 ? s.converter : xu).toAttribute(r, s.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, r) {
    var i, o, a, c;
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const l = s.getPropertyOptions(n), u = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((i = l.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? l.converter : xu;
      this._$Em = n, this[n] = (c = (a = u.fromAttribute(r, l.type)) != null ? a : (o = this._$Ej) == null ? void 0 : o.get(n)) != null ? c : null, this._$Em = null;
    }
  }
  requestUpdate(e, r, s) {
    var n, i;
    if (e !== void 0) {
      const o = this.constructor, a = this[e];
      if (s != null || (s = o.getPropertyOptions(e)), !(((n = s.hasChanged) != null ? n : Kw)(a, r) || s.useDefault && s.reflect && a === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, r, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, r, { useDefault: s, reflect: n, wrapped: i }, o) {
    var a, c, l;
    s && !((a = this._$Ej) != null ? a : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (c = o != null ? o : r) != null ? c : this[e]), i !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (r = void 0), this._$AL.set(e, r)), n === !0 && this._$Em !== e && ((l = this._$Eq) != null ? l : this._$Eq = /* @__PURE__ */ new Set()).add(e));
  }
  _$EP() {
    return h(this, null, function* () {
      this.isUpdatePending = !0;
      try {
        yield this._$ES;
      } catch (r) {
        Promise.reject(r);
      }
      const e = this.scheduleUpdate();
      return e != null && (yield e), !this.isUpdatePending;
    });
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s, n;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((s = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, a] of i) {
        const { wrapped: c } = a, l = this[o];
        c !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, a, l);
      }
    }
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), (n = this._$EO) == null || n.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(r)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var r;
    (r = this._$EO) == null || r.forEach((s) => {
      var n;
      return (n = s.hostUpdated) == null ? void 0 : n.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
var Xf;
qn.elementStyles = [], qn.shadowRootOptions = { mode: "open" }, qn[Yi("elementProperties")] = /* @__PURE__ */ new Map(), qn[Yi("finalized")] = /* @__PURE__ */ new Map(), $l == null || $l({ ReactiveElement: qn }), ((Xf = Is.reactiveElementVersions) != null ? Xf : Is.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zi = globalThis, hc = Zi.trustedTypes, jf = hc ? hc.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Gw = "$lit$", Es = `lit$${Math.random().toFixed(9).slice(2)}$`, Yw = "?" + Es, Mk = `<${Yw}>`, un = document, Bo = () => un.createComment(""), jo = (t) => t === null || typeof t != "object" && typeof t != "function", ud = Array.isArray, Fk = (t) => ud(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Ul = `[ 	
\f\r]`, ki = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qf = /-->/g, zf = />/g, Ms = RegExp(`>|${Ul}(?:([^\\s"'>=/]+)(${Ul}*=${Ul}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Wf = /'/g, Hf = /"/g, Zw = /^(?:script|style|textarea|title)$/i, Jw = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), oU = Jw(1), aU = Jw(2), ai = Symbol.for("lit-noChange"), dt = Symbol.for("lit-nothing"), Vf = /* @__PURE__ */ new WeakMap(), Gs = un.createTreeWalker(un, 129);
function Xw(t, e) {
  if (!ud(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return jf !== void 0 ? jf.createHTML(e) : e;
}
const Bk = (t, e) => {
  const r = t.length - 1, s = [];
  let n, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = ki;
  for (let a = 0; a < r; a++) {
    const c = t[a];
    let l, u, d = -1, p = 0;
    for (; p < c.length && (o.lastIndex = p, u = o.exec(c), u !== null); ) p = o.lastIndex, o === ki ? u[1] === "!--" ? o = qf : u[1] !== void 0 ? o = zf : u[2] !== void 0 ? (Zw.test(u[2]) && (n = RegExp("</" + u[2], "g")), o = Ms) : u[3] !== void 0 && (o = Ms) : o === Ms ? u[0] === ">" ? (o = n != null ? n : ki, d = -1) : u[1] === void 0 ? d = -2 : (d = o.lastIndex - u[2].length, l = u[1], o = u[3] === void 0 ? Ms : u[3] === '"' ? Hf : Wf) : o === Hf || o === Wf ? o = Ms : o === qf || o === zf ? o = ki : (o = Ms, n = void 0);
    const g = o === Ms && t[a + 1].startsWith("/>") ? " " : "";
    i += o === ki ? c + Mk : d >= 0 ? (s.push(l), c.slice(0, d) + Gw + c.slice(d) + Es + g) : c + Es + (d === -2 ? a : g);
  }
  return [Xw(t, i + (t[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class qo {
  constructor({ strings: e, _$litType$: r }, s) {
    let n;
    this.parts = [];
    let i = 0, o = 0;
    const a = e.length - 1, c = this.parts, [l, u] = Bk(e, r);
    if (this.el = qo.createElement(l, s), Gs.currentNode = this.el.content, r === 2 || r === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = Gs.nextNode()) !== null && c.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Gw)) {
          const p = u[o++], g = n.getAttribute(d).split(Es), m = /([.?@])?(.*)/.exec(p);
          c.push({ type: 1, index: i, name: m[2], strings: g, ctor: m[1] === "." ? qk : m[1] === "?" ? zk : m[1] === "@" ? Wk : kc }), n.removeAttribute(d);
        } else d.startsWith(Es) && (c.push({ type: 6, index: i }), n.removeAttribute(d));
        if (Zw.test(n.tagName)) {
          const d = n.textContent.split(Es), p = d.length - 1;
          if (p > 0) {
            n.textContent = hc ? hc.emptyScript : "";
            for (let g = 0; g < p; g++) n.append(d[g], Bo()), Gs.nextNode(), c.push({ type: 2, index: ++i });
            n.append(d[p], Bo());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Yw) c.push({ type: 2, index: i });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(Es, d + 1)) !== -1; ) c.push({ type: 7, index: i }), d += Es.length - 1;
      }
      i++;
    }
  }
  static createElement(e, r) {
    const s = un.createElement("template");
    return s.innerHTML = e, s;
  }
}
function ci(t, e, r = t, s) {
  var o, a, c;
  if (e === ai) return e;
  let n = s !== void 0 ? (o = r._$Co) == null ? void 0 : o[s] : r._$Cl;
  const i = jo(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== i && ((a = n == null ? void 0 : n._$AO) == null || a.call(n, !1), i === void 0 ? n = void 0 : (n = new i(t), n._$AT(t, r, s)), s !== void 0 ? ((c = r._$Co) != null ? c : r._$Co = [])[s] = n : r._$Cl = n), n !== void 0 && (e = ci(t, n._$AS(t, e.values), n, s)), e;
}
class jk {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var l;
    const { el: { content: r }, parts: s } = this._$AD, n = ((l = e == null ? void 0 : e.creationScope) != null ? l : un).importNode(r, !0);
    Gs.currentNode = n;
    let i = Gs.nextNode(), o = 0, a = 0, c = s[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let u;
        c.type === 2 ? u = new ia(i, i.nextSibling, this, e) : c.type === 1 ? u = new c.ctor(i, c.name, c.strings, this, e) : c.type === 6 && (u = new Hk(i, this, e)), this._$AV.push(u), c = s[++a];
      }
      o !== (c == null ? void 0 : c.index) && (i = Gs.nextNode(), o++);
    }
    return Gs.currentNode = un, n;
  }
  p(e) {
    let r = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, r), r += s.strings.length - 2) : s._$AI(e[r])), r++;
  }
}
class ia {
  get _$AU() {
    var e, r;
    return (r = (e = this._$AM) == null ? void 0 : e._$AU) != null ? r : this._$Cv;
  }
  constructor(e, r, s, n) {
    var i;
    this.type = 2, this._$AH = dt, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = s, this.options = n, this._$Cv = (i = n == null ? void 0 : n.isConnected) != null ? i : !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = ci(this, e, r), jo(e) ? e === dt || e == null || e === "" ? (this._$AH !== dt && this._$AR(), this._$AH = dt) : e !== this._$AH && e !== ai && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Fk(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== dt && jo(this._$AH) ? this._$AA.nextSibling.data = e : this.T(un.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: r, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = qo.createElement(Xw(s.h, s.h[0]), this.options)), s);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === n) this._$AH.p(r);
    else {
      const o = new jk(n, this), a = o.u(this.options);
      o.p(r), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let r = Vf.get(e.strings);
    return r === void 0 && Vf.set(e.strings, r = new qo(e)), r;
  }
  k(e) {
    ud(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let s, n = 0;
    for (const i of e) n === r.length ? r.push(s = new ia(this.O(Bo()), this.O(Bo()), this, this.options)) : s = r[n], s._$AI(i), n++;
    n < r.length && (this._$AR(s && s._$AB.nextSibling, n), r.length = n);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, r); e && e !== this._$AB; ) {
      const n = e.nextSibling;
      e.remove(), e = n;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cv = e, (r = this._$AP) == null || r.call(this, e));
  }
}
class kc {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, s, n, i) {
    this.type = 1, this._$AH = dt, this._$AN = void 0, this.element = e, this.name = r, this._$AM = n, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = dt;
  }
  _$AI(e, r = this, s, n) {
    const i = this.strings;
    let o = !1;
    if (i === void 0) e = ci(this, e, r, 0), o = !jo(e) || e !== this._$AH && e !== ai, o && (this._$AH = e);
    else {
      const a = e;
      let c, l;
      for (e = i[0], c = 0; c < i.length - 1; c++) l = ci(this, a[s + c], r, c), l === ai && (l = this._$AH[c]), o || (o = !jo(l) || l !== this._$AH[c]), l === dt ? e = dt : e !== dt && (e += (l != null ? l : "") + i[c + 1]), this._$AH[c] = l;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === dt ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class qk extends kc {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === dt ? void 0 : e;
  }
}
class zk extends kc {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== dt);
  }
}
class Wk extends kc {
  constructor(e, r, s, n, i) {
    super(e, r, s, n, i), this.type = 5;
  }
  _$AI(e, r = this) {
    var o;
    if ((e = (o = ci(this, e, r, 0)) != null ? o : dt) === ai) return;
    const s = this._$AH, n = e === dt && s !== dt || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, i = e !== dt && (s === dt || n);
    n && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (r = this.options) == null ? void 0 : r.host) != null ? s : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Hk {
  constructor(e, r, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ci(this, e);
  }
}
const Ll = Zi.litHtmlPolyfillSupport;
var Qf;
Ll == null || Ll(qo, ia), ((Qf = Zi.litHtmlVersions) != null ? Qf : Zi.litHtmlVersions = []).push("3.3.0");
const Vk = (t, e, r) => {
  var i, o;
  const s = (i = r == null ? void 0 : r.renderBefore) != null ? i : e;
  let n = s._$litPart$;
  if (n === void 0) {
    const a = (o = r == null ? void 0 : r.renderBefore) != null ? o : null;
    s._$litPart$ = n = new ia(e.insertBefore(Bo(), a), a, void 0, r != null ? r : {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qs = globalThis;
class za extends qn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r, s;
    const e = super.createRenderRoot();
    return (s = (r = this.renderOptions).renderBefore) != null || (r.renderBefore = e.firstChild), e;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Vk(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return ai;
  }
}
var eg;
za._$litElement$ = !0, za.finalized = !0, (eg = Qs.litElementHydrateSupport) == null || eg.call(Qs, { LitElement: za });
const Ml = Qs.litElementPolyfillSupport;
Ml == null || Ml({ LitElement: za });
var tg;
((tg = Qs.litElementVersions) != null ? tg : Qs.litElementVersions = []).push("4.2.0");
let Ji, Ns, Ts;
function cU(t, e) {
  Ji = document.createElement("style"), Ns = document.createElement("style"), Ts = document.createElement("style"), Ji.textContent = Gn(t).core.cssText, Ns.textContent = Gn(t).dark.cssText, Ts.textContent = Gn(t).light.cssText, document.head.appendChild(Ji), document.head.appendChild(Ns), document.head.appendChild(Ts), Qw(e);
}
function Qw(t) {
  Ns && Ts && (t === "light" ? (Ns.removeAttribute("media"), Ts.media = "enabled") : (Ts.removeAttribute("media"), Ns.media = "enabled"));
}
function Kk(t) {
  Ji && Ns && Ts && (Ji.textContent = Gn(t).core.cssText, Ns.textContent = Gn(t).dark.cssText, Ts.textContent = Gn(t).light.cssText);
}
function Gn(t) {
  return {
    core: Kn`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      @keyframes w3m-shake {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1) rotate(-1deg);
        }
        40% {
          transform: scale(1) rotate(1.5deg);
        }
        60% {
          transform: scale(1) rotate(-1.5deg);
        }
        80% {
          transform: scale(1) rotate(1deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes w3m-iframe-fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes w3m-iframe-zoom-in {
        0% {
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
      @keyframes w3m-iframe-zoom-in-mobile {
        0% {
          transform: scale(0.95);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      :root {
        --w3m-modal-width: 360px;
        --w3m-color-mix-strength: ${dr(t != null && t["--w3m-color-mix-strength"] ? `${t["--w3m-color-mix-strength"]}%` : "0%")};
        --w3m-font-family: ${dr((t == null ? void 0 : t["--w3m-font-family"]) || "Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;")};
        --w3m-font-size-master: ${dr((t == null ? void 0 : t["--w3m-font-size-master"]) || "10px")};
        --w3m-border-radius-master: ${dr((t == null ? void 0 : t["--w3m-border-radius-master"]) || "4px")};
        --w3m-z-index: ${dr((t == null ? void 0 : t["--w3m-z-index"]) || 999)};

        --wui-font-family: var(--w3m-font-family);

        --wui-font-size-mini: calc(var(--w3m-font-size-master) * 0.8);
        --wui-font-size-micro: var(--w3m-font-size-master);
        --wui-font-size-tiny: calc(var(--w3m-font-size-master) * 1.2);
        --wui-font-size-small: calc(var(--w3m-font-size-master) * 1.4);
        --wui-font-size-paragraph: calc(var(--w3m-font-size-master) * 1.6);
        --wui-font-size-medium: calc(var(--w3m-font-size-master) * 1.8);
        --wui-font-size-large: calc(var(--w3m-font-size-master) * 2);
        --wui-font-size-title-6: calc(var(--w3m-font-size-master) * 2.2);
        --wui-font-size-medium-title: calc(var(--w3m-font-size-master) * 2.4);
        --wui-font-size-2xl: calc(var(--w3m-font-size-master) * 4);

        --wui-border-radius-5xs: var(--w3m-border-radius-master);
        --wui-border-radius-4xs: calc(var(--w3m-border-radius-master) * 1.5);
        --wui-border-radius-3xs: calc(var(--w3m-border-radius-master) * 2);
        --wui-border-radius-xxs: calc(var(--w3m-border-radius-master) * 3);
        --wui-border-radius-xs: calc(var(--w3m-border-radius-master) * 4);
        --wui-border-radius-s: calc(var(--w3m-border-radius-master) * 5);
        --wui-border-radius-m: calc(var(--w3m-border-radius-master) * 7);
        --wui-border-radius-l: calc(var(--w3m-border-radius-master) * 9);
        --wui-border-radius-3xl: calc(var(--w3m-border-radius-master) * 20);

        --wui-font-weight-light: 400;
        --wui-font-weight-regular: 500;
        --wui-font-weight-medium: 600;
        --wui-font-weight-bold: 700;

        --wui-letter-spacing-2xl: -1.6px;
        --wui-letter-spacing-medium-title: -0.96px;
        --wui-letter-spacing-title-6: -0.88px;
        --wui-letter-spacing-large: -0.8px;
        --wui-letter-spacing-medium: -0.72px;
        --wui-letter-spacing-paragraph: -0.64px;
        --wui-letter-spacing-small: -0.56px;
        --wui-letter-spacing-tiny: -0.48px;
        --wui-letter-spacing-micro: -0.2px;
        --wui-letter-spacing-mini: -0.16px;

        --wui-spacing-0: 0px;
        --wui-spacing-4xs: 2px;
        --wui-spacing-3xs: 4px;
        --wui-spacing-xxs: 6px;
        --wui-spacing-2xs: 7px;
        --wui-spacing-xs: 8px;
        --wui-spacing-1xs: 10px;
        --wui-spacing-s: 12px;
        --wui-spacing-m: 14px;
        --wui-spacing-l: 16px;
        --wui-spacing-2l: 18px;
        --wui-spacing-xl: 20px;
        --wui-spacing-xxl: 24px;
        --wui-spacing-2xl: 32px;
        --wui-spacing-3xl: 40px;
        --wui-spacing-4xl: 90px;
        --wui-spacing-5xl: 95px;

        --wui-icon-box-size-xxs: 14px;
        --wui-icon-box-size-xs: 20px;
        --wui-icon-box-size-sm: 24px;
        --wui-icon-box-size-md: 32px;
        --wui-icon-box-size-mdl: 36px;
        --wui-icon-box-size-lg: 40px;
        --wui-icon-box-size-2lg: 48px;
        --wui-icon-box-size-xl: 64px;

        --wui-icon-size-inherit: inherit;
        --wui-icon-size-xxs: 10px;
        --wui-icon-size-xs: 12px;
        --wui-icon-size-sm: 14px;
        --wui-icon-size-md: 16px;
        --wui-icon-size-mdl: 18px;
        --wui-icon-size-lg: 20px;
        --wui-icon-size-xl: 24px;
        --wui-icon-size-xxl: 28px;

        --wui-wallet-image-size-inherit: inherit;
        --wui-wallet-image-size-sm: 40px;
        --wui-wallet-image-size-md: 56px;
        --wui-wallet-image-size-lg: 80px;

        --wui-visual-size-size-inherit: inherit;
        --wui-visual-size-sm: 40px;
        --wui-visual-size-md: 55px;
        --wui-visual-size-lg: 80px;

        --wui-box-size-md: 100px;
        --wui-box-size-lg: 120px;

        --wui-ease-out-power-2: cubic-bezier(0, 0, 0.22, 1);
        --wui-ease-out-power-1: cubic-bezier(0, 0, 0.55, 1);

        --wui-ease-in-power-3: cubic-bezier(0.66, 0, 1, 1);
        --wui-ease-in-power-2: cubic-bezier(0.45, 0, 1, 1);
        --wui-ease-in-power-1: cubic-bezier(0.3, 0, 1, 1);

        --wui-ease-inout-power-1: cubic-bezier(0.45, 0, 0.55, 1);

        --wui-duration-lg: 200ms;
        --wui-duration-md: 125ms;
        --wui-duration-sm: 75ms;

        --wui-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --wui-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --wui-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --wui-width-network-sm: 36px;
        --wui-width-network-md: 48px;
        --wui-width-network-lg: 86px;

        --wui-height-network-sm: 40px;
        --wui-height-network-md: 54px;
        --wui-height-network-lg: 96px;

        --wui-icon-size-network-xs: 12px;
        --wui-icon-size-network-sm: 16px;
        --wui-icon-size-network-md: 24px;
        --wui-icon-size-network-lg: 42px;

        --wui-color-inherit: inherit;

        --wui-color-inverse-100: #fff;
        --wui-color-inverse-000: #000;

        --wui-cover: rgba(20, 20, 20, 0.8);

        --wui-color-modal-bg: var(--wui-color-modal-bg-base);

        --wui-color-accent-100: var(--wui-color-accent-base-100);
        --wui-color-accent-090: var(--wui-color-accent-base-090);
        --wui-color-accent-080: var(--wui-color-accent-base-080);

        --wui-color-success-100: var(--wui-color-success-base-100);
        --wui-color-success-125: var(--wui-color-success-base-125);

        --wui-color-warning-100: var(--wui-color-warning-base-100);

        --wui-color-error-100: var(--wui-color-error-base-100);
        --wui-color-error-125: var(--wui-color-error-base-125);

        --wui-color-blue-100: var(--wui-color-blue-base-100);
        --wui-color-blue-90: var(--wui-color-blue-base-90);

        --wui-icon-box-bg-error-100: var(--wui-icon-box-bg-error-base-100);
        --wui-icon-box-bg-blue-100: var(--wui-icon-box-bg-blue-base-100);
        --wui-icon-box-bg-success-100: var(--wui-icon-box-bg-success-base-100);
        --wui-icon-box-bg-inverse-100: var(--wui-icon-box-bg-inverse-base-100);

        --wui-all-wallets-bg-100: var(--wui-all-wallets-bg-100);

        --wui-avatar-border: var(--wui-avatar-border-base);

        --wui-thumbnail-border: var(--wui-thumbnail-border-base);

        --wui-wallet-button-bg: var(--wui-wallet-button-bg-base);

        --wui-box-shadow-blue: var(--wui-color-accent-glass-020);
      }

      @supports (background: color-mix(in srgb, white 50%, black)) {
        :root {
          --wui-color-modal-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-modal-bg-base)
          );

          --wui-box-shadow-blue: color-mix(in srgb, var(--wui-color-accent-100) 20%, transparent);

          --wui-color-accent-100: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 100%,
            transparent
          );
          --wui-color-accent-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-glass-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-020: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 20%,
            transparent
          );
          --wui-color-accent-glass-015: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 15%,
            transparent
          );
          --wui-color-accent-glass-010: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 10%,
            transparent
          );
          --wui-color-accent-glass-005: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 5%,
            transparent
          );
          --wui-color-accent-002: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 2%,
            transparent
          );

          --wui-color-fg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-100)
          );
          --wui-color-fg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-125)
          );
          --wui-color-fg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-150)
          );
          --wui-color-fg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-175)
          );
          --wui-color-fg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-200)
          );
          --wui-color-fg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-225)
          );
          --wui-color-fg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-250)
          );
          --wui-color-fg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-275)
          );
          --wui-color-fg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-300)
          );
          --wui-color-fg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-325)
          );
          --wui-color-fg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-350)
          );

          --wui-color-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-100)
          );
          --wui-color-bg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-125)
          );
          --wui-color-bg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-150)
          );
          --wui-color-bg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-175)
          );
          --wui-color-bg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-200)
          );
          --wui-color-bg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-225)
          );
          --wui-color-bg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-250)
          );
          --wui-color-bg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-275)
          );
          --wui-color-bg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-300)
          );
          --wui-color-bg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-325)
          );
          --wui-color-bg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-350)
          );

          --wui-color-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-100)
          );
          --wui-color-success-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-125)
          );

          --wui-color-warning-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-warning-base-100)
          );

          --wui-color-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-100)
          );
          --wui-color-blue-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-100)
          );
          --wui-color-blue-90: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-90)
          );
          --wui-color-error-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-125)
          );

          --wui-icon-box-bg-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-error-base-100)
          );
          --wui-icon-box-bg-accent-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-blue-base-100)
          );
          --wui-icon-box-bg-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-success-base-100)
          );
          --wui-icon-box-bg-inverse-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-inverse-base-100)
          );

          --wui-all-wallets-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-all-wallets-bg-100)
          );

          --wui-avatar-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-avatar-border-base)
          );

          --wui-thumbnail-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-thumbnail-border-base)
          );

          --wui-wallet-button-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-wallet-button-bg-base)
          );
        }
      }
    `,
    light: Kn`
      :root {
        --w3m-color-mix: ${dr((t == null ? void 0 : t["--w3m-color-mix"]) || "#fff")};
        --w3m-accent: ${dr(ns(t, "dark")["--w3m-accent"])};
        --w3m-default: #fff;

        --wui-color-modal-bg-base: ${dr(ns(t, "dark")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(230, 100%, 67%, 1);
        --wui-color-blueberry-090: hsla(231, 76%, 61%, 1);
        --wui-color-blueberry-080: hsla(230, 59%, 55%, 1);
        --wui-color-blueberry-050: hsla(231, 100%, 70%, 0.1);

        --wui-color-fg-100: #e4e7e7;
        --wui-color-fg-125: #d0d5d5;
        --wui-color-fg-150: #a8b1b1;
        --wui-color-fg-175: #a8b0b0;
        --wui-color-fg-200: #949e9e;
        --wui-color-fg-225: #868f8f;
        --wui-color-fg-250: #788080;
        --wui-color-fg-275: #788181;
        --wui-color-fg-300: #6e7777;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #363636;

        --wui-color-bg-100: #141414;
        --wui-color-bg-125: #191a1a;
        --wui-color-bg-150: #1e1f1f;
        --wui-color-bg-175: #222525;
        --wui-color-bg-200: #272a2a;
        --wui-color-bg-225: #2c3030;
        --wui-color-bg-250: #313535;
        --wui-color-bg-275: #363b3b;
        --wui-color-bg-300: #3b4040;
        --wui-color-bg-325: #252525;
        --wui-color-bg-350: #ffffff;

        --wui-color-success-base-100: #26d962;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f25a67;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 217, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 217, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 217, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 217, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 217, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 217, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 217, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 217, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 217, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 217, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(242, 90, 103, 0.01);
        --wui-color-error-glass-002: rgba(242, 90, 103, 0.02);
        --wui-color-error-glass-005: rgba(242, 90, 103, 0.05);
        --wui-color-error-glass-010: rgba(242, 90, 103, 0.1);
        --wui-color-error-glass-015: rgba(242, 90, 103, 0.15);
        --wui-color-error-glass-020: rgba(242, 90, 103, 0.2);
        --wui-color-error-glass-025: rgba(242, 90, 103, 0.25);
        --wui-color-error-glass-030: rgba(242, 90, 103, 0.3);
        --wui-color-error-glass-060: rgba(242, 90, 103, 0.6);
        --wui-color-error-glass-080: rgba(242, 90, 103, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-color-gray-glass-001: rgba(255, 255, 255, 0.01);
        --wui-color-gray-glass-002: rgba(255, 255, 255, 0.02);
        --wui-color-gray-glass-005: rgba(255, 255, 255, 0.05);
        --wui-color-gray-glass-010: rgba(255, 255, 255, 0.1);
        --wui-color-gray-glass-015: rgba(255, 255, 255, 0.15);
        --wui-color-gray-glass-020: rgba(255, 255, 255, 0.2);
        --wui-color-gray-glass-025: rgba(255, 255, 255, 0.25);
        --wui-color-gray-glass-030: rgba(255, 255, 255, 0.3);
        --wui-color-gray-glass-060: rgba(255, 255, 255, 0.6);
        --wui-color-gray-glass-080: rgba(255, 255, 255, 0.8);
        --wui-color-gray-glass-090: rgba(255, 255, 255, 0.9);

        --wui-color-dark-glass-100: rgba(42, 42, 42, 1);

        --wui-icon-box-bg-error-base-100: #3c2426;
        --wui-icon-box-bg-blue-base-100: #20303f;
        --wui-icon-box-bg-success-base-100: #1f3a28;
        --wui-icon-box-bg-inverse-base-100: #243240;

        --wui-all-wallets-bg-100: #222b35;

        --wui-avatar-border-base: #252525;

        --wui-thumbnail-border-base: #252525;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --w3m-card-embedded-shadow-color: rgb(17 17 18 / 25%);
      }
    `,
    dark: Kn`
      :root {
        --w3m-color-mix: ${dr((t == null ? void 0 : t["--w3m-color-mix"]) || "#000")};
        --w3m-accent: ${dr(ns(t, "light")["--w3m-accent"])};
        --w3m-default: #000;

        --wui-color-modal-bg-base: ${dr(ns(t, "light")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(231, 100%, 70%, 1);
        --wui-color-blueberry-090: hsla(231, 97%, 72%, 1);
        --wui-color-blueberry-080: hsla(231, 92%, 74%, 1);

        --wui-color-fg-100: #141414;
        --wui-color-fg-125: #2d3131;
        --wui-color-fg-150: #474d4d;
        --wui-color-fg-175: #636d6d;
        --wui-color-fg-200: #798686;
        --wui-color-fg-225: #828f8f;
        --wui-color-fg-250: #8b9797;
        --wui-color-fg-275: #95a0a0;
        --wui-color-fg-300: #9ea9a9;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #d0d0d0;

        --wui-color-bg-100: #ffffff;
        --wui-color-bg-125: #f5fafa;
        --wui-color-bg-150: #f3f8f8;
        --wui-color-bg-175: #eef4f4;
        --wui-color-bg-200: #eaf1f1;
        --wui-color-bg-225: #e5eded;
        --wui-color-bg-250: #e1e9e9;
        --wui-color-bg-275: #dce7e7;
        --wui-color-bg-300: #d8e3e3;
        --wui-color-bg-325: #f3f3f3;
        --wui-color-bg-350: #202020;

        --wui-color-success-base-100: #26b562;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f05142;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 181, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 181, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 181, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 181, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 181, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 181, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 181, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 181, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 181, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 181, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(240, 81, 66, 0.01);
        --wui-color-error-glass-002: rgba(240, 81, 66, 0.02);
        --wui-color-error-glass-005: rgba(240, 81, 66, 0.05);
        --wui-color-error-glass-010: rgba(240, 81, 66, 0.1);
        --wui-color-error-glass-015: rgba(240, 81, 66, 0.15);
        --wui-color-error-glass-020: rgba(240, 81, 66, 0.2);
        --wui-color-error-glass-025: rgba(240, 81, 66, 0.25);
        --wui-color-error-glass-030: rgba(240, 81, 66, 0.3);
        --wui-color-error-glass-060: rgba(240, 81, 66, 0.6);
        --wui-color-error-glass-080: rgba(240, 81, 66, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-icon-box-bg-error-base-100: #f4dfdd;
        --wui-icon-box-bg-blue-base-100: #d9ecfb;
        --wui-icon-box-bg-success-base-100: #daf0e4;
        --wui-icon-box-bg-inverse-base-100: #dcecfc;

        --wui-all-wallets-bg-100: #e8f1fa;

        --wui-avatar-border-base: #f3f4f4;

        --wui-thumbnail-border-base: #eaefef;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --wui-color-gray-glass-001: rgba(0, 0, 0, 0.01);
        --wui-color-gray-glass-002: rgba(0, 0, 0, 0.02);
        --wui-color-gray-glass-005: rgba(0, 0, 0, 0.05);
        --wui-color-gray-glass-010: rgba(0, 0, 0, 0.1);
        --wui-color-gray-glass-015: rgba(0, 0, 0, 0.15);
        --wui-color-gray-glass-020: rgba(0, 0, 0, 0.2);
        --wui-color-gray-glass-025: rgba(0, 0, 0, 0.25);
        --wui-color-gray-glass-030: rgba(0, 0, 0, 0.3);
        --wui-color-gray-glass-060: rgba(0, 0, 0, 0.6);
        --wui-color-gray-glass-080: rgba(0, 0, 0, 0.8);
        --wui-color-gray-glass-090: rgba(0, 0, 0, 0.9);

        --wui-color-dark-glass-100: rgba(233, 233, 233, 1);

        --w3m-card-embedded-shadow-color: rgb(224 225 233 / 25%);
      }
    `
  };
}
const lU = Kn`
  *,
  *::after,
  *::before,
  :host {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-family: var(--wui-font-family);
    backface-visibility: hidden;
  }
`, uU = Kn`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      box-shadow var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border, box-shadow, border-radius;
    outline: none;
    border: none;
    column-gap: var(--wui-spacing-3xs);
    background-color: transparent;
    text-decoration: none;
  }

  wui-flex {
    transition: border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius;
  }

  button:disabled > wui-wallet-image,
  button:disabled > wui-all-wallets-image,
  button:disabled > wui-network-image,
  button:disabled > wui-image,
  button:disabled > wui-transaction-visual,
  button:disabled > wui-logo {
    filter: grayscale(1);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-005);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }
  }

  button:disabled > wui-icon-box {
    opacity: 0.5;
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`, dU = Kn`
  .wui-color-inherit {
    color: var(--wui-color-inherit);
  }

  .wui-color-accent-100 {
    color: var(--wui-color-accent-100);
  }

  .wui-color-error-100 {
    color: var(--wui-color-error-100);
  }

  .wui-color-blue-100 {
    color: var(--wui-color-blue-100);
  }

  .wui-color-blue-90 {
    color: var(--wui-color-blue-90);
  }

  .wui-color-error-125 {
    color: var(--wui-color-error-125);
  }

  .wui-color-success-100 {
    color: var(--wui-color-success-100);
  }

  .wui-color-success-125 {
    color: var(--wui-color-success-125);
  }

  .wui-color-inverse-100 {
    color: var(--wui-color-inverse-100);
  }

  .wui-color-inverse-000 {
    color: var(--wui-color-inverse-000);
  }

  .wui-color-fg-100 {
    color: var(--wui-color-fg-100);
  }

  .wui-color-fg-200 {
    color: var(--wui-color-fg-200);
  }

  .wui-color-fg-300 {
    color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    color: var(--wui-color-fg-350);
  }

  .wui-bg-color-inherit {
    background-color: var(--wui-color-inherit);
  }

  .wui-bg-color-blue-100 {
    background-color: var(--wui-color-accent-100);
  }

  .wui-bg-color-error-100 {
    background-color: var(--wui-color-error-100);
  }

  .wui-bg-color-error-125 {
    background-color: var(--wui-color-error-125);
  }

  .wui-bg-color-success-100 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-success-125 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-inverse-100 {
    background-color: var(--wui-color-inverse-100);
  }

  .wui-bg-color-inverse-000 {
    background-color: var(--wui-color-inverse-000);
  }

  .wui-bg-color-fg-100 {
    background-color: var(--wui-color-fg-100);
  }

  .wui-bg-color-fg-200 {
    background-color: var(--wui-color-fg-200);
  }

  .wui-bg-color-fg-300 {
    background-color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    background-color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    background-color: var(--wui-color-fg-350);
  }
`, Bi = {
  ERROR_CODE_UNRECOGNIZED_CHAIN_ID: 4902,
  ERROR_CODE_DEFAULT: 5e3,
  ERROR_INVALID_CHAIN_ID: 32603,
  DEFAULT_ALLOWED_ANCESTORS: [
    "http://localhost:*",
    "https://*.pages.dev",
    "https://*.vercel.app",
    "https://*.ngrok-free.app",
    "https://secure-mobile.walletconnect.com",
    "https://secure-mobile.walletconnect.org"
  ]
}, Gk = /* @__PURE__ */ rD({
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://eth.merkle.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    ensUniversalResolver: {
      address: "0xce01f8eee7E479C928F8919abD53E553a36CeF67",
      blockCreated: 19258213
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
});
function oa(t) {
  return C({
    formatters: void 0,
    fees: void 0,
    serializers: void 0
  }, t);
}
const Kf = oa({
  id: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  name: "Solana",
  network: "solana-mainnet",
  nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  blockExplorers: { default: { name: "Solscan", url: "https://solscan.io" } },
  testnet: !1,
  chainNamespace: "solana",
  caipNetworkId: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  deprecatedCaipNetworkId: "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ"
}), Gf = oa({
  id: "EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  name: "Solana Devnet",
  network: "solana-devnet",
  nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  blockExplorers: { default: { name: "Solscan", url: "https://solscan.io" } },
  testnet: !0,
  chainNamespace: "solana",
  caipNetworkId: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  deprecatedCaipNetworkId: "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K"
});
oa({
  id: "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
  name: "Solana Testnet",
  network: "solana-testnet",
  nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  blockExplorers: { default: { name: "Solscan", url: "https://solscan.io" } },
  testnet: !0,
  chainNamespace: "solana",
  caipNetworkId: "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z"
});
oa({
  id: "000000000019d6689c085ae165831e93",
  caipNetworkId: "bip122:000000000019d6689c085ae165831e93",
  chainNamespace: "bip122",
  name: "Bitcoin",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8
  },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  }
});
oa({
  id: "000000000933ea01ad0ee984209779ba",
  caipNetworkId: "bip122:000000000933ea01ad0ee984209779ba",
  chainNamespace: "bip122",
  name: "Bitcoin Testnet",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8
  },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  testnet: !0
});
const Yk = {
  solana: [
    "solana_signMessage",
    "solana_signTransaction",
    "solana_requestAccounts",
    "solana_getAccounts",
    "solana_signAllTransactions",
    "solana_signAndSendTransaction"
  ],
  eip155: [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendRawTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "personal_sign",
    "wallet_switchEthereumChain",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_requestPermissions",
    "wallet_registerOnboarding",
    "wallet_watchAsset",
    "wallet_scanQRCode",
    // EIP-5792
    "wallet_getCallsStatus",
    "wallet_showCallsStatus",
    "wallet_sendCalls",
    "wallet_getCapabilities",
    // EIP-7715
    "wallet_grantPermissions",
    "wallet_revokePermissions",
    //EIP-7811
    "wallet_getAssets"
  ],
  bip122: ["sendTransfer", "signMessage", "signPsbt", "getAccountAddresses"]
}, Wa = {
  getMethodsByChainNamespace(t) {
    return Yk[t] || [];
  },
  createDefaultNamespace(t) {
    return {
      methods: this.getMethodsByChainNamespace(t),
      events: ["accountsChanged", "chainChanged"],
      chains: [],
      rpcMap: {}
    };
  },
  applyNamespaceOverrides(t, e) {
    if (!e)
      return C({}, t);
    const r = C({}, t), s = /* @__PURE__ */ new Set();
    if (e.methods && Object.keys(e.methods).forEach((n) => s.add(n)), e.chains && Object.keys(e.chains).forEach((n) => s.add(n)), e.events && Object.keys(e.events).forEach((n) => s.add(n)), e.rpcMap && Object.keys(e.rpcMap).forEach((n) => {
      const [i] = n.split(":");
      i && s.add(i);
    }), s.forEach((n) => {
      r[n] || (r[n] = this.createDefaultNamespace(n));
    }), e.methods && Object.entries(e.methods).forEach(([n, i]) => {
      r[n] && (r[n].methods = i);
    }), e.chains && Object.entries(e.chains).forEach(([n, i]) => {
      r[n] && (r[n].chains = i);
    }), e.events && Object.entries(e.events).forEach(([n, i]) => {
      r[n] && (r[n].events = i);
    }), e.rpcMap) {
      const n = /* @__PURE__ */ new Set();
      Object.entries(e.rpcMap).forEach(([i, o]) => {
        const [a, c] = i.split(":");
        !a || !c || !r[a] || (r[a].rpcMap || (r[a].rpcMap = {}), n.has(a) || (r[a].rpcMap = {}, n.add(a)), r[a].rpcMap[c] = o);
      });
    }
    return r;
  },
  createNamespaces(t, e) {
    const r = t.reduce((s, n) => {
      const { id: i, chainNamespace: o, rpcUrls: a } = n, c = a.default.http[0];
      s[o] || (s[o] = this.createDefaultNamespace(o));
      const l = `${o}:${i}`, u = s[o];
      switch (u.chains.push(l), l) {
        case Kf.caipNetworkId:
          u.chains.push(Kf.deprecatedCaipNetworkId);
          break;
        case Gf.caipNetworkId:
          u.chains.push(Gf.deprecatedCaipNetworkId);
          break;
      }
      return u != null && u.rpcMap && c && (u.rpcMap[i] = c), s;
    }, {});
    return this.applyNamespaceOverrides(r, e);
  },
  resolveReownName: (t) => h(null, null, function* () {
    var s;
    const e = yield Lw.resolveName(t);
    return ((s = (Object.values(e == null ? void 0 : e.addresses) || [])[0]) == null ? void 0 : s.address) || !1;
  }),
  getChainsFromNamespaces(t = {}) {
    return Object.values(t).flatMap((e) => {
      const r = e.chains || [], s = e.accounts.map((n) => {
        const [i, o] = n.split(":");
        return `${i}:${o}`;
      });
      return Array.from(/* @__PURE__ */ new Set([...r, ...s]));
    });
  },
  isSessionEventData(t) {
    return typeof t == "object" && t !== null && "id" in t && "topic" in t && "params" in t && typeof t.params == "object" && t.params !== null && "chainId" in t.params && "event" in t.params && typeof t.params.event == "object" && t.params.event !== null;
  },
  isOriginAllowed(t, e, r) {
    for (const s of [...e, ...r])
      if (s.includes("*")) {
        const i = `^${s.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&").replace(/\\\*/gu, ".*")}$`;
        if (new RegExp(i, "u").test(t))
          return !0;
      } else if (s === t)
        return !0;
    return !1;
  }
};
class ey {
  constructor({ provider: e, namespace: r }) {
    this.id = se.CONNECTOR_ID.WALLET_CONNECT, this.name = tc.ConnectorNamesMap[se.CONNECTOR_ID.WALLET_CONNECT], this.type = "WALLET_CONNECT", this.imageId = tc.ConnectorImageIds[se.CONNECTOR_ID.WALLET_CONNECT], this.getCaipNetworks = R.getCaipNetworks.bind(R), this.caipNetworks = this.getCaipNetworks(), this.provider = e, this.chain = r;
  }
  get chains() {
    return this.getCaipNetworks();
  }
  connectWalletConnect() {
    return h(this, null, function* () {
      if (!(yield this.authenticate())) {
        const r = this.getCaipNetworks(), s = q.state.universalProviderConfigOverride, n = Wa.createNamespaces(r, s);
        yield this.provider.connect({ optionalNamespaces: n });
      }
      return {
        clientId: yield this.provider.client.core.crypto.getClientId(),
        session: this.provider.session
      };
    });
  }
  disconnect() {
    return h(this, null, function* () {
      yield this.provider.disconnect();
    });
  }
  authenticate() {
    return h(this, null, function* () {
      const e = this.chains.map((r) => r.caipNetworkId);
      return Vi.universalProviderAuthenticate({
        universalProvider: this.provider,
        chains: e,
        methods: Zk
      });
    });
  }
}
const Zk = [
  "eth_accounts",
  "eth_requestAccounts",
  "eth_sendRawTransaction",
  "eth_sign",
  "eth_signTransaction",
  "eth_signTypedData",
  "eth_signTypedData_v3",
  "eth_signTypedData_v4",
  "eth_sendTransaction",
  "personal_sign",
  "wallet_switchEthereumChain",
  "wallet_addEthereumChain",
  "wallet_getPermissions",
  "wallet_requestPermissions",
  "wallet_registerOnboarding",
  "wallet_watchAsset",
  "wallet_scanQRCode",
  // EIP-5792
  "wallet_getCallsStatus",
  "wallet_sendCalls",
  "wallet_getCapabilities",
  // EIP-7715
  "wallet_grantPermissions",
  "wallet_revokePermissions",
  //EIP-7811
  "wallet_getAssets"
];
class Jk {
  /**
   * Creates an instance of AdapterBlueprint.
   * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
   */
  constructor(e) {
    this.availableConnectors = [], this.eventListeners = /* @__PURE__ */ new Map(), this.getCaipNetworks = (r) => R.getCaipNetworks(r), e && this.construct(e);
  }
  /**
   * Initializes the adapter with the given parameters.
   * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
   */
  construct(e) {
    this.projectId = e.projectId, this.namespace = e.namespace, this.adapterType = e.adapterType;
  }
  /**
   * Gets the available connectors.
   * @returns {Connector[]} An array of available connectors
   */
  get connectors() {
    return this.availableConnectors;
  }
  /**
   * Gets the supported networks.
   * @returns {CaipNetwork[]} An array of supported networks
   */
  get networks() {
    return this.getCaipNetworks(this.namespace);
  }
  /**
   * Sets the auth provider.
   * @param {W3mFrameProvider} authProvider - The auth provider instance
   */
  setAuthProvider(e) {
    this.addConnector({
      id: se.CONNECTOR_ID.AUTH,
      type: "AUTH",
      name: se.CONNECTOR_NAMES.AUTH,
      provider: e,
      imageId: tc.ConnectorImageIds[se.CONNECTOR_ID.AUTH],
      chain: this.namespace,
      chains: []
    });
  }
  /**
   * Adds one or more connectors to the available connectors list.
   * @param {...Connector} connectors - The connectors to add
   */
  addConnector(...e) {
    const r = /* @__PURE__ */ new Set();
    this.availableConnectors = [...e, ...this.availableConnectors].filter((s) => r.has(s.id) ? !1 : (r.add(s.id), !0)), this.emit("connectors", this.availableConnectors);
  }
  setStatus(e, r) {
    ne.setStatus(e, r);
  }
  /**
   * Adds an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be called when the event is emitted
   */
  on(e, r) {
    var s;
    this.eventListeners.has(e) || this.eventListeners.set(e, /* @__PURE__ */ new Set()), (s = this.eventListeners.get(e)) == null || s.add(r);
  }
  /**
   * Removes an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be removed
   */
  off(e, r) {
    const s = this.eventListeners.get(e);
    s && s.delete(r);
  }
  /**
   * Removes all event listeners.
   */
  removeAllEventListeners() {
    this.eventListeners.forEach((e) => {
      e.clear();
    });
  }
  /**
   * Emits an event with the given name and optional data.
   * @template T
   * @param {T} eventName - The name of the event to emit
   * @param {EventData[T]} [data] - The optional data to be passed to the event listeners
   */
  emit(e, r) {
    const s = this.eventListeners.get(e);
    s && s.forEach((n) => n(r));
  }
  /**
   * Connects to WalletConnect.
   * @param {number | string} [_chainId] - Optional chain ID to connect to
   */
  connectWalletConnect(e) {
    return h(this, null, function* () {
      return { clientId: (yield this.getWalletConnectConnector().connectWalletConnect()).clientId };
    });
  }
  /**
   * Switches the network.
   * @param {AdapterBlueprint.SwitchNetworkParams} params - Network switching parameters
   */
  switchNetwork(e) {
    return h(this, null, function* () {
      var i;
      const { caipNetwork: r, providerType: s } = e;
      if (!e.provider)
        return;
      const n = "provider" in e.provider ? e.provider.provider : e.provider;
      if (s === "WALLET_CONNECT") {
        n.setDefaultChain(r.caipNetworkId);
        return;
      }
      if (n && s === "AUTH") {
        const o = n, a = (i = ne.state.preferredAccountTypes) == null ? void 0 : i[r.chainNamespace];
        yield o.switchNetwork(r.caipNetworkId);
        const c = yield o.getUser({
          chainId: r.caipNetworkId,
          preferredAccountType: a
        });
        this.emit("switchNetwork", c);
      }
    });
  }
  getWalletConnectConnector() {
    const e = this.connectors.find((r) => r instanceof ey);
    if (!e)
      throw new Error("WalletConnectConnector not found");
    return e;
  }
}
class Xk extends Jk {
  setUniversalProvider(e) {
    this.addConnector(new ey({
      provider: e,
      caipNetworks: this.getCaipNetworks(),
      namespace: this.namespace
    }));
  }
  connect(e) {
    return h(this, null, function* () {
      return Promise.resolve({
        id: "WALLET_CONNECT",
        type: "WALLET_CONNECT",
        chainId: Number(e.chainId),
        provider: this.provider,
        address: ""
      });
    });
  }
  disconnect() {
    return h(this, null, function* () {
      try {
        yield this.getWalletConnectConnector().disconnect();
      } catch (e) {
        console.warn("UniversalAdapter:disconnect - error", e);
      }
    });
  }
  getAccounts(r) {
    return h(this, arguments, function* ({ namespace: e }) {
      var i, o, a, c;
      const s = this.provider, n = ((c = (a = (o = (i = s == null ? void 0 : s.session) == null ? void 0 : i.namespaces) == null ? void 0 : o[e]) == null ? void 0 : a.accounts) == null ? void 0 : c.map((l) => {
        const [, , u] = l.split(":");
        return u;
      }).filter((l, u, d) => d.indexOf(l) === u)) || [];
      return Promise.resolve({
        accounts: n.map((l) => he.createAccount(e, l, e === "bip122" ? "payment" : "eoa"))
      });
    });
  }
  syncConnectors() {
    return h(this, null, function* () {
      return Promise.resolve();
    });
  }
  getBalance(e) {
    return h(this, null, function* () {
      var i, o, a, c, l;
      if (!(e.caipNetwork && vt.BALANCE_SUPPORTED_CHAINS.includes((i = e.caipNetwork) == null ? void 0 : i.chainNamespace)) || (o = e.caipNetwork) != null && o.testnet)
        return {
          balance: "0.00",
          symbol: ((a = e.caipNetwork) == null ? void 0 : a.nativeCurrency.symbol) || ""
        };
      if (ne.state.balanceLoading && e.chainId === ((c = R.state.activeCaipNetwork) == null ? void 0 : c.id))
        return {
          balance: ne.state.balance || "0.00",
          symbol: ne.state.balanceSymbol || ""
        };
      const n = (yield ne.fetchTokenBalance()).find((u) => {
        var d, p;
        return u.chainId === `${(d = e.caipNetwork) == null ? void 0 : d.chainNamespace}:${e.chainId}` && u.symbol === ((p = e.caipNetwork) == null ? void 0 : p.nativeCurrency.symbol);
      });
      return {
        balance: (n == null ? void 0 : n.quantity.numeric) || "0.00",
        symbol: (n == null ? void 0 : n.symbol) || ((l = e.caipNetwork) == null ? void 0 : l.nativeCurrency.symbol) || ""
      };
    });
  }
  signMessage(e) {
    return h(this, null, function* () {
      var o, a, c;
      const { provider: r, message: s, address: n } = e;
      if (!r)
        throw new Error("UniversalAdapter:signMessage - provider is undefined");
      let i = "";
      return ((o = R.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace) === se.CHAIN.SOLANA ? i = (yield r.request({
        method: "solana_signMessage",
        params: {
          message: em.encode(new TextEncoder().encode(s)),
          pubkey: n
        }
      }, (a = R.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId)).signature : i = yield r.request({
        method: "personal_sign",
        params: [s, n]
      }, (c = R.state.activeCaipNetwork) == null ? void 0 : c.caipNetworkId), { signature: i };
    });
  }
  // -- Transaction methods ---------------------------------------------------
  /**
   *
   * These methods are supported only on `wagmi` and `ethers` since the Solana SDK does not support them in the same way.
   * These function definition is to have a type parity between the clients. Currently not in use.
   */
  estimateGas() {
    return h(this, null, function* () {
      return Promise.resolve({
        gas: BigInt(0)
      });
    });
  }
  sendTransaction() {
    return h(this, null, function* () {
      return Promise.resolve({
        hash: ""
      });
    });
  }
  walletGetAssets(e) {
    return Promise.resolve({});
  }
  writeContract() {
    return h(this, null, function* () {
      return Promise.resolve({
        hash: ""
      });
    });
  }
  parseUnits() {
    return /* @__PURE__ */ BigInt(0);
  }
  formatUnits() {
    return "0";
  }
  getCapabilities() {
    return h(this, null, function* () {
      return Promise.resolve({});
    });
  }
  grantPermissions() {
    return h(this, null, function* () {
      return Promise.resolve({});
    });
  }
  revokePermissions() {
    return h(this, null, function* () {
      return Promise.resolve("0x");
    });
  }
  syncConnection() {
    return h(this, null, function* () {
      return Promise.resolve({
        id: "WALLET_CONNECT",
        type: "WALLET_CONNECT",
        chainId: 1,
        provider: this.provider,
        address: ""
      });
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  switchNetwork(e) {
    return h(this, null, function* () {
      var n, i, o, a, c, l;
      const { caipNetwork: r } = e, s = this.getWalletConnectConnector();
      if (r.chainNamespace === se.CHAIN.EVM)
        try {
          yield (n = s.provider) == null ? void 0 : n.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Af(r.id) }]
          });
        } catch (u) {
          if (u.code === Bi.ERROR_CODE_UNRECOGNIZED_CHAIN_ID || u.code === Bi.ERROR_INVALID_CHAIN_ID || u.code === Bi.ERROR_CODE_DEFAULT || ((o = (i = u == null ? void 0 : u.data) == null ? void 0 : i.originalError) == null ? void 0 : o.code) === Bi.ERROR_CODE_UNRECOGNIZED_CHAIN_ID)
            try {
              yield (l = s.provider) == null ? void 0 : l.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: Af(r.id),
                    rpcUrls: [(a = r == null ? void 0 : r.rpcUrls.chainDefault) == null ? void 0 : a.http],
                    chainName: r.name,
                    nativeCurrency: r.nativeCurrency,
                    blockExplorerUrls: [(c = r.blockExplorers) == null ? void 0 : c.default.url]
                  }
                ]
              });
            } catch (d) {
              throw new Error("Chain is not supported");
            }
        }
      s.provider.setDefaultChain(r.caipNetworkId);
    });
  }
  getWalletConnectProvider() {
    const e = this.connectors.find((s) => s.type === "WALLET_CONNECT");
    return e == null ? void 0 : e.provider;
  }
}
class Qk {
  constructor(e) {
    this.chainNamespaces = [], this.reportedAlertErrors = {}, this.getCaipNetwork = (r, s) => {
      var n, i, o, a;
      if (r) {
        const c = (i = (n = R.getNetworkData(r)) == null ? void 0 : n.requestedCaipNetworks) == null ? void 0 : i.find((u) => u.id === s);
        if (c)
          return c;
        const l = (o = R.getNetworkData(r)) == null ? void 0 : o.caipNetwork;
        return l || ((a = R.getRequestedCaipNetworks(r).filter((u) => u.chainNamespace === r)) == null ? void 0 : a[0]);
      }
      return R.state.activeCaipNetwork || this.defaultCaipNetwork;
    }, this.getCaipNetworkId = () => {
      const r = this.getCaipNetwork();
      if (r)
        return r.id;
    }, this.getCaipNetworks = (r) => R.getCaipNetworks(r), this.getActiveChainNamespace = () => R.state.activeChain, this.setRequestedCaipNetworks = (r, s) => {
      R.setRequestedCaipNetworks(r, s);
    }, this.getApprovedCaipNetworkIds = () => R.getAllApprovedCaipNetworkIds(), this.getCaipAddress = (r) => R.state.activeChain === r || !r ? R.state.activeCaipAddress : R.getAccountProp("caipAddress", r), this.setClientId = (r) => {
      de.setClientId(r);
    }, this.getProvider = (r) => Ue.getProvider(r), this.getProviderType = (r) => Ue.getProviderId(r), this.getPreferredAccountType = (r) => {
      var s;
      return (s = ne.state.preferredAccountTypes) == null ? void 0 : s[r];
    }, this.setCaipAddress = (r, s) => {
      ne.setCaipAddress(r, s);
    }, this.setBalance = (r, s, n) => {
      ne.setBalance(r, s, n);
    }, this.setProfileName = (r, s) => {
      ne.setProfileName(r, s);
    }, this.setProfileImage = (r, s) => {
      ne.setProfileImage(r, s);
    }, this.setUser = (r, s) => {
      ne.setUser(r, s), q.state.enableEmbedded && et.close();
    }, this.resetAccount = (r) => {
      ne.resetAccount(r);
    }, this.setCaipNetwork = (r) => {
      R.setActiveCaipNetwork(r);
    }, this.setCaipNetworkOfNamespace = (r, s) => {
      R.setChainNetworkData(s, { caipNetwork: r });
    }, this.setAllAccounts = (r, s) => {
      ne.setAllAccounts(r, s), q.setHasMultipleAddresses((r == null ? void 0 : r.length) > 1);
    }, this.setStatus = (r, s) => {
      ne.setStatus(r, s), pe.isConnected() ? re.setConnectionStatus("connected") : re.setConnectionStatus("disconnected");
    }, this.getAddressByChainNamespace = (r) => R.getAccountProp("address", r), this.setConnectors = (r) => {
      const s = [...pe.state.allConnectors, ...r];
      pe.setConnectors(s);
    }, this.fetchIdentity = (r) => de.fetchIdentity(r), this.getReownName = (r) => Lw.getNamesForAddress(r), this.getConnectors = () => pe.getConnectors(), this.getConnectorImage = (r) => ig.getConnectorImage(r), this.setConnectedWalletInfo = (r, s) => {
      const n = Ue.getProviderId(s), i = r ? B(C({}, r), { type: n }) : void 0;
      ne.setConnectedWalletInfo(i, s);
    }, this.getIsConnectedState = () => !!R.state.activeCaipAddress, this.addAddressLabel = (r, s, n) => {
      ne.addAddressLabel(r, s, n);
    }, this.removeAddressLabel = (r, s) => {
      ne.removeAddressLabel(r, s);
    }, this.getAddress = (r) => R.state.activeChain === r || !r ? ne.state.address : R.getAccountProp("address", r), this.setApprovedCaipNetworksData = (r) => R.setApprovedCaipNetworksData(r), this.resetNetwork = (r) => {
      R.resetNetwork(r);
    }, this.addConnector = (r) => {
      pe.addConnector(r);
    }, this.resetWcConnection = () => {
      He.resetWcConnection();
    }, this.setAddressExplorerUrl = (r, s) => {
      ne.setAddressExplorerUrl(r, s);
    }, this.setSmartAccountDeployed = (r, s) => {
      ne.setSmartAccountDeployed(r, s);
    }, this.setSmartAccountEnabledNetworks = (r, s) => {
      R.setSmartAccountEnabledNetworks(r, s);
    }, this.setPreferredAccountType = (r, s) => {
      ne.setPreferredAccountType(r, s);
    }, this.setEIP6963Enabled = (r) => {
      q.setEIP6963Enabled(r);
    }, this.handleUnsafeRPCRequest = () => {
      if (this.isOpen()) {
        if (this.isTransactionStackEmpty())
          return;
        this.redirect("ApproveTransaction");
      } else
        this.open({ view: "ApproveTransaction" });
    }, this.options = e, this.version = e.sdkVersion, this.caipNetworks = this.extendCaipNetworks(e), this.chainNamespaces = this.getChainNamespacesSet(e.adapters, this.caipNetworks), this.defaultCaipNetwork = this.extendDefaultCaipNetwork(e), this.chainAdapters = this.createAdapters(e.adapters), this.initialize(e);
  }
  getChainNamespacesSet(e, r) {
    const s = e == null ? void 0 : e.map((i) => i.namespace).filter((i) => !!i);
    if (s != null && s.length)
      return [...new Set(s)];
    const n = r == null ? void 0 : r.map((i) => i.chainNamespace);
    return [...new Set(n)];
  }
  initialize(e) {
    return h(this, null, function* () {
      var r, s, n;
      this.initControllers(e), yield this.initChainAdapters(), yield this.injectModalUi(), this.sendInitializeEvent(e), qr.set({ initialized: !0 }), yield this.syncExistingConnection(), ((r = q.state.features) != null && r.email || Array.isArray((s = q.state.features) == null ? void 0 : s.socials) && ((n = q.state.features) == null ? void 0 : n.socials.length) > 0) && (yield this.checkAllowedOrigins());
    });
  }
  checkAllowedOrigins() {
    return h(this, null, function* () {
      const e = yield le.fetchAllowedOrigins();
      if (e && he.isClient()) {
        const r = window.location.origin;
        Wa.isOriginAllowed(r, e, Bi.DEFAULT_ALLOWED_ANCESTORS) || rs.open(Br.ALERT_ERRORS.INVALID_APP_CONFIGURATION, "error");
      } else
        rs.open(Br.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
    });
  }
  sendInitializeEvent(e) {
    var s;
    const r = us(e, []);
    delete r.adapters, delete r.universalProvider, Ke.sendEvent({
      type: "track",
      event: "INITIALIZE",
      properties: B(C({}, r), {
        networks: e.networks.map((n) => n.id),
        siweConfig: {
          options: ((s = e.siweConfig) == null ? void 0 : s.options) || {}
        }
      })
    });
  }
  // -- Controllers initialization ---------------------------------------------------
  initControllers(e) {
    this.initializeOptionsController(e), this.initializeChainController(e), this.initializeThemeController(e), this.initializeConnectionController(e), this.initializeConnectorController();
  }
  initializeThemeController(e) {
    e.themeMode && Nt.setThemeMode(e.themeMode), e.themeVariables && Nt.setThemeVariables(e.themeVariables);
  }
  initializeChainController(e) {
    var s;
    if (!this.connectionControllerClient || !this.networkControllerClient)
      throw new Error("ConnectionControllerClient and NetworkControllerClient must be set");
    R.initialize((s = e.adapters) != null ? s : [], this.caipNetworks, {
      connectionControllerClient: this.connectionControllerClient,
      networkControllerClient: this.networkControllerClient
    });
    const r = this.getDefaultNetwork();
    r && R.setActiveCaipNetwork(r);
  }
  initializeConnectionController(e) {
    var r;
    He.setWcBasic((r = e.basic) != null ? r : !1);
  }
  initializeConnectorController() {
    pe.initialize(this.chainNamespaces);
  }
  initializeOptionsController(e) {
    var o;
    q.setDebug(e.debug !== !1), q.setEnableWalletConnect(e.enableWalletConnect !== !1), q.setEnableWalletGuide(e.enableWalletGuide !== !1), q.setEnableWallets(e.enableWallets !== !1), q.setEIP6963Enabled(e.enableEIP6963 !== !1), q.setEnableNetworkSwitch(e.enableNetworkSwitch !== !1), q.setEnableAuthLogger(e.enableAuthLogger !== !1), q.setCustomRpcUrls(e.customRpcUrls), q.setSdkVersion(e.sdkVersion), q.setProjectId(e.projectId), q.setEnableEmbedded(e.enableEmbedded), q.setAllWallets(e.allWallets), q.setIncludeWalletIds(e.includeWalletIds), q.setExcludeWalletIds(e.excludeWalletIds), q.setFeaturedWalletIds(e.featuredWalletIds), q.setTokens(e.tokens), q.setTermsConditionsUrl(e.termsConditionsUrl), q.setPrivacyPolicyUrl(e.privacyPolicyUrl), q.setCustomWallets(e.customWallets), q.setFeatures(e.features), q.setAllowUnsupportedChain(e.allowUnsupportedChain), q.setUniversalProviderConfigOverride(e.universalProviderConfigOverride), q.setDefaultAccountTypes(e.defaultAccountTypes);
    const r = re.getPreferredAccountTypes(), s = C(C({}, q.state.defaultAccountTypes), r);
    ne.setPreferredAccountTypes(s);
    const n = this.getDefaultMetaData();
    if (!e.metadata && n && (e.metadata = n), q.setMetadata(e.metadata), q.setDisableAppend(e.disableAppend), q.setEnableEmbedded(e.enableEmbedded), q.setSIWX(e.siwx), !e.projectId) {
      rs.open(Br.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
      return;
    }
    if (((o = e.adapters) == null ? void 0 : o.find((a) => a.namespace === se.CHAIN.EVM)) && e.siweConfig) {
      if (e.siwx)
        throw new Error("Cannot set both `siweConfig` and `siwx` options");
      q.setSIWX(e.siweConfig.mapToSIWX());
    }
  }
  getDefaultMetaData() {
    var e, r, s, n;
    return typeof window != "undefined" && typeof document != "undefined" ? {
      name: ((r = (e = document.getElementsByTagName("title")) == null ? void 0 : e[0]) == null ? void 0 : r.textContent) || "",
      description: ((s = document.querySelector('meta[property="og:description"]')) == null ? void 0 : s.content) || "",
      url: window.location.origin,
      icons: [((n = document.querySelector('link[rel~="icon"]')) == null ? void 0 : n.href) || ""]
    } : null;
  }
  // -- Network Initialization ---------------------------------------------------
  setUnsupportedNetwork(e) {
    const r = this.getActiveChainNamespace();
    if (r) {
      const s = Bn.getUnsupportedNetwork(`${r}:${e}`);
      R.setActiveCaipNetwork(s);
    }
  }
  getDefaultNetwork() {
    return Bn.getCaipNetworkFromStorage(this.defaultCaipNetwork);
  }
  extendCaipNetwork(e, r) {
    return Bn.extendCaipNetwork(e, {
      customNetworkImageUrls: r.chainImages,
      projectId: r.projectId
    });
  }
  extendCaipNetworks(e) {
    return Bn.extendCaipNetworks(e.networks, {
      customNetworkImageUrls: e.chainImages,
      customRpcUrls: e.customRpcUrls,
      projectId: e.projectId
    });
  }
  extendDefaultCaipNetwork(e) {
    const r = e.networks.find((n) => {
      var i;
      return n.id === ((i = e.defaultNetwork) == null ? void 0 : i.id);
    });
    return r ? Bn.extendCaipNetwork(r, {
      customNetworkImageUrls: e.chainImages,
      customRpcUrls: e.customRpcUrls,
      projectId: e.projectId
    }) : void 0;
  }
  // -- Client Initialization ---------------------------------------------------
  createClients() {
    this.connectionControllerClient = {
      connectWalletConnect: () => h(this, null, function* () {
        var i;
        const e = R.state.activeChain, r = this.getAdapter(e), s = (i = this.getCaipNetwork(e)) == null ? void 0 : i.id;
        if (!r)
          throw new Error("Adapter not found");
        const n = yield r.connectWalletConnect(s);
        this.close(), this.setClientId((n == null ? void 0 : n.clientId) || null), re.setConnectedNamespaces([...R.state.chains.keys()]), this.chainNamespaces.forEach((o) => {
          pe.setConnectorId(qt.CONNECTOR_TYPE_WALLET_CONNECT, o);
        }), yield this.syncWalletConnectAccount();
      }),
      connectExternal: (a) => h(this, [a], function* ({ id: e, info: r, type: s, provider: n, chain: i, caipNetwork: o }) {
        var m, f, w, S, E, I;
        const c = R.state.activeChain, l = i || c, u = this.getAdapter(l);
        if (i && i !== c && !o) {
          const A = this.getCaipNetworks().find((T) => T.chainNamespace === i);
          A && this.setCaipNetwork(A);
        }
        if (!u)
          throw new Error("Adapter not found");
        const d = this.getCaipNetwork(l), p = yield u.connect({
          id: e,
          info: r,
          type: s,
          provider: n,
          chainId: (o == null ? void 0 : o.id) || (d == null ? void 0 : d.id),
          rpcUrl: ((w = (f = (m = o == null ? void 0 : o.rpcUrls) == null ? void 0 : m.default) == null ? void 0 : f.http) == null ? void 0 : w[0]) || ((I = (E = (S = d == null ? void 0 : d.rpcUrls) == null ? void 0 : S.default) == null ? void 0 : E.http) == null ? void 0 : I[0])
        });
        if (!p)
          return;
        re.addConnectedNamespace(l), this.syncProvider(B(C({}, p), { chainNamespace: l }));
        const { accounts: g } = yield u.getAccounts({ namespace: l, id: e });
        this.setAllAccounts(g, l), this.setStatus("connected", l), this.syncConnectedWalletInfo(l);
      }),
      reconnectExternal: (i) => h(this, [i], function* ({ id: e, info: r, type: s, provider: n }) {
        var c;
        const o = R.state.activeChain, a = this.getAdapter(o);
        a != null && a.reconnect && (yield a == null ? void 0 : a.reconnect({ id: e, info: r, type: s, provider: n, chainId: (c = this.getCaipNetwork()) == null ? void 0 : c.id }), re.addConnectedNamespace(o), this.syncConnectedWalletInfo(o));
      }),
      disconnect: (e) => h(this, null, function* () {
        const r = e || R.state.activeChain, s = this.getAdapter(r), n = Ue.getProvider(r), i = Ue.getProviderId(r);
        yield s == null ? void 0 : s.disconnect({ provider: n, providerType: i }), re.removeConnectedNamespace(r), Ue.resetChain(r), this.setUser(void 0, r), this.setStatus("disconnected", r), this.setConnectedWalletInfo(void 0, r);
      }),
      checkInstalled: (e) => e ? e.some((r) => {
        var s;
        return !!((s = window.ethereum) != null && s[String(r)]);
      }) : !!window.ethereum,
      signMessage: (e) => h(this, null, function* () {
        const r = this.getAdapter(R.state.activeChain), s = yield r == null ? void 0 : r.signMessage({
          message: e,
          address: ne.state.address,
          provider: Ue.getProvider(R.state.activeChain)
        });
        return (s == null ? void 0 : s.signature) || "";
      }),
      sendTransaction: (e) => h(this, null, function* () {
        const r = e.chainNamespace;
        if (vt.SEND_SUPPORTED_NAMESPACES.includes(r)) {
          const s = this.getAdapter(R.state.activeChain), n = Ue.getProvider(r), i = yield s == null ? void 0 : s.sendTransaction(B(C({}, e), {
            caipNetwork: this.getCaipNetwork(),
            provider: n
          }));
          return (i == null ? void 0 : i.hash) || "";
        }
        return "";
      }),
      estimateGas: (e) => h(this, null, function* () {
        if (e.chainNamespace === se.CHAIN.EVM) {
          const r = this.getAdapter(R.state.activeChain), s = Ue.getProvider(R.state.activeChain), n = this.getCaipNetwork();
          if (!n)
            throw new Error("CaipNetwork is undefined");
          const i = yield r == null ? void 0 : r.estimateGas(B(C({}, e), {
            provider: s,
            caipNetwork: n
          }));
          return (i == null ? void 0 : i.gas) || /* @__PURE__ */ BigInt(0);
        }
        return /* @__PURE__ */ BigInt(0);
      }),
      getEnsAvatar: () => h(this, null, function* () {
        var e;
        return yield this.syncIdentity({
          address: ne.state.address,
          chainId: Number((e = this.getCaipNetwork()) == null ? void 0 : e.id),
          chainNamespace: R.state.activeChain
        }), ne.state.profileImage || !1;
      }),
      getEnsAddress: (e) => h(this, null, function* () {
        return yield Wa.resolveReownName(e);
      }),
      writeContract: (e) => h(this, null, function* () {
        const r = this.getAdapter(R.state.activeChain), s = this.getCaipNetwork(), n = this.getCaipAddress(), i = Ue.getProvider(R.state.activeChain);
        if (!s || !n)
          throw new Error("CaipNetwork or CaipAddress is undefined");
        const o = yield r == null ? void 0 : r.writeContract(B(C({}, e), { caipNetwork: s, provider: i, caipAddress: n }));
        return o == null ? void 0 : o.hash;
      }),
      parseUnits: (e, r) => {
        var n;
        const s = this.getAdapter(R.state.activeChain);
        return (n = s == null ? void 0 : s.parseUnits({ value: e, decimals: r })) != null ? n : /* @__PURE__ */ BigInt(0);
      },
      formatUnits: (e, r) => {
        var n;
        const s = this.getAdapter(R.state.activeChain);
        return (n = s == null ? void 0 : s.formatUnits({ value: e, decimals: r })) != null ? n : "0";
      },
      getCapabilities: (e) => h(this, null, function* () {
        const r = this.getAdapter(R.state.activeChain);
        return yield r == null ? void 0 : r.getCapabilities(e);
      }),
      grantPermissions: (e) => h(this, null, function* () {
        const r = this.getAdapter(R.state.activeChain);
        return yield r == null ? void 0 : r.grantPermissions(e);
      }),
      revokePermissions: (e) => h(this, null, function* () {
        const r = this.getAdapter(R.state.activeChain);
        return r != null && r.revokePermissions ? yield r.revokePermissions(e) : "0x";
      }),
      walletGetAssets: (e) => h(this, null, function* () {
        var s;
        const r = this.getAdapter(R.state.activeChain);
        return (s = yield r == null ? void 0 : r.walletGetAssets(e)) != null ? s : {};
      })
    }, this.networkControllerClient = {
      switchCaipNetwork: (e) => h(this, null, function* () {
        return yield this.switchCaipNetwork(e);
      }),
      // eslint-disable-next-line @typescript-eslint/require-await
      getApprovedCaipNetworksData: () => h(this, null, function* () {
        return this.getApprovedCaipNetworksData();
      })
    }, He.setClient(this.connectionControllerClient);
  }
  getApprovedCaipNetworksData() {
    var r, s, n, i, o;
    if (Ue.getProviderId(R.state.activeChain) === qt.CONNECTOR_TYPE_WALLET_CONNECT) {
      const a = (s = (r = this.universalProvider) == null ? void 0 : r.session) == null ? void 0 : s.namespaces;
      return {
        /*
         * MetaMask Wallet only returns 1 namespace in the session object. This makes it imposible
         * to switch to other networks. Setting supportsAllNetworks to true for MetaMask Wallet
         * will make it possible to switch to other networks.
         */
        supportsAllNetworks: ((o = (i = (n = this.universalProvider) == null ? void 0 : n.session) == null ? void 0 : i.peer) == null ? void 0 : o.metadata.name) === "MetaMask Wallet",
        approvedCaipNetworkIds: this.getChainsFromNamespaces(a)
      };
    }
    return { supportsAllNetworks: !0, approvedCaipNetworkIds: [] };
  }
  switchCaipNetwork(e) {
    return h(this, null, function* () {
      if (!e)
        return;
      const r = e.chainNamespace;
      if (this.getAddressByChainNamespace(e.chainNamespace)) {
        const n = Ue.getProvider(r), i = Ue.getProviderId(r);
        if (e.chainNamespace === R.state.activeChain) {
          const o = this.getAdapter(r);
          yield o == null ? void 0 : o.switchNetwork({ caipNetwork: e, provider: n, providerType: i });
        } else if (this.setCaipNetwork(e), i === qt.CONNECTOR_TYPE_WALLET_CONNECT)
          this.syncWalletConnectAccount();
        else {
          const o = this.getAddressByChainNamespace(r);
          o && this.syncAccount({
            address: o,
            chainId: e.id,
            chainNamespace: r
          });
        }
      } else
        this.setCaipNetwork(e);
    });
  }
  getChainsFromNamespaces(e = {}) {
    return Object.values(e).flatMap((r) => {
      const s = r.chains || [], n = r.accounts.map((i) => {
        const { chainId: o, chainNamespace: a } = ds.parseCaipAddress(i);
        return `${a}:${o}`;
      });
      return Array.from(/* @__PURE__ */ new Set([...s, ...n]));
    });
  }
  // -- Adapter Initialization ---------------------------------------------------
  createAdapters(e) {
    return this.createClients(), this.chainNamespaces.reduce((r, s) => {
      var i;
      const n = e == null ? void 0 : e.find((o) => o.namespace === s);
      return n ? (n.construct({
        namespace: s,
        projectId: (i = this.options) == null ? void 0 : i.projectId,
        networks: this.getCaipNetworks()
      }), r[s] = n) : r[s] = new Xk({
        namespace: s,
        networks: this.getCaipNetworks()
      }), r;
    }, {});
  }
  initChainAdapter(e) {
    return h(this, null, function* () {
      var r;
      this.onConnectors(e), this.listenAdapter(e), (r = this.chainAdapters) == null || r[e].syncConnectors(this.options, this), yield this.createUniversalProviderForAdapter(e);
    });
  }
  initChainAdapters() {
    return h(this, null, function* () {
      yield Promise.all(this.chainNamespaces.map((e) => h(this, null, function* () {
        yield this.initChainAdapter(e);
      })));
    });
  }
  onConnectors(e) {
    const r = this.getAdapter(e);
    r == null || r.on("connectors", this.setConnectors.bind(this));
  }
  listenAdapter(e) {
    const r = this.getAdapter(e);
    if (!r)
      return;
    const s = re.getConnectionStatus();
    s === "connected" ? this.setStatus("connecting", e) : s === "disconnected" ? (re.clearAddressCache(), this.setStatus(s, e)) : this.setStatus(s, e), r.on("switchNetwork", ({ address: n, chainId: i }) => {
      const o = this.getCaipNetworks().find((l) => l.id === i || l.caipNetworkId === i), a = R.state.activeChain === e, c = R.getAccountProp("address", e);
      if (o) {
        const l = a && n ? n : c;
        l && this.syncAccount({ address: l, chainId: o.id, chainNamespace: e });
      } else
        this.setUnsupportedNetwork(i);
    }), r.on("disconnect", this.disconnect.bind(this, e)), r.on("pendingTransactions", () => {
      const n = ne.state.address, i = R.state.activeCaipNetwork;
      !n || !(i != null && i.id) || this.updateNativeBalance(n, i.id, i.chainNamespace);
    }), r.on("accountChanged", ({ address: n, chainId: i }) => {
      var a, c;
      const o = R.state.activeChain === e;
      o && i ? this.syncAccount({
        address: n,
        chainId: i,
        chainNamespace: e
      }) : o && ((a = R.state.activeCaipNetwork) != null && a.id) ? this.syncAccount({
        address: n,
        chainId: (c = R.state.activeCaipNetwork) == null ? void 0 : c.id,
        chainNamespace: e
      }) : this.syncAccountInfo(n, i, e), this.syncAllAccounts(e);
    });
  }
  createUniversalProviderForAdapter(e) {
    return h(this, null, function* () {
      var r, s, n;
      yield this.getUniversalProvider(), this.universalProvider && ((n = (s = (r = this.chainAdapters) == null ? void 0 : r[e]) == null ? void 0 : s.setUniversalProvider) == null || n.call(s, this.universalProvider));
    });
  }
  // -- Connection Sync ---------------------------------------------------
  syncExistingConnection() {
    return h(this, null, function* () {
      yield Promise.allSettled(this.chainNamespaces.map((e) => this.syncNamespaceConnection(e)));
    });
  }
  syncNamespaceConnection(e) {
    return h(this, null, function* () {
      try {
        const r = pe.getConnectorId(e);
        switch (this.setStatus("connecting", e), r) {
          case se.CONNECTOR_ID.WALLET_CONNECT:
            yield this.syncWalletConnectAccount();
            break;
          case se.CONNECTOR_ID.AUTH:
            break;
          default:
            yield this.syncAdapterConnection(e);
        }
      } catch (r) {
        console.warn("AppKit couldn't sync existing connection", r), this.setStatus("disconnected", e);
      }
    });
  }
  syncAdapterConnection(e) {
    return h(this, null, function* () {
      var o, a, c;
      const r = this.getAdapter(e), s = pe.getConnectorId(e), n = this.getCaipNetwork(e), i = pe.getConnectors(e).find((l) => l.id === s);
      try {
        if (!r || !i)
          throw new Error(`Adapter or connector not found for namespace ${e}`);
        if (!(n != null && n.id))
          throw new Error("CaipNetwork not found");
        const l = yield r == null ? void 0 : r.syncConnection({
          namespace: e,
          id: i.id,
          chainId: n.id,
          rpcUrl: (c = (a = (o = n == null ? void 0 : n.rpcUrls) == null ? void 0 : o.default) == null ? void 0 : a.http) == null ? void 0 : c[0]
        });
        if (l) {
          const u = yield r == null ? void 0 : r.getAccounts({
            namespace: e,
            id: i.id
          });
          u && u.accounts.length > 0 ? this.setAllAccounts(u.accounts, e) : this.setAllAccounts([he.createAccount(e, l.address, "eoa")], e), this.syncProvider(B(C({}, l), { chainNamespace: e })), yield this.syncAccount(B(C({}, l), { chainNamespace: e })), this.setStatus("connected", e);
        } else
          this.setStatus("disconnected", e);
      } catch (l) {
        this.setStatus("disconnected", e);
      }
    });
  }
  syncWalletConnectAccount() {
    return h(this, null, function* () {
      const e = this.chainNamespaces.map((r) => h(this, null, function* () {
        var a, c, l, u, d;
        const s = this.getAdapter(r), n = ((u = (l = (c = (a = this.universalProvider) == null ? void 0 : a.session) == null ? void 0 : c.namespaces) == null ? void 0 : l[r]) == null ? void 0 : u.accounts) || [], i = (d = R.state.activeCaipNetwork) == null ? void 0 : d.id, o = n.find((p) => {
          const { chainId: g } = ds.parseCaipAddress(p);
          return g === (i == null ? void 0 : i.toString());
        }) || n[0];
        if (o) {
          const p = ds.validateCaipAddress(o), { chainId: g, address: m } = ds.parseCaipAddress(p);
          if (Ue.setProviderId(r, qt.CONNECTOR_TYPE_WALLET_CONNECT), this.caipNetworks && R.state.activeCaipNetwork && (s == null ? void 0 : s.namespace) !== se.CHAIN.EVM) {
            const f = s == null ? void 0 : s.getWalletConnectProvider({
              caipNetworks: this.getCaipNetworks(),
              provider: this.universalProvider,
              activeCaipNetwork: R.state.activeCaipNetwork
            });
            Ue.setProvider(r, f);
          } else
            Ue.setProvider(r, this.universalProvider);
          pe.setConnectorId(se.CONNECTOR_ID.WALLET_CONNECT, r), re.addConnectedNamespace(r), this.syncWalletConnectAccounts(r), yield this.syncAccount({
            address: m,
            chainId: g,
            chainNamespace: r
          });
        } else
          this.setStatus("disconnected", r);
        this.syncConnectedWalletInfo(r), yield R.setApprovedCaipNetworksData(r);
      }));
      yield Promise.all(e);
    });
  }
  syncWalletConnectAccounts(e) {
    var s, n, i, o, a;
    const r = (a = (o = (i = (n = (s = this.universalProvider) == null ? void 0 : s.session) == null ? void 0 : n.namespaces) == null ? void 0 : i[e]) == null ? void 0 : o.accounts) == null ? void 0 : a.map((c) => {
      const { address: l } = ds.parseCaipAddress(c);
      return l;
    }).filter((c, l, u) => u.indexOf(c) === l);
    r && this.setAllAccounts(r.map((c) => he.createAccount(e, c, e === "bip122" ? "payment" : "eoa")), e);
  }
  syncProvider({ type: e, provider: r, id: s, chainNamespace: n }) {
    Ue.setProviderId(n, e), Ue.setProvider(n, r), pe.setConnectorId(s, n);
  }
  syncAllAccounts(e) {
    return h(this, null, function* () {
      const r = pe.getConnectorId(e);
      if (!r)
        return;
      const s = this.getAdapter(e), n = yield s == null ? void 0 : s.getAccounts({ namespace: e, id: r });
      n && n.accounts.length > 0 && this.setAllAccounts(n.accounts, e);
    });
  }
  syncAccount(e) {
    return h(this, null, function* () {
      var d, p;
      const r = e.chainNamespace === R.state.activeChain, s = R.getCaipNetworkByNamespace(e.chainNamespace, e.chainId), { address: n, chainId: i, chainNamespace: o } = e, { chainId: a } = re.getActiveNetworkProps(), c = i || a, l = ((d = R.state.activeCaipNetwork) == null ? void 0 : d.name) === se.UNSUPPORTED_NETWORK_NAME, u = R.getNetworkProp("supportsAllNetworks", o);
      if (this.setStatus("connected", o), !(l && !u) && c) {
        let g = this.getCaipNetworks().find((w) => w.id.toString() === c.toString()), m = this.getCaipNetworks().find((w) => w.chainNamespace === o);
        if (!u && !g && !m) {
          const w = this.getApprovedCaipNetworkIds() || [], S = w.find((I) => {
            var A;
            return ((A = ds.parseCaipNetworkId(I)) == null ? void 0 : A.chainId) === c.toString();
          }), E = w.find((I) => {
            var A;
            return ((A = ds.parseCaipNetworkId(I)) == null ? void 0 : A.chainNamespace) === o;
          });
          g = this.getCaipNetworks().find((I) => I.caipNetworkId === S), m = this.getCaipNetworks().find((I) => I.caipNetworkId === E || // This is a workaround used in Solana network to support deprecated caipNetworkId
          "deprecatedCaipNetworkId" in I && I.deprecatedCaipNetworkId === E);
        }
        const f = g || m;
        (f == null ? void 0 : f.chainNamespace) === R.state.activeChain ? q.state.enableNetworkSwitch && !q.state.allowUnsupportedChain && ((p = R.state.activeCaipNetwork) == null ? void 0 : p.name) === se.UNSUPPORTED_NETWORK_NAME ? R.showUnsupportedChainUI() : this.setCaipNetwork(f) : r || s && this.setCaipNetworkOfNamespace(s, o), this.syncConnectedWalletInfo(o), xc.isLowerCaseMatch(n, ne.state.address) || this.syncAccountInfo(n, f == null ? void 0 : f.id, o), r ? yield this.syncBalance({ address: n, chainId: f == null ? void 0 : f.id, chainNamespace: o }) : yield this.syncBalance({ address: n, chainId: s == null ? void 0 : s.id, chainNamespace: o });
      }
    });
  }
  syncAccountInfo(e, r, s) {
    return h(this, null, function* () {
      const n = this.getCaipAddress(s), i = r || (n == null ? void 0 : n.split(":")[1]);
      if (!i)
        return;
      const o = `${s}:${i}:${e}`;
      this.setCaipAddress(o, s), yield this.syncIdentity({
        address: e,
        chainId: i,
        chainNamespace: s
      });
    });
  }
  syncReownName(e, r) {
    return h(this, null, function* () {
      try {
        const s = yield this.getReownName(e);
        if (s[0]) {
          const n = s[0];
          this.setProfileName(n.name, r);
        } else
          this.setProfileName(null, r);
      } catch (s) {
        this.setProfileName(null, r);
      }
    });
  }
  syncConnectedWalletInfo(e) {
    var n;
    const r = pe.getConnectorId(e), s = Ue.getProviderId(e);
    if (s === qt.CONNECTOR_TYPE_ANNOUNCED || s === qt.CONNECTOR_TYPE_INJECTED) {
      if (r) {
        const i = this.getConnectors().find((o) => o.id === r);
        if (i) {
          const { info: o, name: a, imageUrl: c } = i, l = c || this.getConnectorImage(i);
          this.setConnectedWalletInfo(C({ name: a, icon: l }, o), e);
        }
      }
    } else if (s === qt.CONNECTOR_TYPE_WALLET_CONNECT) {
      const i = Ue.getProvider(e);
      i != null && i.session && this.setConnectedWalletInfo(B(C({}, i.session.peer.metadata), {
        name: i.session.peer.metadata.name,
        icon: (n = i.session.peer.metadata.icons) == null ? void 0 : n[0]
      }), e);
    } else if (r)
      if (r === se.CONNECTOR_ID.COINBASE) {
        const i = this.getConnectors().find((o) => o.id === se.CONNECTOR_ID.COINBASE);
        this.setConnectedWalletInfo({ name: "Coinbase Wallet", icon: this.getConnectorImage(i) }, e);
      } else
        this.setConnectedWalletInfo({ name: r }, e);
  }
  syncBalance(e) {
    return h(this, null, function* () {
      !rg.getNetworksByNamespace(this.getCaipNetworks(), e.chainNamespace).find((s) => {
        var n;
        return s.id.toString() === ((n = e.chainId) == null ? void 0 : n.toString());
      }) || !e.chainId || (yield this.updateNativeBalance(e.address, e.chainId, e.chainNamespace));
    });
  }
  updateNativeBalance(e, r, s) {
    return h(this, null, function* () {
      const n = this.getAdapter(s), i = R.getCaipNetworkByNamespace(s, r);
      if (n) {
        const o = yield n.getBalance({
          address: e,
          chainId: r,
          caipNetwork: i,
          tokens: this.options.tokens
        });
        this.setBalance(o.balance, o.symbol, s);
      }
    });
  }
  // -- Universal Provider ---------------------------------------------------
  initializeUniversalAdapter() {
    return h(this, null, function* () {
      var s, n, i, o, a, c, l, u, d, p, g;
      const e = aD.createLogger((m, ...f) => {
        m && this.handleAlertError(m), console.error(...f);
      }), r = {
        projectId: (s = this.options) == null ? void 0 : s.projectId,
        metadata: {
          name: (n = this.options) != null && n.metadata ? (i = this.options) == null ? void 0 : i.metadata.name : "",
          description: (o = this.options) != null && o.metadata ? (a = this.options) == null ? void 0 : a.metadata.description : "",
          url: (c = this.options) != null && c.metadata ? (l = this.options) == null ? void 0 : l.metadata.url : "",
          icons: (u = this.options) != null && u.metadata ? (d = this.options) == null ? void 0 : d.metadata.icons : [""]
        },
        logger: e
      };
      q.setManualWCControl(!!((p = this.options) != null && p.manualWCControl)), this.universalProvider = (g = this.options.universalProvider) != null ? g : yield Ax.init(r), this.listenWalletConnect();
    });
  }
  listenWalletConnect() {
    this.universalProvider && (this.universalProvider.on("display_uri", (e) => {
      He.setUri(e);
    }), this.universalProvider.on("connect", He.finalizeWcConnection), this.universalProvider.on("disconnect", () => {
      this.chainNamespaces.forEach((e) => {
        this.resetAccount(e);
      }), He.resetWcConnection();
    }), this.universalProvider.on("chainChanged", (e) => {
      const r = this.getCaipNetworks().find((n) => n.id == e), s = this.getCaipNetwork();
      if (!r) {
        this.setUnsupportedNetwork(e);
        return;
      }
      (s == null ? void 0 : s.id) !== (r == null ? void 0 : r.id) && this.setCaipNetwork(r);
    }), this.universalProvider.on("session_event", (e) => {
      if (Wa.isSessionEventData(e)) {
        const { name: r, data: s } = e.params.event;
        r === "accountsChanged" && Array.isArray(s) && he.isCaipAddress(s[0]) && this.syncAccount(ds.parseCaipAddress(s[0]));
      }
    }));
  }
  createUniversalProvider() {
    var e;
    return !this.universalProviderInitPromise && he.isClient() && ((e = this.options) != null && e.projectId) && (this.universalProviderInitPromise = this.initializeUniversalAdapter()), this.universalProviderInitPromise;
  }
  getUniversalProvider() {
    return h(this, null, function* () {
      if (!this.universalProvider)
        try {
          yield this.createUniversalProvider();
        } catch (e) {
          Ke.sendEvent({
            type: "error",
            event: "INTERNAL_SDK_ERROR",
            properties: {
              errorType: "UniversalProviderInitError",
              errorMessage: e instanceof Error ? e.message : "Unknown",
              uncaught: !1
            }
          }), console.error("AppKit:getUniversalProvider - Cannot create provider", e);
        }
      return this.universalProvider;
    });
  }
  // - Utils -------------------------------------------------------------------
  handleAlertError(e) {
    const r = Object.entries(Br.UniversalProviderErrors).find(([, { message: a }]) => e.message.includes(a)), [s, n] = r != null ? r : [], { message: i, alertErrorKey: o } = n != null ? n : {};
    if (s && i && !this.reportedAlertErrors[s]) {
      const a = Br.ALERT_ERRORS[o];
      a && (rs.open(a, "error"), this.reportedAlertErrors[s] = !0);
    }
  }
  getAdapter(e) {
    var r;
    if (e)
      return (r = this.chainAdapters) == null ? void 0 : r[e];
  }
  createAdapter(e) {
    var n;
    if (!e)
      return;
    const r = e.namespace;
    if (!r)
      return;
    this.createClients();
    const s = e;
    s.namespace = r, s.construct({
      namespace: r,
      projectId: (n = this.options) == null ? void 0 : n.projectId,
      networks: this.getCaipNetworks()
    }), this.chainNamespaces.includes(r) || this.chainNamespaces.push(r), this.chainAdapters && (this.chainAdapters[r] = s);
  }
  // -- Public -------------------------------------------------------------------
  open(e) {
    return h(this, null, function* () {
      if (yield this.injectModalUi(), e != null && e.uri && He.setUri(e.uri), e != null && e.arguments)
        switch (e == null ? void 0 : e.view) {
          case "Swap":
            return et.open(B(C({}, e), { data: { swap: e.arguments } }));
        }
      return et.open(e);
    });
  }
  close(e = !1) {
    return h(this, null, function* () {
      yield this.injectModalUi(), et.close(e);
    });
  }
  setLoading(e, r) {
    et.setLoading(e, r);
  }
  disconnect(e) {
    return h(this, null, function* () {
      yield He.disconnect(e);
    });
  }
  getSIWX() {
    return q.state.siwx;
  }
  // -- review these -------------------------------------------------------------------
  getError() {
    return "";
  }
  getChainId() {
    var e;
    return (e = R.state.activeCaipNetwork) == null ? void 0 : e.id;
  }
  switchNetwork(e) {
    return h(this, null, function* () {
      const r = this.getCaipNetworks().find((s) => s.id === e.id);
      if (!r) {
        rs.open(Br.ALERT_ERRORS.SWITCH_NETWORK_NOT_FOUND, "error");
        return;
      }
      yield R.switchActiveNetwork(r);
    });
  }
  getWalletProvider() {
    return R.state.activeChain ? Ue.state.providers[R.state.activeChain] : null;
  }
  getWalletProviderType() {
    return Ue.getProviderId(R.state.activeChain);
  }
  subscribeProviders(e) {
    return Ue.subscribeProviders(e);
  }
  getThemeMode() {
    return Nt.state.themeMode;
  }
  getThemeVariables() {
    return Nt.state.themeVariables;
  }
  setThemeMode(e) {
    Nt.setThemeMode(e), Qw(Nt.state.themeMode);
  }
  setTermsConditionsUrl(e) {
    q.setTermsConditionsUrl(e);
  }
  setPrivacyPolicyUrl(e) {
    q.setPrivacyPolicyUrl(e);
  }
  setThemeVariables(e) {
    Nt.setThemeVariables(e), Kk(Nt.state.themeVariables);
  }
  subscribeTheme(e) {
    return Nt.subscribe(e);
  }
  getWalletInfo() {
    return ne.state.connectedWalletInfo;
  }
  getAccount(e) {
    var o;
    const r = pe.getAuthConnector(e), s = R.getAccountData(e), n = R.state.activeChain, i = re.getConnectedConnectorId(e);
    if (s)
      return {
        allAccounts: s.allAccounts,
        caipAddress: s.caipAddress,
        address: he.getPlainAddress(s.caipAddress),
        isConnected: !!s.caipAddress,
        status: s.status,
        embeddedWalletInfo: r && i === se.CONNECTOR_ID.AUTH ? {
          user: s.user ? B(C({}, s.user), {
            /*
             * Getting the username from the chain controller works well for social logins,
             * but Farcaster uses a different connection flow and doesn't emit the username via events.
             * Since the username is stored in local storage before the chain controller updates,
             * it's safe to use the local storage value here.
             */
            username: re.getConnectedSocialUsername()
          }) : void 0,
          authProvider: s.socialProvider || "email",
          accountType: (o = s.preferredAccountTypes) == null ? void 0 : o[e || n],
          isSmartAccountDeployed: !!s.smartAccountDeployed
        } : void 0
      };
  }
  subscribeAccount(e, r) {
    const s = () => {
      const n = this.getAccount(r);
      n && e(n);
    };
    r ? R.subscribeChainProp("accountState", s, r) : R.subscribe(s), pe.subscribe(s);
  }
  subscribeNetwork(e) {
    return R.subscribe(({ activeCaipNetwork: r }) => {
      e({
        caipNetwork: r,
        chainId: r == null ? void 0 : r.id,
        caipNetworkId: r == null ? void 0 : r.caipNetworkId
      });
    });
  }
  subscribeWalletInfo(e) {
    return ne.subscribeKey("connectedWalletInfo", e);
  }
  subscribeShouldUpdateToAddress(e) {
    ne.subscribeKey("shouldUpdateToAddress", e);
  }
  subscribeCaipNetworkChange(e) {
    R.subscribeKey("activeCaipNetwork", e);
  }
  getState() {
    return qr.state;
  }
  subscribeState(e) {
    return qr.subscribe(e);
  }
  showErrorMessage(e) {
    Ar.showError(e);
  }
  showSuccessMessage(e) {
    Ar.showSuccess(e);
  }
  getEvent() {
    return C({}, Ke.state);
  }
  subscribeEvents(e) {
    return Ke.subscribe(e);
  }
  replace(e) {
    xe.replace(e);
  }
  redirect(e) {
    xe.push(e);
  }
  popTransactionStack(e) {
    xe.popTransactionStack(e);
  }
  isOpen() {
    return et.state.open;
  }
  isTransactionStackEmpty() {
    return xe.state.transactionStack.length === 0;
  }
  isTransactionShouldReplaceView() {
    var e;
    return (e = xe.state.transactionStack[xe.state.transactionStack.length - 1]) == null ? void 0 : e.replace;
  }
  static getInstance() {
    return this.instance;
  }
  updateFeatures(e) {
    q.setFeatures(e);
  }
  updateOptions(e) {
    const r = q.state || {}, s = C(C({}, r), e);
    q.setOptions(s);
  }
  setConnectMethodsOrder(e) {
    q.setConnectMethodsOrder(e);
  }
  setWalletFeaturesOrder(e) {
    q.setWalletFeaturesOrder(e);
  }
  setCollapseWallets(e) {
    q.setCollapseWallets(e);
  }
  setSocialsOrder(e) {
    q.setSocialsOrder(e);
  }
  getConnectMethodsOrder() {
    return Pu.getConnectOrderMethod(q.state.features, pe.getConnectors());
  }
  /**
   * Adds a network to an existing adapter in AppKit.
   * @param namespace - The chain namespace to add the network to (e.g. 'eip155', 'solana')
   * @param network - The network configuration to add
   * @throws Error if adapter for namespace doesn't exist
   */
  addNetwork(e, r) {
    if (this.chainAdapters && !this.chainAdapters[e])
      throw new Error(`Adapter for namespace ${e} doesn't exist`);
    const s = this.extendCaipNetwork(r, this.options);
    this.getCaipNetworks().find((n) => n.id === s.id) || R.addNetwork(s);
  }
  /**
   * Removes a network from an existing adapter in AppKit.
   * @param namespace - The chain namespace the network belongs to
   * @param networkId - The network ID to remove
   * @throws Error if adapter for namespace doesn't exist or if removing last network
   */
  removeNetwork(e, r) {
    if (this.chainAdapters && !this.chainAdapters[e])
      throw new Error(`Adapter for namespace ${e} doesn't exist`);
    this.getCaipNetworks().find((n) => n.id === r) && R.removeNetwork(e, r);
  }
}
let Yf = !1;
class dd extends Qk {
  // -- Private ------------------------------------------------------------------
  setupAuthConnectorListeners(e) {
    e.onRpcRequest((r) => {
      tr.checkIfRequestExists(r) ? tr.checkIfRequestIsSafe(r) || this.handleUnsafeRPCRequest() : (this.open(), console.error(Et.RPC_METHOD_NOT_ALLOWED_MESSAGE, {
        method: r.method
      }), setTimeout(() => {
        this.showErrorMessage(Et.RPC_METHOD_NOT_ALLOWED_UI_MESSAGE);
      }, 300), e.rejectRpcRequests());
    }), e.onRpcError(() => {
      this.isOpen() && (this.isTransactionStackEmpty() ? this.close(!0) : this.popTransactionStack(!0));
    }), e.onRpcSuccess((r, s) => {
      const n = tr.checkIfRequestIsSafe(s), i = ne.state.address, o = R.state.activeCaipNetwork;
      n || (this.isTransactionStackEmpty() ? (this.close(!0), i && (o != null && o.id) && this.updateNativeBalance(i, o.id, o.chainNamespace)) : (this.popTransactionStack(), i && (o != null && o.id) && this.updateNativeBalance(i, o.id, o.chainNamespace)));
    }), e.onNotConnected(() => {
      const r = R.state.activeChain;
      pe.getConnectorId(r) === se.CONNECTOR_ID.AUTH && (this.setCaipAddress(void 0, r), this.setLoading(!1, r));
    }), e.onConnect((r) => h(this, null, function* () {
      var a, c;
      const s = R.state.activeChain, n = s === se.CHAIN.EVM ? `eip155:${r.chainId}:${r.address}` : `${r.chainId}:${r.address}`, i = r.preferredAccountType || ((a = ne.state.preferredAccountTypes) == null ? void 0 : a[s]) || q.state.defaultAccountTypes[s];
      xc.isLowerCaseMatch(r.address, ne.state.address) || this.syncIdentity({
        address: r.address,
        chainId: r.chainId,
        chainNamespace: s
      }), this.setCaipAddress(n, s), this.setUser(C(C({}, ne.state.user || {}), r), s), this.setSmartAccountDeployed(!!r.smartAccountDeployed, s), this.setPreferredAccountType(i, s);
      const o = (c = r.accounts) == null ? void 0 : c.map((l) => {
        var u;
        return he.createAccount(s, l.address, l.type || ((u = ne.state.preferredAccountTypes) == null ? void 0 : u[s]) || q.state.defaultAccountTypes[s]);
      });
      this.setAllAccounts(o || [
        he.createAccount(s, r.address, r.preferredAccountType || i)
      ], s), yield e.getSmartAccountEnabledNetworks(), this.setLoading(!1, s);
    })), e.onSocialConnected(({ userName: r }) => {
      this.setUser(B(C({}, ne.state.user || {}), { username: r }), R.state.activeChain);
    }), e.onGetSmartAccountEnabledNetworks((r) => {
      this.setSmartAccountEnabledNetworks(r, R.state.activeChain);
    }), e.onSetPreferredAccount(({ address: r, type: s }) => {
      r && this.setPreferredAccountType(s, R.state.activeChain);
    });
  }
  syncAuthConnector(e, r) {
    return h(this, null, function* () {
      var u, d, p, g;
      const s = se.AUTH_CONNECTOR_SUPPORTED_CHAINS.includes(r);
      if (!s)
        return;
      this.setLoading(!0, r);
      const n = e.getLoginEmailUsed();
      this.setLoading(n, r), n && this.setStatus("connecting", r);
      const i = e.getEmail(), o = e.getUsername();
      this.setUser(B(C({}, ((u = ne.state) == null ? void 0 : u.user) || {}), { username: o, email: i }), R.state.activeChain), this.setupAuthConnectorListeners(e);
      const { isConnected: a } = yield e.isConnected(), c = Nt.getSnapshot(), l = q.getSnapshot();
      e.syncDappData({
        metadata: l.metadata,
        sdkVersion: l.sdkVersion,
        projectId: l.projectId,
        sdkType: l.sdkType
      }), e.syncTheme({
        themeMode: c.themeMode,
        themeVariables: c.themeVariables,
        w3mThemeVariables: ns(c.themeVariables, c.themeMode)
      }), r && s && (a && ((d = this.connectionControllerClient) != null && d.connectExternal) ? (yield (g = this.connectionControllerClient) == null ? void 0 : g.connectExternal({
        id: se.CONNECTOR_ID.AUTH,
        info: { name: se.CONNECTOR_ID.AUTH },
        type: qt.CONNECTOR_TYPE_AUTH,
        provider: e,
        chainId: (p = R.state.activeCaipNetwork) == null ? void 0 : p.id,
        chain: r
      }), this.setStatus("connected", r)) : pe.getConnectorId(r) === se.CONNECTOR_ID.AUTH && (this.setStatus("disconnected", r), re.removeConnectedNamespace(r))), this.setLoading(!1, r);
    });
  }
  checkExistingTelegramSocialConnection(e) {
    return h(this, null, function* () {
      var r;
      try {
        if (!he.isTelegram())
          return;
        const s = re.getTelegramSocialProvider();
        if (!s || typeof window == "undefined" || typeof document == "undefined")
          return;
        const i = new URL(window.location.href).searchParams.get("result_uri");
        if (!i)
          return;
        ne.setSocialProvider(s, e), yield (r = this.authProvider) == null ? void 0 : r.init();
        const o = pe.getAuthConnector();
        s && o && (this.setLoading(!0, e), yield o.provider.connectSocial(i), yield He.connectExternal(o, o.chain), re.setConnectedSocialProvider(s), re.removeTelegramSocialProvider(), Ke.sendEvent({
          type: "track",
          event: "SOCIAL_LOGIN_SUCCESS",
          properties: { provider: s }
        }));
      } catch (s) {
        this.setLoading(!1, e), console.error("checkExistingSTelegramocialConnection error", s);
      }
      try {
        const s = new URL(window.location.href);
        s.searchParams.delete("result_uri"), window.history.replaceState({}, document.title, s.toString());
      } catch (s) {
        console.error("tma social login failed", s);
      }
    });
  }
  createAuthProvider(e) {
    var o, a, c, l, u, d, p, g, m, f, w, S, E, I, A, T;
    if (!se.AUTH_CONNECTOR_SUPPORTED_CHAINS.includes(e))
      return;
    const s = ((a = (o = this.options) == null ? void 0 : o.features) == null ? void 0 : a.email) === void 0 ? vt.DEFAULT_FEATURES.email : (l = (c = this.options) == null ? void 0 : c.features) == null ? void 0 : l.email, n = (d = (u = this.options) == null ? void 0 : u.features) != null && d.socials ? ((m = (g = (p = this.options) == null ? void 0 : p.features) == null ? void 0 : g.socials) == null ? void 0 : m.length) > 0 : (S = (w = (f = this.options) == null ? void 0 : f.features) == null ? void 0 : w.socials) != null ? S : vt.DEFAULT_FEATURES.socials, i = s || n;
    !this.authProvider && ((E = this.options) != null && E.projectId) && i && (this.authProvider = Gi.getInstance({
      projectId: this.options.projectId,
      enableLogger: this.options.enableAuthLogger,
      chainId: (I = this.getCaipNetwork(e)) == null ? void 0 : I.caipNetworkId,
      abortController: Br.EmbeddedWalletAbortController,
      onTimeout: (b) => {
        b === "iframe_load_failed" ? rs.open(Br.ALERT_ERRORS.IFRAME_LOAD_FAILED, "error") : b === "iframe_request_timeout" ? rs.open(Br.ALERT_ERRORS.IFRAME_REQUEST_TIMEOUT, "error") : b === "unverified_domain" && rs.open(Br.ALERT_ERRORS.UNVERIFIED_DOMAIN, "error");
      }
    }), qr.subscribeOpen((b) => {
      var N;
      !b && this.isTransactionStackEmpty() && ((N = this.authProvider) == null || N.rejectRpcRequests());
    }), e === se.CHAIN.EVM && ((A = ne.state.preferredAccountTypes) != null && A.eip155) && this.authProvider.setPreferredAccount((T = ne.state.preferredAccountTypes) == null ? void 0 : T.eip155), this.syncAuthConnector(this.authProvider, e), this.checkExistingTelegramSocialConnection(e));
  }
  createAuthProviderForAdapter(e) {
    var r, s, n;
    this.createAuthProvider(e), this.authProvider && ((n = (s = (r = this.chainAdapters) == null ? void 0 : r[e]) == null ? void 0 : s.setAuthProvider) == null || n.call(s, this.authProvider));
  }
  // -- Overrides ----------------------------------------------------------------
  initControllers(e) {
    super.initControllers(e), this.options.excludeWalletIds && le.initializeExcludedWallets({ ids: this.options.excludeWalletIds });
  }
  switchCaipNetwork(e) {
    return h(this, null, function* () {
      var i, o;
      if (!e)
        return;
      const r = R.state.activeChain, s = e.chainNamespace, n = this.getAddressByChainNamespace(e.chainNamespace);
      if (e.chainNamespace === R.state.activeChain && n) {
        const a = this.getAdapter(s), c = Ue.getProvider(s), l = Ue.getProviderId(s);
        yield a == null ? void 0 : a.switchNetwork({ caipNetwork: e, provider: c, providerType: l }), this.setCaipNetwork(e);
      } else {
        const c = Ue.getProviderId(r) === qt.CONNECTOR_TYPE_AUTH, l = Ue.getProviderId(s), u = l === qt.CONNECTOR_TYPE_AUTH, d = se.AUTH_CONNECTOR_SUPPORTED_CHAINS.includes(s);
        if (
          // If the current namespace is one of the auth connector supported chains, when switching to other supported namespace, we should use the auth connector
          (c || u) && d
        )
          try {
            R.state.activeChain = e.chainNamespace, yield (o = (i = this.connectionControllerClient) == null ? void 0 : i.connectExternal) == null ? void 0 : o.call(i, {
              id: se.CONNECTOR_ID.AUTH,
              provider: this.authProvider,
              chain: s,
              chainId: e.id,
              type: qt.CONNECTOR_TYPE_AUTH,
              caipNetwork: e
            }), this.setCaipNetwork(e);
          } catch (p) {
            const g = this.getAdapter(s);
            yield g == null ? void 0 : g.switchNetwork({
              caipNetwork: e,
              provider: this.authProvider,
              providerType: l
            });
          }
        else l === qt.CONNECTOR_TYPE_WALLET_CONNECT ? (this.setCaipNetwork(e), this.syncWalletConnectAccount()) : (this.setCaipNetwork(e), n && this.syncAccount({
          address: n,
          chainId: e.id,
          chainNamespace: s
        }));
      }
    });
  }
  initChainAdapter(e) {
    return h(this, null, function* () {
      yield _d(dd.prototype, this, "initChainAdapter").call(this, e), this.createAuthProviderForAdapter(e);
    });
  }
  syncIdentity(n) {
    return h(this, arguments, function* ({ address: e, chainId: r, chainNamespace: s }) {
      var a;
      const i = `${s}:${r}`, o = (a = this.caipNetworks) == null ? void 0 : a.find((c) => c.caipNetworkId === i);
      if (s !== se.CHAIN.EVM || o != null && o.testnet) {
        this.setProfileName(null, s), this.setProfileImage(null, s);
        return;
      }
      try {
        const { name: c, avatar: l } = yield this.fetchIdentity({
          address: e,
          caipNetworkId: i
        });
        this.setProfileName(c, s), this.setProfileImage(l, s);
      } catch (c) {
        yield this.syncReownName(e, s), r !== 1 && this.setProfileImage(null, s);
      }
    });
  }
  syncConnectedWalletInfo(e) {
    var s, n;
    const r = Ue.getProviderId(e);
    if (r === qt.CONNECTOR_TYPE_AUTH) {
      const i = this.authProvider;
      if (i) {
        const o = (s = re.getConnectedSocialProvider()) != null ? s : "email", a = (n = i.getEmail()) != null ? n : i.getUsername();
        this.setConnectedWalletInfo({ name: r, identifier: a, social: o }, e);
      }
    } else
      super.syncConnectedWalletInfo(e);
  }
  injectModalUi() {
    return h(this, null, function* () {
      if (!Yf && he.isClient()) {
        const e = C(C({}, vt.DEFAULT_FEATURES), this.options.features), r = [];
        if (e && ((e.email || e.socials && e.socials.length) && r.push(import("./embedded-wallet-BeIhd6bt.mjs")), e.email && r.push(import("./email-BkBlwkf6.mjs")), e.socials && r.push(import("./socials-BrdMnfy6.mjs")), e.swaps && r.push(import("./swaps-D-AsRGkX.mjs")), e.send && r.push(import("./send-BhptToV0.mjs")), e.receive && r.push(import("./receive-Bk8NK-ZU.mjs")), e.onramp && r.push(import("./onramp-bEMJc2tQ.mjs")), e.history && r.push(import("./transactions-DK8yPMcS.mjs")), e.pay && r.push(import("./index-DNPAJu1G.mjs"))), yield Promise.all([
          ...r,
          import("./index-CkG6Ukwf.mjs"),
          import("./w3m-modal-CMjk33JI.mjs")
        ]), !document.querySelector("w3m-modal")) {
          const n = document.createElement("w3m-modal");
          !q.state.disableAppend && !q.state.enableEmbedded && document.body.insertAdjacentElement("beforeend", n);
        }
        Yf = !0;
      }
    });
  }
}
const e$ = "1.7.4";
function t$(t) {
  var e;
  return new dd(B(C({}, t), {
    sdkVersion: he.generateSdkVersion((e = t.adapters) != null ? e : [], "html", e$)
  }));
}
let pc;
try {
  const { Ethers5Adapter: t } = require("@reown/appkit-adapter-ethers5");
  pc = new t();
} catch (t) {
  console.warn("Could not load Ethers5Adapter, falling back to defaults"), pc = null;
}
const r$ = {
  name: "Link3 Developer Portal",
  description: "Web3 authentication for Link3 platform",
  url: window.location.origin,
  icons: ["https://placehold.co/400x400/4287f5/ffffff?text=Link3"]
  // Use a placeholder if logo not found
}, s$ = t$({
  adapters: pc ? [pc] : [],
  projectId: window.REOWN_CLIENT_ID || "56b29646dee3d7b8afbe2071a2cf088d",
  // Use client secret as project ID
  metadata: r$,
  networks: [Gk],
  features: {
    analytics: !1,
    // Disable analytics to avoid 403 errors
    email: !0,
    socials: ["google", "github", "discord"]
  },
  themeMode: "light"
}), Pa = document.currentScript || document.querySelector("script[data-client-id]");
Pa && Pa.dataset && Pa.dataset.clientId && (window.REOWN_CLIENT_ID = Pa.dataset.clientId);
window.ReownAppKit = s$;
class n$ {
  constructor(e = {}) {
    this.clientId = e.clientId || window.REOWN_CLIENT_ID || "", this.redirectUrl = e.redirectUrl || window.location.origin + "/signup/", this.callbackPath = e.callbackPath || "/auth/reown/callback/", this.onLoginSuccess = e.onLoginSuccess || (() => {
    }), this.onLoginError = e.onLoginError || ((r) => console.error("Reown login error:", r)), this.reownAppKit = null, this.userProfile = null, this.init();
  }
  init() {
    return h(this, null, function* () {
      try {
        this.reownAppKit = window.ReownAppKit, this.isCallbackUrl() && (yield this.handleAuthCallback());
      } catch (e) {
        this.onLoginError(e);
      }
    });
  }
  connectWallet() {
    return h(this, null, function* () {
      try {
        if (!this.reownAppKit) throw new Error("Reown AppKit not initialized");
        return yield this.reownAppKit.open();
      } catch (e) {
        throw this.onLoginError(e), e;
      }
    });
  }
  login() {
    return h(this, null, function* () {
      try {
        this.reownAppKit || (yield this.init()), console.log("Opening Reown authentication modal..."), yield this.reownAppKit.open({
          view: "Sign",
          signMessage: "Sign this message to authenticate with Link3"
        }), this.isCallbackUrl() && (yield this.handleAuthCallback());
      } catch (e) {
        throw console.error("Login error:", e), e.message && (e.message.includes("403") || e.message.includes("Connection") || e.message.includes("interrupted")) && (e.message = "Web3 wallet connection service encountered an issue. Please try again later or use email signup."), this.onLoginError(e), e;
      }
    });
  }
  handleAuthCallback() {
    return h(this, null, function* () {
      try {
        const e = yield this.reownAppKit.handleCallback();
        if (e && e.token) {
          sessionStorage.setItem("reown_auth_token", e.token), this.userProfile = yield this.getUserProfile();
          const r = new FormData();
          r.append("reown_auth_token", e.token), this.userProfile && (r.append("reown_user_id", this.userProfile.id), r.append("reown_user_email", this.userProfile.email || ""), r.append("reown_user_name", this.userProfile.name || ""), r.append("reown_wallet_address", this.userProfile.wallet_address || ""));
          const n = yield (yield fetch(this.callbackPath, {
            method: "POST",
            body: r,
            headers: {
              "X-CSRFToken": this.getCsrfToken()
            }
          })).json();
          if (n.success)
            this.onLoginSuccess(n);
          else
            throw new Error(n.error || "Authentication failed");
        } else
          throw new Error("Invalid authentication response");
      } catch (e) {
        throw this.onLoginError(e), e;
      }
    });
  }
  getUserProfile() {
    return h(this, null, function* () {
      try {
        const e = sessionStorage.getItem("reown_auth_token");
        if (!e) throw new Error("Not authenticated");
        const r = yield this.reownAppKit.getUserProfile(e);
        return this.userProfile = r, r;
      } catch (e) {
        return this.onLoginError(e), null;
      }
    });
  }
  isAuthenticated() {
    return !!sessionStorage.getItem("reown_auth_token");
  }
  isCallbackUrl() {
    return window.location.search.includes("code=");
  }
  getCsrfToken() {
    const e = "csrftoken=", s = decodeURIComponent(document.cookie).split(";");
    for (let n = 0; n < s.length; n++) {
      let i = s[n].trim();
      if (i.indexOf(e) === 0)
        return i.substring(e.length, i.length);
    }
    return "";
  }
}
window.ReownAppkitConnector = n$;
export {
  xu as $,
  ne as A,
  de as B,
  pe as C,
  le as D,
  Lw as E,
  a$ as F,
  Ox as G,
  Cr as H,
  Dy as I,
  Ue as J,
  dU as K,
  Pu as L,
  et as M,
  Oy as N,
  q as O,
  ds as P,
  ja as Q,
  xe as R,
  Ar as S,
  Nt as T,
  Vi as U,
  Du as V,
  Et as W,
  aU as X,
  dt as Y,
  cU as Z,
  Kw as _,
  za as a,
  ai as a0,
  wC as a1,
  z$ as a2,
  Eh as a3,
  Yg as a4,
  aC as a5,
  yC as a6,
  W$ as a7,
  q$ as a8,
  vc as a9,
  V$ as aa,
  H$ as ab,
  vt as b,
  se as c,
  he as d,
  R as e,
  Ke as f,
  ns as g,
  uU as h,
  Kn as i,
  tr as j,
  He as k,
  qt as l,
  Tk as m,
  rs as n,
  Ok as o,
  re as p,
  Br as q,
  lU as r,
  Of as s,
  ig as t,
  Ye as u,
  Tf as v,
  Wt as w,
  oU as x,
  Dt as y,
  o$ as z
};
