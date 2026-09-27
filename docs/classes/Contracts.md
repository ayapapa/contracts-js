[**@ayapapa-npm/contracts-js**](../README.md)

***

[@ayapapa-npm/contracts-js](../README.md) / Contracts

# Class: Contracts

Defined in: [lib/Contracts.ts:70](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L70)

## Constructors

### Constructor

> **new Contracts**(): `Contracts`

#### Returns

`Contracts`

## Properties

### DEBUG\_MODE

> `static` **DEBUG\_MODE**: `boolean` = `false`

Defined in: [lib/Contracts.ts:81](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L81)

Debug mode state.<br>
**Note: This property is retained for backward compatibility.<br>
Please use `setConfig()` to change the debug mode.**

## Methods

### ENSURE()

> `static` **ENSURE**(`this`, `isOk`, `ngMsg`, `ErrorClass?`, `eParams?`, `eProps?`): `boolean`

Defined in: [lib/Contracts.ts:486](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L486)

Checks a postcondition after execution.

A postcondition defines conditions that must be satisfied
after a function or operation completes.

ENSURE represents guarantees provided by the function
to its caller.

Typical usage:
- Validate return values.
- Confirm state changes.
- Verify that processing completed correctly.

#### Parameters

##### this

`void`

##### isOk

`boolean`

Condition result(`boolean`)  to be verified.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass?

[`ErrorClassType`](../type-aliases/ErrorClassType.md) \| `null`

Error constructor used when the check fails.
This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);

Supported values:
- `Error` (default)
- `TypeError`
- `RangeError`
- Custom Error subclasses
- `null` to skip throwing and log the failure.

##### eParams?

`Record`\<`string`, `unknown`\> \| `null`

Parameter options following the message passed to the Error constructor.

##### eProps?

`Record`\<`string`, `unknown`\> \| `null`

Additional properties assigned to the error object.

#### Returns

`boolean`

Returns the original condition value.

#### Example

```ts
function double(value) {
  Contracts.REQUIRE(
    value >= 0,
    'Value must not be negative'
  );

  const result = value * 2;

  Contracts.ENSURE(
    result >= 0,
    'Result must not be negative'
  );

  return result;
}
```

***

### ENSURE\_DEBUG()

> `static` **ENSURE\_DEBUG**(`this`, `isOk`, `ngMsg`, `ErrorClass?`, `eParams?`, `eProps?`): `boolean`

Defined in: [lib/Contracts.ts:549](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L549)

Checks a postcondition in debug mode only.

Performs the same validation as ENSURE only when
`debug_mode`(internal state) is enabled.

When `debug_mode`(internal state) is disabled,
no validation is performed.

Typical usage:
- Validate detailed results during development.
- Confirm internal behavior while debugging.

#### Parameters

##### this

`void`

##### isOk

`boolean`

Condition result(`boolean`)  to be verified.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass?

[`ErrorClassType`](../type-aliases/ErrorClassType.md) \| `null`

Error constructor used when the check fails.
This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);

Supported values:
- `Error` (default)
- `TypeError`
- `RangeError`
- Custom Error subclasses
- `null` to skip throwing and log the failure.

##### eParams?

`Record`\<`string`, `unknown`\> \| `null`

Parameter options following the message passed to the Error constructor.

##### eProps?

`Record`\<`string`, `unknown`\> \| `null`

Additional properties assigned to the error object.

#### Returns

`boolean`

Returns the original condition value.

#### Example

```ts
Contracts.ENSURE_DEBUG(
  result !== undefined,
  'Result should exist during debugging'
);
```

***

### getConfig()

> `static` **getConfig**(): `Required`\<[`Config`](../interfaces/Config.md)\>

Defined in: [lib/Contracts.ts:149](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L149)

Get the current configurations.

#### Returns

`Required`\<[`Config`](../interfaces/Config.md)\>

Default configurations.

***

### getDefaultConfig()

> `static` **getDefaultConfig**(): `Required`\<[`Config`](../interfaces/Config.md)\>

Defined in: [lib/Contracts.ts:141](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L141)

Get the default configurations.

#### Returns

`Required`\<[`Config`](../interfaces/Config.md)\>

Default configurations.

***

### INVARIANT()

> `static` **INVARIANT**(`this`, `isOk`, `ngMsg`, `ErrorClass?`, `eParams?`, `eProps?`): `boolean`

Defined in: [lib/Contracts.ts:621](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L621)

Checks an invariant condition.

An invariant represents a condition that must remain valid
throughout the lifetime of an object or component.

Typical usage:
- Validate internal object consistency.
- Protect class state integrity.
- Confirm assumptions that must always hold.

In Design by Contract terminology,
INVARIANT represents conditions that must always remain true.

#### Parameters

##### this

`void`

##### isOk

`boolean`

Condition result(`boolean`)  to be verified.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass?

