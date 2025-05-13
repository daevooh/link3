var x = (o, e, i) => new Promise((n, s) => {
  var t = (d) => {
    try {
      a(i.next(d));
    } catch (S) {
      s(S);
    }
  }, r = (d) => {
    try {
      a(i.throw(d));
    } catch (S) {
      s(S);
    }
  }, a = (d) => d.done ? n(d.value) : Promise.resolve(d.value).then(t, r);
  a((i = i.apply(o, e)).next());
});
import { i as T, a as g, M as N, x as l, C as j, T as _, g as D, b as I, r as P, c as E, E as c, A as f, d as W, e as k, f as $, W as C, S as z, R as H } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { r as h, c as w, n as b, o as V } from "./if-defined-SxgRDNx5.mjs";
import { N as F } from "./index-DzvnLWXF.mjs";
import { e as G, n as Y } from "./ref-stNgLGyH.mjs";
import "./index-BQckQaxg.mjs";
import "./index-tz0FA7gp.mjs";
import "./index-Dz192-H2.mjs";
import "./index-D7kuGAC-.mjs";
import "./index-YhqbR5Wc.mjs";
import "./index-CpsJxmOq.mjs";
import "./index-CCX1TeUz.mjs";
const L = T`
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;
var M = function(o, e, i, n) {
  var s = arguments.length, t = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(o, e, i, n);
  else for (var a = o.length - 1; a >= 0; a--) (r = o[a]) && (t = (s < 3 ? r(t) : s > 3 ? r(e, i, t) : r(e, i)) || t);
  return s > 3 && t && Object.defineProperty(e, i, t), t;
};
const R = 600, O = 360, B = 64;
let y = class extends g {
  constructor() {
    super(), this.bodyObserver = void 0, this.unsubscribe = [], this.iframe = document.getElementById("w3m-iframe"), this.ready = !1, this.unsubscribe.push(N.subscribeKey("open", (e) => {
      e || this.onHideIframe();
    }), N.subscribeKey("shake", (e) => {
      e ? this.iframe.style.animation = "w3m-shake 500ms var(--wui-ease-out-power-2)" : this.iframe.style.animation = "none";
    }));
  }
  disconnectedCallback() {
    var e;
    this.onHideIframe(), this.unsubscribe.forEach((i) => i()), (e = this.bodyObserver) == null || e.unobserve(window.document.body);
  }
  firstUpdated() {
    return x(this, null, function* () {
      var i;
      yield this.syncTheme(), this.iframe.style.display = "block";
      const e = (i = this == null ? void 0 : this.renderRoot) == null ? void 0 : i.querySelector("div");
      this.bodyObserver = new ResizeObserver((n) => {
        var r, a;
        const s = (r = n == null ? void 0 : n[0]) == null ? void 0 : r.contentBoxSize, t = (a = s == null ? void 0 : s[0]) == null ? void 0 : a.inlineSize;
        this.iframe.style.height = `${R}px`, e.style.height = `${R}px`, t && t <= 430 ? (this.iframe.style.width = "100%", this.iframe.style.left = "0px", this.iframe.style.bottom = "0px", this.iframe.style.top = "unset") : (this.iframe.style.width = `${O}px`, this.iframe.style.left = `calc(50% - ${O / 2}px)`, this.iframe.style.top = `calc(50% - ${R / 2}px + ${B / 2}px)`, this.iframe.style.bottom = "unset"), this.ready = !0, this.onShowIframe();
      }), this.bodyObserver.observe(window.document.body);
    });
  }
  render() {
    return l`<div data-ready=${this.ready} id="w3m-frame-container"></div>`;
  }
  onShowIframe() {
    const e = window.innerWidth <= 430;
    this.iframe.style.animation = e ? "w3m-iframe-zoom-in-mobile 200ms var(--wui-ease-out-power-2)" : "w3m-iframe-zoom-in 200ms var(--wui-ease-out-power-2)";
  }
  onHideIframe() {
    this.iframe.style.display = "none", this.iframe.style.animation = "w3m-iframe-fade-out 200ms var(--wui-ease-out-power-2)";
  }
  syncTheme() {
    return x(this, null, function* () {
      const e = j.getAuthConnector();
      if (e) {
        const i = _.getSnapshot().themeMode, n = _.getSnapshot().themeVariables;
        yield e.provider.syncTheme({
          themeVariables: n,
          w3mThemeVariables: D(n, i)
        });
      }
    });
  }
};
y.styles = L;
M([
  h()
], y.prototype, "ready", void 0);
y = M([
  w("w3m-approve-transaction-view")
], y);
var K = function(o, e, i, n) {
  var s = arguments.length, t = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(o, e, i, n);
  else for (var a = o.length - 1; a >= 0; a--) (r = o[a]) && (t = (s < 3 ? r(t) : s > 3 ? r(e, i, t) : r(e, i)) || t);
  return s > 3 && t && Object.defineProperty(e, i, t), t;
};
let U = class extends g {
  render() {
    return l`
      <wui-flex flexDirection="column" alignItems="center" gap="xl" padding="xl">
        <wui-text variant="paragraph-400" color="fg-100">Follow the instructions on</wui-text>
        <wui-chip
          icon="externalLink"
          variant="fill"
          href=${I.SECURE_SITE_DASHBOARD}
          imageSrc=${I.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-chip>
        <wui-text variant="small-400" color="fg-200">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `;
  }
};
U = K([
  w("w3m-upgrade-wallet-view")
], U);
const q = T`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  .error {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }

  .base-name {
    position: absolute;
    right: 45px;
    top: 15px;
    text-align: right;
  }
`;
var v = function(o, e, i, n) {
  var s = arguments.length, t = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(o, e, i, n);
  else for (var a = o.length - 1; a >= 0; a--) (r = o[a]) && (t = (s < 3 ? r(t) : s > 3 ? r(e, i, t) : r(e, i)) || t);
  return s > 3 && t && Object.defineProperty(e, i, t), t;
};
let p = class extends g {
  constructor() {
    super(...arguments), this.disabled = !1, this.loading = !1;
  }
  render() {
    return l`
      <wui-input-text
        value=${V(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value || ""}
        data-testid="wui-ens-input"
        inputRightPadding="5xl"
      >
        ${this.baseNameTemplate()} ${this.errorTemplate()}${this.loadingTemplate()}
      </wui-input-text>
    `;
  }
  baseNameTemplate() {
    return l`<wui-text variant="paragraph-400" color="fg-200" class="base-name">
      ${E.WC_NAME_SUFFIX}
    </wui-text>`;
  }
  loadingTemplate() {
    return this.loading ? l`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>` : null;
  }
  errorTemplate() {
    return this.errorMessage ? l`<wui-text variant="tiny-500" color="error-100" class="error"
        >${this.errorMessage}</wui-text
      >` : null;
  }
};
p.styles = [P, q];
v([
  b()
], p.prototype, "errorMessage", void 0);
v([
  b({ type: Boolean })
], p.prototype, "disabled", void 0);
v([
  b()
], p.prototype, "value", void 0);
v([
  b({ type: Boolean })
], p.prototype, "loading", void 0);
p = v([
  w("wui-ens-input")
], p);
const X = T`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  .suggestion:hover {
    background-color: var(--wui-color-gray-glass-005);
    cursor: pointer;
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
  }

  wui-icon-link {
    position: absolute;
    right: 20px;
    transform: translateY(11px);
  }
`;
var m = function(o, e, i, n) {
  var s = arguments.length, t = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(o, e, i, n);
  else for (var a = o.length - 1; a >= 0; a--) (r = o[a]) && (t = (s < 3 ? r(t) : s > 3 ? r(e, i, t) : r(e, i)) || t);
  return s > 3 && t && Object.defineProperty(e, i, t), t;
};
let u = class extends g {
  constructor() {
    super(), this.formRef = G(), this.usubscribe = [], this.name = "", this.error = "", this.loading = c.state.loading, this.suggestions = c.state.suggestions, this.registered = !1, this.profileName = f.state.profileName, this.onDebouncedNameInputChange = W.debounce((e) => {
      c.validateName(e) ? (this.error = "", this.name = e, c.getSuggestions(e), c.isNameRegistered(e).then((i) => {
        this.registered = i;
      })) : e.length < 4 ? this.error = "Name must be at least 4 characters long" : this.error = "Can only contain letters, numbers and - characters";
    }), this.usubscribe.push(c.subscribe((e) => {
      this.suggestions = e.suggestions, this.loading = e.loading;
    }), f.subscribeKey("profileName", (e) => {
      this.profileName = e, e && (this.error = "You already own a name");
    }));
  }
  firstUpdated() {
    var e;
    (e = this.formRef.value) == null || e.addEventListener("keydown", this.onEnterKey.bind(this));
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), this.usubscribe.forEach((i) => i()), (e = this.formRef.value) == null || e.removeEventListener("keydown", this.onEnterKey.bind(this));
  }
  render() {
    return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="m"
        .padding=${["0", "s", "m", "s"]}
      >
        <form ${Y(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `;
  }
  submitButtonTemplate() {
    return this.isAllowedToSubmit() ? l`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitName.bind(this)}
          >
          </wui-icon-link>
        ` : null;
  }
  onSelectSuggestion(e) {
    return () => {
      this.name = e, this.registered = !1, this.requestUpdate();
    };
  }
  onNameInputChange(e) {
    this.onDebouncedNameInputChange(e.detail);
  }
  nameSuggestionTagTemplate() {
    return this.loading ? l`<wui-loading-spinner size="lg" color="fg-100"></wui-loading-spinner>` : this.registered ? l`<wui-tag variant="shade" size="lg">Registered</wui-tag>` : l`<wui-tag variant="success" size="lg">Available</wui-tag>`;
  }
  templateSuggestions() {
    if (!this.name || this.name.length < 4 || this.error)
      return null;
    const e = this.registered ? this.suggestions.filter((i) => i.name !== this.name) : [];
    return l`<wui-flex flexDirection="column" gap="xxs" alignItems="center">
      <wui-flex
        data-testid="account-name-suggestion"
        .padding=${["m", "m", "m", "m"]}
        justifyContent="space-between"
        class="suggestion"
        @click=${this.onSubmitName.bind(this)}
      >
        <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
          ${this.name}</wui-text
        >${this.nameSuggestionTagTemplate()}
      </wui-flex>
      ${e.map((i) => this.availableNameTemplate(i.name))}
    </wui-flex>`;
  }
  availableNameTemplate(e) {
    return l` <wui-flex
      data-testid="account-name-suggestion"
      .padding=${["m", "m", "m", "m"]}
      justifyContent="space-between"
      class="suggestion"
      @click=${this.onSelectSuggestion(e)}
    >
      <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
        ${e}
      </wui-text>
      <wui-tag variant="success" size="lg">Available</wui-tag>
    </wui-flex>`;
  }
  isAllowedToSubmit() {
    return !this.loading && !this.registered && !this.error && !this.profileName && c.validateName(this.name);
  }
  onSubmitName() {
    return x(this, null, function* () {
      var i, n, s;
      const e = k.state.activeChain;
      try {
        if (!this.isAllowedToSubmit())
          return;
        const t = `${this.name}${E.WC_NAME_SUFFIX}`;
        $.sendEvent({
          type: "track",
          event: "REGISTER_NAME_INITIATED",
          properties: {
            isSmartAccount: ((i = f.state.preferredAccountTypes) == null ? void 0 : i[e]) === C.ACCOUNT_TYPES.SMART_ACCOUNT,
            ensName: t
          }
        }), yield c.registerName(t), $.sendEvent({
          type: "track",
          event: "REGISTER_NAME_SUCCESS",
          properties: {
            isSmartAccount: ((n = f.state.preferredAccountTypes) == null ? void 0 : n[e]) === C.ACCOUNT_TYPES.SMART_ACCOUNT,
            ensName: t
          }
        });
      } catch (t) {
        z.showError(t.message), $.sendEvent({
          type: "track",
          event: "REGISTER_NAME_ERROR",
          properties: {
            isSmartAccount: ((s = f.state.preferredAccountTypes) == null ? void 0 : s[e]) === C.ACCOUNT_TYPES.SMART_ACCOUNT,
            ensName: `${this.name}${E.WC_NAME_SUFFIX}`,
            error: (t == null ? void 0 : t.message) || "Unknown error"
          }
        });
      }
    });
  }
  onEnterKey(e) {
    e.key === "Enter" && this.isAllowedToSubmit() && this.onSubmitName();
  }
};
u.styles = X;
m([
  b()
], u.prototype, "errorMessage", void 0);
m([
  h()
], u.prototype, "name", void 0);
m([
  h()
], u.prototype, "error", void 0);
m([
  h()
], u.prototype, "loading", void 0);
m([
  h()
], u.prototype, "suggestions", void 0);
m([
  h()
], u.prototype, "registered", void 0);
m([
  h()
], u.prototype, "profileName", void 0);
u = m([
  w("w3m-register-account-name-view")
], u);
const Q = T`
  .continue-button-container {
    width: 100%;
  }
`;
var J = function(o, e, i, n) {
  var s = arguments.length, t = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(o, e, i, n);
  else for (var a = o.length - 1; a >= 0; a--) (r = o[a]) && (t = (s < 3 ? r(t) : s > 3 ? r(e, i, t) : r(e, i)) || t);
  return s > 3 && t && Object.defineProperty(e, i, t), t;
};
let A = class extends g {
  render() {
    return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0", "0", "l", "0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${() => {
      W.openHref(F.URLS.FAQ, "_blank");
    }}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `;
  }
  onboardingTemplate() {
    return l` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0", "xxl", "0", "xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          size="xl"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`;
  }
  buttonsTemplate() {
    return l`<wui-flex
      .padding=${["0", "2l", "0", "2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`;
  }
  redirectToAccount() {
    H.replace("Account");
  }
};
A.styles = Q;
A = J([
  w("w3m-register-account-name-success-view")
], A);
export {
  y as W3mApproveTransactionView,
  A as W3mRegisterAccountNameSuccess,
  u as W3mRegisterAccountNameView,
  U as W3mUpgradeWalletView
};
