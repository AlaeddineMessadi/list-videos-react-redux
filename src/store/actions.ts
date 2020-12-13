import { Author, Category, ProcessedVideo, Video } from '../common/interfaces';
import { LoadInitialActionTypes, SET_AUTHORS, SET_CATEGORIES, SET_VIDEOS } from './types';

// TypeScript infers that this function is returning loadCategoriesAction
export function loadCategoriesAction(categories: Category[]): LoadInitialActionTypes {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
}

// TypeScript infers that this function is returning loadAuthorsAction
export function loadAuthorsAction(authors: Author[]): LoadInitialActionTypes {
  return {
    type: SET_AUTHORS,
    payload: authors,
  };
}

// TypeScript infers that this function is returning loadProcessedVideosAction
export function loadProcessedVideosAction(processesVideos: ProcessedVideo[]): LoadInitialActionTypes {
  return {
    type: SET_VIDEOS,
    payload: processesVideos,
  };
}
