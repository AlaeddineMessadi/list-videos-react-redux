import { shallow, mount } from 'enzyme';
import React from 'react';
import App from '../App';

// console.log(wrapper.debug());

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders list page', () => {
  const wrapper = mount(<App />);
  const welcome = <h1>List of Videos</h1>;
  expect(wrapper.contains(welcome)).toEqual(true);
});
