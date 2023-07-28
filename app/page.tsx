import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.div}>
      <div className={styles.pagediv}>
        <h1 className={styles.h1}>Skill-Swap</h1>
        <h2 className={styles.h2}>
          Upgrade your Skills, Share your Expertise{' '}
        </h2>
        <div className={styles.btncontainer}>
          <Link href="/login">
            <button className="btn btn-warning">Start Swapping</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
