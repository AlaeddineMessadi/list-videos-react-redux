import { Action } from 'redux';
import {
  loadCategoriesAction,
  loadAuthorsAction,
  loadProcessedVideosAction,
  addVideoAction,
  deleteVideoAction,
  updateVideoAction,
} from './actions';
import { RootState } from './';
import { ThunkAction } from 'redux-thunk';
import { getCategories } from '../services/categories';
import { getAuthors } from '../services/authors';
import { addVideo, getVideos, removeVideo, updateVideo } from '../services/videos';
import { Author, Category, ProcessedVideo, Video } from '../common/interfaces';
import { convertToProcessedVideo } from '../utils/helpers';

// AppThunk type
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const thunkLoadCategories = (): AppThunk => async (dispatch) => {
  try {
    const categoriesResp = await getCategories();
    dispatch(loadCategoriesAction(categoriesResp));
  } catch (error) {
    console.error('load categories:', error);
  }
};

export const thunkLoadAuthors = (): AppThunk => async (dispatch) => {
  try {
    const authorsResp = await getAuthors();
    dispatch(loadAuthorsAction(authorsResp));
  } catch (error) {
    console.error('load authors: ', error);
  }
};

export const thunkLoadProcessedVideos = (): AppThunk => async (dispatch) => {
  try {
    const videosResp = await getVideos();
    dispatch(loadProcessedVideosAction(videosResp));
  } catch (error) {
    console.error('load videos: ', error);
  }
};

export const thunkAddVideo = (video: Video, author: Author): AppThunk => async (dispatch, getState) => {
  try {
    let categories: Category[] = getState().categories;
    await addVideo(video, author);

    let processedVideo: ProcessedVideo = convertToProcessedVideo(video, author, categories);
    dispatch(addVideoAction(processedVideo));
  } catch (error) {
    console.error('add video: ', error);
  }
};

export const thunkUpdateVideo = (video: Video, author: Author): AppThunk => async (dispatch, getState) => {
  let categories: Category[] = getState().categories;
  let videos: ProcessedVideo[] = getState().videos;
  try {
    let videoResp: Video = await updateVideo(video, author);
    let processedVideo: ProcessedVideo = convertToProcessedVideo(videoResp, author, categories);
    const videoIndex = videos.findIndex((vid) => vid.id === video.id);
    videos[videoIndex] = processedVideo;
    dispatch(updateVideoAction(videos));
  } catch (error) {
    console.error('update video: ', error);
  }
};

export const thunkDeleteVideo = (video: ProcessedVideo): AppThunk => async (dispatch, getState) => {
  try {
    let videoResp = await removeVideo(video);
    let videos: ProcessedVideo[] = getState().videos.filter((vid) => vid.id !== videoResp.id);

    dispatch(deleteVideoAction(videos));
  } catch (error) {
    console.error('delete video: ', error);
  }
};
