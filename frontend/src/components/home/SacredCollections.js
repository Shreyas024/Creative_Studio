'use client';

import Link from 'next/link';
import styles from '@/styles/components/SacredCollections.module.css';

const collections = [
  {
    id: '01',
    title: 'Poshak',
    desc: 'Hand-embroidered deity vestments, pure Zari Banarasi silks, and sacred Radha Krishna shringar.',
    count: '142 Creations',
    badge: 'FROM ₹899',
    image: 'https://images.unsplash.com/photo-1614088656608-289ebfdb1c19?q=80&w=600&auto=format&fit=crop',
    href: '/collections/poshak'
  },
  {
    id: '02',
    title: 'Jewellery & Hair',
    desc: 'Mukuts, stone-studded haar, braided choti, waistband kardhani, and fine gemstone adornments.',
    count: '98 Ornaments',
    badge: 'HAND-ENCRUSTED',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop',
    href: '/collections/jewellery-hair'
  },
  {
    id: '03',
    title: 'Furniture & Comfort',
    desc: 'Carved singhasans, plush velvet gaddis, marble chaukis, and gilded mandir jhulash.',
    count: '46 Heirlooms',
    badge: 'TEAK & VELVET',
    image: 'https://images.unsplash.com/photo-1615800098774-706f9d34e622?q=80&w=600&auto=format&fit=crop',
    href: '/collections/furniture-comfort'
  },
  {
    id: '04',
    title: 'Pooja Essentials',
    desc: 'Hammered brass urlis, akhand diyas, silver-plated thalis, organic dhoop, and pure camphor.',
    count: '88 Artifacts',
    badge: 'PURE BRASS & SILVER',
    image: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=600&auto=format&fit=crop',
    href: '/collections/pooja-essentials'
  },
  {
    id: '05',
    title: 'Home Decor & Festive',
    desc: 'Gota torans, resonant temple bells, brass wall hangings, and auspicious festive accents.',
    count: '76 Designs',
    badge: 'SANCTUM LIVING',
    image: 'https://images.unsplash.com/photo-1512411985483-3766eb8ce405?q=80&w=600&auto=format&fit=crop',
    href: '/collections/home-decor'
  },
  {
    id: '06',
    title: 'Gifting & Packaging',
    desc: 'Sanctified gift boxes, embroidered velvet pouches, and bespoke festive wedding hampers.',
    count: '52 Offerings',
    badge: 'SANCTIFIED GIFTING',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
    href: '/collections/gifting-packaging'
  },
  {
    id: '07',
    title: 'Storage & Essential',
    desc: 'Handcrafted cedar poshak trunks, brass dabba sets, velvet jewellery rolls, and ritual organizing cases.',
    count: '34 Storage Pieces',
    badge: 'HEIRLOOM CARE',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=600&auto=format&fit=crop',
    href: '/collections/storage-essential'
  }
];

export default function SacredCollections() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>CURATED SANCTUM SANCTORUM</span>
            <h2 className={styles.title}>Sacred Collections</h2>
            <p className={styles.description}>Thoughtfully crafted articles of worship and festive reverence, created with ritual purity.</p>
          </div>
          <Link href="/collections" className={styles.exploreLink}>
            Explore All 7 Categories
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className={styles.grid}>
          {collections.map((item, i) => (
            <Link href={item.href} key={i} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.title} className={styles.image} />
                <span className={styles.badge}>{item.badge}</span>
              </div>
              <div className={styles.content}>
                <span className={styles.catId}>CATEGORY {item.id}</span>
                <h3 className={styles.catTitle}>{item.title}</h3>
                <p className={styles.catDesc}>{item.desc}</p>
                <div className={styles.footer}>
                  <span className={styles.count}>{item.count}</span>
                  <svg className={styles.arrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
