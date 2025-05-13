var b = (a, e, i) => new Promise((o, r) => {
  var t = (d) => {
    try {
      s(i.next(d));
    } catch (R) {
      r(R);
    }
  }, n = (d) => {
    try {
      s(i.throw(d));
    } catch (R) {
      r(R);
    }
  }, s = (d) => d.done ? o(d.value) : Promise.resolve(d.value).then(t, n);
  s((i = i.apply(a, e)).next());
});
import { i as k, a as _, C as E, O as x, R as v, b as j, x as l, d as P, m as q, n as z, A as u, o as F, e as I, f as h, p as A, k as W, S, q as M, M as T, T as $ } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { n as N, r as c, c as O, o as C } from "./if-defined-SxgRDNx5.mjs";
import { O as U } from "./index-DAeyYgMk.mjs";
import { e as V } from "./index-BQlGHJhE.mjs";
import "./index-CpsJxmOq.mjs";
import "./index-98vrGaaA.mjs";
import "./index-YhqbR5Wc.mjs";
import "./index-CCX1TeUz.mjs";
import "./index-DK9b4bRn.mjs";
import "./index-B0Tzl2T9.mjs";
const G = k`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;
var m = function(a, e, i, o) {
  var r = arguments.length, t = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(a, e, i, o);
  else for (var s = a.length - 1; s >= 0; s--) (n = a[s]) && (t = (r < 3 ? n(t) : r > 3 ? n(e, i, t) : n(e, i)) || t);
  return r > 3 && t && Object.defineProperty(e, i, t), t;
};
let p = class extends _ {
  constructor() {
    super(), this.unsubscribe = [], this.tabIdx = void 0, this.connectors = E.state.connectors, this.authConnector = this.connectors.find((e) => e.type === "AUTH"), this.features = x.state.features, this.isPwaLoading = !1, this.unsubscribe.push(E.subscribeKey("connectors", (e) => {
      this.connectors = e, this.authConnector = this.connectors.find((i) => i.type === "AUTH");
    }), x.subscribeKey("features", (e) => this.features = e));
  }
  connectedCallback() {
    super.connectedCallback(), this.handlePwaFrameLoad();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    var t;
    let e = ((t = this.features) == null ? void 0 : t.socials) || [];
    const i = !!this.authConnector, o = e == null ? void 0 : e.length, r = v.state.view === "ConnectSocials";
    return (!i || !o) && !r ? null : (r && !o && (e = j.DEFAULT_FEATURES.socials), l` <wui-flex flexDirection="column" gap="xs">
      ${e.map((n) => l`<wui-list-social
            @click=${() => {
      this.onSocialClick(n);
    }}
            data-testid=${`social-selector-${n}`}
            name=${n}
            logo=${n}
            ?disabled=${this.isPwaLoading}
          ></wui-list-social>`)}
    </wui-flex>`);
  }
  onSocialClick(e) {
    return b(this, null, function* () {
      e && (yield V(e));
    });
  }
  handlePwaFrameLoad() {
    return b(this, null, function* () {
      var e;
      if (P.isPWA()) {
        this.isPwaLoading = !0;
        try {
          ((e = this.authConnector) == null ? void 0 : e.provider) instanceof q && (yield this.authConnector.provider.init());
        } catch (i) {
          z.open({
            shortMessage: "Error loading embedded wallet in PWA",
            longMessage: i.message
          }, "error");
        } finally {
          this.isPwaLoading = !1;
        }
      }
    });
  }
};
p.styles = G;
m([
  N()
], p.prototype, "tabIdx", void 0);
m([
  c()
], p.prototype, "connectors", void 0);
m([
  c()
], p.prototype, "authConnector", void 0);
m([
  c()
], p.prototype, "features", void 0);
m([
  c()
], p.prototype, "isPwaLoading", void 0);
p = m([
  O("w3m-social-login-list")
], p);
const B = k`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;
var D = function(a, e, i, o) {
  var r = arguments.length, t = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(a, e, i, o);
  else for (var s = a.length - 1; s >= 0; s--) (n = a[s]) && (t = (r < 3 ? n(t) : r > 3 ? n(e, i, t) : n(e, i)) || t);
  return r > 3 && t && Object.defineProperty(e, i, t), t;
};
let L = class extends _ {
  constructor() {
    super(), this.unsubscribe = [], this.checked = U.state.isLegalCheckboxChecked, this.unsubscribe.push(U.subscribeKey("isLegalCheckboxChecked", (e) => {
      this.checked = e;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    var d;
    const { termsConditionsUrl: e, privacyPolicyUrl: i } = x.state, o = (d = x.state.features) == null ? void 0 : d.legalCheckbox, t = !!(e || i) && !!o, n = t && !this.checked, s = n ? -1 : void 0;
    return l`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${t ? ["0", "s", "s", "s"] : "s"}
        gap="xs"
        class=${C(n ? "disabled" : void 0)}
      >
        <w3m-social-login-list tabIdx=${C(s)}></w3m-social-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
  }
};
L.styles = B;
D([
  c()
], L.prototype, "checked", void 0);
L = D([
  O("w3m-connect-socials-view")
], L);
const K = k`
  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
  }
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }
  wui-flex:first-child:not(:only-child) {
    position: relative;
  }
  wui-loading-thumbnail {
    position: absolute;
  }
  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }
  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }
  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }
  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
  .capitalize {
    text-transform: capitalize;
  }
