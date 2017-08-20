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

// @t "exits process" init(spy('exit')) ~expect spy('exit').args[0][0] === 1
export const init = (exit = process.exit) => {
  console.error('As of jest-snapper@0.3.0, you do not need to run init. Please remove this step.');
  exit(1);
}

export const test = (
  description: string,
  Component: React.ComponentClass<any> | React.StatelessComponent<{}>,
  options?: IOptions
) => {  
  const props = { ...constructProps(Component.propTypes), ...options && options.props };
  const state = options && options.state;

  runTest(description, Component, props, state);
};
