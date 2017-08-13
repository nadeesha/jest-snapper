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

const warnAndExit = failedKey => {
  const message = [
    `jest-snapper failed to derive mock data for your propType "${failedKey}"\n`,
    `This could be because`,
    `  1. You defined and incorrect propType for ${failedKey}`,
    `  2. You forgot to initialize jest snapper with init(PropTypes) from your jest init script. (See docs)`,
    `  3. You called init with a different PropTypes import package than the one you're using in the component`,
    `      ex: Mixing React.PropTypes and 'prop-types' package`,
    `  4. We do not yet supprt ${failedKey} (in which case, please file an issue)\n`,
    `  jest-snapper will skip this prop - possibly leading to an incorrect snapshot.`
  ].join('\n');

  console.log(message);
};

// TODO: fix typings
const constructProps = (propTypes: any) =>
  _(propTypes)
    .mapValues((value: any, key: string) => {
      if (!value.__jestSnapper__) {
        warnAndExit(key);
        return;
      }

      return value.__jestSnapper__.fake();
    })
    .value();

export default constructProps;
