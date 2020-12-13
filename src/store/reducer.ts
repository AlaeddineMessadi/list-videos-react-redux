import { AppState, LoadInitialActionTypes, SET_CATEGORIES, SET_AUTHORS, SET_VIDEOS } from './types';

const initialState = {
  categories: [],
  authors: [],
  videos: [],
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
    case SET_VIDEOS:
      return {
        videos: [...state.videos, action.payload],
      };
    default:
      return state;
  }
}
