import {
  Qt,
  cs
} from "./chunk-JF6SAR7X.js";
import {
  require_react
} from "./chunk-UXZXGIYB.js";
import {
  __toESM
} from "./chunk-5WRI5ZAA.js";

// my-app/node_modules/@telemetryos/sdk/dist/react.js
var import_react = __toESM(require_react());
var T = { exports: {} };
var S = {};
var V;
function ln() {
  return V || (V = 1, (function() {
    function e(n) {
      if (n == null) return null;
      if (typeof n == "function")
        return n.$$typeof === on ? null : n.displayName || n.name || null;
      if (typeof n == "string") return n;
      switch (n) {
        case O:
          return "Fragment";
        case B:
          return "Profiler";
        case X:
          return "StrictMode";
        case nn:
          return "Suspense";
        case en:
          return "SuspenseList";
        case tn:
          return "Activity";
      }
      if (typeof n == "object")
        switch (typeof n.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), n.$$typeof) {
          case G:
            return "Portal";
          case Z:
            return n.displayName || "Context";
          case Q:
            return (n._context.displayName || "Context") + ".Consumer";
          case K:
            var r = n.render;
            return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
          case rn:
            return r = n.displayName || null, r !== null ? r : e(n.type) || "Memo";
          case C:
            r = n._payload, n = n._init;
            try {
              return e(n(r));
            } catch {
            }
        }
      return null;
    }
    function t(n) {
      return "" + n;
    }
    function s(n) {
      try {
        t(n);
        var r = false;
      } catch {
        r = true;
      }
      if (r) {
        r = console;
        var a = r.error, u = typeof Symbol == "function" && Symbol.toStringTag && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return a.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          u
        ), t(n);
      }
    }
    function o(n) {
      if (n === O) return "<>";
      if (typeof n == "object" && n !== null && n.$$typeof === C)
        return "<...>";
      try {
        var r = e(n);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function c() {
      var n = P.A;
      return n === null ? null : n.getOwner();
    }
    function d() {
      return Error("react-stack-top-frame");
    }
    function g(n) {
      if (Y.call(n, "key")) {
        var r = Object.getOwnPropertyDescriptor(n, "key").get;
        if (r && r.isReactWarning) return false;
      }
      return n.key !== void 0;
    }
    function f(n, r) {
      function a() {
        U || (U = true, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      a.isReactWarning = true, Object.defineProperty(n, "key", {
        get: a,
        configurable: true
      });
    }
    function x() {
      var n = e(this.type);
      return $[n] || ($[n] = true, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), n = this.props.ref, n !== void 0 ? n : null;
    }
    function A(n, r, a, u, R, z) {
      var l = a.ref;
      return n = {
        $$typeof: k,
        type: n,
        key: r,
        props: a,
        _owner: u
      }, (l !== void 0 ? l : null) !== null ? Object.defineProperty(n, "ref", {
        enumerable: false,
        get: x
      }) : Object.defineProperty(n, "ref", { enumerable: false, value: null }), n._store = {}, Object.defineProperty(n._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      }), Object.defineProperty(n, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      }), Object.defineProperty(n, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: R
      }), Object.defineProperty(n, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: z
      }), Object.freeze && (Object.freeze(n.props), Object.freeze(n)), n;
    }
    function p(n, r, a, u, R, z) {
      var l = r.children;
      if (l !== void 0)
        if (u)
          if (sn(l)) {
            for (u = 0; u < l.length; u++)
              v(l[u]);
            Object.freeze && Object.freeze(l);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else v(l);
      if (Y.call(r, "key")) {
        l = e(n);
        var h = Object.keys(r).filter(function(an) {
          return an !== "key";
        });
        u = 0 < h.length ? "{key: someKey, " + h.join(": ..., ") + ": ...}" : "{key: someKey}", W[l + u] || (h = 0 < h.length ? "{" + h.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          u,
          l,
          h,
          l
        ), W[l + u] = true);
      }
      if (l = null, a !== void 0 && (s(a), l = "" + a), g(r) && (s(r.key), l = "" + r.key), "key" in r) {
        a = {};
        for (var L in r)
          L !== "key" && (a[L] = r[L]);
      } else a = r;
      return l && f(
        a,
        typeof n == "function" ? n.displayName || n.name || "Unknown" : n
      ), A(
        n,
        l,
        a,
        c(),
        R,
        z
      );
    }
    function v(n) {
      m(n) ? n._store && (n._store.validated = 1) : typeof n == "object" && n !== null && n.$$typeof === C && (n._payload.status === "fulfilled" ? m(n._payload.value) && n._payload.value._store && (n._payload.value._store.validated = 1) : n._store && (n._store.validated = 1));
    }
    function m(n) {
      return typeof n == "object" && n !== null && n.$$typeof === k;
    }
    var _ = import_react.default, k = /* @__PURE__ */ Symbol.for("react.transitional.element"), G = /* @__PURE__ */ Symbol.for("react.portal"), O = /* @__PURE__ */ Symbol.for("react.fragment"), X = /* @__PURE__ */ Symbol.for("react.strict_mode"), B = /* @__PURE__ */ Symbol.for("react.profiler"), Q = /* @__PURE__ */ Symbol.for("react.consumer"), Z = /* @__PURE__ */ Symbol.for("react.context"), K = /* @__PURE__ */ Symbol.for("react.forward_ref"), nn = /* @__PURE__ */ Symbol.for("react.suspense"), en = /* @__PURE__ */ Symbol.for("react.suspense_list"), rn = /* @__PURE__ */ Symbol.for("react.memo"), C = /* @__PURE__ */ Symbol.for("react.lazy"), tn = /* @__PURE__ */ Symbol.for("react.activity"), on = /* @__PURE__ */ Symbol.for("react.client.reference"), P = _.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = Object.prototype.hasOwnProperty, sn = Array.isArray, F = console.createTask ? console.createTask : function() {
      return null;
    };
    _ = {
      react_stack_bottom_frame: function(n) {
        return n();
      }
    };
    var U, $ = {}, D = _.react_stack_bottom_frame.bind(
      _,
      d
    )(), M = F(o(d)), W = {};
    S.Fragment = O, S.jsx = function(n, r, a) {
      var u = 1e4 > P.recentlyCreatedOwnerStacks++;
      return p(
        n,
        r,
        a,
        false,
        u ? Error("react-stack-top-frame") : D,
        u ? F(o(n)) : M
      );
    }, S.jsxs = function(n, r, a) {
      var u = 1e4 > P.recentlyCreatedOwnerStacks++;
      return p(
        n,
        r,
        a,
        true,
        u ? Error("react-stack-top-frame") : D,
        u ? F(o(n)) : M
      );
    };
  })()), S;
}
var q;
function dn() {
  return q || (q = 1, false ? T.exports = un() : T.exports = ln()), T.exports;
}
var i = dn();
var fn = `:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;

  --muted: 220 12% 95%;
  --muted-foreground: 215.4 16.3% 46.9%;

  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;

  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;

  --accent: 220 12% 95%;
  --accent-foreground: 222.2 47.4% 11.2%;

  --primary: 39 93% 59%;
  --primary-foreground: 210 40% 98%;

  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  --destructive: 6 86% 61%;
  --destructive-foreground: 210 40% 98%;

  --ring: 222.2 84% 4.9%;

  --radius: 0.5rem;
}

.dark {
  --background: 210 28% 8%;
  --foreground: 210 40% 88%;

  --muted: 212, 28%, 10%;
  --muted-foreground: 215 20.2% 65.1%;

  --border: 212 24% 19%;
  --input: 210 5% 31%;

  --card: 212 28% 10%;
  --card-foreground: 210 40% 98%;

  --accent: 211 30% 15%;
  --accent-foreground: 210 40% 98%;

  --primary: 39 93% 59%;
  --primary-foreground: 210 40% 98%;

  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;

  --destructive: 6 86% 61%;
  --destructive-foreground: 210 40% 98%;

  --ring: 212.7 26.8% 83.9%;

  --radius: 0.5rem;
}

/* =============================================================================
   Container & Layout
   ============================================================================= */

.settings__container {
  padding: 16px;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: 'Rubik', sans-serif;
  font-feature-settings: "rlig" 1, "calt" 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.settings__container>form {
  display: contents;
}

.settings__box {
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.settings__heading {
  font-size: 16px;
  font-weight: bold;
  color: hsl(var(--foreground));
}

.settings__divider {
  border: none;
  border-top: 1px solid hsl(var(--border));
}

/* =============================================================================
   Field Structure
   ============================================================================= */

.settings__field {
  display: inline-block;
}

.settings__label {
  font-size: 14px;
  margin-bottom: 6px;
  color: hsl(var(--foreground));
}

.settings__hint {
  font-size: 12px;
  opacity: 0.65;
  margin-top: 4px;
  color: hsl(var(--foreground));
}

.settings__error {
  font-size: 12px;
  margin-top: 4px;
  color: #ff6b6b;
}

/* =============================================================================
   Text Inputs
   ============================================================================= */

.settings__input-frame>* {
  height: 40px;
  width: 100%;
  font-size: 14px;
  padding: 8px 12px;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}

.settings__input-frame>*:focus {
  outline: 1px solid hsl(var(--primary));
  outline-offset: 0;
}

.settings__input-frame>*::placeholder {
  color: hsl(var(--muted-foreground));
  opacity: 1;
}

.settings__textarea-frame>textarea {
  width: 100%;
  min-height: 80px;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4em;
  padding: 8px 12px;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  resize: vertical;
}

.settings__textarea-frame>textarea:focus {
  outline: 1px solid hsl(var(--primary));
  outline-offset: 0;
}

.settings__textarea-frame>textarea::placeholder {
  color: hsl(var(--muted-foreground));
  opacity: 1;
}

/* =============================================================================
   Selection Inputs
   ============================================================================= */

.settings__select-frame>select {
  appearance: none;
  height: 40px;
  width: 100%;
  font-size: 14px;
  padding: 8px 36px 8px 12px;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background-color: hsl(var(--background));
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  color: hsl(var(--foreground));
  cursor: pointer;
}

.settings__select-frame>select:hover {
  background-color: hsl(var(--accent));
}

.settings__select-frame>select:focus {
  outline: 1px solid hsl(var(--primary));
  outline-offset: 0;
}

.settings__slider-frame {
  display: flex;
  align-items: center;
  gap: 8px;
}

.settings__slider-frame>input[type="range"] {
  flex: 1;
  height: 8px;
  background: hsl(var(--secondary));
  border-radius: 9999px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.settings__slider-frame>input[type="range"]:focus,
.settings__slider-frame>input[type="range"]:active {
  background: hsl(var(--primary));
}

.settings__slider-frame>input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: hsl(var(--background));
  border: 2px solid hsl(var(--primary));
  border-radius: 50%;
  cursor: pointer;
}

.settings__slider-frame>input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: hsl(var(--background));
  border: 2px solid hsl(var(--primary));
  border-radius: 50%;
  cursor: pointer;
}

.settings__slider-frame>span {
  min-width: 36px;
  text-align: right;
  font-size: 14px;
  color: hsl(var(--muted-foreground));
}

.settings__slider-ruler {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-top: 4px;
  margin-left: -4px;
  margin-right: 36px;
  opacity: 0.65;
}

.settings__color-frame {
  display: flex;
  align-items: center;
  gap: 8px;
}

.settings__color-frame>input[type="color"] {
  appearance: none;
  width: 40px;
  height: 40px;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
}

.settings__color-frame>input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 2px;
}

.settings__color-frame>input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: calc(var(--radius) - 3px);
}

.settings__color-frame>span {
  font-size: 14px;
  color: hsl(var(--foreground));
  font-family: monospace;
}

/* =============================================================================
   Toggle Inputs
   ============================================================================= */

.settings__switch-frame {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.settings__switch-frame>input[type="checkbox"] {
  appearance: none;
  width: 44px;
  height: 24px;
  background: hsl(var(--input));
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}

.settings__switch-frame>input[type="checkbox"]::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: hsl(var(--background));
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}

.settings__switch-frame>input[type="checkbox"]:checked {
  background: hsl(var(--primary));
}

.settings__switch-frame>input[type="checkbox"]:checked::after {
  transform: translateX(20px);
}

.settings__switch-label {
  flex: 1;
  color: hsl(var(--foreground));
}

.settings__checkbox-frame {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.settings__checkbox-frame>input[type="checkbox"] {
  appearance: none;
  width: 16px;
  height: 16px;
  background: hsl(var(--background));
  border: 1px solid hsl(var(--primary));
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.settings__checkbox-frame>input[type="checkbox"]:checked {
  background: hsl(var(--primary));
}

.settings__checkbox-frame>input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 5px;
  width: 4px;
  height: 8px;
  border: solid hsl(var(--primary-foreground));
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.settings__checkbox-label {
  flex: 1;
  color: hsl(var(--foreground));
}

.settings__radio-frame {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.settings__radio-frame>input[type="radio"] {
  appearance: none;
  width: 16px;
  height: 16px;
  background: hsl(var(--background));
  border: 1px solid hsl(var(--primary));
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}

.settings__radio-frame>input[type="radio"]:checked {
  background: hsl(var(--primary));
}

.settings__radio-frame>input[type="radio"]:checked::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 6px;
  height: 6px;
  background: hsl(var(--primary-foreground));
  border-radius: 50%;
}

.settings__radio-label {
  flex: 1;
  color: hsl(var(--foreground));
}

/* =============================================================================
   Actions
   ============================================================================= */

.settings__button-frame {
  display: contents;
}

.settings__button-frame>button {
  padding: 8px 16px;
  background: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  color: hsl(var(--foreground));
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
}

.settings__button-frame>button:hover {
  background: hsl(var(--accent));
}

.settings__button-frame>button.active,
.settings__button-frame>button[data-active="true"] {
  background: hsl(var(--primary));
  border-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
`;
var H = false;
function pn() {
  if (H || typeof document > "u")
    return;
  const e = document.createElement("style");
  e.setAttribute("data-telemetryos-sdk", ""), e.textContent = fn, document.head.appendChild(e), H = true;
}
pn();
function _n({ children: e }) {
  return (0, import_react.useEffect)(() => {
    const s = window.matchMedia("(prefers-color-scheme: dark)"), o = (g) => {
      let f;
      g === "system" ? f = s.matches : f = g !== "light", f ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    }, c = cs().subscribeColorScheme(o);
    c.catch(console.error);
    const d = () => {
      cs().getColorScheme().then(o).catch(console.error);
    };
    return s.addEventListener("change", d), () => {
      c.then(() => cs().unsubscribeColorScheme(o)).catch(console.error), s.removeEventListener("change", d);
    };
  }, []), i.jsx("div", { className: "settings__container", children: e });
}
function hn({ children: e }) {
  return i.jsx("div", { className: "settings__box", children: e });
}
function bn({ children: e }) {
  return i.jsx("div", { className: "settings__heading", children: e });
}
function xn() {
  return i.jsx("hr", { className: "settings__divider" });
}
function vn({ children: e }) {
  return i.jsx("label", { className: "settings__field", children: e });
}
function kn({ children: e }) {
  return i.jsx("div", { className: "settings__label", children: e });
}
function yn({ children: e }) {
  return i.jsx("div", { className: "settings__hint", children: e });
}
function Sn({ children: e }) {
  return i.jsx("div", { className: "settings__error", children: e });
}
function wn({ children: e }) {
  return i.jsx("div", { className: "settings__input-frame", children: e });
}
function En({ children: e }) {
  return i.jsx("div", { className: "settings__textarea-frame", children: e });
}
function Rn({ children: e }) {
  return i.jsx("div", { className: "settings__select-frame", children: e });
}
function Tn({ children: e }) {
  return i.jsx("div", { className: "settings__slider-frame", children: e });
}
function jn({ children: e }) {
  return i.jsx("div", { className: "settings__slider-ruler", children: e });
}
function Nn({ children: e }) {
  return i.jsx("div", { className: "settings__color-frame", children: e });
}
function An({ children: e }) {
  return i.jsx("label", { className: "settings__switch-frame", children: e });
}
function On({ children: e }) {
  return i.jsx("span", { className: "settings__switch-label", children: e });
}
function Cn({ children: e }) {
  return i.jsx("label", { className: "settings__checkbox-frame", children: e });
}
function Pn({ children: e }) {
  return i.jsx("span", { className: "settings__checkbox-label", children: e });
}
function Fn({ children: e }) {
  return i.jsx("label", { className: "settings__radio-frame", children: e });
}
function zn({ children: e }) {
  return i.jsx("span", { className: "settings__radio-label", children: e });
}
function Ln({ children: e }) {
  return i.jsx("div", { className: "settings__button-frame", children: e });
}
function E(e, t, s, o = 0) {
  var c;
  const [d, g] = (0, import_react.useState)(true), [f] = (0, import_react.useState)(s), [x, A] = (0, import_react.useState)(void 0), [p, v] = (0, import_react.useState)(void 0);
  return (0, import_react.useEffect)(() => {
    const m = (_) => {
      A((k) => JSON.stringify(k) === JSON.stringify(_) ? k : _), g(false);
    };
    return e.subscribe(t, m).catch(console.error), () => {
      e.unsubscribe(t, m).catch(console.error);
    };
  }, [e, t]), (0, import_react.useEffect)(() => {
    if (typeof p < "u") {
      const m = setTimeout(() => {
        e.set(t, p);
      }, o);
      return () => clearTimeout(m);
    }
  }, [p, e, t, o]), (0, import_react.useEffect)(() => {
    if (JSON.stringify(p) === JSON.stringify(x)) {
      const m = setTimeout(() => {
        v(void 0);
      }, 500);
      return () => clearTimeout(m);
    }
  }, [p, x]), [d, (c = p ?? x) !== null && c !== void 0 ? c : f, v];
}
function In(e, t) {
  return (s, o = 0) => E(s, e, t, o);
}
function Yn(e, t) {
  return (s = 0) => {
    const o = (0, import_react.useMemo)(() => Qt().instance, []);
    return E(o, e, t, s);
  };
}
function Un(e, t) {
  return (s = 0) => {
    const o = (0, import_react.useMemo)(() => Qt().application, []);
    return E(o, e, t, s);
  };
}
function $n(e, t) {
  return (s = 0) => {
    const o = (0, import_react.useMemo)(() => Qt().device, []);
    return E(o, e, t, s);
  };
}
function Dn(e, t, s) {
  return (o = 0) => {
    const c = (0, import_react.useMemo)(() => Qt().shared(s), []);
    return E(c, e, t, o);
  };
}
function Mn(e) {
  (0, import_react.useEffect)(() => {
    document.documentElement.style.fontSize = `calc(1vmax * ${e})`;
  }, [e]);
}
function Wn() {
  const [e, t] = (0, import_react.useState)(() => window.innerWidth / window.innerHeight);
  return (0, import_react.useEffect)(() => {
    const o = () => {
      t(window.innerWidth / window.innerHeight);
    };
    return window.addEventListener("resize", o), () => window.removeEventListener("resize", o);
  }, []), e;
}
function Jn(e, t) {
  return {
    uiWidthFactor: Math.min(t, 1) / e,
    uiHeightFactor: Math.max(t, 1) / e
  };
}
export {
  hn as SettingsBox,
  Ln as SettingsButtonFrame,
  Cn as SettingsCheckboxFrame,
  Pn as SettingsCheckboxLabel,
  Nn as SettingsColorFrame,
  _n as SettingsContainer,
  xn as SettingsDivider,
  Sn as SettingsError,
  vn as SettingsField,
  bn as SettingsHeading,
  yn as SettingsHint,
  wn as SettingsInputFrame,
  kn as SettingsLabel,
  Fn as SettingsRadioFrame,
  zn as SettingsRadioLabel,
  Rn as SettingsSelectFrame,
  Tn as SettingsSliderFrame,
  jn as SettingsSliderRuler,
  An as SettingsSwitchFrame,
  On as SettingsSwitchLabel,
  En as SettingsTextAreaFrame,
  Un as createUseApplicationStoreState,
  $n as createUseDeviceStoreState,
  Yn as createUseInstanceStoreState,
  Dn as createUseSharedStoreState,
  In as createUseStoreState,
  E as useStoreState,
  Wn as useUiAspectRatio,
  Jn as useUiResponsiveFactors,
  Mn as useUiScaleToSetRem
};
//# sourceMappingURL=@telemetryos_sdk_react.js.map
