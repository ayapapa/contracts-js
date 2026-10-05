[**@ayapapa-npm/contracts-js**](../README.md)

***

[@ayapapa-npm/contracts-js](../README.md) / Config

# Interface: Config

Defined in: [lib/Contracts.ts:22](https://github.com/ayapapa/contracts-js/blob/112a5da28ccfa6fada48ec465ebc19d74b944555/src/lib/Contracts.ts#L22)

Configuration

## Properties

### debug?

> `optional` **debug?**: `boolean`

Defined in: [lib/Contracts.ts:28](https://github.com/ayapapa/contracts-js/blob/112a5da28ccfa6fada48ec465ebc19d74b944555/src/lib/Contracts.ts#L28)

Debug mode state.
If `true`, `debug_mode`(internal state) is enabled; otherwise, it is disabled.
The default is `false`.

***

### logger?

> `optional` **logger?**: [`LogProvider`](../type-aliases/LogProvider.md)

Defined in: [lib/Contracts.ts:35](https://github.com/ayapapa/contracts-js/blob/112a5da28ccfa6fada48ec465ebc19d74b944555/src/lib/Contracts.ts#L35)

External logger.
If specified, it is used instead of the standard logger, `console`.
This module uses only the `error` method.

***

### output?

> `optional` **output?**: `"boolean"` \| `"void"`

Defined in: [lib/Contracts.ts:43](https://github.com/ayapapa/contracts-js/blob/112a5da28ccfa6fada48ec465ebc19d74b944555/src/lib/Contracts.ts#L43)

The return type of the evaluation method.<br>
When `void` is specified as the return type and debug mode is off,
`XXX_DEBUG()` neither evaluates the first argument nor validates the evaluation callback.
As a result, any provided evaluation callback is not invoked.
