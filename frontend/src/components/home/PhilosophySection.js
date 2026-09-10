'use client';

import styles from '@/styles/components/PhilosophySection.module.css';

export default function PhilosophySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imagesCol}>
            <div className={styles.imageGrid}>
              <div className={styles.imgWrapper1}>
                <img src="https://images.unsplash.com/photo-1605335504780-6927d7fc4916?q=80&w=600&auto=format&fit=crop" alt="Artisan weaving Banarasi silk" className={styles.image} />
              </div>
              <div className={styles.imgWrapper2}>
                <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop" alt="Hand-encrusted embroidery details" className={styles.image} />
              </div>
              <div className={styles.imgWrapper3}>
                <img src="https://images.unsplash.com/photo-1621571212877-44bc99fde027?q=80&w=600&auto=format&fit=crop" alt="Brass artisan at work" className={styles.image} />
              </div>
              <div className={styles.imgWrapper4}>
                <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop" alt="Sanctified gifting and packaging" className={styles.image} />
              </div>
              <div className={styles.centerBadge}>
                <div className={styles.badgeInner}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M12 2v2M12 12v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                  </svg>
                  <span className={styles.badgeText}>VEDIC ATELIER</span>
                  <span className={styles.badgeYear}>EST. 2018</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contentCol}>
            <span className={styles.label}>THE CREATIVE STUDIOS PHILOSOPHY</span>
            <h2 className={styles.title}>Where Ancient Reverence Meets Design Excellence</h2>
            <p className={styles.description}>
              At Creative Studios, we believe that spiritual articles should be as exquisitely designed as they are deeply sacred. We collaborate directly with master artisans across Varanasi, Jaipur, and Moradabad to resurrect sacred craft traditions with contemporary refinement—ensuring each piece carries timeless sattvic grace.
            </p>

            <div className={styles.valuesList}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                    <path d="M12 8v2"/>
                    <path d="M12 14v2"/>
                    <path d="M8 12h2"/>
                    <path d="M14 12h2"/>
                  </svg>
                </div>
                <div className={styles.valueContent}>
                  <h4 className={styles.valueTitle}>Sattvic Craftsmanship</h4>
                  <p className={styles.valueDesc}>Clean, pure materials treated with ritual sanctity from the first stitch on the loom to dispatch with sacred sandalwood essence.</p>
                </div>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className={styles.valueContent}>
                  <h4 className={styles.valueTitle}>Artisan Fair Trade</h4>
                  <p className={styles.valueDesc}>Sustaining over 180 generational weaver and brass-smith families across Bharat with dignified, above-standard wages and preserved heritage lineages.</p>
                </div>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className={styles.valueContent}>
                  <h4 className={styles.valueTitle}>Bespoke Deity Sizing</h4>
                  <p className={styles.valueDesc}>Custom-tailored poshaks precisely measured for your vigraha (sizes 00 to 12+), complete with complimentary patka adjustments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
