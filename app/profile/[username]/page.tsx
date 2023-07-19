import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getUserBySkillLearn,
  getUserBySkillTeach,
  getUserByUsername,
} from '../../../database/users';
import styles from './page.module.scss';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }
  const teachers = await getUserBySkillTeach(user.skillLearn);

  const students = await getUserBySkillLearn(user.skillTeach);

  return (
    <div className={styles.div}>
      <h1>{user.username}</h1>
      <hr></hr>

      <p>Skill you want to learn: {user.skillLearn} </p>
      <div>
        {teachers.length > 0 ? (
          <>
            <p>Here are the teachers available to teach you :</p>
            {teachers.map((teacher) => (
              <li key={teacher.id}>
                {' '}
                {teacher.username}
                <span></span>
                <Link href={`/preferences/${teacher.username}`}>
                  <button>Learn more about {teacher.username} </button>
                </Link>
                <a href={`mailto:${teacher.email}`} target="_blank">
                  <button>Contact {teacher.username}</button>
                </a>{' '}
              </li>
            ))}
          </>
        ) : (
          <span>Sorry, at this time, no available teachers found.</span>
        )}
      </div>

      <hr></hr>
      <p>Skill you want to teach: {user.skillTeach}</p>
      {!students || students.length === 0 ? (
        <div>No students need your services at this time.</div>
      ) : (
        <div>
          {' '}
          <p>Here are the students waiting to learn from you:</p>
          {students.map((student) => (
            <li key={student.id}>
              {' '}
              {student.username}
              <span></span>
              <Link href={`/preferences/${student.username}`}>
                <button>Learn more about {student.username} </button>
              </Link>
              <a href={`mailto:${student.email}`} target="_blank">
                <button>Contact {student.username}</button>
              </a>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
