import { Author, Category, Format, ProcessedVideo, Video } from '../common/interfaces';
import * as _ from 'lodash';

export const parseCategoryIds: (categories: Category[]) => number[] = (categories: Category[]): number[] => {
  return categories.map((cat: Category) => cat.id);
};

export const parseCategoryNames: (categories: Category[], names: string[]) => number[] = (
  categories: Category[],
  names: string[]
): number[] => {
  return categories.filter((cat: Category) => names.includes(cat.name)).map((cat: Category) => cat.id);
};

/**
 * Find highest video quality
 * @param video ProcessedVideo
 */
export const findHighestVideoFormat: (video: ProcessedVideo) => string = (video: ProcessedVideo): string => {
  // sorted format table by quality TODO sortedByQualityFormat and get first object
  const sorted = video.formats;
  if (_.isUndefined(sorted) || _.isEmpty(sorted)) return '';

  // return same array if only one quality type exists
  const highestQuality: Format = sorted.length > 1 ? sorted[1] : sorted[0];
  return `${highestQuality.name} ${highestQuality.res}`;
};

export const findAuthorById: (authors: Author[], authorId: number) => Author = (authors, authorId): Author => {
  const authorIndex = authors.findIndex((val) => val.id === authorId);
  return authors[authorIndex];
};

export const findAuthorByName: (authors: Author[], authorName: string) => Author = (authors, authorName): Author => {
  const authorIndex = authors.findIndex((val) => val.name === authorName);
  return authors[authorIndex];
};

export const findVideoById: (videos: Video[], videoId: number) => Video = (videos, videoId): Video => {
  const videoIndex = videos.findIndex((video) => video.id == videoId);
  return videos[videoIndex];
};

export const findProcessedVideoById: (videos: ProcessedVideo[], videoId: number) => ProcessedVideo = (videos, videoId): ProcessedVideo => {
  const videoIndex = videos.findIndex((video) => video.id == videoId);
  return videos[videoIndex];
};

export const findAuthorByVideoId: (authors: Author[], videoId: number) => Author = (authors, videoId): Author => {
  const authorIndex = authors.findIndex((val) => findVideoById(val.videos, videoId));
  return authors[authorIndex];
};

export const findCategoriesByVideo: (categories: Category[], video: ProcessedVideo) => Category[] = (categories, video): Category[] => {
  const catIds = parseCategoryNames(categories, video.categories);
  const foundCategories = categories.filter((category) => catIds.includes(category.id));
  return foundCategories;
};

export const convertToProcessedVideo: (video: Video, author: Author, categories: Category[]) => ProcessedVideo = (
  video,
  author,
  categories
): ProcessedVideo => {
  const { id, catIds, name, formats, date } = video;

  let processedVideo: ProcessedVideo = {
    id,
    name,
    author: author.name,
    categories: catIds.map((catId) => categories[categories.findIndex((v) => v.id === catId)].name),
    formats,
    date,
  };
  return processedVideo;
};
