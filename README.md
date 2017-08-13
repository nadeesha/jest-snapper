# jest-snapper

![](https://circleci.com/gh/nadeesha/jest-snapper.svg?style=shield&circle-token=:circle-token)

## Introduction

Automatically generate jest based snapshot tests for your React components by inferring props through `propTypes` definition.

## Example

Test happy:

```js
// __tests__/SimpleStateless.jsx
import { test } from 'react-snapper';
import SimpleStateless from '../SimpleStateless.jsx'; // any React component with valid propTypes static property

test('should render component', SimpleStateless); // jest-snapper will do  a snapshot test with auto-generated values for props.
```

## Installation and Configuration

### 1. Install:
```bash
yarn add jest-snapper
```

### 2. Confgure `init` step:
jest-snapper needs to inject some helpers into `React.PropTypes` or the standalone `prop-types` package, depending on which one you're using.

Add this to your init.js script (or create one).
```js
// scripts/jest/init.js
import {init} from 'react-snapper';
import React from 'react';

// this injects some helpers into propTypes.
init(React.PropTypes)
```

And add this line to your `jest` config.
```json
"jest": {
  "setupTestFrameworkScriptFile": "<rootDir>/scripts/jest/init.js",
}
```
This will test jest to run this file before your test run commences.

## API

### init

`init` is a one-time configuration that you must do before a test run. You should supply the same `PropTypes` package here that you'd use in your application. Be it `React.PropTypes` or the newer standalone `prop-types` npm package.

```js
init(PropTypes: typeof React.PropTypes)
```

example:

```js
init(React.PropTypes);
```

### test

`test` will infer propTypes from your component's props and run a snapshot test with deterministic values.

```js
test(
  description: string,
  component: typeof React.Component,
  {
    props: any,
    state: any,
  }
)
```

examples:

```js
// Example 1: react-snapper will generate props for you
test('simple test', MyComponent);

// Example 2: You can selectively assign your own props
test('with some overriden props', MyComponent, { 
  props: {
    age: '42',
  },
});

// Example 3: Setting `state` will trigger a `this.setState`
// before the snapshot is taken.
test('with a state change', MyComponent, {
  state: {
	textInputValue: 'foobar',
  },
});
```

## Caveats

To minimize the effort needed to introduce this library to an existing codebase, I've made the decision to inject fake data generators (yes, like a cowboy) into `PropTypes`. This is a spartan solution, but works well. This is an area for possible future improvement.

## Todo

- Add multiple test permutations for `oneOf` and `oneOfType` propTypes
- Expose mock data generator and allow the user to override it
- Support Better Typings