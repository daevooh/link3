var me = Object.defineProperty, pe = Object.defineProperties;
var ge = Object.getOwnPropertyDescriptors;
var re = Object.getOwnPropertySymbols;
var ye = Object.prototype.hasOwnProperty, $e = Object.prototype.propertyIsEnumerable;
var ie = (e, o, u) => o in e ? me(e, o, { enumerable: !0, configurable: !0, writable: !0, value: u }) : e[o] = u, ue = (e, o) => {
  for (var u in o || (o = {}))
    ye.call(o, u) && ie(e, u, o[u]);
  if (re)
    for (var u of re(o))
      $e.call(o, u) && ie(e, u, o[u]);
  return e;
}, oe = (e, o) => pe(e, ge(o));
import { U as se, c as ve } from "./if-defined-SxgRDNx5.mjs";
import { V as ee, i as Te, r as Me, a as xe, x as we } from "./reown-appkit-connector-RlB2KFu3.mjs";
import "./index-B0Tzl2T9.mjs";
var Q = { exports: {} }, De = Q.exports, ae;
function _e() {
  return ae || (ae = 1, function(e, o) {
    (function(u, d) {
      e.exports = d();
    })(De, function() {
      var u = 1e3, d = 6e4, m = 36e5, l = "millisecond", f = "second", y = "minute", $ = "hour", p = "day", w = "week", T = "month", I = "quarter", b = "year", D = "date", j = "Invalid Date", q = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, W = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, B = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(s) {
        var r = ["th", "st", "nd", "rd"], t = s % 100;
        return "[" + s + (r[(t - 20) % 10] || r[t] || r[0]) + "]";
      } }, C = function(s, r, t) {
        var i = String(s);
        return !i || i.length >= r ? s : "" + Array(r + 1 - i.length).join(t) + s;
      }, R = { s: C, z: function(s) {
        var r = -s.utcOffset(), t = Math.abs(r), i = Math.floor(t / 60), n = t % 60;
        return (r <= 0 ? "+" : "-") + C(i, 2, "0") + ":" + C(n, 2, "0");
      }, m: function s(r, t) {
        if (r.date() < t.date()) return -s(t, r);
        var i = 12 * (t.year() - r.year()) + (t.month() - r.month()), n = r.clone().add(i, T), a = t - n < 0, c = r.clone().add(i + (a ? -1 : 1), T);
        return +(-(i + (t - n) / (a ? n - c : c - n)) || 0);
      }, a: function(s) {
        return s < 0 ? Math.ceil(s) || 0 : Math.floor(s);
      }, p: function(s) {
        return { M: T, y: b, w, d: p, D, h: $, m: y, s: f, ms: l, Q: I }[s] || String(s || "").toLowerCase().replace(/s$/, "");
      }, u: function(s) {
        return s === void 0;
      } }, S = "en", O = {};
      O[S] = B;
      var E = "$isDayjsObject", Y = function(s) {
        return s instanceof z || !(!s || !s[E]);
      }, Z = function s(r, t, i) {
        var n;
        if (!r) return S;
        if (typeof r == "string") {
          var a = r.toLowerCase();
          O[a] && (n = a), t && (O[a] = t, n = a);
          var c = r.split("-");
          if (!n && c.length > 1) return s(c[0]);
        } else {
          var g = r.name;
          O[g] = r, n = g;
        }
        return !i && n && (S = n), n || !i && S;
      }, M = function(s, r) {
        if (Y(s)) return s.clone();
        var t = typeof r == "object" ? r : {};
        return t.date = s, t.args = arguments, new z(t);
      }, h = R;
      h.l = Z, h.i = Y, h.w = function(s, r) {
        return M(s, { locale: r.$L, utc: r.$u, x: r.$x, $offset: r.$offset });
      };
      var z = function() {
        function s(t) {
          this.$L = Z(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[E] = !0;
        }
        var r = s.prototype;
        return r.parse = function(t) {
          this.$d = function(i) {
            var n = i.date, a = i.utc;
            if (n === null) return /* @__PURE__ */ new Date(NaN);
            if (h.u(n)) return /* @__PURE__ */ new Date();
            if (n instanceof Date) return new Date(n);
            if (typeof n == "string" && !/Z$/i.test(n)) {
              var c = n.match(q);
              if (c) {
                var g = c[2] - 1 || 0, v = (c[7] || "0").substring(0, 3);
                return a ? new Date(Date.UTC(c[1], g, c[3] || 1, c[4] || 0, c[5] || 0, c[6] || 0, v)) : new Date(c[1], g, c[3] || 1, c[4] || 0, c[5] || 0, c[6] || 0, v);
              }
            }
            return new Date(n);
          }(t), this.init();
        }, r.init = function() {
          var t = this.$d;
          this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
        }, r.$utils = function() {
          return h;
        }, r.isValid = function() {
          return this.$d.toString() !== j;
        }, r.isSame = function(t, i) {
          var n = M(t);
          return this.startOf(i) <= n && n <= this.endOf(i);
        }, r.isAfter = function(t, i) {
          return M(t) < this.startOf(i);
        }, r.isBefore = function(t, i) {
          return this.endOf(i) < M(t);
        }, r.$g = function(t, i, n) {
          return h.u(t) ? this[i] : this.set(n, t);
        }, r.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, r.valueOf = function() {
          return this.$d.getTime();
        }, r.startOf = function(t, i) {
          var n = this, a = !!h.u(i) || i, c = h.p(t), g = function(k, L) {
            var N = h.w(n.$u ? Date.UTC(n.$y, L, k) : new Date(n.$y, L, k), n);
            return a ? N : N.endOf(p);
          }, v = function(k, L) {
            return h.w(n.toDate()[k].apply(n.toDate("s"), (a ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(L)), n);
          }, x = this.$W, _ = this.$M, F = this.$D, A = "set" + (this.$u ? "UTC" : "");
          switch (c) {
            case b:
              return a ? g(1, 0) : g(31, 11);
            case T:
              return a ? g(1, _) : g(0, _ + 1);
            case w:
              var U = this.$locale().weekStart || 0, J = (x < U ? x + 7 : x) - U;
              return g(a ? F - J : F + (6 - J), _);
            case p:
            case D:
              return v(A + "Hours", 0);
            case $:
              return v(A + "Minutes", 1);
            case y:
              return v(A + "Seconds", 2);
            case f:
              return v(A + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, r.endOf = function(t) {
          return this.startOf(t, !1);
        }, r.$set = function(t, i) {
          var n, a = h.p(t), c = "set" + (this.$u ? "UTC" : ""), g = (n = {}, n[p] = c + "Date", n[D] = c + "Date", n[T] = c + "Month", n[b] = c + "FullYear", n[$] = c + "Hours", n[y] = c + "Minutes", n[f] = c + "Seconds", n[l] = c + "Milliseconds", n)[a], v = a === p ? this.$D + (i - this.$W) : i;
          if (a === T || a === b) {
            var x = this.clone().set(D, 1);
            x.$d[g](v), x.init(), this.$d = x.set(D, Math.min(this.$D, x.daysInMonth())).$d;
          } else g && this.$d[g](v);
          return this.init(), this;
        }, r.set = function(t, i) {
          return this.clone().$set(t, i);
        }, r.get = function(t) {
          return this[h.p(t)]();
        }, r.add = function(t, i) {
          var n, a = this;
          t = Number(t);
          var c = h.p(i), g = function(_) {
            var F = M(a);
            return h.w(F.date(F.date() + Math.round(_ * t)), a);
          };
          if (c === T) return this.set(T, this.$M + t);
          if (c === b) return this.set(b, this.$y + t);
          if (c === p) return g(1);
          if (c === w) return g(7);
          var v = (n = {}, n[y] = d, n[$] = m, n[f] = u, n)[c] || 1, x = this.$d.getTime() + t * v;
          return h.w(x, this);
        }, r.subtract = function(t, i) {
          return this.add(-1 * t, i);
        }, r.format = function(t) {
          var i = this, n = this.$locale();
          if (!this.isValid()) return n.invalidDate || j;
          var a = t || "YYYY-MM-DDTHH:mm:ssZ", c = h.z(this), g = this.$H, v = this.$m, x = this.$M, _ = n.weekdays, F = n.months, A = n.meridiem, U = function(L, N, V, P) {
            return L && (L[N] || L(i, a)) || V[N].slice(0, P);
          }, J = function(L) {
            return h.s(g % 12 || 12, L, "0");
          }, k = A || function(L, N, V) {
            var P = L < 12 ? "AM" : "PM";
            return V ? P.toLowerCase() : P;
          };
          return a.replace(W, function(L, N) {
            return N || function(V) {
              switch (V) {
                case "YY":
                  return String(i.$y).slice(-2);
                case "YYYY":
                  return h.s(i.$y, 4, "0");
                case "M":
                  return x + 1;
                case "MM":
                  return h.s(x + 1, 2, "0");
                case "MMM":
                  return U(n.monthsShort, x, F, 3);
                case "MMMM":
                  return U(F, x);
                case "D":
                  return i.$D;
                case "DD":
                  return h.s(i.$D, 2, "0");
                case "d":
                  return String(i.$W);
                case "dd":
                  return U(n.weekdaysMin, i.$W, _, 2);
                case "ddd":
                  return U(n.weekdaysShort, i.$W, _, 3);
                case "dddd":
                  return _[i.$W];
                case "H":
                  return String(g);
                case "HH":
                  return h.s(g, 2, "0");
                case "h":
                  return J(1);
                case "hh":
                  return J(2);
                case "a":
                  return k(g, v, !0);
                case "A":
                  return k(g, v, !1);
                case "m":
                  return String(v);
                case "mm":
                  return h.s(v, 2, "0");
                case "s":
                  return String(i.$s);
                case "ss":
                  return h.s(i.$s, 2, "0");
                case "SSS":
                  return h.s(i.$ms, 3, "0");
                case "Z":
                  return c;
              }
              return null;
            }(L) || c.replace(":", "");
          });
        }, r.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, r.diff = function(t, i, n) {
          var a, c = this, g = h.p(i), v = M(t), x = (v.utcOffset() - this.utcOffset()) * d, _ = this - v, F = function() {
            return h.m(c, v);
          };
          switch (g) {
            case b:
              a = F() / 12;
              break;
            case T:
              a = F();
              break;
            case I:
              a = F() / 3;
              break;
            case w:
              a = (_ - x) / 6048e5;
              break;
            case p:
              a = (_ - x) / 864e5;
              break;
            case $:
              a = _ / m;
              break;
            case y:
              a = _ / d;
              break;
            case f:
              a = _ / u;
              break;
            default:
              a = _;
          }
          return n ? a : h.a(a);
        }, r.daysInMonth = function() {
          return this.endOf(T).$D;
        }, r.$locale = function() {
          return O[this.$L];
        }, r.locale = function(t, i) {
          if (!t) return this.$L;
          var n = this.clone(), a = Z(t, i, !0);
          return a && (n.$L = a), n;
        }, r.clone = function() {
          return h.w(this.$d, this);
        }, r.toDate = function() {
          return new Date(this.valueOf());
        }, r.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, r.toISOString = function() {
          return this.$d.toISOString();
        }, r.toString = function() {
          return this.$d.toUTCString();
        }, s;
      }(), ne = z.prototype;
      return M.prototype = ne, [["$ms", l], ["$s", f], ["$m", y], ["$H", $], ["$W", p], ["$M", T], ["$y", b], ["$D", D]].forEach(function(s) {
        ne[s[1]] = function(r) {
          return this.$g(r, s[0], s[1]);
        };
      }), M.extend = function(s, r) {
        return s.$i || (s(r, z, M), s.$i = !0), M;
      }, M.locale = Z, M.isDayjs = Y, M.unix = function(s) {
        return M(1e3 * s);
      }, M.en = O[S], M.Ls = O, M.p = {}, M;
    });
  }(Q)), Q.exports;
}
var be = _e();
const H = /* @__PURE__ */ ee(be);
var G = { exports: {} }, Se = G.exports, ce;
function Oe() {
  return ce || (ce = 1, function(e, o) {
    (function(u, d) {
      e.exports = d();
    })(Se, function() {
      return { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(u) {
        var d = ["th", "st", "nd", "rd"], m = u % 100;
        return "[" + u + (d[(m - 20) % 10] || d[m] || d[0]) + "]";
      } };
    });
  }(G)), G.exports;
}
var Le = Oe();
const Fe = /* @__PURE__ */ ee(Le);
var X = { exports: {} }, Ie = X.exports, de;
function Ne() {
  return de || (de = 1, function(e, o) {
    (function(u, d) {
      e.exports = d();
    })(Ie, function() {
      return function(u, d, m) {
        u = u || {};
        var l = d.prototype, f = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
        function y(p, w, T, I) {
          return l.fromToBase(p, w, T, I);
        }
        m.en.relativeTime = f, l.fromToBase = function(p, w, T, I, b) {
          for (var D, j, q, W = T.$locale().relativeTime || f, B = u.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], C = B.length, R = 0; R < C; R += 1) {
            var S = B[R];
            S.d && (D = I ? m(p).diff(T, S.d, !0) : T.diff(p, S.d, !0));
            var O = (u.rounding || Math.round)(Math.abs(D));
            if (q = D > 0, O <= S.r || !S.r) {
              O <= 1 && R > 0 && (S = B[R - 1]);
              var E = W[S.l];
              b && (O = b("" + O)), j = typeof E == "string" ? E.replace("%d", O) : E(O, w, S.l, q);
              break;
            }
          }
          if (w) return j;
          var Y = q ? W.future : W.past;
          return typeof Y == "function" ? Y(j) : Y.replace("%s", j);
        }, l.to = function(p, w) {
          return y(p, w, this, !0);
        }, l.from = function(p, w) {
          return y(p, w, this);
        };
        var $ = function(p) {
          return p.$u ? m.utc() : m();
        };
        l.toNow = function(p) {
          return this.to($(this), p);
        }, l.fromNow = function(p) {
          return this.from($(this), p);
        };
      };
    });
  }(X)), X.exports;
}
var je = Ne();
const Re = /* @__PURE__ */ ee(je);
var K = { exports: {} }, Ye = K.exports, le;
function Ue() {
  return le || (le = 1, function(e, o) {
    (function(u, d) {
      e.exports = d();
    })(Ye, function() {
      return function(u, d, m) {
        m.updateLocale = function(l, f) {
          var y = m.Ls[l];
          if (y) return (f ? Object.keys(f) : []).forEach(function($) {
            y[$] = f[$];
          }), y;
        };
      };
    });
  }(K)), K.exports;
}
var ke = Ue();
const Ee = /* @__PURE__ */ ee(ke);
H.extend(Re);
H.extend(Ee);
const Ae = oe(ue({}, Fe), {
  name: "en-web3-modal",
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d sec",
    m: "1 min",
    mm: "%d min",
    h: "1 hr",
    hh: "%d hrs",
    d: "1 d",
    dd: "%d d",
    M: "1 mo",
    MM: "%d mo",
    y: "1 yr",
    yy: "%d yr"
  }
}), He = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
H.locale("en-web3-modal", Ae);
const he = {
  getMonthNameByIndex(e) {
    return He[e];
  },
  getYear(e = (/* @__PURE__ */ new Date()).toISOString()) {
    return H(e).year();
  },
  getRelativeDateFromNow(e) {
    return H(e).locale("en-web3-modal").fromNow(!0);
  },
  formatDate(e, o = "DD MMM") {
    return H(e).format(o);
  }
}, qe = 3, We = ["receive", "deposit", "borrow", "claim"], Be = ["withdraw", "repay", "burn"], fe = {
  getTransactionGroupTitle(e, o) {
    const u = he.getYear(), d = he.getMonthNameByIndex(o);
    return e === u ? d : `${d} ${e}`;
  },
  getTransactionImages(e) {
    const [o, u] = e, d = !!o && (e == null ? void 0 : e.every((f) => !!f.nft_info)), m = (e == null ? void 0 : e.length) > 1;
    return (e == null ? void 0 : e.length) === 2 && !d ? [this.getTransactionImage(o), this.getTransactionImage(u)] : m ? e.map((f) => this.getTransactionImage(f)) : [this.getTransactionImage(o)];
  },
  getTransactionImage(e) {
    return {
      type: fe.getTransactionTransferTokenType(e),
      url: fe.getTransactionImageURL(e)
    };
  },
  getTransactionImageURL(e) {
    var m, l, f, y, $;
    let o;
    const u = !!(e != null && e.nft_info), d = !!(e != null && e.fungible_info);
    return e && u ? o = (f = (l = (m = e == null ? void 0 : e.nft_info) == null ? void 0 : m.content) == null ? void 0 : l.preview) == null ? void 0 : f.url : e && d && (o = ($ = (y = e == null ? void 0 : e.fungible_info) == null ? void 0 : y.icon) == null ? void 0 : $.url), o;
  },
  getTransactionTransferTokenType(e) {
    if (e != null && e.fungible_info)
      return "FUNGIBLE";
    if (e != null && e.nft_info)
      return "NFT";
  },
  getTransactionDescriptions(e) {
    var T, I, b;
    const o = (T = e == null ? void 0 : e.metadata) == null ? void 0 : T.operationType, u = e == null ? void 0 : e.transfers, d = ((I = e == null ? void 0 : e.transfers) == null ? void 0 : I.length) > 0, m = ((b = e == null ? void 0 : e.transfers) == null ? void 0 : b.length) > 1, l = d && (u == null ? void 0 : u.every((D) => !!(D != null && D.fungible_info))), [f, y] = u;
    let $ = this.getTransferDescription(f), p = this.getTransferDescription(y);
    if (!d)
      return (o === "send" || o === "receive") && l ? ($ = se.getTruncateString({
        string: e == null ? void 0 : e.metadata.sentFrom,
        charsStart: 4,
        charsEnd: 6,
        truncate: "middle"
      }), p = se.getTruncateString({
        string: e == null ? void 0 : e.metadata.sentTo,
        charsStart: 4,
        charsEnd: 6,
        truncate: "middle"
      }), [$, p]) : [e.metadata.status];
    if (m)
      return u.map((D) => this.getTransferDescription(D));
    let w = "";
    return We.includes(o) ? w = "+" : Be.includes(o) && (w = "-"), $ = w.concat($), [$];
  },
  getTransferDescription(e) {
    var u;
    let o = "";
    return e && (e != null && e.nft_info ? o = ((u = e == null ? void 0 : e.nft_info) == null ? void 0 : u.name) || "-" : e != null && e.fungible_info && (o = this.getFungibleTransferDescription(e) || "-")), o;
  },
  getFungibleTransferDescription(e) {
    var d;
    return e ? [this.getQuantityFixedValue(e == null ? void 0 : e.quantity.numeric), (d = e == null ? void 0 : e.fungible_info) == null ? void 0 : d.symbol].join(" ").trim() : null;
  },
  getQuantityFixedValue(e) {
    return e ? parseFloat(e).toFixed(qe) : null;
  }
}, Ce = Te`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;
var Je = function(e, o, u, d) {
  var m = arguments.length, l = m < 3 ? o : d === null ? d = Object.getOwnPropertyDescriptor(o, u) : d, f;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") l = Reflect.decorate(e, o, u, d);
  else for (var y = e.length - 1; y >= 0; y--) (f = e[y]) && (l = (m < 3 ? f(l) : m > 3 ? f(o, u, l) : f(o, u)) || l);
  return m > 3 && l && Object.defineProperty(o, u, l), l;
};
let te = class extends xe {
  render() {
    return we`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="2xs">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-shimmer width="24px" height="12px" borderRadius="5xs"></wui-shimmer>
      </wui-flex>
    `;
  }
};
te.styles = [Me, Ce];
te = Je([
  ve("wui-transaction-list-item-loader")
], te);
export {
  he as D,
  fe as T
};
