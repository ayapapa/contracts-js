[**@ayapapa-npm/contracts-js**](../api.md)

***

[@ayapapa-npm/contracts-js](../api.md) / Config

# Interface: Config

Defined in: [lib/Contracts.ts:23](https://github.com/ayapapa/contracts-js/blob/675e54ad58332a88206679f16bbc7efe914ccabc/src/lib/Contracts.ts#L23)

Configuration

## Properties

### debug?

> `optional` **debug?**: `boolean`

Defined in: [lib/Contracts.ts:29](https://github.com/ayapapa/contracts-js/blob/675e54ad58332a88206679f16bbc7efe914ccabc/src/lib/Contracts.ts#L29)

Debug mode state.
If `true`, `debug_mode`(internal state) is enabled; otherwise, it is disabled.
Default is `false`.

***

### logger?

> `optional` **logger?**: [`LogProvider`](../type-aliases/LogProvider.md)

Defined in: [lib/Contracts.ts:37](https://github.com/ayapapa/contracts-js/blob/675e54ad58332a88206679f16bbc7efe914ccabc/src/lib/Contracts.ts#L37)

External logger.
If specified, it is used instead of the standard logger, `console`.
This module uses only the `error` method.
Default is `console`.

***

### returnType?

> `optional` **returnType?**: `"boolean"` \| `"void"`

Defined in: [lib/Contracts.ts:46](https://github.com/ayapapa/contracts-js/blob/675e54ad58332a88206679f16bbc7efe914ccabc/src/lib/Contracts.ts#L46)

The return type of the evaluation method.<br>
When `void` is specified as the return type and debug mode is off,
`XXX_DEBUG()` neither evaluates the first argument nor validates the evaluation callback.
As a result, any provided evaluation callback is not invoked.
Default is `void`.
