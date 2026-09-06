[**@ayapapa-npm/contracts-js**](../README.md)

***

[@ayapapa-npm/contracts-js](../README.md) / Config

# Interface: Config

Defined in: [lib/Contracts.ts:10](https://github.com/ayapapa/contracts-js/blob/c8522bb53be039a9172e93da9c75caeb0213746d/src/lib/Contracts.ts#L10)

Configuration

## Properties

### debug?

> `optional` **debug?**: `boolean`

Defined in: [lib/Contracts.ts:16](https://github.com/ayapapa/contracts-js/blob/c8522bb53be039a9172e93da9c75caeb0213746d/src/lib/Contracts.ts#L16)

Debug mode state.
If `true`, `DEBUG_MODE` is enabled; otherwise, it is disabled.
The default is `false`.

***

### logger?

> `optional` **logger?**: [`LogProvider`](../type-aliases/LogProvider.md)

Defined in: [lib/Contracts.ts:23](https://github.com/ayapapa/contracts-js/blob/c8522bb53be039a9172e93da9c75caeb0213746d/src/lib/Contracts.ts#L23)

External logger.
If specified, it is used instead of the standard logger, `console`.
This module uses only the `error` method.
