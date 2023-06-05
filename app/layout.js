import Link from 'next/link';
import styles from './layout.module.scss';

export const metadata = {
  title: 'Skill-Swap',
  description:
    'Skill-Swap is a dynamic online platform that facilitates the exchange of skills between individuals. ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={styles.body}>
        <nav>
          <ul>
            <Link href="/login">Login</Link>
            <Link href="/logout">Logout</Link>{' '}
            <Link href="/register">Register</Link>
          </ul>
        </nav>
        {children}
        <footer>Liba Shapiro MSc 2023</footer>
      </body>
    </html>
  );
}
