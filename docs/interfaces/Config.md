[**@ayapapa-npm/contracts-js**](../README.md)

***

[@ayapapa-npm/contracts-js](../README.md) / Config

# Interface: Config

Defined in: [lib/Contracts.ts:10](https://github.com/ayapapa/contracts-js/blob/69a23a361c943788a2b2627905b5b85bd0d3cf38/src/lib/Contracts.ts#L10)

Configuration

## Properties

### debug?

> `optional` **debug?**: `boolean`

Defined in: [lib/Contracts.ts:16](https://github.com/ayapapa/contracts-js/blob/69a23a361c943788a2b2627905b5b85bd0d3cf38/src/lib/Contracts.ts#L16)

Debug mode state.
If `true`, `debug_mode`(internal state) is enabled; otherwise, it is disabled.
The default is `false`.

***

### logger?

> `optional` **logger?**: [`LogProvider`](../type-aliases/LogProvider.md)

Defined in: [lib/Contracts.ts:23](https://github.com/ayapapa/contracts-js/blob/69a23a361c943788a2b2627905b5b85bd0d3cf38/src/lib/Contracts.ts#L23)

External logger.
If specified, it is used instead of the standard logger, `console`.
This module uses only the `error` method.
