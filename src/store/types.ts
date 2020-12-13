import { Author, Category, ProcessedVideo, Video } from '../common/interfaces';

//  TYPES
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_AUTHORS = 'SET_AUTHORS';
export const SET_VIDEOS = 'SET_VIDEOS';
export const ADD_VIDEO = 'ADD_VIDEO';
export const DELETE_VIDEO = 'DELETE_VIDEO';

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
interface AddVideoAction {
  type: typeof ADD_VIDEO;
  payload: ProcessedVideo;
}
interface DeleteVideoAction {
  type: typeof DELETE_VIDEO;
  payload: ProcessedVideo[];
}

export type LoadInitialActionTypes = SetCategoriesAction | SetAuthorsAction | SetProcessedVideosAction | AddVideoAction | DeleteVideoAction;

// AppState type
export interface AppState {
  categories: Category[];
  authors: Author[];
  videos: ProcessedVideo[];
}
