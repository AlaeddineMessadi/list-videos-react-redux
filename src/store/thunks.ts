import { Action } from 'redux';
import { loadCategoriesAction, loadAuthorsAction, loadProcessedVideosAction, addVideoAction } from './actions';
import { RootState } from './';
import { ThunkAction } from 'redux-thunk';
import { getCategories } from '../services/categories';
import { getAuthors } from '../services/authors';
import { addVideo, getVideos, removeVideo } from '../services/videos';
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
  let videosResp: Video = await addVideo(video, author);

  let processedVideo: ProcessedVideo = convertToProcessedVideo(video, author, categories);
  dispatch(addVideoAction(processedVideo));
};

// export const thunkDeleteVideo = (id: number, authorName: string): AppThunk => async (dispatch) => {
//   let videosResp: Video[] = await removeVideo(id, authorName);

//   dispatch(deleteVideoAction(videosResp));
// };
