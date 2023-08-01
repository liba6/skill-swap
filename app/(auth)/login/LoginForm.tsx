'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { getSafeReturnToPath } from '../../../utils/validation';
import { LoginResponseBody } from '../../api/(auth)/login/route';
import styles from './page.module.scss';

export default function LoginForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        const data: LoginResponseBody = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }
        router.push(`/profile/${data.user.username}`);
        router.refresh();
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`} className={styles.error}>
          Error: {error.message}
        </div>
      ))}
      <div className={styles.body}>
        <h1 className="h-1 text-center p-4">Log In</h1>
        <div className={styles.container}>
          <div className="form-floating m-4">
            <input
              value={username}
              className="form-control"
              onChange={(event) => setUsername(event.currentTarget.value)}
              placeholder="Username"
              required
              name="username"
            />
            <label className="form-label">Username</label>
          </div>
          <div className="form-floating m-4">
            <input
              value={password}
              type="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
              className="form-control"
              name="password"
              placeholder="Password"
              required
            />
            <label className="form-label">Password</label>
          </div>
          <div className={styles.buttons}>
            <button className={styles.button}>Log In</button>

            <Link className={styles.button} href="/register">
              No account yet?
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
