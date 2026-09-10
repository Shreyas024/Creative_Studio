'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/utils/api';
import styles from '@/styles/components/ArtisanShowcase.module.css';

export default function ArtisanShowcase() {
  const [activeTab, setActiveTab] = useState('All');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products?featured=true');
        const fetchedProducts = res.data.products;
        setProducts(fetchedProducts);
        
        // Extract unique categories from products
        const uniqueCategories = ['All'];
        fetchedProducts.forEach(p => {
          if (p.category && p.category.name && !uniqueCategories.includes(p.category.name)) {
            uniqueCategories.push(p.category.name);
          }
        });
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => p.category?.name === activeTab);

  if (isLoading) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading artisanal masterpieces...</div>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>MASTER ARTISAN SHOWCASE</span>
          <h2 className={styles.title}>Devotional Masterpieces</h2>
        </div>

        <div className={styles.tabsWrapper}>
          <ul className={styles.tabsList}>
            {categories.map((tab) => (
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
            <div key={product._id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img 
                  src={product.images?.[0]?.url || 'https://via.placeholder.com/400'} 
                  alt={product.name} 
                  className={styles.productImage} 
                />
                {product.isFeatured && <span className={styles.badge}>FEATURED</span>}
                <div className={styles.actionOverlay}>
                  <button className={styles.quickAddBtn}>Quick Add</button>
                </div>
              </div>
              <div className={styles.productInfo}>
                <p className={styles.artisan}>{product.artisan?.name || 'Creative Studios'}</p>
                <h3 className={styles.productName}>
                  <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h3>
                <p className={styles.price}>
                  {product.currency === 'INR' ? '₹' : '$'}{product.price.toLocaleString()}
                </p>
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
