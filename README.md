# contracts-js
A lightweight Design by Contract library for JavaScript.</br>
All check functions return the evaluated condition itself, so they can be used directly in control flow when exception throwing is suppressed.


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

## Contract Types

`contracts-js` provides runtime checks based on **Design by Contract** principles.

The library provides four types of contracts:

| Contract    | Purpose                | When to use                                                | Responsibility          |
| ----------- | ---------------------- | ---------------------------------------------------------- | ----------------------- |
| `REQUIRE`   | Precondition           | Check conditions before execution starts                   | Caller                  |
| `VERIFY`    | Intermediate condition | Check assumptions or intermediate results during execution | Internal process        |
| `ENSURE`    | Postcondition          | Check conditions after execution completes                 | Function                |
| `INVARIANT` | State consistency      | Check conditions that must remain valid over time          | Object / Data structure |

### Quick Guide

#### REQUIRE - "Can this operation start?"

Use `REQUIRE` to validate conditions that must be satisfied before calling a function.

Examples:

* Function arguments are valid.
* Required objects exist.
* Required external conditions are available.

```javascript
Contracts.REQUIRE(
  user !== null,
  'User is required'
);
```

---

#### VERIFY - "Is the current processing state valid?"

Use `VERIFY` to check intermediate assumptions or temporary states during execution.

Examples:

* Intermediate calculation results.
* Internal processing states.
* Temporary assumptions.

Do not use `VERIFY` for input validation.
Use `REQUIRE` for conditions required before execution.

```javascript
Contracts.VERIFY(
  result >= 0,
  'Intermediate result must not be negative'
);
```

---

#### ENSURE - "Did the operation complete correctly?"

Use `ENSURE` to verify guarantees provided by a function after execution.

Examples:

* Return values are valid.
* State changes completed correctly.
* Processing results satisfy expected conditions.

```javascript
Contracts.ENSURE(
  result !== null,
  'Result must be available'
);
```

---

#### INVARIANT - "Is the object still valid?"

Use `INVARIANT` to verify conditions that represent the internal consistency of an object or data structure.

Examples:

* Internal values remain consistent.
* Object state rules are maintained.
* Data structure integrity is protected.

```javascript
Contracts.INVARIANT(
  balance >= 0,
  'Balance cannot be negative'
);
```

## Usage

```javascript
import { Contracts } from '@ayapapa-npm/contracts-js';
// or:
// import Contracts from '@ayapapa-npm/contracts-js';

// CommonJS:
// const { Contracts } = require('@ayapapa-npm/contracts-js');

// Enable debug mode
Contracts.setConfig({ debug: true });


// REQUIRE: Check a precondition
function divide(a, b) {
  Contracts.REQUIRE(
    b !== 0,
    'Divisor cannot be zero'
  );

  return a / b;
}


// ENSURE: Check a postcondition
function getPositiveNumber(x) {
  Contracts.REQUIRE(
    x > 0,
    'Input must be positive'
  );

  const result = x * 2;

  Contracts.ENSURE(
    result > 0,
    'Result must be positive'
  );

  return result;
}


// INVARIANT: Check object state consistency
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  withdraw(amount) {
    Contracts.REQUIRE(
      amount >= 0,
      'Amount must not be negative'
    );

    this.balance -= amount;

    Contracts.INVARIANT(
      this.balance >= 0,
      'Balance cannot be negative'
    );
  }
}


// VERIFY: Check an intermediate condition
function processAccount(account) {
  const calculatedBalance = calculateBalance(account);

  Contracts.VERIFY(
    calculatedBalance >= 0,
    'Intermediate balance is invalid'
  );

  return calculatedBalance;
}
```

**XXX_DEBUG() performs the same action as XXX() in debug mode; otherwise, no action.**

