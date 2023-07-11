import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, getUserByUsername } from '../../../../database/users';

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  skillteach: z.string(),
  skilllearn: z.string(),
});

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | {
      user: {
        username: string;
        password: string;
        email: string;
        skillteach: string;
        skilllearn: string;
      };
    };

export type RegisterResponsePrefBody =
  | { errors: { message: string }[] }
  | {
      user: {
        username: string;
        favoriteColor: string;
        favoriteAuthor: string;
        favoriteFood: string;
        favoritePlace: string;
      };
    };

export const POST = async (request: NextRequest) => {
  // 1. check that inputs have userSchema
  const body = await request.json();
  const result = userSchema.safeParse(body);
  console.log('body', body);
  console.log('result', result);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  // check if any input fields are empty

  if (
    !result.data.username ||
    !result.data.password ||
    !result.data.email ||
    !result.data.skillteach ||
    !result.data.skilllearn
  ) {
    return NextResponse.json(
      { errors: [{ message: 'One of the required fields is empty' }] },
      { status: 400 },
    );
  }
  // 2. Check if user exists
  // 2a. fetch the table to compare username
  const user = await getUserByUsername(result.data.username);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'username is already taken' }] },
      { status: 400 },
    );
  }
  // 3. hash the password
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // 4. Create the user/ insert user into database table
  const newUser = await createUser(
    result.data.username,
    passwordHash,
    result.data.email,
    result.data.skillteach,
    result.data.skilllearn,
  );

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'user creation failed.' }] },
      { status: 500 },
    );
  }
  // 5. Tell client that username created

  return NextResponse.json({ user: { username: newUser.username } });
};
