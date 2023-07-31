import { cookies } from 'next/headers';
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
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              Home
            </a>
            {user ? (
              <>
                <button
                  className="navbar-toggler"
                  data-bs-toggle="collapse"
                  data-bs-target="#nav"
                  aria-controls="nav"
                  aria-label="Expand Navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="nav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item ">
                      <a
                        href={`/profile/${user.username}`}
                        className="nav-link"
                      >
                        My Profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/calculations/user"
                        className="nav-link"
                        aria-current="page"
                      >
                        Manage account
                      </a>
                    </li>
                    <li className="nav-item ">
                      <a href="/logout" className="nav-link">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : null}
          </div>
        </nav>
        {props.children}
        <div className="container">
          <footer className={`row justify-content-center ${styles.footer} `}>
            Liba Shapiro MSc 2023
          </footer>
        </div>
      </body>
    </html>
  );
}
