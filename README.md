# contracts-js
Design by Contract utilities for JavaScript: preconditions, postconditions, and invariants.

## Install
 
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
