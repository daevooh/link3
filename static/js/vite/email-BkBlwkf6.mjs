var d = (a, e, t) => new Promise((n, o) => {
  var i = (p) => {
    try {
      s(t.next(p));
    } catch (T) {
      o(T);
    }
  }, r = (p) => {
    try {
      s(t.throw(p));
    } catch (T) {
      o(T);
    }
  }, s = (p) => p.done ? n(p.value) : Promise.resolve(p.value).then(i, r);
  s((t = t.apply(a, e)).next());
});
import { i as x, r as W, h as z, a as g, x as u, j as $, R as l, C as f, d as C, S as b, f as c, e as V, k as M, O as F, M as B, l as H, c as q } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { n as O, c as m, r as w, U as P } from "./if-defined-SxgRDNx5.mjs";
import "./index-CCX1TeUz.mjs";
import "./index-BQckQaxg.mjs";
import "./index-CpsJxmOq.mjs";
import { e as K, n as Y } from "./ref-stNgLGyH.mjs";
import "./index-YhqbR5Wc.mjs";
import "./index-SvrEPMTs.mjs";
const G = x`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 50px;
    height: 50px;
    background: var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
    font-family: var(--wui-font-family);
    font-size: var(--wui-font-size-large);
    font-weight: var(--wui-font-weight-regular);
    letter-spacing: var(--wui-letter-spacing-large);
    text-align: center;
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
    background: var(--wui-color-gray-glass-005);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-accent-100);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }
`;
var S = function(a, e, t, n) {
  var o = arguments.length, i = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(a, e, t, n);
  else for (var s = a.length - 1; s >= 0; s--) (r = a[s]) && (i = (o < 3 ? r(i) : o > 3 ? r(e, t, i) : r(e, t)) || i);
  return o > 3 && i && Object.defineProperty(e, t, i), i;
};
let E = class extends g {
  constructor() {
    super(...arguments), this.disabled = !1, this.value = "";
  }
  render() {
    return u`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `;
  }
};
E.styles = [W, z, G];
S([
  O({ type: Boolean })
], E.prototype, "disabled", void 0);
S([
  O({ type: String })
], E.prototype, "value", void 0);
E = S([
  m("wui-input-numeric")
], E);
const J = x`
  :host {
    position: relative;
    display: block;
  }
`;
var _ = function(a, e, t, n) {
  var o = arguments.length, i = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(a, e, t, n);
  else for (var s = a.length - 1; s >= 0; s--) (r = a[s]) && (i = (o < 3 ? r(i) : o > 3 ? r(e, t, i) : r(e, t)) || i);
  return o > 3 && i && Object.defineProperty(e, t, i), i;
};
let v = class extends g {
  constructor() {
    super(...arguments), this.length = 6, this.otp = "", this.values = Array.from({ length: this.length }).map(() => ""), this.numerics = [], this.shouldInputBeEnabled = (e) => this.values.slice(0, e).every((n) => n !== ""), this.handleKeyDown = (e, t) => {
      const n = e.target, o = this.getInputElement(n), i = ["ArrowLeft", "ArrowRight", "Shift", "Delete"];
      if (!o)
        return;
      i.includes(e.key) && e.preventDefault();
      const r = o.selectionStart;
      switch (e.key) {
        case "ArrowLeft":
          r && o.setSelectionRange(r + 1, r + 1), this.focusInputField("prev", t);
          break;
        case "ArrowRight":
          this.focusInputField("next", t);
          break;
        case "Shift":
          this.focusInputField("next", t);
          break;
        case "Delete":
          o.value === "" ? this.focusInputField("prev", t) : this.updateInput(o, t, "");
          break;
        case "Backspace":
          o.value === "" ? this.focusInputField("prev", t) : this.updateInput(o, t, "");
          break;
      }
    }, this.focusInputField = (e, t) => {
      if (e === "next") {
        const n = t + 1;
        if (!this.shouldInputBeEnabled(n))
          return;
        const o = this.numerics[n < this.length ? n : t], i = o ? this.getInputElement(o) : void 0;
        i && (i.disabled = !1, i.focus());
      }
      if (e === "prev") {
        const n = t - 1, o = this.numerics[n > -1 ? n : t], i = o ? this.getInputElement(o) : void 0;
        i && i.focus();
      }
    };
  }
  firstUpdated() {
    var t, n;
    this.otp && (this.values = this.otp.split(""));
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelectorAll("wui-input-numeric");
    e && (this.numerics = Array.from(e)), (n = this.numerics[0]) == null || n.focus();
  }
  render() {
    return u`
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({ length: this.length }).map((e, t) => u`
            <wui-input-numeric
              @input=${(n) => this.handleInput(n, t)}
              @click=${(n) => this.selectInput(n)}
              @keydown=${(n) => this.handleKeyDown(n, t)}
              .disabled=${!this.shouldInputBeEnabled(t)}
              .value=${this.values[t] || ""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `;
  }
  updateInput(e, t, n) {
    const o = this.numerics[t], i = e || (o ? this.getInputElement(o) : void 0);
    i && (i.value = n, this.values = this.values.map((r, s) => s === t ? n : r));
  }
  selectInput(e) {
    const t = e.target;
    if (t) {
      const n = this.getInputElement(t);
      n == null || n.select();
    }
  }
  handleInput(e, t) {
    const n = e.target, o = this.getInputElement(n);
    if (o) {
      const i = o.value;
      e.inputType === "insertFromPaste" ? this.handlePaste(o, i, t) : P.isNumber(i) && e.data ? (this.updateInput(o, t, e.data), this.focusInputField("next", t)) : this.updateInput(o, t, "");
    }
    this.dispatchInputChangeEvent();
  }
  handlePaste(e, t, n) {
    const o = t[0];
    if (o && P.isNumber(o)) {
      this.updateInput(e, n, o);
      const r = t.substring(1);
      if (n + 1 < this.length && r.length) {
        const s = this.numerics[n + 1], p = s ? this.getInputElement(s) : void 0;
        p && this.handlePaste(p, r, n + 1);
      } else
        this.focusInputField("next", n);
    } else
      this.updateInput(e, n, "");
  }
  getInputElement(e) {
    var t;
    return (t = e.shadowRoot) != null && t.querySelector("input") ? e.shadowRoot.querySelector("input") : null;
  }
  dispatchInputChangeEvent() {
    const e = this.values.join("");
    this.dispatchEvent(new CustomEvent("inputChange", {
      detail: e,
      bubbles: !0,
      composed: !0
    }));
  }
};
v.styles = [W, J];
_([
  O({ type: Number })
], v.prototype, "length", void 0);
_([
  O({ type: String })
], v.prototype, "otp", void 0);
_([
  w()
], v.prototype, "values", void 0);
v = _([
  m("wui-otp")
], v);
const Q = x`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`;
var R = function(a, e, t, n) {
  var o = arguments.length, i = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(a, e, t, n);
  else for (var s = a.length - 1; s >= 0; s--) (r = a[s]) && (i = (o < 3 ? r(i) : o > 3 ? r(e, t, i) : r(e, t)) || i);
  return o > 3 && i && Object.defineProperty(e, t, i), i;
};
const X = 6;
let h = class extends g {
  firstUpdated() {
    this.startOTPTimeout();
  }
  disconnectedCallback() {
    clearTimeout(this.OTPTimeout);
  }
  constructor() {
    var e;
    super(), this.loading = !1, this.timeoutTimeLeft = $.getTimeToNextEmailLogin(), this.error = "", this.otp = "", this.email = (e = l.state.data) == null ? void 0 : e.email, this.authConnector = f.getAuthConnector();
  }
  render() {
    if (!this.email)
      throw new Error("w3m-email-otp-widget: No email provided");
    const e = !!this.timeoutTimeLeft, t = this.getFooterLabels(e);
    return u`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["l", "0", "l", "0"]}
        gap="l"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${["0", "xl", "0", "xl"]}
        >
          <wui-text variant="paragraph-400" color="fg-100" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="paragraph-500" color="fg-100" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="small-400" color="fg-200">The code expires in 20 minutes</wui-text>

        ${this.loading ? u`<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>` : u` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error ? u`
                    <wui-text variant="small-400" align="center" color="error-100">
                      ${this.error}. Try Again
                    </wui-text>
                  ` : null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="small-400" color="fg-200">${t.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${e}>
            ${t.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `;
  }
  startOTPTimeout() {
    this.timeoutTimeLeft = $.getTimeToNextEmailLogin(), this.OTPTimeout = setInterval(() => {
      this.timeoutTimeLeft > 0 ? this.timeoutTimeLeft = $.getTimeToNextEmailLogin() : clearInterval(this.OTPTimeout);
    }, 1e3);
  }
  onOtpInputChange(e) {
    return d(this, null, function* () {
      var t;
      try {
        this.loading || (this.otp = e.detail, this.authConnector && this.otp.length === X && (this.loading = !0, yield (t = this.onOtpSubmit) == null ? void 0 : t.call(this, this.otp)));
      } catch (n) {
        this.error = C.parseError(n), this.loading = !1;
      }
    });
  }
  onResendCode() {
    return d(this, null, function* () {
      try {
        if (this.onOtpResend) {
          if (!this.loading && !this.timeoutTimeLeft) {
            if (this.error = "", this.otp = "", !f.getAuthConnector() || !this.email)
              throw new Error("w3m-email-otp-widget: Unable to resend email");
            this.loading = !0, yield this.onOtpResend(this.email), this.startOTPTimeout(), b.showSuccess("Code email resent");
          }
        } else this.onStartOver && this.onStartOver();
      } catch (e) {
        b.showError(e);
      } finally {
        this.loading = !1;
      }
    });
  }
  getFooterLabels(e) {
    return this.onStartOver ? {
      title: "Something wrong?",
      action: `Try again ${e ? `in ${this.timeoutTimeLeft}s` : ""}`
    } : {
      title: "Didn't receive it?",
      action: `Resend ${e ? `in ${this.timeoutTimeLeft}s` : "Code"}`
    };
  }
};
h.styles = Q;
R([
  w()
], h.prototype, "loading", void 0);
R([
  w()
], h.prototype, "timeoutTimeLeft", void 0);
R([
  w()
], h.prototype, "error", void 0);
h = R([
  m("w3m-email-otp-widget")
], h);
var Z = function(a, e, t, n) {
  var o = arguments.length, i = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(a, e, t, n);
  else for (var s = a.length - 1; s >= 0; s--) (r = a[s]) && (i = (o < 3 ? r(i) : o > 3 ? r(e, t, i) : r(e, t)) || i);
  return o > 3 && i && Object.defineProperty(e, t, i), i;
};
let L = class extends h {
  constructor() {
    super(...arguments), this.onOtpSubmit = (e) => d(this, null, function* () {
      try {
        if (this.authConnector) {
          if (yield this.authConnector.provider.connectOtp({ otp: e }), c.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_PASS" }), V.state.activeChain)
            yield M.connectExternal(this.authConnector, V.state.activeChain);
          else
            throw new Error("Active chain is not set on ChainControll");
          c.sendEvent({
            type: "track",
            event: "CONNECT_SUCCESS",
            properties: { method: "email", name: this.authConnector.name || "Unknown" }
          }), F.state.siwx || B.close();
        }
      } catch (t) {
        throw c.sendEvent({
          type: "track",
          event: "EMAIL_VERIFICATION_CODE_FAIL",
          properties: { message: C.parseError(t) }
        }), t;
      }
    }), this.onOtpResend = (e) => d(this, null, function* () {
      this.authConnector && (yield this.authConnector.provider.connectEmail({ email: e }), c.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_SENT" }));
    });
  }
};
L = Z([
  m("w3m-email-verify-otp-view")
], L);
const ee = x`
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`;
var U = function(a, e, t, n) {
  var o = arguments.length, i = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(a, e, t, n);
  else for (var s = a.length - 1; s >= 0; s--) (r = a[s]) && (i = (o < 3 ? r(i) : o > 3 ? r(e, t, i) : r(e, t)) || i);
  return o > 3 && i && Object.defineProperty(e, t, i), i;
};
let I = class extends g {
  constructor() {
    var e;
    super(), this.email = (e = l.state.data) == null ? void 0 : e.email, this.authConnector = f.getAuthConnector(), this.loading = !1, this.listenForDeviceApproval();
  }
  render() {
    if (!this.email)
      throw new Error("w3m-email-verify-device-view: No email provided");
    if (!this.authConnector)
      throw new Error("w3m-email-verify-device-view: No auth connector provided");
    return u`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xxl", "s", "xxl", "s"]}
        gap="l"
      >
        <wui-icon-box
          size="xl"
          iconcolor="accent-100"
          backgroundcolor="accent-100"
          icon="verify"
          background="opaque"
        ></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="s">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-400" color="fg-100">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="paragraph-400" color="fg-100"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="small-400" color="fg-200" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="xs">
            <wui-text variant="small-400" color="fg-100" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
  }
  listenForDeviceApproval() {
    return d(this, null, function* () {
      if (this.authConnector)
        try {
          yield this.authConnector.provider.connectDevice(), c.sendEvent({ type: "track", event: "DEVICE_REGISTERED_FOR_EMAIL" }), c.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_SENT" }), l.replace("EmailVerifyOtp", { email: this.email });
        } catch (e) {
          l.goBack();
        }
    });
  }
  onResendCode() {
    return d(this, null, function* () {
      try {
        if (!this.loading) {
          if (!this.authConnector || !this.email)
            throw new Error("w3m-email-login-widget: Unable to resend email");
          this.loading = !0, yield this.authConnector.provider.connectEmail({ email: this.email }), this.listenForDeviceApproval(), b.showSuccess("Code email resent");
        }
      } catch (e) {
        b.showError(e);
      } finally {
        this.loading = !1;
      }
    });
  }
};
I.styles = ee;
U([
  w()
], I.prototype, "loading", void 0);
I = U([
  m("w3m-email-verify-device-view")
], I);
const te = x`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;
var D = function(a, e, t, n) {
  var o = arguments.length, i = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(a, e, t, n);
  else for (var s = a.length - 1; s >= 0; s--) (r = a[s]) && (i = (o < 3 ? r(i) : o > 3 ? r(e, t, i) : r(e, t)) || i);
  return o > 3 && i && Object.defineProperty(e, t, i), i;
};
let y = class extends g {
  constructor() {
    var e, t, n;
    super(...arguments), this.formRef = K(), this.initialEmail = (t = (e = l.state.data) == null ? void 0 : e.email) != null ? t : "", this.redirectView = (n = l.state.data) == null ? void 0 : n.redirectView, this.email = "", this.loading = !1;
  }
  firstUpdated() {
    var e;
    (e = this.formRef.value) == null || e.addEventListener("keydown", (t) => {
      t.key === "Enter" && this.onSubmitEmail(t);
    });
  }
  render() {
    return u`
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${Y(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `;
  }
  onEmailInputChange(e) {
    this.email = e.detail;
  }
  onSubmitEmail(e) {
    return d(this, null, function* () {
      try {
        if (this.loading)
          return;
        this.loading = !0, e.preventDefault();
        const t = f.getAuthConnector();
        if (!t)
          throw new Error("w3m-update-email-wallet: Auth connector not found");
        const n = yield t.provider.updateEmail({ email: this.email });
        c.sendEvent({ type: "track", event: "EMAIL_EDIT" }), n.action === "VERIFY_SECONDARY_OTP" ? l.push("UpdateEmailSecondaryOtp", {
          email: this.initialEmail,
          newEmail: this.email,
          redirectView: this.redirectView
        }) : l.push("UpdateEmailPrimaryOtp", {
          email: this.initialEmail,
          newEmail: this.email,
          redirectView: this.redirectView
        });
      } catch (t) {
        b.showError(t), this.loading = !1;
      }
    });
  }
  buttonsTemplate() {
    const e = !this.loading && this.email.length > 3 && this.email !== this.initialEmail;
    return this.redirectView ? u`
      <wui-flex gap="s">
        <wui-button size="md" variant="neutral" fullWidth @click=${l.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    ` : u`
        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `;
  }
};
y.styles = te;
D([
  w()
], y.prototype, "email", void 0);
D([
  w()
], y.prototype, "loading", void 0);
y = D([
  m("w3m-update-email-wallet-view")
], y);
var ie = function(a, e, t, n) {
  var o = arguments.length, i = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(a, e, t, n);
  else for (var s = a.length - 1; s >= 0; s--) (r = a[s]) && (i = (o < 3 ? r(i) : o > 3 ? r(e, t, i) : r(e, t)) || i);
  return o > 3 && i && Object.defineProperty(e, t, i), i;
};
let N = class extends h {
  constructor() {
    var e;
    super(), this.email = (e = l.state.data) == null ? void 0 : e.email, this.onOtpSubmit = (t) => d(this, null, function* () {
      try {
        this.authConnector && (yield this.authConnector.provider.updateEmailPrimaryOtp({ otp: t }), c.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_PASS" }), l.replace("UpdateEmailSecondaryOtp", l.state.data));
      } catch (n) {
        throw c.sendEvent({
          type: "track",
          event: "EMAIL_VERIFICATION_CODE_FAIL",
          properties: { message: C.parseError(n) }
        }), n;
      }
    }), this.onStartOver = () => {
      l.replace("UpdateEmailWallet", l.state.data);
    };
  }
};
N = ie([
  m("w3m-update-email-primary-otp-view")
], N);
var ne = function(a, e, t, n) {
  var o = arguments.length, i = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(a, e, t, n);
  else for (var s = a.length - 1; s >= 0; s--) (r = a[s]) && (i = (o < 3 ? r(i) : o > 3 ? r(e, t, i) : r(e, t)) || i);
  return o > 3 && i && Object.defineProperty(e, t, i), i;
};
let j = class extends h {
  constructor() {
    var e, t;
    super(), this.email = (e = l.state.data) == null ? void 0 : e.newEmail, this.redirectView = (t = l.state.data) == null ? void 0 : t.redirectView, this.onOtpSubmit = (n) => d(this, null, function* () {
      try {
        this.authConnector && (yield this.authConnector.provider.updateEmailSecondaryOtp({ otp: n }), c.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_PASS" }), this.redirectView && l.reset(this.redirectView));
      } catch (o) {
        throw c.sendEvent({
          type: "track",
          event: "EMAIL_VERIFICATION_CODE_FAIL",
          properties: { message: C.parseError(o) }
        }), o;
      }
    }), this.onStartOver = () => {
      l.replace("UpdateEmailWallet", l.state.data);
    };
  }
};
j = ne([
  m("w3m-update-email-secondary-otp-view")
], j);
var k = function(a, e, t, n) {
  var o = arguments.length, i = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(a, e, t, n);
  else for (var s = a.length - 1; s >= 0; s--) (r = a[s]) && (i = (o < 3 ? r(i) : o > 3 ? r(e, t, i) : r(e, t)) || i);
  return o > 3 && i && Object.defineProperty(e, t, i), i;
};
let A = class extends g {
  constructor() {
    var e;
    super(), this.authConnector = f.getAuthConnector(), this.isEmailEnabled = (e = F.state.features) == null ? void 0 : e.email, this.isAuthEnabled = this.checkIfAuthEnabled(f.state.connectors), this.connectors = f.state.connectors, f.subscribeKey("connectors", (t) => {
      this.connectors = t, this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
    });
  }
  render() {
    if (!this.isEmailEnabled)
      throw new Error("w3m-email-login-view: Email is not enabled");
    if (!this.isAuthEnabled)
      throw new Error("w3m-email-login-view: No auth connector provided");
    return u`<wui-flex
      flexDirection="column"
      .padding=${["3xs", "m", "m", "m"]}
      gap="l"
    >
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `;
  }
  checkIfAuthEnabled(e) {
    const t = e.filter((o) => o.type === H.CONNECTOR_TYPE_AUTH).map((o) => o.chain);
    return q.AUTH_CONNECTOR_SUPPORTED_CHAINS.some((o) => t.includes(o));
  }
};
k([
  w()
], A.prototype, "connectors", void 0);
A = k([
  m("w3m-email-login-view")
], A);
export {
  A as W3mEmailLoginView,
  I as W3mEmailVerifyDeviceView,
  L as W3mEmailVerifyOtpView,
  N as W3mUpdateEmailPrimaryOtpView,
  j as W3mUpdateEmailSecondaryOtpView,
  y as W3mUpdateEmailWalletView
};
