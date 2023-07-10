import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <h1 className={styles.h1}>Skill-Swap</h1>
      <h2 className={styles.h2}>Learn, Teach, Skill-Swap </h2>
      <Link className={styles.btn} href="/login">
        Skill-Swap
      </Link>
    </div>
  );
}
