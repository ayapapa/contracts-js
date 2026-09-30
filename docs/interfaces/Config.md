[**@ayapapa-npm/contracts-js**](../README.md)

***

[@ayapapa-npm/contracts-js](../README.md) / Config

# Interface: Config

Defined in: [lib/Contracts.ts:17](https://github.com/ayapapa/contracts-js/blob/0f16f535a2a43bdf0c886641f4bd6083e94d64f3/src/lib/Contracts.ts#L17)

Configuration

## Properties

### debug?

> `optional` **debug?**: `boolean`

Defined in: [lib/Contracts.ts:23](https://github.com/ayapapa/contracts-js/blob/0f16f535a2a43bdf0c886641f4bd6083e94d64f3/src/lib/Contracts.ts#L23)

Debug mode state.
If `true`, `debug_mode`(internal state) is enabled; otherwise, it is disabled.
The default is `false`.

***

### logger?

> `optional` **logger?**: [`LogProvider`](../type-aliases/LogProvider.md)

Defined in: [lib/Contracts.ts:30](https://github.com/ayapapa/contracts-js/blob/0f16f535a2a43bdf0c886641f4bd6083e94d64f3/src/lib/Contracts.ts#L30)

External logger.
If specified, it is used instead of the standard logger, `console`.
This module uses only the `error` method.
