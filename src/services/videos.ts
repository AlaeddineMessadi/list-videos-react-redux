import { getCategories } from './categories';
import { getAuthors, updateAuthor } from './authors';
import { Author, ProcessedVideo, Video } from '../common/interfaces';
import { convertToProcessedVideo, findAuthorByName, findVideoById } from '../utils/helpers';

export const getVideos = (): Promise<ProcessedVideo[]> => {
  return Promise.all([getCategories(), getAuthors()]).then(([categories, authors]) => {
    let videos: ProcessedVideo[] = [];

    authors.map((author) =>
      author.videos.forEach((video) => {
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
  await updateAuthor(updatedAuthor);

  return video;
};

/**
 * update a video related to author
 * @param author Author
 */
export const updateVideo = async (video: Video, author: Author): Promise<Video> => {
  let updatedAuthor = author;

  const videoIndex = updatedAuthor.videos.findIndex((vid) => vid.id === video.id);
  updatedAuthor.videos[videoIndex] = video;

  await updateAuthor(updatedAuthor);

  return video;
};

/**
 * Remove a video relative to author
 * @param author Author
 */
export const removeVideo = async (video: ProcessedVideo): Promise<ProcessedVideo> => {
  let authors = await getAuthors();

  let author = findAuthorByName(authors, video.author);
  let videoIndex = author.videos.findIndex((vid) => vid.id === video.id);

  let updatedAuthor = author;
  updatedAuthor.videos.splice(videoIndex, 1);
  await updateAuthor(updatedAuthor);

  return video;
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
