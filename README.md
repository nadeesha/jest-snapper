![](https://circleci.com/gh/nadeesha/jest-snapper.svg?style=shield&circle-token=:circle-token) [![npm version](https://badge.fury.io/js/jest-snapper.svg)](https://badge.fury.io/js/jest-snapper)

# jest-snapper

## Introduction

`jest-snapper` generates mock props for a given React component, based on it's `propTypes`. Then it does a `jest` [snapshot test](https://facebook.github.io/jest/docs/snapshot-testing.html) for the component. Think - one line snapshot tests for your react components.

## Prerequisites

`jest-snapper` assumes you run it through [jest](https://facebook.github.io/jest/). It makes advantage of the built-in snapshot testing capability of jest.

## Example

```js
// __tests__/MyReactComponent.jsx
import { test } from 'jest-snapper';

test('should render component', MyReactComponent);
```

## Installation

```bash
yarn add jest-snapper
```

## API

### test

`test` will infer propTypes from your component's props and run a snapshot test with deterministic values.

```js
test(
  description: string,
  component: typeof React.Component,
  {
    props: any?, // optional
    state: any?, // optional
  }
)
```

examples:

```js
// Example 1: jest-snapper will generate props for you
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
- Support better Typescript Typings
