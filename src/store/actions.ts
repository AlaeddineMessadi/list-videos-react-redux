import { Author, Category } from '../common/interfaces';
import { LoadInitialActionTypes, SET_AUTHORS, SET_CATEGORIES } from './types';

// TypeScript infers that this function is returning loadCategories
export function loadCategories(): LoadInitialActionTypes {
  var categories = [] as Category[];
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
}

// TypeScript infers that this function is returning loadAuthors
export function loadAuthors(): LoadInitialActionTypes {
  var authors = [] as Author[];
  return {
    type: SET_AUTHORS,
    payload: authors,
  };
}
