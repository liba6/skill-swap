import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { getUserByUsernameWithPasswordHash } from '../../../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../../../util/cookies';

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };

export const POST = async (request: NextRequest) => {
  // 1. check if data fits schema
  const body = await request.json();
  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        errrors: result.error.issues,
      },
      { status: 400 },
    );
  }
  // 2. check if both username and password fields not empty
  if (!result.data.username || !result.data.password) {
    return NextResponse.json(
      { errors: [{ message: 'username or password field is empty' }] },
      { status: 400 },
    );
  }

  // 3. check if user exists on database
  const userWithPasswordHash = await getUserByUsernameWithPasswordHash(
    result.data.username,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'user not found' }] },
      { status: 401 },
    );
  }

  // 4. validate password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { errors: [{ message: 'invalid password' }] },
      { status: 401 },
    );
  }
  // 5. create Session

  // create token
  const token = crypto.randomBytes(80).toString('base64');

  // create session
  const session = await createSession(userWithPasswordHash.id, token);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'session creation failed' }] },
      { status: 500 },
    );
  }

  // attach serialized new cookie to header of response
  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );

  // add new header
  return NextResponse.json(
    { user: { username: userWithPasswordHash.username } },
    {
      status: 200,
      // attach new serialized cookie to header of response
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
};
