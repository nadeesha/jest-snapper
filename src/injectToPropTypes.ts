import { ValueGenerators } from './constructProps';
import * as _ from 'lodash';

const getInfusion = (key, values?) => {
  if (!ValueGenerators[key]) {
    return;
  }

  return { fake: () => ValueGenerators[key](values) };
};

const injectToPropTypes = propTypes =>
  _.forOwn(propTypes, (typeFn, key) => {
    const fn = types => {
      const foo = typeFn(types);
      if (foo) {
        (foo as any).__jestSnapper__ = getInfusion(key, types);
      }
      return foo;
    };

    // TODO: fix typings
    (fn as any).__jestSnapper__ = getInfusion(key);

    propTypes[key] = fn;
  });

export default injectToPropTypes;