`;
var g = function(a, e, i, o) {
  var r = arguments.length, t = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(a, e, i, o);
  else for (var s = a.length - 1; s >= 0; s--) (n = a[s]) && (t = (r < 3 ? n(t) : r > 3 ? n(e, i, t) : n(e, i)) || t);
  return r > 3 && t && Object.defineProperty(e, i, t), t;
};
let f = class extends _ {
  constructor() {
    super(), this.unsubscribe = [], this.socialProvider = u.state.socialProvider, this.socialWindow = u.state.socialWindow, this.error = !1, this.connecting = !1, this.message = "Connect in the provider window", this.authConnector = E.getAuthConnector(), this.handleSocialConnection = (i) => b(this, null, function* () {
      var o;
      if ((o = i.data) != null && o.resultUri)
        if (i.origin === F.SECURE_SITE_ORIGIN) {
          window.removeEventListener("message", this.handleSocialConnection, !1);
          try {
            if (this.authConnector && !this.connecting) {
              this.socialWindow && (this.socialWindow.close(), u.setSocialWindow(void 0, I.state.activeChain)), this.connecting = !0, this.updateMessage();
              const r = i.data.resultUri;
              this.socialProvider && h.sendEvent({
                type: "track",
                event: "SOCIAL_LOGIN_REQUEST_USER_DATA",
                properties: { provider: this.socialProvider }
              }), yield this.authConnector.provider.connectSocial(r), this.socialProvider && (A.setConnectedSocialProvider(this.socialProvider), yield W.connectExternal(this.authConnector, this.authConnector.chain), h.sendEvent({
                type: "track",
                event: "SOCIAL_LOGIN_SUCCESS",
                properties: { provider: this.socialProvider }
              }));
            }
          } catch (r) {
            this.error = !0, this.updateMessage(), this.socialProvider && h.sendEvent({
              type: "track",
              event: "SOCIAL_LOGIN_ERROR",
              properties: { provider: this.socialProvider }
            });
          }
        } else
          v.goBack(), S.showError("Untrusted Origin"), this.socialProvider && h.sendEvent({
            type: "track",
            event: "SOCIAL_LOGIN_ERROR",
            properties: { provider: this.socialProvider }
          });
    }), M.EmbeddedWalletAbortController.signal.addEventListener("abort", () => {
      this.socialWindow && (this.socialWindow.close(), u.setSocialWindow(void 0, I.state.activeChain));
    }), this.unsubscribe.push(u.subscribe((i) => {
      i.socialProvider && (this.socialProvider = i.socialProvider), i.socialWindow && (this.socialWindow = i.socialWindow), i.address && (T.state.open || x.state.enableEmbedded) && T.close();
    })), this.authConnector && this.connectSocial();
  }
  disconnectedCallback() {
    var e;
    this.unsubscribe.forEach((i) => i()), window.removeEventListener("message", this.handleSocialConnection, !1), (e = this.socialWindow) == null || e.close(), u.setSocialWindow(void 0, I.state.activeChain);
  }
  render() {
    var e;
    return l`
      <wui-flex
        data-error=${C(this.error)}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl", "xl", "xl", "xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo=${C(this.socialProvider)}></wui-logo>
          ${this.error ? null : this.loaderTemplate()}
          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100"
            >Log in with
            <span class="capitalize">${(e = this.socialProvider) != null ? e : "Social"}</span></wui-text
          >
          <wui-text align="center" variant="small-400" color=${this.error ? "error-100" : "fg-200"}
            >${this.message}</wui-text
          ></wui-flex
        >
      </wui-flex>
    `;
  }
  loaderTemplate() {
    const e = $.state.themeVariables["--w3m-border-radius-master"], i = e ? parseInt(e.replace("px", ""), 10) : 4;
    return l`<wui-loading-thumbnail radius=${i * 9}></wui-loading-thumbnail>`;
  }
  connectSocial() {
    const e = setInterval(() => {
      var i;
      (i = this.socialWindow) != null && i.closed && (!this.connecting && v.state.view === "ConnectingSocial" && (this.socialProvider && h.sendEvent({
        type: "track",
        event: "SOCIAL_LOGIN_CANCELED",
        properties: { provider: this.socialProvider }
      }), v.goBack()), clearInterval(e));
    }, 1e3);
    window.addEventListener("message", this.handleSocialConnection, !1);
  }
  updateMessage() {
    this.error ? this.message = "Something went wrong" : this.connecting ? this.message = "Retrieving user data" : this.message = "Connect in the provider window";
  }
};
f.styles = K;
g([
  c()
], f.prototype, "socialProvider", void 0);
g([
  c()
], f.prototype, "socialWindow", void 0);
g([
  c()
], f.prototype, "error", void 0);
g([
  c()
], f.prototype, "connecting", void 0);
g([
  c()
], f.prototype, "message", void 0);
f = g([
  O("w3m-connecting-social-view")
], f);
const X = k`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }

  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }
  wui-loading-thumbnail {
    position: absolute;
  }
  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }
