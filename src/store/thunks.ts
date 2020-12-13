// src/thunks.ts

import { Action } from 'redux';
import { sendMessage } from './actions';
import { RootState } from './store';
import { ThunkAction } from 'redux-thunk';

export const thunkLoadCategories = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  const asyncResp = await exampleAPI();
  dispatch(
    sendMessage({
      message,
      user: asyncResp,
      timestamp: new Date().getTime(),
    })
  );
};

function exampleAPI() {
  return Promise.resolve('Async Chat Bot');
}
