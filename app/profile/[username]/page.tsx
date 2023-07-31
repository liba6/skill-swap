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
    <div className={`${styles.div}`}>
      <div className="container">
        <h1>{user.username}</h1>
        <div className="row">
          <div className="col">
            <div className="row mb-5 mt-4"></div>
            <div>
              {teachers.length > 0 ? (
                <>
                  <p>
                    Here are the teachers available to teach you{' '}
                    {user.skillLearn}:
                  </p>
                  {teachers.map((teacher) => (
                    <li key={teacher.id}>
                      {' '}
                      {teacher.username}
                      <div className="row">
                        <div className="col">
                          <Link href={`/preferences/${teacher.username}`}>
                            <button>
                              Learn more about {teacher.username}{' '}
                            </button>
                          </Link>
                        </div>
                        <div className="col">
                          <a href={`mailto:${teacher.email}`} target="_blank">
                            <button>Contact {teacher.username}</button>
                          </a>{' '}
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <span>Sorry, at this time, no available teachers found.</span>
              )}
            </div>
          </div>

          <div className="col">
            <div className="row mt-4 mb-5">
              {/* <p>Skill you want to teach: {user.skillTeach}</p> */}
            </div>
            {!students || students.length === 0 ? (
              <span>No students need your services at this time.</span>
            ) : (
              <div>
                {' '}
                <p>
                  Here are the students waiting to learn
                  {' ' + user.skillTeach}:
                </p>
                {students.map((student) => (
                  <div key={student.id} className="container">
                    <table className="table table-secondary table-striped table-bordered">
                      <thead>
                        <tr>
                          <th> Student</th>
                          <th> About</th>
                          <th>Contact</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        <tr>
                          <td> {student.username}</td>
                          <td>
                            {' '}
                            <Link href={`/preferences/${student.username}`}>
                              <button>More about {student.username} </button>
                            </Link>
                          </td>
                          <td>
                            {' '}
                            <a href={`mailto:${student.email}`} target="_blank">
                              <button>Contact {student.username}</button>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
