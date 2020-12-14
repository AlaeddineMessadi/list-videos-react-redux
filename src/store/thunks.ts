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
  const categoriesResp = await getCategories();
  dispatch(loadCategoriesAction(categoriesResp));
};

export const thunkLoadAuthors = (): AppThunk => async (dispatch) => {
  const authorsResp = await getAuthors();
  dispatch(loadAuthorsAction(authorsResp));
};

export const thunkLoadProcessedVideos = (): AppThunk => async (dispatch) => {
  const videosResp = await getVideos();
  dispatch(loadProcessedVideosAction(videosResp));
};

export const thunkAddVideo = (video: Video, author: Author): AppThunk => async (dispatch, getState) => {
  let categories: Category[] = getState().categories;
  await addVideo(video, author);

  let processedVideo: ProcessedVideo = convertToProcessedVideo(video, author, categories);
  dispatch(addVideoAction(processedVideo));
};

export const thunkUpdateVideo = (video: Video, author: Author): AppThunk => async (dispatch, getState) => {
  let categories: Category[] = getState().categories;
  let videos: ProcessedVideo[] = getState().videos;
  let videoResp: Video = await updateVideo(video, author);

  console.log('non updated', videos);
  // new array with updated video
  let processedVideo: ProcessedVideo = convertToProcessedVideo(videoResp, author, categories);
  const videoIndex = videos.findIndex((vid) => vid.id === video.id);
  videos[videoIndex] = processedVideo;

  console.log(' updated', videos);

  dispatch(updateVideoAction(videos));
};

export const thunkDeleteVideo = (video: ProcessedVideo): AppThunk => async (dispatch, getState) => {
  let videoResp = await removeVideo(video);

  let videos: ProcessedVideo[] = getState().videos.filter((vid) => vid.id != videoResp.id);

  dispatch(deleteVideoAction(videos));
};
