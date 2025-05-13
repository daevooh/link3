import { i as h, r as b, h as w, a as g, x as s } from "./reown-appkit-connector-RlB2KFu3.mjs";
import { n as o, c as v, o as p } from "./if-defined-SxgRDNx5.mjs";
import "./index-CXCuF3ao.mjs";
import "./index-BQckQaxg.mjs";
import "./index-CpsJxmOq.mjs";
const x = h`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
var t = function(l, a, e, r) {
  var u = arguments.length, n = u < 3 ? a : r === null ? r = Object.getOwnPropertyDescriptor(a, e) : r, c;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(l, a, e, r);
  else for (var d = l.length - 1; d >= 0; d--) (c = l[d]) && (n = (u < 3 ? c(n) : u > 3 ? c(a, e, n) : c(a, e)) || n);
  return u > 3 && n && Object.defineProperty(a, e, n), n;
};
let i = class extends g {
  constructor() {
    super(...arguments), this.tabIdx = void 0, this.variant = "icon", this.disabled = !1, this.imageSrc = void 0, this.alt = void 0, this.chevron = !1, this.loading = !1;
  }
  render() {
    return s`
      <button
        ?disabled=${this.loading ? !0 : !!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${p(this.iconVariant)}
        tabindex=${p(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `;
  }
  visualTemplate() {
    var a;
    if (this.variant === "image" && this.imageSrc)
      return s`<wui-image src=${this.imageSrc} alt=${(a = this.alt) != null ? a : "list item"}></wui-image>`;
    if (this.iconVariant === "square" && this.icon && this.variant === "icon")
      return s`<wui-icon name=${this.icon}></wui-icon>`;
    if (this.variant === "icon" && this.icon && this.iconVariant) {
      const e = ["blue", "square-blue"].includes(this.iconVariant) ? "accent-100" : "fg-200", r = this.iconVariant === "square-blue" ? "mdl" : "md", u = this.iconSize ? this.iconSize : r;
      return s`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${u}
          background="transparent"
          iconColor=${e}
          backgroundColor=${e}
          size=${r}
        ></wui-icon-box>
      `;
    }
    return null;
  }
  loadingTemplate() {
    return this.loading ? s`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>` : s``;
  }
  chevronTemplate() {
    return this.chevron ? s`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>` : null;
  }
};
i.styles = [b, w, x];
t([
  o()
], i.prototype, "icon", void 0);
t([
  o()
], i.prototype, "iconSize", void 0);
t([
  o()
], i.prototype, "tabIdx", void 0);
t([
  o()
], i.prototype, "variant", void 0);
t([
  o()
], i.prototype, "iconVariant", void 0);
t([
  o({ type: Boolean })
], i.prototype, "disabled", void 0);
t([
  o()
], i.prototype, "imageSrc", void 0);
t([
  o()
], i.prototype, "alt", void 0);
t([
  o({ type: Boolean })
], i.prototype, "chevron", void 0);
t([
  o({ type: Boolean })
], i.prototype, "loading", void 0);
i = t([
  v("wui-list-item")
], i);
