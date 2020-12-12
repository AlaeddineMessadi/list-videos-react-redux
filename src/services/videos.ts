import { getCategories } from './categories';
import { getAuthors, updateAuthor } from './authors';
import { Author, ProcessedVideo, Video } from '../common/interfaces';
import { result } from 'lodash';
import { findAuthorByName } from '../utils/helpers';

export const getVideos = (): Promise<ProcessedVideo[]> => {
  return Promise.all([getCategories(), getAuthors()]).then(([categories, authors]) => {
    let videos: ProcessedVideo[] = [];

    authors.map((author) =>
      author.videos.map(({ id, catIds, name }, j) => {
        let single: ProcessedVideo = {
          id,
          name,
          author: author.name,
          categories: catIds.map((catId) => categories[categories.findIndex((v) => v.id === catId)].name),
        };

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
export const addVideo = async (video: Video, author: Author): Promise<Video[]> => {
  let updatedAuthor = author;
  updatedAuthor.videos.push(video);
  let { videos } = await updateAuthor(updatedAuthor);

  return videos;
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
