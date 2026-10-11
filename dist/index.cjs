"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Contracts: () => Contracts,
  createContracts: () => createContracts,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/lib/Contracts.ts
var defaultConf = {
  debug: false,
  logger: console,
  returnType: "void"
};
var Contracts = createContracts(defaultConf);
function createContracts(config = defaultConf) {
  const currentConf = { ...defaultConf, ...config };
  const evaluate = (isOk) => {
    return typeof isOk === "function" ? isOk() : isOk;
  };
  const check = (prefix, isOk, ngMsg, ErrorClass, eParams, eProps) => {
    const ok = evaluate(isOk);
    if (!ok) {
      const msg = `[${prefix}] ${ngMsg ?? ""}`;
      if (ErrorClass) {
        const err = eParams ? new ErrorClass(msg, eParams) : new ErrorClass(msg);
        eProps && Object.assign(err, eProps);
        throw err;
      }
      if (ngMsg) {
        const args = [msg];
        eParams && args.push(eParams);
        eProps && args.push(eProps);
        currentConf.logger.error(...args);
      }
    }
    return currentConf.returnType === "boolean" ? ok : void 0;
  };
  const checkDebug = (prefix, isOk, ngMsg, ErrorClass, eParams, eProps) => {
    if (ContractsImpl.DEBUG_MODE) {
      return check(prefix, isOk, ngMsg, ErrorClass, eParams, eProps);
    }
    return currentConf.returnType === "boolean" ? evaluate(isOk) : void 0;
  };
  class ContractsImpl {
    /** 
     * Static fields
     */
    /** 
     * Debug mode state.<br>
     * **Note: This property is retained for backward compatibility.<br>
     * Please use `setConfig()` to change the debug mode.**
     */
    static DEBUG_MODE = false;
    /**
     * Configures contract checking behavior.
     *
     * @param config
     * Configuration options. <br>
     * <br>
     * The `debug` property toggles the behavior—specifically, 
     * throwing an exception or outputting to the console when the condition is 
     * false—for the validation of contracts intended for use during debugging (methods ending in `_DEBUG`). <br>
     * <br>
     * When `debug` is `true`,
     * methods ending with `_DEBUG` perform validation. <br>
     * <br>
     * When `debug` is `false`,
     * methods ending with `_DEBUG` skip validation. <br>
     *  <br>
     * Is the `logger` property is specified, 
     * it is used instead of the standard logger, `console`.
     * This module uses only the `error` method of the `logger`. <br>
     * <br>
     * Note: If the value of a property is `undefined` or `null`, it is treated as unspecified.
     * 
     * @param reset
     * If `true`, unspecified values are saved to the settings as default values. <br>
     * If `false`, unspecified values remain at their current settings.
     *
     * @example
     * // Use a logger that is slightly more advanced than the standard logger—namely, `console`.
     * import { PrettyConsole } from '@ayapapa-npm/pretty-console-js';
     * 
     * const prettyConsole = new PrettyConsole();
     * Contracts.setConfig({ debug: true, logger: prettyConsole });
     * // Node: ` The `logger` property is optional.
     */
    static setConfig(config2, reset = true) {
      const rConf = { ...config2 };
      for (const key of Object.keys(rConf)) {
        if (rConf[key] == null) delete rConf[key];
      }
      if (reset) Object.assign(currentConf, defaultConf);
      Object.assign(currentConf, rConf);
      ContractsImpl.DEBUG_MODE = currentConf.debug;
    }
    /**
     * Get the default configurations.
     * @returns Default configurations.
     */
    static getDefaultConfig() {
      return { ...defaultConf };
    }
    /**
     * Get the current configurations.
     * @returns Default configurations.
     */
    static getConfig() {
      currentConf.debug = ContractsImpl.DEBUG_MODE;
      return { ...currentConf };
    }
    /**
     * Reset the current configurations to the default configurations.
     * @returns Default configurations.
     */
    static resetConfig() {
      ContractsImpl.setConfig({}, true);
    }
    /**
     * Verifies an intermediate condition during execution.
     *
     * @param isOk  Condition value(`boolean`) or callback function whit return `boolean`.
     * @param ngMsg Failure message.
     * @param ErrorClass Error constructor used when the check fails.
     * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
     * Supported values:
     * - `Error` (default)
     * - `TypeError`
     * - `RangeError`
     * - Custom Error subclasses
     * - `null` to skip throwing and log the failure.
     * @param eParams Parameter options following the message passed to the Error constructor.
     * @param eProps  Additional properties assigned to the error object.
     * @returns  Returns the original condition value or `void`.
     * @example
     * const result = calculate();
     * Contracts.VERIFY(
     *   result >= 0,
     *   'Calculation result must not be negative'
     * );
     * 
     */
    static VERIFY(isOk, ngMsg, ErrorClass = Error, eParams, eProps) {
      return check("VERIFY", isOk, ngMsg, ErrorClass, eParams, eProps);
    }
    /**
     * Verifies an intermediate condition in debug mode only.
     *
     * Performs the same validation as VERIFY only when
     * `debug_mode`(internal state) is enabled.
     *
     * When `debug_mode`(internal state) is disabled,
     * no validation is performed.
     *
     * Typical usage:
     * - Validate intermediate results during development.
     * - Check internal assumptions while debugging.
     *
     * @param isOk  Condition value(`boolean`) or callback function whit return `boolean`.
     * @param ngMsg Failure message.
     * @param ErrorClass  Error constructor used when the check fails.
     * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
     * Supported values:
     * - `Error` (default)
     * - `TypeError`
     * - `RangeError`
     * - Custom Error subclasses
     * - `null` to skip throwing and log the failure.
     * @param eParams Parameter options following the message passed to the Error constructor.
     * @param eProps  Additional properties assigned to the error object.
     * @returns  Returns the original condition value or `void`.
     * @example
     * Contracts.VERIFY_DEBUG(
     *   intermediate !== null,
     *   'Intermediate value must not be null'
     * );
     */
    static VERIFY_DEBUG(isOk, ngMsg, ErrorClass = Error, eParams, eProps) {
      return checkDebug("VERIFY_DEBUG", isOk, ngMsg, ErrorClass, eParams, eProps);
    }
    /**
     * Checks a precondition before execution.
     *
     * A precondition defines conditions that must be satisfied
     * before a function or operation starts.
     *
     * The caller is responsible for satisfying preconditions.
     *
     * Typical usage:
     * - Validate function arguments.
     * - Validate required object state.
     * - Check required external conditions.
     *
     * @param isOk  Condition value(`boolean`) or callback function whit return `boolean`.
     * @param ngMsg Failure message.
     * @param ErrorClass  Error constructor used when the check fails.
     * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
     *
     * Supported values:
     * - `Error` (default)
     * - `TypeError`
     * - `RangeError`
     * - Custom Error subclasses
     * - `null` to skip throwing and log the failure.
     *
     * @param eParams Parameter options following the message passed to the Error constructor.
     * @param eProps  Additional properties assigned to the error object.
     * @returns  Returns the original condition value or `void`.
     *
     * @example
     * function divide(a, b) {
     *   Contracts.REQUIRE(
     *     typeof a === 'number',
     *     'a must be a number'
     *   );
     *
     *   Contracts.REQUIRE(
     *     b !== 0,
     *     'Divisor cannot be zero'
     *   );
     *
     *   return a / b;
     * }
     */
    static REQUIRE(isOk, ngMsg, ErrorClass = Error, eParams, eProps) {
      return check("REQUIRE", isOk, ngMsg, ErrorClass, eParams, eProps);
    }
    /**
     * Checks a precondition in debug mode only.
     *
     * Performs the same validation as REQUIRE only when
     * `debug_mode`(internal state) is enabled.
     *
     * When `debug_mode`(internal state) is disabled,
     * no validation is performed.
     *
     * Typical usage:
     * - Validate assumptions during development.
     * - Perform additional argument checks while debugging.
     *
     * @param isOk  Condition value(`boolean`) or callback function whit return `boolean`.
     * @param ngMsg Failure message.
     *
     * @param ErrorClass  Error constructor used when the check fails.
     * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
     *
     * Supported values:
     * - `Error` (default)
     * - `TypeError`
     * - `RangeError`
     * - Custom Error subclasses
     * - `null` to skip throwing and log the failure.
     *
     * @param eParams Parameter options following the message passed to the Error constructor.
     * @param eProps  Additional properties assigned to the error object.
     * @returns  Returns the original condition value or `void`.
     *
     * @example
     * Contracts.REQUIRE_DEBUG(
     *   user !== null,
     *   'User must exist during debugging'
     * );
     */
    static REQUIRE_DEBUG(isOk, ngMsg, ErrorClass = Error, eParams, eProps) {
      return checkDebug("REQUIRE_DEBUG", isOk, ngMsg, ErrorClass, eParams, eProps);
    }
    /**
     * Checks a postcondition after execution.
     *
     * A postcondition defines conditions that must be satisfied
     * after a function or operation completes.
     *
     * ENSURE represents guarantees provided by the function
     * to its caller.
     *
     * Typical usage:
     * - Validate return values.
     * - Confirm state changes.
     * - Verify that processing completed correctly.
     *
     * @param isOk  Condition value(`boolean`) or callback function whit return `boolean`.
     * @param ngMsg Failure message.
     * @param ErrorClass  Error constructor used when the check fails.
     * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
     *
     * Supported values:
     * - `Error` (default)
     * - `TypeError`
     * - `RangeError`
     * - Custom Error subclasses
     * - `null` to skip throwing and log the failure.
     *
     * @param eParams Parameter options following the message passed to the Error constructor.
     * @param eProps  Additional properties assigned to the error object.
     * @returns  Returns the original condition value or `void`.
     *
     * @example
     * function double(value) {
     *   Contracts.REQUIRE(
     *     value >= 0,
     *     'Value must not be negative'
     *   );
     *
     *   const result = value * 2;
     *
     *   Contracts.ENSURE(
     *     result >= 0,
     *     'Result must not be negative'
     *   );
     *
     *   return result;
     * }
     */
    static ENSURE(isOk, ngMsg, ErrorClass = Error, eParams, eProps) {
      return check("ENSURE", isOk, ngMsg, ErrorClass, eParams, eProps);
    }
    /**
     * Checks a postcondition in debug mode only.
     *
     * Performs the same validation as ENSURE only when
     * `debug_mode`(internal state) is enabled.
     *
     * When `debug_mode`(internal state) is disabled,
     * no validation is performed.
     *
     * Typical usage:
     * - Validate detailed results during development.
     * - Confirm internal behavior while debugging.
     *
     * @param isOk  Condition value(`boolean`) or callback function whit return `boolean`.
     * @param ngMsg Failure message.
     * @param ErrorClass  Error constructor used when the check fails.
     * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
     *
     * Supported values:
     * - `Error` (default)
     * - `TypeError`
     * - `RangeError`
     * - Custom Error subclasses
     * - `null` to skip throwing and log the failure.
     *
     * @param eParams Parameter options following the message passed to the Error constructor.
     * @param eProps  Additional properties assigned to the error object.
     * @returns  Returns the original condition value or `void`.
     *
     * @example
     * Contracts.ENSURE_DEBUG(
     *   result !== undefined,
     *   'Result should exist during debugging'
     * );
     */
    static ENSURE_DEBUG(isOk, ngMsg, ErrorClass = Error, eParams, eProps) {
      return checkDebug("ENSURE_DEBUG", isOk, ngMsg, ErrorClass, eParams, eProps);
    }
    /**
     * Checks an invariant condition.
     *
     * An invariant represents a condition that must remain valid
     * throughout the lifetime of an object or component.
     *
     * Typical usage:
     * - Validate internal object consistency.
     * - Protect class state integrity.
     * - Confirm assumptions that must always hold.
     *
     * In Design by Contract terminology,
     * INVARIANT represents conditions that must always remain true.
     *
     * @param isOk  Condition value(`boolean`) or callback function whit return `boolean`.
     * @param ngMsg Failure message.
     * @param ErrorClass  Error constructor used when the check fails.
     * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
     *
     * Supported values:
     * - `Error` (default)
     * - `TypeError`
     * - `RangeError`
     * - Custom Error subclasses
     * - `null` to skip throwing and log the failure.
     *
     * @param eParams Parameter options following the message passed to the Error constructor.
     * @param eProps  Additional properties assigned to the error object.
     * @returns  Returns the original condition value or `void`.
     *
     * @example
     * class BankAccount {
     *
     *   withdraw(amount) {
     *     this.balance -= amount;
     *
     *     Contracts.INVARIANT(
     *       this.balance >= 0,
     *       'Balance cannot be negative'
     *     );
     *   }
     *
     * }
     */
    static INVARIANT(isOk, ngMsg, ErrorClass = Error, eParams, eProps) {
      return check("INVARIANT", isOk, ngMsg, ErrorClass, eParams, eProps);
    }
    /**
     * Checks an invariant condition in debug mode only.
     *
     * Performs the same validation as INVARIANT only when
     * `debug_mode`(internal state) is enabled.
     *
     * When `debug_mode`(internal state) is disabled,
     * no validation is performed.
     *
     * Typical usage:
     * - Validate object consistency during development.
     * - Detect unexpected state changes while debugging.
     *
     * @param isOk  Condition value(`boolean`) or callback function whit return `boolean`.
     * @param ngMsg Failure message.
     * @param ErrorClass  Error constructor used when the check fails.
     * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
     *
     * Supported values:
     * - `Error` (default)
     * - `TypeError`
     * - `RangeError`
     * - Custom Error subclasses
     * - `null` to skip throwing and log the failure.
     *
     * @param eParams Parameter options following the message passed to the Error constructor.
     * @param eProps  Additional properties assigned to the error object.
     * @returns  Returns the original condition value or `void`.
     *
     * @example
     * Contracts.INVARIANT_DEBUG(
     *   cache.size < 1000,
     *   'Cache size exceeded expected limit'
     * );
     */
    static INVARIANT_DEBUG(isOk, ngMsg, ErrorClass = Error, eParams, eProps) {
      return checkDebug("INVARIANT_DEBUG", isOk, ngMsg, ErrorClass, eParams, eProps);
    }
  }
  return ContractsImpl;
}

// src/index.ts
var index_default = Contracts;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Contracts,
  createContracts
});