[`ErrorClassType`](../type-aliases/ErrorClassType.md) \| `null`

Error constructor used when the check fails.
This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);

Supported values:
- `Error` (default)
- `TypeError`
- `RangeError`
- Custom Error subclasses
- `null` to skip throwing and log the failure.

##### eParams?

`Record`\<`string`, `unknown`\> \| `null`

Parameter options following the message passed to the Error constructor.

##### eProps?

`Record`\<`string`, `unknown`\> \| `null`

Additional properties assigned to the error object.

#### Returns

`boolean`

Returns the original condition value.

#### Example

```ts
class BankAccount {

  withdraw(amount) {
    this.balance -= amount;

    Contracts.INVARIANT(
      this.balance >= 0,
      'Balance cannot be negative'
    );
  }

}
```

***

### INVARIANT\_DEBUG()

> `static` **INVARIANT\_DEBUG**(`this`, `isOk`, `ngMsg?`, `ErrorClass?`, `eParams?`, `eProps?`): `boolean`

Defined in: [lib/Contracts.ts:684](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L684)

Checks an invariant condition in debug mode only.

Performs the same validation as INVARIANT only when
`debug_mode`(internal state) is enabled.

When `debug_mode`(internal state) is disabled,
no validation is performed.

Typical usage:
- Validate object consistency during development.
- Detect unexpected state changes while debugging.

#### Parameters

##### this

`void`

##### isOk

`boolean`

Condition result(`boolean`)  to be verified.

##### ngMsg?

`string` \| `null`

Failure message.

##### ErrorClass?

[`ErrorClassType`](../type-aliases/ErrorClassType.md) \| `null`

Error constructor used when the check fails.
This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);

Supported values:
- `Error` (default)
- `TypeError`
- `RangeError`
- Custom Error subclasses
- `null` to skip throwing and log the failure.

##### eParams?

`Record`\<`string`, `unknown`\> \| `null`

Parameter options following the message passed to the Error constructor.

##### eProps?

`Record`\<`string`, `unknown`\> \| `null`

Additional properties assigned to the error object.

#### Returns

`boolean`

Returns the original condition value.

#### Example

```ts
Contracts.INVARIANT_DEBUG(
  cache.size < 1000,
  'Cache size exceeded expected limit'
);
```

***

### REQUIRE()

> `static` **REQUIRE**(`this`, `isOk`, `ngMsg`, `ErrorClass?`, `eParams?`, `eProps?`): `boolean`

Defined in: [lib/Contracts.ts:348](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L348)

Checks a precondition before execution.

A precondition defines conditions that must be satisfied
before a function or operation starts.

The caller is responsible for satisfying preconditions.

Typical usage:
- Validate function arguments.
- Validate required object state.
- Check required external conditions.

#### Parameters

##### this

`void`

##### isOk

`boolean`

Condition result(`boolean`)  to be verified.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass?

[`ErrorClassType`](../type-aliases/ErrorClassType.md) \| `null`

Error constructor used when the check fails.
This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);

Supported values:
- `Error` (default)
- `TypeError`
- `RangeError`
- Custom Error subclasses
- `null` to skip throwing and log the failure.

##### eParams?

`Record`\<`string`, `unknown`\> \| `null`

Parameter options following the message passed to the Error constructor.

##### eProps?

`Record`\<`string`, `unknown`\> \| `null`

Additional properties assigned to the error object.

#### Returns

`boolean`

Returns the original condition value.

#### Example

```ts
function divide(a, b) {
  Contracts.REQUIRE(
    typeof a === 'number',
    'a must be a number'
  );

  Contracts.REQUIRE(
    b !== 0,
    'Divisor cannot be zero'
  );

  return a / b;
}
```

***

### REQUIRE\_DEBUG()

> `static` **REQUIRE\_DEBUG**(`this`, `isOk`, `ngMsg`, `ErrorClass?`, `eParams?`, `eProps?`): `boolean`

Defined in: [lib/Contracts.ts:411](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L411)

Checks a precondition in debug mode only.

Performs the same validation as REQUIRE only when
`debug_mode`(internal state) is enabled.

When `debug_mode`(internal state) is disabled,
no validation is performed.

Typical usage:
- Validate assumptions during development.
- Perform additional argument checks while debugging.

#### Parameters

##### this

`void`

##### isOk

`boolean`

Condition result(`boolean`)  to be verified.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass?

[`ErrorClassType`](../type-aliases/ErrorClassType.md) \| `null`

Error constructor used when the check fails.
This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);

Supported values:
- `Error` (default)
- `TypeError`
- `RangeError`
- Custom Error subclasses
- `null` to skip throwing and log the failure.

##### eParams?

`Record`\<`string`, `unknown`\> \| `null`

Parameter options following the message passed to the Error constructor.

##### eProps?

