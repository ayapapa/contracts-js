/**
 * Contract checking utilities.
 * Provides methods to verify preconditions, postconditions, invariants, and general conditions.
 */
declare class Contracts {
    static DEBUG_MODE: boolean;
    /**
     * Configures the contract checking behavior.
     * @param {{debug?: boolean}} config Configuration object
     */
    static setConfig(config: {
        debug?: boolean;
    }): void;
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
    static VERIFY(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
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
    static VERIFY_DEBUG(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
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
    static REQUIRE(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
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
    static REQUIRE_DEBUG(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
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
    static ENSURE(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
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
    static ENSURE_DEBUG(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
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
    static INVARIANT(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
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
    static INVARIANT_DEBUG(isOk: boolean, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
    /**
     * Private methods
     */
    /**
     * Core evaluation logic.
     * If the result is false and an `error` class is provided, throws an exception.
     * Otherwise, logs the message to `console.error`.
     * @param   {boolean}   isOk      The result of the condition check.
     * @param   {string}    [prefix]  Prefix for the error message.
     * @param   {string}    [ngMsg]   The error message.
     * @param   {new (...args: any[]) => Error}  [error]   The error class to throw (Error or its subclass).
     * @param   {Object<string, *>}    [eProps={}]   Properties to assign to the error instance.
     * @return  {boolean} The evaluation result (returns `isOk` as is).
     */
    static "__#1@#check"(isOk: boolean, prefix?: string, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
    /**
     * Debug evaluation logic (no message output or exception thrown unless in debug mode).
     * If the result is false and an `error` class is provided, throws an exception.
     * Otherwise, logs the message to `console.error`.
     * @param   {boolean}   isOk      The result of the condition check.
     * @param   {string}    [prefix]  Prefix for the error message.
     * @param   {string}    [ngMsg]   The error message.
     * @param   {new (...args: any[]) => Error}  [error]   The error class to throw (Error or its subclass).
     * @param   {Object<string, *>}    [eProps={}]   Properties to assign to the error instance.
     * @return  {boolean} The evaluation result (returns `isOk` as is).
     */
    static "__#1@#checkDebug"(isOk: boolean, prefix?: string, ngMsg?: string, error?: new (...args: any[]) => Error, eProps?: {
        [x: string]: any;
    }): boolean;
}

export { Contracts, Contracts as default };
