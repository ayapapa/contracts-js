[**@ayapapa-npm/contracts-js**](../README.md)

***

[@ayapapa-npm/contracts-js](../README.md) / Config

# Interface: Config

Defined in: [lib/Contracts.ts:15](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L15)

Configuration

## Properties

### debug?

> `optional` **debug?**: `boolean`

Defined in: [lib/Contracts.ts:21](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L21)

Debug mode state.
If `true`, `debug_mode`(internal state) is enabled; otherwise, it is disabled.
The default is `false`.

***

### logger?

> `optional` **logger?**: [`LogProvider`](../type-aliases/LogProvider.md)

Defined in: [lib/Contracts.ts:28](https://github.com/ayapapa/contracts-js/blob/6b95939676bc0043e2a92175bdf7c290abca394f/src/lib/Contracts.ts#L28)

External logger.
If specified, it is used instead of the standard logger, `console`.
This module uses only the `error` method.
