[**@ayapapa-npm/contracts-js**](../README.md)

***

[@ayapapa-npm/contracts-js](../README.md) / Config

# Interface: Config

Defined in: [lib/Contracts.ts:14](https://github.com/ayapapa/contracts-js/blob/3ad978ae461884e8eb06ece527d3717f78a5867e/src/lib/Contracts.ts#L14)

Configuration

## Properties

### debug?

> `optional` **debug?**: `boolean`

Defined in: [lib/Contracts.ts:20](https://github.com/ayapapa/contracts-js/blob/3ad978ae461884e8eb06ece527d3717f78a5867e/src/lib/Contracts.ts#L20)

Debug mode state.
If `true`, `debug_mode`(internal state) is enabled; otherwise, it is disabled.
The default is `false`.

***

### logger?

> `optional` **logger?**: [`LogProvider`](../type-aliases/LogProvider.md)

Defined in: [lib/Contracts.ts:27](https://github.com/ayapapa/contracts-js/blob/3ad978ae461884e8eb06ece527d3717f78a5867e/src/lib/Contracts.ts#L27)

External logger.
If specified, it is used instead of the standard logger, `console`.
This module uses only the `error` method.
