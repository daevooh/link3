var f = (t, o, e) => new Promise((i, n) => {
  var r = (c) => {
    try {
      l(e.next(c));
    } catch (w) {
      n(w);
    }
  }, a = (c) => {
    try {
      l(e.throw(c));
    } catch (w) {
      n(w);
    }
  }, l = (c) => c.done ? i(c.value) : Promise.resolve(c.value).then(r, a);
  l((e = e.apply(t, o)).next());
});
import { A as p, e as y, f as R, R as v, C as b, S as x, d as u, p as O, c as T, i as C, r as S, a as _, x as m, h as U } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { n as g, c as E, o as j } from "./if-defined-SxgRDNx5.mjs";
function L() {
  try {
    return u.returnOpenHref(`${T.SECURE_SITE_SDK_ORIGIN}/loading`, "popupWindow", "width=600,height=800,scrollbars=yes");
  } catch (t) {
    throw new Error("Could not open social popup");
  }
}
function I() {
  return f(this, null, function* () {
    v.push("ConnectingFarcaster");
    const t = b.getAuthConnector();
    if (t && !p.state.farcasterUrl)
      try {
        const { url: o } = yield t.provider.getFarcasterUri();
        p.setFarcasterUrl(o, y.state.activeChain);
      } catch (o) {
        v.goBack(), x.showError(o);
      }
  });
}
function A(t) {
  return f(this, null, function* () {
    v.push("ConnectingSocial");
    const o = b.getAuthConnector();
    let e = null;
    try {
      const i = setTimeout(() => {
        throw new Error("Social login timed out. Please try again.");
      }, 45e3);
      if (o && t) {
        if (u.isTelegram() || (e = L()), e)
          p.setSocialWindow(e, y.state.activeChain);
        else if (!u.isTelegram())
          throw new Error("Could not create social popup");
        const { uri: n } = yield o.provider.getSocialRedirectUri({
          provider: t
        });
        if (!n)
          throw e == null || e.close(), new Error("Could not fetch the social redirect uri");
        if (e && (e.location.href = n), u.isTelegram()) {
          O.setTelegramSocialProvider(t);
          const r = u.formatTelegramSocialLoginUrl(n);
          u.openHref(r, "_top");
        }
        clearTimeout(i);
      }
    } catch (i) {
      e == null || e.close(), x.showError(i == null ? void 0 : i.message);
    }
  });
}
function z(t) {
  return f(this, null, function* () {
    p.setSocialProvider(t, y.state.activeChain), R.sendEvent({
      type: "track",
      event: "SOCIAL_LOGIN_STARTED",
      properties: { provider: t }
    }), t === "farcaster" ? yield I() : yield A(t);
  });
}
const P = C`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`;
var $ = function(t, o, e, i) {
  var n = arguments.length, r = n < 3 ? o : i === null ? i = Object.getOwnPropertyDescriptor(o, e) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, o, e, i);
  else for (var l = t.length - 1; l >= 0; l--) (a = t[l]) && (r = (n < 3 ? a(r) : n > 3 ? a(o, e, r) : a(o, e)) || r);
  return n > 3 && r && Object.defineProperty(o, e, r), r;
};
let h = class extends _ {
  constructor() {
    super(...arguments), this.logo = "google";
  }
  render() {
    return m`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `;
  }
};
h.styles = [S, P];
$([
  g()
], h.prototype, "logo", void 0);
h = $([
  E("wui-logo")
], h);
const D = C`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    justify-content: flex-start;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-text[data-align='left'] {
    display: flex;
    flex: 1;
  }

  wui-text[data-align='center'] {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`;
var d = function(t, o, e, i) {
  var n = arguments.length, r = n < 3 ? o : i === null ? i = Object.getOwnPropertyDescriptor(o, e) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, o, e, i);
  else for (var l = t.length - 1; l >= 0; l--) (a = t[l]) && (r = (n < 3 ? a(r) : n > 3 ? a(o, e, r) : a(o, e)) || r);
  return n > 3 && r && Object.defineProperty(o, e, r), r;
};
let s = class extends _ {
  constructor() {
    super(...arguments), this.logo = "google", this.name = "Continue with google", this.align = "left", this.disabled = !1;
  }
  render() {
    return m`
      <button ?disabled=${this.disabled} tabindex=${j(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
        <wui-text
          data-align=${this.align}
          variant="paragraph-500"
          color="inherit"
          align=${this.align}
          >${this.name}</wui-text
        >
        ${this.templatePlacement()}
      </button>
    `;
  }
  templatePlacement() {
    return this.align === "center" ? m` <wui-logo class="invisible" logo=${this.logo}></wui-logo>` : null;
  }
};
s.styles = [S, U, D];
d([
  g()
], s.prototype, "logo", void 0);
d([
  g()
], s.prototype, "name", void 0);
d([
  g()
], s.prototype, "align", void 0);
d([
  g()
], s.prototype, "tabIdx", void 0);
d([
  g({ type: Boolean })
], s.prototype, "disabled", void 0);
s = d([
  E("wui-list-social")
], s);
export {
  z as e
};
