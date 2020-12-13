import React from 'react';
import { BaseLayout } from './containers/layout';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BaseLayout />
    </Provider>
  );
};

export default App;
