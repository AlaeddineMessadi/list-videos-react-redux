import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '.';
import { Author, Category } from '../common/interfaces';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_AUTHORS = 'SET_AUTHORS';

interface SetCategoriesAction {
  type: typeof SET_CATEGORIES;
  payload: Category[];
}

interface SetAuthorsAction {
  type: typeof SET_AUTHORS;
  payload: Author[];
}

export type LoadInitialActionTypes = SetCategoriesAction | SetAuthorsAction;

// AppState type
export interface AppState {
  categories: Category[];
  authors: Author[];
}
