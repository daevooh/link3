var A = (r, e, t) => new Promise((o, n) => {
  var i = (u) => {
    try {
      s(t.next(u));
    } catch (h) {
      n(h);
    }
  }, a = (u) => {
    try {
      s(t.throw(u));
    } catch (h) {
      n(h);
    }
  }, s = (u) => u.done ? o(u.value) : Promise.resolve(u.value).then(i, a);
  s((t = t.apply(r, e)).next());
});
import { i as y, r as D, a as C, x as l, n as _, h as ie, K as ne, R as c, e as f, t as L, H as ae, o as H, f as q, U as z, M as w, O as N, C as M, A as F, S as T, D as P, T as se, Z as re, d as ce, c as le } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { c as x, n as p, r as d, o as Y, U as de } from "./if-defined-SxgRDNx5.mjs";
import "./index-Dz192-H2.mjs";
import "./index-CXCuF3ao.mjs";
import "./index-CpsJxmOq.mjs";
import "./index-D7kuGAC-.mjs";
import "./index-BQckQaxg.mjs";
import "./index-BqCCO7Yv.mjs";
import "./index-Ct7FQt7n.mjs";
const ue = y`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`;
var pe = function(r, e, t, o) {
  var n = arguments.length, i = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, t) : o, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(r, e, t, o);
  else for (var s = r.length - 1; s >= 0; s--) (a = r[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
};
let V = class extends C {
  render() {
    return l`<slot></slot>`;
  }
};
V.styles = [D, ue];
V = pe([
  x("wui-card")
], V);
const he = y`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`;
var W = function(r, e, t, o) {
  var n = arguments.length, i = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, t) : o, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(r, e, t, o);
  else for (var s = r.length - 1; s >= 0; s--) (a = r[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
};
let k = class extends C {
  constructor() {
    super(...arguments), this.message = "", this.backgroundColor = "accent-100", this.iconColor = "accent-100", this.icon = "info";
  }
  render() {
    return this.style.cssText = `
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `, l`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `;
  }
  onClose() {
    _.close();
  }
};
k.styles = [D, he];
W([
  p()
], k.prototype, "message", void 0);
W([
  p()
], k.prototype, "backgroundColor", void 0);
W([
  p()
], k.prototype, "iconColor", void 0);
W([
  p()
], k.prototype, "icon", void 0);
k = W([
  x("wui-alertbar")
], k);
const we = y`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`;
var J = function(r, e, t, o) {
  var n = arguments.length, i = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, t) : o, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(r, e, t, o);
  else for (var s = r.length - 1; s >= 0; s--) (a = r[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
};
const me = {
  info: {
    backgroundColor: "fg-350",
    iconColor: "fg-325",
    icon: "info"
  },
  success: {
    backgroundColor: "success-glass-reown-020",
    iconColor: "success-125",
    icon: "checkmark"
  },
  warning: {
    backgroundColor: "warning-glass-reown-020",
    iconColor: "warning-100",
    icon: "warningCircle"
  },
  error: {
    backgroundColor: "error-glass-reown-020",
    iconColor: "error-125",
    icon: "exclamationTriangle"
  }
};
let B = class extends C {
  constructor() {
    super(), this.unsubscribe = [], this.open = _.state.open, this.onOpen(!0), this.unsubscribe.push(_.subscribeKey("open", (e) => {
      this.open = e, this.onOpen(!1);
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    const { message: e, variant: t } = _.state, o = me[t];
    return l`
      <wui-alertbar
        message=${e}
        backgroundColor=${o == null ? void 0 : o.backgroundColor}
        iconColor=${o == null ? void 0 : o.iconColor}
        icon=${o == null ? void 0 : o.icon}
      ></wui-alertbar>
    `;
  }
  onOpen(e) {
    this.open ? (this.animate([
      { opacity: 0, transform: "scale(0.85)" },
      { opacity: 1, transform: "scale(1)" }
    ], {
      duration: 150,
      fill: "forwards",
      easing: "ease"
    }), this.style.cssText = "pointer-events: auto") : e || (this.animate([
      { opacity: 1, transform: "scale(1)" },
      { opacity: 0, transform: "scale(0.85)" }
    ], {
      duration: 150,
      fill: "forwards",
      easing: "ease"
    }), this.style.cssText = "pointer-events: none");
  }
};
B.styles = we;
J([
  d()
], B.prototype, "open", void 0);
B = J([
  x("w3m-alertbar")
], B);
const fe = y`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`;
var Q = function(r, e, t, o) {
  var n = arguments.length, i = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, t) : o, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(r, e, t, o);
  else for (var s = r.length - 1; s >= 0; s--) (a = r[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
};
let U = class extends C {
  constructor() {
    super(...arguments), this.imageSrc = "";
  }
  render() {
    return l`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`;
  }
  imageTemplate() {
    return this.imageSrc ? l`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>` : l`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`;
  }
};
U.styles = [D, ie, ne, fe];
Q([
  p()
], U.prototype, "imageSrc", void 0);
U = Q([
  x("wui-select")
], U);
const ge = y`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
var v = function(r, e, t, o) {
  var n = arguments.length, i = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, t) : o, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(r, e, t, o);
  else for (var s = r.length - 1; s >= 0; s--) (a = r[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
};
const be = ["SmartSessionList"];
function K() {
  var a, s, u, h, E, O, I;
  const r = (s = (a = c.state.data) == null ? void 0 : a.connector) == null ? void 0 : s.name, e = (h = (u = c.state.data) == null ? void 0 : u.wallet) == null ? void 0 : h.name, t = (O = (E = c.state.data) == null ? void 0 : E.network) == null ? void 0 : O.name, o = e != null ? e : r, n = M.getConnectors();
  return {
    Connect: `Connect ${n.length === 1 && ((I = n[0]) == null ? void 0 : I.id) === "w3m-email" ? "Email" : ""} Wallet`,
    Create: "Create Wallet",
    ChooseAccountName: void 0,
    Account: void 0,
    AccountSettings: void 0,
    AllWallets: "All Wallets",
    ApproveTransaction: "Approve Transaction",
    BuyInProgress: "Buy",
    ConnectingExternal: o != null ? o : "Connect Wallet",
    ConnectingWalletConnect: o != null ? o : "WalletConnect",
    ConnectingWalletConnectBasic: "WalletConnect",
    ConnectingSiwe: "Sign In",
    Convert: "Convert",
    ConvertSelectToken: "Select token",
    ConvertPreview: "Preview convert",
    Downloads: o ? `Get ${o}` : "Downloads",
    EmailLogin: "Email Login",
    EmailVerifyOtp: "Confirm Email",
    EmailVerifyDevice: "Register Device",
    GetWallet: "Get a wallet",
    Networks: "Choose Network",
    OnRampProviders: "Choose Provider",
    OnRampActivity: "Activity",
    OnRampTokenSelect: "Select Token",
    OnRampFiatSelect: "Select Currency",
    Pay: "How you pay",
    Profile: void 0,
    SwitchNetwork: t != null ? t : "Switch Network",
    SwitchAddress: "Switch Address",
    Transactions: "Activity",
    UnsupportedChain: "Switch Network",
    UpgradeEmailWallet: "Upgrade your Wallet",
    UpdateEmailWallet: "Edit Email",
    UpdateEmailPrimaryOtp: "Confirm Current Email",
    UpdateEmailSecondaryOtp: "Confirm New Email",
    WhatIsABuy: "What is Buy?",
    RegisterAccountName: "Choose name",
    RegisterAccountNameSuccess: "",
    WalletReceive: "Receive",
    WalletCompatibleNetworks: "Compatible Networks",
    Swap: "Swap",
    SwapSelectToken: "Select token",
    SwapPreview: "Preview swap",
    WalletSend: "Send",
    WalletSendPreview: "Review send",
    WalletSendSelectToken: "Select Token",
    WhatIsANetwork: "What is a network?",
    WhatIsAWallet: "What is a wallet?",
    ConnectWallets: "Connect wallet",
    ConnectSocials: "All socials",
    ConnectingSocial: F.state.socialProvider ? F.state.socialProvider : "Connect Social",
    ConnectingMultiChain: "Select chain",
    ConnectingFarcaster: "Farcaster",
    SwitchActiveChain: "Switch chain",
    SmartSessionCreated: void 0,
    SmartSessionList: "Smart Sessions",
    SIWXSignMessage: "Sign In",
    PayLoading: "Payment in progress"
  };
}
let m = class extends C {
  constructor() {
    super(), this.unsubscribe = [], this.heading = K()[c.state.view], this.network = f.state.activeCaipNetwork, this.networkImage = L.getNetworkImage(this.network), this.showBack = !1, this.prevHistoryLength = 1, this.view = c.state.view, this.viewDirection = "", this.headerText = K()[c.state.view], this.unsubscribe.push(ae.subscribeNetworkImages(() => {
      this.networkImage = L.getNetworkImage(this.network);
    }), c.subscribeKey("view", (e) => {
      setTimeout(() => {
        this.view = e, this.headerText = K()[e];
      }, H.ANIMATION_DURATIONS.HeaderText), this.onViewChange(), this.onHistoryChange();
    }), f.subscribeKey("activeCaipNetwork", (e) => {
      this.network = e, this.networkImage = L.getNetworkImage(this.network);
    }));
  }
  disconnectCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    return l`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `;
  }
  onWalletHelp() {
    q.sendEvent({ type: "track", event: "CLICK_WALLET_HELP" }), c.push("WhatIsAWallet");
  }
  onClose() {
    return A(this, null, function* () {
      c.state.view === "UnsupportedChain" || (yield z.isSIWXCloseDisabled()) ? w.shake() : w.close(!0);
    });
  }
  rightHeaderTemplate() {
    var t, o, n;
    const e = (n = (o = (t = N) == null ? void 0 : t.state) == null ? void 0 : o.features) == null ? void 0 : n.smartSessions;
    return c.state.view !== "Account" || !e ? this.closeButtonTemplate() : l`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${() => c.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `;
  }
  closeButtonTemplate() {
    return l`
      <wui-icon-link
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `;
  }
  titleTemplate() {
    const e = be.includes(this.view);
    return l`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${e ? l`<wui-tag variant="main">Beta</wui-tag>` : null}
      </wui-flex>
    `;
  }
  leftHeaderTemplate() {
    var h;
    const { view: e } = c.state, t = e === "Connect", o = N.state.enableEmbedded, n = e === "ApproveTransaction", i = e === "ConnectingSiwe", a = e === "Account", s = N.state.enableNetworkSwitch, u = n || i || t && o;
    return a && s ? l`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${Y((h = this.network) == null ? void 0 : h.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${Y(this.networkImage)}
      ></wui-select>` : this.showBack && !u ? l`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>` : l`<wui-icon-link
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`;
  }
  onNetworks() {
    this.isAllowedNetworkSwitch() && (q.sendEvent({ type: "track", event: "CLICK_NETWORKS" }), c.push("Networks"));
  }
  isAllowedNetworkSwitch() {
    const e = f.getAllRequestedCaipNetworks(), t = e ? e.length > 1 : !1, o = e == null ? void 0 : e.find(({ id: n }) => {
      var i;
      return n === ((i = this.network) == null ? void 0 : i.id);
    });
    return t || !o;
  }
  getPadding() {
    return this.heading ? ["l", "2l", "l", "2l"] : ["0", "2l", "0", "2l"];
  }
  onViewChange() {
    const { history: e } = c.state;
    let t = H.VIEW_DIRECTION.Next;
    e.length < this.prevHistoryLength && (t = H.VIEW_DIRECTION.Prev), this.prevHistoryLength = e.length, this.viewDirection = t;
  }
  onHistoryChange() {
    return A(this, null, function* () {
      var o;
      const { history: e } = c.state, t = (o = this.shadowRoot) == null ? void 0 : o.querySelector("#dynamic");
      e.length > 1 && !this.showBack && t ? (yield t.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished, this.showBack = !0, t.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      })) : e.length <= 1 && this.showBack && t && (yield t.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished, this.showBack = !1, t.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }));
    });
  }
  onGoBack() {
    c.goBack();
  }
};
m.styles = ge;
v([
  d()
], m.prototype, "heading", void 0);
v([
  d()
], m.prototype, "network", void 0);
v([
  d()
], m.prototype, "networkImage", void 0);
v([
  d()
], m.prototype, "showBack", void 0);
v([
  d()
], m.prototype, "prevHistoryLength", void 0);
v([
  d()
], m.prototype, "view", void 0);
v([
  d()
], m.prototype, "viewDirection", void 0);
v([
  d()
], m.prototype, "headerText", void 0);
m = v([
  x("w3m-header")
], m);
const ve = y`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`;
var S = function(r, e, t, o) {
  var n = arguments.length, i = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, t) : o, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(r, e, t, o);
  else for (var s = r.length - 1; s >= 0; s--) (a = r[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
};
let g = class extends C {
  constructor() {
    super(...arguments), this.backgroundColor = "accent-100", this.iconColor = "accent-100", this.icon = "checkmark", this.message = "", this.loading = !1, this.iconType = "default";
  }
  render() {
    return l`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `;
  }
  templateIcon() {
    return this.loading ? l`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>` : this.iconType === "default" ? l`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>` : l`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`;
  }
};
g.styles = [D, ve];
S([
  p()
], g.prototype, "backgroundColor", void 0);
S([
  p()
], g.prototype, "iconColor", void 0);
S([
  p()
], g.prototype, "icon", void 0);
S([
  p()
], g.prototype, "message", void 0);
S([
  p()
], g.prototype, "loading", void 0);
S([
  p()
], g.prototype, "iconType", void 0);
g = S([
  x("wui-snackbar")
], g);
const ye = y`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;
var ee = function(r, e, t, o) {
  var n = arguments.length, i = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, t) : o, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(r, e, t, o);
  else for (var s = r.length - 1; s >= 0; s--) (a = r[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
};
const Ce = {
  loading: void 0,
  success: {
    backgroundColor: "success-100",
    iconColor: "success-100",
    icon: "checkmark"
  },
  error: {
    backgroundColor: "error-100",
    iconColor: "error-100",
    icon: "close"
  }
};
let j = class extends C {
  constructor() {
    super(), this.unsubscribe = [], this.timeout = void 0, this.open = T.state.open, this.unsubscribe.push(T.subscribeKey("open", (e) => {
      this.open = e, this.onOpen();
    }));
  }
  disconnectedCallback() {
    clearTimeout(this.timeout), this.unsubscribe.forEach((e) => e());
  }
  render() {
    var s;
    const { message: e, variant: t, svg: o } = T.state, n = Ce[t], { icon: i, iconColor: a } = (s = o != null ? o : n) != null ? s : {};
    return l`
      <wui-snackbar
        message=${e}
        backgroundColor=${n == null ? void 0 : n.backgroundColor}
        iconColor=${a}
        icon=${i}
        .loading=${t === "loading"}
      ></wui-snackbar>
    `;
  }
  onOpen() {
    clearTimeout(this.timeout), this.open ? (this.animate([
      { opacity: 0, transform: "translateX(-50%) scale(0.85)" },
      { opacity: 1, transform: "translateX(-50%) scale(1)" }
    ], {
      duration: 150,
      fill: "forwards",
      easing: "ease"
    }), this.timeout && clearTimeout(this.timeout), T.state.autoClose && (this.timeout = setTimeout(() => T.hide(), 2500))) : this.animate([
      { opacity: 1, transform: "translateX(-50%) scale(1)" },
      { opacity: 0, transform: "translateX(-50%) scale(0.85)" }
    ], {
      duration: 150,
      fill: "forwards",
      easing: "ease"
    });
  }
};
j.styles = ye;
ee([
  d()
], j.prototype, "open", void 0);
j = ee([
  x("w3m-snackbar")
], j);
const xe = y`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.embedded) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.embedded) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

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

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;
var $ = function(r, e, t, o) {
  var n = arguments.length, i = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, t) : o, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(r, e, t, o);
  else for (var s = r.length - 1; s >= 0; s--) (a = r[s]) && (i = (n < 3 ? a(i) : n > 3 ? a(e, t, i) : a(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
};
const Z = "scroll-lock";
let b = class extends C {
  constructor() {
    super(), this.unsubscribe = [], this.abortController = void 0, this.hasPrefetched = !1, this.enableEmbedded = N.state.enableEmbedded, this.open = w.state.open, this.caipAddress = f.state.activeCaipAddress, this.caipNetwork = f.state.activeCaipNetwork, this.shake = w.state.shake, this.filterByNamespace = M.state.filterByNamespace, this.initializeTheming(), P.prefetchAnalyticsConfig(), this.unsubscribe.push(w.subscribeKey("open", (e) => e ? this.onOpen() : this.onClose()), w.subscribeKey("shake", (e) => this.shake = e), f.subscribeKey("activeCaipNetwork", (e) => this.onNewNetwork(e)), f.subscribeKey("activeCaipAddress", (e) => this.onNewAddress(e)), N.subscribeKey("enableEmbedded", (e) => this.enableEmbedded = e), M.subscribeKey("filterByNamespace", (e) => {
      var t;
      this.filterByNamespace !== e && !((t = f.getAccountData(e)) != null && t.caipAddress) && (P.fetchRecommendedWallets(), this.filterByNamespace = e);
    }));
  }
  firstUpdated() {
    if (this.caipAddress) {
      if (this.enableEmbedded) {
        w.close(), this.prefetch();
        return;
      }
      this.onNewAddress(this.caipAddress);
    }
    this.open && this.onOpen(), this.enableEmbedded && this.prefetch();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e()), this.onRemoveKeyboardListener();
  }
  render() {
    return this.style.cssText = `
      --local-border-bottom-mobile-radius: ${this.enableEmbedded ? "clamp(0px, var(--wui-border-radius-l), 44px)" : "0px"};
    `, this.enableEmbedded ? l`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> ` : this.open ? l`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        ` : null;
  }
  contentTemplate() {
    return l` <wui-card
      shake="${this.shake}"
      data-embedded="${Y(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`;
  }
  onOverlayClick(e) {
    return A(this, null, function* () {
      e.target === e.currentTarget && (yield this.handleClose());
    });
  }
  handleClose() {
    return A(this, null, function* () {
      c.state.view === "UnsupportedChain" || (yield z.isSIWXCloseDisabled()) ? w.shake() : w.close();
    });
  }
  initializeTheming() {
    const { themeVariables: e, themeMode: t } = se.state, o = de.getColorTheme(t);
    re(e, o);
  }
  onClose() {
    this.open = !1, this.classList.remove("open"), this.onScrollUnlock(), T.hide(), this.onRemoveKeyboardListener();
  }
  onOpen() {
    this.open = !0, this.classList.add("open"), this.onScrollLock(), this.onAddKeyboardListener();
  }
  onScrollLock() {
    const e = document.createElement("style");
    e.dataset.w3m = Z, e.textContent = `
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `, document.head.appendChild(e);
  }
  onScrollUnlock() {
    const e = document.head.querySelector(`style[data-w3m="${Z}"]`);
    e && e.remove();
  }
  onAddKeyboardListener() {
    var t;
    this.abortController = new AbortController();
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("wui-card");
    e == null || e.focus(), window.addEventListener("keydown", (o) => {
      if (o.key === "Escape")
        this.handleClose();
      else if (o.key === "Tab") {
        const { tagName: n } = o.target;
        n && !n.includes("W3M-") && !n.includes("WUI-") && (e == null || e.focus());
      }
    }, this.abortController);
  }
  onRemoveKeyboardListener() {
    var e;
    (e = this.abortController) == null || e.abort(), this.abortController = void 0;
  }
  onNewAddress(e) {
    return A(this, null, function* () {
      const t = f.state.isSwitchingNamespace, o = ce.getPlainAddress(e);
      !o && !t ? w.close() : t && o && c.goBack(), yield z.initializeIfEnabled(), this.caipAddress = e, f.setIsSwitchingNamespace(!1);
    });
  }
  onNewNetwork(e) {
    var X, G;
    const t = this.caipNetwork, o = (X = t == null ? void 0 : t.caipNetworkId) == null ? void 0 : X.toString(), n = t == null ? void 0 : t.chainNamespace, i = (G = e == null ? void 0 : e.caipNetworkId) == null ? void 0 : G.toString(), a = e == null ? void 0 : e.chainNamespace, s = o !== i, h = s && !(n !== a), E = (t == null ? void 0 : t.name) === le.UNSUPPORTED_NETWORK_NAME, O = c.state.view === "ConnectingExternal", I = !this.caipAddress, te = c.state.view === "UnsupportedChain", oe = w.state.open;
    let R = !1;
    oe && !O && (I ? s && (R = !0) : (te || h && !E) && (R = !0)), R && c.state.view !== "SIWXSignMessage" && c.goBack(), this.caipNetwork = e;
  }
  prefetch() {
    this.hasPrefetched || (P.prefetch(), P.fetchWalletsByPage({ page: 1 }), this.hasPrefetched = !0);
  }
};
b.styles = xe;
$([
  p({ type: Boolean })
], b.prototype, "enableEmbedded", void 0);
$([
  d()
], b.prototype, "open", void 0);
$([
  d()
], b.prototype, "caipAddress", void 0);
$([
  d()
], b.prototype, "caipNetwork", void 0);
$([
  d()
], b.prototype, "shake", void 0);
$([
  d()
], b.prototype, "filterByNamespace", void 0);
b = $([
  x("w3m-modal")
], b);
export {
  b as W3mModal
};
