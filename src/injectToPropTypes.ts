import { ValueGenerators } from './constructProps';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';

const getInfusion = (key, values?) => {
  if (!ValueGenerators[key]) {
    return;
  }

  return { fake: () => ValueGenerators[key](values) };
};

const mutateWithSnapperObj = (obj: any, key, types?) =>
  Object.assign(obj, {
    __jestSnapper__: getInfusion(key, types)
  });

const mutatePropTypes = propTypes =>
  _.forOwn(propTypes, (value, key) => {
    if (value.isRequired) {
      // primitive proptypes
      mutateWithSnapperObj(value, key);
      mutateWithSnapperObj(value.isRequired, key);

      Object.assign(propTypes, {
        [key]: value
      });
    } else {
      // complex proptypes
      const originalFn = value;

      const wrappedFn = (...args) => {
        const retValue = originalFn(...args);
        mutateWithSnapperObj(retValue, key, ...args);
        mutateWithSnapperObj(retValue.isRequired, key, ...args);
        return retValue;
      };

      Object.assign(propTypes, {
        [key]: wrappedFn
      });
    }
  });

const POSSIBLE_PROPTYPES = [
  () => require('prop-types'),
  () => require('react').PropTypes
];

const injectToPropTypes = () =>
  _(POSSIBLE_PROPTYPES).each(requireProptypes => {
    try {
      const propTypes = requireProptypes();

      if (propTypes.__jestSnapper__) {
        return;
      }

      mutatePropTypes(propTypes);

      propTypes.__jestSnapper__ = {
        patched: true
      };
    } catch (e) {
      // TODO: initialize debug and log here.
    }
  });

export default injectToPropTypes;
