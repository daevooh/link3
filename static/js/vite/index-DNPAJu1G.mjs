var p = (t, e, n) => new Promise((s, o) => {
  var r = (h) => {
    try {
      d(n.next(h));
    } catch (E) {
      o(E);
    }
  }, i = (h) => {
    try {
      d(n.throw(h));
    } catch (E) {
      o(E);
    }
  }, d = (h) => h.done ? s(h.value) : Promise.resolve(h.value).then(r, i);
  d((n = n.apply(t, e)).next());
});
import { O as V, P as v, d as U, e as y, c as T, k as A, I as $, u as B, S as P, A as I, R as O, J as C, M as x, w as Y, y as W, i as M, a as D, x as w, T as H } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { o as S, r as g, c as G } from "./if-defined-SxgRDNx5.mjs";
import "./index-YhqbR5Wc.mjs";
import "./index-CMfLjtbj.mjs";
import "./index-Dz192-H2.mjs";
import "./index-CXCuF3ao.mjs";
import "./index-Coyh_R-g.mjs";
import "./index-BQckQaxg.mjs";
import "./index-PS8mUgmz.mjs";
import "./index-98vrGaaA.mjs";
const c = {
  INVALID_PAYMENT_CONFIG: "INVALID_PAYMENT_CONFIG",
  INVALID_RECIPIENT: "INVALID_RECIPIENT",
  INVALID_ASSET: "INVALID_ASSET",
  INVALID_AMOUNT: "INVALID_AMOUNT",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  UNABLE_TO_INITIATE_PAYMENT: "UNABLE_TO_INITIATE_PAYMENT",
  INVALID_CHAIN_NAMESPACE: "INVALID_CHAIN_NAMESPACE",
  GENERIC_PAYMENT_ERROR: "GENERIC_PAYMENT_ERROR",
  UNABLE_TO_GET_EXCHANGES: "UNABLE_TO_GET_EXCHANGES",
  ASSET_NOT_SUPPORTED: "ASSET_NOT_SUPPORTED",
  UNABLE_TO_GET_PAY_URL: "UNABLE_TO_GET_PAY_URL",
  UNABLE_TO_GET_BUY_STATUS: "UNABLE_TO_GET_BUY_STATUS"
}, N = {
  [c.INVALID_PAYMENT_CONFIG]: "Invalid payment configuration",
  [c.INVALID_RECIPIENT]: "Invalid recipient address",
  [c.INVALID_ASSET]: "Invalid asset specified",
  [c.INVALID_AMOUNT]: "Invalid payment amount",
  [c.UNKNOWN_ERROR]: "Unknown payment error occurred",
  [c.UNABLE_TO_INITIATE_PAYMENT]: "Unable to initiate payment",
  [c.INVALID_CHAIN_NAMESPACE]: "Invalid chain namespace",
  [c.GENERIC_PAYMENT_ERROR]: "Unable to process payment",
  [c.UNABLE_TO_GET_EXCHANGES]: "Unable to get exchanges",
  [c.ASSET_NOT_SUPPORTED]: "Asset not supported by the selected exchange",
  [c.UNABLE_TO_GET_PAY_URL]: "Unable to get payment URL",
  [c.UNABLE_TO_GET_BUY_STATUS]: "Unable to get buy status"
};
class l extends Error {
  get message() {
    return N[this.code];
  }
  constructor(e, n) {
    super(N[e]), this.name = "AppKitPayError", this.code = e, this.details = n, Error.captureStackTrace && Error.captureStackTrace(this, l);
  }
}
const j = "https://rpc.walletconnect.org/v1/json-rpc";
class F extends Error {
}
function K() {
  const t = V.getSnapshot().projectId;
  return `${j}?projectId=${t}`;
}
function R(t, e) {
  return p(this, null, function* () {
    const n = K(), r = yield (yield fetch(n, {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: t,
        params: e
      }),
      headers: { "Content-Type": "application/json" }
    })).json();
    if (r.error)
      throw new F(r.error.message);
    return r;
  });
}
function L(t) {
  return p(this, null, function* () {
    return (yield R("reown_getExchanges", t)).result;
  });
}
function z(t) {
  return p(this, null, function* () {
    return (yield R("reown_getExchangePayUrl", t)).result;
  });
}
function q(t) {
  return p(this, null, function* () {
    return (yield R("reown_getExchangeBuyStatus", t)).result;
  });
}
const X = {
  eip155: {
    native: { assetNamespace: "slip44", assetReference: "60" },
    defaultTokenNamespace: "erc20"
  }
};
function J(t, e) {
  const { chainNamespace: n, chainId: s } = v.parseCaipNetworkId(t), o = X[n];
  if (!o)
    throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${n}`);
  let r = o.native.assetNamespace, i = o.native.assetReference;
  return e !== "native" && (r = o.defaultTokenNamespace, i = e), `${`${n}:${s}`}/${r}:${i}`;
}
function Q(t) {
  return p(this, null, function* () {
    const { paymentAssetNetwork: e, activeCaipNetwork: n, approvedCaipNetworkIds: s, requestedCaipNetworks: o } = t, i = U.sortRequestedNetworks(s, o).find((E) => E.caipNetworkId === e);
    if (!i)
      throw new l(c.INVALID_PAYMENT_CONFIG);
    if (i.caipNetworkId === n.caipNetworkId)
      return;
    const d = y.getNetworkProp("supportsAllNetworks", i.chainNamespace);
    if (!((s == null ? void 0 : s.includes(i.caipNetworkId)) || d))
      throw new l(c.INVALID_PAYMENT_CONFIG);
    try {
      yield y.switchActiveNetwork(i);
    } catch (E) {
      throw new l(c.GENERIC_PAYMENT_ERROR, E);
    }
  });
}
function Z(t, e, n) {
  return p(this, null, function* () {
    var d, h;
    if (e !== T.CHAIN.EVM)
      throw new l(c.INVALID_CHAIN_NAMESPACE);
    const s = typeof t.amount == "string" ? parseFloat(t.amount) : t.amount;
    if (isNaN(s))
      throw new l(c.INVALID_PAYMENT_CONFIG);
    const o = (h = (d = t.metadata) == null ? void 0 : d.decimals) != null ? h : 18, r = A.parseUnits(s.toString(), o);
    if (typeof r != "bigint")
      throw new l(c.GENERIC_PAYMENT_ERROR);
    if (e !== T.CHAIN.EVM)
      throw new l(c.INVALID_CHAIN_NAMESPACE);
    const i = yield A.sendTransaction({
      chainNamespace: e,
      to: t.recipient,
      address: n,
      value: r,
      data: "0x"
    });
    return i != null ? i : void 0;
  });
}
function ee(t, e) {
  return p(this, null, function* () {
    const n = t.asset, s = t.recipient, o = Number(t.metadata.decimals), r = A.parseUnits(t.amount.toString(), o);
    if (r === void 0)
      throw new l(c.GENERIC_PAYMENT_ERROR);
    const i = yield A.writeContract({
      fromAddress: e,
      tokenAddress: n,
      args: [s, r],
      method: "transfer",
      abi: $.getERC20Abi(n),
      chainNamespace: T.CHAIN.EVM
    });
    return i != null ? i : void 0;
  });
}
const k = 0, a = B({
  paymentAsset: {
    network: "eip155:1",
    recipient: "0x0",
    asset: "0x0",
    amount: 0,
    metadata: {
      name: "0x0",
      symbol: "0x0",
      decimals: 0
    }
  },
  isConfigured: !1,
  error: null,
  isPaymentInProgress: !1,
  exchanges: [],
  isLoading: !1,
  openInNewTab: !0,
  redirectUrl: void 0,
  payWithExchange: void 0,
  currentPayment: void 0
}), u = {
  state: a,
  subscribe(t) {
    return W(a, () => t(a));
  },
  subscribeKey(t, e) {
    return Y(a, t, e);
  },
  handleOpenPay(t) {
    return p(this, null, function* () {
      this.resetState(), this.setPaymentConfig(t), this.subscribeEvents(), a.isConfigured = !0, yield x.open({
        view: "Pay"
      });
    });
  },
  resetState() {
    a.paymentAsset = {
      network: "eip155:1",
      recipient: "0x0",
      asset: "0x0",
      amount: 0,
      metadata: { name: "0x0", symbol: "0x0", decimals: 0 }
    }, a.isConfigured = !1, a.error = null, a.isPaymentInProgress = !1, a.isLoading = !1, a.currentPayment = void 0;
  },
  setPaymentConfig(t) {
    var e;
    if (!t.paymentAsset)
      throw new l(c.INVALID_PAYMENT_CONFIG);
    try {
      a.paymentAsset = t.paymentAsset, a.openInNewTab = (e = t.openInNewTab) != null ? e : !0, a.redirectUrl = t.redirectUrl, a.payWithExchange = t.payWithExchange, a.error = null;
    } catch (n) {
      throw new l(c.INVALID_PAYMENT_CONFIG, n.message);
    }
  },
  getPaymentAsset() {
    return a.paymentAsset;
  },
  getExchanges() {
    return a.exchanges;
  },
  fetchExchanges() {
    return p(this, null, function* () {
      try {
        a.isLoading = !0;
        const t = yield L({
          page: k
        });
        a.exchanges = t.exchanges.slice(0, 2);
      } catch (t) {
        throw P.showError(N.UNABLE_TO_GET_EXCHANGES), new l(c.UNABLE_TO_GET_EXCHANGES);
      } finally {
        a.isLoading = !1;
      }
    });
  },
  getAvailableExchanges() {
    return p(this, arguments, function* (t = k) {
      try {
        return yield L({
          page: t
        });
      } catch (e) {
        throw new l(c.UNABLE_TO_GET_EXCHANGES);
      }
    });
  },
  getPayUrl(t, e) {
    return p(this, null, function* () {
      try {
        const n = Number(e.amount);
        return yield z({
          exchangeId: t,
          asset: J(e.network, e.asset),
          amount: n.toString(16),
          recipient: `${e.network}:${e.recipient}`
        });
      } catch (n) {
        throw n instanceof Error && n.message.includes("is not supported") ? new l(c.ASSET_NOT_SUPPORTED) : new Error(n.message);
      }
    });
  },
  openPayUrl(t, e, n = !0) {
    return p(this, null, function* () {
      try {
        const s = yield this.getPayUrl(t, e);
        if (!s)
          throw new l(c.UNABLE_TO_GET_PAY_URL);
        const o = n ? "_blank" : "_self";
        return U.openHref(s.url, o), s;
      } catch (s) {
        throw s instanceof l ? a.error = s.message : a.error = N.GENERIC_PAYMENT_ERROR, new l(c.UNABLE_TO_GET_PAY_URL);
      }
    });
  },
  subscribeEvents() {
    a.isConfigured || (C.subscribeProviders((t) => p(this, null, function* () {
      const e = y.state.activeChain;
      C.getProvider(e) && (yield this.handlePayment());
    })), I.subscribeKey("caipAddress", (t) => p(this, null, function* () {
      t && (yield this.handlePayment());
    })));
  },
  handlePayment() {
    return p(this, null, function* () {
      a.currentPayment = {
        type: "wallet"
      };
      const t = I.state.caipAddress;
      if (!t)
        return;
      const { chainId: e, address: n } = v.parseCaipAddress(t), s = y.state.activeChain;
      if (!n || !e || !s || !C.getProvider(s))
        return;
      const r = y.state.activeCaipNetwork;
      if (r && !a.isPaymentInProgress)
        try {
          a.isPaymentInProgress = !0;
          const i = y.getAllRequestedCaipNetworks(), d = y.getAllApprovedCaipNetworkIds();
          switch (yield Q({
            paymentAssetNetwork: a.paymentAsset.network,
            activeCaipNetwork: r,
            approvedCaipNetworkIds: d,
            requestedCaipNetworks: i
          }), yield x.open({
            view: "PayLoading"
          }), s) {
            case T.CHAIN.EVM:
              a.paymentAsset.asset === "native" && (a.currentPayment.result = yield Z(a.paymentAsset, s, n)), a.paymentAsset.asset.startsWith("0x") && (a.currentPayment.result = yield ee(a.paymentAsset, n));
              break;
            default:
              throw new l(c.INVALID_CHAIN_NAMESPACE);
          }
        } catch (i) {
          i instanceof l ? a.error = i.message : a.error = N.GENERIC_PAYMENT_ERROR, P.showError(a.error);
        } finally {
          a.isPaymentInProgress = !1;
        }
    });
  },
  getExchangeById(t) {
    return a.exchanges.find((e) => e.id === t);
  },
  validatePayConfig(t) {
    const { paymentAsset: e } = t;
    if (!e)
      throw new l(c.INVALID_PAYMENT_CONFIG);
    if (!e.recipient)
      throw new l(c.INVALID_RECIPIENT);
    if (!e.asset)
      throw new l(c.INVALID_ASSET);
    if (!e.amount)
      throw new l(c.INVALID_AMOUNT);
  },
  handlePayWithWallet() {
    const t = I.state.caipAddress;
    if (!t) {
      O.push("Connect");
      return;
    }
    const { chainId: e, address: n } = v.parseCaipAddress(t), s = y.state.activeChain;
    if (!n || !e || !s) {
      O.push("Connect");
      return;
    }
    this.handlePayment();
  },
  handlePayWithExchange(t) {
    return p(this, null, function* () {
      try {
        a.currentPayment = {
          type: "exchange",
          exchangeId: t
        }, a.isPaymentInProgress = !0;
        const { network: e, asset: n, amount: s, recipient: o } = a.paymentAsset, r = { network: e, asset: n, amount: s, recipient: o }, i = yield this.getPayUrl(t, r);
        if (!i)
          throw new l(c.UNABLE_TO_INITIATE_PAYMENT);
        return a.currentPayment.sessionId = i.sessionId, a.currentPayment.status = "IN_PROGRESS", a.currentPayment.exchangeId = t, {
          url: i.url,
          openInNewTab: a.openInNewTab
        };
      } catch (e) {
        return e instanceof l ? a.error = e.message : a.error = N.GENERIC_PAYMENT_ERROR, a.isPaymentInProgress = !1, P.showError(a.error), null;
      }
    });
  },
  getBuyStatus(t, e) {
    return p(this, null, function* () {
      try {
        return yield q({ sessionId: e, exchangeId: t });
      } catch (n) {
        throw new l(c.UNABLE_TO_GET_BUY_STATUS);
      }
    });
  },
  updateBuyStatus(t, e) {
    return p(this, null, function* () {
      try {
        const n = yield this.getBuyStatus(t, e);
        a.currentPayment && (a.currentPayment.status = n.status, a.currentPayment.result = n.txHash), (n.status === "SUCCESS" || n.status === "FAILED") && (a.isPaymentInProgress = !1);
      } catch (n) {
        throw new l(c.UNABLE_TO_GET_BUY_STATUS);
      }
    });
  }
}, te = M`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  .token-display {
    padding: var(--wui-spacing-s) var(--wui-spacing-m);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-bg-125);
    margin-top: var(--wui-spacing-s);
    margin-bottom: var(--wui-spacing-s);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--wui-spacing-xs);
  }
