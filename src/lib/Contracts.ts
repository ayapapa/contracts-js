
/** 
 * Type of the console replacement object
 */
export type LogProvider = Pick<Console,  'error'>;

/**
 * Type of the condition.
 */
export type IsOk = boolean | (() => boolean);

/**
 * Type of the custom error class type.
 */
//export type ErrorClassType = new (...args: any[]) => Error;
export type ErrorClassType<T extends Error = Error> = {
  new (...args: any[]): T;
};

/**
 * Configuration
 */
export interface Config {
  /**
   * Debug mode state.
   * If `true`, `debug_mode`(internal state) is enabled; otherwise, it is disabled.
   * Default is `false`.
   */
  debug?: boolean;

  /**
   * External logger.
   * If specified, it is used instead of the standard logger, `console`.
   * This module uses only the `error` method.
   * Default is `console`.
   */
  logger?: LogProvider;

  /**
   * The return type of the evaluation method.<br>
   * When `void` is specified as the return type and debug mode is off,
   * `XXX_DEBUG()` neither evaluates the first argument nor validates the evaluation callback.
   * As a result, any provided evaluation callback is not invoked.
   * Default is `void`.
   */
  returnType?: 'boolean' | 'void',
}

/** Type of `Config`'s key. */
export type ConfigKey = keyof Config;

/** default configuration */
const defaultConf: Readonly<Required<Config>>  = {
  debug     : false,
  logger    : console,
  returnType: 'void',
};

/**
 * Contracts.
 * 
 * For details, see [ContractsAPI](../api/ContractsApi.md) or [ContractsAPI](https://github.com/ayapapa/contracts-js/blob/main/docs/api/ContractsApi.md).
 * @see [ContractsAPI](../api/ContractsApi.md) or [ContractsAPI](https://github.com/ayapapa/contracts-js/blob/main/docs/api/ContractsApi.md).
 */
export const Contracts = createContracts(defaultConf);

/**
 * Create a contract object that does not share static fields with other contracts. 
 * @param config Configurations.
 * @returns A contract class object. Please refer to `See` for the definition of this object..
 * @see [ContractsAPI](../api/ContractsApi.md) or [ContractsAPI](https://github.com/ayapapa/contracts-js/blob/main/docs/api/ContractsApi.md).
 */
