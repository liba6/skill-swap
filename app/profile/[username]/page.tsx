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
      <div className="container">
        <h1 className="h-1 p-4 text-center">{user.username}</h1>
        <div className="row">
          <div className="col">
            <div className="row mb-5 "></div>
            <div>
              {teachers.length > 0 ? (
                <>
                  <h4 className="h-4 m-3">
                    Here are the teachers available to teach you{' '}
                    {user.skillLearn}:
                  </h4>
                  {teachers.map((teacher) => (
                    <div key={teacher.id} className="container ">
                      <table className="table table-secondary table-striped table-bordered ">
                        <thead>
                          <tr>
                            <th> Teacher</th>
                            <th> About</th>
                            <th>Contact</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          <tr>
                            <td> {teacher.username}</td>
                            <td>
                              {' '}
                              <Link href={`/preferences/${teacher.username}`}>
                                <button className="btn btn-outline-secondary">
                                  About {teacher.username}{' '}
                                </button>
                              </Link>
                            </td>
                            <td>
                              {' '}
                              <a
                                href={`mailto:${teacher.email}`}
                                target="_blank"
                              >
                                <button className="btn btn-outline-success">
                                  Contact {teacher.username}
                                </button>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </>
              ) : (
                <h4 className="h-4 m-3">
                  Sorry, at this time no available teachers found.
                </h4>
              )}
            </div>
          </div>

          <div className="col">
            <div className="row mb-5"></div>
            {!students || students.length === 0 ? (
              <h4 className="h-4 m-3">
                No students need your services at this time.
              </h4>
            ) : (
              <div>
                <h4 className="h-4 m-3">
                  Here are the students waiting to learn
                  {' ' + user.skillTeach}:
                </h4>
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
                              <button className="btn btn-outline-secondary">
                                About {student.username}{' '}
                              </button>
                            </Link>
                          </td>
                          <td>
                            {' '}
                            <a href={`mailto:${student.email}`} target="_blank">
                              <button className="btn btn-outline-success">
                                Contact {student.username}
                              </button>
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
