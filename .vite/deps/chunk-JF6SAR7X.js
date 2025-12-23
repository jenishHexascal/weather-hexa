// my-app/node_modules/@telemetryos/sdk/dist/index.js
var b;
(function(n) {
  n.assertEqual = (a) => {
  };
  function e(a) {
  }
  n.assertIs = e;
  function t(a) {
    throw new Error();
  }
  n.assertNever = t, n.arrayToEnum = (a) => {
    const i = {};
    for (const r of a)
      i[r] = r;
    return i;
  }, n.getValidEnumValues = (a) => {
    const i = n.objectKeys(a).filter((o) => typeof a[a[o]] != "number"), r = {};
    for (const o of i)
      r[o] = a[o];
    return n.objectValues(r);
  }, n.objectValues = (a) => n.objectKeys(a).map(function(i) {
    return a[i];
  }), n.objectKeys = typeof Object.keys == "function" ? (a) => Object.keys(a) : (a) => {
    const i = [];
    for (const r in a)
      Object.prototype.hasOwnProperty.call(a, r) && i.push(r);
    return i;
  }, n.find = (a, i) => {
    for (const r of a)
      if (i(r))
        return r;
  }, n.isInteger = typeof Number.isInteger == "function" ? (a) => Number.isInteger(a) : (a) => typeof a == "number" && Number.isFinite(a) && Math.floor(a) === a;
  function s(a, i = " | ") {
    return a.map((r) => typeof r == "string" ? `'${r}'` : r).join(i);
  }
  n.joinValues = s, n.jsonStringifyReplacer = (a, i) => typeof i == "bigint" ? i.toString() : i;
})(b || (b = {}));
var ye;
(function(n) {
  n.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(ye || (ye = {}));
var l = b.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var O = (n) => {
  switch (typeof n) {
    case "undefined":
      return l.undefined;
    case "string":
      return l.string;
    case "number":
      return Number.isNaN(n) ? l.nan : l.number;
    case "boolean":
      return l.boolean;
    case "function":
      return l.function;
    case "bigint":
      return l.bigint;
    case "symbol":
      return l.symbol;
    case "object":
      return Array.isArray(n) ? l.array : n === null ? l.null : n.then && typeof n.then == "function" && n.catch && typeof n.catch == "function" ? l.promise : typeof Map < "u" && n instanceof Map ? l.map : typeof Set < "u" && n instanceof Set ? l.set : typeof Date < "u" && n instanceof Date ? l.date : l.object;
    default:
      return l.unknown;
  }
};
var d = b.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var C = class _C extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (s) => {
      this.issues = [...this.issues, s];
    }, this.addIssues = (s = []) => {
      this.issues = [...this.issues, ...s];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const t = e || function(i) {
      return i.message;
    }, s = { _errors: [] }, a = (i) => {
      for (const r of i.issues)
        if (r.code === "invalid_union")
          r.unionErrors.map(a);
        else if (r.code === "invalid_return_type")
          a(r.returnTypeError);
        else if (r.code === "invalid_arguments")
          a(r.argumentsError);
        else if (r.path.length === 0)
          s._errors.push(t(r));
        else {
          let o = s, c = 0;
          for (; c < r.path.length; ) {
            const h = r.path[c];
            c === r.path.length - 1 ? (o[h] = o[h] || { _errors: [] }, o[h]._errors.push(t(r))) : o[h] = o[h] || { _errors: [] }, o = o[h], c++;
          }
        }
    };
    return a(this), s;
  }
  static assert(e) {
    if (!(e instanceof _C))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, b.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, s = [];
    for (const a of this.issues)
      if (a.path.length > 0) {
        const i = a.path[0];
        t[i] = t[i] || [], t[i].push(e(a));
      } else
        s.push(e(a));
    return { formErrors: s, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
};
C.create = (n) => new C(n);
var re = (n, e) => {
  let t;
  switch (n.code) {
    case d.invalid_type:
      n.received === l.undefined ? t = "Required" : t = `Expected ${n.expected}, received ${n.received}`;
      break;
    case d.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(n.expected, b.jsonStringifyReplacer)}`;
      break;
    case d.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${b.joinValues(n.keys, ", ")}`;
      break;
    case d.invalid_union:
      t = "Invalid input";
      break;
    case d.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${b.joinValues(n.options)}`;
      break;
    case d.invalid_enum_value:
      t = `Invalid enum value. Expected ${b.joinValues(n.options)}, received '${n.received}'`;
      break;
    case d.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case d.invalid_return_type:
      t = "Invalid function return type";
      break;
    case d.invalid_date:
      t = "Invalid date";
      break;
    case d.invalid_string:
      typeof n.validation == "object" ? "includes" in n.validation ? (t = `Invalid input: must include "${n.validation.includes}"`, typeof n.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${n.validation.position}`)) : "startsWith" in n.validation ? t = `Invalid input: must start with "${n.validation.startsWith}"` : "endsWith" in n.validation ? t = `Invalid input: must end with "${n.validation.endsWith}"` : b.assertNever(n.validation) : n.validation !== "regex" ? t = `Invalid ${n.validation}` : t = "Invalid";
      break;
    case d.too_small:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "more than"} ${n.minimum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "over"} ${n.minimum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${n.minimum}` : n.type === "bigint" ? t = `Number must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${n.minimum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(n.minimum))}` : t = "Invalid input";
      break;
    case d.too_big:
      n.type === "array" ? t = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "less than"} ${n.maximum} element(s)` : n.type === "string" ? t = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "under"} ${n.maximum} character(s)` : n.type === "number" ? t = `Number must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "bigint" ? t = `BigInt must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "date" ? t = `Date must be ${n.exact ? "exactly" : n.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(n.maximum))}` : t = "Invalid input";
      break;
    case d.custom:
      t = "Invalid input";
      break;
    case d.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case d.not_multiple_of:
      t = `Number must be a multiple of ${n.multipleOf}`;
      break;
    case d.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, b.assertNever(n);
  }
  return { message: t };
};
var Le = re;
function qe() {
  return Le;
}
var De = (n) => {
  const { data: e, path: t, errorMaps: s, issueData: a } = n, i = [...t, ...a.path || []], r = {
    ...a,
    path: i
  };
  if (a.message !== void 0)
    return {
      ...a,
      path: i,
      message: a.message
    };
  let o = "";
  const c = s.filter((h) => !!h).slice().reverse();
  for (const h of c)
    o = h(r, { data: e, defaultError: o }).message;
  return {
    ...a,
    path: i,
    message: o
  };
};
function u(n, e) {
  const t = qe(), s = De({
    issueData: e,
    data: n.data,
    path: n.path,
    errorMaps: [
      n.common.contextualErrorMap,
      // contextual error map is first priority
      n.schemaErrorMap,
      // then schema-bound map if available
      t,
      // then global override map
      t === re ? void 0 : re
      // then global default map
    ].filter((a) => !!a)
  });
  n.common.issues.push(s);
}
var N = class je {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const s = [];
    for (const a of t) {
      if (a.status === "aborted")
        return g;
      a.status === "dirty" && e.dirty(), s.push(a.value);
    }
    return { status: e.value, value: s };
  }
  static async mergeObjectAsync(e, t) {
    const s = [];
    for (const a of t) {
      const i = await a.key, r = await a.value;
      s.push({
        key: i,
        value: r
      });
    }
    return je.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, t) {
    const s = {};
    for (const a of t) {
      const { key: i, value: r } = a;
      if (i.status === "aborted" || r.status === "aborted")
        return g;
      i.status === "dirty" && e.dirty(), r.status === "dirty" && e.dirty(), i.value !== "__proto__" && (typeof r.value < "u" || a.alwaysSet) && (s[i.value] = r.value);
    }
    return { status: e.value, value: s };
  }
};
var g = Object.freeze({
  status: "aborted"
});
var ie = (n) => ({ status: "dirty", value: n });
var x = (n) => ({ status: "valid", value: n });
var ve = (n) => n.status === "aborted";
var be = (n) => n.status === "dirty";
var L = (n) => n.status === "valid";
var X = (n) => typeof Promise < "u" && n instanceof Promise;
var p;
(function(n) {
  n.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, n.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(p || (p = {}));
var $ = class {
  constructor(e, t, s, a) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = s, this._key = a;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
};
var we = (n, e) => {
  if (L(e))
    return { success: true, data: e.value };
  if (!n.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: false,
    get error() {
      if (this._error)
        return this._error;
      const t = new C(n.common.issues);
      return this._error = t, this._error;
    }
  };
};
function y(n) {
  if (!n)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: s, description: a } = n;
  if (e && (t || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: a } : { errorMap: (i, r) => {
    const { message: o } = n;
    return i.code === "invalid_enum_value" ? { message: o ?? r.defaultError } : typeof r.data > "u" ? { message: o ?? s ?? r.defaultError } : i.code !== "invalid_type" ? { message: r.defaultError } : { message: o ?? t ?? r.defaultError };
  }, description: a };
}
var v = class {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return O(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: O(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new N(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: O(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (X(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const s = this.safeParse(e, t);
    if (s.success)
      return s.data;
    throw s.error;
  }
  safeParse(e, t) {
    const s = {
      common: {
        issues: [],
        async: (t == null ? void 0 : t.async) ?? false,
        contextualErrorMap: t == null ? void 0 : t.errorMap
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: O(e)
    }, a = this._parseSync({ data: e, path: s.path, parent: s });
    return we(s, a);
  }
  "~validate"(e) {
    var t, s;
    const a = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: O(e)
    };
    if (!this["~standard"].async)
      try {
        const i = this._parseSync({ data: e, path: [], parent: a });
        return L(i) ? {
          value: i.value
        } : {
          issues: a.common.issues
        };
      } catch (i) {
        (s = (t = i == null ? void 0 : i.message) == null ? void 0 : t.toLowerCase()) != null && s.includes("encountered") && (this["~standard"].async = true), a.common = {
          issues: [],
          async: true
        };
      }
    return this._parseAsync({ data: e, path: [], parent: a }).then((i) => L(i) ? {
      value: i.value
    } : {
      issues: a.common.issues
    });
  }
  async parseAsync(e, t) {
    const s = await this.safeParseAsync(e, t);
    if (s.success)
      return s.data;
    throw s.error;
  }
  async safeParseAsync(e, t) {
    const s = {
      common: {
        issues: [],
        contextualErrorMap: t == null ? void 0 : t.errorMap,
        async: true
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: O(e)
    }, a = this._parse({ data: e, path: s.path, parent: s }), i = await (X(a) ? a : Promise.resolve(a));
    return we(s, i);
  }
  refine(e, t) {
    const s = (a) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(a) : t;
    return this._refinement((a, i) => {
      const r = e(a), o = () => i.addIssue({
        code: d.custom,
        ...s(a)
      });
      return typeof Promise < "u" && r instanceof Promise ? r.then((c) => c ? true : (o(), false)) : r ? true : (o(), false);
    });
  }
  refinement(e, t) {
    return this._refinement((s, a) => e(s) ? true : (a.addIssue(typeof t == "function" ? t(s, a) : t), false));
  }
  _refinement(e) {
    return new D({
      schema: this,
      typeName: m.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (t) => this["~validate"](t)
    };
  }
  optional() {
    return I.create(this, this._def);
  }
  nullable() {
    return V.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return q.create(this);
  }
  promise() {
    return te.create(this, this._def);
  }
  or(e) {
    return Q.create([this, e], this._def);
  }
  and(e) {
    return ee.create(this, e, this._def);
  }
  transform(e) {
    return new D({
      ...y(this._def),
      schema: this,
      typeName: m.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new he({
      ...y(this._def),
      innerType: this,
      defaultValue: t,
      typeName: m.ZodDefault
    });
  }
  brand() {
    return new ut({
      typeName: m.ZodBranded,
      type: this,
      ...y(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new pe({
      ...y(this._def),
      innerType: this,
      catchValue: t,
      typeName: m.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return _e.create(this, e);
  }
  readonly() {
    return fe.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var Ve = /^c[^\s-]{8,}$/i;
var ze = /^[0-9a-z]+$/;
var Be = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var Ue = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var He = /^[a-z0-9_-]{21}$/i;
var Ke = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var We = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var Je = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var Ge = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
var ne;
var Ye = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var Xe = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var Qe = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var et = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var tt = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var st = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var Pe = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))";
var at = new RegExp(`^${Pe}$`);
function Re(n) {
  let e = "[0-5]\\d";
  n.precision ? e = `${e}\\.\\d{${n.precision}}` : n.precision == null && (e = `${e}(\\.\\d+)?`);
  const t = n.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${t}`;
}
function nt(n) {
  return new RegExp(`^${Re(n)}$`);
}
function rt(n) {
  let e = `${Pe}T${Re(n)}`;
  const t = [];
  return t.push(n.local ? "Z?" : "Z"), n.offset && t.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${t.join("|")})`, new RegExp(`^${e}$`);
}
function it(n, e) {
  return !!((e === "v4" || !e) && Ye.test(n) || (e === "v6" || !e) && Qe.test(n));
}
function ot(n, e) {
  if (!Ke.test(n))
    return false;
  try {
    const [t] = n.split(".");
    if (!t)
      return false;
    const s = t.replace(/-/g, "+").replace(/_/g, "/").padEnd(t.length + (4 - t.length % 4) % 4, "="), a = JSON.parse(atob(s));
    return !(typeof a != "object" || a === null || "typ" in a && (a == null ? void 0 : a.typ) !== "JWT" || !a.alg || e && a.alg !== e);
  } catch {
    return false;
  }
}
function ct(n, e) {
  return !!((e === "v4" || !e) && Xe.test(n) || (e === "v6" || !e) && et.test(n));
}
var A = class _A extends v {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== l.string) {
      const a = this._getOrReturnCtx(e);
      return u(a, {
        code: d.invalid_type,
        expected: l.string,
        received: a.parsedType
      }), g;
    }
    const t = new N();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), u(s, {
          code: d.too_small,
          minimum: a.value,
          type: "string",
          inclusive: true,
          exact: false,
          message: a.message
        }), t.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), u(s, {
          code: d.too_big,
          maximum: a.value,
          type: "string",
          inclusive: true,
          exact: false,
          message: a.message
        }), t.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value, r = e.data.length < a.value;
        (i || r) && (s = this._getOrReturnCtx(e, s), i ? u(s, {
          code: d.too_big,
          maximum: a.value,
          type: "string",
          inclusive: true,
          exact: true,
          message: a.message
        }) : r && u(s, {
          code: d.too_small,
          minimum: a.value,
          type: "string",
          inclusive: true,
          exact: true,
          message: a.message
        }), t.dirty());
      } else if (a.kind === "email")
        Je.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
          validation: "email",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "emoji")
        ne || (ne = new RegExp(Ge, "u")), ne.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
          validation: "emoji",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "uuid")
        Ue.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
          validation: "uuid",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "nanoid")
        He.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
          validation: "nanoid",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "cuid")
        Ve.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
          validation: "cuid",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "cuid2")
        ze.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
          validation: "cuid2",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "ulid")
        Be.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
          validation: "ulid",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), u(s, {
            validation: "url",
            code: d.invalid_string,
            message: a.message
          }), t.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
        validation: "regex",
        code: d.invalid_string,
        message: a.message
      }), t.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), u(s, {
        code: d.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), t.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), u(s, {
        code: d.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), t.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), u(s, {
        code: d.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), t.dirty()) : a.kind === "datetime" ? rt(a).test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
        code: d.invalid_string,
        validation: "datetime",
        message: a.message
      }), t.dirty()) : a.kind === "date" ? at.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
        code: d.invalid_string,
        validation: "date",
        message: a.message
      }), t.dirty()) : a.kind === "time" ? nt(a).test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
        code: d.invalid_string,
        validation: "time",
        message: a.message
      }), t.dirty()) : a.kind === "duration" ? We.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
        validation: "duration",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : a.kind === "ip" ? it(e.data, a.version) || (s = this._getOrReturnCtx(e, s), u(s, {
        validation: "ip",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : a.kind === "jwt" ? ot(e.data, a.alg) || (s = this._getOrReturnCtx(e, s), u(s, {
        validation: "jwt",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : a.kind === "cidr" ? ct(e.data, a.version) || (s = this._getOrReturnCtx(e, s), u(s, {
        validation: "cidr",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : a.kind === "base64" ? tt.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
        validation: "base64",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : a.kind === "base64url" ? st.test(e.data) || (s = this._getOrReturnCtx(e, s), u(s, {
        validation: "base64url",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : b.assertNever(a);
    return { status: t.value, value: e.data };
  }
  _regex(e, t, s) {
    return this.refinement((a) => e.test(a), {
      validation: t,
      code: d.invalid_string,
      ...p.errToObj(s)
    });
  }
  _addCheck(e) {
    return new _A({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...p.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...p.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...p.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...p.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...p.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...p.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...p.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...p.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...p.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...p.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...p.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...p.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...p.errToObj(e) });
  }
  datetime(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: false,
      local: false,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (e == null ? void 0 : e.offset) ?? false,
      local: (e == null ? void 0 : e.local) ?? false,
      ...p.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...p.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...p.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...p.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...p.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...p.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...p.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...p.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...p.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...p.errToObj(t)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, p.errToObj(e));
  }
  trim() {
    return new _A({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _A({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _A({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
};
A.create = (n) => new A({
  checks: [],
  typeName: m.ZodString,
  coerce: (n == null ? void 0 : n.coerce) ?? false,
  ...y(n)
});
function dt(n, e) {
  const t = (n.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, a = t > s ? t : s, i = Number.parseInt(n.toFixed(a).replace(".", "")), r = Number.parseInt(e.toFixed(a).replace(".", ""));
  return i % r / 10 ** a;
}
var ke = class oe extends v {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== l.number) {
      const a = this._getOrReturnCtx(e);
      return u(a, {
        code: d.invalid_type,
        expected: l.number,
        received: a.parsedType
      }), g;
    }
    let t;
    const s = new N();
    for (const a of this._def.checks)
      a.kind === "int" ? b.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), u(t, {
        code: d.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (t = this._getOrReturnCtx(e, t), u(t, {
        code: d.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: false,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (t = this._getOrReturnCtx(e, t), u(t, {
        code: d.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: false,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? dt(e.data, a.value) !== 0 && (t = this._getOrReturnCtx(e, t), u(t, {
        code: d.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), u(t, {
        code: d.not_finite,
        message: a.message
      }), s.dirty()) : b.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, true, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, false, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, true, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, false, p.toString(t));
  }
  setLimit(e, t, s, a) {
    return new oe({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: s,
          message: p.toString(a)
        }
      ]
    });
  }
  _addCheck(e) {
    return new oe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: p.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: p.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: p.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: p.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: p.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: p.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: p.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: p.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && b.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
        return true;
      s.kind === "min" ? (t === null || s.value > t) && (t = s.value) : s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
};
ke.create = (n) => new ke({
  checks: [],
  typeName: m.ZodNumber,
  coerce: (n == null ? void 0 : n.coerce) || false,
  ...y(n)
});
var U = class _U extends v {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== l.bigint)
      return this._getInvalidInput(e);
    let t;
    const s = new N();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (t = this._getOrReturnCtx(e, t), u(t, {
        code: d.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (t = this._getOrReturnCtx(e, t), u(t, {
        code: d.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), u(t, {
        code: d.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : b.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return u(t, {
      code: d.invalid_type,
      expected: l.bigint,
      received: t.parsedType
    }), g;
  }
  gte(e, t) {
    return this.setLimit("min", e, true, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, false, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, true, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, false, p.toString(t));
  }
  setLimit(e, t, s, a) {
    return new _U({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: s,
          message: p.toString(a)
        }
      ]
    });
  }
  _addCheck(e) {
    return new _U({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: p.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: p.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: p.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: p.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
};
U.create = (n) => new U({
  checks: [],
  typeName: m.ZodBigInt,
  coerce: (n == null ? void 0 : n.coerce) ?? false,
  ...y(n)
});
var xe = class extends v {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== l.boolean) {
      const t = this._getOrReturnCtx(e);
      return u(t, {
        code: d.invalid_type,
        expected: l.boolean,
        received: t.parsedType
      }), g;
    }
    return x(e.data);
  }
};
xe.create = (n) => new xe({
  typeName: m.ZodBoolean,
  coerce: (n == null ? void 0 : n.coerce) || false,
  ...y(n)
});
var Se = class Fe extends v {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== l.date) {
      const a = this._getOrReturnCtx(e);
      return u(a, {
        code: d.invalid_type,
        expected: l.date,
        received: a.parsedType
      }), g;
    }
    if (Number.isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return u(a, {
        code: d.invalid_date
      }), g;
    }
    const t = new N();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), u(s, {
        code: d.too_small,
        message: a.message,
        inclusive: true,
        exact: false,
        minimum: a.value,
        type: "date"
      }), t.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), u(s, {
        code: d.too_big,
        message: a.message,
        inclusive: true,
        exact: false,
        maximum: a.value,
        type: "date"
      }), t.dirty()) : b.assertNever(a);
    return {
      status: t.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Fe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: p.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: p.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
};
Se.create = (n) => new Se({
  checks: [],
  coerce: (n == null ? void 0 : n.coerce) || false,
  typeName: m.ZodDate,
  ...y(n)
});
var Ne = class extends v {
  _parse(e) {
    if (this._getType(e) !== l.symbol) {
      const t = this._getOrReturnCtx(e);
      return u(t, {
        code: d.invalid_type,
        expected: l.symbol,
        received: t.parsedType
      }), g;
    }
    return x(e.data);
  }
};
Ne.create = (n) => new Ne({
  typeName: m.ZodSymbol,
  ...y(n)
});
var Ce = class extends v {
  _parse(e) {
    if (this._getType(e) !== l.undefined) {
      const t = this._getOrReturnCtx(e);
      return u(t, {
        code: d.invalid_type,
        expected: l.undefined,
        received: t.parsedType
      }), g;
    }
    return x(e.data);
  }
};
Ce.create = (n) => new Ce({
  typeName: m.ZodUndefined,
  ...y(n)
});
var Te = class extends v {
  _parse(e) {
    if (this._getType(e) !== l.null) {
      const t = this._getOrReturnCtx(e);
      return u(t, {
        code: d.invalid_type,
        expected: l.null,
        received: t.parsedType
      }), g;
    }
    return x(e.data);
  }
};
Te.create = (n) => new Te({
  typeName: m.ZodNull,
  ...y(n)
});
var ce = class extends v {
  constructor() {
    super(...arguments), this._any = true;
  }
  _parse(e) {
    return x(e.data);
  }
};
ce.create = (n) => new ce({
  typeName: m.ZodAny,
  ...y(n)
});
var Ze = class extends v {
  constructor() {
    super(...arguments), this._unknown = true;
  }
  _parse(e) {
    return x(e.data);
  }
};
Ze.create = (n) => new Ze({
  typeName: m.ZodUnknown,
  ...y(n)
});
var E = class extends v {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return u(t, {
      code: d.invalid_type,
      expected: l.never,
      received: t.parsedType
    }), g;
  }
};
E.create = (n) => new E({
  typeName: m.ZodNever,
  ...y(n)
});
var Oe = class extends v {
  _parse(e) {
    if (this._getType(e) !== l.undefined) {
      const t = this._getOrReturnCtx(e);
      return u(t, {
        code: d.invalid_type,
        expected: l.void,
        received: t.parsedType
      }), g;
    }
    return x(e.data);
  }
};
Oe.create = (n) => new Oe({
  typeName: m.ZodVoid,
  ...y(n)
});
var q = class Y extends v {
  _parse(e) {
    const { ctx: t, status: s } = this._processInputParams(e), a = this._def;
    if (t.parsedType !== l.array)
      return u(t, {
        code: d.invalid_type,
        expected: l.array,
        received: t.parsedType
      }), g;
    if (a.exactLength !== null) {
      const r = t.data.length > a.exactLength.value, o = t.data.length < a.exactLength.value;
      (r || o) && (u(t, {
        code: r ? d.too_big : d.too_small,
        minimum: o ? a.exactLength.value : void 0,
        maximum: r ? a.exactLength.value : void 0,
        type: "array",
        inclusive: true,
        exact: true,
        message: a.exactLength.message
      }), s.dirty());
    }
    if (a.minLength !== null && t.data.length < a.minLength.value && (u(t, {
      code: d.too_small,
      minimum: a.minLength.value,
      type: "array",
      inclusive: true,
      exact: false,
      message: a.minLength.message
    }), s.dirty()), a.maxLength !== null && t.data.length > a.maxLength.value && (u(t, {
      code: d.too_big,
      maximum: a.maxLength.value,
      type: "array",
      inclusive: true,
      exact: false,
      message: a.maxLength.message
    }), s.dirty()), t.common.async)
      return Promise.all([...t.data].map((r, o) => a.type._parseAsync(new $(t, r, t.path, o)))).then((r) => N.mergeArray(s, r));
    const i = [...t.data].map((r, o) => a.type._parseSync(new $(t, r, t.path, o)));
    return N.mergeArray(s, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new Y({
      ...this._def,
      minLength: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new Y({
      ...this._def,
      maxLength: { value: e, message: p.toString(t) }
    });
  }
  length(e, t) {
    return new Y({
      ...this._def,
      exactLength: { value: e, message: p.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
};
q.create = (n, e) => new q({
  type: n,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: m.ZodArray,
  ...y(e)
});
function M(n) {
  if (n instanceof T) {
    const e = {};
    for (const t in n.shape) {
      const s = n.shape[t];
      e[t] = I.create(M(s));
    }
    return new T({
      ...n._def,
      shape: () => e
    });
  } else return n instanceof q ? new q({
    ...n._def,
    type: M(n.element)
  }) : n instanceof I ? I.create(M(n.unwrap())) : n instanceof V ? V.create(M(n.unwrap())) : n instanceof R ? R.create(n.items.map((e) => M(e))) : n;
}
var T = class S extends v {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = b.objectKeys(e);
    return this._cached = { shape: e, keys: t }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== l.object) {
      const c = this._getOrReturnCtx(e);
      return u(c, {
        code: d.invalid_type,
        expected: l.object,
        received: c.parsedType
      }), g;
    }
    const { status: t, ctx: s } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), r = [];
    if (!(this._def.catchall instanceof E && this._def.unknownKeys === "strip"))
      for (const c in s.data)
        i.includes(c) || r.push(c);
    const o = [];
    for (const c of i) {
      const h = a[c], _ = s.data[c];
      o.push({
        key: { status: "valid", value: c },
        value: h._parse(new $(s, _, s.path, c)),
        alwaysSet: c in s.data
      });
    }
    if (this._def.catchall instanceof E) {
      const c = this._def.unknownKeys;
      if (c === "passthrough")
        for (const h of r)
          o.push({
            key: { status: "valid", value: h },
            value: { status: "valid", value: s.data[h] }
          });
      else if (c === "strict")
        r.length > 0 && (u(s, {
          code: d.unrecognized_keys,
          keys: r
        }), t.dirty());
      else if (c !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const c = this._def.catchall;
      for (const h of r) {
        const _ = s.data[h];
        o.push({
          key: { status: "valid", value: h },
          value: c._parse(
            new $(s, _, s.path, h)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: h in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const c = [];
      for (const h of o) {
        const _ = await h.key, w = await h.value;
        c.push({
          key: _,
          value: w,
          alwaysSet: h.alwaysSet
        });
      }
      return c;
    }).then((c) => N.mergeObjectSync(t, c)) : N.mergeObjectSync(t, o);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return p.errToObj, new S({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, s) => {
          var a, i;
          const r = ((i = (a = this._def).errorMap) == null ? void 0 : i.call(a, t, s).message) ?? s.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: p.errToObj(e).message ?? r
          } : {
            message: r
          };
        }
      } : {}
    });
  }
  strip() {
    return new S({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new S({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new S({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new S({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: m.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new S({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    for (const s of b.objectKeys(e))
      e[s] && this.shape[s] && (t[s] = this.shape[s]);
    return new S({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    for (const s of b.objectKeys(this.shape))
      e[s] || (t[s] = this.shape[s]);
    return new S({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return M(this);
  }
  partial(e) {
    const t = {};
    for (const s of b.objectKeys(this.shape)) {
      const a = this.shape[s];
      e && !e[s] ? t[s] = a : t[s] = a.optional();
    }
    return new S({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    for (const s of b.objectKeys(this.shape))
      if (e && !e[s])
        t[s] = this.shape[s];
      else {
        let a = this.shape[s];
        for (; a instanceof I; )
          a = a._def.innerType;
        t[s] = a;
      }
    return new S({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return Me(b.objectKeys(this.shape));
  }
};
T.create = (n, e) => new T({
  shape: () => n,
  unknownKeys: "strip",
  catchall: E.create(),
  typeName: m.ZodObject,
  ...y(e)
});
T.strictCreate = (n, e) => new T({
  shape: () => n,
  unknownKeys: "strict",
  catchall: E.create(),
  typeName: m.ZodObject,
  ...y(e)
});
T.lazycreate = (n, e) => new T({
  shape: n,
  unknownKeys: "strip",
  catchall: E.create(),
  typeName: m.ZodObject,
  ...y(e)
});
var Q = class extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = this._def.options;
    function a(i) {
      for (const o of i)
        if (o.result.status === "valid")
          return o.result;
      for (const o of i)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const r = i.map((o) => new C(o.ctx.common.issues));
      return u(t, {
        code: d.invalid_union,
        unionErrors: r
      }), g;
    }
    if (t.common.async)
      return Promise.all(s.map(async (i) => {
        const r = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await i._parseAsync({
            data: t.data,
            path: t.path,
            parent: r
          }),
          ctx: r
        };
      })).then(a);
    {
      let i;
      const r = [];
      for (const c of s) {
        const h = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, _ = c._parseSync({
          data: t.data,
          path: t.path,
          parent: h
        });
        if (_.status === "valid")
          return _;
        _.status === "dirty" && !i && (i = { result: _, ctx: h }), h.common.issues.length && r.push(h.common.issues);
      }
      if (i)
        return t.common.issues.push(...i.ctx.common.issues), i.result;
      const o = r.map((c) => new C(c));
      return u(t, {
        code: d.invalid_union,
        unionErrors: o
      }), g;
    }
  }
  get options() {
    return this._def.options;
  }
};
Q.create = (n, e) => new Q({
  options: n,
  typeName: m.ZodUnion,
  ...y(e)
});
function de(n, e) {
  const t = O(n), s = O(e);
  if (n === e)
    return { valid: true, data: n };
  if (t === l.object && s === l.object) {
    const a = b.objectKeys(e), i = b.objectKeys(n).filter((o) => a.indexOf(o) !== -1), r = { ...n, ...e };
    for (const o of i) {
      const c = de(n[o], e[o]);
      if (!c.valid)
        return { valid: false };
      r[o] = c.data;
    }
    return { valid: true, data: r };
  } else if (t === l.array && s === l.array) {
    if (n.length !== e.length)
      return { valid: false };
    const a = [];
    for (let i = 0; i < n.length; i++) {
      const r = n[i], o = e[i], c = de(r, o);
      if (!c.valid)
        return { valid: false };
      a.push(c.data);
    }
    return { valid: true, data: a };
  } else return t === l.date && s === l.date && +n == +e ? { valid: true, data: n } : { valid: false };
}
var ee = class extends v {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), a = (i, r) => {
      if (ve(i) || ve(r))
        return g;
      const o = de(i.value, r.value);
      return o.valid ? ((be(i) || be(r)) && t.dirty(), { status: t.value, value: o.data }) : (u(s, {
        code: d.invalid_intersection_types
      }), g);
    };
    return s.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      }),
      this._def.right._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      })
    ]).then(([i, r]) => a(i, r)) : a(this._def.left._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }), this._def.right._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }));
  }
};
ee.create = (n, e, t) => new ee({
  left: n,
  right: e,
  typeName: m.ZodIntersection,
  ...y(t)
});
var R = class _R extends v {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== l.array)
      return u(s, {
        code: d.invalid_type,
        expected: l.array,
        received: s.parsedType
      }), g;
    if (s.data.length < this._def.items.length)
      return u(s, {
        code: d.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      }), g;
    !this._def.rest && s.data.length > this._def.items.length && (u(s, {
      code: d.too_big,
      maximum: this._def.items.length,
      inclusive: true,
      exact: false,
      type: "array"
    }), t.dirty());
    const a = [...s.data].map((i, r) => {
      const o = this._def.items[r] || this._def.rest;
      return o ? o._parse(new $(s, i, s.path, r)) : null;
    }).filter((i) => !!i);
    return s.common.async ? Promise.all(a).then((i) => N.mergeArray(t, i)) : N.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new _R({
      ...this._def,
      rest: e
    });
  }
};
R.create = (n, e) => {
  if (!Array.isArray(n))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new R({
    items: n,
    typeName: m.ZodTuple,
    rest: null,
    ...y(e)
  });
};
var Ae = class extends v {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== l.map)
      return u(s, {
        code: d.invalid_type,
        expected: l.map,
        received: s.parsedType
      }), g;
    const a = this._def.keyType, i = this._def.valueType, r = [...s.data.entries()].map(([o, c], h) => ({
      key: a._parse(new $(s, o, s.path, [h, "key"])),
      value: i._parse(new $(s, c, s.path, [h, "value"]))
    }));
    if (s.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of r) {
          const h = await c.key, _ = await c.value;
          if (h.status === "aborted" || _.status === "aborted")
            return g;
          (h.status === "dirty" || _.status === "dirty") && t.dirty(), o.set(h.value, _.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const c of r) {
        const h = c.key, _ = c.value;
        if (h.status === "aborted" || _.status === "aborted")
          return g;
        (h.status === "dirty" || _.status === "dirty") && t.dirty(), o.set(h.value, _.value);
      }
      return { status: t.value, value: o };
    }
  }
};
Ae.create = (n, e, t) => new Ae({
  valueType: e,
  keyType: n,
  typeName: m.ZodMap,
  ...y(t)
});
var H = class _H extends v {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== l.set)
      return u(s, {
        code: d.invalid_type,
        expected: l.set,
        received: s.parsedType
      }), g;
    const a = this._def;
    a.minSize !== null && s.data.size < a.minSize.value && (u(s, {
      code: d.too_small,
      minimum: a.minSize.value,
      type: "set",
      inclusive: true,
      exact: false,
      message: a.minSize.message
    }), t.dirty()), a.maxSize !== null && s.data.size > a.maxSize.value && (u(s, {
      code: d.too_big,
      maximum: a.maxSize.value,
      type: "set",
      inclusive: true,
      exact: false,
      message: a.maxSize.message
    }), t.dirty());
    const i = this._def.valueType;
    function r(c) {
      const h = /* @__PURE__ */ new Set();
      for (const _ of c) {
        if (_.status === "aborted")
          return g;
        _.status === "dirty" && t.dirty(), h.add(_.value);
      }
      return { status: t.value, value: h };
    }
    const o = [...s.data.values()].map((c, h) => i._parse(new $(s, c, s.path, h)));
    return s.common.async ? Promise.all(o).then((c) => r(c)) : r(o);
  }
  min(e, t) {
    return new _H({
      ...this._def,
      minSize: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new _H({
      ...this._def,
      maxSize: { value: e, message: p.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
};
H.create = (n, e) => new H({
  valueType: n,
  minSize: null,
  maxSize: null,
  typeName: m.ZodSet,
  ...y(e)
});
var Ie = class extends v {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
};
Ie.create = (n, e) => new Ie({
  getter: n,
  typeName: m.ZodLazy,
  ...y(e)
});
var ue = class extends v {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return u(t, {
        received: t.data,
        code: d.invalid_literal,
        expected: this._def.value
      }), g;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
};
ue.create = (n, e) => new ue({
  value: n,
  typeName: m.ZodLiteral,
  ...y(e)
});
function Me(n, e) {
  return new me({
    values: n,
    typeName: m.ZodEnum,
    ...y(e)
  });
}
var me = class le extends v {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return u(t, {
        expected: b.joinValues(s),
        received: t.parsedType,
        code: d.invalid_type
      }), g;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return u(t, {
        received: t.data,
        code: d.invalid_enum_value,
        options: s
      }), g;
    }
    return x(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return le.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return le.create(this.options.filter((s) => !e.includes(s)), {
      ...this._def,
      ...t
    });
  }
};
me.create = Me;
var $e = class extends v {
  _parse(e) {
    const t = b.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== l.string && s.parsedType !== l.number) {
      const a = b.objectValues(t);
      return u(s, {
        expected: b.joinValues(a),
        received: s.parsedType,
        code: d.invalid_type
      }), g;
    }
    if (this._cache || (this._cache = new Set(b.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const a = b.objectValues(t);
      return u(s, {
        received: s.data,
        code: d.invalid_enum_value,
        options: a
      }), g;
    }
    return x(e.data);
  }
  get enum() {
    return this._def.values;
  }
};
$e.create = (n, e) => new $e({
  values: n,
  typeName: m.ZodNativeEnum,
  ...y(e)
});
var te = class extends v {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== l.promise && t.common.async === false)
      return u(t, {
        code: d.invalid_type,
        expected: l.promise,
        received: t.parsedType
      }), g;
    const s = t.parsedType === l.promise ? t.data : Promise.resolve(t.data);
    return x(s.then((a) => this._def.type.parseAsync(a, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
};
te.create = (n, e) => new te({
  type: n,
  typeName: m.ZodPromise,
  ...y(e)
});
var D = class extends v {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === m.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), a = this._def.effect || null, i = {
      addIssue: (r) => {
        u(s, r), r.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (i.addIssue = i.addIssue.bind(i), a.type === "preprocess") {
      const r = a.transform(s.data, i);
      if (s.common.async)
        return Promise.resolve(r).then(async (o) => {
          if (t.value === "aborted")
            return g;
          const c = await this._def.schema._parseAsync({
            data: o,
            path: s.path,
            parent: s
          });
          return c.status === "aborted" ? g : c.status === "dirty" || t.value === "dirty" ? ie(c.value) : c;
        });
      {
        if (t.value === "aborted")
          return g;
        const o = this._def.schema._parseSync({
          data: r,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? g : o.status === "dirty" || t.value === "dirty" ? ie(o.value) : o;
      }
    }
    if (a.type === "refinement") {
      const r = (o) => {
        const c = a.refinement(o, i);
        if (s.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (s.common.async === false) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? g : (o.status === "dirty" && t.dirty(), r(o.value), { status: t.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => o.status === "aborted" ? g : (o.status === "dirty" && t.dirty(), r(o.value).then(() => ({ status: t.value, value: o.value }))));
    }
    if (a.type === "transform")
      if (s.common.async === false) {
        const r = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!L(r))
          return g;
        const o = a.transform(r.value, i);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((r) => L(r) ? Promise.resolve(a.transform(r.value, i)).then((o) => ({
          status: t.value,
          value: o
        })) : g);
    b.assertNever(a);
  }
};
D.create = (n, e, t) => new D({
  schema: n,
  typeName: m.ZodEffects,
  effect: e,
  ...y(t)
});
D.createWithPreprocess = (n, e, t) => new D({
  schema: e,
  effect: { type: "preprocess", transform: n },
  typeName: m.ZodEffects,
  ...y(t)
});
var I = class extends v {
  _parse(e) {
    return this._getType(e) === l.undefined ? x(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
I.create = (n, e) => new I({
  innerType: n,
  typeName: m.ZodOptional,
  ...y(e)
});
var V = class extends v {
  _parse(e) {
    return this._getType(e) === l.null ? x(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
V.create = (n, e) => new V({
  innerType: n,
  typeName: m.ZodNullable,
  ...y(e)
});
var he = class extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let s = t.data;
    return t.parsedType === l.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
he.create = (n, e) => new he({
  innerType: n,
  typeName: m.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...y(e)
});
var pe = class extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, a = this._def.innerType._parse({
      data: s.data,
      path: s.path,
      parent: {
        ...s
      }
    });
    return X(a) ? a.then((i) => ({
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new C(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new C(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
};
pe.create = (n, e) => new pe({
  innerType: n,
  typeName: m.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...y(e)
});
var Ee = class extends v {
  _parse(e) {
    if (this._getType(e) !== l.nan) {
      const t = this._getOrReturnCtx(e);
      return u(t, {
        code: d.invalid_type,
        expected: l.nan,
        received: t.parsedType
      }), g;
    }
    return { status: "valid", value: e.data };
  }
};
Ee.create = (n) => new Ee({
  typeName: m.ZodNaN,
  ...y(n)
});
var ut = class extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = t.data;
    return this._def.type._parse({
      data: s,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var _e = class __e extends v {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return a.status === "aborted" ? g : a.status === "dirty" ? (t.dirty(), ie(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: s.path,
          parent: s
        });
      })();
    {
      const a = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      });
      return a.status === "aborted" ? g : a.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: a.value
      }) : this._def.out._parseSync({
        data: a.value,
        path: s.path,
        parent: s
      });
    }
  }
  static create(e, t) {
    return new __e({
      in: e,
      out: t,
      typeName: m.ZodPipeline
    });
  }
};
var fe = class extends v {
  _parse(e) {
    const t = this._def.innerType._parse(e), s = (a) => (L(a) && (a.value = Object.freeze(a.value)), a);
    return X(t) ? t.then((a) => s(a)) : s(t);
  }
  unwrap() {
    return this._def.innerType;
  }
};
fe.create = (n, e) => new fe({
  innerType: n,
  typeName: m.ZodReadonly,
  ...y(e)
});
var m;
(function(n) {
  n.ZodString = "ZodString", n.ZodNumber = "ZodNumber", n.ZodNaN = "ZodNaN", n.ZodBigInt = "ZodBigInt", n.ZodBoolean = "ZodBoolean", n.ZodDate = "ZodDate", n.ZodSymbol = "ZodSymbol", n.ZodUndefined = "ZodUndefined", n.ZodNull = "ZodNull", n.ZodAny = "ZodAny", n.ZodUnknown = "ZodUnknown", n.ZodNever = "ZodNever", n.ZodVoid = "ZodVoid", n.ZodArray = "ZodArray", n.ZodObject = "ZodObject", n.ZodUnion = "ZodUnion", n.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", n.ZodIntersection = "ZodIntersection", n.ZodTuple = "ZodTuple", n.ZodRecord = "ZodRecord", n.ZodMap = "ZodMap", n.ZodSet = "ZodSet", n.ZodFunction = "ZodFunction", n.ZodLazy = "ZodLazy", n.ZodLiteral = "ZodLiteral", n.ZodEnum = "ZodEnum", n.ZodEffects = "ZodEffects", n.ZodNativeEnum = "ZodNativeEnum", n.ZodOptional = "ZodOptional", n.ZodNullable = "ZodNullable", n.ZodDefault = "ZodDefault", n.ZodCatch = "ZodCatch", n.ZodPromise = "ZodPromise", n.ZodBranded = "ZodBranded", n.ZodPipeline = "ZodPipeline", n.ZodReadonly = "ZodReadonly";
})(m || (m = {}));
var lt = A.create;
var ht = ce.create;
E.create;
q.create;
var pt = T.create;
Q.create;
ee.create;
R.create;
var ft = ue.create;
me.create;
te.create;
I.create;
V.create;
var mt = "1.8.0";
var _t = {
  version: mt
};
var gt = class {
  constructor(e) {
    this._client = e;
  }
  /**
   * Retrieves information about the account associated with the current session.
   *
   * This method allows an application to get details about the TelemetryOS account
   * in which it is currently running.
   *
   * @returns A promise that resolves to the current account object
   */
  async getCurrent() {
    const e = await this._client.request("accounts.getCurrent", {});
    if (!e.success)
      throw new Error("Failed to fetch current account");
    return e.account;
  }
};
var yt = class {
  constructor(e) {
    this._client = e;
  }
  /**
   * Retrieves all applications with a specific mount point within the current account.
   *
   * This method allows applications that host other applications to discover compatible
   * applications that can be embedded. For example, a dashboard application might search
   * for all applications that have a 'dashboard-widget' mount point.
   *
   * The results are scoped to the current account, so only applications associated with
   * the same account will be returned.
   *
   * @param mountPoint The mount point identifier to search for
   * @returns A promise that resolves to an array of applications having the specified mount point
   */
  async getAllByMountPoint(e) {
    return (await this._client.request("applications.getAllByMountPoint", {
      mountPoint: e
    })).applications;
  }
  /**
   * Retrieves an application by its name.
   *
   * This method allows finding a specific application when you know its name. It's useful
   * when you need to check if a particular application is available or get its details
   * before attempting to embed it.
   *
   * @param name The name of the application to query for
   * @returns A promise that resolves to the application object if found, or null if not found
   */
  async getByName(e) {
    return (await this._client.request("applications.getByName", {
      name: e
    })).application;
  }
  /**
   * Sets the dependencies for the current application.
   *
   * This method allows an application to declare which other applications it depends on.
   * The player will download and prepare these dependencies before they can be loaded.
   *
   * IMPORTANT: This method must be called and awaited before loading any sub-applications
   * in iframes. Only applications that return as 'ready' should be loaded.
   *
   * @param applicationSpecifiers An array of application specifiers that this application depends on
   * @returns A promise that resolves with arrays of ready and unavailable application specifiers
   *
   * @example
   * ```typescript
   * const result = await client.applications.setDependencies(['app1-hash', 'app2-hash'])
   * // result.ready: ['app1-hash'] - these can be loaded in iframes
   * // result.unavailable: ['app2-hash'] - these failed to load
   * ```
   */
  async setDependencies(e) {
    return await this._client.request("applications.setDependencies", {
      applicationSpecifiers: e
    });
  }
  /**
   * Registers a message interceptor for client messages from sub-applications.
   *
   * Interceptors allow a root application to handle messages from embedded child applications
   * before they bubble up to the parent window. When an interceptor is registered, client messages
   * with the specified name will be transformed into bridge messages that are handled locally
   * and forwarded to child frames.
   *
   * This is useful for implementing custom communication patterns between root applications
   * and their embedded sub-applications, such as coordinating theme changes, state
   * synchronization, or custom routing logic.
   *
   * @param name The message name to intercept
   * @param interceptor A function that receives the message data and returns a BridgeMessage
   * @throws Error if an interceptor is already bound for the specified message name
   *
   * @example
   * ```typescript
   * import { applications } from '@telemetryos/root-sdk'
   *
   * // Intercept color scheme requests from sub-applications
   * applications().bind('theme.getColorScheme', (data) => {
   *   const colors = getCurrentColorScheme()
   *   return {
   *     name: 'theme.colorScheme',
   *     data: { primary: colors.primary, secondary: colors.secondary }
   *   }
   * })
   * ```
   */
  bind(e, t) {
    if (this._client._messageInterceptors.has(e))
      throw new Error(`Interceptor already bound for message ${e}`);
    this._client._messageInterceptors.set(e, t);
  }
};
var vt = class {
  constructor(e) {
    this._client = e;
  }
  /**
   * Retrieves hardware information about the current physical device.
   *
   * This method returns details about the device running the application, such as
   * serial number, model, manufacturer, and platform. This information is only
   * available when running on a physical device (player), not in the admin UI.
   *
   * @returns A promise that resolves to the device hardware information
   * @example
   * // Get hardware info of the current device
   * const info = await devices.getInformation();
   * console.log(`Device: ${info.deviceManufacturer} ${info.deviceModel}`);
   */
  async getInformation() {
    const e = await this._client.request("devices.getInformation", {});
    if (!e.success)
      throw new Error("Failed to get device information");
    return e.deviceInformation;
  }
};
var bt = class {
  constructor(e) {
    this._client = e;
  }
  async getColorScheme() {
    return (await this._client.request("environment.getColorScheme", {})).colorScheme;
  }
  async subscribeColorScheme(e) {
    return (await this._client.subscribe("environment.subscribeColorScheme", {}, e)).success;
  }
  async unsubscribeColorScheme(e) {
    return (await this._client.unsubscribe("environment.unsubscribeColorScheme", {}, e)).success;
  }
};
var wt = class {
  constructor(e) {
    this._client = e;
  }
  /**
   * Retrieves all media folders in the account.
   *
   * @returns A promise that resolves to an array of all media folders
   */
  async getAllFolders() {
    return (await this._client.request("mediaFolders.getAll", {})).folders;
  }
  /**
   * Retrieves all media content within a specific folder.
   *
   * @param folderId The unique identifier of the folder
   * @returns A promise that resolves to an array of media content in the folder
   */
  async getAllByFolderId(e) {
    return (await this._client.request("media.getAllByFolderId", {
      folderId: e
    })).contents;
  }
  /**
   * Retrieves media content that has been tagged with a specific tag.
   *
   * @param tagName The name of the tag to search for
   * @returns A promise that resolves to an array of media content with the specified tag
   */
  async getAllByTag(e) {
    return (await this._client.request("media.getAllByTag", {
      tagName: e
    })).contents;
  }
  /**
   * Retrieves a specific media content item by its ID.
   *
   * @param id The unique identifier of the media content to retrieve
   * @returns A promise that resolves to the media content with the specified ID
   */
  async getById(e) {
    return (await this._client.request("media.getById", {
      id: e
    })).content;
  }
};
var kt = class {
  constructor(e) {
    this._client = e;
  }
  async fetch(e, t) {
    var s;
    let a;
    typeof e == "string" ? a = e : e instanceof URL ? a = e.toString() : (a = e.url, t || (t = {
      method: e.method,
      headers: e.headers,
      body: e.body,
      credentials: e.credentials,
      cache: e.cache,
      redirect: e.redirect,
      referrer: e.referrer,
      integrity: e.integrity
    }));
    let i = {};
    t != null && t.headers && (t.headers instanceof Headers ? t.headers.forEach((_, w) => {
      i[w] = _;
    }) : Array.isArray(t.headers) ? t.headers.forEach(([_, w]) => {
      i[_] = w;
    }) : i = t.headers);
    const r = await this._client.request("proxy.fetch", {
      url: a,
      method: (t == null ? void 0 : t.method) || "GET",
      headers: i,
      body: (s = t == null ? void 0 : t.body) !== null && s !== void 0 ? s : null
    });
    if (!r.success)
      throw new TypeError(r.errorMessage, {
        cause: r.errorCause ? Error(r.errorCause) : void 0
      });
    const o = new Headers(r.headers), c = {
      status: r.status,
      statusText: r.statusText,
      headers: o
    };
    let h = null;
    if (r.body !== null && r.body !== void 0)
      if (r.bodyType === "binary") {
        const _ = atob(r.body), w = new Uint8Array(_.length);
        for (let Z = 0; Z < _.length; Z++)
          w[Z] = _.charCodeAt(Z);
        h = w;
      } else r.bodyType === "text" ? h = r.body : r.bodyType === "json" && (h = JSON.stringify(r.body));
    return new Response(h, c);
  }
};
var xt = class {
  constructor(e) {
    this._client = e;
  }
  /**
   * Provides access to the application store scope.
   *
   * Data stored in the application scope is shared across all instances of your application
   * within the current account. Use this scope for application-wide settings, shared resources,
   * or any data that should be consistent across all instances.
   *
   * @returns A StoreSlice instance for the application scope
   */
  get application() {
    return new K("application", "", this._client);
  }
  /**
   * Provides access to the instance store scope.
   *
   * Data stored in the instance scope is only available to the current instance of your
   * application. This is ideal for instance-specific settings, UI state, temporary data,
   * or any information that shouldn't be shared with other instances.
   *
   * The namespace for instance data includes both the application name and the instance ID.
   *
   * @returns A StoreSlice instance for the instance scope
   */
  get instance() {
    return new K("instance", this._client.applicationInstance, this._client);
  }
  /**
   * Provides access to the device store scope.
   *
   * Data stored in the device scope is only available to the application on the
   * current physical device. This is useful for device-specific settings, caching, or
   * any data that should persist across application instances but only on a single device.
   *
   * Note: This scope cannot be used for Settings-related mount points as the User
   * Administration UI does not run on a device.
   *
   * @returns A StoreSlice instance for the device scope
   */
  get device() {
    return new K("device", this._client.applicationInstance, this._client);
  }
  /**
   * Provides access to the shared store scope with a specified namespace.
   *
   * The shared scope enables data sharing between different applications within the
   * same account. By specifying a common namespace, any two applications can exchange
   * data and communicate with each other.
   *
   * This is particularly useful for application ecosystems where multiple applications
   * need to coordinate or share configuration.
   *
   * @param namespace A string identifier for the shared data space
   * @returns A StoreSlice instance for the specified shared namespace
   */
  shared(e) {
    return new K("shared", e, this._client);
  }
};
var K = class {
  constructor(e, t, s) {
    this._kind = e, this._namespace = t, this._client = s;
  }
  /**
   * Saves a value in the store.
   *
   * This method stores data under the specified key within the current store scope and namespace.
   * The value must be serializable (can be converted to JSON). Complex objects like Date instances
   * will be serialized and deserialize as regular objects, losing their prototype methods.
   *
   * @param key The key to save the value under
   * @param value The value to store - must be JSON serializable
   * @returns A promise that resolves to true if the value was saved successfully
   */
  async set(e, t) {
    return (await this._client.request("store.set", {
      kind: this._kind,
      namespace: this._namespace,
      key: e,
      value: t
    })).success;
  }
  /**
   * Retrieves a value from the store.
   *
   * This method fetches data stored under the specified key within the current store scope
   * and namespace. For real-time applications that need to respond to changes, consider
   * using subscribe() instead.
   *
   * @template T The expected type of the stored value
   * @param key The key to retrieve the value for
   * @returns A promise that resolves to the stored value, or undefined if the key does not exist
   */
  async get(e) {
    return (await this._client.request("store.get", {
      kind: this._kind,
      namespace: this._namespace,
      key: e
    })).value;
  }
  /**
   * Subscribes to changes in the store for a specific key.
   *
   * This method sets up a subscription that will call the provided handler whenever
   * the value associated with the specified key changes. This is the recommended way
   * to access store data in long-running applications that need to stay responsive
   * to data changes.
   *
   * @param key The key to subscribe to
   * @param handler The callback function to call when the value changes
   * @returns A promise that resolves to true if the subscription was successful
   */
  async subscribe(e, t) {
    return (await this._client.subscribe("store.subscribe", {
      kind: this._kind,
      namespace: this._namespace,
      key: e
    }, t)).success;
  }
  /**
   * Unsubscribes from changes in the store for a specific key.
   *
   * This method removes a subscription previously created with subscribe(). It can
   * either remove a specific handler or all handlers for the given key.
   *
   * @param key The key to unsubscribe from
   * @param handler Optional. The specific handler to remove. If not provided, all handlers for this key will be removed.
   * @returns A promise that resolves to true if the unsubscribe was successful
   */
  async unsubscribe(e, t) {
    return (await this._client.unsubscribe("store.unsubscribe", {
      kind: this._kind,
      namespace: this._namespace,
      key: e
    }, t)).success;
  }
  /**
   * Deletes a value from the store.
   *
   * This method removes the data stored under the specified key within the
   * current store scope and namespace.
   *
   * @param key The key to delete
   * @returns A promise that resolves to true if the value was deleted successfully
   */
  async delete(e) {
    return (await this._client.request("store.delete", {
      kind: this._kind,
      namespace: this._namespace,
      key: e
    })).success;
  }
};
var St = class {
  constructor(e) {
    this._client = e;
  }
  /**
   * Retrieves information about the user associated with the current session.
   *
   * This method allows an application to get details about the TelemetryOS user
   * who is currently using the application.
   *
   * @returns A promise that resolves to the current user result object
   * @example
   * // Get the current user information
   * const userResult = await users.getCurrent();
   * console.log(`Current user ID: ${userResult.user.id}`);
   */
  async getCurrent() {
    const e = await this._client.request("users.getCurrent", {});
    if (!e.success)
      throw new Error("Failed to fetch current user");
    return e.user;
  }
};
var Nt = class {
  constructor(e) {
    this._client = e;
  }
  /**
   * Retrieves current weather conditions for a specified location.
   *
   * @param params - Weather request parameters including location and units
   * @returns A promise that resolves to the current weather conditions
   * @throws {Error} If the request fails or location is invalid
   *
   * @example
   * ```typescript
   * // Get weather by city
   * const weather = await weather.getConditions({ city: 'New York', units: 'imperial' })
   *
   * // Get weather by postal code
   * const weather = await weather.getConditions({ postalCode: '10001', units: 'metric' })
   *
   * // Get weather by coordinates
   * const weather = await weather.getConditions({ lat: '40.7128', lon: '-74.0060' })
   * ```
   */
  async getConditions(e) {
    const t = await this._client.request("weather.getConditions", e);
    if (!t.success || !t.conditions)
      throw new Error(t.error || "Failed to fetch weather conditions");
    return t.conditions;
  }
  /**
   * Retrieves daily weather forecast for a specified location.
   *
   * @param params - Forecast request parameters including location, units, and number of days
   * @returns A promise that resolves to an array of daily forecast data
   * @throws {Error} If the request fails or location is invalid
   *
   * @example
   * ```typescript
   * // Get 5-day forecast
   * const forecast = await weather.getDailyForecast({
   *   city: 'London',
   *   units: 'metric',
   *   days: 5
   * })
   * ```
   */
  async getDailyForecast(e) {
    const t = await this._client.request("weather.getDailyForecast", e);
    if (!t.success || !t.forecast)
      throw new Error(t.error || "Failed to fetch daily forecast");
    return t.forecast;
  }
  /**
   * Retrieves hourly weather forecast for a specified location.
   *
   * @param params - Forecast request parameters including location, units, and number of hours
   * @returns A promise that resolves to an array of hourly forecast data
   * @throws {Error} If the request fails or location is invalid
   *
   * @example
   * ```typescript
   * // Get 24-hour forecast
   * const forecast = await weather.getHourlyForecast({
   *   city: 'Tokyo',
   *   units: 'metric',
   *   hours: 24
   * })
   * ```
   */
  async getHourlyForecast(e) {
    const t = await this._client.request("weather.getHourlyForecast", e);
    if (!t.success || !t.forecast)
      throw new Error(t.error || "Failed to fetch hourly forecast");
    return t.forecast;
  }
};
var Ct = class {
  constructor(e) {
    this._client = e;
  }
  /**
   * Retrieves all available currency symbols and their full names.
   *
   * @returns A promise that resolves to a mapping of currency codes to their full names
   * @throws {Error} If the request fails
   *
   * @example
   * ```typescript
   * const symbols = await currency().getSymbols()
   * // { "USD": "United States Dollar", "EUR": "Euro", ... }
   * ```
   */
  async getSymbols() {
    const e = await this._client.request("currency.getSymbols", {});
    if (!e.success || !e.symbols)
      throw new Error("Failed to fetch currency symbols");
    return e.symbols;
  }
  /**
   * Retrieves current exchange rates for a base currency against target currencies.
   *
   * @param params - Currency rate request parameters including base currency and target symbols
   * @returns A promise that resolves to a mapping of currency codes to their exchange rates
   * @throws {Error} If the request fails or currencies are invalid
   *
   * @example
   * ```typescript
   * // Get exchange rates for USD against EUR, GBP, and JPY
   * const rates = await currency().getRates({
   *   base: 'USD',
   *   symbols: 'EUR,GBP,JPY'
   * })
   * // { "EUR": 0.92, "GBP": 0.79, "JPY": 149.50 }
   * ```
   */
  async getRates(e) {
    var t, s, a;
    const i = await this._client.request("currency.getRates", e);
    if (!i.success || !i.rates)
      throw ((t = i.error) === null || t === void 0 ? void 0 : t.code) === 201 ? new Error(`Invalid base currency '${e.base}'`) : ((s = i.error) === null || s === void 0 ? void 0 : s.code) === 202 ? new Error(`Invalid target currency symbol '${e.symbols}'`) : new Error(((a = i.error) === null || a === void 0 ? void 0 : a.message) || "Failed to fetch currency rates");
    return i.rates;
  }
};
function W(n) {
  return { ...n, type: "client" };
}
var Tt = pt({
  type: ft("bridge"),
  name: lt(),
  data: ht()
});
var Zt = class {
  /**
   * Creates a new RootSettingsNavigation API instance.
   *
   * @param store The Store instance to use for persistence
   * @throws {Error} If used by an application not mounted at the 'rootSettingsNavigation' mount point
   */
  constructor(e) {
    if (e._client._applicationSpecifier !== "rootSettingsNavigation")
      throw new Error("RootSettingsNavigation can only be used in the rootSettingsNavigation mount point");
    this._store = e;
  }
  /**
   * Registers navigation entries for the root application in the TelemetryOS admin UI.
   *
   * This method allows a root application to define its sidebar navigation structure
   * within the TelemetryOS administration UI. The navigation entries will appear in the
   * sidebar menu, allowing users to navigate to different sections of the application.
   *
   * @param navigation An object containing the navigation entries to register
   * @returns A promise that resolves when the navigation has been registered
   */
  async setRootSettingsNavigation(e) {
    var t;
    const s = this._store.shared("root-settings-navigation"), a = (t = await s.get("navigation")) !== null && t !== void 0 ? t : {}, i = this._store._client._applicationSpecifier;
    a[i] = {
      applicationSpecifier: i,
      entries: e.entries
    }, s.set("navigation", a);
  }
  /**
   * Retrieves the current navigation entries for this root application.
   *
   * This method returns the navigation structure that was previously registered
   * for this application using setRootSettingsNavigation().
   *
   * @returns A promise that resolves to the navigation state for this application
   */
  async getRootSettingsNavigation() {
    var e;
    const t = (e = await this._store.shared("root-settings-navigation").get("navigation")) !== null && e !== void 0 ? e : {}, s = this._store._client._applicationSpecifier;
    return t[s];
  }
  /**
   * Retrieves the navigation entries for all root applications.
   *
   * This method returns the navigation structures for all root applications registered
   * in the TelemetryOS administration UI. This can be useful for coordination between
   * different root applications.
   *
   * @returns A promise that resolves to the navigation state for all applications
   */
  async getAllRootSettingsNavigation() {
    var e;
    return (e = await this._store.shared("root-settings-navigation").get("navigation")) !== null && e !== void 0 ? e : {};
  }
};
var F = 1e3 * 30;
var ge = typeof window > "u" && typeof self < "u";
var B = ge ? self : window;
function z(n) {
  ge ? self.postMessage(n) : B.parent.postMessage(n, "*");
}
var Ot = class {
  /**
   * Creates a new Client instance for communicating with the TelemetryOS platform.
   *
   * Note that creating a Client instance alone is not sufficient to begin communication.
   * You must also call the bind() method to initialize event listeners and extract
   * the application ID from the URL.
   *
   * @param applicationName The name of your application - must match the 'name' property
   *                        in your application's telemetry.config.json file
   */
  constructor(e) {
    this._applicationName = e, this._applicationInstance = "", this._applicationSpecifier = "", this._messageInterceptors = /* @__PURE__ */ new Map(), this._onHandlers = /* @__PURE__ */ new Map(), this._onceHandlers = /* @__PURE__ */ new Map(), this._subscriptionNamesByHandler = /* @__PURE__ */ new Map(), this._subscriptionNamesBySubjectName = /* @__PURE__ */ new Map();
  }
  /**
   * Provides access to the accounts API for retrieving TelemetryOS account information.
   *
   * This property returns a new Accounts instance that allows querying information
   * about the current TelemetryOS account.
   *
   * NOTE: Most application developers should use the global accounts() function
   * instead of accessing this property directly.
   *
   * @returns An Accounts instance bound to this client
   */
  get accounts() {
    return new gt(this);
  }
  /**
   * Provides access to the users API for retrieving TelemetryOS user information.
   *
   * This property returns a new Users instance that allows querying information
   * about the current TelemetryOS user.
   *
   * NOTE: Most application developers should use the global users() function
   * instead of accessing this property directly.
   *
   * @returns A Users instance bound to this client
   */
  get users() {
    return new St(this);
  }
  /**
   * Provides access to the store API for data persistence with multiple storage scopes.
   *
   * This property returns a new Store instance that allows saving, retrieving, and
   * subscribing to data changes across different scopes (application, instance, device, shared).
   *
   * NOTE: Most application developers should use the global store() function
   * instead of accessing this property directly.
   *
   * @returns A Store instance bound to this client
   */
  get store() {
    return new xt(this);
  }
  /**
   * Provides access to the applications API for discovering other TelemetryOS applications.
   *
   * This property returns a new Applications instance that allows querying for applications
   * by name or mount point, and setting application dependencies.
   *
   * NOTE: Most application developers should use the global applications() function
   * instead of accessing this property directly.
   *
   * @returns An Applications instance bound to this client
   */
  get applications() {
    return new yt(this);
  }
  /**
   * Provides access to the media API for working with content hosted on the TelemetryOS platform.
   *
   * This property returns a new Media instance that allows applications to browse and access
   * media content uploaded to TelemetryOS. Applications can query folders, retrieve content,
   * and access media files.
   *
   * NOTE: Most application developers should use the global media() function
   * instead of accessing this property directly.
   *
   * @returns A Media instance bound to this client
   */
  get media() {
    return new wt(this);
  }
  /**
   * Provides access to the proxy API for fetching third-party content through the TelemetryOS API.
   *
   * This property returns a new Proxy instance that allows applications to fetch content from external
   * URLs through the platform, which handles authentication, caching, and CORS issues.
   *
   * NOTE: Most application developers should use the global proxy() function
   * instead of accessing this property directly.
   *
   * @returns A Proxy instance bound to this client
   */
  get proxy() {
    return new kt(this);
  }
  /**
   * Provides access to the devices API for interacting with the current device.
   *
   * This property returns a new Devices instance that allows applications to get information
   * about the specific device the application is running on, subscribe to device changes,
   * and access device hardware information.
   *
   * NOTE: Most application developers should use the global devices() function
   * instead of accessing this property directly.
   *
   * @returns A Devices instance bound to this client
   */
  get devices() {
    return new vt(this);
  }
  /**
   * Provides access to the root settings navigation API for TelemetryOS administration UI integration.
   *
   * NOTE: This API is not intended for most application developers. It is specifically designed
   * for root applications that need to integrate with the TelemetryOS administration UI.
   *
   * This property returns a new RootSettingsNavigation instance that allows root applications
   * to register sidebar navigation entries in the TelemetryOS administration UI.
   *
   * Most root application developers should use the global rootSettingsNavigation() function
   * instead of accessing this property directly.
   *
   * @returns A RootSettingsNavigation instance bound to this client
   * @throws {Error} If used by an application not mounted at the 'rootSettingsNavigation' mount point
   */
  get rootSettingsNavigation() {
    return new Zt(this.store);
  }
  /**
   * Provides access to the weather API for retrieving weather data.
   *
   * This property returns a new Weather instance that allows applications to fetch
   * current weather conditions and forecasts through the TelemetryOS API.
   *
   * NOTE: Most application developers should use the global weather() function
   * instead of accessing this property directly.
   *
   * @returns A Weather instance bound to this client
   */
  get weather() {
    return new Nt(this);
  }
  /**
   * Provides access to the currency API for retrieving currency exchange rates.
   *
   * This property returns a new Currency instance that allows applications to fetch
   * currency symbols and exchange rates through the TelemetryOS API.
   *
   * NOTE: Most application developers should use the global currency() function
   * instead of accessing this property directly.
   *
   * @returns A Currency instance bound to this client
   */
  get currency() {
    return new Ct(this);
  }
  /**
   * Provides access to the environment API for accessing environment settings.
   *
   * This property returns a new Environment instance that allows applications to get
   * and subscribe to environment settings such as the current color scheme.
   *
   * NOTE: Most application developers should use the global environment() function
   * instead of accessing this property directly.
   *
   * @returns An Environment instance bound to this client
   */
  get environment() {
    return new bt(this);
  }
  get applicationName() {
    return this._applicationName;
  }
  get applicationSpecifier() {
    return this._applicationSpecifier;
  }
  get applicationInstance() {
    return this._applicationInstance;
  }
  /**
   * Initializes the client by setting up message listeners and extracting the application ID.
   *
   * This method must be called after creating a Client instance and before using any
   * of its communication methods. It performs two important tasks:
   *
   * 1. Sets up an event listener for window 'message' events to receive messages
   *    from the TelemetryOS platform
   * 2. Extracts the application ID from the URL's query parameters
   *
   * The application ID is used by several APIs, including the store's local and deviceLocal scopes.
   *
   * NOTE: Most application developers should use the global configure() function instead
   * of creating and binding their own Client instances.
   */
  bind() {
    var e, t, s;
    const a = new URL(B.location.href), i = a.searchParams;
    if (this._applicationInstance = (e = i.get("applicationInstance")) !== null && e !== void 0 ? e : "", !this._applicationInstance)
      throw new Error("Missing applicationInstance query parameter");
    if (this._applicationSpecifier = (t = i.get("applicationSpecifier")) !== null && t !== void 0 ? t : "", !this._applicationSpecifier) {
      const r = a.hostname.split(".");
      this._applicationSpecifier = (s = r[0]) !== null && s !== void 0 ? s : "";
    }
    if (!this._applicationSpecifier || this._applicationSpecifier.length !== 40)
      throw new Error(`Invalid applicationSpecifier: expected 40-character hash, got "${this._applicationSpecifier}"`);
    this._windowMessageHandler = (r) => {
      if (r.source === B || !r.data || !("type" in r.data) || r.data.type !== "client" && r.data.type !== "bridge")
        return;
      let o;
      if (r.data.type === "client") {
        const c = this._messageInterceptors.get(r.data.name);
        if (!c) {
          z(r.data);
          return;
        }
        o = { ...c(r.data.data), type: "bridge" };
      }
      if (!o) {
        const c = Tt.safeParse(r.data);
        if (!c.success)
          return;
        o = c.data;
        const h = this._onHandlers.get(o.name), _ = this._onceHandlers.get(o.name);
        if (h)
          for (const w of h)
            w(o.data);
        if (_) {
          for (const w of _)
            w(o.data);
          this._onceHandlers.delete(o.name);
        }
      }
      if (!ge)
        for (let c = 0; c < window.frames.length; c += 1)
          window.frames[c].postMessage(o, "*");
    }, B.addEventListener("message", this._windowMessageHandler);
  }
  /**
   * Removes the message event listener and cleans up resources.
   *
   * Call this method when you're done with the client to prevent memory leaks
   * and ensure proper cleanup. After calling unbind(), the client will no longer
   * receive messages from the TelemetryOS platform.
   *
   * Note that this does not cancel any active subscriptions or server-side resources.
   * You should explicitly unsubscribe from any subscriptions before unbinding.
   *
   * NOTE: Most application developers should use the global destroy() function instead
   * of managing their own Client instances.
   */
  unbind() {
    this._windowMessageHandler && B.removeEventListener("message", this._windowMessageHandler);
  }
  /**
   * Sends a one-way message to the TelemetryOS platform.
   *
   * Use this method for fire-and-forget messages where no response is expected.
   * The message is sent to the parent window using the postMessage API and includes
   * metadata such as the SDK version and application name.
   *
   * NOTE: Most application developers should use the resource-specific APIs or the global
   * send() function instead of using this method directly.
   *
   * @param name The name of the message type to send
   * @param data The data payload to include with the message
   */
  send(e, t) {
    const s = W({
      telemetrySdkVersion: G,
      applicationName: this._applicationName,
      applicationSpecifier: this._applicationSpecifier,
      applicationInstance: this._applicationInstance,
      name: e,
      data: t
    });
    z(s);
  }
  /**
   * Sends a message to the TelemetryOS platform and waits for a response.
   *
   * This method implements a request-response pattern over the postMessage API.
   * It generates a unique correlation ID and sets up a listener for the response.
   * If no response is received within the timeout period (30 seconds by default),
   * the promise will reject.
   *
   * NOTE: Most application developers should use the resource-specific APIs or the global
   * request() function instead of using this method directly.
   *
   * @template D The expected type of the response data
   * @param name The name of the message type (endpoint) to request
   * @param data The data payload to include with the request
   * @returns A promise that resolves with the response data when received
   * @throws {Error} If the request times out
   */
  request(e, t) {
    const s = J(), a = W({
      telemetrySdkVersion: G,
      applicationName: this._applicationName,
      applicationSpecifier: this._applicationSpecifier,
      applicationInstance: this._applicationInstance,
      name: e,
      data: t,
      responseName: s
    });
    z(a);
    let i = false, r;
    const o = new Promise((h, _) => {
      const w = new Error(`${e} message request with response name of ${s} timed out after ${F}`);
      setTimeout(() => {
        i = true, this.off(s, r), _(w);
      }, F);
    }), c = new Promise((h) => {
      r = (_) => {
        i || h(_);
      }, this.once(s, h);
    });
    return Promise.race([o, c]);
  }
  async subscribe(e, t, s) {
    let a, i;
    typeof t == "function" ? i = t : (a = t, i = s);
    const r = J(), o = J();
    let c = this._subscriptionNamesBySubjectName.get(e);
    c || (c = [], this._subscriptionNamesBySubjectName.set(e, c)), c.push(r), this._subscriptionNamesByHandler.set(i, r), this.on(r, i);
    const h = W({
      telemetrySdkVersion: G,
      applicationName: this._applicationName,
      applicationSpecifier: this._applicationSpecifier,
      applicationInstance: this._applicationInstance,
      name: e,
      data: a,
      responseName: o,
      subscriptionName: r
    });
    z(h);
    let _ = false, w;
    const Z = new Promise((j, P) => {
      const ae = new Error(`${e} subscribe request with subscription name of ${r} and response name of ${o} timed out after ${F}`);
      setTimeout(() => {
        _ = true, this.off(o, w), P(ae);
      }, F);
    }), se = new Promise((j) => {
      w = (P) => {
        _ || j(P);
      }, this.on(o, j);
    });
    return Promise.race([Z, se]);
  }
  async unsubscribe(e, t, s) {
    let a, i;
    typeof t == "function" ? i = t : (a = t, i = s);
    const r = J();
    let o = [];
    if (i) {
      const c = this._subscriptionNamesByHandler.get(i);
      if (!c)
        return { success: false };
      o = [c], this._subscriptionNamesByHandler.delete(i);
    } else if (!this._subscriptionNamesBySubjectName.get(e))
      return { success: false };
    for await (const c of o) {
      this.off(c, i);
      const h = W({
        telemetrySdkVersion: G,
        applicationInstance: this._applicationInstance,
        applicationName: this._applicationName,
        applicationSpecifier: this._applicationSpecifier,
        name: e,
        data: a,
        responseName: r,
        unsubscribeName: c
      });
      z(h);
      let _ = false, w;
      const Z = new Promise((j, P) => {
        const ae = new Error(`${e} unsubscribe request with unsubscribe name of ${c} and response name of ${r} timed out after ${F}`);
        setTimeout(() => {
          _ = true, this.off(r, w), P(ae);
        }, F);
      }), se = new Promise((j) => {
        w = (P) => {
          _ || j(P);
        }, this.once(r, j);
      });
      if (!(await Promise.race([Z, se])).success)
        return { success: false };
    }
    return { success: true };
  }
  /**
   * Registers a handler function for a specific message type.
   *
   * The handler will be called each time a message with the specified name is received.
   * You can register multiple handlers for the same message type, and all will be executed
   * when that message is received.
   *
   * Unlike subscribe(), this method only sets up a local event listener and doesn't
   * notify the platform of your interest in a particular message type.
   *
   * NOTE: Most application developers should use the resource-specific APIs or the global
   * on() function instead of using this method directly.
   *
   * @template T The expected type of the message data
   * @param name The name of the message type to listen for
   * @param handler The callback function to execute when messages are received
   */
  on(e, t) {
    var s;
    const a = (s = this._onHandlers.get(e)) !== null && s !== void 0 ? s : [];
    a.length === 0 && this._onHandlers.set(e, a), a.push(t);
  }
  /**
   * Registers a one-time handler for a specific message type.
   *
   * Similar to the on() method, but the handler will be automatically removed
   * after it is called once. This is useful for initialization events or operations
   * that should only happen once in response to a particular message.
   *
   * NOTE: Most application developers should use the resource-specific APIs or the global
   * once() function instead of using this method directly.
   *
   * @template T The expected type of the message data
   * @param name The name of the message type to listen for
   * @param handler The callback function to execute when the message is received
   */
  once(e, t) {
    var s;
    const a = (s = this._onceHandlers.get(e)) !== null && s !== void 0 ? s : [];
    a.length === 0 && this._onceHandlers.set(e, a), a.push(t);
  }
  /**
   * Removes previously registered message handlers.
   *
   * Use this method to stop receiving messages of a specific type or to remove
   * specific handler functions when they're no longer needed. This applies to
   * handlers registered with both on() and once() methods.
   *
   * NOTE: Most application developers should use the resource-specific APIs or the global
   * off() function instead of using this method directly.
   *
   * @template T The expected type of the message data
   * @param name The name of the message type to stop listening for
   * @param handler Optional. The specific handler function to remove. If omitted,
   *                all handlers for this message type will be removed.
   */
  off(e, t) {
    const s = this._onHandlers.get(e), a = this._onceHandlers.get(e);
    if (!(!s && !a)) {
      if (s) {
        for (let i = 0; i < s.length; i += 1)
          t && s[i] !== t || (s.splice(i, 1), i -= 1);
        s.length === 0 && this._onHandlers.delete(e);
      }
      if (a) {
        for (let i = 0; i < a.length; i += 1)
          t && a[i] !== t || (a.splice(i, 1), i -= 1);
        a.length === 0 && this._onceHandlers.delete(e);
      }
    }
  }
};
function J() {
  return Math.random().toString(36).slice(2, 9);
}
var G = _t.version;
var At = class {
  constructor(e) {
    this._client = e;
  }
  /**
   * Activates a named override on the device.
   *
   * Overrides can be used to temporarily change device behavior, such as
   * displaying special content, triggering alerts, or modifying the playback schedule.
   *
   * @param name The name/identifier of the override to activate
   * @returns A promise that resolves to true if successful
   * @example
   * // Activate an emergency alert override
   * await overrides().setOverride('emergency-alert');
   *
   * @example
   * // Activate a promotional content override
   * await overrides().setOverride('promo-mode');
   */
  async setOverride(e) {
    if (!(await this._client.request("overrides.setOverride", { name: e })).success)
      throw new Error("Failed to set override");
    return true;
  }
  /**
   * Deactivates a named override on the device.
   *
   * This removes a previously set override, returning the device to normal operation
   * or allowing other overrides to take effect.
   *
   * @param name The name/identifier of the override to deactivate
   * @returns A promise that resolves to true if successful
   * @example
   * // Clear an emergency alert override
   * await overrides().clearOverride('emergency-alert');
   *
   * @example
   * // Clear promotional mode when no longer needed
   * await overrides().clearOverride('promo-mode');
   */
  async clearOverride(e) {
    if (!(await this._client.request("overrides.clearOverride", {
      name: e
    })).success)
      throw new Error("Failed to clear override");
    return true;
  }
};
var It = class {
  constructor(e) {
    this._client = e;
  }
  /**
   * Advances to the next page in the current playlist.
   *
   * @returns A promise that resolves to true if successful
   * @example
   * // Move to the next page
   * await playlist().nextPage();
   */
  async nextPage() {
    if (!(await this._client.request("playlist.nextPage", {})).success)
      throw new Error("Failed to advance to next page");
    return true;
  }
  /**
   * Returns to the previous page in the current playlist.
   *
   * @returns A promise that resolves to true if successful
   * @example
   * // Move to the previous page
   * await playlist().previousPage();
   */
  async previousPage() {
    if (!(await this._client.request("playlist.previousPage", {})).success)
      throw new Error("Failed to return to previous page");
    return true;
  }
  /**
   * Sets the display duration for the current page.
   *
   * This allows the embedded application to dynamically adjust how long
   * the current page is displayed before advancing to the next page.
   *
   * @param duration The duration in milliseconds
   * @returns A promise that resolves to true if successful
   * @example
   * // Set page duration to 10 seconds
   * await playlist().setDuration(10000);
   *
   * @example
   * // Extend duration based on content
   * if (hasMoreContent) {
   *   await playlist().setDuration(30000); // 30 seconds
   * }
   */
  async setDuration(e) {
    if (!(await this._client.request("playlist.setDuration", {
      duration: e
    })).success)
      throw new Error("Failed to set page duration");
    return true;
  }
};
var $t = class extends Ot {
  get playlist() {
    return new It(this);
  }
  get overrides() {
    return new At(this);
  }
};
var f = null;
function zt() {
  return f;
}
function Bt(n) {
  f = new $t(n), f.bind();
}
function Ut() {
  f == null || f.unbind(), f = null;
}
function Ht(...n) {
  return k(f), f.on(...n);
}
function Kt(...n) {
  return k(f), f.once(...n);
}
function Wt(...n) {
  return k(f), f.off(...n);
}
function Jt(...n) {
  return k(f), f.send(...n);
}
function Gt(...n) {
  return k(f), f.request(...n);
}
function Yt(...n) {
  return k(f), f.subscribe(...n);
}
function Xt(...n) {
  return k(f), f.unsubscribe(...n);
}
function Qt() {
  return k(f), f.store;
}
function es() {
  return k(f), f.applications;
}
function ts() {
  return k(f), f.media;
}
function ss() {
  return k(f), f.accounts;
}
function as() {
  return k(f), f.users;
}
function ns() {
  return k(f), f.devices;
}
function rs() {
  return k(f), f.proxy;
}
function is() {
  return k(f), f.weather;
}
function os() {
  return k(f), f.currency;
}
function cs() {
  return k(f), f.environment;
}
function ds() {
  return k(f), f.playlist;
}
function us() {
  return k(f), f.overrides;
}
function k(n) {
  if (!n)
    throw new Error("SDK is not configured");
}

export {
  gt,
  yt,
  vt,
  bt,
  wt,
  kt,
  xt,
  K,
  St,
  Nt,
  Ct,
  G,
  zt,
  Bt,
  Ut,
  Ht,
  Kt,
  Wt,
  Jt,
  Gt,
  Yt,
  Xt,
  Qt,
  es,
  ts,
  ss,
  as,
  ns,
  rs,
  is,
  os,
  cs,
  ds,
  us
};
//# sourceMappingURL=chunk-JF6SAR7X.js.map
