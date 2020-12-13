import { Author, Category, ProcessedVideo, Video } from '../common/interfaces';
import * as _ from 'lodash';

export const parseCategoryIds: (categories: Category[]) => number[] = (categories: Category[]): number[] => {
  return categories.map((cat: Category) => cat.id);
};

export const findAuthorByName: (authors: Author[], authorName: string) => Author = (authors, authorName): Author => {
  const authorIndex = authors.findIndex((val) => val.name === authorName);
  return authors[authorIndex];
};

export const findVideoById: (videos: Video[], videoId: number) => Video = (videos, videoId): Video => {
  const videoIndex = videos.findIndex((video) => video.id == videoId);
  return videos[videoIndex];
};

export const findAuthorByVideoId: (authors: Author[], videoId: number) => Author = (authors, videoId): Author => {
  const authorIndex = authors.findIndex((val) => findVideoById(val.videos, videoId));
  return authors[authorIndex];
};

export const convertToProcessedVideo: (video: Video, author: Author, categories: Category[]) => ProcessedVideo = (
  video,
  author,
  categories
): ProcessedVideo => {
  const { id, catIds, name } = video;

  let processedVideo: ProcessedVideo = {
    id,
    name,
    author: author.name,
    categories: catIds.map((catId) => categories[categories.findIndex((v) => v.id === catId)].name),
  };
  return processedVideo;
};
