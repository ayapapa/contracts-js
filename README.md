# contracts-js
A lightweight Design by Contract library for JavaScript.

## Installation


### Install from npm registry
Available now.
```bash
npm install @ayapapa-npm/contracts-js
```

### Install directly from GitHub Release:
Available now.
Check for the latest version before installation: https://github.com/ayapapa/contracts-js/releases
```bash
npm install https://github.com/ayapapa/contracts-js/releases/download/X.Y.Z/ayapapa-npm-contracts-js-X.Y.Z.tgz
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
npm install https://github.com/ayapapa/contracts-js/releases/download/X.Y.Z/ayapapa-npm-contracts-js-X.Y.Z.tgz
```


## Usage

```javascript
import { Contracts } from 'contracts-js';
// or,
//  import Contracts from 'contracts-jss';

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