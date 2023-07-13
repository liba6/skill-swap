import { cache } from 'react';
import { sql } from './connect';

export const createSession = cache(async (userId: number, token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
  INSERT INTO sessions
   (user_id, token)
  VALUES
  (${userId},${token})
  RETURNING
  id,
  token
  `;
  return session;
});
