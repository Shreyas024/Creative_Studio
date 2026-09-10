'use client';

import Link from 'next/link';
import styles from '@/styles/components/FestiveGifting.module.css';

export default function FestiveGifting() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.contentCol}>
            <span className={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
              </svg>
              FESTIVAL GIFTING CONCIERGE
            </span>
            <h2 className={styles.title}>Curated Festive Hampers & Corporate Pooja Keepsakes</h2>
            <p className={styles.description}>
              Elevate auspicious celebrations with custom bespoke hampers featuring cast brass akhand diyas, gourmet sattvic prashad treats, organic temple fragrances, and personalised copper inscription plaques.
            </p>
            <div className={styles.actions}>
              <Link href="/collections/gifting" className={styles.primaryBtn}>
                Discover Festive Hampers
              </Link>
              <Link href="/corporate" className={styles.secondaryBtn}>
                Download Corporate Catalogue
              </Link>
            </div>
          </div>
          
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop" 
                alt="Luxury curated festive hamper with brass diya and silks" 
                className={styles.image} 
              />
              <div className={styles.imageTag}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                Custom gift ribbons & calligraphy tags included
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
