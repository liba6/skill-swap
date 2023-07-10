import Link from 'next/link';
import styles from './layout.module.scss';

export const metadata = {
  title: 'Skill-Swap',
  description:
    'Skill-Swap is a dynamic online platform that facilitates the exchange of skills between individuals. ',
};
type Props = {
  children: React.ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <head />
      <body className={styles.body}>
        <nav>
          <ul>
            <a href="/login">Login</a>
            <a href="/logout">Logout</a>
            <a href="/register">Register</a>
            <a href="/preferences"> Preferences</a>
          </ul>
        </nav>
        {props.children}
        <footer>Liba Shapiro MSc 2023</footer>
      </body>
    </html>
  );
}
