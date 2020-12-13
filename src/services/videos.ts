import { getCategories } from './categories';
import { getAuthors, updateAuthor } from './authors';
import { Author, ProcessedVideo, Video } from '../common/interfaces';
import { result } from 'lodash';
import { convertToProcessedVideo, findAuthorByName, findVideoById } from '../utils/helpers';

export const getVideos = (): Promise<ProcessedVideo[]> => {
  return Promise.all([getCategories(), getAuthors()]).then(([categories, authors]) => {
    let videos: ProcessedVideo[] = [];

    authors.map((author) =>
      author.videos.map((video) => {
        let single: ProcessedVideo = convertToProcessedVideo(video, author, categories);

        videos.push(single);
      })
    );
    return videos;
  });
};

/**
 * Add a video related to author
 * @param author Author
 */
export const addVideo = async (video: Video, author: Author): Promise<Video> => {
  let updatedAuthor = author;
  updatedAuthor.videos.push(video);
  let result = await updateAuthor(updatedAuthor);

  return video;
};

/**
 * Remove a video relative to author
 * @param author Author
 */
export const removeVideo = async (videoId: number, authorName: string): Promise<Video[]> => {
  let authors = await getAuthors();

  let author = findAuthorByName(authors, authorName);
  let videoIndex = author.videos.findIndex((video) => video.id === videoId);

  let updatedAuthor = author;
  updatedAuthor.videos.splice(videoIndex, 1);
  let { videos } = await updateAuthor(updatedAuthor);

  return videos;
};

/**
 * Get video by ID
 * @param videoId number
 */
export const getVideoById = async (videoId: number): Promise<Video> => {
  let authors = await getAuthors();
  let videos = authors.map((author) => author.videos).flat();
  let video = findVideoById(videos, videoId);
  return video;
};
