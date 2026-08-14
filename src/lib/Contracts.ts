/** 
 * Type of the console replacement object
 */
export type LogProvider = Pick<Console,  'error'>;

/**
 * Configuration
 */

export interface Config {
  /**
   * Debug mode state.
   * If `true`, `DEBUG_MODE` is enabled; otherwise, it is disabled.
   * The default is `false`.
   */
  debug?: boolean;

  /**
   * External logger.
   * If specified, it is used instead of the standard logger, `console`.
   * This module uses only the `error` method.
   */
  logger?: LogProvider;
}

/** Type of `Config`'s key. */
export type ConfigKey = keyof Config;

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
 * when `DEBUG_MODE` is enabled.
 *
 * When `DEBUG_MODE` is disabled,
 * these methods return the original condition value
 * without performing validation.
 *
 * @module Contracts
 */
export class Contracts {

  /** 
   * Static fields
   */

  /** Debug mode state */
  public static DEBUG_MODE: boolean = false;

  /** default configuration */
  private static readonly defaultConf: Config  = {
    debug:  false,
    logger: console
  };

  /** logger */
  private static logger: LogProvider = console;

  /**
   * Configures contract checking behavior.
   *
   * @param config
   * Configuration options.
   *
   * The `debug` property enables or disables
   * debug-only contract checks.
   *
   * When `debug` is `true`,
   * methods ending with `_DEBUG` perform validation.
   *
   * When `debug` is `false` or omitted,
   * methods ending with `_DEBUG` skip validation.
   * 
   * Is the `logger` property is specified, 
   * it is used instead of the standard logger, `console`.
   * This module uses only the `error` method of the `logger`.
   *
   * @example
   * // Use a logger that is slightly more advanced than the standard logger—namely, `console`.
   * import { PrettyConsole } from '@ayapapa-npm/pretty-console-js';
   * 
   * const prettyConsole = new PrettyConsole();
   * Contracts.setConfig({ debug: true, logger: prettyConsole });
   * // Node: ` The `logger` property is optional.
   */
  public static setConfig(config: Config): void {
    Contracts.DEBUG_MODE = Boolean(config?.debug);
    Contracts.logger = (config?.logger)?? console;
  }

  /**
   * Verifies an intermediate condition during execution.
   *
   * VERIFY is used to validate intermediate results
   * and internal assumptions during execution.
   *
   * Unlike REQUIRE and ENSURE, VERIFY does not represent
   * a condition at the function boundary.
   *
   * Unlike INVARIANT, VERIFY does not represent a condition
   * that must always remain true.
   *
   * Typical usage:
   * - Validate intermediate calculation results.
   * - Confirm internal processing states.
   * - Check temporary assumptions during execution.
   *
   * @param isOk
   * Condition result to verify.
   *
   * @param ngMsg
   * Failure message.
   *
   * @param ErrorClass
   * Error constructor used when the check fails.
   * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
   *
   * Supported values:
   * - `Error` (default)
   * - `TypeError`
   * - `RangeError`
   * - Custom Error subclasses
   * - `null` to skip throwing and log the failure.
   *
   * @param eParams
   * Parameter options following the message passed to the Error constructor.
   *
   * @param eProps
   * Additional properties assigned to the error object.
   *
   * @returns 
   * Returns the original condition value.
   *
   * @example
   * const result = calculate();
   *
   * Contracts.VERIFY(
   *   result >= 0,
   *   'Calculation result must not be negative'
   * );
   */
  public static VERIFY(
    isOk: boolean,
    ngMsg: string | null,
    ErrorClass: (new (...args:any[])=>Error) | null = Error,
    eParams?: {[key: string]: any} | null,
    eProps?: {[key: string]: any} | null
  ): boolean {
    return Contracts.check(
      isOk,
      'VERIFY',
      ngMsg,
      ErrorClass,
      eParams,
      eProps
    );
  }


