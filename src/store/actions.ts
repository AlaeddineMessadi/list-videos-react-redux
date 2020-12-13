import { Author, Category, ProcessedVideo } from '../common/interfaces';
import { ADD_VIDEO, DELETE_VIDEO, LoadInitialActionTypes, SET_AUTHORS, SET_CATEGORIES, SET_VIDEOS, UPDATE_VIDEO } from './types';

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

// TypeScript infers that this function is returning addVideoAction
export function addVideoAction(video: ProcessedVideo): LoadInitialActionTypes {
  return {
    type: ADD_VIDEO,
    payload: video,
  };
}

// TypeScript infers that this function is returning updateVideoAction
export function updateVideoAction(videos: ProcessedVideo[]): LoadInitialActionTypes {
  return {
    type: UPDATE_VIDEO,
    payload: videos,
  };
}

// TypeScript infers that this function is returning deleteVideoAction
export function deleteVideoAction(videos: ProcessedVideo[]): LoadInitialActionTypes {
  return {
    type: DELETE_VIDEO,
    payload: videos,
  };
}
