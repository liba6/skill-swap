import { notFound } from 'next/navigation';
import {
  getUserBySkillLearn,
  getUserBySkillTeach,
  getUserByUsername,
} from '../../../database/users';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }
  const teachers = await getUserBySkillTeach(user.skillLearn);

  const students = await getUserBySkillLearn(user.skillTeach);

  return (
    <>
      <h1>{user.username}</h1>
      <p>id:{user.id}</p>
      <hr></hr>

      <p>Skill you want to learn: {user.skillLearn} </p>
      <p>
        {' '}
        Here are the teachers available to teach you :
        {teachers ? (
          teachers.map((teacher) => (
            <li key={teacher.id}> {teacher.username}</li>
          ))
        ) : (
          <span>Sorry, at this time, no available teachers found.</span>
        )}
      </p>

      <hr></hr>
      <p>Skill you want to teach: {user.skillTeach}</p>
      <p>
        {' '}
        Here are the students waiting to learn from you:
        {students ? (
          students.map((student) => (
            <li key={student.id}> {student.username}</li>
          ))
        ) : (
          <span>No students need your services at this time.</span>
        )}
      </p>
    </>
  );
}
