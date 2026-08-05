# contracts-js
Design by Contract utilities for JavaScript: preconditions, postconditions, and invariants.

## Installation

### Install directly from GitHub Release:
Available now.
```bash
npm install https://github.com/ayapapa/contracts-js/releases/download/0.1.0/contracts-js-0.1.0.tgz
```
If you see the error:
```
npm error code EALLOWREMOTE
npm error Fetching packages of type "remote" have been disabled
```
allow remote packages:
```bash
npm config set allow-remote all
```
Then run the install command again:
```bash
npm install https://github.com/ayapapa/contracts-js/releases/download/0.1.0/contracts-js-0.1.0.tgz
```

### Install from npm registry
Coming soon: installable with `npm install contracts-js`.

## Usage

```javascript
import { Contracts } from './Contracts.js';
// or,
//  import Contracts from './Contracts.js';

// In the case of CommonJS,
//  const { Contracts } = require('contracts-js');
// or,
//  const Contracts = require('contracts-js').Contracts;

// Enable debug mode
Contracts.setConfig({ debug: true });

// Check a precondition (e.g., argument validation)
function divide(a, b) {
  Contracts.REQUIRE(b !== 0, 'Divisor cannot be zero');
  return a / b;
}

// Check a postcondition (e.g., return value validation)
function getPositiveNumber(x) {
  Contracts.REQUIRE(x > 0, 'Input must be positive');
  const result = x * 2;
  Contracts ENSURE(result > 0, 'Result must be positive');
  return result;
}
```