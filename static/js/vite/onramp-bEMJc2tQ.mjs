var ce = Object.defineProperty, le = Object.defineProperties;
var ue = Object.getOwnPropertyDescriptors;
var ee = Object.getOwnPropertySymbols;
var de = Object.prototype.hasOwnProperty, pe = Object.prototype.propertyIsEnumerable;
var te = (i, e, t) => e in i ? ce(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, E = (i, e) => {
  for (var t in e || (e = {}))
    de.call(e, t) && te(i, t, e[t]);
  if (ee)
    for (var t of ee(e))
      pe.call(e, t) && te(i, t, e[t]);
  return i;
}, re = (i, e) => le(i, ue(e));
var w = (i, e, t) => new Promise((s, n) => {
  var r = (f) => {
    try {
      a(t.next(f));
    } catch (j) {
      n(j);
    }
  }, o = (f) => {
    try {
      a(t.throw(f));
    } catch (j) {
      n(j);
    }
  }, a = (f) => f.done ? s(f.value) : Promise.resolve(f.value).then(r, o);
  a((t = t.apply(i, e)).next());
});
import { u as me, z as se, B as F, D as G, e as I, c as he, A as k, F as fe, w as we, y as ye, i as P, a as b, x as c, G as B, H as R, O as L, M as O, t as ge, f as ne, W as oe, R as z, d as Q, b as H, k as be, S as V, T as ve } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { n as p, c as v, o as h, r as d } from "./if-defined-SxgRDNx5.mjs";
import { D as xe, T as Ce } from "./index-CQzlxvtf.mjs";
import "./index-CpsJxmOq.mjs";
import "./index-CXCuF3ao.mjs";
import "./index-BQckQaxg.mjs";
import "./index-Coyh_R-g.mjs";
import { O as q } from "./index-DAeyYgMk.mjs";
import "./index-BX_NgGJd.mjs";
import "./index-CCX1TeUz.mjs";
import "./index-YhqbR5Wc.mjs";
import "./index-98vrGaaA.mjs";
import "./index-tz0FA7gp.mjs";
const W = {
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
}, X = {
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
}, Te = {
  providers: se,
  selectedProvider: null,
  error: null,
  purchaseCurrency: W,
  paymentCurrency: X,
  purchaseCurrencies: [W],
  paymentCurrencies: [],
  quotesLoading: !1
}, l = me(Te), u = {
  state: l,
  subscribe(i) {
    return ye(l, () => i(l));
  },
  subscribeKey(i, e) {
    return we(l, i, e);
  },
  setSelectedProvider(i) {
    var e;
    if (i && i.name === "meld") {
      const t = I.state.activeChain === he.CHAIN.SOLANA ? "SOL" : "USDC", s = (e = k.state.address) != null ? e : "", n = new URL(i.url);
      n.searchParams.append("publicKey", fe), n.searchParams.append("destinationCurrencyCode", t), n.searchParams.append("walletAddress", s), i.url = n.toString();
    }
    l.selectedProvider = i;
  },
  setPurchaseCurrency(i) {
    l.purchaseCurrency = i;
  },
  setPaymentCurrency(i) {
    l.paymentCurrency = i;
  },
  setPurchaseAmount(i) {
    this.state.purchaseAmount = i;
  },
  setPaymentAmount(i) {
    this.state.paymentAmount = i;
  },
  getAvailableCurrencies() {
    return w(this, null, function* () {
      const i = yield F.getOnrampOptions();
      l.purchaseCurrencies = i.purchaseCurrencies, l.paymentCurrencies = i.paymentCurrencies, l.paymentCurrency = i.paymentCurrencies[0] || X, l.purchaseCurrency = i.purchaseCurrencies[0] || W, yield G.fetchCurrencyImages(i.paymentCurrencies.map((e) => e.id)), yield G.fetchTokenImages(i.purchaseCurrencies.map((e) => e.symbol));
    });
  },
  getQuote() {
    return w(this, null, function* () {
      var i, e;
      l.quotesLoading = !0;
      try {
        const t = yield F.getOnrampQuote({
          purchaseCurrency: l.purchaseCurrency,
          paymentCurrency: l.paymentCurrency,
          amount: ((i = l.paymentAmount) == null ? void 0 : i.toString()) || "0",
          network: (e = l.purchaseCurrency) == null ? void 0 : e.symbol
        });
        return l.quotesLoading = !1, l.purchaseAmount = Number(t == null ? void 0 : t.purchaseAmount.amount), t;
      } catch (t) {
        return l.error = t.message, l.quotesLoading = !1, null;
      } finally {
        l.quotesLoading = !1;
      }
    });
  },
  resetState() {
    l.providers = se, l.selectedProvider = null, l.error = null, l.purchaseCurrency = W, l.paymentCurrency = X, l.purchaseCurrencies = [W], l.paymentCurrencies = [], l.paymentAmount = void 0, l.purchaseAmount = void 0, l.quotesLoading = !1;
  }
}, Re = P`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xs);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--wui-spacing-s);
  }

  :host > wui-flex:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  .purchase-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: var(--wui-icon-box-size-lg);
    height: var(--wui-icon-box-size-lg);
  }

  .purchase-image-container wui-image {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: calc(var(--wui-icon-box-size-lg) / 2);
  }

  .purchase-image-container wui-image::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-icon-box-size-lg) / 2);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  .purchase-image-container wui-icon-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
  }
`;
var g = function(i, e, t, s) {
  var n = arguments.length, r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var a = i.length - 1; a >= 0; a--) (o = i[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, t, r) : o(e, t)) || r);
  return n > 3 && r && Object.defineProperty(e, t, r), r;
};
let m = class extends b {
  constructor() {
    super(...arguments), this.disabled = !1, this.color = "inherit", this.label = "Bought", this.purchaseValue = "", this.purchaseCurrency = "", this.date = "", this.completed = !1, this.inProgress = !1, this.failed = !1, this.onClick = null, this.symbol = "";
  }
  firstUpdated() {
    this.icon || this.fetchTokenImage();
  }
  render() {
    return c`
      <wui-flex>
        ${this.imageTemplate()}
        <wui-flex flexDirection="column" gap="4xs" flexGrow="1">
          <wui-flex gap="xxs" alignItems="center" justifyContent="flex-start">
            ${this.statusIconTemplate()}
            <wui-text variant="paragraph-500" color="fg-100"> ${this.label}</wui-text>
          </wui-flex>
          <wui-text variant="small-400" color="fg-200">
            + ${this.purchaseValue} ${this.purchaseCurrency}
          </wui-text>
        </wui-flex>
        ${this.inProgress ? c`<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>` : c`<wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>`}
      </wui-flex>
    `;
  }
  fetchTokenImage() {
    return w(this, null, function* () {
      yield G._fetchTokenImage(this.purchaseCurrency);
    });
  }
  statusIconTemplate() {
    return this.inProgress ? null : this.completed ? this.boughtIconTemplate() : this.errorIconTemplate();
  }
  errorIconTemplate() {
    return c`<wui-icon-box
      size="xxs"
      iconColor="error-100"
      backgroundColor="error-100"
      background="opaque"
      icon="close"
      borderColor="wui-color-bg-125"
    ></wui-icon-box>`;
  }
  imageTemplate() {
    const e = this.icon || `https://avatar.vercel.sh/andrew.svg?size=50&text=${this.symbol}`;
    return c`<wui-flex class="purchase-image-container">
      <wui-image src=${e}></wui-image>
    </wui-flex>`;
  }
  boughtIconTemplate() {
    return c`<wui-icon-box
      size="xxs"
      iconColor="success-100"
      backgroundColor="success-100"
      background="opaque"
      icon="arrowBottom"
      borderColor="wui-color-bg-125"
    ></wui-icon-box>`;
  }
};
m.styles = [Re];
g([
  p({ type: Boolean })
], m.prototype, "disabled", void 0);
g([
  p()
], m.prototype, "color", void 0);
g([
  p()
], m.prototype, "label", void 0);
g([
  p()
], m.prototype, "purchaseValue", void 0);
g([
  p()
], m.prototype, "purchaseCurrency", void 0);
g([
  p()
], m.prototype, "date", void 0);
g([
  p({ type: Boolean })
], m.prototype, "completed", void 0);
g([
  p({ type: Boolean })
], m.prototype, "inProgress", void 0);
g([
  p({ type: Boolean })
], m.prototype, "failed", void 0);
g([
  p()
], m.prototype, "onClick", void 0);
g([
  p()
], m.prototype, "symbol", void 0);
g([
  p()
], m.prototype, "icon", void 0);
m = g([
  v("w3m-onramp-activity-item")
], m);
const Ae = P`
  :host > wui-flex {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    padding: var(--wui-spacing-m);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }

  :host > wui-flex > wui-flex {
    width: 100%;
  }

  wui-transaction-list-item-loader {
    width: 100%;
  }
`;
var M = function(i, e, t, s) {
  var n = arguments.length, r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var a = i.length - 1; a >= 0; a--) (o = i[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, t, r) : o(e, t)) || r);
  return n > 3 && r && Object.defineProperty(e, t, r), r;
};
const Pe = 7;
let S = class extends b {
  constructor() {
    super(), this.unsubscribe = [], this.selectedOnRampProvider = u.state.selectedProvider, this.loading = !1, this.coinbaseTransactions = B.state.coinbaseTransactions, this.tokenImages = R.state.tokenImages, this.unsubscribe.push(u.subscribeKey("selectedProvider", (e) => {
      this.selectedOnRampProvider = e;
    }), R.subscribeKey("tokenImages", (e) => this.tokenImages = e), () => {
      clearTimeout(this.refetchTimeout);
    }, B.subscribe((e) => {
      this.coinbaseTransactions = E({}, e.coinbaseTransactions);
    })), B.clearCursor(), this.fetchTransactions();
  }
  render() {
    return c`
      <wui-flex flexDirection="column" .padding=${["0", "s", "s", "s"]} gap="xs">
        ${this.loading ? this.templateLoading() : this.templateTransactionsByYear()}
      </wui-flex>
    `;
  }
  templateTransactions(e) {
    return e == null ? void 0 : e.map((t) => {
      var a, f, j;
      const s = xe.formatDate((a = t == null ? void 0 : t.metadata) == null ? void 0 : a.minedAt), n = t.transfers[0], r = n == null ? void 0 : n.fungible_info;
      if (!r)
        return null;
      const o = ((f = r == null ? void 0 : r.icon) == null ? void 0 : f.url) || ((j = this.tokenImages) == null ? void 0 : j[r.symbol || ""]);
      return c`
        <w3m-onramp-activity-item
          label="Bought"
          .completed=${t.metadata.status === "ONRAMP_TRANSACTION_STATUS_SUCCESS"}
          .inProgress=${t.metadata.status === "ONRAMP_TRANSACTION_STATUS_IN_PROGRESS"}
          .failed=${t.metadata.status === "ONRAMP_TRANSACTION_STATUS_FAILED"}
          purchaseCurrency=${h(r.symbol)}
          purchaseValue=${n.quantity.numeric}
          date=${s}
          icon=${h(o)}
          symbol=${h(r.symbol)}
        ></w3m-onramp-activity-item>
      `;
    });
  }
  templateTransactionsByYear() {
    return Object.keys(this.coinbaseTransactions).sort().reverse().map((t) => {
      const s = parseInt(t, 10);
      return new Array(12).fill(null).map((r, o) => o).reverse().map((r) => {
        var f;
        const o = Ce.getTransactionGroupTitle(s, r), a = (f = this.coinbaseTransactions[s]) == null ? void 0 : f[r];
        return a ? c`
          <wui-flex flexDirection="column">
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${["xs", "s", "s", "s"]}
            >
              <wui-text variant="paragraph-500" color="fg-200">${o}</wui-text>
            </wui-flex>
            <wui-flex flexDirection="column" gap="xs">
              ${this.templateTransactions(a)}
            </wui-flex>
          </wui-flex>
        ` : null;
      });
    });
  }
  fetchTransactions() {
    return w(this, null, function* () {
      yield this.fetchCoinbaseTransactions();
    });
  }
  fetchCoinbaseTransactions() {
    return w(this, null, function* () {
      const e = k.state.address, t = L.state.projectId;
      if (!e)
        throw new Error("No address found");
      if (!t)
        throw new Error("No projectId found");
      this.loading = !0, yield B.fetchTransactions(e, "coinbase"), this.loading = !1, this.refetchLoadingTransactions();
    });
  }
  refetchLoadingTransactions() {
    var n;
    const e = /* @__PURE__ */ new Date();
    if ((((n = this.coinbaseTransactions[e.getFullYear()]) == null ? void 0 : n[e.getMonth()]) || []).filter((r) => r.metadata.status === "ONRAMP_TRANSACTION_STATUS_IN_PROGRESS").length === 0) {
      clearTimeout(this.refetchTimeout);
      return;
    }
    this.refetchTimeout = setTimeout(() => w(this, null, function* () {
      const r = k.state.address;
      yield B.fetchTransactions(r, "coinbase"), this.refetchLoadingTransactions();
    }), 3e3);
  }
  templateLoading() {
    return Array(Pe).fill(c` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map((e) => e);
  }
};
S.styles = Ae;
M([
  d()
], S.prototype, "selectedOnRampProvider", void 0);
M([
  d()
], S.prototype, "loading", void 0);
M([
  d()
], S.prototype, "coinbaseTransactions", void 0);
M([
  d()
], S.prototype, "tokenImages", void 0);
S = M([
  v("w3m-onramp-activity-view")
], S);
const Ie = P`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;
var K = function(i, e, t, s) {
  var n = arguments.length, r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var a = i.length - 1; a >= 0; a--) (o = i[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, t, r) : o(e, t)) || r);
  return n > 3 && r && Object.defineProperty(e, t, r), r;
};
let D = class extends b {
  constructor() {
    super(), this.unsubscribe = [], this.selectedCurrency = u.state.paymentCurrency, this.currencies = u.state.paymentCurrencies, this.currencyImages = R.state.currencyImages, this.checked = q.state.isLegalCheckboxChecked, this.unsubscribe.push(u.subscribe((e) => {
      this.selectedCurrency = e.paymentCurrency, this.currencies = e.paymentCurrencies;
    }), R.subscribeKey("currencyImages", (e) => this.currencyImages = e), q.subscribeKey("isLegalCheckboxChecked", (e) => {
      this.checked = e;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    var a;
    const { termsConditionsUrl: e, privacyPolicyUrl: t } = L.state, s = (a = L.state.features) == null ? void 0 : a.legalCheckbox, o = !!(e || t) && !!s && !this.checked;
    return c`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0", "s", "s", "s"]}
        gap="xs"
        class=${h(o ? "disabled" : void 0)}
      >
        ${this.currenciesTemplate(o)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
  }
  currenciesTemplate(e = !1) {
    return this.currencies.map((t) => {
      var s;
      return c`
        <wui-list-item
          imageSrc=${h((s = this.currencyImages) == null ? void 0 : s[t.id])}
          @click=${() => this.selectCurrency(t)}
          variant="image"
          tabIdx=${h(e ? -1 : void 0)}
        >
          <wui-text variant="paragraph-500" color="fg-100">${t.id}</wui-text>
        </wui-list-item>
      `;
    });
  }
  selectCurrency(e) {
    e && (u.setPaymentCurrency(e), O.close());
  }
};
D.styles = Ie;
K([
  d()
], D.prototype, "selectedCurrency", void 0);
K([
  d()
], D.prototype, "currencies", void 0);
K([
  d()
], D.prototype, "currencyImages", void 0);
K([
  d()
], D.prototype, "checked", void 0);
D = K([
  v("w3m-onramp-fiat-select-view")
], D);
const _e = P`
  button {
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xs);
    border: none;
    outline: none;
    background-color: var(--wui-color-gray-glass-002);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--wui-spacing-s);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .provider-image {
    width: var(--wui-spacing-3xl);
    min-width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    position: relative;
    overflow: hidden;
  }

  .provider-image::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  .network-icon {
    width: var(--wui-spacing-m);
    height: var(--wui-spacing-m);
    border-radius: calc(var(--wui-spacing-m) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: box-shadow;
  }

  button:hover .network-icon {
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-005),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`;
var _ = function(i, e, t, s) {
  var n = arguments.length, r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var a = i.length - 1; a >= 0; a--) (o = i[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, t, r) : o(e, t)) || r);
  return n > 3 && r && Object.defineProperty(e, t, r), r;
};
let C = class extends b {
  constructor() {
    super(...arguments), this.disabled = !1, this.color = "inherit", this.label = "", this.feeRange = "", this.loading = !1, this.onClick = null;
  }
  render() {
    return c`
      <button ?disabled=${this.disabled} @click=${this.onClick} ontouchstart>
        <wui-visual name=${h(this.name)} class="provider-image"></wui-visual>
        <wui-flex flexDirection="column" gap="4xs">
          <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="l">
            <wui-text variant="tiny-500" color="fg-100">
              <wui-text variant="tiny-400" color="fg-200">Fees</wui-text>
              ${this.feeRange}
            </wui-text>
            <wui-flex gap="xxs">
              <wui-icon name="bank" size="xs" color="fg-150"></wui-icon>
              <wui-icon name="card" size="xs" color="fg-150"></wui-icon>
            </wui-flex>
            ${this.networksTemplate()}
          </wui-flex>
        </wui-flex>
        ${this.loading ? c`<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>` : c`<wui-icon name="chevronRight" color="fg-200" size="sm"></wui-icon>`}
      </button>
    `;
  }
  networksTemplate() {
    var s;
    const e = I.getAllRequestedCaipNetworks(), t = (s = e == null ? void 0 : e.filter((n) => {
      var r;
      return (r = n == null ? void 0 : n.assets) == null ? void 0 : r.imageId;
    })) == null ? void 0 : s.slice(0, 5);
    return c`
      <wui-flex class="networks">
        ${t == null ? void 0 : t.map((n) => c`
            <wui-flex class="network-icon">
              <wui-image src=${h(ge.getNetworkImage(n))}></wui-image>
            </wui-flex>
          `)}
      </wui-flex>
    `;
  }
};
C.styles = [_e];
_([
  p({ type: Boolean })
], C.prototype, "disabled", void 0);
_([
  p()
], C.prototype, "color", void 0);
_([
  p()
], C.prototype, "name", void 0);
_([
  p()
], C.prototype, "label", void 0);
_([
  p()
], C.prototype, "feeRange", void 0);
_([
  p({ type: Boolean })
], C.prototype, "loading", void 0);
_([
  p()
], C.prototype, "onClick", void 0);
C = _([
  v("w3m-onramp-provider-item")
], C);
const $e = P`
  wui-flex {
    border-top: 1px solid var(--wui-color-gray-glass-005);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);
  }
`;
var Oe = function(i, e, t, s) {
  var n = arguments.length, r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var a = i.length - 1; a >= 0; a--) (o = i[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, t, r) : o(e, t)) || r);
  return n > 3 && r && Object.defineProperty(e, t, r), r;
};
let J = class extends b {
  render() {
    const { termsConditionsUrl: e, privacyPolicyUrl: t } = L.state;
    return !e && !t ? null : c`
      <wui-flex
        .padding=${["m", "s", "s", "s"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="s"
      >
        <wui-text color="fg-250" variant="small-400" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `;
  }
  howDoesItWorkTemplate() {
    return c` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`;
  }
  onWhatIsBuy() {
    var t;
    const e = I.state.activeChain;
    ne.sendEvent({
      type: "track",
      event: "SELECT_WHAT_IS_A_BUY",
      properties: {
        isSmartAccount: ((t = k.state.preferredAccountTypes) == null ? void 0 : t[e]) === oe.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    }), z.push("WhatIsABuy");
  }
};
J.styles = [$e];
J = Oe([
  v("w3m-onramp-providers-footer")
], J);
var ae = function(i, e, t, s) {
  var n = arguments.length, r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var a = i.length - 1; a >= 0; a--) (o = i[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, t, r) : o(e, t)) || r);
  return n > 3 && r && Object.defineProperty(e, t, r), r;
};
let Z = class extends b {
  constructor() {
    super(), this.unsubscribe = [], this.providers = u.state.providers, this.unsubscribe.push(u.subscribeKey("providers", (e) => {
      this.providers = e;
    }));
  }
  firstUpdated() {
    const e = this.providers.map((t) => w(this, null, function* () {
      return t.name === "coinbase" ? yield this.getCoinbaseOnRampURL() : Promise.resolve(t == null ? void 0 : t.url);
    }));
    Promise.all(e).then((t) => {
      this.providers = this.providers.map((s, n) => re(E({}, s), {
        url: t[n] || ""
      }));
    });
  }
  render() {
    return c`
      <wui-flex flexDirection="column" .padding=${["0", "s", "s", "s"]} gap="xs">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
      <w3m-onramp-providers-footer></w3m-onramp-providers-footer>
    `;
  }
  onRampProvidersTemplate() {
    return this.providers.filter((e) => {
      var t;
      return e.supportedChains.includes((t = I.state.activeChain) != null ? t : "eip155");
    }).map((e) => c`
          <w3m-onramp-provider-item
            label=${e.label}
            name=${e.name}
            feeRange=${e.feeRange}
            @click=${() => {
      this.onClickProvider(e);
    }}
            ?disabled=${!e.url}
          ></w3m-onramp-provider-item>
        `);
  }
  onClickProvider(e) {
    var s;
    const t = I.state.activeChain;
    u.setSelectedProvider(e), z.push("BuyInProgress"), Q.openHref(e.url, "popupWindow", "width=600,height=800,scrollbars=yes"), ne.sendEvent({
      type: "track",
      event: "SELECT_BUY_PROVIDER",
      properties: {
        provider: e.name,
        isSmartAccount: ((s = k.state.preferredAccountTypes) == null ? void 0 : s[t]) === oe.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
  }
  getCoinbaseOnRampURL() {
    return w(this, null, function* () {
      var o;
      const e = k.state.address, t = I.state.activeCaipNetwork;
      if (!e)
        throw new Error("No address found");
      if (!(t != null && t.name))
        throw new Error("No network found");
      const s = (o = H.WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP[t.name]) != null ? o : H.WC_COINBASE_PAY_SDK_FALLBACK_CHAIN, n = u.state.purchaseCurrency, r = n ? [n.symbol] : u.state.purchaseCurrencies.map((a) => a.symbol);
      return yield F.generateOnRampURL({
        defaultNetwork: s,
        destinationWallets: [
          { address: e, blockchains: H.WC_COINBASE_PAY_SDK_CHAINS, assets: r }
        ],
        partnerUserId: e,
        purchaseAmount: u.state.purchaseAmount
      });
    });
  }
};
ae([
  d()
], Z.prototype, "providers", void 0);
Z = ae([
  v("w3m-onramp-providers-view")
], Z);
const ke = P`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;
var Y = function(i, e, t, s) {
  var n = arguments.length, r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var a = i.length - 1; a >= 0; a--) (o = i[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, t, r) : o(e, t)) || r);
  return n > 3 && r && Object.defineProperty(e, t, r), r;
};
let U = class extends b {
  constructor() {
    super(), this.unsubscribe = [], this.selectedCurrency = u.state.purchaseCurrencies, this.tokens = u.state.purchaseCurrencies, this.tokenImages = R.state.tokenImages, this.checked = q.state.isLegalCheckboxChecked, this.unsubscribe.push(u.subscribe((e) => {
      this.selectedCurrency = e.purchaseCurrencies, this.tokens = e.purchaseCurrencies;
    }), R.subscribeKey("tokenImages", (e) => this.tokenImages = e), q.subscribeKey("isLegalCheckboxChecked", (e) => {
      this.checked = e;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    var a;
    const { termsConditionsUrl: e, privacyPolicyUrl: t } = L.state, s = (a = L.state.features) == null ? void 0 : a.legalCheckbox, o = !!(e || t) && !!s && !this.checked;
    return c`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0", "s", "s", "s"]}
        gap="xs"
        class=${h(o ? "disabled" : void 0)}
      >
        ${this.currenciesTemplate(o)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
  }
  currenciesTemplate(e = !1) {
    return this.tokens.map((t) => {
      var s;
      return c`
        <wui-list-item
          imageSrc=${h((s = this.tokenImages) == null ? void 0 : s[t.symbol])}
          @click=${() => this.selectToken(t)}
          variant="image"
          tabIdx=${h(e ? -1 : void 0)}
        >
          <wui-flex gap="3xs" alignItems="center">
            <wui-text variant="paragraph-500" color="fg-100">${t.name}</wui-text>
            <wui-text variant="small-400" color="fg-200">${t.symbol}</wui-text>
          </wui-flex>
        </wui-list-item>
      `;
    });
  }
  selectToken(e) {
    e && (u.setPurchaseCurrency(e), O.close());
  }
};
U.styles = ke;
Y([
  d()
], U.prototype, "selectedCurrency", void 0);
Y([
  d()
], U.prototype, "tokens", void 0);
Y([
  d()
], U.prototype, "tokenImages", void 0);
Y([
  d()
], U.prototype, "checked", void 0);
U = Y([
  v("w3m-onramp-token-select-view")
], U);
const Se = P`
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

  wui-visual {
    width: var(--wui-wallet-image-size-lg);
    height: var(--wui-wallet-image-size-lg);
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wui-ease-out-power-2) var(--wui-duration-lg),
      transform var(--wui-ease-out-power-2) var(--wui-duration-lg);
    will-change: opacity, transform;
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

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
  }
`;
var x = function(i, e, t, s) {
  var n = arguments.length, r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var a = i.length - 1; a >= 0; a--) (o = i[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, t, r) : o(e, t)) || r);
  return n > 3 && r && Object.defineProperty(e, t, r), r;
};
let y = class extends b {
  constructor() {
    super(), this.unsubscribe = [], this.selectedOnRampProvider = u.state.selectedProvider, this.uri = be.state.wcUri, this.ready = !1, this.showRetry = !1, this.buffering = !1, this.error = !1, this.startTime = null, this.isMobile = !1, this.onRetry = void 0, this.unsubscribe.push(u.subscribeKey("selectedProvider", (e) => {
      this.selectedOnRampProvider = e;
    })), this.watchTransactions();
  }
  disconnectedCallback() {
    this.intervalId && clearInterval(this.intervalId);
  }
  render() {
    var s, n;
    let e = "Continue in external window";
    this.error ? e = "Buy failed" : this.selectedOnRampProvider && (e = `Buy in ${(s = this.selectedOnRampProvider) == null ? void 0 : s.label}`);
    const t = this.error ? "Buy can be declined from your side or due to and error on the provider app" : "We’ll notify you once your Buy is processed";
    return c`
      <wui-flex
        data-error=${h(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl", "xl", "xl", "xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-visual
            name=${h((n = this.selectedOnRampProvider) == null ? void 0 : n.name)}
            size="lg"
            class="provider-image"
          >
          </wui-visual>

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
          <wui-text variant="paragraph-500" color=${this.error ? "error-100" : "fg-100"}>
            ${e}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        ${this.error ? this.tryAgainTemplate() : null}
      </wui-flex>

      <wui-flex .padding=${["0", "xl", "xl", "xl"]} justifyContent="center">
        <wui-link @click=${this.onCopyUri} color="fg-200">
          <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
          Copy link
        </wui-link>
      </wui-flex>
    `;
  }
  watchTransactions() {
    if (this.selectedOnRampProvider)
      switch (this.selectedOnRampProvider.name) {
        case "coinbase":
          this.startTime = Date.now(), this.initializeCoinbaseTransactions();
          break;
      }
  }
  initializeCoinbaseTransactions() {
    return w(this, null, function* () {
      yield this.watchCoinbaseTransactions(), this.intervalId = setInterval(() => this.watchCoinbaseTransactions(), 4e3);
    });
  }
  watchCoinbaseTransactions() {
    return w(this, null, function* () {
      try {
        const e = k.state.address;
        if (!e)
          throw new Error("No address found");
        (yield F.fetchTransactions({
          account: e,
          onramp: "coinbase"
        })).data.filter((n) => new Date(n.metadata.minedAt) > new Date(this.startTime) || n.metadata.status === "ONRAMP_TRANSACTION_STATUS_IN_PROGRESS").length ? (clearInterval(this.intervalId), z.replace("OnRampActivity")) : this.startTime && Date.now() - this.startTime >= 18e4 && (clearInterval(this.intervalId), this.error = !0);
      } catch (e) {
        V.showError(e);
      }
    });
  }
  onTryAgain() {
    this.selectedOnRampProvider && (this.error = !1, Q.openHref(this.selectedOnRampProvider.url, "popupWindow", "width=600,height=800,scrollbars=yes"));
  }
  tryAgainTemplate() {
    var e;
    return (e = this.selectedOnRampProvider) != null && e.url ? c`<wui-button size="md" variant="accent" @click=${this.onTryAgain.bind(this)}>
      <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
      Try again
    </wui-button>` : null;
  }
  loaderTemplate() {
    const e = ve.state.themeVariables["--w3m-border-radius-master"], t = e ? parseInt(e.replace("px", ""), 10) : 4;
    return c`<wui-loading-thumbnail radius=${t * 9}></wui-loading-thumbnail>`;
  }
  onCopyUri() {
    var e;
    if (!((e = this.selectedOnRampProvider) != null && e.url)) {
      V.showError("No link found"), z.goBack();
      return;
    }
    try {
      Q.copyToClopboard(this.selectedOnRampProvider.url), V.showSuccess("Link copied");
    } catch (t) {
      V.showError("Failed to copy");
    }
  }
};
y.styles = Se;
x([
  d()
], y.prototype, "intervalId", void 0);
x([
  d()
], y.prototype, "selectedOnRampProvider", void 0);
x([
  d()
], y.prototype, "uri", void 0);
x([
  d()
], y.prototype, "ready", void 0);
x([
  d()
], y.prototype, "showRetry", void 0);
x([
  d()
], y.prototype, "buffering", void 0);
x([
  d()
], y.prototype, "error", void 0);
x([
  d()
], y.prototype, "startTime", void 0);
x([
  p({ type: Boolean })
], y.prototype, "isMobile", void 0);
x([
  p()
], y.prototype, "onRetry", void 0);
y = x([
  v("w3m-buy-in-progress-view")
], y);
var De = function(i, e, t, s) {
  var n = arguments.length, r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var a = i.length - 1; a >= 0; a--) (o = i[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, t, r) : o(e, t)) || r);
  return n > 3 && r && Object.defineProperty(e, t, r), r;
};
let ie = class extends b {
  render() {
    return c`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl", "3xl", "xl", "3xl"]}
        alignItems="center"
        gap="xl"
      >
        <wui-visual name="onrampCard"></wui-visual>
        <wui-flex flexDirection="column" gap="xs" alignItems="center">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Quickly and easily buy digital assets!
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Simply select your preferred onramp provider and add digital assets to your account
            using your credit card or bank transfer
          </wui-text>
        </wui-flex>
        <wui-button @click=${z.goBack}>
          <wui-icon size="sm" color="inherit" name="add" slot="iconLeft"></wui-icon>
          Buy
        </wui-button>
      </wui-flex>
    `;
  }
};
ie = De([
  v("w3m-what-is-a-buy-view")
], ie);
const Ue = P`
  :host {
    width: 100%;
  }

  wui-loading-spinner {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .currency-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--wui-spacing-1xs);
    height: 40px;
    padding: var(--wui-spacing-xs) var(--wui-spacing-1xs) var(--wui-spacing-xs)
      var(--wui-spacing-xs);
    min-width: 95px;
    border-radius: var(--FULL, 1000px);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    cursor: pointer;
  }

  .currency-container > wui-image {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
`;
var N = function(i, e, t, s) {
  var n = arguments.length, r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var a = i.length - 1; a >= 0; a--) (o = i[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, t, r) : o(e, t)) || r);
  return n > 3 && r && Object.defineProperty(e, t, r), r;
};
let A = class extends b {
  constructor() {
    var e;
    super(), this.unsubscribe = [], this.type = "Token", this.value = 0, this.currencies = [], this.selectedCurrency = (e = this.currencies) == null ? void 0 : e[0], this.currencyImages = R.state.currencyImages, this.tokenImages = R.state.tokenImages, this.unsubscribe.push(u.subscribeKey("purchaseCurrency", (t) => {
      !t || this.type === "Fiat" || (this.selectedCurrency = this.formatPurchaseCurrency(t));
    }), u.subscribeKey("paymentCurrency", (t) => {
      !t || this.type === "Token" || (this.selectedCurrency = this.formatPaymentCurrency(t));
    }), u.subscribe((t) => {
      this.type === "Fiat" ? this.currencies = t.purchaseCurrencies.map(this.formatPurchaseCurrency) : this.currencies = t.paymentCurrencies.map(this.formatPaymentCurrency);
    }), R.subscribe((t) => {
      this.currencyImages = E({}, t.currencyImages), this.tokenImages = E({}, t.tokenImages);
    }));
  }
  firstUpdated() {
    u.getAvailableCurrencies();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    var s;
    const e = ((s = this.selectedCurrency) == null ? void 0 : s.symbol) || "", t = this.currencyImages[e] || this.tokenImages[e];
    return c`<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency ? c` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="xxs"
            @click=${() => O.open({ view: `OnRamp${this.type}Select` })}
          >
            <wui-image src=${h(t)}></wui-image>
            <wui-text color="fg-100">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>` : c`<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`;
  }
  formatPaymentCurrency(e) {
    return {
      name: e.id,
      symbol: e.id
    };
  }
  formatPurchaseCurrency(e) {
    return {
      name: e.name,
      symbol: e.symbol
    };
  }
};
A.styles = Ue;
N([
  p({ type: String })
], A.prototype, "type", void 0);
N([
  p({ type: Number })
], A.prototype, "value", void 0);
N([
  d()
], A.prototype, "currencies", void 0);
N([
  d()
], A.prototype, "selectedCurrency", void 0);
N([
  d()
], A.prototype, "currencyImages", void 0);
N([
  d()
], A.prototype, "tokenImages", void 0);
A = N([
  v("w3m-onramp-input")
], A);
const Ne = P`
  :host > wui-flex {
    width: 100%;
    max-width: 360px;
  }

  :host > wui-flex > wui-flex {
    border-radius: var(--wui-border-radius-l);
    width: 100%;
  }

  .amounts-container {
    width: 100%;
  }
`;
var $ = function(i, e, t, s) {
  var n = arguments.length, r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var a = i.length - 1; a >= 0; a--) (o = i[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, t, r) : o(e, t)) || r);
  return n > 3 && r && Object.defineProperty(e, t, r), r;
};
const je = {
  USD: "$",
  EUR: "€",
  GBP: "£"
}, Le = [100, 250, 500, 1e3];
let T = class extends b {
  constructor() {
    super(), this.unsubscribe = [], this.disabled = !1, this.caipAddress = I.state.activeCaipAddress, this.loading = O.state.loading, this.paymentCurrency = u.state.paymentCurrency, this.paymentAmount = u.state.paymentAmount, this.purchaseAmount = u.state.purchaseAmount, this.quoteLoading = u.state.quotesLoading, this.unsubscribe.push(I.subscribeKey("activeCaipAddress", (e) => this.caipAddress = e), O.subscribeKey("loading", (e) => {
      this.loading = e;
    }), u.subscribe((e) => {
      this.paymentCurrency = e.paymentCurrency, this.paymentAmount = e.paymentAmount, this.purchaseAmount = e.purchaseAmount, this.quoteLoading = e.quotesLoading;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    return c`
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center">
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <w3m-onramp-input
            type="Fiat"
            @inputChange=${this.onPaymentAmountChange.bind(this)}
            .value=${this.paymentAmount || 0}
          ></w3m-onramp-input>
          <w3m-onramp-input
            type="Token"
            .value=${this.purchaseAmount || 0}
            .loading=${this.quoteLoading}
          ></w3m-onramp-input>
          <wui-flex justifyContent="space-evenly" class="amounts-container" gap="xs">
            ${Le.map((e) => {
      var t;
      return c`<wui-button
                  variant=${this.paymentAmount === e ? "accent" : "neutral"}
                  size="md"
                  textVariant="paragraph-600"
                  fullWidth
                  @click=${() => this.selectPresetAmount(e)}
                  >${`${je[((t = this.paymentCurrency) == null ? void 0 : t.id) || "USD"]} ${e}`}</wui-button
                >`;
    })}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `;
  }
  templateButton() {
    return this.caipAddress ? c`<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="main"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>` : c`<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`;
  }
  getQuotes() {
    this.loading || O.open({ view: "OnRampProviders" });
  }
  openModal() {
    O.open({ view: "Connect" });
  }
  onPaymentAmountChange(e) {
    return w(this, null, function* () {
      u.setPaymentAmount(Number(e.detail)), yield u.getQuote();
    });
  }
  selectPresetAmount(e) {
    return w(this, null, function* () {
      u.setPaymentAmount(e), yield u.getQuote();
    });
  }
};
T.styles = Ne;
$([
  p({ type: Boolean })
], T.prototype, "disabled", void 0);
$([
  d()
], T.prototype, "caipAddress", void 0);
$([
  d()
], T.prototype, "loading", void 0);
$([
  d()
], T.prototype, "paymentCurrency", void 0);
$([
  d()
], T.prototype, "paymentAmount", void 0);
$([
  d()
], T.prototype, "purchaseAmount", void 0);
$([
  d()
], T.prototype, "quoteLoading", void 0);
T = $([
  v("w3m-onramp-widget")
], T);
export {
  y as W3mBuyInProgressView,
  S as W3mOnRampActivityView,
  Z as W3mOnRampProvidersView,
  D as W3mOnrampFiatSelectView,
  U as W3mOnrampTokensView,
  T as W3mOnrampWidget,
  ie as W3mWhatIsABuyView
};