  /**
   * Verifies an intermediate condition in debug mode only.
   *
   * Performs the same validation as VERIFY only when
   * DEBUG_MODE is enabled.
   *
   * When DEBUG_MODE is disabled,
   * no validation is performed.
   *
   * Typical usage:
   * - Validate intermediate results during development.
   * - Check internal assumptions while debugging.
   *
   * @param isOk
   * Condition result to verify.
   *
   * @param ngMsg
   * Failure message.
   *
   * @param ErrorClass
   * Error constructor used when the check fails.
   * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
   *
   * Supported values:
   * - `Error` (default)
   * - `TypeError`
   * - `RangeError`
   * - Custom Error subclasses
   * - `null` to skip throwing and log the failure.
   *
   * @param eParams
   * Parameter options following the message passed to the Error constructor.
   *
   * @param eProps
   * Additional properties assigned to the error object.
   *
   * @returns 
   * Returns the original condition value.
   *
   * @example
   * Contracts.VERIFY_DEBUG(
   *   intermediate !== null,
   *   'Intermediate value must not be null'
   * );
   */
  public static VERIFY_DEBUG(
    isOk: boolean,
    ngMsg: string | null,
    ErrorClass: (new (...args:any[])=>Error) | null = Error,
    eParams?: {[key: string]: any} | null,
    eProps?: {[key: string]: any} | null
  ) {
    return Contracts.checkDebug(
      isOk,
      'VERIFY_DEBUG',
      ngMsg,
      ErrorClass,
      eParams,
      eProps
    );
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
   * @param isOk
   * Condition result to verify.
   *
   * @param ngMsg
   * Failure message.
   *
   * @param ErrorClass
   * Error constructor used when the check fails.
   * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
   *
   * Supported values:
   * - `Error` (default)
   * - `TypeError`
   * - `RangeError`
   * - Custom Error subclasses
   * - `null` to skip throwing and log the failure.
   *
   * @param eParams
   * Parameter options following the message passed to the Error constructor.
   *
   * @param eProps
   * Additional properties assigned to the error object.
   *
   * @returns 
   * Returns the original condition value.
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
    isOk: boolean,
    ngMsg: string | null,
    ErrorClass: (new (...args:any[])=>Error) | null = Error,
    eParams?: {[key: string]: any} | null,
    eProps?: {[key: string]: any} | null
  ) {
    return Contracts.check(
      isOk,
      'REQUIRE',
      ngMsg,
      ErrorClass,
      eParams,
      eProps
    );
  }


  /**
   * Checks a precondition in debug mode only.
   *
   * Performs the same validation as REQUIRE only when
   * DEBUG_MODE is enabled.
   *
   * When DEBUG_MODE is disabled,
   * no validation is performed.
   *
   * Typical usage:
   * - Validate assumptions during development.
   * - Perform additional argument checks while debugging.
   *
   * @param isOk
   * Condition result to verify.
   *
   * @param ngMsg
   * Failure message.
   *
   * @param ErrorClass
   * Error constructor used when the check fails.
   * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
   *
   * Supported values:
   * - `Error` (default)
   * - `TypeError`
   * - `RangeError`
   * - Custom Error subclasses
   * - `null` to skip throwing and log the failure.
   *
   * @param eParams
   * Parameter options following the message passed to the Error constructor.
   *
   * @param eProps
   * Additional properties assigned to the error object.
   *
   * @returns 
   * Returns the original condition value.
   *
   * @example
   * Contracts.REQUIRE_DEBUG(
   *   user !== null,
   *   'User must exist during debugging'
   * );
   */
  public static REQUIRE_DEBUG(
    isOk: boolean,
    ngMsg: string | null,
    ErrorClass: (new (...args:any[])=>Error) | null = Error,
    eParams?: {[key: string]: any} | null,
    eProps?: {[key: string]: any} | null
  ) {
    return Contracts.checkDebug(
      isOk,
      'REQUIRE_DEBUG',
      ngMsg,
      ErrorClass,
      eParams,
      eProps
    );
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
   * @param isOk
   * Condition result to verify.
   *
   * @param ngMsg
   * Failure message.
   *
   * @param ErrorClass
   * Error constructor used when the check fails.
   * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
   *
   * Supported values:
   * - `Error` (default)
   * - `TypeError`
   * - `RangeError`
   * - Custom Error subclasses
   * - `null` to skip throwing and log the failure.
   *
   * @param eParams
   * Parameter options following the message passed to the Error constructor.
   *
   * @param eProps
   * Additional properties assigned to the error object.
   *
   * @returns 
   * Returns the original condition value.
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
    isOk: boolean,
    ngMsg: string | null,
    ErrorClass: (new (...args:any[])=>Error) | null = Error,
    eParams?: {[key: string]: any} | null,
    eProps?: {[key: string]: any} | null
  ) {
    return Contracts.check(
      isOk,
      'ENSURE',
      ngMsg,
      ErrorClass,
      eParams,
      eProps
    );
  }


