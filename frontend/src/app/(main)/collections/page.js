'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/utils/api';
import styles from './collections.module.css';

export default function CollectionsPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.categories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading sanctum collections...</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Sacred Collections</h1>
        <p className={styles.subtitle}>Explore our curated categories of devotional artifacts</p>
      </div>

      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link key={cat._id} href={`/collections/${cat.slug}`} className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <img 
                src={cat.image || 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop'} 
                alt={cat.name} 
                className={styles.categoryImage} 
              />
              <div className={styles.overlay}>
                <h2 className={styles.categoryName}>{cat.name}</h2>
                <span className={styles.exploreBtn}>Explore</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
