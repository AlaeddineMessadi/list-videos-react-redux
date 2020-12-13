import { Author, Category, ProcessedVideo } from '../common/interfaces';

//  TYPES
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_AUTHORS = 'SET_AUTHORS';
export const SET_VIDEOS = 'SET_VIDEOS';

interface SetCategoriesAction {
  type: typeof SET_CATEGORIES;
  payload: Category[];
}

interface SetAuthorsAction {
  type: typeof SET_AUTHORS;
  payload: Author[];
}

interface SetProcessedVideosAction {
  type: typeof SET_VIDEOS;
  payload: ProcessedVideo[];
}

export type LoadInitialActionTypes = SetCategoriesAction | SetAuthorsAction | SetProcessedVideosAction;

// AppState type
export interface AppState {
  categories: Category[];
  authors: Author[];
  videos: ProcessedVideo[];
}
