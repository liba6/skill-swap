import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import styles from './layout.module.scss';

export const metadata = {
  title: 'Skill-Swap',
  description:
    'Skill-Swap is a dynamic online platform that facilitates the exchange of skills between individuals. ',
};
type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function RootLayout(props: Props) {
  // get session token from cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // get user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  return (
    <html lang="en">
      <head />
      <body>
        <nav>
          <ul>
            {/* {user ? (
              <a href="/logout">Logout</a>
            ) : (
              <> */}
            <a href="/register">Register</a>
            <a href="/logout">Logout</a>

            <a href="/login">Login</a>
            {/* </> */}
          </ul>
        </nav>
        {props.children}
        <footer>Liba Shapiro MSc 2023</footer>
      </body>
    </html>
  );
}
