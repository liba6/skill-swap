import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createNewPreferences } from '../../../../database/preferences';

const userSchema = z.object({
  username: z.string(),
  favoriteColor: z.string(),
  favoriteAuthor: z.string(),
  favoriteFood: z.string(),
  favoritePlace: z.string(),
});
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const result = userSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }
  console.log('backendpref', result);
  // check no input fields empty
  if (
    !result.data.username ||
    !result.data.favoriteColor ||
    !result.data.favoriteAuthor ||
    !result.data.favoriteFood ||
    !result.data.favoritePlace
  ) {
    return NextResponse.json(
      { errors: [{ message: 'One of the required fields is empty' }] },
      { status: 400 },
    );
  }

  // insert preferences in preferences table
  const preferences = createNewPreferences(
    result.data.username,
    result.data.favoriteColor,
    result.data.favoriteAuthor,
    result.data.favoriteFood,
    result.data.favoritePlace,
  );
  if (!preferences) {
    return NextResponse.json(
      { errors: [{ message: 'preference creation failed.' }] },
      { status: 500 },
    );
  }
  return NextResponse.json('All preferences added');
};
