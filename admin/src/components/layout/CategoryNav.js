'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/components/CategoryNav.module.css';

const categories = [
  { name: 'Home', href: '/' },
  { name: 'Poshak', href: '/collections/poshak' },
  { name: 'Jewellery & Hair', href: '/collections/jewellery-hair' },
  { name: 'Furniture & Comfort', href: '/collections/furniture-comfort' },
  { name: 'Pooja Essentials', href: '/collections/pooja-essentials' },
  { name: 'Home Decor & Festive', href: '/collections/home-decor-festive' },
  { name: 'Gifting & Packaging', href: '/collections/gifting-packaging' },
  { name: 'Storage & Essential', href: '/collections/storage-essential' },
  { name: 'The Studio Journal', href: '/journal' },
];

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {categories.map((cat, i) => (
            <li key={i} className={styles.item}>
              <Link
                href={cat.href}
                className={`${styles.link} ${pathname === cat.href ? styles.active : ''}`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
