import { ValueGenerators } from './constructProps';
import * as _ from 'lodash';

const getInfusion = (key, values?) => {
  if (!ValueGenerators[key]) {
    return;
  }

  return { fake: () => ValueGenerators[key](values) };
};

const mutateWithSnapperObj = (obj: any, key, types?) => {
  obj.__jestSnapper__ = getInfusion(key, types);
};

const injectToPropTypes = (propTypes) =>
  _.forOwn(propTypes, (value, key) => {
    if (value.isRequired) { 
      // primitive proptypes
      mutateWithSnapperObj(value, key);
      mutateWithSnapperObj(value.isRequired, key);
      propTypes[key] = value;
    } else { 
      // complex proptypes
      const originalFn = value;

      const wrappedFn = (...args) => {
        const retValue = originalFn(...args);
        mutateWithSnapperObj(retValue, key, ...args);
        mutateWithSnapperObj(retValue.isRequired, key, ...args);
        return retValue;
      }

      propTypes[key] = wrappedFn;
    }
  });

export default injectToPropTypes;
