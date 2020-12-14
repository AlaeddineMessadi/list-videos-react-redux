import { shallow, mount } from 'enzyme';
import React from 'react';
import { AboutPage } from '../pages/about';
// import { ReduxProvider } from './common';

it('renders About page without crashing', () => {
  shallow(<AboutPage />);
});

it('renders About page', () => {
  const wrapper = mount(<AboutPage />);
  const welcome = <h1>About</h1>;
  // console.log(wrapper.debug());
  expect(wrapper.contains(welcome)).toEqual(true);
});
