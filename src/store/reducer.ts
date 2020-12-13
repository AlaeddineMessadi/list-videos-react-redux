// src/store/chat/reducers.ts

import { Author, Category } from '../common/interfaces';
import { AppState, LoadInitialActionTypes, SET_CATEGORIES, SET_AUTHORS } from './types';

const initialState = {
  categories: [],
  authors: [],
};

export function AppReducer(state = initialState, action: LoadInitialActionTypes) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        categories: [...state.categories, action.payload],
      };
    case SET_AUTHORS:
      return {
        authors: [...state.authors, action.payload],
      };
    default:
      return state;
  }
}
