var Y = Object.defineProperty, J = Object.defineProperties;
var X = Object.getOwnPropertyDescriptors;
var q = Object.getOwnPropertySymbols;
var Z = Object.prototype.hasOwnProperty, ee = Object.prototype.propertyIsEnumerable;
var D = Math.pow, j = (t, n, o) => n in t ? Y(t, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[n] = o, N = (t, n) => {
  for (var o in n || (n = {}))
    Z.call(n, o) && j(t, o, n[o]);
  if (q)
    for (var o of q(n))
      ee.call(n, o) && j(t, o, n[o]);
  return t;
}, x = (t, n) => J(t, X(n));
var T = (t, n, o) => new Promise((s, a) => {
  var r = (d) => {
    try {
      i(o.next(d));
    } catch (u) {
      a(u);
    }
  }, c = (d) => {
    try {
      i(o.throw(d));
    } catch (u) {
      a(u);
    }
  }, i = (d) => d.done ? s(d.value) : Promise.resolve(d.value).then(r, c);
  i((o = o.apply(t, n)).next());
});
import { e as g, A as v, B as h, k as C, N as l, u as te, R as b, S as f, f as F, W as M, d as W, n as ne, v as Q, b as H, C as oe, c as se, w as ae, y as re, i as ie, r as ce, h as ue, a as de, x as _ } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { n as K, c as le } from "./if-defined-SxgRDNx5.mjs";
import "./index-CXCuF3ao.mjs";
import "./index-CpsJxmOq.mjs";
const L = {
  getTokenList() {
    return T(this, null, function* () {
      var s;
      const t = g.state.activeCaipNetwork, n = yield h.fetchSwapTokens({
        chainId: t == null ? void 0 : t.caipNetworkId
      });
      return ((s = n == null ? void 0 : n.tokens) == null ? void 0 : s.map((a) => x(N({}, a), {
        eip2612: !1,
        quantity: {
          decimals: "0",
          numeric: "0"
        },
        price: 0,
        value: 0
      }))) || [];
    });
  },
  fetchGasPrice() {
    return T(this, null, function* () {
      var n, o;
      const t = g.state.activeCaipNetwork;
      if (!t)
        return null;
      try {
        switch (t.chainNamespace) {
          case "solana":
            const s = (o = yield (n = C) == null ? void 0 : n.estimateGas({ chainNamespace: "solana" })) == null ? void 0 : o.toString();
            return {
              standard: s,
              fast: s,
              instant: s
            };
          case "eip155":
          default:
            return yield h.fetchGasPrice({
              chainId: t.caipNetworkId
            });
        }
      } catch (s) {
        return null;
      }
    });
  },
  fetchSwapAllowance(a) {
    return T(this, arguments, function* ({ tokenAddress: t, userAddress: n, sourceTokenAmount: o, sourceTokenDecimals: s }) {
      const r = yield h.fetchSwapAllowance({
        tokenAddress: t,
        userAddress: n
      });
      if (r != null && r.allowance && o && s) {
        const c = C.parseUnits(o, s) || 0;
        return BigInt(r.allowance) >= c;
      }
      return !1;
    });
  },
  getMyTokensWithBalance(t) {
    return T(this, null, function* () {
      const n = v.state.address, o = g.state.activeCaipNetwork;
      if (!n || !o)
        return [];
      const a = (yield h.getBalance(n, o.caipNetworkId, t)).balances.filter((r) => r.quantity.decimals !== "0");
      return v.setTokenBalance(a, g.state.activeChain), this.mapBalancesToSwapTokens(a);
    });
  },
  mapBalancesToSwapTokens(t) {
    return (t == null ? void 0 : t.map((n) => x(N({}, n), {
      address: n != null && n.address ? n.address : g.getActiveNetworkTokenAddress(),
      decimals: parseInt(n.quantity.decimals, 10),
      logoUri: n.iconUrl,
      eip2612: !1
    }))) || [];
  }
}, A = {
  getGasPriceInEther(t, n) {
    const o = n * t;
    return Number(o) / 1e18;
  },
  getGasPriceInUSD(t, n, o) {
    const s = A.getGasPriceInEther(n, o);
    return l.bigNumber(t).times(s).toNumber();
  },
  getPriceImpact({ sourceTokenAmount: t, sourceTokenPriceInUSD: n, toTokenPriceInUSD: o, toTokenAmount: s }) {
    const a = l.bigNumber(t).times(n), r = l.bigNumber(s).times(o);
    return a.minus(r).div(a).times(100).toNumber();
  },
  getMaxSlippage(t, n) {
    const o = l.bigNumber(t).div(100);
    return l.multiply(n, o).toNumber();
  },
  getProviderFee(t, n = 85e-4) {
    return l.bigNumber(t).times(n).toString();
  },
  isInsufficientNetworkTokenForGas(t, n) {
    const o = n || "0";
    return l.bigNumber(t).eq(0) ? !0 : l.bigNumber(l.bigNumber(o)).gt(t);
  },
  isInsufficientSourceTokenForSwap(t, n, o) {
    var r, c;
    const s = (c = (r = o == null ? void 0 : o.find((i) => i.address === n)) == null ? void 0 : r.quantity) == null ? void 0 : c.numeric;
    return l.bigNumber(s || "0").lt(t);
  },
  getToTokenAmount({ sourceToken: t, toToken: n, sourceTokenPrice: o, toTokenPrice: s, sourceTokenAmount: a }) {
    if (a === "0" || !t || !n)
      return "0";
    const r = t.decimals, c = o, i = n.decimals, d = s;
    if (d <= 0)
      return "0";
    const u = l.bigNumber(a).times(85e-4), w = l.bigNumber(a).minus(u).times(l.bigNumber(10).pow(r)), S = l.bigNumber(c).div(d), P = r - i;
    return w.times(S).div(l.bigNumber(10).pow(P)).div(l.bigNumber(10).pow(i)).toFixed(i).toString();
  }
}, V = 15e4, Te = 6, k = {
  // Loading states
  initializing: !1,
  initialized: !1,
  loadingPrices: !1,
  loadingQuote: !1,
  loadingApprovalTransaction: !1,
  loadingBuildTransaction: !1,
  loadingTransaction: !1,
  // Error states
  fetchError: !1,
  // Approval & Swap transaction states
  approvalTransaction: void 0,
  swapTransaction: void 0,
  transactionError: void 0,
  // Input values
  sourceToken: void 0,
  sourceTokenAmount: "",
  sourceTokenPriceInUSD: 0,
  toToken: void 0,
  toTokenAmount: "",
  toTokenPriceInUSD: 0,
  networkPrice: "0",
  networkBalanceInUSD: "0",
  networkTokenSymbol: "",
  inputError: void 0,
  // Request values
  slippage: H.CONVERT_SLIPPAGE_TOLERANCE,
  // Tokens
  tokens: void 0,
  popularTokens: void 0,
  suggestedTokens: void 0,
  foundTokens: void 0,
  myTokensWithBalance: void 0,
  tokensPriceMap: {},
  // Calculations
  gasFee: "0",
  gasPriceInUSD: 0,
  priceImpact: void 0,
  maxSlippage: void 0,
  providerFee: void 0
}, e = te(k), G = {
  state: e,
  subscribe(t) {
    return re(e, () => t(e));
  },
  subscribeKey(t, n) {
    return ae(e, t, n);
  },
  getParams() {
    var d, u, p, w, S, P, I, y;
    const t = g.state.activeCaipAddress, n = g.state.activeChain, o = W.getPlainAddress(t), s = g.getActiveNetworkTokenAddress(), a = oe.getConnectorId(n);
    if (!o)
      throw new Error("No address found to swap the tokens from.");
    const r = !((d = e.toToken) != null && d.address) || !((u = e.toToken) != null && u.decimals), c = !((p = e.sourceToken) != null && p.address) || !((w = e.sourceToken) != null && w.decimals) || !l.bigNumber(e.sourceTokenAmount).gt(0), i = !e.sourceTokenAmount;
    return {
      networkAddress: s,
      fromAddress: o,
      fromCaipAddress: t,
      sourceTokenAddress: (S = e.sourceToken) == null ? void 0 : S.address,
      toTokenAddress: (P = e.toToken) == null ? void 0 : P.address,
      toTokenAmount: e.toTokenAmount,
      toTokenDecimals: (I = e.toToken) == null ? void 0 : I.decimals,
      sourceTokenAmount: e.sourceTokenAmount,
      sourceTokenDecimals: (y = e.sourceToken) == null ? void 0 : y.decimals,
      invalidToToken: r,
      invalidSourceToken: c,
      invalidSourceTokenAmount: i,
      availableToSwap: t && !r && !c && !i,
      isAuthConnector: a === se.CONNECTOR_ID.AUTH
    };
  },
  setSourceToken(t) {
    if (!t) {
      e.sourceToken = t, e.sourceTokenAmount = "", e.sourceTokenPriceInUSD = 0;
      return;
    }
    e.sourceToken = t, this.setTokenPrice(t.address, "sourceToken");
  },
  setSourceTokenAmount(t) {
    e.sourceTokenAmount = t;
  },
  setToToken(t) {
    if (!t) {
      e.toToken = t, e.toTokenAmount = "", e.toTokenPriceInUSD = 0;
      return;
    }
    e.toToken = t, this.setTokenPrice(t.address, "toToken");
  },
  setToTokenAmount(t) {
    e.toTokenAmount = t ? l.formatNumberToLocalString(t, Te) : "";
  },
  setTokenPrice(t, n) {
    return T(this, null, function* () {
      let o = e.tokensPriceMap[t] || 0;
      o || (e.loadingPrices = !0, o = yield this.getAddressPrice(t)), n === "sourceToken" ? e.sourceTokenPriceInUSD = o : n === "toToken" && (e.toTokenPriceInUSD = o), e.loadingPrices && (e.loadingPrices = !1), this.getParams().availableToSwap && this.swapTokens();
    });
  },
  switchTokens() {
    if (e.initializing || !e.initialized)
      return;
    const t = e.toToken ? N({}, e.toToken) : void 0, n = e.sourceToken ? N({}, e.sourceToken) : void 0, o = t && e.toTokenAmount === "" ? "1" : e.toTokenAmount;
    this.setSourceToken(t), this.setToToken(n), this.setSourceTokenAmount(o), this.setToTokenAmount(""), this.swapTokens();
  },
  resetState() {
    e.myTokensWithBalance = k.myTokensWithBalance, e.tokensPriceMap = k.tokensPriceMap, e.initialized = k.initialized, e.sourceToken = k.sourceToken, e.sourceTokenAmount = k.sourceTokenAmount, e.sourceTokenPriceInUSD = k.sourceTokenPriceInUSD, e.toToken = k.toToken, e.toTokenAmount = k.toTokenAmount, e.toTokenPriceInUSD = k.toTokenPriceInUSD, e.networkPrice = k.networkPrice, e.networkTokenSymbol = k.networkTokenSymbol, e.networkBalanceInUSD = k.networkBalanceInUSD, e.inputError = k.inputError, e.myTokensWithBalance = k.myTokensWithBalance;
  },
  resetValues() {
    var o;
    const { networkAddress: t } = this.getParams(), n = (o = e.tokens) == null ? void 0 : o.find((s) => s.address === t);
    this.setSourceToken(n), this.setToToken(void 0);
  },
  getApprovalLoadingState() {
    return e.loadingApprovalTransaction;
  },
  clearError() {
    e.transactionError = void 0;
  },
  initializeState() {
    return T(this, null, function* () {
      if (!e.initializing) {
        if (e.initializing = !0, !e.initialized)
          try {
            yield this.fetchTokens(), e.initialized = !0;
          } catch (t) {
            e.initialized = !1, f.showError("Failed to initialize swap"), b.goBack();
          }
        e.initializing = !1;
      }
    });
  },
  fetchTokens() {
    return T(this, null, function* () {
      var o;
      const { networkAddress: t } = this.getParams();
      yield this.getTokenList(), yield this.getNetworkTokenPrice(), yield this.getMyTokensWithBalance();
      const n = (o = e.tokens) == null ? void 0 : o.find((s) => s.address === t);
      n && (e.networkTokenSymbol = n.symbol, this.setSourceToken(n), this.setSourceTokenAmount("1"));
    });
  },
  getTokenList() {
    return T(this, null, function* () {
      const t = yield L.getTokenList();
      e.tokens = t, e.popularTokens = t.sort((n, o) => n.symbol < o.symbol ? -1 : n.symbol > o.symbol ? 1 : 0), e.suggestedTokens = t.filter((n) => !!H.SWAP_SUGGESTED_TOKENS.includes(n.symbol), {});
    });
  },
  getAddressPrice(t) {
    return T(this, null, function* () {
      var d, u;
      const n = e.tokensPriceMap[t];
      if (n)
        return n;
      const o = yield h.fetchTokenPrice({
        addresses: [t]
      }), s = (o == null ? void 0 : o.fungibles) || [], a = [...e.tokens || [], ...e.myTokensWithBalance || []], r = (d = a == null ? void 0 : a.find((p) => p.address === t)) == null ? void 0 : d.symbol, c = ((u = s.find((p) => p.symbol.toLowerCase() === (r == null ? void 0 : r.toLowerCase()))) == null ? void 0 : u.price) || 0, i = parseFloat(c.toString());
      return e.tokensPriceMap[t] = i, i;
    });
  },
  getNetworkTokenPrice() {
    return T(this, null, function* () {
      var a;
      const { networkAddress: t } = this.getParams(), o = (a = (yield h.fetchTokenPrice({
        addresses: [t]
      }).catch(() => (f.showError("Failed to fetch network token price"), { fungibles: [] }))).fungibles) == null ? void 0 : a[0], s = (o == null ? void 0 : o.price.toString()) || "0";
      e.tokensPriceMap[t] = parseFloat(s), e.networkTokenSymbol = (o == null ? void 0 : o.symbol) || "", e.networkPrice = s;
    });
  },
  getMyTokensWithBalance(t) {
    return T(this, null, function* () {
      const n = yield Q.getMyTokensWithBalance(t), o = Q.mapBalancesToSwapTokens(n);
      o && (yield this.getInitialGasPrice(), this.setBalances(o));
    });
  },
  setBalances(t) {
    const { networkAddress: n } = this.getParams(), o = g.state.activeCaipNetwork;
    if (!o)
      return;
    const s = t.find((a) => a.address === n);
    t.forEach((a) => {
      e.tokensPriceMap[a.address] = a.price || 0;
    }), e.myTokensWithBalance = t.filter((a) => a.address.startsWith(o.caipNetworkId)), e.networkBalanceInUSD = s ? l.multiply(s.quantity.numeric, s.price).toString() : "0";
  },
  getInitialGasPrice() {
    return T(this, null, function* () {
      var n, o, s, a;
      const t = yield L.fetchGasPrice();
      if (!t)
        return { gasPrice: null, gasPriceInUSD: null };
      switch ((o = (n = g.state) == null ? void 0 : n.activeCaipNetwork) == null ? void 0 : o.chainNamespace) {
        case "solana":
          return e.gasFee = (s = t.standard) != null ? s : "0", e.gasPriceInUSD = l.multiply(t.standard, e.networkPrice).div(1e9).toNumber(), {
            gasPrice: BigInt(e.gasFee),
            gasPriceInUSD: Number(e.gasPriceInUSD)
          };
        case "eip155":
        default:
          const r = (a = t.standard) != null ? a : "0", c = BigInt(r), i = BigInt(V), d = A.getGasPriceInUSD(e.networkPrice, i, c);
          return e.gasFee = r, e.gasPriceInUSD = d, { gasPrice: c, gasPriceInUSD: d };
      }
    });
  },
  // -- Swap -------------------------------------- //
  swapTokens() {
    return T(this, null, function* () {
      var r, c;
      const t = v.state.address, n = e.sourceToken, o = e.toToken, s = l.bigNumber(e.sourceTokenAmount).gt(0);
      if (s || this.setToTokenAmount(""), !o || !n || e.loadingPrices || !s)
        return;
      e.loadingQuote = !0;
      const a = l.bigNumber(e.sourceTokenAmount).times(D(10, n.decimals)).round(0);
      try {
        const i = yield h.fetchSwapQuote({
          userAddress: t,
          from: n.address,
          to: o.address,
          gasPrice: e.gasFee,
          amount: a.toString()
        });
        e.loadingQuote = !1;
        const d = (c = (r = i == null ? void 0 : i.quotes) == null ? void 0 : r[0]) == null ? void 0 : c.toAmount;
        if (!d) {
          ne.open({
            shortMessage: "Incorrect amount",
            longMessage: "Please enter a valid amount"
          }, "error");
          return;
        }
        const u = l.bigNumber(d).div(D(10, o.decimals)).toString();
        this.setToTokenAmount(u), this.hasInsufficientToken(e.sourceTokenAmount, n.address) ? e.inputError = "Insufficient balance" : (e.inputError = void 0, this.setTransactionDetails());
      } catch (i) {
        e.loadingQuote = !1, e.inputError = "Insufficient balance";
      }
    });
  },
  // -- Create Transactions -------------------------------------- //
  getTransaction() {
    return T(this, null, function* () {
      const { fromCaipAddress: t, availableToSwap: n } = this.getParams(), o = e.sourceToken, s = e.toToken;
      if (!(!t || !n || !o || !s || e.loadingQuote))
        try {
          e.loadingBuildTransaction = !0;
          const a = yield L.fetchSwapAllowance({
            userAddress: t,
            tokenAddress: o.address,
            sourceTokenAmount: e.sourceTokenAmount,
            sourceTokenDecimals: o.decimals
          });
          let r;
          return a ? r = yield this.createSwapTransaction() : r = yield this.createAllowanceTransaction(), e.loadingBuildTransaction = !1, e.fetchError = !1, r;
        } catch (a) {
          b.goBack(), f.showError("Failed to check allowance"), e.loadingBuildTransaction = !1, e.approvalTransaction = void 0, e.swapTransaction = void 0, e.fetchError = !0;
          return;
        }
    });
  },
  createAllowanceTransaction() {
    return T(this, null, function* () {
      const { fromCaipAddress: t, sourceTokenAddress: n, toTokenAddress: o } = this.getParams();
      if (!(!t || !o)) {
        if (!n)
          throw new Error("createAllowanceTransaction - No source token address found.");
        try {
          const s = yield h.generateApproveCalldata({
            from: n,
            to: o,
            userAddress: t
          }), a = {
            data: s.tx.data,
            to: W.getPlainAddress(s.tx.from),
            gasPrice: BigInt(s.tx.eip155.gasPrice),
            value: BigInt(s.tx.value),
            toAmount: e.toTokenAmount
          };
          return e.swapTransaction = void 0, e.approvalTransaction = {
            data: a.data,
            to: a.to,
            gasPrice: a.gasPrice,
            value: a.value,
            toAmount: a.toAmount
          }, {
            data: a.data,
            to: a.to,
            gasPrice: a.gasPrice,
            value: a.value,
            toAmount: a.toAmount
          };
        } catch (s) {
          b.goBack(), f.showError("Failed to create approval transaction"), e.approvalTransaction = void 0, e.swapTransaction = void 0, e.fetchError = !0;
          return;
        }
      }
    });
  },
  createSwapTransaction() {
    return T(this, null, function* () {
      var c;
      const { networkAddress: t, fromCaipAddress: n, sourceTokenAmount: o } = this.getParams(), s = e.sourceToken, a = e.toToken;
      if (!n || !o || !s || !a)
        return;
      const r = (c = C.parseUnits(o, s.decimals)) == null ? void 0 : c.toString();
      try {
        const i = yield h.generateSwapCalldata({
          userAddress: n,
          from: s.address,
          to: a.address,
          amount: r,
          disableEstimate: !0
        }), d = s.address === t, u = BigInt(i.tx.eip155.gas), p = BigInt(i.tx.eip155.gasPrice), w = {
          data: i.tx.data,
          to: W.getPlainAddress(i.tx.to),
          gas: u,
          gasPrice: p,
          value: BigInt(d && r != null ? r : "0"),
          toAmount: e.toTokenAmount
        };
        return e.gasPriceInUSD = A.getGasPriceInUSD(e.networkPrice, u, p), e.approvalTransaction = void 0, e.swapTransaction = w, w;
      } catch (i) {
        b.goBack(), f.showError("Failed to create transaction"), e.approvalTransaction = void 0, e.swapTransaction = void 0, e.fetchError = !0;
        return;
      }
    });
  },
  // -- Send Transactions --------------------------------- //
  sendTransactionForApproval(t) {
    return T(this, null, function* () {
      var a, r, c, i;
      const { fromAddress: n, isAuthConnector: o } = this.getParams();
      e.loadingApprovalTransaction = !0;
      const s = "Approve limit increase in your wallet";
      o ? b.pushTransactionStack({
        view: null,
        goBack: !0,
        onSuccess() {
          f.showLoading(s);
        }
      }) : f.showLoading(s);
      try {
        yield C.sendTransaction({
          address: n,
          to: t.to,
          data: t.data,
          value: t.value,
          chainNamespace: "eip155"
        }), yield this.swapTokens(), yield this.getTransaction(), e.approvalTransaction = void 0, e.loadingApprovalTransaction = !1;
      } catch (d) {
        const u = d;
        e.transactionError = u == null ? void 0 : u.shortMessage, e.loadingApprovalTransaction = !1, f.showError((u == null ? void 0 : u.shortMessage) || "Transaction error"), F.sendEvent({
          type: "track",
          event: "SWAP_APPROVAL_ERROR",
          properties: {
            message: (u == null ? void 0 : u.shortMessage) || (u == null ? void 0 : u.message) || "Unknown",
            network: ((a = g.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId) || "",
            swapFromToken: ((r = this.state.sourceToken) == null ? void 0 : r.symbol) || "",
            swapToToken: ((c = this.state.toToken) == null ? void 0 : c.symbol) || "",
            swapFromAmount: this.state.sourceTokenAmount || "",
            swapToAmount: this.state.toTokenAmount || "",
            isSmartAccount: ((i = v.state.preferredAccountTypes) == null ? void 0 : i.eip155) === M.ACCOUNT_TYPES.SMART_ACCOUNT
          }
        });
      }
    });
  },
  sendTransactionForSwap(t) {
    return T(this, null, function* () {
      var c, i, d, u, p, w, S, P, I, y, B, R, z, $;
      if (!t)
        return;
      const { fromAddress: n, toTokenAmount: o, isAuthConnector: s } = this.getParams();
      e.loadingTransaction = !0;
      const a = `Swapping ${(c = e.sourceToken) == null ? void 0 : c.symbol} to ${l.formatNumberToLocalString(o, 3)} ${(i = e.toToken) == null ? void 0 : i.symbol}`, r = `Swapped ${(d = e.sourceToken) == null ? void 0 : d.symbol} to ${l.formatNumberToLocalString(o, 3)} ${(u = e.toToken) == null ? void 0 : u.symbol}`;
      s ? b.pushTransactionStack({
        view: "Account",
        goBack: !1,
        onSuccess() {
          f.showLoading(a), G.resetState();
        }
      }) : f.showLoading("Confirm transaction in your wallet");
      try {
        const E = [(p = e.sourceToken) == null ? void 0 : p.address, (w = e.toToken) == null ? void 0 : w.address].join(","), m = yield C.sendTransaction({
          address: n,
          to: t.to,
          data: t.data,
          value: t.value,
          chainNamespace: "eip155"
        });
        return e.loadingTransaction = !1, f.showSuccess(r), F.sendEvent({
          type: "track",
          event: "SWAP_SUCCESS",
          properties: {
            network: ((S = g.state.activeCaipNetwork) == null ? void 0 : S.caipNetworkId) || "",
            swapFromToken: ((P = this.state.sourceToken) == null ? void 0 : P.symbol) || "",
            swapToToken: ((I = this.state.toToken) == null ? void 0 : I.symbol) || "",
            swapFromAmount: this.state.sourceTokenAmount || "",
            swapToAmount: this.state.toTokenAmount || "",
            isSmartAccount: ((y = v.state.preferredAccountTypes) == null ? void 0 : y.eip155) === M.ACCOUNT_TYPES.SMART_ACCOUNT
          }
        }), G.resetState(), s || b.replace("Account"), G.getMyTokensWithBalance(E), m;
      } catch (E) {
        const m = E;
        e.transactionError = m == null ? void 0 : m.shortMessage, e.loadingTransaction = !1, f.showError((m == null ? void 0 : m.shortMessage) || "Transaction error"), F.sendEvent({
          type: "track",
          event: "SWAP_ERROR",
          properties: {
            message: (m == null ? void 0 : m.shortMessage) || (m == null ? void 0 : m.message) || "Unknown",
            network: ((B = g.state.activeCaipNetwork) == null ? void 0 : B.caipNetworkId) || "",
            swapFromToken: ((R = this.state.sourceToken) == null ? void 0 : R.symbol) || "",
            swapToToken: ((z = this.state.toToken) == null ? void 0 : z.symbol) || "",
            swapFromAmount: this.state.sourceTokenAmount || "",
            swapToAmount: this.state.toTokenAmount || "",
            isSmartAccount: (($ = v.state.preferredAccountTypes) == null ? void 0 : $.eip155) === M.ACCOUNT_TYPES.SMART_ACCOUNT
          }
        });
        return;
      }
    });
  },
  // -- Checks -------------------------------------------- //
  hasInsufficientToken(t, n) {
    return A.isInsufficientSourceTokenForSwap(t, n, e.myTokensWithBalance);
  },
  // -- Calculations -------------------------------------- //
  setTransactionDetails() {
    const { toTokenAddress: t, toTokenDecimals: n } = this.getParams();
    !t || !n || (e.gasPriceInUSD = A.getGasPriceInUSD(e.networkPrice, BigInt(e.gasFee), BigInt(V)), e.priceImpact = A.getPriceImpact({
      sourceTokenAmount: e.sourceTokenAmount,
      sourceTokenPriceInUSD: e.sourceTokenPriceInUSD,
      toTokenPriceInUSD: e.toTokenPriceInUSD,
      toTokenAmount: e.toTokenAmount
    }), e.maxSlippage = A.getMaxSlippage(e.slippage, e.toTokenAmount), e.providerFee = A.getProviderFee(e.sourceTokenAmount));
  }
}, ke = ie`
  :host {
    display: block;
  }

  :host > button {
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-1xs);
    height: 40px;
    border-radius: var(--wui-border-radius-l);
    background: var(--wui-color-gray-glass-002);
    border-width: 0px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
  }

  :host > button wui-image {
    width: 24px;
    height: 24px;
    border-radius: var(--wui-border-radius-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;
var O = function(t, n, o, s) {
  var a = arguments.length, r = a < 3 ? n : s === null ? s = Object.getOwnPropertyDescriptor(n, o) : s, c;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, n, o, s);
  else for (var i = t.length - 1; i >= 0; i--) (c = t[i]) && (r = (a < 3 ? c(r) : a > 3 ? c(n, o, r) : c(n, o)) || r);
  return a > 3 && r && Object.defineProperty(n, o, r), r;
};
let U = class extends de {
  constructor() {
    super(...arguments), this.text = "";
  }
  render() {
    return _`
      <button>
        ${this.tokenTemplate()}
        <wui-text variant="paragraph-600" color="fg-100">${this.text}</wui-text>
      </button>
    `;
  }
  tokenTemplate() {
    return this.imageSrc ? _`<wui-image src=${this.imageSrc}></wui-image>` : _`
      <wui-icon-box
        size="sm"
        iconColor="fg-200"
        backgroundColor="fg-300"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `;
  }
};
U.styles = [ce, ue, ke];
O([
  K()
], U.prototype, "imageSrc", void 0);
O([
  K()
], U.prototype, "text", void 0);
U = O([
  le("wui-token-button")
], U);
export {
  G as S
};
