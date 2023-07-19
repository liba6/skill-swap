import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Skill-Swap</h1>
      <h2 className={styles.h2}>
        Upgrade your Abilities, Share your Expertise{' '}
      </h2>
      <button>
        <Link className={styles.btn} href="/login">
          Start
        </Link>
      </button>
    </div>
  );
}
