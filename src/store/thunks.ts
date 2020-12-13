import { Action } from 'redux';
import { loadCategoriesAction, loadAuthorsAction, loadProcessedVideosAction } from './actions';
import { RootState } from './';
import { ThunkAction } from 'redux-thunk';
import { getCategories } from '../services/categories';
import { getAuthors } from '../services/authors';
import { getVideos } from '../services/videos';

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
