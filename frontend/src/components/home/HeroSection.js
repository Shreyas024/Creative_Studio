'use client';

import Link from 'next/link';
import styles from '@/styles/components/HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badgeWrapper}>
            <span className={styles.topBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              AUSPICIOUS FESTIVE EDIT 2025
            </span>
          </div>
          
          <h1 className={styles.title}>
            Sacred Devotion Meets Contemporary Artistry
          </h1>
          
          <p className={styles.description}>
            Meticulously handcrafted deity poshaks in pure Banarasi zari silk, solid cast-brass sanctuary urlis, and sanctified festival heirlooms designed to enrich devotional living with quiet luxury.
          </p>
          
          <div className={styles.actions}>
            <Link href="/collections" className={`btn btn-primary ${styles.ctaBtn}`}>
              Explore Festive Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <Link href="/about" className={`btn btn-outline ${styles.secondaryBtn}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              Our Philosophy
            </Link>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <svg className={styles.trustIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div>
                <div className={styles.trustTitle}>100% PURE SILK</div>
                <div className={styles.trustDesc}>Varanasi Brocades</div>
              </div>
            </div>
            <div className={styles.trustBadge}>
              <svg className={styles.trustIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <div>
                <div className={styles.trustTitle}>CAST BRASS</div>
                <div className={styles.trustDesc}>Lost-wax Casting</div>
              </div>
            </div>
            <div className={styles.trustBadge}>
              <svg className={styles.trustIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              <div>
                <div className={styles.trustTitle}>SANCTIFIED</div>
                <div className={styles.trustDesc}>Ganga Jal Spritz</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1000&auto=format&fit=crop" 
              alt="Handcrafted festive collection with diya and traditional textiles" 
              className={styles.heroImage}
            />
            
            <div className={styles.featuredCard}>
              <div className={styles.featuredIconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
              </div>
              <div className={styles.featuredDetails}>
                <span className={styles.featuredTag}>FEATURED RITUAL ENSEMBLE</span>
                <h4 className={styles.featuredTitle}>Mayura Zardozi Poshak & Brass Deepam</h4>
                <p className={styles.featuredDesc}>Hand-carved in Varanasi Atelier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
