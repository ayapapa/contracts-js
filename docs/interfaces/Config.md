[**@ayapapa-npm/contracts-js**](../README.md)

***

[@ayapapa-npm/contracts-js](../README.md) / Config

# Interface: Config

Defined in: [lib/Contracts.ts:22](https://github.com/ayapapa/contracts-js/blob/736ae05672ae8baf885e5c9d42add37204b5e64e/src/lib/Contracts.ts#L22)

Configuration

## Properties

### debug?

> `optional` **debug?**: `boolean`

Defined in: [lib/Contracts.ts:28](https://github.com/ayapapa/contracts-js/blob/736ae05672ae8baf885e5c9d42add37204b5e64e/src/lib/Contracts.ts#L28)

Debug mode state.
If `true`, `debug_mode`(internal state) is enabled; otherwise, it is disabled.
Default is `false`.

***

### logger?

> `optional` **logger?**: [`LogProvider`](../type-aliases/LogProvider.md)

Defined in: [lib/Contracts.ts:36](https://github.com/ayapapa/contracts-js/blob/736ae05672ae8baf885e5c9d42add37204b5e64e/src/lib/Contracts.ts#L36)

External logger.
If specified, it is used instead of the standard logger, `console`.
This module uses only the `error` method.
Default is `console`.

***

### returnType?

> `optional` **returnType?**: `"boolean"` \| `"void"`

Defined in: [lib/Contracts.ts:45](https://github.com/ayapapa/contracts-js/blob/736ae05672ae8baf885e5c9d42add37204b5e64e/src/lib/Contracts.ts#L45)

The return type of the evaluation method.<br>
When `void` is specified as the return type and debug mode is off,
`XXX_DEBUG()` neither evaluates the first argument nor validates the evaluation callback.
As a result, any provided evaluation callback is not invoked.
Default is `void`.
