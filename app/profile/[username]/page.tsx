import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);
  console.log('user', user);
  if (!user) {
    notFound();
  }
  return (
    <>
      <h1>{user.username}</h1>
      <p>id:{user.id}</p>
      <p>Skill I want to teach: {user.skillTeach}</p>
      <p>Skill I want to learn: {user.skillLearn} </p>
    </>
  );
}
