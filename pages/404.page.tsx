// pages/404.js
import Link from 'next/link';
import styles from './404.module.css'; // Optional for styling
import GuestLayout from '@/components/GuestLayout/GuestLayout';
import { ReactElement } from 'react';

export default function Custom404() {
  return (
    <div className="mainContainer">
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorMessage}>Oops! Page Not Found</h2>
      <p>
        It looks like the page you're looking for doesn't exist. You can go back to the homepage:
      </p>
      <Link href="/" legacyBehavior>
        <a className={styles.homeLink}>Go to Homepage</a>
      </Link>
    </div>
    </div>
  );
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
