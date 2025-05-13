var F = Object.defineProperty, G = Object.defineProperties;
var N = Object.getOwnPropertyDescriptors;
var P = Object.getOwnPropertySymbols;
var E = Object.prototype.hasOwnProperty, W = Object.prototype.propertyIsEnumerable;
var R = (e, t, i) => t in e ? F(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, j = (e, t) => {
  for (var i in t || (t = {}))
    E.call(t, i) && R(e, i, t[i]);
  if (P)
    for (var i of P(t))
      W.call(t, i) && R(e, i, t[i]);
  return e;
}, B = (e, t) => G(e, N(t));
var o = (e, t, i) => new Promise((r, a) => {
  var n = (l) => {
    try {
      c(i.next(l));
    } catch (g) {
      a(g);
    }
  }, s = (l) => {
    try {
      c(i.throw(l));
    } catch (g) {
      a(g);
    }
  }, c = (l) => l.done ? r(l.value) : Promise.resolve(l.value).then(n, s);
  c((i = i.apply(e, t)).next());
});
import { _ as K, $ as V, a0 as x, i as z, r as A, K as Y, a as T, x as S, Y as q } from "./reown-appkit-connector-RlB2KFu3.mjs";
const f = {
  getSpacingStyles(e, t) {
    if (Array.isArray(e))
      return e[t] ? `var(--wui-spacing-${e[t]})` : void 0;
    if (typeof e == "string")
      return `var(--wui-spacing-${e})`;
  },
  getFormattedDate(e) {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(e);
  },
  getHostName(e) {
    try {
      return new URL(e).hostname;
    } catch (t) {
      return "";
    }
  },
  getTruncateString({ string: e, charsStart: t, charsEnd: i, truncate: r }) {
    return e.length <= t + i ? e : r === "end" ? `${e.substring(0, t)}...` : r === "start" ? `...${e.substring(e.length - i)}` : `${e.substring(0, Math.floor(t))}...${e.substring(e.length - Math.floor(i))}`;
  },
  generateAvatarColors(e) {
    const i = e.toLowerCase().replace(/^0x/iu, "").replace(/[^a-f0-9]/gu, "").substring(0, 6).padEnd(6, "0"), r = this.hexToRgb(i), a = getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"), s = 100 - 3 * Number(a == null ? void 0 : a.replace("px", "")), c = `${s}% ${s}% at 65% 40%`, l = [];
    for (let g = 0; g < 5; g += 1) {
      const w = this.tintColor(r, 0.15 * g);
      l.push(`rgb(${w[0]}, ${w[1]}, ${w[2]})`);
    }
    return `
    --local-color-1: ${l[0]};
    --local-color-2: ${l[1]};
    --local-color-3: ${l[2]};
    --local-color-4: ${l[3]};
    --local-color-5: ${l[4]};
    --local-radial-circle: ${c}
   `;
  },
  hexToRgb(e) {
    const t = parseInt(e, 16), i = t >> 16 & 255, r = t >> 8 & 255, a = t & 255;
    return [i, r, a];
  },
  tintColor(e, t) {
    const [i, r, a] = e, n = Math.round(i + (255 - i) * t), s = Math.round(r + (255 - r) * t), c = Math.round(a + (255 - a) * t);
    return [n, s, c];
  },
  isNumber(e) {
    return {
      number: /^[0-9]+$/u
    }.number.test(e);
  },
  getColorTheme(e) {
    var t;
    return e || (typeof window != "undefined" && window.matchMedia ? (t = window.matchMedia("(prefers-color-scheme: dark)")) != null && t.matches ? "dark" : "light" : "dark");
  },
  splitBalance(e) {
    const t = e.split(".");
    return t.length === 2 ? [t[0], t[1]] : ["0", "00"];
  },
  roundNumber(e, t, i) {
    return e.toString().length >= t ? Number(e).toFixed(i) : e;
  },
  formatNumberToLocalString(e, t = 2) {
    return e === void 0 ? "0.00" : typeof e == "number" ? e.toLocaleString("en-US", {
      maximumFractionDigits: t,
      minimumFractionDigits: t
    }) : parseFloat(e).toLocaleString("en-US", {
      maximumFractionDigits: t,
      minimumFractionDigits: t
    });
  }
};
function X(e, t) {
  const { kind: i, elements: r } = t;
  return {
    kind: i,
    elements: r,
    finisher(a) {
      customElements.get(e) || customElements.define(e, a);
    }
  };
}
function Z(e, t) {
  return customElements.get(e) || customElements.define(e, t), t;
}
function k(e) {
  return function(i) {
    return typeof i == "function" ? Z(e, i) : X(e, i);
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = { attribute: !0, type: String, converter: V, reflect: !1, hasChanged: K }, J = (e = Q, t, i) => {
  const { kind: r, metadata: a } = i;
  let n = globalThis.litPropertyMetadata.get(a);
  if (n === void 0 && globalThis.litPropertyMetadata.set(a, n = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), r === "accessor") {
    const { name: s } = i;
    return { set(c) {
      const l = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(s, l, e);
    }, init(c) {
      return c !== void 0 && this.C(s, void 0, e, c), c;
    } };
  }
  if (r === "setter") {
    const { name: s } = i;
    return function(c) {
      const l = this[s];
      t.call(this, c), this.requestUpdate(s, l, e);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function p(e) {
  return (t, i) => typeof i == "object" ? J(e, t, i) : ((r, a, n) => {
    const s = a.hasOwnProperty(n);
    return a.constructor.createProperty(n, r), s ? Object.getOwnPropertyDescriptor(a, n) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function vt(e) {
  return p(B(j({}, e), { state: !0, attribute: !1 }));
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = (e) => e === null || typeof e != "object" && typeof e != "function", et = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = { ATTRIBUTE: 1, CHILD: 2 }, L = (e) => (...t) => ({ _$litDirective$: e, values: t });
let O = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, r) {
    this._$Ct = t, this._$AM = i, this._$Ci = r;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = (e, t) => {
  var r;
  const i = e._$AN;
  if (i === void 0) return !1;
  for (const a of i) (r = a._$AO) == null || r.call(a, t, !1), v(a, t);
  return !0;
}, b = (e) => {
  let t, i;
  do {
    if ((t = e._$AM) === void 0) break;
    i = t._$AN, i.delete(e), e = t;
  } while ((i == null ? void 0 : i.size) === 0);
}, D = (e) => {
  for (let t; t = e._$AM; e = t) {
    let i = t._$AN;
    if (i === void 0) t._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(e)) break;
    i.add(e), rt(t);
  }
};
function it(e) {
  this._$AN !== void 0 ? (b(this), this._$AM = e, D(this)) : this._$AM = e;
}
function ot(e, t = !1, i = 0) {
  const r = this._$AH, a = this._$AN;
  if (a !== void 0 && a.size !== 0) if (t) if (Array.isArray(r)) for (let n = i; n < r.length; n++) v(r[n], !1), b(r[n]);
  else r != null && (v(r, !1), b(r));
  else v(this, e);
}
const rt = (e) => {
  var t, i;
  e.type == I.CHILD && ((t = e._$AP) != null || (e._$AP = ot), (i = e._$AQ) != null || (e._$AQ = it));
};
class nt extends O {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, i, r) {
    super._$AT(t, i, r), D(this), this.isConnected = t._$AU;
  }
  _$AO(t, i = !0) {
    var r, a;
    t !== this.isConnected && (this.isConnected = t, t ? (r = this.reconnected) == null || r.call(this) : (a = this.disconnected) == null || a.call(this)), i && (v(this, t), b(this));
  }
  setValue(t) {
    if (et(this._$Ct)) this._$Ct._$AI(t, this);
    else {
      const i = [...this._$Ct._$AH];
      i[this._$Ci] = t, this._$Ct._$AI(i, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class at {
  constructor(t) {
    this.G = t;
  }
  disconnect() {
    this.G = void 0;
  }
  reconnect(t) {
    this.G = t;
  }
  deref() {
    return this.G;
  }
}
class st {
  constructor() {
    this.Y = void 0, this.Z = void 0;
  }
  get() {
    return this.Y;
  }
  pause() {
    var t;
    (t = this.Y) != null || (this.Y = new Promise((i) => this.Z = i));
  }
  resume() {
    var t;
    (t = this.Z) == null || t.call(this), this.Y = this.Z = void 0;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = (e) => !tt(e) && typeof e.then == "function", U = 1073741823;
class ct extends nt {
  constructor() {
    super(...arguments), this._$Cwt = U, this._$Cbt = [], this._$CK = new at(this), this._$CX = new st();
  }
  render(...t) {
    var i;
    return (i = t.find((r) => !M(r))) != null ? i : x;
  }
  update(t, i) {
    const r = this._$Cbt;
    let a = r.length;
    this._$Cbt = i;
    const n = this._$CK, s = this._$CX;
    this.isConnected || this.disconnected();
    for (let c = 0; c < i.length && !(c > this._$Cwt); c++) {
      const l = i[c];
      if (!M(l)) return this._$Cwt = c, l;
      c < a && l === r[c] || (this._$Cwt = U, a = 0, Promise.resolve(l).then((g) => o(this, null, function* () {
        for (; s.get(); ) yield s.get();
        const w = n.deref();
        if (w !== void 0) {
          const C = w._$Cbt.indexOf(l);
          C > -1 && C < w._$Cwt && (w._$Cwt = C, w.setValue(g));
        }
      })));
    }
    return x;
  }
  disconnected() {
    this._$CK.disconnect(), this._$CX.pause();
  }
  reconnected() {
    this._$CK.reconnect(this), this._$CX.resume();
  }
}
const lt = L(ct);
class pt {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  set(t, i) {
    this.cache.set(t, i);
  }
  get(t) {
    return this.cache.get(t);
  }
  has(t) {
    return this.cache.has(t);
  }
  delete(t) {
    this.cache.delete(t);
  }
  clear() {
    this.cache.clear();
  }
}
const _ = new pt(), ut = z`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;
var y = function(e, t, i, r) {
  var a = arguments.length, n = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(e, t, i, r);
  else for (var c = e.length - 1; c >= 0; c--) (s = e[c]) && (n = (a < 3 ? s(n) : a > 3 ? s(t, i, n) : s(t, i)) || n);
  return a > 3 && n && Object.defineProperty(t, i, n), n;
};
const H = {
  add: () => o(null, null, function* () {
    return (yield import("./add-G5lcok-u.mjs")).addSvg;
  }),
  allWallets: () => o(null, null, function* () {
    return (yield import("./all-wallets-CdNpdzvi.mjs")).allWalletsSvg;
  }),
  arrowBottomCircle: () => o(null, null, function* () {
    return (yield import("./arrow-bottom-circle-Xr0d-1IL.mjs")).arrowBottomCircleSvg;
  }),
  appStore: () => o(null, null, function* () {
    return (yield import("./app-store-BlrpJM-H.mjs")).appStoreSvg;
  }),
  apple: () => o(null, null, function* () {
    return (yield import("./apple-D2HUNQ8q.mjs")).appleSvg;
  }),
  arrowBottom: () => o(null, null, function* () {
    return (yield import("./arrow-bottom-CCE3SXlr.mjs")).arrowBottomSvg;
  }),
  arrowLeft: () => o(null, null, function* () {
    return (yield import("./arrow-left-DBPY714a.mjs")).arrowLeftSvg;
  }),
  arrowRight: () => o(null, null, function* () {
    return (yield import("./arrow-right-bQkwoXLP.mjs")).arrowRightSvg;
  }),
  arrowTop: () => o(null, null, function* () {
    return (yield import("./arrow-top-B4AHtvSr.mjs")).arrowTopSvg;
  }),
  bank: () => o(null, null, function* () {
    return (yield import("./bank-DQh8kn6u.mjs")).bankSvg;
  }),
  browser: () => o(null, null, function* () {
    return (yield import("./browser-By2NhNvK.mjs")).browserSvg;
  }),
  card: () => o(null, null, function* () {
    return (yield import("./card-Ceeh7NGJ.mjs")).cardSvg;
  }),
  checkmark: () => o(null, null, function* () {
    return (yield import("./checkmark-D7aRQLWg.mjs")).checkmarkSvg;
  }),
  checkmarkBold: () => o(null, null, function* () {
    return (yield import("./checkmark-bold-BWpGnngR.mjs")).checkmarkBoldSvg;
  }),
  chevronBottom: () => o(null, null, function* () {
    return (yield import("./chevron-bottom-Cr8eKV0P.mjs")).chevronBottomSvg;
  }),
  chevronLeft: () => o(null, null, function* () {
    return (yield import("./chevron-left-CI4WslGK.mjs")).chevronLeftSvg;
  }),
  chevronRight: () => o(null, null, function* () {
    return (yield import("./chevron-right-C19erx1M.mjs")).chevronRightSvg;
  }),
  chevronTop: () => o(null, null, function* () {
    return (yield import("./chevron-top-BeQEt6dI.mjs")).chevronTopSvg;
  }),
  chromeStore: () => o(null, null, function* () {
    return (yield import("./chrome-store-M_lonvXv.mjs")).chromeStoreSvg;
  }),
  clock: () => o(null, null, function* () {
    return (yield import("./clock-DpiyywbS.mjs")).clockSvg;
  }),
  close: () => o(null, null, function* () {
    return (yield import("./close-DPCXejT-.mjs")).closeSvg;
  }),
  compass: () => o(null, null, function* () {
    return (yield import("./compass-svjd-5fL.mjs")).compassSvg;
  }),
  coinPlaceholder: () => o(null, null, function* () {
    return (yield import("./coinPlaceholder-C_0uoYMh.mjs")).coinPlaceholderSvg;
  }),
  copy: () => o(null, null, function* () {
    return (yield import("./copy-B5Nsy1L5.mjs")).copySvg;
  }),
  cursor: () => o(null, null, function* () {
    return (yield import("./cursor-D61QyFju.mjs")).cursorSvg;
  }),
  cursorTransparent: () => o(null, null, function* () {
    return (yield import("./cursor-transparent-E0Tci3f2.mjs")).cursorTransparentSvg;
  }),
  desktop: () => o(null, null, function* () {
    return (yield import("./desktop-BJaXH260.mjs")).desktopSvg;
  }),
  disconnect: () => o(null, null, function* () {
    return (yield import("./disconnect-DxqZLCU4.mjs")).disconnectSvg;
  }),
  discord: () => o(null, null, function* () {
    return (yield import("./discord-CW5ZU08R.mjs")).discordSvg;
  }),
  etherscan: () => o(null, null, function* () {
    return (yield import("./etherscan-BOz0iwCM.mjs")).etherscanSvg;
  }),
  extension: () => o(null, null, function* () {
    return (yield import("./extension-ql5OZweb.mjs")).extensionSvg;
  }),
  externalLink: () => o(null, null, function* () {
    return (yield import("./external-link-C3mvAhWr.mjs")).externalLinkSvg;
  }),
  facebook: () => o(null, null, function* () {
    return (yield import("./facebook-DGTPfi5E.mjs")).facebookSvg;
  }),
  farcaster: () => o(null, null, function* () {
    return (yield import("./farcaster-ASd5SDyE.mjs")).farcasterSvg;
  }),
  filters: () => o(null, null, function* () {
    return (yield import("./filters-BAAri9T1.mjs")).filtersSvg;
  }),
  github: () => o(null, null, function* () {
    return (yield import("./github-jWIsNUDa.mjs")).githubSvg;
  }),
  google: () => o(null, null, function* () {
    return (yield import("./google-C6E0YR5e.mjs")).googleSvg;
  }),
  helpCircle: () => o(null, null, function* () {
    return (yield import("./help-circle-BPC9xVoY.mjs")).helpCircleSvg;
  }),
  image: () => o(null, null, function* () {
    return (yield import("./image-CAQTMzR4.mjs")).imageSvg;
  }),
  id: () => o(null, null, function* () {
    return (yield import("./id-Bq7BeCuY.mjs")).idSvg;
  }),
  infoCircle: () => o(null, null, function* () {
    return (yield import("./info-circle-DJE2-AmP.mjs")).infoCircleSvg;
  }),
  lightbulb: () => o(null, null, function* () {
    return (yield import("./lightbulb-8CGbBeB2.mjs")).lightbulbSvg;
  }),
  mail: () => o(null, null, function* () {
    return (yield import("./mail-DaMGIcyB.mjs")).mailSvg;
  }),
  mobile: () => o(null, null, function* () {
    return (yield import("./mobile-xlszAg2M.mjs")).mobileSvg;
  }),
  more: () => o(null, null, function* () {
    return (yield import("./more-DwoDQpTF.mjs")).moreSvg;
  }),
  networkPlaceholder: () => o(null, null, function* () {
    return (yield import("./network-placeholder-xdADU8K1.mjs")).networkPlaceholderSvg;
  }),
  nftPlaceholder: () => o(null, null, function* () {
    return (yield import("./nftPlaceholder-BiT45toX.mjs")).nftPlaceholderSvg;
  }),
  off: () => o(null, null, function* () {
    return (yield import("./off-aub3Uppr.mjs")).offSvg;
  }),
  playStore: () => o(null, null, function* () {
    return (yield import("./play-store-1CrTkFwu.mjs")).playStoreSvg;
  }),
  plus: () => o(null, null, function* () {
    return (yield import("./plus-CBrz63n_.mjs")).plusSvg;
  }),
  qrCode: () => o(null, null, function* () {
    return (yield import("./qr-code-BdCU8wwt.mjs")).qrCodeIcon;
  }),
  recycleHorizontal: () => o(null, null, function* () {
    return (yield import("./recycle-horizontal-PHlszeW8.mjs")).recycleHorizontalSvg;
  }),
  refresh: () => o(null, null, function* () {
    return (yield import("./refresh-eVGrXUpW.mjs")).refreshSvg;
  }),
  search: () => o(null, null, function* () {
    return (yield import("./search-D-Pivzpz.mjs")).searchSvg;
  }),
  send: () => o(null, null, function* () {
    return (yield import("./send-D0JHOPMM.mjs")).sendSvg;
  }),
  swapHorizontal: () => o(null, null, function* () {
    return (yield import("./swapHorizontal-Cjk6-3TM.mjs")).swapHorizontalSvg;
  }),
  swapHorizontalMedium: () => o(null, null, function* () {
    return (yield import("./swapHorizontalMedium-B7TRhzuS.mjs")).swapHorizontalMediumSvg;
  }),
  swapHorizontalBold: () => o(null, null, function* () {
    return (yield import("./swapHorizontalBold-CDtoylhV.mjs")).swapHorizontalBoldSvg;
  }),
  swapHorizontalRoundedBold: () => o(null, null, function* () {
    return (yield import("./swapHorizontalRoundedBold-Cp6ojQX7.mjs")).swapHorizontalRoundedBoldSvg;
  }),
  swapVertical: () => o(null, null, function* () {
    return (yield import("./swapVertical-CFN7NxW5.mjs")).swapVerticalSvg;
  }),
  telegram: () => o(null, null, function* () {
    return (yield import("./telegram-CBBvKico.mjs")).telegramSvg;
  }),
  threeDots: () => o(null, null, function* () {
    return (yield import("./three-dots-B7G9HDez.mjs")).threeDotsSvg;
  }),
  twitch: () => o(null, null, function* () {
    return (yield import("./twitch-CeCm4Rm0.mjs")).twitchSvg;
  }),
  twitter: () => o(null, null, function* () {
    return (yield import("./x-DiBoe1Ne.mjs")).xSvg;
  }),
  twitterIcon: () => o(null, null, function* () {
    return (yield import("./twitterIcon-BDYLRz9i.mjs")).twitterIconSvg;
  }),
  verify: () => o(null, null, function* () {
    return (yield import("./verify-OmY_gMyL.mjs")).verifySvg;
  }),
  verifyFilled: () => o(null, null, function* () {
    return (yield import("./verify-filled-CVO-L7mi.mjs")).verifyFilledSvg;
  }),
  wallet: () => o(null, null, function* () {
    return (yield import("./wallet-Dtw607LS.mjs")).walletSvg;
  }),
  walletConnect: () => o(null, null, function* () {
    return (yield import("./walletconnect-Boj2zzsZ.mjs")).walletConnectSvg;
  }),
  walletConnectLightBrown: () => o(null, null, function* () {
    return (yield import("./walletconnect-Boj2zzsZ.mjs")).walletConnectLightBrownSvg;
  }),
  walletConnectBrown: () => o(null, null, function* () {
    return (yield import("./walletconnect-Boj2zzsZ.mjs")).walletConnectBrownSvg;
  }),
  walletPlaceholder: () => o(null, null, function* () {
    return (yield import("./wallet-placeholder-CVDvz60p.mjs")).walletPlaceholderSvg;
  }),
  warningCircle: () => o(null, null, function* () {
    return (yield import("./warning-circle-Db1T3v-5.mjs")).warningCircleSvg;
  }),
  x: () => o(null, null, function* () {
    return (yield import("./x-DiBoe1Ne.mjs")).xSvg;
  }),
  info: () => o(null, null, function* () {
    return (yield import("./info-DSn-oMxa.mjs")).infoSvg;
  }),
  exclamationTriangle: () => o(null, null, function* () {
    return (yield import("./exclamation-triangle-z1iBmyPa.mjs")).exclamationTriangleSvg;
  }),
  reown: () => o(null, null, function* () {
    return (yield import("./reown-logo-CuuP6DBE.mjs")).reownSvg;
  })
};
function ht(e) {
  return o(this, null, function* () {
    var r;
    if (_.has(e))
      return _.get(e);
    const i = ((r = H[e]) != null ? r : H.copy)();
    return _.set(e, i), i;
  });
}
let d = class extends T {
  constructor() {
    super(...arguments), this.size = "md", this.name = "copy", this.color = "fg-300", this.aspectRatio = "1 / 1";
  }
  render() {
    return this.style.cssText = `
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `, S`${lt(ht(this.name), S`<div class="fallback"></div>`)}`;
  }
};
d.styles = [A, Y, ut];
y([
  p()
], d.prototype, "size", void 0);
y([
  p()
], d.prototype, "name", void 0);
y([
  p()
], d.prototype, "color", void 0);
y([
  p()
], d.prototype, "aspectRatio", void 0);
d = y([
  k("wui-icon")
], d);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = L(class extends O {
  constructor(e) {
    var t;
    if (super(e), e.type !== I.ATTRIBUTE || e.name !== "class" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
  }
  update(e, [t]) {
    var r, a;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((n) => n !== "")));
      for (const n in t) t[n] && !((r = this.nt) != null && r.has(n)) && this.st.add(n);
      return this.render(t);
    }
    const i = e.element.classList;
    for (const n of this.st) n in t || (i.remove(n), this.st.delete(n));
    for (const n in t) {
      const s = !!t[n];
      s === this.st.has(n) || (a = this.nt) != null && a.has(n) || (s ? (i.add(n), this.st.add(n)) : (i.remove(n), this.st.delete(n)));
    }
    return x;
  }
}), wt = z`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;
var $ = function(e, t, i, r) {
  var a = arguments.length, n = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(e, t, i, r);
  else for (var c = e.length - 1; c >= 0; c--) (s = e[c]) && (n = (a < 3 ? s(n) : a > 3 ? s(t, i, n) : s(t, i)) || n);
  return a > 3 && n && Object.defineProperty(t, i, n), n;
};
let m = class extends T {
  constructor() {
    super(...arguments), this.variant = "paragraph-500", this.color = "fg-300", this.align = "left", this.lineClamp = void 0;
  }
  render() {
    const t = {
      [`wui-font-${this.variant}`]: !0,
      [`wui-color-${this.color}`]: !0,
      [`wui-line-clamp-${this.lineClamp}`]: !!this.lineClamp
    };
    return this.style.cssText = `
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `, S`<slot class=${gt(t)}></slot>`;
  }
};
m.styles = [A, wt];
$([
  p()
], m.prototype, "variant", void 0);
$([
  p()
], m.prototype, "color", void 0);
$([
  p()
], m.prototype, "align", void 0);
$([
  p()
], m.prototype, "lineClamp", void 0);
m = $([
  k("wui-text")
], m);
const ft = z`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;
var h = function(e, t, i, r) {
  var a = arguments.length, n = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(e, t, i, r);
  else for (var c = e.length - 1; c >= 0; c--) (s = e[c]) && (n = (a < 3 ? s(n) : a > 3 ? s(t, i, n) : s(t, i)) || n);
  return a > 3 && n && Object.defineProperty(t, i, n), n;
};
let u = class extends T {
  render() {
    return this.style.cssText = `
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap && `var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap && `var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap && `var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding && f.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && f.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && f.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && f.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && f.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && f.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && f.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && f.getSpacingStyles(this.margin, 3)};
    `, S`<slot></slot>`;
  }
};
u.styles = [A, ft];
h([
  p()
], u.prototype, "flexDirection", void 0);
h([
  p()
], u.prototype, "flexWrap", void 0);
h([
  p()
], u.prototype, "flexBasis", void 0);
h([
  p()
], u.prototype, "flexGrow", void 0);
h([
  p()
], u.prototype, "flexShrink", void 0);
h([
  p()
], u.prototype, "alignItems", void 0);
h([
  p()
], u.prototype, "justifyContent", void 0);
h([
  p()
], u.prototype, "columnGap", void 0);
h([
  p()
], u.prototype, "rowGap", void 0);
h([
  p()
], u.prototype, "gap", void 0);
h([
  p()
], u.prototype, "padding", void 0);
h([
  p()
], u.prototype, "margin", void 0);
u = h([
  k("wui-flex")
], u);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = (e) => e != null ? e : q;
export {
  f as U,
  L as a,
  k as c,
  gt as e,
  nt as f,
  p as n,
  Ct as o,
  vt as r
};
