import { Author, Category, Video } from '../common/interfaces';

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
