import { Y as o } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { a as n, f as c } from "./if-defined-SxgRDNx5.mjs";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const d = () => new r();
class r {
}
const h = /* @__PURE__ */ new WeakMap(), G = n(class extends c {
  render(t) {
    return o;
  }
  update(t, [s]) {
    var e;
    const i = s !== this.G;
    return i && this.G !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.G = s, this.ht = (e = t.options) == null ? void 0 : e.host, this.rt(this.ct = t.element)), o;
  }
  rt(t) {
    var s;
    if (this.isConnected || (t = void 0), typeof this.G == "function") {
      const i = (s = this.ht) != null ? s : globalThis;
      let e = h.get(i);
      e === void 0 && (e = /* @__PURE__ */ new WeakMap(), h.set(i, e)), e.get(this.G) !== void 0 && this.G.call(this.ht, void 0), e.set(this.G, t), t !== void 0 && this.G.call(this.ht, t);
    } else this.G.value = t;
  }
  get lt() {
    var t, s, i;
    return typeof this.G == "function" ? (s = h.get((t = this.ht) != null ? t : globalThis)) == null ? void 0 : s.get(this.G) : (i = this.G) == null ? void 0 : i.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
export {
  d as e,
  G as n
};
