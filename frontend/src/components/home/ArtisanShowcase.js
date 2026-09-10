'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/components/ArtisanShowcase.module.css';

const tabs = ['All', 'Jewellery & Hair', 'Furniture & Comfort', 'Pooja Essentials', 'Home Decor & Festive'];

const products = [
  {
    id: '1',
    name: 'Mayura Zardozi Poshak',
    artisan: 'Varanasi Atelier',
    price: '₹12,499',
    image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=400&auto=format&fit=crop',
    category: 'Jewellery & Hair',
    badge: 'NEW ARRIVAL'
  },
  {
    id: '2',
    name: 'Solid Brass Akhand Diya',
    artisan: 'Moradabad Mastersmiths',
    price: '₹2,899',
    image: 'https://images.unsplash.com/photo-1514948011270-4f52636222b4?q=80&w=400&auto=format&fit=crop',
    category: 'Pooja Essentials'
  },
  {
    id: '3',
    name: 'Teakwood Singhasan',
    artisan: 'Jaipur Carvers Guild',
    price: '₹18,500',
    image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=400&auto=format&fit=crop',
    category: 'Furniture & Comfort',
    badge: 'BESTSELLER'
  },
  {
    id: '4',
    name: 'Kundan Embedded Mukut',
    artisan: 'Jaipur Jewellers',
    price: '₹4,299',
    image: 'https://images.unsplash.com/photo-1599643478514-4a52023050b1?q=80&w=400&auto=format&fit=crop',
    category: 'Jewellery & Hair'
  }
];

export default function ArtisanShowcase() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>MASTER ARTISAN SHOWCASE</span>
          <h2 className={styles.title}>Devotional Masterpieces</h2>
        </div>

        <div className={styles.tabsWrapper}>
          <ul className={styles.tabsList}>
            {tabs.map((tab) => (
              <li key={tab}>
                <button 
                  className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
                {product.badge && <span className={styles.badge}>{product.badge}</span>}
                <div className={styles.actionOverlay}>
                  <button className={styles.quickAddBtn}>Quick Add</button>
                </div>
              </div>
              <div className={styles.productInfo}>
                <p className={styles.artisan}>{product.artisan}</p>
                <h3 className={styles.productName}>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <p className={styles.price}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.viewAllWrapper}>
          <Link href="/collections" className={styles.viewAllBtn}>
            View Entire Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