export function createContracts(config: Config = defaultConf) {

  /** Current config. */
  const currentConf: Required<Config> = { ...defaultConf, ...config };

  /**
   * @param isOk 
   * @returns 
   */
  const evaluate = (isOk: IsOk): boolean => {
    return typeof isOk === 'function' ? isOk() : isOk;
  }

  /**
   * Core contract evaluation logic.
   *
   * Evaluates a condition and handles failures.
   * All public contract methods delegate to this method.
   *
   * Behavior:
   * - When the condition is true, returns the original value.
   * - When the condition is false and ErrorClass is specified,
   *   throws an instance of the specified error class.
   * - When ErrorClass is null,
   *   logs the failure message instead of throwing.
   * 
   * @param isOk  Condition value(`boolean`) or callback function whit return `boolean`.
   * @param prefix  Contract type prefix used in the error message.
   * @param ngMsg Failure message.
   * @param ErrorClass  Error constructor used when the check fails.
   * @param eParams Parameter options following the message passed to the Error constructor.
   * @param eProps  Additional properties assigned to the error object.
   * @returns  Returns the original condition value or `void`.
   */
  const check = (
    prefix: string,
    isOk: IsOk,
    ngMsg: string | null,
    ErrorClass: ErrorClassType | null,
    eParams?: Record<string, unknown> | null,
    eProps?: Record<string, unknown> | null
  ): boolean | void =>  {

    const ok = evaluate(isOk);

    if (!ok) {
      const msg = `[${prefix}] ${ngMsg ?? ''}`;

      if (ErrorClass) {
        //const CustomError = ErrorClass as new (...any[]) => Error;
        const err = eParams ? new ErrorClass(msg, eParams) : new ErrorClass(msg);
        // Avoid using `if` statements to circumvent issues with coverage tools.
        eProps && Object.assign(err, eProps);

        throw err;
      }

      if (ngMsg) {
        const args = [msg] as unknown[];
        eParams && args.push(eParams);
        eProps && args.push(eProps);
        currentConf.logger.error(...args);
      }
    }
    return currentConf.returnType === 'boolean' ? ok : void 0;
  }

  /**
   * Debug-only contract evaluation logic.
   * @param isOk  Condition value(`boolean`) or callback function whit return `boolean`.
   * @param prefix  Contract type prefix used in the error message.
   * @param ngMsg Failure message.
   * @param ErrorClass  Error constructor used when the check fails.
   * @param eParams Parameter options following the message passed to the Error constructor.
   * @param eProps  Additional properties assigned to the error object.
   * @returns  Returns the original condition value or `void`.
   */
  const checkDebug = (
    prefix: string,
    isOk: IsOk,
    ngMsg: string | null,
    ErrorClass: ErrorClassType | null,
    eParams?: Record<string, unknown> | null,
    eProps?: Record<string, unknown> | null
  ): boolean | void =>  {
    if (ContractsImpl.DEBUG_MODE) {
      return check(prefix, isOk, ngMsg, ErrorClass, eParams, eProps);
    }
    return currentConf.returnType === 'boolean' ? evaluate(isOk) : void 0;
  }

  /**
   * A lightweight Design by Contract library for JavaScript.
   * 
   * Provides runtime contract checks based on Design by Contract principles.
   * All check functions return the evaluated condition itself, 
   * so they can be used directly in control flow when exception throwing is suppressed.
   * 
   * ## Contract Types
   *
   * - REQUIRE (Precondition)
   *   Conditions that must be satisfied before execution starts.
   *   Used for validating input arguments and required states.
   *
   * - VERIFY (Intermediate Condition)
   *   Conditions checked during execution.
   *   Used for validating intermediate results and internal assumptions.
   *
   * - ENSURE (Postcondition)
   *   Conditions that must be satisfied after execution completes.
   *   Used for validating return values and completed state changes.
   *
   * - INVARIANT (Invariant Condition)
   *   Conditions that must remain valid throughout
   *   the lifetime of an object or component.
   *
   * ## Debug Mode
   *
   * Methods ending with `_DEBUG` execute contract checks only
   * when `debug_mode`(internal state) is enabled.
   *
   * When `debug_mode`(internal state) is disabled,
   * these methods return the original condition value
   * without performing validation.
   *
   * @module Contracts
   */
  class ContractsImpl {

    /** 
     * Static fields
     */

    /** 
     * Debug mode state.<br>
     * **Note: This property is retained for backward compatibility.<br>
     * Please use `setConfig()` to change the debug mode.**
     */
    public static DEBUG_MODE: boolean = false;

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
    public static setConfig(
      this: void,
      config: Config, 
      reset:  boolean = true
    ): void {
        const rConf = { ...config };
      // Remove properties specified as undefined or null.
      for (const key of Object.keys(rConf) as Array<ConfigKey>) {
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
    public static getDefaultConfig(this: void): Required<Config> {
      return { ...defaultConf };
    }

    /**
     * Get the current configurations.
     * @returns Default configurations.
     */
    public static getConfig(this: void): Required<Config> {
      currentConf.debug = ContractsImpl.DEBUG_MODE;
      return { ...currentConf };
    }

    /**
     * Reset the current configurations to the default configurations.
     * @returns Default configurations.
     */
    public static resetConfig(this: void): void {
      ContractsImpl.setConfig({}, true);
    }

    /**
     * Verifies an intermediate condition during execution.
     *
     * @param isOk  Condition value(`boolean`) or callback function whit return `boolean`.
     * @param ngMsg Failure message.
     * @param ErrorClass Error constructor used when the check fails.
     * This is used as follows: 
     * ```ts
     * throw Object.assign(new ErrorClass(msg, eParams), eProps);
     * ```
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
    public static VERIFY(
      this: void,
      isOk: IsOk,
      ngMsg: string | null,
      ErrorClass: ErrorClassType | null = Error,
      eParams?: Record<string, unknown> | null,
      eProps?: Record<string, unknown> | null
    ): boolean | void {
      return check('VERIFY', isOk, ngMsg, ErrorClass, eParams, eProps);
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
     * This is used as follows: 
     * ```ts
     * throw Object.assign(new ErrorClass(msg, eParams), eProps);
     * ```
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
    public static VERIFY_DEBUG(
      this: void,
      isOk: IsOk,
      ngMsg: string | null,
      ErrorClass: ErrorClassType | null = Error,
      eParams?: Record<string, unknown> | null,
      eProps?: Record<string, unknown> | null
    ): boolean | void {
      return checkDebug('VERIFY_DEBUG', isOk, ngMsg, ErrorClass, eParams, eProps);
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
     * This is used as follows: 
     * ```ts
     * throw Object.assign(new ErrorClass(msg, eParams), eProps);
     * ```
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
    public static REQUIRE(
      this: void,
      isOk: IsOk,
      ngMsg: string | null,
      ErrorClass: ErrorClassType | null = Error,
      eParams?: Record<string, unknown> | null,
      eProps?: Record<string, unknown> | null
    ): boolean | void {
      return check('REQUIRE', isOk, ngMsg, ErrorClass, eParams, eProps);
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
     * This is used as follows: 
     * ```ts
     * throw Object.assign(new ErrorClass(msg, eParams), eProps);
     * ```
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
    public static REQUIRE_DEBUG(
      this: void,
      isOk: IsOk,
      ngMsg: string | null,
      ErrorClass: ErrorClassType | null = Error,
      eParams?: Record<string, unknown> | null,
      eProps?: Record<string, unknown> | null
    ): boolean | void {
      return checkDebug('REQUIRE_DEBUG', isOk, ngMsg, ErrorClass, eParams, eProps);
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
     * This is used as follows: 
     * ```ts
     * throw Object.assign(new ErrorClass(msg, eParams), eProps);
     * ```
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
    public static ENSURE(
      this: void,
      isOk: IsOk,
      ngMsg: string | null,
      ErrorClass: ErrorClassType | null = Error,
      eParams?: Record<string, unknown> | null,
      eProps?: Record<string, unknown> | null
    ): boolean | void {
      return check('ENSURE', isOk, ngMsg, ErrorClass, eParams, eProps);
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
     * This is used as follows: 
     * ```ts
     * throw Object.assign(new ErrorClass(msg, eParams), eProps);
     * ```
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
    public static ENSURE_DEBUG(
      this: void,
      isOk: IsOk,
      ngMsg: string | null,
      ErrorClass: ErrorClassType | null = Error,
      eParams?: Record<string, unknown> | null,
      eProps?: Record<string, unknown> | null
    ): boolean | void {
      return checkDebug('ENSURE_DEBUG', isOk, ngMsg, ErrorClass, eParams, eProps);
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
     * This is used as follows: 
     * ```ts
     * throw Object.assign(new ErrorClass(msg, eParams), eProps);
     * ```
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
    public static INVARIANT(
      this: void,
      isOk: IsOk,
      ngMsg: string | null,
      ErrorClass: ErrorClassType | null = Error,
      eParams?: Record<string, unknown> | null,
      eProps?: Record<string, unknown> | null
    ): boolean | void {
      return check('INVARIANT', isOk, ngMsg, ErrorClass, eParams, eProps);
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
     * This is used as follows: 
     * ```ts
     * throw Object.assign(new ErrorClass(msg, eParams), eProps);
     * ```
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
    public static INVARIANT_DEBUG(
      this: void,
      isOk: IsOk,
      ngMsg: string | null,
      ErrorClass: ErrorClassType | null = Error,
      eParams?: Record<string, unknown> | null,
      eProps?: Record<string, unknown> | null
    ): boolean | void {
      return checkDebug('INVARIANT_DEBUG', isOk, ngMsg, ErrorClass, eParams, eProps);
    }

  }

  return ContractsImpl;
}
