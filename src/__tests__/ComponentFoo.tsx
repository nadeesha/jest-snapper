import * as React from 'react';
import { test, init } from '../index';
import * as PropTypes from 'prop-types';

const ComponentFoo: React.StatelessComponent<any> = props =>
  <div {...props}>
    <span {...props} />
  </div>;

ComponentFoo.propTypes = {
  foobarosa: PropTypes.number,
  foo: PropTypes.string,
  bar: PropTypes.number,
  denver: PropTypes.oneOf(['foo', 'bar']),
  brooklyn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  michigan: PropTypes.shape({
    foo: PropTypes.string,
    bar: PropTypes.number,
    denver: PropTypes.oneOf(['foo', 'bar']),
    brooklyn: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ])
  }),
  buffalo: PropTypes.arrayOf(PropTypes.number),
  cali: PropTypes.objectOf(PropTypes.element),
  sanfran: PropTypes.node,
  elpaso: PropTypes.shape({
    chilli: PropTypes.shape({
      con: PropTypes.shape({
        carne: PropTypes.string.isRequired,
        delisioso: PropTypes.node.isRequired,
      }),
    }),
  }),
};

test('should render', ComponentFoo, {
  props: {
    idaho: 'todolo',
  },
});
