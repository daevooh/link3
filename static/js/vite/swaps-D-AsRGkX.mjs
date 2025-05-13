var _ = (c, t, e) => new Promise((o, a) => {
  var i = (p) => {
    try {
      l(e.next(p));
    } catch (w) {
      a(w);
    }
  }, r = (p) => {
    try {
      l(e.throw(p));
    } catch (w) {
      a(w);
    }
  }, l = (p) => p.done ? o(p.value) : Promise.resolve(p.value).then(i, r);
  l((e = e.apply(c, t)).next());
});
import { i as P, a as C, e as D, N as R, x as u, b as V, f as z, R as S, A as j, d as M, M as F, W as Q, r as q, h as H } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { r as s, n as g, c as E, U as b } from "./if-defined-SxgRDNx5.mjs";
import "./index-YhqbR5Wc.mjs";
import { M as L } from "./index-DGlllmwA.mjs";
import "./index-BqCCO7Yv.mjs";
import { S as n } from "./index-CYuCi4VR.mjs";
import "./index-B0Tzl2T9.mjs";
import "./index-tz0FA7gp.mjs";
import "./index-CXCuF3ao.mjs";
const G = {
  numericInputKeyDown(c, t, e) {
    const o = [
      "Backspace",
      "Meta",
      "Ctrl",
      "a",
      "A",
      "c",
      "C",
      "x",
      "X",
      "v",
      "V",
      "ArrowLeft",
      "ArrowRight",
      "Tab"
    ], a = c.metaKey || c.ctrlKey, i = c.key, r = i.toLocaleLowerCase(), l = r === "a", p = r === "c", w = r === "v", N = r === "x", U = i === ",", B = i === ".", W = i >= "0" && i <= "9";
    !a && (l || p || w || N) && c.preventDefault(), t === "0" && !U && !B && i === "0" && c.preventDefault(), t === "0" && W && (e(i), c.preventDefault()), (U || B) && (t || (e("0."), c.preventDefault()), (t != null && t.includes(".") || t != null && t.includes(",")) && c.preventDefault()), !W && !o.includes(i) && !B && !U && c.preventDefault();
  }
}, X = P`
  :host {
    width: 100%;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    cursor: pointer;
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-1xs);
    border-radius: calc(var(--wui-border-radius-5xs) + var(--wui-border-radius-4xs));
    background: var(--wui-color-gray-glass-002);
  }

  .details-row-title {
    white-space: nowrap;
  }

  .details-row.provider-free-row {
    padding-right: var(--wui-spacing-xs);
  }
`;
var v = function(c, t, e, o) {
  var a = arguments.length, i = a < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, e) : o, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(c, t, e, o);
  else for (var l = c.length - 1; l >= 0; l--) (r = c[l]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, e, i) : r(t, e)) || i);
  return a > 3 && i && Object.defineProperty(t, e, i), i;
};
const Y = V.CONVERT_SLIPPAGE_TOLERANCE;
let m = class extends C {
  constructor() {
    var t;
    super(), this.unsubscribe = [], this.networkName = (t = D.state.activeCaipNetwork) == null ? void 0 : t.name, this.detailsOpen = !1, this.sourceToken = n.state.sourceToken, this.toToken = n.state.toToken, this.toTokenAmount = n.state.toTokenAmount, this.sourceTokenPriceInUSD = n.state.sourceTokenPriceInUSD, this.toTokenPriceInUSD = n.state.toTokenPriceInUSD, this.priceImpact = n.state.priceImpact, this.maxSlippage = n.state.maxSlippage, this.networkTokenSymbol = n.state.networkTokenSymbol, this.inputError = n.state.inputError, this.unsubscribe.push(n.subscribe((e) => {
      this.sourceToken = e.sourceToken, this.toToken = e.toToken, this.toTokenAmount = e.toTokenAmount, this.priceImpact = e.priceImpact, this.maxSlippage = e.maxSlippage, this.sourceTokenPriceInUSD = e.sourceTokenPriceInUSD, this.toTokenPriceInUSD = e.toTokenPriceInUSD, this.inputError = e.inputError;
    }));
  }
  render() {
    const t = this.toTokenAmount && this.maxSlippage ? R.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString() : null;
    if (!this.sourceToken || !this.toToken || this.inputError)
      return null;
    const e = this.sourceTokenPriceInUSD && this.toTokenPriceInUSD ? 1 / this.toTokenPriceInUSD * this.sourceTokenPriceInUSD : 0;
    return u`
      <wui-flex flexDirection="column" alignItems="center" gap="1xs" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${["0", "xs", "0", "xs"]}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="xs">
                <wui-text variant="small-400" color="fg-100">
                  1 ${this.sourceToken.symbol} =
                  ${b.formatNumberToLocalString(e, 3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="small-400" color="fg-200">
                  $${b.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen ? u`
                <wui-flex flexDirection="column" gap="xs" class="details-content-container">
                  ${this.priceImpact ? u` <wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Price impact
                            </wui-text>
                            <w3m-tooltip-trigger
                              text="Price impact reflects the change in market price due to your trade"
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${b.formatNumberToLocalString(this.priceImpact, 3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>` : null}
                  ${this.maxSlippage && this.sourceToken.symbol ? u`<wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Max. slippage
                            </wui-text>
                            <w3m-tooltip-trigger
                              text=${`Max slippage sets the minimum amount you must receive for the transaction to proceed. ${t ? `Transaction will be reversed if you receive less than ${b.formatNumberToLocalString(t, 6)} ${this.toToken.symbol} due to price changes.` : ""}`}
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${b.formatNumberToLocalString(this.maxSlippage, 6)}
                              ${this.toToken.symbol} ${Y}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>` : null}
                  <wui-flex flexDirection="column" gap="xs">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row provider-free-row"
                    >
                      <wui-flex alignItems="center" gap="xs">
                        <wui-text class="details-row-title" variant="small-400" color="fg-150">
                          Provider fee
                        </wui-text>
                      </wui-flex>
                      <wui-flex>
                        <wui-text variant="small-400" color="fg-200">0.85%</wui-text>
                      </wui-flex>
                    </wui-flex>
                  </wui-flex>
                </wui-flex>
              ` : null}
        </wui-flex>
      </wui-flex>
    `;
  }
  toggleDetails() {
    this.detailsOpen = !this.detailsOpen;
  }
};
m.styles = [X];
v([
  s()
], m.prototype, "networkName", void 0);
v([
  g()
], m.prototype, "detailsOpen", void 0);
v([
  s()
], m.prototype, "sourceToken", void 0);
v([
  s()
], m.prototype, "toToken", void 0);
v([
  s()
], m.prototype, "toTokenAmount", void 0);
v([
  s()
], m.prototype, "sourceTokenPriceInUSD", void 0);
v([
  s()
], m.prototype, "toTokenPriceInUSD", void 0);
v([
  s()
], m.prototype, "priceImpact", void 0);
v([
  s()
], m.prototype, "maxSlippage", void 0);
v([
  s()
], m.prototype, "networkTokenSymbol", void 0);
v([
  s()
], m.prototype, "inputError", void 0);
m = v([
  E("w3m-swap-details")
], m);
const Z = P`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    position: relative;
  }

  wui-shimmer.market-value {
    opacity: 0;
  }

  :host > wui-flex > svg.input_mask {
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  :host wui-flex .input_mask__border,
  :host wui-flex .input_mask__background {
    transition: fill var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: fill;
  }

  :host wui-flex .input_mask__border {
    fill: var(--wui-color-gray-glass-020);
  }

  :host wui-flex .input_mask__background {
    fill: var(--wui-color-gray-glass-002);
  }
`;
var K = function(c, t, e, o) {
  var a = arguments.length, i = a < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, e) : o, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(c, t, e, o);
  else for (var l = c.length - 1; l >= 0; l--) (r = c[l]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, e, i) : r(t, e)) || i);
  return a > 3 && i && Object.defineProperty(t, e, i), i;
};
let O = class extends C {
  constructor() {
    super(...arguments), this.target = "sourceToken";
  }
  render() {
    return u`
      <wui-flex class justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
          gap="xxs"
        >
          <wui-shimmer width="80px" height="40px" borderRadius="xxs" variant="light"></wui-shimmer>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `;
  }
  templateTokenSelectButton() {
    return u`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-shimmer width="80px" height="40px" borderRadius="3xl" variant="light"></wui-shimmer>
      </wui-flex>
    `;
  }
};
O.styles = [Z];
K([
  g()
], O.prototype, "target", void 0);
O = K([
  E("w3m-swap-input-skeleton")
], O);
const J = P`
  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    position: relative;
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host wui-flex.focus {
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-005);
  }

  :host > wui-flex .swap-input,
  :host > wui-flex .swap-token-button {
    z-index: 10;
  }

  :host > wui-flex .swap-input {
    -webkit-mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
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

  :host > wui-flex .swap-input input {
    background: none;
    border: none;
    height: 42px;
    width: 100%;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -1.28px;
    outline: none;
    caret-color: var(--wui-color-accent-100);
    color: var(--wui-color-fg-100);
    padding: 0px;
  }

  :host > wui-flex .swap-input input:focus-visible {
    outline: none;
  }

  :host > wui-flex .swap-input input::-webkit-outer-spin-button,
  :host > wui-flex .swap-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .max-value-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--wui-color-gray-glass-020);
    padding-left: 0px;
  }

  .market-value {
    min-height: 18px;
  }
`;
var y = function(c, t, e, o) {
  var a = arguments.length, i = a < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, e) : o, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(c, t, e, o);
  else for (var l = c.length - 1; l >= 0; l--) (r = c[l]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, e, i) : r(t, e)) || i);
  return a > 3 && i && Object.defineProperty(t, e, i), i;
};
const tt = 5e-5;
let k = class extends C {
  constructor() {
    super(...arguments), this.focused = !1, this.price = 0, this.target = "sourceToken", this.onSetAmount = null, this.onSetMaxValue = null;
  }
  render() {
    const t = this.marketValue || "0", e = R.bigNumber(t).gt("0");
    return u`
      <wui-flex class="${this.focused ? "focus" : ""}" justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
        >
          <input
            data-testid="swap-input-${this.target}"
            @focusin=${() => this.onFocusChange(!0)}
            @focusout=${() => this.onFocusChange(!1)}
            ?disabled=${this.disabled}
            .value=${this.value}
            @input=${this.dispatchInputChangeEvent}
            @keydown=${this.handleKeydown}
            placeholder="0"
            type="text"
            inputmode="decimal"
          />
          <wui-text class="market-value" variant="small-400" color="fg-200">
            ${e ? `$${b.formatNumberToLocalString(this.marketValue, 2)}` : null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `;
  }
  handleKeydown(t) {
    return G.numericInputKeyDown(t, this.value, (e) => {
      var o;
      return (o = this.onSetAmount) == null ? void 0 : o.call(this, this.target, e);
    });
  }
  dispatchInputChangeEvent(t) {
    if (!this.onSetAmount)
      return;
    const e = t.target.value.replace(/[^0-9.]/gu, "");
    e === "," || e === "." ? this.onSetAmount(this.target, "0.") : e.endsWith(",") ? this.onSetAmount(this.target, e.replace(",", ".")) : this.onSetAmount(this.target, e);
  }
  setMaxValueToInput() {
    var t;
    (t = this.onSetMaxValue) == null || t.call(this, this.target, this.balance);
  }
  templateTokenSelectButton() {
    return this.token ? u`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-token-button
          data-testid="swap-input-token-${this.target}"
          text=${this.token.symbol}
          imageSrc=${this.token.logoUri}
          @click=${this.onSelectToken.bind(this)}
        >
        </wui-token-button>
        <wui-flex alignItems="center" gap="xxs"> ${this.tokenBalanceTemplate()} </wui-flex>
      </wui-flex>
    ` : u` <wui-button
        data-testid="swap-select-token-button-${this.target}"
        class="swap-token-button"
        size="md"
        variant="accent"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`;
  }
  tokenBalanceTemplate() {
    const t = R.multiply(this.balance, this.price), e = t ? t == null ? void 0 : t.gt(tt) : !1;
    return u`
      ${e ? u`<wui-text variant="small-400" color="fg-200">
            ${b.formatNumberToLocalString(this.balance, 2)}
          </wui-text>` : null}
      ${this.target === "sourceToken" ? this.tokenActionButtonTemplate(e) : null}
    `;
  }
  tokenActionButtonTemplate(t) {
    return t ? u` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-100" variant="small-600">Max</wui-text>
      </button>` : u` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-100" variant="small-600">Buy</wui-text>
    </button>`;
  }
  onFocusChange(t) {
    this.focused = t;
  }
  onSelectToken() {
    z.sendEvent({ type: "track", event: "CLICK_SELECT_TOKEN_TO_SWAP" }), S.push("SwapSelectToken", {
      target: this.target
    });
  }
  onBuyToken() {
    S.push("OnRampProviders");
  }
};
k.styles = [J];
y([
  g()
], k.prototype, "focused", void 0);
y([
  g()
], k.prototype, "balance", void 0);
y([
  g()
], k.prototype, "value", void 0);
y([
  g()
], k.prototype, "price", void 0);
y([
  g()
], k.prototype, "marketValue", void 0);
y([
  g()
], k.prototype, "disabled", void 0);
y([
  g()
], k.prototype, "target", void 0);
y([
  g()
], k.prototype, "token", void 0);
y([
  g()
], k.prototype, "onSetAmount", void 0);
y([
  g()
], k.prototype, "onSetMaxValue", void 0);
k = y([
  E("w3m-swap-input")
], k);
const et = P`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .action-button {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
  }

  .action-button:disabled {
    border-color: 1px solid var(--wui-color-gray-glass-005);
  }

  .swap-inputs-container {
    position: relative;
  }

  .replace-tokens-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: var(--wui-spacing-1xs);
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-modal-bg-base);
    padding: var(--wui-spacing-xxs);
  }

  .replace-tokens-button-container > button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    padding: var(--wui-spacing-xs);
    border: none;
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: background-color;
    z-index: 20;
  }

  .replace-tokens-button-container > button:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;
var f = function(c, t, e, o) {
  var a = arguments.length, i = a < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, e) : o, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(c, t, e, o);
  else for (var l = c.length - 1; l >= 0; l--) (r = c[l]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, e, i) : r(t, e)) || i);
  return a > 3 && i && Object.defineProperty(t, e, i), i;
};
let d = class extends C {
  constructor() {
    var t, e;
    super(), this.unsubscribe = [], this.initialParams = (t = S.state.data) == null ? void 0 : t.swap, this.detailsOpen = !1, this.caipAddress = j.state.caipAddress, this.caipNetworkId = (e = D.state.activeCaipNetwork) == null ? void 0 : e.caipNetworkId, this.initialized = n.state.initialized, this.loadingQuote = n.state.loadingQuote, this.loadingPrices = n.state.loadingPrices, this.loadingTransaction = n.state.loadingTransaction, this.sourceToken = n.state.sourceToken, this.sourceTokenAmount = n.state.sourceTokenAmount, this.sourceTokenPriceInUSD = n.state.sourceTokenPriceInUSD, this.toToken = n.state.toToken, this.toTokenAmount = n.state.toTokenAmount, this.toTokenPriceInUSD = n.state.toTokenPriceInUSD, this.inputError = n.state.inputError, this.fetchError = n.state.fetchError, this.onDebouncedGetSwapCalldata = M.debounce(() => _(this, null, function* () {
      yield n.swapTokens();
    }), 200), D.subscribeKey("activeCaipNetwork", (o) => this.onCaipNetworkChange({
      newCaipNetwork: o,
      resetSwapState: !0,
      initializeSwapState: !1
    })), j.subscribeKey("caipAddress", (o) => this.onCaipAddressChange({
      newCaipAddress: o,
      resetSwapState: !0,
      initializeSwapState: !1
    })), this.unsubscribe.push(D.subscribeKey("activeCaipNetwork", (o) => this.onCaipNetworkChange({
      newCaipNetwork: o,
      resetSwapState: !1,
      initializeSwapState: !0
    })), j.subscribeKey("caipAddress", (o) => this.onCaipAddressChange({
      newCaipAddress: o,
      resetSwapState: !1,
      initializeSwapState: !0
    })), F.subscribeKey("open", (o) => {
      o || n.resetState();
    }), S.subscribeKey("view", (o) => {
      o.includes("Swap") || n.resetValues();
    }), n.subscribe((o) => {
      this.initialized = o.initialized, this.loadingQuote = o.loadingQuote, this.loadingPrices = o.loadingPrices, this.loadingTransaction = o.loadingTransaction, this.sourceToken = o.sourceToken, this.sourceTokenAmount = o.sourceTokenAmount, this.sourceTokenPriceInUSD = o.sourceTokenPriceInUSD, this.toToken = o.toToken, this.toTokenAmount = o.toTokenAmount, this.toTokenPriceInUSD = o.toTokenPriceInUSD, this.inputError = o.inputError, this.fetchError = o.fetchError;
    }));
  }
  firstUpdated() {
    return _(this, null, function* () {
      n.initializeState(), this.watchTokensAndValues(), yield this.handleSwapParameters();
    });
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((t) => t == null ? void 0 : t()), clearInterval(this.interval);
  }
  render() {
    return u`
      <wui-flex flexDirection="column" .padding=${["0", "l", "l", "l"]} gap="s">
        ${this.initialized ? this.templateSwap() : this.templateLoading()}
      </wui-flex>
    `;
  }
  watchTokensAndValues() {
    this.interval = setInterval(() => {
      n.getNetworkTokenPrice(), n.getMyTokensWithBalance(), n.swapTokens();
    }, 1e4);
  }
  templateSwap() {
    return u`
      <wui-flex flexDirection="column" gap="s">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          ${this.templateTokenInput("sourceToken", this.sourceToken)}
          ${this.templateTokenInput("toToken", this.toToken)} ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateDetails()} ${this.templateActionButton()}
      </wui-flex>
    `;
  }
  actionButtonLabel() {
    return this.fetchError ? "Swap" : !this.sourceToken || !this.toToken ? "Select token" : this.sourceTokenAmount ? this.inputError ? this.inputError : "Review swap" : "Enter amount";
  }
  templateReplaceTokensButton() {
    return u`
      <wui-flex class="replace-tokens-button-container">
        <button @click=${this.onSwitchTokens.bind(this)}>
          <wui-icon name="recycleHorizontal" color="fg-250" size="lg"></wui-icon>
        </button>
      </wui-flex>
    `;
  }
  templateLoading() {
    return u`
      <wui-flex flexDirection="column" gap="l">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          <w3m-swap-input-skeleton target="sourceToken"></w3m-swap-input-skeleton>
          <w3m-swap-input-skeleton target="toToken"></w3m-swap-input-skeleton>
          ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateActionButton()}
      </wui-flex>
    `;
  }
  templateTokenInput(t, e) {
    var l, p;
    const o = (l = n.state.myTokensWithBalance) == null ? void 0 : l.find((w) => (w == null ? void 0 : w.address) === (e == null ? void 0 : e.address)), a = t === "toToken" ? this.toTokenAmount : this.sourceTokenAmount, i = t === "toToken" ? this.toTokenPriceInUSD : this.sourceTokenPriceInUSD, r = R.parseLocalStringToNumber(a) * i;
    return u`<w3m-swap-input
      .value=${t === "toToken" ? this.toTokenAmount : this.sourceTokenAmount}
      .disabled=${t === "toToken"}
      .onSetAmount=${this.handleChangeAmount.bind(this)}
      target=${t}
      .token=${e}
      .balance=${(p = o == null ? void 0 : o.quantity) == null ? void 0 : p.numeric}
      .price=${o == null ? void 0 : o.price}
      .marketValue=${r}
      .onSetMaxValue=${this.onSetMaxValue.bind(this)}
    ></w3m-swap-input>`;
  }
  onSetMaxValue(t, e) {
    const o = R.bigNumber(e || "0");
    this.handleChangeAmount(t, o.gt(0) ? o.toFixed(20) : "0");
  }
  templateDetails() {
    return !this.sourceToken || !this.toToken || this.inputError ? null : u`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`;
  }
  handleChangeAmount(t, e) {
    n.clearError(), t === "sourceToken" ? n.setSourceTokenAmount(e) : n.setToTokenAmount(e), this.onDebouncedGetSwapCalldata();
  }
  templateActionButton() {
    const t = !this.toToken || !this.sourceToken, e = !this.sourceTokenAmount, o = this.loadingQuote || this.loadingPrices || this.loadingTransaction, a = o || t || e || this.inputError;
    return u` <wui-flex gap="xs">
      <wui-button
        data-testid="swap-action-button"
        class="action-button"
        fullWidth
        size="lg"
        borderRadius="xs"
        variant=${t ? "neutral" : "main"}
        .loading=${o}
        .disabled=${a}
        @click=${this.onSwapPreview.bind(this)}
      >
        ${this.actionButtonLabel()}
      </wui-button>
    </wui-flex>`;
  }
  onSwitchTokens() {
    n.switchTokens();
  }
  onSwapPreview() {
    return _(this, null, function* () {
      var e, o, a;
      const t = D.state.activeChain;
      this.fetchError && (yield n.swapTokens()), z.sendEvent({
        type: "track",
        event: "INITIATE_SWAP",
        properties: {
          network: this.caipNetworkId || "",
          swapFromToken: ((e = this.sourceToken) == null ? void 0 : e.symbol) || "",
          swapToToken: ((o = this.toToken) == null ? void 0 : o.symbol) || "",
          swapFromAmount: this.sourceTokenAmount || "",
          swapToAmount: this.toTokenAmount || "",
          isSmartAccount: ((a = j.state.preferredAccountTypes) == null ? void 0 : a[t]) === Q.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      }), S.push("SwapPreview");
    });
  }
  handleSwapParameters() {
    return _(this, null, function* () {
      this.initialParams && (n.state.initialized || (yield new Promise((e) => {
        const o = n.subscribeKey("initialized", (a) => {
          a && (o == null || o(), e());
        });
      })), yield this.setSwapParameters(this.initialParams));
    });
  }
  setSwapParameters(a) {
    return _(this, arguments, function* ({ amount: t, fromToken: e, toToken: o }) {
      (!n.state.tokens || !n.state.myTokensWithBalance) && (yield new Promise((l) => {
        const p = n.subscribeKey("myTokensWithBalance", (w) => {
          w && w.length > 0 && (p == null || p(), l());
        });
        setTimeout(() => {
          p == null || p(), l();
        }, 5e3);
      }));
      const i = [
        ...n.state.tokens || [],
        ...n.state.myTokensWithBalance || []
      ];
      if (e) {
        const r = i.find((l) => l.symbol.toLowerCase() === e.toLowerCase());
        r && n.setSourceToken(r);
      }
      if (o) {
        const r = i.find((l) => l.symbol.toLowerCase() === o.toLowerCase());
        r && n.setToToken(r);
      }
      t && !isNaN(Number(t)) && n.setSourceTokenAmount(t);
    });
  }
  onCaipAddressChange({ newCaipAddress: t, resetSwapState: e, initializeSwapState: o }) {
    this.caipAddress !== t && (this.caipAddress = t, e && n.resetState(), o && n.initializeState());
  }
  onCaipNetworkChange({ newCaipNetwork: t, resetSwapState: e, initializeSwapState: o }) {
    this.caipNetworkId !== (t == null ? void 0 : t.caipNetworkId) && (this.caipNetworkId = t == null ? void 0 : t.caipNetworkId, e && n.resetState(), o && n.initializeState());
  }
};
d.styles = et;
f([
  g({ type: Object })
], d.prototype, "initialParams", void 0);
f([
  s()
], d.prototype, "interval", void 0);
f([
  s()
], d.prototype, "detailsOpen", void 0);
f([
  s()
], d.prototype, "caipAddress", void 0);
f([
  s()
], d.prototype, "caipNetworkId", void 0);
f([
  s()
], d.prototype, "initialized", void 0);
f([
  s()
], d.prototype, "loadingQuote", void 0);
f([
  s()
], d.prototype, "loadingPrices", void 0);
f([
  s()
], d.prototype, "loadingTransaction", void 0);
f([
  s()
], d.prototype, "sourceToken", void 0);
f([
  s()
], d.prototype, "sourceTokenAmount", void 0);
f([
  s()
], d.prototype, "sourceTokenPriceInUSD", void 0);
f([
  s()
], d.prototype, "toToken", void 0);
f([
  s()
], d.prototype, "toTokenAmount", void 0);
f([
  s()
], d.prototype, "toTokenPriceInUSD", void 0);
f([
  s()
], d.prototype, "inputError", void 0);
f([
  s()
], d.prototype, "fetchError", void 0);
d = f([
  E("w3m-swap-view")
], d);
const ot = P`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  .preview-container,
  .details-container {
    width: 100%;
  }

  .token-image {
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: 12px;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .token-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    height: 40px;
    border: none;
    border-radius: 80px;
    background: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    cursor: pointer;
    transition: background 0.2s linear;
  }

  .token-item:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .preview-token-details-container {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }

  .action-buttons-container {
    width: 100%;
    gap: var(--wui-spacing-xs);
  }

  .action-buttons-container > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    height: 48px;
    border-radius: var(--wui-border-radius-xs);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  .action-buttons-container > button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .action-button > wui-loading-spinner {
    display: inline-block;
  }

  .cancel-button:hover,
  .action-button:hover {
    cursor: pointer;
  }

  .action-buttons-container > wui-button.cancel-button {
    flex: 2;
  }

  .action-buttons-container > wui-button.action-button {
    flex: 4;
  }

  .action-buttons-container > button.action-button > wui-text {
    color: white;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;
var x = function(c, t, e, o) {
  var a = arguments.length, i = a < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, e) : o, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(c, t, e, o);
  else for (var l = c.length - 1; l >= 0; l--) (r = c[l]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, e, i) : r(t, e)) || i);
  return a > 3 && i && Object.defineProperty(t, e, i), i;
};
let h = class extends C {
  constructor() {
    var t, e;
    super(), this.unsubscribe = [], this.detailsOpen = !0, this.approvalTransaction = n.state.approvalTransaction, this.swapTransaction = n.state.swapTransaction, this.sourceToken = n.state.sourceToken, this.sourceTokenAmount = (t = n.state.sourceTokenAmount) != null ? t : "", this.sourceTokenPriceInUSD = n.state.sourceTokenPriceInUSD, this.toToken = n.state.toToken, this.toTokenAmount = (e = n.state.toTokenAmount) != null ? e : "", this.toTokenPriceInUSD = n.state.toTokenPriceInUSD, this.caipNetwork = D.state.activeCaipNetwork, this.balanceSymbol = j.state.balanceSymbol, this.inputError = n.state.inputError, this.loadingQuote = n.state.loadingQuote, this.loadingApprovalTransaction = n.state.loadingApprovalTransaction, this.loadingBuildTransaction = n.state.loadingBuildTransaction, this.loadingTransaction = n.state.loadingTransaction, this.unsubscribe.push(j.subscribeKey("balanceSymbol", (o) => {
      this.balanceSymbol !== o && S.goBack();
    }), D.subscribeKey("activeCaipNetwork", (o) => {
      this.caipNetwork !== o && (this.caipNetwork = o);
    }), n.subscribe((o) => {
      var a, i;
      this.approvalTransaction = o.approvalTransaction, this.swapTransaction = o.swapTransaction, this.sourceToken = o.sourceToken, this.toToken = o.toToken, this.toTokenPriceInUSD = o.toTokenPriceInUSD, this.sourceTokenAmount = (a = o.sourceTokenAmount) != null ? a : "", this.toTokenAmount = (i = o.toTokenAmount) != null ? i : "", this.inputError = o.inputError, o.inputError && S.goBack(), this.loadingQuote = o.loadingQuote, this.loadingApprovalTransaction = o.loadingApprovalTransaction, this.loadingBuildTransaction = o.loadingBuildTransaction, this.loadingTransaction = o.loadingTransaction;
    }));
  }
  firstUpdated() {
    n.getTransaction(), this.refreshTransaction();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((t) => t == null ? void 0 : t()), clearInterval(this.interval);
  }
  render() {
    return u`
      <wui-flex flexDirection="column" .padding=${["0", "l", "l", "l"]} gap="s">
        ${this.templateSwap()}
      </wui-flex>
    `;
  }
  refreshTransaction() {
    this.interval = setInterval(() => {
      n.getApprovalLoadingState() || n.getTransaction();
    }, 1e4);
  }
  templateSwap() {
    var p, w, N, U;
    const t = `${b.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${(p = this.sourceToken) == null ? void 0 : p.symbol}`, e = `${b.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${(w = this.toToken) == null ? void 0 : w.symbol}`, o = parseFloat(this.sourceTokenAmount) * this.sourceTokenPriceInUSD, a = parseFloat(this.toTokenAmount) * this.toTokenPriceInUSD, i = b.formatNumberToLocalString(o), r = b.formatNumberToLocalString(a), l = this.loadingQuote || this.loadingBuildTransaction || this.loadingTransaction || this.loadingApprovalTransaction;
    return u`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        <wui-flex class="preview-container" flexDirection="column" alignItems="flex-start" gap="l">
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Send</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${i}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${t}
              imageSrc=${(N = this.sourceToken) == null ? void 0 : N.logoUri}
            >
            </wui-token-button>
          </wui-flex>
          <wui-icon name="recycleHorizontal" color="fg-200" size="md"></wui-icon>
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Receive</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${r}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${e}
              imageSrc=${(U = this.toToken) == null ? void 0 : U.logoUri}
            >
            </wui-token-button>
          </wui-flex>
        </wui-flex>

        ${this.templateDetails()}

        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
          <wui-icon size="sm" color="fg-200" name="infoCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>

        <wui-flex
          class="action-buttons-container"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="xs"
        >
          <wui-button
            class="cancel-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="neutral"
            @click=${this.onCancelTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="fg-200">Cancel</wui-text>
          </wui-button>
          <wui-button
            class="action-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="main"
            ?loading=${l}
            ?disabled=${l}
            @click=${this.onSendTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="inverse-100">
              ${this.actionButtonLabel()}
            </wui-text>
          </wui-button>
        </wui-flex>
      </wui-flex>
    `;
  }
  templateDetails() {
    return !this.sourceToken || !this.toToken || this.inputError ? null : u`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`;
  }
  actionButtonLabel() {
    return this.loadingApprovalTransaction ? "Approving..." : this.approvalTransaction ? "Approve" : "Swap";
  }
  onCancelTransaction() {
    S.goBack();
  }
  onSendTransaction() {
    this.approvalTransaction ? n.sendTransactionForApproval(this.approvalTransaction) : n.sendTransactionForSwap(this.swapTransaction);
  }
};
h.styles = ot;
x([
  s()
], h.prototype, "interval", void 0);
x([
  s()
], h.prototype, "detailsOpen", void 0);
x([
  s()
], h.prototype, "approvalTransaction", void 0);
x([
  s()
], h.prototype, "swapTransaction", void 0);
x([
  s()
], h.prototype, "sourceToken", void 0);
x([
  s()
], h.prototype, "sourceTokenAmount", void 0);
x([
  s()
], h.prototype, "sourceTokenPriceInUSD", void 0);
x([
  s()
], h.prototype, "toToken", void 0);
x([
  s()
], h.prototype, "toTokenAmount", void 0);
x([
  s()
], h.prototype, "toTokenPriceInUSD", void 0);
x([
  s()
], h.prototype, "caipNetwork", void 0);
x([
  s()
], h.prototype, "balanceSymbol", void 0);
x([
  s()
], h.prototype, "inputError", void 0);
x([
  s()
], h.prototype, "loadingQuote", void 0);
x([
  s()
], h.prototype, "loadingApprovalTransaction", void 0);
x([
  s()
], h.prototype, "loadingBuildTransaction", void 0);
x([
  s()
], h.prototype, "loadingTransaction", void 0);
h = x([
  E("w3m-swap-preview-view")
], h);
const it = P`
  :host {
    height: 60px;
    min-height: 60px;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-l);
    width: 100%;
    background-color: transparent;
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-lg),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color, opacity;
  }

  @media (hover: hover) and (pointer: fine) {
    :host > wui-flex:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    :host > wui-flex:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  :host([disabled]) > wui-flex {
    opacity: 0.6;
  }

  :host([disabled]) > wui-flex:hover {
    background-color: transparent;
  }

  :host > wui-flex > wui-flex {
    flex: 1;
  }

  :host > wui-flex > wui-image,
  :host > wui-flex > .token-item-image-placeholder {
    width: 40px;
    max-width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    position: relative;
  }

  :host > wui-flex > .token-item-image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > wui-flex > wui-image::after,
  :host > wui-flex > .token-item-image-placeholder::after {
    position: absolute;
    content: '';
    inset: 0;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-l);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }
`;
var A = function(c, t, e, o) {
  var a = arguments.length, i = a < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, e) : o, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(c, t, e, o);
  else for (var l = c.length - 1; l >= 0; l--) (r = c[l]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, e, i) : r(t, e)) || i);
  return a > 3 && i && Object.defineProperty(t, e, i), i;
};
let $ = class extends C {
  constructor() {
    super(), this.observer = new IntersectionObserver(() => {
    }), this.imageSrc = void 0, this.name = void 0, this.symbol = void 0, this.price = void 0, this.amount = void 0, this.visible = !1, this.imageError = !1, this.observer = new IntersectionObserver((t) => {
      t.forEach((e) => {
        e.isIntersecting ? this.visible = !0 : this.visible = !1;
      });
    }, { threshold: 0.1 });
  }
  firstUpdated() {
    this.observer.observe(this);
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  render() {
    var e;
    if (!this.visible)
      return null;
    const t = this.amount && this.price ? (e = R.multiply(this.price, this.amount)) == null ? void 0 : e.toFixed(3) : null;
    return u`
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="3xs">
          <wui-flex justifyContent="space-between">
            <wui-text variant="paragraph-500" color="fg-100" lineClamp="1">${this.name}</wui-text>
            ${t ? u`
                  <wui-text variant="paragraph-500" color="fg-100">
                    $${b.formatNumberToLocalString(t, 3)}
                  </wui-text>
                ` : null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="small-400" color="fg-200" lineClamp="1">${this.symbol}</wui-text>
            ${this.amount ? u`<wui-text variant="small-400" color="fg-200">
                  ${b.formatNumberToLocalString(this.amount, 4)}
                </wui-text>` : null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
  }
  visualTemplate() {
    return this.imageError ? u`<wui-flex class="token-item-image-placeholder">
        <wui-icon name="image" color="inherit"></wui-icon>
      </wui-flex>` : this.imageSrc ? u`<wui-image
        width="40"
        height="40"
        src=${this.imageSrc}
        @onLoadError=${this.imageLoadError}
      ></wui-image>` : null;
  }
  imageLoadError() {
    this.imageError = !0;
  }
};
$.styles = [q, H, it];
A([
  g()
], $.prototype, "imageSrc", void 0);
A([
  g()
], $.prototype, "name", void 0);
A([
  g()
], $.prototype, "symbol", void 0);
A([
  g()
], $.prototype, "price", void 0);
A([
  g()
], $.prototype, "amount", void 0);
A([
  s()
], $.prototype, "visible", void 0);
A([
  s()
], $.prototype, "imageError", void 0);
$ = A([
  E("wui-token-list-item")
], $);
const nt = P`
  :host {
    --tokens-scroll--top-opacity: 0;
    --tokens-scroll--bottom-opacity: 1;
    --suggested-tokens-scroll--left-opacity: 0;
    --suggested-tokens-scroll--right-opacity: 1;
  }

  :host > wui-flex:first-child {
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-height: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .suggested-tokens-container {
    overflow-x: auto;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--suggested-tokens-scroll--right-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--right-opacity))) 100%
    );
  }

  .suggested-tokens-container::-webkit-scrollbar {
    display: none;
  }

  .tokens-container {
    border-top: 1px solid var(--wui-color-gray-glass-005);
    height: 100%;
    max-height: 390px;
  }

  .tokens {
    width: 100%;
    overflow-y: auto;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--tokens-scroll--top-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--tokens-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--bottom-opacity))) 100%
    );
  }

  .network-search-input,
  .select-network-button {
    height: 40px;
  }

  .select-network-button {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: transparent;
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-xs);
    align-items: center;
    transition: background-color 0.2s linear;
  }

  .select-network-button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  .select-network-button > wui-image {
    width: 26px;
    height: 26px;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;
var I = function(c, t, e, o) {
  var a = arguments.length, i = a < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, e) : o, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(c, t, e, o);
  else for (var l = c.length - 1; l >= 0; l--) (r = c[l]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, e, i) : r(t, e)) || i);
  return a > 3 && i && Object.defineProperty(t, e, i), i;
};
let T = class extends C {
  constructor() {
    var t;
    super(), this.unsubscribe = [], this.targetToken = (t = S.state.data) == null ? void 0 : t.target, this.sourceToken = n.state.sourceToken, this.sourceTokenAmount = n.state.sourceTokenAmount, this.toToken = n.state.toToken, this.myTokensWithBalance = n.state.myTokensWithBalance, this.popularTokens = n.state.popularTokens, this.searchValue = "", this.unsubscribe.push(n.subscribe((e) => {
      this.sourceToken = e.sourceToken, this.toToken = e.toToken, this.myTokensWithBalance = e.myTokensWithBalance;
    }));
  }
  updated() {
    var o, a;
    const t = (o = this.renderRoot) == null ? void 0 : o.querySelector(".suggested-tokens-container");
    t == null || t.addEventListener("scroll", this.handleSuggestedTokensScroll.bind(this));
    const e = (a = this.renderRoot) == null ? void 0 : a.querySelector(".tokens");
    e == null || e.addEventListener("scroll", this.handleTokenListScroll.bind(this));
  }
  disconnectedCallback() {
    var o, a;
    super.disconnectedCallback();
    const t = (o = this.renderRoot) == null ? void 0 : o.querySelector(".suggested-tokens-container"), e = (a = this.renderRoot) == null ? void 0 : a.querySelector(".tokens");
    t == null || t.removeEventListener("scroll", this.handleSuggestedTokensScroll.bind(this)), e == null || e.removeEventListener("scroll", this.handleTokenListScroll.bind(this)), clearInterval(this.interval);
  }
  render() {
    return u`
      <wui-flex flexDirection="column" gap="s">
        ${this.templateSearchInput()} ${this.templateSuggestedTokens()} ${this.templateTokens()}
      </wui-flex>
    `;
  }
  onSelectToken(t) {
    this.targetToken === "sourceToken" ? n.setSourceToken(t) : (n.setToToken(t), this.sourceToken && this.sourceTokenAmount && n.swapTokens()), S.goBack();
  }
  templateSearchInput() {
    return u`
      <wui-flex .padding=${["3xs", "s", "0", "s"]} gap="xs">
        <wui-input-text
          data-testid="swap-select-token-search-input"
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
          .value=${this.searchValue}
          @inputChange=${this.onSearchInputChange.bind(this)}
        ></wui-input-text>
      </wui-flex>
    `;
  }
  templateTokens() {
    const t = this.myTokensWithBalance ? Object.values(this.myTokensWithBalance) : [], e = this.popularTokens ? this.popularTokens : [], o = this.filterTokensWithText(t, this.searchValue), a = this.filterTokensWithText(e, this.searchValue);
    return u`
      <wui-flex class="tokens-container">
        <wui-flex class="tokens" .padding=${["0", "s", "s", "s"]} flexDirection="column">
          ${(o == null ? void 0 : o.length) > 0 ? u`
                <wui-flex justifyContent="flex-start" padding="s">
                  <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
                </wui-flex>
                ${o.map((i) => {
      var l, p, w;
      const r = i.symbol === ((l = this.sourceToken) == null ? void 0 : l.symbol) || i.symbol === ((p = this.toToken) == null ? void 0 : p.symbol);
      return u`
                    <wui-token-list-item
                      data-testid="swap-select-token-item-${i.symbol}"
                      name=${i.name}
                      ?disabled=${r}
                      symbol=${i.symbol}
                      price=${i == null ? void 0 : i.price}
                      amount=${(w = i == null ? void 0 : i.quantity) == null ? void 0 : w.numeric}
                      imageSrc=${i.logoUri}
                      @click=${() => {
        r || this.onSelectToken(i);
      }}
                    >
                    </wui-token-list-item>
                  `;
    })}
              ` : null}

          <wui-flex justifyContent="flex-start" padding="s">
            <wui-text variant="paragraph-500" color="fg-200">Tokens</wui-text>
          </wui-flex>
          ${(a == null ? void 0 : a.length) > 0 ? a.map((i) => u`
                  <wui-token-list-item
                    data-testid="swap-select-token-item-${i.symbol}"
                    name=${i.name}
                    symbol=${i.symbol}
                    imageSrc=${i.logoUri}
                    @click=${() => this.onSelectToken(i)}
                  >
                  </wui-token-list-item>
                `) : null}
        </wui-flex>
      </wui-flex>
    `;
  }
  templateSuggestedTokens() {
    const t = n.state.suggestedTokens ? n.state.suggestedTokens.slice(0, 8) : null;
    return t ? u`
      <wui-flex class="suggested-tokens-container" .padding=${["0", "s", "0", "s"]} gap="xs">
        ${t.map((e) => u`
            <wui-token-button
              text=${e.symbol}
              imageSrc=${e.logoUri}
              @click=${() => this.onSelectToken(e)}
            >
            </wui-token-button>
          `)}
      </wui-flex>
    ` : null;
  }
  onSearchInputChange(t) {
    this.searchValue = t.detail;
  }
  handleSuggestedTokensScroll() {
    var e;
    const t = (e = this.renderRoot) == null ? void 0 : e.querySelector(".suggested-tokens-container");
    t && (t.style.setProperty("--suggested-tokens-scroll--left-opacity", L.interpolate([0, 100], [0, 1], t.scrollLeft).toString()), t.style.setProperty("--suggested-tokens-scroll--right-opacity", L.interpolate([0, 100], [0, 1], t.scrollWidth - t.scrollLeft - t.offsetWidth).toString()));
  }
  handleTokenListScroll() {
    var e;
    const t = (e = this.renderRoot) == null ? void 0 : e.querySelector(".tokens");
    t && (t.style.setProperty("--tokens-scroll--top-opacity", L.interpolate([0, 100], [0, 1], t.scrollTop).toString()), t.style.setProperty("--tokens-scroll--bottom-opacity", L.interpolate([0, 100], [0, 1], t.scrollHeight - t.scrollTop - t.offsetHeight).toString()));
  }
  filterTokensWithText(t, e) {
    return t.filter((o) => `${o.symbol} ${o.name} ${o.address}`.toLowerCase().includes(e.toLowerCase()));
  }
};
T.styles = nt;
I([
  s()
], T.prototype, "interval", void 0);
I([
  s()
], T.prototype, "targetToken", void 0);
I([
  s()
], T.prototype, "sourceToken", void 0);
I([
  s()
], T.prototype, "sourceTokenAmount", void 0);
I([
  s()
], T.prototype, "toToken", void 0);
I([
  s()
], T.prototype, "myTokensWithBalance", void 0);
I([
  s()
], T.prototype, "popularTokens", void 0);
I([
  s()
], T.prototype, "searchValue", void 0);
T = I([
  E("w3m-swap-select-token-view")
], T);
export {
  h as W3mSwapPreviewView,
  T as W3mSwapSelectTokenView,
  d as W3mSwapView
};
