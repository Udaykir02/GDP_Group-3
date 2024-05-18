/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it, expect,describe} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('App', () => { // Describe the App component
  it('renders correctly', () => { // Test that the App component renders correctly
    const wrapper = shallow(<App />); // Shallow render the App component
    expect(wrapper).toMatchSnapshot(); // Assert that the wrapper matches the snapshot
  });
} );  