`;
var f = function(t, e, n, s) {
  var o = arguments.length, r = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, n) : s, i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, n, s);
  else for (var d = t.length - 1; d >= 0; d--) (i = t[d]) && (r = (o < 3 ? i(r) : o > 3 ? i(e, n, r) : i(e, n)) || r);
  return o > 3 && r && Object.defineProperty(e, n, r), r;
};
let m = class extends D {
  constructor() {
    super(), this.unsubscribe = [], this.amount = "", this.tokenSymbol = "", this.networkName = "", this.exchanges = u.state.exchanges, this.isLoading = u.state.isLoading, this.loadingExchangeId = null, this.connectedWalletInfo = I.state.connectedWalletInfo, this.initializePaymentDetails(), this.unsubscribe.push(u.subscribeKey("exchanges", (e) => this.exchanges = e)), this.unsubscribe.push(u.subscribeKey("isLoading", (e) => this.isLoading = e)), this.unsubscribe.push(I.subscribe((e) => this.connectedWalletInfo = e.connectedWalletInfo)), u.fetchExchanges();
  }
  get isWalletConnected() {
    return I.state.status === "connected";
  }
  render() {
    return w`
      <wui-flex flexDirection="column">
        <wui-flex flexDirection="column" .padding=${["0", "l", "l", "l"]} gap="s">
          ${this.renderPaymentHeader()}

          <wui-flex flexDirection="column" gap="s">
            <wui-flex flexDirection="column" gap="s">
              ${this.isWalletConnected ? this.renderConnectedView() : this.renderDisconnectedView()}
            </wui-flex>
            <wui-separator text="or"></wui-separator>
            ${this.renderExchangeOptions()}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
  }
  initializePaymentDetails() {
    const e = u.getPaymentAsset();
    this.networkName = e.network, this.tokenSymbol = e.metadata.symbol, this.amount = e.amount.toString();
  }
  renderPaymentHeader() {
    let e = this.networkName;
    if (this.networkName) {
      const s = y.getAllRequestedCaipNetworks().find((o) => o.caipNetworkId === this.networkName);
      s && (e = s.name);
    }
    return w`
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="large-700" color="fg-100">${this.amount || "0.0000"}</wui-text>
          <wui-flex class="token-display" alignItems="center" gap="xxs">
            <wui-text variant="paragraph-600" color="fg-100">
              ${this.tokenSymbol || "Unknown Asset"}
            </wui-text>
            ${e ? w`
                  <wui-text variant="small-500" color="fg-200"> on ${e} </wui-text>
                ` : ""}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
  }
  renderConnectedView() {
    var n, s, o;
    const e = ((n = this.connectedWalletInfo) == null ? void 0 : n.name) || "connected wallet";
    return w`
      <wui-list-item
        @click=${this.onWalletPayment}
        ?chevron=${!0}
        data-testid="wallet-payment-option"
      >
        <wui-flex alignItems="center" gap="s">
          <wui-wallet-image
            size="sm"
            imageSrc=${S((s = this.connectedWalletInfo) == null ? void 0 : s.icon)}
            name=${S((o = this.connectedWalletInfo) == null ? void 0 : o.name)}
          ></wui-wallet-image>
          <wui-text variant="paragraph-500" color="inherit">Pay with ${e}</wui-text>
        </wui-flex>
      </wui-list-item>

      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="disconnect"
        @click=${this.onDisconnect}
        data-testid="disconnect-button"
        ?chevron=${!1}
      >
        <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
      </wui-list-item>
    `;
  }
  renderDisconnectedView() {
    return w`<wui-list-item
      variant="icon"
      iconVariant="overlay"
      icon="walletPlaceholder"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="paragraph-500" color="inherit">Pay from wallet</wui-text>
    </wui-list-item>`;
  }
  renderExchangeOptions() {
    return this.isLoading ? w`<wui-flex justifyContent="center" alignItems="center">
        <wui-spinner size="md"></wui-spinner>
      </wui-flex>` : this.exchanges.length === 0 ? w`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-100">No exchanges available</wui-text>
      </wui-flex>` : this.exchanges.map((e) => w`
        <wui-list-item
          @click=${() => this.onExchangePayment(e.id)}
          data-testid="exchange-option-${e.id}"
          ?chevron=${!0}
          ?disabled=${this.loadingExchangeId !== null}
        >
          <wui-flex alignItems="center" gap="s">
            ${this.loadingExchangeId === e.id ? w`<wui-loading-spinner color="accent-100" size="md"></wui-loading-spinner>` : w`<wui-wallet-image
                  size="sm"
                  imageSrc=${S(e.imageUrl)}
                  name=${e.name}
                ></wui-wallet-image>`}
            <wui-text flexGrow="1" variant="paragraph-500" color="inherit"
              >Pay with ${e.name} <wui-spinner size="sm" color="fg-200"></wui-spinner
            ></wui-text>
          </wui-flex>
        </wui-list-item>
      `);
  }
  onWalletPayment() {
    u.handlePayWithWallet();
  }
  onExchangePayment(e) {
    return p(this, null, function* () {
      try {
        this.loadingExchangeId = e;
        const n = yield u.handlePayWithExchange(e);
        n && (yield x.open({
          view: "PayLoading"
        }), U.openHref(n.url, n.openInNewTab ? "_blank" : "_self"));
      } catch (n) {
        console.error("Failed to pay with exchange", n), P.showError("Failed to pay with exchange");
      } finally {
        this.loadingExchangeId = null;
      }
    });
  }
  onDisconnect(e) {
    return p(this, null, function* () {
      e.stopPropagation();
      try {
        yield A.disconnect(), x.close();
      } catch (n) {
        console.error("Failed to disconnect"), P.showError("Failed to disconnect");
      }
    });
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
};
m.styles = te;
f([
  g()
], m.prototype, "amount", void 0);
f([
  g()
], m.prototype, "tokenSymbol", void 0);
f([
  g()
], m.prototype, "networkName", void 0);
f([
  g()
], m.prototype, "exchanges", void 0);
f([
  g()
], m.prototype, "isLoading", void 0);
f([
  g()
], m.prototype, "loadingExchangeId", void 0);
f([
  g()
], m.prototype, "connectedWalletInfo", void 0);
m = f([
  G("w3m-pay-view")
], m);
const ne = M`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
var b = function(t, e, n, s) {
  var o = arguments.length, r = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, n) : s, i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, n, s);
  else for (var d = t.length - 1; d >= 0; d--) (i = t[d]) && (r = (o < 3 ? i(r) : o > 3 ? i(e, n, r) : i(e, n)) || r);
  return o > 3 && r && Object.defineProperty(e, n, r), r;
};
const ae = 4e3;
let _ = class extends D {
  constructor() {
    super(), this.loadingMessage = "", this.subMessage = "", this.paymentState = "in-progress", this.paymentState = u.state.isPaymentInProgress ? "in-progress" : "completed", this.updateMessages(), this.setupSubscription(), this.setupExchangeSubscription();
  }
  disconnectedCallback() {
    clearInterval(this.exchangeSubscription);
  }
  render() {
    return w`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xl", "xl", "xl", "xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center"> ${this.getStateIcon()} </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            ${this.loadingMessage}
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            ${this.subMessage}
          </wui-text>
        </wui-flex>
      </wui-flex>
    `;
  }
  updateMessages() {
    var e;
    switch (this.paymentState) {
      case "completed":
        this.loadingMessage = "Payment completed", this.subMessage = "Your transaction has been successfully processed";
        break;
      case "error":
        this.loadingMessage = "Payment failed", this.subMessage = "There was an error processing your transaction";
        break;
      case "in-progress":
      default:
        ((e = u.state.currentPayment) == null ? void 0 : e.type) === "exchange" ? (this.loadingMessage = "Payment initiated", this.subMessage = "Please complete the payment on the exchange") : (this.loadingMessage = "Awaiting payment confirmation", this.subMessage = "Please confirm the payment transaction in your wallet");
        break;
    }
  }
  getStateIcon() {
    switch (this.paymentState) {
      case "completed":
        return this.successTemplate();
      case "error":
        return this.errorTemplate();
      case "in-progress":
      default:
        return this.loaderTemplate();
    }
  }
  setupExchangeSubscription() {
    var e;
    ((e = u.state.currentPayment) == null ? void 0 : e.type) === "exchange" && (this.exchangeSubscription = setInterval(() => p(this, null, function* () {
      var o, r, i;
      const n = (o = u.state.currentPayment) == null ? void 0 : o.exchangeId, s = (r = u.state.currentPayment) == null ? void 0 : r.sessionId;
      n && s && (yield u.updateBuyStatus(n, s), ((i = u.state.currentPayment) == null ? void 0 : i.status) === "SUCCESS" && clearInterval(this.exchangeSubscription));
    }), ae));
  }
  setupSubscription() {
    u.subscribeKey("isPaymentInProgress", (e) => {
      var n;
      !e && this.paymentState === "in-progress" && (u.state.error || !((n = u.state.currentPayment) != null && n.result) ? this.paymentState = "error" : this.paymentState = "completed", this.updateMessages(), setTimeout(() => {
        A.state.status !== "disconnected" && x.close();
      }, 3e3));
    }), u.subscribeKey("error", (e) => {
      e && this.paymentState === "in-progress" && (this.paymentState = "error", this.updateMessages());
    });
  }
  loaderTemplate() {
    const e = H.state.themeVariables["--w3m-border-radius-master"], n = e ? parseInt(e.replace("px", ""), 10) : 4;
    return w`<wui-loading-thumbnail radius=${n * 9}></wui-loading-thumbnail>`;
  }
  successTemplate() {
    return w`<wui-icon size="xl" color="success-100" name="checkmark"></wui-icon>`;
  }
  errorTemplate() {
    return w`<wui-icon size="xl" color="error-100" name="close"></wui-icon>`;
  }
};
_.styles = ne;
b([
  g()
], _.prototype, "loadingMessage", void 0);
b([
  g()
], _.prototype, "subMessage", void 0);
b([
  g()
], _.prototype, "paymentState", void 0);
_ = b([
  G("w3m-pay-loading-view")
], _);
function ye(t) {
  return p(this, null, function* () {
    return u.handleOpenPay(t);
  });
}
function fe() {
  return u.getExchanges();
}
function Ee() {
  var t;
  return (t = u.state.currentPayment) == null ? void 0 : t.result;
}
function Ne() {
  return u.state.error;
}
function Ie() {
  return u.state.isPaymentInProgress;
}
export {
  _ as W3mPayLoadingView,
  m as W3mPayView,
  fe as getExchanges,
  Ie as getIsPaymentInProgress,
  Ne as getPayError,
  Ee as getPayResult,
  ye as openPay
};
