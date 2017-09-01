import * as React from 'react';
import injectToPropTypes from './injectToPropTypes';
import runTest from './runTest';
import * as _ from 'lodash';
import constructProps from './constructProps';

injectToPropTypes();

export interface IOptions {
  props?: any;
  state?: any;
}

const test = (
  description: string,
  Component: React.ComponentClass<any> | React.StatelessComponent<{}>,
  options?: IOptions
) => {
  const props = {
    ...constructProps(Component.propTypes),
    ...options && options.props
  };
  const state = options && options.state;

  runTest(description, Component, props, state);
};

export default test;
