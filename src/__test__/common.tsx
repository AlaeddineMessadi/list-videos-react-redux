import { Provider } from 'react-redux';

export const ReduxProvider = ({ children, reduxStore }) => <Provider store={reduxStore}>{children}</Provider>;
