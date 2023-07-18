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

  await deleteExpiredSession();
  return session;
});

export const deleteExpiredSession = cache(async () => {
  await sql`
  DELETE FROM
  sessions
  WHERE expiry_timestamp < now()
  `;
});

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    DELETE FROM
      sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      id,
      token
  `;

  return session;
});
