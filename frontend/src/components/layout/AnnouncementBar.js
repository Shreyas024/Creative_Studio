'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/components/AnnouncementBar.module.css';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  const announcements = [
    'Complimentary Sanctified Gift Box with orders over ₹2,499',
    'Handcrafted Festive Collection Now Live',
    'Worldwide Delivery',
  ];

  if (!isVisible) return null;

  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.currency}>INR (₹)</span>
          <span className={styles.divider}>|</span>
          <span className={styles.link}>Sacred Concierge</span>
        </div>

        <div className={styles.center}>
          <div className={styles.marqueeWrapper}>
            <div className={styles.marquee}>
              {[...announcements, ...announcements].map((text, i) => (
                <span key={i} className={styles.marqueeItem}>
                  {text}
                  <span className={styles.dot}>•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <span className={styles.link}>Bespoke Orders</span>
          <span className={styles.divider}>|</span>
          <span className={styles.link}>Our Artisans</span>
        </div>
      </div>
    </div>
  );
}
