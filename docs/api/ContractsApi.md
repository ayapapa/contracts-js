[**@ayapapa-npm/contracts-js**](../api.md)

***

[@ayapapa-npm/contracts-js](../api.md) / Contracts

# Class: Contracts

Defined in: [lib/Contracts.ts:100](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L100)

## Constructors

### Constructor

> **new Contracts**(): `Contracts`

#### Returns

`Contracts`

## Properties

### DEBUG\_MODE

> `static` **DEBUG\_MODE**: `boolean` = `false`

Defined in: [lib/Contracts.ts:110](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L110)

Debug mode state.<br>
**Note: This property is retained for backward compatibility.<br>
Please use `setConfig()` to change the debug mode.**

## Methods

### ENSURE()

> `abstract` `static` **ENSURE**(`this`, `isOk`, `ngMsg`, `ErrorClass`, `eParams?`, `eProps?`): `boolean` \| `void`

Defined in: [lib/Contracts.ts:372](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L372)

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

[`IsOk`](../type-aliases/IsOk.md)

Condition value(`boolean`) or callback function whit return `boolean`.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass

[`ErrorClassType`](../type-aliases/ErrorClassType.md)\<`Error`\> \| `null`

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

`boolean` \| `void`

Returns the original condition value or `void`. This depends on the settings.

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

> `abstract` `static` **ENSURE\_DEBUG**(`this`, `isOk`, `ngMsg`, `ErrorClass`, `eParams?`, `eProps?`): `boolean` \| `void`

Defined in: [lib/Contracts.ts:412](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L412)

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

[`IsOk`](../type-aliases/IsOk.md)

Condition value(`boolean`) or callback function whit return `boolean`.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass

[`ErrorClassType`](../type-aliases/ErrorClassType.md)\<`Error`\> \| `null`

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

`boolean` \| `void`

Returns the original condition value or `void`. This depends on the settings.

#### Example

```ts
Contracts.ENSURE_DEBUG(
  result !== undefined,
  'Result should exist during debugging'
);
```

***

### getConfig()

> `static` **getConfig**(`this`): `Required`\<[`Config`](../interfaces/Config.md)\>

Defined in: [lib/Contracts.ts:162](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L162)

Get the current configurations.

#### Parameters

##### this

`void`

#### Returns

`Required`\<[`Config`](../interfaces/Config.md)\>

Default configurations.

***

### getDefaultConfig()

> `static` **getDefaultConfig**(`this`): `Required`\<[`Config`](../interfaces/Config.md)\>

Defined in: [lib/Contracts.ts:155](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L155)

Get the default configurations.

#### Parameters

##### this

`void`

#### Returns

`Required`\<[`Config`](../interfaces/Config.md)\>

Default configurations.

***

### INVARIANT()

> `abstract` `static` **INVARIANT**(`this`, `isOk`, `ngMsg`, `ErrorClass`, `eParams?`, `eProps?`): `boolean` \| `void`

Defined in: [lib/Contracts.ts:460](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L460)

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

[`IsOk`](../type-aliases/IsOk.md)

Condition value(`boolean`) or callback function whit return `boolean`.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass

[`ErrorClassType`](../type-aliases/ErrorClassType.md)\<`Error`\> \| `null`

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

`boolean` \| `void`

Returns the original condition value or `void`. This depends on the settings.

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

> `abstract` `static` **INVARIANT\_DEBUG**(`this`, `isOk`, `ngMsg`, `ErrorClass`, `eParams?`, `eProps?`): `boolean` \| `void`

Defined in: [lib/Contracts.ts:499](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L499)

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

[`IsOk`](../type-aliases/IsOk.md)

Condition value(`boolean`) or callback function whit return `boolean`.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass

[`ErrorClassType`](../type-aliases/ErrorClassType.md)\<`Error`\> \| `null`

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

`boolean` \| `void`

Returns the original condition value or `void`. This depends on the settings.

#### Example

```ts
Contracts.INVARIANT_DEBUG(
  cache.size < 1000,
  'Cache size exceeded expected limit'
);
```

***

### REQUIRE()

> `abstract` `static` **REQUIRE**(`this`, `isOk`, `ngMsg`, `ErrorClass`, `eParams?`, `eProps?`): `boolean` \| `void`

Defined in: [lib/Contracts.ts:280](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L280)

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

[`IsOk`](../type-aliases/IsOk.md)

Condition value(`boolean`) or callback function whit return `boolean`.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass

[`ErrorClassType`](../type-aliases/ErrorClassType.md)\<`Error`\> \| `null`

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

`boolean` \| `void`

Returns the original condition value or `void`. This depends on the settings.

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

> `abstract` `static` **REQUIRE\_DEBUG**(`this`, `isOk`, `ngMsg`, `ErrorClass`, `eParams?`, `eProps?`): `boolean` \| `void`

Defined in: [lib/Contracts.ts:321](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L321)

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

[`IsOk`](../type-aliases/IsOk.md)

Condition value(`boolean`) or callback function whit return `boolean`.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass

[`ErrorClassType`](../type-aliases/ErrorClassType.md)\<`Error`\> \| `null`

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

`boolean` \| `void`

Returns the original condition value or `void`. This depends on the settings.

#### Example

```ts
Contracts.REQUIRE_DEBUG(
  user !== null,
  'User must exist during debugging'
);
```

***

### resetConfig()

> `static` **resetConfig**(`this`): `void`

Defined in: [lib/Contracts.ts:168](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L168)

Reset the current configurations to the default configurations.

#### Parameters

##### this

`void`

#### Returns

`void`

Default configurations.

***

### setConfig()

> `abstract` `static` **setConfig**(`this`, `config`, `reset`): `boolean` \| `void`

Defined in: [lib/Contracts.ts:148](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L148)

Configures contract checking behavior.

#### Parameters

##### this

`void`

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

##### reset

`boolean`

If `true`, unspecified values are saved to the settings as default values. <br>
If `false`, unspecified values remain at their current settings.

#### Returns

`boolean` \| `void`

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

> `abstract` `static` **VERIFY**(`this`, `isOk`, `ngMsg`, `ErrorClass`, `eParams?`, `eProps?`): `boolean` \| `void`

Defined in: [lib/Contracts.ts:196](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L196)

Verifies an intermediate condition during execution.

#### Parameters

##### this

`void`

##### isOk

[`IsOk`](../type-aliases/IsOk.md)

Condition value(`boolean`) or callback function whit return `boolean`.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass

[`ErrorClassType`](../type-aliases/ErrorClassType.md)\<`Error`\> \| `null`

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

`boolean` \| `void`

Returns the original condition value or `void`.

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

> `abstract` `static` **VERIFY\_DEBUG**(`this`, `isOk`, `ngMsg`, `ErrorClass`, `eParams?`, `eProps?`): `boolean` \| `void`

Defined in: [lib/Contracts.ts:232](https://github.com/ayapapa/contracts-js/blob/e5563878151e8b9867da213508a928240bbb404b/src/lib/Contracts.ts#L232)

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

[`IsOk`](../type-aliases/IsOk.md)

Condition value(`boolean`) or callback function whit return `boolean`.

##### ngMsg

`string` \| `null`

Failure message.

##### ErrorClass

[`ErrorClassType`](../type-aliases/ErrorClassType.md)\<`Error`\> \| `null`

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

`boolean` \| `void`

Returns the original condition value or `void`. This depends on the settings.

#### Example

```ts
Contracts.VERIFY_DEBUG(
  intermediate !== null,
  'Intermediate value must not be null'
);
```
