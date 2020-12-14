import { shallow, mount } from 'enzyme';
import React from 'react';
import { FAQPage } from '../pages/faq';

it('renders FAQ page without crashing', () => {
  shallow(<FAQPage />);
});

it('renders FAQ page', () => {
  const wrapper = mount(<FAQPage />);
  const welcome = <h1>Frequently Asked Questions</h1>;
  // console.log(wrapper.debug());
  expect(wrapper.contains(welcome)).toEqual(true);
});
