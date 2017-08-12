import * as React from 'react';
import * as _ from 'lodash';

export const ValueGenerators = {
  any: () => 'anyValue',
  symbol: () => 'anyValue',
  array: () => _.times(5, ValueGenerators.any),
  bool: () => true,
  func: () => {},
  number: () => 1337,
  object: () => ({ any: ValueGenerators.any() }),
  string: () => 'stringval',
  node: () =>
    React.createElement('span', {
      className: 'node',
      children: ValueGenerators.any()
    }),
  element: () =>
    React.createElement('span', {
      className: 'element',
      children: ValueGenerators.any()
    }),
  instanceOf: () => new function Klazz() {}(),
  oneOf: values => values[0],
  oneOfType: types => types[0].__jestSnapper__.fake(),
  arrayOf: type => _.times(5, type.__jestSnapper__.fake),
  objectOf: type => ({
    one: type.__jestSnapper__.fake(),
    two: type.__jestSnapper__.fake()
  }),
  shape: shape => constructProps(shape)
};

// TODO: fix typings
const constructProps = (propTypes: any) =>
  _(propTypes)
    .mapValues((value, key) => (value as any).__jestSnapper__.fake())
    .value();

export default constructProps;