`;
var y = function(a, e, i, o) {
  var r = arguments.length, t = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(a, e, i, o);
  else for (var s = a.length - 1; s >= 0; s--) (n = a[s]) && (t = (r < 3 ? n(t) : r > 3 ? n(e, i, t) : n(e, i)) || t);
  return r > 3 && t && Object.defineProperty(e, i, t), t;
};
let w = class extends _ {
  constructor() {
    super(), this.unsubscribe = [], this.timeout = void 0, this.socialProvider = u.state.socialProvider, this.uri = u.state.farcasterUrl, this.ready = !1, this.loading = !1, this.authConnector = E.getAuthConnector(), this.forceUpdate = () => {
      this.requestUpdate();
    }, this.unsubscribe.push(u.subscribeKey("farcasterUrl", (e) => {
      e && (this.uri = e, this.connectFarcaster());
    }), u.subscribeKey("socialProvider", (e) => {
      e && (this.socialProvider = e);
    })), window.addEventListener("resize", this.forceUpdate);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearTimeout(this.timeout), window.removeEventListener("resize", this.forceUpdate);
  }
  render() {
    return this.onRenderProxy(), l`${this.platformTemplate()}`;
  }
  platformTemplate() {
    return P.isMobile() ? l`${this.mobileTemplate()}` : l`${this.desktopTemplate()}`;
  }
  desktopTemplate() {
    return this.loading ? l`${this.loadingTemplate()}` : l`${this.qrTemplate()}`;
  }
  qrTemplate() {
    return l` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${["0", "xl", "xl", "xl"]}
      gap="xl"
    >
      <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

      <wui-text variant="paragraph-500" color="fg-100">
        Scan this QR Code with your phone
      </wui-text>
      ${this.copyTemplate()}
    </wui-flex>`;
  }
  loadingTemplate() {
    return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xl", "xl", "xl", "xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo="farcaster"></wui-logo>
          ${this.loaderTemplate()}
          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Loading user data
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Please wait a moment while we load your data.
          </wui-text>
        </wui-flex>
      </wui-flex>
    `;
  }
  mobileTemplate() {
    return l` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${["3xl", "xl", "xl", "xl"]}
      gap="xl"
    >
      <wui-flex justifyContent="center" alignItems="center">
        <wui-logo logo="farcaster"></wui-logo>
        ${this.loaderTemplate()}
        <wui-icon-box
          backgroundColor="error-100"
          background="opaque"
          iconColor="error-100"
          icon="close"
          size="sm"
          border
          borderColor="wui-color-bg-125"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="xs">
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >Continue in Farcaster</span></wui-text
        >
        <wui-text align="center" variant="small-400" color="fg-200"
          >Accept connection request in the app</wui-text
        ></wui-flex
      >
      ${this.mobileLinkTemplate()}
    </wui-flex>`;
  }
  loaderTemplate() {
    const e = $.state.themeVariables["--w3m-border-radius-master"], i = e ? parseInt(e.replace("px", ""), 10) : 4;
    return l`<wui-loading-thumbnail radius=${i * 9}></wui-loading-thumbnail>`;
  }
  connectFarcaster() {
    return b(this, null, function* () {
      var e;
      if (this.authConnector)
        try {
          yield (e = this.authConnector) == null ? void 0 : e.provider.connectFarcaster(), this.socialProvider && (A.setConnectedSocialProvider(this.socialProvider), h.sendEvent({
            type: "track",
            event: "SOCIAL_LOGIN_REQUEST_USER_DATA",
            properties: { provider: this.socialProvider }
          })), this.loading = !0, yield W.connectExternal(this.authConnector, this.authConnector.chain), this.socialProvider && h.sendEvent({
            type: "track",
            event: "SOCIAL_LOGIN_SUCCESS",
            properties: { provider: this.socialProvider }
          }), this.loading = !1, T.close();
        } catch (i) {
          this.socialProvider && h.sendEvent({
            type: "track",
            event: "SOCIAL_LOGIN_ERROR",
            properties: { provider: this.socialProvider }
          }), v.goBack(), S.showError(i);
        }
    });
  }
  mobileLinkTemplate() {
    return l`<wui-button
      size="md"
      ?loading=${this.loading}
      ?disabled=${!this.uri || this.loading}
      @click=${() => {
      this.uri && P.openHref(this.uri, "_blank");
    }}
    >
      Open farcaster</wui-button
    >`;
  }
  onRenderProxy() {
    !this.ready && this.uri && (this.timeout = setTimeout(() => {
      this.ready = !0;
    }, 200));
  }
  qrCodeTemplate() {
    if (!this.uri || !this.ready)
      return null;
    const e = this.getBoundingClientRect().width - 40;
    return l` <wui-qr-code
      size=${e}
      theme=${$.state.themeMode}
      uri=${this.uri}
      ?farcaster=${!0}
      data-testid="wui-qr-code"
      color=${C($.state.themeVariables["--w3m-qr-color"])}
    ></wui-qr-code>`;
  }
  copyTemplate() {
    const e = !this.uri || !this.ready;
    return l`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`;
  }
  onCopyUri() {
    try {
      this.uri && (P.copyToClopboard(this.uri), S.showSuccess("Link copied"));
    } catch (e) {
      S.showError("Failed to copy");
    }
  }
};
w.styles = X;
y([
  c()
], w.prototype, "socialProvider", void 0);
y([
  c()
], w.prototype, "uri", void 0);
y([
  c()
], w.prototype, "ready", void 0);
y([
  c()
], w.prototype, "loading", void 0);
w = y([
  O("w3m-connecting-farcaster-view")
], w);
export {
  L as W3mConnectSocialsView,
  w as W3mConnectingFarcasterView,
  f as W3mConnectingSocialView
};
