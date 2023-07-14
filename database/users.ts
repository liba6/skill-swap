import { cache } from 'react';
import { sql } from './connect';

type User = {
  id: number;
  username: string;
  passwordHash: string;
};

export const getUserByUsernameWithPasswordHash = cache(
  async (username: string) => {
    const [user] = await sql<User[]>`
  SELECT
    *
  FROM
    users
  WHERE username = ${username}`;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<
    { id: number; username: string; skillTeach: string; skillLearn: string }[]
  >`
  SELECT id, username, skill_teach,skill_learn FROM users
  WHERE username = ${username}`;
  return user;
});

export const getUserBySkillTeach = cache(async (skillLearn: string) => {
  const users = await sql<
    { id: number; username: string; skillTeach: string; skillLearn: string }[]
  >`SELECT * FROM users WHERE skill_teach = ${skillLearn}`;

  return users;
});

export const getUserBySkillLearn = cache(async (skillTeach: string) => {
  const users = sql<
    { id: number; username: string; skillTeach: string; skillLearn: string }[]
  >`
  SELECT * FROM users WHERE skill_learn = ${skillTeach}`;
  return users;
});

export const createUser = cache(
  async (
    username: string,
    passwordHash: string,
    email: string,
    skillteach: string,
    skilllearn: string,
  ) => {
    const [user] = await sql<
      {
        id: number;
        email: string;
        username: string;
        skillteach: string;
        skilllearn: string;
      }[]
    >`
  INSERT INTO users
  (username, password_hash, email, skill_teach, skill_learn )
  VALUES
  (${username}, ${passwordHash}, ${email}, ${skillteach}, ${skilllearn}

    )
  RETURNING
  id,
  email,
  username,
  skill_teach,
  skill_learn

  `;
    return user;
  },
);
