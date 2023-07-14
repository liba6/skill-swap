import { cache } from 'react';
import { sql } from './connect';

export const createNewPreferences = cache(
  async (
    username: string,
    favoriteColor: string,
    favoriteAuthor: string,
    favoriteFood: string,
    favoritePlace: string,
  ) => {
    await sql`
    INSERT INTO preferences(username, favorite_color, favorite_author, favorite_food, favorite_place)
    VALUES (${username}, ${favoriteColor}, ${favoriteAuthor}, ${favoriteFood}, ${favoritePlace} )
`;
  },
);

export const getPreferencesByUsername = cache(async (username: string) => {
  const [user] = await sql<
    {
      username: string;
      favoriteColor: string;
      favoriteAuthor: string;
      favoriteFood: string;
      favoritePlace: string;
    }[]
  >`
  SELECT
  favorite_color, favorite_author,favorite_food, favorite_place
  FROM preferences  WHERE
  username = ${username}
  `;
  return user;
});
