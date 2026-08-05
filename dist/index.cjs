var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/index.js
var index_exports = {};
__export(index_exports, {
  Contracts: () => Contracts,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/lib/Contracts.js
var _Contracts_static, check_fn, checkDebug_fn;
var _Contracts = class _Contracts {
  /**
   * Configures the contract checking behavior.
   * @param {{debug?: boolean}} config Configuration object
   */
  static setConfig(config) {
    if (config) {
      _Contracts.DEBUG_MODE = config.debug || false;
    }
  }
  /**
   * Checks a general condition.
   * If `isOk` is false and an `error` class is provided, throws an exception with `ngMsg`.
   * Otherwise, logs the error message to `console.error`.
   * @param   {boolean}   isOk      The result of the condition check.
   * @param   {string}    [ngMsg]   The error message.
   * @param   {new (...args: any[]) => Error}  [error=Error] The error class to throw (Error or its subclass).
   * @param   {Object<string, *>}    [eProps={}]   Properties to assign to the error instance.
   * @return  {boolean} The evaluation result (returns `isOk` as is).
   */
  static VERIFY(isOk, ngMsg, error = Error, eProps = {}) {
    var _a;
    return __privateMethod(_a = _Contracts, _Contracts_static, check_fn).call(_a, isOk, "VERIFY", ngMsg, error, eProps);
  }
  /**
   * Checks a general condition (for debugging: outputs execution message but throws no exception in debug mode).
   * If the result is false and an `error` class is provided, throws an exception.
   * Otherwise, logs the message to `console.error`.
   * @param   {boolean}   isOk      The result of the condition check.
   * @param   {string}    [ngMsg]   The error message.
   * @param   {new (...args: any[]) => Error}  [error]   The error class to throw (Error or its subclass).
   * @param   {Object<string, *>}    [eProps={}]   Properties to assign to the error instance.
   * @return  {boolean} The evaluation result (returns `isOk` as is).
   */
  static VERIFY_DEBUG(isOk, ngMsg, error = Error, eProps = {}) {
    var _a;
    return __privateMethod(_a = _Contracts, _Contracts_static, checkDebug_fn).call(_a, isOk, "VERIFY_DEBUG", ngMsg, error, eProps);
  }
  /**
   * Checks a precondition.
   * Use this to verify conditions that must be true before a function executes (e.g., argument validation).
   * If `isOk` is false and an `error` class is provided, throws an exception with `ngMsg`.
   * Otherwise, logs the error message to `console.error`.
   * @param   {boolean}   isOk      The result of the condition check.
   * @param   {string}    [ngMsg]   The error message.
   * @param   {new (...args: any[]) => Error}  [error=Error] The error class to throw (Error or its subclass).
   * @param   {Object<string, *>}    [eProps={}]   Properties to assign to the error instance.
   * @return  {boolean} The evaluation result (returns `isOk` as is).
   */
  static REQUIRE(isOk, ngMsg, error = Error, eProps = {}) {
    var _a;
    return __privateMethod(_a = _Contracts, _Contracts_static, check_fn).call(_a, isOk, "REQUIRE", ngMsg, error, eProps);
  }
  /**
   * Checks a precondition (for debugging: outputs execution message but throws no exception in debug mode).
   * If the result is false and an `error` class is provided, throws an exception.
   * Otherwise, logs the message to `console.error`.
   * @param   {boolean}   isOk      The result of the condition check.
   * @param   {string}    [ngMsg]   The error message.
   * @param   {new (...args: any[]) => Error}  [error]   The error class to throw (Error or its subclass).
   * @param   {Object<string, *>}    [eProps={}]   Properties to assign to the error instance.
   * @return  {boolean} The evaluation result (returns `isOk` as is).
   */
  static REQUIRE_DEBUG(isOk, ngMsg, error = Error, eProps = {}) {
    var _a;
    return __privateMethod(_a = _Contracts, _Contracts_static, checkDebug_fn).call(_a, isOk, "REQUIRE_DEBUG", ngMsg, error, eProps);
  }
  /**
   * Checks a postcondition.
   * Use this to verify conditions that must be true after a function executes (e.g., return value or object state).
   * If `isOk` is false and an `error` class is provided, throws an exception with `ngMsg`.
   * Otherwise, logs the error message to `console.error`.
   * @param   {boolean}   isOk      The result of the condition check.
   * @param   {string}    [ngMsg]   The error message.
   * @param   {new (...args: any[]) => Error}  [error=Error] The error class to throw (Error or its subclass).
   * @param   {Object<string, *>}    [eProps={}]   Properties to assign to the error instance.
   * @return  {boolean} The evaluation result (returns `isOk` as is).
   */
  static ENSURE(isOk, ngMsg, error = Error, eProps = {}) {
    var _a;
    return __privateMethod(_a = _Contracts, _Contracts_static, check_fn).call(_a, isOk, "ENSURE", ngMsg, error, eProps);
  }
  /**
   * Checks a postcondition (for debugging: outputs execution message but throws no exception in debug mode).
   * If the result is false and an `error` class is provided, throws an exception.
   * Otherwise, logs the message to `console.error`.
   * @param   {boolean}   isOk      The result of the condition check.
   * @param   {string}    [ngMsg]   The error message.
   * @param   {new (...args: any[]) => Error}  [error]   The error class to throw (Error or its subclass).
   * @param   {Object<string, *>}    [eProps={}]   Properties to assign to the error instance.
   * @return  {boolean} The evaluation result (returns `isOk` as is).
   */
  static ENSURE_DEBUG(isOk, ngMsg, error = Error, eProps = {}) {
    var _a;
    return __privateMethod(_a = _Contracts, _Contracts_static, checkDebug_fn).call(_a, isOk, "ENSURE_DEBUG", ngMsg, error, eProps);
  }
  /**
   * Checks an invariant.
   * Use this to verify conditions that must remain true before and after a function call (e.g., object integrity).
   * If `isOk` is false and an `error` class is provided, throws an exception with `ngMsg`.
   * Otherwise, logs the error message to `console.error`.
   * @param   {boolean}   isOk      The result of the condition check.
   * @param   {string}    [ngMsg]   The error message.
   * @param   {new (...args: any[]) => Error}  [error=Error] The error class to throw (Error or its subclass).
   * @param   {Object<string, *>}    [eProps={}]   Properties to assign to the error instance.
   * @return  {boolean} The evaluation result (returns `isOk` as is).
   */
  static INVARIANT(isOk, ngMsg, error = Error, eProps = {}) {
    var _a;
    return __privateMethod(_a = _Contracts, _Contracts_static, check_fn).call(_a, isOk, "INVARIANT", ngMsg, error, eProps);
  }
  /**
   * Checks an invariant (for debugging: outputs execution message but throws no exception in debug mode).
   * If the result is false and an `error` class is provided, throws an exception.
   * Otherwise, logs the message to `console.error`.
   * @param   {boolean}   isOk      The result of the condition check.
   * @param   {string}    [ngMsg]   The error message.
   * @param   {new (...args: any[]) => Error}  [error]   The error class to throw (Error or its subclass).
   * @param   {Object<string, *>}    [eProps={}]   Properties to assign to the error instance.
   * @return  {boolean} The evaluation result (returns `isOk` as is).
   */
  static INVARIANT_DEBUG(isOk, ngMsg, error = Error, eProps = {}) {
    var _a;
    return __privateMethod(_a = _Contracts, _Contracts_static, checkDebug_fn).call(_a, isOk, "INVARIANT_DEBUG", ngMsg, error, eProps);
  }
};
_Contracts_static = new WeakSet();
check_fn = function(isOk, prefix = "CHECK", ngMsg = "", error = Error, eProps = {}) {
  if (!isOk) {
    const msg = `[${prefix}]${ngMsg ?? ""}`;
    if (error) throw Object.assign(new error(msg), eProps);
    if (ngMsg) console.error(msg, eProps);
  }
  return isOk;
};
checkDebug_fn = function(isOk, prefix = "CHECK_DEBUG", ngMsg = "", error = Error, eProps = {}) {
  var _a;
  return _Contracts.DEBUG_MODE ? __privateMethod(_a = _Contracts, _Contracts_static, check_fn).call(_a, isOk, prefix, ngMsg, error, eProps) : isOk;
};
__privateAdd(_Contracts, _Contracts_static);
// @type {boolean}
__publicField(_Contracts, "DEBUG_MODE", false);
var Contracts = _Contracts;

// src/index.js
var index_default = Contracts;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Contracts
});
