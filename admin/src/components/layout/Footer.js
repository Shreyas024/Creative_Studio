'use client';

import Link from 'next/link';
import styles from '@/styles/components/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                  <path d="M14 2L26 8v12l-12 6L2 20V8l12-6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M14 8l6 3v6l-6 3-6-3v-6l6-3z" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <circle cx="14" cy="14" r="2" fill="currentColor"/>
                </svg>
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>Creative Studios</span>
                <span className={styles.logoTagline}>DEVOTIONAL ATELIER • SACRED CRAFTS</span>
              </div>
            </Link>
            <p className={styles.description}>
              Meticulously handcrafted deity poshaks, pure brass sanctuary urlis, and sanctified festival heirlooms designed to enrich devotional living with quiet luxury.
            </p>
            <div className={styles.socialLinks}>
              {/* Instagram */}
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>The Sanctum</h4>
            <ul className={styles.linkList}>
              <li><Link href="/collections/poshak">Poshak</Link></li>
              <li><Link href="/collections/jewellery-hair">Jewellery & Hair</Link></li>
              <li><Link href="/collections/furniture-comfort">Furniture & Comfort</Link></li>
              <li><Link href="/collections/pooja-essentials">Pooja Essentials</Link></li>
              <li><Link href="/collections/home-decor">Home Decor</Link></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Customer Care</h4>
            <ul className={styles.linkList}>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/shipping">Shipping & Delivery</Link></li>
              <li><Link href="/returns">Returns & Exchanges</Link></li>
              <li><Link href="/bespoke">Bespoke Orders</Link></li>
              <li><Link href="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div className={styles.newsletterCol}>
            <h4 className={styles.colTitle}>The Studio Journal</h4>
            <p className={styles.newsletterDesc}>Sign up to receive updates on new collections, exclusive access, and stories from our artisans.</p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required className={styles.newsletterInput} />
              <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
            </form>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© {new Date().getFullYear()} Creative Studios. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