  /**
   * Checks a postcondition in debug mode only.
   *
   * Performs the same validation as ENSURE only when
   * DEBUG_MODE is enabled.
   *
   * When DEBUG_MODE is disabled,
   * no validation is performed.
   *
   * Typical usage:
   * - Validate detailed results during development.
   * - Confirm internal behavior while debugging.
   *
   * @param isOk
   * Condition result to verify.
   *
   * @param ngMsg
   * Failure message.
   *
   * @param ErrorClass
   * Error constructor used when the check fails.
   * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
   *
   * Supported values:
   * - `Error` (default)
   * - `TypeError`
   * - `RangeError`
   * - Custom Error subclasses
   * - `null` to skip throwing and log the failure.
   *
   * @param eParams
   * Parameter options following the message passed to the Error constructor.
   *
   * @param eProps
   * Additional properties assigned to the error object.
   *
   * @returns 
   * Returns the original condition value.
   *
   * @example
   * Contracts.ENSURE_DEBUG(
   *   result !== undefined,
   *   'Result should exist during debugging'
   * );
   */
  public static ENSURE_DEBUG(
    isOk: boolean,
    ngMsg: string | null,
    ErrorClass: (new (...args:any[])=>Error) | null = Error,
    eParams?: {[key: string]: any} | null,
    eProps?: {[key: string]: any} | null
  ) {
    return Contracts.checkDebug(
      isOk,
      'ENSURE_DEBUG',
      ngMsg,
      ErrorClass,
      eParams,
      eProps
    );
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
   * @param isOk
   * Condition result to verify.
   *
   * @param ngMsg
   * Failure message.
   *
   * @param ErrorClass
   * Error constructor used when the check fails.
   * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
   *
   * Supported values:
   * - `Error` (default)
   * - `TypeError`
   * - `RangeError`
   * - Custom Error subclasses
   * - `null` to skip throwing and log the failure.
   *
   * @param eParams
   * Parameter options following the message passed to the Error constructor.
   *
   * @param eProps
   * Additional properties assigned to the error object.
   *
   * @returns 
   * Returns the original condition value.
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
    isOk: boolean,
    ngMsg: string | null,
    ErrorClass: (new (...args:any[])=>Error) | null = Error,
    eParams?: {[key: string]: any} | null,
    eProps?: {[key: string]: any} | null
  ) {
    return Contracts.check(
      isOk,
      'INVARIANT',
      ngMsg,
      ErrorClass,
      eParams,
      eProps
    );
  }


