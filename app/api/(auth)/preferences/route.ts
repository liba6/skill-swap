import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  await request.json();

  return NextResponse.json('hoohooohooo');
};
