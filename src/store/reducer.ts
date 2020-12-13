import { AppState, LoadInitialActionTypes, SET_CATEGORIES, SET_AUTHORS, SET_VIDEOS, ADD_VIDEO, DELETE_VIDEO } from './types';
import { Category, Author, ProcessedVideo } from '../common/interfaces';

const initialState = {
  categories: [] as Category[],
  authors: [] as Author[],
  videos: [] as ProcessedVideo[],
};

export const reducer = (state: AppState = initialState, action: LoadInitialActionTypes) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, ...action.payload],
      };
    case SET_AUTHORS:
      return {
        ...state,
        authors: [...state.authors, ...action.payload],
      };
    case SET_VIDEOS:
      return {
        ...state,
        videos: [...state.videos, ...action.payload],
      };
    case ADD_VIDEO:
      return {
        ...state,
        videos: [...state.videos, action.payload],
      };
    // case DELETE_VIDEO:
    //   return {
    //     ...state,
    //     videos: [...state.videos, ...action.payload],
    //   };
    default:
      return state;
  }
};