  /**
   * Checks an invariant condition in debug mode only.
   *
   * Performs the same validation as INVARIANT only when
   * DEBUG_MODE is enabled.
   *
   * When DEBUG_MODE is disabled,
   * no validation is performed.
   *
   * Typical usage:
   * - Validate object consistency during development.
   * - Detect unexpected state changes while debugging.
   *
   * @param isOk
   * Condition result to verify.
   *
   * @param [ngMsg]
   * Failure message.
   *
   * @param [ErrorClass=Error]
   * Error constructor used when the check fails.
   * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
   *
   * Supported values:
   * - `Error` (default)
   * - `TypeError`
   * - `RangeError`
   * - Custom Error subclasses
   * - `null` to skip throwing and log the failure.
   *
   * @param eParams
   * Parameter options following the message passed to the Error constructor.
   *
   * @param [eProps = {}]
   * Additional properties assigned to the error object.
   *
   * @returns 
   * Returns the original condition value.
   *
   * @example
   * Contracts.INVARIANT_DEBUG(
   *   cache.size < 1000,
   *   'Cache size exceeded expected limit'
   * );
   */
  public static INVARIANT_DEBUG(
    isOk: boolean,
    ngMsg: string | null,
    ErrorClass: (new (...args:any[])=>Error) | null = Error,
    eParams?: {[key: string]: any} | null,
    eProps?: {[key: string]: any} | null
  ) {
    return Contracts.checkDebug(
      isOk,
      'INVARIANT_DEBUG',
      ngMsg,
      ErrorClass,
      eParams,
      eProps
    );
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
   *
   * @internal
   * 
   * @param isOk
   * Condition result.
   *
   * @param prefix
   * Contract type prefix used in the error message.
   *
   * @param ngMsg
   * Failure message.
   *
   * @param ErrorClass
   * Error constructor used when the check fails.
   * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
   *
   * Supported values:
   * - `Error` (default)
   * - `TypeError`
   * - `RangeError`
   * - Custom Error subclasses
   * - `null` to skip throwing and log the failure.
   *
   * @param eParams
   * Parameter options following the message passed to the Error constructor.
   * 
   * @param eProps
   * Additional properties assigned to the error object.
   *
   * @returns
   * Returns the original condition value.
   *
   */
  private static check(
    isOk: boolean,
    prefix: string = 'CHECK',
    ngMsg: string | null = '',
    ErrorClass: (new (...args:any[])=>Error) | null = Error,
    eParams?: {[key: string]: any} | null,
    eProps?: {[key: string]: any} | null
  ) {
    // Compatibility with versions prior to 0.2.x
    if (eProps === undefined) {
      eProps = eParams ?? {};
      eParams = null;
    } else {
      eProps ??= {};
    }
    if (!isOk) {
      const msg = `[${prefix}] ${ngMsg ?? ''}`;

      if (ErrorClass) {
        const err = eParams ? new ErrorClass(msg, eParams) : new ErrorClass(msg);
        if (eProps) {
          Object.assign(err, eProps);
        }
        throw err;
      }

      if (ngMsg) {
        Contracts.getLogger().error(msg, eProps);
      }
    }

    return isOk;
  }

  /**
   * Debug-only contract evaluation logic.
   *
   * Executes contract validation only when DEBUG_MODE
   * is enabled.
   *
   * When DEBUG_MODE is disabled,
   * this method returns the original condition value
   * without performing any validation.
   *
   * @internal
   * 
   * @param isOk
   * Condition result.
   *
   * @param prefix
   * Contract type prefix used in the error message.
   *
   * @param ngMsg
   * Failure message.
   *
   * @param ErrorClass=Error
   * Error constructor used when the check fails.
   * This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);
   *
   * Supported values:
   * - `Error` (default)
   * - `TypeError`
   * - `RangeError`
   * - Custom Error subclasses
   * - `null` to skip throwing and log the failure.
   *
   * @param eParams
   * Parameter options following the message passed to the Error constructor.
   *
   * @param eProps
   * Additional properties assigned to the error object.
   *
   * @returns
   * Returns the original condition value.
   *
   */
  private static checkDebug(
    isOk: boolean,
    prefix: string = 'CHECK',
    ngMsg: string | null = '',
    ErrorClass: (new (...args:any[])=>Error) | null = Error,
    eParams?: {[key: string]: any} | null,
    eProps?: {[key: string]: any} | null
  ) {
    return Contracts.DEBUG_MODE
      ? Contracts.check(
          isOk,
          prefix,
          ngMsg,
          ErrorClass,
          eParams,
          eProps
        )
      : isOk;
  }

  /** 
   * Get logger 
   *
   * @internal
   */
  private static getLogger(): LogProvider {
    return Contracts.logger ?? console;
  }

}
