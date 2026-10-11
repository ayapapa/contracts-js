/**
 * Type of the console replacement object
 */
type LogProvider = Pick<Console, 'error'>;
/**
 * Type of the condition.
 */
type IsOk = boolean | (() => boolean);
/**
 * Type of the custom error class type.
 */
type ErrorClassType<T extends Error = Error> = {
    new (...args: any[]): T;
};
/**
 * Configuration
 */
interface Config {
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
    returnType?: 'boolean' | 'void';
}
/** Type of `Config`'s key. */
type ConfigKey = keyof Config;
/**
 * Contracts
 */
declare const Contracts: {
    new (): {};
    /**
     * Static fields
     */
    /**
     * Debug mode state.<br>
     * **Note: This property is retained for backward compatibility.<br>
     * Please use `setConfig()` to change the debug mode.**
     */
    DEBUG_MODE: boolean;
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
    setConfig(this: void, config: Config, reset?: boolean): void;
    /**
     * Get the default configurations.
     * @returns Default configurations.
     */
    getDefaultConfig(this: void): Required<Config>;
    /**
     * Get the current configurations.
     * @returns Default configurations.
     */
    getConfig(this: void): Required<Config>;
    /**
     * Reset the current configurations to the default configurations.
     * @returns Default configurations.
     */
    resetConfig(this: void): void;
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
    VERIFY(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns Returns the original condition value or `void`. This depends on the settings.
     * @example
     * Contracts.VERIFY_DEBUG(
     *   intermediate !== null,
     *   'Intermediate value must not be null'
     * );
     */
    VERIFY_DEBUG(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns Returns the original condition value or `void`. This depends on the settings.
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
    REQUIRE(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns
     * Returns the original condition value or `void`. This depends on the settings.
     *
     * @example
     * Contracts.REQUIRE_DEBUG(
     *   user !== null,
     *   'User must exist during debugging'
     * );
     */
    REQUIRE_DEBUG(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns Returns the original condition value or `void`. This depends on the settings.
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
    ENSURE(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns
     * Returns the original condition value or `void`. This depends on the settings.
     *
     * @example
     * Contracts.ENSURE_DEBUG(
     *   result !== undefined,
     *   'Result should exist during debugging'
     * );
     */
    ENSURE_DEBUG(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns Returns the original condition value or `void`. This depends on the settings.
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
    INVARIANT(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns Returns the original condition value or `void`. This depends on the settings.
     *
     * @example
     * Contracts.INVARIANT_DEBUG(
     *   cache.size < 1000,
     *   'Cache size exceeded expected limit'
     * );
     */
    INVARIANT_DEBUG(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
};
/**
 * Create a contract object that does not share static fields with other contracts.
 * @param config Configurations.
 * @returns A contract object.
 */
declare function createContracts(config?: Config): {
    new (): {};
    /**
     * Static fields
     */
    /**
     * Debug mode state.<br>
     * **Note: This property is retained for backward compatibility.<br>
     * Please use `setConfig()` to change the debug mode.**
     */
    DEBUG_MODE: boolean;
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
    setConfig(this: void, config: Config, reset?: boolean): void;
    /**
     * Get the default configurations.
     * @returns Default configurations.
     */
    getDefaultConfig(this: void): Required<Config>;
    /**
     * Get the current configurations.
     * @returns Default configurations.
     */
    getConfig(this: void): Required<Config>;
    /**
     * Reset the current configurations to the default configurations.
     * @returns Default configurations.
     */
    resetConfig(this: void): void;
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
    VERIFY(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns Returns the original condition value or `void`. This depends on the settings.
     * @example
     * Contracts.VERIFY_DEBUG(
     *   intermediate !== null,
     *   'Intermediate value must not be null'
     * );
     */
    VERIFY_DEBUG(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns Returns the original condition value or `void`. This depends on the settings.
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
    REQUIRE(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns
     * Returns the original condition value or `void`. This depends on the settings.
     *
     * @example
     * Contracts.REQUIRE_DEBUG(
     *   user !== null,
     *   'User must exist during debugging'
     * );
     */
    REQUIRE_DEBUG(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns Returns the original condition value or `void`. This depends on the settings.
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
    ENSURE(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns
     * Returns the original condition value or `void`. This depends on the settings.
     *
     * @example
     * Contracts.ENSURE_DEBUG(
     *   result !== undefined,
     *   'Result should exist during debugging'
     * );
     */
    ENSURE_DEBUG(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns Returns the original condition value or `void`. This depends on the settings.
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
    INVARIANT(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
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
     * @returns Returns the original condition value or `void`. This depends on the settings.
     *
     * @example
     * Contracts.INVARIANT_DEBUG(
     *   cache.size < 1000,
     *   'Cache size exceeded expected limit'
     * );
     */
    INVARIANT_DEBUG(this: void, isOk: IsOk, ngMsg: string | null, ErrorClass?: ErrorClassType | null, eParams?: Record<string, unknown> | null, eProps?: Record<string, unknown> | null): boolean | void;
};

export { type Config, type ConfigKey, Contracts, type ErrorClassType, type IsOk, type LogProvider, createContracts, Contracts as default };
