import { Author } from '../common/interfaces';

export const getAuthors = (): Promise<Author[]> => {
  return fetch(`${process.env.REACT_APP_API}/authors`).then((response) => (response.json() as unknown) as Author[]);
};

/**
 * Update Author
 * @param author Author
 */
export const updateAuthor = async (author: Author): Promise<Author> => {
  return await fetch(`${process.env.REACT_APP_API}/authors/${author.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      videos: author.videos,
      name: author.name,
    }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((response) => (response.json() as unknown) as Author);
};
