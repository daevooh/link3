var h = (s, e, t) => new Promise((n, r) => {
  var i = (b) => {
    try {
      a(t.next(b));
    } catch (O) {
      r(O);
    }
  }, o = (b) => {
    try {
      a(t.throw(b));
    } catch (O) {
      r(O);
    }
  }, a = (b) => b.done ? n(b.value) : Promise.resolve(b.value).then(i, o);
  a((t = t.apply(s, e)).next());
});
import { i as w, a as m, d as V, k as F, s as l, x as u, r as U, h as H, R as v, N as M, e as A, t as Y, S as D, f as K, A as G, W as J } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { n as d, r as c, c as g, U as k, o as Q } from "./if-defined-SxgRDNx5.mjs";
import "./index-YhqbR5Wc.mjs";
import "./index-CpsJxmOq.mjs";
import { e as z, n as W } from "./ref-stNgLGyH.mjs";
import { n as X, s as Z } from "./ConstantsUtil-B-_-u8aQ.mjs";
import "./index-CCX1TeUz.mjs";
import { S as ee } from "./index-CYuCi4VR.mjs";
import "./index-tz0FA7gp.mjs";
import "./index-GLkiULf2.mjs";
import "./index-PS8mUgmz.mjs";
import "./index-CXCuF3ao.mjs";
const te = w`
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
    position: relative;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    display: ruby;
    color: var(--wui-color-fg-100);
    margin: 0 var(--wui-spacing-xs);
  }

  .instruction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .paste {
    display: inline-flex;
  }

  textarea {
    background: transparent;
    width: 100%;
    font-family: var(--w3m-font-family);
    font-size: var(--wui-font-size-medium);
    font-style: normal;
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    letter-spacing: var(--wui-letter-spacing-medium);
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    border: none;
    outline: none;
    appearance: none;
    resize: none;
    overflow: hidden;
  }
`;
var j = function(s, e, t, n) {
  var r = arguments.length, i = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(s, e, t, n);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (i = (r < 3 ? o(i) : r > 3 ? o(e, t, i) : o(e, t)) || i);
  return r > 3 && i && Object.defineProperty(e, t, i), i;
};
let T = class extends m {
  constructor() {
    super(...arguments), this.inputElementRef = z(), this.instructionElementRef = z(), this.instructionHidden = !!this.value, this.pasting = !1, this.onDebouncedSearch = V.debounce((e) => h(this, null, function* () {
      const t = yield F.getEnsAddress(e);
      if (l.setLoading(!1), t) {
        l.setReceiverProfileName(e), l.setReceiverAddress(t);
        const n = yield F.getEnsAvatar(e);
        l.setReceiverProfileImageUrl(n || void 0);
      } else
        l.setReceiverAddress(e), l.setReceiverProfileName(void 0), l.setReceiverProfileImageUrl(void 0);
    }));
  }
  firstUpdated() {
    this.value && (this.instructionHidden = !0), this.checkHidden();
  }
  render() {
    var e, t;
    return u` <wui-flex
      @click=${this.onBoxClick.bind(this)}
      flexDirection="column"
      justifyContent="center"
      gap="4xs"
      .padding=${["2xl", "l", "xl", "l"]}
    >
      <wui-text
        ${W(this.instructionElementRef)}
        class="instruction"
        color="fg-300"
        variant="medium-400"
      >
        Type or
        <wui-button
          class="paste"
          size="md"
          variant="neutral"
          iconLeft="copy"
          @click=${this.onPasteClick.bind(this)}
        >
          <wui-icon size="sm" color="inherit" slot="iconLeft" name="copy"></wui-icon>
          Paste
        </wui-button>
        address
      </wui-text>
      <textarea
        spellcheck="false"
        ?disabled=${!this.instructionHidden}
        ${W(this.inputElementRef)}
        @input=${this.onInputChange.bind(this)}
        @blur=${this.onBlur.bind(this)}
        .value=${(e = this.value) != null ? e : ""}
        autocomplete="off"
      >
${(t = this.value) != null ? t : ""}</textarea
      >
    </wui-flex>`;
  }
  focusInput() {
    return h(this, null, function* () {
      var e;
      this.instructionElementRef.value && (this.instructionHidden = !0, yield this.toggleInstructionFocus(!1), this.instructionElementRef.value.style.pointerEvents = "none", (e = this.inputElementRef.value) == null || e.focus(), this.inputElementRef.value && (this.inputElementRef.value.selectionStart = this.inputElementRef.value.selectionEnd = this.inputElementRef.value.value.length));
    });
  }
  focusInstruction() {
    return h(this, null, function* () {
      var e;
      this.instructionElementRef.value && (this.instructionHidden = !1, yield this.toggleInstructionFocus(!0), this.instructionElementRef.value.style.pointerEvents = "auto", (e = this.inputElementRef.value) == null || e.blur());
    });
  }
  toggleInstructionFocus(e) {
    return h(this, null, function* () {
      this.instructionElementRef.value && (yield this.instructionElementRef.value.animate([{ opacity: e ? 0 : 1 }, { opacity: e ? 1 : 0 }], {
        duration: 100,
        easing: "ease",
        fill: "forwards"
      }).finished);
    });
  }
  onBoxClick() {
    !this.value && !this.instructionHidden && this.focusInput();
  }
  onBlur() {
    !this.value && this.instructionHidden && !this.pasting && this.focusInstruction();
  }
  checkHidden() {
    this.instructionHidden && this.focusInput();
  }
  onPasteClick() {
    return h(this, null, function* () {
      this.pasting = !0;
      const e = yield navigator.clipboard.readText();
      l.setReceiverAddress(e), this.focusInput();
    });
  }
  onInputChange(e) {
    this.pasting = !1;
    const t = e.target;
    t.value && !this.instructionHidden && this.focusInput(), l.setLoading(!0), this.onDebouncedSearch(t.value);
  }
};
T.styles = te;
j([
  d()
], T.prototype, "value", void 0);
j([
  c()
], T.prototype, "instructionHidden", void 0);
j([
  c()
], T.prototype, "pasting", void 0);
T = j([
  g("w3m-input-address")
], T);
const ie = w`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    background: transparent;
    width: 100%;
    height: auto;
    font-family: var(--wui-font-family);
    color: var(--wui-color-fg-100);

    font-feature-settings: 'case' on;
    font-size: 32px;
    font-weight: var(--wui-font-weight-light);
    caret-color: var(--wui-color-accent-100);
    line-height: 130%;
    letter-spacing: -1.28px;
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

  input::placeholder {
    color: var(--wui-color-fg-275);
  }
`;
var _ = function(s, e, t, n) {
  var r = arguments.length, i = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(s, e, t, n);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (i = (r < 3 ? o(i) : r > 3 ? o(e, t, i) : o(e, t)) || i);
  return r > 3 && i && Object.defineProperty(e, t, i), i;
};
let R = class extends m {
  constructor() {
    super(...arguments), this.inputElementRef = z(), this.disabled = !1, this.value = "", this.placeholder = "0";
  }
  render() {
    var e, t;
    return (e = this.inputElementRef) != null && e.value && this.value && (this.inputElementRef.value.value = this.value), u`<input
      ${W(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${(t = this.value) != null ? t : ""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    /> `;
  }
  dispatchInputChangeEvent(e) {
    var n, r;
    const t = e.data;
    if (t && ((n = this.inputElementRef) != null && n.value))
      if (t === ",") {
        const i = this.inputElementRef.value.value.replace(",", ".");
        this.inputElementRef.value.value = i, this.value = `${this.value}${i}`;
      } else X.test(t) || (this.inputElementRef.value.value = this.value.replace(new RegExp(t.replace(Z, "\\$&"), "gu"), ""));
    this.dispatchEvent(new CustomEvent("inputChange", {
      detail: (r = this.inputElementRef.value) == null ? void 0 : r.value,
      bubbles: !0,
      composed: !0
    }));
  }
};
R.styles = [U, H, ie];
_([
  d({ type: Boolean })
], R.prototype, "disabled", void 0);
_([
  d({ type: String })
], R.prototype, "value", void 0);
_([
  d({ type: String })
], R.prototype, "placeholder", void 0);
R = _([
  g("wui-input-amount")
], R);
const ne = w`
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  wui-input-amount {
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  .totalValue {
    width: 100%;
  }
`;
var L = function(s, e, t, n) {
  var r = arguments.length, i = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(s, e, t, n);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (i = (r < 3 ? o(i) : r > 3 ? o(e, t, i) : o(e, t)) || i);
  return r > 3 && i && Object.defineProperty(e, t, i), i;
};
let P = class extends m {
  render() {
    return u` <wui-flex
      flexDirection="column"
      gap="4xs"
      .padding=${["xl", "s", "l", "l"]}
    >
      <wui-flex alignItems="center">
        <wui-input-amount
          @inputChange=${this.onInputChange.bind(this)}
          ?disabled=${!this.token && !0}
          .value=${this.sendTokenAmount ? String(this.sendTokenAmount) : ""}
        ></wui-input-amount>
        ${this.buttonTemplate()}
      </wui-flex>
      <wui-flex alignItems="center" justifyContent="space-between">
        ${this.sendValueTemplate()}
        <wui-flex alignItems="center" gap="4xs" justifyContent="flex-end">
          ${this.maxAmountTemplate()} ${this.actionTemplate()}
        </wui-flex>
      </wui-flex>
    </wui-flex>`;
  }
  buttonTemplate() {
    return this.token ? u`<wui-token-button
        text=${this.token.symbol}
        imageSrc=${this.token.iconUrl}
        @click=${this.handleSelectButtonClick.bind(this)}
      >
      </wui-token-button>` : u`<wui-button
      size="md"
      variant="accent"
      @click=${this.handleSelectButtonClick.bind(this)}
      >Select token</wui-button
    >`;
  }
  handleSelectButtonClick() {
    v.push("WalletSendSelectToken");
  }
  sendValueTemplate() {
    if (this.token && this.sendTokenAmount) {
      const t = this.token.price * this.sendTokenAmount;
      return u`<wui-text class="totalValue" variant="small-400" color="fg-200"
        >${t ? `$${k.formatNumberToLocalString(t, 2)}` : "Incorrect value"}</wui-text
      >`;
    }
    return null;
  }
  maxAmountTemplate() {
    return this.token ? this.sendTokenAmount && this.sendTokenAmount > Number(this.token.quantity.numeric) ? u` <wui-text variant="small-400" color="error-100">
          ${k.roundNumber(Number(this.token.quantity.numeric), 6, 5)}
        </wui-text>` : u` <wui-text variant="small-400" color="fg-200">
        ${k.roundNumber(Number(this.token.quantity.numeric), 6, 5)}
      </wui-text>` : null;
  }
  actionTemplate() {
    return this.token ? this.sendTokenAmount && this.sendTokenAmount > Number(this.token.quantity.numeric) ? u`<wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>` : u`<wui-link @click=${this.onMaxClick.bind(this)}>Max</wui-link>` : null;
  }
  onInputChange(e) {
    l.setTokenAmount(e.detail);
  }
  onMaxClick() {
    if (this.token) {
      const e = M.bigNumber(this.token.quantity.numeric);
      l.setTokenAmount(Number(e.toFixed(20)));
    }
  }
  onBuyClick() {
    v.push("OnRampProviders");
  }
};
P.styles = ne;
L([
  d({ type: Object })
], P.prototype, "token", void 0);
L([
  d({ type: Number })
], P.prototype, "sendTokenAmount", void 0);
P = L([
  g("w3m-input-token")
], P);
const re = w`
  :host {
    display: block;
  }

  wui-flex {
    position: relative;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xs) !important;
    border: 5px solid var(--wui-color-bg-125);
    background: var(--wui-color-bg-175);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  wui-button {
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .inputContainer {
    height: fit-content;
  }
`;
var C = function(s, e, t, n) {
  var r = arguments.length, i = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(s, e, t, n);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (i = (r < 3 ? o(i) : r > 3 ? o(e, t, i) : o(e, t)) || i);
  return r > 3 && i && Object.defineProperty(e, t, i), i;
};
let f = class extends m {
  constructor() {
    super(), this.unsubscribe = [], this.token = l.state.token, this.sendTokenAmount = l.state.sendTokenAmount, this.receiverAddress = l.state.receiverAddress, this.receiverProfileName = l.state.receiverProfileName, this.loading = l.state.loading, this.message = "Preview Send", this.fetchNetworkPrice(), this.fetchBalances(), this.unsubscribe.push(l.subscribe((e) => {
      this.token = e.token, this.sendTokenAmount = e.sendTokenAmount, this.receiverAddress = e.receiverAddress, this.receiverProfileName = e.receiverProfileName, this.loading = e.loading;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    return this.getMessage(), u` <wui-flex flexDirection="column" .padding=${["0", "l", "l", "l"]}>
      <wui-flex class="inputContainer" gap="xs" flexDirection="column">
        <w3m-input-token
          .token=${this.token}
          .sendTokenAmount=${this.sendTokenAmount}
        ></w3m-input-token>
        <wui-icon-box
          size="inherit"
          backgroundColor="fg-300"
          iconSize="lg"
          iconColor="fg-250"
          background="opaque"
          icon="arrowBottom"
        ></wui-icon-box>
        <w3m-input-address
          .value=${this.receiverProfileName ? this.receiverProfileName : this.receiverAddress}
        ></w3m-input-address>
      </wui-flex>
      <wui-flex .margin=${["l", "0", "0", "0"]}>
        <wui-button
          @click=${this.onButtonClick.bind(this)}
          ?disabled=${!this.message.startsWith("Preview Send")}
          size="lg"
          variant="main"
          ?loading=${this.loading}
          fullWidth
        >
          ${this.message}
        </wui-button>
      </wui-flex>
    </wui-flex>`;
  }
  fetchBalances() {
    return h(this, null, function* () {
      yield l.fetchTokenBalance(), l.fetchNetworkBalance();
    });
  }
  fetchNetworkPrice() {
    return h(this, null, function* () {
      yield ee.getNetworkTokenPrice();
    });
  }
  onButtonClick() {
    v.push("WalletSendPreview");
  }
  getMessage() {
    var e;
    this.message = "Preview Send", this.receiverAddress && !V.isAddress(this.receiverAddress, A.state.activeChain) && (this.message = "Invalid Address"), this.receiverAddress || (this.message = "Add Address"), this.sendTokenAmount && this.token && this.sendTokenAmount > Number(this.token.quantity.numeric) && (this.message = "Insufficient Funds"), this.sendTokenAmount || (this.message = "Add Amount"), this.sendTokenAmount && ((e = this.token) != null && e.price) && (this.sendTokenAmount * this.token.price || (this.message = "Incorrect Value")), this.token || (this.message = "Select Token");
  }
};
f.styles = re;
C([
  c()
], f.prototype, "token", void 0);
C([
  c()
], f.prototype, "sendTokenAmount", void 0);
C([
  c()
], f.prototype, "receiverAddress", void 0);
C([
  c()
], f.prototype, "receiverProfileName", void 0);
C([
  c()
], f.prototype, "loading", void 0);
C([
  c()
], f.prototype, "message", void 0);
f = C([
  g("w3m-wallet-send-view")
], f);
const oe = w`
  .contentContainer {
    height: 440px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }
`;
var I = function(s, e, t, n) {
  var r = arguments.length, i = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(s, e, t, n);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (i = (r < 3 ? o(i) : r > 3 ? o(e, t, i) : o(e, t)) || i);
  return r > 3 && i && Object.defineProperty(e, t, i), i;
};
let y = class extends m {
  constructor() {
    super(), this.unsubscribe = [], this.tokenBalances = l.state.tokenBalances, this.search = "", this.onDebouncedSearch = V.debounce((e) => {
      this.search = e;
    }), this.unsubscribe.push(l.subscribe((e) => {
      this.tokenBalances = e.tokenBalances;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    return u`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `;
  }
  templateSearchInput() {
    return u`
      <wui-flex gap="xs" padding="s">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `;
  }
  templateTokens() {
    var e, t;
    return this.tokens = (e = this.tokenBalances) == null ? void 0 : e.filter((n) => {
      var r;
      return n.chainId === ((r = A.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId);
    }), this.search ? this.filteredTokens = (t = this.tokenBalances) == null ? void 0 : t.filter((n) => n.name.toLowerCase().includes(this.search.toLowerCase())) : this.filteredTokens = this.tokens, u`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${["0", "s", "0", "s"]}
      >
        <wui-flex justifyContent="flex-start" .padding=${["m", "s", "s", "s"]}>
          <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="xs">
          ${this.filteredTokens && this.filteredTokens.length > 0 ? this.filteredTokens.map((n) => u`<wui-list-token
                    @click=${this.handleTokenClick.bind(this, n)}
                    ?clickable=${!0}
                    tokenName=${n.name}
                    tokenImageUrl=${n.iconUrl}
                    tokenAmount=${n.quantity.numeric}
                    tokenValue=${n.value}
                    tokenCurrency=${n.symbol}
                  ></wui-list-token>`) : u`<wui-flex
                .padding=${["4xl", "0", "0", "0"]}
                alignItems="center"
                flexDirection="column"
                gap="l"
              >
                <wui-icon-box
                  icon="coinPlaceholder"
                  size="inherit"
                  iconColor="fg-200"
                  backgroundColor="fg-200"
                  iconSize="lg"
                ></wui-icon-box>
                <wui-flex
                  class="textContent"
                  gap="xs"
                  flexDirection="column"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <wui-text variant="paragraph-500" align="center" color="fg-100"
                    >No tokens found</wui-text
                  >
                  <wui-text variant="small-400" align="center" color="fg-200"
                    >Your tokens will appear here</wui-text
                  >
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `;
  }
  onBuyClick() {
    v.push("OnRampProviders");
  }
  onInputChange(e) {
    this.onDebouncedSearch(e.detail);
  }
  handleTokenClick(e) {
    l.setToken(e), l.setTokenAmount(void 0), v.goBack();
  }
};
y.styles = oe;
I([
  c()
], y.prototype, "tokenBalances", void 0);
I([
  c()
], y.prototype, "tokens", void 0);
I([
  c()
], y.prototype, "filteredTokens", void 0);
I([
  c()
], y.prototype, "search", void 0);
y = I([
  g("w3m-wallet-send-select-token-view")
], y);
const se = w`
  :host {
    display: flex;
    gap: var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-xs) var(--wui-spacing-2xs)
      var(--wui-spacing-s);
    align-items: center;
  }

  wui-avatar,
  wui-icon,
  wui-image {
    width: 32px;
    height: 32px;
    border: 1px solid var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-002);
  }
`;
var E = function(s, e, t, n) {
  var r = arguments.length, i = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(s, e, t, n);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (i = (r < 3 ? o(i) : r > 3 ? o(e, t, i) : o(e, t)) || i);
  return r > 3 && i && Object.defineProperty(e, t, i), i;
};
let $ = class extends m {
  constructor() {
    super(...arguments), this.text = "", this.address = "", this.isAddress = !1;
  }
  render() {
    return u`<wui-text variant="large-500" color="fg-100">${this.text}</wui-text>
      ${this.imageTemplate()}`;
  }
  imageTemplate() {
    return this.isAddress ? u`<wui-avatar address=${this.address} .imageSrc=${this.imageSrc}></wui-avatar>` : this.imageSrc ? u`<wui-image src=${this.imageSrc}></wui-image>` : u`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
  }
};
$.styles = [U, H, se];
E([
  d()
], $.prototype, "text", void 0);
E([
  d()
], $.prototype, "address", void 0);
E([
  d()
], $.prototype, "imageSrc", void 0);
E([
  d({ type: Boolean })
], $.prototype, "isAddress", void 0);
$ = E([
  g("wui-preview-item")
], $);
const ae = w`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: 17px 18px 17px var(--wui-spacing-m);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  wui-image {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-icon {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
  }
`;
var B = function(s, e, t, n) {
  var r = arguments.length, i = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(s, e, t, n);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (i = (r < 3 ? o(i) : r > 3 ? o(e, t, i) : o(e, t)) || i);
  return r > 3 && i && Object.defineProperty(e, t, i), i;
};
let S = class extends m {
  constructor() {
    super(...arguments), this.imageSrc = void 0, this.textTitle = "", this.textValue = void 0;
  }
  render() {
    return u`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color=${this.textValue ? "fg-200" : "fg-100"}>
          ${this.textTitle}
        </wui-text>
        ${this.templateContent()}
      </wui-flex>
    `;
  }
  templateContent() {
    return this.imageSrc ? u`<wui-image src=${this.imageSrc} alt=${this.textTitle}></wui-image>` : this.textValue ? u` <wui-text variant="paragraph-400" color="fg-100"> ${this.textValue} </wui-text>` : u`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
  }
};
S.styles = [U, H, ae];
B([
  d()
], S.prototype, "imageSrc", void 0);
B([
  d()
], S.prototype, "textTitle", void 0);
B([
  d()
], S.prototype, "textValue", void 0);
S = B([
  g("wui-list-content")
], S);
const le = w`
  :host {
    display: flex;
    width: auto;
    flex-direction: column;
    gap: var(--wui-border-radius-1xs);
    border-radius: var(--wui-border-radius-s);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-s) var(--wui-spacing-1xs) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }

  wui-text {
    padding: 0 var(--wui-spacing-1xs);
  }

  wui-flex {
    margin-top: var(--wui-spacing-1xs);
  }

  .network {
    cursor: pointer;
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  .network:focus-visible {
    border: 1px solid var(--wui-color-accent-100);
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  .network:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .network:active {
    background-color: var(--wui-color-gray-glass-010);
  }
`;
var q = function(s, e, t, n) {
  var r = arguments.length, i = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(s, e, t, n);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (i = (r < 3 ? o(i) : r > 3 ? o(e, t, i) : o(e, t)) || i);
  return r > 3 && i && Object.defineProperty(e, t, i), i;
};
let N = class extends m {
  render() {
    var e;
    return u` <wui-text variant="small-400" color="fg-200">Details</wui-text>
      <wui-flex flexDirection="column" gap="xxs">
        <wui-list-content
          textTitle="Address"
          textValue=${k.getTruncateString({
      string: (e = this.receiverAddress) != null ? e : "",
      charsStart: 4,
      charsEnd: 4,
      truncate: "middle"
    })}
        >
        </wui-list-content>
        ${this.networkTemplate()}
      </wui-flex>`;
  }
  networkTemplate() {
    var e;
    return (e = this.caipNetwork) != null && e.name ? u` <wui-list-content
        @click=${() => this.onNetworkClick(this.caipNetwork)}
        class="network"
        textTitle="Network"
        imageSrc=${Q(Y.getNetworkImage(this.caipNetwork))}
      ></wui-list-content>` : null;
  }
  onNetworkClick(e) {
    e && v.push("Networks", { network: e });
  }
};
N.styles = le;
q([
  d()
], N.prototype, "receiverAddress", void 0);
q([
  d({ type: Object })
], N.prototype, "caipNetwork", void 0);
N = q([
  g("w3m-wallet-send-details")
], N);
const ue = w`
  wui-avatar,
  wui-image {
    display: ruby;
    width: 32px;
    height: 32px;
    border-radius: var(--wui-border-radius-3xl);
  }

  .sendButton {
    width: 70%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .cancelButton {
    width: 30%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }
`;
var x = function(s, e, t, n) {
  var r = arguments.length, i = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(s, e, t, n);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (i = (r < 3 ? o(i) : r > 3 ? o(e, t, i) : o(e, t)) || i);
  return r > 3 && i && Object.defineProperty(e, t, i), i;
};
let p = class extends m {
  constructor() {
    super(), this.unsubscribe = [], this.token = l.state.token, this.sendTokenAmount = l.state.sendTokenAmount, this.receiverAddress = l.state.receiverAddress, this.receiverProfileName = l.state.receiverProfileName, this.receiverProfileImageUrl = l.state.receiverProfileImageUrl, this.caipNetwork = A.state.activeCaipNetwork, this.loading = l.state.loading, this.unsubscribe.push(l.subscribe((e) => {
      this.token = e.token, this.sendTokenAmount = e.sendTokenAmount, this.receiverAddress = e.receiverAddress, this.receiverProfileName = e.receiverProfileName, this.receiverProfileImageUrl = e.receiverProfileImageUrl, this.loading = e.loading;
    }), A.subscribeKey("activeCaipNetwork", (e) => this.caipNetwork = e));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    var e, t, n, r;
    return u` <wui-flex flexDirection="column" .padding=${["0", "l", "l", "l"]}>
      <wui-flex gap="xs" flexDirection="column" .padding=${["0", "xs", "0", "xs"]}>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-flex flexDirection="column" gap="4xs">
            <wui-text variant="small-400" color="fg-150">Send</wui-text>
            ${this.sendValueTemplate()}
          </wui-flex>
          <wui-preview-item
            text="${this.sendTokenAmount ? k.roundNumber(this.sendTokenAmount, 6, 5) : "unknown"} ${(e = this.token) == null ? void 0 : e.symbol}"
            .imageSrc=${(t = this.token) == null ? void 0 : t.iconUrl}
          ></wui-preview-item>
        </wui-flex>
        <wui-flex>
          <wui-icon color="fg-200" size="md" name="arrowBottom"></wui-icon>
        </wui-flex>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="small-400" color="fg-150">To</wui-text>
          <wui-preview-item
            text="${this.receiverProfileName ? k.getTruncateString({
      string: this.receiverProfileName,
      charsStart: 20,
      charsEnd: 0,
      truncate: "end"
    }) : k.getTruncateString({
      string: this.receiverAddress ? this.receiverAddress : "",
      charsStart: 4,
      charsEnd: 4,
      truncate: "middle"
    })}"
            address=${(n = this.receiverAddress) != null ? n : ""}
            .imageSrc=${(r = this.receiverProfileImageUrl) != null ? r : void 0}
            .isAddress=${!0}
          ></wui-preview-item>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" .padding=${["xxl", "0", "0", "0"]}>
        <w3m-wallet-send-details
          .caipNetwork=${this.caipNetwork}
          .receiverAddress=${this.receiverAddress}
        ></w3m-wallet-send-details>
        <wui-flex justifyContent="center" gap="xxs" .padding=${["s", "0", "0", "0"]}>
          <wui-icon size="sm" color="fg-200" name="warningCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>
        <wui-flex justifyContent="center" gap="s" .padding=${["l", "0", "0", "0"]}>
          <wui-button
            class="cancelButton"
            @click=${this.onCancelClick.bind(this)}
            size="lg"
            variant="neutral"
          >
            Cancel
          </wui-button>
          <wui-button
            class="sendButton"
            @click=${this.onSendClick.bind(this)}
            size="lg"
            variant="main"
            .loading=${this.loading}
          >
            Send
          </wui-button>
        </wui-flex>
      </wui-flex></wui-flex
    >`;
  }
  sendValueTemplate() {
    if (this.token && this.sendTokenAmount) {
      const t = this.token.price * this.sendTokenAmount;
      return u`<wui-text variant="paragraph-400" color="fg-100"
        >$${t.toFixed(2)}</wui-text
      >`;
    }
    return null;
  }
  onSendClick() {
    return h(this, null, function* () {
      var e, t, n;
      if (!this.sendTokenAmount || !this.receiverAddress) {
        D.showError("Please enter a valid amount and receiver address");
        return;
      }
      try {
        yield l.sendToken(), D.showSuccess("Transaction started"), v.replace("Account");
      } catch (r) {
        D.showError("Failed to send transaction. Please try again."), console.error("SendController:sendToken - failed to send transaction", r);
        const i = A.state.activeChain, o = r instanceof Error ? r.message : "Unknown error";
        K.sendEvent({
          type: "track",
          event: "SEND_ERROR",
          properties: {
            message: o,
            isSmartAccount: ((e = G.state.preferredAccountTypes) == null ? void 0 : e[i]) === J.ACCOUNT_TYPES.SMART_ACCOUNT,
            token: ((t = this.token) == null ? void 0 : t.symbol) || "",
            amount: this.sendTokenAmount,
            network: ((n = A.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) || ""
          }
        });
      }
    });
  }
  onCancelClick() {
    v.goBack();
  }
};
p.styles = ue;
x([
  c()
], p.prototype, "token", void 0);
x([
  c()
], p.prototype, "sendTokenAmount", void 0);
x([
  c()
], p.prototype, "receiverAddress", void 0);
x([
  c()
], p.prototype, "receiverProfileName", void 0);
x([
  c()
], p.prototype, "receiverProfileImageUrl", void 0);
x([
  c()
], p.prototype, "caipNetwork", void 0);
x([
  c()
], p.prototype, "loading", void 0);
p = x([
  g("w3m-wallet-send-preview-view")
], p);
export {
  y as W3mSendSelectTokenView,
  p as W3mWalletSendPreviewView,
  f as W3mWalletSendView
};
