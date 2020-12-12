import { getCategories } from './categories';
import { getAuthors } from './authors';
import { ProcessedVideo } from '../common/interfaces';

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