`Record`\<`string`, `unknown`\> \| `null`

Additional properties assigned to the error object.

#### Returns

`boolean`

Returns the original condition value.

#### Example

```ts
Contracts.REQUIRE_DEBUG(
  user !== null,
  'User must exist during debugging'
);
```

***

### resetConfig()

> `static` **resetConfig**(): `void`

Defined in: [lib/Contracts.ts:158](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L158)

Reset the current configurations to the default configurations.

#### Returns

`void`

Default configurations.

***

### setConfig()

> `static` **setConfig**(`config`, `reset?`): `void`

Defined in: [lib/Contracts.ts:126](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L126)

Configures contract checking behavior.

#### Parameters

##### config

[`Config`](../interfaces/Config.md)

Configuration options. <br>
<br>
The `debug` property toggles the behavior—specifically, 
throwing an exception or outputting to the console when the condition is 
false—for the validation of contracts intended for use during debugging (methods ending in `_DEBUG`). <br>
<br>
When `debug` is `true`,
methods ending with `_DEBUG` perform validation. <br>
<br>
When `debug` is `false`,
methods ending with `_DEBUG` skip validation. <br>
 <br>
Is the `logger` property is specified, 
it is used instead of the standard logger, `console`.
This module uses only the `error` method of the `logger`. <br>
<br>
Note: If the value of a property is `undefined` or `null`, it is treated as unspecified.

##### reset?

`boolean` = `true`

If `true`, unspecified values are saved to the settings as default values. <br>
If `false`, unspecified values remain at their current settings.

#### Returns

`void`

#### Example

```ts
// Use a logger that is slightly more advanced than the standard logger—namely, `console`.
import { PrettyConsole } from '@ayapapa-npm/pretty-console-js';

const prettyConsole = new PrettyConsole();
Contracts.setConfig({ debug: true, logger: prettyConsole });
// Node: ` The `logger` property is optional.
```

***

### VERIFY()

> `static` **VERIFY**(`this`, `isOk`, `ngMsg`, `ErrorClass?`, `eParams?`, `eProps?`): `boolean`

Defined in: [lib/Contracts.ts:213](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L213)

Verifies an intermediate condition during execution.

VERIFY is used to validate intermediate results
and internal assumptions during execution.

Unlike REQUIRE and ENSURE, VERIFY does not represent
a condition at the function boundary.

Unlike INVARIANT, VERIFY does not represent a condition
that must always remain true.

Typical usage:
- Validate intermediate calculation results.
- Confirm internal processing states.
- Check temporary assumptions during execution.

#### Parameters

##### this

`void`

##### isOk

`boolean`

Condition result(`boolean`)  to be verified.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass?

[`ErrorClassType`](../type-aliases/ErrorClassType.md) \| `null`

Error constructor used when the check fails.
This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);

Supported values:
- `Error` (default)
- `TypeError`
- `RangeError`
- Custom Error subclasses
- `null` to skip throwing and log the failure.

##### eParams?

`Record`\<`string`, `unknown`\> \| `null`

Parameter options following the message passed to the Error constructor.

##### eProps?

`Record`\<`string`, `unknown`\> \| `null`

Additional properties assigned to the error object.

#### Returns

`boolean`

Returns the original condition value.

#### Example

```ts
const result = calculate();

Contracts.VERIFY(
  result >= 0,
  'Calculation result must not be negative'
);
```

***

### VERIFY\_DEBUG()

> `static` **VERIFY\_DEBUG**(`this`, `isOk`, `ngMsg`, `ErrorClass?`, `eParams?`, `eProps?`): `boolean`

Defined in: [lib/Contracts.ts:276](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L276)

Verifies an intermediate condition in debug mode only.

Performs the same validation as VERIFY only when
`debug_mode`(internal state) is enabled.

When `debug_mode`(internal state) is disabled,
no validation is performed.

Typical usage:
- Validate intermediate results during development.
- Check internal assumptions while debugging.

#### Parameters

##### this

`void`

##### isOk

`boolean`

Condition result(`boolean`)  to be verified.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass?

[`ErrorClassType`](../type-aliases/ErrorClassType.md) \| `null`

Error constructor used when the check fails.
This is used as follows: throw Object.assign(new ErrorClass(msg, eParams), eProps);

Supported values:
- `Error` (default)
- `TypeError`
- `RangeError`
- Custom Error subclasses
- `null` to skip throwing and log the failure.

##### eParams?

`Record`\<`string`, `unknown`\> \| `null`

Parameter options following the message passed to the Error constructor.

##### eProps?

`Record`\<`string`, `unknown`\> \| `null`

Additional properties assigned to the error object.

#### Returns

`boolean`

Returns the original condition value.

#### Example

```ts
Contracts.VERIFY_DEBUG(
  intermediate !== null,
  'Intermediate value must not be null'
);
```
