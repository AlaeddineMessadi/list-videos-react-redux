import { shallow, mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ListPage } from '../pages/list';
import { store } from '../store';
// import { ReduxProvider } from './common';

it('renders list page without crashing', () => {
  shallow(
    <Provider store={store}>
      <ListPage />
    </Provider>
  );
});

it('renders list page', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ListPage />
    </Provider>
  );
  const welcome = <h1>List of Videos</h1>;
  // console.log(wrapper.debug());
  expect(wrapper.contains(welcome)).toEqual(true);
});
