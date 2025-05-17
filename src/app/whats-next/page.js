"use client";

import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import styles from './whats-next.module.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

export default function WhatsNext() {
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container}>
        <h1 className={`${styles.heading} ${spaceGrotesk.className}`}>What&apos;s Next?</h1>
        <p className={styles.intro}>
          The fight against climate change is ongoing, and every action counts. Here&apos;s how you can help:
        </p>
        <ul className={styles.list}>
          <li>Reduce your carbon footprint: use public transport, bike, or walk when possible.</li>
          <li>Conserve energy: turn off lights and electronics when not in use.</li>
          <li>Support renewable energy sources and sustainable products.</li>
          <li>Educate others about climate change and its impacts.</li>
          <li>Get involved with local or global environmental organizations.</li>
          <li>Advocate for policies that protect the environment.</li>
        </ul>
        <p className={`${styles.thankyou} ${spaceGrotesk.className}`}>
          Together, we can make a difference. Thank you for caring about our planet!
        </p>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
      </main>
    </div>
  );
}
