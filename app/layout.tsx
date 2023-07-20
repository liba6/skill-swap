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
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <nav>
          {user ? (
            <a href="/logout">Logout</a>
          ) : (
            <div>
              <a href="/login">Login</a>
            </div>
          )}
        </nav>
        {props.children}
        <footer>Liba Shapiro MSc 2023</footer>
      </body>
    </html>
  );
}
